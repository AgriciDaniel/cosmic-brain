"""Source and claim provenance contracts plus v1 migration helpers."""

from __future__ import annotations

import hashlib
import ipaddress
import json
import re
import unicodedata
from datetime import date, datetime, timezone
from pathlib import Path, PurePosixPath
from typing import Any, Callable, Mapping, cast
from urllib.parse import urlsplit, urlunsplit

from .json_utils import parse_finite_json_float
from .paths import assert_within, canonical
from .transaction import BUNDLE_SCHEMA, _safe_hash, read_vault_regular, sha256_bytes
from .url_safety import url_credential_issue


SOURCE_SCHEMA = "claude-obsidian.source-ledger.v1"
CLAIM_SCHEMA = "claude-obsidian.claim-ledger.v1"
SOURCE_PATH = "wiki/meta/ledgers/source-ledger.json"
CLAIM_PATH = "wiki/meta/ledgers/claim-ledger.json"
SOURCE_KINDS = {"file", "url", "manual"}
CONTENT_KINDS = {
    "document",
    "webpage",
    "dataset",
    "image",
    "audio",
    "video",
    "code",
    "conversation",
    "synthetic",
    "other",
}
AUTHORITIES = {"official", "primary", "secondary", "community", "synthetic", "unknown"}
SOURCE_STATUSES = {"unreviewed", "active", "superseded", "rejected"}
CLAIM_RISKS = {"normal", "high"}
CLAIM_ASSESSMENTS = {
    "accepted",
    "provisional",
    "contested",
    "unsupported",
    "deprecated",
}
CONFIDENCES = {"high", "medium", "low", "unknown"}
EVIDENCE_RELATIONS = {"supports", "contradicts", "context"}


class LedgerValidationError(ValueError):
    def __init__(self, errors: list[dict[str, str]]):
        super().__init__("; ".join(error["message"] for error in errors))
        self.errors = errors


class DuplicateJSONKeyError(ValueError):
    pass


def _json_object_without_duplicates(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in pairs:
        if key in result:
            raise DuplicateJSONKeyError("duplicate JSON object key")
        result[key] = value
    return result


def _reject_nonfinite_constant(value: str) -> None:
    raise ValueError(f"non-finite JSON number is not permitted: {value}")


def strict_json_loads(value: str) -> Any:
    """Parse JSON while rejecting ambiguous duplicate object keys at every depth."""

    return json.loads(
        value,
        object_pairs_hook=_json_object_without_duplicates,
        parse_constant=_reject_nonfinite_constant,
        parse_float=parse_finite_json_float,
    )


def _existing_json(root: Path, relative: str) -> dict[str, Any] | None:
    raw = read_vault_regular(root, relative, limit=16 * 1024 * 1024)
    if raw is None:
        return None
    try:
        value = strict_json_loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, ValueError) as exc:
        raise LedgerValidationError(
            [{"path": relative, "message": f"cannot parse existing file: {exc}"}]
        ) from exc
    if not isinstance(value, dict):
        raise LedgerValidationError(
            [{"path": relative, "message": "existing file root must be an object"}]
        )
    return value


def validate_existing_canonical_state(
    vault_root: Path | str,
    *,
    fallback_source_ledger: Mapping[str, Any] | None = None,
) -> Mapping[str, Any]:
    """Validate canonical files that adoption/migration promises to preserve."""

    root = canonical(vault_root)
    errors: list[dict[str, str]] = []
    workspace = _existing_json(root, ".claude-obsidian.json")
    if workspace is not None:
        if workspace.get("schema") != "claude-obsidian.workspace.v1":
            _error(
                errors, ".claude-obsidian.json.schema", "unsupported workspace schema"
            )
        configured = workspace.get("vault")
        if not isinstance(configured, str) or not configured.strip():
            _error(errors, ".claude-obsidian.json.vault", "must be a non-empty path")
        else:
            supplied = Path(configured).expanduser()
            selected = canonical(
                supplied if supplied.is_absolute() else root / supplied
            )
            if selected != root:
                _error(
                    errors,
                    ".claude-obsidian.json.vault",
                    "must resolve to the vault being adopted",
                )

    source = _existing_json(root, SOURCE_PATH)
    effective_source: Mapping[str, Any] = (
        source or fallback_source_ledger or empty_source_ledger()
    )
    if source is not None:
        errors.extend(
            {
                "path": f"{SOURCE_PATH}.{item['path']}",
                "message": item["message"],
            }
            for item in validate_source_ledger(source, vault_root=root)
        )
    claims = _existing_json(root, CLAIM_PATH)
    if claims is not None:
        errors.extend(
            {
                "path": f"{CLAIM_PATH}.{item['path']}",
                "message": item["message"],
            }
            for item in validate_claim_ledger(claims, effective_source, vault_root=root)
        )
    if errors:
        raise LedgerValidationError(
            sorted(errors, key=lambda item: (item["path"], item["message"]))
        )
    return effective_source


def _iso_date(value: Any) -> date | None:
    if (
        not isinstance(value, str)
        or re.fullmatch(r"[0-9]{4}-[0-9]{2}-[0-9]{2}", value) is None
    ):
        return None
    try:
        return date.fromisoformat(value)
    except ValueError:
        return None


def _iso_utc_timestamp(value: Any) -> datetime | None:
    if (
        not isinstance(value, str)
        or re.fullmatch(
            r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z", value
        )
        is None
    ):
        return None
    try:
        return datetime.fromisoformat(value[:-1] + "+00:00")
    except ValueError:
        return None


def _timestamp() -> str:
    return (
        datetime.now(timezone.utc)
        .replace(microsecond=0)
        .isoformat()
        .replace("+00:00", "Z")
    )


def _audit_date(as_of: date | None) -> date:
    if as_of is None:
        return datetime.now(timezone.utc).date()
    if isinstance(as_of, datetime) or not isinstance(as_of, date):
        raise ValueError("as_of must be a date object or null")
    return as_of


_URI_UNRESERVED = frozenset(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
)
_URI_PATH_SAFE = _URI_UNRESERVED | frozenset("!$&'()*+,;=:@/")
_URI_QUERY_SAFE = _URI_PATH_SAFE | frozenset("?")


def _normalize_uri_component(value: str, *, safe: frozenset[str]) -> str:
    """Canonicalize URI/IRI text while keeping escaped reserved bytes distinct.

    RFC 3986 permits decoding percent-encoded unreserved bytes but not reserved
    bytes such as ``%2F``. RFC 3987 IRIs may spell non-ASCII text directly or as
    UTF-8 percent octets. Decode only valid non-ASCII UTF-8 runs, normalize their
    Unicode text with adjacent direct text to NFC, and emit one ASCII URI form.
    """

    if re.search(r"%(?![0-9A-Fa-f]{2})", value):
        raise ValueError("invalid percent escape")
    output: list[str] = []
    text: list[str] = []

    def flush_text() -> None:
        if not text:
            return
        normalized = unicodedata.normalize("NFC", "".join(text))
        for character in normalized:
            encoded = character.encode("utf-8")
            if len(encoded) == 1 and chr(encoded[0]) in safe:
                output.append(chr(encoded[0]))
            else:
                output.extend(f"%{byte:02X}" for byte in encoded)
        text.clear()

    index = 0
    while index < len(value):
        if value[index] != "%":
            if ord(value[index]) < 0x80 and value[index] not in safe:
                raise ValueError("invalid raw URI component character")
            text.append(value[index])
            index += 1
            continue
        byte = int(value[index + 1 : index + 3], 16)
        if byte < 0x80:
            if byte < 0x20 or byte == 0x7F:
                raise ValueError("escaped control byte in URI component")
            character = chr(byte)
            if character in _URI_UNRESERVED:
                text.append(character)
            else:
                flush_text()
                output.append(f"%{byte:02X}")
            index += 3
            continue
        octets = bytearray()
        while index < len(value) and value[index] == "%":
            candidate = int(value[index + 1 : index + 3], 16)
            if candidate < 0x80:
                break
            octets.append(candidate)
            index += 3
        try:
            text.append(bytes(octets).decode("utf-8"))
        except UnicodeDecodeError:
            flush_text()
            output.extend(f"%{candidate:02X}" for candidate in octets)
    flush_text()
    return "".join(output)


def _canonical_url_host(raw_host: str) -> str:
    """Return the RFC-equivalent ASCII host form, including IPv6 brackets."""

    try:
        address = ipaddress.ip_address(raw_host)
    except ValueError:
        decoded: list[str] = []
        index = 0
        if re.search(r"%(?![0-9A-Fa-f]{2})", raw_host):
            raise ValueError("invalid host percent escape")
        while index < len(raw_host):
            if raw_host[index] != "%":
                decoded.append(raw_host[index])
                index += 1
                continue
            byte = int(raw_host[index + 1 : index + 3], 16)
            if byte < 0x80:
                character = chr(byte)
                if character not in _URI_UNRESERVED:
                    raise ValueError("escaped reserved byte in registered-name host")
                decoded.append(character)
                index += 3
                continue
            octets = bytearray()
            while index < len(raw_host) and raw_host[index] == "%":
                candidate = int(raw_host[index + 1 : index + 3], 16)
                if candidate < 0x80:
                    break
                octets.append(candidate)
                index += 3
            try:
                decoded.append(bytes(octets).decode("utf-8"))
            except UnicodeDecodeError as exc:
                raise ValueError("invalid UTF-8 percent escape in host") from exc
        normalized = unicodedata.normalize("NFC", "".join(decoded)).translate(
            {0x3002: ".", 0xFF0E: ".", 0xFF61: "."}
        )
        ascii_host = normalized.encode("idna").decode("ascii").rstrip(".").lower()
        if any(ord(character) > 0x7F for character in normalized):
            try:
                round_trip = ascii_host.encode("ascii").decode("idna")
            except UnicodeError as exc:
                raise ValueError(
                    "registered-name host is not safely IDNA-canonical"
                ) from exc
            expected = unicodedata.normalize("NFC", normalized.rstrip(".")).lower()
            observed = unicodedata.normalize("NFC", round_trip.rstrip(".")).lower()
            if observed != expected:
                raise ValueError("registered-name host has ambiguous IDNA mapping")
        if not ascii_host or len(ascii_host) > 253:
            raise ValueError("invalid registered-name host length")
        if all(
            re.fullmatch(r"(?:[0-9]+|0x[0-9a-f]+)", component) is not None
            for component in ascii_host.split(".")
        ):
            raise ValueError("non-canonical numeric host")
        labels = ascii_host.split(".")
        if any(
            not label
            or len(label) > 63
            or re.fullmatch(r"[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", label) is None
            for label in labels
        ):
            raise ValueError("registered-name host is not a canonical DNS name")
        return ascii_host
    if isinstance(address, ipaddress.IPv6Address):
        if address.scope_id is not None:
            raise ValueError("scoped IPv6 source hosts are unsupported")
        return f"[{address.compressed}]"
    return str(address)


def _canonical_url(locator: str) -> str:
    if "#" in locator:
        raise ValueError("source URL fragments are unsupported")
    if "\\" in locator or any(
        character.isspace() or ord(character) < 0x20 or ord(character) == 0x7F
        for character in locator
    ):
        raise ValueError("URL contains raw whitespace, control text, or backslash")
    parsed = urlsplit(locator)
    scheme = parsed.scheme.lower()
    host = _canonical_url_host(parsed.hostname or "")
    if not host:
        return locator.strip()
    port = parsed.port
    default_port = {"http": 80, "https": 443}.get(scheme)
    netloc = host if port is None or port == default_port else f"{host}:{port}"
    path = _normalize_uri_component(parsed.path or "/", safe=_URI_PATH_SAFE)
    input_path = path
    output = ""
    while input_path:
        if input_path.startswith("../"):
            input_path = input_path[3:]
        elif input_path.startswith("./"):
            input_path = input_path[2:]
        elif input_path.startswith("/./"):
            input_path = "/" + input_path[3:]
        elif input_path == "/.":
            input_path = "/"
        elif input_path.startswith("/../"):
            input_path = "/" + input_path[4:]
            output = output.rsplit("/", 1)[0]
        elif input_path == "/..":
            input_path = "/"
            output = output.rsplit("/", 1)[0]
        elif input_path in {".", ".."}:
            input_path = ""
        else:
            match = re.match(r"^/?[^/]*", input_path)
            assert match is not None
            segment = match.group(0)
            output += segment
            input_path = input_path[len(segment) :]
    path = output or "/"
    query = _normalize_uri_component(parsed.query, safe=_URI_QUERY_SAFE)
    result = urlunsplit((scheme, netloc, path, query, ""))
    if not query and "?" in locator:
        result += "?"
    return result


def _canonical_locator(origin_kind: str, locator: str) -> str:
    if origin_kind.casefold() == "url":
        try:
            return _canonical_url(locator)
        except (UnicodeError, ValueError):
            return locator
    if origin_kind.casefold() == "file":
        return PurePosixPath(locator).as_posix()
    return locator


def stable_source_id(origin_kind: str, locator: str, content_sha256: str | None) -> str:
    normalized_locator = _canonical_locator(origin_kind, locator)
    digest = hashlib.sha256(
        f"{origin_kind.casefold()}\0{normalized_locator}\0{(content_sha256 or '').casefold()}".encode(
            "utf-8", errors="surrogatepass"
        )
    ).hexdigest()
    return f"src-{digest[:20]}"


def empty_source_ledger(*, generated_at: str | None = None) -> dict[str, Any]:
    return {
        "schema": SOURCE_SCHEMA,
        "generated_at": generated_at or _timestamp(),
        "sources": {},
    }


def empty_claim_ledger(*, generated_at: str | None = None) -> dict[str, Any]:
    return {
        "schema": CLAIM_SCHEMA,
        "generated_at": generated_at or _timestamp(),
        "claims": {},
    }


def _safe_diagnostic_text(value: str) -> str:
    output: list[str] = []
    for character in value:
        codepoint = ord(character)
        if character == "\\":
            output.append("\\\\")
        elif codepoint < 0x20 or codepoint == 0x7F or 0xD800 <= codepoint <= 0xDFFF:
            output.append(f"\\u{codepoint:04x}")
        else:
            output.append(character)
    return "".join(output)


def _error(errors: list[dict[str, str]], path: str, message: str) -> None:
    errors.append(
        {
            "path": _safe_diagnostic_text(path),
            "message": _safe_diagnostic_text(message),
        }
    )


def _contains_non_scalar(value: str) -> bool:
    return any(0xD800 <= ord(character) <= 0xDFFF for character in value)


def _safe_ledger_id(value: Any, prefix: str) -> bool:
    return (
        isinstance(value, str)
        and re.fullmatch(rf"{re.escape(prefix)}[A-Za-z0-9][A-Za-z0-9._-]*", value)
        is not None
    )


def validate_source_ledger(
    ledger: Mapping[str, Any],
    *,
    vault_root: Path | str | None = None,
    planned_files: Mapping[str, str] | None = None,
    as_of: date | None = None,
    hash_reader: Callable[[str], str | None] | None = None,
) -> list[dict[str, str]]:
    errors: list[dict[str, str]] = []
    if not isinstance(ledger, Mapping):
        return [{"path": ".", "message": "source ledger must be an object"}]
    if ledger.get("schema") != SOURCE_SCHEMA:
        _error(errors, "schema", f"must equal {SOURCE_SCHEMA}")
    generated = _iso_utc_timestamp(ledger.get("generated_at"))
    if generated is None:
        _error(
            errors,
            "generated_at",
            "must be a canonical UTC timestamp (YYYY-MM-DDTHH:MM:SSZ)",
        )
    audit_date = _audit_date(as_of)
    if generated is not None and generated.date() > audit_date:
        _error(errors, "generated_at", "must not be after the audit date")
    sources = ledger.get("sources")
    if not isinstance(sources, dict):
        _error(errors, "sources", "must be an object")
        return errors
    root = (
        canonical(vault_root)
        if vault_root is not None and hash_reader is None
        else Path(vault_root)
        if vault_root is not None
        else None
    )
    for source_id, record in sorted(sources.items(), key=lambda item: str(item[0])):
        prefix = f"sources.{source_id}"
        if not _safe_ledger_id(source_id, "src-"):
            _error(errors, prefix, "source ID must be a safe src- identifier")
        if not isinstance(record, dict):
            _error(errors, prefix, "must be an object")
            continue
        origin = record.get("origin")
        if not isinstance(origin, dict):
            _error(errors, f"{prefix}.origin", "must be an object")
            continue
        kind = origin.get("kind")
        locator = origin.get("locator")
        if not isinstance(kind, str) or kind not in SOURCE_KINDS:
            _error(errors, f"{prefix}.origin.kind", "unsupported origin kind")
        if not isinstance(locator, str) or not locator:
            _error(errors, f"{prefix}.origin.locator", "must be a non-empty string")
        elif _contains_non_scalar(locator):
            _error(
                errors,
                f"{prefix}.origin.locator",
                "must contain Unicode scalar values only",
            )
        elif kind == "url":
            try:
                parsed = urlsplit(locator)
                parsed.port
                _canonical_url(locator)
            except (UnicodeError, ValueError):
                _error(
                    errors, f"{prefix}.origin.locator", "remote source URL is malformed"
                )
            else:
                if (
                    parsed.scheme.lower() != "https"
                    or not parsed.netloc
                    or not parsed.hostname
                ):
                    _error(
                        errors,
                        f"{prefix}.origin.locator",
                        "remote sources require an absolute HTTPS URL",
                    )
                else:
                    if parsed.fragment:
                        _error(
                            errors,
                            f"{prefix}.origin.locator",
                            "source URLs must not contain fragments",
                        )
                    credential_issue = url_credential_issue(parsed)
                    if credential_issue is not None:
                        _error(
                            errors, f"{prefix}.origin.locator", credential_issue.message
                        )
        elif kind == "file":
            parsed_locator = PurePosixPath(locator)
            if (
                parsed_locator.is_absolute()
                or ".." in parsed_locator.parts
                or parsed_locator.as_posix() != locator
                or any(character in locator for character in ("\\", "\x00", "\n", "\r"))
            ):
                _error(
                    errors,
                    f"{prefix}.origin.locator",
                    "file source must be vault-relative",
                )
            elif root is not None and hash_reader is None:
                try:
                    assert_within(root, locator)
                except Exception as exc:
                    _error(errors, f"{prefix}.origin.locator", str(exc))
        content_kind = record.get("content_kind")
        authority = record.get("authority")
        review_status = record.get("review_status")
        if not isinstance(content_kind, str) or content_kind not in CONTENT_KINDS:
            _error(errors, f"{prefix}.content_kind", "unsupported content kind")
        if not isinstance(authority, str) or authority not in AUTHORITIES:
            _error(errors, f"{prefix}.authority", "unsupported authority")
        if not isinstance(review_status, str) or review_status not in SOURCE_STATUSES:
            _error(errors, f"{prefix}.review_status", "unsupported review status")
        if (content_kind == "synthetic") != (authority == "synthetic"):
            _error(
                errors,
                f"{prefix}.authority",
                "synthetic content and synthetic authority must be declared together",
            )
        if (
            not isinstance(record.get("title"), str)
            or not record["title"].strip()
            or _contains_non_scalar(record["title"])
        ):
            _error(errors, f"{prefix}.title", "must be non-empty text")
        content_hash = record.get("content_sha256")
        if content_hash is not None and (
            not isinstance(content_hash, str)
            or len(content_hash) != 64
            or content_hash != content_hash.lower()
            or any(character not in "0123456789abcdef" for character in content_hash)
        ):
            _error(
                errors,
                f"{prefix}.content_sha256",
                "must be a 64-character SHA-256 or null",
            )
        if (
            isinstance(kind, str)
            and kind in SOURCE_KINDS
            and isinstance(locator, str)
            and locator
            and (
                content_hash is None
                or isinstance(content_hash, str)
                and len(content_hash) == 64
            )
        ):
            expected_source_id = stable_source_id(kind, locator, content_hash)
            if source_id != expected_source_id:
                _error(
                    errors,
                    prefix,
                    f"source ID must equal canonical identity {expected_source_id}",
                )
        if (
            kind == "file"
            and record.get("ingested_at") is not None
            and content_hash is None
        ):
            _error(
                errors,
                f"{prefix}.content_sha256",
                "ingested file sources require SHA-256",
            )
        for field in ("ingested_at", "retrieved_at", "refresh_due"):
            if record.get(field) is not None and _iso_date(record.get(field)) is None:
                _error(errors, f"{prefix}.{field}", "must be an ISO date or null")
        observed = _iso_date(record.get("retrieved_at")) or _iso_date(
            record.get("ingested_at")
        )
        due = _iso_date(record.get("refresh_due"))
        if review_status == "active" and observed is None:
            _error(
                errors,
                f"{prefix}.retrieved_at",
                "active sources require an auditable retrieval or ingestion date",
            )
        if review_status == "active" and due is None:
            _error(
                errors,
                f"{prefix}.refresh_due",
                "active sources require an explicit refresh_due date",
            )
        if observed is not None and due is not None and due < observed:
            _error(
                errors,
                f"{prefix}.refresh_due",
                "must not precede retrieval or ingestion",
            )
        if observed is not None and observed > audit_date:
            _error(
                errors,
                f"{prefix}.retrieved_at",
                "retrieval or ingestion date must not be after the audit date",
            )
        if kind == "file" and isinstance(locator, str) and root is not None:
            try:
                actual_hash = (
                    planned_files[locator]
                    if planned_files is not None and locator in planned_files
                    else hash_reader(locator)
                    if hash_reader is not None
                    else _safe_hash(root, locator)
                )
            except Exception as exc:
                _error(errors, f"{prefix}.origin.locator", str(exc))
            else:
                if review_status == "active" and actual_hash is None:
                    _error(
                        errors,
                        f"{prefix}.origin.locator",
                        "active file source does not exist",
                    )
                if review_status == "active" and content_hash is None:
                    _error(
                        errors,
                        f"{prefix}.content_sha256",
                        "active file sources require SHA-256",
                    )
                if (
                    actual_hash is not None
                    and isinstance(content_hash, str)
                    and len(content_hash) == 64
                    and actual_hash != content_hash.lower()
                ):
                    _error(
                        errors,
                        f"{prefix}.content_sha256",
                        "does not match current file bytes",
                    )
        pages = record.get("pages")
        if not isinstance(pages, list) or any(
            not isinstance(page, str) for page in pages
        ):
            _error(errors, f"{prefix}.pages", "must be an array of paths")
        elif any(
            _contains_non_scalar(page)
            or "\x00" in page
            or "\n" in page
            or "\r" in page
            or PurePosixPath(page).is_absolute()
            or ".." in PurePosixPath(page).parts
            or PurePosixPath(page).as_posix() != page
            or not page.startswith("wiki/")
            for page in pages
        ):
            _error(
                errors,
                f"{prefix}.pages",
                "page paths must be canonical vault-relative wiki paths",
            )
        elif root is not None and review_status == "active":
            for page in pages:
                try:
                    exists = (planned_files is not None and page in planned_files) or (
                        hash_reader(page)
                        if hash_reader is not None
                        else _safe_hash(root, page)
                    ) is not None
                except Exception as exc:
                    _error(errors, f"{prefix}.pages", f"cannot verify {page}: {exc}")
                    continue
                if not exists:
                    _error(
                        errors, f"{prefix}.pages", f"linked page does not exist: {page}"
                    )
        independence_key = record.get("independence_key")
        if independence_key is not None and (
            not isinstance(independence_key, str)
            or not independence_key.strip()
            or _contains_non_scalar(independence_key)
        ):
            _error(
                errors, f"{prefix}.independence_key", "must be non-empty text or null"
            )
        supersedes = record.get("supersedes")
        if supersedes is not None and not _safe_ledger_id(supersedes, "src-"):
            _error(errors, f"{prefix}.supersedes", "must be a source ID or null")
    return sorted(errors, key=lambda item: (item["path"], item["message"]))


def source_is_stale(record: Mapping[str, Any], *, as_of: date) -> bool:
    audit_date = _audit_date(as_of)
    due = _iso_date(record.get("refresh_due"))
    observed = _iso_date(record.get("retrieved_at")) or _iso_date(
        record.get("ingested_at")
    )
    return due is None or observed is None or observed > audit_date or due < audit_date


def _source_origin_is_valid(source: Mapping[str, Any]) -> bool:
    """Validate enough origin structure for evidence to count standalone."""

    origin = source.get("origin")
    if not isinstance(origin, Mapping):
        return False
    kind, locator = origin.get("kind"), origin.get("locator")
    if not isinstance(kind, str) or kind not in SOURCE_KINDS:
        return False
    if not isinstance(locator, str) or not locator or _contains_non_scalar(locator):
        return False
    if kind == "url":
        try:
            parsed = urlsplit(locator)
            parsed.port
            _canonical_url(locator)
        except (UnicodeError, ValueError):
            return False
        return bool(
            parsed.scheme.lower() == "https"
            and parsed.netloc
            and parsed.hostname
            and not parsed.fragment
            and url_credential_issue(parsed) is None
        )
    if kind == "file":
        path = PurePosixPath(locator)
        return not (
            path.is_absolute()
            or ".." in path.parts
            or path.as_posix() != locator
            or any(character in locator for character in ("\\", "\x00", "\n", "\r"))
        )
    return True


def _independent_group_count(supporting: list[tuple[str, Mapping[str, Any]]]) -> int:
    """Collapse duplicate origins, bytes, or declared publishers transitively."""

    parents = list(range(len(supporting)))

    def find(index: int) -> int:
        while parents[index] != index:
            parents[index] = parents[parents[index]]
            index = parents[index]
        return index

    def union(left: int, right: int) -> None:
        left_root, right_root = find(left), find(right)
        if left_root != right_root:
            parents[right_root] = left_root

    identities: list[set[str]] = []
    for source_id, source in supporting:
        values = {f"source:{source_id}"}
        origin = source.get("origin")
        if isinstance(origin, Mapping):
            kind, locator = origin.get("kind"), origin.get("locator")
            if isinstance(kind, str) and isinstance(locator, str):
                values.add(
                    f"origin:{kind.casefold()}:{_canonical_locator(kind, locator)}"
                )
        content_hash = source.get("content_sha256")
        if isinstance(content_hash, str) and content_hash:
            values.add(f"content:{content_hash.casefold()}")
        declared = source.get("independence_key")
        if isinstance(declared, str) and declared.strip():
            normalized_key = unicodedata.normalize(
                "NFC", unicodedata.normalize("NFC", declared.strip()).casefold()
            )
            values.add(f"declared:{normalized_key}")
        identities.append(values)
    for left in range(len(identities)):
        for right in range(left + 1, len(identities)):
            if identities[left].intersection(identities[right]):
                union(left, right)
    return len({find(index) for index in range(len(supporting))})


def _markdown_anchor_sets(text: str) -> tuple[set[str], set[str]]:
    """Extract real headings/block IDs while excluding frontmatter and code."""

    text = re.sub(
        r"<!--.*?(?:-->|$)",
        lambda match: "".join("\n" if char == "\n" else " " for char in match.group(0)),
        text,
        flags=re.DOTALL,
    )
    lines = text.splitlines()
    masked: list[str] = []
    in_frontmatter = bool(lines and lines[0].strip() == "---")
    in_fence: tuple[str, int] | None = None
    for index, line in enumerate(lines):
        if in_frontmatter:
            masked.append("")
            if index > 0 and line.strip() == "---":
                in_frontmatter = False
            continue
        fence = re.match(r"^[ ]{0,3}(`{3,}|~{3,})", line)
        if in_fence is not None:
            masked.append("")
            if re.match(
                rf"^[ ]{{0,3}}{re.escape(in_fence[0])}{{{in_fence[1]},}}[ \t]*$",
                line,
            ):
                in_fence = None
            continue
        if fence:
            token = fence.group(1)
            in_fence = (token[0], len(token))
            masked.append("")
            continue
        chars = list(line)
        cursor = 0
        while cursor < len(chars):
            if chars[cursor] != "`":
                cursor += 1
                continue
            run = 1
            while cursor + run < len(chars) and chars[cursor + run] == "`":
                run += 1
            closing = line.find("`" * run, cursor + run)
            end = len(chars) if closing < 0 else closing + run
            chars[cursor:end] = " " * (end - cursor)
            cursor = end
        masked.append("".join(chars))
    body = "\n".join(masked)
    headings = {
        match.group(1).strip().rstrip("#").strip().casefold()
        for match in re.finditer(r"(?m)^[ \t]{0,3}#{1,6}[ \t]+(.+?)[ \t]*$", body)
    }
    blocks = {
        match.group(1).casefold()
        for match in re.finditer(
            r"(?m)(?:^|[ \t])\^([A-Za-z0-9][A-Za-z0-9_-]*)[ \t]*$", body
        )
    }
    return headings, blocks


def validate_claim_ledger(
    claim_ledger: Mapping[str, Any],
    source_ledger: Mapping[str, Any],
    *,
    as_of: date | None = None,
    vault_root: Path | str | None = None,
    planned_files: Mapping[str, bytes] | None = None,
    file_reader: Callable[[str], bytes | None] | None = None,
) -> list[dict[str, str]]:
    errors: list[dict[str, str]] = []
    if not isinstance(claim_ledger, Mapping):
        return [{"path": ".", "message": "claim ledger must be an object"}]
    if not isinstance(source_ledger, Mapping):
        return [{"path": "sources", "message": "source ledger must be an object"}]
    if claim_ledger.get("schema") != CLAIM_SCHEMA:
        _error(errors, "schema", f"must equal {CLAIM_SCHEMA}")
    generated = _iso_utc_timestamp(claim_ledger.get("generated_at"))
    if generated is None:
        _error(
            errors,
            "generated_at",
            "must be a canonical UTC timestamp (YYYY-MM-DDTHH:MM:SSZ)",
        )
    claims = claim_ledger.get("claims")
    sources = source_ledger.get("sources", {})
    if not isinstance(claims, dict):
        _error(errors, "claims", "must be an object")
        return errors
    if not isinstance(sources, dict):
        _error(errors, "sources", "source ledger sources must be an object")
        return errors
    today = _audit_date(as_of)
    if generated is not None and generated.date() > today:
        _error(errors, "generated_at", "must not be after the audit date")
    root = (
        canonical(vault_root)
        if vault_root is not None and file_reader is None
        else Path(vault_root)
        if vault_root is not None
        else None
    )
    for claim_id, record in sorted(claims.items(), key=lambda item: str(item[0])):
        prefix = f"claims.{claim_id}"
        if not _safe_ledger_id(claim_id, "clm-"):
            _error(errors, prefix, "claim ID must be a safe clm- identifier")
        if not isinstance(record, dict):
            _error(errors, prefix, "must be an object")
            continue
        if (
            not isinstance(record.get("text"), str)
            or not record["text"].strip()
            or _contains_non_scalar(record["text"])
        ):
            _error(errors, f"{prefix}.text", "must be a non-empty falsifiable claim")
        risk = record.get("risk")
        if not isinstance(risk, str) or risk not in CLAIM_RISKS:
            _error(errors, f"{prefix}.risk", "unsupported risk")
        assessment = record.get("assessment")
        if not isinstance(assessment, str) or assessment not in CLAIM_ASSESSMENTS:
            _error(errors, f"{prefix}.assessment", "unsupported assessment")
        confidence = record.get("confidence")
        if not isinstance(confidence, str) or confidence not in CONFIDENCES:
            _error(errors, f"{prefix}.confidence", "unsupported confidence")
        location = record.get("location")
        if not isinstance(location, dict):
            _error(errors, f"{prefix}.location", "must be an object")
        else:
            claim_path = location.get("path")
            if (
                not isinstance(claim_path, str)
                or _contains_non_scalar(claim_path)
                or any(character in claim_path for character in ("\x00", "\n", "\r"))
                or not claim_path.startswith("wiki/")
                or PurePosixPath(claim_path).is_absolute()
                or ".." in PurePosixPath(claim_path).parts
                or PurePosixPath(claim_path).as_posix() != claim_path
            ):
                _error(
                    errors, f"{prefix}.location.path", "must be a canonical wiki path"
                )
            anchor = location.get("anchor")
            if anchor is not None and (
                not isinstance(anchor, str) or _contains_non_scalar(anchor)
            ):
                _error(errors, f"{prefix}.location.anchor", "must be text or null")
            if isinstance(claim_path, str) and root is not None:
                try:
                    page_bytes = (
                        planned_files[claim_path]
                        if planned_files is not None and claim_path in planned_files
                        else file_reader(claim_path)
                        if file_reader is not None
                        else read_vault_regular(
                            root, claim_path, limit=16 * 1024 * 1024
                        )
                    )
                except Exception as exc:
                    _error(
                        errors, f"{prefix}.location.path", f"cannot verify page: {exc}"
                    )
                else:
                    if page_bytes is None:
                        _error(
                            errors,
                            f"{prefix}.location.path",
                            "claim page does not exist",
                        )
                    elif isinstance(anchor, str) and anchor.strip():
                        try:
                            page_text = page_bytes.decode("utf-8")
                        except UnicodeDecodeError:
                            _error(
                                errors,
                                f"{prefix}.location.path",
                                "claim page is not UTF-8",
                            )
                        else:
                            wanted = anchor.strip()
                            headings, blocks = _markdown_anchor_sets(page_text)
                            if wanted.startswith("^"):
                                found = wanted[1:].casefold() in blocks
                            else:
                                found = wanted.casefold() in headings
                            if not found:
                                _error(
                                    errors,
                                    f"{prefix}.location.anchor",
                                    f"anchor does not exist in {claim_path}",
                                )
        reviewed_at = record.get("reviewed_at")
        reviewed_date = _iso_date(reviewed_at)
        if reviewed_at is not None and reviewed_date is None:
            _error(errors, f"{prefix}.reviewed_at", "must be an ISO date or null")
        if assessment == "accepted" and reviewed_date is None:
            _error(
                errors,
                f"{prefix}.reviewed_at",
                "accepted claims require an ISO review date",
            )
        if reviewed_date is not None and reviewed_date > today:
            _error(
                errors,
                f"{prefix}.reviewed_at",
                "review date must not be after the audit date",
            )
        notes = record.get("notes")
        if notes is not None and (
            not isinstance(notes, str) or _contains_non_scalar(notes)
        ):
            _error(errors, f"{prefix}.notes", "must be text or null")
        supersedes = record.get("supersedes")
        if supersedes is not None and not _safe_ledger_id(supersedes, "clm-"):
            _error(errors, f"{prefix}.supersedes", "must be a claim ID or null")
        evidence = record.get("evidence")
        if not isinstance(evidence, list):
            _error(errors, f"{prefix}.evidence", "must be an array")
            continue
        supporting: list[tuple[str, Mapping[str, Any]]] = []
        contradicting_sources: list[tuple[str, Mapping[str, Any]]] = []
        for index, item in enumerate(evidence):
            item_path = f"{prefix}.evidence.{index}"
            if not isinstance(item, dict):
                _error(errors, item_path, "must be an object")
                continue
            source_id = item.get("source_id")
            relation = item.get("relation")
            if not isinstance(source_id, str) or not _safe_ledger_id(source_id, "src-"):
                _error(errors, f"{item_path}.source_id", "must be a safe source ID")
                continue
            if source_id not in sources:
                _error(errors, f"{item_path}.source_id", "does not resolve")
                continue
            if not isinstance(relation, str) or relation not in EVIDENCE_RELATIONS:
                _error(errors, f"{item_path}.relation", "unsupported relation")
                continue
            source_value = sources[source_id]
            if not isinstance(source_value, Mapping):
                _error(
                    errors,
                    f"{item_path}.source_id",
                    "resolves to an invalid source record",
                )
                continue
            source = cast(Mapping[str, Any], source_value)
            if relation == "supports":
                supporting.append((source_id, source))
            if relation == "contradicts":
                contradicting_sources.append((source_id, source))
            locator = item.get("locator")
            if locator is not None and (
                not isinstance(locator, str) or _contains_non_scalar(locator)
            ):
                _error(errors, f"{item_path}.locator", "must be text or null")
        fresh_support = [
            (source_id, source)
            for source_id, source in supporting
            if _source_origin_is_valid(source)
            and source.get("review_status") == "active"
            and source.get("authority") != "synthetic"
            and source.get("content_kind") != "synthetic"
            and not source_is_stale(source, as_of=today)
            and reviewed_date is not None
            and (
                source_date := (
                    _iso_date(source.get("retrieved_at"))
                    or _iso_date(source.get("ingested_at"))
                )
            )
            is not None
            and source_date <= reviewed_date
        ]
        fresh_contradictions = [
            source
            for _, source in contradicting_sources
            if _source_origin_is_valid(source)
            and source.get("review_status") == "active"
            and source.get("authority") != "synthetic"
            and source.get("content_kind") != "synthetic"
            and not source_is_stale(source, as_of=today)
        ]
        if assessment == "accepted" and not fresh_support:
            _error(
                errors,
                f"{prefix}.assessment",
                "accepted claims require fresh active support",
            )
        if (
            assessment == "accepted"
            and risk == "high"
            and _independent_group_count(fresh_support) < 2
        ):
            _error(
                errors,
                f"{prefix}.evidence",
                "high-risk acceptance requires two independent sources",
            )
        if (
            assessment == "accepted"
            and fresh_contradictions
            and not (
                isinstance(notes, str)
                and not _contains_non_scalar(notes)
                and notes.strip()
            )
        ):
            _error(
                errors,
                f"{prefix}.assessment",
                "accepted claims with fresh contradictory evidence require contested assessment or adjudication notes",
            )
        if (
            assessment == "contested"
            and not contradicting_sources
            and not (
                isinstance(notes, str)
                and not _contains_non_scalar(notes)
                and notes.strip()
            )
        ):
            _error(
                errors,
                f"{prefix}.assessment",
                "contested claims need contradictory evidence or notes",
            )
    return sorted(errors, key=lambda item: (item["path"], item["message"]))


def migrate_legacy_manifest(
    vault_root: Path | str, *, generated_at: str | None = None
) -> tuple[dict[str, Any], dict[str, Any]]:
    root = canonical(vault_root)
    legacy_bytes = read_vault_regular(
        root,
        ".raw/.manifest.json",
        limit=16 * 1024 * 1024,
    )
    if legacy_bytes is not None:
        try:
            legacy = strict_json_loads(legacy_bytes.decode("utf-8"))
        except (UnicodeDecodeError, ValueError) as exc:
            raise LedgerValidationError(
                [{"path": ".raw/.manifest.json", "message": f"cannot parse: {exc}"}]
            ) from exc
    else:
        legacy = {"sources": {}}
    if not isinstance(legacy, dict):
        raise LedgerValidationError(
            [{"path": ".raw/.manifest.json", "message": "root must be an object"}]
        )
    raw_sources = legacy.get("sources", {})
    if not isinstance(raw_sources, dict):
        raise LedgerValidationError(
            [{"path": ".raw/.manifest.json.sources", "message": "must be an object"}]
        )
    source_ledger = empty_source_ledger(generated_at=generated_at)
    migration_errors: list[dict[str, str]] = []
    for locator, record in sorted(raw_sources.items(), key=lambda item: str(item[0])):
        if not isinstance(locator, str) or not locator:
            migration_errors.append(
                {
                    "path": ".raw/.manifest.json.sources",
                    "message": "source keys must be non-empty strings",
                }
            )
            continue
        locator_path = PurePosixPath(locator)
        if (
            _contains_non_scalar(locator)
            or locator_path.is_absolute()
            or ".." in locator_path.parts
            or locator_path.as_posix() != locator
            or any(character in locator for character in ("\\", "\x00", "\n", "\r"))
        ):
            migration_errors.append(
                {
                    "path": ".raw/.manifest.json.sources",
                    "message": "source keys must be canonical scalar vault-relative paths",
                }
            )
            continue
        if not isinstance(record, dict):
            migration_errors.append(
                {
                    "path": f".raw/.manifest.json.sources.{locator}",
                    "message": "source record must be an object",
                }
            )
            continue
        try:
            digest = _safe_hash(root, locator)
        except Exception as exc:
            migration_errors.append(
                {
                    "path": f".raw/.manifest.json.sources.{locator}",
                    "message": f"cannot inspect source safely: {exc.__class__.__name__}",
                }
            )
            continue
        source_id = stable_source_id("file", locator, digest)
        if source_id in source_ledger["sources"]:
            migration_errors.append(
                {
                    "path": f".raw/.manifest.json.sources.{locator}",
                    "message": "source identity collides with another legacy source",
                }
            )
            continue
        ingested = record.get("ingested_at") or record.get("ingested")
        pages = record.get("pages_created", [])
        if not isinstance(pages, list) or any(
            not isinstance(page, str) for page in pages
        ):
            migration_errors.append(
                {
                    "path": f".raw/.manifest.json.sources.{locator}.pages_created",
                    "message": "must be an array of page paths",
                }
            )
            continue
        if any(
            _contains_non_scalar(page)
            or PurePosixPath(page).is_absolute()
            or ".." in PurePosixPath(page).parts
            or PurePosixPath(page).as_posix() != page
            or not page.startswith("wiki/")
            or any(character in page for character in ("\\", "\x00", "\n", "\r"))
            for page in pages
        ):
            migration_errors.append(
                {
                    "path": f".raw/.manifest.json.sources.{locator}.pages_created",
                    "message": "page paths must be canonical scalar vault-relative wiki paths",
                }
            )
            continue
        source_ledger["sources"][source_id] = {
            "origin": {"kind": "file", "locator": locator},
            "content_kind": "document",
            "title": Path(locator).stem,
            "authority": "unknown",
            "content_sha256": digest,
            "ingested_at": str(ingested)[:10] if ingested else None,
            "retrieved_at": None,
            "refresh_due": None,
            "review_status": "unreviewed",
            "independence_key": None,
            "pages": sorted(page for page in pages if isinstance(page, str)),
            "supersedes": None,
        }
    if migration_errors:
        raise LedgerValidationError(
            sorted(migration_errors, key=lambda item: (item["path"], item["message"]))
        )
    claim_ledger = empty_claim_ledger(generated_at=generated_at)
    source_errors = validate_source_ledger(source_ledger, vault_root=root)
    if source_errors:
        raise LedgerValidationError(source_errors)
    return source_ledger, claim_ledger


def migration_bundle(
    vault_root: Path | str,
    *,
    operation_id: str,
    generated_at: str | None = None,
) -> dict[str, Any]:
    root = canonical(vault_root)
    sources, claims = migrate_legacy_manifest(root, generated_at=generated_at)
    validate_existing_canonical_state(root, fallback_source_ledger=sources)
    writes: list[dict[str, Any]] = []
    expected: dict[str, str | None] = {}
    values = {
        SOURCE_PATH: sources,
        CLAIM_PATH: claims,
        ".claude-obsidian.json": {
            "schema": "claude-obsidian.workspace.v1",
            "vault": ".",
            "role": "vault",
            "source_inbox": "inbox",
            "legacy_raw": ".raw",
        },
    }
    for relative, value in values.items():
        current_bytes = read_vault_regular(root, relative, limit=16 * 1024 * 1024)
        if current_bytes is not None:
            # Migration is additive and idempotent. Existing canonical files
            # are user/vault state; validate them elsewhere, never refresh
            # timestamps or overwrite them during a compatibility migration.
            continue
        else:
            mode = "create"
        expected[relative] = (
            sha256_bytes(current_bytes) if current_bytes is not None else None
        )
        writes.append(
            {
                "path": relative,
                "mode": mode,
                "content": json.dumps(
                    value, indent=2, sort_keys=True, ensure_ascii=False
                )
                + "\n",
            }
        )
    return {
        "schema": BUNDLE_SCHEMA,
        "operation_id": operation_id,
        "operation_type": "migration",
        "expected_hashes": expected,
        "writes": writes,
    }

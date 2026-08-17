"""Canonical product/capability contracts and deterministic readiness checks.

The tracked JSON contracts contain only repository- or vault-relative data.
Absolute roots are accepted at runtime, but are deliberately never emitted in
the returned reports so the output can be compared across machines.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path, PurePosixPath
from typing import Any, Mapping, Sequence

if __package__ in {None, ""}:
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from claude_obsidian.json_utils import strict_json_loads


SCHEMA_VERSION = 1
DEFAULT_PRODUCT_CONTRACT = Path("config/product-contract.json")
DEFAULT_CAPABILITIES_CONTRACT = Path("config/capabilities.json")

CAPABILITY_STATES = ("available", "configured", "verified", "degraded")
CAPABILITY_TIERS = {"core", "extension", "reference"}
SUPPORT_LEVELS = {"native", "compatible"}
WRITE_ACCESS = {"transactional", "create_only", "runtime"}
CORE_TRANSACTION_TYPES = {
    "autoresearch",
    "base",
    "canvas",
    "capture",
    "configuration",
    "fold",
    "generic",
    "ingest",
    "lint-fix",
    "markdown",
    "migration",
    "save",
    "setup",
}
TRANSACTION_TYPES = CORE_TRANSACTION_TYPES | {
    "none",
    "runtime_cache",
    "transport",
}
CONFIRMATION_POLICIES = {
    "not_applicable",
    "operation_scope",
    "explicit",
    "delegated",
    "forbidden",
}
CONFIG_KINDS = {"file", "directory", "either"}
SCOPE_BASES = {"plugin", "vault"}

_ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
_COMMAND_RE = re.compile(r"^[A-Za-z0-9_.+-]+$")
_WINDOWS_ABSOLUTE_RE = re.compile(r"^[A-Za-z]:[\\/]")
_PYTHON_VERSION_RE = re.compile(r"^[0-9]+\.[0-9]+$")
_GLOB_CHARS = frozenset("*?[")

Error = dict[str, str]


def _error(code: str, location: str, message: str) -> Error:
    return {"code": code, "location": location, "message": message}


def _sorted_errors(errors: Sequence[Error]) -> list[Error]:
    unique = {
        (item["location"], item["code"], item["message"]): dict(item) for item in errors
    }
    return [unique[key] for key in sorted(unique)]


def _contract_path(repo_root: Path, supplied: Path | None, default: Path) -> Path:
    path = default if supplied is None else Path(supplied)
    return path if path.is_absolute() else repo_root / path


def _load_json(path: Path, label: str) -> tuple[dict[str, Any] | None, list[Error]]:
    try:
        raw = path.read_text(encoding="utf-8")
    except FileNotFoundError:
        return None, [_error("missing_contract", label, "contract file does not exist")]
    except OSError:
        return None, [
            _error("unreadable_contract", label, "contract file cannot be read")
        ]
    try:
        value = strict_json_loads(raw)
    except (json.JSONDecodeError, ValueError) as exc:
        location = (
            f"line {exc.lineno}, column {exc.colno}"
            if isinstance(exc, json.JSONDecodeError)
            else str(exc)
        )
        return None, [
            _error(
                "invalid_json",
                label,
                f"invalid JSON: {location}",
            )
        ]
    if not isinstance(value, dict):
        return None, [_error("invalid_type", label, "contract root must be an object")]
    return value, []


def _is_absolute_reference(value: str) -> bool:
    return (
        value.startswith(("/", "\\\\", "~/", "~\\", "file://"))
        or _WINDOWS_ABSOLUTE_RE.match(value) is not None
    )


def _validate_relative_path(value: Any, location: str) -> list[Error]:
    if not isinstance(value, str) or not value:
        return [_error("invalid_path", location, "path must be a non-empty string")]
    if "\x00" in value or "\n" in value or "\r" in value:
        return [_error("invalid_path", location, "path contains a control character")]
    if "\\" in value:
        return [_error("noncanonical_path", location, "path must use forward slashes")]
    if _is_absolute_reference(value):
        return [_error("absolute_path", location, "tracked paths must be relative")]
    parsed = PurePosixPath(value)
    if value in {"", "."} or ".." in parsed.parts:
        return [
            _error("path_escape", location, "path must stay within its declared root")
        ]
    if parsed.as_posix() != value:
        return [_error("noncanonical_path", location, "path must be normalized")]
    return []


def _validate_existing_path(repo_root: Path, value: Any, location: str) -> list[Error]:
    errors = _validate_relative_path(value, location)
    if errors:
        return errors
    assert isinstance(value, str)
    root = repo_root.resolve(strict=False)
    candidate = (root / value).resolve(strict=False)
    try:
        candidate.relative_to(root)
    except ValueError:
        return [
            _error("path_escape", location, "implementation path escapes repository")
        ]
    if not candidate.exists():
        return [
            _error(
                "missing_implementation_path",
                location,
                f"implementation path does not exist: {value}",
            )
        ]
    return []


def _validate_path_list(
    repo_root: Path, value: Any, location: str, *, require_existing: bool
) -> list[Error]:
    if not isinstance(value, list) or not value:
        return [_error("invalid_type", location, "must be a non-empty array of paths")]
    errors: list[Error] = []
    seen: set[str] = set()
    for index, item in enumerate(value):
        item_location = f"{location}[{index}]"
        errors.extend(
            _validate_existing_path(repo_root, item, item_location)
            if require_existing
            else _validate_relative_path(item, item_location)
        )
        if isinstance(item, str):
            if item in seen:
                errors.append(
                    _error("duplicate_value", item_location, f"duplicate path: {item}")
                )
            seen.add(item)
    return errors


def _validate_scope_pattern(value: Any, location: str) -> list[Error]:
    if not isinstance(value, str) or ":" not in value:
        return [
            _error(
                "invalid_scope",
                location,
                "scope must use plugin:<relative-pattern> or vault:<relative-pattern>",
            )
        ]
    base, pattern = value.split(":", 1)
    if base not in SCOPE_BASES:
        return [_error("invalid_scope", location, f"unknown scope base: {base}")]
    return _validate_relative_path(pattern, location)


def _validate_command(
    value: Any, location: str, *, allow_empty: bool = False
) -> list[Error]:
    if not isinstance(value, list) or (not allow_empty and not value):
        qualifier = "an array" if allow_empty else "a non-empty array"
        return [_error("invalid_command", location, f"command must be {qualifier}")]
    errors: list[Error] = []
    for index, token in enumerate(value):
        token_location = f"{location}[{index}]"
        if not isinstance(token, str) or not token:
            errors.append(
                _error(
                    "invalid_command",
                    token_location,
                    "command token must be a non-empty string",
                )
            )
            continue
        if "\x00" in token or "\n" in token or "\r" in token:
            errors.append(
                _error(
                    "invalid_command",
                    token_location,
                    "command token contains a control character",
                )
            )
        elif _is_absolute_reference(token):
            errors.append(
                _error(
                    "absolute_path",
                    token_location,
                    "tracked commands must not contain absolute paths",
                )
            )
    return errors


def _normalized_command_token(token: str) -> str:
    return token.replace("\\", "/").removeprefix("./")


def _validate_verification_semantics(
    value: Sequence[str], location: str
) -> list[Error]:
    """Reject declarations that can only prove the contract validating itself."""

    normalized = [_normalized_command_token(token) for token in value]
    invokes_contract_module = any(
        "claude_obsidian/contracts.py" in token for token in normalized
    )
    invokes_portable_cli = any(
        "scripts/claude-obsidian.py" in token for token in normalized
    )
    invokes_contract_cli = invokes_portable_cli and any(
        re.search(r"(?:^|[^A-Za-z0-9_-])contracts(?:$|[^A-Za-z0-9_-])", token)
        for token in value
    )
    if invokes_contract_module or invokes_contract_cli:
        return [
            _error(
                "self_verification",
                location,
                "a capability verifier must not invoke the capability contract evaluator itself",
            )
        ]

    schema_only_targets = (
        "tests/test_contracts.py",
        "tests/test_package_validation.py",
    )
    invokes_schema_test = any(
        any(target in token for target in schema_only_targets) for token in normalized
    )
    invokes_package_validation = invokes_portable_cli and all(
        any(
            re.search(rf"(?:^|[^A-Za-z0-9_-]){word}(?:$|[^A-Za-z0-9_-])", token)
            for token in value
        )
        for word in ("package", "validate")
    )
    if "--check-only" in value or invokes_schema_test or invokes_package_validation:
        return [
            _error(
                "schema_only_verification",
                location,
                "a capability verifier must exercise behavior, not only schema or package validation",
            )
        ]
    return []


def _validate_string_list(value: Any, location: str, *, nonempty: bool) -> list[Error]:
    if not isinstance(value, list) or (nonempty and not value):
        qualifier = "non-empty " if nonempty else ""
        return [
            _error("invalid_type", location, f"must be a {qualifier}array of strings")
        ]
    errors: list[Error] = []
    seen: set[str] = set()
    for index, item in enumerate(value):
        item_location = f"{location}[{index}]"
        if not isinstance(item, str) or not item.strip():
            errors.append(
                _error("invalid_type", item_location, "must be a non-empty string")
            )
        elif item in seen:
            errors.append(
                _error("duplicate_value", item_location, f"duplicate value: {item}")
            )
        else:
            seen.add(item)
    return errors


def _validate_product(repo_root: Path, document: dict[str, Any]) -> list[Error]:
    errors: list[Error] = []
    if document.get("schema_version") != SCHEMA_VERSION:
        errors.append(
            _error(
                "unsupported_schema",
                "product.schema_version",
                "schema_version must be 1",
            )
        )

    product = document.get("product")
    if not isinstance(product, dict):
        errors.append(_error("invalid_type", "product.product", "must be an object"))
    else:
        for field in ("id", "name", "promise"):
            if not isinstance(product.get(field), str) or not product[field].strip():
                errors.append(
                    _error(
                        "missing_field",
                        f"product.product.{field}",
                        "must be a non-empty string",
                    )
                )
        errors.extend(
            _validate_string_list(
                product.get("non_promises"),
                "product.product.non_promises",
                nonempty=True,
            )
        )

    hosts = document.get("supported_hosts")
    host_ids: set[str] = set()
    if not isinstance(hosts, list) or not hosts:
        errors.append(
            _error(
                "invalid_type", "product.supported_hosts", "must be a non-empty array"
            )
        )
    else:
        for index, host in enumerate(hosts):
            fallback = f"[{index}]"
            if not isinstance(host, dict):
                errors.append(
                    _error(
                        "invalid_type",
                        f"product.supported_hosts{fallback}",
                        "must be an object",
                    )
                )
                continue
            host_id = host.get("id")
            location = (
                f"product.supported_hosts.{host_id}"
                if isinstance(host_id, str) and host_id
                else f"product.supported_hosts{fallback}"
            )
            if not isinstance(host_id, str) or _ID_RE.fullmatch(host_id) is None:
                errors.append(
                    _error("invalid_id", f"{location}.id", "host id must be kebab-case")
                )
            elif host_id in host_ids:
                errors.append(
                    _error(
                        "duplicate_id",
                        f"{location}.id",
                        f"duplicate host id: {host_id}",
                    )
                )
            else:
                host_ids.add(host_id)
            if host.get("support_level") not in SUPPORT_LEVELS:
                errors.append(
                    _error(
                        "invalid_value",
                        f"{location}.support_level",
                        "must be native or compatible",
                    )
                )
            errors.extend(
                _validate_path_list(
                    repo_root,
                    host.get("implementation_paths"),
                    f"{location}.implementation_paths",
                    require_existing=True,
                )
            )

    modes = document.get("installation_modes")
    mode_ids: set[str] = set()
    if not isinstance(modes, list) or not modes:
        errors.append(
            _error(
                "invalid_type",
                "product.installation_modes",
                "must be a non-empty array",
            )
        )
    else:
        for index, mode in enumerate(modes):
            fallback = f"[{index}]"
            if not isinstance(mode, dict):
                errors.append(
                    _error(
                        "invalid_type",
                        f"product.installation_modes{fallback}",
                        "must be an object",
                    )
                )
                continue
            mode_id = mode.get("id")
            location = (
                f"product.installation_modes.{mode_id}"
                if isinstance(mode_id, str) and mode_id
                else f"product.installation_modes{fallback}"
            )
            if not isinstance(mode_id, str) or _ID_RE.fullmatch(mode_id) is None:
                errors.append(
                    _error(
                        "invalid_id",
                        f"{location}.id",
                        "installation id must be kebab-case",
                    )
                )
            elif mode_id in mode_ids:
                errors.append(
                    _error(
                        "duplicate_id",
                        f"{location}.id",
                        f"duplicate installation id: {mode_id}",
                    )
                )
            else:
                mode_ids.add(mode_id)
            host = mode.get("host")
            if not isinstance(host, str) or host not in host_ids:
                errors.append(
                    _error(
                        "unknown_host",
                        f"{location}.host",
                        "installation mode must reference a supported host",
                    )
                )
            errors.extend(
                _validate_path_list(
                    repo_root,
                    mode.get("implementation_paths"),
                    f"{location}.implementation_paths",
                    require_existing=True,
                )
            )

    expected_privacy = {
        "local_first": True,
        "telemetry": "disabled",
        "remote_egress": "explicit_consent",
        "transcript_capture": "disabled",
        "source_payloads": "create_only_immutable",
        "destructive_repairs": "explicit_consent",
    }
    privacy = document.get("privacy_defaults")
    if not isinstance(privacy, dict):
        errors.append(
            _error("invalid_type", "product.privacy_defaults", "must be an object")
        )
    else:
        for field, expected in expected_privacy.items():
            if privacy.get(field) != expected:
                errors.append(
                    _error(
                        "unsafe_privacy_default",
                        f"product.privacy_defaults.{field}",
                        f"must be {expected!r}",
                    )
                )

    compatibility = document.get("compatibility")
    if not isinstance(compatibility, dict):
        errors.append(
            _error("invalid_type", "product.compatibility", "must be an object")
        )
    else:
        minimum_python = compatibility.get("minimum_python")
        if (
            not isinstance(minimum_python, str)
            or _PYTHON_VERSION_RE.fullmatch(minimum_python) is None
        ):
            errors.append(
                _error(
                    "invalid_value",
                    "product.compatibility.minimum_python",
                    "must be a major.minor version",
                )
            )
        expected_compatibility = {
            "vault_layout": "v1",
            "legacy_scripts": "supported_through_v1",
            "migration": "explicit_dry_run_first",
            "filesystem_fallback": True,
            "new_configuration_optional": True,
        }
        for field, expected in expected_compatibility.items():
            if compatibility.get(field) != expected:
                errors.append(
                    _error(
                        "invalid_value",
                        f"product.compatibility.{field}",
                        f"must be {expected!r}",
                    )
                )

    gates = document.get("release_gates")
    gate_ids: set[str] = set()
    if not isinstance(gates, list) or not gates:
        errors.append(
            _error("invalid_type", "product.release_gates", "must be a non-empty array")
        )
    else:
        for index, gate in enumerate(gates):
            fallback = f"[{index}]"
            if not isinstance(gate, dict):
                errors.append(
                    _error(
                        "invalid_type",
                        f"product.release_gates{fallback}",
                        "must be an object",
                    )
                )
                continue
            gate_id = gate.get("id")
            location = (
                f"product.release_gates.{gate_id}"
                if isinstance(gate_id, str) and gate_id
                else f"product.release_gates{fallback}"
            )
            if not isinstance(gate_id, str) or _ID_RE.fullmatch(gate_id) is None:
                errors.append(
                    _error(
                        "invalid_id",
                        f"{location}.id",
                        "release gate id must be kebab-case",
                    )
                )
            elif gate_id in gate_ids:
                errors.append(
                    _error(
                        "duplicate_id",
                        f"{location}.id",
                        f"duplicate release gate id: {gate_id}",
                    )
                )
            else:
                gate_ids.add(gate_id)
            if gate.get("required") is not True:
                errors.append(
                    _error(
                        "invalid_value",
                        f"{location}.required",
                        "release gates must be required",
                    )
                )
            verification = gate.get("verification")
            if not isinstance(verification, dict):
                errors.append(
                    _error(
                        "invalid_type", f"{location}.verification", "must be an object"
                    )
                )
                continue
            kind = verification.get("type")
            if kind == "command":
                errors.extend(
                    _validate_command(
                        verification.get("command"), f"{location}.verification.command"
                    )
                )
            elif kind == "manual":
                if (
                    not isinstance(verification.get("evidence"), str)
                    or not verification["evidence"].strip()
                ):
                    errors.append(
                        _error(
                            "missing_field",
                            f"{location}.verification.evidence",
                            "manual gates require an evidence description",
                        )
                    )
            else:
                errors.append(
                    _error(
                        "invalid_value",
                        f"{location}.verification.type",
                        "must be command or manual",
                    )
                )
    return errors


def _validate_capability(
    repo_root: Path, capability: Any, index: int
) -> tuple[str | None, list[Error]]:
    if not isinstance(capability, dict):
        return None, [
            _error(
                "invalid_type", f"capabilities[{index}]", "capability must be an object"
            )
        ]
    capability_id = capability.get("id")
    fallback = f"[{index}]"
    location = (
        f"capabilities.{capability_id}"
        if isinstance(capability_id, str) and capability_id
        else f"capabilities{fallback}"
    )
    errors: list[Error] = []
    if not isinstance(capability_id, str) or _ID_RE.fullmatch(capability_id) is None:
        errors.append(
            _error("invalid_id", f"{location}.id", "capability id must be kebab-case")
        )
        capability_id = None
    if capability.get("tier") not in CAPABILITY_TIERS:
        errors.append(
            _error(
                "invalid_value",
                f"{location}.tier",
                "tier must be core, extension, or reference",
            )
        )

    implementation_paths = capability.get("implementation_paths")
    errors.extend(
        _validate_path_list(
            repo_root,
            implementation_paths,
            f"{location}.implementation_paths",
            require_existing=True,
        )
    )
    if capability_id is not None and isinstance(implementation_paths, list):
        expected_skill = f"skills/{capability_id}/SKILL.md"
        if expected_skill not in implementation_paths:
            errors.append(
                _error(
                    "missing_skill_implementation",
                    f"{location}.implementation_paths",
                    f"must include {expected_skill}",
                )
            )

    read_scope = capability.get("read_scope")
    if not isinstance(read_scope, list) or not read_scope:
        errors.append(
            _error(
                "invalid_type", f"{location}.read_scope", "must be a non-empty array"
            )
        )
    else:
        seen_reads: set[str] = set()
        for scope_index, pattern in enumerate(read_scope):
            pattern_location = f"{location}.read_scope[{scope_index}]"
            errors.extend(_validate_scope_pattern(pattern, pattern_location))
            if isinstance(pattern, str):
                if pattern in seen_reads:
                    errors.append(
                        _error(
                            "duplicate_value",
                            pattern_location,
                            f"duplicate read scope: {pattern}",
                        )
                    )
                seen_reads.add(pattern)

    write_scope = capability.get("write_scope")
    writes = isinstance(write_scope, list) and bool(write_scope)
    if not isinstance(write_scope, list):
        errors.append(
            _error("invalid_type", f"{location}.write_scope", "must be an array")
        )
        write_scope = []
        writes = False
    seen_writes: set[str] = set()
    for scope_index, entry in enumerate(write_scope):
        entry_location = f"{location}.write_scope[{scope_index}]"
        if not isinstance(entry, dict):
            errors.append(
                _error("invalid_type", entry_location, "write scope must be an object")
            )
            continue
        pattern = entry.get("pattern")
        access = entry.get("access")
        errors.extend(_validate_scope_pattern(pattern, f"{entry_location}.pattern"))
        if access not in WRITE_ACCESS:
            errors.append(
                _error(
                    "invalid_value",
                    f"{entry_location}.access",
                    "access must be transactional, create_only, or runtime",
                )
            )
        if isinstance(pattern, str):
            if pattern in seen_writes:
                errors.append(
                    _error(
                        "duplicate_value",
                        f"{entry_location}.pattern",
                        f"duplicate write scope: {pattern}",
                    )
                )
            seen_writes.add(pattern)
            if pattern.startswith("plugin:"):
                errors.append(
                    _error(
                        "product_mutation",
                        f"{entry_location}.pattern",
                        "capabilities must not mutate product installation files",
                    )
                )
            if (
                pattern.startswith("vault:.raw/")
                and pattern != "vault:.raw/.manifest.json"
                and access != "create_only"
            ):
                errors.append(
                    _error(
                        "source_mutation",
                        f"{entry_location}.access",
                        "raw source payloads must be create_only",
                    )
                )

    needs = capability.get("needs")
    shell: bool | None = None
    network: bool | None = None
    if not isinstance(needs, dict):
        errors.append(_error("invalid_type", f"{location}.needs", "must be an object"))
    else:
        shell = needs.get("shell")
        network = needs.get("network")
        if not isinstance(shell, bool):
            errors.append(
                _error("invalid_type", f"{location}.needs.shell", "must be a boolean")
            )
        if not isinstance(network, bool):
            errors.append(
                _error("invalid_type", f"{location}.needs.network", "must be a boolean")
            )

    transaction_type = capability.get("transaction_type")
    if transaction_type not in TRANSACTION_TYPES:
        errors.append(
            _error(
                "invalid_value",
                f"{location}.transaction_type",
                "unknown transaction type",
            )
        )
    elif writes and transaction_type == "none":
        errors.append(
            _error(
                "inconsistent_transaction",
                f"{location}.transaction_type",
                "a writing capability must declare a transaction",
            )
        )
    elif not writes and transaction_type != "none":
        errors.append(
            _error(
                "inconsistent_transaction",
                f"{location}.transaction_type",
                "a non-writing capability must use transaction_type=none",
            )
        )
    if (
        any(
            isinstance(entry, dict)
            and entry.get("access") in {"transactional", "create_only"}
            for entry in write_scope
        )
        and transaction_type not in CORE_TRANSACTION_TYPES
    ):
        errors.append(
            _error(
                "unsupported_core_transaction",
                f"{location}.transaction_type",
                "transaction-backed write scopes must use a core operation type",
            )
        )

    confirmation = capability.get("confirmation")
    if not isinstance(confirmation, dict):
        errors.append(
            _error("invalid_type", f"{location}.confirmation", "must be an object")
        )
    else:
        mutation = confirmation.get("mutation")
        egress = confirmation.get("network_egress")
        destructive = confirmation.get("destructive")
        for field, value in (
            ("mutation", mutation),
            ("network_egress", egress),
            ("destructive", destructive),
        ):
            if value not in CONFIRMATION_POLICIES:
                errors.append(
                    _error(
                        "invalid_value",
                        f"{location}.confirmation.{field}",
                        "unknown confirmation policy",
                    )
                )
        if writes and mutation not in {"operation_scope", "explicit", "delegated"}:
            errors.append(
                _error(
                    "inconsistent_confirmation",
                    f"{location}.confirmation.mutation",
                    "writing capabilities require mutation authority",
                )
            )
        if not writes and mutation != "not_applicable":
            errors.append(
                _error(
                    "inconsistent_confirmation",
                    f"{location}.confirmation.mutation",
                    "read-only capabilities must use not_applicable",
                )
            )
        if network is True and egress != "explicit":
            errors.append(
                _error(
                    "inconsistent_confirmation",
                    f"{location}.confirmation.network_egress",
                    "network capabilities require explicit egress consent",
                )
            )
        if network is False and egress != "not_applicable":
            errors.append(
                _error(
                    "inconsistent_confirmation",
                    f"{location}.confirmation.network_egress",
                    "local capabilities must use not_applicable",
                )
            )
        if destructive not in {"explicit", "forbidden"}:
            errors.append(
                _error(
                    "inconsistent_confirmation",
                    f"{location}.confirmation.destructive",
                    "destructive changes must be explicit or forbidden",
                )
            )
        if transaction_type == "transport" and mutation != "delegated":
            errors.append(
                _error(
                    "inconsistent_confirmation",
                    f"{location}.confirmation.mutation",
                    "transport mutation authority must be delegated by its operation",
                )
            )
        if transaction_type != "transport" and mutation == "delegated":
            errors.append(
                _error(
                    "inconsistent_confirmation",
                    f"{location}.confirmation.mutation",
                    "only transport capabilities may delegate mutation authority",
                )
            )

    configuration = capability.get("configuration")
    if not isinstance(configuration, dict):
        errors.append(
            _error("invalid_type", f"{location}.configuration", "must be an object")
        )
    else:
        path_requirements = configuration.get("path_requirements")
        if not isinstance(path_requirements, list):
            errors.append(
                _error(
                    "invalid_type",
                    f"{location}.configuration.path_requirements",
                    "must be an array",
                )
            )
        else:
            seen_requirements: set[str] = set()
            for requirement_index, requirement in enumerate(path_requirements):
                requirement_location = (
                    f"{location}.configuration.path_requirements[{requirement_index}]"
                )
                if not isinstance(requirement, dict):
                    errors.append(
                        _error(
                            "invalid_type",
                            requirement_location,
                            "path requirement must be an object",
                        )
                    )
                    continue
                pattern = requirement.get("pattern")
                errors.extend(
                    _validate_scope_pattern(pattern, f"{requirement_location}.pattern")
                )
                if isinstance(pattern, str):
                    _, _, relative = pattern.partition(":")
                    if any(char in relative for char in _GLOB_CHARS):
                        errors.append(
                            _error(
                                "invalid_configuration_path",
                                f"{requirement_location}.pattern",
                                "configuration paths must be literal",
                            )
                        )
                    if pattern in seen_requirements:
                        errors.append(
                            _error(
                                "duplicate_value",
                                f"{requirement_location}.pattern",
                                f"duplicate configuration path: {pattern}",
                            )
                        )
                    seen_requirements.add(pattern)
                if requirement.get("kind") not in CONFIG_KINDS:
                    errors.append(
                        _error(
                            "invalid_value",
                            f"{requirement_location}.kind",
                            "kind must be file, directory, or either",
                        )
                    )
        external_commands = configuration.get("external_commands")
        if not isinstance(external_commands, list):
            errors.append(
                _error(
                    "invalid_type",
                    f"{location}.configuration.external_commands",
                    "must be an array",
                )
            )
        else:
            seen_commands: set[str] = set()
            for command_index, command in enumerate(external_commands):
                command_location = (
                    f"{location}.configuration.external_commands[{command_index}]"
                )
                if (
                    not isinstance(command, str)
                    or _COMMAND_RE.fullmatch(command) is None
                ):
                    errors.append(
                        _error(
                            "invalid_command",
                            command_location,
                            "external command must be a bare executable name",
                        )
                    )
                elif command in seen_commands:
                    errors.append(
                        _error(
                            "duplicate_value",
                            command_location,
                            f"duplicate external command: {command}",
                        )
                    )
                else:
                    seen_commands.add(command)
            if external_commands and shell is not True:
                errors.append(
                    _error(
                        "inconsistent_needs",
                        f"{location}.needs.shell",
                        "external commands require shell=true",
                    )
                )

    verification = capability.get("verification_command")
    verification_location = f"{location}.verification_command"
    errors.extend(
        _validate_command(verification, verification_location, allow_empty=True)
    )
    if isinstance(verification, list):
        if verification and all(isinstance(token, str) for token in verification):
            errors.extend(
                _validate_verification_semantics(verification, verification_location)
            )
        elif not verification:
            reason = capability.get("verification_reason")
            if not isinstance(reason, str) or not reason.strip():
                errors.append(
                    _error(
                        "missing_verification_reason",
                        f"{location}.verification_reason",
                        "an empty verification command requires an explicit non-empty reason",
                    )
                )
    return capability_id, errors


def _validate_capabilities(repo_root: Path, document: dict[str, Any]) -> list[Error]:
    errors: list[Error] = []
    if document.get("schema_version") != SCHEMA_VERSION:
        errors.append(
            _error(
                "unsupported_schema",
                "capabilities.schema_version",
                "schema_version must be 1",
            )
        )
    timeout = document.get("verification_timeout_seconds")
    if (
        not isinstance(timeout, int)
        or isinstance(timeout, bool)
        or not 1 <= timeout <= 300
    ):
        errors.append(
            _error(
                "invalid_value",
                "capabilities.verification_timeout_seconds",
                "must be an integer from 1 to 300",
            )
        )
    capabilities = document.get("capabilities")
    if not isinstance(capabilities, list) or not capabilities:
        return errors + [
            _error("invalid_type", "capabilities", "must be a non-empty array")
        ]

    ids: set[str] = set()
    for index, capability in enumerate(capabilities):
        capability_id, capability_errors = _validate_capability(
            repo_root, capability, index
        )
        errors.extend(capability_errors)
        if capability_id is not None:
            if capability_id in ids:
                errors.append(
                    _error(
                        "duplicate_id",
                        f"capabilities.{capability_id}.id",
                        f"duplicate capability id: {capability_id}",
                    )
                )
            ids.add(capability_id)

    skills_root = repo_root / "skills"
    discovered = {
        path.parent.name for path in skills_root.glob("*/SKILL.md") if path.is_file()
    }
    for skill_id in sorted(discovered - ids):
        errors.append(
            _error(
                "unregistered_skill",
                "capabilities.registry",
                f"skill has no capability contract: {skill_id}",
            )
        )
    for capability_id in sorted(ids - discovered):
        errors.append(
            _error(
                "missing_skill",
                f"capabilities.{capability_id}",
                f"capability has no matching skill: {capability_id}",
            )
        )
    return errors


def validate_contracts(
    repo_root: Path,
    product_path: Path | None = None,
    capabilities_path: Path | None = None,
) -> list[dict[str, str]]:
    """Validate both tracked contracts and return deterministic errors.

    The function deliberately returns errors rather than raising for malformed,
    missing, or inconsistent user-controlled contract files. An empty list is
    the stable success signal expected by CLI and release-gate callers.
    """

    root = Path(repo_root).resolve(strict=False)
    errors: list[Error] = []
    product, product_load_errors = _load_json(
        _contract_path(root, product_path, DEFAULT_PRODUCT_CONTRACT),
        "product_contract",
    )
    capabilities, capability_load_errors = _load_json(
        _contract_path(root, capabilities_path, DEFAULT_CAPABILITIES_CONTRACT),
        "capabilities_contract",
    )
    errors.extend(product_load_errors)
    errors.extend(capability_load_errors)
    if product is not None:
        errors.extend(_validate_product(root, product))
    if capabilities is not None:
        errors.extend(_validate_capabilities(root, capabilities))
    return _sorted_errors(errors)


def _configuration_requirement_state(
    capability: Mapping[str, Any], repo_root: Path, vault_root: Path
) -> tuple[str, list[str]]:
    configuration = capability["configuration"]
    requirements: list[tuple[str, bool]] = []
    roots = {"plugin": repo_root, "vault": vault_root}
    for requirement in configuration["path_requirements"]:
        pattern = requirement["pattern"]
        base, relative = pattern.split(":", 1)
        root = roots[base].resolve(strict=False)
        candidate = (root / relative).resolve(strict=False)
        contained = True
        try:
            candidate.relative_to(root)
        except ValueError:
            contained = False
        kind = requirement["kind"]
        present = contained and (
            candidate.is_file()
            if kind == "file"
            else candidate.is_dir()
            if kind == "directory"
            else candidate.exists()
        )
        requirements.append((pattern, present))

    search_path = os.environ.get("PATH")
    for command in configuration["external_commands"]:
        requirements.append(
            (f"command:{command}", shutil.which(command, path=search_path) is not None)
        )

    if not requirements or all(present for _, present in requirements):
        return "configured", []
    missing = sorted(label for label, present in requirements if not present)
    present_count = len(requirements) - len(missing)
    reasons = [f"missing configuration requirement: {label}" for label in missing]
    if present_count == 0:
        return "available", reasons
    return "degraded", [
        f"partial configuration: {present_count} of {len(requirements)} requirements present",
        *reasons,
    ]


def _run_verification(
    capability: Mapping[str, Any], repo_root: Path, timeout: int
) -> tuple[bool, str | None]:
    declared = capability["verification_command"]
    if not declared:
        return False, str(
            capability.get("verification_reason") or "no automated verifier declared"
        )
    command = [sys.executable if token == "{python}" else token for token in declared]
    try:
        completed = subprocess.run(
            command,
            cwd=repo_root,
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=timeout,
            check=False,
        )
    except subprocess.TimeoutExpired:
        return False, f"verification timed out after {timeout} seconds"
    except OSError:
        return False, f"verification command could not start: {declared[0]}"
    if completed.returncode != 0:
        return False, f"verification failed with exit code {completed.returncode}"
    return True, None


def _capability_errors(capability_id: str, errors: Sequence[Error]) -> list[Error]:
    prefix = f"capabilities.{capability_id}"
    return [
        item
        for item in errors
        if item["location"] == prefix
        or item["location"].startswith(prefix + ".")
        or item["location"].startswith(prefix + "[")
    ]


def evaluate_capabilities(
    repo_root: Path,
    vault_root: Path | None = None,
    verify: bool = False,
) -> dict[str, Any]:
    """Evaluate runtime capability readiness without persisting host paths.

    ``available`` means the implementation is present but optional runtime
    prerequisites are absent. ``configured`` means those prerequisites are
    ready but verification was not requested. ``verified`` is backed by a
    successful declared command. ``degraded`` represents a contract defect,
    partial configuration, or failed verification.
    """

    root = Path(repo_root).resolve(strict=False)
    vault = root if vault_root is None else Path(vault_root).resolve(strict=False)
    errors = validate_contracts(root)
    document, load_errors = _load_json(
        root / DEFAULT_CAPABILITIES_CONTRACT, "capabilities_contract"
    )
    if document is None:
        combined = _sorted_errors([*errors, *load_errors])
        return {
            "schema_version": SCHEMA_VERSION,
            "valid": False,
            "ok": False,
            "verification_requested": bool(verify),
            "summary": {state: 0 for state in CAPABILITY_STATES},
            "capabilities": [],
            "errors": combined,
        }

    timeout = document.get("verification_timeout_seconds", 30)
    if (
        not isinstance(timeout, int)
        or isinstance(timeout, bool)
        or not 1 <= timeout <= 300
    ):
        timeout = 30
    raw_capabilities = document.get("capabilities")
    capability_values = raw_capabilities if isinstance(raw_capabilities, list) else []
    results: list[dict[str, Any]] = []
    seen: set[str] = set()
    for capability in sorted(
        (item for item in capability_values if isinstance(item, dict)),
        key=lambda item: str(item.get("id", "")),
    ):
        capability_id = capability.get("id")
        if (
            not isinstance(capability_id, str)
            or not capability_id
            or capability_id in seen
        ):
            continue
        seen.add(capability_id)
        related_errors = _capability_errors(capability_id, errors)
        if related_errors:
            state = "degraded"
            reasons = [f"{item['code']}: {item['message']}" for item in related_errors]
        else:
            state, reasons = _configuration_requirement_state(capability, root, vault)
            verification = capability["verification_command"]
            if state == "configured" and not verification:
                reasons = [capability["verification_reason"]]
            elif verify and state == "configured":
                passed, reason = _run_verification(capability, root, timeout)
                if passed:
                    state = "verified"
                else:
                    state = "degraded"
                    reasons = [reason or "verification failed"]
        results.append(
            {
                "id": capability_id,
                "tier": capability.get("tier", "unknown"),
                "state": state,
                "reasons": sorted(set(reasons)),
            }
        )

    summary = {
        state: sum(1 for item in results if item["state"] == state)
        for state in CAPABILITY_STATES
    }
    return {
        "schema_version": SCHEMA_VERSION,
        "valid": not errors,
        "ok": not errors and summary["degraded"] == 0,
        "verification_requested": bool(verify),
        "summary": summary,
        "capabilities": results,
        "errors": errors,
    }


def _filter_report(report: dict[str, Any], capability_id: str) -> dict[str, Any]:
    selected = [item for item in report["capabilities"] if item["id"] == capability_id]
    if not selected:
        missing = _error(
            "unknown_capability", "capabilities", f"unknown capability: {capability_id}"
        )
        report = dict(report)
        report["errors"] = _sorted_errors([*report["errors"], missing])
        report["valid"] = False
        report["ok"] = False
    report["capabilities"] = selected
    report["summary"] = {
        state: sum(1 for item in selected if item["state"] == state)
        for state in CAPABILITY_STATES
    }
    return report


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Validate and inspect claude-obsidian contracts"
    )
    parser.add_argument("--repo-root", type=Path, default=Path.cwd())
    parser.add_argument("--vault-root", type=Path)
    parser.add_argument("--capability")
    parser.add_argument("--verify", action="store_true")
    parser.add_argument("--check-only", action="store_true")
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    if args.check_only:
        errors = validate_contracts(args.repo_root)
        if args.capability:
            report = evaluate_capabilities(
                args.repo_root, args.vault_root, verify=False
            )
            if not any(
                item["id"] == args.capability for item in report["capabilities"]
            ):
                errors = _sorted_errors(
                    [
                        *errors,
                        _error(
                            "unknown_capability",
                            "capabilities",
                            f"unknown capability: {args.capability}",
                        ),
                    ]
                )
        payload: dict[str, Any] = {
            "schema_version": SCHEMA_VERSION,
            "valid": not errors,
            "errors": errors,
        }
        print(json.dumps(payload, indent=2, sort_keys=True, ensure_ascii=False))
        return 0 if not errors else 2

    report = evaluate_capabilities(args.repo_root, args.vault_root, verify=args.verify)
    if args.capability:
        report = _filter_report(report, args.capability)
    print(json.dumps(report, indent=2, sort_keys=True, ensure_ascii=False))
    return 0 if report["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

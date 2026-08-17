#!/usr/bin/env python3
"""Hermetic provenance ledger and migration tests."""

from __future__ import annotations

import json
import hashlib
import sys
import tempfile
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from claude_obsidian.ledgers import (
    CLAIM_SCHEMA,
    LedgerValidationError,
    SOURCE_SCHEMA,
    migrate_legacy_manifest,
    migration_bundle,
    source_is_stale,
    stable_source_id,
    validate_claim_ledger,
    validate_source_ledger,
)
from claude_obsidian.transaction import (
    BUNDLE_SCHEMA,
    TransactionValidationError,
    apply_bundle,
)


def make_vault(root: Path) -> Path:
    (root / ".obsidian").mkdir(parents=True)
    (root / "wiki/meta/ledgers").mkdir(parents=True)
    (root / ".raw").mkdir()
    return root


def test_stable_source_ids() -> None:
    one = stable_source_id("file", ".raw/a.md", "a" * 64)
    two = stable_source_id("file", ".raw/a.md", "a" * 64)
    assert one == two and one.startswith("src-")
    assert one != stable_source_id("file", ".raw/a.md", "b" * 64)
    assert stable_source_id("file", ".raw/café.md", "a" * 64) != stable_source_id(
        "file", ".raw/cafe\u0301.md", "a" * 64
    )
    assert stable_source_id("file", ".raw/a.md", "a" * 64) != stable_source_id(
        "file", " .raw/a.md ", "a" * 64
    )


def test_migration_preserves_manifest_and_is_idempotent() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        source = vault / ".raw/a.md"
        source.write_text("source\n")
        manifest = {
            "version": 1,
            "sources": {
                ".raw/a.md": {
                    "hash": "legacy",
                    "ingested_at": "2026-01-02",
                    "pages_created": ["wiki/sources/A.md"],
                }
            },
            "address_map": {},
        }
        legacy_path = vault / ".raw/.manifest.json"
        legacy_path.write_text(json.dumps(manifest, indent=2))
        before = legacy_path.read_bytes()
        operation = migration_bundle(
            vault, operation_id="migrate", generated_at="2026-07-11T00:00:00Z"
        )
        result = apply_bundle(vault, operation)
        assert (
            SOURCE_SCHEMA
            in (vault / "wiki/meta/ledgers/source-ledger.json").read_text()
        )
        assert (
            CLAIM_SCHEMA in (vault / "wiki/meta/ledgers/claim-ledger.json").read_text()
        )
        assert legacy_path.read_bytes() == before
        assert apply_bundle(vault, operation) == result
        rerun = migration_bundle(
            vault, operation_id="migrate-again", generated_at="2026-07-11T01:00:00Z"
        )
        assert rerun["writes"] == []
        sources, claims = migrate_legacy_manifest(
            vault, generated_at="2026-07-11T00:00:00Z"
        )
        assert validate_source_ledger(sources, vault_root=vault) == []
        assert claims["claims"] == {}


def test_migration_rejects_non_nfc_file_aliases_portably() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        nfd = ".raw/cafe\u0301.md"
        (vault / nfd).write_bytes(b"legacy bytes\n")
        manifest = {
            "version": 1,
            "sources": {
                nfd: {"pages_created": ["wiki/sources/NFD.md"]},
            },
        }
        (vault / ".raw/.manifest.json").write_text(
            json.dumps(manifest), encoding="utf-8"
        )
        try:
            migrate_legacy_manifest(vault, generated_at="2026-07-11T00:00:00Z")
        except LedgerValidationError as exc:
            assert any(nfd in error["path"] for error in exc.errors)
            assert "cannot inspect source safely" in str(exc)
        else:
            raise AssertionError(
                "non-NFC legacy paths must fail before portable aliasing"
            )
        assert not (vault / "wiki/meta/ledgers/source-ledger.json").exists()


def test_migration_never_reads_a_symlinked_legacy_manifest() -> None:
    with tempfile.TemporaryDirectory() as td:
        base = Path(td)
        vault = make_vault(base / "vault")
        outside = base / "outside-manifest.json"
        outside.write_text(
            json.dumps(
                {
                    "sources": {
                        ".raw/a.md": {"pages_created": ["EXTERNAL_MIGRATION_SENTINEL"]}
                    }
                }
            ),
            encoding="utf-8",
        )
        (vault / ".raw/.manifest.json").symlink_to(outside)
        try:
            migration_bundle(
                vault,
                operation_id="symlinked-migration",
                generated_at="2026-07-11T00:00:00Z",
            )
        except TransactionValidationError as exc:
            assert exc.code in {"PATH_OUTSIDE_VAULT", "SYMLINK_WRITE_PATH"}
            assert "EXTERNAL_MIGRATION_SENTINEL" not in str(exc)
        else:
            raise AssertionError("migration must reject a symlinked legacy manifest")


def test_migration_rejects_malformed_existing_canonical_ledgers() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        target = vault / "wiki/meta/ledgers/source-ledger.json"
        target.write_text('{"schema":"wrong","sources":{}}\n', encoding="utf-8")
        before = target.read_bytes()
        try:
            migration_bundle(
                vault,
                operation_id="invalid-existing-ledger",
                generated_at="2026-07-11T00:00:00Z",
            )
        except LedgerValidationError as exc:
            assert "source-ledger.json.schema" in str(exc.errors)
        else:
            raise AssertionError("malformed canonical ledger must block migration")
        assert target.read_bytes() == before


def test_migration_rejects_non_object_or_lossy_legacy_manifest_records() -> None:
    cases = (
        [],
        {"sources": {".raw/a.md": "not-an-object"}},
        {"sources": {".raw/a.md": {"pages_created": "wiki/A.md"}}},
    )
    for value in cases:
        with tempfile.TemporaryDirectory() as td:
            vault = make_vault(Path(td) / "vault")
            (vault / ".raw/.manifest.json").write_text(
                json.dumps(value), encoding="utf-8"
            )
            try:
                migration_bundle(
                    vault,
                    operation_id="malformed-legacy",
                    generated_at="2026-07-11T00:00:00Z",
                )
            except LedgerValidationError:
                pass
            else:
                raise AssertionError("lossy legacy migration must fail closed")


def test_migration_rejects_non_scalar_legacy_paths_without_crashing() -> None:
    invalid_source = json.loads('".raw/\\ud800"')
    invalid_page = json.loads('"wiki/\\ud800.md"')
    cases = (
        {"sources": {invalid_source: {"pages_created": []}}},
        {"sources": {".raw/a.md": {"pages_created": [invalid_page]}}},
    )
    for value in cases:
        with tempfile.TemporaryDirectory() as td:
            vault = make_vault(Path(td) / "vault")
            (vault / ".raw/.manifest.json").write_text(
                json.dumps(value), encoding="utf-8"
            )
            before = (vault / ".raw/.manifest.json").read_bytes()
            try:
                migration_bundle(
                    vault,
                    operation_id="non-scalar-legacy",
                    generated_at="2026-07-11T00:00:00Z",
                )
            except LedgerValidationError as exc:
                assert exc.errors
            else:
                raise AssertionError("non-scalar legacy paths must fail closed")
            assert (vault / ".raw/.manifest.json").read_bytes() == before


def test_migration_rejects_duplicate_json_object_keys() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        (vault / ".raw/a.md").write_text("source\n", encoding="utf-8")
        manifest = (
            '{"sources":{".raw/a.md":{"pages_created":["wiki/sources/First.md"]},'
            '".raw/a.md":{"pages_created":["wiki/sources/Second.md"]}}}'
        )
        path = vault / ".raw/.manifest.json"
        path.write_text(manifest, encoding="utf-8")
        before = path.read_bytes()
        try:
            migration_bundle(
                vault,
                operation_id="duplicate-legacy-key",
                generated_at="2026-07-11T00:00:00Z",
            )
        except LedgerValidationError as exc:
            assert "duplicate JSON object key" in str(exc)
        else:
            raise AssertionError("duplicate legacy JSON keys must fail closed")
        assert path.read_bytes() == before


def test_source_validation_and_staleness() -> None:
    source = {
        "origin": {"kind": "url", "locator": "http://example.com"},
        "content_kind": "webpage",
        "title": "X",
        "authority": "official",
        "content_sha256": None,
        "ingested_at": None,
        "retrieved_at": "2026-01-01",
        "refresh_due": "2026-02-01",
        "review_status": "active",
        "independence_key": "example",
        "pages": [],
        "supersedes": None,
    }
    ledger = {
        "schema": SOURCE_SCHEMA,
        "generated_at": "2026-01-01T00:00:00Z",
        "sources": {"src-x": source},
    }
    errors = validate_source_ledger(ledger)
    assert any("HTTPS" in error["message"] for error in errors)
    source["origin"]["locator"] = "https://user:password@example.com/private"
    errors = validate_source_ledger(ledger)
    assert any("userinfo credentials" in error["message"] for error in errors)
    for locator in (
        "https://example.com/object?X-Amz-Signature=secret",
        "https://example.com/object?X-Amz-Credential=AKIAEXAMPLE",
        "https://example.com/object?X-Amz-Security-Token=secret",
        "https://example.com/object?AWSAccessKeyId=AKIAEXAMPLE",
    ):
        source["origin"]["locator"] = locator
        errors = validate_source_ledger(ledger)
        assert any(
            "sensitive URL query parameter" in error["message"] for error in errors
        )
    source["origin"]["locator"] = "https://example.com"
    source_id = stable_source_id("url", "https://example.com", None)
    ledger["sources"] = {source_id: source}
    assert validate_source_ledger(ledger) == []
    assert source_is_stale(source, as_of=date(2026, 7, 11))


def test_claim_acceptance_requires_fresh_independent_support() -> None:
    source_template = {
        "origin": {"kind": "url", "locator": "https://example.com"},
        "content_kind": "webpage",
        "title": "X",
        "authority": "official",
        "content_sha256": None,
        "ingested_at": None,
        "retrieved_at": "2026-07-01",
        "refresh_due": "2027-01-01",
        "review_status": "active",
        "independence_key": "publisher-a",
        "pages": [],
        "supersedes": None,
    }
    sources = {"schema": SOURCE_SCHEMA, "sources": {"src-a": source_template}}
    claim = {
        "text": "A falsifiable claim.",
        "location": {"path": "wiki/A.md", "anchor": "Claim"},
        "risk": "high",
        "assessment": "accepted",
        "confidence": "high",
        "evidence": [{"source_id": "src-a", "relation": "supports", "locator": None}],
        "reviewed_at": "2026-07-11",
        "supersedes": None,
        "notes": None,
    }
    claims = {
        "schema": CLAIM_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "claims": {"clm-a": claim},
    }
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    assert any("two independent" in error["message"] for error in errors)
    duplicate = dict(source_template)
    duplicate["independence_key"] = None
    original_key = source_template["independence_key"]
    source_template["independence_key"] = None
    sources["sources"]["src-duplicate"] = duplicate
    claim["evidence"].append(
        {"source_id": "src-duplicate", "relation": "supports", "locator": None}
    )
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    assert any("two independent" in error["message"] for error in errors)
    claim["evidence"].pop()
    sources["sources"].pop("src-duplicate")
    source_template["independence_key"] = original_key
    rejected = dict(source_template)
    rejected["origin"] = {"kind": "url", "locator": "https://rejected.example"}
    rejected["authority"] = "synthetic"
    rejected["review_status"] = "rejected"
    rejected["refresh_due"] = "2026-01-01"
    rejected["independence_key"] = "publisher-rejected"
    sources["sources"]["src-rejected"] = rejected
    claim["evidence"].append(
        {"source_id": "src-rejected", "relation": "supports", "locator": None}
    )
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    assert any("two independent" in error["message"] for error in errors)
    second = dict(source_template)
    second["origin"] = {"kind": "url", "locator": "https://other.example"}
    second["independence_key"] = "publisher-b"
    sources["sources"]["src-b"] = second
    claim["evidence"].append(
        {"source_id": "src-b", "relation": "supports", "locator": None}
    )
    assert validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11)) == []


def test_missing_freshness_synthetic_sources_and_malformed_evidence_fail_closed() -> (
    None
):
    source = {
        "origin": {"kind": "url", "locator": "https://example.com/source"},
        "content_kind": "synthetic",
        "title": "Source",
        "authority": "official",
        "content_sha256": None,
        "ingested_at": None,
        "retrieved_at": None,
        "refresh_due": None,
        "review_status": "active",
        "independence_key": None,
        "pages": [],
        "supersedes": None,
    }
    sources = {"schema": SOURCE_SCHEMA, "sources": {"src-a": source}}
    source_errors = validate_source_ledger(sources)
    assert any("refresh_due" in error["path"] for error in source_errors)
    assert any("synthetic" in error["message"] for error in source_errors)
    claim = {
        "text": "A claim.",
        "location": {"path": "wiki/A.md", "anchor": None},
        "risk": "normal",
        "assessment": "accepted",
        "confidence": "high",
        "evidence": [{"source_id": [], "relation": [], "locator": None}],
        "reviewed_at": "2026-07-11",
    }
    claims = {
        "schema": CLAIM_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "claims": {"clm-a": claim},
    }
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    assert any("source_id" in error["path"] for error in errors)
    assert any("fresh active support" in error["message"] for error in errors)


def test_independence_cannot_override_duplicate_origin_or_content() -> None:
    def source(locator: str, key: str, digest: str | None = None) -> dict:
        return {
            "origin": {"kind": "url", "locator": locator},
            "content_kind": "webpage",
            "title": locator,
            "authority": "official",
            "content_sha256": digest,
            "ingested_at": None,
            "retrieved_at": "2026-07-01",
            "refresh_due": "2027-01-01",
            "review_status": "active",
            "independence_key": key,
            "pages": [],
            "supersedes": None,
        }

    claim = {
        "text": "High-risk claim.",
        "location": {"path": "wiki/A.md", "anchor": None},
        "risk": "high",
        "assessment": "accepted",
        "confidence": "high",
        "evidence": [
            {"source_id": "src-a", "relation": "supports", "locator": None},
            {"source_id": "src-b", "relation": "supports", "locator": None},
        ],
        "reviewed_at": "2026-07-11",
    }
    claims = {
        "schema": CLAIM_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "claims": {"clm-a": claim},
    }
    same_origin = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://example.com/same", "declared-a"),
            "src-b": source("https://example.com/same", "declared-b"),
        },
    }
    errors = validate_claim_ledger(claims, same_origin, as_of=date(2026, 7, 11))
    assert any("two independent" in error["message"] for error in errors)

    same_uri_spelling = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://example.com/doc?q=%7E", "declared-a"),
            "src-b": source("https://example.com/doc?q=%7e", "declared-b"),
        },
    }
    errors = validate_claim_ledger(claims, same_uri_spelling, as_of=date(2026, 7, 11))
    assert any("two independent" in error["message"] for error in errors)

    same_ipv6_endpoint = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://[2001:db8::1]/doc", "declared-a"),
            "src-b": source("https://[2001:0db8:0:0:0:0:0:1]/doc", "declared-b"),
        },
    }
    errors = validate_claim_ledger(claims, same_ipv6_endpoint, as_of=date(2026, 7, 11))
    assert any("two independent" in error["message"] for error in errors)

    same_iri_spelling = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://example.com/café?q=naïve", "declared-a"),
            "src-b": source("https://example.com/caf%C3%A9?q=na%C3%AFve", "declared-b"),
        },
    }
    errors = validate_claim_ledger(claims, same_iri_spelling, as_of=date(2026, 7, 11))
    assert any("two independent" in error["message"] for error in errors)

    same_registered_name = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://example.com/doc", "declared-a"),
            "src-b": source("https://%65xa%6Dple.com/doc", "declared-b"),
        },
    }
    errors = validate_claim_ledger(
        claims, same_registered_name, as_of=date(2026, 7, 11)
    )
    assert any("two independent" in error["message"] for error in errors)

    same_idn_registered_name = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://café.example/doc", "declared-a"),
            "src-b": source("https://caf%C3%A9.example/doc", "declared-b"),
        },
    }
    errors = validate_claim_ledger(
        claims, same_idn_registered_name, as_of=date(2026, 7, 11)
    )
    assert any("two independent" in error["message"] for error in errors)

    same_unicode_key = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://one.example/doc", "café"),
            "src-b": source("https://two.example/doc", "cafe\u0301"),
        },
    }
    errors = validate_claim_ledger(claims, same_unicode_key, as_of=date(2026, 7, 11))
    assert any("two independent" in error["message"] for error in errors)

    scoped_ipv6 = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://[fe80::1%25eth0]/doc", "declared-a"),
            "src-b": source("https://[fe80::1%eth0]/doc", "declared-b"),
        },
    }
    errors = validate_claim_ledger(claims, scoped_ipv6, as_of=date(2026, 7, 11))
    assert any("fresh active support" in error["message"] for error in errors)
    for source_id, record in scoped_ipv6["sources"].items():
        source_ledger = {
            "schema": SOURCE_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "sources": {source_id: record},
        }
        source_errors = validate_source_ledger(source_ledger, as_of=date(2026, 7, 11))
        assert any("malformed" in error["message"] for error in source_errors)

    digest = "a" * 64
    same_bytes = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://one.example/source", "one", digest),
            "src-b": source("https://two.example/mirror", "two", digest),
        },
    }
    errors = validate_claim_ledger(claims, same_bytes, as_of=date(2026, 7, 11))
    assert any("two independent" in error["message"] for error in errors)


def test_malformed_url_origins_never_count_as_evidence() -> None:
    def source(locator: str) -> dict:
        return {
            "origin": {"kind": "url", "locator": locator},
            "content_kind": "webpage",
            "title": "Source",
            "authority": "official",
            "content_sha256": None,
            "ingested_at": None,
            "retrieved_at": "2026-07-01",
            "refresh_due": "2027-01-01",
            "review_status": "active",
            "independence_key": None,
            "pages": [],
            "supersedes": None,
        }

    malformed = (
        "https://bad one.example/evidence",
        "https://bad-two.example/evidence\nignored",
        "https://bad_two.example/evidence",
        "https://-bad.example/evidence",
        "https://example..com/evidence",
        "https://example.com/raw space",
        "https://example.com/<raw>",
        "https://example.com\\evil",
        "https://0x7f000001/evidence",
        "https://0x7f.0.0.1/evidence",
        "https://0x7f.0x0.0x0.0x1/evidence",
        "https://faß.de/evidence",
        "https://example.com/evidence#",
    )
    for index, locator in enumerate(malformed):
        record = source(locator)
        ledger = {
            "schema": SOURCE_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "sources": {f"src-invalid-{index}": record},
        }
        errors = validate_source_ledger(ledger, as_of=date(2026, 7, 11))
        assert any("malformed" in error["message"] for error in errors), locator

    sources = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source(malformed[0]),
            "src-b": source(malformed[1]),
        },
    }
    claim = {
        "text": "High-risk malformed-origin claim.",
        "location": {"path": "wiki/A.md", "anchor": None},
        "risk": "high",
        "assessment": "accepted",
        "confidence": "high",
        "evidence": [
            {"source_id": "src-a", "relation": "supports", "locator": None},
            {"source_id": "src-b", "relation": "supports", "locator": None},
        ],
        "reviewed_at": "2026-07-11",
        "supersedes": None,
        "notes": None,
    }
    claims = {
        "schema": CLAIM_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "claims": {"clm-malformed": claim},
    }
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    assert any("fresh active support" in error["message"] for error in errors)
    assert any("two independent" in error["message"] for error in errors)

    legacy_numeric_sources = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://127.0.0.1/evidence"),
            "src-b": source("https://0x7f000001/evidence"),
        },
    }
    errors = validate_claim_ledger(
        claims, legacy_numeric_sources, as_of=date(2026, 7, 11)
    )
    assert any("two independent" in error["message"] for error in errors)

    idna_deviation_sources = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://faß.de/evidence"),
            "src-b": source("https://xn--fa-hia.de/evidence"),
        },
    }
    errors = validate_claim_ledger(
        claims, idna_deviation_sources, as_of=date(2026, 7, 11)
    )
    assert any("two independent" in error["message"] for error in errors)

    distinct_idna_sources = {
        "schema": SOURCE_SCHEMA,
        "sources": {
            "src-a": source("https://fass.de/evidence"),
            "src-b": source("https://xn--fa-hia.de/evidence"),
        },
    }
    assert (
        validate_claim_ledger(claims, distinct_idna_sources, as_of=date(2026, 7, 11))
        == []
    )

    valid_locator = "https://example.com/encoded%20space"
    valid_id = stable_source_id("url", valid_locator, None)
    valid_ledger = {
        "schema": SOURCE_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "sources": {valid_id: source(valid_locator)},
    }
    assert validate_source_ledger(valid_ledger, as_of=date(2026, 7, 11)) == []


def test_active_file_source_must_exist_and_match_its_hash() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        source = vault / ".raw/source.bin"
        source.write_bytes(b"actual bytes")
        record = {
            "origin": {"kind": "file", "locator": ".raw/source.bin"},
            "content_kind": "document",
            "title": "Source",
            "authority": "primary",
            "content_sha256": "0" * 64,
            "ingested_at": "2026-07-01",
            "retrieved_at": None,
            "refresh_due": "2027-01-01",
            "review_status": "active",
            "independence_key": None,
            "pages": ["wiki/A.md"],
            "supersedes": None,
        }
        ledger = {
            "schema": SOURCE_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "sources": {"src-file": record},
        }
        errors = validate_source_ledger(ledger, vault_root=vault)
        assert any("current file bytes" in error["message"] for error in errors)
        record["origin"]["locator"] = ".raw/missing.bin"
        errors = validate_source_ledger(ledger, vault_root=vault)
        assert any("does not exist" in error["message"] for error in errors)


def test_atomic_ingest_validates_planned_raw_evidence() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        raw_path = ".raw/captured/source.bin"
        raw_bytes = b"planned evidence bytes"
        digest = hashlib.sha256(raw_bytes).hexdigest()
        source_id = stable_source_id("file", raw_path, digest)
        source_ledger = {
            "schema": SOURCE_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "sources": {
                source_id: {
                    "origin": {"kind": "file", "locator": raw_path},
                    "content_kind": "document",
                    "title": "Planned source",
                    "authority": "primary",
                    "content_sha256": digest,
                    "ingested_at": "2026-07-11",
                    "retrieved_at": None,
                    "refresh_due": "2027-01-01",
                    "review_status": "active",
                    "independence_key": None,
                    "pages": ["wiki/A.md"],
                    "supersedes": None,
                }
            },
        }
        claim_ledger = {
            "schema": CLAIM_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "claims": {
                "clm-planned": {
                    "text": "The planned source was ingested.",
                    "location": {"path": "wiki/A.md", "anchor": None},
                    "risk": "normal",
                    "assessment": "accepted",
                    "confidence": "high",
                    "evidence": [
                        {
                            "source_id": source_id,
                            "relation": "supports",
                            "locator": None,
                        }
                    ],
                    "reviewed_at": "2026-07-11",
                }
            },
        }
        paths = (
            raw_path,
            "wiki/A.md",
            "wiki/meta/ledgers/source-ledger.json",
            "wiki/meta/ledgers/claim-ledger.json",
        )
        operation = {
            "schema": BUNDLE_SCHEMA,
            "operation_id": "planned-evidence",
            "operation_type": "ingest",
            "expected_hashes": {path: None for path in paths},
            "writes": [
                {"path": raw_path, "mode": "create", "content": raw_bytes.decode()},
                {
                    "path": "wiki/A.md",
                    "mode": "create",
                    "content": "---\ntype: concept\n---\n# A\n",
                },
                {
                    "path": "wiki/meta/ledgers/source-ledger.json",
                    "mode": "create",
                    "content": json.dumps(source_ledger),
                },
                {
                    "path": "wiki/meta/ledgers/claim-ledger.json",
                    "mode": "create",
                    "content": json.dumps(claim_ledger),
                },
            ],
        }
        apply_bundle(vault, operation)
        assert (vault / raw_path).read_bytes() == raw_bytes


def test_provenance_page_and_anchor_locations_must_resolve() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        raw = vault / ".raw/source.bin"
        raw.write_bytes(b"source")
        digest = hashlib.sha256(raw.read_bytes()).hexdigest()
        source = {
            "origin": {"kind": "file", "locator": ".raw/source.bin"},
            "content_kind": "document",
            "title": "Source",
            "authority": "primary",
            "content_sha256": digest,
            "ingested_at": "2026-07-01",
            "retrieved_at": None,
            "refresh_due": "2027-01-01",
            "review_status": "active",
            "independence_key": None,
            "pages": ["wiki/Missing.md"],
            "supersedes": None,
        }
        sources = {
            "schema": SOURCE_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "sources": {"src-file": source},
        }
        errors = validate_source_ledger(sources, vault_root=vault)
        assert any("linked page does not exist" in error["message"] for error in errors)

        page = vault / "wiki/A.md"
        page.write_text("# Known heading\n", encoding="utf-8")
        claim = {
            "text": "Located claim.",
            "location": {"path": "wiki/A.md", "anchor": "Missing heading"},
            "risk": "normal",
            "assessment": "accepted",
            "confidence": "high",
            "evidence": [
                {"source_id": "src-file", "relation": "supports", "locator": None}
            ],
            "reviewed_at": "2026-07-11",
        }
        claims = {
            "schema": CLAIM_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "claims": {"clm-a": claim},
        }
        errors = validate_claim_ledger(
            claims, sources, as_of=date(2026, 7, 11), vault_root=vault
        )
        assert any("anchor does not exist" in error["message"] for error in errors)
        claim["location"]["path"] = "wiki/AlsoMissing.md"
        claim["location"]["anchor"] = None
        errors = validate_claim_ledger(
            claims, sources, as_of=date(2026, 7, 11), vault_root=vault
        )
        assert any("claim page does not exist" in error["message"] for error in errors)


def test_temporal_identity_and_contradiction_rules_fail_closed() -> None:
    canonical = stable_source_id("url", "https://EXAMPLE.com:443/doc", None)
    assert canonical == stable_source_id("url", "https://example.com/doc", None)
    assert canonical == stable_source_id("url", "https://example.com/a/../doc", None)
    assert canonical == stable_source_id("url", "https://example.com/%64oc", None)
    assert stable_source_id(
        "url", "https://example.com/a%2Fb", None
    ) != stable_source_id("url", "https://example.com/a/b", None)
    canonical_query = stable_source_id("url", "https://example.com/doc?q=%7E", None)
    assert canonical_query == stable_source_id(
        "url", "https://example.com/doc?q=%7e", None
    )
    assert canonical_query == stable_source_id(
        "url", "https://example.com/doc?q=~", None
    )
    assert stable_source_id(
        "url", "https://example.com/doc?q=%2f", None
    ) == stable_source_id("url", "https://example.com/doc?q=%2F", None)
    assert stable_source_id(
        "url", "https://example.com/doc?q=%2F", None
    ) != stable_source_id("url", "https://example.com/doc?q=/", None)
    assert stable_source_id("url", "https://example.com/doc", None) != stable_source_id(
        "url", "https://example.com/doc?", None
    )
    canonical_ipv6 = stable_source_id("url", "https://[2001:db8::1]/doc", None)
    assert canonical_ipv6 == stable_source_id(
        "url", "https://[2001:0db8:0:0:0:0:0:1]/doc", None
    )
    canonical_host = stable_source_id("url", "https://example.com/doc", None)
    assert canonical_host == stable_source_id(
        "url", "https://%65xa%6Dple.com/doc", None
    )
    canonical_idn_host = stable_source_id("url", "https://café.example/doc", None)
    assert canonical_idn_host == stable_source_id(
        "url", "https://caf%C3%A9.example/doc", None
    )
    assert canonical_idn_host == stable_source_id(
        "url", "https://xn--caf-dma.example/doc", None
    )
    canonical_iri = stable_source_id("url", "https://example.com/café?q=naïve", None)
    assert canonical_iri == stable_source_id(
        "url", "https://example.com/caf%C3%A9?q=na%C3%AFve", None
    )
    assert canonical_iri == stable_source_id(
        "url", "https://example.com/cafe%CC%81?q=nai%CC%88ve", None
    )

    source_id = stable_source_id("url", "https://example.com/source", None)
    source = {
        "origin": {"kind": "url", "locator": "https://example.com/source"},
        "content_kind": "webpage",
        "title": "Source",
        "authority": "official",
        "content_sha256": None,
        "ingested_at": None,
        "retrieved_at": "2099-01-01",
        "refresh_due": "2099-02-01",
        "review_status": "active",
        "independence_key": None,
        "pages": [],
        "supersedes": None,
    }
    sources = {
        "schema": SOURCE_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "sources": {source_id: source},
    }
    errors = validate_source_ledger(sources, as_of=date(2026, 7, 11))
    assert any("after the audit date" in error["message"] for error in errors)
    source["retrieved_at"] = "2026-07-11NOT-A-DATE"
    errors = validate_source_ledger(sources, as_of=date(2026, 7, 11))
    assert any("ISO date" in error["message"] for error in errors)

    source["retrieved_at"] = "2026-07-01"
    source["refresh_due"] = "2027-01-01"
    claim = {
        "text": "Temporal claim.",
        "location": {"path": "wiki/A.md", "anchor": None},
        "risk": "normal",
        "assessment": "accepted",
        "confidence": "high",
        "evidence": [{"source_id": source_id, "relation": "supports", "locator": None}],
        "reviewed_at": "2020-01-01",
    }
    claims = {
        "schema": CLAIM_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "claims": {"clm-temporal": claim},
    }
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    assert any("fresh active support" in error["message"] for error in errors)
    claim["reviewed_at"] = "2099-01-01"
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    assert any("review date must not be after" in error["message"] for error in errors)

    claim["reviewed_at"] = "2026-07-11"
    second_id = stable_source_id("url", "https://other.example/source", None)
    second = dict(source)
    second["origin"] = {"kind": "url", "locator": "https://other.example/source"}
    sources["sources"][second_id] = second
    claim["evidence"].append(
        {"source_id": second_id, "relation": "contradicts", "locator": None}
    )
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    assert any("contradictory evidence" in error["message"] for error in errors)


def test_code_and_comment_examples_are_not_claim_anchors() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        page = vault / "wiki/A.md"
        page.write_text(
            "# Real\n\n```markdown\n# Fake\ntext ^fake-block\n```\n"
            "<!--\n# Comment Fake\ntext ^comment-fake\n-->\n",
            encoding="utf-8",
        )
        sources = {
            "schema": SOURCE_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "sources": {},
        }
        for anchor in ("Fake", "^fake-block", "Comment Fake", "^comment-fake"):
            claim = {
                "text": "Anchor claim.",
                "location": {"path": "wiki/A.md", "anchor": anchor},
                "risk": "normal",
                "assessment": "unsupported",
                "confidence": "low",
                "evidence": [],
                "reviewed_at": "2026-07-11",
            }
            claims = {
                "schema": CLAIM_SCHEMA,
                "generated_at": "2026-07-11T00:00:00Z",
                "claims": {"clm-anchor": claim},
            }
            errors = validate_claim_ledger(
                claims, sources, as_of=date(2026, 7, 11), vault_root=vault
            )
            assert any(
                "anchor does not exist" in error["message"] for error in errors
            ), anchor


def test_transaction_rejects_invalid_provenance_pair() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        source_path = "wiki/meta/ledgers/source-ledger.json"
        claim_path = "wiki/meta/ledgers/claim-ledger.json"
        source = {
            "schema": SOURCE_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "sources": {},
        }
        claims = {
            "schema": CLAIM_SCHEMA,
            "generated_at": "2026-07-11T00:00:00Z",
            "claims": {
                "clm-invalid": {
                    "text": "Unsupported acceptance.",
                    "risk": "normal",
                    "assessment": "accepted",
                    "confidence": "high",
                    "evidence": [],
                }
            },
        }
        operation = {
            "schema": BUNDLE_SCHEMA,
            "operation_id": "invalid-ledgers",
            "operation_type": "migration",
            "expected_hashes": {source_path: None, claim_path: None},
            "writes": [
                {
                    "path": source_path,
                    "mode": "create",
                    "content": json.dumps(source),
                },
                {
                    "path": claim_path,
                    "mode": "create",
                    "content": json.dumps(claims),
                },
            ],
        }
        try:
            apply_bundle(vault, operation)
        except TransactionValidationError as exc:
            assert exc.code == "INVALID_PROVENANCE_LEDGER"
        else:
            raise AssertionError("invalid accepted claims must not be applied")
        assert not (vault / source_path).exists()
        assert not (vault / claim_path).exists()


def test_transaction_rejects_duplicate_provenance_json_keys() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        source_path = "wiki/meta/ledgers/source-ledger.json"
        duplicate = (
            '{"schema":"claude-obsidian.source-ledger.v1",'
            '"generated_at":"2026-07-11T00:00:00Z",'
            '"sources":{"src-a":{},"src-a":{}}}'
        )
        operation = {
            "schema": BUNDLE_SCHEMA,
            "operation_id": "duplicate-provenance-keys",
            "operation_type": "migration",
            "expected_hashes": {source_path: None},
            "writes": [{"path": source_path, "mode": "create", "content": duplicate}],
        }
        try:
            apply_bundle(vault, operation)
        except TransactionValidationError as exc:
            assert exc.code == "INVALID_JSON"
            assert "duplicate JSON object key" in str(exc)
        else:
            raise AssertionError("duplicate provenance keys must not be applied")
        assert not (vault / source_path).exists()


def test_non_scalar_url_text_is_a_validation_error_not_a_crash() -> None:
    locator = json.loads('"https://example.com/\\ud800"')
    source_id = stable_source_id("url", locator, None)
    source = {
        "origin": {"kind": "url", "locator": locator},
        "content_kind": "webpage",
        "title": "Invalid Unicode source",
        "authority": "official",
        "content_sha256": None,
        "ingested_at": None,
        "retrieved_at": "2026-07-01",
        "refresh_due": "2027-01-01",
        "review_status": "active",
        "independence_key": None,
        "pages": [],
        "supersedes": None,
    }
    ledger = {
        "schema": SOURCE_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "sources": {source_id: source},
    }
    errors = validate_source_ledger(ledger, as_of=date(2026, 7, 11))
    assert any("Unicode scalar values" in error["message"] for error in errors)

    source["content_sha256"] = json.loads('"' + "\\ud800" * 64 + '"')
    errors = validate_source_ledger(ledger, as_of=date(2026, 7, 11))
    assert any("64-character SHA-256" in error["message"] for error in errors)


def test_optional_provenance_fields_are_strictly_typed() -> None:
    locator = "https://example.com/source"
    source_id = stable_source_id("url", locator, None)
    source = {
        "origin": {"kind": "url", "locator": locator},
        "content_kind": "webpage",
        "title": "Source",
        "authority": "official",
        "content_sha256": None,
        "ingested_at": None,
        "retrieved_at": "2026-07-01",
        "refresh_due": "2027-01-01",
        "review_status": "active",
        "independence_key": None,
        "pages": [],
        "supersedes": {"not": "an ID"},
    }
    sources = {
        "schema": SOURCE_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "sources": {source_id: source},
    }
    errors = validate_source_ledger(sources, as_of=date(2026, 7, 11))
    assert any(error["path"].endswith(".supersedes") for error in errors)
    source["supersedes"] = None
    source["title"] = json.loads('"\\ud800"')
    errors = validate_source_ledger(sources, as_of=date(2026, 7, 11))
    assert any(error["path"].endswith(".title") for error in errors)
    source["title"] = "Source"

    claim = {
        "text": "Contested claim.",
        "location": {"path": "wiki/A.md", "anchor": None},
        "risk": "normal",
        "assessment": "contested",
        "confidence": "unknown",
        "evidence": [],
        "reviewed_at": True,
        "supersedes": ["clm-old"],
        "notes": {"not": "text"},
    }
    claims = {
        "schema": CLAIM_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "claims": {"clm-strict": claim},
    }
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    paths = {error["path"] for error in errors}
    assert "claims.clm-strict.reviewed_at" in paths
    assert "claims.clm-strict.supersedes" in paths
    assert "claims.clm-strict.notes" in paths
    assert any("contested claims need" in error["message"] for error in errors)

    second_locator = "https://other.example/source"
    second_id = stable_source_id("url", second_locator, None)
    second = dict(source)
    second["origin"] = {"kind": "url", "locator": second_locator}
    sources["sources"][second_id] = second
    non_scalar = json.loads('"\\ud800"')
    accepted = {
        "text": "Accepted claim.",
        "location": {"path": "wiki/A.md", "anchor": None},
        "risk": "normal",
        "assessment": "accepted",
        "confidence": "high",
        "evidence": [
            {"source_id": source_id, "relation": "supports", "locator": None},
            {"source_id": second_id, "relation": "contradicts", "locator": None},
        ],
        "reviewed_at": "2026-07-11",
        "supersedes": None,
        "notes": non_scalar,
    }
    claims["claims"] = {"clm-strict": accepted}
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    assert any(error["path"].endswith(".notes") for error in errors)
    assert any("contradictory evidence" in error["message"] for error in errors)

    accepted["notes"] = None
    accepted["text"] = non_scalar
    accepted["location"]["anchor"] = non_scalar
    accepted["evidence"][0]["locator"] = non_scalar
    errors = validate_claim_ledger(claims, sources, as_of=date(2026, 7, 11))
    paths = {error["path"] for error in errors}
    assert "claims.clm-strict.text" in paths
    assert "claims.clm-strict.location.anchor" in paths
    assert "claims.clm-strict.evidence.0.locator" in paths


def test_datetime_audit_inputs_are_rejected_explicitly() -> None:
    sources = {
        "schema": SOURCE_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "sources": {},
    }
    claims = {
        "schema": CLAIM_SCHEMA,
        "generated_at": "2026-07-11T00:00:00Z",
        "claims": {},
    }
    audit_datetime = datetime(2026, 7, 11)
    for callback in (
        lambda: validate_source_ledger(sources, as_of=audit_datetime),
        lambda: validate_claim_ledger(claims, sources, as_of=audit_datetime),
        lambda: source_is_stale({}, as_of=audit_datetime),
    ):
        try:
            callback()
        except ValueError as exc:
            assert "date object" in str(exc)
        else:
            raise AssertionError("datetime audit input must be rejected")


def main() -> None:
    test_stable_source_ids()
    test_migration_preserves_manifest_and_is_idempotent()
    test_migration_rejects_non_nfc_file_aliases_portably()
    test_migration_never_reads_a_symlinked_legacy_manifest()
    test_migration_rejects_malformed_existing_canonical_ledgers()
    test_migration_rejects_non_object_or_lossy_legacy_manifest_records()
    test_migration_rejects_non_scalar_legacy_paths_without_crashing()
    test_migration_rejects_duplicate_json_object_keys()
    test_source_validation_and_staleness()
    test_claim_acceptance_requires_fresh_independent_support()
    test_missing_freshness_synthetic_sources_and_malformed_evidence_fail_closed()
    test_independence_cannot_override_duplicate_origin_or_content()
    test_malformed_url_origins_never_count_as_evidence()
    test_active_file_source_must_exist_and_match_its_hash()
    test_atomic_ingest_validates_planned_raw_evidence()
    test_provenance_page_and_anchor_locations_must_resolve()
    test_temporal_identity_and_contradiction_rules_fail_closed()
    test_code_and_comment_examples_are_not_claim_anchors()
    test_transaction_rejects_invalid_provenance_pair()
    test_transaction_rejects_duplicate_provenance_json_keys()
    test_non_scalar_url_text_is_a_validation_error_not_a_crash()
    test_optional_provenance_fields_are_strictly_typed()
    test_datetime_audit_inputs_are_rejected_explicitly()
    print("All ledger tests passed.")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3

from __future__ import annotations

import json
import os
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from claude_obsidian.transaction import apply_bundle
import claude_obsidian.transaction as transaction_module
from claude_obsidian.ledgers import LedgerValidationError, stable_source_id
from claude_obsidian.vault_ops import (
    VaultOperationError,
    build_vault_bundle,
    scan_vault,
)


def test_init_and_adopt_are_non_destructive() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = Path(td) / "new vault"
        vault.mkdir()
        operation = build_vault_bundle(
            vault,
            operation_id="init",
            operation_type="setup",
            generated_at="2026-07-11T00:00:00Z",
            adopt=False,
        )
        result = apply_bundle(vault, operation)
        assert ".claude-obsidian.json" in result["changed_paths"]
        assert (vault / "inbox/.gitkeep").is_file()
        assert ".vault-meta/" in (vault / ".gitignore").read_text(encoding="utf-8")
        assert scan_vault(vault)["workspace_config"]
        assert "created: 2026-07-11" in (vault / "wiki/index.md").read_text()
        assert "{{generated_date}}" not in (vault / "wiki/index.md").read_text()

        custom = vault / ".obsidian/app.json"
        custom.write_text('{"custom": true}\n')
        adopt = build_vault_bundle(
            vault,
            operation_id="adopt",
            operation_type="migration",
            generated_at="2026-07-11T00:00:00Z",
            adopt=True,
        )
        assert ".obsidian/app.json" not in [write["path"] for write in adopt["writes"]]
        assert custom.read_text() == '{"custom": true}\n'


def test_init_refuses_existing_content_without_force() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = Path(td) / "vault"
        (vault / ".obsidian").mkdir(parents=True)
        (vault / ".obsidian/app.json").write_text("{}\n")
        try:
            build_vault_bundle(
                vault,
                operation_id="init",
                operation_type="setup",
                generated_at="2026-07-11T00:00:00Z",
                adopt=False,
            )
        except VaultOperationError as exc:
            assert "use adopt" in str(exc)
        else:
            raise AssertionError("init must refuse existing config")


def test_adopt_rejects_invalid_canonical_state_without_replacing_it() -> None:
    cases = (
        (".claude-obsidian.json", {"schema": "wrong", "vault": "."}),
        (
            "wiki/meta/ledgers/source-ledger.json",
            {"schema": "wrong", "sources": {}},
        ),
    )
    for relative, value in cases:
        with tempfile.TemporaryDirectory() as td:
            vault = Path(td) / "vault"
            (vault / ".obsidian").mkdir(parents=True)
            target = vault / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(json.dumps(value), encoding="utf-8")
            before = target.read_bytes()
            try:
                build_vault_bundle(
                    vault,
                    operation_id="adopt-invalid",
                    operation_type="migration",
                    generated_at="2026-07-11T00:00:00Z",
                    adopt=True,
                )
            except LedgerValidationError:
                pass
            else:
                raise AssertionError(
                    f"invalid canonical state must block adoption: {relative}"
                )
            assert target.read_bytes() == before


def test_adopt_preserves_unresolved_legacy_batch_without_raw_inference() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = Path(td) / "vault"
        (vault / ".obsidian").mkdir(parents=True)
        raw_payload = vault / ".raw/sources/research/result.json"
        raw_payload.parent.mkdir(parents=True)
        raw_payload.write_text('{"result":1}\n', encoding="utf-8")
        batch_locator = "sources/dataforseo/2026-07-17-research-pl"
        page = vault / "wiki/sources/DataForSEO PL.md"
        page.parent.mkdir(parents=True)
        page.write_text("# DataForSEO PL\n", encoding="utf-8")
        legacy_path = vault / ".raw/.manifest.json"
        legacy_path.write_text(
            json.dumps(
                {
                    "sources": {
                        batch_locator: {
                            "hash": "163d1efedba075cb",
                            "ingested_at": "2026-07-17",
                            "pages_created": ["wiki/sources/DataForSEO PL.md"],
                            "note": "Batch of 165 JSON files",
                        }
                    }
                },
                indent=2,
                sort_keys=True,
            ),
            encoding="utf-8",
        )
        legacy_before = legacy_path.read_bytes()

        raw_identities = {
            (raw_payload.parent.stat().st_dev, raw_payload.parent.stat().st_ino),
            (
                raw_payload.parent.parent.stat().st_dev,
                raw_payload.parent.parent.stat().st_ino,
            ),
        }
        real_listdir = os.listdir
        real_scandir = os.scandir

        def is_raw_payload_directory(value: object) -> bool:
            try:
                metadata = (
                    os.fstat(value)
                    if isinstance(value, int)
                    else os.stat(value)  # type: ignore[arg-type]
                )
            except (OSError, TypeError, ValueError):
                return False
            return (metadata.st_dev, metadata.st_ino) in raw_identities

        def guarded_listdir(path: object = ".") -> list[str]:
            if is_raw_payload_directory(path):
                raise AssertionError("adoption must not enumerate raw payloads")
            return real_listdir(path)  # type: ignore[arg-type]

        def guarded_scandir(path: object = ".") -> os.ScandirIterator[str]:
            if is_raw_payload_directory(path):
                raise AssertionError("adoption must not enumerate raw payloads")
            return real_scandir(path)  # type: ignore[arg-type]

        transaction_module.os.listdir = guarded_listdir
        transaction_module.os.scandir = guarded_scandir
        try:
            operation = build_vault_bundle(
                vault,
                operation_id="adopt-batch",
                operation_type="migration",
                generated_at="2026-07-17T00:00:00Z",
                adopt=True,
            )
            apply_bundle(vault, operation)
        finally:
            transaction_module.os.listdir = real_listdir
            transaction_module.os.scandir = real_scandir
        assert operation["read_preconditions"] == {batch_locator: None}
        ledger_write = next(
            write
            for write in operation["writes"]
            if write["path"] == "wiki/meta/ledgers/source-ledger.json"
        )
        sources = json.loads(ledger_write["content"])["sources"]
        source_id = stable_source_id("manual", batch_locator, None)
        assert set(sources) == {source_id}
        assert sources[source_id]["origin"] == {
            "kind": "manual",
            "locator": batch_locator,
        }
        assert sources[source_id]["content_kind"] == "other"
        assert sources[source_id]["authority"] == "unknown"
        assert sources[source_id]["content_sha256"] is None
        assert sources[source_id]["ingested_at"] == "2026-07-17"
        assert sources[source_id]["review_status"] == "unreviewed"
        assert sources[source_id]["pages"] == ["wiki/sources/DataForSEO PL.md"]
        assert ".raw/sources/research/result.json" not in ledger_write["content"]

        assert legacy_path.read_bytes() == legacy_before
        assert raw_payload.read_text(encoding="utf-8") == '{"result":1}\n'
        rerun = build_vault_bundle(
            vault,
            operation_id="adopt-batch-again",
            operation_type="migration",
            generated_at="2026-07-18T00:00:00Z",
            adopt=True,
        )
        assert rerun["writes"] == []


def main() -> None:
    test_init_and_adopt_are_non_destructive()
    test_init_refuses_existing_content_without_force()
    test_adopt_rejects_invalid_canonical_state_without_replacing_it()
    test_adopt_preserves_unresolved_legacy_batch_without_raw_inference()
    print("All vault operation tests passed.")


if __name__ == "__main__":
    main()

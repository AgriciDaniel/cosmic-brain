#!/usr/bin/env python3

from __future__ import annotations

import sys
import tempfile
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from claude_obsidian.transaction import apply_bundle
from claude_obsidian.ledgers import LedgerValidationError
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


def main() -> None:
    test_init_and_adopt_are_non_destructive()
    test_init_refuses_existing_content_without_force()
    test_adopt_rejects_invalid_canonical_state_without_replacing_it()
    print("All vault operation tests passed.")


if __name__ == "__main__":
    main()

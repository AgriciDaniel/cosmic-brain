"""Non-destructive vault initialization and adoption planning."""

from __future__ import annotations

import hashlib
import json
from datetime import datetime
from pathlib import Path
from typing import Any

from .ledgers import (
    CLAIM_PATH,
    SOURCE_PATH,
    empty_claim_ledger,
    empty_source_ledger,
    migrate_legacy_manifest,
    validate_existing_canonical_state,
)
from .paths import canonical
from .transaction import BUNDLE_SCHEMA, _safe_hash


TEMPLATE_ROOT = Path(__file__).resolve().parents[1] / "templates" / "vault"


class VaultOperationError(RuntimeError):
    pass


def scan_vault(root: Path | str) -> dict[str, Any]:
    path = canonical(root)
    notes = (
        sorted(
            candidate.relative_to(path).as_posix()
            for candidate in path.rglob("*.md")
            if candidate.is_file() and ".git" not in candidate.parts
        )
        if path.is_dir()
        else []
    )
    return {
        "schema": "claude-obsidian.adoption-scan.v1",
        "exists": path.exists(),
        "is_directory": path.is_dir(),
        "obsidian_config": (path / ".obsidian").is_dir(),
        "wiki_present": (path / "wiki").is_dir(),
        "legacy_raw_present": (path / ".raw").is_dir(),
        "workspace_config": (path / ".claude-obsidian.json").is_file(),
        "markdown_notes": len(notes),
        "sample_notes": notes[:20],
    }


def _template_files(template_root: Path) -> list[Path]:
    if not template_root.is_dir():
        raise VaultOperationError(f"template vault is missing: {template_root}")
    return sorted(path for path in template_root.rglob("*") if path.is_file())


def _workspace_config() -> dict[str, Any]:
    return {
        "schema": "claude-obsidian.workspace.v1",
        "vault": ".",
        "role": "vault",
        "source_inbox": "inbox",
        "legacy_raw": ".raw",
    }


def _render_template(content: bytes, generated_at: str) -> bytes:
    normalized = (
        generated_at[:-1] + "+00:00" if generated_at.endswith("Z") else generated_at
    )
    try:
        generated_date = datetime.fromisoformat(normalized).date().isoformat()
    except ValueError as exc:
        raise VaultOperationError("generated_at must be an ISO-8601 timestamp") from exc
    return content.replace(b"{{generated_date}}", generated_date.encode("ascii"))


def build_vault_bundle(
    root: Path | str,
    *,
    operation_id: str,
    operation_type: str,
    generated_at: str,
    adopt: bool,
    force: bool = False,
    template_root: Path | None = None,
) -> dict[str, Any]:
    vault = canonical(root)
    template = TEMPLATE_ROOT if template_root is None else canonical(template_root)
    writes: list[dict[str, Any]] = []
    expected: dict[str, str | None] = {}
    planned: dict[str, bytes] = {
        file.relative_to(template).as_posix(): _render_template(
            file.read_bytes(), generated_at
        )
        for file in _template_files(template)
    }
    planned[".claude-obsidian.json"] = (
        json.dumps(_workspace_config(), indent=2, sort_keys=True) + "\n"
    ).encode("utf-8")
    if adopt:
        source_ledger, claim_ledger = migrate_legacy_manifest(
            vault, generated_at=generated_at
        )
        validate_existing_canonical_state(vault, fallback_source_ledger=source_ledger)
    else:
        source_ledger = empty_source_ledger(generated_at=generated_at)
        claim_ledger = empty_claim_ledger(generated_at=generated_at)
    planned[SOURCE_PATH] = (
        json.dumps(
            source_ledger,
            indent=2,
            sort_keys=True,
        )
        + "\n"
    ).encode("utf-8")
    planned[CLAIM_PATH] = (
        json.dumps(
            claim_ledger,
            indent=2,
            sort_keys=True,
        )
        + "\n"
    ).encode("utf-8")

    for relative, content in sorted(planned.items()):
        current_hash = _safe_hash(vault, relative)
        new_hash = hashlib.sha256(content).hexdigest()
        if current_hash == new_hash:
            continue
        if current_hash is not None:
            if adopt and not force:
                continue
            if not force:
                raise VaultOperationError(
                    f"destination already contains {relative}; use adopt or --force"
                )
            mode = "replace"
        else:
            mode = "create"
        expected[relative] = current_hash
        writes.append(
            {
                "path": relative,
                "mode": mode,
                "content": content.decode("utf-8"),
                "sha256": new_hash,
            }
        )
    return {
        "schema": BUNDLE_SCHEMA,
        "operation_id": operation_id,
        "operation_type": operation_type,
        "expected_hashes": expected,
        "writes": writes,
    }

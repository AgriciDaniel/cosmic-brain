"""Dry-run-first plans for optional legacy-compatible vault extensions."""

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Any

from .transaction import sha256_bytes


def _date_from_timestamp(value: str) -> str:
    normalized = value[:-1] + "+00:00" if value.endswith("Z") else value
    try:
        return datetime.fromisoformat(normalized).date().isoformat()
    except ValueError as exc:
        raise ValueError("generated_at must be an ISO-8601 timestamp") from exc


def dragonscale_bundle(
    vault_root: Path,
    *,
    operation_id: str,
    generated_at: str,
) -> dict[str, Any]:
    """Return one create-only transaction for missing DragonScale state."""

    root = Path(vault_root).resolve(strict=True)
    rollout = _date_from_timestamp(generated_at)
    manifest = {
        "version": 1,
        "description": "Ingest delta tracker. Source payloads are create-only.",
        "sources": {},
        "address_map": {},
    }
    thresholds = {
        "version": 1,
        "model": "nomic-embed-text",
        "bands": {"error": 0.90, "review": 0.80},
        "calibrated": False,
        "calibration_pairs_labeled": 0,
        "notes": "Conservative seed thresholds; calibrate against this vault before treating semantic scores as policy.",
    }
    candidates = {
        ".vault-meta/address-counter.txt": "1\n",
        ".vault-meta/tiling-thresholds.json": json.dumps(
            thresholds, indent=2, sort_keys=True, ensure_ascii=False
        )
        + "\n",
        ".vault-meta/legacy-pages.txt": (
            "# DragonScale legacy-page exceptions\n"
            f"# rollout: {rollout}\n"
            "# Add one vault-relative wiki page per line only after review.\n"
        ),
        ".raw/.manifest.json": json.dumps(
            manifest, indent=2, sort_keys=True, ensure_ascii=False
        )
        + "\n",
    }
    expected_hashes: dict[str, None] = {}
    writes: list[dict[str, Any]] = []
    for relative, content in candidates.items():
        if (root / relative).exists():
            continue
        expected_hashes[relative] = None
        writes.append(
            {
                "path": relative,
                "mode": "create",
                "content": content,
                "sha256": sha256_bytes(content.encode("utf-8")),
            }
        )
    return {
        "schema": "claude-obsidian.transaction.v1",
        "operation_id": operation_id,
        "operation_type": "setup",
        "expected_hashes": expected_hashes,
        "writes": writes,
        "address_requests": [],
        "source_manifest_updates": {},
    }

"""Read-only execution of declared release gates."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path
from typing import Any, Iterable

from .contracts import validate_contracts
from .json_utils import strict_json_loads


def evaluate_release_gates(
    repo_root: Path,
    *,
    execute: bool = False,
    selected: Iterable[str] | None = None,
    timeout: int = 300,
) -> dict[str, Any]:
    """Plan or execute command gates; manual gates always remain explicit."""

    root = Path(repo_root).resolve(strict=True)
    errors = validate_contracts(root)
    if errors:
        return {
            "schema": "claude-obsidian.release-gates.v1",
            "ok": False,
            "ready": False,
            "errors": errors,
            "gates": [],
        }
    try:
        document = strict_json_loads(
            (root / "config/product-contract.json").read_text(encoding="utf-8")
        )
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        return {
            "schema": "claude-obsidian.release-gates.v1",
            "ok": False,
            "ready": False,
            "errors": [{"code": "invalid_product_contract", "message": str(exc)}],
            "gates": [],
        }
    requested = set(selected or ())
    known = {gate["id"] for gate in document["release_gates"]}
    unknown = sorted(requested - known)
    if unknown:
        return {
            "schema": "claude-obsidian.release-gates.v1",
            "ok": False,
            "ready": False,
            "errors": [{"code": "unknown_gate", "gate": value} for value in unknown],
            "gates": [],
        }

    results: list[dict[str, Any]] = []
    for gate in document["release_gates"]:
        verification = gate["verification"]
        if verification["type"] == "manual":
            results.append(
                {
                    "id": gate["id"],
                    "required": gate["required"],
                    "type": "manual",
                    "status": "manual-review",
                    "evidence_required": verification["evidence"],
                }
            )
            continue
        declared = verification["command"]
        if requested and gate["id"] not in requested:
            results.append(
                {
                    "id": gate["id"],
                    "required": gate["required"],
                    "type": "command",
                    "status": "not-selected",
                    "command": declared,
                }
            )
            continue
        command = [
            sys.executable if token == "{python}" else token for token in declared
        ]
        if not execute:
            results.append(
                {
                    "id": gate["id"],
                    "required": gate["required"],
                    "type": "command",
                    "status": "planned",
                    "command": declared,
                }
            )
            continue
        try:
            completed = subprocess.run(
                command,
                cwd=root,
                stdin=subprocess.DEVNULL,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                check=False,
                timeout=timeout,
            )
            status = "passed" if completed.returncode == 0 else "failed"
            detail = {
                "exit_code": completed.returncode,
                "stdout_tail": completed.stdout[-2000:],
                "stderr_tail": completed.stderr[-2000:],
            }
        except subprocess.TimeoutExpired:
            status = "failed"
            detail = {"exit_code": None, "error": f"timed out after {timeout} seconds"}
        except OSError as exc:
            status = "failed"
            detail = {"exit_code": None, "error": str(exc)}
        results.append(
            {
                "id": gate["id"],
                "required": gate["required"],
                "type": "command",
                "status": status,
                "command": declared,
                **detail,
            }
        )

    failures = [item["id"] for item in results if item["status"] == "failed"]
    pending = [
        item["id"]
        for item in results
        if item["required"]
        and item["status"] in {"manual-review", "planned", "not-selected"}
    ]
    return {
        "schema": "claude-obsidian.release-gates.v1",
        "ok": not failures,
        "ready": execute and not failures and not pending,
        "executed": execute,
        "scope": "selected" if requested else "all",
        "selected": sorted(requested),
        "summary": {
            "passed": sum(item["status"] == "passed" for item in results),
            "failed": len(failures),
            "pending": len(pending),
        },
        "failures": failures,
        "pending": pending,
        "errors": [],
        "gates": results,
    }

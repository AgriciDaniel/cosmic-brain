#!/usr/bin/env python3
"""Adversarial tests for review/apply binding and product-tree isolation."""

from __future__ import annotations

import argparse
import json
import os
import socket
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
CLI = ROOT / "scripts" / "claude-obsidian.py"

from unittest import mock

import claude_obsidian.cli as cli_module
from claude_obsidian.transaction import TransactionValidationError, inspect_bundle


class CliApprovalTests(unittest.TestCase):
    def invoke(self, *arguments: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(CLI), *arguments],
            cwd=ROOT,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=False,
        )

    def test_adopt_refuses_post_review_changes(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory) / "vault"
            (vault / ".obsidian").mkdir(parents=True)
            (vault / "wiki").mkdir()
            target = vault / "wiki" / "index.md"
            target.write_text("reviewed baseline\n", encoding="utf-8")
            common = (
                "adopt",
                str(vault),
                "--force",
                "--generated-at",
                "2026-07-11T12:00:00Z",
                "--operation-id",
                "adopt-binding",
            )
            preview = self.invoke(*common)
            self.assertEqual(0, preview.returncode, preview.stderr)
            approval = json.loads(preview.stdout)["approved_plan_sha256"]

            target.write_text("user edit after review\n", encoding="utf-8")
            applied = self.invoke(
                *common,
                "--approved-plan-sha256",
                approval,
                "--apply",
            )
            self.assertEqual(2, applied.returncode)
            self.assertIn("PLAN_CHANGED", applied.stderr)
            self.assertEqual(
                "user edit after review\n", target.read_text(encoding="utf-8")
            )
            self.assertFalse((vault / ".vault-meta").exists())

    def test_init_and_adopt_reject_product_descendants(self) -> None:
        for command, path in (
            ("init", ROOT / "templates" / "new-vault"),
            ("adopt", ROOT / "examples" / "sample-vault"),
        ):
            result = self.invoke(command, str(path))
            self.assertEqual(2, result.returncode)
            self.assertIn("PLUGIN_TREE_IS_NOT_VAULT", result.stderr)

    def test_init_approval_cannot_be_reused_for_another_destination(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            reviewed = base / "reviewed-vault"
            other = base / "other-vault"
            pinned = (
                "--generated-at",
                "2026-07-11T12:00:00Z",
                "--operation-id",
                "init-root-binding",
            )
            preview = self.invoke("init", str(reviewed), *pinned)
            self.assertEqual(0, preview.returncode, preview.stderr)
            approval = json.loads(preview.stdout)["approved_plan_sha256"]

            applied = self.invoke(
                "init",
                str(other),
                *pinned,
                "--approved-plan-sha256",
                approval,
                "--apply",
            )
            self.assertEqual(2, applied.returncode)
            self.assertIn("PLAN_CHANGED", applied.stderr)
            self.assertFalse(other.exists())

    def test_init_rejects_a_root_that_appears_after_absent_review(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory) / "vault"
            pinned = (
                "--generated-at",
                "2026-07-11T12:00:00Z",
                "--operation-id",
                "init-appeared-root",
            )
            preview = self.invoke("init", str(vault), *pinned)
            self.assertEqual(0, preview.returncode, preview.stderr)
            approval = json.loads(preview.stdout)["approved_plan_sha256"]
            vault.mkdir()
            sentinel = vault / "sentinel.txt"
            sentinel.write_text("outside\n", encoding="utf-8")
            applied = self.invoke(
                "init",
                str(vault),
                *pinned,
                "--approved-plan-sha256",
                approval,
                "--apply",
            )
            self.assertEqual(2, applied.returncode)
            self.assertIn("PLAN_CHANGED", applied.stderr)
            self.assertEqual("outside\n", sentinel.read_text(encoding="utf-8"))
            self.assertFalse((vault / ".vault-meta").exists())

    def test_failed_init_never_path_deletes_a_replacement_root(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory) / "vault"
            generated_at = "2026-07-11T12:00:00Z"
            operation_id = "init-no-path-cleanup"
            operation = cli_module.build_vault_bundle(
                destination,
                operation_id=operation_id,
                operation_type="setup",
                generated_at=generated_at,
                adopt=False,
                force=False,
            )
            reviewed = inspect_bundle(destination, operation)
            parked = destination.with_name("created-root")

            def replace_then_fail(
                *_args: object, **_kwargs: object
            ) -> dict[str, object]:
                destination.rename(parked)
                destination.mkdir()
                raise TransactionValidationError("PLAN_CHANGED", "injected root swap")

            args = argparse.Namespace(
                path=str(destination),
                generated_at=generated_at,
                operation_id=operation_id,
                force=False,
                apply=True,
                approved_plan_sha256=reviewed["approval_sha256"],
            )
            with (
                mock.patch.object(
                    cli_module, "_require_approved_plan", return_value=reviewed
                ),
                mock.patch.object(cli_module, "apply_bundle", replace_then_fail),
                self.assertRaises(TransactionValidationError),
            ):
                cli_module.command_init(args)
            self.assertTrue(parked.is_dir())
            self.assertTrue(destination.is_dir())

    def test_repeated_init_is_a_stable_noop_even_with_apply(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory) / "vault"
            pinned = (
                "--generated-at",
                "2026-07-11T12:00:00Z",
                "--operation-id",
                "first-init",
            )
            preview = self.invoke("init", str(vault), *pinned)
            self.assertEqual(0, preview.returncode, preview.stderr)
            approval = json.loads(preview.stdout)["approved_plan_sha256"]
            applied = self.invoke(
                "init",
                str(vault),
                *pinned,
                "--approved-plan-sha256",
                approval,
                "--apply",
            )
            self.assertEqual(0, applied.returncode, applied.stderr)

            for extra in ((), ("--apply",)):
                repeated = self.invoke(
                    "init",
                    str(vault),
                    "--generated-at",
                    "2026-07-11T12:00:00Z",
                    "--operation-id",
                    "repeated-init",
                    *extra,
                )
                self.assertEqual(0, repeated.returncode, repeated.stderr)
                payload = json.loads(repeated.stdout)
                self.assertEqual("noop", payload["status"])
                self.assertEqual([], payload["changed_paths"])
                self.assertNotIn("approved_plan_sha256", payload)

    def test_contracts_preserves_explicit_vault_selection_errors(self) -> None:
        product_descendant = self.invoke(
            "contracts",
            "--verify",
            "--capability",
            "wiki",
            "--vault",
            str(ROOT / "templates" / "vault"),
        )
        self.assertEqual(2, product_descendant.returncode)
        self.assertIn("PLUGIN_TREE_IS_NOT_VAULT", product_descendant.stderr)

        with tempfile.TemporaryDirectory() as directory:
            missing = self.invoke(
                "contracts",
                "--verify",
                "--capability",
                "wiki",
                "--vault",
                str(Path(directory) / "missing"),
            )
        self.assertEqual(2, missing.returncode)
        self.assertIn("VAULT_MISSING", missing.stderr)

    def test_transaction_recovery_has_explicit_stale_lock_override(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory) / "vault"
            (vault / ".obsidian").mkdir(parents=True)
            (vault / "wiki").mkdir()
            (vault / ".raw").mkdir()
            lock = vault / ".vault-meta/mutation.lock"
            lock.mkdir(parents=True)
            (lock / "owner.json").write_text(
                json.dumps(
                    {
                        "schema": "claude-obsidian.mutation-lock.v1",
                        "pid": os.getpid(),
                        "token": "reused-pid",
                        "host": socket.gethostname(),
                        "started_epoch": 0,
                    }
                ),
                encoding="utf-8",
            )
            blocked = self.invoke(
                "transaction",
                "recover",
                "--vault",
                str(vault),
                "--timeout",
                "0",
                "--stale-after",
                "0",
            )
            self.assertEqual(75, blocked.returncode)
            self.assertTrue(lock.is_dir())

            recovered = self.invoke(
                "transaction",
                "recover",
                "--vault",
                str(vault),
                "--timeout",
                "0",
                "--stale-after",
                "0",
                "--force-stale-lock",
            )
            self.assertEqual(0, recovered.returncode, recovered.stderr)
            self.assertTrue(json.loads(recovered.stdout)["forced_stale_lock"])
            self.assertFalse(lock.exists())

    def test_transaction_apply_is_bound_to_inspected_bundle(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            (vault / ".obsidian").mkdir(parents=True)
            (vault / "wiki").mkdir()
            (vault / ".raw").mkdir()
            bundle_path = base / "operation.json"
            operation = {
                "schema": "claude-obsidian.transaction.v1",
                "operation_id": "cli-reviewed-bundle",
                "operation_type": "generic",
                "expected_hashes": {"wiki/A.md": None},
                "writes": [
                    {"path": "wiki/A.md", "mode": "create", "content": "reviewed\n"}
                ],
            }
            bundle_path.write_text(json.dumps(operation), encoding="utf-8")
            inspected = self.invoke(
                "transaction", "inspect", str(bundle_path), "--vault", str(vault)
            )
            self.assertEqual(0, inspected.returncode, inspected.stderr)
            approval = json.loads(inspected.stdout)["approval_sha256"]

            operation["writes"][0]["content"] = "changed after review\n"
            bundle_path.write_text(json.dumps(operation), encoding="utf-8")
            changed = self.invoke(
                "transaction",
                "apply",
                str(bundle_path),
                "--vault",
                str(vault),
                "--approved-plan-sha256",
                approval,
            )
            self.assertEqual(2, changed.returncode)
            self.assertIn("PLAN_CHANGED", changed.stderr)
            self.assertFalse((vault / "wiki/A.md").exists())

    def test_migrate_reports_malformed_legacy_manifest_without_traceback(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = Path(directory) / "vault"
            (vault / ".obsidian").mkdir(parents=True)
            (vault / "wiki").mkdir()
            (vault / ".raw").mkdir()
            (vault / ".raw/.manifest.json").write_text("[", encoding="utf-8")
            result = self.invoke("migrate", "--vault", str(vault))
            self.assertEqual(2, result.returncode)
            self.assertIn("ERR INVALID_PROVENANCE_LEDGER", result.stderr)
            self.assertNotIn("Traceback", result.stderr)


if __name__ == "__main__":
    unittest.main()

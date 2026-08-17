#!/usr/bin/env python3
"""Hermetic fake-binary tests for transport detection."""

from __future__ import annotations

import hashlib
import json
import os
import shutil
import stat
import subprocess
import tempfile
import time
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "scripts" / "detect-transport.sh"
REQUIRED_TOOLS = ("python3", "sed", "cat", "chmod", "mv", "mkdir", "mktemp", "rm")


def _tool_path(directory: Path) -> str:
    for name in REQUIRED_TOOLS:
        source = shutil.which(name)
        if source is None:
            raise unittest.SkipTest(f"required test tool is unavailable: {name}")
        (directory / name).symlink_to(source)
    return str(directory)


def _fake_obsidian(directory: Path, *, legacy: bool = False) -> Path:
    name = "obsidian-cli" if legacy else "obsidian"
    binary = directory / name
    binary.write_text(
        """#!/bin/bash
if [ -n "${FAKE_OBSIDIAN_LOG:-}" ]; then
  printf '%s|%s\\n' "$PWD" "$*" >> "$FAKE_OBSIDIAN_LOG"
fi
printf '%s\\n' "${FAKE_OBSIDIAN_OUTPUT:-Obsidian 1.12.7}"
exit "${FAKE_OBSIDIAN_RC:-0}"
""",
        encoding="utf-8",
    )
    binary.chmod(binary.stat().st_mode | stat.S_IXUSR)
    return binary


def _run(
    vault: Path,
    *arguments: str,
    path: str,
    output: str = "Obsidian 1.12.7",
    returncode: int = 0,
    log: Path | None = None,
    extra_env: dict[str, str] | None = None,
):
    env = os.environ.copy()
    env.update(
        {
            "PATH": path,
            "FAKE_OBSIDIAN_OUTPUT": output,
            "FAKE_OBSIDIAN_RC": str(returncode),
            "FAKE_OBSIDIAN_LOG": str(log) if log else "",
        }
    )
    if extra_env:
        env.update(extra_env)
    return subprocess.run(
        ["/bin/bash", str(SCRIPT), *arguments],
        cwd=vault,
        env=env,
        capture_output=True,
        text=True,
        timeout=15,
        check=False,
    )


def _file_snapshot(root: Path) -> dict[str, str]:
    result: dict[str, str] = {}
    for path in sorted(root.rglob("*")):
        if path.is_file() and not path.is_symlink():
            result[path.relative_to(root).as_posix()] = hashlib.sha256(
                path.read_bytes()
            ).hexdigest()
    return result


class DetectTransportTests(unittest.TestCase):
    def test_official_probe_handles_spaces_unicode_and_uses_version_subcommand(
        self,
    ) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "Vault with spaces Ω"
            vault.mkdir()
            fake_bin = base / "fake bin ü"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)
            binary = _fake_obsidian(fake_bin)
            log = base / "probe.log"

            result = _run(
                vault,
                "--peek",
                "--vault",
                str(vault),
                path=path,
                output="Obsidian 1.12.7 β",
                log=log,
            )
            self.assertEqual(0, result.returncode, result.stderr)
            report = json.loads(result.stdout)
            cli = report["available"]["cli"]
            self.assertEqual("ready", cli["status"])
            self.assertTrue(cli["present"])
            self.assertTrue(cli["usable"])
            self.assertEqual(str(binary), cli["binary"])
            self.assertEqual("obsidian version", cli["probe"])
            self.assertEqual("Obsidian 1.12.7 β", cli["version_string"])
            self.assertEqual("cli", report["preferred"])
            self.assertEqual(
                f"{vault.resolve()}|version\n", log.read_text(encoding="utf-8")
            )

    def test_peek_is_read_only_even_when_meta_directory_is_absent(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            vault.mkdir()
            (vault / "note.md").write_text("# Existing\n", encoding="utf-8")
            fake_bin = base / "bin"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)
            _fake_obsidian(fake_bin)
            before = _file_snapshot(vault)

            result = _run(vault, "--peek", path=path)
            self.assertEqual(0, result.returncode, result.stderr)
            self.assertEqual(
                str(vault.resolve()), json.loads(result.stdout)["vault_root"]
            )
            self.assertEqual(before, _file_snapshot(vault))
            self.assertFalse((vault / ".vault-meta").exists())

    def test_missing_binary_falls_back_to_filesystem(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            vault.mkdir()
            fake_bin = base / "tools"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)

            result = _run(vault, "--peek", str(vault), path=path)
            self.assertEqual(0, result.returncode, result.stderr)
            report = json.loads(result.stdout)
            cli = report["available"]["cli"]
            self.assertEqual("missing", cli["status"])
            self.assertFalse(cli["present"])
            self.assertFalse(cli["usable"])
            self.assertEqual("filesystem", report["preferred"])
            self.assertEqual(["filesystem"], report["fallback_chain"])

    def test_probe_failures_are_distinguished_even_with_exit_zero(self) -> None:
        cases = (
            (
                "app_not_running",
                "Error: Obsidian app is not running",
                0,
                "app_not_running",
                False,
            ),
            (
                "unsupported",
                "Error: unknown command 'version'",
                0,
                "unsupported",
                None,
            ),
            (
                "zero_capability_error",
                'Error: corrupt IPC response "bad" \\ Ω',
                0,
                "capability_error",
                None,
            ),
            (
                "nonzero_capability_error",
                "unexpected transport failure",
                23,
                "capability_error",
                None,
            ),
        )
        for label, output, returncode, expected, running in cases:
            with self.subTest(label=label), tempfile.TemporaryDirectory() as directory:
                base = Path(directory)
                vault = base / "vault"
                vault.mkdir()
                fake_bin = base / "bin"
                fake_bin.mkdir()
                path = _tool_path(fake_bin)
                _fake_obsidian(fake_bin)
                result = _run(
                    vault,
                    "--peek",
                    "--vault",
                    str(vault),
                    path=path,
                    output=output,
                    returncode=returncode,
                )
                self.assertEqual(0, result.returncode, result.stderr)
                report = json.loads(result.stdout)
                cli = report["available"]["cli"]
                self.assertEqual(expected, cli["status"])
                self.assertFalse(cli["usable"])
                self.assertEqual(running, cli["obsidian_app_running"])
                self.assertEqual("filesystem", report["preferred"])
                self.assertIn(output, cli["diagnostic"])

    def test_hanging_official_binary_is_killed_by_bounded_probe(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            vault.mkdir()
            fake_bin = base / "bin"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)
            binary = _fake_obsidian(fake_bin)
            binary.write_text("#!/bin/bash\n/bin/sleep 30\n", encoding="utf-8")
            binary.chmod(0o755)
            started = time.monotonic()
            result = _run(vault, "--peek", path=path)
            elapsed = time.monotonic() - started
            self.assertEqual(0, result.returncode, result.stderr)
            self.assertLess(elapsed, 8)
            cli = json.loads(result.stdout)["available"]["cli"]
            self.assertFalse(cli["usable"])
            self.assertIn("timed out after 5 seconds", cli["diagnostic"])

    def test_legacy_binary_is_reported_unsupported_and_never_invoked(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            vault.mkdir()
            fake_bin = base / "bin"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)
            binary = _fake_obsidian(fake_bin, legacy=True)
            log = base / "legacy.log"
            result = _run(
                vault,
                "--peek",
                "--vault",
                str(vault),
                path=path,
                log=log,
            )
            self.assertEqual(0, result.returncode, result.stderr)
            cli = json.loads(result.stdout)["available"]["cli"]
            self.assertEqual("unsupported", cli["status"])
            self.assertEqual(str(binary), cli["binary"])
            self.assertFalse(cli["usable"])
            self.assertFalse(log.exists())

    def test_write_is_atomic_freshness_is_honored_and_force_refreshes(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            vault.mkdir()
            fake_bin = base / "bin"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)
            _fake_obsidian(fake_bin)
            log = base / "probe.log"

            first = _run(
                vault,
                "--vault",
                str(vault),
                path=path,
                output="Obsidian 1.12.7",
                log=log,
            )
            self.assertEqual(0, first.returncode, first.stderr)
            snapshot = vault / ".vault-meta" / "transport.json"
            self.assertTrue(snapshot.is_file())
            self.assertEqual(
                json.loads(first.stdout),
                json.loads(snapshot.read_text(encoding="utf-8")),
            )
            self.assertEqual(
                [], list((vault / ".vault-meta").glob(".transport.json.tmp.*"))
            )

            fresh = _run(
                vault,
                "--vault",
                str(vault),
                path=path,
                output="Obsidian 9.9.9",
                log=log,
            )
            self.assertEqual(0, fresh.returncode, fresh.stderr)
            self.assertEqual(json.loads(first.stdout), json.loads(fresh.stdout))
            self.assertEqual(1, len(log.read_text(encoding="utf-8").splitlines()))

            forced = _run(
                vault,
                "--force",
                "--vault",
                str(vault),
                path=path,
                output="Obsidian 9.9.9",
                log=log,
            )
            self.assertEqual(0, forced.returncode, forced.stderr)
            self.assertEqual(
                "Obsidian 9.9.9",
                json.loads(forced.stdout)["available"]["cli"]["version_string"],
            )
            self.assertEqual(2, len(log.read_text(encoding="utf-8").splitlines()))
            self.assertEqual(
                [], list((vault / ".vault-meta").glob(".transport.json.tmp.*"))
            )

            # A fresh but malformed cache is never trusted just because its
            # timestamp is recent.
            snapshot.write_text("{malformed", encoding="utf-8")
            repaired = _run(
                vault,
                "--vault",
                str(vault),
                path=path,
                output="Obsidian 2.0.0",
                log=log,
            )
            self.assertEqual(0, repaired.returncode, repaired.stderr)
            self.assertEqual(
                "Obsidian 2.0.0",
                json.loads(repaired.stdout)["available"]["cli"]["version_string"],
            )
            self.assertEqual(3, len(log.read_text(encoding="utf-8").splitlines()))

    def test_manual_override_survives_force_refresh(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            meta = vault / ".vault-meta"
            meta.mkdir(parents=True)
            (meta / "transport.json").write_text(
                json.dumps(
                    {
                        "manual_override": True,
                        "preferred": "mcpvault",
                        "fallback_chain": ["mcpvault", "filesystem"],
                    }
                ),
                encoding="utf-8",
            )
            fake_bin = base / "bin"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)
            _fake_obsidian(fake_bin)

            result = _run(vault, "--force", "--vault", str(vault), path=path)
            self.assertEqual(0, result.returncode, result.stderr)
            report = json.loads(result.stdout)
            self.assertTrue(report["manual_override"])
            self.assertEqual("mcpvault", report["preferred"])
            self.assertEqual(["mcpvault", "filesystem"], report["fallback_chain"])

    def test_invalid_or_oversized_override_snapshot_is_not_preserved(self) -> None:
        for content in (
            '{"manual_override":true,"preferred":"mcpvault",'
            '"preferred":"filesystem","fallback_chain":["mcpvault"]}',
            "x" * (8 * 1024 * 1024 + 1),
        ):
            with (
                self.subTest(size=len(content)),
                tempfile.TemporaryDirectory() as directory,
            ):
                base = Path(directory)
                vault = base / "vault"
                meta = vault / ".vault-meta"
                meta.mkdir(parents=True)
                (meta / "transport.json").write_text(content, encoding="utf-8")
                fake_bin = base / "bin"
                fake_bin.mkdir()
                path = _tool_path(fake_bin)
                _fake_obsidian(fake_bin)
                result = _run(vault, "--force", "--vault", str(vault), path=path)
                self.assertEqual(0, result.returncode, result.stderr)
                report = json.loads(result.stdout)
                self.assertFalse(report["manual_override"])
                self.assertEqual("cli", report["preferred"])

    def test_bad_arguments_and_unsafe_meta_paths_fail_closed(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            vault.mkdir()
            fake_bin = base / "bin"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)

            result = _run(vault, "--unknown", path=path)
            self.assertEqual(3, result.returncode)
            self.assertIn("unknown option", result.stderr)

            (vault / ".vault-meta").write_text("unsafe", encoding="utf-8")
            result = _run(vault, "--vault", str(vault), path=path)
            self.assertEqual(2, result.returncode)
            self.assertIn("not a safe directory", result.stderr)
            self.assertEqual(
                "unsafe", (vault / ".vault-meta").read_text(encoding="utf-8")
            )

            product = _run(
                vault,
                "--peek",
                "--vault",
                str(ROOT / "templates" / "vault"),
                path=path,
            )
            self.assertEqual(2, product.returncode)
            self.assertIn("PLUGIN_TREE_IS_NOT_VAULT", product.stderr)

    def test_write_does_not_follow_metadata_replacement_during_probe(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            meta = vault / ".vault-meta"
            meta.mkdir(parents=True)
            held = vault / ".vault-meta-held"
            outside = base / "outside-meta"
            outside.mkdir()
            sentinel = outside / "sentinel.bin"
            sentinel.write_bytes(b"outside-must-survive\x00")
            fake_bin = base / "bin"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)
            binary = _fake_obsidian(fake_bin)
            binary.write_text(
                """#!/bin/bash
/bin/mv "$ATTACK_META" "$ATTACK_HELD"
/bin/ln -s "$ATTACK_OUTSIDE" "$ATTACK_META"
printf 'Obsidian 1.12.7\\n'
""",
                encoding="utf-8",
            )
            binary.chmod(0o755)

            result = _run(
                vault,
                "--force",
                "--vault",
                str(vault),
                path=path,
                extra_env={
                    "ATTACK_META": str(meta),
                    "ATTACK_HELD": str(held),
                    "ATTACK_OUTSIDE": str(outside),
                },
            )
            self.assertEqual(2, result.returncode)
            self.assertIn("cannot publish a confined transport snapshot", result.stderr)
            self.assertNotIn("Traceback", result.stderr)
            self.assertEqual(b"outside-must-survive\x00", sentinel.read_bytes())
            self.assertFalse((outside / "transport.json").exists())

    def test_write_rejects_vault_root_replacement_during_probe(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            vault.mkdir()
            held = base / "held-vault"
            fake_bin = base / "bin"
            fake_bin.mkdir()
            path = _tool_path(fake_bin)
            binary = _fake_obsidian(fake_bin)
            binary.write_text(
                """#!/bin/bash
/bin/mv "$ATTACK_VAULT" "$ATTACK_HELD"
/bin/mkdir "$ATTACK_VAULT"
printf 'Obsidian 1.12.7\\n'
""",
                encoding="utf-8",
            )
            binary.chmod(0o755)

            result = _run(
                vault,
                "--force",
                "--vault",
                str(vault),
                path=path,
                extra_env={
                    "ATTACK_VAULT": str(vault),
                    "ATTACK_HELD": str(held),
                },
            )
            self.assertEqual(2, result.returncode)
            self.assertIn("selected vault changed", result.stderr)
            self.assertNotIn("Traceback", result.stderr)
            self.assertFalse((vault / ".vault-meta").exists())
            self.assertFalse((held / ".vault-meta" / "transport.json").exists())


if __name__ == "__main__":
    unittest.main(verbosity=2)

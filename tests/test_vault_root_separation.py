#!/usr/bin/env python3
"""End-to-end plugin-root and vault-root separation tests for legacy helpers."""

from __future__ import annotations

import hashlib
import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


PLUGIN_ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = PLUGIN_ROOT / "scripts"
CORE_CLI = SCRIPTS / "claude-obsidian.py"


def _environment(**updates: str) -> dict[str, str]:
    env = os.environ.copy()
    env.pop("CLAUDE_OBSIDIAN_VAULT", None)
    env.update(updates)
    return env


def _run_python(
    name: str,
    *arguments: str,
    cwd: Path,
    env: dict[str, str] | None = None,
) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(SCRIPTS / name), *arguments],
        cwd=cwd,
        env=env or _environment(),
        capture_output=True,
        text=True,
        timeout=20,
        check=False,
    )


def _set_mode(vault: Path, mode: str, *, cwd: Path) -> subprocess.CompletedProcess[str]:
    common = [
        sys.executable,
        str(CORE_CLI),
        "mode",
        "set",
        mode,
        "--vault",
        str(vault),
        "--generated-at",
        "2026-07-11T00:00:00Z",
        "--operation-id",
        f"mode-{mode}",
    ]
    preview = subprocess.run(
        common,
        cwd=cwd,
        env=_environment(),
        capture_output=True,
        text=True,
        timeout=20,
        check=False,
    )
    if preview.returncode != 0:
        return preview
    approval = json.loads(preview.stdout)["approved_plan_sha256"]
    return subprocess.run(
        [*common, "--approved-plan-sha256", approval, "--apply"],
        cwd=cwd,
        env=_environment(),
        capture_output=True,
        text=True,
        timeout=20,
        check=False,
    )


def _run_allocator(
    *arguments: str,
    cwd: Path,
    env: dict[str, str] | None = None,
) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["bash", str(SCRIPTS / "allocate-address.sh"), *arguments],
        cwd=cwd,
        env=env or _environment(),
        capture_output=True,
        text=True,
        timeout=20,
        check=False,
    )


def _snapshot(root: Path) -> dict[str, str]:
    if not root.is_dir():
        return {}
    return {
        path.relative_to(root).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest()
        for path in sorted(root.rglob("*"))
        if path.is_file() and not path.is_symlink()
    }


def _make_vault(root: Path, address: str, term: str) -> None:
    page = root / "wiki" / "concepts" / f"{term}.md"
    page.parent.mkdir(parents=True)
    (root / ".obsidian").mkdir()
    page.write_text(
        "---\n"
        "type: concept\n"
        f"title: {term}\n"
        f"address: {address}\n"
        "status: evergreen\n"
        "created: 2026-01-01\n"
        "updated: 2026-01-01\n"
        "tags: [fixture]\n"
        "---\n\n"
        f"# {term}\n\n{term} is the unique retrieval sentinel for this vault.\n",
        encoding="utf-8",
    )
    (root / "wiki" / "hot.md").write_text(f"Recent: [[{term}]]\n", encoding="utf-8")
    (root / "wiki" / "index.md").write_text(f"- [[{term}]]\n", encoding="utf-8")


class VaultRootSeparationTests(unittest.TestCase):
    def test_one_plugin_operates_two_vaults_without_state_collision(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault_a = base / "Vault Alpha ü"
            vault_b = base / "Vault Beta Ω"
            _make_vault(vault_a, "c-000101", "alphauniqueterm")
            _make_vault(vault_b, "c-000201", "betauniqueterm")
            plugin_meta_before = _snapshot(PLUGIN_ROOT / ".vault-meta")

            # The same plugin helper stores independent methodology state.
            set_a = _set_mode(vault_a, "lyt", cwd=base)
            set_b = _set_mode(vault_b, "para", cwd=base)
            self.assertEqual(0, set_a.returncode, set_a.stderr)
            self.assertEqual(0, set_b.returncode, set_b.stderr)
            self.assertEqual(
                "lyt",
                _run_python(
                    "wiki-mode.py", "get", "--vault", str(vault_a), cwd=base
                ).stdout.strip(),
            )
            self.assertEqual(
                "para",
                _run_python(
                    "wiki-mode.py", "get", "--vault", str(vault_b), cwd=base
                ).stdout.strip(),
            )

            # Allocator counters are vault-local even under concurrent-capable
            # shared plugin code.
            allocation_a = _run_allocator("--peek", "--vault", str(vault_a), cwd=base)
            allocation_b = _run_allocator("--peek", "--vault", str(vault_b), cwd=base)
            self.assertEqual("102", allocation_a.stdout.strip(), allocation_a.stderr)
            self.assertEqual("202", allocation_b.stdout.strip(), allocation_b.stderr)
            self.assertFalse((vault_a / ".vault-meta/address-counter.txt").exists())
            self.assertFalse((vault_b / ".vault-meta/address-counter.txt").exists())

            # Derived chunk and BM25 state is also isolated.
            for vault in (vault_a, vault_b):
                chunked = _run_python(
                    "contextual-prefix.py",
                    "--vault",
                    str(vault),
                    "--all",
                    "--no-llm",
                    cwd=base,
                )
                self.assertEqual(0, chunked.returncode, chunked.stderr)
                indexed = _run_python(
                    "bm25-index.py", "build", "--vault", str(vault), cwd=base
                )
                self.assertEqual(0, indexed.returncode, indexed.stderr)

            query_a = _run_python(
                "retrieve.py",
                "--vault",
                str(vault_a),
                "alphauniqueterm",
                "--no-rerank",
                cwd=base,
            )
            query_b = _run_python(
                "retrieve.py",
                "betauniqueterm",
                "--vault",
                str(vault_b),
                "--no-rerank",
                cwd=base,
            )
            self.assertEqual(0, query_a.returncode, query_a.stderr)
            self.assertEqual(0, query_b.returncode, query_b.stderr)
            pages_a = [
                item["page_path"] for item in json.loads(query_a.stdout)["candidates"]
            ]
            pages_b = [
                item["page_path"] for item in json.loads(query_b.stdout)["candidates"]
            ]
            self.assertTrue(any("alphauniqueterm.md" in path for path in pages_a))
            self.assertTrue(any("betauniqueterm.md" in path for path in pages_b))
            self.assertFalse(any("betauniqueterm.md" in path for path in pages_a))
            self.assertFalse(any("alphauniqueterm.md" in path for path in pages_b))

            self.assertEqual(plugin_meta_before, _snapshot(PLUGIN_ROOT / ".vault-meta"))
            self.assertFalse((vault_a / ".vault-meta/chunks/c-000201").exists())
            self.assertFalse((vault_b / ".vault-meta/chunks/c-000101").exists())

    def test_resolution_precedence_and_cwd_discovery(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault_a = base / "A vault"
            vault_b = base / "B vault"
            _make_vault(vault_a, "c-000001", "alpha")
            _make_vault(vault_b, "c-000002", "beta")
            self.assertEqual(
                0,
                _set_mode(vault_a, "lyt", cwd=base).returncode,
            )
            self.assertEqual(
                0,
                _set_mode(vault_b, "para", cwd=base).returncode,
            )

            env_a = _environment(CLAUDE_OBSIDIAN_VAULT=str(vault_a))
            from_env = _run_python("wiki-mode.py", "get", cwd=base, env=env_a)
            self.assertEqual("lyt", from_env.stdout.strip(), from_env.stderr)
            allocator_env = _run_allocator("--peek", cwd=base, env=env_a)
            self.assertEqual("2", allocator_env.stdout.strip(), allocator_env.stderr)

            # Explicit selection outranks a conflicting environment variable.
            explicit_b = _run_python(
                "wiki-mode.py", "get", "--vault", str(vault_b), cwd=base, env=env_a
            )
            self.assertEqual("para", explicit_b.stdout.strip(), explicit_b.stderr)

            nested = vault_b / "wiki" / "concepts" / "nested workdir"
            nested.mkdir()
            discovered = _run_python(
                "boundary-score.py", "--json", "--top", "1", cwd=nested
            )
            self.assertEqual(0, discovered.returncode, discovered.stderr)
            payload = json.loads(discovered.stdout)
            self.assertGreaterEqual(payload["page_count_scoreable"], 1)
            allocator_cwd = _run_allocator("--peek", cwd=nested)
            self.assertEqual("3", allocator_cwd.stdout.strip(), allocator_cwd.stderr)

            # A directory with no sentinel must fail instead of falling back to
            # the helper's installation directory.
            unrelated = base / "unrelated"
            unrelated.mkdir()
            missing = _run_python("wiki-mode.py", "get", cwd=unrelated)
            self.assertEqual(2, missing.returncode)
            self.assertIn("VAULT_NOT_FOUND", missing.stderr)

            implicit_plugin = _run_python("wiki-mode.py", "get", cwd=PLUGIN_ROOT)
            self.assertEqual(2, implicit_plugin.returncode)
            self.assertIn("PLUGIN_ROOT_IS_NOT_VAULT", implicit_plugin.stderr)

    def test_vault_state_symlink_escape_fails_before_external_write(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "vault"
            outside = base / "outside-state"
            (vault / "wiki").mkdir(parents=True)
            (vault / ".obsidian").mkdir()
            outside.mkdir()
            (vault / ".vault-meta").symlink_to(outside, target_is_directory=True)

            before = _snapshot(outside)
            allocator = _run_allocator("--vault", str(vault), cwd=base)
            self.assertEqual(2, allocator.returncode)
            self.assertIn("PATH_OUTSIDE_VAULT", allocator.stderr)
            mode = _set_mode(vault, "lyt", cwd=base)
            self.assertEqual(2, mode.returncode)
            self.assertIn("PATH_OUTSIDE_VAULT", mode.stderr)
            self.assertEqual(before, _snapshot(outside))

    def test_every_helper_accepts_explicit_vault_and_confines_paths(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            base = Path(directory)
            vault = base / "Shared Vault 文档"
            _make_vault(vault, "c-000010", "separationterm")

            mode = _run_python("wiki-mode.py", "get", "--vault", str(vault), cwd=base)
            self.assertEqual(0, mode.returncode, mode.stderr)

            boundary = _run_python(
                "boundary-score.py",
                "--vault",
                str(vault),
                "--json",
                "--top",
                "1",
                cwd=base,
            )
            self.assertEqual(0, boundary.returncode, boundary.stderr)

            tiling_env = _environment(OLLAMA_URL="http://127.0.0.1:9")
            tiling = _run_python(
                "tiling-check.py",
                "--peek",
                "--vault",
                str(vault),
                cwd=base,
                env=tiling_env,
            )
            self.assertIn(tiling.returncode, {0, 10, 11})
            self.assertEqual(
                str(vault.resolve()), json.loads(tiling.stdout)["vault_root"]
            )

            preview = _run_python(
                "contextual-prefix.py",
                "--vault",
                str(vault),
                "--all",
                "--no-llm",
                "--peek",
                cwd=base,
            )
            self.assertEqual(0, preview.returncode, preview.stderr)
            self.assertFalse((vault / ".vault-meta/chunks").exists())

            built_chunks = _run_python(
                "contextual-prefix.py",
                "--all",
                "--no-llm",
                "--vault",
                str(vault),
                cwd=base,
            )
            self.assertEqual(0, built_chunks.returncode, built_chunks.stderr)
            built_index = _run_python(
                "bm25-index.py", "--vault", str(vault), "build", cwd=base
            )
            self.assertEqual(0, built_index.returncode, built_index.stderr)

            rerank = _run_python(
                "rerank.py",
                "separationterm",
                "--peek",
                "--vault",
                str(vault),
                cwd=base,
                env=tiling_env,
            )
            self.assertEqual(0, rerank.returncode, rerank.stderr)

            retrieve = _run_python(
                "retrieve.py",
                "separationterm",
                "--no-rerank",
                "--vault",
                str(vault),
                cwd=base,
            )
            self.assertEqual(0, retrieve.returncode, retrieve.stderr)

            baseline_helper = SCRIPTS / "baseline-v16.py"
            benchmark_helper = SCRIPTS / "benchmark-runner.py"
            self.assertEqual(
                baseline_helper.is_file(),
                benchmark_helper.is_file(),
                "source-only benchmark helpers must be present or absent as a pair",
            )
            if baseline_helper.is_file():
                baseline = _run_python(
                    "baseline-v16.py",
                    "separationterm",
                    "--json",
                    "--vault",
                    str(vault),
                    cwd=base,
                )
                self.assertEqual(0, baseline.returncode, baseline.stderr)

                corpus = vault / "wiki/meta/retrieval-benchmark-v1.7.md"
                corpus.parent.mkdir(parents=True, exist_ok=True)
                corpus.write_text("# Empty hermetic benchmark\n", encoding="utf-8")
                benchmark = _run_python(
                    "benchmark-runner.py",
                    "--limit",
                    "1",
                    "--vault",
                    str(vault),
                    cwd=base,
                )
                self.assertEqual(0, benchmark.returncode, benchmark.stderr)

            # Explicit read/write paths cannot escape the selected vault.
            outside_page = base / "outside.md"
            outside_page.write_text("secret", encoding="utf-8")
            escaped_page = _run_python(
                "contextual-prefix.py",
                "--vault",
                str(vault),
                str(outside_page),
                "--no-llm",
                cwd=base,
            )
            self.assertEqual(2, escaped_page.returncode)
            self.assertIn("inside the wiki directory", escaped_page.stderr)

            outside_candidates = base / "candidates.json"
            outside_candidates.write_text("[]", encoding="utf-8")
            escaped_candidates = _run_python(
                "rerank.py",
                "query",
                "--vault",
                str(vault),
                "--candidates",
                str(outside_candidates),
                cwd=base,
            )
            self.assertEqual(3, escaped_candidates.returncode)
            self.assertIn("in-vault file", escaped_candidates.stderr)

            if benchmark_helper.is_file():
                escaped_report = _run_python(
                    "benchmark-runner.py",
                    "--vault",
                    str(vault),
                    "--json",
                    str(base / "outside-results.json"),
                    cwd=base,
                )
                self.assertEqual(2, escaped_report.returncode)
                self.assertFalse((base / "outside-results.json").exists())

                precious = vault / ".raw/precious.pdf"
                precious.parent.mkdir(exist_ok=True)
                precious.write_bytes(b"immutable benchmark boundary")
                raw_report = _run_python(
                    "benchmark-runner.py",
                    "--vault",
                    str(vault),
                    "--json",
                    ".raw/precious.pdf",
                    cwd=base,
                )
                self.assertEqual(2, raw_report.returncode)
                self.assertEqual(b"immutable benchmark boundary", precious.read_bytes())

                runtime_report = _run_python(
                    "benchmark-runner.py",
                    "--vault",
                    str(vault),
                    "--json",
                    ".vault-meta/reports/benchmark/results.json",
                    cwd=base,
                )
                self.assertEqual(0, runtime_report.returncode, runtime_report.stderr)
                self.assertTrue(
                    (vault / ".vault-meta/reports/benchmark/results.json").is_file()
                )


if __name__ == "__main__":
    unittest.main(verbosity=2)

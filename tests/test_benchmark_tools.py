#!/usr/bin/env python3
"""Golden tests for source-only historical retrieval benchmark utilities."""

from __future__ import annotations

import importlib.util
import json
import subprocess
import tempfile
import unittest
from pathlib import Path
from unittest import mock


ROOT = Path(__file__).resolve().parents[1]
BASELINE_PATH = ROOT / "scripts" / "baseline-v16.py"
RUNNER_PATH = ROOT / "scripts" / "benchmark-runner.py"
TOOLS_PRESENT = BASELINE_PATH.is_file() and RUNNER_PATH.is_file()


def import_script(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot import {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


baseline = import_script("frozen_baseline", BASELINE_PATH) if TOOLS_PRESENT else None
runner = import_script("historical_benchmark", RUNNER_PATH) if TOOLS_PRESENT else None


@unittest.skipUnless(TOOLS_PRESENT, "source-only benchmark helpers are excluded")
class BenchmarkToolTests(unittest.TestCase):
    def test_frozen_algorithm_identity_and_tokenization(self) -> None:
        assert baseline is not None
        assert runner is not None
        self.assertEqual(
            "legacy-v16-simulation-2026-05-17-v1",
            baseline.BASELINE_ALGORITHM_ID,
        )
        self.assertEqual(
            baseline.BASELINE_ALGORITHM_ID,
            runner.FROZEN_BASELINE_ALGORITHM_ID,
        )
        self.assertEqual(
            ["café", "日本語の全文検索", "foo-bar"],
            baseline.tokenize("The café and 日本語の全文検索 foo-bar"),
        )

    def test_candidate_defaults_to_deterministic_bm25(self) -> None:
        assert runner is not None
        completed = subprocess.CompletedProcess(
            args=[],
            returncode=0,
            stdout=json.dumps(
                {
                    "strategy": "bm25-only",
                    "candidates": [{"page_path": "wiki/example.md"}],
                }
            ),
            stderr="",
        )
        with mock.patch.object(runner.subprocess, "run", return_value=completed) as call:
            paths, error, strategy = runner.run_candidate("query", top_k=3)
        arguments = call.call_args.args[0]
        self.assertIn("--no-rerank", arguments)
        self.assertNotIn("--model", arguments)
        self.assertEqual(["wiki/example.md"], paths)
        self.assertIsNone(error)
        self.assertEqual("bm25-only", strategy)

    def test_semantic_candidate_requires_and_records_explicit_model(self) -> None:
        assert runner is not None
        model = "nomic-embed-text-v2-moe:latest"
        completed = subprocess.CompletedProcess(
            args=[],
            returncode=0,
            stdout=json.dumps(
                {
                    "strategy": f"bm25+rerank:cosine:{model}",
                    "candidates": [],
                }
            ),
            stderr="",
        )
        with mock.patch.object(runner.subprocess, "run", return_value=completed) as call:
            paths, error, strategy = runner.run_candidate(
                "query", top_k=5, semantic_model=model
            )
        arguments = call.call_args.args[0]
        self.assertNotIn("--no-rerank", arguments)
        model_index = arguments.index("--model")
        self.assertEqual(model, arguments[model_index + 1])
        self.assertEqual([], paths)
        self.assertIsNone(error)
        self.assertEqual(f"bm25+rerank:cosine:{model}", strategy)
        self.assertEqual(
            {
                "requested_rerank": "semantic",
                "model": model,
                "observed_strategies": [f"bm25+rerank:cosine:{model}"],
            },
            runner.candidate_mode_record(
                model,
                [{"candidate_strategy": f"bm25+rerank:cosine:{model}"}],
            ),
        )

    def test_legacy_result_requires_exact_algorithm_id(self) -> None:
        assert runner is not None
        valid = subprocess.CompletedProcess(
            args=[],
            returncode=0,
            stdout=json.dumps(
                {
                    "algorithm_id": runner.FROZEN_BASELINE_ALGORITHM_ID,
                    "candidates": [{"path": "wiki/legacy.md"}],
                }
            ),
            stderr="",
        )
        with mock.patch.object(runner.subprocess, "run", return_value=valid):
            paths, error = runner.run_legacy("query")
        self.assertEqual(["wiki/legacy.md"], paths)
        self.assertIsNone(error)

        mismatched = subprocess.CompletedProcess(
            args=[],
            returncode=0,
            stdout=json.dumps({"algorithm_id": "changed", "candidates": []}),
            stderr="",
        )
        with mock.patch.object(runner.subprocess, "run", return_value=mismatched):
            paths, error = runner.run_legacy("query")
        self.assertEqual([], paths)
        self.assertIn("baseline algorithm mismatch", error or "")

    def test_corpus_parser_and_model_validation_are_bounded(self) -> None:
        assert runner is not None
        corpus = """# Corpus

### D1
- query: Where is the page?
- correct: wiki/example.md
- relevant: wiki/support.md
- category: derived
- rationale: Golden parser fixture.
"""
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "corpus.md"
            path.write_text(corpus, encoding="utf-8")
            parsed = runner.parse_corpus(path)
        self.assertEqual("D1", parsed[0]["id"])
        self.assertEqual(["wiki/example.md"], parsed[0]["correct"])
        self.assertEqual(
            "nomic-embed-text-v2-moe",
            runner.validate_semantic_model("nomic-embed-text-v2-moe"),
        )
        for invalid in (
            "",
            "https://example.com/model",
            "model name",
            "namespace/../model",
            "x" * 256,
        ):
            with self.subTest(invalid=invalid), self.assertRaises(ValueError):
                runner.validate_semantic_model(invalid)


if __name__ == "__main__":
    unittest.main(verbosity=2)

#!/usr/bin/env python3
"""Tests for non-mutating release-gate planning."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from claude_obsidian.gates import evaluate_release_gates


class ReleaseGateTests(unittest.TestCase):
    def test_plan_exposes_commands_and_manual_reviews_without_execution(self) -> None:
        report = evaluate_release_gates(ROOT)
        self.assertTrue(report["ok"], report)
        self.assertFalse(report["ready"])
        self.assertEqual(10, len(report["gates"]))
        states = {item["status"] for item in report["gates"]}
        self.assertEqual({"planned", "manual-review"}, states)
        self.assertIn("owner-promotion-approval", report["pending"])

    def test_selected_command_gate_executes(self) -> None:
        report = evaluate_release_gates(
            ROOT,
            execute=True,
            selected=["deterministic-sample"],
        )
        self.assertTrue(report["ok"], report)
        self.assertFalse(report["ready"], report)
        self.assertEqual(10, len(report["gates"]))
        selected = next(
            item for item in report["gates"] if item["id"] == "deterministic-sample"
        )
        self.assertEqual("passed", selected["status"])
        self.assertIn("owner-promotion-approval", report["pending"])
        self.assertEqual("selected", report["scope"])

    def test_unknown_gate_fails_closed(self) -> None:
        report = evaluate_release_gates(ROOT, selected=["not-a-gate"])
        self.assertFalse(report["ok"])
        self.assertEqual("unknown_gate", report["errors"][0]["code"])


if __name__ == "__main__":
    unittest.main()

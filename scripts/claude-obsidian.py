#!/usr/bin/env python3
"""Compatibility entry point for plugin hooks and legacy script callers."""

from __future__ import annotations

import sys
from pathlib import Path

sys.dont_write_bytecode = True

PLUGIN_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PLUGIN_ROOT))

from claude_obsidian.cli import main


raise SystemExit(main())

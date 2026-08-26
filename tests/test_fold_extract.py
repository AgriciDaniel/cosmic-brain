#!/usr/bin/env python3
"""test_fold_extract.py — hermetic tests for scripts/fold-extract.py.

No ollama required. Covers the two things that can silently corrupt a vault:
the log parser (wrong entry boundaries) and the extractive gate (a model
assertion that is not in the source).
"""

import importlib.util
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SCRIPT = REPO / "scripts" / "fold-extract.py"

spec = importlib.util.spec_from_file_location("fold_extract", SCRIPT)
fx = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fx)

FAILURES = []


def check(name, cond, detail=""):
    if cond:
        print(f"  ok   {name}")
    else:
        print(f"  FAIL {name} {detail}")
        FAILURES.append(name)


SAMPLE_LOG = """\
# Wiki Log

Chronological record of wiki operations.

## 2026-08-14

- **maintenance** | `hot.md` split — cache restored to spec
  - Pages created: [[Hot Cache Archive]]
  - Reduced from 41,800 words to 454 words.
- **query** | Google to OneDrive migration audit
  - Pages created: [[Google to OneDrive Migration]] (address c-000577)
  - Drive cloud 56.92 GB vs mirrored 46.99 GB.

## 2026-08-13

- **ingest** | Scrap Mechanic food data
  - Flower Tea heals 20 HP, declared in `consumable.shapeset`.
  - Pages updated: [[Scrap Mechanic Flower Tea (Loot-Only, No Recipe)]]
"""


def test_parse_entries():
    print("test_parse_entries")
    entries = fx.parse_entries(SAMPLE_LOG)
    check("three entries parsed", len(entries) == 3, f"got {len(entries)}")
    check("newest-first order preserved", entries[0]["date"] == "2026-08-14")
    check("op extracted", entries[0]["op"] == "maintenance", f"got {entries[0]['op']!r}")
    check("second entry on same date", entries[1]["date"] == "2026-08-14")
    check("second entry op", entries[1]["op"] == "query")
    check("date rolls over", entries[2]["date"] == "2026-08-13")
    check("body captured", any("41,800" in b for b in entries[0]["body"]))
    check("body not leaked across entries",
          not any("Drive cloud" in b for b in entries[0]["body"]))


def test_headings_are_not_entries():
    print("test_headings_are_not_entries")
    # A date heading alone must not create an entry.
    entries = fx.parse_entries("## 2026-01-01\n\n## 2026-01-02\n")
    check("bare headings yield no entries", entries == [], f"got {entries}")


def test_old_format_yields_nothing():
    print("test_old_format_yields_nothing")
    # The pre-fix skill assumed '## [date] op | title'. Confirm that shape
    # produces no entries, which is exactly the bug this script fixes.
    old = "## [2026-04-23] save | DragonScale Memory v0.2\n- Location: wiki/x.md\n"
    check("legacy format parses to zero", fx.parse_entries(old) == [])


def test_summarise_row():
    print("test_summarise_row")
    e = fx.parse_entries(SAMPLE_LOG)[0]
    s = fx.summarise_row(e)
    check("summary non-empty", len(s) > 8, f"got {s!r}")
    check("markdown stripped", "[[" not in s and "`" not in s, f"got {s!r}")
    empty = {"date": "2026-01-01", "op": "x", "title": "t", "body": []}
    check("empty body flagged", fx.summarise_row(empty) == "ambiguous in source")


def test_summarise_prefers_findings():
    print("test_summarise_prefers_findings")
    # Metrics bullet first, finding second — the finding must win.
    e = {
        "date": "2026-08-13", "op": "autoresearch", "title": "t",
        "body": [
            "  - Rounds: 2 | Searches: 0 | Install files read: 6",
            "  - Pages created: [[Some Page]]",
            "  - ❌ Placing it ends the carry immunity - it is a live unit again.",
        ],
    }
    s = fx.summarise_row(e)
    check("finding bullet chosen over metrics", "carry immunity" in s, f"got {s!r}")
    check("metrics line rejected", "Rounds" not in s, f"got {s!r}")


def test_summarise_skips_bookkeeping_without_markers():
    print("test_summarise_skips_bookkeeping_without_markers")
    e = {
        "date": "2026-08-13", "op": "ingest", "title": "t",
        "body": [
            "  - Searches: 3 | Fetches: 8",
            "  - The raid budget scales with crop value.",
        ],
    }
    s = fx.summarise_row(e)
    check("non-bookkeeping bullet chosen", "raid budget" in s, f"got {s!r}")


def test_summarise_falls_back_to_first():
    print("test_summarise_falls_back_to_first")
    e = {
        "date": "2026-08-13", "op": "ingest", "title": "t",
        "body": ["  - Rounds: 2 | Searches: 0"],
    }
    s = fx.summarise_row(e)
    check("bookkeeping-only falls back", "Rounds" in s, f"got {s!r}")


def test_pages_for():
    print("test_pages_for")
    e = fx.parse_entries(SAMPLE_LOG)[0]
    check("wikilink extracted", fx.pages_for(e) == ["Hot Cache Archive"],
          f"got {fx.pages_for(e)}")


def test_verify_clean_passes():
    print("test_verify_clean_passes")
    src = SAMPLE_LOG
    good = "- Flower Tea heals 20 HP, declared in `consumable.shapeset` [2026-08-13]."
    v = fx.verify_extractive(good, src)
    check("faithful output passes", v == [], f"violations={v}")


def test_verify_catches_invented_identifier():
    print("test_verify_catches_invented_identifier")
    bad = "- Values come from `nonexistent_config.shapeset` [2026-08-13]."
    v = fx.verify_extractive(bad, SAMPLE_LOG)
    check("invented filename caught", any("nonexistent" in x for x in v), f"violations={v}")


def test_verify_catches_invented_uuid():
    print("test_verify_catches_invented_uuid")
    bad = "- Item uuid `deadbeef-0000-1111-2222-333344445555` [2026-08-13]."
    v = fx.verify_extractive(bad, SAMPLE_LOG)
    check("invented uuid caught", any("deadbeef" in x for x in v), f"violations={v}")


def test_verify_catches_invented_quote():
    print("test_verify_catches_invented_quote")
    bad = '- The log says "this phrase was never written anywhere" [2026-08-14].'
    v = fx.verify_extractive(bad, SAMPLE_LOG)
    check("invented quote caught", len(v) > 0, f"violations={v}")


def test_strict_number_gate():
    print("test_strict_number_gate")
    bad = "- Reduced from 41,800 words to 999 words [2026-08-14]."
    lenient = fx.verify_extractive(bad, SAMPLE_LOG, strict=False)
    strict = fx.verify_extractive(bad, SAMPLE_LOG, strict=True)
    check("lenient mode allows bare number", lenient == [], f"violations={lenient}")
    check("strict mode catches it", "999" in strict, f"violations={strict}")
    ok = "- Reduced from 41,800 words to 454 words [2026-08-14]."
    check("strict mode accepts sourced numbers",
          fx.verify_extractive(ok, SAMPLE_LOG, strict=True) == [])


def test_verify_is_whitespace_insensitive():
    print("test_verify_is_whitespace_insensitive")
    src = "value is `foo_bar   baz`"
    out = "uses `foo_bar baz`"
    check("collapsed whitespace still matches",
          fx.verify_extractive(out, src) == [])


def _make_vault(parent):
    vault = parent / "vault"
    (vault / ".obsidian").mkdir(parents=True)
    (vault / "wiki").mkdir()
    (vault / ".raw").mkdir()
    return vault


def test_read_log_uses_the_selected_vault():
    print("test_read_log_uses_the_selected_vault")
    with tempfile.TemporaryDirectory() as directory:
        vault = _make_vault(Path(directory))
        (vault / "wiki/log.md").write_text(SAMPLE_LOG, encoding="utf-8")
        text, display = fx.read_log(str(vault))
        check("log text returned", text == SAMPLE_LOG)
        check("display path names the vault", display.endswith("wiki/log.md"), display)
        check("entries parse from the selected vault", len(fx.parse_entries(text)) == 3)


def test_read_log_refuses_a_non_vault():
    print("test_read_log_refuses_a_non_vault")
    with tempfile.TemporaryDirectory() as directory:
        text, display = fx.read_log(directory)
        check("no text returned", text is None)
        check("selection failure reports no path", display is None, repr(display))

    with tempfile.TemporaryDirectory() as directory:
        vault = _make_vault(Path(directory))
        text, display = fx.read_log(str(vault))
        check("missing log is not a selection failure", text is None and display)


def main():
    for fn in (
        test_parse_entries,
        test_headings_are_not_entries,
        test_old_format_yields_nothing,
        test_summarise_row,
        test_summarise_prefers_findings,
        test_summarise_skips_bookkeeping_without_markers,
        test_summarise_falls_back_to_first,
        test_pages_for,
        test_verify_clean_passes,
        test_verify_catches_invented_identifier,
        test_verify_catches_invented_uuid,
        test_verify_catches_invented_quote,
        test_strict_number_gate,
        test_verify_is_whitespace_insensitive,
        test_read_log_uses_the_selected_vault,
        test_read_log_refuses_a_non_vault,
    ):
        fn()

    print()
    if FAILURES:
        print(f"FAILED: {len(FAILURES)} check(s): {', '.join(FAILURES)}")
        return 1
    print("test_fold_extract.py: all checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())

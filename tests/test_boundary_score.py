#!/usr/bin/env python3
"""test_boundary_score.py — unit tests for scripts/boundary-score.py.

Exercises parser, recency weight, wikilink extraction (including the
code-block guard), graph construction, and top-N selection against a
throwaway in-memory vault. No external prerequisites.

Usage:
  python3 tests/test_boundary_score.py
"""

import importlib.util
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HELPER = ROOT / "scripts" / "boundary-score.py"
os.environ["CLAUDE_OBSIDIAN_VAULT"] = str(ROOT)

spec = importlib.util.spec_from_file_location("bs", HELPER)
bs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bs)


class Fail(SystemExit):
    pass


def assert_eq(label, expected, actual):
    if expected != actual:
        raise Fail(f"FAIL {label}: expected {expected!r}, got {actual!r}")
    print(f"OK   {label}")


def assert_close(label, expected, actual, tol=1e-6):
    if abs(expected - actual) > tol:
        raise Fail(f"FAIL {label}: expected ~{expected!r}, got {actual!r}")
    print(f"OK   {label}")


def assert_true(label, cond):
    if not cond:
        raise Fail(f"FAIL {label}")
    print(f"OK   {label}")


def test_frontmatter_fields():
    fm, body = bs.parse_frontmatter(
        '---\ntype: concept\ntitle: "Foo Bar"\nupdated: 2026-04-20\ncreated: 2026-04-01\n---\n# Hello\n'
    )
    assert_eq("type", "concept", fm.get("type"))
    assert_eq("title unquoted", "Foo Bar", fm.get("title"))
    assert_eq("updated", "2026-04-20", fm.get("updated"))
    assert_eq("created", "2026-04-01", fm.get("created"))
    assert_eq("body", "# Hello\n", body)


def test_recency_weight_bounds():
    import math

    assert_close("day 0 -> ~1.0", 1.0, bs.recency_weight(0.0))
    # 30 days = halflife -> exp(-1)
    assert_close("day 30 -> e^-1", math.exp(-1.0), bs.recency_weight(30.0))
    # No floor: very old pages approach zero
    very_old = bs.recency_weight(10_000.0)
    assert_true("very old close to zero", very_old < 1e-10)


def test_wikilink_extraction_basic():
    body = "Text [[Foo]] and [[Bar|alias]] and [[Baz#Heading]] and [[Foo]] dup.\n"
    links = bs.extract_wikilinks(body)
    assert_eq("basic extraction", {"Foo", "Bar", "Baz"}, links)


def test_wikilink_code_block_skipped():
    body = (
        "Before [[Real]] link.\n"
        "```\n"
        "[[InBacktickBlock]]\n"
        "```\n"
        "After [[AnotherReal]] link.\n"
    )
    links = bs.extract_wikilinks(body)
    assert_eq("backtick-block links excluded", {"Real", "AnotherReal"}, links)


def test_wikilink_tilde_fence_skipped():
    body = "A [[Outside]] link.\n~~~\n[[InTildeBlock]]\n~~~\nB [[Another]] link.\n"
    assert_eq(
        "tilde-block links excluded", {"Outside", "Another"}, bs.extract_wikilinks(body)
    )


def test_wikilink_longer_fence_handles_nested():
    # Opening 4-backtick fence; an inner 3-backtick line must NOT close it
    body = (
        "[[Outside]]\n"
        "````\n"
        "some code\n"
        "```\n"
        "[[Nested]]\n"
        "```\n"
        "more code\n"
        "````\n"
        "[[AfterClose]]\n"
    )
    assert_eq(
        "longer fence holds through shorter inner fence",
        {"Outside", "AfterClose"},
        bs.extract_wikilinks(body),
    )


def test_wikilink_indented_not_filtered():
    # Obsidian bullets with 4-space indent should still count
    body = "Text\n    [[IndentedBullet]]\n"
    assert_eq(
        "indented-4-space NOT filtered as code",
        {"IndentedBullet"},
        bs.extract_wikilinks(body),
    )


def test_days_since():
    today = bs.days_since(None)
    assert_true("missing date -> large sentinel", today >= 9999.0)
    garbage = bs.days_since("not-a-date")
    assert_true("garbage date -> large sentinel", garbage >= 9999.0)


def test_graph_and_scoring_on_temp_vault():
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        wiki = tmp / "wiki"
        (wiki / "concepts").mkdir(parents=True)
        (wiki / "entities").mkdir(parents=True)

        # Frontier page: many outbound, none inbound
        (wiki / "concepts" / "Frontier.md").write_text(
            "---\ntype: concept\ntitle: Frontier\nupdated: "
            + __import__("datetime").date.today().isoformat()
            + "\n---\n[[Hub]] [[Alpha]] [[Beta]]\n"
        )
        # Hub page: many inbound
        (wiki / "concepts" / "Hub.md").write_text(
            "---\ntype: concept\ntitle: Hub\nupdated: 2025-01-01\n---\nBody.\n"
        )
        (wiki / "entities" / "Alpha.md").write_text(
            "---\ntype: entity\ntitle: Alpha\nupdated: 2025-01-01\n---\n[[Hub]]\n"
        )
        (wiki / "entities" / "Beta.md").write_text(
            "---\ntype: entity\ntitle: Beta\nupdated: 2025-01-01\n---\n[[Hub]]\n"
        )
        # Excluded meta
        (wiki / "index.md").write_text("---\ntype: meta\n---\n[[Frontier]] [[Hub]]\n")

        original_root = bs.VAULT_ROOT
        original_wiki = bs.WIKI_DIR
        bs.VAULT_ROOT = tmp
        bs.WIKI_DIR = wiki
        try:
            pages = bs.collect_pages()
            assert_eq("scoreable count", 4, len(pages))
            assert_true("Frontier present", "Frontier" in pages)
            assert_true("Hub present", "Hub" in pages)
            assert_true("Alpha present", "Alpha" in pages)
            assert_true("Beta present", "Beta" in pages)
            assert_true("meta excluded", "index" not in pages)

            out_e, in_e = bs.build_graph(pages)
            assert_eq("Frontier out-degree", 3, len(out_e["Frontier"]))
            assert_eq("Hub out-degree", 0, len(out_e["Hub"]))
            assert_eq(
                "Hub in-degree", 3, len(in_e["Hub"])
            )  # from Frontier, Alpha, Beta
            assert_eq("Frontier in-degree from meta excluded", 0, len(in_e["Frontier"]))

            frontier_score = bs.score_page("Frontier", pages, out_e, in_e)
            hub_score = bs.score_page("Hub", pages, out_e, in_e)
            assert_true("Frontier score positive", frontier_score["score"] > 0)
            # Hub is older and has in-degree 3, out-degree 0. Without a
            # recency floor, very-old hubs have near-zero weight, so their
            # score approaches zero (not strongly negative). A fresh hub
            # with the same topology WOULD score strongly negative; this
            # is intentional — stale hubs do not pollute the frontier.
            assert_true(
                "Frontier outranks Hub", frontier_score["score"] > hub_score["score"]
            )
            assert_eq("Frontier out", 3, frontier_score["out_degree"])
            assert_eq("Frontier in", 0, frontier_score["in_degree"])
            assert_eq("Hub out", 0, hub_score["out_degree"])
            assert_eq("Hub in", 3, hub_score["in_degree"])
        finally:
            bs.VAULT_ROOT = original_root
            bs.WIKI_DIR = original_wiki


def test_graph_excludes_self_loop_unresolved_meta():
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        wiki = tmp / "wiki"
        (wiki / "concepts").mkdir(parents=True)
        # Self-loop via alias to itself
        (wiki / "concepts" / "SelfLoop.md").write_text(
            "---\ntype: concept\ntitle: SelfLoop\nupdated: 2026-04-24\n---\n[[SelfLoop]] [[DoesNotExist]]\n"
        )
        # Target that exists but is meta (excluded)
        (wiki / "index.md").write_text("---\ntype: meta\n---\nmeta body\n")
        (wiki / "concepts" / "LinksToMeta.md").write_text(
            "---\ntype: concept\nupdated: 2026-04-24\n---\n[[index]]\n"
        )

        original_root = bs.VAULT_ROOT
        original_wiki = bs.WIKI_DIR
        bs.VAULT_ROOT = tmp
        bs.WIKI_DIR = wiki
        try:
            pages = bs.collect_pages()
            assert_eq("scoreable count (meta excluded)", 2, len(pages))
            out_e, in_e = bs.build_graph(pages)
            assert_eq("self-loop out-degree excludes self", 0, len(out_e["SelfLoop"]))
            assert_eq("unresolved target not in out-edges", 0, len(out_e["SelfLoop"]))
            assert_eq(
                "LinksToMeta out-degree excludes meta target",
                0,
                len(out_e["LinksToMeta"]),
            )
        finally:
            bs.VAULT_ROOT = original_root
            bs.WIKI_DIR = original_wiki


def test_cli_page_no_match():
    with tempfile.TemporaryDirectory() as directory:
        vault = Path(directory)
        (vault / "wiki").mkdir()
        result = subprocess.run(
            [
                sys.executable,
                str(HELPER),
                "--vault",
                str(vault),
                "--page",
                "definitely-not-a-real-page-xyz",
            ],
            capture_output=True,
            text=True,
            timeout=5,
        )
        assert_eq("--page no-match exit", 2, result.returncode)
        assert_true(
            "--page error message", "no scoreable page matches" in result.stderr
        )


def test_included_rejects_symlink():
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        wiki = tmp / "wiki"
        wiki.mkdir()
        real = wiki / "real.md"
        real.write_text("---\ntype: concept\n---\nbody\n")
        link = wiki / "link.md"
        link.symlink_to(real)

        original_root = bs.VAULT_ROOT
        bs.VAULT_ROOT = tmp
        try:
            ok_real = bs.included(real, {"type": "concept"})
            ok_link = bs.included(link, {"type": "concept"})
            assert_true("real file included", ok_real)
            assert_eq("symlink excluded", False, ok_link)
        finally:
            bs.VAULT_ROOT = original_root


def test_cli_top_zero_usage_error():
    result = subprocess.run(
        [sys.executable, str(HELPER), "--top", "0"],
        capture_output=True,
        text=True,
        timeout=5,
    )
    assert_eq("--top 0 exit", 2, result.returncode)


def test_cli_json_structure():
    with tempfile.TemporaryDirectory() as directory:
        vault = Path(directory)
        (vault / "wiki").mkdir()
        result = subprocess.run(
            [
                sys.executable,
                str(HELPER),
                "--vault",
                str(vault),
                "--json",
                "--top",
                "1",
            ],
            capture_output=True,
            text=True,
            timeout=10,
        )
        assert_eq("--json exit 0", 0, result.returncode)
        payload = json.loads(result.stdout)
        for key in ("generated", "halflife_days", "page_count_scoreable", "results"):
            assert_true(f"json has {key}", key in payload)
        assert_true("results is list", isinstance(payload["results"], list))


if __name__ == "__main__":
    try:
        test_frontmatter_fields()
        test_recency_weight_bounds()
        test_wikilink_extraction_basic()
        test_wikilink_code_block_skipped()
        test_wikilink_tilde_fence_skipped()
        test_wikilink_longer_fence_handles_nested()
        test_wikilink_indented_not_filtered()
        test_days_since()
        test_graph_and_scoring_on_temp_vault()
        test_graph_excludes_self_loop_unresolved_meta()
        test_included_rejects_symlink()
        test_cli_top_zero_usage_error()
        test_cli_page_no_match()
        test_cli_json_structure()
    except Fail as exc:
        print(exc, file=sys.stderr)
        sys.exit(1)
    print("\nAll tests passed.")

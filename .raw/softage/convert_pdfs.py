#!/usr/bin/env python3
"""Convert all PDFs in .raw/hydra/ to markdown using markitdown, preserving folder structure."""

import subprocess
import sys
from pathlib import Path

SOURCE_DIR = Path(__file__).parent
OUTPUT_BASE = SOURCE_DIR / "md"


def convert_pdf(pdf_path: Path) -> bool:
    relative = pdf_path.relative_to(SOURCE_DIR)
    out_path = OUTPUT_BASE / relative.with_suffix(".md")
    out_path.parent.mkdir(parents=True, exist_ok=True)

    if out_path.exists():
        print(f"  SKIP (exists): {relative}")
        return True

    result = subprocess.run(
        ["markitdown", str(pdf_path), "-o", str(out_path)],
        capture_output=True,
        text=True,
    )

    if result.returncode == 0:
        print(f"  OK: {relative}")
        return True
    else:
        print(f"  FAIL: {relative}")
        if result.stderr:
            print(f"       {result.stderr.strip()}")
        # Remove empty/partial output file
        if out_path.exists() and out_path.stat().st_size == 0:
            out_path.unlink()
        return False


def main():
    pdfs = sorted(SOURCE_DIR.rglob("*.pdf"))
    # Exclude anything already inside the md/ output dir
    pdfs = [p for p in pdfs if OUTPUT_BASE not in p.parents]

    total = len(pdfs)
    print(f"Found {total} PDFs. Converting to {OUTPUT_BASE}\n")

    ok = fail = skip = 0
    for i, pdf in enumerate(pdfs, 1):
        print(f"[{i}/{total}]", end=" ")
        result = convert_pdf(pdf)
        if result:
            # Distinguish skip vs ok by checking if we printed SKIP
            ok += 1
        else:
            fail += 1

    print(f"\nDone. OK: {ok}  FAIL: {fail}")
    if fail:
        sys.exit(1)


if __name__ == "__main__":
    main()

---
name: wiki-clip
description: "Move markdown files from Clippings folder to .raw/, then ingest them into the wiki. Triggers on: clip ingest, ingest clippings, move and ingest, process clippings"
---

# wiki-clip: Ingest Web Clipper Content

Move Web Clipper files from `Clippings/` to `.raw/`, then ingest them into the wiki.

**Web Clipper setup.** In the Obsidian Web Clipper extension settings, set the destination folder to `.raw/` (no leading dot). The folder was renamed from `.raw/` because dot-prefixed folders are invisible to the Clipper's folder picker.

**Precondition.** If `.raw/` is missing but a legacy `.raw/` exists, stop and tell the user to run `bash bin/migrate-raw-folder.sh` first. Do not fall back to `.raw/`.

## Workflow

1. **Move files** from `Clippings/` to `.raw/`
2. **List** the files that were moved
3. **Ingest** each file using the `wiki-ingest` skill

## Usage

Trigger phrases:
- `/wiki-clip`
- "clip ingest"
- "ingest clippings"
- "move and ingest"
- "process clippings"

## Steps

1. Count files in `Clippings/` folder
2. If files exist, move all `.md` files to `.raw/` using `bash move-clippings.sh`
3. Parse the list of moved files from the script output
4. For each file, invoke the `wiki-ingest` skill with the filename
5. Report summary: number of files moved and ingested

## Implementation Notes

- Uses the existing `move-clippings.sh` script to handle the file move operation
- Delegates ingest work to the `wiki-ingest` skill to maintain consistency
- Shows user which files were moved before ingesting
- Each file is ingested individually (allows user to see progress)

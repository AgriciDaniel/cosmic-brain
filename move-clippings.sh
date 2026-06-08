#!/bin/bash
# Move clippings from Clippings/ folder to .raw/ and ingest them

set -e

CLIPPINGS_DIR="Clippings"
RAW_DIR="raw"

# Check if Clippings folder exists
if [ ! -d "$CLIPPINGS_DIR" ]; then
  echo "ℹ️  No Clippings folder found. Nothing to move."
  exit 0
fi

# Count files to move
COUNT=$(find "$CLIPPINGS_DIR" -maxdepth 1 -name "*.md" 2>/dev/null | wc -l)

if [ "$COUNT" -eq 0 ]; then
  echo "ℹ️  No markdown files in Clippings folder."
  exit 0
fi

# Move files
FILES_TO_INGEST=()
while IFS= read -r file; do
  mv "$file" "$RAW_DIR/"
  FILES_TO_INGEST+=("$(basename "$file")")
done < <(find "$CLIPPINGS_DIR" -maxdepth 1 -name "*.md")

echo "✓ Moved $COUNT file(s) from Clippings/ to .raw/"
echo ""
echo "Files ready to ingest:"
printf '%s\n' "${FILES_TO_INGEST[@]}" | sed 's|^|  - |'
echo ""
echo "💡 Tell Claude: 'ingest [filename]' to add each to the wiki"

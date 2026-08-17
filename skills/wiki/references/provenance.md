# Evidence and provenance

Keep ingestion state, source evidence, and claim assessment separate.

Resolve the installed product root from the invoking skill's own location, not
from the user-vault working directory:

```bash
PRODUCT_ROOT=/absolute/path/to/installed/claude-obsidian
CORE="$PRODUCT_ROOT/scripts/claude-obsidian.py"
test -f "$CORE"
```

## Ledgers

- `.raw/.manifest.json`: legacy-compatible ingestion hashes, generated pages,
  address map, and last processing result.
- `wiki/meta/ledgers/source-ledger.json`: stable source identities, authority,
  SHA-256, retrieval/freshness, review state, and linked pages.
- `wiki/meta/ledgers/claim-ledger.json`: falsifiable claims, note locations,
  support, contradictions, confidence, risk, and review state.

Do not overload one ledger with all three jobs.

## Source rules

- Use SHA-256 for new source identity and delta checks.
- File locators are vault-relative. Remote locators are absolute HTTPS URLs.
- Source authority is one of `official`, `primary`, `secondary`, `community`,
  `synthetic`, or `unknown`.
- Review state is `unreviewed`, `active`, `superseded`, or `rejected`.
- Compute staleness from `refresh_due`; do not store a second stale flag.
- Sources sharing an `independence_key` do not count as independent
  corroboration.
- Sources that resolve to the same canonical URL origin do not count as
  independent merely because IPv6, IDN, Unicode, dot-segment, default-port, or
  percent-encoding spelling differs. Escaped reserved path/query bytes remain
  distinct because they can identify a different resource.

## Claim rules

- Assessment is `accepted`, `provisional`, `contested`, `unsupported`, or
  `deprecated`.
- Accepted claims need at least one fresh, active, non-synthetic source.
- High-risk accepted claims need two independent sources.
- Preserve contradictory evidence. Do not silently select a winner.
- `unsupported` is the canonical no-data state. A grounded refusal is better
  than confident invention.
- Never fabricate quotations, page numbers, dates, or evidence locators.

## Migration

Run migration as a dry-run first:

```bash
python3 "$CORE" migrate --vault VAULT \
  --generated-at <ISO-UTC> --operation-id migrate-reviewed
python3 "$CORE" migrate --vault VAULT \
  --generated-at <ISO-UTC> --operation-id migrate-reviewed \
  --approved-plan-sha256 <reviewed-sha256> --apply
```

Migration leaves `.raw/.manifest.json` byte-for-byte unchanged, creates missing
ledgers, defaults unknown evidence fields honestly, and never extracts claims
from legacy prose automatically.

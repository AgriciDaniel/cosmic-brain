# Domain-specific scaffold profiles

Initialize or adopt the baseline vault first. A profile adds folders, page
types, and index sections in one inspected transaction; it does not replace the
selected organizational methodology (`generic`, `lyt`, `para`, or
`zettelkasten`). Preserve existing notes and routes.

Every profile keeps these invariants:

- immutable captured sources under `.raw/`;
- generated knowledge under `wiki/`;
- `wiki/index.md`, `wiki/log.md`, and `wiki/hot.md` as canonical lifecycle
  pages;
- evidence and claim ledgers under `wiki/meta/ledgers/`;
- one operation-level transaction for a requested scaffold;
- no remote, plugin, egress, or Git setup without separate approval.

## Website or content system

Suggested routes: `wiki/pages/`, `wiki/structure/`, `wiki/audits/`,
`wiki/keywords/`, and `wiki/entities/`.

Useful page properties include the source URL, lifecycle status, canonical URL,
last verified date, and internal-link counts. Treat crawl and analytics exports
as sources; do not assert live indexing or HTTP status without current evidence.

## Software repository

Suggested routes: `wiki/modules/`, `wiki/components/`, `wiki/decisions/`,
`wiki/dependencies/`, and `wiki/flows/`.

Record repository-relative paths, purpose, status, dependency relationships,
and evidence from code, tests, issues, or primary documentation. Generated
architecture pages must distinguish observed behavior from inference.

## Business or project

Suggested routes: `wiki/stakeholders/`, `wiki/decisions/`,
`wiki/deliverables/`, `wiki/intel/`, and `wiki/meetings/`.

Record decision date, owner, status, rationale, and source record. Preserve
conflicting recollections as contested evidence instead of rewriting history.

## Personal knowledge vault

Suggested routes: `wiki/goals/`, `wiki/learning/`, `wiki/people/`,
`wiki/areas/`, and `wiki/resources/`.

Default to local-only processing. Confirm privacy and retention before capturing
messages, health, finance, relationship, or voice data. Do not save a whole
conversation when the user asked to preserve only one insight.

## Research

Suggested routes: `wiki/papers/`, `wiki/concepts/`, `wiki/entities/`,
`wiki/syntheses/`, and `wiki/gaps/`.

Track claim support, contradictions, authority, independence, freshness, and
risk in the ledgers. A paper summary is secondary to the captured paper and
does not automatically validate its claims.

## Book or course companion

Suggested routes: `wiki/chapters/`, `wiki/concepts/`, `wiki/people/`,
`wiki/exercises/`, and `wiki/reflections/`.

Capture only material the user is authorized to store. Prefer concise
source-linked notes over reproducing copyrighted chapters or transcripts.

## Applying a profile

1. Inspect the current methodology and representative notes.
2. Draft a folder/page/property map and identify naming conflicts.
3. Show the proposed paths and any schema additions.
4. Apply approved additions once through the transaction core.
5. Run deterministic lint and report unresolved findings.
6. Let actual use determine later refinements rather than prebuilding an empty
   hierarchy.

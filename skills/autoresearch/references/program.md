# Default research program

This is the bounded default for `autoresearch`. User-supplied limits may make it
stricter. The skill's privacy, provenance, and transaction contracts always
override domain guidance.

## Objectives

- Answer a precise research question rather than collecting a topic indiscriminately.
- Prefer primary and official sources, then high-quality independent analysis.
- Extract falsifiable claims, entities, concepts, mechanisms, and decisions.
- Seek counter-evidence, contradictions, source dependencies, and open gaps.
- Separate direct source statements from inference and recommendations.
- Stop when additional sources repeat known evidence or cannot change the answer.

## Default budget

- Search rounds: at most 3
- Fetched sources per round: at most 5
- Drafted pages: at most 15
- Parallel workers: at most the host's available safe concurrency

Before egress, also agree on elapsed-time, cost, domain, and privacy limits.
Report budget use after each round. Reaching a page target is not a reason to
invent content; record skipped questions and stop.

## Evidence assessment

Use the source and claim ledgers, not a prose confidence label alone.

- `accepted`: supported by at least one fresh, active, non-synthetic source.
- High-risk accepted claims: supported by two independent sources.
- `provisional`: useful but incomplete support.
- `contested`: credible evidence disagrees.
- `unsupported`: no adequate evidence.
- `deprecated`: superseded and retained for history.

Freshness is domain- and claim-specific. Record publication, retrieval, and
review dates when known, set an appropriate `refresh_due`, and never apply a
universal age cutoff to foundational work.

## Output style

- Use direct language while preserving necessary uncertainty.
- Cite each material non-obvious claim to a source record and locator.
- Use short, focused pages; split by concept when that improves retrieval.
- State `unknown`, `unsupported`, or `contested` instead of filling gaps.
- Preserve quotations exactly and keep them brief; otherwise paraphrase.
- Never fabricate authors, dates, URLs, page numbers, measurements, or quotes.

## Source selection

Authority depends on the question:

- Software and products: current official documentation, source repositories,
  specifications, and reproducible tests.
- Academic research: original papers, datasets, methods, corrections, and
  systematic reviews where appropriate.
- Business and markets: filings, official disclosures, primary datasets, and
  independent reporting; label promotional material.
- Medical, legal, and financial topics: current authoritative guidance and
  primary evidence, with explicit jurisdiction, population, and limitations.

Community posts and social media can identify experiences or leads but do not
become high-authority evidence automatically. Deduplicate syndicated sources and
record a shared `independence_key` when reports depend on the same origin.

## Stop conditions

Stop and report the boundary when any of these occurs:

- the agreed question is adequately supported;
- a budget is exhausted;
- the user stops or narrows the work;
- remaining results repeat dependent evidence;
- egress would exceed approved domains or expose private context;
- a key claim cannot be verified;
- sources require access or rights the user has not supplied.

Research output remains a reviewable dossier. Merging it into canonical pages is
a separate approved transaction.

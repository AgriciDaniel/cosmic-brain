---
date: 2026-08-09
project: FlowLens
status: shipped
tags: [flowlens, product, quickstart, research]
---

# FlowLens minimal-friction quickstart

## Decisive UX thesis

**Rough notes → reviewable process → gaps → Markdown/JSON.** The launch surface makes this useful without signup, capture permissions, or a backend account: a visitor can try a realistic MSP employee-offboarding example, edit notes, compile locally, review provenance and warnings, and download the result.

## Delivery evidence

- Live URL: https://web-chi-nine-65.vercel.app/try
- PR #5 merged as commit `8fb124a`.
- Homepage reduced from 770 to 347 words, 42 to 18 links, and 10 to 4 sections.
- One-click compilation produced 6 steps in 48ms locally and 71ms live, with zero network requests.
- 31 tests, lint, build, audit, and CI passed.
- Primary research document: `docs/research/minimal-friction-process-assurance-2026-08.md`.

## Security and launch boundaries

- Security audit blocker: there is no FlowLens Supabase project yet.
- Do not apply migrations `0001` or `0002` until role-aware RLS, cross-workspace integrity, the private security-definer function, auth foreign keys, and storage-retention controls are fixed and reviewed.
- `PILOT_NOTIFICATION_TO` is still missing unless separately verified otherwise; pilot intake must remain truthfully unavailable when notification configuration is incomplete.

## Next recommended tranche

Build real, explicit Record capture with pause, discard, and redaction controls. Add persistence only after the security gates above are complete.

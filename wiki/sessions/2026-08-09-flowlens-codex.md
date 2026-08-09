---
date: 2026-08-09
project: FlowLens
agent: codex
status: completed
---

## What I did

- Shipped the minimal-friction public UX around the quickstart: rough notes become a reviewable process with warnings, provenance, and Markdown/JSON export.
- Connected the browser flow directly to `compileNotesToProcessDraft`, added sensible input/line limits, source-note export warnings, and a compact truthful footer.
- Reduced the homepage to a focused hero, three-step explanation, capability truth, and one dominant quickstart CTA.

## Files changed

- `apps/web/src/app/page.tsx`
- `apps/web/src/app/try/page.tsx`
- `apps/web/src/components/quickstart-form.tsx`
- `apps/web/src/components/site-footer.tsx`
- `apps/web/src/components/site-nav.tsx`
- `apps/web/src/lib/quickstart.ts`
- `apps/web/src/lib/__tests__/quickstart.test.ts`
- `apps/web/src/lib/capabilities.ts`
- `apps/web/package.json`
- Primary research: `docs/research/minimal-friction-process-assurance-2026-08.md`

## Decisions made

- Keep the first useful action zero-signup and local: no notes are uploaded by the quickstart.
- Treat the deterministic compiler output as reviewable draft evidence, never as live AI inference or an approved production procedure.
- Keep real capture and persistence behind explicit security gates; the current private pilot remains truthful about what is not implemented.

## Next steps

- Implement explicit Record capture with pause, discard, and redaction before adding persistence.
- Resolve the security audit blockers before applying migrations `0001`/`0002`: role-aware RLS, cross-workspace integrity, private security-definer function, auth foreign keys, and storage-retention controls.
- Verify/set `PILOT_NOTIFICATION_TO` before relying on pilot notifications.
- Keep the live quickstart available at https://web-chi-nine-65.vercel.app/try; PR #5 merged as `8fb124a`.

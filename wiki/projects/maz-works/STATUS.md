---
project: maz-works
updated: 2026-08-13
status: in-review
repo: https://github.com/manazoid4/mazos-site
pr: https://github.com/manazoid4/mazos-site/pull/8
---
# Maz Works Site Status

Maz Works is Manazir Hussain's umbrella identity for useful software, AI tools, automation, products, experiments, and client work. It is not a large-agency identity.

## Current build

- Branch: `agents/maz-works-framework`
- Commit: `87f8fbd`
- PR: [mazos-site #8](https://github.com/manazoid4/mazos-site/pull/8)
- CI: GitHub verify and Vercel preview pass on the build commit; documentation-update checks are running
- Visual direction: FRAMEWORK — warm ivory canvas, near-black structural frames, crisp dividers, signal-yellow accents
- Flagships: JobFilter; Scrap Finance Partners
- Featured: Agent Nudge; OpenFlowKit

## Commercial path

- Bounded free tailored demo first
- Founding implementation: £150 total
- £75 after demo/scope agreement
- £75 after agreed implementation is complete and presented
- Additional workflows, integrations, dashboards, migrations, support, maintenance, major features, and extra revision rounds are separate scope

## Verification baseline

- `npm run verify` passes: typecheck, production build, 13/13 static-export tests, smoke
- `npm audit --omit=dev`: 0 vulnerabilities
- Eight external evidence links: HTTP 200
- Browser reviewed at 390px, 768px, and available 1280px widths with no overflow or console errors

## Remaining

- Execute the ten-task launch plan in `tasks/plan.md`, starting with independent Claude review
- Add a real Scrap Finance Partners screenshot with a different capture method; current browser capture timed out twice
- Close runtime keyboard/accessibility verification
- Confirm final Maz Works domain and LinkedIn URL before locking launch metadata
- Merge through GitHub and verify production before preparing LinkedIn distribution

Repository handoff: `docs/maz-works/HANDOFF.md` on the feature branch.
Detailed plan: `tasks/plan.md`; checklist: `tasks/todo.md`.
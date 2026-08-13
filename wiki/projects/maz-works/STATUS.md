---
project: maz-works
updated: 2026-08-13
status: refinement-planned
repo: https://github.com/manazoid4/mazos-site
pr: https://github.com/manazoid4/mazos-site/pull/8
---
# Maz Works Site Status

Maz Works is Manazir Hussain's umbrella identity for useful software, AI tools, automation, products, experiments, and client work. It is not a large-agency identity.

## Current build

- Branch: `agents/maz-works-framework`
- Commit: `f4b06a1`
- PR: [mazos-site #8](https://github.com/manazoid4/mazos-site/pull/8)
- Existing preview: tested first implementation and preserved baseline, but not ready to merge as the final visual milestone
- Flagships: JobFilter; Scrap Finance Partners
- Selected work: Agent Nudge; OpenFlowKit
- Detailed repository handoff: `docs/maz-works/HANDOFF.md`

## Chosen refinement — Quiet Framework

A multi-perspective review found that the current build is truthful and structurally strong but too repetitive, boxed, sales-forward, and yellow-heavy. Three directions were compared:

1. Quiet Framework — selected; calm, architectural, editorial, image-led
2. Evidence Index — useful technical influence, but too cold as the main identity
3. Builder's Journal — useful human influence, but too slow to prove delivery

The next pass preserves the warm ivory/near-black structure while using much less yellow, fewer boxes, shorter copy, larger real project visuals, a simpler mobile header/hero, and quieter pricing after client proof.

## Target architecture

Header → short hero/proof line → JobFilter flagship → Scrap client flagship → compact selected work → What I build / How I work → bounded client offer → About/contact → footer.

The hero proof ledger, proof strip, repeated service/process/pathway modules should be removed or merged after their useful information is retained.

## Commercial path — unchanged

- Bounded free tailored demo first
- Founding implementation: £150 total
- £75 after demo/scope agreement
- £75 after agreed implementation is complete and presented
- Additional workflows, integrations, dashboards, migrations, support, maintenance, major features, and extra revision rounds are separate scope

The offer should remain complete but visually subordinate to evidence.

## Verification baseline

- `npm run verify` passed before the planning-only commit: typecheck, production build, 13/13 static-export tests, smoke
- `npm audit --omit=dev`: 0 vulnerabilities on the branch baseline
- Eight external evidence links: HTTP 200
- Previous browser review at 390px, 768px, and 1280px found no overflow or console errors
- Verification must be repeated after the homepage refinement

## Exact next action

The next agent executes Task 1 in `tasks/plan.md` only: simplify the homepage into Quiet Framework, preserve all project/commercial truths, run `npm run verify`, capture 390px and 1280px views, update persistent memory, and stop for visual review before adding the two flagship case-study routes.

## Later gates

- Capture and approve a real Scrap Finance Partners screenshot through a different method
- Add dedicated JobFilter and Scrap case-study routes
- Complete real-browser keyboard/accessibility, responsive, truth, link, performance, and metadata checks
- Get Claude's independent refinement review
- Confirm final domain and exact LinkedIn URL
- Merge through GitHub and verify production before LinkedIn distribution

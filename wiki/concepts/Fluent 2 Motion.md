---
type: concept
title: "Fluent 2 Motion"
address: c-000017
source_url: "https://fluent2.microsoft.design/motion"
raw_file: "raw/articles/motion-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - motion
  - animation
  - accessibility
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Design Principles]]"
  - "[[Fluent 2 Accessibility]]"
---

# Fluent 2 Motion

Motion communicates relationships, signals change, and reinforces brand identity.

## Four Principles

- **Functional** — applied with purpose: next steps, UI changes, celebrations
- **Natural** — follows physical laws (inertia, gravity, weight, velocity)
- **Consistent** — unifies experiences; strengthens "Unmistakably Microsoft"
- **Appealing** — delight draws people in

## Duration & Easing

Balance sluggish vs abrupt. **Bigger elements need more time.**

| Easing | Use |
|--------|-----|
| Linear | Rare — rotations only ("can feel unnatural") |
| Ease-in | Start slow, accelerate |
| Ease-out | Start fast, decelerate (most common for enter) |
| Ease-in-out | Slow → fast → slow |

## Transition Types

| Type | Use |
|------|-----|
| **Enter / Exit** | Menus, dialogs — into/out of view |
| **Elevation** | Button states, drag-and-drop, depth changes |
| **Top Level** | **Quick fade** for page navigation — *not* slides |
| **Container Transform** | Resize/reposition for responsive layouts |

## Choreography

### Staggering
Delay starts to soften entry of large item sets or direct attention. "For most scenarios, a staggered animation is preferred." Non-staggered only for groups so large that staggering would feel slow.

### Hierarchy
Animation order = attention order. Prominent elements get longer durations and bigger moves; supporting elements share synchronized timing.

## Accessible Motion

> [!key-insight] Motion has medical impact
> Vestibular disorders, low vision, screen-reader users, and people sensitive to visual stimuli are all affected. Motion design is not just polish.

- Honor **prefers-reduced-motion** (WCAG)
- Short durations, natural movement
- No flashes / jarring / sudden movements (seizure risk)
- Constrain motion to focused elements
- Use **ARIA live regions** for dynamic content announcements

## Source

Fetched from https://fluent2.microsoft.design/motion on 2026-05-24.

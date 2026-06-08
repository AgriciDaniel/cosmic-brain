---
type: source
title: "Badge components - FluentUI Blazor Components"
address: c-000004
source_url: "https://fluentui-blazor-v5.azurewebsites.net/Badges"
raw_file: "raw/Badge components - FluentUI Blazor Components.md"
created: 2026-05-23
ingested: 2026-05-23
status: ingested
tags:
  - source
  - blazor
  - fluent-ui
  - components
  - accessibility
related:
  - "[[FluentUI Blazor Badge]]"
  - "[[FluentUI Blazor]]"
---

# Source: Badge components - FluentUI Blazor Components

**URL**: https://fluentui-blazor-v5.azurewebsites.net/Badges
**Version**: FluentUI Blazor v5.0.0-RC.3
**Ingested**: 2026-05-23

## Summary

Official documentation for the three badge component types in the FluentUI Blazor library. Covers component hierarchy, positioning, accessibility requirements, and usage best practices.

## Key Points

- Three badge variants: `FluentBadge` (text/icon), `FluentCounterBadge` (numbers), `FluentPresenceBadge` (status)
- Badges wrap a target component and attach to it at one of 9 positions
- Badges do NOT receive focus - they are not tab-accessible
- Screen readers treat badge content as inline text of the parent control
- Custom icons in badges require `aria-label` unless purely decorational
- Parent elements should carry explicit `aria-label` when badge text alone is insufficient
- Color must not be the sole carrier of meaning - pair with text or label

## Component Subtypes

| Component | Purpose |
|-----------|---------|
| `FluentBadge` | Text and/or icon |
| `FluentCounterBadge` | Numerical values |
| `FluentPresenceBadge` | Presence/status (online, away, busy, etc.) |

## Accessibility Callout

> [!key-insight] Badges are not focusable
> Badge content is only accessible via the parent control's label. For icon-only badges, provide `aria-label`. For any badge where content alone is ambiguous, set `aria-label` on the wrapping parent element.

## Pages Created from This Source

- [[FluentUI Blazor Badge]] — component reference and accessibility patterns
- [[FluentUI Blazor]] — entity page for the library

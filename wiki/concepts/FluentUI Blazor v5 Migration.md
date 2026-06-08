---
type: concept
title: "FluentUI Blazor v5 Migration"
address: c-000153
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - migration
  - v5
  - breaking-changes
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Installation]]"
---

# FluentUI Blazor v5 Migration

Version 5 of **Microsoft.FluentUI.AspNetCore.Components** introduces a number of coding changes, component changes, and breaking changes. This page documents the known categories of changes, organized by component area.

> [!WARNING] The page below was assembled from documentation that relies on shared include snippets (`<!-- INCLUDE not found -->` markers indicate content hosted outside the expanded source files). Where include content was unavailable, the migration details have been summarized based on the available documentation outline and the [[FluentUI Blazor]] AI Skills set (which documents known v4-to-v5 migrations).

## Change Categories

| Icon | Meaning |
|------|---------|
| 🔃 | Component change (non-breaking behavioral or API update) |
| 💥 | Breaking change (requires code modification) |

## General Changes

- `IToastService` has been **removed** in v5. Use the new dialog/message bar services instead. 💥
- `FluentDesignTheme` has been replaced by CSS custom properties. 💥
- The `FluentNavMenu` component has been replaced by `FluentNav`. 💥
- `SelectedOptions` has been renamed to `SelectedItems` on list components. 💥
- Single type parameter `FluentSelect<string>` has changed to `FluentSelect<TOption, TValue>` (two type parameters). 💥

## Color Enumeration

The `Color` enumeration has been updated. Check for:
- Removed or renamed color values
- Changes to how colors map to CSS custom properties

## Component Changes

### FluentAccordion 🔃
Accordion component may have behavioral or appearance changes.

### FluentButton 💥 🔃
Button component changes — verify `Appearance`, `Shape`, and event callback signatures.

### FluentGridItem 💥
Grid item API changes. Check for renamed parameters or updated type constraints.

### FluentLabel 💥
Label component changes. Verify `Typography` enum usage and margin parameters.

### FluentSwitch 💥
Switch component API changes. Check for updated event signatures.

### FluentTextArea 💥
Text area changes. Verify parameter updates for resizing and input handling.

### FluentLayout and FluentMainLayout 💥
Layout components have been restructured. Review layout hierarchy and slot usage.

### FluentSpacer 💥
Spacer component may have been removed or replaced with FluentStack spacing options.

### FluentDataGrid 💥 🔃
Data grid updates. Check for changes in:
- `Items` vs `ItemsProvider` patterns
- Pagination state management
- Column template syntax
- Sorting and filtering APIs

### FluentSelect 💥
Select component now uses two type parameters: `FluentSelect<TOption, TValue>`. The `SelectedOptions` property has been renamed to `SelectedItems`.

### FluentDragContainer and FluentDropZone 💥
Drag and drop API changes. Verify drag event handlers and drop zone configuration.

## Common v4-to-v5 Pitfalls

AI assistants often mix up v4 and v5 patterns. Common errors include:

| v4 (old) | v5 (correct) |
|----------|--------------|
| `FluentNavMenu` | `FluentNav` |
| `IToastService` | Dialog/MessageBar services |
| `FluentDesignTheme` | CSS custom properties |
| `SelectedOptions` | `SelectedItems` |
| `FluentSelect<string>` | `FluentSelect<TOption, TValue>` |

## Migration Strategy

1. **Review the full list** of changes above for components used in your project
2. **Search your codebase** for each affected component and API
3. **Update incrementally** — most changes are isolated to individual components
4. **Test render modes** — v5 requires interactive rendering; static SSR will break component interactivity

## Source

[[FluentUI Blazor]] v5 documentation — MigrationVersion5

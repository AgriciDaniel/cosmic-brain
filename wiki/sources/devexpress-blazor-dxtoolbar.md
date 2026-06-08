---
type: source
title: "DevExpress Blazor DxToolbar Documentation"
created: 2026-05-25
updated: 2026-05-25
address: c-000030
status: developing
tags:
  - blazor
  - devexpress
  - toolbar
  - api-reference
  - navigation
source_url: https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar
source_file: raw/articles/devexpress-blazor-dxtoolbar-2026-05-25.md
related:
  - "[[DevExpress Blazor]]"
  - "[[DevExpress Blazor DxToolbar]]"
  - "[[FluentUI Blazor]]"
---

# DevExpress Blazor DxToolbar Documentation

Source URL: <https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar>
Fetched: 2026-05-25 (via web search; direct fetch blocked by Cloudflare)
Version: v24.2

## Summary

The `DxToolbar` is a navigation and actions component in the DevExpress Blazor UI suite. It organizes commands, buttons, and menus in a horizontal bar. Supports two modes: **unbound** (declarative `Items` collection of `DxToolbarItem` components) and **bound** (`Data` property with `<DataMappings>` for flat or hierarchical data sources).

## Key Properties

| Property | Description |
|---|---|
| `Items` | Declarative collection of DxToolbarItem children |
| `Data` | Data source for bound mode |
| `Title` / `TitleTemplate` | Toolbar heading |
| `DropDownDisplayMode` | Sub-menu, modal, or bottom sheet |
| `ItemRenderStyleMode` | Default color/filling for all items |
| `SizeMode` | Size of toolbar and inner components |
| `AdaptivityAutoCollapseItemsToIcons` | Hide text, keep icons on resize |
| `AdaptivityAutoHideRootItems` | Hide root items into overflow on resize |
| `AdaptivityMinRootItemCount` | Minimum root items in adaptive mode |

## Key Events

| Event | Description |
|---|---|
| `ItemClick` | Fires when any toolbar item is clicked (`ToolbarItemClickEventArgs.ItemName`) |

## Toolbar Items

`DxToolbarItem` properties include: `Text`, `IconCssClass`, `NavigateUrl`, `BeginGroup`, `Checked`/`GroupName` (radio groups), `Alignment`, `Template`, `Items` (sub-menu), `SplitDropDownButton`, `AdaptivePriority`, `CloseMenuOnClick`, `SubmitFormOnClick`.

Events: `Click`, `CheckedChanged`.

## Data Binding

Flat data (Key + ParentKey) or hierarchical data (Children). Mapped via `<DxToolbarDataMapping>` inside `<DataMappings>`.

## Pages Created

- [[DevExpress Blazor DxToolbar]] — concept page with full API reference and code examples
- [[DevExpress Blazor]] — entity page for the DevExpress Blazor UI suite

## Key Insight

DevExpress DxToolbar is a feature-complete toolbar with adaptivity (auto-collapse), rich data binding, and flexible rendering. Unlike FluentUI Blazor's toolbar (if any), DevExpress offers built-in responsive behavior and radio-button item groups out of the box.

---
type: concept
title: "DevExpress Blazor Data Editors"
created: 2026-05-25
updated: 2026-05-25
address: c-000045
status: developing
tags:
  - blazor
  - devexpress
  - editors
  - data-entry
  - ui-components
source_url: https://docs.devexpress.com/Blazor/401156/components/data-editors
source_file: raw/Data Editors  Blazor.md
related:
  - "[[DevExpress Blazor]]"
  - "[[DevExpress Blazor DxGrid]]"
---

# DevExpress Blazor Data Editors

DevExpress provides 17 data editor components for Blazor. All can be used standalone or embedded within `DxGrid` for cell editing.

## Editor Catalog

| Editor | Description |
|---|---|
| **Calendar** | Date selection widget |
| **CheckBox** | Boolean toggle |
| **Color Palette** | Color picker |
| **ComboBox** | Dropdown with search |
| **Date Edit** | Date input with picker |
| **Date Range Picker** | Start/end date selection |
| **Drop-Down Box** | Custom content dropdown |
| **List Box** | Selectable item list |
| **Masked Input** | Input with format mask |
| **Memo** | Multi-line text area (with AI smart autocomplete in v25.2) |
| **Radio** | Single radio button |
| **Radio Group** | Grouped radio buttons |
| **Search Box** | Search with autocomplete |
| **Spin Edit** | Numeric with up/down buttons |
| **TagBox** | Multi-select with tags |
| **Text Box** | Single-line text input |
| **TimeEdit** | Time input with picker |

Demo: [Data Editors Overview](https://demos.devexpress.com/blazor/Editors)

## Common Concepts

| Concept             | Description                                              |
| ------------------- | -------------------------------------------------------- |
| **Masks**           | Input format enforcement (numeric, date, text patterns)  |
| **Command Buttons** | Custom buttons within editor borders                     |
| **Validate Input**  | Standard Blazor validation + custom validators           |
| **HTML Attributes** | Pass-through to underlying HTML elements                 |
| **Localization**    | Satellite assemblies: German, Spanish, Japanese + custom |

## AI Integration (v25.2)

`DxMemo` supports AI-powered smart autocomplete via `Microsoft.Extensions.AI` / `IChatClient`. See [[DevExpress Blazor AI Extensions]] for setup.

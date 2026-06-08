---
type: entity
title: "DevExpress Blazor"
created: 2026-05-25
updated: 2026-05-25
address: c-000032
status: developing
tags:
  - blazor
  - devexpress
  - ui-components
  - commercial
  - navigation
entity_type: product
related:
  - "[[DevExpress Blazor DxToolbar]]"
  - "[[FluentUI Blazor]]"
  - "[[Fluent 2 Design System]]"
---

# DevExpress Blazor

DevExpress Blazor is a commercial UI component suite for Blazor applications (Server, WebAssembly, and Hybrid). It provides 40+ native Blazor components including data grids, charts, navigation controls, schedulers, and editors.

Website: <https://www.devexpress.com/blazor/>
Documentation: <https://docs.devexpress.com/Blazor/>
Demos: <https://demos.devexpress.com/Blazor/>

## Key Characteristics

- **Commercial license**: proprietary, paid licenses required
- **Version**: v25.2 (current); v24.2 also documented
- **Component count**: 65+ native Blazor components (see [[DevExpress Blazor Component Catalog]])
- **Assembly**: `DevExpress.Blazor.v24.2.dll`

## Components

### Navigation
- [[DevExpress Blazor DxToolbar]] — horizontal command bar with adaptivity, data binding, dropdown support

### Data Display
- [[DevExpress Blazor DxGrid]] — full-featured data grid (5 bind modes, 5 filter modes, 5 edit modes, export, virtual scroll)
- [[DevExpress Blazor DxTreeList]] — hierarchical grid+tree hybrid (load-on-demand, drag-and-drop hierarchy)

### Filtering
- [[DevExpress Blazor DxFilterBuilder]] — standalone filter builder, CriteriaOperator two-way binding

### Data Editors
- [[DevExpress Blazor Data Editors]] — 17 editor components, standalone or in-grid

## AI-Powered Extensions (v25.2)

- [[DevExpress Blazor AI Extensions]] — provider-agnostic AI integration via `Microsoft.Extensions.AI` / `IChatClient`; supports OpenAI, Azure OpenAI, Ollama, Foundry Local, ONNX Runtime, Semantic Kernel (Gemini, Claude, DeepSeek, etc.); BYOK model
- AI-powered components: DxAIChat, HTML Editor, Rich Text Editor, DxMemo (smart autocomplete), Report Viewer/Designer
- DevExpress Template Kit can scaffold AI-ready projects with provider selection

## Comparison with FluentUI Blazor

| Aspect | DevExpress Blazor | FluentUI Blazor |
|---|---|---|
| License | Commercial | MIT (open source) |
| Design system | DevExpress themes | Microsoft Fluent 2 |
| Component count | 40+ | 50+ |
| Data grid | Advanced (sort, filter, group, edit) | Basic DataGrid |
| Charts | 20+ chart types | Not included |
| Adaptivity | Built-in responsive components | CSS/container queries |
| Localization | Satellite assemblies (de, es, ja) + custom | ASP.NET Core localization |
| Support | Commercial support + docs | Community + Microsoft docs |

---
type: source
title: "Elsa Workflows Documentation"
source_type: documentation
created: 2026-05-25
updated: 2026-05-25
tags:
  - source
  - elsa
  - workflow
  - dotnet
status: current
address: c-000053
related:
  - "[[Elsa Workflows]]"
  - "[[sources/_index]]"
---

# Elsa Workflows Documentation

Full documentation set for Elsa Workflows 3, ingested from the official GitBook-based documentation. ~150 source files covering architecture, guides, activities, expressions, extensibility, operations, and studio.

## Source Structure

| Section | Files | Description |
|---------|-------|-------------|
| Getting Started | 11 | Concepts, architecture, hello world, prerequisites, packages, database, containers |
| Application Types | 3 | Elsa Server, Elsa Studio, Server+Studio WASM |
| Guides - Core | ~20 | Architecture, onboarding, auth, security, deployment, clustering, migration |
| Guides - Data | ~20 | Persistence (EF/SQL/Mongo/Dapper), API client, HTTP workflows |
| Guides - Operations | ~20 | Running workflows, studio, patterns, troubleshooting, testing, performance |
| Guides - Integration | ~15 | Plugins/modules, extensibility, external apps, Blazor dashboard, loading JSON |
| Activities | 10 | Common properties, blocking/triggers, control flow, parallel, MassTransit, diagnostics |
| Expressions | 4 | C#, JavaScript, Python, Liquid |
| Extensibility | 2 | Custom activities, reusable triggers |
| Multitenancy | 2 | Introduction, setup |
| Operate | 5 | Variables, activation strategies, incidents (strategies + config) |
| Optimize | 3 | Log persistence, retention, workers |
| Studio | 8 | Tour, design, workflow editor, UI hints, content visualisers, field extensions, localization |
| Features | 5 | Alterations (plans + applying), logging framework |
| Auth | 1 | Authentication configuration |
| Hosting | 1 | Distributed hosting |
| Meta | 10 | Backlog, core concepts, coverage, doc signals, gap matrix, personas, IA diff, sitemap |
| Root | 3 | README, CONTRIBUTING, SUMMARY |

## Ingestion Notes

- This is a batch ingestion of the complete Elsa v3 documentation set
- Each major section gets its own concept/domain index pages
- Code examples are preserved in reference pages
- Known limitations documented in the entity page

---
title: AI Skills
order: 0005.11
category: 10|Get Started
route: /Mcp/AISkills
icon: BrainCircuit
---

# AI Skills for Consumers

**AI Skills** (also known as **Agent Skills**) are a set of structured documentation files that you include in your own project
to help AI coding assistants (like GitHub Copilot) generate **accurate, idiomatic code** when working with Fluent UI Blazor.

## What are AI Skills?

AI Skills follow the open [Agent Skills specification](https://agentskills.io). They consist of:
- A **SKILL.md** file with YAML frontmatter describing the skill
- A **references/** folder with detailed documentation on specific topics

When placed in your project's `.github/skills/` directory, AI assistants automatically discover and use them
to provide better code suggestions, avoid common pitfalls, and follow v5 best practices.

## Why use them?

AI assistants often mix up **v4** and **v5** patterns, leading to errors like:
- Using `FluentNavMenu` instead of `FluentNav`
- Using `IToastService` (removed in v5)
- Using `FluentDesignTheme` (replaced by CSS custom properties)
- Using `SelectedOptions` instead of `SelectedItems` on list components
- Using single type parameter `FluentSelect<string>` instead of `FluentSelect<TOption, TValue>`

The AI Skill files contain all the correct v5 patterns, migration notes, and code examples
so that your AI assistant produces working code on the first try.

## What's included?

The **fluentui-blazor-usage** skill contains:

| File | Description |
|---|---|
| `SKILL.md` | Main skill file with setup, component patterns, v4→v5 migration table, and common pitfalls |
| `references/SETUP.md` | Detailed setup guide for Blazor Server, WebAssembly, and Auto modes |
| `references/DATAGRID.md` | Advanced data grid patterns: pagination, virtualization, EF adapter, templates |
| `references/THEMING.md` | Theming guide with CSS custom properties, design tokens, and C# style constants |

## How to install

1. **Download** the skill files using the buttons below
2. Place them in your project under `.github/skills/fluentui-blazor-usage/`
3. Your AI assistant will automatically pick them up

### Expected folder structure

```
your-project/
├── .github/
│   └── skills/
│       └── fluentui-blazor-usage/
│           ├── SKILL.md
│           └── references/
│               ├── SETUP.md
│               ├── DATAGRID.md
│               └── THEMING.md
├── src/
│   └── ...
```

## Download Skill Files

{{ AISkillsDownload }}

## Supported AI Assistants

These skill files are supported by:
- **GitHub Copilot** (VS Code Agent Mode, Visual Studio, CLI, Copilot Coding Agent)
- **Claude Code** (via `.github/skills/` or `.claude/skills/`)
- Any AI assistant that supports the [Agent Skills specification](https://agentskills.io)

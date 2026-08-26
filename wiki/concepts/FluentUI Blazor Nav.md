---
title: FluentUI Blazor Nav
address: c-000132
status: developing
---

# FluentUI Blazor Nav

> Part of the **[[FluentUI Blazor]]** component library. A hierarchical navigation component for moving through the main sections of an app.

## Overview

`FluentNav` provides a list of links for app/site navigation. It can be minimized to free up space and supports one level of nesting (categories with sub-items).

### Components

- **`FluentNav`** -- The container component. Manages overall state, density, and expansion behavior.
- **`FluentNavItem`** -- A single navigation link. Can have an `Href` for routing or an `OnClick` handler.
- **`FluentNavCategory`** -- An accordion-style grouping that expands/collapses to reveal sub-items. Categories are not links.
- **`FluentNavSectionHeader`** -- A section label for grouping nav items.
- **`FluentDivider`** -- Separates groups of nav items (auto-styled inside `FluentNav`).

## Basic structure

```razor
<FluentNav Width="260px" Density="@NavDensity.Medium"
           OnItemClick="@(e => Console.WriteLine($"Clicked: {e.IconRest?.Name}"))">

    <!-- Single nav items -->
    <FluentNavItem Href="/dashboard" IconRest="@(new Icons.Regular.Size20.Board())">
        Dashboard
    </FluentNavItem>
    <FluentNavItem OnClick="@ShowInformationAsync"
                   IconRest="@(new Icons.Regular.Size20.MegaphoneLoud())">
        Announcements
    </FluentNavItem>
    <FluentNavItem Disabled="true" Href="/spotlight">
        Employee Spotlight
    </FluentNavItem>

    <!-- Section header -->
    <FluentNavSectionHeader Title="Employee Management" />

    <!-- Category with sub-items -->
    <FluentNavCategory Title="Job Postings" IconRest="@(new Icons.Regular.Size20.NotePin())">
        <FluentNavItem OnClick="@ShowInformationAsync">Openings</FluentNavItem>
        <FluentNavItem OnClick="@ShowInformationAsync">Submissions</FluentNavItem>
    </FluentNavCategory>

    <!-- Divider -->
    <FluentDivider />

    <FluentNavItem Href="/training">
        Training Programs
    </FluentNavItem>
</FluentNav>

@code {
    async Task ShowInformationAsync() { /* ... */ }
}
```

## Categories and accordion behavior

Nav categories expand and collapse like accordions. They are not navigable links -- they only show/hide their child nav items.

Use `UseSingleExpanded` to ensure only one category is expanded at a time:

```razor
<FluentNav UseSingleExpanded="true">
    <!-- Only one category can be open at a time -->
</FluentNav>
```

## Icons

Icons create visual emphasis and help differentiate nav categories from sub-items. Each `FluentNavItem` and `FluentNavCategory` supports:

- `IconRest` -- the icon displayed when the item is not active.
- `IconActive` -- the icon displayed when the item is active (filled variants recommended).

When a `FluentNavItem` is inside a `FluentNavCategory`, its `Icon` is ignored (no icon displayed for sub-items).

## Programmatic expand/collapse

```razor
<FluentNav @ref="@nav">
    <FluentNavCategory Id="retirement" Title="Retirement">
        <FluentNavItem>Plan Information</FluentNavItem>
        <FluentNavItem>Fund Performance</FluentNavItem>
    </FluentNavCategory>
</FluentNav>

@code {
    FluentNav nav = default!;

    async Task ExpandRetirementAsync()
    {
        await nav.ExpandCategoryAsync("retirement");
    }

    async Task CollapseRetirementAsync()
    {
        await nav.CollapseCategoryAsync("retirement");
    }
}
```

## Density

The nav supports two density modes via `NavDensity`:

- `NavDensity.Medium` -- default spacing.
- `NavDensity.Small` -- compact spacing.

```razor
<FluentNav Density="@NavDensity.Small">
    <!-- compact navigation -->
</FluentNav>
```

## Accessibility

- Arrow Up/Down, Home, End keys navigate through items.
- Enter/Space expands or collapses categories.
- Uses roving tabindex: only the focused item is in the tab order; tabbing away and back returns focus to the same item.

## Limitations

- Only one level of nesting is supported (categories with sub-items, no deeper).
- `NavItem` inside a `NavCategory` ignores its `Icon` parameter.
- No icon-only layout mode.

## Migration notes (v4 to v5)

There is no direct migration path from `FluentNavMenu` (v4) to `FluentNav` (v5). The v4 component supported multiple levels of nesting; v5 supports only one level.

## API types

| Component | API Type |
|-----------|----------|
| `FluentNav` | `FluentNav` |
| `FluentNavCategory` | `FluentNavCategory` |
| `FluentNavItem` | `FluentNavItem` |
| `FluentNavSectionHeader` | `FluentNavSectionHeader` |

## Related

- [[FluentUI Blazor Menu]]
- [[FluentUI Blazor AppBar]]

---
type: concept
title: "FluentUI Blazor Styles and Spacing"
address: c-000143
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - css
  - spacing
  - default-values
  - reboot
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Styles]]"
  - "[[FluentUI Blazor Theming]]"
  - "[[Fluent 2 Design System]]"
---

# FluentUI Blazor Styles and Spacing

This page covers the FluentUI Blazor **spacing system**, **default values** configuration, and a summary of the built-in styles. For the full design token reference and CSS variable catalog, see [[FluentUI Blazor Styles]].

## Spacing System

FluentUI Blazor includes a comprehensive shorthand responsive margin and padding utility system. Spacing allows modifying CSS `padding` or `margin` styles without creating new classes.

### How it works

Use the `Margin` or `Padding` **property** and choose a **direction**, then add a **size** ranging from 0 to 8.

The classes are named using the format `{property}{direction}-{size}` for xs and `{property}{direction}-{breakpoint}-{size}` for sm, md, lg, and xl.

### Properties

- `m` for classes that set `Margin`
- `p` for classes that set `Padding`

### Directions

| Direction | CSS Property |
|-----------|-------------|
| `t` | `margin-top` or `padding-top` |
| `b` | `margin-bottom` or `padding-bottom` |
| `l` | `margin-left` or `padding-left` |
| `r` | `margin-right` or `padding-right` |
| `s` | `margin-left`/`padding-left` (LTR); `margin-right`/`padding-right` (RTL) |
| `e` | `margin-right`/`padding-right` (LTR); `margin-left`/`padding-left` (RTL) |
| `x` | left and right |
| `y` | top and bottom |
| `a` | all 4 sides |

### Size Scale

The size interval is **4 pixels** by default:

| Size | Value |
|------|-------|
| 0 | 0 |
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 7 | 28px |
| 8 | 32px |

Negative values (n1 through n8) provide -4px through -32px.

### CSS Example

```css
/* margin-top: 0; */
.mt-0 {
  margin-top: var(--spacingVerticalNone) !important;
}

/* margin-left: 4px; */
.ml-1 {
  margin-left: var(--spacingHorizontalXS) !important;
}

/* margin-right: 8px; margin-left: 8px; */
.px-2 {
  padding-right: var(--spacingHorizontalS) !important;
  padding-left:  var(--spacingHorizontalS) !important;
}

/* padding: 12px 12px; */
.pa-3 {
  padding: var(--spacingVerticalM) var(--spacingHorizontalM) !important;
}
```

### Component Margin and Padding Parameters

All Fluent UI Blazor components implement `Margin` and `Padding` parameters. You can specify a CSS value respecting the CSS padding or margin pattern, or a class name:

```html
<FluentButton Margin="10px" />                     => <fluent-button style="margin: 10px;" />
<FluentButton Margin="10px 20px" />                => <fluent-button style="margin: 10px 20px;" />
<FluentButton Margin="auto" />                     => <fluent-button style="margin: auto;" />
<FluentButton Padding="10% 0;" />                  => <fluent-button style="padding: 10% 0;" />

<FluentButton Margin="mt-0" />                     => <fluent-button class="mt-0" />
<FluentButton Margin="mt-0" Padding="pa-3" />      => <fluent-button class="mt-0 pa-3" />
```

> [!NOTE] The `Margin` and `Padding` parameters accept either a CSS **value** (e.g., `10px`) or a CSS **class name** (e.g., `mt-0`). If you use these parameters to include a complete style declaration (e.g., `margin: 10px;`), this style will be ignored. For full inline styles, use the `Style` parameter instead.

### Helper Constants (C#)

To make spacing more explicit with IntelliSense support, use the C# constants:

```csharp
<FluentButton Margin="@Margin.Top0" />                              // CSS `mt-0` (Top: 0px).
<FluentButton Padding="@Padding.All3" />                            // CSS `pa-3` (All: 12px).

<FluentButton Margin="@(Margin.Top0 + Margin.Bottom3_ForLarge)" />  // CSS `mt-0` (Top: 0px)
                                                                     // CSS `mb-lg-3` (Bottom: 12px) where `min-width: 1280px`.
```

### Interactive Demo Example

```razor
<div style="display: flex; gap: 12px; margin-bottom: 12px;">
    <FluentTextInput Label="Margin" Placeholder="Margin" @bind-Value="@Margin" Immediate />
    <FluentTextInput Label="Padding" Placeholder="Padding" @bind-Value="@Padding" Immediate />
</div>

<div style="border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);">
    <FluentButton id="SampleButton" Margin="@Margin" Padding="@Padding"
                  Appearance="ButtonAppearance.Primary">Button</FluentButton>
</div>

@code
{
    string Margin = "ma-8";
    string Padding = "24px 36px";
}
```

### CSS Variables for Spacing

```css
--spacingVerticalNone:    0;
--spacingVerticalXS:      4px;
--spacingVerticalS:       8px;
--spacingVerticalM:       12px;
--spacingVerticalL:       16px;
--spacingVerticalXL:      20px;
--spacingVerticalXXL:     24px;
--spacingVerticalXXXL:    28px;
--spacingVerticalXXXXL:   32px;

--spacingHorizontalNone:  0;
--spacingHorizontalXS:    4px;
--spacingHorizontalS:     8px;
--spacingHorizontalM:     12px;
--spacingHorizontalL:     16px;
--spacingHorizontalXL:    20px;
--spacingHorizontalXXL:   24px;
--spacingHorizontalXXXL:  28px;
--spacingHorizontalXXXXL: 32px;
```

### Bootstrap Compatibility

When using Bootstrap or MudBlazor in the same project, you may encounter class name conflicts for margin/padding utilities. Control which library takes precedence by managing stylesheet load order:

```html
<!-- Bootstrap overrides FluentUI -->
<link rel="stylesheet" href="FluentUI.Demo.styles.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" />

<!-- FluentUI overrides Bootstrap -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="FluentUI.Demo.styles.css" />
```

## Default Styles (Summary)

The FluentUI Blazor library ships with default styles based on the Fluent Design System. For the full reference, see [[FluentUI Blazor Styles]].

### Layers

| Layer | File | Default | Purpose |
|-------|------|---------|---------|
| Default | `default-fuib.css` | Auto-applied | Cross-browser tag normalization |
| Reboot | `reboot.css` | Opt-in | Opinionated element resets |

### Opting Out

```html
<!-- Skip default normalizations entirely -->
<body no-fuib-style>

<!-- Add Bootstrap-style resets -->
<body use-reboot>
```

## Default Values (Global Component Configuration)

FluentUI Blazor allows setting global default values for components. This avoids specifying parameters on every component instance.

### Configuring Defaults

In `Program.cs`, configure defaults when registering FluentUI services:

```csharp
// Add FluentUI services
builder.Services.AddFluentUIComponents(config =>
{
    // Set default values for FluentButton component
    config.DefaultValues.For<FluentButton>().Set(p => p.Appearance, ButtonAppearance.Primary);
    config.DefaultValues.For<FluentButton>().Set(p => p.Shape, ButtonShape.Circular);

    // Set default values for a generic component, like FluentAutocomplete
    config.DefaultValues.ForAny<FluentAutocomplete<object, object>>().Set(p => p.Width, "100%");
});
```

### For vs ForAny

| Method | Behavior |
|--------|----------|
| `For<TComponent>()` | Targets a specific closed generic type |
| `ForAny<TComponent>()` | Applies defaults to **all instances** of a generic component regardless of type parameters |

This allows fine-grained control: you can set different defaults for `FluentSelect<string, string>` vs `FluentSelect<int, int>` using `For`, or set a blanket default for all `FluentAutocomplete` variants using `ForAny`.

## Source

[[FluentUI Blazor]] v5 documentation -- Styles, Spacing, and DefaultValues sections

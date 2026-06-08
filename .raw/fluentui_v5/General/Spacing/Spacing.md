---
title: Spacing
order: 0004
category: 20|General
route: /Spacing
icon: Spacebar
---

# Spacing

We include a wide range of shorthand responsive margin and padding utility
classes to modify an element’s appearance.

**Spacing** is a way to modify the CSS `padding` or `margin` styles without creating new classes.

## How it works

Use the `Margin` or `Padding` **property** and choose a **direction**.
Then add **size**, ranging from 0 to 8.

Spacing utilities that apply to all breakpoints, from `xs` to `xl`,
have no breakpoint abbreviation in them.
The classes are named using the format `{property}{direction}-{size}`
for `xs` and `{property}{direction}-{breakpoint}-{size}` for `sm`, `md`, `lg`, and `xl`.

The **properties**:

- `m` for classes that set `Margin`.
- `p` for classes that set `padding`.

The **direction** property applies to:

- `t` for `margin-top` or `padding-top`.
- `b` for `margin-bottom` or padding-bottom`.
- `l` for `margin-left` or padding-left`.
- `r` for `margin-right` or padding-right`.
- `s` for `margin-left`/`padding-left` (in LTR mode) and `margin-right`/`padding-right` (in RTL mode).
- `e` for `margin-right`/`padding-right` (in LTR mode) and `margin-left`/`padding-left` (in RTL mode).
- `x` for `margin-left`/`padding-left` and `margin-right`/`padding-right`.
- `y` for `margin-top`/`padding-top` and `margin-bottom`/`padding-bottom`.
- `a` for all 4 sides.

## Size

The size changes with an interval of, by default, **4 pixels** (see the CSS variables below).

**Positive**

- `0` sets `margin` or `padding` to `0`
- `1` sets `margin` or `padding` to `4px`
- `2` sets `margin` or `padding` to `8px`
- `3` sets `margin` or `padding` to `12px`
- `4` sets `margin` or `padding` to `16px`
- `5` sets `margin` or `padding` to `20px`
- `6` sets `margin` or `padding` to `24px`
- `7` sets `margin` or `padding` to `28px`
- `8` sets `margin` or `padding` to `32px`

**Negative**

- `n1` sets `margin` or `padding` to `-4px`
- `n2` sets `margin` or `padding` to `-8px`
- `n3` sets `margin` or `padding` to `-12px`
- `n4` sets `margin` or `padding` to `-16px`
- `n5` sets `margin` or `padding` to `-20px`
- `n6` sets `margin` or `padding` to `-24px`
- `n7` sets `margin` or `padding` to `-28px`
- `n8` sets `margin` or `padding` to `-32px`

## Example

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

## `Margin` and `Padding` component attributes

All **Fluent UI Blazor components** impleent the `Margin` and `Padding` parameters.

You can specify a **CSS value** respecting the CSS [padding](https://developer.mozilla.org/docs/Web/CSS/padding)
or CSS [margin](https://developer.mozilla.org/docs/Web/CSS/margin) pattern.
Or you can use a **class name** like shown earlier on this page.

> The contents of these **Margin** and **Padding** parameters can contain either the **value** of
> these margins or paddings (e.g. `10px`), or the name of a CSS class (e.g. `mt-0`).
> If you use one of these parameters to include a complete style (e.g. `margin: 10px;` or `border: 1px`)
> then this style will be ignored.
> If you wish to do this, you must use the `Style` parameter.

Example:

```html
<FluentButton Margin="10px" />                     => <fluent-button style="margin: 10px;" />
<FluentButton Margin="10px 20px" />                => <fluent-button style="margin: 10px 20px;" />
<FluentButton Margin="auto" />                     => <fluent-button style="margin: auto;" />
<FluentButton Padding="10% 0;" />                  => <fluent-button style="padding: 10% 0;" />

<FluentButton Margin="mt-0" />                     => <fluent-button class="mt-0" />
<FluentButton Margin="mt-0" Padding="pa-3" />      => <fluent-button class="mt-0 pa-3" />
```

## `Margin` and `Padding` Helper constants

To help developers use these CSS classes, we've created **C# constants**
that are more **explicit** and use **IntelliSense** completion.

```csharp
<FluentButton Margin="@Margin.Top0" />                              // CSS `mt-0` (Top: 0px).
<FluentButton Padding="@Padding.All3" />                            // CSS `pa-3` (All: 12px).

<FluentButton Margin="@(Margin.Top0 + Margin.Bottom3_ForLarge)" />  // CSS `mt-0` (Top: 0px)
                                                                    // CSS `mb-lg-3` (Bottom: 12px) where `min-width: 1280px`.
```

## Demo

{{ SpacingDefault }}

## Appendix - CSS variables

**Spacing** uses these CSS variables for the default values.
These values can be customized or overridden in your own CSS files.

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

## Appendix - Bootstrap

When using **Bootstrap** or **MudBlazor** (and potentially other libraries) in your project,
you will notice that in some cases we use the same class names (for consistency and ease of use).
If this is the case, you need to choose whether you want to use our classes or those from the other library for margins and paddings.
You do this by setting the loading order of the **Styles** files in your main page:

For a project named **FluentUI.Demo**, in this example the Boostrap stylesheet is loaded after the FluentUI stylesheet.
So, the **Bootstrap** classes override the **Fluent UI Blazor** classes.
**Bootstrap** will therefore be used for margins and paddings.

```html
<link rel="stylesheet" href="FluentUI.Demo.styles.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" />
```

In this second example, the **Fluent UI Blazor** classes override those from **Boostrap**.
The **Fluent UI Blazor** values will therefore be used for margins and paddings.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" />
<link rel="stylesheet" href="FluentUI.Demo.styles.css" />
```

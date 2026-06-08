---
title: Pinned columns
route: /DataGrid/PinnedColumns
---

# Pinned columns

Columns can be pinned (frozen) to the start or end edge of the grid so that they remain visible
while the user scrolls horizontally through wider datasets. Using `Start`/`End` instead of
`Left`/`Right` means pinned columns automatically work correctly in both LTR and RTL layouts.

## Parameters

Set the `Pin` parameter on any `PropertyColumn` or `TemplateColumn`:

| Value | Behavior |
|---|---|
| `DataGridColumnPin.None` | Default — column scrolls normally |
| `DataGridColumnPin.Start` | Column stays anchored to the start edge |
| `DataGridColumnPin.End` | Column stays anchored to the end edge |

## Rules

* **Explicit width required.** Every pinned column must declare a `Width`.
  Pixel and non-pixel CSS units are supported. After the grid renders, sticky offsets are
  recomputed from the rendered header widths so pinned columns stay aligned.
* **Start-pinned columns must be contiguous at the start.** Each start-pinned column must
  immediately follow another start-pinned column, or be the very first column.
* **End-pinned columns must be contiguous at the end.** Each end-pinned column must
  immediately precede another end-pinned column, or be the very last column.
* Violating the missing-width or ordering rules throws an `ArgumentException` with a descriptive message.

## Scrollable container

Sticky positioning only activates inside a scrollable ancestor. Wrap the grid in a container with
`overflow-x: auto` and give the grid `Style="min-width: max-content;"` so that a horizontal scroll
bar appears when columns overflow the container:

```razor
<div style="overflow-x: auto;">
    <FluentDataGrid Items="@employees" Style="min-width: max-content;">
        <PropertyColumn Title="ID"       Property="@(e => e.Id)"     Width="60px"  Pin="DataGridColumnPin.Start" />
        <PropertyColumn Title="Name"     Property="@(e => e.Name)"   Width="160px" Pin="DataGridColumnPin.Start" />
        <PropertyColumn Title="City"     Property="@(e => e.City)" />
        <TemplateColumn Title="Actions"  Width="120px" Pin="DataGridColumnPin.End">
            ...
        </TemplateColumn>
    </FluentDataGrid>
</div>
```

## Theming the pinned background

Pinned cells receive a solid background to prevent scrolling content from showing through. The
color defaults to `--colorNeutralBackground2` and can be overridden per-grid with the CSS custom
property `--fluent-data-grid-pinned-background`:

```css
.my-grid {
    --fluent-data-grid-pinned-background: var(--colorNeutralBackground2);
}
```

## Notes

* Column resizing keeps pinned columns aligned as widths change.
* Virtualization and paging are fully compatible because each rendered row's cells carry the
  same `position: sticky` styling regardless of which page or scroll position is active.
* RTL layouts are fully supported: start and end automatically map to the correct physical
  direction based on the document's writing mode.

## Example

Demonstrates pinned (frozen) columns using `Pin="DataGridColumnPin.Start"` and `Pin="DataGridColumnPin.End"`.

The two leftmost columns and the Actions column remain visible while the rest scroll horizontally. The grid is
wrapped in a scrollable container to enable sticky positioning and horizontal scrolling when needed. Resize the window
or the columns in the grid to see the effect.

**Pinned columns require an explicit `Width`**.

{{ DataGridPinnedColumns }}

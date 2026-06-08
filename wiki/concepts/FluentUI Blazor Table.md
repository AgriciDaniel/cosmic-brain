---
title: FluentUI Blazor Table
address: c-000145
status: developing
---

# FluentUI Blazor HTML Table

> Part of the [[FluentUI Blazor]] component library. The default HTML `<table>` element with Fluent Design CSS styling and selectable row support.

## Overview

FluentUI Blazor applies default CSS styles to standard HTML `<table>` elements and adds `data-selectable` and `data-selected` HTML attributes for selection UI without JavaScript.

> These styles come from `default-fuib.css`, included by default. Disable by setting `no-fuib-style` on the `<body>` element.

## Default Table

```razor
<table>
    <thead>
        <tr>
            <th>Code</th>
            <th>Country</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>BE</td>
            <td>Belgium</td>
        </tr>
        <tr>
            <td>FR</td>
            <td>France</td>
        </tr>
        <tr>
            <td>NL</td>
            <td>Netherland</td>
        </tr>
    </tbody>
</table>
```

## Selectable Rows

Use the `data-selectable` attribute to enable row selection styling. Only CSS styles are applied -- you handle selection logic via `@onclick`:

```razor
<table data-selectable>
    <thead>
        <tr>
            <th>Code</th>
            <th>Country</th>
        </tr>
    </thead>
    <tbody>
        <tr @onclick="@(e => DataRowSelected[0] = !DataRowSelected[0])"
            data-selected="@DataRowSelected[0]">
            <td>BE</td>
            <td>Belgium</td>
        </tr>
        <tr @onclick="@(e => DataRowSelected[1] = !DataRowSelected[1])"
            data-selected="@DataRowSelected[1]">
            <td>FR</td>
            <td>France</td>
        </tr>
    </tbody>
</table>

@code {
    bool[] DataRowSelected = new bool[2];
}
```

### Customize Selection Check

```css
table {
    --selectedCheckWidth: 28px;
    --selectedCheckContent: '✔';
}
```

### No Checkbox Mode

Set `data-selectable="no-check"` to apply selection styles without showing a checkbox:

```razor
<table data-selectable="no-check">
    <tr @onclick="@(e => selected = !selected)" data-selected="@selected">
        <td>Selectable without checkbox</td>
    </tr>
</table>
```

## API

There is no custom `FluentTable` component -- this is a styled HTML `<table>` element. The styling is applied automatically when `default-fuib.css` is loaded.

| Attribute | Description |
|---|---|
| `data-selectable` | Enables row selection styling (adds checkbox by default) |
| `data-selectable="no-check"` | Enables selection styling without checkbox |
| `data-selected` | Marks a row or cell as selected |

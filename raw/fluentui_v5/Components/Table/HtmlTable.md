---
title: Table
route: /Table
icon: Table
---

# Table

The default **HTML table** element allows you to display simple tabular data in a structured format.

Some CSS styles are applied by default.  
You can also use the `data-selectable` HTML attribute to add extra styles for UI selection.

> These CSS styles come from the `default-fuib.css` style, which is included by default in the library.  
> You can disable this style by setting the attribute `no-fuib-style` on the `body` element, in your source code.

## Default

The default HTML table is a simple way to display tabular data.

{{ HtmlTableDefault }}

## Selectable

The `data-selectable` attribute is used to make the table rows selectable.  

> [!WARNING] Only CSS styles are applied, no JavaScript is involved.  
> You need to handle the selection logic yourself, for example by using the `@onclick` event.

The `data-selected` attribute is used to indicate which rows `<tr>` (or cells `<td>`) are selected.

{{ HtmlTableSelectable }}

> [!NOTE] You can customize the styles of the selected checkbox by using CSS variables.
>
> `style="--selectedCheckWidth: 28px; --selectedCheckContent: '✔';`

## No checkbox

By default, the `data-selectable` attribute adds a checkbox to each selected row.  
You can disable this by setting the `data-selectable="no-check"` attribute.

{{ HtmlTableNoCheckbox }}

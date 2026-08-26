---
title: Typical usage
order: 0011
route: /DataGrid/Typical
---

# Typical usage

Here is an example of a data grid that uses in-memory data and enables features including pagination, sorting, filtering, column options, row highlighting and column resizing.

All columns, except 'Bronze', have a `Tooltip` parameter value of `true`.<br />
When using this for a `TemplateColumn` (like 'Rank' here), you need to also supply a value for the `TooltipText` parameter. <b>No value given equals no tooltip shown</b>.<br />
When using this for a `PropertyColumn`, a value for the `TooltipText` is <b>not</b> required. By default, the value given for `Property`
will be re-used for the tooltip. If you do supply a value for `TooltipText` its outcome will be used instead.

`TooltipText` is a lambda function that takes the current item as input and returns the text to show in the tooltip (and `aria-label`).
Look at the Razor tab to see how this is done and how it can be customized.

The 'Name of country'-column exposes a filter option which can be used to quickly filter the list of countries shown. Pressing the ESC key just closes the option popup without changing the filtering currently being used.
Pressing enter finishes the filter action by the current input to filter on and closes the option popup.

The Total-column exposes a customized filter with which only countries that fall within the set total of minimum and maximun number of medals will be shown. See the razor tab for the implementation.

The resize options UI is using a customized string for the label ('Width (+/- 10px)' instead of the normal 'Column width').
This is done through the custom localizer which is registered in the Server project's Program.cs file.

{{ DataGridTypical Files=Code:DataGridTypical.razor;CSS:DataGridTypical.razor.css }}

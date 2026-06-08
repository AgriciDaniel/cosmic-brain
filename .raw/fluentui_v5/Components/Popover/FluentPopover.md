---
title: Popover
route: /Popover
icon: TooltipQuote
---

# Popover

The **FluentPopover** component is used to displays content on top of other content.

The **FluentPopover** is displayed below the target element by default, except when there is not enough space below the target element,
in which case it will be displayed above the target element.
Similarly, if there is insufficient space on the right, the **FluentPopover** will be displayed to the left of the target.

To display the **FluentPopover** component, you need to set the `Open` parameter to `true`.
This parameter is bindable, so you can control the visibility of the **FluentPopover** from your code.

```razor
<FluentButton Id="MyButton" OnClick="@(e => IsOpened = !IsOpened)">Click</FluentButton>

<FluentPopover AnchorId="MyButton" @bind-Opened="@IsOpened">
    Content of the Popover
</FluentPopover>

@code
{
    bool IsOpened = false;
}
```

You can add extra spaces between the **FluentPopover** and the **Anchor** component using the `OffsetVertical` and `OffsetHorizontal` parameters.

Pressing the `Escape` key will close the **FluentPopover** if it is open.

## Example

{{ FluentPopoverDefault }}

## Nested

You can nest popovers inside each other. This is useful for creating complex UI interactions.
But keep in mind that nesting popovers can lead to a confusing user experience if not done carefully.
 - Don't use more than 2 levels of nested Popovers.
 - Don't use Popovers to display too much content, consider if that content should be on the main page.

{{ FluentPopoverNested }}

## Limitations

⚠️ The **FluentPopover** component does not yet support the `RTL` (Right-To-Left) layout.

## API FluentDivider

{{ API Type=FluentPopover }}

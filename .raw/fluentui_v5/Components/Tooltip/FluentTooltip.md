---
title: Tooltip
route: /Tooltip
icon: TooltipQuote
---

# Tooltip

A `FluentTooltip` displays additional information about another component.
The information is displayed near the target component by using `Positioning` it can also be placed **Above**, **Below**, etc.

**Tooltip** is not expected to handle interactive content. If this is necessary behavior, an expand/collapse button + popover should be used instead.

Hover or focus the buttons in the examples to see their tooltips.

## Default

{{ TooltipDefault }}

## Tooltip parameter

To simplify the use of the tooltip, you can set the `Tooltip` parameter on any component that supports it.

{{ TooltipParameter }}

The components which support the `Tooltip` parameter are: 

{{ TooltipParameterListOfComponents  SourceCode=false }}

## Customized
The tooltip can be customized with a custom template,
adapting the delay to `700 ms`, the position of the tooltip to `BelowStart` (including spacings to `20px` and `10px`)
and the style "Inverted".

Each time the tooltip is shown or hidden, a message is logged in the console. Click on the top/right button to open the **Console**.

{{ TooltipCustomized }}

## Using Tooltip Service Provider

We advise you to always use this service when working with tooltips so all definitions will be generated with global options
and will be written **at the end** of the HTML page to support different z-index levels.

In the `Program.cs`, inject the Tooltip service with global options.
For more convenience, you should use the `Services.AddFluentUIComponents()` method to register all required Fluent UI services (including this one).

```csharp
builder.Services.AddScoped<ITooltipService, TooltipService>();
```

At the end of your MainLayout.razor page, include the provider:

```xml
<FluentTooltipProvider />
```

For the `<FluentTooltipProvider />` to work properly, it needs interactivity!
If you are using "per page" interactivity, make sure to add a `@rendermode` to either the provider itself or the component the provider is placed in.

In some use cases, you may want to render a tooltip without the provider. For example when the child content is dynamic.
This is possible setting the `UseTooltipService` parameter to `false` in the component.
You can also configure it globally in the `Program.cs` file:
```csharp
builder.Services.AddFluentUIComponents(options =>
{
    options.Tooltip.UseServiceProvider = false;
});
```

## API FluentTooltip

{{ API Type=FluentTooltip }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentTooltip }}

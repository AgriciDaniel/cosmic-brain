---
title: Default Values
order: 0001
category: 20|General
route: /default-values
icon: BoxCheckmark
---

# Default Values

**Default values** are used to set the initial state of components when they are rendered.

It is possible to set default values for **components** globally, so that you don't have to specify them every time you use a component.
For example, you can set the default appearance of a button to `Primary` and its shape to `Circular`.
In this case the button will always have these values unless you override them in a specific instance.

For **generic components** like `FluentSelect<T>` or `FluentAutocomplete<TOption, TSelected>`, 
you can set default values targeting a specific closed generic type using the `For<TComponent>()` method.

Alternatively, if you want to apply default values to **all instances** of a generic component regardless of its type parameters, 
use the `ForAny<TComponent>()` method. When using `ForAny`, the generic type arguments (e.g. `T`, `U`) are ignored when matching components — 
the defaults will apply to every variation of that component.

## Example

{{ DefaultValuesSample SourceCode=false }}

```csharp
// Add FluentUI services
builder.Services.AddFluentUIComponents(config =>
{
    // Set default values for FluentButton component
    config.DefaultValues.For<FluentButton>().Set(p => p.Appearance, ButtonAppearance.Primary);
    config.DefaultValues.For<FluentButton>().Set(p => p.Shape, ButtonShape.Circular);

    // Set default valies for a generic component, like FluentAutocomplete
    config.DefaultValues.ForAny<FluentAutocomplete<object, object>>().Set(p => p.Width, "100%");
});
```

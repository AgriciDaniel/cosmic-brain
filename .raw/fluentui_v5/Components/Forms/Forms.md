---
title: Forms
route: /Forms
icon: Form
---

## Validation
The Fluent UI Razor components work with a validation summary in the same way the standard Blazor (input) components do. An extra component is provided to make it possible to show a validation summary that follows the Fluent Design guidelines:

- FluentValidationSummary

See the [documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation?view=aspnetcore-10.0#validation-summary-and-validation-message-components) on the Learn site for more information on the standard components. As the Fluent component is based on the standard component, the same documentation applies

## Example form with validation

This is a copy of the example from the standard [Blazor input components documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/input-components?view=aspnetcore-10.0#example-form), implemented with the Fluent UI Blazor components. It uses the `FluentValidationSummary` to give feedback on the state of the form. It
uses the same `Starship` model as the standard docs and a DataAnnotationsValidator to use the data annotations set in the model.

Not all of the library's input components are used in this form. No data is actually being stored or saved.

{{ BasicForm }}


## API FluentValidationSummary

{{ API Type=FluentValidationSummary }}


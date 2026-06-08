---
title: Error Boundary
route: /ErrorBoundary
icon: DocumentError
---

# Error Boundary

The **FluentErrorBoundary** component is used to catch errors in a component tree and display a fallback UI instead of crashing the entire application.
_Error boundaries_ provide a convenient approach for handling exceptions.

The **FluentErrorBoundary** component:

  - Renders its child content when an error hasn't occurred.
  - Renders error UI when an unhandled exception is thrown by any component within the error boundary.

To define an error boundary, use the **FluentErrorBoundary** component to wrap one or more other components.
The error boundary manages unhandled exceptions thrown by the components that it wraps.

See [the Blazor handle errors using the error boundaries feature](https://learn.microsoft.com/aspnet/core/blazor/fundamentals/handle-errors#error-boundaries) for more details.

## Example

In this example, we demonstrate how to use the **FluentErrorBoundary** component to catch errors in a component tree,
depending of the `DisplayErrorDetails` parameter (None, ErrorMessage

- **None** displays a simple error message "An unhandled error has occurred. Please, contact your IT support."  
  This is the default value and is recommended for production use.
- **ErrorMessage** displays the error message.
- **ErrorStack** displays the error message, stack trace, and the project source that caused the error.

> [!NOTE] You can customize the error message by using the [localization](/localization) feature.
> or using the `ErrorHeader` and `ErrorMessage` parameters.

{{ FluentErrorBoundayDefault }}

## API FluentErrorBoundary

{{ API Type=FluentErrorBoundary }}

---
title: FluentUI Blazor ErrorBoundary
address: c-000117
status: developing
---

# FluentUI Blazor Error Boundary

> Part of the [[FluentUI Blazor]] component library. `FluentErrorBoundary` catches exceptions in a component tree and displays a fallback UI instead of crashing the entire application.

## Overview

`FluentErrorBoundary` provides a convenient approach for handling exceptions in Blazor component trees. It extends the built-in Blazor error boundary concept with Fluent Design styling and configurable error detail levels.

## Behavior

- When no error has occurred, the component renders its child content normally
- When an unhandled exception is thrown by any component within the boundary, it renders error UI
- The child content can be hidden or kept visible behind the error message

## Basic Usage

```razor
<FluentErrorBoundary>
    <FluentButton OnClick="@(e => throw new InvalidOperationException("Invalid operation"))">
        Throw Exception
    </FluentButton>
</FluentErrorBoundary>
```

## Error Detail Levels

The `DisplayErrorDetails` parameter controls how much information is shown:

| Level | Description |
|---|---|
| `None` (default) | Generic message: "An unhandled error has occurred. Please, contact your IT support." |
| `ErrorMessage` | Displays the exception message |
| `ErrorStack` | Displays the message, stack trace, and source |

```razor
{{!-- No details (production safe) --}}
<FluentErrorBoundary DisplayErrorDetails="ErrorBoundaryDetails.None">
    <FluentButton OnClick="@(e => throw new Exception("Test"))">Throw</FluentButton>
</FluentErrorBoundary>

{{!-- Error message only --}}
<FluentErrorBoundary DisplayErrorDetails="ErrorBoundaryDetails.ErrorMessage">
    <FluentButton OnClick="@(e => throw new Exception("Test"))">Throw</FluentButton>
</FluentErrorBoundary>

{{!-- Full stack trace --}}
<FluentErrorBoundary DisplayErrorDetails="ErrorBoundaryDetails.ErrorStack">
    <FluentButton OnClick="@(e => throw new Exception("Test"))">Throw</FluentButton>
</FluentErrorBoundary>
```

## Custom Error Messages

Use the [localization](/localization) feature or the `ErrorHeader` and `ErrorMessage` parameters to customize error text.

## Hiding Child Content

By default, `HideChildContentOnError` is `false`, keeping the child components visible behind the error overlay. Set to `true` to completely hide children when an error occurs:

```razor
<FluentErrorBoundary HideChildContentOnError="true">
    ...
</FluentErrorBoundary>
```

## API Parameters

| Parameter | Type | Description |
|---|---|---|
| `DisplayErrorDetails` | `ErrorBoundaryDetails` | Level of error detail (`None`, `ErrorMessage`, `ErrorStack`) |
| `HideChildContentOnError` | `bool` | Hide child content when error occurs |
| `ErrorHeader` | `string?` | Custom error header text |
| `ErrorMessage` | `string?` | Custom error message text |

---
route: file:HomeAside
hidden: true
---

## What's new?

If you are already up-and-running and upgrading from an earlier version of the library,
please go to the [What's New page](/WhatsNew) for information on additions, fixes and (breaking) changes.

## Components & render modes

As described in the [Blazor documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/render-modes):

> By default, components use **Static Server-side rendering** (SSR).
> The component renders to the response stream and there is no interactivity.

A component inherits its render mode from its parent. So unless a render mode is specified on the app,
page or component level, every component (including ours) is statically rendered on the server
and will not be interactive. For the Fluent UI Blazor library this means most components will
display correctly but will not offer complete, if any, functionality.

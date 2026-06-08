---
title: FluentUI Blazor Counter
address: c-000110
status: developing
---

# FluentUI Blazor Counter (Demo Page)

> Part of the [[FluentUI Blazor]] component library. A demo counter page illustrating basic Blazor component structure with interactive state.

## Overview

The `MyCounter` page is a simple demonstration page included in the FluentUI Blazor library's Labs category. It shows a basic Blazor component with a button click handler that increments a displayed value.

## Basic Implementation

```razor
@page "/MyCounter"

Value: @Value

<button @onclick="Button_Click">Click</button>

@code {
    private int Value = 0;

    private void Button_Click()
    {
        Value++;
    }
}
```

## Usage

This component serves primarily as a test/lab page for:
- Verifying component rendering
- Testing interactive state management
- Demonstrating basic Blazor event handling patterns

## Related Components

The Counter badge/count functionality for production use is better served by:

- [[FluentUI Blazor Badges]] -- `FluentCounterBadge` for displaying numerical counts on UI elements
- [[FluentUI Blazor Avatar]] -- Avatar component for user representation

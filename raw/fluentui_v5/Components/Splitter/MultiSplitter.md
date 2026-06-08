---
title: Splitter
route: /Splitter
icon: SplitHorizontal
---

# Splitter

The `FluentMultiSplitter` splits the page into multiple panels and allows the user to control the page layout.

You can include as many **Panes** as you like in a container.
By default, the panes are resizable, but the `Resizable` parameter can be used to block this functionality.
The initial `Size` is in percent or pixels and has a `Min` and `Max` value.  
A Panel can be fully collapsed by setting the `Collapsible` parameter to `true`.

The `OnResize` event returns the new size as a percentage.

## Example

In this example, each time a pane is resized, a trace is written to the console.

{{ MultiSplitterDefault }}

## Restrictions

This component must be able to communicate between the DOM (browser) and the .NET runtime.
Consequently, this component **requires an Interactive** mode: Interactive Server, Interactive WebAssembly or Auto.
Consequently, it does not function correctly in static rendering mode.

By design, the pane can only be resized and collapsed/expanded when `Resizable="true"`.

## Accessibility

This component is not accessible yet.

## Styling

These CSS variables are predefined with these values, but can be overwritten (using the `Style` parameter).

```css
.fluent-multi-splitter {
  /* Bar colors */
  --fluent-multi-splitter-background-color: var(--colorNeutralStroke2);
  --fluent-multi-splitter-background-color-active: var(--colorNeutralStroke1Selected);
  --fluent-multi-splitter-hover-opacity: 0.8;

  /* Resize Icon colors */
  --fluent-multi-splitter-color: var(--colorNeutralStrokeAccessible);
  --fluent-multi-splitter-color-active: var(--colorNeutralStrokeAccessiblePressed);

  /* Bar size */
  --fluent-multi-splitter-bar-size: var(--spacingVerticalS);
}
```

## API FluentMultiSplitter

{{ API Type=FluentMultiSplitter }}

## API FluentMultiSplitterPane

{{ API Type=FluentMultiSplitterPane }}

## Migrating to v5

No changes.

---
title: Spinner
route: /spinner
icon: ArrowClockwiseDashes
---

# Spinner

A **spinner** alerts a user that content is being loaded or processed and they should wait
for the activity to complete.

## Best practices

**Do**
- If your **FluentSpinner** is the only element on the page, set `tabIndex="0"` 
  on it to allow it to be picked up by screen readers.
- Use a **FluentSpinner** when a task is not immediate.
- Use one **FluentSpinner** at a time.
- Descriptive verbs are appropriate under a Spinner to help the user understand 
  what's happening. Ie: Saving, processing, updating
  (you can use a [FluentField](/Field)).
- Use a **FluentSpinner** when confirming a change has been made or a task is being processed.
- Add a description to a **FluentSpinner** when reduced-motion is active.

**Don't**
- Don't use a **FluentSpinner** when performing immediate tasks.
- Don't show multiple **FluentSpinner**s at the same time.
- Don't include more than a few words when paired with a **FluentSpinner**.

## Default

The spinner can have multiple sizes, the default size is **Medium**.

{{ SpinnerDefault }}

## Appearance Inverted

In some situations, you may need to display a spinner on a dark background.

{{ SpinnerInverted }}

## Visible

The `Visible` parameter can be used to show or hide the progress bar.
This parameter is nullable:
- If `true` (default), the component is visible.
- If `false`, the component is hidden.
- If `null`, the component is hidden and not rendered.

{{ SpinnerVisible }}

## API FluentSpinner

{{ API Type=FluentSpinner }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentProgressRing }}

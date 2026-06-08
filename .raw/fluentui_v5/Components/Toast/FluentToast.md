---
title: Toast
route: /Toast
category: 20|Components
icon: FoodToast
---

# Toast

A toast communicates the status of an action someone is trying to take or that something happened elsewhere in the app. Toasts are temporary surfaces.
Use them for information that's useful and relevant, but not critical.

The library provides a `FluentToast` component that can be used to display these notifications. To display a toast, you **must** use the `ToastService`. You use
the `ToastOptions` class to configure the toast's content and behavior.

## Types

Toasts generally fall into three categories: confirmation, progress, and communication. The toast component has slots that can be turned on and off to best
help people achieve their goals. The ideal configuration and usage of each toast type is described below:

### Confirmation toast

Confirmation toasts are shown to someone as a direct result of their action. A confirmation toast’s state can be success, error, warning,
informational, or progress.

### Progress toast

Progress toasts inform someone about the status of an operation they initiated.

### Communication toast

Communication toasts inform someone of messages from the system or another person’s actions. These messages can include mentions, event reminders, replies,
and system updates.
They include a call to action directly linking to a solution or the content that they reference. They can be either temporary or persistent. They’re
dismissible only if there is another surface, like a notification center, where the customer can find this content again later.

## Behavior

### Dismissal

Toasts can have timed, conditional, or express dismissals, dependent on their use case.

#### Timed dismissal

If there is no action to take, toast will time out after seven seconds. Timed dismissal is best when there is no further action to take, like for a successful
confirmation toast.

People who navigate via mouse can pause the timer by hovering over the toast. However, toasts that don’t include actions won’t receive keyboard focus for
people who navigate primarily by keyboard.

#### Conditional dismissal

Use conditional dismissal for toasts that should persist until a condition is met, like a progress toast that dismisses once a task is complete.

Don’t use toasts for necessary actions. If you need the encourage people to take an action before moving forward, try a more forceful surface like a message
bar or a dialog.

#### Express dismissal

Include the Close button to allow people to expressly dismiss toasts only if they can find that information again elsewhere, like in a notification center.

>[!Note] We do not have a way yet to facilitate showing toast messages on other surfaces like a notification center, so use the express dismissal option with
caution.

### Determinate and indeterminate progress

Progress toasts can be either determinate or indeterminate, depending on the needs of your app and the capabilities of the technology you’re building on.

When the completion time can be predicted, show a determinate progress bar and percentage of completion. Determinate progress bars offer a reliable user
experience since they communicate status and assure people things are still working.

If the completion time is unknown or its accuracy is unreliable, show an indeterminate spinner icon instead.

Although a specific type of toast needs to be specified through the `ToastOptions`, the library does not prevent you from showing both a spinner icon and a
progress bar in the same toast, but we recommend strongly against doing this.

## Accessibility

By using the `Intent` property (from `ToastOptions`) semantic styles, icons and aria-live regions and roles used in the toast are automatically applied.

All feedback states except info have an “assertive” aria-live and interrupt any other announcement a screen reader is making. Too many interruptions can disrupt someone’s flow,
so don’t overload people with too many assertive toasts.

## Examples

### Default

This example shows a toast with the default configuration, which includes a title and a message. It also has the default intent of `Info`, which applies the corresponding icon.
It shows 2 action links in the footer, which is the maximum number of what is possible for a toast.

{{ FluentToastDefault }}

### Custom dismissal

This example shows a toast with a custom dismissal configuration. It uses an action link (with a custom callback) instead of the standard dismiss icon to dismiss the toast.

{{ FluentToastCustomDismiss }}

### Inverted toast

You can use the `Inverted` property to show a toast with an inverted color scheme. This allows for showing a dark toast on a light background, or a light toast on a dark background.

>[!Note] When setting `IsDismissable` to `true`, without setting a custom `DismissAction`, a toast will render a default dismiss button using the `FluentButton` component.
As a `FluentButton` has no notion of an `Inverted` property, you need to set an explicit `DismissAction` so a inverted aware link is rendered instead of the default button.

{{ FluentToastInverted }}

### Indeterminate progress

This example shows a toast with an indeterminate progress configuration. Timeout has been set to zero, so the toast will never close by itself. Use the 'Finish process' button to dismiss the toast.

{{ FluentToastIndeterminateProgress }}

### Determinate progress

This example shows how a toast can be updated during a longer running process (with a predictable duration).

{{ FluentToastDeterminateProgress }}

## API ToastService

{{ API Type=ToastService }}

## API FluentToast

{{ API Type=FluentToast }}

## API ToastOptions

{{ API Type=ToastOptions Properties=All }}

## API FluentToastProvider

{{ API Type=FluentToastProvider }}

---
title: Wizard
route: /Wizard
icon: Steps
---

# Wizard

**Wizards** are a step-by-step user interface used to break down complex tasks into digestible pieces.
The simplified layout allows the reader to more easily understand the scope of a given task and the actions
needed to complete the task.

By default, steps are displayed on the left, but you can move them to the top of the component.
They are in the form of circular bubbles, with a check mark indicating whether it has been processed or not.
They are not numbered, but the **DisplayStepNumber** property can be used to add this numbering.
It's also possible to customize these bubbles via the **IconPrevious**, **IconCurrent**
and **IconNext** properties.

The order of the steps must be defined when designing the Wizard.
However, it is possible to enable or disable a step via the **Disabled** property.

By default, the contents of all steps are hidden and displayed when the user arrives at that
that step (for display performance reasons). But the **DeferredLoading** property
property reverses this process and generates the contents of the active step only.

The **Label** and **Summary** properties display the name and a small summary of the step below or next to the bubble.
The **StepTitleHiddenWhen** property is used to hide this title and summary when the screen width
is reduced, for example on mobile devices. By default, the value `XsAndDown` is applied
to hide this data on cell phones (< 600px).

All these areas (bubbles on the left/top and navigation buttons at the bottom) are fully customizable
using the **StepTemplate** and **ButtonTemplate** properties (see the second example).
You can customize button labels using the **ButtonTemplate** or by modifying
the static properties **FluentWizard.LabelButtonPrevious / LabelButtonNext / LabelButtonDone**.

> **note**: this FluentWizard is not yet fully compatible with accessibility.

{{ WizardDefault }}

## Positioning

You can choose to display the steps on the left (default) or on the top of the component using the **StepperPosition** parameter.

{{ WizardPosition }}

## Customized

You can customize the wizard with a **ButtonTemplate** to replace the default Previous/Next/Done buttons,
and **StepTemplate** to fully control how each step indicator is rendered.

{{ WizardCustomized }}

## EditForms

The wizard supports **EditForm** validation. When a step contains an `EditForm`, the wizard will
automatically validate the form before navigating to the next step. If validation fails,
the step change is cancelled.

{{ WizardEditForms }}

## API FluentWizard

{{ API Type=FluentWizard }}

## API FluentWizardStep

{{ API Type=FluentWizardStep }}

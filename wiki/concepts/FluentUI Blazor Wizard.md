---
type: concept
title: "FluentUI Blazor Wizard"
address: c-000154
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - wizard
  - stepper
  - form
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Tabs]]"
---

# FluentUI Blazor Wizard

`FluentWizard` breaks down complex tasks into digestible step-by-step pieces. Steps are displayed as circular bubbles with check marks, optionally numbered, positioned on the left or top.

## Basic Usage

Steps are defined as `FluentWizardStep` children. Each step has a `Label`, optional `Summary`, and content. Navigation buttons (Previous/Next/Done) are rendered automatically.

```razor
<FluentWizard DisplayStepNumber="@(WizardStepStatus.Current | WizardStepStatus.Next)"
              Border="WizardBorder.Outside"
              OnFinish="@OnFinished">
    <Steps>
        <FluentWizardStep Label="Intro" OnChange="@OnStepChange">
            Step 1 content.
        </FluentWizardStep>
        <FluentWizardStep Label="Get started"
                          Summary="Begin the tasks"
                          OnChange="@OnStepChange">
            Step 2 content.
        </FluentWizardStep>
        <FluentWizardStep Disabled="true"
                          Label="Disabled step"
                          Summary="This step is disabled"
                          OnChange="@OnStepChange">
            Step 3 content.
        </FluentWizardStep>
        <FluentWizardStep Label="Summary" OnChange="@OnStepChange">
            Step 4 content.
        </FluentWizardStep>
    </Steps>
</FluentWizard>

@code {
    void OnStepChange(FluentWizardStepChangeEventArgs e)
    {
        Console.WriteLine($"Step changed to {e.TargetIndex}");
    }

    void OnFinished()
    {
        Console.WriteLine("Wizard completed");
    }
}
```

## Step Positioning

Steps can be positioned on the **left** (default) or **top** via the `StepperPosition` parameter.

```razor
<FluentWizard StepperPosition="StepperPosition.Top" ...>
    <Steps>...</Steps>
</FluentWizard>
```

## Custom Step Icons

Each step can customize its indicator icons for previous (completed), current (active), and next states:

```razor
<FluentWizardStep Label="Set budget"
                  Summary="Identify the best price"
                  IconPrevious="@(new Icons.Filled.Size20.Star())"
                  IconCurrent="@(new Icons.Filled.Size20.StarEmphasis())"
                  IconNext="@(new Icons.Regular.Size20.Star())"
                  DisplayStepNumber="false">
    Budget content.
</FluentWizardStep>
```

## Custom Step Templates

Use `StepTemplate` to fully control how each step indicator is rendered. The context provides `Active`, `Current`, `Status`, and other properties.

```razor
<FluentWizardStep>
    <StepTemplate>
        <div active="@context.Active">
            @context.Label
        </div>
    </StepTemplate>
    <ChildContent>
        Step content.
    </ChildContent>
</FluentWizardStep>
```

## Custom Button Templates

Use `ButtonTemplate` to replace default navigation buttons. The context provides the current step index.

```razor
<FluentWizard @ref="@MyWizard" @bind-Value="@Value">
    <Steps>...</Steps>
    <ButtonTemplate>
        @{
            var index = context;
            <FluentButton OnClick="@(() => MyWizard.GoToStepAsync(0))">
                First
            </FluentButton>
            @if (index > 0)
            {
                <FluentButton OnClick="@(() => MyWizard.GoToStepAsync(Value - 1))">
                    Previous
                </FluentButton>
            }
            @if (index != lastStepIndex)
            {
                <FluentButton Appearance="ButtonAppearance.Primary"
                              OnClick="@(() => MyWizard.GoToStepAsync(Value + 1))">
                    Next
                </FluentButton>
            }
            else
            {
                <FluentButton Appearance="ButtonAppearance.Primary"
                              OnClick="@(() => MyWizard.FinishAsync())">
                    Finish
                </FluentButton>
            }
        }
    </ButtonTemplate>
</FluentWizard>

@code {
    FluentWizard MyWizard = default!;
    int Value = 0;
}
```

Customize default button labels globally:

```csharp
FluentWizard.LabelButtonPrevious = "Back";
FluentWizard.LabelButtonNext = "Forward";
FluentWizard.LabelButtonDone = "Complete";
```

## EditForm Validation

The wizard automatically validates `EditForm` within steps before allowing navigation. Use `FluentWizardStepValidator` inside each step's form.

```razor
<FluentWizardStep Label="Personal Info">
    <EditForm Model="_formData" FormName="personalInfo">
        <DataAnnotationsValidator />
        <FluentWizardStepValidator />
        <FluentStack Orientation="Orientation.Vertical">
            <FluentTextInput Placeholder="First Name"
                             @bind-Value="_formData.FirstName" />
        </FluentStack>
    </EditForm>
</FluentWizardStep>
```

## Step Sequence

The `StepSequence` parameter controls navigation flow:

| Value | Description |
|-------|-------------|
| `Linear` (default) | Must go through steps in order |
| `Visited` | Can navigate back to visited steps |
| `All` | Can freely navigate between any steps |

## Deferred Loading

By default, all step content is hidden and displayed on arrival. Set `DeferredLoading="true"` to generate content for the active step only, improving performance for expensive steps.

## Responsive Behavior

`StepTitleHiddenWhen` controls when step labels/summaries are hidden on small screens. Default: `GridItemHidden.XsAndDown` (hidden on phones < 600px).

## Key Parameters

### FluentWizard

| Parameter | Type | Description |
|-----------|------|-------------|
| `StepperPosition` | `StepperPosition?` | Steps on left or top |
| `StepSequence` | `WizardStepSequence?` | Linear, Visited, or All |
| `DisplayStepNumber` | `WizardStepStatus?` | Which steps show numbers |
| `OnFinish` | `EventCallback` | Fired when all steps complete |
| `Border` | `WizardBorder?` | Border style (Inside, Outside, None) |

### FluentWizardStep

| Parameter | Type | Description |
|-----------|------|-------------|
| `Label` | `string?` | Step display name |
| `Summary` | `string?` | Subtitle below label |
| `Disabled` | `bool` | Prevents step selection |
| `DeferredLoading` | `bool` | Load content only on arrival |
| `OnChange` | `EventCallback<FluentWizardStepChangeEventArgs>` | Step enter event |

> [!note] The FluentWizard is not yet fully compatible with accessibility standards.

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — Wizard component documentation.

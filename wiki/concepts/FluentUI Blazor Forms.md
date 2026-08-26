---
address: c-000118
status: developing
title: "FluentUI Blazor Forms"
tags:
  - fluentui-blazor
  - components
  - forms
  - validation
---

# FluentUI Blazor Forms

FluentUI Blazor components integrate with standard Blazor form validation. The library provides `FluentValidationSummary` as a Fluent-Design-compliant validation summary component alongside full support for `DataAnnotationsValidator` and `EditForm`.

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Button]], [[FluentUI Blazor Checkbox]], [[FluentUI Blazor Radio]], [[FluentUI Blazor Switch]], [[FluentUI Blazor Text Inputs]]

---

## Form Validation

Use `FluentValidationSummary` inside an `EditForm` with `DataAnnotationsValidator`. Set `novalidate="true"` on `EditForm` to disable browser native validation and let FluentUI components handle validation feedback.

```razor
<EditForm Model="@starship" OnValidSubmit="@HandleValidSubmit" novalidate="true">
    <DataAnnotationsValidator />
    <FluentValidationSummary />

    <FluentStack Orientation="Orientation.Vertical">
        <div>
            <FluentTextInput Name="identifier"
                             @bind-Value="starship.Identifier"
                             Label="Identifier"
                             Required="true" />
        </div>
        <div>
            <FluentTextArea Name="description"
                            @bind-Value="starship.Description"
                            Label="Description (min. 10 characters)"
                            Required="true" />
        </div>
        <div>
            <FluentSelect Name="class"
                          @bind-Value="starship.Classification"
                          Required="true"
                          Label="Primary Classification">
                <FluentOptionString Value="">Select classification ...</FluentOptionString>
                <FluentOptionString Value="Exploration">Exploration</FluentOptionString>
                <FluentOptionString Value="Diplomacy">Diplomacy</FluentOptionString>
                <FluentOptionString Value="Defense">Defense</FluentOptionString>
            </FluentSelect>
        </div>
        <div>
            <FluentTextInput TextInputType="TextInputType.Number"
                             Name="accommodation"
                             @bind-Value="starship.MaximumAccommodation"
                             Label="Maximum Accommodation"
                             Required="true" />
        </div>
        <div>
            <FluentCheckbox Name="approved"
                            @bind-Value="starship.IsValidatedDesign"
                            Label="Engineering approval" />
        </div>
        <div>
            <FluentSwitch Name="teleporter"
                          @bind-Value="starship.HasTeleporter"
                          Label="Has a Teleporter" />
        </div>
        <FluentButton Type="ButtonType.Submit"
                      Appearance="ButtonAppearance.Primary">
            Submit
        </FluentButton>
    </FluentStack>
</EditForm>
```

---

## FluentValidationSummary

Based on the standard Blazor `ValidationSummary` component. Displays all validation errors in a Fluent Design-compliant format. Works with data annotations on the model class.

```razor
<FluentValidationSummary />
```

---

## Input Components with Validation

All FluentUI input components integrate with Blazor forms validation:

| Component | Validation Support |
|-----------|-------------------|
| `FluentTextInput` | `Required`, `Name`, `@bind-Value` |
| `FluentTextArea` | `Required`, `Name`, `@bind-Value` |
| `FluentSelect` | `Required`, `Name`, `@bind-Value` |
| `FluentCheckbox` | `Required`, `Name`, `@bind-Value` |
| `FluentSwitch` | `Name`, `@bind-Value` |
| `FluentNumberInput` | `Required`, `Name`, `@bind-Value` |
| `FluentDatePicker` | `Required`, `Name`, `@bind-Value` |
| `FluentRadioGroup` | `Required`, `Name`, `@bind-Value` |

---

## Field-Level Validation

In addition to form-level validation with `DataAnnotationsValidator`, FluentUI components provide built-in field-level message display via `MessageState`, `Message`, and `MessageCondition`. See [[FluentUI Blazor Text Inputs]] for details on `FluentField` validation.

```razor
<FluentTextInput Label="Password"
                 TextInputType="TextInputType.Password"
                 @bind-Value="@Password"
                 Immediate="true"
                 MessageCondition="@(i => i.When(() => Password.Length < 8)
                                              .Display("8+ characters", MessageState.Error)
                                         .When(() => Password.Any(char.IsDigit) == false)
                                              .Display("Using number", MessageState.Error)
                                         .When(() => true)
                                              .Display("Valid password", MessageState.Success)
                                         .Build(options => options.BreakOnFirst = false))" />
```

---

## Submit Button

Use `FluentButton` with `Type="ButtonType.Submit"` inside the `EditForm` to trigger form submission. The `OnValidSubmit` callback fires when all validation passes.

```razor
<FluentButton Type="ButtonType.Submit" Appearance="ButtonAppearance.Primary">Submit</FluentButton>
<FluentButton Type="ButtonType.Reset">Reset</FluentButton>
```

---

## API Reference

- **`API Type=FluentValidationSummary`**

---
address: c-000148
status: developing
title: "FluentUI Blazor Text Inputs"
tags:
  - fluentui-blazor
  - components
  - text-input
  - textarea
  - label
  - field
  - input
---

# FluentUI Blazor Text Inputs

The FluentUI Blazor library provides four components for text entry and labeling: `FluentTextInput` (single-line), `FluentTextArea` (multi-line), `FluentLabel` (text labels), and `FluentField` (label + validation + hint wrapper).

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Forms]]

---

## FluentTextInput

Single-line text input supporting appearances, sizes, masking, prefixes/suffixes, and various input types.

### Appearance and Size

Four appearances via `TextInputAppearance`: `Outline`, `Underline`, `FilledLighter`, `FilledDarker`. Three sizes: `Small`, `Medium` (default), `Large`.

```razor
<FluentTextInput Appearance="@TextInputAppearance.Outline" Label="Outline" Placeholder="Outline" />
<FluentTextInput Appearance="@TextInputAppearance.Underline" Label="Underline" Placeholder="Underline" />
<FluentTextInput Appearance="@TextInputAppearance.FilledLighter" Label="FilledLighter" Placeholder="FilledLighter" />
<FluentTextInput Appearance="@TextInputAppearance.FilledDarker" Label="FilledDarker" Placeholder="FilledDarker" />

<FluentTextInput Size="@TextInputSize.Small" Label="Small" Placeholder="Small" />
<FluentTextInput Size="@TextInputSize.Medium" Label="Medium" Placeholder="Medium" />
<FluentTextInput Size="@TextInputSize.Large" Label="Large" Placeholder="Large" />
```

### Supported Input Types

Set via `TextInputType`: `Text`, `Email`, `Password`, `Telephone`, `Url`, `Color`, `Search`, `Number`.

```razor
<FluentTextInput Label="Email" Placeholder="Email" TextInputType="TextInputType.Email" />
<FluentTextInput Label="Password" Placeholder="Password" TextInputType="TextInputType.Password" />
<FluentTextInput Label="Search" Placeholder="Search" TextInputType="TextInputType.Search" />
```

### States

Text inputs support `Disabled`, `ReadOnly`, and `Required` states.

```razor
<FluentTextInput Required="true" Label="Required" Placeholder="Required" />
<FluentTextInput Disabled="true" Label="Disabled" Placeholder="Disabled" />
<FluentTextInput ReadOnly="true" Label="ReadOnly" Placeholder="ReadOnly" />
```

### Immediate Binding

Use `Immediate="true"` with optional `ImmediateDelay` (ms) to update the value on each keystroke with debouncing.

```razor
<FluentTextInput @bind-Value="@Value"
                 Immediate="true"
                 ImmediateDelay="400"
                 Placeholder="Updated after 400ms" />
```

### Prefix and Suffix

Add content before or after the input using `StartTemplate` and `EndTemplate`.

```razor
<FluentTextInput Label="Company Url" @bind-Value="@Domain">
    <StartTemplate>
        <fluent-label>https://</fluent-label>
    </StartTemplate>
    <EndTemplate>
        <fluent-label>.com</fluent-label>
    </EndTemplate>
</FluentTextInput>
```

### Masked Input

Use `MaskPattern` to define an input mask. Supported pattern characters: `0` (digit), `a` (letter), `*` (any). Use `[]` for optional input, `{}` to include fixed part in unmasked value. Configure with `MaskLazy` and `MaskPlaceholder`.

```razor
<FluentTextInput Label="Phone"
                 Placeholder="Phone number"
                 MaskPattern="+{7}(000)000-00-00"
                 @bind-Value="@Value" />
```

Pattern definitions: `0` = any digit, `a` = any letter, `*` = any character. Other characters are fixed. Uses the [IMask.js](https://imask.js.org/) library.

> [!NOTE] The mask is a visual aid only. The bound value includes fixed characters. Masks do not enforce validation.

### ChangeAfterKeyPress

Trigger the `OnChange` event after specific key presses (e.g., Enter). Useful for search inputs.

```razor
<FluentTextInput Placeholder="Search"
                 @bind-Value="@SearchText"
                 ChangeAfterKeyPress="@([KeyPress.For(KeyCode.Enter)])"
                 OnChangeAfterKeyPress="@StartSearch">
    <StartTemplate>
        <FluentIcon Value="@(new Icons.Regular.Size16.Search())" />
    </StartTemplate>
</FluentTextInput>
```

---

## FluentTextArea

Multi-line text input with support for resizing, auto-resize, and key-based submission.

### Appearance and Size

Same appearance and size patterns as TextInput. Supports `Width` and `Height` for custom dimensions.

```razor
<FluentTextArea Appearance="@TextAreaAppearance.Outline"
                Size="@TextAreaSize.Medium"
                Label="Sample"
                @bind-Value="@value" />
```

### Resize

Control resizing with `TextAreaResize`: `None`, `Both`, `Horizontal`, `Vertical`.

```razor
<FluentTextArea Resize="@TextAreaResize.None" @bind-Value="@value" />
```

### AutoResize

Set `AutoResize="true"` to automatically adjust height to content.

### Immediate Binding and ChangeAfterKeyPress

Same as `FluentTextInput` -- supports `Immediate`, `ImmediateDelay`, `ChangeAfterKeyPress`, and `OnChangeAfterKeyPress`.

```razor
<FluentTextArea Placeholder="Write your message and press Enter"
                @bind-Value="@ChatInput"
                ChangeAfterKeyPress="@([KeyPress.For(KeyCode.Enter).AndCtrlKey(), KeyPress.For(KeyCode.Enter)])"
                OnChangeAfterKeyPress="@StartChatDiscussion" />
```

---

## FluentLabel

Labels give a name to a component or group. Supported parameters: `Size` (`Small`, `Medium`, `Large`), `Weight` (`Regular`, `Semibold`), `Required` (shows asterisk), `Disabled`.

```razor
<FluentLabel Size="@LabelSize.Large" Weight="@LabelWeight.Semibold">Large Semibold Label</FluentLabel>
<FluentLabel Required="true">Required label</FluentLabel>
<FluentLabel Disabled="true">Disabled label</FluentLabel>
```

> In v5, `FluentLabel` is exclusively for labeling input fields. For general typography, use the new `FluentText` component instead.

---

## FluentField

`FluentField` wraps a control and adds label, validation message, and hint text. All FluentUI Blazor input components include `FluentField` attributes directly (like `Label`, `Message`, `MessageCondition`, `MessageState`).

```razor
<FluentTextInput Label="Error state"
                 MessageState="@MessageState.Error"
                 Message="This is an error message."
                 MessageCondition="@FluentFieldCondition.Always" />
```

### Label Configuration

Use `LabelPosition` (Above, After, Before) and `LabelWidth` to control label layout. Customize with `LabelTemplate`.

```razor
<FluentField Label="My first label:" LabelWidth="150px" LabelPosition="@LabelPosition.Above">
    <InputText @bind-Value="@Value" placeholder="Default InputText" />
</FluentField>
```

### Validation Messages

`MessageState` controls appearance: `Error` (red), `Success` (green checkmark), `Warning` (yellow exclamation), `null` (custom via `Message` and `MessageIcon`).

`MessageCondition` is a lambda that controls when the message displays. Use `FluentFieldCondition.Always` to always show it. For conditional logic, use a chained rule builder:

```csharp
field => field.When(() => MyValue.Length <= 1)
                   .Display("Less than 1", MessageState.Success)
              .When(() => MyValue.Length <= 3)
                   .Display("Less than 3", MessageState.Error)
              .When(() => true)
                   .Display(MessageState.Warning)
              .Build()
```

Combine conditions with `Build(options => options.BreakOnFirst = false)` for multi-rule validation (e.g., password strength).

### Spacing

By default, a `my-3` CSS class adds 12px top/bottom padding (24px between fields). Override globally via:

```csharp
builder.Services.AddFluentUIComponents(options => 
    options.DefaultStyles.FluentFieldClass = "my-class");
```

---

## API Reference

| Component | API Type |
|-----------|----------|
| `FluentTextInput` | `API Type=FluentTextInput` |
| `FluentTextArea` | `API Type=FluentTextArea` |
| `FluentLabel` | `API Type=FluentLabel` |
| `FluentField` | `API Type=FluentField` |

---

## Migration Notes (v4 to v5)

**FluentTextArea:**
- `Appearance` enum renamed to `TextAreaAppearance`.
- `Cols`/`Rows` removed -- use `Width`/`Height`.
- New: `Placeholder`, `AutoComplete`, `AutoResize`, `Size`, `Width`, `Height`, `Tooltip`, `ChangeAfterKeyPress`, `OnChangeAfterKeyPress`.

**FluentLabel:**
- `Weight` repurposed (now Regular/Semibold instead of typography levels).
- `Alignment`, `Color`, `CustomColor`, `MarginBlock`, `Typo` removed.
- New: `Required`, `Size`, `Tooltip`.

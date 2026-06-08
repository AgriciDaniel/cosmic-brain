# UI Hints

## Using UI Hints

UI Hints allows you to specify the type of input editor to be rendered in Elsa Studio. They are set in the `InputAttribute` with the `UIHint` property. There is a `InputUIHints` class that contains all the built in UIHints available in the studio.

```csharp
[Input(
    Description = "Choose to download one file or entire folder",
    DefaultValue = "File",
    Options = new[] { "File", "Folder" },
    UIHint = InputUIHints.RadioList
    )]
public Input<string> SelectedRadioOption { get; set; } = default!;
```

## Examples

### Checkbox

```
// Some code
```

### Checklist

public const string Checkbox = "checkbox";\
public const string CheckList = "checklist";\
public const string CodeEditor = "code-editor";\
public const string DateTimePicker = "datetime-picker";\
public const string DropDown = "dropdown";\
public const string DynamicOutcomes = "dynamic-outcomes";\
public const string ExpressionEditor = "expression-editor";\
public const string HttpStatusCodes = "http-status-codes";\
public const string JsonEditor = "json-editor";\
public const string MultiLine = "multiline";\
public const string MultiText = "multitext";\
public const string OutcomePicker = "outcome-picker";\
public const string OutputPicker = "output-picker";\
public const string RadioList = "radiolist";\
public const string SingleLine = "singleline";\
public const string FlowSwitchEditor = "flow-switch-editor";\
public const string SwitchEditor = "switch-editor";\
public const string TypePicker = "type-picker";\
public const string VariablePicker = "variable-picker";\
public const string WorkflowDefinitionPicker = "workflow-definition-picker";

Elsa Studio supports several UIHints out of the box.

---
type: concept
title: "Elsa Studio Design"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - studio
  - workflow-editor
  - ui
  - design
status: developing
address: c-000088
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Studio Localization]]"
---

# Elsa Studio Design

[[entities/Elsa Workflows]] Studio is a Blazor-based web application for visually creating, editing, and managing workflows. This page covers the workflow editor design, activity pickers, UI hints, content visualisers, and field extensions.

---

## Workflow Editor UI

The editor comprises five main areas:

1. **Toolbar** (Top) — workflow name, Save, Publish, Run, zoom controls, auto-layout
2. **Activity Toolbox** (Left Sidebar) — categorized activity list with search and drag-and-drop
3. **Canvas** (Center) — visual design surface with drag-and-pan, zoom, activity connections via input/output ports
4. **Properties Panel** (Right Sidebar) — context-sensitive tabs for Common, Input, Output, and Advanced settings
5. **Variables Panel** (Bottom/Sidebar) — create and manage workflow-scoped and activity-scoped variables

### Workflow Editor Versions

| Version | Description |
|---------|-------------|
| V2 (default, 3.5+) | Refreshed UI with cleaner activity wrappers and modern styling |
| V1 (legacy) | Original design, opt-in via CSS and component registration |

To switch to V1:

```csharp
// In Program.cs
options.RootComponents.RegisterCustomElsaStudioElements(
    typeof(Elsa.Studio.Workflows.Designer.Components.ActivityWrappers.V1.EmbeddedActivityWrapper));

builder.Services.Configure<DesignerOptions>(options =>
{
    options.DesignerCssClass = "elsa-flowchart-diagram-designer-v1";
    options.GraphSettings.Grid.Type = "mesh";
});
```

---

## Activity Pickers

Two activity picker types are available for the workflow editor toolbox:

### Accordion (Default)

Activities are grouped by category in collapsible accordion sections. Supports nested categories with a configurable `CategoryDisplayResolver`:

```csharp
builder.Services.AddScoped<IActivityPickerComponentProvider, AccordionActivityPickerComponentProvider>();
```

Customize category display:

```csharp
builder.Services.AddScoped<IActivityPickerComponentProvider>(sp =>
    new AccordionActivityPickerComponentProvider
    {
        CategoryDisplayResolver = category => category.Split('/').Last().Trim()
    });
```

### Treeview

Activities are displayed in a hierarchical tree structure:

```csharp
builder.Services.AddScoped<IActivityPickerComponentProvider, TreeviewActivityPickerComponentProvider>();
```

---

## UI Hints

UI Hints specify the input editor rendered for activity properties. Set via `InputAttribute.UIHint`:

```csharp
[Input(
    Description = "Choose to download one file or entire folder",
    DefaultValue = "File",
    Options = new[] { "File", "Folder" },
    UIHint = InputUIHints.RadioList
)]
public Input<string> SelectedRadioOption { get; set; }
```

### Available UI Hints

| Constant | Value |
|----------|-------|
| `Checkbox` | `"checkbox"` |
| `CheckList` | `"checklist"` |
| `CodeEditor` | `"code-editor"` |
| `DateTimePicker` | `"datetime-picker"` |
| `DropDown` | `"dropdown"` |
| `DynamicOutcomes` | `"dynamic-outcomes"` |
| `ExpressionEditor` | `"expression-editor"` |
| `HttpStatusCodes` | `"http-status-codes"` |
| `JsonEditor` | `"json-editor"` |
| `MultiLine` | `"multiline"` |
| `MultiText` | `"multitext"` |
| `OutcomePicker` | `"outcome-picker"` |
| `OutputPicker` | `"output-picker"` |
| `RadioList` | `"radiolist"` |
| `SingleLine` | `"singleline"` |
| `FlowSwitchEditor` | `"flow-switch-editor"` |
| `SwitchEditor` | `"switch-editor"` |
| `TypePicker` | `"type-picker"` |
| `VariablePicker` | `"variable-picker"` |
| `WorkflowDefinitionPicker` | `"workflow-definition-picker"` |

---

## Content Visualisers (3.6+)

Content visualisers provide an extensible viewer for activity input/output data in three formats:

| Renderer | Description |
|----------|-------------|
| **Prettified** | Formatted display (e.g., syntax-highlighted JSON) |
| **Tabular** | Table view for array/collection data |
| **Raw** | Unformatted source |

Visualisers are automatically selected via `CanVisualize()`. Custom visualisers can be added:

```csharp
public class JsonContentVisualizer : IContentVisualizer
{
    public string Name => "Json";
    public string Syntax => "json";
    public bool CanVisualize(object input) => /* ... */;
    public string? ToPretty(object input) => /* ... */;
    public TabulatedContentVisualizer? ToTable(object input) => /* ... */;
}

// Register with DI
services.AddContentVisualizer<JsonContentVisualizer>();
```

> [!info]
> The ellipsis `[...]` appears when content exceeds 300 characters. A lock icon enables in-place editing of Pretty/Raw content (not persisted).

---

## Field Extensions

Field extensions add UI functionality directly within the studio (server-side configuration not needed). Implement `IUIFieldExtensionHandler`:

```csharp
public interface IUIFieldExtensionHandler
{
    int DisplayOrder { get; set; }
    bool IncludeForAll { get; set; }
    FieldExtensionPosition Position { get; set; }
    string UIHintComponent { get; set; }
    List<string> ActivityTypes { get; set; }
    List<string> Syntaxes { get; set; }
    RenderFragment DisplayExtension(DisplayInputEditorContext context);
}
```

Extensions can be filtered to render for:
- All components
- Specific `InputUIHints` types
- Specific activity names
- Specific syntax types (e.g., `"sql"`)

Register with DI:

```csharp
services.AddUIFieldEnhancerHandler<CustomFieldExtension>();
```

---

## Studio Tour (Key Screens)

- **Dashboard** — landing page with navigation to Workflows, Workflow Instances, Settings
- **Workflow Definitions List** — create, edit, duplicate, publish, unpublish, delete
- **Editor Canvas** — drag-and-drop design surface with connection lines
- **Properties Panel** — activity configuration (Common, Input, Output, Advanced)
- **Workflow Instances View** — monitor running/completed/faulted instances with execution journal

See also [[Elsa Studio Localization]] for multi-language support in the Studio UI.

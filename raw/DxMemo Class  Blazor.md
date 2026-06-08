---
title: "DxMemo Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo"
author:
published:
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## DxMemo Class

In This Article

A multi-line text editor.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxMemo :
    DxInputDataEditorBase<string>,
    IFocusableEditor
```

## Remarks

The DevExpress Memo for Blazor (`<DxMemo>`) is a multi-line text editor that users can resize.

![Memo - Resize Modes](https://docs.devexpress.com/Blazor/images/blazor-memo-resize-modes.png)

[Run Demo: Memo](https://demos.devexpress.com/blazor/Memo)

### Add a Memo to a Project

Follow the steps below to add the Memo component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxMemo />` markup to a `.razor` file.
3. Configure the component: specify the editor’s value and size, add a clear button and placeholder, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxMemo Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo._members).

### Static Render Mode Specifics

Blazor Memo does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Edit Value

Use the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.Text) property to specify the edit value or to bind the editor to data. You can use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute to bind the `Text` property to a data field. Refer to the following topic for details: [Two-Way Data Binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding).

```
<DxMemo Text="Some text"></DxMemo>

<DxMemo @bind-Text="@TextValue"></DxMemo>

@code {
    string TextValue { get; set; } = "Some text";
}
```

The [BindValueMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.BindValueMode) property specifies when the editor updates its value if a user modifies the text:

- [OnLostFocus](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) (default): after the editor loses focus
- [OnInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode): whenever the user types
- [OnDelayedInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode): with a delay after user changes

If you do not use two-way data binding, handle the [TextChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.TextChanged) event to respond to changes made in the editor. The following code snippet enables the **Update Text** button once a user types in the Memo editor.

```
<DxMemo Text="Some text"
        TextChanged="@((newValue) => OnTextChanged(newValue))"
        BindValueMode="BindValueMode.OnInput">
</DxMemo>

<DxButton Enabled="@IsEnabled">Update Text</DxButton>

@code {
    bool IsEnabled = true;

    void OnTextChanged(string newValue) {
        if (!string.IsNullOrEmpty(newValue)) {
            IsEnabled = false;
        } else IsEnabled = true;
    }
}
```

### Size

The Blazor Memo component provides several options to manage its size and appearance in your application.

#### Default Size

The Memo component initially displays two lines of text and can expand horizontally to fit the parent container’s width. If content exceeds two lines, the editor displays a vertical scrollbar.

![Memo - Default Size](https://docs.devexpress.com/Blazor/images/editors/memo/blazor-memo-default-size.png)

#### Size Modes

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.SizeMode) property to specify a predefined size mode. This property determines text and **Clear** button size.

```
<DxMemo @bind-Text="@TextValue" SizeMode="SizeMode.Small"></DxMemo>

<DxMemo @bind-Text="@TextValue" SizeMode="SizeMode.Medium"></DxMemo>

<DxMemo @bind-Text="@TextValue" SizeMode="SizeMode.Large"></DxMemo>

@code {
    string TextValue { get; set; } =
        "Prepare 2020 Marketing Plan: We need to double revenues in 2020 "+
        "and our marketing strategy is going to be key here. " +
        "R&D is improving existing products and creating new products so we can "+
        "deliver great AV equipment to our customers. " +
        "Robert, please make certain to create a PowerPoint presentation "+"" +
        "for the members of the executive team.";
```

![Memo Size Modes](https://docs.devexpress.com/Blazor/images/blazor-memo-size-modes.png)

#### Custom Size

Use the following properties to customize component size:

[Rows](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.Rows)

Specifies the initial number of visible text lines. In `Auto` [resize mode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.MemoResizeMode), specifies the minimum number of visible text lines.

[MaxRows](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.MaxRows)

Specifies the maximum number of visible text lines.

[Columns](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.Columns)

Specifies the Memo’s display width (the number of characters).

```
<DxMemo @bind-Text="@TextValue"
        Rows="8"
        MaxRows="20"
        Columns="50">
</DxMemo>

@code {
    string TextValue { get; set; } =
        "Prepare 2020 Marketing Plan: We need to double revenues in 2020 "+
        "and our marketing strategy is going to be key here. " +
        "R&D is improving existing products and creating new products so we can "+
        "deliver great AV equipment to our customers. " +
        "Robert, please make certain to create a PowerPoint presentation "+"" +
        "for the members of the executive team.";
}
```

![Memo - Custom Size](https://docs.devexpress.com/Blazor/images/blazor-memo-custom-size.png)

[Run Demo: Memo - Custom Size](https://demos.devexpress.com/blazor/Memo#CustomSize)

For additional information, refer to the following help topic: [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes).

#### Resize Modes

Use the [ResizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.ResizeMode) property to specify how the Memo component can be resized. The following modes are available: `Auto`, `Disabled`, `Horizontal`, `Vertical`, `VerticalAndHorizontal`.

The following code specifies the `VerticalAndHorizontal` resize mode:

```
<DxMemo @bind-Text="@TextValue"
        ResizeMode="MemoResizeMode.VerticalAndHorizontal">
</DxMemo>

@code {
    string TextValue { get; set; } =
        "Prepare 2020 Marketing Plan: We need to double revenues in 2020 "+
        "and our marketing strategy is going to be key here. " +
        "R&D is improving existing products and creating new products so we can "+
        "deliver great AV equipment to our customers. " +
        "Robert, please make certain to create a PowerPoint presentation "+"" +
        "for the members of the executive team.";
```

[Run Demo: Memo - Resize Modes](https://demos.devexpress.com/blazor/Memo#ResizeMode)

### AI-powered Smart Autocomplete

The Memo component includes an AI-powered Smart Autocomplete extension that helps users compose text. As users type, an AI service analyzes their input and context and generates relevant text suggestions.

Users can interact with suggestions in the following ways:

- Press Tab to **accept a suggestion**.
- Press Esc or Backspace, continue typing, or click outside the editor to **dismiss a suggestion**.

[Run Demo](https://demos.devexpress.com/blazor/AI/MemoSmartAutoComplete)

Follow the steps below to add the Smart Autocomplete extension to the Memo component:

1. Register AI services.
	To build an AI-powered application, choose the approach that best fits your needs:
	- [Use the DevExpress Template Kit](https://docs.devexpress.com/Blazor/405228/ai-powered-extensions#ai-project-templates): Create a new project with pre-configured AI services and NuGet packages. This approach implements our recommended patterns for AI service integration.
		- [Add AI capabilities](https://docs.devexpress.com/Blazor/405228/ai-powered-extensions#manual-ai-services-integration) to your current application. The AI-powered Smart Autocomplete extension for Memo supports major cloud providers, self-hosted models, and proprietary in-house LLMs.
	> [!note] Note
	> DevExpress AI-powered extensions operate on a “bring your own key” (BYOK) model. We do not provide a proprietary REST API or bundled language models (LLMs/SLMs).
	> 
	> You can either deploy a self-hosted model or connect to a cloud AI provider and obtain necessary connection parameters (endpoint, API key, language model identifier, and so on). These parameters must be [configured](https://docs.devexpress.com/Blazor/405228/ai-powered-extensions#manual-ai-services-integration) at application startup to register an AI client and enable extension functionality.
	> [!important] Important
	> Never hardcode AI provider access keys, credentials, or API endpoints directly in your source code. Refer to the following help topic for additional information: [Secret Management for Blazor AI Components](https://docs.devexpress.com/Blazor/405749/security-considerations/ai-secret-management).
2. Register the [DevExpress.AIIntegration.Blazor.Editors](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Editors) namespace in the *Components/Imports.razor* file or in your Razor file:
	- [\_Imports.razor](#tabpanel_C87nezmP7U_tabid-markup)
	```
	@using DevExpress.AIIntegration.Blazor.Editors
	```
3. Use the [Extensions](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.Extensions) property to add the AI-powered Smart Autocomplete functionality to the Memo editor.
	```
	<label for="memoSmartAutoComplete" class="demo-text cw-480 mb-1">
	    To see autocomplete suggestions, move the caret to the end and start typing.
	</label>
	<DxMemo @bind-Text=@TextValue
	        Rows="5"
	        CssClass="cw-480"
	        InputId="memoSmartAutoComplete">
	    <Extensions>
	        <MemoSmartAutoComplete InputDelay="1000" SuggestionReceived="@OnSuggestionReceived" />
	    </Extensions>
	</DxMemo>
	<div class="demo-text cw-480 mt-2">
	    <p class="mb-0">Request count: <b>@_requestCount</b></p>
	    <p>Current suggestion: <b>@GetSuggestionText()</b></p>
	</div>
	@code {
	    string _lastSuggestionText { get; set; }
	    int _requestCount { get; set; }
	    string GetSuggestionText() {
	        if(string.IsNullOrWhiteSpace(_lastSuggestionText))
	            return "Empty string";
	        return _lastSuggestionText;
	    }
	    void OnSuggestionReceived(MemoSmartAutoCompleteSuggestionReceivedEventArgs e) {
	        _requestCount++;
	        _lastSuggestionText = e.SuggestionText;
	    }
	    string TextValue { get; set; } =
	    "Taylor continues to have problems managing expectations. " +
	    "She is too optimistic and refuses to be realistic about the workload involved. " +
	    "I recommend";
	}
	```

> [!note] Note
> The DevExpress Blazor Memo component is only responsible for displaying AI-generated text suggestions. The actual text analysis and suggestion generation are performed by the [connected AI model](https://docs.devexpress.com/Blazor/405228/ai-powered-extensions). Since AI models may not always generate suggestions, we recommend that you handle the [SuggestionReceived](https://docs.devexpress.com/Blazor/DevExpress.AIIntegration.Blazor.Editors.MemoSmartAutoComplete.SuggestionReceived) event and verify whether a suggestion is available.

### Clear Button and Placeholder

Set the [ClearButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.ClearButtonDisplayMode) property to `Auto` to display the **Clear** button in the Memo editor when it is not empty. Use the [NullText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.NullText) property to display prompt text (placeholder) in the editor when its value is `null`.

![Memo Clear Button](https://docs.devexpress.com/Blazor/images/blazor-memo-clear-button.png)

```
<DxMemo @bind-Text="@TextValue"
        ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto"
        NullText="Type text...">
</DxMemo>

@code {
    string TextValue { get; set; } = "Prepare 2020 Marketing Plan: We need to double revenues in 2020 and our marketing strategy is going to be key here. " +
            "R&D is improving existing products and creating new products so we can deliver great AV equipment to our customers. " +
            "Robert, please make certain to create a PowerPoint presentation for the members of the executive team.";
}
```

[Run Demo: Memo - Clear Button and Placeholder](https://demos.devexpress.com/blazor/Memo#ClearButton)

### Input Validation

You can add a standalone Memo editor or the [Form Layout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFormLayout) component to the Blazor’s standard [EditForm](https://learn.microsoft.com/en-us/aspnet/core/blazor/forms/validation). This form validates user input based on [data annotation attributes](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation) defined in a model and indicates errors.

- [Model](#tabpanel_KGhitUxZDS_tabid-model1)
- [Razor](#tabpanel_KGhitUxZDS_tabid-razor1)

```
<EditForm Model="@model" Context="EditFormContext">
    <DataAnnotationsValidator />
    <DxFormLayout >
        <DxFormLayoutItem Caption="Notes:" ColSpanMd="6" >
            <Template >
                <DxMemo @bind-Text="@model.Notes" />
            </Template>
        </DxFormLayoutItem>
        @*...*@
    </DxFormLayout>
</EditForm>

@code {
    private Model model=new Model();
}
```

For additional information, refer to the following help topic: [Validate Input](https://docs.devexpress.com/Blazor/402066/components/data-editors/validate-input).

[Run Demo: Form Validation](https://demos.devexpress.com/blazor/FormValidation)

### Read-Only State

Memo supports a read-only state. Set the [ReadOnly](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.ReadOnly) property to `true` to activate this mode.

```
<DxMemo Text="@TextValue"
        ReadOnly="true">
</DxMemo>

@code {
    string TextValue { get; set; } = "End users cannot change the Memo value";
}
```

![Memo Read-Only Mode](https://docs.devexpress.com/Blazor/images/blazor-memo-read-only.png)

[Run Demo: Memo - Read-Only and Disabled Modes](https://demos.devexpress.com/blazor/DisabledAndReadOnlyModes)

### HTML Attributes and Events

You can use [HTML attributes and events](https://docs.devexpress.com/Blazor/401918/components/data-editors/html-attributes) to configure the Memo.

```
<DxMemo Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        spellcheck="false"
        @onselect="MyFunction">
</DxMemo>

@code {
    void MyFunction(){
        //...
    }
}
```

### Custom CSS Classes

You can use the [TextAreaCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo.TextAreaCssClass) property to change the appearance of the Memo’s text area. The following example applies a custom style (`my-style`) to the Memo’s text area:

- [Razor](#tabpanel_KGhitUxZDS-1_tabid-razor)
- [CSS](#tabpanel_KGhitUxZDS-1_tabid-css)

```
<DxMemo @bind-Text="TextValue" TextAreaCssClass="my-style"></DxMemo>

@code {
  string TextValue { get; set; } = "Prepare 2020 Marketing Plan: We need to double revenues in 2020 and our marketing strategy is going to be key here. " +
      "R&D is improving existing products and creating new products so we can deliver great AV equipment to our customers. " +
      "Robert, please make certain to create a PowerPoint presentation for the members of the executive team.";
}
```

![Memo - Text Area CSS Class](https://docs.devexpress.com/Blazor/images/blazor-memo-input-css-class.png)

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

See Also

[DxMemo Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMemo._members)
---
title: "DxSearchBox Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSearchBox"
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

## DxSearchBox Class

In This Article

A single-line editor that allows users to input text and search for it in your application.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxSearchBox :
    DxInputDataEditorBase<string>,
    IFocusableEditor
```

## Remarks

The DevExpress Search Box for Blazor (`<DxSearchBox>`) allows you to input text and search for it in your application.

![Search Box Overview](https://docs.devexpress.com/Blazor/images/editors/searchbox/blazor-searchbox-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/SearchEditor)

### Add a Search Box to a Project

Follow the steps below to add the Search Box component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxSearchBox>` … `</DxSearchBox>` markup to a `.razor` file.
3. Configure the component: specify the editor’s value, handle value changes, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxSearchBox Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSearchBox._members).

### Static Render Mode Specifics

Blazor Search Box does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Search Text

Use the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSearchBox.Text) property to specify a search string or to bind the component to a data source object. You can use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute to bind the `Text` property to a data field. Refer to the following topic for details: [Two-Way Data Binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding).

```
<DxSearchBox @bind-Text="@Value"
             aria-label="Search" />

<p class="demo-text cw-320 mt-3">
    Search text: <b>@Value</b>
</p>

@code {
    string Value { get; set; }
}
```

### Handle Search Text Changes

If you do not use two-way data binding, handle the [TextChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSearchBox.TextChanged) event to respond to changes made in the editor.

```
<DxSearchBox Text="@Value"
             TextChanged="@OnTextChanged"
             aria-label="Search" />

<p class="cw-320 mt-3">
    Search text: <b>@Value</b>
</p>

@code {
    string Value { get; set; }
    void OnTextChanged(string newValue) {
        Value = newValue;
    }
}
```

You can also use the [BindValueMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSearchBox.BindValueMode) property to specify how and when to update the editor’s text.

### Search Delay

The [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSearchBox.Text) property value is updated when the editor loses focus ([OnLostFocus](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) mode). You can set the [BindValueMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSearchBox.BindValueMode) property to [OnInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) or [OnDelayedInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) to update the `Text` property when a user changes the input value.

The following code snippet shows the Search Box component that updates its text after a user is idle for 1 second (1,000ms):

```
<DxSearchBox @bind-Text="@Value"
             BindValueMode="BindValueMode.OnDelayedInput"
             InputDelay="1000" 
             aria-label="Search" />

<p class="cw-320 mt-3">
    Search text: <b>@Value</b>
</p>

@code {
    string Value { get; set; }
}
```

[Run Demo: Search Box - Search Delay](https://demos.devexpress.com/blazor/SearchEditor#SearchDelay)

### Appearance Customization

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.SizeMode) property to specify a Search Box size. The following code snippet applies different size modes to Search Box components.

```
<DxSearchBox @bind-Text="@Value" SizeMode="SizeMode.Small"></DxSearchBox>

<DxSearchBox @bind-Text="@Value" SizeMode="SizeMode.Medium"></DxSearchBox>

<DxSearchBox @bind-Text="@Value" SizeMode="SizeMode.Large"></DxSearchBox>

@code {
    string Value { get; set; }
}
```

![Search Box - Size Mode](https://docs.devexpress.com/Blazor/images/editors/searchbox/blazor-searchbox-sizemode.png)

To customize styles for the Search Box container, use the [CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataEditor-1.CssClass) property. The following code snippet applies a custom style to container borders:

- [Razor](#tabpanel_LUxBZv5VXI_tabid-searchbox-cssclass-razor)
- [CSS](#tabpanel_LUxBZv5VXI_tabid-searchbox-cssclass-css)

```
<DxSearchBox @bind-Text="@Value" 
             CssClass="my-style">
</DxSearchBox>

@code {
    string Value { get; set; }
}
```

![Custom Input Border](https://docs.devexpress.com/Blazor/images/editors/searchbox/blazor-searchbox-css-property.png)

You can also use the [InputCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.InputCssClass) property to customize the editor’s input area.

For additional information, refer to the following help topics:

- [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes)
- [CSS Classes](https://docs.devexpress.com/Blazor/401740/styling-and-themes/css-classes)

### Clear Button and Placeholder

Set the [ClearButtonDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.ClearButtonDisplayMode) property to `Auto` to display the **Clear** button in the Search Box when it is not empty. Use the [NullText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxInputDataEditorBase-1.NullText) property to display the prompt text (placeholder) in the editor when its value is `null`.

```
<DxSearchBox @bind-Text="@Value"
             ClearButtonDisplayMode="DataEditorClearButtonDisplayMode.Auto"
             NullText="Search orders..."
             CssClass="cw-320"
             aria-label="Search" />

@code {
    string Value { get; set; }
}
```

![Search Box - Clear Button](https://docs.devexpress.com/Blazor/images/editors/searchbox/blazor-searchbox-nulltext.png)

[Run Demo: Search Box - Clear Button and Placeholder](https://demos.devexpress.com/blazor/SearchEditor#ClearButton)

### Search Box with Submit Button

The following code implements a Search Box with a Submit button.

```
<DxSearchBox NullText="Type search text and click the Search button..."
             @bind-Text="@Text"
             aria-label="Search">
</DxSearchBox>

<DxButton Text="Search" 
          CssClass="ms-3" 
          Click="@OnSearchButtonClick"></DxButton>

<DxListBox TData="Product" TValue="Product" Data="@Products"
           SearchText="@SearchText"
           ListRenderMode="ListRenderMode.Virtual"
           SelectionMode="ListBoxSelectionMode.Multiple">
    <Columns>
    ...
    </Columns>
</DxListBox>

@code {
    string Text { get; set; }
    string SearchText { get; set; }

    void OnSearchButtonClick(MouseEventArgs args) {
        SearchText = Text;
    }
    ...
}
```

![Search Box with Submit Button](https://docs.devexpress.com/Blazor/images/editors/searchbox/blazor-searchbox-with-submit-button.png)

[Run Demo: Search Box with Submit Button](https://demos.devexpress.com/blazor/SearchEditor#SearchButton)

### Add Search Box to Toolbar

You can integrate the DevExpress Blazor Search Box component into the Blazor Toolbar component.

```
<DxToolbar ItemRenderStyleMode="ToolbarRenderStyleMode.Plain"
           Title="DevExpress Logo">
    <TitleTemplate>
        <div class="icon-logo" role="img" aria-label="@context"></div>
    </TitleTemplate>
    <Items>
        <DxToolbarItem BeginGroup="true"
                       Alignment="ToolbarItemAlignment.Right">
            <Template>
                <DxSearchBox @bind-Text="@Value"
                             aria-label="Search" />
            </Template>
        </DxToolbarItem>
        <DxToolbarItem IconCssClass="tb-icon tb-icon-settings"
                       Tooltip="Settings" />
    </Items>
</DxToolbar>

@code {
    string Value { get; set; }
}
```

![Search Box - Toolbar Integration](https://docs.devexpress.com/Blazor/images/editors/searchbox/blazor-searchbox-toolbar-integration.png)

[Run Demo: Toolbar Integration](https://demos.devexpress.com/blazor/SearchEditor#ToolbarIntegration)

### Add Command Buttons

You can add custom command buttons to the Search Box. Refer to [Command Buttons](https://docs.devexpress.com/Blazor/404267/components/data-editors/command-buttons) for additional information.

The following code snippet adds custom buttons to the Search Box.

```
<DxSearchBox @bind-Text="@Value"
             aria-label="Search" >
    <Buttons>
        <DxEditorButton IconCssClass="oi oi-arrow-thick-bottom"
                        Click="@OnPreviousButtonClick">
        </DxEditorButton>
        <DxEditorButton IconCssClass="oi oi-arrow-thick-top"
                        Click="@OnNextButtonClick">
        </DxEditorButton>
    </Buttons>
</DxSearchBox>

@code {
    string Value { get; set; }

    void OnPreviousButtonClick() {
        // your logic
    }
    void OnNextButtonClick()  {
        // your logic
    }
}
```

### HTML Attributes and Events

You can use [HTML attributes and events](https://docs.devexpress.com/Blazor/401918/components/data-editors/html-attributes) to configure the Search Box.

```
<DxSearchBox @bind-Text="@Value"
             id="text"
             name="text"
             autocomplete="on"
             maxlength="10"
             @onselect="MyFunction">
</DxSearchBox>

@code {
    string Value { get; set; }
    void MyFunction(){
        //...
    }
}
```

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

See Also

[DxSearchBox Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSearchBox._members)
---
type: concept
title: "FluentUI Blazor Tabs"
address: c-000146
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - tabs
  - navigation
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Wizard]]"
---

# FluentUI Blazor Tabs

`FluentTabs` allows people to switch between categories of related information without navigating to different pages. Ideal for dividing content-heavy pages into distinct but related categories.

## Default Usage

Track the active tab via `ActiveTabId` (string) or `ActiveTab` (object). The `Disabled` parameter prevents interaction with a specific tab.

```razor
<FluentTabs ActiveTabId="@ActiveTabId" @bind-ActiveTab="@ActiveTab">
    <FluentTab Id="tab1" Header="Chat" IconStart="@(new Icons.Regular.Size16.Chat())">
        Chat content here.
    </FluentTab>

    <FluentTab Id="tab2" Header="Files" Disabled="true"
               IconStart="@(new Icons.Regular.Size16.Folder())">
        Files content here.
    </FluentTab>

    <FluentTab Id="tab3" Header="Recap" IconStart="@(new Icons.Regular.Size16.List())">
        Recap content here.
    </FluentTab>
</FluentTabs>

@code {
    string? ActiveTabId = "tab3";
    FluentTab? ActiveTab;

    void OnTabChanged()
    {
        Console.WriteLine($"Tab changed to '{ActiveTab?.Header}'.");
    }
}
```

## Appearance Customization

Tabs support multiple visual parameters:

```razor
<FluentSelect @bind-Value="@Appearance"
              Items="@(Enum.GetValues<TabsAppearance>())" />
<FluentSelect @bind-Value="@Orientation"
              Items="@(Enum.GetValues<Orientation>())" />
<FluentSelect @bind-Value="@Size"
              Items="@(Enum.GetValues<TabsSize>())" />

<FluentTabs Appearance="@Appearance" Orientation="@Orientation" Size="@Size"
            Disabled="@Disabled">
    <FluentTab Header="Chat">...</FluentTab>
    <FluentTab Header="Files">...</FluentTab>
</FluentTabs>

@code {
    TabsAppearance Appearance;
    Orientation Orientation;
    TabsSize Size;
    bool Disabled;
}
```

## Customized Headers

Use `HeaderTemplate` for rich tab headers with badges, icons, or other components:

```razor
<FluentTab>
    <HeaderTemplate>
        <FluentCounterBadge Count="@NumberOfFiles" OverflowCount="9">
            Files
        </FluentCounterBadge>
    </HeaderTemplate>
    <ChildContent>
        Here's the list of all files.
    </ChildContent>
</FluentTab>
```

## Deferred Loading

Set `DeferredLoading="true"` on a tab to load its content only after the tab is selected. Shows a progress indicator during loading; customize it with `LoadingTemplate`.

```razor
<FluentTab Header="Files" DeferredLoading="true">
    @GetContentTab2
</FluentTab>

@code {
    RenderFragment? GetContentTab2 => builder =>
    {
        Thread.Sleep(2000); // Simulate long load
        builder.OpenElement(0, "span");
        builder.AddContent(1, "Here's the list of all files.");
        builder.CloseElement();
    };
}
```

## Dynamic Tabs

Add or remove tabs dynamically using a list:

```razor
<FluentTabs @bind-ActiveTabId="@SelectedTabId">
    @foreach (var item in Items)
    {
        <FluentTab Id="@item.Index">
            <HeaderTemplate>
                <FluentStack HorizontalGap="4px"
                             VerticalAlignment="VerticalAlignment.Center">
                    <FluentLabel>@item.Name</FluentLabel>
                    <FluentIcon Value="@(new Icons.Regular.Size12.Dismiss())"
                                OnClick="@(e => RemoveTab(item.Index))" />
                </FluentStack>
            </HeaderTemplate>
            <ChildContent>
                Tab #@item.Index: @item.Name
            </ChildContent>
        </FluentTab>
    }
</FluentTabs>

<FluentButton OnClick="AddTab" Disabled="@(Items.Count > 11)">Add</FluentButton>
```

## Key Parameters

### FluentTabs

| Parameter | Type | Description |
|-----------|------|-------------|
| `ActiveTabId` | `string?` | Two-way bindable active tab ID |
| `ActiveTab` | `FluentTab?` | Two-way bindable active tab object |
| `Appearance` | `TabsAppearance?` | Visual style |
| `Orientation` | `Orientation?` | Horizontal or vertical |
| `Size` | `TabsSize?` | Tab size |

### FluentTab

| Parameter | Type | Description |
|-----------|------|-------------|
| `Header` | `string?` | Tab header text |
| `HeaderTemplate` | `RenderFragment?` | Custom header content |
| `Disabled` | `bool` | Prevents tab selection |
| `DeferredLoading` | `bool` | Load content only on selection |
| `IconStart` | `Icon?` | Leading icon |
| `IconColor` | `Color?` | Icon color |

> [!note] No scrollable tabs yet. There are no scrolling functions when the number of tabs exceeds the container or screen width.

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — Tabs component documentation.

---
title: "DxTabs Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs"
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

## DxTabs Class

In This Article

A container that displays content within tabbed pages.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxTabs :
    DxComponent,
    ITabCollectionOwner,
    ICollectionOwner<ITab>,
    IRequireSelfCascading
```

## Remarks

The DevExpress Tabs component for Blazor (`<DxTabs>`) allows you to build tabbed interfaces in your web sites.

![Navigation Landing Tab](https://docs.devexpress.com/Blazor/images/tabs/blazor-tabs-overview.png)

[Run Demo: Tabs](https://demos.devexpress.com/blazor/Tabs)

### Add Tabs to a Project

Follow the steps below to add the Tabs component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxTabs>` … `</DxTabs>` markup to a `.razor` file.
3. Configure the component: add tabs, specify an active tab, handle tab clicks, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxTabs Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs._members).

### Static Render Mode Specifics

Blazor Tabs component does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Tabs

`<DxTabs>` is a navigation component that consists of multiple tabs. The [DxTab](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTab) class implements a tab without content. Use the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxTabBase.Text) property to specify a tab’s text.

```
<DxTabs>
    <DxTab Text="Home"></DxTab>
    <DxTab Text="Products"></DxTab>
    <DxTab Text="Support"></DxTab>
</DxTabs>
```

### Active Tab

A user should click a tab to activate it. Only one tab can be active at a time. To activate a tab in code, assign its zero-based index in the tab collection to the [ActiveTabIndex](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs.ActiveTabIndex) property. The [ActiveTabIndexChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs.ActiveTabIndexChanged) event fires when the active tab changes.

The following example updates the content area when a user selects a tab.

- [Razor](#tabpanel_uN+qYGt-cU_tabid-razor1)

```
<DxTabs @bind-ActiveTabIndex="@ActiveTabIndex" SizeMode="Params.SizeMode">
    <DxTab Text="About Us"></DxTab>
    <DxTab Text="Web Controls"></DxTab>
    <DxTab Text="Support"></DxTab>
</DxTabs>
<div class="card tabs-border-top-0 tabs-border-radius-top-0 min-h-190">
    <div class="card-body">
        @switch(ActiveTabIndex) {
            case 0:
                <h4>From 1998 to the Present</h4>
                <p>We look forward to working with you and will do everything we can to make your experience with us a profitable one.</p>
                break;
            case 1:
                <ul>
                    <li><a href="https://www.devexpress.com/products/net/controls/asp/">ASP.NET Web Forms </a></li>
                    <li><a href="https://www.devexpress.com/products/net/controls/asp/mvc/">ASP.NET MVC</a></li>
                    <li><a href="https://www.devexpress.com/products/net/controls/asp/core.xml">ASP.NET Core</a></li>
                    <li><a href="https://www.devexpress.com/products/net/controls/asp/bootstrap-webforms.xml">Bootstrap Web Forms</a></li>
                    <li><a href="https://js.devexpress.com/">JavaScript - jQuery, Angular, React, Vue</a></li>
                    <li><a href="https://www.devexpress.com/blazor/">Blazor</a></li>
                    <li><a href="https://www.devexpress.com/subscriptions/reporting/">Web Reporting</a></li>
                </ul>
                break;
            case 2:
                <p>Submit your support inquiries via the <a href="https://supportcenter.devexpress.com/">DevExpress Support Center</a> for assistance.</p>
                break;

        }
    </div>
</div>

@code {
    int ActiveTabIndex { get; set; } = 1;
}
```

![Tabs ActiveIndex](https://docs.devexpress.com/Blazor/images/tabs/blazor-tabs-activeindex.png)

[Run Demo: Tabs - Active Tab](https://demos.devexpress.com/blazor/Tabs#CustomContent)

### Tab Pages

Use the [DxTabPage](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabPage) class to create a tab page (a tab with content) within the `<DxTabs>` component.

- [Razor](#tabpanel_u2-Hxt78U7_tabid-razor2)
- [Employee](#tabpanel_u2-Hxt78U7_tabid-cs)

```
<DxTabs>
    @foreach (var employee in Employees)
    {
        <DxTabPage Text="@(employee.FirstName + ' ' +  employee.LastName)">
            <div class="media demo-tab-page-content">
                <img src="@(StaticAssetUtils.GetImagePath($"Employees/{employee.FileName}.png"))" width="125" />
                <div class="media-body pl-3">
                    <h5 class="mt-0">@employee.Title @employee.FirstName @employee.LastName</h5>
                    <p><b>Birthday:</b> @employee.BirthDate.ToShortDateString()</p>
                    <p>@employee.Notes</p>
                </div>
            </div>
        </DxTabPage>
    }
</DxTabs>
@code {
    IEnumerable<Employee> Employees;

    protected override async Task OnInitializedAsync()
    {
        Employees = (await EmployeeService.Load()).Skip(5).Take(3);
    }
}
```

![Navigation Landing Tab](https://docs.devexpress.com/Blazor/images/tabs/blazor-tabs-overview.png)

[Run Demo: Tabs- Tab Pages](https://demos.devexpress.com/blazor/Tabs#TabPage)

A tab page can include other DevExpress Blazor components. The following code creates a tab page with the [DxGrid](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid) component.

```
<DxTabs>
    <DxTabPage Text="Description">
        <div class="p-3">
            <b>7-Day Weather Forecast</b>
        </div>
    </DxTabPage>
    <DxTabPage Text="Forecast">
        <div class="py-3">
            <DxGrid Data="@Data" CustomizeElement="Grid_CustomizeElement">
                <Columns>
                    <DxGridDataColumn FieldName=@nameof(WeatherForecast.Date) />
                    <DxGridDataColumn FieldName=@nameof(WeatherForecast.TemperatureC) Caption="Temp. (C)" />
                    <DxGridDataColumn FieldName=@nameof(WeatherForecast.TemperatureF) Caption="Temp. (F)" />
                    <DxGridDataColumn FieldName="@nameof(WeatherForecast.CloudCover)" />
                    <DxGridDataColumn FieldName="@nameof(WeatherForecast.Precipitation)">
                        <CellDisplayTemplate>
                            <DxCheckBox Enabled="false" Checked="(bool)context.Value" />
                        </CellDisplayTemplate>
                    </DxGridDataColumn>
                </Columns>
            </DxGrid>
        </div>
    </DxTabPage>
</DxTabs>

@code {
    void Grid_CustomizeElement(GridCustomizeElementEventArgs args) {
        if (args.ElementType == GridElementType.DataCell && args.Column is IGridDataColumn dataColumn && dataColumn.FieldName == "Precipitation")
            args.CssClass = "p-0";
    }

    public class WeatherForecast {
        public DateTime Date { get; set; }
        public int TemperatureC { get; set; }
        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
        public string CloudCover { get; set; }
        public bool Precipitation { get; set; }
    }
    String[] CloudCover = { "Sunny", "Partly cloudy", "Cloudy", "Storm" };
    object Data;

    public Task<IEnumerable<WeatherForecast>> GetForecastAsync(CancellationToken ct = default) {
        var rng = new Random();
        DateTime startDate = DateTime.Now;
        return Task.FromResult(Enumerable.Range(1, 7).Select(index => new WeatherForecast {
            Date = startDate.AddDays(index),
            TemperatureC = rng.Next(-15, 20),
            CloudCover = CloudCover[rng.Next(0, CloudCover.Length)],
            Precipitation = Convert.ToBoolean(rng.Next(0, 2))
        }).AsEnumerable());
    }

    protected override async Task OnInitializedAsync() {
        Data = await GetForecastAsync();
    }
}
```

![Tabs With Data Grid](https://docs.devexpress.com/Blazor/images/tabs/blazor-tabs-with-grid.png)

### Tab Header Customization

#### Position

You can position tab headers relative to the component’s content. Use the [TabsPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs.TabsPosition) property to do this.

This example positions tab headers below the component:

```
<DxTabs TabsPosition="TabsPosition.Bottom">
    <DxTabPage Text="Home">
        <div class="p-2">
            The Home tab's content
        </div>
    </DxTabPage>
    <DxTabPage Text="Products">
        <div class="p-2">
            The Products tab's content
        </div>
    </DxTabPage>
    <DxTabPage Text="Support">
        <div class="p-2">
            The Support tab's content
        </div>
    </DxTabPage>
</DxTabs>
```

![Bottom tab header position](https://docs.devexpress.com/Blazor/images/tabs/blazor-tabs-tabsposition-bottom.png)

[Run Demo: Tab Position](https://demos.devexpress.com/blazor/Tabs#TabsPosition)

#### Icons

Use the [TabIconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxTabBase.TabIconCssClass) property to display an icon in the tab.

- [Razor](#tabpanel_0IFB4kpFeT_tabid-1)
- [CSS](#tabpanel_0IFB4kpFeT_tabid-2)

```
<DxTabs SizeMode="Params.SizeMode">
    <DxTab Text="Home" TabIconCssClass="tabs-icon-home tabs-icon"></DxTab>
    <DxTab Text="Products" TabIconCssClass="tabs-icon-products tabs-icon"></DxTab>
    <DxTab Text="Support" TabIconCssClass="tabs-icon-support tabs-icon"></DxTab>
</DxTabs>
```

![Tabs Icons](https://docs.devexpress.com/Blazor/images/tabs/blazor-tabs-icon.png)

#### Template

Use the [TabTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxTabBase.TabTemplate) property to customize a tab’s appearance.

- [Razor](#tabpanel_gdYvUK3S08_tabid-1)
- [CSS](#tabpanel_gdYvUK3S08_tabid-2)

```
<DxTabs>
    <DxTab>
        <TabTemplate>
            <div class="tab-container">Custom Tab</div>
        </TabTemplate>
    </DxTab>
    <DxTab Text="Regular Tab" />
</DxTabs>
```

![Tabs Template](https://docs.devexpress.com/Blazor/images/tabs/blazor-tabs-template.png)

[Run Demo: Tabs](https://demos.devexpress.com/blazor/Tabs)

### Handle Tab Clicks

Use the [DxTabs.TabClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs.TabClick) and [DxTabBase.Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxTabBase.Click) events to handle tab clicks. The following code snippet specifies a common click handler for all tabs.

```
<DxTabs TabClick="OnTabClick">
    <DxTab Text="Home"></DxTab>
    <DxTab Text="Products"></DxTab>
    <DxTab Text="Support"></DxTab>
</DxTabs>

@ClickedTab

@code  {
    public string ClickedTab { get; set; } = "";

    void OnTabClick(TabClickEventArgs e) {
        ClickedTab = $"Tab '{e.TabIndex}' has been clicked";
    }
}
```

![Tab Click](https://docs.devexpress.com/Blazor/images/tabs/blazor-tabs-common-click.png)

### Tab Render Mode

Use the [RenderMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs.RenderMode) property to specify how the `DxTabs` component loads tab content.

```
<DxTabs RenderMode="TabsRenderMode.Default">
    <!-- ... -->
</DxTabs>
```

Render modes include:

Default

The DxTabs component initially only loads the content of an active tab. When a user selects another tab, its content replaces the content of the previously active tab in the DOM. Note the DxTabs component does not store the state of tabs.

AllTabs

DxTabs renders the content of all tabs in the DOM and maintains the tab’s state. This mode speeds up navigation between tabs but it can increase memory consumption.

OnDemand

The component initially loads content of an active tab and then loads the content of other tabs when a user selects them. In this case, the component retains the state of the tabs. Use this mode to improve application performance.

### Tab Scroll Mode

Use the [ScrollMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs.ScrollMode) property to specify how users navigate between tabs when they do not fit the container’s width.

```
<DxTabs ScrollMode="TabsScrollMode.NavButtons">
    <!-- ... -->
</DxTabs>
```

Scroll modes include:

Auto (default value)

This scroll mode automatically adapts to the device type. Mobile and tablet devices use `Swipe` mode. Desktop devices use `NavButtons` mode.

NavButtons

The container displays tabs that fit the width. Users can navigate to other tabs in the following ways: use the navigation buttons; hover the cursor over a tab with the `Shift` key pressed and scroll the mouse wheel; or swipe (mobile devices only).

Swipe

The container displays a few tabs that fit the width. To navigate to other tabs, users can swipe tabs, or hover the mouse pointer over the container, hold the `Shift` key, and scroll the mouse wheel.

NoScroll

Users cannot scroll tabs. The tabs that do not fit the container’s width are moved to a new line.

### Tab Closing

Enable a tab’s [AllowClose](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxTabBase.AllowClose) property to let users close the tab in the following ways:

- Click the **Close** button in the tab header.
- Press the Delete key.

Before closing a tab, the component raises the [TabClosing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs.TabClosing) event. This event allows you to get information about the tab being processed ([TabInfo](https://docs.devexpress.com/Blazor/DevExpress.Blazor.TabCloseEventArgs.TabInfo)) identify the action that raised the event ([CloseReason](https://docs.devexpress.com/Blazor/DevExpress.Blazor.TabCloseEventArgs.CloseReason)) and cancel the action if necessary ([Cancel](https://learn.microsoft.com/dotnet/api/system.componentmodel.canceleventargs.cancel#system-componentmodel-canceleventargs-cancel)).

```
<DxTabs>
    @foreach (var employee in Employees) {
        <DxTabPage Text="@employee.Name" AllowClose="true">...</DxTabPage>
    }
</DxTabs>
```

![Tabs with close buttons](https://docs.devexpress.com/Blazor/images/tabs/blazor-tabs-close-buttons.png)

[Run Demo: Tabs - Scroll Mode](https://demos.devexpress.com/blazor/Tabs#TabsPosition)

### Drag and Drop Tabs

Enable the [AllowTabReorder](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs.AllowTabReorder) property to allow users to reorder tabs by dragging them to a desired position. Once a user drops a tab to a new position, the component raises the [TabReordering](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTabs.TabReordering) event.

```
<DxTabs AllowTabReorder="true">
    @foreach(var employee in Employees) {
        <DxTabPage Text="@employee.Name" AllowClose="true">...</DxTabPage>
    }
</DxTabs>
```

### Keyboard Navigation

The DevExpress Blazor Tabs component supports keyboard shortcuts that allow users to navigate through tabs. Keyboard navigation is implemented on the client and server.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab,   Shift + Tab | Focuses the Tabs or moves focus to the next or previous focusable page element.   **Within a template:** Moves focus between nested focusable elements. After the first/last element, exits nested object navigation. |
| Right Arrow | **For top or bottom tab position:** Moves focus to the next visible tab. After the last tab, moves focus to the first tab. |
| Left Arrow | **For top or bottom tab position:** Moves focus to the previous visible tab. After the first tab, moves focus to the last tab. |
| Down Arrow | **For left or right tab position:** Moves focus to the next visible tab. After the last tab, moves focus to the first tab. |
| Up Arrow | **For left or right tab position:** Moves focus to the previous visible tab. After the first tab, moves focus to the last tab. |
| Delete | Closes the tab. |
| Enter | **For a templated tab:** Moves focus to the first focusable element within a template. |
| Esc | **For a templated tab:** Exits nested object navigation. |
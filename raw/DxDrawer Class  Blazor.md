---
title: "DxDrawer Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer"
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

## DxDrawer Class

In This Article

A side panel that supports minimized layout and expand/collapse operations.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxDrawer :
    DxComponentBase
```

## Remarks

The DevExpress Drawer for Blazor (`<DxDrawer>`) allows you to add a side panel to your application. Use this panel to host navigation controls or display additional information about the current view.

![Blazor Drawer Overview](https://docs.devexpress.com/Blazor/images/drawer/blazor-drawer-overlap-with-shading.png)

[Run Demo](https://demos.devexpress.com/blazor/Drawer)

### Add a Drawer to a Project

Follow the steps below to add the Drawer component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxDrawer>` … `</DxDrawer>` markup to a `.razor` file.
3. Add drawer panel content in the [BodyTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.BodyTemplate) markup. For instance, you can add a [DxMenu](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMenu) component to implement a navigation side panel.
4. *Optional.* Define the drawer’s [HeaderTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.HeaderTemplate) and [FooterTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.FooterTemplate).
5. Specify the component’s target content ([TargetContent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.TargetContent)).
6. Write code that manages the Drawer’s.

### API Reference

Refer to the following list for the component API reference: [DxDrawer Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer._members).

### Component Structure

The `DxDrawer` component consists of a drawer panel and a target content area. The drawer panel can include header, body, and footer. If a header or footer is not specified, the body occupies the free space.

```
<DxDrawer IsOpen="true" >
    <HeaderTemplate>Header Template</HeaderTemplate>
    <BodyTemplate>Body Template</BodyTemplate>
    <FooterTemplate>Footer Template</FooterTemplate>
    <TargetContent>Target Content</TargetContent>
</DxDrawer>
```

![Drawer layout](https://docs.devexpress.com/Blazor/images/drawer/blazor-drawer-layout.png)

### Drawer Visibility

The `DxDrawer` component allows you to implement different visibility scenarios.

#### Permanently Visible Drawer

Set the [IsOpen](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.IsOpen) property to `true` to display the drawer permanently.

```
<DxDrawer IsOpen="true" PanelWidth="20%">
    ...
</DxDrawer>
```

![Permanently Visible Drawer](https://docs.devexpress.com/Blazor/images/drawer/blazor-drawer-visibility-permanent.png)

#### Expandable Drawer

1. Add an element that toggles drawer visibility.
2. Implement [two-way binding](https://docs.devexpress.com/Blazor/402330/common-concepts/data-binding/two-way-data-binding) for the [IsOpen](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.IsOpen) property to show the drawer in code.

```
<DxButton Click="OnClick" IconCssClass="tb-icon icon-hamburger" 
    RenderStyleMode="ButtonRenderStyleMode.Outline" />

<DxDrawer @bind-IsOpen="IsOpen" PanelWidth="20%">
    ...
</DxDrawer>

@code {
    bool IsOpen { get; set; } = true;
    void OnClick() {
        IsOpen = !IsOpen;
    }
}
```

![Expandable Drawer](https://docs.devexpress.com/Blazor/images/drawer/blazor-drawer-visibility-expandable.gif)

#### Minimized Drawer

Enable the [MiniModeEnabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.MiniModeEnabled) property to change drawer width instead of closing. Use the [MiniPanelWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.MiniPanelWidth) property to specify the width of the minimized panel.

[Run Demo: Responsive Drawer](https://demos.devexpress.com/blazor/Drawer#Mini)

![Drawer in the right position](https://docs.devexpress.com/Blazor/images/drawer/blazor-drawer-mini-mode.gif)

#### Responsive Drawer

Combine `DxDrawer` and [DxLayoutBreakpoint](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint) components to adapt page layout to different devices. For instance, you can use the `XSmall` breakpoint to change drawer settings for small screens.

[Run Demo: Responsive Drawer](https://demos.devexpress.com/blazor/Drawer#Responsive)

```
<DxLayoutBreakpoint DeviceSize="DeviceSize.XSmall" IsActive="isXSmallScreen" IsActiveChanged="IsActiveChanged" />
<DxButton Click="OnClick" IconCssClass="tb-icon icon-hamburger" />

<DxDrawer IsOpen="IsOpen" PanelWidth="180px">
    ...
</DxDrawer>
@code {
    bool isXSmallScreen;
    bool? isOpen;
    bool IsOpen {
        // Hide the Drawer on small screens initially and display it on large screens
        get => isOpen ?? !isXSmallScreen;
        set => isOpen = value;
    }
    // Apply Overlap and Shrink modes on small and large screens, respectively
    DrawerMode Mode => isXSmallScreen ? DrawerMode.Overlap : DrawerMode.Shrink;

    void IsActiveChanged(bool isActive) {
        isXSmallScreen = isActive;
        isOpen = null;
    }
    void OnClick() {
        IsOpen = !IsOpen;
    }
}
```

### Static Render Mode Specifics

The `DxDrawer` component requires [interactive render mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode) to change its [IsOpen](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.IsOpen) state. In static SSR mode, you can use a or implement one of the following strategies to dynamically change drawer visibility.

#### Add Query Params to Control Drawer Visibility

- Use the [\[SupplyParameterFromQuery\]](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.supplyparameterfromqueryattribute?view=aspnetcore-8.0) attribute to specify that the drawer’s [IsOpen](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.IsOpen) parameter comes from the query string.
- Use the query parameter to toggle drawer visibility or to save the component state while navigating to another page.

```
<DxDrawer PanelWidth="240px" IsOpen="@IsOpen">
    <BodyTemplate>
        <DxMenu Orientation="@Orientation.Vertical">
            <Items>
                <DxMenuItem Text="Home" NavigateUrl="@GetUrlWithParameter("/")" IconCssClass="icon-home" />
                <DxMenuItem Text="Weather" NavigateUrl="@GetUrlWithParameter("weather")" IconCssClass="icon-weather" />
            </Items>
        </DxMenu>
    </BodyTemplate>
    <TargetContent>
        <div class="top-row">
            @* Toggle button that controls drawer visibility *@
            <NavLink href="@(new Uri(NavigationManager.Uri).LocalPath + "?IsOpen=" + (!IsOpen).ToString())">
                <img src="images/menu.svg" alt="Toggle Drawer">
            </NavLink>
        </div>
        @Body
    </TargetContent>
</DxDrawer>

@code {
    [SupplyParameterFromQuery]
    public bool IsOpen { get; set; }

    string GetUrlWithParameter(string url) {
        // Save drawer visibility state while navigating
        return url + "?IsOpen=" + IsOpen.ToString();
    }
}
```

This approach is used within DevExpress Blazor [project templates](https://docs.devexpress.com/Blazor/401057/get-started).

#### Specify CSS Rules to Control Drawer Visibility

Switch drawer visibility (set width to zero) based on toggle element state.

- [Razor](#tabpanel_hNB-cteEAV_drawer-visibility-razor)
- [CSS](#tabpanel_hNB-cteEAV_drawer-visibility-css)

```
<DxDrawer PanelWidth="240px" IsOpen="@true">
    <BodyTemplate>
        <DxMenu Orientation="@Orientation.Vertical">
            <Items>
                <DxMenuItem Text="Home" NavigateUrl="/" IconCssClass="icon-home" />
                <DxMenuItem Text="Weather" NavigateUrl="weather" IconCssClass="icon-weather" />
            </Items>
        </DxMenu>
    </BodyTemplate>
    <TargetContent>
        <div class="top-row">
            <input type="checkbox" title="Toggle Drawer" class="navbar-toggler icon-menu" checked />
        </div>
        @Body
    </TargetContent>
</DxDrawer>
```

[View Example: Responsive Drawer in Static SSR Mode](https://github.com/DevExpress-Examples/blazor-drawer-static-ssr)

### Drawer Position

Use the [Position](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.Position) property to specify the drawer position relative to the target content.

[Run Demo: Drawer Position and Mode](https://demos.devexpress.com/blazor/Drawer#Position)

```
<DxDrawer IsOpen="IsOpen" Position="DrawerPosition.Right" PanelWidth="20%">
    <BodyTemplate>
        <DxMenu Orientation="Orientation.Vertical">
            <Items>
                <DxMenuItem Text="Home" IconCssClass="menu-icon-home menu-icon" />
                <DxMenuItem Text="Components" IconCssClass="menu-icon-products menu-icon" />
                <DxMenuItem Text="Support" IconCssClass="menu-icon-support menu-icon" />
                <DxMenuItem Text="Contacts" IconCssClass="menu-icon-contacts menu-icon" />
                <DxMenuItem Text="About" IconCssClass="menu-icon-about menu-icon" />
            </Items>
        </DxMenu>
    </BodyTemplate>
    <TargetContent>
        @* Lorem ipsum dolor sit amet, consectetur adipiscing elit ... *@
    </TargetContent>
</DxDrawer>
```

### Drawer Open Mode

When the drawer panel opens, it can overlap or shrink target content. Use the [Mode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.Mode) property to specify how the panel interacts with the target content area.

[Run Demo: Drawer - Position and Mode](https://demos.devexpress.com/blazor/Drawer#Position)

```
<DxDrawer IsOpen="IsOpen" Mode="DrawerMode.Overlap" PanelWidth="20%">
    <BodyTemplate>
        <DxMenu Orientation="Orientation.Vertical">
            <Items>
                <DxMenuItem Text="Home" IconCssClass="menu-icon-home menu-icon" />
                <DxMenuItem Text="Components" IconCssClass="menu-icon-products menu-icon" />
                <DxMenuItem Text="Support" IconCssClass="menu-icon-support menu-icon" />
                <DxMenuItem Text="Contacts" IconCssClass="menu-icon-contacts menu-icon" />
                <DxMenuItem Text="About" IconCssClass="menu-icon-about menu-icon" />
            </Items>
        </DxMenu>
    </BodyTemplate>
    <TargetContent>
        @* Lorem ipsum dolor sit amet, consectetur adipiscing elit ... *@
    </TargetContent>
</DxDrawer>
```

### Drawer Appearance

The `DxDrawer` component allows you to customize its appearance with the following properties:

[CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.CssClass)

Assigns a CSS class to the `DxDrawer` component.

[ClosedCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.ClosedCssClass)

Assigns a CSS class to the Drawer component when the panel is closed.

[MiniCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.MiniCssClass)

Assigns a CSS class to the Drawer component when the panel is minimized.

[OpenCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.OpenCssClass)

Assigns a CSS class to the Drawer component when the panel is open.

### Accessibility Information

In [overlap](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.Mode) mode, the Drawer component is assigned the [dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/dialog_role) and [aria-modal](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-modal) attribute. This informs assistive technologies that the component is separate from the rest of the page, and the content outside the Drawer is inactive while it is open.

To ensure a component is fully accessible, it must be labeled correctly. The label depends on your application’s content and cannot be set automatically. Pass the following [ARIA attributes](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility#wai-aria-attributes) to the Drawer’s [Attributes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.Attributes) property:

- [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-labelledby) – Reference the ID of another element on the page (usually a visible header) that defines the accessible name. This is the preferred method.
- [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) – Specify a string value that is used as the accessible name. Use this when a header element is not present in the Drawer.

```
<DxDrawer IsOpen="true"
          Mode="DrawerMode.Overlap"
          aria-label="Navigation">
    <BodyTemplate>
        @* ... *@
    </BodyTemplate>
    <TargetContent>
        @* ... *@
    </TargetContent>
</DxDrawer>
```

## Inheritance

See Also

[DxDrawer Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer._members)
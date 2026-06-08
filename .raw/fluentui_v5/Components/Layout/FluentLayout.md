---
title: Layout
route: /Layout
icon: ContentViewGallery
---

# Layout

`FluentLayout` is a component that defines a layout for a page, using a grid composed of a **Header**, a **Footer**
and 3 columns: **Navigation**, **Content** and **Aside** panes.

<table class="layout-schema">
  <tr>
    <td colspan="3">Header</td>
  </tr>
  <tr>
    <td>Navigation</td>
    <td style="width: 100%; height: 60px;">Content</td>
    <td>Aside</td>
  <tr>
    <td colspan="3">Footer</td>
  </tr>
</table>

For mobile devices (< 768px), the layout is a single column with the **Navigation**, the **Content** and the **Footer** panes stacked vertically.

<table class="layout-schema">
  <tr>
    <td>Header</td>
  </tr>
  <tr>
    <td style="width: 100%; height: 60px;">Content</td>
  <tr>
    <td>Footer</td>
  </tr>
</table>

The mobile breakpoint is defined in the `FluentLayout` component using the `MobileBreakdownWidth` parameter.
By default, it is set to `768px`.

This breakpoint is based on the FluentLayout component width (not the screen width)
using the [@container](https://developer.mozilla.org/en-US/docs/Web/CSS/@container) CSS rule.

Each time the breakpoint is reached, the layout will be updated to reflect the new layout, and the event `OnBreakpointEnter` will be triggered.

[!TIP] The `FluentLayout` component can be used with a Blazor static web app or a Blazor interactive app.
The hamburger Navigation is available in all modes, but the event `OnBreakpointEnter` and the `NavigationDeferredLoading` parameter are only available in "interactive mode".

## Sticky Panels

  All panels (except `Content`) can be fixed using the `Sticky` parameter.  
  In this case, the panel remains fixed when the page is scrolled.

## Hamburger Navigation

  **On mobile device only** (<768 px) the **Navigation** pane will be collapsed into a hamburger Navigation.
  The hamburger button is displayed when the screen width is less than 768px.

  💡 You can "force" the visibility of the hamburger button using
  the `FluentLayoutHamburger.Visible="true"` parameter.

  By default, on mobile, the Navigation is hidden and a hamburger button is displayed to make it appear or disappear.
  or make it disappear. Once displayed, this Navigation takes a large part of the screen width.
  This is configurable using the `FluentLayoutHamburger.PanelSize` parameter.

  To use this Hamburger icon, you need to add the `FluentLayoutHamburger` component to the **Header**.

  ```razor
  <FluentLayoutItem Area="@LayoutArea.Header">
    <FluentLayoutHamburger />
    My company
  </FluentLayoutItem>
  ```

When you have navigation elements that can be used from the **FluentLayoutHamburger**, you must intercept
these elements to close/hide the **Hamburger** Navigation when you want to. For example

```razor
@inject NavigationManager NavigationManager

<FluentLayoutHamburger @ref="_hamburger">
    <FluentLink OnClick="@(e => GoToPageAsync("/page1"))">Page 1</FluentLink>
    <FluentLink OnClick="@(e => GoToPageAsync("/page2"))">Page 2</FluentLink>
</FluentLayoutHamburger>

@code
{
    private FluentLayoutHamburger? _hamburger;

    private async Task GoToPageAsync(string page)
    {
        NavigationManager.NavigateTo(page);

        if (Hamburger is not null)
        {
            await Hamburger.HideAsync();
        }
    }
}
```

## Customized Hamburger Navigation

By default, the hamburger Navigation contains the **Navigation** FluentLayoutItem.
This hamburger Navigation can be customized using some parameters like the `ChildContent` for the panel content,
the `PanelHeader` for the header/title content, the `PanelSize` for the panel width and the `PanelPosition` for the panel position (left or right).

If `ChildContent` is not defined, the Navigation content will be used.
It is then generated **twice** in the HTML code, once for the Navigation and once for the hamburger panel.
If your Navigation is very large, it is best to set the `FluentLayout.NavigationDeferredLoading` parameter to `true`.
In this case, Blazor will generate the content in the Navigation area in Desktop mode and then remove it from the DOM to place it in the hamburger panel in mobile mode.
This parameter `NavigationDeferredLoading` is only available in Blazor "interactive mode".

## Example

Using the `GlobalScrollbar="true"` parameter, you can set the scrollbar to be global for the entire page.  
Using the `Sticky` paremeter to fix the header and footer.

> TODO: When `GlobalScrollbar=“true”`, a problem persists with the fixed footer.

{{ LayoutDefault }}

You can set the **Header** and **Footer** using the `Sticky` parameter,

## CSS Variables

To make it easier to customize your sub-components, you can use these CSS variables,
whose default values are as follows.

You can adapt them using the `Height` parameter of the `FluentLayout`,
`FluentLayoutItem` with `Area="LayoutArea.Header"`, `Area="LayoutArea.Content"` and `Area="LayoutArea.Footer"`.

```css
--layout-height: 100dvh;
--layout-header-height: 44px;
--layout-footer-height: 36px;
--layout-body-height: calc(var(--layout-height) - var(--layout-header-height) - var(--layout-footer-height));
```

## Standard Layout (header, navigation and footer)

This example demonstrates a classic layout commonly used in most websites. It includes a **header** at the top with a hamburger menu toggle and the application title, a collapsible **navigation panel** on the side with links to different pages, a **content** area that renders the current page body, and a **footer** at the bottom for branding or copyright information.

Simply copy the code below into your Blazor **layout page** and replace the `@Body` element with this code example. That's it!

<table class="layout-schema">
  <tr>
    <td colspan="3">Header</td>
  </tr>
  <tr>
    <td>Nav</td>
    <td colspan="2" style="width: 100%; height: 60px;">Content</td>
  <tr>
    <td colspan="3">Footer</td>
  </tr>
</table>

```razor
<FluentLayout>

    <!-- Header -->
    <FluentLayoutItem Area="@LayoutArea.Header">
        <FluentStack VerticalAlignment="VerticalAlignment.Center">
            <FluentLayoutHamburger />
            <FluentText Weight="TextWeight.Bold"
                        Size="TextSize.Size400">
                My application
            </FluentText>
        </FluentStack>
    </FluentLayoutItem>

    <!-- Navigation -->
    <FluentLayoutItem Area="@LayoutArea.Navigation"
                      Width="250px">

        <FluentNav Padding="@Padding.All2"
                   Style="height: 100%;">
            <FluentNavItem Href="/"
                           Match="NavLinkMatch.All"
                           IconRest="@(new Icons.Regular.Size20.Home())">
                Home
            </FluentNavItem>
            <FluentNavItem Href="/counter"
                           IconRest="@(new Icons.Regular.Size20.RemixAdd())">
                Counter
            </FluentNavItem>
            <FluentNavItem Href="/weather"
                           IconRest="@(new Icons.Regular.Size20.WeatherRainShowersDay())">
                Weather
            </FluentNavItem>
        </FluentNav>

    </FluentLayoutItem>

    <!-- Content -->
    <FluentLayoutItem Area="@LayoutArea.Content"
                      Padding="@Padding.All3">
        @Body
    </FluentLayoutItem>

    <!-- Footer -->
    <FluentLayoutItem Area="@LayoutArea.Footer">
        Powered by Microsoft Fluent UI Blazor @DateTime.Now.Year
    </FluentLayoutItem>

</FluentLayout>
```

## API FluentLayout

{{ API Type=FluentLayout }}

## API FluentLayoutItem

{{ API Type=FluentLayoutItem }}

## API FluentLayoutHamburger

{{ API Type=FluentLayoutHamburger }}

<style>
  .layout-schema {
    margin-left: 50px;
    max-width: 300px;
  }

  .layout-schema td {
    text-align: center;
    vertical-align: middle;
    border: 1px solid var(--colorNeutralStroke1);
    min-width: 65px;
  }
  .layout-schema tr:first-child {
    background-color: var(--colorBrandBackgroundHover);
    color: var(--colorNeutralForegroundOnBrand);
  }

  .layout-schema tr:last-child {
    background-color: var(--colorNeutralBackgroundDisabled);
    color: var(--colorNeutralForeground1);
  }

</style>

## Migrating to v5

{{ INCLUDE File=MigrationFluentLayout }}

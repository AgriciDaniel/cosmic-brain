---
source_url: https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxToolbar
fetched: 2026-05-25
fetch_method: web_search
fetch_note: >
  Direct fetch blocked by Cloudflare anti-bot protection (HTTP 403).
  Content reconstructed from web search results covering the official
  DevExpress Blazor DxToolbar API documentation.
---

# DevExpress Blazor DxToolbar Component

The `DxToolbar` is a navigation and actions component in the DevExpress Blazor UI suite. It organizes commands, buttons, and menus in a horizontal bar and supports both unbound (declarative Items collection) and bound (Data property with DataMappings) modes.

## DxToolbar Properties

| Property | Type | Description |
|---|---|---|
| `AdaptivityAutoCollapseItemsToIcons` | bool | Hides root items' text when browser width changes, showing only icons |
| `AdaptivityAutoHideRootItems` | bool | Hides root-level items when browser width changes, combining them into a root submenu |
| `AdaptivityMinRootItemCount` | int | Minimum number of root items shown when window is resized |
| `CssClass` | string | CSS class applied to the component's root element |
| `DropDownDisplayMode` | DropDownDisplayMode | How drop-down items display: sub-menu, modal dialog, or modal bottom sheet |
| `ItemRenderStyleMode` | ToolbarRenderStyleMode | Common color/filling type for all toolbar items (e.g., Plain, Contained) |
| `Items` | RenderFragment | Declarative collection of DxToolbarItem components |
| `SizeMode` | SizeMode | Controls size of toolbar and inner components (replaces obsolete `ItemSizeMode`) |
| `Title` | string | Toolbar title text |
| `TitleTemplate` | RenderFragment | Custom template for the toolbar title area |
| `Data` | IEnumerable | Data source for bound mode (flat or hierarchical) |

## DxToolbar Events

| Event | Type | Description |
|---|---|---|
| `ItemClick` | EventCallback\<ToolbarItemClickEventArgs\> | Fires when any toolbar item is clicked; `args.ItemName` identifies which item |

## DxToolbarItem Properties

Each item in the toolbar is a `DxToolbarItem`:

| Property | Type | Description |
|---|---|---|
| `Text` | string | Display text |
| `IconCssClass` | string | CSS class for the icon (e.g., Open Iconic classes) |
| `IconUrl` | string | URL for icon image |
| `BeginGroup` | bool | Creates a visual separator/group before this item |
| `Alignment` | ToolbarItemAlignment | Start or End positioning |
| `Enabled` | bool | Whether the item is interactive |
| `Visible` | bool | Whether the item is rendered |
| `Checked` | bool | Checked state for toggle/radio behavior |
| `GroupName` | string | Logical group for radio-button behavior (items with same GroupName are mutually exclusive) |
| `NavigateUrl` | string | URL for navigation; renders item as hyperlink |
| `Target` | string | Target attribute for NavigateUrl link |
| `Tooltip` | string | Tooltip text |
| `CssClass` | string | Custom CSS class |
| `Attributes` | Dictionary\<string, object\> | Additional HTML attributes |
| `RenderStyle` | ToolbarItemRenderStyle | Predefined appearance style |
| `RenderStyleMode` | ToolbarRenderStyleMode | How the render style is applied |
| `DropDownDisplayMode` | DropDownDisplayMode | Per-item override for dropdown display |
| `SplitDropDownButton` | bool | Splits dropdown toggle from primary click area |
| `ChildContent` | RenderFragment | Child content (for items without Items collection) |
| `Template` | RenderFragment | Custom template for full item content |
| `Items` | RenderFragment | Collection of child DxToolbarItem objects (creates sub-menu) |
| `Name` | string | Unique identifier; surfaced in ItemClick's ToolbarItemClickEventArgs |
| `AdaptivePriority` | int | Order in which items are hidden during adaptive resize (lower = hidden first) |
| `CloseMenuOnClick` | bool | Whether sub-menu closes when an item is clicked |
| `SubmitFormOnClick` | bool | Whether the item can submit a form |

## DxToolbarItem Events

| Event | Type | Description |
|---|---|---|
| `Click` | EventCallback\<MouseEventArgs\> | Fires when the item is clicked |
| `CheckedChanged` | EventCallback\<bool\> | Fires when Checked state changes |

## DxToolbarItemBase

Base class for all toolbar items. Namespace: `DevExpress.Blazor.Base`. Assembly: `DevExpress.Blazor.v24.2.dll`.

Key inherited members: `CssClass`, `Visible`, `Enabled`, `Attributes`.

## Data Binding

Bound mode uses `Data` property with `<DataMappings>`:

- `<DxToolbarDataMapping>` maps data source fields to component properties
- Mappable fields: `Text`, `Key`, `ParentKey`, `Children`, `Checked`, `IconCssClass`, `Enabled`, `Visible`, etc.
- **Flat data**: requires `Key` + `ParentKey` mappings
- **Hierarchical data**: requires `Children` mapping

## Adaptivity

Three adaptivity mechanisms for responsive behavior:
1. `AdaptivityAutoCollapseItemsToIcons` — hides text, keeps icons
2. `AdaptivityAutoHideRootItems` — combines root items into overflow menu
3. `AdaptivePriority` (per-item) — controls collapse order

## Render Styles

Items support predefined render styles via `RenderStyle` and `RenderStyleMode` properties. The toolbar-level `ItemRenderStyleMode` sets a default for all items (e.g., `ToolbarRenderStyleMode.Plain` for unpainted items, `Contained` for filled backgrounds).

## Code Examples

### Basic Toolbar with Click Handlers

```razor
<DxToolbar ItemRenderStyleMode="ToolbarRenderStyleMode.Plain">
    <DxToolbarItem Text="Add" BeginGroup="true"
                   Click="@OnAddClick" IconCssClass="oi oi-plus" />
    <DxToolbarItem Text="Edit"
                   Click="@OnEditClick" IconCssClass="oi oi-pencil"
                   Enabled="@IsEnabled" />
    <DxToolbarItem Text="Delete"
                   Click="@OnDeleteClick" IconCssClass="oi oi-x"
                   Enabled="@IsEnabled" />
</DxToolbar>

@code {
    private bool IsEnabled { get; set; } = true;
    private void OnAddClick() { /* ... */ }
    private void OnEditClick() { /* ... */ }
    private void OnDeleteClick() { /* ... */ }
}
```

### Drop-Down Items with Split Button

```razor
<DxToolbar>
    <DxToolbarItem Text="Actions" Enabled="true">
        <Items>
            <DxToolbarItem Text="New Item" Click="@OnNewItemClick" />
            <DxToolbarItem Text="Open" Click="@OnOpenClick" />
            <DxToolbarItem BeginGroup="true">
                <Template>
                    <button class="btn btn-primary" @onclick="@CustomAction">
                        Custom Button
                    </button>
                </Template>
            </DxToolbarItem>
        </Items>
    </DxToolbarItem>
</DxToolbar>
```

### Checked Items & Radio Groups

```razor
<DxToolbar>
    <DxToolbarItem Text="Left" GroupName="alignment"
                   Checked="@isLeftChecked"
                   CheckedChanged="@((bool v) => isLeftChecked = v)" />
    <DxToolbarItem Text="Center" GroupName="alignment"
                   Checked="@isCenterChecked"
                   CheckedChanged="@((bool v) => isCenterChecked = v)" />
    <DxToolbarItem Text="Right" GroupName="alignment"
                   Checked="@isRightChecked"
                   CheckedChanged="@((bool v) => isRightChecked = v)" />
</DxToolbar>

@code {
    private bool isLeftChecked = true;
    private bool isCenterChecked = false;
    private bool isRightChecked = false;
}
```

### Data Binding (Flat Data Source)

```razor
<DxToolbar Data="@ToolbarItems" ItemClick="@OnItemClicked">
    <DataMappings>
        <DxToolbarDataMapping Text="ValueName"
                               Key="Id"
                               ParentKey="ParentId" />
    </DataMappings>
</DxToolbar>

@code {
    private List<ToolbarDataItem> ToolbarItems { get; set; } = new()
    {
        new() { Id = 1, ParentId = null, ValueName = "File" },
        new() { Id = 2, ParentId = 1, ValueName = "New" },
        new() { Id = 3, ParentId = 1, ValueName = "Open" },
        new() { Id = 4, ParentId = null, ValueName = "Edit" },
    };

    private void OnItemClicked(ToolbarItemClickEventArgs args)
    {
        Console.WriteLine($"Clicked: {args.ItemName}");
    }

    public class ToolbarDataItem
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string ValueName { get; set; }
    }
}
```

### ItemClick Central Handler

```razor
<DxToolbar ItemClick="@OnToolbarItemClicked">
    <DxToolbarItem Name="btnNew" Text="New" />
    <DxToolbarItem Name="btnSave" Text="Save" />
    <DxToolbarItem Name="btnDelete" Text="Delete" />
</DxToolbar>

@code {
    private void OnToolbarItemClicked(ToolbarItemClickEventArgs args)
    {
        switch (args.ItemName)
        {
            case "btnNew": /* Handle New */ break;
            case "btnSave": /* Handle Save */ break;
            case "btnDelete": /* Handle Delete */ break;
        }
    }
}
```

### Custom Template in ToolbarItem

```razor
<DxToolbar>
    <DxToolbarItem>
        <Template>
            <DxUpload Name="fileUpload"
                      UploadUrl="/api/Upload"
                      UploadMode="UploadMode.Instant"
                      ShowFileList="true" />
            <button class="btn btn-success" type="button">Upload File</button>
        </Template>
    </DxToolbarItem>
</DxToolbar>
```

## Localization

Built-in satellite assemblies for German, Spanish, Japanese. Custom localization via DevExpress Localization Service.

## Version

Documentation covers v24.2 (2024 major release). `ItemSizeMode` is obsolete in favor of `SizeMode`.

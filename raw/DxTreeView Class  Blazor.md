---
title: "DxTreeView Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView#select-nodes"
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

## DxTreeView Class

In This Article

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxTreeView :
    DxComponent,
    IRequireSelfCascading,
    IModelWrapper<ITreeViewModel>
```

## Remarks

The DevExpress TreeView component for Blazor (`<DxTreeView>`) displays hierarchical data structures within a tree-like UI. The component implements navigation within a web application.

![Blazor Navigation Landing TreeView](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-overview.png)

[Run Demo: TreeView](https://demos.devexpress.com/blazor/TreeView)

### Add a TreeView to a Project

Follow the steps below to add the TreeView component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxTreeView></DxTreeView>` markup to a `.razor` file.
3. Configure the component: or, events, enable, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxTreeView Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView._members).

### Add Nodes (Unbound Mode)

In unbound mode, you should create a node hierarchy in the markup. A [DxTreeViewNode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode) class instance implements a node. The [DxTreeView.Nodes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.Nodes) collection declares root nodes. Each node can have its own collection of child nodes – [DxTreeViewNode.Nodes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.Nodes).

For each node, you can specify the following settings:

[Name](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.Name)

Specifies the unique identifier name for the current node.

[Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.Text)

Specifies the node text content.

[IconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.IconCssClass)

Specifies the CSS class of the icon displayed by the node.

[NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.NavigateUrl)

Specifies the navigation location for the node.

```
<DxTreeView>
  <Nodes>
    <DxTreeViewNode Name="Overview" Text="Overview" NavigateUrl="https://demos.devexpress.com/blazor/" />
    <DxTreeViewNode Name="Editors" Text="Data Editors" Expanded="true">
      <Nodes>
        <DxTreeViewNode Text="Combobox" NavigateUrl="https://demos.devexpress.com/blazor/ComboBox" />
        <DxTreeViewNode Text="Spin Edit" NavigateUrl="https://demos.devexpress.com/blazor/SpinEdit" />
      </Nodes>
    </DxTreeViewNode>
    <DxTreeViewNode Name="FormLayout" Text="Form Layout" BadgeText="Upd" 
                    NavigateUrl="https://demos.devexpress.com/blazor/FormLayout" />
    <DxTreeViewNode Name="TreeView" Text="TreeView" BadgeText="New"
                    NavigateUrl="https://demos.devexpress.com/blazor/TreeView" />
  </Nodes>
</DxTreeView>
```

![TreeView Nodes](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-nodes.png)

### Bind to Data (Bound Mode)

You can populate the TreeView component with items from a data source.

Follow the steps below to bind TreeView to data:

1. Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.Data) property to specify a data source. You can use different collection types:
	- Flat data (a collection of items organized as a single-level structure)
		- Hierarchical data (a collection of nested nodes)
2. Add the [DataMappings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.DataMappings) tag to the component’s markup.
3. Create the [DxTreeViewDataMapping](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewDataMapping) instance and map [node properties](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewDataMapping._members) ([HasChildren](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxTreeViewDataMappingBase.HasChildren), [IconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxNavigationDataMappingBase-1.IconCssClass), and so on) to data source fields. Mappings are used to assign data from the source collection to the component’s data model.
	- For flat data collections, use the [Key](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Key) and [ParentKey](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.ParentKey) properties to create a hierarchy of items. If the TreeView’s structure is linear, you can omit these properties.
		- For hierarchical data collections, the [Children](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Children) property is required to build the data model.
	You can create multiple `DxTreeViewDataMapping` instances to specify different mappings for different nesting levels. Use the [Level](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Level) property to specify the node level for which data mappings are applied.

#### Flat Data

The following code snippet binds TreeView to a collection of flat data items. It specifies mappings for [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxNavigationDataMappingBase-1.Text), [Key](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Key), and [ParentKey](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.ParentKey) properties.

```
<DxTreeView Data="@ChemicalElements.Groups">
    <DataMappings>
        <DxTreeViewDataMapping Text="Name" Key="Name" ParentKey="CategoryName" />
    </DataMappings>
</DxTreeView>
```

![Bind Treview to Flat Data](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-data-binding-hierarchical.png)

[Run Demo: TreeView - Binding to Flat Data](https://demos.devexpress.com/blazor/TreeView#FlatDataBinding)

> [!note] Note
> When `DxTreeView` binds to flat data, it reserves a `ParentKey` equal to `0` for root items. If a data item’s `Key` is also `0`, the TreeView cannot build the hierarchy and fails to render. Use non‑zero `Key` values, or explicitly set `ParentKey` to a value that never appears in `Key` (for example, `-1`) to avoid conflicts.

#### Hierarchical Data

The following code snippet binds TreeView to a collection of hierarchical data items. The code specifies [Children](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxDataMappingBase-1.Children) and [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxNavigationDataMappingBase-1.Text) mappings to adjust the TreeView data model to the specified data source.

- [ChemicalElementGroup.cs](#tabpanel_wr22gWNUwo-1_tabid-cs1)
- [ChemicalElements.cs](#tabpanel_wr22gWNUwo-1_tabid-cs2)
- [Razor](#tabpanel_wr22gWNUwo-1_tabid-razor2)

```
<DxTreeView Data="@ChemicalElements.Groups">
    <DataMappings>
        <DxTreeViewDataMapping Text="Name" Children="Groups" />
    </DataMappings>
</DxTreeView>
```

![Bind Treview to Hierarchical Data](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-data-binding-hierarchical.png)

> [!note] Note
> A data item’s `Key` must not equal its `ParentKey`. A self-reference breaks the hierarchy and blocks rendering.

[Run Demo: TreeView - Binding to Hierarchical Data](https://demos.devexpress.com/blazor/TreeView#HierarchicalDataBinding)

### Static Render Mode Specifics

In static render mode, nodes cannot be expanded or collapsed. Use a single-level tree view or set a parent node’s [Expanded](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.Expanded) property to `true` to display an initially expanded tree.

```
<DxTreeView>
    <Nodes>
        <DxTreeViewNode Name="Overview" Text="Overview" NavigateUrl="https://demos.devexpress.com/blazor/" />
        <DxTreeViewNode Name="Editors" Text="Data Editors" Expanded="true">
            <Nodes>
                <DxTreeViewNode Text="Combobox" NavigateUrl="https://demos.devexpress.com/blazor/ComboBox" />
                <DxTreeViewNode Text="Spin Edit" NavigateUrl="https://demos.devexpress.com/blazor/SpinEdit" />
            </Nodes>
        </DxTreeViewNode>
        <DxTreeViewNode Name="FormLayout" Text="Form Layout" NavigateUrl="https://demos.devexpress.com/blazor/FormLayout" />
        <DxTreeViewNode Name="TreeView" Text="TreeView" NavigateUrl="https://demos.devexpress.com/blazor/TreeView" />
    </Nodes>
</DxTreeView>
```

If you need interactivity, enable interactive render mode. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Load Child Nodes on Demand

When the [LoadChildNodesOnDemand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.LoadChildNodesOnDemand) option is set to `true`, the component does not load child nodes until the parent node is expanded for the first time. Use this option to optimize component performance when it is bound to a large data source.

You can load child nodes on demand in either bound or unbound mode. Note that bound mode works with hierarchical structures only and requires the [HasChildren](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxTreeViewDataMappingBase.HasChildren) property. The component uses this property to determine how to render nodes before they are expanded for the first time (for example, whether expand buttons should appear).

- [DateTimeGroup.cs](#tabpanel_wr22gWNUwo-2_tabid-cs3)
- [Razor](#tabpanel_wr22gWNUwo-2_tabid-razor1)

```
<DxTreeView @ref="@treeView"
            CssClass="cw-480"
            Data="@DataSource"
            LoadChildNodesOnDemand="true"
            @* ... *@
            AnimationType="LayoutAnimationType.Slide">
    <DataMappings>
        <DxTreeViewDataMapping HasChildren="@(nameof(DateTimeGroup.HasSubGroups))"
                               Children="@(nameof(DateTimeGroup.SubGroups))"
                               Text="@(nameof(DateTimeGroup.Title))"/>
    </DataMappings>
</DxTreeView>

@code {
    DxTreeView treeView;

    IEnumerable<DateTimeGroup> DataSource = new List<DateTimeGroup>() {
        new DateTimeGroup(new DateTime(DateTime.Now.Year, 1, 1), DateTimeGroupType.Year)
    };

    protected override void OnAfterRender(bool firstRender) {
        if(firstRender) {
            var todayDate = DateTime.Now;
            treeView.SetNodeExpanded(n => n.Text == todayDate.Year.ToString(), true);
        }
        base.OnAfterRender(firstRender);
    }
}
```

Refer to the following section for information about limitations: [Load Child Nodes on Demand - Limitations](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.LoadChildNodesOnDemand#limitations).

[Run Demo: TreeView - Load Child Nodes on Demand Mode](https://demos.devexpress.com/blazor/TreeView#LoadChildNodesOnDemand)

[View Example: TreeView for Blazor - How to load child nodes on demand (lazy loading)](https://github.com/DevExpress-Examples/blazor-treeview-lazy-data-loading)

### Expand and Collapse Nodes

To expand or collapse a node, users can click or double-click it, or click its expand button.

The following code snippet shows a TreeView with custom **Expand** buttons.

![TreeView Expand Button](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-expand-button.png)

The table below lists related API members:

| Member | Description |
| --- | --- |
| [NodeExpandCollapseAction](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.NodeExpandCollapseAction) | Specifies user actions that expand or collapse a node. |
| [ShowExpandButtons](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.ShowExpandButtons) | Specifies whether expand buttons are visible. |
| [SetNodeExpanded(Func<ITreeViewNodeInfo, Boolean>, Boolean)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.SetNodeExpanded\(System.Func-DevExpress.Blazor.ITreeViewNodeInfo-System.Boolean--System.Boolean\)) | Expands or collapses the specified node. |
| [GetNodeExpanded(Func<ITreeViewNodeInfo, Boolean>)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.GetNodeExpanded\(System.Func-DevExpress.Blazor.ITreeViewNodeInfo-System.Boolean-\)) | Returns whether the specified node is expanded. |
| [ExpandToNode(Func<ITreeViewNodeInfo, Boolean>)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.ExpandToNode\(System.Func-DevExpress.Blazor.ITreeViewNodeInfo-System.Boolean-\)) | Expands the nodes down to the specified node. |
| [ExpandAll()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.ExpandAll) | Expands all nodes in the DxTreeView. |
| [CollapseAll()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CollapseAll) | Collapses all nodes in the DxTreeView. |
| [ExpandButtonIconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.ExpandButtonIconCssClass) | Specify a CSS class for the expand button’s icon. |
| [CollapseButtonIconCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CollapseButtonIconCssClass) | Specify a CSS class for the collapse button’s icon. |

The following events fire when the state of a node changes:

| Member | Description |
| --- | --- |
| [BeforeExpand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.BeforeExpand) | Fires when a node is about to be expanded and allows you to cancel the action. |
| [BeforeCollapse](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.BeforeCollapse) | Fires when a node is about to be collapsed and allows you to cancel the action. |
| [AfterExpand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.AfterExpand) | Fires after a node has been expanded. |
| [AfterCollapse](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.AfterCollapse) | Fires after a node has been collapsed. |
| [ExpandedChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.ExpandedChanged) | Fires when a TreeView’s node expands or collapses. |

### Filter Nodes

Enable the [ShowFilterPanel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.ShowFilterPanel) option to activate the filter panel. If a user types in a search string, the component displays matching nodes, and optionally, their parent/child nodes. Note that if you activate the filter option with the enabled [LoadChildNodesOnDemand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.LoadChildNodesOnDemand) option, the component loads all its nodes into memory.

```
<DxTreeView ShowFilterPanel="true">
    @* ... *@
</DxTreeView>
```

![Filter](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-filter.png)

Use the [FilterMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.FilterMode) property to specify how the component displays the filter operation results. The following options are available:

EntireBranch

The component displays a node that meets the filter criteria and all its parent and child nodes, even if they do not meet the criteria.

ParentBranch

The component displays a node that meets the filter criteria and all its parent nodes, even if they do not meet the criteria.

Nodes

The component displays only nodes that meet the filter criteria. A node at the hierarchy’s highest level that meets the filter criteria becomes the root node. The node’s child nodes that meet the filter criteria move to the upper hierarchy levels.

The table below lists available API members:

| Member | Description |
| --- | --- |
| [FilterMinLength](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.FilterMinLength) | Specifies the minimum number of characters a user must type in the search box to apply the filter. |
| [CustomFilter](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CustomFilter) | Allows you to implement custom filter logic. |
| [FilterString](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.FilterString) | Specifies the filter criteria used to filter the component’s nodes. |

[View Example: Implement Custom Filter](https://github.com/DevExpress-Examples/blazor-treeview-implement-custom-filter)

### Select Nodes

Set the [AllowSelectNodes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.AllowSelectNodes) property to `true` to enable node selection. Once a user clicks a node, it is highlighted and the [SelectionChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.SelectionChanged) event is raised. The following example handles this event to expand the selected node (if it has children) and to collapse other nodes:

```
<DxTreeView @ref="@treeView" AllowSelectNodes="true" SelectionChanged="@SelectionChanged">
  ...
</DxTreeView>

@code  {
    DxTreeView treeView;

    protected void SelectionChanged(TreeViewNodeEventArgs e)  {
        treeView.CollapseAll();
        treeView.ExpandToNode((n) => n.Text == e.NodeInfo.Text);
        if (!e.NodeInfo.IsLeaf) {
          treeView.SetNodeExpanded((n) => n.Text == e.NodeInfo.Text, true);
        }    
    }
}
```

[Run Demo: TreeView - Node Selection](https://demos.devexpress.com/blazor/TreeView#Selection)

Refer to the list below for other related API members:

[AllowSelection](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.AllowSelection)

Specifies whether the TreeView node can be selected.

[GetSelectedNodeInfo()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.GetSelectedNodeInfo)

Returns information about the selected node.

[SelectNode(Func<ITreeViewNodeInfo, Boolean>)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.SelectNode\(System.Func-DevExpress.Blazor.ITreeViewNodeInfo-System.Boolean-\))

Selects the specified node.

[ClearSelection()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.ClearSelection)

Clears node selection.

### Check Nodes

Set the [CheckMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CheckMode) property to `Multiple` or `Recursive` to display checkboxes in nodes. The [CheckedChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CheckedChanged) event is raised when a user changes a node’s check state.

The [NavigationCheckedChangedEventArgs<TInfo>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.NavigationCheckedChangedEventArgs-1) class contains the following collections:

[CheckedItems](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.NavigationCheckedChangedEventArgs-1.CheckedItems)

Returns all checked items.

[LastCheckedItems](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.NavigationCheckedChangedEventArgs-1.LastCheckedItems)

Returns items checked during the last operation.

[LastUncheckedItems](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.NavigationCheckedChangedEventArgs-1.LastUncheckedItems)

Returns items unchecked during the last operation.

[Run Demo: Checking Multiple Nodes](https://demos.devexpress.com/blazor/TreeView#CheckBoxesMultipleMode) [Run Demo: Recursive Node Check Marks](https://demos.devexpress.com/blazor/TreeView#CheckBoxesRecursiveMode)

The following code snippet handles the `CheckedChanged` event to respond to user interactions with node checkboxes. The handler obtains the collection of nodes whose state is checked. If the collection is not empty, the code displays the first node’s text.

```
First checked node: @FirstChecked

<DxTreeView Data="@Data"
            CheckMode="TreeViewCheckMode.Recursive"
            CheckedChanged="CheckedChanged">
    <DataMappings>
        <DxTreeViewDataMapping Text="Name"
                               Key="Id"
                               ParentKey="CategoryId" />
    </DataMappings>
</DxTreeView>

@code {
    string? FirstChecked = "none";
    void CheckedChanged(TreeViewCheckedChangedEventArgs e) {
        var firstCheckedNode = e.CheckedItems.FirstOrDefault();
        FirstChecked = firstCheckedNode != null ? firstCheckedNode.Text : "none";
    }
}
```

Set the [DxTreeViewNode.AllowCheck](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.AllowCheck) property to `false` to prevent users from checking a specific node.

> [!note] Note
> The following actions change the check state of all nodes, even those that do not meet the applied `filter criteria`:
> 
> - [CheckAll()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CheckAll) method call
> - [ClearCheck()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.ClearCheck) method call
> - Recursive [check mode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CheckMode) update

Refer to the list below for other related API members:

[Checked](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.Checked)

Specifies whether the node is checked.

[CheckAll()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CheckAll)

Checks all nodes in the TreeView.

[CheckAllVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CheckAllVisible)

Specifies whether the **Check All** box is visible.

[CheckAllText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CheckAllText)

Specifies the label of the [Check All](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CheckAllVisible) box.

[ClearCheck()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.ClearCheck)

Unchecks all nodes.

[CheckNodeByClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.CheckNodeByClick)

Specifies whether users can click nodes to check and uncheck them.

### Organize Navigation Within the Application

Use the [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.NavigateUrl) property to specify a URL where the client web browser navigates when a node is clicked. The [DxTreeView.Target](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.Target) property specifies the common [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#target) attribute’s value for all nodes in the TreeView. To override the attribute value for a specific node, use the [DxTreeViewNode.Target](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.Target) property.

The following code snippet sets the common `target` attribute’s value for all nodes to `_blank` and overrides this value for the first node (sets it to `_self` explicitly).

```
<DxTreeView Target="_blank">
    <Nodes>
        <DxTreeViewNode Name="Overview" 
                        Text="Overview" 
                        NavigateUrl="https://demos.devexpress.com/blazor/" 
                        Target="_self"/>
        <DxTreeViewNode Name="Editors" Text="Data Editors" Expanded="true">
            <Nodes>
                <DxTreeViewNode Text="Combobox" NavigateUrl="https://demos.devexpress.com/blazor/ComboBox" />
                <DxTreeViewNode Text="Spin Edit" NavigateUrl="https://demos.devexpress.com/blazor/SpinEdit" />
            </Nodes>
        </DxTreeViewNode>
    </Nodes>
</DxTreeView>
```

The item becomes selected if its [DxTreeViewNode.NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.NavigateUrl) property value matches the active web page. If the control does select the item, it expands all parent items. Set the [AllowSelectNodes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.AllowSelectNodes) property value to `true` to enable this functionality.

The following example disables URL synchronization:

```
<DxTreeView AllowSelectNodes="true" UrlMatchMode="NavigationUrlMatchMode.None">
    <Nodes>
        <DxTreeViewNode NavigateUrl="./" Text="Overview"></DxTreeViewNode>
        <DxTreeViewNode NavigateUrl="grid" Text="Grid"></DxTreeViewNode>
    </Nodes>
</DxTreeView>
```

![Disable URL synchronization](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-urlmatchmode.png)

### Load Child Nodes on Demand Mode and Node Selection

If the [AllowSelectNodes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.AllowSelectNodes) property is set to `true` and a user navigates to a [URL](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.NavigateUrl) associated with a TreeView node, the component select this node. If the `LoadChildNodesOnDemand` property is `true`, the component applies proper selection only if a user has already loaded that node (expanded all its parent nodes).

The following code snippet demonstrates a TreeView with the enabled `LoadChildNodesOnDemand` property. When a user opens the `https://localhost:44348/sortdata` URL, the **Sort Data** node is not selected.

```
<DxTreeView CssClass="app-sidebar" AllowSelectNodes="true" LoadChildNodesOnDemand="true">
    <Nodes>
        <DxTreeViewNode Text="Grid">
            <Nodes>
                <DxTreeViewNode NavigateUrl="sortdata" Text="Sort Data"></DxTreeViewNode>
                <DxTreeViewNode NavigateUrl="groupdata" Text="Group Data"></DxTreeViewNode>
            </Nodes>
        </DxTreeViewNode>
        <DxTreeViewNode Text="Scheduler">
            <Nodes>
                <DxTreeViewNode NavigateUrl="viewtypes" Text="View Types"></DxTreeViewNode>
                <DxTreeViewNode NavigateUrl="resources" Text="Resources"></DxTreeViewNode>
            </Nodes>
        </DxTreeViewNode>
    </Nodes>
</DxTreeView>
```

![Selection with LoadOnDemand enabled](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-selection-loadondemand-on.png)

The image below shows selection with the disabled `LoadChildNodesOnDemand` mode:

![Selection with LoadOnDemand disabled](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-selection-loadondemand-off.png)

You can also use the [DxTreeView.UrlMatchMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.UrlMatchMode) and [DxTreeViewNode.UrlMatchMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.UrlMatchMode) properties to specify how the TreeView component matches the browser URL and node’s [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.NavigateUrl) property.

### Apply Customizations

#### Disable User Interactions

Set the [Enabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.Enabled) property to `false` to ignore user interactions.

```
<button type="button" @onclick="@(() => ToggleTreeViewEnabled())">Enable/Disable TreeView</button>

<DxTreeView Enabled="@TreeViewEnabled">
    <Nodes>
        <DxTreeViewNode Text="Metals">
            <Nodes>
                <DxTreeViewNode Text="Alkali metals" />
                <DxTreeViewNode Text="Inner transition elements">
                    <Nodes>
                        <DxTreeViewNode Text="Lanthanides" />
                        <DxTreeViewNode Text="Actinides" />
                    </Nodes>
                </DxTreeViewNode>
            </Nodes>
        </DxTreeViewNode>
    </Nodes>
</DxTreeView>

@code  {
    bool TreeViewEnabled { get; set; } = false;

    void ToggleTreeViewEnabled() { TreeViewEnabled = !TreeViewEnabled; }
}
```

#### Add a Vertical Scrollbar

The TreeView component automatically displays a vertical scrollbar when its nodes do not fit the viewport:

- [Razor](#tabpanel_wr22gWNUwo-3_tabid-razor3)
- [CSS](#tabpanel_wr22gWNUwo-3_tabid-css3)

```
<div>
    <DxTreeView CssClass="my-treeview">
        <Nodes>
            <DxTreeViewNode Text="Data Editors" />
            <DxTreeViewNode Text="Data Grid">
                <Nodes>
                    <DxTreeViewNode Text="Editing" />
                    <DxTreeViewNode Text="Sorting" />
                    <DxTreeViewNode Text="Export" />
                </Nodes>
            </DxTreeViewNode>
            <DxTreeViewNode Text="Rich Text Editor" />
            <DxTreeViewNode Text="Scheduler" />
            <DxTreeViewNode Text="Navigation" />
        </Nodes>
    </DxTreeView>
</div>
```

#### Wrap Node Text

If a [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.Text) value does not fit into a node as a single line, the node displays multiple lines of text. Set the `TextWrapEnabled` property to `false` to disable word wrap and trim extra words:

- [Razor](#tabpanel_dkaEELy8fk_tabid-razorwrap)
- [CSS](#tabpanel_dkaEELy8fk_tabid-csswrap)

```
<div class="container">
    <DxTreeView TextWrapEnabled="false">
        <Nodes>
            <DxTreeViewNode Text="Data Binding">
                <Nodes>
                    <DxTreeViewNode Text="Large Data (Instant Feedback Source)" />
                    <DxTreeViewNode Text="Large Data (Queryable)" />
                    <DxTreeViewNode Text="Unbound Columns" />
                </Nodes>
            </DxTreeViewNode>
        </Nodes>
    </DxTreeView>
</div>
```

![Trim node text](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-textwrap-disabled.png)

#### Templates

Use the following `<DxTreeView>` properties to specify a common node template and a text template for all nodes:

- [NodeTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.NodeTemplate)
- [NodeTextTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.NodeTextTemplate)

In unbound mode, you can create node templates individually. These templates have priority over common templates. Use the following `<DxTreeViewNode>` properties:

- [Template](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.Template)
- [TextTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.TextTemplate)

- [ComponentSet.cs](#tabpanel_LivdQgVhFo_tabid-component)
- [DataSource](#tabpanel_LivdQgVhFo_tabid-ds)
- [Razor](#tabpanel_LivdQgVhFo_tabid-razor)

```
<DxTreeView Data="@ComponentSets.Data"
            @ref="@treeView">
    <DataMappings>
        <DxTreeViewDataMapping Children="ComponentSets" />
    </DataMappings>
    <NodeTemplate>
        @{
            var dataItem = (ComponentSet)context.DataItem;
        }
        @if (!context.IsLeaf) {
            <h4 class="my-0 p-2 d-flex align-items-center">
                @if (context.Expanded) {
                    <span class="oi oi-chevron-top"></span>
                }
                else {
                    <span class="oi oi-chevron-bottom"></span>
                }
            <span class="ms-3 flex-grow-1">@dataItem.Title</span>
            </h4>
        }
        else {
            <div class="d-flex p-2">
                <div class="flex-grow-1">
                    <h5 class="mt-0">@dataItem.Title</h5>
                    @dataItem.Description
                </div>
            </div>
        }
    </NodeTemplate>
</DxTreeView>

@code {
    DxTreeView treeView;
    protected override Task OnAfterRenderAsync(bool firstRender) {
        if(firstRender)
            treeView.ExpandAll();
        return base.OnAfterRenderAsync(firstRender);
    }
}
```

![TreeView Templates](https://docs.devexpress.com/Blazor/images/treeview/blazor-treeview-templates.png)

[Run Demo: TreeView - Templates](https://demos.devexpress.com/blazor/TreeView#Templates)

### Keyboard Navigation

The DevExpress Blazor TreeView component supports keyboard shortcuts that allow users to access every UI element, navigate through nodes, and select nodes. Keyboard navigation is implemented both on the client and server.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab, Shift + Tab | Focuses the TreeView or moves focus to the next or previous focusable page element.   **Within TreeView:** Moves focus between the filter panel (if visible), the Check All checkbox (if visible), and the first node in the tree.   **Within a node template:** Moves focus between nested focusable elements. After the first/last element, exits nested object navigation. |
| Right Arrow | **For a collapsed node:** Expands the node.   **For an expanded node:** Moves focus to the first child node. |
| Left Arrow | **For an expanded node:** Collapses the node.   **For child nodes:** Moves focus to the parent node. |
| Down Arrow | Moves focus to the next visible node. After the last node, moves focus to the first node. |
| Up Arrow | Moves focus to the previous visible node. After the first node, moves focus to the last node. |
| Home | Moves focus to the first node in the tree. |
| End | Moves focus to the last node in the tree, without expanding nodes. |
| Space | **If the focused node’s checkbox is enabled:** Toggles the check state.   **If node selection is enabled:** Selects the focused node. |
| Enter | Raises [NodeClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView.NodeClick) and [Click](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeViewNode.Click) events.   **If node selection is enabled:** Selects the focused node.   **If a node has children and selection is disabled:** Toggles the focused node’s expanded state.   **For a templated node:** Moves focus to the first focusable element within a template. |
| Esc | **Within a node template:** Exits nested object navigation. |

### Examples

Our knowledge base contains a wide array of sample projects that demonstrate the most popular usage scenarios, such as:

- [How to implement custom filter](https://github.com/DevExpress-Examples/blazor-treeview-implement-custom-filter)
- [How to implement the Breadcrumb control based on a selected node](https://github.com/DevExpress-Examples/blazor-treeview-implement-breadcrumbs)
- [How to load child nodes on demand (lazy loading)](https://github.com/DevExpress-Examples/blazor-treeview-lazy-data-loading)

You can find more task-based examples in the following topic: [Blazor TreeView - Examples](https://docs.devexpress.com/Blazor/404359/examples).

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

[DxComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent)

DxTreeView

See Also

[DxTreeView Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeView._members)
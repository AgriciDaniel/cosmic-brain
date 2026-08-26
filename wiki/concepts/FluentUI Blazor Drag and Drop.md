---
title: FluentUI Blazor Drag and Drop
status: developing
address: c-000115
---

# FluentUI Blazor Drag and Drop Components

The [[FluentUI Blazor]] library provides two drag-and-drop systems: the low-level `FluentDragContainer`/`FluentDropZone` API (wrapping the HTML Drag and Drop API) and the higher-level `FluentSortableList` (wrapping SortableJS).

---

## FluentDragContainer / FluentDropZone

A Blazor implementation of the [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API). Create a `FluentDragContainer` surface containing `FluentDropZone` elements that can be marked as `Draggable`, `Droppable`, or both.

### Basic Example

```razor
<FluentDragContainer TItem="string"
                     OnDragEnd="@(e => Console.WriteLine($"{e.Source.Id} drag ended"))"
                     OnDragEnter="@(e => Console.WriteLine($"{e.Source.Id} entered {e.Target.Id}"))"
                     OnDragLeave="@(e => Console.WriteLine($"{e.Source.Id} left {e.Target.Id}"))"
                     OnDropEnd="@(e => Console.WriteLine($"{e.Source.Id} dropped in {e.Target.Id}"))">
    <FluentStack>
        <FluentDropZone Id="Item1" Draggable="true" Droppable="true">
            <div style="width: 50px; height: 50px; background-color: pink;">Item 1</div>
        </FluentDropZone>
        <FluentDropZone Id="Item2" Draggable="true" Droppable="true">
            <div style="width: 50px; height: 50px; background-color: lightgreen;">Item 2</div>
        </FluentDropZone>
    </FluentStack>
</FluentDragContainer>
```

### Events

| Event | Description |
|-------|-------------|
| `OnDragStart` | Fired when drag begins |
| `OnDragEnd` | Fired when drag ends |
| `OnDragEnter` | Fired when draggable enters a drop zone |
| `OnDragOver` | Fired while hovering over a drop zone |
| `OnDragLeave` | Fired when draggable leaves a drop zone |
| `OnDropEnd` | Fired when item is dropped |

All events use `EventCallback<FluentDragEventArgs<TItem>>` and carry `Source` and `Target` information plus a generic `Item` payload.

### Nested Drag and Drop

Nest multiple `FluentDragContainer` for hierarchical drag-and-drop (rows, columns, elements). Use `StopPropagation` to prevent parent containers from intercepting child drag events.

```razor
<FluentDragContainer TItem="FormRow" OnDropEnd="OnRowDropEnd">
    <FluentDragContainer TItem="FormColumn" OnDropEnd="OnColumnDropEnd">
        <FluentDragContainer TItem="FormElement" OnDropEnd="OnDropElement">
            <!-- Nested FluentDropZone elements -->
        </FluentDragContainer>
    </FluentDragContainer>
</FluentDragContainer>
```

### v5 Migration

All events changed from `Action<FluentDragEventArgs<TItem>>` to `EventCallback<FluentDragEventArgs<TItem>>`. Async handlers are now supported. When assigning in C# code, use `EventCallback.Factory.Create<T>(this, handler)`. Null checks must use `.HasDelegate` instead of `!= null`.

---

## FluentSortableList

A higher-level sortable list component wrapping [SortableJS](https://sortablejs.github.io/Sortable/). Supports reordering items within a list or between lists via drag-and-drop or keyboard.

> [!Note] The SortableJS script is included in the library script. No manual inclusion needed.

### Basic Sortable List

```razor
<FluentSortableList @bind-Items="items" OnUpdate="@HandleOnUpdate">
    <ItemTemplate>@context.FirstName @context.LastName</ItemTemplate>
</FluentSortableList>
```

### Move Items Between Lists

Provide the same `Group` name to link lists together:

```razor
<FluentSortableList Id="list1" Group="shared" @bind-Items="@items1">
    <ItemTemplate>@context.Name</ItemTemplate>
</FluentSortableList>
<FluentSortableList Id="list2" Group="shared" @bind-Items="@items2">
    <ItemTemplate>@context.Name</ItemTemplate>
</FluentSortableList>
```

### Clone Items

Set `Clone="true"` to clone items on drag (originals stay in place):

```razor
<FluentSortableList Id="clone1" Group="cloning" Clone="true" @bind-Items="@items1">
    <ItemTemplate>@context.Name</ItemTemplate>
</FluentSortableList>
```

### Drag Handles

Set `Handle="true"` and use CSS classes `sortable-grab` and `sortable-item-content`:

```razor
<FluentSortableList Id="dragHandles" Handle="true" @bind-Items="items">
    <ItemTemplate>
        <div class="sortable-grab">
            <FluentIcon Value="@(new Icons.Regular.Size20.ArrowSort())" />
        </div>
        <div class="sortable-item-content" style="flex-grow: 1;">@context.Name</div>
    </ItemTemplate>
</FluentSortableList>
```

### Disabling Sort and Drop

Use `Sort="false"` to prevent reordering within a list. Use `Drop="false"` to prevent dropping items into a list.

### Item Filtering

Use `ItemFilter` (a `Func<TItem, bool>`) to exclude certain items from being draggable.

### Fallback Behavior

Set `Fallback="true"` to avoid native HTML5 drag-and-drop behavior (useful for touch devices not covered by SortableJS).

### Events

| Event | Description |
|-------|-------------|
| `OnUpdate` | Item moved within a list |
| `OnAdd` | Item added to a list from another list |
| `OnRemove` | Item removed from a list |

Events receive `FluentSortableListEventArgs` with `FromListId`, `ToListId`, `OldIndex`, `NewIndex`.

### Accessibility

Full keyboard support:
- Space/Enter: grab/release item
- Arrow Up/Down: move item within list, move focus between items
- Arrow Left/Right: move item between lists, move focus between lists
- Grabbed items remain in grabbed state until explicitly released (except clones, which release immediately)

### Styling

Customize via CSS variables:

```css
.fluent-sortable-list {
    --fluent-sortable-list-border-width: var(--strokeWidthThin);
    --fluent-sortable-list-item-height: 32px;
    --fluent-sortable-list-item-background-color: var(--colorNeutralBackground4);
    --fluent-sortable-list-item-grabbed-background-color: var(--colorBrandBackground2Hover);
    --fluent-sortable-list-item-filtered-background-color: var(--warning);
}
```

### v5 Migration

- Removed all styling parameters (e.g., `ListItemBackgroundColor`, `ListBorderWidth`). Use CSS variables instead.
- CSS variable `--fluent-sortable-list-background-color` renamed to `--fluent-sortable-list-item-background-color`
- CSS variable `--fluent-sortable-list-filtered` renamed to `--fluent-sortable-list-item-filtered-background-color`
- New properties: `AriaLabel`, `OnAdd`, `ItemsChanged`

## API Reference

| Component | API Type |
|-----------|----------|
| FluentDragContainer | `FluentDragContainer<TItem>` |
| FluentDropZone | `FluentDropZone<TItem>` |
| FluentDragEventArgs | `FluentDragEventArgs<TItem>` |
| FluentSortableList | `FluentSortableList<TItem>` |
| FluentSortableListEventArgs | `FluentSortableListEventArgs` |

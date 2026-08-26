---
title: Drag and Drop
route: /Drag
icon: Drag
---

# Drag and Drop

A Blazor component implementation of a <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API" target="_blank">HTML Drag and Drop API</a>.

The user may select draggable elements with a mouse, drag those elements to a droppable element, and drop them by releasing the mouse button. A translucent representation of the draggable elements follows the pointer during the drag operation.

Create a `FluentDragContainer` surface that will contain drag-and-drop areas. Customize these areas with the `Draggable` and `Droppable` parameters. Each time an item is dragged or dropped onto an area, an event is triggered to notify the developer. You can retrieve a generic `Item` argument with your personal data.

## Basic example

{{ DragDropBasic }}

## Nested drag & drop
This example demonstrates how to nest multiple `FluentDragContainer` components to enable drag-and-drop interactions across hierarchical structures such as rows, columns, and elements.

The key to making this multi-level drag-and-drop system work is the use of the `StopPropagation` property. By enabling it where appropriate, each nested `FluentDragContainer` can handle drag events independently-preventing unintended interference from parent containers.

Each level supports independent drag behavior:

* **Rows** can be reordered vertically.
* **Columns** can be moved within the same row or between different rows.
* **Elements** can be rearranged inside a column or moved across columns.

The <span style="background-color: yellow; padding: 0 0.2em; color: #000;">yellow area</span> indicates an empty drop zone inside a row. It accepts columns when a row does not contain any yet. Similarly, empty columns behave as drop zones for elements.

This structure allows fully flexible layout editing with deep nesting and drag-and-drop handling at every level.

{{ DragDropNested }}

## API FluentDragContainer

{{ API Type=FluentDragContainer<int> }}

## API FluentDropZone

{{ API Type=FluentDropZone<int> }}

## API FluentDragEventArgs

{{ API Type=FluentDragEventArgs<int> }}

## Migrating from v4

{{ INCLUDE File=MigrationDrag }}

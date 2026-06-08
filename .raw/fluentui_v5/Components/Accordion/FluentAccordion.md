---
title: Accordion
route: /Accordion
category: 30|Components
icon: TextCollapse
---

# Accordion

An accordion is a vertically stacked set of interactive headings that each contain a
title, content snippet, or thumbnail representing a section of content. The headings
function as controls that enable users to reveal or hide their associated sections of
content. Accordions are commonly used to reduce the need to scroll when presenting
multiple sections of content on a single page.

## Multi expanded mode (default)

In this mode, multiple accordion items can be expanded at the same time. This is the default mode of the accordion.

A tooltip can be provided for each accordion item header by setting the `HeaderTooltip` parameter.
See the example below where that is used on the second header.

{{ AccordionDefault }}

## Single expanded mode

In this mode, only one accordion item can be expanded at a time. When a new item is expanded, the previously expanded item will collapse automatically.

{{ AccordionSingleMode }}

## Marker and Block

The accordion items can be displayed with a marker and block style. The marker is a
small icon or symbol that indicates the state of the accordion item (expanded or
collapsed) and can be placed either at the start of the header or at the end.

The block parameter is used to set if the header should be displayed as a block
element or not. When set to true, the header will take up the full width of the accordion container.

{{ AccordionMarkerAndBlock }}

## Expand/Collapse programmatically

Accordion items can be expanded or collapsed programmatically using the `ExpandItemAsync` and `CollapseItemAsync` methods of the accordion.
For this to work, a reference to the accordion is needed and the `@ref` attribute should be set to a variable in the code-behind. Also, the items should have unique ids.

This can be useful when you want to control the state of the accordion items based other events than user interaction.

{{ AccordionExternalTrigger }}

## API FluentAccordion

{{ API Type=FluentAccordion }}

## API FluentAccordionItem

{{ API Type=FluentAccordionItem }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentAccordion }}

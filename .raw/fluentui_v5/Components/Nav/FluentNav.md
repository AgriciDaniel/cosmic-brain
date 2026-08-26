---
title: Nav
route: /Nav
icon: Navigation
---

# Nav

Nav, or navigation, provides a list of links that lets people move through the main sections of an app or site.
It's a high-level wayfinding component that's always easily accessible but can be minimized to free up space.

Nav only supports one level of nesting and might not show all available items.

## Selection
The selection indicator tells people at a glance which page is active. If a nav sub-item is the active page and the category is closed,
the selection indicator will display on the nav category.

## Grouping
Navs can be organized with up to two levels of hierarchy. Simple navs list the spaces in a site or app as links on the same level.
For more complex navs, links can be grouped into categories for easier interaction.

Create a simple nav using nav items. These are first-level links that give people a quick understanding of the main parts of an experience.

Create a complex nav using nav categories and sub-items. Nav categories expand and collapse so people only see the information they need.
Nav sub-items group related links within that category and let people navigate to those sub-pages. Nav categories act as accordions and
show or hide information;
they're not links and won't lead to site or app locations.

By using the `UseSingleExpanded` parameter, you can ensure that only one nav category is expanded at a time. When a new category
is expanded, any previously expanded category will automatically collapse.

## Divider
Use the `FluentDivider` to separate groups of nav items. This helps people scan and find what they need more quickly.
The right styling will automatically be applied when using the divider inside the `FluentNav`

## Icons
Whenever possible, use icons with nav category labels. They create additional visual emphasis and differentiate nav categories
from the nav subitems within them. Use simple and recognizable icons that are easy to understand.

If icons aren't technically possible or difficult to pick due to an overwhelming number of nav items, remove them.
If nav categories don't include an icon, subitems are indented to maintain a clear hierarchy.

## Items
Nav doesn't support an icon-only layout.

A `NavItem` can contain either an `Href` or an `OnClick` handler.

When a `NavItem` is used inside a `NavCategory`, the `Icon` parameter is ignored. No icon will be displayed.

In the example below, the first (and third and fifth) item has an `Href` that navigates to an external site, while the second
(and fourth) item has an `OnClick` handler that triggers a method in the component.

{{ NavDefault }}

## Accessibility
Nav is designed to be accessible and follows best practices for keyboard navigation and screen reader support. You can navigate through the nav items
using the arrow up, arrow down, Home and End keys, and expand or collapse categories using the Enter or Space keys. As the nav ultimately renders `<a>` and `<button>` tags
(which both have a standard tabindex of '0'), a so called roving tabindex pattern makes sure that only the currently focused item is in the tab order. Tabbing away
from the nav will remember the last focused item, and when you tab back into the nav, focus will return to that item. This allows for efficient keyboard navigation through the nav items.

## API FluentNav

{{ API Type=FluentNav }}

## API FluentNavCategory

{{ API Type=FluentNavCategory }}

## API FluentNavItem
{{ API Type=FluentNavItem }}

## API FluentNavSectionHeader
{{ API Type=FluentNavSectionHeader }}

## Migrating to v5

There is no direct migration path for  the `FluentNavMenu` from v4
to the `FluentNav` in v5. This is due to the fact that in the v4 component
it was possible to have multiple levels of nesting, while in v5 only one level is supported.

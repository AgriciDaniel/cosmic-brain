---
title: "Blazor Accordion | Blazor"
source: "https://docs.devexpress.com/Blazor/401181/components/navigation-controls/accordion"
author:
published: 2001-05-28
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## Blazor Accordion

In This Article

The DevExpress Accordion component for Blazor ([DxAccordion](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion)) displays collapsible panels and allows you to organize information in groups. You can also use this component as a navigation control.

[Run Demo](https://demos.devexpress.com/blazor/Accordion)

[Read Tutorial: Explore Features](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion)

![Blazor Navigation Landing Accordion](https://docs.devexpress.com/Blazor/images/accordion/blazor-accordion-overview.png)

## API Reference

Refer to the following list for the component API reference: [DxAccordion Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion._members).

## Features

### Bound and Unbound Modes

Accordion supports bound and unbound modes. Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.Data) property to bind the component to flat or hierarchical data. In unbound mode, populate the [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.Items) collection manually.

### Load Child Items On Demand

Load child items on demand in either bound or unbound mode to improve Accordion performance if it contains a large number of items. Set the [LoadChildItemsOnDemand](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.LoadChildItemsOnDemand) property to `true` to enable this functionality.

### Filter Items

The Accordion component includes a built-in item filter UI. Enable the [ShowFilterPanel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.ShowFilterPanel) property to activate the search panel. You can use the [CustomFilter](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.CustomFilter) property to implement custom filter logic.

The [FilterString](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.FilterString) property allows you to specify the filter criteria in code.

### Navigation Mode

Specify the [NavigateUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordionItem.NavigateUrl) property for Accordion items to use the component as a navigation control.

The component can automatically select and expand to an item that navigates to the current page. Specify the [UrlMatchMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.UrlMatchMode) property and set the [SelectionMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxAccordion.SelectionMode) property value to `Single` to enable this functionality.

## Localization

The Accordion component’s UI elements such as labels, context menus, and error messages are displayed in English. [Localization](https://docs.devexpress.com/Blazor/401564/common-concepts/localization) automatically adapts the component to the user’s preferred language.

DevExpress components include predefined satellite resource assemblies for German, Spanish, and Japanese. Use the [DevExpress Localization Service](https://localization.devexpress.com/) to create and download a custom set of satellite assemblies, and modify resources.
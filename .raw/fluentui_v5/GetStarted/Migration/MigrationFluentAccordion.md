---
title: Migration FluentAccordion
route: /Migration/Accordion
hidden: true
---

### FluentAccordionItem - Renamed parameters 💥

- `Heading` → `Header`
- `HeadingTemplate` → `HeaderTemplate`
- `HeadingTooltip` → `HeaderTooltip`

### FluentAccordionItem - Type-changed parameters 💥

- `HeadingLevel`: Changed from `string?` to `int?`.

### FluentAccordion - Type-changed parameters 💥

- `OnAccordionItemChange`: Changed from `EventCallback<FluentAccordionItem>` to `EventCallback<AccordionItemEventArgs>`.
  The affected item can be found in the event arguments via the `Item` property.

  ```xml
  <!-- V4 -->
  <FluentAccordion OnAccordionItemChange="@OnChange">...</FluentAccordion>
  @code {
      void OnChange(FluentAccordionItem item) { }
  }

  <!-- V5 -->
  <FluentAccordion OnAccordionItemChange="@OnChange">...</FluentAccordion>
  @code {
      void OnChange(AccordionItemEventArgs args) { var item = args.Item; }
  }
  ```

### New parameters

**FluentAccordion:**
- `ExpandModeChanged` (`EventCallback<AccordionExpandMode?>`) — two-way binding support for `ExpandMode`.
- `HeadingLevel` (`int?`) — sets the heading level for all accordion items.
- `Size` (`AccordionItemSize?`) — sets the size for all accordion items.
- `MarkerPosition` (`AccordionItemMarkerPosition?`) — controls the expand/collapse marker position.
- `Block` (`bool?`) — when true, the accordion takes up the full width of its container.

**FluentAccordionItem:**
- `Disabled` (`bool`) — disables the accordion item.
- `Size` (`AccordionItemSize?`) — overrides the size set on the parent accordion.
- `MarkerPosition` (`AccordionItemMarkerPosition?`) — overrides the marker position set on the parent.
- `Block` (`bool?`) — overrides the block setting on the parent.

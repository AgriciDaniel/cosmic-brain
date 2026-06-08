---
title: Migration FluentLayout and FluentMainLayout
route: /Migration/Layout
hidden: true
---

- ### New components

  The `FluentLayout` component has been introduced to replace the `FluentLayout` and `FluentMainLayout` components.
  This new component is based on the CSS `grid` element to simplify the usage and customization of the layout
  (including on mobile device).

   ```xml
   <FluentLayout>
     <FluentLayoutItem Area="LayoutArea.Header">Header</FluentLayoutItem>
     <FluentLayoutItem Area="LayoutArea.Navigation">Navigation</FluentLayoutItem>
     <FluentLayoutItem Area="LayoutArea.Content">Content</FluentLayoutItem>
     <FluentLayoutItem Area="LayoutArea.Aside">Aside</FluentLayoutItem>
     <FluentLayoutItem Area="LayoutArea.Footer">Footer</FluentLayoutItem>
   </FluentLayout>
   ```

- ### Removed components💥
  The `FluentHeader`, `FluentBodyContent`, `FluentFooter`, `FluentMainLayout` components have been removed.

  Use the `FluentLayoutItem Area="..."` component instead.


---
title: Migration FluentGridItem
route: /Migration/GridItem
hidden: true
---

- ### Renamed properties 🔃
  These properties have been renamed to comply with the Blazor naming convention (Pascal case):
  - `xs`, `sm`, `md`, `lg`, `xl`, `xxl` properties have been renamed to
  - `Xs`, `Sm`, `Md`, `Lg`, `Xl`, `Xxl`.

  If you don't rename them correctly, you'll probably get a compilation error like this one:
  ```   
  InvalidOperationException: Unable to set property 'sm' on object of type 'Microsoft.FluentUI.AspNetCore.Components.FluentGridItem'.
  The error was: Unable to cast object of type 'System.String' to type 'System.Nullable`1[System.Int32]'.
  ```

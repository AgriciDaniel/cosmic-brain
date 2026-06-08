---
title: Migration FluentField
route: /Migration/Field
hidden: true
---

- ### New component in V5 ✨

  `FluentField` is a new component that wraps input controls with a consistent label,
  validation message, and hint text layout.

  It replaces V4's `FluentValidationMessage` and ad-hoc label patterns.

- ### Migration from V4 patterns

  ```xml
  <!-- V4: Manual label + validation -->
  <label for="email">Email *</label>
  <FluentTextField Id="email" @bind-Value="model.Email" />
  <FluentValidationMessage For="@(() => model.Email)" />

  <!-- V5: FluentField wraps everything -->
  <FluentField Label="Email" Required="true" ValidationFor="@(() => model.Email)">
      <FluentTextInput @bind-Value="model.Email" />
  </FluentField>
  ```

  ```xml
  <!-- V4: FluentInputLabel -->
  <FluentInputLabel Label="Name" ForId="name" />
  <FluentTextField Id="name" @bind-Value="model.Name" />

  <!-- V5 -->
  <FluentField Label="Name">
      <FluentTextInput @bind-Value="model.Name" />
  </FluentField>
  ```

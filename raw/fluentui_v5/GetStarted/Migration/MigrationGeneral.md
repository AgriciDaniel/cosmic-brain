---
title: Migration General
route: /Migration/General
hidden: true
---

- ### FluentComponentBase changes 💥

  All components inherit from `FluentComponentBase`, which has significant changes in V5:

  | Aspect | V4 | V5 |
  |--------|----|----|
  | Constructor | Parameterless | Requires `LibraryConfiguration` parameter |
  | `Element` parameter | On base class (public get / protected set) | Removed from base — components that need it implement `IFluentComponentElementBase` |
  | `ParentReference` | `[Parameter] DesignTokens.Reference?` | **Removed** |

  > ⚠️ If you have custom components inheriting from `FluentComponentBase`, you must update them to pass `LibraryConfiguration` to the base constructor.

- ### FluentProviders

  V5 introduces a `FluentProviders` component that should be placed at the root of your application.
  It provides cascading values (like `LibraryConfiguration`) needed by all Fluent UI components.

  ```xml
  <!-- In App.razor or MainLayout.razor -->
  <FluentProviders>
      @Body
  </FluentProviders>
  ```

- ### FluentField — New input wrapping pattern

  V5 introduces `FluentField` as the standard way to wrap input components with a label, validation message, and hint text.
  V4's `FluentValidationMessage<T>` component is **removed** — use `FluentField`'s `Message`, `MessageCondition`, and `MessageState` instead.

  All V5 input components implement the `IFluentField` interface, providing: `Label`, `LabelTemplate`, `LabelPosition`,
  `LabelWidth`, `Required`, `Message`, `MessageIcon`, `MessageTemplate`, `MessageCondition`, `MessageState`.

  ```xml
  <!-- V4 -->
  <FluentTextField @bind-Value="name" Label="Name" />
  <FluentValidationMessage For="@(() => name)" />

  <!-- V5 -->
  <FluentTextInput @bind-Value="name" Label="Name"
                   MessageCondition="@(f => !string.IsNullOrEmpty(f.Message))"
                   MessageState="MessageState.Error" />
  ```

- ### Scoped Css Bundling

  The csproj contains `<DisableScopedCssBundling>true</DisableScopedCssBundling>`
  and `<ScopedCssEnabled>false</ScopedCssEnabled>` to prevent the bundling of scoped css files.

  Components won't contain the scoped css identifier, so if you used `::deep` in your CSS to target
  Fluent UI components, it is now useless and can be removed.


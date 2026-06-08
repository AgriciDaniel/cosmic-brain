---
title: Skeleton
route: /Skeleton
icon: Shortpick
---

# Skeleton

The **FluentSkeleton** component is a temporary animation placeholder for when a service
call takes time to return data and we don't want to block rendering the rest of the UI.

## Best practices

**Do**
 - Use **FluentSkeleton** to help ease a UI transition when we know the service will potentially take a longer amount of time to retrieve the data.
 - Provide widths for each of the Skeleton elements you used to build a skeleton layout looking as close as possible to real content it is replacing.
 - Add `aria-busy` to the top-level node of the loading container.
 - Use Skeleton if you know the UI loading time is longer than 1 second.

**Don't**
 - Build Skeleton UI with a lot of details. Circles and rectangles are really as detailed as you want to get. Adding more detail will result in confusion once the UI loads.
 - Use Skeleton if you are confident that the UI will take less than a second to load.

## Usage

By default, the **FluentSkeleton** component will render a skeleton layout based on the `Width`, `Height`, `Circular` and `Shimmer` parameters.

{{ SkeletonDefault SourceCode=false }}

## Default using Pattern

The default usage of the **FluentSkeleton** component is to use the `Pattern` parameter to define a skeleton layout.
The `Pattern` parameter accepts a value that defines the layout of the skeleton.

 - `IconTitleContent`: Represents a combination of a circular icon (48px) and a title, on the same line; and a content area below the title.
 - `IconTitle`: Represents a combination of a circular icon (48px) and a title, on the same line.
 - `Icon`: Represents a circular icon (48px).

{{ SkeletonPatterns }}

## Customizing the Skeleton

You can customize the skeleton by using the `ChildContent` parameter defining your own layout.

Inside the `ChildContent`, you can use the `@context` variable to draw some common skeleton elements like a cirle or a rectangle.

Example
```razor
@context.DrawCircle(radius: "32px")
@context.DrawRectangle(width: "100%", height: "32px")
@context.DrawCircle(radius: "32px")
```

{{ SkeletonCustom }}

## CSS classes

The **FluentSkeleton** component has the following CSS class which can be used to style any existing component.
You need to specify the width and height of your component to make it look like a skeleton.

The classes are named using the format `fluent-skeleton-{size}` and `fluent-skeleton-circular-{size}`
The `size` is a value between `1` and `8` representing the size of the skeleton in multiples of 4 pixels (using the CSS variables `--spacingHorizontalXS`).

```html
<div class="fluent-skeleton-4" style="width: 200px; height: 20px;"></div>
```

You can also use the `FluentSkeleton.LoadingClass` method to get the CSS class for the skeleton loading state.
This allows you to apply a loading style to any component simply by enabling the LoadingClass based on the loading state.

```razor
<FluentLabel Class="@FluentSkeleton.LoadingClass(when: () => IsLoading, size: 4)">
```

{{ SkeletonCss }}

## API FluentSkeleton

{{ API Type=FluentSkeleton }}

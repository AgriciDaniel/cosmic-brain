---
title: Link
route: /link
icon: Link
---

# Link

The `Link` component allows users to navigation to a URL.

A link is interactive text that lets people navigate somewhere else, either within an experience or to a different app or site.

Don't use links for triggering actions other than navigation. To create a secondary action with low visual emphasis, try a transparent or subtle `FluentButton` instead.

View the [Usage Guidance](https://fluent2.microsoft.design/components/web/react/link/usage).

## Inline

By default, all links show an underline in the hover, focus, and pressed states. The optional inline link behavior also includes an underline in the rest and visited states. Use inline behavior to maximize visual cues that a link is present and interactive, especially if it appears next to other body text.

This inline link is also represented when the `FluentLink` is included in the `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p` or `FluentText` tag.

{{ LinkInline }}

## Wrapping

{{ LinkWrapping }}

## Link with icons

By placing the icon the content of the link, it is possible to specify a Color for the icon.

{{ LinkWithIcons }}

## API FluentLink

{{ API Type=FluentLink }}

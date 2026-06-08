---
title: Highlighter
route: /Highlighter
icon: Highlight
---

# Highlighter

A component which highlights words or phrases within text.  
The highlighter can be used in combination with any other component.

## General usage

{{ HighlighterDefault }}

## Multiple Highlights

In addition to `HighlightedText` parameter which accepts a single text fragment in the form of an string,
the `Delimiters` parameter define a list of chars which can be used to highlight several text fragments.  
See this example where `Delimiters=" ,;"` where you can use space, comma and semicolon to hihlight the search text.

Set the `UntilNextBoundary="true"` parameter if you want to highlight the text until the next regex boundary occurs.
This is useful when you want to highlight a word and all the text until the next **space**.  
In this example, the `HighlightedText="Lore, ips"` and the component will highlight the text until the next boundary which is a **space**.

{{ HighlighterDelimiters }}

## API FluentHighlighter

{{ API Type=FluentHighlighter }}

## Migrating to v5

No changes

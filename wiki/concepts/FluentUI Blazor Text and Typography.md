---
title: FluentUI Blazor Text and Typography
address: c-000147
status: developing
---

# FluentUI Blazor Text and Typography

> Part of the [[FluentUI Blazor]] component library. The `FluentText` and `FluentHighlighter` components provide Fluent Design typography and text highlighting capabilities.

## FluentText

The `FluentText` component codifies Fluent Design typography, standardizing text rendering across products. It replaces raw HTML elements with semantically meaningful text rendering.

### Basic Usage

```razor
<FluentText As="@TextTag.Span">text</FluentText>
```

The `As` parameter controls the HTML element rendered: `Span` (default), `Paragraph`, `Heading1` through `Heading6`, `Label`, `Strong`, `Emphasis`, `Small`, `Pre`, `Code`.

### Size

10 predefined sizes from the Fluent Design scale:

```razor
<FluentText Size="TextSize.Size100">100 (smallest)</FluentText>
<FluentText Size="TextSize.Size300">300</FluentText>
<FluentText Size="TextSize.Size500">500</FluentText>
<FluentText Size="TextSize.Size700">700</FluentText>
<FluentText Size="TextSize.Size900">900</FluentText>
<FluentText Size="TextSize.Size1000">1000 (largest)</FluentText>
```

### Weight

```razor
<FluentText Weight="TextWeight.Regular">Regular</FluentText>
<FluentText Weight="TextWeight.Medium">Medium</FluentText>
<FluentText Weight="TextWeight.Semibold">Semibold</FluentText>
<FluentText Weight="TextWeight.Bold">Bold</FluentText>
```

### Alignment

```razor
<FluentText Align="TextAlign.Start">Start aligned</FluentText>
<FluentText Align="TextAlign.End">End aligned</FluentText>
<FluentText Align="TextAlign.Center">Center aligned</FluentText>
<FluentText Align="TextAlign.Justify">Justified</FluentText>
```

> Avoid justified text on web pages -- inconsistent spacing makes scanning harder.

### Font Family

```razor
<FluentText Font="TextFont.Base">Font base</FluentText>
<FluentText Font="TextFont.Numeric">Font numeric 0123456789</FluentText>
<FluentText Font="TextFont.Monospace">Font monospace</FluentText>
```

### Text Markup Variations

```razor
<FluentText Italic="true">Italic text</FluentText>
<FluentText Underline="true">Underlined text</FluentText>
<FluentText Strikethrough="true">Strikethrough text</FluentText>
<FluentText Block="true">Block-level text</FluentText>
```

### Truncate and Nowrap

```razor
<FluentText Truncate="true" Nowrap="true">
    <div style="width: 320px;">
        This text will truncate with ellipsis when it overflows.
    </div>
</FluentText>
```

### Color

```razor
<FluentText Color="Color.Primary">Primary color text</FluentText>
<FluentText Color="Color.Custom" CustomColor="gold">Custom color text</FluentText>
```

### API Parameters

| Parameter | Type | Description |
|---|---|---|
| `As` | `TextTag?` | HTML element (`Span`, `Paragraph`, `H1`-`H6`, etc.) |
| `Size` | `TextSize?` | Font size (100-1000 scale) |
| `Weight` | `TextWeight?` | Font weight |
| `Align` | `TextAlign?` | Text alignment |
| `Font` | `TextFont?` | Font family (`Base`, `Numeric`, `Monospace`) |
| `Block` | `bool` | Display as block element |
| `Italic` | `bool` | Italic style |
| `Underline` | `bool` | Underline style |
| `Strikethrough` | `bool` | Strikethrough style |
| `Nowrap` | `bool` | Prevent text wrapping |
| `Truncate` | `bool` | Truncate with ellipsis (requires `Nowrap`) |
| `Color` | `Color?` | Text color |
| `CustomColor` | `string?` | Custom color value (requires `Color.Custom`) |

## FluentHighlighter

The `FluentHighlighter` component highlights words or phrases within text. It can be used in combination with any other component.

### Basic Usage

```razor
<FluentHighlighter HighlightedText="Lorem"
                   Delimiters=" ,;"
                   Text="@SampleText" />
```

### Multiple Highlights

Use the `Delimiters` parameter to split the `HighlightedText` into multiple fragments:

```razor
<FluentHighlighter HighlightedText="Lore, ips"
                   Delimiters=" ,;"
                   Text="@SampleText" />
```

This highlights both "Lore" and "ips" within the text.

### UntilNextBoundary

Set `UntilNextBoundary="true"` to highlight from the matched text to the next regex boundary (typically a space):

```razor
<FluentHighlighter HighlightedText="Lore, ips"
                   UntilNextBoundary="true"
                   Delimiters=" ,;"
                   Text="@SampleText" />
```

With this setting and `HighlightedText="Lore, ips"`, the component highlights from "Lore" to the next space and from "ips" to the next space independently.

### Custom Styling

```razor
<FluentHighlighter HighlightedText="@Highlight"
                   Style="background: var(--colorBrandBackground); color: white;"
                   Text="@SampleText" />
```

### API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Text` | `string` | The full text to display |
| `HighlightedText` | `string` | Text fragment(s) to highlight |
| `Delimiters` | `string` | Characters that separate multiple highlights |
| `UntilNextBoundary` | `bool` | Extend highlight to next regex boundary |
| `Style` | `string?` | CSS style applied to the highlighted spans |

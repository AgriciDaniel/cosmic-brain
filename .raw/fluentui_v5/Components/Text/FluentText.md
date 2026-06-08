---
title: Text
route: /Text
icon: CodeText
---

# Text

The text component codifies Fluent's opinions on typography to make them easy to use and standardize across products.

Use the text component for plain text. For hypertext, try a [FluentLink](/link) instead.

## Font families
Use the `Font` parameter to choose a font family. Use the monospace font to represent code.

## Alignment
The `Align` parameter allows you to change text alignment. In most cases, start aligned text is the easiest to read. Use other alignments sparingly.

Avoid justified text in web pages. The consistent line length and inconsistent spacing might make scanning information more difficult.

For more info, see our typography guidelines.

## Accessibility
By default, text components result in span elements. Use the as prop to produce semantic HTML.

Avoid using the appearance of a font to convey meaning. Bold and italic text should be used only when necessary, as not all screen readers communicate when text is bold or italicized.

## Example

{{ TextDefault }}

### Nowrap

{{ TextNowrap }}

### Truncate

{{ TextTruncate }}

### Text markup variations

{{ TextMakeup }}

### Size

{{ TextSizeExample }}

### Weight

{{ TextWeightExample }}

### Alignment

{{ TextAlignExample }}

### Font family

{{ TextFontExample }}

### Color

{{ TextColor }}

## API FluentLayout

{{ API Type=FluentText }}

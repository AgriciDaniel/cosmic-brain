---
title: Migration FluentRadio and FluentRadioGroup
route: /Migration/Radio
hidden: true
---

### FluentRadio specific changes
- Using the `ChildContent` parameter to specify the contents/label of a Radio item is no longer supported. Use the `Label` or `LabelTemplate` parameters instead.
- The `ReadOnly` parameter is not supported. Use the `Disabled` parameter instead.

### FluentRadio removed properties💥
- `ChildContent` — use `Label` or `LabelTemplate`.
- `ReadOnly` (`bool`)
- `AriaLabel` (`string?`)
- `Name` (`string?`)
- `Required` (`bool`)
- `Checked` (`bool?`)

### FluentRadio changed properties
- `Disabled`: `bool` → `bool?`

### FluentRadio new properties
- `LabelWidth` (`string?`) — controls the width of the label area.

### FluentRadioGroup removed properties💥
- `ParsingErrorMessage` (`string`)

### FluentRadioGroup new properties
- `Wrap` (`bool`) — enables wrapping of radio items.
- `Items` (`IEnumerable<TValue?>?`) — generates radio items from a collection.

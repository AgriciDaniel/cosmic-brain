---
type: concept
title: "FluentUI Blazor Card"
address: c-000106
created: 2026-05-25
updated: 2026-05-25
status: developing
tags:
  - blazor
  - fluent-ui
  - component
  - card
  - container
related:
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Layout and Stack]]"
---

# FluentUI Blazor Card

`FluentCard` is a container that holds information and actions related to a single concept or object, like a document or a contact. Cards give information prominence and create predictable patterns. By default, each card has `role="group"`.

## Appearance

Cards support four appearance styles depending on context and placement.

| Appearance | Use Case |
|------------|----------|
| `Default` | Standard card for most designs |
| `Filled` | Displayed on lighter gray or white surfaces; ensures contrast |
| `Outline` | Border-only card without filled background |
| `Subtle` | No background or border; interaction states provide visible footprint |

```razor
<FluentStack VerticalGap="12px" Orientation="Orientation.Vertical">
    <FluentCard>Default style</FluentCard>
    <FluentCard Appearance="@CardAppearance.Filled">Filled style</FluentCard>
    <FluentCard Appearance="@CardAppearance.Outline">Outline style</FluentCard>
    <FluentCard Appearance="@CardAppearance.Subtle">Subtle style</FluentCard>
</FluentStack>
```

## Shadow

Cards can have shadows to create a sense of depth and separation from the background.

| Shadow Value | Description |
|-------------|-------------|
| `CardShadow.None` | No shadow |
| `CardShadow.Small` | Small shadow |
| `CardShadow.Default` | Default shadow |
| `CardShadow.Medium` | Medium shadow |
| `CardShadow.Large` | Large shadow |

```razor
<FluentCard Shadow="CardShadow.Medium" Width="150px" OnClick="@CardClick">
    Medium shadow
</FluentCard>

@code {
    void CardClick() => Console.WriteLine("Card clicked");
}
```

## Clickable

Adding an `OnClick` handler makes the card clickable, useful for navigation or triggering actions.

```razor
<FluentCard OnClick="@CardClick">
    This FluentCard is clickable.
</FluentCard>

@code {
    void CardClick() => Console.WriteLine("Card clicked");
}
```

## Composition Examples

Cards compose well with other components to build rich UI elements.

```razor
<FluentCard Width="300px">
    <FluentStack VerticalAlignment="VerticalAlignment.Center">
        <FluentImage Source="@PowerPointLogo" />
        <FluentStack Orientation="Orientation.Vertical" Margin="@Margin.Horizontal2">
            <FluentText Weight="TextWeight.Semibold">Team Offsite 2025</FluentText>
            <FluentText Size="TextSize.Size200"
                       Color="@Color.Custom"
                       CustomColor="@SystemColors.Neutral.Foreground3">
                OneDrive > Presentations
            </FluentText>
        </FluentStack>
        <FluentSpacer />
        <FluentButton Appearance="ButtonAppearance.Subtle"
                      IconOnly="true"
                      IconStart="@(new Icons.Regular.Size20.LineHorizontal1Dot())" />
    </FluentStack>
</FluentCard>
```

## Key Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `Appearance` | `CardAppearance?` | Default, Filled, Outline, or Subtle |
| `Shadow` | `CardShadow?` | None, Small, Default, Medium, or Large |
| `Width` | `string?` | Card width (any CSS value) |
| `OnClick` | `EventCallback<MouseEventArgs>` | Click handler (makes card interactive) |

## Best Practices

- Use cards consistently for particular use cases across experiences.
- Cards can be composed with `FluentStack`, `FluentText`, `FluentImage`, and `FluentButton` for rich layouts.
- The `Subtle` appearance is useful for inline card areas that need hover/focus interaction states without a visible box.

## Source

[[FluentUI Blazor]] (v5.0.0-RC.3) — Card component documentation.

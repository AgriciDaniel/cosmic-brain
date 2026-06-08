---
title: Switch
route: /Switch
icon: ToggleLeft
---

# Switch

A **FluentSwitch** component represents a physical switch that allows someone to choose between two mutually exclusive options.  
For example, "On/Off" and "Show/Hide". Choosing an option should produce an immediate result.

## Best practices

**Layout**

When people need to perform extra steps for changes to take effect, use a check box instead. For example, if they must click a "Submit", "Next", or "OK" button to apply changes, use a check box.

**Content**

Only replace the On/Off labels if there are more specific labels for the setting. For example, you might use Show/Hide if the setting is "Show images".
Keep descriptive text short and concise—two to four words; preferably nouns. For example, "Focused inbox" or "WiFi".

{{ SwitchDefault }}

## Label position

{{ SwitchLabelPosition }}

## Checked and Unchecked Messages

For compatibility reasons with the previous version, the two attributes
`CheckedMessage` and `UncheckedMessage` are still available. However, they are **deprecated**
and will no longer be available in a future release.

It is recommended that you use the `Label` attribute from now on.

{{ SwitchMessage }}

## ReadOnly and Disabled

A Switch can be disabled and read only.

{{ SwitchReadOnlyDisabled }}

## API FluentSwitch

{{ API Type=FluentSwitch }}

## Migrating to v5

{{ INCLUDE File=MigrationFluentSwitch }}

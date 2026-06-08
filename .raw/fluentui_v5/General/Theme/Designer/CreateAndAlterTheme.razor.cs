// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using Microsoft.AspNetCore.Components;
using Microsoft.FluentUI.AspNetCore.Components;

namespace FluentUI.Demo.Client.Documentation.General.Theme.Designer;

public partial class CreateAndAlterTheme
{
    ElementReference _exampleBlocks;

    async Task ApplyCustomThemeAsync()
    {
        var isDark = await ThemeService.IsDarkModeAsync();
        var theme = await ThemeService.CreateCustomThemeAsync(new ThemeSettings()
        {
            Color = "#0FFC0D",
            Mode = isDark ? ThemeMode.Dark : ThemeMode.Light,
        });

        theme.Borders.Radius.Medium = "40px";
        theme.Fonts.Family.Base = "Comic Sans MS, cursive, sans-serif";
        theme.Fonts.Size.Base300 = "10px";
        theme.Lines.Height.Base300 = "8px";

        await ThemeService.SetThemeToElementAsync(_exampleBlocks, theme);
    }

    async Task ResetThemeAsync()
    {
        var isDark = await ThemeService.IsDarkModeAsync();
        var color = await ThemeService.GetBrandColorAsync();

        var theme = await ThemeService.CreateCustomThemeAsync(new ThemeSettings()
        {
            Color = color,
            Mode = isDark ? ThemeMode.Dark : ThemeMode.Light,
        });

        await ThemeService.SetThemeToElementAsync(_exampleBlocks, theme);
    }
}

// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using Microsoft.AspNetCore.Components;
using Microsoft.FluentUI.AspNetCore.Components;

namespace FluentUI.Demo.Client.Documentation.General.Theme.Designer;

public partial class ThemeDesigner
{
    string _color = "#0F6CBD";
    string? _hue = "0";
    string? _vibrancy = "0";
    bool _isDark;
    bool _isExact;
    ElementReference _themePreviewElement;

    IReadOnlyDictionary<string, string>? _palette;

    [Inject]
    private IThemeService ThemeService { get; set; } = default!;

    protected override async Task OnInitializedAsync()
    {
        _isDark = await ThemeService.IsSystemDarkAsync();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await PreviewThemeAsync();
        }
    }

    private async Task PreviewThemeAsync()
    {
        var hue = int.TryParse(_hue, out var h) ? h / 100.0 : 0;
        var vibrancy = int.TryParse(_vibrancy, out var v) ? v / 100.0 : 0;

        _color = _color.ToUpper();

        var settings = new ThemeSettings(
            _color,
            hue,
            vibrancy,
            _isDark ? ThemeMode.Dark : ThemeMode.Light,
            _isExact
        );

        //var jsSettings = settings.ToJsThemeSettings();

        await ThemeService.SetThemeToElementAsync(_themePreviewElement, settings);

        _palette = await ThemeService.GetColorRampFromSettingsAsync(settings);
        StateHasChanged();

    }

    private async Task ApplyThemeAsync()
    {
        var hue = int.TryParse(_hue, out var h) ? h / 100.0 : 0;
        var vibrancy = int.TryParse(_vibrancy, out var v) ? v / 100.0 : 0;
        _color = _color.ToUpper();
        var settings = new ThemeSettings(
            _color,
            hue,
            vibrancy,
            _isDark ? ThemeMode.Dark : ThemeMode.Light,
            _isExact
        );
        await ThemeService.SetThemeAsync(settings);
    }

    private async Task ResetThemeAsync()
    {

        _palette = null;
        _color = "#0F6CBD";
        _hue = "0";
        _vibrancy = "0";
        _isDark = await ThemeService.IsSystemDarkAsync();
        _isExact = false;

        var settings = new ThemeSettings(
            _color,
            0,
            0,
            _isDark ? ThemeMode.Dark : ThemeMode.Light,
            _isExact
        );

        await ThemeService.SetThemeToElementAsync(_themePreviewElement, settings);
        await ThemeService.SetThemeAsync(settings);
        await ThemeService.ClearStoredThemeSettingsAsync();

        StateHasChanged();
    }
}

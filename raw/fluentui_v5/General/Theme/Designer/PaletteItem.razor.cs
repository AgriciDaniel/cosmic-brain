// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using System.Globalization;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace FluentUI.Demo.Client.Documentation.General.Theme.Designer;

public partial class PaletteItem
{
    string _color = string.Empty;

    [Parameter]
    public string Hex { get; set; } = string.Empty;

    [Parameter]
    public string Value { get; set; } = string.Empty;

    [Inject] private IJSRuntime JS { get; set; } = default!;

    protected override void OnInitialized()
    {
        _color = int.Parse(Value, CultureInfo.InvariantCulture) < 100 ? "white" : "black";
    }

    private async Task CopyHexAsync()
    {
        if (!string.IsNullOrWhiteSpace(Hex))
        {
            await JS.InvokeVoidAsync("navigator.clipboard.writeText", Hex);
            Console.WriteLine($"Copied to clipboard: {Hex}");
        }
    }
}

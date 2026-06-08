// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using Microsoft.FluentUI.AspNetCore.Components;

namespace FluentUI.Demo.Client.Documentation.Components.Badges.Badge.Examples;
public partial class BadgeAttached
{
    private string? content = "Badge";
    private string? offsetX; // = "30";
    private string? offsetY; // = "5";

    private Positioning? _positioning;

    private void HandlePositioning(Positioning positioning)
    {
        Console.WriteLine($"Positioning: {positioning}");

        _positioning = positioning;
    }
}

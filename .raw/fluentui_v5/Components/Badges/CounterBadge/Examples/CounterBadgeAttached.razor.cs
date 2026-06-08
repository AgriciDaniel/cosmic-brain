// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using Microsoft.FluentUI.AspNetCore.Components;

namespace FluentUI.Demo.Client.Documentation.Components.Badges.CounterBadge.Examples;
public partial class CounterBadgeAttached
{
    private string? count = "3";
    private string? overflowCount = string.Empty;
    private string? offsetX;
    private string? offsetY;

    private Positioning? _positioning;

    private void HandlePositioning(Positioning positioning)
    {
        Console.WriteLine($"Positioning: {positioning}");

        _positioning = positioning;
    }
}

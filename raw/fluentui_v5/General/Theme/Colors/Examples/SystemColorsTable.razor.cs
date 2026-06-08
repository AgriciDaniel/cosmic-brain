// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using System.Reflection;
using Microsoft.FluentUI.AspNetCore.Components;

namespace FluentUI.Demo.Client.Documentation.General.Theme.Colors.Examples;

public partial class SystemColorsTable
{
    private string Search { get; set; } = "";

    private string[] Filters { get; } = ["Background", "Foreground", "Stroke", "Border", "Alerts", "Presence"];

    private static IEnumerable<ColorItem> GetAllColorConstants()
    {
        var result = new List<ColorItem>();
        var nestedTypes = typeof(StylesVariables.Colors).GetNestedTypes(BindingFlags.Public | BindingFlags.NonPublic);

        foreach (var nestedType in nestedTypes)
        {
            var constants = nestedType.GetFields(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.DeclaredOnly)
                        .Where(f => f.IsLiteral && !f.IsInitOnly && f.FieldType == typeof(string));

            foreach (var field in constants)
            {
                var category = nestedType.Name;
                var name = field.Name;
                var value = field.GetRawConstantValue() as string;
                result.Add(new ColorItem(category, name, value ?? ""));
            }
        }

        return result.OrderBy(i => i.Name);
    }

    private void FilterClickHander(MenuItemEventArgs item)
    {
        Search = item.Text ?? "";
    }

    record ColorItem(string Category, string Name, string Value);
}

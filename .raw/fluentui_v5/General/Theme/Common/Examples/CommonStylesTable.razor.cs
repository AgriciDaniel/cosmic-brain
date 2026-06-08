// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using System.Reflection;
using Microsoft.FluentUI.AspNetCore.Components;

namespace FluentUI.Demo.Client.Documentation.General.Theme.Common.Examples;

public partial class CommonStylesTable
{
    private static IEnumerable<StyleItem> GetAllStyleConstants()
    {
        var result = new List<StyleItem>();
        var constants = typeof(CommonStyles).GetFields(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.DeclaredOnly)
                        .Where(f => f.IsLiteral && !f.IsInitOnly && f.FieldType == typeof(string));

        foreach (var field in constants)
        {
            var name = field.Name;
            var value = field.GetRawConstantValue() as string;
            result.Add(new StyleItem(name, value ?? ""));
        }

        return result.OrderBy(i => i.Name);
    }

    record StyleItem(string Name, string Value);
}

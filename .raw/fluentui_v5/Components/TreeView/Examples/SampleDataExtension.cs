// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using Microsoft.FluentUI.AspNetCore.Components;
using FluentUI.Demo.SampleData;
using Icons = Microsoft.FluentUI.AspNetCore.Components.Icons;

namespace FluentUI.Demo.Client.Documentation.Components.TreeView.Examples;

public static class SampleDataExtension
{
    /// <summary>
    /// Converts a collection of <see cref="People.Company"/> objects into a hierarchical collection
    /// of <see cref="TreeViewItem"/> objects.
    /// </summary>
    public static IEnumerable<TreeViewItem> ToTreeViewItems(this IEnumerable<People.Company> organization, bool includeIcons = false)
    {
        return organization.Select(company => new TreeViewItem
        {
            IconStart = includeIcons ? new Icons.Regular.Size16.BuildingBank().WithColor(Color.Primary) : null,
            Id = company.Id,
            Text = company.Name,
            Items = company.Departments.Select(dept => new TreeViewItem
            {
                IconStart = includeIcons ? new Icons.Regular.Size16.ContactCardGroup().WithColor(SystemColors.Palette.DarkOrangeForeground1) : null,
                Id = dept.Id,
                Text = dept.Name,
                Items = dept.Employees.Select(emp => new TreeViewItem
                {
                    IconStart = includeIcons ? new Icons.Regular.Size16.PersonVoice().WithColor(SystemColors.Palette.ForestBorderActive) : null,
                    Id = emp.Id,
                    Text = $"{emp.FirstName} {emp.LastName}",
                }).ToArray()
            }).ToArray()
        }).ToArray();
    }
}

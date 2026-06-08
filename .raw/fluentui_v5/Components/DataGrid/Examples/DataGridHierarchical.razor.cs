// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using Microsoft.FluentUI.AspNetCore.Components;
using static FluentUI.Demo.SampleData.Olympics2024;

namespace FluentUI.Demo.Client.Documentation.Components.DataGrid.Examples;

public partial class DataGridHierarchical
{
    private readonly List<OlympicGridItem> items = [];

    protected override void OnInitialized()
    {
        foreach (var continent in Continents)
        {
            var countries = Countries.Where(c => c.ContinentCode == continent.Code).OrderByDescending(c => c.Medals.Total);

            var continentItem = new OlympicGridItem
            {
                Item = continent with
                {
                    Medals = new Medals(
                        Gold: countries.Sum(c => c.Medals.Gold),
                        Silver: countries.Sum(c => c.Medals.Silver),
                        Bronze: countries.Sum(c => c.Medals.Bronze)
                    )
                },
                IsCollapsed = true
            };

            items.Add(continentItem);

            foreach (var country in countries)
            {
                var countryItem = new OlympicGridItem
                {
                    Item = country,
                    Depth = 1,
                    IsHidden = true
                };
                continentItem.Children.Add(countryItem);
                items.Add(countryItem);
            }
        }
    }

    public class OlympicGridItem : HierarchicalGridItem<Country, OlympicGridItem>
    {
    }
}

---
title: Remote data
route: /DataGrid/RemoteData
---

# Remote data

## Remote data

If you're using Blazor WebAssembly, it's very common to fetch data from a JSON API on a server. If you want to
fetch only the data that's needed for the current page/viewport and apply any sorting or filtering rules on the
server, you can use the `ItemsProvider` parameter.

You can also use `ItemsProvider` with Blazor Server if it needs to query an external endpoint, or in any
other case where your requirements aren't covered by an `IQueryable`.

To do this, supply a callback matching the `GridItemsProvider&lt;TGridItem&gt;` delegate type, where `TGridItem`
is the type of data displayed in the grid. Your callback will be given a parameter of type `GridItemsProviderRequest&lt;TGridItem&gt;`
which specifies the start index, maximum row count, and sort order of data to return. As well as returning the matching items, you need
to return a `totalItemCount` so that paging or virtualization can work.

Here is an example of connecting a grid to the public [OpenFDA Food Enforcement database](https://open.fda.gov/apis/food/enforcement/).

This grid is using a 'sticky' header (i.e. the header is always visible when scrolling). The buttons in the last column disappear under the header when scrolling.
In this example they don't really do anything more than writing a message in the console log'

The second column has a custom `Style` parameter set and applied to it. The 4th column has its `Tooltip`
parameter set to true. This will show the full content of the cell when hovering over it. See the 'Razor' tab for how these
parameters have been applied.

{{ DataGridRemoteData }}

## Remote data with RefreshItems

If the external endpoint controls filtering, paging and sorting you can use `Items` combined with `RefreshItems`.

The method defined in `RefreshItems` will be called once, and only once, if there is a change in the pagination or ordering.

Meanwhile, you can control the filtering with elements present on the page itself and force a call to `RefreshItems` with the force option in the RefreshDataAsync.

{{ DataGridRemoteData2 }}

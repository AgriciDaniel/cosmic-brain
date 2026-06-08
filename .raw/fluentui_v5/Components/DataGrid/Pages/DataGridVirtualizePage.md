---
title: Virtualize
route: /DataGrid/Virtualize
---
# Virtualize

It can be expensive both to fetch and to render large numbers of items. If the amount of data you're
displaying might be large, you should use either paging or virtualization.

Virtualization provides the appearance of continuous scrolling through an arbitrarily-large data set,
while only needing to fetch and render the rows that are currently in the scroll viewport. This can provide
excellent performance even when the data set is vast. FluentDataGrid's virtualization feature is built on Blazor's
built-in [Virtualize component](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/virtualization?view=aspnetcore-6.0),
so it shares the same capabilities, requirements, and limitations.

Enabling virtualization is just a matter of passing `Virtualize="true"`. For it to work
properly and reliably, every row rendered must have the same known height. **This is handled by the `FluentDataGrid` code**

{{ DataGridVirtualize }}

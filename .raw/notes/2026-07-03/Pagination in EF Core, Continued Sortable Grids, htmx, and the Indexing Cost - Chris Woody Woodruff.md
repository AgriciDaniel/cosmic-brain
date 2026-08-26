---
title: "Pagination in EF Core, Continued: Sortable Grids, htmx, and the Indexing Cost - Chris Woody Woodruff"
source: "https://woodruff.dev/pagination-in-ef-core-continued-sortable-grids-htmx-and-the-indexing-cost/?ref=dailydev"
author:
  - "[[Chris Woodruff]]"
published: 2026-06-02
created: 2026-07-03
description: "The first post in this series made a clean case for keyset pagination over Skip/Take. Readers on LinkedIn pushed back with a fair question I'd dodged: what about sortable grids where the user picks the column? The post showed ORDER BY Id, which is the easy case. Real apps have grids with eight clickable column"
tags:
  - "clippings"
---
![](https://www.woodruff.dev/wp-content/uploads/2026/04/efe-effortlessly.png)

The [first post in this series](#) made a clean case for keyset pagination over `Skip` / `Take`. Readers on LinkedIn pushed back with a fair question I’d dodged: **what about sortable grids where the user picks the column?** The post showed `ORDER BY Id`, which is the easy case. Real apps have grids with eight clickable column headers and a “sort direction” toggle.

This follow-up is the honest answer. It covers:

- Where the original argument still holds, and where it underserved you
- Keyset pagination with a fixed non-ID sort
- Keyset pagination with **dynamic** sort columns
- The indexing reality. Every sortable column is an index, and that’s expensive
- When you should just use offset

## Where the original argument holds and where it didn’t

Two things from the first post hold up under scrutiny:

**Performance.** `OFFSET 10000` semantically requires producing and discarding 10,000 rows in sort order. There’s no index structure that lets the database “jump to the 10,001st row in this filtered, sorted result” without traversing what came before. You can verify this by checking that in any execution plan, rows read grow with the offset, and the rows returned are even when the r constant. This is true on SQL Server, PostgreSQL, and MySQL alike. It’s a property of what `OFFSET` *means*, not a database engine limitation.

**Correctness under concurrent writes.** If rows are inserted or deleted between page requests, offset skips or duplicates records silently. This is a correctness bug, not a performance issue, and it’s invisible until a user reports a missing record they swear they saw.

What the first post overlooked: the implementation cost of keyset scales with the dynamism of your sort requirements. A single fixed sort order is genuinely simple. Twelve user-selectable columns with mixed directions is more work, and that work has costs in code complexity *and* index storage. The post should have engaged with that trade-off rather than treating keyset as a universal upgrade.

So here’s the revised thesis: **use keyset when the table is large AND write-heavy AND user-facing.** Three ANDs, not ORs. If any of those is no, offset is probably fine and “probably fine” is not a hedge, it’s the honest answer.

## Keyset with a fixed non-ID sort

The bridge case, before we tackle dynamic sorts. The user always sees orders sorted by `CreatedAt DESC,` newest first. This is the canonical “activity feed” or “order history” pattern.

The cursor needs two fields: the sort value and the primary key (as a tiebreaker, because `CreatedAt` isn’t unique).

public record OrderCursor(DateTime CreatedAt, int Id);

public async Task<List\<Order>> GetPageAsync(OrderCursor? cursor, int pageSize)

{

var query = \_db.Orders.AsNoTracking().AsQueryable();

if (cursor is not null)

{

query = query.Where(o =>

o.CreatedAt < cursor.CreatedAt ||

(o.CreatedAt == cursor.CreatedAt && o.Id < cursor.Id));

}

return await query

.OrderByDescending(o => o.CreatedAt)

.ThenByDescending(o => o.Id)

.Take(pageSize)

.ToListAsync();

}

public record OrderCursor(DateTime CreatedAt, int Id); public async Task<List\<Order>> GetPageAsync(OrderCursor? cursor, int pageSize) { var query = \_db.Orders.AsNoTracking().AsQueryable(); if (cursor is not null) { query = query.Where(o => o.CreatedAt < cursor.CreatedAt || (o.CreatedAt == cursor.CreatedAt && o.Id < cursor.Id)); } return await query.OrderByDescending(o => o.CreatedAt).ThenByDescending(o => o.Id).Take(pageSize).ToListAsync(); }

```js
public record OrderCursor(DateTime CreatedAt, int Id);
​
public async Task<List<Order>> GetPageAsync(OrderCursor? cursor, int pageSize)
{
    var query = _db.Orders.AsNoTracking().AsQueryable();
​
    if (cursor is not null)
    {
        query = query.Where(o =>
            o.CreatedAt < cursor.CreatedAt ||
            (o.CreatedAt == cursor.CreatedAt && o.Id < cursor.Id));
    }
​
    return await query
        .OrderByDescending(o => o.CreatedAt)
        .ThenByDescending(o => o.Id)
        .Take(pageSize)
        .ToListAsync();
}
```

Two things to notice. The tuple comparison handles the `CreatedAt` ties, without it, two rows sharing a millisecond timestamp could be silently skipped. And the `OrderByDescending(o => o.Id)` tiebreaker matters: it has to match the cursor’s logic exactly, or your results drift.

The supporting index:

```js
CREATE INDEX IX_Orders_CreatedAt_Id ON Orders(CreatedAt DESC, Id DESC);
```

SQL Server can scan an ascending index backward, so `CREATE INDEX ... (CreatedAt, Id)` works too, but writing the index in the same direction as your query makes the intent explicit and prevents a future maintainer from “fixing” the sort order and breaking the seek.

## Keyset with dynamic sort columns

Now, the case the LinkedIn commenters actually asked about. The user clicks a column header. Then a different one. Then toggles direction. The cursor needs to carry not just *values* but *which column and direction those values belong to*, otherwise a client could pass a `CreatedAt` cursor into a `LastName` -sorted query and get garbage.

Here’s the cursor shape:

public enum SortColumn { CreatedAt, Total, CustomerId, Status }

public enum SortDirection { Asc, Desc }

public record SortableCursor(

SortColumn Column,

SortDirection Direction,

string KeyValue, // serialized the column's type varies

int Id);

public enum SortColumn { CreatedAt, Total, CustomerId, Status } public enum SortDirection { Asc, Desc } public record SortableCursor( SortColumn Column, SortDirection Direction, string KeyValue, // serialized the column's type varies int Id);

```js
public enum SortColumn { CreatedAt, Total, CustomerId, Status }
public enum SortDirection { Asc, Desc }
​
public record SortableCursor(
    SortColumn Column,
    SortDirection Direction,
    string KeyValue,   // serialized the column's type varies
    int Id);
```

`KeyValue` is a string because the type depends on which column we’re sorting by. Serializing to string keeps the cursor uniform on the wire and lets us round-trip it as a single opaque token.

The query builder dispatches on the column:

public async Task<(List\<Order> Items, SortableCursor? Next)> GetPageAsync(

SortableCursor? cursor, SortColumn column, SortDirection direction, int pageSize)

{

var query = \_db.Orders.AsNoTracking().AsQueryable();

// Validate cursor matches the requested sort. If not, ignore it (page 1 in new order).

if (cursor is not null && (cursor.Column!= column || cursor.Direction!= direction))

cursor = null;

query = (column, direction) switch

{

(SortColumn.CreatedAt, SortDirection.Desc) => ApplyCreatedAtDesc(query, cursor),

(SortColumn.CreatedAt, SortDirection.Asc) => ApplyCreatedAtAsc(query, cursor),

(SortColumn.Total, SortDirection.Desc) => ApplyTotalDesc(query, cursor),

//...one branch per (column, direction) pair

\_ => throw new ArgumentOutOfRangeException(nameof(column))

};

var items = await query.Take(pageSize).ToListAsync();

var next = items.Count == pageSize

? BuildCursor(items\[^1\], column, direction)

: null;

return (items, next);

}

private static IQueryable\<Order> ApplyCreatedAtDesc(IQueryable\<Order> q, SortableCursor? c)

{

if (c is not null)

{

var cursorDate = DateTime.Parse(c.KeyValue);

q = q.Where(o =>

o.CreatedAt < cursorDate ||

(o.CreatedAt == cursorDate && o.Id < c.Id));

}

return q.OrderByDescending(o => o.CreatedAt).ThenByDescending(o => o.Id);

}

public async Task<(List\<Order> Items, SortableCursor? Next)> GetPageAsync( SortableCursor? cursor, SortColumn column, SortDirection direction, int pageSize) { var query = \_db.Orders.AsNoTracking().AsQueryable(); // Validate cursor matches the requested sort. If not, ignore it (page 1 in new order). if (cursor is not null && (cursor.Column!= column || cursor.Direction!= direction)) cursor = null; query = (column, direction) switch { (SortColumn.CreatedAt, SortDirection.Desc) => ApplyCreatedAtDesc(query, cursor), (SortColumn.CreatedAt, SortDirection.Asc) => ApplyCreatedAtAsc(query, cursor), (SortColumn.Total, SortDirection.Desc) => ApplyTotalDesc(query, cursor), //...one branch per (column, direction) pair \_ => throw new ArgumentOutOfRangeException(nameof(column)) }; var items = await query.Take(pageSize).ToListAsync(); var next = items.Count == pageSize? BuildCursor(items\[^1\], column, direction): null; return (items, next); } private static IQueryable\<Order> ApplyCreatedAtDesc(IQueryable\<Order> q, SortableCursor? c) { if (c is not null) { var cursorDate = DateTime.Parse(c.KeyValue); q = q.Where(o => o.CreatedAt < cursorDate || (o.CreatedAt == cursorDate && o.Id < c.Id)); } return q.OrderByDescending(o => o.CreatedAt).ThenByDescending(o => o.Id); }

```js
public async Task<(List<Order> Items, SortableCursor? Next)> GetPageAsync(
    SortableCursor? cursor, SortColumn column, SortDirection direction, int pageSize)
{
    var query = _db.Orders.AsNoTracking().AsQueryable();
​
    // Validate cursor matches the requested sort. If not, ignore it (page 1 in new order).
    if (cursor is not null && (cursor.Column != column || cursor.Direction != direction))
        cursor = null;
​
    query = (column, direction) switch
    {
        (SortColumn.CreatedAt, SortDirection.Desc) => ApplyCreatedAtDesc(query, cursor),
        (SortColumn.CreatedAt, SortDirection.Asc)  => ApplyCreatedAtAsc(query, cursor),
        (SortColumn.Total, SortDirection.Desc)     => ApplyTotalDesc(query, cursor),
        // ...one branch per (column, direction) pair
        _ => throw new ArgumentOutOfRangeException(nameof(column))
    };
​
    var items = await query.Take(pageSize).ToListAsync();
    var next = items.Count == pageSize
        ? BuildCursor(items[^1], column, direction)
        : null;
​
    return (items, next);
}
​
private static IQueryable<Order> ApplyCreatedAtDesc(IQueryable<Order> q, SortableCursor? c)
{
    if (c is not null)
    {
        var cursorDate = DateTime.Parse(c.KeyValue);
        q = q.Where(o =>
            o.CreatedAt < cursorDate ||
            (o.CreatedAt == cursorDate && o.Id < c.Id));
    }
    return q.OrderByDescending(o => o.CreatedAt).ThenByDescending(o => o.Id);
}
```

A few honest notes on this code:

- The `switch` expression with one branch per `(column, direction)` pair is verbose but readable, type-safe, and produces clean SQL. The alternative, building expression trees dynamically, is more elegant in theory but harder to debug, profile, and review.
- **When the user changes sort columns, the cursor is reset.** There’s no way to “translate” a cursor across sort orders, because different sorts mean different sequences of rows. The validation at the top of the method does this silently; you might prefer to return an error.
- This is roughly 80 lines of code for four sortable columns. Compare to ~5 lines for offset. That’s a real cost.
- For wire transport, base64-encode the JSON-serialized cursor. The client treats it as an opaque token.

## The indexing reality

This is the section the LinkedIn commenter implicitly asked for, and most pagination posts skip. Sortable grids force a database design conversation, not just a query conversation.

The rule: **every keyset-sortable column needs a covering composite index ending in the primary key.** No exceptions. Without the matching index, the keyset `WHERE` clause falls back to a scan, and you’ve lost the entire benefit.

For four sortable columns in our `Order` example:

CREATE INDEX IX\_Orders\_CreatedAt\_Id ON Orders(CreatedAt, Id);

CREATE INDEX IX\_Orders\_Total\_Id ON Orders(Total, Id);

CREATE INDEX IX\_Orders\_Customer\_Id ON Orders(CustomerId, Id);

CREATE INDEX IX\_Orders\_Status\_Id ON Orders(Status, Id);

CREATE INDEX IX\_Orders\_CreatedAt\_Id ON Orders(CreatedAt, Id); CREATE INDEX IX\_Orders\_Total\_Id ON Orders(Total, Id); CREATE INDEX IX\_Orders\_Customer\_Id ON Orders(CustomerId, Id); CREATE INDEX IX\_Orders\_Status\_Id ON Orders(Status, Id);

```js
CREATE INDEX IX_Orders_CreatedAt_Id ON Orders(CreatedAt, Id);
CREATE INDEX IX_Orders_Total_Id     ON Orders(Total, Id);
CREATE INDEX IX_Orders_Customer_Id  ON Orders(CustomerId, Id);
CREATE INDEX IX_Orders_Status_Id    ON Orders(Status, Id);
```

A bidirectional sort (ascending and descending) on the same column generally doesn’t need two indexes. SQL Server can scan an index backward, but verify against your execution plans.

Now the cost math. For a 10M-row `Order` table with 8-byte `bigint` keys, a single composite index on `(CreatedAt, Id)` is roughly:

- ~16 bytes per index entry (8 for `datetime2`, 8 for `bigint`), plus row locator and page overhead
- Realistic on-disk size: ~250–350 MB per index
- Four such indexes: roughly **1 GB of index storage for one table**

That’s storage. The bigger hidden cost is **write amplification**: every `INSERT` updates every index. Every `UPDATE` that touches an indexed column updates that index. On a hot table doing 1,000 writes per second, four extra indexes can meaningfully increase your write latency and your transaction log volume.

Three takeaways:

1. **“Any column is sortable” is an expensive product promise.** Often, the right answer is “users can sort by these three columns” rather than “users can sort by any of the twelve columns we display.”
2. **Audit your indexes against your sort options.** A sortable column with no supporting index is worse than an offset. You get the keyset complexity *and* the scan cost.
3. **Watch the execution plan, not the wall clock.** A query that runs in 12ms on an empty dev database can run in 2 seconds on a 50M-row production database if the index is missing. Wall-clock time during development is not evidence of correctness.

## A working demo: Razor Pages + htmx

The pattern is small and worth understanding because it’s where keyset pagination feels most natural.

**The page** renders a table with clickable column headers. Each header is an htmx link that triggers a `GET` to `?handler=Sort&column=X&direction=Y`, which returns a fresh `<tbody>` fragment:

\<table>

\<thead>

\<tr>

\<th>\<a hx-get="?handler=Sort&column=CreatedAt&direction=Desc"

hx-target="#orders-body"

hx-swap="innerHTML">Created\</a>\</th>

\<th>\<a hx-get="?handler=Sort&column=Total&direction=Desc"

hx-target="#orders-body"

hx-swap="innerHTML">Total\</a>\</th>

<!--... -->

\</tr>

\</thead>

\<tbody id="orders-body">

\<partial name="\_OrdersRows" model="Model.Page" />

\</tbody>

\</table>

\<table> \<thead> \<tr> \<th>\<a hx-get="?handler=Sort&column=CreatedAt&direction=Desc" hx-target="#orders-body" hx-swap="innerHTML">Created\</a>\</th> \<th>\<a hx-get="?handler=Sort&column=Total&direction=Desc" hx-target="#orders-body" hx-swap="innerHTML">Total\</a>\</th> <!--... --> \</tr> \</thead> \<tbody id="orders-body"> \<partial name="\_OrdersRows" model="Model.Page" /> \</tbody> \</table>

```js
<table>
  <thead>
    <tr>
      <th><a hx-get="?handler=Sort&column=CreatedAt&direction=Desc"
             hx-target="#orders-body"
             hx-swap="innerHTML">Created</a></th>
      <th><a hx-get="?handler=Sort&column=Total&direction=Desc"
             hx-target="#orders-body"
             hx-swap="innerHTML">Total</a></th>
      <!-- ... -->
    </tr>
  </thead>
  <tbody id="orders-body">
    <partial name="_OrdersRows" model="Model.Page" />
  </tbody>
</table>
```

**The “load more” row** is the bottom row of the partial. It carries the next cursor and triggers when the user scrolls it into view:

@if (Model.NextCursor is not null)

{

\<tr hx-get="?handler=LoadMore&cursor=@Model.NextCursor&column=@Model.Column&direction=@Model.Direction"

hx-trigger="revealed"

hx-swap="outerHTML">

\<td colspan="5">Loading…\</td>

\</tr>

}

@if (Model.NextCursor is not null) { \<tr hx-get="?handler=LoadMore&cursor=@Model.NextCursor&column=@Model.Column&direction=@Model.Direction" hx-trigger="revealed" hx-swap="outerHTML"> \<td colspan="5">Loading…\</td> \</tr> }

```js
@if (Model.NextCursor is not null)
{
    <tr hx-get="?handler=LoadMore&cursor=@Model.NextCursor&column=@Model.Column&direction=@Model.Direction"
        hx-trigger="revealed"
        hx-swap="outerHTML">
        <td colspan="5">Loading…</td>
    </tr>
}
```

The `hx-trigger="revealed"` is the magic. When the placeholder row scrolls into the viewport, htmx fires the GET, the server returns more `<tr>` elements *plus a new sentinel row with the next cursor*, and `hx-swap="outerHTML"` replaces the sentinel with the new rows. Infinite scroll, server-rendered, ~30 lines of total markup.

**The handler** is straightforward Razor Pages:

public async Task\<IActionResult> OnGetLoadMoreAsync(

string cursor, SortColumn column, SortDirection direction)

{

var decoded = CursorCodec.Decode(cursor);

var (items, next) = await \_paginator.GetPageAsync(decoded, column, direction, PageSize);

return Partial("\_OrdersRows",

new OrdersRowsModel(items, next is null? null: CursorCodec.Encode(next), column, direction));

}

public async Task\<IActionResult> OnGetLoadMoreAsync( string cursor, SortColumn column, SortDirection direction) { var decoded = CursorCodec.Decode(cursor); var (items, next) = await \_paginator.GetPageAsync(decoded, column, direction, PageSize); return Partial("\_OrdersRows", new OrdersRowsModel(items, next is null? null: CursorCodec.Encode(next), column, direction)); }

```js
public async Task<IActionResult> OnGetLoadMoreAsync(
    string cursor, SortColumn column, SortDirection direction)
{
    var decoded = CursorCodec.Decode(cursor);
    var (items, next) = await _paginator.GetPageAsync(decoded, column, direction, PageSize);
    return Partial("_OrdersRows",
        new OrdersRowsModel(items, next is null ? null : CursorCodec.Encode(next), column, direction));
}
```

Two things are worth flagging about this pattern. First, it’s why keyset pagination feels more natural than offset for modern server-rendered UIs, htmx (or HTMX-like patterns in Hotwire, Unpoly, etc.) wants to append fragments, and a cursor is exactly what you need to ask for “the next fragment.” Offset’s “page N of M” model doesn’t map as cleanly. Second, this approach is **back-button safe** in a way that infinite-scroll SPAs often aren’t, each cursor change is a real URL, and the browser history works.

## When to actually use offset

The boring section that makes the rest of the post defensible. Be specific:

- **Small tables.** Under ~50K rows, the OFFSET scan cost is microseconds. Indexing for keyset is over-engineering.
- **Admin tools that need “jump to page 47.”** There is no keyset equivalent. If the UX genuinely requires page numbers and total counts, offset is the answer.
- **Mostly-static data.** Reporting tables, configuration data and historical archives. The concurrency argument doesn’t apply.
- **Highly dynamic sorts on moderate-sized tables.** If you have twelve sort options and the table is 100K rows, the index storage and write amplification may exceed the perf gain. Run the numbers; don’t assume.
- **Hybrid setups.** Some teams use offset for the visible page-number UI on admin screens and keyset for the API endpoints powering infinite-scroll feeds. Same data, two access patterns.

The decision rule, restated: **keyset when the table is large AND write-heavy AND user-facing.** Anything else, default to offset and revisit if you hit a real problem.

## Closing

The first post made a case. The LinkedIn comments made it a better case. The honest version is: keyset pagination is the right tool for a specific shape of problem, large, hot, user-facing tables, and the cost of supporting sortable grids with it is real, paid mostly in index storage and write amplification rather than query code. For the wrong shape of the problem, the offset is simpler and finer.

If you take one thing from this post, take this: **every sortable column is an index.** Decide which columns are actually worth sorting by, index those, and use keyset. The decision about what’s “actually worth sorting by” is a product question, not a database one, and asking it is usually more valuable than the pagination technique you eventually pick.

Thanks to the readers on LinkedIn whose feedback pushed this post into existence.

![](https://www.woodruff.dev/wp-content/uploads/2026/04/efe-effortlessly.png)

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)
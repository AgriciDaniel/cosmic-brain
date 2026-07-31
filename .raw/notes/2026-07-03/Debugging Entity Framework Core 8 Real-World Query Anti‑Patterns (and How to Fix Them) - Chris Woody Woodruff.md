---
title: "Debugging Entity Framework Core: 8 Real-World Query Anti‑Patterns (and How to Fix Them) - Chris Woody Woodruff"
source: "https://woodruff.dev/debugging-entity-framework-core-8-real-world-query-anti-patterns-and-how-to-fix-them/"
author:
  - "[[Chris Woodruff]]"
published: 2025-12-04
created: 2026-07-03
description: "This is my post for the 2025 C# Advent. Check out all the great posts! I want to wish you a Merry Christmas, Happy Holidays, Happy Hanukkah, Happy Kwanzaa, and, finally, Happy Festivus. I will not be sharing my \"Airing of grievances\" or challenge anyone to a \"Feats of strength.\" Entity Framework Core is an excellent"
tags:
  - "clippings"
---
![Debugging Entity Framework Core: 8 Real-World Query Anti‑Patterns](https://woodruff.dev/wp-content/uploads/2025/12/Debugging-Entity-Framework-Core-8-Real-World-Query-Anti%E2%80%91Patterns.png)

*This is my post for the 2025 C# Advent. Check out* [*all the great posts*](https://www.csadvent.christmas/?ref=woodruff.dev)*!*

I want to wish you a Merry Christmas, Happy Holidays, Happy Hanukkah, Happy Kwanzaa, and, finally, Happy Festivus. I will not be sharing my “Airing of grievances” or challenge anyone to a “Feats of strength.”

Entity Framework Core is an excellent library for CRUD operations against a database. It is great to use LINQ to create database queries and retrieve data. What I am most surprised about is that many developers will not look at queries that fetch data, even if they may not be the “quickest.” Developers aren’t deliberately doing anything. They don’t have the skills or insight to address some of the anti-patterns in this blog post. I hope you get out as much as I did, creating the original conference talk and ASP.NET Core demo.

This “Bad Book Store” demo intentionally models a “bad” SQL schema to surface common anti‑patterns in Entity Framework Core queries. Each scenario shows: the LINQ shape, why it’s slow (what SQL Server does with it), and two levels of fixes: quick DB-side mitigations and proper data model changes that make EF Core fast by design.

You can find the demo at the following GitHub repository. https://github.com/cwoodruff/DebuggingEFCoreMSSQL (the project is in the demo folder)

Relevant files to peek at:

Relevant files to peek at:

- `Pages/Demo/Index.cshtml.cs` — the 8 demo queries and explanations
- `Data/BadBookStoreContext.cs` — the EF Core model; note the many `nvarchar` -typed date/number fields
- `Data/FixScripts.cs` — T‑SQL fixes (computed columns + indexes)

You can find the database BAK file and SQL script to create the database here. https://github.com/cwoodruff/DebuggingEFCoreMSSQL/tree/master/database

I recommend creating the MSSQL database (with data) to walk through the demo and review the code for this blog post.

## Query 1 — Orders by CustomerEmail + Date Range (Date Stored as String)

EF LINQ shape:

var start = "2023-01-01";

var end = "2025-12-31";

var q1 = db.Orders

.Where(o => o.CustomerEmail == "customer008@example.com"

&& string.Compare(o.OrderDate!, start) >= 0

&& string.Compare(o.OrderDate!, end) < 0

&& o.OrderStatus == "Completed")

.Select(o => new { o.OrderId, o.OrderDate, o.OrderTotal });

var start = "2023-01-01"; var end = "2025-12-31"; var q1 = db.Orders.Where(o => o.CustomerEmail == "customer008@example.com" && string.Compare(o.OrderDate!, start) >= 0 && string.Compare(o.OrderDate!, end) < 0 && o.OrderStatus == "Completed").Select(o => new { o.OrderId, o.OrderDate, o.OrderTotal });

```js
var start = "2023-01-01";
var end   = "2025-12-31";
var q1 = db.Orders
    .Where(o => o.CustomerEmail == "customer008@example.com"
             && string.Compare(o.OrderDate!, start) >= 0
             && string.Compare(o.OrderDate!, end)   <  0
             && o.OrderStatus == "Completed")
    .Select(o => new { o.OrderId, o.OrderDate, o.OrderTotal });
```

Why it’s slow

- `OrderDate` is `nvarchar(30)`. String comparisons kill sargability and a composite seek path doesn’t exist.
- Expect index/clustered scans, high logical reads.

Fix V1 (quick DB-side)

- Persist a computed `datetime2` from string and index it with email:
- `ALTER TABLE Orders ADD OrderDate_dt AS TRY_CONVERT(datetime2(3), OrderDate) PERSISTED;`
- `CREATE INDEX IX_Orders_CustomerEmail_OrderDate_dt ON dbo.Orders(CustomerEmail, OrderDate_dt) INCLUDE (OrderTotal, OrderStatus);`

Right fix (model + EF)

- Store `OrderDate` as `datetime2` in the table. In EF, map it as `DateTime` / `DateTime?`.
- Add a composite index in the model builder/migration:

modelBuilder.Entity\<Order>()

.HasIndex(o => new { o.CustomerEmail, o.OrderDate });

modelBuilder.Entity\<Order>().HasIndex(o => new { o.CustomerEmail, o.OrderDate });

```js
modelBuilder.Entity<Order>()
    .HasIndex(o => new { o.CustomerEmail, o.OrderDate });
```
- Write normal range predicates on `DateTime` — EF translates to a seekable range scan.

## Query 2 — Join Reviews ↔ Books by Title (Wide, Non‑Unique Text)

EF LINQ shape:

var q2 = from r in db.Reviews

join b in db.Books on r.BookTitle equals b.Title

where r.Rating >= 4

select new { r.ReviewId, b.Isbn, b.Title, r.Rating };

var q2 = from r in db.Reviews join b in db.Books on r.BookTitle equals b.Title where r.Rating >= 4 select new { r.ReviewId, b.Isbn, b.Title, r.Rating };

```js
var q2 = from r in db.Reviews
         join b in db.Books on r.BookTitle equals b.Title
         where r.Rating >= 4
         select new { r.ReviewId, b.Isbn, b.Title, r.Rating };
```

Why it’s slow

- Joining on a wide, non‑unique `nvarchar(500)` yields hash joins with big memory grants or scans.

Fix V1 (quick DB-side)

- `CREATE INDEX IX_Books_Title ON dbo.Books(Title);` — helps the probe side, but it’s a band‑aid.

Right fix (model + EF)

- Use stable keys: `BookId` or `ISBN` (already the PK). Make `Reviews` store a FK to `Books`.
- EF navigation-based join:

// After adding Review.BookIsbn FK → Book

var q2 = db.Reviews

.Where(r => r.Rating >= 4)

.Select(r => new { r.ReviewId, r.Book!.Isbn, r.Book.Title, r.Rating });

// After adding Review.BookIsbn FK → Book var q2 = db.Reviews.Where(r => r.Rating >= 4).Select(r => new { r.ReviewId, r.Book!.Isbn, r.Book.Title, r.Rating });

```js
// After adding Review.BookIsbn FK → Book
var q2 = db.Reviews
    .Where(r => r.Rating >= 4)
    .Select(r => new { r.ReviewId, r.Book!.Isbn, r.Book.Title, r.Rating });
```
- Also index common filter columns on `Reviews` (e.g., `Rating`, `CustomerEmail`) as needed.

## Query 3 — Parent ↔ Child Join Without an Index on the FK (OrderLines.OrderId)

EF LINQ shape:

var q3 = from o in db.Orders

join ol in db.OrderLines on o.OrderId equals ol.OrderId

where o.OrderStatus == "Completed"

select new { o.OrderId, ol.BookTitle, ol.Quantity, ol.UnitPrice };

var q3 = from o in db.Orders join ol in db.OrderLines on o.OrderId equals ol.OrderId where o.OrderStatus == "Completed" select new { o.OrderId, ol.BookTitle, ol.Quantity, ol.UnitPrice };

```js
var q3 = from o in db.Orders
         join ol in db.OrderLines on o.OrderId equals ol.OrderId
         where o.OrderStatus == "Completed"
         select new { o.OrderId, ol.BookTitle, ol.Quantity, ol.UnitPrice };
```

Why it’s slow

- Missing index on `OrderLines(OrderId)` means nested loops do repeated scans, or the optimizer resorts to hash joins with full scans.

Fix V1 (quick DB-side)

- `CREATE INDEX IX_OrderLines_OrderId ON dbo.OrderLines(OrderId) INCLUDE (BookTitle, Quantity, UnitPrice, Currency);`

Right fix (model + EF)

- Always index foreign keys. In migrations:

migrationBuilder.CreateIndex(

name: "IX\_OrderLines\_OrderId",

table: "OrderLines",

column: "OrderId");

migrationBuilder.CreateIndex( name: "IX\_OrderLines\_OrderId", table: "OrderLines", column: "OrderId");

```js
migrationBuilder.CreateIndex(
    name: "IX_OrderLines_OrderId",
    table: "OrderLines",
    column: "OrderId");
```
- Prefer navigations:

var q3 = db.Orders

.Where(o => o.OrderStatus == "Completed")

.SelectMany(o => o.OrderLines.Select(ol => new { o.OrderId, ol.BookTitle, ol.Quantity, ol.UnitPrice }));

var q3 = db.Orders.Where(o => o.OrderStatus == "Completed").SelectMany(o => o.OrderLines.Select(ol => new { o.OrderId, ol.BookTitle, ol.Quantity, ol.UnitPrice }));

```js
var q3 = db.Orders
    .Where(o => o.OrderStatus == "Completed")
    .SelectMany(o => o.OrderLines.Select(ol => new { o.OrderId, ol.BookTitle, ol.Quantity, ol.UnitPrice }));
```

## Query 4 — Inventory by BookISBN Under a String Composite Clustered Key

EF LINQ shape:

var q4 = db.Inventories

.Where(i => i.BookIsbn == "978-1-4028-0009-9")

.Select(i => new { i.WarehouseCode, i.BookIsbn, i.QuantityOnHand });

var q4 = db.Inventories.Where(i => i.BookIsbn == "978-1-4028-0009-9").Select(i => new { i.WarehouseCode, i.BookIsbn, i.QuantityOnHand });

```js
var q4 = db.Inventories
    .Where(i => i.BookIsbn == "978-1-4028-0009-9")
    .Select(i => new { i.WarehouseCode, i.BookIsbn, i.QuantityOnHand });
```

Why it’s slow

- Table is clustered on `(WarehouseCode, BookISBN)` — a string composite. Filtering only by the second key without a supporting nonclustered index yields clustered scans.

Fix V1 (quick DB-side)

- `CREATE INDEX IX_Inventory_BookISBN ON dbo.Inventory(BookISBN);`

Right fix (model + EF)

- Use a narrow surrogate clustered key (e.g., `InventoryId INT IDENTITY`) and keep `(WarehouseCode, BookIsbn)` with targeted nonclustered indexes that match access patterns.

## Query 5 — CategoryCsv LIKE scans (CSV Anti‑Pattern)

EF LINQ shape:

var category = "Programming";

var q5 = db.Books.Where(b =>

(b.CategoryCsv?? "") == category ||

(b.CategoryCsv?? "").StartsWith(category + ",") ||

(b.CategoryCsv?? "").EndsWith("," + category) ||

(b.CategoryCsv?? "").Contains("," + category + ","))

.Select(b => new { b.Isbn, b.Title, b.CategoryCsv });

var category = "Programming"; var q5 = db.Books.Where(b => (b.CategoryCsv?? "") == category || (b.CategoryCsv?? "").StartsWith(category + ",") || (b.CategoryCsv?? "").EndsWith("," + category) || (b.CategoryCsv?? "").Contains("," + category + ",")).Select(b => new { b.Isbn, b.Title, b.CategoryCsv });

```js
var category = "Programming";
var q5 = db.Books.Where(b =>
    (b.CategoryCsv ?? "") == category ||
    (b.CategoryCsv ?? "").StartsWith(category + ",") ||
    (b.CategoryCsv ?? "").EndsWith("," + category) ||
    (b.CategoryCsv ?? "").Contains("," + category + ","))
    .Select(b => new { b.Isbn, b.Title, b.CategoryCsv });
```

Why it’s slow

- CSV-in-a-column prevents the optimizer from using set logic. Most patterns (`%LIKE%`) devolve to scans. StartsWith can be seekable in some cases, but CSV boundaries break it.

Fix V1 (there isn’t a good one)

- Indexes can’t fix a denormalized CSV membership test. This demo intentionally shows the limits of indexing.

Right fix (model + EF)

- Normalize: Do not use Books.CategoryCsv for storing comma delimited data. Use the following: `Book` ↔ `Category` via new `BookCategory` bridge table. Then write a proper join:

var q5 = from bc in db.BookCategories

where bc.CategoryName == "Programming"

join b in db.Books on bc.Isbn equals b.Isbn

select new { b.Isbn, b.Title };

var q5 = from bc in db.BookCategories where bc.CategoryName == "Programming" join b in db.Books on bc.Isbn equals b.Isbn select new { b.Isbn, b.Title };

```js
var q5 = from bc in db.BookCategories
         where bc.CategoryName == "Programming"
         join b in db.Books on bc.Isbn equals b.Isbn
         select new { b.Isbn, b.Title };
```
- In EF Core 5+, many‑to‑many can be modeled directly; ensure indexes on bridging FK columns.

## Query 6 — Sorting ActivityLog by a Text Date Column

EF LINQ shape:

var q6 = db.ActivityLogs

.OrderByDescending(a => a.HappenedAt)

.Select(a => new { a.ActivityId, a.HappenedAt, a.Actor, a.Action });

var q6 = db.ActivityLogs.OrderByDescending(a => a.HappenedAt).Select(a => new { a.ActivityId, a.HappenedAt, a.Actor, a.Action });

```js
var q6 = db.ActivityLogs
    .OrderByDescending(a => a.HappenedAt)
    .Select(a => new { a.ActivityId, a.HappenedAt, a.Actor, a.Action });
```

Why it’s slow

- `HappenedAt` is `nvarchar(30)`. Sorting requires full sort; large result sets can spill to tempdb.

Fix V1 (quick DB-side)

- Persist a computed datetime and an index that matches the order:
- `ALTER TABLE ActivityLog ADD HappenedAt_dt AS TRY_CONVERT(datetime2(3), HappenedAt) PERSISTED;`
- `CREATE INDEX IX_ActivityLog_HappenedAt_dt_DESC ON dbo.ActivityLog (HappenedAt_dt DESC);`

Right fix (model + EF)

- Store `HappenedAt` as `datetime2`. In EF, order by the typed column; SQL Server can perform an ordered seek and avoid a sort.

## Query 7 — FLOAT Money Math (Correctness > Performance)

EF LINQ shape:

var sum = await db.OrderLines

.Where(ol => ol.OrderId == orderId)

.Select(ol => (ol.UnitPrice?? 0) \* (ol.Quantity?? 0))

.SumAsync();

var sum = await db.OrderLines.Where(ol => ol.OrderId == orderId).Select(ol => (ol.UnitPrice?? 0) \* (ol.Quantity?? 0)).SumAsync();

```js
var sum = await db.OrderLines
    .Where(ol => ol.OrderId == orderId)
    .Select(ol => (ol.UnitPrice ?? 0) * (ol.Quantity ?? 0))
    .SumAsync();
```

What goes wrong

- Monetary columns as `FLOAT` are imprecise. Binary floating‑point can’t represent many decimal fractions; totals vary and rounding errors accumulate.

Fix V1

- There is no indexing or MSSQL fixes for wrong arithmetic.

Right fix (model + EF)

- Use `DECIMAL(19,4)` (or appropriate) everywhere money appears. In EF:

modelBuilder.Entity\<OrderLine>()

.Property(p => p.UnitPrice)

.HasPrecision(19, 4);

modelBuilder.Entity\<OrderLine>().Property(p => p.UnitPrice).HasPrecision(19, 4);

```js
modelBuilder.Entity<OrderLine>()
    .Property(p => p.UnitPrice)
    .HasPrecision(19, 4);
```
- Keep math on the server with `decimal` -typed expressions; ensure clients use `decimal` too.

## Query 8 — JSON‑ish LIKE Probe in Orders.Meta

EF LINQ shape:

var q8 = db.Orders

.Where(o => (o.Meta?? "").Contains("\\"source\\":\\"mobile\\""))

.Select(o => new { o.OrderId, o.Meta });

var q8 = db.Orders.Where(o => (o.Meta?? "").Contains("\\"source\\":\\"mobile\\"")).Select(o => new { o.OrderId, o.Meta });

```js
var q8 = db.Orders
    .Where(o => (o.Meta ?? "").Contains("\"source\":\"mobile\""))
    .Select(o => new { o.OrderId, o.Meta });
```

Why it’s slow

- `nvarchar(max)` plus leading `%LIKE%` forces full scans. SQL Server has no statistics on JSON properties inside strings.

Fix V1 (quick DB-side)

- Project the attribute to a persisted column + index:
- `ALTER TABLE Orders ADD Source AS JSON_VALUE(Meta, '$.source') PERSISTED;`
- `CREATE INDEX IX_Orders_Source ON dbo.Orders(Source);`
- Then filter on `Source = 'mobile'` (seekable).

Right fix (model + EF)

- Model important attributes as real columns, or map a computed column in EF:

modelBuilder.Entity\<Order>()

.Property\<string>("Source")

.HasComputedColumnSql("JSON\_VALUE(\[Meta\], '$.source')", stored: true);

modelBuilder.Entity\<Order>().Property\<string>("Source").HasComputedColumnSql("JSON\_VALUE(\[Meta\], '$.source')", stored: true);

```js
modelBuilder.Entity<Order>()
    .Property<string>("Source")
    .HasComputedColumnSql("JSON_VALUE([Meta], '$.source')", stored: true);
```
- Query `o => EF.Property<string>(o, "Source") == "mobile"` to leverage the index.

## The “Fix V1” Pack (What the Demo Applies)

I have added the logic to the demo project to fix the 8 queries that exhibit anti-patterns. The application can apply these “Fix V1” changes to improve EF Core queries. The following are the locations where you will find the code that applies the corrections to the database.

`Data/FixScripts.cs` applies pragmatic changes without refactoring the app code:

- Computed persisted columns for string dates and JSON projections:
- `Orders.OrderDate_dt = TRY_CONVERT(datetime2(3), OrderDate)`
- `Orders.Source = JSON_VALUE(Meta, '$.source')`
- `ActivityLog.HappenedAt_dt = TRY_CONVERT(datetime2(3), HappenedAt)`
- Targeted nonclustered indexes aligned to common predicates/orderings:
- `IX_Orders_CustomerEmail_OrderDate_dt` (INCLUDE `OrderTotal, OrderStatus`)
- `IX_OrderLines_OrderId` (INCLUDE covering columns)
- `IX_Books_Title`, `IX_Inventory_BookISBN`, `IX_ActivityLog_HappenedAt_dt_DESC`, etc.

These transform scans/sorts into seeks/ordered reads, dramatically cutting I/O and memory grants without touching LINQ. They’re great for triage but shouldn’t replace proper schema design.

## Quick Checklist You Can Apply Today

- Dates/times as `datetime2`, not strings.
- Composite indexes that match your filter prefix; INCLUDE for covering.
- Index all FKs.
- Join on keys, not wide text.
- Normalize sets (no CSV in columns).
- Prefer `StartsWith` over `%LIKE%`, consider full‑text for advanced search.
- Project JSON attributes you query into computed/persisted columns and index them.
- Money = `decimal` with explicit precision.
- Narrow surrogate clustered keys; avoid `nvarchar` composites.
- Measure, compare, iterate.

## Practical EF Core Snippets You Can Adopt

- Composite index via migration:

modelBuilder.Entity\<Order>()

.HasIndex(e => new { e.CustomerEmail, e.OrderDate });

modelBuilder.Entity\<Order>().HasIndex(e => new { e.CustomerEmail, e.OrderDate });

```js
modelBuilder.Entity<Order>()
    .HasIndex(e => new { e.CustomerEmail, e.OrderDate });
```
- Computed column mapping (to match a DB persisted expression):

modelBuilder.Entity\<Order>()

.Property<DateTime?>("OrderDate\_dt")

.HasColumnType("datetime2(3)")

.HasComputedColumnSql("TRY\_CONVERT(datetime2(3), \[OrderDate\])", stored: true);

modelBuilder.Entity\<Order>().Property<DateTime?>("OrderDate\_dt").HasColumnType("datetime2(3)").HasComputedColumnSql("TRY\_CONVERT(datetime2(3), \[OrderDate\])", stored: true);

```js
modelBuilder.Entity<Order>()
    .Property<DateTime?>("OrderDate_dt")
    .HasColumnType("datetime2(3)")
    .HasComputedColumnSql("TRY_CONVERT(datetime2(3), [OrderDate])", stored: true);
```
- Query using a shadow/computed property so the index is used:

var q = db.Orders.Where(o => EF.Property<DateTime?>(o, "OrderDate\_dt") >= start

&& EF.Property<DateTime?>(o, "OrderDate\_dt") < end);

var q = db.Orders.Where(o => EF.Property<DateTime?>(o, "OrderDate\_dt") >= start && EF.Property<DateTime?>(o, "OrderDate\_dt") < end);

```js
var q = db.Orders.Where(o => EF.Property<DateTime?>(o, "OrderDate_dt") >= start
                           && EF.Property<DateTime?>(o, "OrderDate_dt") <  end);
```
- Many‑to‑many instead of CSV:

modelBuilder.Entity\<BookCategory>()

.HasIndex(bc => new { bc.Isbn, bc.CategoryName });

var booksInCategory = from bc in db.BookCategories

where bc.CategoryName == category

join b in db.Books on bc.Isbn equals b.Isbn

select b;

modelBuilder.Entity\<BookCategory>().HasIndex(bc => new { bc.Isbn, bc.CategoryName }); var booksInCategory = from bc in db.BookCategories where bc.CategoryName == category join b in db.Books on bc.Isbn equals b.Isbn select b;

```js
modelBuilder.Entity<BookCategory>()
    .HasIndex(bc => new { bc.Isbn, bc.CategoryName });

var booksInCategory = from bc in db.BookCategories
                      where bc.CategoryName == category
                      join b in db.Books on bc.Isbn equals b.Isbn
                      select b;
```

## Closing Thoughts

EF Core performance is a partnership between LINQ shape and storage design. You’ll rarely “optimize” your way out of schema problems from the query layer alone. Use the quick mitigations shown here to triage production issues, but strive to align the types, keys, and indexes with how you query your data. That’s where EF Core really shines: when the model and the database agree on the semantics and the access paths.EF Core performance is a partnership between LINQ shape and storage design. You’ll rarely “optimize” your way out of schema problems from the query layer alone. Use the quick mitigations shown here to triage production issues, but strive to align the types, keys, and indexes with how you query your data. That’s where EF Core really shines: when the model and the database agree on the semantics and the access paths.

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)
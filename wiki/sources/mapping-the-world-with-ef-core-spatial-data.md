---
address: c-312
type: source
title: "Mapping the World with EF Core: Working with Spatial Data"
source: "https://woodruff.dev/mapping-the-world-with-ef-core-working-with-spatial-data/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-09
created: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - spatial-data
  - gis
status: current
related:
  - "[[EF Core Spatial Data]]"
  - "[[Chris Woodruff]]"
---

# Mapping the World with EF Core: Working with Spatial Data

Navigation: [[index]] | [[sources/_index|Sources]]

## Summary

A practical, code-first tutorial blog post by [[Chris Woodruff]] on woodruff.dev walking through how to store, query, and manipulate geographic (spatial) data in **Entity Framework Core** using the **NetTopologySuite** library. Covers setup, entity modeling, insertion, proximity queries, and polygon-based containment queries, with SQL Server (and PostgreSQL) as the target databases.

## Key Points

1. **What spatial data is**: geographic locations/features represented as points (single locations), lines (paths/routes), and polygons (areas/boundaries), rather than raw lat/lon numeric pairs. SQL Server, PostgreSQL, and MySQL all provide native spatial support.
2. **Setup**: install `Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite` (SQL Server) or `Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite` (PostgreSQL), then enable it in `DbContext` configuration via `x => x.UseNetTopologySuite()` on the provider options builder.
3. **Entity modeling**: use `NetTopologySuite.Geometries.Point` as a property type (e.g., `Location.Coordinates`) to store latitude/longitude as a first-class spatial type instead of two decimal columns.
4. **SRID 4326**: new `Point` instances should set `SRID = 4326`, which is WGS 84, the standard coordinate reference system used by GPS. Points are constructed as `(longitude, latitude)` — longitude first.
5. **Proximity queries**: `IsWithinDistance(otherPoint, meters)` on a `Point` property, used inside a LINQ `.Where()`, translates to an efficient database-side geospatial query (e.g., "locations within 5000 meters of Times Square").
6. **Polygon / geofencing queries**: model a `Polygon` property (e.g., `CityBoundary.Area`) and use `.Contains(point)` to test whether a location falls inside a boundary — useful for city/region containment and geofencing.
7. **Use cases called out**: location-based apps (users/restaurants/stores), routing/navigation (distance calc, nearest-place, path optimization), geofencing (delivery zone enter/exit detection), real estate/mapping (city boundaries, zip codes, regions).

## Code Patterns Extracted

- DbContext configuration:
  ```csharp
  optionsBuilder.UseSqlServer("Your_Connection_String",
      x => x.UseNetTopologySuite());
  ```
- Point entity property: `public Point Coordinates { get; set; }`
- Insert: `new Point(-73.9654, 40.7829) { SRID = 4326 }`
- Nearby query: `.Where(l => l.Coordinates.IsWithinDistance(userLocation, 5000))`
- Polygon entity property: `public Polygon Area { get; set; }`
- Containment query: `.Where(l => cityBoundary.Area.Contains(l.Coordinates))`

## My Take

This is an introductory, single-technique-per-example post — it does not cover indexing spatial columns (spatial indexes), coordinate system transformations beyond stating SRID 4326, or performance considerations at scale. It's a good jumping-off point for the "how do I even start" question, not a deep reference.

## Related

- [[EF Core Spatial Data]] — concept page synthesizing the spatial-data patterns from this source
- [[Chris Woodruff]] — author entity

## Source

- [[.raw/notes/2026-07-03/Mapping the World with EF Core Working with Spatial Data - Chris Woody Woodruff.md]]
- https://woodruff.dev/mapping-the-world-with-ef-core-working-with-spatial-data/

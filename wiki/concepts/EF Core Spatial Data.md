---
type: concept
title: "EF Core Spatial Data"
tags:
  - concept
  - dotnet
  - ef-core
  - spatial-data
  - gis
status: developing
related:
  - "[[mapping-the-world-with-ef-core-spatial-data]]"
  - "[[Chris Woodruff]]"
  - "[[EF Core Keyless Entity Types]]"
---

# EF Core Spatial Data

Navigation: [[index]] | [[concepts/_index|Concepts]]

## Definition

**EF Core spatial data support** is Entity Framework Core's ability to store, query, and manipulate geographic data (points, lines, polygons) as first-class database types rather than as raw numeric latitude/longitude pairs, using the **NetTopologySuite** (NTS) library as the geometry model shared between .NET code and the database's native spatial column types.

## Core Building Blocks

- **Geometry types** (from `NetTopologySuite.Geometries`): `Point` for single locations, `LineString` for paths/routes, `Polygon` for areas/boundaries. Used directly as EF Core entity property types.
- **Provider packages**: `Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite` for SQL Server, `Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite` for PostgreSQL. Enabled via `x => x.UseNetTopologySuite()` in the provider options callback of `UseSqlServer`/`UseNpgsql`.
- **SRID (Spatial Reference Identifier)**: defines the coordinate system a geometry uses. `4326` = WGS 84, the standard GPS/lat-lon reference system, and should be set explicitly when constructing new geometry instances (`new Point(lon, lat) { SRID = 4326 }`). Note the constructor order is longitude-then-latitude, the opposite of how coordinates are usually spoken/written.
- **Proximity queries**: `Point.IsWithinDistance(otherPoint, meters)` inside a LINQ `Where()` translates to a database-native spatial distance query — e.g., finding all locations within 5km of a user.
- **Containment / geofencing queries**: `Polygon.Contains(point)` tests whether a point geometry falls inside a boundary geometry — used for city/region containment, delivery-zone geofencing, and similar "is X inside area Y" checks.

## When to Use

- Location-based apps (users, restaurants, stores, landmarks)
- Routing and navigation (distance calculation, nearest-place search, path optimization)
- Geofencing (detecting when a user enters/leaves a delivery or service zone)
- Real estate / mapping (city boundaries, zip codes, regions)

## Database Support

SQL Server, PostgreSQL, and MySQL all provide native spatial column types and geospatial query operators; EF Core surfaces them uniformly through NetTopologySuite so the same C# geometry model works (with provider-specific packages) across databases.

## Gaps / Not Covered by the Source

The source tutorial does not address spatial indexing (e.g., SQL Server spatial indexes) for query performance at scale, coordinate system transformation between different SRIDs, or more advanced geometry operations (buffering, intersection, union) beyond `IsWithinDistance` and `Contains`.

## Related

- [[Chris Woodruff]] — author of the source tutorial
- Source: [[mapping-the-world-with-ef-core-spatial-data]]

---
title: "Mapping the World with EF Core: Working with Spatial Data - Chris Woody Woodruff"
source: "https://woodruff.dev/mapping-the-world-with-ef-core-working-with-spatial-data/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-09
created: 2026-07-03
description: "Have you ever needed to store coordinates, track locations, or perform distance calculations in your database? Whether you're building a ride-sharing app, a location-based service, or an interactive map, working with spatial data is essential. Luckily, EF Core supports spatial data types, allowing you to store, query, and manipulate geographic data seamlessly. No more treating latitude and longitude as simple numbers—let’s bring real GIS (Geographic Information System) power to your EF Core apps!"
tags:
  - "clippings"
---
![Mapping the World with EF Core: Working with Spatial Data](https://woodruff.dev/wp-content/uploads/2025/02/Mapping-the-World-with-EF-Core-Working-with-Spatial-Data-150x150.webp)

Have you ever needed to store **coordinates, track locations, or perform distance calculations** in your database? Whether you’re building a **ride-sharing app, a location-based service, or an interactive map**, working with **spatial data** is essential.

Luckily, **EF Core supports spatial data types**, allowing you to **store, query, and manipulate geographic data seamlessly**. No more treating latitude and longitude as simple numbers—let’s bring real GIS (Geographic Information System) power to your EF Core apps!

---

## What is Spatial Data?

Spatial data represents **geographic locations** and features on the Earth’s surface. Instead of dealing with raw latitude/longitude values, spatial data provides **rich functionality** for working with **points, lines, polygons, and even complex geometries**.

Think of it like this:  
**Points** – Represent single locations (e.g., a store location).  
**Lines** – Define paths or routes (e.g., roads, trails).  
**Polygons** – Represent areas (e.g., city boundaries, country borders).

Most modern databases, like **SQL Server, PostgreSQL, and MySQL**, provide **native spatial data support**, allowing you to run **geospatial queries** efficiently.

---

## Setting Up Spatial Data in EF Core

Before we start playing with coordinates, we need to **set up EF Core to support spatial data**.

### 1\. Install the Required Packages

If you’re using **SQL Server**, you need the **NetTopologySuite** package, which enables spatial data support.

dotnet add package Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite

dotnet add package Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite

```js
dotnet add package Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite
```

For **PostgreSQL**, install:

dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite

dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite

```js
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL.NetTopologySuite
```

### 2\. Configure DbContext to Use Spatial Support

Modify your `DbContext` configuration to enable **NetTopologySuite**:

public class AppDbContext: DbContext

{

public DbSet\<Location> Locations { get; set; }

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

{

optionsBuilder.UseSqlServer("Your\_Connection\_String",

x => x.UseNetTopologySuite()); // Enable spatial support

}

}

public class AppDbContext: DbContext { public DbSet\<Location> Locations { get; set; } protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { optionsBuilder.UseSqlServer("Your\_Connection\_String", x => x.UseNetTopologySuite()); // Enable spatial support } }

```js
public class AppDbContext : DbContext
{
    public DbSet<Location> Locations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Your_Connection_String", 
            x => x.UseNetTopologySuite()); // Enable spatial support
    }
}
```

This tells EF Core to **use spatial capabilities** when working with SQL Server (or PostgreSQL).

---

## Defining Spatial Data in EF Core

Now that **EF Core is ready**, let’s create an entity with a **geographic location**.

### 3\. Create an Entity with Spatial Data

using NetTopologySuite.Geometries;

public class Location

{

public int Id { get; set; }

public string Name { get; set; }

public Point Coordinates { get; set; } // Stores latitude/longitude

}

using NetTopologySuite.Geometries; public class Location { public int Id { get; set; } public string Name { get; set; } public Point Coordinates { get; set; } // Stores latitude/longitude }

```js
using NetTopologySuite.Geometries;

public class Location
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Point Coordinates { get; set; } // Stores latitude/longitude
}
```

**What’s happening here?**

- We **import `NetTopologySuite.Geometries`** to use spatial types.
- The **`Point` type** is used to store a **geographic location** (latitude & longitude).

---

## Storing and Querying Spatial Data

Now that we’ve defined our `Location` entity, let’s **add some data**!

### 4\. Inserting Spatial Data

using NetTopologySuite.Geometries;

var location = new Location

{

Name = "Central Park",

Coordinates = new Point(-73.9654, 40.7829) { SRID = 4326 } // Longitude, Latitude

};

context.Locations.Add(location);

await context.SaveChangesAsync();

using NetTopologySuite.Geometries; var location = new Location { Name = "Central Park", Coordinates = new Point(-73.9654, 40.7829) { SRID = 4326 } // Longitude, Latitude }; context.Locations.Add(location); await context.SaveChangesAsync();

```js
using NetTopologySuite.Geometries;

var location = new Location
{
    Name = "Central Park",
    Coordinates = new Point(-73.9654, 40.7829) { SRID = 4326 } // Longitude, Latitude
};

context.Locations.Add(location);
await context.SaveChangesAsync();
```

**What is `SRID = 4326`?**

- [`SRID` (Spatial Reference Identifier)](https://spatialreference.org/) **defines the coordinate system**.
- `4326` is **[WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System)**, the standard for latitude/longitude (used by GPS).

---

### 5\. Querying Nearby Locations

Let’s say you want to **find locations within 5 kilometers of a user**:

using NetTopologySuite.Geometries;

using NetTopologySuite.Geometries.Prepared;

var userLocation = new Point(-73.9851, 40.7580) { SRID = 4326 }; // Times Square

var nearbyLocations = await context.Locations

.Where(l => l.Coordinates.IsWithinDistance(userLocation, 5000)) // 5km radius

.ToListAsync();

foreach (var location in nearbyLocations)

{

Console.WriteLine($"Nearby: {location.Name}");

}

using NetTopologySuite.Geometries; using NetTopologySuite.Geometries.Prepared; var userLocation = new Point(-73.9851, 40.7580) { SRID = 4326 }; // Times Square var nearbyLocations = await context.Locations.Where(l => l.Coordinates.IsWithinDistance(userLocation, 5000)) // 5km radius.ToListAsync(); foreach (var location in nearbyLocations) { Console.WriteLine($"Nearby: {location.Name}"); }

```js
using NetTopologySuite.Geometries;
using NetTopologySuite.Geometries.Prepared;

var userLocation = new Point(-73.9851, 40.7580) { SRID = 4326 }; // Times Square

var nearbyLocations = await context.Locations
    .Where(l => l.Coordinates.IsWithinDistance(userLocation, 5000)) // 5km radius
    .ToListAsync();

foreach (var location in nearbyLocations)
{
    Console.WriteLine($"Nearby: {location.Name}");
}
```

**How does this work?**

- **`IsWithinDistance()`** checks if a location is **within 5000 meters (5km)** of the user.
- This is **way more efficient** than manually filtering lat/lon values!

---

## Working with Polygons: Defining Regions

Let’s say you need to **store city boundaries** and check whether a location is inside a region.

### 6\. Create a Polygon Entity

public class CityBoundary

{

public int Id { get; set; }

public string CityName { get; set; }

public Polygon Area { get; set; } // Stores city boundary

}

public class CityBoundary { public int Id { get; set; } public string CityName { get; set; } public Polygon Area { get; set; } // Stores city boundary }

```js
public class CityBoundary
{
    public int Id { get; set; }
    public string CityName { get; set; }
    public Polygon Area { get; set; } // Stores city boundary
}
```

### 7\. Query Locations Inside a City

var newYorkBoundary = context.CityBoundaries

.FirstOrDefault(c => c.CityName == "New York");

var locationsInNYC = await context.Locations

.Where(l => newYorkBoundary.Area.Contains(l.Coordinates))

.ToListAsync();

foreach (var location in locationsInNYC)

{

Console.WriteLine($"{location.Name} is inside New York!");

}

var newYorkBoundary = context.CityBoundaries.FirstOrDefault(c => c.CityName == "New York"); var locationsInNYC = await context.Locations.Where(l => newYorkBoundary.Area.Contains(l.Coordinates)).ToListAsync(); foreach (var location in locationsInNYC) { Console.WriteLine($"{location.Name} is inside New York!"); }

```js
var newYorkBoundary = context.CityBoundaries
    .FirstOrDefault(c => c.CityName == "New York");

var locationsInNYC = await context.Locations
    .Where(l => newYorkBoundary.Area.Contains(l.Coordinates))
    .ToListAsync();

foreach (var location in locationsInNYC)
{
    Console.WriteLine($"{location.Name} is inside New York!");
}
```

**Why is this cool?**

- **`Contains()`** lets you check if a location is inside a polygon (city, park, etc.).
- This is **super useful for geofencing, city-based filtering, and spatial searches**.

---

## When Should You Use Spatial Data in EF Core?

**Location-Based Apps** – Track users, restaurants, stores, and landmarks.  
**Routing & Navigation** – Calculate distances, find nearby places, optimize paths.  
**Geofencing** – Detect when users enter or leave an area (e.g., delivery zones).  
**Real Estate & Mapping** – Store city boundaries, zip codes, and regions.

---

## Wrap-Up: Bringing GIS Power to EF Core

Spatial data in EF Core **isn’t just for maps—it’s for anything that involves locations, distances, and geographic relationships**. By using **NetTopologySuite** and EF Core’s spatial capabilities, you can:

**Store real-world locations with proper geospatial types**  
**Run optimized queries for nearby locations and distances**  
**Use polygons for geofencing, city boundaries, and more**

If you’re building anything with **location tracking, maps, or spatial analytics**, EF Core has the **built-in tools** to make it easy!

**Are you using spatial data in your projects? Let’s talk in the comments**!

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)
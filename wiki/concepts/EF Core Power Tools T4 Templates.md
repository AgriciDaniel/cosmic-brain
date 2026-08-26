---
type: concept
title: "EF Core Power Tools T4 Templates"
domain: dotnet
created: 2026-07-03
updated: 2026-07-03
address: c-000333
tags:
  - concept
  - ef-core
  - t4
  - code-generation
  - customization
status: developing
related:
  - "[[EFCorePowerTools]]"
  - "[[EF Core Power Tools Configuration]]"
  - "[[EF Core Reverse Engineering]]"
  - "[[Entity Framework Core]]"
---

# EF Core Power Tools T4 Templates

Full code-generation customization via T4 (Text Template Transformation Toolkit) templates. Available for **EF Core 8+ only**. Templates execute every time reverse engineering runs — edits take effect immediately on next scaffold.

## Enabling T4 Templates

In `efcpt-config.json`:
```json
"code-generation": {
    "use-t4": true,
    "t4-template-path": null
}
```

`t4-template-path`: custom path to the **parent folder containing** `CodeTemplates/`. Default `null` means `{ProjectRoot}/CodeTemplates/EFCore/`. Backslashes must be escaped: `"Application\\EntityCore"`.

## Three Template Variants

| Variant | Files | Use Case |
|---------|-------|----------|
| **C# - T4** | `EntityType.t4` + `DbContext.t4` | Full EF Core entity + context generation |
| **C# - T4 (DbContext split)** | Above + `EntityTypeConfiguration.t4` | Separate config class per entity in `Configurations/` folder |
| **C# - T4 (POCO)** | `EntityType.t4` (lightweight) | Plain classes for micro-ORMs, no EF annotations |

## Template Versioning

Each template MUST contain a version comment:
```csharp
// Template version: 800   // .NET 8
// Template version: 900   // .NET 9
// Template version: 1000  // .NET 10
```

Missing or outdated version → warning on scaffold. The version number is the .NET major version × 100.

## Multiple Template Folders

All folders matching the pattern are processed. You can have:
```
CodeTemplates/EFCore/           ← default entity templates
Views/CodeTemplates/EFCore/      ← view-specific entity templates
```

Each folder can have different template contents; all matching folders are discovered and used.

---

## EntityType.t4 Customizations

### 1. Enum Generation
Map database columns to C# enums instead of primitive types:
```csharp
// In EntityType.t4: detect column pattern, emit enum
if (property.Name.EndsWith("Status") || property.Name.EndsWith("Type"))
{
    WriteLine($"    public {property.Name}Enum {property.Name} {{ get; set; }}");
}
```
Caveat: may not work correctly with foreign key columns (issue #1472).

### 2. Property Renaming
Transform database names to C# conventions:
```csharp
// Strip Hungarian prefix, apply PascalCase
var cleanName = property.Name
    .Replace("usr_", "")
    .Replace("col_", "");
```

### 3. Navigation Property Renaming
Customize generated navigation names (useful when auto-naming is ambiguous).

### 4. `[Obsolete]` Attribute Injection
Mark deprecated columns (issue #1750):
```csharp
if (property.Name.Contains("Legacy") || property.Name.Contains("Deprecated"))
{
    WriteLine("    [Obsolete(\"Use new column instead\")]");
}
```

### 5. `INotifyPropertyChanged` Support
Generate observable entities for WPF/Blazor binding:
```csharp
public partial class Customer : INotifyPropertyChanged
{
    private string _name;
    public string Name
    {
        get => _name;
        set { _name = value; OnPropertyChanged(); }
    }
}
```

### 6. Collection Type Control
Replace default `ICollection<T>` / `HashSet<T>`:
```csharp
// Use List<T> instead of HashSet<T> for smaller memory footprint
public virtual List<Order> Orders { get; set; } = new List<Order>();
```

### 7. Default Value Initialization
Add constructor defaults for specific fields:
```csharp
public Customer()
{
    CreatedAt = DateTime.UtcNow;
    IsActive = true;
    Orders = new List<Order>();
}
```

### 8. XML Doc Comments on Navigation Properties
Add documentation to navigation properties (issue #2367):
```csharp
/// <summary>
/// Orders placed by this customer.
/// </summary>
public virtual ICollection<Order> Orders { get; set; }
```

### 9. `long`/`ulong` for RowVersion
Replace `byte[]` rowversion/timestamp with numeric types (issue #2485).

### 10. Namespace Control
Override entity namespace directly in T4 instead of config:
```csharp
namespace MyProject.Domain.Entities;
```

---

## DbContext.t4 Customizations

### 1. Constructor Customization
Add constructor overloads, inject services:
```csharp
public NorthwindContext(DbContextOptions<NorthwindContext> options, ILogger<NorthwindContext> logger)
    : base(options)
{
    _logger = logger;
}
```

### 2. OnConfiguring Override
Add logging, interceptors, command timeout:
```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
    optionsBuilder.CommandTimeout(30);
}
```

### 3. OnModelCreating Additions
The `OnModelCreatingPartial` partial method is auto-generated; implement in a separate partial file.

---

## EntityTypeConfiguration.t4 (DbContext Split)

Separates entity configuration into individual `IEntityTypeConfiguration<T>` classes:
```
Configurations/
├── CustomerConfiguration.cs
├── OrderConfiguration.cs
└── ProductConfiguration.cs
```

Each class contains the fluent API configuration for one entity:
```csharp
public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).HasMaxLength(100).IsRequired();
        builder.HasIndex(e => e.Email).IsUnique();
    }
}
```

DbContext registers them:
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
}
```

---

## Handlebars Templates (Alternative to T4)

Select "Handlebars" instead of T4 in the customization dropdown. Based on the `EntityFrameworkCore.Scaffolding.Handlebars` project.

### Template Structure

```
CodeTemplates/
├── CSharpDbContext/
│   └── DbContext.hbs
├── CSharpEntityType/
│   ├── EntityType.hbs
│   └── Partials/
│       └── Properties.hbs
```

### Key Customizations

**Use `List<T>` instead of `ICollection<T>`:** Edit `Partials/Properties.hbs`:
```handlebars
{{#each nav-properties}}
public virtual List<{{nav-property-type}}> {{nav-property-name}} { get; set; } = new List<{{nav-property-type}}>();
{{/each}}
```

**Add `virtual` for lazy loading proxies:** Same file, add `virtual` keyword to navigation properties.

**Custom imports:** Edit `DbContext.hbs` to add using statements:
```handlebars
using Microsoft.Extensions.Logging;
using MyProject.Extensions;
```

**Custom constructor logic:** Add dependency injection, logging setup in `DbContext.hbs`.

**Custom base class:** Change inheritance from `DbContext` to a custom base class.

### Supplying Custom Templates

Place `CodeTemplates.zip` at the project root. The tool extracts and uses these templates instead of defaults. Useful for:
- Sharing templates across team (commit `.zip` to source control)
- Switching between template sets for different projects
- Distributing opinionated template packs

### Handlebars vs. T4 — When to Use Which

| Criterion | T4 | Handlebars |
|-----------|-----|------------|
| Syntax | C# + T4 directives | Handlebars (`{{}}`) |
| Complexity | High (full .NET power) | Medium (logic-less templates) |
| Learning curve | Steep | Gentle |
| Use case | Complex generation logic, conditions, type inspection | Simple formatting, naming conventions |
| EF Core version | 8+ only | 8+ only |
| Template sharing | `CodeTemplates/` folder | `CodeTemplates.zip` or folder |

---

## Best Practices

| Practice | Detail |
|----------|--------|
| Version control templates | Commit `CodeTemplates/` to Git — whole team gets consistent code generation |
| Test on small project first | Validate complex T4 changes on a test project before main codebase |
| Keep tools updated | New EFCorePowerTools versions may add template features/fixes |
| Use partial classes for non-generated code | Never hand-edit generated files — put custom logic in partials |
| Preserve auto-generated marker | Files with `// <auto-generated> ...` comment on line 1 are cleaned up by `soft-delete-obsolete-files` |

## Source

Ingested via [[EFCorePowerTools]] on 2026-07-03. Sources: GitHub wiki, issue #1499 (T4 tips), dotnetConf presentation "T4 goodness with EF Core 7".

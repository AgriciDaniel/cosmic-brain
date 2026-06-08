---
type: concept
title: "Elsa Studio Guide"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - studio
  - visual-designer
  - ui
status: developing
address: c-000089
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Running Workflows]]"
  - "[[Elsa Architecture]]"
---

# Elsa Studio Guide

**Elsa Studio** is the Blazor-based visual designer and administrative interface for [[entities/Elsa Workflows]] v3. It provides a web-based environment to create, edit, and manage workflows visually.

---

## Studio Interface

### Sidebar Navigation
- **Workflows** — view and manage all workflow definitions
- **Workflow Instances** — monitor running and completed executions
- **Settings** — configure Studio preferences

### Designer Canvas
- **Activity Toolbox** — browse and search available activities
- **Canvas** — drag-and-drop area for building workflows
- **Connections** — visual lines showing flow between activities
- **Zoom Controls** — zoom in/out and fit to screen

### Activity Inspector / Property Panel
When an activity is selected, the right panel shows:
- **Activity Name** — descriptive label
- **Properties** — activity input configuration
- **Expression Type Selector** — choose Literal, JavaScript, C#, JSON, Liquid
- **Output Settings** — capture outputs as variables

---

## Expressions in Studio

Expressions allow dynamic values for activity properties. The expression type selector is a dropdown next to each property field.

### Expression Types

| Type | Use Case | Example |
|------|----------|---------|
| **Literal** | Static values | `"Hello, World!"` |
| **JavaScript** | Simple variable access, calculations | `variables.OrderId` |
| **C#** | Complex logic, strong typing, .NET access | `Variable.Get<Guid>("OrderId")` |
| **JSON** | Structured data | `{"key": "value"}` |
| **Liquid** | Text templates with variables | `Hello, {{ Variables.Name }}!` |

### Referencing Variables

Variables are accessed through a `variables` object in JavaScript or a `Variable` object in C#:

**JavaScript:**
```javascript
variables.OrderId
variables.Customer.Address.City
variables.Quantity * variables.UnitPrice
```

**C#:**
```csharp
Variable.OrderId
Variable.Get<Guid>("OrderId")
Variable.Get<dynamic>("variable1").data.id
```

### Setting Variables

Use `SetVariable` activity or the expression function:

**JavaScript:**
```javascript
setVariable("OrderId", newGuid())
```

**C#:**
```csharp
Variable.Set("OrderId", Guid.NewGuid());
```

### Accessing Activity Outputs

**JavaScript:**
```javascript
getOutputFrom("MyHttpRequest", "Body")
getLastResult()
```

**C#:**
```csharp
Output.From<string>("MyHttpRequest", "Body")
Output.LastResult
```

### Common Pitfalls

- **Misspelled variable names** — names are case-sensitive
- **Wrong expression type** — verify the dropdown; code text in "Literal" mode won't evaluate
- **Null references** — use optional chaining: `variables.Customer?.Name`
- **Accessing before creation** — variables are only available after they are defined or set

---

## Custom UI Components

Studio renders activity properties using **property editors**. Each property gets an editor based on its data type and `UIHint` attribute.

### Default Editors

| Data Type | Editor |
|-----------|--------|
| `string` | Single-line text |
| `string` (multi-line) | Textarea |
| `number` | Numeric input |
| `boolean` | Checkbox/Toggle |
| `object` | JSON editor (Monaco) |
| `array` | List editor |

### Creating Custom Property Editors

**1. Backend: Activity with UIHint**
```csharp
[Input(
    Description = "Customer email address",
    UIHint = "custom-email-input")]
public Input<string> Email { get; set; } = default!;
```

**2. Frontend: Web Component (LitElement)**
Custom editors are web components that conform to Studio's interface. They must handle:
- `value` property — current value
- `isExpression` flag — disable UI in expression mode
- `valueChanged` event — notify Studio of changes

**3. Registration**
```typescript
const registry = (window as any).elsa?.propertyEditors;
registry.register('custom-email-input', 'custom-email-input');
```

### Integrating React/Angular Components

Wrap framework components as **web components** using `customElements.define()`, then register them with Studio's property editor registry.

> [!tip] Best Practices
> - Handle `isExpression` mode: hide custom UI when the property holds an expression
> - Always dispatch `valueChanged` with `{ detail: { value } }`
> - Provide inline validation feedback
> - Design for the property panel width (~300-400px)

---

## Studio Integration by Host Framework

Elsa Studio can be integrated into existing applications via several patterns.

### Separate App with Reverse Proxy
Recommended for most scenarios. Studio runs independently; a reverse proxy routes requests:
```
/studio/*  → Elsa Studio (Port 5001)
/api/*     → Elsa Server (Port 5000)
/*         → Your App (Port 3000)
```

### Iframe Embedding
Simple integration for React/Angular apps:
```tsx
<iframe src="https://studio.example.com" style={{ width: '100%', height: '100%', border: 'none' }} />
```

### Same-Process Blazor Integration
Tightest integration — Studio runs within the ASP.NET Core app:
```csharp
builder.Services.AddElsaStudio(studio => studio
    .UseBackendUrl(builder.Configuration["Elsa:Server:BaseUrl"] ?? "/api"));
// ...
app.MapElsaStudio("/workflows");
```

### Configuration Common to All Patterns

**Base API URL:**
```json
{ "Elsa": { "Server": { "BaseUrl": "https://your-api.example.com" } } }
```

**Authentication config:**
```json
{ "Elsa": { "Server": { "BaseUrl": "https://...", "ApiKey": "your-key" } } }
```

**CORS (when Studio and Server are on different origins):**
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowStudio", policy =>
    {
        policy.WithOrigins("https://studio.example.com")
              .AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });
});
```

> [!warning] Token Security
> Do not store authentication tokens in `localStorage` or `sessionStorage`. Use HttpOnly cookies or OAuth2 Authorization Code flow with PKCE.

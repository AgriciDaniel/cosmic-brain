---
type: concept
title: "Elsa V2 to V3 Migration"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - migration
  - breaking-changes
  - dotnet
status: developing
address: c-000092
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Onboarding]]"
  - "[[Elsa Security]]"
---

# Elsa V2 to V3 Migration

[[entities/Elsa Workflows]] v3 is a **complete rewrite** of the v2 codebase. There is no automated migration path. Migration requires manual rewriting of custom activities, workflow definitions, and application integration code. This guide documents the key changes and patterns for a successful migration.

> [!danger] No Automated Migration
> Elsa v3 is not a drop-in replacement for v2. The entire engine was redesigned, and the JSON workflow schema, activity model, persistence layer, and API surface are fundamentally different. Plan for a full rewrite, not a migration.

---

## NuGet Package Changes

| v2 Package | v3 Replacement | Notes |
|------------|----------------|-------|
| `Elsa.Server.Api` | `Elsa.Workflows.Api` | REST API endpoints |
| `Elsa` | `Elsa.Workflows.Core` | Core engine only |
| `Elsa.Designer.Components` | `Elsa.Studio` | Studio moved to separate app |
| `Elsa.Persistence.EntityFramework.*` | `Elsa.Persistence.EntityFramework.*` | Similar name, different schema |
| `Elsa.Activities.*` | Removed | Activities are now type-specific NuGet packages |

---

## Namespace Changes

The entire namespace structure was reorganized:

| v2 | v3 |
|----|----|
| `Elsa.Activities.Http` | `Elsa.Http` |
| `Elsa.Activities.Email` | `Elsa.Email` |
| `Elsa.Persistence` | `Elsa.Workflows.Management` |
| `Elsa.Services` | `Elsa.Workflows.Runtime` |
| `Elsa.Models.WorkflowDefinition` | `WorkflowDefinition` (simplified) |

---

## Custom Activity Rewrite

This is the most impactful change. v3 introduces a completely new activity model.

### v2 Activity Pattern (Old)

```csharp
public class MyActivity : Activity
{
    public string MyProperty { get; set; }

    protected override void OnExecute(ActivityExecutionContext context)
    {
        context.Output = MyProperty;
        context.LogOutput("result", MyProperty);
        Done(context);
    }
}
```

### v3 Activity Pattern (New)

```csharp
public class MyActivity : CodeActivity<string>  // or Activity base class
{
    public Input<string> MyProperty { get; set; } = new(string.Empty);

    protected override void Execute(ActivityExecutionContext context)
    {
        var value = context.Get(MyProperty);
        
        // Set output
        context.SetResult(value);
        
        // Logging
        context.Log($"Executed with value: {value}");
    }
}
```

### Key v3 Changes for Activities

| v2 Concept | v3 Equivalent | Notes |
|------------|---------------|-------|
| `Activity` base class | `CodeActivity<T>` or `Activity` | Generic version for typed output |
| `context.Output` | `context.SetResult()` | Strongly typed via generic base |
| `context.LogOutput()` | `context.Log()` | Simplified logging |
| `Done(context)` | Implicit on `Execute` completion | No need to call Done |
| `context.GetInput<T>()` | `context.Get(Input<T> property)` | Type-safe input binding |
| `IActivity` interface | New `IActivity` in `Elsa.Workflows.Core` | Different contract |
| Bookmark with `context.CreateBookmark()` | Same method, different signature | Use `CreateBookmarkArgs` |

### Blocking Activity (v3)

```csharp
public class ApprovalActivity : CodeActivity
{
    public Input<string> ApprovalId { get; set; } = new(string.Empty);

    protected override void Execute(ActivityExecutionContext context)
    {
        var approvalId = context.Get(ApprovalId);
        
        context.CreateBookmark(new CreateBookmarkArgs
        {
            Name = "Approval",
            Payload = new { ApprovalId = approvalId },
            AutoBurn = true,
            Callback = async ctx =>
            {
                // Handle resume
                ctx.SetResult("approved");
            }
        });
    }
}
```

---

## Programmatic Workflow Changes

### v2 Style

```csharp
var workflow = new Workflow
{
    Activities = { /* ... */ },
    Connections = { /* ... */ }
};
```

### v3 Style (Fluent Builder)

```csharp
var workflow = new Workflow
{
    Root = new Sequence
    {
        Activities =
        {
            new WriteLine("Hello"),
            new WriteLine("World")
        }
    }
};
```

v3 workflows use a tree structure with `Root` as the entry point, rather than a flat list of activities with explicit connections. Control flow activities (Sequence, Flowchart, If, Switch) compose activities implicitly.

---

## Database Schema

The persistence layer is completely different:

- **v2**: Single `WorkflowExecutionLog` table, separate `WorkflowInstance` with JSON columns
- **v3**: Multiple normalized tables (`WorkflowDefinitions`, `WorkflowInstances`, `Bookmarks`, `ActivityExecutionRecords`)
- **No in-place upgrade**: Export v2 data and import into v3 format if historical data is needed
- **MongoDB support**: v3 added first-class MongoDB persistence alongside EF Core

---

## Testing Strategy

Test each migrated activity in isolation:

```csharp
[Fact]
public async Task MyActivity_ShouldProcessInput()
{
    var runner = sp.GetRequiredService<IWorkflowRunner>();
    
    var workflow = new Workflow
    {
        Root = new Sequence
        {
            Activities =
            {
                new MyActivity { MyProperty = new Input<string>("test") }
            }
        }
    };
    
    var result = await runner.RunAsync(workflow);
    Assert.Equal(WorkflowStatus.Finished, result.WorkflowState.Status);
}
```

---

## Migration Steps Summary

1. **Audit** existing v2 custom activities and document their behavior
2. **Rewrite** each activity using v3 base classes (`CodeActivity`, `Activity`, `CodeActivity<T>`)
3. **Update** NuGet package references to v3 equivalents
4. **Rewrite** workflow definitions in v3 fluent syntax
5. **Set up** new v3 database (do not attempt to reuse v2 schema)
6. **Migrate** application integration code (Program.cs, middleware)
7. **Test** each workflow in isolation, then end-to-end
8. **Deploy** as a new application alongside v2, then cut over

---

## Related

- [[Elsa Workflow Concepts]] -- v3 core concepts and activity model
- [[Elsa Onboarding]] -- Setting up v3 in an existing application
- [[Elsa Security]] -- Auth changes in v3
- [[entities/Elsa Workflows]] -- Platform overview

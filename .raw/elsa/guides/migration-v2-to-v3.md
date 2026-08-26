---
description: Complete migration guide from Elsa Workflows V2 to V3, covering breaking changes, custom activities, workflows, and concepts.
---

# V2 to V3 Migration Guide

## Overview

Elsa Workflows 3 is a complete rewrite of the library with significant architectural improvements for scalability, performance, and extensibility. This guide helps you migrate from Elsa V2 to V3.

{% hint style="warning" %}
**Important:** There is no automated migration path from V2 to V3. The internal representation of workflow definitions, activities, and properties has changed substantially. Manual recreation of workflows in V3 is required.
{% endhint %}

### What's Changed

- Complete rewrite with new execution model
- New workflow JSON schema and structure
- Updated custom activity implementation
- Different NuGet package structure
- New database schema
- Improved background activity scheduler
- Enhanced blocking activities and triggers

### Migration Strategy

Given the scope of changes, consider these approaches:

1. **Parallel Operation**: Run V2 and V3 systems side-by-side, allowing V2 workflows to complete while starting new workflows in V3
2. **Incremental Migration**: Migrate workflows in phases, starting with simpler workflows
3. **Fresh Start**: For smaller implementations, recreate workflows from scratch in V3

## Migration Checklist

Use this checklist to track your migration progress:

### Preparation
- [ ] Review all existing V2 workflows and document their purposes
- [ ] Inventory custom activities and extensions
- [ ] Document integration points and external dependencies
- [ ] Set up a V3 development environment
- [ ] Review V3 documentation and new features

### Package Migration
- [ ] Update NuGet package references
- [ ] Update using statements and namespaces
- [ ] Configure NuGet feeds for preview packages (if needed)
- [ ] Resolve dependency conflicts

### Custom Activities
- [ ] Identify all custom activities in V2
- [ ] Rewrite custom activities using V3 API
- [ ] Update activity registration code
- [ ] Test custom activities in isolation
- [ ] Update metadata attributes

### Workflow Definitions
- [ ] Export V2 workflows as JSON
- [ ] Convert JSON to V3 schema format
- [ ] Update activity type names to fully qualified names
- [ ] Restructure to use root activity container
- [ ] Update expressions and property definitions
- [ ] Test each workflow individually

### Configuration
- [ ] Update startup configuration
- [ ] Migrate database connection strings
- [ ] Configure new persistence providers
- [ ] Update authentication/authorization setup
- [ ] Configure background scheduler settings

### Testing
- [ ] Create test plans for each workflow
- [ ] Validate workflow execution
- [ ] Test blocking activities and resumption
- [ ] Verify integrations with external systems
- [ ] Performance testing

### Deployment
- [ ] Plan deployment strategy (parallel vs cutover)
- [ ] Migrate or recreate database schema
- [ ] Deploy V3 application
- [ ] Monitor for issues
- [ ] Document any remaining V2 dependencies

## Breaking Changes

### NuGet Packages

#### V2 Package Structure
```xml
<PackageReference Include="Elsa.Core" Version="2.x.x" />
<PackageReference Include="Elsa.Server.Api" Version="2.x.x" />
<PackageReference Include="Elsa.Designer.Components.Web" Version="2.x.x" />
<PackageReference Include="Elsa.Persistence.EntityFramework.SqlServer" Version="2.x.x" />
```

#### V3 Package Structure
```xml
<!-- Main package includes core components -->
<PackageReference Include="Elsa" Version="3.x.x" />

<!-- Or use individual packages -->
<PackageReference Include="Elsa.Workflows.Core" Version="3.x.x" />
<PackageReference Include="Elsa.Workflows.Management" Version="3.x.x" />
<PackageReference Include="Elsa.Workflows.Runtime" Version="3.x.x" />
<PackageReference Include="Elsa.Persistence.EFCore.SqlServer" Version="3.x.x" />
```

**Key Changes:**
- Consolidated packages: The `Elsa` meta-package includes `Elsa.Api.Common`, `Elsa.Mediator`, `Elsa.Workflows.Core`, `Elsa.Workflows.Management`, and `Elsa.Workflows.Runtime`
- Persistence packages renamed: `Elsa.Persistence.EntityFramework.*` → `Elsa.Persistence.EFCore.*`
- .NET 8+ required (no longer supports .NET Standard 2.0)

### Namespace Changes

#### Common Namespace Mappings

| V2 Namespace | V3 Namespace |
|-------------|-------------|
| `Elsa.Activities` | `Elsa.Workflows.Activities` |
| `Elsa.Services` | `Elsa.Workflows.Core` / `Elsa.Workflows.Runtime` |
| `Elsa.Models` | `Elsa.Workflows.Models` |
| `Elsa.Attributes` | `Elsa.Workflows.Attributes` |

#### Example Migration

**V2:**
```csharp
using Elsa;
using Elsa.Activities;
using Elsa.Services;
using Elsa.Attributes;
```

**V3:**
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Attributes;
using Elsa.Extensions;
```

### Startup Configuration

#### V2 Configuration
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services
        .AddElsa(elsa => elsa
            .UseEntityFrameworkPersistence(ef => ef.UseSqlServer(connectionString))
            .AddConsoleActivities()
            .AddHttpActivities()
            .AddQuartzTemporalActivities()
            .AddActivity<MyCustomActivity>()
        );
}

public void Configure(IApplicationBuilder app)
{
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

#### V3 Configuration
```csharp
var builder = WebApplication.CreateBuilder(args);

// Add Elsa services
builder.Services.AddElsa(elsa => 
{
    elsa
        .UseWorkflowManagement(management => 
        {
            management.UseEntityFrameworkCore(ef => 
                ef.UseSqlServer(connectionString));
        })
        .UseWorkflowRuntime(runtime =>
        {
            runtime.UseEntityFrameworkCore(ef => 
                ef.UseSqlServer(connectionString));
        })
        .UseIdentity(identity =>
        {
            identity.UseEntityFrameworkCore(ef => 
                ef.UseSqlServer(connectionString));
        })
        .UseDefaultAuthentication()
        .UseHttp()
        .AddActivitiesFrom<Program>();
});

var app = builder.Build();

// Use Elsa middleware
app.UseWorkflowsApi();
app.UseWorkflows();

app.Run();
```

**Key Changes:**
- Separate management and runtime configuration
- Explicit middleware registration
- More granular control over features

## Custom Activities Migration

### Activity Implementation Changes

#### V2 Custom Activity
```csharp
using Elsa;
using Elsa.ActivityResults;
using Elsa.Attributes;
using Elsa.Services;
using Elsa.Services.Models;

[Activity(
    Category = "MyCategory",
    Description = "Prints a message to the console",
    Outcomes = new[] { OutcomeNames.Done }
)]
public class PrintMessage : Activity
{
    [ActivityInput(
        Label = "Message",
        Hint = "The message to print",
        SupportedSyntaxes = new[] { SyntaxNames.JavaScript, SyntaxNames.Liquid }
    )]
    public string Message { get; set; } = default!;

    protected override IActivityExecutionResult OnExecute(ActivityExecutionContext context)
    {
        Console.WriteLine(Message);
        return Done();
    }
}
```

#### V3 Custom Activity
```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

[Activity("MyCompany", "MyCategory", "Prints a message to the console")]
public class PrintMessage : CodeActivity
{
    [Input(Description = "The message to print.")]
    public Input<string> Message { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var message = Message.Get(context);
        Console.WriteLine(message);
    }
}
```

**Key Differences:**

1. **Base Class**: 
   - V2: `Activity` base class
   - V3: `Activity` or `CodeActivity` (CodeActivity auto-completes)

2. **Execute Method**:
   - V2: `OnExecute` or `OnExecuteAsync` returning `IActivityExecutionResult`
   - V3: `ExecuteAsync` or `Execute` (for CodeActivity)

3. **Completion**:
   - V2: Return `Done()`, `Outcome()`, etc.
   - V3: Call `await context.CompleteActivityAsync()` (or automatic with CodeActivity)

4. **Attributes**:
   - V2: `[Activity]` with separate Category parameter
   - V3: `[Activity]` with namespace, category, and description

5. **Input Properties**:
   - V2: Simple types with `[ActivityInput]`
   - V3: Wrapped in `Input<T>` with `[Input]`

6. **Getting Input Values**:
   - V2: Direct property access
   - V3: `Message.Get(context)`

### Activity with Outputs

#### V2 Activity with Output
```csharp
[Activity(Category = "Custom", Description = "Generates a random number")]
public class GenerateRandomNumber : Activity
{
    [ActivityOutput]
    public decimal Result { get; set; }

    protected override IActivityExecutionResult OnExecute(ActivityExecutionContext context)
    {
        Result = Random.Shared.Next(1, 100);
        return Done();
    }
}
```

#### V3 Activity with Output
```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Custom", "Generates a random number")]
public class GenerateRandomNumber : CodeActivity
{
    [Output(Description = "The generated random number.")]
    public Output<decimal> Result { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var randomNumber = Random.Shared.Next(1, 100);
        Result.Set(context, randomNumber);
    }
}
```

**Key Changes:**
- Outputs wrapped in `Output<T>`
- Use `Result.Set(context, value)` instead of direct assignment

### Async Activities

#### V2 Async Activity
```csharp
public class CallApiActivity : Activity
{
    [ActivityInput]
    public string Url { get; set; } = default!;

    [ActivityOutput]
    public string Response { get; set; } = default!;

    protected override async ValueTask<IActivityExecutionResult> OnExecuteAsync(
        ActivityExecutionContext context)
    {
        using var client = new HttpClient();
        Response = await client.GetStringAsync(Url);
        return Done();
    }
}
```

#### V3 Async Activity
```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Http", "Calls an HTTP API")]
public class CallApiActivity : Activity
{
    [Input(Description = "The URL to call")]
    public Input<string> Url { get; set; } = default!;

    [Output(Description = "The API response")]
    public Output<string> Response { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var url = Url.Get(context);
        using var client = context.GetRequiredService<IHttpClientFactory>().CreateClient();
        var response = await client.GetStringAsync(url);
        Response.Set(context, response);
        await context.CompleteActivityAsync();
    }
}
```

**Key Changes:**
- Method name: `OnExecuteAsync` → `ExecuteAsync`
- Must explicitly call `await context.CompleteActivityAsync()`
- Use service location via `context.GetRequiredService<T>()` instead of constructor injection

### Blocking Activities

#### V2 Blocking Activity
```csharp
public class WaitForEvent : Activity
{
    [ActivityInput]
    public string EventName { get; set; } = default!;

    protected override IActivityExecutionResult OnExecute(ActivityExecutionContext context)
    {
        return Suspend();
    }

    protected override IActivityExecutionResult OnResume(ActivityExecutionContext context)
    {
        return Done();
    }
}
```

#### V3 Blocking Activity
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Events", "Waits for an event to occur")]
public class WaitForEvent : Activity
{
    [Input(Description = "The name of the event to wait for")]
    public Input<string> EventName { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var eventName = EventName.Get(context);
        context.CreateBookmark(eventName);
    }
}
```

**Key Changes:**
- V2: Return `Suspend()` to block
- V3: Call `context.CreateBookmark(payload)` to block
- V3: No separate `OnResume` method; execution continues after bookmark is resumed

### Trigger Activities

#### V2 Trigger Activity
```csharp
[Trigger(
    Category = "Custom",
    Description = "Triggers workflow when event occurs"
)]
public class MyEventTrigger : Activity
{
    [ActivityInput]
    public string EventName { get; set; } = default!;

    protected override IActivityExecutionResult OnExecute(ActivityExecutionContext context)
    {
        return Suspend();
    }

    protected override IActivityExecutionResult OnResume(ActivityExecutionContext context)
    {
        return Done();
    }
}
```

#### V3 Trigger Activity
```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Events", "Triggers workflow when event occurs")]
public class MyEventTrigger : Trigger
{
    [Input(Description = "The name of the event")]
    public Input<string> EventName { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // If this trigger started the workflow, complete immediately
        if (context.IsTriggerOfWorkflow())
        {
            await context.CompleteActivityAsync();
            return;
        }

        // Otherwise, create a bookmark to wait
        var eventName = EventName.Get(context);
        context.CreateBookmark(eventName);
    }

    protected override object GetTriggerPayload(TriggerIndexingContext context)
    {
        var eventName = EventName.Get(context.ExpressionExecutionContext);
        return eventName;
    }
}
```

**Key Changes:**
- V3: Inherit from `Trigger` base class
- V3: Check `context.IsTriggerOfWorkflow()` to handle trigger vs resumption
- V3: Implement `GetTriggerPayload` to return the bookmark payload for indexing

### Activity Registration

#### V2 Registration
```csharp
services.AddElsa(elsa => elsa
    .AddActivity<PrintMessage>()
    .AddActivity<GenerateRandomNumber>()
    .AddActivity<CallApiActivity>()
);

// Or register all from assembly
services.AddElsa(elsa => elsa
    .AddActivitiesFrom<Startup>()
);
```

#### V3 Registration
```csharp
builder.Services.AddElsa(elsa => elsa
    .AddActivity<PrintMessage>()
    .AddActivity<GenerateRandomNumber>()
    .AddActivity<CallApiActivity>()
);

// Or register all from assembly
builder.Services.AddElsa(elsa => elsa
    .AddActivitiesFrom<Program>()
);
```

**Note:** Registration pattern is similar, but uses the new builder pattern in V3.

## Workflow JSON Migration

### V2 Workflow JSON Structure

```json
{
  "id": "workflow-1",
  "version": 1,
  "name": "Hello World Workflow",
  "description": "A simple workflow",
  "isPublished": true,
  "activities": [
    {
      "activityId": "activity-1",
      "type": "WriteLine",
      "displayName": "Write Line",
      "properties": [
        {
          "name": "Text",
          "syntax": "Literal",
          "expressions": {
            "Literal": "Hello World!"
          }
        }
      ]
    },
    {
      "activityId": "activity-2",
      "type": "Delay",
      "properties": [
        {
          "name": "Duration",
          "syntax": "Literal",
          "expressions": {
            "Literal": "00:00:01"
          }
        }
      ]
    },
    {
      "activityId": "activity-3",
      "type": "WriteLine",
      "properties": [
        {
          "name": "Text",
          "syntax": "Literal",
          "expressions": {
            "Literal": "Goodbye!"
          }
        }
      ]
    }
  ],
  "connections": [
    {
      "sourceActivityId": "activity-1",
      "targetActivityId": "activity-2",
      "outcome": "Done"
    },
    {
      "sourceActivityId": "activity-2",
      "targetActivityId": "activity-3",
      "outcome": "Done"
    }
  ]
}
```

### V3 Workflow JSON Structure

```json
{
  "id": "HelloWorld-v1",
  "definitionId": "HelloWorld",
  "name": "Hello World Workflow",
  "description": "A simple workflow",
  "version": 1,
  "isLatest": true,
  "isPublished": true,
  "root": {
    "id": "Flowchart1",
    "type": "Elsa.Flowchart",
    "version": 1,
    "activities": [
      {
        "id": "WriteLine1",
        "type": "Elsa.WriteLine",
        "version": 1,
        "name": "WriteLine1",
        "text": {
          "typeName": "String",
          "expression": {
            "type": "Literal",
            "value": "Hello World!"
          }
        }
      },
      {
        "id": "Delay1",
        "type": "Elsa.Delay",
        "version": 1,
        "name": "Delay1",
        "duration": {
          "typeName": "TimeSpan",
          "expression": {
            "type": "Literal",
            "value": "00:00:01"
          }
        }
      },
      {
        "id": "WriteLine2",
        "type": "Elsa.WriteLine",
        "version": 1,
        "name": "WriteLine2",
        "text": {
          "typeName": "String",
          "expression": {
            "type": "Literal",
            "value": "Goodbye!"
          }
        }
      }
    ],
    "connections": [
      {
        "source": {
          "activity": "WriteLine1",
          "port": "Done"
        },
        "target": {
          "activity": "Delay1",
          "port": "In"
        }
      },
      {
        "source": {
          "activity": "Delay1",
          "port": "Done"
        },
        "target": {
          "activity": "WriteLine2",
          "port": "In"
        }
      }
    ]
  }
}
```

### Key JSON Schema Changes

| Aspect | V2 | V3 |
|--------|----|----|
| **Root Container** | Activities listed directly | Activities wrapped in `root` object (Flowchart, Sequence) |
| **Activity Types** | Simple names: `"WriteLine"` | Fully qualified: `"Elsa.WriteLine"` |
| **Properties** | Array of property objects | Direct properties on activity with expression wrappers |
| **Property Structure** | `properties[].name` with `expressions` object | Direct property with `typeName` and `expression` |
| **Connections** | `sourceActivityId` / `targetActivityId` | Nested `source`/`target` objects with `activity` and `port` |
| **Metadata** | Basic `id`, `version`, `isPublished` | Additional `definitionId`, `isLatest` |

### Migration Steps for JSON

1. **Add Root Container**: Wrap all activities in a `root` object
   ```json
   {
     "root": {
       "type": "Elsa.Flowchart",
       "activities": [ /* your activities */ ],
       "connections": [ /* your connections */ ]
     }
   }
   ```

2. **Update Activity Type Names**: Add `Elsa.` prefix to all activity types
   - `WriteLine` → `Elsa.WriteLine`
   - `Delay` → `Elsa.Delay`
   - `HttpEndpoint` → `Elsa.HttpEndpoint`
   - `SendHttpRequest` → `Elsa.Http.SendHttpRequest`

3. **Convert Property Structure**: Transform property arrays to direct properties
   
   **V2:**
   ```json
   "properties": [
     {
       "name": "Text",
       "syntax": "Literal",
       "expressions": {
         "Literal": "Hello"
       }
     }
   ]
   ```
   
   **V3:**
   ```json
   "text": {
     "typeName": "String",
     "expression": {
       "type": "Literal",
       "value": "Hello"
     }
   }
   ```

4. **Update Connection Structure**: Change to nested source/target format
   
   **V2:**
   ```json
   {
     "sourceActivityId": "activity-1",
     "targetActivityId": "activity-2",
     "outcome": "Done"
   }
   ```
   
   **V3:**
   ```json
   {
     "source": {
       "activity": "activity-1",
       "port": "Done"
     },
     "target": {
       "activity": "activity-2",
       "port": "In"
     }
   }
   ```

5. **Add Required Metadata**: Include new V3 fields
   ```json
   {
     "definitionId": "unique-workflow-id",
     "isLatest": true
   }
   ```

### Expression Type Mapping

| V2 Expression Syntax | V3 Expression Type |
|---------------------|-------------------|
| `Literal` | `Literal` |
| `JavaScript` | `JavaScript` |
| `Liquid` | `Liquid` |
| `Json` | `Object` |

## Programmatic Workflows

### V2 Programmatic Workflow

```csharp
using Elsa.Activities.Console;
using Elsa.Builders;

public class HelloWorldWorkflow : IWorkflow
{
    public void Build(IWorkflowBuilder builder)
    {
        builder
            .StartWith<WriteLine>(x => x.WithText("Hello World!"))
            .Then<WriteLine>(x => x.WithText("Goodbye!"));
    }
}

// Registration
services.AddElsa(elsa => elsa
    .AddWorkflow<HelloWorldWorkflow>()
);
```

### V3 Programmatic Workflow

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

public class HelloWorldWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Root = new Sequence
        {
            Activities =
            {
                new WriteLine("Hello World!"),
                new WriteLine("Goodbye!")
            }
        };
    }
}

// Registration
builder.Services.AddElsa(elsa => elsa
    .AddWorkflow<HelloWorldWorkflow>()
);
```

**Key Changes:**
- V2: Implement `IWorkflow` and use fluent API with `StartWith`/`Then`
- V3: Inherit from `WorkflowBase` and build activity tree directly
- V3: More explicit activity composition with `builder.Root`
- V3: Activities instantiated directly instead of using extension methods

### Workflow with Variables

#### V2 Workflow with Variables
```csharp
public class VariableWorkflow : IWorkflow
{
    public void Build(IWorkflowBuilder builder)
    {
        var counter = builder.WithVariable<int>("Counter");

        builder
            .StartWith<SetVariable>(x => x
                .WithVariableName("Counter")
                .WithValue(0))
            .Then<WriteLine>(x => x
                .WithText(context => $"Counter: {counter.Get(context)}"));
    }
}
```

#### V3 Workflow with Variables
```csharp
public class VariableWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var counter = builder.WithVariable<int>("Counter", 0);

        builder.Root = new Sequence
        {
            Activities =
            {
                new SetVariable
                {
                    Variable = counter,
                    Value = new(10)
                },
                new WriteLine
                {
                    Text = new(context => $"Counter: {counter.Get(context)}")
                }
            }
        };
    }
}
```

**Key Changes:**
- Variable declaration syntax similar but initialization improved
- Setting variables uses direct property assignment instead of fluent methods
- Accessing variables uses same `counter.Get(context)` pattern

## Database and Persistence

### Schema Changes

The database schema has changed significantly between V2 and V3:

- Table names and structures are different
- Workflow instance data serialization format changed
- No automated migration scripts available

**Recommended Approach:**
1. **Parallel Databases**: Use separate databases for V2 and V3
2. **Let V2 Complete**: Allow existing V2 workflows to finish naturally
3. **Fresh Start in V3**: Create new workflow instances in V3

{% hint style="info" %}
Database-level migration is complex and error-prone. Most teams run V2 and V3 in parallel until V2 workflows complete.
{% endhint %}

### V2 Persistence Configuration

```csharp
services.AddElsa(elsa => elsa
    .UseEntityFrameworkPersistence(ef => ef
        .UseSqlServer(connectionString)
    )
);
```

### V3 Persistence Configuration

```csharp
builder.Services.AddElsa(elsa => 
{
    elsa
        .UseWorkflowManagement(management => 
        {
            management.UseEntityFrameworkCore(ef => 
                ef.UseSqlServer(connectionString));
        })
        .UseWorkflowRuntime(runtime =>
        {
            runtime.UseEntityFrameworkCore(ef => 
                ef.UseSqlServer(connectionString));
        });
});
```

**Key Changes:**
- Separate persistence configuration for management and runtime
- Different method names: `UseEntityFrameworkPersistence` → `UseEntityFrameworkCore`
- More explicit control over what gets persisted

### Supported Providers

| Provider | V2 Package | V3 Package |
|----------|-----------|-----------|
| SQL Server | `Elsa.Persistence.EntityFramework.SqlServer` | `Elsa.Persistence.EFCore.SqlServer` |
| PostgreSQL | `Elsa.Persistence.EntityFramework.PostgreSql` | `Elsa.Persistence.EFCore.PostgreSql` |
| MySQL | `Elsa.Persistence.EntityFramework.MySql` | `Elsa.Persistence.EFCore.MySql` |
| SQLite | `Elsa.Persistence.EntityFramework.Sqlite` | `Elsa.Persistence.EFCore.Sqlite` |
| MongoDB | `Elsa.Persistence.MongoDb` | `Elsa.MongoDb` |

## Background Job Scheduler

### V2 Job Scheduling

In V2, background activities required external job scheduler like Hangfire:

```csharp
services.AddElsa(elsa => elsa
    .UseQuartzTemporalActivities()
    .AddActivity<LongRunningTask>()
);

// Configure Hangfire
services.AddHangfire(config => config
    .UseSqlServerStorage(connectionString));
```

### V3 Job Scheduling

V3 includes a built-in background activity scheduler using .NET Channels:

```csharp
// Background scheduling is included by default
builder.Services.AddElsa(elsa => 
{
    elsa
        .UseWorkflowRuntime(runtime =>
        {
            // Configure background activity scheduler options if needed
            runtime.ConfigureBackgroundActivityScheduler(options =>
            {
                options.MaxConcurrentActivities = 10;
            });
        });
});

// Mark activities for background execution
[Activity("MyCompany", "Tasks", "Long running task", Kind = ActivityKind.Job)]
public class LongRunningTask : CodeActivity
{
    protected override void Execute(ActivityExecutionContext context)
    {
        // Long-running work
    }
}
```

**Key Changes:**
- Built-in scheduler eliminates need for Hangfire in basic scenarios
- Use `ActivityKind.Job` for background activities
- Hangfire still supported for advanced scenarios (failover, distributed execution)

## Common Migration Pitfalls

### 1. Direct JSON Import

**Problem:** Attempting to import V2 workflow JSON directly into V3.

**Solution:** V2 and V3 use incompatible JSON schemas. You must:
- Export V2 workflows as JSON
- Transform the JSON structure to V3 format
- Update all activity type names to fully qualified names
- Test thoroughly before importing

### 2. Assuming API Compatibility

**Problem:** Expecting V2 APIs to work in V3 with minor changes.

**Solution:** V3 is a complete rewrite. Expect to rewrite:
- Custom activities completely
- Workflow definitions
- Integration points
- Extension implementations

### 3. Database Migration

**Problem:** Trying to migrate the database schema from V2 to V3.

**Solution:** 
- Use separate databases for V2 and V3
- Run systems in parallel during transition
- Let V2 workflows complete naturally
- Start new workflows in V3

### 4. Constructor Injection in Activities

**Problem:** Using constructor injection in custom activities.

**V2 Pattern (worked but discouraged):**
```csharp
public class MyActivity : Activity
{
    private readonly IMyService _service;
    
    public MyActivity(IMyService service)
    {
        _service = service;
    }
}
```

**V3 Solution (service location):**
```csharp
public class MyActivity : CodeActivity
{
    protected override void Execute(ActivityExecutionContext context)
    {
        var service = context.GetRequiredService<IMyService>();
        // Use service
    }
}
```

**Reason:** Service location makes activity instantiation easier in workflow definitions.

### 5. Forgetting Activity Completion

**Problem:** Not calling `CompleteActivityAsync` in V3 activities.

**Incorrect:**
```csharp
public class MyActivity : Activity
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        Console.WriteLine("Done");
        // Missing completion!
    }
}
```

**Correct:**
```csharp
public class MyActivity : Activity
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        Console.WriteLine("Done");
        await context.CompleteActivityAsync(); // Required!
    }
}
```

**Or use CodeActivity:**
```csharp
public class MyActivity : CodeActivity
{
    protected override void Execute(ActivityExecutionContext context)
    {
        Console.WriteLine("Done");
        // Auto-completes!
    }
}
```

### 6. Input/Output Property Access

**Problem:** Accessing `Input<T>` and `Output<T>` properties directly.

**Incorrect:**
```csharp
public class MyActivity : CodeActivity
{
    public Input<string> Message { get; set; } = default!;
    
    protected override void Execute(ActivityExecutionContext context)
    {
        Console.WriteLine(Message); // Wrong!
    }
}
```

**Correct:**
```csharp
public class MyActivity : CodeActivity
{
    public Input<string> Message { get; set; } = default!;
    
    protected override void Execute(ActivityExecutionContext context)
    {
        var message = Message.Get(context); // Correct!
        Console.WriteLine(message);
    }
}
```

### 7. Bookmark Resumption

**Problem:** Using V2 bookmark/resumption patterns in V3.

**V2 Pattern:**
```csharp
// Creating bookmark
protected override IActivityExecutionResult OnExecute(ActivityExecutionContext context)
{
    return Suspend();
}

// Resuming
protected override IActivityExecutionResult OnResume(ActivityExecutionContext context)
{
    return Done();
}
```

**V3 Pattern:**
```csharp
// Creating bookmark
protected override void Execute(ActivityExecutionContext context)
{
    context.CreateBookmark("MyBookmark");
}

// No separate resume method - execution continues after bookmark
```

### 8. Missing Root Container in JSON

**Problem:** V2-style JSON without root container fails to parse in V3.

**Solution:** Always wrap activities in a root container:
```json
{
  "root": {
    "type": "Elsa.Flowchart",
    "activities": [ /* activities here */ ]
  }
}
```

### 9. Incorrect Package References

**Problem:** Mixing V2 and V3 packages.

**Solution:** Ensure all Elsa packages are V3:
```xml
<!-- All packages should be version 3.x -->
<PackageReference Include="Elsa" Version="3.x.x" />
<PackageReference Include="Elsa.Persistence.EFCore.SqlServer" Version="3.x.x" />
```

### 10. Trigger Activity Implementation

**Problem:** Not checking `IsTriggerOfWorkflow()` in trigger activities.

**Incorrect:**
```csharp
public class MyTrigger : Trigger
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        context.CreateBookmark("MyTrigger"); // Always blocks!
    }
}
```

**Correct:**
```csharp
public class MyTrigger : Trigger
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        if (context.IsTriggerOfWorkflow())
        {
            await context.CompleteActivityAsync();
            return;
        }
        
        context.CreateBookmark("MyTrigger");
    }
    
    protected override object GetTriggerPayload(TriggerIndexingContext context)
    {
        return "MyTrigger";
    }
}
```

## Testing and Validation

### Testing Strategy

1. **Unit Test Custom Activities**
   ```csharp
   [Fact]
   public async Task PrintMessage_Should_Write_To_Console()
   {
       // Arrange
       var services = new ServiceCollection()
           .AddElsa()
           .BuildServiceProvider();
       
       var activityExecutor = services.GetRequiredService<IActivityExecutor>();
       var activity = new PrintMessage
       {
           Message = new Input<string>("Hello")
       };
       
       // Act
       var result = await activityExecutor.ExecuteAsync(activity);
       
       // Assert
       Assert.True(result.IsCompleted);
   }
   ```

2. **Integration Test Workflows**
   ```csharp
   [Fact]
   public async Task Workflow_Should_Execute_Successfully()
   {
       // Arrange
       var services = new ServiceCollection()
           .AddElsa(elsa => elsa.AddWorkflow<HelloWorldWorkflow>())
           .BuildServiceProvider();
       
       var workflowRunner = services.GetRequiredService<IWorkflowRunner>();
       
       // Act
       var result = await workflowRunner.RunAsync<HelloWorldWorkflow>();
       
       // Assert
       Assert.Equal(WorkflowStatus.Finished, result.Status);
   }
   ```

3. **Test JSON Workflows**
   ```csharp
   [Fact]
   public async Task Should_Load_And_Execute_JSON_Workflow()
   {
       var json = File.ReadAllText("workflow.json");
       var services = new ServiceCollection()
           .AddElsa()
           .BuildServiceProvider();
       
       var serializer = services.GetRequiredService<IActivitySerializer>();
       var workflowDefinitionModel = serializer.Deserialize<WorkflowDefinitionModel>(json);
       var workflowDefinitionMapper = services.GetRequiredService<WorkflowDefinitionMapper>();
       var workflow = workflowDefinitionMapper.Map(workflowDefinitionModel);
       
       var runner = services.GetRequiredService<IWorkflowRunner>();
       var result = await runner.RunAsync(workflow);
       
       Assert.Equal(WorkflowStatus.Finished, result.Status);
   }
   ```

### Validation Checklist

- [ ] All custom activities compile and run
- [ ] Activity inputs and outputs work correctly
- [ ] Blocking activities create bookmarks properly
- [ ] Trigger activities can start workflows
- [ ] Workflows execute from start to finish
- [ ] Workflow variables persist correctly
- [ ] Error handling works as expected
- [ ] Integration points function correctly
- [ ] Performance meets requirements
- [ ] Database persistence works

## Migration Timeline Example

### Phase 1: Preparation (Week 1-2)
- Set up V3 development environment
- Inventory all V2 workflows and custom activities
- Review V3 documentation
- Create proof-of-concept migrations

### Phase 2: Custom Activities (Week 3-4)
- Rewrite all custom activities for V3
- Unit test each activity
- Register activities with V3 engine

### Phase 3: Workflow Migration (Week 5-8)
- Convert workflow definitions to V3
- Test each workflow individually
- Migrate programmatic workflows
- Update integration points

### Phase 4: Infrastructure (Week 9-10)
- Set up V3 database schema
- Configure persistence providers
- Deploy V3 application to staging
- Configure monitoring and logging

### Phase 5: Parallel Operation (Week 11-12)
- Run V2 and V3 side-by-side
- Monitor both systems
- Route new workflows to V3
- Allow V2 workflows to complete

### Phase 6: Cutover (Week 13)
- Verify all V2 workflows completed
- Decommission V2 system
- Full production deployment of V3
- Monitor and optimize

## Resources

### Documentation
- [Elsa Workflows V3 Documentation](https://docs.elsaworkflows.io/)
- [Elsa Workflows V2 Documentation](https://v2.elsaworkflows.io/)
- [Custom Activities Guide](../extensibility/custom-activities.md)
- [Loading Workflows from JSON](loading-workflows-from-json.md)

### GitHub Resources
- [Elsa Core Repository](https://github.com/elsa-workflows/elsa-core)
- [Migration Discussion](https://github.com/elsa-workflows/elsa-core/discussions/4767)
- [Breaking Changes](https://github.com/elsa-workflows/elsa-core/releases)

### Community
- [GitHub Discussions](https://github.com/elsa-workflows/elsa-core/discussions)
- [Discord Server](https://discord.gg/hhChk5H472)

## Summary

Migrating from Elsa V2 to V3 requires significant effort due to the complete rewrite:

**Key Takeaways:**
1. ✅ No automated migration path exists
2. ✅ Custom activities must be rewritten
3. ✅ Workflow JSON must be transformed
4. ✅ Database schemas are incompatible
5. ✅ Plan for parallel operation during transition
6. ✅ V3 offers significant improvements in scalability and performance
7. ✅ Built-in background scheduler eliminates need for Hangfire in basic scenarios
8. ✅ More explicit and type-safe API

**Migration Approach:**
- Start with a comprehensive inventory of V2 assets
- Rewrite custom activities using V3 patterns
- Transform workflow definitions to V3 format
- Run V2 and V3 in parallel during transition
- Thoroughly test all migrated components
- Monitor carefully during cutover

While migration requires significant effort, V3's improvements in architecture, performance, and extensibility make it worthwhile for long-term success.

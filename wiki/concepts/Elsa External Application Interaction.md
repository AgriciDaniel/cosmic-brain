---
type: concept
title: "Elsa External Application Interaction"
created: 2026-05-25
updated: 2026-05-25
tags:
  - concept
  - elsa
  - webhooks
  - external-integration
  - guides
status: developing
address: c-000071
related:
  - "[[entities/Elsa Workflows]]"
  - "[[Elsa Running Workflows]]"
  - "[[Elsa Workflow Concepts]]"
  - "[[Elsa Workflow Patterns]]"
---

# Elsa External Application Interaction

A common [[entities/Elsa Workflows]] pattern: a workflow server orchestrates tasks, and a separate application executes them. They communicate via **webhooks** and the **Elsa REST API**.

> [!info] Reference Architecture
> ```
> Elsa Server  ──webhook (RunTask)──>  Onboarding App
> (orchestrator)                       (task executor)
>       <────HTTP POST (complete)────
> ```

---

## The RunTask Activity

The **Run Task** activity (`Elsa.Workflows.Runtime.Activities.RunTask`) is the bridge between the workflow server and an external application. When the workflow executes a `RunTask` activity:

1. The server sends a webhook event to the configured external URL
2. The external app receives the task details and displays them to a user
3. When the user completes the task, the external app calls the Elsa REST API
4. The workflow resumes and proceeds to the next step

### Configuring Webhooks

**1. Add the Webhooks package:**
```bash
dotnet add package Elsa.Webhooks
```

**2. Configure in Program.cs:**
```csharp
elsa.UseWebhooks(webhooks => webhooks.ConfigureSinks += options => 
    builder.Configuration.GetSection("Webhooks").Bind(options));
```

**3. Define sinks in appsettings.json:**
```json
"Webhooks": {
    "Sinks": [
        {
            "Id": "1",
            "Name": "Run Task",
            "Filters": [{ "EventType": "Elsa.RunTask" }],
            "Url": "https://localhost:5002/api/webhooks/run-task"
        }
    ]
}
```

Every time `RunTask` executes, the server POSTs to the configured URL with the task payload.

---

## Example: Employee Onboarding

A complete two-app pattern: an **Elsa Server** orchestrates onboarding steps, and an **Onboarding MVC app** displays tasks to HR staff.

### Workflow Definition (Programmatic)

```csharp
public class Onboarding : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var employee = builder.WithVariable<object>();
        builder.Root = new Sequence
        {
            Activities =
            {
                new SetVariable
                {
                    Variable = employee,
                    Value = new(context => context.GetInput("Employee"))
                },
                new RunTask("Create Email Account")
                {
                    Payload = new(context => new Dictionary<string, object>
                    {
                        ["Employee"] = employee.Get(context)!,
                        ["Description"] = "Create an email account."
                    })
                },
                new Parallel
                {
                    Activities =
                    {
                        new RunTask("Create Slack Account") { ... },
                        new RunTask("Create GitHub Account") { ... },
                        new RunTask("Add to HR System") { ... }
                    }
                },
                new End()
            }
        };
    }
}
```

The `Parallel` activity fans out three simultaneous tasks after the email account is created.

### External App: Receiving Tasks

The external app exposes a webhook endpoint:

```csharp
[HttpPost("run-task")]
public async Task<IActionResult> RunTask(WebhookEvent webhookEvent)
{
    var task = new OnboardingTask
    {
        ExternalId = webhookEvent.Payload.TaskId,
        Name = webhookEvent.Payload.TaskName,
        Description = webhookEvent.Payload.TaskPayload.Description,
        EmployeeName = webhookEvent.Payload.TaskPayload.Employee.Name,
        EmployeeEmail = webhookEvent.Payload.TaskPayload.Employee.Email
    };
    await dbContext.Tasks.AddAsync(task);
    await dbContext.SaveChangesAsync();
    return Ok();
}
```

### External App: Completing Tasks

When the user clicks **Complete**, the app calls the Elsa REST API:

```csharp
public class ElsaClient(HttpClient httpClient)
{
    public async Task ReportTaskCompletedAsync(string taskId, object? result = default, CancellationToken ct = default)
    {
        var url = new Uri($"tasks/{taskId}/complete", UriKind.Relative);
        await httpClient.PostAsJsonAsync(url, new { Result = result }, ct);
    }
}
```

Registered with API key auth:
```csharp
builder.Services.AddHttpClient<ElsaClient>(httpClient =>
{
    httpClient.BaseAddress = new Uri(configuration["Elsa:ServerUrl"]);
    httpClient.DefaultRequestHeaders.Authorization = 
        new AuthenticationHeaderValue("ApiKey", configuration["Elsa:ApiKey"]);
});
```

### Running the Process

1. Start the Onboarding app: `dotnet run --urls=https://localhost:5002`
2. Start the Elsa Server
3. Execute the workflow via REST API with employee input:
```bash
curl -X POST 'https://localhost:5001/elsa/api/workflow-definitions/{id}/execute' \
  --header 'Authorization: ApiKey ...' \
  --data-raw '{"input": {"Employee": {"Name": "Alice Smith", "Email": "alice@acme.com"}}}'
```
4. Tasks appear in the Onboarding app UI
5. HR clicks **Complete** on each task; the workflow resumes after each

> [!tip] Parallel Task Completion
> In the example, after creating the email account, three tasks run in parallel (Slack, GitHub, HR). Each can be completed independently and in any order. The workflow continues to `End` only after all three are done.

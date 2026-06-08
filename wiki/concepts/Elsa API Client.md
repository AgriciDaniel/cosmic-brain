---
type: concept
title: Elsa API Client
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa-workflows
  - api-client
  - http-api
  - workflow-instances
  - bookmarks
status: developing
address: c-000056
related:
  - "[[Elsa Workflows]]"
  - "[[Elsa Persistence]]"
  - "[[Elsa HTTP Workflows]]"
  - "[[Elsa Plugins and Modules]]"
---

# Elsa API Client

Elsa provides two approaches for programmatic interaction: direct HTTP APIs and the official `elsa-api-client` .NET library. The API revolves around three primary entities: **Workflow Definitions** (blueprint templates), **Workflow Instances** (running/completed executions), and **Bookmarks** (suspension points for workflow resume).

| Approach | Best For |
|----------|----------|
| **Direct HTTP** | Polyglot teams, non-.NET clients, simple integrations |
| **elsa-api-client** | .NET applications, complex workflows, production systems |

---

## Architecture and Lifecycle

```
Design -> Publish -> Instantiate -> Execute -> Suspend -> Resume -> Complete
                                          (bookmark)
```

1. **Design** — Create a workflow definition (via Studio or programmatically)
2. **Publish** — Activate the definition for execution
3. **Instantiate** — Create a new workflow instance
4. **Execute** — Run activities until completion or suspension
5. **Suspend (Bookmark)** — Workflow pauses at a blocking activity, creating a bookmark
6. **Resume** — An external event triggers the bookmark, execution continues
7. **Complete** — Workflow finishes with success or fault status

---

## Authentication

```bash
# Bearer Token
curl -X GET "https://your-elsa-server.com/elsa/api/workflow-definitions" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"

# API Key
curl -X GET "https://your-elsa-server.com/elsa/api/workflow-definitions" \
  -H "X-Api-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

```csharp
// elsa-api-client configuration
services.AddElsaClient(client =>
{
    client.BaseUrl = new Uri("https://your-elsa-server.com");
    client.ApiKey = "YOUR_API_KEY";
});
```

---

## Publishing Workflow Definitions

### Using elsa-api-client

```csharp
public class WorkflowPublisher
{
    private readonly IWorkflowDefinitionsApi _api;

    public WorkflowPublisher(IWorkflowDefinitionsApi api)
    {
        _api = api;
    }

    public async Task<WorkflowDefinition> PublishWorkflowAsync()
    {
        var request = new SaveWorkflowDefinitionRequest
        {
            Model = new WorkflowDefinitionModel
            {
                DefinitionId = "my-workflow",
                Name = "My Workflow",
                Version = 1,
                IsPublished = true,
                Root = new Activity
                {
                    Type = "Elsa.WriteLine",
                    Id = "write-line-1"
                },
                Options = new WorkflowOptions
                {
                    CommitStrategyName = "WorkflowExecuted",
                    ActivationStrategyType = "Singleton",
                    AutoUpdateConsumingWorkflows = true
                }
            },
            Publish = true
        };

        return await _api.SaveAsync(request);
    }
}
```

### HTTP Variant

```bash
curl -X POST "https://your-elsa-server.com/elsa/api/workflow-definitions" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "definitionId": "my-workflow",
    "name": "My Workflow",
    "version": 1,
    "isPublished": true,
    "root": {
      "type": "Elsa.WriteLine",
      "id": "write-line-1"
    },
    "options": {
      "commitStrategyName": "WorkflowExecuted"
    }
  }'
```

### Versioning and Publishing Semantics

| State | Description | Can Execute? |
|-------|-------------|:------------:|
| **Draft** | Work-in-progress definition | No |
| **Published** | Active, executable version | Yes |

Key properties:
- `DefinitionId` — Unique identifier for the workflow definition
- `Publish = true` — Immediately publish on save
- `AutoUpdateConsumingWorkflows` — When true, workflows referencing this definition automatically use the new version
- `ActivationStrategyType` — `Default` (each trigger creates a new instance) or `Singleton` (only one running instance per definition)

---

## Starting Workflow Instances

```csharp
public class WorkflowStarter
{
    private readonly IWorkflowInstancesApi _api;

    public WorkflowStarter(IWorkflowInstancesApi api)
    {
        _api = api;
    }

    public async Task<string> StartWorkflowAsync(
        string definitionId,
        string? correlationId = null,
        Dictionary<string, object>? input = null)
    {
        var response = await _api.StartAsync(new StartWorkflowRequest
        {
            DefinitionId = definitionId,
            CorrelationId = correlationId,
            Input = input
        });

        return response.WorkflowInstanceId;
    }
}
```

```bash
curl -X POST "https://your-elsa-server.com/elsa/api/workflow-instances/start" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "definitionId": "my-workflow",
    "correlationId": "order-12345",
    "input": {
      "orderId": "12345",
      "customerEmail": "customer@example.com"
    }
  }'
```

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `definitionId` | ID of the workflow definition to start | Yes |
| `correlationId` | External identifier for correlation | No |
| `input` | Dictionary of input values | No |
| `versionOptions` | Which version to run (Latest, Published, Specific) | No |

---

## Querying Workflow Instances

```csharp
public async Task<PagedListResponse<WorkflowInstanceSummary>> QueryByCorrelationAsync(
    string correlationId,
    WorkflowStatus? status = null,
    int page = 0,
    int pageSize = 25)
{
    return await _api.ListAsync(new ListWorkflowInstancesRequest
    {
        CorrelationId = correlationId,
        Status = status,
        Page = page,
        PageSize = pageSize
    });
}
```

```bash
# By correlation ID
curl "https://your-elsa-server.com/elsa/api/workflow-instances?correlationId=order-12345&page=0&pageSize=25"

# By status
curl "https://your-elsa-server.com/elsa/api/workflow-instances?status=Running&page=0&pageSize=25"

# By definition
curl "https://your-elsa-server.com/elsa/api/workflow-instances?definitionId=my-workflow&version=2"
```

| Parameter | Description | Type |
|-----------|-------------|------|
| `status` | Filter by workflow status | Enum |
| `correlationId` | Filter by correlation ID | String |
| `definitionId` | Filter by workflow definition ID | String |
| `version` | Filter by specific version | Integer |
| `page` | Page number (0-indexed) | Integer |
| `pageSize` | Results per page (default: 25, max: 100) | Integer |

---

## Bookmarks and Resuming Workflows

Bookmarks are created when a workflow reaches a blocking activity (e.g., waiting for HTTP callback, human approval, or external event). Bookmarks are matched using a deterministic hash based on the activity type name and stimulus payload data.

### Token-Based Resume

HTTP triggers generate tokenized URLs for easy resumption:

```bash
curl -X POST "https://your-elsa-server.com/elsa/api/bookmarks/resume?t=ENCRYPTED_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "approved"}'
```

### Stimulus-Based Resume

```bash
curl -X POST "https://your-elsa-server.com/elsa/api/bookmarks/resume" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "activityTypeName": "Elsa.HttpEndpoint",
    "stimulus": {
      "path": "/webhook/order-approved",
      "method": "POST"
    },
    "input": {
      "status": "approved"
    }
  }'
```

### elsa-api-client Resume

```csharp
await _instancesApi.ResumeAsync(new ResumeWorkflowRequest
{
    WorkflowInstanceId = instanceId,
    BookmarkId = bookmarkId,
    Input = new Dictionary<string, object>
    {
        ["status"] = "approved"
    }
});
```

> [!info] Resume Flow
> The `WorkflowResumer` service: (1) acquires a distributed lock on the workflow instance, (2) loads workflow state, (3) finds the matching bookmark, (4) resumes execution from the bookmarked activity, (5) burns (deletes) the bookmark if `AutoBurn = true`.

> [!warning] Security
> Tokenized resume URLs should be treated as secrets. Always use HTTPS. Tokens expire when the bookmark is burned or the workflow is cancelled.

---

## Resilience Strategies

Activities can be configured with resilience strategies to handle transient failures. Configuration is done via activity custom properties (the exact API may vary by version):

```csharp
activity.CustomProperties["resilience"] = new ResilienceConfiguration
{
    RetryCount = 3,
    InitialDelay = TimeSpan.FromSeconds(2),
    BackoffMultiplier = 2.0,
    MaxDelay = TimeSpan.FromSeconds(30),
    JitterEnabled = true
};
```

---

## Commit Strategies

Commit strategies control when workflow state is persisted:

| Strategy | Behavior | Use Case |
|----------|----------|----------|
| `WorkflowExecuted` | Commits after workflow completes | High throughput, short workflows |
| `ActivityExecuted` | Commits after each activity | Maximum durability |
| `Periodic` | Commits at regular intervals | Long-running workflows |

---

## Error Handling

| Status Code | Meaning | Common Cause |
|:-----------:|---------|--------------|
| 200 OK | Success | — |
| 201 Created | Resource created | — |
| 400 Bad Request | Validation error | Missing required field, malformed JSON |
| 401 Unauthorized | Authentication failed | Invalid or expired token |
| 404 Not Found | Resource not found | Definition ID doesn't exist |
| 409 Conflict | Publish conflict | Version conflict during concurrent publish |
| 410 Gone | Resource expired | Bookmark already consumed or expired |

---

## Best Practices

1. **Use correlation IDs** for multi-event workflows to track related activities
2. **Handle transient failures** with retry policies
3. **Use HTTPS** for all API calls
4. **Paginate results** to avoid memory issues
5. **Design resume handlers to be idempotent** (safe to call multiple times)
6. **Clean up completed instances** via retention policies

---

## Related Documentation

- [[Elsa Workflows]] — Overview of the Elsa Workflows ecosystem
- [[Elsa Persistence]] — Database configuration and provider selection
- [[Elsa HTTP Workflows]] — Building HTTP endpoint workflows
- [[Elsa Plugins and Modules]] — Extending Elsa with custom modules

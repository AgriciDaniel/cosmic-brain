---
type: concept
title: Elsa HTTP Workflows
created: 2026-05-25
updated: 2026-05-25
tags:
  - elsa-workflows
  - http
  - rest-api
  - endpoints
status: developing
address: c-000073
related:
  - "[[Elsa Workflows]]"
  - "[[Elsa API Client]]"
  - "[[Elsa Persistence]]"
  - "[[Elsa Plugins and Modules]]"
---

# Elsa HTTP Workflows

Elsa Workflows can handle inbound HTTP requests, send outbound HTTP requests, and write output to HTTP response objects. This enables building RESTful APIs entirely as workflow definitions using HTTP activities.

---

## Core HTTP Activities

| Activity | Purpose |
|----------|---------|
| **HttpEndpoint** | Receives inbound HTTP requests (GET, POST, PUT, DELETE) |
| **SendHttpRequest** | Makes outbound HTTP calls to external APIs |
| **WriteHttpResponse** | Writes content back to the HTTP response |

---

## Approaches to Building HTTP Workflows

HTTP workflows can be built in three ways:

| Approach | Description |
|----------|-------------|
| **Programmatic (C#)** | Define workflows in code using the `WorkflowBase` class |
| **Designer (Studio)** | Visually design workflows using Elsa Studio |
| **Hybrid** | Combine both approaches as needed |

---

## Programmatic Approach (C#)

Define a workflow class inheriting from `WorkflowBase`:

```csharp
public class GetUser : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var routeDataVariable = builder.WithVariable<IDictionary<string, object>>();
        var userIdVariable = builder.WithVariable<string>();
        var userVariable = builder.WithVariable<ExpandoObject>();

        builder.Root = new Sequence
        {
            Activities =
            {
                new HttpEndpoint
                {
                    Path = new("users/{userid}"),
                    SupportedMethods = new(new[] { HttpMethods.Get }),
                    CanStartWorkflow = true,
                    RouteData = new(routeDataVariable)
                },
                new SetVariable
                {
                    Variable = userIdVariable,
                    Value = new(context =>
                    {
                        var routeData = routeDataVariable.Get(context)!;
                        return routeData["userid"].ToString();
                    })
                },
                new SendHttpRequest
                {
                    Url = new(context =>
                    {
                        var userId = userIdVariable.Get(context);
                        return new Uri($"https://reqres.in/api/users/{userId}");
                    }),
                    Method = new(HttpMethods.Get),
                    ParsedContent = new(userVariable),
                    ExpectedStatusCodes =
                    {
                        new HttpStatusCodeCase
                        {
                            StatusCode = StatusCodes.Status200OK,
                            Activity = new WriteHttpResponse
                            {
                                Content = new(context =>
                                {
                                    var user = (dynamic)userVariable.Get(context)!;
                                    return user.data;
                                }),
                                StatusCode = new(HttpStatusCode.OK)
                            }
                        },
                        new HttpStatusCodeCase
                        {
                            StatusCode = StatusCodes.Status404NotFound,
                            Activity = new WriteHttpResponse
                            {
                                Content = new("User not found"),
                                StatusCode = new(HttpStatusCode.NotFound)
                            }
                        }
                    }
                }
            }
        };
    }
}
```

Key patterns in the programmatic approach:
- Use `builder.WithVariable<T>()` to define typed workflow variables
- Set `CanStartWorkflow = true` on `HttpEndpoint` to make it a trigger
- Use route parameter syntax `{userid}` in the `Path` property
- Handle multiple HTTP status codes via `ExpectedStatusCodes` with `HttpStatusCodeCase` entries
- The `SendHttpRequest` activity auto-parses JSON responses into `ExpandoObject` variables

---

## Designer Approach (Elsa Studio)

Using Elsa Studio's visual designer, you can create the same workflow without writing code:

1. Create a new workflow (e.g., "Get User")
2. Add activities to the design surface: HttpEndpoint, Set Variable, SendHttpRequest, WriteHttpResponse
3. Create workflow variables (RouteData, UserId, User)
4. Configure HttpEndpoint with path `users/{userid}`, GET method, and "Trigger Workflow" enabled
5. Use SetVariable to extract route data with Liquid: `{{ Variables.RouteData.userid }}`
6. Configure SendHttpRequest with the URL and expected status codes (200, 404)
7. Connect the status code outcomes to appropriate WriteHttpResponse activities
8. Publish the workflow

---

## Tutorial: Building a Task Management API

A complete CRUD API can be built using HTTP workflows:

| Endpoint | Method | Workflow | Description |
|----------|--------|----------|-------------|
| `/workflows/tasks` | GET | ListTasks | List all tasks with optional query filtering |
| `/workflows/tasks/{id}` | GET | GetTask | Get a specific task by ID |
| `/workflows/tasks` | POST | CreateTask | Create a new task with validation |
| `/workflows/tasks/{id}` | PUT | UpdateTask | Update an existing task |
| `/workflows/tasks/{id}` | DELETE | DeleteTask | Delete a task |

### Key Patterns from the Tutorial

**Query Parameters:**
- HttpEndpoint outputs query string data to a variable (e.g., `QueryData`)
- Extract specific parameters with Liquid: `{{ Variables.QueryData.status ?? "all" }}`
- Use C# expressions for complex filtering logic

**Route Parameters:**
- Define route placeholders in the path: `tasks/{id}`
- Route data is captured as a dictionary via the `RouteData` output
- Extract with Liquid: `{{ Variables.RouteData.id }}`

**Request Body Parsing:**
- HttpEndpoint auto-parses JSON request bodies into the `ParsedContent` output
- Validate input with C# expressions and return 400 Bad Request on failure
- Return 201 Created with a Location header on successful resource creation

**Error Handling Patterns:**
- Use a **Decision** activity to branch on validation results
- Return appropriate HTTP status codes (400, 404, 500)
- Use the **Fault** activity to wrap risky operations and catch exceptions
- Return consistent JSON error responses with error codes and timestamps

---

## Working with Headers

### Reading Request Headers

Configure the HttpEndpoint activity to capture headers:

| Output | Variable |
|--------|----------|
| Headers | Headers |

Extract specific headers:

```liquid
{{ Variables.Headers.Authorization ?? "No token provided" }}
{{ Variables.Headers["User-Agent"] ?? "Unknown" }}
```

### Setting Response Headers

Configure WriteHttpResponse with custom headers:

| Name | Value | Syntax |
|------|-------|--------|
| X-Request-Id | `{{guid()}}` | Liquid |
| X-Response-Time | `{{now | date: "%Y-%m-%d %H:%M:%S"}}` | Liquid |
| Cache-Control | `no-cache, no-store, must-revalidate` | Default |
| Access-Control-Allow-Origin | `https://yourdomain.com` | Default |

---

## Error Handling Strategies

### Pattern 1: Try-Catch with Fault Activity

Wrap risky operations in a **Fault** activity. Connect the Faulted outcome to error handling logic that returns an appropriate error response.

### Pattern 2: Validation and Early Returns

Validate input early and return appropriate error responses with clear messages:

| Status Code | Use Case |
|:-----------:|----------|
| 400 Bad Request | Invalid input data |
| 401 Unauthorized | Missing or invalid authentication |
| 403 Forbidden | Insufficient permissions |
| 404 Not Found | Resource doesn't exist |
| 409 Conflict | Resource state conflict |
| 422 Unprocessable Entity | Business rule violation |
| 429 Too Many Requests | Rate limit exceeded |
| 500 Internal Server Error | Unexpected server errors |

### Pattern 3: Content Negotiation

Handle different content types based on the `Accept` request header, returning JSON, XML, or CSV as appropriate.

---

## Testing HTTP Workflows

### cURL

```bash
# List tasks
curl -X GET https://localhost:5001/workflows/tasks

# Create task
curl -X POST https://localhost:5001/workflows/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","status":"active"}'

# Delete task
curl -X DELETE https://localhost:5001/workflows/tasks/1
```

### xUnit Integration Tests

```csharp
public class TaskWorkflowTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public TaskWorkflowTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetTask_WithValidId_ReturnsTask()
    {
        var response = await _client.GetAsync("/workflows/tasks/1");
        response.EnsureSuccessStatusCode();
    }

    [Fact]
    public async Task GetTask_WithInvalidId_ReturnsNotFound()
    {
        var response = await _client.GetAsync("/workflows/tasks/999");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
```

---

## Best Practices

1. **Use consistent response formats** — Always return JSON in a predictable structure (success wrapping with `data` field, errors with `error`, `code`, and `details`)
2. **Validate all inputs** — Never trust client input; validate required fields, data types, ranges, and formats
3. **Use appropriate HTTP methods** — GET for retrieval, POST for creation, PUT for full updates, DELETE for removal
4. **Return semantic status codes** — Use proper HTTP status codes to communicate results clearly
5. **Version your APIs** — Include version in the path (`/workflows/v1/tasks`) or use content negotiation headers
6. **Handle timeouts** — For long-running operations, return 202 Accepted and provide a status endpoint
7. **Implement security** — Validate authentication tokens, implement authorization checks, sanitize inputs, use HTTPS

---

## Related Documentation

- [[Elsa Workflows]] — Overview of the Elsa Workflows ecosystem
- [[Elsa API Client]] — Programmatic API interaction and client library
- [[Elsa Persistence]] — Database configuration for workflow state
- [[Elsa Plugins and Modules]] — Extending Elsa with custom activities and features

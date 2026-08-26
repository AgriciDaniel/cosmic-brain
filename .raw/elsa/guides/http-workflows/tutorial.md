# Tutorial

This comprehensive tutorial guides you through creating HTTP-based workflows in Elsa, covering all aspects of HTTP endpoint development from basic concepts to advanced patterns.

## Overview

In this tutorial, you will learn how to:

* Create HTTP endpoints that respond to GET, POST, PUT, and DELETE requests
* Handle query parameters, headers, and request bodies
* Parse and validate incoming data
* Return appropriate HTTP responses with proper status codes
* Implement error handling strategies
* Test and debug HTTP workflows

By the end of this tutorial, you'll have a complete understanding of building production-ready HTTP workflows for RESTful API development.

## Prerequisites

Before you start, ensure you have:

* An [Elsa Server](../../application-types/elsa-server.md) project up and running
* [Elsa Studio](../../application-types/elsa-studio.md) installed and connected to your Elsa Server
* Basic understanding of HTTP methods and REST principles
* A tool for testing HTTP endpoints (Postman, curl, or similar)

{% hint style="info" %}
**New to Elsa?**

If you haven't set up Elsa yet, check out our [Getting Started](../../getting-started/hello-world.md) guide and [Docker Quickstart](../../getting-started/containers/docker-compose/docker-quickstart.md) for the fastest way to get up and running.
{% endhint %}

## Tutorial Scenario

We'll build a simple **Task Management API** with the following endpoints:

* `GET /workflows/tasks` - List all tasks (with query parameters for filtering)
* `GET /workflows/tasks/{id}` - Get a specific task by ID
* `POST /workflows/tasks` - Create a new task
* `PUT /workflows/tasks/{id}` - Update an existing task
* `DELETE /workflows/tasks/{id}` - Delete a task

This scenario will demonstrate real-world patterns you'll use when building HTTP workflows.

## Part 1: Creating a GET Endpoint with Query Parameters

Let's start by creating a workflow that lists tasks with optional filtering via query parameters.

{% stepper %}
{% step %}
#### Create the List Tasks Workflow

1. Open Elsa Studio and navigate to **Workflows**
2. Click **Create Workflow**
3. Name it `ListTasks`
4. Set the workflow as **Published** when ready
{% endstep %}

{% step %}
#### Add Required Activities

Add the following activities to your workflow:

1. **HTTP Endpoint** - To receive the request
2. **Set Variable** - To extract query parameters
3. **Set Variable** - To create a filtered task list
4. **Write HTTP Response** - To return the results
{% endstep %}

{% step %}
#### Create Workflow Variables

Create the following variables:

| Name         | Type             | Storage           |
| ------------ | ---------------- | ----------------- |
| QueryData    | ObjectDictionary | Workflow Instance |
| StatusFilter | string           | Workflow Instance |
| Tasks        | Object           | Workflow Instance |
{% endstep %}

{% step %}
#### Configure HTTP Endpoint

Configure the HTTP Endpoint activity:

{% tabs %}
{% tab title="Input" %}
| Property          | Value   | Syntax  |
| ----------------- | ------- | ------- |
| Path              | `tasks` | Default |
| Supported Methods | `GET`   | Default |
{% endtab %}

{% tab title="Output" %}
| Property          | Value     |
| ----------------- | --------- |
| Query String Data | QueryData |
{% endtab %}

{% tab title="Common" %}
| Property         | Value   |
| ---------------- | ------- |
| Trigger Workflow | Checked |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Extract Query Parameters

Configure the first Set Variable activity to extract the status filter:

{% tabs %}
{% tab title="Input" %}
| Property | Value                                       | Syntax  |
| -------- | ------------------------------------------- | ------- |
| Variable | `StatusFilter`                              | Default |
| Value    | `{{ Variables.QueryData.status ?? "all" }}` | Liquid  |
{% endtab %}
{% endtabs %}

This extracts the `status` query parameter (e.g., `?status=active`) or defaults to "all".
{% endstep %}

{% step %}
#### Create Mock Task Data

Configure the second Set Variable activity to create sample task data:

{% tabs %}
{% tab title="Input" %}
| Property | Value          | Syntax  |
| -------- | -------------- | ------- |
| Variable | `Tasks`        | Default |
| Value    | See code below | C#      |
{% endtab %}
{% endtabs %}

C# Expression:

```csharp
var allTasks = new[]
{
    new { Id = 1, Title = "Complete documentation", Status = "active", Priority = "high" },
    new { Id = 2, Title = "Review pull requests", Status = "active", Priority = "medium" },
    new { Id = 3, Title = "Update dependencies", Status = "completed", Priority = "low" },
    new { Id = 4, Title = "Fix critical bug", Status = "active", Priority = "high" },
    new { Id = 5, Title = "Deploy to production", Status = "pending", Priority = "high" }
};

var filter = Variables.StatusFilter.ToLower();
return filter == "all" 
    ? allTasks 
    : allTasks.Where(t => t.Status.ToLower() == filter).ToArray();
```
{% endstep %}

{% step %}
#### Return Response

Configure the Write HTTP Response activity:

{% tabs %}
{% tab title="Input" %}
| Property     | Value              | Syntax     |
| ------------ | ------------------ | ---------- |
| Status Code  | `OK`               | Default    |
| Content      | `Variables.Tasks`  | JavaScript |
| Content Type | `application/json` | Default    |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Test the Workflow

1. **Publish** the workflow
2. Test with different query parameters:
   * `GET https://localhost:5001/workflows/tasks` - Returns all tasks
   * `GET https://localhost:5001/workflows/tasks?status=active` - Returns only active tasks
   * `GET https://localhost:5001/workflows/tasks?status=completed` - Returns completed tasks

{% hint style="success" %}
**Expected Response**

When you make a request to `https://localhost:5001/workflows/tasks?status=active`, you should receive a JSON response containing only the active tasks:

```json
[
  {
    "Id": 1,
    "Title": "Complete documentation",
    "Status": "active",
    "Priority": "high"
  },
  {
    "Id": 2,
    "Title": "Review pull requests",
    "Status": "active",
    "Priority": "medium"
  },
  {
    "Id": 4,
    "Title": "Fix critical bug",
    "Status": "active",
    "Priority": "high"
  }
]
```
{% endhint %}
{% endstep %}
{% endstepper %}

## Part 2: Creating a GET Endpoint with Route Parameters

Now let's create a workflow that retrieves a specific task by ID using route parameters.

{% stepper %}
{% step %}
#### Create the Get Task Workflow

1. Create a new workflow named `GetTask`
2. This workflow will handle requests like `GET /workflows/tasks/1`
{% endstep %}

{% step %}
#### Create Variables

| Name      | Type             | Storage           |
| --------- | ---------------- | ----------------- |
| RouteData | ObjectDictionary | Workflow Instance |
| TaskId    | string           | Workflow Instance |
| Task      | Object           | Workflow Instance |
{% endstep %}

{% step %}
#### Configure HTTP Endpoint

{% tabs %}
{% tab title="Input" %}
| Property          | Value        | Syntax  |
| ----------------- | ------------ | ------- |
| Path              | `tasks/{id}` | Default |
| Supported Methods | `GET`        | Default |
{% endtab %}

{% tab title="Output" %}
| Property   | Value     |
| ---------- | --------- |
| Route Data | RouteData |
{% endtab %}

{% tab title="Common" %}
| Property         | Value   |
| ---------------- | ------- |
| Trigger Workflow | Checked |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Extract Task ID

Add a Set Variable activity:

{% tabs %}
{% tab title="Input" %}
| Property | Value                          | Syntax  |
| -------- | ------------------------------ | ------- |
| Variable | `TaskId`                       | Default |
| Value    | `{{ Variables.RouteData.id }}` | Liquid  |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Find Task

Add another Set Variable activity with branching logic:

{% tabs %}
{% tab title="Input" %}
| Property | Value          | Syntax  |
| -------- | -------------- | ------- |
| Variable | `Task`         | Default |
| Value    | See code below | C#      |
{% endtab %}
{% endtabs %}

C# Expression:

```csharp
var tasks = new[]
{
    new { Id = 1, Title = "Complete documentation", Status = "active", Priority = "high", Description = "Write comprehensive HTTP workflows tutorial" },
    new { Id = 2, Title = "Review pull requests", Status = "active", Priority = "medium", Description = "Review and merge pending PRs" },
    new { Id = 3, Title = "Update dependencies", Status = "completed", Priority = "low", Description = "Update NuGet packages" }
};

var taskId = int.Parse(Variables.TaskId);
return tasks.FirstOrDefault(t => t.Id == taskId);
```
{% endstep %}

{% step %}
#### Add Conditional Response

Add a **Decision** activity to check if the task was found:

{% tabs %}
{% tab title="Input" %}
| Property  | Value                    | Syntax |
| --------- | ------------------------ | ------ |
| Condition | `Variables.Task != null` | C#     |
{% endtab %}
{% endtabs %}

Connect two Write HTTP Response activities to the Decision outcomes:

**For "True" outcome (Task Found):**

{% tabs %}
{% tab title="Input" %}
| Property     | Value              | Syntax     |
| ------------ | ------------------ | ---------- |
| Status Code  | `OK`               | Default    |
| Content      | `Variables.Task`   | JavaScript |
| Content Type | `application/json` | Default    |
{% endtab %}
{% endtabs %}

**For "False" outcome (Task Not Found):**

{% tabs %}
{% tab title="Input" %}
| Property     | Value                                                           | Syntax  |
| ------------ | --------------------------------------------------------------- | ------- |
| Status Code  | `NotFound`                                                      | Default |
| Content      | `{"error": "Task not found", "taskId": "{{Variables.TaskId}}"}` | Liquid  |
| Content Type | `application/json`                                              | Default |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Test the Workflow

Test with different task IDs:

* `GET https://localhost:5001/workflows/tasks/1` - Returns task details (200 OK)
* `GET https://localhost:5001/workflows/tasks/999` - Returns error message (404 Not Found)
{% endstep %}
{% endstepper %}

## Part 3: Creating a POST Endpoint for Creating Resources

Let's create a workflow that handles POST requests to create new tasks.

{% stepper %}
{% step %}
#### Create the Create Task Workflow

Create a new workflow named `CreateTask`
{% endstep %}

{% step %}
#### Create Variables

| Name             | Type   | Storage           |
| ---------------- | ------ | ----------------- |
| RequestBody      | Object | Workflow Instance |
| NewTask          | Object | Workflow Instance |
| ValidationErrors | Object | Workflow Instance |
{% endstep %}

{% step %}
#### Configure HTTP Endpoint

{% tabs %}
{% tab title="Input" %}
| Property          | Value   | Syntax  |
| ----------------- | ------- | ------- |
| Path              | `tasks` | Default |
| Supported Methods | `POST`  | Default |
{% endtab %}

{% tab title="Output" %}
| Property       | Value       |
| -------------- | ----------- |
| Parsed Content | RequestBody |
{% endtab %}

{% tab title="Common" %}
| Property         | Value   |
| ---------------- | ------- |
| Trigger Workflow | Checked |
{% endtab %}
{% endtabs %}

The HTTP Endpoint automatically parses JSON request bodies into the `Parsed Content` output.
{% endstep %}

{% step %}
#### Validate Request Body

Add a Set Variable activity to validate the input:

{% tabs %}
{% tab title="Input" %}
| Property | Value              | Syntax  |
| -------- | ------------------ | ------- |
| Variable | `ValidationErrors` | Default |
| Value    | See code below     | C#      |
{% endtab %}
{% endtabs %}

C# Expression:

```csharp
var errors = new List<string>();
var body = (dynamic)Variables.RequestBody;

if (body == null)
{
    errors.Add("Request body is required");
    return new { Errors = errors };
}

if (string.IsNullOrWhiteSpace(body.Title?.ToString()))
    errors.Add("Title is required");

if (string.IsNullOrWhiteSpace(body.Status?.ToString()))
    errors.Add("Status is required");
else
{
    var validStatuses = new[] { "active", "pending", "completed" };
    if (!validStatuses.Contains(body.Status.ToString().ToLower()))
        errors.Add("Status must be one of: active, pending, completed");
}

return errors.Any() ? new { Errors = errors } : null;
```
{% endstep %}

{% step %}
#### Add Validation Decision

Add a **Decision** activity:

{% tabs %}
{% tab title="Input" %}
| Property  | Value                                | Syntax |
| --------- | ------------------------------------ | ------ |
| Condition | `Variables.ValidationErrors == null` | C#     |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Create Task (Valid Input)

For the "True" outcome, add a Set Variable activity:

{% tabs %}
{% tab title="Input" %}
| Property | Value          | Syntax  |
| -------- | -------------- | ------- |
| Variable | `NewTask`      | Default |
| Value    | See code below | C#      |
{% endtab %}
{% endtabs %}

C# Expression:

```csharp
var body = (dynamic)Variables.RequestBody;

// For demonstration: simple sequential ID
// In production, use:
// - Database auto-increment IDs for sequential IDs
// - Guid.NewGuid() for globally unique identifiers  
// - Snowflake IDs for distributed systems
// - ID generation service for complex requirements
var demoId = DateTime.UtcNow.Ticks % 100000; // Demo: timestamp-based ID

return new
{
    Id = (int)demoId,
    Title = body.Title.ToString(),
    Status = body.Status.ToString().ToLower(),
    Priority = body.Priority?.ToString()?.ToLower() ?? "medium",
    Description = body.Description?.ToString() ?? "",
    CreatedAt = DateTime.UtcNow,
    UpdatedAt = DateTime.UtcNow
};
```

Then add a Write HTTP Response activity:

{% tabs %}
{% tab title="Input" %}
| Property     | Value               | Syntax     |
| ------------ | ------------------- | ---------- |
| Status Code  | `Created`           | Default    |
| Content      | `Variables.NewTask` | JavaScript |
| Content Type | `application/json`  | Default    |
{% endtab %}

{% tab title="Headers" %}
Add a custom header:

* **Name**: `Location`
* **Value**: `/workflows/tasks/{{Variables.NewTask.Id}}` (Liquid)

{% hint style="info" %}
**Location Header**

In production, build the full URL dynamically using the request's base URL. The relative path shown here works for most scenarios and avoids hardcoding domain names.
{% endhint %}
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Return Validation Errors (Invalid Input)

For the "False" outcome, add a Write HTTP Response activity:

{% tabs %}
{% tab title="Input" %}
| Property     | Value                        | Syntax     |
| ------------ | ---------------------------- | ---------- |
| Status Code  | `BadRequest`                 | Default    |
| Content      | `Variables.ValidationErrors` | JavaScript |
| Content Type | `application/json`           | Default    |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Test the Workflow

Test with valid data:

```bash
curl -X POST https://localhost:5001/workflows/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "status": "active",
    "priority": "high",
    "description": "Task description"
  }'
```

Test with invalid data:

```bash
curl -X POST https://localhost:5001/workflows/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "status": "invalid"
  }'
```
{% endstep %}
{% endstepper %}

## Part 4: Creating a PUT Endpoint for Updates

Let's create a workflow that handles PUT requests to update existing tasks.

{% stepper %}
{% step %}
#### Create the Update Task Workflow

Create a new workflow named `UpdateTask`
{% endstep %}

{% step %}
#### Create Variables

| Name         | Type             | Storage           |
| ------------ | ---------------- | ----------------- |
| RouteData    | ObjectDictionary | Workflow Instance |
| RequestBody  | Object           | Workflow Instance |
| TaskId       | string           | Workflow Instance |
| ExistingTask | Object           | Workflow Instance |
| UpdatedTask  | Object           | Workflow Instance |
{% endstep %}

{% step %}
#### Configure HTTP Endpoint

{% tabs %}
{% tab title="Input" %}
| Property          | Value        | Syntax  |
| ----------------- | ------------ | ------- |
| Path              | `tasks/{id}` | Default |
| Supported Methods | `PUT`        | Default |
{% endtab %}

{% tab title="Output" %}
| Property       | Value       |
| -------------- | ----------- |
| Route Data     | RouteData   |
| Parsed Content | RequestBody |
{% endtab %}

{% tab title="Common" %}
| Property         | Value   |
| ---------------- | ------- |
| Trigger Workflow | Checked |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Extract Task ID

Add a Set Variable activity:

{% tabs %}
{% tab title="Input" %}
| Property | Value                          | Syntax  |
| -------- | ------------------------------ | ------- |
| Variable | `TaskId`                       | Default |
| Value    | `{{ Variables.RouteData.id }}` | Liquid  |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Find Existing Task

Add a Set Variable activity:

{% tabs %}
{% tab title="Input" %}
| Property | Value          | Syntax  |
| -------- | -------------- | ------- |
| Variable | `ExistingTask` | Default |
| Value    | See code below | C#      |
{% endtab %}
{% endtabs %}

C# Expression:

```csharp
var tasks = new[]
{
    new { Id = 1, Title = "Complete documentation", Status = "active", Priority = "high", CreatedAt = DateTime.UtcNow.AddDays(-5) },
    new { Id = 2, Title = "Review pull requests", Status = "active", Priority = "medium", CreatedAt = DateTime.UtcNow.AddDays(-3) }
};

var taskId = int.Parse(Variables.TaskId);
return tasks.FirstOrDefault(t => t.Id == taskId);
```
{% endstep %}

{% step %}
#### Add Decision for Task Existence

Add a **Decision** activity:

{% tabs %}
{% tab title="Input" %}
| Property  | Value                            | Syntax |
| --------- | -------------------------------- | ------ |
| Condition | `Variables.ExistingTask != null` | C#     |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Update Task (If Found)

For the "True" outcome, add a Set Variable activity:

{% tabs %}
{% tab title="Input" %}
| Property | Value          | Syntax  |
| -------- | -------------- | ------- |
| Variable | `UpdatedTask`  | Default |
| Value    | See code below | C#      |
{% endtab %}
{% endtabs %}

C# Expression:

```csharp
var existing = (dynamic)Variables.ExistingTask;
var updates = (dynamic)Variables.RequestBody;

return new
{
    Id = existing.Id,
    Title = updates.Title?.ToString() ?? existing.Title.ToString(),
    Status = updates.Status?.ToString()?.ToLower() ?? existing.Status.ToString(),
    Priority = updates.Priority?.ToString()?.ToLower() ?? existing.Priority.ToString(),
    Description = updates.Description?.ToString() ?? "",
    CreatedAt = existing.CreatedAt,
    UpdatedAt = DateTime.UtcNow
};
```

Then add a Write HTTP Response activity:

{% tabs %}
{% tab title="Input" %}
| Property     | Value                   | Syntax     |
| ------------ | ----------------------- | ---------- |
| Status Code  | `OK`                    | Default    |
| Content      | `Variables.UpdatedTask` | JavaScript |
| Content Type | `application/json`      | Default    |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Return Not Found (If Task Doesn't Exist)

For the "False" outcome, add a Write HTTP Response activity:

{% tabs %}
{% tab title="Input" %}
| Property     | Value                                                           | Syntax  |
| ------------ | --------------------------------------------------------------- | ------- |
| Status Code  | `NotFound`                                                      | Default |
| Content      | `{"error": "Task not found", "taskId": "{{Variables.TaskId}}"}` | Liquid  |
| Content Type | `application/json`                                              | Default |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Test the Workflow

Test updating an existing task:

```bash
curl -X PUT https://localhost:5001/workflows/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task Title",
    "status": "completed"
  }'
```

Test updating a non-existent task:

```bash
curl -X PUT https://localhost:5001/workflows/tasks/999 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task"
  }'
```
{% endstep %}
{% endstepper %}

## Part 5: Creating a DELETE Endpoint

Let's complete our CRUD operations with a DELETE endpoint.

{% stepper %}
{% step %}
#### Create the Delete Task Workflow

Create a new workflow named `DeleteTask`
{% endstep %}

{% step %}
#### Create Variables

| Name       | Type             | Storage           |
| ---------- | ---------------- | ----------------- |
| RouteData  | ObjectDictionary | Workflow Instance |
| TaskId     | string           | Workflow Instance |
| TaskExists | bool             | Workflow Instance |
{% endstep %}

{% step %}
#### Configure HTTP Endpoint

{% tabs %}
{% tab title="Input" %}
| Property          | Value        | Syntax  |
| ----------------- | ------------ | ------- |
| Path              | `tasks/{id}` | Default |
| Supported Methods | `DELETE`     | Default |
{% endtab %}

{% tab title="Output" %}
| Property   | Value     |
| ---------- | --------- |
| Route Data | RouteData |
{% endtab %}

{% tab title="Common" %}
| Property         | Value   |
| ---------------- | ------- |
| Trigger Workflow | Checked |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Extract and Validate Task ID

Add a Set Variable activity to extract the ID:

{% tabs %}
{% tab title="Input" %}
| Property | Value                          | Syntax  |
| -------- | ------------------------------ | ------- |
| Variable | `TaskId`                       | Default |
| Value    | `{{ Variables.RouteData.id }}` | Liquid  |
{% endtab %}
{% endtabs %}

Then add another Set Variable activity to check if task exists:

{% tabs %}
{% tab title="Input" %}
| Property | Value          | Syntax  |
| -------- | -------------- | ------- |
| Variable | `TaskExists`   | Default |
| Value    | See code below | C#      |
{% endtab %}
{% endtabs %}

C# Expression:

```csharp
var existingTaskIds = new[] { 1, 2, 3, 4, 5 };
var taskId = int.Parse(Variables.TaskId);
return existingTaskIds.Contains(taskId);
```
{% endstep %}

{% step %}
#### Add Decision

Add a **Decision** activity:

{% tabs %}
{% tab title="Input" %}
| Property  | Value                  | Syntax |
| --------- | ---------------------- | ------ |
| Condition | `Variables.TaskExists` | C#     |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Return Success (If Deleted)

For the "True" outcome, add a Write HTTP Response activity:

{% tabs %}
{% tab title="Input" %}
| Property    | Value       | Syntax  |
| ----------- | ----------- | ------- |
| Status Code | `NoContent` | Default |
{% endtab %}
{% endtabs %}

{% hint style="info" %}
**HTTP 204 No Content**

The 204 status code indicates successful deletion without returning any content in the response body. This is the standard practice for DELETE operations.
{% endhint %}
{% endstep %}

{% step %}
#### Return Not Found (If Task Doesn't Exist)

For the "False" outcome, add a Write HTTP Response activity:

{% tabs %}
{% tab title="Input" %}
| Property     | Value                                                           | Syntax  |
| ------------ | --------------------------------------------------------------- | ------- |
| Status Code  | `NotFound`                                                      | Default |
| Content      | `{"error": "Task not found", "taskId": "{{Variables.TaskId}}"}` | Liquid  |
| Content Type | `application/json`                                              | Default |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Test the Workflow

Test deleting an existing task:

```bash
curl -X DELETE https://localhost:5001/workflows/tasks/1
```

Test deleting a non-existent task:

```bash
curl -X DELETE https://localhost:5001/workflows/tasks/999
```
{% endstep %}
{% endstepper %}

## Part 6: Working with Headers

Learn how to read and set HTTP headers in your workflows.

### Reading Request Headers

To access request headers, use the HTTP Endpoint activity's **Headers** output:

{% stepper %}
{% step %}
#### Create Variables

| Name      | Type             | Storage           |
| --------- | ---------------- | ----------------- |
| Headers   | ObjectDictionary | Workflow Instance |
| AuthToken | string           | Workflow Instance |
| UserAgent | string           | Workflow Instance |
{% endstep %}

{% step %}
#### Configure HTTP Endpoint

{% tabs %}
{% tab title="Output" %}
| Property | Value   |
| -------- | ------- |
| Headers  | Headers |
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Extract Header Values

Add Set Variable activities to extract specific headers:

**For Authorization Header:**

{% tabs %}
{% tab title="Input" %}
| Property | Value                                                          | Syntax  |
| -------- | -------------------------------------------------------------- | ------- |
| Variable | `AuthToken`                                                    | Default |
| Value    | `{{ Variables.Headers.Authorization ?? "No token provided" }}` | Liquid  |
{% endtab %}
{% endtabs %}

**For User-Agent Header:**

{% tabs %}
{% tab title="Input" %}
| Property | Value                                                | Syntax  |
| -------- | ---------------------------------------------------- | ------- |
| Variable | `UserAgent`                                          | Default |
| Value    | `{{ Variables.Headers["User-Agent"] ?? "Unknown" }}` | Liquid  |
{% endtab %}
{% endtabs %}
{% endstep %}
{% endstepper %}

### Setting Response Headers

To set custom response headers, configure the Write HTTP Response activity:

{% tabs %}
{% tab title="Headers" %}
Add custom headers:

| Name            | Value                                 | Syntax                         |
| --------------- | ------------------------------------- | ------------------------------ |
| X-Request-Id    | `{{guid()}}`                          | Liquid                         |
| X-Response-Time | \`\{{now                              | date: "%Y-%m-%d %H:%M:%S"\}}\` |
| Cache-Control   | `no-cache, no-store, must-revalidate` | Default                        |
| X-Api-Version   | `v3`                                  | Default                        |
{% endtab %}
{% endtabs %}

## Part 7: Error Handling Strategies

Implement robust error handling to make your workflows production-ready.

### Pattern 1: Try-Catch with Fault Activity

Create a workflow that handles exceptions gracefully:

{% stepper %}
{% step %}
#### Use Fault Activity

Wrap risky operations in a **Fault** activity to catch exceptions:

1. Add a **Fault** activity
2. Inside the Fault activity, add activities that might fail (e.g., HTTP Request to external API)
3. Connect the **Faulted** outcome to error handling logic
{% endstep %}

{% step %}
#### Handle Fault

Create a Set Variable activity to process the error:

{% tabs %}
{% tab title="Input" %}
| Property | Value           | Syntax  |
| -------- | --------------- | ------- |
| Variable | `ErrorResponse` | Default |
| Value    | See code below  | C#      |
{% endtab %}
{% endtabs %}

C# Expression:

```csharp
return new
{
    Error = "An error occurred while processing your request",
    Timestamp = DateTime.UtcNow,
    RequestId = Guid.NewGuid().ToString()
};
```
{% endstep %}

{% step %}
#### Return Error Response

Add a Write HTTP Response activity:

{% tabs %}
{% tab title="Input" %}
| Property     | Value                     | Syntax     |
| ------------ | ------------------------- | ---------- |
| Status Code  | `InternalServerError`     | Default    |
| Content      | `Variables.ErrorResponse` | JavaScript |
| Content Type | `application/json`        | Default    |
{% endtab %}
{% endtabs %}
{% endstep %}
{% endstepper %}

### Pattern 2: Validation and Early Returns

Validate input early and return appropriate error responses:

```csharp
// Validation example
var body = (dynamic)Variables.RequestBody;
var errors = new List<object>();

// Check required fields
if (string.IsNullOrWhiteSpace(body?.Title?.ToString()))
    errors.Add(new { Field = "title", Message = "Title is required" });

// Check field formats
if (body?.Email != null)
{
    var email = body.Email.ToString();
    if (!email.Contains("@"))
        errors.Add(new { Field = "email", Message = "Invalid email format" });
}

// Check field lengths
if (body?.Title?.ToString()?.Length > 100)
    errors.Add(new { Field = "title", Message = "Title must be 100 characters or less" });

return errors.Any() ? new { ValidationErrors = errors } : null;
```

### Pattern 3: Custom Error Status Codes

Use appropriate HTTP status codes for different error scenarios:

| Status Code               | Use Case                          | Example                                  |
| ------------------------- | --------------------------------- | ---------------------------------------- |
| 400 Bad Request           | Invalid input data                | Missing required fields, invalid format  |
| 401 Unauthorized          | Missing or invalid authentication | No auth token provided                   |
| 403 Forbidden             | Insufficient permissions          | User not allowed to perform action       |
| 404 Not Found             | Resource doesn't exist            | Task ID not found                        |
| 409 Conflict              | Resource state conflict           | Task already exists                      |
| 422 Unprocessable Entity  | Semantic validation errors        | Valid format but business rule violation |
| 429 Too Many Requests     | Rate limit exceeded               | Too many API calls                       |
| 500 Internal Server Error | Unexpected server errors          | Database connection failure              |
| 503 Service Unavailable   | Temporary service issues          | Downstream service unavailable           |

## Part 8: Advanced Request/Response Patterns

### Content Negotiation

Handle different content types based on request headers:

{% hint style="info" %}
**Conceptual Example**

The following demonstrates the concept of content negotiation. In a real implementation, you would need to:

* Implement XML/CSV serialization methods based on your needs
* Use libraries like System.Xml.Serialization or CsvHelper
* Configure appropriate Content-Type headers in Write HTTP Response activity
{% endhint %}

```csharp
var headers = Variables.Headers;
var acceptHeader = headers.ContainsKey("Accept") ? headers["Accept"].ToString() : "application/json";

if (acceptHeader.Contains("application/xml"))
{
    // Pseudo-code: XML serialization pattern
    var task = (dynamic)Variables.Task;
    var xml = $@"<?xml version=""1.0"" encoding=""UTF-8""?>
<task>
    <id>{task.Id}</id>
    <title>{task.Title}</title>
    <status>{task.Status}</status>
</task>";
    // In production, use System.Xml.Serialization.XmlSerializer
    // or System.Xml.Linq.XDocument for proper serialization
    return new { ContentType = "application/xml", Body = xml };
}
else if (acceptHeader.Contains("text/csv"))
{
    // Pseudo-code: CSV serialization pattern
    var tasks = (System.Collections.IEnumerable)Variables.Tasks;
    var csv = "Id,Title,Status\n";
    foreach (dynamic task in tasks)
    {
        csv += $"{task.Id},{task.Title},{task.Status}\n";
    }
    // In production, use CsvHelper library for robust CSV generation
    return new { ContentType = "text/csv", Body = csv };
}
else
{
    // Default to JSON (handled automatically by Elsa)
    return new { ContentType = "application/json", Body = Variables.Task };
}
```

### CORS Headers

Enable Cross-Origin Resource Sharing (CORS) for browser-based clients:

{% tabs %}
{% tab title="Response Headers" %}
| Name                         | Value                             |
| ---------------------------- | --------------------------------- |
| Access-Control-Allow-Origin  | `https://yourdomain.com`          |
| Access-Control-Allow-Methods | `GET, POST, PUT, DELETE, OPTIONS` |
| Access-Control-Allow-Headers | `Content-Type, Authorization`     |
| Access-Control-Max-Age       | `3600`                            |
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
**CORS Security**

* Never use `*` for `Access-Control-Allow-Origin` in production, especially with credentials
* Always specify the exact allowed origin domain(s)
* For multiple domains, implement logic to validate and return the requesting origin
* Consider security implications before enabling CORS
{% endhint %}

### Pagination

Implement pagination for list endpoints:

```csharp
var queryData = Variables.QueryData;
var page = queryData.ContainsKey("page") ? int.Parse(queryData["page"].ToString()) : 1;
var pageSize = queryData.ContainsKey("pageSize") ? int.Parse(queryData["pageSize"].ToString()) : 10;

// Limit page size
pageSize = Math.Min(pageSize, 100);

// Replace this with your actual data source:
// - Database query with Skip/Take
// - API call to backend service
// - Workflow variable containing your data collection
var allTasks = new[]
{
    new { Id = 1, Title = "Task 1", Status = "active" },
    new { Id = 2, Title = "Task 2", Status = "pending" },
    new { Id = 3, Title = "Task 3", Status = "completed" },
    // ... more tasks
}.AsQueryable();

var totalCount = allTasks.Count();
var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

var pagedTasks = allTasks
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToList();

return new
{
    Data = pagedTasks,
    Pagination = new
    {
        Page = page,
        PageSize = pageSize,
        TotalCount = totalCount,
        TotalPages = totalPages,
        HasNextPage = page < totalPages,
        HasPreviousPage = page > 1
    }
};
```

### Rate Limiting

Track and limit request rates per client:

{% hint style="warning" %}
**Rate Limiting Considerations**

Rate limiting in production requires careful implementation:

**Infrastructure:**

* Use API Gateway features (Azure API Management, AWS API Gateway, Kong)
* Implement with distributed cache (Redis, Memcached)
* Use ASP.NET Core Rate Limiting middleware
* Leverage CDN/WAF services (Cloudflare, etc.)

**Client Identification:**

* ⚠️ **Avoid IP-based limiting alone**: IPs can be shared (NAT, proxies, mobile networks)
* ✅ **Prefer authenticated identifiers**: User IDs, API keys, OAuth tokens
* ✅ **Validate proxy headers**: Only trust X-Forwarded-For from known proxies
* ✅ **Combine methods**: Use both authentication and IP for better accuracy

The example below demonstrates the concept but requires proper implementation.
{% endhint %}

```csharp
// Conceptual demonstration of rate limiting logic
// In production, implement caching with Redis or similar:
// - IDistributedCache for ASP.NET Core
// - StackExchange.Redis for direct Redis access
// - Built-in ASP.NET Core rate limiting middleware

var clientId = "demo-client"; // Replace with: authenticated user ID, API key, or validated IP
var requestKey = $"rate_limit:{clientId}";
var maxRequests = 100; // per hour
var windowSeconds = 3600;

// Pseudo-code: Implement these with your caching solution
// Example with IDistributedCache:
// var cacheValue = await _cache.GetStringAsync(requestKey);
// var requestCount = string.IsNullOrEmpty(cacheValue) ? 0 : int.Parse(cacheValue);
var requestCount = 0; // Placeholder: retrieve from your cache

if (requestCount >= maxRequests)
{
    return new
    {
        StatusCode = 429,
        Error = "Rate limit exceeded",
        RetryAfter = windowSeconds,
        Limit = maxRequests,
        Remaining = 0
    };
}

// Pseudo-code: Implement cache increment
// Example: await _cache.SetStringAsync(requestKey, (requestCount + 1).ToString(), 
//              new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(windowSeconds) });

return new
{
    StatusCode = 200,
    Limit = maxRequests,
    Remaining = maxRequests - requestCount - 1
};
```

## Part 9: Testing Your HTTP Workflows

### Using Postman

1. **Create a Collection**: Organize all your workflow endpoints
2. **Set Environment Variables**: Configure base URL, auth tokens
3. **Write Tests**: Add test scripts to validate responses

Example Postman test script:

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has correct structure", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('title');
    pm.expect(jsonData.status).to.be.oneOf(['active', 'pending', 'completed']);
});
```

### Using cURL

Test your endpoints from the command line:

```bash
# List all tasks
curl -X GET https://localhost:5001/workflows/tasks

# Get specific task
curl -X GET https://localhost:5001/workflows/tasks/1

# Create task
curl -X POST https://localhost:5001/workflows/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","status":"active"}'

# Update task
curl -X PUT https://localhost:5001/workflows/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","status":"completed"}'

# Delete task
curl -X DELETE https://localhost:5001/workflows/tasks/1

# With custom headers
curl -X GET https://localhost:5001/workflows/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-Request-Id: 12345"

# Verbose output (see headers)
curl -v -X GET https://localhost:5001/workflows/tasks/1
```

### Using HTTP Files (REST Client)

Create a `.http` file for testing (replace `{{baseUrl}}` with your server URL):

```http
@baseUrl = https://localhost:5001

### List all tasks
GET {{baseUrl}}/workflows/tasks

### Get specific task
GET {{baseUrl}}/workflows/tasks/1

### Create task
POST {{baseUrl}}/workflows/tasks
Content-Type: application/json

{
  "title": "New Task",
  "status": "active",
  "priority": "high"
}

### Update task
PUT {{baseUrl}}/workflows/tasks/1
Content-Type: application/json

{
  "title": "Updated Task",
  "status": "completed"
}

### Delete task
DELETE {{baseUrl}}/workflows/tasks/1
```

{% hint style="info" %}
**Environment Variables**

Use variables in `.http` files to easily switch between environments:

* Development: `@baseUrl = https://localhost:5001`
* Staging: `@baseUrl = https://staging.example.com`
* Production: `@baseUrl = https://api.example.com`
{% endhint %}

### Automated Testing with xUnit

Create integration tests for your workflows:

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
        // Act
        var response = await _client.GetAsync("/workflows/tasks/1");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("\"id\":1", content);
    }

    [Fact]
    public async Task GetTask_WithInvalidId_ReturnsNotFound()
    {
        // Act
        var response = await _client.GetAsync("/workflows/tasks/999");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task CreateTask_WithValidData_ReturnsCreated()
    {
        // Arrange
        var task = new { title = "Test Task", status = "active" };
        var content = new StringContent(
            JsonSerializer.Serialize(task),
            Encoding.UTF8,
            "application/json");

        // Act
        var response = await _client.PostAsync("/workflows/tasks", content);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.True(response.Headers.Contains("Location"));
    }
}
```

## Part 10: Debugging and Troubleshooting

### Using Elsa Studio for Debugging

1. **Navigate to Workflow Instances**: View all executions of your workflow
2. **Inspect Activity Execution**: See inputs/outputs for each activity
3. **Check Journal Entries**: View the execution timeline
4. **Review Variables**: Inspect variable values at each step

### Common Issues and Solutions

#### Issue: 404 Not Found

**Problem**: Workflow endpoint not responding

**Solutions**:

* Verify the workflow is **Published**
* Check that "Trigger Workflow" is enabled on HTTP Endpoint
* Ensure the path doesn't conflict with other routes
* Verify Elsa Server is running and configured correctly

#### Issue: Request Body is Null

**Problem**: Cannot read POST/PUT request body

**Solutions**:

* Set `Content-Type: application/json` header
* Ensure JSON is valid
* Use HTTP Endpoint's "Parsed Content" output
* Check that body isn't consumed elsewhere in the pipeline

#### Issue: Headers Not Available

**Problem**: Cannot read request headers

**Solutions**:

* Use HTTP Endpoint's "Headers" output variable
* Check header names are case-insensitive
* Verify headers are sent with the request

#### Issue: CORS Errors

**Problem**: Browser blocks requests from different origin

**Solutions**:

* Add CORS headers to Write HTTP Response activity
* Handle OPTIONS preflight requests
* Configure Elsa Server CORS policy

Example CORS workflow configuration:

**HTTP Endpoint Activity:**

```csharp
// Add support for OPTIONS method for CORS preflight
SupportedMethods = new[] { HttpMethods.Get, HttpMethods.Post, HttpMethods.Options }
```

**Write HTTP Response Activity:**

```csharp
// Always include CORS headers in production (with proper origin validation)
Headers = new Dictionary<string, string>
{
    ["Access-Control-Allow-Origin"] = "https://yourdomain.com",
    ["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS",
    ["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
}
```

### Enabling Detailed Logging

Configure logging in your Elsa Server's `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Elsa": "Debug",
      "Elsa.Workflows": "Debug",
      "Elsa.Http": "Debug"
    }
  }
}
```

## Best Practices

### 1. Use Consistent Response Formats

Always return JSON in a consistent structure:

```json
// Success response
{
  "data": { /* resource */ },
  "timestamp": "2024-01-20T10:30:00Z"
}

// Error response
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-20T10:30:00Z",
  "details": []
}
```

### 2. Validate All Inputs

Never trust client input. Always validate:

* Required fields are present
* Data types are correct
* Values are within expected ranges
* Formats match requirements (email, URL, etc.)

### 3. Use Appropriate HTTP Methods

* **GET**: Retrieve resources (idempotent, no side effects)
* **POST**: Create resources (non-idempotent)
* **PUT**: Update entire resources (idempotent)
* **PATCH**: Partial updates (may be idempotent)
* **DELETE**: Remove resources (idempotent)

### 4. Return Proper Status Codes

Use semantic HTTP status codes to communicate results clearly.

### 5. Implement Security

* Validate authentication tokens
* Implement authorization checks
* Sanitize inputs to prevent injection attacks
* Use HTTPS in production
* Rate limit requests

### 6. Version Your APIs

Include version in the path:

* `/workflows/v1/tasks`
* `/workflows/v2/tasks`

Or use headers:

* `Accept: application/vnd.myapi.v1+json`

### 7. Document Your Endpoints

Provide clear documentation for each endpoint:

* Purpose and description
* Request format and parameters
* Response format and status codes
* Example requests and responses
* Error scenarios

### 8. Handle Timeouts

For long-running operations:

* Return 202 Accepted immediately
* Process asynchronously
* Provide status endpoint to check progress

### 9. Use Workflow Variables Wisely

* Name variables descriptively
* Choose appropriate storage (Workflow Instance vs Activity)
* Clean up large variables when no longer needed

### 10. Monitor and Log

* Log important events
* Track performance metrics
* Monitor error rates
* Set up alerts for critical issues

## Real-World Example: Complete Task API

Here's a complete workflow combining all the patterns we've learned:

### Workflow: Create Task with Full Validation

This workflow demonstrates:

* Request body parsing
* Comprehensive validation
* Authentication check
* Error handling
* Proper response codes
* Header management

**Variables:**

* `Headers` (ObjectDictionary)
* `RequestBody` (Object)
* `AuthToken` (string)
* `ValidationResult` (Object)
* `NewTask` (Object)
* `IsAuthenticated` (bool)

**Activities Flow:**

1. **HTTP Endpoint** (POST `/workflows/tasks`)
   * Outputs: Headers, RequestBody
2. **Extract Auth Token**
   * `AuthToken = Headers.Authorization`
3. **Validate Authentication**
   * Check if token is valid
   * Branch: Authenticated / Unauthorized
4. **Validate Request Body** (if authenticated)
   * Check required fields
   * Validate formats
   * Check business rules
5. **Decision: Valid Input?**
   * True: Create task
   * False: Return validation errors
6. **Create Task** (if valid)
   * Generate ID
   * Set timestamps
   * Prepare response
7. **Return Response**
   * 201 Created: With Location header
   * 400 Bad Request: With validation errors
   * 401 Unauthorized: If auth fails

## Summary

Congratulations! You've completed the comprehensive HTTP Workflows tutorial. You now know how to:

* ✅ Create RESTful endpoints for all HTTP methods (GET, POST, PUT, DELETE)
* ✅ Handle route parameters and query strings
* ✅ Parse and validate request bodies
* ✅ Read and set HTTP headers
* ✅ Implement proper error handling
* ✅ Return appropriate HTTP status codes
* ✅ Test workflows using various tools
* ✅ Debug and troubleshoot issues
* ✅ Apply best practices for production-ready APIs

### Next Steps

Now that you've mastered HTTP workflows, explore these advanced topics:

* [**External Application Interaction**](../external-application-interaction.md): Integrate with external services
* [**Custom Activities**](../../extensibility/custom-activities.md): Create reusable workflow components
* [**Authentication**](../authentication.md): Secure your workflows
* [**Testing & Debugging**](../testing-debugging.md): Advanced debugging techniques
* [**Distributed Hosting**](../../hosting/distributed-hosting.md): Scale your workflows

### Resources

* [Elsa Workflows Documentation](../../)
* [Expression Languages](../../expressions/c.md)
* [Elsa GitHub Repository](https://github.com/elsa-workflows/elsa-core)
* [Community Discord](https://discord.gg/hhChk5H472)

### Feedback

Found an issue or have suggestions for improving this tutorial? Please [open an issue](https://github.com/elsa-workflows/elsa-gitbook/issues) on our GitHub repository.

Happy workflow building! 🚀

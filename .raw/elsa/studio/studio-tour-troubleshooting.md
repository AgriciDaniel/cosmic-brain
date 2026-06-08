# Studio Tour & Troubleshooting Guide

This comprehensive guide provides a complete tour of Elsa Studio's interface, step-by-step workflow creation instructions, debugging techniques, and solutions to common issues.

## Introduction

Elsa Studio is a web-based designer that allows you to visually create, edit, and manage workflows. Whether you're new to Elsa or looking to master the designer, this guide will help you navigate the interface efficiently and troubleshoot common issues.

{% hint style="info" %}
**Note**: This guide includes screenshots of key Elsa Studio features. The exact appearance may vary slightly depending on your version and configuration.
{% endhint %}

### What You'll Learn

- Navigate the Elsa Studio interface
- Create workflows from scratch
- Debug workflow execution
- Troubleshoot common design-time and runtime errors
- Apply best practices for efficient workflow design
- Use keyboard shortcuts to speed up your workflow

## Prerequisites

Before you begin, ensure you have:

- An Elsa Server instance running and accessible
- Elsa Studio connected to your Elsa Server
- Default credentials (username: `admin`, password: `password`) or your configured authentication

## Studio UI Tour

### Dashboard/Home Screen

When you first log into Elsa Studio, you're greeted with the Dashboard. This is your command center for workflow management.

<figure><img src="../.gitbook/assets/run-workflow-using-elsa-studio-1.png" alt="Elsa Studio Interface"><figcaption><p>Elsa Studio workflow designer interface</p></figcaption></figure>

**Key Elements:**

- **Navigation Menu** (Left Sidebar): Access different sections of Studio
  - **Workflows**: Manage workflow definitions
  - **Workflow Instances**: View running and completed workflow executions
  - **Settings**: Configure Studio preferences (in some deployments)
- **Main Content Area**: Displays the currently selected section
- **User Menu** (Top Right): Access user settings and logout

**Quick Actions:**
- Click "Workflows" to view all workflow definitions
- Click "Workflow Instances" to monitor executions
- Use the search bar (if available) to quickly find workflows

### Workflow Definitions List

The Workflows section displays all your workflow definitions. This is where you manage the blueprints of your automation.

**Key Features:**

- **Create Button**: Start a new workflow from scratch
- **Workflow Cards/List**: Each workflow shows:
  - Name and description
  - Version number
  - Publication status (Draft, Published)
  - Last modified date
- **Actions**:
  - **Edit**: Open the workflow in the designer
  - **Duplicate**: Create a copy
  - **Delete**: Remove the workflow (with confirmation)
  - **Publish**: Make the workflow active
  - **Unpublish**: Deactivate the workflow

**Status Indicators:**
- **Draft**: Workflow is being edited, not executable
- **Published**: Workflow is active and can be triggered
- **Latest Version**: Shows the most recent iteration

### Workflow Editor Interface

The workflow editor is the heart of Elsa Studio. This is where you design your automation logic.

<figure><img src="../.gitbook/assets/sample-workflow-hello-world.png" alt="Workflow Editor Canvas"><figcaption><p>Example workflow in the visual designer</p></figcaption></figure>

**Main Areas:**

1. **Toolbar** (Top)
   - **Workflow Name**: Click to rename
   - **Save Button**: Persist your changes (auto-save may be enabled)
   - **Publish Button**: Activate the workflow
   - **Run Button** (▶️): Execute the workflow manually (for workflows without triggers requiring input)
   - **Zoom Controls**: Zoom in/out of the canvas
   - **Layout Options**: Auto-arrange activities

2. **Activity Toolbox** (Left Sidebar)
   - **Search Bar**: Filter activities by name
   - **Categories**: Activities grouped by function
     - Control Flow (If, Switch, ForEach, While)
     - HTTP (HTTP Endpoint, HTTP Request)
     - Data (Set Variable, Object, WriteLine)
     - Timer (Delay, Timer)
     - Console (WriteLine, ReadLine)
   - **Drag & Drop**: Drag activities onto the canvas

3. **Canvas** (Center)
   - **Visual Design Surface**: Where you build your workflow
   - **Activities**: Represented as boxes with:
     - Activity name
     - Activity type
     - Input/output ports
     - Status indicators
   - **Connections**: Lines between activities showing flow
   - **Selection**: Click to select, Ctrl+Click for multiple selection
   - **Pan**: Click and drag on empty space to move the canvas
   - **Zoom**: Use mouse wheel or zoom controls

4. **Properties Panel** (Right Sidebar)
   - **Activity Properties**: When an activity is selected
     - **Common Tab**: Name, description, trigger settings
     - **Input Tab**: Configure activity inputs
     - **Output Tab**: Map outputs to variables
     - **Advanced Tab**: Additional settings
   - **Expression Editor**: Write C#, JavaScript, Liquid, or Python expressions
   - **Syntax Selector**: Choose expression language

5. **Variables Panel** (Bottom or Sidebar)
   - **Create Variable**: Add new workflow or activity-scoped variables
   - **Variable List**: Shows name, type, and storage location
   - **Edit/Delete**: Manage existing variables

### Activity Picker and Toolbox

The Activity Picker helps you find and add activities to your workflow.

**Using the Activity Picker:**

1. **Browse Categories**: Click a category to expand
2. **Search**: Type to filter activities (e.g., "HTTP", "timer", "loop")
3. **Activity Info**: Hover over an activity to see description
4. **Add to Canvas**: 
   - Drag and drop onto canvas
   - Double-click to add at canvas center
   - Click and place on canvas

**Popular Activities:**

- **HTTP Endpoint**: Trigger workflow via HTTP request
- **Set Variable**: Store and manipulate data
- **If**: Conditional branching
- **ForEach**: Loop over collections
- **HTTP Request**: Call external APIs
- **WriteLine**: Log output (useful for debugging)
- **Delay**: Pause workflow execution

### Properties Panel

The Properties Panel is context-sensitive and changes based on the selected activity.

**Tabs and Sections:**

1. **Common Properties**
   - **Name**: Human-readable identifier
   - **Description**: Document the activity's purpose
   - **Trigger Workflow**: Check if this activity can start the workflow
   - **Run Asynchronously**: Execute without blocking

2. **Input Properties**
   - Activity-specific inputs
   - **Syntax Selector**: Choose expression type
     - **Literal/Default**: Plain text or simple values
     - **JavaScript**: Dynamic JavaScript expressions
     - **C#**: Full C# expressions with IntelliSense
     - **Liquid**: Template-based expressions
     - **Python**: Python expressions
   - **Expression Editor**: Multi-line code editor with syntax highlighting

3. **Output Properties**
   - Map activity outputs to variables
   - Choose storage location (Workflow Instance, Memory, Input)

4. **Advanced Properties**
   - Storage driver options
   - Custom settings

**Expression Examples:**

```javascript
// JavaScript
variables.OrderTotal > 1000

// C#
Variables.Items.Count() > 10

// Liquid
{{ Variables.UserName | upcase }}
```

### Variables Management

Variables store data throughout workflow execution.

**Creating Variables:**

1. Click **"Variables"** panel
2. Click **"Add Variable"**
3. Configure:
   - **Name**: Variable identifier (e.g., `UserId`, `OrderTotal`)
   - **Type**: Data type (String, Int32, Boolean, Object, etc.)
   - **Storage**: Where to store the variable
     - **Workflow Instance**: Persisted across workflow execution
     - **Memory**: Temporary, lost if workflow is suspended
     - **Input**: Passed as input to the workflow
   - **Default Value**: Optional initial value

**Variable Scopes:**

- **Workflow-level**: Accessible by all activities
- **Activity-level**: Some activities create local variables (e.g., ForEach)

**Accessing Variables:**

- **JavaScript**: `variables.VariableName`
- **C#**: `Variables.VariableName`
- **Liquid**: `{{ Variables.VariableName }}`

### Workflow Instances View

Monitor and manage workflow executions.

**Key Information:**

- **Instance ID**: Unique identifier
- **Workflow Name**: Which definition was executed
- **Status**:
  - **Running**: Currently executing
  - **Finished**: Completed successfully
  - **Faulted**: Error occurred
  - **Suspended**: Waiting for external event or bookmark
  - **Cancelled**: Manually stopped
- **Started**: Execution start time
- **Finished**: Completion time
- **Correlation ID**: Link related workflow executions

**Instance Actions:**

- **View Details**: See execution journal and activity states
- **Cancel**: Stop a running workflow
- **Retry**: Re-execute a faulted workflow
- **Delete**: Remove instance data

**Execution Journal:**

The execution journal shows the step-by-step execution history:
- Activities executed in order
- Timestamps for each activity
- Input/output values
- Errors and exceptions
- Branching decisions

### Settings and Configuration

Access global Studio settings (availability depends on your deployment).

**Common Settings:**

- **Server Connection**: Configure Elsa Server URL
- **Theme**: Light/dark mode
- **Language**: Localization preferences
- **Auto-save**: Enable/disable automatic saving
- **Grid Settings**: Canvas snap-to-grid

## Creating Your First Workflow

Let's create a simple workflow step-by-step.

### Step 1: Create a New Workflow

1. Navigate to **Workflows** from the left menu
2. Click **"Create Workflow"** button
3. Enter workflow details:
   - **Name**: "Hello World"
   - **Description**: "My first Elsa workflow"
4. Click **"Create"**

### Step 2: Add Activities

1. **Add a WriteLine Activity**:
   - Find "WriteLine" in the Activity Toolbox (under Console or Diagnostics)
   - Drag it onto the canvas
   - Click the activity to select it

2. **Configure WriteLine**:
   - In the Properties Panel, under **Input** tab:
   - **Text**: Enter `"Hello, Elsa!"` (use Literal syntax)
   - Note: The activity is now configured to log this message

3. **Add a Delay Activity**:
   - Drag "Delay" from toolbox onto canvas
   - Place it to the right of WriteLine

4. **Configure Delay**:
   - Select the Delay activity
   - **Duration**: Enter `00:00:02` (2 seconds) or use C# expression: `TimeSpan.FromSeconds(2)`

5. **Add Another WriteLine**:
   - Drag another WriteLine activity
   - **Text**: `"Workflow completed!"`

### Step 3: Connect Activities

1. Click the **output port** (right side) of the first WriteLine
2. Drag to the **input port** (left side) of the Delay activity
3. Connect Delay to the second WriteLine

Your workflow should show: `WriteLine → Delay → WriteLine`

### Step 4: Save and Publish

1. Click **"Save"** in the toolbar
2. Click **"Publish"** to activate the workflow
3. Confirm publication

### Step 5: Run the Workflow

1. Click the **Run button** (▶️) in the toolbar
2. Watch as the workflow executes
3. Check the **Workflow Instances** to see the execution result

## Debugging Workflow Execution

Debugging is essential for understanding why workflows behave unexpectedly.

### Using the Execution Journal

The execution journal is your primary debugging tool.

**Accessing the Journal:**

1. Go to **Workflow Instances**
2. Find your workflow execution
3. Click to view details
4. Navigate to the **Journal** or **Timeline** tab

**What to Look For:**

- **Activity Sequence**: Verify activities executed in the expected order
- **Activity States**: 
  - ✅ Completed successfully
  - ❌ Faulted (error occurred)
  - ⏸️ Suspended (waiting)
- **Timestamps**: Identify slow activities
- **Input/Output Values**: Check if data is correct
- **Outcomes**: Verify branching logic (e.g., "Done", "200", "404")

**Example Journal Entry:**

```
[2025-11-20 10:30:15] WriteLine (Activity1) - Completed
  Input: Text = "Hello, Elsa!"
  Outcome: Done

[2025-11-20 10:30:15] Delay (Activity2) - Completed
  Input: Duration = 00:00:02
  Outcome: Done

[2025-11-20 10:30:17] WriteLine (Activity3) - Completed
  Input: Text = "Workflow completed!"
  Outcome: Done
```

### Understanding Workflow States

- **Running**: Workflow is actively executing
- **Suspended**: Workflow is waiting for:
  - External event (e.g., HTTP request, timer)
  - User input
  - Bookmark to be resumed
- **Finished**: All activities completed successfully
- **Faulted**: An error occurred, workflow stopped
- **Cancelled**: Manually stopped by user or system

### Common Error Patterns

#### Expression Errors

**Problem**: Expression syntax errors prevent activity execution

**Symptoms:**
- Activity shows error icon
- Journal shows "Expression evaluation failed"
- Workflow enters Faulted state

**Example Error:**
```
Expression evaluation failed: variables.OrderTotal is undefined
```

**Solutions:**
1. **Check Variable Exists**: Ensure variable is created and spelled correctly
2. **Verify Syntax**: Match expression syntax to selected language
   - JavaScript: `variables.OrderTotal`
   - C#: `Variables.OrderTotal`
   - Liquid: `{{ Variables.OrderTotal }}`
3. **Check Variable Initialization**: Make sure variable is set before use
4. **Use WriteLine for Debugging**: Log variable values to verify data

#### Null Reference Errors

**Problem**: Accessing properties of null objects

**Symptoms:**
- "Object reference not set to an instance of an object"
- Activity fails unexpectedly

**Example:**
```csharp
Variables.User.Email  // User is null
```

**Solutions:**
1. **Null Check**: Use conditional logic
   ```csharp
   Variables.User != null ? Variables.User.Email : "No email"
   ```
2. **Safe Navigation** (C#):
   ```csharp
   Variables.User?.Email ?? "No email"
   ```
3. **Default Values**: Initialize variables with default values

#### Connection Errors

**Problem**: Activities not properly connected

**Symptoms:**
- Workflow stops after first activity
- Some activities never execute

**Solutions:**
1. **Check Connections**: Ensure all activities are connected
2. **Verify Outcomes**: Connect to correct outcome port (e.g., "Done", "True", "False")
3. **Visual Inspection**: Follow the flow from start to end

#### HTTP Activity Errors

**Problem**: HTTP Request activities fail

**Common Errors:**

1. **404 Not Found**
   - URL is incorrect
   - Solution: Verify URL, check for typos

2. **401 Unauthorized**
   - Missing or invalid authentication
   - Solution: Add headers with authorization token

3. **Timeout**
   - Server not responding
   - Solution: Increase timeout, check server availability

4. **SSL/TLS Errors**
   - Certificate validation failed
   - Solution: Check server certificate, consider bypassing validation (dev only)

**Example HTTP Request Configuration:**

**URL (C#):**
```csharp
return $"https://api.example.com/users/{Variables.UserId}";
```

**Headers (JavaScript):**
```javascript
{
  "Authorization": `Bearer ${variables.ApiToken}`,
  "Content-Type": "application/json"
}
```

### Debugging Techniques

#### 1. Use WriteLine Liberally

Add WriteLine activities to log variable values:

```javascript
// Log variable value
`UserId: ${variables.UserId}, Total: ${variables.OrderTotal}`
```

#### 2. Check Variable Values in Journal

The execution journal shows input/output values for each activity.

#### 3. Test Expressions Independently

Use a Set Variable activity to test complex expressions:

```csharp
// Test this expression
Variables.Orders.Where(x => x.Total > 1000).Count()
```

#### 4. Simplify Complex Workflows

- Comment out activities temporarily
- Test one path at a time
- Gradually add complexity

#### 5. Use Conditional Breakpoints

Add If activities with logging to trace execution:

```javascript
// Condition
variables.Debug === true

// Log in True branch
`Debug: At checkpoint 1, UserId = ${variables.UserId}`
```

## Troubleshooting Guide

### Design-Time Errors

#### Cannot Save Workflow

**Symptoms:**
- Save button doesn't work
- Error message appears

**Common Causes:**
1. **Validation Errors**: Activities have invalid configurations
2. **Disconnected Activities**: Orphaned activities on canvas
3. **Circular Dependencies**: Activities reference each other cyclically

**Solutions:**
1. **Check Activity Validation**: Look for red indicators on activities
2. **Review Connections**: Ensure all activities are properly connected
3. **Remove Unused Activities**: Delete orphaned activities
4. **Simplify**: Break complex workflows into smaller workflows

#### Activity Configuration Issues

**Symptoms:**
- Activity shows error icon
- Cannot publish workflow

**Common Issues:**

1. **Missing Required Fields**
   - Solution: Fill in all required input fields

2. **Invalid Expression Syntax**
   - Solution: Test expressions in a simple Set Variable activity first

3. **Type Mismatch**
   - Solution: Ensure variable types match expected inputs
   - Example: Don't pass a string to an integer field

#### Variables Not Appearing

**Symptoms:**
- Variable not in dropdown
- Expression can't access variable

**Solutions:**
1. **Check Scope**: Ensure variable is created at workflow level
2. **Refresh**: Save and reload the workflow
3. **Case Sensitivity**: Match exact variable name (case-sensitive in some contexts)
4. **Create Explicitly**: Use Variables panel to create variables

### Runtime Failures

#### Workflow Doesn't Start

**Symptoms:**
- Trigger doesn't fire
- No instance created

**Common Causes:**

1. **Workflow Not Published**
   - Solution: Publish the workflow

2. **Trigger Activity Not Configured**
   - Solution: Check "Trigger Workflow" in activity's Common properties

3. **HTTP Endpoint Path Conflict**
   - Solution: Ensure path is unique across workflows

4. **Server Not Running**
   - Solution: Verify Elsa Server is running and accessible

#### Workflow Gets Stuck in Running State

**Symptoms:**
- Workflow shows "Running" indefinitely
- Never completes or suspends

**Common Causes:**

1. **Infinite Loop**
   - While or ForEach without exit condition
   - Solution: Add proper exit conditions

2. **Blocking Activity Without Timeout**
   - HTTP Request hanging
   - Solution: Set timeout values

3. **Deadlock**
   - Circular bookmark dependencies
   - Solution: Review workflow logic, simplify

**Debugging Steps:**
1. Check execution journal to see last completed activity
2. Review activity after last completed one
3. Add timeout configurations
4. Cancel and redesign problematic section

#### Workflow Fails Silently

**Symptoms:**
- Workflow finishes but doesn't produce expected results
- No errors shown

**Common Causes:**

1. **Exception Swallowed**
   - Try-catch blocks without logging
   - Solution: Add error logging

2. **Wrong Branch Taken**
   - Conditional logic error
   - Solution: Add WriteLine to log which branch executes

3. **Variable Not Updated**
   - Expression doesn't modify variable as expected
   - Solution: Log variable values before and after

#### Data Loss in Variables

**Symptoms:**
- Variable values disappear
- Variables reset unexpectedly

**Common Causes:**

1. **Wrong Storage Location**
   - Using "Memory" storage for long-running workflows
   - Solution: Use "Workflow Instance" storage

2. **Variable Scope Issues**
   - Activity-scoped variable not accessible
   - Solution: Use workflow-level variables

3. **Overwriting Variables**
   - Multiple Set Variable activities with same variable
   - Solution: Review all assignments to the variable

### Performance Issues

#### Slow Workflow Execution

**Symptoms:**
- Workflows take longer than expected
- Timeouts occur

**Common Causes:**

1. **Expensive Operations in Loops**
   - API calls inside ForEach
   - Solution: Batch operations, use parallel processing

2. **Large Data Sets**
   - Processing thousands of records
   - Solution: Implement pagination, chunking

3. **Synchronous HTTP Requests**
   - Waiting for multiple API calls sequentially
   - Solution: Use parallel HTTP activities or bulk operations

4. **No Indexes on Database**
   - Slow database queries
   - Solution: Optimize database schema

**Optimization Tips:**

1. **Use Bulk Operations**
   ```csharp
   // Instead of loop with API calls
   // Use single bulk API call
   ```

2. **Parallel Execution**
   - Use ParallelForEach for independent operations

3. **Cache Results**
   - Store frequently used data in variables

4. **Optimize Expressions**
   - Complex LINQ queries can be slow
   - Pre-filter data before processing

#### High Memory Usage

**Symptoms:**
- Server runs out of memory
- Workflows fail with OutOfMemoryException

**Common Causes:**

1. **Loading Large Objects**
   - Entire file loaded into memory
   - Solution: Stream data instead

2. **Many Long-Running Workflows**
   - Each suspended workflow consumes memory
   - Solution: Configure workflow persistence, use retention policies

3. **Variable Storage**
   - Large objects in Workflow Instance storage
   - Solution: Use external storage for large data

**Solutions:**

1. **Use Streaming**
   - Process files in chunks
   - Don't load entire file into variable

2. **Clean Up Variables**
   - Remove large variables when no longer needed

3. **Configure Retention**
   - Automatically clean up completed workflow instances

4. **Use External Storage**
   - Store large files in blob storage
   - Store references in workflow variables

#### Workflow Instance Database Growth

**Symptoms:**
- Database size grows rapidly
- Queries become slow

**Solutions:**

1. **Configure Retention Policies**
   ```csharp
   // In Elsa Server configuration
   services.AddElsa(elsa => elsa
       .UseRetention(r =>
       {
           r.SweepInterval = TimeSpan.FromDays(1);
           r.AddDeletePolicy("Delete old workflows", _ => new RetentionWorkflowInstanceFilter()
           {
               FinishedBefore = DateTime.UtcNow.AddDays(-30)
           });
       }));
   ```

2. **Disable Activity State Persistence** (when not needed)
   - Use LogPersistenceMode property

3. **Archive Old Instances**
   - Move completed instances to archive storage
   - Keep only recent data in primary database

4. **Regular Cleanup**
   - Schedule maintenance jobs to delete old instances

## Best Practices

### Workflow Design

#### 1. Keep It Simple

- **One Responsibility**: Each workflow should have a single, clear purpose
- **Modular Design**: Break complex workflows into smaller, reusable workflows
- **Use Descriptive Names**: Activities, variables, and workflows should have clear names

**Example:**
```
❌ Bad: "Activity1", "Activity2", "temp"
✅ Good: "FetchUserData", "ValidateOrder", "customerEmail"
```

#### 2. Document Your Workflows

- Add descriptions to workflows
- Use comments in activities (via Description field)
- Document complex expressions

#### 3. Error Handling

- Anticipate failures
- Add error handling branches
- Log errors for debugging
- Provide meaningful error messages

**Example Error Handling:**

```
HTTP Request
├─ 200 OK → Process Response
├─ 404 Not Found → Handle Missing Resource
├─ 500 Server Error → Retry Logic
└─ Timeout → Alert and Fail Gracefully
```

#### 4. Variable Management

- **Naming Convention**: Use camelCase or PascalCase consistently
- **Minimize Scope**: Use activity-scoped variables when possible
- **Appropriate Storage**: Match storage to workflow lifetime
- **Type Safety**: Use specific types instead of Object when possible

#### 5. Testing Strategy

- **Test Each Path**: Verify all conditional branches
- **Test Edge Cases**: Empty data, null values, maximum values
- **Test Error Scenarios**: Simulate failures
- **Use Test Data**: Don't test with production data

### Performance Optimization

#### 1. Avoid Unnecessary Persistence

- Use "Memory" storage for transient data
- Configure LogPersistenceMode to reduce database writes

#### 2. Batch Operations

- Process records in batches instead of one-by-one
- Use bulk APIs when available

#### 3. Caching

- Cache frequently accessed data
- Reuse API responses within workflow

#### 4. Async Operations

- Use asynchronous activities for I/O operations
- Enable parallel execution where appropriate

### Security Best Practices

#### 1. Protect Sensitive Data

- Don't log sensitive information (passwords, tokens)
- Use secure storage for credentials
- Encrypt sensitive variables

#### 2. Validate Inputs

- Always validate external inputs
- Sanitize data to prevent injection attacks
- Check for expected data types

#### 3. Use HTTPS

- Always use HTTPS for HTTP activities
- Validate SSL certificates

#### 4. Implement Authorization

- Check user permissions in workflows
- Don't expose sensitive endpoints without authentication

### Maintainability

#### 1. Version Control

- Use workflow versioning
- Document changes between versions
- Keep old versions for rollback

#### 2. Consistent Style

- Establish team conventions
- Use consistent naming patterns
- Apply same design patterns across workflows

#### 3. Code Reuse

- Create reusable workflows
- Use workflow variables for configuration
- Share common logic via Dispatch Workflow activity

## Tips for Efficient Workflow Design

### Quick Tips

1. **Use Search**: Press `/` to search for activities quickly
2. **Keyboard Shortcuts**: Learn common shortcuts (see below)
3. **Auto-Layout**: Use layout button to organize activities automatically
4. **Duplicate Workflows**: Start from existing workflows when possible
5. **Test Incrementally**: Test after adding each major section
6. **Use Templates**: Create template workflows for common patterns
7. **Version Before Major Changes**: Publish a version before significant modifications

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + S` | Save workflow |
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |
| `Delete` | Delete selected activity |
| `Ctrl + C` | Copy selected activity |
| `Ctrl + V` | Paste activity |
| `Ctrl + A` | Select all activities |
| `Ctrl + F` | Search activities (if available) |
| `+` / `-` | Zoom in/out |
| `Ctrl + 0` | Reset zoom |
| `Space + Drag` | Pan canvas (in some versions) |

*Note: Shortcuts may vary depending on your Elsa Studio version and browser.*

### Common Workflow Patterns

#### 1. Request-Response Pattern

```
HTTP Endpoint → Process Request → HTTP Response
```

**Use Case**: REST API endpoints, webhooks

#### 2. Retry Pattern

```
HTTP Request → Check Status
├─ Success → Continue
└─ Failure → Delay → Retry (loop back)
```

**Use Case**: Resilient API calls

#### 3. Fan-Out/Fan-In Pattern

```
Start → ParallelForEach → Process Items → Join Results
```

**Use Case**: Parallel processing of items

#### 4. Saga Pattern

```
Step 1 → Step 2 → Step 3
  ↓       ↓       ↓
Compensate 1 ← Compensate 2 ← Compensate 3
```

**Use Case**: Distributed transactions with rollback

#### 5. Event Listener Pattern

```
Event Trigger (suspend) → Wait for Event → Resume → Process
```

**Use Case**: Long-running workflows waiting for external events

## Getting Help

### Resources

- **Documentation**: [https://elsa-workflows.github.io/elsa-documentation/](https://elsa-workflows.github.io/elsa-documentation/)
- **GitHub Issues**: [https://github.com/elsa-workflows/elsa-core/issues](https://github.com/elsa-workflows/elsa-core/issues)
- **Community Discussions**: [https://github.com/elsa-workflows/elsa-core/discussions](https://github.com/elsa-workflows/elsa-core/discussions)
- **Stack Overflow**: Tag questions with `elsa-workflows`

### When to Ask for Help

1. After reviewing this troubleshooting guide
2. After checking existing GitHub issues
3. When you have a minimal reproducible example
4. When error messages don't provide clear solutions

### How to Ask for Help

Provide:
1. **Elsa Version**: Server and Studio versions
2. **Environment**: Docker, .NET version, OS
3. **Problem Description**: What you expected vs. what happened
4. **Error Messages**: Full stack traces
5. **Workflow Definition**: Export as JSON (remove sensitive data)
6. **Reproduction Steps**: Minimal steps to reproduce the issue

## Summary

In this guide, you learned:

✅ How to navigate the Elsa Studio interface  
✅ How to create workflows from scratch  
✅ How to debug workflow execution using the execution journal  
✅ Common troubleshooting techniques for design-time and runtime errors  
✅ Best practices for workflow design and performance  
✅ Tips and shortcuts for efficient workflow development  

With this knowledge, you're ready to create robust, maintainable workflows in Elsa Studio. Remember to start simple, test frequently, and build complexity gradually. Happy workflow designing!

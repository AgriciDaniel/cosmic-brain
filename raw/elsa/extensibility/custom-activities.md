---
description: Complete guide to extending Elsa Workflows V3 with custom activities, including inputs/outputs, blocking activities, triggers, dependency injection, and UI hints.
---

# Custom Activities

Elsa Workflows includes a rich library of built-in activities for common tasks, from simple operations like "Set Variable" to complex ones like "Send Email" and "HTTP Request." While these activities cover many scenarios, the true power of Elsa lies in creating custom activities tailored to your specific domain and business requirements.

Custom activities allow you to:
- Encapsulate domain-specific business logic
- Integrate with external systems and APIs
- Create reusable workflow building blocks
- Provide a better experience for workflow designers

This guide covers everything you need to know about creating custom activities in Elsa V3, from basic examples to advanced patterns including blocking activities and triggers.

## Creating Custom Activities <a href="#creating-custom-activities" id="creating-custom-activities"></a>

To create a custom activity, start by defining a new class that implements the `IActivity` interface or inherits from a base class that does. Examples include `Activity` or `CodeActivity`.

A simple example of a custom activity is one that outputs a message to the console:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;

public class PrintMessage : Activity
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        Console.WriteLine("Hello world!");
        await context.CompleteActivityAsync();
    }
}
```

Let's dissect the sample `PrintMessage` activity.

## **Essential Components**﻿

* The `PrintMessage` class inherits from `Elsa.Workflows.Activity`, which implements the `IActivity` interface.
* The core of an activity is the `ExecuteAsync` method. It defines the action the activity performs when executed within a workflow.
* The `ActivityExecutionContext` parameter, named `context` here, provides access to the workflow's execution context. It's a gateway to the workflow's environment, offering methods to interact with the workflow's execution flow, data, and more.

## **Key Operations**﻿

* `ExecuteAsync` is where the main action happens. For example, `Console.WriteLine("Hello world!");` prints a message to the console. In real-world cases, this section would handle core tasks like data processing or connecting to other systems.
* Using `await context.CompleteActivityAsync();` means the activity is done. Completing an activity is key to moving the workflow.

## Activity vs CodeActivity <a href="#activity-vs-code-activity" id="activity-vs-code-activity"></a>

If your custom activity has a simple workflow and ends right after finishing its task, using `CodeActivity` makes things easier. This base class automatically marks the activity as complete once it's done, so you don't need to write any additional completion code.

Let's look at how to redo the `PrintMessage` activity using `CodeActivity` as the base. This highlights that manual completion isn't needed:

```csharp
using Elsa.Workflows;

public class PrintMessage : CodeActivity
{
    protected override void Execute(ActivityExecutionContext context)
    {
        Console.WriteLine("Hello world!");
    }
}
```

## Metadata <a href="#activity-metadata" id="activity-metadata"></a>

The `ActivityAttribute` can be used to give user-friendly details to your custom activity, such as its display name and description. Here's an example using `ActivityAttribute` with the `PrintMessage` activity. This is useful in tools like Elsa Studio.

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;

[Activity("MyCompany", "MyPlatform/MyFunctions", "Print a message to the console")]
public class PrintMessage : CodeActivity
{
    protected override void Execute(ActivityExecutionContext context)
    {
        Console.WriteLine("Hello world!");
    }
}
```

In this example, the activity is annotated with a namespace of `"MyCompany"` , a category of `"MyPlatform/MyFunctions"` and a description for clarity.

The Treeview activity picker in Elsa Studio supports nested categories within the tree. Simply use the `/` character to separate categories. More detials can be found [here](../studio/design/activity-pickers-3.7-preview.md).

## Composition <a href="#composite-activities" id="composite-activities"></a>

Composite activities merge several tasks into one, enabling complex processes with conditions and branches. This is shown in the `If` activity example below:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Models;

public class If : Activity
{
    public Input<bool> Condition { get; set; } = default!;
    public IActivity? Then { get; set; }
    public IActivity? Else { get; set; }

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var result = context.Get(Condition);
        var nextActivity = result ? Then : Else;
        await context.ScheduleActivityAsync(nextActivity, OnChildCompleted);
    }

    private async ValueTask OnChildCompleted(ActivityCompletedContext context)
    {
        await context.CompleteActivityAsync();
    }
}
```

This example illustrates how a composite activity can evaluate a condition and then proceed with one of two possible paths, effectively modeling an "if-else" statement within a workflow.

{% hint style="info" %}
**Programmatic Workflows and Dynamic Activities**

There is an open issue reported on GitHub related to the Elsa Workflows project: Dynamically provided activities are not yet supported within programmatic workflows. You can view the issue [here](https://github.com/elsa-workflows/elsa-core/issues/5162).
{% endhint %}

The following example shows how to use the `If` activity:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

public class IfWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Root = new If
        {
            Condition = new(context => DateTime.Now.IsDaylightSavingTime()),
            Then = new WriteLine("Welcome to the light side!"),
            Else = new WriteLine("Welcome to the dark side!")
        };
    }
}
```

## Outcomes <a href="#activity-outcomes" id="activity-outcomes"></a>

Setting custom outcomes for activities gives precise control over what happens based on certain conditions. You can declare potential outcomes by using the `FlowNodeAttribute` on the activity class. For example:

```
[FlowNode("Pass", "Fail")]
```

This attribute specifies two distinct outcomes for the activity: "Pass" and "Fail." These outcomes dictate the possible execution paths following the activity's completion. To trigger a specific outcome during runtime, utilize the `CompleteActivityWithOutcomesAsync` method within your activity's execution logic.

Consider the following sample activity:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities.Flowchart.Attributes;

[FlowNode("Pass", "Fail")]
public class PerformTask : Activity
{
    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        await context.CompleteActivityWithOutcomesAsync("Pass");
    }
}
```

In this example, the defined outcomes guide the flow of execution within flowcharts, enabling conditional progression based on the result of the activity. This mechanism enhances the flexibility and decision-making capabilities within workflows, allowing for dynamic responses to activity results.

## Input <a href="#activity-input" id="activity-input"></a>

Activities can accept inputs, similar to how C# methods accept parameters. This allows workflow designers to configure activity behavior at design time or dynamically at runtime.

### **Basic Input Properties**﻿

To define inputs on an activity, expose public properties within your activity class. For instance, the `PrintMessage` activity below accepts a message as input:

```csharp
using Elsa.Workflows;

public class PrintMessage : CodeActivity
{
    public string Message { get; set; }

    protected override void Execute(ActivityExecutionContext context)
    {
        Console.WriteLine(Message);
    }
}
```

### **Input Metadata**﻿

Use the `InputAttribute` to provide metadata about your inputs. This metadata is used by Elsa Studio to provide a better user experience when configuring activities:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;

[Activity("MyCompany", "Demo", "Print a message to the console")]
public class PrintMessage : CodeActivity
{
    [Input(
        DisplayName = "Message",
        Description = "The message to print to the console.",
        Category = "Settings"
    )]
    public string Message { get; set; }

    protected override void Execute(ActivityExecutionContext context)
    {
        Console.WriteLine(Message);
    }
}
```

The `InputAttribute` supports several properties:
- **DisplayName**: The name shown in the designer (defaults to property name)
- **Description**: Help text shown to users
- **Category**: Groups related inputs together
- **DefaultValue**: Default value when the activity is added
- **Options**: For dropdown/radio lists
- **UIHint**: Controls the input editor type (see UI Hints section below)

## **Expressions**﻿

Often, you'll want to dynamically set the activity's input through expressions, instead of fixed, literal values.

For instance, you might want the message to be printed to originate from a workflow variable, rather than being hardcoded into the activity's input.

To enable this, you should encapsulate the input property type within `Input<T>`.

As an illustration, the `PrintMessage` activity below is modified to support expressions for its `Message` input property:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Models;

public class PrintMessage : CodeActivity
{
    public Input<string> Message { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var message = Message.Get(context);
        Console.WriteLine(message);
    }
}
```

Note that encapsulating an input property with `Input<T>` changes the manner in which its value is accessed:

```csharp
var message = Message.Get(context);
```

The example below demonstrates specifying an expression for the `Message` property in a workflow created using the workflow builder API:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Contracts;

public class PrintMessageWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var message = builder.WithVariable<string>("Message", "Hello, World!");

        builder.Root = new PrintMessage
        {
            Message = new(context => $"The message is: {message.Get(context)}")
        };
    }
}
```

In this scenario, we use a simple C# delegate expression to dynamically determine the message to print at runtime.

Alternatively, other installed expression provider syntaxes, such as JavaScript, can be used:

```csharp
using Elsa.Expressions.JavaScript.Models;
using Elsa.Workflows;
using Elsa.Workflows.Contracts;

public class PrintMessageWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var message = builder.WithVariable<string>("Message", "Hello, World!");

        builder.Root = new PrintMessage
        {
            Message = new(JavaScriptExpression.Create("`The message is: ${variables.message}`"))
        };
    }
}
```

## UI Hints <a href="#ui-hints" id="ui-hints"></a>

UI Hints control how input properties are displayed and edited in Elsa Studio. By specifying a UI hint, you can provide a better user experience for workflow designers by using appropriate input controls.

### **Available UI Hints**﻿

Elsa Studio provides several built-in UI hints through the `InputUIHints` class:

- **SingleLine**: Single-line text input (default for strings)
- **MultiLine**: Multi-line text area
- **Checkbox**: Boolean checkbox
- **CheckList**: Multiple selection checklist
- **RadioList**: Single selection radio button list
- **DropDown**: Dropdown select list
- **CodeEditor**: Code editor with syntax highlighting
- **JsonEditor**: JSON-specific editor with validation
- **DateTimePicker**: Date and time picker
- **VariablePicker**: Select from available workflow variables
- **OutputPicker**: Select from activity outputs
- **OutcomePicker**: Select from activity outcomes
- **TypePicker**: Select a .NET type
- **WorkflowDefinitionPicker**: Select a workflow definition

### **Using UI Hints**﻿

Specify the UI hint using the `UIHint` property of the `InputAttribute`:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;
using Elsa.Workflows.UIHints;

[Activity("MyCompany", "Demo", "Configure application settings")]
public class ConfigureSettings : CodeActivity
{
    [Input(
        Description = "Enable debug mode",
        UIHint = InputUIHints.Checkbox
    )]
    public Input<bool> DebugMode { get; set; } = default!;

    [Input(
        Description = "Select environment",
        Options = new[] { "Development", "Staging", "Production" },
        DefaultValue = "Development",
        UIHint = InputUIHints.DropDown
    )]
    public Input<string> Environment { get; set; } = default!;

    [Input(
        Description = "Select deployment mode",
        Options = new[] { "SingleNode", "Cluster" },
        DefaultValue = "SingleNode",
        UIHint = InputUIHints.RadioList
    )]
    public Input<string> DeploymentMode { get; set; } = default!;

    [Input(
        Description = "Application configuration (JSON)",
        UIHint = InputUIHints.JsonEditor
    )]
    public Input<string> Configuration { get; set; } = default!;

    [Input(
        Description = "Startup script",
        UIHint = InputUIHints.CodeEditor
    )]
    public Input<string> StartupScript { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var debugMode = DebugMode.Get(context);
        var environment = Environment.Get(context);
        var deploymentMode = DeploymentMode.Get(context);
        var configuration = Configuration.Get(context);
        var script = StartupScript.Get(context);
        
        // Configure application settings
        Console.WriteLine($"Configuring for {environment} environment");
        Console.WriteLine($"Debug mode: {debugMode}");
        Console.WriteLine($"Deployment: {deploymentMode}");
    }
}
```

### **Multi-Select Inputs**﻿

For inputs that allow multiple selections, use `CheckList` with a collection type:

```csharp
[Input(
    Description = "Select notification channels",
    Options = new[] { "Email", "SMS", "Push", "Slack" },
    UIHint = InputUIHints.CheckList
)]
public Input<string[]> NotificationChannels { get; set; } = default!;
```

### **Date and Time Inputs**﻿

For date and time values, use the `DateTimePicker` hint:

```csharp
[Input(
    Description = "Scheduled execution time",
    UIHint = InputUIHints.DateTimePicker
)]
public Input<DateTime> ScheduledTime { get; set; } = default!;
```

### **Variable and Output Pickers**﻿

To help users select from available workflow variables or activity outputs:

```csharp
[Input(
    Description = "Select a variable to store the result",
    UIHint = InputUIHints.VariablePicker
)]
public Input<object> ResultVariable { get; set; } = default!;

[Input(
    Description = "Select an output from a previous activity",
    UIHint = InputUIHints.OutputPicker
)]
public Input<object> InputValue { get; set; } = default!;
```

## Output <a href="#activity-output" id="activity-output"></a>

Activities can generate outputs that can be used by subsequent activities in the workflow. To define outputs, use properties typed as `Output<T>`.

### **Basic Output Properties**﻿

Here's an example of an activity that generates a random number:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Models;

public class GenerateRandomNumber : CodeActivity
{
    public Output<int> Result { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var randomNumber = Random.Shared.Next(1, 100);
        Result.Set(context, randomNumber);
    }
}
```

### **Output Metadata**﻿

Use the `OutputAttribute` to provide metadata about your outputs:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Utilities", "Generate a random number")]
public class GenerateRandomNumber : CodeActivity
{
    [Output(
        DisplayName = "Random Number",
        Description = "The generated random number between 1 and 100."
    )]
    public Output<int> Result { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var randomNumber = Random.Shared.Next(1, 100);
        Result.Set(context, randomNumber);
    }
}
```

### **Multiple Outputs**﻿

Activities can have multiple output properties:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Math", "Divide two numbers")]
public class Divide : CodeActivity
{
    [Input(Description = "The dividend")]
    public Input<decimal> Dividend { get; set; } = default!;

    [Input(Description = "The divisor")]
    public Input<decimal> Divisor { get; set; } = default!;

    [Output(Description = "The quotient")]
    public Output<decimal> Quotient { get; set; } = default!;

    [Output(Description = "The remainder")]
    public Output<decimal> Remainder { get; set; } = default!;

    [Output(Description = "Whether the division was successful")]
    public Output<bool> Success { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var dividend = Dividend.Get(context);
        var divisor = Divisor.Get(context);

        if (divisor == 0)
        {
            Success.Set(context, false);
            return;
        }

        var quotient = dividend / divisor;
        var remainder = dividend % divisor;

        Quotient.Set(context, quotient);
        Remainder.Set(context, remainder);
        Success.Set(context, true);
    }
}
```

Workflow users have two approaches to using activity output:

1. Capturing the output via a workflow variable.
2. Direct access to the output from the workflow engine's memory register.

Let's examine both methods in detail.

### **Capture via Variable**﻿

Here's how to capture the output using a workflow variable:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

public class GenerateRandomNumberWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var randomNumber = builder.WithVariable("RandomNumber", 0m);

        builder.Root = new Sequence
        {
            Activities =
            {
                new GenerateRandomNumber
                {
                    Result = new(randomNumber)
                },
                new PrintMessage
                {
                    Message = new(context => $"The random number is: {randomNumber.Get(context)}")
                }
            }
        };
    }
}
```

In this workflow, the steps include:

* Executing the `GenerateRandomNumber` activity
* Capturing the activity's output in a variable named `RandomNumber`
* Displaying a message with the value of the `RandomNumber` variable

### **Direct Access**﻿

And here's how to access to the output from the `GenerateRandomNumber` activity directly:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

public class GenerateRandomNumberWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Root = new Sequence
        {
            Activities =
            {
                new GenerateRandomNumber
                {
                    Name = "GenerateRandomNumber1"
                },
                new PrintMessage
                {
                    Message = new(context => $"The random number is: {context.GetOutput("GenerateRandomNumber1", "Result")}")
                }
            }
        };
    }
}
```

This approach requires naming the activity from which the output will be accessed, as well as the output property's name.

An alternative, type-safe method is to declare the activity as a local variable initially. This allows for referencing both the activity and its output, as demonstrated below:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

public class GenerateRandomNumberWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var generateRandomNumber = new GenerateRandomNumber();

        builder.Root = new Sequence
        {
            Activities =
            {
                generateRandomNumber,
                new PrintMessage
                {
                    Message = new(context => $"The random number is: {generateRandomNumber.GetOutput<GenerateRandomNumber, decimal>(context, x => x.Result)}")
                }
            }
        };
    }
}
```

While both approaches are effective for managing activity output, it's crucial to note a key distinction: activity output is transient, existing only for the duration of the current execution burst.

To access the output value beyond these bursts, capturing the output in a variable is recommended, as variables are inherently persistent.

## Dependency Injection <a href="#activity-dependency-injection" id="activity-dependency-injection"></a>

Activities can access services registered in the dependency injection container using the `ActivityExecutionContext`. This enables activities to integrate with external systems, databases, APIs, and other application services.

### **Service Location Pattern**﻿

Retrieve services using the `GetRequiredService<T>()` or `GetService<T>()` methods on the context:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Weather", "Get weather forecast")]
public class GetWeatherForecast : CodeActivity
{
    [Input(Description = "City name")]
    public Input<string> City { get; set; } = default!;

    [Output(Description = "Weather forecast data")]
    public Output<WeatherForecast> Forecast { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var city = City.Get(context);
        
        // Retrieve service from DI container
        var weatherApi = context.GetRequiredService<IWeatherApi>();
        
        // Use the service
        var forecast = await weatherApi.GetWeatherAsync(city);
        
        // Set output
        Forecast.Set(context, forecast);
    }
}
```

### **Multiple Service Dependencies**﻿

Activities can access multiple services as needed:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;
using Microsoft.Extensions.Logging;

[Activity("MyCompany", "Orders", "Process customer order")]
public class ProcessOrder : CodeActivity
{
    [Input(Description = "Order ID")]
    public Input<string> OrderId { get; set; } = default!;

    [Output(Description = "Processing result")]
    public Output<string> Result { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var orderId = OrderId.Get(context);
        
        // Access multiple services
        var logger = context.GetRequiredService<ILogger<ProcessOrder>>();
        var orderService = context.GetRequiredService<IOrderService>();
        var inventoryService = context.GetRequiredService<IInventoryService>();
        var paymentService = context.GetRequiredService<IPaymentService>();
        
        logger.LogInformation("Processing order {OrderId}", orderId);
        
        try
        {
            // Validate inventory
            var order = await orderService.GetOrderAsync(orderId);
            var available = await inventoryService.CheckAvailabilityAsync(order.Items);
            
            if (!available)
            {
                Result.Set(context, "Insufficient inventory");
                return;
            }
            
            // Process payment
            var paymentResult = await paymentService.ProcessPaymentAsync(order);
            
            if (paymentResult.Success)
            {
                await orderService.CompleteOrderAsync(orderId);
                Result.Set(context, "Order processed successfully");
            }
            else
            {
                Result.Set(context, $"Payment failed: {paymentResult.Error}");
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error processing order {OrderId}", orderId);
            Result.Set(context, $"Error: {ex.Message}");
        }
    }
}
```

### **Optional Services**﻿

Use `GetService<T>()` instead of `GetRequiredService<T>()` when a service is optional:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

public class GetDataActivity : CodeActivity
{
    [Input(Description = "Data key")]
    public Input<string> Key { get; set; } = default!;

    [Output(Description = "Retrieved data")]
    public Output<string> Data { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        var key = Key.Get(context);
        
        // Optional service - returns null if not registered
        var cacheService = context.GetService<ICacheService>();
        
        if (cacheService != null)
        {
            // Use cache if available
            var cachedData = await cacheService.GetAsync(key);
            if (cachedData != null)
            {
                Data.Set(context, cachedData);
                return;
            }
        }
        
        // Fallback to direct data access
        var dataService = context.GetRequiredService<IDataService>();
        var data = await dataService.GetAsync(key);
        Data.Set(context, data);
    }
}
```

{% hint style="info" %}
**Why Service Location?**

Elsa uses the service location pattern instead of constructor injection to simplify activity instantiation in workflow definitions. This design choice makes it easier to create and configure activities programmatically without needing to provide constructor parameters.
{% endhint %}

## Blocking Activities <a href="#blocking-activities" id="blocking-activities"></a>

Blocking activities are a powerful concept in Elsa that enable workflows to pause execution and wait for external events or conditions. Instead of completing immediately, these activities create a **bookmark**—a persistence point that allows the workflow to be saved and resumed later when the required event occurs.

This mechanism is essential for:
- Long-running workflows that span hours, days, or longer
- Waiting for user input or approval
- Waiting for external system responses
- Coordinating with other workflows or processes

### **Creating a Basic Blocking Activity**﻿

Here's a simple example of a blocking activity that waits for an external event:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Events", "Wait for a custom event")]
public class WaitForEvent : Activity
{
    [Input(Description = "Event name to wait for")]
    public Input<string> EventName { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var eventName = EventName.Get(context);
        
        // Create a bookmark - this pauses the workflow
        context.CreateBookmark(eventName);
    }
}
```

### **Using Blocking Activities in Workflows**﻿

Here's how to use a blocking activity in a workflow:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

public class ApprovalWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Root = new Sequence
        {
            Activities =
            {
                new WriteLine("Workflow started - waiting for approval..."),
                new WaitForEvent 
                { 
                    EventName = new("OrderApproval")
                },
                new WriteLine("Approval received - continuing workflow!")
            }
        };
    }
}
```

When this workflow executes:
1. It prints "Workflow started - waiting for approval..."
2. It reaches the `WaitForEvent` activity and creates a bookmark
3. The workflow is persisted and removed from memory
4. The workflow waits until an external system resumes it
5. When resumed, it prints "Approval received - continuing workflow!"

### **Resuming Blocked Workflows**﻿

To resume a workflow that's waiting at a bookmark, use the `IStimulusSender` service:

```csharp
using Elsa.Workflows.Helpers;
using Elsa.Workflows.Runtime;

public class ApprovalController : ControllerBase
{
    private readonly IStimulusSender _stimulusSender;

    public ApprovalController(IStimulusSender stimulusSender)
    {
        _stimulusSender = stimulusSender;
    }

    [HttpPost("approve")]
    public async Task<IActionResult> ApproveOrder(string orderId)
    {
        // Resume all workflows waiting for this event
        var stimulus = "OrderApproval";
        var activityTypeName = ActivityTypeNameHelper.GenerateTypeName<WaitForEvent>();
        
        await _stimulusSender.SendAsync(activityTypeName, stimulus);
        
        return Ok("Order approved - workflows resumed");
    }
}
```

### **Bookmarks with Payloads**﻿

Bookmarks can carry data that's available when the workflow resumes:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Approvals", "Wait for order approval")]
public class WaitForOrderApproval : Activity
{
    [Input(Description = "Order ID to wait approval for")]
    public Input<string> OrderId { get; set; } = default!;

    [Output(Description = "Approval decision")]
    public Output<bool> Approved { get; set; } = default!;

    [Output(Description = "Approver comments")]
    public Output<string> Comments { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var orderId = OrderId.Get(context);
        
        // Create bookmark with order ID as payload
        var bookmarkPayload = new { OrderId = orderId };
        context.CreateBookmark(bookmarkPayload, OnResumeAsync);
    }

    private async ValueTask OnResumeAsync(ActivityExecutionContext context)
    {
        // Extract data from the resume payload
        var input = context.WorkflowInput;
        var approved = input.Get<bool>("Approved");
        var comments = input.Get<string>("Comments") ?? "";

        // Set outputs
        Approved.Set(context, approved);
        Comments.Set(context, comments);

        // Complete the activity
        await context.CompleteActivityAsync();
    }
}
```

### **Resuming with Data**﻿

When resuming a workflow with data:

```csharp
[HttpPost("approve/{orderId}")]
public async Task<IActionResult> ApproveOrder(
    string orderId, 
    [FromBody] ApprovalRequest request)
{
    var activityTypeName = ActivityTypeNameHelper.GenerateTypeName<WaitForOrderApproval>();
    
    // Create stimulus with bookmark payload and resume data
    var bookmarkPayload = new { OrderId = orderId };
    var input = new Dictionary<string, object>
    {
        ["Approved"] = request.Approved,
        ["Comments"] = request.Comments
    };
    
    await _stimulusSender.SendAsync(
        activityTypeName, 
        bookmarkPayload, 
        input);
    
    return Ok("Approval processed");
}
```

### **Blocking Activities Best Practices**﻿

1. **Unique Bookmarks**: Ensure bookmark payloads are unique enough to identify the correct workflow instance
2. **Timeout Handling**: Consider implementing timeout mechanisms for long-running waits
3. **Idempotency**: Design resume handlers to be idempotent in case of duplicate resume calls
4. **Error Handling**: Implement proper error handling in resume callbacks
5. **Testing**: Test both the blocking and resume paths thoroughly

## Triggers <a href="#activity-triggers" id="activity-triggers"></a>

Triggers are specialized activities that can both **start** new workflow instances and **resume** suspended workflows. They respond to external events such as HTTP requests, timer events, message queue messages, or custom application events.

A trigger activity differs from a regular blocking activity in that it:
- Can automatically start new workflow instances when events occur
- Implements the `ITrigger` interface or inherits from the `Trigger` base class
- Provides a trigger payload for workflow discovery and matching

### **Creating a Trigger Activity**﻿

Here's how to create a trigger that can both start and resume workflows:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;

[Activity("MyCompany", "Events", "Wait for or trigger on a custom event")]
public class CustomEventTrigger : Trigger
{
    [Input(Description = "Event name to trigger on")]
    public Input<string> EventName { get; set; } = default!;

    [Output(Description = "Event data received")]
    public Output<object> EventData { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        // Check if this trigger started the workflow
        if (context.IsTriggerOfWorkflow())
        {
            // Extract event data from workflow input
            var eventData = context.WorkflowInput.Get<object>("EventData");
            EventData.Set(context, eventData);
            
            // Complete immediately when starting workflow
            await context.CompleteActivityAsync();
            return;
        }

        // Otherwise, create a bookmark to wait for the event
        var eventName = EventName.Get(context);
        context.CreateBookmark(eventName, OnResumeAsync);
    }

    private async ValueTask OnResumeAsync(ActivityExecutionContext context)
    {
        // Extract event data when resumed
        var eventData = context.WorkflowInput.Get<object>("EventData");
        EventData.Set(context, eventData);
        
        await context.CompleteActivityAsync();
    }

    protected override object GetTriggerPayload(TriggerIndexingContext context)
    {
        // Return payload used to match incoming events to workflows
        var eventName = context.GetInput<string>(EventName);
        return eventName ?? "DefaultEvent";
    }
}
```

### **Key Trigger Concepts**﻿

**IsTriggerOfWorkflow()**: This method checks if the trigger activity started the current workflow execution. When `true`, the activity should complete immediately rather than creating a bookmark.

**GetTriggerPayload()**: This method returns a value that's used to match incoming events to workflow instances. The workflow runtime uses this payload to determine which workflows should be started when an event occurs.

**CanStartWorkflow**: This property on the activity instance must be set to `true` to allow the trigger to start new workflows.

### **Using Triggers in Workflows**﻿

Configure a workflow to be triggered by an event:

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

public class OrderEventWorkflow : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        builder.Root = new Sequence
        {
            Activities =
            {
                new CustomEventTrigger
                {
                    Id = "CustomEventTrigger1",
                    EventName = new("OrderPlaced"),
                    CanStartWorkflow = true  // Critical: enables trigger functionality
                },
                new WriteLine("Order placed event received!"),
                new WriteLine
                {
                    Text = new(context => 
                    {
                        var trigger = context.GetActivityById<CustomEventTrigger>("CustomEventTrigger1");
                        var data = trigger.EventData.Get(context);
                        return $"Order data: {data}";
                    })
                }
            }
        };
    }
}
```

### **Triggering Workflows**﻿

To trigger workflows from your application code:

```csharp
using Elsa.Workflows.Helpers;
using Elsa.Workflows.Runtime;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IStimulusSender _stimulusSender;

    public OrdersController(IStimulusSender stimulusSender)
    {
        _stimulusSender = stimulusSender;
    }

    [HttpPost]
    public async Task<IActionResult> PlaceOrder([FromBody] Order order)
    {
        // Process the order...
        
        // Trigger workflows waiting for this event
        var activityTypeName = ActivityTypeNameHelper.GenerateTypeName<CustomEventTrigger>();
        var bookmarkPayload = "OrderPlaced";
        
        var input = new Dictionary<string, object>
        {
            ["EventData"] = order
        };
        
        // This will:
        // 1. Start any workflows where CustomEventTrigger.CanStartWorkflow = true
        // 2. Resume any suspended workflows waiting at a CustomEventTrigger bookmark
        await _stimulusSender.SendAsync(activityTypeName, bookmarkPayload, input);
        
        return Ok("Order placed and workflows triggered");
    }
}
```

### **Advanced Trigger Example: Webhook**﻿

Here's a more sophisticated trigger example for webhooks:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Models;
using Elsa.Workflows.UIHints;

[Activity("MyCompany", "HTTP", "Wait for incoming webhook")]
public class WebhookTrigger : Trigger
{
    [Input(
        Description = "Webhook path (e.g., '/webhooks/github')",
        UIHint = InputUIHints.SingleLine
    )]
    public Input<string> Path { get; set; } = default!;

    [Output(Description = "Webhook payload")]
    public Output<object> Payload { get; set; } = default!;

    [Output(Description = "HTTP headers")]
    public Output<IDictionary<string, string>> Headers { get; set; } = default!;

    protected override async ValueTask ExecuteAsync(ActivityExecutionContext context)
    {
        if (context.IsTriggerOfWorkflow())
        {
            // Extract webhook data
            var payload = context.WorkflowInput.Get<object>("Payload");
            var headers = context.WorkflowInput.Get<IDictionary<string, string>>("Headers");
            
            Payload.Set(context, payload);
            Headers.Set(context, headers);
            
            await context.CompleteActivityAsync();
            return;
        }

        // Create bookmark with path as payload
        var path = Path.Get(context);
        context.CreateBookmark(path, OnResumeAsync);
    }

    private async ValueTask OnResumeAsync(ActivityExecutionContext context)
    {
        var payload = context.WorkflowInput.Get<object>("Payload");
        var headers = context.WorkflowInput.Get<IDictionary<string, string>>("Headers");
        
        Payload.Set(context, payload);
        Headers.Set(context, headers);
        
        await context.CompleteActivityAsync();
    }

    protected override object GetTriggerPayload(TriggerIndexingContext context)
    {
        return context.GetInput<string>(Path) ?? "/webhooks/default";
    }
}
```

### **Trigger Best Practices**﻿

1. **Always check IsTriggerOfWorkflow()**: Ensure triggers complete immediately when starting workflows
2. **Set CanStartWorkflow = true**: Required for triggers to actually start new workflow instances
3. **Unique Payloads**: Use unique trigger payloads to correctly match events to workflows
4. **Handle Both Modes**: Design triggers to work both as workflow starters and as blocking activities
5. **Include Resume Callbacks**: Always provide a resume callback when creating bookmarks
6. **Pass Data Forward**: Ensure event data flows through to subsequent activities via outputs

## Registering Activities <a href="#registering-activities" id="registering-activities"></a>

Before custom activities can be used in workflows, they must be registered with Elsa's activity registry. There are several ways to register activities depending on your needs.

### **Register Individual Activities**﻿

To register specific activity types, use the `AddActivity<T>()` method:

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddElsa(elsa =>
{
    elsa.AddActivity<PrintMessage>();
    elsa.AddActivity<GenerateRandomNumber>();
    elsa.AddActivity<CustomEventTrigger>();
});
```

### **Register Activities from Assembly**﻿

To register all activities from a specific assembly automatically:

```csharp
builder.Services.AddElsa(elsa =>
{
    // Register all activities in the assembly containing Program class
    elsa.AddActivitiesFrom<Program>();
});
```

This discovers and registers all types implementing `IActivity` in the specified assembly. The type parameter can be any type in the target assembly—it serves as a marker to identify the assembly.

### **Register Activities from Multiple Assemblies**﻿

For larger applications with activities spread across multiple assemblies:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.AddActivitiesFrom<Program>();                    // Main assembly
    elsa.AddActivitiesFrom<CoreActivitiesMarker>();       // Core activities assembly
    elsa.AddActivitiesFrom<IntegrationActivitiesMarker>(); // Integration activities
});
```

### **Register Activities with Assembly Scanning**﻿

For advanced scenarios, you can scan assemblies dynamically:

```csharp
using System.Reflection;

builder.Services.AddElsa(elsa =>
{
    // Get all assemblies in the current domain
    var assemblies = AppDomain.CurrentDomain.GetAssemblies()
        .Where(a => a.FullName.StartsWith("MyCompany."));
    
    foreach (var assembly in assemblies)
    {
        elsa.AddActivitiesFrom(assembly);
    }
});
```

### **Register Activity Dependencies**﻿

If your activities depend on services, register those services as well:

```csharp
builder.Services.AddElsa(elsa =>
{
    elsa.AddActivitiesFrom<Program>();
});

// Register services used by activities
builder.Services.AddScoped<IWeatherApi, WeatherApiClient>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IInventoryService, InventoryService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
```

### **Complete Registration Example**﻿

Here's a complete example showing activity registration in `Program.cs`:

```csharp
using Elsa.Persistence.EFCore.Extensions;
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add Elsa services
builder.Services.AddElsa(elsa =>
{
    // Use EF Core for persistence
    elsa.UseEntityFrameworkCore(ef =>
    {
        ef.UseSqlite();
    });
    
    // Register custom activities
    elsa.AddActivitiesFrom<Program>();
    
    // Enable workflows from JSON
    elsa.UseWorkflowsApi();
    
    // Enable workflow management API
    elsa.UseWorkflowManagement();
});

// Register activity dependencies
builder.Services.AddScoped<IWeatherApi, WeatherApiClient>();
builder.Services.AddHttpClient();

var app = builder.Build();

// Configure HTTP pipeline
app.UseHttpsRedirection();
app.UseRouting();

// Map Elsa API endpoints
app.UseWorkflowsApi();
app.UseWorkflows();

app.Run();
```

### **Verify Activity Registration**﻿

To verify that your activities are registered correctly, you can inject `IActivityRegistry` and check:

```csharp
using Elsa.Workflows.Contracts;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class DiagnosticsController : ControllerBase
{
    private readonly IActivityRegistry _activityRegistry;

    public DiagnosticsController(IActivityRegistry activityRegistry)
    {
        _activityRegistry = activityRegistry;
    }

    [HttpGet("activities")]
    public async Task<IActionResult> GetActivities()
    {
        var descriptors = await _activityRegistry.ListAsync();
        var activityNames = descriptors.Select(d => new 
        { 
            d.TypeName, 
            d.Name, 
            d.DisplayName, 
            d.Category 
        });
        
        return Ok(activityNames);
    }
}
```

## Activity Providers <a href="#activity-providers" id="activity-providers"></a>

Activity Providers enable advanced scenarios where activities are generated dynamically at runtime rather than being statically defined as .NET types. This powerful abstraction allows you to create activities from external sources such as APIs, databases, or configuration files.

### **Understanding Activity Descriptors**﻿

In Elsa, activities are represented by **Activity Descriptors**, which contain metadata about an activity including its name, category, inputs, outputs, and how to construct instances. 

By default, Elsa uses the `TypedActivityProvider` which creates descriptors from .NET types implementing `IActivity`. However, you can create custom providers to generate activities from any source.

### **Use Cases for Custom Activity Providers**﻿

- **API Integration**: Generate activities from OpenAPI/Swagger specifications
- **Database-Driven**: Load activity definitions from a database
- **Dynamic Configuration**: Create activities based on configuration files
- **Multi-Tenancy**: Provide different activities for different tenants
- **Plugin Systems**: Load activities from external plugins or modules

### **Creating a Custom Activity Provider**﻿

Here's an example that generates activities dynamically from a simple list:

```csharp
using Elsa.Extensions;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Models;

namespace MyCompany.Activities;

public class ProductActivityProvider : IActivityProvider
{
    private readonly IActivityFactory _activityFactory;

    public ProductActivityProvider(IActivityFactory activityFactory)
    {
        _activityFactory = activityFactory;
    }

    public ValueTask<IEnumerable<ActivityDescriptor>> GetDescriptorsAsync(
        CancellationToken cancellationToken = default)
    {
        var products = new[]
        {
            new { Name = "Laptop", Category = "Electronics" },
            new { Name = "Desk", Category = "Furniture" },
            new { Name = "Coffee", Category = "Beverages" }
        };

        var descriptors = products.Select(product =>
        {
            var typeName = $"MyCompany.Order{product.Name}";
            
            return new ActivityDescriptor
            {
                TypeName = typeName,
                Name = $"Order{product.Name}",
                Namespace = "MyCompany.Orders",
                DisplayName = $"Order {product.Name}",
                Category = $"Orders/{product.Category}",
                Description = $"Place an order for {product.Name}",
                Constructor = context =>
                {
                    // Create a base activity and configure it
                    var activity = _activityFactory.Create<PrintMessage>(context);
                    activity.Message = new($"Ordering {product.Name}...");
                    activity.Type = typeName;
                    return activity;
                }
            };
        }).ToList();

        return new ValueTask<IEnumerable<ActivityDescriptor>>(descriptors);
    }
}
```

### **Advanced Example: OpenAPI Activity Provider**﻿

Here's a more sophisticated example that could generate activities from an OpenAPI specification:

```csharp
using Elsa.Extensions;
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Models;

namespace MyCompany.Activities;

public class OpenApiActivityProvider : IActivityProvider
{
    private readonly IActivityFactory _activityFactory;
    private readonly IOpenApiService _openApiService;

    public OpenApiActivityProvider(
        IActivityFactory activityFactory,
        IOpenApiService openApiService)
    {
        _activityFactory = activityFactory;
        _openApiService = openApiService;
    }

    public async ValueTask<IEnumerable<ActivityDescriptor>> GetDescriptorsAsync(
        CancellationToken cancellationToken = default)
    {
        var spec = await _openApiService.LoadSpecificationAsync(cancellationToken);
        var descriptors = new List<ActivityDescriptor>();

        foreach (var path in spec.Paths)
        {
            foreach (var operation in path.Value.Operations)
            {
                var typeName = $"OpenApi.{operation.Value.OperationId}";
                
                var descriptor = new ActivityDescriptor
                {
                    TypeName = typeName,
                    Name = operation.Value.OperationId,
                    Namespace = "OpenApi",
                    DisplayName = operation.Value.Summary ?? operation.Value.OperationId,
                    Category = "OpenApi",
                    Description = operation.Value.Description,
                    Constructor = context =>
                    {
                        var activity = _activityFactory.Create<SendHttpRequest>(context);
                        activity.Method = new(operation.Key.ToString());
                        activity.Url = new(path.Key);
                        activity.Type = typeName;
                        return activity;
                    }
                };
                
                descriptors.Add(descriptor);
            }
        }

        return descriptors;
    }
}
```

### **Registering Activity Providers**﻿

Register your custom activity provider in `Program.cs`:

```csharp
builder.Services.AddElsa(elsa =>
{
    // Register the activity provider
    elsa.AddActivityProvider<ProductActivityProvider>();
});

// Or register multiple providers
builder.Services.AddElsa(elsa =>
{
    elsa.AddActivityProvider<ProductActivityProvider>();
    elsa.AddActivityProvider<OpenApiActivityProvider>();
});

// Register any dependencies
builder.Services.AddSingleton<IOpenApiService, OpenApiService>();
```

{% hint style="info" %}
**Programmatic Workflows and Dynamic Activities**

Currently, dynamically provided activities cannot be used within programmatic workflows defined in C#. They are only available in workflows created through Elsa Studio or JSON definitions.

An open issue exists for this functionality: [https://github.com/elsa-workflows/elsa-core/issues/5162](https://github.com/elsa-workflows/elsa-core/issues/5162)
{% endhint %}

### **Activity Provider Best Practices**﻿

1. **Cache Descriptors**: Consider caching activity descriptors to avoid regenerating them on every request
2. **Async Loading**: Use async/await for loading activity definitions from external sources
3. **Error Handling**: Implement proper error handling for external data sources
4. **Unique Type Names**: Ensure generated type names are unique and stable
5. **Performance**: Be mindful of performance when generating large numbers of activities

## Summary <a href="#summary" id="summary"></a>

Custom activities are the foundation of extending Elsa Workflows to meet your specific business needs. This guide covered everything you need to create powerful, reusable workflow activities in Elsa V3:

### **What You Learned**

- **Basic Activities**: Creating simple activities using `Activity` and `CodeActivity` base classes
- **Inputs and Outputs**: Defining activity parameters with `Input<T>` and `Output<T>`, including metadata with attributes
- **UI Hints**: Controlling how inputs are displayed in Elsa Studio with various UI hint options
- **Expressions**: Supporting dynamic values through C#, JavaScript, and other expression providers
- **Metadata**: Using `ActivityAttribute`, `InputAttribute`, and `OutputAttribute` to enhance the designer experience
- **Composite Activities**: Building complex activities that compose other activities
- **Custom Outcomes**: Defining multiple execution paths using the `FlowNode` attribute
- **Dependency Injection**: Accessing services through the activity execution context
- **Blocking Activities**: Creating activities that pause workflow execution until external events occur
- **Triggers**: Building activities that can both start new workflows and resume existing ones
- **Registration**: Various patterns for registering activities with Elsa
- **Activity Providers**: Dynamically generating activities from external sources

### **Next Steps**

Now that you understand custom activities, consider:

1. **Explore Built-in Activities**: Study Elsa's built-in activities for patterns and best practices
2. **Create Domain Activities**: Build activity libraries specific to your business domain
3. **Share Activities**: Package your activities as NuGet packages for reuse across projects
4. **Advanced Topics**: Learn about custom UI components, field extensions, and Studio customization

### **Additional Resources**

- [Elsa Core Source Code](https://github.com/elsa-workflows/elsa-core) - Reference implementation of built-in activities
- [UI Hints Documentation](../studio/workflow-editor/ui-hints.md) - Complete guide to UI hints
- [Reusable Triggers](reusable-triggers-3.5-preview.md) - Advanced trigger patterns (v3.5+)
- [Logging Framework](../features/logging-framework.md) - Integrate logging in your activities

Custom activities unlock the full potential of Elsa Workflows, enabling you to create sophisticated, domain-specific workflow solutions that perfectly fit your requirements.

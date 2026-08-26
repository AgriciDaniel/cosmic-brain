---
description: >-
  In this section, we cover some of the built-in variables and functions
  available to the C# expression syntax.
---

# C\#

When creating workflows, you'll often need to write dynamic expressions. This page provides an overview of enabling C# expressions and what objects you can use.

## Installing the C# Feature

The C# Expressions feature is provided by the following package:

```bash
dotnet add package Elsa.Expressions.CSharp
```

You can enable the feature as follows:

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
   elsa.UseCSharp();
});
```
{% endcode %}

### Configuration

The `UseCSharp` extension provides an overload that accepts a delegate that lets you configure `CSharpOptions`. These options let you configure what assemblies and namespaces to make available to C# expressions, and provides a way to register additional reusable global methods.

For example:

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
   elsa.UseCSharp(options =>
   {
      // Make available additional assemblies.
      options.Assemblies.Add(GetType().Assembly);
      
      // Make available additional assemblies.
      options.Namespaces.Add(typeof(MyEntity).Namespace!);
   
      // Register a global method called 'Greet'.
      options.AppendScript("string Greet(string name) => $\"Hello {name}!\";");
   });
});
```
{% endcode %}

{% hint style="info" %}
Elsa uses [Roslyn](https://github.com/dotnet/roslyn) to implement the C# expression evaluator.

Out of the box, the following namespaces are available:

* System
* System.Collections.Generic
* System.Linq
* System.Text.Json
* System.Text.Json.Serialization
* System.Text.Nodes
{% endhint %}

## Globals

The following members are available as globals to all C# expressions:

* [WorkflowInstanceId](c.md#workflowinstanceid)
* [CorrelationId](c.md#correlationid)
* [Variable](c.md#variable)
* [Output](c.md#output)
* [Input](c.md#input)

### WorkflowInstanceId

Type: String.

The `WorkflowInstanceId` property returns the workflow instance ID of the currently executing workflow.

Example usage:

```csharp
return WorkflowInstanceId;
```

### CorrelationId

Type: String.

The CorrelationId property gets or sets the correlation ID of the currently executing workflow.

Example usage:

```csharp
CorrelationId = Guid.New().ToString();
```

### Variable

The Variable object provides access to the following methods and properties related to accessing workflow variables:

```csharp
/// <summary>
/// Gets the value of the workflow variable as specified by name.
/// </summary>
T? Get<T>(string name);

/// <summary>
/// Gets the value of the workflow variable as specified by name.
/// </summary>
object? Get(string name);

/// <summary>
/// Sets the value of the workflow variable as specified by name.
/// </summary>
void Set(string name, object? value);
```

In addition, the `Variable` object provides strongly-typed access to all workflow variables. For example, if your workflow defines a variable called `OrderId` of type `Guid`, the following property will be available on the `Variable` object:

```csharp
Guid OrderId { get; set; }
```

### Output

The `Output` object provides access to the following methods and properties related to accessing activity output:

```csharp
/// <summary>
/// Gets the value of the specified output from the specified activity.
/// </summary>
/// <param name="activityIdOrName">The ID or name of the activity that produced the output.</param>
/// <param name="outputName">The name of the output.</param>
/// <returns>The value of the output.</returns>
object? From(string activityIdOrName, string? outputName = null);

/// <summary>
/// Gets the value of the specified output from the specified activity.
/// </summary>
/// <param name="activityIdOrName">The ID or name of the activity that produced the output.</param>
/// <param name="outputName">The name of the output.</param>
/// <returns>The value of the output.</returns>
T? From<T>(string activityIdOrName, string? outputName = null);

/// <summary>
/// Gets the result of the last activity that executed.
/// </summary>
object? LastResult { get; }
```

### Input

The `Input` object provides access to the following methods related to accessing workflow input:

```csharp
/// <summary>
/// Gets the value of the specified input.
/// </summary>
object? Get(string name);

/// <summary>
/// Gets the value of the specified input.
/// </summary>
T? Get<T>(string name);
```

In addition, the `Input` object provides strongly-typed access to all workflow-defined inputs. For example, if your workflow defines an input called `OrderNumber` of type `string`, the following property will be available on the `Input` object:

```csharp
string Ordernumber { get; }
```

## Adding Assemblies and Namespaces

You can make available additional assemblies and namespaces to C# expressions by configuring the C# Expression Feature from your application's startup code. For example:




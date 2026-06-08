---
description: >-
  Learn how to use expressions in Elsa Studio to reference variables, access data, and create dynamic workflows with JavaScript and C# code.
---

# Expressions in Elsa Studio

Expressions are one of the most powerful features in Elsa Studio. They allow you to write dynamic values for activity properties, reference workflow variables, perform calculations, and make data-driven decisions in your workflows.

This guide covers how to use expressions in Studio, with a focus on JavaScript and C# expressions for working with variables.

## Expression Types in Studio

When configuring an activity property in Studio, you can choose from several expression types:

### Literal

A **Literal** expression is a static value that doesn't change. Use this when you want to hardcode a value.

**Example**: Setting a variable to the text `"Hello, World!"`

### JavaScript

**JavaScript** expressions let you write JavaScript code to compute values dynamically. This is the most commonly used expression type for referencing variables and performing simple operations.

**Example**: `variables.OrderId` or `variables.Customer.Name`

### C\#

**C#** expressions let you write C# code with full access to .NET types and methods. Use this when you need strong typing, complex logic, or access to .NET libraries.

**Example**: `Variable.Get<Guid>("OrderId")` or `Variable.OrderId`

### JSON

**JSON** expressions allow you to provide JSON data directly. This is useful when working with structured data.

### Liquid

**Liquid** is a template language that's useful for generating text with embedded variables.

**Example**: `Hello, {{ Variables.CustomerName }}!`

### Other Expression Types

Elsa also supports Python and other expression types depending on your server configuration. Check your Elsa Server's installed packages to see what's available.

## How to Choose an Expression Type

In the Studio property panel, you'll see a dropdown next to each property where you can select the expression type:

![Studio screenshot placeholder]

**When to use each type:**

- **Literal**: Simple static values (numbers, strings, booleans)
- **JavaScript**: Quick variable access, simple calculations, most common use case
- **C#**: Complex logic, strong typing, access to .NET libraries
- **JSON**: Structured data objects
- **Liquid**: Text templates with variables

{% hint style="info" %}
If you're not sure which to use, start with **JavaScript** for simple variable references and switch to **C#** if you need more advanced features.
{% endhint %}

## Understanding the Variables Object

In Elsa workflows, variables are stored in a special `variables` object that's accessible in expressions. The structure of this object depends on how you've defined your variables.

### Variable Structure

When you create a variable in your workflow, it becomes a property on the `variables` object:

- Variable name: `OrderId` → Access as: `variables.OrderId`
- Variable name: `CustomerName` → Access as: `variables.CustomerName`
- Variable name: `variable1` → Access as: `variables.variable1`

### Object Variables

Variables can store complex objects with nested properties. For example, if you have a variable called `variable1` that contains an object with a `data` property:

```javascript
// Variable structure
variable1 = {
  data: {
    id: "12345",
    name: "Example"
  }
}
```

You can access nested properties using dot notation:

```javascript
variables.variable1.data.id
```

## Referencing Variables in JavaScript Expressions

JavaScript expressions are the most common way to work with variables in Studio. Here's how to use them effectively.

### Reading a Simple Variable

To read a variable value, use the `variables` object:

**JavaScript:**
```javascript
variables.OrderId
```

### Reading Nested Properties

For variables that contain objects, use dot notation to access nested properties:

**JavaScript:**
```javascript
variables.variable1.data.id
variables.Customer.Address.City
variables.OrderDetails.Items[0].Price
```

### Setting a Variable Value

The `variables` object is read-only in most contexts. To set variables, use the `SetVariable` activity or the `setVariable()` function:

**JavaScript:**
```javascript
setVariable("OrderId", newGuid())
```

### Using Variables in Calculations

You can perform calculations with variable values:

**JavaScript:**
```javascript
variables.Quantity * variables.UnitPrice
variables.FirstName + " " + variables.LastName
variables.TotalAmount > 1000
```

### Handling Null or Undefined Variables

Always be careful when accessing variables that might not exist:

**JavaScript:**
```javascript
// Check if variable exists before using it
variables.OrderId ? variables.OrderId : "default-value"

// Or use optional chaining (if supported)
variables.Customer?.Address?.City

// Provide a default value
variables.OrderId || "unknown"
```

## Referencing Variables in C# Expressions

C# expressions provide type safety and access to the full .NET framework. There are several ways to access variables in C#.

### Strongly-Typed Access

If your variable is defined in the workflow, Elsa generates strongly-typed properties on the `Variable` object:

**C#:**
```csharp
Variable.OrderId
Variable.CustomerName
```

This approach provides compile-time type checking and IntelliSense support.

### Using Variable.Get<T>()

You can access variables by name with type safety using the `Get<T>()` method:

**C#:**
```csharp
Variable.Get<Guid>("OrderId")
Variable.Get<string>("CustomerName")
Variable.Get<int>("Quantity")
```

### Dynamic Access

For variables with complex structures or when you need more flexibility:

**C#:**
```csharp
// Using the variables dictionary (requires casting)
var variable1 = Variable.Get<dynamic>("variable1");
var id = variable1.data.id;

// Or access as an object and cast
var customerObj = Variable.Get<object>("Customer");
```

### Dictionary-Based Access

When working with object variables that are stored as dictionaries:

**C#:**
```csharp
var variable1 = Variable.Get<Dictionary<string, object>>("variable1");
var data = variable1["data"] as Dictionary<string, object>;
var id = data["id"] as string;
```

### Setting Variables in C#

Use the `Set()` method to assign values:

**C#:**
```csharp
Variable.Set("OrderId", Guid.NewGuid());
Variable.Set("Status", "Completed");
```

## Practical Example: Using SetVariable Activity

This example demonstrates the scenario from issue #89: reading a nested property from an object variable and using it to set another variable.

### Scenario

You have a variable called `variable1` that contains an object:

```json
{
  "data": {
    "id": "abc-123",
    "name": "Sample Item"
  }
}
```

**Goal**: Extract the `id` value and store it in a new variable called `extractedId`.

### Solution with JavaScript

1. Add a `SetVariable` activity to your workflow
2. Configure the activity:
   - **Variable Name**: `extractedId` (Literal)
   - **Value**: Choose **JavaScript** as the expression type
   - **Expression**:

```javascript
variables.variable1.data.id
```

![Studio screenshot placeholder]

This reads the `id` property from the nested `data` object within `variable1` and assigns it to `extractedId`.

### Solution with C# (Using Get Method)

Using the `Get<T>()` method with type casting:

1. Add a `SetVariable` activity
2. Configure the activity:
   - **Variable Name**: `extractedId` (Literal)
   - **Value**: Choose **C#** as the expression type
   - **Expression**:

```csharp
Variable.Get<dynamic>("variable1").data.id
```

{% hint style="info" %}
If you need to ensure the result is a string, you can add `.ToString()` at the end, but it's often not necessary if the property is already a string.
{% endhint %}

{% hint style="warning" %}
**Dynamic vs Strongly-Typed**: Using `dynamic` bypasses compile-time type checking, which means potential errors won't be caught until runtime. Use dynamic access when the variable structure is truly unknown at design time, but prefer strongly-typed access (with `Variable.Get<T>()` and specific types) when you know the structure for better safety and IntelliSense support.
{% endhint %}

### Solution with C# (Dictionary Access)

If you need more control over type handling, use dictionary access:

1. Add a `SetVariable` activity
2. Configure the activity:
   - **Variable Name**: `extractedId` (Literal)
   - **Value**: Choose **C#** as the expression type
   - **Expression**:

```csharp
var variable1 = Variable.Get<Dictionary<string, object>>("variable1");
var data = variable1["data"] as Dictionary<string, object>;
var id = data?["id"] as string;
return id ?? string.Empty;
```

{% hint style="info" %}
**Note**: The multi-line approach shown above is recommended for clarity and maintainability. While it's possible to write this as a complex single-line expression, the multi-line version is easier to read and debug.
{% endhint %}

{% hint style="warning" %}
**Null Safety**: When using the `as` operator for casting, always check for null values. The example above uses the null-conditional operator (`?.`) and null-coalescing operator (`??`) to safely handle cases where the cast might fail or values might be missing. Without these checks, you risk `NullReferenceException` at runtime.
{% endhint %}

{% hint style="warning" %}
When using dynamic access or dictionaries, you may need to cast values to the appropriate type. The exact approach depends on how your variable was created and what type of data it contains.
{% endhint %}

## More Complex Examples

### Combining Multiple Variables

**JavaScript:**
```javascript
`${variables.FirstName} ${variables.LastName} - Order #${variables.OrderId}`
```

**C#:**
```csharp
$"{Variable.FirstName} {Variable.LastName} - Order #{Variable.OrderId}"
```

### Conditional Logic

**JavaScript:**
```javascript
variables.TotalAmount > 1000 ? "Premium" : "Standard"
```

**C#:**
```csharp
Variable.TotalAmount > 1000 ? "Premium" : "Standard"
```

### Working with Arrays

**JavaScript:**
```javascript
// Get first item
variables.Items[0].Name

// Get array length
variables.Items.length

// Check if array contains value
variables.Tags.includes("urgent")
```

**C#:**
```csharp
// Get first item
Variable.Get<List<Item>>("Items")[0].Name

// Get count
Variable.Get<List<Item>>("Items").Count

// Check if contains
Variable.Get<List<string>>("Tags").Contains("urgent")
```

## Evaluation Context and Common Pitfalls

Understanding where expressions are evaluated helps avoid common errors.

### Where Variables Come From

The `variables` object is constructed by the Elsa workflow engine at runtime. It contains:
- Variables defined in your workflow definition
- Variables set by activities during execution
- Variables passed as workflow input

Variables are stored in the workflow instance state and persist across workflow executions if the workflow is suspended and resumed.

### Common Pitfalls

#### 1. Misspelled Variable Names

**Problem**: `variables.OrderID` when the variable is actually called `OrderId`

**Solution**: Variable names are case-sensitive. Double-check the exact spelling in your workflow definition.

#### 2. Wrong Expression Type

**Problem**: Setting a property to "Literal" when you meant to use "JavaScript"

**Solution**: Always verify the expression type dropdown is set correctly. If your expression looks like code but isn't evaluated, you probably have it set to "Literal".

#### 3. Null Reference Errors

**Problem**: Accessing `variables.Customer.Name` when `Customer` is null

**Solution**: Use null-checking:
- **JavaScript**: `variables.Customer?.Name` or `variables.Customer && variables.Customer.Name`
- **C#**: `Variable.Customer?.Name`

#### 4. Variable Not Found

**Problem**: Variable doesn't exist yet when you try to access it

**Solution**: Ensure the variable is:
- Defined in your workflow definition, OR
- Set by a previous activity that has already executed

Variables are only available after they've been created or set.

#### 5. Type Mismatches in C#

**Problem**: Trying to access a string variable as an integer

**Solution**: Use the correct type parameter in `Get<T>()`:
```csharp
Variable.Get<int>("Quantity")  // Not Variable.Get<string>("Quantity")
```

## Accessing Activity Outputs

In addition to variables, you can access outputs from other activities in your workflow.

### Using JavaScript

**Access by activity name:**
```javascript
getOutputFrom("MyHttpRequest", "Body")
```

**Access last result:**
```javascript
getLastResult()
```

### Using C#

**Access by activity name:**
```csharp
Output.From<string>("MyHttpRequest", "Body")
```

**Access last result:**
```csharp
Output.LastResult
```

## Accessing Workflow Input

If your workflow receives input when it starts, you can access it in expressions.

### Using JavaScript

```javascript
getInput("OrderId")
```

Or use the shorthand getter:
```javascript
getOrderId()
```

### Using C#

```csharp
Input.Get<Guid>("OrderId")
```

Or use strongly-typed access:
```csharp
Input.OrderId
```

## Testing Your Expressions

{% hint style="info" %}
**Test Early and Often**: After writing an expression, save your workflow and test it to make sure it works as expected. Use the Workflow Instances view to inspect variable values during execution.
{% endhint %}

To test expressions:

1. **Run Your Workflow**: Execute the workflow in Studio
2. **Check Instances**: Go to "Workflow Instances" in the sidebar
3. **Inspect Variables**: Open the workflow instance and view the variables tab
4. **Look for Errors**: If an expression fails, check the workflow instance for error messages

## Best Practices

### Choose the Right Expression Type

- Use **Literal** for static values
- Use **JavaScript** for simple variable access and logic
- Use **C#** when you need type safety or complex .NET operations

### Name Variables Clearly

Use descriptive variable names that indicate what they contain:
- ✅ `OrderId`, `CustomerEmail`, `TotalAmount`
- ❌ `var1`, `temp`, `x`

### Handle Null Cases

Always consider whether a variable might be null or undefined:

**JavaScript:**
```javascript
variables.OptionalField || "default value"
```

**C#:**
```csharp
Variable.OptionalField ?? "default value"
```

### Use Strongly-Typed Access in C#

When possible, define variables in your workflow and use strongly-typed access for better IntelliSense and compile-time checking.

### Keep Expressions Simple

If an expression becomes too complex, consider breaking it into multiple activities. This makes your workflow easier to understand and debug.

## Additional Resources

- **[C# Expressions Reference](../../expressions/c.md)**: Complete reference for C# expressions in Elsa
- **[JavaScript Expressions Reference](../../expressions/javascript.md)**: Complete reference for JavaScript expressions in Elsa
- **[Workflow Variables API](../../operate/workflow-instance-variables.md)**: Working with variables programmatically
- **[Studio User Guide](README.md)**: Overview of Elsa Studio features

## Summary

Expressions in Elsa Studio give you the power to create dynamic, data-driven workflows. By understanding how to:

- Choose the right expression type
- Access variables using `variables.VariableName`
- Reference nested properties with dot notation
- Handle null cases and type conversions
- Use both JavaScript and C# expressions effectively

You can build sophisticated workflows that respond to data and conditions in your business processes.

{% hint style="success" %}
**You're Ready!** With this knowledge, you can confidently use expressions in your workflows. Start simple with variable references, then gradually add more complex logic as needed.
{% endhint %}

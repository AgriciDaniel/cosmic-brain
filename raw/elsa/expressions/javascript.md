---
description: >-
  In this section, we cover some of the built-in variables and functions
  available to the JavaScript expression syntax.
---

# JavaScript

When creating workflows, you'll often need to write dynamic expressions. This page provides an overview of enabling JavaScript expressions and what functions and objects you can use.

## Installing the JavaScript Feature

The JavaScript Expressions feature is provided by the following package:

```bash
dotnet add package Elsa.Expressions.JavaScript
```

You can enable the feature as follows:

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
   elsa.UseJavaScript();
});
```
{% endcode %}

### Configuration

The `UseJavaScript` extension provides an overload that accepts a delegate that lets you configure `JintOptions`. These options let you configure the underlying [Jint](https://github.com/sebastienros/jint) engine.

For example:

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
   elsa.UseJavaScript(options =>
   {
      options.AllowClrAccess = true;
      options.RegisterType<Order>();
      options.ConfigureEngine(engine =>
      {
         engine.Execute("function greet(name) { return `Hello ${name}!`; }");
         engine.SetValue("echo", (Func<string, string>)(s => "Echo: " + s));
      });
   });
});
```
{% endcode %}

{% hint style="info" %}
Elsa uses [Jint](https://github.com/sebastienros/jint) to implement the JavaScript expression evaluator.
{% endhint %}

## Globals

The following functions and objects are available as globals to all JavaScript expressions:

* [JSON](javascript.md#json)
* [variables](javascript.md#variables)
* [getWorkflowDefinitionId](javascript.md#getworkflowdefinitionid)
* [getWorkflowDefinitionVersionId](javascript.md#getworkflowdefinitionversionid)
* [getWorkflowDefinitionVersion](javascript.md#getworkflowdefinitionversion)
* [getWorkflowInstanceId](javascript.md#getworkflowinstanceid)
* [setCorrelationId](javascript.md#setcorrelationid)
* [getCorrelationId](javascript.md#getcorrelationid)
* [setVariable](javascript.md#setvariable)
* [getVariable](javascript.md#getvariable)
* [getInput](javascript.md#getinput)
* [getOutputFrom](javascript.md#getoutputfrom)
* [getLastResult](javascript.md#getlastresult)
* [isNullOrWhiteSpace](javascript.md#isnullorwhitespace)
* [isNullOrEmpty](javascript.md#isnullorempty)
* [parseGuid](javascript.md#parseguid)
* [newGuid](javascript.md#newguid)
* [newGuidString](javascript.md#newguidstring)
* [newShortGuid](javascript.md#newshortguid)
* [bytesToString](javascript.md#bytestostring)
* [bytesFromString](javascript.md#bytesfromstring)
* [bytesToBase64](javascript.md#bytestobase64)
* [bytesFromBase64](javascript.md#bytesfrombase64)
* [stringToBase64](javascript.md#stringtobase64)
* [stringFromBase64](javascript.md#stringfrombase64)
* [streamToBytes](javascript.md#streamToBytes)
* [streamToBase64](javascript.md#streamToBase64)
* get{InputName}
* get{VariableName}
* set{VariableName}

### JSON

The `JSON` type provides static methods to parse JSON strings into JavaScript objects and to serialise JavaScript objects into JSON strings.

```javascript
// Serialize the specified value as a JSON string.
JSON.stringify(object value);

// Deserialize the specified JSON string into a JavaScript object.
JSON.parse(string json);
```

### variables

The `variables` object provides static access to the workflow variables. For example, if your workflow has a variable called OrderId, you can get and set that workflow variable using the following JavaScript expression:

```javascript
// Set the OrderId workflow variable.
variables.OrderId = newGuid();

// Get the OrderId workflow variable.
const orderId = variables.OrderId;
```

### getWorkflowDefinitionId

Returns the workflow definition ID of the currently executing workflow.

```javascript
getWorkflowDefinitionId(): string;
```

### getWorkflowDefinitionVersionId

Returns the workflow definition version ID of the currently executing workflow.

```javascript
getWorkflowDefinitionVersionId(): string;
```

### getWorkflowDefinitionVersion

Returns the workflow definition version of the currently executing workflow.

```javascript
getWorkflowDefinitionVersion(): number;
```

### getWorkflowInstanceId

Returns the workflow instance ID of the currently executing workflow.

```javascript
getWorkflowInstanceId(): string;
```

### setCorrelationId

Sets the correlation ID of the currently executing workflow to the specified value.

```javascript
setCorrelationId(value: string);
```

### getCorrelationId

Gets the correlation ID of the currently executing workflow.

```javascript
getCorrelationId(): string?;
```

### setVariable

Sets the specified workflow variable by name to the specified value.

```javascript
setVariable(name: string, value: any);
```

### getVariable

Gets the specified workflow variable's value by name.

```javascript
getVariable(name: string): any;
```

### getInput

Gets the specified workflow input by name.

```javascript
getInput(name: string): any;
```

### getOutputFrom

Gets the specified activity output by name from the specified activity by name.

```javascript
getOutputFrom(activityIdOrName: string, outputName?: string): any;
```

### getLastResult

Gets the output of the last activity that executed.

```javascript
getLastResult(): any;
```

### isNullOrWhiteSpace

Returns `true` if the specified string is null, empty or consist only of whitespace characters, `false` otherwise.

```javascript
isNullOrWhiteSpace(string? value): boolean;
```

### isNullOrEmpty

Returns `true` if the specified string is null or empty, `false` otherwise.

```javascript
isNullOrEmpty(string? value): boolean;
```

### parseGuid

Parses the specified string into a `Guid`.

```javascript
parseGuid(string value): Guid;
```

### newGuid

Creates a new `Guid`.

```javascript
newGuid(): Guid;
```

### newGuidString

Creates a new `Guid`  as a `string` representation.

```javascript
newGuidString(): string;
```

### newShortGuid

Creates a new short GUID as a `string` representation.

```javascript
newShortGuid(): string;
```

### bytesToString

Converts a byte array to a string.

```javascript
bytesToString(buffer: byte[]): string;
```

### bytesFromString

Converts a string to an array of bytes.

```javascript
bytesFromString(value: string): byte[];
```

### bytesToBase64

Converts a byte array to a base64 string.

```javascript
bytesToBase64(buffer: byte[]): string;
```

### bytesFromBase64

Converts a base64 string to a byte array.

```javascript
bytesFromBase64(base64: string): byte[];
```

### stringToBase64

Converts a string to a base64 string.

```javascript
stringToBase64(value: string): string;
```

### stringFromBase64

Converts a base64 string to a string.

```javascript
stringFromBase64(base64: string): string;
```

### streamToBytes

Converts a stream string to a byte array.

```javascript
streamToBytes(value: Stream): byte[];
```

### streamToBase64

Converts a stream to a base64 string.

```javascript
streamToBase64(value: Stream): string;
```

# Liquid

When working with Elsa, you'll often want to write dynamic expressions. This page provides a glossary of various filters and tags you can use, in addition to the standard set that you can find in the [Liquid documentation](https://shopify.github.io/liquid/).

{% hint style="info" %}
Elsa uses the [Fluid library](https://github.com/sebastienros/fluid) to implement Liquid. More tags and filters can be found there, as well as details on providing your own tags and filters.
{% endhint %}

## Installing the Liquid Feature

The Liquid Expressions feature is provided by the following package:

```bash
dotnet add package Elsa.Expressions.Liquid
```

You can enable the feature as follows:

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
   elsa.UseLiquid();
});
```
{% endcode %}

### Configuration

The `UseLiquid` extension provides an overload that accepts a delegate that lets you configure the `LiquidFeature`, which itself exposes a delegate to configure `FluidOptions`.

For example:

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
   elsa.UseLiquid(liquid =>
   {
      liquid.FluidOptionstions += options =>
      {
         options.Encoder = HtmlEncoder.Default;
      }
   });
});
```
{% endcode %}

## Filters, Tags and Objects

The following filters, tags and objects are available to Liquid expressions:

* [Filters](liquid.md#filters)
  * [json](liquid.md#json)
  * [base64](liquid.md#base64)
* [Objects](liquid.md#objects)
  * [Variables](liquid.md#variables)
  * [Input](liquid.md#input)
  * [WorkflowInstanceId](liquid.md#workflowinstanceid)
  * [WorkflowDefinitionId](liquid.md#workflowdefinitionid)
  * [WorkflowDefinitionVersionId](liquid.md#workflowdefinitionversionid)
  * [WorkflowDefinitionVersion](liquid.md#workflowdefinitionversion)
  * [CorrelationId](liquid.md#correlationid)

You can find more filters, tags and variables in the [Liquid documentation](https://shopify.github.io/liquid/).

### Filters

#### json

The `json` filter serialises an input value to a JSON string. Example:

```liquid
{{ some_value | json }}
```

#### base64

The base64 filter converts an input value into a base64 string. Example:

```liquid
{{ some_value | base64 }}
```

### Objects

#### Variables

The `Variables` object provides access to the workflow variables. For example, if your workflow has a variable called OrderId, you can get that workflow variable using the following Liquid expression:

```liquid
{{ Variables.OrderId }}
```

#### Input

The `Input` object provides access to workflow input. Example:

```liquid
{{ Input.OrderNumber }}
```

#### WorkflowInstanceId

The `WorkflowInstanceId` object provides access to the workflow instance ID of the currently executing workflow. Example:

```
{{ WorkflowInstanceId }}
```

#### WorkflowDefinitionId

The `WorkflowDefinitionId` object provides access to the workflow definition ID of the currently executing workflow. Example:

```
{{ WorkflowDefinitionId }}
```

#### WorkflowDefinitionVersionId

The `WorkflowDefinitionVersionId` object provides access to the workflow definition version ID of the currently executing workflow. Example:

```
{{ WorkflowDefinitionVersionId }}
```

#### WorkflowDefinitionVersion

The `WorkflowDefinitionVersion` object provides access to the workflow definition version of the currently executing workflow. Example:

```
{{ WorkflowDefinitionVersion }}
```

#### CorrelationId

The `CorrelationId` object provides access to the correlation ID of the currently executing workflow. Example:

```liquid
{{ CorrelationId }}
```

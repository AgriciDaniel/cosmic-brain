---
description: >-
  This section explains how to configure Elsa to use more workers.
---

# Worker count

## Configuration <a href="#configuration" id="configuration"></a>

To configure the number of workers that Elsa uses internally, you can override the `MediatorOptions` configuration setting. For example, in your `Program.cs` file:

```csharp
builder.Services.Configure<MediatorOptions>(opt =>
{
    opt.CommandWorkerCount = 16;
    opt.JobWorkerCount = 16;
    opt.NotificationWorkerCount = 16;
});
```

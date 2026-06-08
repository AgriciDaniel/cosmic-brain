---
description: Comprehensive guide to testing and debugging workflows in Elsa Workflows, covering unit testing, integration testing, debugging techniques, test data management, CI/CD integration, and best practices.
---

# Testing & Debugging Workflows

Testing and debugging workflows is crucial for building reliable, production-ready workflow systems. This guide covers comprehensive strategies for testing workflows with xUnit and Elsa.Testing, integration testing patterns, debugging techniques, and best practices for workflow testing in Elsa V3.

## Why Test Workflows? <a href="#why-test-workflows" id="why-test-workflows"></a>

Workflows often contain critical business logic that needs to be reliable and maintainable. Testing workflows provides:

- **Confidence**: Ensure workflows behave correctly before deployment
- **Regression Prevention**: Catch breaking changes early
- **Documentation**: Tests serve as executable documentation
- **Refactoring Safety**: Make changes without fear of breaking functionality
- **Quality Assurance**: Validate business rules and edge cases

## Unit Testing Workflows <a href="#unit-testing-workflows" id="unit-testing-workflows"></a>

Unit testing workflows involves testing individual workflows or activities in isolation. Elsa provides the `Elsa.Testing` package to make this process straightforward.

### Setting Up Your Test Project <a href="#setup-test-project" id="setup-test-project"></a>

{% stepper %}
{% step %}
#### Create Test Project

Create a new xUnit test project and add the necessary packages:

```bash
dotnet new xunit -n "MyWorkflows.Tests"
cd MyWorkflows.Tests
dotnet add package Elsa
dotnet add package Elsa.Testing.Shared
dotnet add package Microsoft.Extensions.DependencyInjection
dotnet add package xunit
dotnet add package xunit.runner.visualstudio
```
{% endstep %}

{% step %}
#### Configure Test Infrastructure

Create a base test class to set up the Elsa service container:

{% code title="WorkflowTestBase.cs" %}
```csharp
using Elsa.Extensions;
using Elsa.Testing.Shared;
using Elsa.Workflows.Contracts;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace MyWorkflows.Tests;

public abstract class WorkflowTestBase : IAsyncLifetime
{
    protected IServiceProvider Services { get; private set; } = default!;
    
    public virtual async Task InitializeAsync()
    {
        var services = new ServiceCollection();
        
        // Add Elsa services
        services.AddElsa();
        
        // Add custom activities or services
        ConfigureServices(services);
        
        // Build the service provider
        Services = services.BuildServiceProvider();
        
        // Populate registries (required for non-hosted scenarios)
        await Services.PopulateRegistriesAsync();
    }
    
    protected virtual void ConfigureServices(IServiceCollection services)
    {
        // Override in derived classes to add custom services
    }
    
    public virtual Task DisposeAsync()
    {
        if (Services is IDisposable disposable)
            disposable.Dispose();
        
        return Task.CompletedTask;
    }
    
    protected async Task<WorkflowState> RunWorkflowAsync(Workflow workflow, IDictionary<string, object>? input = null, CancellationToken cancellationToken = default)
    {
        var workflowRunner = Services.GetRequiredService<IWorkflowRunner>();
        var result = await workflowRunner.RunAsync(workflow, input, cancellationToken);
        return result;
    }
}
```
{% endcode %}
{% endstep %}
{% endstepper %}

### Testing a Simple Workflow <a href="#test-simple-workflow" id="test-simple-workflow"></a>

Here's an example of testing a workflow that validates and processes user input:

{% code title="UserValidationWorkflowTests.cs" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Models;
using FluentAssertions;
using Xunit;

namespace MyWorkflows.Tests;

public class UserValidationWorkflowTests : WorkflowTestBase
{
    [Fact]
    public async Task ValidUser_ShouldCompleteSuccessfully()
    {
        // Arrange
        var workflow = new Workflow
        {
            Root = new Sequence
            {
                Activities =
                {
                    new SetVariable
                    {
                        Variable = new Variable<string>("Email"),
                        Value = new Input<string>("user@example.com")
                    },
                    new If
                    {
                        Condition = new Input<bool>(context => 
                        {
                            var email = context.GetVariable<string>("Email");
                            return !string.IsNullOrEmpty(email) && email.Contains("@");
                        }),
                        Then = new WriteLine
                        {
                            Text = new Input<string>("Valid email")
                        },
                        Else = new WriteLine
                        {
                            Text = new Input<string>("Invalid email")
                        }
                    }
                }
            }
        };
        
        // Act
        var result = await RunWorkflowAsync(workflow);
        
        // Assert
        result.Status.Should().Be(WorkflowStatus.Finished);
        result.SubStatus.Should().Be(WorkflowSubStatus.Finished);
    }
    
    [Theory]
    [InlineData("")]
    [InlineData("invalid-email")]
    [InlineData("exampledotcom")]
    public async Task InvalidEmail_ShouldTakeElseBranch(string email)
    {
        // Arrange
        var executedBranch = "";
        var workflow = new Workflow
        {
            Root = new Sequence
            {
                Activities =
                {
                    new SetVariable
                    {
                        Variable = new Variable<string>("Email"),
                        Value = new Input<string>(email)
                    },
                    new If
                    {
                        Condition = new Input<bool>(context => 
                        {
                            var emailValue = context.GetVariable<string>("Email");
                            return !string.IsNullOrEmpty(emailValue) && emailValue.Contains("@");
                        }),
                        Then = new Inline(context => executedBranch = "Then"),
                        Else = new Inline(context => executedBranch = "Else")
                    }
                }
            }
        };
        
        // Act
        await RunWorkflowAsync(workflow);
        
        // Assert
        executedBranch.Should().Be("Else");
    }
}
```
{% endcode %}

### Testing Custom Activities <a href="#test-custom-activities" id="test-custom-activities"></a>

When testing custom activities, focus on testing the activity's logic in isolation:

{% code title="CustomActivityTests.cs" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Models;
using FluentAssertions;
using Xunit;

namespace MyWorkflows.Tests;

public class CustomActivityTests : WorkflowTestBase
{
    [Fact]
    public async Task SendEmail_WithValidRecipient_ShouldSucceed()
    {
        // Arrange
        var emailSent = false;
        var sendEmailActivity = new SendEmailActivity
        {
            To = new Input<string>("user@example.com"),
            Subject = new Input<string>("Test Subject"),
            Body = new Input<string>("Test Body"),
            OnEmailSent = () => emailSent = true
        };
        
        var workflow = new Workflow
        {
            Root = sendEmailActivity
        };
        
        // Act
        var result = await RunWorkflowAsync(workflow);
        
        // Assert
        result.Status.Should().Be(WorkflowStatus.Finished);
        emailSent.Should().BeTrue();
    }
    
    [Fact]
    public async Task SendEmail_WithInvalidRecipient_ShouldFail()
    {
        // Arrange
        var sendEmailActivity = new SendEmailActivity
        {
            To = new Input<string>("invalid-email"),
            Subject = new Input<string>("Test Subject"),
            Body = new Input<string>("Test Body")
        };
        
        var workflow = new Workflow
        {
            Root = sendEmailActivity
        };
        
        // Act
        var result = await RunWorkflowAsync(workflow);
        
        // Assert
        result.Status.Should().Be(WorkflowStatus.Faulted);
    }
}

// Example custom activity for testing
public class SendEmailActivity : CodeActivity
{
    public Input<string> To { get; set; } = default!;
    public Input<string> Subject { get; set; } = default!;
    public Input<string> Body { get; set; } = default!;
    public Action? OnEmailSent { get; set; }
    
    protected override void Execute(ActivityExecutionContext context)
    {
        var to = To.Get(context);
        
        if (string.IsNullOrEmpty(to) || !to.Contains("@"))
        {
            throw new InvalidOperationException("Invalid email address");
        }
        
        // Simulate sending email
        OnEmailSent?.Invoke();
    }
}
```
{% endcode %}

### Testing Workflow Inputs and Outputs <a href="#test-inputs-outputs" id="test-inputs-outputs"></a>

Test workflows with various input combinations and verify outputs:

{% code title="WorkflowInputOutputTests.cs" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Models;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace MyWorkflows.Tests;

public class WorkflowInputOutputTests : WorkflowTestBase
{
    [Fact]
    public async Task Workflow_WithInput_ShouldProduceExpectedOutput()
    {
        // Arrange
        var workflow = new Workflow
        {
            Root = new Sequence
            {
                Activities =
                {
                    new SetVariable
                    {
                        Variable = new Variable<int>("InputValue"),
                        Value = new Input<int>(context => 
                            context.GetInput<int>("value"))
                    },
                    new SetVariable
                    {
                        Variable = new Variable<int>("Result"),
                        Value = new Input<int>(context => 
                            context.GetVariable<int>("InputValue") * 2)
                    },
                    new SetOutput
                    {
                        OutputName = "Result",
                        OutputValue = new Input<object?>(context => 
                            context.GetVariable<int>("Result"))
                    }
                }
            }
        };
        
        var input = new Dictionary<string, object>
        {
            ["value"] = 5
        };
        
        // Act
        var result = await RunWorkflowAsync(workflow, input);
        
        // Assert
        result.Status.Should().Be(WorkflowStatus.Finished);
        var output = result.Output;
        output.Should().ContainKey("Result");
        output["Result"].Should().Be(10);
    }
}
```
{% endcode %}

### Using Elsa's Official Testing Helpers <a href="#elsa-testing-helpers" id="elsa-testing-helpers"></a>

Elsa provides official testing helper packages that simplify test setup and execution. These are the recommended approaches used in the elsa-core repository.

#### ActivityTestFixture for Unit Testing Activities <a href="#activity-test-fixture" id="activity-test-fixture"></a>

The `ActivityTestFixture` from `Elsa.Testing.Shared` package is the recommended way to unit test individual activities:

{% code title="UsingActivityTestFixture.cs" %}
```csharp
using Elsa.Testing.Shared;
using Xunit;

namespace MyWorkflows.Tests;

public class MyActivityUnitTests
{
    [Fact]
    public async Task MyActivity_Executes_Successfully()
    {
        // Arrange
        var activity = new MyCustomActivity
        {
            InputProperty = new Input<string>("test value")
        };

        // Act - ActivityTestFixture handles all setup
        var fixture = new ActivityTestFixture(activity);
        var context = await fixture.ExecuteAsync();

        // Assert - Check activity behavior in isolation
        Assert.Equal(ActivityStatus.Completed, context.Status);
    }
}
```
{% endcode %}

#### WorkflowTestFixture for Integration Testing <a href="#workflow-test-fixture" id="workflow-test-fixture"></a>

The `WorkflowTestFixture` from `Elsa.Testing.Shared.Integration` provides a complete test infrastructure with proper service setup:

{% code title="UsingWorkflowTestFixture.cs" %}
```csharp
using Elsa.Testing.Shared.Integration;
using Xunit;
using Xunit.Abstractions;

namespace MyWorkflows.Tests.Integration;

public class MyActivityIntegrationTests
{
    private readonly WorkflowTestFixture _fixture;

    public MyActivityIntegrationTests(ITestOutputHelper testOutputHelper)
    {
        _fixture = new WorkflowTestFixture(testOutputHelper);
    }

    [Fact]
    public async Task Activity_Completes_Successfully()
    {
        // Arrange
        var activity = new MyActivity { Input = new("test") };

        // Act - Runs activity in a complete workflow context
        var result = await _fixture.RunActivityAsync(activity);

        // Assert
        Assert.Equal(WorkflowStatus.Finished, result.WorkflowState.Status);
        
        // Check specific activity status
        var activityStatus = _fixture.GetActivityStatus(result, activity);
        Assert.Equal(ActivityStatus.Completed, activityStatus);
    }
}
```
{% endcode %}

#### Creating Execution Contexts <a href="#execution-contexts" id="execution-contexts"></a>

`WorkflowTestFixture` provides methods to create execution contexts at different levels:

{% code title="CreatingExecutionContexts.cs" %}
```csharp
// Create a workflow execution context
var workflowContext = await _fixture.CreateWorkflowExecutionContextAsync(
    variables: new[]
    {
        new Variable<int>("Counter", 0)
    });

// Create an activity execution context
var activityContext = await _fixture.CreateActivityExecutionContextAsync(
    activity: myActivity,
    variables: new[] { new Variable<string>("MyVar", "value") }
);

// Create an expression execution context for testing expressions
var expressionContext = await _fixture.CreateExpressionExecutionContextAsync(new[]
{
    new Variable<string>("MyVariable", "test value")
});

// Variables are accessible via dynamic accessors (e.g., getMyVariable(), setMyVariable())
var evaluator = _fixture.Services.GetRequiredService<IJavaScriptEvaluator>();
var script = @"
    setMyVariable('updated value');
    return getMyVariable();
";
var result = await evaluator.EvaluateAsync(script, typeof(string), expressionContext);
```
{% endcode %}

#### Testing Async Workflows <a href="#async-workflows" id="async-workflows"></a>

For workflows that complete asynchronously (with timers, external triggers, etc.), use `AsyncWorkflowRunner`:

{% code title="TestingAsyncWorkflows.cs" %}
```csharp
using Elsa.Workflows.ComponentTests.Helpers.Services;
using Xunit;
using Xunit.Abstractions;

public class AsyncWorkflowTests
{
    private readonly ITestOutputHelper _testOutput;
    
    public AsyncWorkflowTests(ITestOutputHelper testOutput)
    {
        _testOutput = testOutput;
    }

    [Fact]
    public async Task AsyncWorkflow_Completes_Successfully()
    {
        // Arrange
        var sp = new TestApplicationBuilder(_testOutput).Build();
        var runner = sp.GetRequiredService<AsyncWorkflowRunner>();

        // Act - Waits for workflow completion with timeout
        var result = await runner.RunAndAwaitWorkflowCompletionAsync(
            WorkflowDefinitionHandle.ByDefinitionId(workflowId, VersionOptions.Published)
        );

        // Assert
        result.WorkflowExecutionContext.Status.Should().Be(WorkflowStatus.Finished);
        result.ActivityExecutionRecords.Should().HaveCount(expectedCount);
    }
}
```
{% endcode %}

`AsyncWorkflowRunner` tracks activity execution records and properly awaits workflow completion signals, making it ideal for deterministic testing of asynchronous workflow behavior.

## Integration Testing <a href="#integration-testing" id="integration-testing"></a>

Integration tests verify that workflows work correctly with external dependencies like databases, message queues, and HTTP services.

### Testing with TestContainers <a href="#testcontainers" id="testcontainers"></a>

TestContainers allows you to run real dependencies in Docker containers during tests:

{% stepper %}
{% step %}
#### Install TestContainers

```bash
dotnet add package Testcontainers
dotnet add package Testcontainers.PostgreSql
dotnet add package Testcontainers.RabbitMq
```
{% endstep %}

{% step %}
#### Create Integration Test Base

{% code title="IntegrationTestBase.cs" %}
```csharp
using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using Elsa.Persistence.EFCore.Extensions;
using Elsa.Persistence.EFCore.Modules.Management;
using Elsa.Persistence.EFCore.Modules.Runtime;
using Elsa.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;
using Xunit;

namespace MyWorkflows.Tests.Integration;

public abstract class IntegrationTestBase : IAsyncLifetime
{
    private PostgreSqlContainer? _postgresContainer;
    protected IServiceProvider Services { get; private set; } = default!;
    protected string ConnectionString { get; private set; } = default!;
    
    public virtual async Task InitializeAsync()
    {
        // Start PostgreSQL container
        _postgresContainer = new PostgreSqlBuilder()
            .WithImage("postgres:15")
            .WithDatabase("elsa_test")
            .WithUsername("elsa")
            .WithPassword("elsa")
            .Build();
        
        await _postgresContainer.StartAsync();
        ConnectionString = _postgresContainer.GetConnectionString();
        
        // Configure services
        var services = new ServiceCollection();
        
        services.AddElsa(elsa =>
        {
            elsa.UseWorkflowManagement(management =>
            {
                management.UseEntityFrameworkCore(ef =>
                    ef.UsePostgreSql(ConnectionString));
            });
            
            elsa.UseWorkflowRuntime(runtime =>
            {
                runtime.UseEntityFrameworkCore(ef =>
                    ef.UsePostgreSql(ConnectionString));
            });
        });
        
        ConfigureServices(services);
        
        Services = services.BuildServiceProvider();
        
        // Populate registries and run migrations
        await Services.PopulateRegistriesAsync();
        await Services.RunMigrationsAsync();
    }
    
    protected virtual void ConfigureServices(IServiceCollection services)
    {
        // Override in derived classes
    }
    
    public virtual async Task DisposeAsync()
    {
        if (Services is IDisposable disposable)
            disposable.Dispose();
        
        if (_postgresContainer != null)
            await _postgresContainer.DisposeAsync();
    }
}
```
{% endcode %}
{% endstep %}

{% step %}
#### Write Integration Tests

{% code title="WorkflowPersistenceTests.cs" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Management;
using Elsa.Workflows.Models;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace MyWorkflows.Tests.Integration;

public class WorkflowPersistenceTests : IntegrationTestBase
{
    [Fact]
    public async Task SaveAndLoadWorkflow_ShouldPersistCorrectly()
    {
        // Arrange
        var workflowDefinitionService = Services.GetRequiredService<IWorkflowDefinitionService>();
        
        var workflow = new WorkflowDefinition
        {
            DefinitionId = "test-workflow",
            Name = "Test Workflow",
            Version = 1,
            IsLatest = true,
            IsPublished = true
        };
        
        // Act - Save
        await workflowDefinitionService.SaveAsync(workflow, CancellationToken.None);
        
        // Act - Load
        var loadedWorkflow = await workflowDefinitionService
            .FindByDefinitionIdAsync("test-workflow", CancellationToken.None);
        
        // Assert
        loadedWorkflow.Should().NotBeNull();
        loadedWorkflow!.Name.Should().Be("Test Workflow");
        loadedWorkflow.Version.Should().Be(1);
    }
    
    [Fact]
    public async Task ExecutePersistedWorkflow_ShouldComplete()
    {
        // Arrange
        var workflowDefinitionService = Services.GetRequiredService<IWorkflowDefinitionService>();
        var workflowRunner = Services.GetRequiredService<IWorkflowRunner>();
        
        var workflow = new Workflow
        {
            Identity = new WorkflowIdentity
            {
                DefinitionId = "simple-workflow",
                Version = 1
            },
            Root = new WriteLine
            {
                Text = new Input<string>("Integration test workflow")
            }
        };
        
        // Save workflow definition
        var definition = await workflowDefinitionService.SaveAsync(workflow, CancellationToken.None);
        
        // Act - Execute
        var result = await workflowRunner.RunAsync(workflow);
        
        // Assert
        result.Status.Should().Be(WorkflowStatus.Finished);
    }
}
```
{% endcode %}
{% endstep %}
{% endstepper %}

### Testing HTTP Workflows <a href="#test-http-workflows" id="test-http-workflows"></a>

Use ASP.NET Core's test server for testing HTTP-triggered workflows:

{% code title="HttpWorkflowTests.cs" %}
```csharp
using Elsa.Extensions;
using Elsa.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Xunit;

namespace MyWorkflows.Tests.Integration;

public class HttpWorkflowTests : IAsyncLifetime
{
    private IHost? _host;
    private HttpClient? _client;
    
    public async Task InitializeAsync()
    {
        var hostBuilder = new HostBuilder()
            .ConfigureWebHost(webHost =>
            {
                webHost.UseTestServer();
                webHost.ConfigureServices(services =>
                {
                    services.AddElsa(elsa =>
                    {
                        elsa.UseHttp();
                        elsa.UseWorkflowRuntime();
                    });
                });
                webHost.Configure(app =>
                {
                    app.UseRouting();
                    app.UseWorkflowsApi();
                });
            });
        
        _host = await hostBuilder.StartAsync();
        _client = _host.GetTestClient();
    }
    
    [Fact]
    public async Task HttpEndpoint_WithValidRequest_ShouldReturnSuccess()
    {
        // Arrange
        var request = new { name = "Test User" };
        
        // Act
        var response = await _client!.PostAsJsonAsync("/workflows/user-registration", request);
        
        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().Contain("success");
    }
    
    public async Task DisposeAsync()
    {
        _client?.Dispose();
        if (_host != null)
            await _host.StopAsync();
    }
}
```
{% endcode %}

### Testing with In-Memory Databases <a href="#in-memory-db" id="in-memory-db"></a>

For faster tests, use Entity Framework Core's in-memory database:

{% code title="InMemoryTestBase.cs" %}
```csharp
using Elsa.Persistence.EFCore.Extensions;
using Elsa.Persistence.EFCore.Modules.Management;
using Elsa.Persistence.EFCore.Modules.Runtime;
using Elsa.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace MyWorkflows.Tests.Integration;

public abstract class InMemoryTestBase : IAsyncLifetime
{
    protected IServiceProvider Services { get; private set; } = default!;
    
    public virtual async Task InitializeAsync()
    {
        var services = new ServiceCollection();
        
        services.AddElsa(elsa =>
        {
            elsa.UseWorkflowManagement(management =>
            {
                management.UseEntityFrameworkCore(ef =>
                    ef.UseInMemory());
            });
            
            elsa.UseWorkflowRuntime(runtime =>
            {
                runtime.UseEntityFrameworkCore(ef =>
                    ef.UseInMemory());
            });
        });
        
        ConfigureServices(services);
        
        Services = services.BuildServiceProvider();
        await Services.PopulateRegistriesAsync();
    }
    
    protected virtual void ConfigureServices(IServiceCollection services)
    {
        // Override in derived classes
    }
    
    public virtual Task DisposeAsync()
    {
        if (Services is IDisposable disposable)
            disposable.Dispose();
        
        return Task.CompletedTask;
    }
}
```
{% endcode %}

## Debugging Workflow Execution <a href="#debugging" id="debugging"></a>

Debugging workflows requires understanding execution flow, state, and activity behavior.

### Using the Execution Journal <a href="#execution-journal" id="execution-journal"></a>

The execution journal records every activity execution, providing a complete audit trail:

{% code title="ViewExecutionJournal.cs" %}
```csharp
using Elsa.Workflows.Contracts;
using Elsa.Workflows.State;
using Microsoft.Extensions.DependencyInjection;

// After executing a workflow
var workflowRunner = serviceProvider.GetRequiredService<IWorkflowRunner>();
var result = await workflowRunner.RunAsync(workflow);

// Access the execution journal
var journal = result.WorkflowState.ExecutionLog;

foreach (var entry in journal)
{
    Console.WriteLine($"Activity: {entry.ActivityId}");
    Console.WriteLine($"Event: {entry.EventName}");
    Console.WriteLine($"Timestamp: {entry.Timestamp}");
    Console.WriteLine($"State: {entry.Payload}");
    Console.WriteLine("---");
}
```
{% endcode %}

### Logging Workflow Execution <a href="#logging" id="logging"></a>

Configure structured logging to debug workflows:

{% code title="ConfigureLogging.cs" %}
```csharp
using Elsa.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;

var services = new ServiceCollection();

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.File("logs/elsa-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

services.AddLogging(builder =>
{
    builder.ClearProviders();
    builder.AddSerilog(dispose: true);
});

services.AddElsa(elsa =>
{
    // Enable workflow execution logging
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.EnableExecutionLogging = true;
    });
});
```
{% endcode %}

### Using WriteLine Activity for Debugging <a href="#writeline-debug" id="writeline-debug"></a>

Insert `WriteLine` activities to trace execution flow:

{% code title="DebugWorkflow.cs" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Models;

var workflow = new Workflow
{
    Root = new Sequence
    {
        Activities =
        {
            new WriteLine { Text = new Input<string>("DEBUG: Starting workflow") },
            
            new SetVariable
            {
                Variable = new Variable<int>("Counter"),
                Value = new Input<int>(0)
            },
            
            new WriteLine 
            { 
                Text = new Input<string>(context => 
                    $"DEBUG: Counter value = {context.GetVariable<int>("Counter")}")
            },
            
            new ForEach<int>
            {
                Items = new Input<ICollection<int>>([1, 2, 3, 4, 5]),
                Body = new Sequence
                {
                    Activities =
                    {
                        new WriteLine 
                        { 
                            Text = new Input<string>(context =>
                                $"DEBUG: Processing item {context.GetVariable<int>("CurrentValue")}")
                        },
                        new SetVariable
                        {
                            Variable = new Variable<int>("Counter"),
                            Value = new Input<int>(context => 
                                context.GetVariable<int>("Counter") + 1)
                        }
                    }
                }
            },
            
            new WriteLine 
            { 
                Text = new Input<string>(context =>
                    $"DEBUG: Final counter = {context.GetVariable<int>("Counter")}")
            },
            
            new WriteLine { Text = new Input<string>("DEBUG: Workflow completed") }
        }
    }
};
```
{% endcode %}

### Debugging with Breakpoints <a href="#breakpoints" id="breakpoints"></a>

Create a custom breakpoint activity for debugging:

{% code title="BreakpointActivity.cs" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;
using System.Diagnostics;

[Activity("Debugging", "Diagnostics", "Pauses workflow execution at this point for debugging")]
public class Breakpoint : CodeActivity
{
    [Input(Description = "Message to display at breakpoint")]
    public Input<string> Message { get; set; } = new("Breakpoint reached");
    
    [Input(Description = "Enable this breakpoint")]
    public Input<bool> Enabled { get; set; } = new(true);
    
    protected override void Execute(ActivityExecutionContext context)
    {
        var enabled = Enabled.Get(context);
        
        if (!enabled)
            return;
        
        var message = Message.Get(context);
        
        // Display workflow state
        Console.WriteLine($"=== BREAKPOINT ===");
        Console.WriteLine($"Message: {message}");
        Console.WriteLine($"Activity: {context.Activity.Id}");
        Console.WriteLine($"Workflow: {context.WorkflowExecutionContext.Id}");
        
        // Display variables
        Console.WriteLine("Variables:");
        var variables = context.ExpressionExecutionContext.Memory.Variables;
        foreach (var variable in variables)
        {
            Console.WriteLine($"  {variable.Key} = {variable.Value}");
        }
        
        // Launch debugger if attached
        if (Debugger.IsAttached)
        {
            Debugger.Break();
        }
        else
        {
            Console.WriteLine("Press any key to continue...");
            Console.ReadKey();
        }
        
        Console.WriteLine("=== CONTINUING ===");
    }
}
```
{% endcode %}

### Inspecting Workflow State <a href="#inspect-state" id="inspect-state"></a>

Access and inspect workflow state during execution:

{% code title="InspectWorkflowState.cs" %}
```csharp
using Elsa.Workflows.Contracts;
using Elsa.Workflows.State;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

public static async Task InspectWorkflowState(IServiceProvider services, string workflowInstanceId)
{
    var workflowStateStore = services.GetRequiredService<IWorkflowStateStore>();
    
    // Load workflow state
    var workflowState = await workflowStateStore.LoadAsync(workflowInstanceId);
    
    if (workflowState == null)
    {
        Console.WriteLine("Workflow state not found");
        return;
    }
    
    Console.WriteLine($"Workflow ID: {workflowState.Id}");
    Console.WriteLine($"Status: {workflowState.Status}");
    Console.WriteLine($"Sub Status: {workflowState.SubStatus}");
    
    // Inspect variables
    Console.WriteLine("\nVariables:");
    foreach (var variable in workflowState.Properties)
    {
        Console.WriteLine($"  {variable.Key} = {JsonSerializer.Serialize(variable.Value)}");
    }
    
    // Inspect bookmarks
    Console.WriteLine("\nBookmarks:");
    foreach (var bookmark in workflowState.Bookmarks)
    {
        Console.WriteLine($"  Activity: {bookmark.ActivityId}");
        Console.WriteLine($"  Name: {bookmark.Name}");
        Console.WriteLine($"  Payload: {JsonSerializer.Serialize(bookmark.Payload)}");
    }
    
    // Inspect scheduled activities
    Console.WriteLine("\nScheduled Activities:");
    foreach (var scheduledActivity in workflowState.ScheduledActivities)
    {
        Console.WriteLine($"  Activity: {scheduledActivity.ActivityId}");
        Console.WriteLine($"  Owner: {scheduledActivity.OwnerId}");
    }
}
```
{% endcode %}

### Debug Workflow Failures <a href="#debug-failures" id="debug-failures"></a>

Handle and debug faulted workflows:

{% code title="DebugFailures.cs" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Contracts;
using Elsa.Workflows.Models;
using Microsoft.Extensions.DependencyInjection;

public static async Task DebugFailedWorkflow(IServiceProvider services)
{
    var workflowRunner = services.GetRequiredService<IWorkflowRunner>();
    
    var workflow = new Workflow
    {
        Root = new Sequence
        {
            Activities =
            {
                new WriteLine { Text = new Input<string>("Before fault") },
                new Fault
                {
                    Message = new Input<string>("Something went wrong!")
                },
                new WriteLine { Text = new Input<string>("After fault (won't execute)") }
            }
        }
    };
    
    try
    {
        var result = await workflowRunner.RunAsync(workflow);
        
        if (result.Status == WorkflowStatus.Faulted)
        {
            Console.WriteLine("Workflow faulted!");
            
            // Get fault information
            var incidents = result.WorkflowState.Incidents;
            foreach (var incident in incidents)
            {
                Console.WriteLine($"Incident: {incident.Message}");
                Console.WriteLine($"Activity: {incident.ActivityId}");
                Console.WriteLine($"Exception: {incident.Exception}");
            }
            
            // Examine execution log to see what happened
            foreach (var logEntry in result.WorkflowState.ExecutionLog)
            {
                Console.WriteLine($"{logEntry.Timestamp}: {logEntry.EventName} - {logEntry.ActivityId}");
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Exception during workflow execution: {ex.Message}");
        Console.WriteLine($"Stack trace: {ex.StackTrace}");
    }
}
```
{% endcode %}

### Testing Faulted Workflows <a href="#testing-faulted" id="testing-faulted"></a>

When testing error scenarios, verify that workflows and activities fault correctly:

{% code title="TestingFaultedWorkflows.cs" %}
```csharp
using Elsa.Testing.Shared.Integration;
using Xunit;

public class FaultHandlingTests
{
    private readonly WorkflowTestFixture _fixture;

    public FaultHandlingTests(ITestOutputHelper testOutputHelper)
    {
        _fixture = new WorkflowTestFixture(testOutputHelper);
    }

    [Fact]
    public async Task Activity_That_Throws_Should_Fault()
    {
        // Arrange
        var activity = new ActivityThatThrows();

        // Act
        var result = await _fixture.RunActivityAsync(activity);

        // Assert - Check specific activity status, not just workflow status
        var activityStatus = _fixture.GetActivityStatus(result, activity);
        Assert.Equal(ActivityStatus.Faulted, activityStatus);
    }

    [Fact]
    public async Task Workflow_With_Fault_Should_Have_Incidents()
    {
        // Arrange
        var workflow = new Workflow
        {
            Root = new Sequence
            {
                Activities =
                {
                    new WriteLine { Text = new Input<string>("Before fault") },
                    new Fault { Message = new Input<string>("Intentional failure") }
                }
            }
        };

        // Act
        var result = await _fixture.RunWorkflowAsync(workflow);

        // Assert
        Assert.Equal(WorkflowStatus.Faulted, result.WorkflowState.Status);
        Assert.NotEmpty(result.WorkflowState.Incidents);
        
        var incident = result.WorkflowState.Incidents.First();
        Assert.Contains("Intentional failure", incident.Message);
    }
}
```
{% endcode %}

When testing fault scenarios, prefer using `_fixture.GetActivityStatus(result, activity)` to check if a specific activity faulted, rather than only checking the workflow-level status. This provides more granular test assertions.

## Test Data Management <a href="#test-data-management" id="test-data-management"></a>

Effective test data management ensures reliable and maintainable tests.

### Test Data Builders <a href="#test-data-builders" id="test-data-builders"></a>

Use the builder pattern to create test data:

{% code title="WorkflowBuilder.cs" %}
```csharp
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Models;

public class TestWorkflowBuilder
{
    private readonly List<IActivity> _activities = new();
    private string _definitionId = Guid.NewGuid().ToString();
    private string _name = "Test Workflow";
    
    public TestWorkflowBuilder WithDefinitionId(string definitionId)
    {
        _definitionId = definitionId;
        return this;
    }
    
    public TestWorkflowBuilder WithName(string name)
    {
        _name = name;
        return this;
    }
    
    public TestWorkflowBuilder AddActivity(IActivity activity)
    {
        _activities.Add(activity);
        return this;
    }
    
    public TestWorkflowBuilder AddWriteLine(string text)
    {
        _activities.Add(new WriteLine { Text = new Input<string>(text) });
        return this;
    }
    
    public TestWorkflowBuilder AddSetVariable(string variableName, object value)
    {
        _activities.Add(new SetVariable
        {
            Variable = new Variable<object>(variableName),
            Value = new Input<object>(value)
        });
        return this;
    }
    
    public Workflow Build()
    {
        return new Workflow
        {
            Identity = new WorkflowIdentity
            {
                DefinitionId = _definitionId
            },
            Name = _name,
            Root = new Sequence
            {
                Activities = _activities
            }
        };
    }
}

// Usage
var workflow = new TestWorkflowBuilder()
    .WithDefinitionId("test-workflow-1")
    .WithName("My Test Workflow")
    .AddWriteLine("Starting")
    .AddSetVariable("Counter", 0)
    .AddWriteLine("Complete")
    .Build();
```
{% endcode %}

### Test Fixtures <a href="#test-fixtures" id="test-fixtures"></a>

Use xUnit class fixtures for shared test data:

{% code title="WorkflowTestFixture.cs" %}
```csharp
using Elsa.Extensions;
using Elsa.Testing.Shared;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

public class WorkflowTestFixture : IAsyncLifetime
{
    public IServiceProvider Services { get; private set; } = default!;
    
    // Shared test workflows
    public Workflow SimpleWorkflow { get; private set; } = default!;
    public Workflow ComplexWorkflow { get; private set; } = default!;
    
    public async Task InitializeAsync()
    {
        var services = new ServiceCollection();
        services.AddElsa();
        Services = services.BuildServiceProvider();
        await Services.PopulateRegistriesAsync();
        
        // Initialize shared test workflows
        SimpleWorkflow = CreateSimpleWorkflow();
        ComplexWorkflow = CreateComplexWorkflow();
    }
    
    private Workflow CreateSimpleWorkflow()
    {
        return new TestWorkflowBuilder()
            .WithDefinitionId("simple-workflow")
            .AddWriteLine("Simple test")
            .Build();
    }
    
    private Workflow CreateComplexWorkflow()
    {
        return new TestWorkflowBuilder()
            .WithDefinitionId("complex-workflow")
            .AddWriteLine("Start")
            .AddSetVariable("Value", 100)
            .AddWriteLine("End")
            .Build();
    }
    
    public Task DisposeAsync()
    {
        if (Services is IDisposable disposable)
            disposable.Dispose();
        
        return Task.CompletedTask;
    }
}

// Use in test classes
public class MyWorkflowTests : IClassFixture<WorkflowTestFixture>
{
    private readonly WorkflowTestFixture _fixture;
    
    public MyWorkflowTests(WorkflowTestFixture fixture)
    {
        _fixture = fixture;
    }
    
    [Fact]
    public async Task SimpleWorkflow_ShouldExecute()
    {
        var runner = _fixture.Services.GetRequiredService<IWorkflowRunner>();
        var result = await runner.RunAsync(_fixture.SimpleWorkflow);
        result.Status.Should().Be(WorkflowStatus.Finished);
    }
}
```
{% endcode %}

### Parameterized Tests <a href="#parameterized-tests" id="parameterized-tests"></a>

Use `Theory` and `InlineData` for data-driven tests:

{% code title="ParameterizedTests.cs" %}
```csharp
using Xunit;
using FluentAssertions;

public class CalculationWorkflowTests : WorkflowTestBase
{
    [Theory]
    [InlineData(5, 10, 15)]
    [InlineData(0, 0, 0)]
    [InlineData(-5, 5, 0)]
    [InlineData(100, 200, 300)]
    public async Task AddNumbers_WithVariousInputs_ShouldReturnCorrectSum(
        int a, int b, int expected)
    {
        // Arrange
        var workflow = CreateAdditionWorkflow();
        var input = new Dictionary<string, object>
        {
            ["a"] = a,
            ["b"] = b
        };
        
        // Act
        var result = await RunWorkflowAsync(workflow, input);
        
        // Assert
        result.Output["sum"].Should().Be(expected);
    }
    
    private Workflow CreateAdditionWorkflow()
    {
        return new Workflow
        {
            Root = new Sequence
            {
                Activities =
                {
                    new SetVariable
                    {
                        Variable = new Variable<int>("A"),
                        Value = new Input<int>(context => context.GetInput<int>("a"))
                    },
                    new SetVariable
                    {
                        Variable = new Variable<int>("B"),
                        Value = new Input<int>(context => context.GetInput<int>("b"))
                    },
                    new SetVariable
                    {
                        Variable = new Variable<int>("Sum"),
                        Value = new Input<int>(context => 
                            context.GetVariable<int>("A") + context.GetVariable<int>("B"))
                    },
                    new SetOutput
                    {
                        OutputName = "sum",
                        OutputValue = new Input<object?>(context => 
                            context.GetVariable<int>("Sum"))
                    }
                }
            }
        };
    }
    
    [Theory]
    [MemberData(nameof(GetComplexTestData))]
    public async Task ComplexCalculation_WithTestData_ShouldSucceed(
        ComplexInput input, ComplexOutput expectedOutput)
    {
        // Test implementation
    }
    
    public static IEnumerable<object[]> GetComplexTestData()
    {
        yield return new object[]
        {
            new ComplexInput { X = 1, Y = 2, Z = 3 },
            new ComplexOutput { Result = 6, Status = "Success" }
        };
        
        yield return new object[]
        {
            new ComplexInput { X = 0, Y = 0, Z = 0 },
            new ComplexOutput { Result = 0, Status = "Success" }
        };
    }
}

public record ComplexInput(int X, int Y, int Z);
public record ComplexOutput(int Result, string Status);
```
{% endcode %}

## CI/CD Integration <a href="#ci-cd-integration" id="ci-cd-integration"></a>

Integrate workflow tests into your CI/CD pipeline for automated testing.

### GitHub Actions <a href="#github-actions" id="github-actions"></a>

{% code title=".github/workflows/test.yml" %}
```yaml
name: Workflow Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: elsa_test
          POSTGRES_USER: elsa
          POSTGRES_PASSWORD: elsa
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --no-restore --configuration Release
    
    - name: Run Unit Tests
      run: dotnet test --no-build --configuration Release --filter "Category=Unit" --logger "trx;LogFileName=unit-tests.trx"
    
    - name: Run Integration Tests
      env:
        ConnectionStrings__Elsa: "Host=localhost;Port=5432;Database=elsa_test;Username=elsa;Password=elsa"
      run: dotnet test --no-build --configuration Release --filter "Category=Integration" --logger "trx;LogFileName=integration-tests.trx"
    
    - name: Publish Test Results
      uses: EnricoMi/publish-unit-test-result-action@v2
      if: always()
      with:
        files: |
          **/*.trx
```
{% endcode %}

### Azure DevOps <a href="#azure-devops" id="azure-devops"></a>

{% code title="azure-pipelines.yml" %}
```yaml
trigger:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'
  dotnetSdkVersion: '8.x'

stages:
- stage: Test
  displayName: 'Run Tests'
  jobs:
  - job: UnitTests
    displayName: 'Unit Tests'
    steps:
    - task: UseDotNet@2
      displayName: 'Install .NET SDK'
      inputs:
        version: $(dotnetSdkVersion)
    
    - task: DotNetCoreCLI@2
      displayName: 'Restore packages'
      inputs:
        command: 'restore'
    
    - task: DotNetCoreCLI@2
      displayName: 'Build solution'
      inputs:
        command: 'build'
        arguments: '--configuration $(buildConfiguration) --no-restore'
    
    - task: DotNetCoreCLI@2
      displayName: 'Run unit tests'
      inputs:
        command: 'test'
        arguments: '--configuration $(buildConfiguration) --no-build --filter "Category=Unit" --collect:"XPlat Code Coverage"'
        publishTestResults: true
    
    - task: PublishCodeCoverageResults@1
      displayName: 'Publish code coverage'
      inputs:
        codeCoverageTool: 'Cobertura'
        summaryFileLocation: '$(Agent.TempDirectory)/**/*coverage.cobertura.xml'

  - job: IntegrationTests
    displayName: 'Integration Tests'
    dependsOn: UnitTests
    services:
      postgres:
        image: postgres:15
        ports:
          - 5432:5432
        env:
          POSTGRES_DB: elsa_test
          POSTGRES_USER: elsa
          POSTGRES_PASSWORD: elsa
    
    steps:
    - task: UseDotNet@2
      displayName: 'Install .NET SDK'
      inputs:
        version: $(dotnetSdkVersion)
    
    - task: DotNetCoreCLI@2
      displayName: 'Run integration tests'
      inputs:
        command: 'test'
        arguments: '--configuration $(buildConfiguration) --filter "Category=Integration"'
      env:
        ConnectionStrings__Elsa: 'Host=localhost;Port=5432;Database=elsa_test;Username=elsa;Password=elsa'
```
{% endcode %}

### Test Categories <a href="#test-categories" id="test-categories"></a>

Organize tests with categories for selective execution:

{% code title="CategorizedTests.cs" %}
```csharp
using Xunit;

public class WorkflowTests
{
    [Fact]
    [Trait("Category", "Unit")]
    public void UnitTest_ShouldPass()
    {
        // Fast, isolated test
    }
    
    [Fact]
    [Trait("Category", "Integration")]
    public async Task IntegrationTest_ShouldPass()
    {
        // Slower test with dependencies
    }
    
    [Fact]
    [Trait("Category", "E2E")]
    public async Task EndToEndTest_ShouldPass()
    {
        // Full system test
    }
}

// Run specific category
// dotnet test --filter "Category=Unit"
// dotnet test --filter "Category=Integration"
```
{% endcode %}

## Common Testing Pitfalls & Solutions <a href="#pitfalls-solutions" id="pitfalls-solutions"></a>

### Pitfall 1: Not Populating Registries <a href="#pitfall-registries" id="pitfall-registries"></a>

**Problem**: Workflows fail with "Activity type not found" errors.

**Solution**: Always call `PopulateRegistriesAsync()` after building the service provider:

```csharp
var services = new ServiceCollection();
services.AddElsa();
var serviceProvider = services.BuildServiceProvider();

// Required for non-hosted scenarios
await serviceProvider.PopulateRegistriesAsync();
```

### Pitfall 2: Shared State Between Tests <a href="#pitfall-shared-state" id="pitfall-shared-state"></a>

**Problem**: Tests fail intermittently due to shared state.

**Solution**: Use `IAsyncLifetime` to ensure clean state for each test:

```csharp
public class MyTests : IAsyncLifetime
{
    private IServiceProvider? _services;
    
    public async Task InitializeAsync()
    {
        // Fresh service provider for each test
        var services = new ServiceCollection();
        services.AddElsa();
        _services = services.BuildServiceProvider();
        await _services.PopulateRegistriesAsync();
    }
    
    public Task DisposeAsync()
    {
        (_services as IDisposable)?.Dispose();
        return Task.CompletedTask;
    }
}
```

### Pitfall 3: Testing Async Workflows Synchronously <a href="#pitfall-async" id="pitfall-async"></a>

**Problem**: Workflows with delays or blocking activities don't complete in tests.

**Solution**: Use proper async/await and consider timeout strategies:

```csharp
[Fact]
public async Task WorkflowWithDelay_ShouldEventuallyComplete()
{
    var workflow = CreateWorkflowWithDelay();
    
    using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(30));
    var result = await RunWorkflowAsync(workflow, cancellationToken: cts.Token);
    
    result.Status.Should().Be(WorkflowStatus.Finished);
}
```

### Pitfall 4: Not Testing Edge Cases <a href="#pitfall-edge-cases" id="pitfall-edge-cases"></a>

**Problem**: Workflows fail in production with unexpected input.

**Solution**: Test boundary conditions and invalid inputs:

```csharp
[Theory]
[InlineData(null)]
[InlineData("")]
[InlineData("   ")]
[InlineData("invalid-format")]
public async Task Workflow_WithInvalidInput_ShouldHandleGracefully(string? input)
{
    var workflow = CreateValidationWorkflow();
    var result = await RunWorkflowAsync(workflow, new Dictionary<string, object>
    {
        ["input"] = input!
    });
    
    // Should handle gracefully, not crash
    result.Status.Should().NotBe(WorkflowStatus.Faulted);
}
```

### Pitfall 5: Ignoring Disposal <a href="#pitfall-disposal" id="pitfall-disposal"></a>

**Problem**: Resource leaks and test failures due to undisposed resources.

**Solution**: Implement proper disposal patterns:

```csharp
public class MyTests : IAsyncLifetime
{
    private IServiceProvider? _services;
    private PostgreSqlContainer? _container;
    
    public async Task DisposeAsync()
    {
        (_services as IDisposable)?.Dispose();
        
        if (_container != null)
            await _container.DisposeAsync();
    }
}
```

### Pitfall 6: Hardcoded Wait Times <a href="#pitfall-waits" id="pitfall-waits"></a>

**Problem**: Tests are flaky due to race conditions or unnecessarily slow.

**Solution**: Use polling or workflow completion events instead of fixed delays:

```csharp
public async Task<WorkflowState> WaitForWorkflowCompletionAsync(
    string workflowInstanceId, 
    TimeSpan timeout)
{
    var deadline = DateTime.UtcNow.Add(timeout);
    var workflowStateStore = Services.GetRequiredService<IWorkflowStateStore>();
    
    while (DateTime.UtcNow < deadline)
    {
        var state = await workflowStateStore.LoadAsync(workflowInstanceId);
        
        if (state?.Status == WorkflowStatus.Finished || 
            state?.Status == WorkflowStatus.Faulted)
        {
            return state;
        }
        
        await Task.Delay(100);
    }
    
    throw new TimeoutException($"Workflow did not complete within {timeout}");
}
```

## Best Practices for Workflow Testing <a href="#best-practices" id="best-practices"></a>

### 1. Test Pyramid <a href="#test-pyramid" id="test-pyramid"></a>

Follow the testing pyramid principle:

- **Many Unit Tests**: Fast, isolated tests for individual activities and simple workflows
- **Some Integration Tests**: Test workflow persistence, external dependencies
- **Few End-to-End Tests**: Full system tests including UI and APIs

```
        /\
       /E2E\          <- Few, slow, brittle
      /------\
     /  INT   \       <- Some, moderate speed
    /----------\
   /    UNIT    \     <- Many, fast, reliable
  /--------------\
```

### 2. Arrange-Act-Assert Pattern <a href="#aaa-pattern" id="aaa-pattern"></a>

Structure tests clearly:

```csharp
[Fact]
public async Task WorkflowTest_ShouldFollowAAAPattern()
{
    // Arrange - Set up test data and dependencies
    var workflow = CreateTestWorkflow();
    var input = new Dictionary<string, object> { ["key"] = "value" };
    
    // Act - Execute the workflow
    var result = await RunWorkflowAsync(workflow, input);
    
    // Assert - Verify the outcome
    result.Status.Should().Be(WorkflowStatus.Finished);
    result.Output.Should().ContainKey("result");
}
```

### 3. Use Descriptive Test Names <a href="#descriptive-names" id="descriptive-names"></a>

Test names should describe what is being tested and expected outcome:

```csharp
// Good
[Fact]
public async Task UserRegistrationWorkflow_WithValidEmail_ShouldCreateUser()

[Fact]
public async Task PaymentProcessing_WhenInsufficientFunds_ShouldReturnError()

// Bad
[Fact]
public async Task Test1()

[Fact]
public async Task WorkflowTest()
```

### 4. Test One Thing Per Test <a href="#single-responsibility" id="single-responsibility"></a>

Each test should verify a single behavior:

```csharp
// Good - Tests one specific behavior
[Fact]
public async Task EmailValidation_WithInvalidEmail_ShouldFail()
{
    var result = await ValidateEmailAsync("invalid");
    result.IsValid.Should().BeFalse();
}

[Fact]
public async Task EmailValidation_WithValidEmail_ShouldSucceed()
{
    var result = await ValidateEmailAsync("user@example.com");
    result.IsValid.Should().BeTrue();
}

// Bad - Tests multiple behaviors
[Fact]
public async Task EmailValidation_ShouldWorkCorrectly()
{
    var result1 = await ValidateEmailAsync("invalid");
    result1.IsValid.Should().BeFalse();
    
    var result2 = await ValidateEmailAsync("user@example.com");
    result2.IsValid.Should().BeTrue();
}
```

### 5. Mock External Dependencies <a href="#mock-dependencies" id="mock-dependencies"></a>

Isolate workflows from external systems in unit tests:

```csharp
using Moq;

public class WorkflowWithDependenciesTests : WorkflowTestBase
{
    protected override void ConfigureServices(IServiceCollection services)
    {
        // Mock external email service
        var emailServiceMock = new Mock<IEmailService>();
        emailServiceMock
            .Setup(x => x.SendAsync(It.IsAny<string>(), It.IsAny<string>()))
            .ReturnsAsync(true);
        
        services.AddSingleton(emailServiceMock.Object);
    }
    
    [Fact]
    public async Task Workflow_ShouldUseEmailService()
    {
        var workflow = CreateWorkflowWithEmailActivity();
        var result = await RunWorkflowAsync(workflow);
        
        result.Status.Should().Be(WorkflowStatus.Finished);
        // Verify email service was called
    }
}
```

### 6. Use Test Helpers and Utilities <a href="#test-helpers" id="test-helpers"></a>

Create reusable test utilities:

```csharp
public static class WorkflowTestHelpers
{
    public static Workflow CreateSimpleSequence(params IActivity[] activities)
    {
        return new Workflow
        {
            Root = new Sequence { Activities = activities.ToList() }
        };
    }
    
    public static async Task<T> GetWorkflowOutput<T>(
        WorkflowState state, 
        string outputName)
    {
        return (T)state.Output[outputName];
    }
    
    public static void AssertWorkflowCompleted(WorkflowState state)
    {
        state.Status.Should().Be(WorkflowStatus.Finished);
        state.SubStatus.Should().Be(WorkflowSubStatus.Finished);
    }
}
```

### 7. Test Error Handling <a href="#test-errors" id="test-errors"></a>

Explicitly test failure scenarios:

```csharp
[Fact]
public async Task Workflow_WhenActivityThrowsException_ShouldFault()
{
    var workflow = new Workflow
    {
        Root = new Sequence
        {
            Activities =
            {
                new ThrowExceptionActivity(),
                new WriteLine { Text = new Input<string>("Should not execute") }
            }
        }
    };
    
    var result = await RunWorkflowAsync(workflow);
    
    result.Status.Should().Be(WorkflowStatus.Faulted);
    result.WorkflowState.Incidents.Should().NotBeEmpty();
}
```

### 8. Keep Tests Fast <a href="#fast-tests" id="fast-tests"></a>

Optimize test execution time:

- Use in-memory databases for unit tests
- Parallelize test execution where possible
- Mock slow dependencies
- Use test containers only for integration tests

```csharp
// Mark tests that can run in parallel
[Collection("Parallel")]
public class FastUnitTests
{
    // Tests here can run in parallel
}

// Mark tests that need to run serially
[Collection("Serial")]
public class IntegrationTests
{
    // Tests here run one at a time
}
```

### 9. Maintain Test Data <a href="#maintain-test-data" id="maintain-test-data"></a>

Keep test data close to tests and version controlled:

```
Tests/
├── Data/
│   ├── Workflows/
│   │   ├── simple-workflow.json
│   │   └── complex-workflow.json
│   └── TestData/
│       ├── valid-users.json
│       └── invalid-inputs.json
├── Unit/
│   └── WorkflowTests.cs
└── Integration/
    └── PersistenceTests.cs
```

### 10. Document Complex Test Scenarios <a href="#document-tests" id="document-tests"></a>

Add comments for complex test logic:

```csharp
[Fact]
public async Task ComplexBusinessRule_ShouldBeEnforced()
{
    // This test verifies the business rule that states:
    // "Orders over $1000 require manager approval, except for 
    // VIP customers who have made more than 10 purchases"
    
    var workflow = CreateOrderApprovalWorkflow();
    
    var vipCustomer = new Customer 
    { 
        IsVip = true, 
        PurchaseCount = 15 
    };
    
    var result = await RunWorkflowAsync(workflow, new Dictionary<string, object>
    {
        ["customer"] = vipCustomer,
        ["orderAmount"] = 1500
    });
    
    // VIP customer should bypass approval
    result.Output["requiresApproval"].Should().Be(false);
}
```

## Summary <a href="#summary" id="summary"></a>

Testing and debugging workflows is essential for building reliable workflow-based applications. This guide covered:

- **Unit Testing**: Testing workflows and activities in isolation with xUnit and Elsa.Testing, including ActivityTestFixture for activity unit tests
- **Integration Testing**: Using WorkflowTestFixture, TestContainers, and in-memory databases for integration tests
- **Async Testing**: Using AsyncWorkflowRunner for testing workflows with timers and external triggers
- **Debugging**: Techniques including execution journals, logging, breakpoints, and state inspection
- **Test Data Management**: Builders, fixtures, and parameterized tests
- **CI/CD Integration**: Automating tests in GitHub Actions and Azure DevOps
- **Common Pitfalls**: Solutions to frequent testing challenges
- **Best Practices**: Proven patterns for maintainable and effective workflow tests

By following these practices and patterns, along with the official Elsa testing helpers (ActivityTestFixture, WorkflowTestFixture, AsyncWorkflowRunner), you'll build a robust test suite that gives you confidence in your workflows and enables rapid, safe iteration on your workflow-based applications.

## Additional Resources <a href="#additional-resources" id="additional-resources"></a>

### Elsa Core Repository Examples

- [Elsa Core Test Guidelines](https://github.com/elsa-workflows/elsa-core/blob/main/doc/qa/test-guidelines.md) - Official testing guidelines from the elsa-core repository
- [Unit Test Examples](https://github.com/elsa-workflows/elsa-core/tree/main/test/unit) - Unit test examples using ActivityTestFixture
- [Integration Test Examples](https://github.com/elsa-workflows/elsa-core/tree/main/test/integration) - Integration tests with WorkflowTestFixture
- [Component Test Examples](https://github.com/elsa-workflows/elsa-core/tree/main/test/component) - Component tests with AsyncWorkflowRunner

### Testing Frameworks & Tools

- [xUnit Documentation](https://xunit.net/)
- [TestContainers Documentation](https://dotnet.testcontainers.org/)
- [FluentAssertions Documentation](https://fluentassertions.com/)

### Related Guides

- [Custom Activities Guide](../extensibility/custom-activities.md)
- [Logging Framework](../features/logging-framework.md)

using System.Reflection;
using ActualLab.Interception;
using ActualLab.Interception.Interceptors;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartAP;

#region PartAP_SimpleInterface
// IRequiresAsyncProxy: generates proxy that intercepts async methods only
// IRequiresFullProxy: generates proxy that intercepts both sync and async methods
public interface IGreetingService : IRequiresAsyncProxy
{
    Task<string> GreetAsync(string name, CancellationToken cancellationToken = default);
}
#endregion

#region PartAP_SimpleInterceptor
public sealed class LoggingInterceptor : Interceptor
{
    // Options record is required - extend Interceptor.Options
    public new record Options : Interceptor.Options
    {
        public static Options Default { get; set; } = new();
    }

    public LoggingInterceptor(Options settings, IServiceProvider services)
        : base(settings, services)
    {
        // MustInterceptAsyncCalls = true; // Default
        // MustInterceptSyncCalls = false; // Default, set to true for IRequiresFullProxy
    }

    // Override this for typed handlers (type-safe, slightly more overhead)
    protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
        Invocation initialInvocation, MethodDef methodDef)
    {
        // TUnwrapped is the unwrapped return type (e.g., string for Task<string>)
        // Return null to skip interception (falls through to target or throws)
        if (methodDef.IsAsyncMethod) {
            // For async methods, use InterceptedAsyncInvoker which returns Task<TUnwrapped>
            var asyncInvoker = (Func<Invocation, Task<TUnwrapped>>)methodDef.InterceptedAsyncInvoker;
            return invocation => {
                Console.WriteLine($"Calling: {methodDef.FullName}");
                var resultTask = LogAndWrap(methodDef, asyncInvoker.Invoke(invocation));
                // Wrap result to proper return type (Task<T> or ValueTask<T>)
                return methodDef.WrapAsyncInvokerResultOfAsyncMethod(resultTask);
            };
        }
        // For sync methods
        return invocation => {
            Console.WriteLine($"Calling: {methodDef.FullName}");
            try {
                var result = invocation.InvokeInterceptedUntyped();
                Console.WriteLine($"Completed: {methodDef.FullName}");
                return result;
            }
            catch (Exception e) {
                Console.WriteLine($"Failed: {methodDef.FullName}: {e.Message}");
                throw;
            }
        };
    }

    private static async Task<TUnwrapped> LogAndWrap<TUnwrapped>(MethodDef methodDef, Task<TUnwrapped> task)
    {
        try {
            var result = await task.ConfigureAwait(false);
            Console.WriteLine($"Completed: {methodDef.FullName}");
            return result;
        }
        catch (Exception e) {
            Console.WriteLine($"Failed: {methodDef.FullName}: {e.Message}");
            throw;
        }
    }
}
#endregion

// Implementation for pass-through demos
public class GreetingService : IGreetingService
{
    public Task<string> GreetAsync(string name, CancellationToken cancellationToken = default)
        => Task.FromResult($"Hello, {name}!");
}

#region PartAP_DefaultResultInterceptor
// An interceptor that returns default values for all methods
public sealed class DefaultResultInterceptor : Interceptor
{
    public new record Options : Interceptor.Options
    {
        public static Options Default { get; set; } = new();
    }

    public DefaultResultInterceptor(Options settings, IServiceProvider services)
        : base(settings, services)
    {
        // MustInterceptSyncCalls = true; // Requires IRequiresFullProxy interface
        MustInterceptAsyncCalls = true;
    }

    protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
        Invocation initialInvocation, MethodDef methodDef)
    {
        // methodDef.DefaultResult is the default value for the return type
        // For async methods, it's a completed Task/ValueTask with default(T)
        var defaultResult = methodDef.DefaultResult;
        return _ => defaultResult;
    }
}
#endregion

#region PartAP_InvocationUsageInterceptor
public sealed class InvocationDemoInterceptor : Interceptor
{
    public new record Options : Interceptor.Options
    {
        public static Options Default { get; set; } = new();
    }

    public InvocationDemoInterceptor(Options settings, IServiceProvider services)
        : base(settings, services) { }

    #region PartAP_InvocationUsage
    protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
        Invocation initialInvocation, MethodDef methodDef)
    {
        // For async methods, use the appropriate invoker
        if (methodDef.IsAsyncMethod) {
            var asyncInvoker = (Func<Invocation, Task<TUnwrapped>>)methodDef.InterceptedAsyncInvoker;
            return invocation => {
                // Access invocation details
                var proxy = invocation.Proxy;           // The proxy instance
                var method = invocation.Method;         // MethodInfo being called
                var args = invocation.Arguments;        // ArgumentList with call arguments
                var target = invocation.InterfaceProxyTarget; // Target object (if pass-through proxy)

                // Get argument values
                var arg0 = args.Get<string>(0);         // First argument as string
                var arg1 = args.GetCancellationToken(1); // CancellationToken helper

                // Invoke the original/intercepted method and wrap result
                return methodDef.WrapAsyncInvokerResultOfAsyncMethod(asyncInvoker.Invoke(invocation));
            };
        }
        // For sync methods
        return invocation => {
            var proxy = invocation.Proxy;
            var method = invocation.Method;
            var args = invocation.Arguments;
            var target = invocation.InterfaceProxyTarget;
            return invocation.InvokeInterceptedUntyped();
        };
    }
    #endregion
}
#endregion

#region PartAP_ValidationInterceptor
public sealed class ValidatingInterceptor : Interceptor
{
    public new record Options : Interceptor.Options
    {
        public static Options Default { get; set; } = new();
    }

    public ValidatingInterceptor(Options settings, IServiceProvider services)
        : base(settings, services) { }

    protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
        Invocation initialInvocation, MethodDef methodDef)
    {
        if (methodDef.IsAsyncMethod) {
            var asyncInvoker = (Func<Invocation, Task<TUnwrapped>>)methodDef.InterceptedAsyncInvoker;
            return invocation => methodDef.WrapAsyncInvokerResultOfAsyncMethod(asyncInvoker.Invoke(invocation));
        }
        return invocation => invocation.InvokeInterceptedUntyped();
    }

    #region PartAP_Validation
    protected override void ValidateTypeInternal(Type type)
    {
        // Called once per type, results are cached
        foreach (var method in type.GetMethods()) {
            if (method.GetCustomAttribute<MyRequiredAttribute>() is null)
                throw new InvalidOperationException($"Method {method.Name} missing [MyRequired]");
        }
    }
    #endregion
}

[AttributeUsage(AttributeTargets.Method)]
public class MyRequiredAttribute : Attribute { }
#endregion

public class PartAP : DocPart
{
    public async Task SimpleProxySession()
    {
        #region PartAP_CreateProxy
        var services = new ServiceCollection()
            .AddSingleton(LoggingInterceptor.Options.Default)
            .AddSingleton<LoggingInterceptor>()
            .BuildServiceProvider();

        var interceptor = services.GetRequiredService<LoggingInterceptor>();
        var realService = new GreetingService();

        // Create a proxy - Proxies.New finds the generated proxy type automatically
        var proxy = (IGreetingService)Proxies.New(
            typeof(IGreetingService),
            interceptor,
            proxyTarget: realService); // Pass-through to real implementation

        // All calls now go through your interceptor
        var greeting = await proxy.GreetAsync("World");
        #endregion

        WriteLine($"Result: {greeting}");
    }

    public async Task PassThroughProxySession()
    {
        var services = new ServiceCollection()
            .AddSingleton(LoggingInterceptor.Options.Default)
            .AddSingleton<LoggingInterceptor>()
            .BuildServiceProvider();

        var interceptor = services.GetRequiredService<LoggingInterceptor>();

        #region PartAP_PassThroughProxy
        // Create a real implementation
        var realService = new GreetingService();

        // Create proxy that passes through to the real service
        var proxy = (IGreetingService)Proxies.New(
            typeof(IGreetingService),
            interceptor,
            proxyTarget: realService  // Calls will delegate to this
        );

        // Now calls go: proxy -> interceptor -> realService
        var result = await proxy.GreetAsync("World");
        #endregion

        WriteLine($"Result: {result}");
    }

    public void SchedulingInterceptorSession()
    {
        var services = new ServiceCollection().BuildServiceProvider();
        Interceptor? anotherInterceptor = null;
        TaskFactory? myCustomTaskFactory = null;

        #region PartAP_SchedulingInterceptor
        var interceptor = new SchedulingInterceptor(SchedulingInterceptor.Options.Default, services) {
            // Resolve TaskFactory per invocation
            TaskFactoryResolver = invocation => {
                // Return null to skip scheduling (run on current context)
                // Return a TaskFactory to schedule on its scheduler
                return myCustomTaskFactory;
            },
            // Optional: chain to another interceptor
            NextInterceptor = anotherInterceptor
        };
        #endregion

        WriteLine($"Created: {interceptor.GetType().Name}");
    }

    public void ScopedServiceInterceptorSession()
    {
        var services = new ServiceCollection()
            .AddScoped<IGreetingService, GreetingService>()
            .BuildServiceProvider();

        #region PartAP_ScopedServiceInterceptor
        var interceptor = new ScopedServiceInterceptor(ScopedServiceInterceptor.Options.Default, services) {
            ScopedServiceType = typeof(IGreetingService),
            // MustInterceptSyncCalls = true, // Requires IRequiresFullProxy interface
        };

        // Each call to the proxy will:
        // 1. Create a new IServiceScope
        // 2. Resolve IGreetingService from that scope
        // 3. Invoke the method on the resolved service
        // 4. Dispose the scope when the call completes
        var proxy = (IGreetingService)Proxies.New(typeof(IGreetingService), interceptor);
        #endregion

        WriteLine($"Created proxy: {proxy.GetType().Name}");
    }

    public async Task DefaultResultInterceptorSession()
    {
        var services = new ServiceCollection()
            .AddSingleton(DefaultResultInterceptor.Options.Default)
            .AddSingleton<DefaultResultInterceptor>()
            .BuildServiceProvider();

        var interceptor = services.GetRequiredService<DefaultResultInterceptor>();
        var proxy = (IGreetingService)Proxies.New(typeof(IGreetingService), interceptor);

        // Returns default value (null for string wrapped in completed Task)
        var result = await proxy.GreetAsync("World");
        WriteLine($"Default result: {result ?? "(null)"}");
    }

    public override async Task Run()
    {
        StartSnippetOutput("Simple Proxy Demo");
        await SimpleProxySession();

        StartSnippetOutput("Pass-Through Proxy Demo");
        await PassThroughProxySession();

        StartSnippetOutput("Scheduling Interceptor Demo");
        SchedulingInterceptorSession();

        StartSnippetOutput("Scoped Service Interceptor Demo");
        ScopedServiceInterceptorSession();

        StartSnippetOutput("Default Result Interceptor Demo");
        await DefaultResultInterceptorSession();
    }
}

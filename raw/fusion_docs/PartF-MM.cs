using ActualLab.Fusion.Blazor;
using Microsoft.AspNetCore.Components;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartFMM;

#region PartFSS_Service1
public partial class Service1 : IComputeService
{
    [ComputeMethod]
    public virtual async Task<string> Get(string key)
    {
        WriteLine($"{nameof(Get)}({key})");
        return key;
    }
}
#endregion

#region PartFSS_Service2
public partial class Service2 : IComputeService
{
    [ComputeMethod]
    public virtual async Task<string> Get(string key)
    {
        WriteLine($"{nameof(Get)}({key})");
        return key;
    }

    [ComputeMethod]
    public virtual async Task<string> Combine(string key1, string key2)
    {
        WriteLine($"{nameof(Combine)}({key1}, {key2})");
        return await Get(key1) + await Get(key2);
    }
}
#endregion

#region PartFSS_Service3
public partial class Service3 : IComputeService
{
    [ComputeMethod]
    public virtual async Task<string> Get(string key)
    {
        WriteLine($"{nameof(Get)}({key})");
        return key;
    }

    [ComputeMethod(MinCacheDuration = 0.3)] // MinCacheDuration was added
    public virtual async Task<string> Combine(string key1, string key2)
    {
        WriteLine($"{nameof(Combine)}({key1}, {key2})");
        return await Get(key1) + await Get(key2);
    }
}
#endregion

public class PartFMM : DocPart
{
    public IServiceProvider CreateServices()
    {
        var services = new ServiceCollection();
        services.AddFusion()
            .AddService<Service1>()
            .AddService<Service2>() // We'll use Service2 & other services later
            .AddService<Service3>();
        return services.BuildServiceProvider();
    }

    public async Task Caching1()
    {
        #region PartFSS_Caching1
        var service = CreateServices().GetRequiredService<Service1>();
        // var computed = await Computed.Capture(() => counters.Get("a"));
        WriteLine(await service.Get("a"));
        WriteLine(await service.Get("a"));
        GC.Collect();
        WriteLine("GC.Collect()");
        WriteLine(await service.Get("a"));
        WriteLine(await service.Get("a"));
        #endregion
    }

    public async Task Caching2()
    {
        #region PartFSS_Caching2
        var service = CreateServices().GetRequiredService<Service1>();
        var computed = await Computed.Capture(() => service.Get("a"));
        WriteLine(await service.Get("a"));
        WriteLine(await service.Get("a"));
        GC.Collect();
        WriteLine("GC.Collect()");
        WriteLine(await service.Get("a"));
        WriteLine(await service.Get("a"));
        #endregion
    }

    public async Task Caching3()
    {
        #region PartFSS_Caching3
        var service = CreateServices().GetRequiredService<Service2>();
        var computed = await Computed.Capture(() => service.Combine("a", "b"));
        WriteLine("computed = Combine(a, b) completed");
        WriteLine(await service.Combine("a", "b"));
        WriteLine(await service.Get("a"));
        WriteLine(await service.Get("b"));
        WriteLine(await service.Combine("a", "c"));
        GC.Collect();
        WriteLine("GC.Collect() completed");
        WriteLine(await service.Get("a"));
        WriteLine(await service.Get("b"));
        WriteLine(await service.Combine("a", "c"));
        #endregion
    }

    public async Task Caching4()
    {
        #region PartFSS_Caching4
        var service = CreateServices().GetRequiredService<Service2>();
        var computed = await Computed.Capture(() => service.Get("a"));
        WriteLine("computed = Get(a) completed");
        WriteLine(await service.Combine("a", "b"));
        GC.Collect();
        WriteLine("GC.Collect() completed");
        WriteLine(await service.Combine("a", "b"));
        #endregion
    }

    public async Task Caching5()
    {
        #region PartFSS_Caching5
        var service = CreateServices().GetRequiredService<Service3>();
        WriteLine(await service.Combine("a", "b"));
        WriteLine(await service.Get("a"));
        WriteLine(await service.Get("x"));
        GC.Collect();
        WriteLine("GC.Collect()");
        WriteLine(await service.Combine("a", "b"));
        WriteLine(await service.Get("a"));
        WriteLine(await service.Get("x"));
        await Task.Delay(1000);
        GC.Collect();
        WriteLine("Task.Delay(...) and GC.Collect()");
        WriteLine(await service.Combine("a", "b"));
        WriteLine(await service.Get("a"));
        WriteLine(await service.Get("x"));
        #endregion
    }

    public override async Task Run()
    {
        StartSnippetOutput("Caching1");
        await Caching1();
        StartSnippetOutput("Caching2");
        await Caching2();
        StartSnippetOutput("Caching3");
        await Caching3();
        StartSnippetOutput("Caching4");
        await Caching4();
        StartSnippetOutput("Caching5");
        await Caching5();
    }
}

// ============================================================================
// PartF-MM.md snippets: Multi-Materialization examples
// ============================================================================

// Dummy types for Blazor example
public record OrderMM;
public interface IOrderServiceMM
{
    Task<OrderMM> Get(long orderId, CancellationToken ct);
}

#region PartFMM_BlazorComponentLifecycle
public class OrderDetailsComponent : ComputedStateComponent<OrderMM>
{
    [Inject] public IOrderServiceMM OrderService { get; set; } = null!;
    [Parameter] public long OrderId { get; set; }

    protected override async Task<OrderMM> ComputeState(CancellationToken ct)
    {
        // This creates/uses Computed<Order> which depends on:
        // - Computed<User> (for the order's customer)
        // - Computed<List<OrderItem>> (for the order's items)
        return await OrderService.Get(OrderId, ct);
    }
}
#endregion

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using ActualLab.Fusion;
using ActualLab.Fusion.Authentication;
using ActualLab.Fusion.Blazor;
using ActualLab.Fusion.Blazor.Authentication;
using ActualLab.Fusion.Extensions;
using ActualLab.Fusion.Server;
using ActualLab.Fusion.UI;
using ActualLab.Rpc;
using ActualLab.Rpc.Server;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartB;

// Fake types for snippet compilation
public class _HostPage : ComponentBase { }
public class App : ComponentBase { }

// Fake service interfaces and implementations
public interface ITodoApi : IComputeService
{
    Task<string[]> GetTodos(CancellationToken cancellationToken = default);
}

public class TodoApi : ITodoApi
{
    [ComputeMethod]
    public virtual Task<string[]> GetTodos(CancellationToken cancellationToken = default)
        => Task.FromResult(Array.Empty<string>());
}

public class CounterService : IComputeService
{
    [ComputeMethod]
    public virtual Task<int> GetCounter(CancellationToken cancellationToken = default)
        => Task.FromResult(0);
}

public class WeatherForecastService : IComputeService
{
    [ComputeMethod]
    public virtual Task<string[]> GetForecasts(CancellationToken cancellationToken = default)
        => Task.FromResult(Array.Empty<string>());
}

public class PartB : DocPart
{
    #region PartB_ServerSideBlazor_Services
    public void ConfigureServerSideBlazorServices(IServiceCollection services)
    {
        // Configure services
        var fusion = services.AddFusion();

        // Add your Fusion compute services
        fusion.AddFusionTime(); // Built-in time service
        fusion.AddService<CounterService>();
        fusion.AddService<WeatherForecastService>();

        // ASP.NET Core / Blazor services
        services.AddServerSideBlazor(o => o.DetailedErrors = true);
        services.AddRazorComponents().AddInteractiveServerComponents();
        fusion.AddBlazor();

        // Default update delay for ComputedStateComponents
        services.AddScoped<IUpdateDelayer>(_ => FixedDelayer.MinDelay);
    }
    #endregion

    #region PartB_ServerSideBlazor_App
    public void ConfigureServerSideBlazorApp(WebApplication app)
    {
        app.UseFusionSession();
        app.UseRouting();
        app.UseAntiforgery();

        app.MapStaticAssets();
        app.MapRazorComponents<_HostPage>()
            .AddInteractiveServerRenderMode();
    }
    #endregion

    #region PartB_Hybrid_ServerServices
    public void ConfigureHybridServerServices(IServiceCollection services)
    {
        // Fusion services with RPC server mode
        var fusion = services.AddFusion(RpcServiceMode.Server, true);
        var fusionServer = fusion.AddWebServer();

        // Add your Fusion compute services as servers
        fusion.AddServer<ITodoApi, TodoApi>();

        // ASP.NET Core / Blazor services
        services.AddServerSideBlazor(o => o.DetailedErrors = true);
        services.AddRazorComponents()
            .AddInteractiveServerComponents()
            .AddInteractiveWebAssemblyComponents();
        fusion.AddBlazor().AddAuthentication().AddPresenceReporter();
    }
    #endregion

    #region PartB_Hybrid_ServerApp
    public void ConfigureHybridServerApp(WebApplication app)
    {
        app.UseWebSockets(new WebSocketOptions() {
            KeepAliveInterval = TimeSpan.FromSeconds(30),
        });
        app.UseFusionSession();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAntiforgery();

        // Razor components with both Server and WebAssembly render modes
        app.MapStaticAssets();
        app.MapRazorComponents<_HostPage>()
            .AddInteractiveServerRenderMode()
            .AddInteractiveWebAssemblyRenderMode()
            .AddAdditionalAssemblies(typeof(App).Assembly);

        // Fusion RPC endpoints
        app.MapRpcWebSocketServer();
    }
    #endregion

    #region PartB_Wasm_Main
    public async Task WasmMain(string[] args)
    {
        var builder = WebAssemblyHostBuilder.CreateDefault(args);
        ConfigureWasmServices(builder.Services, builder);
        var host = builder.Build();
        await host.RunAsync();
    }
    #endregion

    #region PartB_Wasm_Services
    public void ConfigureWasmServices(IServiceCollection services, WebAssemblyHostBuilder builder)
    {
        // Fusion services
        var fusion = services.AddFusion();
        fusion.AddAuthClient();
        fusion.AddBlazor().AddAuthentication().AddPresenceReporter();

        // RPC clients for your services
        fusion.AddClient<ITodoApi>();

        // Configure WebSocket client to connect to the server
        fusion.Rpc.AddWebSocketClient(builder.HostEnvironment.BaseAddress);

        // Default update delay
        services.AddScoped<IUpdateDelayer>(c => new UpdateDelayer(c.UIActionTracker(), 0.25));
    }
    #endregion

    public override async Task Run()
    {
        StartSnippetOutput("Reference verification");

        // Component hierarchy
        _ = typeof(FusionComponentBase);
        _ = typeof(CircuitHubComponentBase);
        _ = typeof(StatefulComponentBase<>);
        _ = typeof(ComputedStateComponent<>);
        // _ = typeof(ComputedRenderStateComponent<>); // In ActualLab.Fusion.Blazor
        _ = typeof(MixedStateComponent<,>);

        // State types
        _ = typeof(IState<>);
        _ = typeof(IMutableState<>);
        _ = typeof(IComputedState<>);
        _ = typeof(ComputedState<>);
        _ = typeof(MutableState<>);

        // Update delayer
        _ = typeof(IUpdateDelayer);
        _ = typeof(FixedDelayer);
        _ = typeof(UpdateDelayer);

        // CircuitHub
        _ = typeof(CircuitHub);

        // UICommander
        _ = typeof(UICommander);

        // StateFactory
        _ = typeof(StateFactory);

        // RPC modes
        _ = RpcServiceMode.Server;

        WriteLine("All identifier references verified successfully!");
        WriteLine();

        await Task.CompletedTask;
    }
}

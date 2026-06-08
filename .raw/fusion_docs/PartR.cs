using System.Diagnostics;
using ActualLab.Fusion.Server;
using ActualLab.Rpc;
using ActualLab.Rpc.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartR;

#region PartR_SharedApi
// The interface for our chat service
public interface IChatService : IComputeService
{
    // Compute methods – they cache the output not only on the server side
    // but on the client side as well!
    [ComputeMethod]
    Task<List<string>> GetRecentMessages(CancellationToken cancellationToken = default);
    [ComputeMethod]
    Task<int> GetWordCount(CancellationToken cancellationToken = default);

    // Regular methods
    Task Post(string message, CancellationToken cancellationToken = default);
    Task<int> GetWordCountPlainRpc(CancellationToken cancellationToken = default);
}
#endregion

#region PartR_ServerImplementation
public class ChatService : IChatService
{
    private readonly Lock _lock = new();
    private List<string> _posts = new();

    // It's a [ComputeMethod] method -> it has to be virtual to allow Fusion to override it
    public virtual Task<List<string>> GetRecentMessages(CancellationToken cancellationToken = default)
        => Task.FromResult(_posts);

    // It's a [ComputeMethod] method -> it has to be virtual to allow Fusion to override it
    public virtual async Task<int> GetWordCount(CancellationToken cancellationToken = default)
    {
        // NOTE: GetRecentMessages() is a compute method, so the GetWordCount() call becomes dependent on it,
        // and that's why it gets invalidated automatically when GetRecentMessages() is invalidated.
        var messages = await GetRecentMessages(cancellationToken).ConfigureAwait(false);
        return messages
            .Select(m => m.Split(" ", StringSplitOptions.RemoveEmptyEntries).Length)
            .Sum();
    }

    // Regular method
    public Task<int> GetWordCountPlainRpc(CancellationToken cancellationToken = default)
        => GetWordCount(cancellationToken);

    // Regular method
    public Task Post(string message, CancellationToken cancellationToken = default)
    {
        lock (_lock) {
            var posts = _posts.ToList(); // We can't update the list itself (it's shared), but we can re-create it
            posts.Add(message);
            if (posts.Count > 10)
                posts.RemoveAt(0);
            _posts = posts;
        }

        using var _1 = Invalidation.Begin();
        _ = GetRecentMessages(default); // No need to invalidate GetWordCount() – it depends on GetRecentMessages()
        return Task.CompletedTask;
    }
}
#endregion

public class PartR : DocPart
{
    public override async Task Run()
    {
        using var stopTokenSource = new CancellationTokenSource();
        var serverTask = RunServer(stopTokenSource.Token);
        await RunClient();
        await stopTokenSource.CancelAsync();
        await serverTask;
    }

    public WebApplication CreateHost()
    {
        #region PartR_ServerSetup
        var builder = WebApplication.CreateBuilder();
        builder.Logging.ClearProviders().SetMinimumLevel(LogLevel.Debug).AddConsole();
        builder.Services.Configure<HostOptions>(options => options.ShutdownTimeout = TimeSpan.FromSeconds(3));

        // Adding Fusion.
        // RpcServiceMode.Server is going to be the default mode for further `fusion.AddService()` calls,
        // which means that any compute service added via `fusion.AddService()` will be shared via RPC as well.
        var fusion = builder.Services.AddFusion(RpcServiceMode.Server);
        fusion.AddWebServer(); // Adds the RPC server middleware
        fusion.AddService<IChatService, ChatService>(RpcServiceMode.Server); // Adds the chat service impl. (Compute Service)

        var app = builder.Build();
        app.UseWebSockets(); // Enable WebSockets support on Kestrel server
        app.MapRpcWebSocketServer(); // Map the ActualLab.Rpc WebSocket server endpoint ("/rpc/ws")
        #endregion
        return app;
    }

    public ServiceProvider CreateClientServiceProvider()
    {
        var services = new ServiceCollection();
        services.AddLogging(logging => {
            logging.ClearProviders();
            logging.SetMinimumLevel(LogLevel.Debug).AddConsole();
        });

        #region PartR_ClientSetup
        var fusion = services.AddFusion(); // No default RpcServiceMode, so it will be set to RpcServiceMode.Local
        var rpc = fusion.Rpc; // The same as services.AddRpc(), but slightly faster, since FusionBuilder already did it
        rpc.AddWebSocketClient("http://localhost:22222/"); // Adds the WebSocket client for ActualLab.Rpc
        fusion.AddClient<IChatService>(); // Adds the chat service client (Compute Service Client)
        #endregion

        return services.BuildServiceProvider();
    }

    public async Task RunServer(CancellationToken cancellationToken = default)
    {
        var app = CreateHost();
        #region PartR_RunServer
        try {
            await app.RunAsync("http://localhost:22222/").WaitAsync(cancellationToken);
        }
        catch (Exception error) {
            if (error.IsCancellationOf(cancellationToken))
                await app.StopAsync();
            else
                Error.WriteLine($"Server failed: {error.Message}");
        }
        #endregion
    }

    public async Task RunClient()
    {
        #region PartR_RunClient
        await using var services = CreateClientServiceProvider();
        var chatClient = services.GetRequiredService<IChatService>();

        // Start GetWordCount() change observer
        var cWordCount0 = await Computed.Capture(() => chatClient.GetWordCount());
        _ = Task.Run(async () => {
            await foreach (var cWordCount in cWordCount0.Changes())
                WriteLine($"GetWordCount() -> {cWordCount}, Value: {cWordCount.Value}");
        });

        // Start GetRecentMessages() change observer
        var cMessages0 = await Computed.Capture(() => chatClient.GetRecentMessages());
        _ = Task.Run(async () => {
            await foreach (var cMessages in cMessages0.Changes()) {
                await Task.Delay(25); // We delay the output to print GetWordCount() first
                WriteLine($"GetRecentMessages() -> {cMessages}, Value:");
                foreach (var message in cMessages.Value)
                    WriteLine($"- {message}");
                WriteLine();
            }
        });

        // Post some messages
        await chatClient.Post("Hello, World!");
        await Task.Delay(100);
        await chatClient.Post("Let's count to 3!");
        string[] data = ["One", "Two", "Three"];
        for (var i = 1; i <= 3; i++) {
            await Task.Delay(1000);
            await chatClient.Post(data.Take(i).ToDelimitedString());
        }
        await Task.Delay(1000);
        await chatClient.Post("Done counting!");
        await Task.Delay(1000);
        #endregion

        #region PartR_Output
        /* The output:
        GetWordCount() -> RemoteComputed<Int32>(*IChatService.GetWordCount(ct-none)-Hash=14783957 v.4u, State: Consistent), Value: 0
        GetRecentMessages() -> RemoteComputed<List<String>>(*IChatService.GetRecentMessages(ct-none)-Hash=14783978 v.d5, State: Invalidated), Value:

        GetWordCount() -> RemoteComputed<Int32>(*IChatService.GetWordCount(ct-none)-Hash=14783957 v.h5, State: Consistent), Value: 2
        GetRecentMessages() -> RemoteComputed<List<String>>(*IChatService.GetRecentMessages(ct-none)-Hash=14783978 v.l5, State: Consistent), Value:
        - Hello, World!

        GetWordCount() -> RemoteComputed<Int32>(*IChatService.GetWordCount(ct-none)-Hash=14783957 v.p5, State: Consistent), Value: 6
        GetRecentMessages() -> RemoteComputed<List<String>>(*IChatService.GetRecentMessages(ct-none)-Hash=14783978 v.4q, State: Consistent), Value:
        - Hello, World!
        - Let's count to 3!

        GetWordCount() -> RemoteComputed<Int32>(*IChatService.GetWordCount(ct-none)-Hash=14783957 v.d0, State: Consistent), Value: 7
        GetRecentMessages() -> RemoteComputed<List<String>>(*IChatService.GetRecentMessages(ct-none)-Hash=14783978 v.cp, State: Consistent), Value:
        - Hello, World!
        - Let's count to 3!
        - One

        GetWordCount() -> RemoteComputed<Int32>(*IChatService.GetWordCount(ct-none)-Hash=14783957 v.4v, State: Consistent), Value: 9
        GetRecentMessages() -> RemoteComputed<List<String>>(*IChatService.GetRecentMessages(ct-none)-Hash=14783978 v.gp, State: Consistent), Value:
        - Hello, World!
        - Let's count to 3!
        - One
        - One, Two

        GetWordCount() -> RemoteComputed<Int32>(*IChatService.GetWordCount(ct-none)-Hash=14783957 v.ou, State: Consistent), Value: 12
        GetRecentMessages() -> RemoteComputed<List<String>>(*IChatService.GetRecentMessages(ct-none)-Hash=14783978 v.8v, State: Consistent), Value:
        - Hello, World!
        - Let's count to 3!
        - One
        - One, Two
        - One, Two, Three

        GetWordCount() -> RemoteComputed<Int32>(*IChatService.GetWordCount(ct-none)-Hash=14783957 v.h0, State: Consistent), Value: 14
        GetRecentMessages() -> RemoteComputed<List<String>>(*IChatService.GetRecentMessages(ct-none)-Hash=14783978 v.kp, State: Consistent), Value:
        - Hello, World!
        - Let's count to 3!
        - One
        - One, Two
        - One, Two, Three
        - Done counting!
        */
        #endregion

        #region PartR_Benchmark
        // Benchmarking remote compute method calls and plain RPC calls – run in Release mode!
        WriteLine("100K calls to GetWordCount() vs GetWordCountPlainRpc():");
        WriteLine("- Warmup...");
        for (int i = 0; i < 100_000; i++)
            await chatClient.GetWordCount().ConfigureAwait(false);
        for (int i = 0; i < 100_000; i++)
            await chatClient.GetWordCountPlainRpc().ConfigureAwait(false);
        WriteLine("- Benchmarking...");
        var stopwatch = Stopwatch.StartNew();
        for (int i = 0; i < 100_000; i++)
            await chatClient.GetWordCount().ConfigureAwait(false);
        WriteLine($"- GetWordCount():         {stopwatch.Elapsed.ToShortString()}");
        stopwatch.Restart();
        for (int i = 0; i < 100_000; i++)
            await chatClient.GetWordCountPlainRpc().ConfigureAwait(false);
        WriteLine($"- GetWordCountPlainRpc(): {stopwatch.Elapsed.ToShortString()}");
        #endregion

        #region PartR_Benchmark_Output
        /* The output:
        100K calls to GetWordCount() vs GetWordCountPlainRpc() – run in Release mode!
        - Warmup...
        - Benchmarking...
        - GetWordCount():         12.187ms
        - GetWordCountPlainRpc(): 2.474s
        */
        #endregion

        #region PartR_ClientComputedState
        var stateFactory = services.StateFactory();
        using var state = stateFactory.NewComputed(
            new ComputedState<string>.Options() {
                UpdateDelayer = FixedDelayer.Get(0.5), // 0.5 second update delay
                EventConfigurator = state1 => {
                    // A shortcut to attach 3 event handlers: Invalidated, Updating, Updated
                    state1.AddEventHandler(StateEventKind.All,
                        (s, e) => WriteLine($"{e}: {s.Value}"));
                },
            },
            async (state, cancellationToken) => {
                var wordCount = await chatClient.GetWordCount(cancellationToken);
                return $"Word count: {wordCount}";
            });

        await state.Update(); // Ensures the state gets an up-to-date value

        await chatClient.Post("Hello, World!");
        await Task.Delay(1000);
        await chatClient.Post("One Two Three");
        await Task.Delay(1000);
        #endregion
    }
}

#region PartR_RpcNoWaitInterface
public interface ISimpleService : IRpcService
{
    Task<RpcNoWait> Ping(string message);
}
#endregion

#region PartR_RpcStreamInterface
public interface IStreamingService : IRpcService
{
    // Server streams data to client
    Task<RpcStream<Item>> GetItems(CancellationToken cancellationToken = default);

    // Client streams data to server
    Task<int> Sum(RpcStream<int> stream, CancellationToken cancellationToken = default);
}

public record Item(int Id, string Name);
#endregion

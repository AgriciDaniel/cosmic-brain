using System.Diagnostics;
using ActualLab.Rpc;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartC;

#region PartC_PrintCommandSession
public class PrintCommand : ICommand<Unit>
{
    public string Message { get; set; } = "";
}

// Interface-based command handler
public class PrintCommandHandler : ICommandHandler<PrintCommand>, IDisposable
{
    public PrintCommandHandler() => WriteLine("Creating PrintCommandHandler.");
    public void Dispose() => WriteLine("Disposing PrintCommandHandler");

    public async Task OnCommand(PrintCommand command, CommandContext context, CancellationToken cancellationToken)
    {
        WriteLine(command.Message);
        WriteLine("Sir, yes, sir!");
    }
}
#endregion

#region PartC_RecSumCommandSession
public class RecSumCommand : ICommand<long>
{
    public long[] Numbers { get; set; } = Array.Empty<long>();
}
#endregion

public class PartC : DocPart
{
    public async Task PrintCommandSession()
    {
        #region PartC_PrintCommandSession2
        // Building IoC container
        var serviceBuilder = new ServiceCollection()
            .AddScoped<PrintCommandHandler>(); // Try changing this to AddSingleton
        var rpc = serviceBuilder.AddRpc();
        var commanderBuilder = serviceBuilder.AddCommander()
            .AddHandlers<PrintCommandHandler>();
        var services = serviceBuilder.BuildServiceProvider();

        var commander = services.Commander(); // Same as .GetRequiredService<ICommander>()
        await commander.Call(new PrintCommand() { Message = "Are you operational?" });
        await commander.Call(new PrintCommand() { Message = "Are you operational?" });
        #endregion
    }

    public class RecSumCommandHandler
    {
        public RecSumCommandHandler() => WriteLine("Creating RecSumCommandHandler.");
        public void Dispose() => WriteLine("Disposing RecSumCommandHandler");

        [CommandHandler] // Note that ICommandHandler<RecSumCommand, long> support isn't needed
        private async Task<long> RecSum(
            RecSumCommand command,
            IServiceProvider services, // Resolved via CommandContext.Services
            ICommander commander, // Resolved via CommandContext.Services
            CancellationToken cancellationToken)
        {
            var context = CommandContext.GetCurrent();
            Debug.Assert(services == context.Services); // context.Services is a scoped IServiceProvider
            Debug.Assert(commander == services.Commander()); // ICommander is singleton
            Debug.Assert(services != commander.Services); // Scoped IServiceProvider != top-level IServiceProvider
            WriteLine($"Numbers: {command.Numbers.ToDelimitedString()}");

            // Each call creates a new CommandContext
            var contextStack = new List<CommandContext>();
            var currentContext = context;
            while (currentContext != null) {
                contextStack.Add(currentContext);
                currentContext = currentContext.OuterContext;
            }
            WriteLine($"CommandContext stack size: {contextStack.Count}");
            Debug.Assert(contextStack[^1] == context.OutermostContext);

            // Finally, CommandContext.Items is ~ like HttpContext.Items, and similarly to
            // service scope, they are the same for all contexts in recursive call chain.
            var depth = 1 + (int) (context.Items["Depth"] ?? 0);
            context.Items["Depth"] = depth;
            WriteLine($"Depth via context.Items: {depth}");

            // Finally, the actual handler logic :)
            if (command.Numbers.Length == 0)
                return 0;
            var head = command.Numbers[0];
            var tail = command.Numbers[1..];
            var tailSum = await context.Commander.Call(
                new RecSumCommand() { Numbers = tail }, false, // Try changing it to true
                cancellationToken);
            return head + tailSum;
        }
    }

    public async Task RecSumCommandSession()
    {
        #region PartC_RecSumCommandSession2
        // Building IoC container
        var serviceBuilder = new ServiceCollection()
            .AddScoped<RecSumCommandHandler>();
        var rpc = serviceBuilder.AddRpc();
        var commanderBuilder = serviceBuilder.AddCommander()
            .AddHandlers<RecSumCommandHandler>();
        var services = serviceBuilder.BuildServiceProvider();

        var commander = services.Commander(); // Same as .GetRequiredService<ICommander>()
        WriteLine(await commander.Call(new RecSumCommand() { Numbers = new [] { 1L, 2, 3 }}));
        #endregion
    }


    public async Task RecSumCommandServiceSession()
    {
        #region PartC_RecSumCommandServiceSession2
        // Building IoC container
        var serviceBuilder = new ServiceCollection();
        var rpc = serviceBuilder.AddRpc();
        var commanderBuilder = serviceBuilder.AddCommander()
            .AddService<RecSumCommandService>(); // Such services are auto-registered as singletons
        var services = serviceBuilder.BuildServiceProvider();

        var commander = services.Commander();
        var recSumService = services.GetRequiredService<RecSumCommandService>();
        WriteLine(recSumService.GetType());
        WriteLine(await commander.Call(new RecSumCommand() { Numbers = new [] { 1L, 2 }}));
        WriteLine(await commander.Call(new RecSumCommand() { Numbers = new [] { 3L, 4 }}));
        #endregion
    }

    public override async Task Run()
    {
        StartSnippetOutput("PrintCommandSession");
        await PrintCommandSession();
        StartSnippetOutput("RecSumCommandSession");
        await RecSumCommandSession();
        StartSnippetOutput("RecSumCommandServiceSession");
        await RecSumCommandServiceSession();
    }

}

public class FilterHandlerExample : ICommandService
{
    #region PartC_FilterHandler
    [CommandHandler(Priority = 10, IsFilter = true)]
    protected virtual async Task MyFilter(ICommand command, CancellationToken ct)
    {
        var context = CommandContext.GetCurrent();
        // Before
        try {
            await context.InvokeRemainingHandlers(ct);
        }
        finally {
            // After
        }
    }
    #endregion
}

#region PartC_RecSumCommandServiceSession
public class RecSumCommandService : ICommandService
{
    [CommandHandler] // Note that ICommandHandler<RecSumCommand, long> support isn't needed
    public virtual async Task<long> RecSum( // Notice "public virtual"!
        RecSumCommand command,
        // You can't have any extra arguments here
        CancellationToken cancellationToken = default)
    {
        if (command.Numbers.Length == 0)
            return 0;
        var head = command.Numbers[0];
        var tail = command.Numbers[1..];
        var context = CommandContext.GetCurrent();
        var tailSum = await context.Commander.Call( // Invoke nested command through Commander
            new RecSumCommand() { Numbers = tail },
            cancellationToken);
        return head + tailSum;
    }

    // This handler is associated with ANY command (ICommand)
    // Priority = 10 means it runs earlier than any handler with the default priority 0
    // IsFilter tells it triggers other handlers via InvokeRemainingHandlers
    [CommandHandler(Priority = 10, IsFilter = true)]
    protected virtual async Task DepthTracker(ICommand command, CancellationToken cancellationToken)
    {
        var context = CommandContext.GetCurrent();
        var depth = 1 + (int) (context.Items["Depth"] ?? 0);
        context.Items["Depth"] = depth;
        WriteLine($"Depth via context.Items: {depth}");

        await context.InvokeRemainingHandlers(cancellationToken).ConfigureAwait(false);
    }

    // Another filter for RecSumCommand
    [CommandHandler(Priority = 9, IsFilter = true)]
    protected virtual Task ArgumentWriter(RecSumCommand command, CancellationToken cancellationToken)
    {
        WriteLine($"Numbers: {command.Numbers.ToDelimitedString()}");
        var context = CommandContext.GetCurrent();
        return context.InvokeRemainingHandlers(cancellationToken);
    }
}
#endregion

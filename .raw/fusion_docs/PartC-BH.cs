using ActualLab.CommandR;
using ActualLab.CommandR.Commands;
using ActualLab.CommandR.Configuration;
using ActualLab.CommandR.Diagnostics;
using ActualLab.CommandR.Internal;
using ActualLab.CommandR.Rpc;
using ActualLab.Fusion;
using ActualLab.Fusion.Operations.Internal;
using ActualLab.Fusion.EntityFramework;
using Microsoft.EntityFrameworkCore;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartCBH;

// ============================================================================
// PartC-BH.md snippets: Built-in Command Handlers
// ============================================================================

public class AppDbContext(DbContextOptions options) : DbContextBase(options);

public static class BuiltInHandlerRegistrations
{
    public static void Examples()
    {
        var services = new ServiceCollection();
        var fusion = services.AddFusion();
        var commander = services.AddCommander();

        {
            #region PartCBH_PreparedCommandHandlerReg
            // Registration (automatic in AddCommander)
            services.AddSingleton(_ => new PreparedCommandHandler());
            commander.AddHandlers<PreparedCommandHandler>();
            #endregion
        }
        {
            #region PartCBH_CommandTracerReg
            // Registration (automatic in AddCommander)
            services.AddSingleton(c => new CommandTracer(c));
            commander.AddHandlers<CommandTracer>();
            #endregion
        }
        {
            #region PartCBH_LocalCommandRunnerReg
            // Registration (automatic in AddCommander)
            services.AddSingleton(_ => new LocalCommandRunner());
            commander.AddHandlers<LocalCommandRunner>();
            #endregion
        }
        {
            #region PartCBH_RpcCommandHandlerReg
            // Registration (automatic in AddCommander)
            services.AddSingleton(c => new RpcCommandHandler(c));
            commander.AddHandlers<RpcCommandHandler>();
            #endregion
        }
        {
            #region PartCBH_OperationReprocessorReg
            // Registration (optional, via AddOperationReprocessor)
            fusion.AddOperationReprocessor();
            #endregion
        }
        {
            #region PartCBH_NestedOperationLoggerReg
            // Registration (automatic in AddFusion)
            services.AddSingleton(c => new NestedOperationLogger(c));
            commander.AddHandlers<NestedOperationLogger>();
            #endregion
        }
        {
            #region PartCBH_InMemoryOperationScopeProviderReg
            // Registration (automatic in AddFusion)
            services.AddSingleton(c => new InMemoryOperationScopeProvider(c));
            commander.AddHandlers<InMemoryOperationScopeProvider>();
            #endregion
        }
        {
            #region PartCBH_InvalidatingCommandCompletionHandlerReg
            // Registration (automatic in AddFusion)
            services.AddSingleton(_ => new InvalidatingCommandCompletionHandler.Options());
            services.AddSingleton(c => new InvalidatingCommandCompletionHandler(
                c.GetRequiredService<InvalidatingCommandCompletionHandler.Options>(), c));
            commander.AddHandlers<InvalidatingCommandCompletionHandler>();
            #endregion
        }
        {
            #region PartCBH_CompletionTerminatorReg
            // Registration (automatic in AddFusion)
            services.AddSingleton(_ => new CompletionTerminator());
            commander.AddHandlers<CompletionTerminator>();
            #endregion
        }
        {
            #region PartCBH_DbOperationScopeProviderReg
            // Registration (via AddOperations on DbContextBuilder)
            services.AddDbContextServices<AppDbContext>(db => {
                db.AddOperations(operations => {
                    // DbOperationScopeProvider is registered here
                });
            });
            #endregion
        }
    }
}

#region PartCBH_FilterHandlerExample
public class LoggingHandler : ICommandHandler<ICommand>
{
    [CommandHandler(Priority = 500_000, IsFilter = true)]
    public async Task OnCommand(ICommand command, CommandContext context, CancellationToken ct)
    {
        Console.WriteLine($"Before: {command.GetType().Name}");
        try {
            await context.InvokeRemainingHandlers(ct);
        }
        finally {
            Console.WriteLine($"After: {command.GetType().Name}");
        }
    }
}

// Registration:
// services.AddSingleton<LoggingHandler>();
// commander.AddHandlers<LoggingHandler>();
#endregion

#region PartCBH_FinalHandlerExample
public class MyCommandHandler : ICommandHandler<MyCommand>
{
    public async Task OnCommand(MyCommand command, CommandContext context, CancellationToken ct)
    {
        // Handle the command - don't call InvokeRemainingHandlers
        await DoWork(command, ct);
    }

    private Task DoWork(MyCommand command, CancellationToken ct) => Task.CompletedTask;
}
#endregion

// Helper types
public record MyCommand : ICommand<Unit>;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using ActualLab.CommandR.Internal;
using ActualLab.CommandR.Operations;
using ActualLab.Fusion.EntityFramework;
using ActualLab.Fusion.EntityFramework.Operations;
using ActualLab.Fusion.Operations.Internal;
using ActualLab.Fusion.EntityFramework.Operations.LogProcessing;
using ActualLab.Fusion.EntityFramework.LogProcessing;
using ActualLab.Fusion.EntityFramework.Internal;
using ActualLab.Fusion.EntityFramework.Npgsql;
using ActualLab.Fusion.EntityFramework.Redis;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartO;

// Sample DbContext for Part 6
public class AppDbContext(DbContextOptions options) : DbContextBase(options)
{
    // ActualLab.Fusion.EntityFramework.Operations tables
    #region PartO_DbSet
    public DbSet<DbOperation> Operations { get; protected set; } = null!;
    public DbSet<DbEvent> Events { get; protected set; } = null!;
    #endregion
}

#region PartO_PostMessageCommand
public record PostMessageCommand(Session Session, string Text) : ICommand<ChatMessage>;
#endregion

// Placeholder for ChatMessage type (actual type would be in your domain)
public record ChatMessage(long Id, string Text);

// Example: Pre-OF handler (old pattern, before Operations Framework)
public class PreOfChatService(IServiceProvider services) : DbServiceBase<AppDbContext>(services), IComputeService
{
    #region PartO_PreOfHandler
    public async Task<ChatMessage> PostMessage(
        Session session, string text, CancellationToken cancellationToken = default)
    {
        await using var dbContext = await DbHub.CreateDbContext(cancellationToken).ConfigureAwait(false);
        // Actual code...
        var message = await PostMessageImpl(dbContext, session, text, cancellationToken);

        // Invalidation
        using (Invalidation.Begin())
            _ = PseudoGetAnyChatTail();
        return message;
    }
    #endregion

    [ComputeMethod]
    public virtual Task<ChatMessage[]> PseudoGetAnyChatTail() => Task.FromResult(Array.Empty<ChatMessage>());

    // Fake implementation placeholder
    private Task<ChatMessage> PostMessageImpl(AppDbContext db, Session session, string text, CancellationToken ct)
        => Task.FromResult(new ChatMessage(0, text));
}

// Sample service demonstrating command handler pattern
public class ChatService(IServiceProvider services) : DbServiceBase<AppDbContext>(services), IComputeService
{
    #region PartO_PostOfHandler
    [CommandHandler]
    public virtual async Task<ChatMessage> PostMessage(
        PostMessageCommand command, CancellationToken cancellationToken = default)
    {
        if (Invalidation.IsActive) {
            _ = PseudoGetAnyChatTail();
            return default!;
        }

        await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken);
        // Actual code...
        var message = await PostMessageImpl(dbContext, command, cancellationToken);
        return message;
    }
    #endregion

    // Placeholder compute method for invalidation
    [ComputeMethod]
    public virtual Task<ChatMessage[]> PseudoGetAnyChatTail() => Task.FromResult(Array.Empty<ChatMessage>());

    // Fake implementation placeholder
    private Task<ChatMessage> PostMessageImpl(AppDbContext db, PostMessageCommand command, CancellationToken ct)
        => Task.FromResult(new ChatMessage(0, command.Text));
}

public class PartO : DocPart
{
    public override async Task Run()
    {
        StartSnippetOutput("Reference verification");

        // 1. DbOperation - entity for operation log
        _ = typeof(DbOperation); // "DbOperation" from docs

        // 2. DbServiceBase - base class for services using EF
        _ = typeof(DbServiceBase<>); // "DbServiceBase" from docs

        // 3. Invalidation - for checking/starting invalidation mode
        _ = typeof(Invalidation); // "Invalidation" from docs
        _ = Invalidation.IsActive; // "Invalidation.IsActive" from docs

        // 4. CommandContext - context for current command
        _ = typeof(CommandContext); // "CommandContext" from docs
        // CommandContext.GetCurrent() - for getting current context
        // CommandContext.Operation.Items - for passing data to invalidation

        // 5. ICommand<TResult> - command interface
        _ = typeof(ICommand<Unit>); // "ICommand<TResult>" from docs

        // 6. Command handler priorities
        // CommanderCommandHandlerPriority (ActualLab.CommandR)
        _ = CommanderCommandHandlerPriority.PreparedCommandHandler; // Priority: 1_000_000_000
        _ = CommanderCommandHandlerPriority.CommandTracer; // Priority: 998_000_000
        _ = CommanderCommandHandlerPriority.LocalCommandRunner; // Priority: 900_000_000
        _ = CommanderCommandHandlerPriority.RpcRoutingCommandHandler; // Priority: 800_000_000

        // FusionOperationsCommandHandlerPriority (ActualLab.Fusion)
        _ = FusionOperationsCommandHandlerPriority.OperationReprocessor; // Priority: 100_000
        _ = FusionOperationsCommandHandlerPriority.NestedCommandLogger; // Priority: 11_000
        _ = FusionOperationsCommandHandlerPriority.InMemoryOperationScopeProvider; // Priority: 10_000
        _ = FusionOperationsCommandHandlerPriority.InvalidatingCommandCompletionHandler; // Priority: 100
        _ = FusionOperationsCommandHandlerPriority.CompletionTerminator; // Priority: -1_000_000_000

        // FusionEntityFrameworkCommandHandlerPriority (ActualLab.Fusion.EntityFramework)
        _ = FusionEntityFrameworkCommandHandlerPriority.DbOperationScopeProvider; // Priority: 1000

        // 7. PreparedCommandHandler - validates IPreparedCommand
        _ = typeof(PreparedCommandHandler); // "PreparedCommandHandler" from docs
        _ = typeof(IPreparedCommand); // "IPreparedCommand" from docs

        // 8. NestedOperationLogger - logs nested commands (was "NestedCommandLogger" in docs)
        _ = typeof(NestedOperationLogger); // "NestedCommandLogger" from docs - RENAMED
        _ = typeof(NestedOperation); // Nested operations are logged into Operation.NestedOperations

        // 9. InMemoryOperationScopeProvider - catch-all operation scope (was "TransientOperationScopeProvider" in docs)
        _ = typeof(InMemoryOperationScopeProvider); // "TransientOperationScopeProvider" from docs - RENAMED

        // 10. OperationCompletionNotifier - notifies completion listeners
        _ = typeof(OperationCompletionNotifier); // "OperationCompletionNotifier" from docs

        // 11. IOperationCompletionListener - listens for operation completion
        _ = typeof(IOperationCompletionListener); // "IOperationCompletionListener" from docs

        // 12. CompletionProducer - produces completion commands
        _ = typeof(CompletionProducer); // "CompletionProducer" from docs

        // 13. Completion<T> / ICompletion<T> - completion command wrapper
        _ = typeof(Completion<>); // "Completion<TCommand>" from docs
        _ = typeof(ICompletion<>); // "ICompletion<TCommand>" from docs

        // 14. InvalidatingCommandCompletionHandler - runs invalidation on completion (was "InvalidateOnCompletionCommandHandler")
        _ = typeof(InvalidatingCommandCompletionHandler); // "InvalidateOnCompletionCommandHandler" from docs - RENAMED

        // 15. DbOperationLogReader - reads operation log
        _ = typeof(DbOperationLogReader<>); // "DbOperationLogReader" from docs

        // 16. DbHub - modern way to get operation DbContext
        _ = typeof(DbHub<>); // "DbHub" - modern API, docs mention "CreateOperationDbContext"

        // 17. Operation log watchers - for multi-host invalidation
        _ = typeof(DbOperationsBuilder<>); // Builder for configuring operation log watchers
        _ = typeof(FileSystemDbLogWatcher<,>); // AddFileSystemOperationLogWatcher
        _ = typeof(NpgsqlDbLogWatcher<,>); // AddNpgsqlOperationLogWatcher
        _ = typeof(RedisDbLogWatcher<,>); // AddRedisOperationLogWatcher

        // 18. HostId - identifies the host/process (was "AgentInfo" in docs)
        _ = typeof(HostId); // "AgentInfo" from docs - RENAMED to HostId

        WriteLine("All identifier references verified successfully!");
        WriteLine();

        StartSnippetOutput("Name Changes from Documentation");
        WriteLine("- NestedCommandLogger -> NestedOperationLogger");
        WriteLine("- TransientOperationScopeProvider -> InMemoryOperationScopeProvider");
        WriteLine("- InvalidateOnCompletionCommandHandler -> InvalidatingCommandCompletionHandler");
        WriteLine("- DbServiceBase.CreateOperationDbContext() -> DbHub.CreateOperationDbContext()");
        WriteLine("- AgentInfo -> HostId (moved to ActualLab.Core)");

        StartSnippetOutput("Command Handler Priorities");
        WriteLine($"- PreparedCommandHandler: {CommanderCommandHandlerPriority.PreparedCommandHandler:N0}");
        WriteLine($"- NestedCommandLogger: {FusionOperationsCommandHandlerPriority.NestedCommandLogger:N0}");
        WriteLine($"- InMemoryOperationScopeProvider: {FusionOperationsCommandHandlerPriority.InMemoryOperationScopeProvider:N0}");
        WriteLine($"- InvalidatingCommandCompletionHandler: {FusionOperationsCommandHandlerPriority.InvalidatingCommandCompletionHandler:N0}");

        await Task.CompletedTask;
    }

    // Example: AddDbContextServices configuration
    #region PartO_AddDbContextServices
    public static void ConfigureServices(IServiceCollection services, IHostEnvironment Env)
    {
        services.AddDbContextServices<AppDbContext>(db => {
            // Uncomment if you'll be using AddRedisOperationLogWatcher
            // db.AddRedisDb("localhost", "FusionDocumentation.PartO");

            db.AddOperations(operations => {
                // This call enabled Operations Framework (OF) for AppDbContext.
                operations.ConfigureOperationLogReader(_ => new() {
                    // We use AddFileSystemOperationLogWatcher, so unconditional wake up period
                    // can be arbitrary long – all depends on the reliability of Notifier-Monitor chain.
                    // See what .ToRandom does – most of timeouts in Fusion settings are RandomTimeSpan-s,
                    // but you can provide a normal one too – there is an implicit conversion from it.
                    CheckPeriod = TimeSpan.FromSeconds(Env.IsDevelopment() ? 60 : 5).ToRandom(0.05),
                });
                // Optionally enable file-based operation log watcher
                operations.AddFileSystemOperationLogWatcher();

                // Or, if you use PostgreSQL, use this instead of above line
                // operations.AddNpgsqlOperationLogWatcher();

                // Or, if you use Redis, use this instead of above line
                // operations.AddRedisOperationLogWatcher();
            });
        });
    }
    #endregion
}

// Example: Command with operation items pattern
#region PartO_SignOutCommand
public record SignOutCommand(Session Session, bool Force = false) : ICommand<Unit>;
#endregion

// Example: Service demonstrating operation items usage
public class AuthServiceExample(IServiceProvider services) : DbServiceBase<AppDbContext>(services), IComputeService
{
    #region PartO_SignOutHandler
    public virtual async Task SignOut(
        SignOutCommand command, CancellationToken cancellationToken = default)
    {
        // ...
        var context = CommandContext.GetCurrent();
        if (Invalidation.IsActive) {
            // Fetch operation item
            var invSessionInfo = context.Operation.Items.KeylessGet<SessionInfo>();
            if (invSessionInfo is not null) {
                // Use it
                _ = GetUser(invSessionInfo.UserId, default);
                _ = GetUserSessions(invSessionInfo.UserId, default);
            }
            return;
        }

        await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken).ConfigureAwait(false);

        var dbSessionInfo = await Sessions.FindOrCreate(dbContext, command.Session, cancellationToken).ConfigureAwait(false);
        var sessionInfo = dbSessionInfo.ToModel();
        if (sessionInfo.IsSignOutForced)
            return;

        // Store operation item for invalidation logic
        context.Operation.Items.KeylessSet(sessionInfo);
        // ...
    }
    #endregion

    // Placeholder types and methods for the example
    protected DbSessionInfoRepo Sessions { get; } = null!;
    [ComputeMethod] public virtual Task<User?> GetUser(string userId, CancellationToken ct) => Task.FromResult<User?>(null);
    [ComputeMethod] public virtual Task<SessionInfo[]> GetUserSessions(string userId, CancellationToken ct) => Task.FromResult(Array.Empty<SessionInfo>());
}

// Placeholder types for SignOut example
public record SessionInfo(string UserId, bool IsSignOutForced);
public record User(string Id, string Name);
public class DbSessionInfoRepo
{
    public Task<DbSessionInfo> FindOrCreate(AppDbContext db, Session session, CancellationToken ct) => Task.FromResult(new DbSessionInfo());
}
public record DbSessionInfo
{
    public SessionInfo ToModel() => new("", false);
}

// Example: Completion command invocation
public static class CompletionExample
{
    #region PartO_CompletionCall
    public static async Task InvokeCompletion(ICommander Commander, Operation operation)
    {
        await Commander.Call(Completion.New(operation), true).ConfigureAwait(false);
    }
    #endregion
}

// Example: InvalidatingCommandCompletionHandler signature
public class InvalidatingHandlerExample
{
    #region PartO_InvalidatingHandler
    [CommandHandler(Priority = 100, IsFilter = true)]
    public async Task OnCommand(
      ICompletion command, CommandContext context, CancellationToken cancellationToken)
    {
        //  ...
    }
    #endregion
}

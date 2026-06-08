using ActualLab.Rpc;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartRNoWait;

// ============================================================================
// PartR-RpcNoWait.md snippets
// ============================================================================

#region PartRNoWait_Interface
public interface ISimpleService : IRpcService
{
    // Fire-and-forget method - caller won't wait for completion
    Task<RpcNoWait> Ping(string message);
}
#endregion

#region PartRNoWait_Implementation
public class SimpleService : ISimpleService
{
    public async Task<RpcNoWait> Ping(string message)
    {
        // Process the message (e.g., log it, update state, etc.)
        Console.WriteLine($"Received ping: {message}");

        // Return default - the caller won't wait for this anyway
        return default;
    }
}
#endregion

public class RpcNoWaitExamples
{
    private ISimpleService simpleService = null!;
    private IServiceProvider services = null!;
    private readonly CancellationToken cancellationToken = default;

    public async Task ClientCallExample()
    {
        #region PartRNoWait_ClientCall
        // You can await it - completes immediately after sending
        await simpleService.Ping("Hello!");

        // Or fire-and-forget (but be aware of potential connection issues)
        _ = simpleService.Ping("Hello!");
        #endregion
    }

    public async Task WhenConnectedExample()
    {
        #region PartRNoWait_WhenConnected
        var peer = services.RpcHub().GetClientPeer(RpcPeerRef.Default);
        await peer.WhenConnected(cancellationToken);
        await simpleService.Ping("Now it's very likely to be sent!");
        #endregion
    }
}

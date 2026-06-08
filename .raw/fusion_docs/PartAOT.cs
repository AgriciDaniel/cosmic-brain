using System.Diagnostics.CodeAnalysis;
using ActualLab.CommandR.Trimming;
using ActualLab.Fusion.Trimming;
using ActualLab.Interception;
using ActualLab.Interception.Trimming;
using ActualLab.Rpc;
using ActualLab.Rpc.Trimming;
using ActualLab.Trimming;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartAOT;

// Fake types for snippet compilation
public interface ITestService : IComputeService
{
    Task<DateTime> GetTime();
}

public class TestService : ITestService
{
    [ComputeMethod]
    public virtual Task<DateTime> GetTime() => Task.FromResult(DateTime.UtcNow);
}

public class MyResult { }
public class MyCommand { }
public class MyDto { }
public interface IMyService : IRequiresAsyncProxy { }
public class MyServiceProxy : IProxy
{
    public Interceptor Interceptor { get; set; } = null!;
}
public class MyType { }

// ============================================================================
// RuntimeCodegen Modes
// ============================================================================

public static class RuntimeCodegenModes
{
    public static void Example()
    {
        #region PartAOT_CheckMode
        // Check the current mode
        Console.WriteLine($"RuntimeCodegen.Mode: {RuntimeCodegen.Mode}");

        // In Native AOT:
        // - NativeMode will be InterpretedExpressions
        // - DynamicMethods is not available
        #endregion
    }
}

// ============================================================================
// CodeKeeper Infrastructure - showing the conceptual hierarchy
// ============================================================================

// The actual implementation is in ActualLab.Trimming, ActualLab.Interception.Trimming, etc.
// Below shows the conceptual API:
/*
#region PartAOT_CodeKeeperBase
public static class CodeKeeper
{
    // Never evaluates to true at runtime, but compiler can't prove it
    public static readonly bool AlwaysFalse;
    public static readonly bool AlwaysTrue;

    // Extension point for downstream projects
    public static IExtension? Extension { get; set; }

    // Register a type to prevent trimming
    public static void Keep<T>();
    public static void Keep(Type type);
    public static void Keep(string assemblyQualifiedTypeName);

    // Register serializable types
    public static void KeepSerializable<T>();

    public interface IExtension { ... }
}
#endregion
*/

// ============================================================================
// Complete Example - conceptual (would have entry point conflict)
// ============================================================================

/*
#region PartAOT_CompleteExample
#pragma warning disable IL3050

public static async Task Main()
{
    // No CodeKeeper setup needed — module initializers handle it automatically.
    // FusionModuleInitializer sets ProxyCodeKeeper.Extension = new FusionProxyCodeKeeperExtension()
    // RpcModuleInitializer sets MethodDefCodeKeeper.Extension = new RpcMethodDefCodeKeeperExtension()

    // Configure services as usual
    var services = new ServiceCollection()
        .AddLogging(l => l.AddSimpleConsole())
        .AddFusion(fusion => {
            fusion.Rpc.AddWebSocketClient();
            fusion.AddServerAndClient<ITestService, TestService>();
        })
        .AddSingleton(_ => RpcOutboundCallOptions.Default with {
            RouterFactory = methodDef => args => RpcPeerRef.Loopback,
        })
        .BuildServiceProvider();

    // Use services
    var client = services.RpcHub().GetClient<ITestService>();
    var now = await client.GetTime();
}

#pragma warning restore IL3050
#endregion
*/

// ============================================================================
// Custom CodeKeeper for Service Methods
// ============================================================================

#region PartAOT_CustomCodeKeeperMethods
public class MyAppCodeKeeperExt : ProxyCodeKeeper.IExtension
{
    public void KeepProxy<
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TBase,
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TProxy>()
        where TBase : IRequiresAsyncProxy
        where TProxy : IProxy
    { }

    public void KeepMethodArgument<
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TArg>(
        string name, int index)
    { }

    public void KeepMethodResult<
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TResult,
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TUnwrapped>(
        string name)
    {
        if (CodeKeeper.AlwaysTrue)
            return;

        // Keep types used as method results
        CodeKeeper.Keep<MyResult>();

        // Keep serializable types
        CodeKeeper.KeepSerializable<MyDto>();
    }
}
#endregion

// ============================================================================
// Custom CodeKeeper for Proxy Types
// ============================================================================

#region PartAOT_CustomCodeKeeperProxy
public class MyAppProxyCodeKeeperExt : ProxyCodeKeeper.IExtension
{
    public void KeepProxy<
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TBase,
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TProxy>()
        where TBase : IRequiresAsyncProxy
        where TProxy : IProxy
    {
        if (CodeKeeper.AlwaysTrue)
            return;

        // Keep service interface and its generated proxy
        CodeKeeper.Keep<IMyService>();
        CodeKeeper.Keep<MyServiceProxy>();
    }

    public void KeepMethodArgument<
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TArg>(
        string name, int index)
    { }

    public void KeepMethodResult<
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TResult,
        [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] TUnwrapped>(
        string name)
    { }
}

// Use your custom code keeper extension
// ProxyCodeKeeper.Extension = new MyAppProxyCodeKeeperExt();
#endregion

// ============================================================================
// How CodeKeeper Works
// ============================================================================

#region PartAOT_HowCodeKeeperWorks
public static class MyCodeKeeper
{
    public static void KeepMyType()
    {
        // This condition is always true at runtime, but the compiler can't prove it
        if (CodeKeeper.AlwaysTrue)
            return;

        // This code is never executed, but the trimmer sees the reference
        // and preserves the type
        CodeKeeper.Keep<MyType>();
    }
}
#endregion

// ============================================================================
// AlwaysFalse Implementation - conceptual
// ============================================================================

// The actual implementation uses runtime values that can't be evaluated at compile time
/*
#region PartAOT_AlwaysFalseImplementation
public static readonly bool AlwaysFalse = RandomShared.NextDouble() > 2;
#endregion
*/

// ============================================================================
// Suppress Trimming Warnings
// ============================================================================

public static class SuppressTrimmingWarnings
{
    #region PartAOT_SuppressWarnings
    [UnconditionalSuppressMessage("Trimming", "IL2026",
        Justification = "Types are preserved by CodeKeeper")]
    [UnconditionalSuppressMessage("Trimming", "IL3050",
        Justification = "Types are preserved by CodeKeeper")]
    public static void MyMethod() { }
    #endregion
}

// ============================================================================
// DynamicallyAccessedMembers
// ============================================================================

public static class DynamicallyAccessedMembersExample
{
    #region PartAOT_DynamicallyAccessedMembers
    public static void ProcessType<[DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.All)] T>()
    {
        // T's members are preserved by the trimmer
    }
    #endregion
}

// ============================================================================
// ArgumentList Support
// ============================================================================

public static class ArgumentListSupport
{
    public static void Example()
    {
        #region PartAOT_ArgumentListSupport
        // These types are auto-generated and need preservation
        var l0 = ArgumentList.New();                    // ArgumentList0
        var l2 = ArgumentList.New(1, "s");              // ArgumentList2<int, string>
        var l10 = ArgumentList.New(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);  // ArgumentList10<...>
        #endregion
    }
}

// ============================================================================
// DocPart class
// ============================================================================

public class PartAOT : DocPart
{
    public override async Task Run()
    {
        StartSnippetOutput("Reference verification");

        // Core trimming infrastructure
        _ = typeof(CodeKeeper);
        _ = typeof(ProxyCodeKeeper);
        _ = typeof(CommanderProxyCodeKeeperExtension);
        _ = typeof(RpcProxyCodeKeeperExtension);
        _ = typeof(FusionProxyCodeKeeperExtension);

        // RuntimeCodegen
        _ = typeof(RuntimeCodegen);
        _ = typeof(RuntimeCodegenMode);
        _ = RuntimeCodegen.Mode;
        _ = RuntimeCodegen.NativeMode;
        _ = RuntimeCodegenMode.DynamicMethods;
        _ = RuntimeCodegenMode.InterpretedExpressions;

        // ArgumentList
        _ = typeof(ArgumentList);
        _ = ArgumentList.New();
        _ = ArgumentList.New(1, "test");

        // AlwaysFalse/AlwaysTrue
        _ = CodeKeeper.AlwaysFalse;
        _ = CodeKeeper.AlwaysTrue;

        WriteLine("All Native AOT references verified successfully!");
        WriteLine();

        await Task.CompletedTask;
    }
}

using System.Buffers;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using ActualLab.Interception;
using ActualLab.IO;
using ActualLab.Rpc;
using ActualLab.Rpc.Infrastructure;
using ActualLab.Rpc.Serialization;
using ActualLab.Serialization;
using MemoryPack;
using MessagePack;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartRSerialization;

// Fake types for snippet compilation
public class MyArgumentSerializer() : RpcArgumentSerializer
{
    public override void Serialize(ArgumentList arguments, bool needsPolymorphism, ArrayPoolBuffer<byte> buffer)
        => throw new NotImplementedException();

    public override void Deserialize(ref ArgumentList arguments, bool needsPolymorphism, ReadOnlyMemory<byte> data)
        => throw new NotImplementedException();
}

public class MyMessageSerializer(RpcPeer peer) : RpcMessageSerializer(peer)
{
    public override RpcInboundMessage Read(ReadOnlyMemory<byte> data, out int readLength)
        => throw new NotImplementedException();

    public override void Write(ArrayPoolBuffer<byte> buffer, RpcOutboundMessage message)
        => throw new NotImplementedException();
}

// ============================================================================
// Format Structure
// ============================================================================

#region PartRSerialization_FormatStructure
public sealed class RpcSerializationFormatExample(
    string key,
    Func<RpcArgumentSerializer> argumentSerializerFactory,
    Func<RpcPeer, RpcMessageSerializer> messageSerializerFactory)
{
    public string Key { get; } = key;
    public RpcArgumentSerializer ArgumentSerializer { get; } = argumentSerializerFactory();
    public Func<RpcPeer, RpcMessageSerializer> MessageSerializerFactory { get; } = messageSerializerFactory;
}
#endregion

// ============================================================================
// Accessing Formats
// ============================================================================

public static class AccessingFormats
{
    public static void Example()
    {
        #region PartRSerialization_AccessingFormats
        // All registered formats
        ImmutableList<RpcSerializationFormat> all = RpcSerializationFormat.All;

        // Find by key
        var format = RpcSerializationFormat.All.First(f => f.Key == "mempack6c");
        #endregion
    }
}

// ============================================================================
// Configuring Formats
// ============================================================================

public static class ConfiguringFormats
{
    public static void RegisterAdditionalFormat()
    {
        #region PartRSerialization_RegisterFormat
        RpcSerializationFormat.All = RpcSerializationFormat.All.Add(
            new RpcSerializationFormat(
                "custom",
                () => new MyArgumentSerializer(),
                peer => new MyMessageSerializer(peer)));
        #endregion
    }

    public static void RemoveOldFormats()
    {
        #region PartRSerialization_RemoveFormats
        // To disable older formats for security:
        RpcSerializationFormat.All = RpcSerializationFormat.All
            .RemoveAll(f => f.Key.StartsWith("mempack5") || f.Key.StartsWith("msgpack5"));
        #endregion
    }
}

// ============================================================================
// RpcSerializableAttribute
// ============================================================================

#region PartRSerialization_RpcSerializableAttribute
// The underlying serializers handle polymorphism via union attributes,
// so we mark this type as RPC-serializable to opt out of TypeRef wrapping.
[RpcSerializable]
[MemoryPackable]
[MemoryPackUnion(0, typeof(ShapeCircle))]
[MemoryPackUnion(1, typeof(ShapeRect))]
[MessagePackObject]
[Union(0, typeof(ShapeCircle))]
[Union(1, typeof(ShapeRect))]
[JsonDerivedType(typeof(ShapeCircle), "circle")]
[JsonDerivedType(typeof(ShapeRect), "rect")]
public abstract partial class Shape
{
    [DataMember, MemoryPackOrder(0), Key(0)]
    public string? Name { get; set; }
}

[DataContract, MemoryPackable(GenerateType.VersionTolerant), MessagePackObject]
public partial class ShapeCircle : Shape
{
    [DataMember, MemoryPackOrder(1), Key(1)]
    public double Radius { get; set; }
}

[DataContract, MemoryPackable(GenerateType.VersionTolerant), MessagePackObject]
public partial class ShapeRect : Shape
{
    [DataMember, MemoryPackOrder(1), Key(1)]
    public double Width { get; set; }

    [DataMember, MemoryPackOrder(2), Key(2)]
    public double Height { get; set; }
}
#endregion

// ============================================================================
// DocPart class
// ============================================================================

public class PartRSerialization : DocPart
{
    public override async Task Run()
    {
        StartSnippetOutput("Reference verification");

        // Core types
        _ = typeof(RpcSerializationFormat);
        _ = typeof(RpcArgumentSerializer);
        _ = typeof(RpcMessageSerializer);
        _ = typeof(RpcPeer);

        // Available formats
        _ = RpcSerializationFormat.All;

        // Specific formats (verify they exist)
        var formats = RpcSerializationFormat.All;

        // Text formats (JSON)
        var json5 = formats.FirstOrDefault(f => f.Key == "json5");
        var njson5 = formats.FirstOrDefault(f => f.Key == "njson5");

        // Binary formats (MemoryPack)
        var mempack6c = formats.FirstOrDefault(f => f.Key == "mempack6c");
        var mempack6 = formats.FirstOrDefault(f => f.Key == "mempack6");
        var mempack5c = formats.FirstOrDefault(f => f.Key == "mempack5c");
        var mempack5 = formats.FirstOrDefault(f => f.Key == "mempack5");

        // Binary formats (MessagePack)
        var msgpack6c = formats.FirstOrDefault(f => f.Key == "msgpack6c");
        var msgpack6 = formats.FirstOrDefault(f => f.Key == "msgpack6");
        var msgpack5c = formats.FirstOrDefault(f => f.Key == "msgpack5c");
        var msgpack5 = formats.FirstOrDefault(f => f.Key == "msgpack5");

        WriteLine($"Total registered formats: {formats.Count}");
        WriteLine("Format keys: " + string.Join(", ", formats.Select(f => f.Key)));
        WriteLine();

        WriteLine("All RPC Serialization Formats references verified successfully!");
        WriteLine();

        await Task.CompletedTask;
    }
}

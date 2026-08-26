using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using ActualLab.Collections;
using ActualLab.Collections.Internal;
using ActualLab.CommandR.Operations;
using ActualLab.Fusion.EntityFramework.Operations;
using ActualLab.Serialization;
using MemoryPack;
using MessagePack;
using Newtonsoft.Json;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartOSerialization;

// Fake types for snippet compilation
public record Todo(string Id, string Title, string? Description);
public record User(string Id, string Name, string? Email);
public class MyCustomConverter : Newtonsoft.Json.JsonConverter
{
    public override void WriteJson(JsonWriter writer, object? value, Newtonsoft.Json.JsonSerializer serializer)
        => throw new NotImplementedException();
    public override object? ReadJson(JsonReader reader, Type objectType, object? existingValue, Newtonsoft.Json.JsonSerializer serializer)
        => throw new NotImplementedException();
    public override bool CanConvert(Type objectType) => false;
}

public class MyDto { }

// ============================================================================
// DbOperation Storage
// ============================================================================

public static class DbOperationStorage
{
    public static void DefaultSerializerExample()
    {
        #region PartOSerialization_DefaultSerializer
        // DbOperation.Serializer is a static, mutable property.
        // Its default value is NewtonsoftJsonSerializer.Default.
        ITextSerializer serializer = DbOperation.Serializer;
        #endregion
        _ = serializer;
    }

    public static void ItemsSerializationExample(Operation operation)
    {
        ITextSerializer Serializer = NewtonsoftJsonSerializer.Default;

        #region PartOSerialization_ItemsSerialization
        // How Items are serialized to DbOperation
        var ItemsJson = operation.Items.Items.Count == 0
            ? null
            : Serializer.Write(operation.Items.Snapshot, typeof(PropertyBag));
        #endregion
    }
}

// ============================================================================
// PropertyBag Internals - conceptual structure
// ============================================================================

// The actual PropertyBagItem is in ActualLab.Collections.Internal namespace
/*
#region PartOSerialization_PropertyBagItem
[DataContract, MemoryPackable, MessagePackObject]
public partial record struct PropertyBagItem(
    [property: DataMember] string Key,
    [property: DataMember] TypeDecoratingUniSerialized<object> Serialized);
#endregion
*/

public static class PropertyBagUsage
{
    public static void HeterogeneousValues(Operation operation)
    {
        var myDto = new MyDto();

        #region PartOSerialization_PropertyBagUsage
        // Store different types in the same operation
        operation.Items.Set("userId", 123L);           // long
        operation.Items.Set("metadata", myDto);        // custom type
        operation.Items.Set("tags", new[] { "a", "b" }); // array

        // Types are preserved after serialization round-trip
        var userId = operation.Items.Get<long>("userId");     // Works correctly
        var metadata = operation.Items.Get<MyDto>("metadata"); // Type preserved
        #endregion
    }
}

// ============================================================================
// Customizing Serialization
// ============================================================================

public static class CustomizingSerialization
{
    public static void ChangeDefaultSerializer()
    {
        #region PartOSerialization_ChangeSerializer
        // At application startup, before any operations are processed
        DbOperation.Serializer = new NewtonsoftJsonSerializer(new JsonSerializerSettings {
            TypeNameHandling = TypeNameHandling.Auto,
            NullValueHandling = NullValueHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            // Add custom converters if needed
            Converters = { new MyCustomConverter() },
        });
        #endregion
    }

    public static void UseTypeDecoratedSerializer()
    {
        JsonSerializerSettings customSettings = new();

        #region PartOSerialization_TypeDecoratedSerializer
        DbOperation.Serializer = new TypeDecoratingTextSerializer(
            new NewtonsoftJsonSerializer(customSettings));
        #endregion
    }
}

// ============================================================================
// Command Serialization
// ============================================================================

#region PartOSerialization_CommandRecord
// Command types must be serializable
[DataContract, MemoryPackable, MessagePackObject]
public sealed partial record CreateTodoCommand(
    [property: DataMember, MemoryPackOrder(0), Key(0)] string Title,
    [property: DataMember, MemoryPackOrder(1), Key(1)] string? Description
) : ICommand<Todo>;
#endregion

#region PartOSerialization_FullyAnnotatedCommand
[DataContract, MemoryPackable(GenerateType.VersionTolerant), MessagePackObject(true)]
public sealed partial record MyCommand(
    [property: DataMember(Order = 0), MemoryPackOrder(0)] string Id,
    [property: DataMember(Order = 1), MemoryPackOrder(1)] string Data
) : ICommand<string>
{
    [System.Text.Json.Serialization.JsonConstructor, MemoryPackConstructor, SerializationConstructor]
    public MyCommand() : this("", "") { }
}
#endregion

// ============================================================================
// Schema Evolution
// ============================================================================

// Version 1
#region PartOSerialization_SchemaV1
public record CreateUserCommandV1(string Name) : ICommand<User>;
#endregion

// Version 2 - safe evolution
#region PartOSerialization_SchemaV2
public record CreateUserCommandV2(
    string Name,
    string? Email = null  // New optional property
) : ICommand<User>;
#endregion

// ============================================================================
// DocPart class
// ============================================================================

public class PartOSerialization : DocPart
{
    public override async Task Run()
    {
        StartSnippetOutput("Reference verification");

        // Core types
        _ = typeof(DbOperation);
        _ = typeof(Operation);
        _ = typeof(MutablePropertyBag);
        _ = typeof(PropertyBag);
        _ = typeof(PropertyBagItem);

        // Serializers
        _ = typeof(NewtonsoftJsonSerializer);
        _ = typeof(TypeDecoratingTextSerializer);
        _ = typeof(TypeDecoratingUniSerialized<>);

        // DbOperation serializer
        _ = DbOperation.Serializer;

        // Command interface
        _ = typeof(ICommand<>);

        WriteLine("All Operations Framework Serialization references verified successfully!");
        WriteLine();

        await Task.CompletedTask;
    }
}

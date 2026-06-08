using System.Runtime.CompilerServices;
using System.Runtime.Serialization;
using ActualLab.Rpc;
using MemoryPack;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartRStream;

// ============================================================================
// PartR-RpcStream.md snippets
// ============================================================================

#region PartRStream_Interface
public interface ISimpleService : IRpcService
{
    // Returns a table with streaming rows
    Task<Table<int>> GetTable(string title, CancellationToken cancellationToken = default);
}
#endregion

#region PartRStream_SumInterface
public interface ISumService : IRpcService
{
    // Server receives a stream from the client and computes the sum
    Task<int> Sum(RpcStream<int> stream, CancellationToken cancellationToken = default);
}
#endregion

#region PartRStream_Records
[DataContract, MemoryPackable(GenerateType.VersionTolerant)]
public sealed partial record Table<T>(
    [property: DataMember(Order = 0), MemoryPackOrder(0)] string Title,
    [property: DataMember(Order = 1), MemoryPackOrder(1)] RpcStream<Row<T>> Rows);

[DataContract, MemoryPackable(GenerateType.VersionTolerant)]
public sealed partial record Row<T>(
    [property: DataMember(Order = 0), MemoryPackOrder(0)] int Index,
    [property: DataMember(Order = 1), MemoryPackOrder(1)] RpcStream<T> Items);
#endregion

#region PartRStream_Implementation
public class SimpleService : ISimpleService, ISumService
{
    public Task<Table<int>> GetTable(string title, CancellationToken cancellationToken = default)
    {
        // Create the table with a stream of rows
        var table = new Table<int>(title, RpcStream.New(GetRows(CancellationToken.None)));
        return Task.FromResult(table);
    }

    private async IAsyncEnumerable<Row<int>> GetRows(
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        for (var i = 0; ; i++) {
            await Task.Delay(100, cancellationToken); // Simulate work
            // Each row contains its own stream of items
            yield return new Row<int>(i, RpcStream.New(GetItems(i, CancellationToken.None)));
        }
    }

    private async IAsyncEnumerable<int> GetItems(
        int index, [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        for (var i = 0; ; i++) {
            await Task.Delay(50, cancellationToken); // Simulate work
            yield return index * i;
        }
    }

    public Task<int> Sum(RpcStream<int> stream, CancellationToken cancellationToken = default)
        => stream.SumAsync(cancellationToken).AsTask();
}
#endregion

public class RpcStreamExamples
{
    private ISimpleService simpleService = null!;
    private ISumService sumService = null!;
    private readonly CancellationToken cancellationToken = default;

    public async Task ClientConsumeExample()
    {
        #region PartRStream_ClientConsume
        var table = await simpleService.GetTable("My Table", cancellationToken);
        Console.WriteLine($"Table: {table.Title}");

        await foreach (var row in table.Rows.WithCancellation(cancellationToken)) {
            Console.WriteLine($"Row {row.Index}:");

            await foreach (var item in row.Items.WithCancellation(cancellationToken)) {
                Console.WriteLine($"  Item: {item}");

                // Break early if you've seen enough
                if (item > 100)
                    break;
            }
        }
        #endregion
    }

    public async Task ClientSendExample()
    {
        #region PartRStream_ClientSend
        // Create a stream from local data
        var numbers = new[] { 1, 2, 3, 4, 5 };
        var stream = RpcStream.New(numbers);

        // Send to server for processing
        var sum = await sumService.Sum(stream, cancellationToken);
        Console.WriteLine($"Sum: {sum}"); // Output: Sum: 15
        #endregion
    }
}

// The PartRStream_Serialization snippet shows pattern only - MessagePackObject
// attribute requires all nested types to also be attributed, which is complex
// for documentation. The pattern is shown in PartR-RpcStream.md inline.

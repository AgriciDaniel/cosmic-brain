---
description: >-
  Minimal example to enable MongoDB persistence for Elsa Workflows, including connection configuration and index creation guidance.
---

# MongoDB Setup Example

This document provides a minimal, copy-pasteable example for configuring Elsa Workflows with MongoDB persistence.

## Prerequisites

- .NET 8.0 or later
- MongoDB 4.4 or later
- Elsa v3.x packages

## NuGet Packages

```bash
dotnet add package Elsa
dotnet add package Elsa.MongoDb
dotnet add package MongoDB.Driver
```

## Minimal Configuration

### Program.cs

```csharp
using Elsa.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Get connection string from configuration
var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDb")
    ?? throw new InvalidOperationException("Connection string 'MongoDb' not found.");

builder.Services.AddElsa(elsa =>
{
    // Configure workflow management (definitions, instances)
    elsa.UseWorkflowManagement(management =>
    {
        management.UseMongoDb(mongo =>
        {
            mongo.ConnectionString = mongoConnectionString;
            // Optional: Specify database name (defaults to 'elsa')
            // mongo.DatabaseName = "elsa_workflows";
        });
    });
    
    // Configure workflow runtime (bookmarks, inbox, execution logs)
    elsa.UseWorkflowRuntime(runtime =>
    {
        runtime.UseMongoDb(mongo =>
        {
            mongo.ConnectionString = mongoConnectionString;
        });
    });
    
    // Enable HTTP activities (optional)
    elsa.UseHttp();
    
    // Enable scheduling activities (optional)
    elsa.UseScheduling();
    
    // Enable API endpoints
    elsa.UseWorkflowsApi();
});

var app = builder.Build();

// Map Elsa API endpoints
app.UseWorkflows();

app.Run();
```

### appsettings.json

```json
{
  "ConnectionStrings": {
    "MongoDb": "mongodb://localhost:27017/elsa"
  }
}
```

**With Authentication:**
```json
{
  "ConnectionStrings": {
    "MongoDb": "mongodb://username:password@localhost:27017/elsa?authSource=admin"
  }
}
```

**Replica Set:**
```json
{
  "ConnectionStrings": {
    "MongoDb": "mongodb://node1:27017,node2:27017,node3:27017/elsa?replicaSet=rs0"
  }
}
```

## Index Creation

MongoDB does not automatically create indexes. Create these indexes for production performance:

### Using MongoDB Shell

```javascript
// Connect to the elsa database
use elsa;

// Workflow Definitions
db.WorkflowDefinitions.createIndex({ "DefinitionId": 1 });
db.WorkflowDefinitions.createIndex({ "Name": 1 });
db.WorkflowDefinitions.createIndex({ "IsPublished": 1 });
db.WorkflowDefinitions.createIndex({ "IsLatest": 1 });
db.WorkflowDefinitions.createIndex({ "Version": 1 });

// Workflow Instances
db.WorkflowInstances.createIndex({ "CorrelationId": 1 });
db.WorkflowInstances.createIndex({ "Status": 1 });
db.WorkflowInstances.createIndex({ "SubStatus": 1 });
db.WorkflowInstances.createIndex({ "DefinitionId": 1 });
db.WorkflowInstances.createIndex({ "DefinitionVersionId": 1 });
db.WorkflowInstances.createIndex({ "UpdatedAt": -1 });
db.WorkflowInstances.createIndex({ "CreatedAt": -1 });
db.WorkflowInstances.createIndex({ "Status": 1, "DefinitionId": 1 });

// Bookmarks
db.Bookmarks.createIndex({ "Hash": 1 });
db.Bookmarks.createIndex({ "ActivityTypeName": 1, "Hash": 1 });
db.Bookmarks.createIndex({ "WorkflowInstanceId": 1 });
db.Bookmarks.createIndex({ "CorrelationId": 1 });
db.Bookmarks.createIndex({ "ActivityId": 1 });

// Activity Execution Records
db.ActivityExecutionRecords.createIndex({ "WorkflowInstanceId": 1 });
db.ActivityExecutionRecords.createIndex({ "ActivityId": 1 });
db.ActivityExecutionRecords.createIndex({ "StartedAt": -1 });

// Workflow Execution Log Records
db.WorkflowExecutionLogRecords.createIndex({ "WorkflowInstanceId": 1 });
db.WorkflowExecutionLogRecords.createIndex({ "Timestamp": -1 });

// Workflow Inbox Messages
db.WorkflowInboxMessages.createIndex({ "Hash": 1 });
db.WorkflowInboxMessages.createIndex({ "CorrelationId": 1 });
db.WorkflowInboxMessages.createIndex({ "CreatedAt": 1 }, { expireAfterSeconds: 604800 });  // TTL: 7 days (7 * 24 * 60 * 60 = 604800 seconds)

print("Indexes created successfully");
```

### Save as Script

Save the above as `create-indexes.js` and run:
```bash
mongosh "mongodb://localhost:27017/elsa" create-indexes.js
```

## Advanced Configuration

### Custom Database and Collection Names

```csharp
elsa.UseWorkflowManagement(management =>
{
    management.UseMongoDb(mongo =>
    {
        mongo.ConnectionString = mongoConnectionString;
        mongo.DatabaseName = "my_workflows";
        
        // Optional: Custom collection name prefix
        // mongo.CollectionNamingStrategy = name => $"elsa_{name}";
    });
});
```

### Connection Pool Settings

Configure MongoDB driver settings for high-concurrency scenarios:

```csharp
var mongoSettings = MongoClientSettings.FromConnectionString(mongoConnectionString);
mongoSettings.MaxConnectionPoolSize = 100;
mongoSettings.MinConnectionPoolSize = 10;
mongoSettings.WaitQueueTimeout = TimeSpan.FromSeconds(30);
mongoSettings.ConnectTimeout = TimeSpan.FromSeconds(10);

// Register the configured client
builder.Services.AddSingleton<IMongoClient>(new MongoClient(mongoSettings));

// Use the registered client
elsa.UseWorkflowManagement(management =>
{
    management.UseMongoDb(mongo =>
    {
        mongo.ConnectionString = mongoConnectionString;
    });
});
```

### Read Preference for Replicas

For read-heavy workloads with replica sets:

```csharp
var mongoSettings = MongoClientSettings.FromConnectionString(mongoConnectionString);
mongoSettings.ReadPreference = ReadPreference.SecondaryPreferred;

builder.Services.AddSingleton<IMongoClient>(new MongoClient(mongoSettings));
```

## Mapping Considerations

### Custom Activity Data

When storing custom data in activities, ensure it's BSON-serializable:

```csharp
// Good: Simple types serialize automatically
public class MyActivityData
{
    public string Name { get; set; }
    public int Count { get; set; }
    public DateTime Timestamp { get; set; }
}

// For complex types, ensure serialization works
public class ComplexData
{
    public Dictionary<string, object> Properties { get; set; }
    
    [BsonIgnore]  // Exclude from persistence
    public Func<Task> Callback { get; set; }
}
```

### BSON Serialization Settings

Elsa uses MongoDB driver conventions. For custom serialization needs:

```csharp
// Register custom serializers before AddElsa
BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));

// Or use convention packs
var pack = new ConventionPack
{
    new CamelCaseElementNameConvention(),
    new IgnoreExtraElementsConvention(true)
};
ConventionRegistry.Register("ElsaConventions", pack, t => true);
```

## TTL Collections

MongoDB supports TTL (Time-To-Live) indexes for automatic document expiration:

```javascript
// Auto-delete workflow execution logs after 30 days
db.WorkflowExecutionLogRecords.createIndex(
    { "Timestamp": 1 },
    { expireAfterSeconds: 2592000 }  // 30 days
);

// Auto-delete completed workflow instances after 60 days
// Note: Only works if you have a dedicated TTL field
db.WorkflowInstances.createIndex(
    { "ExpiresAt": 1 },
    { expireAfterSeconds: 0 }  // Expire at the ExpiresAt time
);
```

## Troubleshooting

### Connection Issues

**Error:** `Unable to connect to server`

**Solutions:**
- Verify MongoDB is running: `mongosh --eval "db.runCommand({ping: 1})"`
- Check connection string format
- Verify network connectivity and firewall rules
- For replica sets, ensure all nodes are accessible

**Error:** `Authentication failed`

**Solutions:**
- Verify username/password
- Check `authSource` parameter in connection string
- Ensure user has appropriate roles: `readWrite` on the elsa database

### Performance Issues

**Slow queries:**
1. Verify indexes are created: `db.collection.getIndexes()`
2. Use explain plans: `db.collection.find({...}).explain("executionStats")`
3. Check for collection scans in slow query logs

**High memory usage:**
- Review connection pool settings
- Consider adding a TTL index for log collections
- Implement retention policies for old workflow instances

### Logging

Enable MongoDB driver logging:

```json
{
  "Logging": {
    "LogLevel": {
      "MongoDB": "Debug"
    }
  }
}
```

## Related Documentation

- [Persistence Guide](../README.md) — Overview and provider comparison
- [Indexing Notes](indexing-notes.md) — Detailed indexing guidance
- [MongoDB Documentation](https://www.mongodb.com/docs/manual/) — Official MongoDB docs

---

**Last Updated:** 2025-11-28

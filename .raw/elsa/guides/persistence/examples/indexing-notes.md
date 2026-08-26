---
description: >-
  Recommended database indexes for Elsa Workflows persistence stores to optimize common query patterns.
---

# Indexing Notes

This document provides indexing recommendations for Elsa Workflows persistence stores. Proper indexing is essential for production performance.

## Overview

Elsa's persistence layer executes queries against several core tables/collections. Without proper indexes, these queries may result in full table scans, degrading performance under load.

### Key Query Patterns

| Query Pattern | Tables Involved | Index Recommendation |
|--------------|-----------------|----------------------|
| Resume by bookmark hash | Bookmarks | `(activity_type_name, hash)` |
| List instances by status | WorkflowInstances | `(status)`, `(status, definition_id)` |
| Correlate instances | WorkflowInstances | `(correlation_id)` |
| Cleanup old instances | WorkflowInstances | `(updated_at)`, `(finished_at)` |
| Find bookmarks for instance | Bookmarks | `(workflow_instance_id)` |
| List incidents | Incidents | `(workflow_instance_id)`, `(timestamp)` |

## PostgreSQL Indexes

### Workflow Instances

```sql
-- Primary lookup by ID (usually covered by PK)
-- CREATE INDEX idx_workflow_instances_id ON workflow_instances(id);

-- Query by correlation ID (very common for HTTP workflows)
CREATE INDEX idx_workflow_instances_correlation_id 
    ON workflow_instances(correlation_id)
    WHERE correlation_id IS NOT NULL;

-- Query by status (list pending, running, faulted, etc.)
CREATE INDEX idx_workflow_instances_status 
    ON workflow_instances(status);

-- Query by definition (list all instances of a workflow)
CREATE INDEX idx_workflow_instances_definition_id 
    ON workflow_instances(definition_id);

-- Composite for filtered status queries
CREATE INDEX idx_workflow_instances_status_definition 
    ON workflow_instances(status, definition_id);

-- Retention queries (cleanup by age)
CREATE INDEX idx_workflow_instances_updated_at 
    ON workflow_instances(updated_at DESC);

CREATE INDEX idx_workflow_instances_finished_at 
    ON workflow_instances(finished_at)
    WHERE finished_at IS NOT NULL;

-- List by sub-status (more granular than status)
CREATE INDEX idx_workflow_instances_sub_status 
    ON workflow_instances(sub_status);
```

### Bookmarks

```sql
-- Primary lookup for resume operations
-- Activity type + hash is the core lookup pattern
CREATE INDEX idx_bookmarks_activity_type_hash 
    ON bookmarks(activity_type_name, hash);

-- Cleanup: find bookmarks for a specific instance
CREATE INDEX idx_bookmarks_workflow_instance_id 
    ON bookmarks(workflow_instance_id);

-- Correlation-based lookups
CREATE INDEX idx_bookmarks_correlation_id 
    ON bookmarks(correlation_id)
    WHERE correlation_id IS NOT NULL;

-- Hash-only lookup (less selective but sometimes used)
CREATE INDEX idx_bookmarks_hash 
    ON bookmarks(hash);
```

### Activity Execution Records

```sql
-- Query by workflow instance (activity history)
CREATE INDEX idx_activity_records_workflow_instance 
    ON activity_execution_records(workflow_instance_id);

-- Query by activity (debugging specific activities)
CREATE INDEX idx_activity_records_activity_id 
    ON activity_execution_records(activity_id);

-- Query by time range (performance analysis)
CREATE INDEX idx_activity_records_started_at 
    ON activity_execution_records(started_at DESC);
```

### Workflow Execution Logs

```sql
-- Query logs for a workflow instance
CREATE INDEX idx_execution_logs_workflow_instance 
    ON workflow_execution_log_records(workflow_instance_id);

-- Query by timestamp (time-series queries)
CREATE INDEX idx_execution_logs_timestamp 
    ON workflow_execution_log_records(timestamp DESC);

-- Composite for instance + time queries
CREATE INDEX idx_execution_logs_instance_timestamp 
    ON workflow_execution_log_records(workflow_instance_id, timestamp DESC);
```

### Incidents

```sql
-- Query incidents for a workflow instance
CREATE INDEX idx_incidents_workflow_instance_id 
    ON incidents(workflow_instance_id);

-- Query by timestamp (monitoring dashboards)
CREATE INDEX idx_incidents_timestamp 
    ON incidents(timestamp DESC);

-- Query by activity (debugging)
CREATE INDEX idx_incidents_activity_id 
    ON incidents(activity_id);
```

### Workflow Inbox Messages

```sql
-- Primary lookup by hash
CREATE INDEX idx_inbox_hash 
    ON workflow_inbox_messages(hash);

-- Correlation lookups
CREATE INDEX idx_inbox_correlation_id 
    ON workflow_inbox_messages(correlation_id)
    WHERE correlation_id IS NOT NULL;

-- Cleanup by age
CREATE INDEX idx_inbox_created_at 
    ON workflow_inbox_messages(created_at);
```

## SQL Server Indexes

SQL Server uses similar index patterns with different syntax:

```sql
-- Workflow Instances
CREATE NONCLUSTERED INDEX idx_workflow_instances_correlation_id 
    ON workflow_instances(correlation_id)
    WHERE correlation_id IS NOT NULL;

CREATE NONCLUSTERED INDEX idx_workflow_instances_status 
    ON workflow_instances(status);

CREATE NONCLUSTERED INDEX idx_workflow_instances_definition_id 
    ON workflow_instances(definition_id);

CREATE NONCLUSTERED INDEX idx_workflow_instances_status_definition 
    ON workflow_instances(status, definition_id);

CREATE NONCLUSTERED INDEX idx_workflow_instances_updated_at 
    ON workflow_instances(updated_at DESC);

-- Bookmarks
CREATE NONCLUSTERED INDEX idx_bookmarks_activity_type_hash 
    ON bookmarks(activity_type_name, hash);

CREATE NONCLUSTERED INDEX idx_bookmarks_workflow_instance_id 
    ON bookmarks(workflow_instance_id);

-- Include columns for covering indexes (reduces key lookups)
CREATE NONCLUSTERED INDEX idx_workflow_instances_status_covering 
    ON workflow_instances(status)
    INCLUDE (id, definition_id, correlation_id, created_at);
```

## MongoDB Indexes

MongoDB requires explicit index creation. Use the MongoDB shell or driver:

```javascript
// Workflow Instances
db.WorkflowInstances.createIndex({ "CorrelationId": 1 });
db.WorkflowInstances.createIndex({ "Status": 1 });
db.WorkflowInstances.createIndex({ "SubStatus": 1 });
db.WorkflowInstances.createIndex({ "DefinitionId": 1 });
db.WorkflowInstances.createIndex({ "Status": 1, "DefinitionId": 1 });
db.WorkflowInstances.createIndex({ "UpdatedAt": -1 });
db.WorkflowInstances.createIndex({ "FinishedAt": 1 }, { 
    partialFilterExpression: { "FinishedAt": { $exists: true } }
});

// Bookmarks
db.Bookmarks.createIndex({ "ActivityTypeName": 1, "Hash": 1 });
db.Bookmarks.createIndex({ "Hash": 1 });
db.Bookmarks.createIndex({ "WorkflowInstanceId": 1 });
db.Bookmarks.createIndex({ "CorrelationId": 1 }, { 
    partialFilterExpression: { "CorrelationId": { $exists: true } }
});

// Activity Execution Records
db.ActivityExecutionRecords.createIndex({ "WorkflowInstanceId": 1 });
db.ActivityExecutionRecords.createIndex({ "ActivityId": 1 });
db.ActivityExecutionRecords.createIndex({ "StartedAt": -1 });

// Workflow Execution Logs
db.WorkflowExecutionLogRecords.createIndex({ "WorkflowInstanceId": 1 });
db.WorkflowExecutionLogRecords.createIndex({ "Timestamp": -1 });
db.WorkflowExecutionLogRecords.createIndex(
    { "WorkflowInstanceId": 1, "Timestamp": -1 }
);

// Incidents
db.Incidents.createIndex({ "WorkflowInstanceId": 1 });
db.Incidents.createIndex({ "Timestamp": -1 });

// Inbox Messages (with TTL)
db.WorkflowInboxMessages.createIndex({ "Hash": 1 });
db.WorkflowInboxMessages.createIndex(
    { "CreatedAt": 1 }, 
    { expireAfterSeconds: 604800 }  // 7 days TTL
);
```

## Index Maintenance

### PostgreSQL

```sql
-- Analyze table statistics (run after bulk operations)
ANALYZE workflow_instances;
ANALYZE bookmarks;

-- Reindex if index bloat is suspected
REINDEX INDEX idx_workflow_instances_status;

-- Check index usage
SELECT schemaname, relname, indexrelname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes
WHERE schemaname = 'elsa'
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT indexrelname
FROM pg_stat_user_indexes
WHERE idx_scan = 0 AND schemaname = 'elsa';
```

### SQL Server

```sql
-- Update statistics
UPDATE STATISTICS workflow_instances;
UPDATE STATISTICS bookmarks;

-- Rebuild indexes (reduces fragmentation)
ALTER INDEX idx_workflow_instances_status ON workflow_instances REBUILD;

-- Check index fragmentation
SELECT 
    i.name AS IndexName,
    ips.avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.avg_fragmentation_in_percent > 10;
```

### MongoDB

```javascript
// Check index usage
db.WorkflowInstances.aggregate([{ $indexStats: {} }]);

// Compact collection (reclaims space)
db.runCommand({ compact: "WorkflowInstances" });

// Rebuild indexes
db.WorkflowInstances.reIndex();
```

## Performance Monitoring

### Identifying Missing Indexes

**PostgreSQL:**
```sql
-- Find slow queries that might benefit from indexes
SELECT query, calls, mean_exec_time, rows
FROM pg_stat_statements
WHERE query LIKE '%workflow_instances%'
ORDER BY mean_exec_time DESC
LIMIT 10;
```

**SQL Server:**
```sql
-- Missing index recommendations
SELECT 
    d.statement,
    d.equality_columns,
    d.inequality_columns,
    d.included_columns,
    s.avg_user_impact
FROM sys.dm_db_missing_index_details d
JOIN sys.dm_db_missing_index_groups g ON d.index_handle = g.index_handle
JOIN sys.dm_db_missing_index_group_stats s ON g.index_group_handle = s.group_handle
WHERE d.database_id = DB_ID()
ORDER BY s.avg_user_impact DESC;
```

**MongoDB:**
```javascript
// Enable profiler for slow queries
db.setProfilingLevel(1, { slowms: 100 });

// Query profile data
db.system.profile.find({ millis: { $gt: 100 } }).sort({ ts: -1 }).limit(10);
```

## Best Practices

1. **Start with recommended indexes** — Apply the indexes above before production deployment.

2. **Monitor query performance** — Use database-native tools to identify slow queries.

3. **Don't over-index** — Each index adds write overhead and storage. Only add indexes for actual query patterns.

4. **Partial indexes save space** — Use `WHERE` clauses (PostgreSQL) or `partialFilterExpression` (MongoDB) to index only relevant rows.

5. **Covering indexes reduce I/O** — Include frequently accessed columns in the index to avoid table lookups.

6. **Regular maintenance** — Schedule index maintenance during low-traffic periods.

7. **Test with production-like data** — Index performance varies with data distribution. Test with realistic data volumes.

## Vendor Documentation

For detailed index tuning beyond these recommendations:

- [PostgreSQL Indexes](https://www.postgresql.org/docs/current/indexes.html)
- [SQL Server Index Design Guide](https://docs.microsoft.com/en-us/sql/relational-databases/sql-server-index-design-guide)
- [MongoDB Indexes](https://www.mongodb.com/docs/manual/indexes/)

## Related Documentation

- [Persistence Guide](../README.md) — Overview and configuration
- [EF Core Setup](efcore-setup.md) — EF Core configuration
- [MongoDB Setup](mongodb-setup.md) — MongoDB configuration
- [Dapper Setup](dapper-setup.md) — Dapper configuration

---

**Last Updated:** 2025-11-28

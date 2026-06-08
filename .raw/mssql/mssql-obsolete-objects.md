# MSSQL Obsolete Object Finder

## Problem
Hard to know which stored procedures, views, and tables are still in use vs. obsolete in a large MSSQL database.

---

## 5 Detection Methods

### 1. Execution Stats (DMVs)
Query `sys.dm_exec_procedure_stats` — objects absent from cache have never run since last restart.

> ⚠️ Stats reset on every SQL Server restart.

```sql
-- Never executed since restart
SELECT name, type_desc, create_date, modify_date
FROM sys.objects
WHERE type IN ('P', 'V', 'U') AND is_ms_shipped = 0
AND object_id NOT IN (SELECT object_id FROM sys.dm_exec_procedure_stats)
ORDER BY modify_date ASC;
```

---

### 2. Modify Dates
Objects untouched for 1+ years are strong candidates.

```sql
SELECT name, type_desc, create_date, modify_date,
       DATEDIFF(DAY, modify_date, GETDATE()) AS DaysUnmodified
FROM sys.objects
WHERE type IN ('P', 'V', 'U') AND is_ms_shipped = 0
  AND DATEDIFF(DAY, modify_date, GETDATE()) > 365
ORDER BY modify_date ASC;
```

---

### 3. Table Usage
Find tables with zero reads/writes or zero rows.

```sql
-- Tables with no activity since restart
SELECT t.name AS TableName
FROM sys.tables t
LEFT JOIN sys.dm_db_index_usage_stats s
       ON t.object_id = s.object_id AND s.database_id = DB_ID()
WHERE s.object_id IS NULL;
```

---

### 4. Dependency Check
Objects not referenced by anything else in the database.

```sql
SELECT o.name, o.type_desc, o.create_date, o.modify_date
FROM sys.objects o
WHERE o.type IN ('P', 'V', 'U') AND o.is_ms_shipped = 0
  AND o.object_id NOT IN (
      SELECT DISTINCT referenced_id
      FROM sys.sql_expression_dependencies
      WHERE referenced_id IS NOT NULL
  );
```

---

### 5. SQL Agent Jobs
Check if any scheduled job references the object.

```sql
SELECT j.name AS JobName, js.step_name, js.command
FROM msdb.dbo.sysjobs j
JOIN msdb.dbo.sysjobsteps js ON j.job_id = js.job_id
WHERE js.command LIKE '%YourObjectName%';
```

---

## All-in-One Scoring Query
Combines all signals into a single ranked list. Two extra columns explain the result in plain language:

- `ObsoleteVerdict` — colour-coded label (🔴 🟠 🟡 🟢) summarising the risk level
- `ScoreReason` — lists every signal that contributed points, **plus active signals that protect the object from a higher score**

### Scoring rules

| Condition | Points | Notes |
|---|---|---|
| Not in execution cache | +3 | Resets on server restart |
| No inbound SQL dependencies | +2 | Only covers objects inside the DB — see blind spots |
| Not modified in 1+ year | +2 | |
| Not modified in 2+ years | +1 (stacked) | Added on top of the 1-year point |
| Zero rows (tables only) | +2 | Suppressed if table has active DMV reads — see caveat below |
| **Max total** | **10** | |

> **If any referencing object has confirmed execution history, the entire score is forced to 0 and the object is marked active.** An object that is called by something currently running is not obsolete, regardless of its own stats.

### Score verdict

| Score range | Verdict |
|---|---|
| 0 (via active caller) | 🟢 Active — referenced by a currently running object |
| ≥ 7 | 🔴 Very likely obsolete |
| 5 – 6 | 🟠 Probably obsolete |
| 3 – 4 | 🟡 Possibly obsolete — **manual check required** |
| 0 – 2 | 🟢 Likely still in use |

### ⚠️ Known blind spots — SQL alone cannot detect these

Even a high score does **not** mean safe to drop if any of the following apply:

| Blind spot | Why SQL misses it | How to verify |
|---|---|---|
| External app reads the table directly | App connections don't appear in `sys.sql_expression_dependencies` | Check app source code, ORM queries, connection logs |
| SSIS / SSRS / Power BI queries the table | ETL and reporting tools connect externally | Search SSIS packages, report data sources |
| Table is a staging / truncate-and-load target | Rows are deleted after each load — zero rows is normal | Check ETL pipelines and SQL Agent job steps |
| Linked server or cross-DB query | Cross-database dependencies are not tracked by `sys.sql_expression_dependencies` | Search for object name in all databases |
| Object referenced only inside dynamic SQL | `EXEC('SELECT * FROM ' + @tbl)` is invisible to the dependency view | Search `syscomments` / `sys.sql_modules` for the name as a string |

```sql
WITH ObjectList AS (
    SELECT o.object_id, o.name, o.type_desc, o.create_date, o.modify_date,
           DATEDIFF(DAY, o.modify_date, GETDATE()) AS DaysSinceModified
    FROM sys.objects o
    WHERE o.type IN ('P', 'V', 'U') AND o.is_ms_shipped = 0
),
ExecStats AS (
    -- Objects with confirmed execution history since last restart
    SELECT object_id, last_execution_time, execution_count
    FROM sys.dm_exec_procedure_stats
),
ActiveCallers AS (
    -- Objects that are referenced BY something with confirmed execution history.
    -- If proc/view B calls table/proc A, and B is active, then A is treated as active.
    SELECT DISTINCT d.referenced_id AS object_id,
                    OBJECT_NAME(d.referencing_id) AS CalledByObject
    FROM      sys.sql_expression_dependencies d
    JOIN      ExecStats es ON d.referencing_id = es.object_id
    WHERE     d.referenced_id IS NOT NULL
),
DepCheck AS (
    -- Any inbound SQL reference (regardless of whether the caller is active)
    SELECT DISTINCT referenced_id AS object_id
    FROM sys.sql_expression_dependencies
    WHERE referenced_id IS NOT NULL
),
RowCounts AS (
    SELECT t.object_id, SUM(p.rows) AS TotalRows
    FROM sys.tables t
    JOIN sys.indexes    i ON t.object_id = i.object_id AND i.index_id IN (0,1)
    JOIN sys.partitions p ON i.object_id = p.object_id AND i.index_id = p.index_id
    GROUP BY t.object_id
),
TableReads AS (
    -- Tables being read via DMV even if they currently have zero rows
    SELECT object_id
    FROM sys.dm_db_index_usage_stats
    WHERE database_id = DB_ID()
      AND (user_seeks > 0 OR user_scans > 0 OR user_lookups > 0)
),
Scored AS (
    SELECT
        ol.name                AS ObjectName,
        ol.type_desc,
        ol.create_date,
        ol.modify_date,
        ol.DaysSinceModified,
        es.last_execution_time,
        es.execution_count,
        rc.TotalRows,
        es.object_id           AS ExecObjId,
        dc.object_id           AS DepObjId,
        ac.object_id           AS ActiveCallerObjId,  -- non-NULL = called by an active object
        ac.CalledByObject,
        tr.object_id           AS ReadObjId,
        rc.TotalRows           AS RowCount,
        -- If any caller is confirmed active, force score to 0 immediately
        CASE WHEN ac.object_id IS NOT NULL THEN 0
        ELSE (
            CASE WHEN es.object_id IS NULL                 THEN 3 ELSE 0 END
          + CASE WHEN dc.object_id IS NULL                 THEN 2 ELSE 0 END
          + CASE WHEN ol.DaysSinceModified > 365           THEN 2 ELSE 0 END
          + CASE WHEN ol.DaysSinceModified > 730           THEN 1 ELSE 0 END
          + CASE WHEN ISNULL(rc.TotalRows, -1) = 0
                  AND tr.object_id IS NULL                 THEN 2 ELSE 0 END
        )
        END AS ObsoleteScore
    FROM       ObjectList ol
    LEFT JOIN  ExecStats      es ON ol.object_id = es.object_id
    LEFT JOIN  ActiveCallers  ac ON ol.object_id = ac.object_id
    LEFT JOIN  DepCheck       dc ON ol.object_id = dc.object_id
    LEFT JOIN  RowCounts      rc ON ol.object_id = rc.object_id
    LEFT JOIN  TableReads     tr ON ol.object_id = tr.object_id
)
SELECT
    ObjectName,
    type_desc              AS ObjectType,
    create_date,
    modify_date,
    DaysSinceModified,
    last_execution_time,
    execution_count,
    TotalRows,
    ObsoleteScore,
    CASE
        WHEN ActiveCallerObjId IS NOT NULL THEN '🟢 Active — referenced by a currently running object'
        WHEN ObsoleteScore >= 7            THEN '🔴 Very likely obsolete — review for removal'
        WHEN ObsoleteScore >= 5            THEN '🟠 Probably obsolete — investigate before dropping'
        WHEN ObsoleteScore >= 3            THEN '🟡 Possibly obsolete — manual check required'
        ELSE                                    '🟢 Likely still in use — keep unless proven otherwise'
    END AS ObsoleteVerdict,
    CONCAT(
        -- Active caller overrides everything
        CASE WHEN ActiveCallerObjId IS NOT NULL
             THEN CONCAT('[Called by active object: ', CalledByObject, '] ')    ELSE '' END,
        -- Score contributors (only shown when no active caller)
        CASE WHEN ActiveCallerObjId IS NULL AND ExecObjId IS NULL
             THEN '[No execution history] '                                     ELSE '' END,
        CASE WHEN ActiveCallerObjId IS NULL AND DepObjId IS NULL
             THEN '[No inbound SQL references] '                                ELSE '' END,
        CASE WHEN ActiveCallerObjId IS NULL AND DaysSinceModified > 730
             THEN '[Not modified in 2+ years] '
             ELSE CASE WHEN ActiveCallerObjId IS NULL AND DaysSinceModified > 365
             THEN '[Not modified in 1+ year] '                                  ELSE '' END
        END,
        CASE WHEN ActiveCallerObjId IS NULL
              AND ISNULL(RowCount, -1) = 0
              AND ReadObjId IS NULL
             THEN '[Zero rows — no active reads] '                              ELSE '' END,
        -- Warnings
        CASE WHEN ActiveCallerObjId IS NULL
              AND ISNULL(RowCount, -1) = 0
              AND ReadObjId IS NOT NULL
             THEN '[⚠️ Zero rows but DMV shows active reads — may be staging/truncate target, verify] ' ELSE '' END,
        -- All-clear
        CASE WHEN ActiveCallerObjId IS NULL
              AND ExecObjId IS NOT NULL
              AND DaysSinceModified <= 365
             THEN '[Active — no issues found] '                                 ELSE '' END
    ) AS ScoreReason
FROM Scored
ORDER BY ObsoleteScore DESC, DaysSinceModified DESC;
```

---

## Safe Removal Workflow

1. **Run** the all-in-one scoring query — focus on score ≥ 5
2. **Cross-check** with app source code, SSIS packages, and linked servers
3. **Rename** suspect objects with prefix `_DEPRECATED_` — do not drop yet
4. **Wait** 2–4 weeks and monitor for errors
5. **Drop** if nothing breaks; script objects first as a backup

> Never drop immediately. Rename → wait → verify → drop.

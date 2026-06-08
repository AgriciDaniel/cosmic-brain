# DOGE_WH Database

**Purpose**: Main database for OMS (Order Management System) application  
**Location**: Same server as Winline database (tenant-specific)  
**Connectivity**: OMS uses single connection to DOGE_WH  

## Cross-Database Linking

OMS connects to external systems via **SYNONYMS** with schema namespacing:

| Schema | Linked DB | Purpose |
|--------|-----------|---------|
| `wl` | Winline (CWL) | Order, inventory, transaction data |
| `hy` | Hydra | Hydra system integration |
| `re` | RecycledApp | Recycled/returned items management |

**Important**: Database names vary by tenant. Substitute actual database names before running scripts.

## Setup Instructions

### 1. Create Schemas (One-Time)
```sql
USE DOGE_WH
GO

CREATE SCHEMA wl
GO

CREATE SCHEMA re
GO
```

### 2. Create SYNONYM Links

#### 2a. Link Winline Functions & Stored Procedures
Replace `'CWL'` with actual Winline database name:

```sql
USE DOGE_WH
GO

DECLARE @tableName NVARCHAR(500)
DECLARE @sql NVARCHAR(MAX)

DECLARE table_cursor CURSOR FOR
SELECT ROUTINE_NAME
FROM [CWL].INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_TYPE IN ('FUNCTION', 'PROCEDURE')
  AND ROUTINE_NAME NOT LIKE 'SqlQueryNotificationStoredProcedure%'

OPEN table_cursor
FETCH NEXT FROM table_cursor INTO @tableName

WHILE @@FETCH_STATUS = 0
BEGIN
    IF NOT EXISTS (
        SELECT * FROM sys.synonyms 
        WHERE name = @tableName AND schema_id = SCHEMA_ID('wl')
    )
    BEGIN
        SET @sql = 'CREATE SYNONYM wl.' + @tableName + 
                   ' FOR [CWL].dbo.' + @tableName + ';'
        EXEC sp_executesql @sql
    END
    
    FETCH NEXT FROM table_cursor INTO @tableName
END

CLOSE table_cursor
DEALLOCATE table_cursor
GO
```

#### 2b. Link Winline Tables & Views
Replace `'CWL'` with actual Winline database name:

```sql
USE DOGE_WH
GO

DECLARE @tableName NVARCHAR(500)
DECLARE @sql NVARCHAR(MAX)

DECLARE table_cursor CURSOR FOR
SELECT TABLE_NAME
FROM [CWL].INFORMATION_SCHEMA.TABLES
WHERE (TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME LIKE 'T___')
   OR (TABLE_TYPE = 'VIEW' AND TABLE_NAME LIKE 'T___')

OPEN table_cursor
FETCH NEXT FROM table_cursor INTO @tableName

WHILE @@FETCH_STATUS = 0
BEGIN
    IF NOT EXISTS (
        SELECT * FROM sys.synonyms 
        WHERE name = @tableName AND schema_id = SCHEMA_ID('wl')
    )
    BEGIN
        SET @sql = 'CREATE SYNONYM wl.' + @tableName + 
                   ' FOR [CWL].dbo.' + @tableName + ';'
        EXEC sp_executesql @sql
    END
    
    FETCH NEXT FROM table_cursor INTO @tableName
END

CLOSE table_cursor
DEALLOCATE table_cursor
GO
```

## Tenant-Specific Configurations

Each tenant has different Winline database names:

- [[framas/tenants/fGE|fGE (Germany)]]: CWL
- [[framas/tenants/fVN|fVN (Vietnam)]]: VNT86
- [[framas/tenants/fFT|fFT (Vietnam FT)]]: FTT2021, FTL2021
- [[framas/tenants/fIN|fIN (Indonesia)]]: CWLDATA

## Related Databases

### Winline System Database
All tenants share:
- **CWLSYSTEM**: System-wide Winline configuration

### Application-Specific Databases
Varies by tenant; see specific tenant pages.

## Views

| View | Purpose |
|------|---------|
| `dbo.v_OMS_WHInfo` | Warehouse master list for current company year; joins `wl.T335` (WinLine warehouses) + `wl.T311` (structures) + `lmpScannerClient_Warehouse` (scanner flags) + `ST049_FactoryCode` (location names). See [[sources/framas-v-oms-whinfo\|v_OMS_WHInfo source]]. |

## Best Practices

1. **Verify Database Names**: Always substitute actual database names in scripts
2. **Test Synonym Creation**: Run on dev environment first
3. **Check Synonym Status**: Query `sys.synonyms` to verify
4. **Plan for New Objects**: When Winline schema changes, re-run synonym scripts
5. **Backup Before Changes**: Always backup before running DDL scripts

---

**Source**: .raw/framas/tenants/DOGE_WH.md  
**Related**: [[framas/databases|Database Architecture Overview]]

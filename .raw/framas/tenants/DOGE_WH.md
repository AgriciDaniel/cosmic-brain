# DOGE_WH database

DOGE_WH is a main database for OMS application. Normally it will put same place with winline database
OMS app only using one connection that connect to DOGE_WH. And to connect with Winline, Hydra, RecycledApp database we using SYNONYM with specified schema for each database like following:

- wl => Winline db 
- hy => Hydra db
- re => RecycledApp db

`Actual db name will depend for each tenants`

Script to create SYNONYM link

```
USE DOGE_WH
GO

-- Create schema before run
--CREATE SCHEMA wl
--GO

--CREATE SCHEMA re 
--GO

-- Ctr+H  Replace this 'RecycledApp' to correct db
-- Replace this 'CWL' to correct db

-- Create link to wl functions and stores 
-- =====================================================================================================================================================================
declare @tableName NVARCHAR(500);
DECLARE @sql NVARCHAR(MAX);

-- Cursor to loop through all table names
DECLARE table_cursor CURSOR FOR
SELECT 
    ROUTINE_NAME AS FunctionName
FROM 
    [CWL].INFORMATION_SCHEMA.ROUTINES
WHERE 
    ROUTINE_TYPE in ('FUNCTION', 'PROCEDURE')
	and ROUTINE_NAME not like 'SqlQueryNotificationStoredProcedure%'

-- Open the cursor
OPEN table_cursor;

-- Fetch the first row
FETCH NEXT FROM table_cursor INTO @tableName;

-- Loop through all rows
WHILE @@FETCH_STATUS = 0
BEGIN
    -- Check if the synonym already exists
    IF NOT EXISTS (SELECT * FROM sys.synonyms WHERE name = @tableName AND schema_id = SCHEMA_ID('wl'))
    BEGIN
        -- Construct the SQL statement to create the synonym
        SET @sql = 'CREATE SYNONYM wl.' + @tableName + ' FOR [CWL].dbo.' + @tableName + ';';
        
        -- Execute the SQL statement
        EXEC sp_executesql @sql;
    END

    -- Fetch the next row
    FETCH NEXT FROM table_cursor INTO @tableName;
END

-- Close and deallocate the cursor
CLOSE table_cursor;
DEALLOCATE table_cursor;
GO
-- =====================================================================================================================================================================


-- Create link to WL tables and views
-- =====================================================================================================================================================================
declare @tableName NVARCHAR(500);
DECLARE @sql NVARCHAR(MAX);

-- Cursor to loop through all table names
DECLARE table_cursor CURSOR FOR
SELECT TABLE_NAME
FROM [CWL].INFORMATION_SCHEMA.TABLES 
WHERE 
(TABLE_TYPE = 'BASE TABLE' and  TABLE_NAME LIKE 'T___')
or (TABLE_TYPE = 'VIEW' and  TABLE_NAME LIKE 'T___');

-- Open the cursor
OPEN table_cursor;

-- Fetch the first row
FETCH NEXT FROM table_cursor INTO @tableName;

-- Loop through all rows
WHILE @@FETCH_STATUS = 0
BEGIN
    -- Check if the synonym already exists
    IF NOT EXISTS (SELECT * FROM sys.synonyms WHERE name = @tableName AND schema_id = SCHEMA_ID('wl'))
    BEGIN
        -- Construct the SQL statement to create the synonym
        SET @sql = 'CREATE SYNONYM wl.' + @tableName + ' FOR [CWL].dbo.' + @tableName + ';';
        
        -- Execute the SQL statement
        EXEC sp_executesql @sql;
    END

    -- Fetch the next row
    FETCH NEXT FROM table_cursor INTO @tableName;
END

-- Close and deallocate the cursor
CLOSE table_cursor;
DEALLOCATE table_cursor;
GO
```






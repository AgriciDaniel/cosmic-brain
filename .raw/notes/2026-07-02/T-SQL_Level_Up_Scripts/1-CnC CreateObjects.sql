/******************************************

T-SQL LEVEL-UP:
CROSSBOWS AND CURSORS CREATE OBJECTS SCRIPT

(C) 2015, Brent Ozar Unlimited.
See http://BrentOzar.com/go/eula for the End User Licensing Agreement.

Description: Generates CrossbowsAndCursors database with test data.

To report bugs in this script, please visit https://support.brentozar.com


KNOWN ISSUES:
- This query will not run on SQL Server 2005.


v1.0.0 - 2015-06-30

*******************************************/


USE master;
GO

IF DB_ID('CrossbowsAndCursors') IS NOT NULL
  DROP DATABASE CrossbowsAndCursors
GO

CREATE DATABASE CrossbowsAndCursors
GO

USE CrossbowsAndCursors
GO

SET NOCOUNT ON;

CREATE TABLE dbo.Dice
(
	DieSides TINYINT
)

CREATE TABLE dbo.Number
(
	n INT
)

CREATE TABLE dbo.DimDate
	(
	  ShortDate DATE,
	  FullDate VARCHAR(20),
	  MonthShortName VARCHAR(10),
	  MonthLongName VARCHAR(15),
	  DateAge VARCHAR(20)
	)

CREATE TABLE dbo.Player
    (
      PlayerID INT ,
      PlayerName NVARCHAR(30) ,
      PlayerClassID INT,
	  PlayerClassLevel INT,
	  PlayerDamageHP INT,
	  PlayerXP INT,
	  PlayerHP AS PlayerClassLevel * 10 PERSISTED
    )

CREATE TABLE dbo.PlayerClass
    (
      PlayerClassID INT ,
      PlayerClassName NVARCHAR(30)
    )

CREATE TABLE dbo.Quest
    (
      QuestID INT ,
      QuestName NVARCHAR(200)
    )

CREATE TABLE dbo.PlayerClassLevel
    (
      PlayerClassID INT ,
      PlayerClassLevel INT ,
      PlayerClassMinXP INT
    )

CREATE TABLE dbo.PlayerQuest
    (
      PlayerID INT ,
	  QuestID INT,
      QuestStatus NVARCHAR(30)
    )

CREATE TABLE dbo.PlayerXPLog
    (
      QuestID INT ,
      PlayerID INT ,
      MonsterID INT ,
      XPAwarded INT
    )

CREATE TABLE dbo.Monster
    (
      MonsterID INT ,
      MonsterName VARCHAR(50) ,
      MonsterHP INT ,
      DamageHP INT ,
      XPValue INT
    )

CREATE TABLE dbo.PlayerRolls
    (
      RollID INT IDENTITY(1, 1) ,
      RollDate DATE ,
      PlayerID INT ,
      DieSides TINYINT ,
      DieRoll TINYINT
    )

INSERT dbo.Dice (DieSides)
VALUES (4), (6), (8), (10), (12), (20)

INSERT dbo.Number (n)
SELECT TOP 10000 CAST(ROW_NUMBER() OVER (ORDER BY t1.object_id) AS INT) AS n
		FROM sys.objects AS t1,
		sys.objects AS t2,
		sys.objects AS t3

INSERT dbo.DimDate
	( ShortDate,
	  FullDate,
	  MonthShortName,
	  MonthLongName,
	  DateAge
	)
SELECT CAST(DATEADD(dd, Number.n-1, '1/1/2015') AS DATE),
	CAST(DATENAME(mm, DATEADD(dd, Number.n-1, '1/1/2015')) AS VARCHAR(10)) 
	+ ' ' 
	+ CAST(DATEPART(dd, DATEADD(dd, Number.n-1, '1/1/2015')) AS VARCHAR(2))
	+ ', ' 
	+ CAST(YEAR(DATEADD(dd, Number.n-1, '1/1/2015')) AS VARCHAR(4)),
	CAST(DATENAME(mm, DATEADD(dd, Number.n-1, '1/1/2015')) AS VARCHAR(10))
,
	CAST(DATENAME(mm, DATEADD(dd, Number.n-1, '1/1/2015')) AS VARCHAR(10))
	+ ' ' 
	+ CAST(YEAR(DATEADD(dd, Number.n-1, '1/1/2015')) AS VARCHAR(4))
,
	CASE WHEN DATEADD(dd, Number.n-1, '1/1/2015') BETWEEN '1/1/2015' AND '3/31/2015' THEN 'Age of Goats'
			WHEN DATEADD(dd, Number.n-1, '1/1/2015') BETWEEN '4/1/2015' AND '4/30/2015' THEN 'Age of Copper'
			ELSE 'Age of the Unknown' 
			END
FROM dbo.Number
WHERE DATEADD(dd, Number.n-1, '1/1/2015') <= '4/30/2015'
ORDER BY Number.n


INSERT dbo.Monster
        ( MonsterID ,
          MonsterName ,
          MonsterHP ,
          DamageHP ,
          XPValue
        )
VALUES  ( 1, 'Troll, Blog Comment', 10, 4, 10)
		,(2, 'Troll, Forum', 10, 4, 10)
		,(3, 'Cursor', 6, 4, 5)
		,(4, 'Scalar Function', 8, 6, 10)
		,(5, 'Table Variable', 4, 4, 5)
		,(6, 'Heap', 4, 4, 5)
		,(7, 'Script Hydra', 5, 8, 10)
		,(8, 'NOLOCK', 8, 8, 15)
		,(9, 'Ghost Index', 8, 8, 15)
		,(10, 'Log Monster', 6, 6, 10)
		,(11, 'CONVERT_IMPLICIT', 8, 6, 12)

INSERT  dbo.Quest
        ( QuestID, QuestName )
VALUES  (1, 'Recover the lost Sceptre of Logitech.' )
		,(2, 'Break the spell of MongoDB over the town of Boulder.' )
		,(3, 'Smite the comment trolls on thy blog.' )
		,(4, 'Compress thy backups before thy server is overcome by bits.' )
		,(5, 'Speak to thy apprentices of index wizardry.' )
		,(6, 'Travel the realm and tell tales of thy adventures with large words cast behind thee.' );

INSERT  dbo.PlayerClass
        ( PlayerClassID, PlayerClassName )
VALUES  ( 1, N'Coder' )
		,( 2, N'Tuner' )
		,( 3, N'Quartermaster' )
		,( 4, N'Architect' );

INSERT  dbo.PlayerClassLevel
        ( PlayerClassID, PlayerClassLevel, PlayerClassMinXP )
VALUES  ( 1, 1, 0 )
		,( 1, 2, 1000 )
		,( 1, 3, 2000 )
		,( 1, 4, 4000 )
		,( 1, 5, 6000 )
		,( 2, 1, 0 )
		,( 2, 2, 1000 )
		,( 2, 3, 2000 )
		,( 2, 4, 4000 )
		,( 2, 5, 6000 )
		,( 3, 1, 0 )
		,( 3, 2, 1000 )
		,( 3, 3, 2000 )
		,( 3, 4, 4000 )
		,( 3, 5, 6000 )
		,( 4, 1, 0 )
		,( 4, 2, 1000 )
		,( 4, 3, 2000 )
		,( 4, 4, 4000 )
		,( 4, 5, 6000 );

INSERT dbo.Player
        ( PlayerID ,
          PlayerName ,
          PlayerClassID,
		  PlayerClassLevel,
		  PlayerDamageHP,
		  PlayerXP
        )
VALUES  ( 1, 'Countess Distincto', 1, 3, 10, 3000)
		,(2, 'The Hashmatcher', 2, 2, 12, 1500)
		,(3, 'Voltair Perfmon', 3, 1, 8, 0)
		,(4, 'Queen Agee', 4, 1, 8, 0)


INSERT dbo.PlayerQuest
        ( PlayerID, QuestID, QuestStatus )
VALUES  ( 1, 1, 'Complete')
		,( 1, 2, 'In Progress')
		,( 2, 1, 'Complete')

INSERT dbo.PlayerXPLog (PlayerID, QuestID, MonsterID, XPAwarded)
VALUES (1, 1, 1, 10)
      ,(1, 1, 1, 10)
	  ,(1, 1, 2, 10)
	  ,(1, 1, 2, 10)
	  ,(1, 1, 2, 10)
	  ,(1, 1, 8, 15)
	  ,(2, 1, 1, 10)
	  ,(2, 1, 2, 10)
	  ,(2, 1, 2, 10)
	  ,(2, 1, 5, 10)
      ,(2, 1, 7, 10)
      ,(3, 1, 6, 5)
	  ,(4, 1, 12, 12)


/* --------------------------------------------
 Let's generate our PlayerRolls data!	
 
 First thing we need is a randomizer.
 
*/

/* In order to generate random data, we need a randomizer of some kind. RAND() is nice but limited. */
/*
SELECT RAND()   /* some number between 0 and 1. */

SELECT CAST(RAND() * 10 AS INT) + 1 /* some number between 0 and 10. Still goofy because 11 is theoretically possible. */

/* Plus... */

SELECT CAST(RAND() * 10 AS INT) + 1 AS RandomNumber, Player.PlayerID 
FROM dbo.Player  

/* IT'S THE SAME ANSWER FOR EVERY ROW! */

/* How about this method? Popularized by former SQL Server MVP Steve Hess. 
   Unless your job is picking the winning numbers for the state lottery,
   this method is random enough. 
*/
SELECT (1 + ABS(CHECKSUM(NEWID())) % 10)

SELECT (1 + ABS(CHECKSUM(NEWID())) % 10) AS RandomNumber, Player.PlayerID 
FROM dbo.Player  
*/
/*		
												
 Now we need to take the following steps:
 
 Determine the max row number for each of the
 other tables involved: Player, DimDate, DieSides.

 We can then select random numbers between 1
 (the first row) and the max row number. These
 values aren't the values we need to insert;
 they simply help us grab a valid value from
 the tables and avoid any problems with 
 non-sequential values (like if Player had 
 PlayerID 1 and 2 but no record of a 
 PlayerID = 3 -- row number 3 would be 
 PlayerID = 4.

 We join back to the related tables using
 ROW_NUMBER from each side. This gets us the 
 PlayerID, RollDate, and DieSides values we
 want to insert.

-------------------------------------------- */		

DECLARE @maxPlayer INT, @maxDate INT, @maxDieSides TINYINT

SET @maxPlayer = (SELECT MAX(p.rn) FROM 
					(SELECT ROW_NUMBER() OVER (ORDER BY Player.PlayerID) AS rn FROM dbo.Player) AS p)

SET @maxDate = (SELECT MAX(dd.rn) FROM 
					(SELECT ROW_NUMBER() OVER (ORDER BY DimDate.ShortDate) AS rn FROM dbo.DimDate) AS dd)

SET @maxDieSides = (SELECT MAX(dc.rn) FROM 
						(SELECT ROW_NUMBER() OVER (ORDER BY Dice.DieSides) AS rn FROM dbo.Dice) AS dc)

INSERT dbo.PlayerRolls
        ( RollDate ,
          PlayerID ,
          DieSides ,
          DieRoll
        )
SELECT TOP 10000 dd.ShortDate, p.PlayerID, dc.DieSides, (1 + ABS(CHECKSUM(NEWID())) % (dc.DieSides)) AS DieRoll
FROM (
	  SELECT (1 + ABS(CHECKSUM(NEWID())) % (@maxDate)) AS RollDateRN,
	  (1 + ABS(CHECKSUM(NEWID())) % (@maxPlayer)) AS PlayerRN,
	  (1 + ABS(CHECKSUM(NEWID())) % (@maxDieSides)) AS DieSidesRN
	  FROM dbo.Number
	  WHERE Number.n <= 10000
	  ) AS dr
INNER JOIN (
			SELECT ROW_NUMBER() OVER (ORDER BY Player.PlayerID) AS PlayerRN, Player.PlayerID FROM dbo.Player
			) AS p ON p.PlayerRN = dr.PlayerRN
INNER JOIN (
			SELECT ROW_NUMBER() OVER (ORDER BY DimDate.ShortDate) AS RollDateRN, DimDate.ShortDate FROM dbo.DimDate
			) AS dd ON dd.RollDateRN = dr.RollDateRN
INNER JOIN (
			SELECT ROW_NUMBER() OVER (ORDER BY Dice.DieSides) AS DieSidesRN, Dice.DieSides FROM dbo.Dice
			) AS dc ON dc.DieSidesRN = dr.DieSidesRN
ORDER BY NEWID()


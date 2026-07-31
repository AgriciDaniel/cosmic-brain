/******************************************

T-SQL LEVEL UP: 
WINDOW FUNCTIONS SCRIPT

(C) 2015, Brent Ozar Unlimited.
See http://BrentOzar.com/go/eula for the End User Licensing Agreement.

Description: Demonstrates various window functions against
			 the CrossbowsAndCursors database.

To report bugs in this script, please visit https://support.brentozar.com


KNOWN ISSUES:
- This query will not run on SQL Server 2005.


v1.0.0 - 2015-06-30

*******************************************/


/******************************************************/
/* Use ROW_NUMBER window function with PlayerRolls    */
/******************************************************/

SELECT
RollDate
, PlayerID
, DieSides
, DieRoll
, ROW_NUMBER() OVER (PARTITION BY RollDate 
					 ORDER BY RollID) AS RollNumForToday
FROM dbo.PlayerRolls
WHERE DieSides = 20 

/*************************************************/
/* Use AVG window function with PlayerRolls	     */
/*************************************************/

SELECT
RollDate
, PlayerID
, DieSides
, DieRoll
, AVG(DieRoll) OVER (PARTITION BY RollDate) AS RollAvg
FROM dbo.PlayerRolls
WHERE DieSides = 20 

/*************************************************/
/* Use LAG/LEAD window function with PlayerRolls */
/*************************************************/

SELECT
RollDate
, PlayerID
, DieSides
, DieRoll
, LAG(DieRoll, 1) OVER (ORDER BY RollDate) AS RollPrev
, LEAD(DieRoll, 1) OVER (ORDER BY RollDate) AS RollNext
FROM dbo.PlayerRolls
WHERE DieSides = 20 

/****************************************************************/
/* Use FIRST_VALUE/LAST_VALUE window function with PlayerRolls  */
/****************************************************************/

SELECT
RollDate
, PlayerID
, DieSides
, DieRoll
, FIRST_VALUE(DieRoll) OVER (ORDER BY RollDate) AS RollFirst
, LAST_VALUE(DieRoll) OVER (ORDER BY RollDate) AS RollLast
FROM dbo.PlayerRolls
WHERE DieSides = 20 

/******************************************************/
/* Use SUM with ROWS window function with PlayerRolls */
/******************************************************/

SELECT
RollDate
, PlayerID
, DieSides
, DieRoll
, SUM(DieRoll) OVER (ORDER BY RollDate 
					 ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
			) AS RollRunningTotal
, SUM(DieRoll) OVER (ORDER BY RollDate 
					 ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
			) AS RollSumLast4
FROM dbo.PlayerRolls
WHERE DieSides = 20 

/******************************************************/
/* All together now!								  */
/******************************************************/
SELECT
  RollID
, RollDate
, PlayerID
, DieSides
, DieRoll
, ROW_NUMBER() OVER (PARTITION BY RollDate, PlayerID
					 ORDER BY RollID) AS RollNumForToday
, SUM(DieRoll) OVER () AS RollGrandTotal
, SUM(DieRoll) OVER (PARTITION BY RollDate) AS DayRollTotal
, SUM(DieRoll) OVER (PARTITION BY RollDate, PlayerID) AS PlayerDayRollTotal
, AVG(DieRoll) OVER (PARTITION BY RollDate) AS DayRollAvg
, AVG(DieRoll) OVER (PARTITION BY RollDate, PlayerID) AS PlayerDayRollAvg
, LAG(DieRoll, 1, 0) OVER (ORDER BY RollDate) AS RollPrev
, LEAD(DieRoll, 1) OVER (ORDER BY RollDate) AS RollNext
, FIRST_VALUE(DieRoll) OVER (ORDER BY RollDate
							) AS RollFirst
, LAST_VALUE(DieRoll) OVER (ORDER BY RollDate
					ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
							) AS RollLast
, SUM(DieRoll) OVER (ORDER BY RollDate 
					 ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
			) AS RollRunningTotal
, SUM(DieRoll) OVER (ORDER BY RollDate 
					 ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
			) AS RollSumLast4
FROM dbo.PlayerRolls
WHERE DieSides = 20
ORDER BY RollID, PlayerID

 
/******************************************

T-SQL LEVEL UP: 
CASE EXPRESSIONS SCRIPT

(C) 2015, Brent Ozar Unlimited.
See http://BrentOzar.com/go/eula for the End User Licensing Agreement.

Description: Demonstrates various CASE expressions against
			 the CrossbowsAndCursors database.

To report bugs in this script, please visit https://support.brentozar.com


KNOWN ISSUES:
- This query will not run on SQL Server 2005.


v1.0.0 - 2015-06-30

*******************************************/

/* Limitations of the IF/ELSE expression:
			No ElseIf, so it's A or B.
			Nested IF expressions quickly get out of hand.


CASE expressions allow for easier organization
                can be contained in a SUM or other function
                can evaluate multiple conditions
                are great for pivoting result sets
                can be used in the SELECT, WHERE, GROUP BY, ORDER BY
                not a good idea for JOIN (just do union alls instead)
                

*/

/******************************************************/	
/* Example #1: simple CASE expression */
/******************************************************/

SELECT PlayerName,
    CASE WHEN PlayerName = 'Queen Agee' THEN 'Leader'
         WHEN PlayerName IN ('Countess Distincto', 'The Hashmatcher', 'Voltair Perfmon') THEN 'Follower'
         ELSE 'Guest' END AS PartyRole 
FROM dbo.Player


/******************************************************/
/* Example #2: simple CASE expression in a COUNT 

    Extra sauce: COUNT, and because COUNT is an aggregate,
    we need a GROUP BY. 
*/
/******************************************************/

SELECT 
    CASE WHEN PlayerName = 'Queen Agee' THEN 'Leader'
         WHEN PlayerName IN ('Countess Distincto', 'The Hashmatcher', 'Voltair Perfmon') THEN 'Follower'
         ELSE 'Guest' 
		 END AS PartyRole  
         ,
    COUNT(   
    CASE WHEN PlayerName = 'Queen Agee' THEN 'Leader'
         WHEN PlayerName IN ('Countess Distincto', 'The Hashmatcher', 'Voltair Perfmon') THEN 'Follower'
         ELSE 'Guest' END
         ) AS HeadCount
FROM dbo.Player
GROUP BY 
    CASE WHEN PlayerName = 'Queen Agee' THEN 'Leader'
         WHEN PlayerName IN ('Countess Distincto', 'The Hashmatcher', 'Voltair Perfmon') THEN 'Follower'
         ELSE 'Guest' END 

;
/******************************************************/
/* Example #3: CASE in a WHERE clause
/******************************************************/

    Remember how we called this column 'PartyRole'
    in the previous example? Let's put 'PartyRole'
    in the WHERE clause.

    Let's pick up the CASE expression and move it down
    to the WHERE.

    Keep in mind because CASE returns a single value, that's
    only one side of the equation. We then need to specify
    what to compare that output against.

	The end result is that we get only the 'Follower' players
	returned.
   
*/

SELECT PlayerName
FROM dbo.Player
WHERE CASE WHEN PlayerName = 'Queen Agee' THEN 'Leader'
         WHEN PlayerName IN ('Countess Distincto', 'The Hashmatcher', 'Voltair Perfmon') THEN 'Follower'
         ELSE 'Guest'
		 END = 'Follower'
;


/******************************************************/
/* Example #4: Let's get fancy with CASE and SUM. */
/******************************************************/

SELECT PlayerName,
	SUM(CASE WHEN DieRoll = 1 THEN 1 ELSE 0 END) AS [1],
	SUM(CASE WHEN DieRoll = 2 THEN 1 ELSE 0 END) AS [2],
	SUM(CASE WHEN DieRoll = 3 THEN 1 ELSE 0 END) AS [3],
	SUM(CASE WHEN DieRoll = 4 THEN 1 ELSE 0 END) AS [4],
	SUM(CASE WHEN DieRoll = 5 THEN 1 ELSE 0 END) AS [5],
	SUM(CASE WHEN DieRoll = 6 THEN 1 ELSE 0 END) AS [6]
FROM dbo.Player AS p
JOIN dbo.PlayerRolls AS pr ON pr.PlayerID = p.PlayerID
WHERE DieSides = 6
GROUP BY PlayerName


/******************************************************/
/* Example #5: Nested CASE expression */
/******************************************************/

SELECT MonsterName, 
		CASE WHEN MonsterName LIKE 'Troll%' THEN
			CASE WHEN RIGHT(MonsterName, 4) = 'Blog' THEN 3
				WHEN RIGHT(MonsterName, 5) = 'Forum' THEN 2
				ELSE 0
			END
		ELSE 1
		END AS DangerLevel
FROM dbo.Monster

/* We can rewrite this to eliminate the nesting. This may look confusing
   because the third condition is included in the first and second. Since
   they get evaluated in order, the Blog and Forum Trolls will never get
   a value of 0 because the expression would have already exited with
   a matching condition.
*/

SELECT MonsterName, 
		CASE WHEN MonsterName LIKE 'Troll%' AND RIGHT(MonsterName, 4) = 'Blog' THEN 3
			 WHEN MonsterName LIKE 'Troll%' AND RIGHT(MonsterName, 5) = 'Forum' THEN 2
			 WHEN MonsterName LIKE 'Troll%' THEN 0
		ELSE 1
		END AS DangerLevel
FROM dbo.Monster
;

/******************************************************/
/* Example #6: CASE in a JOIN (Bad Idea)			  

It may be tempting to do this but it's neither efficient
nor elegant. Your better option is to put all the different 
possibilities together using UNION ALL.

*/
/******************************************************/

/* Setting up the objects */

CREATE TABLE #GameObjects
(ObjectID INT
,ObjectType VARCHAR(10)
,ObjectName VARCHAR(20)
)

INSERT #GameObjects (ObjectID, ObjectType, ObjectName)
SELECT PlayerID, 'Player', PlayerName FROM dbo.Player

INSERT #GameObjects (ObjectID, ObjectType, ObjectName)
SELECT MonsterID, 'Monster', MonsterName FROM dbo.Monster

/* Running the CASE-based JOIN query */

SELECT g.ObjectID, g.ObjectType, g.ObjectName, CASE WHEN p.PlayerXP IS NOT NULL THEN p.PlayerXP
				WHEN m.XPValue IS NOT NULL THEN m.XPValue
				ELSE 0 END AS XP
FROM #GameObjects AS g
LEFT JOIN dbo.Player AS p
	ON CASE WHEN p.PlayerID = g.ObjectID AND g.ObjectType = 'Player' THEN 1 ELSE 0 END = 1
LEFT JOIN dbo.Monster AS m
	ON CASE WHEN m.MonsterID = g.ObjectID AND g.ObjectType = 'Monster' THEN 1 ELSE 0 END = 1

/* The better, simpler way to write this statement: */

SELECT g.ObjectID, g.ObjectType, g.ObjectName, p.PlayerXP AS XP
FROM #GameObjects AS g
JOIN dbo.Player AS p ON p.PlayerID = g.ObjectID AND g.ObjectType = 'Player'
UNION ALL
SELECT g.ObjectID, g.ObjectType, g.ObjectName, m.XPValue
FROM #GameObjects AS g
JOIN dbo.Monster AS m ON m.MonsterID = g.ObjectID AND g.ObjectType = 'Monster'




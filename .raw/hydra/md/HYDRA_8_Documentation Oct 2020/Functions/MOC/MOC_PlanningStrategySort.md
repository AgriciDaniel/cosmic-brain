Sorting Rules
1 Sorting Rules
Overview
Menu Master data  Production control  Sorting rule
Transaction code plstrs
Function authorization mdplstrs
Purpose
You use this function to create or change sorting rules applied in the system's automatic assignment
function.
Integration
Priority rules are used during automatic assignment. The orders to be planned are ranked by priority and
placed in a queue. To identify the priorities, different priority rules are available.
In order to use a priority rule, it is assigned to a planning variant.
Selection criteria
The application provides the following selection criterion:
Description
Use this input field to search for the description of sorting rules that have already been created. You
can also use wildcards.
Field descriptions
The table on the left hand side shows all sorting rules configured. If you select a sorting rule, the table on
the right hand side shows the key figures (here: acronyms) assigned to this sorting rule. The key figures
specify the order-related fields used for the sorting of the queue.
Table - left hand side
Priority rule
All sorting rules are set up using the acronym "SORT". This is a fixed value that is assigned when a
new sorting rule is created.
Description
Detailed information on the priority rules.
MOC_PlanningStrategySort.docx Version: 1.4.18468 Page 1 of 3

|     |     |     |     | Sorting Rules  |
| --- | --- | --- | --- | -------------- |

Responsibility area
Use the responsibility area to control the access to the priority rule.
Table - right hand side
Key figure
Key figure (here: acronym) specifying the field of the order backlog. The possible key figures are
described below.
Priority
The priority specifies the sequence used to sort the key figures.
Sorting
The field Sorting defines whether sorting is performed in ascending (A) or in descending (D) order.
Toolbar
| The toolbar includes six icons used for editing:  |     |     |     |     |
| ------------------------------------------------- | --- | --- | --- | --- |
The first three icons are used to manage the priority rules, the second three icons are used to edit the
separate key figures.
How to proceed
To create a priority rule, follow the steps listed below:
1.  To create a new priority rule, click the button Insert in the Functions category.
2.  Select this priority rule from the list and now click the icon Insert in the Rules category to assign the
separate key figures.
| Key figure   | Designation       |     | Object  |     |
| ------------ | ----------------- | --- | ------- | --- |
| AUNR.DATFB   | Basic start date  |     | Order   |     |
| AUNR.DATSE   | Basic end date    |     | Order   |     |
| ANR.EXTPRIO  | Priority          |     | Order   |     |
| AUNR.PUFZ    | Buffer time       |     | Order   |     |
| AUNR.AUIDX   | Order index       |     | Order   |     |
| ANR.ANR      | Order number      |     | Order   |     |
| ANR.KDAUNR   | Sales order       |     | Order   |     |

MOC_PlanningStrategySort.docx  Version: 1.4.18468  Page 2 of 3

|     |     |     |     | Sorting Rules  |
| --- | --- | --- | --- | -------------- |

| Key figure    | Designation              |     | Object     |     |
| ------------- | ------------------------ | --- | ---------- | --- |
| ANR.DATTERMB  | Scheduled start date     |     | Operation  |     |
| ANR.DATTERME  | Scheduled end date       |     | Operation  |     |
| ANR.DATFB     | Earliest start date      |     | Operation  |     |
| ANR.DATFE     | Earliest end date        |     | Operation  |     |
| ANR.DATSB     | Latest start date        |     | Operation  |     |
| ANR.DATSE     | Latest end date          |     | Operation  |     |
| ANR.AGNR      | Operation number         |     | Operation  |     |
| ANR.WNR       | Tools of the OP          |     | Operation  |     |
| ANR.ATK       | Article of the OP        |     | Operation  |     |
| ANR.FU:1      | User field 1 of the OP   |     | Operation  |     |
| ANR.FU:2      | User field 2 of the OP   |     | Operation  |     |
| ANR.FU:3      | User field 3 of the OP   |     | Operation  |     |
| ANR.FU:7      | User field 7 of the OP   |     | Operation  |     |
| ANR.FU:8      | User field 8 of the OP   |     | Operation  |     |
| ANR.FU:9      | User field 9 of the OP   |     | Operation  |     |
| ANR.FU:29     | User field 29 of the OP  |     | Operation  |     |
| ANR.FU:30     | User field 30 of the OP  |     | Operation  |     |
| ANR.FU:31     | User field 31 of the OP  |     | Operation  |     |
| ANR.FU:23     | User field 23 of the OP  |     | Operation  |     |
| ANR.FU:24     | User field 24 of the OP  |     | Operation  |     |
| ANR.FU:25     | User field 25 of the OP  |     | Operation  |     |

MOC_PlanningStrategySort.docx  Version: 1.4.18468  Page 3 of 3
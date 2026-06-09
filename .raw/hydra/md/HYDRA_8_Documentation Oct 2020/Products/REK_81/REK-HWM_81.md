Manual
Workflow Complaint
Management
REK-HWM 8.1
Version 1.1.1374
Last changed on: 19.06.2020

Workflow Complaint Management
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
REK-HWM_81.docx Version: 1.1.2411 Page 2 of 78

Workflow Complaint Management
Contents
1 Overview of Complaint Management Workflows ......................................... 7
2 Workflow Overview ...................................................................................... 8
3 Workflow Events ........................................................................................ 11
4 Workflow Management - Task List ............................................................. 15
5 Workflow History ........................................................................................ 19
6 Workflow - Customer Complaint ................................................................ 21
6.1 Usage................................................................................................................ 21
6.2 Process Chart ................................................................................................... 22
6.2.1 Overview ............................................................................................... 22
6.2.2 Process Step "Entry of complaint data" ................................................. 23
6.2.3 Process Step "Determination of measures aiming at customer
satisfaction" ........................................................................................... 23
6.2.4 Process Step "Confirm receipt of complaint" .......................................... 24
6.2.5 Multiple Ramification "Customer satisfaction measure" ......................... 25
6.2.6 Process Step "Arrange replacement delivery" ....................................... 25
6.2.7 Process Step "Initiate rework at customer premises" ............................. 25
6.2.8 Process Step "Arrange discount" ........................................................... 26
6.2.9 Process Step "Arrange special measures" ............................................ 26
6.2.10 Process Step "Wait for detail analysis result" ......................................... 27
6.2.11 Ramification "Complaint justified" .......................................................... 27
6.2.12 Process Step "Clarification with customer" ............................................ 28
6.2.13 Process Step "Finish complaint" ............................................................ 28
6.2.14 Display of Workflow Information ............................................................ 28
6.3 Integration ......................................................................................................... 29
7 Workflow - Internal Complaint .................................................................... 31
7.1 Usage................................................................................................................ 31
7.2 Process Chart ................................................................................................... 32
7.2.1 Overview ............................................................................................... 32
REK-HWM_81.docx Version: 1.1.2411 Page 3 of 78

Workflow Complaint Management
7.2.2 Process Step "Entry and/or completion of complaint data" .................... 33
7.2.3 Process Step "Perform risk analysis" ..................................................... 33
7.2.4 Ramification "Immediate measures required?" ...................................... 34
7.2.5 Process Step "Define immediate measures" .......................................... 34
7.2.6 Process Step "Determine effectiveness of immediate measures" .......... 35
7.2.7 Ramification "Immediate measures effective?" ...................................... 35
7.2.8 Process Step "Determination of findings and completion" ...................... 35
7.2.9 Display of Workflow Information ............................................................ 36
7.3 Integration ......................................................................................................... 37
8 Workflow - Supplier Complaint ................................................................... 39
8.1 Usage................................................................................................................ 39
8.2 Process ............................................................................................................. 40
8.2.1 Overview ............................................................................................... 40
8.2.2 Process Step "Entry and/or completion of complaint data" .................... 41
8.2.3 Process Step "Notification of supplier" ................................................... 41
8.2.4 Process Step "Waiting for statement" .................................................... 42
8.2.5 Ramification "Statement o.k.?" .............................................................. 42
8.2.6 Process Step "Oppose statement" ......................................................... 43
8.2.7 Process Step "Determination of finding and completion" ....................... 43
8.2.8 Display of Workflow Information ............................................................ 43
8.3 Integration ......................................................................................................... 44
9 Workflow - Customer Complaint Detail ...................................................... 46
9.1 Usage................................................................................................................ 46
9.2 Process Chart ................................................................................................... 47
9.2.1 Overview ............................................................................................... 47
9.2.2 Process Step "Entry of complaint detail" ................................................ 48
9.2.3 Ramification "Evaluation according to 8D?" ........................................... 49
9.2.4 Process Step "Organization of team" ..................................................... 49
9.2.5 Process Step "Problem description" ...................................................... 49
9.2.6 Distribution ............................................................................................ 50
9.2.7 Process Step "Determine immediate measures" ................................... 50
9.2.8 Process Step "Determine failure causes" .............................................. 50
9.2.9 Process Step "Planning of remedial action" ........................................... 51
9.2.10 Ramification "Effectiveness agreed?" .................................................... 51
REK-HWM_81.docx Version: 1.1.2411 Page 4 of 78

Workflow Complaint Management
9.2.11 Process Step "Implementation of remedial action" (on the left) .............. 51
9.2.12 Process Step "Prevent failure repetition" ............................................... 52
9.2.13 Consolidation......................................................................................... 52
9.2.14 Process Step "Acknowledgment of team performance" ......................... 52
9.2.15 Process Step "Perform failure analysis" ................................................. 53
9.2.16 Process Step "Determination of remedial action" ................................... 53
9.2.17 Process Step "Implementation of remedial action" (on the right) ............ 54
9.2.18 Process Step "Complete complaint detail" ............................................. 54
9.2.19 Display of Workflow Information ............................................................ 55
9.3 Integration ......................................................................................................... 55
10 Workflow - Internal Complaint Detail .......................................................... 58
10.1 Usage................................................................................................................ 58
10.2 Process Chart ................................................................................................... 59
10.2.1 Overview ............................................................................................... 59
10.2.2 Process Step "Entry of complaint detail" ................................................ 60
10.2.3 Process Step "FMEA verification" .......................................................... 60
10.2.4 Ramification "Repetitive failure?" ........................................................... 61
10.2.5 Process Step "Determine failure causes" .............................................. 61
10.2.6 Process Step "Planning of remedial action" ........................................... 62
10.2.7 Process Step "Reference complaint verification" ................................... 62
10.2.8 Ramification "Accept failure analysis?" .................................................. 63
10.2.9 Process Step "Accept failure analysis" .................................................. 63
10.2.10 Ramification "Adopt remedial action?" ................................................... 63
10.2.11 Process Step "Adopt remedial action" ................................................... 63
10.2.12 Process Step "Implementation of remedial action"................................. 64
10.2.13 Ramification "Action effective?" ............................................................. 64
10.2.14 Process Step "Complete complaint detail" ............................................. 65
10.2.15 Process Step "FMEA verification" .......................................................... 65
10.2.16 Ramification "Is FMEA still up-to-date?" ................................................ 65
10.2.17 Process Step "Update FMEA" ............................................................... 66
10.2.18 Display of Workflow Information ............................................................ 66
10.3 Integration ......................................................................................................... 67
11 Workflow - Supplier Complaint Detail......................................................... 69
11.1 Usage................................................................................................................ 69
REK-HWM_81.docx Version: 1.1.2411 Page 5 of 78

Workflow Complaint Management
11.2 Process Chart ................................................................................................... 70
11.2.1 Overview ............................................................................................... 70
11.2.2 Process Step "Entry of complaint detail" ................................................ 71
11.2.3 Ramification "Are the items ok?" ............................................................ 72
11.2.4 Ramification "Are the items to be returned?" ......................................... 72
11.2.5 Ramification "Internal rework?" .............................................................. 72
11.2.6 Ramification "Are the items to be scrapped?" ........................................ 72
11.2.7 Process step "Clarification of complaint reason" .................................... 72
11.2.8 Process Step "Arrange return" ............................................................... 73
11.2.9 Process Step "Rework items" ................................................................ 73
11.2.10 Ramification "Rework ok?" .................................................................... 74
11.2.11 Process Step "Debit supplier's account" ................................................ 74
11.2.12 Process Step "Clarification of course of action" ..................................... 75
11.2.13 Process Step "Specify findings and complete" ....................................... 75
11.2.14 Display of Workflow Information ............................................................ 76
11.3 Integration ......................................................................................................... 76
REK-HWM_81.docx Version: 1.1.2411 Page 6 of 78

Workflow Complaint Management
1 Overview of Complaint Management Workflows
Fields of application
This component triggers workflows in complaint management. Individual workflows may be triggered,
subject to the complaint type, complaint header and complaint details.
Implementation notes
Utilization of this component is recommended if different departments/persons are involved in complaint
processing.
Integration
This component is only connected with complaint management and workflow design (provided that
necessary licenses have been purchased and users have participated in required trainings). As workflows
are normally only designed once, this component is nearly exclusively used in connection with complaint
management.
Features
These functions are available.
 Different workflows for the complaint header and complaint detail
 Possibility to use different workflows subject to the complaint type (by default: supplier complaint,
customer complaint and internal complaint)
 Automatic initiation of workflows including the creation of a complaint header or complaint detail
 Active information e.g. by e-mail, if workflow steps are activated
 Automatic or manual activation of workflow steps
 Assignment and triggering of tasks within a workflow step including deadlines and active
notification as soon as it is likely that deadlines cannot be met
 Tasks can be edited and finished and the next process step can be activated automatically
 Start of the workflow history (which process steps/tasks have been performed and at what point
in time)
REK-HWM_81.docx Version: 1.1.2411 Page 7 of 78

Workflow Complaint Management
2 Workflow Overview
Overview
Menu System administration – Workflow management – Workflow overview
Transaction code wfov
Function authorization wfov
Usage
The workflow overview provides an overview of currently running, finished and instantiated workflows
including status information on individual workflow steps.
Please note:
In order for the user to utilize this application, special privileges have to be assigned in the Insign Server.
Users need one of the two privileges:
 InSpire:monitorServer
 InSpire:manageServer
Via this overview, the user can switch to individual workflows without any task and view a tabular and
graphic display of the workflow history (i.e. what happened in the individual steps). The display is
structured in 2 parts:
1. Graphic presentation of the workflow with the individual steps
2. Tabular presentation of the "events" relating to a workflow. The following information is found
here:
a. Which user processed which tasks and at what time?
b. Which information was transferred to the WFM system (which variables were filled)?
c. Time of workflow instantiation
Selection criteria
The following selection criteria are available in the application:
Status
This selection criterion refers to the status of the workflow. Multiple selection is possible. The
following statuses may be selected:
- Active
- Finished
- Finishing
REK-HWM_81.docx Version: 1.1.2411 Page 8 of 78

Workflow Complaint Management
- Invalid
- Invalid threads
- New
Please note: If no selection is made, selection is made according to the statuses Active and New
by default, and only these workflows will be displayed.
Last modification
Selection according to the date on which the last modification was made. Warning: correct filtering
is only possible if both the From and the To date are set.
Process name
Selection according to the process name. Please note: wildcard entry is not possible.
Workflow Overview Detail Application (Table)
In the tabular Workflow overview detail application, all workflows are displayed in accordance with the
selection made.
The data available in the table are described below. These data might not be shown by default. In this
case, they can be added using the column selection.
Process ID
Process ID
Process
Process
Version
Version
Status
Status of the workflow. Color display in accordance with the respective status.
Last modification
Last modification
Storage duration
Storage duration
Toolbar
Workflow History
Function authorization: wfhist
Link to function: Workflow history
REK-HWM_81.docx Version: 1.1.2411 Page 9 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

   Workflow Information
Function authorization: wfinfo

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 10 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
3 Workflow Events
Overview
Menu System administration – Workflow management – Workflow events
Transaction code wfev
Function authorization wfev
Usage
The workflow events application shows instantiated workflows.
Prerequisite
Advanced object configuration
The workflow alias name must be defined in the "Advanced object configuration" application.
Object type
The fixed value WFM_CONFIG is to be defined here.
Object ID 1
The real workflow name is to be indicated here.
Object ID 2
The workflow version is to be indicated here.
REK-HWM_81.docx Version: 1.1.2411 Page 11 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

Parameter
  The workflow alias name is indicated here.

Selection criteria
The following selection criteria are available in the application:
Status
Status. The following statuses are available for selection:
| -   | DONE          |     |     |     |
| --- | ------------- | --- | --- | --- |
| -   | DONE RESEND   |     |     |     |
| -   | ERROR         |     |     |     |
| -   | ERROR RESEND  |     |     |     |
Workflow Events Detail Application (Table)
The tabular workflow events detail application shows the workflows which were instantiated by HYDRA. If
a workflow could not be instantiated, it can be instantiated again through this application.
The data available in the table are described below. These data might not be shown by default. In this
case, they can be added using the column selection.
Workflow tab
Process ID
Process ID
Status
Possible statuses:
| DONE  |     Workflow was instantiated   |     |     |     |
| ----- | -------------------------------- | --- | --- | --- |
DONE RESEND    Workflow was resent and then instantiated correctly
| ERROR  |     Workflow could not be instantiated  |     |     |     |
| ------ | ---------------------------------------- | --- | --- | --- |
ERROR RESEND  Workflow could again not be instantiated in a repeated attempt

Status text
The error text of the workflow engine is shown here in the case of an error.
Module
Module which triggered the workflow.
Designation
Detailed designation of module

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 12 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
Process alias name
Process alias name
Process name
Process name
Process version
Process version
Workflow tab
ID 1-5
ID 1-5 (references from HYDRA data base)
Key 1-5
Key 1-5 (text key from HYDRA data base)
Date key 1-5
Date key 1-5
Data
This shows the variables transferred, separated by pipe character.
Last editing tab
Editor
Initially, this shows the editor who initiated the workflow. If the workflow is transferred again, the
user is updated.
Last modification
Last modification
Trigger tab
Editor
Editor who triggered the workflow.
Last modification
Time stamp of instantiation
Toolbar
Workflow History
Function authorization: wfhist
Link to function: Workflow history
REK-HWM_81.docx Version: 1.1.2411 Page 13 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

   Resend
Workflows in ERROR or ERROR RESEND status can be transferred once again.
   Workflow Information
Function authorization: wfinfo

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 14 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
4 Workflow Management - Task List
Overview
Menu System administration – Workflow management - Task list
Transaction code wftl
Function authorization wftl
Usage
Using workflow management will generate tasks in a running process, which are to be handled by a user
and/or a specified user. The task list shows the generated tasks for a user or a group assigned to the
user. In addition, the user can process, forward and/or adopt a task.
The definition of the workflow and the related task definition are created in a separate designer in MES
workflow management.
Selection criteria
The task list provides the following selection criteria:
User
By default, this field contains the user who is currently logged on. To change the user in order to
display other tasks, the function authorization wftladmin has to be entered for the user currently
logged on.
Show finished tasks
If this box is checked, finished tasks are also displayed. Otherwise only active tasks are shown.
Show the user's tasks only
If this box is checked, only the tasks directly assigned to the user are displayed. Otherwise the
tasks assigned to a group to which the current user was assigned are also shown.
Created
Selection by the creation date of the tasks. Warning: correct limitation is only possible if both the
From and the To date are set.
Done by
Selection by the date by which the task has to be finished. Warning: correct limitation is only
possible if both the From and the To date are set.
Description
Selection by the task description. Wildcard search using * is possible here.
REK-HWM_81.docx Version: 1.1.2411 Page 15 of 78

Workflow Complaint Management
Task List Detail Application (Table)
The tabular Task List detail application shows all tasks matching the selections made.
The data available in the table are described below. These data might not be shown by default. In this
case, they can be added using the column selection.
Process ID
Process ID of relevant task
Task ID
Task ID of relevant task
Work step
Name of work step. The name of the work step is automatically generated from the process
element.
Role
The task may be assigned to a person, a group or a role. The individual assignments are displayed
as follows:
USER:  Task is assigned to a person
GROUP  Task is assigned to a group
ROLE:  Task is assigned to a role
Title
The "Task description" of the generic task is displayed here.
Job
Job name of generic task
Description
Description of generic task
Priority
Task priority
The following values are possible:
Low, Normal, High, Urgent, Maximum
Created
Task creation date
Done by
"Done by" date of task
REK-HWM_81.docx Version: 1.1.2411 Page 16 of 78

Workflow Complaint Management
Finished
Termination time of task
Reserved for
Person for whom the task is reserved
Status
Status of task "not started", "reserved", "active" or "finished"
Thread ID
Thread ID
Flags
Flags
Send e-mail
Send e-mail
Total time
Total time
Estimated total time
Estimated total time
Locked by
Locked by
Started
Started
Calculation
Calculation
Classification
Classification
Costs
Costs
Deputy
Deputy
Url
Url
Resubmission
Resubmission
Last read
Last read
REK-HWM_81.docx Version: 1.1.2411 Page 17 of 78

Workflow Complaint Management
User data 1-4
User data 1-4
Toolbar
Process Task
Workflow History
Function authorization: wfhist
Link to function: Workflow history
Accept Task
Acceptance of a task by the user currently logged on.
Forward Task
Forwarding of a task to a user, a group or a function (combination of group and role)
Workflow Information
Function authorization: wfinfo
REK-HWM_81.docx Version: 1.1.2411 Page 18 of 78

Workflow Complaint Management
5 Workflow History
Overview
Menu -
Transaction code wfhist
Function authorization wfhist
Usage
The workflow history shows the sequence of a workflow in graphic and tabular form.
Selection criteria
The following selection criteria are available in the application:
Process ID
Process ID
Show details
The detail view shows all information relating to the workflow.
Workflow History Detail Application (Table)
The tabular Workflow history detail application shows the sequence of the workflow in accordance with
the selections made.
The data available in the table are described below. These data might not be shown by default. In this
case, they can be added using the column selection.
ID
ID
Thread
Thread
Step
Step
User
User
Time
Time
REK-HWM_81.docx Version: 1.1.2411 Page 19 of 78

Workflow Complaint Management
Parameter
Parameter
Previous value
Previous value
Status Detail Application (Image)
Zooming is performed by selecting the image and scrolling with the mouse wheel.
REK-HWM_81.docx Version: 1.1.2411 Page 20 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

6  Workflow - Customer Complaint
| 6.1  | Usage  |     |     |     |
| ---- | ------ | --- | --- | --- |
This is the description of the standard workflow process to be used for processing customer complaints.
The workflow is administered under the name HYDRA_complaint_customer.
A workflow based on the process described here is instantiated when a complaint of the type "customer
complaint" is created.
In the course of customizing, other workflow processes deviating from the standard could also
be instantiated upon the creation of customer complaints.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 21 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 6.2    | Process Chart  |     |     |     |
| ------ | -------------- | --- | --- | --- |
| 6.2.1  | Overview       |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 22 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
Identification of Addressee of Relevant Task
Upon activation of a process step for which a generic task has been defined, the addressee of this task is
identified on the basis of the responsible person defined in the associated complaint at that time.
For this purpose, the type and ID are read first. The addressee is identified as follows according to the
type:
 Responsible person of type "external person":
A workflow user whose logon name corresponds with the ID of the external person is searched.
 Responsible person of type "person":
At first, a HYDRA user is searched who was assigned the ID of the person responsible for the
complaint in the "Person" field. Following this, a workflow user is searched whose logon name
corresponds with the HYDRA user found.
 Responsible persons of all other types:
Using the ID of the person responsible for the complaint, a group is searched in the workflow
management system.
Should problems occur regarding the determination of detail data, or should the searched workflow user
and/or the group not exist, the group "COMPLAINT_MANAGER" is used as addressee.
6.2.2 Process Step "Entry of complaint data"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Have the complaint data been recorded?“
6.2.3 Process Step "Determination of measures aiming at
customer satisfaction"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
REK-HWM_81.docx Version: 1.1.2411 Page 23 of 78

Workflow Complaint Management
The originator of this process step must now define which tasks he/she intends to initiate to restore
customer satisfaction. The tasks "Measure: Arrange replacement delivery"; "Measure: Rework at
Customer Premises", "Measure: Discount" and "Special measure" are available.
At this point, the user may choose to select several different measures. However, the decision as to
which direction the workflow process will continue is made on the basis of one measure.
The workflow is not continued until at least one of the measures has been selected.
6.2.4 Process Step "Confirm receipt of complaint"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has receipt of the complaint been confirmed?“
REK-HWM_81.docx Version: 1.1.2411 Page 24 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

6.2.5  Multiple Ramification "Customer satisfaction measure"
Based on the selected made in the process step "Determination of measures aiming at customer
| satisfaction", it is decided how the workflow is continued.  |     |     |     |     |
| ------------------------------------------------------------ | --- | --- | --- | --- |
If several checkboxes were marked in the associated task, the system jumps to the first process step
found in the following sequence:
  Measure: Arrange replacement delivery
  Measure: Rework at Customer Premises
  Measure: Discount
  Special measure

| 6.2.6  | Process Step "Arrange replacement delivery"  |     |     |     |
| ------ | -------------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has a replacement delivery been arranged?“
| 6.2.7  | Process Step "Initiate rework at customer premises"  |     |     |     |
| ------ | ---------------------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 25 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has rework been carried out?“
| 6.2.8  | Process Step "Arrange discount"  |     |     |     |
| ------ | -------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has a discount been arranged?“
| 6.2.9  | Process Step "Arrange special measures"  |     |     |     |
| ------ | ---------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 26 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the special measure been arranged?“
| 6.2.10  | Process Step "Wait for detail analysis result"  |     |     |     |
| ------- | ----------------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

In accordance with the status of the "Complaint justified?" checkbox, a decision is made at the time of
task completion as to whether commercial clarification with the customer is required.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "All detailed complaints completed?“
| 6.2.11  | Ramification "Complaint justified"  |     |     |     |
| ------- | ----------------------------------- | --- | --- | --- |
In accordance with the selection in the "Complaint justified?" checkbox in the previous process step,
either clarification with the customer is proposed or there is a ramification for verification of all data
concerning complaint handling.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 27 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 6.2.12  | Process Step "Clarification with customer"  |     |     |     |
| ------- | ------------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the problem been clarified with the customer?“
| 6.2.13  | Process Step "Finish complaint"  |     |     |     |
| ------- | -------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is finished when completion of this task has been documented by activating the checkbox
"Has the complaint been completed?“
| 6.2.14  | Display of Workflow Information  |     |     |     |
| ------- | -------------------------------- | --- | --- | --- |
The  workflow  information  function  will  display  all  information  which  has  been  defined  in  workflow
processing and has an effect on ramifications in the workflow.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 28 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The meaning of the elements in this display is explained in the context of the relevant process steps
where this information is available for entry.
All information is made available as read-only information at this point.
| 6.3  | Integration  |     |     |     |
| ---- | ------------ | --- | --- | --- |
Upon creation of a customer complaint, an active entry of the object type WFM_CONFIG with parameter
Complaint_ComplaintType_KUNDE is searched in the advanced object configuration of HYDRA.
The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used
(by  default:  HYDRA_complaint_customer).  The  parameter  "Object  ID  2"  of  the  entry  found  is
interpreted as the version of the process definition to be used.
These parameters may be used to create a new workflow event. Its key fields are assigned as follows:
|     | Key field  Contents                                |     |     |     |
| --- | -------------------------------------------------- | --- | --- | --- |
|     | Module  COMPLAINT                                  |     |     |     |
|     | Designation  Workflow for complaint                |     |     |     |
|     | Process alias name  Complaint_ComplaintType_KUNDE  |     |     |     |
|     | Process name  Name of process definition           |     |     |     |
(result of the previously described search)
|     | Process version  Version of process definition  |     |     |     |
| --- | ----------------------------------------------- | --- | --- | --- |
(result of the previously described search)
|     | ID 1  Internal number of customer complaint  |     |     |     |
| --- | -------------------------------------------- | --- | --- | --- |
|     | ID 2  Empty                                  |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 29 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

|     | ID 3   | Empty                            |     |     |     |
| --- | ------ | -------------------------------- | --- | --- | --- |
|     | ID 4   | Empty                            |     |     |     |
|     | ID 5   | Empty                            |     |     |     |
|     | Key 1  | Data type of customer complaint  |     |     |     |
(default: REK)
|     | Key 2  | Area of customer complaint                   |     |     |     |
| --- | ------ | -------------------------------------------- | --- | --- | --- |
|     | Key 3  | Empty                                        |     |     |     |
|     | Key 4  | Empty                                        |     |     |     |
|     | Key 5  | Empty                                        |     |     |     |
|     | Data   | var_HYDRA_rectype=<Data type of complaint>|  |     |     |     |
|     |        | var_HYDRA_ber=<Area of complaint>|           |     |     |     |
var_HYDRA_reknr=<Internal number of customer complaint>|

Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name
of the process definition and its version. Should this fail, the process event will provide an indication of the
cause.
If  instantiation  of  the  workflow  was  successful,  the  workflow  variables  var_HYDRA_rectype,
var_HYDRA_ber and var_HYDRA_reknr can be used to generate the reference to the associated
customer complaint directly.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     |     | Page 30 of 78  |
| ---------------- | --- | ------------------ | --- | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

7  Workflow - Internal Complaint
| 7.1  | Usage  |     |     |     |
| ---- | ------ | --- | --- | --- |
This is the description of the standard workflow process to be used for processing internal complaints.
The workflow is administered under the name HYDRA_complaint_internal.
A workflow based on the process described here is instantiated when a complaint of the type "internal
complaint" is created.
In the course of customizing, other workflow processes deviating from the standard could also
be instantiated upon the creation of internal complaints.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 31 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 7.2    | Process Chart  |     |     |     |
| ------ | -------------- | --- | --- | --- |
| 7.2.1  | Overview       |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 32 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
Identification of Addressee of Relevant Task
Upon activation of a process step for which a generic task has been defined, the addressee of this task is
identified on the basis of the responsible person defined in the associated complaint at that time.
For this purpose, the type and ID are read first. The addressee is identified as follows according to the
type:
 Responsible person of type "external person":
A workflow user whose logon name corresponds with the ID of the external person is searched.
 Responsible person of type "person":
At first, a HYDRA user is searched who was assigned the ID of the person responsible for the
complaint in the "Person" field. Following this, a workflow user is searched whose logon name
corresponds with the HYDRA user found.
 Responsible persons of all other types:
Using the ID of the person responsible for the complaint, a group is searched in the workflow
management system.
Should problems occur regarding the determination of detail data, or should the searched workflow user
and/or the group not exist, the group "COMPLAINT_MANAGER" is used as addressee.
7.2.2 Process Step "Entry and/or completion of complaint
data"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Have complaint data been entered?".
7.2.3 Process Step "Perform risk analysis"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
REK-HWM_81.docx Version: 1.1.2411 Page 33 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

In accordance with the status of the checkbox "Do immediate measures have to be defined?", it is
decided at the time of task completion whether to proceed in this regard or whether there is a ramification
| for determining the complaint findings.  |     |     |     |     |
| ---------------------------------------- | --- | --- | --- | --- |
The workflow is not continued until completion of this task has been documented by activating the
checkbox "The risk analysis has been performed".
| 7.2.4  | Ramification "Immediate measures required?"  |     |     |     |
| ------ | -------------------------------------------- | --- | --- | --- |
In accordance with the selection in the checkbox "Do immediate measures have to be defined?" in the
previous process step, either clarification with the customer is proposed or there is a ramification for
verification of all data concerning complaint handling.
| 7.2.5  | Process Step "Define immediate measures"  |     |     |     |
| ------ | ----------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Immediate measure(s) has/have been defined".

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 34 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 7.2.6  | Process Step "Determine effectiveness of immediate  |     |     |     |
| ------ | --------------------------------------------------- | --- | --- | --- |
measures"
Activating this process step will create a task. The recipient of the task is notified by e-mail.

In accordance with the status of the checkbox "Has the immediate measure been effective?", it is decided
at the time of task completion whether additional immediate measures are to be defined or whether there
is a ramification for determining the complaint findings.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Measure effectiveness assessed?".
| 7.2.7  | Ramification "Immediate measures effective?"  |     |     |     |
| ------ | --------------------------------------------- | --- | --- | --- |
In accordance with the selection in the checkbox "Has the immediate measure been effective?" in the
previous process step, either you return to the definition of immediate measures or you proceed with a
verification of all data concerning complaint handling.
7.2.8  Process Step "Determination of findings and completion"
Activating this process step will create a task. The recipient of the task is notified by e-mail.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 35 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The workflow is finished when completion of this task has been documented by activating the checkbox
"Has the complaint been completed?".
| 7.2.9  | Display of Workflow Information  |     |     |     |
| ------ | -------------------------------- | --- | --- | --- |
The  workflow  information  function  will  display  all  information  which  has  been  defined  in  workflow
processing and has an effect on ramifications in the workflow.

The meaning of the elements in this display is explained in the context of the relevant process steps
where this information is available for entry.
All information is made available as read-only information at this point.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 36 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 7.3  | Integration  |     |     |     |
| ---- | ------------ | --- | --- | --- |
Upon creation of an internal complaint, an active entry of the object type WFM_CONFIG with parameter
Complaint_ComplaintType_INTERN is searched in the advanced object configuration of HYDRA.
The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used
(by  default:  HYDRA_complaint_internal).  The  parameter  "Object  ID  2"  of  the  entry  found  is
interpreted as the version of the process definition to be used.
These parameters can be used to create a new workflow event. Its key fields are assigned as follows:
|     | Key field  Contents                                 |     |     |     |
| --- | --------------------------------------------------- | --- | --- | --- |
|     | Module  COMPLAINT                                   |     |     |     |
|     | Designation  Workflow for complaint                 |     |     |     |
|     | Process alias name  Complaint_ComplaintType_INTERN  |     |     |     |
|     | Process name  Name of process definition            |     |     |     |
(result of the previously described search)
|     | Process version  Version of process definition  |     |     |     |
| --- | ----------------------------------------------- | --- | --- | --- |
(result of the previously described search)
|     | ID 1  Internal number of internal complaint  |     |     |     |
| --- | -------------------------------------------- | --- | --- | --- |
|     | ID 2  Empty                                  |     |     |     |
|     | ID 3  Empty                                  |     |     |     |
|     | ID 4  Empty                                  |     |     |     |
|     | ID 5  Empty                                  |     |     |     |
|     | Key 1  Data type of internal complaint       |     |     |     |
(default: REK)
|     | Key 2  Area of internal complaint  |     |     |     |
| --- | ---------------------------------- | --- | --- | --- |
|     | Key 3  Empty                       |     |     |     |
|     | Key 4  Empty                       |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 37 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

|     | Key 5  | Empty                                        |     |     |     |
| --- | ------ | -------------------------------------------- | --- | --- | --- |
|     | Data   | var_HYDRA_rectype=<Data type of complaint>|  |     |     |     |
|     |        | var_HYDRA_ber=<Area of complaint>|           |     |     |     |
var_HYDRA_reknr=<Internal number of customer complaint>|

Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name
of the process definition and its version. Should this fail, the process event will provide an indication of the
cause.
If  instantiation  of  the  workflow  was  successful,  the  workflow  variables  var_HYDRA_rectype,
var_HYDRA_ber and var_HYDRA_reknr may be used to generate the reference to the associated
internal complaint directly.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     |     | Page 38 of 78  |
| ---------------- | --- | ------------------ | --- | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

8  Workflow - Supplier Complaint
| 8.1  | Usage  |     |     |     |
| ---- | ------ | --- | --- | --- |
This is the description of the standard workflow process to be used for processing supplier complaints.
The workflow is administered under the name HYDRA_complaint_customer.
A workflow based on the process described here is instantiated when a complaint of the type "supplier
complaint" is created.
In the course of customizing, other workflow processes deviating from the standard could also
be instantiated upon the creation of supplier complaints.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 39 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 8.2    | Process   |     |     |     |
| ------ | --------- | --- | --- | --- |
| 8.2.1  | Overview  |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 40 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
Identification of Addressee of Relevant Task
Upon activation of a process step for which a generic task has been defined, the addressee of this task is
identified on the basis of the responsible person defined in the associated complaint at that time.
For this purpose, the type and ID are read first. The addressee is identified as follows according to the
type:
 Responsible person of type "external person":
A workflow user whose logon name corresponds with the ID of the external person is searched.
 Responsible person of type "person":
At first, a HYDRA user is searched who was assigned the ID of the person responsible for the
complaint in the "Person" field. Following this, a workflow user is searched whose logon name
corresponds with the HYDRA user found.
 Responsible persons of all other types:
Using the ID of the person responsible for the complaint, a group is searched in the workflow
management system.
Should problems occur regarding the determination of detail data, or should the searched workflow user
and/or the group not exist, the group "COMPLAINT_MANAGER" is used as addressee.
8.2.2 Process Step "Entry and/or completion of complaint
data"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Have complaint data been entered?".
8.2.3 Process Step "Notification of supplier"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
REK-HWM_81.docx Version: 1.1.2411 Page 41 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Suppler has been informed".
| 8.2.4  | Process Step "Waiting for statement"  |     |     |     |
| ------ | ------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

In accordance with the status of the "Statement o.k.?" checkbox, it is decided at the time of task
completion whether the statement of the supplier is to be opposed and a new statement requested, or
| whether there is a ramification for determining the complaint finding.  |     |     |     |     |
| ----------------------------------------------------------------------- | --- | --- | --- | --- |
The workflow is not continued until completion of this task has been documented by activating the
"Statement received" checkbox.
| 8.2.5  | Ramification "Statement o.k.?"  |     |     |     |
| ------ | ------------------------------- | --- | --- | --- |
In accordance with the selection in the "Statement O.K.?" checkbox in the previous process step, the
statement of the supplier is either opposed or verification of all data concerning complaint handling
follows.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 42 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 8.2.6  | Process Step "Oppose statement"  |     |     |     |
| ------ | -------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is finished when completion of this task has been documented by activating the "Statement
opposed?" checkbox.
8.2.7  Process Step "Determination of finding and completion"
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is finished when completion of this task has been documented by activating the checkbox
"Has the complaint been completed?".
| 8.2.8  | Display of Workflow Information  |     |     |     |
| ------ | -------------------------------- | --- | --- | --- |
The  workflow  information  function  will  display  all  information  which  has  been  defined  in  workflow
processing and has an effect on ramifications in the workflow.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 43 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The meaning of the elements in this display is explained in the context of the relevant process steps
where this information is available for entry.
All information is made available as read-only information at this point.
| 8.3  | Integration  |     |     |     |
| ---- | ------------ | --- | --- | --- |
Upon creation of a supplier complaint, an active entry of the object type WFM_CONFIG with parameter
Complaint_ComplaintType_LIEFERANT is searched in the advanced object configuration of HYDRA.

The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used
HYDRA_complaint_supplier).
(by  default:  The  parameter  "Object  ID  2"  of  the  entry  found  is
interpreted as the version of the process definition to be used.
These parameters can be used to create a new workflow event. Its key fields are assigned as follows:
|     | Key field  Content                                     |     |     |     |
| --- | ------------------------------------------------------ | --- | --- | --- |
|     | Module  COMPLAINT                                      |     |     |     |
|     | Designation  Workflow for complaint                    |     |     |     |
|     | Process alias name  Complaint_ComplaintType_LIEFERANT  |     |     |     |
|     | Process name  Name of process definition               |     |     |     |
(result of the previously described search)
|     | Process version  Version of process definition  |     |     |     |
| --- | ----------------------------------------------- | --- | --- | --- |
(result of the previously described search)
|     | ID 1  Internal number of supplier complaint  |     |     |     |
| --- | -------------------------------------------- | --- | --- | --- |
|     | ID 2  Empty                                  |     |     |     |
|     | ID 3  Empty                                  |     |     |     |
|     | ID 4  Empty                                  |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 44 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

|     | ID 5   | Empty                            |     |     |     |
| --- | ------ | -------------------------------- | --- | --- | --- |
|     | Key 1  | Data type of supplier complaint  |     |     |     |
(default: REK)
|     | Key 2  | Area of supplier complaint                   |     |     |     |
| --- | ------ | -------------------------------------------- | --- | --- | --- |
|     | Key 3  | Empty                                        |     |     |     |
|     | Key 4  | Empty                                        |     |     |     |
|     | Key 5  | Empty                                        |     |     |     |
|     | Data   | var_HYDRA_rectype=<Data type of complaint>|  |     |     |     |
|     |        | var_HYDRA_ber=<Area of complaint>|           |     |     |     |
var_HYDRA_reknr=<Internal number of customer complaint>|

Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name
of the process definition and its version. Should this fail, the process event will provide an indication of the
cause.
If  instantiation  of  the  workflow  was  successful,  the  workflow  variables  var_HYDRA_rectype,
var_HYDRA_ber and var_HYDRA_reknr may be used to generate the reference to the associated
supplier complaint directly.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     |     | Page 45 of 78  |
| ---------------- | --- | ------------------ | --- | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

9  Workflow - Customer Complaint Detail
| 9.1  | Usage  |     |     |     |
| ---- | ------ | --- | --- | --- |
This is the description of the standard workflow process to be used for processing customer complaint
details.
The workflow is administered under the name HYDRA_complaintdetail_customer.
A workflow based on the process described here is instantiated when a complaint detail for a complaint of
the type "customer complaint" is created.
In the course of customizing, other workflow processes deviating from the standard could also
|     | be instantiated upon the creation of customer complaint details.  |     |     |     |
| --- | ----------------------------------------------------------------- | --- | --- | --- |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 46 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 9.2    | Process Chart  |     |     |     |
| ------ | -------------- | --- | --- | --- |
| 9.2.1  | Overview       |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 47 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
Identification of Addressee of Relevant Task
Upon activation of a process step for which a generic task has been defined, the addressee of this task is
identified on the basis of the responsible person defined in the associated complaint detail at that time.
For this purpose, the type and ID are read first. The addressee is identified as follows according to the
type:
 Responsible person of type "external person":
A workflow user whose logon name corresponds with the ID of the external person is searched.
 Responsible person of type "person":
At first, a HYDRA user is searched who was assigned the ID of the person responsible for the
complaint detail in the "Person" field. Following this, a workflow user is searched whose logon
name corresponds with the HYDRA user found.
 Responsible persons of all other types:
Using the ID of the person responsible for the complaint detail, a group is searched in the
workflow management system.
Should problems occur regarding the determination of detail data, or should the searched workflow user
and/or the group not exist, the group "COMPLAINT_MANAGER" is used as addressee.
9.2.2 Process Step "Entry of complaint detail"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
In accordance with the status of the checkbox "Process complaint based on 8D?", it is decided at the time
of task completion whether the complaint detail is to be handled according to 8D or in a simplified
manner.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Have the complaint detail data been entered?".
REK-HWM_81.docx Version: 1.1.2411 Page 48 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 9.2.3  | Ramification "Evaluation according to 8D?"  |     |     |     |
| ------ | ------------------------------------------- | --- | --- | --- |
In accordance with the selection in the checkbox "Process complaint based on 8D?" in the previous
process step, there is a ramification for evaluation according to 8D or a simplified manner.
| 9.2.4  | Process Step "Organization of team"  |     |     |     |
| ------ | ------------------------------------ | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the "Team
organized?" checkbox.
| 9.2.5  | Process Step "Problem description"  |     |     |     |
| ------ | ----------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the problem been described?".

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 49 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 9.2.6  | Distribution  |     |     |     |
| ------ | ------------- | --- | --- | --- |
At this point, workflow processing is split into two parallel processes. One is about determining immediate
measures. The other one is about researching the cause of the fault and the subsequent implementation
of remedial action.
| 9.2.7  | Process Step "Determine immediate measures"  |     |     |     |
| ------ | -------------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Immediate measure(s) has/have been defined".
| 9.2.8  | Process Step "Determine failure causes"  |     |     |     |
| ------ | ---------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Have failure causes been determined?".

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 50 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 9.2.9  | Process Step "Planning of remedial action"  |     |     |     |
| ------ | ------------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

In accordance with the status of the checkbox "Is the remedial action effective?", it is decided at the time
of task completion whether to return to determining the cause of the fault.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has remedial action been determined?".
| 9.2.10  | Ramification "Effectiveness agreed?"  |     |     |     |
| ------- | ------------------------------------- | --- | --- | --- |
If remedial action was not considered effective in the previous process step, you return to the process
| step "Determine failure causes".  |     |     |     |     |
| --------------------------------- | --- | --- | --- | --- |
In the other case, workflow processing is continued at the process step "Implementation of remedial
action".
9.2.11  Process Step "Implementation of remedial action" (on the
left)
Activating this process step will create a task. The recipient of the task is notified by e-mail.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 51 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has remedial action been implemented?".
| 9.2.12  | Process Step "Prevent failure repetition"  |     |     |     |
| ------- | ------------------------------------------ | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has a repetition of the failure been prevented?".
| 9.2.13  | Consolidation  |     |     |     |
| ------- | -------------- | --- | --- | --- |
At this point the system waits until processing of both paths is completed. Processing will then continue at
the process step "Acknowledgment of team performance".
| 9.2.14  | Process Step "Acknowledgment of team performance"  |     |     |     |
| ------- | -------------------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 52 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Team performance acknowledged?".
| 9.2.15  | Process Step "Perform failure analysis"  |     |     |     |
| ------- | ---------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has failure analysis been performed?".
| 9.2.16  | Process Step "Determination of remedial action"  |     |     |     |
| ------- | ------------------------------------------------ | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 53 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has remedial action been determined?".
9.2.17  Process Step "Implementation of remedial action" (on the
right)
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has remedial action been implemented?".
| 9.2.18  | Process Step "Complete complaint detail"  |     |     |     |
| ------- | ----------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 54 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the complaint detail been completed?".
9.2.19 Display of Workflow Information
The workflow information function will display all information which has been defined in workflow
processing and has an effect on ramifications in the workflow.
The meaning of the elements in this display is explained in the context of the relevant process steps
where this information is available for entry.
All information is made available as read-only information at this point.
9.3 Integration
Upon creation of a customer complaint detail, an active entry of the object type WFM_CONFIG with
parameter ComplaintDetail_ComplaintType_KUNDE is searched in the advanced object
configuration of HYDRA.
The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used
(by default: HYDRA_complaintdetail_customer). The parameter "Object ID 2" of the entry found is
interpreted as the version of the process definition to be used.
These parameters can be used to create a new workflow event. Its key fields are assigned as follows:
REK-HWM_81.docx Version: 1.1.2411 Page 55 of 78

|     |     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

|     | Key field           | Content                              |     |     |     |
| --- | ------------------- | ------------------------------------ | --- | --- | --- |
|     | Module              | COMPLAINTDETAIL                      |     |     |     |
|     | Designation         | Workflow for complaintdetail         |     |     |     |
|     | Process alias name  | ComplaintDetail_ComplaintType_KUNDE  |     |     |     |
|     | Process name        | Name of process definition           |     |     |     |
(result of the previously described search)
|     | Process version  | Version of process definition  |     |     |     |
| --- | ---------------- | ------------------------------ | --- | --- | --- |
(result of the previously described search)
|     | ID 1   | Internal number of customer complaint  |     |     |     |
| --- | ------ | -------------------------------------- | --- | --- | --- |
|     | ID 2   | Number of complaint detail             |     |     |     |
|     | ID 3   | Empty                                  |     |     |     |
|     | ID 4   | Empty                                  |     |     |     |
|     | ID 5   | Empty                                  |     |     |     |
|     | Key 1  | Data type of customer complaint        |     |     |     |
(default: REK)
|     | Key 2  | Area of customer complaint                   |     |     |     |
| --- | ------ | -------------------------------------------- | --- | --- | --- |
|     | Key 3  | Empty                                        |     |     |     |
|     | Key 4  | Empty                                        |     |     |     |
|     | Key 5  | Empty                                        |     |     |     |
|     | Data   | var_HYDRA_rectype=<Data type of complaint>|  |     |     |     |
|     |        | var_HYDRA_ber=<Area of complaint>|           |     |     |     |
var_HYDRA_reknr=<Internal number of customer complaint>|
var_HYDRA_rekdetnr=<Complaint detail number>|

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     |     | Page 56 of 78  |
| ---------------- | --- | ------------------ | --- | --- | -------------- |

Workflow Complaint Management
Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name
of the process definition and its version. Should this fail, the process event will provide an indication of the
cause.
If instantiation of the workflow was successful, the workflow variables var_HYDRA_rectype,
var_HYDRA_ber, var_HYDRA_reknr and var_HYDRA_rekdetnr can be used to generate the
reference to the associated customer complaint detail directly.
REK-HWM_81.docx Version: 1.1.2411 Page 57 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

10  Workflow - Internal Complaint Detail
| 10.1  | Usage  |     |     |     |
| ----- | ------ | --- | --- | --- |
This is the description of the standard workflow process to be used for processing internal complaint
details.
The workflow is administered under the name HYDRA_complaintdetail_internal.
A workflow based on the process described here is instantiated when a complaint detail for a complaint of
the type "internal complaint" is created.
In the course of customizing, other workflow processes deviating from the standard could also
|     | be instantiated upon the creation of internal complaint details.  |     |     |     |
| --- | ----------------------------------------------------------------- | --- | --- | --- |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 58 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 10.2    | Process Chart  |     |     |     |
| ------- | -------------- | --- | --- | --- |
| 10.2.1  | Overview       |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 59 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
Identification of Addressee of Relevant Task
Upon activation of a process step for which a generic task has been defined, the addressee of this task is
identified on basis of the responsible person defined in the associated complaint detail at that time.
For this purpose, the type and ID are read first. The addressee is identified as follows according to the
type:
 Responsible person of type "external person":
A workflow user whose logon name corresponds with the ID of the external person is searched.
 Responsible person of type "person":
At first, a HYDRA user is searched who was assigned the ID of the person responsible for the
complaint detail in the "Person" field. Following this, a workflow user is searched whose logon
name corresponds with the HYDRA user found.
 Responsible persons of all other types:
Using the ID of the person responsible for the complaint detail, a group is searched in the
workflow management system.
Should problems occur regarding the determination of detail data, or should the searched workflow user
and/or the group not exist, the group "COMPLAINT_MANAGER" is used as addressee.
10.2.2 Process Step "Entry of complaint detail"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Have the complaint detail data been entered?".
10.2.3 Process Step "FMEA verification"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
REK-HWM_81.docx Version: 1.1.2411 Page 60 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

In accordance with the status of the checkbox "Is it a repetitive failure?", it is decided at the time of task
completion whether a reference complaint is to be searched from which the failure analysis and remedial
action may be adopted.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has FMEA been verified?".
| 10.2.4  | Ramification "Repetitive failure?"  |     |     |     |
| ------- | ----------------------------------- | --- | --- | --- |
In accordance with the selection in the checkbox "Is it a repetitive failure?" in the previous process step,
there is a ramification either to the verification of a reference complaint or to determining the failure
cause.
| 10.2.5  | Process Step "Determine failure causes"  |     |     |     |
| ------- | ---------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Have failure causes been determined?".

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 61 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 10.2.6  | Process Step "Planning of remedial action"  |     |     |     |
| ------- | ------------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has remedial action been determined?".
| 10.2.7  | Process Step "Reference complaint verification"  |     |     |     |
| ------- | ------------------------------------------------ | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The checkboxes "Accept failure analysis?" and "Accept remedial action?" will determine whether the
relevant detail information from the reference complaint is adopted or is to be determined separately at a
later point in time.
If the failure analysis cannot be adopted, remedial action must also be planned (regardless of the
checkbox "Adopt remedial action?"). The reason for this is that remedial action must match the failure
analysis. To ensure this, adoption of the remedial action is prevented if the failure analysis is not adopted.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 62 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the reference complaint been verified?".
10.2.8 Ramification "Accept failure analysis?"
In accordance with the selection in the checkbox "Adopt failure analysis?" in the process step "Reference
complaint verification", there is a ramification to adopting the failure analysis or to determining the failure
causes.
10.2.9 Process Step "Accept failure analysis"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the failure analysis been accepted?".
10.2.10 Ramification "Adopt remedial action?"
In accordance with the selection in the checkbox "Adopt remedial action?" in the process step "Reference
complaint verification", there is a ramification to adopting the remedial action of the reference complaint or
to planning remedial action.
10.2.11 Process Step "Adopt remedial action"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
REK-HWM_81.docx Version: 1.1.2411 Page 63 of 78

Workflow Complaint Management
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has remedial action been adopted?".
10.2.12 Process Step "Implementation of remedial action"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
In accordance with the status of the checkbox "Is the remedial action effective?", it is decided at the time
of task completion whether you return to determining the failure cause or whether processing is
continued.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has remedial action been implemented?".
10.2.13 Ramification "Action effective?"
In accordance with the selection in the checkbox "Is the remedial action effective?" in the previous
process step, there is either a ramification to determine the failure cause or completion of the complaint
detail is continued.
REK-HWM_81.docx Version: 1.1.2411 Page 64 of 78

Workflow Complaint Management
10.2.14 Process Step "Complete complaint detail"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the complaint detail been completed?".
10.2.15 Process Step "FMEA verification"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
In accordance with the status of the checkbox "Is FMEA still up-to-date?", it is decided whether you jump
to FMEA updating or whether the workflow is to be finished.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has FMEA been checked with respect to current data?".
10.2.16 Ramification "Is FMEA still up-to-date?"
In accordance with the selection in the checkbox "Is FMEA still up-to-date?" in the previous process step,
there is a ramification to updating FMEA or the workflow is finished.
REK-HWM_81.docx Version: 1.1.2411 Page 65 of 78

Workflow Complaint Management
10.2.17 Process Step "Update FMEA"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has FMEA been updated?".
10.2.18 Display of Workflow Information
The workflow information function will display all information which has been defined in workflow
processing and has an effect on ramifications in the workflow.
The meaning of the elements in this display is explained in the context of the relevant process steps
where this information is available for entry.
All information is made available as read-only information at this point.
REK-HWM_81.docx Version: 1.1.2411 Page 66 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 10.3  | Integration  |     |     |     |
| ----- | ------------ | --- | --- | --- |
Upon creation of an internal complaint details, an active entry of the object type WFM_CONFIG with
parameter  ComplaintDetail_ComplaintType_INTERN  is  searched  in  the  advanced  object
configuration of HYDRA.
The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used
(by default: HYDRA_complaintdetail_internal). The parameter "Object ID 2" of the entry found is
interpreted as the version of the process definition to be used.
These parameters can be used to create a new workflow event. Its key fields are assigned as follows:
|     | Key field  Content                                        |     |     |     |
| --- | --------------------------------------------------------- | --- | --- | --- |
|     | Module  COMPLAINTDETAIL                                   |     |     |     |
|     | Designation  Workflow for complaintdetail                 |     |     |     |
|     | Process alias name  ComplaintDetail_ComplaintType_INTERN  |     |     |     |
|     | Process name  Name of process definition                  |     |     |     |
(result of the previously described search)
|     | Process version  Version of process definition  |     |     |     |
| --- | ----------------------------------------------- | --- | --- | --- |
(result of the previously described search)
|     | ID 1  Internal number of internal complaint  |     |     |     |
| --- | -------------------------------------------- | --- | --- | --- |
|     | ID 2  Number of complaint detail             |     |     |     |
|     | ID 3  Empty                                  |     |     |     |
|     | ID 4  Empty                                  |     |     |     |
|     | ID 5  Empty                                  |     |     |     |
|     | Key 1  Data type of internal complaint       |     |     |     |
(default: REK)
|     | Key 2  Area of internal complaint  |     |     |     |
| --- | ---------------------------------- | --- | --- | --- |
|     | Key 3  Empty                       |     |     |     |
|     | Key 4  Empty                       |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 67 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

|     | Key 5  | Empty                                        |     |         |                            |
| --- | ------ | -------------------------------------------- | --- | ------- | -------------------------- |
|     | Data   | var_HYDRA_rectype=<Data type of complaint>|  |     |         |                            |
|     |        | var_HYDRA_ber=<Area of complaint>|           |     |         |                            |
|     |        | var_HYDRA_reknr=<Internal                    |     | number  | of  internal  complaint>|  |
var_HYDRA_rekdetnr=<Complaint detail number>|

Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name
of the process definition and its version. Should this fail, the process event will provide an indication of the
cause.
If  instantiation  of  the  workflow  was  successful,  the  workflow  variables  var_HYDRA_rectype,
var_HYDRA_ber,  var_HYDRA_reknr  and  var_HYDRA_rekdetnr  can  be  used  to  generate  the
reference to the associated internal complaint detail directly.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     |     | Page 68 of 78  |
| ---------------- | --- | ------------------ | --- | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

11  Workflow - Supplier Complaint Detail
| 11.1  | Usage  |     |     |     |
| ----- | ------ | --- | --- | --- |
This is the description of the standard workflow process to be used for processing supplier complaint
details.
The workflow is kept under the name HYDRA_complaintdetail_supplier.
A workflow based on the process described here is instantiated when a complaint detail for a complaint of
the type "supplier complaint" is created.
In the course of customizing, other workflow processes deviating from the standard could also
|     | be instantiated upon the creation of supplier complaint details.  |     |     |     |
| --- | ----------------------------------------------------------------- | --- | --- | --- |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 69 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

| 11.2    | Process Chart  |     |     |     |
| ------- | -------------- | --- | --- | --- |
| 11.2.1  | Overview       |     |     |     |

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 70 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
Identification of Addressee of Relevant Task
Upon activation of a process step for which a generic task has been defined, the addressee of this task is
identified on basis of the responsible person defined in the associated complaint detail at that time.
For this purpose, the type and ID are read first. The addressee is identified as follows according to the
type:
 Responsible person of type "external person":
A workflow user whose logon name corresponds with the ID of the external person is searched.
 Responsible person of type "person":
At first, a HYDRA user is searched who was assigned the ID of the person responsible for the
complaint detail in the "Person" field. Following this, a workflow user is searched whose logon
name corresponds with the HYDRA user found.
 Responsible persons of all other types:
Using the ID of the person responsible for the complaint detail, a group is searched in the
workflow management system.
Should problems occur regarding the determination of detail data, or should the searched workflow user
and/or the group not exist, the group "COMPLAINT_MANAGER" is used as addressee.
11.2.2 Process Step "Entry of complaint detail"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
REK-HWM_81.docx Version: 1.1.2411 Page 71 of 78

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

In accordance with the status of the checkbox "Are the items ok?", it is decided whether the actual
complaint reason has to be clarified or whether a relevant measure can be directly determined.
In the latter case, only, the checkboxes: "If not: are the items to be returned", "If not: are the items to be
reworked? and "If not: are the items to be scrapped?" determine the next processing step. In this regard,
the system will only jump to the first measure selected (according to the sequence specified).
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Have the items been checked?".
| 11.2.3  | Ramification "Are the items ok?"  |     |     |     |
| ------- | --------------------------------- | --- | --- | --- |
In accordance with the selection in the checkbox "Are the items ok?" in the previous process step, there
is a ramification either to clarify the complaint reason or to subsequent allocation to other processing
steps.
| 11.2.4  | Ramification "Are the items to be returned?"  |     |     |     |
| ------- | --------------------------------------------- | --- | --- | --- |
In accordance with the selection in the checkbox "If not: are the items to be returned?" in the process step
"Check items" and/or "Rework items", there is a ramification either to arrange for the items to be returned
or to subsequent allocation to other processing steps.
| 11.2.5  | Ramification "Internal rework?"  |     |     |     |
| ------- | -------------------------------- | --- | --- | --- |
In accordance with the selection in the checkbox "If not: are the items to be reworked?" in the process
step "Check items" and/or "Rework items", there is a ramification either to rework the items or to
subsequent allocation to other processing steps.
| 11.2.6  | Ramification "Are the items to be scrapped?"  |     |     |     |
| ------- | --------------------------------------------- | --- | --- | --- |
In accordance with the selection in the checkbox "If not: are the items to be scrapped?" in the process
step "Check items" and/or "Rework items", there is a ramification either to charge the supplier for the
parts or to clarify the course of action.
| 11.2.7  | Process step "Clarification of complaint reason"  |     |     |     |
| ------- | ------------------------------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 72 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

|     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | ------------------------------ | --- |

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the complaint reason been sorted out?".
| 11.2.8  | Process Step "Arrange return"  |     |     |     |
| ------- | ------------------------------ | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has return delivery been arranged?".
| 11.2.9  | Process Step "Rework items"  |     |     |     |
| ------- | ---------------------------- | --- | --- | --- |
Activating this process step will create a task. The recipient of the task is notified by e-mail.

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     | Page 73 of 78  |
| ---------------- | --- | ------------------ | --- | -------------- |

Workflow Complaint Management
In accordance with the status of the checkbox "Has rework been successful?", it is decided whether the
supplier has to be charged or whether a subsequent measure can be determined directly.
In the latter case, only, the checkboxes: "If not: are the items to be returned", "If not: are the items to be
reworked again? and "If not: are the items to be scrapped?" determine the next processing step. In this
regard, the system will only jump to the first measure selected (according to the sequence specified).
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has rework been performed?".
11.2.10 Ramification "Rework ok?"
In accordance with the selection in the checkbox "Has rework been successful?" in the previous process
step, there is a ramification either to charge the supplier or to the re-allocation of processing steps.
11.2.11 Process Step "Debit supplier's account"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
REK-HWM_81.docx Version: 1.1.2411 Page 74 of 78

Workflow Complaint Management
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the supplier's account been debited?".
11.2.12 Process Step "Clarification of course of action"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the further course of action been clarified?".
11.2.13 Process Step "Specify findings and complete"
Activating this process step will create a task. The recipient of the task is notified by e-mail.
REK-HWM_81.docx Version: 1.1.2411 Page 75 of 78

Workflow Complaint Management
The workflow is not continued until completion of this task has been documented by activating the
checkbox "Has the complaint detail been completed?".
11.2.14 Display of Workflow Information
The workflow information function will display all information which has been defined in workflow
processing and has an effect on ramifications in the workflow.
The meaning of the elements in this display is explained in the context of the relevant process steps
where this information is available for entry.
All information is made available as read-only information at this point.
11.3 Integration
Upon creation of a supplier complaint detail, an active entry of the object type WFM_CONFIG with
parameter ComplaintDetail_ComplaintType_LIEFERANT is searched in the advanced object
configuration of HYDRA.
The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used
(by default: HYDRA_complaintdetail_supplier). The parameter "Object ID 2" of the entry found is
interpreted as the version of the process definition to be used.
REK-HWM_81.docx Version: 1.1.2411 Page 76 of 78

|     |     |     |     | Workflow Complaint Management  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

These parameters can be used to create a new workflow event. Its key fields are assigned as follows:
|     | Key field           | Content                                  |     |     |     |
| --- | ------------------- | ---------------------------------------- | --- | --- | --- |
|     | Module              | COMPLAINTDETAIL                          |     |     |     |
|     | Designation         | Workflow for complaintdetail             |     |     |     |
|     | Process alias name  | ComplaintDetail_ComplaintType_LIEFERANT  |     |     |     |
|     | Process name        | Name of process definition               |     |     |     |
(result of the previously described search)
|     | Process version  | Version of process definition  |     |     |     |
| --- | ---------------- | ------------------------------ | --- | --- | --- |
(result of the previously described search)
ID 1
Internal number of supplier complaint
|     | ID 2   | Number of complaint detail       |     |     |     |
| --- | ------ | -------------------------------- | --- | --- | --- |
|     | ID 3   | Empty                            |     |     |     |
|     | ID 4   | Empty                            |     |     |     |
|     | ID 5   | Empty                            |     |     |     |
|     | Key 1  | Data type of supplier complaint  |     |     |     |
(default: REK)
|     | Key 2  | Area of supplier complaint  |     |     |     |
| --- | ------ | --------------------------- | --- | --- | --- |
Key 3
Empty
|     | Key 4  | Empty                                        |     |         |                            |
| --- | ------ | -------------------------------------------- | --- | ------- | -------------------------- |
|     | Key 5  | Empty                                        |     |         |                            |
|     | Data   | var_HYDRA_rectype=<Data type of complaint>|  |     |         |                            |
|     |        | var_HYDRA_ber=<Area of complaint>|           |     |         |                            |
|     |        | var_HYDRA_reknr=<Internal                    |     | number  | of  supplier  complaint>|  |
var_HYDRA_rekdetnr=<Complaint detail number>|

| REK-HWM_81.docx  |     | Version: 1.1.2411  |     |     | Page 77 of 78  |
| ---------------- | --- | ------------------ | --- | --- | -------------- |

Workflow Complaint Management
Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name
of the process definition and its version. Should this fail, the process event will provide an indication of the
cause.
If instantiation of the workflow was successful, the workflow variables var_HYDRA_rectype,
var_HYDRA_ber, var_HYDRA_reknr and var_HYDRA_rekdetnr can be used to generate the
reference to the associated supplier complaint detail directly.
REK-HWM_81.docx Version: 1.1.2411 Page 78 of 78
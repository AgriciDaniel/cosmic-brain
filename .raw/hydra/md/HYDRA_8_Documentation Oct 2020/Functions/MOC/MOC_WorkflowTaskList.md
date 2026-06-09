Workflow Management - Task List

1  Workflow Management - Task List

Overview

Menu

System administration – Workflow management - Task list

Transaction code

wftl

Function authorization  wftl

Usage

Using workflow management will generate tasks in a running process, which are to be handled by a user

and/or  a  specified  user.  The  task  list  shows  the  generated  tasks  for  a  user  or  a  group  assigned  to  the

user. In addition, the user can process, forward and/or adopt a task.

The definition of the workflow and the related task definition are created in a separate designer in MES

workflow management.

Selection criteria

The task list provides the following selection criteria:

User

By default, this field contains the user  who  is currently  logged on. To change the user in order to

display  other  tasks,  the  function  authorization  wftladmin  has  to  be  entered  for  the  user  currently

logged on.

Show finished tasks

If this box is checked, finished tasks are also displayed. Otherwise only active tasks are shown.

Show the user's tasks only

If  this  box  is  checked,  only  the  tasks  directly  assigned  to  the  user  are  displayed.  Otherwise  the

tasks assigned to a group to which the current user was assigned are also shown.

Created

Selection  by  the  creation  date  of  the  tasks. Warning:  correct  limitation  is  only  possible  if  both  the

From and the To date are set.

Done by

Selection  by  the  date  by  which  the  task  has  to  be  finished.  Warning:  correct  limitation  is  only

possible if both the From and the To date are set.

Description

Selection by the task description. Wildcard search using * is possible here.

MOC_WorkflowTaskList.docx

Version: 2.1.1362

Page 1 of 4

Workflow Management - Task List

Task List Detail Application (Table)

The tabular Task List detail application shows all tasks matching the selections made.

The  data  available  in  the  table  are  described  below.  These  data  might  not  be  shown  by  default.  In  this

case, they can be added using the column selection.

Process ID

Process ID of relevant task

Task ID

Task ID of relevant task

Work step

Name  of  work  step.  The  name  of  the  work  step  is  automatically  generated  from  the  process

element.

Role

The task may be assigned to a person, a group or a role. The individual assignments are displayed

as follows:

USER:   Task is assigned to a person

GROUP    Task is assigned to a group

ROLE:    Task is assigned to a role

The "Task description" of the generic task is displayed here.

Title

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

MOC_WorkflowTaskList.docx

Version: 2.1.1362

Page 2 of 4

Workflow Management - Task List

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

MOC_WorkflowTaskList.docx

Version: 2.1.1362

Page 3 of 4

Workflow Management - Task List

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

MOC_WorkflowTaskList.docx

Version: 2.1.1362

Page 4 of 4


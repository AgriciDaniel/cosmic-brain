Detailed planning and assignment functions

1  Detailed planning and assignment functions

Purpose

Use the detailed planning and assignment functions to:

  plan operations for a workplace and to reserve the workplace's capacities

  deallocate operations from a workplace back to a group and as a result, to free up capacities at

that workplace



identify operations as fixed (fix a date and a workplace for the OP) so that they are not replanned

by automatic planning functions.

To do this, you can typically plan, replan or deallocate operations using the drag & drop function.

This document outlines the planning functions provided in the Graphic planning.

Integration

If  you  schedule  an  operation  for  a  workplace,  you  define  the  processing  sequence  in  production.  The

sequencing list of the shop floor terminal shows this processing sequence.

Requirements

Before  you  start  the  detailed  planning,  you  should  define  and  create  relevant  planning  profiles  that

integrate aspects of organization, planning procedure and competences.

1.1  Manual scheduling using drag & drop

If  you  use  the  Shop  Floor  Scheduling,  operations  in  the  ERP  system  are  generally  planned  for  a

(capacity) group.

After  individual  capacities  (workplaces)  have  been  opened  in  the  planning  board,  you  can  now  drag

operations from the tabular or graphic pool of groups and plan them onto the workplace if the workplace

is not locked. Left-click an operation and drag it to the required location in the graphic planning board.

If  you  enable  the  extension  graplocking,  you  can  only  plan  an  operation  for  a  workplace  if  the

workplace is not locked.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 1 of 20

Detailed planning and assignment functions

1.2  Resolving conflicts during planning and replanning

When you plan or replan operations in the Gantt using the drag & drop function, the OP is planned on the

date the mouse pointer is on when you "drop" the operation. After dropping the OP, the checks activated

in the settings are run for the operation.

  Checking basic dates of operation

The system checks if the planned start lies ahead of the earliest start of the operation or if the

planned end lies past the latest end of the operation.

  Checking preceding/ subsequent relationships

The system checks if the operation overlaps its preceding or its subsequent operation. Any overlaps

are accepted.

The application can only check preceding and subsequent operations if they are included in

the current planning profile.

  Checking the used capacity

The system checks if planning results in any capacity overloads. The system checks the workplace

where the operation has been/ is being planned and the production resources and tools assigned to

the operation, provided that they have been defined as resources in the system (depending on

license).

  Checking the capacity of required staff (depending on license)

  Checking the required staff's qualifications (depending on license)

  Checking material availability (depending on license)

The checks activated in the settings are processed in sequence. If a user action (planning/ replanning) is

not allowed following one of the above-mentioned consistency checks, then the action is canceled. The

remaining  checks  are  not  performed.  The  conflict  is  displayed  in  a  pop-up  window.  The  planner  can

decide which steps can be taken to resolve the conflict:

If a validation check is deactivated, resulting conflicts are not displayed, i.e. a possible conflict is implicitly

confirmed. But the conflict list still shows the conflict.

Plan / move beyond time frame

The conflict list indicates:



If planning an operation for a workplace or moving it causes the planned start of the operation to be

ahead of the earliest start of the operation or ahead of the order's basic start date

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 2 of 20

Detailed planning and assignment functions

or



if planning an operation for a workplace or moving it causes the planned end of the operation to lie

beyond the latest end of the operation or beyond the order's basic end date

when the operation is "dropped" (for further information on the fields: see below ):



Operation-related dates, e.g. earliest start time (EST), latest start time (LST), earliest end time

(EET)  and  latest  end  time  (LET)  must  either  be  transferred  from  the  ERP  system  or,

alternatively, can be determined during the lead time scheduling process.

Possible reactions

Plan anyway

The operation is planned nonetheless.

Cancel

The planning process is canceled.

Violation of relationships

What might  also  be  the  case  is  that  the  operation  has  a  preceding  and/or  a  subsequent  operation  with

planning  dates  that  are  not  consistent  with  those  of  the  currently  planned  operation.  A  dialog  opens  to

notify you if the required date overlaps those dates (for further information on the fields: see below:

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 3 of 20

Detailed planning and assignment functions

The  list  shows  the  operation  coinciding  with  the  currently  planned  operation.  The  list  also  shows  the

planned start, planned end, and the workplace of the already planned operation. The text displayed in the

column Error describes the conflict as seen from the already planned operation.

Possible reactions

Plan anyway

The operation is planned nonetheless.

Move predecessor/ successor

An  attempt  is  made  to  move  the  already  planned

predecessor  or  successor  so  that  there  is  no  more

conflict between the two adjacent operations.

Move  the  subsequent  planning

Please  note:  This  function  only

integrates  the

scenario.

machine assignment. You can use this function for a

maximum  of  150  operations  that  are  planned  for  a

workplace.

Cancel

The planning process is canceled.

Checking if resources are overloaded (overallocated)

When an  operation  is planned, the system checks if this  will  overload resources. On the  one hand, the

workplace where the operation is planned is a resource. On the other, the system also checks secondary

resources that are needed for production. Secondary resources are defined for the operation in the list of

production resources and tools and identified in the WRM module as relevant to assignment.

This dialog indicates if a conflict occurs (for further information on the fields: see below):

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 4 of 20

Detailed planning and assignment functions

The  list  shows  both  operations  (the  planned  one  and  the  one  to  be  planned).  The  list  also  shows  the

planned start, planned end and the resource that is assigned twice.

Possible reactions:

Plan anyway

The  operation  is  planned  for  this  date  nonetheless;

as a result, the resource is assigned multiple times.

Search for free gap

The operation is planned in the first suitable gap.

Move  the  subsequent  planning

Please  note:  This  function  only

integrates  the

scenario.

Cancel

machine assignment.

The planning process is canceled.

Checking staff availability

This check is only available if you enable the extension graptcpq.

The  qualifications  required  by  the  operation  are  compared  with  the  assigned  staff's  qualifications.  A

conflict message "Staff shortage (qualification)" pops up if a required qualification cannot be met.

If  qualifications  are  basically  met,  i.e.  employees  with  the  required  qualification  are  available  at  the

workplace where the operation is planned, the system now verifies the number of required qualifications.

If the required number is not available, the conflict message "Staff shortage (capacity)" appears.

Possible reactions

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 5 of 20

Detailed planning and assignment functions

Plan anyway

The operation is planned nonetheless.

Cancel

The planning process is canceled.

You can find further information about how to check if personnel is available here.

Check material availability

This  check  is  only  available  if  you  enable  the  extension  grapvemvp  and  set  the  option  "check

material availability" in the settings.

The material availability check informs you if sufficient material is available to produce the operation. This

check makes sure that sufficient material is always available for production.

When  you  plan  an  operation  for  a  workplace,  a  conflict  dialog  appears  if  the  system  identifies  that  the

material required for the operation is not available in sufficient quantities:

Possible reactions

Plan anyway

The operation is planned nonetheless.

Cancel

The planning process is canceled.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 6 of 20

Detailed planning and assignment functions

Material  availability  is  only  checked  if  the  detail  view  planned  inventory  levels  is  shown.  The

system only checks material with a valid ATP inspection group assignment.

The system only checks if material is available if planning is performed manually.

Information about dialog fields:

Operation: MES order number of the operation

Article: is taken over from the operation.

OP name: is taken over from the operation.

Workplace, name: workplace where an attempt is made to plan the operation.

Planned start: date when an attempt is made to plan the operation.

Planned  end:  calculated  by  the  Shop  Floor  Scheduling  and  based  on  planned  start  +  additional

setup time + setup time + remaining run time + retooling time.

Earliest  start  time  (EST),  latest  end  time  (LET):  these  fields  relating  to  operations  must  either  be

transferred  from  the  ERP  system  or,  alternatively,  can  be  determined  during  the  lead  time

scheduling process.

Basic start date/basic end date: basic dates relating to the order (header) transferred from the ERP

system.

1.3  Fixing operations

Fix operation

Use this function to fix the selected operation(s) and identify these OPs as fixed. The settings specify how

fixed operations are visualized.

Already fixed operations remain fixed. If you attempt to fix already fixed operations, the system does not

interpret this as a changed planning.

You cannot fix operations that are included in the pool of groups.

You can neither fix nor unfix logged on operations.

You cannot deallocate or replan fixed operations to a different workplace.

Unfix operation

Use this function to unfix the selected operation(s) and to remove the visual identification.

Operations that are not fixed remain so. If you attempt to unfix operations that are not fixed, the system

does not interpret this as a changed planning.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 7 of 20

Detailed planning and assignment functions

You cannot unfix logged on operations (since you cannot fix them either).

If you enable the extension graplocking and the operation is planned on a locked workplace, you

cannot fix/unfix the operation.

1.4  Close gaps

You can use this function to close any gaps between individual operations of a workplace.

All of the planned operations to the right of the planning lead time are shifted to the left to join up with the

immediately preceding operation at the workplace, while maintaining the chronological order of operations

defined  for  the  workplace.  The  workplace  must  be  available.  You  can  only  plan  operations  where  the

workplaces are available as per the shift calendar.

The  application  derives  the  sequence  for  operations  located  on  the  "now"  line  from  the  planned  (start)

dates  stored  in  the  database.  The  application  integrates  these  dates  when  closing  gaps  so  that  the

originally  planned  sequence  is  maintained.  Exception:  If  the  planned  dates  of  these  delayed  operations

are identical in the database (e.g. if the OPs are on the "now" line and you save the planning), then the

application  can  no  longer  identify  the  original  sequence.  In  this  case,  the  sequence,  i.e.  which  OP  is

considered first, is "random" (not prioritized).

Operations are moved up to the planning lead time at most.

Fixed operations are not moved.

The system integrates relationships with preceding operations.

The planning can still include gaps that might be closed even though you used the  close gaps

function. This is the case if more than nine operations are planned and connected via an order

network.

This can still result in gaps.

If you enable the extension graplocking, the function is not supported if you want to execute the

function for a locked workplace.

1.5  Replan an operation for another group

HYDRA differentiates between

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 8 of 20

Detailed planning and assignment functions

  Control

understood  as  including  the  actual  detailed  planning  tasks  in  Shop  Floor  Scheduling,  such  as

allocation to workplaces/ machines, resource checking, sequencing etc.

and

  Planning

understood  as  intervening  in  the  structure  of  the  order/  work  plan.  These  tasks  are  generally

understood as ERP functions.

You  can  replan  an  operation  onto  another  capacity  group  or  onto  a  workplace  of  another  group  in  the

graphic planning board, of course, but this is not understood to be a planning function in the sense of the

above definition. Therefore, please note the following:

  Process times are not recalculated during replanning.

  Assigned resources (components, production resources and tools) remain assigned.

  The application does not check if replanning makes sense (e.g. you replan a drilling operation for a

"milling" group).

If you enable the extension graplocking, the function is not supported if you want to execute the

function for a locked workplace or a locked group.

1.6  Deallocate operation

If  you  deallocate  (unplan)  an  operation,  the  application  returns  the  operation  to  the  pool  of  groups.

Depending on the option "Show OPs in the pool of groups of the Gantt",  you need to take the following

steps:

The option "Show OPs in the pool of groups of the Gantt" is set

To deallocate (unplan) an operation, select the required operation in the planning board and then drag

and drop it, i.e. "move" it back into the graphic pool of groups in the planning board.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 9 of 20

Detailed planning and assignment functions

The  operation  is  displayed  at  the  scheduled  start  time  in  the  pool  of  groups  of  the  planning  board  (not

necessarily the same place where you "dropped" the operation).

The option "Show OPs in the pool of groups of the Gantt" is not set

To deallocate (unplan) an operation, select the required operation in the planning board and move (drag

and drop) it into the graphic pool of groups in the planning board (not into the tabular pool of groups).

When  you  save  planning,  the  system  sets  the  option  "planned"  to  "group"  for  deallocated

operations. The workplace where the operation had been previously planned is NOT deleted.

If you enable the extension graplocking, you can only deallocate (unplan) an operation if the

following conditions are met:

- the workplace where the OP is removed must not be locked

- the group where the OP is added must not be locked.

1.7  Automatic assignment in graphic planning

Function authorization

grapt.autopl

If you click the button

, you can cause the system to make an automatic assignment. If you use the

function, you can differentiate between whether:

  only unplanned operations should be planned.

If you use the option "Plan OPs from group level only", you plan operations that are currently not

planned.

  only selected operations should be planned.

This option is only available if you enable the extension graptsbap.

If  you  enable  the  option  "plan  selected  operations  only",  the  planning  function  only  plans  those

operations you have selected in the pool of groups. This means that any operations already planned

remain so.

You can select operations either in the tabular pool of groups or the graphic pool of groups. You can

use the Ctrl key to select single operations.

The  automatic  planning  function  does  not  plan  operations  that  cannot  be  planned  due  to  existing

conflicts.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 10 of 20

Detailed planning and assignment functions

  everything should be replanned.

If you select the option "Entirely replan all OPs", the application deallocates (unplans) all operations

that are not fixed, and then runs the planning algorithm.

The entire planning is considered with either action.

The  planning  algorithm  utilizes  the  planning  strategy  (priority  rule)  defined  in  the  currently  selected

planning variant and the selected capacities.

After  automatic  assignment  has  been  completed,  the  system  shows  the  results  of  this  automatic

assignment.  The  system  shows  how  many  OPs  have  been  planned.  A  list  includes  the  operations  that

had conflicts, and could therefore not be planned.

If the option  Fix  operations in planning  time fence after automatic  assignment is set  in  the  settings, the

system  automatically  fixes  operations  the  planned  start  date  of  which  is  within  the  planning  time  fence

after automatic assignment.

If you enable the extension graplocking, you can only execute the function if all workplaces and

groups pertaining to the planning profile are not locked.

1.8  One-step planning

Function authorization

grapt.sbsp

Use the button "plan operation"

 to carry out "one-step planning".

Once  you've  clicked  this  button,  the  next  matching  operation  included  in  the  pool  of  groups  is  selected

and  planned.  This  process  depends  on  the  rules  specified  in  the  planning  variant  you  selected  while

requesting data. You can reproduce automatic planning step by step if you click the button multiple times.

The  operation  that  is  planned  at  last  is  selected  in  the  Gantt  chart.  Consequently,  you  can  simply

deallocate (context menu) or replan the OP to another position.

If you clicked the button, but no operation could be planned, you are informed about it. A pop-up window

appears indicating "No further operations can be planned".

You have to enable the extension grapt.sbsp in order to use the function.

If you enable the extension graplocking, you can only execute the function if all workplaces and

groups pertaining to the planning profile are not locked.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 11 of 20

Detailed planning and assignment functions

1.9

Individual shift times

Define individual shift times to specify for a workplace and a certain period (date/time from/to) whether the

time considered is working time or non-working time.

The configuration is described here.

Create individual shift time via context menu of workplace

You  can  right  click  a  workplace  or  a  group  in  the  graphic  planning  (Gantt  chart)  to  open  the  dialog  for

creating individual shift times. Once  you have entered the  data, the  additional shift times are integrated

directly in the planning board.

The suggested period is preset as:

From:

"now" (the point in time when you called this function)

To:

the point in time currently visible on the far right in the planning board.

Depending on the type of period, i.e. working time or not, the color of the period is either white or yellow.

You can still change colors.

Using the mouse to select a period

Position the mouse in the planning board chart and right click to activate the "selection mode".

Now  position  the  mouse  over  the  workplace  for  which  you  would  like  to  define  the  individual  shift  time;

continue to keep the mouse button pressed and move the mouse to the right until you reach the required

time domain, then release the mouse button.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 12 of 20

Detailed planning and assignment functions

A window will then open where you can create individual shift times. The selected time domain is preset

by default.

type  of  period,  i.e.  working  time  or  not,  the  color  of  the  period  is  either  white  or  yellow.  You  can  still

change colors. You must check the "active" checkbox so that the entry will be used in planning.

Depending  on

the

The  workplace  assigned  by  default  is  always  the  last  workplace  entered,  even  if  the  selected

time  domain  was  dragged  across  several  workplaces.  However,  you  can  still  select  more

workplaces from the list manually.

The selection mode is reset after each action.

You should not use the color turquoise if you enable the extension graptcpq. As this extension

uses  turquoise  to  show  personnel  availability.  You  can  find  further  information  about  how  to

check if personnel is available here.

Once you've clicked OK, data is verified and transferred to the planning board.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 13 of 20

Detailed planning and assignment functions

You can add only one entry for each period of a workplace. When you attempt to add an entry and the

system  detects  that  an  entry  already  exists  for  this  period,  you  can  either  delete  the  previous  entry  or

cancel your current entry:

times exist, this dialog opens for each existing shift time, and you can decide whether or not to delete the

If  multiple  individual  shift

entries.

Individual shift times are not committed to the database until planning has been saved.

These  additional  shift  times  are  only  used  in  Shop  Floor  Scheduling,  not  as  part  of  data

collection.

1.10  Create and display notes about the operation

You can view, enter and delete notes for the selected operation.

Function authorization

edopnote*

General display

A detail application shows the operation notes. Click the corresponding toolbar icon to enable the detail

application.

The  table  includes  the  following  columns:  Short  text,  modified  by,  date,  time,  display  at  terminal,  MES

order number. The memo text is displayed to the right of that. Between table and memo is a splitter that is

saved.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 14 of 20

If the detail application is visible and  you click one or more OP bars, the detail application contents are

Detailed planning and assignment functions

updated.

Add new notes

Proceed as follows to add a new note:

  use the context menu of the operation bar

  use the corresponding button in the "Operation notes" index tab of the toolbar; the index tab is active/

visible if you click the detail application "Notes".

You must specify a short text and a long text in the input dialog.

The detail application "Notes" shows the note, once you have saved the note by clicking . The operation

bar now shows a respective icon indicating that a note is available.

Edit a note

You can edit an existing note. To do this, take the following steps:



If the index tab "Operation notes" is not visible in the toolbar, click on the detail application "Notes".

  Select the note you would like to edit in the detail application.

  Click the button "Edit note" to open a dialog displaying existing information.

  After modifying the data, click  to confirm your entry.

Delete a note

Edit a note

You can delete an existing note. To do this, take the following steps:

  Click on the detail application "Notes" if the index tab "Operation notes" is not visible in the toolbar.

  Select the note you would like to delete in the detail application.

  Click the button "Delete note". Confirm the confirmation prompt and the note will be deleted.

If no other notes are assigned to the operation, the icon disappears.

Visualization with the operation bar

The  icon  is  shown  at  the  front  of  the  bar.  The  icon  is  displayed  for  operations  that  are  included  in  the

graphic pool of groups or in the Gantt chart

.

1.11  Generate campaign

Function authorization

grap.cpnbuild

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 15 of 20

Detailed planning and assignment functions

This document describes campaign production.

1.12  Overlapping

You  commonly  define  dependencies  between  operations  (OP)  as  finish-to-start  relationships.  When

planning  operations,  use  the  finish-to-start  relationship  to  make  sure  that  the  successor  OP  cannot  be

started  (change  from  status  prepared  to  status  running)  until  the  predecessor  OP  is  finished  100  %

(status finished).

You can change existing dependencies using the "overlapping" function. Use the  overlapping function to

plan the successor OP even if the predecessor OP has not yet been finished 100 % and is still in status

running.

This document illustrates how to configure the overlapping function between operations.

1.13  Locking mechanism if used by multiple users

If multiple users use the graphic planning application simultaneously, this function makes sure you cannot

change planning if another user is currently making changes to the planning.

The function described in this section is only available if you enable the extension graplocking.

Concept

The locking mechanism checks if objects are locked:

- at cyclic intervals and

- every time before a planning activity is performed

Upon requesting data, the system checks which objects, i.e. workplaces or groups are currently locked by

other  users.  These  objects  are  disabled  and  identified  as  locked  in  the  planning  board.  Disabling  such

objects ensures that planning cannot be changed for these disabled objects.

But you can still change planning for all objects that are not locked/disabled. At cyclic intervals (by default

120 seconds) the system sends a new synchronization request in the background asking for current locks

and disabling further objects, if necessary.

If another user unlocks an object, the current user cannot automatically access this object. The

user first has to request data.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 16 of 20

Detailed planning and assignment functions

If you plan something, the system verifies if there are locked objects. All involved objects are  checked. If

you want to plan an operation from the pool of groups on a workplace, the system checks both, i.e. if the

pool of groups and the  workplace are locked. If the required  objects are  not  locked, they  will be  locked

and planning is continued.

If,  however,  the  objects  are  already  locked,  planning  is  rejected  and  the  objects  involved  are  disabled.

This  prevents  you  from  making  changes  to  planning.  You  can  only  change  objects  and  planning,  once

you've requested data.

But  requesting  data  does  not  necessarily  unlock  objects,  as  objects  remain  locked  until  the

other user unlocks the objects, e.g. by saving the planning.

Only the user locking an object can actually use this object.

Objects able to be locked

These objects can be locked in graphic planning:



Individual workplaces or their pool of workplaces

Automatically locked, once an attempt is made to plan the workplace.

  Groups or pool of groups

Automatically  locked,  once  planning  affects  the  pool  of  groups.  Example:  you  want  to  plan  an

operation from the pool of groups or you want to deallocate an operation and return it to the pool of

groups.

A pale red (

) background color indicates objects locked by another user. A light green (

) background

color  indicates  objects  locked  by  yourself.  The  color  is  shown  for  the  following  columns  in  the  list  of

workplaces (to the left of the Gantt chart):

  Short name

  Designation (name)

  Group

  Performance level

Request data

If you made changes and locked workplaces or groups, the following confirmation prompt appears, once

you request data: "Do you want to release the locked workplaces and workplace groups?"

Answer the prompt by choosing "yes" or "no":





"Yes": all locks are removed.

"No": the locks remain active; you can still change your locked objects.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 17 of 20

Detailed planning and assignment functions

Existing  locks  are  removed  automatically  after  changing  the  planning  profile  and  refreshing

data.

Save planning

If you made changes and locked workplaces or groups, the following confirmation prompt appears, once

you  save  planning  (by  clicking  the  option  "save  planning"):  "Do  you  want  to  release  locked  workplaces

and workplace groups?"

Answer the prompt by choosing "yes" or "no":





"Yes": all locks are removed.

"No": the locks remain active; you can still change your locked objects.

Load planning

You can only load a stored planning if the included workplaces and workplace groups are not locked or if

you locked these objects.

"Lock all" button

Click the button "lock all" in the "general" tab of the toolbar to lock all displayed workplaces and workplace

groups at once.

The button

 is no longer shown if the locking mechanism is disabled.

This button does not require a special function authorization.

Automatic assignment

When  you  call  up  the  function  "automatic  assignment",  the  system  checks  if  all  objects  (groups,

workplaces)  existing  in  the  current  planning  profile  are  available  and  locks  them.  In  case  at  least  one

object  is  already  locked  by  another  user,  the  system  rejects  automatic  assignment  and  issues  the

following  message:  "automatic  assignment  can  only  be  used  if  all  displayed  workplaces  and  workplace

groups are not locked by another user."

One-step planning ("plan operation")

When you call up the function "plan operation" (button

), the system checks if all objects existing in the

current planning profile are available and locks them. You cannot use the function if at least one object is

locked by another user.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 18 of 20

Detailed planning and assignment functions

Simulation mode

The  locking  mechanism  is  not  enabled,  if  you  use  simulation  mode.  In  simulation  mode  the  system

neither checks if objects are locked nor locks objects.

Existing locks are removed automatically when you switch to simulation mode.

Exit application

Existing locks are automatically removed, when you exit graphic planning.

Unlock manually

As  a  general  rule,  all  of  your  locks  are  removed  when  you  exit  the  client.  You  can  use  the  application

"locked data records" to unlock specific objects or to unlock all objects. This function is useful, in case you

could not save your changes e.g. due to system failure.

Disable the locking mechanism

If the authorization key graplocking is enabled, you can use the following INI configuration to disable the

locking mechanism:

Name: HLS

MOC user: 0

Section: GRAP

Key: LOCKING

Value: FALSE

Active: 

The button

 is no longer shown if the locking mechanism is disabled.

Limits of locking mechanism

Even though, the locking mechanism has been implemented, it might be the case that the "last

user's changes take priority", for example, if the synchronization interval is too large and short-

term planning activities are required. The following example illustrates this issue:

There  are  two  workplaces  1  and  2  and  two  planners  A  and  B.  Both  planners  initially  loaded  the  same

data. Operation 1 and 2 are planned on workplace 1; operation 3 is planned on workplace 2.

1.  Both planners load data at the time t1.
2.  Planner A changes the order of operation 1 and operation 2 on workplace 1. Consequently,

workplace 1 is locked.

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 19 of 20

Detailed planning and assignment functions

3.  Planner B wants to replan operation 2 from workplace 1 to workplace 2. But replanning is rejected as

planner A still locks workplace 1. Workplace 1 is locked for planner B.

4.  Planner A saves the planning; the lock is removed.
5.  Planner B requests data and is informed that workplace 1 is no longer locked.
6.  Planner B replans operation 1 from workplace 1 to workplace 2 and therefore locks workplace 1 and

2.

7.  Planner B saves the planning; the locks are removed.
8.  Planner A did not notice that. The next synchronization run will only take place at a later time t2. In
the meantime planner A had not made changes to the plan and, therefore, was not informed that
workplace 1 and 2 were locked.

9.  Planner A saves the plan once more and overwrites the changes made by planner B.

Please  bear  in  mind  that  other  user's  plans  can  be  overwritten  if  you  replan  and  save  your  planning

between two synchronization runs.

If  you  reduce  the  interval  between  two  synchronization  runs,  you  can  minimize  the  risk  of  overwriting

data.

The default interval for checking if objects are locked is 120 seconds. Use the following  INI configuration

to change this interval:

Name: HLS

MOC user: 0

Section: GRAP

Key: LOCKING_INTERVAL

Value (e.g.): 60

MOC_SchedulingAndAllocation.docx

Version: 1.11.23218

Page 20 of 20


Event Maintenance

1  Event Maintenance

Overview

Drei kleine textuelle Korrekturen/Änderungen.

Menu

Data collection  Data correction  Event maintenance

Transaction code

evli

Function authorization

evli

Purpose

You  can  use  the  Event  maintenance  to  edit  and  recalculate  the  posting  events  provided  by  the  data

collection. You can also delete events or create new events.

Integration

The  user  can  use  the  maintenance  function  to  subsequently  change  events.  The  system  can  then

perform a validation check and recalculate the events. The resulting postings can be integrated (selected)

in the different evaluations or uploaded to the higher-level ERP system.

The  special  feature  of  the  event  maintenance,  compared  to  the  editing  functions  for  postings,  is  that  it

includes  a  recalculation  function.  The  changed  data  (events)  is  then  used  to  generate  new  postings.

When data is recalculated, the system performs the same validation checks as for postings of the online

data collection. This procedure ensures consistent data.

Requirements

The  event  maintenance  provided  with  this  application  requires  activation.  If  the  activation  is  not

performed,  the  following  message  is  shown  when  the  application  is  called:  "The  event-related  BDE

maintenance has been disabled in the basic settings. Modifications cannot be saved." Without activation,

the events can only be selected and displayed, but you cannot add new events or edit or delete existing

events.

By default, the event maintenance is not active.

Only activate the event maintenance if the relevant requirements or the restrictions listed in

the following have been checked.

MOC_Eventlist.docx

Version: 1.7.19069

Page 1 of 15

Event Maintenance

Restrictions

Some  posting  functions  are  pure  data  collection  functions.  The  collected  data  cannot  be  edited  or

recalculated in the event maintenance. You must check for each function whether the event maintenance

can be used. Find a list of these functions in the following.

Data from data collection that cannot be edited

  Comments  entered  in  different  posting  dialogs  on  the  shop  floor  terminal  cannot  be  displayed  or

edited in the event maintenance.

  Serial  numbers  collected  for  OPs  that  require  serial  numbers  cannot  be  displayed  or  edited  in  the

event maintenance.

  The  system  can  collect  quantities  in  alternative  units.  In  the  event  maintenance,  you  can  only  edit

quantities in primary quantity unit.

  You can post manual activities in the system or calculate them using formulas. You cannot use the

event maintenance to show or edit activities.

  Posting with OP reference or confirmation/upload number:   In  the  event  maintenance,  you  require

the MES order number for editing.

  Changes  of  the  production  lock  are  logged  as  events.  You  can  display  these  events  in  the  event

maintenance, but you cannot edit them.

  User fields that were integrated in posting dialogs as part of a customization (e.g. OP logoff)  cannot

be displayed or edited in the event maintenance.

  Automatic  posting  processes  and  their  configurations  are  not  used  and  recalculated  in  the  event

maintenance (e.g. finish/interrupt or automatically log off a preceding operation when target quantity

is reached).

  Events that are based on resource-related postings (WRM or DNC) cannot be displayed or edited in

the event maintenance.

  The "Automatic OP change" option in tab BDE of the HR master data is only integrated during online

processing; it is not integrated during recalculation in the event maintenance.

  The option "OP change with status change" in the status assignment of machines/workplaces is only

integrated during online processing; it is not integrated during recalculation in the event maintenance.

  Postings of personnel or machine waiting periods are not displayed in the event maintenance.

  The recalculation in the event maintenance does not trigger escalations.

  Optional  data  that  has  additionally  been  recorded  in  the  "Change  machine  status"  dialog  is  not

displayed  in  the  editing  dialog  and  cannot  be  changed.  This  additional  data  can  be  the  "expected

duration", a comment or any additional data for escalation management.

Merged operations

An  assignment  of  a  new  OP  to  a  merged  operation  is  NOT  supported  in  the  event  maintenance.  Only

data for already posted merged operations can be modified.

MOC_Eventlist.docx

Version: 1.7.19069

Page 2 of 15

Event Maintenance

If data is recorded for a merged operation using the "Merged operation per machine" function, this data

CANNOT be edited in the event maintenance.

A  recalculation  is  no  longer  possible  for  merged  operations  that  were  generated  on  the  MOC  if  the

operations contained in the MOP were changed.

PZE controls ADE

The  "PZE  controls  ADE“  setup  setting  can  lead  to  scenarios  in  the  event  maintenance  where  the

personnel logon  event is displayed before the actual order logon, because the logon is then rounded to

the PZE time.

If inconsistent postings exist in the event maintenance  – because a personnel logon is displayed before

the actual order logon – then the postings must be corrected. The personnel logon time must be changed

to the time of the order logon.

Interface to SAP

The event maintenance cannot be used in combination with the PP-PDC interface, because the standard

SAP system does not accept cancellations from external systems.

MDE shift change events

If these events are changed, it is possible that shifts are not calculated completely or that gaps result. For

this reason, generally do not edit shift change events.

A  recalculation  of  the  entire  shift  is  not  guaranteed  here  because  the  relevant  events  that  identify  the

times of start and end of shift might no longer be available at the relevant point in time.

Shift change events are events triggering status changes "M_MST“

end of shift dialog A_AUN

beginning of shift  dialog A_AAN

Shift end events (event M_MST with dialog A_AUN) may only include the status 20000 "no shift“.

Editing of finished operations

Operations  that  have  already  been  finished  can  be  edited  in  the  event  maintenance  dialog.  Note:  The

status of a finished operation does not change. The status is also not changed if an OP logoff is deleted

or if the OP logoff is changed into an interruption.

If you want to reactivate an operation that has already been finished, you must always use the function

"Reactivate operation".

MOC_Eventlist.docx

Version: 1.7.19069

Page 3 of 15

Event Maintenance

Material and Production Logistics (MPL)

Some operations require batch management. The following restrictions apply for these operations in the

event maintenance:

  Only MPL machines with batch processing can be edited. Machines of the types roll cutting, parallel

output batches, throughput batch mode, etc. are not supported.

  The  event  maintenance  supports  input  batch  postings  for  an  operation  to  a  limited  extent  only.

Postings  that  are  not  included  in  the  OP  posting  are  not  integrated.  Consequently,  consumption

postings for input batches are not integrated.



It is not allowed to change output batch numbers or to delete events CA_AN/CA_AB.

  Using the event maintenance, you cannot display or change batch attributes.

  The existing batch tracing is not changed subsequently by the maintenance function.

Event modified by

You  can  store  a  user  ID  for  the  event.  For  technical  reasons,  the  user  ID  has  a  maximum  of  9  digits

(column "Modified by"). This means: If you enter a user ID with 10 digits, the last digit is cut when the user

is transferred to the "Modified by" column in the event maintenance.

Editing of the partitioning

If  a  machine  partitioning  event  (M_TLG)  is  edited,  only  the  shifts  included  in  the  recalculation  are

integrated.

If  an  order  is  produced  in  several  shifts  (automatic  re-logon),  all  events  must  be  recalculated  that  are

affected by this change of partitioning event.

Respect the following process for an event that includes a change of the partitioning:



If partitioning is changed, the entire period for which this modification applies needs to be selected,

i.e. until the operation is interrupted or finished manually.

  When changes are made, the relevant partitioning event must be changed

AND

if the operation was automatically produced during several shifts, the subsequent manual interrupt or

finish posting of the order must also be changed.

If you manually interrupt or finish the order, it is enough to save the data without change.

MOC_Eventlist.docx

Version: 1.7.19069

Page 4 of 15

Event Maintenance

  When data is then recalculated, all data between the change of partitioning and the manual interrupt

or finish posting is automatically used for this recalculation.

Note:

The events that must be recalculated are not selected automatically, because the change of partitioning

can affect several shifts; also shifts that are no longer included in the selection period.

Selection criteria

The application provides the following selection criteria:

Workplace/machine

All data relating to the selected workplace is shown.

MES order number

The result list shows all events of workplaces where the order was logged on in the selected period

of time. You can also use wildcards.

Person … to …

The result list shows all events of the workplaces where the person (persons) was (were) logged on

in the selected period of time. You cannot use wildcards.

Date … to …

All events that are included in the selected period of time are displayed.

Note: This application only selects and edits data that is included in the online data area.

Parallel staff logins

The option "Parallel staff logins" selects the data of all workplaces where a person was logged on.

Set  this  option  if  you  want  to  edit  data  of  workplaces  where  persons  are  logged  on  with  multiple

machine operation.

For more information, see here.

Refresh data

Use this option to control if the new data is displayed in the event maintenance after recalculation

(with  large  amounts  of  data,  this  can  have  a  negative  effect  on  performance).  Note:  If  an  error

occurred during recalculation, the data freezes in the display.

If  more  than  1000  events  are  selected  according  to  the  data  selection,  the  following  error

message  is  displayed:  "The  requested  amount  of  data  is  too  large.    Please  restrict  the  data

using selection criteria."

When  data  is  requested,  all  selection  fields  are  disabled  except  the  checkbox  "Refresh  data".

MOC_Eventlist.docx

Version: 1.7.19069

Page 5 of 15

Event Maintenance

The fields are only enabled again when the button "Discard" is clicked.

If you request data and this data is currently locked by another user, then you can specify if the

data is displayed. Here, the data is only displayed and cannot be edited.

Toolbar

You can call the following functions from the toolbar. Note the Requirements for editing events:

 Edit an existing event

Function authorization: evli.edit

The relevant dialog for the event selected is opened.

 Delete an existing event

Function authorization: evli.delete

The selected event is deleted.

 Recalculate

After  the  confirmation  prompt,  a  validation  check  is  performed  for  all  added,  edited  or  deleted

events;  the  postings  resulting  from  the  events  are  regenerated.  When  the  recalculation  is

completed, a message is issued.

If an error occurs during recalculation (e.g. because of logically invalid values), an error message is

displayed.

 Discard

After confirmation, all added, edited or deleted events are discarded and the list is cleared.

 Order information

Function authorization: orin

Calls the applicationOrder information.

 Workplaces/machines

Function authorization: wpov

Calls the applicationWorkplaces/machines.

Tab Create event

Function authorization: evli.create

MOC_Eventlist.docx

Version: 1.7.19069

Page 6 of 15

Event Maintenance

This tab includes the buttons

 to create events. Different categories are available:

Operation category:

o  Log OP on (A_AN)

o  Log OP off (A_AB)

o  Partial confirmation/posting of part quantity (A_TR)

o  Quantity upload (A_MR)

o

Interrupt OP (A_UN)

o  Finish OP (A_BE)

Person category:

o  Log person on (P_AN)

o  Log person off (P_AB)

Machine/workplace category:

o  Change status (M_MST)

o  Change partitioning (M_TLG),

o  Automatic counter (M_CTR_AUTO),

o  Automatic quantity (M_AUTO)

Material category:

o  Log output batch on (CA_AN)

o  Log output batch off (CA_AB)

o  Log input batch on (CE_AN)

o  Log input batch off (CE_AB)

Other category:

o  Activate OP (NC_AN)

o  Deactivate OP (NC_AB)

Field descriptions

Class

Internal event classification:

P = Personal data

M = Workplace data

A = Order data

MOC_Eventlist.docx

Version: 1.7.19069

Page 7 of 15

Event Maintenance

C = Batch data

Event

The possible events and their colors are listed here.

Dialog

This field shows the dialog that triggers the event. Some dialogs have the same name as the event

(e.g. A_AN, A_UN, ...), but a different dialog can also trigger the event.

Date, time

Date and time when the event was posted.

Workplace/machine

The event was posted for the workplace specified.

MES order number

The event was posted for the specified combined order/operation number. This field is only filled in

if the event has an order reference.

Person

The person who triggered the event or for whom the event was triggered. This field is only filled in if

the event was triggered by a person or has a reference to a person.

Status

The workplace/ machine status that applied at the time of the event; this field contains only context-

related information.

PZE

Reference to clock-in or clock-out

Primary quantity

Yield,  yield  reason,  scrap,  scrap  reason,  rework  quantity,  rework  quantity  reason,  open  quantity,

open quantity reason

Secondary quantity

Yield,  yield  reason,  scrap,  scrap  reason,  rework  quantity,  rework  quantity  reason,  open  quantity,

open quantity reason

Tertiary quantity

Yield,  yield  reason,  scrap,  scrap  reason,  rework  quantity,  rework  quantity  reason,  open  quantity,

open quantity reason

Base quantity

Yield,  yield  reason,  scrap,  scrap  reason,  rework  quantity,  rework  quantity  reason,  open  quantity,

open quantity reason

Modified by

Last editor of the event

MOC_Eventlist.docx

Version: 1.7.19069

Page 8 of 15

Event Maintenance

Date, time

Date and time when the data record was last edited.

Editable

J = Event can be edited

N = Event cannot be edited, e.g. is the master of an MOP or is locked by a change in the log record

Reference

Unique ID of the data record

Priority

Priority specification for events of the same time (1 = highest priority)

Sorting

Internal use

Status 1

Event M_MST: machine status/ interruption reason

Event M_TLG: Partitioning

Event M_SZY: Target cycle

Status 2

Internal use

Status 3

Internal use

Attribute 1

Events C_GEN, C_UMB, CE_AN, CE_AB, CA_AN, CA_AB: target location/material buffer

Attribute 2

Event P_AN: Wage/ premium indicator

Events CE_AB, C_GEN: info on batch

Otherwise: Internal use

Attribute 3

Event P_AN: Operator position

Events CA_AB, C_GEN: transport unit

Event CE_AN: BOM item

Event CE_AB: Batch status

Attribute 4

Internal use

MOC_Eventlist.docx

Version: 1.7.19069

Page 9 of 15

Event Maintenance

Attribute 5

Event CE_AB: Current batch

Counter 1, Type 1, Reason 1

Internal use

Counter 2, Type 2, Reason 2

Internal use

Counter 3, Type 3, Reason 3

Internal use

Counter 4-10, Type 4-10, Reason 4-10

Internal use

Partitioning

Partitioning. Is currently only displayed for the event M_TLG.

Displayed events

The following events are displayed:

Event

Designation

Type

A_AN

A_TR

A_UN

A_AB

A_BE

Log operation on

Order-related event

Partial confirmation / posting of part quantity

Order-related event

Interrupt operation

Order-related event

Log operation off

Finish operation

Order-related event

Order-related event

A_MR

Quantity upload

Order-related event

You  can  use  the  quantity  upload  to  upload
quantities for operations, which are not logged
on at the moment. This way, you can correct a
quantity  of  an  operation  without  having  to  log
the operation on and off.

  If an operation is logged on, you may not
use  this  event.  Use  instead  the  event
A_TR.

P_AB

P_AN

Log person off

Log on person

Person-related event

Person-related event

P_VAN

Person advance logon

Person-related event

MOC_Eventlist.docx

Version: 1.7.19069

Page 10 of 15

Event Maintenance

Event

Designation

Type

Cannot be edited.

The event is not used during
recalculation.

M_MST

Change workplace/machine status

Machine-related event

M_AUTO

Automatic quantity posting from the terminal  Machine-related event

M_CTR_AUTO  Automatic counter posting from terminal

Machine-related event

M_TLG

Change of partitioning

Machine-related event

M_SZY

Change of target cycle

M_PSPERRE

Production lock

Machine-related event

Cannot be edited.

If the target cycle is changed, the
change is not used during
recalculation.

Machine-related event

Cannot be edited.

Production lock events are not
used during recalculation.

CA_AB

Log output batch off (MPL)

Batch-related event

CA_AN

Log output batch on (MPL)

Batch-related event

CE_AB

Log input batch off (MPL)

Batch-related event

CE_AN

Log input batch on (MPL)

Batch-related event

NC_AB

Deactivate OP (ADE-BEA)

NC_AN

Activate OP (ADE-BEA)

Other event

Other event

The colors of the listed events are the following:

Color

Meaning

blue

Order-related events

green

Person-related events

red

Machine-related events

brown

Batch-related events

MOC_Eventlist.docx

Version: 1.7.19069

Page 11 of 15

Event Maintenance

Color

Meaning

black

Locked events

purple

If the order type option "Change after upload" is set to "Allow no changes" or "Allow
modification, no upload", then all the events already uploaded to the ERP system are
displayed in purple.

The column "Dialog" shows the dialog that triggered the event. Some dialogs have the same name as the

event (e.g. A_AN, A_UN, ...). The following other dialogs can also trigger the events mentioned above:

Dialog

Meaning

A_P_AN

Log order + person on in one (A_AN + P_AN)

P_AAB

Log all staff off (1..n P_AB)

A_AUN

OP is automatically interrupted with shift change

A_AAN

OP is automatically logged on again with shift change

SA_AN

Log on merged operation

SA_TR

Partial confirmation for merged operation

SA_AB

Log merged operation off

SA_ABME

P_KOM

PZE Clock-in

P_GEH

PZE Clock-out

CA_WL

Output batch change

Display of automatically recorded counter values:

If quantities are automatically recorded for a workplace using the Windows terminal software, then these

unevaluated counter quantities are collected and posted as event M_CTR_AUTO. The counter values of

the counter events M_CTR_AUTO are not displayed in the columns for yield, scrap, etc., but in separate

columns of the category "counter".

The  primary  quantities  resulting  from  the  counter  values  (evaluated)  are  logged  and  displayed  as

information in the columns for yield, scrap, etc.

MOC_Eventlist.docx

Version: 1.7.19069

Page 12 of 15

Event Maintenance

The  resulting  (evaluated)  quantities  are  not  logged  in  other  quantity  units.  This  means:  The

base, secondary and tertiary quantities of the counter events are always 0.

No reason is added to the logging of the resulting (evaluated) quantities.

Recalculation of changed data

When you have completed the editing, click button

 and confirm the prompt to start the recalculation

function. The recalculation can take some time depending on the extent of changes made.

The following steps are performed during recalculation:

1.  Validation check of the modified data

The system checks if all events involved are fully processed (same check as with online processing).

If the validation check fails for one of the events, then the recalculation is rejected and the changes

are  not  accepted  in  the  system.  If  a  validation  error  occurs,  then  an  error  message  is  displayed

including information on the relevant event.

2.  Canceling existing results

If  all  validation  checks  were  completed  successfully,  then  the  still  available,  current  results  are

canceled. If postings have already been uploaded to the ERP system (upload identifier “J“), then the

relevant cancelation records are generated; this is the same processing when postings are manually

changed  using  the  editing  function  for  postings.  The  quantities  and  times  contained  in  the  order-

related posting are also canceled for the operation status.

3.  Calculating new results

After a successful validation check and cancellation, the modified events are reevaluated and a new

posting  is  generated.  The  quantities  and  durations  calculated  for  the  order-related  posting  are  also

posted to the operation status.

Note: If the configuration has been changed in the meantime, it is possible that you cannot

change events any more that have already been recorded or the changed configuration can

lead to other results.

Example:  If  two  operations  were  logged  on  to  a  machine  at  the  same  time,  and  in  the

meantime  the  option  Parallel  logon  of  OP  was  deactivated,  then  the  recalculation  of  one

operation leads to a validation error. Recalculation is no longer possible.

If the recalculation could be completed successfully, a success message is shown.

MOC_Eventlist.docx

Version: 1.7.19069

Page 13 of 15

Event Maintenance

Locking concept in the event maintenance

The selected data is locked for editing. The selected machine and the selected period of time specify the

data locked.

All locks of the event maintenance are displayed in System administration > Locked data records and can

only be deleted by a user with the relevant function authorization.

If a lock is deleted, the recalculation of the currently displayed data in no longer possible on this console.

The user must discard the scenario and request data again.

Option "Parallel staff logins" in the event maintenance

If  the  employees  log  on  to  multiple  machines,  you  must  activate  this  option  in  the  event  maintenance

selection area. The personnel times are then allocated according to the order postings.

All  machines  are  then  displayed  where  the  displayed  persons  were  logged  on  during  the  evaluation

period.

If a nesting of the data is available, this nesting might be too complex and the data cannot be recalculated

because the start events are no longer included in the period of time selected.

Example:

Person 1 is logged on to workplaces 100 and 200

Person 2 is logged on to workplace 200 at a different, but overlapping time

Person 3 is logged on to workplaces 200 and 300 at a different, but overlapping time

When  data  is  recalculated,  all  events  of  an  order  are  integrated.  With  nested  order  events,  a  great

number of order events must be recalculated. Here, a constellation is possible that does no longer allow a

recalculation.

Note: You cannot use the event maintenance with such complex nested personnel postings.

Option "Optimized parallel staff logins" in the event maintenance

If this option is selected, the following optimized processing is performed with parallel staff

logins/personnel postings:

  Only the data specified via selection is displayed or requested (machine, order/OP, person)

  Only if a recalculation is performed, the machines are selected that must be recalculated because of

parallel staff logins.

The system uses the changed data to identify the relevant machines.



If an error occurs during recalculation, the additional machines are also displayed and the user can

correct the data.

MOC_Eventlist.docx

Version: 1.7.19069

Page 14 of 15

Event Maintenance

Waiting period processing

Waiting  period  processing  is  an  optional  processing  that  controls  the  system  behavior  when  personnel

postings are collected. You activate the processing in the basic settings.

If the waiting period is exceeded, a separate waiting period posting is generated (personnel posting to the

defined  waiting  period  operation).  If  the  waiting  period  is  not  exceeded,  the  personnel  posting  is

backdated (and also the OP posting, if required).

The  posting  times  of  the  events  remain  unchanged  during  waiting  period  processing,  i.e.  the  posting

times are edited in the event maintenance.

If  the  events  are  recalculated,  the  changed  postings  are  used  to  identify  whether  the  times  must  be

backdated according to the waiting period processing.

Changes after upload

As  part  of  the  customization,  you  specify  for  each  order  type  whether  changes  made  in  the  event

maintenance are uploaded to the ERP system. The following options are available:

  Allow modification and upload

  Allow modification, no upload - You can change data, but the data is not uploaded

  Do not allow modification - data cannot be changed.

The  validation  check  is  performed  for  the  workplace:  If  an  order  at  a  workplace  cannot  be  edited

according to the order type configuration (purple font color), then all events are locked that are older than

the last upload date/time of this order. The lock is performed for the workplace, i.e. also orders that could

be edited, are locked.

MOC_Eventlist.docx

Version: 1.7.19069

Page 15 of 15


Edit Operations

1  Edit Operations

Overview

HYDRA menu

FEDRA menu

Order management  Order management  Edit operations

Detailed Scheduling  Order management  Edit operations

Transaction code

edop

Function authorization

edop

Purpose

The term process, work step or operation describes a workflow that is designed to perform a task in a work

system. During this workflow one quantity unit of an order is produced.

You use this function to add new operations to an order or to edit data in existing operations.

Integration

Operations are planned in planning functions and optionally posted on shop floor terminals; their purpose

is to facilitate status tracking and to record quantities and activities, which are usually uploaded to higher-

level systems.

Requirements

The following requirements must be met when adding a new operation:

  The higher-level order must already have been created.



If  you  use  order  sequences  (project-specific;  depending  on  the  license),  the  sequence  of  the

operation must already exist.

  The workplace/machine or group where you want to plan the operation has already been created

in the system.

The authorization for the responsibility area is assigned to you and you are authorized to display the data.

Selection criteria

The application provides the following selection criteria:

MOC_EditOperations.docx

Status: 25.09.2020

Page 1 of 11

Order

Enter the order number of the order that includes the operations you want to display. You can also use

Edit Operations

wildcards.

Operation

You can optionally enter the operation number of the operation that you want to display or edit. You can

also use wildcards.

Sequence

If your system is set up to use sequences (depending on the license), you can enter the sequence number

here. The system then selects the operations assigned to the sequence number entered. If your system is

not set up for sequences, leave this field empty.

Show split OPs

If you use the function to split operations (requires license), you can use this option to define whether you

want to display the split-master-operations only or also the included split operations.

Checking the responsibility area

During the selection, the responsibility area defined for the operation is checked.

Field descriptions

The fields of the operation are described here.

Only selected data is available in the table:

o  Order

o  Sequence

o  Operation

o  Split

o  Processing code

o  Locked

o  Fixed

o  Group

o  Workplace

o  Control

MOC_EditOperations.docx

Status: 25.09.2020

Page 2 of 11

Edit Operations

Editing functions

To create or edit operations, use the buttons provided.

If a responsibility area is stored for the order, the editing of data is only possible if the options to display,

insert, modify and delete are enabled in the configuration of the responsibility areas or profiles.

Toolbar

   Edit orders

Function authorization: edor.*

Calls the application Edit orders for the selected order.

  Edit order sequences

Function authorization: edseq.*

Calls the application Edit order sequences for the selected order.

  Edit long texts of operations

Function authorization: edoptx.*

Calls the application Edit long texts of operations.

  Edit components

Function authorization: edopcomp.*

Calls the application Edit components.

  Edit production resources and tools

Function authorization: edopres.*

Calls the application Edit production resources and tools.

  Order information

Function authorization: orin

Calls the application Order information for the selected order.

   Change operation status

Function authorization: op.statchg

Function to change the operation status.

MOC_EditOperations.docx

Status: 25.09.2020

Page 3 of 11

Edit Operations

     Lock

Function authorization: op.lock

Use the button Lock operation to lock one or several selected operations.

      Unlock

Function authorization: op.unlock

The button Unlock operation unlocks one or several selected operations.

   Split operation

Function authorization: op.split

Calls the function to split the operation. For further information, refer to the relevant documentation.

   Dissolve split OP

Function authorization: op.splitdissolve

Undoes the operation split. For further information, refer to the relevant documentation.

Adding an operation

Transferring order header data

The following data is transferred from the order header in the operation when a new operation is created:

  Order type

  Base quantity unit

  Article if the article number is not explicitly defined for the operation.

  Article designation if the article designation is not explicitly defined for the operation.

  Material type if it is not explicitly defined for the operation.

  Customer name

  Priority, if the priority control is set to order-related for the order type..

Any priority that may have been entered will be ignored!

MOC_EditOperations.docx

Status: 25.09.2020

Page 4 of 11

Edit Operations

Transferring default data

Default data  is taken from a template or from the  processing code,  if one  exists, and transferred to the

operation when an operation is created. The data is transferred in the following order:

  Values are transferred from the template (if available).

If you add a new operation (manually or via interface), all values are transferred that can be edited

in the template and that are not entered manually (explicitly) or transferred via interface .

  Values are transferred from the processing code (if one exists); doing so will overwrite any values

set in the template. The following values are transferred from the processing code to the operation:

  Underdelivery

  Reaction to underdelivery

  Overdelivery

  Reaction to overdelivery

  External processing

  Recordable

  Can be logged on several times

  Can be split

  Serial number obligation

  Batch management requirement

  Target quantity update*

  Sequencing list*  is no longer evaluated for display in the sequencing list; instead, the system

directly accesses the separate configuration tables.

Note:  Values  marked  with  *  are  not  displayed  for  the  operation  and  therefore  they  also  cannot  be

changed.

  Transfer  of  the  values  transmitted  explicitly  (either  entered  manually  or  transmitted  via  PPS

interface); any values that were previously transferred from the template or the processing code

will be ignored and overwritten.

MOC_EditOperations.docx

Status: 25.09.2020

Page 5 of 11

Edit Operations

Target quantity comparison

If the target quantity comparison is enabled for the preceding operation, then any target quantity  that  is

entered is ignored and instead the target quantity of the preceding OP is used when you add an operation.

Identifying the transport time

To identify the transport time between two operations, you can store a transport matrix  . This is part of a

HYDRA customization. This transport time is then integrated during lead time scheduling.

When  a  new  order  or  operation  is  created,  the  transport  time  is  calculated  using  this  matrix  and  then

transferred to the operation. If you change the transport matrix later on, this will have no effect on already

existing operations.

If a transport time is configured greater than zero in the ERP system and if operations are then transferred,

these transport times are transferred to the database. Otherwise, the time is calculated using the transport

matrix.

You need not use master data, you can also explicitly change the values for the operation. Note: any values

changed explicitly are overwritten when you re-plan an operation to another machine group.

Setting the planned start data (used in the sequencing list on the terminal)

When  a  new  data  record  is  added,  the  system  tries  to  identify  planned  start  dates  and  to  use  them  as

default values for the sorting of the sequencing list. This process is based on the following logic:



It is checked whether or not the planned start date and the planned start time are empty.

o

If yes:

  The earliest start date (date) is used as planned start date.

  The earliest start date (time) is used as planned start time.



It is checked whether or not the planned end date and the planned end time are empty:

o

If yes:

  The latest end date (date) is used as planned end date.

  The latest end date (time) is used as planned end time.

  For the sorting of the sequencing list, the planned start date and the planned start time are entered

in separate fields that cannot be changed.

The used date fields, the corresponding BAPI acronyms and database fields can be found in the document

dealing with the technical background information on the sequencing list.

Editing an operation

If you edit an operation, the default data (if available) is taken from the template or from the processing

code and transferred to the operation in the following order.

MOC_EditOperations.docx

Status: 25.09.2020

Page 6 of 11



If you change the planned group or if you change the workplace and the new workplace is included

in a different group, then the system transfers the following values (if available) from the template:

Edit Operations

  Waiting time formula

  Setup time formula

  Processing time formula



Inspection time formula (only for information purposes).

  Teardown time formula

  Target cycle formula

  Formula for the remaining run time

  Formula for the second remaining run time

  Max. synchronization time

  Default value key



If  the  planned  group  was  changed,  the  system  will  also  update  the  value  plan_werk  (internally

managed  in  the  order  backlog)  in  which  the  company  for  the  modified  Group  is  identified  and

transferred.



If  the  processing  code  was  changed  for  the  operation,  the  values  of  the  processing  code  are

transferred (see above).

  The final step involves the transfer of the values transmitted explicitly (either entered manually or

transmitted via ERP interface); this will ignore/overwrite any values that were previously transferred

from the template or the processing code.

If the group of an operation is changed, the transport time is recalculated. The transport time stored in the

transport matrix is then used. Any transport time defined for the preceding OP will be ignored/discarded.

If you change the target quantity (P), the target quantity is only converted automatically

to the other quantity units if the fields have been emptied manually beforehand.

Transferring order header data

If you change an operation, only the values below are transferred from the order header to the operations:

  Priority, if the priority control is set to order-related for the order type..

MOC_EditOperations.docx

Status: 25.09.2020

Page 7 of 11

Edit Operations

Any priority that may have been entered will be ignored!

  Customer name

The base quantity unit is not changed, because it is very  unlikely that a change of this kind  would ever

happen in reality. The material type is not modified, because in MPL it may vary from one OP to the next

OP.

General checks run when an operation is saved

Checking the existence of workplace or group

If  a  workplace  was  entered,  then  the  system  checks  whether  the  workplace  exists.  If  yes,  the

workplace  group  of  the  workplace  is  transferred  to  the  operation.  In  any  other  case,  the  saving

process is interrupted with an error message.

If no  workplace  was defined, but instead only  a  group, then the system checks the  validity  of the

group that was entered. This means: it checks if the group exists in the system. If no, the change is

rejected and an error message is issued.

Checking priority management

If priority management was activated for the order type as part of the customizing process using the

identifier with the same name ADE_AUFTRAGSARTEN.PRIO_STEUERUNG[2,2]  and if the priority

control  was  configured  as  order-relatedPRIO_STEUERUNG[1,1]  =  'U'  ,  then  the  system  checks

whether the defined priority is permitted when a new order is created manually or an order is changed.

If the maximum number is violated, the action will be rejected.

If the order is transferred from the ERP interface and the maximum number is exceeded, the order is

not be refused as a result of this validation check. In this case, however, the priority is automatically

set to 1.

Ability to modify an operation

By default, the following operations cannot be modified:

  OPs that are currently logged on (status with control indicator L) and

  OPs that are automatically interrupted (status with control indicator F).

Checking the formula values transferred

As of b_anr.dll version 8.1.1.359.

If  you  add  or  change  an  operation,  the  system  checks  the  values  passed  in  the  formula  fields  (if

specified). The system checks if the values are available in the formula management. The validation

check is performed for the following formula fields:

-  Setup time formula (BAPI identification ANR.RUEZ:EXPR)

MOC_EditOperations.docx

Status: 25.09.2020

Page 8 of 11

Edit Operations

-  Processing time formula (BAPI identification ANR.BEARBZ:EXPR)

-

Inspection time formula (BAPI identification ANR.PZ:EXPR)

-  Teardown time formula (BAPI identification ANR.ABRZ:EXPR)

-  RRT1 formula (BAPI identification ANR.RLZ:EXPR)

-  RRT2 formula (BAPI identification ANR.RLZ2:EXPR)

-  Waiting time formula (BAPI identification ANR.WARTZ:EXPR)

-  Target cycle formula (BAPI identification ANR.SZY:EXPR)

In addition to the formula fields, the following BAPI identifications are also checked:

-  ANR.TE.EXPR

-  ANR.TR.EXPR

-  ANR.TEB.EXPR

-  ANR.TRB.EXPR

If  at  least  one  of  the  values  entered  is  not  available  in  the  formula  management,  the  request  is

rejected and an error message is issued (return code 901).

You can deactivate the validation check using the following entry in the INI configuration:

Parameter name

INI name

Section

Key

Value

Active

Comment

Value

BDE

ANR_BAPI

CHECK_FORMULAS

N  Nein / No (check is disabled)

Yes

(optional)

Setting the planned start data (used in the sequencing list on the terminal)

When an existing data record is changed, the system tries to identify planned start dates, to update them

and to use them as default values for the sorting of the sequencing list. The basic logic depends on the

planning function configuration in the master record of the operation’s workplace:

  Planning function “N“ – no planning

o

It is checked whether or not the planned start date and the planned start time are empty.



If yes:

MOC_EditOperations.docx

Status: 25.09.2020

Page 9 of 11

Edit Operations

  The earliest start date (date) is used as planned start date.

  The earliest start date (time) is used as planned start time.

o

It is checked whether or not the planned end date and the planned end time are empty:



If yes:

  The latest end date (date) is used as planned end date.

  The latest end date (time) is used as planned end time.

o  For the sorting of the sequencing list, the planned start date and the planned start time are

entered in separate fields that cannot be changed.

  Planning function “P“ / “H“ / “T“ / “A“:

o

If the planned start date was changed, the planned start date and the planned start time

are entered in separate fields that cannot be changed.

If no workplace is defined for the operation, an identical processing is performed as with planning

function "N".

The used date fields, the corresponding BAPI acronyms and database fields can be found in the document

dealing with the technical background information on the sequencing list.

Deleting operations

When an operation is deleted, the following points must be considered:

  By default, you can only delete an operation if the operation is not logged on, i.e. the operation is not

in status "running" and not in status "automatically interrupted".

  You cannot delete a split operation.  To delete a split operation, you must dissolve the operation using

the relevant split functionality.



If a split master is deleted, the split OPs are also deleted.

  You cannot delete a merged operation. You must dissolve it.



If you manually delete the last operation of an order on the client, the order header is not deleted. It

must be deleted explicitly.

By default, deleting an operation means that an item is physically deleted from the database. The following

data is deleted:

  Backlog of orders

  Order status

  Assigned material components

MOC_EditOperations.docx

Status: 25.09.2020

Page 10 of 11

Edit Operations

  Assigned production resources and tools

  Assigned long texts

  Resource allocation for this operation in the shop floor scheduling (HLS)

The log data (Tabelle ade_protokoll) is not automatically deleted if an operation is deleted. The log data is

transferred to the long-term table or deleted from the database in the course of the cyclic archiving/deletion

runs.

Deleting orders via delete action "D" if last OP is deleted

As of b_anr.dll version 8.1.1.358.

If  you  "delete"  the  order  header  via  MLE  interface  (PPS=J),  only  physically  deleted  operations  are

integrated.  For  operations  that  were  only  deleted  logically  (using  delete  action=D),  no  processing  is

available.

Use the following entry in the INI configuration to integrate also operations that were only logically deleted

(delete action=D):

Parameter name

INI name

Section

Key

Value

Active

Comment

HYDRA: as of service pack >13

FEDRA: as of version 1.1

Value

BDE

ANR_BAPI

ORDER_BAPI_DELETE_WITH_DELETE_ACTION_D

J  Ja / Yes:

Yes

Delete Order when OP in status D

This processing is activated by default for new systems. You can deactivate this processing, if required.

The processing is not automatically activated with subsequent updates.

MOC_EditOperations.docx

Status: 25.09.2020

Page 11 of 11


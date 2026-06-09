BDE and MDE Functions

1  BDE and MDE Functions

This  document  describes  the  different  AIP  functions  used  for  the  Shop  Floor  Data  and  Machine  Data

Collection (BDE and MDE).

1.1  Logging on an operation

When you log on an operation, the following methods are available:

Separate logon of

Operations  and  staff  have  to  be  logged  on/off  separately.  You  have  to

orders and staff

enter the staff badge number with the function Log on operation. This is

a validation check only. The person must be logged on separately using

the function Log on person.

Log person on with order  The OP and the person are logged on in one posting process. You only

use the function  Log on person if further persons are logged on to  this

operation.

Make this setting in the terminal configuration on the client (Log user on with order option).

Posting process

Select a workplace before you log on an operation. When you then call the dialog, the workplace field is

already populated.

Calling the function Log on operation

Click the button Log operation on.

When the function is called, the user is guided through the input dialog.

Choose operation

Manual entry via keyboard

or

Selection via sequencing list (see the "Notes on the sequencing list")

or

Scan of bar code

With manual entry  or bar code scan, the operation is  not  automatically  searched and

positioned in the sequencing list.

Choose status

Enter or select the status number that must be set when the operation is logged on.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 1 of 22

BDE and MDE Functions

Staff badge number

The  input  field  is  also  displayed  if  you  have  selected  the  “separated“  option  for  the  "logon"  in  the

terminal  configuration  (client).  The  person  is  not  logged  on  with  the  order  but  is  only  used  for

validation. For this setting, go to the terminal configuration: authorizations on the terminal > log OP

on.

Confirmation Log on operation

You use the button Log on operation to log on a new operation. With the OP logon, the run times

are booked to the different time accounts and the quantities are posted for the OP.

When  the  operation  is  logged  on,  the  Workplace  field  in  the  backlog  of  orders  is  filled  with  the

workplace  where  the  operation  is  logged  on.  If  the  operation  has  been  planned  for  another

workplace, the planned  workplace is then overwritten. As a result, the OP is implicitly re-planned.

This re-planning does not involve any further actions (e.g. update of the template, rescheduling).

Notes on the sequencing list

You can limit the number of entries in the sequencing list for the specific workplace. The list should

not  get  too  long  because  a  long  list  has  a  negative  effect  on  response  time  behavior,  operability

and search time (recommendation: not more than 50 entries, less with remote connections).

The  same  is  valid  for  the  functions  Interrupt  operation,  Finish  operation  and  Partial  confirmation.

Here, running operations are displayed.

If an operation is already logged on to the workplace, then the system enters this workplace in the

input field Operation. If  you do not  want this and if the system should preset the first operation of

the sequencing list in this field, then you must make the following configuration:

  Call the application Dynamic dialog configuration - Fields.

  Request data for the dialog "WF_AGL". If it is not the logon dialog A_AN or A_P_AN, then

identify the dialog.

  Select the field "ANR".

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 2 of 22

BDE and MDE Functions

  Click the Edit button (note: this is only possible with terminal-specific or terminal group-

specific dialogs. It is not possible with AIPDEF 0 dialogs).

  Enter the value "SETVALUE" (without quotation marks) in one of the field attributes 1 to 8.



Leave the field Default empty.

  Save your changes.

  Change to the application Dynamic dialog configuration.

  Restart the dialogs and then restart the terminals.

Displaying notes and texts

Via configuration in the application  Order types,  you can use the option Show OP info when logging on

OP to specify for a specific order type that after a successful order logon on the AIP either



the notes on the operation with an active option Visible on the terminal

or



the long texts of operations

are automatically displayed. The “OP info” dialog is then opened with the respective active page.

Note: To show the information, the AIP must be connected online to the server.

1.2  Logging an operation off

You use the button Log off operation on operation level to log off an operation. The posting of run times

and quantities is then finished for the OP. Once logged off, you cannot log on the OP again.

Posting process

Select  the  workplace  and  the  operation  that  must  be  logged  off  in  the  main  view.  When  the  dialog  is

called, these fields are then preassigned and cannot be changed.

Calling the function Log operation off

Click the Log operation off button.

When the function is called, the user is guided through the input dialog.

Yield

Enter the yield quantity that must be posted.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 3 of 22

BDE and MDE Functions

Scrap (input fields and display)

The scrap reasons are already displayed in the dialog (see also AIP operation). Enter the produced

scrap  quantities  for  the  relevant  scrap  reason.  All  scrap  quantities  entered  are  totaled  and

displayed in the general display field.

Deviation reason

You  can  activate  an  overdelivery  or  underdelivery  check  for  operations  or  persons.  When  the

operation  is  logged  off,  the  system  then  checks  if  the  quantity  recorded  has  exceeded  the

overdelivery  limit  or  falls  short  of  the  underdelivery  limit.  If  the  check  has  a  positive  result,  the

quantities posted are rejected with the error message "Overdelivery" or "Underdelivery".

If only a warning is activated for the check, the user can force the system to accept the overdelivery

or underdelivery by entering a deviation reason.

Status

Enter or select the number of the workplace/machine status that is set after the operation is logged

off.

Estimated duration

Optionally enter the estimated duration of the selected workplace/machine status in minutes.

Note: Only make an entry here if the status is a downtime status (status <> production).

Comment

Enter an optional comment for the status in this field that is also displayed in the machine history.

Staff badge number

The  person  entered  must  be  authorized  to  log  off  the  operation.  The  setting  is  made  in  the  HR

master data. Go to: Shop floor data > BDE authorizations > Lop OP off.

Confirming Log off operation

The operation is logged off, once the dialog has been confirmed.  You cannot log the operation on

again.

1.3

Interrupting an operation

Click the button Interrupt operation to call this function. You use this function to stop collecting times and

quantities  for  an  order.  The  reasons  for  the  interruption  can  be  a  quantity  upload,  a  shift  change  or  an

interruption of the production for technical reasons.

The process of interrupting an operation and the layout of the input dialog are identical to the ones of the

operation logoff. The difference is that you can log on an interrupted operation at any time.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 4 of 22

BDE and MDE Functions

1.4  Uploading a part quantity for an operation

You  can  use  this  function  to  upload  a  part  quantity  for  the  order  without  interrupting  or  finishing  the

running OP. The quantities are booked for the relevant OP and the person that makes the posting. Click

the button Confirm partially to call this function.

Posting process

Select  the  workplace  and  the  operation  from  the  list.  When  you  then  call  the  dialog,  the  system

preassigns these fields and the values cannot be changed.

Calling the function Confirm partially

Click the button Confirm partially.

When the function is called, the user is guided through the input dialog.

Yield

Enter the yield quantity that you want to post.

Scrap (input fields and display)

The  scrap  reasons  are  already  displayed  in  the  dialog  (see  also  AIP  operation).  You  can  enter

scrap  quantities  for  the  relevant  scrap  reason.  All  scrap  quantities  entered  are  totaled  and

displayed in the general display field.

Deviation reason

You  can  activate  an  overdelivery  or  underdelivery  check  for  operations  or  persons.  The  system

then checks if the overdelivery limit is exceeded with the quantity posted. If the check has a positive

result, the quantity posted is rejected with the error message "Overdelivery".

If only a warning is activated for the check, the user can force the system to accept the overdelivery

by entering a deviation reason.

Staff badge number

The person entered must be authorized to upload part quantities for the operation.

1.5  Log person on

Persons  are  logged  on  to  or  off  from  a  workplace.  The  logging  of  persons  is  therefore  made  on  the

workplace level.

You can only log on a person, if an operation has been logged on to the workplace.

You can only use this function to log on persons with single workplaces or production orders.

With  group  workplaces  or  overhead  cost  operations,  the  persons  are  logged  on  via  the

combined logon of order and persons when the operation is logged on. It must be guaranteed

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 5 of 22

here that a staff badge number can be entered during the posting process.

BDE and MDE Functions

Posting process

Select the workplace where you want to log the person on or off and click the button  Staff logging. The

system displays a list of the Registered persons that are already logged on to this workplace. Close this

view by clicking Close information.

Calling the function Log person on

Click the button Log person on. A dialog including only one dialog step opens.

Staff badge number

To identify the person, also enter the staff badge number here.

Other notes

Via  customization,  you  can  optionally  enter  an  operator  position/function  or  a  premium  indicator.

You specify in the course of the customization how the value is entered: only a field with a selection

list or a separate workflow.

You  can  configure  that  an  advance  logon  for  the  next  shift  is  possible  within  a  configurable  time

before the start of the next shift. Configure this time in the terminal configuration (tab: MF functions

> Waiting period for advance logon of staff). But if the last operation is logged off before the end of

the current shift, all advance logons are deleted. And you cannot log off a person that is logged on

in advance.

1.6  Log person off

Persons  are  logged  on  to  or  off  from  a  workplace.  The  logging  of  persons  is  therefore  made  on  the

workplace level. You can only log off a person that has been logged on to the workplace.

You can only use the function to log off persons with single workplaces or production orders.

With  group  workplaces  or  overhead  cost  operations,  the  persons  are  logged  off  via  the

combined logoff of order and persons when the operation is interrupted or logged off.

Posting process

Select the workplace where you want to log the person on or off and click the button  Staff logging. The

system displays a list of the Registered persons that are already logged on to this workplace. Close this

view by clicking Close information.

Calling the function Log person off

Click the button Log person off. A dialog including only one dialog step opens.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 6 of 22

BDE and MDE Functions

Yield

Enter the yield quantity that you want to post.

Scrap (input fields and display)

The  scrap  reasons  are  already  displayed  in  the  dialog  (see  also  AIP  operation).  You  can  enter

scrap  quantities  for  the  relevant  scrap  reason.  All  scrap  quantities  entered  are  totaled  and

displayed in the general display field.

Staff badge number

To identify the person, also enter the staff badge number here.

1.7  Log off everyone

You can use this function to log off all persons in one posting that are logged on to a machine.

You assign the authorization to use  this function in the HR master data. Activate the following option in

tab Shop floor data > BDE authorizations > Log all staff off.

Posting process

The  posting  process  is  in  general  identical  to  the  dialog  Log  person  off.  The  only  difference  is  that  you

cannot record quantities when using the dialog Log off everyone.

1.8  Change workplace/machine status

You can use this function to assign a new status to a workplace/machine. You might need this function

during setup of the workplace or in case of a malfunction, for example.

A status should be entered, when the AIP automatically identifies a malfunction and the status changes to

“not assigned” (also see "Monitoring of operating signals and cycle time").

You can configure that only persons can perform a status change that are already logged on. Enable the

following option in the HR master: tab  Shop floor data > BDE authorizations > Change only if person is

logged on.

Posting process

Select the workplace where you want to change the status and click the button Change status.

Status

Enter or select the status that you want to set for the workplace.

With  manual  entry  or  bar  code  scan,  the  status  is  not  automatically  searched  and

positioned in the selection list.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 7 of 22

BDE and MDE Functions

Estimated duration

You can enter an estimated time in minutes that the new status will probably take. This field should

only be filled for downtime statuses.

Comment

You can enter a comment for the status. This comment can be displayed in the machine history.

If the status lasts on and shifts change, then the comment is only assigned to the MDE

log record of the shift before shift change.

Staff badge number

Enter  the  badge  number  of  the  person  that  changes  the  status.  The  number  is  required  for  the

validation check. The person must be authorized to change the status.

Confirmation of the dialog

Once the dialog has been posted successfully, the new status is activated for the machine.

Other notes

It  is  possible  to  change  from  one  status  to  another,  unless  the  automatic  status  monitoring  has

been  activated

for

the  workplace/machine  (workplace/resource  configuration  >

tab:  MDE

configuration  >  automatic  monitoring:  cyclic  or  operating  signal)  and  the  workplace  is  in  status

“production”.

If you do not want to show a machine status in the status list (any more), then you must disable the

option Status manually at terminal in the machine status assignment.

Hierarchical statuses

You can build a status hierarchy as of HYDRA-MDE 7.2. In the status assignment,  you store the status

number of the direct superordinate status for a lower-level status. All statuses that you cannot assign on

the terminal and that are only used to show the hierarchy are called “hierarchy level”.

Hierarchy levels are displayed in blue font in the status list.

If  you  select  a  hierarchy  level  and  double-click/touch  the

  button,  the  list  of  “lower-level”  statuses

opens. To get to the next higher hierarchy level, click/touch

.

You can only select a status in the status list that can be assigned manually. The following error message

is shown, if a machine status change on a hierarchy level cannot be assigned.

1.9  Lock/unlock production status

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 8 of 22

BDE and MDE Functions

The button Lock production status or Unlock production status is only active for a workplace if

the current status is not "production" and if one of the following conditions is fulfilled:

  The PCC receiving the machine data of the workplace runs in embedded mode and the

workplace is assigned to a terminal configured with "MDE operation".

  The PCC receiving the machine data of the workplace runs in stand-alone mode and the

INI configuration MDE-NOTIFICATION is activated for the workplace.

If  the  function  Lock  production  status  is  active,  the  terminal  cannot  automatically  change  to  status

"production" when the terminal identifies signals (pulses or operating signal).

If the production status is locked, this means:

  With  an  active  lock,  the  automatic  change  to  status  "production"  is  not  possible  and  the  status

currently set is kept despite machine pulses (e.g. "setup").



If cycle signals are recorded during the lock via counter inputs configured as "yield", then the relevant

quantities are booked according to the Configuration of Posting during prod. lock:

o  as yield,

o  as scrap

o  or not at all.

  Click the button Unlock production status to remove the lock.

The  production  status  can  also  be  locked/unlocked  when  a  specified  workplace/machine  status  is  set.

You  can  configure  the  behavior  in  the  configuration  Status  assignment  for  each  status  that  is  not

"production" (go to: Master data > Workplaces/machines > Status assignment).

Logging of the production lock

The manual lock or unlock of the production status is logged as event on the server and can be shown in

the Machine history. Note: the logging of the event is only performed if the status is manually locked or

unlocked.

But if the production status is locked or unlocked via status change, then this is not documented explicitly

as an event and is therefore not shown in the machine history.

If the production status is locked for a machine and the terminal software is restarted, then the production

lock is automatically removed after this restart. The changed production lock is not logged.

Authorization check when setting the production lock manually

You  can  configure  that  only  if  a  relevant  authorization  is  available,  the  person  is  allowed  to  manually

(explicitly) set or remove the production lock.

To do so, activate the  dynamic dialog M_PSPERRE. If this dialog  is activated,  you must enter the staff

badge number.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 9 of 22

BDE and MDE Functions

If  the  dialog  is  activated,  the  dialog  is  displayed  when  the  operator  clicks  the  button  Lock  production

status  or  Unlock  production  status.  Once  the  badge  number  has  been  entered,  the  system  checks

whether this person  is authorized to lock/unlock the production status. The system checks, if the option

Change of production lock in the HR master data (tab Shop floor data) is enabled.

If the terminal is OFFLINE, the terminal configuration specifies the behavior (option Checking required).

1.10  Change target cycle

The target cycle is the default value that is checked in case of a machine monitoring based on cycle time.

You can use this dialog to change the target cycle for the machine.

Posting process

Select the workplace where you want to change the target cycle. Click the button Change target cycle.

New target cycle

Specify the new target cycle in seconds/cycle

Staff badge number

The  entry  of  the  staff  badge  number  is  optional.  If  configured  accordingly,  a  validation  check  is

performed for the number. (HR master data > tab: Shop floor data > Change of cycle/partitioning).

Confirmation of the dialog

Once the dialog has been posted successfully, the new target cycle is activated for the machine.

1.11  Change partitioning

The  partitioning  (also  called  cavity)  specifies  the  number  of  parts  produced  per  machine  cycle  (clock).

You can use this dialog to change the partitioning. The automatic collection of quantities is then based on

this partitioning.

Posting process

Select  the  workplace  where  you  want  to  change  the  partitioning.  Then  click  the  button  Change

partitioning.

Partitioning

Enter the new partitioning.

Staff badge number

You can optionally enter the staff badge number. If configured in the HR master data, a validation

check  is  performed  for  this  number  (tab:  Shop  floor  data  >  BDE  authorizations  >  Change

cycle/partitioning).

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 10 of 22

BDE and MDE Functions

Confirmation of the dialog

Once  the  dialog  has  been  posted  successfully,  the  new  partitioning  is  used  for  all  running

operations at the machine.

1.12  Change target quantity

Use this dialog to change the target quantity based on operations (primary quantity unit).

Posting process

Select  the  operation  where  you  want  to  change  the  target  quantity  and  click  the  button  Change  target

quantity.

New target quantity

Enter the new target quantity that you want to store for the operation.

Staff badge number

You can optionally enter the staff badge number. If configured in the HR master data, a validation

check  is  performed  for  this  number  (tab:  Shop  floor  data  >  BDE  authorizations  >  Change  target

quantity).

Confirmation of the dialog

Once the dialog has been posted successfully, the new target quantity is stored for the operation.

1.13

Information on operations (OP info)

General information

Use  the  button

  on  operation  level  to  call  the  OP  info  dialog1.  Select  the  required  operation.  A

dialog  opens.  The  dialog  includes  several  pages  that  are  organized  in  tabs.  The  information  is  only

requested from the database when you call the relevant page.

1 This function is also available at other places, e.g. in the Log operation on dialog.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 11 of 22

BDE and MDE Functions

The dialog includes the following tabs:

Description

Current information on the current operation is displayed.

  Operation (MES order number)

  Article

  Article designation

  Remark 1

  Remark 2

  Planned duration

  Target quantity (of the operation)

  Yield

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 12 of 22

BDE and MDE Functions

  Scrap

  Completion (in %)

At the bottom, the long text assigned to the operation is displayed.

Notes

The  tab  Notes  displays  the  notes  entered  on  the  client  (usually  via  the  Graphic  planning  board)  if  the

option Display on terminal is enabled.

The table shows all notes of the operation that are configured to be displayed on the terminal. The list is

sorted by the editing date. The most recent note is on top and is displayed when you call the view.

If you click/touch a note of the list, the complete text is displayed in the field below.

1.13.1  SF comments

The tag SF comments displays the comments recorded during the Shop Floor Data Collection (BDE) or

you can record new comments.

The comments recorded are displayed in the Order information dialog on the client or can be forwarded

via escalation management, e.g. by e-mail.

If an SF comment is recorded for an operation that has been merged on the MOC, then the SF

comment  is  only  relevant  for  this  merged  operation.  The  SF  comment  is  not  transferred  to  the

single operations.

You cannot record SF comments for the single operations because the single operations are not

displayed on the AIP.

With  split  operations,  the  SF  comment  is  only  stored  for  the  split  operation  where  the  SF

comment has been recorded. The SF comment is not transferred to the split master.

1.13.2  Documents

You  can  display  documents,  graphics  or  other  files  on  the  AIP,  which  are  listed  in  the  table  in  tab

Documents.

Select an  entry in  the  list  and touch/click the button  Open document. The file  is downloaded to the  AIP

and displayed using an internal viewer or an external application (according to the file extension).

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 13 of 22

BDE and MDE Functions

Internal viewer

Supported formats for the internal viewer: txt, ini, avi, tif, tiff, jpg, jpeg, dcx, eps, ico,  pcx, pcc, png, ppm,

pgm, pbm, tga, vst, afi, wmf, emf, bmp.

Supported formats for external HTML viewer: htm, gif, wmv, mpg,

External applications

You must install external applications if other file formats (file extensions) than the ones mentioned above

are used (e.g. PDF files). The customer is responsible for the installation.

http links as document references

You can also pass http links to a browser for display without having to download a file beforehand. Use a

path  with  the  ”http”  schema  (paths  are  configured  on  the  client  via  System  administration  >  System

settings > Paths).

These links are displayed using the internal HTML viewer provided by the  AIP. The file extension does

not affect the selection of the viewer.

Also  the  default  browser  configured  in  Windows  can  be  used  for  the  display.  To  do  so,  configure  the

following option in the “hytnrcfg.ini” file:

[Terminal->USR 0]

HTTPBrowser=standard

This setting is not recommended for an AIP with touch screen, because the operation of a browser can

lead to problems.

1.13.3  Tools, Resources

The tab Tools, Resources displays the production resources and tools required for an operation.

Note: Documents are displayed separately in tab Documents.

1.13.4  Components

The tab Components displays the material components required for the operation.

1.13.5  Progress

The tab Progress displays information on the status of the different operations of the order that includes

also the currently the selected operation. The below-mentioned data is shown:

  Order
  Operation
  Operation designation

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 14 of 22

BDE and MDE Functions

  Color of the status according to the control indicator of the status:
  S – (no color), V – gray, L – light green, U – yellow, E – green

  Status (text) of the operation
  Target quantity of the operation
  Quantity unit of the operation
  Yield that has been posted so far for the operation
  Quantity unit of the operation
  Workplace that is assigned to the operation according to the order management. It does not matter

if the operation is planned for this workplace or not.

  Group the workplace is assigned to according to the workplace configuration.

1.13.6  Resource performance accounts

In  tab  Resource  performance  accounts,  the  following  information  is  displayed  for  the  resource

performance accounts (RPA) 1 to 11 of the current operation:

  RPA abbrev.

  RPA designation

  Posted duration in hours:minutes

  Total duration = total of all times of RPA 1...11

The durations are displayed in a graphic (to the right).

1.14  Machine information (machine info)

The machine information dialog provides the views and functions listed below.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 15 of 22

1.14.1  Description

BDE and MDE Functions

The tab Description shows information on the machine/workplace

Workplace/machine

Number of the workplace/machine according to configuration

Short name

Short name of the workplace/machine according to configuration

Group

Group the workplace/machine is assigned to according to configuration.

Partitioning

The current partitioning and the incoming cycles are used to calculate the number of parts per cycle

posted for the workplace/machine.

Target cycle

Current target cycle used to monitor the workplace/machine.

Status

Current status

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 16 of 22

BDE and MDE Functions

Status since

Point in time that specifies the beginning of the current status.

Duration

The duration specifies how long the current status has been available.

Yield

If the workplace has been  configured as MDE  workplace, this field shows the  yield that has been

posted in the current shift up to now.

Scrap

If the workplace has been configured as MDE workplace, this field shows the scrap that has been

posted in the current shift up to now.

Cycles

If the workplace has been configured as MDE workplace, this field shows the cycles that have been

recorded in the current shift up to now.

1.14.2  Registered persons

This overview shows the staff currently logged on to the workplace.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 17 of 22

BDE and MDE Functions

Use the following buttons to perform postings for staff:

  Log on person,

  Log off person or

  Log off everyone (on the next button page)

Click Close information to get back to the main view.

1.14.3  Status log

At first, the table shows the following events of the current shift:

  All machine/workplace statuses

  Production lock (set manually, removed manually)

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 18 of 22

BDE and MDE Functions

  Postings relating to orders (OP logged on, OP interrupted, OP logged off)

  Postings relating to staff (person logged on, person logged off)

Use  the  buttons

  and

  to  scroll  back  and  forth  shift  by  shift.  You  can  configure  for  the

specific  terminals  how  many  shifts  you  can  scroll  back  and  forth.  Use  the  following  option  in  the

hytnrcfg.ini (3 shifts by default):

[MDE->Options 0]

MSTAT.SKNRRANGE=3

In the above example, the screen shows shift 1 if you click

 in shift 3. Scrolling back has the same

behavior.

Subsequent assignment of reasons

If the machine monitoring function is active, the status switches to the “not assigned” status in case of an

absence of signals. When the malfunction has been removed, the machine immediately switches into the

production status. The operator cannot enter a reason for this status.

In the status log, you can now list these statuses without reason and subsequently assign a reason to the

statuses.

Statuses without reason are statuses that the system has automatically set from "not assigned"

to "production" in the course of an active machine monitoring. The production indicator “general

disturbance” is assigned to this status and the relevant time is posted for this status.

If  an  operator  manually  sets  a  status,  this  status  usually  has  a  reason  assigned,  also  if  the

operator uses the production indicator “general disturbance”.

If you enable the checkbox Display statuses without reason only, you can filter the list and directly show

the  statuses  without  reason  only  (i.e.  automatically  assigned  reasons).  These  statuses  can  then  be

changed.  Note:  When  you  have  changed  the  selection,  you  must  reload  the  list  using  the  green  arrow

button!

The  Change  status  button  gets  active  when  you  select  a  status  without  reason.  You  cannot  change

statuses set manually by the user. The button is grayed out (disabled).

If you click the Change status button, you can subsequently assign a reason to this status.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 19 of 22

BDE and MDE Functions

Note

Restriction: Only the MDE data (log records) is changed when you subsequently assign a reason.

Postings of other objects (e.g. BDE log records) are not changed.

You cannot subsequently assign reasons to "Short-term disturbances/malfunctions".

1.15  Merged operations

General information

You use these functions to create or to end “merged operations” (MOP) on the AIP terminal. A merged

operation  includes  a  group  of  single  operations.  The  system  records  the  time  for  the  merged  OP  and

proportionally distributes the time to the single OPs. Each person can manage a maximum of one merged

operation.

You require a license to use the functions for merged operations on the AIP.

To merge operations, you must click the button Log MOP on in the workplace screen. Merged operations

are  logged  off  and  interrupted  like  single  operations  using  the  Interrupt  operation  or  Log  operation  off

buttons.

With  merged  operations  created  on  the  terminal,  you  can  only  perform  logon/logoff/interrupt

postings on the terminal. The same also applies to the single operations included  in a merged

operation. Postings on the MOC are not possible.

Also  note  that  there  are  some  restrictions  for  merged  operations  that  are  described  in  the

documentation  MBL_CollectiveOperationProcessing.pdf.  Not  all  postings  are  possible  that  are

possible with normal operations.

1.15.1  Log merged operation on

You can combine up to 20 operations to form one merged operation. On the AIP, only one operation (the

new merged operation) is then displayed in the list of running operations..

Posting process

Select a workplace, before you log on a merged operation. When you then call the dialog, the workplace

field is already populated.

Calling the function Log MOP on

Click the Log MOP on button in the workplace dialog. The user is navigated through the dialog.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 20 of 22

BDE and MDE Functions

Choose status

Enter the status number. Optionally, you can also enter the estimated duration and a comment.

Choose operation

Select  all  single  operations  from  the  list  that  you  want  to  integrate  in  the  merged  operation.

Manually select the operations in the list as usual.

When  you  have  selected  the  single  operations,  click  the  button  Add  operation.  All  selected

operations are displayed in green in the list:

Staff badge number

Enter the staff badge number here. With merged operations, the person is always logged on  with

the operation, i.e. a separate staff logon is not possible.

Confirmation via Start merged operation

The specified operations are immediately logged on. If the terminal is ONLINE, the system makes a

validation check for all entries.

When the merged operation is successfully logged on, an entry in the order overview is generated.

This entry includes the characters “SAM-“ for merged operation and the badge number (e.g. 0160).

The merged operation of the example would therefore be: SAM-0160.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 21 of 22

BDE and MDE Functions

1.15.2

Interrupt/log merged operation off

You  interrupt  or  log  off  a  merged  operation  like  single  operations.  Select  an  operation  named  SAM-

<badge number> from the list of running operations.

Posting process

Select the workplace and the merged operation that you want to log off.

Calling the function

Click the button Interrupt operation or Log operation off.

Log merged operation off

Enter the badge number of the person who performs the logoff.

Choose status

Enter the status number. Optionally, you can also enter the estimated duration and a comment.

Choose operation

If the entry of quantities is configured for merged operations in the terminal configuration, a list of

the  different  operations  is  displayed.  To  upload  part  quantities,  you  can  select  the  relevant  single

operation, enter the required quantity and click the button Partial confirmation. The system does not

immediately upload the quantities entered here. The quantities are only uploaded when you confirm

the dialog by clicking the button Interrupt/Log off merged operation. If the dialog is canceled (ESC

key  or  Cancel  button),  the  dialog  is  closed  and  no  data  is  uploaded.  The  partial  confirmation  is

discarded.

Confirmation of the dialog Log off/Interrupt merged operation

The merged operation is logged off or interrupted when you confirm the dialog.

If the order is properly logged off, the merged operation is unmerged. After interruption, the single

operations are available again in the sequencing list.

The quantities are posted according to the configuration and using the part quantities uploaded.

Further notes



If you do not enter a quantity with the function Interrupt merged operation, then no quantities are

posted.  With  the  function  Log  merged  operation  off,  the  target  quantity  is  booked  as  yield

quantity.



If  you  interrupt  a  merged  operation,  the  system  interrupts  all  single  operations  assigned  to  the

merged  operation.  As  a  result,  the  sequencing  list  does  not  include  the  merged  operation  after

interruption, but the single operations. If you want to log on a merged operation again, you must

again select or assign the single operations.

AIP_BDE-MDE.docx

Version: 1.11.18468

Page 22 of 22


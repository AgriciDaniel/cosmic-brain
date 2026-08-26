Status Assignment

1  Status Assignment

HYDRA menu

Master data  Workplaces/ machines  Status assignment

FEDRA menu

Detailed scheduling  Master data  Status assignment

Transaction code

mst

Function authorization  mdmst

You  can  create  statuses  for  all  workplaces/  machines.  The  status  shows  the  current  status  of  the

workplace/ machine.

Purpose

All possible statuses or malfunctions at the machine/workplace are configured in the  Status assignment

and assigned to the status texts by distinct status numbers. If malfunctions are detected on the terminal,

the system uses the statuses documented in the status assignment.

Example of how a status table is set up :

Status

Status text number

1

1

2

3

3

4

4

5

5

6

6

2

12

12

RPA

MUT

LCI

SCI

SET

BKS

DCI

DCI

Control indicator

Production  Malfunction  Malfunction  Malfunction  Malfunction  Malfunction

Gen.

disturbance

Manual assignment via















the terminal (Manually at

terminal)

Automatic assignment















via digital input

Digital input

Assignment on the

machine interface

1

0

2

2

3

1

4

3

0

-

6

7

0

-

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 1 of 10

Status Assignment

The entries are based on the status texts listed below:

1

2

3

4

5

6

Production

Tool breakage

No raw material

Staff shortage

Setup

Break

12

Gen. disturbance

This is only an example illustrating the status assignment.

The  selection  dialog  allows  you  to  select  and  view  the  statuses  that  have  already  been  assigned  to  a

machine or a workplace.

Integration

The workplace/ machine status is integrated in various evaluations/reports.

Requirements

You have to create the following objects before you can assign workplace/ machine statuses.

  Workplace/machine

  Status text

  Status class (optional)

  Resource Performance Account (RPA)

Toolbar

Status list

Click the "Status list" icon to open the report including the defined and selected statuses.

This report shows the statuses in printable form as plain text and as bar code. Click here

Machine status list report to find detailed information.

Selection criteria

The application provides the following selection criteria:

Workplace

Select the workplace/machine for which you want to display the statuses.

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 2 of 10

Status

Select  the  defined  workplace/machine  statuses.  The  application  shows  the  statuses  of  all

Status Assignment

workplaces/machines matching the entered status number.

Status text

Select the defined status text. You can also use wildcards.

RPA abbrev.

Abbreviation for the assigned Resource Performance Account

Status class

Abbreviation for the assigned status class

Field descriptions

Notes on status 30000

You can only change selected options for status 30000:

  Warning in the graphic machinery

  Activate production lock

  Activate machine lock

  Record scrap reasons

Certain fields such as status class, RPA, control indicator are not filled with this status and are

therefore empty in the list.

General tab

Machine/workplace (short name)

Enter the machine number to assign the disturbance status to a machine. Enter the same number

in this field for all statuses of a machine in order to create a complete status table for a machine.

The short name includes the name of the entered or selected machine.

Status

This  field  includes  the  unique  number  for  statuses  included  in  the  status  table.  You  can  also  use

this number to assign and/or change the status via the terminal.

You can only define one status for workplaces of the type "group workplace". Assign the

characteristic "production" (see "control" tab) to this status.

Note: You cannot delete the status 30000 "Not assigned". You can only configure specific fields for

this status.

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 3 of 10

Status Assignment

Superior status

If no status is defined in the Superior status field, the currently created status is at the highest level.

Otherwise,  enter  the  number  of  the  directly  superior  status.  This must  already  exist  and  have  the

control indicator Hierarchy level.

Note: This function is available only for Windows terminals.

Status text

The number assigned here refers to the plain text status message from the status text table.

Status class

Assign a status to a status class to make cumulative evaluations/reports about status classes. The

abbreviation assigned here refers to the plain text status class message from the status class table.

Resource Performance Account (RPA)

Enter  a  value in this field to assign the status to  a Resource Performance Account (RPA).  Select

one of the 12 Resource Performance Accounts (RPA).

By  default,  the  12  Resource  Performance  Accounts  are  already  defined  in  HYDRA.  Refer  to  the

glossary for further information on the Resource Performance Accounts.

Control tab

Control indicator

The following characteristics are available to specify machine monitoring.

Except  for  the  "production"  characteristic,  all  following  characteristics  are  only  allowed  for

machines/workplaces of the type "individual workplace".

Production

Production  identifies  the  production  state/status  of  a  machine/workplace.  Assign  the  "production"

characteristic to exactly one status for each workplace.

If

the  machine  monitoring  system  detects  production  signals,

then

the  status  of

machines/workplaces of the type "single  workplace" is changed to the status to which this control

indicator is assigned.

Only  one  status  is  allowed  for  workplaces  of  the  type  "group  workplace"  and  this  status  must  be

assigned this control indicator.

Other status

Assign  the  control  indicator  "other  status"  for  all  statuses  without  a  control  indicator.    You  can

assign this control indicator/characteristic to any number of statuses for each individual workplace.

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 4 of 10

Status Assignment

General disturbance

Create exactly one status as general disturbance for each machine/workplace. If the machine data

collection detects a production phase that has not yet been assigned a disturbance or status, then

this duration is posted to the status assigned to the control indicator for the general disturbance.

Material change

This option is only available with the MPL module.

If a workplace has a status with this indicator, materials that are not planned can also be logged on.

These  materials  are  logged  on  as  alternative  material,  which  means  that  you  log  on  some  other

material  instead  of  the  planned  material.  You  can  specify  in  the  status  assignment  if  alternative

materials may be logged on. As a result, you have to configure at least one "Setup" status with the

"Material  change"  option  in  order  to  enable  the  desired  posting  behavior.  If  the  machine  is  in  a

status that is assigned the "material change" option, you can log on the alternative material already

when you log on the operation. In this case, you do not even have to change the status beforehand.

No order

If  you interrupt  or log off an operation manually, the  Windows terminal verifies whether this  is the

last operation of the workplace. If no more operations are logged on to this workplace, the terminal

sets the workplace status to the status assigned to the "No order" option.

This option is only available for Windows terminals (CTWIN/AIP).

A  status  with  this  control  indicator  may  only  be  configured  at  machine/workplace  of  the

type "single workplace". You may configure only one status with this control indicator.

Do not configure a status  with  the control indicator  "No order"  at  workplaces of the  type

"group workplace", since only the status "Production" is available at group workplaces.

Short-term status (as of MDE 7.2)

For an optimized overview, for example in the status log or machine history, you can configure one

status per machine  as a short-term disturbance.  Use this status as a “repository” for unconfirmed

statuses, which only existed for a specific (short) period.

If  the  terminal  identifies  a  downtime  and  the  machine  automatically  returns  to  the  status

"production",  the  system  verifies  if  this  disturbance  took  less  time  than  configured  for  short-term

disturbances.

If this is the case, the still unfounded malfunction is justified with the status that is configured as the

"short-term disturbance" status for the machine.

The system does not differentiate between such automatic status postings (automatic assignment

of reasons) for short-term disturbances and reasons entered manually by operators. The duration of

short-term disturbances is ignored with automatic shift changes.

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 5 of 10

Status Assignment

Hierarchy level

Assign  the  option  "hierarchy  level"  to  statuses  that  cannot  be  recorded  via  the  terminal.  These

statuses only represent the hierarchy.

This  function  is  only  available  for  Windows  terminals.  In  this  case,  you  can  neither  change

specific configurations nor enter data in certain tabs.

Estimated downtime

If you assign a status manually, you can enter an estimated downtime. In this case, the application

suggests the downtime that is stored in the master data.

If statuses are changed automatically, the system assigns the downtime stored in the master data

automatically.

Activate production lock

If this option is set, the production lock (P lock) is automatically activated when a status is assigned

via the terminal.

If you use the machine monitoring function, the  production lock option prevents the machine from

switching automatically to the status "production" when a production signal arrives. Consequently,

this  status  overrides  the  production  signal  until  you  manually  disable  the  production  lock  option.

The production lock can also be used to determine whether and how quantities (counter readings)

are posted during this time.

Setting the machine lock output

You have to set this option, if you want the machine lock to be enabled when assigning statuses.

In this case, you also have to ensure that the machine lock output has been configured accordingly

in the machine configuration.

Warning in the graphic machinery

The  entry  determines  the  time  after  which  the  symbol  (more  precisely:  the  part  of  a  symbol  that

represents the status in color) starts flashing in the Graphic machinery after the workplace/machine

status has occurred. Enter the value in the format hours: minutes: seconds.

Status change tab

Manually via the terminal

If  this  option  is  selected,  you  can  enter  the  status  manually  via  the  terminal  (using  barcode  or

keyboard). If this option is not selected, the status selection list of the terminal will no longer show

the status.

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 6 of 10

Status Assignment

Authorization

Access  authorization  for  entering  a  status  via  the  terminal  (enter  a  value  between  0  and  9).  An

authorization  level  for  machine  status  modification  is  defined  for  every  person  in  the  HR  master

data. If the authorization level stored in the master data is lower than the authorization level defined

here, you cannot assign the status via the terminal.

Automatically via digital input

Select this option, if you want the statuses to be assigned automatically via the machine interface

(CT-MSS, CT-UMPS, PCC). Enter the number of the digital input identifying the status in the "digital

input" field (0 = no input).

If you monitor machines via the operating signal  , a digital input also records the operating signal.

Proceed as follows to define a status as an operating signal:

- Control for machine monitoring: "Production"

- Select the option "Automatically via digital input"

- Enter a value > 0 in the "digital input" field. This input records the operating signal.

In  the  case  of  disturbance  reasons,  a  general  distinction  is  made  between  automatically  and

manually recorded disturbance reasons. Distinguishing features are:

  Disturbance  reasons  you  enter  manually  at  the  terminal  override  automatically  set

disturbance reasons.

  Operating  signals  do  not  override  a  status  you  set  manually.  Except  for  operating

signals for the status "production" (see next bullet point).  The  "production" status also

overrides a manually set status.

If  no  production  lock  is  set,  the  status  with  the  control  indicator  "Production"  overrides  every

disturbance reason. Therefore, keep in mind that the status "Production" must be deactivated, if

you want a current disturbance to be processed at the input.

If  multiple  automatic  statuses  (disturbance  reasons)  are  recorded  via  digital  inputs,  the  status

with the lowest HYDRA channel number (not the lowest status number!) is set.

Note that the assignment of the number to the physical connection at the MSS depends on the

settings  in  the  local  terminal  configuration  file  (Windows  terminal:  CTWIN.INI/CTAIP.INI,  DOS

terminal: AIOP.CFG).

If  a  status  is  to  be  processed  automatically  by  the  machine  based  on  the  transferred  HYDRA

status number (MSTAT), this option "Automatically via digital input" must be activated and the

field "Digital input" must be assigned the value "0".

If a digital input and a status number (MSTAT) for a machine status are set at the same time for

a machine, the status of the digital input at the machine is set. The digital input therefore has a

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 7 of 10

Status Assignment

higher priority than the status via MSTAT.

Digital input

Number of the digital input used to set the status.

Status transfer to aggregates

This option allows you to set a global status at the production line, which is then automatically set

for all aggregates assigned to it.

The requirement for this is that this status is also configured for all assigned  aggregates and that

the status number for the aggregates is identical to the status number of the production line.

Processing tab

Log off staff

Please note: the weekend automatic function (status 999) does not support this option.

If  you  select  this  option,  the  system  logs  off  all  persons  currently  logged  on  when  a  status  is

assigned (useful during maintenance phases). Otherwise, the persons stay logged on.

Operation posting

Please note: the weekend automatic function (status 999) does not support this option.

Use the option "operation posting" to have an overhead cost order logged on automatically when

statuses change. The following options are supported:

None

No processing.

Interrupt OP

Use this setting to interrupt automatically all active operations and to log off all employees from the

workplace if this machine status is set.

Interrupt active OP and log on the following OP

Use  this  option  to  interrupt  all  active  operations  and  to  log  off  all  employees  when  statuses  are

changed.  The  system  automatically  logs  on  the  "subsequent  operation"  stored  in  the  Operation

field.

Please note: The subsequent operation must not be subject to batch management.

Transfer registered persons to OP

Depending on this setting, the system transfers the persons logged in to the "subsequent operation"

defined in the Operation field.

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 8 of 10

Status Assignment

If the operation is an overhead cost operation  or if the workplace is a group workplace (GAP), then

at least one person is logged on to the subsequent OP:

- either the person carrying out the posting, or

-  the  person  who  is  logged  on  the  longest  if  the  change  status  dialog  does  not  include  a  field  to

enter the staff badge number. If no employee is logged on  at this time, the subsequent operation

cannot be logged on.

Scrap reason

Depending on the current status, you can post automatically recorded scrap to a defined reason.

A  distinction  is  made  in  the  process,  whether  the  production  lock  is  set  or  not  while  the  status  is

active. You can choose from the following configuration options:

- scrap reason

- scrap reason during production lock

A counting input explicitly defined as a scrap counter generally takes priority over a reason defined

here.

Plausibilities tab

Check running operation

You can configure statuses,

- if an OP is logged on to the workplace

  Use Option An operation must be logged on

- if no OP is logged on to the workplace

  Use Option An operation must not be logged on

- if an operation is logged on to the workplace or not

  Use Option No check

HYDRA  checks  this  dependency  during  the  manual  status  change  and  during  the  manual

login/logout or interruption of operations. If the posting violates the condition, the terminal issues an

error message and refuses the posting.

If  a  new  status  is  set  when  an  operation  is  terminated  or  interrupted,  then  this  status

cannot be an order-related status!

Use of unplanned material allowed

This option is relevant if you use the HYDRA module Material and Production Logistics (MPL). If the

option  is  set,  you  can  use  unplanned  material.  That  means,  you  can  log  on  batches  that  are  not

specified in the input material list of the operation as input material. This can be useful during setup.

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 9 of 10

Status Assignment

Tab User fields

User field key

This field of the object type MST is preset with the user field key DEFAULT. Normally, you cannot

change this assignment. MPDV defines the user fields for this user field key during the customizing

process to meet specific customer requirements.

MOC_WorkplaceStatusAssignment.docx  Version: 1.12.23294

Page 10 of 10


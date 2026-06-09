Workplaces/Machines

1  Workplaces/Machines

Overview

Menu

Production Facility Management  Current Information
 Workplaces/Machines

Transaction code

wpov

Function authorization  wpov

Purpose

The  application  Workplaces/machines  provides  an  evaluation  for  the  production  management.  It  is

intended  for  the  following  users:  users  from  production  scheduling  and  monitoring,  schedulers,

supervisors,  operators  or  all  MOC  users  who  would  like  to  get  a  comprehensive  overview  of  the

production situation at specific workplaces/machines or a complete organizational unit.

Integration

The application  Workplaces/machines provides all kind of information that is relevant for workplaces. In

addition to master data, the function also provides data required to control production processes.  These

are, for example:



current workplace/machine status

  operations currently running at the workplace/machine



currently used tools and resources



cycle progression of the shift (for machines with clocked production)

  output per shift: quantities, durations

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the machine or workplace master data. You can

also use wildcards (placeholders *).

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 1 of 17

Workplaces/Machines

Group from … to …

This  selection  criterion  refers  to  the  group  stored  in  the  machine  or  workplace  master  data.  The

application shows all workplaces/machines assigned to the selected group. You can also use wildcards.

Report group

This  selection  criterion  refers  to  the  report  groups.  The  application  shows  all  workplaces/machines

assigned to the selected report group.

Designation

This  field  refers  to  the  name  of  machines  and  workplaces  defined  in  the  machine  master  data.  The

application only shows the machines matching the specified character string. You can also use wildcards

(placeholders *).

Short name

This selection criterion refers to the short name of machines in the master data. The application shows all

machines or workplaces matching the entered character string. You can also use wildcards.

Responsibility area

This selection criterion refers to the responsibility area stored in the machine master data. Note: The user

can only view those machines that are included in the responsibility areas assigned to the user.

Company

This  selection  criterion  refers  to  the  company  defined  in  the  machine  or  workplace  master  data.  The

application  shows  all  workplaces/machines  assigned  to  the  selected  company.  You  can  also  use

wildcards.

Cost center

This selection criterion refers to the cost center stored in the machine and/or workplace master data. All

workplaces/machines assigned to the selected cost center are displayed. You can also use wildcards.

Status

This  selection  criterion  refers  to  the  current  status  of  machines  or  workplaces.  All  machines  or

workplaces, which are currently assigned to the selected status, are displayed.

Status longer than

This selection criterion refers to the current status of machines or workplaces. All machines or workplaces

are  shown  that  are  currently  assigned  to  the  selected  status  and  that  are  assigned  to  this  status  for  a

longer period than the one specified.

If several selection criteria are used, the application  Workplaces/machines shows the results that match

all selection criteria.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 2 of 17

Workplaces/Machines

Detail application Workplaces

The detail application Workplaces displays all workplaces in accordance with the selections made in the

selection panel. The application displays the current status, workplace information, shift quantities, cycles

and number of strokes. The following paragraphs describe the data available in the table. This data might

not be displayed by default. Use the column selection function to add the required data.

In  addition  operation-related  data  is  shown,  if  an  operation  is  currently  logged  on.  In  case  several

operations are logged on, only the first operation is shown in the detail application.

Status

The Status column summarizes the different statuses and presents them as an "LED". The colors

are as follows:

Light green

Status with RPA 11 (normally "Production")

Blue

Red

Gray

Status with RPA 7 (normally "Setup")

Status 30000 (normally "Not assigned")

Status 20000 or status with RPA 12

(normally break/no shift

Yellow

Status < 10000 and RPA <> [7,11,12]   other statuses/downtimes

Master data:

Workplace

Unique ID defined in the workplace configuration.

Short name

Machine name as defined in the workplace configuration.

Designation

Long text/comment on the machine as defined in the workplace configuration.

Gruppen

Group the machine is assigned to in the workplace configuration.

Cost center

Cost center as defined in the workplace configuration.

Company

Company as defined in the workplace configuration.

Responsibility area

Responsibility area required to view this workplace as defined in the workplace configuration.

Type

Workplace model according to workplace configuration.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 3 of 17

Workplaces/Machines

Type

Workplace type according to the workplace configuration.

Status

Status

Status  number  of  the  status  that  is  currently  active  at  the  workplace.  Color  of  the  currently  active

status according to configuration.

Status name

Status name of the status that is currently active at the workplace.

Status since

Date when the status was assigned.

Status since

Point in time when the status was assigned.

Duration so far

Present duration of the status that is currently active at this workplace.

Predicted duration

Expected  duration  of  the  malfunction  entered  by  the  employee  when  assigning  the  status  in  the

terminal or the duration that is stored in the status configuration.

Expected end

Calculated  point  in  time  when  the  malfunction  ends.  The  calculation  is  based  on  the  predicted

duration.  The  end  time  is  calculated  using  the  values  of  Date  +  Predicted  duration,  synchronized

with the Gregorian calendar.

Expected remaining runtime

Expected end minus current time, i.e. "now". If the remaining runtime is negative the expected end

is already overdue. In this case, the field is highlighted in red.

Do  not  confuse  the  expected  remaining  runtime  of  the  malfunction  with  the  remaining

runtime of the operation.

Shift quantities, primary quantity unit/secondary quantity unit/tertiary quantity

unit/base quantity unit

Yield

Yield that has been posted so far at the selected workplace within the current shift.

Scrap

Scrap that has been posted so far at the selected workplace in the current shift.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 4 of 17

Workplaces/Machines

Rework

Rework quantity that has been posted so far at the selected workplace in the current shift.

Open quantity

Open quantity that has been posted so far at the selected workplace within the current shift.

Unit

Unit of primary quantity

Zyklus

Target cycle

Current target cycle at the workplace.

If an operation is logged on to the machine the target cycle defined for the operation is displayed in

seconds per cycle. There is no target cycle for machines to which no OP is currently logged on. In

this case, “0” is entered in the “target cycle” field.

Actual cycle

Current actual cycle of the workplace

Colored display of the actual cycle relating to the configured cycle parameters.

Difference (%)

The  difference  in%  is  calculated  according  to  the  following  formula:  (target  cycle  -  actual  cycle)  /

target cycle * 100%. If the actual cycle is slower than the target cycle, the difference is indicated in

negative values, otherwise positive values are shown. See below for coloring.

Actual cycle (OP)

The actual cycle (OP) is a value referring to the order. The values used for the calculation all refer

to order logons and, as a result, they are independent from the current machine status.

Formula: Actual cycle OP = RPA11 OP/ (Yield OP / Partitioning OP)

Difference (OP) (%)

The  difference  OP

[%]  column

is  computed  according

to

the

following

formula:

DifferenceOP = Abs((target cycle number – actual cycle number OP) * 100) / target cycle number

Cycle number [1/min]

Target cycle number

1 / Target cycle

There is no target cycle for machines to  which no OP is currently  logged  on. For this reason, the

target stroke number is 0.

Actual cycle number

1 / actual cycle

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 5 of 17

Workplaces/Machines

Difference (%)

(target cycle number – actual cycle number) / target stroke number * 100%

Please note: For rounding reasons, the difference indicated here might deviate from the difference

shown in the "cycle" category.

Actual cycle number (OP)

The actual cycle number (OP) is a value relating to orders. The values used for the calculation all

refer  to  order  logons  and,  as  a  result,  they  are  independent  from  the  current  machine

status.Formula: Actual cycle number OP = yield OP/ (partitioning OP * RPA11 OP)

Difference (OP) (%)

The difference OP column is computed by the following formula:

DifferenceOP = Abs((target cycle number – actual cycle number OP) / target cycle number * 100)

Coloring of the column Difference

In  the  master  data,  you  can  define  the  coloring  of  the  Difference  column  in  the  Cycle  category  per

machine  for  the  upper/lower  action  limits  or  upper/lower  tolerance  limits  (menu:  master  data  >

workplaces/machines  >  cycle  parameters).  The  value  with  a  sign  showing  the  difference  is  used  for

coloring. The value in the difference column is displayed in red if the tolerance limits are exceeded; the

value is displayed in blue if the action limits are exceeded. The data is not displayed in color if no cycle

parameters are defined.

Order quantities

This  category  displays  data  relating  to  quantities  of  the  operation  currently  logged  on.  In  case  several

operations are logged on, only the first operation is shown in the detail application.

Target quantity (P)

Target quantity (primary quantity unit) of the operation currently logged on.

Target scrap (P)

Target scrap (primary quantity unit) of the operation currently logged on.

Yield (P)

Posted yield (primary quantity unit) of the operation currently logged on.

Scrap (P)

Posted scrap (primary quantity unit) of the operation currently logged on.

Rework (P)

Posted rework (primary quantity unit) of the operation currently logged on.

Open quantity (P)

Posted open quantity (primary quantity unit) of the operation currently logged on.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 6 of 17

Workplaces/Machines

Total quantity (P)

Total of yield + scrap + rework + outstanding quantity (open quantity)

Unit (P)

Unit of the primary quantity unit of the operation currently logged on.

Difference [%]

This difference identifies the percentage that is still to be produced to reach the  target quantity  of

the operation. To this end, the already posted yield (P) is set in ratio to the target quantity (P):

Difference = 100 – (100 / target quantity (P) * yield (P))

The result is displayed with 2 decimal places.

Times relating to operations

This category displays the durations which are posted to the individual resource performance accounts of

the logged on operation.

Detail application Image

The  picture  in  the  Image  detail  application  shows  the  picture  of  the  machine  as  stored  in  the  machine

configuration. The image of the machine selected in the detail application “workplace” is displayed.

The following image formats are supported: jpg, gif, png, tif, bmp, ico, emf, and wmf. The pictures have to

be filed in a directory that may be accessed via the path ID “MOCWPIMG” within the path configuration.

Further information on the configuration can be found here.

Detail application Operations logged on

The  detail  application  Operations  logged  on  shows  all  operations  that  are  currently  logged  on  to

workplaces/machines  which  are  selected  in  the  detail  application  “Workplaces”.    The  following

paragraphs describe the data available in the table. This data might not be displayed by default. Use the

column selection function to add the required data.

Workplace

Workplace

Workplace where the operation is logged on.

Order

Order

Order number of the operation.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 7 of 17

Workplaces/Machines

Sequence

Sequence number of the OP (if sequences are used).

OP

Split

SOP

Operation number

Split number of the operation (if the split function is used).

Sub operation number (reserved).

OP name/designation

Designation of the operation

Article

Article number produced by the operation; taken over from operation data.

Login

Date

Date when the operation was last logged on to this workplace

Time

Time when the operation was last logged on to this workplace

Primary quantity/secondary quantity/tertiary quantity/base quantity

Target quantity

Target quantity of the operation

Unit

Yield

Unit of primary quantity

Yield that has been posted so far to the operation

Scrap

Scrap that has been posted so far to the operation

Rework

Rework quantity that has been posted so far to the operation

Open quantity

Open quantity that has been posted so far to the operation

Yield/target quantity [%]

Proportion of yield to target quantity in %

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 8 of 17

Workplaces/Machines

Yield since logon

Yield since the operation is logged on

Detail application Staff logged on

The detail application Staff logged on shows all persons who are logged on to the workplace selected in

the detail application “Workplace”.  The following paragraphs describe the data available in the table. This

data might not be displayed by default. Use the column selection function to add the required data.

Workplace

Workplace

Workplace where the operation is logged on.

Person

Name

The person’s name as defined in the HR master.

First name

The person’s first name as defined in the HR master.

Name

The person's complete name as defined in the HR master (last name, middle name and first name)

Company

Company the person is assigned to in the HR master.

Personnel number

Unique key to identify the person. (Key)

Staff badge number

Staff badge number assigned to this person in the HR master.

Operator position/function

Abbreviation of the operator's function ("operator position") that has been selected when the person

logged on to the machine.

Operator position/function

Unique  key  of  the  operator  position  that  has  been  selected  when  the  person  logged  on  to  this

machine.

Order

Order

Order number of the operation.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 9 of 17

Workplaces/Machines

Sequence

Sequence number of the OP (provided that sequences are used).

OP

Split

SOP

Operation number

Split number of the operation (provided that the split function is used).

Sub operation number (reserved).

OP name/designation

Designation of the operation

Article

Article number produced by the operation; taken over from operation data.

Login

Date

Date when the operation was last logged on to this workplace

Time

Time when the operation was last logged on to this workplace

"Advance logon" option

If this option is set, the person is logged on automatically when shifts change the next time.

Detail application Resources logged on

The  detail  application  Resources  logged  on  shows  all  resources  which  are  logged  on  to  the  workplace

selected in the detail application Workplace. The following paragraphs describe the data available in the

table. This data might not be displayed by default. Use the column selection function to add the required

data.

Workplace

Workplace

Workplace where the operation is logged on.

Resource

Resource type

Resource type to which the resource is assigned.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 10 of 17

Workplaces/Machines

Resource

Resource ID that is entered in the resource master data.

Designation

Resource designation recorded within master data.

Resource family

Resource family (internal ID) to which the resource is assigned.

Login

Date

Date when the resource was last logged on to this workplace.

Time

Time when the resource was last logged on to this workplace.

Detail application Maintenance

The  detail  application  Maintenance  shows  all  active  maintenances  for  the  workplace  that  is  currently

selected  in  the  selection  panel.  The  following  paragraphs  describe  the  data  available  in  the  table.  This

data might not be displayed by default. Use the column selection function to add the required data.

Maintenance

Active

Light green:

Active

Status

Status of maintenance activity

Green

Blue

"blue" threshold has been exceeded

Yellow

"yellow" threshold has been exceeded

Red

"red" threshold has been exceeded

Maintenance

Maintenance name

Type

Maintenance type defined for the maintenance:

T

B

Z

(cycle-based)

(operating hours)

(time-based)

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 11 of 17

Workplaces/Machines

Class

Maintenance class

Non-recurring maintenance

Flag indicating that this maintenance is only performed once.

Valid from

Start of maintenance validity. A maintenance can only fall due within the validity period.

Valid until

End of maintenance validity.

Maintenance order

Maintenance order assigned to this maintenance.

Date

Time

Date when this maintenance was last carried out at the selected machine.

Time when this maintenance was last carried out at the selected machine.

Modified by

Person (user) who reset the last maintenance.

Actual cycles

Number of cycles accrued so far.

Next maintenance after

Counter reading of cycles when the next maintenance is to be performed.

Interval

Interval within which the maintenance is to be performed; from the maintenance configuration.

Actual duration

Operating  hours,  which  have  been  posted  so  far  onto  the  resource  –  according  to  resource  type

settings.

Next maintenance after

Meter reading of the operating hours counter triggering the next maintenance to become due.

Interval

Interval  in  hours  within  which  the  maintenance  is  to  be  performed;  from  the  maintenance

configuration.

Next maintenance on

Date when the next maintenance falls due.

Interval

Interval within which the maintenance is to be performed; from the maintenance configuration.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 12 of 17

Workplaces/Machines

Info 1 - 6

Additional text 1-6 from the maintenance configuration

Detail applicationArticle in production

The  detail  application  Article  in  production  shows  all  output  materials  with  the  relevant  batch  number

which  are  logged  on  to  the  workplace  selected  in  the  detail  application  Workplace.  The  following

paragraphs describe the data available in the table. This data might not be displayed by default. Use the

column selection function to add the required data.

Workplace

Workplace

Workplace to which the batch is logged on.

Material

Material

Material number of the currently produced article

Material designation/name

Material name of the currently produced article, which is taken over from the producing operation.

Material type

Material type of the currently produced article, which is taken over from the producing operation.

Batch number

Current batch numbers produced by the OP using this article.

Quantities

Quantities

Original quantity of the batch

Remaining quantity

Remaining quantity of the batch

Quantity unit

Quantity unit in which the batch is managed.

Login

Date

Date when the batch was last logged on to this workplace.

Time

Time when the batch was last logged on to this workplace.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 13 of 17

Workplaces/Machines

Person

Person (personnel number) who performed the last output batch change.

Detail application Material in use

The  detail  application  Material  in  use  shows  all  input  materials  which  are  logged  on  to  the  workplace

selected in the detail application Workplace. The following paragraphs describe the data available in the

table. This data might not be displayed by default. Use the column selection function to add the required

data.

Workplace

Workplace

Workplace where the input batch is logged on.

Material

Material

Material number of the currently logged on input batch.

Material designation/name

Material  name  of  the  currently  logged  on  material,  which  is  taken  over  from  the  producing

operation.

Material type

Material type of the currently logged on material, which is taken over from the producing OP.

Batch number

Current batch number of the currently logged on input batch.

Quantities

Original quantity of the batch

Remaining quantity

Remaining quantity of the batch

Quantity unit

Quantity unit in which the batch is managed.

Login

Date

Date when the batch was last logged on to this workplace.

Time

Time when the batch was last logged on to this workplace.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 14 of 17

Workplaces/Machines

Person

Person (personnel number) who has performed the last input batch logon.

Detail application Status

The detail application Status is only available, if the extension rstatlist is enabled.

The  detail  application  Status  shows  the  current  machine  status  and  in  parallel  all  current  resource

statuses.

Parallel resource statuses refer to a workplace or a machine. The statuses do not depend

on the WRM resource statuses.

The  entry  of  other  statuses  than  the  machine  status  requires  additional  licenses  and

configurations.

The following paragraphs describe the data available in the table. Some data might not be displayed by

default. Use the column selection function to add the required data.

Status

Status

Number of the parallel Resource status.

Status text

Designation of the parallel resource status

Status type

Number of the Status type the resource status is assigned to.

Login

Beginning of status

Point in time when the status was set.

Duration

Duration since beginning of status. The duration is calculated based on the Gregorian calendar.

The displayed duration of the status type "MST" (machine status) can therefore differ from the value

Duration so far in the detail application Workplaces.

Resource

Resource type key

Resource type of the workplace/the machine - always "MNR"

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 15 of 17

Workplaces/Machines

Resource

Number of the workplace/machine

Detail application Shift times

The detail application  Shift times shows RPA times of the current shift at the  workplace selected  in the

detail application Workplace in a pie chart.

Detail application Shift quantities

The detail application Shift quantities shows the current shift quantities in a bar chart, i.e. yield, scrap in

primary quantity unit. The quantities refer to the workplace selected in the detail application Workplace.

Detail application Cycle progression

The detail application Cycle progression shows the stored cycle values in a line chart in [sec/cycle]. The

chart  displays  the  cycle  progression  of  the  workplace  selected  in  the  detail  application  Workplace.  By

clicking  a  radio  button  the  user  can  decide  whether  they  want  to  display  the  current  shift  or  the  last  x

hours. However, x should be less than 8 hours for performance reasons.

The following limit values are displayed as lines: upper tolerance limit  - UTL (red), lower tolerance limit -

LTL (red), upper action limit - UAL (yellow), lower action limit - LAL (yellow). The limits are computed and

displayed on the basis of the Process parameters configuration.

Please note: The display depends essentially on the size of the detail application.

Detail application Downtime ranking list

The Downtime ranking list shows the top x of current downtimes (status is not production) of the currently

selected  workplace  during  the  current  shift  or  the  last  hours.  They  are  represented  in  a  horizontal  bar

chart.

Using the radio buttons, it is possible to show the statuses, which have so far occurred in the current shift,

or the statuses of the last x hours. By another radio button, the user can configure the display according

to downtime durations or the number of respective downtimes.

The TOP X input field allows for the number of statuses to be defined (preassignment: 5).

The  color  of  status  bars  corresponds  to  the  color  defined  for  the  status  text  within  the  HYDRA

configuration. The status bar is displayed in gray, in case no color is defined for the status. The status text

and the value (duration in hours or number) are displayed for each bar.

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 16 of 17

Workplaces/Machines

Toolbar

Data collection

   Log on

Use the Log on function to log on operations to the system.

   Partial confirmation

Use the function "Partial confirmation" to enter part quantities for operations that are then recorded

in the system.

   Interrupt

Use the function "Interrupt" to interrupt operations.

Log off

Use the Log off function to log off operations.

   Terminate

Interrupted or prepared operations can be logged off from the system using the Terminate function

Persons

   Log person on

You can log on a person to an operation/machine using the Log person on function

    Log person off

You can log off a person from the relevant operation/machine using the Log person off function

MOC_WorkplaceOverview.docx

Version: 1.13.18468

Page 17 of 17


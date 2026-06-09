Manual

Post Capture of HR/Shop
Floor Postings
SIS-NPB 3.0/3.1

Version 1.0.16727

Last changed on: 19 June 2020

Post Capture of HR/Shop Floor Postings

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

SIS-NPB_30.docx

Version: 1.0.19468

Page 2 of 24

Post Capture of HR/Shop Floor Postings

Contents

1  SIS-NPB - Overview ..................................................................................... 4

2  Labor Time Maintenance ............................................................................. 5

3  Record Listing ............................................................................................ 18

SIS-NPB_30.docx

Version: 1.0.19468

Page 3 of 24

Post Capture of HR/Shop Floor Postings

1  SIS-NPB - Overview

Purpose

The subsequent entry of labor time function may be used for the integrated manual subsequent recording

of labor time for labor time management as well as for order data recording.

Implementation considerations

You  use  the  subsequent  entry  of  labor  time  function  if  you  need  to  subsequently  record  labor  times  of

staff working externally both for labor time registration and for order data recording.

Examples for this are technicians or other field workers who cannot record their working times online and

whose  subsequent  reports  have  to  be  recorded  to  the  account  of  production  orders  both  for  labor  time

registration and for controlling.

Subsequent  recording  may  also  be  applied  if  staff  cannot  report  their  working  times  on  the  order  data

recording terminal online for other reasons.

Integration

The  subsequent  labor  time  entry  shows  the  already  recorded  working  times  as  well  as  the  difference

between labor time management and order data recording for each person and day. This difference may

be filled with order entries with support of the system.

The  subsequent  entry  function  is  integrated  into  the  "Labor  time  maintenance"  function  in  labor  time

management, where labor times for order data recording are registered in the "Personnel postings" detail

application.

Features

  Subsequent entry of activities not recorded at the HYDRA registration terminal, e.g. installation or

sales.

  Subsequent recording of In/Out clocking with allocation to cost centers

  Subsequent recording of ADE staff entries with allocation of cost centers and workplaces

  Direct comparison of absence and BDE times.

SIS-NPB_30.docx

Version: 1.0.19468

Page 4 of 24

Post Capture of HR/Shop Floor Postings

2  Labor Time Maintenance

Overview

Menu

Human resources management  Maintenance  Labor time maintenance

Transaction code

ptma

Function authorization

ptma
clck
wtbo
subsen (detail applications Labor time comparison and Personnel postings)

(detail application Clockings)
(detail application Wage type postings)

Using  the  Labor  time  maintenance  function,  you  can  display,  change,  complement  and  delete  the

clocking records and the respective postings of selected persons for a specified period. You can use this

function  to  react  in  the  short  term  to  unplanned  or  unique  events  during  operation.  The  function  also

provides  quick  information  because  it  displays  the  clockings  and  the  relevant  wage  type  postings  with

messages, labor time comparison and personnel postings.

In  the  Labor  time  maintenance,  the  columns  of  the  time  sheets  can  be  shown.  Each  column  shows  a

wage  type  and  the  relevant  wage  type  postings.  Using  the  columns,  you  can  compare  the  wage  type

postings for specific persons over a longer period of time.

SIS-NPB_30.docx

Version: 1.0.19468

Page 5 of 24

Post Capture of HR/Shop Floor Postings

Field descriptions of the Clockings table

Clocking

Type

Clocking  type;  possible  entries  are  Present,  Clock-in,  Clock-out,  Business  trip,  Absence  and

Unplanned absent.

Date

Date of clocking

Beginning, End

Time of clocking recorded by the employee on the terminal.

CEST

Central  European  Summer  Time  (CEST):  This  option  specifies  whether  the  time  is  in  winter  time

(option not set) or summer time (option set).

Rounded times: Time, to

These  fields  include  the  clocking  times rounded  by  the  labor  time  calculation.  You  can  use  these

fields to correct the rounding manually. If these two fields are populated, the rounded times are not

recalculated by the labor time calculation. If a new rounding of the labor time calculation is required,

the two fields must be left empty.

If you create a clocking for a day that already has an existing clocking, the rounded times

of the existing clocking are deleted if it is an original clocking. Advantage: If a rounding of

the actual  working time or different rounding rules  within the  working time are defined, a

new rounding is performed for the existing clocking.

Duration

The Duration column includes the duration of the rounded clockings minus breaks. The entry in this

column is only available once the clockings have been evaluated.

Attendance time

The column Attendance time shows the sum total of the times of all attendance and business trip

clockings for the respective day. If several clockings are available for a day, the attendance time is

only entered in the first row of the day.

Settlement date

Date  on  which  this  clocking  record  is  settled.  Clocking  date  and  settlement  date  can  be  different.

The  employee  can  work  until  after  midnight  or  start  work  before  midnight  and  the  night  shift  is

allocated to the next day.

SIS-NPB_30.docx

Version: 1.0.19468

Page 6 of 24

Post Capture of HR/Shop Floor Postings

Day types

Working time day type

Working time day type that is used on this day. All clockings of a day are evaluated using the same

working time day type. If you change the working time day type or the shift type in a clocking, this

change affects all clockings of the settlement date. If you delete the working time day type and the

shift  type  that  can  be  entered  for  shift  workers,  the  day  type,  which  was  planned  for  this  day,  is

used in the next evaluation.

Shift type

Shift  type  of  the  shift  day  type  or  flexible  shift  day  type.  For  employees  who  work  according  to  a

flextime day type, this field remains empty.

Payment day type

Specifies  the  payment  day  type  used  to  settle  this  clocking  record.  To  identify  the  payment  day

type,  the  labor  time  calculation  reads  the  payment  day  type  in  the  payment  model  or  in  another

planning (e.g. in the absence planning or personal models or day types) and enters it here. If you

enter  a  different  payment  day  type,  the  clocking  record  is  calculated  according  to  this  rule.  If  you

delete  the  payment  day  type  entered,  the  day  type  planned  for  this  day  is  used  in  the  next  labor

time calculation.

Cost center

Cost center the clocking record is assigned to. If this field is empty, the master cost center of the

employee  is  entered  for  the  work  day  evaluation.  If  an  employee  has  worked  for  a  different  cost

center, you can manually overwrite this field.

This field is only available if the cost center posting license is activated (PZW-KSB).

Recorded cost center

If a cost center has been recorded with the clocking in the terminal, this cost center is shown in this

field.

Comment

This field is only available if the cost center posting license is activated (PZW-KSB).

You  can  enter  a  comment  in  this  field.  For  example,  it  is  possible  to  document  why  a  clocking

record has been edited.

Abbreviation

Abbreviation from the  Control of absences that is also displayed in the calendar of the  Personnel

Scheduling for an absence. For unplanned absences, "UNG" is entered in this field.

SIS-NPB_30.docx

Version: 1.0.19468

Page 7 of 24

Post Capture of HR/Shop Floor Postings

Status

The following types are available:

Original:  the  clocking  record  is  in  the  original  state,  as  it  was  created  by  the  employee.

Edited:

the clocking record was modified by user.

Automatically:

the  clocking  record  was  created  by  the  system,  because  the  employee  was

absent.

Authorization, Modified by, Modified on

In  case  of  original  clockings  of  the  employee,  these  fields  are  empty.  Clockings  that  require  an

approval are identified via Processing required. If the clocking record has been edited, rejected or

approved, the respective status is entered including person and time of modification. For approved

clockings,  the  authorization  is  displayed  in  green.  If  the  clocking  has  been  rejected,  the

authorization is displayed in red.

The  days  and  the  clockings  included  in  the  table  Clockings  are  sorted  by  personnel  number,

date and start date of the clocking. You cannot change the sorting of this table.

Editing functions

Insert, edit, copy and delete clockings

Double-click  a  clocking  to  open  an  editing  dialog.  If  you  double-click  a  day  without  clocking,  a  dialog

opens to create a clocking.

If you have changed the clockings of a day, you can manually start the labor time calculation to

recalculate  the  changed  clockings.  The  results  are  directly  displayed  when  the  labor  time

calculation  is  finished.  If  you  do  not  start  the  labor  time  calculation  manually,  the  changed

clockings are recalculated during the next run of the labor time calculation that is automatically

started at specified times.

Changes of original clockings are logged in the Clockings and can be traced here. The list also

includes deleted original clockings.

Authorize and Reject clockings and wage type postings

The  authorization  of  clockings  and  wage  type  postings  is  the  explicit  approval  of  specific  postings  for

wage types. These could, for example, be bonus or overtime postings.

SIS-NPB_30.docx

Version: 1.0.19468

Page 8 of 24

Post Capture of HR/Shop Floor Postings

Messages for postings that require authorization are  displayed in blue in the messages listing.  You can

edit  the  messages  similar  to  errors  occurred  if  you  double-click  the  message  in  the  window  Labor  time

maintenance.  If  all  postings  of  a  day  that  require  authorization  have  been  processed,  then  the  relevant

message disappears from the messages listing.

Rejected  postings  are  not  included  in  the  monthly  result  or  when  the  wage  types  are  transferred  to  the

payroll accounting system.

The following options are provided to configure that an authorization is

required:

In the definition of the Wage types

Result: All postings for the specified wage type require authorization and are identified as such.

In the different payment rules of the Payment day type

Result: Exactly this posting requires authorization. This is useful to control the posting of overtime

and bonuses.

When unplanned absence records are created

In the Control of labor time calculation, you can specify whether absences require authorization that

have not been defined in the absence planning.

In absence planning

In  the  Absence  planning,,  you  can  configure  that  the  resulting  absence  record  and  the  relevant

postings require authorization.

In the definition of absence reasons

You can specify here if the  Absence reasons require authorization that the employee has entered

on the terminal (e.g. doctor's appointment).

If  a  clocking  is  approved,  the  authorization  requirement  of  the  resulting  wage  type  posting  is

automatically  reset.  You  can  use  the  option  Sign  manually  created  and  changed  clockings

automatically  in  the  PZE  tab  of  the  Basic  settings  to  configure  if  wage  type  postings,  which

result from manually created or changed clockings, require authorization or not.

SIS-NPB_30.docx

Version: 1.0.19468

Page 9 of 24

Post Capture of HR/Shop Floor Postings

Toolbar

 Authorize

Clocking  (function  authorization  clck.sign):  A  clocking  that  requires  authorization  is  approved.  If

you  authorize  a  clocking,  the  authorization  requirement  of  all  related  wage  type  postings  is

automatically removed.

Wage  type  posting  (function  authorization  wtbo.sign):  The  selected  posting  is  authorized.  If,  on

one  day,  one  or  more  authorized  or  rejected  postings  are  available,  then  none  of  the  wage  type

postings of this day is changed by the work day evaluation.

 Reject

Clocking (function authorization clck.reject): A clocking that requires authorization is rejected. If a

clocking  is  rejected,  all  related  wage  type  postings  that  are  neither  approved  nor  rejected,  are

deleted.

Wage type posting (function authorization wtbo.reject): The selected posting is rejected.

 Labor time calculation

Starts  the  labor  time  calculation  for  the  day  selected  in  the  list  of  clockings.  If  you  immediately

require the result of the correction, you can use this button to manually call the work day evaluation.

If this is not necessary, the system performs the evaluation at a later time.

You  can  control  the  authorization  to  call  the  Labor  time  calculation  in  the  Labor  time

maintenance via several function authorizations:

ptma.view:  The  user  can  start  the  Labor  time  maintenance,  but  is  not  authorized  to  call  the

Labor time calculation.

ptma  or  ptma.evaluate:  The  user  can  start  the  Labor  time  calculation  only  in  the  Labor  time

maintenance and therefore only for one person.

ptev: The user can call the Labor time calculation in the Labor time maintenance for one person

and also via the menu and therefore for several persons.

 Messages listing

Opens the Messages listing for the selected period of time.

 Working time information

Displays the Working time information for the selected employee and for the day selected in the list

of clockings.

 Time sheet

Displays the time sheet for the current month.

SIS-NPB_30.docx

Version: 1.0.19468

Page 10 of 24

Post Capture of HR/Shop Floor Postings

 Personnel Scheduling

Calls the Personnel Scheduling for the selected person.

 Personal working time

Calls the Personal working time of the selected person.

 Personal day types

Calls the Personal day types of the selected person.

 Current account balances

Displays the current account balances current account balances of the selected person.

 Reset labor time calculation

Via the Reset labor time calculation, you can reset the results of the labor time calculation.

Detail applications

Wage type postings

Wage type postings are created during the labor time calculation. The wage type postings are based on

the employees' clockings and the payment rules of the assigned payment day type. Similar to clockings,

the wage type postings can be created or edited.

If the selection criterion Compress wage type postings is enabled, the wage type postings are totaled for

each Wage type, Cost center, Modified by and Authorization. This view provides a quick overview of the

time posted for each  wage type.  If the selection  criterion  Compress wage  type  postings  is not  enabled,

the  separate  wage  type  postings  for  Wage  type,  Cost  center,  Modified  by  and  Authorization  are

displayed. With this view, you can identify the separate periods where the wage type was posted and the

breaks used to calculate the labor time.

If the selection criterion Compress wage type postings is enabled, the function key to edit wage

type  postings  is  only  active  if  the  selected  entry  in  the  table  of  the  wage  type  postings  only

includes one wage type posting. If a combination of several wage type postings is selected, you

can  only  edit  the  different  wage  type  postings  if  the  selection  criterion  Compress  wage  type

postings is disabled.

SIS-NPB_30.docx

Version: 1.0.19468

Page 11 of 24

Post Capture of HR/Shop Floor Postings

If  an  attendance  or  absence  time  is  changed,  authorized  or  rejected,  all  postings  of  this  evaluation  day

are not changed any more by the labor time calculation. Result: If you have made a change, this change

is not overwritten if you edit the relevant clocking record. If you want to undo the changes, you can delete

the wage type postings and start the labor time calculation.

Postings of type  Manual are times that are booked additionally to the wage types identified by the labor

time  calculation.  Manual  postings  are  not  changed  by  the  labor  time  calculation.  The  manual  postings

also  do  not  prevent  other  postings  of  the  day  from  being  recalculated  by  the  labor  time  calculation.

Manual postings are included in the monthly total and are therefore forwarded to the payroll accounting

system if an automatic interface is being used. If it is a wage type that is kept in an account, the account

is  offset.  It  is  therefore  recommended  to  make  manual  wage  type  postings  to  correct  individual  time

accounts.

SIS-NPB_30.docx

Version: 1.0.19468

Page 12 of 24

Post Capture of HR/Shop Floor Postings

Only use the option to directly change postings of attendance or absence  times if the required

result cannot be obtained via configuration.

Field descriptions

Settlement date

Date of posting

Time, To

Start and end time of posting

Wage type

Wage type of the posting

Duration

Posting duration

Cost center

Assigned cost center of this posting. The clocking specifies the cost center. If you manually create

wage type postings, this field is preset with the person's master cost center and can be changed if

necessary.

The  field  Cost  center  is  only  available  if  the  license  of  cost  center  posting  is  activated

(PZW-KSB).

Origin

The  posting  has  been  created  due  to  an  attendance  or  an  absence  or  has  been  created  as  a

manual posting.

Authorization, Modified by, Modified on

These  fields  show  the  postings  that  require  authorization  and  the  persons  that  authorized  or

rejected the posting. The column Authorization is displayed in different colors:

  Yellow: Postings that require authorization

  Green:  Edited or authorized posting

  Red:  Rejected posting

Messages

This  detail  application  displays  errors  and  special  incidents  that  occurred  during  labor  time  calculation.

You  can  configure  in  the  Configuration  of  messages  listings  using  the  messages  listing  999  which

messages  are  displayed.  For  information  on  the  meaning  of  the  different  messages,  refer  to  the

documentation Process of labor time calculation.

SIS-NPB_30.docx

Version: 1.0.19468

Page 13 of 24

Post Capture of HR/Shop Floor Postings

Labor time comparison

The detail application is only displayed if the function Subsequent entry of PZE/BDE postings is available

and if the user has the function authorization.

Function authorization

subsen

The  Labor  time  comparison  compares  the  attendance  time  calculated  in  the  Personnel  Time

Management and the person-related times of the order data collection. The detail application  Labor time

comparison displays the personal day selected in the clockings' list. If no attendance time and no time of

the order data collection is available for this person on this day, then no data record is displayed.

You  use  this  detail  application  in  combination  with  the  detail  application  Personnel  postings  described

below as source of information to subsequently enter order-related personal postings.

Field descriptions (the most important fields)

Deviation

Difference  between  attendance  time  (HYDRA-PZW)  and  posted  time  and  labor  data  (HYDRA-

BDE).  A  possible  reason  for  the  difference  can  be  the  assignment  of  BDE  postings  to  PZW  days

described below.

Differences, which do not exceed one minute, are not highlighted in color.

Differences between one and five minutes are highlighted in yellow.

Differences exceeding five minutes are highlighted in red.

Logged in

All personal times that have been posted as BDE personal postings (B records) for operations on

the selected day.

%BDE incl. OC

Ratio of labor time posted (BDE) to attendance time (PZW) in percent.

Attendance time

Attendance  time  from  Personnel  Time  Management  (HYDRA-PZW).  This  time  has  already  been

rounded or cut according to the evaluation parameters that are applicable in HYDRA-PZW.

SIS-NPB_30.docx

Version: 1.0.19468

Page 14 of 24

For detailed information and a description of the possible options, refer to the documentation  Labor time

Post Capture of HR/Shop Floor Postings

comparison.

Personnel postings

The detail application is only displayed if the function Subsequent entry of PZE/BDE postings is available

and if the user has the function authorization.

Function authorization

subsen

The  detail  application  Personnel  postings  displays  the  BDE  personal  postings  and  the  bonuses  of

persons. The detail application  lists the expected results of the  wage calculation. This list is identical to

the  independent  application  Record  listing.  The  detail  application  Labor  time  comparison  displays  the

personal day selected in the clockings' list.

The columns are described in the documentation of the Record listing.

In the  detail application  Personnel  postings,  you can  use the  editing functions of the group  Subsequent

entry in the toolbar to edit, create and delete the BDE personal postings. The editing dialog that opens is

simplified.

SIS-NPB_30.docx

Version: 1.0.19468

Page 15 of 24

Post Capture of HR/Shop Floor Postings

When  you  insert  a  BDE  personal  posting,  the  fields  including  the  personnel  number,  the  times,  the

resource  performance  account  11  "MUT",  the  login  and  logoff  times  and  the  shift  information  are

populated  using  the  information  from  the  detail  application  Labor  time  comparison.  Condition:  The

attendance time issued by  the Personnel Time Management (PZW) is greater than the sum total of the

BDE personal postings already recorded.

The editing function is a simplified version of the BDE personal postings. The fields are described in the

documentation  of  the  Record  listing  and  the  standard  editing  functions  are  described  here:  BDE

personnel postings.

The  simplified  editing  function  facilitates  the  manual  subsequent  entry  of  BDE  personnel  postings.  The

simplified  editing  function  also  permits  a  separate  customization  that  does  not  include  the  full  editing

functions. It is therefore easier to make changes according to the customer's requirements.

With  users  that  are  not  interested  in  the  Labor  time  comparison  and  the  Personnel  postings,

you can deactivate the function authorization  subsen to improve the performance of the Labor

SIS-NPB_30.docx

Version: 1.0.19468

Page 16 of 24

time maintenance.

Post Capture of HR/Shop Floor Postings

SIS-NPB_30.docx

Version: 1.0.19468

Page 17 of 24

Post Capture of HR/Shop Floor Postings

3  Record Listing

Summary

Menu

Human resources management  Incentive wages  Record listing

Transaction code

reclis

Function authorization

reclis.*

The record listing displays the ADE personnel postings and the bonuses for people. It provides a preview

of the results of the wage calculation to be expected. The documents are provided with an identifier for a

time  type  with  which  the  payment  type  is  visible.  Users  in  payroll  accounting  and  the  employees

themselves use the record listing as evidence of the order processing performed.

From the record listing, ADE personnel postings can be modified, created and deleted using a simplified

editing dialog. The simplified editing dialog is also the basis for the subsequent entry function in labor time

maintenance.

For times related to piecework, the standard time, the actual time and the resulting performance efficiency

rate  are  indicated  as  percentages.  However,  bonuses  and  reductions  are  not  yet  considered  in  this

performance efficiency rate calculation!

PLEASE NOTE:

The record listing does not cover all of the possible calculation rules for the wage calculation and it also

does  not  include  all  customer-specific  rules  of  the  customer-specific  payment  forms  when  using  the

formula based incentive wages. It is a simplified preview based on the collected basic data.

SIS-NPB_30.docx

Version: 1.0.19468

Page 18 of 24

Post Capture of HR/Shop Floor Postings

Field descriptions

The  data  displayed  corresponds  with  the  ADE  personnel  postings,  the  bonuses  and  the  associated

master  data  of  machines,  orders  and  bonus  reasons.  There  is  an  independent  display  for  the  following

fields in the record list:

Time type

For bonuses, the time type is "Bonus". For ADE personnel postings with a premium group, the time

type  is  "Group  incentives".  For  other  ADE  personnel  postings,  the  time  type  of  the  wage  type  is

displayed.

Daily assignment: collection

Shift date from the ADE collection

Daily assignment: wage

Intelligent  daily  assignment,  including  personnel  time  management.  This  data  field  is  set  by  the

PZW  day  evaluation  and  the  wage  calculation  and  it  provides  a  connected  and  consistent

consideration of the night shift, even with irregular working times. If this field is empty, the date from

the "Daily assignment: collection" field applies for the wage as well.

SIS-NPB_30.docx

Version: 1.0.19468

Page 19 of 24

Post Capture of HR/Shop Floor Postings

Standard time

ADE personnel postings:

The standard time is calculated from yield, te and, depending on the basic settings, from scrap and

if necessary tr as well.

Bonus:

The bonus is displayed in this column if the bonus reason affects the target time.

Labor utilization

ADE personnel postings:

Labor utilization of ADE personnel postings (total of all resource performance accounts, except for

“breaks”).

Bonus:

The  bonus  is  displayed  in  this  column  if  the  bonus  reason  affects  the  actual  time.  Since  these

bonuses normally reduce the actual time, these bonuses are displayed with a reversed algebraic

sign.

Performance level

The performance level is calculated in a simplified way from the calculated standard time and the

labor  utilization  of  the  ADE  personnel  posting.  For  this  reason,  it  does  not  always  equal  the

performance level of the resulting time ticket.

For the record list, this is a display function of the collected data. For this reason, the calculated

results displayed are to be viewed as independent and simplified calculated information and do

not necessarily equal the final results of the incentive wage calculation.

SIS-NPB_30.docx

Version: 1.0.19468

Page 20 of 24

Post Capture of HR/Shop Floor Postings

Editing functions

This function allows for ADE personnel postings to be edited. However, bonuses cannot be edited here.

They have to be kept using the bonuses application.

The below window opens to edit ADE personnel postings:

SIS-NPB_30.docx

Version: 1.0.19468

Page 21 of 24

Post Capture of HR/Shop Floor Postings

SIS-NPB_30.docx

Version: 1.0.19468

Page 22 of 24

Post Capture of HR/Shop Floor Postings

This  is  a  simplified  maintenance  function  for  ADE  personnel  postings.  The  fields  are  described  in  the

standard function.

The  simplified  maintenance  function  makes  the  subsequent  manual  entry  of  ADE  personnel  postings

easier.

SIS-NPB_30.docx

Version: 1.0.19468

Page 23 of 24

Post Capture of HR/Shop Floor Postings

SIS-NPB_30.docx

Version: 1.0.19468

Page 24 of 24


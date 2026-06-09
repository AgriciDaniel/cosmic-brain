Manual

Personal BDE Functions
BDE-PBF 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Personal BDE Functions

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-PBF_81.docx

Version: 1.0.18468

Page 2 of 20

Personal BDE Functions

Inhaltsverzeichnis

1  Overview – Person-related BDE Functions ................................................. 4

2  Operator Positions ....................................................................................... 6

3  Wage and Premium Indicators ..................................................................... 8

4  Waiting Period - Person ............................................................................... 9

5  Waiting Period Processing - Machine ........................................................ 17

6  Activating Waiting Period Processing ........................................................ 19

BDE-PBF_81.docx

Version: 1.0.18468

Page 3 of 20

Personal BDE Functions

1

 Overview – Person-related BDE Functions

Purpose

The function package provides functions for data entry and posting of order-related labor utilization.

Implementation Notes

Use the function package when:

  You wish to enter order-related labor utilization

  You wish to employ comparison mechanisms between the labor time management – PZW – and

the business data entry – BDE – with respect to the entered labor utilization,

  You require specific identifiers with respect to the labor utilization for wage payment reasons,

  You wish to employ personalized plausibility checks for the entry/posting of personnel and orders.

Integration

The recorded or entered data can be evaluated in MOC using the applications of the  BDE-PMA function

package.  If  corresponding  interfaces  are  used,  the  data  can  also  be  uploaded  to  a  higher-level  ERP

system.

The HR master data required to carry out postings are either transferred from a higher-level system or are

edited directly in HYDRA.

Features

  Operator positions

o  Configuration and entry of a workplace-specific operator position when a person logs on

  Wage/premium indicator

o  Configuration and entry of a wage/premium indicator when a person logs on.

  Personnel logon/logoff

o  Logons and logoffs of one or more persons to and from operations or the workplace.

  Calculation of the person-related order times

o  Calculation  of  the  person-related  order  times  as  the  basis  for  the  performance-related

wage calculation. Entry of the labor utilization per operation.

  Posting rules

o  Different person-related posting at individual workplaces and group workplaces.

  Shift model comparison

o  Comparison of the recorded labor times at the BDE shift model stored at the workplace or

optionally at the person's individual BDE shift model.

BDE-PBF_81.docx

Version: 1.0.18468

Page 4 of 20

Personal BDE Functions

  Multi-machine operation

o  Splitting  of  the  order-related  labor  times  for  multi-machine  operation  at  individual

workplaces.

  PZE controls BDE

o  Possibility  of  logging  off  persons  logged  on  to  operations  at  the  clock-out  with  optional

renewed logon at the next clock-in.

  Waiting period processing

o  Waiting  time  monitoring  and  posting  of  these  times  without  logon  to  waiting  period

operations.

o  Rounding of the first order logon by analogy with the clock-in of the employee.

BDE-PBF_81.docx

Version: 1.0.18468

Page 5 of 20

Personal BDE Functions

2  Operator Positions

1.1  Summary

Menu

Master data --> Workplaces/Machines --> Operator Positions

Transaction code

pppo

Function authorization  mdoppo

Utilization

The employee indicates their operator position (=task) when logging on to a workplace/machine. In doing

so, they choose from a list of predefined operator positions. Examples of operator positions are: machine

operator, assistant, setter, recipient, ....

Prerequisite

The corresponding workplace has to be created.

Configuration changes

The terminal which the workplace/machine is assigned to needs to be restarted in order for the

configurations or changes made to be interpreted by the terminal shop floor program.

Selection Criteria

The application provides the following selection criteria:

Workplace

Selects the workplace

Short name

Short name of the workplace

Group

Group of the workplace

Cost center

Cost center of the workplace

Field Descriptions

Operator position

The operator position has been designed as posting criterion for the entry.

BDE-PBF_81.docx

Version: 1.0.18468

Page 6 of 20

Personal BDE Functions

Short name

Abbreviation (not displayed during entry)

Description

Description of the operator position to be displayed during entry

Function

Control function

Order type

Reserved. Currently not processed. Please leave field empty.

Maximum number of people

By  entering  a  value  greater  than  0,  the  maximum  number  of  people  allowed  to  log  on  with  this

operator position, may be limited.

BDE-PBF_81.docx

Version: 1.0.18468

Page 7 of 20

Personal BDE Functions

3  Wage and Premium Indicators

Summary

Menu

Master data  Workplaces / machines  Wage indicators

Transaction code

Prin

Function authorization  Mdprin

Usage

Premium indicator is a key term that refers to a wage  payment. Each employee is assigned to a certain

premium  based  on  which  category  he  or  she  falls  under  according  to  the  relevant  collective  bargaining

agreement. If his or her activity in production deviates from plan specifications then the BDE system will

record  this.  The  employee  provides  his/her  premium  indicator  when  logging  on  to  a  machine.  HYDRA

transmits  the  premium  indicator  to  the  payroll  accounting  system.  There,  the  wage  to  be  paid  to  the

employee is calculated based on a target/ actual comparison.

This function is only available at the Windows based CTWIN or AIP terminals.

Selection criteria

The application provides the following selection criteria:

Workplace

Unique workplace number for which premium indicators are recorded.

Field descriptions

Workplace

Workplace number

Premium indicator

Premium indicator (ID). The worker must enter this ID at the shop floor terminal.

Designation

Description of the premium indicator

BDE-PBF_81.docx

Version: 1.0.18468

Page 8 of 20

Personal BDE Functions

4  Waiting Period - Person

Utilization

Waiting  period  processing  is  an  optional  function,  which  allows  for  complete  recording  of  labor  times  in

shop floor data collection (BDE). This applies to both, gaps between individual personnel postings in BDE

as  well  as  between  the  personnel  postings  in  BDE  and  the  clock-in  or  clock-out  postings  of  the  time  &

attendance module (PZE).

Even  if  time  &  attendance  functions  are  not  integrated,  a  very  good  posting  quality  can  be  achieved  in

BDE  (shop  floor  data  collection)  if  the  advanced  logon  time  function,  waiting  period  processing  and

appropriate options to log off staff automatically at the end of shifts are in use. This can still be improved

for flexible working times if the option "PZE (in/out) controls BDE" is used.

Integration

Provided  that  the  time  &  attendance  component  (PZE)  is  in  use,  the  waiting  period  processing  function

can also be controlled by PZE clock-in and clock-out records.

Prerequisite

The  waiting  period  processing  is  enabled  in  the  basic  parameter  settings  -->  BDE  -->  Waiting  period

processing BDE --> Activate waiting period processing.

The function can be used in connection with the time & attendance module (PZE). However, using PZE is

not mandatory. If integration with PZE is required, the relevant options needs to be enabled in the  basic

parameter settings --> BDE --> PZE (in/out) controls BDE".

Configuration options

The personal waiting period processing is configured across the system in the basic parameter settings.

The document dealing with the basic parameter settings provides further information on this.

Filling the gaps between BDE personnel postings

The "waiting period" is defined in minutes within the basic parameter settings if waiting period processing

is enabled. It indicates the maximum time that may pass between a logoff at an operation and the logon

to  the  next  operation  or  it  indicates  within  what  time  an  employee  has  to  log  on  to  an  operation  after

his/her  clocking-in.  If  this  waiting  period  is  not  exceeded,  the  person's  logon  is  dated  back  to  the  time

he/she logged off at last or to his/her clocking-in. In case the waiting period is exceeded, the system posts

the time exceeded to the defined waiting period operation.

BDE-PBF_81.docx

Version: 1.0.18468

Page 9 of 20

Personal BDE Functions

A "maximum waiting period" is also defined within the "basic parameter  settings". The maximum waiting

period  indicates  the  period  of  time  as  of  which  HYDRA  rejects  waiting  period  postings.  If  the maximum

waiting  period  is  set  to  0,  waiting  period  postings  will  not  be  rejected.  The  system  always  generates  a

waiting period posting if waiting period processing is enabled. Even at the end of a working day, it starts

with the time when an employee logs off last and ends with the first logon on the next day, provided it is

not  interrupted  by  clocking-out  if  the  control  by  PZE  option  is  enabled.  This  data  record  spanning  two

working days of an employee can be suppressed by the maximum waiting period.

The waiting period has to be posted to a "resource performance account (RPA)". An account has to be

defined  within  the  basic  parameter  settings  for  posting  purposes.  Please  note  that  only  the  account

number may be entered, e.g. 9 for RPA U8 or 10 for RPA U9. These accounts are free accounts and can

be used for waiting period processing without affecting the events.

Options with "PZE (in/out) controls BDE“

The  functions  of  ”PZE  controls  BDE“  process  a  BREAK  clocking  (beginning  of  break)  as  a

clocking-out. The end of the break corresponds to a clocking-in.

No control

Clocking  records  pertaining  to  the  time  &  attendance  module  (PZE)  do  not  result  in  employees

being logged on or off in BDE and do not cause any waiting period processing.

Waiting period processing

Processing  is  enabled  if  the  waiting  period  is  activated  in  BDE  -->  PZE  (IN/OUT)  controls  BDE

within the basic parameter settings.

When clocking-in, the person is automatically logged  on to a  waiting period operation in the shop

floor system.

If the user logs on to a production OP during the "waiting period" the duration between the clocking-

in and the logon to the production  operation is posted onto the registered operation. The logon of

the production operation is posted forward to the posting in HYDRA-PZE.

The  system  generates  a  "waiting  period  posting"  as  soon  as  the  waiting  period  is  exceeded.  The

data posted to the production order is not changed. This processing is also activated for the times

between the logoff and logon of staff during the working time.

Once the person clocks out in the time & attendance module, they are automatically logged off in

HYDRA-BDE as well. Provided that the person was no longer logged on to an operation at the time

of clocking out, a waiting period posting is generated for the period of time between the last logoff

of the person and the clocking-out. This is even the case if the waiting period is not exceeded.

The operation is interrupted automatically if the last person who works on the operation clocks out.

BDE-PBF_81.docx

Version: 1.0.18468

Page 10 of 20

Personal BDE Functions

Waiting period processing with "auto in"

Waiting  period  processing  is  activated,  provided  that  it  is  enabled  with  "auto  in"  in  the  basic

parameter  settings  -->  BDE  -->  PZE  (IN/OUT)  controls  BDE.  In  this  case,  however,  the  person  is

automatically logged on to the operation that was posted the last time by this person.

As a prerequisite for this logon, this operation must neither be active nor finished already.

In  case  the  operation  could  be  logged  on,  the  person  is  also  logged  on  to  the  operation.  In  this

case, however, the person is always directly logged on; there is never an advance logon.

The logon is made on that workplace to which the person and the operation were logged on before

clocking out. If it is an individual workplace all people who are already active are connected to the

new  operation  and  the  new  person  is  connected  with  all  OPs  that  are  already  active  at  this

workplace.

If  an  advance  logon  of  staff  is  required  instead,  it  might  be  configured  by  an  entry  in  the  INI

configuration:

Parameter name

Parameter value

Name

Key

Value

PZE_CONTROLS_BDE

ADVANCED_LOGON_OF_STAFF

TRUE / FALSE

Comment

Generate advance logon of staff optionally

If this processing is activated by the INI entry

  An  advance  logon  of  staff  is  generated  instead,  when  clocking  in,  provided  that  the  person

clocks  in  within  the  advance  logon  period  for  the  machine  or  the  machine  is  in  the  "no  shift"

status (time without shift).

  No OP is logged on, if the person clocks in at a time when the machine is in the "no shift" status

and the operation to be posted is in the "automatically interrupted" status.

Waiting period processing with clock-out

If the waiting period processing with clock-out is activated in the basic parameter settings --> BDE -

-> PZE (IN/OUT) controls BDE, the person is automatically logged off from all machines and orders

as  soon  as  they  clock  out.  In  addition,  the  operation  is  also  interrupted,  if  the  last  person  who  is

logged on to the operation is logged off.

BDE-PBF_81.docx

Version: 1.0.18468

Page 11 of 20

General notes

Personal BDE Functions

Operations are  not  logged  on automatically by the function  "PZE controls BDE",  provided that

resources  are  posted  for  the  operation  or  inspection  operations  are  connected  with  the

operation.

In such cases, only the person is logged on or off by the PZE clocking.

When it comes to group workplaces or overhead cost operations, it might also be the case that

the  person  cannot  be  logged  off  automatically  in  the  cases  mentioned  above,  as  one  person

always has to be logged on to an operation.

When operations are merged at the terminal, staff is logged off from this merged operation as

soon  as  they  clock  out.  However,  they  cannot  be  logged  on  automatically  to  the  merged

operation.

In the mentioned cases, it is recommended to log the operation on and off explicitly, if required.

The  "waiting  period"  and  "auto  in"  options  automatically  compare  the  first  staff  logon  within  a

shift with the rounding rules of HYDRA-PZE if the option "rounding of the first personnel logon"

is enabled. This is why, the HYDRA-BDE posting might deviate from the actual time.

If  the  relevant  option  is  enabled  in  the  basic  parameter  settings,  the  personnel  logon  time  in

BDE  is  dated  forward  to  the  beginning  of  the  working  time  temporarily  rounded  by  PZE  if  a

person is logged in by a clocking-in.

Example: a person clocks in at 5.55 a.m. However, the person's working time only starts at 6.00

a.m. according to the shift  model and the  PZE rounding rules. Waiting period processing  logs

the person on at 6.00 a.m. in BDE instead at 5.55 a.m. (if enabled at all).

This option only affects such personnel logons in BDE that are performed due to waiting period

processing of a person clocking in. This option neither affects staff logging on or off using BDE

posting dialogs nor further clocking-in records of the person on the same day.

The  waiting  period  processing  is  not  activated  if  the  person  clocks  in  outside  of  the  skeleton

working time, i.e. before the beginning of the skeleton time.

In contrast to HYDRA-BDE, postings in HYDRA-PZE are not transferred ONLINE but at a later

point in time. At first they are buffered locally. When it comes to postings that depend on each

other (e.g. within the scope of waiting period processing), this might lead to HYDRA-BDE being

more  up-to-date  than  HYDRA-PZE  postings.  In  this  case,  HYDRA-BDE  postings  are  not

backdated.

BDE-PBF_81.docx

Version: 1.0.18468

Page 12 of 20

Personal BDE Functions

Backdating to the beginning of the last shift at most takes place at workplaces/machines, which

are directly assigned to a terminal of the operation mode "MDE".

When  the  waiting  period  function  for  personnel  and  machines  is  used  at  the  same  time,  the

person  is  postdated  to  the  time  when  the  operation  is  logged  on  at  most.  A  waiting  period

posting for the person  is generated for the remaining time, irrespective of  whether the  waiting

period has been exceeded or not. The waiting period for machines always takes priority.

If  the  person  is  logged  off  automatically  by  clocking  out,  and  if  quantities  in  B  records  are

required, he/she has to upload his/her quantities beforehand using partial uploads.

Effects of the settings in the HR master

The recorded waiting period for a person is compared with the person's annual model as it is defined in

the HR master; the generated posting of the record type "B" is assigned the ("master") workplace defined

in the HR master. If these fields are not filled out the waiting period is 0, provided that the year model is

missing or if the workplace is missing it is set to the value 0 or blank.

Finding of the waiting period OP with waiting period processing based on

personnel

HR master

Overhead cost OP

defined?

Yes

No

HYDRA
basic parameter settings

Overhead cost OP

defined?

Yes

Post to
this
operation

No

Generation of the
waiting period OP no.

Overhead cost OP:=
GK00..<PNR>

The  resource  performance  account  that  is  configured  in  the  basic  parameter  settings  is  posted,

regardless of the object where the waiting period operation is found.

BDE-PBF_81.docx

Version: 1.0.18468

Page 13 of 20

Personal BDE Functions

Upload to the PPS system

By  default,  waiting  period  postings  are  not  uploaded  to  the  higher-level  ERP  system.  However,  if  it  is

required to upload these postings as well, HYDRA can be customized accordingly. To do so, the HYDRA

standard interface (HYD-ERP) has to be used.

Status of a waiting period operation

By  default,  a  waiting  period  operation  is  always  assigned  to  the  status  "available  (waiting  period)",

irrespective of whether the waiting period operation has already been posted or if a person or a machine

"is waiting".

Processing is not affected, if the status of a waiting period operation or a waiting period order is changed

to  the  "completed"  status  using  the  function  "change  status"  in  the  order  overview  or  order  information

dialog.  The  defined  waiting  period  operation  is  still  posted.  Please  also  take  into  account  the  notes  on

changing a waiting period operation in the basic parameter settings.

Reactivation of a waiting period operation

Processing is not affected if a waiting period operation is reactivated using the "reactivate OP" function in

the order overview dialog. By default, the status is set to "available (waiting period)" again in HYDRA (this

is an internal status with control indicator "U").

Example 1: Effects of the planned working time in HYDRA-PZE on HYDRA-

BDE

Prerequisites:

  HYDRA-BDE and HYDRA-PZE are in use

  The option "PZE (in/out) controls BDE" has to be set to "waiting period " or "Auto in".

Planned  attendance PZE Person 1020
                       6:00 am
                        ├─────────────────────────────────

Person 1020 clocks in
                  5:55 am
                   ├──────────────────────────────────

                       6:00 am (determined by the planned attendance)
OP 70010 030 is logged on├──────────────────────────────────────────
Person 1020 is logged on ├─────────────────────────────-----------------

BDE-PBF_81.docx

Version: 1.0.18468

Page 14 of 20

Personal BDE Functions

Example 2 "waiting period exceeded"

The waiting period is set to 10 minutes in this and the following examples

last logoff(or clock-in) of the person
     5:30 am
               ├────────....

the person is logged on the next time at
                       6:00 am
                        ├─────────────────────────────────

A waiting period posting of 30 minutes is generated for this person and posted on the waiting period RPA

for the period of time between 5.30 am and 6.00 am. No backdating takes place.

Example 3 "waiting period not exceeded"

Last logoff or clock-in of the person
              5:55 am
                    ├───....

The person is logged in the next time at
                       6:00 am
                        ├─────────────────────────────────
                   ß├──(Backdating to 5:55 am)

The person's logon is backdated to 5.55 am. The five minutes of waiting period are posted on the waiting

period RPA. No waiting period posting is generated.

Example 4 "logoff of staff before clocking out in PZE"

The person is logged off
                       1:55 pm
      ───────────────────┤

The person clocks out
                          2:00 pm
      ──────────────────────┤..

In this case, a waiting period posting between the last person that logs off (HYDRA-BDE) and the clock-

out  (HYDRA-PZE)  is  generated,  even  if  the  waiting  period  is  not  exceeded,  as  there  is  no  (longer)  an

operation  onto  which  this  time  could  be  posted.  The  five  minutes  of  waiting  period  are  posted  onto  the

RPA defined within the basic parameter settings. The time when the last person logs off is not postdated.

Example 5 – "logon of staff with PZE rounding“

The  person  arrives  at  5.55  am.  This  time  is  already  dated  to  6.00  am  by  the  clocking  time  gradation

function  of  HYDRA-PZE;  i.e.  the  shop  floor  collection  module  (BDE)  logs  the  person  on  at  6.00  am

(HYDRA-BDE does not know the original clocking time in HYDRA-PZE). Consequently, the person works

on the waiting period OP as of 6.00 am.

Logging an OP/a person on at 6.05 am triggers a backdating or waiting period posting.

BDE-PBF_81.docx

Version: 1.0.18468

Page 15 of 20

Personal BDE Functions

As  in  this  case,  the  waiting  period  has  not  been  exceeded  (6.00  am  -  6.05  am:  is  a  maximum  of  five

minutes, which is less than the 10 minutes waiting period), the logon time for the OP/person is backdated

to 6.00 am.

If  the  OP/person  is  logged  on  at  6.10.01  am  the  waiting  period  is  exceeded  and  HYDRA  generates  a

waiting period posting of 10 minutes and 1 sec.

The logon time for the OP/person remains at 6.10.01 am.

BDE-PBF_81.docx

Version: 1.0.18468

Page 16 of 20

Personal BDE Functions

5  Waiting Period Processing - Machine

Summary

Utilization

Similar to the  waiting period processing for staff, this function enables the  waiting period processing for

machines. Provided that this function is activated, it generates machine-related waiting period postings in

the system for times when no operation is logged on.

This data represents the unused capacities and, as a result, allows for a statement to be made about the

actual utilization of capacities.

Prerequisite

The waiting period processing has been activated in the "basic parameter settings" BDE

 waiting period processing of the machine.

Finding  of  waiting  period  OPs  with  waiting  period  processing  based  on

machines

BDE-PBF_81.docx

Version: 1.0.18468

Page 17 of 20

Personal BDE Functions

Upload to the PPS system

By  default,  waiting  period  postings  are  not  uploaded  to  the  higher-level  ERP  system.  However,  if  it  is

required to upload these postings as well, HYDRA can be customized accordingly. To do so, the HYDRA

standard interface has to be used.

Status of a waiting period operation

By  default,  a  waiting  period  operation  is  always  assigned  to  the  status  "available  (waiting  period)",

irrespective of whether the waiting period operation has already been posted or if a person or a machine

"is waiting".

Processing is not affected, if the status of a waiting period operation or a waiting period order is changed

to  the  "completed"  status  using  the  function  "change  status"  in  the  order  overview  or  order  information

dialog.  The  defined  waiting  period  operation  is  still  posted.  Please  also  take  into  account  the  notes  on

changing a waiting period operation in the basic parameter settings.

Reactivation of a waiting period operation

Processing is not affected, if a waiting period operation is reactivated using the "reactivate OP" function in

the order overview dialog. By default, the status is set to "available (waiting period)" again in HYDRA (this

is an internal status with control indicator "U").

BDE-PBF_81.docx

Version: 1.0.18468

Page 18 of 20

Personal BDE Functions

6  Activating Waiting Period Processing

Procedure

Workplace for waiting period processing

A  special  workplace  should  be  set  up  in  an  initial  step  and  it  should  be  clear  that  this  is  a  separate

workplace at which waiting periods will be processed.

Setting up a waiting period order

A waiting period order is set up using the edit orders menu option.

Because waiting period operations are not explicitly posted and are not meant to be confirmed/uploaded

to the PPS system in every case, these must be set up

  using order type GKP (to process personal waiting periods)

  using order type GKM (to process machine-related waiting periods).

Initially, the order will be set with the status "available (waiting period)".

Assigning operations to a waiting period order

An operation must now be assigned to the waiting period order. This is done by using the edit operations

menu option. When doing so, make sure that the workplace for waiting period processing that was set up

in the initial step is set in the field "workplace".

At  this  operation,  define  an  authorization  level  that  corresponds  to  the  authorization  levels  set  for  the

persons listed in the HR master data.

Initially, the operation will be set with the status "available (waiting period)".

The operation is also assigned the processing code "GK".

Optionally, further waiting period operations may be created and assigned using the HR master.

Overhead  cost  operations  may  only  be  changed  if  they  are  not  active  at  the  moment,  i.e.  no

person or machine may currently be logged on to the OP.

BDE-PBF_81.docx

Version: 1.0.18468

Page 19 of 20

Personal BDE Functions

Activating waiting period in the HYDRA basic settings

The waiting period operation that was just set up is then defined in the basic settings (combined order /

operation number). The waiting periods are posted to this operation. You cannot assign an operation with

a different order type.

Settings in HR master data

What is important for waiting period processing is that for each person for whom postings are carried out

by BDE that a year model and a workplace are defined for this person in the HR master data.

As a rule, the authorization level for order postings must be set to >  0 set for a person in the HR master

data so that waiting period processing is active for this person.

If during waiting period processing (PZE controls ADE in "Waiting period" mode; "Auto on" or "Out") the

operations  for  the  persons  are  automatically  interrupted  and  in  some  cases  logged  back  on  by  PZE

Out/In, then these persons must also have all authorization rights to post operations:

  Authorization "Log OP on" must be active.

  Authorization  level  "OP  postings"  for  the  person  must  be  greater  than  or  equal  to  the

authorization level of the operation.

Another option is to define a waiting period OP (order type GKP) to which waiting periods should be

posted.

BDE-PBF_81.docx

Version: 1.0.18468

Page 20 of 20


Manual

Calculation of Bonus
Wages/Incentive Wages
LLE-BPL 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Calculation of Bonus Wages/Incentive Wages

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

LLE-BPL_81.docx

Version: 1.0.23049

Page 2 of 43

Calculation of Bonus Wages/Incentive Wages

Contents

1  LLE-BPL - Overview ..................................................................................... 4

2

Incentive Wage Calculation - Process ......................................................... 6

3  Wage Calculation ....................................................................................... 12

4

Incentive Wages Basic Settings ................................................................. 16

5  Performance Level (LLE) ........................................................................... 23

6  Evaluation Date .......................................................................................... 25

7  Wage types ................................................................................................ 29

8  Time Type .................................................................................................. 34

9

Interface to Payroll Accounting .................................................................. 37

10  Premium/ Incentive Wage Uploads ............................................................ 41

10.1  Data record structure for incentive wage uploads .............................................. 41

10.2  Description of data fields for incentive wage uploads ........................................ 42

10.3  Example file:...................................................................................................... 43

LLE-BPL_81.docx

Version: 1.0.23049

Page 3 of 43

Calculation of Bonus Wages/Incentive Wages

1  LLE-BPL - Overview

Purpose

The  Calculating  premium/  incentive  wages  module  is  used  to  determine  personal  standard  incentive

wage  components  for  calculating  premiums.  This  is  piecework  wages  that  account  for  time  wage

components, overhead costs and average wage

Moreover, this module provides intervention options that make it possible to use bonuses to respond to

unforeseen events, for example in the production process, and to exercise corrective influence over wage

calculation.

The calculated results can be transferred via an interface to payroll accounting in the form of wage types.

Integration

This is based on the personal data derived from shop floor data entry. As an option, times derived from

time and labor  data management can also be factored in.  Also,  where applicable, the data can  also be

imported from and processed in external systems.

Features

The LLE-BPL Application Service (AS) offers numerous field-tested functions for illustrating the common

incentive-based forms of payment:

  Personal  calculation  of  standard  incentive  wage  components,  piecework,  time  wage,  overhead

costs etc., based on data entered in HYDRA BDE and PZE

  Accounting for incentive wage indicators in HR master data with more than one version

  Consideration of incentive wage indicators in machine and/or workplace master data

  Automatic recalculation of incentive wage when posted data is modified later

  The  ability  to  define  upper  and  lower  limits  used  to  generate  warnings  about  the  performance

efficiency grades calculated

  Option to separate out time wage amounts from piecework processing depending on resource  -

performance accounts posted in BDE

  Control the required authorization for certain order types, e.g. for overhead cost time tickets

  Optional consideration of scrap quantities during piecework calculation

LLE-BPL_81.docx

Version: 1.0.23049

Page 4 of 43

Calculation of Bonus Wages/Incentive Wages

  Optional compensation for specified set-up times during piecework calculation

  Optional  calculation  of  the  daily  performance  efficiency  rate  based  on  attendance  time  derived

from time and labor data management

  Optional entry  of bonuses  and  deductions at  the  BDE terminal  by employees  with  authorization

methods



Interface for transferring results to the payroll system in HYDRA standard format

  Extensive data protection and security functions using function authorizations to protect personal

data by utilizing HR master data responsibility areas

LLE-BPL_81.docx

Version: 1.0.23049

Page 5 of 43

Calculation of Bonus Wages/Incentive Wages

2

Incentive Wage Calculation - Process

Basics

The HYDRA Incentive Wage Calculation uses the data that has been recorded by a BDE or PZW system.

For the different systems of premium or incentive wage, the application uses different subsets of the shop

floor data recorded to calculate the incentive wages.

  Postings  of  operations  and  persons  recorded  by  the  Shop  Floor  Data  Collection  BDE  in

combination  with  the  posting  of  times  to  the  different  resource  performance  accounts  (RPA)

performed by the Machine Data Collection MDE.

  Approved bonuses and deductions recorded by the Premium and Incentive Wage LLE

  Changes of group recorded by the Premium and Incentive Wage LLE

  Attendance,  absence  and  break  times  of  the  employees  recorded  by  the  Personnel  Time

Management PZW

In  addition  to  the  transaction  data  above,  the  master  data  stored  in  the  system  for  orders  and  persons

and  the  LLE  payment  rules  affect  the  data  processing  for  the  calculation  of  wages.  For  example,  a

configuration in the master data releases specific persons and orders for the processing in the incentive

wage and bonus calculation.

Another  important component of the  incentive  wage  calculation  is the complete (time) data collection in

the relevant HYDRA program module. The objective is to track the complete time between clock-in and

clock-out of an employee and to post the times to the relevant operations in the HYDRA system. To fulfill

this requirement, HYDRA provides the waiting period processing where all times that an employee is not

logged on to an operation are automatically posted to a waiting period operation.

Multiple systems exist to calculate incentive wages. On one side there are systems to calculate person-

related piecework, on the other there are purely group-related bonus systems. The premium system used

specifies which data recorded in HYDRA is used to calculate the incentive wage.

Using data of the Shop Floor Data Collection (BDE)

The BDE personnel postings are often used to calculate individual piecework or person-related bonuses.

To calculate group bonuses, the BDE order postings and sometimes the BDE personnel postings specify

the key figures used. To distribute group results to the separate persons, the system generally uses the

BDE personnel postings.

In  the  BDE,  the  following  data  is  automatically  transferred  from  the  operation  to  the  BDE  order  and

personnel  posting  when  an  OP  or  a  person  is  logged  on  (condition:  the  HYDRA  products  to  calculate

premium and incentive wage and/or to calculate group bonuses are licensed):

LLE-BPL_81.docx

Version: 1.0.23049

Page 6 of 43

Calculation of Bonus Wages/Incentive Wages

  Single piece specification te

Specified in format hours with 3 decimal places per 1000 pieces

  Setup specification tr

Specified in format hours with 3 decimal places

  Single piece specification for the production resource teb

Specified in format hours with 3 decimal places per 1000 pieces

  Setup specification for the production resource trb

Specified in format hours with 3 decimal places

  Wage type

The wage type often specifies how a data record is used for the incentive wage calculation. Different

wage types exist for piecework, bonus wage, time wage, overhead costs or other.

  Premium group

If  the  HYDRA  product  to  calculate  group  bonuses  is  licensed,  then  the  premium  group  assigned  to

the  machine  is  transferred  to  the  order  and  personnel  postings.  Optionally  and  as  part  of  a

customization, the premium group can be entered on the BDE terminal when the order is logged on.

In  rare  cases  of  the  incentive  wage  calculation,  the  operator  position  (function)  of  the  person  at  the

machine  is  relevant.  If  required,  this  operator  position  can  be  entered  and  then  processed  when  the

person is logged on. This is a custom function. Another special feature of the incentive wage calculation

can be that the person can enter a premium indicator for the activity performed when the person logs on.

This  premium  indicator  is  then  used  to  calculate  the  formula-based  premium  wage.  This  functionality  is

implemented via customization.

Using data of the Personnel Time Management (PZW)

In seldom cases, the data of the Personnel Time Management (PZW) is used to calculate the incentive

wage.  You  can  use  PZW  wage  type  postings  or  the  totaled  work  day  result  to  calculate  the  piecework

wage or an individual bonus.

In some cases, the PZW wage type postings are assigned to the premium groups via "Change of group".

The  PZW  wage  type  postings  are  then  used  to  calculate  the  key  figures  for  the  group  bonus  and/or  to

distribute the group results to the persons.

LLE-BPL_81.docx

Version: 1.0.23049

Page 7 of 43

Calculation of Bonus Wages/Incentive Wages

Using data of the Premium and Incentive Wage (LLE)

On  the  office  client,  you  can  optionally  record  bonuses  and  changes  of  group  (additional  license  or

customization)  for  the  calculation  of  the  Premium  and  Incentive Wage  (LLE).  It  depends  on  the  system

used  to  calculate  the  incentive  wage  whether  bonuses  or  changes  of  group  are  included  in  the

calculation.

You can use bonuses to manually change the premium calculation.

You can use the changes of group to assign the person-related data records of the PZW or the BDE to

premium groups.

Data processing

The postings of the employees for the orders they have processed are logged in the HYDRA system. On

a daily basis, these postings are transferred to the data of the incentive wage calculation to calculate the

wages.  Because  of  the  above  mechanism,  the  incentive  wage  calculation  only  includes  data  up  to  the

previous day because the attendance times of the current day are only available on the next day.

If  you  want  to  correct  wage-relevant  data,  you  directly  use  the  editing  functions  of  the  shop  floor  data

collection  and  the  personnel  time  management  and  you  therefore  directly  change  the  output  data.  The

incentive wage calculation then processes the data with the next run of the wage calculation (usually on

the next  day). The data recorded in the  HYDRA system, e.g. BDE personnel postings,  is only stored in

the system for a specified time (35 days by default).  You can only make changes to this data during this

time.

For  the  HYDRA  Premium  and  Incentive  Wage,  you  can  configure  a  longer  period  for  the  retention  of

wage-relevant  data  on  the  HYDRA  server.  If  you  need  a  longer  period  of  data  retention,  these  settings

can  be  changed  in  the  system.  If  you  are  not  sure  about  the  configuration  of  the  data  management,

contact MPDV.

Overview

The wage calculation is the core function of the Premium and Incentive Wage. The system uses the BDE

and PZW postings of the employees to calculate the results for the time tickets or the work day results of

the persons and premium groups.

There are two options to start the wage calculation:

  1.  Use the HYDRA scheduler to start a daily  wage calculation that calculates all  work day results for

persons and premium groups up to the previous day.

  2.  Manually start the calculation via GUI for specified days and persons or premium groups. For more

information, refer to the documentation of this application on the client.

LLE-BPL_81.docx

Version: 1.0.23049

Page 8 of 43

You can repeat the wage calculations as often as you like. Make sure that the data of the relevant day is

Calculation of Bonus Wages/Incentive Wages

still available in the system.

For further information, refer to the following documents:



Information on the settlement day.



Information on the performance efficiency calculation.



Information on the group bonus and premium areas.

Automatic recalculation of historical data

In mode Required days until, the  wage calculation automatically recalculates all  day results for persons

and  premium  groups  up  to  the  date  transferred.  To  this  end,  the  system  memorizes  whether  changes

have  been  made  to  data  of  persons  or  premium  groups.  The  relevant  day  results  for  persons  and

premium groups must then be recalculated. Also the automatic wage calculation entered in the scheduler

starts in this mode and recalculates all relevant data up to the day before today.

The logs of the automatic wage calculations entered in the scheduler are recorded in the HYDRA system

logs as application HYL_COMPUT. The manual wage calculation also creates entries here. The column

Number  of  data  records  shows  the  sum  total  of  the  calculated  day  results  for  persons  and  premium

groups. It provides an approximate evaluation of the volume that must be calculated.

The following activities trigger an automatic recalculation for the relevant days:

  Editing  of  bonuses  (also  approval/rejection)  for  the  relevant  person  or  premium  group  on  the

specified day

  Editing  of  PZW  wage  type  postings  (also  approval/rejection)  for  the  relevant  person  on  the

specified day (also if the data has been passed from external systems via interfaces)

  Recalculation  of  day  results  by  the  PZW  labor  time  calculation  for  the  relevant  persons  on  the

specified day

  Editing  of  BDE  postings  using  the  editing  function  for  order-related  postings  of  the  relevant

person or premium group on the specified day

Some editing activities do not trigger an automatic recalculation because very long periods of time or very

large data volumes might be affected. In theses cases, the user must manually start a wage calculation in

mode Period for the relevant persons or premium groups, if required. Examples of such activities:

LLE-BPL_81.docx

Version: 1.0.23049

Page 9 of 43

Calculation of Bonus Wages/Incentive Wages

  Editing of changes of groups (these can cover a very long period)

  Editing of master data of premium groups (a period cannot be limited effectively).

  Editing  of  assignments  of  premium  groups  to  premium  areas  (a  period  cannot  be  limited

effectively).

Combining consecutive time tickets

This function is used to combine BDE personnel postings that have been interrupted by an automatic shift

change. This is required in case of an overtime after end of shift. With a manual recording of quantities,

the problem is then that the first part of the posting has a duration, but no quantity. The second part of the

posting then includes the complete quantity recorded with staff logoff, but includes only a short duration. If

the  wage  calculation  calculates  each  of  these  postings  separately,  then  the  resulting  performance

efficiency rates would be very low with posting 1 and very high with posting 2.

To avoid this problem, the wage calculation can combine similar BDE personnel postings that are directly

one after the other in time and consider them as one posting and then create one time ticket.

To activate the function to combine consecutive time tickets, go to the Basic settings for incentive wage.

The following conditions must be fulfilled to combine two BDE personnel postings:

Column
Machine
Person
Order/operation
Cost center
Quantity units
Times of postings

Condition
must be the same
must be the same
must be the same
must be the same
must be the same
Logoff time of the first posting must be identical to the logon time of the
second posting.
must be the same

Wage specifications te, tr,
teb, trb
must be the same
Wage type
Premium group (cid:129)
must be the same
Operator position/function  must be the same
must be the same
Premium indicator
must be the same
Performance units
Numeric user fields must be 0 or empty with both postings. Alphanumeric
User fields
user fields must be identical in the first and second data record.

When  two  BDE  postings  are  combined,  the  data  is  either  totaled  or  the  data  of  the  second  posting  is
used:

Column
Quantities
Quantity reasons

Action
are totaled.
of the second posting are used. (The second posting includes the

LLE-BPL_81.docx

Version: 1.0.23049

Page 10 of 43

Calculation of Bonus Wages/Incentive Wages

Times of postings

Shift information
Durations and resource
performance accounts
Interruption reason

Performances

information on the event that triggers the logoff).
are identified using the logon time of the first posting and the logoff time of
the second posting.
of the second posting is used.
are totaled.

of the second posting is used. (The second posting includes the
information on the event that triggers the logoff).
are totaled.

LLE-BPL_81.docx

Version: 1.0.23049

Page 11 of 43

Calculation of Bonus Wages/Incentive Wages

3  Wage Calculation

Overview

Menu

Human resources management  Incentive wage  Lohnberechnung

Transaction code

iwcalc

Function authorization

iwcalc.*

You  use  this  application  to  start  the  wage  calculation  of  the  the  incentive  wage.  The  wage  calculation

uses postings of the employees (e.g. of the BDE and PZW) to calculate the time tickets and the work day

results of persons and premium groups.

The Incentive Wage Calculation is described in a separate document.

The section below describes the manual start of the wage calculation.

In  the  course  of  the  wage  calculation,  interrelationships  can  occur  that  are  not  predictable  because

persons can  work for different  premium groups at the same time. Therefore,  you can hardly exclude or

lock specific persons or premium groups when you start the wage calculation. Instead, the system does

not allow to run different wage calculations at the same time. Only one user can start a wage calculation

at  a  time.  For  the  other  user  who  starts  a  wage  calculation,  a  relevant  message  is  displayed  in  the  list

Wage  calculation.  This  user  must  put  off  the  start  to  a  later  point  in  time.  This  lock  also  affects  the

generation of the LLE interface file because it is not guaranteed that the data is complete when a wage

calculation  is  run.  In  this  case,  the  system  does  not  output  the  usual  wage  calculation,  but  shows  a

warning message.

LLE-BPL_81.docx

Version: 1.0.23049

Page 12 of 43

Calculation of Bonus Wages/Incentive Wages

Selection criteria

The application provides the following selection criteria:

Evaluate staff

If this option is checked, the time tickets of the persons are recalculated. If this option is not active,

only the time tickets of premium groups that have been recalculated are updated. You can limit the

persons that must be recalculated using the other fields. If the selected persons worked in premium

groups, it is possible that persons are recalculated who were not included in the original selection

because these persons also worked in the premium groups involved.

LLE-BPL_81.docx

Version: 1.0.23049

Page 13 of 43

Calculation of Bonus Wages/Incentive Wages

Evaluate premium groups

If  this  option  is  enabled,  the  premium  group  results  are  recalculated.  The  user  can  use  the  other

fields  to  further  restrict  the  premium  groups  to  be  calculated.  The  system  might  also  recalculate

groups  that  were  not  included  in  the  original  selection  because  some  of  the  selected  persons

worked in several premium groups.

Recalculate Required days until

All persons and premium groups selected for recalculation are recalculated up to the specified date.

On  the  specified  date,  recalculation  is  also  performed  for  persons  and  premium  groups  without

existing  wage  calculation  for  the  day.  The  activities  that  trigger  an  automatic  recalculation  of  a

person or premium group are described in the documentation Incentive Wage Calculation.

Recalculate Fixed period

A  recalculation  of  all  persons  and  premium  groups  is  performed  for  the  specified  period.  It  is

recommended to restrict the data using the personnel numbers and premium groups. For reasons

of security, the system limits the period that can be recalculated to a maximum of 31 days in a row.

Field descriptions

Number of staff

Number of HR master data versions included in the original selection

Number of daily personal results

Number of recalculated personal work days

Number of time tickets

Number of recalculated personal time tickets

Number of premium group days

Number of recalculated days of premium groups

Note

Information on the completion of the wage calculation. The possible notes are described below.

Notes on the wage calculation

"Person 123456 day not computable. Reason: XYZ archiving."

With evaluation Required days until: For this person, the specified day must be evaluated, but the

data required of the product group specified is no longer available. The earliest possible date that

can  be  evaluated  results  from  the  last  retention  date  according  to  the  data  management

configurations of the specified product group. If the archiving program has not yet been performed

for  the  data,  the  earliest  possible  date  is  identified  using  the  earliest  data  records  in  the  product

group  including  a  safety  margin  of  one  day.  The  PZW  data  must  have  been  calculated  by  the

workday evaluation.

LLE-BPL_81.docx

Version: 1.0.23049

Page 14 of 43

Calculation of Bonus Wages/Incentive Wages

"Locked by user XX, client XX, module XX."

"Locked. Please try again later."

Another user has already started a wage calculation or an automatic wage calculation is performed

in the background. Only one wage calculation at a time can be performed in the system. Try again

a short time later.

"Start date limited since data not available."

With evaluation Fixed period: The period specified starts before the earliest possible date that can

be evaluated. Date from has been set to the earliest possible date that can be evaluated. See also

note "Day not computable since data not available."

"ERR start date after end date."

With  evaluation  Fixed  period:  The  Date  to  is  before  the  Date  from.  This  message  can  also  be  a

subsequent failure of the message "Start date limited since data not available."

"ERR Maximum nbr of 31 days exceeded"

With evaluation Fixed period: You can select a period covering a maximum of 31 days. This limit is

used to protect the user from accidentally entering incorrect dates in the date fields.

LLE-BPL_81.docx

Version: 1.0.23049

Page 15 of 43

Calculation of Bonus Wages/Incentive Wages

4

Incentive Wages Basic Settings

Overview

Menu

Master data  Incentive wages  Incentive wages basic settings

Transaction code

iwset

Function authorization

iwset.*

This  application  provides  the  basic  settings  for  HYDRA  incentive  wage  determination.  When  using  the

formula-based incentive payment LLE-FBL, the settings entered here cannot be overridden by customer-

specific formulas.

Basic settings for incentive wage can only be edited. It is not possible to insert or delete data records.

LLE-BPL_81.docx

Version: 1.0.23049

Page 16 of 43

Calculation of Bonus Wages/Incentive Wages

Settings are divided into two sections.

The first page includes options for general settings and time ticket types:

Field Description for the "Options" Tab

HYDRA-PZE paid break is productive

If a performance level is calculated on basis of the PZE attendance time and the PZE time is not

determined using the PZE wage type postings, this option can be used to control whether the paid

breaks configured in the PZE are considered as productive time and are consequently included in

the actual time for piecework calculation.

This setting is also considered in the Labor time comparison.

LLE-BPL_81.docx

Version: 1.0.23049

Page 17 of 43

Calculation of Bonus Wages/Incentive Wages

Summarize directly consecutive time tickets

If this option is activated, equal, directly consecutive ADE personnel postings are summarized to a

single  posting  in  wage  calculation  and  consequently  only  one  time  ticket  is  generated.  The  ADE

postings themselves remain unchanged.

Such postings mostly result from automatic shift changes.

A detailed description of this function can be found in the document on incentive wage calculation.

Order types subject to authorization

Here, ADE order types may be entered, separated by comma. ADE postings of these order types

must  first  be  authorized  by  foremen  and/or  specialists  before  they  are  included  in  the  wage

calculation.

Process default setup time

If this option is activated, the default time is calculated according to the following formula:

  Quantity m * Production time te + Setup time tr.

If this option is not selected, tr is not considered and the default time is calculated according to the

formula:

  Quantity m * Production time te

Depending  on  the  other  options  of  'Basic  settings  for  incentive  wage',  quantity  m  is  composed  of

yield and/or scrap.

te stated per x pcs.

Production  time  te  is  indicated  for  piece  number  x.  By  default,  te  is  indicated  for  1000  pieces  in

HYDRA. This value may only be modified in exceptional cases and in consultation with MPDV, as

any change may have significant technical consequences.

tr for first logon or order only

If this option is highlighted, the default values tr und trb are only adopted in the ADE order posting (U

or  E  record)  upon  the  first  logon  of  an  operation  in  data  collection.  In  the  ADE  posting  records

below, the fields remain empty.

tr for first logon of staff to OP only

If this option is highlighted, the default values tr und trb are only adopted in the ADE order posting (B

record)  upon  the  first  logon  of  a  person  on  an  operation  in  data  collection.  In  the  ADE  posting

records below, the fields remain empty.

Yield included in performance level computation

If this option is active, the yield is included in the default time calculation.

Scrap quantity included in performance level computation

If this option is active, the scrap produced is included in the default time calculation.

LLE-BPL_81.docx

Version: 1.0.23049

Page 18 of 43

Calculation of Bonus Wages/Incentive Wages

Upper and lower limit for performance efficiency rate warning

If  the  limit  values  set  here  are  exceeded  or  fallen  short  of  in  the  calculation  of  a  performance

efficiency rate, an entry in the messages list is made by wage calculation. No entry is made in the

messages list if both values are 0.0 or if the upper limit is less than the lower limit.

Piecework calculation of performance efficiency rate

This  option  determines  how  the  piecework  performance  efficiency  rate  is  calculated  in  the  daily

results of persons. The default time for the performance efficiency rate calculation in both options is

determined using the ADE personnel postings on the basis of the quantity and single unit default te

and,  where  appropriate,  tr.  The  actual  time,  however,  is  calculated  differently  according  to  the

setting selected:

Only from ADE

The  actual  time  results  from  the  ADE  personnel  postings  and,  depending  on  other  settings,

according to the resource performance accounts or the entire labor time.

From ADE and PZE

The  actual  time  for  piecework  calculation  results  from  the  PZE  time  of  the  employee  on  that  day

minus the time recorded on other time tickets.

This  means  the  times  of  the  time  ticket  types  Time  wage,  On-the-job  training,  Overhead  costs,

Waiting  period  and  Group  incentives  are  deducted  from  the  PZE  time.  The  remaining  time  is  the

actual time for piecework calculation in the daily results of the employees.

The PZE time Tpze is determined in accordance with the following rule:

1) If there is a wage type with an active Labor time for incentive wage identification, the PZE time is

composed  of  the  PZE  wage  type  postings  and  represents  the  total  of  all  wage  types  with  active

Labor time for incentive wage identification.

2)  If  there  is  no  wage  type  with  an  active  Labor  time  for  incentive  wage  identification,  the  total

attendance time of the daily result calculated by Personnel time management is considered as PZE

time.

Time-related time tickets from piecework calculation

If  this  option  is  activated,  specific  resource  performance  accounts  can  be  eliminated  from  the

piecework  time  for  BDE  postings  to  piecework-capable  operations  and,  where  required,  be

classified with a wage type for time wage. Please also refer to the further descriptions of LLE basic

settings.

LLE-BPL_81.docx

Version: 1.0.23049

Page 19 of 43

GRPKARGKEAZLpzeTTTTTTtimeActual

Calculation of Bonus Wages/Incentive Wages

Waiting period time tickets

If this option is activated, time tickets are created from BDE waiting period postings. This requires

use of waiting period processing of BDE. Waiting period time tickets are assigned with a wage type

by standard wage type determination according to the waiting period order for the employee waiting

period.

In incentive payment determination, waiting period postings may only be compensated for as time

or overhead costs wage in individual incentives, since there is no relation to an incentive-relevant

time. As this does not constitute appropriate processing in incentive payment determination, waiting

period  postings  should  be  avoided  at  the  order  entry  stage.  This  is  supported  by  a  good  posting

discipline  of  employees.  Waiting  period  postings  which  do  appear  should  subsequently  be

corrected to appropriate activities by maintaining order-related postings.

As regards group incentives, waiting period postings usually cannot be reasonably allocated to an

incentive group and should therefore be avoided.

Time tickets for PZE time, PZE wage type

If  this  option  is  activated,  a  PZE  time  ticket  is  created  for  the  employee's  entire  PZE  attendance

time per day. The time ticket includes the wage type according to the basic settings.

LLE-BPL_81.docx

Version: 1.0.23049

Page 20 of 43

Calculation of Bonus Wages/Incentive Wages

The second page  of the LLE basic settings includes  options to control the actual time determination for

piecework wage and time-related wage portions on the basis of resource performance accounts:

Field Description for the "Performance level computation acc. to RPA" Tab

Calculate actual time from RPAs, RPA 1 through RPA 12

If  these  options  are  selected,  only  the  selected  resource  performance  accounts  RPA  1...12  are

used  for  the  actual  time  calculation.  If  no  resource  performance  account  is  activated,  the  entire

proportional labor time is used.

Assignment RPA to wage types, wage type for RPA 1 through 12

RPAs can be allocated to wage types which result in time-related tickets and are hence considered

as time wage times in the  confirmation to a superordinate  wage system. A resource performance

account  can  only  be  allocated  to  a  wage  type  if  it  is  not  used  to  determine  the  piecework  actual

time.

LLE-BPL_81.docx

Version: 1.0.23049

Page 21 of 43

Calculation of Bonus Wages/Incentive Wages

LLE-BPL_81.docx

Version: 1.0.23049

Page 22 of 43

Calculation of Bonus Wages/Incentive Wages

5  Performance Level (LLE)

Synonyms

The term "Performance efficiency rate" is commonly used in the context of the piecework wage

calculation.

Definition

The performance level is the measurement of performance used to calculate premium/incentive wages. It

is the results from a target/actual comparison and is shown as a percentage.

Most of the time,  you compare a target time with the actual time. The target time is usually specified in

such a way that it doesn‘t exceeded by the actual time, so that the performance levels are normally above

100%.  This  is  due  to  improve  employee  motivation.  To  say  "I  achieve  more  than  100%"  is  more

motivating than saying "I have only achieved 90% of the target performance".

Performance level for piecework

The performance level is calculated in the classic piecework rate by  putting the target time in relation to

the actual time. Data for piecework calculation origin from the BDE personnel postings (B records). The

"Wage  calculation"  generates  from  the  BDE  personnel  postings  valuated  time  tickets  which  include  the

performance efficiency rate.

𝑝𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒𝐿𝑒𝑣𝑒𝑙 =

𝑠𝑡𝑎𝑛𝑑𝑎𝑟𝑑𝑇𝑖𝑚𝑒
𝑎𝑐𝑡𝑢𝑎𝑙𝑇𝑖𝑚𝑒

∙ 100%

  The actual time in piecework depends on the basic settings for incentive wages. However, this is

usually  the  proportionately  calculated  working  time  deduced  from  the  logon  of  a  person  in  the

order data entry (B records).This is calculated proportionally for multiple machine operation.  You

can also use the basic settings for incentive wages to specify that the actual time for piecework is

only made up of certain RPAs used for personnel postings.

  The target time column results from the single piece target te and the quantity as well as the setup

time target tr  stored at the operation:



𝑠𝑡𝑎𝑛𝑑𝑎𝑟𝑑𝑇𝑖𝑚𝑒 =

𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑖𝑦∙𝑡𝑒
1000

+ 𝑡𝑟 + 𝑏𝑜𝑛𝑢𝑠𝑒𝑠

  The te is usually listed in HYDRA in hours per thousand pieces [h/1000].

LLE-BPL_81.docx

Version: 1.0.23049

Page 23 of 43

Calculation of Bonus Wages/Incentive Wages

  The quantity is made up of the yield or yield + scrap, depending on the basic settings for incentive

wages.

  The tr is only offset if this is activated in the basic settings for incentive wages.

  The collected bonuses are added to each time ticket that matches the employee's personnel and

order number on the date and, as a result, is totaled in the person's daily result.

The performance level is calculated for piecework time tickets and in the daily results of the persons.

A performance level is also calculated for time tickets with other time types if the required basic data is

available. However, these performance levels only serve as information for the particular time tickets and

are not included in further payroll accounting.

To correctly determine the target time for single piecework, the person-related collection of the produced

quantities  in  the  order  data  collection  is  a  mandatory  requirement.  A  quantity  posting  to  the  logged  on

persons takes place in HYDRA for the following terminal postings:

1.

Log off a person from an order/workplace

2.

Partial confirmations/uploads

3.

Interrupting and completing orders:

1) at group workplaces

2) at individual workplaces: for the person who has been logged on for the longest time, but only if

the option "Quantity posting to person" is activated when configuring the machine or workplace.

If one of the two conditions is not fulfilled when interrupting or completing orders, the quantities are

only posted to the operation, and it is not possible to determine the correct performance level for

machine operators!

When using "Formula-based premium/ incentive wages", customer-specific formulas can result in

different calculation methods for performance levels.

Performance level for group incentives

You can also calculate performance levels for group incentives. The Calculation rules depend on the type

of group incentive.

LLE-BPL_81.docx

Version: 1.0.23049

Page 24 of 43

Calculation of Bonus Wages/Incentive Wages

6  Evaluation Date

Definition

The settlement date defines to which logical settlement date a data record belongs. In particular in night

shifts the settlement date may be different from the posting date.

Synonyms

Settlement date, settlement day.

Example

A  night  shift  starts  on  10:00  pm  and  ends  on  6:00  am  of  the  next  day.  An  order  posting  or  a  clocking

record from personnel time management from 4:00 am to 6:00 am of the following day will, however, still

belong to that day on which the night shift starts. The settlement date will be that day, on which the shift

starts.

Assignment of the evaluation date of postings from shop floor data

collection for incentive wage and labor time comparison

Both the labor time comparison and the incentive  wage calculation depend on  a uniform assignment of

the time and labor data from time and attendance and of the recorded postings from the shop floor data

collection to one consistent settlement day. In particular in case of night shifts and irregular working times

this is a certain challenge since the definition of the settlement date in PZW and BDE itself is not carried

out according to exactly the same rules. In general, the assignment of the working time of a person to a

settlement date from PZW is leading since the subsequent day calculation carried out by PZW allows for

a  coherent  assessment  of  a  work  day,  which  is  not  possible  in  the  online  recording  of  BDE.  In  BDE,  a

personnel  posting  is  saved  online  without  that  it  is  known  whether  there  will  be  additional  personnel

postings for the same work day or not.

If therefore day-wide shift models with a  night shift possibility are  defined in the PZW or BDE, this may

lead to differences between PZE and BDE in the labor time comparison since BDE postings are assigned

to  a  different  day  than  the  corresponding  PZW  time  due  to  varying  shift  models  and  for  evaluation

purposes.

Please check in those cases the BDE postings also for the adjacent days in the maintenance of postings

dialog.  To  assign  the  BDE  personnel  postings  to  a  settlement  date,  two  columns  are  used  that  can  be

displayed in the list of the maintenance of postings dialog:

LLE-BPL_81.docx

Version: 1.0.23049

Page 25 of 43

Calculation of Bonus Wages/Incentive Wages

Field settl. date

If the settlement date is completed, the BDE-posting will be assigned to that day. The field will be

completed  by  the  PZW  labor  time  calculation  or  the  editing  of  postings  relating  to  orders  or  the

wage calculation.

This means that the field for all postings of the current day will normally first be empty and only be

updated on the next morning through the  PZE labor time calculation and/or the  wage calculation.

This means that postings of the current day may initially be incorrectly assigned to the day before.

This incorrect assignment will in general automatically disappear on the next day.

Please  note:  The  PZW  labor  time  calculation  only  fills  out  the  settlement  date  in  the  personnel

postings of BDE if one of the functions LLE-BPL (calculation of bonus/incentive wages), SIS-APB

(comparison of labor/shop floor times) or SIS-NPB (subsequent input of labor/shop floor postings)

has been licensed.

Field shift date

If the field Settl.date is empty, the field shift date will be used for assignment purposes. If the shift

date does regularly not match the PZE assignment, the BDE shift models must be adapted.

Assignment by labor time calculation (personnel time management)

By  default,  the  assignment  of  the  BDE  postings  to  PZE  work  days  is  made  according  to  the  following

rules.  Please  note that  these default rules may have  been changed by the customizing of the incentive

wage determination.

BDE personnel postings (B records)

Personnel  postings  are  assigned  to  the  PZE  personal  performance  (day)  if  they  reach  into  the

rounded working times of the posting person in a time frame of +/- 2 hours. If a personnel posting

takes several days, it will be assigned to the first possible PZW personal performance (day) since

the log-off has usually been forgotten in those cases.

Order related BDE postings

Order-related BDE postings may be accounted for in the calculation of a LLE group incentive. For

the BDE/PZE comparison itself they are not important.

BDE  order  postings  (U/E/T  records)  are  assigned  to  the  PZE  personal  performance  (day)  of  the

posting person to the extent that their log-off time lies in a time frame of +/- 2 hours to the rounded

working times of the posting person. If a BDE order posting takes several days, it will be assigned

to  the  last  possible  PZE  personal  performance  (day)  since  the  posting  person  of  the  BDE  order

posting  will  be  defined  from  the  log-off  event  and  since  the  person,  who  logs  off,  posts  the

quantities. If no personnel number is recorded in the BDE order posting, the settlement date cannot

be assigned on the basis of the time and attendance function.

LLE-BPL_81.docx

Version: 1.0.23049

Page 26 of 43

Calculation of Bonus Wages/Incentive Wages

Assignment by wage calculation (incentive wages)

Even if Personnel Time Management (PZW) is not used in HYDRA, wage calculation as part of incentive

wage  determination  results  in  BDE  personnel  postings  being  assigned  to  a  settlement  day  that  might

deviate from the BDE shift date. This is due to the fact that a person’s working day is to be considered as

completed even though the person works from night shift until the next day’s early shift.

Please  note  that  these  default  rules  may  have  been  changed  by  the  customizing  of  the  incentive  wage

determination.

BDE personnel postings (B records)

By default, the assignment is made according to the following rules:

1)

If a BDE personnel posting starts between 10.00 a.m. and 11.00 p.m. it pertains in any case to

the date of logging in.

2)  All BDE personnel postings starting after 11.00 p.m. and not starting later than 2.00 hours after

the previous BDE personnel posting are still assigned the considered settlement day, provided

they do not start later than 10.00 a.m. of the next day.

3)

If  a  BDE  personnel  posting  ends  after  11.00  p.m.  and  has  a  gross  duration  of  more  than  12

hours, this posting will not be affected by this rule. This is reasonable as it avoids unintentional

summarization of working days over night if persons forgot to log off.

If HYDRA Personnel Time Management (PZW) is in use, the end of day limit (11.00 p.m.) is taken

dynamically  from  the  PZW  end  time  of  the  affected  daily  personnel  performance.  The  end  of  day

limit is defined based on the PZW end time. Optionally, this limit can be extended by a configurable

tolerance by MPDV customizing services.

The start of day limit (10.00 a.m.), end of day limit (11.00 p.m.) and the maximum gap (2.00 hours)

can be modified by MPDV customizing, if required, to be able to assign the night shift to the next

day, for example (start of day limit 2.00 a.m., end of day limit 3.00 p.m.).

BDE postings relating to orders

Order-related  BDE  postings  might  be  included  in  the  calculation  of  an  LLE  group  bonus.  In  this

case,  wage  calculation  does  not  assign  them  separately  to  a  settlement  day  but  takes  over  the

assignment made in BDE (shop floor data collection) or PZW (personnel time management).

LLE-BPL_81.docx

Version: 1.0.23049

Page 27 of 43

Calculation of Bonus Wages/Incentive Wages

LLE-BPL_81.docx

Version: 1.0.23049

Page 28 of 43

Calculation of Bonus Wages/Incentive Wages

7  Wage types

Overview

Menu

Master data  Labor time  Wage types

Transaction code

waty

Function authorization  waty

Wage  types  are  different  categories  to  group  times  with  different  information  (e.g.  night  shift,  overtime,

etc.). We distinguish between basic wage types that are used for the payment of special working time and

bonus wage. Usually, different types of absences are also specified as different wage types.

Field description tab "Wage type"

Wage type, name

Alpha numeric identification of the wage type and name.

LLE-BPL_81.docx

Version: 1.0.23049

Page 29 of 43

Calculation of Bonus Wages/Incentive Wages

Authorization required

This option is used to define a wage type with required authorization. If the option is not active, the

system requires authorization somewhere else (e.g. in the payment day type).

Percentage

The  percentage  with  which  the  wage  type  is  compensated.  Specifying  a  percentage  only  has  an

effect if the wage type is to be posted to an account. Otherwise, this is a comment field.

Entries with 0% are not posted.

Responsibility area

A user is only authorized to edit this wage type if he or she has authorization for the assigned area

of responsibility.

Confirm wage type to payroll system

If  an  interface  to  Payroll  Accounting  exists,  you  can  use  this  option  to  specify  whether  or  not  this

wage type is transferred to the interface file.

Payroll wage type

You use the wage type to post information to the payroll department.  This field is not processed in

all interfaces.

Payroll control option

A field for customer specific processing.

Purpose

Specifies  whether  the  wage  type  should  be  used  to  calculate  planned  working  time,  overtime  or

undertime.  It  is  also  possible  not  to  specify  anything.  The  wage  types  marked  with  Overtime  are

listed  in  the  Overtime  column  of  the  time  sheet.  The  same  applies  to  the  use  of  Undertime,  but

these times are displayed as negative.

Type

Specifies whether the wage type is a basic or a bonus wage type.

Field description tab "Settings"

Processing

Note on how this wage type is used. This is a comment field and can be left empty.

Selection field

A field for customer specific processing.

LLE-BPL_81.docx

Version: 1.0.23049

Page 30 of 43

Calculation of Bonus Wages/Incentive Wages

Average Type

The field "Average type" is processed with the aid of interfaces to transfer "Monthly wage types" to

the payroll systems LOGA and  Abacus.   You can find further information  in the  description of the

interfaces.

Rounding of wage type

The  fields  "Interval"  and  "Limit"  (both  in  the  format  hours:minutes)  can  be  used  for  rounding  the

daily duration of a wage type. The interval forms the points in time used to round up or down.  The

limit  specifies  up  to  what  point  in  time  the  system  rounds  down  during  the  interval  and  when  it

rounds up. If no rounding to wage types is required, you do not need to make an entry.

Wage  types  are  rounded  after  the  "Additional  allowances  rule"  and  the  "Wage  type

interaction" were processed.

Use wage type for comparison with BDE.

You  can  use  the  Comparison  function  to  compare  data  in  the  order  data  entry  for  rounding  in

personnel time recording. This is done with the wage types that are marked here.

Delete wage type after comparison with BDE.

If  this  wage  type  is  only  a  processing  wage  type  for  comparison  and  can  be  deleted  after  the

comparison.

Field description Tab "Incentive wage"

Time type

This field specifies the "Time wage, "Piecework" and "Overhead costs".

Labor time for incentive wage

This wage type  is used to deduce the PZE labor time from the PZE wage type  posting  when  you

calculate the performance efficiency rate for piecework from ADE and PZE.

If the wage type is activated with this option, then the PZE labor time is always deduced using the

PZE  wage  type  posting  no  matter  what  person.  If  the  wage  type  cannot  be  activated  with  this

option, then you use the attendance time from the PZE as the labor time.

Incentive wages option

You  only  use  this  option  if  you  calculate  a  formula-based  incentive  wage  with  a  customized

processing.

Labor time for group bonus

This field controls how PZE wage type postings are included in the calculation of the group bonus

using formula-based incentive wages. This field is not relevant if you have a standard group bonus

without formula-based incentive wage calculation.

LLE-BPL_81.docx

Version: 1.0.23049

Page 31 of 43

Calculation of Bonus Wages/Incentive Wages

  Not included in the group bonus

PZE wage type postings for this wage type are not included as labor time in the group bonus.

Using cost center for posting

The cost center in the PZE wage type posting is interpreted as a premium group. In this case, the

cost center for the PZE and the premium groups of LLE must be identical.  Transfers to other

premium groups can be achieved by manually assigning:

cost centers in the PZE clockings and postings

temporary cost centers

HR master data versions

cost center entries at the PZE terminal

cost center changes.

Using premier groups from the HR master data

With this option  you assign the PZE wage type postings entered in the premium groups using the

premium group of the HR master data.  Persons can be transferred to other premium groups on a

daily basis by creating HR master data versions.

Using group assignments

You use the function "Change of group" to assign people to the premium groups down to the exact

minute.  The assignment from the group changes is transferred to the PZE wage type postings for

this wage type and then you can include the wage type posting for the group calculation. In order to

do so, you separate the wage type postings if a group change takes place during the posting.

Quantity determination by

You  use  this  option  to  control  how  the  quantities  for  piecework  are  calculated  when  persons  are

posted in the ADE.    This is relevant for wage type with the time type "Piecework".

Basic settings

LLE  basic  settings  The  system  calculates  the  quantities  for  the  time  ticket,  which  includes  scrap

and yield from the primary quantities if the setting is made.

Wage type

You  can  use  the  matrix  to  set  which  quantity  fields  of  the  ADE  posting  are  used  to  calculate  the

quantity for the time ticket.

Toolbar

Update accounts

Update  accounts  With  "Update  accounts"  you  specify  which  wage  types  are  used  to  increase  or

decrease amounts for certain accounts.

LLE-BPL_81.docx

Version: 1.0.23049

Page 32 of 43

Calculation of Bonus Wages/Incentive Wages

Additional allowances rule

You  use  the  option  "Add.  allowances  rule"  to  post  an  additional  bonuses  if  employees  work  on

special  days.  Additional  allowances  rule    Likewise,  fixed  special  payments  such  as  fare,  lunch

money or similar can be made.

Wage types relations

You can configure interactions between wage types Wage type interactions .

LLE-BPL_81.docx

Version: 1.0.23049

Page 33 of 43

Calculation of Bonus Wages/Incentive Wages

8  Time Type

Definition

The time type classifies the time tickets in the premium/ incentive wage. By default, the time type is used

to control the calculations for time tickets.

The master data of the wage types and the LLE basic settings can be used to define which time times are

to be created by HYDRA and how the time tickets will then be calculated.

"Piecework" time type

The piecework time tickets serve as basis for individual piecework. Only for piecework time tickets there

is a calculation of the performance efficiency rate based on standard time, bonuses and reductions and

actual time.

Depending  on  the  wage  type  and  the  basic  settings,  the  yield,  scrap  and  set-up  standard  time  tr  of  the

personnel postings (B-records) will be taken into account in the calculation of the standard time.

Granted bonuses will be noted in a separate column in the time ticket and be transferred to the standard

time when the performance efficiency rate is calculated.

By default, piecework time tickets will be accounted for in the daily personal performance with duration,

standard  time  and  bonuses.  This  is  how  they  define  the  performance  level  of  the  daily  personal

performance.

Time type "bonus"

The  granted  bonuses  are  also  available  as  time  ticket.  As  time  type  for  these  time  tickets  the  smallest

wage type with the time type "bonus" ZUS is used. If there is no such wage type, the wage type "01" is

assigned.

Time type "Time wage"

Time-related  time  tickets  are  used  to  pay  for  production  orders  that  are  not  piecework-relevant  by  an

hourly rate.

Time-related time tickets from piecework orders

LLE-BPL_81.docx

Version: 1.0.23049

Page 34 of 43

Calculation of Bonus Wages/Incentive Wages

These time-related time tickets are used to pay for non-piecework-relevant times orders from piecework-

relevant  production  orders  by  an  hourly  rate.  A  time  ticket  will  be  generated  for  each  non-piecework-

relevant resource performance account. Also for overhead cost orders such time tickets will be generated

to the extent that the processing of overhead cost order time tickets is activated in the LLE basic settings.

The  assignment  of  resource  performance  accounts  to  time  wages  from  piecework  is  made  in  the

incentive wage basic settings.

"On-the-job training" time type

Time tickets for on-the-job-training are used to pay for specially identified employees per hourly rate. As

regards their compensation scheme they are identical to the time wage and have their own time type only

for evaluation purposes.

"Overhead costs" time type

Time tickets for overhead costs are used to pay for overhead cost orders as time wage. As regards their

compensation  scheme  they  are  identical  to  the  time  wage  and  have  their  own  time  type  only  for

evaluation purposes.

Depending on the order type, it must be specified in the wage type determination that a wage type of the

time type "overhead costs" will be used. By default, these are the order types 1 (GK) or 4 (GK II).

"Waiting period" time type

Time tickets for waiting periods are used to pay for ADE waiting periods as time wage. As regards their

compensation  scheme  they  are  identical  to  the  time  wage  and  have  their  own  time  type  only  for

evaluation  purposes.  Waiting  period  postings  result  from  the  shop  floor  data  collection  when  waiting

period  processing  is  activated  in  the  basic  settings  and  the  allowed  waiting  periods  between  postings

have been exceeded.

When PZE time and attendance is used in HYDRA, the determination of the performance efficiency rate

related to PZE should be preferred to waiting period postings.

"Attendance time" time type

Time  tickets  with  the  time  type  "attendance  times"  will  be  determined  from  the  attendance  time  of  the

HYDRA  personnel  time  management.  They  are  only  used  to  represent  the  PZE  time  in  the  HYDRA

incentive  wage  and  are  taken  into  account  as  duration  in  the  daily  personal  performance  if  the  basic

settings for the incentive wage are made correspondingly and will thus define the performance level in the

performance level computation in personnel time management.

LLE-BPL_81.docx

Version: 1.0.23049

Page 35 of 43

Calculation of Bonus Wages/Incentive Wages

LLE-BPL_81.docx

Version: 1.0.23049

Page 36 of 43

Calculation of Bonus Wages/Incentive Wages

9

Interface to Payroll Accounting

Overview

Menu

Human  Resources  Management    Incentive  Wage    Interface  to  Payroll
Accounting

Transaction code

iwipr

Function authorization

iwipr.*

The  uploads  to  the  payroll  accounting  are  not  performed  automatically.  The  uploads  are  performed

manually. For the upload, the time sheets and the bonuses of all employees are provided in an interface

file on the HYDRA server in the HYDRA directory. This interface file covers a period of time that you are

free to specify. A new file (hylrueck.dat) is created each time you call the upload function. You can save

the file under any name on a data medium using a function key on the HYDRA console. For information

on  the  data  record  structure  of  the  upload  file,  refer  to  the  section  "Upload  of  wages"  in  the  HYDRA

documentation "Interface to payroll accounting".

If  you  use  the  "incentive  wage  based  on  formulas",  you  can  define  the  contents  and  formats  of  the

interface using custom formulas and scripts that are different to the ones shown in this document.

Note:

While  the  wage  calculation  is  running,  some  wage  data  is  not  available  for  other  evaluations.  For  this

reason, you cannot create the LLE interface file and run the wage calculation at the same time. A locking

mechanism  is  used  to  ensure  this.  In  this  case,  the  system  does  not  show  the  usual  screen  of  the

interface file, but a respective warning.

LLE-BPL_81.docx

Version: 1.0.23049

Page 37 of 43

When you have started the evaluation, the interface file is displayed.

Calculation of Bonus Wages/Incentive Wages

Selection criteria

Date from / to

You  can  create  the  interface  for  single  days,  if  required.  But  usually,  the  upload  is  performed  for

calendar  months.  The  system  populates  the  date  fields  with  beginning  and  end  of  the  previous

calendar month.

If required, the system automatically archives the  incentive  wage data (time tickets and results of

premium  groups)  in  the  long-term  data  area.  If  you  process  other  data  with  the  "incentive  wage

based  on  formulas",  e.g.  data  of  the  personnel  time  management,  you  must  ensure  via

customization that the data is stored for a sufficient period of time.

Transfer data to SAP

If  an  additional  function  for  the  direct  upload  of  data  to  SAP-HR  is  active  and  if  this  option  is

enabled, the data is directly uploaded to SAP (update run). If this option is disabled, the data is only

displayed  on  the  screen  (test  run).  You  can  make  as  many  test  runs  as  required  before  finally

upload the data to SAP.

Identification and customization of the source system SOURCE_SYS

Many  upload  interfaces  to  SAP  include  the  target  SAP  system  as  SOURCE_SYS  in  the  data

passed.

LLE-BPL_81.docx

Version: 1.0.23049

Page 38 of 43

Calculation of Bonus Wages/Incentive Wages

When the HR master data has been downloaded in SAP format to HYDRA using the HR-PDC, SAP

also  transfers  the  source  system  of  the  person.  This  system  is  stored  in  the  sixteenth  freely

configurable info field of the HYDRA HR master data. No further configuration is required.

If  the  HR  master  data  is  maintained  in  a  different  way,  this  entry  might  not  exist.  You  can  then

identify the source system for the upload using the ALE configuration in HYDRA (ALE = Application

Link Enabling). To this end, the source system of an active logical SAP system is read. You can set

this system in HYDRA via INI configuration.

You  identify  the  source  system  using  the  following  rule  and  priority.  If  a  source  system  could  be

identified using the listed rules in the specified order, then the other rules are not executed.

1)  Entry in info field 16 of the HR master data

If an entry is available in this field, this entry is interpreted as source system for the upload.

2)  Via logical system from INI configuration for personnel number

Via INI configuration, a logical SAP system is specified for the personnel number:

  Name of INI

"HR-LOGSYS"

Section

required logical system

Key

Value

"PNR"

Personnel number of the required person.

The active source system of the logical system is then identified.

3)  Via logical system from INI configuration for the company

Via  INI  configuration,  a  logical  SAP  system  is  specified  for  the  company  defined  in  the  HR

master data:

  Name of INI

"HR-LOGSYS"

Section

required logical system

Key

Value

"FIR"

Company.

The active source system of the logical system is then identified.

4)  Via logical system from INI configuration, default entry

Via INI configuration, you can make an entry to generally specify a logical SAP system:

  Name of INI

"HR-LOGSYS"

Section

required logical system

Key

Value

"ALL"

"Y"

The active source system of the logical system is then identified.

5)  Default identification

The active source system of the logical system "SAP" is identified.

LLE-BPL_81.docx

Version: 1.0.23049

Page 39 of 43

Calculation of Bonus Wages/Incentive Wages

If no source system could be identified using the listed rules, the field remains empty.

Detail applications

You can switch between the display of the text file and the data file. By default, the display is identical. If

you use the "incentive wage based on formulas", you can display readable information in the text file via

customization by a specialist.

LLE-BPL_81.docx

Version: 1.0.23049

Page 40 of 43

Calculation of Bonus Wages/Incentive Wages

10  Premium/ Incentive Wage Uploads

Wage types are transferred to the payroll or HR information system in the hylrck.dat file.

10.1  Data record structure for incentive wage uploads

The  interface  structure  matches  that  of  the  PZE  interface  file  except  that  some  of  its  unused  fields  are

filled in with specific incentive wage data.

Therefore, the information in the Data type column has the same meaning as in the PZE interface file, so

we will not explain it again here.

This file is structured as follows:

Field/ meaning

Position

Data type

Record type

Company

Area

Settlement year

Settlement month

Settlement number

Personnel number (left justified, filled with EMPTY)

Last evaluation day

Wage type (left justified, filled with EMPTY)

Preceding sign for wage type hours

Hours for wage type

Full days absent

Partial days absent

Different wage group

Different hourly rate

Amount

Year of supplementary payment

Month of supplementary payment

Executing (master) cost center

Charged cost center

Order number

Work sequence

Comments

Premium group

1

4

7

15

19

21

22

30

32

36

37

42

45

48

51

56

63

67

69

77

85

95

99

always "760"

C3

C8

N4

N2

C1 = EMPTY

C8

N2

C4

C1 = +

N5.2

N3 = 000

N3 = 000

C3 = EMPTY

N5 = 0

N7 = 0

N4 = Empty

N2 = Empty

C8

C8

C10 = EMPTY

C4 = EMPTY

C18 = EMPTY

117

C10

LLE-BPL_81.docx

Version: 1.0.23049

Page 41 of 43

Calculation of Bonus Wages/Incentive Wages

Performance efficiency rate

Reserved for other incentive wage data

Document number

Posting indicator

127

133

142

147

N6.3

C9 = EMPTY

C5 = EMPTY

C1 = "1"

10.2  Description of data fields for incentive wage uploads

Company:

The company from HR master data is entered here.

Area:

The area from HR master data is entered here.

Last evaluation day:

The last day of the date selection, e.g. "30" or "31"

Wage type:

Wage type from the personal time tickets

Preceding sign for wage type hour:

Is always "+".

Wage type hours:

Time that is to be posted to the wage type entered in the data record. The two decimal places are

stored in industrial minutes.

Full days absent:

Filled in with 000.

Partial days absent:

Filled in with 000.

Year, month of supplementary payment:

Empty.

Executing cost center:

Person's master cost center.

Charged cost center:

Cost center from time tickets. The wage type sum is transferred separately to cost centers.

Order number, work sequence

Unused in the default.

Premium group

Premium  group  from  time  ticket.  The  sum  total  on  the  wage  types  is  transferred  separately  to

premium groups.

LLE-BPL_81.docx

Version: 1.0.23049

Page 42 of 43

Calculation of Bonus Wages/Incentive Wages

Performance efficiency rate

The total performance efficiency rate shown on piece-work time tickets for the settlement period is

transferred  in  this  field  using  three  decimal  places.  A  performance  efficiency  rate  of  131.234%  is

converted to 131234 in this field. Six zeros (000000) are transferred on non-piece work time tickets.

10.3  Example file:

1       10        20        30        40        50        60        70        80        90       100       110       120       130       140    147
+--------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+-------
760BSPLLE     200802 40563   294000+11531000000   000000000000      105     105                                               122907              1
760BSPLLE     200802 40563   294017+00139000000   000000000000      105     105                                               000000              1
760BSPLLE     200802 40789   2901  +00464000000   000000000000      105                                                       000000              1
760BSPLLE     200802 40789   294000+11613000000   000000000000      105     105                                               131619              1
760BSPLLE     200802 40789   294012+03519000000   000000000000      105     105                                               000000              1
760BSPLLE     200802 40789   294017+00133000000   000000000000      105     105                                               000000              1

LLE-BPL_81.docx

Version: 1.0.23049

Page 43 of 43


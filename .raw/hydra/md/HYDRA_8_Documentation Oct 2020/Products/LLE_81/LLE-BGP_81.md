Manual

Calculation of Group Bonuses
LLE-BGP 8.1

Version 1.1.23049

Last changed on: 01.09.2020

Calculation of Group Bonuses

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

LLE-BGP_81.docx

Version: 1.1.23049

Page 2 of 32

Calculation of Group Bonuses

Contents

1  LLE-BGP - Overview .................................................................................... 4

2  Formation of Groups at Group Incentives .................................................... 6

3  Basics of the Group Bonus ........................................................................ 11

4

Incentive Wage Calculation - Process ....................................................... 17

5  Wage Calculation ....................................................................................... 23

6  Performance Level (LLE) ........................................................................... 27

7  Evaluation Date .......................................................................................... 29

LLE-BGP_81.docx

Version: 1.1.23049

Page 3 of 32

Calculation of Group Bonuses

1  LLE-BGP - Overview

Purpose

To  identify  group  bonuses,  the  module  Calculation  of  Group  Bonuses  complements  the  basic  module

Calculation of Premium/Incentive Wages. Different methods are used here to group persons. The system

calculates  and  shows  daily  and  monthly  results  for  the  groups.  The  incentive  wage  is  assigned  on  a

monthly  basis  to  the  persons.  It  is  calculated  using  the  attendance  time  of  the  person  in  the  separate

premium groups.

This  module  also  provides  the  possibility  to  flexibly  react  to  special  situations.  Example:  You  can  use

bonuses to react to unforeseen events in the production. You can also correct the wage calculation.

Integration

The module is based on the order- and person-related data of the order data collection. Optionally,  you

can  also  integrate  the  times  of  the  Personnel  Time  Management.  This  data  can  also  be  imported  and

processed from external systems via interfaces.

Features

The Application Service (AS) to calculate group bonuses in the form of incentive and utilization bonuses

provides the following features:

  Functions to define and edit group bonuses



Integration  of  the  incentive  wage  indicators  in  the  HR  master  data,  which  can  be  saved  in

versions



Integration of incentive wage indicators in the master data of machines and workplaces

  Optional recording of premium groups when orders are logged on

  Optional:  After  authorization  check,  employees  can  enter  bonuses  and  deductions  on  the  BDE

terminal

  Display of an information on the group incentives on the PZE terminal (Windows-based).



Interface to transfer the results to the payroll system in HYDRA standard format

  Extensive  data  security  and  safety  functions:  function  authorizations  and  protection  of  data  of

premium groups via responsibility areas

LLE-BGP_81.docx

Version: 1.1.23049

Page 4 of 32

Calculation of Group Bonuses

Note on the terminal info group incentives

If you use the Time and Attendance (PZE) and the data collection software CTAIP or CTWIN, an info is

displayed on the terminal where Time and Attendance is recorded. The terminal info displays the current

account balances.

If  you  use  LLE-BGP  "Calculation  of  group  bonuses",  this  info  displays  additional  rows  that  include  the

times  of  the  person  in  the  premium  groups  and  the  performance  level  of  the  premium  groups  for  the

current  and  the  previous  month.  For  more  information  on  this  info  function,  refer  to  the  document

describing the HR functions of the data collection software (status  2018:  documents AIP-HRF  and AIP-

HRL).

You can change or disable the info display as part of the customizing of the incentive wage module.

LLE-BGP_81.docx

Version: 1.1.23049

Page 5 of 32

Calculation of Group Bonuses

2  Formation of Groups at Group Incentives

Summary

This document describes how entered data can be assigned to the premium groups of the incentive wage

determination.

  Groups  are  mostly  formed  via  the  assignment  of  machines  to  premium  groups.  The  data

recorded at the machines will then be assigned to the corresponding premium group. This static

assignment of the machines to the premium groups is made at the client using the Assignment of

premium groups application.



Instead of the static assignment of machines to the premium groups, it is also possible to record

a  premium  group  at  the  terminal  when  an  order  is  entered  in  the  entry  dialog.  All  the  postings

connected to the order logon will then be assigned to the premium group. At one  point in time a

machine can only be assigned to a single premium group, also if several orders are logged-in to

the machine.

  Personal  data  (from  the  shop  floor  data  collection  and  the  personnel  time management,  if  any)

may as an option be assigned via the client application Change of groups to the premium group

and this assignment will be personal and be made with the precise time. In this case, however,

only the personnel postings (B-records) from the shop floor data collection can be compensated

by  the  method  of  the  time  tickets  to  the  premium  groups.  To  do  so,  the  additional  function

"formula-based  premium/  incentive  wage"  and  a  corresponding  customizing  through  MPDV  will

be required.

Order data via the machine used for posting

In  the  BDE  shop  floor  data  collection  the  premium  groups  will  only  be  processed  for  such

workplaces/ machines marked by the incentive wage indicator "G" for "group piecework"!

Per operation log-in the operation posting (U- or E-record) and the related personnel postings (B-records)

will be assigned to a premium group. Since it is possible that it is worked on several premium groups at

one workplace, both the entry of the premium group during the log-in of the operation and the assignment

of premium groups to workplaces will be possible. To do so, HYDRA uses the following logic:

1.

If  a  premium  group  is  specified  in  the  login  dialog  when  an  operation  is  logged-in,  this  premium

group will be used.

LLE-BGP_81.docx

Version: 1.1.23049

Page 6 of 32

Calculation of Group Bonuses

2.

If no premium group is specified when an operation is logged-in, the premium group assigned to the

workplaces will be used.

3.

If no premium group is specified when an operation is logged-in and if no premium group is assigned

to  the  workplace/  the  machine,  an  error message  will  be  issued;  an  operation  cannot  be  logged-in

without indication of the premium group.

The dialog configuration can be used to control (per terminal) whether the field "premium group" will be

available when an operation is logged in or not.

If  several  persons  work  on  the  same  operation  on  group  workplaces,  the  first  person  will  define  the

premium group. The following persons must not indicate another premium group than the first person.

The  assigned  premium  groups  will  then  be  stored  for  further  processing  in  the  order  and  personnel

postings. The editing of postings can be used to correct incorrectly assigned premium groups.

Dialog configuration for entry purposes at the login of OPs

An entry via an OP log-in will only be made if the workplace has the premium indicator "G" and when the

module "Calculation of group incentives" is licensed.

In this case the field for the entry of the premium group (LPRGRP) must be configured into the dialog to

log-in operations (customizing).

To  use  this  described  function,  the  dialogs  Log  OP  on  (A_AN)  and  Log  person  on  (A_P_AN)  must  be

extended by the entry field "premium group".

The bar codes for premium groups will also detected in those instances, in which the entry focus is on a

different field.

Structure of the bar codes

A bar code starts and ends with an asterisk "*" as start and stop sign.

The bar codes must be completed to nine digits useful length (between the asterisks). Due to this amount

of numbers the terminal will detect that this scanned bar code is a premium group.

The (shorter) premium group must be completed to nine digits: For filling purposes and for blanks within

the premium groups underscores"_" must be used!

The  bar  code  must  then  be  formatted  as  bar  code  "Code  39"  in  the  font  "Codedreineun".  This  font  is

available with all console PCs under Windows. It can be used to create tables with bar codes for premium

groups in all current Office applications.

The following characters are supported by the bar code "Code 39":

LLE-BGP_81.docx

Version: 1.1.23049

Page 7 of 32

Calculation of Group Bonuses









The numbers 0 to 9

Capital letters A to Z without umlauts

Blanks (to express bar codes to be written as underscore "_", see examples).

Special indicators $ / - + . %

Other characters such as lower cases will not be supported by the bar code "Code 39".

Examples:

Premium group

12345

PG 12

73

Barcode content
12345678901

Barcode
(font Codedreineun)

*12345____*  *12345____*

*PG_12____*  *PG_12____*

*73_______*  *73_______*

Maintenance of the premium group in the order-related postings

When  BDE  data  are  recorded,  they  will  be  assigned  to  premium  groups  depending  on  the  system

configuration. The premium group is a data field in the BDE postings and is displayed in the "wage data"

tab and can also be modified there.

When  the  premium  group  is  changed  in  the  editing  of  postings,  HYDRA  will  ensure  that  order  and

personnel  postings  that  belong  together  will  have  the  same  premium  group.  The  system  will  recognize

that  order  and  personnel  postings  belong  together  when  the  time-related  centers  of  the  personnel

postings are within the order posting.

LLE-BGP_81.docx

Version: 1.1.23049

Page 8 of 32

Calculation of Group Bonuses

LLE-BGP_81.docx

Version: 1.1.23049

Page 9 of 32

 Order posting Personnel postings

Calculation of Group Bonuses

LLE-BGP_81.docx

Version: 1.1.23049

Page 10 of 32

Calculation of Group Bonuses

3  Basics of the Group Bonus

Summary

The  group-related  incentive  wages  are  used  to  comprise  machines  and/or  workplaces  to  so  called

"premium groups".

By  default,  either  a  payment  scheme  depending  on  the  utilization  or  depending  on  the  performance

efficiency  rate  can  be  assigned  to  a  premium  group.  For  the  utilization  bonus  the  efficiency  of  the

machine usage time is decisive, and for the performance efficiency rate the produced quantity related to

the standard time.

When  the  formula-based  premium/  incentive  wage  is  used,  it  is  also  possible  to  realize  by  customer-

specific formulas also other calculation methods and premium modes.

Upon the login to a machine and/or workplace, the order processing data and employees will be assigned

to a premium group for the processing duration.

The  corresponding  activities  are  assigned  once  per  month  to  the  persons  on  a  pro-rated  base  to  the

presence times that the persons worked in the individual premium groups.

Calculation and availability of the data

The  day  data  on  premium  groups  will  be  determined  and  compressed  through  the  wage  calculation.

These day data serve as basis for the monthly results of the premium groups. Modifications to the ADE

postings will be transferred to the premium group results during the daily night run.

HYDRA  will  maintain  these  daily  group  results  in  the  time  domain  that  can  be  specified  in  the  data

management and automatically delete them once this period has elapsed.

The monthly results of the premium groups are calculated directly when the list of the current day data is

called.

Calculation of the incentive bonus

The incentive bonus is based on the quantities that were produced in the group to one specific order. All

order and personnel postings are used for the calculation of the incentive bonus that were collected at the

machines of a premium group in a given settlement period (month).

The product of the quantity of interruption and end postings and of operation-related standard time (tr and

te)  per  piece  is  the  total  standard  time.  The  ratio  of  this  standard  time  to  the  really  needed  personal

processing time of the group defines the group's performance.

The incentive wage determination is based on the following method:

LLE-BGP_81.docx

Version: 1.1.23049

Page 11 of 32

Calculation of Group Bonuses

𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒 𝑙𝑒𝑣𝑒𝑙 𝐿𝐺 =

∑

𝑂𝑝𝑠

   +   𝑚 ∗   𝑡𝑒   +    ∑ 𝐵𝑜𝑛𝑢𝑠𝑒𝑠𝑇𝑎𝑟𝑔𝑒𝑡𝑡𝑖𝑚𝑒
𝑡𝑟
𝑃𝑟𝑜𝑐𝑒𝑠𝑠𝑖𝑛𝑔 𝑡𝑖𝑚𝑒𝑠  −    ∑ 𝐵𝑜𝑛𝑢𝑠𝑒𝑠𝐴𝑐𝑡𝑢𝑎𝑙 𝑡𝑖𝑚𝑒

∑

𝑃𝑒𝑟𝑠𝑜𝑛𝑠





The performance level is determined per premium group.

tr is the set-up standard time for the operation that was stored to the HYDRA order backlog at the

time of processing. If necessary, this value will be entered via the PPS interface and can then be

overwritten in the corresponding field of the HYDRA order backlog. The value will be used from the

order postings.



te is the individual standard time for the operation that was stored to the HYDRA order backlog at

the time of processing. If necessary, this value will be entered via the PPS interface and can then

be overwritten in the corresponding field of the HYDRA order backlog. The value will be used from

the order postings.



m  is  the  yield  that  was  posted  during  the  processing  of  the  operation  in  HYDRA  (if  necessary

through several persons). The value will be used from the order postings.



Bonuses are created in HYDRA depending on the order and operation and on the premium group.

All  bonuses  that  are  stored  for  the  premium  group  in  HYDRA  will  be  accounted  for  in  the

calculation.  Depending  on  the  bonus  configuration,  bonuses  on  top  of  the  fraction  stroke  will  be

applied as "bonus" on the target time and those below as "credit note" to the actual time.



The  processing  times  of  everyone  working  at  the  workplaces  of  the  premium  group  operations

(only production orders and no overhead cost orders) in the calculation period will be comprised in

the denominator. In  general the pro-rated  personnel  durations  will be compensated  if one  person

processed several operations in parallel. The sum results from the personnel postings (B-records).

Calculation of the utilization bonus

The  ratio  of  standard  time  to  the  total  runtime  of  all  processed  orders/  operations  as  well  as  of  the

authorized overhead cost times defines the utilization degree (NG).

𝑵𝑮 =

∑

𝑃𝑟𝑜𝑑𝑢𝑐𝑡𝑖𝑜𝑛𝑂𝑃𝑠

∑
𝑂𝑝𝑠
𝑀𝑎𝑐ℎ𝑖𝑛𝑒 𝑢𝑠𝑎𝑔𝑒 +   ∑

  +  𝑚 ∗   𝑡𝑒 +   ∑ 𝐵𝑜𝑛𝑢𝑠𝑒𝑠𝑇𝑎𝑟𝑔𝑒𝑡𝑡𝑖𝑚𝑒
𝑢𝑛𝑝𝑟𝑜𝑑. 𝑡𝑖𝑚𝑒𝑠

𝑢𝑛𝑎𝑢𝑡ℎ.𝑂𝐶−𝑂𝑃𝑠

𝑡𝑟

−   ∑ 𝐵𝑜𝑛𝑢𝑠𝑒𝑠𝐴𝑐𝑡𝑢𝑎𝑙 𝑡𝑖𝑚𝑒





The utilization degree is determined per premium group.

tr is the set-up standard time for the operation that was stored to the HYDRA order backlog at the

time of processing. The value will be used from the order postings.

LLE-BGP_81.docx

Version: 1.1.23049

Page 12 of 32

Calculation of Group Bonuses



te is the individual standard time for the operation that was stored to the HYDRA order  backlog at

the time of processing. The value will be used from the order postings.



m is the quantity that  was  posted  during the processing of the  operation  in HYDRA (if necessary

through several persons). Depending on the setting in the LLE setup this quantity can be included

in scrap or not. The value will be used from the order postings.



The machine occupation times will be added up via all production orders. The sum results from the

order postings.



Unproductive  times  result  from  postings  to  a  (permanent)  overhead  cost  order  of  general  validity

(e.g. cleaning of machines, lack of orders), or from machine waiting period postings. All these times

will  only  then  be  taken  into  account  in  balancing  when  they  are  posted  to  the  resource

performance account U8. For the machine waiting period there is no overhead cost  (OC) order in

HYDRA.

-  In  the  default  HYDRA  settings  the  machine  waiting  period  can  be  configured  thus  that  it  will

automatically  be  posted  to  the  account  U8  and  thus  be  accounted  for  in  the  formula  without

further action as unproductive time.

- For overhead cost (OC) postings the times can initially be posted to other RPAs so that they will

initially  apply  as  authorized  downtime  and  will  not  show  any  effect  in  the  above  formula.  The

foreman may then repost these times manually to the RPA U8 to classify them as unauthorized

downtime.  Without  such  a  reposting  through  the  foreman  the  downtimes  from  overhead  cost

orders will always be deemed authorized.



Bonuses are created in HYDRA depending on the order and operation and on the premium group.

All  bonuses  that  are  stored  for  the  premium  group  in  HYDRA  will  be  accounted  for  in  the

calculation.  Depending  on  the  bonus  configuration,  bonuses  on  top  of  the  fraction  stroke  will  be

applied as "bonus" on the target time and those below as "credit note" to the actual time.



For  different  downtime  reasons,  the  foreman  can  issue  different  (permanent)  overhead  cost  time

tickets to the operator.



For  all  machines  belonging  to  a  utilization  premium  group,  only  one  order  can  be  logged  in  to  a

machine. Several operations cannot be processed in parallel at these machines.

Postings table as overview

The following table shows which postings are integrated in the calculation formulas:

LLE-BGP_81.docx

Version: 1.1.23049

Page 13 of 32

Calculation of Group Bonuses

Posting

Utilization bonus

Incentive bonus

Production orders (order)

1) Calculation of the standard time from produced
quantity of pieces and time rules (m * te + tr) in the
numerator

Calculation of the standard time from produced
quantity of pieces and time rules (m * te + tr) in
the numerator

2) Determination of the machine usage time
(denominator)

Production orders (person)

- Will not be processed in the incentive wage
determination-

Processing times (denominator)

Overhead cost order (order)

Times only to RPA U8 (e.g. by manual reposting):
Integrated as unproductive times in the machine
usage time (denominator).

Times outside the RPA U8 (e.g. default usage):
Will not be integrated into the formula since they
are perceived as authorized downtimes. These
times will, however, be shown separately and
also be transferred in the interface.

Overhead cost order (person)

- Will not be processed in the incentive wage
determination-

Waiting period posting
(machine/ OP)

Will be processed as "overhead cost order
(order)". The HYDRA basic settings can be used
to ensure that these postings will by default be
used on the RPA U8 and correspondingly be
directly counted as unproductive times.

- Will not be processed in the incentive wage
determination-

The sum of the overhead cost durations will not
be integrated into the calculation formula, but
be shown in HYDRA and be transferred in the
interface.

Operation numbers for which the first digit is
smaller than 5 will be interpreted as "premium
average".

Operation numbers for which the first digit starts
with 5 will be interpreted as "waiting times from
GK".

- Will not be processed in the incentive wage
determination-

Waiting period posting
(person)

- Will not be processed in the incentive wage
determination-

- Will not be processed in the incentive wage
determination-

Bonuses

Depends on the configuration of the bonus
reasons:
As bonus on the standard time in the numerator
and/or as credit note to reduce the machine
usage time in the denominator

Depends on the configuration of the bonus
reasons:
As bonus on the standard time in the numerator
and/or as credit note to reduce the processing
time in the denominator

Additional premium formulas

When the formula-based premium/ incentive wage is  used, it is also possible to realize other customer-

specific calculation methods and premium formula.

Both premium forms "incentive  bonus" and  "utilization bonus"  will be executed  as default calculation  by

HYDRA if the premium group is configured correspondingly and can be overwritten by customer-specific

formulas.

Premium areas

Premium groups can be comprised to premium areas. In doing so a premium group can be assigned to

several areas so that quasi hierarchical structures can be mapped.

LLE-BGP_81.docx

Version: 1.1.23049

Page 14 of 32

Calculation of Group Bonuses

Configuration example:

Area 001 = Group A, B, C and D

Area 002 = Group E, F, G and H

Department 1

Department  2

Area 100 = Group A, B, C, D, E, F, G, H and I  company

This leads to a hierarchical structure:

Example:

The production is subdivided into several assembly lines that are paid as autonomous premium groups in

group  incentives.  Conveyors  transport  the  required  materials  to  all  production  workplaces.  Using  the

additional function "premium areas" it is possible to assign the conveyors to an "unproductive" group. This

"unproductive" group and the assembly lines will be comprised to a premium area "production", in which

the  results  of  the  individual  groups  will  be  collected  and  an  average  result  be  calculated.  The

"unproductive" conveyors will then be paid in accordance with the result from the premium area.

"Premium areas" are created as special types of premium groups in the master data. The master data of

the premium group define also when a premium group must be paid according to the result of a premium

area or of a different premium group.

LLE-BGP_81.docx

Version: 1.1.23049

Page 15 of 32

 A B C D E F G H I Productive group Unproductive group Area 001: Department 1 Area 002: Department 2 Area: 100 Company Premium groups Premium areas

Calculation of Group Bonuses

Calculation of the area result

The result of a premium area is calculated as the result of a premium group through the wage calculation

of a day. It is calculated from the day results of the assigned premium groups.

By default the individual factors such as standard time, bonuses, unprod. time, duration, downtime,  OC-

time,  …  will  be  added  up  from  the  individual  premium  groups  irrespective  of  the  type  of  the  premium

group. The performance level of the premium area is calculated according to the formula

𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒 𝑙𝑒𝑣𝑒𝑙 =

𝑆𝑡𝑎𝑛𝑑𝑎𝑟𝑑 𝑡𝑖𝑚𝑒  +  𝑏𝑜𝑛𝑢𝑠𝑒𝑠
𝐷𝑢𝑟𝑎𝑡𝑖𝑜𝑛  −  𝑐𝑟𝑒𝑑𝑖𝑡𝑠

∗ 100%

If there is an additional function "formula-based bonus/ incentive wage" the calculation of the area result

may vary depending on the customer's requests.

LLE-BGP_81.docx

Version: 1.1.23049

Page 16 of 32

Calculation of Group Bonuses

4

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 17 of 32

Calculation of Group Bonuses

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 18 of 32

Calculation of Group Bonuses

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

the system for a specified time (35 days by default). You can only make changes to this data during this

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

  2.  Manually start the calculation via GUI for specified days and persons or premium groups.  For more

information, refer to the documentation of this application on the client.

LLE-BGP_81.docx

Version: 1.1.23049

Page 19 of 32

You can repeat the wage calculations as often as you like. Make sure that the data of the relevant day is

Calculation of Group Bonuses

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 20 of 32

Calculation of Group Bonuses

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 21 of 32

Calculation of Group Bonuses

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 22 of 32

Calculation of Group Bonuses

5  Wage Calculation

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 23 of 32

Calculation of Group Bonuses

Selection criteria

The application provides the following selection criteria:

Evaluate staff

If this option is checked, the time tickets of the persons are recalculated. If this option is not active,

only the time tickets of premium groups that have been recalculated are updated. You can limit the

persons that must be recalculated using the other fields. If the selected persons worked in premium

groups, it is possible that persons are recalculated who were not included in the original selection

because these persons also worked in the premium groups involved.

LLE-BGP_81.docx

Version: 1.1.23049

Page 24 of 32

Calculation of Group Bonuses

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 25 of 32

Calculation of Group Bonuses

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 26 of 32

Calculation of Group Bonuses

6  Performance Level (LLE)

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

The performance level is calculated in the classic piecework rate by putting the target time in relation to

the actual time. Data for piecework calculation origin from the BDE personnel postings (B records). The

"Wage  calculation"  generates  from  the  BDE  personnel  postings  valuated  time  tickets  which  include  the

performance efficiency rate.

𝑝𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒𝐿𝑒𝑣𝑒𝑙 =

𝑠𝑡𝑎𝑛𝑑𝑎𝑟𝑑𝑇𝑖𝑚𝑒
𝑎𝑐𝑡𝑢𝑎𝑙𝑇𝑖𝑚𝑒

∙ 100%

  The actual time in piecework depends on the basic settings for incentive wages. However, this is

usually  the  proportionately  calculated  working  time  deduced  from  the  logon  of  a  person  in  the

order data entry (B records).This is calculated proportionally for multiple machine operation. You

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 27 of 32

Calculation of Group Bonuses

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 28 of 32

Calculation of Group Bonuses

7  Evaluation Date

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 29 of 32

Calculation of Group Bonuses

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 30 of 32

Calculation of Group Bonuses

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

LLE-BGP_81.docx

Version: 1.1.23049

Page 31 of 32

Calculation of Group Bonuses

LLE-BGP_81.docx

Version: 1.1.23049

Page 32 of 32


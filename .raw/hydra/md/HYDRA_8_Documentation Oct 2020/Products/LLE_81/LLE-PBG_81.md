Manual

Bonus Areas for Group
Bonuses
LLE-PBG 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Bonus Areas for Group Bonuses

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

LLE-PBG_81.docx

Version: 1.0.23049

Page 2 of 11

Bonus Areas for Group Bonuses

Contents

1  LLE-BPL - Overview ..................................................................................... 4

2  Basics of the Group Bonus .......................................................................... 6

LLE-PBG_81.docx

Version: 1.0.23049

Page 3 of 11

Bonus Areas for Group Bonuses

1

 LLE-BPL - Overview

Purpose

The  Premium  areas  for  group  incentives  module  supplements  the  basic  modules  Calculating  group

incentives and Calculating premium/ incentive wage. Premium groups can be consolidated into premium

areas.  In  the  process,  a  premium  group  can  be  assigned  to  multiple  areas  in  order  to  illustrate

hierarchical structures.

Higher-level area results can then be used either to compensate indirect (unproductive) premium groups

or just for statistical purposes.

Example:

Production  is  divided  up  into  several  assembly  lines  that  are  compensated  as  independent  premium

groups in group incentives. Carriers supply all production workplaces with material. Using the additional

"Premium areas" function, the carriers can be assigned to an "unproductive" group. These "unproductive"

groups and assembly lines are consolidated into a premium area called "Production", in which the results

of the individual groups are collected and an average result is calculated. The "unproductive" carriers are

then compensated based on the premium area results.

Integration

This is based on results calculated from premium groups. The premium area results are available in the

reports and are available for further processing, just as the premium group results are.

Features

Application  Service  (AS)  to  illustrate  hierarchical  company  structures  by  consolidating  group  incentives

into premium areas:

  Group incentives are consolidated into higher-level premium areas

  The ability  to calculate the incentive for a  premium area from the results  of the  assigned group

incentives

  Display of results from premium areas compared with the results of the assigned groups

  Option  to  compensate  "unproductive"  premium  groups  based  on  the  incentive  of  a  higher-level

premium area

  The  ability  to  allow  employees  to  share  in  premiums,  even  if  they  worked  in  different  premium

groups

LLE-PBG_81.docx

Version: 1.0.23049

Page 4 of 11

  The  ability  to  transfer  area  results  via  the  interface  to  the  payroll  system  in  HYDRA  standard

format

Bonus Areas for Group Bonuses

LLE-PBG_81.docx

Version: 1.0.23049

Page 5 of 11

Bonus Areas for Group Bonuses

2  Basics of the Group Bonus

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

LLE-PBG_81.docx

Version: 1.0.23049

Page 6 of 11

Bonus Areas for Group Bonuses

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

LLE-PBG_81.docx

Version: 1.0.23049

Page 7 of 11

Bonus Areas for Group Bonuses



te is the individual standard time for the operation that was stored to the HYDRA order backlog at

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

LLE-PBG_81.docx

Version: 1.0.23049

Page 8 of 11

Bonus Areas for Group Bonuses

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

When the formula-based premium/ incentive wage is used, it is also possible to realize other customer-

specific calculation methods and premium formula.

Both premium forms "incentive  bonus" and  "utilization bonus"  will be executed  as default calculation  by

HYDRA if the premium group is configured correspondingly and can be overwritten by customer-specific

formulas.

Premium areas

Premium groups can be comprised to premium areas. In doing so a premium group can be assigned to

several areas so that quasi hierarchical structures can be mapped.

LLE-PBG_81.docx

Version: 1.0.23049

Page 9 of 11

Bonus Areas for Group Bonuses

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

LLE-PBG_81.docx

Version: 1.0.23049

Page 10 of 11

 A B C D E F G H I Productive group Unproductive group Area 001: Department 1 Area 002: Department 2 Area: 100 Company Premium groups Premium areas

Bonus Areas for Group Bonuses

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

LLE-PBG_81.docx

Version: 1.0.23049

Page 11 of 11


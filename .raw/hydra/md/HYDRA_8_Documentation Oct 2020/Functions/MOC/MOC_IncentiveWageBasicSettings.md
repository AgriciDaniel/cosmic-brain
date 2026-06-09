Incentive Wages Basic Settings

1

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

MOC_IncentiveWageBasicSettings.docx  Version: 1.0.1362

Page 1 of 6

Settings are divided into two sections.

The first page includes options for general settings and time ticket types:

Incentive Wages Basic Settings

Field Description for the "Options" Tab

HYDRA-PZE paid break is productive

If a performance level is calculated on basis of the PZE attendance time and the PZE time is not

determined using the PZE wage type postings, this option can be used to control whether the paid

breaks configured in the PZE are considered as productive time and are consequently included in

the actual time for piecework calculation.

This setting is also considered in the Labor time comparison.

MOC_IncentiveWageBasicSettings.docx  Version: 1.0.1362

Page 2 of 6

Incentive Wages Basic Settings

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

MOC_IncentiveWageBasicSettings.docx  Version: 1.0.1362

Page 3 of 6

Incentive Wages Basic Settings

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

MOC_IncentiveWageBasicSettings.docx  Version: 1.0.1362

Page 4 of 6

GRPKARGKEAZLpzeTTTTTTtimeActual

Incentive Wages Basic Settings

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

As regards group incentives, waiting period postings usually cannot be reasonably allocated  to an

incentive group and should therefore be avoided.

Time tickets for PZE time, PZE wage type

If  this  option  is  activated,  a  PZE  time  ticket  is  created  for  the  employee's  entire  PZE  attendance

time per day. The time ticket includes the wage type according to the basic settings.

MOC_IncentiveWageBasicSettings.docx  Version: 1.0.1362

Page 5 of 6

Incentive Wages Basic Settings

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

MOC_IncentiveWageBasicSettings.docx  Version: 1.0.1362

Page 6 of 6


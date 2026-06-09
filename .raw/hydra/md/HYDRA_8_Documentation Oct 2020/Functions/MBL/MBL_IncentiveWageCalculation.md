Incentive Wage Calculation - Process

1

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

MBL_IncentiveWageCalculation.docx

Version: 1.1.18468

Page 1 of 6

Incentive Wage Calculation - Process

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

MBL_IncentiveWageCalculation.docx

Version: 1.1.18468

Page 2 of 6

Incentive Wage Calculation - Process

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

MBL_IncentiveWageCalculation.docx

Version: 1.1.18468

Page 3 of 6

You can repeat the wage calculations as often as you like. Make sure that the data of the relevant day is

Incentive Wage Calculation - Process

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

MBL_IncentiveWageCalculation.docx

Version: 1.1.18468

Page 4 of 6

Incentive Wage Calculation - Process

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

MBL_IncentiveWageCalculation.docx

Version: 1.1.18468

Page 5 of 6

Incentive Wage Calculation - Process

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

MBL_IncentiveWageCalculation.docx

Version: 1.1.18468

Page 6 of 6


Labor Time Calculation: Workflow

1  Labor Time Calculation: Workflow

Overview

The  Labor  time  calculation  uses  the  clockings  of  the  employees  and  compares  them  to  the  general

working times to calculate the resulting working time. For the calculation, also the settings of the  Control

of  labor  time  calculation  are  used  (e.g.  rounding  rules,  etc.).  The  result  of  the  Labor  time  calculation  is

used to book the times that an employee worked to different wage types.

Purpose

There are two options to start the labor time calculation:

  1.  Automatically every morning for the previous day and for all employees in the system. In addition, at

specific times, evaluations are made for employees requiring evaluations.

  2.  Manually via GUI interface for any day and employee.

Labor time calculation: workflow

  1.  If there are days, between the last evaluated day and the requested day, which have not yet been

evaluated,  these  days  are  evaluated  first  and,  if  there  were  no  errors,  the  requested  day  is  then

evaluated. This check is skipped when the labor time of a person is calculated for the first time.

  2.  A  person  is  not  evaluated  if  the  field  Lock  person  in  the  HR  master  data  is  activated  or  if  the

evaluation date is not included in the period of time between date of joining and date of leaving the

company. In addition to the date of joining, the date in field First allocation is checked.

  3.  If  the  fields  Working  time  day  type  and  Payment  day  type  are  not  yet  populated  in  the  clocking

records,  the  Labor  time  calculation  uses  the  day  types  of  the  models  in  the  HR  master  data  and

enters them in the clocking records.

If a person has a working time day type with an assigned target working time, but no clocking record

is available for this person, then the system creates absence times. An absence is a clocking record

of type "Absence" instead of "Attendance".

The times for start and end of absence are identified using the assigned working time day type. The

start of the absence is the beginning of shift or the beginning of normal time with flextime. The end

MBL_PersonalTimeEvaluation.docx

Version: 1.2.18693

Page 1 of 5

Labor Time Calculation: Workflow

of the absence is: the end of shift time; the beginning of normal time plus target time; or the absence

and  the  breaks  specified  in  the  absence  planning.  If  the  option  Allocate  average  working  time  is

enabled in the HR master, then the end of absence is identified as follows: the entire absence time

(difference between start and end of absence minus breaks) is then equal to the average  working

time specified in the HR master. With this kind of absences, also the day types are entered in the

clocking records.

With planned absences, the values of the absence planning are transferred to the comment and the

payment field. With unplanned absences, you can configure that an absence record is created in the

Control  of  labor  time  calculation.  If  the  field  Generate  unplanned  absences  is  set  to  Yes  or

Authorization  required,  an  absence  record  with  comment  "UNG"  is  created.  If  you  subsequently

enter an absence  planning,  you can replace an  unplanned  absence  with  a planned. The period of

time of the subsequently planned absence is automatically evaluated.

The  working  time  day  type  is  valid  for  the  whole  day  if  several  clockings  exist  for  a  day.  The

payment day type is only valid for the relevant clocking record. This means that on one day, different

clockings  can  be  used  for  different  payment  day  types.  Example:  For  an  employee,  the  first  two

hours of a day are booked as doctor's appointment and only then the normal payment  is used for

the working time.

  4.  The  clockings  are  rounded  according  to  the  setting  in  the  Control  of  labor  time  calculation.  These

rounded times are entered in the relevant fields of the clocking record; but only if these fields are not

already filled with times from previous evaluations or manually filled.

  5.  It  is  checked  if  the  clockings  have  errors  and  if  the  clocking  order  is  correct  (e.g.  IN-OUT,  IN-

business trip, etc.). It is also checked if the assignment of day types in the clocking records of the

separate persons are complete.

A  Messages  listing  is  created.  The  Messages  listing  includes  messages  of  the  above  validation

checks  and  messages  about  absences  of  persons,  messages  if  more  than  one  clocking  record

exists  for  a  person,  if  the  working  time  is  inferior  to  the  target  working  time,  if  persons  are  late  or

leave  too  early  and  if  persons  are  present  although  an  absence  is  planned.  The  messages  that

inform  about  errors  are  highlighted  in  red  in  the  Messages  listing.  You  can  edit  these  fields  in  the

application Labor time maintenance.

MBL_PersonalTimeEvaluation.docx

Version: 1.2.18693

Page 2 of 5

Labor Time Calculation: Workflow

  6.  Absences are entered in the Personnel scheduling.

  7.  When the Labor time calculation is finished, you can see at the bottom of the application Labor time

calculation the number of persons that have been evaluated and the number of errors that occurred.

You can repeat the labor time calculations as often as you like. Make sure that the data of the relevant

day  is  still  available  in  the  system.  If  no  clocking  record  exists  for  a  person  (e.g.  because  the  clocking

records have been deleted in  window  Labor time maintenance), absences are created according to the

conditions specified in issue 3.

If  an  error  occurred  in  the  Labor  time  calculation,  the  days  that  follow  are  not  evaluated.  Instead,  the

Messages listing shows an error message for these days informing that an error occurred on the relevant

day before.

If  the  Labor  time  calculation  is  performed  for  a  day  that  has  already  been  used  to  perform  the  Monthly

evaluation,  this  Monthly  evaluation  is  automatically  repeated  when  the  labor  time  calculation  has  been

performed.  This  guarantees  that  the  monthly  results  are  then  up-to-date  (monthly  wage  types,  account

balances at end of month,...).

Messages issued by the Labor time calculation

Wrong status sequence

The employee’s clockings are in the wrong sequence. Either a clocking has been forgotten or the

employee has clocked in or out twice. This problem can be fixed by correcting the clocking.

The overtime period is missing for company … on …

For the relevant company, no Periods for the overtime compensation have been created.

No valid payment day type found

For  the  evaluated  day,  no  payment  is  planned  in  the  payment  model.  Example:  On  Saturdays,

there is usually no work, but a single employee has worked anyway. You can correct this problem if

you make a manual entry of a payment day type in the clocking record, if you subsequently plan a

personal day type or if you change the relevant payment model.

No valid shift or flextime day type

For  the  evaluated  day,  no  working  time  is  planned  in  the  working  time  model.  Example:  On

Saturdays,  there  is  usually  no  work,  but  a  single  employee  has  worked  anyway.  You  can  correct

this problem if  you make a manual  entry of a  working time day type  in the clocking record, if  you

subsequently plan a personal day type or if you change the relevant working  time model.

Shift type not in shift day type

For this day, the shift type stored in the shift rhythm model is not available in the assigned shift day

type.  Reason:  In  the  shift  rhythm  model,  a  shift  type  is  assigned  that  does  not  exist  or  no  shift

rhythm model is stored in the HR master.

MBL_PersonalTimeEvaluation.docx

Version: 1.2.18693

Page 3 of 5

Labor Time Calculation: Workflow

Previous evaluation of ... not ok

The evaluation is not carried out for the selected day because there was an error in the evaluation

of a previous day. When this error is corrected, the evaluation is possible.

Wage type posting subject to authorization exists

On the current day, one or more bookings require authorization. When these bookings have been

authorized the message disappears.

Absence payment: ... ...

This message is displayed if absences (e.g. holiday, illness etc.) have been allocated. Behind the

message, the number and name of the allocated absence payment are displayed.

Several clocking-ins exist

More than one clocking-in exists for one day.

Target time has not been reached

The working time of the employee is inferior to the target working time.

Clock-IN too late

The first clock-in was made after the start of shift or the start of the core time.

Clock-OUT too early

The last clock-out was made before the end of shift or before the end of the core time.

Core time violation

A core time violation occurred. This message is generated in addition to the messages Clock-IN too

late and Clock-OUT too early and is also displayed if the core time violation is not at the beginning

or the end, but in the middle of the core time.

The message Core time violation is only generated, if the extension PZW_KZV is enabled.

Violation of rest period

The rest period stored for the previous day in the Working time day type has been violated.

The  message  Violation  of  rest  time  is  only  generated,  if  the  extension  PZW_RZV  is

enabled.

Present although absence planned

The employee was present although an absence was planned for them on the evaluation day. This

message  is  not  created  with  planned  absences  "half  a  leave  day"  or  absences  configured  with

"partly absent".

Absent although working time planned

The employee was not present although working time was planned.

MBL_PersonalTimeEvaluation.docx

Version: 1.2.18693

Page 4 of 5

Labor Time Calculation: Workflow

Maximum working time exceeded

This  message  informs  that  the  attendance  time  of  an  employee  is  greater  than  the  maximum

working time specified in the Working time day type.

Negative account balances

This message informs that the labor time calculation has output negative account balances for an

account.

Labor time needs to be determined

For this person, clocking records, bookings or absence plannings have been changed; the required

labor time calculation has not yet been started.

Blocked by application... while calculating labor time

When  the  last  labor  time  calculation  was  performed,  the  person  was  locked.  The  application

specifies why the lock was made.

MBL_PersonalTimeEvaluation.docx

Version: 1.2.18693

Page 5 of 5


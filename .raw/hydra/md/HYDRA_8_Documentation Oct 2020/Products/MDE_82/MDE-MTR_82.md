Manual

Meantime Report
MDE-MTR 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Meantime Report

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-MTR_82.docx

Version: 1.0.23049

Page 2 of 17

Meantime Report

Contents

2  Meantime Report .......................................................................................... 4

3  Configuration of the Mean Time Report ..................................................... 14

MDE-MTR_82.docx

Version: 1.0.23049

Page 3 of 17

Meantime Report

2  Meantime Report

Overview

Menu

Production Facility Management  Key performance indicators  Meantime
report

Transaction code

mtbfrp

Function authorization  mtbfrp

Purpose

The  evaluation  Meantime  Report  can  show  the  key  performance  indicators  for  the  average  duration

(mean  time)  for  machines  in  a  selected  period  of  time.  The  key  performance  indicators  are  calculated

using  different  mean  values.  The  calculation  of  these  mean  values  is  based  on  MDE  postings.  For

example:

  Mean Time Between Failure (MTBF).

  Mean Time Between Repair (MTBR).

  Mean Time To Repair (MTTR).

  Mean Time To Setup (MTTS).

There are two types of key performance indicators:

1.  KPIs evaluating times between events (Mean Time Between)

Question: What is the average time that passes between the defined events (failure/repair)?

2.  KPIs evaluating the duration of events (Mean Time To)

Question: How long does a defined event take on average (failure/repair)?

MDE-MTR_82.docx

Version: 1.0.23049

Page 4 of 17

The events are concrete (machine) statuses. Note: You can use several (different) statuses to calculate a

Meantime Report

KPI.

You require two values to calculate the KPIs:

1.  Frequency (or number)

2.  Duration

For both values, you specify the (machine) statuses in the configuration that are used for the calculation.

Indirectly you then also specify the statuses that are not used.

Calculating the frequency

To identify the frequency, the configuration specifies the statuses used. The system counts the statuses

(total) that were available in the the evaluation period specified.

You  can  specify  several  statuses  in  the  configuration  that  are  combined  to  one  "event".  For  example,

succeeding statuses can be used to identify a failure:

Examples:

  For MTBF you specify which statuses identify a "failure".

  For MTTS you specify the statuses that identify the setup.

When the frequency is identified, only the statuses with a minimum duration m are used (in the diagram

this minimum duration is the blue line). You specify the minimum duration for each status. The time of the

statuses that are below the minimum duration are not used for calculation.

MDE-MTR_82.docx

Version: 1.0.23049

Page 5 of 17

Meantime Report

Example "repair" (MTBR)

In  the  example  above,  the  break  is  shorter  than  the  minimum  duration  specified  for  the  status  "break".

The "break" status is therefore not used for the calculation and the two statuses "repair" are regarded as

two succeeding statuses. The frequency of the event "repair" is then 1.

The breaks are only identified as breaks if an explicit status "break" is available. The breaks that

are automatically calculated using the shift model are ignored.

To  identify  the  number  (frequency)  of  failures,  only  the  events  are  used  that  started  in  the

evaluation period.

Calculating the duration

To identify the duration, the time between events is used (Time Between...) or the duration is identified

using the events (Time to...).

Calculating the time between events - Mean Time Between

These times are required to calculate the KPIs for the mean times between events.

MDE-MTR_82.docx

Version: 1.0.23049

Page 6 of 17

Meantime Report

In the configuration, you define the statuses used to calculate the times between the events. With the

events, the system then calculates the "time between".

Example with sample configuration:

For the machine 4711, the key figure MTBR is calculated. The status (there can also be several) for the

repair is the status 2.

The statuses used to calculate the time between the events are the statuses 3 and 5.

The configuration can be as follows:

Object type

ID1

ID2

ID3

ID4

Function

Value

KPI_MT

KPI_MT

KPI_MT

KPI_MT

KPI_MT

KPI_MT

MTBR

MTBR

MTBR

NAME

Mean Time Between Repair

NAME_SHORT

MTBR

CALCULATION

BETWEEN

MTBR

MSTAT

MTBR

MSTAT

MTBR

MSTAT

4711

4711

4711

2

3

5

COUNT

DURATION

DURATION

0

0

0

1. Example scenario with result:

A shift with a total duration of 8 hours is evaluated.

Result:

Machine

…

Short

Designation (name)

Frequency  Duration (total

KPI

4711

name
MTBR

Mean Time Between Repair

2

time)
3 h

1.5 h

To identify the times, only the events are used that started in the evaluation period. The period

Z1 is not used for the KPI calculation of this shift because the status started before the beginning

of this shift.

MDE-MTR_82.docx

Version: 1.0.23049

Page 7 of 17

Meantime Report

2. Example scenario with result:

A shift with a total duration of 8 hours is evaluated.

Result:

Machine

…

Short

Designation (name)

Frequency  Duration (total

KPI

4711

name
MTBR

Mean Time Between Repair

3

time)
3.5 h

1.17 h

To identify the times, only the events are used that started in the evaluation period.

Calculation of times using events - Mean Time To

These times are required to calculate the KPIs for the times that the events themselves take. Question:

How long does a defined event take on average (failure/repair)?

Example with sample configuration:

You want to calculate the KPI Mean Time To Repair <> average repair time (MTTR). The status (there

can also be several) for the repair is the status 2.

With a "Mean Time To" KPI, you must store this status in the configuration in both definitions, with

COUNT (frequency) and with DURATION (time).

The configuration can be as follows:

Object type

ID1

ID2

ID3

ID4

Function

Value

KPI_MT

MTTR

NAME

Mean Time To Repair

MDE-MTR_82.docx

Version: 1.0.23049

Page 8 of 17

Meantime Report

KPI_MT

KPI_MT

KPI_MT

KPI_MT

MTTR

MTTR

NAME_SHORT

MTTR

CALCULATION

TO

MTTR

MSTAT

MTTR

MSTAT

4711

4711

2

2

COUNT

DURATION

0

0

1. Example scenario with result:

A shift with a total duration of 8 hours is evaluated.

Result:

Machine

…

Short

Designation (name)

Frequency  Duration (total

KPI

4711

name
MTTR

Mean Time To Repair

3

time)
2.5 h

0.83 h

Calculating the KPI

The average time (Mean Time..., e.g. MTBR) is calculated from the (total) time divided by the frequency

(number of failure events). If the frequency in the evaluation period is 0, then MTBR is 0.

Definition of terms

MTBR - Mean Time Between Repair

Average time of operation between two failures (and their repair)

MDE-MTR_82.docx

Version: 1.0.23049

Page 9 of 17

Meantime Report

In  practice,  MTBF  is  usually  defined  or  calculated  as  the  quotient  of  the  hours  of  operation  (in  working

order) to the failures identified in the specified evaluation period. It does not matter if the systems can be

repaired or not.

If  a  machine  can  be  repaired,  then  the  machine  is  repaired  when  a  failure  occurs.  For  this  reason,  the

term MTBR can usually be regarded as a synonym of MTBF with machines. This term is therefore used in

the following.

TTR - Time To Repair

Time that passes between the occurrence of a failure and its repair.

TTTR - Total Time To Repair

Total time of all TTR in a specified period.

MTTR - Mean Time To Repair

Average time that passes between the occurrence of a failure and its repair.

Procedure/processing

To  evaluate  the  data  by  shift  or  by  time,  the  data  is  saved  in  a  separate,  aggregated  tables

(mde_meantime).

For group workplaces, the data is not aggregated. Background: For group workplaces, different

statuses are not available. An evaluation based on statuses is therefore not useful.

MDE-MTR_82.docx

Version: 1.0.23049

Page 10 of 17

Meantime Report

Selection criteria

The application provides the following selection criteria:

Date from ... to ...

The selection criterion Date from ... to ... specifies the period you want to evaluate.

Shift / Time

Use the selection criterion Shift and/or Time to further narrow down the specified period (date from

... to ...). To do so, select a shift or specify a time (from ... until...).

Machine

The  selection  criterion  Machine  specifies  a  workplace  that  is  stored  in  the  machine/workplace

master data. You can also use wildcards (placeholders *).

Group

The  selection  criterion  Group  refers  to  the  group  in  the  machine  or  workplace  master  data.  The

application shows all machines and/or workplaces that are assigned to the selected group. You can

also use wildcards (placeholders *).

Cost center

The  selection  criterion  Cost  center  refers  to  the  cost  center  stored  in  the  machine  or  workplace

master data. The application shows all machines or  workplaces that are assigned to  the selected

cost center. You can also use wildcards (placeholders *).

Company

The selection criterion Company refers to the company defined in the machine or workplace master

data. The application shows all machines or workplaces that are assigned to the selected company.

You can also use wildcards (placeholders *).

Responsibility area

The selection criterion  Responsibility  area refers to the responsibility  area defined in the machine

master  data.  Note:  A  user  can  only  view  those  machines  the  user  is  authorized  for  (responsiblity

area).

Report group

The selection criterion Report group refers to the report groups. The application shows all machines

or workplaces that are assigned to the selected report group.

Key figure

Narrows down the data to the key figure required (example MTBR for MeanTime Between Repair).

The selection provides all values that are configured in the Advanced object configuration.

MDE-MTR_82.docx

Version: 1.0.23049

Page 11 of 17

Meantime Report

Table view

Master data

The  columns  correspond  to  the  above  selection  criteria.  The  group  is  the  group  according  to  the

workplace/machine  configuration.  The  table  shows  not  only  the  machine  like  with  the  selection  criteria,

but also the designation and the short name of the machine.

Key Figures

Short designation/Designation

The  short  designation  and  the  designation  show  the  meaning  of  a  key  figure  according  to  the

configuration.

Frequency

The  number  specifies  how  often  an  event  occurred.  To  calculate  the  frequency,  the  number  of

events in the selected period of time is totaled.

Total time

The Total time shows the total time of the combined events (configured as DURATION).

Key figure

The  key  figure  is  the  average  time  that  the  event  takes.  The  key  figure  is  calculated  using  the

frequency/total time.

If the frequency = 1 in the evaluation period, then the average time is the total time.

If the frequency = 0 in the evaluation period, then the average time is 0.

Note:  To  identify  if  an  event  is  included  in  the  evaluation  period  or  not,  the  start  time  of  the

event is referenced. With longer failures, this can have the result that the suceeding periods of

time cannot be calculated, for example.

The evaluation results by shift or by specified time cannot be compared because the data that is

identified  and  saved  can  be  different  according  to  the  aggregation  level.  It  is  possible  that  no

result  row  is  displayed  for  a  machine  with  a  selection  by  time,  but  with  a  selection  by  shift  a

result row is displayed.

It is recommended to perform this evaluation in general for larger periods of time.

MDE-MTR_82.docx

Version: 1.0.23049

Page 12 of 17

Meantime Report

Toolbar

 Status report

Function authorization: mstrp

Use this button to call the application Status report.

Transfer of machine number, date and shift or time.

 Machine time profile

Function authorization: mtpf

Use this button to call the application Machine time profile.

Transfer of machine number, date and shift or time.

MDE-MTR_82.docx

Version: 1.0.23049

Page 13 of 17

Meantime Report

3  Configuration of the Mean Time Report

Purpose

The  evaluation  Mean  Time  Report  shows  an  average  duration  (mean  time)  for  machines  in  a  selected

period.    The  basis  for  the  report  is  cyclically  calculated  by  the  system  and  stored  in  a  separate,

aggregated table (mde_meantime).

Please execute the following steps in order for the system to perform an evaluation:

Configuration based on objects

You define the required configuration with the help of an extended object configuration (transaction code

adoc).  Enter the following in the configuration for the specific machines and KPIs:

Information on a KPI:

Define the information per KPI for the extended object configuration.

Object type:

fixed "KPI_MT“(MT=MeanTime)

ID1: KPI Identification (ID), e.g. MTBF, MTTR

ID2: empty

ID3: empty

ID4: empty

Parameter/parameter value:

Parameter

Parameter value

NAME

Name of the KPI, e.g. Mean Time Between Repair

NAME_SHORT

Abbreviation of the KPI, e.g. MTBR

CALCULATION

BETWEEN

for MeanTime BETWEEN (e.g. MTBF/MTBR)

TO

for MeanTime TO (e.g. MTTR)

Active:

fixed "J"

MDE-MTR_82.docx

Version: 1.0.23049

Page 14 of 17

Meantime Report

Information on status assignment

Define the information per machine, KPI and status in the extended object configuration.

Object type:

fixed "KPI_MT“(MT=MeanTime)

ID1: KPI Identification (ID), e.g. MTBF, MTTR

ID2: fixed "MSTAT"; set for the status that is included in the calculation for the frequency or

duration.

ID3: Machine/workplace number; enter for numeric workstation/machine numbers 8 digits with

leading zeros.

ID4: Status number according to configuration

Parameter/parameter value:

Parameter

Parameter value

COUNT

Number

If the number of the status is smaller than the value, then the status

is ignored. The status is included for 0.

DURATION

Minimum duration in minutes

If the duration of the status is smaller than the value, then the status

is ignored. The status is included for 0.

Active:

fixed "J"

Pre-aggregated data

Store the required transaction data that have been pre-aggregated in a specific table.  Data for the

evaluation are divided in shift and time.  Data is pre-aggregated once a day cyclically.

Machines for which no object-related configuration was performed to calculate the MTBR are not

included.  Therefore, these machines cannot be evaluated.

Define and activate the configuration for the HYDRA scheduler as follows:

Program start

Hymtrkomp.exe

MDE-MTR_82.docx

Version: 1.0.23049

Page 15 of 17

Parameter to call the program:



/RECALC=x

Days in the past in in which the data is (re)determined.  Sometimes, existing data in this period is

Meantime Report

deleted.

Default: 1 day

A day is here:

- for the shift evaluation: a shift day

- for the time evaluation: the previous day



/KENNZ=x

Pre-aggregated data for the KPI

Default: If not specified, then the data is pre-aggregated for all defined KPIs.

  GRP=x

Evaluation  group

for  which  resources

the  data

is  pre-aggregated  (individual  workplaces).

Default: If not specified, all resources are aggregated (individual workplaces).

If you want to update the aggregated data, call the aggregation program again but you need to modify the

parameter (RECALC).

Re-organize the data

If  data  is  reorganized,  you  can  set  up  a  time  when  the  data  stored  in  the  aggregated  table  is  deleted

automatically.

Data  is  deleted  from  the  aggregated  table  according  to  the  (default)  parameter.    The  data  is  not

transferred in other tables or exported into files.

The  data  reorganization  is  performed  in  batch  operations  during  a  cyclic  job.    The  HYDRA  schedulers

controls the cyclic job with a separate entry.

Program start

Hymtrkomp.exe /MOD=DELDATA

Parameter to call the program:



/DELDAYS=x

The system deletes all old data.

Default: 1096 days (= 3 years)

MDE-MTR_82.docx

Version: 1.0.23049

Page 16 of 17

Meantime Report



/KENNZ=x

KPIs to be deleted.

Default: all KPIs

  GRP=x

Evaluation  group

for  which

resources

the  data

is  deleted

(individual  workplaces).

Default: all resources

MDE-MTR_82.docx

Version: 1.0.23049

Page 17 of 17


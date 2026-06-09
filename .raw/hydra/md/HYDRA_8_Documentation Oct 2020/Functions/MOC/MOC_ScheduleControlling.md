Termincontrolling

1  Schedule Controlling

Overview

Menu

Order management  Order controlling  Schedule controlling

Transaction code

scec

Function authorization

scec

Available user fields

Where?

Object type/user field key

Source (type)

Table Schedule controlling  AUNR/SYSTEM

Table Schedule controlling  AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

You  use  this  application  to  monitor  deviations  from  scheduled  dates  for  operations.  The  deviations  are

displayed in a list. The list provides answers to the following questions, for example:

  Which operations whose planned start has been exceeded have not (yet) been started?

  Which operations are currently not being processed (status prepared or interrupted) and are expected

to be delayed as a result?

  Which operations that are currently being processed (status running), are expected to be finished too

late?

  Which operations were finished too late?

You can use this function to analyze lateness in the schedule, but you can also see which order start or

order end is too early.

Target group for this type  of information: production  controllers and supervisors. Benefit of the function:

The  quality  of  the  scheduled  times  is  continuously  monitored.  It  is  a  tool  to  ensure  smooth  production

processes.

MOC_ScheduleControlling.docx

Version: 1.5.18468

Page 1 of 8

Termincontrolling

Integration

During the analysis, current dates are compared to planned dates. Depending on the type of planning, the

function  can  monitor  dates  planned  in  detail,  scheduled  dates  or  basic  dates.  The  planned  dates  are

either  the  result  of  detailed  planning  performed  in  HYDRA  shop  floor  scheduling  or  of  the  planning

performed in the ERP system.

Requirements

To  use  this  application  properly,  you  must  know  how  the  planned  dates  are  identified  or  set  in  your

system. Only then you can specify a useful selection.

Selection criteria

The application provides the following selection criteria:

Check against baseline plan

The  selection  list  shows  all  baseline  plans  that  are  included  in  the  responsibility  area  the  user  is

authorized for.

OPs started too early, OPs started too late, OPs finished too early, OPs finished too late

Depending on the selection options checked, the following operations are included in the selection:

  Operations started too early

  Operations finished too early

  Operations started too late

  Operations finished too late

The values that are calculated are specified by the-  option selected: "Exceeding of planned dates",

"Exceeding of basic dates" or "Exceeding of scheduled dates".

If none of these options is set, all operations without deviations are displayed.

Date ... to  …

The  system  only  checks  the  operations  that  have  a  start  or  end  date  in  the  specified  period

(depending on the selected option).

Consider long-term data

If this option is set, the system also includes operations that have been transferred from the online

data to the long-term dataset.

Exceeding of planned dates

The  system  checks  if  the  start  and  end  dates  specified  in  the  detailed  scheduling  (e.g.  HYDRA

Shop Floor Scheduling) are respected.

MOC_ScheduleControlling.docx

Version: 1.5.18468

Page 2 of 8

Termincontrolling

Exceeding of basic dates

The system checks if the basic dates Latest start (LST) and Latest end (LET) transferred from the

ERP system or specified in the HYDRA lead time scheduling are respected.

Note:

The ERP system must transfer the correct basic dates for the operation that result from lead time

scheduling.  Other  option:  You  can  also  calculate  the  basic  dates  using  the  HYDRA  lead  time

scheduling.

Exceeding of scheduled dates

The system checks if the calculated dates Scheduled start time and Scheduled end time transferred

from the ERP system or specified in the HYDRA lead time scheduling are respected.

Planned for

Workplace or group

Workplace/group/cost center/company

Narrows down the display by workplace, group or cost center.You can also use wildcards.

Note:  The  selection  by  workplace  or  cost  center  is  only  useful  with  operations  that  are  already

planned for a specific workplace.

Order

Only operations of a specific order are selected. You can also use wildcards.

Order type

Only operations of orders of a specific order type are selected. Multiple selection is possible.

Category

Only  operations  of  orders  of  a  specific  order  type  category  are  selected.  Multiple  selection  is

possible.

Order group

Only operations of orders of a specific order group are selected. Multiple selection is possible.

MRP controller

Only operations of orders of a specific MRP controller are selected. You can also use wildcards.

Customer name/designation

Only operations of orders for a specific customer are selected. You can also use wildcards.

Sales order

Only operations of the order that matches the specified sales order are selected. You can also use

wildcards.

Project number

Only  operations  of  the  order  with  the  specified  project  number  are  selected.  You  can  also  use

wildcards.

MOC_ScheduleControlling.docx

Version: 1.5.18468

Page 3 of 8

Termincontrolling

Planned order

Only operations of the order that matches the specified planned order are selected. You can also

use wildcards.

Operation status

The system only selects operations of a specific operation status. Multiple selection is possible.

Control

The  system  only  selects  operations  that  have  a  status  with  a  specific  control  indicator.  Multiple

selection is possible.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the function authorization chkresp.

This selection option is only available, if you enable the extension scec2.

Data collection

Depending  on  the  option  selected,  the  check  is  performed  against  the  planned  dates/the  scheduled

dates/the basic dates (specification as date) of the current dataset.

The values that are calculated are specified by the



selection of the tab Planned dates, Scheduled dates or Basic dates.

The  values  Planned  start  or  Planned  end  described  in  the  tables  below  are  used  as  some  kind  of

placeholders  for  the  different  combinations  (current  planned  dates/planned  dates,  current  planned

dates/scheduled dates, current planned dates/basic dates).

To  calculate  the  days,  the  system  uses  the  specified  dates  and  synchronizes  them  with  the

Gregorian calendar. The displayed format is: days.hours:minutes:seconds.

Deviation from start date

Earliness

Condition 1: Control
L, U, E, A

Condition 2: Date
OP actual start < planned start

Calculation *)
ABS
planned start)

(OP  actual  start  minus

Lateness

Condition 1: Control

Condition 2: Date

Calculation *)

MOC_ScheduleControlling.docx

Version: 1.5.18468

Page 4 of 8

Termincontrolling

Calculation *)
ABS
planned start)
ABS
today)

(OP  actual  start  minus

(OP  planned  start  minus

Condition 1: Control
L, U, E, A, F

Condition 2: Date
OP actual start > planned start

S, V

OP planned start > today

On-time delivery

On-time delivery = earliness + lateness

Deviation from end date

Earliness

Condition
Control
E, A

Lateness

1:

Condition 2: Date

Calculation *)

OP actual end < planned
end

ABS (OP actual end minus planned end)

Condition 1: Control
S, V, L, U, F
E, A

Condition 2: Date
Today > planned end
OP actual end > planned end

Calculation *)
ABS (today minus planned end)
ABS (OP actual end minus planned
end)

On-time delivery

On-time delivery = earliness + lateness

*) The time is always specified as absolute value (ABS).

Field descriptions

When  the  data  is  requested,  the  table  shows  the  order/operation,  OP  designation  and  article  and

additionally the basic dates, the dates of detailed planning and the actual dates.

Deviations

from  scheduling

(earliness,

lateness,  on-time  delivery)  are  displayed

in

format

days.hours:minutes:seconds.

To  calculate  the  days,  the  system  uses  the  specified  dates  and  synchronizes  them  with  the

Gregorian calendar.

Detail application: Schedule controlling (graphic)

The detail application Schedule controlling (graphic)  shows the earliness,  lateness and on-time delivery

for all operations selected in the table. If no operation is selected, it will be interpreted as “all operations

selected”.

MOC_ScheduleControlling.docx

Version: 1.5.18468

Page 5 of 8

Termincontrolling

Display options

Display:

You can specify whether the graphic shows earliness, lateness or on-time delivery performance.

Relating to:

You  can  specify  whether  the  graphic  shows  the  deviations  from  the  start  (planned  start/actual  start)  or

from the end (planned end/actual end) of the operation.

Group by:

The  selection  made  specifies  if  the  graphic  shows  the  totaled  data  for  the  workplace,  group  or  cost

center.

Consideration:

Specifies whether



the mean value AND the standard deviation

or



the total of durations (lateness, …)

are displayed.

Display

Data is displayed in format Days.Hours:Minutes:Seconds.

MOC_ScheduleControlling.docx

Version: 1.5.18468

Page 6 of 8

Irrespective  of  the  selected  display  options,  the  number  of  operations  used  for  the  evaluation  is  always

Termincontrolling

displayed in form of a line.

Calculations

Mean value

The mean value is calculated as follows:

n = Number of OPs produced too early

Standard deviation

Standard deviation is calculated as follows:

In  case  of  lateness,  the  variance  is  calculated  as  follows:

  (analog  calculation

for earliness or on-time delivery).

Toolbar

The parameters to call the function or target application are generally transferred from the table. For this

reason, you should always select an entry before calling an application.

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

MOC_ScheduleControlling.docx

Version: 1.5.18468

Page 7 of 8

nEarlinessnxx1nDelaynxx1nDelayEarlinessnxxx1VarnDelayVarnxx12)(

Termincontrolling

Saving baseline plans

Function authorization: esvb; license: BDE-CAB

The applications  Operations and Pool of  orders provide this function.  You can  use this function to save

baseline  plans  for  selected  operations  that  are  used  as  selection  criterion  to  identify  deviations  from

planned dates.

MOC_ScheduleControlling.docx

Version: 1.5.18468

Page 8 of 8


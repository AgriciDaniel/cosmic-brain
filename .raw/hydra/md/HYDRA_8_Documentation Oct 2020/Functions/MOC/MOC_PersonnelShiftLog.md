Personnel Shift Log

1  Personnel shift log

Overview

Menu

Order management  Production reports  Personnel shift log

Transaction code

pspr

Function authorization

pspr

Purpose

The  personnel  shift  log  is  an  absolute  necessity  for  anyone  in  a  position  of  responsibility  in  production.

Here, the shift supervisor, the shift manager and the foreman are each provided a clear overview of all of

the important information needed relating to their staff.

The personnel shift log is a function in production management. This function makes it possible to create

shift-related  reports  about  the  produced  orders  by  person.  With  the  additional  graphic  presentations

showing  quantities  and  durations,  the  user  is  given  an  excellent  overview  of  all  data  concerning

personnel.

This  function  provides  the  information  about  the  operations  completed  during  a  shift.  In  addition  to  the

quantities produced, the log also shows the times needed. This is shown for each person logged on at the

operation.

Integration

Shown in the personnel shift log are all operations that were selected in the selection panel. Here, only

BDE log records of record type "B" are considered.

When requesting the data, the system checks









the person's area of responsibility when selecting by cost center

the responsibility area of the workplace when selecting by workplace or group

the responsibility of the workplace when selecting by report group

the person's responsibility area when selecting by employee group.

It is possible to correct the entered personnel postings in the Order-related postings function.

Requirements

In order to use the personnel shift log, what is required is that personnel-related postings are performed

and that the relevant, finished postings (log records) exist in the system.

MOC_PersonnelShiftLog.docx

Version: 1.8.21376

Page 1 of 7

Personnel Shift Log

Selection criteria

The application provides the following selection criteria:

Date from ... to ...

Enter a period of time to narrow down the displayed log records. The system selects the log records

with a start date (logon date) in the period defined.

The  preset  value  is  "Today  minus  7  days"  to  "Today".  The  date  is  calculated  based  on  the

Gregorian calendar.

Shift all, 1, 2, 3, 4

Within the entered period, only those log records are selected that are assigned to the shift entered

according to the shift model.

At the time the data is selected, the system does not include operations that were

logged  on  during  the  currently  running  shift,  because  no  log  records  have  been

generated for them yet.

Workplace from … to …

Selects the log records posted to the  workplace that was entered, the responsibility area of which

the user has authorized rights to. You can also run a search using wildcards in the field.

Group from … to …

Selects  the  log  records  posted  to  the  workplaces,  the  responsibility  area  of  which  the  user  has

authorized rights to, and that are assigned to the entered group. You can also run a search using

wildcards in the field.

Cost center

Selects the log records posted to the staff, the responsibility area of which the user has authorized

rights to and that are assigned to the entered cost center.

Additional notes on the selection

Long-term data

If  the  selection  period  exceeds  the  period  of  time  of  the  online  data  area,  the  system  implicitly

selects the  data  of the medium-term data area.  You  need  not  explicitly activate the access to the

medium-term data area.

Personnel shift log detail application

The detail application provides the following fields:

MOC_PersonnelShiftLog.docx

Version: 1.8.21376

Page 2 of 7

Personnel Shift Log

Category Shift

Shift date

Shift date of the shift in which the operation is completed.

Shift

Shift in which the operation is completed.

Person category

Person

Personnel number of the person logged on at the operation.

Last name

Last name of the person logged on at the operation.

First name

First name of the person logged on at the operation.

Name

Entire  name  of  the  person  (last  name,  middle  name  and  first  name)  who  was  logged  on  at  the

operation.

Operator position, designation, description

Operator  position  that  was  used  when  the  person  logged  onto  the  workplace  (depending  on  how

the system is configured).

Order category

Category

Order category for the order/ operation, e.g. production order (FA) or overhead cost order (GK).

Order type

Order type of the order

Order

Order number of the order/ operation.

Sequence

Sequence number for the operation (depending on how the system is customized/ configured).

Operation

Operation number for the operation

Split

Split number of the operation, if the operation is a split operation (depending on how the system is

customized/ configured).

Article/article designation

Article number and article designation of the operation.

MOC_PersonnelShiftLog.docx

Version: 1.8.21376

Page 3 of 7

Personnel Shift Log

Workplace category

Workplace/group/cost center

In  addition  to  the  order  and  article  number,  the  workplace  is  displayed  (including  group  and  cost

center of the workplace) where the operation has been produced in the selected shift.

Primary quantities category

Target quantity

The  operation's  target  quantity  in  each  of  the  quantity  units  (primary  quantity  unit,  secondary

quantity unit, tertiary quantity unit, base quantity unit).

For this column, no total is calculated. In some cases, one operation is produced

during several shifts and here it is not correct to calculate totals.

Yield

The yield posted for this operation in relationship to the selected shift.

Scrap

The scrap posted for this operation in relationship to the selected shift.

Rework

The rework quantity posted for this operation in relationship to the selected shift.

Open quantity

The open quantity posted for this operation in relationship to the selected shift.

Quantity unit

The relevant unit of quantity.

Duration category

Target duration

The target duration relating to the operation is edited as follows:

((Operation's  target  cycle  [per  1000])  /  1000  /  the  operation's  partitioning  *  operation's  target

quantity in primary quantity unit) + operation's setup time

For this column, no total is calculated. In some cases, one operation is produced

during several shifts and here it is not correct to calculate totals.

Production

The production time entered for this person at the operation in relationship to the selected shift.

Downtime

The downtime entered for this person at the operation in relationship to the selected shift.

Sum (total)

Total of all production times and downtimes (sum of columns Production + Downtime).

MOC_PersonnelShiftLog.docx

Version: 1.8.21376

Page 4 of 7

Personnel Shift Log

RPA category

RPA

Detailed presentation of the actual times entered at the resource performance accounts  level.

Note

Displaying the actual quantities and the actual durations (RPA)

The shift automatic option is not available for workplaces that are not assigned to any terminal or

that  are  assigned  to  a  terminal  configured  as  a  BDE  terminal  (shop  floor  data  collection).  This

means  that  there  are  no  automatic  order  or  person-related  postings  at  the  end  of  shifts.  In  this

case,  you  cannot  exactly  assign  the  recorded  quantities  and  durations  to  the  shifts.  The  system

therefore  assigns  quantities  and  durations  proportionally.  This  assignment  is  based  on  the

workplace's shift calendar.

Example:

In the example, the shift model is as follows: shift 1: 6:00 am to 2:00  pm; and shift 2: 2:00 pm to

10:00 pm. This shift model is assigned to a workplace that is in accordance with the criteria listed

above. An OP has been logged on at 1:00 pm and off at 4:00 pm. For the OP logoff, 90 is uploaded

as the yield.

In this case, the shift log for the operation in shift 1 will calculate an order duration of 60 minutes

and a yield of 30. For shift 2, an order duration of 120 minutes is calculated and a yield of 60. The

RPA-related durations are also calculated based on the shift model that the workplace is based on.

Display of the personnel time in the personnel shift log

In the personnel shift log, the identifier  "Post production to main utilization  during break" from the

HYDRA  basic  settings  is  NOT  taken  into  account.  This  means  that  the  labor  duration  posted  to

main  utilization  (RPA  11)  during  breaks  is  removed  from  the  postings  the  calculation  is  based  on

(record type "B").

For  example:  the  calculation  is  based  on  a  shift  model  from  6.00  am  -  2.00  pm  with  a  break

between 12.00 noon and 1.00 pm. The status Production is in effect from 6.00 am to 12.30 pm and

from 1.00 pm to 2.00 pm.

7.30 hours will be posted as main utilization time for a person logged on from 6.00 am  - 2.00 pm

(assumption:  no  multiple  machine  operation)  -  if  the  identifier  "Post  production  to  main  utilization

during  break"  is  set. When  the  personnel  shift  log  is  called  up,  this  time  is  compared  to  the  shift

calendar  so  that  a  main  utilization  time  of  7.00  hours  is  calculated  for  the  shift  model  provided

above.

Durations acc. to person detail application

Shown  in  the  "Durations  acc.  to  person"  detail  application  are  the  durations  posted  to  each  person.

Considered here are the operations that were selected in the personnel shift log detail application.

MOC_PersonnelShiftLog.docx

Version: 1.8.21376

Page 5 of 7

Personnel Shift Log

The  bar  chart  shows  the  person  (personnel  number)  for  the  selected  operations  on  the  Y  axis  and  the

absolute values (durations) on the X axis. The respective quantity accounts specify the color of the bars

(production/RPA  11:  green;  downtimes/RPA  1-11:  red).  Bars  are  sorted  in  descending  order  by

production duration.

You can use a multi-combo box to define the durations that are shown as a bar:

- Production

- Downtimes

The bars are shown in a "stacked" form so that the total quantity can be defined differently for each user.

Activate the check box "Show labels", to show the values on the bars. Note: These labels are displayed

for the selected duration.

Quantities acc. to person detail application

Shown in the "Quantities acc. to person" detail application are the cumulated quantities (primary quantity

unit) posted to each person. Considered here are the operations that were selected in the personnel shift

log detail application.

The bar chart shows the person for the selected operations on the Y axis and the posted quantities on the

X axis. The bar colors are based on each quantity account (yield: green; scrap: red, rework: blue, open

quantity: gray). Bars are sorted in descending order by yield.

You can define for which quantity accounts (primary quantity unit) you would like to show bars from a

multi-combo box:

- Yield

- Scrap

- Rework

- Open quantity

The bars are shown in a "stacked" form so that the total quantity can be defined differently for each user.

Activate the check box "Show labels", to show the  values on the bars. What needs to be considered  is

that these labels are displayed for each selected quantity account.

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

MOC_PersonnelShiftLog.docx

Version: 1.8.21376

Page 6 of 7

Personnel Shift Log

 Order information

Use this button to call the application  Order information.

Order overview

Use this button to call the application Order overview.

MOC_PersonnelShiftLog.docx

Version: 1.8.21376

Page 7 of 7


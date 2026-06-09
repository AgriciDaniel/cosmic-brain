Personnel Shift Log

1  Personnel Shift Log

Overview

The personnel shift log is a function in production management. This function allows for a shift evaluation

with the capability of creating a personal detailed report. The shift supervisor, the shift manager and the

foreman are each provided a clear overview of all of the information needed relating to his staff.

Integration

The personnel shift log provides information about the operations completed during a shift. In addition to

the  quantities  produced,  the  log  also  shows  the  time  that  was  required  in  each  case.  This  is  shown  for

each person logged on at the operation. The data displayed is the result of the order-related data entered

at the terminal during posting.

Requirement

In order to use the personnel shift log, what is required is that personnel-related postings are performed

and that corresponding finished postings (log records) exist in the system.

Selection criteria

Shown  in  the  personnel  shift  log  are  all  operations  that  were  selected  in  the  selection  panel.  Here,  the

BDE  log  records  of  selection  type  "B"  are  considered.  The  application  provides  the  following  selection

criteria:

Workplace from … to …

Select  the  log  records  posted  to  the  workplace  that  was  entered,  the  responsibility  area  of  which

the user has authorized rights to. You can also run a search using wildcards in the field.

Group from … to …

Select  the  log  records  posted  to  the  workplace  that  was  entered,  the  responsibility  area  of  which

the user has authorized rights to, and that are assigned to the entered group. You can also run a

search using wildcards in the field.

Cost center

Select the log records posted to the people, the responsibility area of which the user has authorized

rights to and that are assigned to the entered cost center.

Date from ... to ...

The  time  period  entered  restricts  the  selection  by  log  records.  Select  the  log  records  that  have  a

posted shift date within the defined period.

HWEB_PersonnelShiftLog.docx

Version: 1.0.1362

Page 1 of 5

Personnel Shift Log

The  preset  value  is  "Today  minus  7  days"  to  "Today".  The  date  is  calculated  based  on  the

Gregorian calendar.

Shift all, 1, 2, 3, 4

Within the entered period, only those log records are selected that are assigned to the shift entered

according to the shift model.

Operations  that  are  logged  on  during  the  currently  running  shift  at  the  time  the

data  are  selected  are  not  considered,  because  no  log  records  have  been

generated for them yet.

Personnel shift log

The following fields are displayed in the table:

Shift date

Shift date of the shift in which the operation is completed.

Shift

Shift in which the operation is completed. In the process, the shift number is determined based on

the shift that is active at the time of posting, as defined in the shift model, for the workplace at which

the operation is logged in.

Person

Personnel  number  of  the  person  logged  on  at  the  operation.  The  personnel  number  is  displayed

with leading zeros.

Last name

Last name of the person logged on at the operation.

First name

First name of the person logged on at the operation.

Order

Order number of the order/ operation.

Operation

Operation number for the operation

Article

Article number of the operation.

Production

The time of production (RPA 11) entered for this operation in relationship to the selected shift.

HWEB_PersonnelShiftLog.docx

Version: 1.0.1362

Page 2 of 5

Personnel Shift Log

Total time

Sum total of all production and standstill periods (sum of RPA 1 - 11). The separate RPAs are listed

after the recorded quantities.

Yield

The yield entered for this operation in relationship to the selected shift.

Scrap

The scrap posted for this operation in relationship to the selected shift.

Unit

SUT

DCI

LCI

SCI

IMN

IMS

SET

STA

U8

U9

MUT

The relevant unit of quantity.

Secondary utilization time

Disturbance-caused interruption

Logistics-caused interruption

Staff-caused interruption

Idle mode (not scheduled)

Idle mode (scheduled)

Setup

Startup

User RPA

User RPA

Main utilization time

Operation designation

Operation designation for the operation

HWEB_PersonnelShiftLog.docx

Version: 1.0.1362

Page 3 of 5

Personnel Shift Log

MES order number

Combined order/ operation number.

Please note:

Displaying the actual quantity and the actual durations (RPA)

For  workplaces  that  are  either  not  assigned  to  any  terminal  or  for  those  that  are  assigned  to  a

terminal configured as a BDE terminal, there is no shift automation. This means that there are no

automatic  order  or  person-related  postings  at  the  end  of  shifts.  Because  this  means  that  there  is

also no exact shift relationship to the entered quantities and durations, in this case a proportionate

assignment is made in the shift log. This assignment is made using the workplace's shift calendar

as the basis.

Example:

In this case  we  have a shift model set for shift 1: 6.00 am to 2.00  pm and for shift 2: 2.00 pm to

10.00 pm. This shift model is assigned to a workplace that is in accordance with the criteria listed

above. Furthermore, we also have an OP log-in at 1.00 pm and an OP logoff at 4.00 pm. For the

OP logoff, 90 is uploaded as the yield.

In this case, the shift log for the operation in shift 1 will calculate an order duration of 60 minutes

and a yield of 30. For shift 2, an order duration of 120 minutes is calculated and a yield of 60. The

RPA-related durations are also calculated based on the shift model that the workplace is based on.

Display of the personnel time in the personnel shift log

In the personnel shift log, the identifier  "Post production to main utilization  during break" from the

HYDRA basic settings is NOT taken into account. This means that the  personnel times posted to

main  utilization  (RPA  11)  are  removed  from  the  postings  the  calculation  is  based  on  (record  type

"B").

For  example:  the  calculation  is  based  on  a  shift  model  from  6.00  am  -  2.00  pm  with  a  break

between 12.00 noon and 1.00 pm. The status Production is in effect from 6.00 am to 12.30 pm and

from 1.00 pm to 2.00 pm.

7.30 hours will be posted as main utilization time for a person logged on from 6.00 am  - 2.00 pm

(assumption:  no  multiple  machine  operation)  -  if  the  identifier  "Post  production  to  main  utilization

during  break"  is  set. When  the  personnel  shift  log  is  called  up,  this  time  is  compared  to  the  shift

calendar  so  that  a  main  utilization  time  of  7.00  hours  is  calculated  for  the  shift  model  provided

above.

Graphic personnel shift log

After the logs have been preselected, they can be displayed graphically by person in the detailed reports.

After an entry has been selected in the table, the menu item "Graphic personnel shift log" will appear to

the left of the menu item.

HWEB_PersonnelShiftLog.docx

Version: 1.0.1362

Page 4 of 5

Personnel Shift Log

In the graphic presentation, all of the operations produced during a shift that were assigned to a person in

the evaluation period of the selected data record will be displayed by person.

The top bar chart shows the quantities per person. Shown on the Y axis is the person (personnel number)

for the highlighted operations, and the produced quantities are shown on the X axis. The bottom bar chart

shows  the  person  (personnel  number)  for  the  highlighted  operations  on  the  Y  axis  and  the  absolute

values (durations) on the X axis. The bars in the charts are shown "stacked".

In both charts, a legend provides information about the colors chosen for the bars.

HWEB_PersonnelShiftLog.docx

Version: 1.0.1362

Page 5 of 5


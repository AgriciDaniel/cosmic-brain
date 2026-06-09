Order Shift Log

1  Order Shift Log

Overview

The order shift log is a function in production management and represents the evaluation of input order

data  (quantities  and  times)  relating  to  the  recorded  shifts.  It  provides  the  information  that  the  person

responsible for production - the foreman or the shift supervisor - needs for the daily reports.

Integration

This  function  provides  the  information  about  the  operations  completed  during  a  shift.  In  addition  to  the

quantities produced, the time that was required in each case is also shown. The data are shown for each

order/ operation. The data displayed is the result of the order-related data entered at the terminal during

posting.

Selection criteria

All  operations  are  shown  in  the  order  shift  log  that  match  the  restriction  defined  in  the  selection  panel.

Here, if the operations do not require batch management, the BDE log records of record type "U" and "E"

are  considered;  for  operations  that  require  batch  management,  BDE  log  records  of  record  type  "H"  are

considered.

The application provides the following selection criteria:

Workplace from … to …

Selects the log records posted to the workplace that was entered, the responsibility area of which

the user has authorized rights to. You can also run a search using wildcards in the “from” field.

Group from … to …

Selects the log records posted to the workplace that was entered, the responsibility area of which

the user has authorized rights to, and that are assigned to the entered group. You can also run a

search using wildcards in the “from” field.

Cost center

Selects the log records posted to the workplace that was entered, the responsibility area of which

the  user has  authorized rights  to,  and that are assigned to the entered cost center.  You can also

run a search using wildcards.

Date from… to…

The time period entered restricts the selection by log records. Selects the log records that have a

posted shift date within the defined period.

HWEB_OrderShiftLog.docx

Version: 1.0.1362

Page 1 of 4

Order Shift Log

The  preset  value  is  "Today  minus  7  days"  to  "Today".  The  date  is  calculated  based  on  the

Gregorian calendar.

Shift all, 1, 2, 3, 4

Within  the  entered  period,  select  only  those  log  records  that  are  assigned  to  the  shift  entered

according to the shift model.

Operations that are logged in during the currently running shift at the time the data

are selected are not considered, because no log records have been generated for

them yet.

Order shift log

The  fields  listed  below  are  displayed  in  the  table:  Additional  order-related  fields  can  be  added  when

customizing the system to customer specifications.

Shift date

Shift date of the shift in which the operation is completed.

Shift

Shift in which the operation is completed. In the process, the shift number is determined based on

the shift that is active at the time of posting, as defined in the shift model, for the workplace at which

the operation is logged in.

Workplace

The workplace at which the operation is being completed in the selected shift is shown in addition

to the order and item/article number.

Order

Order number of the order/ operation.

Operation

Operation number for the operation

Article

Article number/item number of the operation.

Production

The time of production (RPA 11) entered for this operation in relationship to the selected shift.

Total time

Sum total of all production and standstill periods (sum of RPA 1 - 11). The separate RPAs are listed

after the recorded quantities.

Yield

The yield entered for this operation in relationship to the selected shift.

HWEB_OrderShiftLog.docx

Version: 1.0.1362

Page 2 of 4

Scrap

The scrap posted for this operation in relationship to the selected shift.

Order Shift Log

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

Idle mode not scheduled

Idle mode scheduled

Setup

Startup

User RPA

User RPA

Main utilization time

Operation designation

Operation designation for the operation

MES order number

Combined order/ operation number.

HWEB_OrderShiftLog.docx

Version: 1.0.1362

Page 3 of 4

Order Shift Log

Please note:

Displaying the actual quantities and the actual durations (RPA)

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

Operations that are logged in during the currently running shift at the time the data

are selected are not considered, because no log records have been generated for

them yet.

Graphic order shift log

After  the  logs  are  preselected,  they  can  be  displayed  graphically  by  article  in  the  detailed  report:  By

selecting an entry, the "Graphic order shift log" menu item appears to the left.

In the graphic presentation, all articles are displayed that were produced during the evaluation period for

the  selected  data  record.  On  the  one  hand,  the  posted  quantities  that  accumulated  at  article  level  are

displayed and on the other hand the corresponding durations are shown.

The top bar chart shows the article numbers on the Y axis and the produced quantities on the X axis. The

bottom bar chart shows the article numbers on the  Y axis and the absolute  values (durations) on the X

axis.

In both charts, a legend provides information about the colors chosen for the bars.

HWEB_OrderShiftLog.docx

Version: 1.0.1362

Page 4 of 4


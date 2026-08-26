Maintenance Controlling

1  Maintenance Controlling

Summary

Menu

Order management  Order controlling  Maintenance controlling

Transaction code

pmcon

Function authorization

pmcon

Usage

Maintenance  controlling  is  a  production  management  function.  Maintenance  especially  is  provided  an

overview of the maintenance orders that need to be processed.

The purpose of maintenance controlling is to show costs (based on activities/ times) that were incurred as

a  result  of  maintenance  activities.  By  structuring  the  maintenance  orders  accordingly  referencing  the

maintained equipment, the function provides the ability to identify maintenance-intensive materials.

Integration

Database used to evaluate the order data logs .

Selection criteria

The application provides the following selection criteria:

Article

Restricted to articles

Article designation

Restricted to article designation

Cost center

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the cost center entered.

Responsibility area

The responsibility area that is entered restricts the requested data to the defined responsibility area

for the particular machine/ workplace.

Period

The time period entered restricts the selection by log records. Such

MOC_ControllingPM.docx

Version: 1.1.1362

Page 1 of 4

Maintenance Controlling

log records are selected that have a start date within the defined period.

Workplace

The postings for the record type "U"/ "E" are selected that are posted to workplace entered

for which the user has been authorized via the responsibility area of the

workplace.

Group

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the group entered.

Company

By running the selection by company, only the data records are displayed or used in the evaluation

that were created for the machines/ workplaces at those companies that match the companies you

selected.

Order

The  order  number  can  be  entered  or  selected.  The  order  number  defined  here  (order  header

number) restricts the evaluation to the selected order.

OP designation

Only  the  recorded  data  entered  for  an  operation  defined  in  the  field  OP  designation  with  the

selected designation is used for the evaluation (free text).

The responsibility area is not checked in this application.

Field descriptions

Responsibility area

The responsibility area defined at the machine for which the data was entered.

Date

The dates shown are presented broken down by day.

Workplace

By  integrating  the  field  Workplace,  the  data  can  be  distributed  or  grouped  by  the  workplace  at

which the overhead costs are recorded.

Year - quarter - month - calendar week - weekday - day

This field provides the ability to group or distribute the displayed data respectively.

MOC_ControllingPM.docx

Version: 1.1.1362

Page 2 of 4

Maintenance Controlling

Group

The  data  shown  is  distributed  and  displayed  based  on  the  machine  group  that  is  defined  at  each

machine/ at each workplace.

Cost center

This  field  allows  the  data  to  be  distributed  based  on  the  cost  center  defined  at  the  machine/

workplace.

Company

This  field  allows  the  data  to  be  distributed  based  on  the  company  defined  at  the  machine/

workplace.

Order

The data shown is grouped or displayed based on the order number (order header number).

Article

Filtering by article makes it possible to filter the article number of the separate operations.

Article designation

Even  if  several  articles  have  the  same  article  number,  these  can  be  differentiated  by  article

designation. This way the data records displayed can be grouped by article designation.

MES order number

As opposed to the order number, the MES order number is formed by combining the order number

and  the  operation  number.  Therefore,  the  data  is  displayed  grouped  by  the  separate  operation

numbers.

Total duration

The sum total of all durations for the selected data records.

Tools

By  running  a  selection  by  tool,  only  those  posting  records  are  used  in  the  evaluation  that  were

recorded for operations, in which the relevant tool was defined.

Article per calendar week detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration added up per calendar week. The total durations per article number are presented in the lines as

totals.

Workplace per calendar week detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration  added  up  per  calendar  week.  The  total  durations  per  article  number  and  workplace  are

presented in the lines as totals.

MOC_ControllingPM.docx

Version: 1.1.1362

Page 3 of 4

Maintenance Controlling

Article per work place detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration  added  up  per  workplace.  The  total  durations  per  article  number  are  presented  in  the  lines  as

totals.

MOC_ControllingPM.docx

Version: 1.1.1362

Page 4 of 4


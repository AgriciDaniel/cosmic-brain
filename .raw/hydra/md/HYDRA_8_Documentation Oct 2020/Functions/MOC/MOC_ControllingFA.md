Production Controlling

1  Production Controlling

Summary

Menu

Order management  Order controlling  Production controlling

Transaction code

pdcon

Function authorization

pdcon

Usage

In this evaluation, you can evaluate data from the production orders using criteria that you can define in

advance.

Integration

In this evaluation, you can evaluate posting data for orders based on various criteria that can be defined

in the pivot table.

Initially,  the  duration  of  the  order  is  displayed  per  machine  and  calendar  week.  This  display  can  be

changed by modifying the data field combination.

Selection criteria

The application provides the following selection criteria:

Article

Restricted to articles

Article designation

Restricted to article designation

Cost center

The postings for the record type "U"/ "E" are selected that are posted to workplace for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the cost center entered.

Period

The  time  period  entered  restricts  the  selection  by  log  records.  The  log  records  are  selected  that

have a start date within the defined period.

MOC_ControllingFA.docx

Version: 1.1.1362

Page 1 of 4

Production Controlling

Responsibility area

The responsibility area that is entered restricts the requested data to the defined responsibility area

for the particular machine/ workplace.

Workplace

The postings for the record type "U"/ "E" are selected that are posted to the workplace entered

for which the user has been authorized via the responsibility area of the

workplace.

Group

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the group entered.

Company

By using the selection by company, only the data records for the relevant company are displayed or

are included in the evaluation.

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

which the production order costs are recorded.

Year - quarter - month - calendar week - weekday - day

This field provides the ability to group or distribute the displayed data respectively.

MOC_ControllingFA.docx

Version: 1.1.1362

Page 2 of 4

Production Controlling

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

OP designation

For  each  operation  there  is  an  operation  designation  that  is  defined  in  the  master  data  at  the

operation.

OP

The  field  OP  (Operation)  lists  the  operation  number  only  (without  the  order  header  number,  e.g.

0010).  This  allows  you  to  group  data  records  which  may  be  from  different  orders,  however  which

have the same operation number.

Total duration

The sum total of all durations for the selected data records.

Tools

By  running  a  selection  by  tool,  only  those  posting  records  are  used  in  the  evaluation  that  were

recorded for operations, in which the relevant tool was defined.

Pivot table detail application

You can evaluate order data based on additional criteria in the pivot view detail view.

MOC_ControllingFA.docx

Version: 1.1.1362

Page 3 of 4

The bar colors in the chart are set "arbitrarily" using a color chart defined internally.

Production Controlling

MOC_ControllingFA.docx

Version: 1.1.1362

Page 4 of 4


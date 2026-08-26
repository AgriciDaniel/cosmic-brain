Overhead Cost Controlling

1  Overhead Cost Controlling

Summary

Menu

Order management  Order controlling  Overhead cost controlling

Transaction code

ohcon

Function authorization

ohcon

Usage

A portion of costs created in a company that should not be ignored are the result of so-called overhead

costs. The  objective  of  the  evaluation  "Overhead  cost  controlling"  is  to  provide  a  means  to make  these

overhead  costs  transparent  and  to  identify  the  real  "cost  monsters",  while  in  doing  so  finding  ways  to

introduce countermeasures that will help lower overall costs.

Generally, it is the responsibility of the cost center managers to conduct audits and analyses of this kind

and  to  derive  the  relevant  measures  based  on  the  results.  In  production,  for  example,  this  is  the

responsibility of the foremen.

In addition to evaluating overhead costs relating to a specific cost center, it is also important to determine

which activities incurred these costs. Overhead cost orders can be used to illustrate a breakdown of this

kind.

Definition of overhead costs:

"Costs  that  cannot  be  attributed  to  any  specific  product  or  performance  unit  (cost  object,  cost  center),

such  as  lease  or  rent  payments,  executive  salaries.  [...]  Overhead  costs  are  such  costs  that  cannot  be

attributed to any allocation base directly."

(Source: http://www.wirtschaftslexikon24.net/d/gemeinkosten/gemeinkosten.htm)

Integration

Database used to evaluate the order data logs .

Requirement

In order for an evaluation to be meaningful, what is required is that the employees record their overhead

cost times correctly and allocate them to the cost object appropriately (correctly prepared overhead costs

order).

MOC_ControllingGK.docx

Version: 1.1.1362

Page 1 of 5

Overhead Cost Controlling

Selection criteria

The application provides the following selection criteria:

Cost center

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the cost center entered.

Workplace

The postings for the record type "U"/ "E" are selected that are posted to workplace entered

for which the user has been authorized via the responsibility area of the

workplace.

Group

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the group entered.

Period

The time period entered restricts the selection by log records. Such

log records are selected that have a start date within the defined period.

Responsibility area

The responsibility area that is entered restricts the requested data to the defined responsibility area

for the particular machine/ workplace.

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

MOC_ControllingGK.docx

Version: 1.1.1362

Page 2 of 5

Overhead Cost Controlling

Field descriptions

Responsibility area

The responsibility area defined at the machine for which the data was entered.

Date

The dates shown are presented broken down by day.

Workplace

By integrating the field workplace, the data can be distributed or grouped by the workplace at which

the overhead costs are recorded.

Year - quarter - month - calendar week - weekday - day

This field provides the ability to group or distribute the displayed data respectively.

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

MES order number

As opposed to the order number, the MES order number is formed by combining the order number

and  the  operation  number.  Therefore,  the  data  is  displayed  grouped  by  the  separate  operation

numbers.

OP designation

For  each  operation  there  is  an  operation  designation  that  is  defined  in  the  master  data  at  the

operation.

Total duration

The sum total of all durations for the selected data records.

MOC_ControllingGK.docx

Version: 1.1.1362

Page 3 of 5

General detail applications

The evaluation provided in the overhead costs controlling considers the operations in the overhead costs

Overhead Cost Controlling

orders category.

Target times

These  relate  to  target  times/  periods  defined  in  the  order  backlog.  The  target  times  are  not  related

proportionately to the selection period, but instead are attributed absolutely to the entire operation.

Setup time

Setup time + dismantling time + dyn. setup time

Execution times

Setup time + processing time

Actual time (definitions)

Setup time

RPA 7

Processing time

RPA 11

Execution times

Setup time + processing time

Downtime

RPA 1..6, RPA 8..10

Total duration ("Occupancy/assignment time")

Setup time + processing time + downtime time

Activities per calendar week detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration added up per calendar week. The total durations per operation designation are presented in the

lines as totals.

Cost center per calendar week detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration added up per calendar  week. The total durations per cost center are  presented  in  the lines as

totals.

MOC_ControllingGK.docx

Version: 1.1.1362

Page 4 of 5

Overhead Cost Controlling

Cost center per activity detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration  added  up  per  operation  designation.  The  total  durations  per  cost  center  are  presented  in  the

lines as totals.

MOC_ControllingGK.docx

Version: 1.1.1362

Page 5 of 5


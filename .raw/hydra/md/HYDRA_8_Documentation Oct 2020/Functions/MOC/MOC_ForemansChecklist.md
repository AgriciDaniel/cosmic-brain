Foreman's Checklist

1  Foreman’s Checklist

Overview

Menu

Information management  Messages  Foreman's checklist

Transaction code

fmchkl

Function authorization

fmchkl

Purpose

You use the foreman's checklist to monitor the operations produced in the foreman's area:

  The list shows unusual data (e.g. time or quantity deviations)

  The list shows postings that the foreman must authorize.

The  information  displayed  in  the  foreman's  checklist  is  generated  and  saved  in  a  database  table  on  a

daily  basis  (using  an  application  on  the  server  that  is  automatically  started  during  the  night).  The  list

shows information on the last 7 days. The application evaluates the collected information.

Integration

The  data  displayed  here  (e.g.  time,  quantity  deviations)  is  based  on  the  data  collection  performed  via

collection units (e.g. terminals).

Selection criteria

The application provides the following selection criteria:

Order

Selection using the order number. You can use wildcards.

Category

Selection using order categories.

Order type

Selection using order types.

Workplace

The application displays the postings that are made for the workplace number entered.

MOC_ForemansChecklist.docx

Version: 1.6.18656

Page 1 of 6

Responsibility area

The  application  displays  the  postings  that  are  made  for  the  workplaces  that  are  assigned  to  the

Foreman's Checklist

responsibility area entered.

Cost center

The application displays the postings that are made for the workplaces that are assigned to the cost

center entered.

Company

The  application  displays  the  postings  that  are  made  for  the  workplaces  that  are  assigned  to  the

company entered.

Posting

The  following  information  is  logged.  If  you  specify  the  field  Posting,  you  can  narrow  down  the

display to the required posting categories:

(2) Postings with target-actual quantity deviation exceeding +/ - 5%

Finished  operations,  for  which  a  yield  (in  primary  quantity  unit)  is  posted  of  more  than  +/- 5%

compared to the target quantity (in primary quantity unit).

(B) Postings with target-actual time deviation exceeding 10%

Finished operations with an order duration (times that are posted to   11) of more than 10% of the

target processing time. Only operations with a target processing time greater than 0 are used here.

(5) Non-authorized personnel postings

Non-authorized BDE log records for staff (record type "B"). The log records can be authorized using

the application Order-related postings.

Via customization, you can specify for each order type whether these postings are logged.

(6) Non-authorized order postings

Non-authorized  order-related  BDE  log  records  (record  tpe  "U",  "E")  for  overhead  cost  operations.

These log records can also be authorized using the application Order-related postings.

Via customization, you can specify for each order type whether these postings are logged.

(9) Open operations of finished production orders

Operations  of  production  orders  (category  "FA")  that  are  still  active  (prepared,  running  or

interrupted)  and with a last operation already showing a status "finished".

(1) Postings showing scrap without reason

Log-offs  or

interruptions  of  operations  are

displayed  where  the  (only)  scarp  reason  is  999.  Condition:  Scrap  reason  999  and  manual  scrap

postings on the terminal with scrap reason 999 must be configured.

MOC_ForemansChecklist.docx

Version: 1.6.18656

Page 2 of 6

Foreman's Checklist

Show finished messages

If this checkbox is not set, only pending postings are shown. If the checkbox is enabled, completed

and pending postings are shown.

In  general,  only  data  is  output  if  the  user  is  authorized  for  the  relevant  responsibility  area.  If  you  select

operation data, the responsibility area of the machine/workplace is used where the order was produced. If

you show staff data, the responsibility area of the person is used as selection criterion.

Field descriptions

The foreman's checklist shows the postings generated for a day in a table. The table shows information

on  the  posting  and  the  connected  master  data  (workplace,  order,  persons)  that  is  read  from  the  tables

stored.

The totals line shows the number of entries in column "Posting".

Posting category

Posting: see paragraph Selection criteria.

Production date/production time: the data's origin for this value depends on the type of posting:

- Postings of finished operations with target/actual deviation: time of most recent log-off

- Open operations of finished production orders: time of the last posting (for running and interrupted

operations), otherwise empty

- Non-authorized personnel/order postings: Log-off time of the log record

- Postings showing scrap without reason:  Log-off time of the log record

Operation category

Order

Operation

Article (of the operation)

Article designation

OP name

Other category

Workplace

Short name (of the workplace)

Person (personnel number)

Name (first and last name)

Last name

First name

MOC_ForemansChecklist.docx

Version: 1.6.18656

Page 3 of 6

Foreman's Checklist

Personnel data is shown with the following postings:

- Non-authorized personnel postings

-  Non-authorized  order  postings  if  a  staff  badge  number  has  been  entered  with

logoff/interruption.

-  Postings  of  scrap  without  reason  if  a  staff  badge  number  has  been  entered  with

logoff/interruption.

The other postings do not provide any personnel data; the (cumulated) status information

of the operation is used here.

Order category

Evaluation  date  (start  of  the  evaluation  period;  the  start  of  the  evaluation  period  is  calculated  as

follows:  "today"  -  INTERVAL.  If  you  call  the  hy_mst  application  on  the  server,  INTERVAL  can  be

transferred as a parameter. If this parameter is not transferred, 7 is assumed as the default value).

Category (order category)

Order type

Final article (article of the order header)

MRP controller

Order group

Project number

Sequence

Split

First logon (of operation, date/time)

Last posting (for the operation, date/time)

Target quantity: target quantity of the operation (primary quantity unit), only filled if a "target/actual

quantity deviation" is posted.

Actual  quantity:  yield  of  the  operation  (primary  quantity  unit),  only  filled  if  a  "target/actual  quantity

deviation" is posted.

Target duration: target processing time of the operation, only filled if a "target/actual time deviation"

is posted.

Actual  duration:  main  utilization  time  posted  onto  the  operation  (RPA  11),  only  filled  if  a

"target/actual time deviation" is posted.

Workplace category

Designation

Group

Cost center

MOC_ForemansChecklist.docx

Version: 1.6.18656

Page 4 of 6

Foreman's Checklist

Company

Responsibility area

Person category

Company

Cost center

Area

Department

Responsibility area

Signing category

Done

Shows whether or not the entry has already been marked "done" by a user.

Modified by

ID of the user who marked the entry as "done".

Done on

Point in time when the user marked the entry as "done".

Toolbar

Go to category

Order information

Function authorization: orin

Calls the Order information. The order number is transferred as parameter.

 Order overview

Function authorization: orov

Calls the Order overview. The order number is transferred as parameter.

 Workplaces/ machines

Function authorization: wpov

Calls the application Workplaces/machines. The workplace number is transferred as parameter.

MOC_ForemansChecklist.docx

Version: 1.6.18656

Page 5 of 6

Foreman's Checklist

 Order related postings

Function authorization: oboo

Calls  the  application  Order-related  postings.  The  following  values  are  transferred  as  parameters:

Workplace, order, operation, production date.

 Done

Function authorization: fmchkl.sign

Selected postings can be marked "done" by this function (multiple selection is possible).

Processing notes

The  information  listed  in  the  foreman's  checklist  is  generated  and  saved  in  a  database  table  on  a  daily

basis (by an application started on the server automatically overnight). This database table is then used

by the MOC application. The checklist includes information on the last seven days (default setting).

If required, the below-mentioned call parameters can be added to the application hy_mst.exe/.out that is

integrated in the HYDRA Scheduler:

/INTERVAL=days

Increase evaluation period (default: "today“ - 7 days)

/DEL_SIGNED= days

Delete authorized postings after <days> (default: 7 days)

/DEL_UNSIGNED= days

Delete non-authorized postings after <days> (default: 999 days)

/NO_CERT

Non-authorized personnel postings are not integrated in the foreman's checklist.

For this parameter, you can specify via customization which order types

o  personnel postings

o  order postings

must be authorized and are then shown in the foreman's checklist.

MOC_ForemansChecklist.docx

Version: 1.6.18656

Page 6 of 6


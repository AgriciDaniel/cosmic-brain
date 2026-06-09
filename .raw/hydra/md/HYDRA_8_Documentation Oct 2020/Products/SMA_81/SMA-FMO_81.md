Manual

SMA-FMO Production
Monitoring
SMA-FMO 8.1

Version 1.1.23049

Last changed on: 02.09.2020

SMA-FMO Production Monitoring

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-FMO_81.docx

Version: 1.1.23049

Page 2 of 14

SMA-FMO Production Monitoring

Contents

1  SMA-FMO Production Monitoring ................................................................ 4

2  Workplaces/Machines .................................................................................. 5

2.1  General ............................................................................................................... 5

2.2  Functions ............................................................................................................ 7

3  Order Overview .......................................................................................... 10

3.1  General ............................................................................................................. 10

4  Operation overview .................................................................................... 12

4.1  General ............................................................................................................. 12

SMA-FMO_81.docx

Version: 1.1.23049

Page 3 of 14

SMA-FMO Production Monitoring

1  SMA-FMO Production Monitoring

Purpose

The function package SMA-FMO Production Monitoring includes the following components:

  Workplaces / Machines

Tabular  workplace/machine  overview  showing  the  current  machine  status  (status,  time  since

when the status has been active). Display of basic information about the workplace/machine.

o  Machine information

Detailed display of the selected machine, to be activated from the Workplaces / Machines

application  .

  TOP 5 shift malfunctions

  Operations logged on

  Last 10 malfunctions

  Operation overview

In addition, the application provides posting functions for the machine, e.g. change status, log on

operation, etc. if the appropriate package (SMA-AMF) is available.

  Order overview

Tabular order overview showing orders included in the system. Display of order (header)-specific

information such as the article, target quantity, status. Filtering options, e.g. according to status,

article

  Operation overview

The  app  provides  greater  transparency  in  production  and  shows  detailed  information  about  the

individual operations, if they were selected from the list by the user.

SMA-FMO_81.docx

Version: 1.1.23049

Page 4 of 14

SMA-FMO Production Monitoring

2  Workplaces/Machines

2.1  General

App name

Workplaces/Machines

Short name of app

Workplaces

Function authorization

sma.wpov

The  tabular  overview  Workplaces/Machines  visualizes  the  current  machine  status  (status,  point  in  time

since when the status is available) including basic information on the workplace/machine. The application

helps to increase transparency in the shop floor. The user gets a clear overview of the current statuses of

machines and workplaces.

Selection criteria

The application provides the following selection criteria:

Resource

Enter the resource number (workplace number) to select from the workplaces.

Status text

Select the relevant status text to select the status that is displayed.

Field descriptions – List

Image

Shows the picture of the machine stored in the configuration of workplaces and resources.

Note: The picture is loaded when the selection is made. Before selection, a dummy image is shown

for the different machines.

Workplace number - workplace designation

Shows  the  workplace  number  and  workplace  name.  The  system  only  shows  the  workplaces  that

are included in the responsibility area the user is authorized for.

Group

Workplace group of the machine

Status

The  respective  workplace  statuses  are  presented  with  the  following  colors  used  for  the  available

resource performance accounts:

  RPA 1: dark-green

SMA-FMO_81.docx

Version: 1.1.23049

Page 5 of 14

SMA-FMO Production Monitoring

  RPA 2: red

  RPA 3: pink (fuchsia)

  RPA 4: purple

  RPA 5: black

  RPA 6: dark-gray

  RPA 7: light turquoise

  RPA 8: pale blue

  RPA 9: dark blue

  RPA 10: brown

  RPA 11: light green

  RPA 12: turquoise

Field descriptions – Detail

Image

See description "List".

Workplace number - workplace designation

See description "List".

Status

See description "List".

Status text

Defined status text of the current status

Status since

Date when the status was set

Duration so far

Duration of the status (until now)

Expected end

If specified, the estimated end of the current status

Article

Article logged on to the machine

Article name

Name of the article/item logged on to the machine

SMA-FMO_81.docx

Version: 1.1.23049

Page 6 of 14

SMA-FMO Production Monitoring

MES order number

MES order number of the operation currently logged on. If several operations are logged on to the

workplace at the same time, the operation is displayed that was logged on last.

If you click the MES order number, you are redirected to the Operation overview.

OP name

Name of the OP logged on

Company

Company of the workplace

Cost center

Cost center of the workplace.

Group

Workplace group of the workplace

2.2  Functions

Subject to the purchased licenses and the available authorizations, the application Workplaces/Machines

provides the following functions:

 TOP 5 of malfunctions during shift

Shows the ranking list of the TOP 5 downtimes at the machine including information on the duration

and

how

frequently

the  malfunction

occurred

at

the

respective  machine.

It is also possible to show the TOP 5 based on the frequency or total duration.

 Running OPs (Operations logged on)

The list shows all operations logged on to the machine. If you click the operation, you can change

to the Operation overview.

 Last 10 malfunctions

The list shows the 10 malfunctions that last occurred at the machine.

 Change status

Use  this  function  to  change  the  status  of  the  selected  machine.  A  list  of  the  possible  machine

statuses is provided. Select the relevant status.

Note: This function is included in the package SMA-AMF. Function authorization: sma.setstatus

SMA-FMO_81.docx

Version: 1.1.23049

Page 7 of 14

SMA-FMO Production Monitoring

 Operation overview

Click  this  button  to  switch  to  the  Operation  overview  and  to  display  detail  information  on  the

operation, which was displayed in the detail view of the machine.

 Log operation on

Use  the  dialog  Log  operation  on  to  log  an  operation  on  to  the  currently  selected  workplace.

Select the operation (MES order number) and machine status via search dialog from a list.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.logon

 Log operation off

Use  the  dialog  Log  operation  off  to  log  an  operation  off  from  the  currently  selected  workplace.

You can use the logoff dialog to enter the operation number (MES order number), yield and scrap

quantities,  the  relevant  scrap  reason  and  a  new  machine  status.  You  can  use  a  search  dialog  to

select the MES order number, the scrap reason and the machine status from a list.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.logoff

 Interrupt operation

Use  the  dialog  Interrupt  operation  to  interrupt  an  operation  logged  on  to  the  currently  selected

workplace.

You can enter the operation number (MES order number), yield and scrap quantities, the relevant

scrap  reason  and  a  new  machine  status  in  the  dialog.  You  can  use  a  search  dialog  to  select  the

MES order number, the scrap reason and the machine status from a list.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.interrupt

 Posting of part quantity (partial confirmation)

You can use the Partial confirmation dialog to post part quantities for an operation logged on to the

currently selected workplace.

You  can  enter  the  operation  number  (MES  order  number),  yield  and  scrap  quantities  and  the

relevant scrap reason in the dialog. You can use a search dialog to select the MES order number

and the scrap reason.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.partial conf

SMA-FMO_81.docx

Version: 1.1.23049

Page 8 of 14

SMA-FMO Production Monitoring

 Change partitioning

Use  the  Change  partitioning  dialog  to  change  the  current  partitioning  for  the  workplace  currently

selected.

The operation number (MES order number) and the new partitioning can be entered in the dialog.

You can use a search dialog to select the MES order number from the list of operations logged on.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.partition

 Application settings

In this dialog, you can make specific settings for this application.

  Reload machine status:

o  No: The open application is not automatically updated.

o  Cyclic  loading:  If  this  option  is  set,  the  status  of  the  displayed  workplaces/machines  is

cyclically  updated.  The  duration  between  two  updates  is  defined  via  the  option  Reload

time.

o  EMQTT:  The  machine  status  is  promptly  updated  when  the  status  of  the  machine

changes  (via  EMQTT).  Requirement:  You  use  the  centralized  MDE  and  the  relevant

settings are made. If data collection is not performed via centralized MDE for the machine

and  if  the  machine  is  then  not  updated  via  MQTT,  an  update  in  the  application

Workplaces/Machines is also not possible.

  Reload time: The reload time specifies the time between the status updates. You can define a

value between 30 and 300 seconds as reload time.

To  enable  the  settings,  click  Save  after  having  performed  the  changes  and  close  the

application using

.

SMA-FMO_81.docx

Version: 1.1.23049

Page 9 of 14

SMA-FMO Production Monitoring

3  Order Overview

3.1  General

App name

Order overview

Short name of app

order

Function authorization

sma.orov

The tabular Order overview increases transparency in production and shows the orders processed in the

system.  The  overview  provides  detailed  information  for  the  order  header  selected.  When  you  click  the

order, you can directly go to the Operation overview and get detailed information on operations.

When you call the Operation overview from the Order overview, only the operations of the selected order

are displayed. Only running and planned orders are shown, finished orders are not displayed.

Selection criteria

The application provides the following selection criteria:

Order status

Select the order status to narrow down the orders displayed. If you do not select any statuses, only

the  orders  in status  Prepared  are displayed. Change  this selection by filtering.  When a filtering  is

made using one of the available fields, the default selection by status Prepared is discarded.

Order

Order header number

Final article

Article number of the order header

Basic end date

Latest end of the complete order. By default, only the orders are displayed with a latest end before

the current day + 5 days in the future.

Field descriptions – List

Order

Order header and article/item number are displayed together

Article name

Article designation of the header article

SMA-FMO_81.docx

Version: 1.1.23049

Page 10 of 14

SMA-FMO Production Monitoring

Status

Shows the status of the order header

Field descriptions – Detail

Order number

Order header number

If you select the order number, the  Operation overview opens and the operations of the order are

displayed.

Note: You require the function authorization sma.opov to display the Operation overview.

Order status

Shows the current order status including status text

Status since

Date when the status was set

Final article

Article of the order

Article name

Article name of the article.

Sales order

Sales order number of the order header

Customer name/designation

Name of the customer stored in the order header

Dates

Scheduled start, scheduled end, basic start date and basic end date of the complete order including

all operations

Quantities

Target quantities and recorded of the order in the "basic" quantity unit

SMA-FMO_81.docx

Version: 1.1.23049

Page 11 of 14

SMA-FMO Production Monitoring

4  Operation overview

4.1  General

App name

Operation overview

Short name of app

Operations

Function authorization

sma.opov

The tabular Operation overview increases transparency in production and shows detailed information on

the operations selected in the list. This application provides a flexible overview of production and the pool

of orders.

When you call the Operation overview from the Workplace overview, only those operations are displayed

that are logged on to the machine selected in the Workplace overview.

When you call the Operation overview from the Order overview, only the operations of the order are

displayed that was selected in the Order overview.

Selection criteria

The application provides the following selection criteria:

Order

Order header number of the operation

MES order number

Combined order and operation number

Final article

Article/item number of the operation

Operation status

Selection by operation status

Field descriptions – List

MES order number

Shows the combined order and operation number.

OP name

Designation from the OP master data

Status

Shows the status of the operation

SMA-FMO_81.docx

Version: 1.1.23049

Page 12 of 14

SMA-FMO Production Monitoring

Field descriptions – Detail

Order number

Order header number of operation

If  you  select  the  order  number,  the  order  overview  opens  and  the  information  on  the  order  is

displayed.

Note:  To  display  the  Order  overview,  you  require  the  function  authorization  sma.orov  and  the

package with the oder overview (SMA-FMO) must be available.

MES order number

Shows the combined order and operation number.

Status text

Current status text of the operation.

Status since

Date when the status was set

OP name

Designation from the OP master data

Planned workplace

Workplace  where

the  OP

is

logged

on

or  where

the  OP

is

planned.

If you click the workplace, the application  Workplaces/machines opens and the information on the

selected workplace is displayed.

Note:  To  display  the  application  Worplaces/Machines,  you  require  the  function  authorization

sma.wpov and the relevant package (SMA-FMO) must be available.

Article

Operation article

Article name

Article name of the operation

Dates

Scheduled start, scheduled end, earliest start and latest end of the operation

Quantities

Target quantities and quantities collected for the operation in primary quantity unit

Target setup time

Defined target setup time of the operation

Target processing time

Defined target processing time of the operation

SMA-FMO_81.docx

Version: 1.1.23049

Page 13 of 14

Target remaining run time

Defined  target  remaining  run  time  of  the  operation  or  remaining  run  time  calculated  using  the

SMA-FMO Production Monitoring

formula stored.

Occupancy time

Total of occupancy time

Actual execution time

Total of execution times

Downtime

Total downtime

SMA-FMO_81.docx

Version: 1.1.23049

Page 14 of 14


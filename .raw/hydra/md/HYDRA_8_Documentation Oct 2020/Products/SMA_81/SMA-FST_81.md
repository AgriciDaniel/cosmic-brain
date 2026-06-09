Manual

SMA-FST Production Control
SMA-FST 8.1

Version 1.0.23049

Last changed on: 02.09.2020

SMA-FST Production Control

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

SMA-FST_81.docx

Version: 1.0.23049

Page 2 of 10

SMA-FST Production Control

Contents

1  SMA-FST Production Control ....................................................................... 4

2  Setup change list .......................................................................................... 5

2.1  General ............................................................................................................... 5

3  Pool of Orders .............................................................................................. 8

3.1  General ............................................................................................................... 8

SMA-FST_81.docx

Version: 1.0.23049

Page 3 of 10

SMA-FST Production Control

1  SMA-FST Production Control

Purposes

The function package SMA-FST Production Control includes the following components:

  Setup list

Setup  list  showing  the  planned  orders/operations  and  indicating  the  setup  processes  planned

next. Visual differentiation according to tool change, color change and article change. Display of

supporting information e.g. setup time, tool number, article.

  Pool of orders

Tabular  display  of  the  orders/operations  planned  for  a  workplace/machine.  Display  of  selected

information about the operations (e.g. article, target quantity, actual quantity, planned dates).

SMA-FST_81.docx

Version: 1.0.23049

Page 4 of 10

SMA-FST Production Control

2  Setup change list

2.1  General

App name

Setup change list

App name mini

Setup list

Function authorization

sma.setli

The  setup  change  list  provides  the  user  with  an  overview  of  the  machines  to  be  set  up  next.  The

operations listed which are planned in next. Setups, due to material, tool or color changes, are marked to

improve your overview.

In  addition,  the  setup  change  list  has  been  designed  as  preview  for  (subsequent)  shifts,  which  enables

the responsible persons in the shift to know which machines have to be set up next.

Selection Criteria

The application provides the following selection criteria:

Resource

Resource used for maintenance.

Date from ... to ...

Date range when the maintenance should be carried out.  The period is stored in default which is

today's date plus 5 days.

Field description - List

MES order number

Combined order and operation number

OP name

Stored name of the operation

Icon for setup change

Display of required action using a symbol

Status

Current OP status

SMA-FST_81.docx

Version: 1.0.23049

Page 5 of 10

SMA-FST Production Control

Field descriptions - detail

Order

Order header number of the operation

Status

Current OP status

OP name

Stored name of the operation

Workplace

Shows the workplace where the OP is currently planned for OPs that are not running (status U or

V).  For  running  OPs,  the  workplace  is  displayed  where  the  OP  is  currently  logged  on.

Click  on  workplace  and  the  application  workplace/machine  opens.  The  system  displays  the

information

regarding

the

workplace.

Note:  Function right sma.wpov is required to display the application "workplace/machine" and the

relevant package (SMA-FMO) must be available.

Article

Article

of

the

operation

Click on the article and the application "operation overview" opens. The system displays information

regarding

the

operation.

Note:  Function right sma.wpov is required to  display the application "operation  overview" and the

relevant package (SMA-FMO) must be available.

Article name

Name of the article to be produced

M/O rel. setup

Machine/operator relation for setup; the value is taken from the operation.

Setup change

In order to set the value into the column "change" the operations next (planned dates) to that one

are considered. If the value changes in the field "tool", then this value is entered.  (Priority 1) If the

value changes in the field "color", then the value "color" is entered. (Priority 2) If the value changed

in the field "article", then the value "article" is entered in the column "change".  (Prio 3)

Tool

DNC

The value is taken from the operation.

The value is taken from the operation.

Material

The value is taken from the operation.

SMA-FST_81.docx

Version: 1.0.23049

Page 6 of 10

SMA-FST Production Control

Color

The value is taken from the operation.

Person OK

The value is taken from the operation.

Tool OK

The value is taken from the operation.

Material OK

The value is taken from the operation.

Target setup time

Total of the planned values "setup time" and "additional setup time" at the operation.

Target processing time

Planned processing time is stored in the operation.

RRT according to formula

Currently calculated RRT of an operation using the stored formula

Planned start

Planned setup date; corresponds to the planned start date of the operation.

Planned end

Planned end date for the operation

SMA-FST_81.docx

Version: 1.0.23049

Page 7 of 10

SMA-FST Production Control

3  Pool of Orders

3.1  General

App name

Pool of orders

App name Mini

Pool of orders

Function authorization

sma.poo

The tabular overview of the pool of orders provides transparency in production and shows detailed

information on the individual operations, if they were selected from the list by the user. The application

therefore offers a mobile overview of production and the pool of orders.

In the first step, filtering the pool of orders is offered when you open the application.

Selection criteria

The following selection criteria are available in the application:

Order

Order header number of the operation

MES order number

Combined order and operation number.

Final product

Article number of the operation

Operation status

Selection according to operation status

Field descriptions - list

MES order number

Shows the combined order and operation number.

OP designation

Name/description from the master data of the operation

Status

Shows the status of the operation

SMA-FST_81.docx

Version: 1.0.23049

Page 8 of 10

SMA-FST Production Control

Field descriptions - detail

Order number

Order header number of the operation

By clicking the order number, the order overview is opened and the information related to the order

is displayed.

Please  note:  In  order  to  display  the  order  overview,  you  require  the  function  authorization

sma.orov, and the package with the order overview (SMA-FMO) must be available.

MES order number

Shows the combined order and operation number.

Status text

Current status text of the operation

Status since

Time when the status was set

OP designation

Name/description from the master data of the operation

Planned workplace

Workplace on which the operation was planned

By clicking the workplace, the application "Workplaces / Machines" is opened and the information

related to the indicated workplace is displayed.

Please note: In order to display the application "Workplaces / Machines"  you require the function

authorization sma.wpov, and the relevant package (SMA-FMO) must be available.

Article

Article of the operation

Article designation

Article name of the operation

Dates

Scheduled start time, scheduled end time, earliest start and latest end of the operation

Quantities

Target quantities and recorded quantities of the operation in the quantity unit "Primary"

Target setup time

Defined target setup time of the operation

Target processing time

Defined target processing time of the operation

SMA-FST_81.docx

Version: 1.0.23049

Page 9 of 10

Target remaining runtime

Defined  and/or  calculated  target  remaining  runtime  of  the  operation  on  the  basis  of  the  entered

SMA-FST Production Control

formula.

Occupancy time

Total occupancy (allocation) time

Execution time

Total execution time

Downtime

Total downtime

SMA-FST_81.docx

Version: 1.0.23049

Page 10 of 10


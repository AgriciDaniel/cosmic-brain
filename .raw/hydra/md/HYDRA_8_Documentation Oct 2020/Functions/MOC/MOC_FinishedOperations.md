Finished Operations

1  Finished Operations

Overview

HYDRA menu

Order Management  Production reports  Finished operations

FEDRA menu

Detailed Scheduling  Evaluations  Finished operations

Transaction code

fop

Function authorization

fop

Available user fields

Where?

Table

Table

Purpose

Object type/user field key

Source (type)

AUNR/SYSTEM

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

The application Finished operations provides a clearly categorized selection of finished operations to the

shift manager, supervisor or foreman.

Integration

The application shows the operations that have been selected in the selection panel.

All  operations  are  displayed  that  have  the  control  indicators  "E"  (finished"),  "A"  (archived)  and  "D"

(logically deleted).

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the operation. The application shows all

operations assigned to the selected workplaces. You can also use wildcards.

Group from … to …

This  selection  criterion  refers  to  the  group  that  is  defined  for  the  operation.  The  application

shows all operations assigned to the selected group. You can also use wildcards.

Planned for

Use  this  option  to  only  show  operations  that  have  initially  been  planned  for  a  workplace  or  a

group.

MOC_FinishedOperations.docx

Version: 1.10.23536

Page 1 of 8

Finished Operations

Order

Article

This selection criterion refers to the order number. The application only shows operations  with

the specified order number. You can also use wildcards.

This  selection  criterion  refers  to  the  article  of  the  operation.  The  application  displays  all

operations that are assigned to the specified article. You can also use wildcards.

Article designation

This selection criterion refers to the article of the operation. The application displays all operations

that match the specified article name. You can also use wildcard characters.

Operation status

Current operation status.

Note:

The  selection  list  shows  ALL  configured  operation  statuses;  even  those  statuses  that  are  not

relevant for this application.

Predecessor status

Status of the preceding operation.

Control

Current control indicator of the operation.

Note:

The  selection  list  shows  ALL  configured  control  indicators;  even  those  indicators  that  are  not

relevant for this application.

Category

This selection criterion refers to the category of the operation's order type. The application only

displays operations with an order type of the specified category.

Order type

This  selection  criterion  refers  to  the  order  type  of  the  operation.  The  application  only  shows

operations with the selected order type.

Processing code

This  selection  criterion  refers  to  the  processing  code  of  the  operation.  The  application  only

shows operations with the selected processing code. You can also use wildcards.

Priority

This  selection  criterion  refers  to  the  priority  of  the  operation.  The  application  only  shows

operations with the selected priority.

MOC_FinishedOperations.docx

Version: 1.10.23536

Page 2 of 8

Finished Operations

OP

Tool

This  selection  criterion  refers  to  the  operation  number.  The  application  only  shows  the

operations with the specified operation number. You can also use wildcards.

This  selection  criterion  refers  to  the  tool  defined  for  the  operation.  The  application  shows  all

operations that are assigned to the specified tool. You can also use wildcards.

Show split OPs

If you enable this checkbox, the application also shows split operations.

Customer name/designation

This  selection  criterion  refers  to  the  customer  name  stored  in  the  operation.  The  application

shows all orders with the selected customer name (designation).

Cost center

This  selection  criterion  refers  to  the  cost  center  of  the  workplace  stored  in  the  operation.  All

operations assigned to the selected cost center are displayed. You can also use wildcards.

Planned start ... to ...

This selection criterion refers to the planned start date defined for the operation. The application

only shows the operations whose planned start date is included in the selected period.

Scheduled start time ... to ...

This selection criterion refers to the scheduled start date of the operation. The application only

shows the operations whose scheduled start date is included in the selected period.

Earliest start ... to ...

This  selection  criterion  refers  to  the  earliest  start  date  of  the  operation.  The  application  only

shows the operations whose earliest start date is included in the selected period.

Latest end ... to ...

This selection criterion refers to the latest end date of the operation. The system only displays

the operations whose latest end date is included in the selected period.

Actual start ... to ...

This  selection  criterion  refers  to  the  start  date  of  the  operation.  The  system  only  displays  the

operations whose start date is included in the selected period.

Actual end ... to ...

This  selection  criterion  refers  to  the  end  date  of  the  operation.  The  system  only  displays  the

operations whose end date is included in the selected period.

Use the MOC application "Order overview" to select operations using the actual dates

of the order, i.e. the order start or order end.

MOC_FinishedOperations.docx

Version: 1.10.23536

Page 3 of 8

Finished Operations

Basic date start ... to ...

This selection criterion refers to the basic start date of the order. The application only displays

the operations whose basic start date of the order is included in the selected period.

Basic date end ... to ...

This selection criterion refers to the basic end  date of the order. The application only  displays

the operations whose basic end date of the order is included in the selected period.

Sales order

This  selection  criterion  refers  to  the  sales  order  defined  in  the  order  header.  The  application

shows all operations that are assigned to the selected sales order.

Order index ... to ...

This  selection  criterion  refers  to  the  order  index  defined  in  the  order  header.  The  application

displays all operations whose order index of the order header matches the selected order index.

Planned order

This  selection  criterion  refers  to  the  planned  SAP  order  number  that  is  defined  in  the  order

header.

Project number

This selection criterion refers to the project number of the operation. The application displays all

orders that are assigned to the selected project number.

Order group

This selection criterion refers to the order group of the order header. The application displays all

operations whose order group of the order header matches the selected order group. You can

also use wildcards.

MRP controller

This selection criterion refers to the MRP controller defined in the order header. The application

shows  all  operations  whose  MRP  controller  of  the  order  header  matches  the  entered  MRP

controller. You can also use wildcards.

MOP

Use this option to only show merged operations.You can also use wildcards.

Show MOP

Use this option to specify the merged operations to be displayed.

By default, the application shows merged operations and individual operations. The application

does not show the operations that are summarized in an MOP.

MOC_FinishedOperations.docx

Version: 1.10.23536

Page 4 of 8

Finished Operations

Check responsibility area

The user can only use this option if the respective license and function authorization "filterProdInd"

is  available  and  if  the  function  authorization  "chkresp"  is  enabled.  Using  this  option,  the  user  can

specify if the system checks the responsibility area of the workplace or the responsibility area of the

object operation/order to display data.

This selection option is only available, if you enable the extension fop2.

By default, this application checks the responsibility area of the workplace that is stored for the

operation.

Detail application: Finished Operations

The detail application provides the following fields:

Status category

Status

The status column shows the bitmap (“LED”) defined in the status configuration.

The totals line of this column displays the number of operations.

Status text

The current operation status specifies the status text.

Status since

Specifies the date and time since when the status has been set.

Predecessor status

Status  of  the  preceding  operation.  This  status  specifies  whether  the  preceding  operation  has

already  been  started.  This  is  important  if  you  want  to  know  if  material  needed  for  the  current

operation has already been processed or produced.

Secondary status

Displays the currently set secondary status.

Optionally, you can configure and use secondary statuses while customizing the system.

If  an  X  is  displayed  here  it  is  an  operation  of  an  order  that  has  been  completed  technically  in

SAP.

Order category

Displays specific data for the operations and orders.

Relevant fields are:

MOC_FinishedOperations.docx

Version: 1.10.23536

Page 5 of 8

Order type

Displays the order type as text and symbol.

The  glossary  describes  the  standard  order  types.  You  can  define  further  order  types  as  part  of  a

Finished Operations

customization.

Order

Shows the order number.

Sequence

Order sequence (only relevant if sequences are used).

OP

Split

Shows the operation number.

Shows the split number if the operation is a split operation.

Current number of splits

Shows the number of splits of an operation if the operation has been split.

Note

Shows the short text of the first note of an operation.

Printed

This column shows whether the time ticket has already been printed.

Specifications for production category

Specifications for production with respect to the machine, tool, DNC, material for the Operation.

Target times category

This category displays the target time specifications for the Operation.

Additional, calculated fields:

Total setup time

Sum total of setup time, additional setup time and retooling/teardown time.

Target execution time

Total of setup time plus processing time.

Processing category

Default target specifications for the production of the Operation

Primary quantity/secondary quantity/tertiary quantity category

Target quantity

Quantity specifications for the Operation.

MOC_FinishedOperations.docx

Version: 1.10.23536

Page 6 of 8

Finished Operations

Yield

The yield column shows the yield entered via the terminal or client.

Scrap

The scrap column shows the scrap entered via the terminal or client.

Rework

Quantity to be reworked.

Problem quantity

The problem quantity is another quantity account.

Unit

Quantity unit of the values displayed.

The quantities listed here are displayed as base, primary, secondary and tertiary quantities.  In

general,  you  should  only  show  one  of  these  quantity  types.  The  terminal  collects  quantities  in

the primary quantity.

OP dates category

This category provides date specifications for the Operation.

Actual times category

Actual times currently collected for the operation.

Key performance indicators category

The formulas used to calculate the values are described here.

Lock category

Lock

This option specifies if the operation is locked.

If an operation is locked, you cannot log this operation on and it is not displayed in the sequencing

list on the terminal.

Locked by and on

Specifies the time and the user who last locked the operation.

Unlocked by and on

Specifies the time and the user who last unlocked the operation.

MOC_FinishedOperations.docx

Version: 1.10.23536

Page 7 of 8

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

Finished Operations

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

MOC_FinishedOperations.docx

Version: 1.10.23536

Page 8 of 8


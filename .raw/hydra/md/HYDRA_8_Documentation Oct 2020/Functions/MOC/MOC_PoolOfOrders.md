Pool of Orders

1  Pool of Orders

Overview

HYDRA menu

Production control  Production support  Pool of orders

FEDRA menu

Detailed Scheduling  Current  Pool of orders

Transaction code

plop

Function authorization

plop

Available user fields

Where

Table

Table

Purpose

Object type/user field key

Source (type)

AUNR/SYSTEM

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

The Pool of orders application is the most important dialog for foremen and supervisors.

The  Pool  of  orders  provides  a  selection  of  operations  that  is  clearly  sorted  by  categories.  These

operations are included in the pool of a machine or group.

Integration

The pool of orders shows all operations that match the specified selections.

Generally,  only  unplanned  and  planned  operations  are  displayed  in  the  pool  of  orders.  The  system

identifies these operations via the control indicators V, U or S. The operations usually have the operation

status "prepared", "interrupted" or "not free" (depending on the project).

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion specifies the workplace stored for the operation. All operations assigned

to the selected workplaces are displayed. You can also use wildcards.

Group from … to …

This selection criterion refers to the group that is defined for the operation. The system displays

all operations  that are assigned to the selected group. It  does  not matter if the  operations are

already scheduled for a workplace or not. You can also use wildcards.

MOC_PoolOfOrders.docx

Version: 2.3.23566

Page 1 of 8

Pool of Orders

Planned for

You can use this option to specify if only operations are selected that have been scheduled for a

workplace or operations that are still in the pool of groups.

The column "planned for" shows whether the operation is planned





for a group (pool of groups) or

for a workplace (pool of workplaces).

Order

Article

This  selection  criterion  refers  to  the  order  number.  Only  operations  with  the  specified  order

number are displayed. You can also use wildcards.

This  selection  criterion  refers  to  the  article  of  the  operation.  The  application  displays  all

operations having assigned the specified article. You can also use wildcards.

Article name/designation

This  selection  criterion  refers  to  the  article  of  the  operation.  The  application  displays  all

operations that match the specified article designation. You can also use wildcards.

Operation status

Operation status.

Notes:

-  The  selection  list  shows  ALL  configured  workplace  statuses.  Also  statuses  that  are  not

relevant for this application are displayed.

-  The  system  can  only  display  the  operations  with  the  selected  operation  status  that  are  also

included in the selection of the control.

Predecessor status

Status of the preceding operation.

Control

Control indicator of the current operation status.

Notes:

- The selection list shows ALL configured control indicators. Also control indicators that are not

relevant for this application are displayed.

- By default, the values Prepared, Interrupted and None (short V, U, S) are preassigned in the

selection panel.

Category

This selection criterion refers to the category of the operation's order type. The application only

displays operations that match the specified category of order types.

MOC_PoolOfOrders.docx

Version: 2.3.23566

Page 2 of 8

Pool of Orders

Order type

This selection criterion refers to the order type of the operation. Only operations assigned to the

selected  order  type  are  displayed.  The  selection  list  displays  ALL  configured  order  types  with

the respective order type name.

Processing code

This selection criterion refers to the processing code of the operation. Only operations with the

selected processing code are displayed. You can also use wildcards.

Priority

OP

Tool

This selection criterion refers to the priority of the operation. Only operations with the selected

priority are displayed.

This  selection  criterion  refers  to  the  operation  number.  Only  operations  with  the  specified

operation number are displayed. You can also use wildcards.

This selection criterion refers to the tool used for the operation. All operations with the specified

tool are displayed. You can also use wildcards.

Show split OPs

If this option is enabled, split operations are additionally displayed.

Customer name

This  selection  criterion  refers  to  the  customer  designation  stored  for  the  operation.  The

application shows all orders with the selected customer name (designation).

Cost center

This selection criterion refers to the cost center of the workplace defined for the operation. The

system displays all operations assigned to workplaces of the selected cost center. You can also

use wildcards.

Planned start ... to ...

This  selection  criterion  refers  to  the  planned  start  date  defined  for  the  operation.  The  system

only displays operations with a planned start on or between the specified date(s).

Scheduled start time ... to ...

This  selection  criterion  refers  to  the  scheduled  start  date  of  the  operation.  The  system  only

displays operations with a scheduled start date on or between the specified date(s).

Earliest start ... to ...

This selection criterion refers to the earliest start date of the operation. The system only displays

operations with an earliest start on or between the specified date (s).

MOC_PoolOfOrders.docx

Version: 2.3.23566

Page 3 of 8

Pool of Orders

Latest end ... to ...

This selection criterion refers to the latest end date of the operation. The system only displays

operations with a latest end on or between the specified date(s).

Actual start ... to ...

This  selection  criterion  refers  to  the  start  date  of  the  operation.  The  system  only  displays

operations with a start date on or between the specified date(s).

Actual end ... to ...

This  selection  criterion  refers  to  the  end  date  of  the  operation.  The  system  only  displays

operations with an end date on or between the specified date(s).

Use  the  MOC  application  "Order  overview"  to  select  the  operations  using  the  actual

dates of the order – order start or order end.

Basic date start ... to ...

This  selection  criterion  refers  to  the  basic  start  date  of  the  order.  The  system  only  displays

operations with a basic start date on or between the specified date(s).

Basic date end ... to ...

This  selection  criterion  refers  to  the  basic  end  date  of  the  order.  The  system  only  displays

operations with a basic end date on or between the specified date(s).

Sales order

This  selection  criterion  refers  to  the  sales  order  defined  in  the  order  header.  All  operations

assigned to the selected sales order are displayed.

Order index ... to ...

This  selection  criterion  refers  to  the  order  index  defined  in  the  order  header.  The  system

displays all operations with the specified order index in the order header.

Planned order

This selection criterion refers to the planned order number from SAP that is defined in the order

header.

Project number

This  selection  criterion  refers  to  the  project  number  of  the  operation.  The  system  displays  all

orders with the specified project number.

Order group

This  selection  criterion  refers  to  the  order  group  of  the  order  header.  The  system  displays  all

operations with the specified order index in the order header. You can also use wildcards.

MOC_PoolOfOrders.docx

Version: 2.3.23566

Page 4 of 8

MRP controller

This  selection  criterion  refers  to  the  MRP  controller  defined  in  the  order  header.  The  system

displays all operations with the specified MRP controller in the order header. You can also use

Pool of Orders

wildcards.

MOP

Restriction to a merged operation.

You can also use wildcards.

Show MOP

Defines the Merged operations to be displayed.

By  default,  the  system  displays  merged  operations  and  individual  operations;  operations  that

are summarized in a MOP are not displayed.

Check responsibility area

The user can only use this option if the respective license and function authorization "filterProdInd"

is  available  and  if  the  function  authorization  "chkresp"  is  enabled.  With  this  selection  option,  the

user can specify if data is displayed using the responsibility area of the workplace or of the object

operation/order.

This selection option is only available, if you enable the extension plop2.

By default, this application checks the responsibility area of the workplace in case of scheduled

operations.

"Pool of orders" detail application

The detail application provides the following fields:

Status category

Status

Shows the respective bitmap (“LED”) defined in the status configuration.

The totals line displays the number of operations in this column.

Status text

The current operation status specifies the status text.

Status since

Specifies date and time when the respective status has been set.

MOC_PoolOfOrders.docx

Version: 2.3.23566

Page 5 of 8

Pool of Orders

Predecessor status

Status  of  the  preceding  operation.  This  status  specifies  whether  the  preceding  operation  has

already been started. This is important if you want to know if material has already been processed

or produced that you need for the current operation.

Secondary status

Displays the currently set secondary status.

The use of the secondary status requires a respective Configuration.

"Order" category

This category displays specific data for operations and orders. Relevant fields are:

Order type

Displays the order type as text and symbol.

The  order  types of the HYDRA standard  are  described  in the glossary.  You can  configure further

order types.

Order

Specifies the number of the respective order.

Sequence

Order sequence (only relevant if sequences are used)

OP

Split

Specifies the number of the respective operation

Specifies the split number if the operation is a split operation.

Current number of splits

Number of splits of an operation if the operation has been split.

Note

Short text of the first note of an operation.

Printed

This column shows whether the respective time ticket has already been printed.

Specifications for production category

The relevant fields of this category are as follows:

Planned workplace

Workplace where the operation is planned.

MOC_PoolOfOrders.docx

Version: 2.3.23566

Page 6 of 8

Pool of Orders

Planned for

The "planned" column shows whether the operation is planned

G

M

Group

for a group (pool of groups) or

for a workplace (pool of workplaces).

Group for which the operation is planned.

"OP dates" category

This category provides date specifications for the operation.

"Remaining run time" category

Remaining run time

This  column  specifies  the  remaining  production  time.  The  system  calculates  this  value  using  a

formula based on different parameters. The formula used is stored for the operation.

"Target times" category

This category displays the target time specifications for the operation

Additional calculated fields:

Total setup time

Sum total of setup time, additional setup time and retooling/teardown time.

Target execution time

Sum total of setup time (total) plus processing time.

Primary quantity/secondary quantity/tertiary quantity category

Target quantity

Quantity specifications for the operation.

Yield

Yield posted for the operation.

Scrap

Scrap posted for the operation.

Rework

Quantity posted for the operation that must be reworked.

Problem quantity

Problem quantity posted for the operation.

Unit

Quantity unit of the values displayed.

MOC_PoolOfOrders.docx

Version: 2.3.23566

Page 7 of 8

Pool of Orders

The quantities listed here are displayed as base, primary, secondary and tertiary quantities. It is

usually best to show only one of the quantity types.  The terminal collects quantities in  primary

quantity.

Toolbar

 Generate merged operation (function authorization: op.colopcreate)

Function Generate merged operation

Selected operations are combined to form a merged operation. Instead of the different single

operations, the merged operation is logged on to the terminal and displayed on the terminal.

 Cancel merged operation (function authorization: op.coloprelease)

Function Cancel merged operation

The merged operation is undone and the separate operations are generated.

 Order information (function authorization: orin)

This button calls the application Order information.

 Order overview (function authorization: orov)

This button calls the application Order overview.

 Schedule controlling: save baseline plan (function authorization: esvb)

Function Schedule controlling: save baseline plan

 Shop floor paper (function authorization: repsfpap)

Function Print shop floor papers

 Time ticket (function authorization: reptimet)

Function Print time tickets

MOC_PoolOfOrders.docx

Version: 2.3.23566

Page 8 of 8


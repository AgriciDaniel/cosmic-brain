Operations Logged on

1  Operations Logged on

Overview

HYDRA menu

Production control  Production overview  Running operations (operations
logged on)

FEDRA menu

Detailed Scheduling  Current  Operations logged on

Transaction code

rop

Function authorization

rop

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

The function Operations logged on shows the currently running and automatically interrupted (by change

of shifts) operations (with the control indicators L, F).

Please note that you have to set the option "Show the operations logged on for each workplace"

if you want the application to show the logged on operations (status "running) for each workplace.

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the operation. The application shows all

operations assigned to the selected workplaces. You can also use wildcards.

For  operations  that  are  logged  on,  this  does  not  refer  to  the  workplace  where  the

operation  is  currently  logged  on.  The  application  shows  the  workplace  where  the

operation is planned.

Group from … to …

This selection criterion refers to the group that is defined for the operation. The application shows

all operations assigned to the selected group. You can also use wildcards.

MOC_RunningOperations.docx

Version: 1.11

Page 1 of 9

Operations Logged on

For  operations  that  are  logged  on,  this  does  not  refer  to  the  group  of  the  workplace

where the operation is currently logged on. The application shows the group where the

operation is planned.

Planned for

Use this option to only show operations that have initially been planned for a workplace or a group.

Order

Article

This selection criterion refers to the order number. The application only shows operations with the

specified order number. You can also use wildcards.

This selection criterion refers to the article of the operation. The application displays all operations

that are assigned to the specified article. You can also use wildcards.

Article designation

This  selection  criterion  refers  to  the  article  name  (designation)  defined  in  the  operation.  The

application displays all operations that match the specified article name. You can also use wildcard

characters.

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

MOC_RunningOperations.docx

Version: 1.11

Page 2 of 9

Processing code

This selection criterion refers to the processing code of the operation. The application only shows

operations with the selected processing code. You can also use wildcards.

Operations Logged on

Priority

OP

Tool

This  selection  criterion  refers  to  the  priority  of  the  operation.  The  application  only  shows

operations with the selected priority.

This selection criterion refers to the operation number. The application only shows the operations

with the specified operation number. You can also use wildcards.

This  selection  criterion  refers  to  the  tool  defined  for  the  operation.  The  application  shows  all

operations that are assigned to the specified tool. You can also use wildcards.

Show split OPs

If you enable this checkbox, the application also shows split operations.

Customer name

This selection criterion refers to the customer name (designation) defined in the operation. The

application shows all orders with the selected customer name (designation).

Cost center

This selection criterion refers to the cost center of the workplace defined for the operation. The

application shows all operations assigned to the selected cost center. You can also use wildcards.

Planned start ... to ...

This selection criterion refers to the planned start date defined for the operation. The application

only shows the operations whose planned start date is included in the selected period.

Scheduled start time ... to ...

This selection criterion refers to the scheduled start date of the operation. The application only

shows the operations whose scheduled start date is included in the selected period.

Earliest start ... to ...

This selection criterion refers to the earliest start date of the operation. The application only shows

the operations whose earliest start date is included in the selected period.

Latest end ... to ...

This selection criterion refers to the latest end date of the operation. The system only displays the

operations whose latest end date is included in the selected period.

Actual start ... to ...

This  selection  criterion  refers  to  the  start  date  of  the  operation.  The  system  only  displays  the

operations whose start date is included in the selected period.

MOC_RunningOperations.docx

Version: 1.11

Page 3 of 9

Operations Logged on

Actual end ... to ...

This  selection  criterion  refers  to  the  end  date  of  the  operation.  The  system  only  displays  the

operations whose end date is included in the selected period.

Use the MOC application "Order overview" to select operations using the actual dates

of the order, i.e. the order start or order end.

Basic date start ... to ...

This selection criterion refers to the basic start date of the order. The application only displays the

operations whose basic start date of the order is included in the selected period.

Basic date end ... to ...

This selection criterion refers to the basic end date of the order. The application only displays the

operations whose basic end date of the order is included in the selected period.

Sales order

This selection criterion refers to the sales order defined in the order header. The application shows

all operations that are assigned to the selected sales order.

Order index ... to ...

This  selection  criterion  refers  to  the  order  index  defined  in  the  order  header.  The  application

displays all operations whose order index of the order header matches the selected order index.

Planned order

This selection criterion refers to the planned SAP order number that is defined in the order header.

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

Use this option to only show merged operations.

You can also use wildcards.

MOC_RunningOperations.docx

Version: 1.11

Page 4 of 9

Operations Logged on

Show MOP

Use this option to specify the merged operations to be displayed.

By default, the application shows merged operations and individual operations. The application

does not show the operations that are summarized in an MOP.

Show the operations logged on for each workplace

If you check this option, the application shows an operation multiple times if this OP is simultaneously

logged on to multiple workplaces.

The category "logged on to workplace" (hidden by default) shows information about the workplace

where the operation is logged on.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the function authorization chkresp.

This selection option is only available, if you enable the extension rop2.

For planned operations, this application checks the responsibility area of the workplace where the

OPs are planned.

Operations logged on detail application

The  table  shows  the  below-mentioned  fields,  among  other  things.  For  further  information  refer  to  the

following documents

  Existing order data

  Current data and KPIs of the operation

Status category

Status

The status column shows the bitmap (“LED”) defined in the status configuration.

The totals line of this column displays the number of operations.

Status text

The current operation status specifies the status text.

Status since

Specifies the date and time since when the status has been set.

MOC_RunningOperations.docx

Version: 1.11

Page 5 of 9

Operations Logged on

Predecessor status

Status of the preceding operation. This status specifies whether the preceding operation has already

been started. This is important if you want to know if material needed for the current operation has

already been processed or produced.

Secondary status

Displays the currently set secondary status.

Optionally, you can configure and use secondary statuses while customizing HYDRA.

.

Order category

Displays specific data for the Operations and Orders.

Relevant fields are:

Order type

Displays the order type as text and symbol.

The glossary describes the standard  order types. Further order types can  be defined as part of a

system customization.

Category

The category summarizes similar order types. The following categories are available in the system:

FA = production order

PJ = project order

PM = maintenance order

KP = capacity order

GK = overhead order

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

MOC_RunningOperations.docx

Version: 1.11

Page 6 of 9

Operations Logged on

Note

Shows the short text of the first note of an operation.

Printed

This column shows whether the time ticket has already been printed.

Specifications for production category

The relevant fields are:

Planned workplace

Workplace where the operation is planned.

Planned for

The "planned for" column shows whether the operation is planned

G

M

Group

for a group (pool of groups) or

for a workplace (pool of workplaces).

Group where the operation is planned.

OP dates category

This category provides date specifications for the Operation.

Remaining run time category

remaining run time

Shows  the  remaining  production  time.  The  system  uses  a  formula  and  different  parameters  to

calculate this value. The formula is stored with the operation.

Target times category

This category displays the target time specifications for the Operation.

Additional, calculated fields:

Total setup time

Sum total of setup time, additional setup time and retooling/teardown time.

Target execution time

Total of setup time plus processing time.

Primary quantity/secondary quantity/tertiary quantity category

Target quantity

Quantity specifications for the Operation.

Yield

The yield column shows the yield entered via the terminal or MOC.

MOC_RunningOperations.docx

Version: 1.11

Page 7 of 9

Operations Logged on

Scrap

The scrap column shows the scrap entered via the terminal or MOC.

Rework

Quantity to be reworked.

Problem quantity

The problem quantity is another quantity account.

Unit

Quantity unit of the values displayed.

The quantities listed here are displayed as base, primary, secondary and tertiary quantities. In

general, you should only show one of these quantity types. The terminal collects quantities in the

primary quantity.

Postings category

First logon

Shows the date and time when the operation was logged on for the first time.

Last logoff

Shows the date and time when the operation was logged off the last time. This kind of information is

useful if an operation was reactivated.

Date of last posting

Date of the last posting made for this operation.

Time of last posting

Time of the last posting made for this operation.

Logged on to workplace category

The below-mentioned fields pertaining to this category are only completed, if you set the option

"Show the operations logged on for each workplace".

Workplace

Workplace where the operation is currently logged on.

Short name

Short name of the workplace.

Name

Name/description of the workplace.

MOC_RunningOperations.docx

Version: 1.11

Page 8 of 9

Operations Logged on

Group

Group of the workplace.

Cost center

Cost center of the workplace.

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

MOC_RunningOperations.docx

Version: 1.11

Page 9 of 9


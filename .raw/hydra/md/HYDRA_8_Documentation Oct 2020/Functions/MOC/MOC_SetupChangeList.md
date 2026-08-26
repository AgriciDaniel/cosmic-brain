Setup Change List

1  Setup Change List

Overview

HYDRA menu

Production control --> Planning aid --> Setup change list

FEDRA menu

Detailed Scheduling  Planning  Setup change list

Transaction code

setli

Function authorization

setli

Available user fields

Where?

Object type/user field key

Source (type)

Setup change list table

AGNR/SYSTEM

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The setup change list provides the user with an overview of the machines to be set up next. The operations

listed which are planned in next. Setups, due to material, tool or color changes, are marked to improve your

overview.

In addition, the setup change list has been designed as preview for (subsequent) shifts, which enables the

responsible persons in the shift to know which machines have to be set up next.

Requirements

Operations have to be planned exactly with respect to dates to be able to determine setup changes.

Selection criteria

The application provides the following selection criteria:

Date ... until

Shows all planned setup changes (planned operations) that coincide with the selected date range.

The option "consider job end" option (see below) specifies which operations are exactly to be taken

into account.

Cost center

Shows the setup changes that are planned on workplaces assigned to the selected cost center.

Workplace

Shows the setup changes that are planned on the selected workplaces.

MOC_SetupChangeList.docx

Version: 1.7

Page 1 of 5

Setup Change List

Group

Shows the setup changes that are planned on the workplaces of the selected groups.

Order category

Shows the setup changes that are planned for orders of the selected order category.

Consider job end

Generally,  only  planned  operations  assigned  to  the  control  indicators  L,  S,  V  or  U  are  taken  into

account. Subject to the "consider job end" option, the result list and, as a result the table, shows the

following operations:

  The "consider job end" option is set: operations the start of which is prior to the selection period

and the planned end of which coincides with the selection period are displayed. This applies to

planned as well as running operations.

  The "consider job end" option is set: the below-mentioned operations are considered in addition

to operations the planned start of which coincides with the selection period: - operations the start

of which is prior to the selection period and the planned end of which coincides with the selection

period

- operations the start of which is prior to the selection period and with the planned end after the

selection period. This applies to planned operations (control indicators S, V, U) as well as running

operations (control indicator L).

It can be reasonable NOT to check the "consider job end" option, provided that setup change lists

are to be printed for each shift in advance.

Field descriptions

In general, if selected by workplace, group and cost center, only operations are selected that are actually

planned  on  a  workplace.  Operations  that  are  in  the  pool  of  groups  are  not  selected.  In  addition,  only

operations  are  selected  that  are  planned  on  workplaces  for  the  responsibility  area  of  which  the  user  is

authorized.

Remarks on selected columns

Workplace

Shows the workplace where the OP is currently planned for OPs that are not running (status U or V).

For running OPs, the workplace is displayed where the OP is currently logged on.

MOC_SetupChangeList.docx

Version: 1.7

Page 2 of 5

Setup Change List

Group

Group to which the workplace is assigned.

Cost center

Cost center to which the workplace is assigned.

Status

Current operation status. Shows the colored LED as well as the status text.

Article

The value is taken from the operation.

Planned start/planned end

The planned dates can be taken from the order information, tab Detailed Planning, under Planned

Dates - Start or End. Note: the planned dates as per planning are used; the remaining run time is not

taken into account.

Target duration

The target duration is calculated as follows: (target quantity * target cycle / part / 1000) * machine

efficiency / 100 

Tool

The value is taken from the operation.

Storage location

(Original) storage location that is assigned to the tool. Please note: This information is only provided

if the HYDRA tool  and resource management (HYDRA-WRM) module is in  use  and edited in this

master data.

Current storage location

Storage location that the tool is assigned to on the basis of its logon as a resource of type WNR. The

material  buffer  that  is  assigned  to  the  workplace  in  the  workplace/resource  configuration  as  the

upstream material buffer is used as the storage location.

Note: The assignment is only done in case of using the HYDRA Tool and Resource Management

(WRM).

Color

The value is taken from the operation.

MOC_SetupChangeList.docx

Version: 1.7

Page 3 of 5

Setup Change List

Addition

The value is taken from the operation.

Planned start (setup date)

Planned setup date; corresponds to the planned start date of the operation.

Change

See below.

"Symbol"

See below.

Setup time

Total of the values "setup time" and "additional setup time" at the operation.

M/O rel. setup

Machine/operator relation for setup; the value is taken from the operation.

Table setup change, symbol

When  setting  the  value  in  the  Setup  Change  column,  the  neighboring  operations  are  evaluated

(according to the planned start date).





If the value in the Tool field changes, the value "Tool" and the symbol are entered.

If the value in the Tool field does not change, but the value in the Color field does, then the "Color"

value and the icon are entered.



If the value in the Tool and Color fields does not change, but the value in the Material field does,

then the value "Material" and the symbol are entered.

 .



If the value in the Tool, Color and Material fields does not change, but the value in the  Article

field does, then the value "Article" and the icon will be entered.

  The symbol for "Article" and

"Material" is the same.

These  values  remain  even  if  the  user  chooses  another  table  sorting  that  does  not

correspond to the sequence of the planned dates.

The fields described above are the fields that are directly adjacent to the operation.

MOC_SetupChangeList.docx

Version: 1.7

Page 4 of 5

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

Setup Change List

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

MOC_SetupChangeList.docx

Version: 1.7

Page 5 of 5


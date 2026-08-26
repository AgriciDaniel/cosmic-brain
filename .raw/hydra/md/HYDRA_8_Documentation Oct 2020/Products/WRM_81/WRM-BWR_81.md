Manual

Resource Allocation
WRM-BWR 8.1

Version 1.2.23049

Last changed on: 02.09.2020

Resource Allocation

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WRM-BWR_81.docx

Version: 1.2.23049

Page 2 of 14

Resource Allocation

Contents

1  Allocation Plan for Tools / Resources - Overview ........................................ 4

2  Resource Allocation ..................................................................................... 6

WRM-BWR_81.docx

Version: 1.2.23049

Page 3 of 14

Resource Allocation

1  Allocation Plan for Tools / Resources - Overview

Purpose

The  resource  allocation  plan  shows  the  planned  use  of  resources  as  a  Gantt  diagram  as  well  as  the

allocation time and duration for primary resources (workplaces, machines) and secondary resources (e.g.

tools).  In  addition,  the  application  provides  a  tabular  overview  for  tool  provision  (resource  requirement

list).

Implementation Considerations

You use the function package if you:

  wish to visualize and analyze your resource allocation over a period of time.

  wish to optimize tool provision by means of a resource requirement list.

Integration

The resource allocation display results from the detailed planning in the HYDRA Shop Floor Scheduling

or in ERP.

Changes in the allocation are not possible in this application. The resource allocation

may only be modified through operation planning in graphic planning or by replanning

from the ERP system.

Features

Dynamic administration of a resource allocation plan on the basis of scheduled production operations and

the allocation of resources to operations.

  Observation  of  resource  statuses  and  maintenance  orders  for  resources  (provided  the  relevant

functions are used in the HYDRA-BDE)

  Graphic evaluation of the allocation plan



tabular list of scheduled dates of resource use (resource requirement list)

The following information is shown in the graphic resource allocation:

  Production order operations

  Maintenance order operations

  Planned resource locks

WRM-BWR_81.docx

Version: 1.2.23049

Page 4 of 14

Resource Allocation

WRM-BWR_81.docx

Version: 1.2.23049

Page 5 of 14

Resource Allocation

2  Resource Allocation

Overview

Menu

Production
allocation

facility  management    Resource  planning    Resource

Transaction code

resal

Function authorization

resal

Purpose

The resource allocation displays the following for the selected resources:

  primary resources (workplaces, machines).



secondary resources, i.e. resources that are required if you assign an operation to a workplace.

the planned use of the resources in a Gantt chart and the point  in time and duration of their assignment.

This information is shown in the graphic resource allocation:

  operations pertaining to production orders

  operations pertaining to maintenance orders

  planned locking of resources

In addition, the application provides a tabular overview of tooling.

Integration

The  displayed  resource  allocation  results  from  detailed  planning  in  the  HYDRA  Shop  Floor  Scheduling

module or the ERP system.

You  cannot  make  changes  to  the  assignments  in  this  application.  To  change  assigned

resources,  you  have  to  (re-)plan  operations  in  the  graphic  planning  module  or  in  the  ERP

system.

Requirements

Operations  must  be  planned  on  a  workplace  and  resources  must  be  assigned  to  the  operations  as

production resources and tools. The resources must be created in the resource stock (WRM module).

WRM-BWR_81.docx

Version: 1.2.23049

Page 6 of 14

Resource Allocation

Selection criteria

The application provides the following selection criteria:

Resource tab

Resource type (R)

Resource type of the resource. You can select multiple options.

Resource (R)

This selection criterion refers to the resource number. You can also use wildcards (placeholders *).

Assignment from / to (A)

Use the date selection to restrict the period of time for the data you want to evaluate.

You can also select past periods.

Designation (name) (R)

Name of the resource according to the resource configuration.

Resource status (R)

This  selection  criterion  refers  to  the  current  statuses  of  the  resource.  You  can  select  multiple

options.

Active (R)

Use this tri-state checkbox to select:

- currently active resources (i.e. they are logged on to a workplace)

- currently inactive resources (i.e. they are not logged on to a workplace)

- currently active and inactive resources

Responsibility area (R)

Responsibility area of the resource according to the resource configuration.

Cost center (R)

Cost center of the resource according to the resource configuration.

Storage location (R)

"Original" storage location of the resource according to the resource configuration.

Current storage location (R)

Storage location the resource is currently assigned to.

Workplace from / to (A)

Workplace on which resources are planned via the production resource/tool list.

Short designation (name) (A)

Short name of the workplace according to the resource configuration.

WRM-BWR_81.docx

Version: 1.2.23049

Page 7 of 14

Resource Allocation

Group from … to (A)

Group of the workplace according to the resource configuration.

Order (A)

Order number of the operation that is planned on a workplace.

MES order number (A)

MES order number (combined order/OP number) of the operation that is planned on a workplace.

Resource family (R)

Resource family of the resource according to the configuration.

User field 1...6 (R)

Slow  user  fields  1-  6  of  the  resource.  If  you  select  a  resource  family  in  the  selection  panel,  the

application shows the field names according to the assigned user field definition.

User fields tab

Object type (R)

Object type used to configure the user field key. The object type corresponds to the resource type.

Note: The selection list also shows object types that are not assigned to resources.

User field key (R)

User field key combining the direct user fields.

User fields (R)

Direct user fields that are assigned to the user field key according to the configuration.

The application identifies the assigned resources as follows:

Assignment of secondary resources based on planned operations

The application determines all assignments coinciding with the selected period.

1.  The application identifies all planned operations with a planned start or planned end coinciding with

the selection period. The operations must not be finished (control indicator <> E, D). The system also

integrates the responsibility area of the workplace where the corresponding operation is planned.

The system always selects the operations logged on.

The system does neither integrate split masters nor individual OPs pertaining to merged operations

generated via the MOC.

2.  The selection includes the selection criteria identified with (A) above in the document.

WRM-BWR_81.docx

Version: 1.2.23049

Page 8 of 14

Resource Allocation

3.  For  these  (planned)  operations,  the  system  selects  the  resources  that  are  assigned  as  production

resources  and  tools.  The  selection  includes  the  selection  criteria  identified  with  (R)  above  in  the

document.  The  selection  does  not  include  resources  for  which  the  user  is  not  authorized  via  the

responsibility area.

Assignment of primary resources (workplaces/machines) based on planned operations

The application determines all assignments coinciding with the selected period.

1.  See description of secondary resources.

2.  See description of secondary resources.

3.  For these (planned) operations, the system selects the workplaces that are assigned to the operation

(as workplace). The selection includes the selection criteria identified with (R) above in the document.

The  selection  does  not  include  resources  for  which  the  user  is  not  authorized  via  the  responsibility

area.

Assignments based on locked resources

1.  The application determines all locked resources (irrespective of whether it is a workplace/machine or

other resource) according to the selection criteria identified with (R) in the table above.

2.  The  selection  includes  the  locked  resources  with  a  start  or  end  date  of  the  lock  coinciding  with  the

selected period. The selection does not include resources for which the user is not authorized via the

responsibility area.

Toolbar

 Expand/collapse all groups

Click this button to expand or collapse all resource families (groups).

Zoom in

Click this button to increase the graphic use of resources (Gantt chart).

Zoom out

Click this button to reduce the graphic use of resources (Gantt chart).

Detail application Resource Allocation

The Gantt chart shows the resource allocation. You can use the zoom in and zoom out buttons to adjust

the graphic presentation to the required size.

WRM-BWR_81.docx

Version: 1.2.23049

Page 9 of 14

Resource Allocation

Changes to the Gantt chart are not saved.

Left-hand side

The resource family represents the grouping. Use the button

 to collapse or the button

 to expand

the  groups.  The  application  shows  all  resources  matching  the  entered  selection  criteria  below  the

resource family.

The table shows the following information for the single resources:

  Current

status

information

on

the

respective

resource.

The application shows the configured color from the status configuration of resources for the current

status.

  Resource number

  Current maintenance status (see the description below).

  Resource name

Current maintenance status

The  table  shows  a  symbol  if  a  maintenance  is  due  for  a  resource.  The  symbol  color  depends  on  the

current  status  of  the  maintenance  (depending  on  the  maintenance  limits  that  are  exceeded).  Currently,

the following maintenance statuses are available:

  No maintenance due: the table does not show a symbol.

  Maintenance is due / level 1: blue symbol

  Maintenance is due / level 2: yellow symbol

  Maintenance is due / level 3: red symbol

If  several  maintenance  activities  are  due  at  the  same  time,  the  application  shows  the  symbol  of  the

maintenance  with  the  highest  priority.  The  priority  sequence  is  as  follows:  no  maintenance  (lowest

priority)  blue  yellow  red (highest priority).

For additional information on maintenances, please refer to the appropriate documentation.

Tooltip

If you move the mouse pointer over a resource, a tooltip providing the following information appears:

WRM-BWR_81.docx

Version: 1.2.23049

Page 10 of 14

Resource Allocation

  Resource type

  Resource

  Name (of the resource).

  Current status (number of the resource status, status text)

  Status since (date, time)

  Current storage location

  Active: yes/no

Context menu

You can start the following applications via the context menu of the resource:

  Resource overview (resov)

  Activity schedule (rmcal)

  Workplaces/machines (wpov);

only if resource type = MNR

Right-hand side

In  the  resource  lines,  the  chart  shows  the  planned  operations  (production  orders),  the  planned

maintenance  operations  and  the  locked  resources  as  horizontal  bars.  The  resource  family  lines  are

shown in gray and do not contain any graphic bars.

The bar length results from the "planned start" and "planned end" period of operations (maintenance and

production operations). The bar length of locked resources results from the start and end time of resource

locks.

Depending  on  the  planning,  one  line  may  include  several  operation  bars,  if  tools  have  been  planned

several times simultaneously. In this case, the bars do not overlap but are displayed one underneath the

other.

Planned operations with a planned start in the past

The system integrates assignments for planned operations whose planned start is in the past as follows:

  The system determines the delta between the planned end and the planned start (synchronized

with the Gregorian calendar).

WRM-BWR_81.docx

Version: 1.2.23049

Page 11 of 14

Resource Allocation

  The system sets the planned start of the assignment to "now".

  The system sets the planned end to the planned start ("now") + the delta.

  The operation bar is shown hatched.

  The tooltip shows "Start date of OP changed".

In contrast to the graphic planning board (HLS), the bar lengths do not result from the planned

start + remaining run time, but exclusively from the planned dates.

Operations logged on

The graphic display also shows allocations of operations that are currently logged on. For this purpose,

the  application  shows  the  bars  from  the  start  point  (of  the  selection  period)  to  the  planned  end  of  the

operation.

In contrast to the graphic planning board (HLS), the bar lengths do not result from the planned

start + remaining run time, but exclusively from the planned dates. A certain uncertainty occurs,

if  an  operation  is  logged  on  before  its  planned  start  or  if  the  actual  remaining  run  time  differs

from the planned remaining run time.

Bar colors

These are the bar colors used:

  Locked resources: red

  Maintenance operations (order type category: PM): light blue

  All other operations: the bar color results from the current operation status and the color defined

in status assignment.

Bar legend

  Operation bars: workplace number / group

  Locked resources: no bar text

Tooltip of the operation bar

When  you move  your mouse cursor over an operation bar, a tool tip providing the following information

appears:

  Workplace

WRM-BWR_81.docx

Version: 1.2.23049

Page 12 of 14

Resource Allocation

  Group

  MES order number (of the operation)

  Article (of the operation)

  Operation status (status text)

  Resource (number, name)

  Demand (according to the production resources and tools list)

  Assignment from (date, time): planned start according to order backlog

  Assignment to (date, time): planned end according to order backlog



"Start date of OP changed" (see the description for operations with a planned start in the past).

Tooltip of locked resources

If  you  move  the  mouse  pointer  over  a  locked  resource,  a  tooltip  providing  the  following  information

appears:

  Resource

  Designation (name)

  Lock from (date, time)

  Lock till (date, time)

Context menu of operation bars

You can start the following applications via the context menu of operation bars:

  Order information (orin)

  Workplaces/machines (wpov)

  Resource overview (resov)

Context menu of locked resources

If a resource is locked, you can only open the resource overview (resov).

Detail application Resource staging list

Since the main application area of this detail application is the presentation of the provision of tools, this

detail application is called "resource staging list. Nonetheless, this application can also be used for other

resources  ("resource  staging  list").  The  list  shows  the  planned  usage  dates  of  the  resources  in  tabular

form. The detail application is docked "behind" the graphic display.

In contrast to the graphic presentation, the list does not show any locks.

The detail application provides the following information:

WRM-BWR_81.docx

Version: 1.2.23049

Page 13 of 14

Resource Allocation

Category

Field

Description

Resource

Resource type

Type of resource

Resource

Technical, unique name of the resource

Resource family

Family assigned to the resource

Responsibility area

Responsibility area of the resource

Short name

Short name of the resource, the field is only filled for resources of the type MNR.

Designation (name)

Name of resource

Status

Status

Active

Status number of the current status of the resource.

Status text of the current resource status - highlighted in color

Identifies whether a resource is active

Cost center

Cost center of the resource.

Assignment

Assignment from

Date + time

Assignment to

Date + time

Assignment from date

Date (only)

Assignment to date

Date (only)

Workplace

Workplace

Workplace where the operation the resource is assigned to is planned.

Short name

Short name of the workplace.

Designation (name)

Name/description of the workplace.

Cost center

Cost center of the workplace

Order

Order type

Order type of the operation.

Order

Order number of the operation.

Sequence

Sequence number of the operation, if active.

OP

Split

SOP

Operation number of the operation.

Split number of the operation, if the operation is split.

Sub-operation number (reserved)

MES order number

Combined order/operation number.

Article

Articles of the operation

Article
name/designation

Article name of the operation.

OP name/designation

Operation name.

WRM-BWR_81.docx

Version: 1.2.23049

Page 14 of 14


Manual

Extended Planning
Information
HLS-EPI 8.1

Version 1.0.23232

Last changed on: 15.09.2020

Extended Planning Information

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

HLS-EPI_81.docx

Version: 1.0.23232

Page 2 of 18

Extended Planning Information

Contents

1  Übersicht Erweiterte Planungsinformationen ............................................... 4

2  Utilization Profile .......................................................................................... 5

3  Capacity Utilization ....................................................................................... 7

4  Histogram ................................................................................................... 10

5  Resource View of the Graphic Planning Board .......................................... 12

6  Order Network ............................................................................................ 15

HLS-EPI_81.docx

Version: 1.0.23232

Page 3 of 18

1  Übersicht Erweiterte Planungsinformationen

Extended Planning Information

Purpose

You use the function package when you require information on

  The capacity utilization of your scheduling

  The assignment of the secondary resources

  The interrelationships in the order network

Integration

The  functions  are  100%  embedded  in  the  graphic  planning  board.  The  individual  graphic  detail

applications are displayed on the basis of the scheduled operations.

Features

  Capacity utilization

o  Graphic capacity utilization per workplace, group or cost center

  Utilization profile

o  Graphic capacity utilization profile in the scheduling period

  Histogram

o  Capacity utilization representation in the form of a histogram with colored highlighting of

overload.

  Resource view

o  Gantt chart for representation of the secondary resources (tools, etc.)

  Order network

o  Gantt chart for representation of all the operations for an order

HLS-EPI_81.docx

Version: 1.0.23232

Page 4 of 18

Extended Planning Information

2  Utilization Profile

Overview

Menu

Production control  Production preparation  Graphic planning
Production control  Production preparation  Info shop floor scheduling

Index tab

Planning details

Usage

You call up the utilization profile of the graphic planning board if you would like to have a chronological

overview of how capacities are being utilized in your production department.

Integration

Shown in the utilization profile of the  graphic planning board is a comparison by day, week or month of

the  actual  assignment  -  blue  -  based  on  the  planned  operations  and  availability  (available  resource)  -

green  -  based  on  the  shift  calendar.  The  information  is  presented  in  full  hours.  Generally,  hours  are

rounded down.

Requirement

This requires that  you selected a planning profile  in the graphic planning  board  and  that  you requested

data.

Settings

There are the following settings to choose from in the upper area of the utilization profile:

View

This  setting  controls  the  chronological  grid  spacing  in  the  utilization  profile.  The  following  settings

are available:

Day  view:  Values  are  presented  for  each  calendar  day  beginning  at  the  start  of  the  planning

horizon.

Week  view:  Values  are  presented  for  each  calendar  week.  Shown  on  the  X  axis  is  the  date

respectively for the Monday of a particular week. For the first week, the date for the Monday is also

shown, even if this Monday is already in the past.

Month view: Values are presented for each month. Shown on the X axis is the name of the month.

HLS-EPI_81.docx

Version: 1.0.23232

Page 5 of 18

Extended Planning Information

Modifying  the  performance  level  for  a  workplace  will  not  change  the  utilization,

because the available time is calculated using the workplace's shift calendar.

Group

All  of  the  groups  for  the  current  planning  profile  are  displayed  in  the  Combo  box.  When  the

utilization profile is called up, all groups are highlighted. Because any changes in the selection  will

affect how the utilization profile is displayed, we recommend that you leave all groups highlighted.

(Quantity)

Number of days/ weeks/ months in the visible area. Pre-assigned when called up: 5.

Editing functions

When the utilization profile is called up, the values for the entire planning profile are displayed, i.e. for all

workplaces that have been loaded into the graphic planning board. Clicking on a workplace in the Gantt

list of workplaces will display the values for the workplace; clicking on a group will display the values for

all workplaces in the group.

For technical reasons, it is not possible to "unhighlight" a workplace or a group. If you would like

to display the utilization profile again for the total planning profile, the data must be requested

again.

Please  also  note  that  if  workplaces  or  groups  are  highlighted  numerous  times,  only  the

workplace or group highlighted last will be taken into account.

The  size  of  the  utilization  profile  can  be  modified  by  moving  the  splitter  between  Gantt  and  utilization

profile.

On the right next to the splitter is a second splitter. This provides the ability to display a tabular workplace

list  that  shows  the  data  workplace,  short  designation,  group  and  cost  center.  By  highlighting  one  or

several workplaces in this list, you will have the ability to illustrate the utilization profile broken down even

further using additional criteria (e.g. by cost center or several groups).

HLS-EPI_81.docx

Version: 1.0.23232

Page 6 of 18

Extended Planning Information

3  Capacity Utilization

Summary

Menu

Production control  Production preparation  Graphic planning
Production control  Production preparation  Info shop floor scheduling

Index tab

Planning details

Usage

You call up the capacity utilization in the graphic planning board if you would like to have an overview of

how capacities are being utilized in your workplaces or workplace groups over a period of time.

Integration

Shown in the capacity utilization in the graphic planning board is a comparison of the actual assignment -

blue - based on the planned operations and availability (available resource) - green - based on the shift

calendar.

The information is presented in full hours. Generally, hours are rounded down.

Requirement

This requires that  you selected a planning profile  in the graphic planning  board  and  that  you requested

data.

Settings

There are the following settings to choose from in the upper area of the capacity utilization:

View

This setting controls the view and as such how the values are grouped on the X axis. The following

settings are available:

  Workplace (Pre-assigned when called up)

  Group

  Cost center

Values  are  grouped,  i.e.  how  they  are  presented  on  the  X  axis,  in  alphanumeric  order  based  on

setting, workplace, group or cost center.

The information is presented in full hours. Generally, hours are rounded down.

HLS-EPI_81.docx

Version: 1.0.23232

Page 7 of 18

Extended Planning Information

Modifying  the  performance  level  for  a  workplace  will  not  change  the  utilization,

because the available time is calculated using the workplace's shift calendar.

Period

This setting controls the scope of time. The possible alternatives listed below relate to the start date

of the planning profile:

  Today (pre-assigned when called up)

  Tomorrow

  This week

  Next week

  Next 7 days

  Next 14 days

  This month

  Next 31 days

(Quantity)

Number of workplaces/ groups/ cost centers in the visible area. Pre-assigned when called up: 5.

Processing functions

When calling up capacity utilization, the values for all of the planning profile's workplaces are displayed.

Clicking on a workplace in the Gantt list of workplaces will display the values for the workplace; clicking

on a group will display the values for all workplaces in the group.

For technical reasons, it is not possible to "unhighlight" a workplace or a group. If you would like

to display the capacity utilization again for the total planning profile, the data must be requested

again.

Please  also  note  that  if  workplaces  or  groups  are  highlighted  numerous  times,  only  the

workplace or group highlighted last will be taken into account.

The  size  of  the  detail  application  can  be  modified  by  moving  the  splitter  between  Gantt  and  detail

application.

On the right next to the splitter is a second splitter. This provides the ability to display a tabular workplace

list  that  shows  the  data  workplace,  short  designation,  group  and  cost  center.  By  highlighting  one  or

several  workplaces  in  this  list,  you  will  have  the  ability  to  illustrate  the  capacity  utilization  broken  down

even further using additional criteria (e.g. by cost center or several groups).

HLS-EPI_81.docx

Version: 1.0.23232

Page 8 of 18

Extended Planning Information

HLS-EPI_81.docx

Version: 1.0.23232

Page 9 of 18

Extended Planning Information

4  Histogram

Overview

Menu

Tab

Purpose

Production control  Preparations for production  Graphic planning
Production control  Preparations for production  Info shop floor planning

Planning details

You call the Histogram in the graphic Planning board if you want to get an overview of the utilization of

your workplaces or workplace groups over time.

Integration

The  histogram  is  integrated  into  the  graphic  planning  board.  The  histogram  displays  the  actual

assignment of a workplace over time using the planned operations. To display the histogram of a group,

the display is extended and also the operations not yet planned are used.

Requirements

You must select a planning profile in the graphic planning board and request data.

Editing functions

The  histogram  is  displayed  with  the  Gantt  chart  of  the  graphic  planning  board;  it  is  always  displayed

below the Gantt.

When you call the histogram, the values of the complete planning profile are displayed; this means: the

values  of  all  workplaces  that  are  loaded  in  the  graphic  planning  board.  If  you  click  a  workplace  in  the

Gantt workplace list, the workplace values are displayed. If you click a group, the values of all workplaces

of the group are displayed.

If you replan operations in the graphic planning board (not possible with the Info shop floor planning), the

histogram display is automatically updated.

For technical reasons, it is not possible to deselect a workplace or group. If you want to show

the histogram for the complete planning profile, you must request the data a new time.

Note: If  you select several  workplaces or  groups, only  the  workplace or group  last selected is

displayed in the histogram.

HLS-EPI_81.docx

Version: 1.0.23232

Page 10 of 18

Extended Planning Information

Red line

The red line shows the number of available resources (workplaces/machines).

Planned operations

As long as the available capacity is not exceeded, the green area shows the scheduled operations. If the

capacity cannot meet the demand, the red line is exceeded and the utilization is displayed in red.

As  long  as  the  operations  are  not  yet  planned  in  detail  for  the  workplaces,  the  required  capacity  is

displayed in blue even if the available capacity cannot meet the demand.

HLS-EPI_81.docx

Version: 1.0.23232

Page 11 of 18

5  Resource View of the Graphic Planning Board

Extended Planning Information

Overview

Menu

Tab

Usage

Production control  Production preparation  Graphic planning
Production control  Production preparation  Info shop floor planning

Planning details

You can start the "resource view" in the graphic planning board to get an overview of the assignment of

secondary resources.

Integration

The  graphic  planning  board  is  used  to  plan  operations  onto  workplaces.  Any  allocation  of  secondary

WRM resources (e.g. tools, equipment) is also accounted for in planning.

If an operation requiring a tool is planned, the planner is informed if the tool has already been planned for

use elsewhere during the period in question. Yet planners have no overview informing them when the tool

is not in use.

The resource view of the graphic planning board also shows assigned resources in a Gantt chart.

Requirement

You  can  only  display  such  resource  types  identified  as  being  "relevant  for  assignment"  in  the

configuration of resource types.

In the "views" tab of the HLS settings you have selected the types of resources which you would like to

view in the resource view.

In the graphic planning board you have selected a planning profile and requested data.

The number of resource types as well as the resources assigned to this resource type affect the

time required for requesting data.

Once the resource view has been enabled by clicking the relevant button, it will be displayed and can be

placed at the required position within the graphic planning board.

HLS-EPI_81.docx

Version: 1.0.23232

Page 12 of 18

Extended Planning Information

Table

Resources are listed in tabular form on the left-hand side of the resource view. Only resources planned

for operations shown in the capacity view are displayed.

When  data  is  requested  in  the  planning  board  only  those  resources  of  operations  which  have  already

been  planned  for  workplaces/machines  and  whose  resource(s)  is/are  available  within  the  Tool  and

Resource Management module are displayed in the resource view.

Data  is  displayed  in  a  hierarchical  structure:  resource  type    resource  family  (name)    resource.

Resources that are not assigned to a resource family are displayed in a pseudo resource family.

The below-mentioned data is shown for each resource:





color of the current resource status

resource number according to the resource stock

  name of the resource according to the resource stock

The following functions can be started using the context menu of the resource allocation (Gantt):

  Resource configuration (res)

  Maintenance calendar (rmcal)

Gantt

On  the  right  within  the  resource  allocation  view,  resources  are  displayed  as  bars.  This  area  is

synchronized with the capacity view. In other words, scrolling into the future in the capacity view results in

the resource allocation view being scrolled into the future as well and vice versa; the time scales of the

two views are thus always synchronous.

Coloring  of  bars  corresponds  to  that  of  the  capacity  view  (according  to  HLS  settings).  The  bars  do  not

have a color gradient. The MES order number and the article/item number of the operation are displayed

as text in the bar.

The resource view does not show any periods outside of shifts; the length of individual resource

bars  is  aligned  with  the  length  of  the  operation;  this  segment  always  represents  the  period

between the planned start and the planned end of the operation.

Displaying the resource allocation

If an operation is planned for a workplace and the respective resource has so far not been visible within

the  resource  view  the  resource  will  not  be  displayed.  Resource  data  is  not  updated  automatically.  The

resource  becomes  only  visible  within  the  resource  view  after  having  saved  and  updated  the  planning

board.

HLS-EPI_81.docx

Version: 1.0.23232

Page 13 of 18

Extended Planning Information

If, as a result of deallocating all of the operations, a resource is no longer allocated at all, it is nonetheless

still displayed in the resource view dialog.

Tooltip

The tooltip shows all data selected in the "tooltip" tab of HLS settings. In addition, the workplace and the

workplace group are shown for which the operation is planned which the resource has been assigned to.

Context menu

The following functions can be started using the context menu of the resource allocation (Gantt):







 Order overview (orov)

 Order information (orin)

 Deallocating: deallocates the operation which the resource is assigned to.

Displaying blocks

Locked resources are represented by resource bars from the start of the lock to the time when it  ends.

Locked  bars  are  red,  regardless  of  the  color  corresponding  to  the  status  of  the  resource  labeled  as

"locked".

Planning functions

The  following  planning  functions  are  possible  in  the  resource  view,  provided  that  the  planner  has  the

relevant authorizations for planning.

  Horizontal  (chronological)  re-planning:  By  moving  a  bar  in  the  resource  view,  the  corresponding

operation  will  be  re-planned  temporally.  When  "releasing/dropping"  the  bar,  checks  are  performed

according to the settings made in HLS.

  Deallocate: the relevant operation can be deallocated using the context menu.

Both  activities  result  in  updating  of  the  other  views  (Gantt,  tabular  pool  of  groups,  tabular  pool  of

workplaces).

HLS-EPI_81.docx

Version: 1.0.23232

Page 14 of 18

Extended Planning Information

6  Order Network

Overview

HYDRA menu

Production control  Production preparation  Order network

FEDRA menu

Advanced Process Modeling  Current  Order network

Transaction code

ornet

Function authorization

ornet

Purpose

You use this application if you  would like to have an  overview of an order network, i.e. a view of linked

orders.

Integration

The order network displays order planning results in a Gantt chart.

Requirements

For  order  networks  across  orders,  you  must  have  defined  relationships  between  operations.  The

relationships  between  orders,  or  more  accurately,  between  operations  of  related  orders,  must  be

transmitted from the ERP system via an interface or

Selection criteria

The application provides the following selection criteria:

Order

The order network for this order can be determined using this field. You can also use wildcards.

When an order number is entered, adjacent orders are selected as well. If the adjacent succeeding

orders  have  predecessors,  only  their  last  operation  is  displayed.  If  the  adjacent  preceding  orders

have successors, only their first operation is displayed.

Project number

If a selection is made by project number, all orders are determined that are assigned to the project

number  entered.  This  requires  that  the  project  number  is  defined  in  the  order.  You  can  also  use

wildcards.

Sales order

If a selection is made by customer sales order, all orders are determined that are assigned to the

sales order entered. This requires that the sales order number is defined in the order. You can also

use wildcards.

HLS-EPI_81.docx

Version: 1.0.23232

Page 15 of 18

Extended Planning Information

Customer name

If  you enter a customer name, all orders are determined that are  assigned to the customer name

you  entered.  This  requires  that  the  customer  name  is  defined  in  the  order.  You  can  also  use

wildcards.

Note:  Only  operations  are  selected  and  shown  that  are  at  least  connected  to  one  other

operation and have a planned start or planned end. The application does not display operations

of orders including only one stage (i.e. orders with one operation only) that are not connected to

an operation of another order. Also operations with an identical planned start and end are not

displayed.

Generally, only such orders are integrated that have planning identifiers configured for the order

type with either F (detailed planning) or T (scheduling).

Toolbar

 Zoom out

Reduces the display.

Zoom in

Enlarges the display.

 (Grouped by) sales order

Groups the orders and operations by

sales order  order  operation

 (Grouped by) project number

Groups the orders and operations by

project number  order  operation

 (Grouped by) order

Groups the orders and operations by

Order  Operation

HLS-EPI_81.docx

Version: 1.0.23232

Page 16 of 18

Extended Planning Information

Detail application

Orders are listed on the left in table form. Data can be shown or hidden with groupings

. Orders are

displayed in groups:

  Project number or customer sales order number (depending on how they are grouped)

o  Order

  Operation

Displayed at the lowest level are operations with the following information:

  Operation number

  Workplace at which the operation is planned (if planned)

  Group in which the operation is planned

Operations are shown in the form of a bar on the right. For every entry (each line) on the left, there is a

corresponding illustration on the right:

The project order or customer sales order is always displayed in the form of a bar, which is limited at each

end  with  triangles.  The  length  of  the  bar  depends  on  when  each  of  the  orders  listed  under  the  project

order or sales order, or rather their operations, are scheduled.

If  you  expand  the  project  order  or  the  sales  order,  you  will  see  each  separate  order.  Likewise  for  each

order, you will see a bar that is also limited with triangles. The length of the bar depends on when each of

the individual operations is scheduled.

When you now expand an order, each of the order's operations is displayed in the form of a bar.

What can now be seen relatively clearly here: the length of the order bar depends on the time domain in

which the operations are planned.

HLS-EPI_81.docx

Version: 1.0.23232

Page 17 of 18

Extended Planning Information

All orders are expanded when data is requested and when groups are modified.

The format of the date values displayed on the Gantt chart depends on the format specified by

the operating system. The client format is not relevant.

No  shift-free  times  are  displayed  in  the  application.  The  length  of  the  bars  in  each  of  the  operations  is

based on the Gregorian calendar. It always equals the length of time between the planned start and the

planned end. The coloring of the OP bars is based on the order status configuration.

When you move your mouse cursor over an operation bar, a tool tip is shown that includes the following

information:

  MES order number

  Article

  Article designation

  OP designation: operation designation

  Target quantity (P): target quantity in primary quantity unit

  Start: planned start according to planning; if the operation is still in the pool of groups, this is the

scheduled start

  End: planned end according to planning; if the operation is still in the pool of groups, this is the

scheduled end.

The following applications can be called up from the operation's context menu:

  Order information (function authorization: orin)

  Order progress / order overview (function authorization: orov)

  Edit order network (function authorization: ednet)

Request from graphic planning board

If the order network is called from the graphic planning board, the operations displayed in the Gantt chart

are updated  with the planned dates scheduled in  the  graphic planning  board, because these may differ

from those in the database.

HLS-EPI_81.docx

Version: 1.0.23232

Page 18 of 18


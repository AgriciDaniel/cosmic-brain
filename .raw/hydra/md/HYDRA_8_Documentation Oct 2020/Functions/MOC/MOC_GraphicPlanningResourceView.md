Resource View of the Graphic Planning Board

1  Resource View of the Graphic Planning Board

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

MOC_GraphicPlanningResourceView.docxVersion: 1.0.18468

Page 1 of 3

Resource View of the Graphic Planning Board

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

MOC_GraphicPlanningResourceView.docxVersion: 1.0.18468

Page 2 of 3

Resource View of the Graphic Planning Board

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

MOC_GraphicPlanningResourceView.docxVersion: 1.0.18468

Page 3 of 3


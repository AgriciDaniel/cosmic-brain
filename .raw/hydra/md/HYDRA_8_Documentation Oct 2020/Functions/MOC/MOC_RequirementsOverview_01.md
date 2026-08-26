Requirements Overview

1  Requirements Overview

Summary

Menu

Material management  Inventory management  Requirements overview

Transaction code

reqov

Function authorization

reqov

Usage

The  function  “material  requirements”  provides  an  overview  of  the  materials  required  at  machines.  It  is

particular  to  this  function  that  material  requirements  are  exactly  determined  by  day  taking  the  shift

calendar  into  account.  Consequently,  material  requirements  are  distributed  according  to  the  run  time  of

OP(s). “By day” means here “by shift”, i.e. the day starts with the beginning of shift 1 and ends with the

end of the last shift (e.g. shift 3).

Requirements

The PPS system transfers the materials required for the production of an operation and, as a result, they

are available in the component list of the OP within the system.

Please note:

The  determination  of  material  requirements  depend,  among  others,  on  the  planned  start  date  of  an

operation. For this reason, the planned start date of an operation needs to be transferred correctly by the

PPS system or planned in shop floor scheduling. If, however, the order sequencing function is used this

planned date is used to define the order of processing (internal algorithm). In this case, the planned start

date can no longer be derived.

Selection criteria

The application provides the following selection criteria:

Material type

This  selection  criterion  refers  to  the  material  type  of  the  material.  All  materials  assigned  to  the

selected material type are shown.

Material

Shows all materials assigned to the selected material.

Workplace

Shows all materials assigned to the selected workplace.

MOC_RequirementsOverview_01.docx

Version: 1.0.1362

Page 1 of 2

Requirements Overview

Order

Shows all materials assigned to the selected order.

Control

Shows all materials assigned to the selected control.

Planned start

Shows all materials assigned to the selected planned start.

MES order number

Shows all materials assigned to the selected MES order number.

Consider pool of groups

Defines whether or not the pool of groups is to be taken into account for selection.

The result of overlapping selection criteria is displayed if several selection criteria are in use.

MOC_RequirementsOverview_01.docx

Version: 1.0.1362

Page 2 of 2


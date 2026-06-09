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

The  application  is  only  available  in  the  structure  described  here  if  the  modification

reqovextensionselection is enabled.

If you do not use the modification, please refer to this document.

The  function  “material  requirements”  provides  an  overview  of  the  materials  required  at  machines.  It  is

particular  to  this  function  that  material  requirements  are  exactly  determined  by  day  taking  the  shift

calendar  into  account.  Consequently,  material  requirements  are  distributed  according  to  the  run  time  of

OP(s). “By day” means here “by shift”, i.e. the day starts with the beginning of shift 1 and ends with the

end of the last shift (e.g. shift 3).

Requirements

The PPS system transfers the materials required for the production of an operation and, as a result, they

are available in the component list of the OP within the system.

Please note:

The  determination  of  material  requirements  depends,  among  others,  on  the  planned  start  date  of  an

operation. For this reason, the planned start date of an operation needs to be transferred correctly by the

PPS system or planned in shop floor scheduling. If, however, the order  sequencing function is used this

planned date is used to define the order of processing (internal algorithm). In this case, the planned start

date can no longer be derived.

Selection criteria

The result of overlapping selection criteria is displayed if several selection criteria are in use.

The application provides the following selection criteria:

MOC_RequirementsOverview.docx

Version: 1.1.18468

Page 1 of 2

Requirements Overview

Material

Shows all materials assigned to the selected material.

Workplace

Shows all materials assigned to the selected workplace.

MES order number

Shows all materials assigned to the selected MES order number.

Material type

This  selection  criterion  refers  to  the  material  type  of  the  material.  All  materials  assigned  to  the

selected material type are shown.

Planned start

Shows all materials assigned to the selected planned start.

Consider pool of groups

Defines whether or not the pool of groups is to be taken into account for selection.

MOC_RequirementsOverview.docx

Version: 1.1.18468

Page 2 of 2


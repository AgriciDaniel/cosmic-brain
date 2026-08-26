Manual

Graphic Energy Monitor
(MOC)
EMG-GEM 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Graphic Energy Monitor (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-GEM_81.docx

Version: 1.0.23049

Page 2 of 7

Graphic Energy Monitor (MOC)

Contents

1  Energy Management – Energy Monitor ....................................................... 4

2  Consumption/Energy Monitor ....................................................................... 5

EMG-GEM_81.docx

Version: 1.0.23049

Page 3 of 7

Graphic Energy Monitor (MOC)

1  Energy Management – Energy Monitor

Purpose

Evaluation function for energy data. Hierarchically selected, tabular representation of the power meters in

the  company.  Representation  of  the  logical  power  meters  assigned  to  the  machines  and  systems  and

display of the consumption values and comparison values. Display of the meter hierarchy.

You use the function package when:

  You  wish  to  have  an  overview  of  the  latest  development  in  energy  consumptions  since  the  last

invoice.

Integration

The evaluations require the function package EMG-MGM for data collection as the basis.

Features

  Display of the current energy meters and power meters in a dynamic tree-like structure.

  Display  of  the  machines  and  other  logistics  objects  in  the  structure  of  the  meters  and  their

connections

  Dynamic forming  of  the  object  hierarchy,  allowing  for  a  wide  range  of  selection  criteria  such  as

meters, machines, evaluation groups and other logistics objects.

  Display of the meters, consumptions at the meters, limits and limit value infringements as well as

implausible configurations and values in the graphic nodes.

  Energy balance: Display of the energy differences in the meter hierarchy

  Drill-down mechanism in the branches of the tree representation.

EMG-GEM_81.docx

Version: 1.0.23049

Page 4 of 7

Graphic Energy Monitor (MOC)

2  Consumption/Energy Monitor

Overview

Menu

Production Facility Management  Resource analysis

 Energy monitor

Transaction code

conmon

Function authorization

conmon

This  document  provides  a  description  of  the  "Consumption/  energy  monitor"  application  in  the

Manufacturing Operation Center (MOC).

Purpose

The energy monitor  lists the energy counters (resources). The energy  monitor shows the current status

for these resources, allowing a comparison with comparative resources. This makes it possible to display

an energy balance. The system always shows the counted quantities since the last inventory, i.e. since

the counter was reset.

You can also display the balance in a graphic. The same applies to the counter hierarchy defined by the

BOM including the meter readings of the selected resource.

When  you  select  data,  you  can  use  the  defined  counter  hierarchies  in  tree-like  structure  to  filter  the

resources in the table multiple times.

Integration

This application is connected with the following applications:

-  Consumption analysis to chronologically distribute consumption values

-  Consumption statement to analyze the totals and to reset data.

-  You can also visualize the monitor values in the graphic machinery due to the integration of the

counters (resources).

Selection criteria

Resource type

Type of resource.

Workplaces  and machines  always  have  the  resource  type  MNR.  But  you  can  configure  individual

resource types for the other resources. Predefined resource types include:

DNC

NC/DNC program

EMG-GEM_81.docx

Version: 1.0.23049

Page 5 of 7

Graphic Energy Monitor (MOC)

DOC

Document

ENT

Removal device

MNR  Workplace/Machine

PAC

Packaging, transportation container

PRM

Test and measuring equipment

PER

Production staff / general

PRU

Setup staff

TEM

Tempering equipment

VOR

Device

WNR

Tool

Resource from ... to ...

This  selection  criterion  refers  to  the  resource.  You  can  also  run  a  search  using  wildcards

(placeholders * and ?).

Designation (name)

Name of the resource.

Cost center

Cost center of the resource.

Responsibility area

Responsibility area to which the resource is assigned.

Resource family

The resource family to which the resource is assigned.

Storage location

Regular storage location of the resource.

User fields

MD user fields 1- 6 of the resource.

Reference

The resource's internal ID.

Field descriptions

Resource type

Resource  type  of  the  resource.  By  default,  the  HYDRA  system  includes  some  default  resource

types. You can configure additional resource types in HYDRA.

EMG-GEM_81.docx

Version: 1.0.23049

Page 6 of 7

Graphic Energy Monitor (MOC)

Resource

Resource as a reference point for comparisons.

Comparison resource 1

Resource whose values are to be compared with those of the reference point.

Current value, absolute (comparison resource 1)

Absolute difference between the values of the reference resource and the comparison resource.

Current value, in percent (comparison resource 1)

Relative difference between the reference resource values and the comparison resource values.

Comparison resource 2

Resource whose values are to be compared with those of the reference point.

Current value, absolute (comparison resource 2)

Absolute difference between the values of the reference resource and the comparison resource.

Current value, in percent (comparison resource 2)

Relative difference between the reference resource values and the comparison resource values.

Reset time

Date on which the resource counters were reset.

Setting a reset time

The reset date depends on the entered records.

If you select a reset date that coincides with a resource record period, the system sets the reset

time to the start time of this resource record.

If you select a reset date that does not coincide with a resource record period, the system uses

the start time of the next resource record as the reset time.

The system uses the reset time you enter if:

- you select a reset date that does not coincide with a resource record period and

- there is no record that starts at a later point in time.

EMG-GEM_81.docx

Version: 1.0.23049

Page 7 of 7


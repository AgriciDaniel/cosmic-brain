Consumption/Energy Monitor

1  Consumption/Energy Monitor

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

The energy monitor  lists the energy counters (resources). The energy monitor shows the current status

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

MOC_ConsumptionMonitor.docx

Version: 1.1.14701

Page 1 of 3

Consumption/Energy Monitor

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

MOC_ConsumptionMonitor.docx

Version: 1.1.14701

Page 2 of 3

Consumption/Energy Monitor

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

MOC_ConsumptionMonitor.docx

Version: 1.1.14701

Page 3 of 3


Manual

Energy Management Key
Figures
EMG-KBW 8.3

Version 1.0.23049

Last changed on: 01.09.2020

Energy Management Key Figures

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-KBW_83.docx

Version: 1.0.23049

Page 2 of 14

Energy Management Key Figures

Contents

1  Overview: Key Figures (Energy) .................................................................. 4

2  Consumption/Energy Monitor ....................................................................... 5

3  Counter to Machine Assignment .................................................................. 9

4  Efficiency Report (Relating to Energy) ....................................................... 11

EMG-KBW_83.docx

Version: 1.0.23049

Page 3 of 14

Energy Management Key Figures

1  Overview: Key Figures (Energy)

Overview

Purpose

You can use the function package "key figures" (energy) to make consolidated evaluations using the data

collected in MDE and EMG (quantities, times, consumption). The evaluations can be made over different

periods of times and relating to defined key figures.

Implementation notes

You use the function package for the following purposes:

  You  want  to  monitor  and  assess  the  performance  of  specific  machines,  machine  groups  or

departments using energy key figures.

  You want to assign consumption counters to specific machines for the key figure calculation.

Integration

The  function  uses  the  times  and  quantities  collected  in  BDE  or  MDE  and  the  consumption  values

collected in EMG for the display.

Features

  Efficiency report (energy)

o  Efficiency  report  on  quantities  and  times  for  all  machines  over  specified  periods  and

shifts

o  Recorded consumption of the counters that are assigned to the machines

o  Tabular evaluation of the key figures: specific energy consumption, energy consumption

per machine hour and energy consumption per production hour.

  Assignment of counter to machine

o  Assignment of counters to machines as basis for the key figure evaluation

EMG-KBW_83.docx

Version: 1.0.23049

Page 4 of 14

Energy Management Key Figures

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

The energy monitor  lists the energy  counters (resources). The energy monitor shows the current status

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

EMG-KBW_83.docx

Version: 1.0.23049

Page 5 of 14

Energy Management Key Figures

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

"General" category

Resource type

Resource  type  of  the  resource.  By  default,  the  HYDRA  system  includes  some  default  resource

types. You can configure additional resource types in HYDRA.

EMG-KBW_83.docx

Version: 1.0.23049

Page 6 of 14

Resource

Resource as a reference point for comparisons.

Energy Management Key Figures

Designation (name)

Name of the resource.

Resource status

Resource status.

Cost center

Cost center

"Resource" category

Current value

Current value

Quantity unit (P)

Quantity unit (P)

Absolute value limit (only available if the EMG-KBW license has been purchased)

Absolute value limit

Reset time

Date on which the resource counters were reset.

Status time

Status time

"Key figures" category (only available if the EMG-KBW license has been purchased)

Energy consumption per hour

Energy consumption per hour

Key figure 2 to 10

You  can  show  up  to  nine  additional  key  figures.  Use  the  formula  management  to  define  the  key

figures (KPIs). You can configure the formulas eovf2 to eovf10.

"Comparison resource 1/2" category

Resource 1 / Resource 2

Resource whose values are to be compared with those of the reference point.

Current value

Absolute difference between the values of the reference resource and the comparison resource.

Difference, in percent

Relative difference between the reference resource values and the comparison resource values.

EMG-KBW_83.docx

Version: 1.0.23049

Page 7 of 14

Energy Management Key Figures

Unit

Unit

Resource type 1 / Resource type 2

Resource type of the comparison resource.

Reset time

Date on which the counters of the comparison resource were reset.

Status time

Status time

Setting a reset time

The reset date depends on the entered records.

If you select a reset date that coincides with a resource record period, the system sets the reset

time to the start time of this resource record.

If you select a reset date that does not coincide with a resource record period, the system uses

the start time of the next resource record as the reset time.

The system uses the reset time you enter if:

- you select a reset date that does not coincide with a resource record period and

- there is no record that starts at a later point in time.

EMG-KBW_83.docx

Version: 1.0.23049

Page 8 of 14

Energy Management Key Figures

3  Counter to Machine Assignment

Summary

Menu

Master data  Resources  Assignment of counter to machine

Transaction code

emgmas

Function authorization

emgmas

This  document  describes  the  "counter  to  machine  assignment”  application  within  the  Manufacturing

Operation Center (MOC).

Utilization

This application enables the assignment of one or several energy meter resources to every workplace.

This  assignment  is  considered  for  the  calculation  of  key  figures  within  the  efficiency  report  (relating  to

energy). Key performance indicators are calculated for every workplace/counter assignment.

Please note

It is not allowed to assign two or more counters of the same resource type and the same resource family

to  one  workplace.  However,  several  meter  resources  of  different  types  or  different  families  may  be

assigned.

One counter may be assigned to multiple workplaces.

The  family  structure  of  (meter)  resources  is  to  be  focused  in  particular,  due  to  the  variety  of

assignment options and the resulting evaluation options within the efficiency report (energy).

Toolbar

  Add

Opens the dialog for adding an assignment.

 Delete

Deletes one or several assignments.

EMG-KBW_83.docx

Version: 1.0.23049

Page 9 of 14

Energy Management Key Figures

Selection criteria

The following selection criteria are available in the application:

Workplace

Workplace/machine that is to be assigned a counter resource.
Wildcards (placeholders *) can be used.

Energy meter

Selects the assigned energy counters. Wildcards (placeholders *) can be used.

Field descriptions

Workplace category

Resource type

Resource type of the workplace

Workplace

Number of the workplace

Assigned or energy meter category

Resource type

Resource type of the energy meter resource.

Resource family

Resource family which the energy meter resource belongs to.

Resource

The number of the energy meter resource

Last modified on category

Editor

The last person to edit this data record

Modified on

Date on which this data record was last modified.

EMG-KBW_83.docx

Version: 1.0.23049

Page 10 of 14

Energy Management Key Figures

4  Efficiency Report (Relating to Energy)

Summary

Menu

Production facility management  Key performance indicators  Efficiency
report (energy)

Transaction code

effremg

Function authorization

effremg

The  analysis  concerns  workplace/  machine-related  performance  data  for  a  certain  period  of  time  and  a

certain number of workplaces. The result depends on the selection and therefore on the selection criteria

made available on the selection panel.

Selection criteria

The following selection criteria are available in the application:

Workplace

This  selection  criterion  references  the  workplace  in  the  machine  or  workplace  master  data.

Wildcards (placeholders *) can be used.

Group

This selection criterion references the group in the machine or workplace master data. All machines

or workplaces are displayed that are assigned to the selected group. Wildcards can be used.

Date/time from ... to ...

Restricts the period to be evaluated by filling out the from/to fields

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

Responsibility area

This  selection  criterion  refers  to  the  responsibility  area  within  the  workplace/machine  master.

Please  respect  that  only  machines  are  displayed,  for  which  the  user  is  authorized  by  the

corresponding responsibility areas.

EMG-KBW_83.docx

Version: 1.0.23049

Page 11 of 14

Energy Management Key Figures

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  or  workplace  master.  All

machines or workplaces are displayed that are assigned to the selected cost center. Wildcards can

be used.

Resource family

This  selection  criterion

refers

to

the

family  of

(counter)

resources  assigned

to

the

workplaces/machines.

Short name

This  selection  criterion  refers  to  the  short  name  of  the  machines  within  master  data.  All  of  the

machines  or  workplaces  are  displayed  that  match  the  string  that  was  entered.  Wildcards  can  be

used.

Designation

This  field  refers  to  the  designation  of  machines  and  workplaces  within  the  machine  master  data.

Only  those machines are  displayed that are  identical to the string that  was entered. Wildcards (*)

can be used in this field.

EMG-KBW_83.docx

Version: 1.0.23049

Page 12 of 14

Energy Management Key Figures

Efficiency report detail application

Workplace category

The following workplace/ machine-related master data are available:

  Workplace

  Short name

  Designation

  Group

  Cost center

Duration category

  Production = RPA11

  Downtime = RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07 + RPA08 + RPA09 +

RPA10

  Total = production + downtime

Primary quantity, secondary quantity, tertiary quantity, basic quantity category

Workplace/ machine-related quantities recorded in the corresponding quantity types

  Yield

  Scrap

  Rework

  Open quantity

or the relevant quantity units (if relevant in the customer system).

Cycles category

  Number of posted cycles

EMG-KBW_83.docx

Version: 1.0.23049

Page 13 of 14

"Energy meter" category

These master data are available for the energy meter resource:

Energy Management Key Figures

  Resource

  Designation

  Resource family

  Consumption

  Unit

  Status time

Key figures category

  Specific energy consumption

These  key  figures  represent  the  specific  energy  demand  relating  to  the  production  quantity.

Specific energy consumption = energy consumption / yield (P)

  Energy consumption per machine hour

These

key

figures

represent

energy

demand

relating

to  machine

hours

Energy consumption per machine hour = total energy consumption / total machine hours

  Energy consumption per production hour

These

key

figures

represent

energy

demand

relating

to

production

hours

Energy consumption per production hour = total energy consumption per machine hour for RPA 11

Key figure 4 to..10

Up  to  seven  additional  key  figures  may  be  shown.  Key  figures  are  defined  within  formula

management. The formulas erpf4 to erpf10 are defined as part of customizing the system.

  "Resource performance accounts" category

  RPA 1-10 and RPA12

EMG-KBW_83.docx

Version: 1.0.23049

Page 14 of 14


Efficiency Report (Relating to Energy)

1  Efficiency Report (Relating to Energy)

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

MOC_PerformanceReportEMG.docx

Version: 1.4.1362

Page 1 of 4

Efficiency Report (Relating to Energy)

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

MOC_PerformanceReportEMG.docx

Version: 1.4.1362

Page 2 of 4

Efficiency Report (Relating to Energy)

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

MOC_PerformanceReportEMG.docx

Version: 1.4.1362

Page 3 of 4

"Energy meter" category

These master data are available for the energy meter resource:

Efficiency Report (Relating to Energy)

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

MOC_PerformanceReportEMG.docx

Version: 1.4.1362

Page 4 of 4


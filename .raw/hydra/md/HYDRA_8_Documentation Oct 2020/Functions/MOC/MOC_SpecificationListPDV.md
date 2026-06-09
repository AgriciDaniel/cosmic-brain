PDV Specification List

1  PDV Specification List

Overview

Menu

Master data  Process data processing  PDV specification list

Transaction code

sclp

Function authorization

sclp

Purpose

The  specification  list  has  been  designed  to  create  specifications,  e.g.  within  the  framework  of  family

inspection planning.

Set  the  option  “from  list”  in  the  relevant  inspection  plan  characteristics  to  use  the  specifications  of  the

specification list when generating inspection steps with inspection step characteristics. In this case, only

active entries of the specification list are used. The application uses the following key fields to search for

a specification list entry, when generating an inspection step.

  Area

  Machine no.

  Article number

  Resource number

  Characteristic no.

  Operation number and operation designation (name)

You can configure the order for searching the specification list while customizing the system.

The specification list does not replace inspection planning. It rather is a supplement to family inspection

plans.

Integration

This  function  is  a  fundamental  component  of  family/group  inspection  planning.  The  specification  list

defines  the  inspection  specifications  that  vary  with  each  item/article  in  the  article  group  of  a  group

inspection plan.

The function is largely identical to the CAQ specification list. With the exception that in the PDV module

you can only select "article-related PDV inspection planning" as available area.

MOC_SpecificationListPDV.docx

Version: 1.0.14832

Page 1 of 4

PDV Specification List

Requirements

An  inspection  plan  for  the  article  group  including  corresponding  characteristics  referring  to  the

specification  list  has  to  exist  in  order  to  use  the  specification  list  (configure  the  option  "from  list"  in  the

inspection plan characteristics).

Please note that sample-related reports/evaluations are not available for process characteristics

whose limit values are controlled via specification lists.

Selection criteria

The application provides the following selection criteria:

Area

Shows  the  available  CAQ  areas.  The  PDV  module  only  supports  the  "article-related  PDV

inspection planning".

Specification no.

Unique specification number.

Version no.

Unique version within the specification. Only active, provided that you have activated the version

control function in the system settings.

Active

You can filter by active or inactive entries.

Article number

Article number of the specification list entry.  You can  select the  article  number from the catalog

for article master data.

Article name/designation

Name of the article.

Operation

Operation number.

MOC_SpecificationListPDV.docx

Version: 1.0.14832

Page 2 of 4

PDV Specification List

Workplace

Workstation, e.g. machine.

Characteristic no.

Characteristic number.

Characteristic designation/name

Characteristic designation/name

If you select multiple selection criteria, the specification list shows the matching results.

Field descriptions

Characteristic key tab

"Characteristic" group

Area

Specifies the area for which the specification list entry is to apply.

Specification no.

Number of the specification.

Version no.

Version number of the specification.

Active

Checkbox. Shows whether the entry is active or inactive.

Workplace

Indicates the workplace. If you enter a workstation (e.g. machine) you can check articles/items with

respect to this workplace. This might be useful if you use machines of different types.

Machine name

  Designation/name of the workplace/machine.

Resource

  You can enter a resource (e.g. tool).

Designation (name)

Name of the resource.

Characteristic no.

Unique number of the characteristic.

MOC_SpecificationListPDV.docx

Version: 1.0.14832

Page 3 of 4

PDV Specification List

Characteristic designation/name

Name of the selected characteristic number.

Operation

Number of the operation.

Operation designation/name

Designation/name of the operation.

Article number

Article number for this specification list entry.

Article name/designation

Designation/name of the selected article number.

Drawing issue number

Drawing issue number of the selected article number.

Specifications tabs and other tabs

The remaining index tabs are described in the characteristics definition master data application.

Toolbar

The below-mentioned additional functions are available besides the standard functions.

  Activate

Function authorization: sclp.active

Click  this  button  to  activate  a  specification  list  entry.  This  function  automatically  disables  a

previously released version.

 Deactivate

Function authorization: sclp.release

Click this button to deactivate a specification list entry. The specification list entry is no longer used.

MOC_SpecificationListPDV.docx

Version: 1.0.14832

Page 4 of 4


Specification List

1  Specification List

1.1  Summary

Menu

Master data  Quality management  Specification list

Transaction code

sclq

Function authorization

sclq

Utilization

The  specification  list  has  been  designed  to  create  specifications,  e.g.  within  the  framework  of  family

inspection planning.

To be able to use the specifications of the specification list for the generation of an inspection step with

inspection step characteristics, the property "from list" has to be set in the corresponding inspection plan

characteristics. In this case, only active entries of the specification list are used. A specification list entry

is searched on the basis of the following key fields, when generating an inspection step.

  Area

  Article number, drawing issue number

  Resource number

  Characteristic no.

  Operation number and operation designation

  Customer no.

  Supplier number

The order of searching the specification list may be configured while customizing the system.

The specification list does not replace inspection planning. It rather is a supplement to family inspection

plans.

Integration

This  function  is  a  fundamental  components  of  family/group  inspection  planning,  as  the  inspection

specifications that vary  with each item in the  article group of a  group inspection plan are defined  in the

specification list.

MOC_SpecificationListQM.docx

Version: 1.3.5417

Page 1 of 8

Prerequisite

An  inspection  plan  for  the  article  group  including  corresponding  characteristics  referring  to  the

specification  list  has  to  exist  to  be  able  to  use  specification  lists  (configuration  within  inspection  plan

Specification List

characteristics: "from list").

Selection criteria

The application provides the following selection criteria:

Area

List of available CAQ areas

Specification no.

Unique specification number

Version no.

Unique version within the specification. Only active, provided that the version control function has

been activated within system settings.

Active

Active or inactive entries are filtered.

Special case

Special cases/normal cases or both are filtered.

Article number

Article number of the specification  list entry; can  be selected from the catalog for  article master

data.

Article designation

Article designation

Customer number

Customer number can be selected from the company catalog

Customer name

MOC_SpecificationListQM.docx

Version: 1.3.5417

Page 2 of 8

Specification List

Customer name

Supplier number

Supplier number can be selected from the company catalog

Supplier designation

Supplier name

Operation

Operation number

Workplace

Workstation, e.g. machine

Please note: The definition of machine-related specification list entries is not supported by

default (standard).

This field can be used for customer-specific implementations.

Characteristic no.

Characteristics number

Characteristic designation

Characteristic designation

Characteristic type

The characteristic type is filtered: variable, attributive, inspection chart

If several selection criteria are used overlapping results are displayed in the specification list entries.

Field descriptions

"Characteristic key" tab

"Characteristic" group

Area

Specifies the area for which the specification list entries are to apply.

Specification no.

Number of the specification

MOC_SpecificationListQM.docx

Version: 1.3.5417

Page 3 of 8

Specification List

Version no.

Version number of the specification

Active

Checkbox. Shows whether the entry is active or inactive.

Workplace

Indicates the workplace.

Please note: The definition of machine-related specification list entries is not supported by default

(standard).

This field can be used for customer-specific implementations in order to define machine-related

inspections for the same article. This might be required if different types of machines of are used.

Machine designation

Designation of the workplace/machine

Resource

A resource (e.g. tool) may be indicated.

Designation

Name of the resource

Characteristic no.

Unique number of the characteristic

Characteristic designation

Name of the selected characteristic number

Operation

Number of the operation

Operation designation

Designation of the operation

"Properties" group

Characteristic type

Variable, attributive or inspection chart

Input type

Specifies whether data is collected manually or automatically.

Special case

Indicates whether this characteristic does no longer need to be checked after x "pass" inspections

in a row.

MOC_SpecificationListQM.docx

Version: 1.3.5417

Page 4 of 8

Specification List

Number of pass inspections in a row

The  number  of  "pass"  inspections  in  a  row  that  is  required  for  the  characteristic  to  be  no  longer

required to be checked.

No characteristic

Specifies  whether  this  characteristic  is  not  required  to  be  checked  for  the  combination  of  the

indicated key fields.

"Article" group

Article number

Article number for this specification list entry

Article designation

Designation of the selected article number

Drawing issue number

Drawing issue number of the selected article number

"Companies" group

Customer number:

Customer no.

Customer name

Customer name of the selected customer number

Supplier number

Supplier no.

Supplier name

Supplier name of the selected supplier number

The key fields of the "characteristic key" tab can no longer be changed if a list entry is changed

(edited).

"Specifications" tab

 Go to

The fields included in the  "specifications" tab correspond  to  those of the characteristic master data and

are described in the documentation MOC_CharacteristicsQm.

MOC_SpecificationListQM.docx

Version: 1.3.5417

Page 5 of 8

Specification List

"Chart 1/2" tab

 Go to

The  fields  included  in  the  "chart  1/2"  tab  correspond  to  those  of  the  characteristic master  data  and  are

described in the documentation MOC_CharacteristicsQm.

Default values chart 1/2

 Go to

The fields included in the "default values chart 1/2" tab correspond to those of the characteristic master

data and are described in the documentation MOC_CharacteristicsQm.

MOC_SpecificationListQM.docx

Version: 1.3.5417

Page 6 of 8

Editing functions

The following dialog opens to edit a data record:

Specification List

Toolbar

The below-mentioned additional functions are available besides the standard functions.

  Activate

Function authorization: sclq.active

Activates a specification list entry. A previously released version is automatically deactivated.

MOC_SpecificationListQM.docx

Version: 1.3.5417

Page 7 of 8

Specification List

 Deactivate

Function authorization: sclq.release

Deactivates a specification list entry. The specification list entry is no longer used.

MOC_SpecificationListQM.docx

Version: 1.3.5417

Page 8 of 8


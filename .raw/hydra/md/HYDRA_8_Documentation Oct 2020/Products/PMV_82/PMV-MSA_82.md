Manual

MSA - Measurement System
Analysis
PMV-MSA 8.2

Version 1.0.23049

Last changed on: 02.09.2020

                                                                                      MSA - Measurement System Analysis

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PMV-MSA_82.docx

Version: 1.0.23049

Page 2 of 32

                                                                                      MSA - Measurement System Analysis

Contents

1  Measurement System Analysis – MSA ........................................................ 4

2

Inspection planning ...................................................................................... 5

3  MSA (Measure System Analysis) - statistical values ................................. 30

PMV-MSA_82.docx

Version: 1.0.23049

Page 3 of 32

                                                                                      MSA - Measurement System Analysis

1  Measurement System Analysis – MSA

Purpose

You use the  product  Measurement  System  Analysis -  MSA to perform a measurement system analysis

according to the type 2 and type 3 gage study. This analysis is part of the test equipment management.

Implementation notes

You can use the product Measurement system analysis - MSA to identify statistical values for measuring

equipment.  Using  these  statistical  values,  you  can  assess  the  capability  of  measuring  equipment  for

specific inspection processes.

Integration

The  product  Measurement  System  Analysis  -  MSA  is  part  of  the  test  equipment  management.  The

inspection planning is the basis for the execution of a measurement system analysis. The measurement

system analysis itself is performed as part of the calibration inspection requirement. You call the analysis

in the toolbar of the inspection step characteristics of a calibration inspection requirement.

Features

The following functions are available:

  Extension of the inspection planning to perform measurement system analyses



Identification  of  statistical  values  for  the  measurement  system  analysis  to  prove  that  the  test

equipment  is  suitable  (variations  according  to  measuring  instrument  or  inspector,  comparability,

variations from part to part, etc.).



Integration of type 2 and type 3 gage study

PMV-MSA_82.docx

Version: 1.0.23049

Page 4 of 32

                                                                                      MSA - Measurement System Analysis

2

Inspection planning

Overview

Menu

Quality management  In-production inspection  Inspection planning

Quality management  Goods receipt  Inspection planning

Quality management  Goods issue  Inspection planning

Quality management  Initial sample inspection  Inspection planning

Quality management  Gage management  Inspection planning

Transaction code

iplp1

Function authorization

iplp

Available user fields

Where

Object type/user field key

Source (type)

Inspection plan:
Table and detail view

Inspection plan
characteristics:
Table and detail view

Production: CPPL/FEP
Goods receipt: CPPL/WEP
Goods issue: CPPL/WAP
Initial sample: CPPL/EMU
Gage management: CPPL/PMV

Production: CPPLMM/FEP
Goods receipt: CPPLMM/WEP
Goods issue: CPPLMM/WAP
Initial sample: CPPLMM/EMU
Gage management: CPPLMM/PMV

QM

QM

How to configure user fields?

Which user field types are available?

Purpose

A careful inspection planning is usually the most important function, as inspection plans are the basis for

the generation of inspection orders and the resulting inspections. This is true for inspections in the goods

receipt  process,  during  production  and  in  the  goods  issue  process.  It  also  applies  for  the  inspection  of

initial samples and the calibration of test and measuring equipment. As the requirements of an inspection

planning are almost identical in all areas, the HYDRA inspection planning functions are almost identical

for all these areas.

In  general,  master  data  catalogs  help  the  user  to  generate  inspection  plans.  Therefore,  careful

maintenance of master data is very important.

PMV-MSA_82.docx

Version: 1.0.23049

Page 5 of 32

                                                                                      MSA - Measurement System Analysis

1If you start the application Inspection Planning using the transaction code, you cannot create a

new inspection plan.

Integration

You  require  the  inspection  plan  to  generate  inspection  requirements,  inspection  steps  and  the  resulting

inspections/calibrations.

The generated inspection requirements include the used inspection plan. Also some evaluations use the

inspection  planning  You  can  thus  expand  the  basic  data  of  a  control  chart  of  an  inspection  order

characteristic by the data of the same inspection plan number. The same is possible for the global control

chart  evaluation.  Here,  you  can  use  specific  filter  fields  of  the  inspection  plan.  The  global  control  chart

evaluation does not integrate calibration data and thus you cannot filter by calibration inspection plans.

Another  essential  relation  is  established  to  the  production  control  plan.  You  cannot  create  a  production

control plan without having generated inspection plans beforehand.

Requirements

To  create  inspection  plans,  you  must  maintain/edit  the  relevant  master  data,  The  identification  of  the

master data, that you must maintain, depends on the respective application. However, it is a fundamental

to edit the article and the characteristics beforehand. If you create inspection plans for article groups, you

must first create the article groups.

Selection criteria

The  following  list  shows  some  of  the  available  selection  criteria.  Self-explanatory  filter  options  are  not

listed.

Area

Selection list of the configured areas of in-production inspection, goods receipt and goods issue. By

default, the following areas are available:

In-production inspection: Production

Goods receipt: Goods receipt

Goods issue: Goods issue

Initial sample: Initial sample inspection

Gage management: Gage management

PMV-MSA_82.docx

Version: 1.0.23049

Page 6 of 32

                                                                                      MSA - Measurement System Analysis

Active

Enable this option to narrow down the list of inspection plans to view only active inspection plans. If

this  option  is  disabled,  the  list  only  includes  inspection  plans  with  a  status  "in  process"  or

"released". The third state of this option (grayed out) shows all  inspection plans. This is the initial

state.

Article number

Filters the article number in case of inspection plans based on articles.

Article designation

Filters the article designation/name in case of inspection plans based on articles.

Article group

Click the icon

 to call the article group tree, if you want to filter the inspection plan for an article

group. There is a function to accept and cancel the activity.

Operation

Operation number

Customer number

Enter the number directly or call the customer catalog and select an entry to take it over.

Supplier number

Enter the number directly or call the supplier catalog and select an entry to take it over.

Manufacturer number

Enter the number directly or call the customer catalog and select an entry to take it over.

Field descriptions

Inspection plan header

Area, inspection plan number, inspection plan index

The  "Area",  "Inspection  plan  number"  and  "Inspection  plan  index"  uniquely  identify  the  existing

inspection  plans.  Select  the  area.  Enter  alphanumeric  characters  for  the  inspection  plan  number

and inspection plan index. All three fields are mandatory fields.

PMV-MSA_82.docx

Version: 1.0.23049

Page 7 of 32

                                                                                      MSA - Measurement System Analysis

The input in these three fields must be unique, i.e. no other inspection plan may exist that already

includes  this  information.  If  you  assign  a  structured  inspection  plan  number,  you  can  include

specific information. This information might be helpful later on for sorting. As an alternative, you can

also use the article number or the number of the test equipment group as inspection plan number.

The  inspection  plan  index  corresponds  to  the  inspection  plan  version.  If  you  must  modify  an

existing inspection plan version, but it is not possible to change the inspection plan as it has already

been used for the generation of an inspection order, you must copy the original inspection plan and

change  the  inspection  plan  index  (e.g.  increment  by  one).  You  should  keep  the  inspection  plan

number with regard to subsequent evaluations, if possible (e.g. display of order-independent control

charts where the inspection plan versions are different and the inspection plan number is identical).

If  you  generate  calibration  inspection  plans,  you  can  only  enter  24  characters  into  the  field

Inspection  plan.  Activity  calendar:  Depending  on  the  system  configuration,  you  enter  the

inspection plan number in the field Project number. There, the field Project number is restricted

to 24 characters.

Inspection plan type

There  are  two  types  of  inspection  plans:  "Inspection  plan  of  articles"  and  "Inspection  plan  of

groups". If you select "Inspection plan of articles", you assign an article from the article master data

to generate an inspection plan for this article. If you want to generate an inspection plan for a group

of  articles,  select  the  type  "Inspection  plan  of  groups".  You  can  then  select  an  article  group.  The

selected article group is displayed in a separate field within the tree structure.

Article

Enter  the  article  number.  If  you  know  the  article  number,  you  can  directly  enter  it.  If  not,  you  can

open  the  article  catalog  and  identify  and  transfer  the  requested  article  using  the  filter  and  sort

criteria.  Select  an  article  to  take  over  the  drawing  issue  number,  the  article  designation,  the

customer article number and the drawing number from the master data record. The respective data

is then displayed in the corresponding fields.

If  the  field  Article  number  or  Article  group  is  shown  in  the  test  equipment  management,  you

must not make an entry here.

Drawing issue number

The drawing issue number can be entered directly, just as it is the case for the article number.

If you directly enter the article number and the drawing issue number, the master data record is

identified with this information when you save the data. The fields article designation, customer

article number and drawing number are then populated and displayed.

PMV-MSA_82.docx

Version: 1.0.23049

Page 8 of 32

                                                                                      MSA - Measurement System Analysis

The  article  is  uniquely  identified  by  the  combination  of  article  and  drawing  issue  number.  It  is

not obligatory to define and use a drawing issue number.

If the field “Drawing issue number” is shown in test equipment management, you may not enter

any values here.

Operation assignment

  You can select between two assignment types: "One insp. plan for each OP" and "One insp. plan for

all OPs".

  Assign  the  operation  type  to  define  if  the  inspection  plan  you  want  to  create  includes  the

characteristics of different operations ("one inspection plan for all OPs") or if the inspection plan only

includes the characteristics of one operation. If you select the setting "One inspection plan for each

OP",  the  fields  "Operation"  and  "Operation  designation"  are  shown.  In  any  other  case,  operation

details are assigned in the area of inspection plan characteristics. If possible, you should select the

option  “One  inspection  plan  for  all  OPs”.  You  can  then  print  all  inspection  characteristics  of  an

article, although it includes several operations.

In case there is no assignment to a production order, you should use the option "One inspection

plan for all OPs". The advantage is that you must only enter the "fictitious" operation once in the

inspection  plan  header,  and  not  for  each  inspection  plan  characteristic.  This  inspection  plan

method requires a suitable system configuration that must be carried out by MPDV consulting.

Operation, operation designation

  If  you  use  operations,  you  must  only  complete  one  of  the  two  fields  "operation"  or  "operation

designation".  If  you  want  to  automatically  generate  an  inspection  requirement/an  inspection  order

when  you  log  on  an  operation/production  order,  you  must  only  enter  the  operation  number  in  the

"Operation" field.

  Note: These fields are used as search criteria when you generate inspection orders later on. That is:

If you only enter the designation of the operation in the inspection plan,  you must include this and

only this information when you generate an inspection order later on.

Also  if  there  is  no  assignment  to  a  production  order  (i.e.  goods  receipt  and  test  equipment

management),  you  must  enter  a  "fictitious"  operation  (e.g.  9999).  This  is  required  for  the

generation of an inspection step later on.

PMV-MSA_82.docx

Version: 1.0.23049

Page 9 of 32

                                                                                      MSA - Measurement System Analysis

IO (inspection order) + Inspection station

If you enable the option "An IO for each inspection station", the assignment of inspection stations is used

when  it  comes  to  inspection  plan  characteristics.  In  this  case,  the  system  generates  a  separate

inspection step for each inspection station if the CAQ system option 1157 is configured accordingly.

The  separate  inspection  steps  are  also  created  with  identical  operations.  If  you  want  to  use  the

specific AIP inspection modes for the goods receipt, the inspection in the laboratory/measuring room

and  for  calibration,  you  must  select  the  option  "An  IO  for  each  inspection  station".  Only  with  this

configuration, the system includes the information on the planned machine/machine group later on

when  the  inspection  step  is  generated.  It  is  not  necessary  to  assign  an  inspection  station  in  this

case.

Released/Active

Shows  whether  the  inspection  plan  is  "released"  or  additionally  has  the  status  "active".  If  the

inspection plan is released or active, the respective options are checked. An inspection plan is only

released  and activated, i.e. its status  is changed,  if  you  use the respective toolbar functions.  You

must release the inspection plan before it can be activated.

When  you  generate  inspection  orders  at  a  later  point  in  time,  the  system  only  uses  active

inspection plans.

Released by / on

Shows  the  HYDRA  user  who  has  released  the  inspection  plan.  The  release  date  is  displayed

additionally.

Cavity assignment

You require the authorization "ipl_cav" to display this field.

You can select "None" or "Sample" to assign cavities.

If this field is not available, you require a new program version of this application.

An inspection based on cavities is only possible, if the inspection is based on inspection points

and characteristics.

With  the  function  extension  for  the  production  inspection,  there  is  the  additional  option  of  a

piece-related collection based on cavities.

If the inspection is based on samples and/or pieces, you cannot assign cavities.

PMV-MSA_82.docx

Version: 1.0.23049

Page 10 of 32

                                                                                      MSA - Measurement System Analysis

Valid from/till

The field entries are for information purposes only.

Type of inspection

Characteristic-related or piece-related inspection

If the inspection is based on characteristics and the sample size is for example 5, the characteristic

is checked completely first. If the inspection is based on pieces, the characteristic is changed every

time a measured value is collected, as all characteristics of one piece are inspected.

You  can  only  use  the  piece-related  inspection,  if  you  collect  data  with  reference  to  inspection

points. If you want to perform a piece-related inspection in the goods receipt process, you must

change the sample-related inspection into an inspection based on inspection points.

An inspection based on cavities is only possible in case of a characteristic-related inspection. If

the inspection is piece-related, you cannot assign cavities.

Action

"Creation of inspection step" or "Create and release inspection step"

Only inspection steps that have been released can be checked.

Customer / Supplier / Manufacturer

If  you  select  a  customer/supplier/manufacturer,  this  inspection  plan  only  applies  for  the  selected

company.  Consequently,  the  customer/manufacturer/supplier  is  a  key  field  of  an  active  inspection

plan. If one of these fields  is populated,  the inspection requirement must also  include a company

entry. Only then, you can use this inspection plan to generate the inspection requirement.

PMV-MSA_82.docx

Version: 1.0.23049

Page 11 of 32

                                                                                      MSA - Measurement System Analysis

Dynamic modification type

Characteristic-related, batch-related or none

You require the authorization "iriscp.dynamic" to display these fields.

Batch-related: Here, the transitional definition, which is used for the dynamic modification, is

specified in the inspection plan header. The initial inspection severity is also specified in the

inspection plan header. You additionally require the reference to the dynamic modification norm in

the inspection plan characteristics. However, the selection is restricted. You can only select dynamic

modification norms that reference the same inspection severity definition as the assigned

transitional definition.

Characteristic-related: The inspection plan characteristics include the references to the transitional

definition, the initial inspection severity and the dynamic modification norm. The inspection severity

definition of the assigned transitional definition and the assigned dynamic modifications norm must

match.

None: The "dynamic modification" function is not enabled for this inspection plan.

Transitional definition

You require the authorization "iriscp.dynamic" to display this field.

This field is only available if a dynamic modification relating to batches or characteristics has been

selected. It provides the possible inspection severities and controls switching between the

inspection severities.

Initial inspection severity

You require the authorization "iriscp.dynamic" to display this field.

This field is only available if a dynamic modification relating to batches or characteristics has been

selected. It defines the inspection severity that is used to inspect the first goods received according

to the basics of the dynamic modification history.

Initial sample form

Use this option to select the form type for the initial sample inspection. Currently, only the form type

"VDA volume 2, 4th edition" is supported. Depending on the form type, a respective list of

categories to generate an initial inspection is shown in the inspection plan characteristics.

Gage method

You  can  edit  the  field  "Process  acc.  to"  in  case  of  a  calibration  inspection  plan.  You  can  select

between  "Standard"  and  "QS9000".  If  you  select  "QS9000",  the  additionally  displayed  fields

(Reference, Acceptance and Amendment) are mandatory fields.

PMV-MSA_82.docx

Version: 1.0.23049

Page 12 of 32

                                                                                      MSA - Measurement System Analysis

Editing functions

The  key  fields  "area",  "inspection  plan"  and  "inspection  plan  index"  cannot  be  changed  in  the  editing

mode.

Toolbar

 Copy

To copy an inspection plan, the following dialog opens.

You can enter the target area type and the target area here. You usually select the values that are

identical to the ones of the source inspection plan. Then enter the new inspection plan number and

inspection  plan  index.  If  you  generate  a  new  version  of  an  existing  inspection  plan,  you  normally

use the identical inspection plan number and only change the inspection plan index.

If the option "Reorganization OP sequence" is activated, the characteristics are created in the new

inspection

plan

with

OP

sequence

numbers

in

increments

of

10.

Activate

Function authorization: iplp.activate

Changes the inspection plan status to "Active".

Deactivate

Function authorization: iplp.deactivate

PMV-MSA_82.docx

Version: 1.0.23049

Page 13 of 32

                                                                                      MSA - Measurement System Analysis

Changes the inspection plan status from "Active" back to "Released".

Release

Function authorization: iplp.release

Changes the inspection plan status from "In process" to "Released".

In process

Function authorization: iplp.inprocess

Changes the inspection plan status from "Released" to "In process".

Document management

Click here to call the Document management.

 Import inspection plan

Function authorization: iplpimport

You can use this function to import inspection plan characteristics for the inspection plan selected.

The system uses a previously created data file for the import.

"Import inspection plan" detail application

Function authorization

Iplpimport

License

FEP-PCF or WEP-PCF and EIS-CFM

You  can  use  the  detail  application  "Import  inspection  plan"  to  add  inspection  plan  characteristics  to  an

inspection plan selected. You use this function if you have previously exported  characteristic data into a

data  file  using  a  CAD  drawing  or  the  HYDRA-FMEA  application.  In  both  cases,  you  first  select  the

configuration file that you want to use for the import.

PMV-MSA_82.docx

Version: 1.0.23049

Page 14 of 32

                                                                                      MSA - Measurement System Analysis

In  the  configuration  file,  you  define  the  characteristic  data  that  is  transferred  from  the  data  file  and  you

define  the  HYDRA  characteristic  fields  where  the  data  is  transferred  to.  To  import  data  from  HYDRA-

FMEA,  you can use the  configuration file "fmea_import.jason". To import data from a CAD drawing, the

system  provides  the  configuration  files  "cad_import_infraconvert.jason"  and  "cad_import_infraconvert-

2018.jason"  by  default.  These  two  configuration  files  are  especially  designed  for  the  export  of  CAD

characteristic  data  using  the  tool  "infra  CONVERT"  or  "infra  CONVERT  2018"  created  by  the  company

Elias GmbH.

If  required,  you  can  create  custom  configuration  files.  For  details,  refer  to  the  procedure  document

"Configuration_InspectionPlanImport".

If the system does not display any configuration files, you must check the respective path configuration. In

the  HYDRA  path  configuration,  the  path  "QMIPLCF"  must  be  available.  If  the  path  "QMIPLCF"  is  not

available,  you  must  create  the  path.  The  below  screenshot  shows  a  possible  path  configuration  for  the

configuration data.

PMV-MSA_82.docx

Version: 1.0.23049

Page 15 of 32

                                                                                      MSA - Measurement System Analysis

When you have selected the configuration file, then you select the import file. For the import of data from

a CAD drawing, enable the selection option "Free path". Using this selection option,  you can select any

import file.

For the import of HYDRA-FMEA characteristic data, enable the selection option "Import path".

PMV-MSA_82.docx

Version: 1.0.23049

Page 16 of 32

                                                                                      MSA - Measurement System Analysis

During  the  previous  export  of  HYDRA-FMEA  characteristic  data,  the  exported  characteristic  data  is

automatically stored in the import path. In the HYDRA path configuration, the URL path is configured for

the  path  "QMIMP".  The  path  "QMIMP"  must  be  available  before  using  the  import  function  for  FMEA

characteristic  data.  If  the  import  path  ist  not  available,  you  must manually  create  the  path.  If  the  import

path  is  available,  you  must  check  the  path  configuration  before  the  first  import.  If  required,  correct  the

specified URL path. It might be required to correct the system, for example.

The below screenshot shows a possible path configuration for the import of HYDRA-FMEA characteristic

data.

PMV-MSA_82.docx

Version: 1.0.23049

Page 17 of 32

                                                                                      MSA - Measurement System Analysis

You  must  not  only  specify  the  HYDRA  path,  but  you  must  also  ensure  that  the  specified  URL  path  is

available on the HYDRA server. If the specified path is not available, you must manually create the path

on  the  HYDRA  server.  You  must  also  check  the  specified  URL  path  for  all  HYDRA  path  configurations

mentioned below. If required, you must change the path configuration.

Before  the  first  import,  you  must  also  create  the  backup  path  "QMIMPBCK"  in  the  HYDRA  path

configuration because the data file is copied into the backup path after the successful import of HYDRA-

FMEA characteristic data. The below screenshot shows a possible path configuration for the backup path.

If you want to re-import HYDRA-FMEA characteristic data after a successful import, you must enable the

selection option "Backup path".

During  the  import  process,  a  log  file  is  created.  To  store  this  log  file,  you  must  create  the  path

"QMIMPERR"  in  the  HYDRA  path  configuration.  The  below  screenshot  shows  a  possible  path

configuration for the log path. If a valid log path is not available, you cannot import characteristic data.

PMV-MSA_82.docx

Version: 1.0.23049

Page 18 of 32

                                                                                      MSA - Measurement System Analysis

For  the  import  of  HYDRA-FMEA  characteristic  data,  you  must  finally  select  the  file  that  you  want  to

import.

The import of characteristic data is always completed using the button

.

When the characteristic data have been imported, a message window shows the number of sucessfully

imported characteristics and the number of not imported characteristics.

Use the button "Show log file" to open a log file. This log file specifies the characteristics that have been

successfully imported and the characteristics that have not been imported.

"Print" – Detail application

Function authorization

iplp.print

PMV-MSA_82.docx

Version: 1.0.23049

Page 19 of 32

                                                                                      MSA - Measurement System Analysis

The  print  dialog  of  the  inspection  plan  header  opens  a  list  of  available  reports.  These  are Word  forms.

The  web  services  that  are  available  in  the  respective  context  determine  the  potential  content  of  these

forms.  The  form  entries,  i.e.  the  content  of  the  list  of  forms  of  the  respective  print  dialog,  are  defined

within  the  master  data  of  quality  management.  Here,  the  basics  for  new  forms  and  the  respective  form

properties  are  also  specified.  You  require  the  respective  license  to  be  able  to  change  the  forms  with

respect to content and design.

Print – Toolbar

There are no other special function buttons in addition to the standard functions/features.

"Inspection plan characteristics" – Detail application

The  detail  application  Inspection  plan  characteristics  is  nearly  identical  to  the  application  of  the

characteristics master data. Therefore, only additional features or modifications are described here.

Go to

For further information on the definition of characteristics, please refer to the functional description in the

document MOC_CharacteristicsQM.

On the level of inspection plan characteristics, the inspection plan header defined beforehand assigns the

respective  inspection  plan  characteristics.  To  assign  inspection  plan  characteristics,  create  a  new  data

record,  open  the  characteristics  catalog  and  accept  the  selected  characteristic.  By  accepting  the

characteristic, all master data entries are copied to the inspection plan characteristic. You can still change

and/or  complete  each  (copied)  piece  of  information.  The  description  of  the  characteristic  is  often

completed to define it in more detail.

You can also create a characteristic that does not exist in the catalog of characteristics. But this is only

recommended  in  exceptional  cases,  as  all  analyses  (e.g.  failure  mode  analysis)  are  based  on

characteristics included in the catalog of characteristics. Consequently, the characteristics catalog should

be maintained.

You can define different properties and settings, before you complete the specific characteristic data.

Field descriptions

Inspection plan characteristics

OP sequence

The  operation  sequence  number  (OP  sequence/AFO)  specifies  the  inspection  sequence.  Entries

must be unique. In the ideal case, operation sequence numbering should be assigned in steps of

10.  You can then add a  new characteristic between  two existing characteristics at a later point  in

time.

PMV-MSA_82.docx

Version: 1.0.23049

Page 20 of 32

                                                                                      MSA - Measurement System Analysis

Characteristic number

Number of the characteristic selected from master data.

Characteristic type

This option specifies whether the collection of measured values (variable) or the identification of the

number  of  detected  failures  (attributive)  is  used  for  the  inspection.  In  case  of  an  attributive

inspection,  the  decision  is  often  only  based  on  the  "pass"  or  "fail"  results.  Further  characteristic

types  are  the  inspection  chart  and  the  information  characteristic.  The  information  characteristic  is

only used to display a document during the inspection process. Subject to the input type, the lower

area of the dialog provides the respective sampling schemes.

Inspection result base

This  setting  defines  whether  all  samples  or  only  the  sample  recorded  last  is  used  to  identify  the

inspection result (pass/fail).

Mandatory inspection

If this option is activated, you must enter at least one measured value for this characteristic, before

you can complete an inspection order including this characteristic.

Calculate characteristic

Identifies a characteristic to be calculated

Formula

Further details can be taken from the manual dealing with the CAQ master data characteristics.

Operation / Operation designation

  this  field  are  only  available,  if  the  setting  "One  inspection  plan  for  all  OPs"  is  activated  in  the

inspection plan header.

  If you want to include a reference to a productive operation in the characteristic, you need only store

the operation number in the field "Operation".

If  you  define  characteristics  of  QM  operations,  we  recommend  to  add  the  operation.  For

characteristics of the same operation, this entry must always be identical.

If  you  define QM operations,  you must be  careful that the  operation created  in  the production

order  later  on  is  not  the  last  operation.  For  example:  If  the  last  productive  operation  is  the

operation  "0030"  and  you  want  to  define  characteristics  with  reference  to  a  QM  operation  for

this operation, you should use "0029" for this QM operation.

PMV-MSA_82.docx

Version: 1.0.23049

Page 21 of 32

                                                                                      MSA - Measurement System Analysis

Initial sample creation

Selection list of categories for the creation of an initial sample inspection. The content depends on

the form type selected in the inspection plan header. In the initial sample report, the inspection plan

characteristics are grouped by the selected category for the creation and for each group a separate

page is printed.

Copy characteristic

You  can  define  here  which  characteristic  is  copied  from  an  initial  sample  inspection  plan  into  a

production  plan,  for  example.  Only  those  characteristics  are  copied  that  have  been  specified  as

relevant in this field.

Details

This option specifies if - for this characteristic - the contents of the "details" tab are defined within

the inspection plan or if they are identified using the available master data characteristic when an

inspection requirement is later generated based on this inspection plan. If the  "from characteristic

catalog" option is selected, the "details" tab is hidden. The option  "from characteristics catalog" is

useful, if the same characteristic specifications must be defined for several articles (also for several

article  groups).  In  this  case,  specifications  can  be  defined  centrally  within  the  master  data.  This

reduces the input and update efforts considerably.

Specifications

This option specifies if - for this characteristic - the contents of the "specifications" tab are defined

within the  inspection plan  or if they are  identified using the available master data characteristic or

an entry from the specification list when an inspection requirement is later generated based on this

inspection  plan.  If  you  enable  the  option  "from  list"  or  "from  characteristic  catalog",  the  tabs

"specifications", "chart 1", "default values chart 1", "chart 2" and "default values chart 2" are hidden.

The  option  "from  list"  is  only  useful  with  an  inspection  plan  for  article  groups.  You  use  the

specification  list  if  the  specifications  for  a  specific  characteristic  are  different  for  the  individual

articles.

No cavity

You require the authorization "ipl_cav" to display this field.

You can use this option to label a characteristic as not relevant to cavities, although the respective

inspection  requirement  specifies  that  the  relevant  characteristics  are  (actually)  to  be  recorded  in

relation to cavities.

You must always enable this checkbox for attributive characteristics and inspection charts.

PMV-MSA_82.docx

Version: 1.0.23049

Page 22 of 32

                                                                                      MSA - Measurement System Analysis

Dynamically modified

You require the authorization "iriscp.dynamic" to display this field.

This field is only available if a dynamic modification relating to batches or characteristics has been

activated in the inspection plan header. You can use this option to specify that a characteristic

should not be modified dynamically, although the dynamic modification option is selected in the

inspection plan header.

Transitional definition

You require the authorization "iriscp.dynamic" to display this field.

This field is only available if a dynamic modification relating to batches or characteristics has been

activated in the inspection plan header. The selected transitional definition provides the possible

inspection severities and controls switching between these different inspection severities. For the

batch-related dynamic modification, the transitional definition is assigned in the inspection plan

header and in this case the transitional definition is not available on the level of inspection plan

characteristics.

Initial inspection severity

You require the authorization "iriscp.dynamic" to display this field.

It defines the inspection severity that is used to inspect the first goods received according to the

basics of the dynamic modification history. Only the inspection severities of the previously selected

transitional definition are available. For the batch-related dynamic modification, the transitional

definition is assigned in the inspection plan header and in this case the transitional definition is not

available on the level of inspection plan characteristics.

Standard

You require the authorization "iriscp.dynamic" to display this field.

This field is only available if a dynamic modification relating to batches or characteristics is

activated in the inspection plan header and if this characteristic is actually specified as relevant to

dynamic modification. The system uses the master data to assign the dynamic modification norm.

Inspection level

You require the authorization "iriscp.dynamic" to display this field.

This field is only available if a dynamic modification relating to batches or characteristics is

activated in the inspection plan header and if this characteristic is actually specified as relevant to

dynamic modification. An inspection level can only be selected if the assigned norm corresponds to

DIN ISO 3951 or DIN ISO 2859.

AQL

You require the authorization "iriscp.dynamic" to display this field.

This field is only available if a dynamic modification relating to batches or characteristics is

activated in the inspection plan header and if this characteristic is actually specified as relevant to

dynamic modification. You can only select an AQL value (Accepted Quality Limit) if the assigned

norm corresponds to DIN ISO 3951 or DIN ISO 2859..

PMV-MSA_82.docx

Version: 1.0.23049

Page 23 of 32

                                                                                      MSA - Measurement System Analysis

Method

You require the authorization "iriscp.dynamic" to display this field.

This field is only available if a dynamic modification relating to batches or characteristics is

activated in the inspection plan header and if this characteristic is actually specified as relevant to

dynamic modification. A method can only be selected if the assigned norm corresponds to DIN ISO

3951.

Sample group

You require the authorization "ipl_ipsampling" to display this field.

This field specifies which sample group this characteristic belongs to. The sample group specifies

which characteristics are part of a sample/sampling characteristic.

Sampling

You require the authorization "ipl_ipsampling" to display this field.

If a characteristic has been assigned to a sample group, this option specifies if you use this

characteristic to generate a sample. In this case, you call it a sampling characteristic. Activate this

option to generate sampling characteristics. You must assign a sample group to the sampling

characteristic.

If you want to inspect a sample using this characteristic, this option is not active.

If these fields are not available, you require a new program version of this application.

You  must  configure  in  the  inspection  plan  characteristics,  which  are  assigned  to  a  sample

group,  that  the  details  are  provided  by  the  inspection  plan  and  not  by  the  characteristics

catalog, because you can only assign sample groups in the inspection plan.

All sample characteristics of one sample group must be included in the same inspection step. In

the  inspection  plan,  the  combination  of  inspection  station  (machine,  machine  group)  and

operation must be identical for the sample characteristics.

If  you  want  to  combine  the  inspections  for  the  producing  machine  (including  sampling

characteristic)  and  the  inspections  of  the  samples  in  one  operation,  you  must  consider  the

following issues when you plan the characteristics for this operation:

  The characteristics, which are used for the inspections of the producing machine, and

the sampling characteristic must include a specific inspection station (e.g. MACHINE).

  The  characteristics,  which  are  used  for  the  inspections  of  the  samples,  must  be

PMV-MSA_82.docx

Version: 1.0.23049

Page 24 of 32

                                                                                      MSA - Measurement System Analysis

assigned to a different inspection station (e.g. LAB).



In  the  respective  inspection  plan,  you  must  set  the  configuration  "IO  +  inspection

station" to "An IO for each inspection station".

  The  terminal  the  producing  machine  has  been  assigned  to  must  be  configured

specifically. For the above-mentioned example, you must assign the inspection station

"MACHINE" in tab "QM functions".



In the configuration of the terminal where the samples are inspected, you must assign

the inspection station "LAB" in tab "QM functions" for the above-mentioned example.

Measurement system analysis

If the inspection plan is a QS9000 inspection plan, an additional tab Measurement system analysis

is displayed.

Besides  the  sample  size  that  you  edit  in  tab  Specifications,  you  must  edit  the  key  data  of  the

measurement system analysis here.

Go to

The  other  fields  of  the  respective  tabs  correspond  to  those  of  the  characteristic  master  data  and  are

outlined in the documentation entitled MOC_CharacteristicsQM.

Inspection plan characteristics – Toolbar

Create new data record

Select a characteristic from the master data. All characteristic details of the master data

characteristic are transferred to the inspection plan characteristic.

When  you  select  a  characteristic  from  the  master  data,  also  the  documents  assigned  to  the

master data characteristic are included in the inspection plan characteristic.

PMV-MSA_82.docx

Version: 1.0.23049

Page 25 of 32

                                                                                      MSA - Measurement System Analysis

 Copy

To copy inspection plan characteristics, the data of the selected characteristic are opened in insert

mode. All fields can be modified. To save the data, you must assign an OP sequence number that

does not yet exist in this inspection plan.

The  documents  of  the  inspection  plan  characteristic,  for  which  the  “copy”  button  has  been

clicked, are transferred.

 Copy characteristics

Select  a  target  inspection  plan.  The  selected  characteristics  are  then  copied  into  the  specified

inspection  plan.

If

the

target

inspection  plan  already

includes  characteristics,

the  new

characteristics are created with OP sequence numbers in steps of 10.

PMV-MSA_82.docx

Version: 1.0.23049

Page 26 of 32

                                                                                      MSA - Measurement System Analysis

The documents of the different characteristics are also transferred.

Document management

Click here to call the Document management.

"Inspection plan documents“ and "Documents of inspection plan

characteristics“ – Detail applications

The above screenshot shows how an inspection plan document is assigned.

PMV-MSA_82.docx

Version: 1.0.23049

Page 27 of 32

                                                                                      MSA - Measurement System Analysis

The above screenshot shows how a document of an inspection plan characteristic is assigned.

You  can  assign  any  number  of  documents  to  each  inspection  plan  and  each  inspection  plan

characteristic,  if  the  tab  "Inspection  plan  documents"  or  the  tab  "Characteristic  documents"  has  been

activated  in  the  master  detail  grid.  If  you  activate  these  tabs,  the  toolbar  provides  the  corresponding

buttons to edit documents.

You can use all formats registered by Windows for the documents you want to assign. You can therefore

assign  simple  documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos.  You  only  have  to

make  sure  to  install  a  program  that  is  able  to  display  the  used  format.  The  program  link  stored  in

Windows opens the documents.

The  file  types  "File",  "URL",  and  "Text"  are  available.  The  file  name  including  the  path  may  be  entered

manually for the "file" type. The file type “URL” allows to access the internet or intranet. Use the file type

"text" to directly enter text.

You can assign a designation/name to each document that is added. You can also define the list order of

the  documents.  Use  the  field  "position"  to  define  the  order  (numeric  input).  Position  numbers  must  be

distinct in this list. Enable the checkbox Display to define that the document is displayed during inspection

process.

PMV-MSA_82.docx

Version: 1.0.23049

Page 28 of 32

                                                                                      MSA - Measurement System Analysis

"Inspection plan documents“ and "Documents for inspection plan

characteristics" – Toolbar

In addition to the standard functions, the button to show documents is available.

Show documents

If  a  document  link  is  stored,  this  button  opens  and  shows  the  linked  document.  However,  a

program, which can show the linked file type, must be installed in the PC.

PMV-MSA_82.docx

Version: 1.0.23049

Page 29 of 32

                                                                                      MSA - Measurement System Analysis

3  MSA (Measure System Analysis) - statistical values

Overview

Menu

Not applicable, since the call is made exclusively from another application.

Transaction code

Not applicable, since the call is made exclusively from another application.

Function authorization

valuemsa

You  can  only  call  this  application  if  you  use  the  toolbar  of  the  inspection  step  characteristics  in  a

calibration  inspection  request.  Use  the  following  button  in  the  toolbar  of  the  inspection  step

characteristics:

You  can  manage  all  inspection  results  for  the  measurement  system  analysis  in  the  application  MSA

statistical values.  Only the fields "Measured value" and "Comment" can be edited.

The user executes the input and assignment of inspector/sampling.

You can save a capability rating for the characteristic in the tab "Statistics MSA“.

PMV-MSA_82.docx

Version: 1.0.23049

Page 30 of 32

                                                                                      MSA - Measurement System Analysis

Purpose

The application can execute a capability rating of test equipment.

A calculation of the MSA statistical value is done after all measured values are validated. This means all

corresponding samples have been completed.  The system does not carry out a statistic if not all

measured values have been calculated.

Fields referring to these values will not be calculated if the calculation of individual components of the

MSA is mathematically impossible.

The implementation is currently restricted to method 2 and 3 of the measured system analysis and can

only be done for variable characteristics.  The respective measured values shall be given in relative

values.

Integration

Requirements

Field descriptions

Tab "Statistic MSA"

Reference

Taken from a superordinate inspection requirement

Acceptance

Taken from a superordinate inspection requirement

Amendment

Taken from a superordinate inspection requirement

PMV-MSA_82.docx

Version: 1.0.23049

Page 31 of 32

                                                                                      MSA - Measurement System Analysis

Editing functions

The following dialog opens to edit a data record:

Toolbar

 Capability rating

The capability rating takes the current measured system analysis values into the characteristic.

PMV-MSA_82.docx

Version: 1.0.23049

Page 32 of 32


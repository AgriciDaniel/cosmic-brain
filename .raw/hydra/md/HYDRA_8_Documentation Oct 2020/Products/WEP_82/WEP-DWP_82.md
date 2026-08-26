Manual

Dynamic Modification of
Goods Receipt Inspections
WEP-DWP 8.1

Version 1.0.23049

Last changed on: 02.09.2020

  Dynamic Modification of Goods Receipt Inspections

Copyright

©Copyright 2015 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WEP-DWP_82.docx

Version: 1.0.23049

Page 2 of 37

  Dynamic Modification of Goods Receipt Inspections

Contents

1  Dynamic Modification of Goods Receipt Inspections - Overview ................. 4

2

Inspection planning ...................................................................................... 5

3

Inspection Severity Definition ..................................................................... 30

"Inspection severity" detail application ......................................................................... 31

4  Transitional Definitions ............................................................................... 32

"Transition" detail application ...................................................................................... 33

5  Dynamic Modification Norm ....................................................................... 35

Detail application sampling plan .................................................................................. 36

WEP-DWP_82.docx

Version: 1.0.23049

Page 3 of 37

  Dynamic Modification of Goods Receipt Inspections

1  Dynamic Modification of Goods Receipt Inspections -

Overview

Purpose

This  component  expands  the  inspection  planning  functions  and  the  processing  of  inspection  plans  to

include  dynamic  modification  of  the  inspection  size  based  on  the  batch  size  and  historic  inspection

decisions.

Implementation Considerations

If  the  same  articles  are  received  repeatedly  from  the  same  supplier  with  a  corresponding  high  batch

throughput, use of this component is recommend since dynamic modification can dynamically modify the

inspection size and in the case of good quality, can reduce the inspection size.

Integration

This component mainly serves the components "Production Control Inspection Planning" and "Recording

and Information Functions for Quality Data".

Features

The following functions are available:

  Use of DIN ISO 2859 and DIN ISO 3951 standards

  Definition of custom inspection severities with their translation rules

  Creation of custom sampling plans

  Choice of characteristic or batch related dynamic modification of inspection sizes

  Evaluation  of  dynamic  modification  history  with  the  capability  to  correct  the  current  inspection

severity

WEP-DWP_82.docx

Version: 1.0.23049

Page 4 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 5 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 6 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 7 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 8 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 9 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 10 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 11 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 12 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 13 of 37

  Dynamic Modification of Goods Receipt Inspections

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

inspection plan selected. You use this function if you have previously exported characteristic data into a

data  file  using  a  CAD  drawing  or  the  HYDRA-FMEA  application.  In  both  cases,  you  first  select  the

configuration file that you want to use for the import.

WEP-DWP_82.docx

Version: 1.0.23049

Page 14 of 37

  Dynamic Modification of Goods Receipt Inspections

In  the  configuration  file,  you  define  the  characteristic  data  that  is  transferred  from  the  data  file  and  you

define  the  HYDRA  characteristic  fields  where  the  data  is  transferred  to.  To  import  data  from  HYDRA-

FMEA,  you can use the configuration file "fmea_import.jason". To import data from a CAD drawing, the

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 15 of 37

  Dynamic Modification of Goods Receipt Inspections

When you have selected the configuration file, then you select the import file. For the import of data from

a CAD drawing, enable the selection option "Free path". Using this selection option,  you can select any

import file.

For the import of HYDRA-FMEA characteristic data, enable the selection option "Import path".

WEP-DWP_82.docx

Version: 1.0.23049

Page 16 of 37

  Dynamic Modification of Goods Receipt Inspections

During  the  previous  export  of  HYDRA-FMEA  characteristic  data,  the  exported  characteristic  data  is

automatically stored in the import path. In the HYDRA path configuration, the URL path is configured for

the  path  "QMIMP".  The  path  "QMIMP"  must  be  available  before  using  the  import  function  for  FMEA

characteristic  data.  If  the  import  path  ist  not  available,  you  must manually  create  the  path.  If  the  import

path  is  available,  you  must  check  the  path  configuration  before  the  first  import.  If  required,  correct  the

specified URL path. It might be required to correct the system, for example.

The below screenshot shows a possible path configuration for the import of HYDRA-FMEA characteristic

data.

WEP-DWP_82.docx

Version: 1.0.23049

Page 17 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 18 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 19 of 37

  Dynamic Modification of Goods Receipt Inspections

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

10.  You can then add a new characteristic between  two existing characteristics at a  later point  in

time.

WEP-DWP_82.docx

Version: 1.0.23049

Page 20 of 37

  Dynamic Modification of Goods Receipt Inspections

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

If  you  define QM operations,  you must be careful that the  operation created  in  the production

order  later  on  is  not  the  last  operation.  For  example:  If  the  last  productive  operation  is  the

operation  "0030"  and  you  want  to  define  characteristics  with  reference  to  a  QM  operation  for

this operation, you should use "0029" for this QM operation.

WEP-DWP_82.docx

Version: 1.0.23049

Page 21 of 37

  Dynamic Modification of Goods Receipt Inspections

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

the inspection plan or if they are identified using the available master data  characteristic when an

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 22 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 23 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 24 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 25 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 26 of 37

  Dynamic Modification of Goods Receipt Inspections

The documents of the different characteristics are also transferred.

Document management

Click here to call the Document management.

"Inspection plan documents“ and "Documents of inspection plan

characteristics“ – Detail applications

The above screenshot shows how an inspection plan document is assigned.

WEP-DWP_82.docx

Version: 1.0.23049

Page 27 of 37

  Dynamic Modification of Goods Receipt Inspections

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

WEP-DWP_82.docx

Version: 1.0.23049

Page 28 of 37

  Dynamic Modification of Goods Receipt Inspections

"Inspection plan documents“ and "Documents for inspection plan

characteristics" – Toolbar

In addition to the standard functions, the button to show documents is available.

Show documents

If  a  document  link  is  stored,  this  button  opens  and  shows  the  linked  document.  However,  a

program, which can show the linked file type, must be installed in the PC.

WEP-DWP_82.docx

Version: 1.0.23049

Page 29 of 37

  Dynamic Modification of Goods Receipt Inspections

3

Inspection Severity Definition

Summary

Menu

Master data  Quality management  Inspection severities

Transaction code

isev

Function authorization

isev

Inspection  severities  represent  the  single  steps  of  dynamic  modification  and  are  an  integral  part  of

dynamic modification.

Utilization

The  “inspection  severity  definition”  field  uniquely  identifies  inspection  severity  catalogs  within  the

corresponding QM applications. This field is the key field at the same time, i.e. while saving it is checked

whether there is already a data record with this key information.

Different  inspection  severity  catalogs/definitions  can  be  created.  They  are  assigned  the  individual

inspection severities. By default, an inspection severity catalog includes the inspection severities of DIN

ISO 2859 or DIN ISO 3951. These are the inspection severities:

  n = normal



r = reduced



v = increased and

  a = suspended.

The inspection severity number and designation may be selected individually.

Integration

The following applications use inspection severities.

  Transitional definition (master data – quality management)

  Dynamic modification norm (master data – quality management)



Inspection planning (inspection plan header and inspection plan characteristics) for goods receipt

and goods issue

  Dynamic modification history

WEP-DWP_82.docx

Version: 1.0.23049

Page 30 of 37

  Dynamic Modification of Goods Receipt Inspections

Prerequisite

There  are  no  functional  requirements  that  have  to  be  met  before  inspection  severities  can  be  defined.

However,  this  application,  if  considered  individually,  is  not  functional.  That  is  why  the  applications

mentioned in the section entitled "integration" have to be used.

Selection criteria

Selection criteria are self-explanatory and are not described separately.

Field descriptions

The available fields are self-explanatory and are not explained separately.

Toolbar

Inspection severity definition

Assignment of inspection severities to an inspection severity catalog

Function  to  assign  inspection  severities  to  a  previously  defined  and  selected  inspection  severity

catalog.

Detail applications

"Inspection severity" detail application

The  inspection  severity  list  shows  all  entries  (the  actual  inspection  severities)  that  are  defined  for  an

inspection severity catalog. The detail application of an inspection severity presents the single pieces of

information in a clear overview.

Field descriptions

Position

The "position" field defines the order of inspection severities within the list.

Standard

Describes an inspection severity that is to be considered as standard inspection severity.

The other available fields are self-explanatory and are not explained separately.

WEP-DWP_82.docx

Version: 1.0.23049

Page 31 of 37

  Dynamic Modification of Goods Receipt Inspections

4  Transitional Definitions

Summary

Menu

Master data  Quality management  Transitional definitions

Transaction code

tdef

Function authorization

tdef

The transitional definitions define according to which rules inspection severities of an inspection severity

definition are switched within dynamic modification.

Utilization

The  “transitional  definition”  field  uniquely  identifies  a  transitional  definition  in  the  corresponding  QM

applications.  This field is the key field  at the same time, i.e.  while saving  it  is checked whether there  is

already a data record with this key information.

The  transitional  definition  "DIN_ISO  is  an  initially  existing  entry,  which  can  neither  be  changed  nor

deleted.

Different transitional definitions can be created. They are, in turn, assigned the transitional rules between

the individual inspection severities. Each transitional definition must  be assigned a catalog of inspection

severities to make sure that a range of inspection severities is available for defining the rules.

Integration

The following applications use transitional definitions.

  Dynamic modification norm (master data – quality management)



Inspection planning (inspection plan header and inspection plan characteristics) for goods receipt

and goods issue

Prerequisite

Inspection  severities  need  to  be  created  before  transitional  definitions  can  be  defined.  The  "transitional

definition" application, if considered individually, is not functional. To make it a useful application, it has to

be used within inspection planning.

Selection criteria

Selection criteria are self-explanatory and are not described separately.

WEP-DWP_82.docx

Version: 1.0.23049

Page 32 of 37

  Dynamic Modification of Goods Receipt Inspections

Field descriptions

The available fields are self-explanatory and, as a result, not explained separately.

There is a selection list including acceptance function to assign inspection severity definitions.

Toolbar

Transitional definition

Assignment of rules for switching within inspection severities

Function  to  assign  rules  for  changing  inspection  severities  to  a  previously  defined  and  selected

transitional definition.

Detail applications

"Transition" detail application

At a glance, the list of transitions shows all entries (the actual rules for the transitions between inspection

severities)  made  for  a  transitional  definition.  The  detail  application  for  a  defined  transition  makes  the

single information clearer.

When creating a transition, the inspection severity for which a transition to a reduced inspection severity

and to an increased inspection severity is to be created, is to be specified at first. A selection list including

the inspection severities is available for this purpose. This list is already filtered to the inspection severity

definition that has been defined for the transitional definition.

When switching to a reduced inspection severity, the number of inspections may be indicated that have to

be  completed  with  "pass"  in  a  row  to  go  to  the  new  inspection  severity.  The  selection  list  of  inspection

severities may be opened in this case as well.

When  switching  to  an  increased  inspection  severity,  the  number  of  inspections  may  be  indicated  that

have to be completed with "fail" in a row to go to the new inspection severity. To do so, the "number of fail

inspections  in  a  row"  field  has  to  be  checked.  Once  the  "number  of  fail  inspections  in  a  row"  field  has

been checked, it may be specified how many inspections out of x inspections have to be completed with

"fail" to go to the new inspection severity. In this context, the "fail" inspections do not have to be in a row.

The corresponding selection list may be opened here as well to enter the inspection severity.

Field descriptions

In  connection  with  the  descriptions  made  for  the  "transitions"  detail  application,  the  available  fields  and

selection lists are self-explanatory and, as a result, not explained separately.

WEP-DWP_82.docx

Version: 1.0.23049

Page 33 of 37

  Dynamic Modification of Goods Receipt Inspections

WEP-DWP_82.docx

Version: 1.0.23049

Page 34 of 37

  Dynamic Modification of Goods Receipt Inspections

5  Dynamic Modification Norm

Summary

Menu

Master data  Quality Management  Dynamic modification norm

Transaction code

dynn

Function authorization

dynn

The  dynamic modification  norm  defines  how  much  items/parts  are  to  be  checked  with  which  inspection

severity  taking  the  batch  size  into  account  (“actual  quantity”  field  in  the  inspection  requirement  of  the

goods receipt and goods issue dialog).

Provided that a skip lot variant is to be used, this one is also defined/activated here.

Utilization

The  “norm”  field  uniquely  identifies  a  dynamic modification  norm  in  the  corresponding  QM  applications.

This field is the key field at the same time, i.e. when saving it is checked whether there is already a data

record with this key information.

The  norms  “ISO_2859“  and  “ISO_3951“  are  initial  entries,  which  can  neither  be  changed  nor  deleted.

Inspection levels, AQLs and sample tables are defined for the norms “ISO 2859“ and “ISO 3951“ and the

methods s and sigma are additionally defined for ISO 3951.

Different  dynamic  modification  norms  can  be  created.  An  inspection  severity  definition  is  assigned  to

these  dynamic  modification  norms.  A  selection  list  that  includes  the  previously  defined  inspection

severities is available for this assignment process.

In addition, a radio button in the "inspection type" field decides whether this norm applies for attributive or

variable  characteristics  only  or  for  attributive  and  variable  characteristics.  Consequently,  within  the

inspection plan characteristics of a variable characteristic it is later only possible to choose the dynamic

modification norms that have been defined for variable or for variable and attributive characteristics. If the

"variable" inspection type is selected the sampling plan type may be indicated additionally. When it comes

to the inspection types "attributive" and "attributive + variable", "n-c-d + skip lot" is taken automatically as

sampling plan type. The "variable" inspection type additionally provides the option "n-k + skip lot".

n = Sample size

c = Acceptance number (number of errors/defects which is still allowed to achieve a "pass" result)

d = rejection number (number of errors/defects as of which the inspection result is "failed", i.e. the batch is

to be rejected)

WEP-DWP_82.docx

Version: 1.0.23049

Page 35 of 37

  Dynamic Modification of Goods Receipt Inspections

k = k factor as limit value for the acceptance or rejection / inspection result is classified as "pass" or "fail"

(please refer to the corresponding norms for further information on this k factor.)

Integration

The following applications use dynamic modification norms.



Inspection planning (inspection plan characteristics) for goods receipt and goods issue.

Prerequisite

Inspection  severities  and  transitional  definitions  need  to  be  created  beforehand  to  be  able  to  define

dynamic  modification  norms.  The  "dynamic  modification  norm"  application,  if  considered  individually,  is

not functional. Consequently, it has to be used and assigned in the inspection plan characteristics, which

in turn requires the dynamic modification to be activated in the inspection plan header.

Selection criteria

Selection criteria are self-explanatory and are not described separately.

Field descriptions

The available fields are self-explanatory and are not explained separately.

There is a selection list including acceptance functions to assign inspection severity definitions.

Toolbar

Sampling plan

Assignment of sampling plans to dynamic modification norms

Function to assign sampling plans to a previously defined and selected dynamic modification norm.

Detail applications

Detail application sampling plan

The  fields  "AQL  value",  "inspection  level"  and  "method"  are  only  available  in  the  initial  DIN  norms  that

cannot be changed. The same applies to the sampling plan type "n-k + skip lot". For this reason, the field

for the k factor only appears in these sampling plans.

This  detail  application  connects  increments  of  the  sample  size  with  a  defined  batch  size  for  every

inspection severity. A selection list is available for the inspection severity.

WEP-DWP_82.docx

Version: 1.0.23049

Page 36 of 37

  Dynamic Modification of Goods Receipt Inspections

If an entry  is made without specifying the  batch size,  the specifications of all batch sizes apply that  are

greater than the highest batch size that is defined.

The copy dialog allows for all sampling plans of the indicated norm and inspection severity to be copied to

the specified target norm and target inspection severity.

Field descriptions

Inspection severity

Inspection severity for which the below-mentioned inspection specifications are defined.

Batch size

Gradation for which batch size the below inspection specifications are defined. The indicated batch

size represents the upper limit that is included. The lower limit is the next smallest batch size that is

defined for the same inspection severity.

Sample size

Defines the number of measured values to be recorded for the combination of inspection severity

and batch size.

Acceptance quantity

Limit value for the number of allowed failures/defects with respect to the combination of inspection

severity and batch size,  which still results in the batch to be accepted or the characteristics to be

rated as "pass" for dynamic modification relating to characteristics.

Quantity rejected

Limit value for the number of allowed failures/defects with respect to the combination of inspection

severity and batch size, which results in the batch to be rejected or the characteristics to be rated

as  "fail"  for  dynamic  modification  relating  to  characteristics.  Ideally,  the  rejection  quantity  is

increased by 1 (compared to the acceptance quantity) to be able to make a unique decision.

Skip lot

Provided that a skip lot is to be defined for the specified inspection severity, a value greater than 1

is to be entered here. If the value 3 is entered, this means that only one batch out of three is to be

checked as soon as this inspection severity is reached. The sample size as well as the acceptance

and rejection numbers that are indicated here apply when checking the inspection severity.

WEP-DWP_82.docx

Version: 1.0.23049

Page 37 of 37


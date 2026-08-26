Manual

In-Process Inspection Reports
FEP-AFP 8.2

Version 1.0.23049

Last changed on: 01.09.2020

In-Process Inspection Reports

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

FEP-AFP_82.docx

Version: 1.0.23049

Page 2 of 41

In-Process Inspection Reports

Contents

1  Overview – Evaluations of In-process Inspections ...................................... 4

2

Inspection requirements ............................................................................... 5

FEP-AFP_82.docx

Version: 1.0.23049

Page 3 of 41

In-Process Inspection Reports

1  Overview – Evaluations of In-process Inspections

Purpose

This component extends the functions of the inspection requirements to include

  The display of tolerance, action and warning limits

  The visualization of the measures, errors, measured values and statistical values collected and



the access to the document list.

Implementation Notes

The use of this component is to be recommended if the functions of the inspection requirements are to be

expanded to include further detailed information.

Integration

This component predominantly serves the component "Inspection planning for in-production inspections".

Features

The following functions are available:

  Display of tolerance limits, action limits, sampling plan, etc.

  Characteristic-related  display  of  the  errors,  measures,  measured  values  and  evaluations

collected and the statistical values

  Visualization  of  the  processing  status  using  differing  statuses  (released,  part-result,  completed,

etc.)  and  the  assignment  /  determination  of  a  usage  decision  on  completion  of  the  inspection

requirements (release, special release, reject, rework, etc.)

  Display of the documents (drawings, images, videos in any format) from the document list of the

characteristics,  inspection  plans,  inspection  plan  characteristics,  inspection  requirements  or

inspection step characteristics

FEP-AFP_82.docx

Version: 1.0.23049

Page 4 of 41

In-Process Inspection Reports

2

Inspection requirements

Overview

Menu

Quality management  In-production inspection  Inspection requirement

Quality management  Goods receipt  Inspection requirement

Quality management  Goods issue  Inspection requirement

Quality management  Initial sample  Inspection requirement

Quality management  Gage management  Inspection requirement

Transaction code

irp1

Function authorization

irp

Available user fields

Where

Object type/user field key

Source (type)

Inspection requirement:
Table and detail view

Inspection step
characteristics:
Table and detail view

Production: CPAN/FEP
Goods receipt: CPAN/WEP
Goods issue: CPAN/WAP
Initial sample: CPAN/EMU
Gage management: CPAN/PMV

Production: CPAUMM/FEP
Goods receipt: CPAUMM/WEP
Goods issue: CPAUMM/WAP
Initial sample: CPAUMM/EMU
Gage management: CPAUMM/PMV

QM

QM

Inspection points:

CPANUMP/PPUNKT

QM

Table and detail view

How to configure user fields?

Which user field types are available?

Purpose

The inspection requirement in the inspection process corresponds to the production order in BDE (shop

floor  data  collection).  The  inspection  requirement  includes  one  or  several  inspection  steps  (e.g.  one

inspection  step  per  operation).  When  an  inspection  requirement  is  generated,  the  system  uses  the

respective inspection plan to create the inspection steps. The inspection requirement includes the general

information,  such  as  order  or  article  number.  One  level  below  the  inspection  requirement,  there  is  the

inspection step. The inspection step then specifies the characteristics to be checked. To collect measured

values, you therefore select the inspection step or the operation of the production order (that includes the

inspection step) and log it on to the terminal.

FEP-AFP_82.docx

Version: 1.0.23049

Page 5 of 41

In-Process Inspection Reports

As  the  functional  requirements  are  almost  identical  in  all  areas  (e.g.  goods  receipt,  production,  goods

issue, gage management), the respective applications all have a similar structure.

1If you use transaction codes to call the application Inspection requirement, you cannot create

new requirements.

If  you  create  new  inspection  requirements,  you  are  generally  supported  by  master  data  catalogs.

Therefore, careful maintenance of master data is very important.

Integration

You  generate  inspection  requirements/inspection  steps  using  inspection  plans,  which  you  have  created

previously.  These  plans  are  the  reference  the  inspection  is  based  on.  When  being  generated,  the

contents of inspection plans are copied into the inspection requirements/inspection steps. The inspection

plan is the reference used to create inspection requirement or inspection step. If you make changes to the

inspection  plan  (limited  options),  these  changes  do  not  affect  inspection  requirements/inspection  steps

that have already been generated.

The  inspection  steps,  in  turn,  are  the  "objects"  that  can  be  checked/inspected.  In  production,  the

inspection steps are connected to the respective operation of the production order via operation number.

In gage management, the inspection step actually is a calibration order.

Almost all reports and evaluations reference the data of the inspection requirements/inspection steps and

the  included  inspection  step  characteristics.  To  restrict  the  data  in  reports,  you  can  filter  by  the  article

number, order number, operation, and inspection step characteristic, for example.

In  gage  management,  the  inspection  requirement  is  automatically  generated  from  the  activity

calendar.  This  generation  is  triggered  by  a  user  action.  In  exceptional  cases,  inspection

requirements can  also  be  generated directly in the “inspection requirement” application.  Here,

you must manually enter the inspection plan number.

Requirements

Before you can create inspection requirements/inspection steps, you must first create inspection plans for

the  required  area/context.  You  also  require  some  master  data.  It  depends  on  the  planned  use  which

master data you must maintain.

FEP-AFP_82.docx

Version: 1.0.23049

Page 6 of 41

Selection criteria

The  following  list  shows  some  of  the  available  selection  criteria.  Self-explanatory  filter  options  are  not

In-Process Inspection Reports

listed.

Area

Selection list of the configured areas of in-production inspection, goods receipt or goods issue. By

default, the following areas are available:

In-production inspection: Production

Goods receipt: Goods receipt

Goods issue: Goods issue

Initial sample: Initial sample inspection

Gage management: Gage management

 Inspection requirement no.

The  inspection  requirement  number  uniquely  identifies  the  inspection  requirement.  HYDRA

automatically generates the inspection requirement number, which is unique.

Status

Open a status list to filter  by the different inspection  requirement statuses. This way,  you can  limit

the list of inspection requirements to the completed inspection requirements, for example.

Skip lot (available for the goods receipt and goods issue only)

Due  to  dynamic  modifications,  an  inspection  requirement  can  be  classified  as  "skip  lot"  and,  as  a

result, no inspection is performed.

Order

Number of the respective production order or calibration order.

Article number

You  can  directly  enter  the  number  or  open  the  article  catalog  where  you  can  select  an  entry  and

take over the number.

Drawing issue number

The  article  is  uniquely  identified  using  the  combination  of  "article  number"  and  "drawing  issue

number".

Customer number

You can directly enter the number or open the customer catalog where you can select an entry and

take over the number.

FEP-AFP_82.docx

Version: 1.0.23049

Page 7 of 41

Supplier number

You can directly enter the number or open the supplier catalog where you can select an entry and

In-Process Inspection Reports

take over the number.

Manufacturer number

You can directly enter the number or open the manufacturer catalog where you can select an entry

and take over the number.

Actual date from / to

You  can  enter  a  time  limit.  In  production,  this  field  is  usually  empty.  In  goods  receipt,  the  "actual

date" specifies the date when the goods are delivered.

Planned date from / to

You can enter a time limit. In production, this field is usually empty. In goods receipt, the "planned

date" specifies the date when the goods are planned to be delivered (initially).

Manufacturing date from / to

You can enter a time limit.

Consider long-term data

If you enable this option, you can show archived inspection requirements of the medium-term data

area.

You cannot show inspection certificats, etc. in Word format for the archived inspection

requirements displayed.

Field descriptions of the Inspection requirement

In the following, find a description of the most important fields.

Inspection requirement

Area

The inspection requirement is created for the specified area. The application provides a selection list

of the configured areas of in-production inspection, goods receipt, goods issue, initial sampling or

gage management. By default, the following areas are available:

FEP-AFP_82.docx

Version: 1.0.23049

Page 8 of 41

In-Process Inspection Reports

In-production inspection: Production

Goods receipt: Goods receipt

Goods issue: Goods issue

Initial sample: Initial sample inspection

Gage management: Gage management

This field is a key field. Using this field, the active inspection plan or the specified inspection plan

including index is identified that is used to create the inspection requirement, the inspection steps

and inspection step characteristics.

Inspection requirement no.

The  inspection  requirement  number  is  automatically  generated  upon  saving.  The  number  is

numeric and uniquely identifies an inspection requirement. It cannot be changed.

Operation, operation designation

  If  you  use  operations,  you  must  only  fill  in  one  of  the  two  fields  "operation"  or  "operation

designation".  If  you  want  to  automatically  generate  an  inspection  requirement/an  inspection  order

when  you  log  on  a  production  order,  you  must  only  fill  in  the  field  Operation  number.  Usually  the

operation number is the only reference required because this is the most important number in the

common work plan structures.

This field can be a key field. Depending on the system configuration, this field is used to search for

the  active  inspection  plan.  The  generated  inspection  requirement,  inspection  steps  and  inspection

step characteristics are then based on this plan. If the system is configured accordingly, the system

generates  the  inspection  requirement  and  all  inspection  steps  at  the  same  time  for  the  operations

that are included in the respective inspection plan.

Also  in  case  of  areas  that  do  not  have  production  orders  (e.g.  goods  receipt  and  gage

management), it might be  required to specify a “fictitious” operation (e.g. 9999)  depending on

the  system  configuration.  This  “fictitious”  operation  has  to  be  included  in  the  respective

inspection plan.

Inspection plan number / inspection plan index (specified)

  You  can  use  these  fields  to  specify  the  inspection  plan  that  is  used  for  the  generation  of  the

inspection requirement if you do not specify key fields to search for the active inspection plan.

Date

When  a  new  data  record  is  created,  this  field  includes  the  system  date,  which  may  be  changed

afterwards. Once it has been saved, this field may no longer be changed.

FEP-AFP_82.docx

Version: 1.0.23049

Page 9 of 41

In-Process Inspection Reports

Article

Enter  the  article  number.  If  you  know  the  article  number,  you  can  directly  enter  it.  If  not,  you  can

open  the  article  catalog  and  identify  and  transfer  the  requested  article  using  the  filter  and  sort

criteria.  Select  an  article  to  take  over  the  drawing  issue  number,  the  article  designation,  the

customer article number and the drawing number from the master data record. The respective data

is then displayed in the respective fields.

  This  field  is  a  key  field.  You  use  this  field  to  search  for  the  active  inspection  plan  that  is  used  to

generate  inspection  requirement,  inspection  steps  and  inspection  step  characteristics  if  no

inspection plan including index has been specified before.

In gage management, this field is empty or should be left empty.

Drawing issue number

Like the article number, you can directly enter the drawing issue number.

  This  field  is  a  key  field.  You  use  this  field  to  search  for  the  active  inspection  plan  that  is  used  to

generate  inspection  requirement,  inspection  steps  and  inspection  step  characteristics  if  no

inspection plan including index has been specified before.

If you directly enter the article number and the drawing issue number, this information is used

upon  saving  to  identify  the  master  data  record.  Using  this  master  data,  the  system  can  then

display article name, customer article number and drawing number.

The  article  is  uniquely  identified  by  the  combination  of  article  and  drawing  issue  number.  It  is

not obligatory to define and use a drawing issue number.

If  the  field  “Drawing  issue  number”  is  shown  in  gage  management,  you  may  not  enter  any

values here.

Companies

Customer / Supplier / Manufacturer

You can directly enter the respective company number or open the master data catalog and select

the  respective  entry. When  you  have  selected  and  saved  the  inspection  requirement,  the  system

also enters the company name and address data.

These fields are key fields. You use these fields to search for the active inspection plan that is used

to  generate  inspection  requirement,  inspection  steps  and  inspection  step  characteristics  if  no

inspection plan including index has been specified before.

FEP-AFP_82.docx

Version: 1.0.23049

Page 10 of 41

In-Process Inspection Reports

Date - quantities

Actual quantity

The system uses the actual quantity to calculate the inspection scope. The calculation is based on

the selected sampling scheme. This is especially true in goods receipt and goods issue if dynamic

modification is enabled. In production, this field is usually empty.

Target quantity

In particular for the goods receipt, it is important to specify the target quantity in order to identify the

difference between the ordered quantity and the actually delivered quantity.

Scrap

This field is only relevant if you are just using the CAQ functions of HYDRA and you are not using

the shop floor data collection (BDE) module.

Rework

This field is only relevant if you are just using the CAQ functions of HYDRA and you are not using

the shop floor data collection (BDE) module.

Actually produced quantity (act. prod. qty.)

This field is only relevant if you are just using the CAQ functions of HYDRA and you are not using

the shop floor data collection (BDE) module.

Actual date

In particular for the goods  receipt,  it  is important to specify the actual  date in order to  identify  the

difference between the planned delivery date and the actual delivery date. In production, this field is

usually empty.

Planned date

In particular for the goods receipt, it is important to specify the planned date in order to identify the

difference between the planned delivery date and the actual delivery date. In production, this field is

usually empty.

Status - details

Status

The status specifies the inspection requirement status, e.g. whether it is completed, unchecked

("created" status) or whether inspection results already exist ("partial result" status).

Overall result

The overall result defines whether the inspection requirement is classified as "pass" or "fail".

FEP-AFP_82.docx

Version: 1.0.23049

Page 11 of 41

In-Process Inspection Reports

Usage decision

The  usage  decision  classifies  the  overall  result  in  more  detail.  You  can  extend  the  list  of  usage

decisions  via  customizing  the  system.  When  you  complete  an  inspection  requirement,  the  usage

decision is predefined for each overall result. A "pass" result leads to the usage decision "release"

and  a  "fail"  result  leads  to  the  usage  decision  "reject".  You  can  change  the  predefined  usage

decision if you manually complete the inspection requirement.

Skip lot

Due  to  dynamic  modifications,  an  inspection  requirement  can  be  classified  as  "skip  lot"  and,  as  a

result, no inspection is performed.

PPS/ERP reference

If higher-level systems automatically generate inspection requirements via interface, you can use

this reference number to upload and uniquely assign results.

PPS/ERP addition

If higher-level systems automatically generate inspection requirements via interface, you can use

this unique reference number to upload results and add an additional information. Only the

interface populates this field.

Uploaded to ERP/PPS

If  this  field  is  enabled  (by  interface)  it  can  specify  that  the  upload  to  the  higher-level  system  has

been  performed  and  the  higher-level  system  has  confirmed  this  via  interface.  Only  the  interface

populates this field.

Inspection plan number/inspection plan index (used)

The inspection plan number and inspection plan index specify the inspection plan that is used as

basis for the generation of the inspection requirement and inferior data (inspection steps, inspection

step characteristics).

Cavity assignment

You require the authorization "ipl_cav" to display these fields.

The options "none" or "sample" are available for cavity assignment. The respective setting is based

on the inspection plan.

FEP-AFP_82.docx

Version: 1.0.23049

Page 12 of 41

In-Process Inspection Reports

Dynamic modification

Dynamic modification type

Shows the dynamic modification type of the respective inspection requirement.

Batch-related: The inspection plan used includes a dynamic modification based on batches.

Characteristic-related: The inspection plan used includes a dynamic modification based on

characteristics. In this case, the transitional definition, the initial inspection severity and the dynamic

modification norm are specified on the level of inspection step characteristics.

None: The inspection plan used does not include any dynamic modification.

Transitional definition

These fields (number and designation) are only available if dynamic modification based on batches

or  characteristics  is  defined  for  the  inspection  plan  used.  The  transitional  definition  provides  the

possible inspection severities and controls switching between these different inspection severities.

The content cannot be changed.

Determined inspection severity

This field defines the inspection severity that is/was used for the inspection of the incoming goods

according to the basics for the dynamic modification history. This field is only available if dynamic

modification  based  on  batches  is  defined  in  the  inspection  plan  used.  The  content  cannot  be

changed.

Revised inspection severity

This field defines the inspection severity that is/was used for the inspection of the incoming goods

according  to  a  manual  revision  of  the  inspection  severity.  This  field  is  only  available  if  dynamic

modification based on batches is defined in the inspection plan used.

Form

Party in charge type

Provides the shortlist of the different categories of responsible parties, e.g. department, customer,

supplier, external persons.

Party in charge

List of the responsible parties that includes only the previously selected type. This list includes all

master data that is marked accordingly in the “party in charge” field.

Party in charge name

Only shows the name/designation of the selected responsible party.

Form

Form type of the inspection plan used.

FEP-AFP_82.docx

Version: 1.0.23049

Page 13 of 41

In-Process Inspection Reports

Calibration

Resource type

Shows the resource type of the resource to be calibrated. For gages, this is the type “PRM”.

Resource

Shows the resource number (gage number) that is assigned to this inspection requirement.

Maintenance

Shows  the  activity  number  that  is  assigned  automatically  by  creating  an  activity  in  the  activity

calendar. This unique ID number identifies or references the respective activity.

Calibration findings

Shows  the  result  entered  or  identified  when  the  calibration  process  was  completed,  e.g.  capable

without restrictions.

Calibration status

Shows the status entered or identified when the calibration process was completed, e.g. released.

Inspection requirement - editing functions

The key fields "area" and "inspection requirement number" as well as the fields "skip lot" and "uploaded to

ERP/PPS" cannot be changed in the editing mode.

Inspection requirement - toolbar

Copy

Function authorization: irp.copy

 (available as of SP13)

The  selected  data  record  is  opened  in  copy  mode.  To  create  a  new  inspection  requirement,  you

must  normally  change  the  order  number.  The  data  structures  that  are  below  the  inspection

requirement are not copied (inspection steps, characteristics, inspection points, etc.) Upon saving,

the  system  searches for  an  inspection  plan  using  the  specifications  of  the  inspection  requirement

and creates the respective inspection steps, etc.

Release

Function authorization: irp.release

The system sets the status for the inspection requirement that was available when it was

completed, e.g. to the "partial result" status. This is required if the inspection requirement has

already been completed and if it must be reset into a status that allows inspection.

FEP-AFP_82.docx

Version: 1.0.23049

Page 14 of 41

In-Process Inspection Reports

Complete

Function authorization: irp.complete

Opens a dialog to assign a usage decision. The system has already preset a usage decision using

the available inspection results. The inspection requirement is finally transferred to the "completed"

status, once it has been completed. With this status, you can no longer inspect the included

inspection steps.

Cancel

Function authorization: irp.cancel

Transfers the inspection requirement to the "canceled" status. With this status, you can no longer

inspect the included inspection steps.

Order/operation

Function authorization: irp_goto

Click the respective button to jump to the application.

"Print" detail application

Function authorization

irp.print

The print dialog  of the  inspection requirement header  opens  a list of  available reports. These are Word

forms. The web services that are available in the respective context specify the potential content of these

forms.  The  form  entries,  i.e.  the  content  of  the  list  of  forms  of  the  respective  print  dialog,  are  defined

within  the  master  data  of  quality  management.  Here,  the  basics  for  new  forms  and  the  respective  form

properties  are  also  specified.  You  require  the  respective  license  to  be  able  to  change  the  forms  with

respect to content and design.

The report, 4th edition, 2nd volume VDA (German Association of the Automotive Industry), is available as

special form for initial sampling. In addition to the cover sheet, the relevant attachments of the inspection

characteristic results are printed as well. Each attachment includes the inspection characteristics and the

relevant  results  for  an  attached  category,  e.g.  data  for  dimensional  checks  (attached  category:

dimension).

FEP-AFP_82.docx

Version: 1.0.23049

Page 15 of 41

In-Process Inspection Reports

Print – Toolbar

There are no other special function buttons in addition to the standard functions/features.

"Complete inspection requirement“ detail application

Function authorization

irp.complete

To complete an inspection requirement, click the respective button in the toolbar. An editing dialog opens.

The system displays information on the inspection  requirement (i.e. order, batch, article, company data)

and also information on the inspection steps included in the inspection requirement. You cannot complete

an inspection requirement if any inspection steps are not completed, i.e. the field “without result” includes

a value greater  than  zero.  In this dialog  box,  you can complete the inspection  orders that  are still open

using  the  button  “complete  all  inspection  orders”.  This  is  only  possible  if  the  conditions  of  a  mandatory

inspection that might exist are fulfilled. You can then specify the result and further use of the inspection

requirement. If all inspection steps have been completed with “pass”, the system proposes “pass” as the

result and “release” as usage. If one inspection step has been completed with “fail”, the system proposes

"fail” as the result and “reject” as usage. Another result and usage may still be selected though.

The  list  specifying  the  available  usage  decisions  can  be  changed  as  part  of  an  MPDV  customizing

service.

"Inspection step" detail application

In the master detail grid, if you change from an inspection requirement to the inferior level of "inspection

steps", the grid displays all inspection steps that are included in the selected inspection requirement. The

system  displays  the  data  of  the  selected  inspection  step  in  the  detail  view.  The  number  or  the

combination of the inspection steps depends on the configurations made for the existing inspection plan.

If  an  inspection  plan  includes  a  configuration  that  specifies  that  the  operation  is  defined  on  the  level  of

inspection  plan  characteristics  and  if  the  system  configuration  specifies  in  addition  that  all  included

inspection  steps  are  created  when  the  inspection  requirement  and  the  first  inspection  step  are  created,

then the inspection requirement includes an inspection step for each operation included in the inspection

plan.

You can also release, complete or cancel an inspection step using the toolbar functions.

You can delete inspection steps, but you cannot create or edit them manually.

You can find the current status of the inspection step in the "rating" category of the "inspection step" tab.

The following statuses are available:

FEP-AFP_82.docx

Version: 1.0.23049

Page 16 of 41

In-Process Inspection Reports

Status

Description

No characteristic (KMM)

The  inspection  step  has  no  characteristics  that  can  be  inspected.

The inspection step is faulty and no inspection can be performed.

Created (ERS)

The  inspection  step  has  been  created  but  not  yet  released  for

inspection. No measured values have been recorded yet.

Inspection step released (FRE)  The inspection step has been released for inspection. No measured

values have been recorded yet.

Partial result (TER)

The  inspection  step  has  been  released;  some  measured  values

have been recorded.

Inspection in progress (IPR)

Measured  values  for  this  inspection  step  are  currently  being

recorded on another terminal.

Completed (ABG)

The inspection step has been completed.

Canceled (STO)

The inspection step has been canceled.

Skip lot (SKL)

The inspection step is in the "skip-lot" status.

"Inspection step" field descriptions

In the following, the most important fields of the Inspection step are described. Self-explanatory fields are

not explained.

Inspection step

Inspection step number

Unique number of the inspection step

Status

Status description of the inspection step, e.g. "completed", "partial result", etc.

Result

Qualitative  classification  of  the  inspection  result  based  on  the  respective  inspection  results  of  the

characteristics pertaining to it.

Workplace

Number of the workplace where this inspection step is performed.

Workplace designation

Name of the workplace where this inspection step is performed.

FEP-AFP_82.docx

Version: 1.0.23049

Page 17 of 41

In-Process Inspection Reports

Tab Inspection point identification

You can activate up to nine different fields,  which can or must be filled out later when inspection points

are generated. By customizing the CAQ system options, it may be defined which fields are to be enabled,

how they are labeled (for some fields) and whether or not it is a mandatory field.

If  a  field  is  activated  and  it  is  a  mandatory  field,  the  respective  checkbox  is  always  "checked".  The

respective checkbox is checked and grayed out if it is not a mandatory field but enabled for the resulting

data collection. If the field is disabled, the checkbox of the field pertaining to it is not activated at all.

Once activated within the inspection point, the fields 1 to 3 are available for entering values with respect

to  "equipment",  "functional  location"  and  "physical  sample".  The  fields  4  to  9  are  user  fields  relating  to

inspection points. The fields 4 and 5 are "alphanumeric" fields, the fields 6 and 7 are numeric, the field 8

is a "date" field and field 9 is a "time" field.

Order data from inspection step

Order

This is e.g. the production order number in production.

Operation

Number  of  the  operation  this  inspection  step  has  been  generated  for.  The  operation  number  is

derived from the inspection plan used.

Operation name

The  operation  number,  which  is  derived  from  the  inspection  plan  used,  identifies  the  operation

name.  Normally,  this  field  remains  empty,  because  usually  only  the  operation  number  is  used  in

inspection planning. The operation designation is only used in exceptional cases.

Quantities

Rework

A rework quantity may be entered in this field when the inspection step is completed. This quantity

specification is used for information purposes only and is not processed by default. Normally, this

field is only used if the shop floor data collection module (BDE) is not used in production, i.e. only

the CAQ module is in use. This field is also useful in goods receipt and goods issue.

Scrap

A scrap quantity may be entered in this field when the inspection step is completed. This quantity

specification is used for information purposes only and is not processed by default. Normally, this

field is only used if the shop floor data collection module (BDE) is not used in production, i.e. only

the CAQ module is in use. This field is also useful in goods receipt and goods issue.

FEP-AFP_82.docx

Version: 1.0.23049

Page 18 of 41

In-Process Inspection Reports

Actually produced quantity (act. prod. qty.)

The actually produced quantity may be entered in this field when the inspection step is completed.

This  quantity  specification  is  used  for  information  purposes  only  and  is  not  processed  by  default.

Normally,  this  field  is  only  used  if  the  shop  floor  data  collection  module  (BDE)  is  not  used  in

production, i.e. only the CAQ module is in use. This field is also useful in goods receipt and goods

issue.

Inspection step - editing functions

You  cannot  edit  an  inspection  step.  You  can  only  add  quantity  specifications  when  you  complete

inspection steps.

Inspection step - toolbar

Release

Function authorization: irisp.release

Sets the status "released" for an inspection step with status "created" or "completed". Or the

system sets the status that existed when the inspection step was completed, e.g. the "partial result"

status.

Complete

Function authorization: irisp.complete

Opens a dialog where the (inspection) result is preset. The result is based on the existing

inspection results of the characteristics. The inspection step is completed and the status

"completed" is set. You can no longer perform inspections for inspection steps with this status.

Cancel

Function authorization: irisp.cancel

Sets the "canceled" status for the inspection step. You can no longer perform inspections for

inspection steps with this status.

Function authorization: irp_goto

Order/operation

Click the respective button to jump to the application.

FEP-AFP_82.docx

Version: 1.0.23049

Page 19 of 41

In-Process Inspection Reports

"Complete inspection step" detail application

Function authorization

irisp.complete

To  complete  an  inspection  step,  click  the  respective  button  in  the  toolbar.  The  following  editing  dialog

opens.

If all inspection step characteristics have the result "pass" or if they are not checked, the system suggests

the result "pass". The system suggests the result "fail" if there is at least one inspection step characteristic

that has the inspection result "fail". The user can also select another result.

When the inspection step is completed, the user can record a "rework quantity", "scrap quantity" and the

"actually  produced  quantity"  (not  relevant  for  gage  management). This  quantity  specification  is  used  for

information  purposes  only  and  is  not  processed  by  default.  Normally,  this  field  is  only  used  if  the  shop

floor data collection module (BDE) is not used in production, i.e. only the CAQ module is in use. These

fields are also useful in goods receipt and goods issue. In particular in the goods receipt area, it is useful

to record scrap and rework. These details can be uploaded for several inspection steps to a higher-level

system at a later point in time when inspection requirements are completed.

"Inspection points" detail application

By default, the system only uses inspection points in production. It is only useful to have inspection points

if you take and check several samples for one order/inspection requirement. For example, this is useful if

you  perform  inspections  in  production  that  are  based  on  different  events.  Example  of  an  event:  A

specified  inspection  interval  that  is  based  on  quantities  or  time  is  reached.  The  events  that  trigger

inspections can be different for the individual inspection plan characteristics. The inspection points of an

inspection step can therefore have different inspection characteristics each.

Once an inspection has been performed, you must complete each inspection point. Each inspection point

has an inspection result (pass, fail) and  a status (completed, open). Inspection points that have not  yet

been checked have a "pass" inspection result by default.

FEP-AFP_82.docx

Version: 1.0.23049

Page 20 of 41

In-Process Inspection Reports

Note

If  you  enter  a  text  in  the  inspection  point  fields  on  the  AIP  terminal  that  is  longer  than  the  field

provided in the respective inspection point dialog, the text is cut off when you save the inspection

point on the AIP. Therefore, the field contents should not be longer than the field lengths configured

for  the  AIP  inspection  point  dialog.  The  field  lengths  of  AIP  dialogs  can  be  adjusted  as  part  of

system customization.

"Inspection points" field descriptions

In the following, the most important fields of the Inspection step are described. Self-explanatory fields are

not explained.

Inspection point

Inspection point number

The  inspection  point  number  uniquely  identifies  the  inspection  point  of  the  inspection  step.  In

addition  to  the  "inspection  point"  field,  the  higher-level  key  fields  "inspection  step  number"  and

"inspection requirement number" are shown .

Inspection result

The inspection result can be "pass" or "fail". Inspection points that have not yet been checked have

the inspection result "pass" by default (standard system configuration).

Status

An inspection point can be completed or open. Only open inspection points can still be checked on

the AIP terminal.

Tab Inspection point identification

This tab displays the fields, which have been enabled in the higher-level inspection step. You define in

the CAQ system options which fields identify the inspection point and which fields are mandatory fields.

By default, the following fields are displayed, but none of these fields is mandatory.

Date

Time

You can record a date. If you create a new inspection point, the system date and time is preset. If

you  manually  create  the  inspection  point,  you  can  directly  change  date  and  time.  Or  you  can

change date and time in the editing mode.

You can record a time. If you create a new inspection point, the system date and time is preset. If

you  manually  create  the  inspection  point,  you  can  directly  change  date  and  time.  Or  you  can

change date and time in the editing mode.

FEP-AFP_82.docx

Version: 1.0.23049

Page 21 of 41

In-Process Inspection Reports

In addition to the configurable identification fields, there are still the following identification fields that are

always available.

Workplace

If  the  inspection  point  is  generated  on  an  AIP  terminal  or  if  the  inspection  point  is  automatically

generated  via  inspection  event  on  a  specific  terminal,  this  field  shows  the  workplace  of  the

triggering  inspection  station.  If  you  specify  an  inspection  station,  this  inspection  point  is  only

available at this inspection station.

ERP batch

You can enter a respective ERP batch.

Partial batch

You can enter a respective partial batch.

Details

Generation of inspection points

If  the  system  automatically  generates  an  inspection  point  because  a  defined  time  or  quantity

interval is reached, the inspection point has the identifier "relating to time" or "relating to quantities".

An  inspection  point  that  is  assigned  the  identifier  "free"  has  been  generated  manually  or  on  the

basis of other events that make inspections become due.

Inspection points - editing functions

You cannot create new inspection points for completed or canceled inspection steps. And you cannot edit

existing inspection points if the respective inspection step is completed of canceled. If you want to create

or edit an inspection point, you must first release the inspection step.

Inspection points - toolbar

Release

Function authorization: iripp.release

Sets the "open" status for a completed inspection point.

Complete

Function authorization: iripp.complete

Opens a dialog window where you can complete an inspection point.

Function authorization: irp_goto

Order/operation

FEP-AFP_82.docx

Version: 1.0.23049

Page 22 of 41

In-Process Inspection Reports

Click the respective button to jump to the application.

"Complete inspection point" detail application

Function authorization

iripp.complete

To  complete  an  inspection  point,  click  the  respective  button  in  the  toolbar.  The  following  editing  dialog

opens.  The  dialog  includes  an  inspection  result  that  has  been  calculated  using  the  results  of  the

inspected  characteristics.  This  result  cannot  be  changed.  The  category  "Rating"  also  includes  a  preset

usage decision for the inspection point that is based on the inspection result of the characteristic. You can

manually  change  the  usage  decision.  The  system  provides  a  selection  list  for  usage  decisions  of

inspection  points  that  is  filtered  by  the  preset  production  site.  Each  usage  decision  classifies  the

inspection point as "pass" or "fail", irrespective of the inspection result. When you have selected a usage

decision,  the  system  displays  additional  information  on  the  usage  decision  of  the  inspection  point.  This

additional information is, for example, the code group, code number, catalog type and the factory/site.

MPDV services for customizing the system may provide further usage decisions for inspection points.

If  the  identification  fields  are  configured  accordingly,  you  can  edit  these  fields  when  you  complete  the

inspection  point.  If  an  identification  field  is  a  mandatory  field,  you  must  enter  a  value  before  you  can

complete the inspection point. In addition to this, quantity fields may also be filled out.

"Inspection step/inspection point characteristics" detail application

Function authorization

iriscp.*

The detail application of inspection steps/inspection point characteristics is almost identical to the master

data application of characteristics. Therefore, only additional features or modifications are described here.

 Go to

For  further  information  on  the  definition  of  characteristics,  refer  to  the  functional  description  in  the

document MOC_CharacteristicsQM.

The  master  detail  grid  shows  the  inspection  step  characteristics  one  level  below  the  inspection  step.  If

you use  inspection points and if  you have created inspection points,  you can open the list of inspection

points  one  level  below  the  inspection  steps.  If  you  open  this  list,  the  characteristics  of  the  selected

inspection point are displayed in a separate tab.

FEP-AFP_82.docx

Version: 1.0.23049

Page 23 of 41

In-Process Inspection Reports

The characteristics of the inspection step are specified in the inspection plan used. If the inspection plan

settings specify that a separate inspection step must be generated for each operation (global setting for

all  workplaces),  then  the  inspection  step  only  includes  the  characteristics  of  a  specific  operation.  If  the

inspection  plan settings additionally specify  that  a separate  inspection step must be generated for each

workstation,  then  an  inspection  step  always  includes  the  characteristics  of  a  fixed  combination  of

operation and workplace.

An inspection  point only includes characteristics that  become due because of the same event.  Also  the

manual  generation  of  inspection  points  represents  a  due  date  event.  For  example,  if  a  quantity  interval

defined  for  the  inspection  step  characteristics  has  been  reached,  an  inspection  point  is  automatically

generated.  This  inspection  point  includes  all  characteristics  that  have  the  same  quantity  interval.  And  it

also  includes  the  characteristics  that  have  a  quantity  interval  that  is  the  least  common  multiple  of  the

quantity interval reached.

Example:

Characteristic  1  has  a  quantity  interval  of  100.  Characteristic  2  has  a  quantity  interval  of  200.  After  the

first 100 parts produced, an inspection point is generated, which only includes characteristic 1. After 100

more parts, another inspection point is generated, which includes the characteristics 1 and 2.

If an inspection becomes due because the machine status changes, the generated inspection point only

includes characteristics that must be checked because of the same machine status change.

Only manually generated inspection points are not limited with respect to the respective characteristics.

These inspection points always include all characteristics of the related inspection step.

Inspection step/inspection point characteristics - field descriptions

In the following, only the fields are described that are not included in the master data of characteristics or

in the inspection plan characteristics.

Characteristic

Inspection result (available as of SP13)

The  inspection  result  is  identified  using  the  settings  for  the  characteristics  in  the  inspection  plan

according to the "Inspection result base" and the value of the CAQ option 1038. For details, refer to

the description of the CAQ option 1038 in the procedure document "Configuration_QM_Options".

Initial sample creation

Shows  the  field  content  that  is  transferred  from  the  characteristic  included  in  the  inspection  plan

used. A separate sheet/page is printed for each category in the printed initial sample report.

Properties

Dynamically modified

This checkbox is enabled, provided that a characteristic is dynamically modified.

FEP-AFP_82.docx

Version: 1.0.23049

Page 24 of 41

In-Process Inspection Reports

Dynamic modification

Determined inspection severity/inspection severity designation

This field shows the inspection severity identified for this characteristic on the basis of the dynamic

modification rules specified in the inspection plan.

Revised inspection severity/inspection severity designation

This  field  only  exists  if  dynamic  modification  is  based  on  characteristics.  A  revised  inspection

severity is displayed here, if the user has changed the process of dynamic modification and if the

user has revised the current inspection severity (new initial inspection severity).

Note

A note is displayed in this field, in case an error has occurred with the dynamic modification of this

characteristic while inspection steps are generated.

Details

No cavity

You require the authorization "ipl_cav" to display these fields.
You can use this option to label a characteristic as not relevant to cavities, although the respective

inspection  requirement  specifies  that  the  relevant  characteristics  are  (actually)  to  be  recorded  in

relation to cavities.

You must always enable this checkbox for attributive characteristics and inspection charts.

Sample group

This field specifies which sample group this characteristic belongs to.

Sampling

If  a  characteristic  has  been  assigned  to  a  sample  group,  this  option  specifies  if  you  use  this

characteristic  to  generate  a  sample.  In  this  case,  you  call  it  a  sampling  characteristic.  You  must

enable the checkbox in this case. You must assign a sample group to the sampling characteristic.

If these fields are not available, you require a new program version of this application.

Specifications

Sample size

This field shows  the  identified sample size if a sampling scheme is defined  in the inspection  plan

characteristic  and  if  this  sampling  scheme  does  not  specify  the  sample  size  because  the  sample

size  is  calculated  using  the  actual  quantity  of  the  inspection  requirement.  This  is  the  case  for  the

sampling schemes "batch inspection" or "100% inspection".

FEP-AFP_82.docx

Version: 1.0.23049

Page 25 of 41

In-Process Inspection Reports

 Go to

The other fields included in the tabs are the same as the fields of the characteristic master data and are

described in the documentation "CAQ characteristic master data ".

Inspection step/inspection point characteristics - editing functions

Inspection step or inspection point characteristics cannot be edited.

"Inspection requirement documents" and "Characteristic documents"

detail applications

The above screenshot shows how an inspection plan document is assigned.

The above screenshot shows how a characteristic document is assigned.

If  you  have  enabled  the  "documents"  tab  in  the  master-detail  grid,  you  can  assign  any  number  of

documents  to  each  inspection  requirement  and  to  each  inspection  step  characteristic.  If  this  tab  is

enabled  in  the  master-detail  grid,  the  respective  editing  buttons  are  enabled  in  the  toolbar  to  edit  the

documents.

You can use all formats registered by Windows for the documents you want to assign. You can therefore

assign  simple  documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos.  You  only  have  to

make sure to install a program that is able to display the used format. The appropriate program linked in

Windows opens the documents.

FEP-AFP_82.docx

Version: 1.0.23049

Page 26 of 41

In-Process Inspection Reports

The file types "File", "URL", and "Text" are available. For the type "file",  you can manually enter the file

name including the path. The file type “URL” enables access to the internet or intranet. With the file type

"text", you can directly enter a text.

You can assign a designation/name to each document that is added. You can also define the list order of

the  documents.  Use  the  field  "position"  to  define  the  order  (numeric  input).  Position  numbers  must  be

unique in this list. Enable the checkbox Display to define that the document is displayed during inspection

process.

"Inspection plan documents“ and "Documents for inspection plan

characteristics" – Toolbar

In addition to the standard functions, the button to show documents is available.

Show documents

If  a  document  link  is  stored,  this  button  opens  and  shows  the  linked  document.  However,  a

program, which can show the linked file type, must be installed in the PC.

"Failure" detail application

A  "Failure"  detail  application  is  provided  on  the  level  of  inspection  requirements.  This  list  shows  all

failures  of  the  type  "failure  type",  "failure  location",  "failure  cause"  and  "originator",  which  have  been

assigned to the characteristics, samples or measured values during the inspection process. The list even

shows the failure types that have been generated automatically, e.g. "upper tolerance limit violated".

In addition to the respective failure, the following referenced data is also available.



Inspection step

  Operation sequence number (OP sequence, AFO)

  Sample number

  Value number

  Failure type

  Characteristic number and description

  Workplace number and description

  Weighting (number, e.g. for an inspection chart characteristic)

FEP-AFP_82.docx

Version: 1.0.23049

Page 27 of 41

In-Process Inspection Reports

  Comment,

  Failure date

  Failure time

You can restrict the list in a flexible way using the individual column filter. You can also use the group by

function. Example: You can list the failures for each characteristic.

Failure list - editing functions

For  administration  purposes,  you  can  create,  edit  or  delete  failure  analysis  entries  for  inspection

requirements.  If  a  new  data  record  is  created,  you  can  enter  further  key  information  to  specify  the

assignment. The following information entries can be added:



Inspection step number,

  OP sequence number (uniquely identifies the characteristic),



the sample number

  and value number.

To  precisely  assign  this  key  information,  the  user  requires  "administrative"  skills.  An  administrative

environment is recommended.

The user requires the following function authorizations:

Function authorization

failure.create => create new failure

failure.edit     => edit failure

failure.delete => delete failure

Users  must  have  profound  knowledge  of  inspection  processes,  as  they  are  not  guided  through  the

process of data collection/modification and a validation process is not performed.

The fields "area" and "inspection requirement number" cannot be modified and you cannot enter values.

This  is  also  true  when  you  create  new  data  records.  When  you  create  a  new  data  record,  this  data  is

taken from the previously selected inspection requirement.

You can enter values for all other fields when you create a data record. In the editing mode, you can only

change the fields "weighting" and "comment".

"Measures" detail application

A detail application including a "measure list" is provided on the level of inspection requirements. This list

shows all measures and actions which have been assigned to the characteristics, samples or measured

values during the inspection process.

FEP-AFP_82.docx

Version: 1.0.23049

Page 28 of 41

In addition to the respective measure number and designation, the following data is also referenced.

In-Process Inspection Reports



Inspection requirement



Inspection step

  Operation sequence number (OP sequence, AFO)

  Sample number

  Value number

  Measure type

  Party in charge incl. type

  Status

  Comment

  Text

  Effectiveness

You can restrict the list in a flexible way using the individual column filter. Use the "group by" function to

have further options of analysis.

"Measures" toolbar

Use  the  button  "measure  tracking"  to  open  the  measure  tracking  dialog  where  you  can  edit  and  create

measures.  Measure  tracking  uses  the  internal  and  unique  "serial  number"  of  the  measure  in  the

"references" tab for filtering. Filtering is omitted if no measure is selected.

 Go to measure tracking

Function authorization

failure.* => opens measure tracking

"Control chart 1/2" detail application

By default, the application shows the control charts 1 and 2 defined for the inspection step characteristic.

If  the  charts  are  not  defined  for  the  inspection  step  characteristic,  the  xq  and  s  charts  are  used  for

variable characteristics and the p and u chart for attributive characteristics.

FEP-AFP_82.docx

Version: 1.0.23049

Page 29 of 41

All data of the selected inspection step characteristic is used for the graphic presentation.

In-Process Inspection Reports

Open the dialog to configure "control chart 1" or "control chart 2" to define the contents of this application.

If you use this dialog to make changes, the changes are saved per user. If no specific setting has been

made,  the  xq  chart  ("variable"  characteristic  type)  or  the  p  chart  ("inspection  chart"  or  "attributive"

characteristic type) is displayed by default. The available control charts depend on the characteristic type.

By default, the user can select one of the following control charts.

Variable characteristic

  Xq chart

  S chart

  R chart

  Single value chart

  Median chart

Attributive characteristic

  p chart

  np chart



c chart

  u chart

FEP-AFP_82.docx

Version: 1.0.23049

Page 30 of 41

In-Process Inspection Reports

In the follolwing, the most important configuration options are described:

Number of samples/measured values to be requested

Specifies the number of samples or single measured values that are displayed in the control chart.

Show …

The options that include the term "Show ..." enable or disable the display of the respective data in

the control chart.

Consider long-term data

Check this option to integrate archived data of the medium-term data area.

Combine minimum and maximum values

It is recommendable to show the minimum and maximum values that are each connected by a line

to improve the presentation of the range of dispersion of single values.

Automatic scaling

Use  the  "automatic  scaling"  function  to  display  all  values,  irrespective  of  the  existing  limit  values.

This function also shows extreme outliers in the control chart. Disadvantage:  The other measured

values are much smaller in the layout and it is more difficult to identify changing values or a trend.

FEP-AFP_82.docx

Version: 1.0.23049

Page 31 of 41

In-Process Inspection Reports

Show trend / run / middle third

Use  the  monitoring  functions  "trend",  "run"  and  "middle  third"  to  better  monitor  a  process.  These

functions are only  available with the control charts xq and median. If  you show the trend,  you can

visualize a process trend that may rise or fall. The system uses several samples to generate a trend.

By default, these are seven consecutive rising or falling values. The run shows sections where the

process runs above or below the mean value (when displayed, otherwise the target value). The run

covers several samples.  By  default, these  are seven  consecutive values that  are above  the mean

value.  The  default  number  of  seven  samples/values  that  is  set  to  identify  a  trend  or  run  can  be

changed via system customization. The system identifies a "middle third", if an unusually high or low

number of values lies within the middle third of the range between the action limits.

The  system  automatically  makes  the  respective  analyses  for  "trend",  "run"  and  "middle  third".  If  a

trend/run and/or middle third is identified, the control chart shows it in a graphic form. The following

events are shown in the control chart via symbols or colors:

  Trend (colored area)

  Run (colored area))

  Middle third (colored area)

  Outlier (symbol:

)

  Xq violates action limit (symbol

)

The presentation of outliers is only possible in the xq chart and median chart. Outliers can only be

displayed  when  single  values  are  shown.  The  function  to  perform  outlier  tests  and  the  function  to

display  outliers  are  separated.  You  can  activate  the  different  outlier  tests  for  the  different  levels

separately. If you have enabled the display of outlier tests, the test result is shown in text form on

top of the respective control chart.

The  below  outlier  tests  are  available  for  the  different  inspection  levels.  The  inspection  level  is

specified in parentheses.

  Grubbs max. (1 %)

  Grubbs max. (5 %)

  Grubbs min. (1 %)

  Grubbs min. (5 %)

  David-Hartley-Pearson (0.5 %)

  David-Hartley-Pearson (1 %)

  David-Hartley-Pearson (5 %)

Notes on outlier tests

FEP-AFP_82.docx

Version: 1.0.23049

Page 32 of 41

In-Process Inspection Reports

  The outlier tests do not refer to the total of all samples, i.e. each sample is considered individually.

Consequently, the following phenomena may appear:

-  Despite a large range between minimum and maximum value no outlier can be identified.

A reason for this may be the equal distribution of the single values within the sample.

-  Despite  a  low  range  between  minimum  and  maximum  value,  an  outlier  is  identified.  A

reason  for  this  may  be  an  accumulation  of  many  values  at  one  “point”  so  that  an

individual  value  having  a  certain  distance  to  this  agglomeration  is  identified  as  outlier

within the sample.

  To  perform  an  outlier  test,  there  must  be  at  least  three  values  in  the  sample.  The  larger  the

number of values in a sample, the more uniform is the overall picture of  the outliers compared to

all samples.

  The  Grubbs  outlier  test  is  performed  with  a  sample  size  of  2  <  n  <  148  (n  =  number  of  values

within  a  sample).  The  outlier  test  according  to  David,  Hartley  und  Pearson  is  performed  with  a

sample size of 2 < n < 1251 (n = number of values within a sample).

X-axis labeling

The below information is available to label the x-axis of control charts.

  Sample number

  Order number

  PPS reference number

  Purchase order number

  ERP batch

  Article number

  Machine number

  Cavity number

  Date + time of the first measured value of a sample

  Date + time of the last measured value of the sample

  Date + time of sample completion

  Badge number of the first measured value of the sample

  Badge number of the last measured value of the sample

  Badge number of sample completion

If  the  following  fields  are  not  available,  you  require  a  new  program  version  of  this

application:

  Partial batch

  Workplace

FEP-AFP_82.docx

Version: 1.0.23049

Page 33 of 41

In-Process Inspection Reports

  Production workplace

  Field 1

  Field 2

  Field 3

  Field 4

  Field 5

  Field 6

  Field 7

  Field 8

The  fields  "field  1"  to  "field  8"  are  enabled  as  part  of  an  MPDV  customizing.  The  field

labels change according to the individual requirements. Because these field names are

flexible,

they

are

only

labeled

"field

1"

to

"field

8".

Field 1 includes, for example, the tool if cavity-related data collection is enabled.

Tooltips in the control chart

If  the  system  has  identified  a  value  as  outlier,  the  detailed  information  is  shown  when  you  mouse

over the symbol (red rhomb). The tooltip includes the test(s) that issued this outlier result.

For mean values, the tool tip shows the value and date and time of the first and last measured value

of this sample and the respective inspection requirement number and inspection step number.

For single measured values, the tooltip shows the exact value.

For the colored areas that identify a trend, run or middle third, a respective note including the reason

is shown .

Sorting of measured values

The  server  decides  on  the  sorting  of  a  control  chart.  The  sorting  type  depends  on  the  settings  of

control  chart  filters.  If  the  filters  "operation  sequence"  and  "inspection  requirement  number"  or

"operation  sequence"  and  "inspection  step  number"  are  entered,  the  characteristic  is  identified

uniquely and sorting is based on the sample number.

Sorting is based on date and time if either the filter field "operation sequence" is left empty or if it is

filled and the fields "inspection requirement number" and "inspection step number" are left empty.

The  displayed  sorting  of  measured  values  influences  the  visual  presentation  of  a  trend  or  run.

However,  the  automatic  generation  of  the  failure  type  "trend"  is  always  based  on  the  measured

values  being  sorted  by  the  sample  number,  as  the  numbers  of  the  operation  sequence,  the

inspection requirement and the inspection step are always known at the time data is recorded.

FEP-AFP_82.docx

Version: 1.0.23049

Page 34 of 41

In-Process Inspection Reports

Consequently, the following scenario might be possible.

  The  control  chart  is  sorted  by  date  and  time  and  a  trend  is  shown,  although  the  automatic

failure "trend" has not been generated.

The control chart is sorted by the sample number and no trend is shown, although the automatic failure

"trend" has been generated.

"Histogram" detail application

All data of the selected inspection step characteristic is used for the graphic presentation.

You can restrict the number of samples displayed in a control chart. This is not possible with a histogram.

The histogram is always based on the total of available samples matching the selection filter criteria. The

number  of  classes  and  the  additionally  displayed  information  influence  the  histogram  presentation.  The

contents of this application are defined by opening the dialog to configure the "histogram". If you use this

dialog to make changes, the changes are saved per user.

FEP-AFP_82.docx

Version: 1.0.23049

Page 35 of 41

In-Process Inspection Reports

In the follolwing, the most important configuration options are described:

Number of classes

Specifies  the  number  of  histogram  classes.  The  measured  values  are  classified  and  displayed  in

these  classes.  If  the  histogram  shows  the  values  within  the  tolerance  limits  (option  "Scale  by

tolerance  limits"),  two  histogram  classes  include  the  values  exceeding  the  tolerance  limit  (upper

and lower).

Scale by tolerance limits

Enabled: The classes are between the tolerance limits - two "outlier classes" being displayed, one

to the left and one to the right.

Disabled: The classes include the total range of all measured values (no separate classes for

values exceeding the tolerance limits).

Consider long-term data

Includes the archived data of the medium-term data area.

Show histogram title

Enable this option if you want to show a special histogram title.

X-axis labeling

If the option "Class limits" is set, the x-axis shows the respective values of the class limit. You can

use the two configuration options for decimal places to specify the detail, i.e. the number of decimal

places.

Consider the number of decimal places

With this option, the defined number of decimal places is used for the x-axis labeling.

FEP-AFP_82.docx

Version: 1.0.23049

Page 36 of 41

Control chart 1/2 and histogram - toolbar

In-Process Inspection Reports

 Control chart 1 settings

Opens a dialog to configure the settings of control chart 1. The respective details are described in

the respective detail application.

 Control chart 2 settings

Opens a dialog to configure the settings of control chart 2. The respective details are described in

the respective detail application.

 Histogram settings

Opens a dialog to configure histogram settings. The details are described in the respective detail

application.

"Samples" detail application

The "samples" detail application is on the level of inspection step characteristics. It includes statistical key

figures  for  each  sample.  In  addition  to  the  referenced  key  fields,  such  as  the  inspection  requirement

number,  inspection  step  number  and  sample  number,  the  following  statistical  values  are  listed  if

available/calculated:

  Xq

  Xq floating

  R floating

  Standard deviation s



s floating

  Minimum

  Maximum

  Range

  Median

  P

FEP-AFP_82.docx

Version: 1.0.23049

Page 37 of 41

In-Process Inspection Reports

  U

  Number of defects

The list additionally shows the characteristic specifications (tolerance, action and warning limits) as well

as the referenced machine.

"Samples" - toolbar

 Complete sample

It might be necessary to complete samples manually, because measured values can be entered for

administration  purposes  or  because  there  might  be  inspections  without  inspection  points  but

including the initial creation of samples and/or inspections without having reached the sample size.

You  can  also  complete  samples  that  have  not  been  completed  by  the  AIP  inspection  data

collection.

 Release sample

You  can  use  this  function  to  re-release  samples  and  to  record  further  measured  values  for  this

sample number if the specified sample size has not yet been reached.

"Single value" detail application

The  "Single  value"  detail  application  is  on  the  level  of  the  inspection  step  characteristics  and  includes

single measured values for all variable inspection step characteristics.  For attributive characteristics the

following information is displayed:

  Number of defects

  Number of NCU (non-conforming units) and

  Failure

You can also identify if the measured value or the attributive assessment is valid or invalid.

In addition to the referenced key fields such as inspection requirement number, inspection step number,

sample number and value number, the detail application lists the characteristic specifications (tolerance,

action and warning limits). For each entry, you also have details on the date and time when the entry was

recorded and edited and on the responsible user.

FEP-AFP_82.docx

Version: 1.0.23049

Page 38 of 41

In-Process Inspection Reports

Single value - editing functions

For administration purposes, you can create, edit or delete measured values for a variable inspection step

characteristic and/or inspection point characteristic. Or you can create, edit or delete the number of non-

conforming units for attributive characteristics. If a new data record is created, you can enter further key

information to specify the assignment. The following information entries can be added:



the sample number

  and value number.

To  precisely  assign  this  key  information,  the  user  requires  "administrative"  skills.  An  administrative

environment is recommended. Users must have profound knowledge of inspection processes, as they are

not guided through the process of data collection/modification and a validation process is not performed.

The user requires the following function authorizations:

Function authorization

value.create => create new measured value

value.edit     => edit measured value

value.delete => delete measured value

Users  must  have  profound  knowledge  of  inspection  processes,  as  they  are  not  guided  through  the

process of data collection/modification and a validation process is not performed.

The fields

  Area,







Inspection requirement number,

Inspection step no.,

Inspection step number (only available for inspection point characteristics),

  OP sequence (uniquely identifies the characteristic),

  Upper tolerance limit,

  Target value,

  Lower tolerance limit and

  Number of decimal places

cannot  be  modified  and  you  cannot  enter  values.  This  is  also  true  when  you  create  new  data  records.

When you create a new data record, this data is taken from the previously selected characteristic and the

referenced inspection requirement as well as from the inspection point.

You can enter values for all other fields when you create or edit a data record.

The field "single value of cavity" is only visible if

FEP-AFP_82.docx

Version: 1.0.23049

Page 39 of 41

In-Process Inspection Reports



the inspection requirement includes a setting specifying that data is generally collected in relation

to cavities and



the  relevant  characteristic  does  not  include  a  setting  specifying  that  the  inspection  must  be

performed without relation to cavities.

If a new data record is created, the field for the measured value will be restricted to the number of decimal

places. The other decimal places are filled up with zeros. For techical reasons, these "additional" decimal

places are shown during processing.

The field "measured value" is shown for variable characteristics. Instead of the measured value field, the

fields "sample size (checked)", and "number of DU" are shown for attributive characteristics, i.e. this also

includes inspection chart characteristics.

Detail application "Statistics"

The  detail  application  "Statistics"  is  on  the  level  of  inspection  step  characteristics.  It  includes  the  usual

statistical key figures for the selected characteristic.

For variable characteristics, the following statistical key figures are included:

  Number of samples

  Number of measured values

  Xqq

  Minimum

  Maximum

  R

  S

  S relative

  Sigma

  Cp and

  Cpk

For attributive characteristics, the following statistical key figures are included:

FEP-AFP_82.docx

Version: 1.0.23049

Page 40 of 41

In-Process Inspection Reports

  Number of non-conforming units

  Number of defects

  p and

  u.

FEP-AFP_82.docx

Version: 1.0.23049

Page 41 of 41


Manual

Standard Control Charts and
Histograms
WEP-RKH 8.1

Version 1.0.1361

Last changed on: 19.06.2020

Standard Control Charts and Histograms

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WEP-RKH_81.docx

Version: 1.0.2372

Page 2 of 40

Standard Control Charts and Histograms

Contents

1  Standard Control Charts and Histograms - Overview .................................. 4

2

Inspection Requirements ............................................................................. 5

WEP-RKH_81.docx

Version: 1.0.2372

Page 3 of 40

1  Standard Control Charts and Histograms - Overview

Standard Control Charts and Histograms

Purpose

This component expands the functions of the inspection requirements to

  display control charts and histograms.

Implementation Considerations

If  the  inspection  requirements  functions  require  order  related  graphical  display  of  the  values  over  time,

use of this component is recommended.

Integration

This component mainly serves the component "Goods Receipt Inspection Planning".

Features

Displaying  a  control  chart  and  histogram for  each  inspection  order  characteristic  to  clearly  visualize  the

collected inspection data (e.g. measured values).

WEP-RKH_81.docx

Version: 1.0.2372

Page 4 of 40

Standard Control Charts and Histograms

2

Inspection Requirements

Summary

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

Utilization

The  inspection  requirement  is  as  important  as  the  production  order  is  in  the  shop  floor  data  collection

module and includes one or several inspection steps (e.g. one inspection step for each operation). In this

context, inspection steps result from the inspection plan search triggered by the generation of inspection

requirements. For this reason, the inspection requirement rather includes general information, such as the

order  or  article  number.  The  inspection  step  that  is  subordinate  to  the  inspection  requirement  finally

includes  the  characteristics  to  be  checked.  Consequently,  the  inspection  step  or  the  operation  of  the

production order (and, as a result, the inspection step as well) is selected and logged on to the terminal

for measurement recording.

As  the  functional  requirements  are  nearly  identical  in  all  areas  (e.g.  goods  receipt,  production,  goods

issue,  gage  management),  the  corresponding  applications  are  structured  nearly  in  the  same  way  for

these areas.

1New  inspection  requirements  cannot  be  created  if  the  "inspection  requirement"  application  is

opened by using transaction codes.

In  creating  inspection  requirements,  the  user  is  generally  supported  by  master  data  catalogs.  For  this

reason, it is very important to conscientiously maintain master data.

WEP-RKH_81.docx

Version: 1.0.2372

Page 5 of 40

Standard Control Charts and Histograms

Integration

Inspection  requests/inspection  steps  are  generated  on  the  basis  of  inspection  plans  that  have  been

created beforehand and refer to them. When being generated, the contents of inspection plans are copied

into the inspection request/inspection steps. Thus, the relation is only based on referencing. The limited

modification  options  that  are  enabled  in  the  inspection  plan  do  not  affect  already  generated  inspection

requirements/inspection steps.

The inspection steps, in turn, are the "objects" that can be checked/inspected and the operation number

connects  them  with  the  corresponding  operation  of  the  production  order  within  production.  Within  gage

management, inspection steps can be put on a level with the actual calibration order.

Nearly all reports/evaluations refer to the  data of inspection requests/inspection  steps and the available

inspection  step  characteristics.  Restricting  filters  are,  e.g.  the  article  number,  order  number,  operation,

and inspection step characteristic.

In  gage  management,  inspection  requirements  are  generated  automatically  from  the  activity

calendar by a user action. In exceptional cases, inspection requirements can also be generated

directly  in  the  “inspection  requirement”  application.  In  this  case  however,  the  inspection  plan

number has to be entered manually.

Prerequisite

Inspection plans need to be created beforehand in the same area/context to be able to create inspection

requests/inspection steps. Master data is also required. Which master data has to be maintained depends

on the respective field of application.

Selection criteria

The list that follows shows some of the available selection criteria. Self-explanatory filter options are not

listed.

Area

Selection list of the configured areas of in-production inspection, goods receipt or goods issue. By

default, the following areas are available:

In-production inspection: Production

Goods receipt: Goods receipt

Goods issue: Goods issue

Initial sample: Initial sample inspection

Gage management: Gage management

WEP-RKH_81.docx

Version: 1.0.2372

Page 6 of 40

Standard Control Charts and Histograms

Inspection request number

The

inspection  requirement  number  uniquely

identifies

the

inspection  request.  HYDRA

automatically generates the inspection requirement number, which is unique.

Status

By  opening a status  list,  the different inspection request statuses may be filtered. In this  way, it is

possible to restrict the list of inspection requirements, e.g. to the completed inspection requests.

Skip lot (available for the goods receipt and goods issue only)

Due to dynamic modifications, an inspection requirement can get the classification "skip lot" and, as

result, it will not be checked.

Order

Number of the corresponding production order or calibration order.

Article number

Direct input or opening of the article catalog and taking over of the number from the entry selected

there.

Drawing issue number

The article is identified uniquely by the combination of "article number" and "drawing issue number".

Customer number

Direct  input  or  opening  of  the  customer  catalog  and  taking  over  of  the  number  from  the  entry

selected there.

Supplier number

Direct  input  or  opening  of  the  supplier  catalog  and  taking  over  of  the  number  from  the  entry

selected there.

Manufacturer number

Direct input or  opening of the manufacturer catalog  and taking over of the number from the entry

selected there.

Actual date from / until

The  time  may  be  restricted  here.  Normally,  in  production  this  field  is  not  filled  out.  In  the  goods

receipt area the "actual date" is the date when the goods are delivered.

WEP-RKH_81.docx

Version: 1.0.2372

Page 7 of 40

Standard Control Charts and Histograms

Planned date from / until

The  time  may  be  restricted  here.  Normally,  in  production  this  field  is  not  filled  out.  In  the  goods

receipt  sector  the  "planned  date"  defines  the  date  when  the  goods  are  (initially)  planned  to  be

delivered.

Manufacturing date from / until

The time may be restricted here.

"Inspection request" field descriptions

The elementary fields are described below.

Inspection requirement

Area

Area in which the inspection request is to be created. A selection list of the configured areas for in-

production inspection, goods receipt, goods issue, initial sampling or gage management facilitates

the creation process. By default, the following areas are available.

In-production inspection: Production

Goods receipt: Goods receipt

Goods issue: Goods issue

Initial sample: Initial sample inspection

Gage management: Gage management

This field is a key field for searching for the active inspection plan or the specified inspection plan

including index on the basis of which the inspection request, inspection steps and inspection step

characteristics are to be generated.

Inspection request number

The inspection request number is automatically generated upon saving. It is numeric, identifies an

inspection request uniquely and cannot be changed.

WEP-RKH_81.docx

Version: 1.0.2372

Page 8 of 40

Standard Control Charts and Histograms

Operation, operation designation

  If operations are in use  only  one of the two fields "operation" or "operation  designation"  has to  be

filled  out.  Only  the  “operation  number”  field  is  to  be  filled  out,  provided  that  an  inspection

requirement and/or an inspection order is to be generated automatically by logging an operation of a

production order on. The work plan structures cause the operation number to be referenced almost

exclusively.

  Subject to system configuration, this field can be a key field for searching for the active inspection

plan  on  the  basis  of  which  the  inspection  requirement,  inspection  steps  and  inspection  step

characteristics  are  to  be  generated.  If  the  system  is  configured  accordingly,  all  inspection  steps

relating  to  the  operations  included  in  the  relevant/detected  inspection  plan  are  generated  already

when the inspection requirement is generated.

Even  areas  that  are  not  assigned  to  a  production  order  (e.g.  goods  receipt  and  gage

management),  might  require  a  “fictitious”  operation  (e.g.  9999)  to  be  specified,  subject  to

system  configuration.  This  “fictitious”  operation  has  to  be  included  in  the  relevant/detected

inspection plan.

Inspection plan number / inspection plan index (specified)

  As  an  alternative  to  indicating  key  fields  for  searching  for  the  active  inspection  plan  to  generate

inspection  requirements,  the  inspection  plan  that  is  to  be  used  for  the  generation  may  also  be

entered in these fields.

Date

When  a  new  data  record  is  created,  this  field  includes  the  system  date,  which  may  be  changed

afterwards. Once it has been saved, this field may no longer be changed.

Article

Input  of  the  article  number.  Provided  that  it  is  known,  it  may  be  entered  directly.  Otherwise,  the

article catalog can be opened and the requested article can be identified and taken over using the

filter  and  sort  criteria  provided  there.  By  selecting  an  article,  the  drawing  issue  number,  article

designation, customer article number and the drawing number are taken over from the master data

record and displayed in the corresponding fields.

  This  field  is  a  key  field  for  searching  for  the  active  inspection  plan  on  the  basis  of  which  the

inspection  requirement,  inspection  steps  and  inspection  step  characteristics  are  to  be  generated,

provided that no inspection plan including index has been specified.

This field is empty or should be left empty in gage management.

WEP-RKH_81.docx

Version: 1.0.2372

Page 9 of 40

Standard Control Charts and Histograms

Drawing issue number

Like the article number, the drawing issue number can be entered directly.

  This  field  is  a  key  field  for  searching  for  the  active  inspection  plan  on  the  basis  of  which  the

inspection  requirement,  inspection  steps  and  inspection  step  characteristics  are  to  be  generated,

provided that no inspection plan including index has been specified.

In case the article number and the drawing issue number are entered directly, the master data

record  is  determined  on  the  basis  of  this  information  while  saving  and  the  article  designation,

customer article number as well as the drawing number are displayed.

The  article  is  identified  uniquely  by  the  combination  of  article  and  drawing  issue  number.  It  is

not obligatory to define and use a drawing issue number.

Provided that the “drawing issue number” field is shown in gage management, it is not allowed

to assign any values to it here.

Companies

Customer / supplier / manufacturer

The  corresponding  company  number  may  either  directly  be  entered  or  by  opening  the

corresponding  master  data  catalog  and  selecting  the  corresponding  entry.  Once  the  inspection

requirement has been selected and/or saved, the company name and address data are displayed

additionally.

These  fields  are  key  fields  for  searching  for  the  active  inspection  plan  on  the  basis  of  which  the

inspection  request,  inspection  steps  and  inspection  step  characteristics  are  to  be  generated,

provided that no inspection plan including index has been specified.

Date - quantities

Actual quantity

The  inspection  scope  is  calculated  subject  to  the  selected  sampling  scheme  and  the  actual

quantity. This is especially true in goods receipt and goods issue if dynamic modification is enabled.

Normally, in production this field remains empty.

Target quantity

In particular for the goods receipt, it is important to indicate the target quantity in order to determine

the difference between the ordered quantity and the actually delivered quantity.

WEP-RKH_81.docx

Version: 1.0.2372

Page 10 of 40

Standard Control Charts and Histograms

Scrap

This field is only relevant if HYDRA exclusively uses the CAQ functions and the shop floor data

collection (BDE) module is not activated.

Rework

This field is only relevant if HYDRA exclusively uses the CAQ functions and the shop floor data

collection (BDE) module is not activated.

Actually produced quantity (act. prod. qty.)

This field is only relevant if HYDRA exclusively uses the CAQ functions and the shop floor data

collection (BDE) module is not activated.

Actual date

In particular for the goods receipt, it is important to indicate the actual date in order to determine the

difference between the planned delivery date and the actual delivery date. Normally, in production

this field remains empty.

Planned date

In particular for the goods receipt, it is important to indicate the planned date in order to determine

the  difference  between  the  planned  delivery  date  and  the  actual  delivery  date.  Normally,  in

production this field remains empty.

Status - details

Status

The status describes the inspection requirement status, e.g. whether it is completed, unchecked

("created" status) or whether inspection results already exist ("partial result" status).

Overall result

The overall result defines whether the inspection request is classified as "pass" or "fail".

Usage decision

The usage  decision classifies the  overall result  in more detail. The  list  of usage  decisions can  be

complemented  when  customizing  the  system.  The  usage  decision  is  preset  subject  to  the  overall

result  when  inspection  requirements  are  completed.  A  "pass"  result  leads  to  the  usage  decision

"release" and a "fail" result leads to the usage decision "reject". The preset usage decision may be

changed when completing the inspection requirement manually.

Skip lot

Due  to  dynamic  modifications,  an  inspection  requirement  can  be  classified  as  "skip  lot"  and,  as  a

result, it will not be checked.

PPS/ERP reference

If inspection requirements are automatically generated by higher-level systems using an interface,

this reference number allows for unique assignments to be made for uploading the results.

WEP-RKH_81.docx

Version: 1.0.2372

Page 11 of 40

Standard Control Charts and Histograms

PPS/ERP addition

If inspection requirements are automatically generated by higher-level systems using an interface,

another piece of information may be added to the unique reference number for uploading results.

This field is only filled out by interface.

Uploaded to PPS/ERP

If this field is enabled (by interface) it indicates that the upload to the higher-level system has been

performed and the higher-level system has confirmed this via interface. This field is only populated

by interface.

Inspection plan number/inspection plan index (used)

The inspection plan number and inspection plan index make clear which inspection plan was used

as basis for the generation of the inspection requirement and subordinate data (inspection steps,

inspection step characteristics).

Cavity assignment

The authorization "ipl_cav" is required for displaying these fields.

The options "none" or "sample" are available for cavity assignment. These options derive from the

inspection plan.

Dynamic modification

Dynamic modification type

Shows the dynamic modification type of the respective inspection requirement. .

Batch-related: The available inspection plan has a dynamic modification based on batches.

Characteristic-related: The existing inspection plan has a dynamic modification based on

characteristics. In this case, the transitional definition, the initial inspection severity as well as the

dynamic modification norm are kept on the level of inspection step characteristics.

None: The available inspection plan does not include dynamic modification.

Transitional definition

These fields (number and designation) are only available if dynamic modification based on batches

or characteristics is defined in the existing inspection  plan. The transitional  definition  provides the

possible inspection severities and controls switching between these different inspection severities.

The content cannot be changed.

Determined inspection severity

It defines  which  inspection severity  is/was used for checking the goods received according to  the

basics for the dynamic modification history. This field is only available if dynamic modification based

on batches is defined in the existing inspection plan. The content cannot be changed.

WEP-RKH_81.docx

Version: 1.0.2372

Page 12 of 40

Standard Control Charts and Histograms

Revised inspection severity

It  defines  which  inspection  severity  is/was  used  for  checking  the  goods  received  according  to

revising the inspection severity manually. This field is only available if dynamic modification based

on batches is defined in the existing inspection plan.

Form

Party in charge type

Provides the shortlist of the different categories of responsible parties, e.g. department, customer,

supplier, external persons

Party in charge

List  of  the  responsible  parties  restricted  to  the  type  selected  beforehand.  This  list  includes  all  the

master data that were marked accordingly in the “party in charge” field.

Party in charge name

Only shows the name/designation of the selected responsible party.

Form

Form type of the available inspection plan.

Calibration

Resource type

Shows the resource type of the resource to be calibrated. For gages, this is the type “PRM”.

Resource

Shows the resource number (gage number) that is assigned to this inspection requirement.

Maintenance

Shows  the  activity  number  that  is  assigned  automatically  by  creating  an  activity  in  the  activity

calendar. The relevant activity is determined or referenced based on this unique ID number.

Calibration findings

Shows the result entered or determined by completing the calibration process, e.g. capable without

restrictions

Calibration status

Shows the status entered or determined by completing the calibration process, e.g. released

Inspection requirement - editing functions

The key fields "area" and "inspection requirement number" as well as the fields "skip lot" and "uploaded to

ERP/PPS" cannot be changed in the editing mode.

WEP-RKH_81.docx

Version: 1.0.2372

Page 13 of 40

Standard Control Charts and Histograms

Inspection requirement toolbar

 Release

Function authorization: irp.release

Transfers the inspection requirement to the status that existed at the time when it was completed,

e.g. to the "partial result" status. This is required in cases where the inspection request has already

been completed and is to be brought again into a condition that can be checked.

 Complete

Function authorization: irp.complete

Opens a dialog to assign a usage decision, whereas a usage decision is already preset on the

basis of the existing inspection results. The inspection request is finally transferred to the

"completed" status, once it has been completed. The inspection steps pertaining to it can no longer

be checked in this status.

 Cancel

Function authorization: irp.cancel

Transfers the inspection requirement to the "canceled" status. This status no longer allows for the

inspection steps pertaining to it to be checked.

"Print" detail application

Function authorization

irp.print

The print dialog  of the  inspection requirement header  opens  a list of available reports. These are Word

forms. The potential content of  these forms is determined by the Web services that are available in the

respective context. The form entries, i.e. the content of the list of forms of the corresponding print dialog,

are defined within the master data of quality management. This is also where the basis for new forms is

established and the corresponding form properties are defined. A corresponding license is required to be

able to change the forms with respect to content and design.

WEP-RKH_81.docx

Version: 1.0.2372

Page 14 of 40

Standard Control Charts and Histograms

The report, 4th edition, 2nd volume VDA (German Association of the Automotive Industry), is available as

special form for initial sampling. In addition to the cover sheet, the relevant annex sheets of the inspection

characteristic results are printed as well. Each appendix includes the inspection characteristics including

the relevant results for a category, e.g. data for dimensional checks (category: dimension).

Print - toolbar

There are no other special function buttons in addition to the standard functions/features.

"Complete inspection requirement“ detail application

Function authorization

irp.complete

The corresponding button has to be clicked in the toolbar to complete an inspection request. An editing

dialog opens afterwards.

Information about the inspection steps pertaining to the inspection requirement is displayed in addition to

information about the inspection requirement itself (i.e. order, batch, article, company data). An inspection

requirement  cannot  be  completed  as  long  as  any  inspection  steps  are  still  open,  i.e.  the  field  “without

result” includes a value greater than  zero. Within this dialog  box it  is, however,  possible to complete  all

inspection orders that are still open by using the button “complete all inspection orders”, provided that the

conditions of a mandatory inspection that might exist are met. The result and further use of the inspection

requirement  may  then  be  specified.  If  all  of  the  inspection  steps  have  been  completed  with  “pass”,  the

system proposes “pass” as the result and “release” as the possible use. If any inspection step has been

completed  with  “fail”,  the  system  proposes  "fail”  as  the  result  and  “reject”  as  the  possible  use.  Another

result and use may still be selected though.

The list indicating the available usage decisions may be changed through MPDV customizing services.

"Inspection step" detail application

Proceeding from an inspection requirement in the master detail grid to an inspection requirement in the

sub-level  of  "inspection  steps"  results  in  all  inspection  steps  pertaining  to  the  selected  inspection

requirement  to  be  displayed.  The  detailed  view  of  the  selected  inspection  step  additionally  shows  the

inspection  step  data.  The  number  or  the  combination  of  the  inspection  steps  depends  on  the

configurations made for the existing inspection plan. In case an inspection plan includes a configuration

saying that the operation is defined on the level of inspection plan characteristics and, in addition to this,

system  configuration  provides  for  the  creation  of  all  corresponding  inspection  steps  along  with  the

generation of the inspection requirement and the first inspection step, the inspection requirement includes

an inspection step for every operation included in the inspection plan.

Moreover, it is possible to release, complete or cancel an inspection step using the toolbar functions.

WEP-RKH_81.docx

Version: 1.0.2372

Page 15 of 40

Standard Control Charts and Histograms

Inspection steps may be deleted but not created or edited manually.

The current status of the inspection step can be taken from the "rating" category of the "inspection step"

tab. The following statuses are possible.

Status

Description

No characteristic (KMM)

The  inspection  step  has  no  characteristics  able  to  be  inspected.

The inspection step is faulty and no inspection can be performed.

Created (ERS)

The  inspection  step  has  been  created  but  not  yet  released  for

inspection. No measurement values have been recorded yet.

Inspection step released (FRE)  The

inspection  step  has  been  released

for

inspection.  No

measurement values have been recorded yet.

Partial result (TER)

The inspection step has been released; some measurement values

have been recorded.

Inspection in progress (IPR)

Measurement  values  for  this  inspection  step  are  currently  being

recorded at another terminal.

Completed (ABG)

The inspection step has been completed.

Canceled (STO)

The inspection step has been canceled.

Skip lot (SKL)

The inspection step is in the "skip-lot" state.

"Inspection step" field descriptions

The  essential  inspection  point  fields  are  described  in  the  paragraphs  that  follow.  Self-explanatory  fields

are not explained.

Inspection step

Inspection step number

Unique number of the inspection step

Status

Status description of the inspection step, e.g. "completed", "partial result", etc.

Result

Qualitative  classification  of  the  inspection  result  based  on  the  corresponding  inspection  results  of

the characteristics pertaining to it.

WEP-RKH_81.docx

Version: 1.0.2372

Page 16 of 40

Standard Control Charts and Histograms

Workplace

Number of the workplace for which this inspection step has been generated.

Workplace designation

Name of the workplace for which this inspection step has been generated.

Inspection point identification

Up to nine different fields may be activated, which can or must be filled out later when inspection points

are generated. By customizing the CAQ system options, it may be defined which fields are to be enabled,

how they are labeled (for some fields) and whether or not it is a mandatory field.

If  a  field  is  activated  and  it  is  a  mandatory  field  the  corresponding  checkbox  will  be  "checked".  The

corresponding  checkbox  is  "checked"  and  grayed  out  if  it  is  not  a  mandatory  field  but  enabled  for  the

resulting data collection. If it is disabled, the checkbox of the field pertaining to it is not activated at all.

Once activated within the inspection point, the fields 1 to 3 are available for entering values with respect

to  "equipment",  "functional  location"  and  "physical  sample".  The  fields  4  to  9  are  user  fields  relating  to

inspection points. The fields 4 and 5 are "alphanumeric" fields, the fields 6 and 7 are numeric, the field 8

is a "date" field and field 9 is a "time" field.

Order data for the inspection step

Order

This is e.g. the production order number in production.

Operation

Number of the operation for which this inspection step has been generated. The operation number

taken from the existing inspection plan is the basis in this context.

Operation designation

Operation  designation pertaining to  the operation  number taken from the existing inspection  plan.

Normally,  this  field  remains  empty,  as  in  nearly  every  case  only  the  operation  number  is  used  in

inspection planning. The operation designation is only used in exceptional cases.

Quantities

Rework

A rework quantity may be entered in this field when the inspection step is completed. This quantity

specification is used for informative purposes only and is not processed by default. Normally, this

field is only used if the shop floor data collection module (BDE) is not used in production, i.e. only

the CAQ module is in use. Moreover, this field is useful in the goods receipt and goods issue area.

Scrap

A scrap quantity may be entered in this field when the inspection step is completed. This quantity

specification is used for informative purposes only and is not processed by default. Normally, this

field is only used if the shop floor data collection module (BDE) is not used in production, i.e. only

the CAQ module is in use. Moreover, this field is useful in the goods receipt and goods issue area.

WEP-RKH_81.docx

Version: 1.0.2372

Page 17 of 40

Standard Control Charts and Histograms

Actually produced quantity (act. prod. qty.)

The actually produced quantity may be entered in this field when the inspection step is completed.

This  quantity  specification  is  used  for  informative  purposes  only  and  is  not  processed  by  default.

Normally,  this  field  is  only  used  if  the  shop  floor  data  collection  module  (BDE)  is  not  used  in

production,  i.e.  only  the  CAQ  module  is  in  use.  Moreover,  this  field  is  useful  in  the  goods  receipt

and goods issue area.

Inspection step - editing functions

An  inspection  step  cannot  be  edited.  Only  quantity  specifications  may  be  added  while  completing

inspection steps.

Inspection step - toolbar

 Release

Function authorization: irisp.release

Transfers an inspection step of the status "created" or "completed" to the "released" status or to the

status that existed at the time when it was completed, e.g. to the "partial result" status.

 Complete

Function authorization: irisp.complete

Opens a dialog where the (inspection) result is preset on the basis of the existing inspection results

of the characteristics. By completing the inspection step, it is finally transferred to the "completed"

status. Inspections can no longer be performed for inspection steps in this status.

 Cancel

Function authorization: irisp.cancel

Transfers the inspection step to the "canceled" status. Inspections can no longer be performed for

inspection steps in this status.

"Complete inspection step" detail application

Function authorization

irisp.complete

WEP-RKH_81.docx

Version: 1.0.2372

Page 18 of 40

The corresponding button has to be clicked in the toolbar to complete an inspection step. The following

editing dialog opens afterwards.

Standard Control Charts and Histograms

The  system  suggests  the  result  "pass"  if  all  corresponding  inspection  step  characteristics  have  the

inspection result "pass" or if they are not yet checked. The system suggests the result "fail" if there is at

least  one  inspection step characteristic that has the  inspection result  "fail". However,  the user is free to

choose another result.

The  "rework  quantity",  "scrap  quantity"  and  the  "actually  produced  quantity"  may  be  entered  when  the

inspection  step  is  completed  (irrelevant  to  gage  management).  This  quantity  specification  is  used  for

informative  purposes  only  and  is  not  processed  by  default.  Normally,  this  field  is  only  used  if  the  shop

floor  data  collection  module  (BDE)  is  not  used  in  production,  i.e.  only  the  CAQ  module  is  in  use.

Moreover,  these  fields  are  useful  in  the  goods  receipt  and  goods  issue  area.  In  particular  in  the  goods

receipt  area,  it  is  useful  to  record  scrap  and  rework  as  these  details  may  be  uploaded  for  several

inspection  steps  to  a  higher-level  system  at  a  later  point  in  time  when  inspection  requirements  are

completed.

"Inspection points" detail application

The standard configuration of the system specifies that inspection points are only used in the production

area.  Using  inspection  points  only  makes  sense  if  several  samples  are  drawn  and  checked  within  an

order/inspection requirement. This is, for example, the case if inspections are to be performed subject to

different events in production. This might, for example, be the case if a specified inspection interval based

on  quantities  or  time  is  reached.  As  the  individual  inspection  plan  characteristics  might  have  different

events that make inspections become due, the inspection points of an inspection step might indeed have

different inspection characteristics.

Once an inspection has been performed, every inspection point is to be completed. Every inspection point

has an inspection result (pass, fail) and  a status (completed, open). Inspection points that have not  yet

been checked have a "pass" inspection result by default.

WEP-RKH_81.docx

Version: 1.0.2372

Page 19 of 40

Standard Control Charts and Histograms

Please note

If  text  exceeding  the  field  lengths  existing  in  the  relevant  inspection  point  dialog  is  entered  in

inspection  point  fields  that  are  also  visible/used  on  AIP  terminals,  this  field  content  will  be  cut  off

when saving the inspection point in AIP. Therefore, the field contents should not be longer than the

field lengths configured for the AIP inspection point dialog. The field lengths of AIP dialogs can be

adjusted as part of system customization.

"Inspection points" field descriptions

The  essential  inspection  point  fields  are  described  in  the  paragraphs  that  follow.  Self-explanatory  fields

are not explained.

Inspection point

Inspection point number

The  inspection  point  number  identifies  the  inspection  point  uniquely  among  the  inspection  points

pertaining  to  the  inspection  step.  The  superordinate  key  fields  "inspection  step  number"  and

"inspection request number" are shown in addition to the "inspection point" field.

Inspection result

The inspection result can be "pass" or "fail". Inspection points that have not yet been checked have

the inspection result "pass" by default (standard system configuration).

Status

An inspection point can be completed or open. Only open inspection points may still be checked at

the AIP terminal.

Inspection point identification

The fields, which have been identified as being activated in the superordinate inspection step, are shown

here. The CAQ system options define which fields identify the inspection point and which ones require

input. The following fields are displayed by default, whereas none of these fields requires input.

Date

Time

Allows  for  a  date  to  be  entered.  The  system  date  is  preset  in  case  new  inspection  points  are

created.  This  date  may  directly  be  changed  if  they  are  created  manually.  Otherwise,  the  editing

mode allows for changes to be made.

Allows  for  a  time  to  be  entered.  The  system  time  is  preset  in  case  new  inspection  points  are

created.  This  time  may  directly  be  changed  if  they  are  created  manually.  Otherwise,  the  editing

mode allows for changes to be made.

WEP-RKH_81.docx

Version: 1.0.2372

Page 20 of 40

Standard Control Charts and Histograms

In addition to the configurable identification fields, there are still the following identification fields that are

always available.

Workplace

If the inspection point is generated at an AIP terminal or the automatic generation is triggered by an

inspection  event  of  a  specific  terminal,  this  field  shows  the  workplace  of  the  triggering  inspection

station.  If  an  inspection  station  is  specified  this  inspection  point  will  only  be  available  at  this

inspection station.

Batch

Possibility to enter a corresponding batch.

Partial batch

Possibility to enter a corresponding partial batch.

Details

Generation of inspection points

If an inspection point is generated automatically on the basis of reaching a defined time or quantity

interval,  it  has  the  flag  "relating  to  time"  or  "relating  to  quantities".  An  inspection  point  that  is

assigned  the  flag  "free"  has  been  generated  manually  or  on  the  basis  of  other  events  that  make

inspections become due.

Inspection points - editing functions

New inspection points cannot be created for completed or canceled inspection steps. The same applies

to the modification of existing inspection points. To allow for an inspection point to be created or edited,

the inspection step has to be released beforehand.

Inspection points - toolbar

 Release

Function authorization: iripp.release

Transfers a completed inspection point to the "open" status.

 Complete

Function authorization: iripp.complete

Opens a dialog window that allows for inspection points to be completed.

WEP-RKH_81.docx

Version: 1.0.2372

Page 21 of 40

Standard Control Charts and Histograms

"Complete inspection point" detail application

Function authorization

iripp.complete

The  corresponding  button  has  to  be  clicked  in  the  toolbar  to  complete  an  inspection  point.  Then  the

following editing dialog opens including an inspection result that cannot be changed and that is calculated

on the basis of the inspection results for characteristics. In addition to this, in the tab “Evaluation” a usage

decision for inspection points calculated on the basis of the inspection results for characteristics is preset,

which  may,  however,  be  changed  manually.  To  do  so,  there  is  a  selection  listof  usage  decisions  for

inspection  points,  filtered  by  the  plant,,  whereas  every  usage  decision  finally  classifies  the  inspection

point either as "pass" or "fail", irrespective of the inspection result. Additional information is displayed on

the  usage  decision  selected  for  the  inspection  point,  once  the  selection  has  been  confirmed.  Additional

information may, for example, be the code group, code number, catalog type and the factory/site.

MPDV services for customizing the system may provide further usage decisions for inspection points.

According to the configuration  of identification fields, they can still be edited  when inspection points are

completed. If some identification fields require input (mandatory fields), they need to be filled out before

inspection points can be completed. In addition to this, quantity fields may also be filled out.

"Inspection step/inspection point characteristics" detail application

Function authorization

iriscp.*

The detail application of inspection steps/inspection point characteristics is nearly identical to the master

data  of  characteristics  application.  For  this  reason,  reference  is  made  only  to  additional  features  in  the

following.

 Go to

For further information on the definition of characteristics, please refer to the functional description of the

document entitled MOC_CharacteristicsQM.

The inspection step characteristics are displayed below the inspection step within the master-detail grid.

Provided  that  inspection  points  are  in  use  and  inspection  points  have  been  generated,  the  list  of

inspection points may be opened below the inspection steps. This list again allows for the characteristics

pertaining to the selected inspection point to be opened.

WEP-RKH_81.docx

Version: 1.0.2372

Page 22 of 40

Standard Control Charts and Histograms

The existing inspection plan determines which characteristics are included in the inspection step. In case

the inspection plan is configured in a way specifying that a separate inspection step is to be generated for

each operation (applying to several workplaces), the inspection step only includes the characteristics of a

specific  operation.  Provided  that  the  inspection  plan  has  additionally  been  configured  to  generate  a

separate inspection step for every workstation, an inspection step always includes the characteristics of a

fixed combination of operation and workplace.

An  inspection  point,  in  turn,  only  includes  characteristics  of  the  same  event  causing  inspections  to

become due. Even the manual generation of inspection points represents a due date event. An inspection

point  is  generated  automatically,  once  e.g.  a  quantity  interval  defined  for  the  inspection  step

characteristics  has  been  achieved.  This  inspection  point  includes  all  characteristics  that  have  the  same

quantity interval or that have a quantity interval that has the achieved quantity interval as least common

multiple.

Example:

Characteristic 1 has a quantity interval of 100 and characteristic 2 of 200. Once the first 100 items have

been produced, an inspection point is generated, which only includes characteristic 1. After another 100

items that have been produced, another inspection point  is generated that includes the characteristics 1

and 2.

If  an  inspection  becomes  due  because  of  changing  the  machine  status,  the  generated  inspection  point

only includes characteristics that have to be checked on the basis of the same machine status change.

Only  manually  generated  inspection  points  are  not  limited  with  respect  to  the  corresponding

characteristics. These inspection points always include all characteristics of the related inspection step.

Inspection step/inspection point characteristics field descriptions

The  paragraphs  that  follow  only  describe  the  fields  that  are  available  in  addition  to  the  characteristic

master data or inspection plan characteristics.

Characteristic

Initial sample creation

Shows  the  field  content  transferred  from  the  basic  inspection  plan  characteristic.  A  separate

sheet/page is printed for each category in the printed initial sample report.

Properties

Dynamically modified

This checkbox is enabled, provided that a characteristic is dynamically modified.

WEP-RKH_81.docx

Version: 1.0.2372

Page 23 of 40

Standard Control Charts and Histograms

Dynamic modification

Determined inspection severity/inspection severity designation

This  field  shows  the  inspection  severity  determined  for  this  characteristic  on  the  basis  of  the

dynamic modification rules specified within the inspection plan.

Revised inspection severity/inspection severity designation

This  field  only  exists  if  dynamic  modification  is  based  on  characteristics.  A  new  initial  inspection

severity  is  displayed  here,  provided  that  the  user  has  intervened  in  the  process  of  dynamic

modification and changed the current inspection severity (new initial inspection severity).

Please note

A note is displayed in this field, in case an error has occurred with the dynamic modification of this

characteristic while inspection steps are generated.

Details

No cavity

The authorization "ipl_cav" is required for displaying these fields.
This  option  allows  for  a  characteristic  to  be  highlighted  as  irrelevant  to  cavities,  although  the

respective  inspection  requirement  specifies  that  the  relevant  characteristics  are  (actually)  to  be

recorded in relation to cavities.

This checkbox has always to be enabled for attributive characteristics and inspection charts.

Sample group

This field specifies which sample group this characteristic belongs to.

Sampling

If a characteristic is assigned a sample group, this checkbox specifies whether or not a sample is to

be  generated  by  way  of  this  characteristic.  If  this  is  the  case,  it  is  a  "sampling  characteristic".

Consequently,  the  checkbox  is  to  be  enabled.  A  sample  group  is  to  be  assigned  to  the  sampling

characteristic.

If these fields are not available, you require a new program version of this application.

Specifications

Sample size

This field shows the determined sample size, if within an inspection plan characteristic a sampling

scheme is defined that does not require the sample size to be indicated, as it is calculated on the

basis  of  the  actual  quantity  of  the  inspection  requirement.  This  is,  for  example,  the  case  for  the

sampling schemes "batch inspection" or "100% inspection".

WEP-RKH_81.docx

Version: 1.0.2372

Page 24 of 40

Standard Control Charts and Histograms

 Go to

The  other  fields  of  the  respective  tabs  correspond  to  those  of  the  characteristic  master  data  and  are

described in the documentation entitled "CAQ characteristic master data".

Inspection step/inspection point characteristics - editing functions

Inspection step or inspection point characteristics cannot be edited.

“Inspection request documents" and "characteristic documents" detail

applications

The above screenshot shows how an inspection requirement document is assigned.

Provided that the "documents" tab has been activated, as many documents as required may be assigned

to each inspection requirement and each inspection step characteristic within the master-detail grid. If this

tab is activated in the master-detail grid corresponding editing buttons are enabled in the toolbar to edit

the documents.

When  documents  are  assigned,  all  formats  registered  by  Windows  are  provided.  Consequently,  it  is

possible to assign simple documents (e.g. written in Word), drawings of any format and videos. However,

the  corresponding  programs  that  are  able  to  display  the  required  formats  have  to  be  installed.  In  this

context, the documents are opened by the program that has been linked in Windows.

The file types are "File", "URL" and "Text". The file name including the path may be entered manually for

the  "file"  type.  The  "URL"  file  type  enables  access  to  the  Internet  or  Intranet.  The  third  file  type  "Text"

allows for text to be entered directly.

A  designation  may  be  assigned  to  each  defined  document.  Moreover,  it  may  be  determined  in  which

order  the  documents  are  to  be  listed.  The  "position"  field  is  used  for  this  purpose  (numeric  input).  The

specifications  made  within  this  list  must  be  unique.  In  addition,  the  checkbox  "display  with  inspection"

determines whether or not the document may be shown during the inspection process.

WEP-RKH_81.docx

Version: 1.0.2372

Page 25 of 40

Standard Control Charts and Histograms

"Inspection plan documents“ and "documents for inspection plan

characteristics" toolbar

In addition to the standard functions, there is also the button to show the documents.

 Show documents

If  a  document  link  is  defined  this  button  opens  and  shows  this  document.  However,  a  program,

which can show the linked file type, has to be installed on the PC.

"Failure" detail application

A  "failure  list"  detail  application  is  provided  on  the  level  of  inspection  requirements.  This  list  shows  all

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

  Characteristic number and designation

  Workplace number and designation

  Weighting (number, e.g. for an inspection chart characteristic)

  Comment,

  Failure date,

  Failure time

The list may be restricted in a flexible way by using the individual column filter. In addition, the  grouping

function allows for failures to be listed for every characteristic, for example.

WEP-RKH_81.docx

Version: 1.0.2372

Page 26 of 40

Standard Control Charts and Histograms

Failure list - editing functions

Failure  analysis  entries  can  be  created,  edited  or  deleted  for  inspection  requirements.  If  a  new  data

record is created, further key information, such as



Inspection step number,

  OP sequence number (uniquely identifies the characteristic),

  Sample number

  Value number

may be added to the assignment.

The target group can be found in the administrative area, as "administrative" skills are required for more

precise assignment of this key information.

These authorizations are required.

Function authorization

failure.create => create new failure

failure.edit     => edit failure

failure.delete => delete failure

Users  must  have  profound  knowledge  of  the  inspection  processes  as  they  are  not  guided  through  the

process of data collection/modification and validation checking is not performed.

The  fields  "area"  and  "inspection  requirement  number"  can  neither  be  modified  nor  assigned  values

during initial data creation. This data is taken from the previously selected inspection requirement when it

comes to initial data creation.

The  other  fields  can  be  assigned  values  as  part  of  initial  data  creation.  Only  the  fields  "weighting"  and

"comment" may be changed in the editing mode.

"Measures" detail application

A "measure list" detail application is provided on the level of inspection requirements. This list shows all

measures  which  have  been  assigned  to  the  characteristics,  samples  or  measured  values  during  the

inspection process.

In addition to the respective measure number and designation, the following data is also referenced.



Inspection requirement



Inspection step

  Operation sequence number (OP sequence, AFO)

  Sample number

  Value number

WEP-RKH_81.docx

Version: 1.0.2372

Page 27 of 40

Standard Control Charts and Histograms

  Measure type

  Party in charge incl. type

  Status

  Comment

  Text

  Effectiveness

The list may be restricted in a flexible manner by using the individual column filter. The grouping function

provides further analysis options.

"Measures" toolbar

The  button  "measure  tracking"  can  be  used  to  open  the  measure  tracking  dialog  to  edit  and  create

measures. Measure tracking is filtered by the internal and unique "serial number" of the measure in the

"references" tab. Filtering is omitted if no measure is selected.

 Go to measure tracking

Function authorization

failure.* => opens measure tracking

"Control chart 1 / 2" detail application

The control charts 1 and 2 defined for the inspection step characteristic are displayed by default. In case

they  are  not  defined  for  the  inspection  step  characteristic,  the  xq  and  s  charts  are  used  for  variable

characteristics and the p and u chart for attributive characteristics.

All data of the selected inspection step characteristic is used as basis for graphic preparation.

WEP-RKH_81.docx

Version: 1.0.2372

Page 28 of 40

Standard Control Charts and Histograms

The contents of this application are defined by opening the dialog to configure "control chart 1" or "control

chart 2". Changes made via this dialog are saved according to the user's requirements. Provided that no

special settings have been made, the xq chart ("variable" characteristic type) or the p chart ("inspection

chart"  or  "attributive"  characteristic  type)  is  displayed,  by  default.  Subject  to  the  characteristic  type,  the

user may choose to display one of the following control charts by default.

Variable characteristic

  Xq chart



s chart

  R chart

  Single value chart

  Median chart

Attributive characteristic

  p chart

  np chart



c chart

  u chart

WEP-RKH_81.docx

Version: 1.0.2372

Page 29 of 40

Standard Control Charts and Histograms

The paragraphs that follow explain the essential configuration options.

Number of the samples to be requested

Specifies how many samples or single measured values are to be displayed in the control chart.

Display …

The  options  that  include  the  term  "display  ..."  enable  or  disable  the  presentation  of  the

corresponding data in the control chart.

Consider long-term data

This option has to be checked to integrate archived data from the medium-term data area.

Combine minimum and maximum values

It is recommendable to show the minimum and maximum values that are each connected by a line

to improve the presentation of the range of dispersion of single values.

Automatic scaling

The  "automatic  scaling"  function  allows  for  all  values  to  be  displayed,  irrespective  of  the  existing

limit values. This shows even extreme outliers in the control chart. The disadvantage is that there is

less  space  for  the  other  measured  values  and,  it  is  very  often  the  case  that  a  changing  value

pattern can hardly be recognized.

WEP-RKH_81.docx

Version: 1.0.2372

Page 30 of 40

Standard Control Charts and Histograms

Show trend / run / middle third

The monitoring functions "trend", "run" and "MiddleThird" allow better surveillance of a process than

by  using  the  control  chart  alone.  However,  they  can  only  be  used  with  control  charts  for  xq  and

median.  The  trend  allows  visualization  of  an  upward  or  downward  tendency  in  the  process  over

several  samples.  By  default,  these  are  seven  subsequent  rising  or  falling  values.  The  run  shows

sections in which the process runs above or below the mean value (when displayed, otherwise the

target value) over several samples. By default a run is recognized if seven subsequent values are

above the mean value. The number of seven samples/values for recognizing a trend or run, which is

set  by  default,  may  be  changed  by  customizing  the  system.  "MiddleThird"  refers  to  an  unusually

high or low number of values, in the section of the control chart viewed, within the middle third of the

area bounded by the action limits.

Respective  analyses  are  performed  automatically  for  "trend",  "run"  and  "MiddleThird".  The  control

chart  shows  in  a  graphic  if  a  trend,  run  and  /  or  MiddleThird  is  available/detected.  The  following

events are altogether represented by icons or color codes in the control chart.

  Trend (can be recognized by a colored area)

  Run (can be recognized by a colored area))

  Middle Third (can be recognized by a colored area)

  Outlier (icon:

)

  Xq violates action limit (icon

)

The  presentation  of  outliers  is  restricted  to  the  xq  chart  and  median  chart  and  connected  with  the

presentation  of  single  values.  There  are  different  functions  for  performing  and  presenting  outlier

tests. The different outlier tests for the different levels may be activated separately. Provided that the

presentation of outlier tests has been activated, the result of this test is displayed in text form above

the corresponding control chart.

The below outlier tests are available for the different inspection levels, whereas the inspection level

is indicated in parentheses.

  Grubbs max. (1 %)

  Grubbs max. (5 %)

  Grubbs min. (1 %)

  Grubbs min. (5 %)

  David-Hartley-Pearson (0.5 %)

  David-Hartley-Pearson (1 %)

  David-Hartley-Pearson (5 %)

Notes on outlier tests

WEP-RKH_81.docx

Version: 1.0.2372

Page 31 of 40

Standard Control Charts and Histograms

  The  outlier  tests  do  not  refer  to  the  collectivity  of  all  samples,  i.e.  every  sample  is  considered

individually. Consequently, the following phenomena may appear:

-  Despite a large range between minimum and maximum value no outlier can be identified.

A reason for this may be the equal distribution of the single values within the sample.

-  Despite a low range between minimum and maximum value an outlier can be identified.

A  reason  for  this  may  be  an  accumulation  of  many  values  at  one  “point”  so  that  an

individual  value  having  a  certain  distance  to  this  agglomeration  is  identified  as  outlier

within the sample.

  At least three values have to be in the sample in order to be able to perform an outlier test. The

more  values  are  available  within  a  sample  the  more  uniform  the  general  view  of  the  outliers

becomes compared to all samples.

  The  Grubbs  outlier  test  is  performed  with  a  sample  size  of  2  <  n  <  148  (n  =  number  of  values

within  a  sample).  The  outlier  test  according  to  David,  Hartley  und  Pearson  is  performed  at  a

sample size of 2 < n < 1251 (n = number of values within a sample).

X-axis labeling

The below information is available to label the x-axis of control charts.

  Sample number

  Order number

  PPS reference number

  Purchase order number

  Batch

  Article number

  Machine number

  Cavity number

  Date + time of the first measured value of a sample

  Date + time of the last measured value of the sample

  Date + time of sample completion

  Badge number of the first measured value of the sample

  Badge number of the last measured value of the sample

  Badge number of sample completion

If these fields are not available, you require a new program version of this application.

  Partial batch

  Workplace

  Production workplace

WEP-RKH_81.docx

Version: 1.0.2372

Page 32 of 40

Standard Control Charts and Histograms

  Field 1

  Field 2

  Field 3

  Field 4

  Field 5

  Field 6

  Field 7

  Field 8

The fields "field 1" to "field 8" are enabled subject to their usage by MPDV customizing

and assigned an individual designation. As these field names are flexible, they are only

entitled

"field

1"

to

"field

8"

in

this

document.

Field 1 includes, for example, the tool if cavity-related data collection is enabled.

Tool tips within the control chart

When  a  value  is  labeled  being  an  outlier  (red  rhomb)  detailed  information  on  which  test(s)  was

(were)  the  crucial  factor  for  this  determination  is  displayed  when  going  with  the  mouse  over  this

labeling (rhomb).

For mean values the tool tip shows the value, date and time for the first and last measured value of

this sample as well as the corresponding inspection request number and inspection step number.

The exact value is shown for single measured values.

A  special  note  indicating  why  an  area  is  colored  is  also  displayed  for  the  colored  areas  when  a

trend, run or middlethird is recognized.

Sorting of measured values

The type of control chart sorting is determined by the server and depends on how the control chart

filters  are  configured.  If  the  filters  "operation  sequence"  and  "inspection  request  number"  or

"operation  sequence"  and  "inspection  step  number"  are  indicated  the  characteristic  is  identified

uniquely and sorting is based on the sample number.

Sorting is based on date and time if either the filter field "operation sequence" is left empty or it is

filled out and the fields "inspection request number" and "inspection step" number are left empty.

The  optical  presentation  of  trend  or  run  always  refers  to  how  the  measured  values  are  sorted.

However,  the  automatic  generation  of  the  failure  type  "trend"  is  always  based  on  the  measured

values being sorted by the sample number, as the numbers for the operation sequence, inspection

request and the inspection step are always known at the time data is recorded.

Consequently, the following scenario might be possible.

WEP-RKH_81.docx

Version: 1.0.2372

Page 33 of 40

Standard Control Charts and Histograms

  The  control  chart  is  sorted  by  date  and  time  and  a  trend  is  shown,  although  the  automatic

failure "trend" has not been generated.

The control chart is sorted by the sample number and no trend is shown, although the automatic failure

"trend" has been generated.

"Histogram" detail application

All data of the selected inspection step characteristic is used as basis for graphic preparation.

Unlike the control charts, which display a specified excerpt from the sample set, the histogram is always

based on the entire set of available samples matching the selection filter criteria. The appearance of the

histogram  is  determined  by  the  number  of  classes  and  by  any  elements  additionally  displayed.  The

contents of this application are defined by opening the dialog to configure the "histogram". Changes made

via this dialog are saved according to the user's requirements.

WEP-RKH_81.docx

Version: 1.0.2372

Page 34 of 40

Standard Control Charts and Histograms

The paragraphs that follow explain the essential configuration options.

Number of classes

Determines  the  number  of  histogram  classes  according  to  which  the  measured  values  are  to  be

distributed.  If  represented  within  the  tolerance  limits  (option  "scale  by  tolerance  limits")  one

histogram class each is outside of the tolerance limits.

Scale by tolerance limits

Enabled: The classes are in between the tolerance limits with each one "outlier class" to the left

and to the right.

Disabled: The classes include the range of all measured values (no separate classes for values

outside of the tolerance limits).

Consider long-term data

Includes the archived data from the medium-term data area.

Show histogram title

If a special title is to be displayed it may be entered by enabling this option.

x-axis labeling

The x-axis shows the corresponding values of the class limits if the "class limits" option is set. The

number of decimal places that are to be displayed may be set by the two configuration options for

decimal places.

Consider the number of decimal places

Takes into account the defined number of decimal places in the x-axis labeling.

WEP-RKH_81.docx

Version: 1.0.2372

Page 35 of 40

Standard Control Charts and Histograms

Control chart 1/2 and histogram

 Control chart 1 settings

Opens a dialog to configure the settings of control chart 1. The corresponding details are described

in the respective detail application.

 Control chart 2 settings

Opens a dialog to configure the settings of control chart 2. The corresponding details are described

in the respective detail application.

 Histogram settings

Opens a dialog to configure the histogram settings. The corresponding details are described in the

respective detail application.

"Samples" detail application

The statistical key figures about every single sample can be found in the "samples" detail application on

the level of inspection step characteristics. In addition to the referenced key fields, such as the inspection

requirement number, inspection step number and sample number, provided that they are available or can

be calculated, the key figures

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

  U

  Number of defects

WEP-RKH_81.docx

Version: 1.0.2372

Page 36 of 40

Standard Control Charts and Histograms

are  listed.  The  list  additionally  shows  the  characteristic  specifications  (tolerance,  action  and  warning

limits) as well as the referenced machine.

"Samples" toolbar

 Complete sample

It  might  be  necessary  to  complete  samples  manually,  as  measured  values  can  be  entered  on

"administration"  level  or  as  there  might  be  inspections  without  inspection  points  including  the

creation of new samples and/or inspections without having reached the sample size. Samples can

even be completed if they have not been completed by AIP inspection data collection.

 Release sample

This function enables samples to be released once more and the collection of additional measured

values for this sample number, provided the defined sample size has not yet been reached.

"Single values" detail application

The  single  measured  values  for  all  variable  inspection  step  characteristics  can  be  found  in  the  "single

values" detail application on the level of inspection step characteristics. For attributive characteristics the

following information

  Number of defects

  Number of NCU (non-conforming units) and

  Defects

is displayed. Moreover, it can be recognized whether the measured value or the attributive assessment is

valid or invalid.

The  characteristic  specifications  (tolerance,  action  and  warning  limits)  are  listed  in  addition  to  the

referenced  key  fields,  such  as  the  inspection  requirement  number,  inspection  step  number,  sample

number, and value number. Every entry also shows the date and time when it was recorded and edited

as well as the responsible user.

WEP-RKH_81.docx

Version: 1.0.2372

Page 37 of 40

Standard Control Charts and Histograms

Single values - editing functions

Measured  values  can  be  created,  edited  or  deleted  for  a  variable  inspection  step  characteristic  and/or

inspection point characteristic and the number of non-conforming units may be created, edited or deleted

for  attributive  characteristics  on  "administration"  level.  If  a  new  data  record  is  created,  further  key

information, such as



the sample number

  and value number

may be added to specify the assignment.

The target group can be found in the administrative area, as "administrative" skills are required to provide

for  more  precise  assignment  of  this  key  information.  Users  must  have  profound  knowledge  of  the

inspection  processes,  as  they  are  not  guided  through  the  process  of  data  collection/modification  and

validation checking is not performed.

These authorizations are required.

Function authorization

value.create => create new measured value

value.edit     => edit measured value

value.delete => delete measured value

Users  must  have  profound  knowledge  of  inspection  processes,  as  they  are  not  guided  through  the

process of data collection/modification and validation checking is not performed.

The fields

  Area,







Inspection request number,

Inspection step no.,

Inspection step number (only available for inspection point characteristics),

  OP sequence (uniquely identifies the characteristic),

  Upper tolerance limit,

  Target value,

  Lower tolerance limit and

  Number of decimal places

can  neither  be  modified  nor  assigned  values  during  initial  data  creation.  When  it  comes  to  initial  data

creation,  this  data  is  taken  from  the  previously  selected  characteristic  and  the  referenced  inspection

requirement as well as from the inspection point.

The other fields can be assigned values and/or changed during initial data creation.

The field "single value of cavity" is only visible if

WEP-RKH_81.docx

Version: 1.0.2372

Page 38 of 40

Standard Control Charts and Histograms



the  inspection  requirement  shows  an  ID  indicating  that  data  is  generally  collected  in  relation  to

cavities and



the relevant characteristic is not assigned an ID indicating that it still has to be checked without

relation to cavities.

If a new data record is created, the field for the measured value will be restricted to the number of decimal

places.  The  other  decimal  places  are  filled  up  with  zeros.  For  technical  reasons,  these  "additional"

decimal places are shown during processing.

The field "measured value" is shown for variable characteristics. Instead of the measured value field, the

fields "sample size (checked)", and "number of DU" are shown for attributive characteristics, i.e. this also

includes inspection chart characteristics.

"Statistics" detail application

The common statistical key figures about the selected characteristic can be found in the "statistic" detail

application on the level of inspection step characteristics.

For variable characteristics these are

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

For attributive characteristics these are

  Number of non-conforming units

WEP-RKH_81.docx

Version: 1.0.2372

Page 39 of 40

Standard Control Charts and Histograms

  Number of defects

  p and

  u.

WEP-RKH_81.docx

Version: 1.0.2372

Page 40 of 40


Manual

Cavity-Related Inspection
Planning for FEP
FEP-NES 8.1

Version 1.0.1884

Last changed on: 19.06.2020

Cavity-Related Inspection Planning for FEP

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Distribution or reproduction of this document, either in whole or in part, without the express written permission of MPDV, is strictly
prohibited, irrespective of the purpose or in what form.

Information contained in this documentation may be changed or amended without notice.

FEP-NES_81.docx

Version: 1.0.6259

Page 2 of 21

Cavity-Related Inspection Planning for FEP

Contents

1  Cavity-related inspection planning for FEP .................................................. 4

2

Inspection planning ...................................................................................... 5

FEP-NES_81.docx

Version: 1.0.6259

Page 3 of 21

Cavity-Related Inspection Planning for FEP

1  Cavity-Related Inspection Planning for FEP

Purpose

This  component  allows  for  activating  cavity-related  data  collection  in  inspection  planning  with  a  cavity

reference to the sample. This allows for the cavity-related collection of data in the inspection process and

their subsequent evaluation.

Implementation notes

You use this component if you want to collect and evaluate data in relation to cavities.

Integration

This component is the basis for "Collection/information functions for quality data" using the data collection

functions of the AIP data collection client.

Features

The following functions are available:

  Definition of sample-related cavity assignment on the inspection plan level

  Activation / deactivation of inspection plan characteristics for cavity-related data collection

FEP-NES_81.docx

Version: 1.0.6259

Page 4 of 21

Cavity-Related Inspection Planning for FEP

2

Inspection Planning

Overview

Menu

Quality management  In-production inspection  Inspection planning

Quality management  Goods receipt  Inspection planning

Quality management  Goods issue  Inspection planning

Quality management  Initial sample  Inspection planning

Quality management  Test equipment management  Inspection planning

Transaction code

iplp1

Function authorization

iplp

Usage

According to the area of use, inspection planning is the most important function as the inspection plans

are the basis for the creation of inspection orders with subsequent inspections. This refers to inspections

in  goods  receipt,  production  and  goods  issue.  In  addition,  there  are  initial  sample  inspections  and  the

calibration  of  test  equipment.  Since  the  requirements  of  inspection  planning  are  almost  identical  in  all

areas, the functions of inspection planning in HYDRA are almost identical for these areas.

When  creating  inspection  plans,  the  user  is  generally  supported  by  the  master  data  catalogs.  For  this

reason, careful maintenance of master data is very important.

1If  you  start  the  "inspection  plan"  application  by  entering  the  transaction  code,  you  cannot

create a new inspection plan.

Integration

Inspection planning is the  prerequisite for creating inspection requirements, the related  inspection steps

and the resulting inspections/calibrations.

The inspection plan used is referenced in the inspection requirements created. In addition, the inspection

planning  is  referenced  in  some  evaluations.  As  a  consequence,  the  basis  of  an  inspection  order

characteristic control chart can be extended to the data of the same inspection plan number.  The same

applies to the global control chart analysis. Here it is possible to use specific inspection plan filter fields.

Global  control  chart  evaluation  does  not  take  account  of  any  calibration  data  and  hence  no  filtering

according to calibration inspection plans.

FEP-NES_81.docx

Version: 1.0.6259

Page 5 of 21

Cavity-Related Inspection Planning for FEP

Another significant relationship exists with regard to the production control plan. A production control plan

cannot be prepared without the prior creation of inspection plans.

Prerequisite

The creation of inspection plans requires the maintenance of the relevant master data. The master data

to  be  maintained  depend  on  the  relevant  application.  However,  the  prior  maintenance  of  articles  and

characteristics is essential. As far as the creation of article group inspection plans is concerned, the entry

of article groups is also required.

Selection criteria

An extract of existing selection criteria is included  below. Filter  options that are  self-explanatory  are not

listed here.

Area

Selection list of configured areas of in-production inspection, goods receipt and goods issue. The

following areas are available by default:

In-production inspection: Production

Goods receipt: Goods receipt

Goods issue: Goods issue

Initial sample: Initial sample inspection

Gage/test equipment management: Test equipment management

Active

The inspection plan list can be limited to active inspection plans by activating the check box. If  this

checkbox  is  not  checked,  only  inspection  plans  in  "Processing"  and  "Released"  status  are

indicated. The third status of this check box (grayed out) shows all inspection plans. This status is

set initially.

Article number

Filtering for article number with regard to article-related inspection plans.

Article designation

Filtering for article designation/name with regard to article-related inspection plans.

Article group

If filtering according to an article group inspection plan is requested, the symbol

 can be used

to open the article group tree. The Accept and Cancel functions are available here.

Operation

Operation number

FEP-NES_81.docx

Version: 1.0.6259

Page 6 of 21

Cavity-Related Inspection Planning for FEP

Customer number

Direct entry or  opening of the customer catalog with adoption of the number of the entry selected

there.

Supplier number

Direct  entry  or  opening  of  the  supplier  catalog  with  adoption  of  the  number  of  the  entry  selected

there.

Manufacturer number

Direct  entry  or  opening  of  the  manufacturer  catalog  with  adoption  of  the  number  of  the  entry

selected there.

Field descriptions

Inspection plan header

Area, inspection plan number, inspection plan index

"Area", "Inspection plan number" and "Inspection plan index" ensure unambiguity across all existing

inspection  plans.  The  area  can  be  selected.  The  inspection  plan  number  and  the  inspection  plan

index can be entered alphanumerically. All 3 fields are mandatory.

The entry of the three pieces of information must be unambiguous, i.e. there must be no inspection

plan which already contains this information. It is possible to add specific information by allocating a

structured  inspection  plan  number.  This  may  be  useful  for  subsequent  sorting.  Alternatively,  the

inspection plan number can also be set to be the same as the article or gage/test equipment group

number.  The  inspection  plan  index  corresponds  to  the  inspection  plan  version.  If  an  existing

inspection plan  version  is to be changed, but a mere  change is not  possible since this  inspection

plan was already used  when the inspection order  was created, the original inspection plan has to

be copied and the inspection plan index has to be modified (e.g. increased by one). With regard to

subsequent  evaluations  (e.g.  presentation  of  cross-order  control  charts  with  different  underlying

inspection plan versions but identical inspection plan number), the inspection plan number should

be retained if possible.

As  regards  the  creation  of  calibration  inspection  plans,  only  24  characters  may  be  entered  in

the  inspection  plan  number  field.  Depending  on  the  system  configuration,  the  inspection  plan

number  is  entered  in  the  activity  calendar  in  the  field  "Project  number".  The  field  "Project

number" is limited to 24 characters there.

FEP-NES_81.docx

Version: 1.0.6259

Page 7 of 21

Cavity-Related Inspection Planning for FEP

Inspection plan type

A  distinction  is  made  between  the  inspection  plan  types:  "Article  inspection  plan"  and  "Group

inspection  plan".  The  type  "Article  inspection  plan"  allows  for  allocating  an  article,  for  which  this

inspection plan is to be created, from the article master data. As regards the creation of an article

group inspection plan, the option "Group inspection plan" is to be selected. This allows for selecting

an  article  group.  The  selected  article  group  is  indicated  in  a  separate  field  in  the  overall  tree

structure.

Article

Entry of article number. If known, the article number may be entered directly. Otherwise, the article

catalog  can  be  opened,  the  searched  article  can  be  identified  and  accepted  using  the  filter  and

sorting  criteria.  When  selecting  an  article,  the  drawing  issue  number,  article  designation/name,

customer  article  number  and  drawing  number  are  transferred  from  the  master  data  record  and

indicated in the relevant fields.

If the field "article number" or "article group" is shown in gage/test equipment management, no

entries must be made here.

Drawing issue number

The drawing issue number may be entered directly as the article number.

If the article number and the drawing issue number are entered directly, the master data record

is  identified  based  on  this  information  when  the  entry  is  saved,  and  subsequently  the  article

designation/name, the customer article number and the drawing number are indicated.

The combination of article and drawing issue number identifies the article unambiguously. The

definition and use of a drawing issue number is not mandatory.

If  the  field  Drawing  issue  number  is  shown  in  gage/test  equipment  management,  no  entries

must be made here.

FEP-NES_81.docx

Version: 1.0.6259

Page 8 of 21

Cavity-Related Inspection Planning for FEP

Operation assignment

  One of the two assignment types "One inspection plan for each operation" and "One inspection plan

for all operations” can be selected.

  The  operation  assignment  defines  whether  the  characteristics  of  various  operations  ("One

inspection  plan  for  all  operations")  shall  be  included  in  the  inspection  plan  to  be  generated,  or

whether the inspection plan shall only include the characteristics of one operation. With the setting

"One  inspection  plan  for  each  operation",  the  fields  "Operation"  and  "Operation  Designation"  are

shown.  Otherwise,  the  operation  information  is  assigned  in  the  area  of  the  inspection  plan

characteristics.  Wherever  possible,  the  setting  "One  inspection  plan  for  all  operations"  should  be

used.  For  example,  this  allows  for  printing  all  inspection  characteristics  of  an  item  even  if  it

comprises several operations.

In  areas  with  no  assignment  to  a  production  order,  the  option  "One  inspection  plan  for  all

operations"  should  be  used.  The  advantage  of  this  is  that  the  "fictional"  operation  must  be

entered  in  the  inspection  plan  header  only  once  instead  of  an  entry  for  each  inspection  plan

characteristic.  The  prerequisite  for  this  inspection  plan  variant  is  the  corresponding  system

configuration which has to be performed by MPDV Consulting.

Operation, operation designation/name

  If  operations  are  used,  an  entry  must  be  made  in  only  one  of  the  two  fields  "Operation"  or

"Operation  Designation".  If  an  inspection  requirement/inspection  order  shall  automatically  be

created by the logon of a production order, only the operation number shall be entered in the field

"operation".

  It  is  to  be  observed  that  these  fields  are  used  as  search  criteria  when  inspection  orders  are

generated subsequently. This means that if only the designation is entered for the operation in the

inspection  plan,  this  precise  information  must  also  be  included  for  the  generation  of  inspection

orders.

Even in areas with no assignment to a production order (e.g. in goods receipt and in gage/test

equipment management), a "fictional" operation is to be assigned (e.g. 9999). This is necessary

if you want to generate inspection steps later.

Released / Active

This identifies whether the inspection plan has been released or also has the 'active' status. If the

inspection plan has been released and/or is active, the relevant check box is activated. The release

and activation of an inspection plan, i.e. its status change, is only possible via the relevant functions

in the toolbar. Before activation, a release is required.

Only active inspection plans will be considered in the subsequent inspection order creation.

FEP-NES_81.docx

Version: 1.0.6259

Page 9 of 21

Cavity-Related Inspection Planning for FEP

Released by / on

Shows the HYDRA user who released the inspection plan. In addition, the release date is indicated.

Cavity assignment

The authorization "ipl_cav" is required to show these fields.
A selection between "None" and "Sample" is possible with regard to cavity assignment.

If this field is not available, you need a new program version of this application.

Valid from / to

If required, a validity period may be indicated here instead of "global" activation via the toolbar. This

period  is  considered  when  the  inspection  order  is  created.  Since  the  user  will  not  have  a  distinct

overview of the valid inspection plans in case of activation for a period, the variant of "global" and

time-independent  activation  via  the  toolbar  is  preferable.  In  case  of  activation  via  the  toolbar,  the

system  precisely  monitors  whether  an  active  inspection  plan  already  exists  for  the  defined  article

with the same drawing issue number, customer and supplier indications, if any. If this is the case,

the previously active inspection plan is automatically deactivated upon activation.

Inspection type

Characteristic or piece-related inspection

As regards characteristic-related inspection, the relevant characteristic is fully inspected first, if e.g.

a total of 5 samples is inspected. As regards piece-related inspection, the characteristic is changed

after each value measurement, since one piece is inspected completely in each case.

Action

Create inspection step or Create and immediately release inspection step.

Only released inspection steps can be inspected.

Customer / Supplier / Manufacturer

If a customer/manufacturer or supplier is selected, the relevant inspection plan only applies to the

selected  company.  The  customer  /  manufacturer  /  supplier  is  hence  the  key  field  of  an  active

inspection plan. In this case, the inspection requirement must also include a company entry so that

this inspection plan is used for creating the inspection requirement.

FEP-NES_81.docx

Version: 1.0.6259

Page 10 of 21

Cavity-Related Inspection Planning for FEP

Dynamic modification type

Characteristic or batch-related or none

The authorization "iriscp.dynamic" is required to show these fields.

batch-related: In this case, the transitional definition to be used for dynamic modification is

identified on the inspection plan header level. In addition, the initial inspection severity is defined on

the inspection plan header level. Finally, the reference for the dynamic modification standard is

required on the inspection plan characteristic level. The selection, however, is limited to the dynamic

modification standards referencing to the same inspection severity definition as the allocated

transitional definition.

characteristic-related: In this case, the transitional definition, the initial inspection severity and the

dynamic modification standard are referenced on the inspection plan characteristic level. However,

the inspection severity definition of the assigned transitional definition and the assigned dynamic

modification standard have to match.

none: The function of dynamic modification is not activated for this inspection plan.

Transitional definition

The authorization "iriscp.dynamic" is required to show these fields.

This field is only available if a batch or characteristic-related dynamic modification was selected

before. The available inspection severities are provided and the change between inspection

severities is controlled.

Initial inspection severity

The authorization "iriscp.dynamic" is required to show these fields.

This field is only available if a batch or characteristic-related dynamic modification was selected

before. It defines the inspection severity applied to the first goods receipt in accordance with the

principles for the dynamic modification history.

EMU form

  This can be used to select the form types available for initial sampling. At present, only the form type

"VDA  volume  2,  4th  edition"  is  supported.  According  to  the  form  type,  an  appropriate  list  of  entry

categories is shown in the inspection plan characteristics.

Editing functions

The  key  fields  "Area",  "Inspection  plan"  and  "Inspection  plan  index"  cannot  be  modified  in  the  editing

mode.

FEP-NES_81.docx

Version: 1.0.6259

Page 11 of 21

Cavity-Related Inspection Planning for FEP

Toolbar

 Copy

The following dialog opens for copying an inspection plan.

The destination type and area can be entered here. Usually, it should be identical with that of the

source inspection plan. Subsequently, the new inspection plan number and index are to be entered.

If a new version of an inspection plan is created, the destination plan number is selected identically

and only the inspection plan index is modified.

 Activate

Function authorization: iplp.activate

Switches the inspection plan to the "active" status.

 Deactivate

Function authorization: iplp.deactiv

Resets the inspection plan from the "active" status to the "released" status.

 Release

Function authorization: iplp.release

Sets an inspection plan from the "in process" status to the "released" status.

FEP-NES_81.docx

Version: 1.0.6259

Page 12 of 21

Cavity-Related Inspection Planning for FEP

 In process

Function authorization: iplp.inprocess

Sets an inspection plan from the "released" status to the "in process" status.

Detail application printing

Function authorization

iplp.print

The  print  dialog  of  the  inspection  plan  header  opens  a  list  of  available  reports.  These  are Word  forms.

The  potential  contents  of  these  forms  are  defined  by  the  Web  services  available  in  this  context.  The

quality management master data include definitions of form entries, i.e. the contents of the form list of the

relevant  printing  dialog.  This  is  also  where  the  basis  for  new  forms  is  created  and  the  relevant  form

characteristics are defined. Changes in the contents and design of forms require an appropriate license.

Toolbar printing

Apart from the standard functions, no other special functional buttons are available.

Detail application inspection plan characteristics

The  detail  application  of  Inspection  plan  characteristics  is  almost  identical  to  the  application  of  the

characteristic master data. For this reason, only modifications or new features are addressed here.

 Go to

For more details on characteristics definitions, please refer to the functional description of the document

MOC_CharacteristicsQM .

In the inspection plan characteristics level, the relevant inspection plan characteristics are assigned to the

previously  defined  inspection  plan  header.  The  assignment  is  made  via  a  new  entry  by  activating  the

characteristic catalog and accepting the characteristic highlighted there. By  accepting the characteristic,

all  master  data  entries  are  copied  into  the  inspection  plan  characteristic.  Subsequently,  any  (copied)

information  can  be  modified  and/or  amended.  Amendments  are  frequently  made  in  the  characteristic

designation in order to define it in more detail.

It is possible to create a characteristic which does not exist in the characteristic catalog. This, however, is

only recommended in exceptional cases, since all analyses (e.g. the failure mode analysis) are based on

characteristics from the characteristic catalog. For this reason, thorough maintenance of the characteristic

catalog is advisable.

FEP-NES_81.docx

Version: 1.0.6259

Page 13 of 21

Prior to amending specific characteristic data, various properties and settings may be defined.

Cavity-Related Inspection Planning for FEP

Field descriptions

Inspection plan characteristics

AFO

The  sequence  of  the  subsequent  inspection  is  determined  by  the  work  sequence  number  (AFO).

The entry must be unambiguous. Ideally, the new entry should define the work sequence number in

increments of ten. This allows for inserting a new characteristic between two existing ones at a later

date.

Characteristic number

Number of the characteristic selected from the master data.

Characteristic type

This  is  where  the  decision  as  to  whether  the  subsequent  inspection  is  performed  by  collecting

measured values (variable) or by indication of the number of failures detected (attributive) is made.

As  regards  the  attributive  inspection,  the  decision  is  frequently  only  based  on  Pass  and/or  Fail.

Other types of characteristics are the failure collection chart and the information characteristic. The

information  characteristic  is  only  used  to  display  a  document  during  the  inspection  sequence.

According to the input type, appropriate sampling schemes are available at the bottom.

Inspection result base

A  distinction  is  made  as  to  whether  all  samples  or  only  the  last  recorded  sample  is  used  to

determine the inspection result (Pass/Fail).

Mandatory inspection

If this click field is set, one measured value has to be recorded as a minimum requirement, before

an inspection order with this characteristic can be completed.

Calculate characteristic

This designates a characteristic to be calculated.

Formula

Details on this are available in the manual of the CAQ characteristic master data.

Initial sample creation

Selection  list  of  creation  categories  for  initial  sampling.  The  contents  depend  on  the  form  type

selected  in  the  inspection  plan  header.  The  inspection  plan  characteristics  are  summarized

according to the entry category in the subsequent initial sample inspection report, and a separate

page is printed for each entry category.

FEP-NES_81.docx

Version: 1.0.6259

Page 14 of 21

Cavity-Related Inspection Planning for FEP

Copy characteristic

This  can  be  used  to  define  which  characteristic  is  to  be  copied  from  an  initial  sample  inspection

plan into a production plan, for instance. Only the characteristics which were marked as relevant in

this field are copied.

Details

This is used to define whether the contents of the "Details" tab are to be defined in the inspection

plan  with  regard  to  this  characteristic,  or  whether  they  are  to  be  determined  from  the  underlying

master  data  characteristic  on  the  basis  of  this  inspection  plan  for  the  subsequent  creation  of  an

inspection requirement. Upon activation of the option "From characteristic catalog", the "Details" tab

is  hidden.  The  setting  "From  characteristic  catalog"  makes  sense  if  it  is  a  characteristic  whose

entries can be defined identically for several articles (even across article groups). In this case, the

entries  can  be  defined  centrally  in  the  master  data.  This  significantly  reduces  the  input  and

subsequent modification effort.

Specifications

This  is  used  to  define  whether  the  contents  of  the  "Specification"  tab  are  to  be  defined  in  the

inspection  plan  with  regard  to  this  characteristic,  or  whether  they  are  to  be  determined  from  the

underlying master data characteristic and/or an entry from the specification list on the basis of this

inspection  plan  for  the  subsequent  creation  of  an  inspection  requirement.  Upon  activation  of  the

option  "From  list"  or  "From  characteristic  catalog",  the  tabs  "Specifications",  "Chart  1",  "Default

values chart 1", "Chart 2" and "Default values chart 2" are hidden.  It only makes sense to use the

setting "From list" in the case of an article group inspection plan. The specifications list is used if the

specifications  for  distinct  characteristics  vary  from  article  to  article  in  an  article  group  inspection

plan.

Not a cavity

The authorization "ipl_cav" is required to show these fields.

This setting can be used to identify a characteristic as not cavity-relevant, although the associated

inspection  requirement  states  that  the  associated  characteristics  (actually)  are  to  be  collected  in

relation to a cavity.

This  check  box  must  always  be  set  for  attributive  characteristics  and  failure  collection  chart

characteristics.

Dynamically modified

The authorization "iriscp.dynamic" is required to show these fields.

This field is only available if a batch or characteristic-related dynamic modification was activated in

the inspection plan header before.  This setting can be used to define that a characteristic is not to

be dynamically modified despite the selected dynamic modification in the inspection plan header.

FEP-NES_81.docx

Version: 1.0.6259

Page 15 of 21

Cavity-Related Inspection Planning for FEP

Transitional definition

The authorization "iriscp.dynamic" is required to show these fields.

This field is only available if a batch or characteristic-related dynamic modification was activated in

the inspection plan header before.  The selectable transitional definition provides the potential

inspection severities and controls the change between inspection severities. With regard to batch-

related dynamic modification, the transitional definition is assigned in the inspection plan header

and is not available on the inspection plan characteristic level in this case.

Initial inspection severity

The authorization "iriscp.dynamic" is required to show these fields.

It defines the inspection severity applied to the first goods receipt in accordance with the principles

for the dynamic modification history. Only the inspection severities of the previously selected

transitional definition are available. With regard to batch-related dynamic modification, the

transitional definition is assigned in the inspection plan header and is not available on the

inspection plan characteristic level in this case.

Standard

The authorization "iriscp.dynamic" is required to show these fields.

This field is only available if a batch or characteristic-related dynamic modification was activated in

the inspection plan title before, and this characteristic was also marked as relevant to dynamic

modification.  Assignment of the dynamic modification standard from the master data to be used.

Inspection level

The authorization "iriscp.dynamic" is required to show these fields.

This field is only available if a batch or characteristic-related dynamic modification was activated in

the inspection plan header before, and this characteristic was also marked as relevant to dynamic

modification. An inspection level can only be selected if the assigned standard complies with DIN

ISO 3951 or DIN ISO 2859.

AQL

The authorization "iriscp.dynamic" is required to show these fields.

This field is only available if a batch or characteristic-related dynamic modification was activated in

the inspection plan header before, and this characteristic was also marked as relevant to dynamic

modification.  An AQL value can only be selected if the assigned standard complies with DIN ISO

3951 or DIN ISO 2859.

Method

The authorization "iriscp.dynamic" is required to show these fields.

This field is only available if a batch or characteristic-related dynamic modification was activated in

the inspection plan header before, and this characteristic was also marked as relevant to dynamic

modification.  A method can only be selected if the assigned standard complies with DIN ISO 3951.

FEP-NES_81.docx

Version: 1.0.6259

Page 16 of 21

Cavity-Related Inspection Planning for FEP

Sample group

The authorization "ipl_ipsampling" is required to show these fields.

This field indicates to which sample group this characteristic belongs. The sample group specifies

the characteristics belonging to a sample / a sampling characteristic.

Sampling

The authorization "ipl_ipsampling" is required to show these fields.

If a characteristic was assigned to a sample group, this check box determined whether a sample is

to be generated by means of this characteristic. In this case, this is a so-called sampling

characteristic. This check box is to be activated for sampling characteristics. The sampling

characteristic has to be assigned to a sample group.

If a sample is to be inspected on the basis of this characteristic, this check box must be inactive.

If this field is not available, you need a new program version of this application.

Inspection  plan  characteristics  assigned  to  a  sample  group  must  be  configured  so  that  the

details  are  retrieved  from  the  inspection  plan  instead  of  the  characteristic  catalog,  since  the

sample group assignment can only be made in the inspection plan.

All  sample  characteristics  of  the  same  sample  group  to  be  inspected  must  "end"  in  the  same

inspection  step.  This  means  the  combination  of  inspection  station  (machine,  machine  group)

and operation must be kept identical for the sample characteristics in the inspection plan.

If  the  inspections  for  the  producing  machine  (including  sampling  characteristic)  are  to  be

performed in the same operation as the inspections of the samples, the following aspects are to

be observed in the characteristic planning for this operation:

  The  characteristics,  on  the  basis  of  which  the  inspections  are  recorded  for  the

producing  machine,  and  the  sampling  characteristic  must  have  a  specific  inspection

station (e.g. MACHINE).

  The characteristics, on the basis of which the inspections are recorded for the samples,

must be assigned to another inspection station (e.g. LABORATORY).



In  the  associated  inspection  plan,  the  configuration  "PS  +  inspection  station"  must  be

configured as "One PS for each inspection station".

  The  configuration  of  the  terminal  to  which  the  producing  machine  was  assigned  must

be allocated to the inspection station "MACHINE" for the previously described example

FEP-NES_81.docx

Version: 1.0.6259

Page 17 of 21

Cavity-Related Inspection Planning for FEP

in the "QM functions" tab.

  The configuration of the terminal on which the samples are inspected must be allocated

to  the  inspection  station  "LABORATORY"  for  the  previously  described  example  in  the

"QM functions" tab.

 Go to

The fields of the relevant tabs correspond to those of the characteristic master data and are to be taken

from the functional description of the document MOC_CharacteristicsQM .

Inspection plan characteristics toolbar

 Insert

After selecting a characteristic from the master data, all characteristic information of the master

data characteristic is transferred to the inspection plan characteristic.

Due  to  the  selection  of  the  master  data  characteristic,  the  documents  assigned  to  the  master

data characteristic are also assigned to the inspection plan characteristic.

FEP-NES_81.docx

Version: 1.0.6259

Page 18 of 21

Cavity-Related Inspection Planning for FEP

 Copy

For copying inspection plan characteristics, the data of the highlighted characteristic is opened in

the insertion mode. All fields may be edited. For saving, the allocation of an AFO number, which

does not yet exist in this inspection plan, is required.

The  inspection  plan  characteristic  documents  from  whose  context  the  'Copy'  button  was

confirmed are accepted.

Detail applications "Inspection plan documents" and "Inspection plan

characteristic documents"

The above screenshot shows how an inspection plan document is assigned

FEP-NES_81.docx

Version: 1.0.6259

Page 19 of 21

Cavity-Related Inspection Planning for FEP

The above screenshot shows how a document of an inspection plan characteristic is assigned

Upon appropriate activation of the "Inspection plan documents" and/or "Characteristic documents" in the

master  detail  grid,  any  number  of  documents  may  be  assigned  to  each  inspection  plan  and  inspection

plan  characteristic.  Upon  activation  of  these  tabs,  the  relevant  buttons  are  activated  for maintaining  the

documents in the toolbar.

As  regards  document  assignment,  all  formats  registered  by  Windows  are  available.  This  means  that

simple  documents  (e.g.  prepared  in Word),  drawings  of  any  formats  and  videos  may  be  assigned.  The

subsequent  display  only  requires  the  installation  of  an  appropriate  program  capable  of  displaying  this

format. The documents are opened by the program indicated as link in Windows.

The available file types are "File", "URL" and "Text". As regards the "File" type, the file name including the

path may be entered manually. The file type "URL" allows for accessing the Internet and/or Intranet. The

third file type, "Text", allows for directly entering a text.

A  designation  may  be  assigned  to  each  document  entered.  In  addition,  it  is  possible  to  define  the

sequence in which the documents are to be listed. This is effected by using the field Position (numerical

entry).  The  entry  within  this  list  must  be  unambiguous.  Apart  from  this,  the  check  box  "Display  with

inspection"  can  be  used  to  determine  whether  the  document  may  be  indicated  during  the  inspection

process.

FEP-NES_81.docx

Version: 1.0.6259

Page 20 of 21

Cavity-Related Inspection Planning for FEP

Toolbar "Inspection plan documents" and "Inspection plan characteristic

documents"

In addition to the standard functions, the button for displaying the documents is available.

 Show documents

If  a  document  link  is  defined,  this  button  opens  and  shows  this  document.  However,  a  program,

which is able to visualize the linked file type, has to be installed on the PC.

FEP-NES_81.docx

Version: 1.0.6259

Page 21 of 21


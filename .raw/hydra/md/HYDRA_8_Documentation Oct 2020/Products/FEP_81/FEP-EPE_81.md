Manual

Extended Inspection Planning
for Initial Sample Inspection
FEP-EPE 8.1

Version 1.0.1884

Last changed on: 19.06.2020

  Extended Inspection Planning for Initial Sample Inspection

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

FEP-EPE_81.docx

Version: 1.0.4566

Page 2 of 19

  Extended Inspection Planning for Initial Sample Inspection

Contents

1  Extended Inspection Planning for Initial Sample Inspection - OverviewError! Bookmark not defined.

2

Inspection Planning ...................................................................................... 5

FEP-EPE_81.docx

Version: 1.0.4566

Page 3 of 19

  Extended Inspection Planning for Initial Sample Inspection

1  Extended Inspection Planning for Initial Sample Inspection

Purpose

This component is intended to extend the functions of inspection planning by









the assignment of gages,

the  entry  of  calculation  formulas  to  calculate  measured  values  from  the  results  of  other

characteristics

the definition of events to initiate inspections

the print of inspection plans.

Implementation considerations

To the extent the initial sample inspection is to be performed on basis of VDA volume 2, 4th edition, and

the related Initial sample inspection report is to be printed, use of this component is recommendable.

The same applies for the automatic measured value recording by means of an interface device since this

requires the assignment of gages.

Integration

This component primarily serves the component "Inspection planning for initial sample inspection".

Features

The following functions are available:



Indication  of  formula  for  the  automatic  calculation  of  the  measurement  result  with  reference  to

already collected measured values of previous inspection characteristics.

  Assignment  of  gages  /  gage  groups  with  the  possibility  of  using  them  for  automated  measured

value recording by means of the HYDRA measurement data interface.

  Print  of  VDA  initial  sample  inspection  reports  pursuant  to  VDA  volume  2,  4th  edition  by  using

Word with the possibility of assignment to the document list of the related inspection request.

  Preparation of own initial sample inspection report forms if a license to create and manage Word

forms is available.

FEP-EPE_81.docx

Version: 1.0.4566

Page 4 of 19

  Extended Inspection Planning for Initial Sample Inspection

2

Inspection Planning

Summary

Menu

Quality management  In-production inspection  Inspection planning

Quality management  Goods receipt  Inspection planning

Quality management  Goods issue  Inspection planning

Quality management  Initial sample  Inspection planning

Quality management  Gage management  Inspection planning

Transaction code

iplp

Function authorization

iplp

Utilization

Subject to the field of application, inspection planning is the most important function, as inspection plans

are  the  basis  for  the  generation  of  inspection  orders  and  the  resulting  inspections.  This  means

inspections in the area of goods receipt, production and goods issue as well as initial sample inspections

and  the  calibration  of  test  equipment  and  measurement  equipment.  As  the  requirements  as  regards

inspection  planning  are  nearly  identical  in  all  areas,  the  HYDRA  inspection  planning  functions  are  also

nearly identical for these areas.

In  creating  inspection  plans,  the  user  is  supported  in  most  cases  by  the  master  data  catalogs.  For  this

reason it is very important to conscientiously maintain this master data.

Integration

Inspection planning is a prerequisite to generating inspection requirements, the corresponding inspection

steps and, as a result, the relevant inspections/calibrations.

The  inspection  plan  in  use  is  referenced  in  the  generated  inspection  requirements.  Moreover,  some

evaluations/reports  also  refer  to  inspection  planning.  Consequently,  data  of  the  same  inspection  plan

number  can  be  added  to  the  basis  of  a  control  chart  for  inspection  order  characteristics.  The  same

applies to the global control chart  analysis,  where special inspection plan filter fields may be used. The

global  control  chart  analysis  does  not  take  into  account  calibration  data  and,  as  a  result,  no  filtered

calibration inspection plans.

Another essential relation  has been established to the production control plan.  As no production control

plan can be created without having generated inspection plans beforehand.

FEP-EPE_81.docx

Version: 1.0.4566

Page 5 of 19

  Extended Inspection Planning for Initial Sample Inspection

Prerequisite

Relevant master data needs to be edited/maintained to be able to create inspection plans. Which master

data  has  to  be  maintained  depends  on  the  respective  field  of  application.  However,  it  is  a  fundamental

prerequisite that articles/items and characteristics are maintained beforehand. Article groups also need to

be created, provided that inspection plans based on article groups are created.

Selection criteria

The paragraph that follows shows some of the available selection criteria. Self-explanatory filter options

are not listed.

Area

Selection list of the configured areas of in-production inspection, goods receipt and goods issue. By

default, the following areas are available.

In-production inspection: Production

Goods receipt: Goods receipt

Goods issue: Goods issue

Initial sample: Initial sample inspection

Gage management: Gage management

Active

By  checking  the  corresponding  field,  the  inspection  plan  list  can  be  restricted  to  active  inspection

plans.  If  this  checkbox  is  not  checked  the  list  only  shows  inspection  plans  that  are  in  the  "in

process" and "released" status. The third state of this checkbox (grayed out) shows all  inspection

plans. This is set by default.

Article number

Filters the article number with respect to inspection plans based on articles.

Article designation

Filters the article name with respect to inspection plans based on articles.

Article group

The article group tree can be opened by clicking the

 icon, in case inspection plans for article

groups are to be filtered. A function to cancel and accept the entries made is provided.

Operation

Operation number

FEP-EPE_81.docx

Version: 1.0.4566

Page 6 of 19

  Extended Inspection Planning for Initial Sample Inspection

Customer number

Direct  input  or  opening  of  the  customer  catalog  and  taking  over  of  the  number  from  the  entry

selected there.

Supplier number

Direct  input  or  opening  of  the  supplier  catalog  and  taking  over  of  the  number  from  the  entry

selected there.

Manufacturer number

Direct input or  opening of the manufacturer catalog  and taking over of the number from the entry

selected there.

Field descriptions

Inspection plan header

Area, inspection plan number, inspection plan index

Uniqueness of all existing inspection plans is secured by the "area", "inspection plan number" and

"inspection plan index". The area may be selected. The inspection plan number and inspection plan

index may be entered using alphanumeric characters. All three fields are mandatory fields.

The  input  of  these  three  pieces  of  information  must  be  unique,  i.e.  no  other  inspection  plan  may

exist that already includes this information. By assigning a structured inspection plan number, it is

possible to provide specific information. This information might be useful later during sorting. As an

alternative, the inspection plan number may also be used synonymously with the article number or

gage  group  number.  The  inspection  plan  index  corresponds  to  the  inspection  plan  version.  If  an

existing  inspection  plan  version  is  to  be  modified,  yet  it  cannot  simply  be  edited  because  it  has

already been used to generate inspection orders, it is recommended to copy the original inspection

plan  and  then  modify  the  inspection  plan  index  (e.g.  incrementing  it  by  1).  The  inspection  plan

number should be maintained,  if possible, to facilitate later evaluations/reports (e.g.  for displaying

control charts applying to several orders, in which case the inspection plan versions on which the

evaluation is based differ while the inspection plan number is identical).

Inspection plan type

The  inspection  plan  types  "article  inspection  plan"  and  "group  inspection  plan"  are  distinguished.

The "article inspection plan" type allows for an article to be assigned from the article master data for

which this inspection plan is to be created. The "group inspection plan" option has to be selected to

create  an  inspection  plan  for  article  groups.  This  allows  for  an  article  group  to  be  selected.  The

selected article group is displayed in a separate field within the tree structure.

FEP-EPE_81.docx

Version: 1.0.4566

Page 7 of 19

  Extended Inspection Planning for Initial Sample Inspection

Article

Input  of  the  article  number.  Provided  that  it  is  known,  it  may  be  entered  directly.  Otherwise,  the

article catalog can be opened and the requested article can be identified and taken over using the

filter  and  sort  criteria  provided  there.  By  selecting  an  article,  the  drawing  issue  number,  article

designation, customer article number and the drawing number are taken over from the master data

record and displayed in the corresponding fields.

The customer article number is not displayed within the goods receipt inspection planning.

Nothing  may  be  entered  here  if  the  field  “article  number”  or  “article  group”  is  shown  in  gage

management.

Drawing issue number

The drawing issue number can be entered directly, just as it is the case for the article number.

In case the article number and the drawing issue number are entered directly, the master data

record  is  determined  on  the  basis  of  this  information  while  saving  and  the  article  designation,

customer article number as well as the drawing number are displayed.

The  article  is  uniquely  identified  by  the  combination  of  article  and  drawing  issue  number.  It  is

not obligatory to define and use a drawing issue number.

Nothing may be entered here if the “drawing issue number” field is shown in gage management.

Operation assignment

  One  of  the  two  assignment  types  "an  inspection  plan  for  each  OP"  and  "an  inspection  plan  for  all

OPs" may be selected.

  By assigning operations, it is defined whether the inspection plan to be created should include the

characteristics  of  different  operations  ("one  inspection  plan  for  all  OPs")  or  whether  the  inspection

plan should only include the characteristics of one operation. The fields "operation" and "operation

designation" are shown if the "an inspection plan for each OP" option is selected. In any other case,

operation  details  are  assigned  in  the  area  of  inspection  plan  characteristics.  The  option  "one

inspection plan for all OPs" should be selected as far as possible. This allows, for example, printing

out of all inspection characteristics of an article, although it has several operations.

The option “one inspection plan for all OP“ should be used in areas that  are not assigned to a

production  order.  This  provides  the  advantage  that  the  “fictious”  operation  only  has  to  be

entered  once  in  the  inspection  plan  header,  instead  for  every  inspection  plan  characteristic.

FEP-EPE_81.docx

Version: 1.0.4566

Page 8 of 19

  Extended Inspection Planning for Initial Sample Inspection

However, the system has to be configured accordingly by MPDV consultants to be able to use

this inspection plan variant.

Operation, operation designation

  If operations are used, only one of the two fields "operation" or "operation designation" needs to be

filled  out.  Only  the  operation  number  has  to  be  entered  in  the  "operation"  field  if  an  inspection

requirement/inspection  order  is  to  be  generated  automatically  by  logging  an  operation  of  a

production order on.

  It  has  to  be  taken  into  consideration  that  these  fields  are  used  as  search  criteria  when  inspection

orders  are  generated  at  a  later  point  in  time.  Provided  that  only  the  designation  is  entered  for  the

operation  within  the  inspection  plan,  exclusively  this  information  needs  to  be  provided  when

inspection orders are generated.

A “fictious“ operation has to be assigned (e.g. 9999)  even in  areas that are not assigned to a

production order (e.g. in goods receipt or in gage management). This is necessary to generate

inspection steps at a later point in time.

Released/active

Shows whether the inspection plan is "released" and/or "active". If the inspection plan is released or

active  the  corresponding  checkboxes  are  checked.  An  inspection  plan  is  released  and  activated,

i.e. its status is changed, only by using the corresponding toolbar functions. An inspection plan has

to be released before it can be activated.

Only active inspection plans are taken into consideration, when inspection orders are generated

at a later point in time.

Released by / on

Shows the HYDRA user who has released it. The release date is displayed additionally.

Valid from / until

Instead  of  an  "unrestricted"  activation  (using  the  toolbar),  a  validity  period  may  be  entered  here.

This period is then taken into account when the inspection order is generated. Yet activation for a

certain period means that the user has no clear overview of currently valid inspection plans, and it

is  therefore  recommended  to  use  the  "global/unrestricted"  activation  option  using  the  toolbar  if

possible.  If  activated  via  the  toolbar  functions,  the  system  carefully  monitors  whether  an  active

inspection  plan  exists  for  the  specified  article  and  checks  whether  this  plan  includes  the  same

drawing  issue  number,  customers  and  suppliers.  If  this  is  indeed  the  case,  the  previously  active

inspection plan is automatically deactivated.

FEP-EPE_81.docx

Version: 1.0.4566

Page 9 of 19

  Extended Inspection Planning for Initial Sample Inspection

Type of inspection

Inspection based on characteristics or pieces

When it comes to an inspection based on characteristics and, say a sample size of 5, the

characteristic is checked completely first. Whereas with the inspection based on pieces, the

characteristic is changed every time a measured value is collected, as items are checked entirely.

Action

Create inspection step or create and immediately release inspection step

Only inspection steps that have been released can be checked.

Customer / supplier / manufacturer

If a customer / manufacturer or supplier is selected this inspection plan only applies for the selected

company. Consequently, the customer / manufacturer / supplier becomes the key field of an active

inspection plan. In this case, the inspection requirement must also include a company entry in order

for this inspection plan to be used for the generation of the inspection requirement.

Dynamic modification type

Characteristic-related, batch-related or none

The authorization “iriscp.dynamic“ is required to show these fields.

Batch-related: In this case, it is defined on the level of inspection plan headers which transitional

definition is to be used for the dynamic modification. In addition, the initial inspection severity is also

defined on the level of inspection plan headers. Now only the reference to the dynamic modification

norm is required on the level of inspection plan characteristics. In this context, however, the

selection is restricted to those dynamic modification norms referring to the same inspection severity

definition as the assigned transitional definition.

Characteristic-related: In this case, the transitional definition, initial inspection severity as well as

the dynamic modification norm are referenced on the level of inspection plan characteristics. In this

context, however, the inspection severity definition of the assigned transitional definition has to

match the assigned dynamic modification norm.

None: The "dynamic modification" function has not been enabled for this inspection plan.

Transitional definition

The authorization “iriscp.dynamic“ is required to show these fields.

This field is only available if a dynamic modification relating to batches or characteristics is

selected. It provides the possible inspection severities and controls switching between the

inspection severities.

FEP-EPE_81.docx

Version: 1.0.4566

Page 10 of 19

  Extended Inspection Planning for Initial Sample Inspection

Initial inspection severity

The authorization “iriscp.dynamic“ is required to show these fields.

This field is only available if a dynamic modification relating to batches or characteristics is

selected. It defines which inspection severity is used for checking the first goods received according

to the basics for the dynamic modification history.

Initial sample form

  The  different  form  types  available  for  initial  sampling  can  be  chosen  here.  The  form  type  “VDA

volume  2,  4th  edition“  is  only  supported  at  the  moment.  Subject  to  the  selected  form  type,  a

corresponding list of categories is shown in the inspection plan characteristics.

Editing functions

The  key  fields  "area",  "inspection  plan"  and  "inspection  plan  index"  cannot  be  changed  in  the  editing

mode.

Toolbar

 Copy

The below dialog opens to copy an inspection plan:

The target area type and target area may be entered here. Normally, the user should select an area

that is identical to that of the source inspection plan. The new inspection plan number and

inspection plan index are to be entered afterwards. In case a new version is generated from an

existing inspection plan, normally the same inspection plan number is used and only the inspection

plan index is changed.

FEP-EPE_81.docx

Version: 1.0.4566

Page 11 of 19

  Extended Inspection Planning for Initial Sample Inspection

Activate

Function authorization: iplp.activate

Makes the inspection plan status "active“.

Deactivate

Function authorization: iplp.deactive

Puts an inspection plan that is in the "active" status back to the "released" status.

Release

Function authorization: iplp.release

Puts an inspection plan that is in the "in process" status to the "released" status.

In process

Function authorization: iplp.inprocess

Puts an inspection plan that is in the "released" status in the "in process" status.

"Print" detail application

Function authorization

iplp.print

The  print  dialog  of  the  inspection  plan  header  opens  a  list  of  available  reports.  These  are Word  forms.

The  potential  content  of  these  forms  is  determined  by  the  Web  services  that  are  available  in  the

respective context. The form entries, i.e. the content of the form list of the corresponding print dialog, are

defined  within  the  master  data  of  quality  management.  This  is  where  the  basis  for  new  forms  is

established and the corresponding form properties are defined. A corresponding license is required to be

able to change the forms with respect to content and design.

FEP-EPE_81.docx

Version: 1.0.4566

Page 12 of 19

  Extended Inspection Planning for Initial Sample Inspection

Toolbar - print

There are no other special function buttons in addition to the standard functions.

"Inspection plan characteristics" detail application

The  detail  application  of  inspection  plan  characteristics  is  nearly  identical  to  the  master  data  of

characteristics application. For this reason, reference is made only to additional features in the following.

 Go to

For further information on the definition of characteristics, please refer to the functional description of the

document entitled MOC_CharacteristicsQM.

On  the  level  of  inspection  plan  characteristics  the  corresponding  inspection  plan  characteristics  are

assigned  to  the  previously  defined  inspection  plan  header.  Assignments  are  performed  by  way  of  initial

data  creation  using  the  characteristics  catalog  and  taking  over  the  characteristic  selected  there.  By

accepting the characteristic, all master data entries are copied to the inspection plan characteristic. Every

(copied) detail may be changed and / or complemented afterwards. The characteristic designation is often

complemented to define it in more detail.

It  is  also  possible  to  create  a  characteristic  not  included  in  the  characteristics  catalog.  However,  this  is

recommended  only  in  exceptional  cases,  since  all  analyses  (e.g.  failure  mode  analysis)  are  based  on

characteristics  found  in  the  catalog.  It  is  therefore  preferable  to  properly  maintain  the  characteristics

catalog.

Different properties and settings can be defined, before specific characteristic data is complemented.

Field descriptions

Inspection plan characteristics

OP sequence

The operation sequence number (OP sequence/AFO) determines the order in which the inspection

is later performed. Entries must be unique. In the ideal case, operation sequence numbering should

be assigned in steps of 10. This provides the option of later inserting a new characteristic between

two existing ones.

Characteristics number

Number of the characteristic selected from master data

FEP-EPE_81.docx

Version: 1.0.4566

Page 13 of 19

  Extended Inspection Planning for Initial Sample Inspection

Characteristic type

Decides whether the inspection is based on the collection of measured values (variable) or on the

specification  of  the  number  of  detected  failures  (attributive).  When  it  comes  to  the  attributive

inspection,  the  decision  is  often  only  based  on  the  "pass"  or  "fail"  results.  Further  characteristic

types are the inspection chart and the information characteristic. The information characteristic has

only been designed to display a document while the inspection is running. Subject to the input type,

the lower area of the dialog provides corresponding sampling schemes.

Inspection result base

Decides  whether  all  samples  or  only  the  last  sample  is  used  to  determine  the  inspection  result

(pass/fail).

Mandatory inspection

If this checkbox is activated, at least one measured value has to be entered for this characteristic,

before an inspection order can be completed with this characteristic.

Calculate characteristic

Identifies a characteristic to be calculated

Formula

Further details can be taken from the manual dealing with the CAQ master data characteristics.

Initial sample creation

Shortlist  of  categories  for  initial  sampling.  The  contents  depend  on  the  form  type  selected  in  the

inspection plan header. Within the resulting initial sample report, the inspection plan characteristics

are summarized by category and a separate page is printed for each group.

Copy characteristic

It may be defined here which characteristic is to be copied from an initial sample inspection plan to

a  production  plan,  for  example.  Only  those  characteristics  are  copied  that  have  been  marked

relevant in this field.

Details

Defines  whether  -  with respect to this characteristic  - the contents of the  "details" tab are defined

within  the  inspection  plan  or  whether  they  have  to  be  determined  from  the  available  master  data

characteristic  or  an  entry  from  the  specification  list  when  inspection  requirements  are  later

generated on the basis of this inspection plan. If the "from characteristic catalog" option is selected

the  "details"  tab  is  hidden.  The  "from  characteristics  catalog"  option  is  reasonable  if  it  is  a

characteristic  the  specifications  of  which  are  to  be  defined  identically  for  several  articles  (even

applicable for several article groups). In this case, specifications can be defined centrally within the

master data. This reduces the input and update efforts considerably.

FEP-EPE_81.docx

Version: 1.0.4566

Page 14 of 19

  Extended Inspection Planning for Initial Sample Inspection

Specifications

Defines  whether  -  with  respect  to  this  characteristic  -  the  contents  of  the  "specification"  tab  are

defined within the inspection plan or whether they have to be determined from the available master

data  characteristic  or  from  a  specification  list  entry,  when  inspection  requirements  are  later

generated on the basis of this inspection plan. The tabs "specifications", "chart 1", "default values

chart  1",  "chart  2"  and  "default  values  chart  2"  are  hidden  if  the  option  "from  list"  or  "from

characteristic  catalog"  is  checked.  The  "from  list"  option  is  only  reasonable  if  inspection  plans  for

article groups are in use. The specification list is used for an inspection plan for article groups if the

specifications vary from item to item for certain characteristics.

Dynamically modified

The authorization “iriscp.dynamic“ is required to show these fields.

This field is only available if a dynamic modification relating to batches or characteristics has been

activated in the inspection plan header. This option allows for definitions to be made that a

characteristic is not to be modified dynamically, although the dynamic modification option is

selected in the inspection plan header.

Transitional definition

The authorization “iriscp.dynamic“ is required to show these fields.

This field is only available if a dynamic modification relating to batches or characteristics has been

activated in the inspection plan header. The transitional definition that can be selected provides the

possible inspection severities and controls switching between these different inspection severities.

For the dynamic modification based on batches, the transitional definition is assigned in the

inspection plan header and is not available on the level of inspection plan characteristics in this

case.

Initial inspection severity

The authorization “iriscp.dynamic“ is required to show these fields.

It defines which inspection severity is used for checking the first goods received according to the

basics for the dynamic modification history. Only the inspection severities of the previously selected

transitional definition are available. For the dynamic modification based on batches, the transitional

definition is assigned in the inspection plan header and is not available on the level of inspection

plan characteristics in this case.

Norm

The authorization “iriscp.dynamic“ is required to show these fields.

This field is only available if a dynamic modification relating to batches or characteristics is

activated in the inspection plan header and if this characteristic is actually characterized by being

relevant to dynamic modification. The dynamic modification norm to be used is assigned from

master data.

FEP-EPE_81.docx

Version: 1.0.4566

Page 15 of 19

  Extended Inspection Planning for Initial Sample Inspection

Inspection level

The authorization “iriscp.dynamic“ is required to show these fields.

This field is only available if a dynamic modification relating to batches or characteristics is

activated in the inspection plan header and if this characteristic is actually characterized by being

relevant to dynamic modification. An inspection level can only be selected if the assigned norm

corresponds to DIN ISO 3951 or DIN ISO 2859.

AQL

The authorization “iriscp.dynamic“ is required to show these fields.

This field is only available if a dynamic modification relating to batches or characteristics is

activated in the inspection plan header and if this characteristic is actually characterized by being

relevant to dynamic modification. An AQL value can only be selected if the assigned norm

corresponds to DIN ISO 3951 or DIN ISO 2859.

Method

The authorization “iriscp.dynamic“ is required to show these fields.

This field is only available if a dynamic modification relating to batches or characteristics is

activated in the inspection plan header and if this characteristic is actually characterized by being

relevant to dynamic modification. A method can only be selected if the assigned norm corresponds

to DIN ISO 3951.

 Go to

The  fields  of  the  respective  tabs  correspond  to  those  of  the  characteristics  master  data.  Further

information  on  these  fields  can  be  gathered  from  the  functional  description  of  the  document  entitled

MOC_CharacteristicsQM.

Inspection plan characteristics - toolbar

 Copy

Data of the selected characteristic is opened in insert mode to be able to copy inspection plan

characteristics. All fields can be changed. An operation sequence number that does not yet exist in

this inspection plan has to be assigned to be able to save it.

FEP-EPE_81.docx

Version: 1.0.4566

Page 16 of 19

  Extended Inspection Planning for Initial Sample Inspection

"Inspection plan documents“ and "documents of inspection plan

characteristics“ detail applications

The above screenshot shows how an inspection plan document is assigned

The above screenshot shows how a document of an inspection plan characteristic is assigned

FEP-EPE_81.docx

Version: 1.0.4566

Page 17 of 19

  Extended Inspection Planning for Initial Sample Inspection

Provided  that  the  "inspection  plan  documents"  tab  or  the  "characteristic  documents"  tab  has  been

activated in the master detail grid, as many documents as required may be assigned to each inspection

plan  and  each  inspection  plan  characteristic.  By  enabling  these  tabs,  the  toolbar  offers  corresponding

buttons to edit the documents.

When  documents  are  assigned,  all  formats  registered  by  Windows  are  provided.  Consequently,  it  is

possible to assign simple documents (e.g. written in Word), drawings of any format and videos. However,

the  corresponding  programs  that  are  able  to  display  the  required  formats  have  to  be  installed.  In  this

context, the documents are opened by the program that has been linked in Windows.

The file types are: "FILE", "URL" and "Text". The file name including path may be entered manually with

the  "file"  type.  The  "URL"  file  type  enables  access  to  the  Internet  or  Intranet.  The  third  file  type  "Text"

allows for text to be entered directly.

A  designation  may  be  assigned  to  each  defined  document.  Moreover,  it  may  be  determined  in  which

order  the  documents  are  to  be  listed.  The  "position"  field  is  used  for  this  purpose  (numeric  input).  The

specifications  made  within  this  list  must  be  unique.  In  addition,  the  checkbox  "display  with  inspection"

determines whether or not the document may be shown during the inspection process.

"Inspection plan documents“ and "documents of inspection plan

characteristics" - toolbar

In addition to the standard features, there is also a button to display the documents.

 Show documents

If  a  document  link  is  defined  this  button  opens  and  shows  this  document.  However,  a  program,

which is able to visualize the linked file type, has to be installed on the PC.

FEP-EPE_81.docx

Version: 1.0.4566

Page 18 of 19

  Extended Inspection Planning for Initial Sample Inspection

FEP-EPE_81.docx

Version: 1.0.4566

Page 19 of 19


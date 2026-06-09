Manual

Complaint Management
REK-EVA 8.1

Version 1.1.1374

Last changed on: 19.06.2020

Complaint Management

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

REK-EVA_81.docx

Version: 1.1.2405

Page 2 of 84

Complaint Management

Contents

1  Complaint Management - Overview ............................................................. 5

2  Summary ...................................................................................................... 6

2.1  Notes on the Document ....................................................................................... 6

3  Article ........................................................................................................... 6

3.1  Starting the Function ........................................................................................... 6

3.2  Default Application Layout ................................................................................... 7

3.3  Toolbar ................................................................................................................ 7

3.4  Selection parameters .......................................................................................... 9

3.5

“Article” Detail Application ................................................................................... 9

4  Summary .................................................................................................... 12

4.1  General notes on the document ........................................................................ 12

5  Groups ....................................................................................................... 13

5.1  Starting the function .......................................................................................... 13

5.2  Default Application Layout ................................................................................. 14

5.3  Toolbar .............................................................................................................. 14

5.4  Selection parameters ........................................................................................ 16

5.5

"Groups" Detail Application ............................................................................... 16

6  Characteristic Master Data ......................................................................... 18

6.1  Sampling scheme .............................................................................................. 30

6.2  Control charts for variable characteristics .......................................................... 31

6.3  Control charts for attributive characteristics ....................................................... 33

6.4  Computation of formulas ................................................................................... 33

7  Customers .................................................................................................. 39

8  Manufacturer .............................................................................................. 42

9  Suppliers .................................................................................................... 45

10  Distributor ................................................................................................... 48

REK-EVA_81.docx

Version: 1.1.2405

Page 3 of 84

Complaint Management

Detail application  "distributor entries" ......................................................................... 49

11  Failure Types ............................................................................................. 50

12  Failure Locations ........................................................................................ 53

13  Failure Causes ........................................................................................... 55

14  Causers ...................................................................................................... 57

15  Measures ................................................................................................... 59

16  Department ................................................................................................ 61

17  External Persons ........................................................................................ 64

18  Complaint Management ............................................................................. 67

REK-EVA_81.docx

Version: 1.1.2405

Page 4 of 84

Complaint Management

1  Complaint Management - Overview

Fields of application

This  component  enables  the  creation  of  complaints  and  complaint  details  including  the  assignment  of

measures and the performance/documentation of the failure analysis.

Implementation notes

This  component  is  recommended  if  you  wish  to  record  complaints  by  customers,  suppliers  or  internal

complaints.

Integration

This component mainly refers to the components

  Complaints analysis

  Analysis of complaint costs

  Failure analysis of complaints and

  Tracing of measures

but is, to some extent, also combined with other components.

Features

These functions are provided.

  Editing  function  for  the  creation  and  modification  of  relevant  master  data  (articles,  companies,

failures, measures, cost types, parties in charge, persons, etc.)

  Distinction of different complaint types, e.g. complaints by customers, suppliers as well as internal

complaints

  Differentiation  between  header  and  partial  complaint  data  including  the  possibility  to  create  n

partial complaints for one complaint header

  Assignment  of  different  statuses  (e.g.  recorded,  in  process,  completed)  and  results  (justified

(acknowledged), unjustified (rejected), goodwill, warranty) separated by the complaint header and

the assigned partial complaints

  Assignment of measures of different types (short-term, medium-term, long-term) including editing

status  and  specification  of  dates,  degree  of  fulfillment,  effectiveness  as  well  as  responsibilities

(parties in charge)

  Assignment of the relevant inspection order

  Detailed failure analysis by the failure tree including assignment of failure types, failure locations,

failure causes, causers, measures, documents, defect characteristics

REK-EVA_81.docx

Version: 1.1.2405

Page 5 of 84

Complaint Management

2  Summary

2.1  Notes on the Document

This document describes the “article” application of the Manufacturing Operation Center (MOC). General

information on how to use MOC can be found in the document entitled “moc_cc.pdf“.

3  Article

The article catalog has been designed to edit/keep articles. Article data is a global catalog that is used in

many CAQ modules and in PDV (Process Data Collection). Provided that there is an interface to a higher-

level  system  (e.g.  ERP  system),  articles  may  be  created  automatically  via  this  interface.  As  soon  as  a

new article is created or changed, e.g. in the ERP system, the article data record is automatically created

or changed in the HYDRA-CAQ article catalog based on the defined information.

3.1  Starting the Function

Menu

Master data  Quality management  Article

Master data  Process data processing  Article

Transaction code

atc

Function authorization

atc

REK-EVA_81.docx

Version: 1.1.2405

Page 6 of 84

3.2  Default Application Layout

Complaint Management

3.3  Toolbar

The  toolbar  provides  the  different  functions  available  for  this  application  and  possibly  links  to  other

applications.  The  functions  included  in  the  “general”  tab  of  the  toolbar  refer  to  all  detail  applications.  In

addition  to  the  standard  functions,  such  as  help,  request  data,  save  application  settings,  and  print

preview,  the  other  tabs  also  include  specific  functions  that  are  specially  tailored  to  the  respective  detail

application. The following sections describe the individual application functions.

“Data” Category

  Request data

The  information  to  be  displayed  within  the  application  is  requested  on  the  basis  of  the  entered

selection  criteria.  This  process  might  take  some  time  depending  on  the  dataset  from  which  the

system filters data and on the selection result to be transferred and displayed.

  Cancel

The query sent by clicking the “request data” button can be canceled using this function.

REK-EVA_81.docx

Version: 1.1.2405

Page 7 of 84

Complaint Management

 Print preview

The  print  preview  is  opened  for  the  selected  detail  application.  The  print  preview  also  includes

further options to change the resulting printout and functions for exporting the displayed information

into other formats, such as PDF, Excel, image files.

  Save

The  application  design  configured  by  the  user,  e.g.  columns  and  categories  displayed  as  well  as

their respective size and display locations, etc. are only saved if the user requests it. In this case,

the user has to affirm the confirmation prompt by clicking “Yes”.

“Functions” Category

   Add

Adds a new article.

  Copy

Copies the selected article.

   Edit

Edits an already existing article

   Delete

Deletes the selected or several selected articles.

“Help” Category

   Help on operation

Clicking  this  button  opens  the  help  file  describing  how  to  operate  MOC.  The  basic  document  is

entitled “moc_cc.pdf”. It describes how to use MOC in general and applies for all applications.

  Help on application

This function opens the manual corresponding to the respective application from which the help was

requested.  The  application  manual  integrates  the  application  function  into  the  MES  context  and

explains the information to be displayed. The documentation also includes all detailed applications.

REK-EVA_81.docx

Version: 1.1.2405

Page 8 of 84

Complaint Management

   Help on detail application

This function opens the application manual at the section where the respective detailed application

is described.

3.4  Selection parameters

The application provides the following selection criteria:

“General“ tab

  Article no.:

Article number

  Drawing issue number:

Drawing issue number of the article, often also referred to as index

  Designation:

Article name



Inactive:

Inactive, active articles. The checkbox is not activated by default.

  Customer article no.:

Customer article number

  Article model:

Article model

“Groups“ tab

  Group:

The  article  group  tree  can  be  opened  using  the
There is a function to accept and cancel the activity.

  button  if  an  article  group  is  to  be  filtered.

3.5  “Article” Detail Application

The article number as well as the drawing issue number uniquely identify articles in all areas of HYDRA-

CAQ referring to the article catalog. The drawing issue number, also referred to as article index, may be

very important, in particular, for inspection planning and when inspection orders are generated. Thus, it is

possible to create, for example, an inspection plan for article 12938 with the drawing issue number A and

B within inspection planning, whereas there are different inspection specifications for each drawing issue

number. Unless the drawing issue number is indicated and thus may be part of the inspection plan, the

system that generates the inspection requirements, must deliver this drawing issue number.

REK-EVA_81.docx

Version: 1.1.2405

Page 9 of 84

Complaint Management

Consequently, the “article no.” and “drawing issue number” fields are key fields, i.e. when a new article is

saved, it is first checked whether an article with this key information already exists.

By  distinguishing between  active and inactive articles, it may  be  defined  whether or not the  articles are

available  in  certain  selection  lists.  Thus,  no  inspection  plan  can  be  created  for  an  inactive  article.

However,  inactive  articles  may  be  evaluated  at  any  time.  Moreover,  inactive  articles  can  also  be

reactivated at any time.

Furthermore, an article can be defined as being subject to documentation. In addition the dialog provides

the fields customer article number, article model, article ABC, drawing number as well as the possibility to

assign units. The catalog of units is accessed to assign units (dimensions).

The corresponding group needs to be assigned, provided that article groups are to be evaluated or family

inspection plans are to be used at a later point in time. Groups are assigned by opening the group tree

using  the  magnifier  button.  Using  the  hierarchic  tree  entries  the  required  group  can  be  selected  in  the

group tree and accepted by double clicking.

REK-EVA_81.docx

Version: 1.1.2405

Page 10 of 84

Complaint Management

The  assigned  group  including  the  hierarchical  group  structure  then  appears  in  the  “groups”  field  of  the

editing dialog of articles.

When articles are displayed in a list, the group hierarchy is represented by the columns “group 1 to group

5”.

Groups  are  maintained  in  the  “article  groups”  application  and  are  described  in  the  document  entitled

“MOC_Groups.pdf “.

REK-EVA_81.docx

Version: 1.1.2405

Page 11 of 84

Complaint Management

4  Summary

4.1  General notes on the document

This  document  describes  the  “Groups“,  e.g.  article  groups,  application  of  the  Manufacturing  Operation

Center (MOC). For general information on how to use MOC, please refer to the “moc_cc.pdf“ document.

REK-EVA_81.docx

Version: 1.1.2405

Page 12 of 84

Complaint Management

5  Groups

The  group  catalogs  have  been  designed  to  create  and  edit  groups  for  the  different  applications.  The

created groups may be assigned to master data of the corresponding  application. Consequently, article

groups may be created, for example, and assigned to the articles. In this case, it is also possible to create

inspection plans on the basis of article groups.

Basically, the creation of groups is also reasonable for failure mode analyses.

5.1  Starting the function

Menu

Transaction code

Function authorization

Master data  Quality management  Article groups
Master data  Process data processing  Article groups
Master data  Quality management  Measure groups
Master data  Quality management  Failure type groups
Master data  Quality management  Failure location groups
Master data  Quality management  Failure cause groups
Master data  Quality management  Causer groups
Master data  Quality management  Cost type groups

atcgr  Article groups
measgr  Measure groups
ftypgr  Failure type groups
flocgr  Failure location groups
fcaus  Failure cause groups
origr  Causer groups
costgr  Cost type groups

atcgr - Article groups
measgr.*  Measure groups
ftypgr.*  Failure type groups
flocgr.*  Failure location groups
fcaugr.*  Failure cause groups
origr.*  Causer groups
costgr.*  Cost type groups

REK-EVA_81.docx

Version: 1.1.2405

Page 13 of 84

5.2  Default Application Layout

Complaint Management

This figure of the article group catalog is exemplary for all groups.

5.3  Toolbar

The  toolbar  contains  the  function  calls  that  are  available  for  this  application  and  possibly  links  to  other

applications.  The  functions  placed  on  the  “general”  tab  of  the  toolbar  refer  to  all  detail  applications.  In

addition  to  the  standard  functions  such  as  “help”,  “request  data”,  “save  application  settings”  and  “print

preview”, the other tabs include specific functions that are tailored to the corresponding detail application.

The individual functions of the application are listed in the paragraphs that follow.

"Data" category

  Request data

The  information  to  be  displayed  within  the  application  is  requested  according  to  the  entered

selection  criteria.  This  process  might  take  some  time  depending  on  the  data  set  from  which  the

system filters data and on the selection result to be transferred and displayed.

REK-EVA_81.docx

Version: 1.1.2405

Page 14 of 84

Complaint Management

  Cancel

This function cancels the query sent by clicking the “request data“ button.

 Print

preview

The  print  preview  is  opened  for  the  selected  detail  application.  The  print  preview  also  includes

further options to change the resulting printout and functions for exporting the displayed information

into other formats, such as PDF, Excel, image files.

  Save

The  application  design  configured  by  the  user,  e.g.  columns  and  categories  displayed  as  well  as

their respective size and display locations, etc. are only saved if the user requests it. In this case,

the user has to affirm the confirmation prompt by clicking “Yes”.

"Functions" category

There are no special functions for this detail application. Groups are created, changed and deleted using

the context menu of the right mouse button within the tree structure view.

"Help" category

   Help on operation

Clicking  this  button  opens  the  help  file  describing  how  to  operate  MOC.  The  basic  document  is

entitled “moc-cc.pdf”. It describes how to use MOC in general and applies for all applications.

    Help on application

This  function  opens  the  manual  that  describes  the  application  from  which  the  help  function  was

requested.  The  application  manual  integrates  the  application  function  into  the  MES  context  and

explains the information to be displayed. The documentation also includes all detailed applications.

   Help on detail application

This function opens the application manual at the section where the respective detailed application

is described.

REK-EVA_81.docx

Version: 1.1.2405

Page 15 of 84

Complaint Management

5.4  Selection parameters

There are no selection parameters. A specific group can be found by using the “fast selection” function.

To use the “fast selection” function just open the group tree structure on the 1st level, select the first entry

and enter the first letter of the group in question. Consequently, the first group starting with this letter that

is found is selected. The "fast selection" function also integrates subordinate groups that are not opened.

If the requested term is included in a group that is not opened, it will be opened automatically.

5.5  "Groups" Detail Application

A  group  may  be  created,  changed  or  deleted  by  opening  the  context  menu  of  the  right  mouse  button

within the display area of the tree structure.

It is altogether possible to define groups up to the fifth hierarchy level. The “add root group” function has

to be selected  in the context menu of the group tree  to create a  new main group (1st level). The menu

entry "add group" generates a sub-group (level 2 to 5). A designation, which is directly entered in the list

view, has to be assigned for this new group. To be able to save the new group, click above or  below this

new  entry  within  the  group  tree.  Then  a  confirmation  prompt  appears  asking  whether  or  not  the  new

group is to be saved. Provided that this question is affirmed ("yes"), the entry is saved. The same applies

for renaming of groups. Regardless of which hierarchy level is concerned, the entry has to be selected to

be able to edit the  group designation. Changes can  directly be  entered  in the corresponding line of the

tree  view.  Click  above  or  below  the  entry  to  be  changed  to  be  able  to  save  the  modification.  No

confirmation prompt appears when it comes to renaming.

An  entry  is  also  deleted  by  selecting  a  group  entry  and  executing  the  "delete  group"  function.  Only  the

group that is at the bottom of the group tree can be deleted.

The “expand all” context menu entry opens all groups up to the lowest hierarchy level. The “collapse all”

context menu option closes all entries up to the first level.

REK-EVA_81.docx

Version: 1.1.2405

Page 16 of 84

The  "delete  selection"  function  cannot  be  used  in  the  maintenance  of  groups  dialog.  This  function  is

enabled,  for  example,  in  the  maintenance  of  articles  application  if  an  article  group  is  selected  and  this

selection is to be removed/deleted.

Complaint Management

REK-EVA_81.docx

Version: 1.1.2405

Page 17 of 84

Complaint Management

6  Characteristic Master Data

Summary

Menu

Master Data  Quality Management  Characteristics

Transaction code

chrq

Function authorization

chrq

Utilization

The  characteristics  catalog  has  been  designed  to  define  characteristics  and,  as  a  result,  to  predefine

characteristic  data  of  inspection  plans.  For  this  reason,  it  is  directed  to  people  involved  in  inspection

planning.

REK-EVA_81.docx

Version: 1.1.2405

Page 18 of 84

Complaint Management

The  characteristics  catalog  is  one  of  the  most  important  basic  catalogs  for  without  this  catalog  no

inspection plan could be created. As it has been designed to predefine characteristics data for inspection

plans it provides extensive input possibilities. Generally, only this data, which has not to be modified at a

later  point  in  time  when  assigning  it  in  the  inspection  plan,  should  be  entered  in  the  characteristics

catalog. The definition of limit values, for example, is usually not reasonable as they are only known when

the inspection plan is created. For a relation to a specific article is only established with the assignment to

an  inspection  plan.  If  you  keep  this  always  in  mind  it  becomes  obvious  which  information  needs  to  be

defined. For this reason, it should be considered thoroughly whether the characteristic "outer diameter" is

to  be  created  only  once  and  the  detailed  information  is  to  be  defined  later  in  inspection  planning  or

whether  it  would  be  better  to  create  several  characteristics  for  the  "outer  diameter"  specifying  the  limit

values  already.  In  the  majority  of  cases,  it  is  better  to  only  enter  a  few  general  characteristics.  The

required evaluations/reports also play a role in this. If a new "outer diameter characteristic" is created for

nearly  every  tolerance  modification  it  is  almost  only  “applicable”  for  one  article  and  comprehensive

evaluations are not possible when failures are analyzed later"

It is important that each detail defined here  can be modified in the inspection plan or that details, which

have not been stated, can be added.

The  configurations  made  in  the  characteristic  master  data  are  not  final.  Characteristic  master  data  has

rather been designed as a template for inspection planning. All settings of the characteristic master data

can be supplemented and modified in inspection planning.

Integration

The  characteristic  catalog  is  a  global  catalog  that  is  used  in  many  QM  applications.  Please  find  below

some possible fields of application that refer to the characteristic catalog.





Inspection planning for production, goods receipt, goods issue, initial samples and calibration

Inspection requirements for production, goods receipt, goods issue, initial samples and calibration

  Failure analysis in complaints management

  Several reports/evaluations

Prerequisite

There are no special requirements.

Selection criteria

The application provides the following selection criteria:

REK-EVA_81.docx

Version: 1.1.2405

Page 19 of 84

Complaint Management

  Characteristic no.:

Characteristics number

  Characteristic designation:

Designation of the characteristic –  Please note: wildcards may be used "*"

  Characteristic type:

Inspection type: attributive, inspection chart, variable

"Details" tab:

  Gages

Selects a gage

  Gage designation:

Selects a gage designation

"User fields" tab:



If user fields are created they may be selected

If several selection criteria are used overlapping results are displayed in the characteristic master data.

In addition, the column filter allows for the content of each individual column to be filtered.

Field descriptions

The available fields are self-explanatory and are not explained separately, except for the address fields.

"Characteristics" tab

Characteristic no.

Unique number of the characteristic

Characteristic designation

Designation of the characteristic

Input type

Automatic  or  manual  collection  type.  This  field  controls  the  release  of  HYDRA-PDV  fields  (for

automatic  collection).  If  the  automatic  collection  function  is  selected,  the  characteristic  type  is

restricted to the "variable" option.

REK-EVA_81.docx

Version: 1.1.2405

Page 20 of 84

Complaint Management

Characteristic type

Decides whether the inspection is based on the collection of measured values (variable) or on the

indication of the number of identified errors (attributive). When it comes to the attributive inspection,

the  decision  is  often  based  on  "pass"  or  "fail".  The  inspection  chart  and  the  information

characteristic  are  further  characteristic  types.  The  information  characteristic  has  only  been

designed to display a document while the inspection is running. Subject to the input type, the lower

area of the dialog provides corresponding sampling schemes.

Inspection result base

Decides  whether  all  samples  or  only  the  last  sample  are  used  to  determine  the  inspection  result

(pass/fail).

Mandatory inspection

If this checkbox is activated, at least one measured value has to be entered for this characteristic,

before an inspection order can be completed with this characteristic.

Calculate characteristic

Identifies a characteristic to be calculated

The authorization “iriscp.formula“ is required to show this field in inspection plan characteristics.

Formula:

Please also see the section entitled "formula calculation"

The authorization “iriscp.formula“ is required to show this field in inspection plan characteristics.

"Details" tab

"Gage" group

Gage

Defines whether a gage or gage group is to be assigned to the characteristic:

Assignment of the gage to be used (or even gage group).

The  resource  management  may  be  accessed  using  the  resource  type  "PRM".  The  authorization

“iriscp.gage“ is required to show this field in inspection plan characteristics.

Gage designation

Shows the gage designation

REK-EVA_81.docx

Version: 1.1.2405

Page 21 of 84

Complaint Management

"Properties" group

Certificate printing

The corresponding definition determines whether this characteristic is to be printed (show selection

or  print  always)  or  not  (print  never)  when  certificates  are  printed  out  at  a  later  stage  (e.g.

acceptance,  inspection  certificate).  If  the  "display  selection"  option  is  chosen,  a  list  of  the

characteristics that are assigned to this flag is displayed prior to printing. These characteristics have

been predefined for printing in the list. However, this selection may be removed. Finally, all selected

characteristics and the characteristics assigned to the "print always" option are  printed out on the

certificate.  Characteristics  assigned  to  the  "print  always"  flag  do  not  appear  in  a  selected  list,  as

they are printed in any case. However, it is important to note that these certificate flags only affect

certificate forms.

Error weighting

For information purposes, a rating can be made here if the inspection result for this characteristic is

"fail".

"Inspect" group

Analysis selection catalog

Using this selection function, an analysis selection catalog may be selected. This catalog restricts

the  selection  options  when  failures  are  entered  (failure  types,  failure  locations,  etc.).  (But

nevertheless, all available failures may be entered by directly entering their number).

Designation of analysis selection

Shows the designations of analysis selection catalogs

"Specifications" tab

Once the "specifications" tab has been selected, the sample scheme and dimensions may be entered. In

this  context,  it  has  to  be  considered  that  (as  already  mentioned)  the  definition  of  tolerance  limits  in  the

master  data  of  characteristics  is  only  reasonable  if  certain  conditions  are  met.  The  same  applies  to  the

definition or calculation of action and warning limits. The different possibilities are described anyway.

"Sampling scheme" group

Sampling scheme

The following sampling schemes are available:

  100% inspection



k value inspection

  Batch inspection

  n-c inspection

  SPC inspection

REK-EVA_81.docx

Version: 1.1.2405

Page 22 of 84

Complaint Management

The  sampling  scheme  determines  the  course  of  the  inspection.  With  an  n-c  inspection  with  the

parameters 5-0, 5 items are checked and 0 failures may be detected.

The section entitled "Sampling scheme" describes this process in more detail.

Sample size/assumable sample size

Specification  of  the  sample  size  or  assumable  sample  size  depending  on  the  sampling  scheme,

see section "sampling schemes".

Acceptance quantity

Acceptance quantity for the n-c inspection, please also see section "sampling schemes".

Interval type

Input for SPC or n-c inspections: time, pieces, once, none. Please also see the section "sampling

schemes".

Interval value

Specifies the interval subject to the interval unit.

The authorization ”iriscp.interval“ is required to show this field in inspection plan characteristics.

Interval unit

For n-c or SPC inspections, e.g. minutes, hours.

The authorization ”iriscp.interval“ is required to show this field in inspection plan characteristics.

With output batch change

Causes an inspection to become due when output batches change.

The authorization ”iriscp.interval“ is required to show this field in inspection plan characteristics.

With machine status change

Causes an inspection to become due when machines change.

The authorization ”iriscp.interval“ is required to show this field in inspection plan characteristics.

  Source status

Specifies the source statuses, separated by commas, (specific, non-productive  machine statuses),

which are to cause an inspection to become due when switching into a productive machine status.

The authorization ”iriscp.interval“ is required to show this field in inspection plan characteristics.

With the change of shifts

Causes an inspection to become due when shifts change.

The authorization ”iriscp.interval“ is required to show this field in inspection plan characteristics.

REK-EVA_81.docx

Version: 1.1.2405

Page 23 of 84

Complaint Management

"Construction measures" group

Unit

Pieces, meter, kg, etc. Unit of the characteristic. Units are assigned by accessing the unit catalog.

Decimal places

Number  of  decimal  places.  Leading  zeros  in  front  of  the  comma  are  not  displayed  in  the

specification fields. The number of decimal places that is defined within system settings is indicated

by default.

Size

Plausibility  and  tolerance  limits  can  be  entered  as  absolute,  relative  or  percentage  values.  Please

note that relative or percentage lower limits (lower tolerance limit, lower process limits) have to be

indicated with a negative algebraic sign.

Norm

Computation  of  tolerances  on  the  basis  of  specific  norms  (e.g.  ISO  metric  fits).  Subject  to  the

selected norm, further information is requested (e.g. engineering fit). Tolerance limits are computed

automatically on the basis of these specifications.

Engineering fit

Computation of tolerance limits on the basis of a specific norm and fit. The selected fit depends on

the selected norm.

Specifies the upper plausibility limit

UPL

UTL

Specifies the upper tolerance limit (upper specification limit)

Target value

Indicates the target value

LTL

LPL

Specifies the lower tolerance limit (lower specification limit)

Defines the lower plausibility limit

Generate error (UTL)/(LTL)

If the checkbox "generate error" is enabled it is defined whether a violated limit value automatically

(in the background) results in the failure type "limit value violation" (AUTO:TG> or AUTO:TG<) to be

defined  when  measured  values  are  recorded.  This  option  is  not  available  for  attributive

characteristics, as the specification is only used for information purposes in this case.

REK-EVA_81.docx

Version: 1.1.2405

Page 24 of 84

Complaint Management

"User fields" tab

In case user fields are defined for characteristics, they are displayed and may be edited here.

"Chart 1/chart 2" tab

The control charts to be used can be defined in the "chart 1/chart 2" tab. These control charts are later

available in the measurement recording for terminals (AIP). Altogether two different control charts may be

defined,  whereas  the  action  limits,  warning  limits  and  the  mean  value  may  be  defined  for  each  control

chart if variable characteristics are in use. There are two different possibilities to define these limit values.

They are either entered manually or determined automatically on the basis of specific default values that

are defined in the "default values" tab "chart 1/2". For further information on control charts, please see the

sections  entitled  "control  chart

for  variable  characteristics"  and  "control  charts

for  attributive

characteristics".

Chart 1 / chart 2

Defines  the  control  chart  that  is  to  be  displayed  in  the  measurement  recording  dialog  at  the

terminal. Action limits may also be defined on the basis of the control chart type.

Upper AL

Specifies the upper action limit. It can be determined by the system on the basis of default values,

provided  that  the  "calculate"  checkbox  is  enabled.  (Please  also  see  section  "control  charts  for

variable characteristics").

Upper WL

Defines the upper warning limit. It can be determined by the system on the basis of default values,

provided  that  the  "calculate"  checkbox  is  enabled.  (Please  also  see  section  "control  charts  for

variable characteristics").

MV (Mean value)

Specifies a mean value, e.g. as basis for the automatic calculation of limits by the system.

Lower WL

Defines the lower warning limit. It can be determined by the system on the basis of default values,

provided  that  the  "calculate"  checkbox  is  enabled.  (Please  also  see  section  "control  charts  for

variable characteristics").

Lower AL

Specifies the lower action limit. It can be determined by the system on the basis of default values,

provided  that  the  "calculate"  checkbox  is  enabled.  (Please  also  see  section  "control  charts  for

variable characteristics").

REK-EVA_81.docx

Version: 1.1.2405

Page 25 of 84

Complaint Management

Generate trend error

The option "generate trend error" has to be activated to be able to generate an automatic error if a

trend  exists  (e.g.  seven  values  in  a  row  are  descending  or  ascending,  the  number  of  values  is

defined while the system is customized). To determine a trend, the samples of an inspection step

characteristic are taken into account, sorted by the sample number, regardless on which machine

data has been recorded.

Generate error (UWL) / (LWL)

If the checkbox "generate error (UWL) / (LWL)" is enabled it is defined whether a violated limit value

automatically  (in  the  background)  results  in  the  failure  type  "limit  value  violation"  (AUTO:WG>  or

AUTO:WG<) to be defined when measured values are recorded. A violation of the limit value refers

in this case to the defined  control chart. If, for example, an xq chart is defined an automatic error

will only be generated, provided that the corresponding xq value of the control chart, not the single

value, is beyond the warning limits.

Generate error (UAL) / (LAL)

If the checkbox "generate error (UAL) / (LAL)" is enabled it is defined whether a violated limit value

automatically  (in  the  background)  results  in  the  failure  type  "limit  value  violation"  (AUTO:EG>  or

AUTO:EG<) to be defined when measured values are recorded. A violation of the limit value refers

in this case to the defined  control chart. If, for example, an xq chart is defined an automatic error

will only be generated, provided that the corresponding xq value of the control chart, not the single

value, is beyond the action limits.

"Default values chart 1 / default values chart 2" tab

For  further  information  on  control  charts,  please  see  the  sections  entitled  "control  charts  for  variable

characteristics" and "control charts" for attributive characteristics.

"Default for calculating limit values" tab

Calculation type

Default  values  to  compute  limit  values:  Cpk,  Sigma,  sQuer/an,  RQuer/dn,  relative  deviation  of

XQuer, percentage deviation of XQuer

Cpk

Default value of cpk

Sigma

Default value or computed sigma value

RQuer /sQuer

Default value for RQuer/sQuer

REK-EVA_81.docx

Version: 1.1.2405

Page 26 of 84

Complaint Management

"Non-action probability" group

Action limits (non-action probability)

Selects the action probability (only visible with the computation type: cpk, Sigma, RQuer /sQuer)

Warning limits (non-action probability)

Selects the action probability (only visible with the computation type: cpk, Sigma, RQuer /sQuer)

"Deviation from XQuer specification" group

rel. AL

Direct  entry  of  the  action  limits  (only  visible  if  the  calculation  types  "rel.  deviation/deviation  in

percent" are used)

rel. WL

Direct  entry  of  the  warning  limits  (only  visible  if  the  calculation  types  "rel.  deviation/deviation  in

percent" are used).

"Confidence interval" group

Confidence interval

One-sided or two-sided. It may be chosen between "on-sided" and "two-sided" for the control charts

R and s.

"XQuer" group

XQ

Target value, tolerance center, mean value of xq chart, input (only visible and can only be selected

with an xq control chart)

REK-EVA_81.docx

Version: 1.1.2405

Page 27 of 84

Complaint Management

Editing functions

The below screenshot is one example for how an editing dialog could look like. The design and alignment

of fields may deviate from that of this screenshot.

Toolbar

There are no further specific function keys in addition to the standard features.

REK-EVA_81.docx

Version: 1.1.2405

Page 28 of 84

"Documents" detail application

Complaint Management

Provided that the "documents" tab has been activated, as many documents as required may be assigned

to each characteristic. If this tab is activated corresponding editing buttons are enabled in the toolbar to

edit the documents.

When  documents  are  assigned,  all  formats  registered  by  Windows  are  provided.  Consequently,  it  is

possible to assign simple documents (e.g. written in Word), drawings of any format and videos. However,

the  corresponding  programs  that  are  able  to  display  the  required  formats  have  to  be  installed.  In  this

context, the documents are opened by the program that has been linked in Windows.

"URL" and "text" are provided as file types. The file name including the path may be entered for the "file"

type. The file type "URL" allows for the Internet or intranet to be accessed. The third file type "text" allows

for the text to be entered directly.

Please note:

The different variants of the file type “URL” supported by the shop floor client are described in the relevant

manual dealing with the shop floor client. It might, for example, be the case that “https” URL entries can

be displayed on MOC but not on the AIP shop floor client.

A designation may be assigned to each defined document. Moreover, it can be determined in which order

the  documents  are  to  be  listed.  This  is  made  by  the  "position"  field  (numeric  input).  The  specifications

have to be unique within this list. In addition, the "display with inspection" checkbox determines whether

or not the document can be displayed during the inspection process.

REK-EVA_81.docx

Version: 1.1.2405

Page 29 of 84

Complaint Management

In  this  case  as  well  it  has  to  be  reflected  thoroughly  whether  documents  are  to  be  assigned  without  a

precise reference to an article. Normally, document assignment depends on the article.

“Documents“ toolbar

In addition to the standard features, the “Documents” detail application also provides a button to view the

documents.

 Show documents

With  this  button  it  is  possible  to  open  and  show  a  document,  which  is  attached  by  a  link.  In  this

case, however, a program needs to be installed that is able to open the linked file type, e.g. Acrobat

Reader for PDF documents.

6.1  Sampling scheme

The  user  can  choose  from  five  sampling  schemes  in  a  specified  list.  Subject  to  the  selected  sampling

scheme, some additional information has to be defined. Depending on how they are used in the different

inspection  plan  areas  (e.g.  production,  goods  receipt,  goods  issue)  only  a  subset  of  these  sampling

schemes is available.

Sampling scheme n-c inspection: The sample size is entered in the  "sample size" field (= n) and the

maximum  number  of  admissible  non-conforming  units  is  entered  in  the  "acceptance  quantity"  (=c)  field.

The figure "c" is defined as acceptance number. This means: if n = 50 und c = 1 the characteristic, and

thus  the  item,  is  only  rated  as  "fail"  if  two  non-confirming  units  occur,  provided  that  the  sample  size

amounts to 50.

Sampling scheme 100% inspection: The sampling scheme "100% inspection" is generally only used in

the goods receipt and goods issue. In this case, the sample size is computed from the actual quantity of

the inspection requirement and corresponds to it.

Sampling scheme SPC inspection: The sampling scheme "SPC inspection" nearly corresponds to the

"n-c" inspection plan. The only difference is that the acceptance limit "c" is not used in this case.

Sampling scheme batch inspection: The sampling scheme "batch inspection" only applies to the areas

"goods  receipt"  and  "goods  issue"  in  the  standard  configuration.  The  percentage  specifying  how  much

percent  of  the  batch  is  to  be  checked  is  entered  here.  Later  in  the  inspection  order  characteristic  the

sample  size  is  calculated  from  the  actual  quantity  of  the  inspection  requirement  and  multiplied  by  the

specified percentage.

Provided  that  action  limits  are  to  be  calculated,  the  expected  (assumable)  sample  size  has  also  to  be

entered here.

REK-EVA_81.docx

Version: 1.1.2405

Page 30 of 84

Sampling  scheme  k-value  inspection:  With  the  k  value  inspection  the  entered  k  value  is  checked

against the computed k value and if this value is violated the sample is rated "fail".

Complaint Management

6.2  Control charts for variable characteristics

The variable characteristics provide the charts xq, s and R.

The production dispersion is used in many computations of the statistical quality assurance. One example

is the calculation of capability indices and action limits of a quality control chart. Vice versa, it is possible

to  estimate  the  dispersion  of  production,  provided  that  a  process  capability  index  is  indicated,  and  the

action limits are calculated on this basis.

The  specifications  for  the  calculation  of  limit  values  can  be  found  in  the  tab  "default  values  chart  1"  or

"default values chart 2", where values  to estimate the production dispersion can be entered. The action

and warning limits can be calculated on the basis of these specifications. However, it is also possible to

enter the production dispersion directly. This program provides altogether three computation options.

At  first,  the  specifications  are  described  on  the  basis  of  the  xq  and  s  chart.  The  differences  with  the  R

chart are explained in more detail in the sections that follow.

There  is  often  a  specification  for  the  process  capability  index  cpk.  This  specification  is  reasonable,  as

respecting  the  process  capability  index  cpk  implies  that  items  can  be  produced  within  the  range  of

tolerance. On  the  basis of  the default cpk value, the  system computes internally an estimated value for

Sigma, which is entered to the right of the "Sigma" option for information purposes. This computed basic

estimated value has in turn been designed to calculate the limit values of the xq/s chart. The computation

is  performed,  once  further  data  has  been  entered  using  the  "calculate"  button.  The  calculation  method

"cpk" is set by default. In addition, there are also the calculation methods "sigma" and sQuer/an".

This  cpk  value  of  1,33  ensures  that  99.725%  of  the  characteristic  values  are  within  the  tolerance.

However,  it  also  often  required  that  99.994%  of  the  characteristic  values  are  within  the  tolerance  limit,

which corresponds to a cpk value of 1.67.

REK-EVA_81.docx

Version: 1.1.2405

Page 31 of 84

Complaint Management

The  calculation  method  sq/an  means  that  an  estimate  of  the  standard  deviation  is  calculated  from  the

quotient of the medium standard deviation and a correction factor an. This correction factor depends on

the sample size, which is expressed by the index n. The values for an are defined in the system and are

requested  automatically.  This  estimate  of  the  standard  deviation  is  best  in  case  that  there  is  no

specification  of  the  process  capability  index  and  the  production  dispersion  is  unknown  and  thus  the

specification  of  the  sq-value  has  still  to  be  corrected  by  a  correction  factor.  Moreover,  it  is  the  most

efficient  one  under  the  given  conditions.  The  sq-value  has  also  to  be  specified  for  a  subsequent

calculation  of  limit  values.  This  can  be  entered  in  the  field  on  the  right  next  to  the  sq/an  option.  If  the

“calculate” button is clicked in the preceding dialog the estimate sq/an is calculated from the specification

of sq and it is entered on the right next to the sigma option for information. This estimate is then the basis

for the calculation of action and warning limits of the xq/s chart

The third calculation method requires a sigma value being specified. In this case it is assumed that sigma

is  known  and  consequently  the  correction  factor  is  not  required.  To  the  right  of  the  “sigma”  option  the

sigma value is entered. In contrast to the previous method sq/an is replaced by sigma. In cases of doubt

and  since  in  the  majority  of  cases  sigma  is  not  really  known,  the  calculation  method  based  on  the

specification  of  sq  including  the  automatic  determination  of  the  estimate  sq/an  should  be  performed  for

variances.

If  the  “relative  deviation  from  Xq”  or  the  “deviation  from  Xq  in  percent”  is  selected  as  “specification  for

calculating  limit  values”  the  input  option  for  “action  probability  in  %”  disappears  and  the  “deviation  from

target  value” can  be entered instead.  Limit values are then calculated on the basis of these values and

the default calculation of Xq (target value, tolerance center, mean value of XQ chart, input).

Further details  have to be  made in order to determine action  and  warning limits of the Xq chart.  An Xq

value  has  to  be  specified.  The  system  offers  the  possibilities  to  equate  the  Xq  value  with  the  tolerance

center or the target value or to specify a value manually. If the process is supposed to be aligned to the

mean value the tolerance center should be preferred as Xq value.

The  action  probability  must  be  entered  in  per  cent  in  order  to  calculate  action  and  warning  limits  of  the

Xq/S-chart. For this purpose, it has to be defined beforehand whether the calculation is to be made on the

basis of one-sided or two-sided limit values. One of the two options has to be selected.

Having defined the “one-sided“ or “two-sided“ option, the action probability has to be entered in per cent.

All possible and reasonable action probabilities are defined in the system and need only to be selected

from the list. The computation of the Xq chart is based on normal distribution. The value 99,725 is to be

selected  if,  e.g.,  99,725%  of  characteristic  values  are  supposed  to  lie  within  the  action  limits.  As  the

specification  of  a  sigma  area  is  commonly  used  by  some  users,  the  corresponding  sigma  area  is

displayed along with the respective action probability for information.

If warning limits are also to be calculated an action probability has also to be entered here. Please take

into account that the probability value of the warning limit has to be less than the action limit value.

REK-EVA_81.docx

Version: 1.1.2405

Page 32 of 84

Complaint Management

No  sigma  area  is  displayed  in  the  selection  list  since  the  distribution  of  chi²  is  considered  for  the

calculation of limit values of the s-chart. Apart from that, the entry is the same as for the Xq chart.

The  calculation  of  limits  is  triggered  as  soon  as  the  specifications  made  are  saved,  provided  that  the

"calculate" checkbox has been clicked before.

As already mentioned, the user is also able to enter the limit values directly without any defaults.

If  the  R-chart  is  selected  instead  of  the  Xq  or  s-chart,  the  option  sq/an  is  replaced  by  Rq/dn  in  the

specifications  for  the  calculation.  The  calculation  of  the  estimate  of  sigma  is  made  on  the  basis  of  the

default  mean  range  R  divided  by  the  correction  factor  dn.  This  correction  factor  in  turn  depends  on  the

sample size n. The corresponding values are defined in the system and are selected automatically. Apart

from that, the rest is the same as for the Xq or s-chart. Please note that limit values are not calculated on

the basis of a chi² distribution for the R-chart but on the basis of a table defined in the system, which is

based on standardized ranges.

6.3  Control charts for attributive characteristics

The p- and u-charts are available for attributive characteristics.

p designates the share of non-conforming units in the sample and u designates the failures per unit in the

sample. It is important for the p-chart that each item is either described as error-free or faulty. If an item

shows several failures it is referred to as faulty only once.

In  contrast  to  variable  characteristics  there  are  no  lower  limit  values.  Furthermore,  it  is  normally  not

necessary to state the values UTL, LTL and target value.

A pq or uq value has to be entered in per cent to calculate specifications automatically. This can be done

in the default values dialog.

The  calculation  of  limits  is  triggered  as  soon  as  the  specifications  made  are  saved,  provided  that  the

"calculate" checkbox has been clicked before.

Calculation  is  respectively  based  on  normal  distribution.  The  value  99,725  has  to  be  selected  if,  e.g.

99,725% of the characteristic values are supposed to lie below the upper action limit. As the specification

of  a  sigma  area  is  commonly  used  by  some  users  the  corresponding  sigma  area  is  displayed  with  the

respective action probability for information.

6.4  Computation of formulas

On  the  basis  of  an  entered  formula,  measured  values  can  be  calculated  automatically  by  way  of

measured values or statistic values of other characteristics that have been checked before.

REK-EVA_81.docx

Version: 1.1.2405

Page 33 of 84

Complaint Management

The  first  part  of  the  formula  specifies  where  the  calculation  of  formulas  is  supposed  to  take  place.  The

following types are available:

  V – Calculation on the level of single values (Value).

A  single  value  is  generated  for  the  calculated  characteristic  for  each  single  value  of  the

characteristics involved.

  S - Calculation on the level of samples (Sample).

Exactly one single value is generated for the calculated characteristic for each sample of the

characteristics involved.

  C - Calculation on the level of characteristics (Criteria).

Exactly  one  single  value  is  generated  for  the  calculated  characteristic  (with  respect  to  the

overall statistic of all characteristics involved)

The actual formula follows this identifier. The following operators, functions and constants are supported

in this context:

REK-EVA_81.docx

Version: 1.1.2405

Page 34 of 84

Complaint Management

Functions

abs(x)

atan(x)

cosh(x)

float(x)

sqrt(x)

acos(x)

Calculates the absolute value

Calculates the arc tangent

Calculates the hyperbolic cosine

Converts the value into a floating point number

Calculates the square root

Calculates the arc cosine

atan2(y,x)

Calculates the arc tangent of y/x

exp(x)

log(x)

sin(x)

tan(x)

asin(x)

cos(x)

int(x)

log10(x)

round(x)

Calculates the exponential value

Calculates natural logarithms

Calculates the sine

Calculates the tangent

Calculates the arc sine

Calculates the cosine

Converts the value into an integer

Calculates common logarithms

Rounds to integer value

round(x,y)

Rounds the value x to y decimal places

sinh(x)

tanh(x)

trunc(x)

trunc(x,y)

Operators

x + y

x – y

x / y

x * y

x ** y

Calculates the hyperbolic sine

Calculates the hyperbolic tangent

Reduces the value x to an integer value

Reduces the value x to y decimal places

Addition

Subtraction

Division

Multiplication

Calculates x raised to the power of y

Absolute
(constant)

term

pi

e

3.141592654

2.718281828

If  constant,  numeric  values  are  used  in  formulas  it  has  to  be  taken  into  account  that  no  separators  are

used for thousands digits. If these constants are floating-point numbers it has to be considered that they

use a dot as decimal separator instead of a comma.

REK-EVA_81.docx

Version: 1.1.2405

Page 35 of 84

The following syntax applies for the variables identifying the single values or statistic values of the order

characteristics involved [x:y:z].   The  x  parameter  identifies  the  statistic  value  to  be  used.  The  available

values are listed as follows. Please consider possible restrictions regarding the calculation level.

Complaint Management

  X – Single value

(is only available for calculations on the level of single values)

  AVG – Mean value

(is only available for calculations on the level of samples or characteristics)

  MIN – Minimum

(is only available for calculations on the level of samples or characteristics)

  MAX – Maximum

(is only available for calculations on the level of samples or characteristics)

  SUMX – Sum of single values

(is only available for calculations on the level of samples or characteristics)

  R – Range

(is only available for calculations on the level of samples or characteristics)

  S – Standard deviation

(is only available for calculations on the level of samples or characteristics)

  N – Sample size

(is only available for calculations on the level of samples or characteristics)

  M – Number of samples

(is only available for calculations on the level of characteristics)

The  y  parameter  describes  how  the  corresponding  characteristic  is  supposed  to  be  identified.  The

following possibilities are available:

  SENO  –

identification  via

the  MS  (maintenance  sequence/operation  sequence)  of

the

characteristic (serial number)

REK-EVA_81.docx

Version: 1.1.2405

Page 36 of 84

Complaint Management

  INCR – Identification via the characteristic number (inspection criteria)

If  the  characteristic  number  is  not  unique  within  the  inspection  requirement  it  is  not  predictable

which one of the applicable characteristics is used at the time of calculation.

The parameter z identifies the characteristic on the basis of the field content determined by parameter y.

Either the MS/OP number or the characteristic number of the calculation source is written in this field. If

the characteristic number has a blank it should be replaced by an underscore within the formula.

Example 1:

A  new  characteristic  is  computed  from  the  single  values  of  the  characteristic  assigned  to  the

number  "LENGTH”/”LAENGE"  divided  by  2.5.  A  corresponding  single  value  is  supposed  to  be

calculated  for  each  single  value  of  the  source  characteristic  (calculation  on  the  level  of  single

values).

 Formula: V: [X:INCR:LAENGE] / 2.5

Example 2:

The  characteristic  "surface"  results  from  the  product  of  the  characteristics  with  the  characteristic

number  “LENGTH”/”LAENGE”  and  “WIDTH  TOTAL”/”BREITE  GES”.  A  single  value  of  the

characteristic  "surface"  is  supposed  to  be  calculated  for  each  single  value  of  both  source

characteristics (calculation on the level of single values).

 Formula: V: [X:INCR:LAENGE] * [X:INCR:BREITE_GES]

Example 3:

The  characteristic  "maximum  margin  width"  results  from  the  subtraction  of  the  minimum  of  the

characteristic "inside diameter" (MS 10) from the maximum of the characteristic "outside diameter"

(MS 20). A single value of the characteristic "maximum margin width" is supposed to be calculated

for each sample of both source characteristics (calculation on the basis of samples).

 Formula: S: [MAX:SENO:20] - [MIN:SENO:10]

The escalation CPAUMW.CALCULATED_CRITERIAS_GET_VARIABLE_VALUE is triggered if unknown

variables are used within a formula (faulty parameters x and/or y). However, the escalation management

module has to be licensed in this case.

When it comes to the calculation of formulas, it is allowed to compute new calculated characteristics from

calculated  characteristics  that  have  already  been  computed.  However,  this  nesting  may  not  have  more

than  10  references  one  below  the  other.  Furthermore,  double  concatenations  must  not  be  created

(Example:  characteristic  A  is  calculated  from  characteristic  B  and  characteristic  C;  characteristic  C  is

calculated from characteristic A).

REK-EVA_81.docx

Version: 1.1.2405

Page 37 of 84

Complaint Management

Tool numbers, machine numbers or cavity numbers, etc. are not defined for the single values computed.

The  same  number  needs  to  be  assigned  to  all  source  samples  of  the  calculation  to  take  over  a

corresponding number (batch number, sample number, serial number, etc.). If there is no number that is

assigned  to  all  source  samples  a  number  will  not  be  assigned  to  the  calculated  sample.  Provided  that

several numbers are found that are  assigned to all source samples only the first number that has been

found  is  assigned  to  the  calculated  sample.  This  function  only  applies  to  numbers,  which  have  been

assigned on sample level.

REK-EVA_81.docx

Version: 1.1.2405

Page 38 of 84

Complaint Management

7  Customers

Summary

Menu

Master data  Quality management  Customers

Transaction code

cto

Function authorization

cto

The customer catalog has been designed to edit/keep customers. Provided that there is an interface to a

higher-level system (e.g. ERP system), customers can be created automatically via interface. As soon as

a  new  customer  is  created  or  changed  in  the  ERP  system,  for  example,  the  customer  data  record  is

automatically created or changed in the customer catalog including the defined information.

Utilization

The  customer  number  uniquely  identifies  customers  in  all  QM  applications  that  refer  to  the  customer

catalog. The customer catalog is used as basis in particular for inspection requirements of production and

and the goods issue as well as for the complaint management.

The  “customer  number”  field  is  the  key  field,  i.e.  if  a  new  customer  is  saved  it  is  verified  whether  a

customer with this key information exists already.

By  distinguishing  between  active  and  inactive  customers,  it  may  be  defined  whether  or  not  they  are

available  in  certain  selection  lists.  Thus,  no  complaint  can  be  created  for  an  inactive  customer,  for

example. However, inactive customers may be evaluated at any time. Moreover, inactive customers can

be reactivated at any time.

Extensive  address  and  contact  data  can  be  defined  in  addition  to  the  customer  number  and  the

designation.

If a customer is designated as “party in charge” they will be included in the selection list for the parties in

charge. Such selection lists are integrated in different detail applications. The list of the parties in charge

is accessed mainly in the complaint management function and when measures are generated.

Integration

Customer  data  is  a  global  catalog  that  is  used  in  many  QM  applications.  The  below  list  shows  the

applications referring to the customer catalog.

  External people

  Departments

REK-EVA_81.docx

Version: 1.1.2405

Page 39 of 84

Complaint Management

  Production inspection planning

  Production inspection requirements

  Complaint management

  Failure mode analysis

Prerequisite

There are no special requirements.

Selection criteria

The address fields 1, 2, and 3 are available in addition to the customer number and customer name.

The active or inactive customers can be restricted using the filter field “inactive”.

Field Descriptions

The available fields are self-explanatory and are not described separately, except for the address fields.

The content of the individual address fields is not specified by default and, as a result, may be defined by

the user. Normally, address field 1 should include further details on the company, e.g. “site X”. As there is

no field defined for the street, address field 2 or 3 (to be preferred)  is to be used for the street including

street number.

REK-EVA_81.docx

Version: 1.1.2405

Page 40 of 84

Editing functions

The below dialog opens to edit a data record.

Complaint Management

Toolbar

There are no other special function buttons in addition to the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 41 of 84

Complaint Management

8  Manufacturer

Summary

Menu

Master data  Quality management  Manufacturer

Transaction code

mft

Function authorization  mft

The catalog of manufacturers has been designed to edit and update the list of manufacturers. Provided

that there  is an interface to a higher level system (e.g. ERP system) the manufacturers can be  created

automatically  by  interface.  As  soon  as  a  new  manufacturer  is  created  or  an  existing  manufacturer  is

changed in the ERP system, the corresponding manufacturer record is automatically created or changed

with the defined information in the catalog of manufacturers.

Utilization

The  manufacturer  number  uniquely  identifies  the  manufacturers  in  all  QM  applications  that  refer  to  the

catalog of manufacturers. In particular, the inspection requests of the goods receipt refer to the catalog of

manufacturers.

The "manufacturer number" field is the key field, i.e. while saving a new manufacturer, the system checks

whether there is already a manufacturer with this key information.

By  differentiating  between  active  and  inactive  manufacturers,  it  can  be  defined  whether  or  not  they  are

still to be available in certain selection lists. Consequently, it is, for example, impossible to create a goods

receipt  inspection  request  for  an  inactive  manufacturer.  However,  it  is  possible  to  evaluate  inactive

manufacturers at any time. Moreover, inactive manufacturers may be reactivated at any time.

Extensive  address  and  contact  data  may  be  defined  in  addition  to  the  manufacturer  number  and

designation.

If  the  manufacturer  is  designated  as  being  a  "party  in  charge"  by  clicking  the  corresponding  field,  the

manufacturer is included in the selection list for the parties responsible. Such selection lists are integrated

in  different  detail  applications.  The  list  of  the  parties  responsible  is  mainly  used  within  complaint

management and for the creation of measures.

Integration

Manufacturer  data  is  a  global  catalog  that  is  used  in  many  QM  applications.  Please  find  below  some

applications that refer to the manufacturer catalog.

  External people

REK-EVA_81.docx

Version: 1.1.2405

Page 42 of 84

Complaint Management

  Departments

  Goods receipt inspection planning

  Goods receipt inspection requests

  Failure mode analysis

Prerequisite

There are no special requirements.

Selection criteria

The address fields 1, 2 and 3 are available in addition to the manufacturer number and the designation.

The "inactive" filter field allows for the data set to be restricted to active or inactive manufacturers.

Field descriptions

The available fields are self-explanatory and are not explained separately, except for the address fields.

The content of the individual address fields is not specified and, as a result, may be defined by the user.

Normally, the address field 1 should include an addition to the company's name, e.g. "site X". As no field

has  explicitly  been  defined  for  the  street,  the  address  field  2  or  3  (to  be  preferred)  is  to  be  used  for

entering the street and street number.

REK-EVA_81.docx

Version: 1.1.2405

Page 43 of 84

Editing functions

The following dialog opens to edit a data record.

Complaint Management

Toolbar

There are no other special function buttons in addition to the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 44 of 84

Complaint Management

9  Suppliers

Summary

Menu

Master data  Quality management  Suppliers

Transaction code

sup

Function authorization

sup

The supplier catalog has been designed to edit and update the list of suppliers. Provided that there is an

interface  to  a  higher-level  system  (e.g.  ERP  system),  suppliers  may  be  created  automatically  by  the

interface. As soon as a new supplier is created or an existing supplier is changed in the ERP system, the

data record for this supplier is automatically created or changed including the specified information within

the HYDRA-CAQ supplier catalog.

Utilization

The supplier number uniquely identifies suppliers in all QM applications that access the supplier catalog.

The  supplier  catalog  is  used,  in  particular,  for  inspection  requests  of  goods  receipt  and  the  complaint

management.

The "supplier number" field is the key field, i.e. while saving a new supplier, the system checks whether or

not there is already a supplier with this key information.

By  distinguishing  between  active  and  inactive  suppliers,  it  may  be  defined  whether  or  not  the  suppliers

are  available  in  certain  selection  lists.  Consequently,  it  is,  for  example,  impossible  to  create  a  goods

receipt inspection request for an inactive supplier. However, inactive suppliers may be evaluated at any

time. Moreover, inactive suppliers may also be reactivated at any time.

In addition to the supplier number and designation, it is possible to specify comprehensive address and

contact details.

Being identified as “party in charge”, this supplier is included in the selection list for responsible parties.

Such  selection  lists  are  integrated  in  different  detail  applications.  The  list  of  the  parties  responsible  is

mainly used within complaint management and for the creation of measures.

Integration

Supplier  data  is  a  global  catalog  that  is  used  in  many  QM  applications.  Please  find  below  some

applications that refer to the supplier catalog.

  External people

  Departments

REK-EVA_81.docx

Version: 1.1.2405

Page 45 of 84

Complaint Management

  Goods receipt inspection planning

  Goods receipt inspection requests

  Complaints management

  Failure mode analysis

Prerequisite

There are no special requirements.

Selection criteria

The address fields 1, 2 and 3 are available in addition to the supplier number and the designation.

The "inactive" filter field allows for the data set to be restricted to active or inactive suppliers.

Field descriptions

The available fields are self-explanatory and are not explained separately, except for the address fields.

The content of the individual address fields is not specified explicitly and, as a result, may be defined by

the user. Normally, the address field 1 should include an addition to the company's name, e.g. "site X". As

no field has explicitly been defined for the street, the address field 2 or 3 (to be preferred) is to be used for

entering the street and street number.

REK-EVA_81.docx

Version: 1.1.2405

Page 46 of 84

Editing functions

The following dialog opens to edit a data record.

Complaint Management

Toolbar

There are no other special function buttons in addition to the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 47 of 84

Complaint Management

10  Distributor

Overview

Menu

Master data  Quality management  Distributor

Transaction code

distrib

Function authorization

distrib

The  distributor  catalog  allows  for  different  distributors  to  be  defined  and  different  master  data  to  be

assigned or referenced, e.g. external persons.

Utilization

The field content "distributor" enables unique identification.

The  data  record  of  a  distributor  catalog  only  includes  a  number  and  designation  as  well  as  a  flag  to

identify  it  as  "responsible".  The  possibility  to  assign  different  distributor  entries  is  a  decisive  factor.  The

following entries of other master data may be assigned to a distributor.

  External persons

  Departments

  Customers

  Suppliers

  Manufacturers and



Internal companies.

Once  identified  as  being  "responsible",  the  distributor  is  taken  over  into  the  selection  list  of  the  parties

responsible.  This  list  is  integrated  in  different  detail  applications.  The  list  of  the  parties  responsible  is

mainly used within complaint management and for the creation of measures. The complaint management

also allows for a team to be assigned. The content of this distributor catalog is provided in a selection list.

Integration

The distributor catalog is available in applications that enable assignment of responsible parties. Subject

to the corresponding application or system configuration, it may be the case that "responsible distributors"

are intentionally not included in the selection list.

Prerequisite

The master data that can be assigned to a distribution list need to be maintained before this function can

be used in a reasonable manner.

REK-EVA_81.docx

Version: 1.1.2405

Page 48 of 84

Complaint Management

Selection criteria

Selection criteria are self-explanatory and not described separately.

Field descriptions

The available fields are self-explanatory and not explained separately.

Toolbar

Distributor entries

Assignment of distributor entries

Function to assign distributors to a previously defined and selected catalog entry of the distribution

list.

Detail application  "distributor entries"

The  application  of  distributor  entries  includes  a  list  showing  the  data  records  that  have  already  been

assigned. The information on the selected data record is also shown in a display window.

Field descriptions

Name 1, Name 2, Name 3

The  contents  of  the  fields  "name  1",  "name  2"  and  "name  3"  of  the  assigned  distributor  entry  are

shown.  The  customer  name  and  the  content  of  the  address  fields  1  and  2  are  displayed  for

customers. The last name, first name and initials are displayed for external persons.

All other fields are self-explanatory and not explained separately.

REK-EVA_81.docx

Version: 1.1.2405

Page 49 of 84

Complaint Management

11  Failure Types

Summary

Menu

Master data  Quality management  Failure types

Transaction code

ftyp

Function authorization

ftyp

The  catalog  of  failure  types  has  been  designed  to  describe  the  occurred  deviations  in  more  detail,  e.g.

deviations  from  specified  limit  values.  In  addition  to  the  other  failure  catalogs  (failure  location,  failure

cause,  causer),  the  failure  type  catalog  is  very  important  as  it  also  includes  inactive  failure  types  by

default. These inactive failure types are required for the generation of automatic failure types, e.g. in case

a limit value has not been respected. For this reason, these inactive failure types must not be deleted. All

inactive failure types that are important for the automatic generation of failures start with the ID number

"AUTO:". There are, for example, automatic failure types for

  Non-observance of the upper tolerance limit

  Non-observance of the lower tolerance limit

  Non-observance of action and warning limits

Failures the designation of  which includes the number sign (#)  automatically trigger the generation  of a

complaint if they  are assigned to  a measured value  of one of the areas in-production  inspection, goods

receipt inspection or goods issue inspection.

Utilization

The "failure analysis number" field is the key field, i.e. when saving a new failure type, the system checks

whether there is already a failure type with this key information.

The  input  of  failure  types  is  easy  to  handle.  Only  a  failure  analysis  number  and  a  corresponding

designation have to be assigned.

Failure  type  groups  may  optionally  be  defined  beforehand.  Consequently,  the  corresponding  group  can

be assigned to the respective failure type. This option should not be missed out as it provides improved

reports/evaluations. Groups can be assigned by opening the group tree using the magnifier function. The

hierarchical  tree  entries  of  the  group  tree  allow  for  the  requested  group  to  be  selected  and  taken  over.

Then  the  "groups"  field  of  the  editing  dialog  for  failure  types  shows  the  assigned  group  including  the

hierarchical group structure.

REK-EVA_81.docx

Version: 1.1.2405

Page 50 of 84

Complaint Management

If failure types are presented in list form the group hierarchy is represented by the columns "group 1" to

"group 5".

Groups  are  edited  in  the  "failure  type  groups"  application,  which  is  described  in  the  manual  entitled

"MOC_Groups.pdf".

Under  certain  circumstances,  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for the failure type number as failure key.

By differentiating between active and inactive failure types, it can be defined  whether or not they are still

to be available in failure selection lists in the later data acquisition process. However, it is also possible to

evaluate inactive failure types at any time. Moreover, inactive failure types can be reactivated at any time.

Integration

The  failure  types  catalog  is  used,  among  other  things,  within  measurement  recording  and  in  complaint

management. If deviations are detected in measurement recording the failure catalogs help describe the

deviations in more detail and represent it in a way that allows for analyses/reports to be performed. Only

in  this  way  is  it  possible  to  determine  failure  mode  analyses,  take  appropriate  action  (measures)  and

prevent the deviation from reoccurring.

In addition, this catalog is the basis for failure mode analyses relating to the failure types.

This catalog is also required for the creation of analysis selection catalogs as well as for using inspection

chart characteristics within inspection planning and measurement recording. An analysis selection catalog

includes  a  subset  of  all  failures  and  restricts  the  list  of  failure  (types)  that  can  be  selected  during  the

collection  process  to  those  failures  of  the  analysis  selection  catalog  assigned  to  the  characteristic.

Consequently, the analysis selection catalog also determines the list of failure types for inspection chart

characteristics.

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection criteria are self-explanatory and are not described separately. Failure types of a group can be

filtered in the "groups" tab using the icon

 and selecting a failure type group (in tree structure). The

group tree list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive failure types.

REK-EVA_81.docx

Version: 1.1.2405

Page 51 of 84

Complaint Management

Field descriptions

The available fields are self-explanatory and are not explained separately.

The "inactive" check box identifies failure types that are no longer to be used in the active data acquisition

process.

In a tree structure the group field shows the assigned group or allows for groups to be assigned in form of

the tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 52 of 84

Complaint Management

12  Failure Locations

Summary

Menu

Master data  Quality management  Failure locations

Transaction code

floc

Function authorization

floc

The catalog of failure locations has been designed to describe the deviations occurred in more detail, e.g.

deviations from specified limit values.

Utilization

The  "failure  analysis  number"  field  is  the  key  field,  i.e.  when  saving  a  new  failure  location,  the  system

checks whether there is already a failure location with this key information.

The  input  of  failure  locations  is  easy  to  handle.  A  failure  analysis  number  and  a  corresponding

designation only have to be assigned.

Failure  location  groups  may  optionally  be  defined  beforehand.  Consequently,  the  corresponding  group

can  be  assigned  to  the  respective  failure  location.  This  option  should  not  be  missed  out  as  it  provides

improved  reports/evaluations.  Groups  can  be  assigned  by  opening  the  group  tree  using  the  magnifier

function.  The  requested  group  may  be  selected  and  taken  over  in  the  group  tree  by  way  of  the

hierarchical  tree  entries.  The  assigned  group  including  the  hierarchical  group  structure  then  appears  in

the "groups" field of the editing dialog.

If failure locations are presented in list form the group hierarchy is represented by the columns "group 1"

to "group 5".

Groups  are  edited  in  the  "failure  location  groups"  application,  which  is  described  in  the  manual  entitled

"MOC_Groups.pdf".

Under  certain  circumstances,  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for the failure location number as failure key.

By differentiating between active and inactive failure locations, it can be defined whether or not they are

still  to  be  available  in  failure  selection  lists  in  the  later  data  acquisition  process.  However,  it  is  also

possible  to  evaluate  inactive  failure  locations  at  any  time.  Moreover,  inactive  failure  locations  can  be

reactivated at any time.

REK-EVA_81.docx

Version: 1.1.2405

Page 53 of 84

Complaint Management

Integration

The failure location catalog is used, among other things, within measurement recording and in complaint

management. If deviations are detected in measurement recording the failure catalogs help describe the

deviation in more detail and represent it in a way that allows for analyses/reports to be performed. Only in

this  way  is  it  possible  to  determine  failure  mode  analyses,  take  appropriate  action  (measures)  and

prevent the deviation from reoccurring.

In addition this catalog is the basis for failure mode analyses relating to the failure locations.

The  failure  locations  of  this  catalog  can  also  be  integrated  in  analysis  selection  catalogs.  An  analysis

selection  catalog  includes  a  subset  of  all  failures  and  restricts  the  list  of  failure  (locations)  that  can  be

selected during the collection process to those failures of the analysis selection catalog that is assigned to

the characteristic.

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection criteria are self-explanatory and are not described separately. Failure locations of a group can

be  filtered  in  the  "groups"  tab  clicking  the  icon

  and  selecting  a  failure  location  group  (in  tree

structure). The group tree list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive failure locations.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The  "inactive"  check  box  identifies  failure  locations  that  are  no  longer  to  be  used  in  the  active  data

acquisition process.

In a tree structure the group field shows the assigned group or allows for groups to be assigned in form of

a tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 54 of 84

Complaint Management

13  Failure Causes

Summary

Menu

Master data  Quality management  Failure causes

Transaction code

fcau

Function authorization

fcau

The catalog of failure causes has been designed to describe the occurred defects/failures in more detail,

e.g. if limit values have been infringed.

Utilization

The  "failure  analysis  number"  field  is  the  key  field,  i.e.  when  saving  a  new  failure  cause,  the  system

checks whether there is already a failure cause with this key information.

The input of failure causes is easy to handle. A failure analysis number and a corresponding designation

only have to be assigned.

Failure cause groups may optionally be defined beforehand. Consequently, the corresponding group can

be assigned to the respective failure cause. This option should not be missed out as it provides improved

reports/evaluations. Groups can be assigned by opening the group tree using the magnifier function. The

requested group may be selected and taken over in the group tree by way of the hierarchical tree entries.

The  assigned  group  including  the  hierarchical  group  structure  then  appears  in  the  "groups"  field  of  the

editing dialog.

If failure causes are presented in list form the group hierarchy is represented by the columns "group 1" to

"group 5".

Groups  are  edited  in  the  "failure  causes  groups"  application,  which  is  described  in  the  manual  entitled

"MOC_Groups.pdf".

Under  certain  circumstances  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for the failure cause number as failure key.

By differentiating between active and inactive failure causes, it can be defined whether or not they are still

to be available in failure selection lists in the later data acquisition process. However, it is also possible to

evaluate inactive failure causes at any time. Moreover, inactive failure causes can be reactivated at any

time.

REK-EVA_81.docx

Version: 1.1.2405

Page 55 of 84

Complaint Management

Integration

The  failure  cause  catalog  is  used,  among  other  things,  within  measurement  recording  and  in  complaint

management.  If  deviations  with  respect  to  tolerance  limits  are  detected  in  measurement  recording  the

failure cause catalog helps describe the actual failure cause in more detail and represents it in a way that

allows for analyses/reports to be made. Only in this way is it possible to determine failure mode analyses,

take appropriate action (measures) and prevent the deviation from reoccurring.

In addition this catalog is the basis for failure mode analyses relating to the failure cause.

The  failure  causes  of  this  catalog  can  also  be  integrated  in  analysis  selection  catalogs.  An  analysis

selection  catalog  includes  a  subset  of  all  failures  and  restricts  the  list  of  failure  (causes)  that  can  be

selected  during  the  collection  process  to  those  of  the  analysis  selection  catalog  assigned  to  the

characteristic.

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection criteria are self-explanatory and are not described separately. Failure causes of a group can be

filtered in the "groups" tab using the

 icon and selecting a failure cause group (in tree structure). The

group tree list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive failure causes.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The  "inactive"  check  box  identifies  failure  causes  that  are  no  longer  to  be  used  in  the  active  data

acquisition process.

In a tree structure the group field shows the assigned group or allows for groups to be assigned in form of

a tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 56 of 84

Complaint Management

14  Causers

Summary

Menu

Master data  Quality management  Originator

Transaction code

Function authorization

ori

ori

The catalog of causers/originators has been designed to describe the cause for an initial situation. In this

context,  the  causer  or  originator  does  not  imperatively  have  to  be  a  person  or  a  group  of  people.  A

machine can also be the causer/originator.

Utilization

The "causer  number" field  is the key field, i.e.  while saving a new causer/originator, the system checks

whether there is already a causer with this key information.

The input of causers is easy to handle. Only an ID number and a corresponding designation have to be

assigned.

Causer groups may optionally be defined in advance and the corresponding group can be assigned to the

originator. This option should not be missed out as it provides improved reports/evaluations.  Groups can

be  assigned  by  opening  the  group  tree  using  the  magnifier  function.  The  requested  group  may  be

selected  and  taken  over  in  the  group  tree  by  way  of  the  hierarchical  tree  entries.  The  assigned  group

including the hierarchical group structure can then be found in the "groups" field of the editing dialog for

causers.

If  causers  are  presented  in  list  form  the  group  hierarchy  is  represented  by  the  columns  "group  1"  to

"group 5".

Groups  are  edited  in  the  "causer  groups"  application,  which  is  described  in  the  manual  entitled

MOC_Groups.pdf.

Under  certain  circumstances,  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for the originator number as analysis key.

By distinguishing between active and inactive causers, it can be defined whether or not they are still to be

available in selection lists for the causers in the later data acquisition process. However, it is possible to

evaluate inactive originators at any time. Moreover, inactive causers can be reactivated at any time.

REK-EVA_81.docx

Version: 1.1.2405

Page 57 of 84

Complaint Management

Integration

The  catalog  of  originators  is  used,  among  other  things,  within  measurement  recording  and  in  complaint

management.  A  causer/originator  may  be  added  if  defects  are  detected  and  documented  within

measurement recording. Only in this way is it possible to determine the basic causers, take appropriate

action (measures) and prevent the defects from recurring during the failure mode analysis that follows.

The causers/originators of this catalog can also be integrated in analysis selection catalogs. An analysis

selection catalog includes a subset of all failures and causers/originators and restricts the list of failures

and causers that can be selected during the collection process to those of the analysis selection catalog

assigned to the characteristic.

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection  criteria  are  self-explanatory  and  are  not  described  separately.  Causers/originators  of  a  group

can be filtered in the "groups" tab using the icon

 and selecting a causer group (in tree structure). The

group tree list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive causers.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The  "inactive"  check  box  identifies  causers  that  are  no  longer  to  be  used  in  the  active  data  acquisition

process.

In a tree structure the group field shows the assigned group or allows for groups to be assigned in form of

the tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 58 of 84

Complaint Management

15  Measures

Summary

Menu

Master data  Quality management  Measures

Transaction code

meas

Function authorization  meas

The catalog of measures has been designed to define the action to be taken, for example, to prevent the

detected failures from recurring or to allow for them to be identified in time.

Utilization

The "measure number" field is the key field, i.e. while saving a new measure, the system checks whether

there is already a measure with this key information.

The input of measures is easy to handle. Only a measure number and a corresponding designation have

to be assigned.

Measure groups may optionally be defined beforehand and the corresponding group can be assigned to

the  measure.  This  option  should  not  be  missed  out  as  it  provides  improved  reports/evaluations  or

structures.  Groups  can  be  assigned  by  opening  the  group  tree  using  the  magnifier  function.  The

requested group may be selected and taken over in the group tree by way of the hierarchical tree entries.

The assigned group including the hierarchical group structure can then be  found in the "groups" field of

the editing dialog for the measures.

If  measures  are  presented  in  list  form  the  group  hierarchy  is  represented  by  the  columns  "group  1"  to

"group 5".

Groups  are  edited  in  the  "measure  groups"  application,  which  is  described  in  the  manual  entitled

MOC_Groups.pdf.

By distinguishing between active and inactive measures, it can be defined whether or not they are still to

be  available  in  selection  lists  for  the  measures  in  the  later  data  acquisition  process.  Inactive  measures

can be reactivated at any time.

REK-EVA_81.docx

Version: 1.1.2405

Page 59 of 84

Complaint Management

Integration

The  measures  catalog  is  used,  among  other  things,  within  measurement  recording  and  in  complaint

management.  If  deviations  are  detected  within  measurement  recording  actions  can  be  triggered

immediately  on  the  basis  of  the  catalog  of  measures.  At  first  the  assigned  measures  have  the  status

"open".  In  complaint  management  a  party  responsible  (e.g.  a  person)  as  well  as  a  deadline  may  be

defined. In addition to this, an actual date, the completion in % and effectiveness in % may be specified

as well. Normally, these fields are only filled out, once a measure has been completed (measure status

switches to "done").

Subject  to  whether  the  corresponding  license  for  the  escalation  management  module  has  been

purchased, the measures can also be sent to the defined person by e-mail.

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection  criteria  are  self-explanatory  and  are  not  described  separately.  Measures  of  a  group  can  be

filtered  in  the  "groups"  tab  using  the  icon

  and  selecting  a  measure  group  (in  tree  structure).  The

group tree list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive measures.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The "inactive" check box identifies measures that are no longer to be used in the active data acquisition

process.

In a tree structure the group field shows the assigned group or allows for groups to be assigned in form of

the tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 60 of 84

Complaint Management

16  Department

Overview

Menu

Master data  Quality management  Department

Transaction code

departm

Function authorization

departm

The catalog of departments has been designed to edit departments. Provided that there is an interface to

a  higher-level  system  (e.g.  ERP  system),  departments  can  be  created  or  changed  automatically  by

interface.

Purpose

The “department” field uniquely identifies departments in all QM applications referring to the departments

catalog. The departments catalog is used,  in particular, by complaint management and  when measures

are created.

The “department” field is the key field, i.e. when a new department is saved it is checked whether or not a

department already exists with this key information.

The  differentiation  between  active  and  inactive  departments  determines  whether  or  not  these

departments are still available in specific selection lists. For example, an inactive department cannot be

assigned  as  being  responsible  for  a  measure.  But  reports  on  inactive  departments  are  possible  at  any

time and inactive departments can always be reactivated.

In  addition  to  the  department  (number)  and  designation,  a  company  (customer,  supplier,  manufacturer)

may also be assigned. Furthermore, phone numbers, e-mail addresses etc. can be entered as well.

If a department is designated as being “responsible” this department is also included in the selection list

for the “parties responsible”. Such selection lists are integrated in different detail applications. The  list of

the parties responsible is mainly used in complaint management and when measures are created.

Integration

Department  data  is  a  global  catalog  used  in  many  QM  applications.  The  list  below  shows  some  of  the

applications referring to this catalog.

  External persons

  Customers

  Suppliers

REK-EVA_81.docx

Version: 1.1.2405

Page 61 of 84

Complaint Management

  Manufacturers

  Complaint management

  Measures

Prerequisite

There are no special requirements.

Selection criteria

The company type and company number may be used as filter criteria in addition to the “department” and

“designation” fields.

Using the filter field “inactive”, active or inactive departments can be selected.

Field descriptions

The fields are self-explanatory and not described in more detail for this reason.

Editing functions

This dialog opens for editing of a data record.

Toolbar

There are no other special function buttons besides the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 62 of 84

Complaint Management

REK-EVA_81.docx

Version: 1.1.2405

Page 63 of 84

Complaint Management

17  External Persons

Overview

Menu

Master data  Quality management  External persons

Transaction code

extper

Function authorization

extper

The  catalog  of  “external  persons”  has  been  designed  to  define  persons  that  are  not  edited  in  the  HR

master. Provided that there is an interface to a higher-level system (e.g. ERP system), external persons

can be created or changed automatically by interface.

Purpose

The personal number uniquely identifies external persons in all QM applications referring to this catalog.

The complaint management, in particular, uses the catalog of external persons.

The contact partners of customers, suppliers and manufacturers are defined in this catalog, for example.

As  the  integrated  HR  master  is  not  always  available,  it  is  also  possible  to  include  “internal”  staff  in  this

catalog. The same also applies for a licensed HR master. However, it is important that this catalog is not

connected with the HR master and does not replace it. The catalog of external persons is currently only

used in QM applications.

The “personal no.” field is the key field, i.e. when a new person is saved it is checked whether or not a

person already exists with this key information.

The differentiation between active and inactive persons determines whether or not these persons are still

available  in  specific  selection  lists.  For  example,  an  inactive  person  cannot  be  assigned  as  being

responsible for a measure. But inactive persons can be reactivated at any time.

In addition to the personal number and designation, substantial address and contact data as well as the

assignment to a company and department may be defined.

If  a  person  is  designated  as  being  “responsible”  this  person  is  also  included  in  the  selection  list  for  the

“persons in charge”. Such selection lists are integrated in different detail applications. The list of parties

responsible is mainly used in complaint management and when measures are created.

Integration

“External persons” is a global catalog used in many QM applications. The list below shows some of the

applications referring to this catalog.

  Customers

REK-EVA_81.docx

Version: 1.1.2405

Page 64 of 84

Complaint Management

  Manufacturers

  Suppliers

  Departments

  Measures

  Complaint management

Prerequisite

There are no special requirements.

Selection criteria

The  last  name,  first  name as  well  as  the  initial  may  be  used  as  filter  criteria  in  addition  to  the  personal

number.

Using the filter field “inactive”, active or inactive persons can be selected.

Field descriptions

The fields are self-explanatory and not described in more detail for this reason.

REK-EVA_81.docx

Version: 1.1.2405

Page 65 of 84

Editing functions

This dialog opens for editing of a data record.

Complaint Management

Toolbar

There are no other special function buttons besides the standard functions.

REK-EVA_81.docx

Version: 1.1.2405

Page 66 of 84

Complaint Management

18 Complaint Management

Overview

Menu

Quality management  Complaint management  Complaint management

Transaction code

cm

Function authorization

cm

Utilization

This  function  allows  for  different  types  of  complaints  to  be  created.  The  types  “customer  complaint”,

“supplier  complaint”  and  “internal  complaint”  are  provided  by  default.  The  complaint  header  should  only

include data that are not directly related to the item complained about. Details relating to the article/item

are to be defined within the subordinate complaint details.

Integration

This application provides data for the following reports/evaluations:

  Failure analysis of complaints,

  Complaint analysis,

REK-EVA_81.docx

Version: 1.1.2405

Page 67 of 84

Complaint Management

  Analysis of complaint costs and

  Measure tracking.

Different master data are used if a complaint is created, e.g.





customers for a customer complaint,

failures for the failure analysis

  measures for defining measures,





costs for costs recording and

inspection requirements for the assignment of a referenced inspection step.

Prerequisite

Relevant master data need to be edited/maintained to be able to create complaints. Which master data

have to be maintained depends on the respective field of application. Normally, the master data

  Articles/items,

  Defects,

  Measures,

  Costs,

  Companies

  Departments and

  Staff

have to be maintained first.

Selection criteria

The sections that follow describe the selection criteria that are not self-explanatory.

Complaint tab

Complaint

The complaint number assigned manually or automatically may be filtered here.

Ext. complaint number

If  the  customer/supplier  uses  another  complaint  number  than  the  number  that  is  created  for  this

complaint, it will be defined in the "ext. complaint number" field. This field may be filtered.

Complaining party tab

REK-EVA_81.docx

Version: 1.1.2405

Page 68 of 84

Complaint Management

Complaining party type

The  types  "supplier",  "customer",  "department"  and  "person"  may  be  selected.  Subject  to  the

selected type, an entry may be selected in the "complaining party" field.

Complaining party

The  contents  of  the  party  in  charge  list  may  be  filtered.  Which  entry  is  transferred  to  the  list  of

responsible parties is defined within the master data.

Designation

The content of the field "name 1" of the list of responsible parties is filtered. This is the name of the

department  for  departments,  the  last  name  for  external  persons  and  the  company  name  for

companies.

Contact partners tab

Contact partner type

Different  types  may  be  selected.  An  entry  may  be  selected  in  the  "contact"  field,  subject  to  the

selected type.

Contact

The  contents  of  the  party  in  charge  list  may  be  filtered.  Which  entry  is  transferred  to  the  list  of

responsible parties is defined within the master data.

Designation

The  content  of  the  field  "name  1"  of  the  list  of  responsible  persons  may  be  filtered.  This  is  the

department name for departments, the last name for external persons and the company name for

companies.

Party in charge tab

Party in charge type

Different  types  may  be  selected.  An  entry  may  be  selected  in  the  "party  in  charge  type"  field,

subject to the selected type.

Party in charge type

The  contents  of  the  party  in  charge  list  may  be  filtered.  Which  entry  is  transferred  to  the  list  of

responsible parties is defined within the master data.

Designation

The  content  of  the  field  "name  1"  of  the  list  of  responsible  persons  may  be  filtered.  This  is  the

department name for departments, the last name for external persons and the company name for

companies.

REK-EVA_81.docx

Version: 1.1.2405

Page 69 of 84

Complaint Management

Field descriptions

Complaint tab

Area

Selection list of the configured areas

Complaint

In  case  a  complaint  number  has  not  been  assigned  manually,  it  will  be  assigned  automatically,

once  HYDRA  has  been  saved.  In  combination  with  the  area  HYDRA  creates  a  unique  complaint

number.

Type of complaint

Customer complaint, supplier complaint or internal complaint.

Ext. complaint number

If  the  customer/supplier  uses  another  complaint  number  than  the  number  that  is  created  for  this

complaint, it will be defined in the "ext. complaint number" field.

Received by

Once saved, the registered user is entered in this field.

Date of receipt/time

The current system date/time will be entered upon saving.

Status

List of configured complaint statuses

Result

List of configured complaint results

Target date, time

Information field if a corresponding specification is to be entered for dealing with the complaint.

Actual date/time

A  date/time  when  the  complaint  is  to  be  considered  as  "done"  may  be  entered  here.  The  actual

status is not checked in this context.

Complaining party type

Different types may be selected. The complaint type is not checked. The type "customer" should be

entered here if it is a customer complaint to be able to enter a customer as the complaining party.

REK-EVA_81.docx

Version: 1.1.2405

Page 70 of 84

Complaint Management

Complaining party

The  contents  of  the  party  in  charge  list  may  be  filtered.  Which  entry  is  transferred  to  the  list  of

responsible parties is defined within the master data. The selected entry is used as the complaining

party.

Complaining party name 1, name 2, name 3

The contents  of the fields  name 1, name 2  and name 3  of the complaining party  are shown. The

customer name and the content of the address fields 1 and 2 are displayed for customers. The last

name, first name and initials are displayed for external persons.

Contact partner type

Different types may be selected.

Contact

The  list  of  responsible  parties  is  displayed.  Which  entry  is  transferred  to  the  list  of  responsible

parties is defined within master data. The selected entry is used as the contact.

Contact name 1, name 2, name 3

The  contents  of  the  fields  name  1,  name  2  and  name  3  of  the  contact  are  shown.  The  customer

name  and  the  content  of  the  address  fields  1  and  2  are  displayed  for  customers.  The  last  name,

first name and initials are displayed for external persons.

Party in charge type

Different types may be selected. This field does not have a special function, i.e. it depends on the

corresponding  application  specifying  who  is  to  be  entered  as  the  responsible  party.  Normally,  the

person  selected  here  is  generally  responsible  for  the  entire  complaint.  However,  this  is  not

monitored by special functions.

Party in charge

The  list  of  responsible  parties  is  displayed.  Which  entry  is  transferred  to  the  list  of  responsible

parties is defined within master data. The selected entry is used as the responsible party.

Party in charge name 1, name 2, name 3

The  contents  of  the  fields  name  1,  name  2  and  name  3  of  the  responsible  party  are  shown.  The

customer name and the content of the address fields 1 and 2 are displayed for customers. The last

name, first name and initials are displayed for external persons.

Additional data tab

Cost center

Information field to specify a cost center

Delivery note

Information  field  to  state  a  delivery  note  number.  This  field  is  not  checked  against  the  previously

selected complaint type (e.g. supplier complaint).

REK-EVA_81.docx

Version: 1.1.2405

Page 71 of 84

Complaint Management

Delivery date

Information field to state a  delivery  date. This field  is  not checked against the previously selected

complaint type (e.g. supplier complaint).

Storage location

Information field to specify a storage location.

Toolbar

 Copy a complaint header

Function authorization: cm.insert

The copy function opens the selected complaint and also allows for the key fields to be changed.

But only the complaint header is copied upon saving. The complaint details, i.e. documents,

measures, costs and failure analyses that might pertain to the "copy template" are not copied.

 Referencing of complaints

Function authorization: none

A list/application is opened that references complaints (e.g. did a supplier complaint result from a

customer complaint) or shows complaints that have already been referenced.

 Calling the workflow history

Function authorization: cmwf.edit

Opens the graphic view of the referenced workflow for the complaint header. The graphic states the

current processing status. In addition to the graphic, the list also shows every action pertaining to

the workflow.

Detail application “complaint detail"

Function authorization

cmd

REK-EVA_81.docx

Version: 1.1.2405

Page 72 of 84

Complaint Management

All  pieces  of  information  that  are  directly  connected  to  the  item/material  complained  about  should  be

defined within the complaint details, as the item complained about is only assigned at this point.

This  allows  for  "collective  complaints"  to  be  recorded.  Consequently,  a  customer  can  complain  about

different items/articles e.g. using one complaint number. A complaint detail may be created and analyzed

separately  for  the  complaint  header  of  each  article/item  complained  about.  It  is  also  possible  to  create

several  complaint  details  for  one  article/item. This  is required,  for  example,  if  different  batches,  etc.  are

complained about and need to be analyzed separately.

The  field  "complaint"  is  assigned  to  the  complaint  number  of  the  currently  selected  complaint,  when

editing  or  creating  new  complaint  details.  The  numeric  value  of  the  "detail"  field  is  generated

automatically, once this new data record has been saved and cannot be changed anymore.

Field descriptions

"Details" tab

Complaint

Shows the complaint number of the superordinate complaint.

Detail no.

The  complaint  detail  number  is  shown  here  when  editing.  This  field  is  empty  when  a  new  data

record  is  created  and  is  assigned  automatically  to  a  complaint  number  that  is  unique  within  this

complaint upon saving.

REK-EVA_81.docx

Version: 1.1.2405

Page 73 of 84

Complaint Management

Article number, article designation, drawing issue number

The selection list of article master data may be opened from which an article/item can be selected

to specify the article/item complained about. The corresponding article designation is shown within

the  complaint  details.  Instead  of  selecting  the  article,  the  article  number  as  well  as  drawing  issue

number  may  also  directly  be  entered.  In  this  case,  the  article  designation  is  determined  from  the

master data catalog and displayed upon saving.

Supplier no.

Direct input of the supplier number or selection by opening the supplier catalog. The supplier name

is also displayed after saving.

Purchase order number

Information  field  to  enter  a  purchase  order  number.  This  field  input  does  not  depend  on  the

selected complaint type.

Serial number

Information field to enter a serial number.

Batch

Information field to enter a batch.

Status

Selects/shows the complaint detail status

Result

Selects/shows the result of the complaint detail

Party in charge type

Different types may be selected when inputting data. This field does not have a special function, i.e.

it  depends  on  the  corresponding  application  specifying  who  is  to  be  entered  as  the  responsible

party. Normally, the person selected here is generally responsible for dealing with the complaint in

more detail,  i.e. provision  of information about  the article/item complained about. However, this  is

not monitored by special functions.

Party in charge

The  list  of  responsible  parties  or  the  assigned  parties  in  charge  are  displayed.  Which  entry  is

transferred to the list of responsible parties is defined within master data. The selected entry is used

as the responsible party.

Party in charge name 1, name 2, name 3

The  contents  of  the  fields  name  1,  name  2  and  name  3  of  the  responsible  party  are  shown.  The

customer name and the content of the address fields 1 and 2 are displayed for customers. The last

name, first name and initials are displayed for external persons.

REK-EVA_81.docx

Version: 1.1.2405

Page 74 of 84

Complaint Management

Team

A  team  may  be  entered  or  selected.  Teams  are  defined  within  master  data.  After  saving,  the

designation is displayed in addition to the team number.

Additional data tab

Delivery value

Information field to enter/display a delivery value. This field is available irrespective of the complaint

type.

Complaint value

Information field to enter/show the complaint value.

Delivery quantity

Information  field  to  enter/display  a  delivery  quantity.  This  field  is  available  irrespective  of  the

complaint type.

Complaint quantity

Information field to enter/show the quantity specified in the complaint.

Share of the complaint

Information  field  to  enter/show  the  proportion  of  the  complaint.  The  content  of  this  field  is  not

calculated automatically.

Checked quantity

Information  field  to  enter/show  the  checked  quantity.  The  customer  has  to  decide  whether  this

refers to the quantity checked by the customer or by the complaining party.

Defective quantity

Information field to enter/show the faulty quantity. The customer has to decide whether this refers to

the defective quantity identified by the customer or by the complaining party.

Share of defects

Information  field  to  enter/show  the  share  of  defects.  The  content  of  this  field  is  not  calculated

automatically.

Inspection requirement 1

Shows  the  assigned  inspection  requirement  or  provides  the  option  to  choose  an  inspection

requirement  from  the  list  of  inspection  requirements.  The  selection  list  provides  all  inspection

requirements from all sectors. The inspection requirement number is displayed in this field, once an

inspection requirement has been taken over. In addition to this, the corresponding sector is shown,

e.g. "E" for goods receipt or "F" for production.

REK-EVA_81.docx

Version: 1.1.2405

Page 75 of 84

Complaint Management

Inspection requirement 2

Shows the second inspection requirement assigned or provides the option to choose an inspection

requirement  from  the  list  of  inspection  requirements.  The  selection  list  provides  all  inspection

requirements from all sectors. The inspection requirement number is displayed in this field, once an

inspection requirement has been taken over. In addition to this, the corresponding sector is shown,

e.g. "E" for goods receipt or "F" for production.

Toolbar

 Calling the workflow history

Function authorization: cmdwf.edit

Opens the graphic view of the workflow referenced for the complaint detail. The graphic states the

current processing status. In addition to the graphic, a list also shows every action pertaining to the

workflow.

Detail application "measures in the complaint header and complaint details

as well as in the failure analysis"

Function authorization

cmme for measures in the complaint header

cmdme for measures in the complaint detail

cmdfa for measures in the failure analysis

REK-EVA_81.docx

Version: 1.1.2405

Page 76 of 84

Complaint Management

A list of assigned measures is available for each selected complaint or complaint detail. Further measures

may  be  added  or  existing  measures  may  be  changed,  complemented  or  deleted  at  any  time.  The

measures created here are also included in the "measures tracking" application where they may also be

edited.

When a new data record is created, a "measure" needs to be indicated to be able to save the data record.

In  addition  to  the  field  "measure",  it  is  also  possible  to  open  the  "measures"  master  data  catalog  from

which a measure may be chosen and assigned. As an alternative to selecting measures, measures may

also be entered directly.

The  statuses  "open",  "read",  "in  process"  and  "completed"  are  provided  by  default.  In  addition  to  the

measure  type  "no  assignment",  the  types  "short-term",  "medium-term"  and  "long-term"  may  also  be

selected. These statuses can be enhanced according to the customer's requirements by customizing the

system.

Subject  to  the  selected  "party  in  charge  type",  the  pre-filtered  list  of  responsible  parties  is  opened  by

clicking  the  magnifying  glasses  button.  Entries  that  have  been  assigned  the  flag  "responsible"  in  the

relevant master data are shown only. The list of the types that may be selected matches the types that

have already been defined for the complaint header.

It is important to specify a target date. Based on this information, corresponding filters can be set in the

measures tracking function.

The fields "fulfillment" and "effectiveness" have been designed to finally "assess" the defined measure.

REK-EVA_81.docx

Version: 1.1.2405

Page 77 of 84

Complaint Management

Field descriptions

Measures tab

Measure type

The  available  measure  types  are  displayed  or  can  be  chosen.  The  types  "short-term",  "medium-

term", "long-term" and "no assignment" are provided by default.

Measure

The measure number is shown or can be selected or it may also be entered directly. The relevant

master data catalog can be opened for selection purposes.

Measure designation

The designation of the assigned measure number is shown. If the measure number is input directly,

the designation will only be shown upon saving.

Text

Free text field to enter a complementary measure text

Comment

Free text field to enter a complementary comment for the measure.

Detail tab

Status

Available measure types can be displayed or selected. The types "in process", "read", "done" and

"open" are provided by default.

Fulfillment [%]

Fulfillment in % can be displayed or entered.

Effectiveness [%]

Effectiveness in % can be displayed or entered.

External

This field can be used to control the printout of forms in future. However, it does not have a special

function.

Party in charge type

Different  types  may  be  selected  when  inputting  data.  The  type  "external  person"  is  used,  as

normally people are responsible for dealing with measures.

Party in charge

The party in charge is shown or it may be chosen from the list of responsible parties. Which entry is

transferred to the list of responsible parties is defined within master data. The selected entry is used

as the responsible party.

REK-EVA_81.docx

Version: 1.1.2405

Page 78 of 84

Complaint Management

Party in charge name 1, name 2, name 3

The  contents  of  the  fields  name  1,  name  2  and  name  3  of  the  responsible  party  are  shown.  The

customer name and the content of the address fields 1 and 2 are displayed for customers. The last

name, first name and initials are displayed for external persons.

Target date/time

A date and optionally a time by which the measure has to be finished may be displayed or entered.

It will not be monitored automatically, whether or not this time limit is kept. The content of this field

is  fundamental  to  the  "measures  tracking"  application,  as  it  may  be  determined  manually  for  all

measures (global) which of them have exceeded the target date, for example.

Actual date/time

A  date  and  optionally  a  time  specifying  when  the  measure  was  finished  may  be  displayed  or

entered.  However,  this  field  does  not  have  a  special  function.  In  the  "measures  tracking"

application,  this  field  can  be  used  to  determine  manually  which  measures  have  been  completed

with a delay.

Detail application "costs in the complaint header and complaint detail"

Function authorization

cmco for the costs in the complaint header

cmdco for the costs in the complaint detail

The list of assigned costs is available for each selected complaint or complaint detail. Further costs may

be  added  or  existing  costs  may  be  changed,  complemented  or  deleted  at  any  time.  The  costs  defined

here can be evaluated in the report "analysis of complaint costs".

When  a  new  data  record  is  created,  a  "cost  type"  needs  to  be  indicated  to  be  able  to  save  the  data

record.  In  addition  to  the  field  "cost  number",  it  is  also  possible  to  open  the  "cost  types"  master  data

catalog from which a cost type may be chosen and assigned. Costs may also be entered directly as an

alternative to them being selected.

REK-EVA_81.docx

Version: 1.1.2405

Page 79 of 84

Complaint Management

Provided that an initial duration ("init. duration" field) and an amount record ("cost rate amount" field) have

been assigned in the cost types catalog of the cost type, the field "duration" is assigned to the value from

"init. duration" and the field "amount" is assigned to the product from "init duration" and "cost rate amount"

in the dialog for complaint costs. If the field "duration" is changed or taken over unchanged as a part of

creating a new data record, the "amount" field will be recalculated automatically, once the "duration" field

has been saved. The amount is only calculated once as a part of initial data creation. The fields "duration"

and "amount" have to be changed manually if they need to be changed after the initial data creation. As

they are not recalculated automatically.

Field descriptions

Costs tab

Cost no.

The  cost  number  is  shown  or  can  be  selected  or  it  may  also  be  entered  directly.  The  relevant

master data catalog can be opened for selection purposes.

Cost designation

The  designation  of  the  assigned  cost  number  is  shown.  If  the  cost  number  is  directly  input  the

designation will only be shown upon saving.

Duration

The duration is entered or displayed in the format "hh:mm:ss". When transferring a cost type from

master data, this field is initially assigned to the master data field "init. duration".

Amount

The (calculated) amount is entered or displayed. When taking over a cost type  from master data,

this field is initially assigned to the master data field "init. amount". As a part of initial data creation,

the value of this field is calculated by multiplying the "duration" field with the original value entered

in this field upon saving.

Detail application "documents in the complaint header and complaint

details as well as in the failure analysis"

Function authorization

cm for documents in the complaint header

cmd for documents in the complaint details

cmdfa for documents in the failure analysis

REK-EVA_81.docx

Version: 1.1.2405

Page 80 of 84

Complaint Management

Provided that the "documents" tab has been enabled, as many documents as required may be assigned

to each complaint header, complaint detail and failure analysis. By enabling these tabs, the toolbar offers

corresponding  buttons  to  edit  the  documents.  The  documents  that  have  already  been  assigned  can  be

viewed in a list in the mentioned tab.

When  documents  are  assigned,  all  formats  registered  by  Windows  are  provided.  Consequently,  it  is

possible to assign simple documents (e.g. written in Word), drawings of any format and videos. However,

the  corresponding  programs  that  are  able  to  display  the  required  formats  have  to  be  installed.  In  this

context, the documents are opened by the program that has been linked in Windows.

The  file  types  "FILE",  "URL"  and  "Text"  are  provided.  The  file  name  including  path  may  be  entered

manually  with  the  "file"  type.  The  "URL"  file  type  allows  access  to  the  Internet  or  Intranet.  The  third  file

type "Text" allows for text to be entered directly.

A  designation  may  be  assigned  to  each  defined  document.  Once  saved,  a  consecutive  item  number

(numeric) is automatically assigned to each entered document. In addition to this, the "external" checkbox

specifies for the failure analysis whether or not the document is to be part of an 8D report. Finally, the 8D

report determines whether or not this field is to be filtered at all.

REK-EVA_81.docx

Version: 1.1.2405

Page 81 of 84

Complaint Management

Toolbar

In addition to the standard functions, there is also a button to show the documents.

 Show documents

If  a  document  link  is  defined,  this  button  opens  and  shows  this  document.  However,  a  program,

which  can  show  the  linked  file  type,  has  to  be  installed  on  the  PC.  HYDRA  paths  are  to  be

configured accordingly to open the documents.

Detail application "failure type" (failure analysis)

Function authorization

cmdfa for failure types in the failure analysis

As many failure types as required may be assigned to each complaint detail. A failure type needs to be

assigned to print out 8D reports. The list of failure types has to be opened to assign a failure type. The

required failure type can directly be entered or chosen from a master data catalog. If the failure number is

entered directly, the corresponding designation will only be shown after saving.

In addition to this, a comment may also be assigned.

The specified weighting affects failure analysis of complaint management. If the error occurs 10 times, i.e.

10 items are defective in this respect; the relevant value should be entered here.

Toolbar

In addition to the standard functions, the function for the printing of forms (8D report) is also available.

REK-EVA_81.docx

Version: 1.1.2405

Page 82 of 84

Complaint Management

 Show documents

Function authorization: cmdfa.print

This  function  opens  the  detail  application  "printing",  which  in  this  case  enables  printing  of  the  8D

report.  The  8D  report  only  includes  contents  referring  to  the  selected  failure  type  and  that  are

assigned to the "external" flag.

"Print" detail application

Function authorization

cmdfa.print for printing the failure analysis (8D report)

The print dialog of the failure type opens a list of available reports. By default, printing is restricted to the

8D report. These are Word forms. The potential content of these forms is determined by the Web services

that are available in the respective context. The form entries, i.e. the contents of the list of forms of the

corresponding print dialog, are defined within the master data of quality management. The basis for new

forms is established and the corresponding form properties are defined there. A corresponding license is

required to be able to change the forms with respect to content and design.

Print - toolbar

There are no other special function buttons in addition to the standard functions/features.

Detail applications "failure location", "failure cause", "causer" of the failure

type

Function authorization

cmdfa for failure locations, failure causes, causers in the failure analysis

As many failure locations, failure causes and causers as required may be assigned to every failure type.

Several tabs are displayed.

A  failure  type  has  to  be  selected  beforehand  to  be  able  to  perform  the  assignment.  Subject  to  the

selected tab, the relevant entry may be created using the toolbar.

The creation process corresponds to the functions described in the detail application "failure type" (failure

analysis).

Only data assigned to the flag "external" are printed in the 8D report.

Detail applications "measure" for the failure type

REK-EVA_81.docx

Version: 1.1.2405

Page 83 of 84

Complaint Management

Function authorization

cmdfa for measures in the failure analysis

As many measures as required may be assigned to each failure type.

A failure type has to be selected beforehand to enable assignment.

The creation of a measure corresponds to the functions described in the detail application "measures in

the complaint header and complaint detail as well as the failure analysis".

Only data assigned to the flag "external" are printed in the 8D report.

Detail application "documents of the failure type"

Function authorization

cmdfa for measures in the failure analysis

As many documents as required may be assigned to each failure type.

A failure type has to be selected beforehand to enable assignment.

The creation of a document corresponds to the functions described in the detail application "documents in

the  complaint  header  and  complaint  detail  as  well  as  the  failure  analysis".  In  addition  to  this,  an

assignment category may also be indicated. This is important to the 8D report. By default, the categories

"comment", "forecast", "control of success" and "no assignment" are available.

Only data assigned to the flag "external" are printed in the 8D report.

REK-EVA_81.docx

Version: 1.1.2405

Page 84 of 84


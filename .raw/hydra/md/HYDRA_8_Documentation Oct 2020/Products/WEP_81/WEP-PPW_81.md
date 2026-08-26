Manual

Goods Receipt Inspection
Planning
WEP-PPW 8.1

Version 1.0.1884

Last changed on: 19.06.2020

Goods Receipt Inspection Planning

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WEP-PPW_81.docx

Version: 1.0.2370

Page 2 of 156

Goods Receipt Inspection Planning

Contents

1  Goods Receipt Inspection Planning - Overview ........................................... 5

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

7  Specification List ........................................................................................ 39

8  Configuration of Workplaces and Resources ............................................. 47

9  Resource Families ..................................................................................... 79

10  Inspection Stations ..................................................................................... 83

WEP-PPW_81.docx

Version: 1.0.2370

Page 3 of 156

Goods Receipt Inspection Planning

11  Customers .................................................................................................. 85

12  Manufacturer .............................................................................................. 88

13  Suppliers .................................................................................................... 91

14  Failure Types ............................................................................................. 94

15  Failure Locations ........................................................................................ 97

16  Failure Causes ........................................................................................... 99

17  Causers .................................................................................................... 101

18  Measures ................................................................................................. 103

19  Analysis Selection .................................................................................... 105

20  Inspection Planning .................................................................................. 107

21  Inspection Requirements ......................................................................... 121

WEP-PPW_81.docx

Version: 1.0.2370

Page 4 of 156

Goods Receipt Inspection Planning

1  Goods Receipt Inspection Planning - Overview

Purpose

This  component  allows  creating  inspection  plans  based  on  master  data  defined  earlier  plus  generating

and managing inspection requirements which, in combination with the associated inspection steps, form

the basis for the collection of inspection data.

Implementation Considerations

Since  creating  inspection  plans  is  the  basis  for  later  collection  of  inspection  data,  this  component  is

required to collect measured values and attributive inspection decisions.

Integration

This component mainly serves the components:

  Quality data entry / info functions (AIP)

  Additional inspection planning / inspection steps

  Family inspection planning

  Reports of production control inspects and

  Failure mode analysis / action tracking

Features

The following functions are available:

  Maintenance  functions  to  collect  and  process  relevant  master  data  (article,  company,  failures,

actions, characteristics etc.)

  Maintenance functions to create and modify inspection plans

  Versioning inspection plans including managing historical data



Inspection plan release and activation using special rights

  Allocating  or  modifying  inspection  plan  characteristics  of  various  characteristic  types  (variable,

attributive)

  Assigning operations and inspection stations so as to structure the inspection steps on the basis

of the inspection plans.

  Defining of tolerance limits, unit, sampling scheme, control charts to be used, activating automatic

failure generation etc.

  Allocating  any  document  (drawings,  pictures,  videos  of  any  format  and  internal  notes)  to

characteristics,  inspection  plans,  inspection  plan  characteristics,  inspection  requirements  or

inspection step characteristics in a document list

WEP-PPW_81.docx

Version: 1.0.2370

Page 5 of 156

  Generating inspection requirements or steps based on inspection plans created earlier

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 6 of 156

3.2  Default Application Layout

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 7 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 8 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 9 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 10 of 156

Goods Receipt Inspection Planning

The  assigned  group  including  the  hierarchical  group  structure  then  appears  in  the  “groups”  field  of  the

editing dialog of articles.

When articles are displayed in a list, the group hierarchy is represented by the columns “group 1 to group

5”.

Groups  are  maintained  in  the  “article  groups”  application  and  are  described  in  the  document  entitled

“MOC_Groups.pdf “.

WEP-PPW_81.docx

Version: 1.0.2370

Page 11 of 156

Goods Receipt Inspection Planning

4  Summary

4.1  General notes on the document

This  document  describes  the  “Groups“,  e.g.  article  groups,  application  of  the  Manufacturing  Operation

Center (MOC). For general information on how to use MOC, please refer to the “moc_cc.pdf“ document.

WEP-PPW_81.docx

Version: 1.0.2370

Page 12 of 156

Goods Receipt Inspection Planning

5  Groups

The  group  catalogs  have  been  designed  to  create  and  edit  groups  for  the  different  applications.  The

created groups may be assigned to  master data of the corresponding  application. Consequently, article

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 13 of 156

5.2  Default Application Layout

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 14 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 15 of 156

Goods Receipt Inspection Planning

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

view, has to be assigned for this new group. To be able to save the new group, click above or below this

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 16 of 156

Goods Receipt Inspection Planning

The  "delete  selection"  function  cannot  be  used  in  the  maintenance  of  groups  dialog.  This  function  is

enabled,  for  example,  in  the  maintenance  of  articles  application  if  an  article  group  is  selected  and  this

selection is to be removed/deleted.

WEP-PPW_81.docx

Version: 1.0.2370

Page 17 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 18 of 156

Goods Receipt Inspection Planning

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

It is important that each detail defined here can be modified in the inspection plan or that details, which

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 19 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 20 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 21 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 22 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 23 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 24 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 25 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 26 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 27 of 156

Goods Receipt Inspection Planning

Editing functions

The below screenshot is one example for how an editing dialog could look like. The design and alignment

of fields may deviate from that of this screenshot.

Toolbar

There are no further specific function keys in addition to the standard features.

WEP-PPW_81.docx

Version: 1.0.2370

Page 28 of 156

"Documents" detail application

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 29 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 30 of 156

Sampling  scheme  k-value  inspection:  With  the  k  value  inspection  the  entered  k  value  is  checked

against the computed k value and if this value is violated the sample is rated "fail".

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 31 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 32 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 33 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 34 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 35 of 156

Goods Receipt Inspection Planning

The following syntax applies for the variables identifying the single values or statistic values of the order

characteristics involved [x:y:z].   The  x  parameter  identifies  the  statistic  value  to  be  used.  The  available

values are listed as follows. Please consider possible restrictions regarding the calculation level.

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 36 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 37 of 156

Goods Receipt Inspection Planning

Tool numbers, machine numbers or cavity numbers, etc. are not defined for the single values computed.

The  same  number  needs  to  be  assigned  to  all  source  samples  of  the  calculation  to  take  over  a

corresponding number (batch number, sample number, serial number, etc.). If there is no number that is

assigned  to  all  source  samples  a  number  will  not  be  assigned  to  the  calculated  sample.  Provided  that

several numbers are found that are  assigned to all source samples only the first number that has been

found  is  assigned  to  the  calculated  sample.  This  function  only  applies  to  numbers,  which  have  been

assigned on sample level.

WEP-PPW_81.docx

Version: 1.0.2370

Page 38 of 156

Goods Receipt Inspection Planning

7  Specification List

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 39 of 156

Goods Receipt Inspection Planning

Prerequisite

An  inspection  plan  for  the  article  group  including  corresponding  characteristics  referring  to  the

specification  list  has  to  exist  to  be  able  to  use  specification  lists  (configuration  within  inspection  plan

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 40 of 156

Goods Receipt Inspection Planning

Customer name

Supplier number

Supplier number can be selected from the company catalog

Supplier designation

Supplier name

Operation

Operation number

Workplace

Workstation, e.g. machine

Note: The definition of machine related specification list entries isn´t supported from the standard.

This field can be used for customer specific implementations.

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 41 of 156

Goods Receipt Inspection Planning

Version no.

Version number of the specification

Active

Checkbox. Shows whether the entry is active or inactive.

Workplace

Indicates the workplace.

Note:: The definition of machine related specification list entries isn´t supported from the standard.

This field can be used for customer specific implementation in order to define machine related

inspections for the same article. This might be required if e.g. machines of different types are used.

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

Number of pass inspections in a row

The  number  of  "pass"  inspections  in  a  row  that  is  required  for  the  characteristic  to  be  no  longer

required to be checked.

WEP-PPW_81.docx

Version: 1.0.2370

Page 42 of 156

No characteristic

Specifies  whether  this  characteristic  is  not  required  to  be  checked  for  the  combination  of  the

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 43 of 156

Goods Receipt Inspection Planning

"Chart 1/2" tab

 Go to

The  fields  included  in  the  "chart  1/2"  tab  correspond  to  those  of  the  characteristic master  data  and  are

described in the documentation MOC_CharacteristicsQm.

Default values chart 1/2

 Go to

The fields included in the "default values chart 1/2" tab correspond to those of the characteristic master

data and are described in the documentation MOC_CharacteristicsQm.

WEP-PPW_81.docx

Version: 1.0.2370

Page 44 of 156

Goods Receipt Inspection Planning

Editing functions

The following dialog opens to edit a data record:

Toolbar

The below-mentioned additional functions are available besides the standard functions.

  Activate

Function authorization: sclq.active

Activates a specification list entry. A previously released version is automatically deactivated.

WEP-PPW_81.docx

Version: 1.0.2370

Page 45 of 156

Goods Receipt Inspection Planning

 Deactivate

Function authorization: sclq.release

Deactivates a specification list entry. The specification list entry is no longer used.

WEP-PPW_81.docx

Version: 1.0.2370

Page 46 of 156

Goods Receipt Inspection Planning

8  Configuration of Workplaces and Resources

Summary

Menu

Master data  Resources  Resource configuration

Master data  Workplaces/ Machines  Workplace configuration

Transaction code

res

Function authorization  mdres

The resource configuration is the central function for resource management in MES.

Usage

The master data for both workplaces and machines as well as for other resources (tools, DNC resources,

etc.)  are  managed  here.  The  resources  are  roughly  classified  according  to  resource  type.  This  type  is

also connected  with corresponding functions and  applications that  open  other functional components of

the MES especially for the respective type.

Integration

This  application  can  be  used  to  view  the  resource  information  of  all  of  the  resource  types  present  in

HYDRA. However, the data record maintenance depends on the resource type. In this way, depending on

the resource type, not all fields can be maintained and not all resources can be created or deleted.

Based on the resource type, other applications are present in the MES that are specially  customized for

these types. For  example,  the  application package of machine data collection is based on resources of

type "Machine".

In  addition  to  the  resource  configuration,  the  resource  overview  application  is  present,  which  does  not

permit data maintenance, but does enable administration operations for daily handling of resources such

as the stock transfer of a resource.

Requirement

Before  a  workplace  or  machine  is  created,  a  year  model/  shift  calendar  must  be  created.  To  use  the

various  resource  types  in  a  meaningful  way,  the  advanced  licenses  for  these  types  must  also  be

available.

Selection criteria

The following selection criteria are available in the application:

WEP-PPW_81.docx

Version: 1.0.2370

Page 47 of 156

Goods Receipt Inspection Planning

Resource from ... to ...

This selection criterion refers to the resource. Wildcards (placeholders *) can be used.

Short designation

Short designation of resource. Only relevant for resources of type MNR.

Resource type

Type of resource.

Workplaces  and  machines  always  have  resource  type  MNR,  while  in  the  context  of  customizing

other resources can be given individual resource types. Predefined resource types include:

DNC

NC-/ DNC program

DOC

Document

ENE

Energy meter

ENT

Extraction device

ENT

Extraction device

MNR  Workplace/ Machine

PAC

Packaging, transportation container

PRM

Inspection and measuring equipment

PER

Production staff / general

PRU

Set up staff

TEM

Tempering equipment

VOR

Device

WNR

Tool

Using the predefined resource types is recommended.

The  detail  resource  information  is  adapted  depending  on  the  resource  selected  in  the

table overview.

Designation

Designation of the resource.

Group

Workplace/ Machine group of the resource. Only relevant for resources of type MNR.

Cost center

Cost center of resource.

Short name

Short name of the resource

WEP-PPW_81.docx

Version: 1.0.2370

Page 48 of 156

Goods Receipt Inspection Planning

Resource family

Family to which the resource is assigned.

Responsibility area

Responsibility area to which the resource is assigned.

Storage location

Master storage location of resource.

MD user fields

MD user fields 1- 6 of the resource. If a resource family is selected in the selection panel, the field

names are displayed based on the assigned user field definition.

Field descriptions

This detail application includes three main tabs:

-  Resource configuration

-  Resource list

-  Resource attributes

Main tab "resource configuration"

The configurations and master data of resources are defined here.

General tab

Resource type

Resource  type  of  the  resource. When  the  HYDRA  system  is  delivered,  some  resource  types  are

predefined. Further resource types can be created within the scope of HYDRA customizing.

Resource

The number of the resource or workplace to be entered is input in this field.

The maximum number of places of this number is as follows, depending on the resource type:

-  Resources of type MNR: maximum of 8 places

-  Resources of type <> MNR: maximum of 20 places

Permitted  characters  include  ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890/_.-+#.  Spaces

and  other  special  characters  are  not  allowed.  For  technical  reasons,  *  (asterisk)  and  %  (percent)

can be  input,  but  are nonetheless not  permitted  because they  are not  valid characters. When the

input field is exited, lower case letters are automatically transformed into CAPITAL LETTERS.

WEP-PPW_81.docx

Version: 1.0.2370

Page 49 of 156

Goods Receipt Inspection Planning

Notes regarding workplaces/ machines (resource type MNR):

For  technical  reasons,  for  resources  of  type  MNR  there  is  no  check  for  the  maximum  number  of

places.  For  this  reason  it  must  be  ensured  that  the  length  of  the  resource  number  (=  workplace/

machine number) has a maximum of 8 digits.

If the option "Numeric machine number" (HYDRA basic settings) is activated for use on DOS-based

terminals,  it  must  be  ensured  that  the  resource  number  (=  workplace/  machine  number)  includes

only  numerical  digits  and  that  the  length  of  the  number  is  exactly  8  places.  If  necessary,  when

creating the workplace/ machine, zeros must be added to the beginning of the number to extend it

to 8 digits.

Short designation

Short designation of resource. This field can only be used with workplaces/ machines (resources of

type MNR).

Designation

This  field  is  used  to  assign  a  short,  unique  designation  for  each  resource.  This  designation  is

displayed in reports and overviews and at the terminal and it is useful for orientation.

Responsibility area

Responsibility areas are used such that in various evaluations, the user is only shown the data to

which he/she has access according to his/her responsibility area authorization.

The  responsibility  area  can  also  remain  empty.  In  this  case,  the  resource  is  always  displayed

regardless of the user's assigned responsibility authorizations.

Cost center

The cost center to which the resource belongs is entered in this field.

Inventory number, engraving number, drawing number, manufacturer, owner

Additional information that functions as a comment.

Acquisition date, acquisition costs

Additional information that functions as a comment.

The currency is configured across the system in the HYDRA basic settings.

Storage location

Location at which the resource is stored when it is not being used (home storage location).

In connection with the material and production logistics (MPL), the material buffer specified in this

field is used during input batch logon for reposting the logged on input batch(es) from the previous

material buffer to this material buffer (upstream of the machine).

Delivery date, start-up date, guaranty date

Additional  information  that  functions  as  a  comment.  These  fields  are  only  available  with  the

licensing of the gage management.

WEP-PPW_81.docx

Version: 1.0.2370

Page 50 of 156

Goods Receipt Inspection Planning

External designation, resource type designation, usage, purchase order number

Additional  information  that  functions  as  a  comment.  These  fields  are  only  available  with  the

licensing of the gage management.

Supplier and party in charge including detail fields

Additional  information  that  functions  as  a  comment.  These  fields  are  only  available  with  the

licensing of the gage management.

Workplace configuration tab

This tab is only available if a resource of the type "MNR" is selected.

Workplace master data

Workplace category

N  Machine

P   Workplace

Definition as machine or workplace. As regards processing, both of these categories are identical if

only BDE or MDE and PDV are in use.

J   Machining center

The "Machining center" category and its functionality are described in detail in the BDE-BEA

product documentation.

L

Line (MDE-SFL only)

A   Aggregate (MDE-SFL only)

The categories "Aggregate" and "Line" and their functions are described in detail in the MDE-SFL

product documentation.

Q  CAQ inspection station

Workplace is defined purely as a CAQ inspection station without affecting the BDE or MDE

statistics.

R   Reel-based manufacturing (MPL-RF only)

S   Cutting unit (MPL-RF only)

The categories "Reel-based manufacturing" and "Cutting unit" and their functions are described in

detail in the MPL-RF product documentation.

D  Parallel output batches (MPL only, starting with MPL 7.2)

Parallel output batches can be produced on the machine for an operation with a batch management

requirement.

C  Packing station (MPL-PAL only, starting with MPL 7.2)

Specific posting functions are used on the machine for mapping a packing station. The functions

are described in detail in the MPL-PAL product documentation.

WEP-PPW_81.docx

Version: 1.0.2370

Page 51 of 156

M  Melting aggregate

This option defines a machine as melting aggregate in terms of composition.

Goods Receipt Inspection Planning

Workplace type

E  Single workplace

G  Group workplace

Please note

Terminals can be assigned to both group and single workplaces. However, in this case it must be

noted  that  the  terminal  is  set  to  operation  mode  "BDE"  or  the  option  Processing  is  set  to  "BDE

processing" when assigning workplaces to terminals.

External workplace

This field identifies external workplaces. Currently, it only functions as a comment.

Locked

If this identifier is set, the machine/ workplace has been (logically) deleted. The following

modifications are no longer permitted in this case:

- Order postings on the terminal

- Order posting on the console/MOC (e.g. using the Order overview function)

- Modifications in event maintenance

Furthermore, the machine/ workplace is no longer displayed in the Machine overview or in the

graphic planning board of the HYDRA shop floor scheduling module (HLS).

Company

This  field  is  used  to  differentiate  the  individual  machines/  workplaces.  Within  the  system,  it  also

functions as report/evaluation option to some extent.

Group

Assignment of the workplace/ machine to a logical group. In the context of the planning this has to

do with a capacity group in which the primary capacities are summarized.

If  a  new  workplace  is  created,  it  is  automatically  assigned  to  a  group  of  the  same  name  (menu

BDE: Master data > Workplaces/machines > Groups), which is defined as a capacity group. If there

is  no  capacity  group  yet,  then  it  is  automatically  created  and  then  the  workplace  is  automatically

assigned to it.

Category

The  category  of  the  machine  is  entered  here.  From  this  category,  a  validation  check  can  be

activated  according  to  the  customizing  configuration  BDE:  Master  data  >  Order  configuration  >

Order  types,  Plausibilities  tab,  option  "Check  for  specifications  in  backlog  of  orders"  (value

Category).

WEP-PPW_81.docx

Version: 1.0.2370

Page 52 of 156

Goods Receipt Inspection Planning

Year model

A valid year model must be entered here. During entry, times to be posted are compared with this

shift model. If no planned year model is stored in the HLS tab, this shift model is also used in the

HYDRA shop floor scheduling module (HLS).

Standard rate machine

The  arithmetical  standard  rate  of  machines  can  be  entered  here  for  calculations.  In  the  HYDRA

shop floor scheduling module (HLS) this value is used for some (evaluated) key figures.

Standard labor rate

The arithmetical standard labor rate can be entered here for calculations. In the HYDRA shop floor

scheduling (HLS) this value is used for the key figure "Evaluated labor utilization".

Performance level

The performance level of the workplace/ machine can be entered in percent in this field. This value

is  considered  in  the  HYDRA  shop  floor  planning  and  in  the  evaluation  of  material  requirements

when calculating the remaining run time.

Incentive wages indicator

Defines the type of calculating incentive wages. Mostly, this flag is used together with the incentive

wages  based  on  formulas  for  customer-specific  configurations.  In  addition,  the  "incentive  wage

indicator"  can  also  be  used  as  selection  criterion  for  the  determination  of  wage  types  within  the

incentive wage determination.

This field should be left empty if the incentive wages determination is not in use.

The incentive wages indicator G=group piecework has a special meaning. If the workplace/machine

has this flag, a premium group needs to be assigned every time an order is logged on . This can be

performed  either  by  the  "assignment  of  premium  groups"  option  of  the  incentive  wages

determination or, optionally, by an additional field in the terminal dialog for logging orders on. If no

assignment is available, the logon of the order will be rejected by issuing a validation error.

Therefore,  the  incentive  wage  indicator  G  =  Group  Piecework  may  only  be  assigned  if  the

group  premium  conditions  are  met  in  the  incentive  wages  determination,  as  otherwise

orders can no longer be logged on!

The  meaning  of  the  other  incentive  wages  indicators  is  specified  according  to  the  customer's

requirements while customizing the system.

File

It  is  possible  to  assign  a  graphic  to  every  machine/  workplace.  Among  other  uses,  the  graphic  is

displayed in the workplace overview or in the AIP. The following image formats are supported: jpg,

gif, tif, bmp, ico, emf, wmf.

WEP-PPW_81.docx

Version: 1.0.2370

Page 53 of 156

Goods Receipt Inspection Planning

In  the  path  configuration,  the  path  must  be  configured  using  the  PATH  identification

"MOCWPIMG"; the length of the file name for graphics files is limited to 12 places (8.3

notation). Note for Unix installations: Please use lower case letters only for file names.

Maximum capacity (KG)

If a machine is configured as melting aggregate, the maximum capacity in KG can be defined here.

Accuracy class, unit, etc.

  Information fields in order to describe the accuracy. These fields are only available if the license for

creating gages has been purchased.

Entry

Display 3rd list

A third list can be displayed/ activated in the basic screen on a Windows-based terminal (CTWIN /

AIP) using the options displayed here. Depending on the options set, users can switch between the

respective lists on the terminal. The following settings are possible. Note here that the display in the

lists depends on the module set:

 Input material (MPL): Logged on input materials/ batches are displayed.

 Resources (WRM): Logged on resources and tools are displayed.

 Staff (BDE): Logged on staff is displayed.

Output material (MPL): Produced output batches are displayed.

Show material/ PRT list when OP is logged on

This  option  is  only  relevant  in  connection  with WRM and  resources  logged  on  at Windows-based

terminals (CTWIN / AIP).

If this option is set, when an OP is logged on, a specific logon dialog is called. This dialog contains

a  component/  PRT  list  in  which  resources  are  displayed  that  meet  at  least  one  of  the  following

conditions:

- the identifier "Logon on terminal" is set on the resource type;

- the identifier "Log on with OP" is set to "Explicit logon"

- the resource is a so-called "required resource" (identifier on the resource).

Please note: As long as the workplace is relevant for MPL, material components are also displayed

in this list.

Sequencing list

This  option  is  used  to  define  which  operations  are  to  be  displayed  in  the  sequencing  list  on  the

terminal. The following settings are possible:

S

Basic  setting.  The  value  is  taken  from  the  option  of  the  same  name  in  the  HYDRA

basic settings.

WEP-PPW_81.docx

Version: 1.0.2370

Page 54 of 156

Goods Receipt Inspection Planning

M

Pool of workplaces. Only the operations planned at the workplace are displayed in the

sequencing list on the terminal.

G

Pool  of  workplaces  and  groups.  The  OPs  displayed  in  the  sequencing  list  on  the

terminal  are  those  that  are  either  planned  at  the  current  workplace  or  another

workplace in the group or are still located in the pool of groups.

K

Pool  of  workplaces  and  categories.  Only  those  operations  that  are  planned  at

workplaces of the category are displayed in the sequencing list on the terminal.

H

Group control. The OPs displayed in the sequencing list on the terminal are those that

are either planned at the current workplace or another workplace in the group.

Number of OPs in sequencing list

The maximum number of OPs that are to be displayed in the sequencing list on the terminal can be

stored here.

Compulsory sequence

This option can be used to specify whether or not logging the OPs on in the planned sequence is

compulsory. The following parameters are permitted:

N

J

Disabled

Enabled/active

If the parameter is enabled when the OP is logged on a check is made as to whether or not there is

an OP in the order pool for this machine/ workplace that is planned for the same time or previous to

this OP in the sequence, but was not yet started (i.e. status  = V/prepared). If yes, the OP logon will

be rejected.

Please  note:  If  the  planning  in  HYDRA  is  done  using  order  sequencing  (menu  ADE:  Planning  >

Order  sequencing),  a  configuration  of  the  sequencing  list  that  is  not  equal  to  "M"  (pool  of

workplaces)  and  an  active  compulsory  sequence  can  result  in  a  combination  that  does  not  make

sense.

Dialog control

To meet this requirement, a dialog control that deviates from the standard behavior can be defined

at the workplace in the dynamic dialog configuration on the Windows-based terminal (CTWIN / AIP)

and then a corresponding reference can be made to it in the dialog.

This configuration is only relevant and can only be used in the context of the HYDRA customizing.

Otherwise it has no significance.

Logon of several OPs

If several different operations are to be processed on the machine, this identifier must be selected.

Otherwise HYDRA only allows one order/ operation to be logged onto the machine.

Possible values:

WEP-PPW_81.docx

Version: 1.0.2370

Page 55 of 156

Goods Receipt Inspection Planning

J

As many OPs as desired can be logged on at the same time.

Please  note:  On  a  machine  to  which  a  terminal  with  operation  mode  MDE  is

assigned, a maximum of 20 operations can  be  logged on  at the same time. If

more than 20 operations must be logged on at the same time, this limitation can

be removed after a review by MPDV.

N

Only 1 OP can be logged on

1...9

A maximum of n OPs can be logged on

Posting

Quantity posting to person

If selected, this function is used to post the quantity of order interruptions/ logoffs to the person who

is logged on for the longest period.

Detailed information about quantity posting to persons can be found here.

Posting on OPs that are not logged on

If selected, a partial confirmation/upload, interruption or logoff for an OP can be performed on this

machine, even without a previous logon.

Posting the machine time in connection with operations logged on at the same time

If  set,  the  machine  time  for  OPs  logged  on  at  the  same  time  is  posted  as  a  proportion  on  the

operations and persons:

J

N

V

Z

Proportionate posting on OP and person acc. to the number of OPs

No proportionate posting. If the option is not set, every  operation receives the
complete machine time.

According to the default quantity of the OPs. Here it must be ensured that the
default quantity (target quantities in primary quantity unit) in the operation > 0.

According  to  the  standard  time  of  the  OPs  (available  starting  with  ADE  7.3).
Here it must be ensured that the standard time (processing time) in the

operation > 0.

Please note:

This  option  is  also  evaluated  for  group  workplaces;  in  general,  the  option  should  not  be  set  for

them.

Automatic logoff of personnel when shift ends

This identifier is only relevant if an "X" is set for the identifier of the same name on the order type.

The  configuration  is  carried  out  by  MPDV  while  customizing  the  system.  Otherwise  it  has  no

significance.

WEP-PPW_81.docx

Version: 1.0.2370

Page 56 of 156

Goods Receipt Inspection Planning

This  identifier  is  used  for  the  more  detailed  configuration  of  the  personal  data  collection  at  MDE

workplaces.  Because  fully  automatic  shift  ends  are  generated  by  the  terminals  when  using  the

HYDRA MDE, a setting can be made here regarding whether the people logged onto the workplace

are automatically logged off at the end of the shift or if they remain logged on.

J

N

X

Always log off staff when shift ends

Always save staff when shift ends except for manual logoffs

Evaluate  the  person's  settings.  Now  the  person  will  be  searched  for  the

corresponding setting

Automatic OP posting when shift ends

This configuration is only relevant in the context of the HYDRA customizing by MPDV and can only

be used then. Otherwise it has no significance!

This identifier is only relevant if an "X" is set for the identifier of the same name on the order type.

Interrupt and log on again at beginning of shift

Interrupt

J

N

MPL

Further  information  about  the  HYDRA  module  MPL  can  be  found  in  the  corresponding  MPL

documentation.

Batch management

Activates the entry of the batch number for this machine within the posting dialogs on the terminal.

Possible values are:

N

L

D

J

No batch processing

Batch tracing (input/ output batches) in the context of HYDRA MPL/MPL-RF

Throughput batch processing in the context of HYDRA MPL/MPL-RF

BDE batch management

The following functions are only available in connection with the Material and production logistics

module and are supported only on the Windows-based terminals (CTWIN / AIP).

Preceding material buffer

Irrelevant.

Subsequent material buffer

If a material buffer is specified in this field, the field  Target buffer in each of the entry dialogs (e.g.

output batch change, log operation off) is automatically populated with this value.

If  no  material  buffer  was  entered  in  the  entry  dialog  (e.g.  deleted  from  the  input  field),  the  output

batch is automatically posted to this material buffer.

WEP-PPW_81.docx

Version: 1.0.2370

Page 57 of 156

Goods Receipt Inspection Planning

Automatic generation of batch number

If  this  identifier  is  set,  a  batch  number  is  automatically  generated  for  the  output  batch  to  be

produced.  Otherwise  during  the  operation  logon  or  output  batch  change,  the  input  of  the  batch

number of the new output batch to be produced is expected.

Please  note:  If,  in  the  field  Batch  management  the  setting  D  (=  Throughput  batch  recording)  is

activated,  the  value  for  Automatic  generation  of  batch  number  is  automatically  set  to  "J".  In  this

case, manual entry of the batch number is not possible.

  Consumption balance

During the OP logoff, an  additional dialog (V_BLZ)  is opened displaying the material components

and their consumption quantities in relation to the current OP logon. In this dialog, the operator has

the  option  to  log  off  input  batches  that  are  still  running.  The  option  is  only  enabled,  once  the

consumption balance has been activated for the material type of the output material.

Generate transport order for output batches

This option creates a transport order relating to batches for a generated output batch. The transport

is  started  from  the  material  buffer  in  which  the  output  batch  is  produced.  The  option  set  here  is

overridden by the configuration of the relevant option within the material type.

Generate transport order for input material

This  option  creates  an  article-related  transport  order  relating  to  a  material  component,  when  an

operation  is  planned  for  a  machine  using  the  shop  floor  scheduling  module.  Transportation  is

started from the output material buffer of the preceding operation. The option set here is overridden

by the configuration of the relevant option within the material type.

HLS

Further  information  about  the  HYDRA  module  HLS  can  be  found  in  the  corresponding  HLS

documentation.

Planning function

This  identifier  specifies  whether  or  not  a  workplace  or  a  machine  will  be  displayed  and  if  so,  in

which MOC planning function.

P

Planning in the graphic planning board of the HYDRA shop floor scheduling (HLS) or in
the graphic order sequencing (GAV), i.e. the workplace is planned using the HLS or the
graphic order sequencing and for this reason it is visible there, but not in the order
sequencing table (AVG).

Please note: Whether or not a workplace is displayed in the HLS or the graphic order
sequencing depends on other settings as well:
- Assignment to a group identified as a "capacity group"
- Responsibility area authorization for this workplace
- Planning profile

WEP-PPW_81.docx

Version: 1.0.2370

Page 58 of 156

Goods Receipt Inspection Planning

H

Only relevant when using the HYDRA shop floor scheduling module (HLS).

Same  as  P.  Furthermore,  the  workplace  is  also  considered  in  the  automatic  (server-
based)  planning.  The  activation  of  the  automatic  (server-based)  planning  can  only  be
performed while customizing HYDRA.

The  workplace  is  only  considered  in  automatic,  server-based  planning;  in  the  graphic
planning  board  the  workplace  is  not  displayed.  The  activation  of  the  automatic  (server-
based) planning can only be performed while customizing HYDRA.

Planning  in  the  order  sequencing  table  (AVG),  i.e.  the  workplace  is  planned  using  the
AVG module.

No planning; the workplace is displayed in neither the order sequencing AVG table nor in
the graphic order sequencing nor in the HLS module.

T

A

N

Planned year model

A  special  year  model  used  only  for  planning  in  the  HYDRA  shop  floor  planning  (HLS)  can  be

entered  here.  It  does  not  affect  entry  and  posting  in  the  ADE/MDE  module.  If  no  planned  year

model is defined, then the BDE year model (Master data tab) is used for the planning.

Availability

The  available  capacity  of  a  workplace/machine  can  be  defined  here.  The  default  value  for  the

available capacity is 1000 [per mill].

In  the  HYDRA  shop  floor  scheduling,  the  capacity  check  and  automatic  assignment  assume  that

each operation has a capacity requirement of 1000 [per mill], i.e. only one order/ operation can run

on the workplace/machine at a time. In case of a manual multiple assignment, a dialog informs the

user about the double assignment; automatic assignment always assumes a single assignment.

This setting can be used to extend the availability of the workplace such that a multiple assignment

is  permitted.  If  the  workplace  capacity  allows,  for  example,  processing  of  two  operations  at  the

same time, the available capacity should be set to 2000 [per mill] in this field.

If  nothing  is  entered  in  this  field  or  if  the  value  0  is  entered,  the  system  interprets  this  as  the

standard value of 1000 [per mill].

Utilization  of this function  is subject to the corresponding license and requires further customizing

services by MPDV, depending on the relevant field of application.

Quantities tab

This tab is only available if a resource of the type "MNR" is selected.

Conversion factors to basic quantity

At the machine or  workplace, the  quantities can be collected  in  various quantity types and accounts.  In

general, the following quantity accounts are supported:

Yield

WEP-PPW_81.docx

Version: 1.0.2370

Page 59 of 156

Goods Receipt Inspection Planning

Scrap

Rework (Windows terminal CTWIN/AIP only)

Open quantity (problem quantity; Windows terminal CTWIN/AIP only)

The following quantity types are supported for each quantity account:

Primary quantity

Secondary quantity (Windows terminal CTWIN/AIP only)

Tertiary quantity (Windows terminal CTWIN/AIP only)

Basic quantity (Windows terminal CTWIN/AIP only)

The  actual  use  of  several  quantity  types  or  accounts  depends  on  the  system  design.  For  example,  for

manual  entry  of  rework  quantity,  a  corresponding  input  field  must  be  configured  in  the  entry  dialog  (by

customizing).

Automatic quantities can only be entered in the "primary quantity" unit.

Quantity units and conversion factors for base quantity

A quantity unit is defined for each quantity type. The alternative quantity accounts can be entered directly

(manually). If this is the case, automatic conversion is not carried out.

If the alternative quantity accounts are not entered manually, a conversion into the alternative accounts is

carried  out  on  the  server  based  on  the  conversion  factors  or  the  units  configured  in  the  MOC  machine

master data.

Basis for HYDRA-MDE quantity conversion

The basis that will be used for quantity conversion is set here.

A

Use the conversion factors of the OP that is logged on. If no operation is logged on,

the quantity conversion from the machine/workplace configuration is used.

M

Use conversion factors from the workplace configuration for quantity conversion.

Units and conversion factors for base quantity (P)

Quantity unit (P)

Indicate  the  quantity  unit  in  which  the  entry  at  this  machine/  workplace  is  primarily  carried  out.  In

case of automatic entry of quantities, these quantities are generally viewed as primary quantities.

WEP-PPW_81.docx

Version: 1.0.2370

Page 60 of 156

Goods Receipt Inspection Planning

If  an  automatic  quantity  conversion  into  another  quantity  type  is  to  be  carried  out,  indicate  the

conversion factors to basic quantity here.

Units and conversion factors for base quantity (S)

Quantity unit (S)

Here  indicate  the  secondary  quantity  unit  in  which  quantities  are  to  be  posted  to  the  workplace/

machine. If an automatic quantity conversion is to be carried out, indicate the conversion factors to

basic quantity here.

Units and conversion factors for base quantity (T)

Quantity unit (T)

Here  indicate  the  tertiary  quantity  unit  in  which  quantities  are  to  be  posted  to  the  workplace/

machine. If an automatic quantity conversion is to be carried out, indicate the conversion factors to

basic quantity here.

Units and conversion factors for base quantity

Quantity unit (B)

Here indicate the base quantity unit in which quantities are to be posted to the workplace/ machine.

Manual entry of quantities, yield

Manual entry of yield

This option should be set if quantities are to be entered manually, if allocation with another quantity

account is to be implemented or if the manual quantities are to be posted as cycles.

On Windows-based  terminals  this  option  does  not  affect  the  quantity  fields  displayed  in  the  entry

dialogs; modifications to these quantity fields are to be made using dialog configurations (terminal

configuration or customizing of the dynamic dialogs).

Allocation of yield

Requirement: The option "Manual entry" must be set.

Using this option, manually entered quantities can be offset against other quantity accounts. In this

case,  the  quantity  entered  is  deducted  from  the  account  with  which  the  allocation  is  to  be

implemented.

Note here that negative values can also occur due to the respective quantity conversion.

Please note

This  option  may  NOT  be  set  for  DOS  terminals  if  yield  is  offset  against  scrap  or  scrap  is  offset

against yield in the counter configuration.

WEP-PPW_81.docx

Version: 1.0.2370

Page 61 of 156

Goods Receipt Inspection Planning

Posting of yield as cycles

Requirement: The option "Manual entry" must be set.

If this option is set, manually entered quantities are posted simultaneously as cycles. Note here that

the entered quantity is posted 1:1 as a cycle (partitioning is not considered).

Manual entry of quantities, scrap

Manual entry of scrap

This option should be set if quantities are to be entered manually, if allocation with another quantity

account is to be implemented or if the manual quantities are to be posted as cycles.

On Windows terminals this option does not affect the quantity fields displayed in the entry dialogs;

modifications  to  these  quantity  fields  are  to  be  made  using  dialog  configurations  (terminal

configuration or customizing of the dynamic dialogs).

Allocation of scrap

Requirement: The option "Manual entry" must be set.

Using this option, manually entered quantities can be offset against other quantity accounts. In this

case,  the  quantity  entered  is  deducted  from  the  account  with  which  the  allocation  is  to  be

implemented.

Note here that negative values can also occur due to the respective quantity conversion.

Please note

This  option  may  NOT  be  set  for  DOS  terminals  if  yield  is  offset  against  scrap  or  scrap  is  offset

against yield in the counter configuration.

Posting of scrap as cycles

Requirement: The option "Manual entry" must be set.

If this option is set, manually entered quantities are posted simultaneously as cycles. Note here that

the entered quantity is posted 1:1 as a cycle (partitioning is not considered).

Manual entry of quantities, rework

Manual entry of rework quantity

This option should be set if quantities are to be entered manually, if allocation with another quantity

account is to be implemented or if the manual quantities are to be posted as cycles.

On Windows terminals this option does not affect the quantity fields displayed in the entry dialogs;

modifications  to  these  quantity  fields  are  to  be  made  using  dialog  configurations  (terminal

configuration or customizing of the dynamic dialogs).

Allocation of rework

Requirement: The option "Manual entry" must be set.

WEP-PPW_81.docx

Version: 1.0.2370

Page 62 of 156

Goods Receipt Inspection Planning

Using this option, manually entered quantities can be offset against other quantity accounts. In this

case,  the  quantity  entered  is  deducted  from  the  account  with  which  the  allocation  is  to  be

implemented.

Note here that negative values can also occur due to the respective quantity conversion.

Please note

This  option  may  NOT  be  set  for  DOS  terminals  if  yield  is  offset  against  scrap  or  scrap  is  offset

against yield in the counter configuration.

Posting of the rework quantity as cycles

Requirement: The option "Manual entry" must be set.

If this option is set, manually entered quantities are posted simultaneously as cycles. Note here that

the entered quantity is posted 1:1 as a cycle (partitioning is not considered).

Manual entry of quantities, open quantity

Manual entry of open quantity

This option should be set if quantities are to be entered manually, if allocation with another quantity

account is to be implemented or if the manual quantities are to be posted as cycles.

On Windows terminals this option does not affect the quantity fields displayed in the entry dialogs;

modifications  to  these  quantity  fields  are  to  be  made  using  dialog  configurations  (terminal

configuration or customizing of the dynamic dialogs).

Allocation of open quantity

Requirement: The option "Manual entry" must be set.

Using this option, manually entered quantities can be offset against other quantity accounts. In this

case,  the  quantity  entered  is  deducted  from  the  account  with  which  the  allocation  is  to  be

implemented.

Note here that negative values can also occur due to the respective quantity conversion.

Please note

This  option  may  NOT  be  set  for  DOS  terminals  if  yield  is  offset  against  scrap  or  scrap  is  offset

against yield in the counter configuration.

Posting of open quantity as cycles

Requirement: The option "Manual entry" must be set.

If this option is set, manually entered quantities are posted simultaneously as cycles. Note here that

the entered quantity is posted 1:1 as a cycle (partitioning is not considered).

MDE configuration tab

This tab is only available if a resource of the type "MNR" is selected.

WEP-PPW_81.docx

Version: 1.0.2370

Page 63 of 156

Goods Receipt Inspection Planning

Monitoring

Monitoring type

The following types of monitoring can be selected:

Monitoring by operating signal

No monitoring

Cyclical monitoring

If  cyclical  or  operating  signal  monitoring  was  selected,  a  malfunction  can  only  be  entered  if  a

request is made using the terminal ("Assign malfunction"). If no automatic monitoring is specified,

a new machine status can be specified at any time.

In  cyclical  monitoring,  when  a  counting  pulse  occurs,  an  automatic  switch  is  made  into  the

"Production" status. If operating signal was selected and when the operating signal is set, a switch

is made into Production. If no automatic monitoring was selected, the "Production" status must be

assigned manually.

Entry of malfunction reason required with specified delay time in [s]

(Only with terminal type CT 73x, CT 83x, not with master terminal/DS-100)

If a downtime without a reason was recognized, after the specified delay time the input window for

"Change  machine  status"  opens  automatically  on  the  terminal.  If  the  terminal  goes  back  into

production, the window still remains open.

If  a  machine  status  is  input  now  (during  production),  this  input  activates  a  reposting  event  that

reposts  the  most  recently  recorded  status  from  "General  disturbance"  to  the  new  status  that  was

input. If the reposting is correct, the window closes; otherwise, it remains open.

However, if a downtime is recognized again (with or without a reason), the previously noted status

can no longer be reposted. The window closes automatically.

If another downtime without a reason is recognized and the delay time has expired, then the input

window opens as described above.

If a downtime without a reason is recognized and the machine switches into production before the

delay time expires, then the automatic request for a malfunction reason is not carried out.

Important note:

This  reposting  only  affects  the  HYDRA  machine  data  collection;  online  correction  of  the  resource

performance accounts of the currently running OP is not possible !

Note regarding data maintenance:

All machine status modifications are displayed in the tabular event maintenance of MOC. However,

the reposting event is locked and cannot be edited.

In  order  to  perform  recalculations  correctly  now  with  respect  to  orders  and  machines,  the  original

event with the status "NOT ASSIGNED" must be changed to the correct status.

The reposting event does not affect the recalculation!

WEP-PPW_81.docx

Version: 1.0.2370

Page 64 of 156

Goods Receipt Inspection Planning

Minimum malfunction duration

If the operating signal monitoring type was selected, the duration that a malfunction must last until

it is recognized and logged in as a malfunction is specified in seconds in this field.

Minimum cycle time

If cyclical monitoring was selected, a minimum cycle time can be specified in seconds in this field.

From  this  minimum  cycle  time  and  the  target  cycle  stored  in  the  (logged  in)  operation  and

compensated with the cycle extension, the terminal determines the maximum value and uses it as

the cycle time specification.

If  both  the  minimum  cycle  time  and  the  target  cycle  stored  in  the  operation  are  0,  the  cycle  time

specification is set to 60000 seconds [per 1000 machine cycles].

Cycle extension

If  cyclical  monitoring  was  selected,  the  percentage  for  extending  the  target  cycle  time  must  be

input here in a range from 0 to 5000.

The  target  cycle  stored  in  the  (logged  in)  operation  is  compensated  with  this  percentage.  In  this

way,  a  value  less  than  100  indicates  a  shortened  cycle;  a  value  greater  than  100  indicates  an

extended cycle.

Number of target cycles

If  cyclical  monitoring  was  selected,  here  the  number  of  cycles  (0  to  a  maximum  of  9)  can  be

indicated  according  to  which  the  terminal  automatically  switches  from  a  status  not  equal  to

production into production status within the cycle time (prerequisite: no production lock is currently

set in the status not equal to production).

With  some  production  processes,  there  are  machine  cycles  in  set  up  phases.  By  setting  a  value

greater  than  0,  the  current  machine  status  does  not  change  immediately.  Please  note:  Until  a

switch is made into production, the quantities entered in this case are neither posted to the yield nor

the scrap quantities.

Cycles to be evaluated

This entry should be populated with 0.

Note regarding data maintenance:

All  machine  status  modifications  are  displayed  in  the  event  maintenance  dialog.  However,  the

reposting event is locked and cannot be edited.

In  order  to  perform  recalculations  correctly  now  with  respect  to  orders  and  machines,  the  original

event with the status "NOT ASSIGNED" must be changed to the correct status.

The reposting event does not affect the recalculation!

WEP-PPW_81.docx

Version: 1.0.2370

Page 65 of 156

Goods Receipt Inspection Planning

Administration

Posting during prod. lock

This setting can be used to set the type of posting of the counting pulses collected during the so-

called production lock. This configuration takes effect with all counters configured as "Yield".

Posting as scrap

If the counting pulses were configured on the counter, they are offset against the partitioning/ pulse

factor and posted as scrap. However, any defined allocations with another quantity account are not

carried out in this case.

Posting as yield parts

Posting of the counting pulses as yield

No posting

No quantities are posted during the production lock.

Pulse factor specific to machines

The pulse factor is used, for example, if lengths (e.g. from a wheel) are to be collected.

For  machines  for  which  a  discrete  or  integral  number  of  quantities  (e.g.  pieces)  are  entered  per

pulse,  the  value  should  always  be  set  to  0.  In  this  case,  the  pulse  factor  is  not  used  for  the

evaluation. That means that the posting of the number of cycles corresponds with the actual pulses

transferred via the MSS (machine interface).

The signals transferred from the machine (counting pulses) are collected by the MSS. The quantity

is calculated and posted as follows according to the configured number of pulses:

Quantity for the machine = pulse * partitioning for the machine/ pulse factor for the machine

Quantity for the operation = pulse * partitioning for the operation/ pulse factor for the operation

Please note: The pulse factor will be evaluated as a fraction. In this way, in the quantity calculation

the pulse is included as a denominator while the partitioning is considered a numerator.

Pulses  that  occur  during  a malfunction  or  a  production  lock  (configuration  of  Posting  during  prod.

lock > scrap) are  interpreted as scrap. The scrap quantities are also calculated using the formula

given above.

Partitioning specific to machines

The partitioning specific to the machine is indicated here. This is included in the quantity calculation

in  a  multiplication  with  the  partitioning  entered  in  the  operation.  If  this  is  not  desired,  the  value  1

must be input here.

Extended weekend automatic

If  this  option  is  selected  and  with  the  corresponding  configuration  the  status  that  was  available

before status 999 was activated will be assigned at shift start.

WEP-PPW_81.docx

Version: 1.0.2370

Page 66 of 156

Goods Receipt Inspection Planning

Please note:

To set the option, the workplace must already be assigned to a terminal.

Detailed information about the automatic activation of status 999 can be found in the chapter  Day

types .

Wait. period short-term disturb.

To improve the overview, e.g. in machine history, a short-term malfunction status can be configured

per machine/ workplace. In the context of machine monitoring this status serves as a "container" for

any unconfirmed statuses that existed only for a certain (short) period of time.

If a downtime is automatically recognized on the terminal and the machine automatically goes back

into production, a check is made regarding whether or not this disturbance is shorter than the time

period configured here for short-term malfunctions.

If this is the case, the malfunction, which does not yet have a reason, is given the status (reason)

configured on the machine as the status for "short-term malfunctions".

Inputs/ outputs

Machine lock/ Target quantity reached/ Machine downtime/ Free I/O

The terminal outputs used for production statuses are indicated in these fields

Machine lock output

is set if the status "not assigned" occurs or a  status in which the

option "machine lock" is set.

Target quantity reached output  is set if the target quantity of the OP is reached.

Machine downtime output

is set if a status not equal to Production was recognized for the

machine.  When  changing

into  production,

the  output

is

immediately reset to 0.

Free I/O

Free input/ output for customer-specific customization.

These statuses can be used for connecting a monitoring light or a horn, for example.

The assignment of an output by entering the corresponding number in one of the fields specifies

which relay is interconnected by the terminal when the predefined status occurs. If "0" is entered,

no action occurs. Note that an output on a terminal may not be assigned more than once.

Please note

- The specification regarding the status in which the machine lock is to be set is carried out in the

context of the Status assignment.

- When the machine lock is activated using the available relay output of a DS 100, in general the

value "1" is to be entered in the input field. In this case, the machine lock is set if a correspondingly

configured status occurs and in the status not assigned.

WEP-PPW_81.docx

Version: 1.0.2370

Page 67 of 156

Output batch change

Customer-specific  assignment  of  an  input  with  an  automatic  output  batch  change  (MPL).  As  a

Goods Receipt Inspection Planning

default, the field should be left at 0.

PDE (Process Data Collection)

Collect process data

This parameter specifies whether or not process data are recorded for this machine. Process data

cannot be recorded for this machine if this parameter is not set at a machine.

External connection

External connection

If this machine is assigned to a master terminal, the following selection of connection options is

available:

Arburg control system  Arburg connection (only available if HYD-ALS is licensed)

Engel interfacing

Engel machine connection

No external device

No connection of an external device

DS100

MT3

PDE

DS100 connection

MT3 connection

Process data collection

If a DS100 or MT3 connection was activated, the device address field can be selected. If the option

Engel  interfacing  is  selected,  the  serial  number  field  can  be  selected.  The  option  Arburg  control

system enables the class field.

Note regarding the combination of connections on a master terminal:

"DS 100" and "No external device" allowed

"MT 3" and "No external device" allowed

"MT3" and "DS 100" not allowed!

Serial number (Engel interfacing)

The serial number of the connected Engel machine is entered  here. A prerequisite for using Engel

machines is the setting "EMS machine interface" in the HYDRA basic settings..

Device address

This field can be selected if a DS100 or MT3 connection was selected. The device address of the

sub-bus participant is entered here.

WEP-PPW_81.docx

Version: 1.0.2370

Page 68 of 156

Goods Receipt Inspection Planning

Resource configuration tab

Resource master data

Type

Identifier regarding the type of resource:

Resource:  A  resource  can  be  uniquely  identified  but  is  also  actually  present.  It  always  has  the

number 1.

Anonymous resource: An anonymous resource cannot be uniquely identified. If the identifier is set,

then  the  value  in  the  field  Number  can  be  changed  from  1  to  another  positive  integer  value.

Anonymous resources cannot be posted because the actual reference to precisely one resource is

not possible. Please note the information in the chapter Anonymous resources.

Required resource: A required resource is a substitute for one or more actual resources that can be

identified.  The  resources  that  a  required  resource  represents  are  specified  in  the  configuration

WRM: Master data > Required resources. The number results from the number of actual resources

assigned to it.

Please note: If this field is empty, the resource is implicitly an ("actual") resource.

Equal type

Reserved for future use.

Version

Modification number; the program version can be stored here for resources of type DNC.

Number

This  field  can  only  be  edited  if  it  contains  an  anonymous  resource  and  the  identifier  Anonymous

resource is set (see above). A value > 1 indicates how many of these resources are available.

This field is automatically calculated for required resources.

Resource family

Assignment  of  a  resource  family.  If  the  resource  family  is  subsequently  changed,  an  information

dialog appears as a warning because user fields can possibly be assigned with the resource family.

Target utilization

Cycles

The target cycles serve as additional information regarding how long the resource is to be used.

Runtime

The target runtime serves as additional information regarding how long the resource is to be used.

WEP-PPW_81.docx

Version: 1.0.2370

Page 69 of 156

Goods Receipt Inspection Planning

Configuration

Target cycle

Target duration in seconds for 1000 machine cycles if this tool is used.

Please note: The target cycle stored in the OP is relevant for the planning in the HLS module and

for the machine data collection.

Original partitioning

Partitioning of the tool (= multiplicity or number of cavities) when using this tool.

Current partitioning

Current partitioning of the tool. This partitioning can deviate from the original partitioning, e.g. if the

original quantity can no longer be produced with a cycle due to a tool defect.

The posting of cycles to the tool is always carried out based on the current partitioning.

Please note: The partitioning  stored in the OP is relevant for the planning in the HLS module and

for the machine data collection.

Partitioning due to cavities

Setting the flag "partitioning due to cavities" causes the system to (re-)calculate the fields "current

partitioning" and "original partitioning" using the assignments in cavity management. Then the fields

can no longer be changed manually.

Log on with OP

This  identifier  is  used  to  control  whether  or  not  the  resource  is  logged  on  if  it  is  assigned  as  a

component in the list of production resources and tools for the operation. Possible values are:

None:

The resource is not logged on.

Implicit:  The resource assigned to the operation as a production resource and tool is automatically

(implicitly) logged on with the operation; an explicit logon or change in logon status is not possible.

Explicit:  The resource assigned to the operation as a production resource and tool can be logged

on explicitly or another resource can be logged on instead. If the resource is not explicitly logged on

or  if  no  other  resource  is  explicitly  logged  on,  the  current  resource  is  implicitly  logged  on;  in  this

way, the current resource serves as a "default".

Please note:

If another resource is explicitly  logged on,  it  will be  logged  on for the resource that has the same

resource  type  in  the  list  of  production  resources  and  tools  of  the  operation.  For  this  reason,  an

explicit  resource  logon  is  only  possible  for  resources  that  are  included  in  the  list  of  production

resources and tools of the operation as a requirement. In this way, no resource can be logged on

for which there is no requirement (= entry) in the list of production resources and tools.

In general, this identifier should be inactive for resource type DNC  because  a specific processing

exists for it in the HYDRA module DNC (NC programs are logged on separately).

WEP-PPW_81.docx

Version: 1.0.2370

Page 70 of 156

Goods Receipt Inspection Planning

Resources that are defined in the BOM of the machine are also logged on.

Parallel logon/ planning possible

The tool can be logged on/ planned in parallel.

Caution:  A  resource  can  be  logged  on  multiple  times  to  only  one  machine.  Consequently,  the

identifier "Parallel logon possible" refers to several different OPs on one machine.

Post to resource

Indicates whether or not the quantities and  times are to be posted to the resource. Due to a high

degree of complexity, this identifier should only be provided for those resources that will actually be

evaluated later.

Planning

Setup time

Duration in hours for setting up the tool.

Please note: The setup time stored in the OP is relevant for the planning in the HLS module.

Retooling time (teardown)

Duration in hours for removing the tool.

Please note: The retooling time stored in the OP is relevant for the planning in the HLS module.

Assignment

No processing. The configuration option of the same name stored in the resource type is used for

taking the resource allocation in the HYDRA shop floor planning into consideration.

Evaluation

Consider in evaluations

Reserved for future use.

File

File exists

Shows  whether  or  not  the  file  is  stored  in  the  specified  path.  The  files  are  checked  by  a  cyclic

process and the corresponding flags are set subject to whether or not the file is available.

File name

File name; without file extension for DNC. The file extension is added based on the configuration in

the resource type. The defined paths specify the storage location.

WEP-PPW_81.docx

Version: 1.0.2370

Page 71 of 156

Goods Receipt Inspection Planning

Comparison resources

Two  comparison  resources  may  be  indicated  here  for  energy  consumption  resources.  They  will

then be shown in comparative evaluations/reports, e.g. the energy monitor.

Resource 1

Resource number of the resources to be compared

Resource type 1

Resource type of the resources to be compared

Resource 2

Resource number of the resources to be compared

Resource type 2

Resource type of the resources to be compared

Accuracy

More  detailed  information  on  measuring  accuracy  and  measuring  range  may  be  entered  here  for

test equipment resources.

User fields tab

User fields offer the possibility to store further customer-specific information to MES besides the available

fields in MOC standard. The tab provides eight sub tabs each of which providing eight user fields. The so

called user field key determines, which user fields are involved and which meaning they have.

Object type

User fields are configured for the relevant resource type, e.g. MNR for the workplace/machine.

User field key

Every user field key describes a combination of user fields. How the user field key is managed (and

thus the meaning of the fields) varies for the individual objects. User field keys are defined together

with the customer while customizing the system.

User fields

The following user fields are available after customizing the system:

Field data type

Date
Numeric,
time, duration
Decimal value
Text field, length 1
Text
length
field,
10

Number of
fields
6
16

6
16
6

WEP-PPW_81.docx

Version: 1.0.2370

Page 72 of 156

Goods Receipt Inspection Planning

Field data type

Number of
fields
14

field,

length

Text
20
Text
40
A maximum of 8 fields are shown for each page.

length

field,

2

User field keys are not defined by default in the system. The system has to be customized respectively in

order to be able to support this kind of user fields.

Comment tab

The Comment tab allows additional comments about the resource to be stored.

Main tab “resource attributes”

Additional resource attributes are shown using the user field definitions of the resource family. The

"resource attributes" button is used for editing.

Resource list main tab

Shows  the  resource  list  for  the  selected  resource.  By  clicking  the  "resource  list"  button  you  can

directly go to the BOM application for editing purposes.

Toolbar

General tab

 Insert

Opens the dialog for adding resource lists

 Copy

Opens the dialog for copying resource lists.

 Edit

Opens the dialog for editing resource lists.

 Delete

Deletes one or several resources.

WEP-PPW_81.docx

Version: 1.0.2370

Page 73 of 156

Goods Receipt Inspection Planning

Resource tab

 Configuration – resource status

Opens the "resource status" application

 File - show file

Shows  the  file  -  only  available  for  document  resources  configured  as  file-based  resource  without

DNC processing in the resource type and if the corresponding license and function authorizations

are available.

 Go to - resource list

Opens  the  "resource  list"  application.  The  selected  resource  is  entered  as  default  value  for  the

superior resource.

 Go to – required resources

Opens the "required resources" application. The selected resource is  entered as default  value for

the required resource.

 Go to – cavity assignment

Opens the "cavity assignment" application. The selected resource is entered as default value.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Functions – measures

Opens the "measures" application.

 Functions – status change

Opens the dialog for changing the resource status.

 Functions – release of resource

Opens the dialog for releasing a resource.

 Functions – stock transfer

Opens the dialog for transferring/relocating a resource

WEP-PPW_81.docx

Version: 1.0.2370

Page 74 of 156

Workplace tab

Goods Receipt Inspection Planning

 Configuration – status assignment

Opens the application "status assignment". The selected resource is taken over.

 Configuration – counter configuration

Opens the application "counter configuration". The selected resource is taken over.

 Configuration – terminal assignment

Opens the application "terminal assignment". The selected resource is taken over.

 Entry – reasons

Opens the application "reasons". The selected resource is taken over.

 Entry – Operator positions

Opens the application "operator positions". The selected resource is taken over.

 Entry – premium indicator

Opens the application "premium indicator". The selected resource is taken over.

 Groups - groups

Opens the application "groups". The group of the selected resource is taken over.

 Groups – group assignment

Opens the application "group assignment". The selected resource is taken over.

 Other – cycle parameter

Opens the application "cycle parameter". The selected resource is taken over.

 Other - workforce requirements of workplaces

Opens  the  application  "workforce  requirements  of  workplaces".  The  selected  resource  is  taken

over.

WEP-PPW_81.docx

Version: 1.0.2370

Page 75 of 156

Goods Receipt Inspection Planning

DNC tab

The  tab  is  only  available  if  a  DNC  resource  is  selected.  These  are  resources  configured  as

resources with DNC processing in the resource type.

 Configuration – resource status

Opens the "resource status" application

 Configuration - assignment of DNC family to machine

Opens the application "assignment of DNC family to machine".

 File - comparison editor

Opens  the  comparison  editor  for  the  selected  resource  or  resources.  Please  see  below  for  further

information.

 File - export

Exports the file entered for the resource. The target file is input using the file explorer.

 File - import

Imports the file entered for the resource. The source file is selected using the file explorer.

 File - viewer

Opens the file entered for the resource for viewing using the defined viewer program.

 File - editor

Opens the file entered for the resource for editing using the defined editing program.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Go to - resource list

Opens  the  "resource  list"  application.  The  selected  resource  is  entered  as  default  value  for  the

superior resource.

WEP-PPW_81.docx

Version: 1.0.2370

Page 76 of 156

Goods Receipt Inspection Planning

 Functions – status change

Opens the dialog for changing the resource status.

 Functions – release of resource

Opens the dialog for releasing a resource.

Operation of the comparison editor

The  comparison  editor  compares  the  files  attached  to  the  DNC  resources.  There  are  two  operating

modes:

Selection of one resource:

The released resource and the optimized  version of the resource are displayed  for comparison.

The file entered on the right-hand side of the editor can also be changed. Once the changes have

been  made,  they  are  taken  over  to  the  system,  just  as  it  is  also  the  case  for  the  simple  editor.

This mode can only be used for DNC types with the file processing type "optimized".

Selection of two resources:

WEP-PPW_81.docx

Version: 1.0.2370

Page 77 of 156

Goods Receipt Inspection Planning

If two resources are selected, the editor compares the two selected resources. The file type may

be selected. The file  entered to the right of the  editor may  also  be changed. Once the changes

have  been  made,  they  are  taken  over  to  the  system,  just  as  it  is  also  the  case  for  the  simple

editor.

The functions of the comparison editor can be opened using the relevant  buttons or by clicking the right

mouse button (context menu):

-  Reject:  The  detected  difference  (on  the  right)  is  rejected.  The  value  from  the  left  file  is

accepted. The difference is no longer selected.

-  Keep: The detected difference (on the right) is accepted. The difference is no longer selected.

-  Next difference: goes to the next difference.

-

Insert: Inserts a row at the current position.

-  Contents of a row can always be changed by clicking the row and inputting values. The row can

be left by clicking Esc without making any changes. The row is then highlighted as "changed".

-  Swap windows: this button allows for windows to be swapped. This function is necessary if two

resources are compared with each other. Their order results from the display order in the table

and  the  system  does  not  know  which  resource  needs  to  be  changed.  This  button  is  not

available  if  only  one  resource  is  selected.  For  only  the  optimized  program  version  can  be

changed.

-  Save: Saves the changes made to the file on the left-hand side.

Processing notes for workplaces and machines

Configuration modifications

In order that the settings or modifications made can be interpreted by the terminal shop floor program, the

terminal to which the workplace/ machine is assigned must be restarted.

Deleting a machine/ workplace

If  data  is  already  recorded  and  saved  for  a  machine/  workplace,    the  relevant  configuration  data  of  the

machine  (including  the  data  from  the  status  assignment,  the  maintenance  calendar  and  the  process

parameters in the MDE module, among others) is automatically deleted as well.

The previously existing movement data (events, postings) are not automatically deleted with this action;

instead, it is deleted later in context of the specified deletion cycles (default: 35 days).



WEP-PPW_81.docx

Version: 1.0.2370

Page 78 of 156

Goods Receipt Inspection Planning

9  Resource Families

Summary

Menu

Master data  Resources  Resource families

Transaction code

resfam.*

Function authorization  mdrfam

This document describes the application "Resource families” within the Manufacturing Operation Center

(MOC).

Usage

If  the  assignment  between  resource  and  resource  type  is  assumed,  it  is  clear  that  in  one  production

company,  different  resources  of  the  same  resource  type  exist,  which  also  are  handled  differently.  That

means that in general classification according to resource type is not sufficient for ordering the resources

in a useful way.

By  defining  so-called  resource  families,  a  sub  classification  of  resource  types  can  be  created.  The

following graphic shows an example of how the resource type "Tool" is divided into two resource families,

"Drill"  and  "Injection  mold".  Each  of  the  individual  resources  is  assigned  to  one  of  the  two  resource

families.

Resource type
Tool

Resource family
Drill

Resource family
Injection mold

Drill 5mm
002-392-42

Drill 4mm
002-402-49

Insert
836-630-50

Base frame
014-302-48

WEP-PPW_81.docx

Version: 1.0.2370

Page 79 of 156

Goods Receipt Inspection Planning

Integration

The resource families offer another structural level subordinate to the resource types. The function of the

master-detail user fields of the resources that can be defined using the resource types can be refined by

definition in the resource families. The resource families are used in particular in the DNC area as a main

search criterion and as an assignment criterion on machines.

Selection parameters

In  the  selection  panel,  filters  can  be  used  for  both  superior  and  assigned  resources.  The  following

selection criteria are available in the respective application:

Resource type

Type of resource.

Resource family

Family to which the resource is assigned.

Field descriptions

Resource type

Resource type to which the resource families refers

Resource family

Unique "descriptive" designation of the resource family.

This  value  can  be  searched  for  (selected)  in  the  various  functions.  Because  a  resource  or  its

resource ID can only be uniquely identified within the resource type, in the evaluations the resource

type of the resource is always displayed as well.

Description

Explanation of the resource family; functions as a comment.

Responsibility area

Definition of the responsibility area. By specifying a responsibility area for a family, the responsibility

area for the assigned resource is also specified, which controls its visibility and editing options.

Field description for the General tab

User field key

Reference to a valid user field key. The specified user field key overwrites the specification in the

resource type.

Note regarding DNC filtering using a DNC family and its search fields:

WEP-PPW_81.docx

Version: 1.0.2370

Page 80 of 156

Goods Receipt Inspection Planning

The  definition  of  a  suitable  user  field  combination  is  important  for  using  the  flexible  filter  and  search

function  in  the  DNC.  The  definition  of  such  user  field  combinations  is  reserved  for  MPDV  customizing.

The assignment and use of this user field key is the user's responsibility. With the defined search fields,

the  DNC  records  are  filtered  on  the  terminal  in  addition  to  the  DNC  family  of  the  machine  and  can  be

used as search criteria on the console.

Starting with release DNC 7.2, the following preconfigured user field keys will be delivered:

User field key

Description of the search fields

DNC_K

Plastic injection molding:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Tool, mandatory field, cannot be edited

DNC_K_V

Plastic injection molding:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Tool, mandatory field, cannot be edited

4.  Version, mandatory field, can be edited

DNC_K_W

Plastic (tool reference only):

1.  Tool, mandatory field, cannot be edited

DNC_K_WV

Plastic (tool reference and version):

1.  Tool, mandatory field, cannot be edited

2.  Version, mandatory field, can be edited

DNC_NC

NC programs:

1.  Article, mandatory field, cannot be edited

DNC_NC_V

NC programs:

1.  Article, mandatory field, cannot be edited

2.  Version, mandatory field, can be edited

DNC_NC_M

NC programs

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

DNC_NCMV

NC programs:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Version, mandatory field, can be edited

DNC_FREI

1.  Search field 1, Text20, mandatory field, can be edited

WEP-PPW_81.docx

Version: 1.0.2370

Page 81 of 156

Goods Receipt Inspection Planning

2.  Search field 2, Text20, optional field, can be edited

3.  Search field 3, Text20, optional field, can be edited

4.  Search field 4, Text20, optional field, can be edited

Note regarding DNC administration

DNC  records  are  used  exclusively  on  machines.  To  prevent  errors  in  input  and  assignments,  a  fixed

assignment  of  a  DNC  resource  family  to  every  machine  is  carried  out  and  saved  in  the  data  of  the

machine resource (field Resource family DNC). In this way, it can be ensured that only programs of one

resource family and, indirectly, of one resource type can be loaded on the machine.

Furthermore,  for  DNC  records  administration  criteria  are  needed  that  make  selection  and  evaluation

easier,  so  that  identification  and  processing  are  also  easier,  and  that  enable  checks.  Because  different

machine types (e.g. injection molding machine, printer, NC machines) can be  considered  with  the DNC

administration,  a  strict  specification  of  these  criteria  is  not  useful.  For  this  reason,  there  is  a  resource

family for which attributes are stored using the user fields; in turn, these attributes describe and specify

the variable parameters.

The attributes are used for identification and can be provided with plausibility functions and assignments

in  order  to  create  a  context  for  the  DNC  programs  with machines  and  operations  (see  the  "User fields"

chapter).

There are parameters, such as temperature or humidity that affect the behavior of the machine and can

therefore  influence  production.  These  "environmental  factors"  can  also  be  collected.  To  do  this,  further

attributes just have to be defined in the user fields.

WEP-PPW_81.docx

Version: 1.0.2370

Page 82 of 156

Goods Receipt Inspection Planning

10  Inspection Stations

Summary

Menu

Master data  Quality management  Inspection stations

Transaction code

ista

Function authorization

ista

The inspection station catalog has been designed to categorize characteristics.

Utilization

The  "inspection  station  number"  field  is  the  key  field,  i.e.  while  saving  a  new  inspection  station,  the

system checks whether there is already an inspection station with this key information.

The  input  of  measures  is  easy  to  handle.  Only  an  inspection  station  number  and  a  corresponding

designation have to be assigned.

By  assigning  an  inspection  station  to  a  characteristic,  it  can  be  achieved  that  inspection  orders  are

generated that only  include the characteristics of an inspection station. This depends on a configuration

option  within  the  inspection  plan  header.  In  case  inspection  orders  are  generated  for  each  inspection

station,  this  information  may,  in  turn,  be  used  as  filter  for  the  inspection  orders  provided  at  the  AIP

inspection terminal. For this purpose, the terminal has to be configured accordingly.

Provided that the inspection plan header defines that inspection orders are not to be generated for each

inspection station, the inspection station assigned to a characteristic is only a supplementary information.

By  differentiating  between  active  and  inactive  inspection  stations,  it  can  be  defined  whether  or  not  they

are  still  to  be  available  in  the  selection  lists  for  inspection  stations  in  the  later  data  acquisition  process.

Inactive inspection stations can be reactivated at any time.

Integration

Inspection  stations  are  used  in  all  applications  dealing  with  characteristics.  Moreover,  the  terminal

configuration allows for inspection stations to be assigned.

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection criteria are self-explanatory and are not described separately.

WEP-PPW_81.docx

Version: 1.0.2370

Page 83 of 156

Goods Receipt Inspection Planning

The "inactive" filter field allows for the data set to be restricted to active or inactive inspection stations.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The  "inactive"  check  box  identifies  inspection  stations  that  are  no  longer  to  be  used  in  the  active  data

acquisition process.

Toolbar

There are no other special function buttons in addition to the standard functions.

WEP-PPW_81.docx

Version: 1.0.2370

Page 84 of 156

Goods Receipt Inspection Planning

11  Customers

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 85 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 86 of 156

Goods Receipt Inspection Planning

Editing functions

The below dialog opens to edit a data record.

Toolbar

There are no other special function buttons in addition to the standard functions.

WEP-PPW_81.docx

Version: 1.0.2370

Page 87 of 156

Goods Receipt Inspection Planning

12  Manufacturer

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 88 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 89 of 156

Goods Receipt Inspection Planning

Editing functions

The following dialog opens to edit a data record.

Toolbar

There are no other special function buttons in addition to the standard functions.

WEP-PPW_81.docx

Version: 1.0.2370

Page 90 of 156

Goods Receipt Inspection Planning

13  Suppliers

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 91 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 92 of 156

Goods Receipt Inspection Planning

Editing functions

The following dialog opens to edit a data record.

Toolbar

There are no other special function buttons in addition to the standard functions.

WEP-PPW_81.docx

Version: 1.0.2370

Page 93 of 156

Goods Receipt Inspection Planning

14  Failure Types

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 94 of 156

Goods Receipt Inspection Planning

If failure types are presented in list form the group hierarchy is represented by the columns "group 1" to

"group 5".

Groups  are  edited  in  the  "failure  type  groups"  application,  which  is  described  in  the  manual  entitled

"MOC_Groups.pdf".

Under  certain  circumstances,  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for the failure type number as failure key.

By differentiating between active and inactive failure types, it can be defined whether or not they are still

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 95 of 156

Goods Receipt Inspection Planning

Field descriptions

The available fields are self-explanatory and are not explained separately.

The "inactive" check box identifies failure types that are no longer to be used in the active data acquisition

process.

In a tree structure the group field shows the assigned group or allows for groups to be assigned in form of

the tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions.

WEP-PPW_81.docx

Version: 1.0.2370

Page 96 of 156

Goods Receipt Inspection Planning

15  Failure Locations

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 97 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 98 of 156

Goods Receipt Inspection Planning

16  Failure Causes

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 99 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 100 of 156

Goods Receipt Inspection Planning

17  Causers

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 101 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 102 of 156

Goods Receipt Inspection Planning

18  Measures

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 103 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 104 of 156

Goods Receipt Inspection Planning

19  Analysis Selection

Summary

Menu

Master data  Quality management  Analysis selection

Transaction code

asc

Function authorization

asc

Analysis selection catalogs allow for the set of failure types, failure locations, failure causes, originators,

and measures that are available in measurement recording to be restricted specifically.

The overall application is divided into two hierarchical levels. A master-detail grid is used for presentation.

The  data  records  of  the  analysis  selection  are  created  on  the  first  level.  One  level  below,  the

corresponding  failure  types,  locations,  causes,  originators  and  measures  are  assigned  to  these  data

records of the analysis selection. There is a separate tab for each assignment type on this second level.

Separate function keys to  create,  edit or delete data  records are  available on each level of the master-

detail grid.

Utilization

The  analysis  selection  number  identifies  the  data  records  of  the  analysis  selection  uniquely  in  all  QM

applications in which they may be selected and assigned.

A data record of an analysis selection catalog only consists of a number and designation as well as of the

flag  to  disable  it  ("inactive"  field).  The  most  crucial  factor  here  is  the  possibility  to  assign  failure  types,

locations, causes, originators and measures to a data record of the analysis selection.

If a characteristic is assigned an analysis selection catalog only the failure types, failure locations, failure

causes,  originators  and  measures  listed  in  this  catalog  will  be  available  for  this  characteristic  when

measured values are recorded. Consequently, the failure list, for example, can be designed in relation to

characteristics.

Analysis selection catalogs are mainly used for the assignment to an inspection chart characteristic. An

assignment is almost mandatory for inspection chart characteristics, as in any other case, the user may

choose  from  the  whole  set  of  failure  types  of  the  entire  master  data  catalog  when  recording  measured

values for this characteristic. This would make inspections confusing and too complex.

WEP-PPW_81.docx

Version: 1.0.2370

Page 105 of 156

Goods Receipt Inspection Planning

Integration

Analysis selection catalogs are used in all applications dealing with characteristics. By assigning analysis

selection  catalogs  in  these  applications,  the  selection  list  for  failures,  originators  and  measures  is

restricted for measurement recording.

Prerequisite

The master data for failure types, failure locations, failure causes, originators and measures need to be

maintained before this function can be used in a useful manner.

Selection criteria

Selection criteria are self-explanatory and are not described separately.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The check box "inactive" identifies data records of the analysis selection that are no longer to be used for

the definition of characteristics (of inspection plans/inspection orders).

WEP-PPW_81.docx

Version: 1.0.2370

Page 106 of 156

Goods Receipt Inspection Planning

20  Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 107 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 108 of 156

Customer number

Direct  input  or  opening  of  the  customer  catalog  and  taking  over  of  the  number  from  the  entry

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 109 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 110 of 156

However, the system has to be configured accordingly by MPDV consultants to be able to use

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 111 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 112 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 113 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 114 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 115 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 116 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 117 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 118 of 156

Goods Receipt Inspection Planning

"Inspection plan documents“ and "documents of inspection plan

characteristics“ detail applications

The above screenshot shows how an inspection plan document is assigned

The above screenshot shows how a document of an inspection plan characteristic is assigned

WEP-PPW_81.docx

Version: 1.0.2370

Page 119 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 120 of 156

Goods Receipt Inspection Planning

21  Inspection Requirements

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 121 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 122 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 123 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 124 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 125 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 126 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 127 of 156

Goods Receipt Inspection Planning

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

or characteristics is defined in the existing inspection plan. The transitional  definition  provides the

possible inspection severities and controls switching between these different inspection severities.

The content cannot be changed.

Determined inspection severity

It defines  which  inspection severity  is/was used for checking the goods received according to  the

basics for the dynamic modification history. This field is only available if dynamic modification based

on batches is defined in the existing inspection plan. The content cannot be changed.

WEP-PPW_81.docx

Version: 1.0.2370

Page 128 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 129 of 156

Goods Receipt Inspection Planning

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

forms. The potential content  of these forms is determined by the Web services that are available in the

respective context. The form entries, i.e. the content of the list of forms of the corresponding print dialog,

are defined within the master data of quality management. This is also where the basis for new forms is

established and the corresponding form properties are defined. A corresponding license is required to be

able to change the forms with respect to content and design.

WEP-PPW_81.docx

Version: 1.0.2370

Page 130 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 131 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 132 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 133 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 134 of 156

The corresponding button has to be clicked in the toolbar to complete an  inspection step. The following

editing dialog opens afterwards.

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 135 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 136 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 137 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 138 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 139 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 140 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 141 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 142 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 143 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 144 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 145 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 146 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 147 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 148 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 149 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 150 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 151 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 152 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 153 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 154 of 156

Goods Receipt Inspection Planning

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

WEP-PPW_81.docx

Version: 1.0.2370

Page 155 of 156

Goods Receipt Inspection Planning

  Number of defects

  p and

  u.

WEP-PPW_81.docx

Version: 1.0.2370

Page 156 of 156


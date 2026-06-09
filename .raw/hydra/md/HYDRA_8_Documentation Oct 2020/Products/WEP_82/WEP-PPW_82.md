Manual

Goods Receipt Inspection
Planning
WEP-PPW 8.2

Version 1.1.23372

Last changed on: 23.09.2020

Goods Receipt Inspection Planning

Copyright

©Copyright 2016 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WEP-PPW_82.docx

Version: 1.1.23372

Page 2 of 182

Goods Receipt Inspection Planning

Contents

1  Goods Receipt Inspection Planning - Overview ........................................... 5

2  Article ........................................................................................................... 6

2.1  Function call ........................................................................................................ 6

2.2  Default Application Layout ................................................................................... 7

2.3  Toolbar ................................................................................................................ 7

2.4  Selection parameters .......................................................................................... 9

2.5  Detail aplication “Article” ...................................................................................... 9

3  Summary .................................................................................................... 12

3.1  General notes on the document ........................................................................ 12

4  Groups ....................................................................................................... 13

4.1  Starting the function .......................................................................................... 13

4.2  Default Application Layout ................................................................................. 14

4.3  Toolbar .............................................................................................................. 14

4.4  Selection parameters ........................................................................................ 16

4.5

"Groups" Detail Application ............................................................................... 16

5  Characteristic Master Data ......................................................................... 18

5.1  Sampling schemes ............................................................................................ 30

5.2  Control charts for variable characteristics .......................................................... 31

5.3  Control charts for attributive characteristics ....................................................... 33

5.4  Calculation of formulas ...................................................................................... 34

5.4.1  Operators, functions and constants ....................................................... 34

5.4.2  Formulas referring to other inspection results ........................................ 36

5.4.3  Extended formulas................................................................................. 38

5.4.4  General notes on calculated characteristics .......................................... 42

5.5

Last off inspection ............................................................................................. 43

6  Specification List ........................................................................................ 45

7  Workplace and Resource Configuration .................................................... 53

8  Resource Families ..................................................................................... 92

WEP-PPW_82.docx

Version: 1.1.23372

Page 3 of 182

Goods Receipt Inspection Planning

9

Inspection Stations ..................................................................................... 96

10  Customers .................................................................................................. 98

11  Manufacturer ............................................................................................ 101

12  Suppliers .................................................................................................. 104

13  Failure ...................................................................................................... 107

14  Measures ................................................................................................. 109

15  Analysis Selection .................................................................................... 111

16  Norms ....................................................................................................... 113

17  Units ......................................................................................................... 116

18  Catalogs ................................................................................................... 118

18.1  Overview ......................................................................................................... 118

18.2  Purpose ........................................................................................................... 118

18.3

Integration ....................................................................................................... 118

18.4  Selection criteria .............................................................................................. 119

18.5  Field descriptions ............................................................................................ 119

18.6  Editing functions .............................................................................................. 119

19  Inspection planning .................................................................................. 121

20  Inspection requirements ........................................................................... 146

WEP-PPW_82.docx

Version: 1.1.23372

Page 4 of 182

Goods Receipt Inspection Planning

1  Goods Receipt Inspection Planning - Overview

Purpose

This  component  allows  creating  inspection  plans  based  on  master  data  defined  earlier  plus  generating

and managing inspection requirements which,  in combination with the associated inspection steps, form

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 5 of 182

  Generating inspection requirements or steps based on inspection plans created earlier

Goods Receipt Inspection Planning

2  Article

This document describes the “article” application of the Manufacturing Operation Center (MOC). General

information on how to use MOC can be found in the document entitled “moc_cc.pdf“.

The article catalog has been designed to edit/keep articles. Article data is a global catalog that is used in

many CAQ modules and in PDV (Process Data Collection). Provided that there is an interface to a higher-

level  system  (e.g.  ERP  system),  articles  may  be  created  automatically  via  this  interface.  As  soon  as  a

new article is created or changed, e.g. in the ERP system, the article data record is automatically created

or changed in the HYDRA-CAQ article catalog based on the defined information.

2.1  Function call

Menu

Master data  Quality management  Article

Master data  Process data processing  Article

Transaction code

atc

Function authorization

atc

Available user fields

Location

Object type/user field key

Source (type)

Table and detail view

ATK/SYSTEM

MF-D

How can I configure user fields?

Which user field types are available?

WEP-PPW_82.docx

Version: 1.1.23372

Page 6 of 182

2.2  Default Application Layout

Goods Receipt Inspection Planning

2.3  Toolbar

The  toolbar  provides  the  different  functions  available  for  this  application  and  possibly  links  to  other

applications.  The  functions  included  in  the  “general”  tab  of  the  toolbar  are  available  in  all  detail

applications. In addition to the standard functions, such as help, request data, save application settings,

and print preview, the other tabs also include specific functions that are specially tailored to the respective

detail application. The following sections describe the individual application functions.

Category Data

Request data

The  information  to  be  displayed  within  the  application  is  requested  on  the  basis  of  the  entered

selection  criteria.  This  process  might  take  some  time  depending  on  the  dataset  from  which  the

system filters data and on the selection result to be transferred and displayed.

  Cancel

The query sent by clicking the “request data” button can be canceled using this function.

WEP-PPW_82.docx

Version: 1.1.23372

Page 7 of 182

Goods Receipt Inspection Planning

 Print preview

The  print  preview  is  opened  for  the  selected  detail  application.  The  print  preview  also  includes

further options to change the resulting printout and functions for exporting the displayed information

into other formats, such as PDF, Excel, image files.

  Save

The  application  design  configured  by  the  user,  e.g.  columns  and  categories  displayed  as  well  as

their respective size and display locations, etc. are only saved if the user requests it. In this case,

the user has to affirm the confirmation prompt by clicking “Yes”.

Category Functions

   Add

Adds a new article.

  Copy

Copies the selected article.

   Edit

Edits an already existing article

   Delete

Deletes the selected or several selected articles.

Category Help

   Help on operation

Clicking  this  button  opens  the  help  file  describing  how  to  operate  MOC.  The  basic  document  is

entitled “moc_cc.pdf”. It describes how to use MOC in general and applies for all applications.

  Help on application

This  function  opens  the  manual  for  the  respective  application  from  which  the  help  file  was

requested.  The  application  manual  integrates  the  application  function  into  the  MES  context  and

explains the information to be displayed. The documentation also includes all detailed applications.

WEP-PPW_82.docx

Version: 1.1.23372

Page 8 of 182

Goods Receipt Inspection Planning

   Help on detail application

This function opens the application manual at the section where the relevant detailed application is

described.

2.4  Selection parameters

The application provides the following selection criteria:

Tab "General"

  Article no.:

Article number

  Drawing issue number:

Drawing issue number of the article, often also referred to as index

  Designation:

Article name



Inactive:

Inactive, active articles. The checkbox is not enabled by default.

  Customer article no.:

Customer article number

  Article model:

Article model

Tab “Groups“

  Group:

The  article  group  tree  can  be  opened  using  the
There is a function to accept and cancel the activity.

  button  if  an  article  group  is  to  be  filtered.

2.5  Detail aplication “Article”

The article number as well as the drawing issue number uniquely identify articles in all areas of HYDRA-

CAQ referring to the article catalog. The drawing issue number, also referred to as article index, may be

very important, in particular, for inspection planning and when inspection orders are generated. Thus, it is,

for example, possible to create an inspection plan for the article 12938 with the drawing issue numbers A

and  B.  Different  inspection  specifications  apply  for  each  drawing  issue  no.  Unless  the  drawing  issue

number is indicated and thus may be part of the inspection plan, the system that generates the inspection

requirements, must deliver this drawing issue number.

WEP-PPW_82.docx

Version: 1.1.23372

Page 9 of 182

Goods Receipt Inspection Planning

The fields “article no.” and “drawing issue number” fields are key fields, i.e. when a new article is saved, it

is first checked whether an article with this key information already exists.

By  distinguishing between  active and inactive articles, it may  be  defined  whether or not the  articles are

available  in  certain  selection  lists.  Thus,  no  inspection  plan  can  be  created  for  an  inactive  article.

However,  inactive  articles  may  be  evaluated  at  any  time.  Moreover,  inactive  articles  can  also  be

reactivated at any time.

Furthermore, an article can be defined as being subject to documentation. In addition the dialog provides

the fields customer article number, article model, article ABC, drawing number as well as the possibility to

assign units. To assign units (dimensions), the catalog of units is used.

If you want to make evaluations on article groups or if you use family inspection  plans, it is mandatory to

assign  the  respective  group.  To  assign  groups,  open  the  group  tree  using  the  lens  icon.  Using  the

hierarchic  tree  entries  the  required  group  can  be  selected  in  the  group  tree  and  accepted  by  double

clicking.

WEP-PPW_82.docx

Version: 1.1.23372

Page 10 of 182

Goods Receipt Inspection Planning

The  assigned  group  including  the  hierarchical  group  structure  then  appears  in  the  “groups”  field  of  the

editing dialog of articles.

When articles are displayed in a list, the group hierarchy is represented by the columns “group 1 to group

5”.

Groups  are  maintained  in  the  “article  groups”  application  and  is  described  in  the  document  entitled

“MOC_Groups.pdf“.

WEP-PPW_82.docx

Version: 1.1.23372

Page 11 of 182

Goods Receipt Inspection Planning

3  Summary

3.1  General notes on the document

This  document  describes  the  “Groups“,  e.g.  article  groups,  application  of  the  Manufacturing  Operation

Center (MOC). For general information on how to use MOC, please refer to the “moc_cc.pdf“ document.

WEP-PPW_82.docx

Version: 1.1.23372

Page 12 of 182

Goods Receipt Inspection Planning

4  Groups

The  group  catalogs  have  been  designed  to  create  and  edit  groups  for  the  different  applications.  The

created groups may be assigned to master data of the corresponding  application. Consequently, article

groups may be created, for example, and assigned to the articles. In this case, it is also possible to create

inspection plans on the basis of article groups.

Basically, the creation of groups is also reasonable for failure mode analyses.

4.1  Starting the function

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 13 of 182

4.2  Default Application Layout

Goods Receipt Inspection Planning

This figure of the article group catalog is exemplary for all groups.

4.3  Toolbar

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 14 of 182

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 15 of 182

Goods Receipt Inspection Planning

4.4  Selection parameters

There are no selection parameters. A specific group can be found by using the “fast selection” function.

To use the “fast selection” function just open the group tree structure on the 1st level, select the first entry

and enter the first letter of the group in question. Consequently, the first group starting with this letter that

is found is selected. The "fast selection" function also integrates subordinate groups that are not opened.

If the requested term is included in a group that is not opened, it will be opened automatically.

4.5  "Groups" Detail Application

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 16 of 182

Goods Receipt Inspection Planning

The  "delete  selection"  function  cannot  be  used  in  the  maintenance  of  groups  dialog.  This  function  is

enabled,  for  example,  in  the  maintenance  of  articles  application  if  an  article  group  is  selected  and  this

selection is to be removed/deleted.

WEP-PPW_82.docx

Version: 1.1.23372

Page 17 of 182

Goods Receipt Inspection Planning

5  Characteristic Master Data

Overview

Menu

Master data  Quality management  Characteristics

Transaction code

chrq

Function authorization

chrq

Available user fields

Where?

Object type/user field key

Source (type)

Table and detail view

CMM/SYSTEM

QM

How to configure user fields?

Which user field types are available?

Purpose

The catalog of characteristics has been designed to define characteristics and, as a result, to predefine

characteristic data of inspection plans. For this reason, it aims at people involved in inspection planning.

WEP-PPW_82.docx

Version: 1.1.23372

Page 18 of 182

Goods Receipt Inspection Planning

The  catalog  of  characteristics  is  one  of  the  most  important  basic  catalogs.  You  cannot  set  up  any

inspection plan  without this catalog.  As this catalogue is used to predefine characteristics for inspection

plans, it includes extensive input options. Basically, the catalog of characteristics should only include such

data, which will not have to be modified when the characteristics are assigned to the inspection plan later

on. For example, the definition of limit values is usually not reasonable as these values are only known

when an inspection plan is set up. Only when you assign data to an inspection plan, a relation between

data and article is established. Note this and you will know what kind of information you should predefine.

For example, it must be carefully considered  whether  the characteristic "outer diameter" is only created

once  and  detailed  information  is  stored  in  the  inspection  planning  later  on  or  whether  several  "outer

diameter characteristics" are created, e. g. with specification of limit values. Usually, it is an advantage to

store a restricted number of general characteristics. The required evaluations/reports also play  a role in

this  context.  If  a  new  "outer  diameter  characteristic"  is  created  for  almost  every  tolerance  change,  this

characteristic is "valid" for one article only. In a subsequent failure analysis, a comprehensive evaluation

is not possible in this case!

It  is  important  that  each  detail  defined  here  can  be  modified  in  the  inspection  planing  later  on  or  that

details, which have not been stated, can still be added.

The configurations made in the characteristics' master data are not final. The characteristics' master data

is  used  as  a  template  for  later  inspection  planning.  You  can  complete  and  modify  all  settings  of  the

characteristics' master data during inspection planning.

Integration

The catalog of characteristics is a global catalog that is used in many QM applications. Please find below

some possible fields of application that refer to the catalog of characteristics.





Inspection planning for production, goods receipt, goods issue, initial samples and calibration

Inspection requirements for production, goods receipt, goods issue, initial samples and calibration

  Failure analysis in complaint management

  Several reports/evaluations

Requirements

There are no special requirements.

Selection criteria

The application provides the following selection criteria:

WEP-PPW_82.docx

Version: 1.1.23372

Page 19 of 182

Goods Receipt Inspection Planning

  Characteristic no.:

Number of the characteristic

  Characteristic designation:

Designation of the characteristic –  Note: You may use wildcards "*"

  Characteristic type:

Inspection type: attributive, inspection chart, variable

Tab Details

  Gage

Select a gage

  Gage designation:

Select a gage designation

Tab User fields



If user fields are created, they may be selected

If several selection criteria are used, overlapping results are displayed in the characteristics' master data.

In addition, the column filter allows for the content of each individual column to be filtered.

Field descriptions

The available fields are self-explanatory and are not explained separately, except for the address fields.

Tab Characteristics

Characteristic no.

Unique number of the characteristic

Characteristic designation/name

Designation of the characteristic

Input type

Automatic or manual data collection. This field controls the release of HYDRA-PDV fields (in case

of  automatic  collection).  If  the  automatic  collection  function  is  selected,  the  characteristic  type  is

restricted to the "variable" option.

WEP-PPW_82.docx

Version: 1.1.23372

Page 20 of 182

Goods Receipt Inspection Planning

Characteristic type

This option specifies whether the collection of measured values (variable) or the identification of the

number  of  detected  failures  (attributive)  is  used  for  the  inspection.  If  you  select  the  attributive

inspection,  use  the  input  type  to  define  whether  the  collection  should  be  based  on  a  catalog  or

whether the standard collection is performed. Further characteristic types are the inspection chart

and the information characteristic. If you select the inspection chart, you can enable the input type

visual  defects recording. The  information characteristic is only  used to display  a document during

the  inspection  process.  Subject  to  the  input  type,  the  lower  area  of  the  dialog  provides  the

respective sampling schemes.

Visual  recording:  The  characteristic  document  (not  the  inspection  requirement  document)  is

displayed with the position 1. This must be type FILE. The system supports these formats: JPEG,

JPG, PNG. To divide a graphic in different areas, you must define the grid for the x-axis and the y-

axis (e.g. A,B,C,D,E)

Inspection result base

This  setting  defines  whether  all  samples  or  only  the  sample  recorded  last  is  used  to  identify  the

inspection result (pass/fail).

Mandatory inspection

If this option is activated, you must enter at least one measured value for this characteristic, before

you can complete an inspection order including this characteristic.

Formula:

See chapter Calculation of formulas.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.formula".

Tab Details

Group Gage

Gage

Defines whether a gage or gage group is to be assigend to the characteristic:

Assignment of the gage (or gage group) to be used.

You  can  also  use  resources  of  resource

type  "PRM"  of

the  resource  management.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.gage".

Gage designation (name of test equipment)

Shows the name of the gage

WEP-PPW_82.docx

Version: 1.1.23372

Page 21 of 182

Goods Receipt Inspection Planning

Group Properties

Certificate printing

The  selected  option  defines  whether  this  characteristic  is  to  be  printed  (display  selection  or  print

always)  or  not  (print  never)  when  certificates  are  printed  at  a  later  stage  (e.g.  acceptance,

inspection  certificate).  If  you  select  the  option  "display  selection",  a  list  of  the  characteristics  with

this printing option set is displayed prior to printing. In the list, these characteristics are preselected

for  the  print  of  a  certificate.  However,  this  selection  may  be  removed.  Finally,  all  selected

characteristics  and  the  characteristics  with  the  "print  always"  option  are  included  in  the  certificate

print.  Characteristics  with  the  "print  always"  option  do  not  appear  in  a  selection  list,  as  they  are

printed in any case. Please note that this option only affects certificate forms.

Failure weighting

If the inspection result for the characteristic is "fail", you can classify the result here for  information

purposes.

Group Inspect

Analyseauswahlkatalog

Here,  you  can  select  an  analysis  selection  catalog.  The  catalog  restricts  the  selection  of  possible

failures you can enter (failure types, failure location, etc.). (All available failures may still be entered,

if you directly enter their number).

Designation of analysis selection

Shows the designations of analysis selection catalogs

Tab Specifications

Once the "specifications" tab has been selected, the  sample scheme and constructional measures may

be entered. In this context, it has to be considered that (as already mentioned) the definition of tolerance

limits  in  the  master  data  of  characteristics  is  only  reasonable  if  certain  conditions  are  met.  The  same

applies to the definition or calculation of action and warning limits. This section explains the possibilities in

detail.

Group Sampling scheme

Sampling scheme

The following sampling schemes are available:

  100% inspection





k value inspection

lot inspection

  n-c inspection

  SPC inspection

WEP-PPW_82.docx

Version: 1.1.23372

Page 22 of 182

Goods Receipt Inspection Planning

The  sampling  scheme  defines  the  inspection  procedure.  In  case  of  an  n-c  inspection  and

parameters 5-0, 5 pieces are checked and 0 failures may be detected.

Find a more detailed description in section Sampling schemes.

Sample size/expected sample size

Specification  of  the  sample  size  (number  of  samples)  or  the  expected  sample  size  depending  on

the sampling scheme, see section Sampling schemes.

Acceptance quantity

Acceptance quantity for the n-c inspection, please also see section Sampling schemes.

Interval type

Input for SPC or n-c inspections: time, pieces, once, none. See chapter Sampling schemes .

Interval value

Specifies the interval subject to the interval unit.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.interval".

Interval unit

For n-c or SPC inspections, e.g. minutes, hours.

With output batch change

If the output batch changes, an inspection becomes due.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.interval".

  Note:

  The  option  With  output  batch  change  only  triggers  the  generation  of  an  inspection  point,  if  the

respective  change  of  the  output  batch  is  included  in  the  dialog  "Change  of  batches"  (dialog  ID:

CA_WL). For example, reel cutting dialogs do not generate inspection points.

With machine status change

If the machine status changes, an inspection becomes due.

To display this field in the inspection plan characteristics, you require the authorization

"iriscp.interval".

  Source status

Here, you can specify source statuses (specific non-productive machine statuses) – separated by

commas. If the machine then changes from a specified source status into a productive machine

status, an inspection becomes due.

WEP-PPW_82.docx

Version: 1.1.23372

Page 23 of 182

Goods Receipt Inspection Planning

To display this field in the inspection plan characteristics, you require the authorization

"iriscp.interval".

As of SP8, the following configurations are available in addition.

  The field is completely empty: For this characteristic, a machine status change always

generates an inspection point, if the machine changes from a non-productive into a

productive status.



"x-y", comma-separated: If the machine changes from source status x to target status y

(may be non-productive), an inspection point is generated for this characteristic.



"x-": If the machine changes from source status x to an arbitrary target status (may be non-

productive), an inspection point is generated.



"-y": If the machine changes from an arbitrary source status to target status "y" (may be

non-productive), an inspection point is generated.

With change of shifts

An inspection becomes due on changing shifts.

To display this field in the inspection plan characteristics, you require the authorization

"iriscp.interval".

Inspection due date of last off inspection

For details on the configuration of a last off inspection, refer to the section "Last off inspection".

Group Constructional measures

Unit

Pieces, meter, kg, etc. Unit of the characteristic. Allocate the units by using the unit catalog.

Decimal places

Number of decimal places. Leading zeros before the comma are not displayed in the specification

fields. By default, the number of decimal places defined in the system settings is pre-assigned.

Size (measure type)

Plausibility  and  tolerance  limits  can  be  entered  as  absolute,  relative  or  percentage  values.  Please

note  that  relative  or  percentage  lower  limits  (lower  tolerance  limit,  lower  process  limits)  must  be

specified with a negative algebraic sign.

Standard

Calculation of tolerances based on specific standards (e.g. ISO metric fits). Subject to the selected

standard, further information is requested (e.g. engineering fit). The system automatically calculates

the tolerance limits on the basis of these specifications.

WEP-PPW_82.docx

Version: 1.1.23372

Page 24 of 182

Fit

Calculation of tolerance limits on the basis of a specific standard and engineering fit. The selected

Goods Receipt Inspection Planning

fit depends on the selected standard.

Upper PL

Specfies the upper plausibility limit

Upper TL

Specifies the upper tolerance limit (upper specification limit)

Target value

Specifies the target value

Lower TL

Specifies the lower tolerance limit (lower specification limit)

Lower PL

Specifies the lower plausibility limit

Generate failure (UTL)/(LTL)

If measured values  are recorded  and the checkbox  Generate failure  is enabled,  a violation  of the

limit  value  automatically  results  (in  the  background)  in  the  failure  type  "limit  value  violation"

(AUTO:TG>  or  AUTO:TG<).  This  option  is  not  available  for  attributive  characteristics,  as  the

specification is only used for information purposes in this case.

User fields tab

If you have defined user fields for characteristics, they are displayed and may be edited here.

Tab Chart 1/Chart 2

In tab chart1/chart2, you can define the control charts to be used. These control charts are later available

in  the  integrated  measurement  recording  and  in  the  measurement  recording  for  terminals  (SPCM).  You

can  define  a  total  of  two  different  control  charts.  Here,  you  can  store  for  each  control  chart  the  action

limits, warning limits and the mean value of variable characteristics. There are two different possibilities to

define these limit values. You can enter the limit values manually or the limit values are calculated using

the  specified  default  values  included  in  tab  Default  values  chart1/2.  For  further  information  on  control

charts, refer to sections 5.2 Control charts for variable characteristics and 5.3Control charts for attributive

characteristics.

Chart 1 / Chart 2

Specifies the control chart displayed in the measurement recording dialog on the terminal. You can

define action limits on the basis of the control chart type.

WEP-PPW_82.docx

Version: 1.1.23372

Page 25 of 182

Goods Receipt Inspection Planning

Upper AL

Specifies the upper action limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

Upper WL

Specifies the upper warning limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

MV (Mean value)

Specifies a mean value, e.g. as basis for the automatic calculation of limits by the system.

Lower WL

Specifies the lower warning limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

Lower AL

Specifies the lower action limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

Generate trend error

The option "generate trend error" has to be activated to be able to generate an automatic error if a

trend  exists  (e.g.  seven  values  in  a  row  are  descending  or  ascending,  the  number  of  values  is

defined  while  the  system  is  customized).  To  identify  a  trend,  the  samples  of  an  inspection  step

characteristic are checked, sorted by their sample number  – regardless of the machine where the

data has been recorded.

Generate error (UWL) / (LWL)

Enable  the  checkboxes  Generate  error  (UWL)  /  (LWL)  to  generate  automatically  (in  the

background) the failure type "Limit value violation" (AUTO:WG> or AUTO:WG<), if a limit value is

violated during the recording of measured values. Here, the violation of the limit value is identified

using the stored control chart. In case an xq chart is stored, the automatic error is only generated if

the respective xq value of the control chart, and not the single value, exceeds the warning limits.

Generate error (UAL) / (LAL)

Enable the checkboxes Generate error (UAL)) / (LAL) to generate automatically (in the background)

the failure type "Limit value violation" (AUTO:EG> or AUTO:EG<), if a limit value is violated during

the recording of measured values. Here, the violation of the limit value is identified using the stored

control chart. In case an xq chart is stored, the automatic error is only generated if the respective xq

value of the control chart, and not the single value, exceeds the action limits.

Tab Default values chart 1 / Default values chart 2

For further information on control charts, refer to sections  Control charts for variable characteristics and

Control charts for attributive characteristics.

WEP-PPW_82.docx

Version: 1.1.23372

Page 26 of 182

Goods Receipt Inspection Planning

Group Default for calculating limit values

Calculation type

Default  values  to  calculate  limit  values:  Cpk,  Sigma,  sq/an,  Rq/dn,  relative  deviation  from  xq,

deviation from xq in percent

Cpk

Default value of cpk

Sigma

Default value or calculated sigma value

Rq/sq (RQuer/sQuer)

Default value for Rq/sq (RQuer/sQuer)

Group Non-action probability

Action limits (non-action probability)

Specifies the action probability (only visible with the calculation type: cpk, Sigma, rQuer/sQuer)

Warning limits (non-action probability)

Specifies the action probability (only visible with the calculation type: cpk, Sigma, rQuer/sQuer)

Group Deviation from xq specification

rel. AL

Direct entry of the action limits (only visible with calculation types relative/percentage deviation).

rel. WL

Direct entry of the warning limits (only visible with calculation types relative/percentage deviation).

Group Confidence interval

Confidence interval

One-sided or two-sided. You can select one-sided or two-sided for the control charts R and s.

Group xq

XQ

Target  value,  mid-tolerance,  mean  value  of  xq  chart,  input  (only  visible  and  can  only  be  selected

with an xq control chart)

WEP-PPW_82.docx

Version: 1.1.23372

Page 27 of 182

Goods Receipt Inspection Planning

Editing functions

The  below  screenshot  shows  an  example  of  an  editing  dialog.  Design  and  alignment  of  fields  may

deviate.

WEP-PPW_82.docx

Version: 1.1.23372

Page 28 of 182

Goods Receipt Inspection Planning

Toolbar

There are no other special function buttons in addition to the standard functions/features.

Detail application Documents

If  you  have  activated  the  tab  Documents,  you  can  assign  an  arbitrary  number  of  documents  to  each

characteristic.  If  this  tab  is  activated,  the  respective  buttons  in  the  toolbar  to  edit  the  documents  are

equally activated.

All  formats  registered  by  Windows  are  available  when  assigning  documents.  You  can  assign  simple

documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos.  You  only  have  to  make  sure  to

install  a  program  that  is  able  to  display  the  used  format.  The  appropriate  program  linked  in  Windows

opens the documents.

The  file  types  "File",  "URL",  and  "Text"  are  available.  If  you  select  the  type  "file",  you  can  enter  the  file

name including path manually. Select the file type “URL” to access the internet or intranet. Select the file

type "text" to directly enter a text.

Note:

The  different  types  of  file  format  "URL"  that  the  shop  floor  client  supports  are  listed  in  the  respective

manual of the shop floor client. It might happen that "https" URL entries are displayed on the MOC, but

not on the AIP shop floor client.

WEP-PPW_82.docx

Version: 1.1.23372

Page 29 of 182

Goods Receipt Inspection Planning

You  can  assign  a  designation/name  to  each  document.  You  can  also  define  the  list  order  of  the

documents. Use the field "position" to define the order (numeric input). Position numbers must be unique

in  this  list.  Enable  the  checkbox  Display  to  define  that  the  document  is  displayed  during  inspection

process.

Speaking of documents, you also have to decide if a document assignment without precise reference to

an article is reasonable. Normally, the document assignment depends on the article.

Taskbar Document

In addition to the standard functions, the application also provides the button to show documents.

Show documents

If  a  document  link  is  stored,  click  this  button  to  open  and  show  the  linked  document.  However,  a

program, which can show the linked file type, must be installed on the PC.

5.1  Sampling schemes

The  user  can  select  from  five  sampling  schemes  in  a  specified  list.  Subject  to  the  selected  sampling

scheme, some additional information has to be defined. It is subject to the subsequent use in the different

inspection  plan  areas  (e.g.  production,  goods  receipt,  goods  issue),  if  all  or  only  a  smaller  selection  of

sampling schemes is available.

Sampling  scheme  n-c  inspection:  The  sample  size  is  entered  in  the  "sample  size"  field  (=  n)  and  the

maximum  number  of  admissible  non-conforming  units  is  entered  in  the  "acceptance  quantity"  (=c)  field.

The figure "c" is defined as acceptance number. This means: if n = 50 und c = 1, the characteristic and

thus the piece is only classified as "fail" if two non-confirming units are identified (with sample size = 50).

Sampling scheme 100% inspection: In general, the sampling scheme 100% inspection is only used in

goods receipt and goods issue. The sample size is calculated from the actual quantity of the inspection

requirement and corresponds to it.

Sampling scheme SPC inspection: The sampling scheme "SPC inspection" nearly corresponds to the

"n-c" inspection plan. The only difference is that the acceptance limit "c" is not used in this case.

Sampling  scheme  batch  inspection:  In  the  standard  configuration,  the  sampling  scheme  "batch

inspection" only applies to the areas "goods receipt" and "goods issue". The percentage specifying how

much percent of the batch is to  be checked is entered here. Later in the inspection order characteristic

the sample size is calculated from the actual quantity of the inspection requirement and multiplied by the

specified percentage.

WEP-PPW_82.docx

Version: 1.1.23372

Page 30 of 182

Goods Receipt Inspection Planning

If you must calculate action limits, you must enter the expected sample size here.

Sampling  scheme  k-value  inspection:  With  the  k  value  inspection  the  entered  k  value  is  checked

against the calculated k value and if this value is violated the sample is rated "fail".

5.2  Control charts for variable characteristics

For variable characteristics, the charts xq, s and R are available.

In statistical quality assurance, production dispersion is used for many calculations. One example is the

calculation  of  capability  indices  and  action  limits  of  a  quality  control  chart.  Vice  versa,  if  you  have

specified a process capability index, you can estimate the production dispersion and calculate the action

limits on this basis.

The  specifications  for  the  calculation  of  limit  values  can  be  found  in  the  tab  "default  values  chart  1"  or

"default values chart 2", where values to estimate the  production dispersion can be entered. The action

and warning limits can be calculated on the basis of these specifications. However, it is also possible to

enter the production dispersion directly. The system provides three calculation options.

You  first  describe  the  specifications  using  the  xq  and  s  chart.  The  differences  with  the  R  chart  are

explained in more detail in the sections that follow.

There is often a specification for the process capability index cpk. This specification is reasonable. If the

process  capability  index  cpk  is  respected,  you  can  then  produce  pieces  within  the  range  of  tolerance.

Based on the specified cpk value, the system calculates internally an estimated value for Sigma, which is

entered  to  the  right  of  the  option  "Sigma"  for  information  purposes.  The  estimated  basic  value  that  has

been calculated is used to calculate the limit values of the xq/s chart. The calculation is performed, once

further data has been entered using the Calculate button. The calculation method "cpk" is set by default.

In addition, there are also the calculation methods "sigma" and "sq/an".

The  cpk  value  of  1,33  ensures  that  99.725%  of  the  characteristic  values  are  within  the  tolerance.

However, it is often required that 99.994% of the characteristic values are within the tolerance limit, which

corresponds to a cpk value of 1.67.

WEP-PPW_82.docx

Version: 1.1.23372

Page 31 of 182

Goods Receipt Inspection Planning

The  calculation  method  sq/an  means  that  an  estimate  of  the  standard  deviation  is  calculated  from  the

quotient of the medium standard deviation and a correction factor an. This correction factor depends on

the sample size, which is identified by the index n. The values for an are defined in the system and are

requested  automatically.  This  estimate  of  the  standard  deviation  is  best  in  case  that  there  is  no

specification  of  the  process  capability  index  and  the  production  dispersion  is  unknown  and  thus  the

specification  of  the  sq-value  has  still  to  be  corrected  by  a  correction  factor.  It  is  also  the  most  efficient

method under the given conditions.  You must specify  the sq-value to calculate the limit values later on.

Enter the value in the field on the right hand side of the option sq/an. If you click the button Calculate later

on, the estimate sq/an is calculated using the specified sq value. The result is entered on the right hand

side  of  the  option  Sigma for  information  purposes.  This  estimate  is  then  the  basis  for  the  calculation  of

action and warning limits of the xq/s chart

The third calculation method requires the specification of a sigma value. In this case it  is assumed that

sigma is known and consequently the correction factor is not required. Enter the Sigma value to the right

of the “sigma” option. In comparison to the previous method, sq/an is replaced by sigma. In the majority of

cases sigma is not known. Therefore, it is best to use the calculation method using the specified sq value

to automatically calculate the estimate sq/an for variances in case of doubt.

If  you  select  the  “relative  deviation  from  xq”  or  the  “deviation  from  xq  in  percent”  as  “specification  to

calculate limit values”, the input option for “action probability in %” disappears. Instead, you can enter the

“deviation from target value”. These values and the specified value of xq are then used to calculate the

limit values (target value, middle of tolerance, mean value of xbar chart, input).

Further details have  to be  made in order to identify action and  warning  limits of the xq chart.  You must

specify  an  xq  value.  The  system  offers  the  possibility  of  setting  the  xq  value  equal  to  the  middle  of

tolerance or the target value or of specifying a value manually. If the process is supposed to be aligned to

the mean value, the middle of tolerance should be preferred as xq value.

The  action  probability  must  be  entered  in  percent  in  order  to  calculate  action  and  warning  limits  of  the

xq/s-chart. For this purpose, you must first dedice, if you want to use one-sided or two-sided limit values

for the calculation. Selct one of the two options.

Once you have specified the option 'one-sided' or 'two-sided', enter the action probability in percent. The

possible and reasonable action probabilities are defined in the system and only need to be selected from

the list. For the xq-chart, the calculation is based on the standard distribution. For example, if 99.725% of

the characteristic values must be within the action limits, select the value 99.725. As the specification of a

sigma  area  is  commonly  used  by  some  users,  the  corresponding  sigma  area  is  displayed  with  the

respective action probability for information purposes.

If  warning  limits  are  also  to  be  calculated,  an  action  probability  must  be  entered  here.  Note:  The

probability value of the warning limit must be lower than the action limit value.

WEP-PPW_82.docx

Version: 1.1.23372

Page 32 of 182

Goods Receipt Inspection Planning

The sigma area is not displayed in the selection list, since the distribution of chi² is used to calculate the

limit values of the s-chart. Apart from that, the input is the same as for the xq chart.

If  you  save  the  specifications,  the  limits  are  calculated  –  if  the  Calculate  checkbox  has  been  enabled

before.

As already mentioned, the user can enter the limit values directly without any specified values.

If  the  R-chart  is  selected  instead  of  the  xq  or  s-chart,  the  option  sq/an  is  replaced  by  Rq/dn  in  the

specifications of the calculation. The estimate of sigma is now calculated using the specified mean range

R  divided  by  the  correction  factor  dn.  This  correction  factor  depends  on  the  sample  size  n.  The

corresponding values are defined in the system and are selected automatically. Apart from that, the rest

is the same as for the xq or s-chart. Note: In case of an R-chart, the calculation of the limit values is not

based on a chi² distribution, but on a table stored in the system, which is based on standardized ranges.

Notes:

  You can only use the calculation specifications "relative/percentage deviation from xq" if you use

an  xq  control  chart.  For  this  reason,  the  fields  of  the  group  "Xq"  are  only  visible,  if  you  have

previously selected the xq control chart.

  The user must select the confidence interval (one-sided/two-sided). Usually, you do not define a

lower limit for an s-chart. In this case, select "one-sided".



If only one of the two tolerance limits is available,  you cannot use the calculation method "cpk".

The calculation formula of the cpk method requires both tolerance limits.

5.3  Control charts for attributive characteristics

The p- and u-charts are available for attributive characteristics.

p identifies the proportion of defective units in the sample and u identifies the failures/defects per unit in

the sample. As to the p chart, it is important that each item is either defined as defect-free or defective. If

an item has several failures/defects it is only once referred to as defective.

In contrast to the variable characteristics, there are no lower limit values. Furthermore, it is normally not

necessary to state the values UTL, LTL and target value.

It is necessary to enter a pq or uq value in percent for the automated calculation of specifications. This

can be done in the default values tab.

If  you  save  the  specifications,  the  limits  are  calculated  –  if  the  Calculate  checkbox  has  been  enabled

before.

WEP-PPW_82.docx

Version: 1.1.23372

Page 33 of 182

Goods Receipt Inspection Planning

Calculation  is  respectively  based  on  normal  distribution.  The  value  99,725  has  to  be  selected  if,  e.g.

99,725% of the characteristic values are supposed to lie below the upper action limit. As the specification

of  a  sigma  area  is  commonly  used  by  some  users,  the  corresponding  sigma  area  is  displayed  with  the

respective action probability for information purposes.

5.4  Calculation of formulas

If  you store  a formula,  you can automatically calculate measured values  by  way of measured values or

statistical values of other characteristics that have been inspected before.

If the extension QMSingleValue.FormulaArguments is enabled, you have the possibility to use extensive

arguments  to  calculate  the  single  value  you  want  to  collect.  In  addition,  you  have  more  possibilities  to

access  specification  values  and  values  of  inspection  results  of  other  characteristics.  For  more  details,

refer to the section "".

If this extension is not enabled, you can only calculate characteristics using the inspection results of other

characteristics  that  have  already  been  entered.  Find  details  in  the  section  "Calculation  via  reference  to

other inspection results".

5.4.1  Operators, functions and constants

The following operators, functions and constants for calculating measured values are supported:

WEP-PPW_82.docx

Version: 1.1.23372

Page 34 of 182

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

Calculates the natural logarithm

Calculates the sine

Calculates the tangent

Calculates the arc sine

Calculates the cosine

Converts the value into an integer

Calculates the common logarithm

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

Constants

pi

e

Calculates the hyperbolic sine

Calculates the hyperbolic tangent

Reduces the value x to an integer value

Reduces the value x to y decimal places

Addition

Subtraction

Division

Multiplication

Calculates x to the power of y

3.141592654

2.718281828

If constant numeric values are used in  formulas, you must be careful not to use thousand separators. If

these  constants  are  floating  point  numbers,  be  careful  to  use  a  dot  as  decimal  separator  instead  of  a

comma.

WEP-PPW_82.docx

Version: 1.1.23372

Page 35 of 182

Goods Receipt Inspection Planning

5.4.2

Formulas referring to other inspection results

Formulas  including  a  reference  to  other  inspection  results  are  always  calculated  when  an  inspection

result referenced in the formula is created, changed or deleted.

For these characteristics,  you must first specify  the level of the formula calculation.  The following types

are available:

  V – Calculation on the level of single values (Value).

For  each  single  value  of  the  characteristics  involved,  one  single  value  is  generated  for  the

calculated characteristic.

  S - Calculation on the level of samples (Sample).

For each sample of the characteristics involved, exactly one single value is generated for the

calculated characteristic.

  C - Calculation on the level of characteristics (Criteria).

Exactly  one  single  value  is  generated  for  the  calculated  characteristic  (with  respect  to  the

overall statistic of all characteristics involved)

The actual formula follows this identifier (see previous chapter).

The following syntax applies for the variables identifying the single values or statistical values of the order

characteristics involved [x:y:z].

The x parameter identifies the statistical value to be used. The available values are listed below. Please

bear in mind that the calculation level might cause restrictions.

  X – Single value

(is only available for calculations on the level of single values)

  AVG – Mean value

(is only available for calculations on the level of samples or characteristics)

  MIN – Minimum

(is only available for calculations on the level of samples or characteristics)

  MAX – Maximum

(is only available for calculations on the level of samples or characteristics)

WEP-PPW_82.docx

Version: 1.1.23372

Page 36 of 182

Goods Receipt Inspection Planning

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

  SENO – identification via the OP sequence of the characteristic (serial number)

  INCR – Identification via the characteristic number (inspection criteria)

If the characteristic number is not unique  within the  inspection requirement, it  is not predictable

which one of the applicable characteristics is used at the time of calculation.

The  parameter  z  identifies  the  characteristic  using  the  field  content  defined  by  parameter  y.  Either  the

OP  sequence  or  the  characteristic  number  of  the  calculation  source  is  entered  in  this  field.  If  the

characteristic  number  includes  a  space  character,  it  should  be  replaced  by  an  underscore  within  the

formula.

Example 1:

A  new  characteristic  is  calculated  from  the  single  values  of  the  characteristic  assigned  to  the

number "LENGTH”/”LAENGE" divided by 2.5. A corresponding single value is supposed to be

calculated  for  each  single  value  of  the  source  characteristic  (calculation  on  the  level  of  single

values).

 Formula: V: [X:INCR:LAENGE] / 2.5

WEP-PPW_82.docx

Version: 1.1.23372

Page 37 of 182

Goods Receipt Inspection Planning

Example 2:

The  characteristic  "surface"  results  from  the  product  of  the  characteristics  with  the  characteristic

number  “LENGTH”/”LAENGE”  and  “WIDTH_TOTAL”/”BREITE_GES”.  A  single  value  of

the  characteristic  "surface"  is  supposed  to  be  calculated  for  each  single  value  of  both  source

characteristics (calculation on the level of single values).

 Formula: V: [X:INCR:LAENGE] * [X:INCR:BREITE_GES]

Example 3:

The  characteristic  "maximum  margin  width"  results  from  the  subtraction  of  the  minimum  of  the

characteristic "inside diameter" (OP sequence 10) from the maximum of the characteristic "outside

diameter"  (OP  sequence  20).  A  single  value  of  the  characteristic  "maximum  margin  width"  is

supposed to be calculated for each sample of both source characteristics (calculation on the level

of samples).

 Formula: S: [MAX:SENO:20] - [MIN:SENO:10]

For the calculation of formulas including references to other inspection results,  it is allowed to calculate

new  formula  characteristics  that  are  based  on  calculated  formula  characteristics.  However,  this  nesting

may  not  have  more  than  10  references  one  below  the  other.  Furthermore,  double  concatenations  must

not  be  created  (Example:  characteristic  A  is  calculated  from  characteristic  B  and  characteristic  C;

characteristic C is calculated from characteristic A).

5.4.3  Extended formulas

The extended formulas provide the following advantages compared to the formulas including references

to other inspection results:

  You can enter arguments for these characteristics that are used to calculate the measured value.

In most cases, you do not need to use other "source characteristics".

  On  saving  the  inspection  result,  the  measured  value  is  calculated  and  is  immediately  available.

You do not need to refresh the measured values in the AIP to see the measured values.

  For the calculation,  you can optionally use single values or sample or characteristic statistics of

other characteristics. You may combine these in any way.

  You can use variables for the target value, the upper and the lower tolerance limit of the current

characteristic or of other characteristics in the formula.

For this reason, you should primarily use the extended formulas.

WEP-PPW_82.docx

Version: 1.1.23372

Page 38 of 182

Goods Receipt Inspection Planning

The  following  syntax  applies  for  the  variables  identifying  the  single  values,  statistical  or  specification

values of the order characteristics involved [x:y:z].

The  x  parameter  identifies  the  statistical  value  to  be  used.  The  available  values  are  listed  below.  Note:

Depending  on  the  respective  shop  floor  client  used,  it  is  possible  that  not  all  10  argument  fields  are

available.

  VAR1 – Argument 1 of the inspection result of the own inspection step characteristic

  VAR2 – Argument 2 of the inspection result of the own inspection step characteristic

  VAR3 – Argument 3 of the inspection result of the own inspection step characteristic

  VAR4 – Argument 4 of the inspection result of the own inspection step characteristic

  VAR5 – Argument 5 of the inspection result of the own inspection step characteristic

  VAR6 – Argument 6 of the inspection result of the own inspection step characteristic

  VAR7 – Argument 7 of the inspection result of the own inspection step characteristic

  VAR8 – Argument 8 of the inspection result of the own inspection step characteristic

  VAR9 – Argument 9 of the inspection result of the own inspection step characteristic

  VAR10 – Argument 10 of the inspection result of the own inspection step characteristic

  X – Single value of another characteristic

  AVG – Mean value of the sample of another characteristic

  MIN – Minimum of the sample of another characteristic

  MIN – Maximum of the sample of another characteristic

  SUMX – Sum of the single values of the sample of another characteristic

  R – Range of the sample of another characteristic

WEP-PPW_82.docx

Version: 1.1.23372

Page 39 of 182

Goods Receipt Inspection Planning

  S – Standard deviation of the sample of another characteristic

  SREL – Relative standard deviation of the sample of another characteristic

  N – Sample size of another characteristic

  AVG_ALL – Mean value of all samples of another inspection step characteristic

  MIN_ALL – Minimum of all samples of another inspection step characteristic

  MAX_ALL – Maximum of all samples of another inspection step characteristic

  SUMX_ALL – Sum of the single values of all samples of another inspection step characteristic

  R_ALL – Range of all samples of another inspection step characteristic

  S_ALL – Standard deviation of all samples of another inspection step characteristic

  N_ALL – Total sample size of all samples of another inspection step characteristic

  M_ALL – Number of samples of another inspection step characteristic

  TV – Target value of an inspection step characteristic

  UTL – Upper tolerance limit of an inspection step characteristic

  LTL – Lower tolerance limit of an inspection step characteristic

The  y  parameter  describes  how  the  corresponding  characteristic  is  supposed  to  be  identified.  The

following possibilities are available:

  SENO – identification via the OP sequence of the characteristic (serial number)

  INCR – Identification via the characteristic number (inspection criteria)

If the characteristic number is not unique  within the  inspection requirement, it  is not predictable

which one of the applicable characteristics is used at the time of calculation.

WEP-PPW_82.docx

Version: 1.1.23372

Page 40 of 182

Goods Receipt Inspection Planning

The characteristic number must not include any special characters. A minus sign "-" is

not permitted, for example.

  SELF – Identification of the own calculated characteristic

The characteristic that is to be calculated identifies itself. Only in this case, the parameter z is not

required.

Note: You may only use the identification of the own characteristic for the argument fields and for

the target value and the tolerance limits.

The  parameter  z  identifies  the  characteristic  using  the  field  content  defined  by  parameter  y.  Either  the

OP  sequence  or  the  characteristic  number  of  the  calculation  source  is  entered  in  this  field.  If  the

characteristic  number  includes  a  space  character,  it  should  be  replaced  by  an  underscore  within  the

formula.

Example 1:

The measured value of the current characteristic is calculated from the sum of the argument fields

1 to 4.

 Formula: [VAR1:SELF] + [VAR2:SELF] + [VAR3:SELF] + [VAR4:SELF]

Example 2:

The characteristic is the result of the product of the maximum measurements of the inspection step

characteristics  with  the  characteristic  numbers  'LAENGE’  and  'BREITE_GES’  ('LENGTH'

and 'WIDTH_TOTAL').

 Formula: [MAX_ALL:INCR:LAENGE] * [MAX_ALL:INCR:BREITE_GES]

Example 3:

The measured value is calculated from the sum of the following three summands:

  Content of argument field 1

  Middle of the tolerance of the current characteristic

  Sample mean value of the characteristic with OP sequence 10

  Formula:  [VAR1:SELF]  +  (([UTL:SELF]  +  [LTL:SELF])  /  2)  +

[AVG:SENO:10]

Note the following when using extended formulas:

WEP-PPW_82.docx

Version: 1.1.23372

Page 41 of 182

Goods Receipt Inspection Planning

  Contrary  to  the  formulas  including  references  to  other  inspection  results,  the  measured  values

are not calculated when the "source characteristics" are changed. The measured values are only

calculated, if the inspection result of the respective calculated characteristic is explicitly collected

or changed (e.g. via the argument fields).

  When  the  inspection  result  is  saved,  the  system  must  be  able  to  identify  valid  values  for  all

variables  used  in  the  formula  (single  values,  sample  or  characteristic  statistics,  specification

values of other characteristics, all used arguments).

Otherwise, an error message occurs and the inspection result is not saved.

  You cannot directly edit the calculated measured value. The measured value is always the result

of a calculation.



If  you  use  the  parameter  [X:…],  the  respective  single  values  of  other  characteristics  are

searched for using the absolute single value and sample number. For the current characteristic,

the parameter [X:…] is not available.



If  you  use  the  statistical  parameters  [MAX:…],  [MIN:…],  [AVG:…],  [SUMX:…],  [R:…],

[S:…] , [SREL:…] or [N:…], the respective statistical values are searched for using the

absolute sample number. Here, you cannot use statistical parameters of the own characteristic.



If you want to use the statistical parameters of the complete characteristic using the parameters

[MAX_ALL:…],

[MIN_ALL:…],

[AVG_ALL:…],

[SUMX_ALL:…],

[R_ALL:…],

[S_ALL:…], [M_ALL:…] or [N_ALL:…], only the data of other characteristics is available

(not the data of the own characteristic).

  Via  customization,  extensions  can  be  made  available

to  obtain  any  variables

in

the

syntax[VAR:<Object>:<Identifier>].

  You cannot use characteristics that include extended formulas as sources to calculate formulas

including  references  to  other  inspection  results.  But  you  can  use  these  characteristics  for  other

characteristics with extended formulas.

5.4.4  General notes on calculated characteristics

If  unknown  variables  are  used  within  a  formula  (faulty  parameters  x  and/or  y),  the  escalation

CPAUMW.CALCULATED_CRITERIAS_GET_VARIABLE_VALUE is triggered.

If  problems  occur  on  assigning  an  identified  value  to  a  variable  of  the  formula,  the  escalation

CPAUMW.CALCULATED_CRITERIAS_SET_VARIABLE is triggered.

Both actions described require the escalation management license.

Tool numbers, machine numbers, cavity numbers or similar information are not stored for the calculated

single values.

WEP-PPW_82.docx

Version: 1.1.23372

Page 42 of 182

Goods Receipt Inspection Planning

To  transfer  a  corresponding  number  (batch  number,  sample  number,  serial  number,  etc.),  all  source

samples of the calculation must be assigned the same number. If there is no number that is assigned to

all source samples, you cannot assign a number to the calculated sample. If several numbers are found

that have been assigned to all source samples, only the first number found is assigned to the calculated

sample.

This function only applies to numbers, which have been assigned on sample level.

5.5  Last off inspection

As part of the function extension for the in-production inspection, the function of the last off inspection is

available.  For  this  function,  you  must  have  created  the  CAQ  system  option  1222  manually  as  a

precondition.  For  details,  refer  to  the  procedure  document  "Configuration_QM_Options.pdf".  The

documentation  of  the  CAQ  system  option  specifies  which  characteristic  user  fields  must  be  created

(master data characteristic, inspection plan characteristic and inspection step characteristic), so that you

can specify a characteristic for a last off inspection.

To  specify  a  characteristic  for  a  last  off  inspection,  the  user  field  of  the  last  off  inspection  must  have  a

content.

The  function  "Last  off  inspection"  is  not  offline  capable.  And  you  cannot  use  the  last  off

inspection with operations that are specified as Inspection OP via processing code.

If the operation is  logged off or interrupted in  offline  mode, the  buffered activities/postings are

processed  one  after  the  other  when  the  online  mode  is  restored.  This  has  the  effect  that  the

operation is logged off or interrupted although the last off inspection is missing.

The processing code generally defines if any check for a defined last off inspection is performed

at all during logoff/interruption. If the processing code in tab Quality is set to Inspection OP, no

check and no last off inspection is performed.

If an inspection step has been "logged on" with the logon of an operation on the AIP, the system

proceeds as follows for the last off inspection when the operation is logged off or interrupted.

1.  The system checks if an inspection point with cause for creation Last off inspection exists for this

inspection step at the workplace in question. It does not matter if the inspection point is

completed or not. If the check is also performed with an interruption, the system checks if an

inspection point with cause of creation Last off inspection has been created since the last logon.

If an inspection point is found, the operation is interrupted or logged off.

2.

If no inspection point is found in item 1, the system checks if the relevant inspection step logged

on includes characteristics with the inspection due date Last off inspection. If this is not the case,

the operation is logged off or interrupted.

WEP-PPW_82.docx

Version: 1.1.23372

Page 43 of 182

Goods Receipt Inspection Planning

3.

If the processes described in item 1 and 2 have the result that an inspection point must be

created with the cause of creation Last off inspection, the following message is shown:

Last off inspection is missing!

Enforce posting using the option "posting required"?

Using the option Posting required, you can perform the logoff/interruption without having made a

last off inspection. Use the CAQ system option 1154 to activate the logoff/interruption using the

option Posting required.

4.

If the operation is not logged off or interrupted because of the missing inspection point with the

cause of creation Last off inspection, you must go to the inspection to create an inspection point

with the cause of creation "Last off inspection". You can use the option Last off inspection in the

inspection list on the level Inspection step to create an inspection point with cause of creation

Last off inspection.

If you try to log off or interrupt the operation that includes an inpsection point with cause of creation  Last

off inspection that has not been completed, the standard processes apply. This means that the operation

can  optionally  be

logged  off  or

interrupted  although

the

last  off

inspection  has  not  been

performed/completed using the option "Posting required".

WEP-PPW_82.docx

Version: 1.1.23372

Page 44 of 182

Goods Receipt Inspection Planning

6  Specification List

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 45 of 182

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 46 of 182

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 47 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 48 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 49 of 182

Goods Receipt Inspection Planning

"Chart 1/2" tab

 Go to

The  fields  included  in  the  "chart  1/2"  tab  correspond  to  those  of  the  characteristic master  data  and  are

described in the documentation MOC_CharacteristicsQm.

Default values chart 1/2

 Go to

The fields included in the "default values chart 1/2" tab correspond to those of the characteristic master

data and are described in the documentation MOC_CharacteristicsQm.

WEP-PPW_82.docx

Version: 1.1.23372

Page 50 of 182

Goods Receipt Inspection Planning

Editing functions

The following dialog opens to edit a data record:

Toolbar

The below-mentioned additional functions are available besides the standard functions.

  Activate

Function authorization: sclq.active

Activates a specification list entry. A previously released version is automatically deactivated.

WEP-PPW_82.docx

Version: 1.1.23372

Page 51 of 182

Goods Receipt Inspection Planning

 Deactivate

Function authorization: sclq.release

Deactivates a specification list entry. The specification list entry is no longer used.

WEP-PPW_82.docx

Version: 1.1.23372

Page 52 of 182

Goods Receipt Inspection Planning

7  Workplace and Resource Configuration

Overview

HYDRA menu

Master data  Resources  Resource configuration

Master data  Workplaces/machines  Workplace configuration

FEDRA menu

Detailed Scheduling  Master data  Resource configuration

Transaction code

res

Function authorization  mdres

mdresgenh for fields in combination with Test Equipment Management

Available user fields

Where?

Object type/user field key

Source (type)

Tab User fields

<Res.type*)>/depending  on  data
record

Resource (MF-D)

Table

RES/SYSTEM

Resource (MF-D)

*) <Res.typ> = resource type

The resource configuration is the central function to manage resources in the MES.

Purpose

This  application  manages  the  master  data  of  workplaces/machines  and  other  resources  (tools,  DNC

resources,  etc.).  The  resource  type  classifies  resources.  Each  resource  type  is  also  linked  to  specific

functions and applications, which provide further functionalities of the MES for resources of the specified

type.

Integration

Use  this  application  to  view  the  resource  information  of  all  resource  types  available  in  the  system. The

resource type also specifies how and if data records can be edited. Depending on the resource type, you

cannot edit all fields or create and delete all resources.

Based  on  the  resource  type,  the  MES  also  includes  further  applications  that  are  especially  tailored  to

these types. The machine data collection application package, for example, is based on resources of the

type "machine".

In addition to the resource configuration, the  resource overview application is available. You cannot use

the resource overview application to edit  data. This application only allows administrative  operations for

the daily handling of resources such as the stock transfer of resources.

WEP-PPW_82.docx

Version: 1.1.23372

Page 53 of 182

Goods Receipt Inspection Planning

Requirements

Create  a  year  model/shift  calendar  prior  to  creating  a  workplace  or  machine.  If  you  want  to  use  the

various resource types effectively, you also need the advanced licenses for these types.

Selection criteria

The application provides the following selection criteria:

Resource from ... to ...

This selection criterion refers to the resource. You can also use wildcards (placeholders *).

Short name

Short name of the resource. Only relevant for resources of type MNR.

Resource type

Type of resource.

Workplaces  and  machines  always  have  the  resource  type  MNR.  But  you  can  assign  individual

resource types to the other resources by configuration. Predefined resource types include:

DNC

NC/DNC program

DOC

Document

ENE

Energy meter

ENT

Removal device

ENT

Removal device

MNR  Workplace/Machine

PAC

Packaging, transportation container

PRM

Test and measuring equipment

PER

Production staff / general

PRU

Setup staff

TEM

Tempering equipment

VOR

Device

WNR

Tool

We recommend using the predefined resource types.

The displayed detail resource information varies with the resource selected in the table

overview.

Name

Name of the resource.

WEP-PPW_82.docx

Version: 1.1.23372

Page 54 of 182

Group

Workplace/machine group of the resource. Only relevant for resources of type MNR.

Goods Receipt Inspection Planning

Cost center

Cost center of the resource.

Short name

Short name of the resource.

Resource family

Family the resource is assigned to.

Responsibility area

Responsibility area the resource is assigned to.

Storage location

Regular storage location of the resource.

MD user fields

MD  user  fields  1-  6  of  the  resource.  If  you  select  a  resource  family  in  the  selection  panel,  the

application shows the field names according to the assigned user field definition.

Field descriptions

This detail application includes four main tabs:

-  Resource configuration

-  Resource list

-  Resource attributes

-  DNC versions

Main tab Resource configuration

Here, you can define the configurations and master data of resources.

General tab

Resource type

Resource type of the resource. The system delivery includes some default resource types. Create

additional resource types in the application .

Resource

Enter the number of the resource or workplace to be collected in this field.

The  resource  type  also  specifies  the  maximum  number  of  characters  that  are  allowed  for  the

resource number:

WEP-PPW_82.docx

Version: 1.1.23372

Page 55 of 182

Goods Receipt Inspection Planning

-  Resources of the type MNR: a maximum of 8 digits

-  Resources of a type <> MNR: a maximum of 20 digits

Permitted  characters:  ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_.-+#.  Do  not  use

spaces  and  other  special  characters.  For  technical  reasons,  you  can  enter  *  (asterisk)  and  %

(percent), but they are nonetheless not permitted because they are not valid characters. When you

exit the input field, the system automatically converts lower case letters into CAPITAL LETTERS.

Please note for workplaces/machines (resource type MNR):

For  technical  reasons,  the  system  does  not  check  the  maximum  number  of  digits  allowed  for

resources  of  the  type  MNR.  For  this  reason,  make  sure  that  the  resource  number  length  (=

workplace/machine number) does not exceed 8 digits.

Please note: If you set the resource type MNR before entering the resource ID (machine number),

the GUI only allows you to enter eight digits.

If  you  select  the  option  "numeric  machine  number"  (basic  parameter  settings)  for  use  with  DOS

terminals, you must ensure that the resource number (= workplace/machine number) only includes

numerical  digits  and  that  its  length  is  exactly  8  digits.  If  necessary,  prefix  leading  zeroes  to  the

number to extend it to eight digits, when creating the workplace/machine.

Short name

Short  name  of  the  resource.  Only  use  this  field  with  workplaces/machines  (resources  of  the  type

MNR).

Name

Use this field to assign a short, unique name to each resource. Reports and overviews as well as

terminal dialogs show this name, which is also useful for orientation purposes.

Responsibility area

Use  responsibility  areas  to  restrict  the  data  users  can  view  in  different  evaluations/reports.  Users

can only view the data they are allowed to according to their responsibility area authorization.

The responsibility area field can also remain empty. In this case, the resource is always displayed

regardless of the user's assigned responsibility authorizations.

If you leave the responsibility area field empty, the system automatically enters the value

"--DEFAULT--"  in  the  field.  Resources  including  this  value  are  always  displayed

regardless of the user's assigned responsibility authorizations.

Cost center

This field includes the cost center the resource is assigned to.

Inventory number, engraving number, drawing number, manufacturer, owner

Additional information in form of comments.

WEP-PPW_82.docx

Version: 1.1.23372

Page 56 of 182

Goods Receipt Inspection Planning

Acquisition date, acquisition costs

Additional information in form of comments.

Configure the currency for the entire system in the basic settings.

Storage location

Location where the resource is stored when it is not being used (original storage location).

In connection with the Material and Production Logistics (MPL) product group, this field specifies a

material buffer. If you log on an input batch, the logged on input batch(es) will be transferred from

the previous material buffer to the material buffer entered in this field (upstream of the machine).

Delivery date, start-up date, guarantee date

Additional  information  in  form  of  comments.  These  fields  are  only  available  if  Test  Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

External designation, resource type designation, usage, purchase order number

Additional  information  in  form  of  comments.  These  fields  are  only  available  if  Test  Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

Supplier and party in charge including detail fields

Additional  information  in  form  of  comments.  These  fields  are  only  available  if  Test  Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

Workplace configuration tab

This tab is only available if you select a resource of the type "MNR".

Workplace master data

Workplace category

N  Machine

P   Workplace

Defined  as  machine  or  workplace.  If  you  exclusively  use  BDE  and/or  MDE  and  PDV,  the  two

categories are identical as regards processing.

J   Machining center (BDE-BEA only)

The  "Machining  center"  category  and  its  functionality  are  described  in  detail  in  the  BDE-BEA

product documentation.

L

Line (MDE-SFL only)

A   Aggregate (MDE-SFL only)

The categories "Aggregate" and "Line" and their functions are described in detail in the MDE-SFL

product documentation.

Q  CAQ inspection station

Workplace is defined as mere CAQ inspection station and does not affect BDE or MDE statistics.

WEP-PPW_82.docx

Version: 1.1.23372

Page 57 of 182

Goods Receipt Inspection Planning

R  Coil-based manufacturing (only for coil-based manufacturing)

This type controls specific functions for the coil-based manufacturing.

S  Cutting unit (only for coil-based manufacturing)

This type controls specific functions for the coil-based manufacturing.

D  Parallel output batches (only MPL)

You can produce parallel output batches on the machine for an operation that requires batch

management.

C  Packing station (only MPL)

You can use specific posting functions of the machine to represent a packing station. The functions

are described in detail in the AIP-LCS product documentation.

M  Melting aggregate

This option defines a machine as melting aggregate in terms of composition.

F      Laboratory/in-production inspection

This workplace is configured as inspection station. The inspection points are displayed, which are

assigned  to  this  workplace  or  machine  group  of  this  workplace  because  of  the  higher-level

inspection  point.  You  must  activate  the  workplace-specific  layout  here.  Use  the  following

parameters for activation in the AIP layout file "globaldefines.xml".

<MachineSpecifiedLayout>True</MachineSpecifiedLayout>

W     Goods receipt inspection

This workplace is configured as inspection station. The goods receipt inspection points are

displayed, which are assigned to this workplace or machine group of this workplace. You must

activate the workplace-specific layout here. Use the following parameters for activation in the AIP

layout file "globaldefines.xml".

<MachineSpecifiedLayout>True</MachineSpecifiedLayout>

K     Calibration

This workplace is configured as inspection station. The calibration inspection points are displayed,

which are assigned to this workplace or machine group of this workplace. You must activate the

workplace-specific layout here. Use the following parameters for activation in the AIP layout file

"globaldefines.xml".

<MachineSpecifiedLayout>True</MachineSpecifiedLayout>

Workplace type

E  Single workplace (SWP)

G  Group workplace (GWP)

WEP-PPW_82.docx

Version: 1.1.23372

Page 58 of 182

Goods Receipt Inspection Planning

Group workplaces are workplaces without machine data collection or MDE evaluations.

In  case  of  group  workplaces,  you  cannot  post  to  resource  performance  accounts  in  an

operation-related manner with postings based on the current machine status. Only main

production  times  (RPA  11)  are  recorded.  You  must  define  a  status  with  the  control

indicator "production" in the .

The system does not generate  for group workplaces. Therefore, MDE evaluations that

evaluate MDE log records are not possible.

Like single workplaces, you can assign group workplaces to terminals. In this case, you

have to make sure that the  is set to operation mode "BDE" or the option  Processing is

set to "BDE processing" in the .

External workplace

This field identifies external workplaces. Currently, it only functions as a comment.

Locked

If  this  option  is  checked,  the  machine/workplace  has  been  (logically)  deleted.  In  this  case,  the

system does no longer permit the following changes:

- Order postings on the terminal

- Order postings on the MOC (e.g. using the "order overview" function)

- Changes when editing events

The  graphic  planning  board  of  the  Shop  Floor  Scheduling  and  the  application  Workplace

assignment do no longer show the machine/workplace.

Blocked  machines/workplaces  are  shown

in  evaluations  and  overviews.

If  blocked

machines/workplaces  are  not  shown,  this  is  then  described  in  the  relevant  documentation  of  the

MOC application.

Tip:  In  applications  where  data  is  selected  according  to  the  responsibility  area  authorization,  you

can hide machines/workplaces if you remove the responsibility area.

Company

Use this field to differentiate the individual machines/ workplaces. The system can use this field for

evaluation purposes.

Group

Use  this  field  to  assign  the  workplace/machine  to  a  logical  group.  In  planning,  this  is  a  capacity

group. Capacity groups combine primary capacities.

If  you  create  a  new  workplace,  it  is  automatically  assigned  to  a  group  of  the  same  name  (menu

BDE: Master data > Workplaces/machines > Groups), which is defined as a capacity group. If the

capacity group does not  yet exist, the system automatically creates a capacity  group and assigns

the workplace.

WEP-PPW_82.docx

Version: 1.1.23372

Page 59 of 182

Goods Receipt Inspection Planning

Category

Enter the category of the machine. By means of this, you can enable a validation check according

to  the  BDE  configuration:  Master  data  >  Order  configuration  >  Order  types,  tab  validation,  option

Check planned workplace/group/category on OP logon (value category).

Year model

Enter a valid year model . The times to be posted are compared with this shift model when they are

recorded.  If  you  have  not  defined  a  planned  year  model  in  the  HLS  tab,  the  shift  model  entered

here is also used in the Shop Floor Scheduling.

Standard rate, machine

Enter the arithmetical standard rate of machines for calculations. The Shop Floor Scheduling uses

this value for some (evaluated) KPIs.

Standard labor rate

Enter  the  arithmetical  standard  labor  rate  for  calculations.  The  Shop  Floor  Scheduling  uses  this

value for the KPI "Evaluated labor utilization".

Performance level

You  can  enter  the  performance  level  of  the  workplace/machine  in  percent  in  this  field.  The  Shop

Floor Scheduling and the evaluation of material requirements integrate this value when calculating

the remaining run time.

Incentive wage indicator

Defines the type of calculation used for incentive wages. This option is mostly used in combination

with  the  incentive  wages  based  on  formulas  for  customer-specific  configurations.  In  addition,  use

the  "incentive  wage  indicator"  as  selection  criterion  for  the  wage  type  determination  to  calculate

incentive wages.

Leave this field empty, if you do not use the incentive wage module.

The incentive wages indicator G=group calculation has a special meaning. If this option is set for a

workplace/machine, you have to assign a premium group every time you log on an order. You can

do

this

either

via

-  the  "assignment  of  premium  groups"  option  of  the  product  group  Incentive  wages  or,  optionally,

via

- an additional field in the terminal dialog for the logon of orders. If no assignment is available, the

system rejects the logon of the order by issuing a validation error.

Therefore,  you  may  only  assign  the  incentive  wage  indicator  G  =  Group  calculation,  if  the

group premium conditions are met in the  incentive wages calculation, as otherwise orders

can no longer be logged on!

You can specify the meaning of the other incentive wage indicators according to your requirements

while customizing the system.

WEP-PPW_82.docx

Version: 1.1.23372

Page 60 of 182

Goods Receipt Inspection Planning

File

You can assign a  graphic to each machine/workplace. The  workplace  overview  or the  AIP shows

this  graphic,  for  example.  The  following  image  formats  are  supported:  jpg,  gif,  tif,  bmp,  ico,  emf,

wmf.

In the path configuration, you must have configured the following:

- the path ID "MOCWPIMG" for the MOC or SMA

-  the  path  ID  “HYDRA”  (also  see  )  for  the  AIP.  The  file  name  length  of  graphic  files  is

restricted  to  12  characters  (8.3  notation).  Note  for  Linux  installations:  only  use  lower

case letters for file names.

Maximum capacity (KG)

If a machine is configured as melting aggregate, define the maximum capacity in KG here.

Accuracy class, unit, etc.

  Information  fields  in  order  to  describe  the  accuracy.  These  fields  are  only  available  if  Test

Equipment  Management  (PMV-PPK  or  PMV-SVP)  is  licensed  and  the  right  "mdresgenh"  is

assigned.

Data collection

Display 3rd list

Use the options described here to show/enable a third list in the main view of a Windows terminal

(CTWIN / AIP). You can switch between the respective terminal lists depending on the options set.

The following settings are possible. Please note that the contents displayed in the lists depend on

the product group in use:

 Input material (MPL): shows logged on input materials/ batches.

 Resources (WRM): shows logged on resources and tools.

 Staff (BDE): shows logged on staff.

Output material (MPL): Produced output batches are displayed.

Show material/PRT list when OP is logged on

This option is only relevant in connection with the WRM module and the resources logged on to the

Windows terminals (CTWIN / AIP).

If this option is set and you log on an OP, a specific login dialog opens. This dialog includes a list of

components/production resources and tools. This list shows resources that meet at least one of the

following requirements:

- the option "posting to terminal" is set in the resource type;

- the option "log on with OP" is set to "explicit logon" for the resource.

- the resource is a so-called "required resource" (option is set for the resource).

Please note: If the workplace is relevant for MPL, the list also shows material components.

WEP-PPW_82.docx

Version: 1.1.23372

Page 61 of 182

Goods Receipt Inspection Planning

Sequencing list

This  option  defines  which  operations  are  displayed  in  the  sequencing  list  of  the  terminal.  The

following settings are available:

S

Basic  setting.  The  system  takes  the  value  from  the  option  of  the  same  name  in  the

HYDRA basic settings.

M

Pool  of  workplaces.  The  terminal  sequencing  list  only  shows  the  operations  planned

for the workplace.

G

Pool  of  workplaces  and  groups.  The  terminal  sequencing  list  shows  operations  that

are:

- planned for the current workplace or

- for another workplace of the group or

- that are still located in the pool of groups.

K

Pool  of  workplaces  and  categories.  The  terminal  sequencing  list  only  shows  the

operations that are planned for workplaces of the selected category.

H

Group control. The terminal sequencing list shows the operations that are

- planned for the current workplace or

- for another workplace of the group.

Number of OPs in sequencing list

Enter the maximum number of operations that are to be displayed in the terminal sequencing list.

Enter 0 if you want to show all operations.

Compulsory sequence

Use  this  option  to  specify  if  it  is  mandatory  to  log  on  the  OPs  in  the  planned  sequence.  The

following parameters are permitted:

N

J

Disabled

Enabled

If the parameter is "enabled" and you log on an OP, the system checks whether the order backlog

for this machine/workplace includes an OP that is planned for the same time or previous to this OP,

but has not yet been started (i.e. status  = V/prepared). If yes, the system rejects the logon of this

OP.

Note:  If  you  plan  orders  in  the  system  using  the  Order  sequencing  (menu  Production  control  

Production  support    Order  sequencing)  and  you  configure  the  sequencing  list  with  any  other

option than "M" (pool of workplaces) and you enable the compulsory sequence, this might lead to a

combination that does not make sense.

Please note for the sequencing list:

WEP-PPW_82.docx

Version: 1.1.23372

Page 62 of 182

Goods Receipt Inspection Planning



If the sequencing list includes operations that are in the status "interrupted", you can log on

these OPs at any time, irrespective of the specified compulsory sequence.

Dialog control

To meet this requirement, define a dialog control that deviates from the standard behavior for the

workplace in the dynamic dialog configuration of the Windows terminal (CTWIN / AIP). Then refer to

the dialog control in the dialog.

Use this configuration only as part of customizing the HYDRA system. Otherwise the configuration

is not relevant.

Logon of several OPs

Select this option, if several different operations should be processed on the machine. Otherwise,

the system only allows one operation to be logged on to the machine.

Possible values:

Y

Log on as many OPs as required at the same time.

Please note: The system allows a maximum of 20 operations to be logged on

simultaneously  to  a  machine,  if  the  machine  is  assigned  to  a  terminal  with

operation  mode  MDE.  If  more  than  20  operations  must  be  logged  on  at  the

same time, MPDV must review the conditions in order to remove the limitation.

If MPDV  agrees to remove the limitation,  you can do  so, otherwise search for

alternative solutions. MPDV analyzes the conditions as part of a service.

N

You can log on one OP only.

1...9

You can log on a maximum of n OPs.

Posting

Quantity posting to staff

Use this function to post the quantity of order interruptions/logoffs to the person who is logged on

for the longest period.

Detailed information about quantity posting to staff can be found .

Posting for OPs that are not logged on

Use this option if you want to

- interrupt

- finish

- report part quantities for

operations that are not logged on to this workplace.

WEP-PPW_82.docx

Version: 1.1.23372

Page 63 of 182

Goods Receipt Inspection Planning

If  you  record  quantities  for  an  operation  that  is  not  logged  on,  the  system  posts  these

quantities  onto  the  operation  in  the  BDE  module.  The  MDE  module  does  not  post  the

quantities.

If you want to use this function with the AIP terminal, the BDE posting dialogs that are installed by

default require the following:

- use the simplified BDE posting dialogs (the so-called "") or

- customize the dialogs.

Then you will be able to enter an operation that is not logged on.

Posting of machine time with simultaneously logged on operations

If  this  option  is  set  and  OPs  are  logged  on  simultaneously,  the  system  posts  the  machine  time

proportionately onto the operations.

Y

N

V

Z

Proportionate posting on OP according to the number of OPs

No proportionate posting. If the option is not set, the complete machine time is
posted for each operation.

According to the default quantity of the OPs. Make sure that the default quantity
(target quantity in primary quantity unit) of the operation is > 0.

According  to  the  standard  time  of  the  OPs.  Make  sure  that  the  standard  time
(processing time) of the operation is > 0.

Please note:

This  option  is  also  evaluated  for  group  workplaces  and  in  general  you  should  better  not  use  this

option for group workplaces.

Automatic logoff of staff when shift ends

This option is only relevant, if you set an "X" for (enable) the option of the same name in the order

type.

Use  this  option  to  configure  the  personnel-related  data  collection  at  MDE  workplaces.  If  you  use

HYDRA  MDE,  the  terminals  can  generate  fully  automatic  shift  ends.  You  can  configure  here  if

- the staff logged on to the workplace should be logged off automatically at the end of the shift or

- if they should remain logged on.

Y

N

X

Always log off staff when the shift ends.

Always save staff when the shift ends except for manual logoff.

Evaluate the person's settings. The system searches for the corresponding settings

of the person .

Automatic OP posting when shift ends

This option is only relevant, if you set an "X" for (enable) the option of the same name in the  order

type.

WEP-PPW_82.docx

Version: 1.1.23372

Page 64 of 182

Goods Receipt Inspection Planning

Y

N

Interrupt and log on again at beginning of shift

Interrupt

Shop Floor Scheduling

Find further information about the HLS product group in the relevant HLS documentation.

Planning function

This  option  specifies  whether  a  workplace  or  a  machine  will  be  displayed  and  if  so,  in  which

planning function.

P

H

T

A

N

Planning  in  the  graphic  planning  board  of  the  Shop  Floor  Scheduling  or  in  the  graphic
order sequencing (GAV), i.e. you plan the workplace via the Shop Floor Scheduling or the
graphic order sequencing; the workplace is then displayed in these applications, but not
in the tabular order sequencing (AVG).

Note: There are also other settings that specify  whether a  workplace is displayed in the
Shop Floor Scheduling or in the graphic order sequencing:
- the workplace must be assigned to a group identified as a "capacity group"
- you must be authorized for the responsibility area of this workplace
- planning profile

Only relevant, if you use the HYDRA Shop Floor Scheduling module (HLS).

Like P.

Reserved

Planning  in  the  tabular  order  sequencing  (AVG),  i.e.  you  plan  the  workplace  using  the
AVG product group.

No planning; the tabular order sequencing (AVG), the graphic order sequencing and the
HLS module do not show the workplace.

Planned year model

Here, you can enter a special year model only used for planning in the Shop Floor Scheduling. This

year model does not affect data collection and posting in the product groups BDE/MDE. If you do

not  define  a  planned  year  model,  the  system  uses  the  year  model  (Master  data  tab)  for  the

planning.

Availability

Define the available capacity of a workplace/machine. The default value for the available capacity is

1000 [per mill].

In  the  Shop  Floor  Scheduling,  the  capacity  check  and  automatic  assignment  assume  that  each

operation  has  a  capacity  requirement  of  1000  [per mill],  i.e.  exactly  one  operation  can  run  on  the

workplace/machine at a time. In case of a manual multiple assignment, a dialog informs you about

the  double  assignment.  If  you  use  the  automatic  assignment,  multiple  assignments  are  generally

not feasible.

WEP-PPW_82.docx

Version: 1.1.23372

Page 65 of 182

Goods Receipt Inspection Planning

Use  this  setting  to  extend  the  availability  of  the  workplace  such  that  a  multiple  assignment  is

permitted. If the workplace capacity allows, for example, processing of two operations at the same

time, set the available capacity to 2000 [per mill] in this field.

If nothing is entered in this field or if you enter the value 0, the system interprets this as the default

value of 1000 [per mill].

This functions requires a corresponding license.

Check personnel availability

Choose from the following options:

  Check if at least one person is planned

  Check personnel availability

  Check personnel availability and qualification

When  you  operations  in  the ,  the system checks whether  persons  are planned in  the  application

for the time of the scheduling You will find further information on the display of personnel capacities

in the Graphic Planning .

This option is only available if you enable the extension .

MPL

For further information on the MPL product group, refer to the relevant MPL documentation.

Batch management

Activates  the  entry  of  the  batch  number  for  this  machine  within  the  terminal  posting  dialogs.

Possible values are:

N

L

D

J

No batch processing

Batch tracing (input/ output batches) as part of HYDRA MPL/TRT

Throughput batch processing as part of HYDRA MPL/TRT

Individual batch tracing (CHV)

The  following  functions  are  only  available  in  connection  with  the  product  group  Material  and

production logistics and are supported only by Windows terminals (CTWIN / AIP).

Preceding material buffer

Irrelevant.

WEP-PPW_82.docx

Version: 1.1.23372

Page 66 of 182

Goods Receipt Inspection Planning

Subsequent material buffer

If you specify a material buffer in this field, the field Target buffer in each of the entry dialogs (e.g.

output batch change, log off operation) is automatically populated with this value.

If you do not enter a material buffer in the input dialog (e.g. deleted from the input field), the system

automatically  posts  the  output  batch  to  the  material  buffer  specified  in  the  "subsequent  material

buffer" field.

Automatic generation of batch number

If you set this option, the system automatically generates a batch number for the output batch to be

produced. Otherwise, the system expects you to enter the batch number for the new output batch

to be produced, when you log on an operation or change the output batch.

Please note: If, in the field Batch management you set the option D (= Throughput batch recording),

the system automatically sets the value for the Automatic generation of batch number to "J". In this

case, you cannot enter the batch number manually.

Consumption balance

When  you  log  off  an  OP,  the  system  opens  an  additional  dialog  (V_BLZ)  displaying  the  material

components  and  their  consumption  quantities  in  relation  to  the  OP  that  is  currently  logged  on.  In

this  dialog,  you  can  also  log  off  input  batches  that  are  still  running.  This  option  is  only  activated,

once you have enabled the consumption balance for the material type of the output material.

Generate transport order for output batches

This option creates a transport order relating to batches for a generated output batch. The transport

starts from the material buffer where the output batch is included. The configurations of the material

type override the corresponding options of the resource configuration.

Generate transport order for input material

This  option  creates  an  article-related  transport  order  relating  to  a  material  component,  when  you

plan an operation for  a machine via the Shop Floor Scheduling module. Transport starts from the

output material buffer of the preceding operation. The configurations of the material  type  override

the corresponding options of the resource configuration.

Quantities tab

This tab is only available if you select a resource of the type "MNR".

Conversion factors for base quantity

At  the  machine  or  workplace,  you  can  collect  the  quantities  in  different  quantity  types  and  for  different

quantity accounts. In general, the system supports the following quantity accounts:

Yield

WEP-PPW_82.docx

Version: 1.1.23372

Page 67 of 182

Goods Receipt Inspection Planning

Scrap

Rework (Windows terminal CTWIN/AIP only)

Open quantity (problem quantity; Windows terminal CTWIN/AIP only)

The following quantity types are supported with each quantity account:

Primary quantity

Secondary quantity (Windows terminal CTWIN/AIP only)

Tertiary quantity (Windows terminal CTWIN/AIP only)

Basic quantity (Windows terminal CTWIN/AIP only)

The system design specifies the use of several quantity types or accounts. For example: If you  want to

enter  the  rework  quantity  manually,  a  corresponding  input  field  must  be  configured  in  the  input  dialog

(customization).

Use the quantity type "primary quantity" if you want to collect quantities automatically.

Quantity units and conversion factors for base quantity

Define a quantity unit for each quantity type. Use the alternative quantity accounts to enter data/quantities

manually. In this case, the system does not convert quantities automatically.

If you do not enter data manually in the alternative quantity accounts, the server converts the quantities

into the alternative accounts using:

- the conversion factors or

- the units that are configured in the MOC machine master data.

For further information on the conversion of quantities and examples, refer to the document

.

Basis for HYDRA-MDE quantity conversion

Define the basis for the quantity conversion.

A

Use the conversion factors of the OP that is logged on. If no operation is logged on,

the  system  uses  the  quantity  conversion  stated  in  the  machine/workplace

configuration.

M

Use  conversion

factors

from

the  workplace  configuration

for

the  quantity

WEP-PPW_82.docx

Version: 1.1.23372

Page 68 of 182

Goods Receipt Inspection Planning

conversion.

Units and conversion factors for base quantity (P)

Quantity unit (P)

Indicate  the  quantity  unit  you  want  to  use  for  data  collection  at  this  machine/  workplace.  If  you

collect quantities automatically, these quantities are generally primary quantities.

If  you  want  to  convert  quantities  automatically  into  another  quantity  type,  indicate  the  conversion

factors for the base quantity here.

Units and conversion factors for base quantity (S)

Quantity unit (S)

Indicate  the  secondary  quantity  unit  you  want  to  use  for  posting  the  quantities  to  the

workplace/machine. If you want to convert quantities automatically, indicate the conversion factors

for the base quantity here.

Units and conversion factors for base quantity (T)

Quantity unit (T)

Indicate the tertiary quantity unit you want to use for posting quantities to the workplace/machine. If

you  want  to  convert  quantities  automatically,  indicate  the  conversion  factors for  the  base  quantity

here.

Units and conversion factors for base quantity

Quantity unit (B)

Indicate the base quantity unit you want to use for posting quantities to the workplace/machine.

Manual entry of quantities, yield

Manual entry of yield

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of yield

Requirement: Set the option "Manual entry".

WEP-PPW_82.docx

Version: 1.1.23372

Page 69 of 182

Goods Receipt Inspection Planning

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting yield as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

Manual entry of quantities, scrap

Manual entry of scrap

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of scrap

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting scrap as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

WEP-PPW_82.docx

Version: 1.1.23372

Page 70 of 182

Goods Receipt Inspection Planning

Manual entry of quantities, rework

Manual entry of rework quantity

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of rework

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting the rework quantity as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

Manual entry of quantities, open quantity

Manual entry of open quantity

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of open quantity

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

WEP-PPW_82.docx

Version: 1.1.23372

Page 71 of 182

Goods Receipt Inspection Planning

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting open quantity as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

"MDE configuration" tab

This tab is only available if you select a resource of the type "MNR".

Monitoring

Monitoring type

Choose from the following monitoring types:

Monitoring via operating signal

No monitoring

Cyclic monitoring

If you select cyclic or operating signal monitoring, you can only enter a malfunction if the terminal

prompts  you  to  do  so  ("Assign  malfunction").  If  you  do  not  use  automatic  monitoring,  you  can

enter a new machine status at any time.

If  you  use  the  cyclic  monitoring  option,  the  machine  automatically  switches  to  the  "production"

status  when  counting  pulses  occur.  If  you  select  the  "operating  signal"  option,  the  machine

automatically  switches  to  the  status  "production"  as  soon  as  the  operating  signal  is  set.  If  you  do

not use the "automatic monitoring" option, you must assign the "Production" status manually.

Entry of disturbance reason required with specified delay time in [s]

You  can  only  use

this

function,

if

the

following  requirements  are  met:

- it is a Windows terminal (CTWIN, AIP)

-  The  Process  Communication  Controller  (PCC)  does  not  run  in  stand-alone

mode.

If the system identifies a downtime without a reason, the terminal opens the input dialog "Change

machine status" after the specified delay time. If the terminal goes back into production, the window

still remains open.

If  you now enter  a machine status (during production), this data  input  activates  a transfer posting

event  that  changes  the  most  recently  recorded  status  from  "General  disturbance"  to  the  newly

entered status. If this change is ok, the window closes; otherwise, it remains open.

WEP-PPW_82.docx

Version: 1.1.23372

Page 72 of 182

Goods Receipt Inspection Planning

However, if the system identifies the next downtime (with or without a reason), you can no longer

change to the previously noted status. The window closes automatically.

If the system identifies another downtime without a reason and the delay time has expired, then the

input window opens as described above.

If the system identifies a downtime without a reason and the machine switches to production before

the delay time expires, then the terminal does not automatically prompt you to enter a malfunction

reason.

Important note:

This  change  only  affects  the  HYDRA  Machine  Data  Collection.  The  system  does  not  correct  the

resource performance accounts of the currently running OP online!

Please note for data maintenance:

The  tabular  event  maintenance  of  the  MOC  shows  all  changed  machine  statuses.  However,  you

cannot edit the transfer posting event as it is locked. In order to perform recalculations correctly with

respect to orders and machines, change the original event with the status "NOT ASSIGNED" to the

correct status. The transfer posting event does not affect recalculation!

Minimum malfunction time

Specify  a  time  in  seconds  for  the  minimum  malfunction  time.  This  value  defines  the  time  that  a

malfunction/disturbance must continue before the machine changes from the status "Production" to

the status "Not assigned".

If operating signals are monitored, the status is directly changed. You can use the following explicit

option in the MDEB2.ini to disable this behavior (deactivation of direct status change). Result: the

status is only changed when the minimum disturbance time has expired:

MDEB2.INI

[INIT]
;Activating the direct status change (globally or for a specific machine)
SetMStatusDirect=1
SetMStatusDirect@<machine number>=1

;Deactivating the direct status change (globally or for a specific machine)
SetMStatusDirect=0
SetMStatusDirect@<machine number>=0

Minimum cycle time

If you select the cyclic monitoring option, specify a minimum cycle time in seconds in this field.

The terminal uses this minimum cycle time and the target cycle that is stored with the (logged in)

operation  and  that  is  set  off  against  the  cycle  extension  to  calculate  the  maximum  value.  The

terminal uses this maximum value as the default cycle time.

WEP-PPW_82.docx

Version: 1.1.23372

Page 73 of 182

Goods Receipt Inspection Planning

If both, the minimum cycle time and the target cycle stored for the operation, are 0, the default cycle

time is set to 60000 seconds [per 1000 machine clocks].

Cycle extension

If you select the cyclic monitoring option, enter the percentage for extending the target cycle time

in this field. Enter a value ranging between 0 and 5000.

The system offsets the target cycle stored with the (logged in) operation against this percentage. A

value less than 100 is a shortened cycle; a value greater than 100 is an extended cycle.

Number of target cycles

If you select the "cyclic monitoring" option, enter the number of cycles (0 to a maximum of 9) after

which  the  terminal  automatically  switches  from  a  status  unequal  to  "production"  into  the

"production" status within the cycle time (requirement: the status that is unequal to production is not

locked for the "production" status).

Some  production  processes  provide  machine  cycles  during  the  setup  phase.  Set  a  value  greater

than 0 in order to prevent the current machine status from changing immediately. Please note: The

quantities  you  collect  until  the  machine  switches  to  the  "production"  status  are  neither  posted  as

yield nor scrap.

Cycles to be evaluated

Reserved Enter 0 in this field.

Management

Posting during production lock

Use  this  setting  to  specify  how  to  post  the  counting  pulses  that  are  collected  while  the  status

"production" is suspended. This configuration takes effect for all counters configured as "Yield".

Posting as scrap

If this option is configured for the counter, the system offsets the counting

pulses  against the partitioning/ pulse factor and posts these pulses  as scrap.  Even  if  you  defined

another quantity account for offsetting, this one will not be used.

Posting as yield parts

the system posts the counting pulses as yield

No posting

the system does not post the quantities while the "production" status is suspended.

Pulse factor specific to machines

Use the pulse factor, for example, if you want to collect lengths (e.g. using a wheel).

Set  the  value  to  0  for  machines  where  a  discrete  or  integral  number  of  quantities  (e.g.  pieces)  is

collected  per  pulse.  In  this  case,  the  pulse  factor  is  not  evaluated.  That  means,  the  number  of

cycles posted corresponds to the actual pulses transferred via the MSS (machine interface).

WEP-PPW_82.docx

Version: 1.1.23372

Page 74 of 182

Goods Receipt Inspection Planning

The MSS (machine interface) records the signals transferred from the machine (counting pulses).

According  to  the  configured  number  of  pulses,  the  system  calculates  and  posts  the  quantities  as

follows:

Quantity for the machine = pulse * partitioning for the machine/ pulse factor for the machine

Quantity for the operation = pulse * partitioning for the operation/ pulse factor for the operation

Please note: The pulse factor will be calculated as a  fraction. When the quantity is calculated, the

pulse is used as denominator and the partitioning is the numerator.

The system interprets pulses that occur during a malfunction or a production lock (configuration of

Posting during prod. lock > scrap) as scrap. Also use the above-mentioned formula to calculate the

scrap quantities.

Partitioning specific to machines

Enter the partitioning specific to the machine in this field. Multiply the machine-specific partitioning

by  the  partitioning  stored  with  the  operation  in  order  to  integrate  the  machine-specific  partitioning

into quantity calculation. Enter the value 1 in this field, if you do not want this to happen.

Extended weekend automatic

If  you  select  this  option  and  the  system  is  configured  accordingly,  the  system  assigns  at  the

beginning of the shift the status that was available before status 999 was activated.

Note:

To use this option, the workplace must already be assigned to a terminal.

Find detailed information about the automatic activation of status 999 in the document .

Waiting period, short-term disturbance

Configure  a  short-term  disturbance  status  for  each  machine/  workplace  to  improve  the  overview,

e.g. in the machine history. Use this status as a “repository” for unconfirmed statuses, which only

existed for a specific (short) period.

If  the  terminal  automatically  identifies  a  downtime  and  the  machine  automatically  goes  back  into

production,  the  system  checks  if  this  disturbance  is  shorter  than  the  time  period  configured  for

short-term disturbances.

If this is the case, the still unfounded malfunction is justified with the status that is configured as the

"short-term disturbance" status for the machine.

Inputs/ outputs

Machine lock/ Target quantity reached/ Machine downtime/ Free I/O

Enter  the  logical  output  where  a  digital  signal  should  occur  when  the  corresponding  status  is

available.

WEP-PPW_82.docx

Version: 1.1.23372

Page 75 of 182

Goods Receipt Inspection Planning

Machine lock output

The  system  sets  this  output,  if  you  enabled  the  option  "set

machine lock output" in the current machine status.

Target quantity reached output  The  system  sets  this  output,  if  the  collected  yield  reaches  the

target quantity of the OP.

Machine downtime output

The system sets this output, if the machine is in a status unequal

to  Production.  When  changing  to  the  production  status,  the

system sets the output back to 0.

Free I/O

Free input/ output for customizations.

Use these statuses for connecting a monitoring light or a horn, for example.

Enter the corresponding number in one of the fields in order to assign an output and to specify

which relay is interconnected by the terminal when the predefined status occurs. Enter "0" to

prevent any action. Note that you cannot assign a terminal output more than once.

Please note

Specify the statuses that trigger the activation of the machine lock in the Status assignment.

Generally, enter the value "1" in the input field, when the machine lock is activated via the available

relay output of a DS 100. In this case, the system sets the machine lock if

- a correspondingly configured status occurs and

- the status is not assigned.

Output batch change**

Customer-specific assignment of an input with an automatic output batch change (MPL). By default,

enter 0 in this field.

PDE (Process Data Collection)

Collect process data

This  parameter  specifies  if  the  system  collects  process  data  for  this machine.  If  this  parameter  is

not set for a machine, you cannot collect process data for this machine.

External connection

The AIP 8.2 and/or the PCC in stand-alone mode (MDE-Blade 2 Version 8.1.0.1) do no longer

support the options marked with **. As they use other configurations for the connection.

WEP-PPW_82.docx

Version: 1.1.23372

Page 76 of 182

Goods Receipt Inspection Planning

External connection

If this machine is assigned to a master terminal the following connection options are available:

No external device

External devices are not connected

DS100

DS100 connection

Arburg control system**

Arburg connection

Engel interfacing**

Connection of Engel machines

MT3**

PDE**

MT3 connection

Process data collection

If  you  activate  a  DS100  or  MT3**  connection,  you  can  select  the  field  "device  address".  If  you

activate the option "Engel interfacing",  you can select the field "serial number". If  you activate the

option "Arburg server system", you can select the field "class".

Note regarding the combination of connections on a master terminal:

"DS 100" and "No external device": allowed

"MT 3" and "No external device": allowed

"MT3" and "DS 100" not allowed!

Serial number (Engel interfacing)**

Enter the serial number of the connected Engel machine. Set the option "EMS machine interface" in

the HYDRA basic parameter settings  if you want to use Engel machines.

Device address

You can select this field, if you activate a DS100 or MT3** connection. Enter the device address of

the sub-bus participant.

"Resource configuration" tab

For resources of type "MNR", only the fields marked with "*" are available:

  Family (section resource master data)

  Cycles (section target utilization)

  Runtime (section target utilization)

Resource master data

Type

Identifies the type of resource:

Resource: A resource can be uniquely identified, i.e. the resource is actually present. Its quantity is

always 1.

WEP-PPW_82.docx

Version: 1.1.23372

Page 77 of 182

Goods Receipt Inspection Planning

Anonymous resource: An anonymous resource cannot be uniquely identified. If the identifier is set,

then  you  can  change  the  value  in  the  field  Number  from  1  to  another  positive  integer  value.  You

cannot post  data onto  anonymous resources because anonymous resources do not relate to  one

specific resource.

Required  resource:  A  required  resource  stands  for  one  or  more  actual  resources  that  can  be

identified.  Specify  in  the  configuration  WRM:  Master  data  >  Required  resources  which  resources

are represented by a required resource. The number results from the number of actual resources

assigned to the required resource.

Please note: If this field is empty, the resource is implicitly an ("actual") resource.

Equal type

Reserved for future modifications.

Version

Revision number; store here the program version for resources of the type DNC.

Quantity

You  can  only  edit  this  field,  if  it  contains  an  anonymous  resource  and  the  option  Anonymous

resource is set (see above). A value > 1 indicates how many of these resources are available.

This field is calculated automatically for required resources.

Family*

Assign  a  resource  family.  If  you  change  the  resource  family  subsequently,  an  information  dialog

appears as a warning because user fields might possibly be assigned via the resource family.

Target utilization

Cycles*

The field Cycles provides additional information. The cycles value defines how long the resource is

to be used.

Runtime*

The field Runtime provides additional information. It defines how long the resource is to be used.

Input unit

Input unit

Absolute value limit (EMG 8.1, function authorization: resablim)

Enter the absolute value limit of the (meter) resource. The energy monitor shows this limit value in

addition  to  the  current  meter  reading.  Use  the  Escalation  Management  to  generate  an  escalation

message, if the counter value of the resource exceeds the specified absolute value limit. You need

the function authorization "resablim" to view this field.

WEP-PPW_82.docx

Version: 1.1.23372

Page 78 of 182

Goods Receipt Inspection Planning

Actual utilization

The periods when a resource was logged on to a workplace are the basis for posting the cycles (clocks),

runtime, yield, and scrap as actual utilization.

Clocks

The cycles (clocks) posted for the resource up to now.

Runtime

The total time in hours posted for the resource up to now. The total time is the sum total of all times

posted onto RPA 1 to 11.

Yield (B)

The yield posted for the resource up to now (base quantity unit).

Yield (P)

The yield posted for the resource up to now (primary quantity unit).

Scrap (B)

The scrap posted for the resource up to now (base quantity unit).

Scrap (P)

The scrap posted for the resource up to now (primary quantity unit).

Configuration

Target cycle

Target duration in seconds for 1000 machine cycles if this tool is used.

Please note: The target cycle stored in the OP is relevant for the planning in the HLS module and

for the machine data collection at the terminal.

Original partitioning

Partitioning of the tool (= number of cavities) when using this tool.

Current partitioning

Current  partitioning  of  the  tool.  This  value  can  deviate  from  the  original  partitioning,  e.g.  if  the

original quantity can no longer be produced with one cycle/clock due to a tool defect.

Always use the current partitioning to post cycles to the tool.

Please note: The partitioning stored in the OP is relevant for the planning in the HLS module and

for the machine data collection via the terminal.

Partitioning due to cavities

If  you  set  the  option  "partitioning  due  to  cavities",  the  system  (re-)calculates  the  fields  "current

partitioning"  and  "original  partitioning"  using  the  values  defined  in  the  cavity  management.  Then,

you can no longer change the fields manually.

WEP-PPW_82.docx

Version: 1.1.23372

Page 79 of 182

Goods Receipt Inspection Planning

Log on with OP

Use this option to specify whether or not you want to log on the resource with the OP. To do so, the

resource must be included as a component in the operation's list of production resources and tools.

Possible values:

None:

The resource is not logged on.

Implicit:  The  system  automatically  (implicitly)  logs  on  the  resource  that  is  assigned  to  the

operation  as  a  production  resource  and  tool;  you  can  neither  log  on  the  resource  manually

(explicitly) nor change the logon.

Explicit:  You  can  manually  (explicitly)  log  on  the  resource  that  is  assigned  to  the  operation  as  a

production resource and tool or you can log on another resource instead. If you do not log on the

resource  or  another  resource  explicitly,  the  system  implicitly  (automatically)  logs  on  the  current

resource; in this way, the current resource serves as a "default".

Please note:

If you log on another resource explicitly (manually), this resource will be logged on for the resource

that has the same  resource type in the operation's list of production resources and tools. For this

reason, you can only log on those resources explicitly (manually) that are included as a requirement

in the operation's list of production resources and tools. In this way, you cannot log on a resource

that is not included as a requirement in the list of production resources and tools (the resource must

be entered in the list).

In general,  you should not enable this option for the resource type DNC. The DNC product group

handles this differently (NC programs are logged on separately).

The system also logs on resources that are defined in the BOM of the machine.

Parallel logon/ planning possible

You can log on/plan the tool simultaneously.

Please note:  You can only log on a resource to one  machine more than once.  Consequently, the

option "Parallel logon possible" refers to several different OPs logged on to one machine.

In this case, the system posts data proportionately as follows:

  Post quantities proportionally.

  Post times 100% for each resource. This means that the system posts double the time to

the resource, if the resource is logged on twice.

Post to resource

Specifies whether or not the quantities and times are posted to the resource. Due to a high degree

of  complexity,  you  should  only  assign  this  option  to  those  resources  that  you  actually  want  to

evaluate.

WEP-PPW_82.docx

Version: 1.1.23372

Page 80 of 182

Goods Receipt Inspection Planning

Collective lock

If you lock a lower-level (assigned) resource using the BOM function, the system sets a collective

status for the higher-level resource. If this collective status is set, the system treats the higher-level

resource as locked when a download request is made.

If you enable this function, the system passes the collective lock to the higher-level resource.

Planning

Setup time

Duration in hours for setting up the tool.

Please note: The setup time stored in the OP is relevant for the planning in the HLS module.

Teardown/retooling time

Duration in hours for removing the tool.

Please note: The retooling time stored in the OP is relevant for the planning in the HLS module.

Assignment

Not used. The system uses the configuration option of the same name stored in the resource type

to integrate the resource allocation in the HYDRA Shop Floor Scheduling.

Evaluation

Integrate in evaluations

Reserved for future modifications.

File

File exists

Shows whether or not the file is stored in the specified path. A cyclic process checks the files and

sets the options subject to whether or not the file is available.

File name

File  name;  without  file  extension  for  DNC.  The  system  adds  the  file  extension  according  to  the

configuration in the resource type. The defined paths specify the storage location.

Comparison resources

Enter  two  comparison  resources  for  energy  consumption  resources.  They  will  then  be  shown  in

comparative evaluations/reports, e.g. the energy monitor.

Resource 1

Resource number of the resource to be compared.

WEP-PPW_82.docx

Version: 1.1.23372

Page 81 of 182

Goods Receipt Inspection Planning

Resource type 1

Resource type of the resource to be compared.

Resource 2

Resource number of the resource to be compared.

Resource type 2

Resource type of the resource to be compared.

Accuracy

Enter  more  detailed  information  on  measuring  accuracy  and  measuring  range  for  test  equipment

resources.

Tab User fields

You can use user fields to store additional customer-specific information in the MES. The user fields tab

includes  eight  sub-index  tabs,  which  each  has  eight  additional  user  fields.  The  so-called  user  field  key

specifies the available user fields and their meaning.

The workplace and resource configuration provides data of two basic object types. You can also edit this

data in the workplace and resource configuration: on the one hand these are machines and workplaces

and on the other these are the resources. Machines and workplaces are also "resources". But resources

are not automatically machines and workplaces.

Object type

The system configures the user fields of machines/workplaces in relation to the object type "MNR".

The system stores data contents to the machines/workplaces table and the resources table of the

database to ensure data consistency.

The system configures user fields for resources in relation to the object type matching the resource

type  of  the  resource  (example:  create  resources  of  the  type  "PAC"  in  relation  to  the  object  type

"PAC"). The system stores data contents to the the resources table of the database.

User field key

Each user field key describes a combination of user fields. The management of the user field key

(and therefore the meaning of the fields) is different for each object.

User fields

The following user fields are available after configuration:

Field data type
Date
Numeric,
time, duration
Decimal value
Text field, length 1

Number of fields
6
16

6
16

WEP-PPW_82.docx

Version: 1.1.23372

Page 82 of 182

Goods Receipt Inspection Planning

Number of fields
Field data type
6
Text field, length 10
14
Text field, length 20
2
Text field, length 40
Each page shows a maximum of 8 fields.

By default, no user field keys are  defined. Configure the system accordingly to support

this kind of user fields.

As the table shows resources of different types, use the user field key "SYSTEM" of the

object "RES" to identify the column headings for the user fields.

Comment tab

Store additional resource comments in the "comment" tab.

Main tab Resource attributes

Shows  additional  resource  attributes  via  the  user  field  definitions  of  the  resource  family.  Use  the

"resource attributes" button for editing.

Main tab Resource list

Shows  the resource  list for the selected resource. Click the "resource  list" button to go directly to

the BOM application for editing purposes.

Main tab DNC versions (available as of DNC 8.2)

Shows the available versions of a DNC resource including a flag indicating the currently applicable

version. HYDRA provides this valid version for machine downloads.

Toolbar

General tab

Insert

Function authorization: mdres.create

Opens  the  dialog  for  adding  a  resource.  This  dialog  provides  the  fields  that  match  the  selected

resource type.

WEP-PPW_82.docx

Version: 1.1.23372

Page 83 of 182

Goods Receipt Inspection Planning

Copy

Function authorization: mdres.copy

Opens  the  dialog  for  copying  an  existing  resource.  Subject  to  the  selected  resource  and  its

resource type, the copy function differentiates the following:

  Copy function for resources of resource type = MNR (workplaces, machines)

  Copy function for resources that do not have the type MNR

Copy function for resources of resource type = MNR (workplaces, machines)

From: resource type, resource, short name, name

  Resource type (fixed "MNR“)

  Workplace/machine number

  Short name

  Name

of the workplace you want to copy. You cannot change these values. They derive from the

selected data record.

To: resource type, resource, short name, name

  Resource type (corresponds to the resource type of the workplace you want to copy;

cannot be changed).

  Workplace/machine number

  Short name

  Name

of the target workplace.

Copy machine status

Function authorization: mdmst.copy

If you set this option, the system automatically creates and transfers all  of the workplace

you want to copy to the new workplace.

Copy counter configuration

Function authorization: mdctr.copy

If you set this option, the system automatically creates and transfers all  of the workplace

you want to copy to the new workplace.

Note  that  the  counter  numbers  of  the  new  workplace  are  identical  with  the  counter

numbers  of  the  workplace  you  copied.  If  necessary,  you  have  to  adjust  the  counter

numbers.

Copy reasons

Function authorization: mdreas.copy

WEP-PPW_82.docx

Version: 1.1.23372

Page 84 of 182

Goods Receipt Inspection Planning

If you set this option, the system automatically creates and transfers all  of the workplace

you want to copy to the new workplace.

Copy function for resources that do not have the resource type MNR

The  copy  function  for  all  resources  that  do  not  have  the  type  MNR  opens  the  "insert"  dialog  and

takes over the details from the previously selected resource. But you can edit and change all fields.

Edit

Function authorization: mdres.edit

Opens the dialog to edit a resource and provides the tabs and fields of the relevant resource type.

As of MES Weaver 4.0pe, you can change master data of several selected resources of the same

resource type at the same time. You can select up to 10 fields and assign a value. You require the

function authorization mdresmm to edit several resources at once.

  Delete

Function authorization: mdres.delete

Deletes one or several selected resources.

Resource tab

 Configuration – resource status

Opens  the  application  "resource  status"  to  define  statuses  for  all  resources  that  do  not  have  the

type MNR.

 File - show file

Opens  the  file  view  –  only  available  for  document  resources,  which  are  configured  as  file-based

resources without DNC processing in the Resource type. And only available if the relevant license

and function authorization are available.

 Go to - resource list

Opens  the  Resource  list  application.  The  selected  resource  is  entered  as  default  value  for  the

higher-level resource.

 Go to – required resources

Opens the "required resources" application. The selected resource is  entered as default  value for

the required resource.

WEP-PPW_82.docx

Version: 1.1.23372

Page 85 of 182

Goods Receipt Inspection Planning

 Go to – cavity assignment

Opens the "cavity assignment" application. The selected resource is entered as default value.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Functions – Measures

Opens the Measures application.

 Functions – Status change

Opens  the  dialog  to  change  a  resource  status.  The  checkbox  Including  subordinate  resources  is

not relevant and reserved for future extensions.

 Functions – Release of resource

Opens  the  dialog  to  release  a  resource.  The  checkbox  Including  subordinate  resources  is  not

relevant and reserved for future extensions.

 Functions – Stock transfer

Opens the dialog to transfer/relocate a resource.

Workplace tab

 Configuration – status assignment

Opens  the  application  "status  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Configuration – counter configuration

Opens  the  application  "counter  configuration".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Configuration – terminal assignment

Opens  the  application  "terminal  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

WEP-PPW_82.docx

Version: 1.1.23372

Page 86 of 182

Goods Receipt Inspection Planning

 Entry – reasons

Opens  the  application  "reasons".  The  system  enters  the  selected  resource  in  the  corresponding

field.

 Entry – Operator positions

Opens  the  application  "operator  positions".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Entry – premium indicator

Opens  the  application  "premium  indicator".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Groups - groups

Opens the application "groups". The system enters the group of the selected resource.

 Groups – group assignment

Opens  the  application  "group  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Miscellaneous – cycle parameter

Opens  the  application  "cycle  parameter".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Miscellaneous - workforce requirements of workplaces

Opens  the  application  "workforce  requirements  of  workplaces".  The  system  enters  the  selected

resource in the corresponding field.

DNC tab

The  tab  is  only  available,  if  you  select  a  DNC  resource.  These  are  resources  configured  as

resources with DNC processing in the resource type.

 Configuration – resource status

Opens the "resource status" application.

WEP-PPW_82.docx

Version: 1.1.23372

Page 87 of 182

Goods Receipt Inspection Planning

 Configuration - assignment of DNC family to machine

Opens the application "assignment of DNC family to machine".

  Copy resource attributes (as of DNC 8.2)

Copies values of resources attributes from one resource to another. Both resources must use the

same user field key.

  File - comparison editor

Opens  the  comparison  editor  for  the  selected  resource  or  resources.  See  below  for  further

information.

 File - export

Exports the file specified for the resource. You use the file explorer to specify the target file.

 File - import

Imports the file specified for the resource. You use the file explorer to specify the source file.

 File - viewer

Opens the file specified for the resource using the defined viewer program.

 File - editor

Opens the file specified for the resource for editing using the defined editing program.

 Set valid version (as of DNC 8.2)

Only active, if you select a version in the DNC versions tab. The selected version is set as the new

and valid version.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Go to - resource list

Opens  the  Resource  list  application.  The  selected  resource  is  entered  as  default  value  for  the

higher-level resource.

WEP-PPW_82.docx

Version: 1.1.23372

Page 88 of 182

Goods Receipt Inspection Planning

 Functions – Status change

Opens the dialog to change a resource status.

 Functions – Release of resource

Opens the dialog to release a resource.

How to use the comparison editor

The  comparison  editor  compares  the  files  attached  to  the  DNC  resources.  Two  operation  modes  are

available:

Selection of one resource:

The  editor  shows  the  released  resource  and  the  optimized  version  of  the  resource  for

comparison.  You  can  change  the  file  displayed  on  the  right-hand  side  of  the  editor.  Once  you

have  made  the  changes,  the  comparison  editor  transfers  these  changes  to  the  system,  like  the

simple editor. You can only use this mode for DNC types with the file processing type "optimized".

Selection of two resources:

WEP-PPW_82.docx

Version: 1.1.23372

Page 89 of 182

Goods Receipt Inspection Planning

If you select two resources before you open the  comparison editor, the editor compares the two

selected resources. You can select the file  type. You can change the file displayed on the right-

hand side of the editor. Once you have made the changes, the comparison editor transfers these

changes to the system, like the simple editor.

Click the relevant buttons or use the context menu (right clicking) to start the functions of the comparison

editor:

-  Reject: Rejects the difference identified (on the right). Accepts the value from the left file.  The

editor does no longer highlight the difference.

-  Keep:  Accepts  the  difference  identified  (on  the  right).  The  editor  does  no  longer  highlight  the

difference.

-  Next difference: Goes to the next difference.

-

Insert: Inserts a row at the current position.

-  You can always change the contents of a row. Click the row and enter a value. Press ESC to

quit the row without changes. The editor then highlights the row as "changed".

-  Swap  windows:  Click  this  button  to  swap  the  windows.  This  function  is  necessary  if  you

compare two resources. The place where a resource is displayed results from the display order

in the table; the system does not know, which resource must be changed. If you only select one

resource, this button is not available as in this case you can only change the optimized program

version.

-  Save: Saves the changes made to the file on the left-hand side.

Processing notes for workplaces and machines

Configuration changes

Restart  the  terminal  which  the  workplace/machine  is  assigned  to  in  order  for  the  terminal  program  to

interpret the configurations or modifications made to this workplace/machine.

Deleting a machine/ workplace

In a first step, the system shows a confirmation prompt asking if you really want to delete the machine. If

you  confirm  this  prompt,  the  system  makes  an  attempt  to  delete  the  workplace.  You  can  only  delete  a

workplace successfully, if:









you have not yet collected data for the workplace;

you have currently not assigned the workplace to a terminal or a line;

you have currently not logged on operations to the workplace;

you have not planned operations for the workplace.

WEP-PPW_82.docx

Version: 1.1.23372

Page 90 of 182

Goods Receipt Inspection Planning

If  you  delete  the  workplace  successfully,  the  system  also  deletes  all  configuration  data,  e.g.  status

assignments, for this workplace.

Checking Business Parameter Containers (BSCs)

See  for further details on how to check the system against business parameters.

WEP-PPW_82.docx

Version: 1.1.23372

Page 91 of 182

Goods Receipt Inspection Planning

8  Resource Families

Overview

HYDRA menu

Master data  Resources  Resource families

FEDRA menu

Detailed Scheduling  Master data  Resource families

Transaction code

resfam.*

Function authorization  mdrfam

This document describes the application "Resource Families” on the client.

Purpose

If you look at the assignment of resources to resource types, you soon recognize that in a manufacturing

company various resources of the same type exist that are possibly handled quite differently. This means

that in general the classification by resource types is not sufficient to organize resources in a useful way.

If you define "resource families" (groups), you can introduce sub-classes of resource types. The diagram

below  illustrates  how  the  resource  type  "Tool"  is  sub-divided  into  the  two  resource  families  "Drill"  and

"Injection mold". Each of the individual resources is assigned to one of the two resource families.

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

Integration

The  resource  families  offer  another  structural  level  subordinate  to  the  resource  types.  You  can  use

resource types to define the master/detail user fields of resources. You can improve these master/detail

user fields through definition in the resource families. In particular for DNC, you can use resource families

as the main search criterion and assignment criterion for machines.

WEP-PPW_82.docx

Version: 1.1.23372

Page 92 of 182

Goods Receipt Inspection Planning

Selection parameters

In the selection panel, you can filter by superordinate or assigned resources. The application provides the

following selection criteria:

Resource type

Type of resource.

Resource family

The resource family to which the resource is assigned.

Field descriptions

Resource type

Resource type to which the resource families refers.

Resource family

Unique, descriptive name of the resource family.

You can select this value  in the various functions. Only the resource type allows  you to  identify a

resource or its resource ID uniquely. That  is  why,  evaluations also show the resource type of the

resource.

Description

This field includes the description of the resource family; serves as a comment.

Responsibility area

Definition of the responsibility area. If you specify the responsibility area for a resource family, you

also specify the responsibility area for the assigned resources. The responsibility area controls the

visibility and editing options for these resources.

Field description for tab General

User field key

Reference  to  a  valid  user  field  key.  The  user  field  key  entered  here  overwrites  the  entries  in  the

resource type.

Note regarding DNC filtering using a DNC family and its search fields (when using HYDRA only):

The  definition  of  suitable  user  field  combinations  is  important  if  you  want  to  use  the  flexible  filter  and

search  functions  in  the  DNC  module.  You  can  define  such  user  field  combinations  as  part  of  the

configuration. The user is responsible for the assignment and utilization of these user field keys. Use the

defined  search  fields  in  the  terminal  to  filter  the  DNC  records  in  addition  to  the  DNC  family  of  the

machine. You can also use these fields as search criteria in the MOC.

Starting with release DNC 7.2, the following preconfigured user field keys will be delivered:

WEP-PPW_82.docx

Version: 1.1.23372

Page 93 of 182

Goods Receipt Inspection Planning

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

4.  Version, mandatory field, cannot be edited

DNC_K_W

Plastic (tool reference only):

1.  Tool, mandatory field, cannot be edited

DNC_K_WV

Plastic (tool reference and version):

1.  Tool, mandatory field, cannot be edited

2.  Version, mandatory field, cannot be edited

DNC_NC

NC programs:

1.  Article, mandatory field, cannot be edited

DNC_NC_V

NC programs:

1.  Article, mandatory field, cannot be edited

2.  Version, mandatory field, cannot be edited

DNC_NC_M

NC programs:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

DNC_NCMV

NC programs:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Version, mandatory field, cannot be edited

DNC_FREI

1.  Search field 1, Text20, mandatory field, can be edited

2.  Search field 2, Text20, optional field, can be edited

3.  Search field 3, Text20, optional field, can be edited

4.  Search field 4, Text20, optional field, can be edited

WEP-PPW_82.docx

Version: 1.1.23372

Page 94 of 182

Goods Receipt Inspection Planning

Notes on the DNC administration

DNC records are used exclusively with machines. In order to avoid false entries or false allocations, every

machine is assigned to a definite DNC resource family. This is stored in the machine resource data (the

Resource family DNC field). In this way, you can make sure that only programs belonging to a particular

resource family and, indirectly, to a particular resource type can be loaded to a machine.

Furthermore,  for  the  management  of  DNC  records  certain  criteria  are  necessary,  which,  among  other

things,  simplify  selection  and  evaluation,  thereby  simplifying  location  and  editing  and  enabling

inspections.  As  widely  different  machine  types  can  be  dealt  with  by  DNC  administration  (including,  for

example,  injection  mold  machines,  printers  and  NC  machines),  a  rigid  determination  of  these  criteria  is

not advisable. For this reason, the resource family exists. You can use the user fields to assign attributes

to the resource families. These attributes describe and specify the variable parameters.

Therefore, you can use the attributes for identification purposes and  you can assign validation functions

and allocations. In doing so, you establish a connection between the DNC programs on the one hand and

the machines and operations on the other (see section entitled "User fields").

There are variables, such as the temperature and humidity, which influence the behavior of the machines

and  can  therefore  have  an  influence  on  production.  You  can  also  record  these  "environmental  factors".

For this purpose, you just have to define further attributes in the user fields.

WEP-PPW_82.docx

Version: 1.1.23372

Page 95 of 182

Goods Receipt Inspection Planning

9

Inspection Stations

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

generated that only include the characteristics of an inspection station. This depends on a configuration

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 96 of 182

Goods Receipt Inspection Planning

The "inactive" filter field allows for the data set to be restricted to active or inactive inspection stations.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The  "inactive"  check  box  identifies  inspection  stations  that  are  no  longer  to  be  used  in  the  active  data

acquisition process.

Toolbar

There are no other special function buttons in addition to the standard functions.

WEP-PPW_82.docx

Version: 1.1.23372

Page 97 of 182

Goods Receipt Inspection Planning

10  Customers

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 98 of 182

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 99 of 182

Goods Receipt Inspection Planning

Editing functions

The below dialog opens to edit a data record.

Toolbar

There are no other special function buttons in addition to the standard functions.

WEP-PPW_82.docx

Version: 1.1.23372

Page 100 of 182

Goods Receipt Inspection Planning

11  Manufacturer

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 101 of 182

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 102 of 182

Goods Receipt Inspection Planning

Editing functions

The following dialog opens to edit a data record.

Toolbar

There are no other special function buttons in addition to the standard functions.

WEP-PPW_82.docx

Version: 1.1.23372

Page 103 of 182

Goods Receipt Inspection Planning

12  Suppliers

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 104 of 182

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 105 of 182

Goods Receipt Inspection Planning

Editing functions

The following dialog opens to edit a data record.

Toolbar

There are no other special function buttons in addition to the standard functions.

WEP-PPW_82.docx

Version: 1.1.23372

Page 106 of 182

Goods Receipt Inspection Planning

13  Failure

Summary

Menu

Master data   Quality management   Failure

Master data   Quality management  Failure location

Master data   Quality management  Failure cause

Master data  Quality management  Originator

Transaction code

ftyp for failure type

floc for failure location

fcau for failure cause

ori for originator

Function authorization

ftyp

There is a standardized catalog for failure types, cause and originator.  The system differentiates entries

using  the  failure  types.  There  is  an  entry  for  each  failure  type  in  the  menu.    When  requesting  the

application via the menu, the system opens the application and filters it to the individual failure type.  The

application can also be opened using a pre filter via the relevant transaction code.

Generally, the system uses the catalogs to clearly outline the failure.

Purpose

The "failure analysis number" field is the key field, i.e. when saving a new failure type, the system checks

if a failure type with this key information exists.

The input  of failure types  is quite simple and only requires  the assignment of a  failure analysis  number

and name.

The system defines a failure type group beforehand and assigns the failure to the relevant group.  This

option should not be missed out as it provides improved reports/evaluations. The system assigns groups

by opening the group tree using the magnifying button. The requested group may be selected and taken

over  in  the  group  tree  by  way  of  the  hierarchical  tree  entries.  In  the  field  "Groups"  of  the  maintenance

dialog of the failure cause the assigned group with hierarchical group structure appears.

The displayed list presents the group hierarchy with the columns “group 1 to group 5”.

The system executes the maintenance of groups in the relevant failure group maintenance as is outlined

in the manual „MOC_Groups.pdf“.

Under certain circumstances, we recommend the use of a self-explanatory structure of the failure number

as a failure key.

WEP-PPW_82.docx

Version: 1.1.23372

Page 107 of 182

Goods Receipt Inspection Planning

By  differentiating  between  active  and  inactive  failure  types,  the  system  defines  if  the  failure  type  is  still

available  in  failure  selection  lists  in  the  later  data  acquisition  process.  Evaluations  using  inactive  failure

are still available.  The system can also activate inactive failures.

Integration

Defect  catalogs  are  used  sometimes  in  measurement  recording  and  complaint  management.  The

evaluation  of  measured  values  can  identify  and  later  on  evaluate  the  individual  failure  during  quality

deviations.  Only in doing so, it is possible to identify the main failures, take appropriate action (measures)

and prevent the defects from recurring.

In addition, this is the basis for failure mode analysis.

The  system  can  also  integrate  failures  in  the  analysis  selection  catalogs.  An  analysis  selection  catalog

includes a subset of all failures and restricts the list of failures to be selected during the collection process

to those of the analysis selection catalog assigned to the characteristic.

Requirements

Functional requirements from other applications must not be met in order to use this function.

Selection criteria

Selection  criteria  are  self-explanatory  and  not  described  separately.  The  tab  "Group"  using  the  symbol

 and the selection of a group (in the tree structure) can filter the failure groups.  The group tree list

provides a function to cancel and accept the entries made.

The "inactive" filter field allows the data set to be restricted to active or inactive failures.

Field descriptions

The available fields are self-explanatory and not explained separately.

The "inactive" check box identifies failures that are no longer used in the active data acquisition process.

In a tree structure, the group field shows the assigned group or allows groups to be assigned in form of

the tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions/features.

WEP-PPW_82.docx

Version: 1.1.23372

Page 108 of 182

Goods Receipt Inspection Planning

14  Measures

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

The assigned group including the hierarchical group structure can then be found in the "groups" field of

the editing dialog for the measures.

If  measures  are  presented  in  list  form  the  group  hierarchy  is  represented  by  the  columns  "group  1"  to

"group 5".

Groups  are  edited  in  the  "measure  groups"  application,  which  is  described  in  the  manual  entitled

MOC_Groups.pdf.

By distinguishing between active and inactive measures, it can be defined whether or  not they are still to

be  available  in  selection  lists  for  the  measures  in  the  later  data  acquisition  process.  Inactive  measures

can be reactivated at any time.

WEP-PPW_82.docx

Version: 1.1.23372

Page 109 of 182

Goods Receipt Inspection Planning

Integration

The  measures  catalog  is  used,  among  other  things,  within  measurement  recording  and  in  complaint

management.  If  deviations  are  detected  within  measurement  recording  actions  can  be  triggered

immediately  on  the  basis  of  the  catalog  of  measures.  At  first  the  assigned  measures  have  the  status

"open".  In  complaint  management  a  party  responsible  (e.g.  a  person)  as  well  as  a  deadline  may  be

defined. In addition to this, an actual date, the completion in % and effectiveness in % may be specified

as well. Normally, these fields are  only filled out, once a measure has been completed (measure status

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 110 of 182

Goods Receipt Inspection Planning

15  Analysis Selection

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

If a characteristic is assigned an analysis selection catalog only the failure types,  failure locations, failure

causes,  originators  and  measures  listed  in  this  catalog  will  be  available  for  this  characteristic  when

measured values are recorded. Consequently, the failure list, for example, can be designed in relation to

characteristics.

Analysis selection catalogs are mainly used for the assignment to an inspection chart characteristic. An

assignment is almost mandatory for inspection chart characteristics, as in any other case, the user may

choose  from  the  whole  set  of  failure  types  of  the  entire  master  data  catalog  when  recording  measured

values for this characteristic. This would make inspections confusing and too complex.

WEP-PPW_82.docx

Version: 1.1.23372

Page 111 of 182

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 112 of 182

Goods Receipt Inspection Planning

16 Norms

5.1 Summary

Menu

Quality management -> Master data -> Norms

Master data  Quality management  Norms

Transaction code

Norm

Function authorization  Norm

The  application  "Norms"  provides  an  overview  of  all  existing  norms  inclusive  of  reference  values  i.e.  fit

dimensions.  This application processes entries for norms and setting up new norms.

Purpose

If a new norm is set up, an entry in the CAQ status table is created for this norm including long and short

name.  The norm is now available in the selection list for characteristics.

WEP-PPW_82.docx

Version: 1.1.23372

Page 113 of 182

Integration

Goods Receipt Inspection Planning

If all entries of a norm are deleted, then the system removes the entry of the norm in the CAQ

status table. Then this norm is not available in the selection list.

WEP-PPW_82.docx

Version: 1.1.23372

Page 114 of 182

Goods Receipt Inspection Planning

The  fields  short  and  long  norm  are  only  considered  when  creating  the  first  entry  of  a  norm.

They cannot be changed retrospectively.

Requirements

Editing functions

The following dialog opens to edit a data record:

WEP-PPW_82.docx

Version: 1.1.23372

Page 115 of 182

Goods Receipt Inspection Planning

17  Units

Overview

HYDRA menu

System administration  System settings  Units

FEDRA menu

System administration  System settings  Units

Transaction code

unit

Function authorization  mdunit

Purpose

The units are stored in an administration table. This table is used during validation checking to compare

the  quantity  units  entered  (e.g.  at  an  operation)  or  to  check  the  information  transferred  at  the  interface.

Application of units:

Integration

The units are stored in an administration table. This table is used during validation checking to compare

the  quantity  units  entered  (e.g.  at  an  operation)  or  to  check  the  information  transferred  at  the  interface.

The units are used in different areas:

  Quantity units in the order backlog

  Quantity units in order entry and posting

  Quantity units used to enter rolls

Field descriptions

Unit

Unit of quantity, such as kg

Unit ISO

ISO quantity unit, if different

Type

This field can be used to group different quantity units, such as mm, cm, m, km, etc. belonging to

the "length" type.

This value can be selected and transferred from the list. Alternately, any other arbitrary  value can

be entered here manually.

Designation

Designation or description of the unit (e.g. kilogram)

WEP-PPW_82.docx

Version: 1.1.23372

Page 116 of 182

Goods Receipt Inspection Planning

SI unit

Unit as stipulated by the "SYSTEME INTERNATIONAL" agreements.

Values Y/N; there can be a maximum of one SI unit within one type. However, there can also be

types that do not have an SI unit.

Usage: One unit of measure is designated as SI unit in each dimension. Among other things, this is

the reference point used when converting from one unit to another.

Examples: The SI unit used for length is meter; the SI unit used for time is second, etc.

WEP-PPW_82.docx

Version: 1.1.23372

Page 117 of 182

Goods Receipt Inspection Planning

18  Catalogs

18.1  Overview

Menu

Master data  Quality management  Catalog

Transaction code

cat

Function authorization

cat

18.2  Purpose

Use  this  function  to  create,  insert,  edit,  copy  and  delete  catalog  entries.  If  you  use  imported  catalog

entries (QMS), do not change the application's contents because this application contains catalog entries,

which are exclusively populated by SAP-QM using the QM-IDI interface. The application also includes the

usage decisions of inspection points, which are also used in the in-production inspection (no SAP-QM or

QM subsystem). Via customization, you can change the inspection point decisions that are not passed via

SAP-QM.  Contact  the  MPDV  Consulting.  As  part  of  the  customization,  you  can  change  field  names,

deactivate specific entries or create new inspection point decisions.

SAP-QM provides the following catalogs, for example:

  Usage decisions for the inspection point and the inspection requirement (inspection batch),

  Failure types,

  Failure locations

The  application  provides  an  overview  of  the  selection  lists  that  can  be  called  during  the  inspection

process.  The  higher-level  planning  system  (SAP-QM)  then  specifies  where  and  which  catalog  is

available.

18.3

Integration

In the  inspection processes, the catalog contents are provided  as selection lists.  You can, for example,

select  an  inspection  point  decision  or  an  evaluation  of  a  characteristic  from  a  selected  catalog.  As  a

subsystem of SAP-QM, this master data catalog includes all data records of the required QMS catalogs.

The data records are passed via QM-IDI.

If the function extension of the in-production inspection is available (license FEP-AQF), you can specify

an inspection point decision as Setup inspection. Measured values and attributive inspection results of a

Setup inspection are automatically set to invalid when the inspection point is completed. For further

details, refer to option 1223 in the procedure document Configuration_QM_Options.

WEP-PPW_82.docx

Version: 1.1.23372

Page 118 of 182

Goods Receipt Inspection Planning

18.4  Selection criteria

The application provides the following selection criteria:

Catalog type

Number of the catalog type

Selected set

Subgroup of the catalog type

Plant

The production site where the catalog is used.

Code

ID number (alphanumeric)

Code group

Group identification of specific codes

Selection

Checkbox

All  filter  fields  provide  a  match  code  search,  except  for  the  checkbox  Selection.  Use  the  Selection

checkbox  to  specify  if  all  data  records  are  displayed  or  only  the  data  records  with  activated  or  not

activated Selection field.

18.5  Field descriptions

The available fields are self-explanatory and, as a result, not explained separately.

18.6  Editing functions

The below screenshot shows an example of an editing dialog. Design and alignment of fields can deviate

from the example shown.

WEP-PPW_82.docx

Version: 1.1.23372

Page 119 of 182

Goods Receipt Inspection Planning

Although you can enter up to ten characters in the fields Code group and Code, you must limit

the entry in field Code group to eight characters and in field Code to four characters.

Longer character strings cannot be used in the AIP recording of inspection data. Example: This

is  important  for  the  inspection  point  decisions  or  characteristics  that  are  evaluated  using  an

evaluation catalog.

Toolbar

The  application  does  not  provide  any  special

function  buttons

in  addition

to

the  standard

functions/features.

WEP-PPW_82.docx

Version: 1.1.23372

Page 120 of 182

Goods Receipt Inspection Planning

19  Inspection planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 121 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 122 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 123 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 124 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 125 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 126 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 127 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 128 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 129 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 130 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 131 of 182

Goods Receipt Inspection Planning

When you have selected the configuration file, then you select the import file. For the import of data from

a CAD drawing, enable the selection option "Free path". Using this selection option,  you can select any

import file.

For the import of HYDRA-FMEA characteristic data, enable the selection option "Import path".

WEP-PPW_82.docx

Version: 1.1.23372

Page 132 of 182

Goods Receipt Inspection Planning

During  the  previous  export  of  HYDRA-FMEA  characteristic  data,  the  exported  characteristic  data  is

automatically stored in the import path. In the HYDRA path configuration, the URL path is configured for

the  path  "QMIMP".  The  path  "QMIMP"  must  be  available  before  using  the  import  function  for  FMEA

characteristic  data.  If  the  import  path  ist  not  available,  you  must manually  create  the  path.  If  the  import

path  is  available,  you  must  check  the  path  configuration  before  the  first  import.  If  required,  correct  the

specified URL path. It might be required to correct the system, for example.

The below screenshot shows a possible path configuration for the import of HYDRA-FMEA characteristic

data.

WEP-PPW_82.docx

Version: 1.1.23372

Page 133 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 134 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 135 of 182

Goods Receipt Inspection Planning

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

10.  You can then add a new characteristic between  two existing characteristics at a later point  in

time.

WEP-PPW_82.docx

Version: 1.1.23372

Page 136 of 182

Goods Receipt Inspection Planning

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

If  you  define QM operations,  you must be careful  that the  operation created  in  the production

order  later  on  is  not  the  last  operation.  For  example:  If  the  last  productive  operation  is  the

operation  "0030"  and  you  want  to  define  characteristics  with  reference  to  a  QM  operation  for

this operation, you should use "0029" for this QM operation.

WEP-PPW_82.docx

Version: 1.1.23372

Page 137 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 138 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 139 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 140 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 141 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 142 of 182

Goods Receipt Inspection Planning

The documents of the different characteristics are also transferred.

Document management

Click here to call the Document management.

"Inspection plan documents“ and "Documents of inspection plan

characteristics“ – Detail applications

The above screenshot shows how an inspection plan document is assigned.

WEP-PPW_82.docx

Version: 1.1.23372

Page 143 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 144 of 182

Goods Receipt Inspection Planning

"Inspection plan documents“ and "Documents for inspection plan

characteristics" – Toolbar

In addition to the standard functions, the button to show documents is available.

Show documents

If  a  document  link  is  stored,  this  button  opens  and  shows  the  linked  document.  However,  a

program, which can show the linked file type, must be installed in the PC.

WEP-PPW_82.docx

Version: 1.1.23372

Page 145 of 182

Goods Receipt Inspection Planning

20  Inspection requirements

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 146 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 147 of 182

Goods Receipt Inspection Planning

Selection criteria

The  following  list  shows  some  of  the  available  selection  criteria.  Self-explanatory  filter  options  are  not

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 148 of 182

Supplier number

You can directly enter the number or open the supplier catalog where you can select an entry and

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 149 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 150 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 151 of 182

Goods Receipt Inspection Planning

Date - quantities

Actual quantity

The system uses the actual quantity to calculate the inspection scope. The calculation is based on

the selected sampling scheme. This is especially true  in goods receipt and goods issue if dynamic

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 152 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 153 of 182

Goods Receipt Inspection Planning

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

List of the responsible parties  that includes only the previously selected type. This list includes all

master data that is marked accordingly in the “party in charge” field.

Party in charge name

Only shows the name/designation of the selected responsible party.

Form

Form type of the inspection plan used.

WEP-PPW_82.docx

Version: 1.1.23372

Page 154 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 155 of 182

Goods Receipt Inspection Planning

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

The print dialog  of the  inspection  requirement header  opens  a list of available reports. These are Word

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 156 of 182

Goods Receipt Inspection Planning

Print – Toolbar

There are no other special function buttons in addition to the standard functions/features.

"Complete inspection requirement“ detail application

Function authorization

irp.complete

To complete an inspection requirement, click the respective button in the toolbar. An editing dialog opens.

The system displays  information on the inspection requirement (i.e. order, batch, article, company data)

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 157 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 158 of 182

Goods Receipt Inspection Planning

Tab Inspection point identification

You can activate up to nine different fields, which can or must be filled out later when inspection points

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

A scrap quantity may be entered in this field when the  inspection step is completed. This quantity

specification is used for information purposes only and is not processed by default. Normally, this

field is only used if the shop floor data collection module (BDE) is not used in production, i.e. only

the CAQ module is in use. This field is also useful in goods receipt and goods issue.

WEP-PPW_82.docx

Version: 1.1.23372

Page 159 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 160 of 182

Goods Receipt Inspection Planning

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

floor data collection module (BDE)  is not used in production, i.e. only the CAQ module is in use. These

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 161 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 162 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 163 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 164 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 165 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 166 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 167 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 168 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 169 of 182

In addition to the respective measure number and designation, the following data is also referenced.

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 170 of 182

All data of the selected inspection step characteristic is used for the graphic presentation.

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 171 of 182

Goods Receipt Inspection Planning

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

This function also shows extreme outliers in the control chart. Disadvantage: The other measured

values are much smaller in the layout and it is more difficult to identify changing values or a trend.

WEP-PPW_82.docx

Version: 1.1.23372

Page 172 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 173 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 174 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 175 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 176 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 177 of 182

Control chart 1/2 and histogram - toolbar

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 178 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 179 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 180 of 182

Goods Receipt Inspection Planning

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

WEP-PPW_82.docx

Version: 1.1.23372

Page 181 of 182

Goods Receipt Inspection Planning

  Number of non-conforming units

  Number of defects

  p and

  u.

WEP-PPW_82.docx

Version: 1.1.23372

Page 182 of 182


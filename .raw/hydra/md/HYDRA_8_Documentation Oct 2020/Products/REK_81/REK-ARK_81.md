Manual

Reports about Complaint
Costs
REK-ARK 8.1

Version 1.0.1374

Last changed on: 19.06.2020

Reports about Complaint Costs

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

REK-ARK_81.docx

Version: 1.0.2401

Page 2 of 17

Reports about Complaint Costs

Contents

1  Overview of Complaint Cost Reports ........................................................... 4

2  Cost Types ................................................................................................... 5

3  Analysis of Complaint Costs ........................................................................ 9

4  Summary .................................................................................................... 12

4.1  General notes on the document ........................................................................ 12

5  Groups ....................................................................................................... 13

5.1  Starting the function .......................................................................................... 13

5.2  Default Application Layout ................................................................................. 14

5.3  Toolbar .............................................................................................................. 14

5.4  Selection parameters ........................................................................................ 16

5.5

"Groups" Detail Application ............................................................................... 16

REK-ARK_81.docx

Version: 1.0.2401

Page 3 of 17

Reports about Complaint Costs

1  Overview of Complaint Cost Reports

Fields of application

This function allows for different cost types to be assigned to the complaint header and complaint detail

as well as for them to be analyzed in graphics.

Implementation notes

This component is recommended if you wish to record and analyze the accrued costs in addition to the

general recording/maintenance of complaints.

Cost types need to be defined in the master data of complaint management.

Integration

This  component  correlates  basically  with  the  component  for  the  collection,  editing  and  management  of

complaints.

Features

These functions are available.

  Definition of cost types within the master data of complaint management

  Assignment of different cost types indicating the corresponding amounts for the complaint header

or complaint detail

  Graphic  evaluation  of  recorded  cost  (types)  including  extensive  filter  criteria  and  presentation

options

REK-ARK_81.docx

Version: 1.0.2401

Page 4 of 17

Reports about Complaint Costs

2  Cost Types

Overview

Menu

Master data  Quality management  Cost types

Transaction code

Function authorization

co

co

This master data catalog has been designed to define different cost types at a central place providing the

option of pre-assigning cost rates and durations as well as to define and assign cost groups.

Utilization

The "cost type" field is the key field, i.e. while saving a new cost type, the system checks whether there is

already a cost type with this key information.

REK-ARK_81.docx

Version: 1.0.2401

Page 5 of 17

Reports about Complaint Costs

When a new cost type is created or an existing cost type is changed, the selection lists "areas" and "valid

for" define to which areas and modules the cost type applies. Selection lists allow for several entries to be

selected.  Consequently,  it  is  possible  to  assign  a  cost  type,  e.g.  to  the  areas  "goods  receipt"  and

"production" but not to the "goods issue". When costs are later assigned to a complaint, it is possible to

restrict the cost types accordingly by filtering specific areas and modules in the selection list of costs.

The  initialization  of  an  amount  may,  for  example,  be  enabled  when  selecting  a  cost  type  by  entering  a

value  in  the  "initialization  amount"  and  "init  duration"  fields.  This  simplifies  the  collection  of  complaint

costs considerably. This function should be applied,  in particular for, potential  lump sum costs, such as

"delivery/shipment", "processing fee" or "rework". Provided that fixed lump sum costs or lump sum hourly

rates (e.g. for rework) are to be defined, the field "initialization amount" is to be assigned to the cost rate

and the field "init duration" is to be assigned the value 1, for example. If a cost type that is configured in

such a way is assigned to a complaint, the "amount" field immediately shows the initial amount and the

"duration"  field"  shows  the  initial  duration.  Before  saving  this  assignment,  the  duration  may  still  be

changed  e.g.  to  1:30  (1  hour  and  30  minutes).  Once  saved,  the  value  entered  in  the  "amount"  field  is

multiplied by the specified duration and saved as the new cost rate.

Cost  type  groups  may  optionally  be  defined  beforehand  and  the  relevant  group  can  be  assigned  to  the

cost type. This option should not be missed out as it provides improved reports/evaluations. Groups can

be assigned by opening the group tree using the magnifying glasses function. The requested group may

be  selected  and  taken  over  in  the  group  tree  by  way  of  hierarchical  tree  entries.  The  assigned  group

including the hierarchical group structure can then be found in the "groups" field of the editing dialog for

the cost types.

The columns "group 1" to "group 5" represent the group hierarchy if cost types are displayed in lists.

Groups  are  edited  in  the  "cost  type  groups"  application,  which  is  described  in  the  manual  entitled

MOC_Groups.pdf.

Under  certain  circumstances,  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for cost type numbers as cost key.

By distinguishing between active and inactive cost types, it can be defined whether or not they are still to

be available  in selection lists for the costs in the data acquisition process. However, inactive cost types

may still be evaluated at any time. Moreover, inactive cost types may also be reactivated at any time.

Integration

The  cost  type  catalog  is  used  in  the  complaint  module  to  record  complaint  costs.  In  addition  to  this,  it

represents the basis for the analysis of complaint costs.

REK-ARK_81.docx

Version: 1.0.2401

Page 6 of 17

Reports about Complaint Costs

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection criteria are self-explanatory and not described separately. Cost types of a group can be filtered

in the "groups" tab using the icon

 and selecting a cost type group (in tree structure). The group tree

list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive cost types.

Field descriptions

The sections that follow describe the selection criteria that are not self-explanatory.

Cost type

ID number of the cost type

Cost designation

Designation of the cost type

Inactive

The  "inactive"  check  box  identifies  cost  types  that  are  no  longer  to  be  used  in  the  active  data

acquisition process.

Valid for

Modules/applications for which the cost type applies. A selection list is available.

Areas

Areas  for  which  the  cost  type  applies.  A  selection  list  is  available,  e.g.  goods  receipt,  production,

goods issue, complaint management.

Initialization amount

Definition of the initial amount that is, for example, to be pre-assigned when assigning a cost type

to a complaint.

Init duration

Definition of the initial duration that is, for example, to be pre-assigned when assigning a cost type

to a complaint.

REK-ARK_81.docx

Version: 1.0.2401

Page 7 of 17

Reports about Complaint Costs

Cost rate amount

Should  be  assigned  to  the  same  value  as  in  "initialization  amount",  as  this  amount  is  also  saved

when assigning a cost type to a complaint. The "cost rate amount" field shows the original amount if

the duration and, as a result, the cost rate (after saving) is changed when assigning costs or if the

cost rate is changed directly.

Groups

In a tree structure the group field shows the assigned group or allows for groups to be assigned in

form of the tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions/features.

REK-ARK_81.docx

Version: 1.0.2401

Page 8 of 17

Reports about Complaint Costs

3  Analysis of Complaint Costs

Overview

Menu

Quality management  QM evaluation  Analysis of complaint costs

Quality  management    Complaints  management    Analysis  of  complaint
costs

Transaction code

cmcoep

Function authorization

cmcoep

REK-ARK_81.docx

Version: 1.0.2401

Page 9 of 17

Reports about Complaint Costs

Utilization

The analysis of complaint costs allows for the costs recorded in complaint management to be evaluated.

In  this  context  evaluations/reports  are  based  on  pivot  functions.  These  functions  provide  different

presentation  options,  e.g.  the  number  of  complaint  costs  is  presented  for  each  complaining  party

separated  by  the  cost  type  and  relating  to  a  previously  filtered  period  of  time.  These  analyses  help

determine the core areas that might require action to be taken.

Integration

The  analysis  of  complaint  costs  only  evaluates  data  relating  to  the  costs  recorded  in  complaint

management. In this context, it is distinguished between the costs in the complaint header and complaint

detail including the corresponding detailed information.

Prerequisite

There  are  no  special  requirements  to  be  met.  Only  complaint  costs  need  to  be  recorded  in  complaint

management including all corresponding detail data.

Selection criteria

Selection criteria are self-explanatory and not described separately.

Toolbar

There are no other special function buttons in addition to the standard functions/features.

Detail applications "Graphic analysis of complaint costs“

Data  is  displayed  in  a  pivot  table  in  combination  with  bar  charts.  Different  application  functions  are

provided  for  the  presentation.  The  complaint  costs  that  have  been  restricted  beforehand  by  entering

selection criteria represent the data basis.

The general pivot functions are not described in more detail in this document. The paragraphs that follow

only describe the elementary functions of this evaluation/report.

Pivot evaluations/reports provide the following benefits.

  Large amounts of data may quickly be summarized and presented.

  Rows and columns can be exchanged to have the source data summarized differently.

  Simple filters by "drag and drop" with additional detail filters.

  Due to this interactive way of representation, data can be summarized and analyzed in different

formats and using different calculation methods.

REK-ARK_81.docx

Version: 1.0.2401

Page 10 of 17

The below context menu can be opened by clicking the right mouse button.

Reports about Complaint Costs

The function "show field list" allows for the fields that are to be used in the pivot analysis to be selected.

The below figure shows a possible list of fields.

The requested fields may be put into the evaluation area by drag & drop.

In addition to the selection criteria, the "show filter editor" function enables further flexible restrictions of

the data basis.

REK-ARK_81.docx

Version: 1.0.2401

Page 11 of 17

Reports about Complaint Costs

The below dialog is opened to show the settings made.

If  the  "selection"  option  is  checked  entire  areas  may  be  selected  in  the  table  view.  In  this  case,  the

graphic representation is based on the selected rows. If the "label" option is checked it is possible to show

the total number of each bar.

The  row  showing  the  total  result  may  be  displayed  additionally  in  the  bar  chart  if  the  "totals"  option  is

checked. Provided that the "selection" function is checked and the corresponding cells of the "total result"

row are selected, the total result is added to the corresponding column of the relevant bar.

It  is  switched  between  the  graphic  presentation  of  the  corresponding  number  of  columns  or  rows  by

checking/unchecking the "columns" option.

Detail application "list of the complaint costs analysis“

The  list  of  the  complaint  costs  analysis  shows  the  complaint  costs  including  referenced  data  that  are

filtered on the  basis of the used selection criteria. Normally, the referenced data correspond to the field

list for the pivot analysis.

4  Summary

4.1  General notes on the document

This  document  describes  the  “Groups“,  e.g.  article  groups,  application  of  the  Manufacturing  Operation

Center (MOC). For general information on how to use MOC, please refer to the “moc_cc.pdf“ document.

REK-ARK_81.docx

Version: 1.0.2401

Page 12 of 17

Reports about Complaint Costs

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

REK-ARK_81.docx

Version: 1.0.2401

Page 13 of 17

5.2  Default Application Layout

Reports about Complaint Costs

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

REK-ARK_81.docx

Version: 1.0.2401

Page 14 of 17

Reports about Complaint Costs

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

REK-ARK_81.docx

Version: 1.0.2401

Page 15 of 17

Reports about Complaint Costs

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

REK-ARK_81.docx

Version: 1.0.2401

Page 16 of 17

Reports about Complaint Costs

The  "delete  selection"  function  cannot  be  used  in  the  maintenance  of  groups  dialog.  This  function  is

enabled,  for  example,  in  the  maintenance  of  articles  application  if  an  article  group  is  selected  and  this

selection is to be removed/deleted.

REK-ARK_81.docx

Version: 1.0.2401

Page 17 of 17


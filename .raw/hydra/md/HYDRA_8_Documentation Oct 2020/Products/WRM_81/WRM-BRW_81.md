Manual

Required Resources
WRM-BRW 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Required Resources

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WRM-BRW_81.docx

Version: 1.0.23049

Page 2 of 10

Required Resources

Contents

1  Overview of Required Resources ................................................................ 4

1  Overview ...................................................................................................... 5

1.1  General notes on the document .......................................................................... 5

1.2  Classification ....................................................................................................... 5

2  Required Resources .................................................................................... 6

2.1  Starting the Function ........................................................................................... 6

2.2  Toolbar ................................................................................................................ 6

2.2.1

"General" tab ........................................................................................... 6

2.3  Selection parameters .......................................................................................... 8

2.4  Detail Applications ............................................................................................... 8

2.4.1  Table view ............................................................................................... 8

2.5  Editing functions .................................................................................................. 9

2.5.1  Add new data record ............................................................................... 9

2.5.2  Copy data record ..................................................................................... 9

2.5.3  Delete data record ................................................................................... 9

2.6  Field description .................................................................................................. 9

WRM-BRW_81.docx

Version: 1.0.23049

Page 3 of 10

Required Resources

1  Overview of Required Resources

Purpose

Required  resources  have  been  designed  to  facilitate  handling  of  anonymous  resources  required  in

planning and resource allocation. One or several specific resources can be assigned to one anonymous

resource. In the list of production resources and tools the anonymous resource is used as a placeholder

for one of the specific resources assigned.

When  logging  on  resources,  one  of  the  specific  resources  is  logged  on  instead  of  the  anonymous

resource.

Implementation notes

The function package is used if you would like:



to define anonymous resources required and assign specific resources that can actually be used

to cover requirements.





to consider required resources while assigning resources

to log on/off specific resources assigned to a required resource

Integration

Required  resources  enable  management  and  planning  of  anonymous  resources  required  instead  of

specific, individual resources.

The displayed resource allocation results from detailed planning in HYDRA Shop Floor Scheduling or the

ERP system.

Functions

Definition of anonymous resources required and assignment of real resources that can be used to cover

the demand

Taking into account the availability of required resources when planning and assigning resources

Terminal function to log on/off a real resource instead of an anonymous resource

WRM-BRW_81.docx

Version: 1.0.23049

Page 4 of 10

Required Resources

1  Overview

1.1  General notes on the document

This  document  describes  the  application  "Required  Resources”  within  the  Manufacturing  Operation

Center  (MOC).  General  information  on  how  to  use  MOC  can  be  found  in  the  document  entitled

“moc_cc.pdf“.

1.2  Classification

This  function  allows  for  resources  to  be  assigned  to  a  required  resource.  A  required  resource  is  a

placeholder  for  a  specific  amount  of  actual  resources.  Required  resources  can  be  taken  into  account

during planning. To do so, the required resources are entered as demand in their required amount for the

operation  in  the  PRT  list.  This  requirement/demand  is  considered  when  assigning  resources.  The

available  amount  matches  the  quantity  of  actual  resources  assigned  to  the  required  resource  in  this

application.  When  logging  orders  on  to  the  HYDRA  terminal,  a  resource  that  is  assigned  to  a  required

resource has to be logged on explicitly.

Example:

Five identical tools are available for the production of an article/item. When planning, it is irrelevant which

one of these five identical tools is actually used to produce the article. The shop floor scheduling module

considers the required resource that is assigned to the operation as anonymous resource that is available

in a quantity of five tools.

When logging the operation on to the shop floor terminal, it is up to the user's decision which one of the

five available tools, they actually want to use by logging on the required one.

WRM-BRW_81.docx

Version: 1.0.23049

Page 5 of 10

Required Resources

2  Required Resources

2.1  Starting the Function

Menu

Master data  Resources  Required resources

Transaction code

reqres

Function authorization  mdreqres

2.2  Toolbar

The  following  functions  can  be  started  using  the  toolbar  of  the  application.  These  functions  affect  the

entire application including all detailed applications.

2.2.1 "General" tab

"Data" category

Request data

The information displayed in the application is requested according to the entered selection criteria.

This process might take some time depending on the dataset from which the system filters data and

on the selection result to be transferred and displayed.

Cancel

The query sent by clicking the “request data” button can be canceled using this function.

 Print preview

The  print  preview  is  opened  for  the  selected  detail  application.  The  print  preview  also  includes

further options to change the resulting printout and functions for exporting the displayed information

into other formats, such as PDF, Excel, image files.

Save

The  application  design  configured  by  the  user,  e.g.  columns  and  categories  displayed  as  well  as

their respective size and display locations, etc. are only saved  if the user requests it. In this case,

the user has to affirm the confirmation prompt by clicking “Yes”.

WRM-BRW_81.docx

Version: 1.0.23049

Page 6 of 10

Required Resources

“Functions” Category

  Add

Function authorization: mdreqres.create

Opens the editing dialog to create a new entry.

Edit

Function authorization: mdreqres.edit

Opens the editing dialog to modify an existing entry.

Copy

Function authorization: mdreqres.copy

Opens the editing dialog to copy an existing entry.

Delete

Function authorization: mdreqres.delete

Opens the editing dialog to delete existing entries.

"Go to" category

  Required resource

Function authorization: mdres

Opens the application "resource configuration" for the selected required resource.

  Assigned resource

Function authorization: mdres

Opens the application "resource configuration" for the assigned resource.

“Help” Category

   Help on operation

Clicking  this  button  opens  the  help  file  describing  how  to  operate  MOC.  The  basic  document  is

entitled “moc_cc.pdf”. It describes how to use MOC in general and applies for all applications.

WRM-BRW_81.docx

Version: 1.0.23049

Page 7 of 10

Required Resources

  Help on application

This  function  opens  the  manual  for  the  respective  application  from  which  the  help  file  was

requested.  The  application  manual  integrates  the  application  function  into  the  MES  context  and

explains the information to be displayed. The documentation also includes all detailed applications.

   Help on detail application

This function opens the application manual at the section where the relevant detailed application is

described.

2.3  Selection parameters

The  selection  panel  can  be  used  to  filter  by  superordinate  or  by  assigned  resources.  The  following

selection criteria are available in the application:

Resource type

Type of resource.

Resource family

Family to which the resource is assigned.

Resource

Unique ID of the resource.

2.4  Detail Applications

2.4.1 Table view

The  table  view  of  the  detail  application  offers  the  user  an  overview  of  existing  entries.  The  displayed

information can be sorted using table functions and depends on specified selection parameters.

When an editing function is started, it affects the entry/entries selected in the table.

The  displayed  fields  can  be  customized  using  the  “add  columns”  or  “remove  columns”  functions  of  the

context menu (column configurator).

Individual fields are described in the section entitled "field description".

WRM-BRW_81.docx

Version: 1.0.23049

Page 8 of 10

Required Resources

2.5  Editing functions

2.5.1 Add new data record

Clicking the “insert” function opens an input dialog that provides the possibility to create and save a new

entry along with all corresponding fields.

Once the values have been entered, the user can save the entered parameters and exit the input dialog

by clicking the

 button.

Using the

 button, the user is able to cancel the input and to leave the input dialog (without saving).

Individual fields are described in the section entitled "field description".

2.5.2 Copy data record

The “copy” function provides the option to use an existing entry as a template for creating a new entry.

Once data have been copied, the user may save the new data record and exit the copy dialog by clicking

the

 button.

The

 button enables the user to cancel the copy process and to leave the copy dialog (without saving).

2.5.3 Delete data record

By  selecting  a  data  record  in  the  table  view  and  clicking  the  “delete”  function,  the  user  can  delete  the

selected entry.

The user is able to carry out or cancel the deletion process for the selected data record by answering the

confirmation prompt that opens.

2.6  Field description

Resource type

Resource  type  which  the  resource  is  assigned  to.  This  field  is  respectively  displayed  for  the

required resource as well as for the assigned resource.

Resource family

Resource  family  which  the  resource  is  assigned  to.  This  field  is  respectively  displayed  for  the

required resource as well as for the assigned resource.

WRM-BRW_81.docx

Version: 1.0.23049

Page 9 of 10

Required Resources

Resource

Unique ID of the resource. This field is respectively displayed for the required resource as well as

for the assigned resource.

Name/Description

Unique resource name. This field is respectively displayed for the required resource as well as for

the assigned resource.

Responsibility area

Responsibility area which the resource is assigned to.

Further master data fields can be shown in the table, please also see the application dealing with  Master

data configuration of resources.

WRM-BRW_81.docx

Version: 1.0.23049

Page 10 of 10


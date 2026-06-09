Manual

AIP Functions Tool and
Resource Management
AIP-WRM 8.2

Version 1.0.23049

Last changed on: 01.09.2020

AIP Functions Tool and Resource Management

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-WRM_82.docx

Version: 1.0.23049

Page 2 of 15

AIP Functions Tool and Resource Management

Contents

1  Overview AIP Functions Tool/Resource Management ................................ 4

2  Posting Functions in the Tool and Resource Management ......................... 6

1.1.  Operation logon with resources ........................................................................... 6

1.2.

Interrupt/log OP off .............................................................................................. 8

1.3.  Change of resources ........................................................................................... 8

1.4.  Enter resource comment ..................................................................................... 9

1.5.  Maintenance...................................................................................................... 11

1.6.  Change resource status .................................................................................... 13

AIP-WRM_82.docx

Version: 1.0.23049

Page 3 of 15

AIP Functions Tool and Resource Management

1  Overview AIP Functions Tool/Resource Management

Purpose

The AIP features contained in this function package make it possible to enter tool and resources related

data directly in production using shop floor terminals or data entry PCs

Implementation considerations

You use the function package if you:

  Would like to see the resources corresponding to the orders at the machines

  Would like to see and process maintenance corresponding to the resources

  You would like to execute postings for the resources at the terminal such as log on, log off, status

change

  Enter measures corresponding to the resources

Integration

Welche  Beziehungen  bestehen  zwischen  dieser  Komponente  und  anderen  Komponenten  oder

Funktionen?

AIP offers the ability to automatically transfer data from the machine, to record it and to forward it to the

server to be posted. Various interfaces are available for this purpose.

Data entered using AIP can be displayed in various applications or evaluated in MOC.

Features

Resource-related entry and posting functions:

  Posting functions

o  Change resource status

o  Enter measures

o  Transfer stock

o  Log required resources on/ off

  Display resource data

o  Display  resources  logged  on  to  the  machine.  Display  resources  corresponding  to  the

operation. Display maintenance information corresponding to the resources.

Additional licenses are needed in order to use the functions listed above.

AIP-WRM_82.docx

Version: 1.0.23049

Page 4 of 15

AIP Functions Tool and Resource Management

AIP-WRM_82.docx

Version: 1.0.23049

Page 5 of 15

AIP Functions Tool and Resource Management

2  Posting Functions in the Tool and Resource Management

If the tool and resource management is active, the buttons  Maintenances, Enter resource comment and

Change resource status are available in the area of the resources logged on.

1.1.  Operation logon with resources

An  operation  is  logged  on  by  clicking  the  “log  OP  on”  button.  In  addition  to  the  selected  OP,  a  list  also

shows the assigned production resources and tools.

The  following  requirements  have  to  be  met  to  have  the  required  resources  displayed  in  the  list  of

production resources and tools as well.

The  option  “display  material/PRT  list  when  logging  OP  on”  has  to  be  enabled  in  the

workplace/machine configuration.

The assigned resource has to be configured with the “explicit logon” or “required resource” option

within the resource stock.

Posting procedure

A workplace has to be selected before the operation is logged on. Thus, the workplace is already defined,

when the dialog is opened.

Starting of the “log operation on” function

The  “log  operation  on”  button  is  to  be  clicked.  The  user  is  navigated  through  the  posting  dialog  as

soon as the function has been started. Subject to the workplace configuration, the “log operation on”

dialog is now started either including batch posting or without.

Select operation

Selection from the existing list or manual entry.

Batch

AIP automatically generates the batch. Input is not required/possible.

Status

Select the status from the list or enter it manually.

Batch/resource

The batch or resource number to be logged on can be entered here. This production resource and

tool is logged on by clicking the “report batch” button.

Resources,  which  have  already  been  logged  on,  are  highlighted  in  green  in  the  list,  resources,

which have not yet been logged on, are displayed in blue.

AIP-WRM_82.docx

Version: 1.0.23049

Page 6 of 15

AIP Functions Tool and Resource Management

Provided  that  all  required  production  resources  and  tools  are  logged  on,  the  OP  can  be  started

using the “log operation on” button.

Posting of required resources

The  functionality  described  below  is  only  available  as  of  service  pack  15.  Existing

systems,  which  have  been  implemented  before  service  pack  15,  can  only  use  this

functionality if the function is implemented as part of a service.

The application provides a button behind the input field and the prompt Select resource is shown if

the following conditions are fulfilled:

  A required resource is selected in the list.

  No actual resource has been logged on for this required resource yet.

The button can be used to call a selection dialog. The selection dialog displays all resources, which

are  assigned  to  the  required  resource  and  available.  A  resource  is  available  if  the  following

conditions are fulfilled:

  The resource is currently not logged on to another workplace.

  The resource has a status that is configured as "released".

For each resource, the selection dialog displays the following:

  Resource type of the resource

  Resource number of the resource

  Name of resource

  Assigned resource family

  Current storage location of the resource

Input of staff badge number

The staff badge number of the person entering the values must be entered.

Confirmation of “log operation on”

The operation is logged on by clicking the “log operation on” button. Once the operation has been

logged on successfully, it is displayed within the list of the main AIP dialog.

When the operation is logged on, the workplace, which this operation is logged on to, is entered in

the “workplace” field of the backlog of orders dialog. Thus, the workplace (that might deviate from

this one), which this operation has so far been planned on, is overwritten. Consequently, the OP is

actually re-planned.

AIP-WRM_82.docx

Version: 1.0.23049

Page 7 of 15

AIP Functions Tool and Resource Management

1.2.  Interrupt/log OP off

General information

All  resources  that  are  active  for  an  operation  will  also  be  logged  off  if  this  operation  is  interrupted  or

logged off.

The  procedure  is  the  same  as  for  “logging  an  operation  off”  or  “interrupting  an  operation”.  The

“interrupt/log operation off” button triggers this process.

1.3.  Change of resources

You can perform a resource change for a  logged on resource  with running operations,  if the  logged on

resource is configured with the option Explicit logon in the Resource stock. The resource change is also

possible  with  resources  assigned  to  a  required  resource  because  these  resources  must  be  configured

with the option Explicit logon.

Use the button Change of resources to change resources logged on to a running OP.

Posting procedure

The workplace and operation have to be selected, for which resources are to be changed.

Starting of the function

The “change of resources” button from the “operations” section has to be clicked.

Resource

The resource to be posted has to be entered here.

If a resource is entered in the "resource" field, which is not logged on and thus is not included in the

list of active resources, it will be logged on by clicking the “log resource on” button.

  If a resource is entered in the "resource" field, which is currently logged on and thus is included in

the list of active resources, it will be logged off by clicking the “log resource on” button.

Posting of required resources

The  functionality  described  below  is  only  available  as  of  service  pack  15.  Existing

systems,  which  have  been  implemented  before  service  pack  15,  can  only  use  this

functionality if the function is implemented as part of a service.

The application provides a button behind the input field and the prompt Select resource is shown if

the following conditions are fulfilled:

  A required resource is selected in the list.

AIP-WRM_82.docx

Version: 1.0.23049

Page 8 of 15

AIP Functions Tool and Resource Management

  No actual resource has been logged on for this required resource yet.

The button can be used to call a selection dialog. The selection dialog displays all resources, which

are  assigned  to  the  required  resource  and  available.  For  further  information,  refer  to  section

"Operation logon with resources".

Staff badge number

The entered person must be authorized to perform the posting.

Confirmation of the dialog

The resource is logged off, when the “log resource on” button is clicked, provided that this resource

is included in the list. Consequently, posting of times and quantities is stopped for this resource.

If  the  resource  is  not  included  in  the  list  it  will  be  logged  on.  This  starts  posting  of  times  and

quantities for this resource.

1.4.  Enter resource comment

General information

The “enter resource comment” dialog allows for a comment to be entered for a resource and, as a result,

to document a measure that has been taken.

Posting procedure

Starting the function

The “enter resource comment” button from the “workplaces” section is to be clicked.

Select resource

The resource type or resource family has to be entered to select the resource, for which you would like to

enter a comment.

After clicking/touching the refresh

 button, the table shows all resources that are assigned to

the entered resource type or resource family.

Select the required resource and click “Next”.

Resource type

Specification of the resource type using the list or by manual input. Used for pre-selection.

AIP-WRM_82.docx

Version: 1.0.23049

Page 9 of 15

AIP Functions Tool and Resource Management

Resource family

Specification of the resource family using the list or by manual input. Used for pre-selection.

Resource

Specification  of  the  resource  using  the  list  or  by  manual  input.  The  resource,  for  which  already

entered comments are to be displayed or for which a comment has to be entered.

Enter comment

The  list  shows  the  comments,  which  have  already  been  entered  for  the  selected  resource,  in

chronological order (descending).

To  enter  a  new  comment,  select  an  entry  from  the  catalog  and  enter  a  comment  or  change  the  text

suggested by the catalog.

Catalog

Entries in the “catalog” field (= measure) are made manually or using the list. The corresponding ID

must exist in HYDRA. Entries of catalogs of measures are configured on the basis of the resource

family at the client.

Comment

By default this field is assigned to the comment of the measure and may be overwritten.

Staff badge number

The entered person must be authorized to enter a comment. The authorization is activated  in the

HR master.

Confirmation of input

The dialog is posted in HYDRA by clicking the “confirm comment” button. Then the dialog remains

open and the comment, which has just been entered, is displayed in the list.

The dialog can  be  left by clicking the “cancel” button. Comments that have just  been entered are

saved.

Please note

For technical reasons, comments that are longer than the visible comment field cannot be displayed in full

even if changes are made as a part of customizing services (scrolling is not possible within the column).

AIP-WRM_82.docx

Version: 1.0.23049

Page 10 of 15

AIP Functions Tool and Resource Management

1.5.  Maintenance

The  "maintenances"  dialog  shows  active  and  upcoming  maintenances  and  allows  for  finished

maintenances to be reset.

Posting procedure

Starting the function

The “maintenances” button from the “operations” section is to be clicked.

Select resource

The resource type or resource family has to be entered to select a resource, for which you would like to

display or reset the maintenance.

After clicking/touching the refresh

 button, the table shows all resources that are assigned to

the entered resource type or resource family.

Select the required resource and click “Next”.

Resource type

Specification of the resource type using the list or by manual input. Used for pre-selection.

Resource family

Specification of the resource family using the list or by manual input. Used for pre-selection.

Resource

Specification of the resource using the list or by manual input. Resource, for which the maintenance

is to be displayed or entered.

Select maintenance

The maintenance list shows all maintenances of the selected resource:

Maintenance

Designation of maintenance

Type

ID defining the maintenance type:

AIP-WRM_82.docx

Version: 1.0.23049

Page 11 of 15

AIP Functions Tool and Resource Management

T – Cycle-based maintenance

B – Maintenance by hours of operation

Z – Time-based maintenance

Next maintenance

Subject to the maintenance type, this field shows

T – cycles after which the maintenance becomes due.

B – hours after which the maintenance becomes due.

Z – date on which the maintenance becomes due.

Current value

Subject to the maintenance type, this field shows

T – cycles currently posted onto the resource.

B – hours currently posted onto the resource.

Z – current date

Last maintenance

Date when the maintenance was reset

Select the required maintenance you would like to reset and click “Next”.

The function may be stopped by clicking “cancel”.

Reset maintenance

Comment

A  user-defined  text,  which  is  displayed  in  the  resource  history,  may  be  entered  in  the  “comment”

field (optional).

Staff badge number

According to the HR master, the specified person must be authorized to reset the maintenance.

Confirmation of the “reset maintenance” dialog

The maintenance is reset by confirming the dialog. The next maintenance is calculated subject to

the calculation base (by default: actual value; can be changed by customizing).

In case it is a unique/non-recurring maintenance, it will no longer be displayed in the maintenance

list.

AIP-WRM_82.docx

Version: 1.0.23049

Page 12 of 15

AIP Functions Tool and Resource Management

1.6.  Change resource status

General information

The status of a resource can be changed by clicking the “change status” dialog.

Posting procedure

Starting the function

The “change resource status” button from the “operations” section has to be clicked.

Select resource

Enter  the  resource  type  or  resource  family  to  select  a  resource  for  which  you  would  like  to  change  the

resource status or storage location.

After clicking/touching the refresh

 button, the table shows all resources that are assigned to

the entered resource type or resource family.

Select the required resource and click “Next”.

Resource type

Specification of the resource type using the list or by manual input. Used for pre-selection.

Resource family

Specification of the resource family using the list or by manual input. Used for pre-selection.

Resource

Specification  of  the  resource  using  the  list  or  by  manual  input.  Resource,  for  which  the  resource

status or storage location is to be changed.

Select status

The  list  shows  all  resource  statuses  configured  for  the  resource  family  of  the  resource.  Choose  the

resource status you would like to set.

If  you  only  want  to  change  the  resource  status,  just  confirm  the  dialog  by  clicking  the  “change  status"

button.

If the storage location is to be changed as well, click “Next”.

AIP-WRM_82.docx

Version: 1.0.23049

Page 13 of 15

AIP Functions Tool and Resource Management

New status

The  (new)  status  needs  to  be  entered  (mandatory  input).  The  status  may  either  be  entered

manually  or  chosen  from  the  selection  list.  The  status  must  exist  in  HYDRA.  Statuses  are

configured on the basis of resource types/resource families at the client.

Comment

A  user-defined  text,  which  is  displayed  in  the  resource  history,  may  be  entered  in  the  “comment”

field (optional).

Staff badge number

According to the HR master, the specified person must be authorized to set a resource status.

Confirmation of the “change status“ dialog

By confirming the respective dialog, the resource status of the selected resource is changed.

Select storage location

Choose the storage location from the list to which the resource is to be reposted. Provided that you have

already entered a comment in the last process step, this one is displayed here and may still be changed,

if necessary.

Current storage location

After entering a resource, the current storage location of the selected resource is displayed in the

“current storage location” field. This field has only been designed for display purposes and indicates

which storage location the selected resource is posted on.

New storage location

A  new  storage  location  may  be  entered  in  the  storage  location  field  (optional).  Consequently,  the

current  storage  location  of  the  resource  is  reposted.  The  storage  location  may  either  be  entered

manually  or  chosen  from  the  selection  list.  The  storage  location  must  exist  in  HYDRA.  Storage

locations are configured at the client.

Comment

A  user-defined  text,  which  is  displayed  in  the  resource  history,  may  be  entered  in  the  “comment”

field (optional).

Staff badge number

According to the HR master, the specified person must be authorized to set a resource status.

Confirmation of the “change status” dialog

By confirming the dialog, the resource status of the selected resource is changed and reposted to

the new storage location.

AIP-WRM_82.docx

Version: 1.0.23049

Page 14 of 15

AIP Functions Tool and Resource Management

In case of active resources, it is only possible to switch to a status that is assigned to  the "entry" =

"F" option, since in any other case, the resources can no longer be posted (e.g. log the resource off

when the OP is logged off).

AIP-WRM_82.docx

Version: 1.0.23049

Page 15 of 15


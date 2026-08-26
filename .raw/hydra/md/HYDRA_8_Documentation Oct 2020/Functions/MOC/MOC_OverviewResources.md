Resource Overview

1  Resource Overview

Overview

Menu

Production facility management  Current information  Resource overview

Transaction code

resov

Function authorization

resov.*

The  resource  overview  is  the  central  application  that  provides  an  overview  of  the  current  resources

managed  in  the  system.  The  resource  overview  provides  functions  regarding  status  change,  stock

transfer and documentation of measures.

Purpose

You  can  use  the  Resource  overview  to  show  the  current  status  of  selected  resources.  The  application

shows all resources matching the conditions you specified in the selection parameters.

The  list  shows  the  specified  resource  master  data  and  the  current  resource  status.  If  the  tool  is  active

(logged on), the Resource overview shows the machine and the operation where the resource is logged

on to. If the resource is locked, the overview shows the following:

- the reason of the lock,

- the time when the resource has been locked, and - if entered -

- the time until the resource will be locked.

Integration

You can use the master data function Resource configuration to create, change or delete resources.

Selection criteria

The application provides the following selection criteria:

Resource from ... to ...

This selection criterion refers to the resource. You can also use wildcards (placeholders *).

Short name

Short name of the resource. Only relevant for resources of type MNR.

Resource type

Type of resource.

Designation

Name of the resource.

MOC_OverviewResources.docx

Version: 1.9.18665

Page 1 of 8

Group

Workplace/machine group of the resource. Only relevant for resources of type MNR.

Resource Overview

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

Current storage location

Current storage location of the resource. The functions Status change and Stock transfer are used

to book the resource to this storage location. If you log on a resource to a workplace, this workplace

automatically becomes the current storage location of the resource.

Show deleted resources (as of WRM 8.2)

Use this field to specify if logically deleted resources are shown.

MD user fields

MD  user  fields  1-  6  of  the  resource.  If  you  select  a  resource  family  in  the  selection  panel,  the

application shows the field names according to the assigned user field definition.

Field descriptions

Most field descriptions are included in the application Resource configuration. See the following tabs:

-  General resource configuration

-  User fields

-  Comment

-  Resource attributes

-  Resource list

The additional tabs of the resource overview are described here:

"Status" tab

Active

Specifies whether or not the resource is currently logged on to a workplace.

MOC_OverviewResources.docx

Version: 1.9.18665

Page 2 of 8

Resource Overview

Deleted (as of WRM 8.2)

Specifies whether the resource displayed is logically deleted or not.

Current machine, current order

For active resources, this field specifies the workplace and the order where the resource is currently

logged on.

Current storage location

Current storage location of the resource. The functions Status change and Stock transfer are used

to book the resource to this storage location. If you log on a resource to a workplace, this workplace

automatically becomes the current storage location of the resource.

Resource status, status since

Specifies  the  current  status  of  the  resource.  Number  and  name  are  displayed  and  the  time  when

the status was set.

New status, from, until

You can specify a future status that is set when the status changes. The status is not immediately

set, but an expected future status is specified.

The  HYDRA  Shop  Floor  Scheduling  can  use  this  future  status  to  show  and  monitor  the  resource

assignment.

In the HYDRA Scheduler, a job "WRM resource control" is installed. This job regularly executes the

script  ./hyresctl.scr  /STATUS  (by  default  every  30  minutes).  The  program  called  by  the

script, performs the following processing:





If the time "New status from" is exceeded, the new status is set.

If the time "New status until" is exceeded, then the status is set that includes the value "F" in

field Collection in the status configuration.

Technical  note:  Both  status  changes  are  internally  performed  via  an  asynchronous  DDI  call

(DLG=RES_STATUS or DLG=RES_FREI).

"Use" tab

Target utilization

Cycles

The field Cycles provides additional information. The cycles value defines how long the resource is

to be used.

Runtime

The field Runtime provides additional information. It defines how long the resource is to be used.

MOC_OverviewResources.docx

Version: 1.9.18665

Page 3 of 8

Resource Overview

Actual utilization

Cycles

The total number of cycles that have been recorded for the resource since initialization.

Runtime

The total run time that has been recorded for the resource since initialization.

Yield, scrap

Total of yield or scrap that has been recorded for the resource since initialization  and posted to the

relevant account (base quantity, primary quantity).

Run times since implementation, allocated to RPA

Account name (e.g. SUT, MUT)

Total  number  of  hours  that  has  been  recorded  for  the  resource  and  booked  to  this  resource

performance account since initialization.

Toolbar

Resource tab

 File – Show file (function authorization: mdres.doc)

Opens  the  file  view  –  only  available  for  document  resources,  which  are  configured  as  file-based

resources without DNC processing in the Resource type. And only available if the relevant license

and function authorization are available.

  Go to – Resource configuration (function authorization: mdres)

Opens the application Resource configuration. The selected resource is passed as default value.

  Go to – Resource list (function authorization: mdrbom)

Opens  the  Resource  list  application.  The  selected  resource  is  entered  as  default  value  for  the

higher-level resource.

  Go to – Resource history (function authorization: reshi)

Opens the application Resource history. The selected resource is passed as default value.

 Functions – Measure

Opens the Measures application.

MOC_OverviewResources.docx

Version: 1.9.18665

Page 4 of 8

Resource Overview

 Functions – Status change

Opens the dialog to change a resource status. The following input fields are available:

Status: Status that is set according to configuration.

Material buffer: With the status change, the resource  can be relocated  and transferred to another

storage location.

Set immediately:

- The current date is preassigned to the field from and cannot be changed.

- The field till is empty; you can enter a date here.

Set for period:

- The current date is preassigned to the field from and can be changed.

- The field till is empty; you can enter a date here.

If no date is entered in field till, the system automatically sets the date to 31-DEC-9999.

The checkbox Including subordinate resources is not relevant and reserved for future extensions.

Comment: The comment entered can be displayed in the Resource history.

 Functions – Release of resource

Opens  the  dialog  to  release  a  resource.  The  checkbox  Including  subordinate  resources  is  not  relevant

and reserved for future extensions.

 Functions – Stock transfer

Opens the dialog to transfer/relocate a resource.

 Generate order (function authorization: resovgenorder)

Generates  a  maintenance  order  for  the  selected  data  row.  (The  function  is  only  available  with

function package WRM-IHA).

 Document management (function authorization: resovdoc)

Click this button to call the Document management.

The document management is only available, if the extension QMDocuments is enabled.

DNC tab

The tab is only available, if you select a DNC resource. These are resources configured with  DNC

processing in the Resource type.

MOC_OverviewResources.docx

Version: 1.9.18665

Page 5 of 8

Resource Overview

  File – Export (function authorization: mdres.export)

Exports the file specified for the resource. You use the file explorer to specify the target file.

  File - Import (function authorization: mdres.import)

Imports the file specified for the resource. You use the file explorer to specify the source file.

  File - Viewer (function authorization: mdres.vis)

Opens the file specified for the resource using the defined viewer program.

  File - Editor (function authorization: mdres.editor)

Opens the file specified for the resource for editing using the defined editing program.

  File – Comparison editor (function authorization: mdres.diff)

Opens  the  comparison  editor  for  the  selected  resource  or  resources.  See  below  for  further

information.

  Go to – Resource configuration (function authorization: mdres)

Opens the application Resource configuration. The selected resource is passed as default value.

  Go to – Resource list (function authorization: mdrbom)

Opens  the  Resource  list  application.  The  selected  resource  is  entered  as  default  value  for  the

higher-level resource.

 Functions – Status change

Opens the dialog to change a resource status.

 Functions – Release of resource

Opens the dialog to release a resource.

MOC_OverviewResources.docx

Version: 1.9.18665

Page 6 of 8

How to use the comparison editor

Resource Overview

The  comparison  editor  compares  the  files  attached  to  the  DNC  resources.  Two  operation  modes  are

available:

Selection of one resource:

The  editor  shows  the  released  resource  and  the  optimized  version  of  the  resource  for

comparison.  You  can  change  the  file  displayed  on  the  right-hand  side  of  the  editor.  Once  you

have  made  the  changes,  the  comparison  editor  transfers  these  changes  to  the  system,  like  the

simple editor. You can only use this mode for DNC types with the file processing type "optimized".

Selection of two resources:

If you select two resources before you open the comparison editor, the editor compares the two

selected resources. You can select the file type. You can change the file displayed on the right-

hand side of the editor. Once you have made the changes, the comparison editor transfers these

changes to the system, like the simple editor.

Click  the  relevant  buttons  or  use  the  context  menu  (right-click)  to  start  the  functions  of  the  comparison

editor:

MOC_OverviewResources.docx

Version: 1.9.18665

Page 7 of 8

-  Reject: Rejects the difference identified (on the right). Accepts the value from the left file.  The editor

does no longer highlight the difference.

-  Keep:  Accepts  the  difference  identified  (on  the  right).  The  editor  does  no  longer  highlight  the

Resource Overview

difference.

-  Next difference: Goes to the next difference.

-

Insert: Inserts a row at the current position.

-  You can always change the contents of a row. Click the row and enter a value. Press ESC to quit the

row without changes. The editor then highlights the row as "changed".

-  Swap windows: Click this button to swap the windows. This function is necessary if you compare two

resources.  The  place  where  a  resource  is  displayed  results  from  the  display  order  in  the  table;  the

system  does  not  know,  which  resource  must  be  changed.  In  mode  Selection  of  one  resource,  this

button is not available because here you can only change the optimized program version.

-  Save: Saves the changes made to the file on the left-hand side.

MOC_OverviewResources.docx

Version: 1.9.18665

Page 8 of 8


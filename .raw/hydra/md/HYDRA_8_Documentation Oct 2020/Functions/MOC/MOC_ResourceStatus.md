Resource status

1  Resource status

Overview

HYDRA menu

Master data  Resources  Resource status

FEDRA menu

Detailed Scheduling  Master data  Resource status

Transaction code

ressta

Function authorization  mdressta.*

This document describes the application "Resource status" on the client.

Purpose

Each resource has exactly one status at a time. You can configure any statuses for a resource. This way,

it is possible to integrate a customer-specific status model.

Examples of status values:

Installed

Blocked

New/
Not used

Wait for
QA release

Free

Scrapped

In maintenance

You configure statuses for different resource types. You can define any status text you require. Different

configuration attributes define the processing performed with the different statuses. For example, you can

specify whether a resource can be logged on if a specific status is available.

In  the  Status  assignment,  you  can  optionally  assign  a  storage  location  that  is  used  in  the  Set  status

function.  With  status  "Repair",  you  can  then  automatically  assign  the  storage  location  "Tool  shop",  for

example.

MOC_ResourceStatus.docx

Version: 1.4.23288

Page 1 of 6

Resource status

To set a status, use the function Change status in the applications Resource overview or Resource stock.

You can assign a status immediately or for a future point in time. Setting or modifying a status is logged,

so that the "resource history" shows the point in time when the status was changed.

Notes

With order logon, the resources are set to Active = Yes. The resource status does not change. The

option  Collection  in  the  Status  assignment  configuration  specifies  whether  a  resource  can  be

logged on or not. When the operation is logged off, the resource is reset to Active = No. Again, the

resource status does not change.

The  definition  of  a  status  transition  model  is  not  available  in  the  status  configuration.  This means

that  the  status  can  be  changed  as  required,  unless  it  is  changed  automatically  by  the  system.  At

this point, we recommend to specify the relevant method.

The  active  flag  is  not  relevant  for  resources  of  the  type  MNR.  Even  if  an  order  is  logged  on  to  a

machine, the resource status of the resource of type MNR remains inactive.

Optional assignment using resource families:

You can not only define a status using the resource type, you can also use resource families to assign a

status.  Configuration  becomes more flexible  this  way.  If  you  enter  a  value  in  field  Resource  family,  this

configuration  is  enabled.  Important:  All  statuses  must  either  be  assigned  using  resource  families  OR

resource types; otherwise this can lead to ambiguities!

Integration

You require the statuses to collect and document status changes. The defined status settings specify how

a  resource  can  be  used.  Example:  If  a  resouce  is  not  allowed  to  log  on,  the  operation  in  production

cannot be logged on.

Selection criteria

In the selection panel, you can filter by higher-level or assigned resources. The application provides the

following selection criteria:

Resource type

Type of resource

Resource family

Family the resource is assigned to.

Status

Status of the resource

Designation

Name of the resource status

MOC_ResourceStatus.docx

Version: 1.4.23288

Page 2 of 6

Resource status

Field descriptions

Resource type

Resource type for which the status is defined.

Resource family

Optional, if you want to define the status in relation to resource families.

Status

Status number; unique within the resource type or resource family.

Designation

Status name

Color

Color used to display the status in the Resource overview.

Note:  The  consistent  use  of  the  status/color  combination  with  different  resources  is  the

responsibility of the customer.

Authorization

Authorization  level  for  assigning  a  status  on  the  terminal  (a  value  between  0  and  9).  In  the  HR

master data, every person is assigned an authorization level for the resource status change. If the

authorization level stored in the master data is lower than the authorization level defined here, you

cannot assign the status via the terminal.

Note: Users who want to use the function Change status on the HYDRA client, require the relevant

function  authorization.  With  this  function  authorization,  the  status  of  a  resource  can  always  be

changed; the authorization level on the client is not relevant.

Storage location

If  a  storage  location  is  specified,  then  this  value  is  automatically  set  in  the  function  Set  status

(except if the storage location is explicitly set during status assignment, then this manually assigned

storage location is used).

With  status  "Repair",  you  can  then  automatically  assign  the  storage  location  "Tool  shop",  for

example.

Assignment

This  option  controls  whether  the  resource  is  displayed  as  locked  or  not  locked  in  the  Graphic

planning (only if the additional function HLS-BSR is used).

Assignment = resource is displayed as locked

No assignment = resource is displayed as not locked

Collection

S = Resource is blocked for collection. In this case,  a resource and  also the  operation cannot be

logged on.

MOC_ResourceStatus.docx

Version: 1.4.23288

Page 3 of 6

Resource status

F = Resource is released for data collection and can be logged on.

Processing

Production identifier specifying the processing

F = Release:

This status is set with the automatic status monitoring, if the resource should be "released" again.

DNC:

When you create a new resource, the status with this identifier is only set as initial status,

if no status with processing "I = initial status with creation" is configured for the resource

type.

B = Status when logging OP off

This option is no longer supported since WRM 8.1.

O = Status when uploading optim. program (DNC)

This status is set for the upload of an optimized program.

U = Status when uploading (DNC)

This status is set for the upload of a program.

S = Automatic blocking status

If this status is set, the resource is locked.

L = Deleted (from DNC 7.2)

This status shows that the resource is no longer used, meaning it is deleted logically.

I = Initial status with creation (from DNC 7.2)

When creating a new resource, the status with this flag is assigned as an initial status. If this status

is not available, then the released status is assigned to the resource.

Please note:

-  For  each  resource  type  or  resource  family,  you  can  only  assign  1  status  with  one  of  these

characteristics.

- When a resource is being directly logged off (no standard function), no status is set; in this case,

the resource is only set from active to inactive.

Display of resource with this status on terminal

Display of the resources with this status on the Windows terminal.

Note: This configuration is only used in the DNC administration for resources of type DNC.

Deleted (from WRM 8.2)

If this option is checked, the resource has been (logically) deleted.

The identifier is used in the Resource overview.

MOC_ResourceStatus.docx

Version: 1.4.23288

Page 4 of 6

Toolbar

The following functions can be called from the toolbar of the application.

Resource status

  Insert

Function authorization: mdressta.create

Opens the editing dialog to create a new entry.

  Edit

Function authorization: mdressta.edit

Opens the editing dialog to change an existing entry.

  Copy

Function authorization: mdressta.copy

Opens the editing dialog to copy an existing entry.

  Delete

Function authorization: mdressta.delete

Opens the confirmation dialog to delete existing entries.

  All

Function authorization: mdressta.copy

Opens the editing dialog to copy all entries of a resource type or a resource family.

  Copy all from family

Function authorization: mdressta.copy

Opens the editing dialog to copy the statuses of a family.

  Copy missing entries

Function authorization: mdressta.copy

Opens the editing dialog to copy the missing status assignments of a resource type.

MOC_ResourceStatus.docx

Version: 1.4.23288

Page 5 of 6

Resource status

MOC_ResourceStatus.docx

Version: 1.4.23288

Page 6 of 6


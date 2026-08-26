Resource types

1  Resource types

Overview

HYDRA menu

Master Data  Resources  Resource types

FEDRA menu

Detailed scheduling  Master data   Resource types

Transaction code

restyp

Function authorization  mdrtyp.*

This document describes the application "Resource types" on the client.

Purpose

Resources are classified in resource types with respect to their function and use. For example, you can

group tools by assigning them to the resource type "Tool".

Resource type
Tool

Drill 5mm
002-392-42

Drill 4mm
002-402-49

Insert
836-630-50

Base frame
014-302-48

You  use  resource  types  not  only  to  classify  resources,  but  also  to  control  specific  functionalities.  For

example, the resource type is used to control whether or not an assignment check for resources is made

in the shop floor scheduling (only relevant if the additional function is used).

The resource types listed in the following table have been predefined by MPDV. They are created as part

of the implementation process.

Resource type

Machine
Tool
Staff
Gage
Device
DNC-Programm
Document
Energy counter

Abbreviation/
Ident
MNR
WNR
PER
PRM
VOR
DNC
DOC
ENE

MOC_ResourceTypes.docx

Version: 1.4.23289

Page 1 of 6

Resource types

Note

Various resource types are subject to certain technical restrictions. For example, users cannot delete

the resource types "Machine", "Tool", and "Staff". Further information on this subject can be found in

the chapter about configuring resources types.

Integration

You use resource types as a characteristic to specify differences between resource objects. The resource

type therefore is the top classification criterion.

Selection parameters

In the selection panel, you can filter by higher-level or assigned resources. The application provides the

following selection criteria:

Resource type

Type of resource

Field descriptions

ID

Unique internal key.

This  value  may  not  be  modified  for  the  resource  types  delivered  by  MPDV  because  a  range  of

processing depends on it.

Resource type

Unique "self-explanatory" designation of the resource type, e.g. "Machine" or "Tool".

You can select this value  in the various functions. Only the resource type allows  you to  identify a

resource or its resource ID uniquely. That  is  why,  evaluations also show the resource type of the

resource.

Description

Explanation of the resource type; in form of a comment.

User field key

Refers to a valid user field key

MOC_ResourceTypes.docx

Version: 1.4.23289

Page 2 of 6

Resource types

Field description for tab General

Assignment

This  option  specifies  whether  or  not  a  resource  of  this  resource  type  should  be  assigned.  An

assignment is a prerequisite for performing an availability check for the resource when planning an

OP on a machine in the detailed scheduling of the HYDRA shop floor scheduling (HLS).

Possible values:

N = No, no assignment

G = Assignment of the total duration of an operation

Please  note:  For  the  resource  type  DNC,  the  setting  should  be  set  to  None  because  there  is  an

"endless" capacity for resources of this type.

Please  note:  For  resources  of  type  MNR  (machines)  the  setting  has  no  significance  because

machines are always assigned as primary capacities.

Automatic creation

Identifier that indicates whether or not a stock is to be created automatically for a resource of this

type if this resource is transferred using the component list from the PPS and if this resource does

not yet exist in the WRM product group.

Please note: This identifier is inactive and cannot be changed for the resource type "Machine".

Status assignment

This identifier specifies  whether or  not a status configuration (menu  WRM:  Master data   Status

assignment) is allowed for this resource type.

Note:

This identifier is inactive and cannot be changed for the resource types "Machine" and "Staff".

Log on with OP

This  identifier  is  used  to  control  whether  or  not  a  resource  of  this  type,  which  is  assigned  to  the

operation as a component, is logged on. Possible values:

None:

The resource is not logged on.

Implicit:  The system automatically (implicitly) logs on the resource that is assigned to the operation

as  a  production  resource  and  tool;  you  can  neither  log  on  the  resource  manually  (explicitly)  nor

change the logon.

Explicit:   You  can  manually  (explicitly)  log  on  the  resource  that  is  assigned  to  the  operation  as  a

production resource and tool or you can log on another resource instead. If you do not log on the

resource  or  another  resource  explicitly,  the  system  implicitly  (automatically)  logs  on  the  current

resource; in this way, the current resource serves as a "default".

Note:

MOC_ResourceTypes.docx

Version: 1.4.23289

Page 3 of 6

Resource types

This value is used as a "Copy template", if you manually create a resource for the first time in the

MOC.  Er  wird  direkt  in  das  entsprechende  Konfigurationsfeld  der  (neu  angelegten)  Ressource

übernommen. For the rest of the process, only the value specified for the resource is used.

In  general,  this  identifier  should  be  inactive  for  resource  type  DNC  because  a  specific  processing

exists for it in the HYDRA product group DNC (NC programs are logged on separately) (only applies

when using HYDRA).

Post to resource

This identifier is used to specify if a resource can be posted to or not. If the identifier is set, the resource

is logged on automatically with an operation logon.

The  identifier  must  be  set  if  cycles  and  times  are  to  be  posted  for  resources  of  this  type,  e.g.  for

evaluating the use of resources (in the evaluation function of the same name) or for consideration in

the maintenance calendar (WRM-WWR).

This identifier should not be set for resources of type "Document", "Staff" and "DNC".

Note:

This identifier is only considered for resources that contain the number value 1 in the resource stock.

This value is used as copy template if you manually create a new resource on the client. It is directly

transferred  to  the  relevant  configuration  field  of  the  (newly  created)  resource.  For  the  rest  of  the

process, only the value specified for the resource is used.

Consider in evaluations

Reserved

Posting on the terminal

If this option is set, resources of this resource type are displayed in the 3rd list.

Counter/energy resource (EMG 8.1)

Specifies if it is a counter or energy resource (only applies when using HYDRA).

Field description for the tab Maintenance

Maintenance monitoring based on the following RPAs

This field includes the information which operation hours of which RPAs are used as reference for

the maintenance monitoring according to hours of operation.

Note:

This  identifier  is  only  relevant  in  connection  with  the  additional  function  WMR-WTK  (maintenance

calendar).

MOC_ResourceTypes.docx

Version: 1.4.23289

Page 4 of 6

Resource types

Field description of the tab DNC/Documents

DNC processing (only applies when using HYDRA)

Specifies the behavior of HYDRA for DNC resources of this type:

K:  No DNC processing (for resources of this type)

All resources except for DNC resources are configured with this processing option.

L:  Local program

Generated by upload to the machine and saved in HYDRA.

E:  External programming system

The file is located on an external system and from there it is processed through HYDRA.

O: Optimized program

Generated by upload on the terminal and then transferred to the external programming system

through HYDRA.

R:  Replacement procedure (DNC 7.2)

The upload overwrites the version that is applicable at that time.

V:  Version based (DNC 8.2)

An upload of an existing resource generates a new version.

File-based

The programs are file-based.

Uploaded version set by default (DNC 8.2)

If this option is checked, the uploaded version is automatically set as valid version in version-based

DNC processing.

File extension for valid programs:

The files for upload-download can be distinguished by their file extension. Only valid programs are

used for downloads to the terminal.

File extension for optimized programs:

The files for upload-download can be distinguished by their file extension. New programs optimized

by  upload  are  provided  with  this  extension.  These  programs  must  be  "released"  before  being

downloaded again by the programming system by changing the file extension.

Path

A path configured in HYDRA for saving the files in the server or programming system.

File extension for program description 1...3 (DNC 7.2):

A total of 3 other file extensions are available for saving descriptions, etc.

MOC_ResourceTypes.docx

Version: 1.4.23289

Page 5 of 6

Resource types

Field description for the tab "compensation"

Posting record after [hh:mm:ss] hours

Specifies the time when a compensation record is to be written at the latest.

Use cancellation documents for editing

If this option is enabled, cancellation records are created as part of the editing process.

MOC_ResourceTypes.docx

Version: 1.4.23289

Page 6 of 6


Manual

Tool and Resource Packages
WRM-WRP 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Tool and Resource Packages

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WRM-WRP_81.docx

Version: 1.0.23049

Page 2 of 8

Tool and Resource Packages

Contents

1  Resource Packets - Overview ...................................................................... 4

2  Resource List ............................................................................................... 6

WRM-WRP_81.docx

Version: 1.0.23049

Page 3 of 8

Tool and Resource Packages

1

 Resource Packets - Overview

Overview

Purpose

Along  with  the  "Tool  and  resource  packets"  function  packet,  HYDRA  provides  the  ability  to  create  so-

called  resource  lists.  Additional  resources  that  are  used  as  sub-resources  can  be  added  to  every

resource.  The  resource  lists  can  be  used  in  many  application  scenarios  in  the  resource  management

environment.  This  package  contains  the  functions  for  entering  and  administering  the  resource  lists  and

also provides services for using the resource lists in other system areas, such as the ERP interface,  for

example.

Integration

The packet requires the basic WRM MGM license, because if this license was not provided, no resources

could exist in the system. The resource lists created are used in resource stock as well as in the functions

for handling production resources and tools in Shop Floor Data Collection. HYDRA shop floor scheduling

uses the resource list function to account for BOMs when checking the resource allocation. Functions are

available  at  the  terminal  with  which  the  resources  can  be  displayed  (including  documents)  attached  via

the resource list.

Features

Illustration  of  dependencies  between  individual  resources  (resource  list)  and  the  ability  to  consolidate

resources ("packet generation")

  Presentation of multi-level resource lists (up to five levels)

  Allocation of any type of resource (e.g. documents relating to a tool)

  Consideration at the ERP interface: with the operation, the ERP system only has to transfer the

resource list and as a result, all the resources linked by it are automatically or implicitly allocated

to the operation

  Consideration  when  checking  resources  and  scheduling  operations  in  HYDRA  shop  floor

scheduling (prerequisite: use of HYDRA shop floor scheduling with additional HLS RBU function)

  Consideration of resource list when operation is logged on

  Capability to automatically post actual data entered (times, quantities etc.) to assigned resources

WRM-WRP_81.docx

Version: 1.0.23049

Page 4 of 8

Tool and Resource Packages

WRM-WRP_81.docx

Version: 1.0.23049

Page 5 of 8

Tool and Resource Packages

2  Resource List

Summary

Menu

Production  Facility  Management  Production  Facility  Administration  
Resource List

Transaction code

resbom

Function authorization  mdrbom

HYDRA  offers  the  option  to  map  so-called  resource  lists.  Further  resources  that  can  be  used  as

subresources can be added to every resource. The BOMs can be used in many applications with regard

to resource management.

Usage

In general, only one resource per resource type is stored in the production plan in the PPS system; it is

transferred  via  the  interface.  However,  because  resources  and,  particularly  in  this  case,  Tool  and  DNC

type  resources,  often  have  a  more  complex  composition,  the  relationships  between  resources  must  be

able to be mapped.

For this reason, HYDRA offers the option to map so-called resource lists. Further resources that can be

used  as  subresources  can  be  added  to  every  resource.  The  superordinate  resource,  also  called  a

"handle"  or a  "packet", is the overall term for other required resources that are  needed  in an operation.

The number of the "handle" provides a unique specification for the entire resource (there is precisely one

existing instance). It does not make any difference if a "handle" or a "packet" only has resources of the

same resource type or the same resource family in the resource list.

Examples for resources with BOMs could include:

Base framework with exchangeable parts

Combination tool consisting of several components

NC packets with single programs and/ or with NC packets

Please note

If the superordinate resource is not a real, existing resource, then it is called a virtual resource. Both

the  virtual  resource  and  its  components  can  be  planned  and/  or  posted  if  they  can  be  uniquely

identified.

WRM-WRP_81.docx

Version: 1.0.23049

Page 6 of 8

Tool and Resource Packages

Integration

Any resources can be connected with each other in hierarchical structure using the BOMs. In connection

with the ERP interface and the production resources and tools stored for the operation, the resources can

be managed automatically with the collection of the order data.

Requirement

As a basis for the BOM function, the WRM-MGM basic packet must be present along with the license for

the WRM-WRP resource packets

Selection criteria

The following selection criteria are available in the application:

Resource type

Type of resource.

Resource family

Family to which the resource is assigned.

Resource

Unique resource identification.

Designation

Designation of the resource.

Field descriptions

Resource type

Resource type to which the resource is assigned.

Resource

Superordinate or assigned resource.

Number

This value describes the number of assigned resources. It is considered in the  assignment of the

resource  and  the  assignment  check  in  the  HYDRA  shop  floor  scheduling  (only  resources  with

resource types configured with Assignment = "G"; not with file-based resources).

Position

In the assignment it is required that a BOM item is input. The position is used for the defined display

sequence in lists and in the hierarchical display of the BOM. The position must be unique within a

superordinate resource.

WRM-WRP_81.docx

Version: 1.0.23049

Page 7 of 8

Tool and Resource Packages

A maximum of 5 levels are supported in BOMs .

When  copying  is  performed,  the  maintenance  dialog  is  called  in  which  the  values  of  the

currently  selected  entries  are  the  default  values.  This  makes  it  easier  to  create  further

assignments.

Toolbar

 Superordinate resource information

Calls the superordinate resource information

 Subordinate resource information

Calls the subordinate resource information

WRM-WRP_81.docx

Version: 1.0.23049

Page 8 of 8


Manual

Cavity Management
WRM-NST 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Cavity Management

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WRM-NST_82.docx

Version: 1.0.23049

Page 2 of 6

Cavity Management

Contents

1  Overview of Cavity Management ................................................................. 4

Cavity Assignment ............................................................................................. 5

WRM-NST_82.docx

Version: 1.0.23049

Page 3 of 6

Cavity Management

1

 Overview of Cavity Management

Overview

Purpose

This function package includes the graphic user interface (GUI) as well as services to define master data

for cavity management. This package allows managing the partitioning of resources by managing single

cavities.  The  partitioning  of  the  resource  is  automatically  calculated  from  the  sum  of  currently  released

cavities.

Integration

Cavity  Management  allows  managing  cavities.  A  tool's  cavities  can  be  edited  via  the  GUI.  Individual

cavities can also be released or blocked.

Functions

  The current partitioning of the resource is edited based on the management of individual cavities.

  Table  including  all  cavities  of  a  tool  in  order  to  show  and  edit  cavity-related  data  including  the

option of releasing or blocking single cavities.

  Automatic calculation of resource partitioning from the sum of currently released cavities.

WRM-NST_82.docx

Version: 1.0.23049

Page 4 of 6

Cavity Management

Cavity Assignment

Overview

Menu

Master data  Resources  Cavity assignment

Transaction code

rescav

Function authorization  mdrcav

Purpose

The function allows to manage single cavities of a resource. All cavities together specify the partitioning of

a resource, i.e. the parts produced per machine cyle.

Integration

For example: you can reference the cavities of a resource in the CAQ module.

Selection criteria

The application provides the following selection criteria:

Resource type

Use this selection criteria to specify the resource type.

Resource

Use this selection criteria to specify the resource.

Cavity number

Unique identification of the cavity

Field descriptions

Resource type

Resource type

Resource

Unique name of the resource

Cavity number

Unique identification of the cavity

Position

Cavity position within the resource

WRM-NST_82.docx

Version: 1.0.23049

Page 5 of 6

Lock

This  checkbox  specifies  if  the  assignment  is  locked.  During  the  automatic  identification  of  the

current partitioning, the system does not count locked assignments.

Cavity Management

Blocking text

You can optionally enter a reason for the locked cavity.

Processing notes

If  the  option  Partitioning  due  to  cavities  is  enabled  in  the  Resource  configuration  in  tab  Resource

configuration and if you then change the cavity assignment, then the following fields are updated:

  The field Original partitioning shows the number of all cavities assigned.

  The field Current partitioning shows the number of cavities that are not locked.

These fields are included in the Resource configuration, in tab Resource configuration.

WRM-NST_82.docx

Version: 1.0.23049

Page 6 of 6


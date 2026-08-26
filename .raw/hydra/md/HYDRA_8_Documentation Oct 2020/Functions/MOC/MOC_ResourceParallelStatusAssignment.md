Parallel Resource Status

1  Parallel Resource Status

Overview

Menu

Master data  Resources  Parallel resource status

Transaction code

rsta

Function authorization  mdrsta.*

The available parallel resource statuses are assigned to resources, resource families or resource types.

Purpose

You assign the possible status values to the resource status types defined in the application "Resource

status  types".  You  can  specify  the  status  values  hierarchically  in  the  order  Resource  typeResource

familyResource. The level  you cannot define,  is left empty.  Beforehand,  you  must define the texts for

the status values to be assigned. The texts are defined in the application "Resource status texts".

Integration

You can  define parallel status types in addition to and independent of the default MDE machine status.

The application Resource status types defines the possible status types.

For each status type, the resource status texts of the status values are defined beforehand.

Requirements

The license for the use of parallel statuses is required.

Selection criteria

The application provides the following selection criteria:

Resource type, Resource family, Resource

These fields identify the resources.

Status type

Selection of the available status types

Status

You can filter the list by the status value entered here.

MOC_ResourceParallelStatusAssignment.docxVersion: 1.1.18468

Page 1 of 2

Status text number

Number  of  the  status  text  the  status  is  assigned  to.  Status  text  number  and  status  usually  have

Parallel Resource Status

identical values.

Field descriptions

Resource type, Resource family, Resource

These fields identify the resources.

Status type, Status

Status type and value of the identified resources

Status text number, Status text

Number  of  the  status  text  the  status  is  assigned  to.  Status  text  number  and  status  usually  have

identical values. The Status text displays the text of the corresponding number.

External classification

Additional classification of status values within the status type.

Responsibility area

Responsibility area of the user who can view and use the status value.

Modified on

Date and user of last modification.

MOC_ResourceParallelStatusAssignment.docxVersion: 1.1.18468

Page 2 of 2


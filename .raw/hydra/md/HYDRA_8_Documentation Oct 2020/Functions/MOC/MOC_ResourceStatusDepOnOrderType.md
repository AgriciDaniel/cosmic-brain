Resource Status Depending on the Order Type

1  Resource Status Depending on the Order Type

Overview

Menu

Master data  Resources  Resource status depending on the order type

Transaction code

resaar

Function authorization  mdaarst.*

This  document  describes  the  application  "Resource  Status  Depending  on  the  Order  Type”  within  the

Manufacturing Operation Center (MOC).

Purpose

Configure the order-dependent status to define how statuses should be changed subject to the order type

and the posting event. This allows you to automatically change the status of a resource when an order is

posted (log OP on, interrupt OP, log OP off).

Integration

Configure this table to automatically change resource statuses depending on the postings on production

and maintenance orders.

Requirements

The correct and appropriate resource statuses and order types must be available in the system.

Selection criteria

In the selection panel, you can filter by superordinate or assigned resources. The application provides the

following selection criteria:

Resource type

Enter the type the resource is assigned to.

Order type

Includes the order type created and configured in HYDRA.

Field descriptions

Resource type

Defines the resource type.

MOC_ResourceStatusDepOnOrderType.docxVersion: 1.1.14667

Page 1 of 2

Resource Status Depending on the Order Type

Family

You  can  enter  the  resource  family.  If  the  field  is  empty,  the  resource  type  applies.  If  you  enter  a

value in the field, this value also applies.

Order type

Includes the order type.

Processing

The  system  determines  all  resources  of  the  OP  for  which  you  configured  a  status  change.  The

system triggers a corresponding RES_STATUS dialog for these resources:

A  =  If  the  OP  is  logged  on,  the  system  sets  the  resource  status  of  the  resource(s)  that  is/are

assigned to the operation in the list of production resources and tools.

U = If the OP is interrupted, the system sets the resource status of the resources that are currently

logged on to the operation.

E = If the OP is logged off, the system sets the resource status of the resources that are currently

logged on to the operation.

Statuses are neither changed for anonymous resources nor for required resources.

Status

Current status. The status itself must be defined in the status assignment of resources.

If this field is empty, the status to be set merely depends on the order type.

Status to be set

Status  to  be  set.  The  status  itself  must  be  defined  in  the  status  assignment  of  resources.  In  the

status assignment of resources, the option "Entry" must be set to "F".

Changing of blocked resources

Changes the status, even if the resource is blocked.

MOC_ResourceStatusDepOnOrderType.docxVersion: 1.1.14667

Page 2 of 2


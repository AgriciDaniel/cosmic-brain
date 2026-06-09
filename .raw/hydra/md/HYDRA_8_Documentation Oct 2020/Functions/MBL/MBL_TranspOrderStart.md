MPL-TRA - Start Transport Order

1  Start Transport Order

Overview

License

MPL-TRA

Usage

The functionality described below enables the operation of a transport order to be started.

Prerequisite

The data base patch dbp_mpl_transportation.hsc must have been run.

The  OP  status  Prepared  (V)  must  be  configured  in  the  status  assignment  for  the  order

type. It must be possible to record and manually change the status V.

Features

Input parameters:

  Transport order operation number (TRANR.ANR)

  Machine number on which the transport operation is to be logged on (TRANR.MNR)

  Resource number for a resource transport (TRANR.RES and TRANR.RESTYP)

  Batch number for article-related transport (TRANR.CNR)

  Source material buffer (TRANR.SMP)

  Target material buffer (TRANR.TMP)

The BAPI call TRANR.START performs the following checks:

  The transport order must be in the Prepared (V) status.

  For an article-related transport order (transport type=A), a free batch with a remaining quantity >=

transport quantity must be provided.

  For a resource or batch transport, the object must be in the source material buffer of the transport

order.

  As an option, the staff badge number is checked if it is transmitted (KNR).

Result of BAPI call TRANR.START:

  The transport operation is logged on the machine as Running (command A_AN)

  The operation status of the transport operation changes from Prepared (V) to Running (L)

MBL_TranspOrderStart.docx

Version: 1.0.1362

Page 1 of 2

MPL-TRA - Start Transport Order

  For an article-related transport order (transport type = A) which was created from planning, the

batch entered for transport is assigned to the transport order here. If the batch has a remaining

quantity > target quantity of the transport order, a partial quantity of this batch with a new batch

number is split off and assigned to the transport order.

  The object to be transported changes to the status

Batch:

Batch status = T (Transport)

Effect: As long as the batch is in the transport status, it cannot be logged on as

input batch.

Resource:

Resource status = <dependent on object configuration for resource type>

  Entry in history:

Batch:

Batch change in batch history

Resource:

Event RES_STATUS in WRM history

Configuration

The  following  entry  is  used  to  determine  the  status  to  be  set  as  the  transport  status  of  a  resource

(transport type=R) for each resource type:

Object type=MPL

Object ID 1=RESTYP

Object ID 2=<Resource type of resource>

Parameter=TRSTA

Parameter value=<Resource status>

MBL_TranspOrderStart.docx

Version: 1.0.1362

Page 2 of 2


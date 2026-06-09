MPL-TRA - Log On Transport Order

1  Log On Transport Order

Overview

License

MPL-TRA

Usage

The functionality described below enables transport orders to be logged on at the shop floor terminal AIP.

Prerequisite

In order to use this function, the relevant configuration is required.

Function at Terminal

The function is triggered manually by activating the button in the "Sequencing list" (TRANRLIST) screen.

If the terminal is offline, the posting function is available to a limited extent on the basis of

the  available  data  in  the  sequencing  list.  In  the  offline  case,  errors  are  not  indicated  if  a

posting fails at the server.

Log On Transport Order

The Log on transport order function can be used by the operator to start a transport process. This means:

  The transport operation is logged on to the machine.

  The status of the transport operation changes from Prepared (V) to Running (L).

  The object to be transported (batch or resource) changes to the "transport" status.

Posting screen:

AIP_TRANR_AN.docx

Version: 1.0.18468

Page 1 of 3

MPL-TRA - Log On Transport Order

Fig.: Start transport order for batch

Description of the display fields:

Machine

Machine on which the transport operation is to be logged on. The value is taken from the pool list.

Operation

Operation number of the transport operation.

Article number

Article number of the transport operation. If a resource is transported, the article number is empty.

Batch number

In the case of batch-related transport, the assigned batch number is shown here.

Resource Type

If a resource is transported, the resource type of the assigned resource is shown here.

Resource

If a resource is transported, the resource number of the assigned resource is shown here.

Source material buffer

AIP_TRANR_AN.docx

Version: 1.0.18468

Page 2 of 3

MPL-TRA - Log On Transport Order

Material buffer from which the transport is to be started.

Target material buffer

This is the material buffer to which a batch or resource is to be transported.

Staff badge number

When editing a transport order manually, the badge number of a person known to the system has

to be entered. The value is taken from the pool list.

Description of the display fields:

  Batch

For batch-related transport orders, the batch number must correspond to the batch number

already assigned.

For article-related transport (entered via HLS), the batch number is only assigned at this point.

For this purpose, the batch must be free and show Remaining quantity >= Target quantity of the

transport order.

  Resource

For the transport of resources, the resource number must correspond to the number assigned.

The following items are verified upon log on:

  The transport order must have the Prepared (L) status.

  The object to be transported (batch or resource) must be available in the source material buffer.

Upon successful log on, the transport operation status changes to Running (L) and the display is updated.

AIP_TRANR_AN.docx

Version: 1.0.18468

Page 3 of 3


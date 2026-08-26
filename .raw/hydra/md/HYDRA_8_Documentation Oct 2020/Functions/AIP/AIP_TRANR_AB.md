MPL-TRA - Terminate Transport Order

1  Terminate Transport Order

Overview

License

MPL-TRA

Usage

The  functionality  described  below  enables  transport  orders  to  be  terminated  at  the  shop  floor  terminal

AIP.

Prerequisite

In order to use this function at the terminal, the following configuration is required

Function at Terminal

The function is triggered manually by activating the button in the "Sequencing list" (TRANRLIST) screen.

If the terminal is offline, the posting function is available to a limited extent on the basis of

the  available  data  in  the  sequencing  list.  In  the  offline  case,  errors  are  not  indicated  if  a

posting fails at the server.

Terminate Transport Order

The  Terminate  transport  order  function  can  be  used  by  the  operator  to  terminate  an  active  transport

process. This means:

  The transport operation is terminated.

  The status of the transport operation changes from Running (L) to Finished (E).

  The object to be transported (batch or resource) changes to the "Free" status and is reposted in

the target material buffer.

Posting screen:

AIP_TRANR_AB.docx

Version: 1.0.18468

Page 1 of 3

MPL-TRA - Terminate Transport Order

Fig.: Terminate transport order for batch

Description of the display fields:

Machine

Machine to which the transport operation is currently logged on.

Operation

Operation number of the transport operation

Article number

Article number of the transport operation. If a resource is transported, the article number is empty.

Batch number

In the case of batch-related transport, the assigned batch number is shown here.

Resource type

If a resource is transported, the resource type of the assigned resource is shown here.

Resource

If a resource is transported, the resource number of the assigned resource is shown here.

AIP_TRANR_AB.docx

Version: 1.0.18468

Page 2 of 3

MPL-TRA - Terminate Transport Order

Source material buffer

Material buffer from which the transport is to be started.

Target material buffer

This is the material buffer to which a batch or resource is to be transported.

Staff badge number

When editing a transport order manually, the badge number of a person known to the system has

to be entered. The value is taken from the pool list.

Description of the display fields:

Target material buffer

The target material buffer is automatically set to the target material buffer of the transport order

and can then be changed manually. The object to be transported (batch or resource) is reposted

in this material buffer.

The following items are verified upon logoff:

  The transport order must be in the Running status (L).

Results:

  Upon successful termination, the transport OP status changes to Finished (E) and the display is

updated.

AIP_TRANR_AB.docx

Version: 1.0.18468

Page 3 of 3


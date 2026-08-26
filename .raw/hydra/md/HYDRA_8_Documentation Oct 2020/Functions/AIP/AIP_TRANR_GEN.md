MPL-TRA - Generate Transport Order

1  Generate Transport Order

Overview

License

MPL-TRA

Usage

The  functionality  described  below  enables  transport  orders  to  be  created  manually  at  the  shop  floor

terminal AIP.

Prerequisite

In order to use this function, the following configuration is required

Function at Terminal

The function is triggered manually by activating the button in the "Sequencing list" (TRANRLIST) screen.

If the terminal is offline, the posting function is available to a limited extent on the basis of

the  available  data  in  the  sequencing  list.  In  the  offline  case,  errors  are  not  indicated  if  a

posting fails at the server.

The  operator  enters  the  article  number  and  the  number  of  the  object  (batch  or  resource).  The  material

buffers are used to determine from where to where the transport is to take place. The article numbers and

order type are used to search for an active work plan through which the transport order is created. If no

work plan is found, an escalation process (TRANR.TAP_NOT_FOUND) is triggered.

Layout screen:

AIP_TRANR_GEN.docx

Version: 1.0.18468

Page 1 of 4

MPL-TRA - Generate Transport Order

Fig.: Manual creation of transport order for a batch

Description of the input fields:

Order type

The order type is set automatically to TRNS and is required for creating the transport order from a

work plan.

Article number

The  article  number  determines  which  type  of  material  is  to  be  transported.  The  number  is

transferred to the transport order. If a batch is transported, the entry must match the article at the

batch. If a resource is transported, the article number is irrelevant.

Batch number

For a batch-related transport, an existing and free batch must be entered for the transport. Upon

successful  generation,  the  batch  is  assigned  to  the  transport  order.  The  batch  article  number

must  correspond  to  the  article  number  entered.  If  the  batch  is  valid,  the  material  buffer  is  set

automatically in the source material buffer field.

Resource Type

For a resource transport, entry of the resource type is relevant to ensure a clear assignment.

AIP_TRANR_GEN.docx

Version: 1.0.18468

Page 2 of 4

MPL-TRA - Generate Transport Order

Resource

For a resource transport, entry of the resource number and resource type is relevant to ensure a

clear assignment. A resource may be transported if it has not yet been assigned to any transport

order,  does  not  have  the  locked  status  and  is  located  in  the  material  buffer.  Upon  successful

transport, the resource status changes to "transport".

Source material buffer

For batch-related transport, the batch must be located in this material buffer. This material buffer

corresponds  to  the  material  buffer  from  where  the  transport  starts.  Upon  entry  of  the  batch  or

resource, the current buffer of the entered object is set automatically in the field.

Target material buffer

This material buffer corresponds to the buffer to which a batch or a resource is to be transported.

Start date

Specifies the scheduled start date of the transport.

End date

Specifies the scheduled end date of the transport.

Staff badge number

To edit a transport order manually, the badge number of a person known to the system has to be

entered.

Create Transport Order

The Create transport order function may be used by the operator to create a transport order for a batch or

a resource.

The following items are verified upon creation:

  The transport order must have the 'Prepared' (V) status.

  The object to be transported (batch or resource) must be available in the source material buffer.

Result:

AIP_TRANR_GEN.docx

Version: 1.0.18468

Page 3 of 4

MPL-TRA - Generate Transport Order

  Upon successful creation, a transport order is created and the generated order number is

indicated in a notice dialog.

  The batch or resource is logically assigned to the transport order.

AIP_TRANR_GEN.docx

Version: 1.0.18468

Page 4 of 4


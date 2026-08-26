MPL-TRA - Sequencing List - Transport Orders

1  Sequencing List - Transport Orders

Overview

License

MPL-TRA

Usage

The functionality described below enables transport orders to be displayed and recorded at the shop floor

terminal AIP.

Prerequisite

In order to use this function, the relevant configuration is required.

Function at Terminal

The function is triggered manually by means of a separate button.

The sequencing list shows pending transport orders for a machine. Transport orders can be reserved and

logged in from the screen.

Fig.: List of transport orders

AIP_TRANRLIST.docx

Version: 1.0.1115

Page 1 of 4

MPL-TRA - Sequencing List - Transport Orders

The following posting functions are available:

  Reserve transport order

  Log on transport order (TRANSR_AN dialog)

  Terminate transport order (TRANSR_AB dialog)

The list will only show orders which are configured for display in the terminal sequencing

list.  If  the  terminal  is  offline,  the  posting  function  is  available  to  a  limited  extent  on  the

basis  of  the  available  data  in  the  sequencing  list.  In  the  offline  case,  errors  are  not

indicated if a posting fails at the server.

Display fields:

Machine

Assigned machine from basic screen.

Material buffer

By  entering  a  material  buffer,  the  sequencing  list  display  can  be  filtered  according  to  the  source

material buffer.

Filter

The  sequencing  list  display  can  be  filtered  by  applying  the  3  status  filters  "reserved,  logged  on,

terminated" and the material buffer.

Operation number

Enables  manual  entry  of  a  transport  operation.  The  operation  must  always  be  available  in  the

sequencing list at the terminal.

Grid list contents "Order pool transport management":

All transport operations scheduled for this machine group of the transport are shown in the order pool.

Description of the main items:

OP status

(AST)

I = Transport operation is in "Initial" status

V = Transport operation was reserved on machine for pending transport

L = Transport operation was started

E = Transport is completed

Operation

(ANR)

AIP_TRANRLIST.docx

Version: 1.0.1115

Page 2 of 4

MPL-TRA - Sequencing List - Transport Orders

Transport operation number

Article number (ATK)

Material number for transport order Is empty if resources are transported.

Target quantity

(SGR:GUTP)

Stored target quantity for the transport. Is  identical  with the batch quantity in the case of batch-

related transport. The value for resources is always 1.

Batch (AGR_TRANR_CNR)

For a batch-related transport order, this shows the batch number to be transported.

Resource (AGR_TRANR_RES)

For a resource transport, this shows the resource number to be transported.

Source buffer (AGR_TRANR_SMP)

Material buffer from where the transport is to be started.

Target buffer (AGR_TRANR_TMP)

Material buffer to which the object is to be transported.

Transport type (AGR_TRANR_ART)

L = Batch-related transport order

R = Transport order for resource

A = Article-related transport entered in HLS through planning

Reserve transport order

The Reserve transport order function can be used by the operator to adopt a transport order. This means

that





the transport operation is planned on the machine

the status of the transport order changes from Initial (I) to Prepared (V)

  The object to be transported (batch or resource) changes to the "Provided for transport" status.

After activating the function button, the following confirmation dialog is displayed:

AIP_TRANRLIST.docx

Version: 1.0.1115

Page 3 of 4

MPL-TRA - Sequencing List - Transport Orders

Fig.: Confirmation for reservation

The following items are verified upon reservation:

  The transport order must have the 'Initial' (I) status.

Result:

  Upon successful reservation, the status changes to Prepared (V) and the display is updated.

AIP_TRANRLIST.docx

Version: 1.0.1115

Page 4 of 4


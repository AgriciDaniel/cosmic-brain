Generate Transport Orders

1  Generate Transport Orders

Overview

Menu

Material management  Transport management
 Generate transport orders

Transaction code

gtro.create

Function authorization

gtro.create

License

MPL-TRA

Usage

The  Generate  Transport  Orders  application  provides  users  with  the  possibility  to  manually  generate  a

transport order for a batch or a resource.

Prerequisite

The database patch dbp_mpl_transportation.hsc must have been run.
To create the transport order, an active work plan must be configured with an appropriate order type.

MOC_GenerateTransportationOrders.docxStatus: 19.06.2020

Page 1 of 4

Generate Transport Orders

Fig.: Generate transport order for a batch

Parameters

The following parameters may be assigned for generating a transport order:

Order type

The order type is set to TRNS (if available) and is required for generating the transport order from

a work plan. The work plan must be stored in work plan management and must be activated.

For batch-related transport, a work plan  with the article number  is searched. If it is not found, a

work plan without article number is then searched.

For the transport of a resource, a work plan without an article number is used.

This is a mandatory field.

Final product

The final product number determines which type of material is to be transported. This number is

transferred to the transport order. If a batch is transported, the entry must match the article at the

batch. If a resource is transported, the article number is irrelevant.

For batch-related transport, this is a mandatory field.

MOC_GenerateTransportationOrders.docxStatus: 19.06.2020

Page 2 of 4

Generate Transport Orders

Batch number

For  a  batch-related  transport,  an  existing  and  free  batch  with  the  batch  class  (G)  yield  must  be

entered  for  transport.  Upon  successful  generation,  the  batch  is  assigned  to  the  transport  order

and receives the transport status B. The batch must be in the source material buffer.

Resource type

For the transport of a resource, the resource type must be entered.

Resource

For  a  resource  transport,  entry  of  the  resource  number  and  resource  type  is  relevant  to  ensure

clear  assignment.  A  resource  may  only  be  transported  if  it  has  not  yet  been  assigned  to  a

transport order and is not in the "locked" status. For this purpose, the resource must be located in

the "preceding material buffer".

Preceding material buffer

For batch-related transport, the batch must be located in this material buffer. This is the material

buffer from where the transport is to be started..

This is a mandatory field.

Subsequent material buffer

This material buffer corresponds to the buffer to which a batch or a resource is to be transported.

This is a mandatory field.

Start date

Specifies the planned start date of the transport. The date is transferred to the transport order in

the Earliest start date field.

End date

Specifies the planned end date of the transport. The date is transferred to the transport order in the

Latest end date field.

Badge

To create a transport order manually, the badge number of a person known to the system has to

be entered.

This is a mandatory field.

Toolbar

The following functions are available in the toolbar:

MOC_GenerateTransportationOrders.docxStatus: 19.06.2020

Page 3 of 4

Generate Transport Orders

 Generate transport order

This  function  can  be  used  to  generate  the  transport  order.  If  a  transport  order  is  generated

successfully, the order number is indicated via a notification dialog:

 Order overview

This  button  can  be  used  to  switch  to  the  order  overview  application.  Transfer  of  order  type  and

article number if selected.

MOC_GenerateTransportationOrders.docxStatus: 19.06.2020

Page 4 of 4


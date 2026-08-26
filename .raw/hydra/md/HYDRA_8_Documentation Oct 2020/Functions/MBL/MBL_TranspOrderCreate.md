MPL-TRA - Create Transport Order

1  MPL-TRA - Create Transport Order

Overview

License

MPL-TRA

Purpose

Use this function to create a transport order for a planned material quantity, batch or resource.

Transport orders are created, for example

  when output batches are generated (dialog: CA_WL, CA_AB, A_UN, A_AB)

  when operations are planned via the Shop Floor Scheduling module (HLS.SAVE)

  manually via a client function

Requirements

The database patch dbp_mpl_transportation.hsc must have been run.

Configure an active work plan with corresponding order type to create the transport order.

Features

Input parameters:

Order type (TRANR.AUART)

You need the order type to create the transport order from a work plan. The work plan must be

stored and activated in the work plan management.

For the batch-related transport, the system uses the article number to search for a work plan. If

the article number cannot be found, the system searches for a work plan without article number.

The system uses a work plan that does not have an article number to transport resources.

Final article (TRANR.ATK)

The  final  article  number  specifies  the  type  of  material  that  is  to  be  transported.  This  number  is

transferred to the transport order. If a batch is transported, the entered number must match the

article of the batch. If a resource is transported, the article number is irrelevant.

It is a mandatory field if batches are transported.

MBL_TranspOrderCreate.docx

Version: 1.2.19137

Page 1 of 5

MPL-TRA - Create Transport Order

Batch number (TRANR.CNR)

You  have  to  enter  an  existing  and  free  batch  with  batch  class  (G)  "yield"  to  transport  batches.

Once  generated  successfully,  the  batch  is  assigned  to  the  transport  order  and  added  the

transport  status  B  (stands  for  "transport  prepared").  The  batch  must  be  included  in  the  source

material buffer.

Resource type (TRANR.RESTYP)

You have to enter the resource type to transport a resource.

Resource (TRANR.RES)

You have to enter the resource number and resource type for a unique assignment if you want to

transport  a  resource.  You  can  only  transport  a  resource  if  it  is  not  yet  assigned  to  a  transport

order and if it is not in the status "locked". For this purpose, the resource must be included in the

"preceding material buffer".

Preceding material buffer (TRANR.SMP)

If you want to transport batches, the batch must be included in the preceding material buffer. This

is the material buffer where the transport starts.

Subsequent material buffer (TRANR.TMP)

This material buffer is the target buffer where the batch or resource is to be transported to.

Start date (TRANR.DATFB)

The date is entered in the Earliest start date field of the transport order.

End date (TRANR.DATSE)

The date is entered in the Latest end date field of the transport order.

Synchronous or asynchronous processing (TRANR.ASYNC)

TRANR.ASYNC=J:  Entry  in  queue  table  mpl_tranr_queue.  A  scheduler  job  (tranr_screate.scr)

processes the entries at regular intervals. The bapi TRANR.SCREATE processes the queue table

data.

The following checks are made if you call the bapi TRANR.CREATE.

  The order type must exist.

  An active work plan must exist for the order type.

  The resource or batch must be included in the source material buffer of the transport order.

  Checks for batch-related transport:

o  The batch must exist.

o  The batch must be free (status = F and quality status unequal to S).

MBL_TranspOrderCreate.docx

Version: 1.2.19137

Page 2 of 5

MPL-TRA - Create Transport Order

o  Batches that are in the transport status must not be transported again.

  Checks for article-related transport

o  The calculated required quantity in relation to the input quantity of the component and the

target quantity of the planned operation must be > 0.

  Optionally, the staff badge number is checked (KNR) if entered.

Result of BAPI call TRANR.CREATE:

  The transport order has been created.

  The transport operation has been created with the OP status I (initial).

  The following status information (auftrag_status table) is stored with the transport order:

o  Planned production order (field trigger_anr)

o  Transport type (field tranr_art)

A = article-related quantity from planning

L = for batch

R = for resource

o  Object reference (fields tranr_cnr, tranr_res and tranr_restyp)

  Source material buffer (field tranr_smp)

Transport type A from planning:

The output buffer of the preceding OP specifies the source material buffer. The buffer remains

empty, if the source material buffer cannot be identified via the preceding OP.

Transport type L for output batch change:

Output buffer of the current machine.

  Target material buffer (field tranr_tmp)

Transport type A from planning:

Input buffer of the current machine where the operation was planned.

Transport type L for output batch change:

Input buffer of the following machine of the subsequent operation.



In case of batch-related objects, the created transport order includes the quantity of the batch in

the "target quantity" field. The quantity 1 is set by default for the target quantity of resources. For

article-related transports, the required quantity (based on the component's input quantity) is

entered as the target quantity.

  For an article-related transport order (transport type = A) that was created due to planning, the

batch will only be assigned upon starting.

  The object to be transported switches to the status

Batch:

Transport status = B (stands for "transport prepared")

Impact: As long as the batch is in the transport status B, it cannot be logged on

as input batch.

Resource:

Status does not change.

MBL_TranspOrderCreate.docx

Version: 1.2.19137

Page 3 of 5

MPL-TRA - Create Transport Order

Configuration

Default order type

The  following  HYD-INI  option  specifies  the  order  type  when  creating  transport  orders  from  planning  or

when changing output batches:

Name=MPL

Section=TRANSPORTATION

Parameter=TRANR_AUART

Value=<Order type>

Work plan:

An  active  work  plan  with  the  corresponding  order  type  is  required  to  create  transport  orders.  The  work

plan must be created with the order type and the corresponding article. The work plan must be activated

via work plan management. There is still also the possibility to use a work plan without article number for

all versions (e.g. for resources).

Further properties of the work plan/transport order:

The work plan includes exactly one operation that planned for the machine group to execute the

transport.

The transport operation is not subject to batch management.

You cannot log on transport operations several times.

Escalation - TRANR.TAP_NOT_FOUND

The following escalation is triggered if no active work plan can be found when creating a transport order:

Parameter:

TRANR.ATK=<article number>

TRANR.AUART=<order type>

TRANR.SANR=<triggering OP>

TRANR.DAT=<current date>

TRANR.ZEI=<current time>

Escalation - TRANR.TO_ACTIV

The following escalation is triggered if no active work plan can be found when creating a transport order:

MBL_TranspOrderCreate.docx

Version: 1.2.19137

Page 4 of 5

This escalation is triggered if a production operation is deallocated (cancelled/unplanned) that is already

assigned to an active transport order.

MPL-TRA - Create Transport Order

Parameter:

TRANR.AUNR=<order number of transport order>

TRANR.ANR=<OP number of transport order>

TRANR.ANR_STA=<OP status of transport order>

TRANR.SANR=<deallocated/cancelled OP>

TRANR.DAT=<current date>

TRANR.ZEI=<current time>

Machine:

You can configure for the machine if a transport order is to be generated in relation to the input material

when output batches are changed or upon planning.

Material type:

You can configure for the material type if a transport order is to be generated in relation to the input

material when output batches are changed or upon planning. The material type configuration overrides

the configuration of the machine.

Scheduler – Create transport orders from planning

Enter a cyclic job to call the bapi TRANR.SCREATE in the scheduler:

Command:

sh.exe ./tranr_screate.scr

Comment:

MPL-TRA: create transport order from planning

Interval: 10 minutes

MBL_TranspOrderCreate.docx

Version: 1.2.19137

Page 5 of 5


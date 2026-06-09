Generating and Canceling a Merged Operation

1  Generating and canceling a merged operation

Overview

Menu

Production control  Production overview  Operations
Production control  Production support  Pool of orders
Production control  Production support  Order sequencing

Function authorization

op.colopcreate
op.coloprelease

Generate merged operation
Cancel merged operation

Purpose

You  use  the  function  Generate  merged  operation  to  combine  separate  operations  and  to  build  one

substitute OP. On the terminal, you then log on the substitute operation.

Integration

If you have created a merged operation on the MOC, you can schedule this merged operation using the

MOC planning functions. This is not possible with merged operations created on the terminal.

For information on the processing and booking of merged operations, see here.

Requirements

To  generate  merged  operations  on  the  MOC,  you  must  have  activated  the  relevant  configuration  in  the

HYDRA  basic  settings.  Subject  to  this  configuration,  the  functions  for  merged  operations  are  available

either on the terminal or on the MOC only.

Generate merged operation

To generate a merged operation, select all the operations that should be part of the merged operation. To

select  several  operations  (or  to  de-select  them),  hold  the  CTRL  key  down  and  click  on  the  separate

operations.

Click  the  button

  to  call  the  function  Generate  merged  operation.  The  dialog  Generate  merged

operation opens. The following input fields are available:

MOP order number

Enter  the  order  number  for  the  merged  operation.  If  you  leave  this  field  empty,  HYDRA

automatically assigns the number.

Operation

By default, the operation number 0000 is preassigned here.

MOC_CollectiveOperationCreate.docx

Version: 1.4.17248

Page 1 of 3

Generating and Canceling a Merged Operation

Target quantity (P)

For all selected operations, the system calculates for each operation:

Calculated quantity = target quantity (P) minus yield quantity (P).

The calculated quantities are totaled if the result is > 0.

The system uses the sum total to populate the field Target quantity (P).

Note: the units are not converted; all operations must have the same primary quantity unit.

Target scrap (P)

For all selected operations, the system calculates for each operation:

Calculated quantity = target scrap (P) minus (actual) scrap (P).

The calculated quantities are totaled if the result is > 0.

The system uses the sum total to populate the field Target scrap (P).

Note: the units are not converted; all operations must have the same primary quantity unit.

Setup time

By default, the maximum setup time of the selected operations is used.

Processing time

By default, the total of all processing times of the separate operations is used as processing time.

Reference OP

The  data  of  the  order/operation  stored  in  field  Reference  OP  is  used  for  the  merged  operation

("copy template"). The system uses the operation having the lowest order/operation number of the

selected operations to populate this field.

Confirm the dialog to generate the new merged operation.

You can combine a maximum of 50 separate operations to build a merged operation.

If you change the data of the merged operation, the inventory data of the OPs used to build this

merged operation is NOT changed.

When  you  cancel  the  merged  operation,  the  data  of  the  included  operations  is  still  the  same

than at the time when the merged operation was created.

Cancel merged operation

As long as a merged operation has not been started (V status), you can cancel this merged operation and

restore  the  separate  operations  included  by  clicking  the  button

.  Once  a  merged  operation  has

been started, you cannot cancel the merge anymore.

MOC_CollectiveOperationCreate.docx

Version: 1.4.17248

Page 2 of 3

Generating and Canceling a Merged Operation

If you change the data of the merged operation, the inventory data of the OPs used to build this

merged operation is NOT changed.

When  you  cancel  the  merged  operation,  the  data  of  the  included  operations  is  still  the  same

than at the time when the merged operation was created.

Display merged operations

With  evaluations/overviews,  you  can  control  via  selection  if  the  evaluation/overview  integrates  merged

operations or the operations included in merged operations.

Indiv. OPs

Only "normal" operations are shown, no merged operations or operations included in merged operations.

Merged operations

Only merged operations (MOP master) are shown.

Indiv. OPs summarized in merged OPs

Only the operations included in MOPs are shown.

In the application Operations (transaction code op), you can show the column MOP. This column shows

the  MES  order  number  of  the  merged  operation  to  which  the  single  operation  is  assigned  or  the  MES

order number of the merged operation itself.

MOC_CollectiveOperationCreate.docx

Version: 1.4.17248

Page 3 of 3


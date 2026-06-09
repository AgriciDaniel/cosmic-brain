Batch Consumption

1  Batch Consumption

Usage

Material is used and represented in the system by:

  material postings to regulate inventories with/without ERP and without tracing

  batch-related material postings to trace back the recorded parts/materials

Subject to the type in use, consumption can be recorded differently in the system.

Procedure

These types of consumption recording are used in MES:

Discrete consumption recording:

Discrete  consumption  recording  is  used  every  time  when  a  discrete  amount  of  consumption  can  be

entered  for  the  used  components  by  the  user  or  a  counter.  Data  is  only  entered  for  the

component/material number. Data may be collected:

  automatically (configuration of a consumption meter per material)

  manually (the user enters material consumption manually)

Batch-related consumption recording:

MBL_RecordingConsumption.docx

Version: 1.0.1362

Page 1 of 4

Batch Consumption

Batch-related consumption recording is used every time when batches are used for the components for

which a consumed quantity can be entered by the user or a meter. Data is collected regarding the input

batch. Data may be collected:

  manually (dialog to log off the input batch and to enter batch consumption manually)



in a retrograde manner/backflush (automatic calculation of batch consumption by generating the

output batch quantity)

  automatically (automatic collection of batch consumption by a consumption meter)

Discrete consumption - manual

How to enter discrete consumption is described here.

Discrete consumption - automatic

General

Automatically recorded consumption is collected by a meter configured at the machine. Data is collected

for a material type of materials included in the component list.

Configuration

These  configurations  have  to  be  set  in  the  system  if  material  consumed  discretely  is  to  be

indicated/counted by a meter:

  Component of the OP:

The "consumption type" has to be set to "D = discrete".

  Material type of the material:

The option "inventory management" has to be set to "N = No".

  Meter for the material type of the material:

Configure meter like MDE meters.

Option "compensation with material" = yes

Option "material type" = material type of the material that is consumed

Posting/result

A goods issue is generated for automatically recorded consumption in the system.

Manual batch consumption

General

MBL_RecordingConsumption.docx

Version: 1.0.1362

Page 2 of 4

Batch Consumption

Manual batch consumption is entered by the input batch change function. The user enters the consumed

quantity when logging the used input batch off.

Configuration

These configurations have to be set in the system if material is to be consumed manually as input batch:

  Component of the OP:

The option "consumption type" has to be set to "L = Backflush/with batch reference (retrograde)".

  Material type of the material:

The option "inventory management" has to be set to "E = Yes, when logging input batch off".

Posting/result

The consumed quantity is deducted from the remaining quantity of the input batch and the batch shows

the reduced "remaining quantity" and the initial quantity.

A goods issue is generated for consumption in the system.

How to enter batch-related consumption is described here.

Retrograde batch consumption

General

Retrograde  batch consumption is calculated continuously  as the  output batch quantity increases. When

logging  the  input  batch  off,  the  remaining  quantity  of  the  input  batch  is  reduced  by  the  calculated

consumption  quantity.  Usually,  the  user  does  no  longer  enter  a  quantity  when  logging  the  used  input

batch off.

Configuration

These configurations have to be set in the system if material is to be consumed in a retrograde manner

as input batch:

  Component of the OP:

The option "consumption type" has to be set to "L = Backflush/with batch reference (retrograde)".

  Material type of the material:

The  option  "inventory  management"  has  to  be  set  to  "R  =  Yes,  backflush  (retrograde)"  or  "G  =

Yes, backflush (only with YIELD batch), retrograde".

Posting/result

MBL_RecordingConsumption.docx

Version: 1.0.1362

Page 3 of 4

The quantity calculated in a retrograde manner is deducted from the remaining quantity of the input batch

and then the batch shows the reduced "remaining quantity" and the initial quantity.

Batch Consumption

A goods issue is generated for consumption in the system.

Automatic batch consumption

The function is only available if the modification batchconsumptionextension is enabled.

General

The automatically recorded batch consumption is collected continuously as the meter quantity increases.

When logging the input batch off, the remaining quantity of the input batch is reduced by the automatically

recorded consumption quantity. Usually, the user does no longer enter a quantity when logging the used

input batch off.

Configuration

  Component of the OP:

The option "consumption type" has to be set to "L = Backflush/with batch reference (retrograde)".

  Material type of the material:

The option "inventory management" has to be set to "R = yes, backflush (retrograde)".

  Meter for the material type/BOM item of the affected material:

Configure meter like MDE meters.

Option "compensation with material" = yes

Option "material type" = material type of the material that is consumed

or

Option BOM item = BOM item of the material that is consumed

If  the  BOM  item  is  used  within  meter  configuration,  it  is  important  that  within  the  OP's

component list the material is always used as the same BOM item (from ERP work plan).

Posting/result

The automatically recorded quantity is deducted from the remaining quantity of the input batch and then

the batch shows the reduced "remaining quantity" and the initial quantity.

A goods issue is generated for consumption in the system.

MBL_RecordingConsumption.docx

Version: 1.0.1362

Page 4 of 4


Throughput Batch Processing

1  Throughput Batch Processing

Overview

Throughput  batch  processing  is  a  special  application  case  in  material  and  production  logistics.  In  this

case, an output batch is to adopt the visible batch number of the input batch used.

Usage/Procedure

In contrast to normal input and output batch processing in an operation requiring batch management, in

throughput batch processing an input batch with a batch number is used and this batch number is handed

down to the output batch.

Throughput batch processing is used for instance if the condition of a batch/material might change after a

work stage but the external batch number (e.g. on a label) is to be retained.

As a consequence, no new material will occur when the output batch is changed and the batch number

can even be handed down through several process steps.

The operator uses an input batch on a machine/operation. The output batch number is not changed and

hence remains identical to the input batch number.

The so-called throughput batch number (throughput batch number/external batch number) therefore

remains identical. Within the system, however, a unique batch number (HYDRA batch number/internal

batch number) is still used and/or generated for each production level/after each output batch change,

since every object within the system is unique.

MBL_ThroughputBatch.docx

Version: 1.0.1115

Page 1 of 3

Throughput Batch Processing

If, for instance, a selection according to throughput batch numbers is made in the batch data overview,

several entries with different internal batch numbers will be obtained for each throughput batch number;

these internal batch numbers ensure unambiguity within the system and consequently allow for a historic

observation of the "throughput batch".

This means that a total of three different statuses are considered for the process description:

  Status 1: The batch as an input batch (prior to logon)
  Status 2: The batch status on the machine (running on OP)
  Status 3: The batch as an output batch (after logoff)

The batch as an input batch (prior to logon):

Prior  to  logging  on  the  batch,  the  information  on  the  batch  (e.g.  in  the  batch  data  overview)  reads  as

follows:






the throughput batch number dllosnr  "DLLOS01"  is identical to the batch number losnr
"DLLOS01"
the batch status is "F“ (free)
the throughput batch flag dll_kennz is "N“

The batch status on the machine (running on OP)

When an operation is logged on to the terminal, the material (the material number) is used according to

the component list from the OP in order to determine whether it is  treated as a throughput batch on the

basis of the material type entered for this material. This procedure also enables logging on the throughput

batch  number  on  this  operation.  It  is  not  possible  to  log  on  more  than  one  input  batch/material  as

"throughput batches".

After

logging  on

the  batch  (with

throughput  batch  number/external  batch  number)  on

the

operation/machine, the information on the batch reads as follows:




the batch status is changed to "L" (running)
the batch receives the throughput batch flag dll_kennz "E“ (throughput input batch running)

After  logging  off  the  output  batch  on  the  OP/machine,  a  new  internal  object  is  created  in  the  system  to

take over the throughput batch number of the input batch.

The information on the new output batch then reads as follows:

MBL_ThroughputBatch.docx

Version: 1.0.1115

Page 2 of 3

Throughput Batch Processing

  a new batch with losnr PR41E9C114 and dllosnr DLLOS01 is created in the output buffer


  The quantity on the new batch is identical to the quantity of the original input batch.

the status of the new batch is changed to "L" and
the batch receives the throughput batch flag "G".

Functionality: Console Evaluation of Throughput Batches

An operator can identify and trace a created batch via the external batch number (e.g. in order to be able

to forecast when a specific batch will leave production).

Material Movement Functionality

An operator can call up the material movements (goods issue/goods receipt) for an input batch/output

batch.

Batch History Functionality

An operator can list the batch history of an output product in order to be able to trace the manufacturing

process of a batch for analyses.

Batch Tracing Functionality

An operator can use the batch tracing functionality to verify through which machines/operations the

throughput batch was produced. The operator thus sees the material's route through production.

MBL_ThroughputBatch.docx

Version: 1.0.1115

Page 3 of 3


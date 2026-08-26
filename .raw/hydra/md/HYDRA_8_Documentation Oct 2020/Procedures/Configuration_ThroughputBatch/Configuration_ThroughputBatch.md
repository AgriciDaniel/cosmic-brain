Configuration for Throughput Batch Processing

1  Configuration for Throughput Batch Processing

Overview

Usage

In material and production logistics, the batch number of an input batch can be handed down to an output

batch and thus make so-called throughput batch processing possible.

However,  in  order  to  enable  throughput  batch  processing,  the  following  configurations  are  required  on

various objects.

Machine Configuration

In  the  machine  configuration  (Master  data    Workplaces/machines    Workplace  configuration),  the

batch management in the Workplace configuration (MPL) tab is to be set to value "D".

When throughput batch processing is active on the machine, the "Automatic generation of batch number"

option  cannot  be  used,  since  in  this  case  the  batch  number  will  always  be  handed  down  by  the  input

batch.

The  entry  of  machine  cycles  in  combination  with  throughput  batch  processing  is  not  used  in

general,  since  there  is  always  a  1:1  transfer  of  input  batches  into  output  batches.  For  this

reason,  throughput  batch  recording  is  generally  only  used  in  connection  with  manual  unit

posting at the terminal (e.g. use in furnace, conditioning, etc.).

Configuration of Material Type

In the master data configuration (Master data  Material  Material type), the material type  is to be

configured in such a manner that the batch number is "handed down" and the input batch is only valid for

one output batch.

  Retrograde inventory management is generally not performed for the component whose

batch number is transferred as a throughput batch, since consumption is always 1:1.

  A parallel log-on of the input batch on several machines is not supported by the system.

  The entry of unknown input batches is not supported by the system.

Configuration at the Operation

The configured material type is to be entered as the material type at the operation.

Configuration_ThroughputBatch.docx

Version: 1.0.18468

Page 1 of 2

Configuration for Throughput Batch Processing

The operation is to be identified as requiring batch management.

Configuration at the Operation - Component

The configured material type is to be selected as the material type at the component.

In addition to the component for which the batch number is to be handed down, other material

components can be maintained at the operation. These continue to be taken into account in the

usual way in the course of batch log-on and consumption recording.

Configuration_ThroughputBatch.docx

Version: 1.0.18468

Page 2 of 2


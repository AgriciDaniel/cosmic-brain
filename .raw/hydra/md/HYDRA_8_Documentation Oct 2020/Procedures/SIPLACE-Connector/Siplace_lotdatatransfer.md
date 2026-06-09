Quantities

Siplace  Batch  Data  Transfer  and  Synchronization  of

1  Siplace Batch Data Transfer and Synchronization of

Quantities

Overview

Purpose

This  application  carries  out  automatic  batch  data  transfer  from  HYDRA  to  the  Siplace  line.  It  also

synchronizes batch quantities between the Siplace line and HYDRA.

Integration

HYDRA batch data are an essential part in order to use the Siplace connector and generating input and

output batches (traceability data) to transfer from the connector to HYDRA.

Features

Batch data transfer from HYDRA to Siplace

The  Siplace  connector  transfers  periodically  all  free  batches  of  a  defined  material  type  located  in  a

defined  material  buffer  in  HYDRA  to  the  Siplace  line.    If  a  batch  number  is  existent  in  the  Siplace  line,

then there is not transfer/update of that batch data.

The following data of a batch are transferred to Siplace:

  MES batch number

  Material

  Quantity

  Remaining quantity

  Expiry date

Please configure the material type and material buffer in config.xml.

  <ComponentConfiguration Name="BatchListGetter">

    <Parameter Name="MaterialType" Value="Materialtype" />

    <Parameter Name="MaterialBuffer" Value="Material buffer" />

</ComponentConfiguration>

Siplace_lotdatatransfer.docx

Version: 1.0.5827

Page 1 of 2

Quantities

Siplace  Batch  Data  Transfer  and  Synchronization  of

You  can  define  several  material  buffers.    Please  separate  the  material  buffer  in  this  case  in  the

configuration file with a comma.

The cycle transfer is also configured in the Sidplace connector file config.xml.  (Unit seconds)

<ComponentConfiguration Name="TimedTrigger">

 <Parameter Name="[GetBatchList]" Value="3600"/>

</ComponentConfiguration>

Synchronizing quantities between Siplace and HYDRA

Synchronizing quantities select batches in HYDRA using the same process as in the batch data transfer

(batch status "Free", material type, material buffer) and synchronizes the remaining quantities as follows:

If  the  remaining  quantity  of  a  batch  in  Siplace  is  smaller  than  the  one  in  HYDRA,  then  the  quantity  is

updated in HYDRA according to the information from the Siplace line.

The cycle transfer is configured in the Sidplace connector file config.xml.  (Unit seconds)

<ComponentConfiguration Name="TimedTrigger">

<Parameter Name="[UpdateBatchConsumption]" Value="7200"/>

</ComponentConfiguration>

Siplace_lotdatatransfer.docx

Version: 1.0.5827

Page 2 of 2


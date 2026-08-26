1  Discrete Consumption Input

Discrete Consumption Input

Usage

Key input values  when collecting shop floor data are  times and quantities. While times or durations are

used  to  describe  the  time  effort  that  was  required  to  manufacture  a  material,  quantities  document  the

entire scope of the produced material. The objective is to process or output the material quantities defined

in the order or the operation

In most cases, the quantities entered are sufficient to be able to execute the actions that will change stock

quantities in the upper-level ERP system accordingly:

  Goods receipt from production

The finished quantity will increase stock in the ERP system.

  Goods issue from production

Based on the finished quantity, the consumption of the material that flowed in (so-called input

material) can be calculated in reverse order of the production process in the ERP system, accounting

for the bill of materials the order is based on. This will lead to a reduction of stock in the ERP system.

However,  this  kind  of  consumption  calculation  is  oftentimes  not  enough  to  ensure  a  "clean"  inventory

management  in  the  upper-level  ERP  system.  Instead,  there  is  a  need  to  discretely  enter  order-related

material consumption and to then post the consumption later in the ERP system.

You  make  use  of  this  functions  package  if  you  would  like  to  enter  material  consumption  discretely  and

without a batch reference and upload it to an inventory management system.

Integration

The  function  can  be  integrated  into  a  system  dedicated  to  shop  floor  data  collection  (BDE),  or  also  be

used within the context of material and production logistics (MPL/ TRT).

These functions are used:

  Functions for discretely entering order-related material consumptions without a batch reference.

  Posting  dialog  at  the  Windows  Terminal  AIP  to  input  discrete  consumptions  relating  to  material

components during operation logoff, OP interruption or partial confirmation/upload.

  Entry based on the produced and manually entered total quantity or yield and/ or scrap.

MBL_DiscreteConsumptionInput.docx

Version: 1.0.1362

Page 1 of 2

  Providing material consumptions for confirmation/upload from HYDRA to the inventory management

system in HYDRA standard format (requires that the interface used to upload material and batch data

is licensed and activated).

Discrete Consumption Input

MBL_DiscreteConsumptionInput.docx

Version: 1.0.1362

Page 2 of 2


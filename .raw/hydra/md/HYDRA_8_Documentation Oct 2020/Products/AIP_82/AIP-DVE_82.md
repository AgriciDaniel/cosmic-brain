Manual

Discrete Consumption
Recording
AIP-DVE 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Discrete Consumption Recording

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-DVE_82.docx

Version: 1.0.23049

Page 2 of 11

Discrete Consumption Recording

Contents

1  Overview of Discrete Consumption Recording ............................................ 4

2  Discrete Consumption Input in AIP .............................................................. 6

AIP-DVE_82.docx

Version: 1.0.23049

Page 3 of 11

Discrete Consumption Recording

1  Overview of Discrete Consumption Recording

Purpose

Key input values  when collecting shop floor data are  times and quantities. While times or  durations are

used to describe the time effort that was required to manufacture a material, quantities document the entire

scope of the produced material. The objective is to process or output the material quantities defined in the

order or the operation.

In most cases, the quantities entered are sufficient to be able to execute the actions that will change stock

quantities in the upper-level ERP system accordingly.

  Goods receipt from production

The finished quantity will increase stock in the ERP system.

  Goods issue from production

Based on the finished quantity, the consumption of the material that flowed in (so-called input

material) can be calculated in reverse order of the production process in the ERP system, accounting

for the bill of materials the order is based on. This will lead to a reduction of stock in the ERP system.

However,  this  kind  of  consumption  calculation  is  oftentimes  not  enough  to  ensure  a  "clean"  inventory

management  in  the  upper-level  ERP  system.  Instead,  there  is  a  need  to  discretely  enter  order-related

material consumption and to then post the consumption later in the ERP system.

Implementation considerations

You  make  use  of  this  functions  package  if  you  would  like  to  enter  material  consumption  discretely  and

without a batch reference and upload it to an inventory management system.

Integration

The function can be integrated into a system dedicated to shop floor data collection (BDE), or also be used

within the context of material and production logistics (MPL/ TRT).

Features

  Functions for discretely entering order-related material consumptions without a batch reference.

  Posting  dialog  at  the  Windows  Terminal  AIP  to  input  discrete  consumptions  relating  to  material

components during operation logoff, OP interruption or partial confirmation/upload.

  Entry based on the produced and manually entered total quantity or yield and/ or scrap.

AIP-DVE_82.docx

Version: 1.0.23049

Page 4 of 11

Discrete Consumption Recording

  Providing material consumptions for confirmation/upload from HYDRA to the inventory management

system in HYDRA standard format (requires that the interface used to upload material and batch data

is licensed and activated).

Posting dialogs are activated during HYDRA customizing (a chargeable service).

AIP-DVE_82.docx

Version: 1.0.23049

Page 5 of 11

Discrete Consumption Recording

2  Discrete Consumption Input in AIP

Usage

The function described below makes it possible to enter material consumption at the AIP shop floor terminal

so that it can be uploaded via an interface in the form of goods movements.

Integration

Material  consumption  input  can  take  place  at  the  AIP  shop  floor  terminal  while  an  operation  is  being

interrupted, while an operation is being logged off or when entering a partial confirmation/upload.

Requirement

The relevant utilization material must be assigned to the operation in order to discretely record consumption.

The  meaning  of  the  following  fields  must  be  observed  in  particular  (logical  consideration).  The  material

components  can  be  assigned  in  HYDRA  manually  (Order  managementEdit  components)  or  from  the

upper level system.

Material number

The material number uniquely identifies a material. In the component list, a material is only unique in

association with a BOM item.

BOM item

The BOM item combined with the material number forms a unique key for a material component at

an operation.

Material designation

The material designation is used to describe a material more exactly. It functions as commentary and

is displayed in the input dialog.

Material category

The material category controls, among other things, the way a material is technically processed in

the HYDRA system. Relating to the material consumption input (not batch-related), the following

value is important:

"M"   Material component, should be entered in terms of consumption

Material type

The material type is another parameter used for processing control in HYDRA. The material type is

used to control whether goods movement created from the material consumption should be uploaded

to the ERP system or not. Unless defined otherwise assign the material type SYSTEM here.

To assure that a goods issue is uploaded via the interface, the option Transfer to interface must be

set at the material type that the utilization material is based on.

AIP-DVE_82.docx

Version: 1.0.23049

Page 6 of 11

Discrete Consumption Recording

When  launching  HYDRA  for  the  first  time  or  during  discrete  consumption  input,  it  will  need  to  be

coordinated whether or for which material components consumption should be uploaded to the ERP

system. If the MPL module is not used, this configuration is made during the HYDRA customizing

process.

Consumption type

Set  the  consumption  type  to  "D"  (discrete  consumption  input)  for  material  components  that  this

function is used for to collect material consumption.

It is possible to transfer the consumption type using the relevant component segment of the

ERP  interface  (EIS-ERP).  When  using  the  HYINFO  interface  as  a  part  of  the  PP-PDC

interface, the consumption type is made available by customizing the system accordingly.

The interface necessary to upload material consumption is not a part of this function.

Input quantity

The input quantity is a component quantity needed to manufacture one unit (one piece, for example)

of  the  output  material  (article)  being  produced.  It  is  used  to  calculate  the  theoretical  material

consumption based on the produced quantity.

Unit

Quantity unit of the material component in which material consumption is recorded.

Entering material consumption at AIP

The  customer  system  must  be  customized  accordingly  before  the  functions  described  below

become available.

The following functions are available at the AIP for entering material consumption based on the produced

(total) quantity.

In the dialogs

  Log operation off (A_AB)



Interrupt operation (A_UN)

  Partial confirmation/upload for operation (A_TR)

an additional consumption button is available with which the Component consumption posting dialog can

be called up.

AIP-DVE_82.docx

Version: 1.0.23049

Page 7 of 11

Discrete Consumption Recording

It is also possible to make the button available that is used to call up the Component consumption posting

dialog from the MPL specific dialogs used for operation interruption (A_UN_MPL, A_UN_RF, A_UN_RS)

or for operation log off (A_AB_MPL, A_AB_RF, A_AB_RS). However, what needs to be considered in this

regard is that in MPL, consumption of batch-related material is posted differently.

The input dialog opens after the Consumption button is pressed:

"Component consumption posting (A_VERB)" dialog in AIP

The status information shown includes the workplace displayed in the dialog called up, the operation and

also the yield and scrap quantities that are also entered in the dialog that is called up. When calling up from

an MPL  dialog, the  entered quantity  is displayed  based on  whether classified ("Quality") as scrap or  as

yield.

Furthermore,  a  table  is  displayed  showing  the  component  that  is  flagged  in  the  component  list  as

consumption type "D". The following data are displayed in the table:

BOM item

BOM item

Input.Mat.No.

Material number of the material component.

Input.Mat.Des

Material designation of the material component.

AIP-DVE_82.docx

Version: 1.0.23049

Page 8 of 11

Consumption

Calculated consumption based on the quantity entered in the dialog called up:

Discrete Consumption Recording

Only  yield  and  scrap  quantities  are  taken  into  accounts  when  calculating  the

consumption.

Quantities are not set off against each other (e.g. scrap set off against yield) when the

calculated consumption is determined.

Unit

Quantity unit (unit of the input quantity)

Input quantity

Input quantity required to produce one quantity unit of the output material.

When  a  component  is  selected  from  the  list,  the  calculated  consumption  is  proposed  in  the

Consumption  input  field.  If  the  actual  consumption  deviates  from  the  calculated  consumption,  the

operator can now modify this quantity; it is transferred to the list. Any consumption that was modified

manually is shown highlighted in "green" in the list (e.g.

 ).

By pressing the Reset key, the component list can be called up again; this will recalculate the consumption

quantities; any consumption quantities that were already modified will be overwritten.

After confirming this dialog and the dialog that is called up, the consumption quantities are updated and are

thus  transferred  to  the  server  via  the  posting.  There,  the  consumption  is  updated  as  the  status  in  the

component  list  at  the  operation.  In  addition,  one  material  movement  (goods  issue)  is  written  for  each

component.

The  material  consumption  is  only  posted  as  a  goods  movement  if  the  dialog  was  called  up

explicitly.  Material  consumptions  that  were  not  posted  are  not  automatically  posted  when  the

operation is logged off or interrupted.

If the consumption input dialog is integrated in the partial confirmation dialog and if it is not called up when

a partial confirmation is executed or when the entry is interrupted, the system will remember the calculated

consumption for all material components of the consumption type "D" and will account for it the next time

the consumption input dialog is called up.

Example (assumption: a material component with the input quantity 2 is defined at the operation):

  Call up the partial confirmation (A_TR): Enter yield 9, scrap 1

  Call up the consumption input dialog (A_VERB)



(9 * 2 + 1 * 2 =) 20 is proposed as material consumption

AIP-DVE_82.docx

Version: 1.0.23049

Page 9 of 11

quantityinputscrapyieldnconsumptioCalculated*

Discrete Consumption Recording

  Cancel the dialog (do not click on OK to confirm)

  Confirm the partial confirmation/upload dialog (A_TR)

  The yield 9 and the scrap 1 are posted at the operation.

  The system remembers the calculated consumption of 20

  Call up the partial confirmation (A_TR): Enter yield of 5

  Call up the consumption input dialog (A_VERB)



(20 + 5 * 2 =) 30 is now proposed as material consumption

  Confirm with OK

  Confirm the partial confirmation/upload dialog (A_TR)

  The yield 5 is posted to the operation.

  The consumption of 30 is posted as a goods movement.

If  after  calling  up  the  consumption  input  dialog  it  is  canceled  and  thus  closed  and  the  quantity  is  then

modified in the dialog that appears and if then the consumption input dialog is once again called up, then

the consumption quantities that were proposed the first time it was called up will still be shown in this dialog.

This is why the proposed material consumption will need to be updated by clicking on the "Reset" button

as the case may be.

Please note with regard to customizing

In addition to making the necessary programs available, please also consider the following

  Activate the dynamic dialog A-VERB, accounting for existing terminal groups in some cases.



Integrate the button used to call up the consumption input dialog in the relevant  posting dialogs. The

following configurations are possible here, whereas a. can be seen as an alternative to b. and c.:

a.

Integration into the workflow step WF_AA_QUA.

The button is found in the standard dialogs

  Interrupt OP (A_UN),

  Log off OP (A-AB), and

  Partial confirmation/upload (A_TR)

  in each workflow step in which quantities are entered manually.

b.

Integration into the workflow dialog WF_AUN_CHK

The button is available in the standard dialog Interrupt OP (A_UN) in the confirmation

workflow step.

c.

Integration into the workflow dialog WF_AAB_CHK

The button is available in the standard dialog Log off OP (A_AB) in the confirmation

workflow step.



Integrating or checking the grid configuration for the dialog A_VERB (ctaiplay.ini)

  Optional: Uploading the material consumption as goods movement

AIP-DVE_82.docx

Version: 1.0.23049

Page 10 of 11

Discrete Consumption Recording

  Determining  which material type  is transferred to the material component from the ERP

system (typically SYSTEM)

  Setting the flag "Transfer to interface" at the material type. Options:

  Directly via the master data configuration (only possible, if MPL/ TRT is active)

  Per SQL to the HYDRA server (hysql -r -):

update hz_typen set we_ext_kz = 'J' where hz_typ = 'SYSTEM';

  Per SQL via the SQL tester in MOC:

update hz_typen set we_ext_kz = 'J' where hz_typ = 'SYSTEM'

  Per BAPI to the HYDRA server (Observe system!):

hymwb -u9999 -

c"DLG=MATTYP.UPDATE|MATTYP.MATTYP=SYSTEM|MATTYP.WEEXT:GEN

=J|DAT=today|ZEI=now|"

  Check per SQL: select hz_typ, we_ext_kz from hz_typen

  Activate the material upload interface (see relevant documentation).

AIP-DVE_82.docx

Version: 1.0.23049

Page 11 of 11


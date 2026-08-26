Discrete Consumption Input at AIP

1  Discrete Consumption Input at AIP



Summary

The  function  described  below  makes  it  possible  to  enter  material  consumption  at  the  AIP  shop  floor

terminal so that it can be uploaded via an interface in the form of goods movements.

Material  consumption  can  be  entered  at  the  AIP  shop  floor  terminal  while  an  operation  is  being

interrupted, while an operation is being logged off or when entering a partial confirmation/upload

Configuration

The document dealing with the configuration is to be taken into account for discrete consumption input.

Dialog and procedure

AIP provides the following features to enter material consumption based on the produced (total) quantity.

In the dialogs

  Log operation off (A_AB)



Interrupt operation (A_UN)

  Partial confirmation/upload for operation (A_TR)

an additional "consumption" button is available with which the "Component consumption posting" dialog

can be called up.

It  is  also  possible  to  make  the  button  available  that  is  used  to  call  up  the  "Component

consumption  posting"  dialog  from  the  MPL  specific  dialogs  used  for  operation  interruption

(A_UN_MPL,  A_UN_RF,  A_UN_RS)  or

for  operation

log  off  (A_AB_MPL,  A_AB_RF,

A_AB_RS). However, what needs to be considered in this regard is that in MPL, consumption of

batch-related material is posted differently.

Figure: "Partial confirmation/upload (A_TR)" dialog with "Consumption" button in AIP

AIP_DiscreteConsumptionInput.docx

Version:

Page 1 of 3

Discrete Consumption Input at AIP

The input dialog opens after the "Consumption" button is pressed.

The  status  information  shown  includes  the  workplace  displayed  in  the  dialog  from  which  the  function  is

called  up,  the  operation  and  also  the  yield  and  scrap  quantities  entered  in  the  dialog  from  which  the

function  is  called  up.  When  calling  up  from  an  MPL  dialog,  the  entered  quantity  is  displayed  based  on

whether classified ("Quality") as scrap or as yield.

Furthermore,  a  table  is  displayed  showing  the  components  that  are  flagged  in  the  component  list  as

consumption type "D". The following data is displayed in the table.

BOM item

BOM item

Input.Mat.No.

Material number of the material component.

Input.Mat.Des.

Material designation of the material component.

Consumption

Calculated  consumption  based  on  the  quantity  entered  in  the  dialog  from  which  the  function  is

called

up:

Only  yield  and  scrap  quantities  are  taken  into  account  when  calculating  the

consumption.

Quantities  are  not  set  off  against  each  other  (e.g.  scrap  set  off  against  yield)  when

the calculated consumption is determined.

Unit

Quantity unit (unit of the input quantity).

Input quantity

Input quantity required to produce one quantity unit of the output material.

When  a  component  is  selected  from  the  list,  the  calculated  consumption  is  proposed  in  the

"Consumption"  input  field.  If  the  actual  consumption  deviates  from  the  calculated  consumption,  the

operator  can  now  modify  this  quantity;  it  is  transferred  to  the  list.  Any  consumption  that  was  modified

manually is shown highlighted in "green" in the list (e.g.

).

By  pressing  the  "Reset"  key,  the  component  list  can  be  called  up  again;  this  will  recalculate  the

consumption quantities; any consumption quantities that were already modified will be overwritten.

AIP_DiscreteConsumptionInput.docx

Version:

Page 2 of 3

geEinsatzmenAusschussGutmengeVerbrauchrchnerische*Re

Discrete Consumption Input at AIP

After confirming this dialog and the dialog from which the function is called up, the consumption quantities

are updated and are thus transferred to the server via the posting . There, the consumption is updated as

the  status  in  the  component  list  at  the  operation.  In  addition,  one  material  movement  (goods  issue)  is

written for each component.

The  material  consumption  is  only  posted  as  a  goods  movement  if  the  dialog  was  called  up

explicitly.  Material  consumptions  that  were  not  posted  are  not  automatically  posted  when  the

operation is logged off or interrupted.

If the consumption input dialog is integrated in the partial upload dialog and if it is not called up when a

partial  upload  is  executed  or  when  the  entry  is  interrupted,  the  system  will  remember  the  calculated

consumption for all material components of the consumption type "D" and will account for it the next time

the consumption input dialog is called up.

Example (assumption: a material component with the input quantity 2 is defined at the operation):

  Call up the partial upload dialog (A_TR): Enter yield 9, scrap 1

  Call up the consumption input dialog (A_VERB)



(9 * 2 + 1 * 2 =) 20 is proposed as material consumption

  Cancel the dialog (do not click on OK to confirm)

  Confirm the partial confirmation/upload dialog (A_TR)

  The yield 9 and the scrap 1 are posted at the operation.

  The system remembers the calculated consumption of 20

  Call up the partial upload dialog (A_TR) once more: Enter yield of 5

  Call up the consumption input dialog (A_VERB)



(20 + 5 * 2 =) 30 is now proposed as material consumption

  Confirm with OK

  Confirm the partial confirmation/upload dialog (A_TR)

  The yield 5 is posted to the operation

  The consumption of 30 is posted as a goods movement

If  after  calling  up  the  consumption  input  dialog  it  is  canceled  and  thus  closed  and  the  quantity  is  then

modified  in  the  dialog  that  calls  up  the  function  and  if  then  the  consumption  input  dialog  is  once  again

called up, then the consumption quantities that  were proposed the first time it was called up  will still be

shown in this dialog. This is why the proposed material consumption will need to be updated by clicking

on the "Reset" button as the case may be.

AIP_DiscreteConsumptionInput.docx

Version:

Page 3 of 3


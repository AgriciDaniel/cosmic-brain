1  Advance Logon of Input Batches

Advance Logon of Input Batches

Summary

The  process  might  require  an  input  batch  to  be  logged  on  in  advance  and  set  up  accordingly  on  a

machine, while the preceding input batch is still being used for a material.

This  situation  frequently  occurs  at  very  large  machines  processing,  for  example,  roles  or  belts  that  are

uncoiled as input batch at the beginning of the machine and coiled up as output batch at the end of the

machine.

As the users are mostly busy with activities at the end of the machine at the time when the input batch

actually  needs  to  be  changed,  they  cannot  perform  the  input  batch  change  and,  as  a  result,  they  are

provided with the opportunity to log the next input batch on already in advance for an order/OP.

Then the input batch can  actually be changed by  logging a new OP  on or a project-specific call can be

established.

General / usage

The function for logging input batches on in advance is used to be able to "set up" and "log on" the next

input  batch  while  an  OP  and  input  batch  are  still  running.  This  next  input  batch  is  not  yet  running  but

assigned the "logged on in advance" flag.

An input batch may be logged on in advance for a currently running OP or a prepared OP.

Configuration

The settings required for using the function “advance logon of input batches” is described here.

Procedure

The procedure for using the function “advance logon of input batches“ or the logical process is described

here.

Dialog

Basic screen

The  basic  AIP  screen  shows  the  function  key  “Advance  logon  of  input  batch”  (preregistration  of  input

batch). The dialog for logging input batches on in advance may be used by clicking this function key.

AIP_Preregister_InputBatch.docx

Version: 1.0.18468

Page 1 of 3

Advance Logon of Input Batches

Advance logon of input batches (CE_VWL_MPL)

The user selects the workplace to which an input batch is to be logged on in advance in the basic screen.

The  below  dialog  (CE_VWL_MPL)  opens  by  clicking  the  function  key  ”Advance  logon  of  input  batches”

(preregistration of input batch).

If an operation is currently running/logged on to the workplace, this one will be selected by default. The

input batch (that is to be logged on in advance) is entered/scanned for the selected BOM item. Advance

logon of input batches is started by clicking the button “post batch".

AIP_Preregister_InputBatch.docx

Version: 1.0.18468

Page 2 of 3

Advance Logon of Input Batches

At first the input batch is checked for validity (dialog CE_VAN). The material number of the input batch is

checked against the material number of the component list or the BOM item. The input batch is logged on

in advance, once the button “log input batch on in advance” has been clicked:

Finally,  the  input  batch  that  has  been  logged  on  in  advance  is  displayed  in  purple  in  the  BOM  of  the

component.

The dialog can be closed with the “cancel” key.

AIP_Preregister_InputBatch.docx

Version: 1.0.18468

Page 3 of 3


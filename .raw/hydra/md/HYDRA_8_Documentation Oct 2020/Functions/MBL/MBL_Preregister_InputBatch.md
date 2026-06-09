MBL Advance Logon of Input Batches

1  MBL Advance Logon of Input Batches

Usage

Sometimes, the process may require an input batch to be already logged on in advance and set up on a

machine while the preceding input batch for a material is still in use.

This situation frequently occurs in systems which are very long in design and process e.g. rollers or belts

which are unwound as input batch at the system start and rewound as output batch at the system end.

Since the operator is mostly  busy  with activities at the system end  at the time of the actual input batch

change  and  is  indeed  not  able  to  perform  the  input  batch  change  at  the  right  time,  the  operator  may

decide to log on the next input batch of an order/OP in advance.

The actual input batch change may then be achieved via a  new OP logon, or a project-specific call may

be established.

Procedure

The running/prepared order/OP shows the BOM. Input batches are logged on in relation to the individual

BOM items.

The OP is started or is already running. At this point, the operator may log on the next input batch for this

running OP or for another order/OP in advance.

For this purpose, the "Input batch advance logon" function is used. The procedure for an input batch

advance logon is as follows:

  Selection of a prepared OP (OPs in running status are preassigned)

  Display/use of BOM of selected OP

  Current display of already logged on input batches relating to a BOM item

  Advance logon of an input batch for a selected BOM item/component

  The dialog also offers the possibility to log off and/or reset an already logged on input batch again

(in this case, no consumption will take place  the input batch has the same condition as before

the advance logon).

  Only one batch per BOM item, each, may be logged on in advance. It is not possible to

log on several input batches for an OP/BOM item in advance.

  An input batch may only be logged on in advance once, i.e. it is not possible to log on

the input batch in advance several times/in parallel.

  Should the input batch already be running/logged on to another order/OP and/or a BOM

MBL_Preregister_InputBatch.docx

Version: 1.0.1362

Page 1 of 2

MBL Advance Logon of Input Batches

item, this input batch can no longer be logged on in advance, either.

After an input batch has been logged on in advance, it will be visible in the third list in the AIP.

Input  batches  logged  on in advance are then  logged on by  the OP Logon function. The prerequisite for

this is

  A prepared/interrupted operation with appropriate input batches is logged on.



If there is an input batch logged on in advance for a BOM item, this is proposed/displayed in the

grid (color display).



If there is no input batch logged on in advance for a BOM item, a batch may be logged on here 

normal batch logon.

  By clicking the OK button, all batches in the list which are logged on in advance are logged on.

  The batch logged on in advance may be overwritten by a "real" batch logon.

  The input batch logon of batches  with advance  logon may not be used from the input

batch change dialog.

This function is not included in the scope and has to be implemented via customizing if

required. The BOM relating to the selected OP is displayed.

  The batch logged on in advance may not be logged off here.



If a batch with advance logon has not been logged on, the advance logon of the  input

batch will be deleted by the OP interruption/logoff.

Display on MOC (Batch data overview)

Batches  ("Running"  status)  with  an  advance  logon  for  an  operation  and/or  an  integrated  BOM  item  are

marked  accordingly  in  the  batch  data  overview  (Reservations  tab    Advance  logon  section).  A

corresponding selection of these batches is then possible.

  These fields in the batch data overview cannot be changed. They are only assigned by

postings on AIP.

  The  display/posting  of  the  preallocation  is  also  deleted  again  if  the  advance  logon  is

reversed.

o  By logoff in the advance logon dialog.

o  By interruption/logging off an OP (see settings) and omitted logon of the batch

(OP interruption/logoff will delete advance logon of the input batch).

  The input batch advance logon is not shown in batch tracing (in tabular/graphical form).

  The input batch advance logon does not affect material movements.

  The input batch advance logon is recorded in the batch history.

MBL_Preregister_InputBatch.docx

Version: 1.0.1362

Page 2 of 2


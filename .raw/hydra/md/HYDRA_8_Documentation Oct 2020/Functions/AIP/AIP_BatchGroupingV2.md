Batch Grouping

1  Batch Grouping

Summary

In  production  it  might  be  necessary  to  process  batches  at  once  in  one  process  (e.g.  heating  furnace,

conditioning system, washing machine). To this end, the user logs on the affected batches within a group

to AIP.

Usage

To the user the OP is not important to record times and after processing, users do not want to post every

single output batch in the system. Therefore, this function basically facilitates the posting process for the

user.

Prerequisite/configuration

The configuration is described here.

The logical process and posting are described here.

Batch grouping

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

Dialog

AIP_BatchGroupingV2.docx

Version: 1.0.18468

Page 1 of 3

Batch Grouping

Description of display fields:

  Machine

Used workplace/machine

  Batch number

Entered number of the batch that is to be recorded for the group.

  Staff badge number

The user's staff badge number.

  Result list "reserved batches"

List of all individual batches included in the group with batch number, material number etc.

Function keys

  Function key "cancel"

This function key terminates the dialog and rejects data input.

  Function key "add"

An individual batch may be added to the group using this function key.

  Function key "remove"

A selected individual batch may be removed from the group using this function key.

  Function key "unload batch"

This  function  key  cancels  the  group  and  output  batches  are  changed  automatically  for  all  input

batches and operations registered in the background.

AIP_BatchGroupingV2.docx

Version: 1.0.18468

Page 2 of 3

Batch Grouping

Procedure

For the user the procedure is as follows:

  The user opens the "batch grouping" dialog in the basic screen of the terminal

  The user enters the batch (manually/by scanning) he/she wants to add

  The user presses "add" and confirms the entered batch.

  The entered batch is assigned to the group. The batch is reserved for the OP.

  The user enters further batches he/she adds to the group.

  The user closes the dialog unless he/she wants to add further batches.

  To cancel the group and/or when completing the process, the user opens the dialog and presses

the "unload batch" key. Consequently, the relevant registered operation is logged off and finished

for every included input batch and an output batch is completed.

AIP_BatchGroupingV2.docx

Version: 1.0.18468

Page 3 of 3


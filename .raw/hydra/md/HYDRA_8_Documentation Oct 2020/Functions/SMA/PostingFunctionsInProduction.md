SMA Posting Functions in Production

1  SMA Posting Functions in Production

1.1  General

By default, the package "SMA posting functions in production" includes the following posting functions:

  Change status

  Log on operation

  Log off operation



Interrupt operation

  Partial confirmation/report partial quantities

  Change partitioning

If  you  use  a  mobile  data  collection  with  MDE,  we  recommend  to  use  a  centralized  MDE  to

ensure a quick communication for the relevant machine.



Change status

Function authorization

sma.setstatus

The function enables you to change the status of the selected machine via a dialog. A list of the possible

machine statuses is provided for selection.

Please note: This function is part of the package SMA-AMF.

The following fields are available in the function "Change status":

Machine status

The user is shown a list of the available machine statuses and can select a new status from this list.

Log on operation

Function authorization

sma.logon

PostingFunctionsInProduction.docx

Version: 1.1.20444

Page 1 of 7

SMA Posting Functions in Production

The  posting  dialog  "Log  on  operation"  can  be  used  to  log  on  an  operation  to  the  currently  selected

workplace. The operation (MES order number) and the status of the machine can be selected from a list

via a search dialog.

Please note: All standard validation checks of HYDRA are run through.

Please note: This function is part of the package SMA-AMF.

The following fields are available in the function "Log on operation":

Workplace

The selected workplace is accepted. But you can still modify it manually.

MES order number

You can enter the number manually or you can select the operation by using the magnifier.

Status

The user is shown a list of the available machine statuses and can select a new status from this list.

The following functions are available via the buttons:

Closes the dialog without saving

Returns to the previous input field

Moves to the next input field

Logs on the operation

Log off operation

Function authorization

sma.logoff

PostingFunctionsInProduction.docx

Version: 1.1.20444

Page 2 of 7

SMA Posting Functions in Production

The  posting  dialog  "Log  off  operation"  can  be  used  to  interrupt  an  operation  at  the  currently  selected

workplace.

With  regard  to  the  logoff,  you  can  enter  the  operation  number  (MES  order  number),  yield  and  scrap

quantities, the associated scrap reason and a new status for the machine in the posting dialog. The MES

order number, the scrap reason and the status of the machine can be selected  from a list via a search

dialog.

Please note: All standard validation checks of HYDRA are run through.

Please note: This function is part of the package SMA-AMF.

The following fields are available in the function "Log off operation":

Workplace

The selected workplace is accepted.

MES order number

The indicated operation is accepted in the posting function. You can enter the number manually or

you  can  select  an  operation  by  using  the  magnifier  if  several  operations  are  logged  on  to  the

machine.

Yield

Input field for produced yield quantities in the relevant unit

Scrap

Input field for produced scrap quantities in the relevant unit

Scrap reason

Entry of a scrap reason. The magnifier can be used to select a scrap reason.

Machine status

The user is shown a list of the available machine statuses and can select a new status from this list.

The following functions are available via the buttons:

Closes the dialog without saving

Returns to the previous input field

Moves to the next input field

PostingFunctionsInProduction.docx

Version: 1.1.20444

Page 3 of 7

SMA Posting Functions in Production

Logs off the operation.

Interrupt operation

Function authorization

sma.interrupt

The  posting  dialog  "Interrupt  operation"  can  be  used  to  interrupt  an  operation  at  the  currently  selected

workplace.

With regard to the interruption, you can enter the operation number (MES order number), yield and scrap

quantities, the associated scrap reason and a new status for the machine in the posting dialog. The MES

order number, the scrap reason and the status of the machine can be selected  from a list via a search

dialog.

Please note: All standard validation checks of HYDRA are run through.

Please note: This function is part of the package SMA-AMF.

The following fields are available in the function "Interrupt operation":

Workplace

The selected workplace is accepted.

MES order number

The indicated operation is accepted in the posting function. You can enter the number manually or

you  can  select  an  operation  by  using  the  magnifier  if  several  operations  are  logged  on  to  the

machine.

Yield

Input field for produced yield quantities in the relevant unit

Scrap

Input field for produced scrap quantities in the relevant unit

Scrap reason

Entry of a scrap reason. The magnifier can be used to select a scrap reason.

Machine status

The user is shown a list of the available machine statuses and can select a new status from this list.

The following functions are available via the buttons:

Closes the dialog without saving

PostingFunctionsInProduction.docx

Version: 1.1.20444

Page 4 of 7

SMA Posting Functions in Production

Returns to the previous input field

Moves to the next input field

Interrupts the operation

Partial confirmation (report partial quantities)

Function authorization

sma.partialconf

The posting dialog "Partial confirmation" can be used to post quantities to an operation logged on at the

currently selected workplace.

With  regard  to  the  partial  confirmation,  you  can  enter  the  operation  number  (MES  order  number),  yield

and scrap quantities and the associated scrap reason in the posting dialog. The MES order number and

the scrap reason of the posting can be selected from a list via a search dialog.

Please note: All standard validation checks of HYDRA are run through.

Please note: This function is part of the package SMA-AMF.

The following fields are available in the function "Partial confirmation":

Workplace

The selected workplace is accepted.

MES order number

The indicated operation is accepted in the posting function. You can enter the number manually or

you  can  select  an  operation  by  using  the  magnifier  if  several  operations  are  logged  on  to  the

machine.

Yield

Input field for produced yield quantities in the relevant unit

Scrap

Input field for produced scrap quantities in the relevant unit

Scrap reason

Entry of a scrap reason. The magnifier can be used to select a scrap reason.

The following functions are available via the buttons:

PostingFunctionsInProduction.docx

Version: 1.1.20444

Page 5 of 7

SMA Posting Functions in Production

Closes the dialog without saving

Returns to the previous input field

Moves to the next input field

Operation is partially confirmed (report partial quantities).

Change partitioning

Function authorization

sma.partition

The posting dialog "Change partitioning" can be used to change the current partitioning for data collection

at the currently selected workplace.

The operation number (MES order number) and the new partitioning can be entered in the posting dialog.

The MES order number can be selected from the list of logged on operations via a search dialog.

Please note: All standard validation checks of HYDRA are run through.

Please note: This function is part of the package SMA-AMF.

The following fields are available in the function "Change partitioning":

Workplace

The selected workplace is accepted.

MES order number

The indicated operation is accepted in the posting function. You can enter the number manually or

you  can  select  an  operation  by  using  the  magnifier  if  several  operations  are  logged  on  to  the

machine.

Partitioning

Input field for the new partitioning used for data collection.

The following functions are available via the buttons:

Closes the dialog without saving

PostingFunctionsInProduction.docx

Version: 1.1.20444

Page 6 of 7

SMA Posting Functions in Production

Returns to the previous input field

Moves to the next input field

Changes the partitioning of the operation.

PostingFunctionsInProduction.docx

Version: 1.1.20444

Page 7 of 7


Posting Functions for Operations

1  Posting Functions for Operations

Usage

The  operation-related  functions  enable  operations  to  be  logged  on/off  or  interrupted  and  partial

confirmations/uploads to be performed.

Integration

The functions are integrated in the following applications:

  Order overview

  Workplace overview

Prerequisite

In  order  to  post  operations,  they  must  have  been  created  in  the  system.  In  addition,  one  person  with

appropriate posting authorization has to be created in the HR master data so that the BDE posting may

be confirmed by this person's badge number.

Restrictions

Due to their complexity, batch-related order postings cannot be performed via these posting dialogs.

Log operation on

Function authorization

op.logon

Posting dialog

A_AN

A  prepared  or  interrupted  operation  can  be  logged  on  to  a  workplace  by  means  of  this  function.  The

posting dialog for logging on operations is opened. The following fields are contained:

Workplace

Workplace at which the operation is to be logged on. By default, this field contains the workplace of

the currently selected operation.

MES order number

Combined order/operation number of the operation to be logged on. By default, this field contains

the operation number  of the currently selected operation.

MOC_PostingDialogsOperation.docx

Version: 1.1.18468

Page 1 of 4

Posting Functions for Operations

Badge

Badge number of the person performing the logon.

After confirming the posting dialog, the operation is logged on to the relevant workplace in the system.

Partial confirmation/upload of operation

Function authorization

op.partconf

Posting dialog

A_TR

Using this function, a partial quantity can be confirmed/uploaded for a running operation.  Yield or scrap

quantities may be posted on an operation without having to interrupt or terminate the operation. A partial

confirmation/upload is always possible for only one operation at a time. The following fields are contained:

Workplace

Workplace on which the partial upload is to be made. By default, this field contains the workplace of

the currently selected operation.

Operation

Operation  on  which  the  partial  upload  is  to  be  made.  By  default,  this  field  contains  the  operation

number  of the currently selected operation.

Badge

Badge number of the person performing the confirmation/upload.

Yield

Yield to be posted for the operation.

Scrap

Scrap to be posted for the operation.

Scrap reason

If a scrap quantity was indicated, an appropriate scrap reason is to be indicated here.

Posting required

The effect of a mandatory posting is that the posting is accepted even if plausibility errors such as

"Error due to overdelivery" occur.

After  confirming  the  posting  dialog,  the  relevant  quantity  is  recorded  for  the  operation  in  the  system.

Recording rules, if present, are observed here.

Interrupt operation

Function authorization

op.interrupt

Posting dialog

A_UN

This function can be used to interrupt a running operation. The following fields are contained:

MOC_PostingDialogsOperation.docx

Version: 1.1.18468

Page 2 of 4

Posting Functions for Operations

Workplace

Workplace on which the interruption is requested. By default, this field contains the workplace of the

currently selected operation.

Operation

Operation  on  which  the  interruption  is  requested.  By  default,  this  field  contains  the  operation

number  of the currently selected operation.

Badge

Badge number of the person performing the posting.

Yield

Yield to be confirmed/posted for the operation.

Scrap

Scrap to be confirmed/posted for the operation.

Scrap reason

If a scrap quantity was indicated, an appropriate scrap reason is to be indicated here.

Posting required

The effect of a mandatory posting is that the posting is accepted even if  validation errors such as

"Error due to overdelivery" occur.

After confirming the posting dialog, the operation is interrupted in the system and the relevant quantity is

recorded. Recording rules, if present, are observed here.

Log operation off

Function authorization

op.logoff

Posting dialog

A_AB

This function may be used to log off a running operation. The following fields are contained:

Workplace

Workplace  on  which  the  logoff  is  requested.  By  default,  this  field  contains  the  workplace  of  the

currently selected operation.

Operation

Operation on which the logoff is requested. By default, this field contains the operation number   of

the currently selected operation.

Badge

Badge number of the person performing the posting.

Yield

Yield to be confirmed for the operation.

MOC_PostingDialogsOperation.docx

Version: 1.1.18468

Page 3 of 4

Posting Functions for Operations

Scrap

Scrap to be confirmed for the operation.

Scrap reason

If a scrap quantity was indicated, an appropriate scrap reason is to be indicated here.

Posting required

The effect of a mandatory posting is that the posting is accepted even if  validation errors such as

"Error due to overdelivery" occur.

After confirming the posting dialog, the operation is logged off  in the system and the relevant quantity is

recorded. Recording rules, if present, are observed here.

Terminate operation

Function authorization

op.finish

Posting dialog

A_BE

This  function  can  be  used  to  terminate  a  prepared  or  interrupted  operation.  The  following  fields  are

contained:

Workplace

Workplace on which the finish posting is requested. By default, this field contains the workplace of

the currently selected operation.

Operation

Operation  on  which  the  finish  posting  is  requested.  By  default,  this  field  contains  the  operation

number  of the currently selected operation.

Badge

Badge number of the person performing the posting.

Yield

Yield to be confirmed for the operation.

Scrap

Scrap to be confirmed for the operation.

Scrap reason

If a scrap quantity was indicated, an appropriate scrap reason is to be indicated here.

Posting required

The effect of a mandatory posting is that the posting is accepted even if  validation errors such as

"Error due to overdelivery" occur.

After confirming the posting dialog, the operation is terminated in the system and the relevant quantity is

recorded. Recording rules, if present, are observed here.

MOC_PostingDialogsOperation.docx

Version: 1.1.18468

Page 4 of 4


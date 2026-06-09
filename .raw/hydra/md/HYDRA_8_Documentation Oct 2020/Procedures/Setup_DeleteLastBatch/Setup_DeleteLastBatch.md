Interrupting/Finishing OP without the Last Batch

1

Interrupting/Finishing OP without the Last Batch

Usage

You  use  the  function  to  prevent  the  last  output  batch  generated  between  the  output  batch  change  and

interrupting/finishing the OP from being connected in the system and, therefore, to be deleted.

Configuration

Material type

These configurations have to be made for the article's material type (article/item from operation):



Interrupting/logging the OP off without  the last batch: if the option is set, a last output batch will

indeed be generated for the article of the operation (matching this material type) between the last

output batch change and/or OP logon and OP interruption and/or OP logoff, but this one will be

deleted immediately (batch status = "D"). The batch is not visible in the batch history.

  Delete batch assignment: If this flag is set, the connection to the running input batches of the OP

will  be  deleted for the  output batch  "deleted at last".  Consequently, the deleted  batch  is neither

visible within batch tracing.

Dialog configuration A_AB_MPL/ A_UN_MPL

It  is  urgently  recommended  to  remove  the  following  fields  as  part  of  customizing  the  system,  as  they

might lead to misunderstandings and errors.

  Batch number

  Target buffer

  Transport unit

  Comment on batch

  Quality (yield, scrap)

  Quantity

  Reason

Setup_DeleteLastBatch.docx

Version: 1.0.18468

Page 1 of 1


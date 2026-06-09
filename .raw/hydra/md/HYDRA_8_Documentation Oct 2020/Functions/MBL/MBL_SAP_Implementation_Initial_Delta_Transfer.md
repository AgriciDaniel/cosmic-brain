Behavior Depending on the Transfer Types

1  Behavior Depending on the Transfer Types

Initial download behavior

An initial download of the order and operation data will only take place when the complete system is

commissioned and  a first database  is to  be created in HYDRA. In  addition, also other scenarios are

possible by which the entire operations base will be replaced.

During  an  initial  download  all  operations  from  SAP  will  be  transferred  that  have  at  least  the  status

"released" or that are not technically completed yet. This means that also (end) confirmed operations

will be transferred but not imported in HYDRA.

When the initial download is received, the current operations data base in HYDRA will be deleted and

be replaced by the new operations data. The current data will immediately be available.

An  initial  download  will  not  only  delete  the  order  base  existing  in  HYDRA  but  also  all  current

times and quantities entered for orders and/or transactions.

In addition, all operations that are being executed will not be deleted. This means that they must

be interrupted and/or terminated manually in HYDRA.

Conclusion:  Any  initial  download  during  the  operation  of  HYDRA  must  be  used  with  greatest

care and it would be useful to contact the MPDV Support beforehand.

For  security  reasons,  the  initial  download  function  needs  to  be  enabled  explicitly  as  of  the  below-
mentioned program version. Activation is performed by an INI configuration.

.\lib\b_anr.dll

V8.1.1.326

Delta download behavior

A delta download creates new operations in HYDRA that will then be added to the database. Another

function  of  the  delta  download  is  the  modification  of  already  transferred  operations.  Modifications  of

operations  with  the  status  "Running",  "Finished"  or  "Deleted"  are  not  allowed  by  the  HYDRA  default

settings.

CUSTOMIZING  information:  Modifications  of  the  operations  depend  on  whether  the  flag
“alterable order data” is set for the corresponding status in the status configuration.

If  an  operation  cannot  be  modified  to  ensure  the  consistency  in  HYDRA  (in  general  for  running

operations), this will be logged in HYDRA and be saved for error tracking purposes.

The basis for the delta download in SAP is the database table ORDCOM.

MBL_SAP_Implementation_Initial_Delta_Transfer.docx

Version: 1.0.1362

Page 1 of 2

Behavior Depending on the Transfer Types

Deletion download behavior

A deletion download deletes those operations that are no longer necessary in the production process

from the HYDRA database.

As with the modifications, the deletion result depends on the operation's status. Operations identified

as "Running", "Interrupted", "Finished" or "Deleted", will not be deleted.

Moreover,  the  confirmation  number  (CONF_NO)  will  be  checked  to  identify  the  orders  via  order,

sequence  and  transaction.  This  prevents  any  accidental  deletion  of  orders  that  are  seemingly  the

same but which have different confirmation numbers.

Behavior when re-importing master data in SAP

When master data for an existing and released order that has already been transferred to HYDRA are

re-imported in SAP this impacts also the interface to HYDRA.

When  master  data  are  re-imported,  SAP  will  assign  new  confirmation  numbers  for  the  individual

operations  even  though  the  order  and  operation  numbers  won't  change.  These  are  then  transferred

together  with  the  next  delta  download  to  HYDRA.  The  confirmation/upload  number  will  then  be

updated in HYDRA.

The  update  will  also  be  made  when  the  current  status  is  "Running".  In  this  case,  however,

ONLY  the  confirmation/upload  no.  will  be  changed  and  all  other  data  (order  quantity,

scheduling, etc.) will not be updated.

Behavior during the technical completion in SAP

If an order is technically completed in  SAP this will lead to a deletion download at the interface. This

means that the order data in HYDRA will be deleted.

MBL_SAP_Implementation_Initial_Delta_Transfer.docx

Version: 1.0.1362

Page 2 of 2


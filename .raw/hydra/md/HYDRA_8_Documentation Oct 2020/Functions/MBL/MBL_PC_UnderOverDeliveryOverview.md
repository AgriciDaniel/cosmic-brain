Validation Check

1  Validation Check

1.1  Overview

The validation check of a dialog verifies whether the system can completely process all resulting events

(in  the  current  status).  If  the  dialog  cannot  be  processed,  i.e.  not  all  events  have  been  checked

successfully, the dialog is rejected without making changes to the system.

The validation checks evaluate dialog data, the generated events and the HYDRA data set and interpret

the posting status. Some (partly optional) configurations are also integrated.

Examples of validation checks for dialog data:

 if an OP is logged on, the logged on OP must exist in the HYDRA data set,

 if an OP is logged on, the machine where the OP is logged on must exist in the HYDRA data set,

 if staff is logged on, the logged on person must exist in the HYDRA data set,

 when postings are performed for group workplaces, the postings must include the persons.

Examples of validation checks for the posting status:

 if a part quantity is uploaded for an OP, the OP must be logged on to the machine where the posting is

performed,

 if staff is logged off, the logged off person must have been logged on to the machine where the posting

is performed.

Examples of validation checks for configurations:

 if an OP is logged on, the person who performs the logon must be authorized to log on the OP,

 if a part quantity is uploaded for an OP, the overdelivery quantity may not be exceeded.

Some validation checks are explained in more detail in the sections that follow:

1.2  Validation checks regarding overdelivery or underdelivery

1.2.1  Overview

If part quantities are uploaded for an operation or if an operation is interrupted or logged off, a validation

check  can  be  performed  for  the  quantities  posted.  It  is  checked  if  there  is  an  overdelivery.  When  an

operation is logged off, you can also check if there is an underdelivery.

MBL_PC_UnderOverDeliveryOverview.docxVersion: 1.4.17210

Page 1 of 7

Validation Check

By default, quantity checks in HYDRA are designed for the manual input of quantities. The quantity check

is performed if a posting dialog includes a quantity <> 0. The quantity check is also always performed if a

quantity <> 0 is posted. In case of an overdelivery, the check is also performed if the quantity has already

been confirmed and a deviation reason has been entered.

The  overdelivery/underdelivery  check,  also  referred  to  as  target  quantity  check,  can  be  activated  for

operations or for persons.

1.2.2  Operation-related activation of the

overdelivery/underdelivery check

You  can  activate  a  validation  check  for  overdelivery  or  underdelivery  for  the  operation.  The  following

values/settings are relevant:

Underdelivery

Value in percent. The posted quantity can deviate from the target quantity by the percentage specified.

Example:

Target quantity of the operation: 120 items

Underdelivery: 84%

The actual quantity must not fall below 101 items.

Overdelivery

Value  in percent. The posted quantity can deviate from the target  quantity  by the percentage specified.

Example:

Target quantity of the operation: 120 items

Overdelivery: 168%

The actual quantity must not exceed 201 items.

Reaction

If  the  limits  specified  in  the  fields  overdelivery  or  underdelivery  are  exceeded,  a  warning  or  an  error

message can be issued. Possible values are:

"blank"   no reaction

W

X

 warning

 error

If a warning is activated ("W"), you can confirm a quantity deviation on the Windows terminal by entering

a deviation reason. If an error is activated ("X"), a quantity deviation is rejected.

MBL_PC_UnderOverDeliveryOverview.docxVersion: 1.4.17210

Page 2 of 7

Validation Check

Notes

By default, the operation-related validation check is performed for the actual yield quantity recorded

(primary quantity unit). You can also configure the processing code and activate a validation check

for  scrap,  rework  or  problem  quantities.  A  validation  check  for  alternative  quantity  units  (e.g.

secondary quantity, etc.) is not provided in the standard.

In general: DOS terminals generally reject all quantity deviations with an error, even if the option is

set to "W".

The functionality, which is available for Windows terminals, does not exist on the MOC.

If you use the SAP interface "PP-PDC", limit values for overdelivery/underdelivery are transferred as

absolute values. HYDRA converts these values to percentage values in the interface.

1.2.3  Person-related activation of the

overdelivery/underdelivery check

In addition or as an alternative, you can also activate a person-related overdelivery/underdelivery check.

For  this  purpose,  the  HR  master  provides  the  "target  quantity  check"  option  in  the  "BDE"  tab.  Possible

values:

1) No check.

2)  Order  logoff: When  an  operation  is  logged  off,  the  system  checks  if  the  current  yield  is  between  the

specified minimum and maximum target quantity. Both quantities are also specified in the HR master for a

person.

3) Underdelivery/overdelivery: All quantity postings are checked for overdelivery, when orders are logged

off/partially  uploaded  and  interrupted.  When  an  operation  is  logged  off,  it  is  also  checked  for

underdelivery.

You can confirm the validation check on the Windows terminal, if you enter a deviation reason.

Notes

The person-related validation checks are only performed for yield (primary quantity unit).

MBL_PC_UnderOverDeliveryOverview.docxVersion: 1.4.17210

Page 3 of 7

Validation Check

The limit values for overdelivery and underdelivery do not affect the person-related settings and are

checked  separately,  if  activated.  If  both  validation  checks  are  active,  then  first  the  person-related

target quantity check is performed, then the operation-related check.

1.2.4  Overdelivery/underdelivery check with automatic

recording of quantities

In  HYDRA  standard,  the  target  quantity  check  is  designed  for  the  manual  entry  of  quantities.  It  is  only

performed  if  a  quantity  <>  0  is  entered  in  the  posting  dialog.  The  paragraphs  below  describe  different

scenarios  where  the  validation  check  is  performed  in  connection  with  the  automatic  recording  of

quantities.

Scenario 1

If a quantity posting is performed for an operation in the active "production" status (interruption, logoff or

partial  confirmation/upload),  the  quantities  that  have  been  recorded  automatically  since  the  last  posting

(e.g.  status  change,  operation  posting,  personnel  posting)  and  the  quantities  that  might  have  been

recorded  manually  are  sent  to  the  server  to  be  booked.  A  validation  check  is  performed,  because  the

command (DLG=...) sent to the server includes a quantity. It does not matter if the operator has manually

entered  a  quantity  <>  0.  The  validation  check  is  now  performed  for  the  quantity  automatically  recorded

(AGR:GUT=...) and for the manually entered quantity (EGR:GUT=...=).

MBL_PC_UnderOverDeliveryOverview.docxVersion: 1.4.17210

Page 4 of 7

Validation Check

Scenario 2

If  a  machine  switches  from  the  production  status  to  “malfunction”,  the  quantities  recorded  so  far

(AGR:GUT=...) are sent to the server with the status change (DLG=M_MST|...) to be booked. As this is

an automatic posting (status change), a validation check is not performed.

If  a  posting  is  later  on  performed  for  the  operation,  a  validation  check  is  only  performed  if  the  operator

manually  enters  a  quantity  <>  0.  This  quantity  is  sent  to  the  server  with  the  posting  (e.g.

DLG=A_UN|EGR:GUT=...).

If the worker, for example, does not enter a quantity when the operation is interrupted (quantity = 0), no

validation check is performed, because no quantity is sent to the server (DLG=A_UN|...).

As no automatic quantities have been recorded since the last status change, this posting does not include

any automatic quantities, which could be checked.

MBL_PC_UnderOverDeliveryOverview.docxVersion: 1.4.17210

Page 5 of 7

ProductionAutomatically entered quantitiesMachine statusIncl. manual quantityInterruption (A_UN), Logoff (A_AB) or Partial upload (A_TR) of operationsUnderdelivery/overdelivery checkingyesnoWorker has not entered a manual quantity. The automatically recorded quantity is only transferred.e.g. DLG=A_TR|AGR:GUT=7|….The quantity manually recorded by the worker is transferred along with the automatically collected quantitye.g. DLG=A_TR|AGR:GUT=6| EGR:GUT=4|….*Underdelivery is only checked if operations are logged off

Validation Check

Scenario 3

Automatic  quantities  can  still  be  recorded,  even  if  the  machine  is  in  the  malfunction  status  and  the

production lock is set.

In  this  case,  this  automatic  quantity  is  sent  to  the  server  along  with  the  manual  quantity  entry  (e.g.

DLG=A_UN|AGR:GUT=...) and is checked for validity.

The validation check is performed as described in scenario 1. It does not matter if the operator has made

manual quantity entries or not.

MBL_PC_UnderOverDeliveryOverview.docxVersion: 1.4.17210

Page 6 of 7

ProductionMalfunction XAutomatically collected quantitiesMachine statusIncl. manual quantityChecking of underdelivery/ overdeliveryJaThe worker has not entered a quantity manually. (The automatically recorded quantity has already been posted along with changing the status)e.g. DLG=A_UN|….The manual quantity entered by the worker is transferrede.g. DLG=A_UN|EGR:GUT=4|….Overdelivery is not checked*  Machine status change(M_MST)Automtically collected quantities are automatically posted when machine statuses change. e.g. DLG=M_MST|AGR:GUT=6|…..Interruption (A_UN), Logoff (A_AB) or Partial upload (A_TR) of operationsNo

Validation Check

MBL_PC_UnderOverDeliveryOverview.docxVersion: 1.4.17210

Page 7 of 7

ProductionMalfunction Xincluding production lockAutomatically recorded quantitiesMachine statusIncl. manual quantityUnderdelivery/ overdelivery is checkedYesNoWorker has not entered manual quantities. Automatically collected quanttiy since status change: 3, e.g. DLG=A_UN|AGR:GUT=3|….The manual quantity entered by the worker will be transferred, e.g. DLG=A_UN|AGR:AUS=3| EGR:GUT=4|….Overdelivery is not checked*  Machine status changel(M_MST)Interruption (A_UN), Logoff (A_AB) or Partial upload (A_TR) of operationsAutomatically recorded quantities are posted autoamtically when machine statuses are changede.g. DLG=M_MST|AGR:GUT=6|…..


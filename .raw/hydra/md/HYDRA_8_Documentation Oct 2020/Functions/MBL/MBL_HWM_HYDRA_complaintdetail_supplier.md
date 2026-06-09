Workflow - Supplier Complaint Detail

1  Workflow - Supplier Complaint Detail

1.1  Usage

This  is  the  description  of  the  standard  workflow  process  to  be  used  for  processing  supplier  complaint

details.

The workflow is kept under the name HYDRA_complaintdetail_supplier.

A workflow based on the process described here is instantiated when a complaint detail for a complaint of

the type "supplier complaint" is created.

In the course of customizing, other workflow processes deviating from the standard could also

be instantiated upon the creation of supplier complaint details.

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 1 of 10

Workflow - Supplier Complaint Detail

1.2  Process Chart

1.2.1  Overview

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 2 of 10

Workflow - Supplier Complaint Detail

Identification of Addressee of Relevant Task

Upon activation of a process step for which a generic task has been defined, the addressee of this task is

identified on basis of the responsible person defined in the associated complaint detail at that time.

For this  purpose, the type  and ID are read first. The addressee  is identified as follows according  to the

type:

  Responsible person of type "external person":

A workflow user whose logon name corresponds with the ID of the external person is searched.

  Responsible person of type "person":

At  first,  a  HYDRA  user  is  searched  who  was  assigned  the  ID  of  the  person  responsible  for  the

complaint  detail  in  the  "Person"  field.  Following  this,  a  workflow  user  is  searched  whose  logon

name corresponds with the HYDRA user found.

  Responsible persons of all other types:

Using  the  ID  of  the  person  responsible  for  the  complaint  detail,  a  group  is  searched  in  the

workflow management system.

Should problems occur regarding the determination of detail data, or should the searched workflow user

and/or the group not exist, the group "COMPLAINT_MANAGER" is used as addressee.

1.2.2  Process Step "Entry of complaint detail"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 3 of 10

Workflow - Supplier Complaint Detail

In  accordance  with  the  status  of  the  checkbox  "Are  the  items  ok?",  it  is  decided  whether  the  actual

complaint reason has to be clarified or whether a relevant measure can be directly determined.

In the latter case, only, the checkboxes: "If not: are the items to be returned", "If not: are the items to be

reworked? and "If not: are the items to be scrapped?" determine the next processing step. In this regard,

the system will only jump to the first measure selected (according to the sequence specified).

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Have the items been checked?".

1.2.3  Ramification "Are the items ok?"

In accordance with the selection in the checkbox "Are the items ok?" in the previous process step, there

is  a  ramification  either  to  clarify  the  complaint  reason  or  to  subsequent  allocation  to  other  processing

steps.

1.2.4  Ramification "Are the items to be returned?"

In accordance with the selection in the checkbox "If not: are the items to be returned?" in the process step

"Check items" and/or "Rework items", there is a ramification either to arrange for the items to be returned

or to subsequent allocation to other processing steps.

1.2.5  Ramification "Internal rework?"

In  accordance  with  the  selection  in  the  checkbox  "If not:  are  the  items  to  be  reworked?"  in  the  process

step  "Check  items"  and/or  "Rework  items",  there  is  a  ramification  either  to  rework  the  items  or  to

subsequent allocation to other processing steps.

1.2.6  Ramification "Are the items to be scrapped?"

In  accordance  with  the  selection  in  the  checkbox  "If not:  are  the  items  to  be  scrapped?"  in  the  process

step  "Check  items"  and/or  "Rework  items",  there  is  a  ramification  either  to  charge  the  supplier  for  the

parts or to clarify the course of action.

1.2.7  Process step "Clarification of complaint reason"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 4 of 10

Workflow - Supplier Complaint Detail

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the complaint reason been sorted out?".

1.2.8  Process Step "Arrange return"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has return delivery been arranged?".

1.2.9  Process Step "Rework items"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 5 of 10

Workflow - Supplier Complaint Detail

In accordance with the status of the checkbox "Has rework been successful?", it is decided whether the

supplier has to be charged or whether a subsequent measure can be determined directly.

In the latter case, only, the checkboxes: "If not: are the items to be returned", "If not: are the items to be

reworked again? and "If not: are the items to be scrapped?" determine the next processing step. In this

regard, the system will only jump to the first measure selected (according to the sequence specified).

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has rework been performed?".

1.2.10  Ramification "Rework ok?"

In accordance with the selection in the checkbox "Has rework been successful?" in the previous process

step, there is a ramification either to charge the supplier or to the re-allocation of processing steps.

1.2.11  Process Step "Debit supplier's account"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 6 of 10

Workflow - Supplier Complaint Detail

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the supplier's account been debited?".

1.2.12  Process Step "Clarification of course of action"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the further course of action been clarified?".

1.2.13  Process Step "Specify findings and complete"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 7 of 10

Workflow - Supplier Complaint Detail

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the complaint detail been completed?".

1.2.14  Display of Workflow Information

The  workflow  information  function  will  display  all  information  which  has  been  defined  in  workflow

processing and has an effect on ramifications in the workflow.

The  meaning  of  the  elements  in  this  display  is  explained  in  the  context  of  the  relevant  process  steps

where this information is available for entry.

All information is made available as read-only information at this point.

1.3

Integration

Upon  creation  of  a  supplier  complaint  detail,  an  active  entry  of  the  object  type  WFM_CONFIG  with

parameter  ComplaintDetail_ComplaintType_LIEFERANT  is  searched  in  the  advanced  object

configuration of HYDRA.

The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used

(by default: HYDRA_complaintdetail_supplier). The parameter "Object ID 2" of the entry found is

interpreted as the version of the process definition to be used.

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 8 of 10

These parameters can be used to create a new workflow event. Its key fields are assigned as follows:

Workflow - Supplier Complaint Detail

Key field

Content

Module

COMPLAINTDETAIL

Designation

Workflow for complaintdetail

Process alias name

ComplaintDetail_ComplaintType_LIEFERANT

Process name

Name of process definition

(result of the previously described search)

Process version

Version of process definition

(result of the previously described search)

ID 1

ID 2

ID 3

ID 4

ID 5

Internal number of supplier complaint

Number of complaint detail

Empty

Empty

Empty

Key 1

Data type of supplier complaint

Key 2

Key 3

Key 4

Key 5

Data

(default: REK)

Area of supplier complaint

Empty

Empty

Empty

var_HYDRA_rectype=<Data type of complaint>|

var_HYDRA_ber=<Area of complaint>|

var_HYDRA_reknr=<Internal  number  of  supplier  complaint>|

var_HYDRA_rekdetnr=<Complaint detail number>|

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 9 of 10

Workflow - Supplier Complaint Detail

Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name

of the process definition and its version. Should this fail, the process event will provide an indication of the

cause.

If  instantiation  of  the  workflow  was  successful,  the  workflow  variables  var_HYDRA_rectype,

var_HYDRA_ber,  var_HYDRA_reknr  and  var_HYDRA_rekdetnr  can  be  used  to  generate  the

reference to the associated supplier complaint detail directly.

MBL_HWM_HYDRA_complaintdetail_supplier.docx        Version:1.0.1362

    Page 10 of 10


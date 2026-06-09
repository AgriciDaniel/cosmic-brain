Workflow - Customer Complaint Detail

1  Workflow - Customer Complaint Detail

1.1  Usage

This  is  the  description  of  the  standard  workflow  process  to  be  used  for  processing  customer  complaint

details.

The workflow is administered under the name HYDRA_complaintdetail_customer.

A workflow based on the process described here is instantiated when a complaint detail for a complaint of

the type "customer complaint" is created.

In the course of customizing, other workflow processes deviating from the standard could also

be instantiated upon the creation of customer complaint details.

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 1 of 12

Workflow - Customer Complaint Detail

1.2  Process Chart

1.2.1  Overview

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 2 of 12

Workflow - Customer Complaint Detail

Identification of Addressee of Relevant Task

Upon activation of a process step for which a generic task has been defined, the addressee of this task is

identified on the basis of the responsible person defined in the associated complaint detail at that time.

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

In accordance with the status of the checkbox "Process complaint based on 8D?", it is decided at the time

of  task  completion  whether  the  complaint  detail  is  to  be  handled  according  to  8D  or  in  a  simplified

manner.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Have the complaint detail data been entered?".

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 3 of 12

Workflow - Customer Complaint Detail

1.2.3  Ramification "Evaluation according to 8D?"

In  accordance  with  the  selection  in  the  checkbox  "Process  complaint  based  on  8D?"  in  the  previous

process step, there is a ramification for evaluation according to 8D or a simplified manner.

1.2.4  Process Step "Organization of team"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is not continued until completion of this task has been documented by activating the "Team

organized?" checkbox.

1.2.5  Process Step "Problem description"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the problem been described?".

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 4 of 12

Workflow - Customer Complaint Detail

1.2.6  Distribution

At this point, workflow processing is split into two parallel processes. One is about determining immediate

measures. The other one is about researching the cause of the fault and the subsequent implementation

of remedial action.

1.2.7  Process Step "Determine immediate measures"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Immediate measure(s) has/have been defined".

1.2.8  Process Step "Determine failure causes"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Have failure causes been determined?".

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 5 of 12

Workflow - Customer Complaint Detail

1.2.9  Process Step "Planning of remedial action"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

In accordance with the status of the checkbox "Is the remedial action effective?", it is decided at the time

of task completion whether to return to determining the cause of the fault.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has remedial action been determined?".

1.2.10  Ramification "Effectiveness agreed?"

If  remedial  action  was  not  considered  effective  in  the  previous  process  step,  you  return  to  the  process

step "Determine failure causes".

In  the  other  case,  workflow  processing  is  continued  at  the  process  step  "Implementation  of  remedial

action".

1.2.11  Process Step "Implementation of remedial action" (on the

left)

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 6 of 12

Workflow - Customer Complaint Detail

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has remedial action been implemented?".

1.2.12  Process Step "Prevent failure repetition"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has a repetition of the failure been prevented?".

1.2.13  Consolidation

At this point the system waits until processing of both paths is completed. Processing will then continue at

the process step "Acknowledgment of team performance".

1.2.14  Process Step "Acknowledgment of team performance"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 7 of 12

Workflow - Customer Complaint Detail

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Team performance acknowledged?".

1.2.15  Process Step "Perform failure analysis"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has failure analysis been performed?".

1.2.16  Process Step "Determination of remedial action"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 8 of 12

Workflow - Customer Complaint Detail

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has remedial action been determined?".

1.2.17  Process Step "Implementation of remedial action" (on the

right)

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has remedial action been implemented?".

1.2.18  Process Step "Complete complaint detail"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 9 of 12

Workflow - Customer Complaint Detail

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the complaint detail been completed?".

1.2.19  Display of Workflow Information

The  workflow  information  function  will  display  all  information  which  has  been  defined  in  workflow

processing and has an effect on ramifications in the workflow.

The  meaning  of  the  elements  in  this  display  is  explained  in  the  context  of  the  relevant  process  steps

where this information is available for entry.

All information is made available as read-only information at this point.

1.3

Integration

Upon  creation  of  a  customer  complaint  detail,  an  active  entry  of  the  object  type  WFM_CONFIG  with

parameter  ComplaintDetail_ComplaintType_KUNDE

is  searched

in

the  advanced  object

configuration of HYDRA.

The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used

(by default: HYDRA_complaintdetail_customer). The parameter "Object ID 2" of the entry found is

interpreted as the version of the process definition to be used.

These parameters can be used to create a new workflow event. Its key fields are assigned as follows:

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 10 of 12

Workflow - Customer Complaint Detail

Key field

Content

Module

COMPLAINTDETAIL

Designation

Workflow for complaintdetail

Process alias name

ComplaintDetail_ComplaintType_KUNDE

Process name

Name of process definition

(result of the previously described search)

Process version

Version of process definition

ID 1

ID 2

ID 3

ID 4

ID 5

(result of the previously described search)

Internal number of customer complaint

Number of complaint detail

Empty

Empty

Empty

Key 1

Data type of customer complaint

Key 2

Key 3

Key 4

Key 5

Data

(default: REK)

Area of customer complaint

Empty

Empty

Empty

var_HYDRA_rectype=<Data type of complaint>|

var_HYDRA_ber=<Area of complaint>|

var_HYDRA_reknr=<Internal  number  of  customer  complaint>|

var_HYDRA_rekdetnr=<Complaint detail number>|

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 11 of 12

Workflow - Customer Complaint Detail

Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name

of the process definition and its version. Should this fail, the process event will provide an indication of the

cause.

If  instantiation  of  the  workflow  was  successful,  the  workflow  variables  var_HYDRA_rectype,

var_HYDRA_ber,  var_HYDRA_reknr  and  var_HYDRA_rekdetnr  can  be  used  to  generate  the

reference to the associated customer complaint detail directly.

MBL_HWM_HYDRA_complaintdetail_customer.docx    Version:1.1.1362

Page 12 of 12


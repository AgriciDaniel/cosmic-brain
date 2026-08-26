Workflow - Customer Complaint

1  Workflow - Customer Complaint

1.1  Usage

This is the description of the standard workflow process to be used for processing customer complaints.

The workflow is administered under the name HYDRA_complaint_customer.

A workflow based on the process described here is instantiated when a complaint of the type  "customer

complaint" is created.

In the course of customizing, other workflow processes deviating from the standard could also

be instantiated upon the creation of customer complaints.

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 1 of 10

Workflow - Customer Complaint

1.2  Process Chart

1.2.1  Overview

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 2 of 10

Workflow - Customer Complaint

Identification of Addressee of Relevant Task

Upon activation of a process step for which a generic task has been defined, the addressee of this task is

identified on the basis of the responsible person defined in the associated complaint at that time.

For this  purpose, the type  and ID are read first. The addressee  is identified as follows according  to the

type:

  Responsible person of type "external person":

A workflow user whose logon name corresponds with the ID of the external person is searched.

  Responsible person of type "person":

At  first,  a  HYDRA  user  is  searched  who  was  assigned  the  ID  of  the  person  responsible  for  the

complaint  in  the  "Person"  field.  Following  this,  a  workflow  user  is  searched  whose  logon  name

corresponds with the HYDRA user found.

  Responsible persons of all other types:

Using  the  ID  of  the  person  responsible  for  the  complaint,  a  group  is  searched  in  the  workflow

management system.

Should problems occur regarding the determination of detail data, or should the searched workflow user

and/or the group not exist, the group "COMPLAINT_MANAGER" is used as addressee.

1.2.2  Process Step "Entry of complaint data"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Have the complaint data been recorded?“

1.2.3  Process Step "Determination of measures aiming at

customer satisfaction"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 3 of 10

Workflow - Customer Complaint

The  originator  of  this  process  step  must  now  define  which  tasks  he/she  intends  to  initiate  to  restore

customer  satisfaction.  The  tasks  "Measure:    Arrange  replacement  delivery";  "Measure:  Rework  at

Customer Premises", "Measure: Discount" and "Special measure" are available.

At  this  point,  the  user  may  choose  to  select  several  different  measures.    However,  the  decision  as  to

which direction the workflow process will continue is made on the basis of one measure.

The workflow is not continued until at least one of the measures has been selected.

1.2.4  Process Step "Confirm receipt of complaint"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has receipt of the complaint been confirmed?“

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 4 of 10

Workflow - Customer Complaint

1.2.5  Multiple Ramification "Customer satisfaction measure"

Based  on  the  selected  made  in  the  process  step  "Determination  of  measures  aiming  at  customer

satisfaction", it is decided how the workflow is continued.

If  several  checkboxes  were  marked  in  the  associated  task,  the  system  jumps  to  the  first  process  step

found in the following sequence:

  Measure: Arrange replacement delivery

  Measure: Rework at Customer Premises

  Measure: Discount

  Special measure

1.2.6  Process Step "Arrange replacement delivery"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has a replacement delivery been arranged?“

1.2.7  Process Step "Initiate rework at customer premises"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 5 of 10

Workflow - Customer Complaint

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has rework been carried out?“

1.2.8  Process Step "Arrange discount"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has a discount been arranged?“

1.2.9  Process Step "Arrange special measures"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 6 of 10

Workflow - Customer Complaint

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the special measure been arranged?“

1.2.10  Process Step "Wait for detail analysis result"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

In  accordance  with  the  status  of  the  "Complaint  justified?"  checkbox,  a  decision  is  made  at  the  time  of

task completion as to whether commercial clarification with the customer is required.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "All detailed complaints completed?“

1.2.11  Ramification "Complaint justified"

In  accordance  with  the  selection  in  the  "Complaint  justified?"  checkbox  in  the  previous  process  step,

either  clarification  with  the  customer  is  proposed  or  there  is  a  ramification  for  verification  of  all  data

concerning complaint handling.

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 7 of 10

1.2.12  Process Step "Clarification with customer"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

Workflow - Customer Complaint

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the problem been clarified with the customer?“

1.2.13  Process Step "Finish complaint"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The workflow is finished when completion of this task has been documented by activating the checkbox

"Has the complaint been completed?“

1.2.14  Display of Workflow Information

The  workflow  information  function  will  display  all  information  which  has  been  defined  in  workflow

processing and has an effect on ramifications in the workflow.

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 8 of 10

Workflow - Customer Complaint

The  meaning  of  the  elements  in  this  display  is  explained  in  the  context  of  the  relevant  process  steps

where this information is available for entry.

All information is made available as read-only information at this point.

1.3

Integration

Upon  creation  of  a  customer  complaint,  an  active  entry  of  the  object  type  WFM_CONFIG  with  parameter

Complaint_ComplaintType_KUNDE is searched in the advanced object configuration of HYDRA.

The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used

(by  default:  HYDRA_complaint_customer).  The  parameter  "Object  ID  2"  of  the  entry  found  is

interpreted as the version of the process definition to be used.

These parameters may be used to create a new workflow event. Its key fields are assigned as follows:

Key field

Contents

Module

COMPLAINT

Designation

Workflow for complaint

Process alias name

Complaint_ComplaintType_KUNDE

Process name

Name of process definition

(result of the previously described search)

Process version

Version of process definition

ID 1

ID 2

(result of the previously described search)

Internal number of customer complaint

Empty

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 9 of 10

Workflow - Customer Complaint

ID 3

ID 4

ID 5

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

var_HYDRA_reknr=<Internal number of customer complaint>|

Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name

of the process definition and its version. Should this fail, the process event will provide an indication of the

cause.

If  instantiation  of  the  workflow  was  successful,  the  workflow  variables  var_HYDRA_rectype,

var_HYDRA_ber  and  var_HYDRA_reknr  can  be  used  to  generate  the  reference  to  the  associated

customer complaint directly.

MBL_HWM_HYDRA_complaint_customer.docxVersion: 1.1.1362

Page 10 of 10


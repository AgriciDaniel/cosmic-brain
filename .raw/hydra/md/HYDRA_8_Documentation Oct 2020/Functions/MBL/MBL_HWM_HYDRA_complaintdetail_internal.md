Workflow - Internal Complaint Detail

1  Workflow - Internal Complaint Detail

1.1  Usage

This  is  the  description  of  the  standard  workflow  process  to  be  used  for  processing  internal  complaint

details.

The workflow is administered under the name HYDRA_complaintdetail_internal.

A workflow based on the process described here is instantiated when a complaint detail for a complaint of

the type "internal complaint" is created.

In the course of customizing, other workflow processes deviating from the standard could also

be instantiated upon the creation of internal complaint details.

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 1 of 11

Workflow - Internal Complaint Detail

1.2  Process Chart

1.2.1  Overview

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 2 of 11

Workflow - Internal Complaint Detail

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

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Have the complaint detail data been entered?".

1.2.3  Process Step "FMEA verification"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 3 of 11

Workflow - Internal Complaint Detail

In accordance with the status of the checkbox "Is it a repetitive failure?", it is decided at the time of task

completion whether a reference complaint is to be searched from which the failure analysis and remedial

action may be adopted.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has FMEA been verified?".

1.2.4  Ramification "Repetitive failure?"

In accordance with the selection in the checkbox "Is it a repetitive failure?" in the previous process step,

there  is  a  ramification  either  to  the  verification  of  a  reference  complaint  or  to  determining  the  failure

cause.

1.2.5  Process Step "Determine failure causes"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Have failure causes been determined?".

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 4 of 11

Workflow - Internal Complaint Detail

1.2.6  Process Step "Planning of remedial action"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has remedial action been determined?".

1.2.7  Process Step "Reference complaint verification"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  checkboxes  "Accept  failure  analysis?"  and  "Accept  remedial  action?"  will  determine  whether  the

relevant detail information from the reference complaint is adopted or is to be determined separately at a

later point in time.

If  the  failure  analysis  cannot  be  adopted,  remedial  action  must  also  be  planned  (regardless  of  the

checkbox  "Adopt  remedial  action?").  The  reason  for  this  is  that  remedial  action  must  match  the  failure

analysis. To ensure this, adoption of the remedial action is prevented if the failure analysis is not adopted.

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 5 of 11

Workflow - Internal Complaint Detail

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the reference complaint been verified?".

1.2.8  Ramification "Accept failure analysis?"

In accordance with the selection in the checkbox "Adopt failure analysis?" in the process step "Reference

complaint verification", there is a ramification to adopting the failure analysis or to determining the failure

causes.

1.2.9  Process Step "Accept failure analysis"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the failure analysis been accepted?".

1.2.10  Ramification "Adopt remedial action?"

In accordance with the selection in the checkbox "Adopt remedial action?" in the process step "Reference

complaint verification", there is a ramification to adopting the remedial action of the reference complaint or

to planning remedial action.

1.2.11  Process Step "Adopt remedial action"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 6 of 11

Workflow - Internal Complaint Detail

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has remedial action been adopted?".

1.2.12  Process Step "Implementation of remedial action"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

In accordance with the status of the checkbox "Is the remedial action effective?", it is decided at the time

of  task  completion  whether  you  return  to  determining  the  failure  cause  or  whether  processing  is

continued.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has remedial action been implemented?".

1.2.13  Ramification "Action effective?"

In  accordance  with  the  selection  in  the  checkbox  "Is  the  remedial  action  effective?"  in  the  previous

process step, there is either a ramification to determine the failure cause or completion of the complaint

detail is continued.

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 7 of 11

Workflow - Internal Complaint Detail

1.2.14  Process Step "Complete complaint detail"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has the complaint detail been completed?".

1.2.15  Process Step "FMEA verification"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

In accordance with the status of the checkbox "Is FMEA still up-to-date?", it is decided whether you jump

to FMEA updating or whether the workflow is to be finished.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has FMEA been checked with respect to current data?".

1.2.16  Ramification "Is FMEA still up-to-date?"

In accordance with the selection in the checkbox "Is FMEA still up-to-date?" in the previous process step,

there is a ramification to updating FMEA or the workflow is finished.

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 8 of 11

Workflow - Internal Complaint Detail

1.2.17  Process Step "Update FMEA"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Has FMEA been updated?".

1.2.18  Display of Workflow Information

The  workflow  information  function  will  display  all  information  which  has  been  defined  in  workflow

processing and has an effect on ramifications in the workflow.

The  meaning  of  the  elements  in  this  display  is  explained  in  the  context  of  the  relevant  process  steps

where this information is available for entry.

All information is made available as read-only information at this point.

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 9 of 11

Workflow - Internal Complaint Detail

1.3

Integration

Upon  creation  of  an  internal  complaint  details,  an  active  entry  of  the  object  type  WFM_CONFIG  with

parameter  ComplaintDetail_ComplaintType_INTERN

is  searched

in

the  advanced  object

configuration of HYDRA.

The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used

(by default: HYDRA_complaintdetail_internal). The parameter "Object ID 2" of the entry found is

interpreted as the version of the process definition to be used.

These parameters can be used to create a new workflow event. Its key fields are assigned as follows:

Key field

Content

Module

COMPLAINTDETAIL

Designation

Workflow for complaintdetail

Process alias name

ComplaintDetail_ComplaintType_INTERN

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

Internal number of internal complaint

Number of complaint detail

Empty

Empty

Empty

Key 1

Data type of internal complaint

Key 2

Key 3

Key 4

(default: REK)

Area of internal complaint

Empty

Empty

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 10 of 11

Workflow - Internal Complaint Detail

Key 5

Data

Empty

var_HYDRA_rectype=<Data type of complaint>|

var_HYDRA_ber=<Area of complaint>|

var_HYDRA_reknr=<Internal  number  of

internal  complaint>|

var_HYDRA_rekdetnr=<Complaint detail number>|

Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name

of the process definition and its version. Should this fail, the process event will provide an indication of the

cause.

If  instantiation  of  the  workflow  was  successful,  the  workflow  variables  var_HYDRA_rectype,

var_HYDRA_ber,  var_HYDRA_reknr  and  var_HYDRA_rekdetnr  can  be  used  to  generate  the

reference to the associated internal complaint detail directly.

MBL_HWM_HYDRA_complaintdetail_internal.docx    Version:1.0.1362

  Page 11 of 11


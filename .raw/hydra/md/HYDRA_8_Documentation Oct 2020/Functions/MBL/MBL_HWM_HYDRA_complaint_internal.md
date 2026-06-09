Workflow - Internal Complaint

1  Workflow - Internal Complaint

1.1  Usage

This is the description of the standard workflow process to be used for processing internal complaints.

The workflow is administered under the name HYDRA_complaint_internal.

A  workflow  based  on  the  process  described  here  is  instantiated  when  a  complaint  of  the  type  "internal

complaint" is created.

In the course of customizing, other workflow processes deviating from the standard could also

be instantiated upon the creation of internal complaints.

MBL_HWM_HYDRA_complaint_internal.docxVersion: 1.1.1362

Page 1 of 8

Workflow - Internal Complaint

1.2  Process Chart

1.2.1  Overview

MBL_HWM_HYDRA_complaint_internal.docxVersion: 1.1.1362

Page 2 of 8

Workflow - Internal Complaint

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

1.2.2  Process Step "Entry and/or completion of complaint

data"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Have complaint data been entered?".

1.2.3  Process Step "Perform risk analysis"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaint_internal.docxVersion: 1.1.1362

Page 3 of 8

Workflow - Internal Complaint

In  accordance  with  the  status  of  the  checkbox  "Do  immediate  measures  have  to  be  defined?",  it  is

decided at the time of task completion whether to proceed in this regard or whether there is a ramification

for determining the complaint findings.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "The risk analysis has been performed".

1.2.4  Ramification "Immediate measures required?"

In  accordance  with  the  selection  in  the  checkbox  "Do  immediate  measures  have  to  be  defined?"  in  the

previous  process  step,  either  clarification  with  the  customer  is  proposed  or  there  is  a  ramification  for

verification of all data concerning complaint handling.

1.2.5  Process Step "Define immediate measures"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Immediate measure(s) has/have been defined".

MBL_HWM_HYDRA_complaint_internal.docxVersion: 1.1.1362

Page 4 of 8

Workflow - Internal Complaint

1.2.6  Process Step "Determine effectiveness of immediate

measures"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

In accordance with the status of the checkbox "Has the immediate measure been effective?", it is decided

at the time of task completion whether additional immediate measures are to be defined or whether there

is a ramification for determining the complaint findings.

The  workflow  is  not  continued  until  completion  of  this  task  has  been  documented  by  activating  the

checkbox "Measure effectiveness assessed?".

1.2.7  Ramification "Immediate measures effective?"

In  accordance  with  the  selection  in  the  checkbox  "Has  the  immediate  measure  been  effective?"  in  the

previous  process  step,  either  you  return  to  the  definition  of  immediate  measures  or  you  proceed  with  a

verification of all data concerning complaint handling.

1.2.8  Process Step "Determination of findings and completion"

Activating this process step will create a task. The recipient of the task is notified by e-mail.

MBL_HWM_HYDRA_complaint_internal.docxVersion: 1.1.1362

Page 5 of 8

Workflow - Internal Complaint

The workflow is finished when completion of this task  has been documented by activating the checkbox

"Has the complaint been completed?".

1.2.9  Display of Workflow Information

The  workflow  information  function  will  display  all  information  which  has  been  defined  in  workflow

processing and has an effect on ramifications in the workflow.

The  meaning  of  the  elements  in  this  display  is  explained  in  the  context  of  the  relevant  process  steps

where this information is available for entry.

All information is made available as read-only information at this point.

MBL_HWM_HYDRA_complaint_internal.docxVersion: 1.1.1362

Page 6 of 8

Workflow - Internal Complaint

1.3

Integration

Upon  creation  of  an  internal  complaint,  an  active  entry  of  the  object  type  WFM_CONFIG  with  parameter

Complaint_ComplaintType_INTERN is searched in the advanced object configuration of HYDRA.

The parameter "Object ID 1" of this entry is interpreted as the name of the process definition to be used

(by  default:  HYDRA_complaint_internal).  The  parameter  "Object  ID  2"  of  the  entry  found  is

interpreted as the version of the process definition to be used.

These parameters can be used to create a new workflow event. Its key fields are assigned as follows:

Key field

Contents

Module

COMPLAINT

Designation

Workflow for complaint

Process alias name

Complaint_ComplaintType_INTERN

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

Internal number of internal complaint

Empty

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

MBL_HWM_HYDRA_complaint_internal.docxVersion: 1.1.1362

Page 7 of 8

Workflow - Internal Complaint

Key 5

Data

Empty

var_HYDRA_rectype=<Data type of complaint>|

var_HYDRA_ber=<Area of complaint>|

var_HYDRA_reknr=<Internal number of customer complaint>|

Subsequently, an attempt is made to instantiate a workflow on the basis of the previously identified name

of the process definition and its version. Should this fail, the process event will provide an indication of the

cause.

If  instantiation  of  the  workflow  was  successful,  the  workflow  variables  var_HYDRA_rectype,

var_HYDRA_ber  and  var_HYDRA_reknr  may  be  used  to  generate  the  reference  to  the  associated

internal complaint directly.

MBL_HWM_HYDRA_complaint_internal.docxVersion: 1.1.1362

Page 8 of 8


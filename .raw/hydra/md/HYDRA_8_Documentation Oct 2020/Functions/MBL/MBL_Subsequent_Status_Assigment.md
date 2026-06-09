  Subsequent Assignment of Status Reasons on AIP2

1  Subsequent Assignment of Status Reasons on AIP2

Overview

With a monitoring of machines, the following situation is possible:

Because of a malfunction,  no cycles or no operating  signal  is sent to the  PCC.  The PCC  identifies that

signals are missing and automatically changes to status 30000 "Not assigned".

When  the  malfunction  is  finished,  the  machine  control  transfers  signals  to  the  PCC  again.  The  PCC

identifies the signals and automatically changes to status "Production". For the time of the malfunction, the

system automatically posts the status "General disturbance". The status "General disturbance" is usually

assigned to the resource performance account 2 (DCI).

The machine has restarted production and the operator then goes to the AIP to subsequently set the correct

status. This status can be a status that is also assigned to the resource performance account 2. But it can

also be a status that is assigned to another resource performance account.

The diagram below illustrates the subsequent assignment of a status reason, i. e. the status change from

"General disturbance" (RPA2) to "Staff shortage" (RPA 3):

Cycles

Status
- Production
- Not assigned
- Gen. disturbance

Purpose

You use this functionality in the following situation:

  You use the automatic status monitoring:

o  Cyclic monitoring

o  Monitoring via operating signal

Subsequent assignment of reason on AIP:
Status change e.g.
- from "Gen. disturbance" (RPA 2)
- to "Staff shortage" (RPA 3)

  You use the function Status log on the AIP to assign a reason to the status "General disturbance" while

the operation is still logged on.

MBL_Subsequent_Status_Assigment.docxVersion: 1.1.17740

Page 1 of 5

  Subsequent Assignment of Status Reasons on AIP2

  You  want  that  the  system  updates  the  BDE  and  WRM  result  records  when  the  status  "General

disturbance"  is  subsequently  changed  and  the  new  status  is  assigned  to  a  different  resource

performance account.

If  this  situation  exists,  the  system  automatically  recalculates  the  postings  of  this  workflow.  After

recalculation, the resource performance accounts in the BDE and WRM result records then correspond to

the resource performance accounts of the workplace/machine statuses.

Integration

Note: This automatic recalculation and the subsequent assignment of a status reason is performed while

the affected objects – e.g. operation, person, resource – are still logged on. The posting workflow is still

active then and has not been closed.

The operator can subsequently change the status "General disturbance" in the Status log on the

AIP. Condition: the current posting workflow must still be active.

Requirements

To use this functionality, the following requirements must be fulfilled:

  The functionality is available as of MW 4.0pe.



In  the  INI  configuration,  the  SYSTEM  entry  "EVENT_MAINTENANCE"  with  key  "EXTENDED"  and

value "J" must be active.

Note: The entry is created via the database patch INTEGRATED_DATA_MAINTENANCE (included in

MW 4.0pe).

  The database table cyclic_recalculation must exist.

o  The table is created via the database patch INTEGRATED_DATA_MAINTENANCE (included

in MW 4.0pe).



In the scheduler, the entry "IDM cyclic recalculation" must be available and active.

o

In the scheduler, the entry "IDM cyclic recalculation" is made three times by the database patch.

These entries trigger the automatic recalculation right after each shift change.

hymw.exe -u9999 -c"DLG=IDM.CYCLRECALC|RWSC.TIMEOUT=3600|"

o  The recalculation is performed at fixed times: at 06:05, 14:05 and 22:05 hours.

All three entries are not active by default. They must be activated explicitly. Then

restart HYDRA.

MBL_Subsequent_Status_Assigment.docxVersion: 1.1.17740

Page 2 of 5

  Subsequent Assignment of Status Reasons on AIP2

Processing

Subsequent Assignment of Status Reasons on AIP

If the operator changes the status "General disturbance" using the AIP function Status log and confirms the

input dialog, the system processes as follows:

  The AIP sends the status change to the HYDRA server. Command:

DLG=M_MST|MNR=<workplace/machine>|MST=<new status>|MOD=K|.

  The parameter MOD=K informs the system that this is a subsequent assignment of reason and that it

is not the change of the current status.

  The  system  identifies  the  MDE  result  record  and  replaces  the  previous  status  (and  its  resource

performance  account)  in  the  MDE  result  record  with  the  new  status  (and  its  resource  performance

account).



If the new and the old status are assigned to the same resource performance account, the processing

is completed.



If the new status is assigned to a different resource performance account than the old status, the system

identifies the event (M_MST) that was used to generate the MDE result record. The system writes the

ID of the event identified into the internal table cyclic_recalculation.

In both cases, for the operator the processing on the terminal is finished: the new status is shown in the

status log.

Recalculation of the saved status changes

The scheduler requests a web service. To ensure that the posting workflows are completed, the scheduler

includes three entries and each entry requests the web service a few minutes after shift change. By default,

the entries are at 06:05, 14:05 and 22:05 hours.

Change the entries in the scheduler, if the shifts in your company do not start at 06:00, 14:00 and

22:00 hours.

The web service selects all events saved in the table cyclic_recalculation and passes the selected events

to the system for automatic recalculation. Beforehand, the system checks if or that the posting workflow is

actually closed (see below).

The  automatic  recalculation  process  is  identical  to  the  recalculation  function  called  in  the  tabular  Event

maintenance.

After processing of the automatic recalculation, the entries are deleted in the table cyclic_recalculation.

Checking whether the posting workflow has been completed

MBL_Subsequent_Status_Assigment.docxVersion: 1.1.17740

Page 3 of 5

  Subsequent Assignment of Status Reasons on AIP2

Each event identified has been performed at a specific workplace. A posting workflow is only completed for

the event identified, if one of the following conditions is fulfilled:

  The beginning of the current shift is after the time of the event.

  The beginning of the current shift is before the time of the event and the following two conditions are

true:

a)  At the workplace, there is no current (still running) logon available, which starts before the end of

the status with a subsequently assigned reason.

b)  At the workplace, a current (still running) logon is not available that has started in the period of

time of a BDE log record generated in the meantime (record type U/E/B/H) and which is (entirely
or partly) included in the period of time of the status with a subsequently assigned reason.

In the examples of posting workflows below, the relevant posting workflow is not yet completed and closed

because of the data record with the red X.

Example 1:

Example 2:

Example 3:

Further notes

MBL_Subsequent_Status_Assigment.docxVersion: 1.1.17740

Page 4 of 5

  Subsequent Assignment of Status Reasons on AIP2

In the course of the subsequent calculation and correction of values, also the changed MDE log record is

canceled and a new MDE log record is created.

MBL_Subsequent_Status_Assigment.docxVersion: 1.1.17740

Page 5 of 5


Function Groups

1  Function Groups

Overview

HYDRA menu

FEDRA menu

Master data  Escalation management  Function groups

Detailed scheduling  Master data   Escalation history

Transaction code

escfg

Function authorization

escfg

Purpose

You use this function to create or modify function groups in the system.

Integration

Use function groups in the escalation management to

  notify several recipients at a time;



identify specific recipients within a group (e.g. a group of maintenance engineers) that meet special

requirements, e.g. the recipient is present.

Requirements

You have defined the recipients as person in the HR master data and:





if you want a notification via e-mail, you have created the e-mail address of the person;

If  you  want  a  notification  in  the  MOC,  you  have  linked  the  user  in  the  User  administration  to  a

person of the HR master.

Field descriptions

Function

The function is the name of the function group. If function groups already exist, you can select the

group via the detail selection.

Priority

The priority defines the notification order within a function group. You can assign the same priority to

several persons within a function group.

The highest  priority  is  "1",  the  lowest priority  is  "999". The priority helps the system to deliver the

messages.

MOC_EscalationFunctionGroup.docx

Version: 1.3

Page 1 of 2

Function Groups

Personnel number

The personnel number identifies the person that should be notified.

Check console

If you have checked the option, the system will verify if the person is logged on to the client.  If the

person  is  not  logged  on,  the  system  verifies  the  person  with  the  next  priority  level.  You  use  this

setting,  if  you  do  not  use  the  "time  and  attendance"  system.  In  case  of  a  negative  result,  i.e.  the

person is not logged on to the client/console, the message is not delivered in an alternative form (text

message, e-mail...).

Example:

Three maintenance engineers work in three different shifts. If you assign within a group the same

priority to all three of them, only the engineer actually logged in to the console receives the message.

If you want to use the function "Check console", you must have entered the personnel number in the

User administration.

Check attendance

If you have checked the option "Check attendance", the system will verify, if the respective employee

is logged on to the PZE system "time and attendance" (only in connection with PZE-BP).

The  escalation  management  will  suppose  that  the  person  is  present,  if  the  following  PZE  events

occur: In, break, entrance before clocking in (with access control system ZKS).

There  is  an  AND-link  between  the  settings  "Check  console"  and  "Check  attendance".  If  both

options are checked, the person only receives messages when he or she is present AND logged

in to the console.

That is the reason why we recommend to check the option "console" OR the option "attendance".

The system cannot send a message to a function group, if no one of this group is logged in to the

console or is logged in to the PZE system "time and attendance".

In  this  case  the  escalation management  will  generate  the  event  "NO_PERSON_AVAILABLE".

You should assign a dispatcher group to this event or you should search for this event on a daily

basis in order to find cases left aside.

MOC_EscalationFunctionGroup.docx

Version: 1.3

Page 2 of 2


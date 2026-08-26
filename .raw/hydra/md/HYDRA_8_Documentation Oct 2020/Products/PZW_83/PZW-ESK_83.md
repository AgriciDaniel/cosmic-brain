Manual
Escalation Messages of PZW
PZW-ESK 8.3
Version 1.0.23191
Last changed on: 09.09.2020

Escalation Messages of PZW
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
Contents
PZW-ESK_83.docx Version: 1.0.23191 Page 2 of 37

Escalation Messages of PZW
1 PZW Escalation Messages – Overview ....................................................... 4
2 Available Escalations of the Personnel Time Management ......................... 5
2.1 Clocking error of a person (PNR.CLOCKING_FAILURE) .................................... 5
2.2 Absence created (FZ.INSERTED) ....................................................................... 7
2.3 Absence changed (FZ.UPDATED) ...................................................................... 7
2.4 Absence deleted (FZ.DELETED) ......................................................................... 8
2.5 A person joining the company (PNR.JOINING) ................................................. 10
2.6 A person leaving the company (PNR.LEAVING) ............................................... 12
2.7 A person's birthday (PNR.BIRTHDAY) .............................................................. 14
2.8 A person's company anniversary (PNR.JUBILEE) ............................................. 16
2.9 Unplanned absence (PNR.UNPLANNED_ABSENCE) ...................................... 18
2.10 End of continued pay (PNR.END_OF_CONTINUED_PAY) ........................................ 20
2.11 Escalation of PZE/PZW messages .................................................................... 21
2.11.1 Configuration in HYDRA ........................................................................ 22
2.12 Escalation for shift plan changes (personal day types, models and working
times) ................................................................................................................ 26
2.12.1 Configuration in HYDRA ........................................................................ 27
PZW-ESK_83.docx Version: 1.0.23191 Page 3 of 37

Escalation Messages of PZW
1 PZW Escalation Messages – Overview
Purpose
Application Service to generate events or to send messages in the HYDRA Personnel Time Management
(PZW).
Implementation notes
You use the function package for the following purposes:
 You want to be informed when absences are created, modified or deleted.
 You want to be informed in time when an employee joins or leaves the company or in case of a
birthday or company anniversary of an employee.
 You want to be informed before the period of continued pay ends when an employee receives
continued pay.
 You want to be informed when an employee is absent (unplanned).
Integration
If an escalation must be triggered in case of an unplanned absent employee, you must first store the
planned working time of the employee in the Personnel Time Management (function package: labor time
assessment).
Features
 Escalations of the Personnel Time Management
o Employees that arrive too late or are absent unplanned
o Information on planned absences
o Reminders when employees are joining or leaving the company, when there are
birthdays and company anniversaries of employees
o Notification before the period of continued pay ends
PZW-ESK_83.docx Version: 1.0.23191 Page 4 of 37

Escalation Messages of PZW
2 Available Escalations of the Personnel Time Management
This document describes the escalations available in PZW. If you want to activate an escalation, you
must create a configuration for this escalation.
2.1 Clocking error of a person (PNR.CLOCKING_FAILURE)
If the work day evaluation generates the error Wrong status sequence, the escalation
PNR.CLOCKING_FAILURE is generated. This escalation can be used to inform the supervisor by e-mail
or the employee on the terminal.
If the recipient type Automatic is configured in the Escalation configuration, the message is sent to the
person that is the recipient of the escalation.
Configure the notification text in tab Message:
PZW-ESK_83.docx Version: 1.0.23191 Page 5 of 37

|     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --------------------------- | --- |

In tab Notification, you can define whether the message is sent by e-mail or displayed on the PZE
terminal.
If you want to show the notifications on the terminal, the messages are cyclically transferred to the PZE
terminals with the clocking authorizations. Consequently, the messages are available on the terminal (if
the  terminal  is  online)  at  the  latest  after  the  duration  "cyclic  loading"  that  is  set  in  the  Terminal
configuration in tab HR functions. Once a message has been displayed, it is marked as read and is no
longer transferred to the terminal with the next cyclic loading interval. However, the message can be
displayed several times within one cyclic loading time.
If you have corrected a clocking error and performed the work day evaluation, the escalation is finished
and the message to be displayed on the terminal is deleted, if it has not yet been shown. At the latest
after the cyclic loading time, the message is no longer available and displayed on the terminal.
Note:
Messages can only be displayed on terminals of type CT-38x and CT-37x.
To create the message or define conditions, the following placeholders are available:
| Event                 |     | Identifiers   | Description                  |     |     |
| --------------------- | --- | ------------- | ---------------------------- | --- | --- |
| PNR.CLOCKING_FAILURE  |     | PNR.PNR       | Personnel number             |     |     |
|                       |     | STMP.ABREDAT  | Evaluation date              |     |     |
|                       |     | PNR.NAME      | Name of the person           |     |     |
|                       |     | PNR.PNAME     | Last name of the person      |     |     |
|                       |     | PNR.PVORNAME  | First name of the person     |     |     |
|                       |     | PNR.FIR       | Company of personnel number  |     |     |
|                       |     | PNR.BER       | Area of the person           |     |     |
|                       |     | PNR.KST       | Cost center of the person    |     |     |
|                       |     | PNR.ABT       | Department of the person     |     |     |
|                       |     | PNR.PKREIS    | Employee subgroup            |     |     |

The escalation is triggered in the following two cases:
-  Clock-in time, but clock-out time is missing.
|     |   -  Clock-out time, but clock-in time is missing.  |     |     |     |     |
| --- | --------------------------------------------------- | --- | --- | --- | --- |
With the escalation, you can automatically inform persons if faulty clockings were made and
have them redo clockings.

| PZW-ESK_83.docx  |     | Version: 1.0.23191  |     |     | Page 6 of 37  |
| ---------------- | --- | ------------------- | --- | --- | ------------- |

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

| 2.2  | Absence created (FZ.INSERTED)  |     |     |     |     |     |
| ---- | ------------------------------ | --- | --- | --- | --- | --- |
The escalation FZ.INSERTED is generated if an absence is created. This escalation can be used to
inform the supervisor by e-mail.
To create the message or define conditions, the following placeholders are available:
| Event        |     | Identifiers       |     | Description              |     |     |
| ------------ | --- | ----------------- | --- | ------------------------ | --- | --- |
| FZ.INSERTED  |     | FZ.FIR            |     | Company                  |     |     |
|              |     | FZ.PNR            |     | Personnel number         |     |     |
|              |     | FZ.NAME:PNR       |     | Name                     |     |     |
|              |     | FZ.PNAME          |     | Last name                |     |     |
|              |     | FZ.PVORNAME       |     | First name               |     |     |
|              |     | PNR.BER           |     | Area                     |     |     |
|              |     | PNR.KST           |     | Cost center              |     |     |
|              |     | PNR.ABT           |     | Department               |     |     |
|              |     | PNR.PKREIS        |     | Employee subgroup        |     |     |
|              |     | PNR.TAETIGKEIT    |     | Activity of the person   |     |     |
|              |     | PNR.BESCHVERH     |     | Employment relationship  |     |     |
|              |     | PNR.TEL:FIR       |     | Company phone            |     |     |
|              |     | PNR.EMAIL:FIR     |     | Company e-mail           |     |     |
|              |     | FZ.ENTLTMOD       |     | Absence payment          |     |     |
|              |     | FZ.BEZK:ENTLTMOD  |     | Absence abbreviation     |     |     |
|              |     | FZ.BEZL:ENTLTMOD  |     | Absence designation      |     |     |
|              |     | FZ.KAT            |     | Absence category         |     |     |
|              |     | FZ.DAT:APPLY      |     | Date of request          |     |     |
|              |     | FZ.ZEI:APPLY      |     | Time of request          |     |     |
|              |     | FZ.DATB           |     | Start date               |     |     |
|              |     | FZ.DATE           |     | End date                 |     |     |
|              |     | FZ.BEZL           |     | Comment                  |     |     |
|              |     | FZ.VERWEIS        |     | Unique record number     |     |     |

| 2.3  | Absence changed (FZ.UPDATED)  |     |     |     |     |     |
| ---- | ----------------------------- | --- | --- | --- | --- | --- |
The escalation FZ.UPDATED is generated if an absence is modified. This escalation can be used to
inform the supervisor by e-mail.
The escalation FZ.UPDATED is only triggered if the time or the absence payment changes
|     | when the absence of a person is changed.  |     |     |     |     |     |
| --- | ----------------------------------------- | --- | --- | --- | --- | --- |
To create the message or to define conditions, the following placeholders are available:
| Event       |     | Identifiers  |     | Description       |     |     |
| ----------- | --- | ------------ | --- | ----------------- | --- | --- |
| FZ.UPDATED  |     | FZ.FIR       |     | Company           |     |     |
|             |     | FZ.PNR       |     | Personnel number  |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 7 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------- |

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

|     |     | FZ.NAME:PNR        |     | Name                                  |     |     |
| --- | --- | ------------------ | --- | ------------------------------------- | --- | --- |
|     |     | FZ.PNAME           |     | Last name                             |     |     |
|     |     | FZ.PVORNAME        |     | First name                            |     |     |
|     |     | PNR.BER            |     | Area                                  |     |     |
|     |     | PNR.KST            |     | Cost center                           |     |     |
|     |     | PNR.ABT            |     | Department                            |     |     |
|     |     | PNR.PKREIS         |     | Employee subgroup                     |     |     |
|     |     | PNR.TAETIGKEIT     |     | Activity of the person                |     |     |
|     |     | PNR.BESCHVERH      |     | Employment relationship               |     |     |
|     |     | PNR.TEL:FIR        |     | Company phone                         |     |     |
|     |     | PNR.EMAIL:FIR      |     | Company e-mail                        |     |     |
|     |     | FZ.ENTLTMOD        |     | Absence payment                       |     |     |
|     |     | FZ.BEZK:ENTLTMOD   |     | Absence abbreviation                  |     |     |
|     |     | FZ.BEZL:ENTLTMOD   |     | Absence designation                   |     |     |
|     |     | FZ.KAT             |     | Absence category                      |     |     |
|     |     | FZ.DAT:APPLY       |     | Date of request                       |     |     |
|     |     | FZ.ZEI:APPLY       |     | Time of request                       |     |     |
|     |     | FZ.DATB            |     | Start date                            |     |     |
|     |     | FZ.DATE            |     | End date                              |     |     |
|     |     | FZ.BEZL            |     | Comment                               |     |     |
|     |     | FZ.VERWEIS         |     | Unique record number                  |     |     |
|     |     | FZ.ENTLTMODV       |     | Previous absence payment              |     |     |
|     |     | FZ.BEZK:ENTLTMODV  |     | Previous abbreviation of the absence  |     |     |
|     |     | FZ.BEZL:ENTLTMODV  |     | Previous absence designation          |     |     |
|     |     | FZ.KATV            |     | Previous absence category             |     |     |
|     |     | FZ.DATBV           |     | Previous start date                   |     |     |
|     |     | FZ.DATEV           |     | Previous end date                     |     |     |

| 2.4  | Absence deleted (FZ.DELETED)  |     |     |     |     |     |
| ---- | ----------------------------- | --- | --- | --- | --- | --- |
The escalation FZ.DELETED is generated if an absence is deleted. This escalation can be used to inform
the supervisor by e-mail.
To create the message or define conditions, the following placeholders are available:
| Event       |     | Identifiers     |     | Description              |     |     |
| ----------- | --- | --------------- | --- | ------------------------ | --- | --- |
| FZ.DELETED  |     | FZ.FIR          |     | Company                  |     |     |
|             |     | FZ.PNR          |     | Personnel number         |     |     |
|             |     | FZ.NAME:PNR     |     | Name                     |     |     |
|             |     | FZ.PNAME        |     | Last name                |     |     |
|             |     | FZ.PVORNAME     |     | First name               |     |     |
|             |     | PNR.BER         |     | Area                     |     |     |
|             |     | PNR.KST         |     | Cost center              |     |     |
|             |     | PNR.ABT         |     | Department               |     |     |
|             |     | PNR.PKREIS      |     | Employee subgroup        |     |     |
|             |     | PNR.TAETIGKEIT  |     | Activity of the person   |     |     |
|             |     | PNR.BESCHVERH   |     | Employment relationship  |     |     |
|             |     | PNR.TEL:FIR     |     | Company phone            |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 8 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------- |

Escalation Messages of PZW
PNR.EMAIL:FIR Company e-mail
FZ.ENTLTMOD Absence payment
FZ.BEZK:ENTLTMOD Absence abbreviation
FZ.BEZL:ENTLTMOD Absence designation
FZ.KAT Absence category
FZ.DAT:APPLY Date of request
FZ.ZEI:APPLY Time of request
FZ.DATB Start date
FZ.DATE End date
FZ.BEZL Comment
FZ.VERWEIS Unique record number
PZW-ESK_83.docx Version: 1.0.23191 Page 9 of 37

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

| 2.5  | A person joining the company (PNR.JOINING)  |     |     |     |     |     |
| ---- | ------------------------------------------- | --- | --- | --- | --- | --- |
The escalation PNR.JOINING is generated daily up to 50 days before the person is joining the company.
Using the variable PNR.DAUER_EINTRITT, you can use a condition to specify how many days the
notification is made before the person is joining the company:

In this example, the message informing about a person joining the company is generated 14 days before
the date of joining.
To create the message or define conditions, the following placeholders are available:
| Event        |     | Identifiers   |     | Description       |     |     |
| ------------ | --- | ------------- | --- | ----------------- | --- | --- |
| PNR.JOINING  |     | PNR.FIR       |     | Company           |     |     |
|              |     | PNR.PNR       |     | Personnel number  |     |     |
|              |     | PNR.NAME:PNR  |     | Name              |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 10 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

Escalation Messages of PZW
PNR.PNAME Last name
PNR.PVORNAME First name
PNR.BER Area
PNR.KST Cost center
PNR.ABT Department
PNR.PKREIS Employee subgroup
PNR.TAETIGKEIT Activity of the person
PNR.BESCHVERH Employment relationship
PNR.TEL:FIR Company phone
PNR.EMAIL:FIR Company e-mail
PNR.EINTRITT Date of joining
PNR.DAUER_EINTRITT Number of days before date of joining
PNR.VGS:PNR Personnel number of supervisor
PNR.VGS:FIR Company of supervisor
You can also use this escalation without the Personnel Time Management because the
escalation is not triggered by the labor time calculation. The escalations are triggered by a
cyclic process (scheduler), which is performed independent of the labor time calculation.
PZW-ESK_83.docx Version: 1.0.23191 Page 11 of 37

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

| 2.6  | A person leaving the company (PNR.LEAVING)  |     |     |     |     |     |
| ---- | ------------------------------------------- | --- | --- | --- | --- | --- |
The escalation PNR.LEAVING is generated on a daily basis up to 50 days before the person is leaving
the company. The variable PNR.DAUER_AUSTRITT can be set in the condition wizard. This variable
specifies how many days the message is displayed before the date of leaving:

In this example the message informing about a person leaving the company is generated 30 days before
the date of leaving.
To create the message or define conditions, the following placeholders are available:
| Event        |     | Identifiers   |     | Description       |     |     |
| ------------ | --- | ------------- | --- | ----------------- | --- | --- |
| PNR.LEAVING  |     | PNR.FIR       |     | Company           |     |     |
|              |     | PNR.PNR       |     | Personnel number  |     |     |
|              |     | PNR.NAME:PNR  |     | Name              |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 12 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

Escalation Messages of PZW
PNR.PNAME Last name
PNR.PVORNAME First name
PNR.BER Area
PNR.KST Cost center
PNR.ABT Department
PNR.PKREIS Employee subgroup
PNR.TAETIGKEIT Activity of the person
PNR.BESCHVERH Employment relationship
PNR.TEL:FIR Company phone
PNR.EMAIL:FIR Company e-mail
PNR.AUSTRITT Date of leaving
PNR.DAUER_AUSTRITT Number of days until date of leaving
PNR.VGS:PNR Personnel number of supervisor
PNR.VGS:FIR Company of supervisor
You can also use this escalation without the Personnel Time Management because the
escalation is not triggered by the labor time calculation. The escalations are triggered by a
cyclic process (scheduler), which is performed independent of the labor time calculation.
PZW-ESK_83.docx Version: 1.0.23191 Page 13 of 37

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

| 2.7  | A person's birthday (PNR.BIRTHDAY)  |     |     |     |     |     |
| ---- | ----------------------------------- | --- | --- | --- | --- | --- |
The escalation PNR.BIRTHDAY is generated on a daily basis up to 50 days before a person's birthday.
The variable PNR.DAUER_GEBDAT can be set in the condition wizard and defines how many days
before the birthday the message is displayed:

In this example, the message informing about the person's birthday is generated on the day of the
birthday if it is a milestone birthday that can be divided by 5 or 10.
To create the message or define conditions, the following placeholders are available:
| Event         |     | Identifiers   |     | Description       |     |     |
| ------------- | --- | ------------- | --- | ----------------- | --- | --- |
| PNR.BIRTHDAY  |     | PNR.FIR       |     | Company           |     |     |
|               |     | PNR.PNR       |     | Personnel number  |     |     |
|               |     | PNR.NAME:PNR  |     | Name              |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 14 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

Escalation Messages of PZW
PNR.PNAME Last name
PNR.PVORNAME First name
PNR.BER Area
PNR.KST Cost center
PNR.ABT Department
PNR.PKREIS Employee subgroup
PNR.TAETIGKEIT Activity of the person
PNR.BESCHVERH Employment relationship
PNR.TEL:FIR Company phone
PNR.EMAIL:FIR Company e-mail
PNR.GEBTG Date of the next birthday
PNR.GEBDAT Date of birth
PNR.DAUER_GEBDAT Number of days until birthday
PNR.GEBDAT:RUND Milestone birthdays:
10 = birthday can be divided by 10
5 = birthday can be divided by 5
1 = no milestone birthday
PNR.ALTER Age in years
PNR.VGS:PNR Personnel number of supervisor
PNR.VGS:FIR Company of supervisor
You can also use this escalation without the Personnel Time Management because the
escalation is not triggered by the labor time calculation. The escalations are triggered by a
cyclic process (scheduler), which is performed independent of the labor time calculation.
PZW-ESK_83.docx Version: 1.0.23191 Page 15 of 37

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

| 2.8  | A person's company anniversary (PNR.JUBILEE)  |     |     |     |     |     |
| ---- | --------------------------------------------- | --- | --- | --- | --- | --- |
The escalation PNR.JUBILEE is generated on a daily basis up to 50 days before the person's company
anniversary. The variable PNR.DAUER_JUBIDAT can be set in the condition wizard. This variable
defines how many days before the anniversary the message is displayed:

In this example, the message informing about the person's company anniversary is generated 14 days
before the date if it is a milestone anniversary that can be divided by 10.
To create the message or define conditions, the following placeholders are available:
| Event        |     | Identifiers   |     | Description       |     |     |
| ------------ | --- | ------------- | --- | ----------------- | --- | --- |
| PNR.JUBILEE  |     | PNR.FIR       |     | Company           |     |     |
|              |     | PNR.PNR       |     | Personnel number  |     |     |
|              |     | PNR.NAME:PNR  |     | Name              |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 16 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

Escalation Messages of PZW
PNR.PNAME Last name
PNR.PVORNAME First name
PNR.BER Area
PNR.KST Cost center
PNR.ABT Department
PNR.PKREIS Employee subgroup
PNR.TAETIGKEIT Activity of the person
PNR.BESCHVERH Employment relationship
PNR.TEL:FIR Company phone
PNR.EMAIL:FIR Company e-mail
PNR.EINTRITT Date of joining
PNR.JUBIDAT Date of company anniversary
PNR.DAUER_JUBIDAT Number of days until anniversary
PNR.JUBIDAT:RUND Milestone company anniversary:
10 = anniversary can be divided by 10
5 = anniversary can be divided by 5
1 = no milestone anniversary
PNR.JUBI Company anniversary in years
PNR.VGS:PNR Personnel number of supervisor
PNR.VGS:FIR Company of supervisor
You can also use this escalation without the Personnel Time Management because the
escalation is not triggered by the labor time calculation. The escalations are triggered by a
cyclic process (scheduler), which is performed independent of the labor time calculation.
PZW-ESK_83.docx Version: 1.0.23191 Page 17 of 37

Escalation Messages of PZW
2.9 Unplanned absence (PNR.UNPLANNED_ABSENCE)
The escalation PNR.UNPLANNED_ABSENCE informs that an employee is absent unplanned. Using this
escalation, a supervisor can be informed shortly after start of shift that an employee planned for the shift
is not present (or has forgotten to clock-in).
This escalation is cyclically processed. In the Escalation Configuration, you can configure the
cycle time used to identify absent employees. Note: a cycle time of some minutes only can cause a high
system load.
You can set the variable PNR.ABWDAU in the condition wizard. This variable defines how long the
person must at least be absent unplanned before the escalation is triggered:
In this example, the escalation is only triggered if the employee is absent (unplanned) for at least 30
minutes (1800 seconds).
PZW-ESK_83.docx Version: 1.0.23191 Page 18 of 37

|     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --------------------------- | --- |

To create the message or define conditions, the following placeholders are available:
| Event                  |     | Identifiers     | Description                              |     |     |
| ---------------------- | --- | --------------- | ---------------------------------------- | --- | --- |
| PNR.UNPLANNED_ABSENCE  |     | PNR.FIR         | Company                                  |     |     |
|                        |     | PNR.PNR         | Personnel number                         |     |     |
|                        |     | PNR.NAME:PNR    | Name                                     |     |     |
|                        |     | PNR.PNAME       | Last name                                |     |     |
|                        |     | PNR.PVORNAME    | First name                               |     |     |
|                        |     | PNR.BER         | Area                                     |     |     |
|                        |     | PNR.KST         | Cost center                              |     |     |
|                        |     | PNR.ABT         | Department                               |     |     |
|                        |     | PNR.PKREIS      | Employee subgroup                        |     |     |
|                        |     | PNR.TAETIGKEIT  | Activity of the person                   |     |     |
|                        |     | PNR.BESCHVERH   | Employment relationship                  |     |     |
|                        |     | PNR.TEL:FIR     | Company phone                            |     |     |
|                        |     | PNR.EMAIL:FIR   | Company e-mail                           |     |     |
|                        |     | PNR.ABWDAT      | Start date of unplanned absence          |     |     |
|                        |     | PNR.ABWZEI      | Start time of unplanned absence          |     |     |
|                        |     | PNR.ABWDAU      | Duration of unplanned absence up to now  |     |     |
|                        |     | PNR.ANW         | J = Person was present before            |     |     |
N = Person was not present before
|     |     | PNR.VGS:PNR  | Personnel number of supervisor  |     |     |
| --- | --- | ------------ | ------------------------------- | --- | --- |
|     |     | PNR.VGS:FIR  | Company of supervisor           |     |     |

The escalation is triggered, when no attendance time is available on a day with a target time
stored for a person. Also subsequent clockings, which are not approved by the supervisor, will

therefore trigger this escalation.

| PZW-ESK_83.docx  |     | Version: 1.0.23191  |     |     | Page 19 of 37  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

Escalation Messages of PZW
2.10 End of continued pay (PNR.END_OF_CONTINUED_PAY)
The escalation PNR.END_OF_CONTINUED_PAY is generated on a daily basis up to 50 days before the
end of a person's continued pay. The variable PNR.DAUER_OLFZ can be set in the condition wizard.
This variable defines how many days before the end of the continued pay the message is displayed:
In this example, the message informing about a person is generated 14 days before the end of the
continued pay. If you use the operator "<=“ (less than or equal to), the message is also generated if the
end of the continued pay is reached in less than 14 days, e.g. because of a short-term planning. As a
result, the escalation is also generated on the next day if you have finished the escalation before the end
of the continued pay. The escalation management creates this escalation on a daily basis, if the
escalation is not available for the person and the end date of the continued pay. If you use the operator
"=", the escalation is not generated several times. But the message is also not generated if the end of the
continued pay is less than 14 days in the future, e.g. when a pre-existing illness is assigned in this period.
PZW-ESK_83.docx Version: 1.0.23191 Page 20 of 37

Escalation Messages of PZW
To create the message or define conditions, the following placeholders are available:
Event Identifiers Description
PNR.END_OF_CONTINUED_PAY PNR.FIR Company
PNR.PNR Personnel number
PNR.NAME:PNR Name
PNR.PNAME Last name
PNR.PVORNAME First name
PNR.BER Area
PNR.KST Cost center
PNR.ABT Department
PNR.PKREIS Employee subgroup
PNR.TAETIGKEIT Activity of the person
PNR.BESCHVERH Employment relationship
PNR.TEL:FIR Company phone
PNR.EMAIL:FIR Company e-mail
PNR.DATE_LFZ End of continued pay
PNR.DATB_OLFZ First day without continued pay
PNR.DAUER_OLFZ Number of days until continued pay ends
PNR.VGS:PNR Personnel number of supervisor
PNR.VGS:FIR Company of supervisor
The escalation is triggered if an absence with a subsequent payment has been planned for a
person and if the subsequent payment is due because the period of continued pay has
exceeded. Use the variable PNR.DAUER_OLFZ to control when the escalation is triggered:
number of days before the planned subsequent payment is due.
2.11 Escalation of PZE/PZW messages
General
You can trigger PNR.TIMESYSTEM_MESSAGE escalations when specified messages of the Personnel
Time Management occur. The system can process messages of the Labor time calculation and of the
Monthly evaluation.
The escalations can be used to inform the supervisor by e-mail or the employee on the terminal.
If the recipient type Automatic is configured in the Escalation configuration, the message is sent to the
person that is the recipient of the escalation.
PZW-ESK_83.docx Version: 1.0.23191 Page 21 of 37

Escalation Messages of PZW
2.11.1 Configuration in HYDRA
When you configure the escalation in the Escalation configuration, you can set Conditions for the
messages to control the escalations for the separate messages and to configure a good text for the
specified message:
The screenshot above shows the condition of the message 61 for account number 1 (the account XX was
limited from XXX to XXX):
MELD.MELDNR==61 and MELD.N2==1
The text of the notification can be configured in tab Message: The example shows the message of an
output:
Neg. flexaccount person 906000 Schulz, Paul: -10.233
flexaccount limited from -59:52 to -34:52.
Find below a detailed list of all parameters that are available for the condition and the message.
PZW-ESK_83.docx Version: 1.0.23191 Page 22 of 37

Escalation Messages of PZW
Notes on the formatting of times and dates
Date
You must insert the date variables with formatting instruction to get an output in German format. Example:
%DAT date dd.mm.yy%
Durations and times
HYDRA internally processes durations and times in seconds and provides this value also for conditions
and messages. To show these values as hours/minutes, you must also use a formatting instruction.
Examples:
%MELD.N1 time vh:mm%
(formatting as duration/time in normal time, the "v" stands for the algebraic sign)
%MELD.N1 time vh,ii%
(formatting as duration/time in industrial minutes, the "v" stands for the algebraic sign)
If you use the letter "h" with several places, you can configure leading zeros:
%MELD.N1 time vhhh:mm%
In tab Notification, you can define whether the message is sent by e-mail or displayed on the PZE
terminal.
If you want to show the notifications on the terminal, the messages are cyclically transferred to the PZE
terminals with the clocking authorizations. Consequently, the messages are available on the terminal (if
the terminal is online) at the latest after the duration Cyclic loading that is set in the Terminal configuration
in tab HR functions. Once a message has been displayed, it is marked as read and is no longer
transferred to the terminal with the next cyclic loading interval. However, the message can be displayed
several times within one cyclic loading time.
If the cause of the message is eliminated and the labor time calculation or the monthly evaluation is
performed a new time, then the escalation is finished and the message to be displayed on the terminal is
deleted if it has not yet been shown. At the latest after the cyclic loading time, the message is no longer
available and displayed on the terminal.
Note:
Messages can only be displayed on terminals of type CT-38x and CT-37x.
To create the message or define conditions, the following placeholders are available:
Event Identifiers Description
PZW-ESK_83.docx Version: 1.0.23191 Page 23 of 37

|     |     |     |     |     | Escalation Messages of PZW  |     |     |
| --- | --- | --- | --- | --- | --------------------------- | --- | --- |

| Event                   |     | Identifiers  |     | Description                        |     |     |     |
| ----------------------- | --- | ------------ | --- | ---------------------------------- | --- | --- | --- |
| PNR.TIMESYSTEM_MESSAGE  |     | MELD.DAT     |     | Date of message                    |     |     |     |
|                         |     | MELD.MELDNR  |     | Message number. Available message  |     |     |     |
numbers see below.
|     |     | MELD.N1  |     | Numeric  parameter  | 1.       | Availability  | and      |
| --- | --- | -------- | --- | ------------------- | -------- | ------------- | -------- |
|     |     |          |     | meaning  depend     | on  the  | message       | number.  |
See below.
|     |     | MELD.N2  |     | Numeric  parameter  | 2.       | Availability  | and      |
| --- | --- | -------- | --- | ------------------- | -------- | ------------- | -------- |
|     |     |          |     | meaning  depend     | on  the  | message       | number.  |
See below.
|     |     | MELD.N3  |     | Numeric  parameter  | 3.       | Availability  | and      |
| --- | --- | -------- | --- | ------------------- | -------- | ------------- | -------- |
|     |     |          |     | meaning  depend     | on  the  | message       | number.  |
See below.
|     |     | MELD.F1  |     | Decimal  parameter  | 1.       | Availability  | and      |
| --- | --- | -------- | --- | ------------------- | -------- | ------------- | -------- |
|     |     |          |     | meaning  depend     | on  the  | message       | number.  |
See below.
|     |     | MELD.F2  |     | Decimal  parameter  | 2.       | Availability  | and      |
| --- | --- | -------- | --- | ------------------- | -------- | ------------- | -------- |
|     |     |          |     | meaning  depend     | on  the  | message       | number.  |
See below.
|     |     | MELD.F3  |     | Decimal  parameter  | 3.       | Availability  | and      |
| --- | --- | -------- | --- | ------------------- | -------- | ------------- | -------- |
|     |     |          |     | meaning  depend     | on  the  | message       | number.  |
See below.
|     |     | MELD.D1  |     | Date  parameter.  | Availability  | and  | meaning  |
| --- | --- | -------- | --- | ----------------- | ------------- | ---- | -------- |
depend on the message number. See below.
|     |     | MELD.T1  |     | Text parameter 1. Availability and meaning  |     |     |     |
| --- | --- | -------- | --- | ------------------------------------------- | --- | --- | --- |
depend on the message number. See below.
|     |     | MELD.STUFE  |     | "*": The message informs about an error.  |     |     |     |
| --- | --- | ----------- | --- | ----------------------------------------- | --- | --- | --- |
"C": The message informs about a posting
that requires approval.
Other: It is an information message.
|     |     | MELD.VERWEIS    |     | Unique data record number of message   |                         |     |          |
| --- | --- | --------------- | --- | -------------------------------------- | ----------------------- | --- | -------- |
|     |     | PNR.PNR         |     | Personnel number                       |                         |     |          |
|     |     | PNR.NAME        |     | Name of person (first and last name)   |                         |     |          |
|     |     | PNR.PNAME       |     | Last name                              |                         |     |          |
|     |     | PNR.PVNAME      |     | First name                             |                         |     |          |
|     |     | PNR.FIR         |     | Company of the person                  |                         |     |          |
|     |     | PNR.BER         |     | Area of the person                     |                         |     |          |
|     |     | PNR.KST         |     | Cost center of the person              |                         |     |          |
|     |     | PNR.ABT         |     | Department of the person               |                         |     |          |
|     |     | PNR.PKREIS      |     | Employee subgroup                      |                         |     |          |
|     |     | PNR.TAETIGKEIT  |     | Activity of the person                 |                         |     |          |
|     |     | PNR.BESCHVERH   |     | Employment relationship of the person  |                         |     |          |
|     |     | PNR.TEL:FIR     |     | Telephone number (company)             |                         |     |          |
|     |     | PNR.EMAIL:FIR   |     | E-mail address (company)               |                         |     |          |
|     |     | PNR.PNR:VGS     |     | Personnel                              | number  of  supervisor  |     | of  the  |
person

| PZW-ESK_83.docx  |     | Version: 1.0.23191  |     |     |     | Page 24 of 37  |     |
| ---------------- | --- | ------------------- | --- | --- | --- | -------------- | --- |

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

| Event  |     | Identifiers  |     | Description                |                      |            |
| ------ | --- | ------------ | --- | -------------------------- | -------------------- | ---------- |
|        |     | KEY_1        |     | Used internally by HYDRA:  |                      |            |
|        |     | KEY_2        |     | Combined                   | keys  to  guarantee  | a  unique  |
assignment of a message to the escalation
KEY_3
KEY_4

Message numbers and available parameters
The parameters F1 to F3 are equivalent to the parameters N1 to N3 and  include the same value
converted in hours or days as floating point number.
| No.  Posting                            |     |     | Parameter  |     | Content  |     |
| --------------------------------------- | --- | --- | ---------- | --- | -------- | --- |
| 1  Shift type not in shift day type     |     |     |            | -   | -        |     |
| 2  No valid payment day type found      |     |     |            | -   | -        |     |
| 3  No valid shift or flextime day type  |     |     |            | -   | -        |     |
4  Wrong status sequence  N1/F1  Clock-in time, but clock-out time is
missing
|     |     |     |     | N2/F2  | Clock-out time, but clock-in time is  |     |
| --- | --- | --- | --- | ------ | ------------------------------------- | --- |
missing
5  Previous evaluation of ??.??.???? not ok.  D1  Date when the evaluation is not ok
8  Absence payment: ??? ??????  N1  Number of the absence payment
|                                       |     |     |     | T1     | Name of absence payment                |     |
| ------------------------------------- | --- | --- | --- | ------ | -------------------------------------- | --- |
| 10  Several clocking-ins exist        |     |     |     | -      | -                                      |     |
| 11  Target time has not been reached  |     |     |     | N1/F1  | Working time                           |     |
|                                       |     |     |     | N2/F2  | Target time                            |     |
|                                       |     |     |     | N3/F3  | Difference target time - working time  |     |
| 12  Clock-IN too late                 |     |     |     | N1/F1  | Clock-in time                          |     |
|                                       |     |     |     | N2/F2  | Target start                           |     |
|                                       |     |     |     | N3/F2  | Difference actual - target             |     |
| 13  Clock-OUT too early               |     |     |     | N1/F1  | Clock-in time                          |     |
|                                       |     |     |     | N2/F2  | Target end                             |     |
|                                       |     |     |     | N3/F2  | Difference target - actual             |     |
14  Present although absence planned  N1  Number of the actually planned
absence payment
| 17  Max. working time exceeded  |     |     |     | N1/F1  | Working time                       |     |
| ------------------------------- | --- | --- | --- | ------ | ---------------------------------- | --- |
|                                 |     |     |     | N2/F2  | Maximum working time               |     |
|                                 |     |     |     | N3/F3  | Difference working time - maximum  |     |
time
19  Please authorize wage type posting  N1/F1  Start of wage type postings that
require authorization
|     |     |     |     | N2/F2  | End of wage type postings that  |     |
| --- | --- | --- | --- | ------ | ------------------------------- | --- |
require authorization
|     |     |     |     | N3/F3  | Duration of wage type postings that  |     |
| --- | --- | --- | --- | ------ | ------------------------------------ | --- |
require authorization

| PZW-ESK_83.docx  |     | Version: 1.0.23191  |     |     |     | Page 25 of 37  |
| ---------------- | --- | ------------------- | --- | --- | --- | -------------- |

|     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --------------------------- | --- |

|                                           |     |     | T1  | Wage type  |     |
| ----------------------------------------- | --- | --- | --- | ---------- | --- |
| 20  Absent although working time planned  |     |     | -   | -          |     |
22  Locked by application ??? on MOC ??? when day  T1  Abbreviation of application
evaluation was performed.
23  Locked by application ??? on MOC ??? when  T1  Abbreviation of application
wage type posting was performed.
24  Monthly evaluation / Please authorize wage type  N1/F1  Start of wage type postings that
| posting  |     |     |        | require authorization           |     |
| -------- | --- | --- | ------ | ------------------------------- | --- |
|          |     |     | N2/F2  | End of wage type postings that  |     |
require authorization
25  Locked by application ??? on MOC ??? when  T1  Abbreviation of program
monthly evaluation was performed.
| 28  Violation of rest period  |     |     | N1/F1  | Actual rest period          |     |
| ----------------------------- | --- | --- | ------ | --------------------------- | --- |
|                               |     |     | N2/F2  | Target rest period          |     |
|                               |     |     | N3/F3  | Difference target - actual  |     |
| 29  Core time violation       |     |     | N1/F1  | Time from                   |     |
|                               |     |     | N2/F2  | Time to                     |     |
|                               |     |     | N3/F3  | Duration                    |     |
51  Negative account 1             -???:??:??  N1/F1  Account balance
To  To
|     |     |     | N2  | Account number  |     |
| --- | --- | --- | --- | --------------- | --- |
58  Negative account 8             -???:??:??
|     |     |     | T1  | Name of the account  |     |
| --- | --- | --- | --- | -------------------- | --- |
61  Account 1 has been limited from ???:?? to ???:??  N1/F1  Account balance before limitation
To  To
|     |     |     | N2  | Account number  |     |
| --- | --- | --- | --- | --------------- | --- |
68  Account 8 has been limited from ???:?? to ???:??
|     |     |     | T1  | Name of the account  |     |
| --- | --- | --- | --- | -------------------- | --- |
90  The overtime period on the ??.??.???? is missing  T1  Company
for company ???
|     |     |     | D1  | Date  |     |
| --- | --- | --- | --- | ----- | --- |
91  The month period for year ???? is missing for  T1  Company
| company ??? Period ??  |     |     | D1  | Date  |     |
| ---------------------- | --- | --- | --- | ----- | --- |
2.12  Escalation for shift plan changes (personal day types,
models and working times)
General
You can change the shift plan and the planned working times using the functions Personal day types,
Personal models and Personal working time. You can use the escalations PTYP.*, PMOD.* and PAZ.* to
inform the employees and supervisors about the changes of the shift plan.
For the 3 functions, the application provides 3 escalations each when a planning is created, changed and
deleted.

| PZW-ESK_83.docx  |     | Version: 1.0.23191  |     |     | Page 26 of 37  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

| 2.12.1    | Configuration in HYDRA                     |     |     |     |     |     |
| --------- | ------------------------------------------ | --- | --- | --- | --- | --- |
| 2.12.1.1  | Personal day type created (PTYP.INSERTED)  |     |     |     |     |     |
The  escalation  PTYP.INSERTED  is  generated  when  a  Personal  day  type  has  been  created.  This
escalation can be used to inform the employee on the PZE terminal, for example.
To create the message or define conditions, the following placeholders are available:
| Event          |     | Identifiers     |     | Description                                   |     |     |
| -------------- | --- | --------------- | --- | --------------------------------------------- | --- | --- |
| PTYP.INSERTED  |     | PNR.FIR         |     | Company                                       |     |     |
|                |     | PNR.PNR         |     | Personnel number                              |     |     |
|                |     | PNR.NAME:PNR    |     | Name                                          |     |     |
|                |     | PNR.PNAME       |     | Last name                                     |     |     |
|                |     | PNR.PVORNAME    |     | First name                                    |     |     |
|                |     | PNR.BER         |     | Area                                          |     |     |
|                |     | PNR.KST         |     | Cost center                                   |     |     |
|                |     | PNR.ABT         |     | Department                                    |     |     |
|                |     | PNR.PKREIS      |     | Employee subgroup                             |     |     |
|                |     | PNR.TAETIGKEIT  |     | Activity of the person                        |     |     |
|                |     | PNR.BESCHVERH   |     | Employment relationship                       |     |     |
|                |     | PNR.TEL:FIR     |     | Company phone                                 |     |     |
|                |     | PNR.EMAIL:FIR   |     | Company e-mail                                |     |     |
|                |     | PNR.VGS:PNR     |     | Personnel number of supervisor                |     |     |
|                |     | PTYP.DATB       |     | Start date                                    |     |     |
|                |     | PTYP.DATE       |     | End date                                      |     |     |
|                |     | PTYP.GUELT      |     | V=The Personal day type is completely in the  |     |     |
past
H=The Personal day type is valid on the
current day or on future days
Z=The Personal day type is only valid on future
days
|     |     | PTYP.WTG  |     | Week day:   |     |     |
| --- | --- | --------- | --- | ----------- | --- | --- |
MON=Monday
TUE=Tuesday
WED=Wednesday
THU=Thursday
FRI=Friday
SAT=Saturday
SUN=Sunday
ALL=All weekdays
|     |     | PTYP.GLZTMOD        |     | Working time day type               |     |     |
| --- | --- | ------------------- | --- | ----------------------------------- | --- | --- |
|     |     | PTYP.BEZ:GLZTMOD    |     | Name of the working time day type   |     |     |
|     |     | PTYP.SCHZART        |     | Shift type                          |     |     |
|     |     | PTYP.ENTLTMOD       |     | Payment day type                    |     |     |
|     |     | PTYP.BEZK:ENTLTMOD  |     | Short name of the payment day type  |     |     |
|     |     | PTYP.BEZ:ENTLTMOD   |     | Name of the payment day type        |     |     |
|     |     | PTYP.BEM            |     | Comment                             |     |     |
|     |     | PTYP.VERWEIS        |     | Unique record number                |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 27 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

| 2.12.1.2  | Personal day type changed (PTYP.UPDATED)  |     |     |     |     |     |
| --------- | ----------------------------------------- | --- | --- | --- | --- | --- |
The escalation  PTYP.UPDATED  is generated  when a Personal day type has been changed. This
escalation can be used to inform the employee on the PZE terminal, for example.
To create the message or define conditions, the following placeholders are available:
| Event         |     | Identifiers     |     | Description                                |     |     |
| ------------- | --- | --------------- | --- | ------------------------------------------ | --- | --- |
| PTYP.UPDATED  |     | PNR.FIR         |     | Company                                    |     |     |
|               |     | PNR.PNR         |     | Personnel number                           |     |     |
|               |     | PNR.NAME:PNR    |     | Name                                       |     |     |
|               |     | PNR.PNAME       |     | Last name                                  |     |     |
|               |     | PNR.PVORNAME    |     | First name                                 |     |     |
|               |     | PNR.BER         |     | Area                                       |     |     |
|               |     | PNR.KST         |     | Cost center                                |     |     |
|               |     | PNR.ABT         |     | Department                                 |     |     |
|               |     | PNR.PKREIS      |     | Employee subgroup                          |     |     |
|               |     | PNR.TAETIGKEIT  |     | Activity of the person                     |     |     |
|               |     | PNR.BESCHVERH   |     | Employment relationship                    |     |     |
|               |     | PNR.TEL:FIR     |     | Company phone                              |     |     |
|               |     | PNR.EMAIL:FIR   |     | Company e-mail                             |     |     |
|               |     | PNR.VGS:PNR     |     | Personnel number of supervisor             |     |     |
|               |     | PTYP.DATBV      |     | Previous start date                        |     |     |
|               |     | PTYP.DATEV      |     | Previous end date                          |     |     |
|               |     | PTYP.DATB       |     | Start date                                 |     |     |
|               |     | PTYP.DATE       |     | End date                                   |     |     |
|               |     | PTYP.GUELT      |     | V=The Personal day type was completely in  |     |     |
the past before and after the change
H=The Personal day type was or is valid on
the current day or on future days
Z=The Personal day type was or is only valid
on future days
|     |     | PTYP.WTGV  |     | Previous week day:   |     |     |
| --- | --- | ---------- | --- | -------------------- | --- | --- |
MON=Monday
TUE=Tuesday
WED=Wednesday
THU=Thursday
FRI=Friday
SAT=Saturday
SUN=Sunday
ALL=All weekdays
|     |     | PTYP.WTG  |     | Week day:   |     |     |
| --- | --- | --------- | --- | ----------- | --- | --- |
MON=Monday
TUE=Tuesday
WED=Wednesday
THU=Thursday
FRI=Friday
SAT=Saturday
SUN=Sunday
ALL=All weekdays

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 28 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

|     |     | PTYP.GLZTMODV  |     | Previous working time day type  |     |     |
| --- | --- | -------------- | --- | ------------------------------- | --- | --- |
PTYP.BEZ:GLZTMODV  Name of the previous working time day type
|     |     | PTYP.GLZTMOD      |     | Working time day type              |     |     |
| --- | --- | ----------------- | --- | ---------------------------------- | --- | --- |
|     |     | PTYP.BEZ:GLZTMOD  |     | Name of the working time day type  |     |     |
|     |     | PTYP.SCHZARTV     |     | Previous shift type                |     |     |
|     |     | PTYP.SCHZART      |     | Shift type                         |     |     |
|     |     | PTYP.ENTLTMODV    |     | Previous payment day type          |     |     |
PTYP.BEZK:ENTLTMODV  Short name of the previous payment day type
|     |     | PTYP.BEZ:ENTLTMODV  |     | Name of the previous payment day type  |     |     |
| --- | --- | ------------------- | --- | -------------------------------------- | --- | --- |
|     |     | PTYP.ENTLTMOD       |     | Payment day type                       |     |     |
|     |     | PTYP.BEZK:ENTLTMOD  |     | Short name of the payment day type     |     |     |
|     |     | PTYP.BEZ:ENTLTMOD   |     | Name of the payment day type           |     |     |
|     |     | PTYP.BEMV           |     | Previous comment                       |     |     |
|     |     | PTYP.BEM            |     | Comment                                |     |     |
|     |     | PTYP.VERWEIS        |     | Unique record number                   |     |     |

The fields that include the previous value of a field always refer to the value that the field
contained before the personal day type has been changed.

| 2.12.1.3  | Personal day type deleted (PTYP.DELETED)  |     |     |     |     |     |
| --------- | ----------------------------------------- | --- | --- | --- | --- | --- |
The  escalation  PTYP.DELETED  is  generated  when  a  Personal  day  type  has  been  deleted.  This
escalation can be used to inform the employee on the PZE terminal, for example.
To create the message or define conditions, the following placeholders are available:
| Event         |     | Identifiers     |     | Description                     |     |     |
| ------------- | --- | --------------- | --- | ------------------------------- | --- | --- |
| PTYP.DELETED  |     | PNR.FIR         |     | Company                         |     |     |
|               |     | PNR.PNR         |     | Personnel number                |     |     |
|               |     | PNR.NAME:PNR    |     | Name                            |     |     |
|               |     | PNR.PNAME       |     | Last name                       |     |     |
|               |     | PNR.PVORNAME    |     | First name                      |     |     |
|               |     | PNR.BER         |     | Area                            |     |     |
|               |     | PNR.KST         |     | Cost center                     |     |     |
|               |     | PNR.ABT         |     | Department                      |     |     |
|               |     | PNR.PKREIS      |     | Employee subgroup               |     |     |
|               |     | PNR.TAETIGKEIT  |     | Activity of the person          |     |     |
|               |     | PNR.BESCHVERH   |     | Employment relationship         |     |     |
|               |     | PNR.TEL:FIR     |     | Company phone                   |     |     |
|               |     | PNR.EMAIL:FIR   |     | Company e-mail                  |     |     |
|               |     | PNR.VGS:PNR     |     | Personnel number of supervisor  |     |     |
|               |     | PTYP.DATB       |     | Start date                      |     |     |
|               |     | PTYP.DATE       |     | End date                        |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 29 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

|     |     | PTYP.GUELT  |     | V=The Personal day type was completely in the  |     |     |
| --- | --- | ----------- | --- | ---------------------------------------------- | --- | --- |
past
H=The Personal day type was valid on the
current day or on future days
Z=The Personal day type was only valid on
future days
|     |     | PTYP.WTG  |     | Week day:   |     |     |
| --- | --- | --------- | --- | ----------- | --- | --- |
MON=Monday
TUE=Tuesday
WED=Wednesday
THU=Thursday
FRI=Friday
SAT=Saturday
SUN=Sunday
ALL=All weekdays
|     |     | PTYP.GLZTMOD        |     | Working time day type               |     |     |
| --- | --- | ------------------- | --- | ----------------------------------- | --- | --- |
|     |     | PTYP.BEZ:GLZTMOD    |     | Name of the working time day type   |     |     |
|     |     | PTYP.SCHZART        |     | Shift type                          |     |     |
|     |     | PTYP.ENTLTMOD       |     | Payment day type                    |     |     |
|     |     | PTYP.BEZK:ENTLTMOD  |     | Short name of the payment day type  |     |     |
|     |     | PTYP.BEZ:ENTLTMOD   |     | Name of the payment day type        |     |     |
|     |     | PTYP.BEM            |     | Comment                             |     |     |
|     |     | PTYP.VERWEIS        |     | Unique record number                |     |     |

| 2.12.1.4  | Personal model created (PMOD.INSERTED)  |     |     |     |     |     |
| --------- | --------------------------------------- | --- | --- | --- | --- | --- |
The  escalation  PMOD.INSERTED  is  generated  when  a  Personal  model  has  been  created.  This
escalation can be used to inform the employee on the PZE terminal, for example.
To create the message or define conditions, the following placeholders are available:
| Event          |     | Identifiers     |     | Description                     |     |     |
| -------------- | --- | --------------- | --- | ------------------------------- | --- | --- |
| PMOD.INSERTED  |     | PNR.FIR         |     | Company                         |     |     |
|                |     | PNR.PNR         |     | Personnel number                |     |     |
|                |     | PNR.NAME:PNR    |     | Name                            |     |     |
|                |     | PNR.PNAME       |     | Last name                       |     |     |
|                |     | PNR.PVORNAME    |     | First name                      |     |     |
|                |     | PNR.BER         |     | Area                            |     |     |
|                |     | PNR.KST         |     | Cost center                     |     |     |
|                |     | PNR.ABT         |     | Department                      |     |     |
|                |     | PNR.PKREIS      |     | Employee subgroup               |     |     |
|                |     | PNR.TAETIGKEIT  |     | Activity of the person          |     |     |
|                |     | PNR.BESCHVERH   |     | Employment relationship         |     |     |
|                |     | PNR.TEL:FIR     |     | Company phone                   |     |     |
|                |     | PNR.EMAIL:FIR   |     | Company e-mail                  |     |     |
|                |     | PNR.VGS:PNR     |     | Personnel number of supervisor  |     |     |
|                |     | PMOD.DATB       |     | Start date                      |     |     |
|                |     | PMOD.DATE       |     | End date                        |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 30 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

Escalation Messages of PZW
PMOD.GUELT V=The Personal model is completely in the past
H=The Personal model is valid on the current
day or on future days
H=The Personal model is only valid on future
days
PMOD.GLZJMOD Working time model
PMOD.BEZ:GLZJMOD Name of the working time model
PMOD.SCHZARTMOD Shift rhythm model
PMOD.BEZ:SCHZARTMOD Name of the shift rhythm model
PMOD.ENTLJMOD Payment model
PMOD.BEZ:ENTLJMOD Name of the payment model
PMOD.MEHRARBTYP Overtime type
PMOD.BEZ:MEHRARBTYP Name of the overtime type
PMOD.BEM Reserved for future extension
PMOD.VERWEIS Unique record number
2.12.1.5 Personal model changed (PMOD.UPDATED)
The escalation PMOD.UPDATED is generated when a Personal model has been changed. This
escalation can be used to inform the employee on the PZE terminal, for example.
To create the message or define conditions, the following placeholders are available:
Event Identifiers Description
PMOD.UPDATED PNR.FIR Company
PNR.PNR Personnel number
PNR.NAME:PNR Name
PNR.PNAME Last name
PNR.PVORNAME First name
PNR.BER Area
PNR.KST Cost center
PNR.ABT Department
PNR.PKREIS Employee subgroup
PNR.TAETIGKEIT Activity of the person
PNR.BESCHVERH Employment relationship
PNR.TEL:FIR Company phone
PNR.EMAIL:FIR Company e-mail
PNR.VGS:PNR Personnel number of supervisor
PMOD.DATBV Previous start date
PMOD.DATEV Previous end date
PMOD.DATB Start date
PMOD.DATE End date
PMOD.GUELT V=The Personal model was completely in
the past before and after the change
H=The Personal model was or is valid on
the current day or on future days
Z=The Personal model was or is only valid
on future days
PMOD.GLZJMODV Previous working time model
PZW-ESK_83.docx Version: 1.0.23191 Page 31 of 37

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

|     |     | PMOD.BEZ:GLZJMODV  |     | Name of the previous working time model  |     |     |
| --- | --- | ------------------ | --- | ---------------------------------------- | --- | --- |
|     |     | PMOD.GLZJMOD       |     | Working time model                       |     |     |
|     |     | PMOD.BEZ:GLZJMOD   |     | Name of the working time model           |     |     |
|     |     | PMOD.SCHZARTMODV   |     | Previous shift rhythm model              |     |     |
PMOD.BEZ:SCHZARTMODV  Name of the previous shift rhythm model
|     |     | PMOD.SCHZARTMOD       |     | Shift rhythm model                  |     |     |
| --- | --- | --------------------- | --- | ----------------------------------- | --- | --- |
|     |     | PMOD.BEZ:SCHZARTMOD   |     | Name of the shift rhythm model      |     |     |
|     |     | PMOD.ENTLJMODV        |     | Previous payment model              |     |     |
|     |     | PMOD.BEZ:ENTLJMODV    |     | Name of the previous payment model  |     |     |
|     |     | PMOD.ENTLJMOD         |     | Payment model                       |     |     |
|     |     | PMOD.BEZ:ENTLJMOD     |     | Name of the payment model           |     |     |
|     |     | PMOD.MEHRARBTYPV      |     | Previous overtime type              |     |     |
|     |     | PMOD.BEZ:MEHRARBTYPV  |     | Name of the previous overtime type  |     |     |
|     |     | PMOD.MEHRARBTYP       |     | Overtime type                       |     |     |
|     |     | PMOD.BEZ:MEHRARBTYP   |     | Name of the overtime type           |     |     |
|     |     | PMOD.BEMV             |     | Reserved for future extension       |     |     |
|     |     | PMOD.BEM              |     | Reserved for future extension       |     |     |
|     |     | PMOD.VERWEIS          |     | Unique record number                |     |     |

The fields that include the previous value of a field always refer to the value that the field
contained before the personal model has been changed.

| 2.12.1.6  | Personal model deleted (PMOD.DELETED)  |     |     |     |     |     |
| --------- | -------------------------------------- | --- | --- | --- | --- | --- |
The escalation PMOD.DELETED is generated when a Personal model has been deleted. This escalation
can be used to inform the employee on the PZE terminal, for example.
To create the message or define conditions, the following placeholders are available:
| Event  |     | Identifiers  |     | Description   |     |     |
| ------ | --- | ------------ | --- | ------------- | --- | --- |
|        |     | PNR.FIR      |     | Company       |     |     |
PMOD.DELETED
|     |     | PNR.PNR         |     | Personnel number                |     |     |
| --- | --- | --------------- | --- | ------------------------------- | --- | --- |
|     |     | PNR.NAME:PNR    |     | Name                            |     |     |
|     |     | PNR.PNAME       |     | Last name                       |     |     |
|     |     | PNR.PVORNAME    |     | First name                      |     |     |
|     |     | PNR.BER         |     | Area                            |     |     |
|     |     | PNR.KST         |     | Cost center                     |     |     |
|     |     | PNR.ABT         |     | Department                      |     |     |
|     |     | PNR.PKREIS      |     | Employee subgroup               |     |     |
|     |     | PNR.TAETIGKEIT  |     | Activity of the person          |     |     |
|     |     | PNR.BESCHVERH   |     | Employment relationship         |     |     |
|     |     | PNR.TEL:FIR     |     | Company phone                   |     |     |
|     |     | PNR.EMAIL:FIR   |     | Company e-mail                  |     |     |
|     |     | PNR.VGS:PNR     |     | Personnel number of supervisor  |     |     |
|     |     | PMOD.DATB       |     | Start date                      |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 32 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

|     |     | PMOD.DATE   |     | End date                                    |     |     |
| --- | --- | ----------- | --- | ------------------------------------------- | --- | --- |
|     |     | PMOD.GUELT  |     | V=The Personal model was completely in the  |     |     |
past
H=The Personal model was valid on the current
day or on future days
Z=The Personal model was only valid on future
days
|     |     | PMOD.GLZJMOD         |     | Working time model              |     |     |
| --- | --- | -------------------- | --- | ------------------------------- | --- | --- |
|     |     | PMOD.BEZ:GLZJMOD     |     | Name of the working time model  |     |     |
|     |     | PMOD.SCHZARTMOD      |     | Shift rhythm model              |     |     |
|     |     | PMOD.BEZ:SCHZARTMOD  |     | Name of the shift rhythm model  |     |     |
|     |     | PMOD.ENTLJMOD        |     | Payment model                   |     |     |
|     |     | PMOD.BEZ:ENTLJMOD    |     | Name of the payment model       |     |     |
|     |     | PMOD.MEHRARBTYP      |     | Overtime type                   |     |     |
|     |     | PMOD.BEZ:MEHRARBTYP  |     | Name of the overtime type       |     |     |
|     |     | PMOD.BEM             |     | Reserved for future extension   |     |     |
|     |     | PMOD.VERWEIS         |     | Unique record number            |     |     |

| 2.12.1.7  | Personal working time created (PAZ.INSERTED)  |     |     |     |     |     |
| --------- | --------------------------------------------- | --- | --- | --- | --- | --- |
The escalation PAZ.INSERTED is generated when a Personal working time has been created. This
escalation can be used to inform the employee on the PZE terminal, for example.
To create the message or define conditions, the following placeholders are available:
| Event         |     | Identifiers     |     | Description                                  |     |     |
| ------------- | --- | --------------- | --- | -------------------------------------------- | --- | --- |
| PAZ.INSERTED  |     | PNR.FIR         |     | Company                                      |     |     |
|               |     | PNR.PNR         |     | Personnel number                             |     |     |
|               |     | PNR.NAME:PNR    |     | Name                                         |     |     |
|               |     | PNR.PNAME       |     | Last name                                    |     |     |
|               |     | PNR.PVORNAME    |     | First name                                   |     |     |
|               |     | PNR.BER         |     | Area                                         |     |     |
|               |     | PNR.KST         |     | Cost center                                  |     |     |
|               |     | PNR.ABT         |     | Department                                   |     |     |
|               |     | PNR.PKREIS      |     | Employee subgroup                            |     |     |
|               |     | PNR.TAETIGKEIT  |     | Activity of the person                       |     |     |
|               |     | PNR.BESCHVERH   |     | Employment relationship                      |     |     |
|               |     | PNR.TEL:FIR     |     | Company phone                                |     |     |
|               |     | PNR.EMAIL:FIR   |     | Company e-mail                               |     |     |
|               |     | PNR.VGS:PNR     |     | Personnel number of supervisor               |     |     |
|               |     | PAZ.GLZTMOD     |     | Working time day type on which the personal  |     |     |
working time is based
|     |     | PAZ.BEZ:GLZTMOD  |     | Name of the personal working time  |     |     |
| --- | --- | ---------------- | --- | ---------------------------------- | --- | --- |
|     |     | PAZ.SCHZART      |     | Shift type                         |     |     |
|     |     | PAZ.DATB         |     | Start date                         |     |     |
|     |     | PAZ.DATE         |     | End date                           |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 33 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

|     |     | PAZ.GUELT  |     | V=The Personal working time is completely in  |     |     |
| --- | --- | ---------- | --- | --------------------------------------------- | --- | --- |
the past
H=The Personal working time is valid on the
current day or on future days
Z=The Personal working time is only valid on
future days
The validity is identified using the field
PAZ.DATE.NORMB.
|     |     | PAZ.DATB:NORMB  |     | Start date which refers to the beginning of  |     |     |
| --- | --- | --------------- | --- | -------------------------------------------- | --- | --- |
normal time:
If the night shift starts on the day before, this
start date and the respective end date are one
day earlier.
PAZ.DATE:NORMB  End date which refers to beginning of normal
time
|     |     | PAZ.NORMB    |     | Beginning of normal time  |     |     |
| --- | --- | ------------ | --- | ------------------------- | --- | --- |
|     |     | PAZ.NORME    |     | End of normal time        |     |     |
|     |     | PAZ.SZ       |     | Target time               |     |     |
|     |     | PAZ.STBYB:1  |     | Start of on-call duty 1   |     |     |
|     |     | PAZ.STBYE:1  |     | End of on-call duty 1     |     |     |
|     |     | PAZ.STBYB:2  |     | Start of on-call duty 2   |     |     |
|     |     | PAZ.STBYE:2  |     | End of on-call duty 2     |     |     |
|     |     | PAZ.VERWEIS  |     | Unique record number      |     |     |

The start and end times of this escalation are standardized and must be between 0:00 and
23.59. For example, if a night shift starts on the day before, then this shift is configured with the

beginning of normal time -2:00 and is output in the escalation with 22:00.

| 2.12.1.8  | Personal working time changed (PAZ.UPDATED)  |     |     |     |     |     |
| --------- | -------------------------------------------- | --- | --- | --- | --- | --- |
The escalation PAZ.UPDATED is generated when a Personal working time has been changed. This
escalation can be used to inform the employee on the PZE terminal, for example.
To create the message or define conditions, the following placeholders are available:
| Event        |     | Identifiers     |     | Description             |     |     |
| ------------ | --- | --------------- | --- | ----------------------- | --- | --- |
| PAZ.UPDATED  |     | PNR.FIR         |     | Company                 |     |     |
|              |     | PNR.PNR         |     | Personnel number        |     |     |
|              |     | PNR.NAME:PNR    |     | Name                    |     |     |
|              |     | PNR.PNAME       |     | Last name               |     |     |
|              |     | PNR.PVORNAME    |     | First name              |     |     |
|              |     | PNR.BER         |     | Area                    |     |     |
|              |     | PNR.KST         |     | Cost center             |     |     |
|              |     | PNR.ABT         |     | Department              |     |     |
|              |     | PNR.PKREIS      |     | Employee subgroup       |     |     |
|              |     | PNR.TAETIGKEIT  |     | Activity of the person  |     |     |

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 34 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

Escalation Messages of PZW
PNR.BESCHVERH Employment relationship
PNR.TEL:FIR Company phone
PNR.EMAIL:FIR Company e-mail
PNR.VGS:PNR Personnel number of supervisor
PAZ.GLZTMODV Previous working time day type on which the
personal working time was based.
PAZ.BEZ:GLZTMODV Previous name of the personal working time
PAZ.GLZTMOD Working time day type on which the personal
working time is based
PAZ.BEZ:GLZTMOD Name of the personal working time
PAZ.SCHZARTV Previous shift type
PAZ.SCHZART Shift type
PAZ.DATB Start date
PAZ.DATE End date
PAZ.GUELT V=The Personal working time is completely in
the past
H=The Personal working time is valid on the
current day or on future days
Z=The Personal working time is only valid on
future days
The validity is identified using the field
PAZ.DATE.NORMB.
PAZ.DATB:NORMBV Previous start date which refers to beginning of
normal time
PAZ.DATE:NORMBV Previous end date which refers to beginning of
normal time
PAZ.DATB:NORMB Start date which refers to the beginning of
normal time:
If the night shift starts on the day before, this
start date and the respective end date are one
day earlier.
PAZ.DATE:NORMB End date which refers to beginning of normal
time
PAZ.NORMBV Previous beginning of normal time
PAZ.NORMEV Previous end of normal time
PAZ.NORMB Beginning of normal time
PAZ.NORME End of normal time
PAZ.SZV Previous target time
PAZ.SZ Target time
PAZ.STBYBV:1 Previous start of on-call duty 1
PAZ.STBYEV:1 Previous end of on-call duty 1
PAZ.STBYB:1 Start of on-call duty 1
PAZ.STBYE:1 End of on-call duty 1
PAZ.STBYBV:2 Previous start of on-call duty 2
PAZ.STBYEV:2 Previous end of on-call duty 2
PAZ.STBYB:2 Start of on-call duty 2
PAZ.STBYE:2 End of on-call duty 2
PAZ.VERWEIS Unique record number
The start and end times of this escalation are standardized and must be between 0:00 and
23.59. For example, if a night shift starts on the day before, then this shift is configured with the
PZW-ESK_83.docx Version: 1.0.23191 Page 35 of 37

|     |     |     |     |     | Escalation Messages of PZW  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

beginning of normal time -2:00 and is output in the escalation with 22:00.
The fields that include the previous value of a field always refer to the value that the field
contained before the personal working time has been changed.

| 2.12.1.9  | Personal working time deleted (PAZ.DELETED)  |     |     |     |     |     |
| --------- | -------------------------------------------- | --- | --- | --- | --- | --- |
The escalation PAZ.DELETED is generated when a Personal working time has been deleted. This
escalation can be used to inform the employee on the PZE terminal, for example.
To create the message or define conditions, the following placeholders are available:
| Event        |     | Identifiers     |     | Description                                  |     |     |
| ------------ | --- | --------------- | --- | -------------------------------------------- | --- | --- |
| PAZ.DELETED  |     | PNR.FIR         |     | Company                                      |     |     |
|              |     | PNR.PNR         |     | Personnel number                             |     |     |
|              |     | PNR.NAME:PNR    |     | Name                                         |     |     |
|              |     | PNR.PNAME       |     | Last name                                    |     |     |
|              |     | PNR.PVORNAME    |     | First name                                   |     |     |
|              |     | PNR.BER         |     | Area                                         |     |     |
|              |     | PNR.KST         |     | Cost center                                  |     |     |
|              |     | PNR.ABT         |     | Department                                   |     |     |
|              |     | PNR.PKREIS      |     | Employee subgroup                            |     |     |
|              |     | PNR.TAETIGKEIT  |     | Activity of the person                       |     |     |
|              |     | PNR.BESCHVERH   |     | Employment relationship                      |     |     |
|              |     | PNR.TEL:FIR     |     | Company phone                                |     |     |
|              |     | PNR.EMAIL:FIR   |     | Company e-mail                               |     |     |
|              |     | PNR.VGS:PNR     |     | Personnel number of supervisor               |     |     |
|              |     | PAZ.GLZTMOD     |     | Working time day type on which the personal  |     |     |
working time is based
|     |     | PAZ.BEZ:GLZTMOD  |     | Name of the personal working time              |     |     |
| --- | --- | ---------------- | --- | ---------------------------------------------- | --- | --- |
|     |     | PAZ.SCHZART      |     | Shift type                                     |     |     |
|     |     | PAZ.DATB         |     | Start date                                     |     |     |
|     |     | PAZ.DATE         |     | End date                                       |     |     |
|     |     | PAZ.GUELT        |     | V=The Personal working time was completely in  |     |     |
the past
H=The Personal working time was valid on the
current day or on future days
Z=The Personal working time was only valid on
future days
The validity is identified using the field
PAZ.DATE.NORMB.
|     |     | PAZ.DATB:NORMB  |     | Start date which refers to the beginning of  |     |     |
| --- | --- | --------------- | --- | -------------------------------------------- | --- | --- |
normal time:
If the night shift starts on the day before, this
start date and the respective end date are one
day earlier.
PAZ.DATE:NORMB  End date which refers to beginning of normal
time

| PZW-ESK_83.docx  |     |     | Version: 1.0.23191  |     |     | Page 36 of 37  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

Escalation Messages of PZW
PAZ.NORMB Beginning of normal time
PAZ.NORME End of normal time
PAZ.SZ Target time
PAZ.STBYB:1 Start of on-call duty 1
PAZ.STBYE:1 End of on-call duty 1
PAZ.STBYB:2 Start of on-call duty 2
PAZ.STBYE:2 End of on-call duty 2
PAZ.VERWEIS Unique record number
The start and end times of this escalation are standardized and must be between 0:00 and
23.59. For example, if a night shift starts on the day before, then this shift is configured with the
beginning of normal time -2:00 and is output in the escalation with 22:00.
PZW-ESK_83.docx Version: 1.0.23191 Page 37 of 37
Manual

Escalation Messages of PZW
PZW-ESK 8.2

Version 1.0.15126

Last changed on: 19.06.2020

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

PZW-ESK_82.docx

Version: 1.0.19468

Page 2 of 21

Escalation Messages of PZW

1  PZW Escalation Messages – Overview ....................................................... 4

2  Escalations available for Personnel Time Management .............................. 5

2.1  Clocking failure with person (PNR.CLOCKING_FAILURE) .................................. 5

2.2  Absence created (FZ.INSERTED) ....................................................................... 7

2.3  Absence changed (FZ.UPDATED) ...................................................................... 8

2.4  Absence deleted (FZ.DELETED) ......................................................................... 9

2.5  A person joining the company (PNR.JOINING) ................................................. 10

2.6  A person leaving the company (PNR.LEAVING) ............................................... 12

2.7  A person's birthday (PNR.BIRTHDAY) .............................................................. 14

2.8  A person's company anniversary (PNR.JUBILEE) ............................................. 16

2.9  Unplanned absence (PNR.UNPLANNED_ABSENCE) ...................................... 18

2.10  End of continued pay (PNR.END_OF_CONTINUED_PAY) ........................................ 20

PZW-ESK_82.docx

Version: 1.0.19468

Page 3 of 21

Escalation Messages of PZW

1  PZW Escalation Messages – Overview

Purpose

Application Service to generate events or to send messages in the HYDRA Personnel Time Management

(PZW).

Implementation notes

You use the function package for the following purposes:

  You want to be informed when absences are created, modified or deleted.

  You want to be informed in time when an employee joins or leaves the company or in case of a

birthday or company anniversary of an employee.

  You  want  to  be  informed  before  the  period  of  continued  pay  ends  when  an  employee  receives

continued pay.

  You want to be informed when an employee is absent (unplanned).

Integration

If  an  escalation  must  be  triggered  in  case  of  an  unplanned  absent  employee,  you  must  first  store  the

planned working time of the employee in the Personnel Time Management (function package:  labor time

assessment).

Features

  Escalations of the Personnel Time Management

o  Employees that arrive too late or are absent unplanned

o

Information on planned absences

o  Reminders  when  employees  are  joining  or  leaving  the  company,  when  there  are

birthdays and company anniversaries of employees

o  Notification before the period of continued pay ends

PZW-ESK_82.docx

Version: 1.0.19468

Page 4 of 21

2  Escalations available for Personnel Time Management

Escalation Messages of PZW

This document describes the escalations available in PZW. If an escalation is to be enabled, a respective

configuration has to be created for this escalation.

2.1  Clocking failure with person (PNR.CLOCKING_FAILURE)

The escalation PNR.CLOCKING_FAILURE will be generated if the error "wrong status sequence" occurs

during work day evaluation. This escalation can, for example, be used to inform the supervisor by e-mail

or the employee at the terminal.

PZW-ESK_82.docx

Version: 1.0.19468

Page 5 of 21

Escalation Messages of PZW

With the configuration of escalations the recipient type Automatic causes the message to be sent to the

person for whom the escalation was created.

The text for the notification can be configured in the "message" tab:

The "notification" tab can be used to define whether the message is to be sent by e-mail or displayed on

the PZE terminal.

If notifications are to be performed via the terminal, the messages and clocking authorizations are loaded

cyclically  onto  the  PZE  terminals.  Consequently,  the  messages  are  available  on  the  terminal  (provided

that  the  terminal  is  online)  at  the  latest  after  the  duration  "cyclic  loading"  that  is  set  in  the  terminal

configuration within the "HR functions" tab. In case a message was displayed, it is marked as being read

and  is no  longer transferred to the terminal  with the  next cyclic loading  interval. However, the message

can be displayed several times within one cyclic loading time.

PZW-ESK_82.docx

Version: 1.0.19468

Page 6 of 21

By correcting the clocking failure and performing the work-day evaluation, the escalation is finished and

the message is deleted for the display, provided it has not yet been shown. The message will no longer

be available and displayed on the terminal at the latest after a cyclic loading time.

Escalation Messages of PZW

Please note:

Messages can only be displayed on terminals of the type CT-38x and CT-37x.

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

PNR.CLOCKING_FAILURE  PNR.PNR

Personnel number

STMP.ABREDAT

Evaluation date

PNR.NAME

The person's name

PNR.PNAME

The person's surname

PNR.PVORNAME

The person's first name

PNR.FIR

PNR.BER

PNR.KST

PNR.ABT

Company pertaining to the personnel number

The person's area

The person's cost center

The person's department

PNR.PKREIS

The person's employee subgroup

2.2  Absence created (FZ.INSERTED)

The escalation FZ.INSERTED is generated if an absence is created. This escalation can, for example, be

used to inform the supervisor by e-mail.

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

FZ.INSERTED

FZ.FIR
FZ.PNR
FZ.NAME:PNR
FZ.PNAME
FZ.PVORNAME
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT

Company
Personnel number
Name
Last name
First name
Area
Cost center
Department
Employee subgroup
The person's activity

PZW-ESK_82.docx

Version: 1.0.19468

Page 7 of 21

Escalation Messages of PZW

PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
FZ.ENTLTMOD
FZ.BEZK:ENTLTMOD
FZ.BEZL:ENTLTMOD
FZ.KAT
FZ.DAT:APPLY
FZ.ZEI:APPLY
FZ.DATB
FZ.DATE
FZ.BEZL
FZ.VERWEIS

Employment relationship
Phone, company
E-Mail, company
Absence payment
Abbreviation of the absence
Absence designation
Absence category
Date of application
Time of application
Start date
End date
Comment
Unique record number

2.3  Absence changed (FZ.UPDATED)

The  escalation  FZ.UPDATED  is  generated  if  an  absence  is  modified.  This  escalation  can  be  used,  for

example, to inform the supervisor by e-mail.

The escalation FZ.UPDATED is only triggered if the period or absence payment is changed by

modifying a person's absence.

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

FZ.UPDATED

FZ.FIR
FZ.PNR
FZ.NAME:PNR
FZ.PNAME
FZ.PVORNAME
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
FZ.ENTLTMOD
FZ.BEZK:ENTLTMOD
FZ.BEZL:ENTLTMOD
FZ.KAT
FZ.DAT:APPLY
FZ.ZEI:APPLY
FZ.DATB
FZ.DATE
FZ.BEZL
FZ.VERWEIS

Company
Personnel number
Name
Last name
First name
Area
Cost center
Department
Employee subgroup
The person's activity
Employment relationship
Phone, company
E-Mail, company
Absence payment
Abbreviation of the absence
Absence designation
Absence category
Date of application
Time of application
Start date
End date
Comment
Unique record number

PZW-ESK_82.docx

Version: 1.0.19468

Page 8 of 21

Escalation Messages of PZW

FZ.ENTLTMODV
FZ.BEZK:ENTLTMODV
FZ.BEZL:ENTLTMODV
FZ.KATV
FZ.DATBV
FZ.DATEV

Previous absence payment
Previous abbreviation of the absence
Previous absence designation
Previous absence category
Previous start date
Previous end date

2.4  Absence deleted (FZ.DELETED)

The  escalation  FZ.DELETED  is  generated  if  an  absence  is  deleted.  This  escalation  can  be  used,  for

example, to inform the supervisor by e-mail.

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

FZ.DELETED

FZ.FIR
FZ.PNR
FZ.NAME:PNR
FZ.PNAME
FZ.PVORNAME
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
FZ.ENTLTMOD
FZ.BEZK:ENTLTMOD
FZ.BEZL:ENTLTMOD
FZ.KAT
FZ.DAT:APPLY
FZ.ZEI:APPLY
FZ.DATB
FZ.DATE
FZ.BEZL
FZ.VERWEIS

Company
Personnel number
Name
Last name
First name
Area
Cost center
Department
Employee subgroup
The person's activity
Employment relationship
Phone, company
E-Mail, company
Absence payment
Abbreviation of the absence
Absence designation
Absence category
Date of application
Time of application
Start date
End date
Comment
Unique record number

PZW-ESK_82.docx

Version: 1.0.19468

Page 9 of 21

Escalation Messages of PZW

2.5  A person joining the company (PNR.JOINING)

The escalation PNR.JOINING is generated daily up to 50 days prior to the person joining the company.

The variable PNR.DAUER_EINTRITT and a condition define how many days prior to the person joining

the company the message is to be displayed:

In this example, the message about a person joining the company is generated 14 days prior to the date

of joining.

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

PNR.JOINING

PNR.FIR
PNR.PNR
PNR.NAME:PNR

Company
Personnel number
Name

PZW-ESK_82.docx

Version: 1.0.19468

Page 10 of 21

Escalation Messages of PZW

PNR.PNAME
PNR.PVORNAME
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
PNR.EINTRITT
PNR.DAUER_EINTRITT

PNR.VGS:PNR
PNR.VGS:FIR

Last name
First name
Area
Cost center
Department
Employee subgroup
The person's activity
Employment relationship
Phone, company
E-Mail, company
Date of joining
Number of days until the person joining the
company
The supervisor's personnel number
The supervisor's company

PZW-ESK_82.docx

Version: 1.0.19468

Page 11 of 21

Escalation Messages of PZW

2.6  A person leaving the company (PNR.LEAVING)

The escalation PNR.LEAVING is generated on a daily basis up to 50 days prior to the person leaving the

company.  The  variable  PNR.DAUER_AUSTRITT  can  be  set  in  the  condition  wizard  and  defines  how

many days prior to the person leaving the company the message is to be displayed:

In this example the message about a person leaving the company is generated 30 days prior to the date

of leaving.

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

PNR.LEAVING

PNR.FIR
PNR.PNR
PNR.NAME:PNR

Company
Personnel number
Name

PZW-ESK_82.docx

Version: 1.0.19468

Page 12 of 21

Escalation Messages of PZW

PNR.PNAME
PNR.PVORNAME
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
PNR.AUSTRITT
PNR.DAUER_AUSTRITT

PNR.VGS:PNR
PNR.VGS:FIR

Last name
First name
Area
Cost center
Department
Employee subgroup
The person's activity
Employment relationship
Phone, company
E-Mail, company
Date of leaving
Number of days until the person leaving the
company
The supervisor's personnel number
The supervisor's company

PZW-ESK_82.docx

Version: 1.0.19468

Page 13 of 21

Escalation Messages of PZW

2.7  A person's birthday (PNR.BIRTHDAY)

The escalation PNR.BIRTHDAY is generated on a daily basis up to 50 days prior to a person's birthday.

The variable PNR.DAUER_GEBDAT can be set in the condition wizard and defines how many days prior

to the birthday the message is to be displayed:

In  this  example,  the  message  is  generated  on  the  person's  birthday  if  it  is  a  "big"  birthday  that  can  be

divided by 5 or 10.

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

PNR.BIRTHDAY

PNR.FIR
PNR.PNR
PNR.NAME:PNR

Company
Personnel number
Name

PZW-ESK_82.docx

Version: 1.0.19468

Page 14 of 21

Escalation Messages of PZW

PNR.PNAME
PNR.PVORNAME
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
PNR.GEBTG
PNR.GEBDAT
PNR.DAUER_GEBDAT
PNR.GEBDAT:RUND

PNR.ALTER
PNR.VGS:PNR
PNR.VGS:FIR

Last name
First name
Area
Cost center
Department
Employee subgroup
The person's activity
Employment relationship
Phone, company
E-Mail, company
Date of the next birthday
Date of birth
Number of days until the birthday
Milestone birthdays:
  10 = birthday can be divided by 10
5 = birthday can be divided by 5
1 = no "big" birthday

Age in years
The supervisor's personnel number
The supervisor's company

PZW-ESK_82.docx

Version: 1.0.19468

Page 15 of 21

Escalation Messages of PZW

2.8  A person's company anniversary (PNR.JUBILEE)

The escalation PNR.JUBILEE is generated on a daily basis up to 50 days prior to the person's company

anniversary.  The  variable  PNR.DAUER_JUBIDAT  can  be  set  in  the  condition  wizard  and  defines  how

many days prior to the anniversary the message is to be displayed:

In  this  example,  the  message  is  generated  14  days  prior  to  the  person's  company  anniversary  if  it  is  a

"milestone" anniversary that can be divided by 10.

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

PNR.JUBILEE

PNR.FIR
PNR.PNR
PNR.NAME:PNR

Company
Personnel number
Name

PZW-ESK_82.docx

Version: 1.0.19468

Page 16 of 21

Escalation Messages of PZW

PNR.PNAME
PNR.PVORNAME
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
PNR.EINTRITT
PNR.JUBIDAT
PNR.DAUER_JUBIDAT
PNR.JUBIDAT:RUND

PNR.JUBI
PNR.VGS:PNR
PNR.VGS:FIR

Last name
First name
Area
Cost center
Department
Employee subgroup
The person's activity
Employment relationship
Phone, company
E-Mail, company
Date of joining
Date of the company anniversary
Number of days until the anniversary
Milestone company anniversary:
  10 = anniversary can be divided by 10
5 = anniversary can be divided by 5
1 = no "big" anniversary
Company anniversary in years
The supervisor's personnel number
The supervisor's company

PZW-ESK_82.docx

Version: 1.0.19468

Page 17 of 21

Escalation Messages of PZW

2.9  Unplanned absence (PNR.UNPLANNED_ABSENCE)

The  escalation  PNR.UNPLANNED_ABSENCE  is  processed  in  cyclic  intervals  (e.g.  every  15  minutes).

The variable PNR.ABWDAU can be set in the condition wizard and defines how long the person has at

least to be absent (unplanned) before the escalation can be triggered:

In  this  example,  the  escalation  is  only  triggered  if  the  employee  is  absent  (unplanned)  for  at  least  30

minutes (1800 seconds).

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

PNR.UNPLANNED_ABSENCE  PNR.FIR
PNR.PNR
PNR.NAME:PNR

Company
Personnel number
Name

PZW-ESK_82.docx

Version: 1.0.19468

Page 18 of 21

Escalation Messages of PZW

PNR.PNAME
PNR.PVORNAME
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
PNR.ABWDAT
PNR.ABWZEI
PNR.ABWDAU
PNR.ANW

PNR.VGS:PNR
PNR.VGS:FIR

Last name
First name
Area
Cost center
Department
Employee subgroup
The person's activity
Employment relationship
Phone, company
E-Mail, company
Start date of unplanned absence
Start time of unplanned absence
Previous duration of the unplanned absence
J = Person was present before
N = Person was not present before
The supervisor's personnel number
The supervisor's company

PZW-ESK_82.docx

Version: 1.0.19468

Page 19 of 21

Escalation Messages of PZW

2.10  End of continued pay (PNR.END_OF_CONTINUED_PAY)

 The  escalation  PNR.END_OF_CONTINUED_PAY  is  generated  on  a  daily  basis  up  to  50  days  prior  to

the end of a person's continued pay. The variable PNR.DAUER_OLFZ can be set in the condition wizard

and defines how many days prior to the end of continued pay the message is to be displayed:

In  this  example,  a  message  is  generated  for  the  relevant  person  14  days  prior  to  the  end  of  continued

pay.  The  operator  "<=“  (less  than  or  equal  to)  causes  the  message  to  be  generated  even  if  the  end  of

continued pay is reached in less than 14 days, e.g. due to short-term planning. But this also results in the

escalation to be generated once more the next day  even  if the escalation is finished prior to the end of

continued pay. Escalation Management creates this escalation on a daily basis, provided it is not already

available for the  person and the end date of continued pay. With the operator  "=", the escalation is  not

triggered several times and is also omitted if the end of continued pay lies less than 14 days in the future,

e.g. due to the assignment of a previous illness.

PZW-ESK_82.docx

Version: 1.0.19468

Page 20 of 21

The following placeholders are available for the creation of the message or to define the conditions:

Event

Identifiers

Description

Escalation Messages of PZW

PNR.END_OF_CONTINUED_PAY  PNR.FIR
PNR.PNR
PNR.NAME:PNR
PNR.PNAME
PNR.PVORNAME
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
PNR.DATE_LFZ
PNR.DATB_OLFZ
PNR.DAUER_OLFZ  Number of days until continued pay ends
PNR.VGS:PNR
PNR.VGS:FIR

Company
Personnel number
Name
Last name
First name
Area
Cost center
Department
Employee subgroup
The person's activity
Employment relationship
Phone, company
E-Mail, company
End of continued pay
First day without continued pay

The supervisor's personnel number
The supervisor's company

PZW-ESK_82.docx

Version: 1.0.19468

Page 21 of 21


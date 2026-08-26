Manual

Connection of KABA Access
Terminals and Readers
SCS-HCKZ 8.1

Version 1.0.23049

Last changed on: 02.09.2020

 Connection of KABA Access Terminals and Readers

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 2 of 20

 Connection of KABA Access Terminals and Readers

Contents

1  Connection of KABA Access Terminals and Readers ................................. 4

2  Kaba Connector Access Control .................................................................. 5

2.1  Requirements ...................................................................................................... 5

2.2  Supported terminal types..................................................................................... 5

2.3  Administration ..................................................................................................... 5

2.4  Configurations ..................................................................................................... 6

2.4.1  Access authorizations .............................................................................. 6

2.4.2  Hardware related configurations .............................................................. 9

2.5  Fields of application ........................................................................................... 14

2.5.1  One access point with one reader and one door opener key ................. 14

2.5.2  One access point with 2 readers (inside and outside) ............................ 14

2.5.3  One access point without reader ........................................................... 15

2.5.4  Security gates ........................................................................................ 15

2.5.5  Check attendance in room zone ............................................................ 15

2.5.6  Anti passback ........................................................................................ 15

2.5.7  Second channel opener ......................................................................... 16

2.5.8

"Office unlocked" in online components ................................................. 16

2.5.9  Elevator control ..................................................................................... 16

2.5.10  Bag check ............................................................................................. 16

2.5.11  Alarm suppression ................................................................................. 16

3  B-COMM Control ........................................................................................ 17

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 3 of 20

 Connection of KABA Access Terminals and Readers

1  Connection of KABA Access Terminals and Readers

Purpose

The  product  SCS-HCKZ  3.0  connects  the  ZKS  hardware  by  KABA  (access  terminals  and  readers)  to

HYDRA.

Implementation notes

You use the product SCS-HCKZ 3.0:



if you want to connect ZKS hardware by KABA to HYDRA;



if  you  want to transfer the  access authorizations configured in HYDRA to the ZKS hardware by

KABA;



if you want to display access logs, access statuses and alarms in HYDRA.

Integration

You need the KABA communication software B-COMM to use the product SCS-HCKZ 3.0.

Features



Interface for transferring of access authorizations to the ZKS hardware of KABA

  Time control for daily synchronization of access authorizations



Interface for transferring access logs, access statuses and alarms

  Offline buffering of postings when HYDRA is not available

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 4 of 20

 Connection of KABA Access Terminals and Readers

2  Kaba Connector Access Control

The Kaba connector for access control connects ZKS hardware by  Kaba  to  HYDRA. The connection is

established via the Kaba communication software B-COMM.

There are different types of Kaba access terminals. Depending on the type of terminal, you can process up

to 16 readers in one terminal.

2.1  Requirements

The communication software B-COMM needs to be licensed and installed in version 3.14 or higher.

Additionally to the B-COMM data communication, you need the software option B-Comm Parameter editor.

We  also  recommend  to  use  the  software  option  B-COMM  User  management.  This  option  offers  the

possibility to protect the user interface of the B-COMM (B-COMM GUI) with a password.

Kaba only supports the badge technologies LEGIC and MIFARE.

If you have terminals in different time zones, you need a HYDRA system for each time zone. The terminals,

the connector and the corresponding HYDRA system must operate in the same time zone.

2.2  Supported terminal types

The following terminal types support the connector:

-  Kaba access manager 92 90-K5

-  B-Net 92 90-2

-  B-Net 92 90

The following access readers support the connector:

-  Kaba compact reader 91 04-K5

-  Kaba compact reader 91 10-K5

-  Kaba remote reader 91 15-K5

with the Kaba registration units 90 00-K5, 90 01-K5, 90 02-K5, 90 03-K5, 90 04-K5

-  B-Net 91 04

-  B-Net 91 05

-  Bedanet 91 04

-  Bedanet 91 05

2.3  Administration

The connector's installation is not included in the HYDRA installation. The connector is installed with B-

COMM if required.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 5 of 20

 Connection of KABA Access Terminals and Readers

In  the  HYDRA  server,  the  connector  runs  as  service  under  Windows  or  as  daemon  under  Linux.  The

connector is automatically started on starting the server. The connector operates independently, if HYDRA

is started or not. It also works offline. If HYDRA is shut down, the connector continues to accept postings

(e.g. access logs) and stores this data on the hard drive. Once HYDRA is started, the connector transfers

the postings to HYDRA.

2.4  Configurations

The  access  control  configurations  are  partly  made  in  HYDRA  and  partly  in  B-COMM.  While  access

authorizations are defined in HYDRA, the hardware related settings are made via B-COMM. The following

chapters describe the configurations and settings in HYDRA.

2.4.1  Access authorizations

In  HYDRA,  access  authorizations  are  configured  via  Access  profiles  and  their  assignment  to  badges

(Access  profile  assignments).  For  each  access  profile,  you  define  in  the  Access  authorizations  which

Access groups in combination with a defined access time model have the authorization to open the Access

points of this access group.

2.4.1.1  Badges and access profile assignments

If you create, modify or delete a Badge or an Access profile assignment, the modification is communicated

promptly to all affected access terminals. It is not necessary to communicate permanently the complete

modified data to the terminal as the connector stores the data communicated to the access terminal. The

connector  only  communicates  the  differences  in  case  of  a modification.  You  can  delete  and  completely

reload the data in the terminal using the checkbox Reload program in the Terminal administration of the

Terminal configuration (go to: Terminal configuration - Terminal administration - Reload program).

If an unauthorized badge tries to open an access point, there is no online query to HYDRA asking if the

badge is authorized.

If you modify access authorizations due to modified accesses, access time models, opening hours or public

holidays, these modifications are identified cyclically and synchronized with the terminal (got to: Terminal

configuration - tab HR functions - Cyclic loading).

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 6 of 20

 Connection of KABA Access Terminals and Readers

Access terminals of Kaba do not support validity periods for badges. For this reason, the system

identifies  access  authorizations  on  a  daily  basis  at  midnight  and  communicates  possible

modifications  to  the  terminals.  This  might  be  an  employee's  first  day  in  the  company  or  an

employee who left the company the previous day. If an access terminal was offline for a longer

time, the modifications are only communicated to the terminal when it is online again and when

the time defined in the field Cyclic loading has elapsed (go to: Terminal configuration - tab HR

functions - Cyclic loading).

The access terminals of Kaba do not process the times in the Badge fields Valid from and Valid

until.

2.4.1.2  Access time models

Kaba  processes  a  maximum  of  159  Access  time  models  per  access  terminal.  You  can  define  up  to  16

different access time models per access terminal for each badge. You can define up to 7 Access periods

for each access time model.

If one of these limits is exceeded in one terminal, it is communicated to the HYDRA System logs and you

must change the access time models.

If an access time model has more than 7 access periods, the access time model is not transferred to the

terminal and the corresponding badges do not get access.

Modifications in the access time models are checked cyclically and transferred to the access terminal (go

to: Terminal configuration - tab HR functions - Cyclic loading).

Concerning the assignment of access time models to badges, the connector requires that every

Subterminal is exactly assigned to a Level in B-Comm (Level = Number of subterminal). If you

have installed an access terminal following the MPDV installation instructions, the Subterminal

is automatically assigned to a Level. You must not change this assignment in B-COMM later on.

Access terminals of Kaba do not support validity periods for access time models. For this reason,

the connector reads the current access time models on a daily basis at midnight and transfers

any modifications concerning the validity period to the terminals. If an access terminal is offline

for a longer time, the modifications are only communicated to the terminal when it is online again

and  when  the  time  defined  in  the  field  Cyclic  loading  in  the  tab  HR  functions  in  the  Terminal

configuration has elapsed.

2.4.1.3  Access time models for opening hours

The connector processes the following fields in the Access periods of the Access time models that are used

for the Opening hours:

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 7 of 20

 Connection of KABA Access Terminals and Readers

Badge required

If this option is checked in an access period, you need a valid badge including access authorization

to open the access. If this option is not checked, there is a so called "permanent activation", i.e. the

door opener's relay is permanently activated.

Office unlocked

The function "Office unlocked" is not available with access terminals of Kaba.

2.4.1.4  Access time models for access authorizations

The connector processes the following fields in the Access periods of the Access time models that are used

for the Access authorizations:

PIN code required

Once the badge is read, a PIN code might be required. When using access terminals of Kaba, control

the entry of the PIN code via the access time model of the badge's access authorizations and not via

the opening hours. Therefore, it depends on the previously read badge, if you also have to enter a

PIN code.

2.4.1.5  Configuration of PIN code length

The reader's light flashes if you have to enter a PIN code in addition to the badge to open an access. Only

after having entered the correct PIN code, the access opens if you have an access authorization.

The number of digits defined for the PIN code is equal for all employees. The setting is made in an  INI

configuration:

Name:

BCOMMCONNECTOR

Section:

AUTH

Key:

PINLENGTH

Value:

<number of digits for PIN>

By default, the PIN code includes 4 digits.

2.4.1.6  Access authorizations of access profiles

In the Access authorizations of the Access profiles the following fields are not processed:

Office unlocked

The function "Office unlocked" is not available with access terminals of Kaba.

Bag check

The function "Bag check" is not available with access terminals of Kaba.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 8 of 20

 Connection of KABA Access Terminals and Readers

2.4.1.7

Public holidays

The connector transfers the Public holidays together with the access authorizations to the access terminals.

The terminal always receives the following 8 public holidays. The period covered is up to one year.

Access terminals of Kaba only process one public holiday calendar per terminal. As a consequence, the

public  holidays  are  identical  for  all  access  points  of  a  terminal.  The  access  terminal  identifies  all  public

holidays which do not have an entry in the field Location or whose location matches the one of the terminal

according to the Terminal configuration. The location defined in the Access group is not relevant for access

terminals of Kaba.

2.4.2  Hardware related configurations

As far as the hardware related configurations are concerned, the access terminals of Kaba only process

few settings of HYDRA. The majority of the configurations are made in the parameter editor of the B-COMM

GUI.

The  following  chapters  describe  the  HYDRA  configurations  having  an  effect  on  the  access  terminals  of

Kaba.

2.4.2.1

Terminal

You  have  to  create  the  Kaba  access  terminals  in  the  Terminal  configuration.  The  following  fields  are

relevant for these terminals:

Configurations in the tab General

Terminal

Terminal number for unique identification.

Active

The connector only processes active terminals.

Location

The access terminal and the corresponding access points identify all  Public holidays which do not

have an entry in the field Location or whose location matches the one of the terminal.

Type

Enter the terminal type of the Kaba terminal in this field. The connector only processes terminals that

are assigned to the type Kaba in the field Type.

Terminal class

The  terminal  class  specifies  the  terminal  settings.  By  default,  enter  the  terminal  class  "60"  for

terminals of the type Kaba 9290. In case of customer specific processing, it might be necessary to

enter a deviating terminal class.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 9 of 20

 Connection of KABA Access Terminals and Readers

Operated as HYDRA-PZE/ZKS terminal

Check the option Operated as PZE/ZKS terminal.

Cycle duration of status messages

Specify  the  time  interval  in  hours  and  minutes  at  which  the  connector  sends  status  messages  to

HYDRA.

IP address

The terminal's IP address. For Kaba terminals, the terminal GID and DID must follow the IP address,

separated by a semicolon (Example: 192.168.10.213;0105).

Company number/system number

The value entered in this field can override the system number that is defined in the HYDRA Basic

settings for individual terminals.

Configurations in the tab HR functions

Operation mode

Set the operation mode Access terminal.

Cyclic loading

Time  interval  at  which  the  connector  sends  modifications  to  the  terminal.  The  modifications  may

concern the access points, the access time models, the opening hours and the public holidays. If you

check the option Reload authorizations in the Terminal administration of the Terminal configuration,

you can define that modifications are transferred to the terminal at the latest after the end of the Cycle

duration of status messages (if the terminal is online).

The connector promptly reads modifications in the terminal configuration for Kaba terminals. In

case of a new terminal, you must first define the terminal configuration and the access points.

Then you must check the option Reload program in the Terminal administration of the Terminal

configuration in order to transfer the configurations to the terminal.

Terminal administration in the toolbar

Terminal from, to

You can change the Terminal administration for one or several terminals.

Activate terminal

Use  the  checkbox  Activate  terminal  to  enable  or  disable  in  one  action  the  field  Active  for  all

preselected terminals.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 10 of 20

 Connection of KABA Access Terminals and Readers

Reboot

If you check the option Reboot, all preselected terminals are rebooted. After the next status message,

the connector informs the terminal about the reboot. The reboot is therefore executed within the time

period entered in the field Cycle duration of status messages (if the terminal is online).

Next reboot on

In the field Next reboot on, you can enter the point in time of the reboot. Once this point in time is

reached, the terminal is only rebooted after having sent the next terminal status.

Delayed by ... minutes

If you select several terminals in the Terminal configuration and you activate the field Delayed by ...

minutes, you can delay the time for the Next reboot for each of the terminals by the number of minutes

entered.

Reload program

If you check this option, the complete HYDRA configuration is loaded to the terminal. All badges and

access authorizations in the terminal are first deleted and then reloaded. During the data transfer,

the  badges  with  authorization  might  not  get  access  for  several  minutes.  In  addition,  the  access

terminal is restarted and the readers do not work for several minutes.

Reload authorizations

If  you check the option  Reload  authorizations, all modifications to  accesses, access time models,

opening hours and public holidays are transferred to the terminal at the latest after the end of the

time entered in the field Cycle duration of status messages (see field Cyclic loading in the tab HR

functions of the application Terminal configuration).

2.4.2.2  Access points

You have to create all access points in HYDRA and assign them to an access group. This chapter describes

the fields in the Access point which are processed when connected to the connector.

The connector cyclically loads the access points of a terminal (see field Cyclic loading in the tab

HR functions in the Terminal configuration). Once the access point is created or modified, the

modification is processed at the latest after the time period entered in the Terminal configuration.

Configurations in the tab Access point

Active

The connector only processes active access points. E.g., the connector rejects access logs of inactive

access points.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 11 of 20

 Connection of KABA Access Terminals and Readers

Trigger clocking

If you check the option Trigger clocking, you log the access as usual and in addition you generate

the  clocking  for  the  time  and  attendance  product  group  whenever  an  employee  uses  an  access.

Depending on the  access type, the system automatically  generates a clocking-in record if it is an

entry and a clocking-out record if it is an exit. An automatic status clocking record is generated if it is

a passage.

Access type

Specifies whether the access point is an Entrance, Exit, Passage or entrance Without checking the

badge number. Kaba terminals do not process the setting Without checking the badge number.

Access group

The configuration of access authorizations in the Access profiles and the configuration of the Opening

hours of an access point is made per Access group.

Terminal

Number of the Terminal the access point is connected to.

Reader

Number  of  the  reader  that  opens  the  access  point.  You  must  clearly  define  the  combination  of

terminal and reader in the system. You can also monitor and control an access point without reader

(see application case "Access without reader").

Configurations in the tab Settings

Report access status

Select the option Report access status to define whether or not the access point status is to be sent

to the HYDRA server. Possible values are “None” or “Open and closed”. Provided that the function

"Alarm System" (ZKS-ALS) has been licensed, the selection is extended by “Only alarms” and “All”.

The options “Open and closed” and “All” increase server communication and should only be selected

for  entries  that  are  less  frequently  opened  or  where  the  “Open”  status  is  to  be  monitored  via  the

escalation management function.

Cycle duration for reporting the access status

The current access status is sent to HYDRA, once the specified time has expired.

Reload access configuration

Kaba  access  terminals  do  not  process  the  field  Reload  access  configuration  (go  to:  Terminal

configuration - tab HR functions - Cyclic Loading).

Reload authorizations

Kaba access terminals do not process this field (go to: Terminal configuration - tab HR functions -

Cyclic Loading).

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 12 of 20

 Connection of KABA Access Terminals and Readers

Default Kaba channel assignment

The configuration of the channels (for example for the opener and the status) is not made in HYDRA. If

there is no other configuration in B-COMM, use the default Kaba channel assignment.

Channel status

Channel open.
pushbutton

Reader/Slot

1

2

3

…

8

9

10

…

16

Channel
opener

Int O01

Int O02

Int O03

…

Int O08

Ext O01

Ext O01

…

Int I01

Int I03

Int I05

…

Int I15

Ext I02

Ext I02

…

Ext O01

Ext I02

Int I02

Int I04

Int I06

…

Int I16

Ext I03

Ext I03

…

Ext I03

The access terminal processes the outputs and inputs of up to 8 readers. 'O' stands for output

and 'I' for input. From the 9th reader on, the inputs and outputs are processed in the reader.

Configurations in the tab Advanced Settings

Entrance to room zone

In this field, define a room zone that is entered through the access point.

Exit from room zone

In this field, define a room zone that is exited through the access point.

2.4.2.3  Room zones

The connector logs which badges are present in specified Room zones, if you define the fields in the access

configuration as Entrance to room zone or Exit from room zone.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 13 of 20

 Connection of KABA Access Terminals and Readers

The following fields in the configuration of room zones are not processed.

Plausibility check when entering, Plausibility check when exiting

Checking these two options does not have any effect on the behavior of the Kaba access terminals.

If you want to check, if a badge is already present in a room zone, you can configure this in B-COMM.

In this case, all entrances and exits of the room zone must be connected to one access terminal.

There is no synchronization of room zones configured in HYDRA and room zones configured in B-

COMM.

Maximum occupancy, channel for max. occupancy

Kaba access terminals do not process these two fields.

2.5  Fields of application

This chapter describes common fields of application and provides further information on the configuration

in HYDRA and B-COMM.

2.5.1  One access point with one reader and one door opener

key

This is the default setting for new access points. In the B-COMM Door management, type 2 "Door with 1

subterminal and 1 door opener key (1 slot)" is set.

If there actually is a door opener key, you must additionally activate the button in B-COMM. The inputs and

outputs are assigned by default as described in the table "Default Kaba channel assignment" in the chapter

"Accesses".

2.5.2  One access point with 2 readers (inside and outside)

You use this setting, if you use a reader to check inside and outside (for example at a turnstile) which badge

is authorized to pass in which direction. What is special in this case is that both readers share one access

status contact.

In this case, you must create 2 access points with consecutive reader numbers in HYDRA. Connect both

accesses to the same terminal. Enter the same number for both access points in the field Channel status

to document this case in HYDRA.

In B-COMM, you change to type 3 in the door management: "Door with 2 subterminals and passthrough

control (2 slots)".

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 14 of 20

 Connection of KABA Access Terminals and Readers

2.5.3  One access point without reader

The option "one access point without reader" is applied, if you want to monitor the status of an access point

or open a door permanently for a specified time, although there is no reader for opening the door.

In HYDRA, you have to create the access point and leave the field Reader empty. Instead, you enter the

number of the slot (i.e. the number of the reader, if the access point had a reader) in the field  Channel

opener or in the field  Channel status.  Example: If the  access point  without reader is set to slot 3 in the

parameter editor of B-COMM, you have to enter the value 3 in the field Channel opener in HYDRA.  As an

alternative, you can enter the value 3 in the field Channel status. According to the default Kaba channel

assignment, the status contact must be connected to the input I05 of the access terminal.

In this case, change to type 1 in the B-COMM Door management: "Door with 2 door opener keys (1 slot)".

2.5.4  Security gates

A security gate consists of several access points; only one of the access points can be opened at a time.

In HYDRA, you create the access points of the security gate as independent accesses with consecutive

reader numbers.

In the B-COMM Door management, change to type 4: "Security gate with 2 subterminals and 2 door opener

keys (2 slots)"; or change to type 5: "Security gate with 4 subterminals (4 slots)".

2.5.5  Check attendance in room zone

You must activate the setting in B-COMM that a badge can only enter a room zone, if the badge is not

already  present,  or  a  badge  can  only  leave  a  room  zone,  if  the  badge  is  present.  Please  note  that  the

connector  requires  each  reader  number  to  be  assigned  exactly  to  a  level  number  in  B-COMM.  Do  not

change the assignment in B-COMM.

Room zone settings in HYDRA only refer to the logging of attendance in a room zone. If you control the

attendance of a badge in a room zone in HYDRA, you do not trigger a check at the access terminal.

2.5.6  Anti passback

An  anti  passback  is  used  to  prevent  an  employee  from  passing  their  badge  after  successful  entry  to  a

second person who enters with the same badge.

You can configure an anti passback in the B-COMM Door management for one access point. For a group

of accesses, you configure a collective anti passback in a terminal.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 15 of 20

 Connection of KABA Access Terminals and Readers

2.5.7  Second channel opener

In B-COMM, you can configure if you want to open two doors with one authorized badge:

1.

I/O Mapping

In the input/output mapping table, you connect a free logic output (e.g. BO33) to a free physical

output (e.g. internal no. 13).

2.  Door management

In the Door management go to tab Door 1, group Passing and enter the logic output (in the

example BO33) in the field Relay authorized.

 You can also define the time for the relay activation in this field.

You need to restart the terminal to activate these modifications.

It is not possible to configure a delay time for the second door in B-COMM.

2.5.8

"Office unlocked" in online components

The  option  "Office  unlocked"  offers  the  possibility  to  open  an  access  permanently  using  an  authorized

badge. The access is closed when the badge is read a second time. This functionality is not available with

access terminals of Kaba.

2.5.9  Elevator control

The elevator control offers the possibility to control the authorizations for several access points (floors) via

a reader. Kaba access terminals do not cover this option by default. If you want to implement an elevator

control,  you need a customized solution by Kaba,  a  so-called AVISO routine.  Additionally to the  AVISO

routine, you need the software option AVISO in the terminal according to Kaba's price list. AVISO routines

are subject to specific terminals. If you replace the terminal with another one, you must assign the routine

to the new terminal.

2.5.10  Bag check

Kaba  access  terminals  do  not  provide  the  function  Bag  check.  Use  the  AVISO  routine  to  implement  a

customer-specific solution.

2.5.11  Alarm suppression

If an Alarm suppression is activated in HYDRA, the connector suppresses alarms for the defined period of

time. The connector does not transfer the alarms to HYDRA. The alarm suppression has no effect on an

output that is configured in B-COMM. The alarm is not suppressed.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 16 of 20

 Connection of KABA Access Terminals and Readers

3  B-COMM Control

Menu

System administration  Terminals  B-COMM control

Transaction code

bcctrl

Function authorization

bcctrl

Purpose

The application "B-COMM control" is an application of the system administration. Using this application,

you can check how the B-COMM connector is triggered by the other functions of the server.

An important feature of the application "B-COMM control" is to identify the badges which were subject to a

modification in the MOC and which were - as a consequence - resynchronized with the KABA terminals via

the B-COMM connector.

The application monitors how the connector is triggered. Creating or modifying data records is

reserved to maintenance or service purposes and is only carried out by MPDV or upon MPDV's

instructions.

Requirements

You must install and license the functions required to connect KABA terminals to the B-COMM connector.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 17 of 20

 Connection of KABA Access Terminals and Readers

Field descriptions

Number

Every time a HYDRA function triggers the B-COMM connector, the system automatically generates

a  unique  consecutive  number.  The  B-COMM  connector  processes  the  jobs  in  the  order  of  these

numbers.

Type

Constantly "B-COMM"

Name

Defines the triggered job. Up to now, there is only a single job to be triggered:

UPDATE_BADGE:

This job resynchronizes the badge number entered in the field "Data" with the KABA ZKS

terminals.

Data

With name „UPDATE_BADGE“:

This job resynchronizes the badge number entered in the field "Data" with the KABA ZKS

terminals.

Status

The following statuses can be entered:

"To do"

The connector is going to process the data record within little time.

"In process"

The B-COMM connector is processing the data record.

"Done"

The data record was processed successfully.

"Done error"

An error occurred during processing. In this case, you can find further information in the error log

of the B-COMM connector.

"Cancelled"

You can enter the status "Cancelled" manually for a specific data record. Exceptionally, you assign

the  status  "Cancelled"  manually,  if  the  B-COMM  connector  cannot  process  the  data  record  for

technical reasons.

"Reactivated"

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 18 of 20

 Connection of KABA Access Terminals and Readers

Reserved for future add-ons:

You can assign the status "Reactivated" to a completed data record, if you want to process it again.

Technically, this status is identical to the status "To do".

"New"

Reserved for future add-ons:

The data record exists, but cannot be processed yet.

"Unknown" and

"Done unknown"

Reserved for future add-ons.

Priority

A priority is provided for future add-ons. The current priority value is always 50.

Recipient

Specifies the recipient e.g. in case there are several active B-COMM connectors.

Origin

Optional technical ID of the HYDRA function that has triggered the job.

Created by/Created on

Specifies the connector and time of connection.

Modified by / Modified on

Specifies the last connector and the time of modification.

Description of the fields Name and Data

REFRESH_BADGES

This job updates all badges/master data and the corresponding access authorizations in all terminals.

The connector triggers this job on a  daily basis right  after midnight. As  you cannot assign validity

periods to the data in KABA terminals, you must update the authorizations in the terminals on a daily

basis in case the badges or other configurations expire or are generated in HYDRA.

REFRESH_TERMINAL_TIME_MODELS

The  connector  triggers  this  job  cyclically.  According  to  the  settings  in  the  terminal,  the  connector

reloads the authorizations cyclically. This way, modifications to access time models or opening hours

are communicated to the terminals.

The data field provides the terminal number.

SYNC_BADGE

The HYDRA server triggers this job when you modify badges or access profile assignments, which

are  relevant  to  the  connector.  Using  this  job,  you  promptly  communicate  the  new  badges  to  the

terminals. At the same time, you delete the expired badges in the terminals.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 19 of 20

 Connection of KABA Access Terminals and Readers

The data field provides the badge number.

The following actions trigger this job:

-  You modify the validity status of badges.

-  You modify the HR master data and change the validity status of a badge.

-  You modify access profile assignments and change authorizations currently valid and relevant to

the connected terminals.

-  You modify the validity status or the access profile assignment of a badge via the interface HR-

PDC (mini HR master data).

REFRESH_TERMINAL_BADGES

This job updates all badges/master data and the corresponding access authorizations in a terminal.

The connector triggers this job if it identifies that the option "Reload authorizations" was checked in

HYDRA via the terminal administration function.

The data field provides the terminal number.

RELOAD_TERMINAL_BADGES

This job initializes the terminal and updates all badges/master data and  the corresponding access

authorizations  in  a  terminal.  The  connector  triggers  this  job  if  it  identifies  that  the  option  "Reload

program" was checked via the terminal administration function in HYDRA.

The terminal initialization is based on the commands in the terminal classes.

The data field provides the terminal number.

RESTART_TERMINAL

The connector triggers this job if it identifies that the option "Reboot" terminal was checked in HYDRA

via the terminal administration function.

NEW_BCOMM_TERMINAL

The HYDRA server triggers this job if you create a new terminal whose terminal type is relevant to

the connector. The job is also triggered if the terminal type is modified and hereafter becomes relevant

to the connector.

As a consequence, the connector identifies the new terminal and tries to load the data.

Data retention

You can configure the data retention of this application in the Data management  for the object BCOMM-

CONN  (product  HYD).  The  default  value  for  data  retention  is  70  days.  Once  the  configured  period  has

expired, the data are deleted.

SCS-HCKZ_81.docx

Version: 1.0.23049

Page 20 of 20


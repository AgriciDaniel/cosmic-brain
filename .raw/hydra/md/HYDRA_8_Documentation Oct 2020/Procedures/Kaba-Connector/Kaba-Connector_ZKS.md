Kaba Connector Access Control

1  Kaba Connector Access Control

The Kaba connector for access control connects ZKS hardware by  Kaba  to  HYDRA. The connection is

established via the Kaba communication software B-COMM.

There are different types of Kaba access terminals. Depending on the type of terminal, you can process up

to 16 readers in one terminal.

1.1  Requirements

The communication software B-COMM needs to be licensed and installed in version 3.14 or higher.

Additionally to the B-COMM data communication, you need the software option B-Comm Parameter editor.

We  also  recommend  to  use  the  software  option  B-COMM  User  management.  This  option  offers  the

possibility to protect the user interface of the B-COMM (B-COMM GUI) with a password.

Kaba only supports the badge technologies LEGIC and MIFARE.

If you have terminals in different time zones, you need a HYDRA system for each time zone. The terminals,

the connector and the corresponding HYDRA system must operate in the same time zone.

1.2  Supported terminal types

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

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 1 of 12

Kaba Connector Access Control

1.3  Administration

The connector's installation is not included in  the HYDRA installation. The connector is installed with B-

COMM if required.

In  the  HYDRA  server,  the  connector  runs  as  service  under  Windows  or  as  daemon  under  Linux.  The

connector is automatically started on starting the server. The connector operates independently, if HYDRA

is started or not. It also works offline. If HYDRA is shut down, the connector continues to accept postings

(e.g. access logs) and stores this data on the hard drive. Once HYDRA is started, the connector transfers

the postings to HYDRA.

1.4  Configurations

The  access  control  configurations  are  partly  made  in  HYDRA  and  partly  in  B-COMM.  While  access

authorizations are defined in HYDRA, the hardware related settings are made via B-COMM. The following

chapters describe the configurations and settings in HYDRA.

1.4.1  Access authorizations

In  HYDRA,  access  authorizations  are  configured  via  Access  profiles  and  their  assignment  to  badges

(Access  profile  assignments).  For  each  access  profile,  you  define  in  the  Access  authorizations  which

Access groups in combination with a defined access time model have the authorization to open the Access

points of this access group.

1.4.1.1  Badges and access profile assignments

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

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 2 of 12

Kaba Connector Access Control

Access terminals of Kaba do not support validity periods for badges. For this reason, the system

identifies  access  authorizations  on  a  daily  basis  at  midnight  and  communicates  possible

modifications  to  the  terminals.  This  might  be  an  employee's  first  day  in  the  company  or  an

employee who left the company the previous day. If an access terminal was offline for a longer

time, the modifications are only communicated to the terminal when it is online again and when

the time defined in the field Cyclic loading has elapsed (go to: Terminal configuration - tab HR

functions - Cyclic loading).

The access terminals of Kaba do not process the times in the Badge fields Valid from and Valid

until.

1.4.1.2  Access time models

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

1.4.1.3  Access time models for opening hours

The connector processes the following fields in the Access periods of the Access time models that are used

for the Opening hours:

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 3 of 12

Kaba Connector Access Control

Badge required

If this option is checked in an access period, you need a valid badge including access authorization

to open the access. If this option is not checked, there is a so called "permanent activation", i.e. the

door opener's relay is permanently activated.

Office unlocked

The function "Office unlocked" is not available with access terminals of Kaba.

1.4.1.4  Access time models for access authorizations

The connector processes the following fields in the Access periods of the Access time models that are used

for the Access authorizations:

PIN code required

Once the badge is read, a PIN code might be required. When using access terminals of Kaba, control

the entry of the PIN code via the access time model of the badge's access authorizations and not via

the opening hours. Therefore, it depends on the previously read badge, if you also have to enter a

PIN code.

1.4.1.5  Configuration of PIN code length

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

1.4.1.6  Access authorizations of access profiles

In the Access authorizations of the Access profiles the following fields are not processed:

Office unlocked

The function "Office unlocked" is not available with access terminals of Kaba.

Bag check

The function "Bag check" is not available with access terminals of Kaba.

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 4 of 12

Kaba Connector Access Control

1.4.1.7

Public holidays

The connector transfers the Public holidays together with the access authorizations to the access terminals.

The terminal always receives the following 8 public holidays. The period covered is up to one year.

Access terminals of Kaba only process one public holiday calendar per terminal. As a  consequence, the

public  holidays  are  identical  for  all  access  points  of  a  terminal.  The  access  terminal  identifies  all  public

holidays which do not have an entry in the field Location or whose location matches the one of the terminal

according to the Terminal configuration. The location defined in the Access group is not relevant for access

terminals of Kaba.

1.4.2  Hardware related configurations

As far as the hardware related configurations are concerned, the access terminals of Kaba only process

few settings of HYDRA. The majority of the configurations are made in the parameter editor of the B-COMM

GUI.

The  following  chapters  describe  the  HYDRA  configurations  having  an  effect  on  the  access  terminals  of

Kaba.

1.4.2.1

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

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 5 of 12

Kaba Connector Access Control

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

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 6 of 12

Kaba Connector Access Control

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

access authorizations in the terminal are first deleted and then reloaded. During the data  transfer,

the  badges  with  authorization  might  not  get  access  for  several  minutes.  In  addition,  the  access

terminal is restarted and the readers do not work for several minutes.

Reload authorizations

If  you check the option  Reload  authorizations, all modifications to  accesses, access time models,

opening hours and public holidays are transferred to the terminal at the latest after the end of the

time entered in the field Cycle duration of status messages (see field Cyclic loading in the tab HR

functions of the application Terminal configuration).

1.4.2.2  Access points

You have to create all access points in HYDRA and assign them to an access group. This chapter describes

the fields in the Access point which are processed when connected to the connector.

The connector cyclically loads the access points of a terminal (see field Cyclic loading in the tab

HR functions in the Terminal configuration). Once the access point is created or modified, the

modification is processed at the latest after the time period entered in the Terminal configuration.

Configurations in the tab Access point

Active

The connector only processes active access points. E.g., the connector rejects access logs of inactive

access points.

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 7 of 12

Kaba Connector Access Control

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

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 8 of 12

Kaba Connector Access Control

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

1.4.2.3  Room zones

The connector logs which badges are present in specified Room zones, if you define the fields in the access

configuration as Entrance to room zone or Exit from room zone.

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 9 of 12

Kaba Connector Access Control

The following fields in the configuration of room zones are not processed.

Plausibility check when entering, Plausibility check when exiting

Checking these two options does not have any effect on the behavior of the Kaba access terminals.

If you want to check, if a badge is already present in a room zone, you can configure this in B-COMM.

In this case, all entrances and exits of the room zone must be connected to one access terminal.

There is no synchronization of room zones configured in HYDRA and room zones configured in B-

COMM.

Maximum occupancy, channel for max. occupancy

Kaba access terminals do not process these two fields.

1.5  Fields of application

This chapter describes common fields of application and provides further information on the configuration

in HYDRA and B-COMM.

1.5.1  One access point with one reader and one door opener

key

This is the default setting for new access points. In the B-COMM Door management, type 2 "Door with 1

subterminal and 1 door opener key (1 slot)" is set.

If there actually is a door opener key, you must additionally activate the button in B-COMM. The inputs and

outputs are assigned by default as described in the table "Default Kaba channel assignment" in the chapter

"Accesses".

1.5.2  One access point with 2 readers (inside and outside)

You use this setting, if you use a reader to check inside and outside (for example at a turnstile) which badge

is authorized to pass in which direction. What is special in this case is that both readers share one access

status contact.

In this case, you must create 2 access points with consecutive reader numbers in HYDRA. Connect both

accesses to the same terminal. Enter the same number for both access points in the field Channel status

to document this case in HYDRA.

In B-COMM, you change to type 3 in the door management: "Door with 2 subterminals and passthrough

control (2 slots)".

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 10 of 12

Kaba Connector Access Control

1.5.3  One access point without reader

The option "one access point without reader" is applied, if you want to monitor the status of an access point

or open a door permanently for a specified time, although there is no reader for opening the door.

In HYDRA, you have to create the access point and leave the field Reader empty. Instead, you enter the

number of the slot (i.e. the number of the reader, if the access point had a reader) in the field  Channel

opener or in the field  Channel status.  Example: If the  access point  without reader is set to slot 3 in the

parameter editor of B-COMM, you have to enter the value 3 in the field Channel opener in HYDRA.  As an

alternative, you can enter the value 3 in the field Channel status. According to the default Kaba channel

assignment, the status contact must be connected to the input I05 of the access terminal.

In this case, change to type 1 in the B-COMM Door management: "Door with 2 door opener keys (1 slot)".

1.5.4  Security gates

A security gate consists of several access points; only one of the access points can be opened at a time.

In HYDRA, you create the access points of the security gate as independent accesses with consecutive

reader numbers.

In the B-COMM Door management, change to type 4: "Security gate with 2 subterminals and 2 door opener

keys (2 slots)"; or change to type 5: "Security gate with 4 subterminals (4 slots)".

1.5.5  Check attendance in room zone

You must activate the setting in B-COMM that a badge can only enter a room zone, if the badge is not

already  present,  or  a  badge  can  only  leave  a  room  zone,  if  the  badge  is  present.  Please  note  that  the

connector  requires  each  reader  number  to  be  assigned  exactly  to  a  level  number  in  B-COMM.  Do  not

change the assignment in B-COMM.

Room zone settings in HYDRA only refer to the logging of attendance in a room zone. If you control the

attendance of a badge in a room zone in HYDRA, you do not trigger a check at the access terminal.

1.5.6  Anti passback

An  anti  passback  is  used  to  prevent  an  employee  from  passing  their  badge  after  successful  entry  to  a

second person who enters with the same badge.

You can configure an anti passback in the B-COMM Door management for one access point. For a group

of accesses, you configure a collective anti passback in a terminal.

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 11 of 12

Kaba Connector Access Control

1.5.7  Second channel opener

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

1.5.8

"Office unlocked" in online components

The  option  "Office  unlocked"  offers  the  possibility  to  open  an  access  permanently  using  an  authorized

badge. The access is closed when the badge is read a second time. This functionality is not available with

access terminals of Kaba.

1.5.9  Elevator control

The elevator control offers the possibility to control the authorizations for several access points (floors) via

a reader. Kaba access terminals do not cover this option by default. If you want to implement an elevator

control,  you need a customized solution by Kaba,  a  so-called AVISO routine.  Additionally to the  AVISO

routine, you need the software option AVISO in the terminal according to Kaba's price list. AVISO routines

are subject to specific terminals. If you replace the terminal with another one, you must assign the routine

to the new terminal.

1.5.10  Bag check

Kaba  access  terminals  do  not  provide  the  function  Bag  check.  Use  the  AVISO  routine  to  implement  a

customer-specific solution.

1.5.11  Alarm suppression

If an Alarm suppression is activated in HYDRA, the connector suppresses alarms for the defined period of

time. The connector does not transfer the alarms to HYDRA. The alarm suppression has no effect on an

output that is configured in B-COMM. The alarm is not suppressed.

Kaba-Connector_ZKS.docx

Version: 1.0.20995

Page 12 of 12


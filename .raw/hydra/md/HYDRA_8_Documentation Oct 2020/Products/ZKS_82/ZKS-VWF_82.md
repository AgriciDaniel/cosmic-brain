Manual

Access Control Management
Functions
ZKS-VWF 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Access Control Management Functions

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 2 of 35

Access Control Management Functions

Contents

1  Access Control Management Functions - Overview .................................... 4

2  Public Holidays ............................................................................................. 6

3  Access Time Models .................................................................................... 8

4  Access Periods .......................................................................................... 10

5  Access Points ............................................................................................. 12

6  Access Groups ........................................................................................... 18

7  Opening Hours ........................................................................................... 20

8  Access Profiles ........................................................................................... 22

9  Access Authorizations ................................................................................ 24

10  Badges ....................................................................................................... 26

11  Access profile assignments ........................................................................ 32

ZKS-VWF_82.docx

Version: 1.0.23049

Page 3 of 35

Access Control Management Functions

1  Access Control Management Functions - Overview

Purpose

This  function  package  includes  functions  required  for  the  configuration  of  access  authorizations  for  the

access control system.

Implementation notes

You use the function package if:



you want to use the HYDRA access control system (ZKS) to assign authorizations for accesses.

Integration

Further function packages of the access control system are based on the configurations of this function

package.

Features

  Badges

o  Editing badges including validity period

o  Assigning a picture to the badge

o  Printing badge lists including free selection of the fields to be printed

o  Possibility of keeping a badge history that allows tracing of badge assignments

o  Automatic synchronization of badges in case of modifications in the HR master data (e.g.

name changes, leaving employees)

o  Assigning  badges  to  responsibility  areas  to  control  which  users  may  view  and  edit  the

badges and their data.

  Accesses

o  Configuration of accesses including assignment of hardware properties (reader address,

opener contact, input for status monitoring...)

  Access groups

o  Collection of accesses to form access groups with identical settings and authorizations

  Access time models

o  Access time models to control access authorizations for weekdays and public holidays

  Public holiday calendar

o  Public holiday calendar presenting differences in each location

  Opening hours

o  Definition  of  the  times  when  an  access  point  can  be  opened  and  when  accesses  and

access attempts are logged.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 4 of 35

Access Control Management Functions

  Access profiles

o  Definition  of  access  authorizations  via  access  profiles  that  are  assigned  to  the  badges.

Modifications  can  be  made  with  little  effort.  You  needn't  modify  the  authorizations  of

every single badge.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 5 of 35

Access Control Management Functions

2  Public Holidays

Summary

Menu

Master Data  Access Control  Public Holidays

Transaction code

acph

Function authorization

acph

This  application  allows  for  public  holidays  to  be  configured  for  the  access  control  function.  Different

authorizations and access  times may be defined for the public holidays and other special days that are

defined here.

Field Descriptions

Location

Location  where  this  public  holiday  applies.  If  this  field  is  empty  the  public  holiday  applies  for  all

locations. As public holidays normally depend on the (federal) state/region, the corresponding state

may also be entered in this field. The location of an access point is entered in the assigned access

group.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 6 of 35

Access Control Management Functions

Public holiday type

There  are  three  different  types  of  public  holidays:  “public  holiday”,  “important  public  holiday”  and

“other day off”. Different periods may be assigned to these three types within access time models.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 7 of 35

Access Control Management Functions

3  Access Time Models

Summary

Menu

Master Data  Access Control  Access Time Model

Transaction code

actm

Function authorization

actm

An  access  time  model  includes  one  or  several  access  periods  when  access  points  may  be  opened  or

people are allowed to enter the corresponding room. Access time models are used as  opening hours for

access groups as well as for the definition of access authorizations in access profiles.

Field Descriptions

Valid from, valid until

Validity period of the access time model. If an access time model is to be changed as of a specific

date,  one  has  just  to  copy  the  existing  access  time model  to  the  corresponding  “valid  from”  date.

The  “valid  until”  date  of  the  previous  entry  is  then  automatically  set  to  one  day  prior  to  the  new

validity start date.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 8 of 35

Access Control Management Functions

Toolbar

Copy

The  below  dialog  opens  to  copy  an  access  time  model.  The  number,  validity  start  date  and  the

designation of the new access time model may be entered in this dialog:

 Access periods

Displays and edits the access periods for the selected access time model.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 9 of 35

Access Control Management Functions

4  Access Periods

Overview

Menu

Master data  Access Control  Access time models  Access periods

Transaction code

acts

Function authorization

acts

You can define the periods when entrances are permitted for single weekdays and public holidays within

the access periods of an access time model.

Field descriptions

Time, to

Start and end time of the access period.

Monday, Tuesday, ..., other days off

Weekdays  for  which  the  access  period  applies.  In  addition  to  weekdays,  you  can  define  access

periods for the three types of public holidays.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 10 of 35

Access Control Management Functions

Badge required, PIN code required

Use these two buttons to specify whether the badge and/ or the PIN code is to be queried within the

period. If both options are disabled the door is permanently open. These two options only apply, if

you use the access time model to assign opening hours for an access group. The system does not

integrate these options, if you assign access authorizations.

You can only modify these two fields if the license Extended access control (ZKS-EZK) is

available.

Open access (Office unlocked)

You  can  only  enable  an  open  access  (office  unlocked)  for  the  entrance  during  access  periods

where  the  office  unlocked  option  is  set  in  the  opening  hours  of  the  access  group.  During  these

periods, an authorized badge can permanently open and close the access. When this period ends,

the  system  automatically  disables  an  “office  unlocked”  option  that  might  still  be  enabled.  In  the

access  authorizations,  you  can  configure  if  a  badge  should  be  authorized  for  the  "open

access"/"office unlocked" option.

The “office unlocked” field is only available if the licenses Extended access control (ZKS-

EZK) or the Connection of offline components (ZKS-SOK) are available.

Logging

Use this option to specify

- if logging takes place within the access period or

- if access attempts or

- access attempts and actual entries are recorded.

Kaba  Benzing  terminals  do  not  support  this  logging  option.  Kaba  Benzing  terminals

always log all entries and entry attempts.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 11 of 35

Access Control Management Functions

5  Access Points

Overview

Menu

Master data  Access control  Access points

Transaction code

acpo

Function authorization

acpo

The  access  configuration  includes  different  settings  for  the  access.  The  reader’s  address  and  to  which

terminal  the  access  is  connected  is  defined  here,  for  example.  This  application  also  provides  for  the

assignment of the access to an access group.

Field descriptions for the “access point” tab

Active

Specifies whether or not the access is active. Entrance is not permitted at an inactive access point.

Offline component

Offline  components  are  access  readers  without  permanent  connection  to  the  HYDRA  server.

Authorizations and access logs are synchronized via palm. This option has to be checked for offline

components to enable synchronization with the palm.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 12 of 35

Access Control Management Functions

Trigger clocking

This  option  defines  whether  or  not  a  clock-in  is  to  be  generated  automatically  when  entering  this

access or a clock-out when exiting this access. An auto-status clocking is generated when passing

this access.

Access type

Specifies whether it is an entry, exit, passage or entry without checking. Any badge may open the

access, provided that no checking is performed at this entrance.

Access group

Access  group  to  which  the  access  is  assigned.  An  access  can  only  be  assigned  to  one  access

group. Access points having the same access authorizations and opening hours may be combined

in an access group.

Terminal

Number  of  the  terminal  to  which  the  access  is  connected.  A  maximum  of  nine  entries  may  be

assigned to terminals of the type CT-385 and CT-365.

Reader

Number  of  the  reader  that  opens  the  door.  The  combination  of  terminal  and  reader  results  in  a

unique  “hardware  address”.  For  this  reason,  this  combination  has  to  be  unique  throughout  the

system. When  it  comes  to time  recording  terminals  to  which  additional  readers  are  connected  for

access control, reader 1 is reserved for time & attendance and must not be assigned to an access

point of this terminal.

The access may also be monitored without a reader, using an input of the machine interface.  The

“reader” field is empty in this case.

Field descriptions for the “settings” tab

Channel: opener (normally closed contact)

Channel number of the terminal to which an opener is connected. The value “0” is entered if it does

not exist. This processing is only relevant to readers by MBB Gelma and for access points that are

connected to a machine interface. The opener of the reader is set automatically for remote readers

of the ORIS type series (irrespective of this configuration).

Relay time: opener (normally closed contact)

Duration of the signal that is used for triggering the opener.

The  maximum  relay  time  takes  nine  seconds  for  remote  readers  of  the  ORIS  type  series.  The

terminal ignores larger entries and changes them automatically to nine seconds.

Channel opener 2 (normally closed contact)

Second channel for the opener to which a webcam or an electronic door opener can be connected,

for example.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 13 of 35

Access Control Management Functions

Relay time: opener 2 (normally closed contact)

Duration of the signal that is used for triggering the second channel for the opener.

Delay time: opener 2 (normally closed contact)

A  delay  time  can  be  configured  for  the  second  channel  of  the  opener.  Therefore,  it  is  possible  to

trigger an electronic door opener only once the door opener relay has actually been activated. The

delay time can be entered in tenths of a second.

Channel shutter (normally open contact)

Channel number of the terminal to which a shutter is connected. Zero is entered if it is not available.

The shutter is a door contact that is used to close the door after the maximum time that is configured

for the “open” status has passed.

This channel is not set, once the permanent door opening has expired.

Relay time: shutter (normally open contact)

Duration of the signal that is used for triggering the shutter.

Channel status

Channel  number  of  the  terminal  where  the  signal  has  arrived  indicating  whether  the  access  is

opened or closed or 0 if it does not exist.

Channel opening pushbutton

Number  of  the  channel  where  a  pushbutton  for  opening  a  door  is  connected.  This  allows  for  the

authorizations  of  the  badge  to  be  checked  when  entering  the  room  and  to  open  it  using  a

pushbutton when exiting the room. The opening/unlocking pushbutton can only be connected to a

machine interface or an MBB reader.

If  the  pushbutton  for  opening  a  door  is  connected  to  a  machine  interface,  the  offset  20

used  for  machine  interface  channels  is  automatically  replaced  by  the  terminal  program

and  set  to  offset  60.  This  makes  sure  that  apart  from  reading  the  current  status  of  the

pushbutton via the electrical input of the machine interface, it is also identified if the button

has been pressed briefly and released immediately since the last communication with the

reader.  Channel  69  displayed  in  the  terminal  program  corresponds  to  the  machine

interface channel 9.

Channel sabotage

Channel number of the terminal where the monitoring signal “sabotage” has arrived or 0 if it does

not  exist.  This  channel  indicates  when  the  terminal  or  badge  reader  (subject  to  the  model)  is

opened without permission.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 14 of 35

Access Control Management Functions

Maximum duration allowed for "open" status

The alert “opened too long” is triggered if an access, which was opened with permission, is opened

longer than the time specified here. If 0 is entered in this field the terminal assumes that the door

frame  contact  is  not  connected  and  suppresses  all  alerts  referring  to  the  opening  time  of  the

access.

The maximum time for opening the door amounts to 99 seconds for remote readers of the

ORIS  type  series  and  Kaba  Benzing  terminals.  The  terminal  ignores  larger  entries  and

automatically sets them to 99 seconds.

Block badge after successful access (anti pass back)

Within the specified time it is impossible to open all entries of an access group that are connected

to  the  same  terminal  with  the  same  badge.  A  value  that  is  greater  than  0  has  to  be  entered  to

enable this processing. This function is only provided by terminals of the type CT-385 (not by Kaba

Benzing terminals).

Report access status

This  selection  defines  whether  or  not  the  access  point  status  is  to  be  sent  to  the  HYDRA  server.

Possible  values  are  “none”  or  “open  and  closed”.  Provided  that  the  “alert  system”  function  (ZKS-

ALS) has been licensed, the selection is extended by “alarms only” and “all”. The options “open and

closed” as well as “all” result in an enhanced server communication and should only be selected for

entries  that  are  less  frequently  opened  or  where  the  “open”  status  is  to  be  monitored  by  the

escalation management function.

Cycle duration for reporting the access status

The current access status is sent to the HYDRA server, once the specified time has expired.

Reload access configuration

The access configuration is downloaded from the HYDRA server to the terminal after the specified

time has expired. If several entrances are connected to a terminal all access points are configured

with the cycle duration of the access point assigned to the least access number.

Reload authorizations

Authorizations  are  downloaded  from  the  HYDRA  server  to  the  terminal,  once  the  time  specified

here has expired. If several access points of the same access group are assigned to a terminal this

setting  is  only  processed  by  the  access  with  the  lowest  access  number  of  the  access  group  and

also applies for the other access points.

The  values  of  all  channels  to  be  configured  (opener,  closer/shutter,  status,  sabotage)  range

between 1 ... 2, 21 ... 49 or 91 ... 92. The channels 1 + 2 are internal reader relays, while the

channels  21 ... 49  are  set  on  a  machine  interface  that  might  be  connected  (channel  21  =

machine  interface  channel  1,  ...)  or  that  set  the  corresponding  relays  for  Kaba  Benzing

ZKS-VWF_82.docx

Version: 1.0.23049

Page 15 of 35

Access Control Management Functions

terminals of the type 9290. The channels 91 and 92 are internal inputs and outputs of Windows

terminals.  With  DOS  terminals  internal  terminal  inputs  and  outputs  can  be  addressed  via  the

channels 1 and 2. 0 is to be assigned to a channel that is not to be used.

Field descriptions for the “advanced settings” tab

Trigger alarm

Defines  whether  or  not  the  alarm  is  to  be  triggered  on  the  configured  channel.  If  this  field  is  not

activated the alarm is not triggered.

Channel alarm

Number  of  the  terminal  channel  where  the  alarm  is  output.  A  siren  might  be  connected  to  this

channel,  for  example.  The  internal  relays  1+2  at  the  terminal  or  machine  interface  outputs  (entry

21-49, whereas 21 corresponds to the machine interface channel 1) may be triggered.

Delay time alarm

In case a delay time is entered, the “open w/o permission" status is no longer set. Instead of this,

the access switches to the “opened too long” status after this delay time and the maximum time for

opening the door have expired.

Acoustic alarm at reader

Defines  whether  or  not  an  acoustic  alarm  is  to  be  triggered  if  one  of  the  statuses  “opened  w/o

permission”, “opened too long” or “sabotage” is available. This function is only provided by readers

of the type series ORIS and S6D at Windows terminals as of ctwin version 7.2.3.67 onwards.

Channel alarm system

Number  of  the  terminal  channel  to  which  an  alarm  system  is  connected.  Access  attempts  are

generally rejected if the alarm system is activated and this input is set.

The  fields  of  the  “alarm  configuration”  are  only  available,  provided  that  the  “alarm  system”

license (ZKS-ALS) has been purchased.

Entrance to room zone

A room zone that is entered through the access point may be entered in this field.

Exit from room zone

A room zone that is exited through the access point may be entered in this field.

Floor

A separate access can be created for each floor when an elevator control is in use. Consequently,

different  authorizations  may  exist  for  each  floor.  The  access  points  of  an  elevator  control  are

connected  to  the  same  reader  and,  as  a  result  of  this,  the  same  value  is  entered  in  the  fields

“terminal” and “reader”. The floor number must be unique at a reader.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 16 of 35

Access Control Management Functions

Security gate with access points

If  an  access  is  entered  in  this  field,  the  currently  selected  access  as  well  as  the  entered  access

build a security gate. When it comes to a security gate, only one of the assigned access points may

be opened at a time. The entries of a security gate have to be connected to the same terminal.

The fields in the groups “room zone monitoring”, “elevator control” and “security gate function”

are only available if the license “room zone, elevator control/security gate function” (ZKS-RAS)

has been purchased.

Channel signal (bag check)

Number  of  the  terminal  channel  where  a  signal  is  output,  when  a  bag  check  is  to  be  made.  A

rotating flashing beacon may be connected, for example, to this channel.

Relay time: signal (bag check)

Time in seconds of the signal that is used to activate the rotating flashing beacon.

The  fields  in  the  “bag  check”  group  are  only  available  if  the  “personnel  check”  license  (ZKS-

PKT) has been purchased.

Channel biometry, validity period

A stand-alone biometric system can be connected to  HYDRA  access control at this channel. The

entrance is only opened if an authorized badge is read within the specified "validity period" after the

biometric hardware has set the input (contact).

ZKS-VWF_82.docx

Version: 1.0.23049

Page 17 of 35

Access Control Management Functions

6  Access Groups

Summary

Menu

Master data  Access control  Access groups

Transaction code

Function authorization

acgr

acgr

This application manages the access groups existing in the access control system. One or several entries

may be assigned to an access group.  Opening hours as well as access authorizations are assigned for

each access group.

Field Descriptions

Location

Location of the access group. The “location” field is an optional field. Public holidays are assigned

using the “location” field, provided that different public holidays exit for different locations.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 18 of 35

Access Control Management Functions

If the access time model 1 is available an opening time that includes this access time model is

created automatically, when a new access group is created.

Toolbar

 Accesses

Shows the entries for the selected accesses group.

 Opening hours

Shows the opening hours for the selected access group.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 19 of 35

Access Control Management Functions

7  Opening Hours

Summary

Menu

Master Data  Access Control  Opening Hours

Transaction code

acoh

Function authorization

acoh

Opening hours are times when an entrance is released after having checked access authorizations.  It is

impossible to open an entrance/access of this group  outside of the opening hours for an access group.

Access time models are assigned to access groups to define opening hours.

Field Descriptions

Access time model

Access time model to define the access periods when accesses to the access group are allowed.

Valid from, valid until

Validity period for opening times. If the end of the validity period is not defined, opening hours are

valid without restrictions.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 20 of 35

Access Control Management Functions

Only one opening time may be active for an access group. Different opening times may only be

defined for an access group if these periods do not overlap.

If  no  opening  hours  are  defined  for  an  access  group,  doors  of  this  access  group  cannot  be

opened.

When a new access group is created, an opening time with the access time model 1 is defined

automatically, provided this model is at all available.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 21 of 35

Access Control Management Functions

8  Access Profiles

Summary

Menu

Master Data  Access Control  Access Profiles

Transaction code

acpr

Function authorization

acpr

Access authorizations are defined by way of access profiles. When access profiles are created, they may

be  distinguished  either  by  the  location  (e.g.  administration,  hall  1,  warehouse,  etc.)  or  by  different

activities  (e.g.  employees  working  in  production,  janitor,  system  administrator,  etc.).  Several  access

profiles may be assigned to a badge.

Access  profiles  provide  the  advantage  that  changes  to  the  profile  affect  all  badges  that  are

assigned to it. Consequently, it is not required to revise each badge individually.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 22 of 35

Access Control Management Functions

Toolbar

Copy

The following dialog opens to copy an access profile:

Along with the access profile, the access authorizations of the selected profile are copied

as well.

Access authorizations

Displays and configures access authorizations for the selected access profile.

 Access profile assignment

Opens access profile assignments for the selected access profile.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 23 of 35

Access Control Management Functions

9  Access Authorizations

Overview

Menu

Master Data  Access Control  Access Profiles  Access Authorizations

Transaction code

acau

Function authorization

acau

Access authorizations are defined for access profiles by assigning access groups and the corresponding

access time model.

Field Descriptions

Valid from, valid until

The  field  for  the  validity  start  date  of  an  access  authorization  has  always  to  be  filled  out,  but  the

field for the validity end date may be empty. In this case, the access authorization is valid without

any restriction.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 24 of 35

Access Control Management Functions

Office unlocked

This  option  specifies  whether  or  not  the  badge  may  unlock  the  accesses  of  the  entered  access

group. Offices can only be unlocked during access time periods coinciding with the  opening hours

of the access group and for which the option "office unlocked" is enabled.

Bag check

This option defines whether or not a possibly configured bag check/search is to be carried out for

people opening an access due to this access authorization. This option allows for a bag check to be

suppressed for certain people.

The “bag check” field is only available if the “personnel checking” license (ZKS-PKT) is active.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 25 of 35

Access Control Management Functions

10  Badges

Overview

Menu

Human resources management  Access control  Badges
Master data  Access control  Badges

Transaction code

badg

Function authorization

badg

You use this application to manage the existing badges and the respective owners.

Available user fields

Where

Object type/user field key

Source (type)

Table and detail view

KNR/SYSTEM

Badges (HR)

How to configure user fields?

Which user field types are available?

ZKS-VWF_82.docx

Version: 1.0.23049

Page 26 of 35

Access Control Management Functions

If you create a person, a badge is automatically created for this person, if a badge number has

been entered in the HR master data.

Field descriptions

Badge

The badge number can include numbers (0-9) and the letters A-F.

Badge type

Define the badge type. The following badge types are available:

Employee

An employee's badge

Replacement  An employee's replacement badge

Visitor

Free

Visitor's badge

Free badge that is currently not used. It can be assigned to a new person.

The  badge  types  Replacement,  Visitor  and  Free  are  only  available,  if  the  license

Advanced  access  control  (ZKS-EZK)  or  Management  of  visitor  badges  (ZKS-BAV)  is

available.

Person, company

In case  of staff badges and replacement badges,  you must assign the badges  to a  person and a

company. Visitor badges are created with the personnel number 0.

Last name, first name

Enter the person's last name and first name. If you  select a personnel number, the two fields are

automatically populated with the person's names from the HR master data.

PIN code, Confirmation

If you enter a PIN code in the reader, the badge cannot be misused by unauthorized persons. This

function is not available for all terminal types. For Kaba Benzing terminals, this PIN code must be

numeric and requires four digits. If you change the PIN code, the digits are masked by asterisk and

must be entered a second time in the field Confirmation.

Responsibility area

You use the responsibility area to control the users who have access to a badge.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 27 of 35

Access Control Management Functions

Valid from, to

You  can  define  a  validity  period  for  a  badge.  If  you  do  not  enter  an  end  date,  the  validity  of  the

badge  is  unlimited.  You  can  restrict  the  validity  time  on  the  first  and  last  day  of  validity  using  the

time  fields.  The  validity  time  is  only  processed  by  terminals  of  type  CT-385.  You  can  restrict  the

validity time, but you cannot create a badge for multiple time periods of one specific day.

Input with keyboard

This  option  specifies  if  you  can  enter  the  badge  number  instead  of  using  the  biometric  data  for

identification. You can use this option if the biometric data cannot be read.

For security reasons, we recommend to use this option only in combination with additional

PIN code entry.

Input with badge

This  option  specifies  if  you  can  read  the  badge  via  RFID  instead  of  using  the  biometric  data  for

identification. You can use this option if the biometric data cannot be read.

Block badge

You use this option to block a badge. Blocked badges are not allowed to enter any access points.

They are used to document the previous function and user.

Comment, Comment 2

You  can  enter  any  information  in  the  comment  fields.  For  example,  it  might  be  useful  to  enter  a

comment for visitor badges (company and purpose of the visit).

Contact person

For visitor badges, you can store the personnel number of the contact person.

Number plate

You can store the number plate of the badge owner in this field.

Badge handout, Badge return

Point in time when the badge is issued or returned.

Picture recording

Point in time of the last image assigned to the person.

Badge printing

Point in time when the function Badge printing was last called for this badge.

Badge layout

In this field, enter the badge layout to be used for this badge.

Badge layout printed

This field shows the badge layout that was last used for this badge.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 28 of 35

Access Control Management Functions

Additional info

In tab Additional info, up to 30 fields are available. Name, length and position of the user fields can

be configured in the Configuration of badge fields.

Toolbar

 Edit all selected badges

Function authorization: badg.massedit

You can use this function to edit data of several badges at the same time. You can select up to 10

HR master data fields and assign a value:

 Badge handout

Function authorization: badg.handout

Opens a dialog to enter the point in time when the badge is issued. The point in time of the badge

generation is preassigned.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 29 of 35

Access Control Management Functions

 Badge return

Function authorization: badg.return

Opens  a  dialog  to  enter  the  point  in  time  when  the  badge  is  returned.  Returned  badges  are

automatically blocked and the validity end date is set to today if the end date is empty or the date is

in the future.

 Badge printing

Function authorization: badg.print

Opens a window to print the selected badges.

 Modify image

Function authorization: badg.picture

To assign an image, the following dialog opens:

 HR master data

Calls the HR master data.

 Access authorizations

Shows the Access profile assignments for the selected badge.

 Access log

Calls the Access log of the selected badge.

 Room zone overview

Calls the Room zone overview of the selected badge.

 Badge layouts

Function authorization: bala

Calls the configuration of the Badge layouts.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 30 of 35

Access Control Management Functions

 Report designer

Function authorization: bala

Design of the selected badge layout. You must first request data, then you can call the function.

Integration

Synchronization of HR master data and badges

If you make changes in the HR master data, specific badge data are synchronized.

Company

Name and first name

PIN code

Picture

Additional information (configured HR master data and badge fields)

Date of joining and date of leaving

The system only synchronizes the additional information that has the same designations, data types and

field formats.

Badges that were valid in the past are not changed. If you change name, company or an additional info

field  in  the  HR  master,  a  new  version  is  created  in  the  badges,  if  required.  Picture  and  PIN  code  are

synchronized for all versions.

If the date of joining specified in the HR master data und the start of validity of a badge were identical, the

start of validity changes if you change the date of joining. The same applies for the date of leaving in the

HR master data.

For the date of joining and leaving, there are some restrictions. For example, you cannot change dates of

the past and the validity time of badge versions must not overlap. The badge version is deleted if the start

of validity of a badge is later than the end of validity after synchronization of the date of joining or leaving.

Start and end of a badge validity can be moved, but not to an earlier point in time than the start of validity

and not to a later point in time than the end of validity specified in the changed HR master data version.

And also vice versa, changed badge data is synchronized with specific data fields in the HR master data.

For further details, refer to the documentation of the HR master data.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 31 of 35

Access Control Management Functions

11  Access profile assignments

Overview

Menu

Human  resources  management    Access  control    Access  profile
assignments
Master data  Access control  Access profile assignments

Transaction code

acpa

Function authorization

acpa

You  use  Access  profiles  to  define  Access  authorizations.  You  then  assign  the  access  profiles  to  the

Badges. In doing so, you define the authorizations of the badges. You can assign several access profiles

to one badge.

Selection criteria

If  you  use  selection  criteria  for  the  fields  of  the  badge  (e.g.  the  personnel  number),  the  system  always

uses the selection criteria of the badge version that is valid today.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 32 of 35

Access Control Management Functions

Checking the responsibility area authorization

If you display the list of access profile assignments, the list shows the access profile assignments with a

validity period that includes at least one badge version that authorizes the user to "show".

If you edit the access profile assignments, the system checks if at least one badge version is available in

the validity period of the access profile assignment that authorizes the user to "Use". The user must also

be assigned the option "Use" for the responsibility area of the access profile.

If  you  copy  from/to  a  badge,  the  system  only  checks the  responsibility  area  of  the  badges,  and  not  the

access  profiles.  If  you  use  the  function  "Copy  all  selected  entries",  the  system  checks  each  individual

access profile assignment. It is the same check than if you create individual access profile assignments.

Field descriptions

Valid from, valid until

You  can  use  these  two  fields  to  limit  the  validity  period  of  the  access  profile  assignment.  If  you

leave these fields empty, the validity of the assignment is not restricted.

Fields of the badge (name, personnel number,...)

The fields of the badge version that is valid today are shown.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 33 of 35

Access Control Management Functions

Toolbar

 Copy all selected entries

Function authorization: acpa.masscopy

Use this function to copy several access profile assignments at the same time:

You can use the checkboxes to enable each of the 4 fields  Badge, Access profile, Valid from and

Valid until. If  you copy the  entries selected in the table, the system only copies the fields that are

enabled.

 Edit all selected entries

Function authorization: acpa.massedit

Use this function to edit several access profile assignments at the same time:

You  can  use  the  checkboxes  to  enable  each  of  the  3  fields  Access  profile,  Valid  from  and  Valid

until.  If  you  edit  the  entries  selected  in  the  table,  the  system  only  takes  over  the  fields  that  are

enabled.

ZKS-VWF_82.docx

Version: 1.0.23049

Page 34 of 35

Access Control Management Functions

ZKS-VWF_82.docx

Version: 1.0.23049

Page 35 of 35


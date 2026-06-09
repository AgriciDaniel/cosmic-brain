Access Points

1  Access Points

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

MOC_AccessPoints.docx

Version: 2.0.18468

Page 1 of 6

Access Points

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

MOC_AccessPoints.docx

Version: 2.0.18468

Page 2 of 6

Access Points

Relay time: opener 2 (normally closed contact)

Duration of the signal that is used for triggering the second channel for the opener.

Delay time: opener 2 (normally closed contact)

A  delay  time  can  be  configured  for  the  second  channel  of  the  opener.  Therefore,  it  is  possible  to

trigger an electronic door opener only once the door opener relay has actually been activated. The

delay time can be entered in tenths of a second.

The  fields  "channel  opener  2",  "relay  time:  opener  2"  and  "delay  time:  opener  2"  are  only

available if the upgrade AccessPointOpener2 is enabled.

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

Channel number of the terminal where the monitoring signal “sabotage” has arrived or  0 if it does

not  exist.  This  channel  indicates  when  the  terminal  or  badge  reader  (subject  to  the  model)  is

opened without permission.

MOC_AccessPoints.docx

Version: 2.0.18468

Page 3 of 6

Access Points

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

MOC_AccessPoints.docx

Version: 2.0.18468

Page 4 of 6

terminals of the type 9290. The channels 91 and 92 are internal inputs and outputs of Windows

terminals.  With  DOS  terminals  internal  terminal  inputs  and  outputs  can  be  addressed  via  the

channels 1 and 2. 0 is to be assigned to a channel that is not to be used.

Access Points

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

MOC_AccessPoints.docx

Version: 2.0.18468

Page 5 of 6

Access Points

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

The  fields  "biometry  channel"  and  "validity  period"  are  only  available  if  the  upgrade

AccessPointBiometry is enabled.

MOC_AccessPoints.docx

Version: 2.0.18468

Page 6 of 6


Manual

Connection of DORMA Offline
Components
ZKS-SXS 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Connection of DORMA Offline Components

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 2 of 30

Connection of DORMA Offline Components

Contents

1  Overview: Connection of Dorma Offline Components ................................. 5

2  Configuration of Dorma Offline Components ............................................... 7

2.1  Configuration of Notebook and/or Palm ............................................................... 7

2.2  Configuration of Dorma Offline Components ....................................................... 7

2.3  Configuration of Office Unlocked (office hours) ................................................... 7

2.3.1  Time Domains in the Opening Hours ....................................................... 8

2.3.2  Authorization in Access Profile ................................................................ 8

2.4  Configuration Restrictions ................................................................................... 8

2.4.1  Planning of Opening Hours Valid in the Future ........................................ 8

2.4.2  Maximum Number of Access Periods ...................................................... 8

2.4.3  No Access Periods beyond Midnight ....................................................... 8

2.4.4  Access Attempt Logging .......................................................................... 8

2.4.5  Pin Code Request ................................................................................... 9

2.4.6  Badges in Download Once Only .............................................................. 9

2.4.7  Processing Public Holidays ..................................................................... 9

2.4.8  Several Palms for Synchronizing Authorizations ...................................... 9

2.4.9  Display of Change Date/Time in Access Status ....................................... 9

3

Installation for Connection of Offline Components ..................................... 10

3.1

3.2

3.3

Installation of Palm Desktop and HotSync ......................................................... 10

Installation of Dorma XS Manager ..................................................................... 10

Installation of HYDRA XS-Sync Program .......................................................... 11

3.4  Notes on Installation .......................................................................................... 14

4  Synchronization of Dorma Offline Components ......................................... 16

4.1  Troubleshooting ................................................................................................ 17

5  Access on Card (AoC) ............................................................................... 18

5.1  Overview ........................................................................................................... 18

5.2  Requirements .................................................................................................... 18

5.3  Memory Space Requirement on Legic Badge ................................................... 19

5.4  Configuration of HYDRA XS-Sync for AoC ........................................................ 20

5.5  Configuration of Access Authorizations ............................................................. 20

ZKS-SXS_81.docx

Version: 1.0.23049

Page 3 of 30

Connection of DORMA Offline Components

5.6  Provision of Authorizations ................................................................................ 21

5.7  Writing Authorizations on the PZE Terminal ...................................................... 23

5.7.1  Terminal Configuration at the Console................................................... 24

5.7.2  Terminal Configuration .......................................................................... 24

5.7.3  Procedure on the Terminal .................................................................... 25

6  Status of access point ................................................................................ 28

ZKS-SXS_81.docx

Version: 1.0.23049

Page 4 of 30

1  Overview: Connection of Dorma Offline Components

Connection of DORMA Offline Components

Purpose

This  function  package  includes  an  interface  for  connecting  Dorma  offline  components.  Since  these

components  locally  store  authorizations  and  are  battery-operated,  structural  changes  for  routing  data

lines are not required. The infrared interface of a notebook and/or Palm PDA is used in order to read out

access  logs  and  synchronize  authorizations.  Like  online  components,  authorizations  are  maintained  in

HYDRA.

The following illustration shows the data flow using the example of a cylinder:

Alternatively to storing authorizations  on  the components,  it  is possible to  write  the  authorizations  of an

employee on the badge at a PZE terminal. Depending on the validity period of such authorizations, this

approach  has  the  advantage  that  lost  badges  automatically  lose  their  authorizations  upon  expiry  of  this

validity without the need to lock the authorizations on the offline components concerned.

Implementation notes

You use the function package if:



you wish to control and monitor door access without routing a communication line and/or voltage

supply to the relevant door;

you intend to substitute a locking system by access readers;

the HYDRA system does not require a current status (open, closed, disturbed, ...) of the relevant





doors.

Integration

This  function  package  can  only  be  used  if  access  control  is  used  in  HYDRA  (function  package

Management Functions Access Control). The connection is available for the following offline components:

  XS mounts by Dorma

  XS cylinders by Dorma

ZKS-SXS_81.docx

Version: 1.0.23049

Page 5 of 30

Connection of DORMA Offline Components

Features

  Connection of offline components

o

Interface  for  transferring  access  authorizations  and  time  models  to  Dorma  offline

components (only available for specific offline components)

  Display of offline components in the access status

o  Additional information is displayed in the access status for Dorma offline components.

Differences between offline mounts and cylinders

The following differences exist between offline mounts and cylinders:

  An offline mount behaves like a door handle and can therefore only be used to open the door.

  An offline cylinder behaves like a key and can therefore be used to open and lock a door.

Using offline mounts has the following advantages:

  Simple operation due to the door handle

  An ordinary lock cylinder may be fitted on the door mount

Using offline cylinders has the following advantages:

  The door does not need to be modified (e.g. important for fire doors)

  An offline cylinder can be used if the offline mount is too wide.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 6 of 30

Connection of DORMA Offline Components

2  Configuration of Dorma Offline Components

2.1  Configuration of Notebook and/or Palm

The notebook and/or the Palm for comparing authorizations and logs is entered as a terminal in HYDRA.

The "Palm" entry must be set in the Type field of the terminal configuration.

Since  the  notebook  and/or  Palm  does  not  send  any  cyclic  status  messages  to  HYDRA,  the  LED  for

indicating  the  terminal  status  turns  yellow  after  the  set  cycle  duration  and  red  after  the  double  cycle

duration. If this display is not required, you can leave the Cycle duration of status messages field empty

and the LED for status indication will always be shown in white.

2.2  Configuration of Dorma Offline Components

Offline  fittings  and  cylinders  are  filed  as  accesses  in  HYDRA  and  have  to  be  identified  by  the  Offline

component option.

By  assigning  the  access  to  a  terminal  of  the  type  "Palm",  the  access  is  defined  as  Dorma  offline

component and specified by which notebook and/or Palm authorizations and logs are to be synchronized.

Consequently,  you  can  use  several  notebooks  and/or  Palms  for  different  offline  components  at  various

locations  or  within  one  plant.  If  the  same  offline  components  are  to  be  synchronized  by  two  or  more

notebooks and/or Palms, only one terminal header is created and assigned.

The  Reader  field  remains  empty  for  offline  components.  In  addition  to  the  number  of  the  access,  the

name and the assigned terminal, the Door opener relay duration field is processed and transferred to the

offline component.

By assigning an access to an access group, the opening times and access authorizations are specified in

the same way as for common online readers.

With regard to offline components, the Offline component option has to be activated so that the access is

loaded on the notebook and/or Palm. When the access is saved, a check is performed to verify that the

number of accesses for which this button is set does not exceed the number of existing licenses for ZKS-

SXS.

2.3  Configuration of Office Unlocked (office hours)

The XS components support an office unlocked function (office hours), within which specific badges may

trigger and also terminate a permanent opening.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 7 of 30

Connection of DORMA Offline Components

Office unlocked is activated if an authorized badge is read twice in quick succession. Office unlocked is

terminated by  holding an authorized  badge  against  the reader once,  or if the Office unlocked period as

defined in the opening hours has expired.

To configure Office unlocked, the relevant period must be set in the opening hours and the authorization

for Office unlocked must be activated in the access profile.

2.3.1

Time Domains in the Opening Hours

The  access  periods  of  an  access  time  model  provide  the  Office  unlocked  option.  Office  unlocked  may

only  be  activated  at  the  access  in  access  periods  in  which  this  option  is  set.  At  the  end  of  the  access

period, Office unlocked, if active, is terminated automatically.

2.3.2  Authorization in Access Profile

Access  authorizations  are  defined  in  the  access  profiles.  Here,  the  Office  unlocked  option  can  also  be

used to determine whether Office unlocked can be activated by the assigned badges.

2.4  Configuration Restrictions

2.4.1  Planning of Opening Hours Valid in the Future

In  HYDRA,  opening  hours  can  be  planned  for  the  future  through  the  period  of  validity.  The  offline

components  will  always  only  receive  the  currently  valid  opening  hours,  not  the  changes  potentially

planned for the future.

2.4.2  Maximum Number of Access Periods

An access time model used for opening hours may include a maximum of 6 access periods (from, to) per

weekday.  Access  time  models  used  in  the  access  authorizations  are  limited  to  4  access  periods  per

weekday.

2.4.3  No Access Periods beyond Midnight

In  contrast  to  Access  on  Card  (AoC),  the  XS  manager  does  not  process  any  authorizations  beyond

midnight. Access periods configured beyond midnight only apply up to midnight.

2.4.4  Access Attempt Logging

In logging control, the offline components do not differentiate between accesses and access  attempts. If

only Access attempts logging is set in HYDRA, the offline components will log both access attempts and

accesses.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 8 of 30

Connection of DORMA Offline Components

2.4.5  Pin Code Request

The offline components do not support any pin code entry. If pin code request is activated in HYDRA, the

badge number is read instead.

2.4.6  Badges in Download Once Only

In  HYDRA  you  can  create  a  badge  number  several  times  with  different  periods  of  validity  and  enter

several access time models for an access on a badge . The offline components can process a badge only

once.  For  this  reason,  only  the  currently  valid  access  authorization  of  a  badge  and/or  the  access

authorization  of  a  badge  valid  next  in  time  is  transferred  to  the  offline  component.  If  there  are  several

current  access  authorizations  with  different  access  time  models,  the  authorization  with  the  smaller

number of the access time model is transferred.

2.4.7  Processing Public Holidays

Any  public  holidays  loaded  on  the  offline  components  are  not  only  valid  for  one  year,  but  also  for  the

future  years. As regards public holidays falling on different dates each  year (Carnival  Monday,  Carnival

Tuesday, Ash Wednesday, Good Friday,  Easter  Sunday,  Easter Monday,  Ascension of Christ, Mother's

Day, Whit Sunday, Whit Monday, Corpus Christi and day of repentance), the formula for calculating the

date is entered so that these public holidays will be processed correctly in the next years, too.

The public holidays for the current year are always loaded. This means that the public holidays are also

configured for the next year if they are not yet created for the next year in HYDRA. If public holidays for

the next year are changed, they may only be loaded on the offline components as from 01 January of the

respective year.

2.4.8  Several Palms for Synchronizing Authorizations

If  several  palms  are  used  to  synchronize  the  authorizations  of  one  or  more  accesses,  only  the

synchronization date/time of the last Palm may be saved, and it is possible when checking whether there

are changes for any access that the relevant access is not shown in the current list.

2.4.9  Display of Change Date/Time in Access Status

The maintenance of badges, access profiles, access authorizations, profile assignments and exceptional

authorizations  has  an  effect  on  the  date/time  of  the  last  change  in  the  access  status  for  the  accesses

concerned and, as a result, the loaded authorizations are shown as being no longer current.

Changes  to  the  terminals,  accesses,  access  groups,  time  zones  and  opening  hours,  however,  do  not

have any effect on the date/time of the last change in the access status.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 9 of 30

Connection of DORMA Offline Components

3

Installation for Connection of Offline Components

As  from  version  2.1  of  HYDRA  XS-Sync  and  version  3.2  of  the  XS  Manager,  it  is  possible  to  perform

initialization  and  synchronization  of  XS  components  optionally  via  a  Palm  or  a  notebook  with  infrared

interface.

3.1

Installation of Palm Desktop and HotSync

This  installation  step  is  only  required  if  XS  components  are  to  be  initialized  and  synchronized

via a Palm.

In  order  to  be  able  to  compare  authorizations  and  logs  by  means  of  a  Palm,  the  Palm  Desktop  and

HotSync  applications  must  first  be  installed  on  the  relevant  PC.  The  installation  CD  is  part  of  the  Palm

scope of supply.

After  installing  Palm  Desktop,  the  Palm  must  be  connected  to  the  computer  and  a  HotSync  must  be

carried out. This verifies that communication between the Palm and the computer works.

For Windows installations with several Windows users, the Palm Desktop has to be installed individually

for each user who requires access.

3.2

Installation of Dorma XS Manager

When installing the Dorma XS Manager, the required programs for communication with XS components

are installed.

Installation  requires  local  administrator  authorization.  For  Windows  installations  with  several  Windows

users, the XS Manager has to be installed individually for each user who requires access.

If  XS  components  are  to  be  initialized  and  synchronized  via  a  Palm,  the  programs  required  for  this  are

loaded on the Palm upon the next HotSync. For this purpose, the Palm HotSync has to be started during

the execution of the installation program. After installation, the XS Manager has to be transferred to the

Palm by a HotSync.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 10 of 30

Connection of DORMA Offline Components

3.3

Installation of HYDRA XS-Sync Program

The HYDRA XS-Sync program is installed through the installation program hy_xs_sync_setup.exe, which

is stored in the subdirectory fterm\hy_xs_sync of the HYDRA directory in the HYDRA server. Installation

requires administrator authorization.

Since  HYDRA  7.1  and  HYDRA  MW  2.0  /  MW  2.1  /  MW  3.0  use  different  communication  routines,  the

HYDRA version used is inquired during installation:

ZKS-SXS_81.docx

Version: 1.0.23049

Page 11 of 30

The following window opens at the end of the installation:

Connection of DORMA Offline Components

ZKS-SXS_81.docx

Version: 1.0.23049

Page 12 of 30

Connection of DORMA Offline Components

If  the  HYDRA  XS-Sync  settings  option  is  active,  the  file  hy_xs_sync.bat  is  opened  in  an  editor  and  the

required settings can be made:

The following settings are required:

HOST

The HOST environment variable sets the host name or the IP address of the HYDRA server.

PORT

In  a  multi-instance  system,  the  connection  to  the  requested  instance  is  configured  via  the  port

number. This is computed according to the formula:

Port number = 10000 + instance * 100

The port number remains empty for installations without several instances.

TNR

The  TNR  environment  variable  is  used  to  enter  the  terminal  number  created  for  the  Palm  in

HYDRA. This terminal number specifies which accesses are loaded on the Palm.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 13 of 30

Connection of DORMA Offline Components

USR

The user number is computed from the terminal number + 2000.

LESER

The LESER (READER) environment variable is used to select the reader type of the badges used.

Here, "Legic", "Legic ID", "Mifare" and "Hitag" can be selected.

XSMANAGER

This environment variable is used to set the file name for calling the XS Manager. The effect of this

setting is that the XS Manager is started automatically if synchronizing has been started in HYDRA

XS-Sync. If authorizations are synchronized via a Palm, this environment variable remains empty.

When updating to version 2.1 of HYDRA XS-Sync, the file hy_xs_sinc.bat is not overwritten, so the

previous settings are maintained. Instead, a new file hy_xs_sync.bat_new is created. If you intend

to  set  the  environment  variable  XSMANGER  in  this  case,  the  remaining  settings  from  the  file

hy_xs_sync.bat  have  to  be  transferred  to  the  file  hy_xs_sync.bat_new,  which  must  then  be

renamed to hy_xs_sync.bat.

After the settings have been made and saved, the HYDRA XS-Sync program is ready for use.

Please note:

The file hy_xs_sync.bat is found in the directory where HYDRA XS-Sync was installed.

The files hy_xs_sync.bat and hy_xs_custom.hsc are not overwritten upon re-installation

of HYDRA XS-Sync in the same directory. This means, for instance, that the program

can be installed again in the case of an update to version 2.1 of HYDRA XS-Sync

without losing the customer-specific settings.

3.4  Notes on Installation

Should  errors  occur  during  installation  or  if  a  previously  installed  system  does  not  work  anymore,  it  is

usually  necessary  to  uninstall  and  subsequently  reinstall  all  components  (Palm  Desktop,  XS-Manager

and HYDRA XS-Sync).

If HYDRA XS-Sync does not start after installation, but terminates with an error message, the XSSync-

DLL is probably not registered correctly. This may be repeated in a DOS box in the subdirectory xssync of

the directory where the Dorma XS-Manager is installed, by calling up

regsvr32  XSSync.dll.

A system re-start may be required after registration of the DLL.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 14 of 30

Connection of DORMA Offline Components

For the operation of HYDRA XS-Sync under Windows 7, the settings for the user account control (Control

Panel - Security Center - Action Center - Change User Account Control settings) must be set to "Never

notify".

ZKS-SXS_81.docx

Version: 1.0.23049

Page 15 of 30

Connection of DORMA Offline Components

4  Synchronization of Dorma Offline Components

The  HYDRA  XS-Sync  application  synchronizes  the  configured  accesses  and  their  opening  hours  and

access authorizations with the XS Manager on a notebook and/or Palm. Starting the program opens the

following window:

Function Key Assignment

Synchronizing

The  Synchronize  function  key  is  used  to  process  the  logs  read  from  the  XS  components  and

subsequently the configurations and authorizations are requested from HYDRA and transferred to

the notebook and/or the Palm.

Reading

The Read option only transfers the logs read from the XS components to HYDRA.

Download log

After synchronizing the authorizations, this button can be used to display the download log.

Upload log

After synchronizing or reading the logs, an upload log is obtained via this button.

Close

This function closes HYDRA XS-Sync.

After starting synchronization or reading of the data, the request to start the PC Sync in the XS Manager

on the notebook and/or the HotSync on the Palm is displayed in the dialog instead of these two buttons

(synchronize and read):

After performing the HotSync process, the number of data records transferred is shown in the list and the

download and upload logs may be checked.

The configurations and authorizations on the notebook and/or Palm have now been updated and may be

loaded on the XS components via the infrared interface. For more information on this, please refer to the

XS Manager documentation.

The synchronization software HYDRA XS-Sync is only available in German.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 16 of 30

Connection of DORMA Offline Components

4.1  Troubleshooting

If the error message "No download data found" appears when loading the authorizations, this may be due

to  the  fact  that  the  hy_xs_data  directory  (directly  in  the  HYDRA  directory)  is  missing  on  the  server.

Another possible cause is a lack in local authorization for writing data. In this case, writing authorization

must be assigned for the program directory and or set to a lower level under Windows 7 UAC (settings for

user account control).

The  reason  for  an  error  message  when  reading  the  data  into  the  XS  Manager  (Java  NULL-Pointer-

Exception) may be an incorrect setting of the search  string. Please observe that the search string must

contain an even number of digits.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 17 of 30

Connection of DORMA Offline Components

5  Access on Card (AoC)

5.1  Overview

When  using  Dorma  offline  components  (cylinders  or  fittings)  for  access  control,  authorizations  are

uploaded to the components from a notebook or a Palm handheld. One disadvantage of this procedure is

that every time authorizations are changed, for example due to new employees or lost badges, they have

to be downloaded on site onto the offline component.

By  contrast,  Access  on  Card  (AoC)  makes  it  possible  to  write  authorizations  on  the  card  at  a  time

recording  terminal.  This  means,  for  example,  that  new  employees  can  open  the  entrance  without  any

need for authorizations to be updated on the offline component. AoC also provides a solution in the case

of  badges  which  are  no  longer  authorized  on  an  offline  component.  Depending  on  the  time  period  for

which  the  authorizations  are  written  on  the  badge,  they  will  expire  automatically  and  do  not  need  to  be

locked on the offline component. If, for instance, authorizations for the current day only are written on the

badge,  it  will  not  be  possible  to  load  the  badge  once  it  has  been  locked  and  the  authorizations  are  no

longer valid on the next day.

Even  if AoC  is used, a notebook or Palm handheld  will still  be required for the  initial set-up  and for the

administration of offline components. When using a notebook, a USB adapter with an infrared interface is

also required.

5.2  Requirements

For using AoC, memory space is required on the badge. Legic badges need a separate segment.

A Legic badge must have the following structure:

-

It must have two segments with the same search string.

-  By default, the first segment is the standard PZE/ZKS access segment with search string+badge

data (standard MPDV segment).

-  The second segment is the AoC segment. This segment MUST have the same search string as

the 1st segment. The search string must immediately be followed by the AoC data according to

Dorma AoC data structure.

At present, AoC is only available for Legic badges.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 18 of 30

Connection of DORMA Offline Components

Another  prerequisite  for  using  AoC  is  HYDRA  XS-Sync,  version  2.1  or  higher.  As  from  version  2.1,

HYDRA  XS-Sync  writes  the  access  group  onto  the  offline  component.  This  is  compulsory  so  thats

authorizations can be processed correctly on the badge.

In addition, the XS manager, version 3.2 or higher, must be loaded.

Please note:

When introducing AoC in an existing access control system with offline components,

these components must have been synchronized at least once with HYDRA XS-Sync

as from version 2.1 so that the authorizations on the badge can be interpreted correctly!

5.3  Memory Space Requirement on Legic Badge

The required size of the segment can be calculated according to the following formula:

20  bytes  +  7  bytes

  x  number  of  authorized  access  groups  x  number  of  days

If  a  badge  is  authorized  for  offline  components  which  are  classified  in  5  access  groups,  and  the

authorizations  are  to  be  written  on  the  badge  for  the  next  2  days,  this  result  in  a  memory  space

requirement of:

20 bytes + 7 bytes x 5 x 2 = 90 bytes

If the badge is authorized at an access group for several non-consecutive time periods of a day or time

periods  with  and  without  the  function  "Office  unlocked",  7  more  bytes  are  to  be  added  for  each  time

period and day.

If a badge is authorized at one or more access groups for the same time period every day (consecutively

including weekends and public holidays), the authorizations are saved in a collective period and

consequently occupy less space on the badge. A prerequisite for this is that the badge is only authorized

for a time period which is identical at all access groups and for all days, and also with the same setting for

the "Office unlocked" function at all access groups. The memory space required for this is determined by

the largest access group affected:

Largest access group / 8 + 1 byte

The authorizations for the remaining access groups are mapped by individual authorizations whose

memory space requirement is described in the paragraph above.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 19 of 30

Connection of DORMA Offline Components

Please note:

The required memory space for authorizations has an effect on the time taken to write

the authorizations. Approx. 1 second is required for every 100 bytes. For this reason,

authorizations should be allocated in such a manner that as many access groups as

possible are saved using a collective period and as few access groups as possible, or

ideally none at all, are saved in individual authorizations.

5.4  Configuration of HYDRA XS-Sync for AoC

The  Dorma  XS  components  are  initialized  and  maintained  via  a  notebook  or  a  Palm.  To  ensure,  for

example,  that  authorizations  are  not  also  written  on  the  components  when  the  access  logs  are  read,

writing  of  authorizations  in  HYDRA  XS-Sync  has  to  be  deactivated.  This  is  done  in  the  file

hy_xs_custom.hsc:

…

…

//setting  whether  the  access  authorizations  are  to  be  written  via  notebook  and/or  Palm

//  or  whether  they  are  only  transferred  via  the  card  with  Access  on  Card  (AoC)

// If writing //

// berechtigungen_schreiben = "J";

berechtigungen_schreiben = "N";

By  entering  berechtigungen_schreiben  =  "N"  (write_authorizations  =  "N"),

the  access

authorizations are not written on the XS component and instead authorizations have to be written on the

badge.

5.5  Configuration of Access Authorizations

In  order  to  use  the  memory  space  on  the  badge  as  efficiently  as  possible  and  be  able  to  write

authorizations  on  the  badge  for  an  extended  period,  an  effort  should  be  made  to  classify  the  offline

components  in  as  few  access  groups  as  possible,  since  authorizations  are  written  on  the  badge  per

access group.

Please note:

At present, only access groups with a number less than 256 are processed for AoC.

Where older firmware versions are used, this restriction has to be expected in the

future, too.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 20 of 30

Connection of DORMA Offline Components

The  access  periods  for  the  authorization  can  be  set  to  exceed  the  next  day.  Values  ranging  from  0:00

(24:00 p.m.) to 48:00 p.m. are permissible; for times on the next day, 24 hours have to be added to the

time. Consequently,  you can load  authorizations for night shifts, if necessary,  on the  badge,  even  if the

authorizations are only written for the current day. An example of a possible access period is from 00:00

(24:00 PM) to 31:00 (07:00 AM the next morning).

5.6  Provision of Authorizations

An  entry  in  the  HYDRA  scheduler  provides  authorizations  in  the  server.  The  interval  at  which  the

authorizations are processed for the terminal on the server can be set in the Interval tab:

Tab "command“:

Type

Category

Visible

Active

Product key

License key

C=customer entry

I=Interval

Visible

[X] Activated

ZKS

ZKS-SXS

Command (depending on the server's operating system)

Windows: sh aoc.scr "ANZ_TAGE=4|ANZ_TAGE:MAX=7|SPEICHERPLATZ=700|"

Linux:

    aoc.scr "ANZ_TAGE=4|ANZ_TAGE:MAX=7|SPEICHERPLATZ=700|"

Please also see the following description of parameters!

Comment

Provision of authorizations for AOC

ZKS-SXS_81.docx

Version: 1.0.23049

Page 21 of 30

Connection of DORMA Offline Components

Tab "interval“:

Interval

0:05:00

This entry only provides authorizations for accesses with Dorma offline components. These accesses are

assigned to terminals of the type "Palm". The following parameters specify the supply of authorizations:

ANZ_TAGE=…

This  parameter  determines  for  how  many  days  in  advance  the  authorizations  are  written  on  the

badge.

ANZ_TAGE:MAX=…

If the authorization  within the previously set number of days does not extend to all of these days,

the authorizations are written on the badge up to the maximum number of days set here.

Example:  Authorizations  for  2  days  are  written  on  the  badge  on  a  Friday.  If  the  employee  is  not

authorized  on  weekends,  the  authorizations  for  the  next  Monday  are  provided  if  the  maximum

number  of  days  entered  is  at  least  4.If  this  functionality  is  not  required,  the  maximum  number  of

days has to be set to the same value as the previously set number of days.

SPEICHERPLATZ=…

This  parameter  conveys  the  size  of  the  badge  memory  space  to  the  program  for  authorization

provision.  This  ensures  that  the  number  of  authorizations  provided  is  not  excessive.  If  the  set

number of days is not reached on a badge, this is logged on the server in the hyz_zut.pro file of the

"err" directory.

TNR:VON=… / TNR:BIS=…

You  have  to  enter  the  notebook  and/or  Palm  used  for  managing  the  offline  components  in  the

HYDRA terminal configuration. The accesses for the offline components are then assigned to  the

"terminal" through which they are managed. If an installation extends to several locations, use the

optional  parameters  TNR:VON  and  TNR:BIS  to  specify  the  terminals  and  hence  implicitly  the

accesses whose authorizations are to be loaded on the badges. As a result, only the authorizations

for  the  respective  location  are  written  in  order  to  keep  the  memory  requirements  as  little  as

possible.

ZGRP:VON=… / ZGRP:BIS=…

As an alternative  or in addition to the terminal  numbers specified by TNR:VON  and TNR:BIS, the

authorizations to  be  written can also  be limited by a number range on access groups. In  general,

authorizations  are  only  provided  for  accesses  configured  as  offline  components.  These  two

parameters are also optional.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 22 of 30

Connection of DORMA Offline Components

DATEI=…

If  only  authorizations  for  the  relevant  location  are  to  be  written  for  installations  with  several

locations, a unique file name has to be set through the DATEI (FILE) parameter. The file name for

PZE terminals is configured in the customer-specific configuration file hytnrcfg.ini.

for CTWIN

./ctnet/win/ctwin/custom/

for AIP

.[/1]/custom/aip/

; general configuration for all terminals (default = aoc.dat)

  [ Tnr Konfiguration 0]

  Access-On-Card-File=aoc.dat

; configuration for terminal 90

  [ Tnr Konfiguration 2090]

  Access-On-Card-File=aoc.090.dat

A separate scheduler entry with the relevant file name is then required for each location.

The terminal updates authorizations along with the clocking authorizations for the PZE module.

This results in the maximum duration until changes to authorizations are available on the PZE

terminal, namely from the total of the cyclic loading time set in the terminal configuration and the

interval set in the scheduler. If you use the default settings, authorizations are provided every 5

minutes  in  the  server  and  downloaded  every  5  minutes  to  the  PZE  terminal.  Consequently,  it

can  take  up  to  10  minutes  until  a  changed  authorization  will  be  available  in  the  PZE  terminal

and can be loaded onto the badge.

5.7  Writing Authorizations on the PZE Terminal

Writing a person's authorizations on his/her badge is performed at the PZE terminal through one of the 4

absence reason buttons.

Required program statuses:

Terminal program

drv_crypt.dll

ctwin.exe

ctaip.exe

Versions

V# 1.0.2.0

V# 7.2.5.98

V# 2.0.2.25

.\packets\pzezks72.dll
.\functions\pze.dll

V# 2.0.1.12
V# 2.0.1.11

ZKS-SXS_81.docx

Version: 1.0.23049

Page 23 of 30

Connection of DORMA Offline Components

5.7.1

Terminal Configuration at the Console

The Access on Card (AoC) function is configured in the Terminal configuration of the "HR functions" tab.

The  writing  of  authorizations  on  the  badge  can  be  configured  using  the  "Absence  reason"  AOC  and

appropriate labeling on an absence reason button.

5.7.2

Terminal Configuration

For writing on badges, a reader-specific DLL has to be configured at the terminal. Available at present:

DLL

Description

drv_crypt.dll

PHG LEGIC Reader Type PHG Admitto 123 (phg-crypt protocol)

Configuration is performed at the terminal in the ctaip.ini file for AIP terminals and/or in the ctwin.ini file for

terminals with the terminal program CTWIN.

For reasons of downwards compatibility, configuration is designed for the new phg-crypt and the former

1685A  protocol.  The  relevant  protocol  mode  can  be  set  in  the  "Comports"  section  of  ctaip.ini  or  in

ctwin.ini.

Please note:

The AoC functionality is only available with phg-crypt readers!!! As a consequence, phg-

crypt has to be set as protocol mode for AoC:

DRV_CRYPT-PARAM=PROTOCOLMODE=CRYPT-PLAIN

General setting:

[comports]
com1= drv_crypt

Reader setting for phg-crypt protocol:

[ COMPORTS-MASK ]
DRV_CRYPT-MASK=XXXXXXXXXXXFFFFFKKKKKK

[ COMPORTS-PARAM ]
DRV_CRYPT-PARAM=PROTOCOLMODE=CRYPT-PLAIN|

Reader setting for 1685A protocol: (NO AOC AVAILABLE!!!)

ZKS-SXS_81.docx

Version: 1.0.23049

Page 24 of 30

Connection of DORMA Offline Components

[ COMPORTS-MASK ]
DRV_CRYPT-MASK=XXXXXXXFFFFFKKKKKK

[ COMPORTS-PARAM ]
DRV_CRYPT-PARAM=PROTOCOLMODE=1685A|

Further  settings  in  the  .ini  file  can  influence  the  reader  behavior.  Such  entries  should  be  made  very

carefully, as they affect the entire behavior of the AoC application.

The following settings can also be made via DRV_CRYPT-PARAM.

Configuration of the start address of AoC data in the AoC segment.

Default  is  2.  This  value  depends  on  the  badge  configuration  and  hence  the  2nd  segment.  This  value

indicates the byte address, as from which byte number in the segment the  AoC data are to be located.

For  MPDV  AoC  badges,  the  start  address  is  always  2,  as  the  AoC  data  must  immediately  follow  the

search string of the AoC segment.

Warning: This may only be changed if the existing AoC badges do not correspond to the MPDV definition!

DRV_CRYPT-PARAM= Startadress=2|

5.7.3  Procedure on the Terminal

The "A.o.C.(Access on Card)" function is selected using the relevant function key.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 25 of 30

Connection of DORMA Offline Components

Please note:

The screenshots show the AIP terminal display when loading authorizations on the

badge. The CTWIN display is comparable in terms of contents.

After reading the badge, the following note is displayed:

The note is closed after successful writing of the authorizations. The following screen is shown indicating

that the process has succeeded (similar to a successful clocking).

ZKS-SXS_81.docx

Version: 1.0.23049

Page 26 of 30

In the event of an error, the following message window is displayed that can be canceled by "OK":

Connection of DORMA Offline Components

Possible errors include:

Error

Description

-11008

DRV_TREIBER_ERROR_WRITEDATA
Error when writing the badge data.
Possible reasons:

-  Badge is removed from the reader during writing
-  The free memory space on the badge is not sufficient
-  Communication to the reader and/or the badge is disrupted

-11009

DRV_TREIBER_TIMEOUT_WRITEDATA
Timeout when writing the badge data
Possible reasons:

-  Communication to the reader and/or the badge is disrupted

ZKS-SXS_81.docx

Version: 1.0.23049

Page 27 of 30

Connection of DORMA Offline Components

6  Status of access point

Overview

Menu

HR management  Access control  Access status

Transaction code

acst

Function authorization

acst

In this application, the current status and the time since this status occurred are displayed.

Here,  you  can  set  in  the  configuration  of  the  HYDRA  server  which  access  status  is

communicated from the terminal to the HYDRA server and how often Access points

An access can have the following statuses:

Closed

The access is closed.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 28 of 30

Connection of DORMA Offline Components

Open

The  access  is  open  as  it  was  used  before.    This  status  is  only  displayed  if  a  door  contact  is

connected.

Online

If  the  access  is  configured  in  a  way  that  it  does  not  signal  the  Open  and  Closed  statuses  to  the

HYDRA server, the Online status is displayed instead. If there is no cyclic status posting, then the

access changes to "No message" (see below).

Opened too long

The  access  was  opened  because  there  was  an  authorized  access  and  the  allowed  opening  time

was exceeded. This status is only displayed if a door contact is connected.

Open w/o permission

The  access  was  opened  without  an  authorized  badge.    This  status  is  only  displayed  if  a  door

contact is connected.

Free

A permanent activation is currently in place for this access.

Disturbance

The terminal has no connection to the access reader.  The status of the access is unknown.

Sabotage

The access reader was opened.  This status only appears if the reader has a sabotage loop.

No message

The access (or the terminal to which the access is connected) has not responded within the cycle

time set for the access status. The status of the access is unknown.

Offline component

The access is an offline component for which no current status is available.

Alarms and disturbances are displayed in yellow in the list if they have been signed off and still

exist. Alarm and disturbances not signed off are shown in red.

Additional information on Dorma offline components:

The following additional information is displayed in the access status for the Dorma offline components:

Date from/time

Since  the  current  status  for  offline  components  is  not  known,  "Offline  component"  is  displayed

instead. The time displayed provides information about when data was last written to or read from

the palm.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 29 of 30

Connection of DORMA Offline Components

Modified on

The editing of badges, access profiles, access authorizations, profile assignments and exceptional

authorizations has an effect on the time of the last change for the relevant accesses and therefore

causes the loaded authorizations to be displayed as no longer current.

Load badges

In addition to the time when the authorizations were loaded onto the Dorma XS component, this

category also shows the number of cards loaded and whether the authorizations in the account are

current. There are three different colors for LEDs:

A red LED indicates that the offline components are not current.

  A yellow LED indicates that the authorizations are loaded onto the palm but there is no message

whether the

  date was actually loaded.

  A green LED indicates if the authorizations for accesses are current.

Synchronize badges

If authorizations  were changed, this category  shows the time when the  data  was loaded onto the

palm.  You can also see the number of transferred badges.

Access logs

The access logs displayed here up to the point in time were fetched at the XS component and read

into  HYDRA.  It  is  not  guaranteed  that  the  access  logs  are  complete,  as  the  logs  in  the  offline

components are overwritten when the available memory is full.

Battery

This  category  shows  the  battery  status  of  the  XS  component.    If  a  red  minus  sign  is  displayed

instead of the green plus sign, the battery  must be replaced. The battery status is identified when

the  data  is  read  from  the  offline  component  and  therefore  does  not  necessarily  represent  the

current status.

ZKS-SXS_81.docx

Version: 1.0.23049

Page 30 of 30


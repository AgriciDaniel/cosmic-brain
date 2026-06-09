Manual

Connection of KABA Offline
Components
ZKS-SOK 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Connection of KABA Offline Components

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 2 of 29

Connection of KABA Offline Components

Contents

1  Overview: Connection of Offline Components ............................................. 5

2

Installation of Offline Component Connection .............................................. 7

2.1

Installation of an update for HYDRA .................................................................... 7

2.2  Requirements ...................................................................................................... 7

2.3  Basic configurations in the B-COMM GUI ............................................................ 7

2.3.1  CardLink instance .................................................................................... 8

2.3.2  Administration area.................................................................................. 8

2.3.3  Create component ................................................................................... 9

2.4  Set up the interface to B-COMM in HYDRA......................................................... 9

2.5  Setup of provision of CardLink data ................................................................... 10

2.5.1  Configuration of badge type ................................................................... 11

2.5.2  Activation in scheduler ........................................................................... 11

3  Configuration of Kaba Offline Components ............................................... 13

3.1  Configurations in HYDRA .................................................................................. 13

3.1.1  Terminals .............................................................................................. 13

3.1.2  Access groups ....................................................................................... 13

3.1.3  Accesses ............................................................................................... 13

3.1.4  Access time models / access periods .................................................... 14

3.1.5  Opening hours ....................................................................................... 14

3.1.6  Opening hours/doors permanently open/office unlocked ....................... 15

3.1.7  Multiple access time models for one access group ................................ 15

3.1.8  Public holidays ...................................................................................... 15

3.2  Data managed in the B-COMM server ............................................................... 16

3.2.1  Administration area................................................................................ 16

3.2.2  Components .......................................................................................... 17

4  Synchronization of KABA Offline Components .......................................... 20

4.1  Overview ........................................................................................................... 20

4.2  Configuration of the interface ............................................................................ 20

4.3

4.4

Initiation and process of synchronization ........................................................... 20

Logging ............................................................................................................. 20

4.5  Access log ......................................................................................................... 21

ZKS-SOK_82.docx

Version: 1.0.23049

Page 3 of 29

Connection of KABA Offline Components

5  CardLink ..................................................................................................... 22

5.1  Overview ........................................................................................................... 22

5.2  Requirements .................................................................................................... 22

5.3  Memory requirements on the legic badge .......................................................... 23

5.4  Updating authorizations at the PZE terminal ..................................................... 23

5.5  Writing authorizations at the PZE terminal ......................................................... 24

5.5.1  Terminal configuration at the console .................................................... 24

5.5.2  Terminal configuration ........................................................................... 24

5.5.3  Process at the terminal .......................................................................... 26

ZKS-SOK_82.docx

Version: 1.0.23049

Page 4 of 29

Connection of KABA Offline Components

1  Overview: Connection of Offline Components

Purpose

This  function  package  includes  an  interface  to  connect  Kaba  GmbH  offline  components  to  HYDRA

Access  Control.  Since  these  components  are  battery-operated  and  their  authorizations  are  transported

via the badge, no structural changes are required for routing supply or data lines.

The access configurations  (access time models, public holidays, ...) and the reading of the access logs

are synchronized via the Kaba Programmer 1460, which is synchronized via the Kaba software B-COMM.

Changes in configurations are automatically transferred from HYDRA to B-COMM via an interface.

The authorizations for the offline components are written on the employee badge at PZE terminals with

the  terminal  program  AIP  or  ctwin.  Since  the  PZE  terminals  are  permanently  connected  to  HYDRA,

changes in the authorizations can be loaded promptly on the employee's badge, without the administrator

having to load the new authorizations on all offline components concerned.

The following illustration shows the data flow using the example of a cylinder:

Implementation notes

You use the function package if:



you wish to control and monitor door access without routing a communication line and/or voltage

supply to the relevant door;



you intend to substitute a locking system by access readers;

ZKS-SOK_82.docx

Version: 1.0.23049

Page 5 of 29



the HYDRA Access Control does not require a current status (open, closed, disturbed, ...) of the

Connection of KABA Offline Components

relevant doors.

Integration

This  function  package  can  only  be  used  if  Access  Control  is  used  in  HYDRA  (function  package

Management Functions Access Control). The connection is available for the following offline components:

  Digital cylinder of the Kaba evolo type

  Electronic door mounts of the Kaba c-lever and Kaba c-lever compact type

Features

  Connection of offline components

o

Interface for transferring access configurations to B-COMM

o  Writing of authorizations on the badge

Differences between offline door mounts and digital cylinders

The following differences exist between offline door mounts and digital cylinders:

  An  offline  door  mount  behaves  like  a  door  handle  and  can  therefore  only  be  used  to  open  the

door.

  A digital cylinder behaves like a key and can therefore be used to open and lock a door.

Using offline door mounts has the following advantages:

  Simple operation due to the door handle

  An ordinary lock cylinder may be fitted on the door mount

Using digital cylinders has the following advantages:

  The door does not need to be modified (e.g. important for fire doors)

  A digital cylinder can be used if the offline mount is too wide.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 6 of 29

Connection of KABA Offline Components

2

Installation of Offline Component Connection

2.1

Installation of an update for HYDRA

HYDRA systems initially installed before the third quarter of 2014 usually require an installation procedure

on the HYDRA server, even if current Service Packs have been installed.

This installation procedure is used to provide the necessary prerequisites in the HYDRA database.

This  subsequent  installation  is  coordinated  by  the  MPDV  project  management,  if  required,  and

implemented with the aid of a separate installation manual.

HYDRA  systems  initially  installed  from  the  third  quarter  of  2014  onwards  in  the  version  of

Service Pack 5 already meet the requirements on the HYDRA server so that an installation is

not necessary there.

2.2  Requirements

  The HYDRA server must have Java version 1.5 as a minimum requirement.

  The KABA B-COMM software (server + GUI) must have been installed. The installation guide for

the KABA B-COMM software is included as PDF file on the installation medium.

2.3  Basic configurations in the B-COMM GUI

ZKS-SOK_82.docx

Version: 1.0.23049

Page 7 of 29

Connection of KABA Offline Components

2.3.1  CardLink instance

A  CardLink  instance  with  the  name  "CardLink"  has  to  be  created  manually.  The  option  "instance  for

CardLink" has to be activated. Subsequently, a USB channel named BCSCW01 is automatically created

in the "CardLink" instance.

The name "CardLink" for the instance synchronized from HYDRA is fixed.

All  settings  related  to  the  instance  and  channel  must  be  managed  in  B-COMM.  HYDRA  will  not

synchronize any data in the instance or channel.

2.3.2  Administration area

An  administration  area  must  be  created  manually  in  this  CardLink  instance  in  B-COMM.  By  default,

HYDRA synchronizes with the administration area with Number 1.

The data of the tabs Parameters and Master must be maintained in the administration area in B-COMM.

HYDRA will not synchronize any data in these tabs, since there are no corresponding settings in HYDRA.

When  creating  an  administration  area,  it  must  be  observed  that  the  media  technology  is  set

correctly, since it cannot be changed subsequently.

Parameters tab

Number

By  default,  HYDRA  expects  an  administration  area  with  Number  1.  Another  number  can  also  be

used.  This  must  then  be  taken  into  consideration  when  the  interface  is  set  up  in  HYDRA,  see

below.

Name

Assign a meaningful name.

Validation periods and validation method

The validation period 3 must be configured, e.g. for 1 or 2 days. This validation period will be used

by HYDRA for all components and badges.

Other fields

The other fields must be maintained in accordance with the B-COMM documentation.

Master tab

Other fields

The other fields must be maintained in accordance with the B-COMM documentation.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 8 of 29

Connection of KABA Offline Components

The data in the tabs Door (groups) and Days off/Special days must not be entered manually in

B-COMM, but are maintained in HYDRA and synchronized to B-COMM.

2.3.3  Create component

The  components  include  settings  and  parameters  not  known  by  HYDRA.  For  this  reason,  automatic

synchronization requires a  "copy  template" in  order to be able to create new components via automatic

synchronization. This copy template must be created once in B-COMM upon installation.

Please use door number 512 and the component type you will primarily use for this purpose!

HYDRA  will  then  always  use  the  component  with  the  lowest  door  number  (Door  (groups)  tab,  Door

number  field)  as  copy  template,  if  new  accesses  not  yet  existing  in  B-COMM  are  created  in  HYDRA.

Please observe that valid door numbers for CardLink start from 512.

The  key  for  synchronizing  the  HYDRA  accesses  to  the  components  in  B-COMM  is  the  Door  number

managed in the Door (groups) tab.

Accesses for Kaba offline components must be created in HYDRA in an access number range

from  512  to  4511.  Synchronization  with  B-COMM  only  takes  place  for  accesses  where  the

Offline component option is set.

Details as to which tabs and fields are synchronized upon synchronization from HYDRA can be found in

the document dealing with the configuration of offline components.

If  you  use  offline  components  of  different  Types,  it  may  be  necessary  to  make  a  manual

correction  after  synchronization,  since  the  type  of  the  component  with  the  lowest  number  will

also be copied.

2.4  Set up the interface to B-COMM in HYDRA

The  settings  for  the  interface  have  to  be  made  in  HYDRA.  The  configurations  are  managed  via  the  INI

configuration .

For this purpose, the INI configuration CARDLINK has to be entered first.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 9 of 29

Connection of KABA Offline Components

Subsequently, a number of INI data configurations have to be made:

Section BCOMM, key JAVA_INST_PATH

Installation  path  of  Java  installation,  e.g.  "c:\Program  Files\Java\jdk1.5.0_16\bin".  Setting  the

parameter  is  mandatory  to  ensure  correct  assignment  of  the  Java  version.  The  path  must  be

indicated without the trailing slash/backslash!

Section BCOMM, key RMI_SERVER

Name  or  IP  address  of  the  computer  on  which  the  B-COMM  server  is  installed.  Specification  is

mandatory.

Section BCOMM, key RMI_PORT

RMI port number. Specification is optional, default value is 1099.

Section BCOMM, key ADMIN_AREA_IDX

Number of the administration area managed by HYDRA. Specification is optional, default value is

Administration area 1.

2.5  Setup of provision of CardLink data

The  authorizations  for  the  access  at  Kaba  offline  components  are  provided  cyclically  on  the  HYDRA

server  and  loaded  cyclically  by  the  HYDRA  PZE  terminals  in  order  to  write  them  on  the  badges  of  the

employees. This configuration only  provides authorizations for accesses with  KABA offline components.

This refers to accesses assigned to a terminal of the type "KABA Programmer".

ZKS-SOK_82.docx

Version: 1.0.23049

Page 10 of 29

Connection of KABA Offline Components

2.5.1  Configuration of badge type

The  type  of  the  badges  used  for  CardLink  must  be  set  via  an  INI  configuration.  A  standardized  badge

type must be used for each HYDRA system.

For this purpose, the INI configuration CARDLINK has to be entered first, if required.

Subsequently, the following INI data configuration has to be made:

Section OPTIONS, key BADGETYPE

The badge type is indicated as a number:

  1 = Legic Prime (default)

2 = Mifare/Legic Advant

2.5.2  Activation in scheduler

The  HYDRA  server  cyclically  updates  and  provides  the  data  required  to  load  authorizations  on  the

badges. For this purpose, an entry must be set up in the Scheduler.

The job is to be set up as 5-minute interval job.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 11 of 29

Connection of KABA Offline Components

"Comment" tab:

Type

Kind

Visible

Active

Product key

License key

S=Standard

I=Interval

Visible

[X] Activated

ZKS

ZKS-SOK

Command (depending on the server operating system)

Windows:

sh cardlink.scr

Linux:

cardlink.scr

The  administration  area  can  be  transferred  to  the  shell  script  cardlink.scr  as  a  parameter.  Multiple

administration areas are used, for example, if several productive instances are installed on one HYDRA

server.

Comment

Provision of authorizations for CardLink

"Interval" tab:

Interval

0:05:00

With  the  default  settings,  the  authorizations  are  provided  on  the  server  every  5  minutes  and

loaded to the PZE terminals every 5 minutes, too. So it may take up to 10 minutes with these

settings until a modified authorization is available at the PZE-terminal and can be loaded on the

badge.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 12 of 29

Connection of KABA Offline Components

3  Configuration of Kaba Offline Components

3.1  Configurations in HYDRA

3.1.1

Terminals

Since the offline components are not connected to an access terminal in deviation to the online accesses,

and  since  the  connection  to  offline  components  is  made  via  the  programmer,  a  terminal  of  the  "Kaba

Programmer" type (terminal type 144) has to be created for the offline components. This "terminal" is then

entered as such in the accesses created for the offline components.

As regards the PZE terminals to be used for validating and loading authorizations on badges, one of the

four absence reason buttons has to be configured with the function "CL" for "Load authorizations".

Writing the authorizations on badges is only possible at terminals with the AIP or ctwin terminal

programs.

In order to be able to use a PZE terminal for writing authorizations on badges, it must be fitted

with  a  write-capable  reader.  In  many  cases  it  is  necessary  to  replace  the  reader  in  the  PZE

terminal by a write-capable reader.

3.1.2  Access groups

A  maximum  of  512  door  groups  can  be  created  in  B-COMM.  For  this  reason,  the  interface  only

synchronizes the access groups with numbers below 512. Access groups with numbers as from 512 are

ignored and recorded in the interface log.

Only  access  groups  with  a  minimum  of  one  KABA  offline  component  are  transferred.  You  can  identify

these accesses if they are assigned to a terminal of the type "KABA Programmer".

3.1.3  Accesses

The option offline component has to be activated for the accesses. Only accesses in the numbering range

from  512  through  4511  are  considered.  The  access  must  be  assigned  to  a  terminal  of  the  "Kaba

Programmer" type (terminal type 144) so that it is synchronized with B-COMM.

Accesses which are assigned to a terminal of the "Kaba Programmer" type but are not located

within the valid range of numbers are ignored and recorded in the error log of the interface.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 13 of 29

Connection of KABA Offline Components

3.1.4  Access time models / access periods

When configuring the access time models, take into account that B-COMM supports a maximum number

of  15  time  profiles  in  one  administration  area.  For  this  reason,  only  the  access  time  models  with  the

numbers 1 through 15 are synchronized with B-COMM via the interface.

With B-COMM, times can only be recorded accurately to the minute. The last minute is always included

completely in the valid time slot. In HYDRA, a time slot ends with the last second before the indicated end

period.  For  this  reason,  the  end  times  of  the  time  slots  are  generally  reduced  by  one  minute  when

transferred to B-COMM. Example: A period from 7:00 AM to 5:00 PM in HYDRA corresponds to a time

slot from 7:00 AM to 4:59 PM in B-COMM.

B-COMM  only  supports  times  between  12:00:00  AM  and  11:59:00  PM  in  the  time  slots.  HYDRA  is

theoretically  capable  of  specifying  periods  with  negative  times  and  times  over  12:00:00  PM  on

neighboring days. This is not possible in B-COMM. For this reason, times outside the range valid for B-

COMM are automatically limited to the valid range upon synchronization.

Please also note that B-COMM supports a maximum of 12 access periods per access time model. Since

the  configuration  of  special  functions,  e.g.  public  holidays  or  doors  permanently  open,  is  managed

differently in B-COMM and HYDRA, more than one B-COMM time slot may result from a single HYDRA

access  period.  This  means  that  the  maximum  number  of  12  time  slots  may  be  exceeded  even  if  fewer

access periods are configured in HYDRA.

If  more  than  12  time  slots  are  required  in  B-COMM,  the  entire  access  time  model  is  not

transferred  to  B-COMM,  so  that  this  error  will  be  noticed  in  any  case.  In  addition,  this  will  be

recorded in the interface log.

Kaba Benzing does not support any validity period for access time models. For this reason, the currently

valid  access  time  model  is  always  transferred  to  B-COMM.  If  the  access  time  model  changes  in  the

future, this change has to be transferred to the offline components on the relevant day.

As  regards  changes  to  the  access  time  models,  please  take  into  account  that  the  transfer  of

access time models to the components via the programmer is time-independent from writing the

authorizations on the badge. For this reason, it is almost impossible to change the numbers or

meanings of access time models.

3.1.5  Opening hours

B-COMM does not support any  opening  hours  in the  HYDRA sense. The  definition  of when a badge is

granted access depends solely on the access authorizations of the badge.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 14 of 29

Connection of KABA Offline Components

For  B-COMM,  the  opening  hours  in  HYDRA  are  used  solely  to  configure  Doors  permanently  open  and

Office unlocked (see following section).

Kaba Benzing does not support any validity period for opening hours. For this reason, the currently valid

opening  hours  are  always  processed  in  the  interface  to  B-COMM.  If  the  access  time  model  of  opening

hours changes in the future, this change has to be transferred to the offline components on the relevant

day.

3.1.6  Opening hours/doors permanently open/office unlocked

It is not possible to combine Doors permanently open and Office unlocked in one access time model in B-

COMM. If an access time model with both functions exists in HYDRA, only the Doors permanently open

function will be transferred to B-COMM.

The  authorization  for  implementing  Office  unlocked  must  be  assigned  to  the  badge  via  the

access  authorizations  of  the  access  profile  in  addition  to  the  access  time  model  of  HYDRA

opening hours.

3.1.7  Multiple access time models for one access group

By  assigning  several  access  time  models  to  one  badge,  it  is  possible  that  the  badge  has  several

authorizations with different access time models for the same access group. If the validity periods of the

authorizations overlap, only the authorization with the lower number of the access time model is written

on the badge.

Consequently, the structure of the access time models should ensure that models with a lower

number include the longer access periods, and the models with very restricted access periods

should  be  assigned  with  higher  numbers.  An  access  time  model  granting  authorization  for  24

hours on every day should be number 1.

3.1.8  Public holidays

For B-COMM, special days and days off are derived from the public holidays in HYDRA.

HYDRA  public  holidays  of  the  "Other  day  off"  type  become  days  off  in  B-COMM.  Other  types  of  public

holidays become special days.

B-COMM only processes 2 types of public holidays. For this reason, the HYDRA public holiday

types  Public  holiday  and  Important  public  holiday  are  transferred  to  B-COMM  with  the  same

time authorizations. Consequently, it makes no sense to enter deviating  access periods for the

public  holiday  type  Important  public  holiday  in  the  access  time  models  used  in  the  offline

ZKS-SOK_82.docx

Version: 1.0.23049

Page 15 of 29

Connection of KABA Offline Components

components.

All future public holidays entered  in HYDRA are forwarded to B-COMM and transferred to the

offline components via the  programmer. After entering the public holidays for  a new  year, it  is

necessary  to  distribute  them  to  all  offline  components  by  means  of  the  programmer (provided

there are deviating time slots for public holidays in the offline components).

3.2  Data managed in the B-COMM server

3.2.1  Administration area

3.2.1.1  Overview

Only  one  administration  area  is  managed  by  the  interface  from  HYDRA.  By  default,  this  is  the

administration  area  with  the  number  1.  If  required,  the  number  can  be  adjusted  by  customizing  the

interface.

HYDRA  automatically  synchronizes  the  tabs  Time  profiles/TimePro,  Door(groups)  and  Days  off/Special

days of the  administration  area. The master data of the administration  area  itself (tabs  Parameters  and

Master) are not managed by the interface. They must be maintained manually in the B-COMM GUI.

Before the first successful run of the interface, the CardLink administration area has to be created in B-

COMM, otherwise synchronization will not be possible.

3.2.1.2

Parameters tab

The settings in the Parameter tab are not managed by the interface from HYDRA. They must be edited in

B-COMM.

3.2.1.3  Master tab

The settings in the Master tab are not managed by the interface from HYDRA. They must be edited in B-

COMM.

3.2.1.4

Time profiles/TimePro tab

The  data  in  the  Time  profiles/TimePro  tab  is  maintained  completely  via  the  interface  from  HYDRA  and

derived  from  the  access  time  models.  Manual  modifications  in  B-COMM  are  overwritten  with  the  next

synchronization from HYDRA.

The  OfficeIndividual  mode  is  used  for  Office  unlocked  in  the  time  profiles  of  type  TimePro.  As  a

consequence, it is possible to control Office unlocked for each badge individually.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 16 of 29

Connection of KABA Offline Components

3.2.1.5  Door (groups) tab

The  data  in  the  Door  (groups)  tab  is  maintained  completely  via  the  interface  from  HYDRA  and  derived

from the access groups and opening hours in HYDRA. Manual modifications in B-COMM are overwritten

with the next synchronization from HYDRA.

Since  B-COMM  does  not  support  any  opening  hours  in  the  HYDRA  sense,  the  time  profile  Default

(always) is assigned to the door groups.

3.2.1.6  Days off/special days tab

The  data  in  the  Days  off/special  days  tab  is  maintained  completely  via  the  interface  from  HYDRA  and

derived from the public holidays in HYDRA. HYDRA public holidays of the "Other day off" type become

days off in B-COMM. Other types of public holidays become special days.

Manual modifications in B-COMM are overwritten with the next synchronization from HYDRA.

3.2.2  Components

3.2.2.1  Overview

The components correspond to the accesses in HYDRA. Some settings are synchronized from HYDRA in

the  components,  others  do  not  have  any  equivalent  in  HYDRA  and  must  therefore  be  maintained

manually  in  B-COMM.  When  synchronizing  the  components  from  HYDRA  to  B-COMM,  the  following

incidents may occur:

1.  The HYDRA access already exists as a component in B-COMM

The already existing data of the component is superimposed by the data from HYDRA (details
are described below).

2.  The HYDRA access HYDRA does not yet exist in B-COMM

The new component is copied from the first component of B-COMM (sorted by index) and
subsequently the data from HYDRA is superimposed (details are described below). If no first
component is available, no accesses can be transferred from HYDRA to B-COMM. This is
recorded in the log file.

3.  The component in B-COMM no longer exists as an access in HYDRA

The component is deleted completely from B-COMM.

The key for synchronizing the HYDRA accesses to the components in B-COMM is the door number (Door

(groups) tab, Door number field).

3.2.2.2

Parameters tab

The following fields are synchronized from HYDRA:

ZKS-SOK_82.docx

Version: 1.0.23049

Page 17 of 29

Connection of KABA Offline Components

Name

The  name  is  composed  of  the  number  and  the  designation  of  the  access.  Since  B-COMM  has

restrictions  in  this  field,  the  following  changes  are  made  to  the  name:  Lower  case  letters  are

converted into upper case letters, impermissible characters are replaced with minus signs, and the

length is limited to 30 characters.

Validation

This field is assigned with the value 3.

Lock opening time (door bolt)

The lock opening time is transferred from the field "Relay time: opener" of the HYDRA access and

limited to the valid value range from 2 to 10 seconds.

All other fields must be edited manually in B-COMM.

3.2.2.3  Master tab

The settings in the Master tab are not maintained by the interface from HYDRA. They must be edited in

B-COMM.

3.2.2.4  Door (groups) tab

Door number

The door number is the key via which HYDRA synchronizes the accesses to the components.

The Door (groups) are derived from the HYDRA access groups and accesses.

The  tab  is  transferred  completely  from  HYDRA;  manual  changes  are  overwritten  with  the  next

synchronization.

3.2.2.5

TimePro tab

The TimePro function is activated by the interface. Time profiles of the TimePro type are derived from the

opening hours of the access group of the relevant access.

The  tab  is  completely  transferred  from  HYDRA;  manual  changes  are  overwritten  with  the  next

synchronization.

3.2.2.6  Days off tab

The days off of a component are derived from the HYDRA public holidays of the  Other day off type. The

access  location  is  considered  in  this  case.  A  public  holiday  is  valid  for  the  access  if  the  location  of  the

public holiday is empty or coincides with the location of the access group.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 18 of 29

Connection of KABA Offline Components

3.2.2.7

Special days tab

The special days of a component are derived from the HYDRA public holidays of the  Public holiday and

Important public holiday type. The access location is considered in this case. A public holiday is valid for

the access if the location of the public holiday is empty or coincides with the location of the access group.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 19 of 29

Connection of KABA Offline Components

4  Synchronization of KABA Offline Components

4.1  Overview

The  initialization  of  Kaba  offline  components  (digital  cylinders  and  electronic  door  mounts)  and  the

synchronization of specific configurations (e.g. access time models and public holidays) are implemented

via the Kaba Programmer 1460, which is loaded via the Kaba B-COMM software.

An interface between HYDRA and the B-COMM server automatically synchronizes accesses configured

in HYDRA and other access configurations with Kaba B-COMM.

4.2  Configuration of the interface

The technical settings  and  configurations regarding  the interface connection to the B-COMM server are

described in a separate document on the installation of the CardLink function.

4.3

Initiation and process of synchronization

The  synchronization  of  the  B-COMM  offline  components  is  initiated  directly  and  automatically  upon  the

modification of master data in HYDRA Access Control. Every time, the complete administration area with

all  sub-elements

is  synchronized.  The

following  modifications

to  master  data  will

initiate  a

synchronization:

  Accesses

  Access groups

  Opening hours

  Access time models

  Access periods

  Public holidays

Since only one synchronization can run at a time, modifications which are made at virtually the same time

at various clients in HYDRA will be transferred to the B-COMM server one after the other. This may result

in minor synchronization delays.

4.4  Logging

Synchronization  runs  are  recorded  in  the  HYDRA  system  logs.  They  are  identifiable  as  BCOMM

application. The system logs must be checked regularly for errors.

All started synchronization runs are recorded in the log file err\zksoffline.pro of the HYDRA server. This

file  also  indicates  when  several  interface  calls  are  serialized  due  to  the  simultaneous  modification  of

master data at different HYDRA clients.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 20 of 29

Connection of KABA Offline Components

4.5  Access log

The  access  logs  can  be  read  from  the  offline  components  by  means  of  the  Kaba  Programmer  and

evaluated in B-COMM.

An interface transferring the access logs from B-COMM to HYDRA does not exist.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 21 of 29

Connection of KABA Offline Components

5  CardLink

5.1  Overview

When using KABA offline components (electronic door mountings and digital cylinders), CardLink allows

for loading authorizations  onto the badge by  using the terminal program AIP  or ctwin  at  PZE terminals.

The advantage of this is that in the event of changes to the authorizations, it is not necessary to load the

authorizations onto the affected components on site.

When clocking at a  PZE terminal,  the authorizations  on the  badge are  automatically  "validated".  A  time

stamp  is  updated  on  the  badge,  and  the  authorizations  on  the  badge  are  subsequently  valid  for  the

validation period set in B-COMM. Typically, this period is set to approx. 16 hours, so that there will not be

any  valid  authorizations  in  the  course  of  the  next  day  for  lost  badges  deactivated  in  HYDRA,  and

authorizations also can no longer be validated or loaded at the PZE terminal.

If the PZE terminal detects that the authorizations on the badge are no longer valid, the employee will be

informed at the PZE terminal that new authorizations are available and should be loaded onto the badge.

As  for  the  following  changes,  the  system  will  recognize  that  the  authorizations  for  offline  components

have changed:

  Change in access profile

A  change  in  the  access  profile  affects  all  badges  to  which  this  access  profile  is  assigned,

provided this change affects an access group which includes offline components.

  Change in access profile assignment

If  the  access  profile  assignments  for  a  badge  change  and  an  access  configured  as  an  offline

component is affected by this.

  Change in validity period of a badge

If  the  validity  period  of  a  badge  was  changed  or  the  badge  is  deactivated.  This  may  also  be

initiated by a change of the badge number or the date of leaving in the HR master data.

If  several  versions  with  interrupted  validity  periods  exist  for  a  badge  in  HYDRA,  the

authorizations are only written onto the badge until the end of the current validity period. Upon

expiry of this validity period, the employee is requested to reload the authorizations at the PZE

terminal.

5.2  Requirements

The use of CardLink requires memory space on the badge. Legic badges require a separate segment.

A Legic badge must be structured as follows:

ZKS-SOK_82.docx

Version: 1.0.23049

Page 22 of 29

Connection of KABA Offline Components

-  The badge must have two segments: The standard PZE/ZKS access segment and the CardLink

segment.

-  Each segment must have its own, unambiguous search string.

-  The  first  segment  is,  by  definition,  the  standard  PZE/ZKS  access  segment  with  search  string  +

badge data (standard MPDV segment). For this segment, reading access only is required.

-  The second segment is the CardLink segment. This segment must have sufficient memory space

and allow for both reading and writing access.

At present, CardLink is only available for Legic badges (Legic Prime and Legic Advant).

In addition, a special write-capable reader is required at those PZE terminals where authorizations are to

be  written  on  the  badge.  This  is  a  new  LEGIC  Advant  write-capable  reader  (with  "LGA"  in  the  MPDV

product description; example: 382-ILGAL).

5.3  Memory requirements on the legic badge

The required size of the segment is calculated according to the following formula:

10 bytes + 10 bytes x number of authorized access groups

If a badge is authorized for offline components,  which are categorized in 5  different access groups, the

memory space requirement is:

10 bytes + 10 bytes x 5 = 60 bytes

If  the  badge  is  authorized  for  an  access  group  for  several,  interrupted  periods,  another  10  bytes  are

added for each period.

The  required  memory  space  for  authorizations  has  an  effect  on  the  duration  needed  to  write

authorizations:  Approx.  1  second  is  needed  for  each  100  bytes.  For  this  reason,  you  should

attempt to summarize the offline component accesses in as few access groups as possible.

5.4  Updating authorizations at the PZE terminal

The PZE terminals load the authorizations for offline  components in a cycle of 5 minutes, so that these

authorizations can also be validated and/or loaded in  the offline case. This cycle duration can  be set in

seconds  in  the  configuration  file  hytnrcfg.ini  for  terminals  with  the  terminal  program  AIP,  and  in  the  file

hytnrcfg.bsp for terminals with the terminal program ctwin, respectively:

[ CARDLINK.LST ]

loadtime=300

ZKS-SOK_82.docx

Version: 1.0.23049

Page 23 of 29

Connection of KABA Offline Components

5.5  Writing authorizations at the PZE terminal

The  authorizations  of  a  person  are  written  on  the  badge  at  the  PZE  terminal  by  using  one  of  the  4

absence reason buttons.

Required program statuses:

Terminal program

drv_crypt.dll

ctwin.exe

ctaip.exe

Versions

V# 2.0.0.2

V# 7.2.7.19

V# 2.0.3.7

.\packets\pzezks72.dll

V# 2.0.1.22

5.5.1

Terminal configuration at the console

The CardLink function is configured in the terminal configuration in the tab "HR functions". The writing of

authorizations on the badge can be configured with the "Absence reason" CL and an appropriate text on

an absence reason button.

5.5.2

Terminal configuration

For  writing  on  badges,  a  reader-specific  DLL  has  to  be  configured  at  the  terminal.  At  present,  the

following DLL are available:

DLL

Description

drv_crypt.dll

Driver for LEGIC Advant reader (e.g. 382-ILGAL, CTB-LGALU, CT-
LGALTU)

The  configuration  is  performed  at  the  terminal  in  the  file  ctaip.ini  for  AIP  terminals,  and  in  the  file

ctwin.ini for terminals with the ctwin terminal program, respectively.

Driver activation (x stands for the number of the serial interface):

[COMPORTS]

COMx=drv_crypt

Activating the CardLink functionality:

[COMPORTS-PARAM]

DRV_CRYPT-PARAM=SETTINGS=CL|

Customer-specific configuration (example):

[COMPORTS-PARAM]

DRV_CRYPT-PARAM=SETTINGS=CL|SEARCHSTRING=2C2D2E000000|STARTADDRESS=6|

ZKS-SOK_82.docx

Version: 1.0.23049

Page 24 of 29

Connection of KABA Offline Components

Depending on the structure of the badges used, a customer-specific configuration may also be required.

Primarily,  this  includes  settings  for  the  CardLink  segment:  search  string,  segment  size  and  data  start

address.

These settings have an impact on the reader behavior. These entries should be made carefully,

since  they  have  an  effect  on  the  overall  behavior  of  the  CardLink  application.  Adaptations

should only be made after consultation with MPDV.

The parameters described below can be set within the parameter string "DRV_CRYPT-PARAM" in order

to  implement  the  customer-specific  configuration.  If  several  parameters  are  used,  they  are  to  be

separated by "|" (Pipe).

Parameter

SEARCHSTRING

STARTADDRESS

Description

Search string of the CardLink segment

The default is "2C2D2E000000"

This indicates the start address on the badge

within the access segment. Usually immediately

behind the search string.

Example: The entry 3 corresponds to the fourth

byte as start address (counting starts at 0). The

authorizations are consequently written as from the

fourth byte.

The default value is 6.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 25 of 29

Connection of KABA Offline Components

5.5.3  Process at the terminal

New rights are available for a badge:

The function "Load authorizations" is selected via the relevant function key.

Please note:

The screenshots show the display of the AIP terminal when loading authorizations on a

badge. The display at CTWIN is comparable in terms of the contents.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 26 of 29

The following note is displayed when authorizations are written on a badge:

Connection of KABA Offline Components

After the successful writing of authorizations, the note is closed and successful processing is indicated as

follows, as when clocking:

ZKS-SOK_82.docx

Version: 1.0.23049

Page 27 of 29

In the case of an error, a message window opens, which can be closed by selecting "OK". The contents

depend on the error occurred.

Connection of KABA Offline Components

Possible errors are:

Error

Description

-11008

DRV_TREIBER_ERROR_WRITEDATA
Error while writing the badge data.
Possible causes:

-11009

-11010

-  Badge removed from reader during writing.
-  Badge does not have sufficient memory space.
-  Communication with reader and/or badge disrupted.

DRV_TREIBER_TIMEOUT_WRITEDATA
Timeout while writing the badge data.
Possible causes:

-  Communication with reader and/or badge disrupted.

DRV_TREIBER_WRITE_VAL_ERR
Error during validation of badge.
Possible causes:

-  Badge removed from reader during writing.
-  Communication with reader and/or badge disrupted.

-11011

DRV_TREIBER_WRITE_DEVAL_ERR
Error during invalidation of badge.
Possible causes:

-  Badge removed from reader during writing.
-  Communication with reader and/or badge disrupted.

-11013

DRV_TREIBER_WRITE_DATA_SEG_TO_SMALL_VALID
The data to be written does not fit into the CardLink segment.
Possible causes:

ZKS-SOK_82.docx

Version: 1.0.23049

Page 28 of 29

Connection of KABA Offline Components

-  The CardLink segment is too small.
-  Authorizations have to be optimized.

-11014

DRV_TREIBER_WRITE_DATA_SEG_TO_SMALL_NOT_VALID
The data to be written does not fit into the CardLink segment.
Possible causes:

-  The CardLink segment is too small.

Authorizations have to be optimized.

ZKS-SOK_82.docx

Version: 1.0.23049

Page 29 of 29


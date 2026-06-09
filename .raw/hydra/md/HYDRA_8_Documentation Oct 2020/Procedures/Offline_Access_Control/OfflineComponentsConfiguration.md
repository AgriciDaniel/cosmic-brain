Configuration of Kaba Offline Components

1  Configuration of Kaba Offline Components

1.1  Configurations in HYDRA

1.1.1

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

1.1.2  Access groups

A  maximum  of  512  door  groups  can  be  created  in  B-COMM.  For  this  reason,  the  interface  only

synchronizes the access groups with numbers below 512. Access groups with numbers as from 512 are

ignored and recorded in the interface log.

Only  access  groups  with  a  minimum  of  one  KABA  offline  component  are  transferred.  You  can  identify

these accesses if they are assigned to a terminal of the type "KABA Programmer".

1.1.3  Accesses

The option offline component has to be activated for the accesses. Only accesses in the numbering range

from  512  through  4511  are  considered.  The  access  must  be  assigned  to  a  terminal  of  the  "Kaba

Programmer" type (terminal type 144) so that it is synchronized with B-COMM.

Accesses which are assigned to a terminal of the "Kaba Programmer" type but are not located

within the valid range of numbers are ignored and recorded in the error log of the interface.

OfflineComponentsConfiguration.docx

Version: 2.0.18468

Page 1 of 7

Configuration of Kaba Offline Components

1.1.4  Access time models / access periods

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

1.1.5  Opening hours

B-COMM does not support any  opening  hours  in the  HYDRA sense. The  definition  of when a badge is

granted access depends solely on the access authorizations of the badge.

OfflineComponentsConfiguration.docx

Version: 2.0.18468

Page 2 of 7

Configuration of Kaba Offline Components

For  B-COMM,  the  opening  hours  in  HYDRA  are  used  solely  to  configure  Doors  permanently  open  and

Office unlocked (see following section).

Kaba Benzing does not support any validity period for opening hours. For this reason, the currently valid

opening  hours  are  always  processed  in  the  interface  to  B-COMM.  If  the  access  time  model  of  opening

hours changes in the future, this change has to be transferred to the offline components on the relevant

day.

1.1.6  Opening hours/doors permanently open/office unlocked

It is not possible to combine Doors permanently open and Office unlocked in one access time model in B-

COMM. If an access time model with both functions exists in HYDRA, only the Doors permanently open

function will be transferred to B-COMM.

The  authorization  for  implementing  Office  unlocked  must  be  assigned  to  the  badge  via  the

access  authorizations  of  the  access  profile  in  addition  to  the  access  time  model  of  HYDRA

opening hours.

1.1.7  Multiple access time models for one access group

By  assigning  several  access  time  models  to  one  badge,  it  is  possible  that  the  badge  has  several

authorizations with different access time models for the same access group. If the validity periods of the

authorizations overlap, only the authorization with the lower number of the access time model is written

on the badge.

Consequently, the structure of the access time models should ensure that models with a lower

number include the longer access periods, and the models with very restricted access periods

should  be  assigned  with  higher  numbers.  An  access  time  model  granting  authorization  for  24

hours on every day should be number 1.

1.1.8  Public holidays

For B-COMM, special days and days off are derived from the public holidays in HYDRA.

HYDRA  public  holidays  of  the  "Other  day  off"  type  become  days  off  in  B-COMM.  Other  types  of  public

holidays become special days.

B-COMM only processes 2 types of public holidays. For this reason, the HYDRA public holiday

types  Public  holiday  and  Important  public  holiday  are  transferred  to  B-COMM  with  the  same

time authorizations. Consequently, it makes no sense to enter deviating  access periods for the

public  holiday  type  Important  public  holiday  in  the  access  time  models  used  in  the  offline

OfflineComponentsConfiguration.docx

Version: 2.0.18468

Page 3 of 7

Configuration of Kaba Offline Components

components.

All future public holidays entered  in HYDRA are forwarded to B-COMM and transferred to the

offline components via the  programmer. After entering the public holidays for a new  year, it  is

necessary  to  distribute  them  to  all  offline  components  by  means  of  the  programmer (provided

there are deviating time slots for public holidays in the offline components).

1.2  Data managed in the B-COMM server

1.2.1  Administration area

1.2.1.1  Overview

Only  one  administration  area  is  managed  by  the  interface  from  HYDRA.  By  default,  this  is  the

administration  area  with  the  number  1.  If  required,  the  number  can  be  adjusted  by  customizing  the

interface.

HYDRA  automatically  synchronizes  the  tabs  Time  profiles/TimePro,  Door(groups)  and  Days  off/Special

days of the  administration  area. The master  data of the administration  area  itself (tabs  Parameters  and

Master) are not managed by the interface. They must be maintained manually in the B-COMM GUI.

Before the first successful run of the interface, the CardLink administration area has to be created  in B-

COMM, otherwise synchronization will not be possible.

1.2.1.2

Parameters tab

The settings in the Parameter tab are not managed by the interface from HYDRA. They must be edited in

B-COMM.

1.2.1.3  Master tab

The settings in the Master tab are not managed by the interface from HYDRA. They must be edited in B-

COMM.

1.2.1.4

Time profiles/TimePro tab

The  data  in  the  Time  profiles/TimePro  tab  is  maintained  completely  via  the  interface  from  HYDRA  and

derived  from  the  access  time  models.  Manual  modifications  in  B-COMM  are  overwritten  with  the  next

synchronization from HYDRA.

The  OfficeIndividual  mode  is  used  for  Office  unlocked  in  the  time  profiles  of  type  TimePro.  As  a

consequence, it is possible to control Office unlocked for each badge individually.

OfflineComponentsConfiguration.docx

Version: 2.0.18468

Page 4 of 7

Configuration of Kaba Offline Components

1.2.1.5  Door (groups) tab

The  data  in  the  Door  (groups)  tab  is  maintained  completely  via  the  interface  from  HYDRA  and  derived

from the access groups and opening hours in HYDRA. Manual modifications in B-COMM are overwritten

with the next synchronization from HYDRA.

Since  B-COMM  does  not  support  any  opening  hours  in  the  HYDRA  sense,  the  time  profile  Default

(always) is assigned to the door groups.

1.2.1.6  Days off/special days tab

The  data  in  the  Days  off/special  days  tab  is  maintained  completely  via  the  interface  from  HYDRA  and

derived from the public holidays in HYDRA. HYDRA public holidays of the "Other day off" type become

days off in B-COMM. Other types of public holidays become special days.

Manual modifications in B-COMM are overwritten with the next synchronization from HYDRA.

1.2.2  Components

1.2.2.1  Overview

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

1.2.2.2

Parameters tab

The following fields are synchronized from HYDRA:

OfflineComponentsConfiguration.docx

Version: 2.0.18468

Page 5 of 7

Configuration of Kaba Offline Components

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

1.2.2.3  Master tab

The settings in the Master tab are not maintained by the interface from HYDRA. They must be edited in

B-COMM.

1.2.2.4  Door (groups) tab

Door number

The door number is the key via which HYDRA synchronizes the accesses to the components.

The Door (groups) are derived from the HYDRA access groups and accesses.

The  tab  is  transferred  completely  from  HYDRA;  manual  changes  are  overwritten  with  the  next

synchronization.

1.2.2.5

TimePro tab

The TimePro function is activated by the interface. Time profiles of the TimePro type are derived from the

opening hours of the access group of the relevant access.

The  tab  is  completely  transferred  from  HYDRA;  manual  changes  are  overwritten  with  the  next

synchronization.

1.2.2.6  Days off tab

The days off of a component are derived from the HYDRA public holidays of the  Other day off type. The

access  location  is  considered  in  this  case.  A  public  holiday  is  valid  for  the  access  if  the  location  of  the

public holiday is empty or coincides with the location of the access group.

OfflineComponentsConfiguration.docx

Version: 2.0.18468

Page 6 of 7

Configuration of Kaba Offline Components

1.2.2.7

Special days tab

The special days of a component are derived from the HYDRA public holidays of the  Public holiday and

Important public holiday type. The access location is considered in this case. A public holiday is valid for

the access if the location of the public holiday is empty or coincides with the location of the access group.

OfflineComponentsConfiguration.docx

Version: 2.0.18468

Page 7 of 7


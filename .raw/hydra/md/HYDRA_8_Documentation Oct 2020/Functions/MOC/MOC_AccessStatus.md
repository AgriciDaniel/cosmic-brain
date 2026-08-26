Access Status

1  Status of access point

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

MOC_AccessStatus.docx

Version: 1.0.18909

Page 1 of 3

Access Status

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

MOC_AccessStatus.docx

Version: 1.0.18909

Page 2 of 3

Access Status

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

instead of the green plus sign, the battery must be replaced. The battery status is identified when

the  data  is  read  from  the  offline  component  and  therefore  does  not  necessarily  represent  the

current status.

MOC_AccessStatus.docx

Version: 1.0.18909

Page 3 of 3


Room Zones

1  Room Zones

Summary

Menu

Master data  Access control  Room zones

Transaction code

rozo

Function authorization

rozo

Room  zones  can  be  used  to  verify  whether  or  not  employees  are  present  in  specific  rooms  or  areas.

Room  zones  can  be  entered  and  exited  using  access  points.  This  can  be  configured  along  with  the

access points.

Validation checks may be enabled to make sure that an employee may only enter a room zone if he/she

is not already present or may only leave it if he/she is already present.

A maximum occupation rate can be defined for room zones. Consequently, employees might be rejected

if the parking lot is full, for instance.

Two requirements need to be met to be able to use room zones:

1.  Both, the entries and the exits need to be controlled by access control.

2.

It has to be ensured that all  employees log  in  and out individually  at the  entries  and  exits. This

can either be realized by an organizational or technical approach (e.g. turnstiles).

MOC_RoomZones.docx

Version: 1.0.18468

Page 1 of 2

Room Zones

Field description

Room zone, designation

Number of the room zone and its name

Responsibility area

Responsibility  area  which  the  room  zone  is  assigned  to.  The  responsibility  area  is  checked  when

editing this configuration and, in addition, it is also verified whether or not the "use" authorization is

available  when  room  zone  assignments  are  created,  changed  and  deleted  within  the  room  zone

overview.

Validation checking upon entry, validation checking upon exit

These  two  options  specify  whether  the  entrance  into  the  room  zone  is  denied  if  the  badge  is

already present in the room zone or whether the exit from the room zone is denied if the badge is

not present in the room zone.

Log attendance in room zone

By  this  option,  past  periods  when  an  employee  was  present  in  the  room  zone  can  be  recorded.

These  logs  can  be  viewed  using  the  room  zone  overview.  If  logging  is  disabled,  the  room  zone

overview  only  shows  the  currently  present  employees  and  these  entries  are  deleted  when  the

employee exits the room zone.

Maximum occupancy

The maximum number of employees that may be present in the room zone can be configured here.

Any  further  access  attempt  will  be  rejected  and  recorded  including  the  reason  "Room  zone

completely occupied" within the access log, once this maximum number has been exceeded.

Channel for max. occupancy

The channel specified here is triggered at the ZKS terminal if the maximum number of employees

that  may  be  present  in  the  room  zone  has  been  reached.  This  channel  can  trigger,  for  example,

lights (red/green traffic lights).

MOC_RoomZones.docx

Version: 1.0.18468

Page 2 of 2


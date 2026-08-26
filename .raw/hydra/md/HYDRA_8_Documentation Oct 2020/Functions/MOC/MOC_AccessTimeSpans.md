Access Periods

1  Access Periods

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

MOC_AccessTimeSpans.docx

Version: 1.1.14739

Page 1 of 2

Access Periods

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

The  "office  unlocked"  function  is  only  processed  by  AIP/CTWIN  terminals  if  the

modification TNR-OUL is enabled.

Logging

Use this option to specify

- if logging takes place within the access period or

- if access attempts or

- access attempts and actual entries are recorded.

Kaba  Benzing  terminals  do  not  support  this  logging  option.  Kaba  Benzing  terminals

always log all entries and entry attempts.

MOC_AccessTimeSpans.docx

Version: 1.1.14739

Page 2 of 2


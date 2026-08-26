Access Log

1  Access Log

Summary

Menu

Human Resources Management  Access Control  Access Log

Transaction code

aclo

Function authorization

aclo

The  access  log  shows  actual  accesses,  access  attempts  as  well  as  accesses  where  the  entrance/door

was opened too long. When it comes to access attempts, the “reason” column indicates why the access

has been refused.

For employee badges, the list only shows entries if the user is authorized for the responsibility area that is

entered for the relevant person in the HR master. The responsibility area from the badge is checked for

visitor badges.

MOC_AccessLog.docx

Version: 1.1.1362

Page 1 of 3

Access Log

The “reason“ column shows the below-mentioned reasons for access attempts:

Reason

Description

No badges loaded

There are no authorized badges for the entrance

Unauthorized badge

This badge is not authorized for the entrance

ID card beyond validity period

The access attempt was made outside of the validity period of the
badge

Beyond access time model

The access attempt was made outside of the assigned access
time model

Beyond opening hours

The access attempt was made outside of the opening hours of the
entrance

Missing PIN code

No PIN code was entered

Wrong PIN code

The wrong PIN code was entered

Wrong system number

The system number of the badge does not match the system
number of the basic parameter settings.

Bag check

The employee has been selected for bag checking

Alarm system activated

Access denied, as the alarm system is active

Duplicate posting within lock time

This badge has already entered the access within the specified
blocking period

Fingerprint does not match

The fingerprint read in does not match the fingerprint saved on the
badge

Other access point of sec. gate open  Another access point of the security gate was opened

Already present in room zone

Access to the room zone has been denied, as the badge is
already present in the room zone

Not present in room zone

Exiting the room zone has been denied, as the badge is not
present in the room zone

Room zone completely occupied

Access to the room zone has been denied as maximum
occupation has been reached

Office unlocked

The office has been unlocked by the access

Office locked

The unlocked office has been locked again

Access  logs  where  the  badge  number  only  consists  of  zeros  and  no  personnel  number  is

entered indicate that the entry has been opened using a door opener.

MOC_AccessLog.docx

Version: 1.1.1362

Page 2 of 3

Access Log

Selection criteria

The application provides the following selection criteria

Time from; until

The  selection  criteria  “time  from“  or  “time  till”  do  not  directly  refer  to  the  “date  from”  or  “date  till”

fields but the specified period of time is processed for each day within the selected date range.

Toolbar

 Badges

Shows the badge for the selected access log.

MOC_AccessLog.docx

Version: 1.1.1362

Page 3 of 3


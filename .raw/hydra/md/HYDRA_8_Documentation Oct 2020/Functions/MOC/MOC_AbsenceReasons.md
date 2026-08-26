Absence Reasons

1  Absence Reasons

Summary

Menu

Master data  Time and Labor Data  Absence reasons

Transaction code

abre

Function authorization

abre

Absence  reasons  explain  why  employees  have  left  too  early  or  arrived  too  late.  Employees  may  enter

these  reasons  at  PZE  terminals.  The  clockings  that  are  generated  in  this  way  are  called  advance

clockings or subsequent clockings.

Field Descriptions

Absence reason

Number  of  the  absence  reason.  This  number  is  assigned  to  the  individual  buttons  of  the  PZE

terminal within the terminal label or within the absence reason authorization.

MOC_AbsenceReasons.docx

Version: 1.0.1362

Page 1 of 3

Absence Reasons

Company

Company for which the absence reason configuration is to apply. If this field is empty the absence

reason applies for all companies.

Day type

Number of the payment day type  which this absence reason is to be allocated  with. If this field is

empty the payment day type planned for this day is used.

Authorization required

If this field is checked the postings resulting from this absence reason are subject to authorization.

Processing as absence time planning

If  this  option  is  checked  the  absence  reason  is  processed  as  if  it  was  a  planned  absence.  This

allows for the absence reason to be used for filling the target working time, for example, or to enter

half days of leave as absence reason at the terminal.

Meaning

It may be chosen  whether  the clocking record resulting from the absence reason is generated  as

attendance time, absence or business trip/errand.

Start at

Subsequent  clockings  start  with  the  beginning  of  the  skeleton  time,  normal  working  time  or  core

time if the employee was not present before the absence reason applied.

End at

Advance  clockings  end  with  the  end  of  the  skeleton  time,  normal  working  time or  core  time  if  the

employee does not return after the absence reason does no longer apply.

Post on

For the current day only

The absence reason only applies for the current day. Possible absences at the days that follow

are not allocated with this absence reason.

Post on

The  absence  reason  is  used  for  the  current  day  and  for  full-day  absences  on  the  days  that

follow.  However,  if  an  absence  is  planned  within  this  absence  period,  this  planning  takes

priority. This absence reason is used again as soon as the planned absence ends.

Post full days on only

The absence reason is not used on the current day but only for full-day absences on the days

that follow. This setting is used, for example, if employees enter that they want to  take leave

within the next days at the terminal.

MOC_AbsenceReasons.docx

Version: 1.0.1362

Page 2 of 3

Absence Reasons

The specifications made in the fields “start at” and “end at” only affect the first and last  day of

the absence. Whole absence days that are between this first and last day are allocated with the

entered payment day type, just as it is the case for planned absences.

MOC_AbsenceReasons.docx

Version: 1.0.1362

Page 3 of 3


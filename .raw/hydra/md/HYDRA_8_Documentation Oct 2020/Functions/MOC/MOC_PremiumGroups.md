Premium Groups

1  Premium Groups

Summary

Menu

Master data  Incentive wage  Premium groups

Transaction code

prgrp

Function authorization

prgrp.*

In this application, the properties of the premium groups are defined.

MOC_PremiumGroups.docx

Version: 1.0.1362

Page 1 of 6

Premium Groups

Selection criteria

The following selection criteria are available in the application:

Show authorized entries only

Premium groups have a responsibility  area. If this option  is activated, only those premium groups

are  displayed  for  which  the  user  has  a  responsibility  area  authorization  to  do  maintenance.  If  the

option is inactive, all other premium groups present can also be displayed, but not maintained.

Field description

Premium group

Identification of the premium group.

Valid from

Date from which this version of the premium group is valid. A premium group can exist in various

versions.  To  make  a  reasonable  monthly  view  of  the  calculation  possible,  the  premium  groups

should only change at the beginning of the month.

Valid to

The system automatically controls the "Valid to" date. A premium group is automatically valid until

the next version starts.

MOC_PremiumGroups.docx

Version: 1.0.1362

Page 2 of 6

Premium Groups

Premium group type

The following types are possible:

-

Incentive bonus: The group's performance is determined from the standard times for the time

per piece produced and the actual staff processing time required.

-  Utilization bonus: The group's performance is determined from the standard times for the time

per piece produced and the actual machine processing time required.

-  Premium area: If the additional function "Premium areas" is present, this  type can be used to

create premium areas to which premium groups can be assigned in another dialog.

-  Alternative  types:  If  the  additional  function  "Formula-based  premium/  incentive  wages"  is

present, a letter can be specified in the related field "Alternative types" as an alternative type of

the  premium  group.  In  this  way,  if  necessary,  other  types  of  premium  groups  can  be

represented  using  "Formula-based  premium/  incentive  wages".  However,  the  letters  "L“,  "N“,

"B“ and "I“ are reserved internally for HYDRA and cannot be used as an alternative type.

-

Inactive: The premium group is no longer compensated starting on the day of validity.

The calculation formulas for incentive and utilization bonuses are described in another document.

Premium scheme

Additional free numeric field that can be used with the additional function "Formula-based premium/

incentive wages".

Payment according to premium group

If  the  additional  function  LLE-PRB  "Premium  area"  is  present,  it  can  be  used  to  specify  a

superordinate  premium  area  or  another  premium  group  for  each  premium  group  that  is  not  a

premium area, according to which the people in this group are paid. If the additional function LLE-

PRB "Premium area" is not present, this field is not visible.

Responsibility area

A  responsibility  area  must be  assigned  for  each  premium  group.  This  field  is mandatory  because

otherwise no authorization checks can be performed on the data of the premium groups.

Premium accounts

When  "Formula-based  premium/  incentive  wages"  is  used,  specifications  for  the  premium  groups

specific  to  a  customer  are  stored  in  the  premium  accounts.  In  the  standard  premium  forms  no

premium accounts are processed.

MOC_PremiumGroups.docx

Version: 1.0.1362

Page 3 of 6

Weekdays

When "Formula-based premium/ incentive wages" is used, three numerical and one alphanumerical

default  values  can  be  stored  per  weekday.  In  the  standard  premium  forms  no  weekday  related

Premium Groups

specifications are processed.

Processing functions

The following window opens for editing a data set:

MOC_PremiumGroups.docx

Version: 1.0.1362

Page 4 of 6

Premium Groups

MOC_PremiumGroups.docx

Version: 1.0.1362

Page 5 of 6

Premium Groups

MOC_PremiumGroups.docx

Version: 1.0.1362

Page 6 of 6


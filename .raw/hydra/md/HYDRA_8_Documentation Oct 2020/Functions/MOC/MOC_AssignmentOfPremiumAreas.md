Assignment of Premium Areas

1  Assignment of Premium Areas

Summary

Menu

Master Data  Incentive Wages  Assignment of Premium Areas

Transaction code

aspare

Function authorization

aspare.*

This application allows for premium groups to be combined into premium areas. A premium group may be

assigned to several areas, which results in some kind of a hierarchical structure.

The  documentation  dealing  with  the  group  bonus  describes  how  premium  areas  are  processed  and

computed.

Field Description

Premium area, premium group

Assigns  a  premium  area  to  a  premium  group.  Both  fields  are  premium  groups.  But  the  premium

area  has  to  be  configured  as  “premium  area”  and  the  premium  group  must  not  be  configured  as

“premium area”.

MOC_AssignmentOfPremiumAreas.docx  Version: 1.1.1362

Page 1 of 2

Assignment of Premium Areas

Valid from, valid until

Defines  the  period  for  the  assignment.  The  “valid  till”  field  may  remain  empty.  In  this  case,  the

assignment is not restricted with respect to time.

Dates  may  not  overlap  when  premium  groups  are  assigned  to  a  premium  area,  otherwise  an  error

message occurs.

Editing Functions

The below dialog opens to edit a data record:

MOC_AssignmentOfPremiumAreas.docx  Version: 1.1.1362

Page 2 of 2


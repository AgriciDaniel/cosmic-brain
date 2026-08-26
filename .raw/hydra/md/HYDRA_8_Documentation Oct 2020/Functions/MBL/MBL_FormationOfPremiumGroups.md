Formation of Groups at Group Incentives

1  Formation of Groups at Group Incentives

Summary

This document describes how entered data can be assigned to the premium groups of the incentive wage

determination.

  Groups  are  mostly  formed  via  the  assignment  of  machines  to  premium  groups.  The  data

recorded at the machines will then be assigned to the corresponding premium group. This static

assignment of the machines to the premium groups is made at the client using the Assignment of

premium groups application.



Instead of the static assignment of machines to the premium groups, it is also possible to record

a  premium  group  at  the  terminal  when  an  order  is  entered  in  the  entry  dialog.  All  the  postings

connected to the order logon will then be assigned to the premium group. At one  point in time a

machine can only be assigned to a single premium group, also if several orders are logged-in to

the machine.

  Personal  data  (from  the  shop  floor  data  collection  and  the  personnel  time management,  if  any)

may as an option be assigned via the client application Change of groups to the premium group

and this assignment will be personal and be made with the precise time. In  this case, however,

only the personnel postings (B-records) from the shop floor data collection can be compensated

by  the  method  of  the  time  tickets  to  the  premium  groups.  To  do  so,  the  additional  function

"formula-based  premium/  incentive  wage"  and  a  corresponding  customizing  through  MPDV  will

be required.

Order data via the machine used for posting

In  the  BDE  shop  floor  data  collection  the  premium  groups  will  only  be  processed  for  such

workplaces/ machines marked by the incentive wage indicator "G" for "group piecework"!

Per operation log-in the operation posting (U- or E-record) and the related personnel postings (B-records)

will be assigned to a premium group. Since it is possible that it is worked on several premium groups at

one workplace, both the entry of the premium group during the log-in of the operation and the assignment

of premium groups to workplaces will be possible. To do so, HYDRA uses the following logic:

1.

If  a  premium  group  is  specified  in  the  login  dialog  when  an  operation  is  logged-in,  this  premium

group will be used.

MBL_FormationOfPremiumGroups.docx  Version: 1.2.17259

Page 1 of 5

Formation of Groups at Group Incentives

2.

If no premium group is specified when an operation is logged-in, the premium group assigned to the

workplaces will be used.

3.

If no premium group is specified when an operation is logged-in and if no premium group is assigned

to  the  workplace/  the  machine,  an  error message  will  be  issued;  an  operation  cannot  be  logged-in

without indication of the premium group.

The dialog configuration can be used to control (per terminal) whether the field "premium group" will be

available when an operation is logged in or not.

If  several  persons  work  on  the  same  operation  on  group  workplaces,  the  first  person  will  define  the

premium group. The following persons must not indicate another premium group than the first person.

The  assigned  premium  groups  will  then  be  stored  for  further  processing  in  the  order  and  personnel

postings. The editing of postings can be used to correct incorrectly assigned premium groups.

Dialog configuration for entry purposes at the login of OPs

An entry via an OP log-in will only be made if the workplace has the premium indicator "G" and when the

module "Calculation of group incentives" is licensed.

In this case the field for the entry of the premium group (LPRGRP) must be configured into the dialog to

log-in operations (customizing).

To  use  this  described  function,  the  dialogs  Log  OP  on  (A_AN)  and  Log  person  on  (A_P_AN)  must  be

extended by the entry field "premium group".

The bar codes for premium groups will also detected in those instances, in which the entry focus is on a

different field.

Structure of the bar codes

A bar code starts and ends with an asterisk "*" as start and stop sign.

The bar codes must be completed to nine digits useful length (between the asterisks). Due to this amount

of numbers the terminal will detect that this scanned bar code is a premium group.

The (shorter) premium group must be completed to nine digits: For filling purposes and for blanks within

the premium groups underscores"_" must be used!

The  bar  code  must  then  be  formatted  as  bar  code  "Code  39"  in  the  font  "Codedreineun".  This  font  is

available with all console PCs under Windows. It can be used to create tables with bar codes for premium

groups in all current Office applications.

MBL_FormationOfPremiumGroups.docx  Version: 1.2.17259

Page 2 of 5

Formation of Groups at Group Incentives

The following characters are supported by the bar code "Code 39":









The numbers 0 to 9

Capital letters A to Z without umlauts

Blanks (to express bar codes to be written as underscore "_", see examples).

Special indicators $ / - + . %

Other characters such as lower cases will not be supported by the bar code "Code 39".

Examples:

Premium group

12345

PG 12

73

Barcode content
12345678901

Barcode
(font Codedreineun)

*12345____*  *12345____*

*PG_12____*  *PG_12____*

*73_______*  *73_______*

Maintenance of the premium group in the order-related postings

When  BDE  data  are  recorded,  they  will  be  assigned  to  premium  groups  depending  on  the  system

configuration. The premium group is a data field in the BDE postings and is displayed in the "wage data"

tab and can also be modified there.

When  the  premium  group  is  changed  in  the  editing  of  postings,  HYDRA  will  ensure  that  order  and

personnel  postings  that  belong  together  will  have  the  same  premium  group.  The  system  will  recognize

that  order  and  personnel  postings  belong  together  when  the  time-related  centers  of  the  personnel

postings are within the order posting.

MBL_FormationOfPremiumGroups.docx  Version: 1.2.17259

Page 3 of 5

Formation of Groups at Group Incentives

MBL_FormationOfPremiumGroups.docx  Version: 1.2.17259

Page 4 of 5

 Order posting Personnel postings

Formation of groups at group incentives

MBL_FormationOfPremiumGroups.docx  Version: 1.2.17259

Page 5 of 5


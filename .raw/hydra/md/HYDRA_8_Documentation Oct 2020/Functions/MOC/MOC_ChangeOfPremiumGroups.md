Changing Groups

1  Changing Groups

Summary

Menu

Data Collection  Incentive Wages  Change of Groups

Transaction code

grpch

Function authorization

grpch.*

Changing of premium groups is one possibility to build premium groups and to  assign recorded data  to

these  premium  groups.  There  is  a  separate  document  dealing  with  the  different  possibilities  of  building

premium groups.

Premium groups are changed if labor times from PZE wage type postings are included in the computation

of group bonuses. If the wage type is configured in such a way that it is to be included as labor time into

the group bonus and the premium group is determined by the change of groups, changes of groups can

and  must  be  kept  here.  This  is  especially  reasonable  in  connection  with  the  additional  feature

“premium/incentive  wage  based  on  formulas”.  The  standard  premiums  “incentive  bonus  and  utilization

bonus” are still computed on the basis of HYDRA-ADE postings relating to orders and personnel without

taking into account group changes. They are only considered for the generation of group time tickets and,

thus for the personal group participation.

The  collection  can  be  performed  subsequently  or  in  advance  at  the  HYDRA  client.  A  change  of  groups

applies until another change of groups is recorded.

MOC_ChangeOfPremiumGroups.docx

Version: 1.1.18468

Page 1 of 4

Changing Groups

Selection Criteria

The application provides the following, special selection criteria:

Show deleted

Provided that a change of groups that was originally collected at the ADE terminal, is deleted, it is

only designated as “deleted” but remains in the database. If the “show deleted” option is checked

such  original  postings  are  displayed  additionally.  They  are  displayed  in  italics  and  with  a  gray

background and can no longer be changed.

Field Descriptions

Person

Person for which the change of groups is performed.

MOC_ChangeOfPremiumGroups.docx

Version: 1.1.18468

Page 2 of 4

Changing Groups

Premium group

Premium  group  to  which  the  person  switches.  The  premium  group  can  also  be  empty.  An  empty

premium group field means that the person does not work in group bonus as of this point in time.

If “DEFAULT” is entered as premium group, premium groups will be assigned in the corresponding

period  of  time  as  if  no  change  of  groups  was  collected  (default  assignment  without  “change  of

groups”, e.g. using the posted machine or time in individual piecework).

Comment

Optional, detailed description or comment on the change of groups.

Start

End

Date and time as of which the premium group is assigned.

The system fills out this field automatically. A change of groups automatically applies until the next

change of groups starts.

Last editing

Last editor including date and time.

Type

Edited:

Manually collected or edited at the client

Original:

Originally collected at the ADE terminal

Deleted:

Deleted original data

Terminal

Number of the terminal where the change of groups was recorded (additional feature).

MOC_ChangeOfPremiumGroups.docx

Version: 1.1.18468

Page 3 of 4

Editing Functions

The below dialog opens to edit a data record:

Changing Groups

The system automatically fills out the fields of the end time. A change of groups automatically applies until

the next change of groups starts.

The  terminal  field  cannot  be  edited  as  it  is  only  kept  for  data  records  that  are  originally  entered  at  the

terminal.

MOC_ChangeOfPremiumGroups.docx

Version: 1.1.18468

Page 4 of 4


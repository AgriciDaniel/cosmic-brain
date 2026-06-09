Access profile assignments

1  Access profile assignments

Overview

Menu

Human  resources  management    Access  control    Access  profile
assignments
Master data  Access control  Access profile assignments

Transaction code

acpa

Function authorization

acpa

You  use  Access  profiles  to  define  Access  authorizations.  You  then  assign  the  access  profiles  to  the

Badges. In doing so, you define the authorizations of the badges. You can assign several access profiles

to one badge.

Selection criteria

If  you  use  selection  criteria  for  the  fields  of  the  badge  (e.g.  the  personnel  number),  the  system  always

uses the selection criteria of the badge version that is valid today.

MOC_AccessProfileAssignment.docx

Version: 3.0.11592

Page 1 of 4

Access profile assignments

Checking the responsibility area authorization

If you display the list of access profile assignments, the list shows the access profile assignments with a

validity period that includes at least one badge version that authorizes the user to "show".

If you edit the access profile assignments, the system checks if at least one badge version is available in

the validity period of the access profile assignment that authorizes the user to "Use". The user must also

be assigned the option "Use" for the responsibility area of the access profile.

If  you  copy  from/to  a  badge,  the  system  only  checks the  responsibility  area  of  the  badges,  and  not  the

access  profiles.  If  you  use  the  function  "Copy  all  selected  entries",  the  system  checks  each  individual

access profile assignment. It is the same check than if you create individual access profile assignments.

Field descriptions

Valid from, valid until

You  can  use  these  two  fields  to  limit  the  validity  period  of  the  access  profile  assignment.  If  you

leave these fields empty, the validity of the assignment is not restricted.

Fields of the badge (name, personnel number,...)

The fields of the badge version that is valid today are shown.

MOC_AccessProfileAssignment.docx

Version: 3.0.11592

Page 2 of 4

Access profile assignments

Toolbar

 Copy all selected entries

Function authorization: acpa.masscopy

Use this function to copy several access profile assignments at the same time:

You can use the checkboxes to enable each of the 4 fields  Badge, Access profile, Valid from and

Valid until. If  you copy the  entries selected in the table, the system only  copies the fields that are

enabled.

The

function  Copy  all  selected  entries

is  only  available,

if

the  extension

AccessProfileAssignmentVersion2 is activated.

MOC_AccessProfileAssignment.docx

Version: 3.0.11592

Page 3 of 4

Access profile assignments

 Edit all selected entries

Function authorization: acpa.massedit

Use this function to edit several access profile assignments at the same time:

You  can  use  the  checkboxes  to  enable  each  of  the  3  fields  Access  profile,  Valid  from  and  Valid

until.  If  you  edit  the  entries  selected  in  the  table,  the  system  only  takes  over  the  fields  that  are

enabled.

The

function  Edit  all  selected  entries

is  only  available,

if

the  extension

AccessProfileAssignmentVersion2 is activated.

MOC_AccessProfileAssignment.docx

Version: 3.0.11592

Page 4 of 4


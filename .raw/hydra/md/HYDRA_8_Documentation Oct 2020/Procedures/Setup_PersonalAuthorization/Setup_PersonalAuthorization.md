  Configuration of the Personnel Authorization Check

1  Configuration of the Personnel Authorization Check

Purpose

Only employees with appropriate personnel function authorizations are allowed to execute MOC postings

or to enter data via the terminal.

The following options are available to check personnel function authorizations:

  Check the authorization level

  Check authorizations via personnel function profiles



"Complete" signature check with the four eyes principle

Configuration of checking the authorization level

Context of configurations in applications:

Person

Level = 4

Procedure

of checking

Authorization type

e.g. AUTH_ONLY

Mode: authorization check

n

badge number, level

e.g. badge number = 9999

Authorization control

includes the following:

dialog, authorization type, function, level

e.g. Dialog = CA_WL,Dialog

Authorization type 1 = AUTH_ONLY

Function 1 = empty

Level 1 = 4

Authorization control

includes the following:

dialog, authorization type,

function, level

e.g. Dialog = CA_WL,Dialog

Authorization type =

AUTH_ONLY

Function = outputbachchange

Level = 4

If you want to check the authorization level, the function field in the authorization control must remain empty.

In this case, only the employee's level is checked for the dialog/posting.

Configuration of authorization checks via personnel function profiles

Personnel function profile

Profile includes: function, level

Setup_PersonalAuthorization.docx

Version: 1.0.14033

e.g. Profile = "supervisor“

Function= outputbatchchange

Page 1 of 3

Level = 5

  Configuration of the Personnel Authorization Check

Context of configurations in applications:

Personnel function profile

Profile includes: function,

level

e.g. Profile = "supervisor“

Function=

Assignment of the personnel function

outputbatchchange

profile person and personnel function

Level = 5

profile

e.g. badge number "9999“ – "supervisor“

Procedure

of

checking

n

badge number, level

e.g. badge number = 9999

Personnel function profile

Profile includes: function, level

e.g. Profile = "supervisor“

Function= outputbatchchange

Level = 5

Authorization type

e.g. AUTH_ONLY

Mode: authorization check

Authorization control

includes the following:

dialog, authorization type, function, level

e.g. Dialog = CA_WL,Dialog

Authorization type = AUTH_ONLY

Function 1 = outputbatchchange

Authorization control

includes the following:

Level 1 = 4

dialog, authorization type,

function, level

e.g. Dialog = CA_WL,Dialog

Authorization type =

AUTH_ONLY

Function = outputbachchange

Level = 4

If you want to check authorizations via personnel function profiles, the  function field of the authorization

control must be completed with the key that is also stored in the personnel function profile.

Some dialogs are defined by default in the authorization control (-CA_WL). The preceding minus

sign disables these dialogs. You have to remove the minus sign.

Personnel function profile

Configuration of signature checks with the four eyes principle

Context of configurations in applications:

Profile includes: function, level

e.g. Profile = "supervisor“

Function= outputbatchchange

Level = 5

If  you  want  to  check  signatures,  you  must  select  the  appropriate  mode  for  the  authorization  type,  i.e.

signature  check.  The  system  then  stores  the  authorization  type  in  the  authorization  control.  In  the

authorization control, you can configure if comments are mandatory or not.

Additionally, you can define in the authorization control whether one or two signatures/authorizations (i.e.

four eyes principle) are required.

You also have to define levels for each of the two signatures/authorizations.

User

Person

Person

Procedure

of

checking

Authorization type

e.g. SIGNATURE

Mode: signature check

Setup_PersonalAuthorization.docx

Level

Version: 1.0.14033

Page 2 of 3

Authorization control

  Configuration of the Personnel Authorization Check

Authorization control

includes the following:

dialog, authorization type, function,

level

e.g. Dialog = CA_WL,Dialog

Authorization type 1/2 = AUTH_ONLY

Function 1/2 = outputbatchchange

Level 1/2 = 4

Setup_PersonalAuthorization.docx

Version: 1.0.14033

Page 3 of 3


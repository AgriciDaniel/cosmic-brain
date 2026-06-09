Function profiles

1  Function profiles

Overview

Menu

System administration  User administration  Function profiles

Transaction code

fautp

Function authorization

fautp

Use

Function  profiles  are  used  to  easily  assign  authorizations  in  the  user  administration.  A  function  profile

consists of 1 – n function authorizations.

If you assign a function profile to a user, the user automatically obtains all  authorizations included in the

profile.

If you change the profile subsequently, the changes are directly enabled when the user logs on the next

time.

Selection criteria

The application provides the following selection criteria:

Function profile

Select one or several function profiles, e.g. enter wildcards

Function

If you select the functions, all function profiles are displayed that include the individual function(s).

Field descriptions

Function profile

Function profile key

Function

Assigned function authorization

Name

Name of the function authorization

MOC_FunctionalAuthorizationProfile.docx Version: 1.4.13857

Page 1 of 3

Action

To edit data, the following actions are available in the selection list:

Function profiles

  create

  copy

  edit

  delete

  view (= view only)

You can enter further actions. The actions are documented with the application that processes the

specific actions.

If you assign a function without restriction to the possible data maintenance actions (the "Action"

field  remains  empty),  authorization  is  assigned  for  the  Create/Copy/Change/Delete/Display

actions.

If you want to assign several actions of a function authorization to a user, you must define the

required authorizations with the respective actions for this user.

The  actual  function  authorization  is  made  up  of  the  function  and  the  action  in  the  form

"<function>.<action>".

The independent field Action is only available when you create data records. You can easily select

the  respective  actions  then.  In  the  other  detail  applications,  the  Action  is  included  in  the  field

Function.

Example:

If  you  want  to  assign  the  authorizations  Create  user  and  Edit  user  to  a  user,  but  not  Delete,  the

required authorizations are user.create and user.edit.

Authorization

The usual function authorizations do not process this field. You should set the value of this field to

the default value 0.

In special use cases,  you  can enter an authorization  level  or another key number for the function

authorization. The authorization level is rarely used and is then documented by the user where this

exception is required.

When data records are edited, you can only change the field Authorization, as the Function profile

and Function are key fields of the data record. This means: You must delete the data record and

insert a new one to change the field Function profile and/or Function.

MOC_FunctionalAuthorizationProfile.docx Version: 1.4.13857

Page 2 of 3

Function profiles

Function locks

To improve the protection  of personal  data,  Service  Pack 13 has introduced  the option  of locking

individual functions for specific users:

  Print

  Export, STRG+C

The  function  locks  are  available  for  the  application  "Persons".    You  can  add  functions  if  a

customization of the standard is required.

The field "Action" remains empty if you create function locks.

Available function locks

You can deactivate the print function in the HR master data application by assigning "pers_disprt" to

a  user  or  profile  (buttons  "Print  preview"  and  "Print  all"  are  hidden  and  the  associated  keyboard

shortcuts are deactivated).

You can deactivate an export in the HR master data by assigning "pers_disexp" (Excel export buttons

in  the context menu and the  export  buttons  in the  print preview  are  hidden. Furthermore, the key

combination CTRL+C is ineffective for selected table cells).

MOC_FunctionalAuthorizationProfile.docx Version: 1.4.13857

Page 3 of 3


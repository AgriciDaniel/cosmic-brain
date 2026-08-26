Function authorizations

1  Function authorizations

Overview

Menu

System administration  User administration  Function authorizations

Transaction code

faut

Function authorization

faut

Use

You  use

function  authorizations

to  control  which  user  can  access  or  execute  a  specified

application/function.

You can assign individual function authorizations for specified functions, or you can assign Function profiles

(defined groups of authorizations). All applications, which include editing functions for recorded data, are

protected. Only authorized users can use the functions.

Integration

Ffunction authorizations are used in the client to control the access to e.g. applications or fields.

Requirements

You must create the users before you can assign function authorizations.

Selection criteria

The application provides the following selection criteria:

User

Select the function authorizations that are assigned to a user.

Function

Select the function authorizations assigned to a user via the function.

MOC_FunctionAuthorization.docx

Version: 1.5.23256

Page 1 of 3

Field description

Function authorizations

Type "Function authorization" (single authorization)

Function

If you assign authorizations for a specific function, you can not only assign the authorization for the

function, but also for specific actions.

Action

To edit data, the following actions are available in the selection list:

  create

  copy

  edit

  delete

  view (= view only)

You can enter further actions. Actions are documented in the application that processes the special

actions.

If you assign a function without restriction to the possible data maintenance actions (the "Action"

field remains empty), authorization is assigned for the create/copy/change/delete/display actions.

If you want to assign several actions of a function authorization to a user, then you must define

the required authorization with the respective actions.

The  actual  function  authorization  is  made  up  of  the  function  and  the  action  in  the  form

"<function>.<action>".

The independent field Action is only available when you create data records. You can easily select

the  respective  actions  then.  In  the  other  detail  applications,  the  Action  is  included  in  the  field

Function.

MOC_FunctionAuthorization.docx

Version: 1.5.23256

Page 2 of 3

Function authorizations

Example:

If you want to assign the authorizations Create user and Edit user to a user, but not Delete, the

required authorizations are user.create and user.edit.

Authorization

The usual function authorizations do not process this field. You should set the value of this field to

the default value 1.

In special use cases,  you  can enter an authorization  level  or another key number for the function

authorization. The authorization level is rarely used and is then documented by the user where this

exception is required.

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

Type "Function profile"

Function profile

You can assign an existing Function profile to a user.

MOC_FunctionAuthorization.docx

Version: 1.5.23256

Page 3 of 3


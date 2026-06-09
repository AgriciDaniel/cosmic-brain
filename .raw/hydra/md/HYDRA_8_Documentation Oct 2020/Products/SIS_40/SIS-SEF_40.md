Manual

Recording of Signatures
SIS-SEF 4.0pe

Version 1.4.23049

Last changed on: 12.06.2019

Recording of Signatures

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SIS-SEF_40.docx

Version: 1.4.23049

Page 2 of 38

Recording of Signatures

Contents

1  Authorization and signature check ............................................................... 4

2  Personnel Authorization Check .................................................................... 6

3  Authorization Cockpit ................................................................................... 8

4  Authorization control .................................................................................. 11

5  Authorization types ..................................................................................... 17

6  Personnel function profiles ......................................................................... 19

7  Personnel Function Profiles: Assignment .................................................. 21

8  User administration .................................................................................... 22

9  Password Policies ...................................................................................... 25

10  Password Exclusion List ............................................................................ 27

11  Configuration of the Personnel Authorization Check ................................. 29

12  Terminal - Password Change ..................................................................... 32

13  Central Configuration File hytnrcfg.ini ........................................................ 34

13.1  Layout configuration .......................................................................................... 37

SIS-SEF_40.docx

Version: 1.4.23049

Page 3 of 38

Recording of Signatures

1  Authorization and signature check

Overview

Purpose

Use  the  authorization  and  signature  check  to  verify  the  personnel  function  authorizations  via  various

options. Only employees with the appropriate personnel function authorization are allowed to open specific

MOC applications or to execute certain terminal input dialogs.

You can choose from the following options to check personnel function authorizations:

  Check the authorization level

  Check authorizations via personnel function profiles



"Complete" signature check according to the four eyes principle

Implementation notes

Use the authorization and signature check if the following is true:

  You want to customize the authorizations of the MOC and terminal users.

  You have different authorization groups and you want to use authorization profiles to combine these

groups.

  You are forced by legal regulations or customer requirements to enter postings using the four eyes

principle.

  Legal regulations, customer requirements or the corporate security policy require you to identify

the reporting person with the password for all or specific postings.

Integration

The MES Operation Center (MOC) and the Acquisition Information Panel (AIP) include the authorization

and signature check. The system integrates the input types defined as part of the signature check and the

required authorization levels.

Features

  Configuration:

o  Define the different authorization types

o  Define  the  input  events/dialogs  that  require  authorization  checking  and  assign  the

authorization type

  Checking the authorization level

SIS-SEF_40.docx

Version: 1.4.23049

Page 4 of 38

Recording of Signatures

o  This authorization check verifies if the employee stored in the HR master has at least the

authorization level required to execute the dialog or posting (the personnel function profile

is not checked).

  Checking the authorization level using personnel function profiles

o  The authorization level check via personnel function profiles verifies if the employee stored

in  the  HR  master  has  at  least  the  authorization  level  required  to  execute  the  dialog  or

posting (the personnel function profile assigned to the employee is checked).



"Complete" signature check

o  Enter a password to verify the posting

o  A second user confirms the posting (e.g. according to the four eyes principle)

SIS-SEF_40.docx

Version: 1.4.23049

Page 5 of 38

Recording of Signatures

2  Personnel Authorization Check

Purpose

Only employees with appropriate personnel function authorizations are allowed to execute MOC postings

or to enter data using the terminal.

The following options are available to check personnel function authorizations:

  Check the authorization level

  Check authorizations via personnel function profiles



"Complete" signature check with the four-eyes principle

1.  Checking the authorization level

This option verifies if the employee stored in the HR master has at least the authorization level required to

execute the dialog or posting. In this case, personnel function profiles are not checked. The procedure is

as follows:

  The user executes the terminal dialog or MOC posting by clicking "OK".

  The  system  searches  and  memorizes  the  authorization  level  of  the  dialog/posting  stored  in  the

authorization control.

o  No personnel function profile has been defined.

o

In the authorization control for the dialog/posting the field "function" is not completed.

  The system searches and memorizes the authorization level assigned to the executing employee

stored in the HR master.

  The system compares the employee's authorization level to the level defined in the authorization

control.

o  The personnel function profile is not considered.



If the employee's authorization level is equal to or higher than the authorization level defined in the

authorization control, the employee is allowed to execute the dialog/posting.

2.  Checking authorizations via personnel function profiles

This option verifies if the employee stored in the HR master has at least the authorization level required to

execute the dialog or application. The personnel function profile attributed to the employee is also checked.

This profile includes the authorization level that is linked with the one of the function (authorization) for the

authorization type. The procedure is as follows:

SIS-SEF_40.docx

Version: 1.4.23049

Page 6 of 38

Recording of Signatures

  The user executes the terminal dialog or MOC posting by clicking "OK".

  The  system  searches  and  memorizes  the  authorization  level  of  the  dialog/posting  stored  in  the

authorization control.

o

In the authorization control for the dialog/posting the field "function"  is completed with a

personnel function authorization (keyword). The system memorizes this keyword.

o  The system memorizes the authorization level stored in the dialog.

  The system searches for the personnel function profile assigned to the executing employee.

o

In the personnel function profile the field "function" is completed with a personnel function

authorization (keyword). The system memorizes this keyword.

o  The system memorizes the authorization level stored in the personnel function profile.

  The  system  compares  the  following  data  of  the  personnel  function  profile  with  that  of  the

authorization control:

o  Function

o  Authorization level

  The  employee  is  allowed  to  execute  the  dialog/posting  if  the  authorization  level  defined  in  the

personnel  function  profile  is  equal  to  or  higher  than  the  authorization  level  of  the  authorization

control.

3.  "Complete" signature check

Complete signature check means signature check according to the four-eyes principle.

Personnel function authorizations have been designed to check whether an employee is allowed

to execute a terminal dialog or postings in the MOC. In contrast, the user's function authorization

applied in the MOC checks if the user is allowed to open an application.

SIS-SEF_40.docx

Version: 1.4.23049

Page 7 of 38

Recording of Signatures

3  Authorization Cockpit

Overview

Menu

System administration  User management  Authorization cockpit

Master data  Staff  Authorization cockpit

Transaction code

autcockpit

Function authorization

autcockpit

Purpose

You  use  the  authorization  cockpit  to  evaluate  all  personnel  in  the  HR  master  data  and/or  (MOC)  users

including their assigned:

  Function authorizations

  Function profiles

  Personnel function authorizations

  Personnel function profiles

  BDE authorizations of the HR master data

Integration

The authorization cockpit is an application used for evaluations only. The cockpit provides a better overview.

Requirements

Selection

User

Unique user number (MOC)

Profile

Stored  profiles

 The following profiles can be assigned:

  Function profiles – for MOC users

  Personnel function profile (for personnel in the HR master data)

Expand profiles

Use this option to expand the data displayed. If this option is disabled, all profiles are displayed for

personnel and/or users; the assigned authorizations are not displayed.

If this option is set, the individual authorizations are displayed that are stored in the profiles.

SIS-SEF_40.docx

Version: 1.4.23049

Page 8 of 38

Recording of Signatures

Authorization

Stored authorizations

The following authorizations can be stored:

  Function authorizations - for MOC user

  Personnel function authorizations – for persons (from the HR master data)

Person from … to …

Personnel number that uniquely identifies the person. You can also select a personnel number of the

HR master data with the search function.

Company

Assigning a person to a company

Area

Use this field to assign the person to an area. The field Area can be set for all cost centers.

Cost center

The person's standard cost center

Field descriptions

Type

Specifies the type of the object. The following types are available:

  User

  Person

  Both – user including assigned person

  User

Unique user number (MOC) from the user administration

Name

User name from the user administration

Person

Personnel number from the HR master data

Name

Name of the person from the HR master data

Assignment type

The following assignment types are available:

SIS-SEF_40.docx

Version: 1.4.23049

Page 9 of 38

Recording of Signatures

  Function profile

This profile was created for the user in the user administration.

  Personnel function profile

This profile was created for the person in the HR master data.

  BDE authorizations

This authorization was edited for the person in the HR master data.

  MDE authorizations

This authorization was edited for the person in the HR master data.

  WRM authorizations

This authorization was edited for the person in the HR master data.

Profile

If the profiles are stored in the system, the profile names are displayed in this field.  The following

profiles are available:

  Function profile - for the user (MOC)

  Personnel function profiles – for the person

Authorization

The following authorizations are available:

  Function authorizations

Function authorizations are assigned to the user in the user administration. They can be

included in a function profile (optional).

  Personnel function authorizations

Personnel function authorizations are assigned via an entry in the authorization control for

a specific type of data input and via an entry in a personnel function profile. The personnel

function profile is assigned to the person.

Level

Assigned authorization level

Description

Description of the authorization/profiles

SIS-SEF_40.docx

Version: 1.4.23049

Page 10 of 38

Recording of Signatures

4  Authorization control

Overview

Menu

System administration  System settings  Authorization control

Transaction code

sigmat

Function authorization

sigmat

Purpose

Use the authorization control to define the postings in the system that require authorization. You also define

the conditions that must be met and the required authorization type.

Integration

The settings made apply to editing dialogs of the MES Operation Center (MOC) and input dialogs of the

terminal.

Requirements

You have defined authorization types in the system.

You have maintained users in the user administration and/or persons in the HR master data.

Both objects must be linked with each other, i.e. the employee/person must be assigned to the user, if you

want to check signatures (advanced authorization check). This ensures that each signature (authorization)

includes the name, the personnel number and the badge number. If you only want to check authorizations,

you do not necessarily have to link the person/employee with a user.

Field descriptions

Dialog

Enter the input dialog where the employee's (badge number) authorizations are checked.

Comment

You can enter any comment.

Priority

If a dialog has several entries where different checks or conditions/formulas are specified, the priority

defines how to sort and process the entries. The entries are sorted in ascending order. The lowest

priority is displayed at first.

SIS-SEF_40.docx

Version: 1.4.23049

Page 11 of 38

Mandatory comment

You must only enter a comment if signatures are checked. Depending on the selected option, the

Recording of Signatures

following applies:

Value

Meaning

M

O

Mandatory input

Optional input

N / ""

Not required (set by default)

Authorization 1 / 2

You can define required authorizations for every input dialog. You can perform the following checks:

  Authorization level check

Enter the level. Do not enter the authorization type.

  Authorization check including personnel function profiles

Complete the authorization type, the function and the level.

  Signature check

Complete the authorization type, the function and level. You have to complete

"authorization 1" and "authorization 2", if you want to check signatures according to the four

eyes principle.

Authorization type 1 / 2

Use the authorization type to specify the check to be performed for the dialog.

  The authorization type is not required if you want to check the authorization level.

  The authorization type AUTH_ONLY is entered by default in order to check authorizations

including personnel function profiles.

  You  have

to  assign  an  authorization

type  with

the

relevant  mode

for  each

signature/authorization  if  you  want  to  check  signatures.  You  can  combine  identical  and

different  authorization  types  for  each  signature/authorization.  The  user  can  define  any

authorization.

Function 1 / 2

Function stands for the name of the defined personnel function authorization.

  The  personnel  function  authorization  is  not  required,  if  you  want  to  check  the  authorization

level.

  Proceed as follows to check authorizations including personnel function profiles:

SIS-SEF_40.docx

Version: 1.4.23049

Page 12 of 38

Enter the key in the field function. The same key is also entered in the personnel function

Recording of Signatures

profile. Consequently, this key links the

- dialog,

- personnel function authorization,

- personnel function profile and finally

- the person

in order to check authorizations.

Proceed  as  follows  to  assign  the  defined  personnel  function  authorization  to  a  person:

1)  Assign

the  personnel

function  authorization

to  a  personnel

function  profile.

2)  Assign the personnel function profile to an employee/person.

  When checking signatures, the system also checks the personnel function authorizations.

Level 1 / 2

The authorization level the user (MOC) or the person posting the data (AIP) requires for the relevant

authorization/signature  in  order  to  execute  the  dialog/posting.  You  can  choose  from  two  different

options to assign the authorization level to the user (MOC) or the person posting the data (AIP):

  Store  the  authorization  level  in  the  HR  master  data  (pers  ->  BDE  authorization)  for  each

individual employee.

  Define  the  authorization  level  in  the  personnel  function  profiles  (pfautp  and/or  pfunk)

assigned to the employee.

In order to execute the dialog/posting, the employee's authorization level must be equal to or higher

than the specified level.

SIS-SEF_40.docx

Version: 1.4.23049

Page 13 of 38

Recording of Signatures

If you want to check if the person is allowed to edit master data or to use certain posting functions,

the person must always be assigned to a MOC user ( user -> field: person). Since the MOC uses

separate function authorizations and/or function profiles, the order of checking is as follows:

At  first  the  system  checks  the  MOC  user's  function  authorizations.  If  no  matching  function

authorization can be found, the system checks the person's personnel function authorizations or

personnel function profiles.

Please note: If a matching function authorization is available in the user's function authorizations

or  function  profiles,  the  system  does  no  longer  search  the  personnel  function  authorizations

and/or personnel function profiles.

You can choose from the following options to assign function authorizations to the HYDRA user:

- directly assign the function authorization to the HYDRA user or

- assign the function authorization to a function profile and then assign this profile to the HYDRA

user (pfautp and/or pfunk).

Formula

The formula stored in this field is a condition the dialog must fulfill so the indicated authorization(s)

are checked.

Numerous logical and mathematical operators are available to develop the formula.

Enter double equal signs "==“ to compare values with each other. Use double inverted commas for

the value you want to compare.

Example:

You want to check whether it is an operation or an order header:

ANR.ATYP == "AU“ (queries the order header)

ANR.ATYP == "OP“ (queries the operation)

Useful conditions to be defined as formula:

1.  Authorization check only applies to terminal dialogs

Add the following entry to the formula if the authorization check should only apply  to terminal

dialogs and not for MOC postings: <any previous condition> and USR >= 2000 and USR

<= 2999

2.  Authorization check applies to specific quantity types/quality ratings (see default data)

Add the following entry to the formula: KLASSE=="A" if you want to prevent unauthorized persons

from entering specific quantity types/quality ratings (e.g. scrap) when logging off the input batch.

SIS-SEF_40.docx

Version: 1.4.23049

Page 14 of 38

Recording of Signatures

3.  Authorization check applies to specific batch statuses (e.g. also see default data)

Add the following entry to the formula: STA=="A", if you want to prevent unauthorized persons

from setting specific batch statuses (e.g. "locked").

The values available in each dialog are listed in the dialog's documentation.

Documentation / contents

BDE – master data

BDE – input dialogs

MDE – master data

MPL – master data

MPL – input dialogs

MW – master data

PDV – master data

HR master data

WRM – master data

WRM – input dialogs

Link

here

here

here

here

here

here

here

here

here

here

SIS-SEF_40.docx

Version: 1.4.23049

Page 15 of 38

Recording of Signatures

If the terminal rejects postings with an error that can be overridden by a so called "mandatory

posting", the terminal will add the field BZWRET to the entered data. In the authorization control

this field can be queried as follows in  order to  allow  this "mandatory posting" function  only for

certain authorized employees.

You  can  query  the  below-mentioned  mandatory  posting  codes  in  the  authorization  control  as

follows:

(("1110" in BZWRET) || ("1243" in BZWRET) || ("1249" in BZWRET)):

  1110 (Person not logged on to order)

  1243 (overproduction has been identified for the person according to the target quantity

check)

  1249 (underproduction has been identified for the person according the target quantity

check)

Use  the  function  getdata  of  the  scrip  hyd_sig_getdata.hsc  to  add  further,  customer-specific

variables (e.g. user fields).

The  system  provides  the  dialog  data  as  import  variable  DLG_DATA  (C32000)  in  the  script

hyd_sig_getdata.hsc. Moreover, the import variable VAR_NAME (C255) adds the required field

identification  for  the  field  not  included  in  the  dialog  data  to  the  script.  The  export  variable

VAR_DATA returns the value of the field (C255). You can find further information in the document

entitled MDS-AIS.

SIS-SEF_40.docx

Version: 1.4.23049

Page 16 of 38

Recording of Signatures

5  Authorization types

Overview

Menu

System administration  System settings  Authorization types

Transaction code

sigtyp

Function authorization

sigtyp*

Purpose

As part of the authorization control, the authorization type specifies the type of authentication that is required

for postings.

Integration

Use the authorization type to specify for the  control which system postings require which authorization type

(authentication).

The settings made apply to editing dialogs of the MES Operation Center (MOC) and input dialogs of the

terminal.

Field descriptions

Authorization type

Key of an authorization type. The user assigns the key.

The key "AUTH_ONLY" is included by default. The key stands for the authorization type that is

used to check authorizations only (without signatures).

Name/designation

Describes the authorization type in detail.

Mode

Identifies the type of check to be performed. The following entries are available:

  Password check: requires a confirmation consisting of the correct card/badge number (shop

floor terminal) and/or user name (MOC) and the password.

  No password check: the system does not require the password.

  Authorization check: This mode checks the authorizations optionally against:

o

o

the personnel function profiles assigned to the employee

the BDE authorization in the HR master

SIS-SEF_40.docx

Version: 1.4.23049

Page 17 of 38

Recording of Signatures

o

the employee's function authorizations/profiles

Which check is performed depends on:

- the data defined in the HR master and/or for the user

- the assigned profiles.

The mode "authorization check" does not check "authorization 2".

You can only delete an authorization type if this authorization type has not been used already.

The system checks if the system includes data  that has been collected  with this authorization

type. If this is the case, the system rejects the deletion.

SIS-SEF_40.docx

Version: 1.4.23049

Page 18 of 38

Recording of Signatures

6  Personnel function profiles

Overview

Menu

System administration  System settings  Personnel function profiles

Transaction code

pfautp

Function authorization

pfautp*

Purpose

Use the personnel function profiles to check whether an employee is authorized to execute a terminal dialog

or MOC posting. You may link n authorization checks to a personnel function profile (e.g. a profile contains

several dialogs).

Integration

You assign the personnel function  profiles  to  employees.  You cannot  directly  assign  personnel function

authorizations to employees.

Requirements

You have defined the authorization types. You have defined the authorization control (assignment: dialog -

authorization type - personnel function authorization).

Field descriptions

Personnel function profile

The name of the personnel function profile. You may define any name.

Function

Function or name of the defined personnel function authorization. Enter the key in the function field.

The same key is also entered in the authorization control. Consequently, this key links the

- dialog,

- personnel function authorization,

- personnel function profile and finally

- the person

in order to check authorizations.

SIS-SEF_40.docx

Version: 1.4.23049

Page 19 of 38

Recording of Signatures

Authorization level

The system compares the authorization level defined in this field with the authorization level stored

in the authorization control (and therefore in the dialog and/or posting). This authorization level must

be equal to or higher than the level indicated in the authorization control in order to execute the dialog

or posting.

Authorization levels are sorted in descending order (e.g. 9 > 1).

Toolbar

Insert

You can create a new data record. You must complete the:

  Personnel function profile

  Function

  Authorization level

Copy

Copy the selected personnel function authorization to the specified function profile. Optionally, you

can  copy  all  authorizations  of  the  currently  selected  profile  to  the  specified  target  profile.  If  the

specified target function profile does not exist, the system automatically creates the function profile.

Edit

You can change the authorization level assigned to the profile.

Delete

You can delete the selected profile completely.

Examples

Example 1: operator and supervisor

You  can  prepare  different  personnel  function  profiles.  These  personnel  function  profiles  may  include

identical personnel function authorizations but different authorization levels.

Posting_operator

Posting_supervisor

A_AN

Level 2

A_AB

Level 2

A_UN

Level 2

A_TR

Level 2

Level 5

Level 5

Level 5

Level 5

SIS-SEF_40.docx

Version: 1.4.23049

Page 20 of 38

Recording of Signatures

7  Personnel Function Profiles: Assignment

Overview

Menu

System  administration    System  settings    Personnel  function  profiles  -
Assignment

Transaction code

pfunk

Function authorization

pfunk*

Purpose

You can use this application to assign the prepared personnel function profiles to an employee.

Integration

You assign the personnel function  profiles  to  employees.  You cannot  directly  assign  personnel function

authorizations to employees.

Requirements

You have stored the employees in the HR master. If necessary, you have assigned the employees to users.

You can assign users to employees in the MOC application "users" with the transaction code "user".

You  have  defined  the  personnel  function  profiles.  You  can  edit  the  personnel  function  profiles  in  the

application "function profiles" with the transaction code "pfautp".

You  have  assigned  personnel  function  authorizations  to  the  personnel  function  profiles.  These

authorizations are also stored in the authorization control (including applicable dialogs).

Field descriptions

Person

The employee from the HR master to whom the personnel function profile is assigned.

Personnel function profile

The prepared personnel function profile.

SIS-SEF_40.docx

Version: 1.4.23049

Page 21 of 38

Recording of Signatures

8  User administration

Overview

Menu

System administration  User administration  Users

Transaction code

user

Function authorization

user

On start of the MOC, the user name and password are requested. HYDRA offers the possibility to assign

individual authorizations to each MOC user for the separate sub-areas. All programs of the MOC, which

offer the possibility to correct or change collected data, are equipped with authorization checks for functions

and for areas of responsibility. The system does the same check for evaluations/reports and information

dialogs that display "confidential" data.

Prior to be allowed to work in MOC, the following activities must be performed for each user.

- Create the user

- Assign function authorizations

- Assign responsibility areas

Purpose

The User application can be used to create individual users.

Selection criteria

User

Unique user name

Field descriptions

User

A unique/unambiguous MOC user  identification must be entered here. We recommend to use the

user names from mail programs or ERP programs that are already in use. This way, the respective

person can use the same user name in all programs.

Name

The name describes the user more precisely. Enter first and last name here.

Password

The  Password  field  is  used  to  define  the  password  by  which  the  user  can  log  on  to  the  HYDRA

system. The password is checked by the Password confirmation field. Both entries will be hidden.

SIS-SEF_40.docx

Version: 1.4.23049

Page 22 of 38

Recording of Signatures

locked

If the "locked" field is checked, a period can be defined during which the user cannot log on to the

system. If only the start time for blocking is defined here, the user account will stay blocked from this

time on and if only the end time is defined for blocking, it will stay blocked until this time. If no period

is defined the user account will stay blocked.

Please note:

The user account can automatically be blocked according to the account lockout policies.

User has to change password when logging on the next time

The "User has to change password...” option will force the user to change the password to log on

again.

Company, Name, Person

These fields have been designed to assign the user to a person in the HR master.

SSO active, SSO user, SSO domain

These fields enable Single Sign On for the user. In case Single Sign On is active, the Windows user’s

name and domain are used to identify and log in the relevant HYDRA user.

Please note:

- In combination with the following INI entry, the fields for password entry / password change request

are hidden.

INI configuration to hide the password entry for SSO users:

Name =

SYSTEM

Section =

ExclusiveSingleSignOn

Key =   ISACTIVE

TRUE

[CHECKED]

Value =

Active =

Please

Copy function: SSO configuration of the user to be copied will not be copied.

note:

SIS-SEF_40.docx

Version: 1.4.23049

Page 23 of 38

Recording of Signatures

Toolbar

 Password rules

Link to the application: Password rules

Function authorizations

Link to the application: Function authorizations

Responsibility areas

Link to the application: Responsibility areas

 Synchronize users

Function authorization: wfusr

This function is used to synchronize the HYDRA users with the MES – workflow management

server.

These attributes are taken over:

MOC field

User

Name







MES workflow management

Login name

Full name

Person (e-mail, company) 

Attributes (InSign:ADDR_EMAIL)

Synchronization of users

If the Workflow Management is in use, the HYDRA users will be synchronized with the users in the Workflow

Management system (Inspire) by way of the manual function "synchronize users" and a cyclic Scheduler

process.

These  users  are  required,  for  example,  in  order  that  the  HYDRA  users'  tasks  can  be  requested  and

displayed.  The  used  language  depends  on  the  language  ID  assigned  to  the  user  in  the  Workflow

Management  system  (Inspire).  If  the  language  is  to  be  changed,  this  has  to  be  done  in  the  Workflow

Management system.

SIS-SEF_40.docx

Version: 1.4.23049

Page 24 of 38

Recording of Signatures

9  Password Policies

Summary

Menu

System administration  User administration  Password policies

Transaction code

usrar

Function authorization

usrar.*

Usage

Use the password policies to change password-related security settings of the system and to adapt them

to the policies.

Field descriptions - password policies

Force password history

Used passwords will be recorded to force the HYDRA user to select a new password. The user may

only re-use an old password as soon as it is no longer included in the password history. In case of 5

saved passwords the user could thus only re-use the 1st selected one upon the 6th password change.

Maximum password age

Indicates for how many days a password will be valid. Prior to the termination of the password, the

HYDRA user will be requested to change the password.

Minimum password length

A password can have between 0 and 10 characters. A setting of 0 means that the user account does

not need a password. Passwords, which are too long, are not very user-friendly. This includes also

the risk that passwords will be saved at the workplace.

Password must include at least.... letters, numbers, and special indicators

One method to unlawfully detect passwords is an automatic testing with words from the wealth of

words  of  a  language.  To  prevent  this,  passwords  must  consist  of  a  minimum  amount  of  letters,

numbers and special indicators The sum of this amount must be higher than the minimum password

length.

Allowed characters in the password

It can be defined here of which character pool a password can be formed.

Field descriptions - options

Password is case sensitive

Used to define whether the password check will be case-sensitive. If this field is not selected, a user

with the password Li2Ps+- for example may also log in with the password li2ps+-.

SIS-SEF_40.docx

Version: 1.4.23049

Page 25 of 38

Recording of Signatures

Password change when user logs on for the first time

If this option is selected, the system will force the user, who logs in for the first time, to change his/her

password.

Password must not contain user name

This is used to direct that the HYDRA user log-on must not be used for the password, i.e. that a user

"hans" will not be able to use a password such as "hans" or "12hans".

Exclusion of character strings from negative list

If  this  option  is  selected,  another  check  will  be  executed  during  the  assignment  of  the  password

and/or in the "Change password" dialog. A valid password can therefore not include a string that was

registered by the 'Passwords' function exclusion list (see below).

Field description - account lockout policies

Threshold for blocking an account

The  threshold  for  blocking  an  account  defines  how  often  a  user  is  permitted  to  enter  a  wrong

password  before  the  relevant  account  will  be  blocked.  If  this  policy  is  activated,  the  values  of  the

"Block account for“ and "Reset account blocking counter“ can be set.

Block account for

The policy 'Block account for' is used to define for how many minutes an account will be blocked. The

setting 0 will keep the HYDRA user account blocked until the administrator unlocks it. This offers the

advantage that the administrator can ask the user whether the user himself caused the account’s

blocking. To the extent that the user is not responsible for the blocking of the account, there might

have been unauthorized attempts to log in by another "user" using this account. This will warn the

administration that unauthorized persons try to use the system.

Reset account blocking counter

Incorrect  log-on  attempts  will  be  reset  to  0  after  a  certain  period  of  time.  If  for  example  a  user

successfully logs in after two failed attempts, the account blocking counter will be set to 2. As soon

as the threshold for blocking an account is set to 3, the user will only have one attempt to log in before

the account will be blocked. If a period of time of 30 minutes is defined for the resetting of the account

blocking counter, the user will have again 3 new attempts to log in after this period has elapsed. The

time defined here must be shorter than the time set in the field 'Block account for.

SIS-SEF_40.docx

Version: 1.4.23049

Page 26 of 38

Recording of Signatures

10  Password Exclusion List

Summary

Menu

System Administration  User Administration  Password Exclusion List

Transaction code

passex

Function authorization

passex.*

Utilization

This function allows for a list of terms, which must not be included in a password, to be configured.

On the one hand, free terms can be defined that must not occur in any password. The entry “HYDRA”, for

example, means that “HYDRA” must not be contained in the password, thus the password “HYDRAADM”

may not be used either.

On the other hand, variables can be chosen from the list of the input field “terms to be excluded”, which

refer to the user’s HR master record.

Integration

The black list/exclusion list defined in the system is taken into account every time a password is changed.

Prerequisite

Users have been defined within the users master and people have been created in the HR master. Both

objects have been linked with each other if it is intended that selected data from the HR master cannot be

included in the password.

Field Descriptions

Excluded terms

Enter any term – please consider case sensitivity.

As an alternative you may also choose from a list of IDs by way of which HR master data is referenced

and may be prevented from being used in the password. The following IDs are available:

PNR.PVORNAME

the person’s first name

PNR.PNAME

the person’s last name

PNR.PNR

PNR.KNR

Personnel number

Badge number

SIS-SEF_40.docx

Version: 1.4.23049

Page 27 of 38

Recording of Signatures

If the HYDRA user “John Smith” is entered in the HR master data with his first name as “John” (and

“Smith” as his last name) then entering PNR.PVORNAME (or PNR.PNAME) in the exclusion list of

passwords  will  exclude  the  string  “John”  (or  “Smith”)  from  being  used  in  his  password.  Thus,  the

passwords “john123”, “johnsmith” or “abcsmith” are not  valid. The variables PNR.PNR (personnel

number) and PNR.KNR (badge number) are handled in the same way.

SIS-SEF_40.docx

Version: 1.4.23049

Page 28 of 38

Recording of Signatures

11  Configuration of the Personnel Authorization Check

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

SIS-SEF_40.docx

Version: 1.4.23049

e.g. Profile = "supervisor“

Function= outputbatchchange

Level = 5

Page 29 of 38

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

Recording of Signatures

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

Procedure

of

checking

Authorization type

e.g. SIGNATURE

Mode: signature check

SIS-SEF_40.docx

Level

Person

Version: 1.4.23049

Page 30 of 38

Authorization control

Recording of Signatures

Authorization control

includes the following:

dialog, authorization type, function,

level

e.g. Dialog = CA_WL,Dialog

Authorization type 1/2 = AUTH_ONLY

Function 1/2 = outputbatchchange

Level 1/2 = 4

SIS-SEF_40.docx

Version: 1.4.23049

Page 31 of 38

Recording of Signatures

12  Terminal - Password Change

Summary

Utilization

This dialog has been designed to change the password at the terminal while  recording signatures.

Prerequisite

The function for recording signatures is in use.

The dialog P_PWD has been made available using the button configuration.

To be able to enter the user via the keyboard, the entry "manual badge input=true“ has to be inserted in

the hytnrcfg.ini file:

[Signaturerfassung->User 0]

ManuelleAusweisEingabe=true

The enhanced signature recording function has to be enabled to be able to use signatures at the terminal

in  the  area  of  quality  data  collection.  The  following  entry  activates  the  enhanced  function  for  signature

recording in hytnrcfg.ini (please also see the terminal manual "ctwin.pdf"):

[Signaturerfassung->User 0]

ErweiterteSignaturerfassung=true

Functions

The dialog layout can be modified using the dialog type <P_PWD> in the dynamic dialog configuration. By

default, the badge number can only be entered using a barcode reader (LEGIC, etc.).

Only  a limited character set is available (“0“..“9“, “A“..“Z“,[SHIFT] “a“..“z“) when the password is entered

using the "virtual keyboard".

The  following  note  is  displayed  and  the  "password  (confirmation)"  field  is  opened  if  the  input  fields

<password (new)> and <password (confirmation)> do not match when trying to exit the dialog by clicking

<OK>.

SIS-SEF_40.docx

Version: 1.4.23049

Page 32 of 38

Recording of Signatures

Figure: Error message with wrong entry

(Note: [Change password] The fields [password (new)] and [password (confirmation)] are not identical!)

SIS-SEF_40.docx

Version: 1.4.23049

Page 33 of 38

Recording of Signatures

13  Central Configuration File hytnrcfg.ini

This file includes different configurations for all or single terminals at a central place.

Each section is available in a generally accepted version

[section 0].

However,  entries  included  in  this  section  can  be  overwritten  by  entries  in  a  terminal-specific  section

[section <TNR-USER>]

 <TNR-USER> = HydraUser = Terminal number + 2000 e.g. 2010,2101,..) for exactly one terminal/HYDRA

User

The hytnrcfg.ini file is loaded from the server every time the terminal is started.

Section / Entry

Comment



[Tnr configuration 0]

FollowExternStatus=on

[Terminal->Installation 0]

InstallFonts=on

OnlyInstallFontsAfterDownload=false

InstallTvicport=on

[Terminal->USR 0]

Transfer  of  machine  statuses  when
reloading machine list
Useful  if  status  change  is  set  by  PDM  or
another terminal

If this is set to "off" fonts will not be installed
during
restart.
the
ON=DEFAULT

“InstallFonts=on”:
If  true  then  fonts  will  only  be  installed
directly after a download. If false then fonts
will  be  installed  every  time  the  terminal  is
restarted.
(false = DEFAULT)

If “off” the LPT driver "tvicport.sys" will not
be installed. It is required for HYDRA-ZKS.
ON = DEFAULT

SIS-SEF_40.docx

Version: 1.4.23049

Page 34 of 38

AttachedApplication=First

HTTPBrowser=standard

SupressErrorMessage=70012

[SignatureRecording->User 0]

ManualBadgeInput=true

Transparency=255

Recording of Signatures

This configuration checks whether or not an
application  is  connected  in  Windows  that
matches the file extension of the document
to be  displayed from the OP info dialog. If
there is such an application, it will be used
for displaying the document.
If there is no connection, viewers configured
in  ctaip.ini  (  [ext.  software])  and  internal
viewers will be used. In case, an extension
is  completely  unknown  it  is  attempted  to
display it as text
Different settings may be configured:

First    search  for  connected  application
first

AfterUserViewer    If  a  UserViewer  is
configured this one overrides the connected
application  (also  applies  for  ExcelViewer,
WordViewer and PowerpointViewer)

Last    Only  if  no  ctaip.ini  assignment  is
found  for  the  file  extension,  then  the
connected assignment will be searched for
(default).

Off    Connected  application  is  never
searched.

type  "http",

Viewing of documents (via OP info):
If documents are configured with a path of
file  will  not  be
the
the
downloaded to the terminal, but the link will
only be transferred to a browser.
The  default  browser  for  the  terminal  is
htmview3.exe, as this one can be operated
by touchscreen.
If  this  entry  is  set,  the  default  browser
configured in Windows will be used.

Suppress  message
planned"

"material

is  not

This configuration specifies whether or not
the field "user" can be edited in the terminal
(by default: no editing)
true    activates  keyboard  input  for  the
"user" field in the terminal

The  signature  dialog  can  also  be
transparent.
255  Signature dialog is 0 % transparent
(not transparent)
1    Signature dialog is 99% transparent
(maximum transparency)
(Default = 155)
Available  as  of  CTAIP  (V#  2.0.2.25)  /
CTWIN (V# 7.2.5.99)

SIS-SEF_40.docx

Version: 1.4.23049

Page 35 of 38

ShowPosition=TR

USE_SERVICE_ACCOUNT=1

Recording of Signatures

Top – Left
Top – Middle
Top – Right
Middle – Left

The position of the signature dialog can be
adjusted as follows:
TL
TM
TR
ML
MM  Middle – Middle (Default)
MR
BL
BM
BR
Available as of CTAIP (V# 2.0.2.25)

Middle – Right
Bottom – Left
Bottom – Middle
Bottom – Right

do

not

(default)  SSO:

0
use
ServiceAccount (requires the terminal to be
started with the "user" domain (SSO).
Please  note:  ServiceAccount=1  can  only
be used if all users are in the "root" domain.
SubDomain users are not supported.

SIGNATURE_1_USER_TYPE=REPORTING_USER_READONLY  REPORTING_USER_READONLY

The  tab  identifying  users  via  the Windows
user is activated and assigned to "user" by
default. The "user" field is read-only.
This requires, however, that in the HYDRA
HR  master  the  "SSO"  option  is  set  for  all
users  logging  in.  Otherwise,  successful
authentication is impossible.

REPORTING_USER_CHANGEABLE

The  tab  identifying  users  via  the Windows
user is activated and assigned to "user" by
default. The "user" field can be modified.
This requires, however, that in the HYDRA
HR  master  the  "SSO"  option  is  set  for  all
users  logging  in.  Otherwise,  successful
authentication is impossible.

SIS-SEF_40.docx

Version: 1.4.23049

Page 36 of 38

SIGNATURE_1_LOGON_TYPE=HYDRA

“” / Not set / “EMPTY”

Recording of Signatures

There is also an alternative login procedure.

HYDRA

The tab identifying users via the Windows
user is blocked. The HYDRA user must be
used for identification purposes.
This requires, however, that in the HYDRA
HR master all users logging in are created
and that the "SSO" option is not set.
Otherwise, successful authentication is
impossible.

ACTIVEDIRECTORY

The tab identifying users via the HYDRA
user is blocked. The Windows user must
be used for identification purposes. This
requires, however, that in the HYDRA HR
master the "SSO" option is set for all users
logging in. Otherwise, successful
authentication is impossible.

MIXED_BUT_UNIQUE
Either
login
the  HYDRA  or  Windows
procedure  is  available,  subject  to  whether
or  not  the  "SSO"  option  is  set  for  the
registered user in the HYDRA HR master.

"SSO“ enabled  Windows only
"SSO“ disabled  HYDRA only

Identical
SIGNATURE_1_LOGON_TYPE
above)

to
(see

Used for signatures with the terminal in the
area of quality data collection.

SIGNATURE_2_LOGON_TYPE=HYDRA

ExtendedSignatureRecording=true

13.1  Layout configuration

Entry

Comment

Section
and/or

[terminal configuration 0]
[terminal configuration 2XXX];

( general configuration )
( 2XXX terminal-specific configuration )

AUTO-CONFIRM-UHR-ERROR-
MESSAGE=TRUE

SUPPRESS-MAXIMUM-NUMBER-OF-
MACHINES-WARNING=ON

In case of an error in reading the clock (e.g. after coming
out  of  standby  mode),  this  configuration  makes  sure  that
the  time  is  accepted  without  having  to  confirm  a  dialog.
Afterwards the terminal time will be synchronized with the
server time using a PDM command.

As of ctaip V# 2.0.2.23
Prevents  the  warning  after  restarting  the  terminal  if  more
terminal
than  32  machines  are  assigned
(static/dynamic). (Default = OFF)

the

to

SIS-SEF_40.docx

Version: 1.4.23049

Page 37 of 38

Entry

NetRuntimeMode=2

Recording of Signatures

Comment

As of ctaip V# 2.0.2.50:
Alternative calculation of the target quantity since logon:
The net run time is not calculated from the times when the
production lock is enabled (PSperre=green) but only from
the shift times less the shift breaks.
Consequently, it can also be displayed, even if the terminal
program has been restarted.

Section
[ QRD-PRINTER->TICKET 0 ]
[ QRD-PRINTER->TICKET 2xxx ]

;( general configuration )

;( 2XXX configuration for a specific terminal )

COMPLETE-ABSENCE-OF-LOCAL-MNR-
DATA-FOR-EVENT=< Events >

COMPLETE-ABSENCE-OF-LOCAL-ANR-
DATA-FOR-EVENT=< Events >

Reloads the machine row for the configured <Events>, if
it is not available locally
=>  This  configuration  might  be  required/necessary  for  a
group workplace without machine assignment.

Reloads the order row for the configured <Events>, if it is
not available locally
 This option has been implemented to access order data
within the master data, e.g. when logging an order on.

COMPLETE-..-EVENT=< Events >

Explanation on the configuration of <Events>

COMPLETE-..-EVENT=#ALL#

COMPLETE-..-EVENT=A_AN|A_P_AN

 Using <#ALL#> the row (ANR/MNR) that is not available
is reloaded for any event.
  <A_AN|A_P_AN> restricts reloading of information to
the specified events. The ID <DLGFAM> is preferred to the
ID <DLG> in order to identify the <Event>.

SIS-SEF_40.docx

Version: 1.4.23049

Page 38 of 38


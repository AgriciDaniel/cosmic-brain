User Administration

User Administration

Overview

HYDRA menu

System administration  User administration  Users

FEDRA menu

System administration  User administration  Users

Transaction code

Function
authorization

user

user

On start of the client, the user name and password are requested. The system offers the possibility to
assign  individual  authorizations  to  each  client  user  for  the  separate  sub-areas.  All  client  programs
offering the possibility to correct or change collected data, are equipped with authorization checks for
functions and for areas of responsibility. The system does the same check for evaluations/reports and
information dialogs that display "confidential" data.

Before a user can work on a client, the following activities must be performed.

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

Enter a unique identification of the client user. We recommend to use the user names from mail

programs or ERP programs that are already in use. This way, the respective person can use the

same user name in all programs.

Name

The name describes the user more precisely. Enter first and last name here.

MOC_Users.docx

Version: 1.7

Page 1 of 3

User Administration

Password

The Password field is used to define the password that the user uses to log in to the system. The

password is checked by the Password confirmation field. Both entries are hidden.

Locked

If you enable the field locked, you can define a period of time when this user cannot log in to the

system. If only the start time for locking is defined here, the user account will stay locked from this

time on and if only the end time is defined for locking, it will stay locked until this time. If no period

is defined the user account will stay locked.

Please note:

The user account can automatically be locked according to the account lockout policies.

User has to change password when logging on the next time

The  User  has  to  change  password...  option  will  force  the  user  to  change  the  password  when

logging in the next time.

Company, Name, Person

These fields have been designed to assign the user to a person in the HR master.

SSO active, SSO user, SSO domain

These fields enable Single Sign On for the user. If Single Sign On is active, the Windows user’s

name and domain are used to identify and log in the relevant HYDRA user.

Note:

-  In  combination  with  the  following  INI  entry,  the  fields  for  password  entry  /  password  change

request are hidden.

INI configuration to hide the password entry for SSO users:

Name =

SYSTEM

Section =

ExclusiveSingleSignOn

Key =

Value =

Active =

ISACTIVE

TRUE

[CHECKED]

Please note:
Copy function:  SSO configuration of the user to be copied will not be copied.

MOC_Users.docx

Version: 1.7

Page 2 of 3

User Administration

Toolbar

  Password rules

Link to the application: Password rules

 Function authorizations

Link to the application: Function authorizations

 Responsibility areas

Link to the application: Responsibility areas

 Synchronize users

Function authorization: wfusr

This function is  used  to synchronize the HYDRA users with the  MES  –  workflow management

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

If the Workflow Management is in use, the users of the system are synchronized with the users in the
Workflow Management system (Inspire) using the manual function Synchronize users and a cyclic
Scheduler process.

These users are required, for example, in order that the HYDRA users' tasks can be requested and
displayed. The used language depends on the language ID assigned to the user in the Workflow
Management system (Inspire). If you want to change the language, you must use the Workflow
Management system.

MOC_Users.docx

Version: 1.7

Page 3 of 3


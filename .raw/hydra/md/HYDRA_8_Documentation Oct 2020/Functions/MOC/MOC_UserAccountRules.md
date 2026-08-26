Password Policies

1

Password Policies

Summary

Menu

System administration  User administration  Password policies

Transaction code

usrar

Function authorization  usrar.*

Usage

Use the password policies to change password-related security settings of the system and to adapt
them to the policies.

Field descriptions - password policies

Force password history

Used passwords will be recorded to force the user to select a new password. The user may only

re-use an old password as soon as it is no longer included in the password history. In case of 5

saved  passwords  the  user  could  thus  only  re-use  the  1st  selected  one  upon  the  6th  password

change.

Maximum password age

Indicates for how many days a password will be valid. Prior to the termination of the password,

the user will be requested to change the password.

Minimum password length

A password can have between 0 and 10 characters. A setting of 0 means that the user account

doesn’t  need  a  password.  Passwords,  which  are  too  long,  are  not  very  user-friendly.  This

includes also the risk that passwords will be saved at the workplace.

Password must include at least.... letters, numbers, and special indicators

One method to unlawfully detect passwords is an automatic testing with words from the wealth

of  words  of  a  language.  To  prevent  this,  passwords  must  consist  of  a  minimum  amount  of

letters,  numbers  and  special  indicators  The  sum  of  this  amount  must  be  higher  than  the

minimum password length.

Allowed characters in the password

It can be defined here of which character pool a password can be formed.

MOC_UserAccountRules.docx

Version: 1.1.23274

Page 1 of 2

Password Policies

Field descriptions - options

Password is case sensitive

Used to define whether the password check will be case-sensitive. If this field is not selected, a

user with the password Li2Ps+- for example may also log in with the password li2ps+-.

Password change when user logs on for the first time

If this option is selected, the system will force the user, who logs in for the first time, to change

his/her password.

Password must not contain user name

This  is  used  to  direct  that  the  user  log-on  must  not  be  used  for  the  password,  i.e.  that  a  user

"hans" will not be able to use a password such as "hans" or "12hans".

Exclusion of character strings from negative list

If this option is selected, another check will be executed during the assignment of the password

and/or in the "Change password" dialog. A valid password can therefore not include a string that

was registered by the 'Passwords' function exclusion list (see below).

Field description - account lockout policies

Threshold for blocking an account

The  threshold  for  blocking  an  account  defines  how  often  a  user  is  permitted  to  enter  a  wrong

password before the relevant account will be blocked. If this policy is activated, the values of the

"Block account for“ and "Reset account blocking counter“ can be set.

Block account for

The  policy  'Block  account  for'  is  used  to  define  for  how  many  minutes  an  account  will  be

blocked. The setting 0 will keep the user account blocked until the administrator unlocks it. This

offers  the  advantage  that  the  administrator  can  ask  the  user  whether  the  user  himself  caused

the  account’s  blocking.  To  the  extent  that  the  user  is  not  responsible  for  the  blocking  of  the

account,  there  might  have  been  unauthorized  attempts  to  log  in  by  another  "user"  using  this

account. This will warn the administration that unauthorized persons try to use the system.

Reset account blocking counter

Incorrect log-on attempts will be reset to  0 after a certain period  of time. If for example a user

successfully  logs  in  after two failed attempts, the account blocking counter  will  be set to 2. As

soon as the threshold for blocking an account is set to 3, the user will only have one attempt to

log  in  before  the  account  will  be  blocked.  If  a  period  of  time  of  30  minutes  is  defined  for  the

resetting of the account blocking counter, the user will have again 3 new attempts to log in after

this  period  has  elapsed.  The  time  defined  here  must  be  shorter  than  the  time  set  in  the  field

'Block account for.

MOC_UserAccountRules.docx

Version: 1.1.23274

Page 2 of 2


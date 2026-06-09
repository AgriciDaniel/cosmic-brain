Password of the HYDRA Database

1  Password of the HYDRA Database

Overview

HYDRA uses a separate database user and database password to access the  corresponding database

system. The database user "hydadm" is created along with a default password if it is a HYDRA standard

installation.

This  document  describes  how  the  database  password  can  be  changed  on  the  database  level  and  how

HYDRA is informed about the password in encrypted manner.

The  database  password  is  transferred  to  the  HYDRA  console  in  an  encrypted  form;  this  prevents  the

database password from being read in an uncoded manner on the server or the client.

References to other documentation

---

Changing the HYDRA DB user password

Notes

,

Oracle  and  SQL  server  have  a  separate  user  administration.  Consequently,  the  database  user

hydadm is not identical to the HYDRA administrator (hydadm).

Password change

The password of the HYDRA DB user "hydadm" can be changed as follows:

  1.  Exit HYDRA using the HYDRA Manager

  2.  Change the password as follows:

BASE_FCT_DB_passwords.docx

Version: 1.0.23235

Page 1 of 6

Password of the HYDRA Database



The database user is not identical to the HYDRA administrator (hydadm).

Start sqlplus and log in as user hydadm.

d:\hydra> sqlplus

Enter password and upon request, enter the old and the new password incl. confirmation (Syntax

PASSW[ORD] [username]):

SQL> password

Changes the password for HYDADM

Old password: ******

New password: ******

Enter the new password once more: ******

SQL> exit



Start the  SQL Server Enterprise Manager. Choose the server from the  left-hand side.  Select

"security" and click the "user name". In the detail area right click the user name to be changed

and then select "properties". Enter a new password within the "password" field of the "general"

tab and confirm the password.

  3.  Start an MS-DOS prompt and go to the HYDRA installation directory.

  4.  Now change the configuration as follows:





Enter the following entries that assign the new password (HYDBPW) to the user (HYDBUSER)

hydadm in the "environment" section of hymap.cfg.

…

[Environment]

…

HYDBUSER=hydadm

HYDBPW={ new password}

…

Install the modified hymap.cfg file, in this context, the password of the Windows user hydadm

is to be specified.

Please note: The Windows user is not identical to the Oracle user!

d:\hydra> ntinst –if hymap.cfg

Enter the following rows in hy_env.scr:

export HYDBUSER=hydadm

export HYDBPW={ New password}

BASE_FCT_DB_passwords.docx

Version: 1.0.23235

Page 2 of 6

Password of the HYDRA Database

  5.  Check the database connection via the "projekt“ program. The program should output "HYDRA“ or

the set project. In the event of an error, a database error including the corresponding "sqlcode" occurs.

Check the values entered in the configuration in cases of error and repeat step 4.

d:\hydra> projekt.exe





/usr/hydra> projekt.out

  6.  Start HYDRA using the Hydra-Manager.

Generate encoded database password

The database password (HYDBPW) is defined in an encoded form on the HYDRA server.

The  tool  "DB-Password-Generator"  generates  an  encrypted  password  for  the  specified  user  and  the

entered password (that has a maximum of ten characters).

This  generated  password  (32  characters  long)  is  to  be  entered  as  the  new  password  and  tested  as

described in section 2.2.

The  "hyd_pwd.exe“  program

is  provided

in

the

following  directory  on

the  HYDRA  server:

<HYDRADIR>/admtools/hyd_pwd

For installation purposes, copy the directory on a Windows PC and run the program "hyd_pwd.exe“.

Other database users and passwords

Irrespective  of  HYDRA,  different  database  users  are  created  by  the  respective  database  system.  The

sections that follow describe these database users and their relation to HYDRA and MPDV Support.

BASE_FCT_DB_passwords.docx

Version: 1.0.23235

Page 3 of 6

Password of the HYDRA Database

ORACLE database

INTERNAL user

Used by MPDV:

MPDV uses this user to create the ORACLE instance.

MPDV Support uses this user to view the database.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

DBSNMP user

Used by MPDV:

MPDV does not use this user

Password can be changed:

YES

Password is changed by:

MPDV

Please note:

This user should not be deleted as it might be used by ORACLE Support.

OUTLN user

Used by MPDV:

MPDV does not use this user

Password can be changed:

YES

Password is changed by:

MPDV

Please note:

This user should not be deleted as it might be used by ORACLE Support.

BASE_FCT_DB_passwords.docx

Version: 1.0.23235

Page 4 of 6

Password of the HYDRA Database

SYS user

Used by MPDV:

MPDV Support uses this user to view the database.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

SYSTEM user

Used by MPDV:

MPDV Support uses this user to view the database.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

Microsoft SQL Server database

sa user

Used by MPDV:

MPDV uses this user to create the database instance and database.

MPDV Support uses thsi user to view the database.

The database user "sa" is created along with a default password if it is a HYDRA standard installation.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

BASE_FCT_DB_passwords.docx

Version: 1.0.23235

Page 5 of 6

Password of the HYDRA Database

hydadm user

Used by MPDV:

MPDV Support uses this user to view the database.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

BASE_FCT_DB_passwords.docx

Version: 1.0.23235

Page 6 of 6


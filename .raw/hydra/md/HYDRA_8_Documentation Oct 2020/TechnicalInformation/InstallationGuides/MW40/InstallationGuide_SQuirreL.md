HYDRA Documentation

HYDRA MW4.0pe
Installing SQuirreL SQL Client

Version 1.0.23049

Last changed on: 02.09.2020

Installing SQuirreL SQL Client

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 2 of 16

Installing SQuirreL SQL Client

Contents

1  Prerequisites ................................................................................................ 4

2

Installation Steps .......................................................................................... 5

2.1  Copy SQuirreL Directory ..................................................................................... 5

2.2  Creating a Shortcut ............................................................................................. 5

3  Configure Drivers ......................................................................................... 7

3.1  SQL Server Connection ...................................................................................... 7

3.2  Oracle Connection............................................................................................. 12

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 3 of 16

Installing SQuirreL SQL Client

1  Prerequisites

The SQuirreL SQL Client is a Java application, and as such, it requires a Java runtime environment (JRE).

It comes with its own JRE 8 “Corretto” from Amazon. So there is no separate JRE installation required.

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 4 of 16

Installing SQuirreL SQL Client

2

Installation Steps

2.1  Copy SQuirreL Directory

The  installation  files  for  the  “SQuirreL  SQL  Client”  can  be  found  on  the  HYDRA  Server  in  the  following

default directory:

d:\mip1\admtools\SQuirreL_SQL_Client

Please copy the folder and all its contents to a destination directory of your choice, e.g.:

<local destination>\SQuirreL_SQL_Client

2.2  Creating a Shortcut

Copy the following shortcut file to the Public Desktop directory of your PC (e.g.: “C:\Users\Public\Desktop”):

<local destination>\SQuirreL_SQL_Client\SQuirreL SQL Client.lnk

On a HYDRA server copy the shortcut file to the folder "MIP Administration" in the Public Desktop directory

“C:\Users\Public\Desktop”.

You might want to change the path configurations for “Target”, “Start in” and the “icon file” of your shortcut

file to match your local destination directory:

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 5 of 16

Installing SQuirreL SQL Client

For use with HYDRA there are already two default aliases available which you could use to connect to a

locally installed HYDRA database, either for a SQL Server or an Oracle database.

For different server configurations (e.g. separate application and database server) you might need to edit

the alias settings first.

Note: For security reasons it is  not recommended to enter the password when adding or changing alias

settings (see below)!

Warning:

For security reasons it is not recommended to enter the password when adding or changing alias settings

because passwords will be saved in clear text in the configuration file!

e.g.: d:\mip1\admtools\SQuirreL_SQL_Client\.squirrel-sql\SQLAliases23.xml

That might pose a security issue for your HYDRA system.

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 6 of 16

Installing SQuirreL SQL Client

3  Configure Drivers

This configuration is pre-defined in the SQuirreL directory.

In case of creating a new driver or connection configuration, please follow these steps:

Folder with needed drivers:

3.1  SQL Server Connection

Please use the mssql-jdbc-7.2.2.jre8.jar driver in the “driver” folder in the SQuirreL directory:

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 7 of 16

Installing SQuirreL SQL Client

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 8 of 16

Installing SQuirreL SQL Client

The example URL should be replaced by the following string for an better match with our other tools:

jdbc:sqlserver://<server_name>;instanceName=<instance_name>;databaseName=<db_name>

If it is successful, the following green message should be shown and the driver gets a blue checked state.

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 9 of 16

Installing SQuirreL SQL Client

Now a new connection/alias can be added:

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 10 of 16

Installing SQuirreL SQL Client

Warning:

For security reasons it is not recommended to enter the password when adding or changing alias settings

because passwords will be saved in clear text in the configuration file!

e.g.: d:\mip1\admtools\SQuirreL_SQL_Client\.squirrel-sql\SQLAliases23.xml

That might pose a security issue for your HYDRA system.

Now it is possible to connect to the database:

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 11 of 16

3.2  Oracle Connection

Please use the ojdbc7.jar driver in the “driver” folder in the SQuirreL directory.

Installing SQuirreL SQL Client

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 12 of 16

Installing SQuirreL SQL Client

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 13 of 16

Installing SQuirreL SQL Client

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 14 of 16

Now a new connection/alias to an Oracle database can be added:

Installing SQuirreL SQL Client

Warning:

For security reasons it is not recommended to enter the password when adding or changing alias settings

because passwords will be saved in clear text in the configuration file!

e.g.: d:\mip1\admtools\SQuirreL_SQL_Client\.squirrel-sql\SQLAliases23.xml

That might pose a security issue for your HYDRA system.

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 15 of 16

Now it is possible to connect to the database:

Installing SQuirreL SQL Client

InstallationGuide_SQuirreL.docx

Version: 1.0.23049

Page 16 of 16


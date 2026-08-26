HYDRA Documentation

Installation Guide SQL Server
2019
for HYDRA MW4.0pe

Version 1.0.23049

Last changed on: 02.09.2020

Installation Guide SQL Server 2019

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 2 of 66

Installation Guide SQL Server 2019

Contents

1

Installation SQL Server 2019 SE ................................................................. 4

1.1.

Installation Requirements .................................................................................... 5

1.2.

Installing SQL Server 2019 .................................................................................. 7

1.2.1.

Installing additional Database Instance.................................................. 25

1.3.

Installing SQL Server Management Studio ........................................................ 36

1.4.

Installing Service Pack ...................................................................................... 38

1.4.1.

Installing Cumulative Update Package .................................................. 39

1.5.  Post Installation Configuration ........................................................................... 40

1.6.  Database ........................................................................................................... 45

1.6.1.  Create Database ................................................................................... 45

1.6.2.  Create Database User ........................................................................... 50

1.6.3.  ODBC Configuration .............................................................................. 54

1.6.4.  Remap Database User to SQL Server Login ......................................... 59

1.7.  Separate Database and Application Server ....................................................... 60

1.7.1.

Installing SQL Server Client ................................................................... 61

1.7.2.  ODBC Configuration .............................................................................. 62

1.7.3.

Installing SQL Server Management Studio ............................................ 62

1.7.4.

Installing Microsoft ODBC Driver 13.1 ................................................... 63

1.7.5.

Installing Microsoft Command Line Utilities ........................................... 65

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 3 of 66

Installation Guide SQL Server 2019

1

Installation SQL Server 2019 SE

Attention:

To  perform  the  following  procedures  advanced  knowledge  of  your  server  operating  system,  the

intended database software and common IT systems is required.

These procedures are performed on your own responsibility.

MPDV Mikrolab GmbH is not liable for any loss of or destruction of data.

In case of doubt place an order with MPDV Mikrolab GmbH to perform these tasks for you.

This  manual  explains  how  to  install  Microsoft  SQL  Server  2019  Standard  Edition  for  use  with  MPDVs

Manufacturing Integration Platform (MIP) based products like MIP 1.1, HYDRA MW4.0pe or FEDRA 1.1.

Other than MIP the applications HYDRA and FEDRA allow for a multi system installation (multiple HYDRA

or FEDRA systems on the same (application) server).

For multi system installations every HYDRA or FEDRA system needs its own database.

Name your databases mip1, mip2, mip3, etc.

With  multi  system  installations  it  is  strongly  recommended  that  every  database  has  its  own  database

instance available, e.g.: MIPMS1, MIPMS2, MIPMS3, etc.

Attention: Do not run these installation procedures on a computer where MIP based products like MIP 1.1,

HYDRA MW4.0pe or FEDRA 1.1 are already running.

By doing so, you might destroy your existing MIP based system.

Please be extremely cautious if you decide to do it anyway.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 4 of 66

1.1.  Installation Requirements

Installation Guide SQL Server 2019

  Server hardware and software according to the recommendations of MPDV Mikrolab GmbH for the

respective MIP based product.

See manuals: HW_SW_GUIDE.pdf

  English  or  German  Windows  operating  system  according  to  the  recommendations  of  MPDV

Mikrolab GmbH.

  Server  configuration  according  to  MPDVs  server  configuration  manuals  for  the  respective  MIP

based product, e.g.:

"Preparation Guide for Windows Server 2016" (e.g.: PreInstGuide_MW40_WIN2016.pdf)

"Preparation Guide for Windows Server 2019" (e.g.: PreInstGuide_MW40_WIN2019.pdf)



Installation DVD or installation files for the required edition of “SQL Server 2019”, e.g. for Standard

Edition, e.g.:

English:

en_sql_server_2019_standard_x64_dvd_c7d70add.iso

German:

de_sql_server_2019_standard_x64_dvd_2cd4ee21.iso



Installation files for the Microsoft SQL Server Management Studio (SSMS) matching the language

of your operating system, e.g.:

English:

SSMS-Setup-ENU.exe

German:

SSMS-Setup-DEU.exe

(SQL Server Management Studio is no longer included in the installation DVD of the SQL Server!)

  The language versions of the operating system and the database must match!

  Service Pack (SP) and  Cumulative Update  Package  (CP) installation files for  SQL Server  2019

mandatory for the respective MIP based product:

Service Pack (SP):

currently there is no SP installation mandatory for MIP, HYDRA or FEDRA

(only if the required SP is not already included in the original installation file or DVD)

Cumulative Update Package (CP):

currently  there  is  no  CP  installation  mandatory  for  MIP,

HYDRA or FEDRA

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 5 of 66

Installation Guide SQL Server 2019

  Minimum hard disk configuration:

Partition C:\ with a minimum of 100 GB disk space available and file system NTFS.

Partition D:\ with a minimum of 600 GB disk space available and file system NTFS.

For more details please see the server configuration manual.

  For better performance it is recommended to have at least two hard disks available:

Disk 1 with partition C:\ ( 100 GB) and D:\ ( 200 GB)  (for Windows and applications)

Disk 2 with partition E:\ ( 400 GB)

(for database files)

For more details please see the server configuration manual.

  The Windows desktop resolution should be set to 1920 x 1080 at least to 1280 x 1024

(see server configuration manual).

  Local Windows user mipadm (see server configuration manual).

The user mipadm must be member of the local group Administrators.

  Activated Feature: .NET Framework 3.5

-Button  Server Manager  Manage  Add Roles and Features

To add this feature the directory x:\sources\sxs from the Windows installation DVD is needed!

(see server configuration manual)

  With separate MIP based application and database servers it is mandatory to install additional

software on the application server.

Please see chapter “1.7. Separate Database and Application Server”.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 6 of 66

Installation Guide SQL Server 2019

1.2.  Installing SQL Server 2019

Login as local user mipadm.

Insert the SQL Server installation disc or mount the installation file, e.g.:

en_sql_server_2019_standard_x64_dvd_c7d70add.iso

If the installation is not starting automatically start it manually by double clicking setup.exe.

Please proceed with the installation as described below:

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 7 of 66

Planning

Installation Guide SQL Server 2019

Select: System Configuration Checker

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 8 of 66

Installation Guide SQL Server 2019

There should be no warnings or errors

OK

Installation

Select: New SQL Server stand-alone installation or add features to an existing installation

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 9 of 66

Installation Guide SQL Server 2019

Enter your product key (if necessary)

Next

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 10 of 66

Installation Guide SQL Server 2019

Activate: I accept the license terms

Next

If your server has no access to the internet you will see a message like this:

Next

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 11 of 66

If your server has access to the internet you will see the following message:

Installation Guide SQL Server 2019

Activate: Use Microsoft Update to check for updates (recommended)

Next

If there are SQL Server product updates available you might want to include them in your installation:

Next

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 12 of 66

Installation Guide SQL Server 2019

There should be no errors or warnings:

Possible warnings for "Windows Firewall" which is supposedly active but actually isn't, can be ignored.

Next

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 13 of 66

Installation Guide SQL Server 2019

Select the features to be installed:  Database Engine Services

Select Instance root directory, e.g.:  D:\SQLServer\

(when using 1 hard disk)

E:\SQLServer\

(when using 2 or more hard disks)

Next

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 14 of 66

Installation Guide SQL Server 2019

Named instance:

MIPMS1

Instance ID:

MIPMS1

Next

Activate:

Grant Perform Volume Maintenance Task privilege to SQL Server …

Startup Type:  Automatic

(All services must start automatically!)

Select Tab:

Collation

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 15 of 66

Installation Guide SQL Server 2019

Collation

Customize

Collation designator: Latin1_General

Activate: Case-sensitive

Activate: Accent-sensitive

OK

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 16 of 66

Installation Guide SQL Server 2019

Next

Activate:

Mixed Mode

(mandatory for MIP based products!)

Enter password:

<SECRET sa PASSWORD>

Confirm password:

<SECRET sa PASSWORD> (password should be disclosed to MPDV)

Click on Button:

Add Current User

Select Tab:

Data Directories

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 17 of 66

Data Directories

Installation Guide SQL Server 2019

Data root directory:

D:\SQLServer\

(when using 1 hard disk)

E:\SQLServer\

(when using 2 or more hard disks)

User database directory:

change only if necessary

User database log dir.:

change only if necessary

Backup directory:

D:\SQLServer\MSSQL15.MIPMS1\MSSQL\Backup

(The backup directory should not be on the same disk as database data and log files!)

Select Tab:

TempDB

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 18 of 66

TempDB

Installation Guide SQL Server 2019

TempDB data files:

Number of files:

4 (Default, do not use less than 4 files!)

Initial size (MB):

Autogrowth (MB):

400

400

Data directories:

change only if necessary,

e.g. to place TempDB data files on separate disks

TempDB log file:

Initial size (MB):

Autogrowth (MB):

400

200

Log directory:

change only if necessary,

e.g. to place TempDB log file on a separate disk

Select Tab":

MaxDOP

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 19 of 66

MaxDOP

Installation Guide SQL Server 2019

Check the setting for “Maximum degree of parallelism (MaxDOP)” which was calculated by Setup.

Make sure it is set to a value of at least 4

If the calculated value is higher than 4 you may leave it that way.

Select Tab:

Memory

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 20 of 66

Installation Guide SQL Server 2019

Change radio button from Default to Recommended:

Min Server Memory (MB):

0

Max Server Memory (MB):

adjust according to the statement below

(Note  that  the  displayed  recommended  value  does  not  consider  the  following  circumstances  and  might

need to be adjusted accordingly)

Depending on the total amount of RAM memory available on the server and the system requirements by

the  MIP based product  please set the size for “Max  Server Memory (MB)” so that  as much memory as

possible will be used by the database instance.

The size of “Max Server Memory (MB)”  will  have direct  influence  on the performance of the MIP  based

application because with bigger sizes more data can be cached by the database.

As long as it is ensured that there will be enough RAM left for the requirements of the server’s operating

system (~2GB), the MIP based product services (depending on the system size ~1,5-8GB per system), the

MIP  WSP  service  (depending  on  the  system  size  ~2-12GB  per  system)  and  other  database  instances

installed on the same server you should use as much memory for “Maximum Server Memory” as possible.

Make  sure  that  the  available  server  memory  (RAM)  is  used  to  full  capacity  without  forcing  your

server into swapping.

Activate  the  checkbox  to  accept  the  recommended  memory  configurations  for  the  SQL  Server

Database Engine

Select Tab:

FILESTREAM

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 21 of 66

FILESTREAM

Installation Guide SQL Server 2019

no changes necessary

Next

Verify the SQL Server features to be installed

Install

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 22 of 66

Installation Guide SQL Server 2019

Make sure the installation succeeded successfully

Close

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 23 of 66

Close this Window

Installation Guide SQL Server 2019

For HYDRA or FEDRA multi system installations repeat the installation procedures to add additional

database instances (see also next chapter).

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 24 of 66

Installation Guide SQL Server 2019

1.2.1.  Installing additional Database Instance

Other than MIP the applications HYDRA and FEDRA allow for a multi system installation (multiple

HYDRA or FEDRA systems on the same (application) server).

For multi system installations every HYDRA or FEDRA system needs its own database.

Name your databases mip1, mip2, mip3, etc.

With multi system installations it is recommended that every database has its own database

instance available, e.g.: MIPMS1, MIPMS2, MIPMS3, etc.

Start an installation as described in chapter “1.2. Installing SQL Server 2019”

To install a new instance of SQL Server please proceed as follows:

Perform a new installation of SQL Server 2019

Next

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 25 of 66

Installation Guide SQL Server 2019

Enter product key (if necessary)

Activate: I accept the license terms

Next

Next

Select the features to be installed:  Database Engine Services

Select Instance root directory, e.g.:  D:\SQLServer\

(when using 1 hard disk)

E:\SQLServer\

(when using 2 or more hard disks)

Next

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 26 of 66

Installation Guide SQL Server 2019

Named instance:

MIPMS2, MIPMS3, MIPMS4, etc.

Instance ID:

MIPMS2, MIPMS3, MIPMS4, etc.

Next

Select:

Grant Perform Volume Maintenance Task privilege to SQL Server …

Startup Type:  Automatic

(All services must start automatically!)

Select Tab:

Collation

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 27 of 66

Installation Guide SQL Server 2019

Collation

Customize

Collation designator: Latin1_General

Activate: Case-sensitive

Activate: Accent-sensitive

OK

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 28 of 66

Installation Guide SQL Server 2019

Next

Activate:

Mixed Mode

(mandatory for MIP based products!)

Enter password:

<SECRET sa PASSWORD>

Confirm password:

<SECRET sa PASSWORD> (password should be disclosed to MPDV)

Click on Button:

Add Current User

Select Tab:

Data Directories

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 29 of 66

Data Directories

Installation Guide SQL Server 2019

Data root directory:

D:\SQLServer\

(when using 1 hard disk)

E:\SQLServer\

(when using 2 or more hard disks)

User database directory:

change only if necessary

User database log dir.:

change only if necessary

Backup directory:

D:\SQLServer\MSSQL15.MIPMS2\MSSQL\Backup

(The backup directory should not be on the same disk as database data and log files!)

Select Tab:

TempDB

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 30 of 66

TempDB

Installation Guide SQL Server 2019

TempDB data files:

Number of files:

4 (Default, do not use less than 4 files!)

Initial size (MB):

Autogrowth (MB):

400

400

Data directories:

change only if necessary,

e.g. to place TempDB data files on separate disks

TempDB log file:

Initial size (MB):

Autogrowth (MB):

400

200

Log directory:

change only if necessary,

e.g. to place TempDB log file on a separate disk

Select Tab":

MaxDOP

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 31 of 66

MaxDOP

Installation Guide SQL Server 2019

Check the setting for “Maximum degree of parallelism (MaxDOP)” which was calculated by Setup.

Make sure it is set to a value of at least 4

If the calculated value is higher than 4 you may leave it that way.

Select Tab:

Memory

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 32 of 66

Installation Guide SQL Server 2019

Change radio button from Default to Recommended:

Min Server Memory (MB):

0

Max Server Memory (MB):

adjust according to the statement below

(Note  that  the  displayed  recommended  value  does  not  consider  the  following  circumstances  and  might

need to be adjusted accordingly)

Depending on the total amount of RAM memory available on the server and the system requirements by

MIP based products please set the size for “Max Server Memory (MB)” so that as much memory as possible

will be used by the database instance.

The size of “Max Server Memory (MB)”  will  have direct  influence  on the performance of the MIP  based

application because with bigger sizes more data can be cached by the database.

As long as it is ensured that there will be enough RAM left for the requirements of the server’s operating

system (~2GB), the MIP based product services (depending on the system size ~1,5-8GB per system), the

MIP  WSP  service  (depending  on  the  system  size  ~2-12GB  per  system)  and  other  database  instances

installed on the same server you should use as much memory for “Maximum Server Memory” as possible.

Make  sure  that  the  available  server  memory  (RAM)  is  used  to  full  capacity  without  forcing  your

server into swapping.

Activate  the  checkbox  to  accept  the  recommended  memory  configurations  for  the  SQL  Server

Database Engine

Select Tab:

FILESTREAM

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 33 of 66

FILESTREAM

Installation Guide SQL Server 2019

no changes necessary

Next

Install

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 34 of 66

Make sure the installation succeeded successfully

Installation Guide SQL Server 2019

Close

Close this Window

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 35 of 66

Installation Guide SQL Server 2019

1.3.  Installing SQL Server Management Studio

Start the Installation of the SQL Server Management Studio.

Make sure you have the installation file matching the language of your servers operating system available,

e.g.:

SSMS-Setup-ENU.exe

If  the  version  of  your  SQL  Server  Management  Studio  is  higher  than  version  17  and  if  you  are  using

separate  application  and  database  servers  for  your  MIP  based  product  you  need  to  follow  the

instructions in chapter “1.7. Separate Database and Application Server”.

Install

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 36 of 66

Installation Guide SQL Server 2019

Close

Depending on the installation you might see a message where a restart of the server is required.

Restart

If it is requested restart your server now.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 37 of 66

Installation Guide SQL Server 2019

1.4.  Installing Service Pack

Currently there is no Service Pack installation mandatory for MIP based products.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 38 of 66

Installation Guide SQL Server 2019

1.4.1.  Installing Cumulative Update Package

Currently there is no Cumulative Update Package installation mandatory for MIP based products.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 39 of 66

Installation Guide SQL Server 2019

1.5.  Post Installation Configuration

Start the “SQL Server 2019 Configuration Manager”, e.g.:
Start-Button – Microsoft SQL Server 2019 – SQL Server 2019 Configuration Manager

In  “SQL  Server  Network  Configuration”  the  protocols  Shared  Memory,  Named  Pipes  and  TCP/IP

must be enabled for all available database instances, e.g.: MIPMS1, MIPMS2, etc.:

Start the “SQL Server Management Studio”, e.g.:
Start-Button – Microsoft SQL Server Tools 18 – Microsoft SQL Server Management Studio

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 40 of 66

Login to the appropriate database instance (e.g.: MIPMS1) as User “sa”:

Installation Guide SQL Server 2019

Server name:

<hostname>\MIPMS1

Authentication:

SQL Server Authentication

Login:

Password:

Connect

sa

<SECRET sa PASSWORD> (see chapter “1.2. Installing SQL Server 2019”)

Right click on <hostname>\MIPMS1

Select: Properties

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 41 of 66

Memory (you should see the values you entered during the installation, see above)

Installation Guide SQL Server 2019

Minimum server memory (in MB):

0

Maximum server memory (in MB):

as much as available

Depending on the total amount of RAM memory available on the server and the system requirements by

MIP based products please set the size for “Maximum server memory” so that as much memory as possible

will be used by the database instance.

The  size  of  “Maximum  server  memory”  will  have  direct  influence  on  the  performance  of  the  MIP  based

application because with bigger sizes more data can be cached by the database.

As long as it is ensured that there will be enough RAM left for the requirements of the server’s operating

system (~2GB), the MIP based product services (depending on the system size ~1,5-8GB per system), the

MIP  WSP  service  (depending  on  the  system  size  ~2-12GB  per  system)  and  other  database  instances

installed on the same server you should use as much memory for “Maximum server memory” as possible.

Make  sure  that  the  available  server  memory  (RAM)  is  used  to  full  capacity  without  forcing  your

server into swapping.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 42 of 66

Advanced

Installation Guide SQL Server 2019

Optimize for Ad hoc Workloads

True

Cost Threshold for Parallelism

40

Max Degree of Parallelism

4 or higher (see MaxDOP during the installation above)

OK

Repeat those configurations for every database instance.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 43 of 66

Installation Guide SQL Server 2019

Start-Button – Windows Administrative Tools – Services

The following 3 SQL Server services are required by MIP based products.

A running service “SQL Server Browser” is mandatory for the functionality of MIP based products.

Check that those services are starting automatically:

Example for a multi system installation:

Restart your server now.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 44 of 66

Installation Guide SQL Server 2019

1.6.  Database

Other than MIP the applications HYDRA and FEDRA allow for a multi system installation (multiple HYDRA

or FEDRA systems on the same (application) server).

For multi system installations every HYDRA or FEDRA system needs its own database.

Name your databases mip1, mip2, mip3, etc.

With  multi  system  installations  it  is  strongly  recommended  that  every  database  has  its  own  database

instance available, e.g.: MIPMS1, MIPMS2, MIPMS3, etc.

Before you can proceed with creating a database to be used by the MIP based product you need to have

the following files available:

db_mip_sql2019.sql (or db_mip_sql2019.bsp)

create_user_mipadm_sql201x.sql

Either those files were provided to you in advance by MPDV or you might have installation packages for

the MIP based application available.

In the MIP package the files are located in the “.\Database” directory.

In the HYDRA or the FEDRA package the files are located in the “.\db_sql” directory.

1.6.1.  Create Database

Attention:

Do not run these installation procedures on a computer where MIP based products are already running.

By doing so, you might destroy your existing MIP based system.

Please be extremely cautious if you decide to do it anyway.

Logon to the (database) server as local user “mipadm”.

Check if the database creation script db_mip_sql2019.sql is available in the above mentioned directories.

If not, make a copy of the file db_mip_sql2019.bsp, e.g.:

copy d:\mip1\db_sql\db_mip_sql2019.bsp d:\mip1\db_sql\db_mip_sql2019.sql

Edit the database creation script and make sure that all path configurations are set corresponding to your

system environment, e.g.:

FILENAME=N'E:\SQLServer\MSSQL15.MIPMS1\MSSQL\DATA\rootdbs_Data.MDF'

All paths used in the database creation script must exist on your server before running the script!

Do not change or remove settings regarding user configurations and authorizations or any other

permissions without consulting with MPDV first!

By doing so it might be possible that the MIP based product will not work properly.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 45 of 66

Installation Guide SQL Server 2019

Create a backup copy of the edited database creation script db_mip_sql2019.sql, e.g.:

copy d:\mip1\db_sql\db_mip_sql2019.sql d:\mip1\db_sql\db_mip_sql2019_mip1.sql

Start the “SQL Server Management Studio”, e.g.:
Start-Button – Microsoft SQL Server Tools 18 – Microsoft SQL Server Management Studio

Login to the appropriate database instance (e.g.: MIPMS1) as User “sa”:

Server name:

<hostname>\MIPMS1

Authentication:

SQL Server Authentication

Login:

Password:

Connect

sa

<SECRET sa PASSWORD> (see chapter “1.2. Installing SQL Server 2019”)

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 46 of 66

Open the database creation script (e.g. db_mip_sql2019.sql) in menu “File  Open  File…”

Installation Guide SQL Server 2019

Select file, e.g.: d:\mip1\db_sql\db_mip_sql2019.sql

Attention:

The database creation script will delete an existing database (Default: “mip1”) before creating a new one.

If you perform the following procedures on a server where there are already MIP based databases installed

you might destroy your existing MIP based system.

Execute

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 47 of 66

The database creation must complete without errors:

Installation Guide SQL Server 2019

 Commands completed successfully

If a MIP based database was already created earlier on this server there will be error messages about user

defined data types “dbo.hydate” and “dbo.smallfloat” which already exist.

In this case the following messages can be ignored:

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 48 of 66

To avoid those error messages you might want to delete the user defined data types first before running

Installation Guide SQL Server 2019

the database creation script again.

In this case use the following commands:

USE model

DROP TYPE hydate;

DROP TYPE smallfloat;

USE tempdb

DROP TYPE hydate;

DROP TYPE smallfloat;

USE mip1

DROP TYPE hydate;

DROP TYPE smallfloat;

Close session:

File  Close

Repeat these procedures for every  additional database instance (e.g.: MIPMS2) and its database

(e.g.: mip2).

The database creation script “db_mip_sql2019.sql” needs to be duplicated and adjusted accordingly.

Make sure to save a copy of the new script using a unique file name, e.g.:

d:\mip1\db_sql\db_mip_sql2019_mip2.sql

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 49 of 66

1.6.2.  Create Database User

Installation Guide SQL Server 2019

Note about database user name “mipadm”:

MPDV strongly recommends not to change the default database user name “mipadm”!

If you decide to change it anyway it is mandatory that the names of the database user and the database

schema are always identical!

If  the  database  user  name  needs  to  be  different  than  “mipadm”  the  schema  name  has  to  be  changed

accordingly.

At present only characters “a-z” and “0-9” are allowed!

Upper case characters are not allowed!

Note about password for database user “mipadm”:

It is possible to use different passwords than MPDVs default password.

For  security  reasons  MPDV  strongly  recommends  to  change  the  default  password  used  for  the

database user “mipadm” as soon as the user is successfully created (see below).

The new password must be disclosed to MPDV.

The following characters are not allowed for the password:

- Characters with ASCII Code > 126 (e.g. German umlauts, French “umlauts”, etc.)

- Pipe: |

- Ampersand: &

Do not change or remove settings regarding user configurations and authorizations or any other

permissions without consulting with MPDV first!

By doing so it might be possible that the MIP based product will not work properly.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 50 of 66

Installation Guide SQL Server 2019

Make sure that no other sessions are open before running the script.

Open database user creation script (create_user_mipadm_sql201x.sql) in menu

“File  Open  File…”

Select file, e.g.: d:\mip1\db_sql\create_user_mipadm_sql201x.sql

For security reasons MPDV strongly recommends to change the password for the database user “mipadm”

as soon as the user is successfully created (see below).

If you decide to change the password directly here in the SSMS window make sure not to save the user

creation script afterwards which then will contain the supposedly secret password in plain text!

Execute

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 51 of 66

The user must be created without errors:

Installation Guide SQL Server 2019

 Commands completed successfully

For security reasons MPDV strongly recommends to change the password for the database user

“mipadm” as soon as the user is successfully created (see above).

To change a user’s password use the following commands:

USE master

ALTER LOGIN login_name WITH PASSWORD = 'password'

e.g.:

USE master

ALTER LOGIN mipadm WITH PASSWORD = 'NewSecurePW'

The new password must be disclosed to MPDV.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 52 of 66

If  the  user  “mipadm”  was  already  created  earlier  on  this  server  the  following  messages  can  be  ignored

when executing the user creation script again:

Installation Guide SQL Server 2019

To avoid those error messages you might want to delete schema, user and login first before running the

user creation script again.

In this case use the following commands:

USE mip1

drop schema mipadm

drop user mipadm

drop login mipadm

GO

Repeat these procedures for every  additional database instance (e.g.: MIPMS2) and its database

(e.g.: mip2).

The  user  creation  script  “create_user_mipadm_sql201x.sql”  needs  to  be  duplicated  and  adjusted

accordingly. Make sure to save a copy of the new script using a unique file name, e.g.:

d:\mip1\db_sql\create_user_mipadm_sql201x_mip2.sql

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 53 of 66

Installation Guide SQL Server 2019

1.6.3.  ODBC Configuration

Start-Button – Windows Administrative Tools – ODBC Data Sources (64-bit)

Select: System DSN

Select: Add

Select: SQL Server Native Client 11.0

Finish

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 54 of 66

Installation Guide SQL Server 2019

Name:

MIPSQL1

(mandatory for MIP based products, e.g. for HYDRA system 1)

(use MIPSQL2, MIPSQL3, etc. for additional HYDRA systems)

Description:  MIP1 Database

Server:

<hostname>\MIPMS1

(<hostname> = hostname or IP-address of the MIP based products (database) server)

Next

Select: With SQL Server authentication using a login ID and password entered by the user

Login ID:

mipadm

(see chapter “1.6.2 Create Database User”)

Password:

<SECRET mipadm PASSWORD>

(see chapter “1.6.2 Create Database User”)

Next

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 55 of 66

Installation Guide SQL Server 2019

Change the default database to: mip1

(select mip2, mip3, etc. for additional HYDRA systems)

Activate:

Use ANSI quoted identifiers

Deactivate:

Use ANSI nulls, paddings and warnings

Application intent: READWRITE

Next

Deactivate all!

Finish

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 56 of 66

Installation Guide SQL Server 2019

Test Data Source

Make sure the connectivity tests completed successfully:

OK

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 57 of 66

Installation Guide SQL Server 2019

OK

Repeat these procedures for every additional database and database instance.

Use Data Source Names: MIPSQL2, MIPSQL3, etc.

Example for a multi system installation:

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 58 of 66

Installation Guide SQL Server 2019

1.6.4.  Remap Database User to SQL Server Login

After restoring a database “mip1” it might be necessary to remap the database user “mipadm” to the SQL

Server login “mipadm” by using one of the following commands:

According to Microsoft the procedure “sp_change_users_login” is currently in maintenance mode and may

be removed in a future version of Microsoft SQL Server.

sp_change_users_login 'update_one', 'username', 'loginname'

use mip1

sp_change_users_login 'update_one', 'mipadm', 'mipadm'

go

Microsoft recommends to use the command “ALTER USER” instead, e.g.:

use mip1

ALTER USER mipadm WITH LOGIN = mipadm

go

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 59 of 66

Installation Guide SQL Server 2019

1.7.  Separate Database and Application Server

With separate application and database servers for MIP based products the following software is needed

on the MIP based application server and must always be installed on the application server.

The SQL Server Native Client is needed by MIP based products to connect to its database.

The following SQL Server tools are mandatory for several MIP, HYDRA or FEDRA functionality:

bcp.exe (needed by hy2exp.exe, hy2imp.exe and PDV 8.3)

sqlcmd.exe (needed by hy_diff_mw4.scr)

Please  make  always  sure  that  the  SQL  Server  tools  bcp.exe  and  sqlcmd.exe  are  available  on  the

application server of your MIP based product!

Those tools are part of the “SQL Server Management Studio” installation package as long as the version

of your SSMS is not higher than version 17.

If  using  a  SSMS  version  >17  you  need  to  install  the  64-Bit  version  of  the  “Microsoft  Command  Line

Utilities 14.0 for SQL Server”, e.g. to be download from:

https://www.microsoft.com/en-us/download/details.aspx?id=53591

The Microsoft Command Line Utilities requires an already installed 64-Bit version of the “Microsoft ODBC

Driver 13.1 for SQL Server”, e.g. to be download from:

https://www.microsoft.com/en-us/download/details.aspx?id=53339

Proceed with the installation as described below.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 60 of 66

Installation Guide SQL Server 2019

1.7.1.  Installing SQL Server Client

On the application server of your MIP based product start the installation as described in chapter “1.2.

Installing SQL Server 2019”.

Choose the feature “Client Tools Connectivity” to install:

Next

Install

Close

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 61 of 66

Installation Guide SQL Server 2019

1.7.2.  ODBC Configuration

Always perform the ODBC configuration on the application server of your MIP based product as described

in chapter “1.6.3. ODBC Configuration”.

1.7.3.  Installing SQL Server Management Studio

Always install the “SQL Server Management Studio” on the application server of your MIP based product

as described in chapter “1.3. Installing SQL Server Management Studio”.

If the version of your SQL Server Management Studio is higher than version 17 you need to proceed with

the following chapters.

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 62 of 66

Installation Guide SQL Server 2019

1.7.4.  Installing Microsoft ODBC Driver 13.1

The Microsoft Command Line Utilities require an already installed 64-Bit version of the “Microsoft ODBC

Driver 13.1 for SQL Server”, e.g. to be download from:

https://www.microsoft.com/en-us/download/details.aspx?id=53339

Depending on the language setting of your application server execute one of the following files:

msodbcsql_de.msi or msodbcsql_en.msi.

Next

I accept the terms in the license agreement

Next

Next

Install

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 63 of 66

Installation Guide SQL Server 2019

Finish

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 64 of 66

Installation Guide SQL Server 2019

1.7.5.  Installing Microsoft Command Line Utilities

If  using  a  SSMS  version  >17  you  need  to  install  the  64-Bit  version  of  the  “Microsoft  Command  Line

Utilities 14.0 for SQL Server”, e.g. to be download from:

https://www.microsoft.com/en-us/download/details.aspx?id=53591

Execute the file MsSqlCmdLnUtils.msi.

Next

I accept the terms in the license agreement

Next

Install

Finish

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 65 of 66

Installation Guide SQL Server 2019

Please  make  always  sure  that  the  SQL  Server  tools  bcp.exe  and  sqlcmd.exe  are  available  on  the

application server of your MIP based product!

bcp.exe (needed by hy2exp.exe, hy2imp.exe and PDV 8.3) should now be available, e.g. in:

c:\Program Files\Microsoft SQL Server\Client SDK\ODBC\130\Tools\Binn\bcp.exe

sqlcmd.exe (needed by hy_diff_mw4.scr) should now be available, e.g. in:

c:\Program Files\Microsoft SQL Server\Client SDK\ODBC\130\Tools\Binn\SQLCMD.EXE

InstallationGuide_MW40_SQL2019.docx  Version: 1.0.23049

Page 66 of 66


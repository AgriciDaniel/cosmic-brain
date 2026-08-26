HYDRA Documentation

Reorganization Database for
HYDRA MW4.0pe

Version 1.0.23049

Last changed on: 02.09.2020

Reorganization Database for HYDRA MW4.0pe

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 2 of 19

Reorganization Database for HYDRA MW4.0pe

Contents

1

Important Notes ............................................................................................ 4

2  Export Data .................................................................................................. 5

3  Delete Data .................................................................................................. 8

4  Changing exported Data ............................................................................ 10

5

Import Data ................................................................................................ 14

6  Activating Licenses .................................................................................... 18

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 3 of 19

Reorganization Database for HYDRA MW4.0pe

1

Important Notes

Attention:

To perform the following procedures detailed knowledge of HYDRA and the used database system

is required.

These procedures are performed on your own responsibility.

MPDV Mikrolab GmbH is not liable for any loss of data or for any destruction of data.

In case of doubt you might want to place an order with MPDV Mikrolab GmbH to perform these tasks

for you.

This manual describes how to export, delete and import a complete HYDRA database.

It is not possible to export and import only parts of a HYDRA database.

If the following procedures are used to duplicate a HYDRA system, e.g. move the database contents from

a productive to a test system, then you must be specially aware of any data interface configurations to ERP

and PPS systems like SAP, etc..

If a duplicated system will be activated parallel to the source system with the same interface configurations

this might lead to the loss of data or to the destruction of data.

Exchanging database contents between HYDRA systems is only allowed if the  same versions of

software, service packs and extensions are installed on both systems!

Otherwise you could lose configurations, data and installed extensions when replacing existing database

contents.

In  case  of  a  duplication  you  might  need  to  perform  additional  steps  as  described  in  the  MPDV  manual

"Change_Hostname_MW40_Server.pdf".

When  importing  your  database  contents  into  a  different  HYDRA  server  you  might  need  to  replace  the

Installation-ID and the license keys and then request a new activation file from MPDVs Customer Service

Center (CustomerServiceCenter@mpdv.com) before you can use that HYDRA server permanently.

Without activation you can use a HYDRA system for 30 days.

All licenses not activated within that period will become invalid.

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 4 of 19

Reorganization Database for HYDRA MW4.0pe

2  Export Data

To  get  a  completely  reliable  and  consistent  dataset  it  is  necessary  to  shut  down  the  HYDRA

application before starting the data export!

If the data should be used in a test system where a 100% consistent dataset is not essential the export can

be performed while HYDRA is still running.

If you are using HYDRAs MES Link Enabling (MLE) communication interface for the communication with

ERP or PPS systems (e.g. like SAP R/3 or ECC) and the exported data from a productive HYDRA system

is  meant  to  be  imported  into  a  HYDRA  test  system  it  is  strongly  recommended  to  shut  off  the  MLE

communication interface within the HYDRA MOC client before starting the export.

For more detailed information please see the HYDRA user manuals.

Logon as user mipadm to the HYDRA server.

Open the environment for the desired HYDRA system:

Windows:

Command prompt, e.g. "MS-DOS MIP 1"

UNIX:

hysys.scr –X (e.g. hysys.scr -1)

Make sure you are located inside the matching HYDRA directory (HYDRADIR):

Windows:

e.g. d:\mip1

UNIX:

e.g. /u1/mip1

Check that there is enough disk space available for the designated drive letter or the file system to hold the

expected amount of data.

Check if there is already an existing subdirectory named hydra.exp.

If there is, either delete it or rename it.

ATTENTION: Please make always sure that you are connected to the correct database instance and to

the correct database and that you are really accessing the desired database contents.

This applies especially for HYDRA multi system installations.

  Windows:

hysql.exe -r -

UNIX:

hysql.out -r -

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 5 of 19

Reorganization Database for HYDRA MW4.0pe

  SQL Server:

determine database instance name:

SQL> select @@SERVERNAME;

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|0|128|HYDRASERVER\\MIPMS1|

determine database name:

SQL> select db_name();

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|0|128|mip1|

  ORACLE:

determine database instance name:

SQL> select * from v$instance;

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|3|8|1|0|16|mip1|0|64|HYDRASERVER|0|17|11.2.0.2.0|7|4|06/14/201

1|0|12|OPEN|0|3|NO|3|8|1|0|7|STOPPED|0|15||0|10|ALLOWED|0|3|NO|0|17|ACT

IVE|0|18|PRIMARY_INSTANCE|0|9|NORMAL|0|3|NO|

determine database name:

SQL> select name from v$database;

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|0|9|MIP1|

As soon as you made sure you are connected to the right database, please proceed as follows:

Start the export of the HYDRA database using the following command:

Windows:

hyexport.exe mip1

UNIX:

hyexport.out mip1

The export command creates a directory mip1.exp.

Inside this directory every database table gets its own text file.

Additionally there are the following two files:

mip1.sql

(Schema of the database)

mip1.dat

(Information regarding the extent sizes of database tables)

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 6 of 19

Reorganization Database for HYDRA MW4.0pe

Check that no errors occurred during the database export.

Possible error messages are stored in the file hyexport.err in:

Windows:

%HYDRADIR%\X\err

(e.g. d:\mip1\1\err)

UNIX:

$HYDRADIR/X/err

(e.g. /u1/mip1/1/err)

(X = HYDRA system number)

If you want to perform the export in any other directory than HYDRADIR you have to create subdirectories

"X/err" in that directory first to be able to log possible errors (X = HYDRA system number), e.g.:

Windows:

d:\export\X\err

UNIX:

/u1/export/X/err

By  using

the

following  command

it

is  possible

to  run  a  semi-automatic  database  export:

Windows:

sh.exe ./hyexport.scr

UNIX:

./hyexport.scr

hyexport.scr creates an export directory "mipX.exp" in HYDRADIR\X where X = HYDRA system number,

e.g.:

Windows:

d:\mip1\1\mip1.exp

(example for HYDRA system 1)

UNIX:

/u1/mip2/2/mip2.exp

(example for HYDRA system 2)

If  there  is  already  an  existing  directory  HYDRADIR\X\mipX.exp  it  will  be  automatically  deleted  by

hyexport.scr before the new database export is created.

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 7 of 19

Reorganization Database for HYDRA MW4.0pe

3  Delete Data

Before deleting an existing database it is strongly recommended to create a database backup first!

Logon as user mipadm to the HYDRA server.

Open the environment for the desired HYDRA system:

Windows:

Command prompt, e.g. "MS-DOS MIP 1"

UNIX:

hysys.scr –X (e.g. hysys.scr -1)

Make sure you are located inside the matching HYDRA directory (HYDRADIR):

Windows:

e.g. d:\mip1

UNIX:

e.g. /u1/mip1

ATTENTION: Please make always sure that you are connected to the correct database instance and to

the correct database and that you are really accessing the desired database contents.

This applies especially for HYDRA multi system installations.

  Windows:

hysql.exe -r -

UNIX:

hysql.out -r -

  SQL Server:

determine database instance name:

SQL> select @@SERVERNAME;

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|0|128|HYDRASERVER\\MIPMS1|

determine database name:

SQL> select db_name();

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|0|128|mip1|

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 8 of 19

Reorganization Database for HYDRA MW4.0pe

  ORACLE:

determine database instance name:

SQL> select * from v$instance;

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|3|8|1|0|16|mip1|0|64|HYDRASERVER|0|17|11.2.0.2.0|7|4|06/14/201

1|0|12|OPEN|0|3|NO|3|8|1|0|7|STOPPED|0|15||0|10|ALLOWED|0|3|NO|0|17|ACT

IVE|0|18|PRIMARY_INSTANCE|0|9|NORMAL|0|3|NO|

determine database name:

SQL> select name from v$database;

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|0|9|MIP1|

As soon as you made sure you are connected to the right database, please proceed as follows:

Please make sure that all HYDRA services (Windows) or processes (UNIX) are shut down.

Delete all the HYDRA database contents by using the following command:

Windows:

hysql.exe -O

UNIX:

hysql.out -O

Confirm the security query with "J" to start deleting the database contents.

Attention! Delete all tables from user "mipadm" !!

Please enter "J" and confirm with RETURN: J

Check that no errors occurred during the delete process.

Possible error messages are stored in the file hysql.err in:

Windows:

%HYDRADIR%\X\err

(e.g. d:\mip1\1\err)

UNIX:

$HYDRADIR/X/err

(e.g. /u1/mip1/1/err)

(X = HYDRA system number)

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 9 of 19

Reorganization Database for HYDRA MW4.0pe

4  Changing exported Data

If  the  exported  data  is  used  to  duplicate  a  HYDRA  system,  e.g.  move  the  database  contents  from  a

productive to a test system, then you must be aware of the following issues:

- MLE interface configurations for SAP systems

- HYDRA path configurations

- Interface configurations in the HYDRA Scheduler, e.g. HYD-ZHK

ATTENTION: Improper manipulation of HYDRA database contents could cause damage to your HYDRA

system.

Changing files containing exported HYDRA data is only allowed by using a text editor which is supporting

UTF-8 format, e.g.: Notepad++Portable.exe

Notepad++Portable.exe is included in every HYDRA system installation.

Windows:

%HYDRADIR%\admtools\Notepad++Portable

UNIX:

 $HYDRADIR/admtools/Notepad++Portable

MLE Interface Configuration:

If available MLE interface configurations for SAP systems were not deactivated before starting the database

export this could be done by manipulating the exported data afterwards.

In  the  export  directory  (e.g.  mip1.exp)  open  the  file  hysap_logsys.unl  and  change  the  attribute  "active

role" (ACT_ROLE) for the wanted logical system (LOGSYS) to O (= Offline):

$COLUMNS$LOGSYS|LS_DESC|ACT_ROLE|PARAM1|PARAM2|BEARB|BEARB_DATE|BEARB_TIME|

FP|Fileport|P|F||12345|08/26/2004|33579|

SAP_PP|SAP PP|O|R||12345|09/08/2011|35509|

SAP_HR|SAP HR|O|R||12345|09/08/2011|35499|

Note: The contents of your file hysap_logsys.unl might differ from the examples above!

The following settings are possible for the attribute ACT_ROLE:

P

T

I

O

Productive System

Test System

Integration System

Offline

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 10 of 19

Reorganization Database for HYDRA MW4.0pe

HYDRA Path Configuration:

In the export directory, e.g. mip1.exp open the file hy_path.unl and check all paths in the column

P_URL_PATH. Change them if necessary.

Example for a Windows system:

$COLUMNS$PATH|P_SCHEME|P_USER|P_PASSWORD|P_HOST|P_PORT|P_URL_PATH|BEM|PARAM_STR_01|PARAM_STR_02|P

ARAM_STR_03|BEARB|BEARB_DATE|BEARB_TIME|

DNC|file|||hydra|0|1\\dncdaten|sample path for DNC||||12345|07/27/2012|0|

DOC|file|||hydra|0|1\\custom\\bde\\dokumente|sample path for dokuments||||12345|07/27/2012|0|

HYDRA|file|||hydra|0|./1/grafik/bde|AIP path for workplace pictures||||12345|07/09/2013|0|

PDVARC|file||||0|./1/custom/archive/pdv2/tnt/|PDV export path||||12345|05/24/2011|0|

PDVTRANS|file|||localhost|0|./1/spool/|PDV transport path||||12345|05/24/2011|0|

SPOOLWSC|file|||localfile|0|d:\\mip1\\1\\spool|MOC path for spool access||||12345|05/24/2011|0|

MOCWPIMG|file|||localfile|0|d:\\mip1\\1\\grafik\\bde|MOC path for workplace

pictures||||12345|05/24/2011|0|

MOCLOGS|file|||localfile|0|d:\\mip1\\1\\prot|MOC path for system log files||||12345|05/24/2011|0|

MOCHRIMG|file|||localfile|0|d:\\mip1\\1\\grafik\\pze|MOC path for HR master data

pictures||||12345|05/24/2011|0|

MOCHRIF|file|||localfile|0|d:\\mip1\\1\\spool|MOC path for HR interfaces||||12345|05/24/2011|0|

MOCPROF|file|||localfile|0|d:\\mip1\\1\\profiles|MOC path for profiles||||12345|05/24/2011|0|

MOCHLS|file|||localfile|0|d:\\mip1\\1\\custom\\hls|simulation file storage

path||||12345|05/24/2011|0|

EFORMSTD|file|||localfile|0|d:\\mip1\\db_ace|path for external reports

(standard)||||12345|05/24/2011|0|

EFORMCUS|file|||localfile|0|d:\\mip1\\1\\custom\\caq\\reports|path for external reports

(customer)||||12345|05/24/2011|0|

PDVLAY|file|||localfile|0|d:\\mip1\\1\\custom|path for PDV layouts||||12345|05/24/2011|0|

MOCERRS|file|||localfile|0|d:\\mip1\\1\\err|MOC path for system error

files||||12345|05/24/2011|0|

MOCREP|file|||localfile|0|d:\\mip1\\1\\custom\\reports|MOC path for

reports||||12345|05/09/2012|0|

MOCMPARK|file|||localfile|0|d:\\mip1\\1\\custom\\mpark|Layouts for MOC

MPARK2||||12345|06/18/2013|0|

PSREPORT|file|||localfile|0|d:\\mip1\\1\\custom\\eReporting|eReport export

target||||PATCH|11/02/2017|0|

PSLLXML|file|||localfile|0|d:\\mip1\\1\\custom\\eReporting|eReport application configuration

||||PATCH|11/02/2017|0|

Note: The contents of your file hy_path.unl might differ from the examples above!

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 11 of 19

Reorganization Database for HYDRA MW4.0pe

If the data should be imported on another HYDRA server all entries for column P_HOST need to be

checked and changed if necessary, e.g.:

$COLUMNS$PATH|P_SCHEME|P_USER|P_PASSWORD|P_HOST|P_PORT|P_URL_PATH|BEM|PARAM_STR_01|PARAM_STR_02|P

ARAM_STR_03|BEARB|BEARB_DATE|BEARB_TIME|

DNC|file|||hydra|0|1\\dncdaten|sample path for DNC||||12345|07/27/2012|0|

DOC|file|||hydra|0|1\\custom\\bde\\dokumente|sample path for dokuments||||12345|07/27/2012|0|

HYDRA|file|||hydra|0|./1/grafik/bde|AIP path for workplace pictures||||12345|07/09/2013|0|

PDVARC|file||||0|./1/custom/archive/pdv2/tnt/|PDV export path||||12345|05/24/2011|0|

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 12 of 19

Reorganization Database for HYDRA MW4.0pe

Interface Configurations in the HYDRA Scheduler:

If there are interface configurations in the HYDRA Scheduler, e.g. to automatically transfer interface files

between HYDRA and ERP systems (HYD-ZHK), they need to be checked and changed if necessary.

In the export directory (e.g. mip1.exp) open the file hyd_scheduler.unl and change all appropriate settings,

e.g.:

$COLUMNS$VERWEIS|ENTRYTYPE|ENTRYOPT|INTERVAL|EXECUTE_FROM|EXECUTE_TO|FIX_HOUR|FIX_MINUTE|FIX_DAY|

FIX_MONTH|FIX_WEEKDAY|FIX_YEAR|COMMAND|DESCRIPTION|PRODUCTKEY|LICENSEKEYS|BEARB|BEARB_DATE|BEARB_

TIME|HYDRAUSER|BEGIN_DATE|BEGIN_TIME|END_DATE|END_TIME|ENTRY_ACTIVE|ENTRY_STATE|PID|SCHEDULER_ID|

...

20|I|CCV|3600|||||||||sh.exe

./hyd_zhk.scr

MOD=GET

LOCAL=./1/inf_int/interf/HY72PPS.DAT

REMOTE="\\\\\\\\\\\\\\\\server\\\\\\\\sharename\\\\\\\\path/filename"|HYD-ZHK

(SIS-MWV)

time

control

for

host

communication

via

network

share|HYD-ZHK|HYD-

ZHK|12345|04/05/2018|49851|0|04/05/2018|47943|04/05/2018|47949|N|NR||hysched.cfg|

21|I|CCV|3600|||||||||sh.exe

./hyd_zhk.scr

MOD=PUT

LOCAL=./1/inf_int/interf/HY72ADRCK_TIMETICKET.DAT

REMOTE="\\\\\\\\\\\\\\\\server\\\\\\\\sharename\\\\\\\\path/filename"|HYD-ZHK

(SIS-MWV)

time

control

for

host

communication

via

network

share|HYD-ZHK|HYD-

ZHK|12345|04/05/2018|49845|0|04/05/2018|47943|04/05/2018|47947|N|NR||hysched.cfg|

22|I|CCV|3600|||||||||sh.exe  ./hyd_zhk.scr  MOD=GET  HOST=server  USER=ftpuser  PWD=ftppasswd

LOCAL=./1/inf_int/interf/HY72PPS.DAT  REMOTE="/pfad/dateiname"|HYD-ZHK  (SIS-MWV)  time  control  for

host

communication

via

FTP|HYD-ZHK|HYD-

ZHK|12345|04/05/2018|49839|0|04/05/2018|47944|04/05/2018|47949|N|NR||hysched.cfg|

23|I|CCV|3600|||||||||sh.exe  ./hyd_zhk.scr  MOD=PUT  HOST=server  USER=ftpuser  PWD=ftppasswd

LOCAL=./1/inf_int/interf/HY72ADRCK_TIMETICKET.DAT REMOTE="/pfad/dateiname"|HYD-ZHK (SIS-MWV) time

control

for

host

communication

via

FTP|HYD-ZHK|HYD-

ZHK|12345|04/05/2018|49833|0|04/05/2018|48004|04/05/2018|48009|N|NR||hysched.cfg|

...

Note: The contents of your file hyd_scheduler.unl might differ from the examples above!

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 13 of 19

Reorganization Database for HYDRA MW4.0pe

5

Import Data

Before importing data it is recommended for ORACLE to deactivate the Archive-Log-Mode and for SQL

Server to change the Recovery Mode from "Full" to "Simple" if they are active.

Logon as user mipadm to the HYDRA server.

Open the environment for the desired HYDRA system:

Windows:

Command prompt, e.g. "MS-DOS MIP 1"

UNIX:

hysys.scr –X (e.g. hysys.scr -1)

Make sure you are located inside the matching HYDRA directory (HYDRADIR):

Windows:

e.g. d:\mip1

UNIX:

e.g. /u1/mip1

ATTENTION: Please make always sure that you are connected to the correct database instance and to

the correct database and that you are really accessing the desired database contents.

This applies especially for HYDRA multi system installations.

  Windows:

hysql.exe -r -

UNIX:

hysql.out -r -

  SQL Server:

determine database instance name:

SQL> select @@SERVERNAME;

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|0|128|HYDRASERVER\\MIPMS1|

determine database name:

SQL> select db_name();

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|0|128|mip1|

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 14 of 19

Reorganization Database for HYDRA MW4.0pe

  ORACLE:

determine database instance name:

SQL> select * from v$instance;

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|3|8|1|0|16|mip1|0|64|HYDRASERVER|0|17|11.2.0.2.0|7|4|06/14/201

1|0|12|OPEN|0|3|NO|3|8|1|0|7|STOPPED|0|15||0|10|ALLOWED|0|3|NO|0|17|ACT

IVE|0|18|PRIMARY_INSTANCE|0|9|NORMAL|0|3|NO|

determine database name:

SQL> select name from v$database;

OK. NR OF ROWS 1.

RESULT:

|0|0|1|0|0|9|MIP1|

As soon as you made sure you are connected to the right database, please proceed as follows:

Please make sure that all HYDRA services (Windows) or processes (UNIX) are shut down.

Make sure that the exported data from chapter “2 Export Data” (mip1.exp or mipX.exp) is available in your

HYDRADIR and the database contents are deleted as described in chapter “3 Delete Data”.

Now you can import the data using the following command:

Windows:

hyimport.exe mip(X)

UNIX:

hyimport.out mip(X)

Check that no errors occurred during the data import.

Possible error messages are stored in the file hyimport.err in:

Windows:

%HYDRADIR%\X\err

(e.g. d:\mip1\1\err)

UNIX:

$HYDRADIR/X/err

(e.g. /u1/mip1/1/err)

(X = HYDRA system number)

If you want to perform an import from any other directory than HYDRADIR you have to create subdirectories

"X/err" in that directory first to be able to log possible errors (X = HYDRA system number), e.g.:

Windows:

d:\export\X\err

UNIX:

/u1/export/X/err

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 15 of 19

Reorganization Database for HYDRA MW4.0pe

After a successful data import update the database statistics for the HYDRA database.

Therefor use the following commands:

Windows:

hysql.exe -r -

UNIX:

hysql.out -r -

15.06.2011 14:25:06 PROCESSING STDIN...

SQL> update statistics;

It must return something like this:

OK. NR OF ROWS 1234.

RESULT:

|0|0|0|0|

SQL> exit

Make sure to reactivate the Archive-Log-Mode (ORACLE) or the Recovery Mode "Full" (SQL Server) if it

was active before.

Check that the imported data is correctly distributed to the available tablespaces of the HYDRA database

by using the following command:

Windows:

hydbsize.exe

UNIX:

hydbsize.out

If  the  above  mentioned  procedures  were  used  to  duplicate  a  HYDRA  system  then  you  might  need  to

perform additional steps now as described in the MPDV manual "Change_Hostname_MW40_Server.pdf".

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 16 of 19

Reorganization Database for HYDRA MW4.0pe

Before starting HYDRA it is absolutely necessary to check the HYDRA path configurations and make sure

they apply to your HYDRA system and to your HYDRA server.

You can use menu “System administration – Path configuration” of the HYDRA Maintenance Manager for

that purpose:

Before you start HYDRA again make absolutely sure that there are no mutual interactions and no

possible conflicts regarding the MLE interface to ERP and PPS systems like SAP because of using

identical database contents in different HYDRA systems.

As soon as all necessary procedures are finished you can start your HYDRA application again.

Make sure that your HYDRA system runs properly.

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 17 of 19

Reorganization Database for HYDRA MW4.0pe

6  Activating Licenses

Every HYDRA MW4.0pe system need to have a unique Installation-ID assigned and appropriate license

keys installed.

Without activating the licenses you can use a HYDRA system for 30 days.

All licenses not activated within that period will become invalid.

If data was copied from an existing HYDRA system to a different HYDRA system you need to replace the

Installation-ID and the license keys with the ones intended for the new HYDRA system.

Logon to the HYDRA server as local user “mipadm”.

Open the environment for the HYDRA system you want to work in.

e.g. start the command prompt "MS-DOS MIP 1"

Make sure you are located in the HYDRA installation directory (HYDRADIR), e.g.:

cd d:\mip1

Connect to the database and delete the old license keys:

hysql.exe -r -

SQL> delete from hyd_license;

SQL> delete from hyd_license_status;

SQL> exit

Set the new Installation-ID (see first line of the new license file):

hyliz.exe -k <Installation-ID>

When copying data from an existing system the system number has already been set and this command

will not change it. You have to do it manually by using the HYDRA MOC Client later.

Copy the new license file to HYDRADIR of the new HYDRA system and load them into the database, e.g.:

hyliz.exe -f lizenz.dat > lizenz.pro

Check file lizenz.pro and make sure that every license was loaded successfully (“Inserting successful”).

After  that  you  might  need  to  request  a  new  activation  file  from  MPDVs  Customer  Service  Center

(CustomerServiceCenter@mpdv.com) before you can use that new HYDRA system permanently.

For more details see the MPDV manual “HYDRA_LicenseSetup.pdf”.

Please  contact  MPDVs  Customer  Service  Center  (CustomerServiceCenter@mpdv.com)  if  you  need

support requesting a new activation file or activating your HYDRA licenses.

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 18 of 19

Reorganization Database for HYDRA MW4.0pe

Reorganization_DB_MW40.docx

Version: 1.0.23049

Page 19 of 19


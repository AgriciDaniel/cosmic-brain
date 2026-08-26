|     |     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --- | --------------------------------- | --- |

1  Time-Controlled Host Interfacing
Usage
You use the time-controlled host interfacing in order to transfer files from other systems (e.g. ERP
systems) to the HYDRA server on a cyclical basis (time-controlled) or in order to transfer files from the
HYDRA server to other systems using HYDRA Scheduler.
The different interface files are each processed, or rather made available, on the HYDRA server by the
HYDRA MLE file port interface.
Here, the system supports the following transmission type and operating system combinations:
|     |     |     |     | HYDRA server  |     |
| --- | --- | --- | --- | ------------- | --- |
Linux  Windows
|     |     |     | FTP, NFS  | FTP  |     |
| --- | --- | --- | --------- | ---- | --- |
UNIX
|     |     | Windows  | FTP  | FTP, UNC  |     |
| --- | --- | -------- | ---- | --------- | --- |
External system
|     |     | Other (e.g. AS/400)  | FTP  | FTP  |     |
| --- | --- | -------------------- | ---- | ---- | --- |

| MBL_File-Transfer.docx  |     |     | Version: 1.1  |     | Page 1 of 17  |
| ----------------------- | --- | --- | ------------- | --- | ------------- |

Time-Controlled Host Interfacing
Requirement
To use the time-controlled host interfacing, the requirements listed below must be met:
Transfer protocol
In order to exchange data with an external system, it must be possible to access it via FTP (Port
21). If both systems run on identical operating systems, alternately you can also make use of the
following solutions:
UNIXUNIX: Specify the path on the mounted NFS share (Network File System)
WindowsWindows Specify UNC path (Universal Naming Convention) on a network share
Access authorization for NFS connections
The external system's NFS share must be installed on the HYDRA server.
HYDRA (user "hydadm") requires read and write access rights to the installed directory in order
to be able to rename, copy and delete files there.
Access authorization for UNC connections
HYDRA (user "hydadm") requires read and write access rights to the network share in order to
be able to rename, copy and delete files there.
To test the access rights to the network share via the specified UNC path, log onto the HYDRA
server as user "hydadm" and enter the following command in a Windows command prompt:
"dir \\ServerName\FreigabeName"
The content of the network share "ShareName" must be displayed without any errors.
MBL_File-Transfer.docx Version: 1.1 Page 2 of 17

|     |     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --- | --------------------------------- | --- |

User account of the "HYDRA<n> Scheduler" service
Exchanging data by specifying a path for a Windows - Windows connection requires that the
| "HYDRA<n> Scheduler" service is run as the user "hydadm".  |     |     |     |     |     |
| ---------------------------------------------------------- | --- | --- | --- | --- | --- |

The user "hydadm" on the HYDRA server must be able to access the shares on the external
system, which requires that he has the relevant access rights.
FTP command needed for an FTP connection
"open", "login": USER, PASS
| "binary": TYPE I  |     | (only "ASCII" is possible on AS/400)  |     |     |     |
| ----------------- | --- | ------------------------------------- | --- | --- | --- |
"rename": RNFR, RNTO
"Is": LIST
"delete": DELE
"put": STOR
"get": RETR
"cd": CWD
"close": QUIT
"r(emote)help": HELP
| "quote time":   |     | (AS/400: increase inactivity timeout)  |     |     |     |
| --------------- | --- | -------------------------------------- | --- | --- | --- |

| MBL_File-Transfer.docx  |     | Version: 1.1  |     |     | Page 3 of 17  |
| ----------------------- | --- | ------------- | --- | --- | ------------- |

|     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --------------------------------- | --- |

FTP interfacing causes problems on various HP-UX systems if the clear text name of the PPS
server is being used. At this time, the problem can only be avoided by using the IP address .

The FTP server version 1.7.212.1 on HP-UX 10.20.x is faulty and therefore cannot be used.
  The currently available and tested version for this platform is 1.7.212.5.

| MBL_File-Transfer.docx  |     | Version: 1.1  |     | Page 4 of 17  |
| ----------------------- | --- | ------------- | --- | ------------- |

|     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --------------------------------- | --- |

Data exchange process - external system  HYDRA

| MBL_File-Transfer.docx  |     | Version: 1.1  |     | Page 5 of 17  |
| ----------------------- | --- | ------------- | --- | ------------- |

Time-Controlled Host Interfacing
Data exchange process - HYDRA  external system
Available program parameters
Parameter Use/ possible entries
r al P al
nl
y f o
F
T P
p
ti o n
o r
F T
p
ti o n
o Of O
MBL_File-Transfer.docx Version: 1.1 Page 6 of 17

|     |     |     |     |     |     | Time-Controlled Host Interfacing  |     |     |     |
| --- | --- | --- | --- | --- | --- | --------------------------------- | --- | --- | --- |

| Parameter  |     | Use/ possible entries  |     |     |     |     |     | al  P |     |
| ---------- | --- | ---------------------- | --- | --- | --- | --- | --- | ----- | --- |
|            |     |                        |     |     |     |     |     | r     | al  |
|            |     |                        |     |     |     |     |     | o   n | n   |
f P T
|              |     |                                         |     |     |     |     |     | y  T o F   | o   |
| ------------ | --- | --------------------------------------- | --- | --- | --- | --- | --- | ---------- | --- |
|              |     |                                         |     |     |     |     |     | nl F ti r  | ti  |
|              |     |                                         |     |     |     |     |     | p o        | p   |
|              |     |                                         |     |     |     |     |     | o Of       | O   |
| MOD=PUT|GET  |     | Defines the direction of communication  |     |     |     |     |     |            |     |
PUT  HYDRA  external system
GET  External system  HYDRA
| HOST=    |     | Host name of the external system  |     |     |     |     |     | X    |     |
| -------- | --- | --------------------------------- | --- | --- | --- | --- | --- | ---- | --- |
| USER=    |     | User name used to log on          |     |     |     |     |     | X    |     |
| PWD=     |     | User's password                   |     |     |     |     |     | X    |     |
| REMOTE=  |     | File name on the external system  |     |     |     |     |     |      |     |
REMOTEMASK=  Alternately, the remote system file that is defined
via the REMOTE parameter can be created so
|     |     | that  | it  is  | formatted  | as  | specified  | in  the  |     |     |
| --- | --- | ----- | ------- | ---------- | --- | ---------- | -------- | --- | --- |
REMOTEMASK parameter.
|     |     | The  | following  | options  |     | are  available  | for  |     |     |
| --- | --- | ---- | ---------- | -------- | --- | --------------- | ---- | --- | --- |
formatting.
| LOCAL=  |     | File name on the HYDRA system  |     |     |     |     |     |     |     |
| ------- | --- | ------------------------------ | --- | --- | --- | --- | --- | --- | --- |
LOCALMASK=  Alternately, the local file that is defined via the
LOCAL parameter can be created so that it is
|     |     | formatted  | as  | specified  | in  | the  LOCALMASK  |     |     |     |
| --- | --- | ---------- | --- | ---------- | --- | --------------- | --- | --- | --- |
parameter.
|     |     | The  | following  | options  |     | are  available  | for  |     |     |
| --- | --- | ---- | ---------- | -------- | --- | --------------- | ---- | --- | --- |
formatting.
TMP=  File  name  of  the  temporary  file  (both  for  the    X
remote as well as for the local server)
|     |     | If  the    | external  | system  | runs             | on  | an  AS/400  |     |     |
| --- | --- | ---------- | --------- | ------- | ---------------- | --- | ----------- | --- | --- |
|     |     | operating  | system,   |         | this  parameter  |     | must  be    |     |     |
specified.

| MBL_File-Transfer.docx  |     |     | Version: 1.1  |     |     |     |     | Page 7 of 17  |     |
| ----------------------- | --- | --- | ------------- | --- | --- | --- | --- | ------------- | --- |

|     |     |     |     | Time-Controlled Host Interfacing  |     |     |
| --- | --- | --- | --- | --------------------------------- | --- | --- |

| Parameter  |     | Use/ possible entries  |     |     | al  P |     |
| ---------- | --- | ---------------------- | --- | --- | ----- | --- |
|            |     |                        |     |     | r     | al  |
|            |     |                        |     |     | o   n | n   |
f P T
|             |     |                    |     |     | y  T o  | F o   |
| ----------- | --- | ------------------ | --- | --- | ------- | ----- |
|             |     |                    |     |     | nl F ti | r  ti |
|             |     |                    |     |     | p       | o p   |
|             |     |                    |     |     | o Of    | O     |
| FTPMOD=B|A  |     | FTP transfer mode  |     |     |   X     |       |
B  Binary (default)
A  ASCII
|     |     | If  the  external  | system  | runs  on  an  AS/400  |     |     |
| --- | --- | ------------------ | ------- | --------------------- | --- | --- |
operating system, "A" must be used.
| CMD=  |     | Shell script on the local server that starts  |     |     |     | X   |
| ----- | --- | --------------------------------------------- | --- | --- | --- | --- |
in "GET" mode after the file transfer
in "PUT" mode before the file transfer
.
|     |     | If the CMD specification  |     | contains spaces, the  |     |     |
| --- | --- | ------------------------- | --- | --------------------- | --- | --- |
CMD must be enclosed within quotation marks!
Example: CMD="sh.exe hy6adrck.scr"
| ALARM=  |     | Time out  |     |     |     |     |
| ------- | --- | --------- | --- | --- | --- | --- |
Communication is interrupted after the defined
time (in seconds) (only in Windows) .

Configuration – Ext. System (Windows)  HYDRA (Windows) via UNC
Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as
an example):
| Parameter name      |     | Value                  |     |     |     |     |
| ------------------- | --- | ---------------------- | --- | --- | --- | --- |
| Product key         |     | SIS-MWV                |     |     |     |     |
| License key         |     | SIS-MWV                |     |     |     |     |
| Command (Windows):  |     | sh.exe ./hyd_zhk.scr   |     |     |     |     |
MOD=GET

| MBL_File-Transfer.docx  |     | Version: 1.1  |     |     | Page 8 of 17  |     |
| ----------------------- | --- | ------------- | --- | --- | ------------- | --- |

|     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --------------------------------- | --- |

| Parameter name  |     | Value  |     |     |
| --------------- | --- | ------ | --- | --- |
LOCAL=./inf_int/interf/HY72PPS.dat
REMOTE="\\\\\\\\server\\\\freigabe\\\\pfad/dateiname"
| Comment:  |     | Data supply ERP  HYDRA  |     |     |
| --------- | --- | ------------------------ | --- | --- |
| Interval  |     | 5                        |     |     |

Configuration – Ext. System (UNIX)  HYDRA (Linux) via NFS
Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as
an example):
| Parameter name      |     | Value                  |     |     |
| ------------------- | --- | ---------------------- | --- | --- |
| Product key         |     | SIS-MWV                |     |     |
| License key         |     | SIS-MWV                |     |     |
| Command (Windows):  |     | sh.exe ./hyd_zhk.scr   |     |     |
MOD=GET
LOCAL=./inf_int/interf/HY72PPS.dat
REMOTE="\\\\\\\\server\\\\freigabe\\\\pfad/dateiname"
| Comment:  |     | Data supply ERP  HYDRA  |     |     |
| --------- | --- | ------------------------ | --- | --- |
| Interval  |     | 5                        |     |     |

Configuration – Ext. System (UNIX)  HYDRA (Linux) via FTP
Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as
an example):
| Parameter name  |     | Value    |     |     |
| --------------- | --- | -------- | --- | --- |
| Product key     |     | SIS-MWV  |     |     |
| License key     |     | SIS-MWV  |     |     |

| MBL_File-Transfer.docx  |     | Version: 1.1  |     | Page 9 of 17  |
| ----------------------- | --- | ------------- | --- | ------------- |

|     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --------------------------------- | --- |

| Parameter name      |     | Value                  |     |     |
| ------------------- | --- | ---------------------- | --- | --- |
| Command (Windows):  |     | sh.exe ./hyd_zhk.scr   |     |     |
|                     |     | MOD=GET                |     |     |
|                     |     | HOST=<server>          |     |     |
|                     |     | USER=<ftpuser>         |     |     |
|                     |     | PWD=<ftppasswd>        |     |     |
LOCAL=./inf_int/interf/HY72PPS.dat
REMOTE="/pfad/dateiname"
| Comment:  |     | Data supply ERP  HYDRA  |     |     |
| --------- | --- | ------------------------ | --- | --- |
| Interval  |     | 5                        |     |     |

Configuration – Ext. System (AS/400)  HYDRA (Windows) via FTP
Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as
an example):
| Parameter name      |     | Value                  |     |     |
| ------------------- | --- | ---------------------- | --- | --- |
| Product key         |     | SIS-MWV                |     |     |
| License key         |     | SIS-MWV                |     |     |
| Command (Windows):  |     | sh.exe ./hyd_zhk.scr   |     |     |
|                     |     | MOD=GET                |     |     |
|                     |     | HOST=<server>          |     |     |
|                     |     | USER=<ftpuser>         |     |     |
|                     |     | PWD=<ftppasswd>        |     |     |
LOCAL=./inf_int/interf/HY72PPS.dat
|     |     | REMOTE="/pfad/dateiname"  |     |     |
| --- | --- | ------------------------- | --- | --- |
|     |     | FTPMODE=A                 |     |     |
TMP=tmp_hy72pps.dat
| Comment:  |     | Data supply ERP  HYDRA  |     |     |
| --------- | --- | ------------------------ | --- | --- |
| Interval  |     | 5                        |     |     |

| MBL_File-Transfer.docx  |     | Version: 1.1  |     | Page 10 of 17  |
| ----------------------- | --- | ------------- | --- | -------------- |

|     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --------------------------------- | --- |

The temporary intermediate file must not have the extension .tmp, otherwise the datasets will
be abbreviated!

If AS/400 is configured to use periods in file names, only "members" of a file are deleted during
deletions via FTP, not the entire file. For this reason, in order for a process flow to run correctly,

you will need to coordinate additional file handling measures with MPDV.

Configuration – Ext. System (Linux)  HYDRA (Windows) via FTP
Edit entries for the HYDRA inbound processing in HYDRA Scheduler (using the EIS-ERP interface as an
example):
| Parameter name      |     | Value                  |     |     |
| ------------------- | --- | ---------------------- | --- | --- |
| Product key         |     | SIS-MWV                |     |     |
| License key         |     | SIS-MWV                |     |     |
| Command (Windows):  |     | sh.exe ./hyd_zhk.scr   |     |     |
|                     |     | MOD=GET                |     |     |
|                     |     | HOST=<server>          |     |     |
|                     |     | USER=<ftpuser>         |     |     |
|                     |     | PWD=<ftppasswd>        |     |     |
LOCAL=./inf_int/interf/HY72PPS.dat
REMOTE="/pfad/dateiname"
| Comment:  |     | Data supply ERP  HYDRA  |     |     |
| --------- | --- | ------------------------ | --- | --- |
| Interval  |     | 5                        |     |     |

Configuration – Ext. System (AS/400)  HYDRA (Linux) via FTP
Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as
an example):
| Parameter name  |     | Value    |     |     |
| --------------- | --- | -------- | --- | --- |
| Product key     |     | SIS-MWV  |     |     |

| MBL_File-Transfer.docx  |     | Version: 1.1  |     | Page 11 of 17  |
| ----------------------- | --- | ------------- | --- | -------------- |

|     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --------------------------------- | --- |

| Parameter name  |     | Value    |     |     |
| --------------- | --- | -------- | --- | --- |
| License key     |     | SIS-MWV  |     |     |
Command (Windows):
|     |     | ./hyd_zhk.scr     |     |     |
| --- | --- | ----------------- | --- | --- |
|     |     | MOD=GET           |     |     |
|     |     | HOST=<server>     |     |     |
|     |     | USER=<ftpuser>    |     |     |
|     |     | PWD=<ftppasswd>   |     |     |
LOCAL=./inf_int/interf/HY72PPS.dat
|     |     | REMOTE="/pfad/dateiname"  |     |     |
| --- | --- | ------------------------- | --- | --- |
|     |     | FTPMODE=A                 |     |     |
TMP=tmp_hy72pps.dat
| Comment:  |     | Data supply ERP  HYDRA  |     |     |
| --------- | --- | ------------------------ | --- | --- |
| Interval  |     | 5                        |     |     |

The temporary intermediate file must not have the extension .tmp, otherwise the datasets will
|     | be abbreviated!  |     |     |     |
| --- | ---------------- | --- | --- | --- |
If AS/400 is configured to use periods in file names, only "members" of a file are deleted during
deletions via FTP, not the entire file. For this reason, in order for a process flow to run correctly,

you will need to coordinate additional file handling measures with MPDV.

Configuration – HYDRA (Windows)  Ext. System (Windows) via UNC
Edit entries for the HYDRA output batch processing in HYDRA Scheduler (using the EIS-ERP interface
as an example):
| Parameter name      |     | Value                  |     |     |
| ------------------- | --- | ---------------------- | --- | --- |
| Product key         |     | SIS-MWV                |     |     |
| License key         |     | SIS-MWV                |     |     |
| Command (Windows):  |     | sh.exe ./hyd_zhk.scr   |     |     |
MOD=PUT
|     |     | LOCAL=./inf_int/interf/HY72ADRCK_TT.dat  |     |     |
| --- | --- | ---------------------------------------- | --- | --- |

| MBL_File-Transfer.docx  |     | Version: 1.1  |     | Page 12 of 17  |
| ----------------------- | --- | ------------- | --- | -------------- |

|     |     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --- | --------------------------------- | --- |

| Parameter name  |     | Value  |     |     |     |
| --------------- | --- | ------ | --- | --- | --- |
REMOTE="\\\\\\\\server\\\\freigabe\\\\pfad/dateiname"
| Comment:  |     | Data supply HYDRA  ERP  |     |     |     |
| --------- | --- | ------------------------ | --- | --- | --- |
| Interval  |     | 5                        |     |     |     |

Configuration –HYDRA (Linux)  Ext. System (UNIX) via NFS
Edit entries for the HYDRA output batch processing in HYDRA Scheduler (using the EIS-ERP interface
as an example):
| Parameter name      |     | Value           |     |     |     |
| ------------------- | --- | --------------- | --- | --- | --- |
| Product key         |     | SIS-MWV         |     |     |     |
| License key         |     | SIS-MWV         |     |     |     |
| Command (Windows):  |     | ./hyd_zhk.scr   |     |     |     |
MOD=PUT
|     |     | LOCAL=./inf_int/interf/HY72ADRCK_TT.dat  |     |     |     |
| --- | --- | ---------------------------------------- | --- | --- | --- |
REMOTE="\\\\\\\\server\\\\freigabe\\\\pfad/dateiname"
| Comment:  |     | Data supply HYDRA  ERP  |     |     |     |
| --------- | --- | ------------------------ | --- | --- | --- |
| Interval  |     | 5                        |     |     |     |

Configuration –HYDRA (Linux)  Ext. System (UNIX) via FTP
Edit entries for the HYDRA output batch processing in HYDRA Scheduler (using the EIS-ERP interface
as an example):
| Parameter name      |     | Value           |     |     |     |
| ------------------- | --- | --------------- | --- | --- | --- |
| Product key         |     | SIS-MWV         |     |     |     |
| License key         |     | SIS-MWV         |     |     |     |
| Command (Windows):  |     | ./hyd_zhk.scr   |     |     |     |
|                     |     | MOD=PUT         |     |     |     |

| MBL_File-Transfer.docx  |     | Version: 1.1  |     |     | Page 13 of 17  |
| ----------------------- | --- | ------------- | --- | --- | -------------- |

|     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --------------------------------- | --- |

| Parameter name  |     | Value                                     |     |     |
| --------------- | --- | ----------------------------------------- | --- | --- |
|                 |     | HOST=<server>                             |     |     |
|                 |     | USER=<ftpuser>                            |     |     |
|                 |     | PWD=<ftppasswd>                           |     |     |
|                 |     | LOCAL=./inf_int/interf/HY72ADRCK_TT.dat   |     |     |
REMOTE="/pfad/dateiname"
| Comment:  |     | Data supply HYDRA  ERP  |     |     |
| --------- | --- | ------------------------ | --- | --- |
| Interval  |     | 5                        |     |     |

Configuration –HYDRA (Windows)  Ext. System (AS/400) via FTP
Edit entries for the HYDRA output batch processing in HYDRA Scheduler (using the EIS-ERP interface
as an example):
| Parameter name      |     | Value                                     |     |     |
| ------------------- | --- | ----------------------------------------- | --- | --- |
| Product key         |     | SIS-MWV                                   |     |     |
| License key         |     | SIS-MWV                                   |     |     |
| Command (Windows):  |     | sh.exe ./hyd_zhk.scr                      |     |     |
|                     |     | MOD=PUT                                   |     |     |
|                     |     | HOST=<server>                             |     |     |
|                     |     | USER=<ftpuser>                            |     |     |
|                     |     | PWD=<ftppasswd>                           |     |     |
|                     |     | LOCAL=./inf_int/interf/HY72ADRCK_TT.dat   |     |     |
|                     |     | REMOTE="/pfad/dateiname"                  |     |     |
|                     |     | FTPMODE=A                                 |     |     |
TMP=tmp_HY72ADRCK_TT.dat
| Comment:  |     | Data supply HYDRA  ERP  |     |     |
| --------- | --- | ------------------------ | --- | --- |
| Interval  |     | 5                        |     |     |

| MBL_File-Transfer.docx  |     | Version: 1.1  |     | Page 14 of 17  |
| ----------------------- | --- | ------------- | --- | -------------- |

|     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --------------------------------- | --- |

The temporary intermediate file must not have the extension .tmp, otherwise the datasets will
be abbreviated!

If AS/400 is configured to use periods in file names, only "members" of a file are deleted during
deletions via FTP, not the entire file. For this reason, in order for a process flow to run correctly,

you will need to coordinate additional file handling measures with MPDV.

Configuration –HYDRA (Windows)  Ext. System (Linux) via FTP
Edit entries for HYDRA outbound processing in HYDRA Scheduler (using the EIS-ERP interface as an
example):
| Parameter name      |     | Value                                     |     |     |
| ------------------- | --- | ----------------------------------------- | --- | --- |
| Product key         |     | SIS-MWV                                   |     |     |
| License key         |     | SIS-MWV                                   |     |     |
| Command (Windows):  |     | sh.exe ./hyd_zhk.scr                      |     |     |
|                     |     | MOD=PUT                                   |     |     |
|                     |     | HOST=<server>                             |     |     |
|                     |     | USER=<ftpuser>                            |     |     |
|                     |     | PWD=<ftppasswd>                           |     |     |
|                     |     | LOCAL=./inf_int/interf/HY72ADRCK_TT.dat   |     |     |
REMOTE="/pfad/dateiname"
| Comment:  |     | Data supply HYDRA  ERP  |     |     |
| --------- | --- | ------------------------ | --- | --- |
| Interval  |     | 5                        |     |     |

Configuration – HYDRA (Linux)  Ext. System (AS/400) via FTP
Edit entries for the HYDRA output batch processing in HYDRA Scheduler (using the EIS-ERP interface
as an example):
| Parameter name  |     | Value    |     |     |
| --------------- | --- | -------- | --- | --- |
| Product key     |     | SIS-MWV  |     |     |

| MBL_File-Transfer.docx  |     | Version: 1.1  |     | Page 15 of 17  |
| ----------------------- | --- | ------------- | --- | -------------- |

|     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --------------------------------- | --- |

| Parameter name  | Value    |     |     |     |
| --------------- | -------- | --- | --- | --- |
| License key     | SIS-MWV  |     |     |     |
Command (Windows):
./hyd_zhk.scr
MOD=PUT
|     | HOST=<server>                             |     |     |     |
| --- | ----------------------------------------- | --- | --- | --- |
|     | USER=<ftpuser>                            |     |     |     |
|     | PWD=<ftppasswd>                           |     |     |     |
|     | LOCAL=./inf_int/interf/HY72ADRCK_TT.dat   |     |     |     |
|     | REMOTE="/pfad/dateiname"                  |     |     |     |
FTPMODE=A
TMP=tmp_HY72ADRCK_TT.dat
| Comment:  | Data supply HYDRA  ERP  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
| Interval  | 5                        |     |     |     |

The temporary intermediate file must not have the extension .tmp, otherwise the datasets will
|     | be abbreviated!  |     |     |     |
| --- | ---------------- | --- | --- | --- |
If AS/400 is configured to use periods in file names, only "members" of a file are deleted during
deletions via FTP, not the entire file. For this reason, in order for a process flow to run correctly,

you will need to coordinate additional file handling measures with MPDV.

Options for REMOTEMASK/ LOCALMASK
| Format Code  | Meaning                                          |     |     |     |
| ------------ | ------------------------------------------------ | --- | --- | --- |
| %a           | Abbreviated weekday name                         |     |     |     |
| %A           | Full weekday name                                |     |     |     |
| %b           | Abbreviated name of a month                      |     |     |     |
| %B           | Full name of a month                             |     |     |     |
| %c           | Date and time display matching local settings    |     |     |     |
| %d           | Day of the month as a decimal number (01 - 31)   |     |     |     |
| %H           | Hour in a 24-hour format (00 - 23)               |     |     |     |
| %I           | Hour in a 12-hour format (01 - 12)               |     |     |     |
| %j           | Day of the year as a decimal number (001 - 366)  |     |     |     |
| %m           | Month as a decimal number (01 - 12)              |     |     |     |
| %M           | Minute as a decimal number (00 - 59)             |     |     |     |
| %p           | Display of A.M. or P.M. for the 12-hour format   |     |     |     |
| %S           | Second as a decimal number (00 - 59)             |     |     |     |

| MBL_File-Transfer.docx  |     | Version: 1.1  |     | Page 16 of 17  |
| ----------------------- | --- | ------------- | --- | -------------- |

|     |     |     |     | Time-Controlled Host Interfacing  |     |
| --- | --- | --- | --- | --------------------------------- | --- |

| Format Code  | Meaning  |     |     |     |     |
| ------------ | -------- | --- | --- | --- | --- |
%U  Week of the year as a decimal number, whereas Sunday is the first day of the week (00
- 53)
| %w  | Weekday as a decimal no. (0 - 6; Sunday is 0)  |     |     |     |     |
| --- | ---------------------------------------------- | --- | --- | --- | --- |
%W  Week of the year as a decimal number, whereas Monday is the first day of the week (00
- 53)
| %x  | Date display for local settings  |     |     |     |     |
| --- | -------------------------------- | --- | --- | --- | --- |
| %X  | Time display for local settings  |     |     |     |     |
%y  Year not including century as a decimal number (00 - 99)
| %Y  | Year including century as a decimal number  |     |     |     |     |
| --- | ------------------------------------------- | --- | --- | --- | --- |
%z, %Z  Time zone name or abbreviation; no output if time zone is unknown
| %%  | Percentage  |     |     |     |     |
| --- | ----------- | --- | --- | --- | --- |

The # flag may prefix any formatting code. In that case, the meaning of the format code is changed as
follows.
The # flag may prefix any formatting code. In that case, the meaning of the format code is changed as
follows.
| Format Code  |             |             | Meaning             |     |     |
| ------------ | ----------- | ----------- | ------------------- | --- | --- |
| %#a,  %#A,   | %#b,  %#B,  | %#p,  %#X,  | # flag is ignored.  |     |     |
%#z, %#Z, %#%

%#c  Long  date  and  time  display  matching  local  settings  For
example: "Tuesday, March 14, 1995, 12.41: 29".

%#x  Long  date  display  matching  local  settings  For  example:
"Tuesday, March 14, 1995".

| %#d,  %#H,  | %#I,  %#j,  | %#m,  %#M,  | Remove leading zeros (if any).  |     |     |
| ----------- | ----------- | ----------- | ------------------------------- | --- | --- |
%#S, %#U, %#w, %#W, %#y, %#Y

| MBL_File-Transfer.docx  |     |     | Version: 1.1  |     | Page 17 of 17  |
| ----------------------- | --- | --- | ------------- | --- | -------------- |
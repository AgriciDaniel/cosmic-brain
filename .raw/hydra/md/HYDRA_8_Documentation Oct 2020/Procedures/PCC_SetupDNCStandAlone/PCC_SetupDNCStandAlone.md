PCC Configuration DNC Stand-alone

1  PCC Configuration DNC Stand-alone

1.1  Usage

You  use  DNC  as  a  stand-alone  solution  in  PCC  in  order  to  perform  uploads  and  downloads  of  DNC

programs directly on the machine without any AIP terminal functions.

The PCC configuration (pcc.exe) as well as the file driver configuration (dnc_dr_01.dll), which exchanges

files in PCC-DIF format with the machine, are described below.

The following versions are the minimum requirement:

Minimum version

7.2.2.79

7.2.2.12

7.2.1.1

7.2.1.1

Program

pcc.exe

pccdll.dll

dncb.dll

dnc_dr_01.dll

1.2  Configuration

1.2.1 PCC Configuration

File

INIT file

pcc.exe

pcc.ini

The  DLL  "pccDll.dll"  has  to  be  configured  as  BusDLL  in  PCC.  In  addition,  PCC  is  configured  as  stand-

alone  solution  with  specification  of  the  Hydra  server  and  port  as  well  as  the  PCC  terminal  number.

Communication with a terminal (gateway communication) must be deactivated. In the "BLADES" section,

the DNC blade "DNCB.DLL" must be configured. In the "FILTER" section, the commands RES_UPLOAD

and RES_DOWNL are indicated so that they may be processed in the DNC blade.

; pccdll.dll has to be configured as BusDll here
[DLL]
BusDLL=pccDll.dll

PCC_SetupDNCStandAlone.docx

Version: 1.0.21162

Page 1 of 8

PCC Configuration DNC Stand-alone

[SYSTEM]
SYSTRAY_TIME=2
ALIVE_SIGNAL=60
viewmode=2
RUNSTANDALONE=ON
AutoTerminate=20
;;parameters= --AlwaysReloadScript
TRANSMISSION_RETRIES=2
TRANSMISSION_FAILED=CONTINUE
QUEUESIZE=1000000
;TRANSMISSION_FAILED=STOP
NORMALQUEUECYCLE=1000
FASTQUEUECYCLE=1000

; Entry of server and user no. of PCC
[WSK]
; HOSTNAME OR IP-ADDRESS OF SERVER
Host=HYDRASSERVER
; PORT OF SERVER FOR CLIENT COMMUNICATION
; 1. SYSTEM 10000
Port=10000
; UNIQUE USR ID (TERMINAL ID)
User=9

[GateWay-Communication]
; GATEWAY SHOULD BE DEACTIVED WHEN PCC IS RUNNING STANDALONE
Active=false
;Port=9003

[Tracing]
; 5 FOR TESTING ENVIRONMENT
; 0 FOR PRODUCTIVE ENVIRONMENT
TraceLevel=5

[Server-Communication]
; COMMUNICATION WITH SERVER VIA EVCOM
; NECESSERY FOR SENDING INFORMATION  FROM SERVER TO CLIENT
; MUST BE ACTICE (= 1) WHEN BEVERAGE SOLUTION
; PORTS MUST BE UNIQE WHEN MULTIPLE INSTANCES ON SAME PC ARE ACTIVE
Active=1
Port=9005

[blade_value_dncb]
;Refreshrate=10000
[blade_value_pdv]
TraceLevel=1
Refreshrate=50000

[BLADES]
; THESE BLADES HAVE TO BE LOADED
BLADE_1=.\blades\DNCB.DLL
;BLADE_2=.\blades\PDV.DLL
; Section for filtering which dialog data are sent to DNC blade

PCC_SetupDNCStandAlone.docx

Version: 1.0.21162

Page 2 of 8

PCC Configuration DNC Stand-alone

[FILTER]
; FILTER FOR BLADE [DNCB]
DNCB= RES_UPLOAD, RES_DOWNL

1.2.2 PCCDLL Configuration

File

INI file

pccdll.dll

pccdll.ini

The file driver dnc_dr_01.dll is activated in pccdll.ini as follows:

[SERVICE]
tracing=5
;DNC_BLOCKED_PDV=ON
DNC_TIMEOUT=240
DLL-VERSION=
Bypass_PDV=ON

[DRIVER_1]
driver=dnc_dr_01.dll

;[DRIVER_2]
;Next driver possible here)

;[DRIVER_3]
;Next driver possible here)

1.2.3 DNC Blade Configuration  (in PCC)

File

INI file

dncb.dll

No INI file is required for the DNC blade.

General information on the DNC blade

The DNC blade is located in the "Blades" directory which is found in the PCC application directory:

Example:

D:\pcc\blades\

pcc spool directory

D:\pcc\spool\

The DNC blade creates own directories in the application directory of PCC:

  The working directory for upload and download files

\pcc_dnc_dir\

is created in the installation directory.



If offline or in case of an error, it is not possible to transport files to the server.  For this reason,

these upload files are stored in the directory

\pcc_dnc_dir_offline\

under the installation directory.

PCC_SetupDNCStandAlone.docx

Version: 1.0.21162

Page 3 of 8

PCC Configuration DNC Stand-alone

The file name structure of a file in this directory is

xxxxxxxx-YYMMDD-hhmmss_Filename.Extension

and is composed of the following elements:

o  Machine number, 8 digits (if the machine has less digits, hyphens are prefixed (----xxxx)

o  Date and time

o  Original file name with file extension

The valid optional extension is used as the file extension.

1.2.4 File Driver Configuration

File

INIT file

dnc_dr_01.dll

dnc_dr_01.ini

The  file  driver  dnc_dr_01.dll  is  configured  in  dnc_dr_01.ini  as  follows.  The  meanings  of  the  tokens

(INTERPRETER_…)are defined in Section 1.4 "Use without Interpreter".

The following sections are contained in the INI file (dnc_dr_01.ini).

Example of an instance for machine 6125

[SERVICE]
info=
intervall=500
testmode=0
tracing=1
TraceLevel=5
ExecuteQueue=0
DNC_SETERROR=OFF
DNC_SETTIMEOUT=OFF
DNC_TRANSFERERROR=OFF
DNCPROTOKOLL=ON
; 1. Instanc Section
; For other machines, additional instances have to be created.
; Each instance is provided with an own designation.  [xxx], [yyy]
[DNC1]
;TIMEOUT-DELETE-DOWNLFILES=1
;CLR_AFTER_DOWNLOAD=OFF

; Use with interpreter
; Configuration for interpretation of function
; Path and file name of interpreter program
;INTERPRETER=D:\4711_interpreter\interpreter.exe

; Use without interpreter
INTERPRETER_ERRCODE_TOKEN=ERR
INTERPRETER_ERRTEXT_TOKEN=TEXT
INTERPRETER_DOWNLOAD_TOKEN=DNC-LOAD
INTERPRETER_PROG_TOKEN=PROGFILE
INTERPRETER_COMMENT_CHAR=;
; Waiting time in seconds until download file is written into upload/download
directory.
; This can be omitted in file transfer.

PCC_SetupDNCStandAlone.docx

Version: 1.0.21162

Page 4 of 8

PCC Configuration DNC Stand-alone

; If parameter is not set, the file is written immediately.
;DOWNLOAD_WAIT_PERIOD=10
; The upload file is stored on the server under the resource name.
;;INTERPRETER_FILENAME_AS_PROG=OFF
; This is only required if the DNC blade directory was changed,
; so that the driver knows the DNC blade directory.
;;DNC_BLADE_DIR=d:\pcc\pcc_dnc_dir\
;Upload Path
;If configured, this path is used as upload directory
;UPL-PATH_6125=d:\dnc_upl\
; Machine download and upload path; here, as an example for
; machine 6125, it is d:\dnc_dir\
D:DNC_6125=d:\dnc_dir\
; So that the driver scans the upload/download directory
; Parameter POLL must be set to 1.
POLL=1
; Parameter POLL_I=1000 means that every 1000 milliseconds
; the directory is polled.
POLL_I=1000

Please note:

-  All lines marked with a semicolon are defined as comment lines.

-  The DNC driver is located in the directory of the PCC and DNC blade.

1.3  Use with Interpreter

The interpreter (configured with the value INTERPRETER in the INI file of the file driver) is activated with

the following parameters

Parameter1

Parameter2

File name of file sent by the machine

File  name  of  file  into  which  the  interpreter  writes  the  command  to  be
executed

Both file names are transferred to the interpreter with the full path.

Configuration example

INTERPRETER=D:\4711_interpreter\interpreter.exe
D:DNC_6125=d:\dnc_dir\

The machine file is provided as test.prg in directory d:\dnc_dir\.

The interpreter is now activated as follows:

D:\4711_interpreter\interpreter.exe d:\dnc_dir\test.prg d:\dnc_dir\test.cmd

The interpreter writes the relevant DNC command in the command file (as PDM command).

-

In the case of a download command, the command DLG=RES_DOWNL is written in the

command file with specification of the resource (RES=...) to be loaded:

DLG=RES_DOWNL|RES=4521580105000|

PCC_SetupDNCStandAlone.docx

Version: 1.0.21162

Page 5 of 8

PCC Configuration DNC Stand-alone

-

In the case of an upload command, the command DLG=RES_UPLOAD is written in the

command file with specification of the resource (RES=...) to be modified or created:

DLG=RES_UPLOAD|RES=4521580105000|

1.4  Use without Interpreter

1.4.1 Structure of DNC Upload File

To enable the internal interpreter to recognize an upload request, the following tokens have to

be configured:

Configuration

Description

INTERPRETER_COMMENT_CHAR=;

Semicolon is defined as comment character here

INTERPRETER_PROG_TOKEN=PROGFILE

Defines  the  resource  designation  under  which  the
DNC upload file is assigned on the server.

An upload file has to include the specification of the resource in the header.

Example:

;PROGFILE=20130204
…Programmcode…
…Programmcode…
…Programmcode…

If,  however,  no  resource  is  indicated  in  the  file,  the  DNC  blade  will  automatically  create  a

resource with a designation (max. 20 digits) derived from the machine number (8 digits) and the

time stamp. The format of the resource designation is as follows:

xxxxxxxxYYMMDDhhmmss.

If the machine number has less than 8 digits, the machine number is prefixed with hyphens.

Example:

----4711130204161000

Upload of machine 4711 on 2/4/2013 at 4:10:00 PM.

1.4.2 Structure of DNC Download File Request

To enable the internal interpreter to recognize a download request, the following tokens have to

be configured:

Configuration

Description

INTERPRETER_COMMENT_CHAR=;

Semicolon is defined as comment character here

INTERPRETER_PROG_TOKEN=PROGFILE

Defines  the  resource  designation  under  which  the

PCC_SetupDNCStandAlone.docx

Version: 1.0.21162

Page 6 of 8

PCC Configuration DNC Stand-alone

INTERPRETER_DOWNLOAD_TOKEN=DNC-
LOAD

Defines  the  identification  for  a  DNC  download
command.

DNC upload file is assigned on the server.

A download file has to include the specification of the resource and the download token in the

header.

Example:

;DNC-LOAD
;PROGFILE=9999000

1.4.3 Structure of Error File (instead of Download File) for the

Machine

If  a  download  cannot  be  executed,  an  error  file  is  generated  for  the  machine  (in  the  driver).

The driver generates the error file with the download resource name and the file extension of a valid DNC

file.

In order for an error file to be generated, the following tokens have to be configured:

Configuration

Description

INTERPRETER_COMMENT_CHAR=;

Semicolon is defined as comment character here

INTERPRETER_PROG_TOKEN=PROGFILE

Defines  the  resource  designation  under  which  the
DNC upload file is assigned on the server.

INTERPRETER_ERRCODE_TOKEN=ERR

INTERPRETER_ERRTEXT_TOKEN=TEXT

The file is generated based on the configuration. The file has the following structure (configuration above

used in this example):

;PROGFILE=20130204
;ERR=3218 TEXT=Resource locked

1.4.4  RS232 Machine Interfacing

Possible as from version dnc_dr_01.dll  7.2.1.2

PCC_SetupDNCStandAlone.docx

Version: 1.0.21162

Page 7 of 8

RS232 machine interfacing is activated with the following parameters.

For the machine with RS232 interfacing, the parameter must be entered in the relevant DNC instance.

PCC Configuration DNC Stand-alone

COM=3,9600,8,N,1

RS232_CONNECT=ON

RS232_ALIVE_CYCLETIME=2

PCC_SetupDNCStandAlone.docx

Version: 1.0.21162

Page 8 of 8


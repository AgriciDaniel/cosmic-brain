System Logs

1  System Logs

Overview

HYDRA menu

System administration  Monitoring  System logs

FEDRA menu

System administration  Monitoring  System logs

Transaction code

syspro

Function authorization

syspro.*

sysalarm – Display of system alarms when logging on to the MOC

Purpose

This  application  provides  an  overview  of  the  log  entries  made  by  other  applications/  functions  and

enables the access to those log files saved to the file system.

Integration

This application provides a central function. Its usage is subject to the responsibility of those using these

applications/ functions.

Display of system alerts

If  you have assigned  the function authorization  "sysalarm" to a user, the system performs an additional

check when this user logs on to the MOC. It is checked whether system alerts have occurred. If yes, the

application is opened and the log of the System application called System alarm is opened.

Field descriptions

Application

Logical name of the application to be logged

Designation

Text about the application

Program version

Program version of the application

Program date

Date of the creation of the application

Program

Reference to the technical name of the program/ application

MOC_SystemProtocol.docx

Version: 1.1.23295

Page 1 of 3

System Logs

Status

Status of the application during the last execution

Log file/ size

Name and size of the generated log file

Error file/ size

Name and size of the generated error file

Data file/ size

Name and size of the generated data file

Number of data records

Number of processed data records

Number of errors

Number of incorrect data records

Date

Date of the entry

Messages

Further messages/ notes of the application

Application

Logical name of the application to be logged

Application

Logical name of the application to be logged

Toolbar

 Log

Enables the display of a log file, if any.

Error

Enables the display of an error file, if any.

Data

Enables the display of a data file, if any.

Any file

Allows to access any file located on the HYDRA server. The name of the file is entered here. The

directory, in which the file will be searched, corresponds to the Path  "MOCLOGS" configured in the

system.

MOC_SystemProtocol.docx

Version: 1.1.23295

Page 2 of 3

Any error file

Allows to access any file located on the HYDRA server. The name of the file is entered here. The

directory, in which the file will be searched corresponds to the Path  "MOCERRS" configured in the

System Logs

system.

Any log file

Allows to access any file located on the HYDRA server. The name of the file is entered here. The

directory, in which the file will be searched corresponds to the Path  "MOCLOGS" configured in the

system.

MOC_SystemProtocol.docx

Version: 1.1.23295

Page 3 of 3


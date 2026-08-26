Paths

1  Paths

Overview

HYDRA menu

System administration  System settings  Paths

FEDRA menu

System administration  System settings  Paths

Transaction code

path

Function authorization

path

Purpose

You use the application to create or change paths in the system. A path configuration is a character string

that identifies a file, a directory or a resource (depending on the platform) in a computer system, e.g. device

files in Unix.

The system uses the paths to access the files stored in the specified location or to store files according to

the specified path.

Integration

The path configuration is a central functionality used by multiple functions in the system.

Field descriptions

Path

Identification of the storage location

Protocol

Access schema used for file transfer:

file

Network access to the files via UNC file names.

You must ensure that a network share (= Windows share) exists for the folder where the

files are stored.

ftp

Access via File Transfer Protocol

Condition: An FTP server must be installed.

MOC_PathConfiguration.docx

Version: 1.5.23435

Page 1 of 6

Paths

hydra  Access using HYDRA file transfer to transfer files to and from the HYDRA server.

The  protocol  hydra  is  not  supported  in  the  MES  Operation  Center  (MOC).  It  is

recommended not to use this protocol even if the data is on the HYDRA server. Use the

protocol file or ftp.

http

Support of http links to display web contents

ftps

The protocol ftps is only supported in the MES Operation Center (MOC).

smtp  The protocol smtp is only supported in escalation management (ESK) in combination

with the SMS gateway (ESK-SMSGW).

exe

Display of documents with  a defined application. The content  of the document name is

transferred to the application as parameter.

The "exe" support requires specific minimum versions of the MFPlugin on the client

(1.2.STD.15028), of the Windows terminals (ctaip, 2.0.2.14) and of the BAPI

lib/b_path.dll or lib/b_path.so (7.2.1.13).

unc

Support of unc links to display documents.

The "unc" support requires specific minimum versions of the MFPlugin on the client

(1.2.STD.15028), of the Windows terminals (ctaip, 2.0.2.14) and of the BAPI

lib/b_path.dll or lib/b_path.so (7.2.1.13).

Note: To open the linked document, the relevant application is used according to the file

extension. With this configuration, the Windows link is used. You cannot override this

setting.

Different  settings  may  be  made  according  to  the  operating  system  and  the  network  configuration

used.

Host

The server’s network name or IP address

smtp  SMTP mail server

file

If Tomcat and the system are installed on a shared server and the path is not used by the

terminal applications (CTWIN, AIP), you can also enter the logical name "localfile" as local

delegate access.

unc

Specification of file server name (e.g.: docserver)

Note: Two backslashes (\\) are automatically put in front of the file server name when

the absolute path is later generated.

Port

Number of communication port

MOC_PathConfiguration.docx

Version: 1.5.23435

Page 2 of 6

file

Not used

ftp

FTP port 0 = default port

hydra  x = 0: Current connection between the console or HYDRA terminal and the server.

Paths

x < 0: Connect using user number x.

x > 0: Connect on port x.

http

x > 0 port is included in web link

ftps

FTPS port number. 0 = default port (client only)

smtp  SMTP port number. 0 = default port

exe

Not used

unc

Not used

URL path

This is the path where the files are stored, expressed as a URL without specification of the server

(host). Slashes (/) are automatically converted to backslashes (\) by the clients, if necessary.

Placeholders / or <<MDT>> are not supported by the JAVA server ( client).

file

Specification of the Windows file share and any subdirectories

ftp

Specification of the FTP path

hydra  The URL path can also be specified relative to the installation location in the system. For

example, /mydata refers to a subdirectory mydata of the system installation.

http

Path of the web link

ftps

Specification of the FTPS path (client only)

smtp  Target adress (to:)

exe

Specification of program. Parameters for the program must not be entered here. Specify

the complete path including program name here (e.g. c:\windows\system32\write.exe).

unc

Path name of file storage. Example: \documents\ncdoks\

Note: Correct backslashes (\) must be entered here.

User / password

The user name and password used for file access are entered here. You can use passwords up to a

maximum  length  of  20  characters.  You  can  use  Latin  letters,  numbers  and  the  common  special

characters. Please note that the MOC may not support certain special characters, for example the

pipe  or  the  quotation  marks.  You  can  test  whether  the  characters  of  the  password  are  valid  by

entering the password in another input field with plain text display, saving it and then taking it out

again.

MOC_PathConfiguration.docx

Version: 1.5.23435

Page 3 of 6

Paths

file

User name and password used to access the Windows file share.

ftp

User name and password used to log on to the FTP server.

hydra  Not used

http

It depends on the browser in use whether the user/password option is supported or not.

For security reasons, login details should not be used for http paths in general.

Please note:

The Internet explorer does neither process nor support the user/password option.

ftps

User name and password used to log on to the FTPS server (client only)

smtp  Not used

exe

Not used

unc

Not used

Comment

Text input field to describe the details entered above.

Overview of permitted configurations

Protocol

Comment

Client

file

Access via network share

file (host=local file)  Access to local file path

ftp

ftps

hydra

http

smtp

FTP server required

FTP server with SSL required

Proprietary protocol

Server upload not possible.

For escalation management (ESK) only











 1)



AIP,

CTWIN















1) Presentation of http links defined as production resources and tools from the order information dialog

MOC_PathConfiguration.docx

Version: 1.5.23435

Page 4 of 6

1.1  Sample configurations

Display of intranet links on the AIP terminal (when using HYDRA)

Use

Paths

case:

Depending on the article, the AIP should open and display different intranet pages. The complete path in

this example would be:

http://<host name>/folder1/folder2/folder3/ATK12345

The first part of the path (host and further folder structure, displayed in blue) remains unchanged. Only the

last part changes (folder structure with article, displayed in orange).

Requirements:

The ERP system/the customer transfers the last part (orange) including folder structure and article and the

respective path name. These path specifications are included in the Production resources and tools (PRT)

of the operation. Example:

Configuration:

Configure the following items in the system:

  Path definition including the fixed section of the path of field URL path (blue section).

MOC_PathConfiguration.docx

Version: 1.5.23435

Page 5 of 6

Paths



If you do not want to open the link in the internal viewer on the AIP, but in an external viewer, you
can store the following definition in the hytnrcfg.ini:

With this configuration, the link opens in the program set as standard in the host, e.g. the Internet
Explorer.

Note:

After the configuration, you must restart the AIP terminal.

MOC_PathConfiguration.docx

Version: 1.5.23435

Page 6 of 6


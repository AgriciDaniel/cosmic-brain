MLE Communication

1  MLE Communication

Purpose

You  use  the  MES  Link  Enabling  (MLE)  communication  to  exchange  data  between  the  MES  and  other

systems,  e.g.  ERP  or  warehouse  management  systems.  MES  Link  Enabling  provides  a  framework  that

can be used by the applications (application interfaces).

Integration

The MLE framework is used by many application interfaces.

Basics

HYDRA  provides  the  MES  Link  Enabling  communication,  in  the  following  referred  to  as  MLE,  for  the

communication with ERP systems in general and SAP R/3 or ECC in particular.

MLE  is  a  program  environment  enabling  the  data  transfer  with  external  systems.  For  this  purpose,  we

use:



file servers and file clients for the data exchange on file level and

  RFC servers and RFC clients for the data exchange with SAP

 The  MLE  inbound  dispatcher  for  HYDRA  inbound  processing  is  used  in  any  case,  irrespective  of  the

external system data is exchanged with.

IDoc (Intermediate Document)

Use IDocs (intermediate documents) to exchange data:

- within an ERP system

- between several ERP systems or

- between ERP systems and third-party systems.

IDocs  are  containers  to  exchange  data  between  systems.  IDocs  may  be  flat  or  have  multi-level

hierarchies. IDocs use data segments to summarize data in logical units. IDocs combine data contents of

the  same  nature  and  structure.  Therefore,  you  can  transfer  several  of  these  “clusters”  within  one  file.

Although  each  IDoc  corresponds  to  a  defined  data  type/structure,  the  format  does  not  depend  on  the

content or type of content.

MBL_MLE_Communication.docx

Version: 1.1.20759

Page 1 of 8

MLE Communication

In general, IDocs consist of a control record, multiple data segments and the status record. There is

exactly one control record for each IDoc. The control record includes all pieces of information required for

sending and processing the IDoc. This information includes, for example:

- the message type

- the IDoc type

- the sending and receiving (logical) system. The control record is like an envelope stating address

details.

The  data  segments  of  the  IDoc  include  the  data.  Each  segment  consists  of  preliminary  information

specifying  the  data  structure.  The  payload  (user  data)  itself  is  stored  in  a  uniform,  unstructured  field.

Segments can also be structured in hierarchies.

Different processing steps are executed while an IDoc is being processed. Another status record is added

for each step. You can use these records to keep track of the processing steps and their results.

RFC technology

The Remote Function Call (RFC) constitutes the basis for the data exchange between SAP R/3 or ECC

and subsystems. The remote function call allows you to call SAP functions remotely from other systems.

The transactional Remote Function Call (tRFC) is an upgrade of this technology.

The  transactional  RFC  provides  independence  of  other  systems.  The  basis  for  this  procedure  is  the

dispatching  system's  obligation  (RFC  client)  to  call  the  receiving  system  over  and  over  again,  provided

that communication could not be established or in case of an interruption. However, this only repeats until

the transaction has been transferred successfully.

A  worldwide  unique  transaction  number  (TID)  is  allocated  for  each  transaction  in  order  to  guarantee

consistent data retention even if communication is interrupted.

MLE RFC server

An RFC server logs on to an SAP gateway and waits for data. When data arrives, the server receives and

stores the data in a database or file. Then, the server waits for data again.

There are different modes to log on an RFC server to an SAP gateway. The Registering Mode is used for

mySAP  communication.  In  this  case,  the  RFC  server  registers  its  functions  at  the  SAP  gateway.

Therefore, these functions can be called in the SAP environment.

Different older communication models use other modes which, however, are not relevant to HYDRA.

The MLE-ALE server (hyalesrv.exe) takes over the RFC server functions, when it comes to the HYDRA

MLE communication.

MBL_MLE_Communication.docx

Version: 1.1.20759

Page 2 of 8

MLE Communication

MLE RFC client

An RFC client  transfers data from HYDRA to  SAP  R/3 or  ECC. To do so, the RFC client  logs  on to an

SAP system and calls a specific function module. This can be a synchronous or asynchronous call.

The  MLE-RFC  client  takes  over  the  outbound  communication  with  R/3.  The  data  segments  created  in

HYDRA are transferred to the respective target system according to distribution specifications.

An upload to R/3 can be triggered in two ways.

  Triggered by an upload request from R/3:

In this case, the RFC client has  to  be  entered  as processing program for the upload request in the

distribution model. The segment names of the upload IDoc must be entered as its parameters.

  Cyclical upload

You can use the HYDRA Scheduler if you want the upload to be triggered by HYDRA.

MLE file server

Besides the data exchange via remote function call, data can also be exchanged using file transfer. In this

case,  the  file  server  monitors  a  specific  directory  to  identify  new  files  and  transfers  these  new  files  to

HYDRA. The file client, in turn, converts HYDRA uploads into files and archives them also in a specified

directory.

The  files  have  to  be  named  like  the  message  types  defined  in  the  HYDRA  MLE  distribution  model.

HYDRA  inbound  processing  may  be  controlled  by  the  file  extension.  The  following  file  extensions  are

possible:

MBL_MLE_Communication.docx

Version: 1.1.20759

Page 3 of 8

MLE Communication



"APP“

Creating/modifying data



"UPD“

Replacing the data existing in HYDRA by the newly transferred data (initial download).



"DEL“

Deleting data



"DAT“

The extension is used for all other files. The message function “DAT“ is not transferred to

the IDoc control record.

If files assigned to the names of the distribution model and the above-mentioned extensions are found,

these files are copied to the working directory. This working directory is also specified in the configuration

of  the  HYDRA  MLE  file  server.  The  system  then  transfers  the  data  records  existing  in  this  working

directory to the inbound tables of the HYDRA MLE interface.

MLE file client

HYDRA  provides  data  (e.g.  confirmations/uploads  of  operations)  in  the  interface.  According  to  the

respective segment type, HYDRA files the data as such segments.

MBL_MLE_Communication.docx

Version: 1.1.20759

Page 4 of 8

 File server HYDRA Database Table HYSAP_INBOUND_DATA Table HYSAP_INBOUND_CTRL Ctrl record Data record IDoc File  including several  IDOCs Table HYSAP_DIST_MOD

MLE Communication

This data is no longer interpreted for the actual communication layer. These segments are summarized in

IDocs and provided with connection details through the configuration of outbound processing. A file client

then makes these segments available in a specified directory where they can be processed by the ERP

system.

The HYDRA MLE file client performs outbound processing on the basis of ASCII files. If a logical system

created as file interface is assigned to a message type, the data is archived in a file in a specific directory.

This directory is specified by the configuration of the HYDRA MLE file client.

HYDRA controls the upload or writing of the files into the specified directory at regular intervals.

MLE inbound dispatcher

The HYDRA MLE Inbound Dispatcher organizes inbound processing in HYDRA.

The HYDRA MLE Inbound Dispatcher:

- monitors inbound transactions;

- uses the message type (from the MLE distribution model) to identify the corresponding processing

routine (program) to transfer data to HYDRA;

- starts this processing routine. Inbound transactions are processed according to the sequence specified

by the ERP system. Consequently, a transaction can only be processed, once the previous transaction

has been completed.

The  following  diagram  shows  the  processing  steps  of  the  dispatcher  when  processing  inbound

transactions:

The system generates log and error files for the data transferred to HYDRA.

MBL_MLE_Communication.docx

Version: 1.1.20759

Page 5 of 8

CheckingthereceiptofIDocsDetermineappropriateprogramin distributionmodelStart programUpload byprogramUpdate statusofthedatarecordMLEDispatcher

MLE Communication

Logical systems

Each system landscape consisting of test and production system(s), is represented as logical system in

HYDRA. HYDRA's configuration for inbound and outbound processing refers to this logical system.

Please note for SAP R/3 or ECC:

Third-party systems must be configured as logical system with a unique name in R/3 and/or ECC in order

for SAP R/3 and/or ECC to be able to communicate with these external systems.

 This name is used as the “address” for sending IDocs. In return, the R/3 or ECC system is also

configured as logical system.

Procedure for transferring data to HYDRA

An ERP interface program generates the data with the defined data structures and stores this data in a

transfer file. This file can then be transferred to HYDRA.

These transfer files are to be provided in the HYDRA subdirectory ./inf_int/interf (standard system). You

can find this directory in the HYDRA directory or in case of multiple system environments in the relevant

system directory.

You have to implement a handshake logic to transfer the files between the ERP system and HYDRA. This

logic prevents any data losses by "overwriting" transfer files.

Note the following in order to ensure reliable processing:

The  file  to  be  provided  by  the  ERP  system  must  not  exist  under  the  documented  name  until  HYDRA

releases it for transfer and processing.

When transferring the file from the source system to the HYDRA server, you have to use another name

for the transfer file (a name other than the documented name). Rename the file and use the specified file

name, once it has been transferred. To rename the file:

- Use the REN command for Windows systems

- Use the mv command for UNIX/LINUX. The file extensions ".APP", ".UPD", ".DEL" and ".DAT" are

reserved for HYDRA. The ".TRF" extension is recommended.

If the transfer directory already includes a file, the system has to wait until HYDRA has taken over this file

before transferring a new file.

If the ERP system creates the file directly on the HYDRA server, you have to ensure that the file does not

exist  under  the  documented  name  when  it  is  created,  written  or  appended.  However,  MPDV  does  not

recommend this procedure in general.

MBL_MLE_Communication.docx

Version: 1.1.20759

Page 6 of 8

MLE Communication

To prevent the file size from growing endlessly, the ERP system should interrupt the write process at 50

Mbyte and  wait for the file server to collect the  data. A new file can be  written, once the file server has

removed the file. This is especially important for the initial download.

The file port processes the data included in the interface directory as follows:

When  starting  the  service  /  process  (hyalesrv.exe/out),  the  system  identifies  the  message  types  to  be

integrated and sorts them according to the defined priority.

The  priority  is  digital  ("0"  =  no  priority  /  "1"  high  priority)  and  can  be  defined  in  the  HYDRA  distribution

model.

In the interface directory a HYDRA process searches for the files as follows within one message type:

1.  DEL / del

2.  APP / app

3.  UPD / upd

4.  DAT / dat

Procedure for transferring data from HYDRA

An ERP interface program prepares the data structures of the files transferred by HYDRA.

You have to implement a handshake logic to transfer the files between the ERP and HYDRA. This logic

prevents any data losses by "overwriting" transfer files.

These  transfer  files  are  provided  in  the  HYDRA  subdirectory  ./inf_int/interf  (standard  system).  You  can

find  this  directory  in  the  HYDRA  directory  or  in  case  of  multiple  system  environments  in  the  relevant

system directory.

Use the following processing method to safely process the files:

  Rename the upload file using:

- the REN command with NT and

- the mv command with UNIX.

  Transfer the renamed upload file to the ERP environment.

Notes

-  You must NOT use a copy command in this step.

MBL_MLE_Communication.docx

Version: 1.1.20759

Page 7 of 8

MLE Communication

-  As  long  as  HYDRA  is  processing  the  file,  the  file  does  not  exist  under  the  specified  name.  This

ensures that the higher-level system can only access the file, once HYDRA has finished processing

(secure handshake).

-  The file extensions ".APP, ".UPD", ".DEL" and ".DAT" are reserved for HYDRA. The ".TRF" extension

is recommended.

Automated interfacing

MPDV  recommends  using  a  gateway  including  corresponding  control  software  to  allow  for  the  HYDRA

server and the customer's server to be connected automatically. This gateway controls the data exchange

between  the  two  systems  in  both  directions.  As  an  alternative,  you  can  use  any  other  procedure  that

ensures a secure file transfer, in particular the connection of both systems using a network file system.

Notes on the file format/codepage

The following conventions apply for the codepage/character set:

MES-Weaver 3.0

Each data record included in the file has to be completed by 'CR' (U+000D) and 'LF' (U+000A) for

Windows and 'LF' (U+000A) for Unix.

HYDRA expects the file to be in the UTF-8 format and HYDRA also uses this format for uploads. On

request, you can also transfer files in the file format that was used until MW 2.0.

MBL_MLE_Communication.docx

Version: 1.1.20759

Page 8 of 8


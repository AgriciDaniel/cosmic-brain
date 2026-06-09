Manual

Service Interface for eReports
SIS-ERI 4.0pe

Version 1.0.23049

Last changed on: 11.06.2019

Service Interface for eReports

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SIS-ERI_40.docx

Version: 1.0.23049

Page 2 of 9

Service Interface for eReports

Contents

1  Overview: Service Interface for eReports .................................................... 4

2  Using the Service Interface for eReports ..................................................... 6

2.1  Requirements ...................................................................................................... 6

2.1.1  Reports .................................................................................................... 6

2.1.2  Service Interface ..................................................................................... 6

2.1.3

eReport Manager .................................................................................... 6

2.1.4  Optional: Escalation Management ........................................................... 7

2.2  Useful services .................................................................................................... 7

2.2.1  Getting the status of the eReport Manager .............................................. 7

2.2.2

Listing available reports ........................................................................... 7

2.2.3

Listing available printers .......................................................................... 7

2.3  How to proceed ................................................................................................... 8

2.3.1  Exporting and configuring a report on the MOC ....................................... 8

2.3.2  Requesting meta data for a report ........................................................... 8

2.3.3  Changing meta data ................................................................................ 9

2.3.4  Creating a report ..................................................................................... 9

2.3.5  Result ...................................................................................................... 9

SIS-ERI_40.docx

Version: 1.0.23049

Page 3 of 9

Service Interface for eReports

1  Overview: Service Interface for eReports

Purpose

With  reports  that  are  available  in  the  system,  you  can  use  any  client  to  create  reports  via  a  REST

interface using the Service Interface for eReports.

You  can  directly  print  the  reports  or  store  the  reports  as  a  file  in  any  file  format  (PDF,  HTML,...)  with  a

configurable file name in configurable paths. A dispatch of the report via e-mail is also possible.

Integration

Requirements for using the Service Interface for eReports:

  The HYDRA eReport Manager (SIS-ERM) has been licensed and installed.

  The basic license Service Interface (SCS-SIF) has been purchased and is installed.

  A sufficient number of client licenses for the Service Interface (SCS-SIC) has been purchased.

  To  send  reports  via  e-mail,  the  escalation  management  must  be  set  up.  See  documentation  of

the HYDRA eReport Manager.

Features

The  Service  Interface  for  eReports  is  an  add-on  to  the  HYDRA  eReport  Manager  (SIS-ERM).  You  use

this add-on to make additional configurations for existing reports and to export reports from the MOC for

further processing.

The eReport  Manager functions are provided  as services of the Web Service Provider (WSP). You can

use  the  HYDRA  Service  Interface  (SCS-SIF)  to  call  these  services.  Using  these  services,  the  reports

available  in  the  eReport  Manager  can  be  used  outside  the  HYDRA  system.  The  services  provide  the

following functions:



Identifying the eReport Manager status (online, runtime, ...).

  Listing the available reports (name, ...).

  Reading the information on a specific report (available selection criteria, ...).

  Listing the printers available in the eReport Manager.

  Running a report and passing the selection criteria and the required language with the report.

  Selecting the output format (PDF, HTML, ...).

  Selecting an option for the result: the result can be stored in a file  in a HYDRA  path, printed or

returned as result of the service.

  Selecting the user: you can run the report for the calling user and not for the user defined in the

report configuration; the authorizations stored for this user then control the areas of responsibility

the user can access.

SIS-ERI_40.docx

Version: 1.0.23049

Page 4 of 9

The  services mentioned  are  subject  to  the  same  rules  and  security  aspects  as  all  other  services  of  the

Service Interface.

Service Interface for eReports

SIS-ERI_40.docx

Version: 1.0.23049

Page 5 of 9

Service Interface for eReports

2  Using the Service Interface for eReports

2.1  Requirements

2.1.1 Reports

You  must  familiarize  yourself  with  reports.  You  can  use  the  reports  that  are  included  in  the  standard

delivery  of  the  system.  But  you  can  also  create  own  reports.  If  you  want  to  create  own  reports,  you

require the development tool to create reports (MDS-BAS, MDS-RPD, …) and the relevant training (CUT-

RPD, CUT-MOC, CUT-MDP).

2.1.2 Service Interface

The services of the "Service Interface for eReports" are called using the service interface SCS-SIF. The

Service Interface must be licensed. You must familiarize yourself with the use of the Service Interface and

connect your client to the system.

The following services are used to control the "Service Interface for eReports":

  PrintService.state

  PrintService.listPrinters

  PrintService.listReports

  PrintService.reportMetaById or PrintService.reportMetaByName

  PrintService.report

For  a  detailed  description  of  the  services,  refer  to  the  technical  documentation  of  the  Service  Interface

SCS-SIF. For example, you can use the MPDV Repository Client MRC to view this documentation.

2.1.3 eReport Manager

You  require  the  eReport  Manager  SIS-ERM  to  use  the  "Service  Interface  for  eReports".  To  make  the

reports  available  for  the  "Service  Interface  for  eReports",  some  functions  of  the  eReport  Manager  are

required:

  Exporting the report

  Via report configurations in the eReport Manager, you can preconfigure the selection criteria and

options for the report output.

  Using the eReport Manager, a GUI is available to test the reports and the report configurations.

Make  sure  that  the  eReport  Manager  SIS-ERM  is  correctly  and  completely  installed  according  to  the

installation instruction. Familiarize yourself with the operation of the eReport Manager.

SIS-ERI_40.docx

Version: 1.0.23049

Page 6 of 9

Service Interface for eReports

2.1.4 Optional: Escalation Management

If you want to send reports via e-mail, you require the eReport Manager and additionally you must make

configurations in the escalation management for sending e-mails. For a description of the configurations,

refer to the installation instruction of the eReport Manager.

  When  you

install

the  eReport  Manager,  you  must  create  an  escalation  configuration

ESK.MESSAGE.

  You must properly activate the escalation management in the HYDRA basic settings. To do so,

define an e-mail server (SMTP server) and a sender for the e-mails.

2.2  Useful services

The "Service Interface for eReports" includes some services that you can use to get information.

2.2.1 Getting the status of the eReport Manager

Use  the  service  PrintService.state  to  get  information  on  the  current  status  of  the  "Service

Interface for eReports".

The technical service documentation includes a detailed description of the service.

2.2.2 Listing available reports

Use  the  service  PrintService.listReports  to  get  a  list  of  all  reports  that  are  available  for  the

"Service Interface for eReports".

The technical service documentation includes a detailed description of the service.

2.2.3 Listing available printers

Use  the  service  PrintService.listPrinters  to  get  a  list  of  all  printers  that  are  available  for  the

"Service Interface for eReports".

The technical service documentation includes a detailed description of the service.

SIS-ERI_40.docx

Version: 1.0.23049

Page 7 of 9

Service Interface for eReports

2.3  How to proceed

2.3.1 Exporting and configuring a report on the MOC

When  you  configure  the  report,  you  must make sure  that  the  option  to  save  the  report  on  the  server  is

activated.

The required reports must be exported.

All  reports  that  are  exported  and  saved  on  the  server  are  available  for  the  "Service  Interface  for

eReports". But we recommend to additionally create configurations in the eReport Manager to configure

the selection criteria and the options for the report output. Using the eReport Manager, you can also test

the reports and the report configurations.

The product documentation of the eReport Manager  describes how  to proceed  to export, configure and

test reports.

2.3.2 Requesting meta data for a report

On your client, you can request the meta data for a report.

Use  the  service  PrintService.listReports  to  get  a  list  of  all  reports  that  are  available  for  the

"Service Interface for eReports".

The technical service documentation includes a detailed description of the service.

The service PrintService.listReports lists all available reports. If a configuration for a report exists in the

eReport Manager, the numeric ID of the configuration is included in the list.

There are two services to request meta data. One service only delivers meta data on the exported report

without integrating the configuration settings stored in the eReport Manager. With the other service, the

configuration settings stored in the eReport Manager are also integrated in the meta data.

Service PrintService.reportMetaById

Service PrintService.reportMetaByName

The  configuration  ID  in  the  eReport  Manager  is

The  name  of  the  exported  report  is  used  for

used for selection. The configuration must exist.

selection.

The  meta  data  is  preassigned  using  the  exported

The  meta  data  is  only  derived  from  the  exported

report  and  the  configuration  stored  in  the  eReport

report.

Manager.

SIS-ERI_40.docx

Version: 1.0.23049

Page 8 of 9

Service Interface for eReports

Use  the  service  PrintService.reportMetaById  to  get  the  meta  data  of  a  report  with

configuration in the eReport Manager.

Use  the  service  PrintService.reportMetaByName  to  get  the  meta  data  of  a  report  without

configuration in the eReport Manager.

The service documentation includes a detailed description of both services.

2.3.3 Changing meta data

Change the meta data.

Usual changes:

  Changes of the selection criteria

  Specifications on the output or the dispatch of the report

The  meta  data  that  you  can  change  is  described  in  the  technical  documentation  of  the  service

PrintService.report.

2.3.4 Creating a report

Use the service PrintService.report to create the report.

The technical service documentation includes a detailed description of the service.

Pass the previously requested and possibly changed meta data to the service PrintService.report in the

parameter print.service.report.meta.

2.3.5 Result

The result depends on the settings in the meta data:

  The file format (PDF, HTML,...) is defined in the meta data.

  The  file  is  stored  in  the  specified  path.  (Note:  the  path  is  not  directly  specified  as  directory,  but

only the name of a path configuration in the system).

  The service returns the file with Base64 encoding in the service parameter print.service.report.

SIS-ERI_40.docx

Version: 1.0.23049

Page 9 of 9


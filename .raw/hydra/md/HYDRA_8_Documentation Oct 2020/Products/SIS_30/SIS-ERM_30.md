Manual

eReportManager
SIS-ERM 3.0

Version 1.0.14856

Last changed on: 19.06.2020

eReportManager

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

SIS-ERM_30.docx

Version: 1.0.19468

Page 2 of 13

eReportManager

Contents

1  Overview eReportManager .......................................................................... 4

2  Configuration E-Report Manager ................................................................. 5

SIS-ERM_30.docx

Version: 1.0.19468

Page 3 of 13

eReportManager

1  Overview eReportManager

Purpose

HYDRA provides a service for central creation and distribution of reports.

This service can be used for all reports based on the MDS Report Builder.

All output formats provided by the report output can be generated, e.g. pdf, xls etc.

At fixed times, the report results may be

- saved within the file system

- output directly at a configured printer

- sent by e-mail to specific persons

The times for executing reports can be defined within the configuration dialog. In addition, the parameters

to control the report can be specified (e.g. evaluation period, machine etc.).

Cyclic  report  generation  has  been  implemented  as  service  that  has  to  be  enabled  on  a  Windows

computer.

Implementation Notes

The function package is used where you wish to create cyclic reports

Integration

HYDRA Escalation Management is required for sending e-mails

E-mail  recipients  can  be  addressed  by  using  the  configuration  options  provided  by  Escalation

Management. Logical groups of recipients may be defined.

For example, the e-mail addresses of production managers from three different production areas can be

configured as logical recipient "production managers".

Features

The eReportManager includes

configuration of cyclic report generation

service for automatic report generation on a Windows server

SIS-ERM_30.docx

Version: 1.0.19468

Page 4 of 13

eReportManager

2  Configuration E-Report Manager

Overview

Menu

System  administration    System  settings    Configuration  E-Report
manager

Transaction code

rbbj

Function authorization

rbbj

Purpose

The E-Report Manager is used for centrally controlled generating and distributing of reports.

You can define the following criteria in the application Configuration E-Report manager:

-  Fixed times for the execution of reports

-  Parameters to control the report (e.g. evaluation period, machine etc.)

-  Output format

-  Storage or dispatch by e-mail

Integration

  Make the reports available to the E-Report Manager (see section Using reports for the E-Report

manager).

  You need the HYDRA Escalation Management to send e-mails.

Requirements

You require the HYDRA Escalation Management (licensed and activated) to send report results by e-mail.

Technical requirements

To use this function, the following requirements must be fulfilled:

  You need to activate/install the E-Report manager service in a Windows system.

  You require a .net 4.5.2 installation on the server where the E-Report manager service is running.

A  standard  HYDRA  installation  does  not  fulfill  the  above  mentioned  requirements.  Perform  a  separate

installation as instructed in the "SIS-ERM_30_installation" for the E-Report.

SIS-ERM_30.docx

Version: 1.0.19468

Page 5 of 13

eReportManager

Procedure

o  You can use time control to start report calls at fixed times. It is possible to start reports only on

specific weekdays (e.g. only Monday and Friday).

o  The  report  results  are  saved  and  sent  to  employees  using  the  escalation  management.  The

addressed employees receive the file as an e-mail attachment.

Selection criteria

The application provides the following selection criteria:

Report

Selects the report that you want to output

Active

Selects the active/inactive report outputs

Field definition

E-Report ID

Name of the report output (unique ID)

Report export

Selects created report configurations (only when creating/copying a configuration)

General

Type

Fixed:

  runs at a fixed point in time

Interval:

  runs at a defined interval

Active

Identifier showing if the report output is enabled

Report settings

Report

The report file to be used (*.lul)

Application ID

Application the report belongs to.

This information is required to configure the necessary evaluation parameters.

SIS-ERM_30.docx

Version: 1.0.19468

Page 6 of 13

User

User that runs the report. The system checks the responsibility area the HYDRA user is authorized

eReportManager

for.

Language

Language used for the report.

Example:

o  de-DE

o  en-US

Report format

Format of the report  default = PDF

Further formats according to the output options provided in List & Label (e.g. as xls file etc.)

Report output

Report file

File name (without extension)

You can add a defined identifier including the current date/time to the file name. This way, you can

archive the reports.

$today -> YYYY-MM-DD

Example: 2015-03-24

$todayen -> MM-DD-YYYY

Example: 03-24-2015

$todayde -> DD-MM-YYYY

Example: 24-03-2015

$now -> hh-mm

Example: 12-05

$nowss -> hh-mm-ss

Example: 12-05-55

Converted in the following order:

$todayen -> $todayde -> $today -> $nowss -> $now

Example:

Report_date_$today_time_$nowss  Report_date_2015-03-24_time_12-05-55.pdf

Report path

HYDRA path to save the file. In this field, you usually enter the configured path "PSREPORT".

The real path is configured in the HYDRA path configuration.

The server/computer including the installation of the E-Report service must be authorized

to access the configured file path.

SIS-ERM_30.docx

Version: 1.0.19468

Page 7 of 13

eReportManager

Printer

Printer  name  to  print  the  generated  file  afterwards.  The  printer  name  refers  to  a  printer  ion  the

server where the E-Report service has been installed.

To use a printer, ensure that the Windows user configured for the E-Report service can access a

printer  and  has  the  authorizations.  The  system  administrator  knows  the  available  printers.  The

system  administrator

installs

the  printers  according

to

the

installation

instructions  "SIS-

ERM_30_installation"  in  the  E-Report  server.  The  document  "SIS-ERM_30_installation"  also

describes how to test the printer configuration.

Fixed point in time

Hour, minute, day, month, weekday and year

Configures a fixed point in time to run the report.

All fields are connected by a logical AND relation. If fields are not populated, the value is not taken

into account and the action is executed again and again.

For example, to run a report EVERY day at 8 am, you must populate the fields "hour" and "minute".

The other fields remain empty and are ignored.

Interval

Interval

Configures an interval to run the report

From, to

Report is executed at the specified interval between these events.

Escalation

Subject

Subject of the e-mail to be sent.

Active

Indicator showing whether or not an e-mail dispatch (i.e. triggering the escalation) is required. If this

option is checked, the parameters from the configuration of the E-Report manager are taken over

into the escalation management.

Function

The function group the e-mail is sent to.

Person

Person the e-mail is sent to. To this end, you must store an e-mail address in the HR master data in

the field Company e-mail.

Text

Message text (text of the mail).

SIS-ERM_30.docx

Version: 1.0.19468

Page 8 of 13

eReportManager

Parameter

Parameter

After creating the configuration, you can set in the editing dialog all values of the selection panel of

the mask that calls the report.

The parameters (data of the selection panel) therefore define the data included in the report.

Note:

If  you  want  to  run  a  report  and  output  the  data  in  a  relative  manner  (e.g.  using  the  data  of  the

previous day), you must configure the field in the selection panel of the dialog as relative date field.

Toolbar

Test report

Using this function, the print server immediately performs the selected E-Report configuration. The

configured time or interval is ignored. If you have configured a printer or an e-mail dispatch, these

features are included when you test the report.

If  the  e-mail  is  not  dispatched  during  the  test,  disable  the  e-mail  dispatch  in  the  E-Report

configuration in the Escalation tab before running the test.

You can define a printer in the E-Report configuration. The printer must be accessible by the print

server service.

Report files are loaded from the server.

Using reports for the E-Report manager

In order to use reports for the E-Report Manager, the reports must first be exported to the MOC with the

MES  Development  Suite  activated.  To  export  the  reports,  open  the  report  configuration.  Select  the

required report and call the function Edit. Click Export in the dialog that follows.

These  export  files  are  stored  in  the  HYDRA  path  "PSLLXML"  and  are  then  available  to  the  E-Report

Manager.

If changes are made to the report or to the data sources, you must execute a new export.

Restriction of reports in application configuration

Default values for the configuration of data sources.

The configuration of Default values in the function Configure data source used for reports in the E-

Report Manager, is not supported.

SIS-ERM_30.docx

Version: 1.0.19468

Page 9 of 13

eReportManager

If you want to use a report in the E-Report Manager, add a field for the selection parameter to the

Selection Panel instead of Default values in the configuration of the data source. You can assign a

value to the selection field in the E-Report Manager.

Sample E-Report configuration

We use the report Maintenance plan of the application Activity calendar as example. To export the report,

you must first of all enable the MES Development Suite and then open the activity calendar. To open the

Activity calendar, you can use the transaction code "rmcal".

Request data in the open application. Once data is available, open the report configuration.

Select the report "Maintenance plan" in the dialog and click the button Edit.

The  dialog  of  the  report  configuration  opens,  which  includes  the  function  Export.  Start  the  function  by

clicking the button Export. A prompt confirms the successful export.

SIS-ERM_30.docx

Version: 1.0.19468

Page 10 of 13

eReportManager

The export of the report configuration is stored in the HYDRA server according to the path configuration

PSLLXML.  In  the  example,  the  following  file  is  saved  after  the  export  using  the  configured  path

PSLLXML:

Create a  new  E-Report. As it is an example, assign  the E-Report ID  Example.  Via  the selection  Report

Export, select the previously exported report configuration.

In tab General, set the type to Fix and the E-Report configuration to Active.

Configure the tab Report settings according to the used report configuration and its origin.

SIS-ERM_30.docx

Version: 1.0.19468

Page 11 of 13

eReportManager

  Here, the MaintenancePlan is the report whose configuration was exported (see above).
  The MaintenanceCalendar is the application ID used to create the report configuration. In this
example, it is the ID of the application Activity calendar. Use the MES Development Suite and
the function Configure application to identify the application ID.

  Refer to the descriptions above for information on the functioning of the other fields.

In tab Report Output, only enter the file name of the report you want to create:

According  to  the  configuration,  PSREPORT  should  be  predefined  as  report  path.  It  is  possible,  but  not

recommended to change the path.

Depending  on  the  configuration  in  tab  General,  you  only  need  to  configure  tab  Fixed  point  in  time  or

Interval. To configure the e-mail dispatch, use tab Escalation.

SIS-ERM_30.docx

Version: 1.0.19468

Page 12 of 13

Once you have created the E-Report configuration, you can run a test. Use the button Test report. In the

example,  the  report  is  generated  in  PDF  format.  This  test  is  used  to  check  the  configured  selection

parameters. You can change the selection parameters of the report using the function Edit. Here, you can

edit the E-Report configuration and also the selection parameters for the report generation.

eReportManager

Troubleshooting

Due to the complex relationships between the MOC, the HYDRA server and the print server, malfunctions

can  occur.  Malfunctions  can  affect  the  export  of  reports,  the  E-Report  configuration  and  the  test  of

reports, if the settings and configurations made during the installation are not correct or not correct any

more.

Among others, the following configurations and settings are made on installing the E-Report manager:

  The  HYDRA  paths  PSREPORT  and  PSLLXML  are  created,  if  not  yet  available.  The  path

MOCREP  is  checked.  These  paths  are  required  to  export  report  files,  to  use  the  files  in  the  E-

Report manager and to save the created reports.

  An  escalation  configuration  is  created  for  the  event  ESK.MESSAGE,  if  not  yet  available.  This

configuration is required to send reports by mail.

  An  INI  configuration  including  the  address  of  the  E-Report  server  is  created.  This  INI

configuration  is  required  to  test  reports.  Using  this  address,  the  print  server  is  triggered  to

immediately create the report during the test.



In the E-Reporting server, the printers are configured and the services set up.

If  problems  occur  during  configuration,  test  or  application  of  the  E-Report  manager,  check  all

configuration steps included in the installation instructions "SIS-ERM_30_installation".

SIS-ERM_30.docx

Version: 1.0.19468

Page 13 of 13


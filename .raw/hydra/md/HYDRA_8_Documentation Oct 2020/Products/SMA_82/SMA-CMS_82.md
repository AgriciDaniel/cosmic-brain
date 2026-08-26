Manual

SMA-CMS Customizing Suite
for SMA
SMA-CMS 8.2

Version 1.0.23049

Last changed on: 02.09.2020

SMA-CMS Customizing Suite for SMA

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-CMS_82.docx

Version: 1.0.23049

Page 2 of 178

SMA-CMS Customizing Suite for SMA

Contents

1  SMA-CMS Customizing Suite for SMA ........................................................ 9

2  SMA Installation ......................................................................................... 10

2.1  Notes on the installation instructions ................................................................. 10

2.2  Further applicable documents ........................................................................... 10

2.3  Requirements .................................................................................................... 10

2.3.1  SMA ...................................................................................................... 10

2.3.2  Reporting ............................................................................................... 11

2.4  SMA installation ................................................................................................ 11

2.4.1

.NET Framework 4.5.2 .......................................................................... 11

2.4.2

IIS .......................................................................................................... 13

2.4.3  Create SMA site in IIS ........................................................................... 42

2.4.4

asp.net .................................................................................................. 67

2.4.5  SMA configuration ................................................................................. 69

2.4.6  How to configure a PZE Terminal on the MOC ...................................... 77

2.4.7  MW3.0 services with MW2.1 system ..................................................... 77

2.4.8  HTTPS activation – client to SMA server ............................................... 78

2.4.9  HTTPS activation – SMA server to HYDRA ........................................... 82

2.4.10  MQTT .................................................................................................... 83

2.4.11  Label printing ......................................................................................... 83

2.4.12  Optional: Import SMA function profile .................................................... 83

2.5  Test SMA .......................................................................................................... 84

2.6  SMA 8.2 installation ........................................................................................... 88

2.6.1  Executing database scripts .................................................................... 88

2.6.2  How to activate licenses ........................................................................ 88

2.6.3

Installing Dotnet Core and ASP.NET Core Runtime .............................. 89

2.6.4  Setting up the web host ......................................................................... 89

2.6.5  Generating function authorizations ........................................................ 89

2.6.6

Installing HTTPS ................................................................................... 90

2.6.7  Web host installation as Windows service ............................................. 91

2.6.8  Special notes ......................................................................................... 92

2.7

Install the SMA app ........................................................................................... 92

2.7.1

iOS – SMA App ..................................................................................... 92

SMA-CMS_82.docx

Version: 1.0.23049

Page 3 of 178

SMA-CMS Customizing Suite for SMA

2.7.2  Android - SMA app ................................................................................ 93

2.8  Tips + Tricks ...................................................................................................... 95

2.8.1  Write permissions to the log directory .................................................... 95

2.8.2  The IE cannot identify mouse clicks ....................................................... 96

2.8.3  HTTP Error 403.14 - Forbidden ............................................................. 98

2.8.4  McAfee VirusScan Enterprise (VSE) 8.8 Patch 4 ................................... 98

2.8.5  Request the SMA installation version .................................................... 98

2.8.6  window.localStorage – path cannot be found......................................... 98

3  SMA Scripting .......................................................................................... 100

3.1

Introduction ..................................................................................................... 100

3.2  General ........................................................................................................... 100

3.2.1  Reading the current SMA version ........................................................ 100

3.2.2  Activating SMA logging ........................................................................ 100

3.2.3  SMA structure ...................................................................................... 101

3.2.4  Custom web services .......................................................................... 103

3.2.5  Changing the language ....................................................................... 104

3.2.6  Show progress bar .............................................................................. 105

3.3  Changes to Standard Applications .................................................................. 106

3.3.1  Customize applications ........................................................................ 106

3.3.2  Web service calls ................................................................................ 106

3.3.3  MPDV data collection - Version 1 ........................................................ 107

3.3.4  MPDV data collection - Version 2 ........................................................ 112

3.3.5  Modal dialog ........................................................................................ 118

3.4  Customer-Specific Applications ....................................................................... 119

3.4.1  Calling the application via URL in the browser: .................................... 119

3.4.2  Title of a customer-specific application ................................................ 119

3.4.3

Integrating files in HTML ...................................................................... 119

3.4.4

Integrating an application in the Home screen ..................................... 120

3.4.5  Web service calls ................................................................................ 121

3.4.6  BAPI call .............................................................................................. 124

3.4.7  Forwarding .......................................................................................... 125

3.4.8  Barcode processing ............................................................................. 125

3.4.9  Read UserPerson from session ........................................................... 125

3.4.10

Integrating charts ................................................................................. 125

3.4.11  Lists with fixed values .......................................................................... 126

SMA-CMS_82.docx

Version: 1.0.23049

Page 4 of 178

SMA-CMS Customizing Suite for SMA

3.5  Script Functions/Variables ............................................................................... 127

4  Repository Client ...................................................................................... 130

4.1  Quick start ....................................................................................................... 130

4.2  Start and exit Repository Client ....................................................................... 132

4.3  The Application Window .................................................................................. 133

4.4  Grids/table views ............................................................................................. 134

4.5  The application menu ...................................................................................... 136

4.6  Workset ........................................................................................................... 139

4.7  Relations ......................................................................................................... 142

4.8  References ...................................................................................................... 143

4.9  Service documentation .................................................................................... 144

5  The Repository ......................................................................................... 146

5.1  Overview ......................................................................................................... 146

5.2  Domain ............................................................................................................ 146

5.3  Service ............................................................................................................ 147

5.3.1  Name .................................................................................................. 147

5.3.2  Function .............................................................................................. 147

5.3.3  ServiceType ........................................................................................ 147

5.3.4

ListMode .............................................................................................. 148

5.3.5  DLG ..................................................................................................... 148

5.3.6  SystemCall .......................................................................................... 148

5.4  ServiceGui ...................................................................................................... 148

5.4.1  Name .................................................................................................. 148

5.4.2  Package .............................................................................................. 148

5.4.3  Extended ............................................................................................. 148

5.4.4  AdditionalDataLogics ........................................................................... 149

5.4.5  ApplicationID ....................................................................................... 149

5.4.6  ApplicationTitle .................................................................................... 149

5.4.7  ApplicationHelpFile .............................................................................. 149

5.4.8  ApplicationHelpIndex ........................................................................... 149

5.4.9  Description .......................................................................................... 149

5.5  ServiceParameter ........................................................................................... 150

5.5.1  Acronym .............................................................................................. 150

5.5.2  ResultSet ............................................................................................. 150

SMA-CMS_82.docx

Version: 1.0.23049

Page 5 of 178

SMA-CMS Customizing Suite for SMA

5.5.3  WebServiceType ................................................................................. 150

5.5.4  DefaultValue ........................................................................................ 150

5.5.5

IsResult ............................................................................................... 150

5.5.6

IsDynamicResult ................................................................................. 150

5.5.7

InputAsArray........................................................................................ 151

5.5.8

IsSpecialParameter ............................................................................. 151

5.5.9

IsFilterParameter ................................................................................. 151

5.5.10

IsMandatory......................................................................................... 151

5.5.11  Can* (filter) operators .......................................................................... 151

5.5.12  HydraAcronym ..................................................................................... 152

5.5.13  HydraResultAcronym ........................................................................... 152

5.5.14  TransferEmptyValuesToHydra ............................................................ 153

5.5.15  HydraShiftPart ..................................................................................... 153

5.5.16  Reference ............................................................................................ 153

5.5.17  TransformationType ............................................................................ 153

5.5.18  PlugName ........................................................................................... 153

5.5.19  DBField ............................................................................................... 154

5.5.20  DBAlias ............................................................................................... 154

5.5.21  DBTabelle ........................................................................................... 155

5.5.22  DBFieldAlternative ............................................................................... 155

5.5.23  DataObjectName ................................................................................. 155

5.5.24  ConditionalFieldKey ............................................................................. 155

5.5.25  Constraints .......................................................................................... 156

5.6  ServiceParameterGui ...................................................................................... 156

5.6.1  Acronym .............................................................................................. 157

5.6.2  ResultSet ............................................................................................. 157

5.6.3

Label ................................................................................................... 157

5.6.4  Tooltip ................................................................................................. 157

5.6.5  FormatType ......................................................................................... 157

5.6.6  ClientDefaultValue ............................................................................... 158

5.6.7

IsKey ................................................................................................... 160

5.6.8  ShowInGrid ......................................................................................... 160

5.6.9  ShowInDetail ....................................................................................... 160

5.6.10  ShowInSearch ..................................................................................... 160

5.6.11  ColumnCategory ................................................................................. 160

5.6.12  Category1, Category2, Category3 ....................................................... 161

SMA-CMS_82.docx

Version: 1.0.23049

Page 6 of 178

SMA-CMS Customizing Suite for SMA

5.6.13  TabOrder ............................................................................................. 161

5.6.14  ColumnOrder ....................................................................................... 161

5.6.15  ShowSecondControlInSearch .............................................................. 161

5.6.16  SearchTabOrder .................................................................................. 161

5.6.17  SearchCategory1, SearchCategory2 ................................................... 162

5.6.18  ControlType ......................................................................................... 162

5.6.19  ControlTypeMode ................................................................................ 162

5.6.20  ControlParameter ................................................................................ 164

5.6.21  ControlDataSource .............................................................................. 164

5.6.22  ControlDataSourceMode ..................................................................... 164

5.6.23  ControlDataSourceParameter ............................................................. 164

5.6.24  ControlDataSourceResult .................................................................... 164

5.6.25  VisibleCondition ................................................................................... 165

5.6.26  EditableCondition ................................................................................ 165

5.6.27  ScriptId ................................................................................................ 166

5.7  Property .......................................................................................................... 166

5.7.1  Acronym .............................................................................................. 166

5.7.2  WebServiceType ................................................................................. 166

5.7.3  NETType ............................................................................................. 167

5.7.4  SemanticType ..................................................................................... 167

5.7.5  SyntacticType ...................................................................................... 167

5.7.6

Label ................................................................................................... 168

5.7.7  DefaultTooltip ...................................................................................... 168

5.7.8  UnitLabel ............................................................................................. 168

5.7.9  OutputFormat ...................................................................................... 168

5.7.10

InputFormat ......................................................................................... 169

5.7.11  Length ................................................................................................. 169

5.7.12  Rules for the input/output formatting ........................................................ 169

5.7.13  FillChar ................................................................................................ 174

5.7.14  Calculation .......................................................................................... 174

5.7.15  Further fields see ServiceParameterGui .............................................. 174

5.8  ControlDataSource .......................................................................................... 175

5.8.1  Name .................................................................................................. 175

5.8.2  Source ................................................................................................. 175

5.8.3  Parameter ........................................................................................... 175

5.8.4  Columns .............................................................................................. 176

SMA-CMS_82.docx

Version: 1.0.23049

Page 7 of 178

SMA-CMS Customizing Suite for SMA

5.8.5  Result .................................................................................................. 176

5.9  ReferenceData ................................................................................................ 176

5.9.1

ref_data_key........................................................................................ 176

5.9.2  Type .................................................................................................... 177

5.9.3

db_key................................................................................................. 177

5.9.4

is_default ............................................................................................. 177

5.9.5  Designation ......................................................................................... 177

5.9.6

sort_key ............................................................................................... 177

5.10  Authorization ................................................................................................... 177

5.10.1  Authorization type ................................................................................ 177

5.10.2  Authorization Context .......................................................................... 178

5.10.3  Authorization ID ................................................................................... 178

5.10.4  Authorization key ................................................................................. 178

5.10.5  Authorization Designation .................................................................... 178

SMA-CMS_82.docx

Version: 1.0.23049

Page 8 of 178

SMA-CMS Customizing Suite for SMA

1  SMA-CMS Customizing Suite for SMA

Purpose

Development license as basis for the custom development of SMA applications:

  Generation of applications according to the user's requirements



Integration of user-specific vocabulary

  Configuration of custom input dialogs

You can make changes or create new applications in the following SMA applications:

  Contact person

  Time recording

  Shift and absence planning

  Absence Planning and Approval

  Time sheet

  Workforce requirements plan

  Workplaces/Machines

  Order overview

  Operation overview

  Pool of orders

  KPI Monitor

  Setup change list

  Messages listing

  Maintenance calendar

  Project time recording

  Material management

  Documentation of inspection result

  Complaint management

  Energy data collection

  Current escalations

  Messages

  Data collection

SMA-CMS_82.docx

Version: 1.0.23049

Page 9 of 178

SMA-CMS Customizing Suite for SMA

2  SMA Installation

2.1  Notes on the installation instructions

This document is only suitable for trained experts.

2.2  Further applicable documents

Installation instructions - Standard HYDRA MW 3.0:
Inst_hydra_mw30.pdf
Installation instructions - Standard HYDRA MW 2.1:
Inst_hydra_mw21.pdf
Installation instructions - MOC 3.0 services with MW 2.0/2.1:

inst_moc30-mw20-21.pdf

2.3  Requirements

2.3.1 SMA

  The  HYDRA  8  (MW  3.x,  MW  4.0pe  SP15)  system  must  be  installed  and  running  (alternative:

MW2.1 with corresponding requirements see "2.4.7.2 Applications for MW2.1")

  Windows  Server  2008  R2  /  Windows  Server  2012  Standard  /  Windows  Server  2016

Standard / Windows Server 2019 Standard as SMA host

(a joint installation with HYDRA 8 on one server is possible)



IIS 7.5 (or higher)

(Internet Information Services 7.5 is included in Windows Server 2008 R2)



.NET Framework 4.5.2 (or higher)

You can find the installation package at http://support.microsoft.com/kb/2901907 (or - if available

– on the HYDRA8 server

%HYDRADIR%\admtools\dotnet\dotNetFx452.exe)

  Dotnet Core Runtime 3.0 and ASP.NET Core Runtime 3.0

The installation packages are available at: https://dotnet.microsoft.com/download/dotnet-core/3.0

  asp.net server pages are enabled

SMA-CMS_82.docx

Version: 1.0.23049

Page 10 of 178

SMA-CMS Customizing Suite for SMA

  SMA installation package SMA_x64.zip



Installed SMA82 installation package [date]-SMA82.upd

SMA checks licenses.  You must have  purchased additional products  in  order  to  use the  SMA

functions.

  Language and culture setting

Smooth server operation can only be guaranteed with the following language and culture settings

(e.g.  SMA  does  not  support  Turkish  as  the  software,  L&L,  cannot  cope  with  this  language  and

does not work as expected):

o  1) Language German with culture German

o  2) Language English with culture English/USA

o  Other languages/cultures have not yet been released.

  LICENSE with MW2.1

Important: With MW 2.1 every SMA client occupies a HYD-KE license (console license). If you

use SMA as a time and attendance client, a corresponding number of licenses should be

available.

  You can use an HTML5 capable browser as a client (IE >= 10). We generally recommend using

a current browser.

o  We recommend using the current Google Chrome browser due to its excellent

performance.

o  The IE is not supported with SMA 8.2.

2.3.2 Reporting

  We have converted the time sheet to List&Label (no separate installation necessary).

2.4  SMA installation

2.4.1   .NET Framework 4.5.2

Microsoft .NET Framework 4.5.2 is a highly compatible, direct update of Microsoft .NET Framework 4 and

Microsoft .NET Framework 4.5. You can use the offline package in cases when the web installation is not

possible due to a missing internet connection.

SMA-CMS_82.docx

Version: 1.0.23049

Page 11 of 178

SMA-CMS Customizing Suite for SMA

You can download the offline package from:

http://support.microsoft.com/kb/2901907

If available, you can find the offline package on the HYDRA 8 server:

%HYDRADIR%\admtools\dotnet\dotNetFx452.exe)

SMA-CMS_82.docx

Version: 1.0.23049

Page 12 of 178

SMA-CMS Customizing Suite for SMA

2.4.2 IIS

2.4.2.1  Windows 2008 R2

Check if the Microsoft Internet Information Services (IIS) are installed and started:

 Start – Administration – Services

The  service  "WWW-Publishingdienst"  (German Windows)  or  "World  Wide  Web  Publishing  Service"

(English Windows) must be available and started:

German:

English:

If IIS is not available, proceed with the installation as follows:

 Start – Administration – Server Manager – Roles – Add roles

Select server role "Web server (IIS)":

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 13 of 178

Select the role services "Application development":

SMA-CMS Customizing Suite for SMA

Administration tools must be installed.

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 14 of 178

SMA-CMS Customizing Suite for SMA

Install

2.4.2.2  Windows Server 2012 Standard

Check

if  Microsoft

Internet

Information  Services

(IIS)

are

installed

and

started:

Go to Administration:

Start  Administration  Services

The  service  "WWW-Publishingdienst"  (German Windows)  or  "World  Wide  Web  Publishing  Service"

(English Windows) must be available and started.

German:

English:

SMA-CMS_82.docx

Version: 1.0.23049

Page 15 of 178

SMA-CMS Customizing Suite for SMA

If IIS is not available, install it as described below:

Start  Administration  Server Manager

Select the option: "Add roles and features“:

A wizard opens to add roles and features:

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 16 of 178

SMA-CMS Customizing Suite for SMA

Next

Select your server.

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 17 of 178

SMA-CMS Customizing Suite for SMA

Select server role "Web server (IIS)“.

A new window opens:

Check: "Include management tools (if applicable)“

Add features

SMA-CMS_82.docx

Version: 1.0.23049

Page 18 of 178

SMA-CMS Customizing Suite for SMA

Next

Make sure the .NET Frameworks are installed:

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 19 of 178

SMA-CMS Customizing Suite for SMA

Next

Select "Application development" including all sub-options in addition to already selected services:

Add the following features when checking individual sub-options:

SMA-CMS_82.docx

Version: 1.0.23049

Page 20 of 178

When prompted, add the following features:

SMA-CMS Customizing Suite for SMA

Add features

  Add features

Add features

SMA-CMS_82.docx

Version: 1.0.23049

Page 21 of 178

SMA-CMS Customizing Suite for SMA

Next

Install

SMA-CMS_82.docx

Version: 1.0.23049

Page 22 of 178

Installation in progress:

SMA-CMS Customizing Suite for SMA

Close (after successful installation)

The following Windows service should now be available:

SMA-CMS_82.docx

Version: 1.0.23049

Page 23 of 178

SMA-CMS Customizing Suite for SMA

2.4.2.3  Windows Server 2016 Standard

Check

if  Microsoft

Internet

Information  Services

(IIS)

are

installed

and

started:

Go to Administration:

Start  Services

The  service  "WWW-Publishingdienst"  (German Windows)  or  "World  Wide  Web  Publishing  Service"

(English Windows) must be available and started.

German:

English:

If IIS is not available, install it as described below:

Start  Server manager

Select the option: "Add roles and features“:

SMA-CMS_82.docx

Version: 1.0.23049

Page 24 of 178

A wizard opens to add roles and features:

SMA-CMS Customizing Suite for SMA

Next

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 25 of 178

SMA-CMS Customizing Suite for SMA

Select your server.

Next

Select server role "Web server (IIS)“.

SMA-CMS_82.docx

Version: 1.0.23049

Page 26 of 178

A new window opens:

SMA-CMS Customizing Suite for SMA

Check: "Include management tools (if applicable)“

Add features

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 27 of 178

Make sure the .NET Frameworks are installed:

SMA-CMS Customizing Suite for SMA

Next

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 28 of 178

Select "Application development" including all sub-options in addition to already selected services:

SMA-CMS Customizing Suite for SMA

Add the following features, when checking individual sub-options:

SMA-CMS_82.docx

Version: 1.0.23049

Page 29 of 178

When prompted, add the following features: Example:

SMA-CMS Customizing Suite for SMA

Add features

Add features

SMA-CMS_82.docx

Version: 1.0.23049

Page 30 of 178

SMA-CMS Customizing Suite for SMA

Next

Install

SMA-CMS_82.docx

Version: 1.0.23049

Page 31 of 178

Installation in progress:

SMA-CMS Customizing Suite for SMA

Close (after successful installation)

The following Windows service should now be available:

SMA-CMS_82.docx

Version: 1.0.23049

Page 32 of 178

SMA-CMS Customizing Suite for SMA

2.4.2.4  Windows Server 2019 Standard

Check

if  Microsoft

Internet

Information  Services

(IIS)

are

installed

and

started:

Go to Administration:

Start  Services

The  service  "WWW-Publishingdienst"  (German Windows)  or  "World  Wide  Web  Publishing  Service"

(English Windows) must be available and started.

German:

English:

If IIS is not available, install it as described below:

Start  Server manager

Select the option: "Add roles and features“:

SMA-CMS_82.docx

Version: 1.0.23049

Page 33 of 178

A wizard opens to add roles and features:

SMA-CMS Customizing Suite for SMA

Next

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 34 of 178

SMA-CMS Customizing Suite for SMA

Select your server.

Next

Select server role "Web server (IIS)“.

SMA-CMS_82.docx

Version: 1.0.23049

Page 35 of 178

A new window opens:

SMA-CMS Customizing Suite for SMA

Check: "Include management tools (if applicable)“

Add features

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 36 of 178

Make sure the .NET Frameworks are installed:

SMA-CMS Customizing Suite for SMA

Next

Next

SMA-CMS_82.docx

Version: 1.0.23049

Page 37 of 178

Select "Application development" including all sub-options in addition to already selected services:

SMA-CMS Customizing Suite for SMA

Add the following features, when checking individual sub-options:

SMA-CMS_82.docx

Version: 1.0.23049

Page 38 of 178

When prompted, add the following features: Example:

SMA-CMS Customizing Suite for SMA

Add features

Add features

SMA-CMS_82.docx

Version: 1.0.23049

Page 39 of 178

SMA-CMS Customizing Suite for SMA

Next

Install

SMA-CMS_82.docx

Version: 1.0.23049

Page 40 of 178

Installation in progress:

SMA-CMS Customizing Suite for SMA

Close (after successful installation)

The following Windows service should now be available:

SMA-CMS_82.docx

Version: 1.0.23049

Page 41 of 178

SMA-CMS Customizing Suite for SMA

2.4.3 Create SMA site in IIS

2.4.3.1  Windows 2008 R2 (IIS 7.5)

  Create a new directory "SMA" in the root directory of the IIS:

e.g.:c:\inetpub\wwwroot\SMA

  Unpack

the  SMA

installation  package  SMA_x64.zip  and  copy

the  content

to

c:\inetpub\wwwroot\SMA

 Warning: Check if the package is "locked". If so, then "unlock" the package by right-clicking

(properties).

  Assign the following users to the folder:

o

IUSR

  Request folder properties.

  Go to the Security tab and click the Edit button.

  Click Add in the dialog that opens.

  Add the relevant user.

SMA-CMS_82.docx

Version: 1.0.23049

Page 42 of 178

SMA-CMS Customizing Suite for SMA

o  Proceed as described above to add the user who is entered in the IIS administration GUI.

You can check the person to be entered in the Internet Information Services (IIS)

Manager:

  Start

the

Internet

Information

Services

(IIS)

Manager:

 Start – Administration – Internet Information Services (IIS) Manager

SMA-CMS_82.docx

Version: 1.0.23049

Page 43 of 178

  Right-click "Application pools"

SMA-CMS Customizing Suite for SMA

Add application pool

  Name:

SMA

.NET Framework version:

.NET Framework v4.0.30319

Managed pipeline mode:

Integrated

OK

If the required .NET Framework version is not included in the selection list, you first have

to register asp.net in IIS.

See section 1.4.4 asp.net

  Verify  the  following  in  the  advanced  settings  of  the  application  pool:  The  entry  "load  user

profile" must be set to "True"! Set the maximum number of worker processes to 1 or leave

it at 1!

SMA-CMS_82.docx

Version: 1.0.23049

Page 44 of 178

SMA-CMS Customizing Suite for SMA

  Right-click "Sites":

Add website

SMA-CMS_82.docx

Version: 1.0.23049

Page 45 of 178

SMA-CMS Customizing Suite for SMA

  Site name:

Application pool:

Physical path:

Port:

SMA

SMA

c:\inetpub\wwwroot\SMA

8082

OK

You can choose any port (here: 8082).

It all depends on the assigned ports or if ports should be reserved for future installations.

Check in any case if the ports 8080, 8081, 8082, etc. are already occupied by WSP installations

in case of a HYDRA multi-system installation.

  Permit  APK  download:  Allow  the  APK  download  in  order  to  be  able  to  download  the  client

installation package directly from Android devices. To do so, select the server connection on the

left hand side of the IIS Manager. In the center, you will find an icon called MIME type:

. A list opens. Click the "add" button on the right hand side to add a new MIME type.

SMA-CMS_82.docx

Version: 1.0.23049

Page 46 of 178

SMA-CMS Customizing Suite for SMA

File name extension: .apk (you must state the dot).

MIME type: application/vnd.android.package-archive

Then you have to restart the server.

2.4.3.2  Windows Server 2012 (IIS 8.5)

Create a new directory "SMA" in the IIS root directory:

e.g.: c:\inetpub\wwwroot\SMA

SMA-CMS_82.docx

Version: 1.0.23049

Page 47 of 178

Check the file properties of the SMA installation package  SMA_x64.zip and make sure it is not blocked

for security reasons, e.g.:

SMA-CMS Customizing Suite for SMA

If it is blocked, then unblock it.

Unpack the SMA installation package SMA_x64.zip and copy the content to c:\inetpub\wwwroot\SMA

SMA-CMS_82.docx

Version: 1.0.23049

Page 48 of 178

Assign the user “IUSR” to the SMA directory, e.g. c:\inetpub\wwwroot\SMA

SMA-CMS Customizing Suite for SMA

Assign the user displayed in the “Internet Information Services (IIS) Manager”, e.g. “hydadm”, to the SMA

directory, e.g.: c:\inetpub\wwwroot\SMA.

Start the "Internet Information Services (IIS) Manager":
Start  Administration  Internet Information Services (IIS) Manager

SMA-CMS_82.docx

Version: 1.0.23049

Page 49 of 178

Right-click "Application pools"

SMA-CMS Customizing Suite for SMA

Add application pool…

Name:

SMA

.NET CLR version:

.NET CLR version v4.0.30319

Managed pipeline mode:

Integrated

OK

If the required .NET CLR version v4.0.30319 is not included in the selection list, you first have to register

asp.net in IIS (see section 1.4.4. asp.net).

We highly recommended that you always run the commands to register asp.net in IIS even if the

proper .NET version (.NET CLR version) is already listed here.

SMA-CMS_82.docx

Version: 1.0.23049

Page 50 of 178

Right-click  the  "SMA"  application  pool  and  check  the  default  values  of  the  application  pool:

SMA-CMS Customizing Suite for SMA

Set application pool defaults…

Make sure the option "Maximum worker processes“ is set to 1 and set the option "load user profile"

to "True"!

OK

SMA-CMS_82.docx

Version: 1.0.23049

Page 51 of 178

SMA-CMS Customizing Suite for SMA

Right-click "Sites":

Add website…

Site name:

Application pool:

Physical path:

Port:

OK

SMA

SMA

c:\inetpub\wwwroot\SMA

you can choose any port, e.g.: 8082

The ports you can select depend on the ports that are available on your server.

Check in any case if the ports 8080, 8081, 8082, etc. are already occupied by WSP installations

SMA-CMS_82.docx

Version: 1.0.23049

Page 52 of 178

SMA-CMS Customizing Suite for SMA

in case of a HYDRA multi-system installation.

Permit the direct download of client installation packages by Android devices (APK download):

Double-click "MIME type“

Add

File extension:  .apk (do not forget the dot “.”!)

MIME_Typ:

OK

application/vnd.android.package-archive

SMA-CMS_82.docx

Version: 1.0.23049

Page 53 of 178

SMA-CMS Customizing Suite for SMA

Restart your server.

2.4.3.3  Windows Server 2016 (IIS 10.0)

Create a new directory "SMA" in the root directory of the IIS:

e.g.: c:\inetpub\wwwroot\SMA

Check the file properties of the SMA installation package  SMA_x64.zip and make sure it is not blocked

for security reasons, e.g.:

If it is blocked, then unblock it.

Unpack the SMA installation package SMA_x64.zip and copy the content to c:\inetpub\wwwroot\SMA

SMA-CMS_82.docx

Version: 1.0.23049

Page 54 of 178

You have to assign the user “IUSR” to the SMA directory, e.g. c:\inetpub\wwwroot\SMA

SMA-CMS Customizing Suite for SMA

Assign the user displayed in the “Internet Information Services (IIS) Manager”, e.g. “hydadm”, to the SMA

directory c:\inetpub\wwwroot\SMA.

Start the "Internet Information Services (IIS) Manager":
Start  Administration  Internet Information Services (IIS) Manager

SMA-CMS_82.docx

Version: 1.0.23049

Page 55 of 178

Right-click "Application pools"

SMA-CMS Customizing Suite for SMA

Add application pool…

Name:

SMA

.NET CLR version:

.NET CLR version v4.0.30319

Managed pipeline mode:

Integrated

OK

If the required .NET CLR version v4.0.30319 is not included in the selection list, you first have to register

asp.net in IIS (see section 1.4.4. asp.net).

We highly recommended that you always run the commands to register asp.net in IIS even if the

proper .NET version (.NET CLR version) is already listed here.

SMA-CMS_82.docx

Version: 1.0.23049

Page 56 of 178

Right-click  the  "SMA"  application  pool  and  check  the  default  values  of  the  application  pool:

SMA-CMS Customizing Suite for SMA

Set application pool defaults…

Make  sure  the  option  "Maximum  worker  processes“  is  set  to  1  and  set  the  option  "load  user

profile" to "True"!

OK

SMA-CMS_82.docx

Version: 1.0.23049

Page 57 of 178

SMA-CMS Customizing Suite for SMA

Right-click "Sites":

Add website…

Site name:

Application pool:

Physical path:

Port:

OK

SMA

SMA

c:\inetpub\wwwroot\SMA

you can choose any port, e.g.: 8082

The ports you can select depend on the ports that are available on your server.

Check in any case if the ports 8080, 8081, 8082, etc. are already occupied by WSP installations

SMA-CMS_82.docx

Version: 1.0.23049

Page 58 of 178

in case of a HYDRA multi-system installation.

SMA-CMS Customizing Suite for SMA

Permit the direct download of client installation packages by Android devices (APK download):

Double-click "MIME type“

Add

SMA-CMS_82.docx

Version: 1.0.23049

Page 59 of 178

SMA-CMS Customizing Suite for SMA

File extension:  .apk (do not forget the dot “.”!)

MIME_Typ:

OK

Restart your server.

application/vnd.android.package-archive

2.4.3.4  Windows Server 2019 (IIS 10.0)

Create a new directory "SMA" in the root directory of the IIS:

e.g.: c:\inetpub\wwwroot\SMA

Check the file properties of the SMA installation package  SMA_x64.zip and make sure it is not blocked

for security reasons, e.g.:

If it is blocked, then unblock it.

Unpack the SMA installation package SMA_x64.zip and copy the content to c:\inetpub\wwwroot\SMA

SMA-CMS_82.docx

Version: 1.0.23049

Page 60 of 178

SMA-CMS Customizing Suite for SMA

You have to assign the user “IUSR” to the SMA directory, e.g. c:\inetpub\wwwroot\SMA

SMA-CMS_82.docx

Version: 1.0.23049

Page 61 of 178

Assign the user displayed in the “Internet Information Services (IIS) Manager”, e.g. “hydadm”, to the SMA

directory c:\inetpub\wwwroot\SMA.

SMA-CMS Customizing Suite for SMA

Start the "Internet Information Services (IIS) Manager":
Start  Administration  Internet Information Services (IIS) Manager

Right-click "Application pools"

Add application pool…

SMA-CMS_82.docx

Version: 1.0.23049

Page 62 of 178

SMA-CMS Customizing Suite for SMA

Name:

SMA

.NET CLR version:

.NET CLR version v4.0.30319

Managed pipeline mode:

Integrated

OK

If the required .NET CLR version v4.0.30319 is not included in the selection list, you first have to register

asp.net in IIS (see section 1.4.4. asp.net).

We highly recommended that you always run the commands to register asp.net in IIS even if the

proper .NET version (.NET CLR version) is already listed here.

Right-click  the  "SMA"  application  pool  and  check  the  default  values  of  the  application  pool:

Set application pool defaults…

Make  sure  the  option  "Maximum  worker  processes“  is  set  to  1  and  set  the  option  "load  user

profile" to "True"!

SMA-CMS_82.docx

Version: 1.0.23049

Page 63 of 178

SMA-CMS Customizing Suite for SMA

OK

Right-click "Sites":

Add website…

SMA-CMS_82.docx

Version: 1.0.23049

Page 64 of 178

SMA-CMS Customizing Suite for SMA

Site name:

Application pool:

Physical path:

Port:

OK

SMA

SMA

c:\inetpub\wwwroot\SMA

you can choose any port, e.g.: 8082

The ports you can select depend on the ports that are available on your server.

Check in any case if the ports 8080, 8081, 8082, etc. are already occupied by WSP installations

in case of a HYDRA multi-system installation.

SMA-CMS_82.docx

Version: 1.0.23049

Page 65 of 178

Permit the direct download of client installation packages by Android devices (APK download):

SMA-CMS Customizing Suite for SMA

Double-click "MIME type“

Add

File extension:  .apk (do not forget the dot “.”!)

MIME_Typ:

OK

application/vnd.android.package-archive

SMA-CMS_82.docx

Version: 1.0.23049

Page 66 of 178

SMA-CMS Customizing Suite for SMA

Restart your server.

2.4.4  asp.net

We  highly  recommend  that  you  always  run  the  commands  to  register  asp.net  in  IIS  ,  even  if  the

proper .NET version (.NET CLR version) is already listed when adding a new application pool (see

above).

2.4.4.1  Check installation

Use "dir v*" in the directory C:\Windows\Microsoft.NET\Framework to check which .NET versions are

available on the computer:

SMA-CMS_82.docx

Version: 1.0.23049

Page 67 of 178

SMA-CMS Customizing Suite for SMA

2.4.4.2  Register asp.net in IIS

To

register

asp.net

in

IIS,

go

to

the

required

directory,

e.g.

C:\Windows\Microsoft.NET\Framework\v4.0.30319 and execute the following command:

aspnet_regiis.exe -i

Restart IIS with the following command:

iisreset

Restart your server.

SMA-CMS_82.docx

Version: 1.0.23049

Page 68 of 178

SMA-CMS Customizing Suite for SMA

2.4.5 SMA configuration

2.4.5.1  Basic configuration

Check  and  adjust  the  following  rows  according  to  your  requirements  in  the  SMA  configuration  file  (by

default: c:\inetpub\wwwroot\SMA\Web.config):

Directory for SMA log files:

<add key="LogFolder" value="C:\temp\SMA-Log" />

The default path is: c:\temp\SMA-Log.

The cache for the SMA system is also stored in “LogFolder”.

Important: Do not log data in the SMA directory!

We recommend using a directory within HYDRADIR, e.g..:

<add key="LogFolder" value="D:\hydra\tmp\SMA-Log" />

Generate this directory, if it does not yet exist!

The

group

“IIS_IUSRS”  must

have

full

access

to

the

SMA

log

directory,

e. g. d:\hydra\tmp\SMA-Log

Further settings:

Host name or IP address for the HYDRA MasterServer:

<add key="MasterServer" value="moc-tomcat-01" />

SMA-CMS_82.docx

Version: 1.0.23049

Page 69 of 178

SMA-CMS Customizing Suite for SMA

Port for the HYDRA MasterServer:

<add key="MasterServerPort" value="8080" />

Name of the service (the default value should be correct):

<add key="MasterServerWebApplication" value="MocServices/MesInstanceService" />

For example:

<add key="LogFolder" value="D:\hydra\tmp\SMA-Log" />

    <!-- The name or IP address of the Master Server, which provides a list of available
HYDRA systems.
             Allowed values: A valid server name or IP address, e.g "HYDRASERVER"
             Default value:  "" -->
    <add key="MasterServer" value="moc-tomcat-01" />
    <!-- The master server's port where the instance service is available.
             Allowed values:
             Default value:  "8080" -->
    <add key="MasterServerPort" value="8080" />
    <!-- Name of the web application of the master service
             Default value:  "MocServices" -->
    <add key="MasterServerWebApplication" value="MocServices/MesInstanceService" />

SMA-CMS_82.docx

Version: 1.0.23049

Page 70 of 178

SMA-CMS Customizing Suite for SMA

2.4.5.2

Edit clockings

With HYDRA 8 you can edit clocking records.

Set  the  entry  "PersonEditClockings“  to  "true“  in  the  Web.config  of  the  SMA  installation  (default  storage

location: "C:\inetpub\wwwroot\SMA\Web.config“) in order to enable this function.

    <!-- Person edit clockings -->
    <add key="PersonEditClockings" value="true"/>

Set the corresponding entry to "false", if you do not want the person to edit the clocking records.

    <!-- Person edit clockings -->
    <add key="PersonEditClockings" value="false"/>

Possible as of SMA version 42420.

2.4.5.3  Hide unlicensed applications

Applications which are not licensed are grayed out by default on the home screen after a user logs in.

If you want to hide these applications completely, set the entry "ShowNotLicensedApps" to "false" in the

web.config of the SMA installation (default storage location: C:\inetpub\wwwroot\SMA\Web.config).

    <!-- Licensing -->
    <add key="ShowNotLicensedApps" value="false" />

Use the following entry if you want to gray out unlicensed applications (default setting):

    <!-- Licensing -->
    <add key="ShowNotLicensedApps" value="true" />

2.4.5.4

Further configuration options

Find  below  a  list  of  possible  configurations  that  you  can  make  for  an  SMA  installation.  The  document

describes

the  entries  of

the  Web.config  of

the  SMA

installation

(default  storage

location:

"C:\inetpub\wwwroot\SMA\Web.config") that can be changed.

-  LogLevel

o  Valid values are "Off" (default) and "Trace".

o  Off: Logging is not active.

o  Trace: Logging is performed using the configured directory (LogFolder).

-  CheckboxTerminalMode

o  Valid values are "true" (default) and "false".

o

true: The checkbox Terminal mode is initially activated (if no information is stored in the

browser cache) on the person login page in tab Settings.

SMA-CMS_82.docx

Version: 1.0.23049

Page 71 of 178

SMA-CMS Customizing Suite for SMA

o

false: The checkbox  Terminal  mode is initially deactivated (if no  information is stored in

the browser cache) on the person login page in tab Settings.

o  The help of the login page describes how the field works (SMA_Login.pdf).

-  CheckboxShowFieldPerson

o  Valid values are "true" (default) and "false".

o

true: The checkbox Show 'person' field is initially activated (if no information is stored in

the browser cache) on the person login page in tab Settings.

o

false: The checkbox Show 'person' field is initially deactivated (if no information is stored

in the browser cache) on the person login page in tab Settings.

o  The help of the login page describes how the field works (SMA_Login.pdf).

-  CheckboxShowFieldCardId

o  Valid values are "true" (default) and "false".

o

true: The checkbox  Show 'badge' field is  initially  activated (if no information  is stored in

the browser cache) on the person login page in tab Settings.

o

false: The checkbox Show 'badge' field is initially deactivated (if no information is stored

in the browser cache) on the person login page in tab Settings.

o  The help of the login page describes how the field works (SMA_Login.pdf).

-  DefaultTerminal

o  Default assignment is "254"

o  The field Terminal is initially assigned this value (if no information is stored in the browser

cache) on the person login page in tab Settings.

o  The help of the login page describes how the field works (SMA_Login.pdf).

-  CheckboxCostCenterBooking

o  Valid values are "true" and "false" (default).

o

true: The checkbox Cost center posting is initially activated (if no information is stored in

the browser cache) on the person login page in tab Settings.

o

false: The checkbox Cost center posting is initially deactivated (if no information is stored

in the browser cache) on the person login page in tab Settings.

o  The help of the login page describes how the field works (SMA_Login.pdf).

-  DefaultCompanyCostCenter

o  Default assignment is " " (empty)

o  The field Company for cost center posting is initially assigned this value (if no information

is stored in the browser cache) on the person login page in tab Settings.

o  The help of the login page describes how the field works (SMA_Login.pdf).

-  DefaultCompanyLackBasicList

o  Default assignment is " " (empty)

o  The field Company for absence reason list is initially assigned this value (if no information

is stored in the browser cache) on the person login page in tab Settings.

o  The help of the login page describes how the field works (SMA_Login.pdf).

-  CheckboxRememberLanguageHide

SMA-CMS_82.docx

Version: 1.0.23049

Page 72 of 178

SMA-CMS Customizing Suite for SMA

o  Valid values are "true" and "false" (default).

o

o

o

true: The checkbox Save selection is not displayed on the login pages in tab Language.

false: The checkbox Save selection is displayed on the login pages in tab Language.

If you save the selected language, the language selected last is preassigned on the login

pages after logout.

-  ListItemSettingsHide

o  Valid values are "true" and "false" (default).

o

true: the tab Settings is completely hidden on the login pages. The default values are still

assigned to the fields of the setting page. Important: If some information is stored in the

browser  cache,  this  information  overwrites  the  default  configuration  settings  of  the

Web.config.  Solution:  When  the  Web.config  is  changed,  the  clients  must  empty  their

cache.

o

false:  The  setting  does  not  have  any  effect.  The  tab  Settings  is  displayed  on  the  login

pages.

-  ForcePzeLoginOnHomeScreen

o  Valid values are "true" and "false" (default).

o

true: If a logout is performed on the SMA start screen (home) or if the login page is called

using the button Settings (screwdriver), the person login page is loaded.

o

false:  If  a  logout  is  performed  on  the  SMA  start  screen  (home)  or  if  the  login  page  is

called using the button Settings (screwdriver), the user login page is loaded.

-  LanguageChoiceBlacklist

o  Can include a pipe-separated list of languages that must not be available in the selection

of the login.

o

Example:

  The

following

files

are

available

in

the

file

system

(SMA\Runtime\resources\standard\languages)

  mpdvTexte.de-AT.resx

  mpdvTexte.de-CH.resx

  mpdvTexte.de-DE.resx

  Entry: <add key="LanguageChoiceBlacklist" value="de-AT|de-CH"/>

  Result:

  German (Austria) is not available

  German (Switzerland) is not available

  German (Germany) is available

-  PersonLogOnHideInputField

o  Default assignment is " " (empty)

o

" " (empty): On the person login page,  you can enter the personnel number (person) or

the badge number (bagde) to log in.

SMA-CMS_82.docx

Version: 1.0.23049

Page 73 of 178

SMA-CMS Customizing Suite for SMA

o  userPerson: To log in a person, you can only enter the badge number (badge).

o  userCardId: To log in a person, you can only enter the personnel number (person).

-  PersonLogOnAllowEmptyPincode

o  Valid values are "true" (default) and "false".

o

o

true: On the person login page, a person can also log in with empty field Pin code.

false:  On  the  person  login  page,  a  person  can  only  log  in  if  the  field  Pin  code  is  filled.

Otherwise, an error message Pincode required is displayed.

-  PersonLogOnAutoSelectField

o  Default assignment is " " (empty)

o

" " (empty): When you open the person login page, no input field is focused.

o  userPerson: When you open the person login page, the input field Person is focused.

o  userCardId: When you open the person login page, no input field Badge is focused.

o  userPincode: When you open the person login page, the input field Pin code is focused.

-  PersonLogOnPincodeIsReadonlyIfIdentityIsMissing

o  Valid values are "true" and "false" (default).

o

true: On the person login page,  you can only fill the field  Pin code when  you have filled

the field Person or Badge.

o

false: On the person login page, you can always fill the field Pin code.

-  NavigationBarHideActualLogedInUser

o  Valid values are "true" and "false" (default).

o

true: The currently  logged  on user or the currently logged  on person is not  displayed  in

the navigation bar.

o

false: The currently logged on user or the currently logged on person is displayed in the

navigation bar.

-  PersonSessionTimeout

o  Valid values are "true" and "false" (default).

o  The  effect  of

this  setting  also  depends  on

the  configuration  of  setting

"PersonSessionTimeoutEdit".

o

"PersonSessionTimeoutEdit" is filled with value "false":



true: When a person has logged on, a timeout is displayed in the navigation bar.

When the timeout has expired, the person is automatically logged off.



false: There is no timeout.

o

"PersonSessionTimeoutEdit" is filled with value "true":



true: The checkbox Timeout is initially activated (if no information is stored in the

browser cache) on the person login page in tab Settings.



false: The checkbox Timeout is initially deactivated (if no information is stored in

the browser cache) on the person login page in tab Settings.

-  PersonSessionTimeoutSeconds

o  Can include a positive integer value. Default is "60"

SMA-CMS_82.docx

Version: 1.0.23049

Page 74 of 178

SMA-CMS Customizing Suite for SMA

o  The  effect  of

this  setting  also  depends  on

the  configuration  of  setting

"PersonSessionTimeoutEdit".

o

"PersonSessionTimeoutEdit" is filled with value "false":



If the setting PersonSessionTimeout has the value true, this setting specifies the

timeout in seconds when a logged in person is logged out.

o

"PersonSessionTimeoutEdit" is filled with value "true":

  The  field  Timeout  seconds  is  initially  assigned  this  value  (if  no  information  is

stored in the browser cache) on the person login page in tab Settings.

-  PersonSessionTimeoutEdit

o  Valid values are "true" and "false" (default).

o

true: When  a  person  logs  in,  the  person  can  specify  the  values  for  the  configuration  to

activate the Timeout and the Timeout seconds on the person login page in tab Settings.

o

false: Only the configuration of the Web.config for the settings "PersonSessionTimeout"

and  "PersonSessionTimeoutSeconds"  are  valid  for  the  "timeout"  function.  No  changes

are possible when a person logs in.

-  PersonSessionLkTimeout

o  You can store a language key. Default is " " (empty)

o

If the configuration includes a language key, this key is translated and displayed before

timeout (if configured and active).

o

If  no  relevant  language  key  is  found,  the  text  is  directly  displayed  before  timeout  (if

configured and active).

-  LogOutRemoveUser

o  Valid values are "true" and "false" (default).

o

true:  When  a  user  logs  out,  the  login  information  is  removed.  The  field  User  is  not

prepopulated on the user login page.

o

false:  When  a  user  logs  out,  the  login  information  is  still  used  to  prepopulate  the  field

User on the user login page.

-  LogOutRemovePerson

o  Valid values are "true" and "false" (default).

o

true:  When  a  person  logs  out,  the  login  information  is  removed.  The  fields  Person  and

Badge are not prepopulated on the person login page.

o

false: When a person logs out, the login information is still used to prepopulate the fields

Person and Badge on the person login page.

-  LogOutLinkToHome

o  Valid values are "true" and "false" (default).

o

true:  After  logout  and  a  successful  re-login,  the  login  page  directs  to  the  start  page

(home).

o

false: After logout and a successful re-login, the login page directs to the page that was

last opened when logged out.

-  NHibernateDbName

SMA-CMS_82.docx

Version: 1.0.23049

Page 75 of 178

SMA-CMS Customizing Suite for SMA

o  Can include a name. Default is " " (empty)

o  Only the letters a-z, A-Z and _ are allowed

o  The name must end with ".db"

o  Specifies the name of the SMA database. This database is used by some applications to

store global SMA settings. Independent of the browser cache.

o  The default " " (empty) creates a file of name SMA.db

o  Do not change this setting.

-  NHibernateDbPath

o  Can include a Windows path. Default is " " (empty)

o  The default " " (empty) refers to the directory "C:\temp\SMA-DB"

o  The SMA database is stored in this directory. This database is used by some applications

to store global SMA settings. Independent of the browser cache.

o  The  default  path  or  the  configured  path  must  have  the  same  rights  as  the  log  directory

(LogFolder)

SMA-CMS_82.docx

Version: 1.0.23049

Page 76 of 178

SMA-CMS Customizing Suite for SMA

2.4.6 How to configure a PZE Terminal on the MOC

Create a PZE terminal with terminal number 254 and type 254.

System administration  Terminals  Terminal configuration

You  must  be  careful  to  use  the  terminal  type  254  in  the  terminal  configuration.  This  terminal  type

specifies the terminal as SMA terminal. This terminal type is not used when the licenses (e.g. AIP-HRF)

are  calculated  and  when  system  parameters  for  terminals  are  identified.  This  specification  ensures  that

the number of required licenses is correctly calculated.

Define a PIN code for all persons who should use this function.

Master data  Staff  HR master data

2.4.7 MW3.0 services with MW2.1 system

Install the MW3.0 services for each MW2.1 system you want to connect. For this purpose, Tomcat/WSP

must  be  installed  on  the  relevant  system  and  connected  with  the  MW2.1  system.  Install  the  current

version of the MW3.0 Java package.

The following instructions apply:

-

-

MW30 document: Inst_hydra_mw30.pdf

Document to install the MOC with MW 3.0 on an MW 2.0 / 2.1 system: inst_moc30-mw20-21.pdf

How to proceed:

SMA-CMS_82.docx

Version: 1.0.23049

Page 77 of 178

SMA-CMS Customizing Suite for SMA

-

-

-

-

-

Disable the environment variable JHYDRADIR

Install Tomcat/WSP (memory: 1024 MB)

Configure JHYDRADIR according to the specifications included in the MW30 document.

Import the Java package according to the MW30 document

Configure the path Spoolwsc

2.4.7.1

Tomcat/WSP is already installed

Install  a  current  MaintenanceManager  (2),  if Tomcat/WSP  is  already  installed.  Then  you  can  import  the

current JavaPackage.

Important: HYDRA's Java interface must run (can be checked/started via the HYDRA manager)

Important:  With  MW  2.1,  every  SMA  client  occupies  one  HYD-KE  license  (console  license).  If  you  use

SMA as a time and attendance client, a corresponding number of licenses should be available.

2.4.7.2  Applications for MW2.1

The following applications have been tested for MW2.1 and/or note the following exceptions:

General:

Service pack, week 49/2013 must be available in order to enable the installation with MW2.1

Time recording:

The program hyt_stmparc (version 7.2.1.22) must be available in the HYDRA server directory in order to

use all time & attendance functions with MW2.1. Important: Required version at least 7.2.1.22

Windows: hyt_stmparc.exe

Linux: hyt_stmparc.out

2.4.8 HTTPS activation – client to SMA server

If you want to secure the connection to the SMA server via HTTPS, then activate HTTPS as follows:

First  of  all,  provide  a  certificate  for  the  secured  connection.  To  do  so,  click  the  IIS  menu  item  "server

certificates":

SMA-CMS_82.docx

Version: 1.0.23049

Page 78 of 178

SMA-CMS Customizing Suite for SMA

The dialog that opens shows the available certificates and the different methods to create new certificates

or to import existing certificates:

This example recommends creating a self-signed certificate ("Create self-signed certificate").

Use "MPDV SMA" as the certificate name:

SMA-CMS_82.docx

Version: 1.0.23049

Page 79 of 178

SMA-CMS Customizing Suite for SMA

Enter  the  name  and  confirm  by  clicking  OK.  Then  double-click  the  created  certificate  to  specify  its

thumbprint.

Copy the thumbprint and keep it for later use.

SMA-CMS_82.docx

Version: 1.0.23049

Page 80 of 178

SMA-CMS Customizing Suite for SMA

Then add an https site binding to the IIS.

To do so, select the option "Bindings..." in the SMA folder of IIS.

Select "Add..." in the "Site bindings" dialog that opens.

The following dialog is displayed:

Select "https" as the site binding type. We recommend using port 9092.

You can also choose any other free ports.

For the "SSL certificate" option, select the certificate "MPDV SMA" to secure the https connection.

If your IT department provides a specific certificate, you can select it alternatively.

SMA-CMS_82.docx

Version: 1.0.23049

Page 81 of 178

If required, remove the "insecure" connection via "http":

SMA-CMS Customizing Suite for SMA

Finally, restart the IIS server service.

You can now reach the SMA server via the address https://<SMA-Server>:9092/ (see example).

2.4.9 HTTPS activation – SMA server to HYDRA

If the HYDRA Instance  Service provides an address via the https protocol, the  SMA server connects to

HYDRA via https protocol.

2.4.9.1  Configuration in SMA

If the HYDRA Instance Service expects a connection with the https protocol, you must specify the value

for  the  entry  "MasterServer"  with  protocol  in  the  SMA  configuration  file  (default  storage  location:

c:\inetpub\wwwroot\SMA\Web.config).

Important: You must use the "fully qualified domain name"

Example: https://server.company.de

2.4.9.2  Configuration in HYDRA

Specify  the  entry  for  the  system  with  the  https  protocol  in  the  HYDRA  Instance  Service  configuration

(Instancerepo.properties) as follows:

CONFIG: HYDRA\HyInstMgrDir\Instancerepo.properties

HYDRA.host.1=https://<HYDRA-server>.<domain>

IMPORTANT!

SMA-CMS_82.docx

Version: 1.0.23049

Page 82 of 178

SMA-CMS Customizing Suite for SMA

This entry also affects the system selection during MOC login! If the SMA server communicates with HYDRA via

HTTPS, then the MOC must do the same!

Important: You must use the "fully qualified domain name"

The WSP configuration (application.properties) must be extended by an SSL certificate so that the WSP

communicates via https. Example:

CONFIG: HYDRA\WSP\config\application.properties

server.ssl.key-store=<HYDRA>\\certs\\<ssl-key-store>.jks

server.ssl.key-store-password=<key-store-password>

IMPORTANT!

If the SMA server communicates with HYDRA via HTTPS, then the MOC must do the same!

2.4.10  MQTT

Some SMA applications can update data via push notifications. You use MQTT for this feature. You use

the WebSocket protocol for the connection to the MQTT broker.

Important:  The  browser  directly  connects  to  the  MQTT  broker.  It  might  be  required  to  change  the  IT

infrastructure here. Consider this for the system architecture.

The connection is made according to the configuration stored in HYDRA for the MQTT broker.

2.4.11  Label printing

If  you  use  the  data  collection  functions,  you  can  also  trigger  a  label  print  if  a  relevant  configuration  is

available for the data collection functions in HYDRA.

In SMA, you must only specify the label print service in the SMA configuration.

SMA  configuration  file  (default  storage  location:  c:\inetpub\wwwroot\SMA\Web.config):  Set  the  value

for the setting "LabelPrinterService".

Example: http://<label-printer-service-server>:<port>/

2.4.12  Optional: Import SMA function profile

The  database  patch  dbp_sma_function_profiles.hsc  creates  an  SMA  function  profile  that  includes  all

currently available SMA functions authorizations.

SMA-CMS_82.docx

Version: 1.0.23049

Page 83 of 178

SMA-CMS Customizing Suite for SMA

2.5  Test SMA

In order to test SMA applications successfully, create a user with appropriate SMA function authorizations

(see section 2.4.12).

Start the application in the web browser (important: as stated in the specifications, you need an HTML5

capable browser. See also the HW_SW_GUIDE.pdf; section 3 HYDRA Smart MES Applications (SMA).)

http://%hostname%:[port]

Example:

http://mos-srv-01:8082

Click Workplaces / machines

SMA-CMS_82.docx

Version: 1.0.23049

Page 84 of 178

SMA-CMS Customizing Suite for SMA

User: 12345

HYDRA password (by default: mpdv)

SMA-CMS_82.docx

Version: 1.0.23049

Page 85 of 178

SMA-CMS Customizing Suite for SMA

Click the Home button

SMA-CMS_82.docx

Version: 1.0.23049

Page 86 of 178

Click Time and attendance:

SMA-CMS Customizing Suite for SMA

Click In

Click OK

SMA-CMS_82.docx

Version: 1.0.23049

Page 87 of 178

SMA-CMS Customizing Suite for SMA

The clock-in has been carried out.

2.6  SMA 8.2 installation

2.6.1 Executing database scripts

Start  the  MS-DOS  prompt  on  the  server  in  the  [server  installation  directory]  and  run  the  following

database script:

hydscr.exe ./db_sql/dbp_digital_production_meeting.hsc

2.6.2 How to activate licenses

Start  the  MS-DOS  prompt  on  the  server  in  the  [server  installation  directory]  and  run  the  following

activation script:

hyd_prodinf.exe -f sma82.activation

SMA-CMS_82.docx

Version: 1.0.23049

Page 88 of 178

SMA-CMS Customizing Suite for SMA

2.6.3 Installing Dotnet Core and ASP.NET Core Runtime

After the download (https://dotnet.microsoft.com/download/dotnet-core/3.0) of the installation packages of

.NET Core Runtime und ASP.NET Core Runtime according to the relevant server architecture, you must

install the installers in the server as described on the download page.

2.6.4 Setting up the web host

All steps that follow are performed below the directory [server installation directory]\webhost\apiprovider.

The  web  host  hosts  the  SMA  8.2  applications  and  provides  access  to  the  backend.  This  requires  a

technical user. The user's login information must be stored in the configuration.

All configurations are made in the file config_webclient.xml.

Configure the following entries:

RemoteEndpoint: Address where the WSP is available.

UserName: Technical user used to access the WSP

Password: Encrypted password of the technical user

For  security reasons, the password in not  saved in plain text in the configuration file, but  in encrypted form. To

generate

the

password,

open

the

prompt,

change

to

the

directory

[server

installation

directory]\webhost\apiprovider\bin and call  Mpdv.WebHost.exe using  the  parameter  --encode. Enter

the encrypted password. The encrypted password is then output on the console and can be copied.

AspCli:  Protocol  (http,  https)  and  port  (default  value:  5000)  used  to  call  the  SMA  application.  If  you  use  https,

also perform the configuration as described in section "Installing HTTPS".

2.6.5 Generating function authorizations

With  MW3.x,  the  use  of  the  REST  interface  must  be  authorized  for  each  SMA  user  by  assigning  the  relevant

function authorization. Generate the function authorization Svc:* for each SMA user (also the technical user

of the web host) or assign a function profile to activate the authorization.

SMA-CMS_82.docx

Version: 1.0.23049

Page 89 of 178

SMA-CMS Customizing Suite for SMA

2.6.6 Installing HTTPS

The  section  below  describes  the  requirements  and  how  to  proceed  to  install  an  encrypted  connection

between web host and browser.

Requirements

You  require  a  PKCS12  server  certificate  for  the  HTTPS  configuration.  The  PKCS12  certificate  must

include the complete certificate chain.

The certificate must be provided by the customer in the host server of the web host. If the certificate is not

provided via the Windows certificate store, but as PFX file, then the password of the PKCS12 certificate

must be available to perform the configuration.

The  PKCS12  certificate  must  be  issued  for  the  fully  qualified  host  name.  Other  alternative  names  are

possible, but are not used by MPDV.

The public certificate of the certification authority must be installed in the clients and in the host server of

the web host.

The customer must monitor the validity of the server  certificate. The server certificate must be renewed

before the validity expires.

Web host configuration

The following configuration entry in the file appsettings.json activates the communication via HTTPS. The

configuration defines where the web host will find the certificate to establish an encrypted connection. To

connect to the certificate, you can use the Windows certificate store or the file system, if you specify the

path of a certificate file.

Example of an appsetting.json with the relevant configuration entry. Here, the certificate is provided in the

certificate store:

Provision via certificate store

SMA-CMS_82.docx

Version: 1.0.23049

Page 90 of 178

SMA-CMS Customizing Suite for SMA

The  certificate  is  linked  via  the  certificate  store  using  the  following  configuration  in  the

file

appsettings.json.

  Subject - fully qualified domain name of web server including the certificate. This is the Common

Name (CN) of the certificate.

  Store - Name of certificate store (MY = personal certificates)

  Location - Certificate store of local host (LocalMachine) or of current user (CurrentUser)

"Kestrel": {

"Certificates": {

"Default": {

"Subject": "mos-pd-vmw4.mpdv.local",

"Store": "MY",

"Location": "LocalMachine"

}

}

}

Provision via .pfx certificate file

The certificate is linked via a certificate file using the following configuration in the file appsettings.json.

  Path - path to the certificate file

  Password - password of certificate

"Kestrel": {

    "Certificates": {

        "Default": {

        "Path": "d:\\Webhost\\certs\\mos-pd-vmw4.mpdv.local.pfx",

        "Password": "password"

        }

    }

}

2.6.7 Web host installation as Windows service

1.  Open a prompt in the webhost\apiprovider directory.
2.  Start the installation routine of the service.

nssm.exe install "Webhost"

3.  Click the field to select the path. In the dialog, select the file run.bat.

SMA-CMS_82.docx

Version: 1.0.23049

Page 91 of 178

SMA-CMS Customizing Suite for SMA

4.  Click Install service.
5.  Open the Windows application Services and start the service you created.

The  web  host  is  now  available  with  the  URL  of  the  host  name  and  via  the  port  specified  in  the

configuration file.

2.6.8 Special notes

  Restart the web host service when you have imported licenses. It is possible that users must log

out and log in again.

2.7  Install the SMA app

2.7.1

iOS – SMA App

2.7.1.1  Check requirements

1.)  SMA is already installed.

2.)  Apple Mobile Devices with operating system iOS 7.1 (or higher)

3.)

Internet connection available on the device

2.7.1.2

Install SMA on the Apple Mobile Device

The Apple Store delivers SMA for iOS. Go to the Apple Store of the device and search for the SMA app:

SMA-CMS_82.docx

Version: 1.0.23049

Page 92 of 178

SMA-CMS Customizing Suite for SMA

You can install the app as usual.

2.7.1.3

Start the application

The  overview  of  all  installed  applications  shows  an  icon  called  "SMA".  Use  this  icon  to  start  the

application. Clicking the icon starts the application.

An input field appears on the screen. Enter the IP address of the SMA server and its port in this field.

Structure: <SMA server>:<Port>

Example: 10.11.12.13:8082

This entry is stored in the app cache, once a successful connection to the SMA server has been set up.

When  you  start  the  SMA  app  the  next  time,  the  system  automatically  attempts  to  connect  to  the  last

successfully connected SMA system.

2.7.2  Android - SMA app

2.7.2.1  Check requirements

1.)  SMA is already installed.

2.)  The SMA installation includes the required files.

a.  SMA server installation (mostly: C:\inetpub\wwwroot\SMA)

SMA-CMS_82.docx

Version: 1.0.23049

Page 93 of 178

SMA-CMS Customizing Suite for SMA

b.  SMA_armv7.apk available (mostly: C:\inetpub\wwwroot\SMA\Android)

c.  SMA_x86.apk available (mostly in: C:\inetpub\wwwroot\SMA\Android)

2.7.2.2

Transfer APKs to Android device

1.)  According to the process architecture, transfer the package SMA_armv7.apk or SMA_x86.apk to

the device.

2.)  You can choose from the following options to transfer APKs to the Android device:

a.  via USB

i.  Copy the relevant APK to a computer that includes the required drivers to receive

data from an Android device.

ii.  Connect the device with the computer.

iii.  Transfer the corresponding APK to the device.

b.  via download

i.  Open the following website in the browser of the device:

1.  SMA_armv7.apk:

http://<SMA server>:<Port>/Android/SMA_armv7.apk

2.  SMA_x86.apk: http://<SMA server>:<Port>/Android/SMA_x86.apk

ii.  Files are stored in the download folder.

2.7.2.3  APK installation

If you download APKs to the device, the APK files are included in the download history of the device.

If you transfer APKs to the device via USB, the APK files are included in the folder you selected during

the transfer.

SMA-CMS_82.docx

Version: 1.0.23049

Page 94 of 178

SMA-CMS Customizing Suite for SMA

If the device's security policies prevent APKs from being installed, go to the device's properties and allow

installation of "unknown sources".

Depending  on  the  Android  version  and  manufacturer,  you  can  find  the  settings  for  installing  "unknown

sources" elsewhere. If you cannot find the settings, ask your IT department how to enable the installation

of "unknown sources" for APK files with your device and Android version.

2.7.2.4

Start the application

The  overview  of  all  installed  applications  shows  an  icon  called  "SMA".  Use  this  icon  to  start  the

application. Clicking the icon starts the application.

An input field appears on the screen. Enter the IP address of the SMA server and its port in this field.

Structure: <SMA server>:<Port>

Example: 10.11.12.13:8082

This entry is stored in the app cache, once a successful connection to the SMA server has been set up.

When  you  start  the  SMA  app  the  next  time,  the  system  automatically  attempts  to  connect  to  the  last

successfully connected SMA system.

2.8  Tips + Tricks

2.8.1 Write permissions to the log directory

You need SMA write permissions to the log directory. You can configure this log directory in the

WEB.config file.

In  order  for  the  SMA  to  function  properly,  the  user  executing  the  IIS  must  have  full  access  to  the  log

folder, as configured in c:\inetpub\wwwroot\SMA\WEB.config.

Right-click the log folder  Properties, here: SMA

SMA-CMS_82.docx

Version: 1.0.23049

Page 95 of 178

SMA-CMS Customizing Suite for SMA

Go to the tab Security and assign full access to the user whose name starts with IIS.

2.8.2 The IE cannot identify mouse clicks

It is a security problem if the IE does not identify mouse clicks. The security settings for the website are

too high and scripting is disabled.

In order to change this, enable scripting for the zone Internet and/or for trusted sites.

SMA-CMS_82.docx

Version: 1.0.23049

Page 96 of 178

SMA-CMS Customizing Suite for SMA

SMA-CMS_82.docx

Version: 1.0.23049

Page 97 of 178

SMA-CMS Customizing Suite for SMA

2.8.3 HTTP Error 403.14 - Forbidden

If  the  Windows  Server  2008  R2  shows  an  error  message  403.14  instead  of  the  home  screen,  the

following patch might not have been installed on the system: "Update for Windows Server 2008 R2 x64

Edition (KB980368)“.

You can download this patch from the following address:

http://www.microsoft.com/de-DE/download/details.aspx?id=5272

2.8.4 McAfee VirusScan Enterprise (VSE) 8.8 Patch 4

If  this  version  of  the  McAfee  VirusScan  is  installed  on  the  SMA  server,  then  SMA  cannot  work  without

errors as this  version changes the meta-information  of files and therefore considerably  affects the SMA

system behavior.

For details on the topic, refer to: https://community.mcafee.com/thread/74874?start=0&tstart=0

Or to: https://kc.mcafee.com/corporate/index?page=content&id=KB81595

You can solve this issue by  installing patch 5 for McAfee VirusScan Enterprise  (VSE) 8.8. The problem

has been sorted for this version of the VirusScan.

2.8.5 Request the SMA installation version

From  revision  "42972"  of  the  SMA  installation  (dated  17  December  2015),  you  can  use  the  following

command to get the version of the SMA installation via a browser:

http://<SMA-Server>:<SMA-Port>/?fct=GetVersion

A site with the following content is displayed:

SMA Revision 42972

2.8.6 window.localStorage – path cannot be found

Problem:

SMA-CMS_82.docx

Version: 1.0.23049

Page 98 of 178

SMA-CMS Customizing Suite for SMA

Problem: The local storage is unknown to the Internet Explorer.

Cause:

A  "cleaning"  software  was  executed  with  administrator  rights.  This  software  changed  the  rights  of

files/folders. The XML files storing the local storage entries were also affected.

Effect:

That means, the user has no longer access rights to these files and/or cannot create files.

Solution:

Rename the following folder:

C:\Users\<user>\AppData\Local\Microsoft\Internet Explorer\DOMStore in DOMStore_save

Restart the IE.

Challenge:

The storage location varies from operating system to operating system and from IE version to IE version.

SMA-CMS_82.docx

Version: 1.0.23049

Page 99 of 178

SMA-CMS Customizing Suite for SMA

3  SMA Scripting

3.1  Introduction

This document describes the processing of SMA scripts.

In SMA, two types of scripts are available:

Changes to standard applications

Customer-specific applications

The following links can be helpful for the development:

jQuery: http://jquery.com/

jqPlot: http://www.jqplot.com/

moment.js: http://momentjs.com/

Bootstrap: https://getbootstrap.com/docs/3.3/css/

3.2  General

3.2.1 Reading the current SMA version

To read your current SMA version, open a browser and enter the following:

<server>:<port>/?fct=getversion

The output is as follows:

"SMA Revision 57709"

3.2.2 Activating SMA logging

The file "SMA.log" contains the logging of the SMA server. You can configure the file directory and the log

level in the file "WEB.config" in the installation directory of the SMA server.

To activate the logging, make the following changes:

SMA\Web.config:

<appSettings>
    <!-- as default set to: C:\temp\SMA-Log -->
    <add key="LogFolder" value="C:\temp\SMA-Log" />

SMA-CMS_82.docx

Version: 1.0.23049

Page 100 of 178

SMA-CMS Customizing Suite for SMA

    <!-- LogLevel: Off|Trace|Debug|Info|Warn|Error|Fatal default = Off -->
    <add key="LogLevel" value="Trace" />

3.2.3 SMA structure

Create the following directory structure below the installation directory of the SMA server:

[Android]

[Areas]

[bin]

[Content]

[Custom]

            [Areas]

            [Content]

            [Scripts]

            [Views]

            [www]

[Help]

[Local]

            [Areas]

            [Content]

            [Scripts]

            [Views]

            [www]

[Mappings]

[Runtime]

[Scripts]

[Views]

Web.config

favicon.ico

CanConnect.html

NLog.xsd

packages.config

3.2.3.1  Areas

The folder Areas includes all standard applications.

Example for "Workplaces/machines"

\SMA\Areas\Resource\Views\Resource\index.cshtml

SMA-CMS_82.docx

Version: 1.0.23049

Page 101 of 178

SMA-CMS Customizing Suite for SMA

3.2.3.2  Custom or Local

The folder "Custom" includes all customer-specific applications, which were created by MPDV.

The folder "Local" includes all customizations, which were created by the customer.

The substructure is the same in both folders.

3.2.3.2.1  Areas

  The folder "Areas" includes all standard applications, which have been changed by MPDV/the

customer.

Example:

\SMA\Custom\Areas\Resource\Views\Resource\Index.cshtml

for

the  application

"Workplaces/machines".

  Data collection applications: \SMA\Custom\Areas\DataCapturing\DataCapturing.config.xml

or \SMA\local\Areas\DataCapturing\DataCapturing.config.xml

  Web service configuration: \SMA\Custom\Areas\CustomService\Configurations\

or \SMA\local\Areas\CustomService\Configurations\

3.2.3.2.2  Views

In the folder "Views", you can change the Home screen.

\SMA\Views\Home\menu.xml

or \SMA\Views\Home\menu_add.xml

For more details, see section "Integrating an application in the Home screen".

3.2.3.2.3  www

Storage location for customer-specific applications:

css

js

html

3.2.3.3  Runtime

3.2.3.3.1

Language key

You use the directory "Runtime" to store the respective language keys/translations.

Standard: \SMA\Runtime\resources\standard\languages\

SMA-CMS_82.docx

Version: 1.0.23049

Page 102 of 178

SMA-CMS Customizing Suite for SMA

Custom: \SMA\Runtime\resources\custom\languages\

Local: \SMA\Runtime\resources\local\languages\

3.2.3.3.2  Storage location for web services:

Standard:

Properties: \SMA\Runtime\resources\standard\data\properties\

Services: \SMA\Runtime\resources\standard\data\services\

The  subdirectory  "Standard"  includes  the  Configuration.xml  and  GuiConfiguration.xml  of  the

standard.

Custom:

Properties: \SMA\Runtime\resources\custom\data\properties\

Services: \SMA\Runtime\resources\custom\data\services\

In the subdirectory "Custom", the Configuration.xml and GuiConfiguration.xml are stored by MPDV.

Local:

Properties: \SMA\Runtime\resources\local\data\properties\

Services: \SMA\Runtime\resources\local\data\services\

In  the  subdirectory  "Local",  the  Configuration.xml  and  GuiConfiguration.xml  are  stored  by  the

customer.

3.2.4 Custom web services

If  a  customer-specific  web  service  has  been  created,  the  files  configuration.xml  and  do.xml  must  be

stored in the SMA directory and additionally in the following directories:

<server>\jhydradir\MOC\1\listInterpreter\custom\. for changes made by MPDV or

<server>\jhydradir\MOC\1\listInterpreter\local\. for changes made by the customer.

SMA-CMS_82.docx

Version: 1.0.23049

Page 103 of 178

SMA-CMS Customizing Suite for SMA

3.2.5 Changing the language


Note

GUI texts are texts included in *.cshtml files. Texts integrated into the GUI using a

script/data are not included.

If you have created/customized mapping files,  you must restart the SMA server.

Changes only become effective after the restart.

Changing the language

All GUI texts in SMA applications use language keys.

Assignment of language keys to the currently used language:

Mapping files of the standard: SMA\Runtime\resources\standard\languages

Mapping files of MPDV: SMA\Runtime\resources\custom\languages

Mapping files created by the customer: SMA\Runtime\resources\local\languages

Language keys existing in the "local" scope overwrite standard language keys.

Standard

MPDV Customizing

Customer

lkHome = Home

Result

Home

lkHome = Home

lkHome = Your Home

Your Home

lkHome = Home

lkHome = My Home

My Home

lkHome = My Home

My Home

Finding the language keys used / customizing pages:

Special case Home screen (menu.xml)

Heading of a page (example "SMA\Views\Home\Index.cshtml“)

  ViewBag.Title = Html.Translate("lkHome");

SMA-CMS_82.docx

Version: 1.0.23049

Page 104 of 178

SMA-CMS Customizing Suite for SMA

3.2.6 Show progress bar

To show a progress/loading bar, the following functions are available:

3.2.6.1

Infinite loading bar

$mpdv.progress.showDefaultProgress();

3.2.6.2

Loading bar showing progress

The value can be specified from 0 to 100:

$mpdv.progress.showProgress(value);

Example:

-

$mpdv.progress.showProgress(0);

-

$mpdv.progress.showProgress(50);

-

$mpdv.progress.showProgress(80);

SMA-CMS_82.docx

Version: 1.0.23049

Page 105 of 178

SMA-CMS Customizing Suite for SMA

3.2.6.3  Update

To implement an update for a progress bar, you must implement the following:

$mpdv.progress.updateProgress(value);

3.2.6.4  Reset

To reset a loading bar, use the following function:

$mpdv.progress.hideAndClearProgress();

3.3  Changes to Standard Applications

3.3.1 Customize applications

3.3.1.1  General

Customizing a page using the example "Workplace/machine overview"

Copy

the

original

application

"SMA\Areas\Resource\Views\Resource\Index.cshtml"

to

"SMA\Local\Areas\Resource\Views\Resource\Index.cshtml".

Copy

the

file

Web.config

"SMA\Areas\Resource\Views\Web.config"

to

"SMA\Local\Areas\Resource\Views\Web.config".

Now you can change the file Index.cshtml in "SMA\Local\Areas\Resource\Views\Resource\“.

If you change MPDV standard applications, the system always loads the customized pages.

That means:

  You cannot make use of MPDV's further developments for the application, as the

system always uses the customized application by default.

  Therefore, no bug fixes can be issued for customized applications.

The

customer

is

responsible

for

customized

applications.

3.3.2 Web service calls

To integrate a web service in JavaScript, two functions are available.

The question if a filter parameter is required or not, identifies the correct web service.

SMA-CMS_82.docx

Version: 1.0.23049

Page 106 of 178

SMA-CMS Customizing Suite for SMA

3.3.2.1  Call without filter

$.post("/CustomService/CustomService/GetData", {
  configName: "training_mdunits_list"
})
.done(function (data) {
  console.log(data);
})
.fail(function (data) {
  showError(data);
});

3.3.2.2  Call with filter parameter

$.post("/CustomService/CustomService/GetData", {
  configName: "training_mdunits_list",
  filterJson: '{"Parameters":{"units.unit": {"0":"ST"}}}'
})
.done(function (data) {
  console.log(data);
})
.fail(function (data) {
  showError(data);
});

3.3.3 MPDV data collection - Version 1

You require the license "SMA-AMF" for the data collection applications of MPDV in SMA.

Configure the data collection in the following file:

SMA\Custom\Areas\DataCapturing\DataCapturing.config.xml

or

SMA\Local\Areas\DataCapturing\DataCapturing.config.xml

If the file "DataCapturing.config.xml" is not available:

Copy the file  "DataCapturing.config.bsp.xml" and rename it to "DataCapturing.config.xml". Then change

the file "DataCapturing.config.xml".

The "type" specifies which data collection function is started. If you customize a data collection function

that is available by default (e.g. A_AN), this standard function is overwritten.

SMA-CMS_82.docx

Version: 1.0.23049

Page 107 of 178

SMA-CMS Customizing Suite for SMA

3.3.3.1  Calling a data collection application

Calling a data collection application

http://<SMA-Server>:<Port>/DataCapturing/DataCapturing?captureType=<Type>

The parameter <type> includes the name of a configured data collection function.

Example: "Capturing" with attribute "Type“ and value "A_AN“ exists:

http://<SMA server>:<Port>/DataCapturing/DataCapturing?captureType=A_AN

Calling a data collection application with transfer of value:

Example:

http://<SMA-

Server>:<Port>/DataCapturing/DataCapturing?captureType=A_AN&MNR=1168&ANR=000040450010&MST=1

3.3.3.2  Configuration of a <Snippet>

Attribute:

Type: specifies the value type (ANR, MNR, …)

Lk: display name (language keys can be used)

InputType: "text“, "number“ or "password“; "text" is used by default

3.3.3.2.1  Selection list

SelectionList

If the value is set to "true“, a web service must be configured in the child nodes.

SMA-CMS_82.docx

Version: 1.0.23049

Page 108 of 178

SMA-CMS Customizing Suite for SMA

3.3.3.2.2  Displaying units

UnitList

If  the  values  of  both  attributes,  "UnitList"  and  "SelectionList",  are  set  to  "true",  a  web  service  must  be

configured in the child nodes.

3.3.3.2.3  Dependencies

IsDependent

If the value is set to "true", the data is only loaded if the following conditions are fulfilled:

  A selection dialog is opened.

  An element responsible for the display of the unit has been changed.

DependingOn

Here, you define the dependent snippet.

For example, the display of a unit can depend on the order.

DependingFilterAcronym

SMA-CMS_82.docx

Version: 1.0.23049

Page 109 of 178

SMA-CMS Customizing Suite for SMA

If  the  attributes  "SelectionList“,  "IsDependent“  and/or  the  snippet  "UnitList“  is  set  to  "true“  and  a

dependency  to  a  snippet  is  defined  in  the  attribute  "DependingOn“,  then  you  can  dynamically  set  a

configured filter in the web service configuration of the "snippet".

The attribute "DependingFilterAcronym" refers to the configured filter that you want to set.

Example: A filter by  the  operation number is set when the  unit for  yield  is requested (depending on the

selected operation).

DependingFilterAcronym (illustrated with an example):

<Snippet Type="EGR:GUT" Lk="lkYieldQuantity" InputType="number" SelectionList="true" UnitList="true"
IsDependent="true" DependingOn="ANR" DependingFilterAcronym="operation.id">
 <WebService Name="BOOperationOverview" />
 <ResultParameters Primary="operation.plan.unit.base"/>
 <FilterParameters>
  <Parameters>
   <Parameter Acronym="operation.id" WebServiceType="string" InputAsArray="Y" Operator="IN">
    <Values>
     <string></string>
    </Values>
   </Parameter>
  </Parameters>
 </FilterParameters>
</Snippet>

"The value of the "snippet" ANR is used as value for the filter operation.id to request the unit.

3.3.3.2.4  Return parameter of the service

DefaultViaService

If  the  value  is  set  to  "true“,  you  can  identify  the  default  value  via  the  web  service  configuration  that  is

included in the child nodes of the "snippet".

<Snippet Type="TLG" Lk="lkoperation.partitioning.target" InputType="text" DefaultViaService="true"
 DefaultValue="operation.partitioning.target" IsDependent="true" DependingOn="ANR" DependingFilterAcronym="operation.id">
  <WebService Name="BOOperationOverview" />
  <ResultParameters Primary="operation.partitioning.target"/>
  <FilterParameters>
    <Parameters>
      <Parameter Acronym="operation.id" WebServiceType="string" InputAsArray="Y" Operator="IN"/>
    </Parameters>
  </FilterParameters>
</Snippet>

3.3.3.2.5  Setting the default of a field

DefaultValue

SMA-CMS_82.docx

Version: 1.0.23049

Page 110 of 178

SMA-CMS Customizing Suite for SMA

If no value is passed in the request, this value is set as default in the "snippet".

Example, preassignment of the badge number.

<Snippet Type="KNR" Lk="lkperson.card_id" InputType="number" SelectionList="false"
DefaultValue="GET_USER" Invisible="false"/>

GET_USER provides the value of the user logged on.

3.3.3.2.6

Further attributes of a snippet

Invisible: "Snippet" is not displayed.

Passes default value/transferred value (URL) in the background.

<Snippet Type="KNR" Lk="lkperson.card_id" InputType="number"
SelectionList="false"  DefaultValue="GET_USER" Invisible="true"/>

Readonly: "Snippet" cannot be edited.

Protects a transferred value:

<Snippet

Type="MNR"

Lk="lkWorkplace"

InputType="text"

SelectionList="false"

Readonly="true"/>

AdditionalClasses: Permits to set style sheet classes for the "snippet".

Recommended class: "dottedDataCaptureBottomBorder“.

3.3.3.2.7

Forwarding

Forwarding after completion of data collection:

Forward to customized page

Set the transfer parameters:

returnArea  for customized pages = "CustomService"

returnController  for customized pages = "CustomService"

returnAction  for customized pages = "Index"

returnCustomPageId  <application> (example: schulung_ws)

SMA-CMS_82.docx

Version: 1.0.23049

Page 111 of 178

SMA-CMS Customizing Suite for SMA

Note:

Do not configure the attributes "SubmitButtonDestinationArea“, "SubmitButtonDestinationController“

and "SubmitButtonDestinationAction“. Otherwise the parameters transferred are ignored.

Forwarding to a customized page in SMA. Examples:

For example, using a configuration:

<Capturing Type="A_AN" Lk="lkAAn" SubmitButtonLk="lkLog_on"
SubmitButtonDestinationArea="CustomService"
SubmitButtonDestinationController="CustomService"
SubmitButtonDestinationAction="Index"
SubmitButtonDestinationPageId="schulung_ws">

<Snippets>

For example, using a transfer parameter in the URL:

http://<SMA server>:<Port>/DataCapturing/DataCapturing?captureType=A_AN

&returnArea=CustomService&returnController=CustomService

&returnAction=Index&returnCustomPageId=schulung_ws

3.3.4 MPDV data collection - Version 2

Version 2 is used as of service pack 13.

You can find the standard configurations of data collection functions in:

SMA\Areas\DataCapturing2\Configurations\

The configuration is described here:

SMA\Areas\DataCapturing2\Configurations\DataCapturing2.config.bsp.xml

Storage location for data collection functions you customized:

SMA\Custom\Areas\DataCapturing2\Configurations\

or

SMA\Local\Areas\DataCapturing2\Configurations\

This directory imports all files (also files stored in subfolders) matching the following pattern:

SMA-CMS_82.docx

Version: 1.0.23049

Page 112 of 178

SMA-CMS Customizing Suite for SMA

DataCapturing2.*config.xml

Example: DataCapturing2.cut_sma.config.xml

You can configure multiple data collection functions in one configuration file for data collection functions.

For a better overview, we recommend to use one data collection function per configuration file.

3.3.4.1  Request a data collection application

Request a data collection application

http://<SMA-Server>:<Port>/DataCapturing2/DataCapturing2?captureId=<Id>

The parameter <Id> includes the ID of a configured data collection function.

Example: "Capturing" with attribute "Type“ and value "A_AN_2":

http://<SMA server>:<Port>/DataCapturing2/DataCapturing2?captureId=A_AN_2

Request a data collection application and transfer values:

Example:

http://<SMA-

Server>:<Port>/DataCapturing2/DataCapturing2?captureId=A_AN_2&MNR=1168&ANR=000040450010&MST=1&can

celUrl=/

You  can  use  the  parameters  CancelUrl  or  SubmitUrl  to  declare  the  target  URLs  when  you  have

interrupted or completed the data collection function.

The URL /DataCollection/DataCollection is set by default.

3.3.4.2  Configuration of a <Capturing>

<Capturing Id="" Type="" Lk="" SubmitButtonLk="" CancelUrl="" SubmitUrl="">

Attributes:

ID: configuration ID, unique ID

Type: key/name/web service of the data collection function (example of a dialog: A_AN, of a  web

service: MDUnits.list)

Lk: heading/title (language keys can be used)

SMA-CMS_82.docx

Version: 1.0.23049

Page 113 of 178

SMA-CMS Customizing Suite for SMA

SubmitButtonLk: text of the button to complete a data collection function

CancelUrl: defines a target URL to cancel the collection function

SubmitUrl: defines a target URL after completing the collection function

3.3.4.3  Configuration of a <Snippet>

<Capturing>

<Snippets>

<Snippet Type="" LK="" Inputtype="" SelectionType="" Readonly="" Invisible=""

DefaultUnit="" DefaultValue="" TargetId="" Barcode="" SubmitEmptyValues="">

<DataWebService />
<UnitWebService />
<DataMapping />
</Snippet>

</Snippets>

</Capturing>

Attributes:

Type: specifies the value type (ANR, MNR, …)

Lk: display name (language keys can be used)

InputType: "text“, "number“ or "password“; "text" is used by default

3.3.4.3.1  Setting the default of a field

DefaultValue

If no value is passed in the request, this value is set as default in the "snippet".

Example, preassignment of the badge number.

<Snippet Type="KNR" Lk="lkperson.card_id" InputType="number" SelectionList="false"
DefaultValue="GET_USER" Invisible="false"/>

GET_USER provides the value of the user logged on.

GET_BATCH provides a batch number that is specified using the web service BOBatch.createBatchId.

DefaultUnit

If no value is transferred via URL, the system sets the configured value.

(You can use language keys.)

SMA-CMS_82.docx

Version: 1.0.23049

Page 114 of 178

SMA-CMS Customizing Suite for SMA

3.3.4.3.2

Further attributes of a snippet

Invisible: "Snippet" is not displayed.

Passes default value/transferred value (URL) in the background.

<Snippet Type="KNR" Lk="lkperson.card_id" InputType="number"
SelectionList="false"  DefaultValue="GET_USER" Invisible="true"/>

Readonly: "Snippet" cannot be edited.

Protects a transferred value:

<Snippet

Type="MNR"

Lk="lkWorkplace"

InputType="text"

SelectionList="false"

Readonly="true"/>

Barcode The "snippet" can be scanned via bar code and camera.

SelectionType: The "snippet" can be declared as list, table or input field, for example.

The following values are available:

<empty>:  If  you  do  not  enter  a  configuration,  the  system  sets  the  configuration  value  "simple"  by

default.

simple: You can enter data in a simple input field.

list: You can enter data using a modal selection list.

table: You can choose data from a table selection below the input field.

view: You cannot enter values directly. The value is not passed to the server.

viewList: You cannot enter values directly. The value is not passed to the server.

viewTable: You cannot enter values directly. The value is not passed to the server.

button:  Shows  a  button  that  opens  a  configured  data  collection  function.  Once  this  function  is

completed, the current  data collection function  is opened again. Configure the  attribute  "TargetId“

with the ID of the data collection function you want to open with the button.

label: You cannot enter values directly. The value is passed to the server.

TargetId:  Only  required  for  the  SelectionType  "button".  To  configure  this  Id,  use  the  Id  of  the  data

collection application that you call using SelectionType "button".

SMA-CMS_82.docx

Version: 1.0.23049

Page 115 of 178

SMA-CMS Customizing Suite for SMA

SubmitEmptyValues:

If the value is "true", the system also passes "empty" values when the input dialog is sent.

If the value is "false", the system does not pass "empty" values when the input dialog is sent.

3.3.4.4  Data configuration of a snippet

DataWebService includes the data configuration for selection lists/tables.

<DataWebService Name="" ServiceType="">

<ResultParameters>

<Parameters>

<Parameter Acronym="" IsKey="" IsFor="" Lk="" FormatType="" IsDescription=""/>

</Parameters>

</ResultParameters>
<FilterParameters>

<Parameters>

<Parameter Acronym="" WebServiceType="" InputAsArray="" Operator="" DependingOnType="">

<Values>

<string></string>

</Values>

</Parameter>

</Parameters>

</FilterParameters>

</DataWebService>
Configuration of attributes

Name: Name of the HYDRA web service in dot notation, i.e. MDUnits.list becomes MDUnitsList.

ServiceType: Includes the web service type.

The following types are available:

<empty> or "webservice": A web service requests the data.

"dlg": The data is identified using a dialog (DLG) that returns result parameters.

"dlgList": The data is identified using a dialog (DLG) that returns a result table.

UnitWebService: includes the configuration for the display of the unit.

DataMappings: includes the value assignment for the transfer parameters when you call a data collection

function via SelectionType and value "button".

3.3.4.5  Customization of the Home screen

You  can  add  further  applications  in  the  file  SMA\Local\Views\Home\menue_add.xml.  This  will  add  the

application to the end of the Home screen.

<?xml version="1.0"?>
<ArrayOfButtonView xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xsd="http://www.w3.org/2001/XMLSchema">

SMA-CMS_82.docx

Version: 1.0.23049

Page 116 of 178

SMA-CMS Customizing Suite for SMA

  <ButtonView>
    <id>QuantityCalculator</id>
    <Label>lkQuantityCalculator</Label>
    <LabelMini>lkQuantityCalculator</LabelMini>
    <Description>lkQuantityCalculatorDesc</Description>
    <Icon>Content/img/ShippingBoxesClosed_70x70.png</Icon>
    <Action>
      <Target>location='../CustomService/CustomService?pageId=quantity_calculator'</Target>
    </Action>

<LicensedIn>SMA-CMS</LicensedIn>

  </ButtonView>
</ArrayOfButtonView>

The  file  menu_add.xml  includes  a  list  of  ButtonView  elements.  Each  ButtonView  element  stands  for  a

new menu entry.

Structure of the ButtonView element:

ID: unique reference of the element

Label: title of the menu item

LabelMini: title of the menu item shown on small displays

Description: descriptive text (the description is not shown on small displays)

Icon: image of the application

Action: includes a "target" tag that is executed when you click the element.

LicensedIn: authorization key that controls the visibility of the application on the Home screen

To delete an application in the Home screen, you just configure the application with the unique ID in the

file SMA\Local\Views\Home\menu_rm.xml.

Use the file SMA\Views\Home\menu.xml to identify the IDs of the standard applications.

<?xml version="1.0"?>
<ArrayOfButtonView xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xsd="http://www.w3.org/2001/XMLSchema">

  <ButtonView>

<id>WorkplaceOverview</id>

  </ButtonView>

<ButtonView>

<id>OrderOverview</id>

  </ButtonView>
</ArrayOfButtonView>

The file SMA\Local\Views\Home\menu_sorting.xml creates the sorting of the Home screen.

The file menu_sorting.xml includes a list of ButtonView elements. You only have to configure the ID (tag:

"Id") to specify the sort order of applications.

If  an  application  is  not  included  in  the  sort  order,  the  application  is  added  according  to  the  standard

configuration (menu.xml).

<?xml version="1.0"?>

SMA-CMS_82.docx

Version: 1.0.23049

Page 117 of 178

SMA-CMS Customizing Suite for SMA

<ArrayOfButtonView xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xsd="http://www.w3.org/2001/XMLSchema">

  <ButtonView>

<id>WorkplaceOverview</id>

  </ButtonView>

<ButtonView>

<id>OrderOverview</id>

  </ButtonView>
</ArrayOfButtonView>

For  further  configurations  of  the  SMA  Home  screen,  refer  to  the  following  section  3.4.2  Title  of  a

customer-specific application.

3.3.5 Modal dialog

The HTML of a modal dialog is based on twitter bootstrap 2.3.2 and is made up of three main parts:

Header

Body

Footer

Example (creating a modal dialog with the name "exampleModal"):

<div  id="exampleModal"  class="modal  hide"  tabindex="-1"  role="dialog"  aria-labelledby="detailActionLabel"  aria-
hidden="true">

    <div class="modal-header">
        <button
closeDialogX">X</button>
        <h3 id="exampleModal-group_header">Example modal heading</h3>
    </div>

type="button"

class="close"

data-dismiss="modal"

aria-hidden="true"

id="exampleModal-

    <div class="modal-body" style="overflow-x: hidden;" id="exampleModal-body">
        My modal
    </div>

    <div class="modal-footer">
        <div style="float: left;">
            <!-- maybe an other button -->
        </div>
        <div style="float:right;">
            <button
class="btn
closeDialog">Close</button>
        </div>
    </div>

button-big-auto"

</div>

data-dismiss="modal"

aria-hidden="true"

id="exampleModal-

You use the following function to call the modal dialog created:

$mpdv.components.modal.openModal("exampleModal");

SMA-CMS_82.docx

Version: 1.0.23049

Page 118 of 178

SMA-CMS Customizing Suite for SMA

3.4  Customer-Specific Applications

3.4.1 Calling the application via URL in the browser:

Structure of the URL:

http://<SMA server>:<Port>/CustomService/CustomService?pageId=<application>

SMA server: Name/IP of the server where SMA is installed.

Port: Port of the SMA server where SMA runs.

Application: Name of the created HTML file without file extension.

3.4.2 Title of a customer-specific application

You can specify a title for an application in HTML.

Example for the title "Test":

<!--
    #mpdv_title: Translate(lkTest)
-->

3.4.3 Integrating files in HTML

3.4.3.1

Integrating CSS files

If  you  want  to  use  style  sheets  in  an  HTML  application,  you  must  integrate  the  following  in  the  HTML

page.

Example for the integration of the file test.css, which is included in the directory SMA\local\www\css\:

<link href="../local/www/css/test.css" rel="stylesheet">

SMA-CMS_82.docx

Version: 1.0.23049

Page 119 of 178

SMA-CMS Customizing Suite for SMA

3.4.3.2

Integrating JS files

If you want to use Javascript files in an HTML application, you must integrate the following in the HTML

page.

Example for the integration of the file test.js, which is included in the directory SMA\local\www\js\:

<script src="../local/www/js/test.js"></script>

3.4.4 Integrating an application in the Home screen

Copy the Home screen and its configuration and store both in the folder for customizations.

Copy from SMA\Views\Home\Index.cshtml to SMA\Local\Views\Home\Index.cshtml

Copy from SMA\Views\Home\menu.xml to SMA\Local\Views\Home\menu.xml

If you already use a customized Home screen, you may skip this step.

Integrating the application into SMA (customizing Home screen):

Extend the following line of code in the file "SMA\Local\Views\Home\Index.cshtml":

var menuPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Views", "Home", "menu.xml");
new
var menuPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Local", "Views", "Home",
"menu.xml");

With this extension, you can customize the file menu.xml to your requirements.

You can also add a new menu item as follows:

\SMA\Views\Home\menu_add.xml

This file must only include the new entry.

Example:

xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

<?xml version="1.0"?>
<ArrayOfButtonView
xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <ButtonView>
    <Label>lkTest</Label>
    <LabelMini>lkTest</LabelMini>
    <Description>lkTestDesc</Description>
    <Icon>/Content/img/Generators_70x70.png</Icon>
    <Action>
<Target>location='../CustomService/CustomService?pageId=test'</Target>
    </Action>

SMA-CMS_82.docx

Version: 1.0.23049

Page 120 of 178

SMA-CMS Customizing Suite for SMA

    <DoNotDissMissModal>false</DoNotDissMissModal>

<LicensedIn>SMA-CMS</LicensedIn>

  </ButtonView>
</ArrayOfButtonView>

The file is merged with the menu.xml and attached to it.

Note: <LicensedIn> includes the respective license required.

Customizations made by MPDV: SMA-CMR

Customizations made by the customer: SMA-CMS

3.4.5 Web service calls

3.4.5.1  Web service configuration

Stored in: SMA\Local\Areas\CustomService\Configurations

Structure of the file:

<?xml version="1.0"?>
<CustomServiceConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">

<!-- Name of the web service -->
<WebService Name="" />
<!--

what are you asking for

-->
<ResultParameters>

<Parameters>

<Parameter Acronym="" />

</Parameters>

</ResultParameters>

<!-- if you want to filter data (performance, efficiency, usability) define filterParameters -->
<FilterParameters>

<Parameters>

<!--
acronym: e.g.: operation.act.production_indicator
webServiceType: if empty, default = string (string, integer, decimal, datetime, boolean)
inputAsArray: if empty, default = N (N, Y)
operator: if empty, default = "EQUAL" (LIKE, EQUAL, BETWEEN, IN, NOT_EQUAL, LIKE_OR_NULL, EQUAL_OR_NULL,

BETWEEN_OR_NULL,

IN_OR_NULL, NOT_EQUAL_OR_NULL, GT, LT, GTE, LTE, GT_OR_NULL, LT_OR_NULL, GTE_OR_NULL, LTE_OR_NULL)
-->

<Parameter Acronym="" WebServiceType="" InputAsArray="" Operator="" />

</Parameters>

</FilterParameters>

</CustomServiceConfig>

SMA-CMS_82.docx

Version: 1.0.23049

Page 121 of 178

SMA-CMS Customizing Suite for SMA

3.4.5.2

Test call

3.4.5.2.1  Call without filter parameters

http://<SMA-

Server>:<Port>/CustomService/CustomService/GetData?configName=<Konfiguration>

Configuration: Name of the created XML file without file extension.

Example: Result as JSON

{
  "Error": false,
  "Msg": "no errors",
  "DataSet": null,
  "DataTable": [
    {
        "units.designation": "Milimeter",
        "units.unit": "mm"
    },
    {
      "units.designation": "Millimeter",
      "units.unit": "MM"
    },
    {
      "units.designation": "Stück",
      "units.unit": "ST"
    }
  ]
}

3.4.5.2.2  Call with filter parameters

http://<SMA-Server>:<Port>

/CustomService/CustomService/GetData?configName=<Configuration>&filterJson=<filterJson

>

Configuration: Name of the created XML file without file extension.

filterJson:

Using the acronym filterJson, you can add parameters in JSON format. These parameters are used

to filter the configured web service. You can only use parameters that have been configured.

Example:

Configuration InPutAsArray= "Y":

{"Parameters":{"units.unit":{"0":"ST"}}}

Configuration InputAsArray="N":

SMA-CMS_82.docx

Version: 1.0.23049

Page 122 of 178

{"Parameters":{"units.unit":"ST"}}

SMA-CMS Customizing Suite for SMA

3.4.5.3  Call without filter

$mpdv.communication.post("/CustomService/CustomService/GetData", {
configName: "training_mdunits_list",
    }, fillList, showError);}

3.4.5.4  Call with filter parameters

var parameters = '"units.unit": {"0":"ST"}';
$mpdv.communication.post("/CustomService/CustomService/GetData", {
configName: "training_mdunits_list",
filterJson: '{"Parameters":{' + parameters + '}}'
}, fillList, showError); }

3.4.5.5

Processing of the result

3.4.5.5.1  Successful processing

Example:

function fillList(data){
  save_materials = null;

  if (data) {
    var error = data.Error;
    if (!error) {
      // use data
      if (data.DataTable && data.DataTable.length > 0) {
        //do something
      }
    }else {
      showError(data);
    }
  }
}

3.4.5.5.2  Error

This function describes the output in case of an error:

function showError(data) {
  $mpdv.progress.hideAndClearProgress();

  if (data) {
    var msg = data.Msg;

SMA-CMS_82.docx

Version: 1.0.23049

Page 123 of 178

SMA-CMS Customizing Suite for SMA

    if (msg) {
      $mpdv.messages.showErrorMessage(msg);
    } else {
      $mpdv.messages.showErrorMessage(lkServerReturnedError);
    }
  } else {
    $mpdv.messages.showErrorMessage(lkServerReturnedError);
  }
}

3.4.5.5.3  Sorting of web service results

You can use the following to sort the data of a web service:

data.DataTable.sort(dynamicSortMultiple("value"));

function dynamicSortMultiple() {
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;

        while (result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    };
}

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}

3.4.6 BAPI call

function loadData() {
    var aunr = $("#getOrderNumber").val();

    if (aunr) {
        var dlg = "DLG=CNR.INSERT|CNR="+cnr+"|";

        $mpdv.communication.post("/CustomService/CustomService/SendDlg", {
            keyValueDlg: dlg
        }, handleInfo, showError);
    }
}

SMA-CMS_82.docx

Version: 1.0.23049

Page 124 of 178

SMA-CMS Customizing Suite for SMA

BAPI call including forwarding to the page InspectionPoints:

  var dlg = "DLG=CNR.INSERT|CNR="+cnr+"|";

        $mpdv.communication.post("/CustomService/CustomService/SendDlg", {
            keyValueDlg: dlg
        },  function  (data)  {  window.location.href  =  "../InspectionPoints";  },
showError);

3.4.7 Forwarding

Example:

Change to page "Resource/ResourceDnc" with Cancel:

$("#CancelButton").on("click", function () {

window.location.href = "/Resource/ResourceDnc";

});

3.4.8 Barcode processing

$('body').keyup(function (e) {
//alert(e.keyCode);
if (e.keyCode === 13) {

//do something

}}

3.4.9 Read UserPerson from session

var personID = window.sessionStorage.getItem('UserPerson');

getPersonName(personID);

3.4.10

Integrating charts

Use jqplot to integrate charts. http://www.jqplot.com/

Example:

You must integrate the following in the HTML page:

SMA-CMS_82.docx

Version: 1.0.23049

Page 125 of 178

SMA-CMS Customizing Suite for SMA

<script type="text/javascript" src="../Scripts/jquery.jqplot.min.js"></script>
<script type="text/javascript" src="../Scripts/plugins/jqplot.canvasTextRenderer.min.js"></script>
<script type="text/javascript" src="../Scripts/plugins/jqplot.canvasAxisLabelRenderer.min.js"></script>
<script type="text/javascript" src="../Scripts/plugins/jqplot.canvasAxisTickRenderer.min.js"></script>
<script type="text/javascript" src="../Scripts/plugins/jqplot.barRenderer.min.js"></script>
<script type="text/javascript" src="../Scripts/plugins/jqplot.categoryAxisRenderer.min.js"></script>
<script type="text/javascript" src="../Scripts/plugins/jqplot.pointLabels.min.js"></script>
<script type="text/javascript" src="../Scripts/plugins/jqplot.pieRenderer.min.js"></script>
<script type="text/javascript" src="../Scripts/plugins/jqplot.dateAxisRenderer.js"></script>

The JavaScript processing is as follows:

var dataSeriesPie = null;
function fillKpi(data){
  if (data) {
        var error = data.Error;
        if (!error) {
            var table = data.DataTable;
            if (table) {
                $.each(table, function (i, r) {
                    if (i !== 0)
                        return;
                    plotTarget = 'pie';
                    $('#' + plotTarget).html(null);
                    dataSeriesPie = [
                        ['QUA', r["efficiencyreport.quality"]],
                        ['TQUA', 1- r["efficiencyreport.quality"]],
                    ];
                    paintKpiPlot(plotTarget, dataSeriesPie);
                });
            }
        } else {
            showError(data);
        }
    }
}

3.4.11  Lists with fixed values

To create a list with fixed values, you can implement the following in JavaScript:

function callBatchStatus(mode) {
  $(".bufferTableInfoBox").css("display", "none");
    $(".chooseDialogTable").css("display", "inline-table");

  var data = {
    DataTable: [
      {
        "status.id": "F",
        "status.designation": "Frei"
      },
      {
        "status.id": "S",
        "status.designation": "Gesperrt"

SMA-CMS_82.docx

Version: 1.0.23049

Page 126 of 178

SMA-CMS Customizing Suite for SMA

      },
      {
        "status.id": "P",
        "status.designation": "Prüfung"
      },
      {
        "status.id": "V",
        "status.designation": "Verfallen"
      },
      {
        "status.id": "T",
        "status.designation": "Transport"
      }
    ]
  };

  showDataTable(data, mode);
}

3.5  Script Functions/Variables

Code

Description

$mpdv.config.getApplication()

Reads the application name from URL.

Example:

http://localhost:8081/CustomService/CustomService?pa

geId=training_calculator

Return value: "CustomService"

$mpdv.utils.convertSecondsToHhmmss(

Conversion of seconds to format: hh:mm:ss

value)

Example:

$mpdv.utils.convertSecondsToHhmmss(3666)

Return value: "01:01:06"

$mpdv.utils.convertSecondsToHhmmss(-3666)

Return value: "-01:01:06"

$mpdv.utils.convertSecondsToHhmm(va

Conversion of seconds to format: hh:mm

lue)

Example:

$mpdv.utils.convertSecondsToHhmm(3666)

Returns: "01:01"

$mpdv.utils.convertSecondsToHhmm(-3666)

Returns: "-01:01"

$mpdv.components.modal.openModal(v Opens a modal dialog

Example:

SMA-CMS_82.docx

Version: 1.0.23049

Page 127 of 178

SMA-CMS Customizing Suite for SMA

alue)

$mpdv.components.modal.openModal("exampleModal")

$mpdv.communication.getUrlParam(val

Reads the value from specified URL.

ue)

Example:

URL = http://localhost:8081/?myParam=super

$mpdv.communication.getUrlParam("myParam")

Return value: "super"

$mpdv.messages.showInfoMessage(val

Output of an information box

ue)

Example:

$mpdv.messages.showInfoMessage("It's

an

information")

$mpdv.messages.showWarningMessag

Output of a warning

e(value)

Example:

$mpdv.messages.showWarningMessage("It's

a

warning")

$mpdv.messages.showSuccessMessag

Output of a success message

e(value)

Example:

$mpdv.messages.showSuccessMessage("Success")

SMA-CMS_82.docx

Version: 1.0.23049

Page 128 of 178

SMA-CMS Customizing Suite for SMA

$mpdv.messages.showErrorMessage(v

Output of an error message

alue)

Example:

$mpdv.messages.showErrorMessage("It's an error")

$mpdv.components.list.matchWildcardS

Functionality to query wildcards

tring( wildcardString, string)

? for one character

* for several characters

Example:

Translate(<language key>)

Function to integrate language keys

The

language

key

is

edited

in

the

file

"mpdvDictionaryCustomer.xlsm".

Store

the

files

created

here

in

SMA\Runtime\resources\local\languages.

"GET_USER"

GET_USER provides the value of the user logged on.

$("#<VALUE>").focus();

Set focus on a field

Example:

$("#KNR").focus();

SMA-CMS_82.docx

Version: 1.0.23049

Page 129 of 178

SMA-CMS Customizing Suite for SMA

4  Repository Client

You use the MPDV Repository Client MRC to display and edit repository data. It provides a user-friendly

access.

4.1  Quick start

This section provides a quick overview of how to work with the Repository Client. The individual steps are

only briefly described. For further information on the individual steps, refer to the sections in the following,

if required.

Installation

Requirements

To use the Repository Client,  you must have installed the Microsoft DotNet framework (at least version

4.5.2).

Program installation

To  install  the  program,  just  copy  the  folder  including  the  binary  files  into  your  system.  An  installation

program is not required.

Installation of developer license

If the developer license is not available, you can only read the data. You cannot save or export the data.

The  developer  license  is  handed  out  once  you  have  attended  a  respective  Customizing  Training.  The

developer license is provided as *.lic file. This file is included in the data medium that you have received

during the training: Folder "Repository Client", subfolder "tools/licence", e.g.

x:\CUT-MOC_81_files\Tools\MPDVRepositoryClient\tools\licence\mpdvWrite.lic.

Copy  the  folder  "licence"  with  its  content  into  the  folder  of  the  Repository  Client  in  the  roaming

directory of the Windows user, e.g.:

C:\Users\%User%\AppData\Roaming\MPDV\RepositoryClient\licence\mpdvWrite.lic

This folder is automatically created on the first start of the Repository Client.

Before you start

Before  you start  working  with the Repository Client,  you must make sure that the Repository Client has

been  installed  according  to  the  installation  instructions  and  that  the  required  license  files  are  stored  as

described there.

SMA-CMS_82.docx

Version: 1.0.23049

Page 130 of 178

In  general,  the  repository  is  empty  when  you  start  work.  However,  if  you  do  not  want  to  start  with  an

empty repository, it is recommended to make sure that the data you want to work with is available.

SMA-CMS Customizing Suite for SMA

First steps

Start the Repository Client.

  Start .\bin\mrc.exe

Now load or create a Workset.

A workset specifies the sources of the repository that you want to edit.

  Click the button Load work set in the file-based repository

-> select workingset.work

Click the button Repository  Load Repository to load the data from the sources specified in the workset.

How to proceed further depends on what you want to do via the Repository Client.

Tip: Working with perspectives

The  Repository  Client  provides  the  possibility  to  use  different  perspectives  for  different  tasks.  Do  not

hesitate  to  close  views  you  do  not  need  or  drag  them  to  another  open  view  in  order  to  tab  them  and

hence provide for more space and clarity. You can also use more than one view of the same type. Simply

adapt your perspective to the requirements of your tasks.

Example:

If you create a service and you would like to check with an existing service how to populate the fields, you

can simply open another service view. Thus, you do not need to destroy your current view and re-orient

yourself later.

Default perspectives

The installation of the Repository Client provides default perspectives:

default

This  is  a  good  perspective  to  start  with.  It  provides  a  combined  view  for  server  and  client-related

contents.

Select  a  domain  on  the  top  left.  Via  the  included  relations,  the  top  right  area  shows  the  services,

servicesGUI and properties of this domain. The bottom right area shows the ServiceParameters of

the  service  selected  above,  the  ServiceParameterGui  of  the  ServiceGui  selected  above  and  the

ControlDataSources, ReferenceData and Authorizations of the selected domain.

SMA-CMS_82.docx

Version: 1.0.23049

Page 131 of 178

SMA-CMS Customizing Suite for SMA

default client

Similar to the "default" perspective but limited to the contents concerning client development.

default server

Similar to the "default" perspective but limited to the contents concerning server development.

DB schema

Shows documentation of the database structure.

Validation

Use this perspective to validate contents.

Proceed as follows:

-  Open perspective and load data from workset.

-  Perform validation: tab Repository --> button Validate.

-  A CSV file listing the identified irregularities is generated in the sub-directory "validation_logs"

of the Repository Client's installation directory. The application that is linked to this file type in

the operating system opens the CSV file.

-

In the views for Domains, Properties, ServiceParameters, etc. the Repository Client only shows

the entries with detected irregularities.

You  should  analyze  and,  if  necessary,  correct  the  detected  irregularities.  Not  every  irregularity

leads to an error.

4.2  Start and exit Repository Client

Start the  Repository Client via the Windows start menu, a link on the  desktop or the command line.  As

soon as all required components have been loaded, the application window is shown.

You can start and run the Repository Client multiple times in parallel on a PC. You can access different

repository  data  in  each  of  the  started  instances  of  the  Repository  Client.  For  example,  you  can  view

several versions of the repository at the same time.

You  can  also  start  the  client  by  opening  one  of  the  workset  files.  On  start  of  the  client,  the  system

attempts to load the contents of the workset defined in this file. This option is available after the first start

of the Repository Client.

Command line parameters

You  may  transfer  parameters  to  the  Repository  Client  upon  the  start.  The  following  parameters  are

supported:

-perspective/-p  <perspectivename>  Use  this  parameter  to  start  the  Repository  Client  with  a

specific perspective. If you do not use this parameter, the last active perspective is started by default.

SMA-CMS_82.docx

Version: 1.0.23049

Page 132 of 178

SMA-CMS Customizing Suite for SMA

-workset/-w <worksetfile> Use this parameter to specify the workset to be loaded. If you do not

specify the workset on start of the application, the last loaded workset is loaded.

--autoload/--a If you use this parameter, the Repository Client loads the repository defined in the last

active workset or in the workset transferred via parameters. This repository is loaded directly on start of

the application.

--trim/--t  If  you  use  this  parameter,  the  Repository  Client  removes  so-called  leading  and  trailing

"whitespaces"  when  loading  the  repository.  Only  select  this  option  if  needed,  because  the  load  time

increases extremely.

Exit

To exit the application, click

 in the title bar.

If  the  loaded  repository  includes  active  changes  when  you  exit  the  application,  a  respective

message is issued asking you to save the changes. If you do not want to save the changes, you

can discard the changes or stop exiting the application.

Note:  Changes to the  workset and perspective are discarded  when  you exit  the application, if

you have not saved the changes.

4.3  The Application Window

The  application  window  forms  a  framework for  the  display  of  different  tables.  It  includes  the  application

menu with control elements to call and control different functionalities. The menu is on top of the window.

A status bar is at the bottom of the window. The status bar shows progress and event messages.

SMA-CMS_82.docx

Version: 1.0.23049

Page 133 of 178

SMA-CMS Customizing Suite for SMA

You can individually dock the grids/table views. To do so, click the title bar of a table view/grid and drag it

out of the docking position. For orientation purposes, the system shows the docking positions where you

can drop the table view. You can also drop a table view without docking it.

4.4  Grids/table views

Grids/table  views  are components to present  data records in a  table.  You can  change the tables  in the

Repository Client according to your requirements. For each grid/table view, the functions described below

are available.

The settings, that  you make in a table, are saved with the perspective. To undo changes,  you

can  switch  to  the  standard  perspective  (in  the  application  menu:  Perspective    Change

perspective).

Sort table data

Click the table header to sort table data in descending order. If you click the table header once more, data

is sorted in ascending order. The selected sorting option is shown.

SMA-CMS_82.docx

Version: 1.0.23049

Page 134 of 178

SMA-CMS Customizing Suite for SMA

You can sort data by several columns: Press the Shift key of your keyboard after sorting the first column.

Then click the other column headings by which you want to sort.

You can also use the context menu of the table header to sort data.

Group data in the table

You can group table data if the group by area is shown. If the group by area is not shown, you can show

the area via the context menu of the table header (Show/Hide group by box). To group by a column, click

the column header and drag it to the grouping pane. Multiple grouping is also supported.

Optimum column width (best fit)

Select  the  option  "Best  fit"  in  the  context  menu  of  the  table  header  to  adjust  the  column  width  of  the

selected column to the optimum width. In this case, ”optimum” means that the column is as wide as the

largest entry in the selected column.

Optimum column width (all columns) / Best fit (all columns)

Click this function to adjust all columns to the optimum width.

Change column width

You can also change the column width using the mouse, i.e. move the space between two cells to the left

or right.

Show and/or hide columns and entire categories

Use  the  context  menu  function  Select  columns  to  show  and/or  hide  individual  columns  and  entire

categories. For this purpose, select the function in the context menu and then drag the required columns

and/or categories from the table to the pool or from the pool to the table.

Change the sequence of columns and categories

Also use the mouse to change the display order of columns and categories. To do so, drag the column or

category  you  want to move and drop it at the required location. The system will  indicate the location  to

which the column and/or category will be allocated when you release the left mouse button.

Freezing columns to prevent horizontal scrolling

You can freeze columns at the left and right-hand side to keep the columns in view while scrolling. These

column  settings  are  included  in  the  perspective  and  can  be  saved  with  the  perspective.  Right-click  the

column header and press one of the below-mentioned shortcuts to freeze columns:

  CTRL + right click: freeze at the left-hand side.
  ALT + right click: freeze at the right-hand side.
  SHIFT + right click: Unfreeze.

SMA-CMS_82.docx

Version: 1.0.23049

Page 135 of 178

SMA-CMS Customizing Suite for SMA

Filter table data

Click the filter icon

 in the column where you intend to set the filter and select the required filter option

from the list; i.e. you select one of the values available in the table or compose a combination of values in

the user-defined filter.

You  can  also  set  several  filters  in  different  columns.  The  table  footer  indicates  that  the  table  has  been

filtered and also shows the filter criteria. Select the function Edit filter on the right of the footer to open the

filter editor. Use the filter editor to create complex filter criteria across all columns. You may also open the

filter editor via the context menu of the table header.

Search box

Use the context menu of the table header to access the option Show search box. This option provides a

search box within the table. Use this box to quickly search and/or filter the requested data. Simply start

typing  in  this  box  and  the  system  will  only  show  those  rows  matching  the  data  you  typed.  The  more

characters you enter, the more you narrow down the result.

Filter row

Use  the  context  menu  of  the  table  header  to  open  the  option  Show  filter  row.  This  option  provides  an

additional row shown below the table header. You can enter a search term in any column, and the system

will narrow down the displayed rows appropriately. The system supports wildcards. You can also combine

search terms in various columns to restrict the search result.

Edit rows

Double-click a row or press the "Enter" button to switch to the editing mode and edit the respective row.

When  you  have  finished  editing  and  leave  the  row,  the  editing  mode  is  terminated.  Edited  rows  are

highlighted in color.

4.5  The application menu

You can use the application ribbon menu of the Repository Client to control various functions of the tool. It

includes several tabs that are described in the following.

Workset

Includes functions to administer worksets. A workset specifies the sources included  in the repository that

you want to edit. To display a workset, use the workset panel which consists of a grid/table view.

SMA-CMS_82.docx

Version: 1.0.23049

Page 136 of 178

SMA-CMS Customizing Suite for SMA

-  New workset: This function creates a new workset. If a workset is loaded that has been modified, a

dialog pops up asking you to save the changes.

Click  "Yes"  to  save  the  changes,  "No"  will  discard  them.  In  both  cases,  a  new  workset  is  created.

Click "Cancel" to cancel the process of creating a new workset.

-  Load workset: This functions loads a workset from an existing file. You can select the workset to be

loaded via a file dialog. If the currently loaded workset has been modified, you can save the changes

as described above.

-  Save  workset:  This  function  saves  the  current  workset  in  the  file  from  which  it  was  loaded.  If  the

current workset is new, a file dialog pops up asking you to select the file in which you want to save

the workset.

-  Save workset in: Use this function to save the currently loaded workset in a file. You can select the

files using a file dialog.

-  Workset:  Use  this  button  to  show  and/or  hide  the  grid/table  view  presenting  the  currently  loaded

workset. For details on the workset table, please refer to section Workset.

Repository

Includes functions to load and save data in the repository. In addition, you may display repository-specific

data here.

-  Load repository: Use this function to load the repository. The currently loaded workset specifies the

data sources that are used to load the repository. If a repository is loaded that has been modified, a

dialog  pops  up  asking  you  to  save  the  changes.  Click  "Yes"  to  save  the  changes,  "No"  will  discard

them.  In  both  cases,  the  repository  will  be  reloaded  subsequently.  Click  "Cancel"  to  cancel  the

process of loading a repository.

-  Save repository:  *only available if used in development mode

Use this function to save changes in the repository. If no changes have been made, an appropriate

note will be displayed.

-  Export repository: *only available if used in development mode

In  contrast  to  saving  the  repository,  you  can  use  this  function  to  export  parts  of  the  repository.  For

details on this function, please refer to section Error! Reference source not found..

-  Validate: *only available if used in development mode

You can use this function to validate your data records manually. (See section "Validation").

-  Value  list:  Use  this  menu  entry  to  show  and/or  hide  the  value  list.  The  list  includes  permissible

entries for specific fields of the repository.

-  References: Use this entry  to show  and/or hide the  table  with repository references. For details on

references, please refer to section References.

SMA-CMS_82.docx

Version: 1.0.23049

Page 137 of 178

SMA-CMS Customizing Suite for SMA

-  Changes: *only available if used in development mode

Use this button to show and/or hide the change view. This view shows the current modifications in the

loaded repository.

-  Service documentation

Use  this  button  to  show  the  extended  documentation  of  selected  standard  services.  For  further

information on the service documentation, refer to section "4.9 Service documentation".

Data collection

The Entry tab summarizes the functions that you can use to edit the loaded repository. The entries refer

to the currently focused table view/grid.

-  New  entry:  Use  this  function  to  create  a  new  entry.  For  details  on  this  function,  please  refer  to

Context menu  New.

-  Copy entry: Use this function to copy selected table entries. For details on this function, please refer

to Context menu  Copy.

-  Cut entry: Use this function to cut selected table entries. For details on this function, please refer to

Context menu  Cut.

-  Paste entry: Use this function to  insert (paste) entries from the cache/clipboard. For details on this

function, please refer to Context menu  Insert.

-  Advanced  pasting:  Use  this  function  to  edit  entries  in  the  clipboard  prior  to  inserting  them.  For

details on this function, please refer to Context menu  Advanced pasting.

-  Delete entry: Use this function to delete the selected entries. For details on this function, please refer

to Context menu  Delete.

-  Show  entry  info:  Use  this  function  to  open  a  dialog  showing  information  on  the  currently  selected

entry. For details on this function, please refer to Context menu  Info.

-  Get references: Use this function to open a new grid/table view showing the currently selected data

record including referenced values. For details on this function, please refer to Context menu  Get

references.

Perspective

These entries of the menu refer to the administration of perspectives. A perspective  is a layout of table

views/grids and includes also the associated relations between table views/grids.

SMA-CMS_82.docx

Version: 1.0.23049

Page 138 of 178

SMA-CMS Customizing Suite for SMA

-  Save perspective: Use this function to save the currently shown arrangement of tables.

-  Save  perspective  as:  Use  this  function  to  save  the  currently  shown  perspective  under  a  different

name. You can enter the new name in the displayed dialog.

-  Switch  perspective:  Use  this  function  to  change  the  perspective.  A  dialog  with  all  available

perspectives is shown.

-  New perspective: Use this function to create a new perspective. Similar to the "Save perspective as"

function,  you  can  select  the  name  of  the  perspective  in  a  dialog.  After  entering  the  name,  you  can

immediately switch to the new perspective.

-  Reset perspective: Use this function to reset the current perspective to the status saved last.

-  Relations: Use  this menu  entry  to show/hide  the grid/table  view showing the relations between  the

grids/table views. For details on relations, please refer to section Relations.

Note: Changes to the perspective are discarded when you exit the application, if you have not

saved the changes explicitly.

Views

Use these entries to open table views/grids. The entries will open a new grid/table view each showing the

relevant data records of the repository.

For clear identification of the data records shown in the tables, the  Parent column is included in each of

the tables. The Parent column includes the identifier for the father node in the repository tree. The other

columns of these tables are defined by the repository documentation.

The  View  area  additionally  includes  a  group  with  entries  for  the  remaining  grids/table  views  of  the

application.

4.6  Workset

Worksets define a set of data sources that make up the repository that you want to edit. Use the workset

management function to organize  your  work on different projects and create  an appropriate  workset for

each  of  your  projects.  You  can  show/hide  the  workset  table  via  the  application  menu  (Workset  

Workset).

Note: The workset loaded last will be loaded on start of the Repository Client.

SMA-CMS_82.docx

Version: 1.0.23049

Page 139 of 178

SMA-CMS Customizing Suite for SMA

The workset table includes the following columns:

Name

You can specify the domain set that you want to use to load the data source. The repository data include

the information on the domain set that was used to load the data. You can copy data from a domain set

into another domain set. Example: Copy existing applications from the domain set "Runtime" (read only)

into your development directory, e.g. the domain set "Dev" (writable) where you can make changes.

Client Source

You  can  specify  the  data  source  that  you  want  to  use  to  load  client  data.  The  following  options  are

available:

  Load data from the runtime structure of the client reference in the server

In the server, the client configurations are stored as client reference with runtime structure. You

can load the repository data from this structure.

Example:

HYDRA:

x:\jhydradir\MaintenanceManager\rt\client\MOC

MIP:

x:\wsp_config\MaintenanceManager\rt\client\MOC

The access is read-only.

  Load data from the runtime structure of a local MOC client

If you enter a path to an MOC installation directory, the respective client data are directly loaded

from the MOC runtime installation.

Example:

C:\Program Files (x86)\MPDV\HYDRA 8\MOC

The access is read-only.

  Load data from a local directory with domain structure

You use local directories with domain structure for the administration of your own developments.

Using the Repository Client, you can read data in this directory and you can also save data into

this directory.

Example:

d:\DevSrc\Repository\Data\client

  Load data from a ZIP archive

You  can  enter  a  ZIP  file  (including  path)  that  includes  the  data  in  domain  structure.  MPDV

provides the ZIP archives as part of the trainings or on the support portal.

The access is read-only.

SMA-CMS_82.docx

Version: 1.0.23049

Page 140 of 178

SMA-CMS Customizing Suite for SMA

Server Source

You  can  specify  the  server  source  that  you  want  to  use  to  load  the  server-specific  data.  The  following

options are available:

  Load data from the runtime structure in the server

You  can  read  the  configurations  for  the  server  in  a  server  installation.  To  this  end,  the

configuration directory of the web service provider (WSP) up to the instance number is specified.

Example:

HYDRA:

\\<servername>\<install_dir>\jhydradir\MOC\1

MIP:

\\<servername>\<install_dir>\jdir\MOC\1

The  configuration  is  loaded  from  the  standard  scope  by  default  As  an  alternative,  you  can  also

load the configuration from the custom scope, if you enter the value "custom" in the field "name".

The access is read-only.

  Load data from a local directory with domain structure

You use local directories with domain structure for the administration of your own developments.

Using the Repository Client, you can read data in this directory and you can also save data into

this directory.

Example:

d:\DevSrc\Repository\Data\server

  Load data from a ZIP archive

You  can  enter  a  ZIP  file  (including  path)  that  includes  the  data  in  domain  structure.  MPDV

provides the ZIP archives as part of the trainings or on the support portal.

The access is read-only.

Priority

The  priority  of  a  data  record  specifies  the  loading  sequence  of  sources  that  are  allocated  to  the  same

data  record.  In  the  above  example,  data  is  first  read  from  the  local  development  directory

"d:\DevSrc\Repository"  and  then  from  the  runtime  installations  "Server"  and  "Client".  Data  records  with

low priority are overridden and consequently not loaded.

Is Writeable

In  this  column  you  can  specify  if  a  data  source  grants  write  access.  You  only  require  write  access  in

workset entries where you want to make local developments.

Please note that ZIP archives do not grant write access. For this reasons, you must not enable

"is Writeable" in case of a ZIP data source.

Please  note  that  it  is  not  supported  to  save  data  in  the  runtime  structure  (client  directory  or

server  runtime  directory).  You  must  therefore  not  enable  "Is  Writable"  for  data  sources  with

SMA-CMS_82.docx

Version: 1.0.23049

Page 141 of 178

SMA-CMS Customizing Suite for SMA

runtime structure.

Overrides

You  can  specify  in  this  column  which  domain  set  is  overridden  by  the  current  one.  This  affects  the

resolving of references (for details please refer to section References).

An entry in the "Overrides" column does not have any effect on the loading of the data sources.

See column "Priority".

Active

Use this option to enable or disable an entry.

4.7  Relations

Relations  are  a  property  of  perspectives  and  define  table  filters.  Tables  that  include  relations  are

dynamically  adapted  to  the  selected  values  of  another  table  by  setting  a  filter.  For  example:  Using

relations,  you  can  specify  that  only  the  service  parameters  of  the  service  currently  selected  in  another

service  view  are  displayed  in  a  service  parameter  view.  The  Relations  table  lists  the  relations  of  the

current perspective. You can call this table via the application menu (Perspective Relations).

The following columns are displayed:

Active

This checkbox specifies if the relation is used.

Name

The name of the relation – free choice.

Source

The table and its selection that are used to set the filters. If you edit an entry in this column, the currently

possible assignments, i.e. all currently existing views are presented in a selection box.

SMA-CMS_82.docx

Version: 1.0.23049

Page 142 of 178

SMA-CMS Customizing Suite for SMA

Target

The  table  where  the  filter  is  applied.  If  you  edit  an  entry  in  this  column,  the  currently  possible

assignments, i.e. all currently existing views are presented in a selection box.

Filter

You  can  store  the  filter  expression  here  that  you  want  to  apply  to  the  target  table.  Variables  ranging

between $0 and $9 are supported. These variables are dynamically filled with the values of the columns

Var[0-9].

Var[0-9]

In  these  columns,  you  can  specify  the  columns  of  the  source  table  that  are  used  to  adapt  the  filters

dynamically.

As soon as a correct (and activated) relation is entered in this table, it is applied. If you close one of the

referenced views of a relation, the relevant  view is removed from the relation. If this results in a double

entry  in  the  Relations  table,  this  entry  is  removed.  You  can  therefore  use  this  view  to  administer  the

relations  between  concrete  table  instances  and  to  administer  unbound  relations  that  can  serve  as

template for relations.

4.8  References

References show the inherent connections between data records of the repository. They are defined by

the repository structure and cannot be edited in the Repository Client. For example: A value in the column

"Syntactic  Type"  of  the  Property  table  references  another  data  record  in  the  Property  table.  The

References table lists the defined references and may be activated via the application menu (Repository

 References).

The following columns are displayed:

-  Name: Name of the reference

-  Source: The repository object type that can include this reference.

-  SourceColumn: The source type property that can include the reference.

-  Dependency: Source type property specifying the reference target.

SMA-CMS_82.docx

Version: 1.0.23049

Page 143 of 178

SMA-CMS Customizing Suite for SMA

-  Condition: Value that the property specified under Dependency must have. Only then, the reference

is  pursued.  For  example:  The  value  of  ControlDataSourceMode  (lookup,  reference)  specifies  the

target  of

the  reference  (ControlDataSource  or  ReferenceData)  which

is  specified

in

the

ControlDataSource property.

-  Target: The repository object type that is referenced.

-  Filter: Filter that selects the referenced data from the overall quantity of this type of data. Such a filter

can  include  the  variable  $value  (value  of  column  Value  in  the  current  row)  and  $parent  (value  of

column Parent in the current row).

-  Priority:  Specifies  the  priority  of  the  reference.  You  can  find  further  details  in  section  "Get

references".

References provide two general functions:

Show reference:  You can use this function to  display  the referenced data  in a  new table.  You can call

this function via the context menu (Context menu  Show reference).

Note: This function is only available in the context menu of cells which can include references.

Get references: Use this function to complete missing values of a data record with values of referenced

data  records.  For  example:  You  can  use  this  function  to  show  the  inherited  values  of  a  property  of  the

SemanticType or the SyntacticType.

You can call this function via the context menu (Context menu  Get references) of the table views/grids.

A new data record is generated and shown in a new panel. The generated data record is a copy of the

currently  selected  data  record.  The  values  that  are  not  filled  are  filled  by  those  in  the  referenced  data

records. The reference priority specifies the filling sequence.

4.9  Service documentation

The  Repository  Client  contains  an  extended  documentation  for  selected  standard  services.  The

documentation mainly includes services released in the system and to be used with the Service Interface

(SCS-SIF).

The documentation is available as of MRC version 1.8.STD.65500 (beginning of 2019).

There are two options to access the service documentation:



In the toolbar "Repository",  you can  use the button  Service Documentation to open the table of

contents of the services included. Via hyperlinks, you can navigate to the different services.



In  the  table  views  "Services"  and  "ServicesGui",  you  can  use  the  context  menu  to  open  the

documentation of the selected service if it is available.

SMA-CMS_82.docx

Version: 1.0.23049

Page 144 of 178

SMA-CMS Customizing Suite for SMA

Printing a service documentation:

You can print the service documentation using the shortcut Ctrl-P.

SMA-CMS_82.docx

Version: 1.0.23049

Page 145 of 178

SMA-CMS Customizing Suite for SMA

5  The Repository

5.1  Overview

The data of the repository is used in multiple ways:

  The  repository  defines  and  describes  the  interface  between  client  and  server.  The  input

parameters and the result sets of service requests are described.



In  case  of  interpreted  service  types,  the  processing  and  the  business  logic  of  a  service  is

specified via configuration in the repository. Only in exceptional cases, an actual programming in

the server is required.

  For  the  client,  the  repository  defines  how  the  data  is  displayed  on  the  client  and  which  GUI

elements are used to enter data. The repository also defines how the client checks the user input.

You can generate most of the applications on the client using the configurations of the repository.

Here, programming on the client is not required.

The  repository  data  is  grouped  and  structured  using  domains.  A  domain  summarizes  all  data  that

logically belongs to an application.

The domain contains hierarchically structured and typed data. A domain includes services and service

parameters, the respective GUI settings, properties, authorizations, ReferenceData and

ControlDataSources.

Find below a detailed description of the repository elements.

5.2  Domain

Domains have properties and provide services within the domain context.

A domain is the smallest software unit. You can update the domain using an update package. Create a

separate  domain  for  each  application.  This  domain  then  includes  the  services  implemented  for  this

application.  You  can  also  use  the  services  and  client  attributes  of  a  domain  in  applications  of  other

domains. For example, a client application in its own domain can use a service of a different domain.

You can assign global contents to a global domain: for example, client menu configurations or separate

global syntactic types.

Name

Each domain has a unique name. For the name, you use the notation "UpperCamelCase".

SMA-CMS_82.docx

Version: 1.0.23049

Page 146 of 178

SMA-CMS Customizing Suite for SMA

5.3  Service

Services  have  transfer  parameters  and  return  values,  which  are  often  identical  to  the  properties  of  the

domains.

5.3.1 Name

Name of a service. The service name usually consists of the domain name that includes the service and

the function, separated by a dot.

5.3.2 Function

This field describes the requested service function. Typical functions are list, update, insert, delete, new,

...

5.3.3 ServiceType

There are several service types.

InterpretedJavaService2:  Services  of  this  type  are  used  to  display  lists  and  evaluations.  The  services

are interpreted  at runtime using repository  data. Contrary to  the  InterpretedJavaService,  the services of

type  InterpretedJavaService2  are  prepared  to  stream  data  and  provide  more  elegant  options  for  Java

user exits.

InterpretedJavaService (obsolete): Services of this type are interpreted at runtime using repository data.

These services have been replaced with the service type InterpretedJavaService2.

InterpretedBAPIService:  You  use  services  of  this  type  to  edit  data.  The  services  are  interpreted  at

runtime using repository data.

ExternalJavaService:  Services  of  this  type  are  completely  implemented  in  Java.  You  can  use  these

services  to  implement  lists  or  editing  functions.  You  use  these  services  if  the  possibilities  of  the

interpreting service types are not sufficient and the logic must be converted into Java programming.

InterpretedWrapper:  Services  of  this  type  are  interpreted  at  runtime  using  the  repository  data.  The

service  is  implemented  as  wrapper  of  an  existing  PDM  dialog  and  is  therefore  subject  to  specific

limitations, e.g. it does not support any dynamic Where.

Wrapper (obsolete): Services of this type are programmed and wrap an existing BAPI function. They are

therefore subject to specific limitations, e.g. no dynamic Where.

JavaService (obsolete): Services of this type are completely implemented in Java.

Recommendation:

SMA-CMS_82.docx

Version: 1.0.23049

Page 147 of 178

SMA-CMS Customizing Suite for SMA

  The type InterpretedJavaService2 is recommended for services that you use to read data.

  The type InterpretedBAPIService is recommended for services that you use to write data.



If  the  interpreted  service  types  cannot  meet  the  requirements  (or  only  with  great  effort)  even  if

they  include  Java  user  exits,  you  should  use  the  services  implemented  in  Java  of  type

ExternalJavaService.

  The other service types are older technologies and should not be used for new developments.

5.3.4 ListMode

For  services  of  type  Wrapper  or  InterpretedWrapper:  This  column  must  be  populated  for  each  service.

The  column  specifies  whether  the  requested  PDM  dialog  returns  a  file  as  result  or  whether  it  is  only  a

return string. "Y" => The result is a file, otherwise only a string.

5.3.5 DLG

For  all  services  of  ServiceType  InterpretedWrapper  or  Wrapper,  you  must  fill  in  either  DLG  or

SystemCall. You fill in DLG, if ServiceType is Wrapper or InterpretedWrapper and if the service requests

a PDM dialog with the structure "DLG=<content in this column>|..."

5.3.6 SystemCall

For  all  services  of  ServiceType  InterpretedWrapper  or  Wrapper,  you  must  fill  in  either  DLG  or

SystemCall. Fill in SystemCall, if the you want to run a program in the server. In the column, the name of

the  external  program

is  specified.  The

result

is  a  PDM  dialog  with

the  structure:

"DLG=SYSTEM.CALL|PROG=<content of this column>|...".

5.4  ServiceGui

The  ServiceGui  data  define  the  use  and  the  presentation  of  the  services  on  a  client.  You  can  clearly

allocate the ServiceGui to a service via their name.

5.4.1 Name

The name of the service for which this data record provides presentation information.

5.4.2 Package

This field is obsolete and must be left empty.

5.4.3 Extended

This field is obsolete and must be left empty.

SMA-CMS_82.docx

Version: 1.0.23049

Page 148 of 178

SMA-CMS Customizing Suite for SMA

5.4.4 AdditionalDataLogics

This field is obsolete and must be left empty.

5.4.5 ApplicationID

Application  ID  used  for  generating  applications  in  the  client.  In  case  of  editing  applications,  the

ApplicationID is edited with the main data source of the application that you want to generate.

5.4.6 ApplicationTitle

Language key for the title of the generated application. In case of editing applications, the ApplicationTitle

is edited with the main data source of the application that you want to generate.

5.4.7 ApplicationHelpFile

File  name  of  help  file  (including  file  extension)  of  the  generated  applications.  In  case  of  editing

applications, the ApplicationHelpFile is edited with the main data source of the application that you want

to generate.

The  name  of  the  help  file  should  be  independent  of  the  technology  of  a  used  client.  The  client  should

therefore put a prefix in front of the file name. You can then design the help file displayed according to the

client's technology.

Example for the client MOC: In ApplicationHelpFile, you enter "Article.pdf". The client MOC then loads the

document "MOC_Article.pdf" as online help. The client automatically uses the prefix "MOC_".

5.4.8 ApplicationHelpIndex

Bookmark  that  is  activated  when  Help  is  opened.  In  the  main  application,  it  is  usually  "Overview".  You

must only edit this bookmark for the main data source of the application that you want to generate.

5.4.9 Description

5.4.9.1

 General

Language key for short description of service.

You can show this description on the client when the selection of services is displayed.

5.4.9.2

Processing in the MOC client

The MOC shows the description if you add a data source while configuring an application.

SMA-CMS_82.docx

Version: 1.0.23049

Page 149 of 178

SMA-CMS Customizing Suite for SMA

5.5  ServiceParameter

ServiceParameters specify the parameters of a service. They provide information on the data source and

value ranges.

The service parameters include selection criteria and the columns of the result set. A service parameter

can  be  a  selection  criterion  or  be  included  in  the  result  set.  The  attributes  described  below  specify  if  a

service parameter is used as selection criterion and/or is included in the result set.

5.5.1 Acronym

Name of the parameter. The combination of Acronym and ResultSet must be unique for each service.

5.5.2 ResultSet

If the associated service returns more than one ResultSet, a name must be indicated here. This way, you

can  return  results  in  parallel  that  have  been  calculated  at  the  same  time  but  have  a  different  structure.

The combination of Acronym and ResultSet must be unique for each service.

5.5.3 WebServiceType

Data  type  of  the  parameter  (decimal,  integer,  string,  boolean,  binary,  datetime).  This  value  must  be

identical  to  the  configured  value  of  the  property  configuration.  IMPORTANT:  binary  parameters  are  not

supported by default. You can only use these parameters in user exits.

5.5.4 DefaultValue

Specifies a service default value for a parameter.

5.5.5 IsResult

Specifies  whether  this  service  parameter  is  part  of  the  ResultSet  (return  value).  If  you  want  to  use  the

DefaultValue, do not set this field (IsResult).

In case of services ot type InterpretedWrapper, you must only set the column IsResult to "Y" for UPDATE,

LOCK,  UNLOCK,  DELETE,  INSERT  and  COPY,  if  the  BAPI  actually  returns  a  value,  e.g.  a  new

internal_id when you create new data records.

5.5.6 IsDynamicResult

Required  for  the  generation  of  the  Java  function  (for  dynamic  ResultSets,  the  column  number  must

automatically be extended to the fixed number). Missing columns are added as empty columns (i.e. these

columns are not computed).

SMA-CMS_82.docx

Version: 1.0.23049

Page 150 of 178

SMA-CMS Customizing Suite for SMA

5.5.7 InputAsArray

The client must transfer values in form of an array. InputAsArray is only reasonable in case of a quantity

input  parameter,  i.e.  if  at  least  one  of  the  two  columns,  IsSpecialParameter  and  IsFilterParameter,  is

set and a quantity operator such as BETWEEN or IN is possible.

Specify if a field is an array or not (with filters always yes except for Boolean type).

If true and no array or empty, then exception. Is currently only verified in case of mandatory special

parameters.

5.5.8 IsSpecialParameter

Specifies whether or not the parameter is a special type controlling the service functionality (i.e. is not a

filter parameter). For the  ServiceType Wrapper, this is the only possible parameter type. In case of the

ServiceType  JavaService,  it  represents  a  special  parameter  not  directly  included  in  the  WHERE

condition but with different "controlling" effects. If you want to use the Default Value on the server side, do

not set this field. In addition to the defined special parameters of standard processing, you can also use

other special parameters in user exits.

5.5.9 IsFilterParameter

Specifies whether it is a filter parameter. If you want to use the  DefaultValue on the server side, do not

set this field.

5.5.10

IsMandatory

Specifies  whether  it  is  a  mandatory  parameter  for  the  service.  If  true  and  parameter  is  missing,  an

exception is thrown. Is currently only checked for special parameters.

5.5.11  Can* (filter) operators

This option specifies whether the service supports the relevant filter operator for this parameter. Set the

"Can*" fields for filter parameters.

Available operators:

-  CanEqual

-  CanLike

-  CanBetween

-  CanIn

-  CanNotEqual

-  CanLt (Can Less Than)

SMA-CMS_82.docx

Version: 1.0.23049

Page 151 of 178

SMA-CMS Customizing Suite for SMA

-  CanLte (Can Less Than or Equal To)

-  CanGt (Can Greater Than)

-  CanGte (Can Greater Than or Equal To)

For technical reasons, each operator has a second operator that you should select is a data record must

be selected, if the operator is applicable or if the comparative value is NULL. The operator CanEqual will

only return a data record in case of equal values, CanEqualOrNull in case of equal values or if the data

record value is NULL. Accordingly, there are the following operators:

-  CanEqualOrNull

-  CanLikeOrNull

-  CanBetweenOrNull

-  CanInOrNull

-  CanNotEqualOrNull

-  CanLtOrNull

-  CanLteOrNull

-  CanGtOrNull

-  CanGteOrNull

Especially with List Services you should make sure that generally all parameters support all operators in

order  to  achieve  the  highest  possible  selectivity.  In  general,  the  framework  supports  this  for  Java

services.

  You may only set CanIn, CanBetween, CanBetweenOrNull and CanInOrNull, if InputAsArray

is also set.

  CanLike is only useful if the WebServiceType is string.

  With WebServiceType boolean, only CanEqual is useful.

  With WebServiceType string, all operators are possible.

  With all other types, all operators except for CanLike and CanLikeOrNull are useful.

Before you set wrappers,  you must check which operators are actually supported by the PDM dialog or

the system command.

5.5.12  HydraAcronym

With service type InterpretedWrapper, the HYDRA acronym is specified.

5.5.13  HydraResultAcronym

If  the  acronym  of  the  selection  criterion  is  different  to  the  acronym  in  the  result  file,  you  can  enter  an

acronym that is different to the HydraAcronym for the service type InterpretedWrapper and ListMode=Y.

SMA-CMS_82.docx

Version: 1.0.23049

Page 152 of 178

SMA-CMS Customizing Suite for SMA

5.5.14  TransferEmptyValuesToHydra

Specifies  whether  blank  values,  too,  are  to  be  transferred  to  the  server,  or  whether  the  ID  is  simply

omitted. "Y" => blank values are transferred, otherwise => ID is completely omitted.

Note:  You  must  set  this  field  for  Insert  and  Update  (editing  screens).  Only  then,  you  can  enter  blank

values and/or overwrite existing values with blank values.

5.5.15  HydraShiftPart

The following components  are combined  with the  Reference field: Start of shift  date, start  of shift  time,

end of shift, end of shift time stamp, start of shift time stamp. These components are marked as belonging

together. The column "HydraShiftPart" can include the following values:

  beginDate

  beginTime

  beginDatetime

  endTime

  endDatetime

Important:  The  column  can  only  be  populated  if  the  parameter  is  part  of  a  group  that  includes  the

following five components: Start of shift date, start of shift time, end of shift, end of shift time stamp, start

of shift time stamp. The column must not be populated if it is only a group of three components including

date, time and date + time field. In this case, ONLY populate the Reference column.

5.5.16  Reference

Is used to generate a DateTime data type from one field each for the date and the time (in seconds after

midnight) and to identify the shift parameters.

5.5.17  TransformationType

Use  this  field  to  specify  transformations  for  input  and  result  parameters  for  List  Services/wrappers  (e.g.

convert Bool to J/N and vice-versa or correct filtering for DateTime fields that consist of two fields in the

database). For further details on this field, refer to section 5.10.

5.5.18  PlugName

Specifies whether the result parameter for this service is directly derived from the specified DataObject or

whether it is added to the DataObject via plug.

SMA-CMS_82.docx

Version: 1.0.23049

Page 153 of 178

SMA-CMS Customizing Suite for SMA

Example:

Service  A.List  uses  a  plug  of  service  B.List  in  the  service  parameter  b.  Consequently,  the  following

configuration applies to service A.List:

ServiceParameter  DataObjectName  PlugName
a
b

A.List
A.List

B.List

If the field PlugName includes a value, the Interpreter replaces the values of the ServiceParameter with

those values of the plugged service when creating the SQL statement.

In  the  special  case  where  an  interpreted  List  Service  does  not  use  an  own  table  but  only  plugs,  and

subsequently adds fields via user exit, these fields should state USEREXIT!

If you create new services, it is recommended to avoid plugs and to provide data directly via the

DataObject via Join. Dependencies between several services are thus avoided.

5.5.19  DBField

Database field that  you use to make a selection. Write the database field in lower case. You can either

enter  simply  the  field  name  or  (for  complex  expressions)  the  expression  with  placeholders  for  the  alias

(e.g. hydadm.get_datetime(%1$s.bearb_date,%1$s.bearb_time) or {fn substring(%1$s.field,2,1)}).

Proceed as follows for joins to other tables:

Entry: <ALIAS>.<DBfield>

Example:

DB field: STA1.status_bez

Acronym: gage.status.designation

Table: caq_status (STA1)

Conditions: status_typ = ‘PMSTATUS’, status_nr = status

5.5.20  DBAlias

The alias for the table that is used to select the value for the acronym.

SMA-CMS_82.docx

Version: 1.0.23049

Page 154 of 178

SMA-CMS Customizing Suite for SMA

5.5.21  DBTabelle

The table that is used to select the value for the acronym.

5.5.22  DBFieldAlternative

If  you  cannot  use  the  DBField  because  the  ConditionalFieldKey  is  not  applicable,  you  use  the

DBFieldAlternative.

You can enter a number, "null, 'string', {fn ...} or another field / subselect.  If it is another field or subselect,

you MUST enter %1$s for the alias of the table.

If DBFieldAlternative is empty, but you require an alternative field, NULL is selected.

5.5.23  DataObjectName

If a service uses several data sources to identify its data, you can store the data source (= DataObject =

DO) that issues the result parameter in this field. For example: A service includes the parameters a, b and

c:

- a is computed,

- b is identified using data object (DO) F and

- c is identified using data object (DO) G.

For a: the field is blank. For b: the field contains F. For c: the field contains G. Is used as reference for the

...do.xml configuration.

5.5.24  ConditionalFieldKey

This  field  specifies  if  a  DB  field  is  only  conditionally  available.  The  ConfigurationManager  checks  the

condition for the existence of the field. Enter the feature key of the Configuration Manager (feature set) in

this repository field to enable the check.

If  a  parameter  is  a  conditional  field  and  the  condition  is  not  fulfilled,  the  entries  for  the  MOC

acronym are removed from the ComplexSelectMap and the SpecialFilterMap.

As  a  result,  the  changes  in  the  Special  Filter  Map  via  user  exits  and  transformation  type  are

also lost!

SMA-CMS_82.docx

Version: 1.0.23049

Page 155 of 178

SMA-CMS Customizing Suite for SMA

5.5.25  Constraints

Constraints  are  processing  parameters  that  are  used  for  ServiceType  InterpretedBAPIService.

Constraints are structured as keys with optional values. The separator between keys is the pipe character

(|).  You  use  a  semicolon  to  separate  various  values.  You  use  the  equal  sign  (=)  to  separate  key  and

value. The general structure is as follows:

Key1=Value;Value;Value|Key2|Key3=Value|

The following constraints are available:

Constraint Key

Constraint value(s)

Description

KEY

exactly one number between 1 and 5

Define field as key including key

SERIAL

none

number for hyd_lock table

Field is a SERIAL (and/or auto-

increment)

SEP_DATETIME

1st parameter refers to the date field

Allows processing of separate date

2nd parameter refers to the time field

and time fields

BOOL

1st  parameter  is  the  value  to  be  entered

Use this to write Boolean values into a

into the DB if true

string or Integer Field.

2nd  parameter  is  the  value  to  be  entered

into the DB if false

3rd  parameter  is  the  value  to  be  entered

into the DB if null (null for null)

4th parameter is the type of DB field, e.g.

BOOL=J;N;null;string|

BOOL=1;0;null;integer|

MODIFY_TS

MODIFY_BY

CREATE_TS

CREATE_BY

None

None

None

None

5.6  ServiceParameterGui

The ServiceParameterGui define how ServiceParameters are displayed on the client. Use  Acronym and

ResultSet to clearly allocate ServiceParameterGui to a service parameter.

SMA-CMS_82.docx

Version: 1.0.23049

Page 156 of 178

SMA-CMS Customizing Suite for SMA

A  number  of  settings  exist  in  the  ServiceParameterGui  and  in  the  properties.  You  normally  use  the

properties  to  define  how  data  is  displayed  on  the  client.  You  only  fill  the  respective  field  in  the

ServiceParameterGui if you want to display specific services on the client in a way that is different to the

settings in the properties. The ServiceParameterGui fields overwrite the property fields of the same name.

5.6.1 Acronym

Name  of  the  parameter  for  which  this  data  record  provides  presentation  information.  There  must  be  a

corresponding property for each acronym of a parameter.

5.6.2 ResultSet

See ResultSet with ServiceParameter.

5.6.3 Label

5.6.3.1

 General

The  label  includes  a  language  key.  Using  this  language  key,  the  parameter  on  the  user  interface  is

identified  (by  default),  e.g.  as  label  text  of  a  column  header.  Overwrites  the  value  from  the  property

configuration.

5.6.3.2

Processing in the MOC client

The label is displayed as label text of a field or a column title.

5.6.4 Tooltip

Specifies a specific tooltip for the parameter in the service context. Entry as language key.

5.6.5 FormatType

Use this field to overwrite specific values of a property in relation to the service (currently Label, Length,

ControlType,

ControlTypeMode,

ControlDataSource,

ControlDataSourceMode,

ControlDataSourceResult).

For example: If you enter workplace.id as FormatType for the parameter resource.id, you can define for

the  parameter  to  be  a  resource.id  in  this  service,  however  its  length,  label  and  control  properties  are

taken from workplace.id.

In  this  case  (other  than  in  case  of  semantic  and  syntactic  types),  the  value  from  FormatType  takes

priority. For this reason, we have a new hierarchy:

SMA-CMS_82.docx

Version: 1.0.23049

Page 157 of 178

SMA-CMS Customizing Suite for SMA

-  Value from FormatType

-  Value from ServiceParameterGUI

-  Value from Property

-  Value from SemanticType

-  Value from SyntacticType

5.6.6 ClientDefaultValue

Input  fields  have  a  ClientDefaultValue  property.  The  value  entered  here  is  displayed  as  default  value

when the control is initialized. "From" and "to" values are separated by semicolons.

Set  checkbox:  If  the  value  of  this  field  is  set  to  true  during  a  CheckEdit,  the  checkbox  is  set  after

initializing.

Preallocation  of  text  fields  with  "from"  and  "to"  values  (InputAsArray):  set  value1;value2  to

prepopulate the 'from' and 'to' fields during a text edit.

Date fields: In case of date fields, the field can be preallocated with an offset. If you set default values for

date fields, you must absolutely specify the type of offset. The following offsets are possible:

  h (hours)

  d (days)

  w (weeks)

  m (months)

  y (years)

The 'to' value is always relative to the 'from' value. The default value is always a DateTime object. The

presentation depends on the output format of the relevant field.

You can put "[" and "]" in front and at the end of the relevant value to specify the start and end of a period

of  time.  Consequently,  e.g.  "[0d;0d]"  means  that  12:00:00  AM  is  entered  in  the  'from'  field  today  and

11:59:59 PM is entered in the 'to' field today. "[-1w;0w]" means from Monday last week up to Sunday last

week.

Examples

Current date:

0d

SMA-CMS_82.docx

Version: 1.0.23049

Page 158 of 178

SMA-CMS Customizing Suite for SMA

From today to the day after tomorrow:

0d;2d

From today to one week from today:

0d;1w

From yesterday to tomorrow:

-1d;2d

From one year ago today to one year from today:

-1y;2y

Year  shortlists:  You  can  configure  a  year  shortlist  by  ControlDataSource  =  YearList  and

ControlDataSourceMode = Script, or even  by standard "Service-ControlDataSource". In this case,  you

can use the following default values:

  Current year: 0y and/or currentyear

  Last year: -1y

  Following year: 1y

  4 years ago: -4y

  Year that was current 10 months ago: y-10m  this is mostly the case when the

relevant year field is used in combination with a month shortlist.

If  you  want  to  preallocate  two  fields  (ShowSecondControl),  you  have  to  separate  both  values  by

semicolon, e.g. -1y;1y

Month shortlists: You can use the following default values for a month shortlist:

-  Current month: 0m

-

Last month: -1m

-  Following month: 1m

-

4 months ago: -4m

SMA-CMS_82.docx

Version: 1.0.23049

Page 159 of 178

If  you  want  to  preallocate  two  fields  (ShowSecondControl),  you  have  to  separate  both  values  by

SMA-CMS Customizing Suite for SMA

semicolon, e.g. -1y;1y.

5.6.7 IsKey

The  IsKey  column  is  very  important  and  should  be  occupied  for  all  key  columns  of  a  service,  since

otherwise  data  records  cannot  be  clearly  identified.  Columns  including  the  value  'null'  may  NOT  be

defined  as  keys.  The  IsKey  columns  should  be  identical  for  all  services  (insert,  update,  delete,  lock,

unlock, copy). These entries are important, so it is best to verify them twice.

This  field  specifies  the  positioning  of  the  cursor  after  an  editing  operation.  If  the  positioning  option

OnKeyValue  is  selected,  the  client  should  only  request  one  new  data  row  after  editing.  You  also  use

values  that  are  marked  IsKey  as  selection  criteria.  IsKey  must  also  be  set  for  delete,  since  this  data

record must be deleted from the view.

IsKey  must  also  be  indicated  for  list.  If  no  sorting  is  given  in  the  list,  sorting  takes  place  according  to

IsKey fields.

Every parameter which is IsKey MUST always be IsMandatory. This rule has two exceptions:

-

List service

-  Wrappers with composed keys.

5.6.8 ShowInGrid

Specifies whether the parameter is to be displayed in tables by default.

5.6.9 ShowInDetail

Specifies whether the parameter is to be displayed in detail views by default.

5.6.10  ShowInSearch

Specifies if the parameter is to be used as selection criterion (i.e. in selection panels) by default.

5.6.11  ColumnCategory

5.6.11.1

 General

In  the  tabular  view,  the  client  should  provide  the  option  to  summarize  the  columns  in  the  table  to

categories. You specify a language key that is displayed as title of the summarized columns.

SMA-CMS_82.docx

Version: 1.0.23049

Page 160 of 178

SMA-CMS Customizing Suite for SMA

5.6.11.2  Processing in the MOC client

The ColumnCategory is used to assign the parameter to a "strip" in the grid (table view).

5.6.12  Category1, Category2, Category3

5.6.12.1

 General

The  client  processes  the  columns  Category1,  Category2,  Category3  in  order  to  group  fields  in

applications.  The  grouping  can  be  performed  via  tabs  or  frames  for  a  group  of  fields.  You  specify  a

language key that is displayed as title or label text of the grouped elements.

5.6.12.2  Processing in the MOC client

Category1: Assigns the parameter to a tab in the detail view.

Category2: Grouping options for detail screens.

Category3: Currently not used.

5.6.13  TabOrder

You specify the order of tabs for detail views.

5.6.14  ColumnOrder

You specify the order of columns in tabular views.

5.6.15  ShowSecondControlInSearch

5.6.15.1

 General

Specifies  whether  a  second  control  is  to  be  displayed  (from/t0).  You  can  use  this  setting  with  selection

criteria that include a value range via the operator CanBetween, e.g. "date from/to".

5.6.15.2  Processing in the MOC client

The  MOC  provides  two  adjoining  fields.  The  label  text  of  the  second  field  is  automatically  "to".  If  it  is  a

field of "date" type, you can predefine a relative date for both fields.

5.6.16  SearchTabOrder

Specifies the tab sequence for the selection panel.

SMA-CMS_82.docx

Version: 1.0.23049

Page 161 of 178

SMA-CMS Customizing Suite for SMA

5.6.17  SearchCategory1, SearchCategory2

5.6.17.1

 General

The  client  processes  the  columns  SearchCategory1  and  SearchCategory2  in  order  to  group  fields  in

selection panels. The grouping can be performed via tabs or frames for a group of fields.  You specify a

language key that is displayed as title or label text of the grouped elements.

5.6.17.2  Processing in the MOC client

SearchCategory1: You allocate the parameter to a tab in the selection panel.

SearchCategory2: Grouping options for the selection panel.

5.6.18  ControlType

Use the ControlType to specify  which control should  be used for the relevant parameter. The client  will

map the abstract type onto a specific control class. If you do not specify a type, the client uses the data
type to decide on the ControlType. Possible values for the ControlType:

CheckEdit:  Selects  a  Boolean  value  (true/false)  or  multiple  values  if  a  reference  to  a  data  source  is

given.

ColorEdit: Selects a color value.

ComboBoxEdit: Combobox with selection of values from web service or data reference.

DateTimeEdit: Enter a date and/or a time.

MemoEdit: Enter an arbitrary text.

RadioGroup:  Selects  a  Boolean  value  (true/false)  or  one  of  multiple  values  if  a  reference  to  a  data

source is given.

TextEdit: Standard text input. You can add a button opening a search dialog to this control, if you add a

reference to a service in ControlDataSource. If you enter the name of a DataLogic in ControlParameter

and  if  a  mapping  is  included  in  ControlDataSourceResult,  data  will  be  requested  upon  leaving  the

control and return values will be mapped appropriately.

5.6.19  ControlTypeMode

5.6.19.1

 General

Allows for controlling the input control.

SMA-CMS_82.docx

Version: 1.0.23049

Page 162 of 178

SMA-CMS Customizing Suite for SMA

CheckEdit: DualState (default), TriState, J;N;J (checked;unchecked;tristate)

ColorEdit: none

ComboBoxEdit: SingleEdit, Single, Multiple (multiple selection)

DateTimeEdit: Date (date display), Time (time display), DateTime, RelativeDate, RelativeDateTime

MemoEdit: none  .

RadioGroup: SingleColumn, SingleRow

TextEdit:

-  Empty: the search button is shown if a ControlDataSource is defined.

-

-

"SearchButton": Search button is shown.

"SearchButtonValidate":  Search  button  is  shown.  If  you  enter  an  invalid  value,  an  error  is

displayed.

-

"OpenFileDialog": opens a file selection dialog.

5.6.19.2  Processing in the MOC client

If  you  use  DateTimeEdit  including  the  definition  of  a  relative  date  (ControlTypeMode:  RelativeDate  or

RelativeDateTime), you can enter a relative date.

If  ShowSecondControl  =  true,  you  can  predefine  the  complete  relative  value  range.  In  this  case,  a

button is displayed behind the second input control. You can use this button to open the following dialog:

Use this dialog to customize the values for ClientDefaultValue . The following entries are possible:

-  Empty: no value is adopted

SMA-CMS_82.docx

Version: 1.0.23049

Page 163 of 178

SMA-CMS Customizing Suite for SMA

-  Today: the current date is adopted

-  Absolute date: you can select a fixed date value via a calendar control

-  Relative date: you can select and adopt a date relative to the current date. In this context,

"Start of period" means that you additionally go to the start of the selected period. Example:

current date is 20-MAY-2010. If you select "- 1 month", 20-APR-2010 is adopted. If you also

select "Start of period", the date is changed to 01-APR-2010. The same applies to "End of

period". These settings are saved in the mpdvEdit or the selection profiles as

ClientDefaultValue.

5.6.20  ControlParameter

See ControlType  TextEdit

5.6.21  ControlDataSource

Data source for the selection of values. The data source can be:

-  Web  service  (configuration:  ControlType  =  ComboBoxEdit,  ControlDataSourceMode  =

Lookup,  ControlDataSource  =  Name  of  a  ControlDataSource.  See  also  section

"5.8 ControlDataSource")

-  ReferenceData  (configuration:  ControlType  =  ComboBoxEdit,  ControlDataSourceMode  =

Reference, ControlDataSource = Type of ReferenceData)

-  Search  application  (configuration:  ControlType  =  TextEdit,  ControlDataSourceMode  =

Lookup, ControlDataSource = application name)

-  Script  (configuration:  ControlType  =  ComboBoxEdit,  ControlDataSourceMode  =  Script,

ControlDataSource = Name of script)

5.6.22  ControlDataSourceMode

Data source mode (Lookup, Reference or Script).

5.6.23  ControlDataSourceParameter

Optional  setting  of  parameters  of  a  ControlDataSource.  If  you  make  settings  here,  these  settings

overwrite the settings in the ControlDataSource.

See also the description ControlDataSource - Parameter

5.6.24  ControlDataSourceResult

Optional setting of the result of a ControlDataSource. If you make settings here, these settings overwrite

the settings in the ControlDataSource.

SMA-CMS_82.docx

Version: 1.0.23049

Page 164 of 178

The settings in this field provide more options than the Result in the ControlDataSource:

SMA-CMS Customizing Suite for SMA

Result columns are separated by semicolon. Field mapping:

-  First entry: Value

-  Second entry: Labeling

-  Third entry: UnitLabel

-  As of the fourth entry, the fields are mapped:

o  Via acronym or semantic type.

o  Field  mapping:  in  ControlDataSourceResult,  you  can  enter  a  mapping  in  the  form

"FieldName=ColumnFromResult" as from the fourth entry. For example, you can specify

tool.id=resource.id in order to fill the field  "tools.id"  with the "resource.id" value from the

search application. Several mappings are separated by ";" - spaces are not allowed.

o  Asterisk  mapping:  Instead  of  mapping,  you  can  also  enter  *  .  Subsequently,  all  return

columns of the search application are mapped. The mapping is performed as usual via ID

or semantic type.

5.6.25  VisibleCondition

This value decides whether an input field is visible on the client. For customization, see

EditableCondition.

5.6.26  EditableCondition

This value decides whether you can edit an input field on the client. There are three possibilities:

-  Boolean value: In case of TRUE or FALSE, the field is always editable / non-editable.

-  Binary expression:

o  Field name must be the name of a field that is also located in the ControlPanel.

o  Valid operators: =, <, >, <=, >=, <>, !=

o  The value is written as a string and interpreted depending on the comparative field value.

o  Field, operator and value must be separated by a space!

-  Concatenation of binary expressions:

o  You can concatenate an arbitrary number of binary expressions.

o  You can use the operators "&&", "AND", "||", "OR" to link expressions.

o  Here, too, all components of the conditions must be separated by a space.

o  Priority of operators: "AND" or "&&" are evaluated first, then "OR" and "||".

You cannot use brackets.

o  Example: resource.id = 12345 && resource.costcenter = 20 || resource.id = 60610

SMA-CMS_82.docx

Version: 1.0.23049

Page 165 of 178

SMA-CMS Customizing Suite for SMA

The client assigns the default value of the property "ClientDefaultValue" to the field, if the result

of  an  expression  in  the  EditableCondition  or  the  VisibleCondition  changes  from  FALSE  to

TRUE.  The  client  dynamically  evaluates  the  expressions  in  the  EditableCondition  and  the

VisibleCondition, if the fields of the application change.

5.6.27  ScriptId

5.6.27.1

 General

The ID of the script that is allocated to the parameter.  If you set the ID, the relevant script is performed

upon various events (at present EditValueChanged and Leave).

5.6.27.2  Processing in the MOC client

The method  name  of  the  script  is  ScriptId+EditValueChanged  and/or  ScriptId+Leave.  The  script  can  be

included in any DLL that is read by the CodeManager.

5.7  Property

For the acronyms, properties include information on data types, input and output formats, display options,

a name (that can be localized) and other settings specifying how ServiceParameters are displayed in the

client. Each property has a system-wide unique acronym.

A  number  of  settings  exist  in  the  ServiceParameterGui  and  in  the  properties.  You  normally  use  the

properties  to  define  how  data  is  displayed  on  the  client.  You  only  fill  the  respective  field  in  the

ServiceParameterGui if you want to display specific services on the client in a way that is different to the

settings in the properties. The ServiceParameterGui fields overwrite the property fields of the same name.

5.7.1 Acronym

Clear identification of the property across all domains.

5.7.2 WebServiceType

Describes the data type used to transfer the property between client and server. The currently supported

WebServiceTypes are exclusively

-

-

-

-

-

binary

boolean

datetime

decimal

integer

SMA-CMS_82.docx

Version: 1.0.23049

Page 166 of 178

SMA-CMS Customizing Suite for SMA

-

string

Important: the types *date and *time are internal types which are not transferred.

5.7.3 NETType

The  data  type  used  by  the  client.  If  NETType  is  empty,  the  WebServiceType  is  used  to  automatically

identify the data type used by the client. At present, NETType supports the following entries:

-

color: Use color to convert the transferred integer into an RGB code. In this case, the conversion

is implemented by the grid.

-  duration: creates a duration from an integer.

-

image: either creates an image from a transferred byte array or interprets a transferred string as

image  name.  For  example,  the  maintenance.active.led  property  is  transferred  as  a  string

including the name of an icon.

-  preview: Specifies that the contents in the client may be displayed as "preview" (similar to auto-

preview outlook) (application e.g. in DevExpress grid).

-

timestamp: Use timestamp to automatically create an additional column for date values in the

client in order to process time and date separately.

5.7.4 SemanticType

Use  semantic  types  to  inherit  semantic  properties.  The  "order.id"  is  therefore  used  to  identify  orders

(semantic meaning). The acronym  operation.order.id  includes such an order  identification  and therefore

has the semantic type order.id. If an attribute of the property is not set (empty), the respective value from

the semantic type is used for the processing in the client.

For example:  You must set the semantic type if  you  want to adopt a  value from a lookup screen in the

field.  For  the  workplace  field,  enter  e.g.  resource.id  as  semantic  type  in  order  to  adopt  the  selected

workplace  from  a  search  screen  for  workplaces.  Refer  to  the  description  of  the  SyntaticType  for further

information  on  the  priority  used  to  specify  the  attributes  of  a  Property,  the  SemanticType  and  the

SyntacticType.

5.7.5 SyntacticType

You mainly use a syntatic  type for a  uniform presentation of the  different properties. The syntactic type

does  not

include  any  semantic  content.  For  example:  The  properties  booking.begin_ts  and

booking.shift.start_ts have different semantic meanings, but are presented in a uniform format that can be

controlled centrally.

Syntactic types are used to control the characteristics of a Property: for example length, input and output

screen, tooltip, label, etc. To select the valid value for a characteristic, the client proceeds as follows:

SMA-CMS_82.docx

Version: 1.0.23049

Page 167 of 178

SMA-CMS Customizing Suite for SMA

-

If the characteristic (e.g. length) is set in Property, the client uses this value.

-  Or: If a semantic type is available and the characteristic is set, the client uses this value.

-  Or: If a syntactic type is available and the characteristic is set, the client uses this value.

Note:

-  You must always enter a description for syntactic and semantic types.

-  Syntactic  types  can  reference  other  syntactic  types  so  that  "inheritance  hierarchies"  can  be

created.

-  Create syntactic types as property of the SyntacticType domain.

-  Semantic types are usually "real" properties of a "normal" domain that are used as semantic type

at other places.

5.7.6 Label

5.7.6.1

 General

The  label  includes  a  language  key.  Using  this  language  key,  the  parameter  on  the  user  interface  is

identified  (by  default),  e.g.  as  label  text  of  a  column  header.  Overwrites  the  value  from  the  property

configuration.

5.7.6.2

Processing in the MOC client

The label is displayed as label text of a field or a column title.

5.7.7 DefaultTooltip

Specifies the default tooltip for the property as language key.

5.7.8 UnitLabel

Text key for unit. The unit is displayed to the right of the input field.

5.7.9 OutputFormat

This field specifies the format that is used to display a value (e.g. for date or quantity values). If you do

not  enter  an  InputFormat  in  the  repository,  the  MOC  tries  to  develop  an  appropriate  format  from  the

OutputFormat.  Enter  the  value  InputFormat  in  the  repository  only  if  special  masking  is  required.  Find

further details in section "5.7.12 Rules for the input/output formatting".

SMA-CMS_82.docx

Version: 1.0.23049

Page 168 of 178

SMA-CMS Customizing Suite for SMA

5.7.10

InputFormat

Equivalent  to  OutputFormat.  You  can  enter  a  valid  regular  expression  in  the  field  InputFormat.  Other

entries that are not regular expressions are not permissible. Find further details in section 5.7.12.

5.7.11  Length

The  client  shows  the  control  for  this  acronym  in  the  specified  width  (i.e.  the  specified  number  of

characters).  With  Length=0,  the  control  uses  the  entire  width  available.  If  a  width  is  specified  but  the

space available is not sufficient, the control is cut off.

This field also specifies the number of characters that you can enter in an input field with ControlType =

TextEdit, if no other InputFormat is specified.

5.7.12  Rules for the input/output formatting

Overview

In  the  repository,  you  define  the  formatting  of  the  data  output  and  the  input  dialogs  to  edit  data.  The

"Properties"  of

the  different  acronyms

include  an  OutputFormat  and  an

InputFormat.  The

OutputFormat defines formatting if you display a value.

Important:  If  you  do  not  enter  an  InputFormat  in  the  repository,  the  MOC  uses  the  OutputFormat  to

generate an appropriate formatting. Enter the value InputFormat in the repository only if special masking

is required.

In case of strings, you cannot enter the special characters asterisk (*) and pipe (|), if you have

not defined any input format. As you use these two special characters as separator and control

character, they can cause problems if they are written in the database.

With strings, the maximum number of characters that you can enter is defined by the attribute

Length, if no other input format is defined.

Syntactic types

The  Properties  provide  so-called  "syntactic  types"  in  order  to  make  groups  (similar  to  field  types  in

Delphi). Syntactic types have the same properties as real properties. The real properties have a syntactic

type. For example, if the output format of the syntactic type includes a value, this value is used wherever

this syntactic type is entered.

Example: Industrial minutes

SMA-CMS_82.docx

Version: 1.0.23049

Page 169 of 178

SMA-CMS Customizing Suite for SMA

The syntactic type "Durations" has the format {0:mpdv_timespan}. With the different properties showing

durations, "Durations" is entered in the column  SyntacticType and no entries are made in the columns

"output format" and "input format". When the property is read - and if no output format is available in the

property - the format of the syntactic type is used.

If  a  system  displays  industrial  minutes  (no  standard  function!)  and  if  the  syntactic  type  "Durations"  is

specified,

the  output

format

is

automatically

changed

from

{0:mpdv_timespan}

to

{0:mpdv_industrialMinutes}. As a result, all formats including the syntactic type "Durations" are shown in

industrial time units.

Times and durations are internally stored in the system as integer seconds. If you convert times

or durations during input or output formatting to formats other than hours, minutes and seconds

(HH:MM:SS), the conversion may not be possible  without  losses. For example,  this applies to

the use of the "mpdv_calc" format and the classic industry minute display:

When  converting  from  seconds  to  hours  (division  by  3600),  decimal  numbers  with  an  infinite

number  of  decimal  places  can  occur,  which  inevitably  have  to  be  rounded  when  displayed  on

the client. Example: 20 minutes = 1200 seconds = 0.333333… hours. If the value is rounded to

three  decimal  places,  you  calculate  backward  as  follows:  0.333  *  3600  =  1198.8  seconds.

Depending  on  how  the  client  rounds,  the  internal  value  is  then  no  longer  1200  seconds,  but

1999 or 1998 seconds.

If you use less than three decimal places, the conversion error gets even greater:

The system recorded a duration of 123 seconds. The client displays 0.03 hours. If you calculate

backwards, the result is 108 seconds.

Output formats

OutputFormat

Examples   Description

Automatically
created
masking
(input format)

Numeric data
f(number)

None

f3, f1

n(number)

None

n0, n2, n5   Numeric

value

Numeric
thousands
value  without
separator.  The  number  specifies  the
number of decimal places.
with

thousands
separator.  The  number  specifies  the
number  of  decimal  places,  even  if  the
data  type  to  be  displayed  is  an  integer
type.  In  case  of  n0,  no  decimal  places
will be shown.
Arbitrary format

MPDV  format  provider.  Conversion  of
seconds to hh:mm:ss and vice-versa.

#.(##) ,
#.(0)
{0:mpdv_timespan}

None

None

#.####,
#.0000
2:33:30

SMA-CMS_82.docx

Version: 1.0.23049

Page 170 of 178

{0:mpdv_timespan_short}

None

{0:mpdv_timespan_minutes}

None

2:33

45

{0:mpdv_cycletime}

None

1:30:00

{0:mpdv_te}

None

2.00

Strings
empty

empty

empty

[^*|]]*

[^*|]{0.10}

[0-9a-fA-F]

Special formats
{0:mpdv_cycletime_sec_cycle}

None

29
sec/cycle

{0:mpdv_IndustrialMinutes}

None

1.50

{0:mpdv_leadingzeros_order}

ORDER

{0:mpdv_leadingzeros_operation}  ORDER

{0:mpdv_leadingzeros_sequence}  ORDER

SMA-CMS Customizing Suite for SMA

MPDV  format  provider.  Conversion  of
seconds to hh:mm and vice-versa.
MPDV  format  provider.  Conversion  of
seconds to minutes and vice-versa.
MPDV  format  provider.  Hours  per  1000
pieces.  Conversion  into  seconds  and
vice versa.
MPDV  format  provider.  Hours  per  1000
pieces.  Conversion  into  seconds  and
vice versa.

*

and

Illegal  characters  begin  with  ^.  In  this
|
example
* No limitation in length
Illegal  characters  begin  with  ^.  Max.
length: 10 characters
Allowed  characters  0
through f, A through F.

through  9,  a

the

input

MPDV  format  provider.  Seconds  per
into  seconds  per
cycle.  Conversion
1000.
MPDV  format  provider.  Conversion  of
seconds into industrial minutes and vice
versa.
You  must  combine  this  output  format
with
format  ORDER.  The
combination is used in the syntactic type
"order_id".  The  basic  settings  are  used
to automatically specify the length.
You  must  combine  this  output  format
with
format  ORDER.  The
combination is used in the syntactic type
"operation". The basic settings are used
to automatically specify the length.
You must combine this output format
with the input format ORDER. The
combination is used in the syntactic type
"ordersequence_id". The basic settings
are used to automatically specify the
length.

input

the

Input formats

The following definitions are available for the input format:

-

Leave empty: The input format is implicitly defined using the output format. See table above.

-  Use of logical input formats

-  Use of regular expressions

SMA-CMS_82.docx

Version: 1.0.23049

Page 171 of 178

SMA-CMS Customizing Suite for SMA

Logical input formats

To simplify the definition of input formats and limit the variety of entries in the repository, the logical input

formats are provided. These input formats are permanently implemented in the client and can directly be

used  in  the  repository.  Input  formats  are  customized  in  the  properties.  But  service  parameters  specify

whether wildcards are allowed. For this reason, the input format actually used can vary depending on the

allocated service.

In order to use logical input formats, define the name of the input format in the affected property in the

repository. The following formats are currently available:

Input format without wildcard
[^\*][LENGTH]
[0-9][LENGTH]
[0-9][LENGTH]\R.?[0-9]{0,1}
[0-9][LENGTH]\R.?[0-9]{0,2}
[0-9][LENGTH]\R.?[0-9]{0,3}
[0-9][LENGTH]\R.?[0-9]{0,6}

Name
CHARACTER
NUMBER_N0
NUMBER_N1
NUMBER_N2
NUMBER_N3
NUMBER_N6
TIMESPAN_SHORT   [0-9][LENGTH]\R:[0-9]{2,2}
TIMESPAN
ORDER

Input format with wildcard
[^|][LENGTH]
[0-9][LENGTH]
[0-9][LENGTH]\R.?[0-9]{0,1}
[0-9][LENGTH]\R.?[0-9]{0,2}
[0-9][LENGTH]\R.?[0-9]{0,3}
[0-9][LENGTH]\R.?[0-9]{0,6}
[0-9][LENGTH]\R:[0-9]{2,2}

[0-9][LENGTH]\R:[0-9]{2,2}\R:[0-9]{2,2}   [0-9][LENGTH]\R:[0-9]{2,2}\R:[0-9]{2,2}
[0-9a-zA-Z.+][LENGTH]

[0-9a-zA-Z.+*][LENGTH]

The placeholder [LENGTH] is replaced with the configured field length at runtime. If the defined length is

'0', an '*' is entered. With the logical format "ORDER", the system automatically changes the [LENGTH]

according to the basic settings when the output format changes.

Input/Output formats including calculation

If you specify the output format mpdv_calc, you can include calculations in the formatting. In the format,

you  can  specify  a  divisor  and  multiplier  and  an  identifier  that  specifies  if  a  reciprocal  is  calculated.  You

can  also  specify  the  number  of  decimal  places.  The  OutputFormat  mpdv_calc  implicitly  defines  the

InputFormat. If an input of values is made, the reciprocal value is calculated.

Example:  "mpdv_calc;MULT=5;DIV=2;INVERSE=false;FORMAT=n3"  (the  value  is  multiplied  by  5,

divided by 2, then the reciprocal is calculated and the result is displayed with 3 decimal places).

The  input/output  format  including  calculation  is  normally  used  for  the  display  of  cycle  times  or

specifications  of  single  pieces.  In  the  database,  these  times  are  always  saved  in  seconds  per  1000

pieces. If an input/output format including calculation is used, you can convert the times to hours per 1000

pieces, minutes per piece or with reciprocal also to piece per hour.

Overview of regular expressions

You  can  find  a  large  amount  of  information  on  regular  expressions  using  the  search  engines  on  the

internet. In the following, the most important aspects are presented.

SMA-CMS_82.docx

Version: 1.0.23049

Page 172 of 178

SMA-CMS Customizing Suite for SMA

Meta characters

Represent a range of characters.

Character   Description
.
Matches any character.
[aeiou]
Matches any single character included in the specified set of characters.
[^aeiou]   Matches any single character, which is not included in the specified set of characters.
[0-9a-fA-
Use of a hyphen (–) allows specification of contiguous character ranges.
F]
\R.

Matches the decimal separator specified by the
System.Globalization.NumberFormatInfo.NumberDecimalSeparator property of the current
culture.
Matches the time separator specified by the DateTimeFormatInfo.TimeSeparator property of
the current culture.

\R:

Quantifier

Repetition, number of characters

Quantifier   Description
*

Specifies zero or more
matches.
Specifies one or more
matches.
Specifies zero or one match.

Specifies exactly n matches.
Specifies at least n matches.
Specifies at least n, but no
more than m, matches.

Samples
The "\w*" mask matches a string consisting of zero or more
letter characters. It’s equivalent to the "\w{0,}" mask.
The "\w+" mask matches a string consisting of one or more
letter characters. It’s equivalent to the "\w{1,}" mask.
The "\w?" mask matches zero or one letter character. It’s
equivalent to the "\w{0,1}" mask.< /description>
The "\d{4}" mask matches exactly four digits.
The "\d{2,}" mask matches two or more digits.
The "\d{1,3}" mask matches either one, or two, or three
digits.

+

?

{n}
{n,}
{n,m}

Special characters

Special characters

Character   Description
|

Alternation symbol. This can be used
to implement a choice between two or
more alternatives.

()

Grouping. You can use parentheses
to create sub-expressions, or to limit
the scope of the alternation.

Samples
The "1|2|3" mask matches either "1" or "2" or "3".
The "abc|123" mask matches either "abc" or "123".
The "\d{2}|\p{L}{2}" mask matches either two digits
or two letters.
The "(an|ba)t" mask matches either "ant" or "bat".
The "(net)+" mask matches "net", "netnet",
"netnetnet", ... strings. Compare with the "net+"
mask which matches the "net", "nett", "nettt", ...
strings.
The "(0|1)+" mask matches a string of
indeterminate length, consisting of "0" and "1".

Examples

SMA-CMS_82.docx

Version: 1.0.23049

Page 173 of 178

SMA-CMS Customizing Suite for SMA

Input 1..9999 => Input format for property : ([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])

Input 0..999 => Input format for property : ([0-9]|[1-9][0-9]|100)

Best practice: input of long string fields

The client identifies the width of an input field using the attribute Length. In case of long string fields with

more than 20 characters, the layout can become confusing because these string fields use the complete

width of the layout and are very long compared to other input fields. Very long string fields are cut off on

the  right-hand  side,  if  the  available  space  is  not  enough.  To  avoid  this  behavior,  you  can  control  the

displayed field width regardless of the number of characters that you can enter.

-  Use the attribute Length to specify the width of the input field.

-  You can use a regular expression in the InputFormat to specify the number of characters that

you can enter.

If you enter strings that are larger than the displayed field, the input field automatically scrolls horizontally.

Examples:

Attribute
article.designation

Length
50

InputFormat  Effect
.{0.250}

The  field  is  displayed  with  a  width  of  50
characters.  You  can  enter  up  to  250
characters.
The  field  is  displayed  with  a  width  of  25
characters.  You  can  enter  up
to  40
characters.

operation.input_component_list  25

.{0.40}

5.7.13  FillChar

Obsolete. This field must be left empty.

5.7.14  Calculation

Obsolete. This field must be left empty.

5.7.15  Further fields see ServiceParameterGui

For a description of the following fields, refer to the data types of the ServiceParameterGui:

ControlType,  ControlTypeMode,  ControlParameter,  ControlDataSource,  ControlDataSourceMode,

ControlDataSourceParameter, ControlDataSourceResult, VisibleCondition and EditableCondition.

SMA-CMS_82.docx

Version: 1.0.23049

Page 174 of 178

SMA-CMS Customizing Suite for SMA

5.8  ControlDataSource

A ControlDataSource defines a data source that you can use to fill selection lists in controls, for example.

These can be data logics (service requests) or reference values (see also ReferenceData).

Reference values are usually required to fill selection lists (and/or RadioGroups) with static contents.

You  use  data  logics  to  request  services  that  identify  selection  lists  (or  RadioGroups)  dynamically.  For

example, these lists can include master data that are configured in the database.

The  settings  made  in  the  columns  Parameter  and  Result  can  be  overwritten  in  a  Property  or

ServiceParameterGui.

5.8.1 Name

Name of the ControlDataSource. The name should be composed of English terms clearly describing the

data source. You usually use the camelCase notation.

5.8.2 Source

If the data source is a web service, this field contains the name of the client's data logic. You derive the

data  logic  from  the  service  name.  To  do  so,  remove  the  dot  between  domain  and  function  and  use  a

capital letter for the first letter of the function:

Service

Data logic

MDUser.list  MDUserList

MDUnits.list  MDUnitsList

In case of reference values, this field includes the Type of a ReferenceData.

5.8.3 Parameter

A list of parameters. The list does not include spaces, use semicolons to separate parameters. This field

is only allowed in combination with web service data sources. A parameter can be allocated dynamically

or permanently.

Permanent parameters appear as <acronym>=<value>, e.g.

"dialogconfiguration.type=AIPDEF;dialogconfiguration.type=AIPTNR".

Dynamic parameters are specified as a pair of <acronym1>=[<acronym2>]. e.g.

“resource.id=[resource.id];pdvprocessparameter.evaluation_ts=[pdvsinglevalue.evaluation_ts]”

The acronym in square brackets is replaced with the acronym values from the ControlPanel.

SMA-CMS_82.docx

Version: 1.0.23049

Page 175 of 178

SMA-CMS Customizing Suite for SMA

5.8.4 Columns

A list of requested columns. The list does not include spaces. To separate columns, semicolons are used.

This is only permissible for web service data sources.

5.8.5 Result

You can enter 1-n acronyms separated by semicolon. The sequence used specifies the importance.

  Position 1 (Value): Name of acronym whose value is entered in the input field.

  Position 2 (ControlValue): Name of acronym whose value is displayed in the selection list. If you

do not specify position 2, the acronym of position will be displayed.

  Position 3 (LabelValue): If you specify position 3, the value of the acronym is entered in the label

field of the input field and also displayed in the selection list.

  Position  4-n:  Use  these  positions  to  define  additional  return  values,  which  are  then  used  to

update "dependent" controls in the client ("lookup").

Only with web service data sources:

Optional return columns of the data source, separated by semicolons. Without spaces. The return

has  the  format  <acronym>=<value>  -  for  acronym  pairs,  the  second  acronym  is  therefore

replaced with the result value (e.g. if you enter "operation.resource.id=resource.id", this results in

"operation.resource.id=4711").

5.9  ReferenceData

Reference values are usually required  to fill selection  lists (and/or RadioGroups) with static contents. In

contrast  to  values  provided  by  web  services,  reference  values  are  fixed  and  do  not  change.  For  this

reason, reference values can be entered once in a list and are delivered in this form.

5.9.1 ref_data_key

The ref_data_key must be unambiguous for each entry. In special cases, this key is used in the source

code (at least in the server).

Usually, the ref_data_key is composed of type + : + db_key; this facilitates its allocation to type and key.

An  exception  occurs  if  the  db_key  includes  a  German  expression.  The  ref_data_key  must  then  be

formed  differently.  For  example,  pwdexclusion:person.firstname  is  a  super  ref_data_key  for  the  type

pwdexclusion.pwd and db_key PNR.PVORNAME.

SMA-CMS_82.docx

Version: 1.0.23049

Page 176 of 178

SMA-CMS Customizing Suite for SMA

5.9.2 Type

Use this field to summarize various ReferenceData entries to a list.

5.9.3 db_key

The  db_key  is  the  actual  value  that  is  selected  in  the  list.  This  key  identifies  an  entry  unambiguously

within a Type. You cannot freely select the key because the key is often transferred to services and can

correspond to the content of a configuration identifier in the database, for example.

5.9.4 is_default

The entry with this key is preallocated as default.

5.9.5 Designation

Text displayed in the selection list. A language key is specified.

5.9.6 sort_key

Specifies the sequence that is used to display the entries in the selection list.

5.10  Authorization

The authorization mechanism

- protects applications and functions against unauthorized use on the client,

- hides fields or field groups on the GUI,

- prevents these fields from being edited.

5.10.1  Authorization type

Controls the type of authorization. Possible values:

  Acronym: enables the authorization of individual fields (properties)

  AcronymGroups: enables the authorization to group fields

  Application: enables the authorization of applications

  Functions: enables the authorization of functions which are e.g. requested from the

application toolbar.

SMA-CMS_82.docx

Version: 1.0.23049

Page 177 of 178

SMA-CMS Customizing Suite for SMA

5.10.2  Authorization Context

Context  where  the  authorization  is  intended.  If  the  field  is  left  empty,  authorization  is  always  granted,

irrespective  of  the  context.  You  normally  use  this  field  to  control  the  authorization  of  acronyms  in  the

context of special services.

5.10.3  Authorization ID

Identifies the object to be authorized, i.e. the name of the acronym or the ID of an application.

5.10.4  Authorization key

The authorization key that is used to protect the object.

5.10.5  Authorization Designation

(Optional) text description of the authorization.

SMA-CMS_82.docx

Version: 1.0.23049

Page 178 of 178


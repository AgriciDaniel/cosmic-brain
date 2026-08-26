Development Suite MES-Cockpit

1  Development Suite MES-Cockpit-Services

MES  Development  Suite  offers  functions  for  customizing  the  MES-Cockpit  3.1  according  to  the

customer's requirements. This document describes the functions provided by the customizing tool MES-

Cockpit (MC-DSCS).

Default *.qvw files and scripts must not be changed. Unless otherwise specified, changes must

always be made in customer-specific files.

All modifications described here can only be made if the user has purchased the customizing tool (MC-

DSCS). It is recommended to complete the relevant customizing training course (CUT-MSC).

1.1  Advanced Analysis Options

Overview of benefits

By  default,  there  are  already  pre-defined  evaluations  for  the  Performance  Analysis  and

Production Monitoring that can be applied by users. These provided options may be customized

and modified.

MES-Cockpit uses QlikView to visualize data in the Performance Analysis and Performance Monitoring.

Requirements

The original QlikView document can be found in the following path on the respective MES-Cockpit server:

Production Monitoring: C:\ProgramData\QlikTech\Documents\MESC_Online.qvw

Performance Analysis: C:\ProgramData\QlikTech\Documents\MESC_Main.qvw

The original document must not be changed. Provided that modifications are required, the file has to be

copied and renamed. Example: MESC_Online_<Customer's ID>.qvw

Only  then  changes  to  this  customer-specific  file  can  be  made.  The  options  provided  in  QlikView  are

described in the document: MESC_DevelopmentSuiteQV.pdf

If a new qvw file is copied or created, it must be accessible for authenticated users. To do so, the created

file  has  to  be  assigned  to  the  user  type  "All  Authenticated  Users"  in  Document  -->  Authorization  in  the

management console of QlikView on the MES-Cockpit server.

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 1 of 20

Development Suite MES-Cockpit

1.2  Modifying Basic KPIs

Overview of benefits

Basic  KPIs  used  for  calculations  and  display  in  MES-Cockpit  can  be  customized,  i.e.  further

information  may  be  added  and/or  they  may  also  be  restricted  according  to  the  customer's

requirements.

Basic KPIs encompass all data exported from connected HYDRA systems and saved as *.xml file on the

MES-Cockpit server for the calculation of KPIs. Customizing provides the following options:

  Additional data of already integrated Web Services for existing objects



Integration of customer-specific basic KPIs for existing data types

By default, the following fields are exported:

Object "workplace":

MasterConfiguration:

Object

Data

Web service

Fields

type

Workplace

Master

BOResourceList

data

resource.id
resource.designation
resource.short_name
resource.company

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 2 of 20

Online

BOResourceList

data

Key

Workplacebooking.list

figure

Development Suite MES-Cockpit

resource.group
resource.costcenter
resource.blocked
"resource.id",
"resource.short_name",
"resource.group",
"resource.costcenter",
"resource.act.status.text",
"resource.act.status",
"resource.act.status.color",
"resource.act.start_of_status",
"resource.act.shift.total_time",
"resource.cycle.target",
"resource.cycle.actual",
"resource.act.shift.yield.primary",
"resource.act.shift.scrap.primary",
"resource.act.shift.rpa1",
"resource.act.shift.rpa2",
"resource.act.shift.rpa3",
"resource.act.shift.rpa4",
"resource.act.shift.rpa5",
"resource.act.shift.rpa6",
"resource.act.shift.rpa7",
"resource.act.shift.rpa8",
"resource.act.shift.rpa9",
"resource.act.shift.rpa10",
"resource.act.shift.rpa11",
"resource.act.shift.rpa12",
"resource.act.strokes.total",
"resource.act.strokes.yield"
"resource.id",
"workplacebooking.shift.date",
"workplacebooking.shift.number",
"workplacebooking.rpa.number",
"workplacebooking.yield.base",
"workplacebooking.yield.primary",
"workplacebooking.yield.secondary",
"workplacebooking.yield.tertiary",
"workplacebooking.scrap.base",
"workplacebooking.scrap.primary",
"workplacebooking.scrap.secondary",
"workplacebooking.scrap.tertiary",
"workplacebooking.rework.base",
"workplacebooking.rework.primary",
"workplacebooking.rework.secondary",
"workplacebooking.rework.tertiary",
"workplacebooking.problem.base",
"workplacebooking.problem.primary",
"workplacebooking.problem.secondary",
"workplacebooking.problem.tertiary",
"workplacebooking.strokes.total",
"workplacebooking.status",
"workplacebooking.status_duration",
"workplacebooking.cycle.target",
"workplacebooking.partitioning",
"resource.pulse_factor.target"

Calculated fields from MDC:
w.status.class

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 3 of 20

Operation

Master

BOOperation.list

data

Online

BOOperationListCurrentlyLoggedOn

data

Development Suite MES-Cockpit

these

during

collected

evaluations,

Total  duration  accrued  for  a  status  of
the relevant status class
w.oeee_arith
Performance  is  calculated  on  the  MDE
log  record  level.  In  this  regard,  all  data
records
the
"production"  status  (RPA11)  are  used.
Performance  is  calculated  for  each  log
record.  For  a  compressed  presentation
in
individual
performance  values  are  weighted.
Weighting  is  based  on  production  time
(RPA11).  The  value  exported  for  each
workplace and shift represents the sum
of weighted performance values.
"order.id",
"operation.id",
"operation.costcenter",
"operation.article",
"operation.customerdesignation",
"operation.articledesignation",
"operation.ordertype",
"operation.plan.yield.base",
"operation.plan.yield.primary",
"operation.plan.yield.secondary",
"operation.plan.yield.tertiary",
"operation.act.yield.base",
"operation.act.yield.primary",
"operation.act.yield.secondary",
"operation.act.yield.tertiary",
"operation.act.scrap.base",
"operation.act.scrap.primary",
"operation.act.scrap.secondary",
"operation.act.scrap.tertiary",
"operation.act.rework.base",
"operation.act.rework.primary",
"operation.act.rework.secondary",
"operation.act.rework.tertiary",
"operation.act.problem.base",
"operation.act.problem.primary",
"operation.act.problem.secondary",
"operation.act.problem.tertiary",
"operation.processing_time"
"operation.id",
"operation.article",
"operation.articledesignation",
"order.id",
"bookingrelation.logon_ts",
"operation.designation",
"operation.plan.yield.primary",
"operation.act.yield.primary",
"operation.act.scrap.primary",
"bookingrelation.workplace",
"bookingrelation.rpa1",
"bookingrelation.rpa2",
"bookingrelation.rpa3",
"bookingrelation.rpa4",
"bookingrelation.rpa5",
"bookingrelation.rpa6",

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 4 of 20

Development Suite MES-Cockpit

"bookingrelation.rpa7",
"bookingrelation.rpa8",
"bookingrelation.rpa9",
"bookingrelation.rpa10",
"bookingrelation.rpa11",
"bookingrelation.rpa12",
"operation.act.first_logon_ts",
"operation.act.last_logoff_ts",
"operation.act.last_interruption_ts",
"operation.act.status",
"operation.act.status.textnumber",
"operation.plan.start_ts",
"operation.plan.end_ts",
"operation.earliest_start_ts",
"operation.latest_end_ts",
"operation.scheduled_start_ts",
"operation.scheduled_end_ts",
"operation.setup_time",
"operation.processing_time"
"operation.id",
"orderbooking.shift.start_ts",
"orderbooking.shift.number",
"orderbooking.rpa1",
"orderbooking.rpa2",
"orderbooking.rpa3",
"orderbooking.rpa4",
"orderbooking.rpa5",
"orderbooking.rpa6",
"orderbooking.rpa7",
"orderbooking.rpa8",
"orderbooking.rpa9",
"orderbooking.rpa10",
"orderbooking.rpa11",
"orderbooking.rpa12",
"orderbooking.yield.base",
"orderbooking.yield.primary",
"orderbooking.yield.secondary",
"orderbooking.yield.tertiary",
"orderbooking.scrap.base",
"orderbooking.scrap.primary",
"orderbooking.scrap.secondary",
"orderbooking.scrap.tertiary",
"orderbooking.rework.base",
"orderbooking.rework.primary",
"orderbooking.rework.secondary",
"orderbooking.rework.tertiary",
"orderbooking.problem.base",
"orderbooking.problem.primary",
"orderbooking.problem.secondary",
"orderbooking.problem.tertiary",
"orderbooking.labor_utilization"
"order.id",
"order.costobject",
"order.article",
"order.projectnumber",
"order.customerdesignation",
"order.salesorder",
"order.articledesignation",
"order.type",

Key

DCAdeLogRecord.list

figure

Order

Master

BOOrderOverview

data

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 5 of 20

Development Suite MES-Cockpit

"order.act.status.text",
"order.act.status.color",
"order.last_op_logoff_ts_calc",
"order.no_recordable_op",
"order.no_finished_op",
"order.act.rpa1",
"order.act.rpa2",
"order.act.rpa3",
"order.act.rpa4",
"order.act.rpa5",
"order.act.rpa6",
"order.act.rpa7",
"order.act.rpa8",
"order.act.rpa9",
"order.act.rpa10",
"order.act.rpa11",
"order.act.rpa12",
"order.act.yield.base",
"order.act.yield.primary",
"order.act.yield.secondary",
"order.act.yield.tertiary",
"order.act.scrap.base",
"order.act.scrap.primary",
"order.act.scrap.secondary",
"order.act.scrap.tertiary",
"order.act.rework.base",
"order.act.rework.primary",
"order.act.rework.secondary",
"order.act.rework.tertiary",
"order.act.problem.base",
"order.act.problem.primary",
"order.act.problem.secondary",
"order.act.problem.tertiary",
"order.plan.yield.base",
"order.plan.yield.primary",
order.plan.yield.secondary",
"order.plan.yield.tertiary",
"order.plan.lead_time",
"order.plan.total_setup_time",
"order.plan.processing_time",
"order.plan.execution_time",
"order.act.retention_period",
"order.act.lead_time",
"order.act.labor_utilization",
"order.act.processing_time",
"order.act.occupancy_time",
"order.act.standstill_period",
"order.act.setup_time",
"order.act.wait_time",
"order.first_op_logon_ts",
"order.last_op_logoff_ts",
"order.scheduled_start_ts",
"order.scheduled_end_ts",
"order.plan.labor_utilization",
"order.ordertype"
"order.id",
"order.article",
"order.articledesignation",
"order.salesorder",

Online

BOOrderOverview

data

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 6 of 20

Development Suite MES-Cockpit

"order.act.status.led",
"order.act.status.text",
"order.act.status.color",
"order.act.last_posting_ts",
"order.earliest_start_ts",
"order.scheduled_end_ts",
"order.latest_end_ts",
"order.scheduled_start_ts",
"order.plan.yield.base",
"order.act.yield.base",
“order.act.scrap.base",
"order.plan.lead_time",
"order.plan.total_setup_time",
"order.plan.processing_time",
"order.plan.labor_utilization",
"order.plan.execution_time",
"order.act.retention_period",
"order.act.lead_time",
"order.act.setup_time",
"order.act.processing_time",
"order.act.standstill_period",
"order.act.occupancy_time",
"order.act.labor_utilization"
Scrap
scrap
per
(orderbooking.scrap.reason)

reason

Operation_scrap  Key

DCAdeLogRecord.list

figure

1.2.1 Additional data of already integrated Web Services for

existing objects

The following definition can be used to export further data for existing objects, such as for the "workplace"

object:

By default, the single DataGetter functions define which data is exported via WebServices. This definition

may be overwritten by customer-specific definitions in the config.xml file of MDC.

A  template  that  may  be  changed  is  included  in  the  MDC  templates.  MDC  templates  can  be

found here: c:\ProgramData\mpdv\mdc\templates\

The  MDC  templates  include  DataGetter  functions  for  individual  objects.  Subject  to  the  area  from  which

data is to be taken, definitions have to be  made in the xml file  which also results in the data to be filed

accordingly.

The following definitions can be made for existing objects:

Object

DataGetter

Data type

Web service

Config.xml

Workplace

WorkplaceDataGe Master data

BOResourceList

MasterResultParameter

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 7 of 20

Development Suite MES-Cockpit

tter

Online data

BOResourceList

OnlineDataResultParamete

r

Key figure

Workplacebooking.list

KeyFigureResultParameter

Operation

OperationDataGet

Master data

BOOperation.list

MasterResultParameter

ter

Online data

BOOperationListCurre

OnlineDataResultParamete

ntlyLoggedOn

r

Key figure

DCAdeLogRecord.list

KeyFigureResultParameter

Operation_scr

OperationDataGet

Key figure

mescarchiveloadopera

KeyFigureResultParameter

ap

ter

tionscrap

Order

OrderDataGetter  Master data

BOOrderOverview

MasterResultParameter

All data from the "Keyfigure" area are exported as a total for each shift.

Customizations

have

to

be

inserted

in

the

following  MDC

configuration

file:

C:\ProgramData\mpdv\mdc\config.xml

Example:

<ComponentConfiguration Name="WorkplaceDataGetter">

<Parameter Name="MasterResultParameter"

Value="resource.userfield02,resource.id,resource.designation,resource.sh

ort_name,

resource.company,resource.group,resource.costcenter,resource.blocked"/>

<Parameter Name="KeyFigureResultParameter" Value="<New field>,<List of

key figures>"/>

<Parameter Name="OnlineDataResultParameter" Value="<New field>,<List of

online data>"/>

</ComponentConfiguration>

Please note: If a DataGetter function is integrated, only the  fields listed in "Value" are requested by the

WebService. This means: if a field is to be added all fields that should be exported for this object should

be listed. In addition, every time data  has been changed, the MDC service has to be restarted in MES-

Cockpit server services.

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 8 of 20

Development Suite MES-Cockpit

1.2.3 Integration of customer-specific basic KPIs for existing data

types

The

defined  XML

file

interface

described

in

the

customizing

document

entitled

MESC_DevelopmentSuiteInterface.pdf can be used to integrate customer-specific basic KPIs.1

The requirements for using the XML file interface are:

  The structure described in the relevant document has been adhered to

  Data is transferred for existing data types

  Meta data/master data of objects are included

  Data to be transferred has to be filed in a new directory on the MES-Cockpit server. The directory

name starts with the object name and an underscore character "_", e.g. Workplace_

The  defined  storage  locations  can  be  found  in  the  configuration  file  MESC_DataLocations.txt

(c:\ProgramData\QlikTech\Documents\conf\)

1.3  Modifications to the Home Screen

Overview of benefits

The buttons displayed in the home screen of MES-Cockpit can be customized and/or additional

buttons/icons may be added.

1.3.1 Customizing the first page of MES-Cockpit

The  file  C:\inetpub\wwwroot\SMAMESC\Areas\Mesc\menu.xml  includes  the  buttons/icons  displayed  in

the home screen.

1 Only customer-specific basic KPIs relating to HYDRA MES data may be integrated.

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 9 of 20

By default, the following buttons are shown in MES-Cockpit:

Development Suite MES-Cockpit

  Performance Analysis

  Production Monitoring

  Workplaces/ machines

  KPI monitor

  Contacts

  Messages listing

The following TAGs have to be defined in the menu.xml for each button:

TAG

Description

Label

LanguageKey displayed as caption in the button

Description

LanguageKey of the brief description that is to be displayed in the button

Icon

Path  leading  to  the  displayed  icon  of  the  button.  The  file  has  to  be  stored  here:

C:\inetpub\wwwroot\SMAMESC\Content\img

Action

Function call to be started via the button.

Default sample configuration:

<?xml version="1.0"?>

<ArrayOfButtonView xmlns:xsd="http://www.w3.org/2001/XMLSchema"

xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 10 of 20

Development Suite MES-Cockpit

<ButtonView>

<Label>lkMescPerformanceAnalysis</Label>

<Description>lkMescPerformanceAnalysisDescription</Description>

<Icon>/Content/img/Stats.png</Icon>

<Action> <Target>location='../mesc/qvcontainer?qvItem=MESC_Main'</Target>

</Action>

<DoNotDissMissModal>false</DoNotDissMissModal>

</ButtonView>

<ButtonView>

<Label>lkMescOnlineMonitor</Label>

<Description>lkMescOnlineMonitorDescription</Description>

<Icon>/Content/img/WebSystem.png</Icon>

<Action> <Target>location='../mesc/qvcontainer?qvItem=MESC_Online'</Target>

</Action> <DoNotDissMissModal>false</DoNotDissMissModal>

</ButtonView>

<ButtonView>

<Label>lkWorkplaceOverview</Label>

<Description>lkWorkplaceOverviewSmaDescription</Description>

<Icon>/Content/img/Generators.png</Icon>

<Action> <Target>location='../resource/resource'</Target> </Action>

<DoNotDissMissModal>false</DoNotDissMissModal>

</ButtonView>

<ButtonView>

<Label>lkKeyMonitor</Label>

<Description>lkKeyMonitorSmaDescription</Description>

<Icon>/Content/img/ReportsPieChart.png</Icon>

<Action> <Target>location='../oee/kzm'</Target> </Action>

<DoNotDissMissModal>false</DoNotDissMissModal>

</ButtonView>

<ButtonView> <Label>lkContactPersons</Label>

<Description>lkContactPersonsDescription</Description>

<Icon>/Content/img/BusinessPartnersBlueMaleRedFemale.png</Icon> -<Action>

<Target>location='../ContactPersons/ContactPersons'</Target> </Action>

<DoNotDissMissModal>false</DoNotDissMissModal>

</ButtonView>

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 11 of 20

Development Suite MES-Cockpit

<ButtonView> <Label>lkMessageList</Label>

<Description>lkMessageListSmaDescription</Description>

<Icon>/Content/img/Generators.png</Icon> -<Action>

<Target>location='../MaintenanceManagement/MessageList'</Target> </Action>

<DoNotDissMissModal>false</DoNotDissMissModal>

</ButtonView>

</ArrayOfButtonView>

In

addition

to

the

configuration

in

the  menu.xml

file,

the

sub-folder

"profiles"

(C:\inetpub\wwwroot\SMAMESC\Areas\Mesc\Profiles)  includes  a  configuration  file  for  each  integrated

qvw file. This file includes the qvw file to be called up for the entry in the home screen according to the

following pattern:

Example for MESC_Main.qvw:

<QvAppConfig xmlns:xsd="http://www.w3.org/2001/XMLSchema"

xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

<Server>http://swe-cbu-01</Server>

<Document>MESC_Main.qvw</Document>

<ApplicationName>lkMescPerformanceAnalysis</ApplicationName>

<ApplicationId>PerformanceAnalysis</ApplicationId>

</QvAppConfig>

1.3.2 Changes to existing buttons

If changes are required, they have to be made in a customer-specific menu_LOCAL.xml file. The entries

from the original menu.xml file can be used as template. The file can be found here:

C:\inetpub\wwwroot\SMAMESC\Areas\Mesc\menu.xml

Available parameters and modification options are described in section 1.3.1.

1.3.3 Calling up a new evaluation/report with an existing button

If  one  of  the  existing  QlikView  files  is  to  be  changed,  it  has  to  be  copied  and  renamed  at  first  (e.g.

MESC_Main_xxx.qvw).  Then  all  changes/modifications  can  be  carried  out  within  the  range  of  options

provided by QlikView. The following measures have to be taken making sure that the new (changed) file

is started and updated cyclically via the home screen instead of the previous QlikView file:

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 12 of 20

Development Suite MES-Cockpit

  Adjusting  the  relevant  profiles  file  (C:\inetpub\wwwroot\SMAMESC\Areas\Mesc\Profiles)  by

defining

the

new

document

name,

e.g.

MESC_Main_xxx.qvw

Example:

<QvAppConfig xmlns:xsd="http://www.w3.org/2001/XMLSchema"

xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

<Server>http://swe-cbu-01</Server>

<Document> MESC_Main_xxx.qvw </Document>

<ApplicationName>lkMescPerformanceAnalysis</ApplicationName>

<ApplicationId>PerformanceAnalysis</ApplicationId>

</QvAppConfig>

  Changing  the  MDC  and  transferring  the  reload  section  to  the  config.xml  file  of  MDC:

1.3.4 Integration and starting of a new, additional

evaluation/report

When integrating a new qvw file, it can be created based on the existing application. Please proceed as

follows:

By copying an existing QlikView file, a new one will be created, e.g. MESC_Main.qvw. Proceed as follows

making sure this one will be displayed, called up and updated as an independent button/icon in the home

screen in addition to the existing ones:

1.  The

new

entry

has

to

be

added

to

the

file  menu_LOCAL.xml

(C:\inetpub\wwwroot\SMAMESC\Areas\Mesc) displaying the buttons/icons. To do so, an already

existing configuration for e.g. MESC_Main can be copied and adjusted accordingly.

o  <ButtonView>

<Label>lkxxx</Label>

<Description>lkxxxDescription</Description>

<Icon>/Content/img/xx.png</Icon>

<Action> <Target>location='../mesc/qvcontainer?qvItem=<Name of

the qvw-Datei withour Extension>'</Target> </Action>

<DoNotDissMissModal>false</DoNotDissMissModal>

</ButtonView>

Please  note:  The  entered  language  key  must  be  maintained  in  the  relevant  translation  file  and  the

defined

icon

must

be

created

in

the

relevant

path.

The name of the icon has to start with u_.

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 13 of 20

Development Suite MES-Cockpit

2.  A  new  profile  configuration  file  (C:\inetpub\wwwroot\SMAMESC\Areas\Mesc\Profiles)  must  also

be created for the new qvw file. To do so, an existing configuration file can be copied, renamed

and modified accordingly. Example:

<?xml version="1.0"?>

<QvAppConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-

instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">

<Server>http://swe-cbu-01</Server>

<Document>MESC_Main_xxx.qvw</Document>

<ApplicationName>lkxxx</ApplicationName>

<ApplicationId>xxx</ApplicationId>

</QvAppConfig>

A new "ApplicationID" must be assigned.

3.  Organize reload

The following alternatives can be configured in order to reload data and/or the qvw file including

the data in cyclic intervals:

o  Definitions via the QlikView Management console

A reload may be defined for a stored document.

Either for a cyclic event, e.g. once a day at 7.00 a.m. or it is also possible to attach the

reload  to  an  "external  event".  In  this  case  the  user's  password  must  be  entered  and

reloading  is triggered  by  the MDC. In this case, the following step must also be carried

out:

o

Integrating the reload into the MDC

Proceed as follows to trigger the reload process by MDC:

  The following paragraph has to be entered in the config.xml file of MDC:

  Please note:

  A new name must be entered

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 14 of 20

Development Suite MES-Cockpit

  The  name  of  the  new  qvw  file  has  to  be  entered  in  "Value"  of  the

parameter "task name"

  The  event  filter  has  to  be  set  accordingly:  "online"  for  online  data  or

"masterdata,keyfiguredata" for master data and key figure data

Error!

Reference

source

not

found.

1.4  Further customizing options

1.4.1 Customer-specific translations

Overview of benefits

The displayed texts can be customized for the single areas.

1.4.1.1

Translations in Performance Analysis and Production

Monitoring

All texts displayed in the applications can be renamed according to the customer's requirements by using

a customized resource file.

To  do  so,  the  language  keys  (lk...)  and  relevant  translations  have  to  be  entered  in  the  Excel  file

MescDictionary.xlsm  (.\conf\translation\MescDictionary.xlsm)  and  then  the  resource  file  has  to  be

generated by clicking the "Export" button and filed here:

Default path:

C:\ProgramData\QlikTech\Documents\conf\translation

Customized path:

C:\ProgramData\QlikTech\Documents\custom\translation

Once  the  customer-specific  resource  file  has  been  exported,  the  file  .\custom\translation\translation.qvd

has to be deleted.

The  variable  LOCALIZE  can  be  used  to  access  translations  included  in  QV  applications  (example:

$(LOCALIZE('lkYield'))). It replaces a LanguageKey by the translation defined in the user's language.

1.4.1.2

Translations in the First Page of MES-Cockpit

All  texts  of  the  start  page  have  to  be  maintained  in  the  "SMA"  area  and/or  they  may  be  renamed

according to the customer's requirements in a customer-specific resource file.

To  do  so,  the  language  keys  (lk...)  and  relevant  translations  have  to  be  entered  in  the  Excel  file

mpdvDictionaryCustomer.xltm  and  then  the  resource  file  has  to  be  generated  by  clicking  the  "Export"

button and filed here:

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 15 of 20

Development Suite MES-Cockpit

C:\inetpub\wwwroot\SMAMESC\Runtime\resources\standard\languages

1.4.2 Definition of refresh rates

Data exports from connected HYDRA systems are triggered in cyclic intervals. Different triggers are used

depending  on  whether  online  data  or  basic  KPIs  are  exported.  The  following  cycles  are  defined  by

default:

  Exporting status information: every 1.5 minutes (90 seconds)

  Exporting basic KPIs: every 30 minutes (1800 seconds)

The MDC attempts to trigger the export based  on the above-mentioned cycles.  Reasons  why triggering

fails and no data is exported:



If data is currently being exported (long export times), the new export process will not be started

  A  new  export  process  can  only  be  initiated,  once  reloading  of  data  to  the  qvw  file  has  been

finished

  Reloading of all qvw files must be completed before starting a new reload process, i.e. by default

the files MESC_Main and MESC_Online - there are dependencies between both qvw files.

If

the

cycle

is

to

be

changed,

the

relevant

part

from

the

template

file

(C:\ProgramData\mpdv\mdc\templates\config_Mesc.xml) including the modified value must be copied into

the config.xml file of MDC. Example:

Basic KPIs "order"

    <Parameter Name="[GetMasterDataOrder]" Value="1800" />

Target values

    <Parameter Name="[GetMasterDataTargetValue]" Value="1800" />

Responsibility areas

    <Parameter Name="[GetMasterDataResponsibility]" Value="1800" />

Formulas

    <Parameter Name="[GetMasterDataFormula]" Value="1800" />

Master data "operation"

    <Parameter Name="[GetMasterDataOperation]" Value="1800" />

Master data "workplace"

    <Parameter Name="[GetMasterDataWorkplace]" Value="1800" />

Basic KPIs "operation"

    <Parameter Name="[GetKeyFigureDataOperation]" Value="1800" />

Basic  KPIs  "OP  scrap

    <Parameter  Name="[GetKeyFigureDataOperation_Scrap]"  Value="1800"

evaluation"

/>

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 16 of 20

Development Suite MES-Cockpit

Basic KPIs "workplace"

    <Parameter Name="[GetKeyFigureDataWorkplace]" Value="1800" />

Online data "workplace"

    <Parameter Name="[GetOnlineDataWorkplace]" Value="90" />

Online data "operation"

    <Parameter Name="[GetOnlineDataOperation]" Value="90" />

Online data "order"

    <Parameter Name="[GetOnlineDataOrder]" Value="90" />

Online  data  "downtime  hit

    <Parameter Name="[GetOnlineDataStandstill]" Value="90" />

list"

If the section "TimedTrigger" is not included in the config.xml file, it has to be added. Please note in this

context that the parameter "class" has to be removed.

1.4.3 Integration of new HYDRA systems

1.4.3.1

Integration of New HYDRA Systems into Performance

Analysis and Production Monitoring

Connected systems from which data is exported can be found here:

c:\ProgrammData\mpdv\mdc\config.xml

For  each  connected  HYDRA  system  there  is  an  entry  that  is  distinctly  specified  by  the  attribute

"NumberOfLines" .

Each HYDRA system to be connected to MES-Cockpit must be entered in the configuration of MDC. The

attribute "NumberOfLines" is to be set to the number of configured systems.

<ComponentConfiguration Name="WebServiceConnectorX">

    <Parameter Name="SystemName" Value="<Name>" />

    <Parameter Name="Host" Value="<Host>" />

    <Parameter Name="Port" Value="<Port>" />

    <Parameter Name="User" Value="<User>" />

    <Parameter Name="Pwd" Value="<Pwd>" />

</ComponentConfiguration>

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 17 of 20

Development Suite MES-Cockpit

A customer-specific identifier should be entered as the SystemName (maximum length 15 characters; [0-

9a-zA-Z]). As an alternative, the host name can be entered.

Please  note:

If

the  configuration

is  changed  and

to  enable

these  changes

the  MPDV

MachineDataCollector  service  has  to  be  restarted.  Please  also  take  into  account  that  already  exported

data have actually been exported for the previously defined system. (Exported data include the name of

the system they refer to. If this name is changed, please note that  "old" data still include the "previous"

name).

1.4.3.2

Integration of New HYDRA Systems in Production

Information

All  HYDRA  systems  to  be  evaluated  in  the  Production  Information  area  have  to  be  entered  in  the

following file:

…\SystemX\HyInstMgrDir\Instancerepo.properties

Example:

Configuration  for  the  Hydra8  administration  system  "mesc-server:8080“  and  the  systems  "hydra-

server1:8080“, "hydra-server2:8082“:

======================================

instance.name.1=MESC-ADMIN-SERVER

instance.name.2=HYDRA-SERVER
instance.name.3=HYDRA-SERVER2

MESC-ADMIN-SERVER.host.1=mesc-server
MESC-ADMIN-SERVER.port.1=8080
MESC-ADMIN-SERVER.id.1=1
MESC-ADMIN-SERVER.regserver.host.1=mesc-server
MESC-ADMIN-SERVER.regserver.port.1=6000
MESC-ADMIN-SERVER.description.1=MESC Admin

HYDRA-SERVER.port.1=8080
HYDRA-SERVER.host.1=hydra-server1
HYDRA-SERVER.id.1=1
HYDRA-SERVER.regserver.host.1=hydra-server1
HYDRA-SERVER.regserver.port.1=6000
HYDRA-SERVER.description.1=Hydra Germany

HYDRA-SERVER2.port.1=8081
HYDRA-SERVER2.host.1=hydra-server2
HYDRA-SERVER2.id.1=1
HYDRA-SERVER2.regserver.host.1=hydra-server2
HYDRA-SERVER2.regserver.port.1=6000
HYDRA-SERVER2.description.1=Hydra France
======================================

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 18 of 20

Development Suite MES-Cockpit

1.5  Tips and tricks

1.5.1 Renaming of exported sites

When implementing and/or connecting HYDRA systems, a name is defined that will be used as site ID for

exported  data  as  of  the  first  export.  If  another  name  should  be  displayed  in  MES-Cockpit  this  can  be

changed via the configuration file MESC_PlantMapping.txt.

This file can be found here:

 C:\ProgramData\QlikTech\Documents\conf\MESC_PlantMapping.txt

This file maps the plant/site ID, i.e. the system name that is also exported and the newly defined name.

Example:

PlantId;PlantName

Plant1;Germany

Plant2;France

Plant3;China

1.5.2 Storage locations of values

Storage locations are configured in the following file in order for QlikView to "find" the exported data:

C:\ProgramData\QlikTech\Documents\conf\MESC_DataLocations.txt

Examples from the default file:

Operation;Master;$(vMasterDataPath)\operation

Operation;Online;$(vOnlineDataPath)\operation

Operation;KeyFigure;$(vKeyDataPath)\operation\

1.5.3 Defined variables used in QlikView

The following file includes the variables that can be used in and by QlikView:

C:\ProgramData\QlikTech\Documents\conf\MESC_Variables.txt

1.5.4 Last reload

The time stamp of the relevant QlikView file in the management console of QlikView shows the  date and

time the QlikView file was reloaded at last.

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 19 of 20

Development Suite MES-Cockpit

MESC_DevelopmentSuite.docx

Version: 1.4.20768

Page 20 of 20


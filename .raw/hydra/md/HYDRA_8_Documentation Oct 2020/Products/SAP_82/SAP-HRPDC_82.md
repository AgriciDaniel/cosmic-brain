Manual

HYDRA Interfacing Module to
SAP HR via HR-PDC
SAP-HRPDC 8.2

Version 1.0.23049

Last changed on: 02.09.2020

  HYDRA Interfacing Module to SAP HR via HR-PDC

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 2 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Contents

1  HYDRA Interfacing Module to SAP HR Using HR-PDC - Overview ............ 5

2  Connection of the HYDRA Time and Attendance to SAP R/3 HR ............... 6

2.1

Interface technology ............................................................................................ 6

2.1.1  Types of data provision ........................................................................... 6

2.2  Processing of information fields ........................................................................... 6

2.2.1

Interpretation as account balances .......................................................... 6

2.2.2  Simple transfer to the terminal ................................................................. 8

2.3  Mail IDs IMAIL and ZMAIL ................................................................................... 8

2.4  Configurations in HYDRA .................................................................................... 8

2.4.1  Terminal configuration ............................................................................. 8

2.4.2  Terminal groups ...................................................................................... 9

2.4.3  Authorization for responsibility areas ....................................................... 9

2.4.4  Message configuration for IMAIL and ZMAIL ........................................... 9

2.4.5  Function authorizations ......................................................................... 12

2.4.6  Basic settings ........................................................................................ 12

2.4.7  Absence reason "business trip" ............................................................. 12

2.5  Useful functions of HYDRA  Time & Attendance ............................................... 13

2.6  Overview of the HR-PDC interfaces .................................................................. 14

2.6.1  Download HR master ............................................................................ 14

2.6.2  Download of time balances .................................................................... 22

2.6.3  Download of time event groups ............................................................. 23

2.6.4  Download of absence reasons .............................................................. 24

2.6.5  Download of objects .............................................................................. 25

2.6.6  Download of cost centers ...................................................................... 25

2.6.7  Download of internal orders ................................................................... 26

2.6.8  Download of projects ............................................................................. 26

2.6.9  Download of external wage types .......................................................... 27

2.6.10  Upload of time events ............................................................................ 28

2.6.11  Logs and Security Mechanisms ............................................................. 31

2.7  Connection of Several SAP Systems to HYDRA ............................................... 32

3  Application-Relevant Settings in SAP ........................................................ 33

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 3 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

4  Application-Relevant Settings in HYDRA ................................................... 37

5  Configuration when using SAP PI / SAP PO ............................................. 42

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 4 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

1  HYDRA Interfacing Module to SAP HR Using HR-PDC -

Overview

Possible fields of application

This  function  package  includes  functions  for  interfacing  the  HYDRA  Time  &  Attendance  module  (PZE)

with SAP R/3 HR using the HR-PDC interface of SAP.

Implementation notes

The function package is used if you:

  would like to use HYDRA for Time & Attendance and SAP for Personnel Time Management.

  would like to transfer the clocking records collected in HYDRA to SAP and take over the persons

and their account balances from SAP.

Integration

This function package can only be used if Time & Attendance is performed in HYDRA (function package

PZE-EPP "entry and maintenance of labor times").

Customizing is required in HYDRA and SAP to enable interfacing.

Functions

  Connection to SAP R/3 (as of rel. 4.5) or ECC

o  HYDRA interfacing module for the automatic data exchange using the HR-PDC interface

to SAP R/3 HR (as of release version 4.5)

  Master data transfer

o  Takeover of HR master data (SAP mini HR master) from SAP  R/3  HR (initial download

and deletion functions)

  Entry of time events

o  Entry of types of time events (clock-in, start/end of break, clock-out, start/end of business

trip) and validity checks

  Upload of time events

o  Upload of time postings to SAP R/3

  Terminal visualization

o  Presentation of time accounts from R/3 HR on the PZE terminal

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 5 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

2  Connection of the HYDRA Time and Attendance to SAP R/3

HR

2.1

Interface technology

HYDRA directly communicates with the SAP system using the "RFC technology" and ensures the correct

exchange of IDocs.

The document "MYSAP communication configuration" describes how to set up the RFC connection to the

SAP server. The document describes the interfaces relevant to HR-PDC in section “Configuration of the

distribution model”.

2.1.1

Types of data provision

In  HR-PDC,  SAP  always  provides  basic  data  to  the  subsystems.  Delta  data  and  deleted  data  are  not

provided.

When the basic data is provided, the old data is retained and internally marked as “old”. Then the different

data  records  are  read  and  each  marked  as  “current”.  To  complete  the  provision  of  basic  data,  the

remaining  “old”  data  records  are  definitively  locked  or  deleted.  This  ensures  that  with  each  provision  of

basic data, a valid data set is available in the HYDRA system at any time.

2.2  Processing of information fields

The  interface  for  time  balances  (HR-PDC  from  SAP  R/3  Release  4.5A)  includes  variable  information

fields. There are two ways to process the info fields: “Interpretation as account balances” (flextime, leave

and other balances) and “Simple transfer of the field values” for display on the terminal.

MPDV can use an environment variable to control which of the options is activated. When the system is

implemented,  the  more  comprehensible  of  the  two  options,  “Interpretation  as  account  balances,”  is

activated.  With  this  option,  a  maximum  of  8  out  of  10  information  fields  passed  can  be  displayed.  The

names  of  the  information  fields  can  be  set  in  the  Configuration  of  Accounts.  If  you  require  the  second

option,  because  data  that  cannot  be  interpreted  as  account  balances  must  be  displayed,  then  please

contact our hotline.

2.2.1

Interpretation as account balances

HYDRA  interprets the  data entered in the  info fields  as account balances and  transfers this data to the

current HYDRA accounts. These can then be displayed on the PZE terminal using the INFO function.

Assignment (the standard designations of the HYDRA time accounts are given in brackets):

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 6 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

INFO1
INFO2
INFO3
INFO4
INFO5
INFO6
INFO7
INFO8
INFO9
INFOA

Account 1 (flextime)
Account 2 (overtime)
Account 3 (flextime)
Account 4 (leave)
Account 5
Account 6
Account 7
Account 8
Not processed.
Not processed.

You can configure the layout of the information displayed on the terminal on the MOC in the Configuration

of Accounts:

-  You can configure any account designation.

-  You can change the sorting of the accounts.

-  You can control the accounts that are displayed on the terminal.

-  Formatting can be done in hours or days.

If the configuration of the accounts has been changed, it can happen that the previous account

contents are incorrectly interpreted and displayed. The display will be corrected, once the time

balances have been downloaded again from SAP.

On the terminal, the designation is displayed in front of the account value, which is helpful for the terminal

users.  This  clear  display  also  promotes  acceptance  of  the  time  and  attendance  system.  The  account

values are also available in the application Current account balances and can be displayed there.

Valid number formats in the interface file

Format

XXX:XX

Separator: colon

For time accounts

For day accounts

Time

in

standard

-

minutes (divided by 60)

XXX.XX separator: point

or

Time

in

industrial

minutes

(divided  by

XXX,XX separator: comma

In both formats, the number of

100)

decimal places is unlimited. One or

two decimal places are useful.

Days. The number of decimal places

saved in HYDRA depends on the

factor selected in the configuration

of the HYDRA accounts.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 7 of 43

If a minus sign (“-”) appears in the info field, the  value is  interpreted as  negative. It does not matter on

  HYDRA Interfacing Module to SAP HR via HR-PDC

what side the minus sign stands.

Examples of valid formats

" 123.12-"

"- 123.12"

" -123.12"

"123.12 -"

" 123:12-"

"  123.12"

"   123.1"

"123.1   "

The  evaluation  status  can  be  entered  as  date  in  one  of  the  information  fields  (also  INFO9  or  INFOA).

HYDRA  automatically  identifies  this  status.  The  status  is  displayed  in  the  HR  master  data.  Activate  the

display of the evaluation status on the PZE terminal in the Terminal configuration.

Valid formats for the evaluation status in an information field are:

- DD.MM.YY

- DD.MM.YYYY

2.2.2  Simple transfer to the terminal

When  transferred,  the  contents  of  the  10  info  fields  are  displayed  on  the  terminal  without  any

interpretation  or  caption.  An  advantage  of  this  method  is  that  field  values  that  cannot  be  interpreted  as

balance are also displayed on the terminal. This could be a text, for example. Another advantage is that

all 10 information fields can be displayed.

2.3  Mail IDs IMAIL and ZMAIL

If  you  use  the  two  mail  IDs,  “Mail  ID  time  evaluation  error”  (IMAIL)  and  “Mail  ID  time  recording  type”

(ZMAIL) and you want to display an info text, then  you must configure the text in HYDRA PZE for each

mail  ID  and  each  BDE  group  (any  text  is  possible).  This  configuration  is  described  in  the  section  that

follows.

2.4  Configurations in HYDRA

Not all settings and configurations required in HYDRA are included in the interface and can be taken over

from SAP. The following configurations have to be performed in HYDRA. However, the settings can only

made for master data that does not frequently change.

2.4.1

Terminal configuration

Terminals have to be configured based on the current documentation of Terminals and HYDRA-PZE.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 8 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Note: If a terminal is configured  with the operation mode "auto status", auto  status clocking records are

transferred to SAP using the record type  "P01 auto status (clock-in or clock-out)" OR using record type

"P10 clock-in" or "P20 clock out"; which record type is used depends on the customization options of the

interface provided for the upload of time events.

2.4.2

Terminal groups

The SAP HR master includes an access control group. This group must exist as HYDRA Terminal group.

You can then create and assign any clocking authorizations groups in SAP. As minimum configuration, all

existing terminals have to be assigned to the terminal group "99". Please also see the description of the

field  SUBSYSTEM_GROUPING  in  the  description  of  the  HR  master  interface  in  one  of  the  sections

below.

2.4.3  Authorization for responsibility areas

To  view  and  edit  staff  data  in  HYDRA,  you  must  assign  authorizations  for  responsibility  areas  to  the

relevant Persons on the HYDRA client.

2.4.4  Message configuration for IMAIL and ZMAIL

The  HR-PDC  interface  transfers  the  ZMAIL  field  when  downloading  the  HR  master.  The  mail  ID  of  the

time recording "IMAIL" is included when time balances are downloaded.

2.4.4.1

Editing in SAP

  Editing in info type 50 of the SAP HR master data:

You can store a mail ID for each person in the info type 50 of the SAP HR master data. This ID is

transferred when the HR mini-master is downloaded from SAP to HYDRA.

For details on the setting options, see the SAP help. 



Integration into the time calculation (balances)

If  errors  occur  during  time  calculation,  a  mail  ID  can  be  assigned  to  the  error.  To  make  the

required configurations as customizations, go to SPRO  Personnel Time Management  Time

evaluation    Time  evaluation  based  on  time    Output  of  messages    Create  message

description

2.4.4.2

Editing in HYDRA

The option "PZE as SAP subsystem" must be activated in the HYDRA basic settings. Only then,

the  message  configurations  for  "events"  starting  with  "ZMAIL"  or  "IMAIL"  are  correctly

processed.  If  the  option  "PZE  as  SAP  subsystem"  is  not  activated,  these  configurations  are

processed as normal messages and a message is created on the terminal for all persons of the

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 9 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

company.

If  you use the "mail ID time evaluation  error" (IMAIL, from download  of balances) and the  "mail ID time

recording  type"  (ZMAIL,  from  SAP  HR  master),  you  require  a  configured  message  in  HYDRA-PZE  for

each mail ID and each company used. Only then, a configured info text can be displayed:

Configuration example for the IMAIL ID "1" from download of balances

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 10 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

You can also configure general messages for IMAIL and ZMAIL without attaching a key. If no message is

available  with  the  relevant  key,  this  general  message  will  automatically  be  displayed  with  the  attached

key:

Example of a general configuration for the ZMAIL ID from the HR master

If  a  person  is  supposed  to  receive  a  message  with  the  key  "W"  and  a  separate  message  (event

"ZMAILW") is not available for this key, the terminal displays the message "Time mail with ID: W" for the

configuration shown in the above screenshot. If no message configuration at all is available, a standard

message  is  generated.  Messages  of  the  time  recording  are  displayed  with  the  text  "Info  mail:  X",  other

messages  show  the  text  "personnel  mail:  X".  These  standard  messages  are  only  displayed  on  the

terminal when the "info" or "messages" keys are used, but not for IN/OUT clockings. Errors are not logged

if configurations are missing.

Besides  the  configuration  for  IMAIL  and  ZMAIL,  you  can  also  create  "normal"  messages  in

HYDRA  that  are  displayed  on  the  terminal.  For  these  messages,  the  field  Event  must  remain

empty.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 11 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

2.4.5

Function authorizations

If  you  restrict  the  Function  authorizations,  you  can  assign  useful  access  rights  in  the  PZE  menu  to  the

employees working on the HYDRA client.

2.4.6  Basic settings

You  must  activate  the  option  "PZE  as  SAP  subsystem"  in  the  basic  settings  and  enter  the  relevant

version:

For Version, enter the version of the SAP system. If you connect via HR-PDC, the version must be 4,50

or higher. Higher version numbers have the same effect.

Most of the changes in the basic settings only become effective after restart of the HYDRA server.

2.4.7  Absence reason "business trip"

If  you  use  HR-PDC  and  you  want  to  post  business  trips,  you  must create  an  Absence  reason  absence

reason "business trip" and assign this reason to one of the keys on the Terminal.

The following settings are relevant for the absence reason (all other fields are not relevant):

Absence reason

Should  be  "1"  as  this  absence  reason  is  specified  by  default  if  specific  third-party  terminals  are

used.

Designation

"Business trip"

Meaning

Business trip

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 12 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

To  correctly  process  business  trips,  the  option  "PZE  as  SAP  subsystem"  with  version  4.5  or

higher  must  be  set  in  the  PZE  tab  of  the  Basic  settings.  If  these  settings  are  not  correct,

business trip postings are only transferred as clock-out or clock-in to SAP.

2.5  Useful functions of HYDRA  Time & Attendance

The following functions may be used if the time and attendance  module (PZE) is used as subsystem of

SAP:

  Edit HR master (e.g. "department" field).

  Clocking authorizations for PZE terminals using terminal groups or terminals

  Control of access authorizations for the HYDRA Access Control system via Access profile

assignments (with ZKS-VWF license only).

  Display of clocking records performed on HYDRA terminals using the functions Clockings and

Clocking archive (with the PZE-EPP license only).

  Current Overviews of attendance and absence  (with the PZE-INF license only).

  Overview of the current account balances transferred from SAP(with the PZW-PAP license only).

  Display of the account balances transferred from SAP on the terminal.

  Display of  Messages on the terminal (with PZE-INF and specific terminal types only).

  Print of ID cards with HYDRA (with SIS-DMA license only).

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 13 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

2.6  Overview of the HR-PDC interfaces

The below overview shows the interfaces and the programs and log files that are used for operation. You

can  view  and  print  the  log  files  on  the  MOC  in  "System  administration  -  Logging  -  System  logs".  They

should be checked occasionally.

Program

Function

Log files

sap45ein.out

Downloads from SAP to HYDRA:

HRCC1DNPERSO:   HR master

HRCC1DNBALAN:

Time balances

dnperso

dnbalan

HRCC1DNTEVGR:

Time event groups

dntevgr

HRCC1DNATTAB:

Absence reasons

dnattab

HRCC1DNOBJID:

Objects

HRCC1DNCOSTC:   Cost centers

HRCC1DNDNINRD:

Internal orders

HRCC1DNWBSEL:

Projects

dnobjid

dncostc

dninord

dnwbsel

HRCC1DNEXTWT:

External wage types

dnextwt

sap45rck.out

Returns uploads from PZE clocking records to

sap45rck.pro

HR

sap45rck.err

2.6.1  Download HR master

Field

(* = key)

name

Pos.   /

Meaning in SAP

Data field and meaning in

width

HYDRA

* SOURCE_SYS

1

10  Logical  system,  source

Saved in info text 16.

system

* TIMEID_NO

11  8  Badge number

Badge number (must be unique)

* FROM_DATE

19  8  Start date

The employee’s current HR master

* TO_DATE

27  8  End date

data is identified using the validity

period.

The date of joining in HYDRA is

only filled when data is first

transferred from SAP and results

from the start date. (Format

YYYYMMDD).

* TIMEID_VERSION

35  1  Badge version

Not processed.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 14 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

PERNO

36  8  Personnel number

Personnel number (must be unique

in HYDRA!)

EDIT_NAME

44  40  The  person's

formatted

Not processed by default

name  (first  name,

last

name,

in  capital/lower

case letters)

SORT_NAME

84  30  Sortable  name  (second

Name of employee, is saved as

name,

first

name,

second name. If the name contains

everything  in  upper  case,

a comma, the program assumes

no umlauts)

that the second name comes

before and the first name after the

comma, and saves the name with

separated first and second names.

LANGU

114  1  Language key

Not processed. In HYDRA, only the

ISO language key is integrated.

LANGU_ISO

115  2  Language  key  according

Language key for the allocation of

to ISO code 639

the correct texts. Saved as

nationality.

PS_GRPG_ATT_ABS_TYPE

117  2  Personnel

groups

Stored in text field 19 [1,2] and

attendance/absence

employee subgroup [4,5]

COUNTRY_GROUPING

119  2  Country groups

Stored in text field 17.

SUBSYSTEM_GROUPING

121  3  Groups

for  sub-system

Terminal group for PZE access

connection

authorization. Also saved in the

“Department” field of HR master

data.

ES_GRPG_WORK_SCHED

124  1  Groups  for  working  time

Stored in text field 18 and

plan

employee subgroup [6].

ACCESS_CONTROL_GROUP  125  2  Access control group

Access profile for HYDRA access

control system.

PERSONAL_CODE

127  4  Personal code

PIN code of ZKS badge. By default,

this PIN code is included in the

badge, but not in the HR master.

See also the customization options

below.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 15 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

MAIL_INDICATOR

131  1  Mail

ID

time  recording

Generation of a relevant message

info type

on the terminal.

ATT_ABS_REASON_GRPG

132  3  Groups

of

Stored in text field 19 and in

attendance/absence

characters 1 to 3 of the “Employee

reasons

sub-group” field in the HR master

data.

EXT_WAGETYPE_GRPG

135  3  Groups  of  external  wage

Stored in text field 20.

types

TIME_EVENT_TYPE_GROUP  138  2  Groups  of

time  event

Time event authorization, stored

types

internally (invisible field “PZT

number of”).

COMP_CODE

140  4  Company code

Company

COSTCENTER

144  10  Cost center

Cost center. Leading zeros are cut

off with numeric cost centers, to

save typing work in HYDRA and

reduce the number of characters.

CUSTOMER_FIELD_1

154  20  Customer-specific field 1  Reserved for customer-specific

processing, stored in info text 14.

CUSTOMER_FIELD_2

174  40  Customer-specific field 2  Reserved for customer-specific

processing, stored in info text 9.

Employees  who  are  available  in  HYDRA,  but  are  no  longer  contained  in  the  current  interface  file,  are

blocked in HYDRA and not deleted.

The  badge  number  and  the  personnel  number  must  both  be  unique  in  HYDRA.  This  also

applies  to  the  badge  numbers  of  blocked  employees,  which  can  only  be  assigned  once  in

HYDRA. If duplicate badge numbers occur, this is recorded in the error log.

For  further  information  on  the  HR  master fields,  refer  to  the  documents  of  the  standard  interface  of  the

HYDRA Personnel Time Management and the documents of the HR master on the HYDRA client.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 16 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

2.6.1.1  Access Control Group – Clocking Authorization

The field “groups for subsystem connection” (SUBSYSTEM_GROUPING) is interpreted  in HYDRA as  a

terminal group for the clocking authorizations at the time and attendance terminals. The employee is

assigned  a  clocking  authorization  for  the  transferred  terminal  group.  If  no  valid  value  is  entered,  the

terminal  group  99  is  assigned  to  the  person.  The  assignment  of  terminals  to  terminal  groups  must  be

edited in HYDRA.

The  access  control  group  (ACCESS_CONTROL_GROUP)  is  interpreted  as  an  access  profile  for  the

HYDRA  access  control  system. If no  valid  value  is  entered, the access profile 999 is assigned to the

employee’s badge. The Access profiles and their Access authorizations must be edited in HYDRA.

According to our information, the access control group can be edited in the SAP info type 50 of the HR

master.

2.6.1.2  What data is updated?

In some HYDRA systems, you must manually edit the data of persons downloaded from SAP. You must

assign a BDE authorization, for example. You can also manually create persons that add to the persons

downloaded  from  SAP.  Their  personnel  and  badge  numbers  must  not  be  identical  to  numbers  of  the

persons managed in SAP.

With this type of systems, it is important to know the data that is updated during an SAP download (i.e.

overwritten)  and  how  the  system  reacts  in  case  of  double  personnel  or  badge  numbers.  The  following

rules apply:

HR master data

In a standard system, the following fields of an existing HR master are overwritten by the SAP HR master

data interface:

  Badge

  Company

  Area

  Employee subgroup

  Cost center

  Last name, first name

  Business  trip  authorization  (a  fixed  value  is  predefined,  it  is  enabled  by  default.  See  also  the

customization options)

  Blocking ID

  Date of leaving

  Nationality

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 17 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

  Free info text 9 (customer field 2)

  Free info text 14 (customer field 1)

  Free info text 16 (source system)

  Free info text 17 (country grouping)

  Free info text 18 (ES_GRPG_WORK_SCHED)

  Free info text 19 (PS_GRPG_ATT_ABS_TYPE + ATT_ABS_REASON_GRPG)

  Free info text 20 (EXT_WAGETYPE_GRPG)

  Responsibility area (only if activated via additional customization)

When a person is first transferred to HYDRA, the start date from the interface is assigned to the date of

joining field in addition to the fields mentioned above.

If  an  employee  is  no  longer  transferred  from  SAP  to  HYDRA,  then  the  HR  master  data  is  blocked  in

HYDRA (not deleted). If the person is then downloaded again from SAP, the HR master data is released

and the employee's data kept in HYDRA are retained. If the version control of the HR master is used, only

versions are blocked that are valid from now on in future. Older HR master versions even remain active in

HYDRA if they are no longer included in the interface, as SAP does not provide a complete history.

The date of leaving remains empty in all HR master versions by SAP.

If  the  interface  contains  an  employee  whose  badge  number  is  already  allocated  to  a  different

personnel number in the HYDRA HR master data, the other person's badge number is removed

(empty field). A new version is created and the badge number is kept for the past validity period

of the person that overlaps with the person included in the interface. For information on the ZKS

badge, refer to the next section "ZKS badge".

HYDRA  supports  HR  master  versions.  The  different  versions  of  the  HR  master  in  the  interface  are

therefore  correctly  integrated  in  HYDRA.  A  new  version  is  only  formed  in  HYDRA  when  the  data

transferred by the interface is different to the previous version.

PZE access authorizations

The  access  authorization  transferred  by  SAP  is  always  created.  PZE  access  authorizations  that  are

managed by the SAP interface can be identified by the field "user". With access authorizations from the

SAP interface, this field includes the name of the logical SAP system that provided the authorization.

Additional PZE access authorizations can be created manually and are only changed by the interface if

they are valid for the same terminal group as specified by the interface.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 18 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

ZKS Badge

In the ZKS badge, the following fields are overwritten by the HR master data download from SAP:

  Name

  Company

  Personnel number

  Validity date

  Comment 1

  Comment 2

Only the data in employee badges are updated.

Other  badges  can  be  manually  maintained  for  the  employee  as  replacement  badges,  but  these  are  not

affected by the HR master data download from SAP.

If an employee’s badge number has been changed, the old badge is deactivated (blocked) and a new one

created, and the existing profile allocation is transferred to the new badge and deleted for the old badge.

If there is an active ZKS badge with this badge number, but a different personnel number, then the badge

will be assigned to the new personnel number. The profile assignments of the badge are deleted as they

did not belong to the concerned person.

If an employee is no longer transferred from SAP to HYDRA, then the ZKS badge is blocked (not deleted)

in  HYDRA.  If  the  employee  is  then  downloaded  again  from  SAP,  a  new  ZKS  badge  is  created  which

retains the previous allocation to the access profile.

The manually maintained data of a normal ZKS badge is lost, if an employee was not included

in a download (therefore blocked) and is then transferred again in a later download. In this case

a  new  ZKS  badge  is  created.  If  the  badge  number  is  the  same,  however,  the  access  profile

allocation is still retained.

HYDRA creates new versions of the ZKS badges in the interface for every version of the HR master data

that includes differences. With each interface run, it is ensured that the currently valid badge is activated.

ZKS Profile Assignments

With  profile  assignments, HYDRA  memorizes  in  an  internal  database  field  of  profile  assignments  which

profile  assignments  were  made  by  the  interface.  These  assignments  are  checked  and  edited  with  each

interface run. The internal database field is also retained when profile assignments are manually changed

and copied. The badges are then still managed by the interface.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 19 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Additional ZKS profile assignments can be created manually and are not affected by the interface.

2.6.1.3  Configuration options

The following configuration options are available for the HR master download using the interface program

sap45ein.scr. Set these options in the entries of the HYDRA Distribution model.

/VAB=x

: Responsibility area from field x (x stands for the below values)

This option defines how the "responsibility area" field is assigned in the HR master:

x=KST-FIR

: combination of cost center and company, downward compatible with

  previous cost center authorizations.

Otherwise

: empty at first, can be edited manually.

/ZKSPROF=x  : ZKS access profile from field x (x stands for the below values)

(previously -Hx)

/PZEZUG=x

:  PZE  access  authorization  from  the  field  x  (x  stands  for  the  below  values)

(previously -Tx)

Fields for clocking authorization (PZE) and access authorization (ZKS):

x=B :

SUBSYSTEM_GROUPING

(BDE group)

(standard for PZE)

x=Z :

ACCESS_CONTROL_GROUP  (access control group)

(standard for ZKS)

x=P :

PERSONAL_CODE

(personal code)

x=T :

ES_GRPG_WORK_SCHED

(grouping of working time plan)

x=Cn:   CUSTOMER_FIELD_n

(customer-specific field n, n =1,2)

/DESTCOMP=x : In HYDRA all persons are assigned to the target company x .

(previously -Fx)

Using this option,  you can  set the same entry in field  Company for all persons in the HYDRA HR

master,  that  are  transferred  by  this  interface.  In  this  case,  the  COMP_CODE  included  in  the  HR

master interface from SAP is not transferred as the company. If this option is set, the interface does

not edit persons that are not assigned to the target company.

If /DESTCOMP=SSGR is set, the HYDRA company is transferred in a way that is compatible with

KK1 from the BDE group (SUBSYSTEM_GROUPING), instead of the COMP_CODE.

/MAILINDIC

: Process mail ID in the HR master and info   (previously -M)

If  this  ID  is  set,  the  SAP  mail  IDs  included  in  the  SAP  HR  master  and  the  balances  will  be

processed. If the SAP mail ID is set, the PZE terminal will show an information when clocking.

/NOBER

: Do not overwrite HR master field "area".

(previously -NB)

This option makes sure that the field  "area"  will not be overwritten by the HR master interface for

persons that already exist in HYDRA. But it may be edited manually. The field is assigned to "0" if

the HR master is transferred for the first time.

/DGBER=J/N   : Disable business trip authorization in the HR master.

This option specifies whether or not the authorization for the business trip in the HR master is set

by the interface. By default, the business trip authorization is enabled.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 20 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

/LOGSYS=X

: Only process data of the SAP source system X

(with several independent source systems). If data derives from other source systems, it is ignored.

/CUS1=X

: HR master customer-specific Field 1 (C20) (values for X see below)

X=TAETIGKEIT

: Transferred to the field "activity“.

or

X=““

: Transfer to field "INFOFELD_14".

/CUS2=X

: HR master customer-specific Field 2 (C40) (values for X see below)

X=TAETIGKEIT

: Transferred to the field "activity“.

or

X=““

: Transfer to field "INFOFELD_9".

/NOPCODE

: Do not overwrite PIN code in the ZKS badge.

The  PIN  code  from  the  HR  mini  master  is  not  transferred  to  the  ZKS  badge.  By  default,  the  PIN

code of the badge will always be overwritten by the PIN code from the interface. The PIN code in

the badge controls check of the PIN code in the ZKS access control.

/PIN_PNR

: Transfer PIN code to the HR master

The PIN code from the HR mini master is transferred to the HR master. By default, the PIN code of

the  HR  master  is  NOT  overwritten  by  the  interface.  The  HR  master  PIN  code  controls  login

authorizations  within  HYDRA@Web  and  for  postings  by  persons  with  mobile  data  acquisition

devices.

/ENAME

: Take over names from the field EDIT_NAME instead of SORT_NAME.

The  person's  name  is  taken  from  the  field  EDIT_NAME  instead  of  the  SORT_NAME  field.  The

EDIT_NAME  field  includes  the  name  written  with  capital/lower  case  letters  and  umlauts.  The  first

name is entered before the last name. Please note: The SAP interface does not clearly distinguish

between first name and last name. For this reason, HYDRA splits up the name into first name and

last  name  as  of  the  first  blank  character.  However,  this  might  result  in  several  first  names  to  be

presented in an uncommon manner, if these names do not include a hyphen in SAP-HR (correct:

"Anne-Catherine Smith").

/ENAME_NOSEP : Transfer names from the field EDIT_NAME instead of the SORT_NAME field to

the last name.

Corresponds to the /ENAME option. But HYDRA does not distinguish between first name and last

name and stores the entire name in the last name field. As a consequence, you can no longer sort

by the last name of a person in HYDRA, but only by the first name of a person.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 21 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Default value for the gender of a person

A  person's  gender  is  not  included  in  the  interface.  From  service  pack  16,  the  default  value  for  the  HR

master in  our system is "not defined". In former versions, the default value  used to  be "male", because

"not defined" was not yet available.

If you want to specify another default value than "not defined", you can configure a deviating default value

using an INI configuration as of service pack 16:

INI configuration

PNR/DEFAULTS/GENDER

Content

Contents  Meaning

M

W

X

U

Male

Female

Third gender

Not defined

2.6.2  Download of time balances

The  time  balances  are  allocated  to  the  employees  and  can  be  viewed  on  all  PZE  terminals  and  on  the

MOC using the info function.

For  further  information  on  the  display  options  for  time  balances  on  PZE  terminals,  refer  to  section

“Processing of the info fields”.

Field

(* = key)

name

Pos.   /

Meaning in SAP

Data field and meaning in HYDRA

width

* SOURCE_SYS

1  10  Logical system, source system

Reference to HR master, info text 16

* TIMEID_NO

11

8  Badge number

Reference  to  the  badge  number  in

the HR master

PERNO

19

8  Personnel number

-

SUBSYSTEM_GROU

27

3  Groups

for

sub-system

-

PING

connection

INFOFELD_1

30  13  Variable information field

Value account 1

INFOFELD_2

43  13  Variable information field

Value account 2

INFOFELD_3

56  13  Variable information field

Value account 3

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 22 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

INFOFELD_4

69  13  Variable information field

Value account 4

INFOFELD_5

82  13  Variable information field

Value account 5

INFOFELD_6

95  13  Variable information field

Value account 6

INFOFELD_7

108  13  Variable information field

Value account 7

INFOFELD_8

121  13  Variable information field

Value account 8

INFOFELD_9

134  13  Variable information field

INFOFELD_10

147  13  Variable information field

-

-

TIME_EVAL_MAIL_IN

160

1  Mail ID time evaluation error

Creation of an appropriate message

DICATOR

on the terminal.

CUSTOMER_FIELD_1  161  20  Customer-specific field 1

Reserved

for  customer  specific

processing, info text 15.

CUSTOMER_FIELD_2  181  40  Customer-specific field 2

Reserved

for  customer  specific

processing, info text 10.

2.6.2.1  Customization settings

The following customization options are provided if you want to customize the download of balances with

the interface program sap45ein.scr. Set these options in the entries of the HYDRA Distribution model.

/MAILINDIC

: Process mail ID in the HR master and info   (previously -M)

If  this  ID  is  set,  the  SAP  mail  IDs  included  in  the  SAP  HR  master  and  the  balances  will  be

processed. If the SAP mail ID is set, the PZE terminal will show an information when clocking.

/RAWINFO

: Information texts as message in the hyinfo table (text form). (previously -I)

If  this  parameter  is  set,  the  information  texts  from  SAP  are  directly  displayed  unchanged  as

information on the PZE terminal. If this option is not set the first 8 of the 10 SAP information fields

are imported to the HYDRA time accounts and displayed as time account on the PZE terminal. By

default, they are processed as time accounts (option is not set), as SAP only transfers information

values without designation or text.

/LOGSYS=X

: Only process data of the SAP source system X

(with several independent source systems). If data derives from other source systems, it is ignored.

2.6.3  Download of time event groups

The  time  event  groups  are  read  in  HYDRA,  but  are  not  used  to  control  clocking  authorizations.  In

HYDRA, this is controlled via access authorizations and terminal configurations.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 23 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Field

(* = key)

name

Pos.   /

Meaning in SAP

Data field and meaning in HYDRA

width

* SOURCE_SYS

1  10  Logical system, source system

Is saved.

*

11

2  Group of time events

Is saved.

TIME_EVENT_TYPE_

GROUP

TEVENTTYPE

13

3  Record type

Is saved. See the description of

uploading clocking records.

2.6.4  Download of absence reasons

The  absence  reasons  are  downloaded  so  that  the  relevant  names  of  the  absence  postings  can  be

displayed on the MOC. Only if the absence reason list is used on the terminal, it is possible to perform a

personalized authorization check for absence reason postings.

Field name

(* = key)

Pos.   /

Meaning in SAP

Data field and meaning in HYDRA

width

* SOURCE_SYS

1  10  Logical system, source system

Is saved.

*

11

3  Groups of attendance/absence

Relating to HR master data/Info

ATT_ABS_REASON_

reasons

text_19[3,5] or employee subgroup

GRPG

*

14

2  Personnel groups

Relating to HR master data/Info text

[1,3]

PS_GRPG_ATT_ABS

attendance/absence

19 [1,2] or employee subgroup [4,5]

_TYPE

*

ES_GRPG_WORK_S

CHED

16

1  Groups for working time plan

Relating to HR master data/Info text

18 or employee subgroup [6]

* ATT_ABS_REASON

17

4  Attendance/absence reason

Absence reason

* FROM_DATE

21

8  Start of validity date

Selection of valid data records

* TO_DATE

29

8  End of validity date

Selection of valid data records

* LANGU

37

1  Language key

-

* LANGU_ISO

38

2  Language key according to ISO

Language key for the allocation of

code 639

the correct texts, relating to HR

master data/nationality

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 24 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

ATT_ABS_REASON_

40  30  Designation of the

Designation of the absence reason

TEXT

attendance/absence reason

2.6.5  Download of objects

The  objects  are  used  for  uploads/confirmations  via  the  PZE  terminal  CT-380  or  CT-830.  They  are  only

used in very special cases.

Field name

(* = key)

Pos.   /

Meaning in SAP

Data field and meaning in HYDRA

width

* SOURCE_SYS

1  10  Logical system, source system

Is saved.

* OBJECT_TYPE

11

2  Object type

* OBJ_ID

13

8  Object

* OBJ_ID_GRP

21  15  Object grouping

Is saved.

Is saved.

Is saved.

* FROM_DATE

36

8  Start of validity date

Selection of valid data records

* TO_DATE

34

8  End of validity date

Selection of valid data records

* LANGU

42

1  Language key

Is saved.

* LANGU_ISO

43

2  Language key according to ISO

Language key for the allocation of

code 639

the correct texts, relating to HR

master data/nationality

OBJ_ID_TEXT

45  40  Object name

Is saved.

2.6.6  Download of cost centers

The cost centers are downloaded so that the detailed names of the cost centers can be displayed on the

MOC.

On the PZE terminal (Windows), the cost centers can also be sent along with other postings, if you assign

the function "cost center list" (absence reason KSL) to an absence reason key on the terminal. You can

configure a single cost center key with the absence reason KST.

Field

(* = key)

name

Pos.   /

Meaning in SAP

Data field and meaning in HYDRA

width

* SOURCE_SYS

1  10  Logical system, source system

Is saved.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 25 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

* COMP_CODE

11

4  Company code

* COSTCENTER

15  10  Cost center

Company

Cost center

* COSTCENTER_

25  15  Cost center group

Is saved.

GROUP

* FROM_DATE

40

8  Start of validity date

* TO_DATE

48

8  End of validity date

Is saved.

Is saved.

COCNTR_TXT

56  20  Cost center designation

Cost center designation

2.6.7  Download of internal orders

The internal orders are used for uploads/confirmations via the PZE terminal CT-380 or CT-830. They are

only used in very special cases.

Field

(* = key)

name

Pos.   /

Meaning in SAP

Data field and meaning in HYDRA

width

* SOURCE_SYS

1  10  Logical system, source system

Is saved.

* COMP_CODE

11

4  Company code

* ORDER

15  12  Internal order

Is saved.

Is saved.

* ORDER_GRP

27  15  Grouping of internal orders

Is saved.

ORDER_NAME

42  40  Designation of the internal order

Is saved.

2.6.8  Download of projects

The projects are used for uploads/confirmations via the PZE terminal CT-380 or CT-830. They  are only
used in very special cases.

Field

(* = key)

name

Pos.   /

Meaning in SAP

Data field and meaning in HYDRA

width

* SOURCE_SYS

1  10  Logical system, source system

Is saved.

* COMP_CODE

11

4  Company code

* WBS_ELEMENT

15  24  Project ID

*

39  15  Groups of projects

Is saved.

Is saved.

Is saved.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 26 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

WBS_ELEMENT_GRP

WBS_SHORTTEXT

54  40  Designation of the project

Is saved.

2.6.9  Download of external wage types

The external wage types are used in very special cases for the upload/confirmation via a special GUI on

the  MOC.  This  is  not  activated  by  default.  If  required,  please  contact  our  project  management

department.

Field

(* = key)

name

Pos.   /

Meaning in SAP

Data field and meaning in HYDRA

width

* SOURCE_SYS

1  10  Logical system, source system

Is saved.

*

11

3  Groups of external wage types

Is saved.

EXT_WAGETYPE_GR

PG

* COUNTRY_GRPG

14

2  Country groups

* EXTERNAL_

16

4  External wage type

Is saved.

Is saved.

WAGETYPE

* FROM_DATE

20

8  Start of validity period

Is saved.

* TO_DATE

28

8  End of validity period

Is saved.

WAGETYPE_UNIT

36

3  Unit of external wage type

Is saved.

WAGETYPE_UNIT_IS

39

3  Unit  of  the  external  wage  type

Is saved.

O

according to ISO

* LANGU

42

1  Language key

Is saved.

* LANGU_ISO

43

2  Language key according to ISO

Is saved.

WAGELTEXT

45  25  Unit of external wage type

Is saved.

UNIT_TEXT

70  20  Designation of the unit

Is saved.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 27 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

2.6.10  Upload of time events

2.6.10.1  Record types

The following record types are processed:

Record
type

Meaning

P01

Automatic status (IN or OUT)

(Note: "automatic status" clocking records are transferred as record
type P10 clock-in or P20 clock-out if customized accordingly)

P02

Break automatic status (start or end of break)

P03

Business trip auto status (start or end offsite work)

P04  Work from home auto status (start or end of work from home)

P05

Access log (interim entry)

P10

Clock-in
(Note: automatic status clocking records are transferred as record type
P01, if customized accordingly)

P11

Change of payment or cost center information

P15

Start of break

P20

Clock-out
(Note: automatic status clocking records are transferred as record type
P01, if customized accordingly)

P25

End of break

P30

Start of business trip

P35

Start offsite work from home (start offsite work from home)

P40

End of business trip

P45

End offsite work from home

[P50]

[External wage type (employee expenditures), only with UPTEVEN]

P60

Info (info entry)

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 28 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

2.6.10.2

Interface Structure

The time events, which are to be uploaded, result from clocking records made at the PZE terminal.

Field name

Pos.   /

Meaning in SAP

Data field and meaning in HYDRA

width

SOURCE_SYS

1

10  Logical system, source system

Is saved.

TEVENTTYPE

TERMINALID

11

14

3

4

Time event type, record type

Record type

ID of the shop floor terminal

The terminal number is transferred

for events posted on the terminal;

the first four letters of the HYDRA

user name are transferred for events

that are manually entered on the

MOC.

LOGDATE

18

8  Date of the event

Clocking date

LOGTIME

26

6

Time of the event

Clocking time

PHYSDATE

32

8  Date when the event was written

Current date at the time of start of

to the interface

the interface program

PHYSTIME

40

6

Time when the event was written

Current time at the time of start of

to the interface

the interface program

TIMEID_NO

46

8  Badge number, constant 0.

Badge number, not allocated by

HYDRA, the personnel number is

used instead.

PERNO

54

8  Personnel number

Personnel number

ATT_ABS_REASON

62

4  Absence reason

Absence reason

Note: To transfer absence reasons,

you must enter the PZE as HR

subsystem in the HYDRA basic

settings as of version 4.5.

OBJECT_TYPE

66

2  Object type

SAP object type

OBJECT_ID

68

8  Object ID

SAP object ID

COMP_CODE

76

4  Company key

COSTCENTER

80

10  Cost center

Company

Cost center

ORDER

90

12

Internal order

Internal SAP order (no HYDRA

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 29 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

operation!)

WBS_ELEMENT

102  24  Project (work breakdown

SAP project

structure)

CUSTOMER_FIELD_1  126  20  Customer-specific field 1

Free for customer specific

processing

CUSTOMER_FIELD_2  146  40  Customer-specific field 2

Free for customer specific

processing

2.6.10.3  Customization settings

The  interface  program  sap45rck.scr  prepares  the  data  for  the  upload  of  time  events.  This  program  is

started in cyclic intervals by the HYDRA Scheduler. You can control the behavior/performance, if you set

command line parameters in the Scheduler entry.

Options starting with a minus sign must be entered before the options starting with a slash!

-K : Autom. status is not uploaded, clock-in/clock-out are uploaded instead

If  this  option  is  not  set,  HYDRA  forwards  record  type  P01  CLOCK_IN_OR_OUT  to  SAP  for  auto

status  clocking  records.  The  record  type  P03  START_OR_END_OFFSITE_WORK  is  transferred

with  business  trips.  If  the  option  -K  is  set,  HYDRA  transfers  instead  the  record  types  P10

CLOCK_IN

and  P20  CLOCK_OUT

or  P30  START_OFFSITE_WORK

and  P40

END_OFFSITE_WORK.

This option is set by default for newly installed HYDRA systems.

-C <XXX> : Generate upload for a specific SAP client only (SOURCE_SYS) XXX

The  clocking  records  of  persons  transferred  from  a  specific  SAP  system  <XXX>  to  HYDRA  are

prepared only. The SAP system is stored in the info field 16 of the HYDRA HR master. If persons

from several SAP systems must be processed, you must create several Scheduler entries.

-F <XXX> : Generate upload for a specific company <XXX> only.

The clocking records of persons from company <XXX> are only prepared for being sent to SAP. If

persons from several companies are to be transferred to SAP, several Scheduler entries will have

to be created.

-B : Generate uploads with segment name E2BPCC1UPTEVEN000.

Time  clocking  records  are  uploaded  with  E2BPCC1UPTEVEN000  instead  of  the  segment  name

E2BPCC1UPTEVEN.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 30 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Options starting with a minus sign must be entered before the options starting with a slash!

/HM : Transfer time of time events exact to the minute without seconds

If the command line parameter /HM is specified, the time of the time events only includes minutes in

field LOGTIME. The seconds are cut off and set to "00". The option /HM is available as of HYDRA 8

service pack 10 (2016).

/NOFIRKST: Suppression of cost center and company

The fields for the cost center (COSTCENTER) and company (COMP_CODE) are always left empty

and  are  never  filled  when  uploading  clocking  records.  This  option  is  used,  for  example,  if  cost

center changes are clocked in HYDRA that are not to be transferred as such to SAP-HR.

2.6.11  Logs and Security Mechanisms

2.6.11.1  Log files

A separate log file is created for each interface. The files are listed in the above tables with the interface

overview. You can view and print these files on the HYDRA client in menu item System administration 

Logging  System logs (transaction code: syspro).

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 31 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

2.6.11.2  Security mechanisms

The data records created by the upload program are additionally buffered in HYDRA.

In  the  current  versions  of  the  upload/confirmation  program,  clocking  records  are  stored  for  around  3

months in a buffer table in the database and can, if necessary, be transferred again.  If required, please

contact our hotline.

2.7  Connection of Several SAP Systems to HYDRA

Persons can be separated using source system and target company.

If HR-PDC is used, the HYDRA system knows the SAP system (Source-SYS) a person belongs to. This

information is stored in the additional data of the HR master data in info field 16:

This  ensures,  without  taking  any  extra  time  or  effort,  that  an  employee’s  recorded  clockings  are

confirmed/uploaded to the correct SAP system.

If you want to process HR-PDC persons in the complete HYDRA Time and Attendance, you can perform

a  controlled  processing  of  specific  SAP  systems  using  the  Source-Sys  or  the  so  called  “target

companies”. The required configurations must deeply affect the HYDRA system and must be performed

by MPDV personnel, if required.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 32 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

3  Application-Relevant Settings in SAP

Minimale  Korrekturen  bei  den  Objekten/Methoden  des  SAP
Verteilungsmodells

Definition of new subsystem groupings

If the subsystem groupings included in the SAP scope of supply are not sufficient, SAP customizing can

be used to define new subsystem groupings - SPRO  Personnel Time Management  Shop Floor Data

Collection  General settings  Define groupings for subsystem connection.

Maintenance of the SAP partner agreement - outbound processing

In the partner agreement in SAP (WE20), you maintain the following settings for outbound processing:

Parameter name

Value

For the download of the HR master data

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basic type

LS

HRCC1DNPERSO

Created port

1

Immediately transfer IDoc

HRCC1DNPERSO01

For the download of balances

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

LS

HRCC1DNBALAN

Created port

1

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 33 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Parameter name

Value

Output mode

Basic type

Immediately transfer IDoc

HRCC1DNBALAN01

For the download of the upload request

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basic type

LS

HRCC1REQUPTEVEN

Created port

1

Immediately transfer IDoc

HRCC1REQUPTEVEN01

Maintenance of the SAP partner agreement - inbound processing

In the partner agreement in SAP (WE20), you maintain the following settings for inbound processing:

Parameter name

Value

Partner number

Created logical system

Partner type

Message type

Process code

LS

HRCC1UPTEVEN

BAPI

Maintenance of the SAP distribution model - outbound processing

Parameter name

Value

For the download of the HR master data

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 34 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Parameter name

Value

Model view

Sender / client

Created model view

Logical system of the instance

Recipient / server

Logical system for receiver system

Object name / interface

RCVPMINIMD

Method

Filter

For the download of balances

Model view

Sender / client

receiveMiniMasterData

If  necessary,  maintain  BDE  groupings  as  filter

criterion

Created model view

Logical system of the instance

Recipient / server

Logical system for receiver system

Object name / interface

RCVPEVTREC

Method

receivePTBalance

For the download of the upload request

Model view

Sender / client

Created model view

Logical system of the instance

Recipient / server

Logical system for receiver system

Object name / interface

RCVPEVTREC

Method

Filter

requestPEvent

If  necessary,  maintain  BDE  groupings  as  filter

criterion

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 35 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Maintenance of the SAP distribution model - inbound processing

Parameter name

Value

For uploading time tickets:

Model view

Sender / client

Created model view

Logical system for sender system

Recipient / server

Logical system of the instance

Object name / interface

PTManagerExtPEvents

Method

Filter

Insert

If  necessary,  maintain  BDE  groupings  as  filter

criterion

Planning the relevant jobs

You  have  to  plan  the  following  programs/reports  as  jobs  for  the  HR-PDC  interface  for  automated

operation:

Program / report

Meaning

Please note:

SAPCDT45

Posting  of  personnel

time

Planning without output of a log

events

file

Relevant transactions

Transaction

Meaning

Please note:

PT80

Central  transaction  for  the  HR-

-

PDC interface

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 36 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

4  Application-Relevant Settings in HYDRA

Maintenance of the HYDRA distribution model - inbound processing

Maintain entries for HYDRA inbound processing in the HYDRA distribution model:

Parameter name

Value

For processing the HR master data download

Message type

HRCC1DNPERSO

Priority

Command

Description

none

sap45ein.scr

HR-PDC – HR master data download

Log. target system

Created logical system

Storage duration

10

For processing the download of balances

Message type

HRCC1DNBALAN

Priority

Command

Description

none

sap45ein.scr

HR-PDC – download of balances

Log. target system

Created logical system

Storage duration

10

For processing the upload request

Message type

HRCC1REQUPTEVEN

Priority

Command

High

hysapupl.scr

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 37 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Parameter name

Value

Command parameter

/UPLSEGNAM=E2BPCC1UPTEVEN

Description

HR-PDC – Upload request

Log. target system

Created logical system

Storage duration

10

Maintenance of the HYDRA distribution model - outbound processing

Maintain an entry for HYDRA outbound processing in the HYDRA distribution model:

Parameter name

Value

For uploading time tickets:

Message type

HRCC1UPTEVEN

Description

IDoc type

HR-PDC – upload of clocking records

HRCC1UPTEVEN01

Storage duration

10

Log. target system

Created logical system

Segment name 1

E2BPCC1UPTEVEN

Download of HR master data and time balances - setup and commissioning

You  have  to  observe  the  following  issues  if  you  want  to  download  the  HR  master  data  and  the  time

balances.

These steps are to be used as a guideline only. The individual points are described in more detail in the

HR-PDC documentation.

When the HR master data is downloaded, specific fields of HYDRA HR master data, which may

already be maintained, is overwritten by data from SAP.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 38 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

In  systems  which  are  already  running  productively  without  any  connection  to  SAP,  this  may

result in a modification of existing configurations for Personnel Time Management PZW, so that

they no longer work!

If the HYDRA Personnel Time Management is still to be used as the leading time management

system, the benefit in comparison to the risk has to be evaluated critically, and the HR master

data download has to be omitted, if appropriate. The affected HR master fields can be identified

from the documentation about the interface.

The  download  of  the  HR  master  data  will  also  have  an  effect  on  Shop  Floor  Data  Collection

(BDE),  even  if  only  in  terms  of  the  display  of  data  (e.g.  different  presentation  of  a  person's

name, or changes to organizational characteristics of persons, such as the company  and cost

center).

When  time  balances  are  downloaded,  the  persons'  account  balances  are  overwritten  in

HYDRA.

It  is  essential  that  this  is  prevented  if  HYDRA  is  and  shall  continue  to  be  used  as  the  Time

Management System PZW, since HYDRA is the active system for account management in this

case.

Overwriting by the HR-PDC would result in inconsistent data in the PZW account balances! The

download of time balances must not be activated in this case!

Clocking authorizations

The clocking authorizations of persons are set when the HR master data is downloaded. It may be

necessary to create or adjust terminal groups. Please refer to the documentation on the HR master

data download.

Access profile for the HYDRA Access Control system

The persons' access profiles for the HYDRA  Access Control system are set when the HR master

data  is  downloaded.  It  may  be  necessary  to  create  or  adjust  them.  Please  refer  to  the

documentation on the HR master data download.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 39 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Customizing settings

Customizing  settings  must  be  made  depending  on  the  customer's  requirements.  If  changes  are

made by MPDV, these must be documented in the customer's CID in order to make this information

available in the case of a support request. If changes are made in the customizing settings by the

customer, they have to be notified to the MPDV support team for the same reason. Please refer to

the  documentation  on  the  HR  master  data  download.  If  no  specific  requirements  are  known,

customizing settings do not have to be changed.

Account configuration

When time balances are downloaded, the balance fields are transferred to the PZE time accounts

in accordance with their sequence. The account configuration must be adapted in accordance with

the  contents  of  the  balance  fields,  so  that  the  information  display  at  the  PZE  terminal  and  on  the

MOC presents the data correctly.

Maintenance of the distribution model

As described above.

Download of other objects - setup and commissioning

In a standard system, only HR master data and time balances are transferred from SAP to HYDRA. All

other configurations/controls are implemented in HYDRA.

Other objects, e.g. "Projects", "Internal orders" or "External wage types" may only be set up upon explicit

instruction.

Upload of time events - setup and commissioning

You have to observe the following steps, if you want to use the upload of time events.

These steps are to be used as a guideline only. The individual points are described in more detail in the

HR-PDC documentation.

Before  the  first  actual  upload  of  time  events,  you  must  download  the  HR master  data  first,  so

that the staff and their clocking records can be assigned to an SAP system at all.

Marking existing clockings as "Uploaded", if appropriate

This  step  is  not  required  with  new  HYDRA  systems  or  systems  on  which  no  PZE

clockings have been recorded so far.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 40 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

If  the  HR-PDC  interface  is  set  up  for  the  upload  of  clockings  in  a  HYDRA  system  on  which

clockings have already been recorded, and these are no longer to be transferred to SAP, mark

these clocking records as "Uploaded" on the database level so that they are not uploaded to SAP.

To do so, use the two SQL statements (example):

update  stempelsaetze  set  rueckgemeldet_1  =  'J'  where  bedeutung  in  ('K',

'k') and stempeldatum_1 <= '12/31/2012';

update  stempelsaetze  set  rueckgemeldet_2  =  'J'  where  bedeutung  in  ('K',

'g') and stempeldatum_2 <= '12/31/2012';

The  date  selection  criteria  in  the  statements  must  be  adjusted  in  each  case  and/or

can be omitted if all clockings are affected.

In  the  SQL  syntax,  the  statements  above  are  formatted  with  hysql  for  execution.

Depending  on  the  SQL  client  used,  the  date  specifications  may  have  to  be

reformatted.

HYDRA basic settings

The HYDRA basic settings in the "PZE" tab have to be configured as described above.

1)  The option "PZE as SAP subsystem" has to be activated in the basic settings, and the relevant

version has to be entered.

2)  The version to be entered is the version of the SAP system. If HR-PDC is connected, it must be

4.50  as  a  minimum  requirement;  higher  version  numbers  can  also  be  entered,  they  have  the

same effect.

Absence reason "Business trip", if appropriate

If you want to post business trips at the PZE terminal, and you want to upload these business trips

to SAP as time events, configure the function as described in the document SAP-HRPDC_30.

Licenses

Licenses have to be installed as appropriate.

Maintenance of the distribution model

As described above.

HYDRA restart

If basic settings are changed or licenses are installed, HYDRA has to be restarted, unless this has

taken place in the relevant steps.

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 41 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

5  Configuration when using SAP PI / SAP PO

Changing the program call for sap45rck.exe/out

When using PI/PO, you have to change the program call for the upload program myerprck.exe/out in the

HYDRA Scheduler:

Situation

Value

Default program call (Windows) as delivered

sh.exe ./sap45rck.scr -K

Call including PI/PO (Windows)

sh.exe ./sap45rck.scr -K -B

Default program call (Linux) as delivered

./sap45rck.scr -K > /dev/null 2> /dev/null

Call including PI/PO (Linux)

./sap45rck.scr -K -B > /dev/null 2> /dev/null

Changing the segment name in the distribution model

Create  the  entry  in  the  HYDRA  distribution  model  in  order  to  transfer  clocking  records  as  outbound

configuration based on the following values:

Parameter name

Value

Message type

HRCC1UPTEVEN

Description

IDoc type

HR-PDC – Upload clocking records

HRCC1UPTEVEN01

Retention period

10

Log. target system

Created logical system

Segment name 1

E2BPCC1UPTEVEN000

Create  the  entry  in  the  HYDRA  distribution  model  in  order  to  request  the  upload  as  inbound  message

type based on the following values:

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 42 of 43

  HYDRA Interfacing Module to SAP HR via HR-PDC

Parameter name

Value

Message type

HRCC1REQUPTEVEN

Priority

Command

High

hysapupl.scr

Command parameter

/UPLSEGNAM=E2BPCC1UPTEVEN000

Description

HR-PDC – Request upload

Log. target system

Created logical system

Retention period

10

SAP-HRPDC_82.docx

Version: 1.0.23049

Page 43 of 43


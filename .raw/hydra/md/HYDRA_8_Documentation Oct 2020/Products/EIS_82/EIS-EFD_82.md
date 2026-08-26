Manual

Upgrade: Detailed Planning
Data for ERP
EIS-EFD 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Upgrade: Detailed Planning Data for ERP

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EIS-EFD_82.docx

Version: 1.0.23049

Page 2 of 14

Upgrade: Detailed Planning Data for ERP

Contents

1  Upgrade: Detailed Planning Data for ERP ................................................... 4

2  Setup of Data Record Structure ................................................................... 5

3  Uploading data types: HYDRA --> ERP ....................................................... 6

4  Upload of Planning Changes ....................................................................... 7

5  HYDRA Settings relevant for the Application ............................................. 10

6  Test Files .................................................................................................... 14

EIS-EFD_82.docx

Version: 1.0.23049

Page 3 of 14

Upgrade: Detailed Planning Data for ERP

1  Upgrade: Detailed Planning Data for ERP

Possible fields of application

The  function  package  "modification  of  detailed  scheduling  data  to  ERP"  enhances  the  ERP  systems

interface by the upload of detailed scheduling information.

Implementation notes

The function package is used if you:

  use the detailed scheduling/shop floor scheduling module and

  would like to upload the detailed scheduling dates specified there to the ERP system

Integration

The function package uses the data specified within the framework of detailed scheduling.

Functions

  Upload of changes to the planning

o  Upload of detailed scheduling dates

o  Upload of the machine/workplace on which the OP was scheduled

o

Identification of conflicts

EIS-EFD_82.docx

Version: 1.0.23049

Page 4 of 14

Upgrade: Detailed Planning Data for ERP

2  Setup of Data Record Structure

The  data  are  transferred  in  the  following  structure. Within  this  structure  the  value  of  the  SEGNAM  field

precisely defines the set-up of the user data structure in the SDATA field.

Field name Type Length  Designation  Data field and

meaning

SEGNAM*

Char

30

Segment name

This  field  is  occupied  by  the  writing

system  with  the  respective  segment

name.  This  precisely  defines  the set-

up of the data record (SDATA field).

Example: HY72_AU_HD_001

MANDT*

Char

3

Client

Reserved; fixed: '000'

DOCNUM*

Char

16

IDOC number

Serial number for the IDOCs

Reserved: fixed '0000000000000000'

SEGNUM*

PSEGNUM

Char

Char

6

6

Segment number

Reserved: fixed '000000'

Parent segment

Reserved; fixed: '000000'

number

HLEVEL

Char

2

Hierarchy level

Reserved; fixed: '00'

SDATA

Char

1000

User data

This field contains the user data. The

structure of this field is defined by the

SEGNAM field.

EIS-EFD_82.docx

Version: 1.0.23049

Page 5 of 14

Upgrade: Detailed Planning Data for ERP

3  Uploading data types: HYDRA --> ERP

Type

Description

CHAR x

Information  is  left-aligned  for  the  data  type  CHAR;  unnecessary  places  are  filled  with

blanks.

Example: "ABCD    "

NUM x

Numeric  field  of  the  length  x  without  sign.  Numbers  are  right-aligned;  unnecessary

places are filled with zeros.

Example: "00000002"

DEC_O x.y  Numeric field  of the length x and  y decimal places. An algebraic sign is preceding the

data  field  (“+”  or  “-“).  Places  that  are  not  required  are  filled  with  zeros.  There  is  NO

DECIMAL SEPARATOR.

e.g. DEC_O 13,3:

  -1234567890,123   -1234567890123

  234567890,3

 +0234567890300

DATE

The date is displayed in the YYYYMMDD format.

The field is filled with blanks (if it is not required).

TIME

The time is transferred in the HHMMSS format.

The field is populated with "000000".

Generally, HYDRA  always  transfers a contiguous data structure.  Data fields that are  not used are filled

with blanks. The following definitions apply if you use the file port:

Each  data  record  included  in  the  file  has  to  be  completed  by  'CR'  (U+000D)  and  'LF'  (U+000A)  for

Windows and 'LF' (U+000A) for Unix.

HYDRA  expects  the  file  to  be  in  the  UTF-8  format  and  HYDRA  also  uses  this  format  for  uploads.  On

request, the file transfer may also be performed in the file format that was used until MW 2.0.

EIS-EFD_82.docx

Version: 1.0.23049

Page 6 of 14

4  Upload of Planning Changes

Upgrade: Detailed Planning Data for ERP

PPS  specifications  can  be  modified  or  infringed  by  assigning  operations  in  the  HYDRA  shop  floor

scheduling module (HYDRA-HLS). These modifications can be uploaded to the PPS system.

Only  the  modifications  in  the  graphical  planning  board  of  the  HYDRA  shop  floor  scheduling

system (HLS) will be uploaded. Modifications made by the editing functions for operations or the

order sequencing will not be taken into account.

The following modifications and/ or statuses will be confirmed/uploaded:

  Planning for a workplace in HLS

  Re-planning within a workplace in HLS

  Re-planning for a different workplace (workplace/ machine change) in HLS

  Deallocation of the operation in HLS

The  customer  will  interpret  the  confirmations/uploads  as  well  as  the  processing  resulting  for  the  PPS

system.

The  following  optional  parameters  can  be  set  at  the  order  type  using  an  upload  indicator  (HYDRA

customizing) for MLE communication:

  Upload of all operations to the PPS system .

(Default: only the operations generated by PPS will be uploaded)

  Only upload of delayed operations

(default: inactive)

  Only upload of operations with different machine occupation/assignment

(default: inactive)

EIS-EFD_82.docx

Version: 1.0.23049

Page 7 of 14

Upgrade: Detailed Planning Data for ERP

The below specifications apply for the Idoc:

Message type:

HY72ADRCK_SC

IDOC type:

Segment
file name:

File extension:

HY72ADRCK_SC

HY72ADRCK_SCHEDULE

According to the configuration in the MLE communication
(Logical systems > Outbound Configuration Fileport)

Normally: ".dat"

Field
ANR

RMNR

AUART

DAT

ZEI

SGR:GUTB

SGE:B

SGR:GUTP

SGE:P

DATB

ZEIB

DATE

ZEIE

MNR

T
CHAR

L  D Description
40

  HYDRA order number = combined order/ operation number

The precise length that will be confirmed/uploaded depends on the length
configuration of the order and/or operation in the HYDRA basic settings.

CHAR

40

  Upload number (if available in HYDRA)

CHAR

DATE

TIME

5

8

6

  Order type of an order; according to HYDRA configuration

  Date of fixing (saving) of the reallocation in HLS

Time of fixing (saving) of the reallocation in HLS

DEC_O  13

3  Target quantities in base quantity unit if stored to the operation.

CHAR

3

  Base quantity unit if stored to the operation.

DEC_O  13

3  Target quantities in primary quantity unit

CHAR

DATE

TIME

DATE

TIME

CHAR

3

8

6

8

6

8

  Primary quantity unit: Primary unit of entry from the operation

These data fields include the start time scheduled by HLS for this operation.
These fields are not defined with the ACTION = "G".

These data fields include the end time scheduled by HLS for this operation.
These fields are not defined with the ACTION = "G".

  Workplace, to which the operation was allocated.
This field is not defined with the ACTION = "G".

MGRP

CHAR

8

  ACTION = "M" or "U":

ART

AKTION

CHAR

CHAR

1

2

Group of the workplace, to which the operation was allocated.
ACTION = "G":
Group, to which the operation was deallocated.

"K" = if a conflict is found when planning changes are uploaded for the
operation (see KONFLIKT field), otherwise undefined.

"M " - operation was allocated to workplace MNR. This may be an allocation
from the pool of groups to a workplace as well as a reallocation of one
workplace to another.
"U " - Operation was rescheduled within the workplace MNR.
"G " - Operation was deallocated to the pool of groups.

KONFLIKT

CHAR

2

  Prio 1: "PE" - The end date of the operation exceeds the basic date of the

order specified by the PPS system
Prio 2: "TE" - The operation exceeds the latest end date resulting from
scheduling.
Prio 3: "PM" - Workplace is not the workplace transferred by the PPS system
(during the first data transfer of the operation). Only possible if the operation
was transferred by the PPS system.
PLEASE NOTE: Only the conflict of the highest priority will be uploaded.
Example: If a planned operation has exceeded the basic date of the order and
if an operation was allocated to another scheduled workplace transferred by
the PPS system, only the "PE" conflict will be uploaded due to scheduling.

EIS-EFD_82.docx

Version: 1.0.23049

Page 8 of 14

Upgrade: Detailed Planning Data for ERP

If the additional function to split operations is used in the HYDRA shop floor scheduling system

(HLS-AGS license),





split masters will not be uploaded since they are no longer planned after splitting;

split operations will only be uploaded if the "Upload PPS operations only" option is NOT set

in the order type, "confirmations" tab.

EIS-EFD_82.docx

Version: 1.0.23049

Page 9 of 14

Upgrade: Detailed Planning Data for ERP

5  HYDRA Settings relevant for the Application

Proceed as described in the following to activate the interface for the upload of planning changes from the

HYDRA Shop Floor Scheduling (HLS):

Activating the logging

Edit the following entries in the Logging configuration:

Parameter name

For the scheduling of operations

Object

Action

Logging of dialog data

Logging

Comment

Labeling

Value

HLS

EINPLANEN

Yes

Entire object

No

No

Segment – for the upload to non-SAP systems

HY72ADRCK_SCHEDULE

Segment – for the upload to SAP systems

Z2HY72ADRCK_SCHEDULE000X000

For the replanning of operations

Object

Action

Logging of dialog data

Logging

Comment

Labeling

HLS

UMPLANEN

Yes

Entire object

No

No

Segment – for the upload to non-SAP systems

HY72ADRCK_SCHEDULE

Segment – for the upload to SAP systems

Z2HY72ADRCK_SCHEDULE000X000

For the deallocation of operations

Object

Action

Logging of dialog data

Logging

Comment

Labeling

HLS

AUSPLANEN

Yes

Entire object

No

No

Segment – for the upload to non-SAP systems

HY72ADRCK_SCHEDULE

Segment – for the upload to SAP systems

Z2HY72ADRCK_SCHEDULE000X000

EIS-EFD_82.docx

Version: 1.0.23049

Page 10 of 14

Upgrade: Detailed Planning Data for ERP

Activating the upload for the order type

If required, activate for the relevant Order type (s) > Confirmation > Confirmation of planning changes in

shop floor scheduling:

Parameter name

Upload PPS operations only

Upload delayed operations only

Value

Activate if required

Activate if required

Upload operations with deviating assignment only

Activate if required

Upload PPS operations only

Upload PPS operations only

  If you activate this option, the operations created in HYDRA are not uploaded.

Upload delayed operations only

Upload delayed operations only

  If you activate this option, only delayed operations are uploaded.

Upload operations with deviating assignment only

Upload operations with deviating assignment only

  If  you  activate  this  option,  only  operations  are  uploaded  that  have  been  planned  for  another

workplace than the workplace initially transferred.

You can use the option Upload PPS operations only no matter whether the other options are enabled or

not.  But  you  can  only  enable  one  of  the  two  options  Upload  delayed  operations  only  and  Upload

operations with deviating assignment only.

Activating the upload in the scheduler

Use the HYDRA Scheduler to plan jobs for the outbound processing:

Parameter name

Value

Transfer of uploads to the  MLE outbound transactions

Product key

License key

Command (Windows):

Command (Unix):

Comment:

sh.exe ./myerprck.scr /LOGGING
/LOGGING_SEGNAM=HY72ADRCK_SCHEDULE

./myerprck.scr /LOGGING
/LOGGING_SEGNAM=HY72ADRCK_SCHEDULE

EIS-EFD: Upload of planning changes
-> MLE outbound transactions

EIS-EFD_82.docx

Version: 1.0.23049

Page 11 of 14

Upgrade: Detailed Planning Data for ERP

Parameter name

Interval

Value

5

Upload of confirmations from the MLE outbound transactions to the ERP system

Product key

License key

Command (Windows) for the upload to
a non-SAP system:

sh.exe ./hysapupl.scr
/UPLSEGNAM=HY72ADRCK_SCHEDULE

Command (Windows) for the upload to
an SAP system:

sh.exe ./hysapupl.scr
/UPLSEGNAM=Z2HY72ADRCK_SCHEDULE000X000

Command  (Unix)  for  the  upload  to  a
non-SAP system:

./hysapupl.scr /UPLSEGNAM=HY72ADRCK_SCHEDULE

Command  (Unix)  for  the  upload  to  an
SAP system:

./hysapupl.scr
/UPLSEGNAM=Z2HY72ADRCK_SCHEDULE000X000

Comment:

Interval

EIS-EFD: Upload of planning changes MLE outbound
transactions -> ERP system

5

Editing the HYDRA distribution model – output for non-SAP systems

Use the HYDRA distribution model to edit an entry for the HYDRA outbound processing:

Parameter name

To upload time tickets

Message type

Description

IDoc type

Retention period

Log. target system

Segment name 1

Value

HY72ADRCK_SC

EIS-EFD – upload of planning changes

HY72ADRCK_SC

10

Created logical system

HY72ADRCK_SCHEDULE

Editing the HYDRA distribution model – output for SAP systems

Use the HYDRA distribution model to edit an entry for the HYDRA outbound processing:

Parameter name

To upload time tickets

Message type

Description

IDoc type

Retention period

Value

ZHY72ADRCK_SC

EIS-EFD – upload of planning changes

ZHY72ADRCK_SC01

10

EIS-EFD_82.docx

Version: 1.0.23049

Page 12 of 14

Upgrade: Detailed Planning Data for ERP

Parameter name

Log. target system

Segment name 1

Value

Created logical system

Z2HY72ADRCK_SCHEDULE000X000

EIS-EFD_82.docx

Version: 1.0.23049

Page 13 of 14

Upgrade: Detailed Planning Data for ERP

6  Test Files

Overview

Attached to this documentation,  you will find test files for the interface EIS-EFD. The attachment is only

available, if the documentation is in PDF format.

The documentation Open PDF attachments describes how to call the attached test files.

The following test files are attached to the PDF document:

File

Type

Comment

HY72ADRCK_SCHEDULE.dat  Outbound

Sample  file  for  the  upload  of  planning  changes  in

processing

HYDRA standard format

EIS-EFD_82.docx

Version: 1.0.23049

Page 14 of 14


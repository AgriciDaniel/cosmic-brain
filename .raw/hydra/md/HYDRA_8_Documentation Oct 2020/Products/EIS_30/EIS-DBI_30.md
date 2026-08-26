Manual

Database-Based Interface
EIS-DBI 3.0

Version 1.1.19800

Last changed on: 06.08.2020

Database-Based Interface

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EIS-DBI_30.docx

Version: 1.1.22743

Page 2 of 25

Database-Based Interface

Contents

1

Interface based on database........................................................................ 4

2

Interface based on database - technical instructions ................................... 5

3  MLE Archiving ............................................................................................ 21

4  HYDRA configurations relevant to applications ......................................... 23

EIS-DBI_30.docx

Version: 1.1.22743

Page 3 of 25

Database-Based Interface

1

Interface based on database

Overview

Purpose

The  database-based  interface  allows  supplying  data  from  external  systems  to  HYDRA  and  returning

HYDRA data to external systems using a database interface. The component is implemented generically

and, therefore, does not depend on the transferred business data.

Implementation notes

You use the interface based on databases if



you  want  to  integrate  HYDRA  with  one  or  several  external  systems  (e.g.  ERP  or  warehouse

management systems).

Integration

The database-based interface is completely integrated in the MLE layer of MES-Weaver.

Functions

  Data  can  be  transferred  from  external  systems  into  the  structures  of  the  MLE  layer  of  MES

Weaver

  Monitoring options to check communication

  Possibility to retrieve data from the MLE layer of MES-Weaver in order to import it into external

systems

  Monitoring options to check communication

EIS-DBI_30.docx

Version: 1.1.22743

Page 4 of 25

2

Interface based on database - technical instructions

Database-Based Interface

Basic structure of the interface

The  database-based  interface  enables  external  applications  to  file  and  retrieve  data  for  the  data

exchange with HYDRA from interface tables of the MES Weaver MLE layer. This document describes the

database structure and the process of exchanging data.



The MLE layer includes four tables to process data transfer.

EIS-DBI_30.docx

Version: 1.1.22743

Page 5 of 25

Database-Based Interface

HYDRA manages (IDoc) data from the ERP system and IDocs to be uploaded/confirmed in the presented

interface  tables.  Data  is  filed  according  to  the  relevant  interface  structure.  When  it  comes  to  HYDRA

inbound processing, data from these tables is added to the HYDRA data model. With HYDRA outbound

processing, upload data is written into outbound tables where external systems can retrieve it.

Data supply external system --> HYDRA

The  external  application  enters  data  into  the  corresponding  tables  of  the  HYDRA  MLE  layer.  It  is

important that data (1-n data records) for the IDoc is first written in the table hysap_inbound_data by the

external  application.  Then  the  external  application  writes  a  control  record  (1  data  record)  including  the

relevant data in the table hysap_inbound_ctrl. The external application links the entries of both tables by a

distinct transaction number.

The transaction number must be distinct and structured as described below:

DBLINK<user-defined section>

We recommend using a date/time stamp of format "DBLINKYYYYMMDDHHMMSSsss" for the

user-defined section. But different structures are also allowed, as long as the number is distinct

within the tables "hysap_inbound_ctrl" and "hysap_inbound_data".

EIS-DBI_30.docx

Version: 1.1.22743

Page 6 of 25

Database-Based Interface

The HYDRA MLE Dispatcher organizes inbound processing in HYDRA. This dispatcher monitors inbound

transactions. When  new  messages  arrive,  it  also  specifies  and  starts  the  respective  processing  routine

(program)  based  on  the  message  type  (from  the  MLE  distribution  model)  to  transfer  data  to  HYDRA.

Inbound  transactions  are  processed  according  to  the  sequence  specified  by  the  external  application.

Consequently, a transaction can only be processed, once the previous transaction has been completed.

Log and error files are created for data transferred by HYDRA.

The tasks of the individual steps in  the  HYDRA  inbound  processing  are divided as follows between the

external system and HYDRA:

Step

Responsible system

Write data segments (table hysap_inbound_data)

External system

Write the control record (table hysap_inbound_ctrl)  External system

Processing of data

HYDRA (MLE dispatcher + processing programs)

EIS-DBI_30.docx

Version: 1.1.22743

Page 7 of 25

Database-Based Interface

Data retrieval HYDRA  external system

HYDRA's upload programs provide data to be uploaded in the relevant interface format into the outbound

table  "hysap_out_data".  From  there  the  external  application  can  export  the  table  to  the  other  system.

After  data  has  been  exported,  the  external  application  updates  specific  fields  in  the  outbound  table

hysap_out_data  (see  details  in  the  table  description  of  table  hysap_out_data).  The  external  application

then  generates  a  control  record  in  the  table  hysap_out_ctrl  (see  details  in  the  table  description  of  table

hysap_out_ctrl) and links the two tables with a distinct transaction number.

The transaction number must be distinct and structured as described below:

DBLINK<user-defined section>

We recommend using a date/time stamp of format "DBLINKYYYYMMDDHHMMSSsss" for the

user-defined section. But different structures are also allowed, as long as the number is distinct

within the tables "hysap_out_ctrl" and "hysap_out_data".

The  uploaded  records  are  prepared  by  HYDRA's  upload  programs,  converted  into  the  IDoc  format  and

stored  in  the  table  "hysap_out_data".  Records  that  have  not  yet  been  uploaded  have  the  status  "000"

(hysap_out_data.ds_status).

EIS-DBI_30.docx

Version: 1.1.22743

Page 8 of 25

Database-Based Interface

During  the  transfer  the  external  application  must  change  the  status  (hysap_out_data.DS_STATUS)  to

"100“. Once transferred successfully, the external application must change the status to "099" in the table

"hysap_out_data".  An  entry  is  to  be  generated  in  the  table  "hysap_out_ctrl"  and  both  tables  must  be

linked with a distinct transaction number.

Processing of multi-level, hierarchical outbound structures represents an exception. The HYDRA upload

programs  provide  these  structures  in  the  appropriate  format  required  by  the  respective  interface

specification.  The  external  application  connects  the  header  data  record  and  the  detailed  records  (sub-

segments)  via  the  fields  VERWEIS  and  KOPF_VERWEIS  of  the  table  hysap_out_data.  In  this  context,

the KOPF_VERWEIS of detailed records includes the header record's reference.

Example:

The following hierarchical structure is defined in the specification of the interface:

HYDRA's upload programs provide data in the following format in the table "hysap_out_data".

Z2CNRATT_C000X000

Z2CNRATT_C001X000

Z2CNRATT_N000X000

Z2WEI000X000

Z2WEI000X000

Table HYSAP_OUT_DATA
Status  Segment name
000
000
001
001
001
001
001
001
001
001
001
001

Z2WEI000X000

Z2CNRATT_C000X000

Z2CNRATT_C001X000

Z2CNRATT_N000X000

Z2CNRATT_C000X000

Z2CNRATT_C001X000

Z2CNRATT_N000X000

SDATA
User data of upload
User data of upload
User data of upload
User data of upload
User data of upload
User data of upload
User data of upload
User data of upload
User data of upload
User data of upload
User data of upload
User data of upload

VERWEIS

KOPF_VERWEIS

52143
52144
52145
52146
52147
52148
52149
52150
52151
52152
52153
52154

52143
52143
52143

52147
52147
52147

52151
52151
52151

EIS-DBI_30.docx

Version: 1.1.22743

Page 9 of 25

Database-Based Interface

In  order  to  export  data,  external  applications  must  select  header  records  at  first  and  set  their  status  to

"100".  Now  the  sub-segments  (detailed  records)  can  be  selected  using  the  "KOPF_VERWEIS"  column.

Those lines matching the value of the "VERWEIS" column of the header record (in our example: "52143")

will also be selected.

The tasks of the individual steps in the HYDRA outbound processing are divided as follows between the

external system and HYDRA:

Step

Responsible system

Write  data  segments  (table  hysap_out_data  with

HYDRA upload programs

hysap_out_data.status = ‚000‘)

Set  data  records  to  status  „IN  PROCESS“  (table

External system

hysap_out_data  with  hysap_out_data.status  =

‚100‘)

Update of specific fields in the data records (table

External system

hysap_out_data)

Write the control record (table hysap_out_ctrl)

External system

Link  of  data  records  and  control  record  via

External system

transaction number

EIS-DBI_30.docx

Version: 1.1.22743

Page 10 of 25

Database-Based Interface

HYDRA inbound processing – table hysap_inbound_ctrl

The  table  "hysap_inbound_ctrl"  includes  the  control  records  of  the  data  records  transferred  to  HYDRA.

The table contains fields of the IDoc control record  and additional control fields  for HYDRA processing.

The structure of the table and the meaning of single fields are described in the sections that follow.

Field name

Data type

Description

Purpose

Manda-

tory field

ta_id

CHAR(30)

Transaction ID

Transaction number

Unique key (see above
note)

ta_type

CHAR(5)

Description of the type of
structure

fixed “IDOC”

ta_status

ta_logsys

ta_lines

CHAR(3)

Processing status

Fixed "000"

CHAR(10)

Logical system

Not used / assigned

INTEGER

Number of data records
included in the transaction

Number of data records of
the IDoc

ta_ldone

INTEGER

Number of data records
processed in the transaction

Fixed "0"

ta_lunknown

INTEGER

ta_lerror

INTEGER

Number of unknown data
records included in the
transaction

Number of faulty data
records included in the
transaction

Fixed "0"

Fixed "0"

ta_savdate

DATE

Date of receipt in HYDRA

ta_savtime

INTEGER

Time of receipt in HYDRA

Current date in format
"mm/dd/yyyy“

Current time in "seconds
after midnight"

ta_workdate

DATE

Date of processing

Not used / assigned

ta_worktime

INTEGER

Processing time

Not used / assigned

sap_tabnam

CHAR(10)

Name of table structure

sap_mandt

CHAR(3)

Client

sap_docnum

CHAR(16)

IDoc number

sap_docrel

CHAR(4)

SAP release for IDoc

From IDoc control record
or fixed "EDI_DC40"

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

X

X

X

X

X

X

X

X

X

X

EIS-DBI_30.docx

Version: 1.1.22743

Page 11 of 25

Field name

Data type

Description

Purpose

Database-Based Interface

Manda-

tory field

sap_status

CHAR(2)

Status of IDoc

From IDoc control record/
not relevant for processing
in HYDRA

sap_direct

CHAR(1)

sap_outmod

CHAR(1)

Direction (point of view: R/3)  From IDoc control record/
not relevant for processing
in HYDRA

Output mode of IDocs in R/3  From IDoc control record/
not relevant for processing
in HYDRA

sap_exprss

CHAR(1)

Overriding in inbound
processing

sap_test

CHAR(1)

Test identifier

sap_idoctyp

CHAR(30)

Name of basic type

sap_cimtyp

CHAR(30)

Extension (defined by
customer) (sub-segment,
e.g. for customizations -->
future-proofed)

sap_mestyp

CHAR(30)

Message type

sap_mescod

CHAR(3)

Message code

sap_mesfct

CHAR(3)

Message function

sap_std

CHAR(1)

EDI standard, identifier

sap_stdvrs

CHAR(6)

EDI standard, version and
release

sap_stdmes

CHAR(6)

EDI message type

sap_sndpor

CHAR(10)

Sender port (SAP system,
external subsystem)

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

According to specifications
of the respective user data
interface

From IDoc control record/
not relevant for processing
in HYDRA

According to specifications
of the respective user data
interface

From IDoc control record/
not relevant for processing
in HYDRA

According to specifications
of the respective user data
interface

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

X

X

X

EIS-DBI_30.docx

Version: 1.1.22743

Page 12 of 25

Field name

Data type

Description

Purpose

Database-Based Interface

Manda-

tory field

sap_sndprt

CHAR(2)

Partner type

sap_sndpfc

CHAR(2)

Partner function of sender

sap_sndprn

CHAR(10)

Partner number of sender
(logical system)

sap_sndsad

CHAR(21)

Sender address (SADR)

sap_sndlad

CHAR(70)

Logical address of sender

sap_rcvpor

CHAR(10)

Receiver port

sap_rcvprt

CHAR(2)

Partner type

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

sap_rcvpfc

CHAR(2)

sap_rcvprn

CHAR(10)

sap_rcvsad

CHAR(21)

sap_rcvlad

CHAR(70)

Partner function of recipient   From IDoc control record/
not relevant for processing
in HYDRA

Partner number of receiver
(log. system)

From IDoc control record/
not relevant for processing
in HYDRA

Recipient address (SADR)   From IDoc control record/
not relevant for processing
in HYDRA

Logical address of recipient   From IDoc control record/
not relevant for processing
in HYDRA

sap_credat

DATE

Created on (in ERP)

sap_cretim

INTEGER

Created at (in ERP)

sap_refint

CHAR(14)

Transmission file (EDI
Interchange)

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

EIS-DBI_30.docx

Version: 1.1.22743

Page 13 of 25

Field name

Data type

Description

Purpose

Database-Based Interface

Manda-

tory field

sap_refgrp

CHAR(14)

Message group (EDI
Message Group)

sap_refmes

CHAR(14)

Message (EDI Message)

sap_arckey

CHAR(70)

Key for external message
archive

sap_serial

CHAR(20)

Serialization

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

param1

param2

bearb

CHAR(40)

Additional parameters

Not used

CHAR(40)

Additional parameters

Not used

CHAR(10)

Modified by

bearb_date

DATE

Modified on

bearb_time

INTEGER

Modified at

Not used

Not used

Not used

verweis

Serial not null  Consecutive number

Assigned automatically by
DB

HYDRA inbound processing – table hysap_inbound_data

The data records of the IDoc (segments) are stored in the table "hysap_inbound_data".  The transaction

number represents the key for the tables "hysap_inbound_ctrl" and "hysap_inbound_data".

Field name

Data type

Description

Purpose

ta_id

CHAR(30)

Transaction ID

Unique key

Unique  key  (see  above

note)

ds_status

CHAR(3)

Segment status

Fixed "000"

ds_savdate

DATE

Date of receipt in HYERP

Current  system  date

in

format "mm/dd/yyyy“

Manda-

tory field

X

X

X

ds_savtime

INTEGER

Time of receipt in HYERP

Current  system

time

in

X

seconds

ds_workdate

DATE

Date of the last editing

Not used / assigned

ds_worktime

INTEGER

Time of the last editing

Not used / assigned

EIS-DBI_30.docx

Version: 1.1.22743

Page 14 of 25

Field name

Data type

Description

Purpose

Database-Based Interface

Manda-

tory field

sap_segnam

CHAR(30)

Segment

According to specifications

X

sap_mandt

CHAR(3)

Client

of the respective user data

interface

From IDoc data record/ not

relevant  for  processing  in

HYDRA

sap_docnum

CHAR(16)

IDoc number

Reserved: fixed

'0000000000000000'

sap_segnum

CHAR(6)

Segment number

Reserved: fixed '000000'

sap_psgnum

CHAR(6)

Number  of

the  parent

Reserved; fixed: '000000'

segment (if available)

sap_hlevel

CHAR(2)

Hierarchy level

Reserved; fixed: '00'

sap_sdata

CHAR(2000)

IDoc data

According  to  specifications

X

X

X

X

X

of the respective user data

interface

CHAR(40)

Additional parameters

Not used

CHAR(40)

Additional parameters

Not used

param1

param2

bearb

CHAR(10)

Modified by

bearb_date

DATE

Modified on

bearb_time

INTEGER

Modified at

Not used

Not used

Not used

verweis

Serial not null  Consecutive number

Assigned  automatically  by

DB

HYDRA outbound processing – table hysap_out_ctrl

The  table  is  only  populated  once  data  has  been  transferred  successfully.  The  table  is  structured  as

follows.

Field name

Data type

Description

Example / comment

Manda-

ta_id

CHAR(30)

Transaction ID

Distinct
transaction
number  (please  see  the
above-mentioned note)

ta_type

CHAR(5)

Description  of  the  structure
type

fixed “IDOC”

tory field

X

X

EIS-DBI_30.docx

Version: 1.1.22743

Page 15 of 25

Database-Based Interface

Field name

Data type

Description

Example / comment

Manda-

ta_status

ta_lines

CHAR(3)

Processing status

fixed "099" (processed)

INTEGER

Number  of  segments  of  the
data  record  included  in  the
IDoc

Number of data records

tory field

X

X

ta_ldone

INTEGER

Number
segments of the IDoc

of

processed

Number of data records

X

sav_date

DATE

Date of receipt from HYDRA  Current  system  date

in

X

format "mm/dd/yyyy“

sav_time

INTEGER

Time of receipt from HYDRA  Current  system

time
"seconds after midnight"

in

X

work_dat

DATE

Date of the transfer

work_time

TIME

Time of the transfer

Current  system  date
format "mm/dd/yyyy“

in

X

time
Current  system
"seconds after midnight"

in

X

sap_tabnam

CHAR(10)

Name of table structure

Fixed "EDI_DC40"

X

sap_mandt

CHAR(3)

Client

sap_docnum

CHAR(16)

IDoc number

sap_docrel

CHAR(4)

SAP release for IDoc

sap_status

CHAR(2)

Status of IDoc

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

sap_direct

CHAR(1)

sap_outmod

CHAR(1)

Direction (point of view: R/3)  From IDoc control record/
not relevant for processing
in HYDRA

Output mode of IDocs in R/3  From IDoc control record/
not relevant for processing
in HYDRA

sap_exprss

CHAR(1)

Overriding in inbound
processing

sap_test

CHAR(1)

Test identifier

sap_idoctyp

CHAR(30)

Name of basic type

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

According to specifications
of the respective user data
interface

X

EIS-DBI_30.docx

Version: 1.1.22743

Page 16 of 25

Database-Based Interface

Field name

Data type

Description

Example / comment

Manda-

tory field

sap_cimtyp

CHAR(30)

Extension (defined by
customer) (sub-segment,
e.g. for customizations -->
future-proofed)

From IDoc control record/
not relevant for processing
in HYDRA

sap_mestyp

CHAR(30)

Message type

sap_mescod

CHAR(3)

Message code

sap_mesfct

CHAR(3)

Message function

sap_std

CHAR(1)

EDI standard, identifier

sap_stdvrs

CHAR(6)

EDI standard, version and
release

sap_stdmes

CHAR(6)

EDI message type

sap_sndpor

CHAR(10)

Sender port (SAP System,
external subsystem)

sap_sndprt

CHAR(2)

Partner type

sap_sndpfc

CHAR(2)

Partner function of sender

sap_sndprn

CHAR(10)

Partner number of sender
(log. system)

sap_sndsad

CHAR(21)

Sender address (SADR)

sap_sndlad

CHAR(70)

Logical address of sender

sap_rcvpor

CHAR(10)

Receiver port

According to specifications
of the respective user data
interface

X

From IDoc control record/
not relevant for processing
in HYDRA

According to specifications
of the respective user data
interface

X

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

EIS-DBI_30.docx

Version: 1.1.22743

Page 17 of 25

Field name

Data type

Description

Example / comment

Manda-

Database-Based Interface

sap_rcvprt

CHAR(2)

Partner type

tory field

From IDoc control record/
not relevant for processing
in HYDRA

sap_rcvpfc

CHAR(2)

sap_rcvprn

CHAR(10)

sap_rcvsad

CHAR(21)

sap_rcvlad

CHAR(70)

Partner function of recipient   From IDoc control record/
not relevant for processing
in HYDRA

Partner number of receiver
(log. system)

From IDoc control record/
not relevant for processing
in HYDRA

Recipient address (SADR)   From IDoc control record/
not relevant for processing
in HYDRA

Logical address of recipient   From IDoc control record/
not relevant for processing
in HYDRA

sap_credat

DATE

Created on (in ERP)

sap_cretim

INTEGER

Created at (in ERP)

sap_refint

CHAR(14)

Transmission file (EDI
Interchange)

sap_refgrp

CHAR(14)

Message group (EDI
Message Group)

sap_refmes

CHAR(14)

Message (EDI Message)

sap_arckey

CHAR(70)

Key for external message
archive

sap_serial

CHAR(20)

Serialization

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

From IDoc control record/
not relevant for processing
in HYDRA

param1

param2

bearb

CHAR(30)

Additional parameters

Not used

CHAR(30)

Additional parameters

Not used

CHAR(10)

Modified by

bearb_date

DATE

Modified on

bearb_time

INTEGER

Modified at

Not used

Not used

Not used

EIS-DBI_30.docx

Version: 1.1.22743

Page 18 of 25

Database-Based Interface

Field name

Data type

Description

Example / comment

Manda-

tory field

verweis

Serial not null  Consecutive number

Assigned automatically by
DB

HYDRA outbound processing – table hysap_out_data

The table hysap_out_data is structured as follows.

Field name

Type

Description

Example / comment

Manda-

tory field

ta_id

CHAR(30)

Transaction ID

ds_status

CHAR(3)

Segment status

ds_savdate

DATE

Date of saving data

ds_savtime

INTEGER

Time of saving data

ds_workdate

DATE

Date of the transfer

ds_worktime

INTEGER

Time of the transfer

ds_source_sys

Char(10)

ERP target system

sap_segnam

CHAR(30)

Segment

sap_mandt

CHAR(3)

Client

sap_docnum

CHAR(16)

IDoc number

sap_segnum

CHAR(6)

Segment number

sap_psgnum

CHAR(6)

Number  of

the  parent

segment (if available)

sap_hlevel

CHAR(2)

Hierarchy level

Distinct transaction
number (please see the
above-mentioned note)

X

Before the transfer "000"

X

During the transfer "100"

After a successful transfer,
the status is changed to
"099"

X

X

X

Assigned by HYDRA.

Assigned by HYDRA.

Current system date in
format "mm/dd/yyyy“

Current system time in
seconds

Assigned by HYDRA.

According to specifications
of the respective user data
interface / assigned by
HYDRA

From IDoc data record/ not
relevant for processing

From IDoc data record/ not
relevant for processing

From IDoc data record/ not
relevant for processing

From IDoc data record/ not
relevant for processing

From IDoc data record/ not
relevant for processing

EIS-DBI_30.docx

Version: 1.1.22743

Page 19 of 25

Field name

Type

Description

Example / comment

Manda-

Database-Based Interface

sap_sdata

CHAR(1000)

IDoc data

param1

param2

bearb

CHAR(40)

Additional parameters

CHAR(40)

Additional parameters

CHAR(10)

Modified by

bearb_date

DATE

Modified on

bearb_time

INTEGER

Modified at

verweis

Serial not null  Consecutive number

kopf_verweis

INTEGER

Header reference

tory field

According to specifications
of the respective user data
interface / assigned by
HYDRA

X

Not used

Not used

Not used

Not used

Not used

Assigned automatically by
DB

Refers to the
corresponding master
segment in hierarchical
structures

(X)

Archiving

Archiving of MLE inbound and outbound tables is based on MLE archiving.

Entries for inbound and outbound processing must be added to the distribution model in order

to ensure archiving.

EIS-DBI_30.docx

Version: 1.1.22743

Page 20 of 25

Database-Based Interface

3  MLE Archiving

Overview

MLE archiving is divided into two essential steps:



In the first step data is transferred from online tables to archive tables. The affected time range

can be configured by a program parameter.



In  the  second  step  data  is  deleted  from  archive  tables. The  affected  time  range  can  directly  be

specified via the application.

Moving data to archive tables

Moving data from online tables to archive tables is controlled via the program parameter of the archiving

program hysaparc.exe/out. If no parameter is specified as supplied with the standard system, all data will

be moved from MLE inbound and outbound transactions to archive tables. But the following must apply:

The editing data is less than or equal to the current date minus the program parameter set for archiving.

Proceed as described below to change the default setting (2 days):



If Windows is used:

MLE  tables  are  archived  by  starting  the  script  hyarc.scr  in  the  HYDRA  directory  (HYDRADIR).

This script controls various archiving processes. By default, the script includes the following entry:

hysaparc.exe /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60

Add the below-mentioned program parameter including the required value to this entry. Using this

example, data is transferred to archive tables after 14 days:

hysaparc.exe /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60 /ARC_DAYS=14

EIS-DBI_30.docx

Version: 1.1.22743

Page 21 of 25

Database-Based Interface



If Linux is used:

MLE  tables  are  archived  by  starting  the  script  hyarc.scr  in  the  HYDRA  directory  (HYDRADIR).

This script controls various archiving processes. By default, the script includes the following entry:

hysaparc.out /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60

Add the below-mentioned program parameter including the required value to this entry. Using this

example, data is transferred to archive tables after 14 days:

hysaparc.out /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60 /ARC_DAYS=14

Deleting data from archive tables

The retention period defined for each message type in the MLE distribution model specifies when archive

tables are cleared.

The stated retention period starts with the point in time of editing a transaction.

If the period for moving data from online tables to  archive tables is increased to  14 days (see

example), the retention period should also be 14 days at least. Otherwise, data will immediately

be deleted from archive tables.

EIS-DBI_30.docx

Version: 1.1.22743

Page 22 of 25

Database-Based Interface

4  HYDRA configurations relevant to applications

Deactivation of outbound processing (general)

In most instances HYDRA outbound processing consists of two stages:

  Supply of uploads/confirmations from the data model into MLE outbound transactions

Specialized  programs  (e.g.  myerprck.exe/out)  normally  provide  the  data  using  cyclic  jobs.  This

results in open data segments in MLE outbound transactions.

The  corresponding  interface  descriptions  specify  the  configurations  required  for  carrying  out

these jobs.

These jobs must still be active even if the database-based interface is in use.

  Export of provided uploads/confirmations (to the file system / SAP)

The export program "hysapupl.exe/out" is mostly used in order to export the provided, open data

segments.  In  the  majority  of  cases  the  export  program  is  directly  started  via  the  HYDRA

Scheduler. But sometimes it can also be started differently.

Starting  of  the  export  program  must  be  disabled,  provided  that  data  is  transferred  via  the

database-based interface instead of exporting it to SAP or the file system.

The  documentation  dealing  with  the  relevant  interface  describes  how  the  export  program  is

started.

Disable processing for the EIS-ERP interface (Windows)

The export program hysapupl.exe/out for the EIS-ERP interface is not started via the Scheduler but via a

script. Proceed as follows if Windows is used as server operating system:

  Copy  the  supplied  script  myerprck.scr  from  the  HYDRA  directory  of  the  HYDRA  server  to  the

customer namespace u_myerprck.scr.

  Open the script u_myerprck.scr and change starting of "hysapupl.exe" as follows:

Previously:

# Starting the upload to generate the upload file HY72ADRCK_TIMETICKET.ASV for
standard uploads/confirmations.

if [ `hyliz.exe -r HYD-ESK` -gt 0 ]

then

EIS-DBI_30.docx

Version: 1.1.22743

Page 23 of 25

Database-Based Interface

hysapupl.exe /UPLSEGNAM=HY72ADRCK_TIMETICKET

fi

Afterwards:

## Starting the upload to generate the upload file HY72ADRCK_TIMETICKET.ASV for
standard uploads/confirmations.

#if [ `hyliz.exe -r HYD-PPS` -gt 0 ]

#then

#

hysapupl.exe /UPLSEGNAM=HY72ADRCK_TIMETICKET

#fi

  Use  the  customized  script  in  order  to  start  the  interface  in  the  HYDRA  Scheduler.  For  this

purpose, identify the Scheduler entry meeting the following conditions:

Parameter name

Product key

License key

Value

HYD-PPS

HYD-PPS

Command (prior to the modification)

sh.exe ./myerprck.scr /MESTYP=HY72ADRCK_TT

Command (after the modification)

sh.exe ./u_myerprck.scr

/MESTYP=HY72ADRCK_TT

Comment

Standard ADE confirmations/uploads for PPS (only

if HYD-PPS)

Disable processing for the EIS-ERP interface (Linux)

The export program hysapupl.exe/out for the EIS-ERP interface is not started via the Scheduler but via a

script. Proceed as follows if Linux is used as server operating system:

  Copy  the  supplied  script  myerprck.scr  from  the  HYDRA  directory  of  the  HYDRA  server  to  the

customer namespace u_myerprck.scr.

  Open the script u_myerprck.scr and change starting of "hysapupl.out" as follows:

Previously:

# Starting the upload to generate the upload file HY72ADRCK_TIMETICKET.ASV for
standard uploads/confirmations.

if [ `hyliz.out -r HYD-PPS` -gt 0 ]

EIS-DBI_30.docx

Version: 1.1.22743

Page 24 of 25

Database-Based Interface

then

hysapupl.out /UPLSEGNAM=HY72ADRCK_TIMETICKET

fi

Afterwards:

## Starting the upload to generate the upload file HY72ADRCK_TIMETICKET.ASV for
standard uploads/confirmations.

#if [ `hyliz.out -r HYD-PPS` -gt 0 ]

#then

#

hysapupl.out /UPLSEGNAM=HY72ADRCK_TIMETICKET

#fi

  Use  the  customized  script  in  order  to  start  the  interface  in  the  HYDRA  Scheduler.  For  this

purpose, identify the Scheduler entry meeting the following conditions:

Parameter name

Product key

License key

Value

HYD-PPS

HYD-PPS

Command (prior to the modification)

./myerprck.scr /MESTYP=HY72ADRCK_TT

Command (after the modification)

./u_myerprck.scr

/MESTYP=HY72ADRCK_TT

Comment

Standard ADE confirmations/uploads for PPS (only

if HYD-PPS)

EIS-DBI_30.docx

Version: 1.1.22743

Page 25 of 25


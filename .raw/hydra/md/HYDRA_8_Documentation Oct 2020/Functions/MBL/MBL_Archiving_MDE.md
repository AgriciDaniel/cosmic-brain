MDE-specific Configuration

1  MDE-specific Configuration

Overview

The  data  are  stored  as  standard  for  35  days  in  the  MDE  module  before  they  are  moved  to  long-term

storage.

Various  MDE  evaluations  allow  data  to  be  accessed  which  are  older  than  35  days.  For  this,  the  BDE

postings  are  stored  in  a  special  medium-term  or  archive  area.  Access  to  these  data  is  essentially

automatic as soon as the selection period exceeds the short-term data range. In a few applications there

is the option "Consider long-term data" in the selection area via which these data can be accessed.

Data included in the MDE archiving are:

  MDE log records (documents)

  MDE events

  Additional information (e.g. comments)

  LOGGING entries for the machine

Configuration

The  retention  period  of  the  data  in  the  individual  data  areas  can  be  configured  via  the  HYDRA  data

management.

The data management does not define the retention period for data of the “cycle progression”

application.  The  relevant  configuration  is  described  in  the  document  dealing  with  the  cycle

progression application.

During the transfer of the data to the archive tables, those data are transferred whose "retention period"

(in  days/months/years;  see  values  in  parentheses  in  the  following  table)  has  been  exceeded.  If  the

relevant archiving license for the MDE is not available, the data are deleted after the set retention period.

Product  Object

Object designation

Transfer

MDE

MDEPRO

Log records / documents

 Online data
 medium-term archive

Interval  in  as-
delivered
condition
35 days 1)

MDE

A_MDEPRO

Long-term  archiving  of  log  Medium-term archive

3 years 1)

MBL_Archiving_MDE.docx

Version: 1.0.18468

Page 1 of 2

MDE-specific Configuration

Product  Object

Object designation

Transfer

MDE

EREIGMDE

MDE

A_ EREIGMDE

MDE

LOG

MDE

A_LOG

MDE

RES_STATUS

records / documents
Events

archiving

Long-term
events
HYDRA logging data

archiving

Long-term
HYDRA logging data
Parallel  MDE
status

resource

of

of

 Long-term archive
Online data
 medium-term archive
Medium-term archive
 Long-term archive
Online data
 medium-term archive
Medium-term archive
 Long-term archive
Online data
 medium-term archive
Medium-term archive
 Long-term archive

MDE

A_ RES_STATUS  Long-term

archiving

of
resource

parallel  MDE
status

Interval  in  as-
delivered
condition

35 days 2)

3 years 2)

35 days

3 years

70 days

3 years

Please note:

1)  Please note that the postings relating to workplaces/machines only allow for data of the online data

area to be selected and edited.

2)  Please  note  that  the  event maintenance  only  allows  for  data  of  the  online  data  area  to  be  selected

and edited.

MBL_Archiving_MDE.docx

Version: 1.0.18468

Page 2 of 2


Archiving Concept

1  Archiving Concept

Overview

Figure 1 Data structure of archiving concept

As described in the above diagram the HYDRA data structure is divided into the following areas1:

Online data

Online  data  contains  all  data  that  directly  derives  from  HYDRA  data  collection  and  that  is  saved  in  the

HYDRA database. This also includes recorded single events,  log records and  inventory  data. This data

may be edited and is available for standard evaluations.

After  a  configurable  period  of  time,  single  events  und  log  records  are  transferred  to  the  “medium-term

data” area.

1    The retention periods indicated in the diagram are to be regarded as exemplary values as they may be defined

differently in each module.

MBL_Archiving.docx

Version: 1.2.23176

Page 1 of 5

Archiving Concept

Medium-term data (archive tables)

Medium-term data contains single events, log records and stock data deriving from online data that has

been moved to a separate database area after a definable period of time (may be defined separately for

each  module/product).  Quality  and  granularity  of  data  corresponds  to  that  of  the  original  data  (no

compression).

In  general,  this  data  is  available  for  standard  evaluations  but  can  no  longer  be  edited.  The  console

checkbox  "consider  long-term  data"  shows  whether  or  not  long-term  data  is  available.  If  this  option  is

checked, "medium-term data" and "reload data" are included.

After a configurable period of time, this data is deleted or archived.

Long-term data

Long-term data contains single events, log records and stock data that is moved from medium-term data

to long-term data after a period of time that may be defined for each module/product. (No compression).

This data is not available within the HYDRA database and may not be evaluated using HYDRA standard

reports.

Data can be filed/exported in another file system (moving to archive data).

Archive data

The  user  is  responsible  for  exporting  long-term  data  to  another  separate  area  or  to  corresponding  data

carriers. HYDRA can access this data only after it has been re-imported to the long-term data area. You

also require a reload to reload tables to make sure that the data is again available for long-term reports.

Reload data (reload tables)

To be able to analyze archived data from the long-term data area, the  exported  archive data  has to be

“reloaded”  into  the  reload  data  of  the  database  using  the  “Reload  Manager”.  Only  in  this  case,  data  is

again available for the evaluations/reports that have been designed for this purpose (including long-term

data  function).  After  this  reload,  data  is  stored  in  a  special  table  area,  which  is  separated  from  the

production data and long-term data. However, evaluations/reports are provided with this area as basis for

long-term data.

This reload data may then be deleted, once the required evaluations have been performed e.g. for special

researches.

Supported data classes

Events

Events mean actually recorded single events.

MBL_Archiving.docx

Version: 1.2.23176

Page 2 of 5

Archiving Concept

Log records

This data results from event postings and respectively describes a period of time. In the booking process,

the single events are usually combined to a so-called status record.

Inventory data

Inventory data has master data character but is only of temporary validity in contrast to master data.

Data archiving

Data may be archived with respect to time or objects. To do so, archiving criteria and individual retention

periods  of  data  are  configured  with  respect  to  the  specific  data  of  the  single  modules/products  in  the

individual areas.

Archiving based on time

Once the defined retention period has expired, the  relevant data is moved to archive tables and thus to

the area of medium-term data.

After another definable retention period has expired in the medium-term data area (starts as soon as data

is transferred to medium-term data), data  is moved to the  long-term data area.  The data records  of the

single  tables  are  saved  in  individual  files  that  include  all  data  records  of  a  table  for  a  defined  period  of

time.

MBL_Archiving.docx

Version: 1.2.23176

Page 3 of 5

Archiving Concept

Example for archiving based on time (log data)

OP 1 log data

OP 2 log data

OP 3 log data

OP 4 log data

Archive area

OP 5 log data

Point

in

time  of

today

Time

[t]

Archiving based on objects

An archiving criterion that is to be defined (relating to the object, e.g. “inspection request completed”) has

to be fulfilled and the retention period has to be expired to be able to archive data. Data is only archived

in archive tables of the medium-term data area, once these two conditions have been met.

When the definable retention period of the single data records of an object has expired, data records are

selected from archive tables and filed in object-specific files of the single tables. These files contain data

records  of  a  table  of  a  specific  object,  e.g.  of  an  order,  thus  a  file  is  generated  and  archived  for  each

object of the single tables.

When online data is archived in the medium-term data area (archive tables), the single data records are

complemented by a field indicating the archiving time (time stamp) and a consecutive number to provide

for more transparency and control. The consecutive number is very important as at the time of archiving,

the same table can be archived according to several archiving criteria. In this case the file exports, which

have already been generated, would be overwritten by the next export.

MBL_Archiving.docx

Version: 1.2.23176

Page 4 of 5

Archiving Concept

Within the archiving function default values for the retention period of data in the single areas, which may

however  be  adjusted  according  to  the  customer’s  requirements,  are  defined  for  the  individual  modules

(e.g.  HYDRA-MDE,  HYDRA-WRM,  HYDRA-CAQ).  For  further  details  on  this,  in  particular  on  default

settings, please refer to the sections dealing with the different modules. Retention periods always refer to

the date stamp of the data to be archived, i.e. with a retention period for the medium-term archive: 1 year

and the long-term archive 3 years – data is archived after 1 year and two years later it is transferred to the

long-term archive (those 3 years refer to the original time stamp: 1 year + 2 years = 3 years).

Example for archiving based on objects (orders)

OP 1 basic data (archive)

OP 2 basic data

OP 3 basic data

OP 4 basic data (archive)

OP 5 basic data

Point

in

time  of

today

retention

Time

[t]

Note when using document management

When an object is archived, also the relevant document assignments are moved to the archive.

The files themselves remain at their original storage location and are not archived.

MBL_Archiving.docx

Version: 1.2.23176

Page 5 of 5


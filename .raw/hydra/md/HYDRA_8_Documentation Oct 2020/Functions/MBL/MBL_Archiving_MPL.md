Archiving in MPL/TRT

1  Archiving in MPL/TRT
Overview
In the MPL product group, data is usually kept online for 7 days before it is moved to the long-term data
area.
You can access data older than 7 days in a variety of MPL evaluations/reports. For this purpose, MPL
postings  are  provided  in  a  special  medium-term  or  archive  area.  This  data  is  largely  accessed
automatically if the selection period exceeds the short-term data area. In a few applications, the option to
"Consider long-term data" is provided in the selection area and can be used to access this data.
The MPL archiving integrates the following data:
| Object               |     | DB table online area  | DB table archive area  |     |
| -------------------- | --- | --------------------- | ---------------------- | --- |
| Batch inventory      |     | los_bestand           | a_los_bestand          |     |
| Batch attributes     |     | los_attribute         | a_los_attribute        |     |
| Batch assignments    |     | los_zuordnung         | a_los_zuordnung        |     |
| Batch events         |     | event_los             | a_event_los            |     |
| Material movements   |     | event_mlb             | a_event_mlb            |     |
| Batch logs           |     | mpl_los_prot          | mpl_a_los_prot         |     |
| Batch relations      |     | mpl_beziehungen       | a_mpl_beziehungen      |     |
| Document management  |     | hyd_document          | a_hyd_document         |     |
|                      |     | hyd_documenttext      | a_hyd_documenttext     |     |
| Change history       |     | hyd_logging           | a_hyd_logging          |     |
|                      |     | hyd_logging_data      | a_hyd_logging_data     |     |

Configuration
Using HYDRA Data Management, you can configure how long data is to be kept in the different data
areas.

| MBL_Archiving_MPL.docx  |     | Version: 1.2.23178  |     | Page 1 of 6  |
| ----------------------- | --- | ------------------- | --- | ------------ |

|     |     |     |     |     | Archiving in MPL/TRT  |     |
| --- | --- | --- | --- | --- | --------------------- | --- |

The transfer of data into archive tables includes the data with a "retention period" that has expired (in
number of days/months/years; see the values in parentheses in the table below). If MPL/TRT archiving is
not licensed, data will be deleted after the configured retention period.

| Object  |     | Object name  |     | Action  |     | Default  |
| ------- | --- | ------------ | --- | ------- | --- | -------- |
 t
interval
c
u
d
o
r
P
MPL  LOSDELETE  Archiving of all batches with batch  Deletion  0 day
|     |     | status "D" (deleted).  |     |     |     |     |
| --- | --- | ---------------------- | --- | --- | --- | --- |

Affected table:
los_bestand (v);(a)
MPL  MPLBAHNVERT  Archiving of all cutting plans whose  Deletion  0 day
|     |     | order number does no longer exist  |     |     |     |     |
| --- | --- | ---------------------------------- | --- | --- | --- | --- |
in the table auftrag_status.

Affected table:
auftrag_status (v)
mpl_bahnverteilung (a)
mpl_bahnlayout (a)
MPL  LOSAB  Archiving of all batches with batch  Archiving of online  7 days
|     |     | status "A" (processed), that are not  |     | data --> archive  |     |     |
| --- | --- | ------------------------------------- | --- | ----------------- | --- | --- |
|     |     | assigned to the material status "V"   |     | tables            |     |     |
|     |     | (packed) or that are not at all       |     |                   |     |     |
assigned to a material status
(material status = empty) and
where the interval has been
exceeded.

Affected table:
los_bestand (v);(a)
MPL  LOSPACKED  Archiving of all batches with batch  Archiving of online  7 days
|     |     | status "A" (processed), that are     |     | data --> archive  |     |     |
| --- | --- | ------------------------------------ | --- | ----------------- | --- | --- |
|     |     | assigned to the material status "V"  |     | tables            |     |     |
(packed), the associated merged
batch does no longer exist and
exceeding the interval.

Affected table:
los_bestand (v);(a)
MPL  A_LOSBESTAND  Archiving of all batches exceeding  Export of archive  2 years
|     |     | the interval.  |     | table  file system  |     |     |
| --- | --- | -------------- | --- | -------------------- | --- | --- |

Affected table:
a_los_bestand (v);(a)
MPL  LOSEXPIRED  Archiving of all batches with batch  Archiving of online  7 days
|     |     | status "V" (expired) and exceeding  |     | data --> archive  |     |     |
| --- | --- | ----------------------------------- | --- | ----------------- | --- | --- |
|     |     | the interval.                       |     | tables            |     |     |

Affected table:
los_bestand (v);(a)

| MBL_Archiving_MPL.docx  |     | Version: 1.2.23178  |     |     |     | Page 2 of 6  |
| ----------------------- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     |     | Archiving in MPL/TRT  |     |
| --- | --- | --- | --- | --- | --------------------- | --- |

| Object  |     | Object name  |     | Action  |     | Default  |
| ------- | --- | ------------ | --- | ------- | --- | -------- |

| c t |     |     |     |     |     | interval  |
| --- | --- | --- | --- | --- | --- | --------- |
u
d
o
r
P
MPL  A_LOSEXPIRED  Archiving of all batches exceeding  Export of archive  3 years
|     |     | the interval.  |     | table  file system  |     |     |
| --- | --- | -------------- | --- | -------------------- | --- | --- |

Affected table:
a_los_bestand (v);(a)
MPL  LOSLEER  Archiving of all batches with a  Archiving  of  online  7 days
status that is not "L" (running), with
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |
zero quantity and exceeding the
|     |     | interval.  |     | tables  |     |     |
| --- | --- | ---------- | --- | ------- | --- | --- |

Affected table:
los_bestand (v);(a)
MPL  LOSMATPUF  Archiving of all batches with a  Archiving  of  online  7 days
status that is not "L" (running), that
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |
are not assigned to a material
|     |     | buffer or the assigned material  |     | tables  |     |     |
| --- | --- | -------------------------------- | --- | ------- | --- | --- |
buffer does no longer exist and
exceeding the interval.

Affected table:
los_bestand (v);(a)
MPL  LOSWASTEBASKET  Archiving of all batches with a  Archiving  of  online  1 day
status that is not "L" (running), that
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |
are assigned to a material buffer
|     |     | identified as "recycle bin" and  |     | tables  |     |     |
| --- | --- | -------------------------------- | --- | ------- | --- | --- |
exceeding the interval.

Affected table:
los_bestand (v);(a)
MPL  LOSTRANSPORT  Archiving of all batches with batch  Archiving  of  online  0 day
status "T" (transport)
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |

tables
Affected table:
los_bestand (v);(a)
MPL  LOSZUORD  Archiving of all batch assignments if  Archiving  of  online  -
both batches belonging to the
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |
assignment do no longer exist in
|     |     | the table los_bestand.  |     | tables  |     |     |
| --- | --- | ----------------------- | --- | ------- | --- | --- |

Affected table:
los_bestand (v)
los_zuordnung (a)
MPL  A_LOSZUORD  Archiving of all batch assignments if  Export of archive  See above
|     |     | both batches belonging to the  |     | table  file system  |     |     |
| --- | --- | ------------------------------ | --- | -------------------- | --- | --- |
assignment do no longer exist in
the table a_los_bestand.

Affected table:
a_los_bestand (v)
a_los_zuordnung (a)

| MBL_Archiving_MPL.docx  |     | Version: 1.2.23178  |     |     |     | Page 3 of 6  |
| ----------------------- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     |     | Archiving in MPL/TRT  |     |
| --- | --- | --- | --- | --- | --------------------- | --- |

| Object  |     | Object name  |     | Action  |     | Default  |
| ------- | --- | ------------ | --- | ------- | --- | -------- |

| c t |     |     |     |     |     | interval  |
| --- | --- | --- | --- | --- | --- | --------- |
u
d
o
r
P
MPL  LOSPROTOKOLL  Archiving of all batch logs with  Archiving  of  online  -
batches no longer existing in the
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |
table los_bestand.
|     |     |     |     | tables  |     |     |
| --- | --- | --- | --- | ------- | --- | --- |
Affected table:
los_bestand (v)
mpl_los_prot (a)
MPL  LOSEVENTMLB  Archiving of all batch events  Archiving  of  online  -
"material movement" with batches
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |
no longer existing in the table
|     |     | los_bestand.  |     | tables  |     |     |
| --- | --- | ------------- | --- | ------- | --- | --- |

Affected table:
los_bestand (v)
event_mlb (a)
MPL  A_LOSEVENTMLB  Archiving of all batch events  Export of archive  2 years
|     |     | "material movement" exceeding the  |     | table  file system  |     |     |
| --- | --- | ---------------------------------- | --- | -------------------- | --- | --- |
interval.

Affected table:
a_event_mlb (v);(a)
MPL  LOSEVENTMLB2  Archiving of all batch events with a  Archiving  of  online  7 day
batch number of "null", "", or "@" in
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |
the table event_mlb and exceeding
|     |     | the interval.  |     | tables  |     |     |
| --- | --- | -------------- | --- | ------- | --- | --- |

Affected table:
event_mlb (v);(a)
MPL  LOSATTRIBUTE  Archiving of all batch attributes with  Archiving  of  online  0 day
batches no longer existing in the
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |
table los_bestand.
tables

Affected table:
los_bestand (v)
los_attribute (a)
MPL  A_LOSATTRIBUTE  Archiving of all batch attributes with  Export of archive  See above
|     |     | batches no longer existing in the  |     | table  file system  |     |     |
| --- | --- | ---------------------------------- | --- | -------------------- | --- | --- |
table a_los_bestand.

Affected table:
a_los_bestand (v)
a_los_attribute (a)
MPL  LOSEVENTLOS  Archiving of all batch events  Archiving  of  online  35 day
batches exceeding the interval.
|     |     |     |     | data  | -->  archive  |     |
| --- | --- | --- | --- | ----- | ------------- | --- |

|     |     | Affected table:  |     | tables  |     |     |
| --- | --- | ---------------- | --- | ------- | --- | --- |
event_los (v);(a)

| MBL_Archiving_MPL.docx  |     | Version: 1.2.23178  |     |     |     | Page 4 of 6  |
| ----------------------- | --- | ------------------- | --- | --- | --- | ------------ |

Archiving in MPL/TRT
Object Object name Action Default
c t interval
u
d
o
r
P
MPL LOSRELATIONS Archiving of all relationship data Archiving of online 35 day
exceeding the interval.
data --> archive
Affected table: tables
mpl_beziehung (v);(a)
MPL A_ LOSRELATIONS Archiving of all relationship data Export of archive 2 years
exceeding the interval. table  file system
Affected table:
a_mpl_beziehung (v);(a)
MPL DOCLINK Archiving of all hyd_documente Archiving of online 0 day
with batches no longer existing in data --> archive
the table los_bestand. tables
Affected table:
los_bestand (v)
hyd_document (a)
hyd_documenttext (a)
MPL A_DOCLINK Archiving of all hyd_documente Export of archive See above
with batches no longer existing in table  file system
the table a_los_bestand.
Affected table:
a_los_bestand (v)
a_hyd_document (a)
a_hyd_documenttext (a)
MPL CHANGELOG Archiving of all change logs Archiving of online 35 day
exceeding the interval.
data --> archive
Affected table: tables
hyd_logging (v);(a)
MPL A_CHANGELOG Archiving of all change logs Export of archive 3 years
exceeding the interval.
table  file system
Affected table:
a_hyd_logging (v);(a)
MPL DEMAND Archiving of material-related Archiving of online 14 day
requirements
data --> archive
Affected table: tables
demand_request (v);(a)
demand_acknowledge (v);(a)
MPL A_DEMAND Archiving of material-related Export of archive 2 years
requirements
table  file system
Affected table:
a_demand_request (v);(a)
a_demand_acknowledge (v);(a)
(v) = table used to compare entries.
MBL_Archiving_MPL.docx Version: 1.2.23178 Page 5 of 6

Archiving in MPL/TRT
(a) = table including the entries to be archived.
Configuration of material-related requirements (interface EIS-WMS)
The objects "DEMAND" and "A_DEMAND" are used with the interface EIS-WMS.
Material-related requirements are identified by the value "L" in field LEVEL in the interface.
For information on the interface EIS-WMS, follow the link: Interface to Warehouse Management Systems.
Object Object name Action Default
t interval
c
u
d
o
r
P
MPL DEMAND Archiving of material-related Archiving of online 14 day
requirements
data --> archive
Affected table: tables
demand_request (v);(a)
demand_acknowledge (v);(a)
MPL A_DEMAND Archiving of material-related Export of archive 2 years
requirements
table  file system
Affected table:
a_demand_request (v);(a)
a_demand_acknowledge (v);(a)
(v) = table used to compare entries.
(a) = table including the entries to be archived.
MBL_Archiving_MPL.docx Version: 1.2.23178 Page 6 of 6
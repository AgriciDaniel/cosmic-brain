Configurations Specific to PDV

1  Configurations Specific to PDV

Overview of mass data archiving

PDV  mass  data  is  archived  using  separate  programs  and  configurations.  The  entries  made  within  the

HYDRA data management are not relevant in this case.

The archiving function of HYDRA-PDV allows for mass data tables to be archived. With this process table

data is written in files that are saved in a predefined path.

Mass data tables, also referred to as TNT tables, include a time stamp in their name ID, which is referred

to during archiving.

The “tnt_table_repo“ table provides information on the archiving status of the single TNT tables, e.g.

where the data file is located and what’s the file’s name or whether the table has been re-imported and

thus a new export might be required.

Configuration

Mass data is archived by way of two components: export and import.

The  export  represents  a  cyclic  process,  which  is  started  by  the  HYDRA  Scheduler  and  unloads  “due”

tables from the database in data files on the hard disk.

The import (or reload) function constitutes a library that, if required, reloads data on request from the data

files back to the database tables where they can be accessed again.

In general, the export function transfers the files 1:1 from the database into the data files.

Program:

hp_mexp.exe / out

Installation:

The program is entered in the HYDRA Scheduler and started cyclically.

Console menu: File – System administration – Scheduler

The corresponding time, when the program is to be started can be defined in the “fix” tab.

Please note: The export program should not be started with little intervals in the Scheduler. As it

is an archiving program. Subject to the data volume, daily (every night) or weekly intervals are

sufficient.

MBL_Archiving_PDV.docx

Version: 1.1.1362

Page 1 of 4

Configurations Specific to PDV

Moreover, a parameter has to be defined indicating which conditions are required to consider data to be

"old enough" to be archived. In this case, the parameter refers to the number of tables that may be online.

If this number is exceeded the oldest TNT tables are archived by running an export. The parameter can

be found in the “pdv_setup” table and may be adjusted in the basic parameter settings of the console.

As  part  of  the  implementation  process,  it  has  to  be  checked  whether  the  archiving  path  exists  with  ID

“PDVARC“  in  the  “arc_path”  column  of  the  “pdv_setup”  table  (and  if  applicable,  whether  the

transport path has been defined as well with the “PDVTRANS” ID in the “trans_path“ column).

The corresponding directories which are referred to, can be found in the path configuration (“hy_path“

table).

A host must not be defined if a relative URL path is defined for archiving, PDVARC, (depending on the file

hp_mexp.scr).

Overview: archiving of transaction data

In  addition  to  dynamic  TNT  tables,  movement/transaction  data  from  “fixed  PDV  tables“  is  now  also

archived. In contrast to mass data, this data is archived plus the corresponding configuration of HYDRA

data management.

A valid license has to be available on the system to be able to use the archiving function for PDV data.

PLEASE NOTE:

Provided that PDV archiving is enabled and a valid license is not available, corresponding data

is  deleted  from  the  system,  once  the  specified  archiving  period  has  expired  (6  months  by

default).

Data structures

The following PDV data is taken into account for the archiving method described in this section:

  Validity periods of operations relevant to PDV

  Recorded PDV events

  PDV events due to violated limit values

  Modification of default values



ID tracing (indexing of tags)

MBL_Archiving_PDV.docx

Version: 1.1.1362

Page 2 of 4

By default, this data is archived on the basis of time. Archiving is performed irrespective of whether the

corresponding objects (inspection requirements, mass data, operations, etc.) have been archived or not.

As an alternative the same mechanisms can also be used to delete the data (instead of archiving).

Configurations Specific to PDV

The listed data is archived separately by default. The following data is concerned:

Data
Validity periods of operations relevant to PDV
PDV events (recorded events and events caused by  violated
limit values)
Change of default values
Indexing of tags

Source table(s)
pdv_ag_protokoll
pdv_event_prot

pdv_spc
tnt_tagid_repo

Standard configuration

Archiving is configured in two stages by default.



In the first step data is moved to the medium-term data area. Then data is directly available for

evaluations/reports using the medium-term data area.



In  the  second  stage  data  is  moved  to  the  long-term  data  area.  In  this  case,  data  is  no  longer

directly available for evaluations/reports. Data needs to be reloaded first to be  able to use  it for

evaluations/reports in HYDRA.

The default configurations for the first and second archiving level are described in the below table.

Product
PDV72

Object
PDV_ADEPRO

PDV72

A_PDV_ADEPRO

Description of the action
Validity  periods  of  operations  relevant  to
PDV are moved from the online dataset to
the medium-term dataset

Validity  periods  of  operations  relevant  to
PDV  are  moved  from  the  medium-term
dataset to the long-term dataset

PDV72

PDV_EVENT

PDV  events  are  shifted  from  the  online
dataset to the medium-term dataset

PDV72

A_PDV_EVENT

PDV events are moved from the medium-
term dataset to the long-term dataset

PDV72

TARGET_VALUE

Changed  default  values  are  moved  from
the  online  dataset  to  the  medium-term
dataset

Default interval
6 months

Reference field:
abmeld_dat
5 years

Reference field:
abmeld_dat
6 months

Reference field:
capture_ts
5 years

Reference field:
capture_ts
6 months

Reference field:
capture_ts

MBL_Archiving_PDV.docx

Version: 1.1.1362

Page 3 of 4

Configurations Specific to PDV

Product
PDV72

Object

Description of the action

A_TARGET_VALUE  Changed  default  values  are  moved  from
the medium-term dataset to the long-term
dataset

PDV72

TNT_TAGID

Tag  indexing  is  moved  from  the  online
dataset to the medium-term dataset

PDV72

A_TNT_TAGID

Tag  indexing  is  moved  from  the medium-
term dataset to the long-term dataset

Default interval
5 years

Reference field:
capture_ts
6 months

Reference field:
capture_ts_end
5 years

Reference field:
capture_ts_end

Management data of the previously described data will be kept 12 years in the  arc_verw_pdv table by

default.

MBL_Archiving_PDV.docx

Version: 1.1.1362

Page 4 of 4


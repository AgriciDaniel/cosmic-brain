CAQ-specific Configurations

CAQ-specific Configurations

1.1  Overview

1.1.1 Archiving of inspection requirements

1.1.1.1 Data structures

The  default  archiving  of  inspection  requirements  is  object-related,  i.e.  each  separate  inspection

requirement is evaluated in the archiving process. If the conditions specified via configuration parameters

are fulfilled, the requirement is archived. In this process, all detailed data included is also archived.

Optionally, you can use the above parameters to delete the data (instead of archiving).

By  default,  there  is  a  separate  configuration  for  each  individual  HYDRA-CAQ  data  type  (in-production

inspection,  goods  receipt  or  goods  issue  inspection,  initial  sample  inspection,  QMS  data).  You  can

therefore  archive  inspection  requirements  of  the  goods  receipt  area  in  other  intervals  than  data  of  the

production data.

By default, the details saved for inspection requirements are identical for each data type. This may be the

following data:

Data
Inspection requirements

Inspection orders
order
Inspection
Characteristic configurations
Inspection points

configurations

QMS: Dynamic modification history of inspection
points based on characteristics
Characteristics

Inspection frequencies
Inspection specifications depending on quantities
Documents
Tool assignments
Samples
Characteristic results
Assignment
Assignment of samples to inspection points
Characteristic attributes
Single values
Failure analysis entries

samples

of

to

numbers

Source table(s)
caq_pruefanf
caq_pan_zusatz
caq_paukop
caq_paukonf

caq_numpool
caq_ppktm_info
caq_dyhis_ppktmm

caq_merkmal
caq_merk_zusatz
caq_prueffreq
caq_mengabh_prf
caq_dokus
caq_werkzzuord
caq_paustich

caq_paunumm

caq_paumm_ausp
caq_paumwert
caq_fhlanal

MBL_Archiving_CAQ.docx

Version: 1.4.16740

Page 1 of 9

CAQ-specific Configurations

Data
Measures and corresponding parameters

Inspection matrix
Assignment of characteristics to inspection points

Source table(s)
caq_massn
caq_mass_param
caq_pruefmatrix

Events  and  logging  entries  for  inspection  requirements  are  archived  separately.  The  archiving

configuration of this data is described in the sections that follow.

Inspection requirements for the PMV data type (calibration/maintenance) are not archived by default.

The archiving configuration defines key fields. The key fields are used to filter the data when the

data is reloaded. For example, all inspection requirements of the period x are filtered for article

4711. The key fields are assigned as follows by default.

Key 1: rec_type, e.g. FEP

Key 2: area, e.g. F for production

Key 3: pruefanf_nr (unique inspection requirement number)

Key 4: auftrag_nr (order number of inspection requirement)

Key 5: artikel_nr (article number of inspection requirement)

If you use the database Oracle, all 5 key fields must be filled for the archiving of the inspection

requirements.  If  for  example  the  article  number  is  missing  in  an  inspection  requirement,  this

inspection requirement is not archived. If you want to archive such inspection requirements, the

relevant  key  field  must  not  have  a  content  in  the  archiving  configuration. With  the  example  of

the article number, this means that you cannot filter by the article number in a reload.

1.1.1.2 Standard configuration (with license FEP-/WEP-/QMS-

ARC)

If  one  of  the  licenses  FEP-/WEP-/QMS-ARC  is  available,  the  inspection  requirements  of  the  below

mentioned data types are saved by default using the structure mentioned above.

For  each  of  these  data  types,  a  separate  configuration  is  provided.  You  can  use  the  separate

configurations to configure separate archiving periods, for example. The data type WAP (goods issue) is

assigned to the licenses FEP-*.

The standard configuration of the inspection requirements provides a two-step archiving.

MBL_Archiving_CAQ.docx

Version: 1.4.16740

Page 2 of 9

CAQ-specific Configurations

In  a  first  step,  data  is  moved  to  the  medium-term  data  area.  Here,  data  is  directly  available  for

evaluations/reports using the medium-term data area. This data cannot be changed.

In  a  second  step,  data  is  moved  to  the  long-term  data  area.  In  this  case,  data  is  no  longer  directly

available

for  evaluations/reports.  Data  needs

to  be  reloaded

first

to  be  able

to  use

it

for

evaluations/reports in HYDRA.

Standard  configurations  for  the  first  and  second  archiving  level  of  inspection  requirements  and  the

respective intervals are described in the following table.

Product
CAQ

Object
FEP

Description of the action
Moving  the  production  inspection  requirements  from  the
online data set to the medium-term data set.

Default interval
1 year

CAQ

CAQ

A_FEP  Moving  the  production  inspection  requirements  from  the
medium-term data set to the long-term data set.
WEP  Moving  the  inspection  requirements  of  the  goods  receipt

3 years

1 year

from the online data set to the medium-term data set.

CAQ

A_WEP  Moving  the  inspection  requirements  of  the  goods  receipt

3 years

from the medium-term data set to the long-term data set.

CAQ

WAP  Moving  the  inspection  requirements  of  the  goods  issue

1 year

from the online data set to the medium-term data set.

CAQ

A_WAP  Moving  the  inspection  requirements  of  the  goods  issue

3 years

from the medium-term data set to the long-term data set.

CAQ

CAQ

EMU  Moving the inspection requirements of initial samples from
the online data set to the medium-term data set.
A_EMU  Moving the inspection requirements of initial samples from

1 year

3 years

the medium-term data set to the long-term data set.

QMS

QMS  Moving the QMS inspection requirements  from the online

3 months

data set to the medium-term data set.

QMS

A_QMS  Moving

inspection  requirements
medium-term data set to the long-term data set.

the  QMS

from

the

3 years

To  identify  the  intervals,  the  editing  date  of  the  inspection  requirement  is  used  as  reference.  Not  all

inspection requirements are archived. The respective status specifies whether an inspection requirement

is archived or not. By default, only completed and canceled inspection requirements are archived.

QMS collective requirements must be uploaded to the PPS system in order to be archived. Administrative

data  on  archived  CAQ  inspection  requirements  is  archived  for  12  years  in  the  arc_verw_caq  table  by

default.

1.1.1.3 Activities without license FEP-/WEP-/QMS-ARC

If  no  active  license  FEP-/WEP-/QMS-ARC  is  available,  this  archiving  configuration  does  not  affect  the

inspection requirements.

In  contrast  to  other  HYDRA  data,  inspection  requirements  are  not  removed  in  this  case.  They

permanently remain in the online data area, unless they are included in another archiving configuration.

The data type WAP (goods issue) is assigned to the licenses FEP-*.

MBL_Archiving_CAQ.docx

Version: 1.4.16740

Page 3 of 9

CAQ-specific Configurations

The inspection requirements of QMS data are an exception. The results of these inspection requirements

are normally uploaded to the PPS system. For this reason it is not required to keep this data in HYDRA.

The  data  is  removed  from  the  system  after  expiration  of  the  period  of  time  defined  for  the  product

QMS/object QMS in section 1.1.1.2 Standard configuration (with license FEP-/WEP-/QMS-ARC), just as it

is the case for other HYDRA data areas if the configuration has not been changed.

1.1.2 Archiving of collective requirements

1.1.2.1 Data structures

The  default  archiving  of  collective  requirements  is  object-related,  i.e.  each  collective  requirement  is

evaluated  in  the  archiving  process.  If  the  conditions  specified  via  configuration  parameters  are  fulfilled,

the requirement is archived. In this process, all detailed data included is also archived.

Optionally, you can use the above parameters to delete the data (instead of archiving).

In contrast to the archiving of inspection requirements, the collective requirements are not archived with

reference to their data types. Consequently, is not possible to define parameters for different intervals for

the collective requirements of different data types.

The details saved by default for a collective requirement are:

Data
Collective requirements
Inspection frequencies

Source table(s)
caq_sammelanf
caq_prueffreq

Logging  entries  for  collective  requirements  are  archived  separately.  The  archiving  configuration  of  this

data is described in the sections that follow.

1.1.2.2 Standard configuration (with license FEP-/WEP-/QMS-

ARC)

If one of the licenses FEP-/WEP-/QMS-ARC is available, the collective requirements are saved by default

using the structure mentioned above and irrespective of their data type.

The standard configuration of the collective requirements provides a two-step archiving.

MBL_Archiving_CAQ.docx

Version: 1.4.16740

Page 4 of 9

CAQ-specific Configurations

In  a  first  step,  data  is  moved  to  the  medium-term  data  area.  Here,  data  is  directly  available  for

evaluations/reports using the medium-term data area. This data cannot be changed.

In  a  second  step,  data  is  moved  to  the  long-term  data  area.  In  this  case,  data  is  no  longer  directly

available

for  evaluations/reports.  Data  needs

to  be  reloaded

first

to  be  able

to  use

it

for

evaluations/reports in HYDRA.

The  standard  configurations  for  the  first  and  second  archiving  level  of  the  collective  requirements  are

described below.

Product
CAQ

Object
SAN

Description of the action
Moving collective requirements from the online data set to
the medium-term data set.

Default interval
1 year

CAQ

A_SAN  Moving  collective  requirements  from  the  medium-term

3 years

data set to the long-term data set.

To identify the intervals, the editing date of the collective requirement is used as reference.

By  default,  only  the  collective  requirements  without  inspection  requirements  in  the  online  data  area  are

archived in the medium-term data area. This ensures that a collective requirement is only archived in the

medium-term data area, if all included inspection requirements have also been archived.

Archiving  to  the  long-term  data  area  works  on  the  same  principle.  Only  if  all  inspection  requirements

included  in  the  collective  requirement  do  no  longer  exist  in  the  medium-term  data  set,  the  collective

requirement is transferred to the long-term data set (respecting the interval).

Administrative data on archived CAQ collective requirements is archived for 12 years in the arc_verw_caq

table by default.

1.1.2.3 Activities without license FEP-/WEP-/QMS-ARC

If  no  active  license  FEP-/WEP-/QMS-ARC  is  available,  this  archiving  configuration  does  not  affect  the

collective requirements.

In contrast to other HYDRA data, collective requirements are not removed in this case. They permanently

remain in the online data area, unless they are included in another archiving configuration.

MBL_Archiving_CAQ.docx

Version: 1.4.16740

Page 5 of 9

CAQ-specific Configurations

1.1.3 Archiving of CAQ events

1.1.3.1 Data structures

By default, CAQ events are archived in relation to time. The archiving is always performed and it does not

matter if the included CAQ objects (e.g. inspection requirements or their details) have  been archived or

not.

Optionally, you can use the above parameters to delete the data (instead of archiving).

By  default,  the  events  are  archived  separately,  if  applicable  with  the  relevant  detail  data.  The  following

data is archived:

Data
CAQ events
Optional dialog data for events

Source table(s)
event_caq
event_dlg_data

1.1.3.2 Standard configuration (with license FEP-/WEP-/QMS-

ARC)

If one of the licenses FEP-/WEP-/QMS-ARC is available, the CAQ events are saved by default using the

structure mentioned above and irrespective of their data type.

The standard configuration of the CAQ events provides a two-step archiving.

In  a  first  step,  data  is  moved  to  the  medium-term  data  area.  Here,  data  is  directly  available  for

evaluations/reports using the medium-term data area.

In  a  second  step,  data  is  moved  to  the  long-term  data  area.  In  this  case,  data  is  no  longer  directly

available

for  evaluations/reports.  Data  needs

to  be  reloaded

first

to  be  able

to  use

it

for

evaluations/reports in HYDRA.

The  standard  configurations  for  the  first  and  second  archiving  level  of  the  CAQ  events  are  described

below.

Product
CAQ

Object
EREIGCAQ

Description of the action
Moving  entries  of  CAQ  events  from  the  online
data set to the medium-term data set.

Default interval
35 days

CAQ

A_ EREIGCAQ  Moving entries of CAQ events from the medium-

3 years

term data set to the long-term data set.

MBL_Archiving_CAQ.docx

Version: 1.4.16740

Page 6 of 9

CAQ-specific Configurations

To identify the intervals, the date of the CAQ event is used as reference.

Administrative  data  on  archived  CAQ  events  is  archived  for  12  years  in  the  arc_verw_caq  table  by

default.

1.1.3.3 Activities without license FEP-/WEP-/QMS-ARC

If  no  active  license  FEP-/WEP-/QMS-ARC  is  available,  this  archiving  configuration  does  not  affect  the

CAQ events.

In contrast to other HYDRA data, CAQ events are not removed in this case. They permanently remain in

the online data area, unless they are included in another archiving configuration.

1.1.4 Archiving of CAQ logging entries

1.1.4.1 Data structures

By default, CAQ logging entries are archived in relation to time. The archiving is always performed and it

does  not  matter  if  the  included  CAQ  objects  (e.g.  inspection  requirements  or  their  details)  have  been

archived or not.

Optionally, you can use the above parameters to delete the data (instead of archiving).

By  default,  the  logging  entries  are  archived  separately,  if  applicable  with  the  relevant  detail  data.  The

following data is archived:

Data
Logging entries
Additional data to logging entries

Source table(s)
hyd_logging
hyd_logging_data

1.1.4.2 Standard configuration (with license FEP-/WEP-/QMS-

ARC)

If one of the  licenses FEP-/WEP-/QMS-ARC is  available, the CAQ logging entries are saved by  default

using the structure mentioned above.

The standard configuration of the CAQ logging entries provides a two-step archiving.

In  a  first  step,  data  is  moved  to  the  medium-term  data  area.  Here,  data  is  directly  available  for

evaluations/reports using the medium-term data area.

MBL_Archiving_CAQ.docx

Version: 1.4.16740

Page 7 of 9

CAQ-specific Configurations

In  a  second  step,  data  is  moved  to  the  long-term  data  area.  In  this  case,  data  is  no  longer  directly

available

for  evaluations/reports.  Data  needs

to  be  reloaded

first

to  be  able

to  use

it

for

evaluations/reports in HYDRA.

The default configurations for the first and second archiving level of CAQ logging entries are described in

the below table.

Product
CAQ

Object
LOG

CAQ

A_LOG

Description of the action
Moving CAQ logging entries from the online data
set to the medium-term data set.
Moving
the
medium-term data set to the long-term data set.

logging  entries

the  CAQ

from

Default interval
35 days

3 years

To identify the intervals, the date of the logging entry is used as reference.

Administrative data on archived CAQ logging entries is archived for 12 years in the arc_verw_caq table

by default.

1.1.4.3 Activities without license FEP-/WEP-/QMS-ARC

If  no  active  license  FEP-/WEP-/QMS-ARC  is  available,  this  archiving  configuration  does  not  affect  the

CAQ logging entries.

In contrast to other HYDRA data, CAQ logging entries are not removed in this  case. They permanently

remain in the online data area, unless they are included in another archiving configuration.

1.1.5 Archiving of the document management

The documents of the HYDRA document management are archived when the relevant object is archived.

The files themselves remain at their original storage location and are not archived.

As  part  of  the  HYDRA  document management  of  the  CAQ,  you  can  assign  documents  to  the  following

objects.





Inspection points

Inspection step characteristics/inspection point characteristics

  Measured values/attributive inspection results

To archive the documents, make the following entries in the data management.

Product
CAQ

Object
DOCLINK

Description of the action
Moving the document entry from the online data set
to the medium-term data set.

Default interval
0 days

MBL_Archiving_CAQ.docx

Version: 1.4.16740

Page 8 of 9

Product
CAQ

Object

Description of the action

A_DOCLINK  Moving  the  document  entry  from  the  medium-term
data set to the long-term data set.

Default interval
0 days

CAQ-specific Configurations

Set the interval to "0 days" so that the archiving is directly performed after the archiving of the respective

object.

MBL_Archiving_CAQ.docx

Version: 1.4.16740

Page 9 of 9


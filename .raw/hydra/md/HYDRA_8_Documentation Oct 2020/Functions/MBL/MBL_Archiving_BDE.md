|     |     |     | BDE-Specific Configurations  |     |
| --- | --- | --- | ---------------------------- | --- |

1  BDE-Specific Configurations
Overview
In the BDE module, by default data are held in cache for 35 days before they are moved into long-term
storage.
In a variety of BDE reports, there is the option to pull up data that are 35 days old or older. To do this, the
BDE postings are set in a special medium-term or archive area. You automatically have access to such
data for the most part if the selection period exceeds the short-time data area. In some applications, there
is the option to "Consider long-term data" in the selection area, which can be accessed from here.
The data considered during BDE archiving include:
  Order backlog
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order status
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order actions
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order sequences
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order networks
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Lists of material components and production resources and tools
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order serial numbers
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Additional information (long texts)
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order quantities
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Additional order information
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order posting records
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order backlog (PPS)
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Additional order information (PPS)
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order actions (PPS)
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Master detail user field (specific table)
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Order specific events
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
  Personal events
|     |     |     |     |     |
| --- | --- | --- | --- | --- |

| MBL_Archiving_BDE.docx  |     | Version: 1.0.18468  |     | Page 1 of 3  |
| ----------------------- | --- | ------------------- | --- | ------------ |

|     |     |     |     |     | BDE-Specific Configurations  |     |
| --- | --- | --- | --- | --- | ---------------------------- | --- |

  Additional information for events
|     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
  Order logging information
|     |       |     |     |     |     |     |
| --- | ----- | --- | --- | --- | --- | --- |
  Additional order logging information
|     |       |     |     |     |     |     |
| --- | ----- | --- | --- | --- | --- | --- |
  BDE configuration logging information
|     |       |     |     |     |     |     |
| --- | ----- | --- | --- | --- | --- | --- |
  Additional BDE configuration logging information
|     |       |     |     |     |     |     |
| --- | ----- | --- | --- | --- | --- | --- |

Configuration
You can use HYDRA data management to configure the retention period for the data in each of the data
areas.
When transferring data into the archive tables, the data for which the "retention period" (in number of
days/ months/ years; see the values in parentheses) has been exceeded is transferred. If the archiving
license relevant to the BDE is not available, the data will be deleted after the set retention period.
| Product  | Object  | Object designation  |     | Transfer  |     | Factory  |
| -------- | ------- | ------------------- | --- | --------- | --- | -------- |
default
interval
| BDE  | ANR  | Order backlog  |     | Online data             |     | 35 days  |
| ---- | ---- | -------------- | --- | ----------------------- | --- | -------- |
|      |      | -Status,       |     |  medium-term archive   |     |          |
- Actions,
- Sequences,
- Networks,
- Lists of material,
- Serial numbers,
- Additional information,
- Quantities,
- PPS data,
- Master detail user fields

BDE  A_ANR  Long-term archiving:  Medium-term archive:  2 years
|     |     | Order backlog  |     |  long-term archive  |     |     |
| --- | --- | -------------- | --- | -------------------- | --- | --- |
-Status,
- Actions,
- Sequences,
- Networks,
- Lists of material,
- Serial numbers,
- Additional information,
- Quantities,
- PPS data,
- Master detail user fields
BDE  ADEPRO  Posting records of orders  Online data   35 days 1)
 medium-term archive
BDE  ADEPRO_ADD  Posting record of orders –  Online data  Delete  if  the
additional information   data is deleted (it is not  relevant posting

| MBL_Archiving_BDE.docx  |     | Version: 1.0.18468  |     |     |     | Page 2 of 3  |
| ----------------------- | --- | ------------------- | --- | --- | --- | ------------ |

BDE-Specific Configurations
Product Object Object designation Transfer Factory
default
interval
transferred to the medium- record of the
term data) order is no
longer available
BDE A_ADEPRO Long-term archiving: Medium-term archive 2 years 1)
Posting records of orders  long-term archive
BDE EREIGADEA Order-related events Online data 35 days 2)
incl. additional information  medium-term archive
BDE A_EREIGADEA Long-term archiving: Medium-term archive: 2 years 2)
Order-related events  long-term archive
incl. additional information
BDE EREIGADEP Personal events Online data 35 days 2)
incl. additional information  medium-term archive
BDE A_EREIGADEP Long-term archiving: Medium-term archive: 2 years 2)
Personal events  long-term archive
incl. additional information
BDE ANRLOG HYDRA logging data Online data 35 days
 medium-term archive
BDE A_ANRLOG Long-term archiving Medium-term archive: 3 years
HYDRA logging data  long-term archive
BDE CFGLOG HYDRA logging Online data 35 days
configuration  medium-term archive
BDE A_CFGLOG Long-term archiving Medium-term archive: 3 years
HYDRA logging  long-term archive
configuration
Please note:
1) If the values entered for ADEPRO or A_ADEPRO are changed (increased), the entries for ANR or
A_ANR will also have to be changed (increased) accordingly.
Provided that the BDE log records are to be archived at the earliest after the OP has been archived,
this can be achieved by defining the following condition for the object ADEPRO in the field of the
same name within the “data management” configuration:
ade_protokoll.auftrag_nr in (select auftrag_nr from a_auftrag_status)
Please note that the order-related postings only allow for data of the online data area to be selected
and edited.
2) Please note that the event maintenance only allows for data of the online data area to be selected
and edited.
MBL_Archiving_BDE.docx Version: 1.0.18468 Page 3 of 3
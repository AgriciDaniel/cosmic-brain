Manual
Archiving of Shop Floor /
Order Data
BDE-ARC 8.1
Version 1.1.5003
Last changed on: 19.06.2020

Archiving of Shop Floor / Order Data
Copyright
©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
BDE-ARC_81.docx Version: 1.1.21233 Page 2 of 16

|     |     |     | Archiving of Shop Floor / Order Data  |     |
| --- | --- | --- | ------------------------------------- | --- |

Contents
1  Archiving of Business / Order Data .............................................................. 4
2  BDE-Specific Configurations ........................................................................ 7
3  Data Management ...................................................................................... 10
4  Reload Manager ......................................................................................... 14

| BDE-ARC_81.docx  |     | Version: 1.1.21233  |     | Page 3 of 16  |
| ---------------- | --- | ------------------- | --- | ------------- |

Archiving of Shop Floor / Order Data
1 Archiving of Business / Order Data
Purpose
The function package Archiving business /order data makes it possible to access archived data and,
moreover, to export recorded data and to load these data back into the system as needed.
Implementation considerations
You use the function package Archiving business / order data, if:
 You would like to have access to data already moved to archive tables in the function package
Entering business data.
 Because of legal requirements or customer demands, you need to ensure that the data entered
is stored long-term.
 Because of legal requirements or customer demands, you need to import data that has already
been exported back into the system to be evaluated / analyzed again.
Integration
When business / order data is archived, inventory data and recorded data is accessed from the relevant
archive tables in the function package Entering business data.
Features
 Direct access to archive tables from the application
o Direct access to archived business/order data from the applications
 Order overview
 Order information
 Order shift log
 Personnel shift log
 Personnel report
 Schedule controlling
 Overhead cost controlling
 Maintenance controlling
 Production controlling
 Scrap statistics
 Scrap profile
 Transport function
o Functions for transporting data from the on-line tables into archive tables.
 Export function
BDE-ARC_81.docx Version: 1.1.21233 Page 4 of 16

|     |     |     | Archiving of Shop Floor / Order Data  |     |
| --- | --- | --- | ------------------------------------- | --- |

o  Function used to transfer (export) data from the archive tables to external file systems for
the purpose of storing the recorded business / order data long-term.
  Import function
o  Functions for importing exported data into the archive tables in order to evaluate them
using the applications listed above.

| BDE-ARC_81.docx  |     | Version: 1.1.21233  |     | Page 5 of 16  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | Archiving of Shop Floor / Order Data  |     |
| --- | --- | --- | ------------------------------------- | --- |

| BDE-ARC_81.docx  |     | Version: 1.1.21233  |     | Page 6 of 16  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | Archiving of Shop Floor / Order Data  |     |
| --- | --- | --- | ------------------------------------- | --- |

2  BDE-Specific Configurations
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
  Additional information for events

| BDE-ARC_81.docx  |     | Version: 1.1.21233  |     | Page 7 of 16  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     |     | Archiving of Shop Floor / Order Data  |     |     |
| --- | --- | --- | --- | ------------------------------------- | --- | --- |

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
| Product  | Object  | Object designation  |     | Transfer  | Factory  |     |
| -------- | ------- | ------------------- | --- | --------- | -------- | --- |
default
interval
| BDE  | ANR  | Order backlog  |     | Online data             | 35 days  |     |
| ---- | ---- | -------------- | --- | ----------------------- | -------- | --- |
|      |      | -Status,       |     |  medium-term archive   |          |     |
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
|     |     |     |     | transferred to the medium- | record  | of  the  |
| --- | --- | --- | --- | -------------------------- | ------- | -------- |

| BDE-ARC_81.docx  |     | Version: 1.1.21233  |     |     | Page 8 of 16  |     |
| ---------------- | --- | ------------------- | --- | --- | ------------- | --- |

|     |     |     |     | Archiving of Shop Floor / Order Data  |     |     |
| --- | --- | --- | --- | ------------------------------------- | --- | --- |

| Product  | Object  | Object designation  | Transfer  |     | Factory  |     |
| -------- | ------- | ------------------- | --------- | --- | -------- | --- |
default
interval
|     |     |     | term data)  |     | order  is  | no  |
| --- | --- | --- | ----------- | --- | ---------- | --- |
longer available
BDE  A_ADEPRO  Long-term archiving:  Medium-term archive  2 years 1)
|     |     | Posting records of orders  |  long-term archive  |     |     |     |
| --- | --- | -------------------------- | -------------------- | --- | --- | --- |
BDE  EREIGADEA  Order-related events  Online data  35 days 2)
|     |     | incl. additional information  |  medium-term archive   |     |     |     |
| --- | --- | ----------------------------- | ----------------------- | --- | --- | --- |
BDE  A_EREIGADEA  Long-term archiving:  Medium-term archive:  2 years 2)
|     |     | Order-related events  |  long-term archive  |     |     |     |
| --- | --- | --------------------- | -------------------- | --- | --- | --- |
incl. additional information
| BDE  | EREIGADEP  | Personal events               | Online data             |     | 35 days 2)  |     |
| ---- | ---------- | ----------------------------- | ----------------------- | --- | ----------- | --- |
|      |            | incl. additional information  |  medium-term archive   |     |             |     |
BDE  A_EREIGADEP  Long-term archiving:  Medium-term archive:  2 years 2)
|     |     | Personal events  |  long-term archive  |     |     |     |
| --- | --- | ---------------- | -------------------- | --- | --- | --- |
incl. additional information
| BDE  | ANRLOG  | HYDRA logging data  | Online data  |     | 35 days  |     |
| ---- | ------- | ------------------- | ------------ | --- | -------- | --- |
 medium-term archive
BDE  A_ANRLOG  Long-term archiving  Medium-term archive:  3 years
|      |         | HYDRA logging data  |  long-term archive     |     |          |     |
| ---- | ------- | ------------------- | ----------------------- | --- | -------- | --- |
| BDE  | CFGLOG  | HYDRA logging       | Online data             |     | 35 days  |     |
|      |         | configuration       |  medium-term archive   |     |          |     |
BDE  A_CFGLOG  Long-term archiving  Medium-term archive:  3 years
|     |     | HYDRA logging  |  long-term archive  |     |     |     |
| --- | --- | -------------- | -------------------- | --- | --- | --- |
configuration

Please note:
1)  If the values entered for ADEPRO or A_ADEPRO are changed (increased), the entries for ANR or
A_ANR will also have to be changed (increased) accordingly.
Provided that the BDE log records are to be archived at the earliest after the OP has been archived,
this can be achieved by defining the following condition for the object ADEPRO in the field of the
same name within the “data management” configuration:
ade_protokoll.auftrag_nr in (select auftrag_nr from a_auftrag_status)
Please note that the order-related postings only allow for data of the online data area to be selected
and edited.
2)  Please note that the event maintenance only allows for data of the online data area to be selected
and edited.

| BDE-ARC_81.docx  |     | Version: 1.1.21233  |     |     | Page 9 of 16  |     |
| ---------------- | --- | ------------------- | --- | --- | ------------- | --- |

Archiving of Shop Floor / Order Data
3 Data Management
Overview
Menu System administration  Archiving  Data management
Transaction code arccfg
Function authorization arccfg.*
Usage
You may use this application in order to view or edit the centrally managed settings for archiving.
Integration
The settings for archiving/for data management are made centrally from all components/functions in the
application.
Field descriptions
Product
In the Product field, the HYDRA module for which a rule is to be defined is entered.
Object
The Object defines what is to be provided .
Retention period
In the "retention period" fields, you define how long the data should be available before being
archived.
Unit
The unit for the retention period is indicated in days, months or years.
Last retention date
This field is computed and subsequently indicates the last day on which data are still available in
this object.
Action
It is possible to select from three process variants for an object:
D = delete Object is deleted
M = move (archive) Object will be transferred to the next division
X = Export Object is unloaded (XUNLOAD format), subsequently deleted
BDE-ARC_81.docx Version: 1.1.21233 Page 10 of 16

Archiving of Shop Floor / Order Data
Target object
At present, this automatically results from the detail configuration.
Condition
The characters in this field are added to the database command controlling the action, whereby this
condition is linked to the conditions of the original command there and is set in parenthesis.
Last run (date/time)
Indicates when this rule was applied last.
License
Indicates which license is required for archiving. Multiple licenses may be entered here (separated
by a space). If none of these licenses is licensed on the system, the data are either deleted (action
D) or unloaded in files (action M or X) according to the relevant action.
Path
Optional path for generating the file export (Unload). At present, only local drives are supported on
the HYDRA server in the archive. If no path is set, file exports are filed as follows:
<HYDRADIR>/<SYSTEM>/custom/archive/<YYYY-MM-DD>/<PRODUCT>/
HYDRADIR … HYDRA directory
SYSTEN … System number
YYYY-MM-DD … Archiving date (YYYY … Year, MM … Month, DD … Day)
PRODUCT … Product from archiving configuration
Management table
Table name of management table where the archiving logs are stored.
Retention period management table
In the fields used for the Retention period, you define how long the logs should be available in the
management table before being deleted.
Unit
The unit for the retention period is indicated in days, months or years.
Archiving step
Indicates whether this archiving executes archiving function I or II. In archiving function I, the data
are transferred from the online inventory to the archive tables and/or deleted. Setting M (medium-
term archive) In archiving function II, the data are transferred from the archive table to the file
export and/or deleted. Setting L (long-term archive).
Configuration
Control indicator whether or not the configuration is active. Possible values: Y/N.
BDE-ARC_81.docx Version: 1.1.21233 Page 11 of 16

|     |     |     |     | Archiving of Shop Floor / Order Data  |     |
| --- | --- | --- | --- | ------------------------------------- | --- |

Archiving type
Identifier for time or object-related archiving. Supported modes: O = Object-related archiving (i.e.
data  are  archived  for  each  object  individually).  Z  =  Time-related  archiving  (i.e.  data  are
| collected/archived  |     | without  | any  | object  | reference).   |
| ------------------- | --- | -------- | ---- | ------- | ------------- |
Please note: Time and object-related archiving differ from each other significantly in the archiving
performance (runtime). Object-related archiving of mass data is not recommendable.
Priority
Integral value greater than 0. Indicates the execution sequence when several objects are defined to
a module. Execution starts from the configuration with the lowest value.
Master table
Table including the archiving data. The extensions entered in the Condition field refer to this table.
Date column
Date column in the master table. Is used for evaluating the data to be archived with regard to the
retention period.
Key 1
Clear key column in the master table; may be used to identify the data to be archived. Up to 5 key
columns may be defined for object-related archiving. Time-related archiving only supports one
primary key in Key 1.
Keys 2 – 5
Additional optional key columns for object-related archiving.
Comment
Comment line for describing the archiving configuration.
When copying the archiving configuration, only the data management configuration is copied at
present, but no any defined data records from the object details. At present, the data records
from the object details must be copied to the new configuration by the user in the appropriate

screen.
| Module  |     | Version  |     | Description of archiving  |     |
| ------- | --- | -------- | --- | ------------------------- | --- |
| BDE     |     | 8.1      |     | here                      |     |
| CAQ     |     | 8.1      |     | here                      |     |
| MDE     |     | 8.1      |     | here                      |     |
| MPL     |     | 8.1      |     | here                      |     |

| BDE-ARC_81.docx  |     | Version: 1.1.21233  |     |     | Page 12 of 16  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     | Archiving of Shop Floor / Order Data  |     |
| --- | --- | --- | ------------------------------------- | --- |

| BDE-ARC_81.docx  |     | Version: 1.1.21233  |     | Page 13 of 16  |
| ---------------- | --- | ------------------- | --- | -------------- |

Archiving of Shop Floor / Order Data
4 Reload Manager
Summary
Menu System Administration  Archiving  Reload Manager
Transaction code arcrld
Function authorization arcrld
arcrld.export
arcrcl.import
Utilization
The customer is responsible for backing up data in a data archive and for restoring data. When data is
backed up it is transferred from the long-term data area to the archive data area and, as a result, it is
stored in a separate file system. The customer can start the backup process using the Reload Manager.
When data, which is filed in the archive data area, is restored, it is transferred back (copied) to the long-
term data area. The customer has to do this and bears the responsibility.
To be able to evalaute restored data using standard evaluations/reports, the data has to be transferred
back (copied) to the reload data area.
For this reason, the Reload Manager enables the following functions:
1. Moving of exported data into the customer archive (the customer archive path has to be defined
within the HYDRA path settings).
2. Loading of exported data into the reload area for evaluations
Integration
The Reload Manager is a central function that is used by many components or functions.
Selection Criteria
The application provides the following selection criteria:
Module
Reference to the product group which archived data belongs to.
Object type
Object type of the archived data.
BDE-ARC_81.docx Version: 1.1.21233 Page 14 of 16

Archiving of Shop Floor / Order Data
The selection options “module” and “object type” are mandatory fields.
Toolbar
Export
The “EXPORT” button allows for the entries selected in the Reload Manager to be exported to the
customer directory (all data records can be selected using the context menu of the right mouse
button). Once the function has been started, the input dialog that opens requires the customer
archive path to be entered.
Import
The “IMPORT” button allows for the selected entries to be loaded into the reload area, in order for
the data to be again available for HYDRA evaluations/reports. Once the function has been started,
the data loading mode and an optional path are requested. By indicating the path, it is possible to
specify another storage location for the files, provided that the archived files have not been moved
to the customer-specific archive using the Reload Manager.
There are three different ways to deal with reload data after they have been reloaded to prevent the
reload data set from increasing excessively ( no slow evaluations/reports):
The following modes are distinguished:
 Cyclic
Data is loaded to the reload area in the “cyclic” mode. Loaded data is automatically removed from
the corresponding reload tables, once the retention period specified within archive settings has
expired.
Please compare the configuration entry HYD / RELOADMANAGER of the data management
function. When demo settings are used, data is removed from the reload area after 14 days.
When data is imported, the HYD_REL_MANAGEMENT.DELETE_DATE field is calculated
subject to the configuration and entered in the reload management table.
 User-specific
Data is loaded to the reload area in the “user-specific” mode. The loaded data is automatically
removed from the corresponding reload area, once the time specified for the user within the user-
specific settings has expired. Exception: In case several users loaded identical data into the
reload area, the corresponding retention period is automatically set to the maximum date.
When data is imported, the HYD_REL_MANAGEMENT.DELETE_DATE field is computed
subject to the configuration and entered in the reload management table.
BDE-ARC_81.docx Version: 1.1.21233 Page 15 of 16

Archiving of Shop Floor / Order Data
 Manual
Data is loaded in the “manual” mode to the reload area. The customer is responsible for deleting
data from corresponding reload tables. However, identical data cannot be loaded several times in
the “manual” mode (data can be loaded in the “user-specific” mode though).
In order for data to be transferred to the reload data area, the HYDRA server must be able to
access these files. Otherwise, loading is cancelled with an error message.
BDE-ARC_81.docx Version: 1.1.21233 Page 16 of 16
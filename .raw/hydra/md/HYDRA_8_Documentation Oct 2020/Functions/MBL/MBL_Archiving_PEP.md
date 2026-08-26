Archiving Personnel Scheduling
Archiving Personnel Scheduling
Overview
There is no archiving of data in the PEP (Personnel Scheduling) in the long-term. The reason for it is that
default daily data is archived generally for 100 days, which is normally sufficient.
Configuration
You can setup data retention in the database using Data management. The request to delete data is run
from a central archiving script hyarc.scr. This program is planned to run on a daily basis within the Scheduler
by default.
Product Object Object name Perform Default interval
PEP DAILY_DATA Workplace assignment Data is deleted. 100 days
Data is not
transferred into
archiving tables.
Restrictions
The data management for PEP is restricted in its functionality compared to other products groups, which
have increased archiving functions:
 Default action is "Delete".
 The default action is "Export" introduced with Service Pack 7. Data is exported into text files into
the HYDRA server. MPDV offers a special service where data is checked and if necessary
retrieved. To retrieve exported data by the customer using the reload manager, for example, is not
possible.
 The action "Archiving" is not permissible. ZKS do not offer archiving data in the long-term.
 Data retention can only be configured per product/object. Deviating settings for individual database
tables are not available.
MBL_Archiving_PEP.docx Version: 1.0.18468 Page 1 of 3

|     |     |     | Archiving Personnel Scheduling  |     |
| --- | --- | --- | ------------------------------- | --- |

  Using field like "Target object" and "Condition" are not permitted.

| MBL_Archiving_PEP.docx  |     | Version: 1.0.18468  |     | Page 2 of 3  |
| ----------------------- | --- | ------------------- | --- | ------------ |

|     |     |     | Archiving Personnel Scheduling  |     |
| --- | --- | --- | ------------------------------- | --- |

  Configuration options in the tab „Archiving“ are not supported. The field may not be filed.

| MBL_Archiving_PEP.docx  |     | Version: 1.0.18468  |     | Page 3 of 3  |
| ----------------------- | --- | ------------------- | --- | ------------ |
|     |     |     |     | Archiving Data Access Control System  |     |
| --- | --- | --- | --- | ------------------------------------- | --- |

Archiving Data - Access Control System
Overview
There is no archiving of data in the ZKS (Access Control) in the long-term. The reason for it is that default
daily data is archived generally for 100 days, 500 days for configuration and 2 years for yearly data that
poses already a large amount of data.
Configuration
You can setup data retention in the database using Data management. The request to delete data is run
from a central archiving script hyarc.scr. This program is planned to run on a daily basis within the Scheduler
by default.
| Product  | Object  | Object name  |     | Perform           | Default interval  |
| -------- | ------- | ------------ | --- | ----------------- | ----------------- |
| ZKS      | KNR     | Badges       |     | Data is deleted.  | 500 days          |
Data is not
transferred into
archiving tables.
ZKS  CONFIG  Access profiles assignment  Data is deleted.  500 days
|     |     | Access profiles        |     | Data is not         |     |
| --- | --- | ---------------------- | --- | ------------------- | --- |
|     |     | Access authorizations  |     | transferred into    |     |
|     |     | Opening hours          |     | archiving tables.   |     |
Alarm suppression

ZKS  YEARLY_CONFIG  Public holidays  Data is deleted.  2 years
Data is not
transferred into
archiving tables.
| ZKS  | DAILY_DATA  | Access log              |     | Data is deleted.  | 100 days  |
| ---- | ----------- | ----------------------- | --- | ----------------- | --------- |
|      |             | Alarm and disturbances  |     | Data is not       |           |
|      |             | Room zone logs          |     | transferred into  |           |
archiving tables.

Restrictions
The data management for ZKS is restricted in its functionality compared to other products groups, which
have increased archiving functions:
  Default action is "Delete".
  The default action is "Export" introduced with Service Pack 7.  Data is exported into text files into
the HYDRA server.  MPDV offers a special service where data is checked and if necessary
retrieved.  To retrieve exported data by the customer using the reload manager, for example, is not
possible.
  The action "Archiving" is not permissible. ZKS do not offer archiving data in the long-term.

| MBL_Archiving_ZKS.docx  |     | Version: 1.0.18468  |     |     | Page 1 of 3  |
| ----------------------- | --- | ------------------- | --- | --- | ------------ |

|     |     |     | Archiving Data Access Control System  |     |
| --- | --- | --- | ------------------------------------- | --- |

  Data retention can only be configured per product/object.  Deviating settings for individual database
tables are not available.
  Using field like "Target object" and "Condition" are not permitted.

| MBL_Archiving_ZKS.docx  |     | Version: 1.0.18468  |     | Page 2 of 3  |
| ----------------------- | --- | ------------------- | --- | ------------ |

|     |     |     | Archiving Data Access Control System  |     |
| --- | --- | --- | ------------------------------------- | --- |

  Configuration options in the tab „Archiving“are not supported. The field may not be filed.

| MBL_Archiving_ZKS.docx  |     | Version: 1.0.18468  |     | Page 3 of 3  |
| ----------------------- | --- | ------------------- | --- | ------------ |
Archiving Data Incentive Wage
Archiving Data - Incentive Wage
Overview
In the module LLE (incentive wage) data is stored for 100 days by default before their transfer to the long-
term area.
You can access data from the long-term area for different evaluations. They are largely accessed
automatically if the selection period exceeds the short-term data area. In a few applications, we provide the
option "Consider long-term data" in the selection area and it is used to access that data.
Configuration
You can setup data retention in the database using Data management. The request to delete data is run
from a central archiving script hyarc.scr. This program is planned to run on a daily basis within the Scheduler
by default.
Product Object Object name Perform Default interval
LLE DATA Personnel day result Online dataset 100 days
Daily group performance -> Long term area
Monthly group performance
Labor time comparison
Bonuses
LLE A_DATA Personnel day results Data in the long- 400 days
Daily group performance term area is
Monthly group performance deleted.
Premium group changes
Premium group
Wage type determination
Labor time comparison
Bonuses
Restrictions
The data management for LLE is restricted in its functionality compared to other products groups that have
increased archiving functions.
 Default action is "Delete".
 The default action is "Export" introduced with Service Pack 7. Data is exported into text files into
the HYDRA server. MPDV offers a special service where data is checked and if necessary
retrieved. To retrieve exported data by the customer using the reload manager, for example, is not
possible.
 Data retention can only be configured per product/object. Deviating settings for individual database
tables are not available.
MBL_Archiving_LLE.docx Version: 1.0.18468 Page 1 of 2

|     |     |     | Archiving Data Incentive Wage  |     |
| --- | --- | --- | ------------------------------ | --- |

  Using field like "Target object" and "Condition" are not permitted.

| MBL_Archiving_LLE.docx  |     | Version: 1.0.18468  |     | Page 2 of 2  |
| ----------------------- | --- | ------------------- | --- | ------------ |
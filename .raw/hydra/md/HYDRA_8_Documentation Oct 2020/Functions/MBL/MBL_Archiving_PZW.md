Archiving Personnel Time Management Data

Archiving Personnel Time Management Data

Overview

There is no archiving of data in the PZW (Personnel Time Management) in the long term. The reason for

it is that default daily data is archived generally for 500 days and monthly data stored for 5  years, which

poses already a large amount of data.

Additionally, withTime sheet archive there is an option to display and print time sheets even if the setup

data retention has been expired.

Configuration

You can setup data retention in the database using Data management. The request to delete data is run

from  a  central  archiving  script  hyarc.scr.  This  program  is  planned  to  run  on  a  daily  basis  within  the

Scheduler by default.

Product  Object
PZE

DAILY_DATA

Default interval
500 days

Perform
Data is deleted.
Data is not
transferred into
archiving tables.

Object name
Clocking data records
Reason for absence

Absence planning
Personal models
Personal day types
Working hours
Messages list
Statistics Personnel
Messages to personnel

PZE

YEARLY_DATA  Monthly results
Year overview
Account limits
Changes in HR masterdata
Changes to account
(manually)

5 years

Data is deleted.
Data is not
transferred into
archiving tables.

Restrictions

The  data  management  for PZE/PZW  (Time&  Attendance,  Personnel  Time  Management)  is  restricted  in

its functionality compared to other products groups which have increased archiving functions.

  Default action is "Delete".

  The default action is "Export" introduced with Service Pack 7.  Data is exported into text files into

the  HYDRA  server.    MPDV  offers  a  special  service  where  data  is  checked  and  if  necessary

retrieved.  To retrieve exported data by the customer using the reload manager, for example, is

not possible.

MBL_Archiving_PZW.docx

Version: 1.1.18468

Page 1 of 3

Archiving Personnel Time Management Data

  The action "archiving" is not permissible. PZE/PZW do not offer archiving data in the long term.

  Data  retention  can  only  be  configured  per  product/object.    Deviating  settings  for  individual

database tables are not available.

  Using field like "Target object" and "Condition" are not permitted.

MBL_Archiving_PZW.docx

Version: 1.1.18468

Page 2 of 3

  Configuration options in the tab „Archiving“are not supported. The field may not be filed.

Archiving Personnel Time Management Data

MBL_Archiving_PZW.docx

Version: 1.1.18468

Page 3 of 3


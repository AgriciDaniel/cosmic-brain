MLE Archiving

1  MLE Archiving

Overview

MLE archiving is divided into two essential steps:



In the first step data is transferred from online tables to archive tables. The affected time range

can be configured by a program parameter.



In  the  second  step  data  is  deleted  from  archive  tables. The  affected  time  range  can  directly  be

specified via the application.

Moving data to archive tables

Moving data from online tables to archive tables is controlled via the program parameter of the archiving

program hysaparc.exe/out. If no parameter is specified as supplied with the standard system, all data will

be moved from MLE inbound and outbound transactions to archive tables. But the following must apply:

The editing data is less than or equal to the current date minus the program parameter set for archiving.

Proceed as described below to change the default setting (2 days):



If Windows is used:

MLE  tables  are  archived  by  starting  the  script  hyarc.scr  in  the  HYDRA  directory  (HYDRADIR).

This script controls various archiving processes. By default, the script includes the following entry:

hysaparc.exe /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60

Add the below-mentioned program parameter including the required value to this entry. Using this

example, data is transferred to archive tables after 14 days:

hysaparc.exe /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60 /ARC_DAYS=14

MBL_Archiving_MLE.docx

Version: 1.0.4905

Page 1 of 2

MLE Archiving



If Linux is used:

MLE  tables  are  archived  by  starting  the  script  hyarc.scr  in  the  HYDRA  directory  (HYDRADIR).

This script controls various archiving processes. By default, the script includes the following entry:

hysaparc.out /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60

Add the below-mentioned program parameter including the required value to this entry. Using this

example, data is transferred to archive tables after 14 days:

hysaparc.out /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60 /ARC_DAYS=14

Deleting data from archive tables

The retention period defined for each message type in the MLE distribution model specifies when archive

tables are cleared.

The stated retention period starts with the point in time of editing a transaction.

If the period for moving data from online tables to archive tables is increased to  14 days (see

example), the retention period should also be 14 days at least. Otherwise, data will immediately

be deleted from archive tables.

MBL_Archiving_MLE.docx

Version: 1.0.4905

Page 2 of 2


Database Backup (MS-SQL Server)
1 Database Backup (MS-SQL Server 2012)
Manual database backup using SQL Server Management Studio
A backup of the database content is achieved by using the Microsoft SQL Server Management Studio.
Procedure:
 Extend the SQL server instance (server name\HYDMS1) needing a backup in the Object
Explorer, and then extend Databases.
 Then make a right mouse button click on the HYDRA database, click on Tasks and then on
Back Up
SERVER NAMEDatabasesHYDRA1right mouse button Tasks  Back Up
The backup type may be complete or simple according to the setting of the database.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 1 of 50

Database Backup (MS-SQL Server)
Now you only have to specify the target, whether the database backup is to be made on the hard drive or
on a tape drive. If no target has been defined yet, a backup target can be defined by adding it. The
Options tab is used to specify how the backup is to be made. Upon confirming by pressing the OK button,
the following message is displayed upon completion of the backup:
A data backup under SQL Server 2012 does not necessarily have to be made on a tape drive. If the
database is configured appropriately, a backup in a file on the hard drive is also possible. Data
backup on a local drive has advantages mainly in terms of performance, but it is also helpful as regards
the recovery of a database. If possible, the backup should be implemented on a local hard drive. The
backup file can subsequently be written onto a tape via a system backup.
!!! WARNING !!!
If a total backup of hard drives is implemented on Windows systems as long as the SQL Server 2012
database is running, the database files (SQL Server) must not be saved. Should this occur, this may
result in unforeseen malfunctions of the database and hence HYDRA.
If such a complete backup is requested, HYDRA and the SQL Server Database have to be terminated
first.
Automatic database backup with HYD-BAM
With HYD-BAM, MPDV offers the implementation of an automated backup by means of various
maintenance plans.
If the backup is implemented directly onto a tape drive, the system administrator must only ensure that
a new tape is always inserted into the drive and the SQL Server Agent (service) is started. If the backup
is implemented onto a local hard drive, sufficient memory capacity must be available in order to
accommodate for both the data and the transaction log backups.
The time at which the backup is performed can be set individually in the maintenance plans.
As regards the implementation of an automated backup, 3 and/or 4 maintenance plans are set up in the
Microsoft SQL Server Management Studio.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 2 of 50

Database Backup (MS-SQL Server)
1. Maintenance plan for system database backups
The system databases (MSDB, MASTER, MODEL) only change little, but are indispensable. Since
their backup needs only a little time, these databases are backed up every day.
2. Maintenance plan for HYDRA database backups
The HYDRA database is backed up completely every day. In backup method 2, the transaction log is
also backed up.
3. Maintenance plan for transaction log backups
For backing up the transaction log, a separate maintenance plan is set up.
4. Maintenance plan for optimizing the HYDRA database
The HYDRA database is optimized every 7 days.
The time of the HYDRA backup should be between 09:00 PM and 06:00 AM and must be coordinated
with the HYDRA deletion scripts.
The logs of the SQL Server 2012 are located in the Management Studio (administration SQL Server
logs).
Set the maximum number (=6) of SQL Server logs. (administrationSQL Server logs)
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 3 of 50

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

HYD-BAM standard settings:
|                             | Action  |                          | Frequency  |                      | Time  |
| --------------------------- | ------- | ------------------------ | ---------- | -------------------- | ----- |
| Backup of system databases  |         | every day                |            | 02:00 AM             |       |
| Backup of HYDRA database    |         | every day                |            | 10:00 PM             |       |
| Backup of transaction log   |         | hourly                   |            | 00:00 AM - 12:00 PM  |       |
| Database optimization       |         | once a week, on Sunday   |            | 08:00 AM             |       |

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     |     | Page 4 of 50  |
| ------------------------ | --- | ------------------ | --- | --- | ------------- |

Database Backup (MS-SQL Server)
Backup without transaction log backup (method 1)
The backup of the database in method 1 is easy when using the restore mode. Using the model of simple
recovery, the database may be restored back to the last backup. However, it is not possible to restore the
database back to the time of the error.
The recovery mode is set in:
SERVER NAMEDatabases hydra1right mouse buttonProperties
Now the Options tab is used to set the recovery model.
Creation of a maintenance plan using the maintenance plan assistant
 Extend the SQL server instance (server name\HYDMS1) needing a backup in the
Object Explorer, and then extend Administration.
 Make a right mouse button click on Maintenance plans, and then click on
Maintenance plan assistant
SERVERNAMEAdministration Maintenance plansMaintenance Plan Wizard
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 5 of 50

|     |     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | --- | -------------------------------- | --- |

Open Maintenance plan assistant

|         |     |     |     |         |     |     |
| ------- | --- | --- | --- | ------- | --- | --- |
| Next    |     |     |     |   Next  |     |     |

| Set time  OK  |     |     |     |   Next  |     |     |
| -------------- | --- | --- | --- | ------- | --- | --- |

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     |     | Page 6 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | --- | ------------- |

|     |     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | --- | -------------------------------- | --- |

Select the option Repeated as Schedule type and daily for occurrence. The database
is to be backed up once at a freely definable time (e.g. 10:00 PM). Click OK to return to
the previous screen.

Select tasks: Database backup
Task Maintenance cleanup
| Next    |     |     |     | Next  |     |     |
| ------- | --- | --- | --- | ----- | --- | --- |

| Select database hydra1    |     |     |     | Ok  |     |     |
| ------------------------- | --- | --- | --- | --- | --- | --- |

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     |     | Page 7 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | --- | ------------- |

|     |     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | --- | -------------------------------- | --- |

Select the HYDRA database from specific databases
| Backup type:                  |     |     |     |   complete  |     |     |
| ----------------------------- | --- | --- | --- | ----------- | --- | --- |
| Backup record expires after:  |     |     |     |   3 days    |     |     |
| Database:                     |     |     |     |   hydra1    |     |     |
Select a backup file for each DB
| Folder:                 |     |     |     |   Indicate backup directory  |     |     |
| ----------------------- | --- | --- | --- | ---------------------------- | --- | --- |
| Backup file extension:  |     |     |     | bak                          |     |     |
|                         |     |     |     |                              |     |     |

The backup file should be saved on a separate local hard drive with sufficient free
memory space. From there, the backup file is subsequently copied to a tape or a
backup drive (e.g. 1 hour after the backup) in another step. The database backup
should  not be made on a  tape  directly,  since  the  backup  on  a  local hard  drive  is
significantly quicker.
|     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
Please note:
It may be of benefit to save more than one backup record on the local hard drive. In this
case, you select the option "Backup record expires after" and set the number of
backups to remain on the hard drive (e.g. 3 days). It is to be observed that sufficient
hard drive capacity is available.

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     |     | Page 8 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | --- | ------------- |

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

| Select folder, set number of days to  |     |     |   Next  |     |     |
| ------------------------------------- | --- | --- | ------- | --- | --- |
3Next

| Finish   |     |     |     Close  |     |     |
| -------- | --- | --- | ---------- | --- | --- |
|          |     |     |            |     |     |
The new maintenance plan can now be executed and tested.

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     | Page 9 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | ------------- |

Database Backup (MS-SQL Server)
Close
Check whether the backup file was created in the backup directory. After the daily
backup job, the backup must be written onto a tape for additional security.
Backup with transaction log backup (method 2)
A prerequisite for method 2 is the use of the complete recovery model. Using the model
of complete recovery, the database may be restored back to the time of the error (e.g.
hard drive crash).
The recovery mode is set in:
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 10 of 50

Database Backup (MS-SQL Server)
SERVER NAMEDatabases hydra1right mouse buttonProperties
Now the Options tab is used to set the recovery model.
Creation of a maintenance plan using the maintenance plan wizard
 Extend the SQL server instance (server name\HYDMS1) needing a backup in the
Object Explorer, and then extend Administration.
 Make a right mouse button click on Maintenance plans, and then click on
Maintenance Plan Wizard
SERVERNAMEAdministration Maintenance plansMaintenance Plan Wizard
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 11 of 50

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

| Next    |     |     |     Next  |     |     |
| ------- | --- | --- | --------- | --- | --- |
 If a common schedule is to be used for all tasks, "One schedule for total" schedule has
to be selected here.
|                                  |     |     |     |     |     |
| -------------------------------- | --- | --- | --- | --- | --- |
| Select maintenance tasks  Next  |     |     |     |     |     |
- Check database integrity
- Back up database (complete)
- Back up database (transaction log)
- Maintenance cleanup task

| Next    |     |     |     Next  |     |     |
| ------- | --- | --- | --------- | --- | --- |

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     | Page 12 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | -------------- |

|     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | -------------------------------- | --- |

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
Step 1: Check integrity of database
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
In this method, all three steps of the backup are performed at three different times.

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     | Page 13 of 50  |
| ------------------------ | --- | ------------------ | --- | -------------- |

Step 2: Backup of database
|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

Step 2: Backup up database
|                    |     |     |     |     |     |
| ------------------ | --- | --- | --- | --- | --- |
| Backup type: full  |     |     |     |     |     |
Backup record expires after:  3 days
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
Database:  hydra1
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
Select a backup file for each DB
Folder:  Indicate backup directory
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
Backup file extension:  bak
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
The backup file should be saved on a separate local hard drive with sufficient free
memory space. From there, the backup file is subsequently copied to a tape or a
backup drive (e.g. 1 hour after the backup) in another step. The database backup
should not be made on a tape directly, since the backup on a local hard drive has
significant advantages.

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     | Page 14 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | -------------- |

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

| Ok    |     |     |     OK  |     |     |
| ----- | --- | --- | ------- | --- | --- |

Please note:
It may be of benefit to save more than one backup record on the local hard drive. This
ensures that you can react very quickly in case of an error. In this case, you select the
option "Backup record expires after" and set the number of backups to remain on the
hard  drive  (e.g.  3  days).  It  is to  be  observed  that  sufficient  hard  drive  capacity  is
available.

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     | Page 15 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | -------------- |

|     |     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | --- | -------------------------------- | --- |

Step 3: Backup of transaction log
|     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |

 Select the HYDRA database from specific databases
| Backup type:                  |     |     |     |   Transaction log  |     |     |
| ----------------------------- | --- | --- | --- | ------------------ | --- | --- |
| Backup record expires after:  |     |     |     |   3 days           |     |     |
| Database:                     |     |     |     |   hydra1           |     |     |
Select a backup file for each DB
| Folder:                 |     |     |     |   Indicate backup directory  |     |     |
| ----------------------- | --- | --- | --- | ---------------------------- | --- | --- |
| Backup file extension:  |     |     |     |   trn                        |     |     |

The backup file should be saved on a separate local hard drive with sufficient free
memory space. From there, the backup file is subsequently copied to a tape or a
backup drive (e.g. 1 hour after the backup) in another step. The database backup
should not be made on a tape directly, since the backup on a local hard drive has
significant advantages.

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     |     | Page 16 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | --- | -------------- |

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

| OK    |     |     |     OK  |     |     |
| ----- | --- | --- | ------- | --- | --- |

Please note:
It may be of benefit to save more than one backup record on the local hard drive. This
ensures that you can react very quickly in case of an error. In this case, you select the
option "Backup record expires after" and set the number of backups to remain on the
hard  drive  (e.g.  3  days).  It  is to  be  observed  that  sufficient  hard  drive  capacity  is
available.

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     | Page 17 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | -------------- |

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

Step 4: Define maintenance cleanup

Select folder, set number of days to 3   Next
Next
The "*" in the field "File extension" will simultaneously delete backup and log files!

| Finish   |     |     |     Close  |     |     |
| -------- | --- | --- | ---------- | --- | --- |

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     | Page 18 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | -------------- |

Database Backup (MS-SQL Server)
The report option allows for saving the log file of the backup in a specific directory. If a
mail server has been defined, which is possible in SQL Server Management Studio
directly, you may have forwarded the backup report by e-mail or SMS directly if it was
successful and/or failed.
In the fourth step, backup files no longer required are now deleted (in this case files
older than 3 days) from the backup directory. The administrator is responsible for the
smooth implementation of daily deletions. If the backup cannot be implemented
because the backup drive is full, the database will stop. As regards the file extension,
either a specific extension or "*" for all has to be indicated. If the field remains empty,
nothing will be deleted.
The new maintenance plan can now be executed and tested.
Close
After setting up the maintenance plan, the correct execution of the defined tasks has to be verified daily.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 19 of 50

Database Backup (MS-SQL Server)
Maintenance plan for system database backups
In the example described the system databases (Master, Model and MSDB) are backed
up; the recovery model of the databases Master, Model and MSDB can be set to any
mode. In the given case, the databases are set to the simple recovery model. Using the
model of simple recovery, the database may be restored back to the last backup. This
method is sufficient, since the system databases do not change continuously.
SERVER NAMEDatabases hydra1right mouse buttonProperties
Creation of a maintenance plan using the maintenance plan wizard
 Extend the SQL server instance (server name\HYDMS1) needing a backup in the
Object Explorer, and then extend Administration.
 Make a right mouse button click on Maintenance plans, and then click on
Maintenance Plan Wizard
SERVERNAMEAdministration Maintenance plansMaintenance Plan Wizard
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 20 of 50

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

| Next    |     |     |     Change  |     |     |
| ------- | --- | --- | ----------- | --- | --- |

| Time type:    |     | repeated  |     |     |     |
| ------------- | --- | --------- | --- | --- | --- |
| Occurrence:   |     | daily     |     |     |     |

| Once at:  |     | e.g. 11:45 PM   |     |     |     |
| --------- | --- | --------------- | --- | --- | --- |
|           |     |                 |     |     |     |
No end date
OK

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     | Page 21 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | -------------- |

|     |     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | --- | -------------------------------- | --- |

Step 1:Backup of system databases

Select database backup
Select Maintenance cleanup
| Next    |     |     |     |   Next  |     |     |
| ------- | --- | --- | --- | ------- | --- | --- |

| Backup type:                  |     |     |     |   complete  |     |     |
| ----------------------------- | --- | --- | --- | ----------- | --- | --- |
| Backup record expires after:  |     |     |     |   3 days    |     |     |
Database:
|     |     |     |     |   System databases  |     |     |
| --- | --- | --- | --- | ------------------- | --- | --- |
Select a backup file for each DB
| Folder:                 |     |     |     |   Indicate backup directory  |     |     |
| ----------------------- | --- | --- | --- | ---------------------------- | --- | --- |
| Backup file extension:  |     |     |     |   bak                        |     |     |

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     |     | Page 22 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | --- | -------------- |

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

The backup file should be saved on a separate local hard drive with sufficient free
memory space. From there, the backup file is subsequently copied to a tape or a
backup drive (e.g. 1 hour after the backup) in another step. The database backup
should not be made on a tape directly, since the backup on a local hard drive has
significant advantages.

Step 2:maintenance cleanup

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
Select folder, set number of months to 3  Continue

| Finish   |     |     |     Close  |     |     |
| -------- | --- | --- | ---------- | --- | --- |
|          |     |     |            |     |     |

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     | Page 23 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | -------------- |

Database Backup (MS-SQL Server)
The new maintenance plan can now be executed and tested.
After setting up the maintenance plan, the correct execution of the defined tasks has to be verified daily.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 24 of 50

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

Maintenance plan to optimize the HYDRA database
You proceed as follows in order to set up a maintenance plan for optimizing the HYDRA database:
  Open SQL Server Management Studio
  Extend the SQL server instance (server name\HYDMS1) needing a backup in the Object
Explorer, and then extend Administration.
  Make a right mouse button click on Maintenance plans, and then click on Maintenance Plan
Wizard
SERVERNAMEAdministration Maintenance plansMaintenance Plan Wizard

| Next  |       |     | Change  |     |     |
| ----- | ----- | --- | ------- | --- | --- |
|       |       |     |         |     |     |

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     |     | Page 25 of 50  |
| ------------------------ | --- | ------------------ | --- | --- | -------------- |

|     |     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | --- | -------------------------------- | --- |

| Time type:     |     | repeated       |     | " Check database integrity and  |     |     |
| -------------- | --- | -------------- | --- | ------------------------------- | --- | --- |
|                |     |                |     |                                 |     |     |
| Occurrence:    |     | weekly         |     | Select "Reorganize index"       |     |     |
|                |     |                |     |                                 |     |     |
| Repeat every:  |     | Sunday         |     | Continue                        |     |     |
|                |     |                |     |                                 |     |     |
| Once at:       |     | e.g. 08:00 AM  |     |                                 |     |     |
|                |     |                |     |                                 |     |     |
No end date

Next
|     |     |     |     | Select database  |     |     |
| --- | --- | --- | --- | ---------------- | --- | --- |

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     |     | Page 26 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | --- | -------------- |

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

Select HYDRA1 database OK
|                  |     |     |                               |     |     |
| ---------------- | --- | --- | ----------------------------- | --- | --- |
| Select database  |     |     |   Select HYDRA1 databaseOK   |     |     |

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     |     | Page 27 of 50  |
| ------------------------ | --- | ------------------ | --- | --- | -------------- |

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

| Next    |     |     |     Next  |     |     |
| ------- | --- | --- | --------- | --- | --- |

| Finish   |     |     |     Close  |     |     |
| -------- | --- | --- | ---------- | --- | --- |
Subsequently, you can execute and test the maintenance plan generated.

| SIS-DBB_30_SQL2012.docx  |     |     | Version: 1.1.6691  |     | Page 28 of 50  |
| ------------------------ | --- | --- | ------------------ | --- | -------------- |

Database Backup (MS-SQL Server)
Close
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 29 of 50

|     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | -------------------------------- | --- |

2  Restore data (RESTORE AND RECOVERY)
Restore without transaction log backup
Please note: At the time of restore, no user must be connected to the database. All HYDRA services must
be terminated so that a database backup may be loaded.
  Open SQL Server Management Studio
  Extend the SQL server instance (server name\HYDMS1) needing a backup in the Object
Explorer.
  Extend the Databases group, make a right mouse button click on the HYDRA1 database, go to
| Tasks and then to Restore. Now click on Restore database.  |     |     |     |     |
| ---------------------------------------------------------- | --- | --- | --- | --- |

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     | Page 30 of 50  |
| ------------------------ | --- | ------------------ | --- | -------------- |

|     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | -------------------------------- | --- |

SQL Server now shows the current backups known to the system. In the given example, these are a Data
backup and a Transaction log backup for the selected HYDRA1 database. In this example, only the
Database component of the type is selected completely, the existing transaction log is not loaded.

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     | Page 31 of 50  |
| ------------------------ | --- | ------------------ | --- | -------------- |

Database Backup (MS-SQL Server)
If the backup record is requested to be restored from another medium (e.g. a hard drive), and the backup
record is not recognized by SQL Server as the backup instance automatically, the procedure described in
item 4.4 is to be followed.
By means of the Options part of the Restore database dialog field, you may enter additional options to
restore a database.
Overwrite the existing database
This specifies that all existing databases and the related files are overwritten in the restore
process, even if a database or file with the same name exists already.
Retain replication settings (not to be used for HYDRA1 database)
This retains the replication settings, if a published database is restored on a server where the
database was not created.
Confirmation before recovery of individual backup
This requires a confirmation from the user with each backup record, before restore is started.
This option is particularly helpful if you have to change the tapes for various media records, e.g. if
the server has only one tape device.
Restrict access to restored database
 Restricted mode (no user access possible)
Only allows members of db_owner, dbcreator or sysadmin to access the restored database.
This option corresponds to the option RESTRICTED_USER in a transact SQL RESTORE
instruction.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 32 of 50

Database Backup (MS-SQL Server)
Enter the name of the database to be restored in the field Target to be restored as database, if it
deviates from the default, or select the name. If you wish to restore the database under a new name, you
enter the new name of the database.
Select the backup record from where you intend to restore the database from Recovery source. In this
method, the transaction log must not be indicated.
If the backup record is to be taken from another medium, this medium has to be selected first. (see
section 4.4)
You may optionally click on the Options tab and execute the following actions:
Set the recovery option Overwrite the existing database, if the database (HYDRA1) still exists.
Leave the database operational by executing a rollback for transactions without commit.
Additional transaction logs cannot be restored. (RESTORE WITH RECOVERY)
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 33 of 50

Database Backup (MS-SQL Server)
If transaction logs are indicated, these are already loaded with Restore. If possible, use the first restore
method.
Do not leave the database operational and do not execute a rollback for transactions without
commit. Additional transaction logs can be restored. (RESTORE WITH NORECOVERY)
If additional transaction logs are available, e.g. the last transaction log created manually. The recovery
instruction must then be given manually.
Leave database in write-protected mode. Transactions without commit are reversed, the reversal
actions, however, are saved in a standby file so that the effects of recovery may be reversed.
(RESTORE WITH STANDBY)
This option is used, if you are not sure whether the uploaded status has to be verified first. The
administrator may check the data without restoring the database and without opening it for the users.
If everything is successful, the database has been restored successfully.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 34 of 50

Database Backup (MS-SQL Server)
Restore with transaction log backup
Please note: At the time of restore, no user must be connected to the database. All HYDRA services must
be terminated so that a database backup may be loaded.
 Open SQL Server Management Studio
 Extend the SQL server instance (server name\HYDMS1) needing a backup in the Object
Explorer.
 Extend the Databases group, make a right mouse button click on the HYDRA1 database, go to
Tasks and then to Restore. Now click on Restore database.
SQL Server now shows the current backups known to the system. In the given example, these are a
complete Data backup and a Transaction log backup for the selected HYDRA1 database. In the
example, both components are selected, the existing transaction log is loaded.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 35 of 50

Database Backup (MS-SQL Server)
In this example, the database recovery is indicated with the option Latest possible time. Depending on
the error case, another option has to be indicated here (e.g. time-based or date-related).
If the backup record is requested to be restored from another medium (e.g. a hard drive), and the backup
record is not recognized by SQL Server as the backup instance automatically, the procedure described in
item 4.4 is to be followed.
By means of the Options part of the Restore database dialog field, you may enter additional options to
restore a database.
Overwrite the existing database
This specifies that all existing databases and the related files are overwritten in the restore
process, even if a database or file with the same name exists already.
Retain replication settings (not to be used for HYDRA1 database)
This retains the replication settings, if a published database is restored on a server where the
database was not created.
Confirmation before recovery of individual backup
This requires a confirmation from the user with each backup record, before restore is started.
This option is particularly helpful if you have to change the tapes for various media records, e.g. if
the server has only one tape device.
Restrict access to restored database
 Restricted mode (no user access possible)
Only allows members of db_owner, dbcreator or sysadmin to access the restored database.
This option corresponds to the option RESTRICTED_USER in a transact SQL RESTORE
instruction.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 36 of 50

Database Backup (MS-SQL Server)
Enter the name of the database to be restored in the field Target to be restored as database, if it
deviates from the default, or select the name. If you wish to restore the database under a new name, you
enter the new name of the database.
Select the backup record from where you intend to restore the database from Recovery source. In this
method, the transaction log must also be indicated.
You may optionally click on the Options tab and execute the following actions:
Click on Do not leave the database operational and do not execute a rollback for transactions without
commit. Additional transaction logs can be restored (RESTORE WITH NORECOVERY).
If the backup record is to be taken from another medium, this medium has to be selected first. (See
section 4.4)
You may optionally click on the Options tab and execute the following actions:
Set the recovery option Overwrite the existing database, if the database (HYDRA1) still exists.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 37 of 50

Database Backup (MS-SQL Server)
Leave the database operational by executing a rollback for transactions without commit.
Additional transaction logs cannot be restored. (RESTORE WITH RECOVERY)
If transaction logs are indicated, these are already loaded with Restore. If possible, use the first restore
method.
Do not leave the database operational and do not execute a rollback for transactions without
commit. Additional transaction logs can be restored. (RESTORE WITH NORECOVERY)
If other transaction logs are available (e.g. the latest transaction log created manually), the recovery
instruction must be given manually.
Leave database in write-protected mode. Transactions without commit are reversed, the reversal
actions, however, are saved in a standby file so that the effects of recovery may be reversed.
(RESTORE WITH STANDBY)
This option is used, if you are not sure whether the uploaded status has to be verified first. The
administrator may check the data without restoring the database or opening it for the users.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 38 of 50

|     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | -------------------------------- | --- |

If everything is successful, the database has been restored successfully.

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     | Page 39 of 50  |
| ------------------------ | --- | ------------------ | --- | -------------- |

Database Backup (MS-SQL Server)
Loading a transaction log after restore by using the option
RESTORE WITH NORECOVERY
After the database has been restored (RESTORE WITH NORECOVERY), the transaction log is now
restored. As shown in the figure below, the database remains in the "restored" status until the transaction
log backup is completed.
Now the existing transaction log backup of the database is loaded as an additional step.
SERVERNAMEDatabasesHYDRA1right mouse button Tasks 
RestoreTransaction log
Select the menu item Transaction log in the field Restore. 'Transaction log' has to be selected in
'Backup record'.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 40 of 50

Database Backup (MS-SQL Server)
After clicking on the OK button, the following screen opens (recovery progress). The duration of the
database recovery depends on the size of the database.
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 41 of 50

Database Backup (MS-SQL Server)
Restore from another medium
Selection of device
Indicate storage location of backup
The options must be set even if indicated by the medium
Restore individual files or file groups
SERVERNAMEDatabasesHYDRA1right mouse button Tasks  Restore
Files or file groups
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 42 of 50

Database Backup (MS-SQL Server)
SQL Server now shows the current files known to the system. In the given example, these is a complete
backup of all table spaces of the HYDRA1 database. The file to be restored (e.g. CAQDBS) may be
indicated here now.
In this example, the database recovery is indicated with the option Latest possible time. Depending on
the error case, another option has to be indicated here (e.g. time-based or date-related).
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 43 of 50

Database Backup (MS-SQL Server)
Restore on a new SQL Server installation
It is possible that a database is to be loaded to another hardware, e.g. after a hard drive crash. The
problem with this is that the drives or directories may not have the same structure on the new host. If the
directory structure is indicated when loading the database, the database may also be loaded on new
hardware.
Example: Backup file from the existing productive server hydra1.bak
Step 1: Copy backup file to a new server
In the first step, the backup file is copied to a drive of the new server.
Step 2: Restore database
In the next step, the database is restored with SQL Server Management Studio.
SERVERNAMEDatabasesright mouse buttonRestore database
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 44 of 50

|     |     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

| Database:  | hydra1  |     |   OK  |     |     |
| ---------- | ------- | --- | ----- | --- | --- |

Indicate source  From Medium

Select backup file: e.g. hydra1.bak

The indicated data record can now be selected.

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     |     | Page 45 of 50  |
| ------------------------ | --- | ------------------ | --- | --- | -------------- |

Database Backup (MS-SQL Server)
All file names can now be indicated manually in the Files tab. The directory
structure must exist, the files themselves do not have to exist. (e.g. file name:
tabdbs Restore as
E:\SQLServer\MSSQL11.HYDMS1\MSSQL\DATA\tabdbs_Data.NDF)
Step 3: Set rights for user hydadm
After loading the hydra1 database via the backup file, the database user hydadm must be assigned to an
SQL Server log on name via the saved procedure sp_change_users_login. This is achieved by the
following command:
sp_change_users_login 'update_one', 'hydadm', 'hydadm'
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 46 of 50

Database Backup (MS-SQL Server)
Step 4: Create the user-specific data types
The user-specific data types generated when the HYDRA database is created must now be renewed in a
separate step.
Copy template:
/**** Create the user-specific data types ****/
EXEC sp_addtype hydate, datetime, 'NULL'
GO
EXEC sp_addtype smallfloat, real, 'NULL'
GO
/**** Create the user-specific data types, also in MODEL DB ****/
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 47 of 50

Database Backup (MS-SQL Server)
USE model
EXEC sp_addtype hydate, datetime, 'NULL'
GO
EXEC sp_addtype smallfloat, real, 'NULL'
GO
/**** Create the user-specific data types in DB hydra1 and tempdb ****/
USE hydra1
EXEC sp_addtype hydate, datetime, 'NULL'
GO
EXEC sp_addtype smallfloat, real, 'NULL'
GO
USE tempdb
EXEC sp_addtype hydate, datetime, 'NULL'
GO
EXEC sp_addtype smallfloat, real, 'NULL'
GO
SIS-DBB_30_SQL2012.docx Version: 1.1.6691 Page 48 of 50

|     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | -------------------------------- | --- |

Show process of a maintenance plan
SERVERNAMEAdministrationMaintenance plans right mouse button View
history

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     | Page 49 of 50  |
| ------------------------ | --- | ------------------ | --- | -------------- |

|     |     |     | Database Backup (MS-SQL Server)  |     |
| --- | --- | --- | -------------------------------- | --- |

| SIS-DBB_30_SQL2012.docx  |     | Version: 1.1.6691  |     | Page 50 of 50  |
| ------------------------ | --- | ------------------ | --- | -------------- |
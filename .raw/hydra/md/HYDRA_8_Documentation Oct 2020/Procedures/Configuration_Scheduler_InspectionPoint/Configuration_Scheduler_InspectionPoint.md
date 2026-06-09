                                     1Configuration  of  scheduler  entry  for  the  generation  of  inspection

points

1  Configuration of scheduler entry for the generation of

inspection points

Purpose

Using the scheduler, you can define for the generated inspection points whether the inspection interval type

is based on time or on piece.

Requirements

None

Procedure

Create the scheduler job in the MOC in the application Scheduler. To call the Scheduler, go to:

System administration  System settings  Scheduler

Configure the scheduler entry for the generation of inspection points as follows:

Fields in tab Command:

  Type = Standard

  Type = Interval

  Visible = Visible

  Product key = empty

  Active = yes

  License key = empty

  HYDRA User = 0

  Command = sh.exe ./hyqmsipcr.scr

  Commentary = Creation of inspection points

Also configure the interval for the scheduler job. To do so, go to tab Interval:

You must restart the HYDRA scheduler service, if you want to use the scheduler job immediately.

In the HYDRA standard, the scheduler checks approx. every 30 minutes if new entries are available in the

scheduler. If new entries are available, the entries are called at regular intervals (according to configuration).

If you do not restart the scheduler, it can take up to 30 minutes until HYDRA identifies the new scheduler

job.

Configuration_Scheduler_InspectionPoint.docxVersion: 1.0.10710

Page 1 of 2

                                     1Configuration  of  scheduler  entry  for  the  generation  of  inspection

points

Result

Using the scheduler process, you automatically generate inspection points and you define if the generation

is based on time or piece.

Configuration_Scheduler_InspectionPoint.docxVersion: 1.0.10710

Page 2 of 2


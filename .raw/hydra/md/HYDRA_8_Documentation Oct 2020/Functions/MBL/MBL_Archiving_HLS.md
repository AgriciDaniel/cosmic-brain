Configurations specific to HLS

1  Configurations specific to HLS

Summary

The  HYDRA  Data  Management  can  be  used  to  configure  the  retention  period  for  HLS  planning  data

relevant to uploads (plan, remove from the plan, re-plan operations) and individual shift/assignment times.

Configuration

In  this  case,  configuration  is  performed  using  the  HYDRA  Data  Management.  This  program  is  started

from the central archiving script hyarc.scr. This program is planned to be run on a daily basis within the

Scheduler by default.

Those  data  will  be  deleted  the  "retention  period"  of  which  (see  values  in  the  below  table)  has  been

exceeded.

Please note: it is not planned to transfer data to archive tables.

Product  Object

Object designation

Transfer

HLS

HLSLOG

HLS

PERS_SHIFT

HLS planning data relevant
to uploads
(plan, replan, deallcoate
operations)
Individual shift/assignment
times for planning

Data is deleted within the
online dataset.
Data is not transferred to the
medium-term dataset.
Data is deleted within the
online dataset.
Data is not transferred to the
medium-term dataset.

Default
interval
35 days

35 days

Deletion by hy_cron.sql

Subject  to  the  given  characteristics,  individual  shift/assignment  times  are  still  deleted  using  the  script

hy_cron.sql or the HYDRA Data Management is already used for this purpose.

To determine which archiving type is in use, check (you or your system administrator) whether or not the

script hy_cron.sql includes the below entry within the HYDRA directory on the HYDRA server:

delete from hls_pers_schichtm where bearb_date < today - 35;

If this is the case, archiving is still performed by the separate deletion script hy_cron.sql.

If the entry does not exist or is commented out by inputting "#" in front of each line, archiving is performed

using the HYDRA Data Management (see above).

MBL_Archiving_HLS.docx

Version: 1.1.18468

Page 1 of 1


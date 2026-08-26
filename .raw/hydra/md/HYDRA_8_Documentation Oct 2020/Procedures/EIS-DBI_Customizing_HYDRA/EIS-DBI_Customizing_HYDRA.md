HYDRA configurations relevant to applications

1  HYDRA configurations relevant to applications

Deactivation of outbound processing (general)

In most instances HYDRA outbound processing consists of two stages:

  Supply of uploads/confirmations from the data model into MLE outbound transactions

Specialized  programs  (e.g.  myerprck.exe/out)  normally  provide  the  data  using  cyclic  jobs.  This

results in open data segments in MLE outbound transactions.

The  corresponding  interface  descriptions  specify  the  configurations  required  for  carrying  out

these jobs.

These jobs must still be active even if the database-based interface is in use.

  Export of provided uploads/confirmations (to the file system / SAP)

The export program "hysapupl.exe/out" is mostly used in order to export the provided, open data

segments.  In  the  majority  of  cases  the  export  program  is  directly  started  via  the  HYDRA

Scheduler. But sometimes it can also be started differently.

Starting  of  the  export  program  must  be  disabled,  provided  that  data  is  transferred  via  the

database-based interface instead of exporting it to SAP or the file system.

The  documentation  dealing  with  the  relevant  interface  describes  how  the  export  program  is

started.

Disable processing for the EIS-ERP interface (Windows)

The export program hysapupl.exe/out for the EIS-ERP interface is not started via the Scheduler but via a

script. Proceed as follows if Windows is used as server operating system:

  Copy  the  supplied  script  myerprck.scr  from  the  HYDRA  directory  of  the  HYDRA  server  to  the

customer namespace u_myerprck.scr.

  Open the script u_myerprck.scr and change starting of "hysapupl.exe" as follows:

Previously:

# Starting the upload to generate the upload file HY72ADRCK_TIMETICKET.ASV for
standard uploads/confirmations.

if [ `hyliz.exe -r HYD-ESK` -gt 0 ]

then

EIS-DBI_Customizing_HYDRA.docx

Version: 1.0.18468

Page 1 of 3

HYDRA configurations relevant to applications

hysapupl.exe /UPLSEGNAM=HY72ADRCK_TIMETICKET

fi

Afterwards:

## Starting the upload to generate the upload file HY72ADRCK_TIMETICKET.ASV for
standard uploads/confirmations.

#if [ `hyliz.exe -r HYD-PPS` -gt 0 ]

#then

#

hysapupl.exe /UPLSEGNAM=HY72ADRCK_TIMETICKET

#fi

  Use  the  customized  script  in  order  to  start  the  interface  in  the  HYDRA  Scheduler.  For  this

purpose, identify the Scheduler entry meeting the following conditions:

Parameter name

Product key

License key

Value

HYD-PPS

HYD-PPS

Command (prior to the modification)

sh.exe ./myerprck.scr /MESTYP=HY72ADRCK_TT

Command (after the modification)

sh.exe ./u_myerprck.scr

/MESTYP=HY72ADRCK_TT

Comment

Standard ADE confirmations/uploads for PPS (only

if HYD-PPS)

Disable processing for the EIS-ERP interface (Linux)

The export program hysapupl.exe/out for the EIS-ERP interface is not started via the Scheduler but via a

script. Proceed as follows if Linux is used as server operating system:

  Copy  the  supplied  script  myerprck.scr  from  the  HYDRA  directory  of  the  HYDRA  server  to  the

customer namespace u_myerprck.scr.

  Open the script u_myerprck.scr and change starting of "hysapupl.out" as follows:

Previously:

# Starting the upload to generate the upload file HY72ADRCK_TIMETICKET.ASV for
standard uploads/confirmations.

if [ `hyliz.out -r HYD-PPS` -gt 0 ]

EIS-DBI_Customizing_HYDRA.docx

Version: 1.0.18468

Page 2 of 3

HYDRA configurations relevant to applications

then

hysapupl.out /UPLSEGNAM=HY72ADRCK_TIMETICKET

fi

Afterwards:

## Starting the upload to generate the upload file HY72ADRCK_TIMETICKET.ASV for
standard uploads/confirmations.

#if [ `hyliz.out -r HYD-PPS` -gt 0 ]

#then

#

hysapupl.out /UPLSEGNAM=HY72ADRCK_TIMETICKET

#fi

  Use  the  customized  script  in  order  to  start  the  interface  in  the  HYDRA  Scheduler.  For  this

purpose, identify the Scheduler entry meeting the following conditions:

Parameter name

Product key

License key

Value

HYD-PPS

HYD-PPS

Command (prior to the modification)

./myerprck.scr /MESTYP=HY72ADRCK_TT

Command (after the modification)

./u_myerprck.scr

/MESTYP=HY72ADRCK_TT

Comment

Standard ADE confirmations/uploads for PPS (only

if HYD-PPS)

EIS-DBI_Customizing_HYDRA.docx

Version: 1.0.18468

Page 3 of 3


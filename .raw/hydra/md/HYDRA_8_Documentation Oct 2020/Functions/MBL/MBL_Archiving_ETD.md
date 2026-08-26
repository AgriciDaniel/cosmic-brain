Configurations specific to ETD

1  Configurations specific to ETD

Summary

Using the HYDRA data management it can be specified how long data is to be kept for the label reprint.

Archiving

Data for reprinting labels is archived after defined periods. The central archiving script hyarc.scr triggers

the archiving process. This program is planned to be run on a daily basis within the Scheduler by default.

Subject to the given characteristics, archiving is performed either by the archiving program hyarc.scr (by

deleting data directly from the database) or by the HYDRA Data Management.

How can I find out which archiving type is in use?

Check (you or your system administrator) whether or not the script hyarc.scr within the HYDRA directory

on the HYDRA server includes the below entry:

# HYD-ETD label reprint deletion script

if [ `hyliz.exe -r HYD-ETD` -gt 0 -o `hyliz.exe -r HYD-ETDRT` -gt 0 ]

then

  echo "HYD-ETD:" >> $ERRPATH/hyarc.pro

  hysql.exe -u -s 14 db_sql/hy_ettd.sql > $ERRPATH/hy_ettd.pro

  cat $ERRPATH/hy_ettd.pro >> $ERRPATH/hyarc.pro

fi

If this is the case, archiving is still performed by the separate archiving program.

If the entry does not exist or is commented out by inputting "#" in front of each line or calling hysql has

been replaced by hymwarc, archiving is performed using the HYDRA Data Management.

Archiving using data management - configuration

In this case, configuration is made using the HYDRA Data Management.

Product

Object

Object designation

Transfer

ETD

PRN_LOG

Label reprint

Online data
 data is deleted (no
transfer to the medium-
term dataset)

Default
interval
15 days

MBL_Archiving_ETD.docx

Version: 1.1.18468

Page 1 of 1


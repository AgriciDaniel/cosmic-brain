Escalation Management Archiving
1 Escalation Management Archiving
Archiving
Escalation management events are archived after defined periods. The central archiving script hyarc.scr
triggers the archiving process. This program is planned to be run on a daily basis within the Scheduler by
default.
Subject to the given characteristics, archiving is performed either by the archiving program
hyeskarc.exe/out or by HYDRA Data Management.
How can I find out which archiving type is in use?
Check (you or your system administrator) whether or not the script hyarc.scr within the HYDRA directory
on the HYDRA server includes the below entry:
# from hyeskarc.scr
# ESK deletion script (only if HYD-ESK)
if [ `hyliz.exe -r HYD-ESK` -gt 0 ]
then
echo "HYD-ESK:" >> $ERRPATH/hyarc.pro
hyeskarc.scr "ESK:D=7|ESK:A=M|A_ESK:D=30|A_ESK:A=X"
cat $ERRPATH/hyeskarc.pro >> $ERRPATH/hyarc.pro
fi
If this is the case, archiving is still performed by the separate archiving program hyeskarc.exe/out.
If the entry does not exist or is commented out by inputting "#" in front of each line, archiving is performed
based on HYDRA Data Management.
Archiving by hyeskarc.exe/out
This program is started from the central archiving script hyarc.scr. This program is planned to be run on a
daily basis within the Scheduler by default.
By default, archiving of the escalation management module is configured as follows:
Option Value
Activity for data included in the online area Archiving
(ESK:A=)
MBL_ESK_Archiving.docx Version: 1.2.18468 Page 1 of 2

|     |     |     |     |     | Escalation Management Archiving  |     |
| --- | --- | --- | --- | --- | -------------------------------- | --- |

| Option                                            |     |     |     | Value   |     |     |
| ------------------------------------------------- | --- | --- | --- | ------- | --- | --- |
| Retention period within the online area (ESK:D=)  |     |     |     | 7 days  |     |     |
Export to file
| Activity  | for  data  included  | in  the  archive  | area  |     |     |     |
| --------- | -------------------- | ----------------- | ----- | --- | --- | --- |
(A_ESK:A)
| Retention  | period  within  | the  archive  | area  | 30 days  |     |     |
| ---------- | --------------- | ------------- | ----- | -------- | --- | --- |
(A_ESK:D)
Archiving using Data Management
In  this  case,  configuration  is  made  using  the  HYDRA  Data
Management..\..\functions\moc\MOC_DataManagement.pdf.  Archiving  is  still  started  by  the  hyarc.scr
script.
When transferring data into archive tables, such data is taken over the “retention period” of which
(number in days/months/years; see values in brackets in the below table) has been exceeded.
Product  Object  Object designation  Transfer  Default interval
| HYD-ESK  | ESK  | Escalations  |     | Online stock  |     | 7 days  |
| -------- | ---- | ------------ | --- | ------------- | --- | ------- |
 medium-term archive
HYD-ESK  A_ESK  Long-term archiving:  Medium-term  archive  30 days
|     |     | Escalations  |     |  Long-term archive  |     |     |
| --- | --- | ------------ | --- | -------------------- | --- | --- |

| MBL_ESK_Archiving.docx  |     |     | Version: 1.2.18468  |     |     | Page 2 of 2  |
| ----------------------- | --- | --- | ------------------- | --- | --- | ------------ |
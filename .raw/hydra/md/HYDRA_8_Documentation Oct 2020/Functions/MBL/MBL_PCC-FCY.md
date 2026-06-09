|     |     |     |     | PCC-DNCFICPY Log Module  |     |
| --- | --- | --- | --- | ------------------------ | --- |

1  PCC-DNCFICPY Log Module
| 1.1               | DNC Driver for Filecopy       |                   |     |     |     |
| ----------------- | ----------------------------- | ----------------- | --- | --- | --- |
| Driver name:      |   dncficpy.dll                |                   |     |     |     |
| INI file:         |   dncficpy.ini                |                   |     |     |     |
| Current version   | 7.2.2.5                       | as of 01/21/2013  |     |     |     |
| 1.2               | Configuration in pccdll.ini   |                   |     |     |     |
The element is registered in the PCCDLL.INI file:
driver=dncficpy.dll
Example:
[SERVICE]
tracing=1
ShowErrorWindow=0

[DRIVER_1]
driver=DNCFICPY.DLL

| 1.3  | Configuration in "dncficpy.ini" File   |     |     |     |     |
| ---- | -------------------------------------- | --- | --- | --- | --- |
Example configuration: for machines 4711 and 9999
| 1.3.1      | Section [SERVICE]  |     |     |     |     |
| ---------- | ------------------ | --- | --- | --- | --- |
| [SERVICE]  |                    |     |     |     |     |
info=dncficpy.dll
| intervall=500  |                                   |     |     |     |     |
| -------------- | --------------------------------- | --- | --- | --- | --- |
| testmode=0     |                                   |     |     |     |     |
| tracing=1      |   ;;activation of trace outputs.  |     |     |     |     |
TraceLevel=5    ;; Tracelevel (5) is suitable for output into a log file.
ExecuteQueue=0
DNCProtokoll=ON

| MBL_PCC-FCY.docx  |     | Version: 1.0.1362  |     |     | Page 1 of 4  |
| ----------------- | --- | ------------------ | --- | --- | ------------ |

|     |     |     | PCC-DNCFICPY Log Module  |     |
| --- | --- | --- | ------------------------ | --- |

| 1.3.2  | Section [port x]  |     |     |     |
| ------ | ----------------- | --- | --- | --- |
Within the driver, communication ports may be formed. Usually, one port is defined for each machine
connected. The section names may be selected deliberately.
| [DNC001]  | ;;(name of first group)  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
;;DNCTIMEOUT=300
TIMEOUT-DELETE-DOWNLFILES=10
UPL-SOURCE-EXT=nc
UPL-DEST-EXT=opt
CLR_AFTER_DOWNLOAD=OFF

;; for Upload: Configuration of separate machine directories  ;;  available  as  from  version
7.2.2.2.
UPL-PATH_4711=d:\dnc\opt-4711\
UPL-PATH_9999=d:\dnct\opt-9999\
If a separate upload directory exists for a machine, when an upload takes place the file interface expects
to find the machine file for an upload in this directory.

| ;; for Download/Upload:  |     |     |     |     |
| ------------------------ | --- | --- | --- | --- |
;; this configuration must always exist for each machine. (Standard)
| D:DNC_4711=d:\dnc_PathMaschine4711\  |     |     |     |     |
| ------------------------------------ | --- | --- | --- | --- |
| D:DNC_9999=d:\dnc_PathMaschine9999\  |     |     |     |     |

Meaning of IDs:
The ID for the DNC path assignment must always be entered as follows  D:DNC_machine  number
|   (in the example D:DNC_4711, the machine number is 4711)  |     |     |     |     |
| ---------------------------------------------------------- | --- | --- | --- | --- |

| MBL_PCC-FCY.docx  |     | Version: 1.0.1362  |     | Page 2 of 4  |
| ----------------- | --- | ------------------ | --- | ------------ |

PCC-DNCFICPY Log Module
d:\dnc_PathMaschine4711\ is the directory for data exchange with the machine
D:DNC_4711=d:\dnc_PathMaschine4711\
;; Polling
POLL=0 No polling must be activated
POLL_I=1000
No deletion of files in machine directory:
If the DNC file in the CTWIN directory is not to be deleted upon transfer to the machine directory, this can
be achieved by the following parameter:
CLR_AFTER_DOWNLOAD=OFF
Deletion of files in machine directory:
Files in the machine directory are deleted after x minutes (in this example: 10 minutes). The time is
indicated in minutes.
It must be ensured that the machine has read and processed the files in this period. If the parameter does
not exist, the files are not deleted in the machine directory.
TIMEOUT-DELETE-DOWNLFILES=10
File extension of the DNC files, written by the machine, in the machine directory.
UPL-SOURCE-EXT=nc
DNC file extension with which the files are stored in the terminal directory by the driver.
UPL-DEST-EXT=opt
MBL_PCC-FCY.docx Version: 1.0.1362 Page 3 of 4

|     |     |     | PCC-DNCFICPY Log Module  |     |
| --- | --- | --- | ------------------------ | --- |

Download file extension of DNC files with which the files are stored in the machine directory by
| the driver.  |     |     |     |     |
| ------------ | --- | --- | --- | --- |
DOWN-DEST-EXT=mpf

| MBL_PCC-FCY.docx  |     | Version: 1.0.1362  |     | Page 4 of 4  |
| ----------------- | --- | ------------------ | --- | ------------ |
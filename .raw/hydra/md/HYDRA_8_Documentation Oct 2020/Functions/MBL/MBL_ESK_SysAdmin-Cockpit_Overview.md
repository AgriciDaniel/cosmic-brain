|     |     |     |     | Escalations for System Administrators  |     |     |
| --- | --- | --- | --- | -------------------------------------- | --- | --- |

1  Escalations for System Administrators
1.1  HYDRA 8 MES Weaver 3.0/3.1
HYDRA 8 MES Weaver 3.0/3.1 provides the following escalations:
| Event  |     | Description  | Identifiers  | Description  | Notes  |     |
| ------ | --- | ------------ | ------------ | ------------ | ------ | --- |
TNR.OFFLINE  Terminal is offline  TNR.TNR  Terminal number  The  event  is
triggered if the time
|     |     |     | TNR.BEZL  | Terminal name  |     |     |
| --- | --- | --- | --------- | -------------- | --- | --- |
since the terminal's
|     |     |     | TNR.BEZK  | Terminal location  | last status message  |     |
| --- | --- | --- | --------- | ------------------ | -------------------- | --- |
(signal) exceeds the
|     |     |     | TNR.ZYKL:I  | Time in seconds that  |                |      |
| --- | --- | --- | ----------- | --------------------- | -------------- | ---- |
|     |     |     |             |                       | target  cycle  | for  |
has passed since the
status messages.
|     |     |     |     | last  status  | message  |     |
| --- | --- | --- | --- | ------------- | -------- | --- |
(signal).
|     |     |     | TNR.ZYKL:S  | Target  | cycle  for  |     |
| --- | --- | --- | ----------- | ------- | ----------- | --- |
messages (signals) in
seconds
DB.INCREMENT_TOO_LAR Fill  level  of  table  DB.INC:GR  Increase in percent  The  event  is
GE  spaces too large  DB.INC:TG  Period considered  triggered  if  the  fill
level of single files /
|     |     |     |     |     | table  spaces  | has  |
| --- | --- | --- | --- | --- | -------------- | ---- |
|     |     |     |     |     | increased      | by   |
<DB.INC:GR> within
the last few days.
FILESYS.FILL_LEVEL_EXCE Fill level of the drive  FILESYS.FILESYS  File system
| EDED  |     | exceeded  |                   |                          |     |     |
| ----- | --- | --------- | ----------------- | ------------------------ | --- | --- |
|       |     |           | FILESYS.SUM       | File system size         |     |     |
|       |     |           | FILESYS.SUM:EINH  | Unit of file size        |     |     |
|       |     |           | FILESYS.FREE      | Free disk space          |     |     |
|       |     |           | FILESYS.FREE:EIN  | Unit of free disk space  |     |     |
H
|     |     |     | FILESYS.FREE:PRO | Free  disk        | space  in   |     |
| --- | --- | --- | ---------------- | ----------------- | ----------- | --- |
|     |     |     | Z                | percent           |             |     |
|     |     |     | FILESYS.USED     | Used disk space   |             |     |
|     |     |     | FILESYS.USED:EIN | Unit  of          | used  disk  |     |
|     |     |     | H                | space             |             |     |
|     |     |     | FILESYS.USED:PRO | Used  disk        | space  in   |     |
|     |     |     | Z                | percent           |             |     |
|     |     |     | FILESYS.USEDGR:P | Limit in percent  |             |     |
ROZ
DB.FILL_LEVEL_EXCEEDE Fill  level  of  database  DB.DBSPACE  File  group  /  table  The  event  is
| D   |     | file  groups/table  |            | space              | triggered  if   | the  fill  |
| --- | --- | ------------------- | ---------- | ------------------ | --------------- | ---------- |
|     |     | spaces exceeded     |            |                    | level  of  one  | or         |
|     |     |                     | DB.DBSNUM  | Number (Informix)  |                 |            |
several table spaces
|     |     |     | DB.NCHUNKS  | Number      | of  chunks     |        |
| --- | --- | --- | ----------- | ----------- | -------------- | ------ |
|     |     |     |             |             | exceeds  the   | value  |
|     |     |     |             | (Informix)  | <DB.USEDGR:PRO |        |
Z>.
|     |     |     | DB.SUM        | Size                     |            |     |
| --- | --- | --- | ------------- | ------------------------ | ---------- | --- |
|     |     |     | DB.SUM:EINH   | Size unit                |            |     |
|     |     |     | DB.FREE       | Free disk space          |            |     |
|     |     |     | DB.FREE:EINH  | Unit of free disk space  |            |     |
|     |     |     | DB.FREE:PROZ  | Free  disk               | space  in  |     |
percent
|     |     |     | DB.USED  | Used disk space  |     |     |
| --- | --- | --- | -------- | ---------------- | --- | --- |

MBL_ESK_SysAdmin-Cockpit_Overview.docxVersion: 2.2.19415  Page 1 of 3

|     |     |     |     | Escalations for System Administrators  |     |
| --- | --- | --- | --- | -------------------------------------- | --- |

| Event  |     | Description  | Identifiers   | Description     | Notes  |
| ------ | --- | ------------ | ------------- | --------------- | ------ |
|        |     |              | DB.USED:EINH  | Unit  of  used  | disk   |
space
|     |     |     | DB.USED:PROZ  | Used  disk  space  | in  |
| --- | --- | --- | ------------- | ------------------ | --- |
percent
|     |     |     | DB.USEDGR:PROZ  | Limit in percent  |     |
| --- | --- | --- | --------------- | ----------------- | --- |
|     |     |     |                 |                   |     |

MBL_ESK_SysAdmin-Cockpit_Overview.docxVersion: 2.2.19415  Page 2 of 3

|     |     |     |     | Escalations for System Administrators  |     |
| --- | --- | --- | --- | -------------------------------------- | --- |

| 1.2  HYDRA 8 MES Weaver 4.0 |     |     |     |     |     |
| --------------------------- | --- | --- | --- | --- | --- |
pe
HYDRA 8 MES Weaver 4.0 pe  provides the escalations described in section 1.1 HYDRA 8 MES Weaver
3.0/3.1 and the following escalations:
| Event  |     | Description  | Identifiers  | Description  | Notes  |
| ------ | --- | ------------ | ------------ | ------------ | ------ |
LOGIN.FAILED  Failed login  LOGIN.USER  User name of login  The  event  is
triggered every time
|     |     |     | LOGIN.DATE  | Login date  |     |
| --- | --- | --- | ----------- | ----------- | --- |
a login fails.
|     |     |     | LOGIN.TIME  | Login time in seconds  |     |
| --- | --- | --- | ----------- | ---------------------- | --- |
since midnight.
|     |     |     | LOGIN.R_IP    | Client IP (remote IP)   |     |
| --- | --- | --- | ------------- | ----------------------- | --- |
|     |     |     | LOGIN.R_HOST  | Client host name or IP  |     |
(remote host name if
available)
|     |     |     | LOGIN.DEV_ID  | Device ID of the client  |     |
| --- | --- | --- | ------------- | ------------------------ | --- |
(identical to the IP for
REST clients, identical
to the computer name
for SOAP clients)
|     |     |     | LOGIN.AUTH_TYPE  | Type of login attempt:  |     |
| --- | --- | --- | ---------------- | ----------------------- | --- |
USER_PASSWORD
or
PIN_LOGIN
or
|     |     |     |     | SSO  (Simple  Single  |     |
| --- | --- | --- | --- | --------------------- | --- |
Sign On)
or
|     |     |     |     | ADI  (Active  Directory  |     |
| --- | --- | --- | --- | ------------------------ | --- |
Integration)
|     |     |     | LOGIN.RETURNVAL | Type of failed login:  |     |
| --- | --- | --- | --------------- | ---------------------- | --- |
|     |     |     | UE              | USER_LOCKED            |     |
or
USER_NOT_FOUND
or
PASSWORD_WRON
G

MBL_ESK_SysAdmin-Cockpit_Overview.docxVersion: 2.2.19415  Page 3 of 3
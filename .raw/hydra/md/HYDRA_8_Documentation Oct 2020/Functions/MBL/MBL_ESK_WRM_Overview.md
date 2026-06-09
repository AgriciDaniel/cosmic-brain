|     |     |     |     |     | Verfügbare Eskalationen  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

1  Available Escalations
| 1.1  | Maintenance limit exceeded (RESWART.LIMIT_EXCEEDED)  |     |     |     |     |     |
| ---- | ---------------------------------------------------- | --- | --- | --- | --- | --- |
The cyclic program for maintenance monitoring triggers an escalation as soon as a maintenance limit has
been exceeded.
| Event                   |     | IDs             |     | Description                  |     |     |
| ----------------------- | --- | --------------- | --- | ---------------------------- | --- | --- |
| RESWART.LIMIT_EXCEEDED  |     | RESWART.RESTYP  |     | Resource type                |     |     |
|                         |     | RESWART.RES     |     | Resource no.                 |     |     |
|                         |     | RESWART.BEZ     |     | Maintenance                  |     |     |
|                         |     | RESWART.WARTKL  |     | Class                        |     |     |
|                         |     | RESWART.WART:N  |     | Value of next maintenance    |     |     |
|                         |     | RESWART.WART:I  |     | Actual value                 |     |     |
|                         |     | RESWART.WARTNR  |     | Achieved threshold: 1, 2, 3  |     |     |
|                         |     | RESWART.ART     |     | Maintenance type             |     |     |

| 1.2  | Resource has been created automatically.  |     |     |     |     |     |
| ---- | ----------------------------------------- | --- | --- | --- | --- | --- |
(RES.INSERT_AUTO)
This event is triggered if a component is assigned as production resource and tool to an operation, this
component does not yet exist in HYDRA-WRM and the "automatic creation" option is enabled for the
resource type in HYDRA-WRM.
| Event            |     | IDs      |     | Description    |     |     |
| ---------------- | --- | -------- | --- | -------------- | --- | --- |
| RES.INSERT_AUTO  |     | RES.TYP  |     | Resource type  |     |     |
|                  |     | RES.RES  |     | Resource no.   |     |     |

| 1.3  | Resource status has changed (RES.STATUS_CHANGED)  |     |     |     |     |     |
| ---- | ------------------------------------------------- | --- | --- | --- | --- | --- |
This event is triggered every time the status of a resource changes.
| Event               |     | IDs         |     | Description      |     |     |
| ------------------- | --- | ----------- | --- | ---------------- | --- | --- |
| RES.STATUS_CHANGED  |     | RES.RESTYP  |     | Resource type    |     |     |
|                     |     | RES.RES     |     | Resource no.     |     |     |
|                     |     | RES.RESSTA  |     | Resource status  |     |     |

| MBL_ESK_WRM_Overview.docx  |     | Version: 1.0.14996  |     |     |     | Page 1 of 2  |
| -------------------------- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     |     | Verfügbare Eskalationen  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| 1.4  | Maintenance has been reset for resource  |     |     |     |     |     |
| ---- | ---------------------------------------- | --- | --- | --- | --- | --- |
(RES.MAINTENANCE_RESET)
This event is triggered every time a resource maintenance is reset.
| Event                  |     | IDs              |     | Description         |     |     |
| ---------------------- | --- | ---------------- | --- | ------------------- | --- | --- |
| RES.MAINTENANCE_RESET  |     | RES.TYP          |     | Resource type       |     |     |
|                        |     | RES.RES          |     | Resource no.        |     |     |
|                        |     | RES.BEM          |     | Comment             |     |     |
|                        |     | RESWART.VERWEIS  |     | Maintenance number  |     |     |

Please note
This escalation supports the additional placeholders MSGPRIO, MSGCLASS and MSGRCV. These
placeholders are described in the basic documentation dealing with escalations.
| 1.5  | Measure/comment has been entered for resource  |     |     |     |     |     |
| ---- | ---------------------------------------------- | --- | --- | --- | --- | --- |
(RES.REGISTER_MEASURE)
This event is triggered every time a measure/comment is entered for a resource.
| Event                 |     | IDs         |     | Description            |     |     |
| --------------------- | --- | ----------- | --- | ---------------------- | --- | --- |
| RES.REGISTER_MEASURE  |     | RES.TYP     |     | Resource type          |     |     |
|                       |     | RES.RES     |     | Resource no.           |     |     |
|                       |     | RES.BEM     |     | Comment                |     |     |
|                       |     | RES.MASSNR  |     | Number of the measure  |     |     |

Please note
This escalation supports the additional placeholders MSGPRIO, MSGCLASS and MSGRCV. These
placeholders are described in the basic documentation dealing with escalations.

| MBL_ESK_WRM_Overview.docx  |     | Version: 1.0.14996  |     |     |     | Page 2 of 2  |
| -------------------------- | --- | ------------------- | --- | --- | --- | ------------ |
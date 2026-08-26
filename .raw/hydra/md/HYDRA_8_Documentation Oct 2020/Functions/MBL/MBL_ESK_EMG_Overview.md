|     |     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

  Available Escalations
|                                | Events from the performance profile  |                           |          |     |     |     |
| ------------------------------ | ------------------------------------ | ------------------------- | -------- | --- | --- | --- |
| event_id                       |                                      | event_name                |          |     |     |     |
| PPMM.ACTION_LIMIT_EXCEEDED     |                                      | Action limits* exceeded   | EMG 8.1  |     |     |     |
| PPMM.TOLERANCE_LIMIT_EXCEEDED  |                                      | Tolerance limit exceeded  | EMG 8.1  |     |     |     |
* Understood as an "action limit" is the process action limit within the meaning of PDV
| Event  |     | Description  | Identifiers  | Description  | Please note:  |     |
| ------ | --- | ------------ | ------------ | ------------ | ------------- | --- |
PPMM.ACTION_LIMIT_EXCEEDED  Process action limit  MNR.MNR  Machine number  An escalation is triggered by
|     |     | exceeded  | PPMM.MMNR  | Characteristic  | the terminal if a violation of the  |     |
| --- | --- | --------- | ---------- | --------------- | ----------------------------------- | --- |
process action limit is detected.
|     |     |     |     | number  |     |     |
| --- | --- | --- | --- | ------- | --- | --- |

|     |     |     | MM.BEZK  | Characteristic  |     |     |
| --- | --- | --- | -------- | --------------- | --- | --- |
designation
|     |     |     | MM.BEZL  | Characteristic  |     |     |
| --- | --- | --- | -------- | --------------- | --- | --- |
designation
|     |     |     | MM.EINH   | Unit              |     |     |
| --- | --- | --- | --------- | ----------------- | --- | --- |
|     |     |     | PPMM.MW   | Measured value    |     |     |
|     |     |     | PPMM.SW   | Target value      |     |     |
|     |     |     | PPMM.OTG  | Upper  tolerance  |     |     |
limit
|     |     |     | PPMM.UTG  | Lower  tolerance  |     |     |
| --- | --- | --- | --------- | ----------------- | --- | --- |
limit
|     |     |     | PPMM.OPEG  | Upper  process  |     |     |
| --- | --- | --- | ---------- | --------------- | --- | --- |
action limit
|     |     |     | PPMM.UPEG  | Lower  process  |     |     |
| --- | --- | --- | ---------- | --------------- | --- | --- |
action limit
PPMM.TOLERANCE_LIMIT_EXCEEDED  Tolerance  limit  MNR.MNR  Machine number  An escalation is triggered by
|     |     | exceeded  | PPMM.MMNR  | Characteristic  | the terminal if a violation of the  |     |
| --- | --- | --------- | ---------- | --------------- | ----------------------------------- | --- |
tolerance limit is detected.
number
|     |     |     | MM.BEZK  | Characteristic  |     |     |
| --- | --- | --- | -------- | --------------- | --- | --- |
designation
|     |     |     | MM.BEZL  | Characteristic  |     |     |
| --- | --- | --- | -------- | --------------- | --- | --- |
designation
|     |     |     | MM.EINH   | Unit              |     |     |
| --- | --- | --- | --------- | ----------------- | --- | --- |
|     |     |     | PPMM.MW   | Measured value    |     |     |
|     |     |     | PPMM.SW   | Target value      |     |     |
|     |     |     | PPMM.OTG  | Upper  tolerance  |     |     |
limit
|     |     |     | PPMM.UTG  | Lower  tolerance  |     |     |
| --- | --- | --- | --------- | ----------------- | --- | --- |
limit
|     |     |     | PPMM.OPEG  | Upper  process  |     |     |
| --- | --- | --- | ---------- | --------------- | --- | --- |
action limit
|     |     |     | PPMM.UPEG  | Lower  process  |     |     |
| --- | --- | --- | ---------- | --------------- | --- | --- |
action limit

| MBL_ESK_EMG_Overview.docx  |     | Version: 1.1.1362  |     |     |     | Page 1 of 2  |
| -------------------------- | --- | ------------------ | --- | --- | --- | ------------ |

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

|     | Reading interval exceeded  |     |     |     |
| --- | -------------------------- | --- | --- | --- |
(RESWART.LIMIT_EXCEEDED)
The cyclically active maintenance monitoring program triggers an escalation as soon as a maintenance
limit for a reading has been exceeded.
| Event                   |                                | Identifiers     | Description                |     |
| ----------------------- | ------------------------------ | --------------- | -------------------------- | --- |
| RESWART.LIMIT_EXCEEDED  |                                | RESWART.RESTYP  | Resources types            |     |
|                         |                                | RESWART.RES     | Resources no.              |     |
|                         |                                | RESWART.BEZ     | Maintenance                |     |
|                         |                                | RESWART.WARTKL  | Class                      |     |
|                         |                                | RESWART.WART:N  | Value next maintenance     |     |
|                         |                                | RESWART.WART:I  | Actual value               |     |
|                         |                                | RESWART.WARTNR  | Threshold reached 1, 2, 3  |     |
|                         |                                | RESWART.ART     | Maintenance type           |     |
|                         | Absolute value limit exceeded  |                 |                            |     |
(EMG.ABSOLUTE_VALUE_EXCEEDED)
The cyclically active monitoring program triggers an escalation as soon as an absolute value limit for a
counter resource has been exceeded.
| Event  |     | Identifiers  | Description  |     |
| ------ | --- | ------------ | ------------ | --- |
EMG.ABSOLUTE_VALUE_EXCEED RES.ABSWGRENZE  Absolute value limit
ED
|     |     | RES.EGR:GUT    | Current counter value  |     |
| --- | --- | -------------- | ---------------------- | --- |
|     |     | RES.RES        | Resource               |     |
|     |     | RES.RSTDAT     | Reset date             |     |
|     |     | RES.RESRSTZEI  | Reset time             |     |
|     |     | RES.TYP        | Resource type          |     |

|     | Please note with regard to configuration               |     |     |     |
| --- | ------------------------------------------------------ | --- | --- | --- |
|     | Activating escalation messages for activity recording  |     |     |     |
Escalation messages are activated at the terminal or the PCC.
With regard to the details, please refer to the document on PDV escalations.

| MBL_ESK_EMG_Overview.docx  |     | Version: 1.1.1362  |     | Page 2 of 2  |
| -------------------------- | --- | ------------------ | --- | ------------ |
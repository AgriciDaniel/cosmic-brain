|     |     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

  Available Escalations
|                                | Overview of available events  |                           |                    |     |     |     |
| ------------------------------ | ----------------------------- | ------------------------- | ------------------ | --- | --- | --- |
| event_id                       |                               | event_name                |                    |     |     |     |
| PPMM.ACTION_LIMIT_EXCEEDED     |                               | Action limit* exceeded    | PDV71 PDV72 PDV81  |     |     |     |
| PPMM.TOLERANCE_LIMIT_EXCEEDED  |                               | Tolerance limit exceeded  | PDV71 PDV72 PDV81  |     |     |     |
* In PDV, the "action limit" is the process action limit

| Event  |     | Description  | Acronyms  | Description  | Notes  |     |
| ------ | --- | ------------ | --------- | ------------ | ------ | --- |
PPMM.ACTION_LIMIT_EXCEEDED  Process  action  MNR.MNR  Machine number  The  terminal  triggers  an
|     |     | limit exceeded  |            |                        | escalation if a violation of  |                    |
| --- | --- | --------------- | ---------- | ---------------------- | ----------------------------- | ------------------ |
|     |     |                 | PPMM.MMNR  | Characteristic number  |                               |                    |
|     |     |                 |            |                        | the  process                  | action  limit  is  |
MM.BEZK
|     |     |     |     | Characteristic  | identified.   |     |
| --- | --- | --- | --- | --------------- | ------------- | --- |
designation/name

|     |     |     | MM.BEZL  | Characteristic  |     |     |
| --- | --- | --- | -------- | --------------- | --- | --- |
designation/name
|     |     |     | MM.EINH    | Unit                   |     |     |
| --- | --- | --- | ---------- | ---------------------- | --- | --- |
|     |     |     | PPMM.MW    | Measured value         |     |     |
|     |     |     | PPMM.SW    | Target value           |     |     |
|     |     |     | PPMM.OTG   | Upper tolerance limit  |     |     |
|     |     |     | PPMM.UTG   | Lower tolerance limit  |     |     |
|     |     |     | PPMM.OPEG  | Upper process action   |     |     |
limit
|     |     |     | PPMM.UPEG  | Lower process action  |     |     |
| --- | --- | --- | ---------- | --------------------- | --- | --- |
limit
PPMM.TOLERANCE_LIMIT_EXCEEDED  Tolerance  limit  MNR.MNR  Machine number  The  terminal  triggers  an
|     |     | exceeded  |            |                        | escalation if a violation of  |            |
| --- | --- | --------- | ---------- | ---------------------- | ----------------------------- | ---------- |
|     |     |           | PPMM.MMNR  | Characteristic number  |                               |            |
|     |     |           |            |                        | the  tolerance                | limit  is  |
|     |     |           | MM.BEZK    | Characteristic         | identified.                   |            |
designation/name
|     |     |     | MM.BEZL  | Characteristic  |     |     |
| --- | --- | --- | -------- | --------------- | --- | --- |
designation/name
|     |     |     | MM.EINH    | Unit                   |     |     |
| --- | --- | --- | ---------- | ---------------------- | --- | --- |
|     |     |     | PPMM.MW    | Measured value         |     |     |
|     |     |     | PPMM.SW    | Target value           |     |     |
|     |     |     | PPMM.OTG   | Upper tolerance limit  |     |     |
|     |     |     | PPMM.UTG   | Lower tolerance limit  |     |     |
|     |     |     | PPMM.OPEG  | Upper process action   |     |     |
limit
|     |     |     | PPMM.UPEG  | Lower process action  |     |     |
| --- | --- | --- | ---------- | --------------------- | --- | --- |
limit
|                         |     | Alert  channel  | is  MNR.MNR  | Machine number         |                               |     |
| ----------------------- | --- | --------------- | ------------ | ---------------------- | ----------------------------- | --- |
| PPMM.ALARM_CHANNEL_SET  |     | set             |              |                        | Characteristic number, name,  |     |
|                         |     |                 | PPMM.MMNR    | Characteristic number  |                               |     |
unit and measured value only
|     |     |     | MM.BEZ  | Characteristic  |     |     |
| --- | --- | --- | ------- | --------------- | --- | --- |
designation/name
if the alert is triggered by a
|     |     |     | MM.EINH   | Unit            |                                |     |
| --- | --- | --- | --------- | --------------- | ------------------------------ | --- |
|     |     |     | PPMM.MW   | Measured value  | violation of the limit value.  |     |
|     |     |     | EV.EVENT  | Event           |                                |     |

| MBL_ESK_PDV_Overview.docx  |     | Version: 1.0.16349  |     |     |     | Page 1 of 2  |
| -------------------------- | --- | ------------------- | --- | --- | --- | ------------ |

Available Escalations
Event Description Acronyms Description Notes
EV.CAPTION Event name
Event and event name only
with triggering event.
MBL_ESK_PDV_Overview.docx Version: 1.0.16349 Page 2 of 2
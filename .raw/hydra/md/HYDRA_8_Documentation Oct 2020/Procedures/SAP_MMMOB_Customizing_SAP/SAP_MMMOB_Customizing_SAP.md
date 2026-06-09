|     |     |     |     | Application-Relevant Settings in SAP  |
| --- | --- | --- | --- | ------------------------------------- |

1  Application-Relevant Settings in SAP
Maintenance of the SAP partner agreement – inbound processing
Maintain the following settings for inbound processing in the partner agreement in SAP (WE20):
| Parameter name    |     |     | Value                   |     |
| ----------------- | --- | --- | ----------------------- | --- |
| Partner number    |     |     | Created logical system  |     |
| Partner type      |     |     | LS                      |     |
| Message type      |     |     | WMMBXY                  |     |
| Transaction code  |     |     | WMMB                    |     |

Maintenance of the SAP distribution model – inbound processing
| Parameter name  |     |     | Value  |     |
| --------------- | --- | --- | ------ | --- |
To upload time tickets
| Model view         |     |     | Created model view                    |     |
| ------------------ | --- | --- | ------------------------------------- | --- |
| Sender / Client    |     |     | Logical system for the sender system  |     |
| Recipient/ server  |     |     | Logical system of the client          |     |
| Message type       |     |     | WMMBXY                                |     |

Relevant transactions
| Transaction  |     | Meaning                        |     | Note  |
| ------------ | --- | ------------------------------ | --- | ----- |
| MB51         |     | Display of material documents  |     |       |

SAP_MMMOB_Customizing_SAP.docx  Version: 1.0.1362  Page 1 of 2

|     |     |     |     |     | Application-Relevant Settings in SAP  |
| --- | --- | --- | --- | --- | ------------------------------------- |

Possible modifications
If the standard SAP inbound processing does not meet the requirements, it can be enhanced by
numerous modifications.
| Modification  |     | Meaning                              |      |              | Note  |
| ------------- | --- | ------------------------------------ | ---- | ------------ | ----- |
| MWMIDO07      |     | Error processing for the receipt of  |      |              |       |
|               |     | IDocs:                               | MDE  | for  IDocs:  |       |
WMMBXY, WMINVE, WMTORD
together
| MWMIDO08  |     | Message  | WMMBXY  | (goods  |     |
| --------- | --- | -------- | ------- | ------- | --- |
movement) inbound
| MWMIDO13  |     | Message  | WMMBXY:  | follow-up  |     |
| --------- | --- | -------- | -------- | ---------- | --- |
actions after posting goods

SAP_MMMOB_Customizing_SAP.docx  Version: 1.0.1362  Page 2 of 2
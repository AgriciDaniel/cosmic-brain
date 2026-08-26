|     |     |     |     | Usage Decision MES --> ERP  |     |
| --- | --- | --- | --- | --------------------------- | --- |

1  Usage Decision MES --> ERP
Summary
The collection in HYDRA transforms the production orders into output batches that will be transferred as
goods receipt for the material, which is inventory-managed in the PPS system.
For each lot (= batch) it is possible in HYDRA to take a usage decision and to transmit it to the PPS-
system.
To do so, the option "Retain until usage decision“ will be used within the material type of the operation.
After that a usage decision was taken for a batch, the goods receipt (ZWEI) will be confirmed/uploaded
and if necessary also the usage decision with the corresponding code.
The data is read from the HYDRA table EVENT_LOS.
For the IDOC this leads to the following specification:
| Message type:          |     | ZCNRVEW          |     |     |     |
| ---------------------- | --- | ---------------- | --- | --- | --- |
| File name (with file-  |     | Z2CNRVEW000X000  |     |     |     |
transfer):
| File extension (with file  |     | Subject to configuration (by default .dat“)  |     |     |     |
| -------------------------- | --- | -------------------------------------------- | --- | --- | --- |
transfer):
| IDOC type:  |     | ZCNRVEW02                         |     |     |     |
| ----------- | --- | --------------------------------- | --- | --- | --- |
| Segments:   |     | Z2CNRVEW000X000 (usage decision)  |     |     |     |

Usage decision (Z2CNRVEW000X000)
This structure is used to transfer the usage decision taken in HYDRA to a batch (a HYDRA batch).
| Field  | T  L      |   Description                          |     |     |     |
| ------ | --------- | -------------------------------------- | --- | --- | --- |
| WERK   | CHAR  4   |   Company/ plant; stored fix to HYDRA  |     |     |     |
| ANR    | CHAR  40  |   Production order that has produced   |     |     |     |

| SAP_AUNR  | 12    |   SAP order number  |     |     |     |
| --------- | ----- | ------------------- | --- | --- | --- |

| SAP_AFOLG  | 6    |   SAP sequence number       |     |     |     |
| ---------- | ---- | --------------------------- | --- | --- | --- |
| SAP_VORNR  | 4    |   SAP operation number      |     |     |     |
| SAP_UVGNR  | 4    |   SAP sub-operation number  |     |     |     |

| MBL_MCL_Usage_decision.docx  |     | Version: 1.1.1362  |     |     | Page 1 of 2  |
| ---------------------------- | --- | ------------------ | --- | --- | ------------ |

|     |     |     |     | Usage Decision MES --> ERP  |     |
| --- | --- | --- | --- | --------------------------- | --- |

| Field   | T  L      |   Description       |     |     |     |
| ------- | --------- | ------------------- | --- | --- | --- |
| CHARGE  | CHAR  10  |   PPS batch number  |     |     |     |

| HY_LOSNR  | CHAR  20  |   HYDRA batch number  |     |     |     |
| --------- | --------- | --------------------- | --- | --- | --- |

DATUM  DATE  8    Date of the usage decision (format yyyymmdd)

| ZEIT  | TIME  6  |   Time of the usage decision (format hhmmss)  |     |     |     |
| ----- | -------- | --------------------------------------------- | --- | --- | --- |

| VCODE     | CHAR  4  |   Usage decision - code         |     |     |     |
| --------- | -------- | ------------------------------- | --- | --- | --- |
|           |          | "RFB“  Free stock               |     |     |     |
|           |          | "RSB“  Locked stock             |     |     |     |
|           |          | "AUS“  Scrap                    |     |     |     |
| VCODEGRP  | CHAR  8  |   Usage decision – code group   |     |     |     |
|           |          | fix: "      “ (blanks)          |     |     |     |

| MBL_MCL_Usage_decision.docx  |     | Version: 1.1.1362  |     |     | Page 2 of 2  |
| ---------------------------- | --- | ------------------ | --- | --- | ------------ |
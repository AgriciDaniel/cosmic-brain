Material consumptions MES --> ERP
1 Material consumptions MES --> ERP
Overview
The system transfers the material withdrawals recorded in the MES including the return transfers to the
ERP system.
In the ERP system the withdrawal postings are deducted from the warehouse and added to the individual
production order. If withdrawals for an ERP batch cannot be executed in the production warehouse
specified by the MES (missing inventory), the posting will be performed for that warehouse where the
ERP batch is found. Only if this also fails will the system issue an error message. The ERP system should
also use this approach (searching for an ERP batch) for return transfers.
The MES provides this data to the ERP system at regular intervals. The IDoc is of the type ZWAU02. This
leads to the following IDoc specification:
Message type ZWAU
File name (for file transfers) Z2WAU000X000
File extension (for file Depending on the configuration (by default ".dat“)
transfer)
IDOC type (with tRFC ZWAU02
communication):
Segments: Z2WAU000X000 (goods issues)
Respect the following conventions if SAP is connected:
Create SAP segment names according to the pattern Z1<segment name> in order to generate
the above-mentioned segment names in SAP. Versioning in SAP outbound processing then
creates the segment names in the form Z2<Segment name><Version>.
Example: the created segment name Z1WAU000X is converted to Z2WAU000X000.
This documentation uses the below-mentioned column headings with the meanings described here:
Column Description
Field Name of the field
V (usage) S Key field clearly identifying the data record. (Further key fields might be required). The field
must be populated.
M Mandatory field which must be populated with a valid value.
MBL_MCL_Goods_issue.docx Version: 1.9.18777 Page 1 of 4

|     |     |     |     |     | Material consumptions MES --> ERP  |     |     |
| --- | --- | --- | --- | --- | ---------------------------------- | --- | --- |

| Column    | Description                                |     |     |     |     |     |     |
| --------- | ------------------------------------------ | --- | --- | --- | --- | --- | --- |
|           | K  Field may stay empty (optional field).  |     |     |     |     |     |     |
| T(ype)    | Data type according to description.        |     |     |     |     |     |     |
| L(ength)  | Field length                               |     |     |     |     |     |     |
For fields of data type DEC: Total number of digits without decimal separator and algebraic sign.
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description  | Field description and/or comments on the field.  |     |     |     |     |     |     |
| ------------ | ------------------------------------------------ | --- | --- | --- | --- | --- | --- |

Movement types
In general, the following movement types are supported:
| Movement type  |      | Description/ usage                                |     |     |     |     |     |
| -------------- | ---- | ------------------------------------------------- | --- | --- | --- | --- | --- |
|                | 261  | Goods issue for production order                  |     |     |     |     |     |
|                | 262  | Cancellation of goods issue for production order  |     |     |     |     |     |

Data structure (Z2WAU000X000)
| Field   | T  L     | D  Description                                 |     |     |     |     |     |
| ------- | -------- | ---------------------------------------------- | --- | --- | --- | --- | --- |
| WERK    | CHAR  4  |   Company/ plant/ site; stored in MES (fixed)  |     |     |     |     |     |
| BEWART  | CHAR  3  |   Movement type (see table above)              |     |     |     |     |     |
MATPUF  CHAR  12    referring to batch: Material buffer according to batch inventory in MES
  anonymous batch  input buffer of the machine number (MNR)
| LGORT  | CHAR  20  |   ERP storage location  |     |     |     |     |     |
| ------ | --------- | ----------------------- | --- | --- | --- | --- | --- |
Storage location stored to the material buffer.
| ATK    | CHAR  40  |   Material number               |     |     |     |     |     |
| ------ | --------- | ------------------------------- | --- | --- | --- | --- | --- |
| MENGE  | QUAN  13  | 3  Batch quantity/ consumption  |     |     |     |     |     |
The consumed quantity is always provided with a positive sign.
| MENGE_EINH  | CHAR  3  |   Unit for batch quantity/consumption  |     |     |     |     |     |
| ----------- | -------- | -------------------------------------- | --- | --- | --- | --- | --- |
ANR  CHAR  40    Combined  HYDRA  production  order  number for  which material  has  been
withdrawn.
The exact length that is uploaded/confirmed depends on how the lengths are
configured for the order or operation in the HYDRA basic parameter settings.
Used for ERP inbound processing if SAP is not used.
| SAP_AUNR  | CHAR  12  |   SAP order number  |     |     |     |     |     |
| --------- | --------- | ------------------- | --- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_AFOLG  | CHAR  6  |   SAP sequence number   |     |     |     |     |     |
| ---------- | -------- | ----------------------- | --- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_VORNR  | CHAR  4  |   SAP operation number  |     |     |     |     |     |
| ---------- | -------- | ----------------------- | --- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_UVGNR  | CHAR  4  |   SAP sub-operation number  |     |     |     |     |     |
| ---------- | -------- | --------------------------- | --- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
KZEAUS  CHAR  1    J - indicates whether this is the last withdrawal for this component. The system
|     |     | sets         | this  ID  | for  automatically  | logged  off        | input  batches  | when  logging  off  |
| --- | --- | ------------ | --------- | ------------------- | ------------------ | --------------- | ------------------- |
|     |     | operations.  |           | The  ID  indicates  | that  no  further  | consumption     | occurs  for  an     |
operation-related component.
HY_LOSNR  CHAR  20    MES batch number (corresponding to this ERP batch).

| MBL_MCL_Goods_issue.docx  |     |     | Version: 1.9.18777  |     |     |     | Page 2 of 4  |
| ------------------------- | --- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     | Material consumptions MES --> ERP  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field  | T  L  | D  Description  |     |     |     |
| ------ | ----- | --------------- | --- | --- | --- |
HY_DLLNR  CHAR  20    MES throughput batch number (corresponding to this ERP batch)
| ARBPL  | CHAR  8  |   Consuming MES machine  |     |     |     |
| ------ | -------- | ------------------------ | --- | --- | --- |
GRND  NUM  4    Reserved (e.g. blocking reason when batch is logged off)
LHW  CHAR  20    Information on batch if there is a reference to the input batch
PERSNO  NUM  8    Personnel number of the person logged in to the terminal
| LST01  | QUAN  13  | 3  Consumption activity 1  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST01_EINH  | CHAR  3  |   Unit of activity 1  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LST02  | QUAN  13  | 3  Consumption activity 2  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST02_EINH  | CHAR  3  |   Unit of activity 2  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LST03  | QUAN  13  | 3  Consumption activity 3  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST03_EINH  | CHAR  3  |   Unit of activity 3  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LST04  | QUAN  13  | 3  Consumption activity 4  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST04_EINH  | CHAR  3  |   Consumption unit of activity 4  |     |     |     |
| ----------- | -------- | --------------------------------- | --- | --- | --- |

| LST05  | QUAN  13  | 3  Consumption activity 5  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST05_EINH  | CHAR  3  |   Unit of activity 5  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LST06  | QUAN  13  | 3  Consumption activity 6  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST06_EINH  | CHAR  3  |   Unit of activity 6  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LOSSTATUS  | CHAR  1  |   Batch status when input batch is logged off  |     |     |     |
| ---------- | -------- | ---------------------------------------------- | --- | --- | --- |

| LOSKLASSE  | CHAR  1  |   Batch class when input batch is logged off  |     |     |     |
| ---------- | -------- | --------------------------------------------- | --- | --- | --- |

| CHARGENNUMMER  | CHAR  10  |   ERP batch number  |     |     |     |
| -------------- | --------- | ------------------- | --- | --- | --- |

| CHARGENNUMMER_ | CHAR  20  |   ERP batch number (long)  |     |     |     |
| -------------- | --------- | -------------------------- | --- | --- | --- |
LONG  Available from MPL 8.2 on - please also see the following information on field
CHARGENNUMMER_LONG
| MSL_VFDATE  | DATE  8  |   MSL expiry date  |     |     |     |
| ----------- | -------- | ------------------ | --- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
| MSL_VFTIME  | TIME  6  |   MSL expiry time  |     |     |     |
| ----------- | -------- | ------------------ | --- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
| MSL_PERIOD  | NUMC  8  |   MSL term  |     |     |     |
| ----------- | -------- | ----------- | --- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.

Information on the fields CHARGENNUMMER / CHARGENNUMMER_LONG
The field CHARGENNUMMER_LONG is only available as of MPL 8.2.

| MBL_MCL_Goods_issue.docx  |     | Version: 1.9.18777  |     |     | Page 3 of 4  |
| ------------------------- | --- | ------------------- | --- | --- | ------------ |

|     |     |     | Material consumptions MES --> ERP  |     |
| --- | --- | --- | ---------------------------------- | --- |

If MPL 8.2 is used, the fields CHARGENNUMMER and CHARGENNUMMER_LONG are populated
as follows:
CHARGENNUMMER includes the ERP batch number with the characters 1-10.
CHARGENNUMMER_LONG includes the ERP batch number with the characters 1-20.
You should use the value of the CHARGENNUMMER_LONG field for new installations.

| MBL_MCL_Goods_issue.docx  |     | Version: 1.9.18777  |     | Page 4 of 4  |
| ------------------------- | --- | ------------------- | --- | ------------ |
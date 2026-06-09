Upload of Goods Movements HYDRA --> SAP

1  Upload of Goods Movements HYDRA --> SAP
1.1  Goods issues
Material withdrawals (consumption) recorded in HYDRA are transferred to SAP.
HYDRA provides the SAP system with the data in cyclic intervals. The SAP standard IDoc WMMBID02 of
the message type WMMBXY is used for this purpose.
| Message type:  | WMMBXY                       |     |     |           |         |
| -------------- | ---------------------------- | --- | --- | --------- | ------- |
| IDOC type      | WMMBID02                     |     |     |           |         |
| Segments:      | E2MBXYH (header record)      |     |     |           | single  |
|                | ├   E2MBXYI (detail record)  |     |     |   single  |         |
Transaction types
| Transaction type  Description/usage                  |     |     |     |     |     |
| ---------------------------------------------------- | --- | --- | --- | --- | --- |
| 261  Goods issue for production order (consumption)  |     |     |     |     |     |
262  Cancellation of goods issue for production order (consumption)
Data structure (E2MBXYH)
| Field   | T  L  | D  Designation  |     | Usage in HYDRA  |     |
| ------- | ----- | --------------- | --- | --------------- | --- |
BLDAT  DATE  8    Document date in document  Date  when  consumption  was
entered

BUDAT  DATE  8    Posting date in document  Date of material movement

XBLNR  CHAR  16    Reference document number  Reference of material movement
|        |           |                          |     |           |     |
| ------ | --------- | ------------------------ | --- | --------- | --- |
| BKTXT  | CHAR  25  |   Document header text   |     | Not used  |     |
| FRBNR  | CHAR  16  |                          |     | Not used  |     |
Number of the bill of lading at time of
goods receipt
XABLN  CHAR  10    Goods receipt/issue slip number  Not used
TCODE  CHAR  4    Session: Current transaction code  Fixed "MB1A“
| USNAM  | CHAR  12  |   User name (release 4.0)       |     | Not used  |     |
| ------ | --------- | ------------------------------- | --- | --------- | --- |
| VBUND  | CHAR  6   |   Society number (release 4.0)  |     | Not used  |     |

MBL_SAP_Implementation_MOB_Up.docx Version: 1.2.1508  Page 1 of 7

    Upload of Goods Movements HYDRA --> SAP

Data structure (E2MBXYI)
| Field  | T  L     | D  Designation                    | Usage in HYDRA  |
| ------ | -------- | --------------------------------- | --------------- |
| BEAKZ  | CHAR  1  |   Indicator: line already edited  | Not used        |
| XSTOB  | CHAR  1  |   Flag: Reverse posting           | Not used        |
MATNR  CHAR  18    Material number  Material number of the component
to be withdrawn

| WERKS  | CHAR  4  |   Plant  | Factory of the production order  |
| ------ | -------- | -------- | -------------------------------- |

LGORT  CHAR  4    Storage location  Storage location from user field 46
of the component list

| CHARG  | CHAR  10  |   Batch number  | Recorded batch number  |
| ------ | --------- | --------------- | ---------------------- |
|        |           |                 |                        |
BWART  CHAR  3    Movement  type  (inventory   "261“ for goods issues
|        |           | management)                       | "262“ cancellation for goods issue  |
| ------ | --------- | --------------------------------- | ----------------------------------- |
|        |           |                                   |                                     |
| INSMK  | CHAR  1   |   Stock type                      | Not used                            |
| SOBKZ  | CHAR  1   |   Special stock indicator         | Not used                            |
| KZVBR  | CHAR  1   |   Indicator: consumption posting  | Not used                            |
| LIFNR  | CHAR  10  |   Vendor account number           | Not used                            |
| KUNNR  | CHAR  10  |   Customer number                 | Not used                            |
| KDAUF  | CHAR  10  |   Sales order number              | Not used                            |
| KDPOS  | CHAR  6   |   Item number in customer order   | Not used                            |
| KDEIN  | CHAR  4   |   Scheduling of customer order    | Not used                            |
| SHKZG  | CHAR  1   |   Debit and credit indicator      | Not used                            |
| WAERS  | CHAR  5   |   Currency key                    | Not used                            |
| DMBTR  | CHAR  15  |   Amount in local currency        | Not used                            |
| BWTAR  | CHAR  10  |   Valuation type                  | Not used                            |
ERFMG  QUAN  13  3  Quantity in unit of entry  Quantity recorded as consumption

ERFME  CHAR  3    Unit of entry  Quantity  unit  for  consumption
quantity

BPMNG  QUAN  13  3  Quantity in order price quantity unit  Not used
| BPRME  | CHAR  3   |   Order price quantity unit   | Not used  |
| ------ | --------- | ----------------------------- | --------- |
| EBELN  | CHAR  10  |   Purchasing document number  | Not used  |
EBELP  CHAR  5    Item number of purchasing document  Not used
| ELIKZ  | CHAR  1   |   “Delivery completed” indicator  | Not used  |
| ------ | --------- | --------------------------------- | --------- |
| SGTXT  | CHAR  50  |   Item text                       | Not used  |
| WEMPF  | CHAR  12  |   Recipient of the goods          | Not used  |
| ABLAD  | CHAR  25  |   Place of unloading              | Not used  |
| KOSTL  | CHAR  10  |   Cost center                     | Not used  |
AUFNR  CHAR  12    Order number  SAP  order  number  for  which
material has been withdrawn

| ANLN1  | CHAR  12  |   Asset main number  | Not used  |
| ------ | --------- | -------------------- | --------- |
| ANLN2  | CHAR  4   |   Asset sub-number   | Not used  |
RSNUM  CHAR  10    Reservation number  Number  of  the  reservation  from
user field 45 of the component

MBL_SAP_Implementation_MOB_Up.docx Version: 1.2.1508  Page 2 of 7

    Upload of Goods Movements HYDRA --> SAP

| Field  | T  L  | D  Designation  |     | Usage in HYDRA  |     |     |
| ------ | ----- | --------------- | --- | --------------- | --- | --- |
RSPOS  CHAR  4    Item number of the reservation  Item  number  of  the  reservation
|     |     |     |     | from  user  | field  47  | of  the  |
| --- | --- | --- | --- | ----------- | ---------- | -------- |

component

| KZEAR  | CHAR  1   |   Indicator: final issue      |     | Not used  |     |     |
| ------ | --------- | ----------------------------- | --- | --------- | --- | --- |
| UMMAT  | CHAR  18  |   Receiving/issuing material  |     | Not used  |     |     |
| UMWRK  | CHAR  4   |   Receiving/issuing plant     |     | Not used  |     |     |
UMLGO  CHAR  4    Receiving/issuing storage location  Not used
| UMCHA  | CHAR  10  |   Receiving/issuing batch        |     | Not used  |     |     |
| ------ | --------- | -------------------------------- | --- | --------- | --- | --- |
| KZBEW  | CHAR  1   |   Movement indicator             |     | Not used  |     |     |
| WEUNB  | CHAR  1   |   Indicator: goods receipt       |     | Not used  |     |     |
| LGNUM  | CHAR  3   |   Warehouse number               |     | Not used  |     |     |
| LGTYP  | CHAR  3   |   Storage type                   |     | Not used  |     |     |
| LGPLA  | CHAR  10  |   Storage bin                    |     | Not used  |     |     |
| GRUND  | CHAR  4   |   Indicator: transaction reason  |     | Not used  |     |     |
| EVERS  | CHAR  2   |   Shipping instructions          |     | Not used  |     |     |
EVERE  CHAR  2    Complying with shipping instructions  Not used
IMKEY  CHAR  8    Internal key for real estate property  Not used
| KSTRG    | CHAR  12  |   Cost object                  |     | Not used  |     |     |
| -------- | --------- | ------------------------------ | --- | --------- | --- | --- |
| PAOBJNR  | CHAR  10  |   Number for business segment  |     | Not used  |     |     |
| PRCTR    | CHAR  10  |   Profit center                |     | Not used  |     |     |
PS_PSP_PNR  CHAR  8    Planning element of project structure  Not used
| NPLNR  | CHAR  12  |   Network  | number  for  | account  Not used  |     |     |
| ------ | --------- | ---------- | ------------ | ------------------ | --- | --- |
assignment
AUFPL  CHAR  10    Planning  number  for  transactions  in  Not used
the order
| APLZL  | CHAR  8   |   Continuous counter      |     | Not used  |     |     |
| ------ | --------- | ------------------------- | --- | --------- | --- | --- |
| AUFPS  | CHAR  4   |   Number of order item    |     | Not used  |     |     |
| VPTNR  | CHAR  10  |   Partner account number  |     | Not used  |     |     |
| FIPOS  | CHAR  14  |   Commitment item         |     | Not used  |     |     |
| GSBER  | CHAR  4   |   Business area           |     | Not used  |     |     |
BSTMG  QUAN  13  3  Goods receipt quantity in order unit  Not used
| BSTME  | CHAR  3  |   Order unit  |     | Not used  |     |     |
| ------ | -------- | ------------- | --- | --------- | --- | --- |
EXBWR  QUAN  13  3  Posting  amount  in  local  currency  Not used
entered externally
| KONTO  | CHAR  10  |   G/L account number          |     | Not used   |     |     |
| ------ | --------- | ----------------------------- | --- | ---------- | --- | --- |
| RSHKZ  | CHAR  1   |   Debit and credit indicator  |     | Fixed "H“  |     |     |

| BDMNG  | QUAN  13  | 3  Requirement quantity         |     | Not used  |     |     |
| ------ | --------- | ------------------------------- | --- | --------- | --- | --- |
| ENMNG  | QUAN  13  | 3  Issued quantity              |     | Not used  |     |     |
| QPLOS  | CHAR  12  |   Inspection batch number       |     | Not used  |     |     |
| UMZST  | CHAR  1   |   Status of receiving batch     |     | Not used  |     |     |
| UMZUS  | CHAR  1   |   Status key of transfer batch  |     | Not used  |     |     |
UMBAR  CHAR  10    Valuation type of transfer batch  Not used
| UMSOK  | CHAR  1  |   Special stock indicator  |     | Not used  |     |     |
| ------ | -------- | -------------------------- | --- | --------- | --- | --- |
LFBJA  CHAR  4    Fiscal year of a reference document  Not used
LFBNR  CHAR  10    Document  number  of  a  reference  Not used
document
| LFPOS  | CHAR  4  |   Item in a reference document  |     | Not used  |     |     |
| ------ | -------- | ------------------------------- | --- | --------- | --- | --- |
| SJAHR  | CHAR  4  |   Material document year        |     | Not used  |     |     |

MBL_SAP_Implementation_MOB_Up.docx Version: 1.2.1508  Page 3 of 7

    Upload of Goods Movements HYDRA --> SAP

| Field  | T  L      | D  Designation                   |     | Usage in HYDRA  |
| ------ | --------- | -------------------------------- | --- | --------------- |
| SMBLN  | CHAR  10  |   Number of a material document  |     | Not used        |
| SMBLP  | CHAR  4   |   Item in the material document  |     | Not used        |
EXVKW  CHAR  15    Sales  value  specified  externally  in  Not used
local currency
QM_ZUSTD  CHAR  1    Batch status with status changed in  Not used
QM (internal)
POSNR  CHAR  6    Delivery item for third-party system  Not used
| VBELN  | CHAR  10  |   Delivery  |     | Not used  |
| ------ | --------- | ----------- | --- | --------- |
QM_UMZST  CHAR  1    Status of received batch when status  Not used
changed in QM (intern.)
| BWLVS  | CHAR  3  |   Movement  | type  for  warehouse  | Not used  |
| ------ | -------- | ----------- | --------------------- | --------- |
management system
UMREZ  CHAR  5    Numerator for converting to base unit  Not used
of measure
UMREN  CHAR  5    Denominator for conversion to base  Not used
unit of measure
VFDAT  CHAR  8    Expiration date or best-before date  Not used

1.2  Goods receipts
Goods receipts recorded in HYDRA (for produced material) are transferred to SAP.
HYDRA provides the SAP system with the data in cyclic intervals. The SAP standard IDoc WMMBID02 of
the message type WMMBXY is used for this purpose.
| Message type:  | WMMBXY                       |     |     |           |
| -------------- | ---------------------------- | --- | --- | --------- |
| IDOC type      | WMMBID02                     |     |     |           |
| Segments:      | E2MBXYH (header record)      |     |     |   single  |
|                | ├   E2MBXYI (detail record)  |     |     |   single  |
Transaction types
| Transaction type  Description/usage                   |     |     |     |     |
| ----------------------------------------------------- | --- | --- | --- | --- |
| 101  Goods receipt for production order               |     |     |     |     |
| 102  Goods receipt cancellation for production order  |     |     |     |     |
Data structure (E2MBXYH)
| Field   | T  L  | D  Designation  |     | Usage in HYDRA  |
| ------- | ----- | --------------- | --- | --------------- |
BLDAT  DATE  8    Document date in document  Date of the entry

MBL_SAP_Implementation_MOB_Up.docx Version: 1.2.1508  Page 4 of 7

    Upload of Goods Movements HYDRA --> SAP

| Field   | T  L  | D  Designation  | Usage in HYDRA  |
| ------- | ----- | --------------- | --------------- |
BUDAT  DATE  8    Posting date in document  Date of material movement

XBLNR  CHAR  16    Reference document number  Reference of material movement
|        |           |                          |           |
| ------ | --------- | ------------------------ | --------- |
| BKTXT  | CHAR  25  |   Document header text   | Not used  |
FRBNR  CHAR  16    Number of the bill of lading at time of  Not used
goods receipt
XABLN  CHAR  10    Goods receipt/issue slip number  Not used
TCODE  CHAR  4    Session: Current transaction code  Fixed "MB31“
| USNAM  | CHAR  12  |   User name (release 4.0)       | Not used  |
| ------ | --------- | ------------------------------- | --------- |
| VBUND  | CHAR  6   |   Society number (release 4.0)  | Not used  |

Data structure (E2MBXYI)
| Field  | T  L     | D  Designation                    | Usage in HYDRA  |
| ------ | -------- | --------------------------------- | --------------- |
| BEAKZ  | CHAR  1  |   Indicator: line already edited  | Not used        |
| XSTOB  | CHAR  1  |   Flag: Reverse posting           | Not used        |
MATNR  CHAR  18    Material number  Material number of the produced
material

WERKS  CHAR  4    Plant  Factory  of  the  production  order
producing the material

LGORT  CHAR  4    Storage location  Storage location from user field 45
of the order header

| CHARG  | CHAR  10  |   Batch number  | Recorded batch number  |
| ------ | --------- | --------------- | ---------------------- |
|        |           |                 |                        |
BWART  CHAR  3    Movement  type  (inventory  "101“ for goods receipts
management)
"102“ goods receipt cancellation
|        |           |                                   |           |
| ------ | --------- | --------------------------------- | --------- |
| INSMK  | CHAR  1   |   Stock type                      | Not used  |
| SOBKZ  | CHAR  1   |   Special stock indicator         | Not used  |
| KZVBR  | CHAR  1   |   Indicator: consumption posting  | Not used  |
| LIFNR  | CHAR  10  |   Vendor account number           | Not used  |
| KUNNR  | CHAR  10  |   Customer number                 | Not used  |
| KDAUF  | CHAR  10  |   Sales order number              | Not used  |
| KDPOS  | CHAR  6   |   Item number in customer order   | Not used  |
| KDEIN  | CHAR  4   |   Scheduling of customer order    | Not used  |
| SHKZG  | CHAR  1   |   Debit and credit indicator      | Not used  |
| WAERS  | CHAR  5   |   Currency key                    | Not used  |
| DMBTR  | CHAR  15  |   Amount in local currency        | Not used  |
| BWTAR  | CHAR  10  |   Valuation type                  | Not used  |
ERFMG  QUAN  13  3  Quantity in unit of entry  Recorded quantity

| ERFME  | CHAR  3  |   Unit of entry  | Quantity unit   |
| ------ | -------- | ---------------- | --------------- |

MBL_SAP_Implementation_MOB_Up.docx Version: 1.2.1508  Page 5 of 7

    Upload of Goods Movements HYDRA --> SAP

| Field  | T  L  | D  Designation  |     | Usage in HYDRA  |     |     |
| ------ | ----- | --------------- | --- | --------------- | --- | --- |
BPMNG  QUAN  13  3  Quantity in order price quantity unit  Not used
| BPRME  | CHAR  3   |   Order price quantity unit   |     | Not used  |     |     |
| ------ | --------- | ----------------------------- | --- | --------- | --- | --- |
| EBELN  | CHAR  10  |   Purchasing document number  |     | Not used  |     |     |
EBELP  CHAR  5    Item number of purchasing document  Not used
| ELIKZ  | CHAR  1   |   “Delivery completed” indicator  |     | Not used  |     |     |
| ------ | --------- | --------------------------------- | --- | --------- | --- | --- |
| SGTXT  | CHAR  50  |   Item text                       |     | Not used  |     |     |
| WEMPF  | CHAR  12  |   Recipient of the goods          |     | Not used  |     |     |
| ABLAD  | CHAR  25  |   Place of unloading              |     | Not used  |     |     |
| KOSTL  | CHAR  10  |   Cost center                     |     | Not used  |     |     |
AUFNR  CHAR  12    Order number  SAP  order  number  for  which
|     |     |     |     | material  has  | been  received  | /   |
| --- | --- | --- | --- | -------------- | --------------- | --- |
produced

| ANLN1  | CHAR  12  |   Asset main number               |     | Not used  |     |     |
| ------ | --------- | --------------------------------- | --- | --------- | --- | --- |
| ANLN2  | CHAR  4   |   Asset sub-number                |     | Not used  |     |     |
| RSNUM  | CHAR  10  |   Reservation number              |     | Not used  |     |     |
| RSPOS  | CHAR  4   |   Item number of the reservation  |     | Not used  |     |     |
| KZEAR  | CHAR  1   |   Indicator: final issue          |     | Not used  |     |     |
| UMMAT  | CHAR  18  |   Receiving/issuing material      |     | Not used  |     |     |
| UMWRK  | CHAR  4   |   Receiving/issuing plant         |     | Not used  |     |     |
UMLGO  CHAR  4    Receiving/issuing storage location  Not used
| UMCHA  | CHAR  10  |   Receiving/issuing batch        |     | Not used   |     |     |
| ------ | --------- | -------------------------------- | --- | ---------- | --- | --- |
| KZBEW  | CHAR  1   |   Movement indicator             |     | Fixed “F”  |     |     |
| WEUNB  | CHAR  1   |   Indicator: goods receipt       |     | Not used   |     |     |
| LGNUM  | CHAR  3   |   Warehouse number               |     | Not used   |     |     |
| LGTYP  | CHAR  3   |   Storage type                   |     | Not used   |     |     |
| LGPLA  | CHAR  10  |   Storage bin                    |     | Not used   |     |     |
| GRUND  | CHAR  4   |   Indicator: transaction reason  |     | Not used   |     |     |
| EVERS  | CHAR  2   |   Shipping instructions          |     | Not used   |     |     |
EVERE  CHAR  2    Complying with shipping instructions  Not used
IMKEY  CHAR  8    Internal key for real estate property  Not used
| KSTRG    | CHAR  12  |   Cost object                  |     | Not used  |     |     |
| -------- | --------- | ------------------------------ | --- | --------- | --- | --- |
| PAOBJNR  | CHAR  10  |   Number for business segment  |     | Not used  |     |     |
| PRCTR    | CHAR  10  |   Profit center                |     | Not used  |     |     |
PS_PSP_PNR  CHAR  8    Planning element of project structure  Not used
| NPLNR  | CHAR  12  |   Network  | number  for  | account  Not used  |     |     |
| ------ | --------- | ---------- | ------------ | ------------------ | --- | --- |
assignment
AUFPL  CHAR  10    Planning  number  for  transactions  in  Not used
the order
| APLZL  | CHAR  8   |   Continuous counter      |     | Not used  |     |     |
| ------ | --------- | ------------------------- | --- | --------- | --- | --- |
| AUFPS  | CHAR  4   |   Number of order item    |     | Not used  |     |     |
| VPTNR  | CHAR  10  |   Partner account number  |     | Not used  |     |     |
| FIPOS  | CHAR  14  |   Commitment item         |     | Not used  |     |     |
| GSBER  | CHAR  4   |   Business area           |     | Not used  |     |     |
BSTMG  QUAN  13  3  Goods receipt quantity in order unit  Not used
| BSTME  | CHAR  3  |   Order unit  |     | Not used  |     |     |
| ------ | -------- | ------------- | --- | --------- | --- | --- |
EXBWR  QUAN  13  3  Posting  amount  in  local  currency  Not used
entered externally
| KONTO  | CHAR  10  |   G/L account number  |     | Not used  |     |     |
| ------ | --------- | --------------------- | --- | --------- | --- | --- |

MBL_SAP_Implementation_MOB_Up.docx Version: 1.2.1508  Page 6 of 7

    Upload of Goods Movements HYDRA --> SAP

| Field  | T  L     | D  Designation                |     | Usage in HYDRA  |
| ------ | -------- | ----------------------------- | --- | --------------- |
| RSHKZ  | CHAR  1  |   Debit and credit indicator  |     | Fixed "S“       |

| BDMNG  | QUAN  13  | 3  Requirement quantity         |     | Not used  |
| ------ | --------- | ------------------------------- | --- | --------- |
| ENMNG  | QUAN  13  | 3  Issued quantity              |     | Not used  |
| QPLOS  | CHAR  12  |   Inspection batch number       |     | Not used  |
| UMZST  | CHAR  1   |   Status of receiving batch     |     | Not used  |
| UMZUS  | CHAR  1   |   Status key of transfer batch  |     | Not used  |
UMBAR  CHAR  10    Valuation type of transfer batch  Not used
| UMSOK  | CHAR  1  |   Special stock indicator  |     | Not used  |
| ------ | -------- | -------------------------- | --- | --------- |
LFBJA  CHAR  4    Fiscal year of a reference document  Not used
LFBNR  CHAR  10    Document  number  of  a  reference  Not used
document
| LFPOS  | CHAR  4   |   Item in a reference document   |     | Not used  |
| ------ | --------- | -------------------------------- | --- | --------- |
| SJAHR  | CHAR  4   |   Material document year         |     | Not used  |
| SMBLN  | CHAR  10  |   Number of a material document  |     | Not used  |
| SMBLP  | CHAR  4   |   Item in the material document  |     | Not used  |
EXVKW  CHAR  15    Sales  value  specified  externally  in  Not used
local currency
QM_ZUSTD  CHAR  1    Batch status with status changed in  Not used
QM (internal)
POSNR  CHAR  6    Delivery item for third-party system  Not used
| VBELN  | CHAR  10  |   Delivery  |     | Not used  |
| ------ | --------- | ----------- | --- | --------- |
QM_UMZST  CHAR  1    Status of received batch when status  Not used
changed in QM (intern.)
| BWLVS  | CHAR  3  |   Movement  | type  for  warehouse  | Not used  |
| ------ | -------- | ----------- | --------------------- | --------- |
management system
UMREZ  CHAR  5    Numerator for converting to base unit  Not used
of measure
UMREN  CHAR  5    Denominator for conversion to base  Not used
unit of measure
VFDAT  CHAR  8    Expiration date or best-before date  Not used

MBL_SAP_Implementation_MOB_Up.docx Version: 1.2.1508  Page 7 of 7
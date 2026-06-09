|     |     |     |     | Goods Receipt  MES --> ERP  |     |     |
| --- | --- | --- | --- | --------------------------- | --- | --- |

1  Goods Receipt MES --> ERP
Overview
|     |    |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
|     |    |     |     |     |     |     |
The interface transfers all output batches generated from production orders in the MES for inventory-
managed material maintained in the ERP system to the ERP system.
The interface transfers the tree of origin and the user-defined fields (of the producing operation) for each
lot (= batch).
The MES provides the data at regular intervals to the ERP system. The IDoc is of the type ZWEI02. This
leads to the following specification:
| Message type:                  |     | ZWEI          |     |     |     |     |
| ------------------------------ | --- | ------------- | --- | --- | --- | --- |
| File name (for file transfers) |     | Z2WEI000X000  |     |     |     |     |

File extension (for file  Depending on the configuration (by default ".dat“)
transfers):
| IDOC type (with tRFC  |     | ZWEI02  |     |     |     |     |
| --------------------- | --- | ------- | --- | --- | --- | --- |
communication):
| Segments:  |     | Z2WEI000X000 (goods receipts)  |     |     |     | 1 – n  |
| ---------- | --- | ------------------------------ | --- | --- | --- | ------ |
Z2CNRATT_C000X000 (alphanumeric batch attributes part 1)
  0 – 1
Z2CNRATT_C001X000 (alphanumeric batch attributes part 2)
  0 – 1
|     |     | Z2CNRATT_N000X000 (numeric batch attributes) - OBSOLETE1  |     |     |     | 0 – 1  |
| --- | --- | --------------------------------------------------------- | --- | --- | --- | ------ |
Z2CNRATT_N001X000 (numeric batch attributes)2
|     |     |                                                  |     |     |          | 0 – 1  |
| --- | --- | ------------------------------------------------ | --- | --- | -------- | ------ |
|     |     | Z2CNRBAUM000X000 (optional: tree of generation)  |     |     |          | 0 – n  |
|     |     | Z2TOLO000X000 (optional: sub-batches)            |     |     |          | 0 – n  |
|     |     | Z2CNR_USRFLD000X000 (optional: user fields)3     |     |     |   0 – 1  |        |

1You should no longer use this segment for new installations. Use the segment Z2CNRATT_N001X000 instead. The
segment Z2CNRATT_N000X000 is still available (backwards compatible) but will no longer be maintained. Both
segments have different field lengths for their decimal fields.
2 Please note the information on the activation in section Numeric attributes (Z2CNRATT_N001X000).
3 Please note the information on the activation in section User fields (Z2CNR_USRFLD000X000).

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 1 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

Note the following conventions if SAP is connected:
Create SAP segment names according to the pattern Z1<segment name> in order to generate
the above-mentioned segment names in SAP. Versioning in SAP outbound processing then

generates segment names in the form Z2<Segment name><Version>.
Example: the created segment name Z1WEI000X becomes Z2WEI000X000

Movement types
Goods receipts are transferred from the MES to the ERP system using the IDoc and message types
described below. The movement type specifies the action (goods receipt, stock transfer, etc.) that must
be triggered in the ERP system.
The following table describes which movement type is used to transfer goods receipt postings to the ERP
system:
| Movement type  | Description/ usage  |     |     |     |
| -------------- | ------------------- | --- | --- | --- |
101  Standard goods receipt from production order: Goods receipt for batches where
the option "Transfer to interface“ is set for the material type.
| 102  | Cancellation of goods receipt                            |     |     |     |
| ---- | -------------------------------------------------------- | --- | --- | --- |
| 525  | Goods receipt for batches that are blocked in the MES.   |     |     |     |
| 531  | Goods receipt for waste batches                          |     |     |     |
532  Cancellation of goods receipt for waste batches and batches

Goods receipt (Z2WEI000X000)
The data record described below transfers the goods receipt. The detailed information:
| - user-specific fields     |     |     |     |     |
| -------------------------- | --- | --- | --- | --- |
| - tree of generation       |     |     |     |     |
| - sub-batches for pallets  |     |     |     |     |
is transferred in sub-segments.
| Field  | T  L     | D  Description                    |     |     |
| ------ | -------- | --------------------------------- | --- | --- |
| WERK   | CHAR  4  |   Plant; stored in HYDRA (fixed)  |     |     |

| BEWART  | CHAR  3  |   Movement type: see table above  |     |     |
| ------- | -------- | --------------------------------- | --- | --- |

| GRUND  | NUM  4  |   e.g. blocking reason for BEWART 525  |     |     |
| ------ | ------- | -------------------------------------- | --- | --- |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 2 of 13

|     |     |     |     |     | Goods Receipt  MES --> ERP  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

| Field  | T  L      | D  Description             |     |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- | --- |
| ZLO    | CHAR  12  |   Target material buffer   |     |     |     |     |

| LGORT  | CHAR  20  |   ERP storage location                                  |     |     |     |     |
| ------ | --------- | ------------------------------------------------------- | --- | --- | --- | --- |
|        |           | Storage location stored to the target material buffer.  |     |     |     |     |
| LGPZ   | CHAR  20  |   ERP storage bin                                       |     |     |     |     |

| CHARGE  | CHAR  10  |   ERP batch number  |     |     |     |     |
| ------- | --------- | ------------------- | --- | --- | --- | --- |

| MATNR  | CHAR  40  |   Material number  |     |     |     |     |
| ------ | --------- | ------------------ | --- | --- | --- | --- |

| MATTYP  | CHAR  10  |   Material type in HYDRA  |     |     |     |     |
| ------- | --------- | ------------------------- | --- | --- | --- | --- |

MENGE  QUAN  13  3  Quantity (primary quantity of the producing operation)

MENGE_EINH  CHAR  3    Quantity unit (primary quantity of the producing operation)
|     |     | Unit for the quantity in MENGE  |     |     |     |     |
| --- | --- | ------------------------------- | --- | --- | --- | --- |
ANR  CHAR  40    HYDRA order number = combined order/ operation number
  The exact length that is uploaded/confirmed depends on how the lengths are
configured for the order or operation in the HYDRA basic parameter settings.
Used for ERP inbound processing if SAP is not in use.
| SAP_AUNR  | 12    |   SAP order number  |     |     |     |     |
| --------- | ----- | ------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_AFOLG  | 6    |   SAP sequence number   |     |     |     |     |
| ---------- | ---- | ----------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_VORNR  | 4    |   SAP operation number  |     |     |     |     |
| ---------- | ---- | ----------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_UVGNR  | 4    |   SAP sub-operation number  |     |     |     |     |
| ---------- | ---- | --------------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| KZSOBEST  | CHAR  1  |   Not used, populated with "   " (blanks).  |     |     |     |     |
| --------- | -------- | ------------------------------------------- | --- | --- | --- | --- |
KZ_ABZWEIG  CHAR  1    Indicates if the material derives from the planned deducted material:
  Comes  from  the  OP  data  record  and  has  the  following  meaning:
|     |     | "M“  | Master OP of planned  deducted material  |     |     |     |
| --- | --- | ---- | ---------------------------------------- | --- | --- | --- |
"K“
|     |     |      | Sub-OP  | of  planned  |   deducted  | material   |
| --- | --- | ---- | ------- | ------------ | ----------- | ---------- |
|     |     | " “  | other   |              |             |            |
END_LIEF  CHAR  1    Indicates if this is the last batch of the operation.
|     |     | "J“  | last batch  |     |     |     |
| --- | --- | ---- | ----------- | --- | --- | --- |
"N“
other
The value "J" is set if the last output batch is completed when logging off the
OP.
INDEX  NUMC  4    Index (counter) of the batches within a production order.

| HY_LOSNR  | CHAR  20  |   HYDRA batch number   |     |     |     |     |
| --------- | --------- | ---------------------- | --- | --- | --- | --- |

| HY_DLLNR  | CHAR  20  |   HYDRA throughput batch number   |     |     |     |     |
| --------- | --------- | --------------------------------- | --- | --- | --- | --- |

| Z_MENGE  | QUAN  13  | 3  Not used; by default: 0      |     |     |     |     |
| -------- | --------- | ------------------------------- | --- | --- | --- | --- |
| Z_MEINH  | CHAR  3   |   Not used; by default: "   "   |     |     |     |     |
| ARBPL    | CHAR  8   |   Producing HYDRA machine       |     |     |     |     |

| ANZ_TR  | NUMC  8  |   Pallet (package):                          |     |     |     |     |
| ------- | -------- | -------------------------------------------- | --- | --- | --- | --- |
|         |          | Number of individual batches for the pallet  |     |     |     |     |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 3 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

| Field       | T  L      | D  Description                  |     |     |
| ----------- | --------- | ------------------------------- | --- | --- |
| LOSHINWEIS  | CHAR  20  |   Entered information on batch  |     |     |

| LST01  | QUAN  13  | 3  Activity 1  |     |     |
| ------ | --------- | -------------- | --- | --- |

| LST01_EINH  | CHAR  3   |   Unit of activity 1  |     |     |
| ----------- | --------- | --------------------- | --- | --- |
| LST02       | QUAN  13  | 3  Activity 2         |     |     |

| LST02_EINH  | CHAR  3   |   Unit of activity 2  |     |     |
| ----------- | --------- | --------------------- | --- | --- |
| LST03       | QUAN  13  | 3  Activity 3         |     |     |

| LST03_EINH  | CHAR  3   |   Unit of activity 3  |     |     |
| ----------- | --------- | --------------------- | --- | --- |
| LST04       | QUAN  13  | 3  Activity 4         |     |     |

| LST04_EINH  | CHAR  3   |   Unit of activity 4  |     |     |
| ----------- | --------- | --------------------- | --- | --- |
| LST05       | QUAN  13  | 3  Activity 5         |     |     |

| LST05_EINH  | CHAR  3   |   Unit of activity 5  |     |     |
| ----------- | --------- | --------------------- | --- | --- |
| LST06       | QUAN  13  | 3  Activity 6         |     |     |

| LST06_EINH  | CHAR  3  |   Unit of activity 6           |     |     |
| ----------- | -------- | ------------------------------ | --- | --- |
| VVDAT       | DATE  8  |   Availability date (MPL-MMO)  |     |     |
  If MPL-MMO is not used, you should set the value to the current point in time.
| VVZEI  | TIME  6  |   Availability time (MPL-MMO)  |     |     |
| ------ | -------- | ------------------------------ | --- | --- |
  If MPL-MMO is not used, you should set the value to the current point in time.
| WDAT  | DATE  8  |   Warning date (MPL-MMO)  |     |     |
| ----- | -------- | ------------------------- | --- | --- |
  If MPL-MMO is not used, you should set the value to 31.12.9999.
| WZEI  | TIME  6  |   Warning time (MPL-MMO)  |     |     |
| ----- | -------- | ------------------------- | --- | --- |
  If MPL-MMO is not used, you should set the value to 23:59:59.
| VFDAT  | DATE  8  |   Expiry date (MPL-MMO)  |     |     |
| ------ | -------- | ------------------------ | --- | --- |
  If MPL-MMO is not used, you should set the value to 31.12.9999.
| VFZEI  | TIME  6  |   Expiry time (MPL-MMO)   |     |     |
| ------ | -------- | ------------------------- | --- | --- |
  If MPL-MMO is not used, you should set the value to 23:59:59.
| KLASSE  | CHAR  1  |   Batch class       |     |     |
| ------- | -------- | ------------------- | --- | --- |
|         |          | "G"  Yield          |     |     |
|         |          | "A"  Scrap/ waste   |     |     |
As of MPL 8.2 the following, additional indicators are available:
|         |          | "O“  Open quantity / problem quantity  |     |     |
| ------- | -------- | -------------------------------------- | --- | --- |
|         |          | "N“  Rework                            |     |     |
| STATUS  | CHAR  1  |   Batch status to be set               |     |     |
|         |          | F  Free/available                      |     |     |
|         |          | S  Blocked                             |     |     |
| MATST   | CHAR  1  |   Material status                      |     |     |

| QST  | CHAR  1  |   Quality status  |     |     |
| ---- | -------- | ----------------- | --- | --- |

| QSTMANU  | CHAR  1  |   Manual quality status  |     |     |
| -------- | -------- | ------------------------ | --- | --- |

| TST  | CHAR  1  |   Transport status  |     |     |
| ---- | -------- | ------------------- | --- | --- |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 4 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

| Field   | T  L    | D  Description      |     |     |
| ------- | ------- | ------------------- | --- | --- |
| PERSNO  | NUM  8  |   Personnel number  |     |     |

| TPE       | CHAR  10  |   Transport unit              |     |     |
| --------- | --------- | ----------------------------- | --- | --- |
| CNR_ALT1  | CHAR  20  |   Alternative batch number 1  |     |     |

| CNR_ALT2  | CHAR  20  |   Alternative batch number 2   |     |     |
| --------- | --------- | ------------------------------ | --- | --- |

| CNR_ALT3  | CHAR  20  |   Alternative batch number 3   |     |     |
| --------- | --------- | ------------------------------ | --- | --- |

| CNR_ALT4  | CHAR  20  |   Alternative batch number 4   |     |     |
| --------- | --------- | ------------------------------ | --- | --- |

| CNR_ALT5  | CHAR  40  |   Alternative batch number 5   |     |     |
| --------- | --------- | ------------------------------ | --- | --- |

| EXTCNR  | CHAR  20  |   External batch number (e.g. batch number)  |     |     |
| ------- | --------- | -------------------------------------------- | --- | --- |

| MCNR  | CHAR  20  |   Merged batch number  |     |     |
| ----- | --------- | ---------------------- | --- | --- |

| ATTR1  | NUM  8  |   Direct batch attribute 1  |     |     |
| ------ | ------- | --------------------------- | --- | --- |

| ATTR2  | NUM  8  |   Direct batch attribute 2  |     |     |
| ------ | ------- | --------------------------- | --- | --- |

| ATTR3  | NUM  8  |   Direct batch attribute 3  |     |     |
| ------ | ------- | --------------------------- | --- | --- |

| ATTR4  | DEC  13  | 3  Direct batch attribute 4  |     |     |
| ------ | -------- | ---------------------------- | --- | --- |

| ATTR5  | DEC  13  | 3  Direct batch attribute 5  |     |     |
| ------ | -------- | ---------------------------- | --- | --- |

| ATTR6  | DEC  13  | 3  Direct batch attribute 6  |     |     |
| ------ | -------- | ---------------------------- | --- | --- |

| ATTR7  | CHAR  4  |   Direct batch attribute 7  |     |     |
| ------ | -------- | --------------------------- | --- | --- |

| ATTR8  | CHAR  10  |   Direct batch attribute 8  |     |     |
| ------ | --------- | --------------------------- | --- | --- |

| ATTR9  | CHAR  10  |   Direct batch attribute 9  |     |     |
| ------ | --------- | --------------------------- | --- | --- |

| ATTR10  | CHAR  20  |   Direct batch attribute 10  |     |     |
| ------- | --------- | ---------------------------- | --- | --- |

| CHARGE_LONG  | CHAR  20  |   ERP batch number (long)  |     |     |
| ------------ | --------- | -------------------------- | --- | --- |
  Available from MPL 8.2 on - please also see the following information on field
CHARGE_LONG
| MSL_VFDATE  | DATE  8  |   MSL expiry date  |     |     |
| ----------- | -------- | ------------------ | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
| MSL_VFTIME  | TIME  6  |   MSL expiry time  |     |     |
| ----------- | -------- | ------------------ | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
| MSL_PERIOD  | NUMC  8  |   MSL term  |     |     |
| ----------- | -------- | ----------- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
Please note: Batch-related fields are only populated if the movements refer to batches.

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 5 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

Information on the fields CHARGE / CHARGE_LONG
The field CHARGE_LONG is only available as of MPL 8.2.
If MPL 8.2 is used, the fields CHARGE and CHARGE_LONG are populated as follows:
CHARGE includes the ERP batch number with the characters 1-10.
CHARGE_LONG includes the ERP batch number with the characters 1-20.
You should use the value of the CHARGE_LONG field for new installations.
Alphanumeric attributes (Z2CNRATT_C000X000)
The following segment transfers the (first 20) alphanumeric batch attributes.
| Field       | T  L      | D  Description                  |     |     |
| ----------- | --------- | ------------------------------- | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number            |     |     |
| ATTRIB_101  | CHAR  40  |   Alphanumeric batch attribute  |     |     |
| ATTRIB_102  | CHAR  40  |   ...                           |     |     |
| ATTRIB_103  | CHAR  40  |   ...                           |     |     |
| ATTRIB_104  | CHAR  40  |   ...                           |     |     |
| ATTRIB_105  | CHAR  40  |   ...                           |     |     |
| ATTRIB_106  | CHAR  40  |   ...                           |     |     |
| ATTRIB_107  | CHAR  40  |   ...                           |     |     |
| ATTRIB_108  | CHAR  40  |   ...                           |     |     |
| ATTRIB_109  | CHAR  40  |   ...                           |     |     |
| ATTRIB_110  | CHAR  40  |   ...                           |     |     |
| ATTRIB_111  | CHAR  40  |   ...                           |     |     |
| ATTRIB_112  | CHAR  40  |   ...                           |     |     |
| ATTRIB_113  | CHAR  40  |   ...                           |     |     |
| ATTRIB_114  | CHAR  40  |   ...                           |     |     |
| ATTRIB_115  | CHAR  40  |   ...                           |     |     |
| ATTRIB_116  | CHAR  40  |   ...                           |     |     |
| ATTRIB_117  | CHAR  40  |   ...                           |     |     |
| ATTRIB_118  | CHAR  40  |   ...                           |     |     |
| ATTRIB_119  | CHAR  40  |   ...                           |     |     |
| ATTRIB_120  | CHAR  40  |   ...                           |     |     |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 6 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

Alphanumeric attributes (Z2CNRATT_C001X000)
The following segment transfers the (first 20) alphanumeric batch attributes.
| Field       | T  L      | D  Description                  |     |     |
| ----------- | --------- | ------------------------------- | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number            |     |     |
| ATTRIB_121  | CHAR  40  |   Alphanumeric batch attribute  |     |     |
| ATTRIB_122  | CHAR  40  |   ...                           |     |     |
| ATTRIB_123  | CHAR  40  |   ...                           |     |     |
| ATTRIB_124  | CHAR  40  |   ...                           |     |     |
| ATTRIB_125  | CHAR  40  |   ...                           |     |     |
| ATTRIB_126  | CHAR  40  |   ...                           |     |     |
| ATTRIB_127  | CHAR  40  |   ...                           |     |     |
| ATTRIB_128  | CHAR  40  |   ...                           |     |     |
| ATTRIB_129  | CHAR  40  |   ...                           |     |     |
| ATTRIB_130  | CHAR  40  |   ...                           |     |     |
| ATTRIB_131  | CHAR  40  |   ...                           |     |     |
| ATTRIB_132  | CHAR  40  |   ...                           |     |     |
| ATTRIB_133  | CHAR  40  |   ...                           |     |     |
| ATTRIB_134  | CHAR  40  |   ...                           |     |     |
| ATTRIB_135  | CHAR  40  |   ...                           |     |     |
| ATTRIB_136  | CHAR  40  |   ...                           |     |     |
| ATTRIB_137  | CHAR  40  |   ...                           |     |     |
| ATTRIB_138  | CHAR  40  |   ...                           |     |     |
| ATTRIB_139  | CHAR  40  |   ...                           |     |     |
| ATTRIB_140  | CHAR  40  |   ...                           |     |     |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 7 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

Numeric attributes (Z2CNRATT_N000X000) - OBSOLETE
The following segment transfers the numeric batch attributes.
| Field       | T  L      | D  Description                       |     |     |
| ----------- | --------- | ------------------------------------ | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number                 |     |     |
| ATTRIB_201  | NUMC  8   |   Integer, numeric batch attribute   |     |     |
| ATTRIB_202  | NUMC  8   |   ...                                |     |     |
| ATTRIB_203  | NUMC  8   |   ...                                |     |     |
| ATTRIB_204  | NUMC  8   |   ...                                |     |     |
| ATTRIB_205  | NUMC  8   |   ...                                |     |     |
| ATTRIB_206  | NUMC  8   |   ...                                |     |     |
| ATTRIB_207  | NUMC  8   |   ...                                |     |     |
| ATTRIB_208  | NUMC  8   |   ...                                |     |     |
| ATTRIB_209  | NUMC  8   |   ...                                |     |     |
| ATTRIB_210  | NUMC  8   |   ...                                |     |     |
| ATTRIB_211  | NUMC  8   |   ...                                |     |     |
| ATTRIB_212  | NUMC  8   |   ...                                |     |     |
| ATTRIB_213  | NUMC  8   |   ...                                |     |     |
| ATTRIB_214  | NUMC  8   |   ...                                |     |     |
| ATTRIB_215  | NUMC  8   |   ...                                |     |     |
| ATTRIB_216  | NUMC  8   |   ...                                |     |     |
| ATTRIB_217  | NUMC  8   |   ...                                |     |     |
| ATTRIB_218  | NUMC  8   |   ...                                |     |     |
| ATTRIB_219  | NUMC  8   |   ...                                |     |     |
| ATTRIB_220  | NUMC  8   |   ...                                |     |     |
| ATTRIB_301  | DEC  10   | 3  Decimal, numeric batch attribute  |     |     |
| ATTRIB_302  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_303  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_304  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_305  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_306  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_307  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_308  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_309  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_310  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_311  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_312  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_313  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_314  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_315  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_316  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_317  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_318  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_319  | DEC  10   | 3  ...                               |     |     |
| ATTRIB_320  | DEC  10   | 3  ...                               |     |     |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 8 of 13

|     |     |     |     |     | Goods Receipt  MES --> ERP  |     |
| --- | --- | --- | --- | --- | --------------------------- | --- |

Numeric attributes (Z2CNRATT_N001X000)
As of version 1.72946 (2015/SP7) of the script mle_rckmestyp_zwei_out.hsc, you can use the segment
Z2CNRATT_N001X000 to upload/confirm the numeric attributes of a batch.
Depending on the product version in use, you might have to activate the segment manually:
| MPL/TRT 8.1  |     |     | MPL/TRT 8.2  |     |     |     |
| ------------ | --- | --- | ------------ | --- | --- | --- |
You  have  to  enable  uploads  via  the  segment  For new installations after SP7/2015 the segment
| Z2CNRATT_N001X000 manually.  |     |     | is used by default.  |             |               |                |
| ---------------------------- | --- | --- | -------------------- | ----------- | ------------- | -------------- |
|                              |     |     | You  have            | to  enable  | the  segment  | manually  for  |
installations prior to that date.

You have to enable the transfer of the segment manually in the HYDRA INI configuration.
Data is read from the HYDRA table los_bestand
| Field       | T  L      | D  Description                      |     |     |     |     |
| ----------- | --------- | ----------------------------------- | --- | --- | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number                |     |     |     |     |
| ATTRIB_201  | NUMC  8   |   Integer, numeric batch attribute  |     |     |     |     |
| ATTRIB_202  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_203  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_204  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_205  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_206  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_207  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_208  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_209  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_210  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_211  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_212  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_213  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_214  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_215  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_216  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_217  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_218  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_219  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_220  | NUMC  8   |   ...                               |     |     |     |     |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 9 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

| Field       | T  L     | D  Description                       |     |     |
| ----------- | -------- | ------------------------------------ | --- | --- |
| ATTRIB_301  | DEC  13  | 3  Decimal, numeric batch attribute  |     |     |
| ATTRIB_302  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_303  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_304  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_305  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_306  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_307  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_308  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_309  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_310  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_311  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_312  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_313  | DEC  13  | 3  ...                               |     |     |
| ATTRIB_314  | DEC  10  | 3  ...                               |     |     |
| ATTRIB_315  | DEC  10  | 3  ...                               |     |     |
| ATTRIB_316  | DEC  10  | 3  ...                               |     |     |
| ATTRIB_317  | DEC  10  | 3  ...                               |     |     |
| ATTRIB_318  | DEC  10  | 3  ...                               |     |     |
| ATTRIB_319  | DEC  10  | 3  ...                               |     |     |
| ATTRIB_320  | DEC  10  | 3  ...                               |     |     |

Tree of generation (Z2CNRBAUM000X000)
The following data record is part of the tree of generation of a batch. These are "OPTIONAL“ segments,
i.e. they are only included in the IDoc if they actually exist.
Data is read from the HYDRA table LOS_ZUORDNUNGEN.
| Field      | T  L      | D  Description                       |     |     |
| ---------- | --------- | ------------------------------------ | --- | --- |
| HY_ALOSNR  | CHAR  20  |   HYDRA batch number (output batch)  |     |     |
lz.al_nr
| A_CHARGE      | CHAR  10  |   ERP batch number of the output batch       |     |     |
| ------------- | --------- | -------------------------------------------- | --- | --- |
| lz.al_charge  |           | ... populated if the batch is an ERP batch.  |     |     |
| A_MATNR       | CHAR  40  |   Material number of the output batch        |     |     |
lz.al_matnr  Known in the ERP system for inventory-managed materials.
| HY_ELOSNR  | CHAR  20  |   HYDRA batch number (input batch)  |     |     |
| ---------- | --------- | ----------------------------------- | --- | --- |

| E_CHARGE  | CHAR  10  |   ERP batch number of the input batch  |     |     |
| --------- | --------- | -------------------------------------- | --- | --- |
... populated if the batch is an ERP batch.
| E_MATNR  | CHAR  40  |   Material number of the input batch   |     |     |
| -------- | --------- | -------------------------------------- | --- | --- |
Known in the ERP system for inventory-managed materials.
| E_POS  | CHAR  10  |   BOM item of the input batch  |     |     |
| ------ | --------- | ------------------------------ | --- | --- |
ANR  CHAR  40    HYDRA production order producing the output batch.

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 10 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

| Field  | T  L  | D  Description  |     |     |
| ------ | ----- | --------------- | --- | --- |
ARBPL  CHAR  8    Machine where the output batch was generated.
| DATUM  | DATE  8  |   Creation date of the output batch  |     |     |
| ------ | -------- | ------------------------------------ | --- | --- |
| ZEIT   | TIME  6  |   Creation time of the output batch  |     |     |

Note
You should manage this information in a user-specific table "ZCNRBAUM“ in the ERP system. The
structure of this table should be identical to that of the segment.
Sub-batches (Z2TOLO000X000)
For pallets: The described sub-segment transfers the included sub-batches that are assigned to the
pallets. These are "OPTIONAL“ segments, i.e. they are only included in the IDoc if they actually exist.
Data is read from the HYDRA table ZTOLO.
| Field       | T  L      | D  Description                            |     |     |
| ----------- | --------- | ----------------------------------------- | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number of individual batch  |     |     |
| MATNR       | CHAR  40  |   HYDRA material number                   |     |     |
| MATTYP      | CHAR  10  |   HYDRA material type                     |     |     |
| MATTXT      | CHAR  40  |   HYDRA material name                     |     |     |
| MENGE       | QUAN  13  | 3  Quantity of individual batch           |     |     |
| MENGE_EINH  | CHAR  3   |   Quantity unit                           |     |     |
| LST01       | QUAN  13  | 3  Activity 1                             |     |     |
| LST01_EINH  | CHAR  3   |   Unit of activity 1                      |     |     |
| LST02       | QUAN  13  | 3  Activity 2                             |     |     |
| LST02_EINH  | CHAR  3   |   Unit of activity 2                      |     |     |
| LST03       | QUAN  13  | 3  Activity 3                             |     |     |
| LST03_EINH  | CHAR  3   |   Unit of activity 3                      |     |     |
| LST04       | QUAN  13  | 3  Activity 4                             |     |     |
| LST04_EINH  | CHAR  3   |   Unit of activity 4                      |     |     |
| LST05       | QUAN  13  | 3  Activity 5                             |     |     |
| LST05_EINH  | CHAR  3   |   Unit of activity 5                      |     |     |
| LST06       | QUAN  13  | 3  Activity 6                             |     |     |
| LST06_EINH  | CHAR  3   |   Unit of activity 6                      |     |     |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 11 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

User fields (Z2CNR_USRFLD000X000)
You  can  transfer/upload  the  user  fields  of  a  batch  as  of  version  1.8  of  the  script
mle_rckmestyp_zwei_out.hsc. Data is transferred in the segment Z2CNR_USRFLD000X000.
You have to enable the transfer of the segment manually in the HYDRA INI configuration.
Data is read from the HYDRA table los_bestand
| Field     | V  T     | L  D  Description                    |     |     |
| --------- | -------- | ------------------------------------ | --- | --- |
| HY_LOSNR  | S  CHAR  | 20    HYDRA batch number             |     |     |
| FILLER    | S  CHAR  | 20    Placeholder – internal usage   |     |     |
| USRFLD    | S  CHAR  | 8    User field key                  |     |     |
| FU:1      | K  DATE  | 8    User field 1                    |     |     |
| FU:2      | K  DATE  | 8    User field 2                    |     |     |
| FU:3      | K  DATE  | 8    User field 3                    |     |     |
| FU:4      | K  DATE  | 8    User field 4                    |     |     |
| FU:5      | K  DATE  | 8    User field 5                    |     |     |
| FU:6      | K  DATE  | 8    User field 6                    |     |     |
| FU:7      | K  NUM   | 8    User field 7                    |     |     |
| FU:8      | K  NUM   | 8    User field 8                    |     |     |
| FU:9      | K  NUM   | 8    User field 9                    |     |     |
| FU:10     | K  NUM   | 8    User field 10                   |     |     |
| FU:11     | K  NUM   | 8    User field 11                   |     |     |
| FU:12     | K  NUM   | 8    User field 12                   |     |     |
| FU:13     | K  NUM   | 8    User field 13                   |     |     |
| FU:14     | K  NUM   | 8    User field 14                   |     |     |
| FU:15     | K  NUM   | 8    User field 15                   |     |     |
| FU:16     | K  NUM   | 8    User field 16                   |     |     |
| FU:17     | K  NUM   | 8    User field 17                   |     |     |
| FU:18     | K  NUM   | 8    User field 18                   |     |     |
| FU:19     | K  NUM   | 8    User field 19                   |     |     |
| FU:20     | K  NUM   | 8    User field 20                   |     |     |
| FU:21     | K  NUM   | 8    User field 21                   |     |     |
| FU:22     | K  NUM   | 8    User field 22                   |     |     |
| FU:23     | K  DEC   | 13  3  User field 23                 |     |     |
| FU:24     | K  DEC   | 13  3  User field 24                 |     |     |
| FU:25     | K  DEC   | 13  3  User field 25                 |     |     |
| FU:26     | K  DEC   | 13  3  User field 26                 |     |     |
| FU:27     | K  DEC   | 13  3  User field 27                 |     |     |
| FU:28     | K  DEC   | 13  3  User field 28                 |     |     |
| FU:29     | K  CHAR  | 1    User field 29                   |     |     |
| FU:30     | K  CHAR  | 1    User field 30                   |     |     |
| FU:31     | K  CHAR  | 1    User field 31                   |     |     |
| FU:32     | K  CHAR  | 1    User field 32                   |     |     |
| FU:33     | K  CHAR  | 1    User field 33                   |     |     |
| FU:34     | K  CHAR  | 1    User field 34                   |     |     |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 12 of 13

|     |     |     |     | Goods Receipt  MES --> ERP  |
| --- | --- | --- | --- | --------------------------- |

| Field  | V  T     | L  D  Description    |     |     |
| ------ | -------- | -------------------- | --- | --- |
| FU:35  | K  CHAR  | 1    User field 35   |     |     |
| FU:36  | K  CHAR  | 1    User field 36   |     |     |
| FU:37  | K  CHAR  | 1    User field 37   |     |     |
| FU:38  | K  CHAR  | 1    User field 38   |     |     |
| FU:39  | K  CHAR  | 1    User field 39   |     |     |
| FU:40  | K  CHAR  | 1    User field 40   |     |     |
| FU:41  | K  CHAR  | 1    User field 41   |     |     |
| FU:42  | K  CHAR  | 1    User field 42   |     |     |
| FU:43  | K  CHAR  | 1    User field 43   |     |     |
| FU:44  | K  CHAR  | 1    User field 44   |     |     |
| FU:45  | K  CHAR  | 10    User field 45  |     |     |
| FU:46  | K  CHAR  | 10    User field 46  |     |     |
| FU:47  | K  CHAR  | 10    User field 47  |     |     |
| FU:48  | K  CHAR  | 10    User field 48  |     |     |
| FU:49  | K  CHAR  | 10    User field 49  |     |     |
| FU:50  | K  CHAR  | 10    User field 50  |     |     |
| FU:51  | K  CHAR  | 20    User field 51  |     |     |
| FU:52  | K  CHAR  | 20    User field 52  |     |     |
| FU:53  | K  CHAR  | 20    User field 53  |     |     |
| FU:54  | K  CHAR  | 20    User field 54  |     |     |
| FU:55  | K  CHAR  | 20    User field 55  |     |     |
| FU:56  | K  CHAR  | 20    User field 56  |     |     |
| FU:57  | K  CHAR  | 20    User field 57  |     |     |
| FU:58  | K  CHAR  | 20    User field 58  |     |     |
| FU:59  | K  CHAR  | 20    User field 59  |     |     |
| FU:60  | K  CHAR  | 20    User field 60  |     |     |
| FU:61  | K  CHAR  | 20    User field 61  |     |     |
| FU:62  | K  CHAR  | 20    User field 62  |     |     |
| FU:63  | K  CHAR  | 20    User field 63  |     |     |
| FU:64  | K  CHAR  | 20    User field 64  |     |     |
| FU:65  | K  CHAR  | 40    User field 65  |     |     |
| FU:66  | K  CHAR  | 40    User field 66  |     |     |

MBL_MCL_Goods_receipt.docx  Version: 1.15.18806  Page 13 of 13
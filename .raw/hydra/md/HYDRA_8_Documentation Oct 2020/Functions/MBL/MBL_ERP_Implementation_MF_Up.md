Operation-related uploads
1 Operation-related Uploads HYDRA => ERP
Overview


The system uses an individual IDOC with different interface record types (SATZART field in the interface
record) to transfer the operation-related uploads recorded in HYDRA to the ERP system. There are two
different interface record types:
 Uploads based on operations (SATZART/record type = "A")
All data records relating to operations are uploaded using the interface record type "A". HYDRA uses
a separate entry record type to manage these data records (see e.g. the MOC application Order-
related postings). This indicator allows for the records assigned to the interface record type "A" to be
differentiated in more detail. The following entry record types are uploaded:
 Interruption of an operation (postings of the entry record type "U" (STEUER field in the interface
record); is also performed at the end of the shift if the automatic shift function is active).
 Completion of an operation (postings of entry record type "E" (STEUER_KZ field in the interface
record)).
A data record where quantities, processing duration and RPA are not filled out is transferred for each
posting relating to orders (interruption, completion) when it comes to operations that are subject to
batch management. These data records only transfer the labor utilization of this order. When finishing
the order, the data record indicates that the order has actually been finished.
Quantities and times are uploaded in separate data records that are generated in HYDRA while the
output batch is changed.
 Personal upload (SATZART/record type = "P")
If HYDRA is customized accordingly, you can also upload the "B" records that are managed in
HYDRA for the single persons. To do so, use the interface record type "P".
Data is provided at regular intervals (by default approx. every 60 minutes) in the HYDRA subdirectory
./inf_int/interf (standard system). This directory is located in the HYDRA directory or in the system
directory in case of a multi-system environment.
MBL_ERP_Implementation_MF_Up.docx Version: 1.7.23186 Page 1 of 5

|     |     |     |     | Operation-related uploads  |     |
| --- | --- | --- | --- | -------------------------- | --- |

Data relevant to operations, such as quantities or times, are posted in the ERP system. The ERP system
manages and processes wrong postings separately.
The following specifications result for the IDOC:
| Message type:  |     | HY72ADRCK_TT          |     |     |     |
| -------------- | --- | --------------------- | --- | --- | --- |
| IDOC type:     |     | HY72ADRCK_TT          |     |     |     |
| File name:     |     | HY72ADRCK_TIMETICKET  |     |     |     |
File extension  According to configuration in MLE communication (Logical systems >
Outbound Configuration File Port)
Usually: .dat

It might be the case that negative yield quantities are posted when finishing the operation,
provided that part quantities are reported (requires customization services by MPDV) and data
is collected at the same time via the total quantity counter on machines working with HYDRA-

MDE. Remove the parameter /NEG_MENGE from the myerprck.scr script, provided that the
ERP system does not intend to post negative quantities.
An "S" (cancellation) entered in the ERFART field indicates corrected postings. You can find this
value in the Input type field  of the maintenance of postings. Provided that corrections are
uploaded, the system uploads the canceled values as absolute values (without algebraic signs),

i.e. with an "S" in the ERFART field.

Data structure
|   Field  | T  L  | D  Description   |     |     | From To2  |
| -------- | ----- | ---------------- | --- | --- | --------- |
1
| SART  | CHAR  1  |   Interface record type  |                              |     | 1  1  |
| ----- | -------- | ------------------------ | ---------------------------- | --- | ----- |
|       |          | "A“                      | uploads based on operations  |     |       |
|       |          | "P“                      | uploads based on persons     |     |       |

1 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
2 See footnote of column "From“

MBL_ERP_Implementation_MF_Up.docx  Version: 1.7.23186  Page 2 of 5

Operation-related uploads
Field T L D Description From To2
1
ERFART CHAR 1 Origin 2 2
" " Original data record as recorded
"E" data record created manually in the maintenance of
postings dialog (edited)
"S" Cancellation for ERP
RMNR CHAR 40 Upload/confirmation number (if available in HYDRA) 3 42
ANR CHAR 40 Order number 43 82
The exact length that is uploaded/confirmed depends on how the
lengths are configured for the order or operation in the HYDRA basic
parameter settings.
AUART CHAR 5 Order type of the order; according to HYDRA configuration 83 87
STEUER_KZ CHAR 1 Control indicator of the operation status when being recorded. The 88 88
indicator depends on the record type of the ADE log record.
"L“ OP is running (record type “A”)
"E“ OP is finished (record type “E”)
"U“ OP is interrupted (record type “U”, "T", "H")
Please note: - If you use split OPs, the system uploads/confirms the
status of the split master.- The value of this field is not defined for
personal uploads.
AG_STATUS CHAR 5 Operation status when the ERP upload is being performed, according 89 93
to the HYDRA configuration.
SCHICHTNR NUM 2 Shift according to the shift model assigned to the work center during 94 95
which the BDE posting was made. The shift number is right-aligned.
PERSZEIT DEC_O 10 2 Personal processing time (hours) 96 106
For postings of the interface record type "A":
If this posting record is a U record (interrupt order) or E
record (log off order), this field includes the labor time
recorded since this record is available. This field includes
the logon times of all persons who have logged on to this
operation.
This field does not include a duration, if it is a T record
(reporting part quantities/partial upload), H record (batch
posting) or an operation logon.
For postings of the interface record type "P":
The field includes the length of time a person was logged
on to an order. If a person is logged on to several
orders/operations simultaneously, the field shows the
proportionate labor time per order/operation. The
distribution is made proportionally according to the number
of operations to which the person is/was logged on at the
same time (proportionate labor time).
Resource Performance Accounts (RPA)
Times are posted to "resource performance accounts". All times refer
to the last confirmation/upload performed for the respective
operation.
The system returns order-related RPAs for postings based on orders
(interface record type "A").
The system returns personal RPAs for personal postings (record type
"P").
RPA01 DEC_O 7 2 Resource Performance Account (RPA) 1 in hours 107 114
RPA02 DEC_O 7 2 Resource Performance Account (RPA) 2 in hours 115 122
RPA03 DEC_O 7 2 Resource Performance Account (RPA) 3 in hours 123 130
RPA04 DEC_O 7 2 Resource Performance Account (RPA) 4 in hours 131 138
RPA05 DEC_O 7 2 Resource Performance Account (RPA) 5 in hours 139 146
RPA06 DEC_O 7 2 Resource Performance Account (RPA) 6 in hours 147 154
RPA07 DEC_O 7 2 Resource Performance Account (RPA) 7 in hours 155 162
RPA08 DEC_O 7 2 Resource Performance Account (RPA) 8 in hours 163 170
MBL_ERP_Implementation_MF_Up.docx Version: 1.7.23186 Page 3 of 5

|     |     |     |     | Operation-related uploads  |     |
| --- | --- | --- | --- | -------------------------- | --- |

|   Field  | T  L  | D  Description   |     |     | From To2  |
| -------- | ----- | ---------------- | --- | --- | --------- |
1
RPA09  DEC_O  7  2    Resource Performance Account (RPA) 9 in hours  171  178
RPA10  DEC_O  7  2    Resource Performance Account (RPA) 10 in hours  179  186
RPA11  DEC_O  7  2    Resource Performance Account (RPA) 11 in hours
|     |     |                     |                                                         |     |           |
| --- | --- | ------------------- | ------------------------------------------------------- | --- | --------- |
|     |     |                     | RPA 11 contains the production time (standard use/main  |     |           |
|     |     | utilization time).  |                                                         |     | 187  194  |
RPA12  DEC_O  7  2    Resource Performance Account (RPA) 12 in hours.
|     |     |     |                                                    |     |           |
| --- | --- | --- | -------------------------------------------------- | --- | --------- |
|     |     |     | RPA 12 contains neutral times (breaks or similar)  |     | 195  202  |
BMK_SUM  DEC_O  7  2  Total of resource performance accounts without breaks (RPA 12) in
|        |          | hours       |     |     |           |
| ------ | -------- | ----------- | --- | --- | --------- |
|        |          |             |     |     | 203  210  |
| FIRMA  | CHAR  4  |   reserved  |     |     |           |
|        |          |             |     |     | 211  214  |
GRUPPE  CHAR  8    Group where the workplace/machine is assigned to.
215  222

| ARBPL   | CHAR  8   |   Workplace/machine this posting refers to.  |     |     |           |
| ------- | --------- | -------------------------------------------- | --- | --- | --------- |
|         |           |                                              |     |     | 223  230  |
| PERSNR  | CHAR  10  |   Personnel number.                          |     |     |           |
  This data field includes the personnel number of the employee who
logged on/off or interrupted the operation. In case of personal
postings, this field includes the personnel number of the person for
whom data is uploaded/confirmed.
The precise length depends on the length configuration of the
|     |     | personnel number in the basic parameter settings of HYDRA.  |     |     | 231  240  |
| --- | --- | ----------------------------------------------------------- | --- | --- | --------- |
LOHNART  CHAR  4    Wage type if stored to the operation. Is directly taken over from the
|     |     | operation .  |     |     | 241  244  |
| --- | --- | ------------ | --- | --- | --------- |

GUT_BAS  DEC_O  13  3  Basic quantity of yield, if entered or calculated according to
|          |            | conversion factors.  |     |     | 245  258  |
| -------- | ---------- | -------------------- | --- | --- | --------- |
| AUS_BAS  | DEC_O  13  | 3                    |     |     |           |
Basic quantity of scrap, if entered or calculated according to
|     |     | conversion factors.  |     |     | 259  272  |
| --- | --- | -------------------- | --- | --- | --------- |

MEINH_BAS  CHAR  3    Basic quantity of the quantity unit, if stored to the operation.
|          |            |                                              |     |     | 273  275  |
| -------- | ---------- | -------------------------------------------- | --- | --- | --------- |
| GUT_PRI  | DEC_O  13  | 3  Collected yield in primary quantity unit  |     |     |           |
  Yield recorded in primary quantity unit since the last upload.  276  289
AUS_PRI  DEC_O  13  3  Scrap quantity collected in primary quantity unit since the last upload.
290  303

MEINH_PRI  CHAR  3    Primary unit of entry (primary quantity unit) from the operation.
|     |     |            |     |     | 304  306  |
| --- | --- | ---------- | --- | --- | --------- |
|     |     |   Reasons  |     |     |           |
Reasons are only transferred if the option “confirmation of partial
confirmations” is enabled for the order type and only in case of record
|        |          | type “T” postings. Otherwise the fields are empty.  |     |     |     |
| ------ | -------- | --------------------------------------------------- | --- | --- | --- |
| GUTGR  | CHAR  4  |   Yield reason (deviation reason)                   |     |     |     |
307  310

GUTGR_EXT  CHAR  5      Yield reason (deviation reason) – external reference
|        |          |                 |     |     | 311  315  |
| ------ | -------- | --------------- | --- | --- | --------- |
| AUSGR  | CHAR  4  |   Scrap reason  |     |     |           |
316  319

| AUSGR_EXT  | CHAR  5  |     | Scrap reason – external reference  |     |           |
| ---------- | -------- | --- | ---------------------------------- | --- | --------- |
|            |          |     |                                    |     | 320  324  |
ASTATUS  CHAR  1    Order status (control indicator of the order header status)
  This data field shows the status of an order. When finishing the last
recordable operation of an order, this field has the value "E" (end),
otherwise "L" (running). The value of this field is not defined for
|     |     | personal confirmations/uploads.  |     |     | 325  325  |
| --- | --- | -------------------------------- | --- | --- | --------- |

MBL_ERP_Implementation_MF_Up.docx  Version: 1.7.23186  Page 4 of 5

|     |     |     |     | Operation-related uploads  |     |
| --- | --- | --- | --- | -------------------------- | --- |

|   Field  | T  L  | D  Description   |     |     | From To2  |
| -------- | ----- | ---------------- | --- | --- | --------- |
1
ANMELD_DAT  DATE  8    Date of the terminal posting (login) in the format YYYYMMDD
|     |     |     |     |     | 326  333  |
| --- | --- | --- | --- | --- | --------- |
ANMELD_ZEIT  TIME  6    Time of the terminal posting (login) in the format HHMMSS
334  339

ABMELD_DAT  DATE  8    Date of the terminal posting (logoff) in the format YYYYMMDD
|     |     |     |     |     | 340  347  |
| --- | --- | --- | --- | --- | --------- |
ABMELD_ZEIT  TIME  6    Time of the terminal posting (logoff) in the format HHMMSS
|     |     |     |     |     | 348  353  |
| --- | --- | --- | --- | --- | --------- |
CHARGE  CHAR  20    Batch number only relevant in connection with ADE-CHV or MPL
354  373

BED_POS  CHAR  10    Entered operator position/function according to the HYDRA
|     |     | configuration, if entered  |     |     | 374  383  |
| --- | --- | -------------------------- | --- | --- | --------- |
LPKZ  CHAR  10    Entered wage/premium indicator according to the HYDRA
|     |     | configuration, if entered  |     |     | 384  393  |
| --- | --- | -------------------------- | --- | --- | --------- |
SOLL_TE  DEC_O  7  2  Target te from the log record (only filled if the LLE-BP license is
|     |     | available)  |     |     | 394  401  |
| --- | --- | ----------- | --- | --- | --------- |
SOLL_TR  DEC_O  7  2  Target tr from the log record (only filled if the LLE-BP license is
|     |     | available)  |     |     | 402  409  |
| --- | --- | ----------- | --- | --- | --------- |
SOLL_TEB  DEC_O  7  2  Target teb from the log record (only filled if the LLE-BP license is
|     |     | available)  |     |     | 410  417  |
| --- | --- | ----------- | --- | --- | --------- |

SOLL_TRB  DEC_O  7  2  Target trb from the log record (only filled if the LLE-BP license is
|     |     | available)  |     |     | 418  425  |
| --- | --- | ----------- | --- | --- | --------- |

MBL_ERP_Implementation_MF_Up.docx  Version: 1.7.23186  Page 5 of 5
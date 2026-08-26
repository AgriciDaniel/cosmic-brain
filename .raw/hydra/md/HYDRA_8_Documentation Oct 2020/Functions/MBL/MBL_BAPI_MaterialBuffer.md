|     |     |     |     |     | Material Buffer  |
| --- | --- | --- | --- | --- | ---------------- |

1  Material Buffer
Available methods
| Method         |     | Usage                   |     |     |     |
| -------------- | --- | ----------------------- | --- | --- | --- |
| MATPUF.INSERT  |     | Create material buffer  |     |     |     |
| MATPUF.UPDATE  |     | Change material buffer  |     |     |     |
| MATPUF.DELETE  |     | Delete material buffer  |     |     |     |

Data
| Column  |     | Description  |     |     |     |
| ------- | --- | ------------ | --- | --- | --- |
| Field   |     | Field name   |     |     |     |
V (usage)  S   Key field clearly identifying the data record. (Further key fields might be required). The field
must be completed.
| T(ype)    |     | Data type  of the field  |     |     |     |
| --------- | --- | ------------------------ | --- | --- | --- |
| L(ength)  |     | Field length             |     |     |     |
For fields of data type DEC: Overall number of digits without decimal separator and algebraic sign
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description  |     | Description and/or comment of the field  |     |     |     |
| ------------ | --- | ---------------------------------------- | --- | --- | --- |

| Field          |     | V  T     | L  D  | Description                         |     |
| -------------- | --- | -------- | ----- | ----------------------------------- | --- |
| MATPUF.MATPUF  |     | S  CHAR  | 12    | Material buffer                     |     |
| MATPUF.TYP     |     |   CHAR   | 1     | Type (see available values in GUI)  |     |
| MATPUF.BEZ     |     |   CHAR   | 30    | Name                                |     |
| MATPUF.LAGORT  |     |   CHAR   | 20    | Storage location                    |     |
| MATPUF.KST     |     |   CHAR   | 10    | Cost center                         |     |
| MATPUF.ABT     |     |   CHAR   | 10    | Department                          |     |
| MATPUF.BER     |     |   CHAR   | 10    | Area                                |     |
| MATPUF.FIR     |     |   CHAR   | 4     | Company                             |     |
| MATPUF.BEM     |     |   CHAR   | 20    | Comment                             |     |
| MATPUF.DAUER   |     |   NUMC   | 7     | Retention period                    |     |
MATPUF.OPT:TANRPRN    CHAR  1    Internal use - do not transfer acronym
MATPUF.OPT:NOTMATPUF    CHAR  1    Internal use - do not transfer acronym
| MATPUF.OPT:PKORB  |     |   CHAR  | 1    | ID "recycle bin" DLG  |     |
| ----------------- | --- | ------- | ---- | --------------------- | --- |
"J“  yes
"N“  no
| MATPUF.OPT:INBESTVER |     |   CHAR  |     | ID "Include in stock"  |     |
| -------------------- | --- | ------- | --- | ---------------------- | --- |
| B                    |     |         |     | "J“  yes               |     |
"N“  no
| MATPUF.HARCID  |     |   NUMC  | 3    | Hierarchy  |     |
| -------------- | --- | ------- | ---- | ---------- | --- |
MATPUF.HARCMATPUF    CHAR  12    Superordinate material buffer

MBL_BAPI_MaterialBuffer.docx  Version: 1.0.5819  Page 1 of 2

|     |     |     |     |     | Material Buffer  |
| --- | --- | --- | --- | --- | ---------------- |

| Field       |     | V  T    | L  D  | Description               |     |
| ----------- | --- | ------- | ----- | ------------------------- | --- |
| MATPUF.ART  |     |   CHAR  | 1     | Type of batch transport:  |     |
"K”  no buffer
"E"  input buffer
"A"  output buffer
| MATPUF.ZLO  |     |   CHAR  | 10    | Batch transport – corr. system  |     |
| ----------- | --- | ------- | ----- | ------------------------------- | --- |
MATPUF.OPT:LAGVERB    CHAR  1    Internal use - do not transfer acronym
| MATPUF.OPT:VIRTLAG  |     |   CHAR  | 1    | ID "Virt. stock buffer"  |     |
| ------------------- | --- | ------- | ---- | ------------------------ | --- |
"J“  yes
"N“  no

MBL_BAPI_MaterialBuffer.docx  Version: 1.0.5819  Page 2 of 2
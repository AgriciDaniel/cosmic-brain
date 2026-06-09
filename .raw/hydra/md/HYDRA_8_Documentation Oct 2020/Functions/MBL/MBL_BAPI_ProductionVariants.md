|     |     |     |     |     | Production Variants/Methods  |
| --- | --- | --- | --- | --- | ---------------------------- |

1  Production Variants/Methods

Available methods
| Method          |     | Usage                               |     |     |     |
| --------------- | --- | ----------------------------------- | --- | --- | --- |
| FERTVAR.INSERT  |     | Create a production variant/method  |     |     |     |
| FERTVAR.UPDATE  |     | Change a production variant/method  |     |     |     |
| FERTVAR.DELETE  |     | Delete a production variant/method  |     |     |     |

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

| Field            |     | V  T     | L  D  | Description          |     |
| ---------------- | --- | -------- | ----- | -------------------- | --- |
| FERTVAR.VER      |     | S  CHAR  | 10    | Version              |     |
| FERTVAR.ATK      |     | S  CHAR  | 40    | Article              |     |
| FERTVAR.ATK:BEZ  |     |   CHAR   | 40    | Article name         |     |
| FERTVAR.MNR      |     | S  CHAR  | 8     | Workplace            |     |
| FERTVAR.MGRP     |     | S  CHAR  | 8     | Group                |     |
| FERTVAR.FIR:ATK  |     | S  CHAR  | 10    | Company for article  |     |
| FERTVAR.RESTYP   |     |   CHAR   | 8     | Resource type        |     |
| FERTVAR.WANZ     |     |   NUMC   | 9     | Number of resources  |     |
| FERTVAR.RES      |     |   CHAR   | 20    | Resource             |     |
| FERTVAR.PRIO     |     |   NUMC   | 9     | Priority             |     |
FERTVAR.SZY    NUMC  9    Target cycle (in seconds/1000 cycles)
| FERTVAR.SZY:ABW  |     |   DEC   | 5  2  | Admissible deviation     |     |
| ---------------- | --- | ------- | ----- | ------------------------ | --- |
| FERTVAR.TLG      |     |   NUMC  | 9     | Partitioning             |     |
| FERTVAR.RUEZ     |     |   NUMC  | 9     | Setup time               |     |
| FERTVAR.ABRZ     |     |   NUMC  | 9     | Teardown/retooling time  |     |
| FERTVAR.DATB     |     |   DATE  |       | Valid from               |     |
| FERTVAR.DATE     |     |   DATE  |       | Valid until              |     |
| FERTVAR.STA      |     |   CHAR  | 1     | Status                   |     |
"F"  Released
"S"  Blocked
| FERTVAR.GRTXTNR  |     |   NUMC  | 4    | Blocking reason  |     |
| ---------------- | --- | ------- | ---- | ---------------- | --- |

MBL_BAPI_ProductionVariants.docx  Version: 1.1.5844  Page 1 of 3

|     |     |     |     |     | Production Variants/Methods  |
| --- | --- | --- | --- | --- | ---------------------------- |

| Field           |     | V  T    | L  D   | Description     |     |
| --------------- | --- | ------- | ------ | --------------- | --- |
| FERTVAR.BEM     |     |   CHAR  | 40     | Comment         |     |
| FERTVAR.USRFLD  |     |   CHAR  | 8      | User field key  |     |
| FERTVAR.FU:1    |     |   DATE  | 10     | User field 1    |     |
| FERTVAR.FU:2    |     |   DATE  | 10     | User field 2    |     |
| FERTVAR.FU:3    |     |   DATE  | 10     | User field 3    |     |
| FERTVAR.FU:4    |     |   DATE  | 10     | User field 4    |     |
| FERTVAR.FU:5    |     |   DATE  | 10     | User field 5    |     |
| FERTVAR.FU:6    |     |   DATE  | 10     | User field 6    |     |
| FERTVAR.FU:7    |     |   NUM   | 8      | User field 7    |     |
| FERTVAR.FU:8    |     |   NUM   | 8      | User field 8    |     |
| FERTVAR.FU:9    |     |   NUM   | 8      | User field 9    |     |
| FERTVAR.FU:10   |     |   NUM   | 8      | User field 10   |     |
| FERTVAR.FU:11   |     |   NUM   | 8      | User field 11   |     |
| FERTVAR.FU:12   |     |   NUM   | 8      | User field 12   |     |
| FERTVAR.FU:13   |     |   NUM   | 8      | User field 13   |     |
| FERTVAR.FU:14   |     |   NUM   | 8      | User field 14   |     |
| FERTVAR.FU:15   |     |   NUM   | 8      | User field 15   |     |
| FERTVAR.FU:16   |     |   NUM   | 8      | User field 16   |     |
| FERTVAR.FU:17   |     |   NUM   | 8      | User field 17   |     |
| FERTVAR.FU:18   |     |   NUM   | 8      | User field 18   |     |
| FERTVAR.FU:19   |     |   NUM   | 8      | User field 19   |     |
| FERTVAR.FU:20   |     |   NUM   | 8      | User field 20   |     |
| FERTVAR.FU:21   |     |   NUM   | 8      | User field 21   |     |
| FERTVAR.FU:22   |     |   NUM   | 8      | User field 22   |     |
| FERTVAR.FU:23   |     |   DEC   | 13  3  | User field 23   |     |
| FERTVAR.FU:24   |     |   DEC   | 13  3  | User field 24   |     |
| FERTVAR.FU:25   |     |   DEC   | 13  3  | User field 25   |     |
| FERTVAR.FU:26   |     |   DEC   | 13  3  | User field 26   |     |
| FERTVAR.FU:27   |     |   DEC   | 13  3  | User field 27   |     |
| FERTVAR.FU:28   |     |   DEC   | 13  3  | User field 28   |     |
| FERTVAR.FU:29   |     |   CHAR  | 1      | User field 29   |     |
| FERTVAR.FU:30   |     |   CHAR  | 1      | User field 30   |     |
| FERTVAR.FU:31   |     |   CHAR  | 1      | User field 31   |     |
| FERTVAR.FU:32   |     |   CHAR  | 1      | User field 32   |     |
| FERTVAR.FU:33   |     |   CHAR  | 1      | User field 33   |     |
| FERTVAR.FU:34   |     |   CHAR  | 1      | User field 34   |     |
| FERTVAR.FU:35   |     |   CHAR  | 1      | User field 35   |     |
| FERTVAR.FU:36   |     |   CHAR  | 1      | User field 36   |     |
| FERTVAR.FU:37   |     |   CHAR  | 1      | User field 37   |     |
| FERTVAR.FU:38   |     |   CHAR  | 1      | User field 38   |     |
| FERTVAR.FU:39   |     |   CHAR  | 1      | User field 39   |     |
| FERTVAR.FU:40   |     |   CHAR  | 1      | User field 40   |     |
| FERTVAR.FU:41   |     |   CHAR  | 1      | User field 41   |     |
| FERTVAR.FU:42   |     |   CHAR  | 1      | User field 42   |     |
| FERTVAR.FU:43   |     |   CHAR  | 1      | User field 43   |     |
| FERTVAR.FU:44   |     |   CHAR  | 1      | User field 44   |     |
| FERTVAR.FU:45   |     |   CHAR  | 10     | User field 45   |     |
| FERTVAR.FU:46   |     |   CHAR  | 10     | User field 46   |     |

MBL_BAPI_ProductionVariants.docx  Version: 1.1.5844  Page 2 of 3

|     |     |     |     |     | Production Variants/Methods  |
| --- | --- | --- | --- | --- | ---------------------------- |

| Field          |     | V  T    | L  D  | Description    |     |
| -------------- | --- | ------- | ----- | -------------- | --- |
| FERTVAR.FU:47  |     |   CHAR  | 10    | User field 47  |     |
| FERTVAR.FU:48  |     |   CHAR  | 10    | User field 48  |     |
| FERTVAR.FU:49  |     |   CHAR  | 10    | User field 49  |     |
| FERTVAR.FU:50  |     |   CHAR  | 10    | User field 50  |     |
| FERTVAR.FU:51  |     |   CHAR  | 20    | User field 51  |     |
| FERTVAR.FU:52  |     |   CHAR  | 20    | User field 52  |     |
| FERTVAR.FU:53  |     |   CHAR  | 20    | User field 53  |     |
| FERTVAR.FU:54  |     |   CHAR  | 20    | User field 54  |     |
| FERTVAR.FU:55  |     |   CHAR  | 20    | User field 55  |     |
| FERTVAR.FU:56  |     |   CHAR  | 20    | User field 56  |     |
| FERTVAR.FU:57  |     |   CHAR  | 20    | User field 57  |     |
| FERTVAR.FU:58  |     |   CHAR  | 20    | User field 58  |     |
| FERTVAR.FU:59  |     |   CHAR  | 20    | User field 59  |     |
| FERTVAR.FU:60  |     |   CHAR  | 20    | User field 60  |     |
| FERTVAR.FU:61  |     |   CHAR  | 20    | User field 61  |     |
| FERTVAR.FU:62  |     |   CHAR  | 20    | User field 62  |     |
| FERTVAR.FU:63  |     |   CHAR  | 20    | User field 63  |     |
| FERTVAR.FU:64  |     |   CHAR  | 20    | User field 64  |     |
| FERTVAR.FU:65  |     |   CHAR  | 40    | User field 65  |     |
| FERTVAR.FU:66  |     |   CHAR  | 40    | User field 66  |     |

Information on key fields:
The fields "group" (FERTVAR.MGRP) and "workplace" (FERTVAR.MNR) can be entered separately or
together. But one of the two values must be entered in any case.

MBL_BAPI_ProductionVariants.docx  Version: 1.1.5844  Page 3 of 3
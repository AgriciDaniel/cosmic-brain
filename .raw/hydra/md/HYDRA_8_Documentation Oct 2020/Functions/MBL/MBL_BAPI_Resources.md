|     |     |     |     |     | Resources  |
| --- | --- | --- | --- | --- | ---------- |

1  Resources

Available methods
| Method      |     | Usage            |     |     |     |
| ----------- | --- | ---------------- | --- | --- | --- |
| RES.INSERT  |     | Create resource  |     |     |     |
| RES.UPDATE  |     | Change resource  |     |     |     |
| RES.DELETE  |     | Delete resource  |     |     |     |

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

| Field             |     | V  T     | L  D  | Description                   |     |
| ----------------- | --- | -------- | ----- | ----------------------------- | --- |
| RES.RES           |     | S  CHAR  | 20    | Resource                      |     |
| RES.RESTYP        |     | S  CHAR  | 8     | Resource type                 |     |
| RES.BEZ           |     |   CHAR   | 40    | Name                          |     |
| RES.VAB           |     |   CHAR   | 15    | Responsibility area           |     |
| RES.KST           |     |   CHAR   | 10    | Cost center                   |     |
| RES.INVNR         |     |   CHAR   | 40    | Inventory number              |     |
| RES.GRAVNR        |     |   CHAR   | 40    | Engraving number              |     |
| RES.ZEICHNR       |     |   CHAR   | 20    | Drawing number                |     |
| RES.HERST         |     |   CHAR   | 40    | Manufacturer                  |     |
| RES.EIGENT        |     |   CHAR   | 40    | Owner                         |     |
| RES.ANSCHAFFDAT   |     |   DATE   |       | Date of purchase              |     |
| RES.ANSCHAFFKOST  |     |   DEC    | 9  2  | Acquisition costs             |     |
| RES.MATPUF:S      |     |   CHAR   | 10    | Storage location              |     |
| RES.LIEFDAT       |     |   DATE   |       | Delivery date                 |     |
| RES.INBDAT        |     |   DATE   |       | Start-up date                 |     |
| RES.GARDAT        |     |   DATE   |       | Guarantee date                |     |
| RES.BEZFREMD      |     |   CHAR   | 50    | External name                 |     |
| RES.TYPBEZ        |     |   CHAR   | 50    | Description of resource type  |     |
RES.VERW    CHAR  25    Use (see possible entries displayed in the GUI)
| RES.BESTNR  |     |   CHAR  | 25    | Purchase order number  |     |
| ----------- | --- | ------- | ----- | ---------------------- | --- |

| MBL_BAPI_Resources.docx  |     |     | Version: 1.1.5822  |     | Page 1 of 4  |
| ------------------------ | --- | --- | ------------------ | --- | ------------ |

|     |     |     |     |     | Resources  |
| --- | --- | --- | --- | --- | ---------- |

| Field       |     | V  T    | L  D  | Description   |     |
| ----------- | --- | ------- | ----- | ------------- | --- |
| RES.LIEFNR  |     |   CHAR  | 25    | Supplier no.  |     |
RES.VERANT:TYP    CHAR  25    Party in charge Type (see possible entries displayed in the GUI)
| RES.VERANT:NR  |     |   CHAR  | 25    | Party in charge  |     |
| -------------- | --- | ------- | ----- | ---------------- | --- |
| RES.ANONYM     |     |   CHAR  | 1     | Type             |     |
"J“  Anonymous resource
"N“  No anonymous resource
"B“  Required resource
RES.OPT:TYPGL    CHAR  1    Equal type (see possible entries displayed in the GUI)
| RES.RESVER          |     |   CHAR  | 12    | Version                                |     |
| ------------------- | --- | ------- | ----- | -------------------------------------- | --- |
| RES.ANZ             |     |   NUMC  | 5     | Number                                 |     |
| RES.RESFAMID        |     |   NUMC  | 7     | Family                                 |     |
| RES.SGR:HUB         |     |   NUMC  | 12    | Cycles                                 |     |
| RES.OPT:EINH        |     |   CHAR  | 3     | Input unit                             |     |
| RES.SGR:KLKLZ       |     |   NUMC  | 9     | Run time (in seconds)                  |     |
| RES.SZY             |     |   NUMC  | 9     | Target cycle (in seconds/1000 cycles)  |     |
| RES.TLG:S           |     |   NUMC  | 5     | Original partitioning                  |     |
| RES.TLG:I           |     |   NUMC  | 5     | Current partitioning                   |     |
| RES.OPT:AUTOANMELD  |     |   CHAR  | 1     | Log on with OP                         |     |
"J“  log on resource with order when A_AN or log off
resource with order when A_AB
"N“  do not log on/off resource with order (if DNC always "N")
"E“  explicit logon / change to logon allowed (as of version
WRM 7.2)
RES.OPT:MULTIMNR    CHAR  1    ID "Can be logged on at the same time"
"J“  yes
"N“  no
| RES.OPT:VERB  |     |   CHAR  | 1    | ID "Post to resource"  |     |
| ------------- | --- | ------- | ---- | ---------------------- | --- |
"J“  yes
"N“  no
| RES.ANFZ  |     |   NUMC  | 9    | Setup time (in seconds)  |     |
| --------- | --- | ------- | ---- | ------------------------ | --- |
RES.ABRZ    NUMC  9    Retooling (teardown) time (in seconds)
RES.OPT:BEL    CHAR  1    Assignment (see possible entries displayed in the GUI)
| RES.OPT:AUSWSIB  |     |   CHAR  | 1    | ID "Consider in evaluations"  |     |
| ---------------- | --- | ------- | ---- | ----------------------------- | --- |
"J“  yes
"N“  no
| RES.SPEICHORT:DATA  |     |   CHAR  | 128    | File name               |     |
| ------------------- | --- | ------- | ------ | ----------------------- | --- |
| RES.RES:V1          |     |   CHAR  | 20     | Resource 1              |     |
| RES.RESTYP:V1       |     |   CHAR  | 8      | Resource type 1         |     |
| RES.RES:V2          |     |   CHAR  | 20     | Resource 2              |     |
| RES.RESTYP:V2       |     |   CHAR  | 8      | Resource type 2         |     |
| RES.GENAUSKL        |     |   CHAR  | 50     | Accuracy class          |     |
| RES.EINHEIT         |     |   CHAR  | 3      | Unit                    |     |
| RES.MESSBAB         |     |   DEC   | 10  4  | Measurement range from  |     |
| RES.MESSBBIS        |     |   DEC   | 10  4  | Measurement range to    |     |
| RES.MEISTM          |     |   DEC   | 10  4  | Master value            |     |
| RES.MEISTLAB        |     |   DEC   | 10  4  | Master tolerance from   |     |
| RES.MEISTLBIS       |     |   DEC   | 10  4  | Master tolerance to     |     |
| RES.USRFLD          |     |   CHAR  | 8      | User field key          |     |
| RES.FU:1            |     |   DATE  | 10     | User field 1            |     |
| RES.FU:2            |     |   DATE  | 10     | User field 2            |     |
| RES.FU:3            |     |   DATE  | 10     | User field 3            |     |

| MBL_BAPI_Resources.docx  |     |     | Version: 1.1.5822  |     | Page 2 of 4  |
| ------------------------ | --- | --- | ------------------ | --- | ------------ |

|     |     |     |     |     | Resources  |
| --- | --- | --- | --- | --- | ---------- |

| Field      |     | V  T    | L  D   | Description    |     |
| ---------- | --- | ------- | ------ | -------------- | --- |
| RES.FU:4   |     |   DATE  | 10     | User field 4   |     |
| RES.FU:5   |     |   DATE  | 10     | User field 5   |     |
| RES.FU:6   |     |   DATE  | 10     | User field 6   |     |
| RES.FU:7   |     |   NUM   | 8      | User field 7   |     |
| RES.FU:8   |     |   NUM   | 8      | User field 8   |     |
| RES.FU:9   |     |   NUM   | 8      | User field 9   |     |
| RES.FU:10  |     |   NUM   | 8      | User field 10  |     |
| RES.FU:11  |     |   NUM   | 8      | User field 11  |     |
| RES.FU:12  |     |   NUM   | 8      | User field 12  |     |
| RES.FU:13  |     |   NUM   | 8      | User field 13  |     |
| RES.FU:14  |     |   NUM   | 8      | User field 14  |     |
| RES.FU:15  |     |   NUM   | 8      | User field 15  |     |
| RES.FU:16  |     |   NUM   | 8      | User field 16  |     |
| RES.FU:17  |     |   NUM   | 8      | User field 17  |     |
| RES.FU:18  |     |   NUM   | 8      | User field 18  |     |
| RES.FU:19  |     |   NUM   | 8      | User field 19  |     |
| RES.FU:20  |     |   NUM   | 8      | User field 20  |     |
| RES.FU:21  |     |   NUM   | 8      | User field 21  |     |
| RES.FU:22  |     |   NUM   | 8      | User field 22  |     |
| RES.FU:23  |     |   DEC   | 13  3  | User field 23  |     |
| RES.FU:24  |     |   DEC   | 13  3  | User field 24  |     |
| RES.FU:25  |     |   DEC   | 13  3  | User field 25  |     |
| RES.FU:26  |     |   DEC   | 13  3  | User field 26  |     |
| RES.FU:27  |     |   DEC   | 13  3  | User field 27  |     |
| RES.FU:28  |     |   DEC   | 13  3  | User field 28  |     |
| RES.FU:29  |     |   CHAR  | 1      | User field 29  |     |
| RES.FU:30  |     |   CHAR  | 1      | User field 30  |     |
| RES.FU:31  |     |   CHAR  | 1      | User field 31  |     |
| RES.FU:32  |     |   CHAR  | 1      | User field 32  |     |
| RES.FU:33  |     |   CHAR  | 1      | User field 33  |     |
| RES.FU:34  |     |   CHAR  | 1      | User field 34  |     |
| RES.FU:35  |     |   CHAR  | 1      | User field 35  |     |
| RES.FU:36  |     |   CHAR  | 1      | User field 36  |     |
| RES.FU:37  |     |   CHAR  | 1      | User field 37  |     |
| RES.FU:38  |     |   CHAR  | 1      | User field 38  |     |
| RES.FU:39  |     |   CHAR  | 1      | User field 39  |     |
| RES.FU:40  |     |   CHAR  | 1      | User field 40  |     |
| RES.FU:41  |     |   CHAR  | 1      | User field 41  |     |
| RES.FU:42  |     |   CHAR  | 1      | User field 42  |     |
| RES.FU:43  |     |   CHAR  | 1      | User field 43  |     |
| RES.FU:44  |     |   CHAR  | 1      | User field 44  |     |
| RES.FU:45  |     |   CHAR  | 10     | User field 45  |     |
| RES.FU:46  |     |   CHAR  | 10     | User field 46  |     |
| RES.FU:47  |     |   CHAR  | 10     | User field 47  |     |
| RES.FU:48  |     |   CHAR  | 10     | User field 48  |     |
| RES.FU:49  |     |   CHAR  | 10     | User field 49  |     |
| RES.FU:50  |     |   CHAR  | 10     | User field 50  |     |
| RES.FU:51  |     |   CHAR  | 20     | User field 51  |     |

| MBL_BAPI_Resources.docx  |     |     | Version: 1.1.5822  |     | Page 3 of 4  |
| ------------------------ | --- | --- | ------------------ | --- | ------------ |

|     |     |     |     |     | Resources  |
| --- | --- | --- | --- | --- | ---------- |

| Field      |     | V  T    | L  D  | Description      |     |
| ---------- | --- | ------- | ----- | ---------------- | --- |
| RES.FU:52  |     |   CHAR  | 20    | User field 52    |     |
| RES.FU:53  |     |   CHAR  | 20    | User field 53    |     |
| RES.FU:54  |     |   CHAR  | 20    | User field 54    |     |
| RES.FU:55  |     |   CHAR  | 20    | User field 55    |     |
| RES.FU:56  |     |   CHAR  | 20    | User field 56    |     |
| RES.FU:57  |     |   CHAR  | 20    | User field 57    |     |
| RES.FU:58  |     |   CHAR  | 20    | User field 58    |     |
| RES.FU:59  |     |   CHAR  | 20    | User field 59    |     |
| RES.FU:60  |     |   CHAR  | 20    | User field 60    |     |
| RES.FU:61  |     |   CHAR  | 20    | User field 61    |     |
| RES.FU:62  |     |   CHAR  | 20    | User field 62    |     |
| RES.FU:63  |     |   CHAR  | 20    | User field 63    |     |
| RES.FU:64  |     |   CHAR  | 20    | User field 64    |     |
| RES.FU:65  |     |   CHAR  | 40    | User field 65    |     |
| RES.FU:66  |     |   CHAR  | 40    | User field 66    |     |
| RES.BEM:1  |     |   CHAR  | 60    | Comment field 1  |     |
| RES.BEM:2  |     |   CHAR  | 60    | Comment field 2  |     |
| RES.BEM:3  |     |   CHAR  | 60    | Comment field 3  |     |
| RES.BEM:4  |     |   CHAR  | 60    | Comment field 4  |     |
| RES.BEM:5  |     |   CHAR  | 60    | Comment field 5  |     |
| RES.BEM:6  |     |   CHAR  | 60    | Comment field 6  |     |

| MBL_BAPI_Resources.docx  |     |     | Version: 1.1.5822  |     | Page 4 of 4  |
| ------------------------ | --- | --- | ------------------ | --- | ------------ |
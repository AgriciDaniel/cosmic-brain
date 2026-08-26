|     |     |     |     |     | Machines / Workplaces  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

1  Machines / Workplaces

Available methods
| Method      |     | Usage                     |     |     |     |     |
| ----------- | --- | ------------------------- | --- | --- | --- | --- |
| MNR.INSERT  |     | Create machine/workplace  |     |     |     |     |
| MNR.UPDATE  |     | Change machine/workplace  |     |     |     |     |
| MNR.DELETE  |     | Delete machine/workplace  |     |     |     |     |

Data
| Column  |     | Description  |     |     |     |     |
| ------- | --- | ------------ | --- | --- | --- | --- |
| Field   |     | Field name   |     |     |     |     |
V (usage)  S   Key field clearly identifying the data record. (Further key fields might be required). The field
must be completed.
|           |     | M  Mandatory field       |     |     |     |     |
| --------- | --- | ------------------------ | --- | --- | --- | --- |
| T(ype)    |     | Data type  of the field  |     |     |     |     |
| L(ength)  |     | Field length             |     |     |     |     |
For fields of data type DEC: Overall number of digits without decimal separator and algebraic sign
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description  |     | Description and/or comment of the field  |     |     |     |     |
| ------------ | --- | ---------------------------------------- | --- | --- | --- | --- |

| Field      |     | V  T     | L  D  | Description          |     |     |
| ---------- | --- | -------- | ----- | -------------------- | --- | --- |
| BEARB      |     | M  CHAR  | 10    | HYDRA User           |     |     |
| MNR.MNR    |     | S  CHAR  | 8     | Machine/workplace    |     |     |
| MNR.BEZK   |     |   CHAR   | 8     | Short name           |     |     |
| MNR.BEZL   |     |   CHAR   | 40    | Name                 |     |     |
| MNR.VAB    |     |   CHAR   | 15    | Responsibility area  |     |     |
| MNR.KST    |     |   CHAR   | 10    | Cost center          |     |     |
MNR.TYP    CHAR  1    Workplace category (see possible values displayed in the GUI)
| MNR.SPERR  |     |   CHAR  | 1    | ID "blocked"  |     |     |
| ---------- | --- | ------- | ---- | ------------- | --- | --- |
"J“  yes
"N“  no
MNR.ART    CHAR  1    Workplace type (see possible values displayed in the GUI)
| MNR.OPT:FREMDAPZ  |     |   CHAR  | 1    | ID "external workplace"  |     |     |
| ----------------- | --- | ------- | ---- | ------------------------ | --- | --- |
"J“  yes
"N“  no
| MNR.FIR       |     |   CHAR  | 4     | Company                |     |     |
| ------------- | --- | ------- | ----- | ---------------------- | --- | --- |
| MNR.MGRP      |     |   CHAR  | 8     | Group                  |     |     |
| MNR.CAT       |     |   CHAR  | 10    | Category               |     |     |
| MNR.BDEJMOD   |     |   NUMC  | 3     | Year model             |     |     |
| MNR.MSTDSATZ  |     |   DEC   | 6  2  | Standard rate machine  |     |     |
| MNR.PSTDSATZ  |     |   DEC   | 6  2  | Standard labor rate    |     |     |

| MBL_BAPI_Workplace.docx  |     |     | Version: 1.2.18742  |     |     | Page 1 of 6  |
| ------------------------ | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     | Machines / Workplaces  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

| Field        |     | V  T    | L  D  | Description        |     |     |
| ------------ | --- | ------- | ----- | ------------------ | --- | --- |
| MNR.LEIGRAD  |     |   NUMC  | 3     | Performance level  |     |     |
MNR.AKKORD    CHAR  1    Incentive wage indicator (see possible values displayed in the
GUI)
| MNR.ICON  |     |   CHAR  | 20    | File name  |     |     |
| --------- | --- | ------- | ----- | ---------- | --- | --- |
MNR.OPT:MULTIAG    CHAR  1    Logon of multiple OPs (see possible values displayed in the GUI)
MNR.OPT:VLISTMOD    CHAR  1    Sequencing list (see possible values displayed in the GUI)
| MNR.VLISTANZ  |     |   NUMC  | 3    | Number of OPs in sequencing list  |     |     |
| ------------- | --- | ------- | ---- | --------------------------------- | --- | --- |
MNR.OPT:VLISTZW    CHAR  1    Compulsory sequence (see possible values displayed in the GUI)
| MNR.VISLIST3  |     |   CHAR  | 10    | Display 3rd list   |     |     |
| ------------- | --- | ------- | ----- | ------------------ | --- | --- |
The field includes none, one or several of these options. They are
separated by semicolon:

“M”  Input material
“R”  Resources
“P“  Staff
"A“  Output material

Example:
"M;R;P;A" if all options are set
MNR.VISFHMTNRAAN    CHAR  1    Material/PRT list when logging on OPs (see possible values
displayed in the GUI)
| MNR.DLGSTRG  |     |   CHAR  | 10    | Dialog control  |     |     |
| ------------ | --- | ------- | ----- | --------------- | --- | --- |
MNR.OPT:MAABP    CHAR  1    Quantity posting to staff (see possible values displayed in the
GUI)
MNR.OPT:AGIST    CHAR  1    ID "Posting on OPs not logged on"
"J“  yes
"N“  no
MNR.OPT:ANTDAUER    CHAR  1    Posting of machine time for simultaneous OPs (see possible
values displayed in the GUI)
MNR.OPT:AANSKBAUTO    CHAR  1    Log OP on automatically when shift ends (see possible values
displayed in the GUI)
MNR.OPT:PABSKE    CHAR  1    Log person off automatically when shift ends (see possible values
displayed in the GUI)
MNR.PLANFKT    CHAR  1    Planning function (see possible values displayed in the GUI)
| MNR.PLANJMOD  |     |   NUMC  | 3    | Planned year model      |     |     |
| ------------- | --- | ------- | ---- | ----------------------- | --- | --- |
| MNR.KAPJMOD   |     |   NUMC  | 5    | Availability (per mil)  |     |     |
MNR.OPT:CHV    CHAR  1    Batch management (see possible values displayed in the GUI)
| MNR.MATPUF:IN   |     |   CHAR  | 12    | Preceding material buffer   |     |     |
| --------------- | --- | ------- | ----- | --------------------------- | --- | --- |
| MNR.MATPUF:OUT  |     |   CHAR  | 12    | Subsequent material buffer  |     |     |
MNR.OPT:CNRAUTOGEN    CHAR  1    Automatic generation of batch number (see possible values
displayed in the GUI)
| MNR.VISVERBRBLZ  |     |   CHAR  | 1    | ID "Consumption balance"  |     |     |
| ---------------- | --- | ------- | ---- | ------------------------- | --- | --- |
"J“  yes
"N“  no
MNR.OPT:TRANROUT    CHAR  1    ID "Generate transport order for output material"
"J“  yes
"N“  no
MNR.OPT:TRANRIN    CHAR  1    ID "Generate transport order for input material"
"J“  yes
"N“  no
| MNR.VERB:GUT  |     |   CHAR  | 3    | Allocation of yield  |     |     |
| ------------- | --- | ------- | ---- | -------------------- | --- | --- |
"AUS“  Scrap
"NCH“  Rework
"PRB“  Open quantity

| MBL_BAPI_Workplace.docx  |     |     | Version: 1.2.18742  |     |     | Page 2 of 6  |
| ------------------------ | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     | Machines / Workplaces  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

| Field         |     | V  T    | L  D  | Description          |     |     |
| ------------- | --- | ------- | ----- | -------------------- | --- | --- |
| MNR.VERB:AUS  |     |   CHAR  | 3     | Allocation of scrap  |     |     |
"GUT“  Yield
"NCH“  Rework
"PRB“  Open quantity
| MNR.VERB:NCH  |     |   CHAR  | 3    | Allocation of rework  |     |     |
| ------------- | --- | ------- | ---- | --------------------- | --- | --- |
"GUT“  Yield
"AUS“  Scrap
"PRB“  Open quantity
| MNR.VERB:PRB  |     |   CHAR  | 3    | Allocation of open quantity  |     |     |
| ------------- | --- | ------- | ---- | ---------------------------- | --- | --- |
"GUT“  Yield
"AUS“  Scrap
"NCH“  Rework
| MNR.OPT:GUTMANU  |     |   CHAR  | 1    | ID "Manual entry of yield"  |     |     |
| ---------------- | --- | ------- | ---- | --------------------------- | --- | --- |
"J“  yes
"N“  no
| MNR.OPT:AUSMANU  |     |   CHAR  | 1    | ID "Manual entry of scrap"  |     |     |
| ---------------- | --- | ------- | ---- | --------------------------- | --- | --- |
"J“  yes
"N“  no
MNR.OPT:NCHMANU    CHAR  1    ID "Manual entry of rework quantity"
"J“  yes
"N“  no
MNR.OPT:PRBMANU    CHAR  1    ID "Manual entry of open quantity"
"J“  yes
"N“  no
MNR.OPT:GUTMANUTAKT    CHAR  1    ID "Posting of yield as cycles"
"J“  yes
"N“  no
MNR.OPT:AUSMANUTAKT    CHAR  1    ID "Posting of scrap as cycles"
"J“  yes
"N“  no
MNR.OPT:NCHMANUTAKT    CHAR  1    ID "Posting of rework as cycles"
"J“  yes
"N“  no
MNR.OPT:PRBMANUTAKT    CHAR  1    ID "Posting of open quantity as cycles"
"J“  yes
"N“  no
MNR.OPT:UMRMENGE    CHAR  1    Basis for MDE quantity conversion (see possible values displayed
in the GUI)
| MNR.EGE:GUTP  |     |   CHAR  | 3    | Quantity unit (P)  |     |     |
| ------------- | --- | ------- | ---- | ------------------ | --- | --- |
MNR.UMRFAKTP:Z    NUMC  9    Quantity unit (P) - numerator, primary quantity
MNR.UMRFAKTP:N    NUMC  9    Quantity unit (P) - denominator, primary quantity
| MNR.EGE:GUTS  |     |   CHAR  | 3    | Quantity unit (S)  |     |     |
| ------------- | --- | ------- | ---- | ------------------ | --- | --- |
MNR.UMRFAKTS:Z    NUMC  9    Quantity unit (S) - numerator, primary quantity
MNR.UMRFAKTS:N    NUMC  9    Quantity unit (S) - denominator, primary quantity
| MNR.EGE:GUTT  |     |   CHAR  | 3    | Quantity unit (T)  |     |     |
| ------------- | --- | ------- | ---- | ------------------ | --- | --- |
MNR.UMRFAKTT:Z    NUMC  9    Quantity unit (T) - numerator, primary quantity
MNR.UMRFAKTT:N    NUMC  9    Quantity unit (T) - denominator, primary quantity
| MNR.EGE:GUTB  |     |   CHAR  | 3    | Quantity unit (B)  |     |     |
| ------------- | --- | ------- | ---- | ------------------ | --- | --- |
| MNR.UEBART    |     |   CHAR  | 1    | Monitoring type    |     |     |
“Z”  Cyclic monitoring
"B”  Operating signal
"K“  No monitoring
MNR.UEBDAUER    NUMC  3    Minimum cycle/malfunction time (seconds)

| MBL_BAPI_Workplace.docx  |     |     | Version: 1.2.18742  |     |     | Page 3 of 6  |
| ------------------------ | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     | Machines / Workplaces  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

| Field         |     | V  T    | L  D  | Description              |     |     |
| ------------- | --- | ------- | ----- | ------------------------ | --- | --- |
| MNR.IZYABW    |     |   NUMC  | 4     | Cycle extension          |     |     |
| MNR.ANZSTAKT  |     |   NUMC  | 4     | Number of target cycles  |     |     |
| MNR.MWANZ     |     |   NUMC  | 1     | Cycles to be evaluated   |     |     |
MNR.OPT:MSTAUAUF    CHAR  1    ID "Activation of required malfunction reason input"
"J“  yes
"N“  no
| MNR.OPT:MSTAUDAUER  |     |   NUMC  | 4    | Delay time (seconds)       |     |     |
| ------------------- | --- | ------- | ---- | -------------------------- | --- | --- |
| MNR.BUCHPSPERRE     |     |   CHAR  | 1    | Posting during prod. lock  |     |     |
"G"  Posting as yield
"A”  Posting as scrap
"X”  No posting
| MNR.IMPFAKT  |     |   NUMC  | 3    | Pulse factor specific to machines  |     |     |
| ------------ | --- | ------- | ---- | ---------------------------------- | --- | --- |
| MNR.TLG      |     |   NUMC  | 5    | Partitioning specific to machines  |     |     |
MNR.STKZG    NUMC  4    Waiting period short-term malfunction (seconds)
MNR.OPT:WENDAUTO    CHAR  1    ID "Extended weekend automatic"
"J“  yes
"N“  no
| MNR.DIGOUT:MSPERRE  |     |   NUMC  | 2    | Output "machine lock"  |     |     |
| ------------------- | --- | ------- | ---- | ---------------------- | --- | --- |
MNR.DIGOUT:SMENGE    NUMC  2    Output "target quantity reached"
| MNR.DIGOUT:STOER  |     |   NUMC  | 2    | Output "machine down"      |     |     |
| ----------------- | --- | ------- | ---- | -------------------------- | --- | --- |
| MNR.DIGIO         |     |   NUMC  | 2    | Free I/O                   |     |     |
| MNR.DIGIN:CAWL    |     |   NUMC  | 2    | Output batch change        |     |     |
| MNR.OPT:PDV       |     |   CHAR  | 1    | ID "Collect process data"  |     |     |
"J“  yes
"N“  no
| MNR.EXTTYP  |     |   CHAR  | 1    | External connection  |     |     |
| ----------- | --- | ------- | ---- | -------------------- | --- | --- |
"K”  No external connection
"J”  DS100
"N“  MT3
"E“  Engel interfacing
"A“  Arburg control system
"P"  PDE (Process Data Collection)
| MNR.EXTSNR  |     |   NUMC  | 8     | Serial number   |     |     |
| ----------- | --- | ------- | ----- | --------------- | --- | --- |
| MNR.EXTID   |     |   NUCM  | 2     | Device address  |     |     |
| MNR.USRFLD  |     |   CHAR  | 8     | User field key  |     |     |
| MNR.FU:1    |     |   DATE  | 10    | User field 1    |     |     |
| MNR.FU:2    |     |   DATE  | 10    | User field 2    |     |     |
| MNR.FU:3    |     |   DATE  | 10    | User field 3    |     |     |
| MNR.FU:4    |     |   DATE  | 10    | User field 4    |     |     |
| MNR.FU:5    |     |   DATE  | 10    | User field 5    |     |     |
| MNR.FU:6    |     |   DATE  | 10    | User field 6    |     |     |
| MNR.FU:7    |     |   NUM   | 8     | User field 7    |     |     |
| MNR.FU:8    |     |   NUM   | 8     | User field 8    |     |     |
| MNR.FU:9    |     |   NUM   | 8     | User field 9    |     |     |
| MNR.FU:10   |     |   NUM   | 8     | User field 10   |     |     |
| MNR.FU:11   |     |   NUM   | 8     | User field 11   |     |     |
| MNR.FU:12   |     |   NUM   | 8     | User field 12   |     |     |
| MNR.FU:13   |     |   NUM   | 8     | User field 13   |     |     |
| MNR.FU:14   |     |   NUM   | 8     | User field 14   |     |     |
| MNR.FU:15   |     |   NUM   | 8     | User field 15   |     |     |
| MNR.FU:16   |     |   NUM   | 8     | User field 16   |     |     |

| MBL_BAPI_Workplace.docx  |     |     | Version: 1.2.18742  |     |     | Page 4 of 6  |
| ------------------------ | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     | Machines / Workplaces  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

| Field      |     | V  T    | L  D   | Description    |     |     |
| ---------- | --- | ------- | ------ | -------------- | --- | --- |
| MNR.FU:17  |     |   NUM   | 8      | User field 17  |     |     |
| MNR.FU:18  |     |   NUM   | 8      | User field 18  |     |     |
| MNR.FU:19  |     |   NUM   | 8      | User field 19  |     |     |
| MNR.FU:20  |     |   NUM   | 8      | User field 20  |     |     |
| MNR.FU:21  |     |   NUM   | 8      | User field 21  |     |     |
| MNR.FU:22  |     |   NUM   | 8      | User field 22  |     |     |
| MNR.FU:23  |     |   DEC   | 13  3  | User field 23  |     |     |
| MNR.FU:24  |     |   DEC   | 13  3  | User field 24  |     |     |
| MNR.FU:25  |     |   DEC   | 13  3  | User field 25  |     |     |
| MNR.FU:26  |     |   DEC   | 13  3  | User field 26  |     |     |
| MNR.FU:27  |     |   DEC   | 13  3  | User field 27  |     |     |
| MNR.FU:28  |     |   DEC   | 13  3  | User field 28  |     |     |
| MNR.FU:29  |     |   CHAR  | 1      | User field 29  |     |     |
| MNR.FU:30  |     |   CHAR  | 1      | User field 30  |     |     |
| MNR.FU:31  |     |   CHAR  | 1      | User field 31  |     |     |
| MNR.FU:32  |     |   CHAR  | 1      | User field 32  |     |     |
| MNR.FU:33  |     |   CHAR  | 1      | User field 33  |     |     |
| MNR.FU:34  |     |   CHAR  | 1      | User field 34  |     |     |
| MNR.FU:35  |     |   CHAR  | 1      | User field 35  |     |     |
| MNR.FU:36  |     |   CHAR  | 1      | User field 36  |     |     |
| MNR.FU:37  |     |   CHAR  | 1      | User field 37  |     |     |
| MNR.FU:38  |     |   CHAR  | 1      | User field 38  |     |     |
| MNR.FU:39  |     |   CHAR  | 1      | User field 39  |     |     |
| MNR.FU:40  |     |   CHAR  | 1      | User field 40  |     |     |
| MNR.FU:41  |     |   CHAR  | 1      | User field 41  |     |     |
| MNR.FU:42  |     |   CHAR  | 1      | User field 42  |     |     |
| MNR.FU:43  |     |   CHAR  | 1      | User field 43  |     |     |
| MNR.FU:44  |     |   CHAR  | 1      | User field 44  |     |     |
| MNR.FU:45  |     |   CHAR  | 10     | User field 45  |     |     |
| MNR.FU:46  |     |   CHAR  | 10     | User field 46  |     |     |
| MNR.FU:47  |     |   CHAR  | 10     | User field 47  |     |     |
| MNR.FU:48  |     |   CHAR  | 10     | User field 48  |     |     |
| MNR.FU:49  |     |   CHAR  | 10     | User field 49  |     |     |
| MNR.FU:50  |     |   CHAR  | 10     | User field 50  |     |     |
| MNR.FU:51  |     |   CHAR  | 20     | User field 51  |     |     |
| MNR.FU:52  |     |   CHAR  | 20     | User field 52  |     |     |
| MNR.FU:53  |     |   CHAR  | 20     | User field 53  |     |     |
| MNR.FU:54  |     |   CHAR  | 20     | User field 54  |     |     |
| MNR.FU:55  |     |   CHAR  | 20     | User field 55  |     |     |
| MNR.FU:56  |     |   CHAR  | 20     | User field 56  |     |     |
| MNR.FU:57  |     |   CHAR  | 20     | User field 57  |     |     |
| MNR.FU:58  |     |   CHAR  | 20     | User field 58  |     |     |
| MNR.FU:59  |     |   CHAR  | 20     | User field 59  |     |     |
| MNR.FU:60  |     |   CHAR  | 20     | User field 60  |     |     |
| MNR.FU:61  |     |   CHAR  | 20     | User field 61  |     |     |
| MNR.FU:62  |     |   CHAR  | 20     | User field 62  |     |     |
| MNR.FU:63  |     |   CHAR  | 20     | User field 63  |     |     |
| MNR.FU:64  |     |   CHAR  | 20     | User field 64  |     |     |

| MBL_BAPI_Workplace.docx  |     |     | Version: 1.2.18742  |     |     | Page 5 of 6  |
| ------------------------ | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     | Machines / Workplaces  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

| Field      |     | V  T    | L  D  | Description    |     |     |
| ---------- | --- | ------- | ----- | -------------- | --- | --- |
| MNR.FU:65  |     |   CHAR  | 40    | User field 65  |     |     |
| MNR.FU:66  |     |   CHAR  | 40    | User field 66  |     |     |

The resource BAPI (RES.UPDATE) must be used to edit general information of the machine
configuration, e.g. inventory no. engraving no., drawing no., manufacturer, owner, acquisition

costs, supplier information and responsibilities.

| MBL_BAPI_Workplace.docx  |     |     | Version: 1.2.18742  |     |     | Page 6 of 6  |
| ------------------------ | --- | --- | ------------------- | --- | --- | ------------ |
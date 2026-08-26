Activity Codes
1 Activity Codes
Summary
Menu Master data  Order  Activity codes
Transaction code actc
Function authorization mdactc
Usage
You use this application if you would like to configure activity codes.
Integration
The system manages different activities based on operations. In addition to special activities like "times"
and "quantities", other activities can also be entered.
The activity code describes the meaning as well as the processing of the separate activities. It is defined
at the operation.
Selection criteria
The application provides the following selection criteria:
Activity code
Designation of the activity code
Activity
Activity
Field descriptions
Activity code
A unique key that combines the configurations for several activities.
Activity
BMK01 ... BMK12 Time-based activities: resource performance accounts,
workplace-related
DAUER Time-based activities:
sum of the resource performance accounts, workplace-
related
MOC_ActivityCodes.docx Version: 1.3.12191 Page 1 of 6

|     |     |     |     |     | Activity Codes  |
| --- | --- | --- | --- | --- | --------------- |

PBMK01 ... PBMK12
|     |     | Time-based  | activities:  | resource  performance  | accounts,  |
| --- | --- | ----------- | ------------ | ---------------------- | ---------- |
personnel-related
| PDAUER  |     | Time-based activities:   |     |     |     |
| ------- | --- | ------------------------ | --- | --- | --- |
sum of the resource performance accounts, personnel-related
| LST01 ... LST10  |     | Miscellaneous activities  |     |     |     |
| ---------------- | --- | ------------------------- | --- | --- | --- |
Designation
Activity name.
Field type
Reference to a field type.
Formula for target activity
Formula for calculating the target activity (reserved, currently not processed)
Input type
ZE  Input based on time events (only for RPA time-based activities)
| DR  | Discrete input, relative                                   |     |     |     |     |
| --- | ---------------------------------------------------------- | --- | --- | --- | --- |
| DA  | Discrete input, absolute                                   |     |     |     |     |
| XU  | Calculated using formula for actual activity, per posting  |     |     |     |     |
XE  Calculated using formula for actual activity, when OP is logged off
Keep in mind that for input type <> ZE, BMK and PBMK time-based activities are no longer
compared to the shift calendar, but instead are variables that are directly entered or calculated
based on formulas.
Formula for actual activity
Actual activities can be calculated by using the defined formulas. Formulas are defined in formula
management.
The below-mentioned acronyms can be used in the formulas:
| Identifiers         | Designation/meaning                              |     |     |     |     |
| ------------------- | ------------------------------------------------ | --- | --- | --- | --- |
| ANR.FU:1-ANR.FU:66  | The OP's user fields                             |     |     |     |     |
| ANR.SGR:GUTB        | Target quantity of the OP in base quantity unit  |     |     |     |     |
ANR.SGR:GUTP  The OP's target quantity in primary quantity unit
ANR.SGR:GUT  The OP's target quantity in primary quantity unit (old format)
ANR.SGR:GUTS  The OP's target quantity in secondary quantity unit
ANR.SGR:GUTT  The OP's target quantity in tertiary quantity unit
| ANR.SGR:AUSB  | The OP's scrap in base quantity unit     |     |     |     |     |
| ------------- | ---------------------------------------- | --- | --- | --- | --- |
| ANR.SGR:AUSP  | The OP's scrap in primary quantity unit  |     |     |     |     |
ANR.SGR:AUS  The OP's scrap in primary quantity unit (old format)
| ANR.SGR:AUSS   | The OP's scrap in secondary quantity unit  |     |     |     |     |
| -------------- | ------------------------------------------ | --- | --- | --- | --- |
| ANR.SGR:AUST   | The OP's scrap in tertiary quantity unit   |     |     |     |     |
| ANR.EINHMENGE  | Unit quantity                              |     |     |     |     |

| MOC_ActivityCodes.docx  |     | Version: 1.3.12191  |     |     | Page 2 of 6  |
| ----------------------- | --- | ------------------- | --- | --- | ------------ |

|     |     |     | Activity Codes  |
| --- | --- | --- | --------------- |

| Identifiers      | Designation/meaning                  |     |     |
| ---------------- | ------------------------------------ | --- | --- |
| ANR.SZY          | The OP's target cycle                |     |     |
| ANR.TLG          | The OP's partitioning                |     |     |
| ANR.IMPFAKT      | The OP's pulse factor                |     |     |
| ANR.VGW01        | Default value 01 of OP               |     |     |
| ANR.VGW02        | Default value 02 of OP               |     |     |
| ANR.VGW03        | Default value 03 of OP               |     |     |
| ANR.VGW04        | Default value 04 of OP               |     |     |
| ANR.VGW05        | Default value 05 of OP               |     |     |
| ANR.VGW06        | Default value 06 of OP               |     |     |
| ANR.VGW07        | Default value 07 of OP               |     |     |
| ANR.VGW08        | Default value 08 of OP               |     |     |
| ANR.VGW09        | Default value 09 of OP               |     |     |
| ANR.VGW010       | Default value 10 of OP               |     |     |
| ANR.RUEZ         | The OP's setup time                  |     |     |
| ANR.RUEZ:ZUSCHL  | The OP's additional setup time       |     |     |
| ANR.BEARBZ       | The OP's processing time             |     |     |
| ANR.ABRZ         | The OP's dismantling/retooling time  |     |     |
| ANR.LIEZ:MAX     | The OP's maximum wait time           |     |     |
| ANR.LIEZ         | The OP's wait time                   |     |     |
| ANR.LIZ          | The OP's delivery time               |     |     |
| ANR.BMK01        | Target value for RPA 01              |     |     |
| ANR.BMK02        | Target value for RPA 02              |     |     |
| ANR.BMK03        | Target value for RPA 03              |     |     |
| ANR.BMK04        | Target value for RPA 04              |     |     |
| ANR.BMK05        | Target value for RPA 05              |     |     |
| ANR.BMK06        | Target value for RPA 06              |     |     |
| ANR.BMK07        | Target value for RPA 07              |     |     |
| ANR.BMK08        | Target value for RPA 08              |     |     |
| ANR.BMK09        | Target value for RPA 09              |     |     |
| ANR.BMK10        | Target value for RPA 10              |     |     |
| ANR.BMK11        | Target value for RPA 11              |     |     |
| ANR.BMK12        | Target value for RPA 12              |     |     |
| ANR.ANZSPLIT     | Maximum number of splits             |     |     |
| ANR.VLZ          | The OP's lead time                   |     |     |
| ANR.WEIGMENGE    | The OP's send-ahead quantity         |     |     |
| ANR.LST01        | Target activity 01 of OP             |     |     |
| ANR.LST02        | Target activity 02 of OP             |     |     |
| ANR.LST03        | Target activity 03 of OP             |     |     |
| ANR.LST04        | Target activity 04 of OP             |     |     |
| ANR.LST05        | Target activity 05 of OP             |     |     |
| ANR.LST06        | Target activity 06 of OP             |     |     |
| ANR.LST07        | Target activity 07 of OP             |     |     |
| ANR.LST08        | Target activity 08 of OP             |     |     |
| ANR.LST09        | Target activity 09 of OP             |     |     |
| ANR.LST10        | Target activity 10 of OP             |     |     |
ANR.EGR:GUTB  Yield that has been recorded so far in base quantity unit
ANR.EGR:GUTP  Yield that has been recorded so far in primary quantity unit
ANR.EGR:GUT  Yield  that  has  been  recorded  so  far  in  primary  quantity  unit  (old
format)
ANR.EGR:GUTS  Yield that has been recorded so far in secondary quantity unit
ANR.EGR:GUTT  Yield that has been recorded so far in tertiary quantity unit

| MOC_ActivityCodes.docx  |     | Version: 1.3.12191  | Page 3 of 6  |
| ----------------------- | --- | ------------------- | ------------ |

|     |     |     | Activity Codes  |
| --- | --- | --- | --------------- |

| Identifiers  | Designation/meaning  |     |     |
| ------------ | -------------------- | --- | --- |
ANR.EGR:AUSB  Scrap that has been recorded so far in base quantity unit
ANR.EGR:AUSP  Scrap that has been recorded so far in primary quantity unit
ANR.EGR:AUS  Scrap that has been recorded so far in primary quantity unit (old
format)
ANR.EGR:AUSS  Scrap that has been recorded so far in secondary quantity unit
ANR.EGR:AUST  Scrap that has been recorded so far in tertiary quantity unit
ANR.EGR:NCHB  Rework quantity that has been recorded so far in base quantity unit
ANR.EGR:NCHP  Rework quantity that has been recorded so far in primary quantity unit
ANR.EGR:NCH  Rework quantity that has been recorded so far in primary quantity unit
(old format)
ANR.EGR:NCHS  Rework quantity that has been recorded so far in secondary quantity
unit
ANR.EGR:NCHT  Rework quantity that has been recorded so far in tertiary quantity unit
ANR.EGR:PRBB  Problem quantity that has been recorded so far in base quantity unit
ANR.EGR:PRBP  Problem quantity that has been recorded so far in primary quantity unit
ANR.EGR:PRB  Problem quantity that has been recorded so far in primary quantity unit
(old format)
ANR.EGR:PRBS  Problem quantity that has been recorded so far in secondary quantity
unit
ANR.EGR:PRBT  Problem quantity that has been recorded so far in tertiary quantity unit
| ANR.EGR:BMK01  | Duration recorded for RPA 01           |     |     |
| -------------- | -------------------------------------- | --- | --- |
| ANR.EGR:BMK02  | Duration recorded for RPA 02           |     |     |
| ANR.EGR:BMK03  | Duration recorded for RPA 03           |     |     |
| ANR.EGR:BMK04  | Duration recorded for RPA 04           |     |     |
| ANR.EGR:BMK05  | Duration recorded for RPA 05           |     |     |
| ANR.EGR:BMK06  | Duration recorded for RPA 06           |     |     |
| ANR.EGR:BMK07  | Duration recorded for RPA 07           |     |     |
| ANR.EGR:BMK08  | Duration recorded for RPA 08           |     |     |
| ANR.EGR:BMK09  | Duration recorded for RPA 09           |     |     |
| ANR.EGR:BMK10  | Duration recorded for RPA 10           |     |     |
| ANR.EGR:BMK11  | Duration recorded for RPA 11           |     |     |
| ANR.EGR:BMK12  | Duration recorded for RPA 12           |     |     |
| ANR.EGR:HUB    | Total cycles/strokes recorded          |     |     |
| ANR.RGR:BMK01  | Current remaining activity for RPA 01  |     |     |
| ANR.RGR:BMK02  | Current remaining activity for RPA 02  |     |     |
| ANR.RGR:BMK03  | Current remaining activity for RPA 03  |     |     |
| ANR.RGR:BMK04  | Current remaining activity for RPA 04  |     |     |
| ANR.RGR:BMK05  | Current remaining activity for RPA 05  |     |     |
| ANR.RGR:BMK06  | Current remaining activity for RPA 06  |     |     |
| ANR.RGR:BMK07  | Current remaining activity for RPA 07  |     |     |
| ANR.RGR:BMK08  | Current remaining activity for RPA 08  |     |     |
| ANR.RGR:BMK09  | Current remaining activity for RPA 09  |     |     |
| ANR.RGR:BMK10  | Current remaining activity for RPA 10  |     |     |
| ANR.RGR:BMK11  | Current remaining activity for RPA 11  |     |     |
| ANR.RGR:BMK12  | Current remaining activity for RPA 12  |     |     |
| ANR.RGR:LST01  | Current actual activity for RPA 01     |     |     |
| ANR.RGR:LST02  | Current actual activity for RPA 02     |     |     |
| ANR.RGR:LST03  | Current actual activity for RPA 03     |     |     |
| ANR.RGR:LST04  | Current actual activity for RPA 04     |     |     |
| ANR.RGR:LST05  | Current actual activity for RPA 05     |     |     |
| ANR.RGR:LST06  | Current actual activity for RPA 06     |     |     |
| ANR.RGR:LST07  | Current actual activity for RPA 07     |     |     |

| MOC_ActivityCodes.docx  |     | Version: 1.3.12191  | Page 4 of 6  |
| ----------------------- | --- | ------------------- | ------------ |

|     |     |     | Activity Codes  |
| --- | --- | --- | --------------- |

| Identifiers    | Designation/meaning                 |     |     |
| -------------- | ----------------------------------- | --- | --- |
| ANR.RGR:LST08  | Current actual activity for RPA 08  |     |     |
| ANR.RGR:LST09  | Current actual activity for RPA 09  |     |     |
| ANR.RGR:LST10  | Current actual activity for RPA 10  |     |     |
ANR.UMRFAKTP:N  Denominator of the OP's conversion factor in primary quantity unit
ANR.UMRFAKTP:Z  Numerator of the OP's conversion factor in primary quantity unit
ANR.UMRFAKTS:N  Denominator of the OP's conversion factor in secondary quantity unit
ANR.UMRFAKTS:Z  Numerator of the OP's conversion factor in secondary quantity unit
ANR.UMRFAKTT:N  Denominator of the OP's conversion factor in tertiary quantity unit
ANR.UMRFAKTT:Z  Numerator of the OP's conversion factor in tertiary quantity unit
| MNR.TLG          | Machine partitioning                     |     |     |
| ---------------- | ---------------------------------------- | --- | --- |
| ADEPRO.EGR:GUTB  | Recorded yield in base quantity unit     |     |     |
| ADEPRO.EGR:GUTP  | Recorded yield in primary quantity unit  |     |     |
ADEPRO.EGR:GUT  Recorded yield in primary quantity unit (old format)
| ADEPRO.EGR:GUTS  | Recorded yield in secondary quantity unit  |     |     |
| ---------------- | ------------------------------------------ | --- | --- |
| ADEPRO.EGR:GUTT  | Recorded yield in tertiary quantity unit   |     |     |
| ADEPRO.EGR:AUSB  | Recorded scrap in base quantity unit       |     |     |
| ADEPRO.EGR:AUSP  | Recorded scrap in primary quantity unit    |     |     |
ADEPRO.EGR:AUS  Recorded scrap in primary quantity unit (old format)
| ADEPRO.EGR:AUSS  | Recorded scrap in secondary quantity unit       |     |     |
| ---------------- | ----------------------------------------------- | --- | --- |
| ADEPRO.EGR:AUST  | Recorded scrap in tertiary quantity unit        |     |     |
| ADEPRO.EGR:NCHB  | Recorded rework quantity in base quantity unit  |     |     |
ADEPRO.EGR:NCHP  Recorded rework quantity in primary quantity unit
ADEPRO.EGR:NCH  Recorded rework quantity in primary quantity unit (old format)
ADEPRO.EGR:NCHS  Recorded rework quantity in secondary quantity unit
ADEPRO.EGR:NCHT  Recorded rework quantity in tertiary quantity unit
ADEPRO.EGR:PRBB  Recorded problem quantity in base quantity unit
ADEPRO.EGR:PRBP  Recorded problem quantity in primary quantity unit
ADEPRO.EGR:PRB  Recorded problem quantity in primary quantity unit (old format)
ADEPRO.EGR:PRBS  Recorded problem quantity in secondary quantity unit
ADEPRO.EGR:PRBT  Recorded problem quantity in tertiary quantity unit
| ADEPRO.EGR:BMK01  | Duration recorded for RPA 01  |     |     |
| ----------------- | ----------------------------- | --- | --- |
| ADEPRO.EGR:BMK02  | Duration recorded for RPA 02  |     |     |
| ADEPRO.EGR:BMK03  | Duration recorded for RPA 03  |     |     |
| ADEPRO.EGR:BMK04  | Duration recorded for RPA 04  |     |     |
| ADEPRO.EGR:BMK05  | Duration recorded for RPA 05  |     |     |
| ADEPRO.EGR:BMK06  | Duration recorded for RPA 06  |     |     |
| ADEPRO.EGR:BMK07  | Duration recorded for RPA 07  |     |     |
| ADEPRO.EGR:BMK08  | Duration recorded for RPA 08  |     |     |
| ADEPRO.EGR:BMK09  | Duration recorded for RPA 09  |     |     |
| ADEPRO.EGR:BMK10  | Duration recorded for RPA 10  |     |     |
| ADEPRO.EGR:BMK11  | Duration recorded for RPA 11  |     |     |
| ADEPRO.EGR:BMK12  | Duration recorded for RPA 12  |     |     |
| ADEPRO.EGR:HUB    | Recorded cycles/strokes       |     |     |
| ADEPRO.RGR:BMK01  | Residual recorded for RPA 01  |     |     |
| ADEPRO.RGR:BMK02  | Residual recorded for RPA 02  |     |     |
| ADEPRO.RGR:BMK03  | Residual recorded for RPA 03  |     |     |
| ADEPRO.RGR:BMK04  | Residual recorded for RPA 04  |     |     |
| ADEPRO.RGR:BMK05  | Residual recorded for RPA 05  |     |     |
| ADEPRO.RGR:BMK06  | Residual recorded for RPA 06  |     |     |
| ADEPRO.RGR:BMK07  | Residual recorded for RPA 07  |     |     |
| ADEPRO.RGR:BMK08  | Residual recorded for RPA 08  |     |     |

| MOC_ActivityCodes.docx  |     | Version: 1.3.12191  | Page 5 of 6  |
| ----------------------- | --- | ------------------- | ------------ |

|     |     |     | Activity Codes  |
| --- | --- | --- | --------------- |

| Identifiers       | Designation/meaning           |     |     |
| ----------------- | ----------------------------- | --- | --- |
| ADEPRO.RGR:BMK09  | Residual recorded for RPA 09  |     |     |
| ADEPRO.RGR:BMK10  | Residual recorded for RPA 10  |     |     |
| ADEPRO.RGR:BMK11  | Residual recorded for RPA 11  |     |     |
| ADEPRO.RGR:BMK12  | Residual recorded for RPA 12  |     |     |
| ADEPRO.RGR:LST01  | Recorded activity 01          |     |     |
| ADEPRO.RGR:LST02  | Recorded activity 02          |     |     |
| ADEPRO.RGR:LST03  | Recorded activity 03          |     |     |
| ADEPRO.RGR:LST04  | Recorded activity 04          |     |     |
| ADEPRO.RGR:LST05  | Recorded activity 05          |     |     |
| ADEPRO.RGR:LST06  | Recorded activity 06          |     |     |
| ADEPRO.RGR:LST07  | Recorded activity 07          |     |     |
| ADEPRO.RGR:LST08  | Recorded activity 08          |     |     |
| ADEPRO.RGR:LST09  | Recorded activity 09          |     |     |
| ADEPRO.RGR:LST10  | Recorded activity 10          |     |     |
Underdelivery
Permissible underdelivery (for this activity) in percent
Reaction in the event of underdelivery
| empty  | No test                                      |     |     |
| ------ | -------------------------------------------- | --- | --- |
| W      | Warning (reserved; currently not processed)  |     |     |
| X      | Error                                        |     |     |
Overdelivery
Permissible overdelivery (for this activity) in percent
Reaction in the event of overdelivery
| empty     | No test                                      |     |     |
| --------- | -------------------------------------------- | --- | --- |
| W         | Warning (reserved; currently not processed)  |     |     |
| X         | Error                                        |     |     |
Overriding  in  the  event  of  under/  overdelivery:  Currently,  no  reasons  are  planned  for  activities.

| MOC_ActivityCodes.docx  |     | Version: 1.3.12191  | Page 6 of 6  |
| ----------------------- | --- | ------------------- | ------------ |
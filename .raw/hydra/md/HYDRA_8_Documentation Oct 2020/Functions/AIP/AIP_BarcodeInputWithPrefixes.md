Barcode Input with Prefix
1 Barcode Input with Prefix
A barcode is interpreted as prefix barcode if the third character is a dot. In this case the first two
characters identify the barcode type. The actual barcode starts with the fourth character.
ID+ Example Comment
Prefix --> processing
-------- -------------------- ---- General ---
00. 00.ABC123 Data not defined,
 00. will be deleted and data “ABC123” will be passed to standard
processing
01. 01.OK Action barcode
01.ESC  Dialog cancelled or ended with OK button or Esc button.
-------- -------------------- ---- HYDRA-ADE + HYDRA-LLE + HYDRA-MDE ---
10. (combined) Order/sequence/OP number  acronym <ANR>
11. Order (header)  acronym <AUNR>
12. Sequence  acronym <AFOLG>
13. OP  acronym <AGNR>
14. Suborder number -> Acronym <UAGNR>
22. Split no.  acronym <SPLNR>
15. Upload/confirmation number  Acronym <RMNR>
16. 16.EXTRUDER-7 Machine  Acronym <MNR>
16.200  Passed to dialog with MNR=EXTRUDER-7 or MNR=200
17. 17.1 Machine status  Acronym <MST>
17.1001  Passed to dialog with MST=1 or MST=1001
18. 18.1 Scrap reason  Acronym <EGG:AUS>
18.1001  Passed to dialog with EGG:AUS =1 or EGG:AUS=1001
19. 19.1 Deviation reason  Acronym < EGG:GUT >
19.1001  Passed to dialog with EGG:GUT =1 or EGG:GUT=1001
20. 20.1 Operator position  Acronym <BPOS>
20.MF  Passed to dialog with BPOS =1 or BPOS = MF
21. Wage and premium indicators  Acronym <LPKZ>
-------- -------------------- ----HYDRA-WRM + HYDRA-DNC + HYDRA-PDV + HYDRA-MPL ---
40. 40.100 Destination  Acronym <ZLO>
40.MONTAGE  Passed to dialog with ZLO=100 or ZLO= MONTAGE
41. 41.KARTON Transport unit  Acronym <TPE>
41.KISTE  Passed to dialog with TPE = KARTON or TPE = KISTE
42. Batch number  Acronym <CNR>
43. Throughput batch number  Acronym <DLL>
44. Alternative batch number  Acronym <CNR:ALT1>
45. Alternative batch number  Acronym <CNR:ALT2>
46. Alternative batch number  Acronym <CNR:ALT3>
47. Alternative batch number  Acronym <CNR:ALT4>
48. Alternative batch number  Acronym <CNR:ALT5>
49. Alternative batch number  Acronym <CNR:ALT6>
AIP_BarcodeInputWithPrefixes.docx Page 1 of 6 19.06.20

|         |                    |     |     | Barcode Input with Prefix  |     |
| ------- | ------------------ | --- | --- | -------------------------- | --- |
| ID+     | Example  Comment   |     |     |                            |     |
| Prefix  | --> processing     |     |     |                            |     |
--------  --------------------  ---- Mainly for the HYDRA-PZE module ---
| 50.  |   Badge number  Acronym <KNR>       |     |     |     |     |
| ---- | ------------------------------------ | --- | --- | --- | --- |
| 51.  |   Personnel number  Acronym <PNR>   |     |     |     |     |
| 52.  | 52.EDV  Cost center  Acronym <KST>  |     |     |     |     |
52.VERTRIEB   Passed to dialog with KST=EDV or KST=VERTRIEB
| 53.       | 53.1  Absence reason  Acronym <FGR>                       |     |     |     |     |
| --------- | ---------------------------------------------------------- | --- | --- | --- | --- |
|           | 53.1001   Passed to dialog with FGR=1 or FGR=1001         |     |     |     |     |
|           |                                                            |     |     |     |     |
| --------  | --------------------  ---- Customer-specific barcodes ---  |     |     |     |     |
| 90.       |                                                            |     |     |     |     |
| …         |                                                            |     |     |     |     |

In  case  barcodes  are  required,  which  actually  have  a  dot  at  the  third  place  (e.g.  if  the
machine/workplace number has a dot as third character), it is possible to define an alternative
indicator for barcode prefixes in the HyTnrCfg.ini terminal configuration, e.g.
[Terminal->USR 0]
BarcodePrefixChar=$
If another prefix is actually required, the respective barcode font in use must be able to
represent this prefix.

Examples for barcodes
Barcode printing: Font “Codedreineun” and prefix “.“

| Prefix  |     | Barcode |     | Raw data            |     |
| ------- | --- | ------- | --- | ------------------- | --- |
| 10.     |     |         |     | ANR = 123456780100  |     |
*10.123456780100*

ANR=_ABCD12340100
*10._ABCD12340100*
| AIP_BarcodeInputWithPrefixes.docx  |     |     | Page 2 of 6  |     | 19.06.20  |
| ---------------------------------- | --- | --- | ------------ | --- | --------- |

|     |     |     |     | Barcode Input with Prefix  |     |
| --- | --- | --- | --- | -------------------------- | --- |

| Prefix  |     | Barcode |     | Raw data         |     |
| ------- | --- | ------- | --- | ---------------- | --- |
| 11.     |     |         |     | AUNR = 12345678  |     |
*11.12345678*
| 12.  |     |     |     | AFOLG = 01  |     |
| ---- | --- | --- | --- | ----------- | --- |
*12.01*
| 13.  |     |     |     | AGNR = 0100  |     |
| ---- | --- | --- | --- | ------------ | --- |
*13.0100*
| 14.  |     |     |     | UAGNR = 0000  |     |
| ---- | --- | --- | --- | ------------- | --- |
*14.0000*
| 15.  |     |     |     | RMNR = 123465789012345  |     |
| ---- | --- | --- | --- | ----------------------- | --- |
*15.123456789012345*
| 22.  |     |     |     | SPLNR = 02  |     |
| ---- | --- | --- | --- | ----------- | --- |
*22.02*
| AIP_BarcodeInputWithPrefixes.docx  |     |     | Page 3 of 6  |     | 19.06.20  |
| ---------------------------------- | --- | --- | ------------ | --- | --------- |

|     |     |     |     | Barcode Input with Prefix  |     |
| --- | --- | --- | --- | -------------------------- | --- |

| Prefix  |     | Barcode |     | Raw data      |     |
| ------- | --- | ------- | --- | ------------- | --- |
| 16.     |     |         |     | MNR = 123456  |     |
*16.123456*
| 17.  |     |     |     | MST = 1122  |     |
| ---- | --- | --- | --- | ----------- | --- |
*17.1122*
| 18.  |     |     |     | EGG:AUS = 1234  |     |
| ---- | --- | --- | --- | --------------- | --- |
*18.1234*
| 19.  |     |     |     | EGG:GUT = 132456789  |     |
| ---- | --- | --- | --- | -------------------- | --- |
*19.123456789*
| 20.  |     |     |     | BPOS = 13  |     |
| ---- | --- | --- | --- | ---------- | --- |
*20.13*
| 21.  |     |     |     | LPKZ = 1221  |     |
| ---- | --- | --- | --- | ------------ | --- |
*21.1221*
| AIP_BarcodeInputWithPrefixes.docx  |     |     | Page 4 of 6  |     | 19.06.20  |
| ---------------------------------- | --- | --- | ------------ | --- | --------- |

Barcode Input with Prefix
Prefix Barcode Raw data
50. KNR = 1337
*50.1337*
1.1 Configuration of customized barcode prefixes
Section [barcode]
BarKenn90=SAPCNR The barcode prefixes 90...99 can be assigned here according
BarKenn91=EGR:GUT to the customer's requirements. This means, if a barcode with
the relevant prefix is used, it will be transferred to the dialog
along with the assigned ID. Then the barcode has the following
structure:
.
<Prefix> <Net barcode>
e.g.: "90.12345“  SAPCNR=12345
Firmly assigned barcode prefixes:
10:ANR
11:AUNR
12:AFOLG
13:AGNR
14:UAGNR
15:RMNR
16:MNR
17:MST
18:AUSGRD
19:AGGGRD
20:BPOS
21:LPKZ
22:SPLNR
40:ZLO
41:TPE
42:CNR
43:DLL
44:CNR:ALT1
45:CNR:ALT2
46:CNR:ALT3
47:CNR:ALT4
48:CNR:ALT5
49:CNR:ALT6
50:KNR
51:PNR
52:KST
53:FGR
AIP_BarcodeInputWithPrefixes.docx Page 5 of 6 19.06.20

|     |     | Barcode Input with Prefix  |
| --- | --- | -------------------------- |

AIP_BarcodeInputWithPrefixes.docx  Version: 1.2.2886  Page 6 of 6
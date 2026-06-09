|     |     |     |     | Barcode Input  |
| --- | --- | --- | --- | -------------- |

1  Barcode Input
A barcode is machine-readable information, which may also directly be generated within the shop floor
system. The principal reading devices used are: barcode scanners, swipe card readers or scanners. By
default, the terminal supports the barcodes "39", "128" as well as ”interleaved 2 of 5 "
Only barcode readers connected to the serial interface (COM interface) can identify barcodes
and assign them automatically to the respective input fields at the terminal. This is impossible

for barcode readers “connected” via keyboard.
Barcode structure for operations
*AAAAAAAAAAAAGGGGG*
| Place  | Name  | Min.  Max.  | Example  |     |
| ------ | ----- | ----------- | -------- | --- |
length  length *
| *                                                       | Asterisk          | 1  1    |   *  |     |
| ------------------------------------------------------- | ----------------- | ------- | ---- | --- |
|                                                         |                   |         |      |     |
| A                                                       | Order number      | 1  12   |   8  |     |
| F                                                       | Sequence number   | 0    2  |   0  |     |
| G                                                       | Operation number  | 1    4  |   3  |     |
| S                                                       | Split number      | 0    2  |   0  |     |
| *                                                       | Asterisk          | 1  1    |   *  |     |
| Length of BDE order barcode without asterisk (example)  |                   |         | 11   |     |
* Depends on the configuration of field lengths in HYDRA's basic parameter settings
Barcode structure for machines/workplaces
*MMMMMMMM*
| Place  | Name  | Min.  Max.  | Example  |     |
| ------ | ----- | ----------- | -------- | --- |
length  length
| *   | Asterisk                   | 1  1  | *   |     |
| --- | -------------------------- | ----- | --- | --- |
| M   | Workplace/ machine number  | 8  8  | 8   |     |
| *   | Asterisk                   | 1  1  | *   |     |

| AIP_BarcodeInput.docx  |     | Version: 1.2.5669  |     | Page 1 of 7  |
| ---------------------- | --- | ------------------ | --- | ------------ |

|     |     |     |     |     | Barcode Input  |
| --- | --- | --- | --- | --- | -------------- |

| Place                                                   | Name  | Min.    | Max.    | Example  |     |
| ------------------------------------------------------- | ----- | ------- | ------- | -------- | --- |
|                                                         |       | length  | length  |          |     |
| Length of machine/workplace barcodes without asterisks  |       |         |         | 8        |     |

To identify a barcode as a machine/workplace number, the barcode must be 8 characters long.
If the machine/workplace number is set to “numerical” in the basic parameter settings, it has to

be  filled  up  with  leading  zeroes  to  reach  8  characters.  In  case  of  alphanumeric
machine/workplace numbers, they have to be filled up with underscore characters ("_") to the
right.
Barcode structure for machine statuses
*NNNNN0*
| Place                                        |                                      | Name  |     | Length  |     |
| -------------------------------------------- | ------------------------------------ | ----- | --- | ------- | --- |
| *                                            | Asterisk                             |       |     | 1       |     |
| N                                            | Machine status, with leading zeroes  |       |     | 5       |     |
| 0                                            | Always "0"                           |       |     | 1       |     |
| *                                            | Asterisk                             |       |     | 1       |     |
| Length of status barcodes without asterisks  |                                      |       |     | 6       |     |

| AIP_BarcodeInput.docx  |     | Version: 1.2.5669  |     |     | Page 2 of 7  |
| ---------------------- | --- | ------------------ | --- | --- | ------------ |

|     |     |     |     |     |     |     |     |     | Barcode Input  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------- |

2  AIP configuration of barcodes
| 2.1  | Configuration in ctaip.ini  |     |     |     |     |     |     |     |     |
| ---- | --------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
Readers are configured in section [comports] of the file ctaip.ini:
| Section [comports]  |     |     |     |     |     |     |     |     |     |
| ------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
COM1=0
Possible initializations of comports                                      COMx=0
| COM2=0              |     | => is not used (by default)                      |     |     |     |     |     |     |     |
| ------------------- | --- | ------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- |
| COM3=0              |     | COMx=BAR                                         |     |     |     |     |     |     |     |
COM4=0              COMx=PSTD             PLEASE NOTE! Only starting from reader
COM5=0
firmware 69355E
COM6=0  COMx=LEGIC
COMx=PLG

COMx=RFLESER                                                               COMx=MSS
|     |     | COMx=SLGB             |     | Entry                                           | for  | readers  of                          | the  type  | "Schlagbaum"  |          |
| --- | --- | --------------------- | --- | ----------------------------------------------- | ---- | ------------------------------------ | ---------- | ------------- | -------- |
|     |     | COMx=UKEY             |     | U-Key                                           |      |                                      |            |               | readers  |
|     |     |                       |     | Byte 12 and 13 set up the badge/ID card number  |      |                                      |            |               |          |
|     |     | Byte                  | 14  | and  15                                         | set  | up  the                              | company    |               | number   |
|     |     |                       |     | e.g.:                                           |      | 01010D01|0E020000|04000003|E7175600  |            |               |          |
|     |     |                       |     | 03E7                                            |     | badge                                | number     |               |   999   |
|     |     |                       |     | 1756  company number  5974                    |      |                                      |            |               |          |

|     |     | COMx=KABALEG  |     | Kaba Benzing Legic                     |     |     |     |     |     |
| --- | --- | ------------- | --- | -------------------------------------- | --- | --- | --- | --- | --- |
|     |     |               |     | With Bedanet 9580 always COM4          |     |     |     |     |     |
|     |     |               |     | 7 bytes are transferred as of byte 15  |     |     |     |     |     |
|     |     |               |     | XXXXFFFFKKKKKK                         |     |     |     |     |     |
|     |     |               |     | F:= company number                     |     |     |     |     |     |
|     |     |               |     | K=badge number                         |     |     |     |     |     |

|     |     | COMx=MBB-S6  |     | MBB-S6 reader                                   |     |                         |        |       |               |
| --- | --- | ------------ | --- | ----------------------------------------------- | --- | ----------------------- | ------ | ----- | ------------- |
|     |     |              |     | Attention!                                      |     | Please                  | note!  | This  | reader  type  |
|     |     |              |     | requires                                        |     | the  RS-485  converter  |        | to    | be  modified  |
|     |     |              |     | (ECHO=OFF RTS=High)                             |     |                         |        |       |               |
|     |     |              |     | Comports masking has to be set for CLEA + DEUT  |     |                         |        |       |               |
|     |     |              |     | MBB-S6-MASK=XXXXXXXXXXKKKKKK                    |     |                         |        |       |               |

|     |     | COMx=DRV_UCR  |     | New LEGIC Advant PZE/MF reader.                   |        |                 |               |      |                 |
| --- | --- | ------------- | --- | ------------------------------------------------- | ------ | --------------- | ------------- | ---- | --------------- |
|     |     |               |     | required for new PZE readers. The names of these  |        |                 |               |      |                 |
|     |     |               |     | readers include "LGA".                            |        |                 |               |      |                 |
|     |     |               |     | Please                                            | note:  | If  badges/ID   | cards         | are  | used  not       |
|     |     |               |     | complying                                         |        | with  MPDV's    | standard      | ID,  | the  following  |
|     |     |               |     | parameter                                         |        | must  be  used  | for  masking  |      | in  section     |
|     |     |               |     | [Comports-Mask]:                                  |        |                 |               |      |                 |
|     |     |               |     | DRV_UCR-MASK=....                                 |        |                 |               |      |                 |

|     |     | COMx=PLG-CRYPT  |     | New LEGIC Advant ZKS reader                                |     |     |     |     |     |
| --- | --- | --------------- | --- | ---------------------------------------------------------- | --- | --- | --- | --- | --- |
|     |     |                 |     | required for new ZKS readers. The names of these           |     |     |     |     |     |
|     |     |                 |     | readers include "LGA".                                     |     |     |     |     |     |
|     |     |                 |     | It might be necessary to customize the file plg_crypt.ini  |     |     |     |     |     |
|     |     |                 |     | for specific customers                                     |     |     |     |     |     |

Set this parameter if Kabalegic and badges/ID cards with MPDV
|     |     | ID are used    |     |     |     |     |     |     |     |
| --- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- |
|     |     |   KABALEGM=ON  |     |     |     |     |     |     |     |
By default, the Kaba Benzing badge ID is used. In this case the

| AIP_BarcodeInput.docx  |     |     | Version: 1.2.5669  |     |     |     |     |     | Page 3 of 7  |
| ---------------------- | --- | --- | ------------------ | --- | --- | --- | --- | --- | ------------ |

Barcode Input
parameter is to be commented out
As of ctaip #V 2.0.2.27
Read out Kabalegic using configurable search string (e.g. 4F)
KABALEG-SEARCHSTRING=XX
Correct configuration takes priority (2 places, values 0..9,A..F)
Section [Comports-Mask] Example
LESERTYP+'-MASK' =Masking applicable abbreviations for masking
'T' = Telegram number
'L' = Reader number
'F' = Company number
'K' = Badge/ID card number
'E' = Replacement number
'P' = Check digit (not implemented)
otherwise e.g. 'X' = Placeholder (character to be ignored)
Examples:
SLGB-MASK=TTTTLLFFFFFFKKKK Masking for readers of the type "Schlagbaum":
TTTTLLFFFFFKKKK = Data string of the reader
The badge number may be recorded at every position of the data string
Please note!! Impossible for PLG // Status 15 October 2003 DB
BAR-MASK=
MBB-S6-MASK=XXXXXXXXXXKKKKKK
The below section has been designed for the configuration of (PLG) Polling Legic Readers or (PSTD)
Polling Swipe Card Readers. These readers are mostly used for PZE/ZKS terminals (CT-380) or ZKS
terminals (CT-385).
Section [init]
AIP_BarcodeInput.docx Version: 1.2.5669 Page 4 of 7

|     |     |     |     |     | Barcode Input  |
| --- | --- | --- | --- | --- | -------------- |

|               |     |                                  |     |     |     |
| ------------- | --- | -------------------------------- | --- | --- | --- |
| PlgTimeOut=2  |     |  TimeOut when starting polling  |     |     |     |
|               |     |                                  |     |     |     |
FreischaltungZyklus=3   Cycle for activating/releasing access
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
MaxComError=15   Maximum number of communication errors until access is in
"malfunction"

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
 Cycle for sending the status "invalid“ (invalid badge) in order
UngueltigZyklus=300
|     |     | to re-initialize the reader  |     |     |     |
| --- | --- | ---------------------------- | --- | --- | --- |

InitComError=50
   Number of communication errors in order to re-initialize
|     |     | Comport  |     |     |     |
| --- | --- | -------- | --- | --- | --- |

| MSSImmediateWrite=false  |     |     |     |     |     |
| ------------------------ | --- | --- | --- | --- | --- |
 ZKS immediately activates channels for MSS connection

        ( true = not efficient)

Leser-4-Hupe-Aktiv=true
|     |     |   Enables  | an  acoustic  | signal  (buzzer/horn)  | for  the  status  |
| --- | --- | ----------- | ------------- | ---------------------- | ----------------- |

"valid" (valid badge)
LnrErrorPCnt=100

|     |     |  Polling is only performed  |     | with every n-th attempt if the  |     |
| --- | --- | ---------------------------- | --- | ------------------------------- | --- |

reader  is
PinCodeLen=4
     in the status "malfunction=e". (priority polling)

ComResetTimer=5
 Length of PIN code input

 Minimum cycle for comport re-initialization
ReInitComport=true  Activation of automatic comport re-initialization
 by default = false ( = without automatic re-initialization )
The below section has been designed to configure MBB readers triggered via a thread in a DLL. These
readers are only used for ZKS terminals (CT-385).
| Section   |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- |
[MBB-S6-configuration]
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
MinMSecDauerOeffner=200   MinMSecDauerOeffner = Minimum duration "door opener"
|     |     |       in MSec -> by default [ 200 ]  |     |     |     |
| --- | --- | ------------------------------------ | --- | --- | --- |
|     |     |                                      |     |     |     |
;****************************  ;*** MBB-S6 - system settings (do not change) *******
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
ProcessMessages=true   ProcessMessages = Processing of Windows messages
while

       waiting for the application result -> by default [ true ]
| ThreadSleep=20  |     |                                                          |     |     |     |
| --------------- | --- | -------------------------------------------------------- | --- | --- | --- |
|                 |     |  ThreadSleep = Sleep in MSec of MBB-DLL while waiting   |     |     |     |
      for application result -> by default [ 20 ]
      range of values [10 .. X] -> changes might
       lead to increased CPU loads or bad response times

| 2.2  | Configurations in hytnrcfg.ini  |     |     |          |     |
| ---- | ------------------------------- | --- | --- | -------- | --- |
|      | Entry                           |     |     | Comment  |     |

| AIP_BarcodeInput.docx  |     | Version: 1.2.5669  |     |     | Page 5 of 7  |
| ---------------------- | --- | ------------------ | --- | --- | ------------ |

Barcode Input
Section [Terminal->USR 0]
SuppressBarcodeError=On Suppresses messages such as 'Barcode ... is wrong', etc.
Required if the barcode is processed in the script and
normal identification processes cannot identify the
barcode
OnBarcode=P_AN If the AIP basic screen is opened and a barcode is read
in, the dialog P_AN opens instead of the dialog M_MST.
The scanned badge/ID card number is transferred.
BarcodePrefixChar=$ Configuration of an alternative separator for barcode
prefixes.
Can be used if a dot not used as prefix identifier is
included at the third place of a real barcode.
ON-KNR-CODE=<Dialog> As of V# 2.0.2.57
Configures the dialog that opens from the main dialog
(By default "M_INFO.PERS“ )
when scanning the staff badge/ID card number using
readers such as Legic, Kabaleg, UKey, .
2.2.1 Notes/configurations for concurrent lengths
Entry Comment
Section [terminal configuration 0] ( general configuration )
and/or [terminal configuration 2XXX]; ( 2XXX terminal-specific configuration )
ANR-COMPLETE-BARCODE-ONLY=TRUE Option to avoid processing of incomplete order
barcodes. (e.g. AUNR,AUNR+AFOLG,…)
-> The option is set to <FALSE> by default
RIVAL-BARCODE-LEN-INFO-MSG=FALSE Option disabling messages indicating that barcodes
cannot be processed due to concurrent lengths.
-> The option is set to <TRUE> by default
Please note for configuration: the section may only be inserted provided it does not yet exist.
Sample configuration (for all terminals)
[Tnr configuration 0]
ANR-COMPLETE-BARCODE-ONLY=TRUE
BARCODE-LEN-INFO-MSG=TRUE
The above configuration prevents incomplete order barcodes from being processed at all terminals
(configuration for one terminal with [TNR configuration 2xxx] xxx=terminal number including leading
zeroes "0"). If this option is set, only complete order barcodes will be processed. Consequently, valid
lengths for order barcodes result from added partial order lengths ( Please note: //- ANR (order
number) parts with (*) may have the length '0' )
 AUNR + AFOLG(*) + AGNR + UAGNR(*)
 AUNR + AFOLG(*) + AGNR + UAGNR(*) + SPLNR(*)
The following message is shown if a barcode cannot be processed due to concurrent lengths:
AIP_BarcodeInput.docx Version: 1.2.5669 Page 6 of 7

Barcode Input
Note [concurrent length]
A barcode (<VAL>)<n>whose field assignment (<IDS>)<n>cannot clearly be defined, has been
scanned.<n><n>Processing is only possible<n>if one of the fields indicated is focused.
AIP_BarcodeInput.docx Version: 1.2.5669 Page 7 of 7
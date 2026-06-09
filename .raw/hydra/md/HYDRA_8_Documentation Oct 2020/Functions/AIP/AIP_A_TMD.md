Printing Partial Quantities
1 Printing Partial Quantities
Usage
The feature of printing partial quantities allows for a label or accompanying note to be printed with current
data such as order number, article number, workplace/machine and the produced subset. A text
accompanied by a bar code can be printed out at AIP 8.1 and AIP 8.2 terminals, while orders are
processed at a machine.
Requirements
The function is enabled by checking the option "label printing" in the terminal label.
The function has to be configured accordingly depending on whether AIP 8.1 or AIP 8.2 is in use. The
configuration of the AIP 8.1 is identical to configuring the list view for the AIP 8.2.
AIP 8.1 configuration:
To be able to use this function, the corresponding ID/function call has to be configured in the
ctaipbut.ini button configuration.
AIP 8.2 configuration:
The corresponding ID/function call has to be configured in the corresponding layout to be able to
use this function.
Additionally, an operation has to be logged on in order for a ticket to be printed.
Terminal functions
The function for printing partial quantities is triggered manually using a separate key.
The button triggering the function can be found on the 2nd page in the order section. The position can be
changed by customizing the configuration file for buttons.
Label printing is triggered for the currently selected OP.
AIP_A_TMD.docx Version: 1.2.5757 Page 1 of 4

|     |     |     | Printing Partial Quantities  |     |
| --- | --- | --- | ---------------------------- | --- |

The following data is printed :
  Date/time of printing
|   MES order number (combined order/OP number) as barcode  |     |     |     |     |
| --------------------------------------------------------- | --- | --- | --- | --- |
  MES order number as plain text
  Operation name

  Article number
|   Target quantity (primary quantity unit)  |     |     |     |     |
| ------------------------------------------ | --- | --- | --- | --- |
|   Unit                                     |     |     |     |     |
  Yield (primary quantity unit) since last printing
  or the first printing since the OP is logged on
  Current machine/workplace
Printing is performed in the A5 format using the default printer defined for the terminal. MPDV may adjust
the label layout while customizing the system.
The function of printing partial quantities is only enabled if the terminal is online.

  No label is printed, provided that no quantity has been entered since the last printing.
|     | If no OP is logged on, no label will be printed.  |     |     |     |
| --- | ------------------------------------------------- | --- | --- | --- |
|     | A reprint function is not planned.                |     |     |     |
AIP 8.1 configuration:
  If button configuration is customized, e.g. using "ctaipbut.ini", the function can be configured for
the required button by manually adding "A_TDM".

Example:

[ANR-ALL-Page2]
| …                                                         |     |     |     |     |
| --------------------------------------------------------- | --- | --- | --- | --- |
| 3=%PARAM1[9]=J%A_TDM,L,Teilmengendruck,Text Document.png  |     |     |     |     |

| AIP_A_TMD.docx  |     | Version: 1.2.5757  |     | Page 2 of 4  |
| --------------- | --- | ------------------ | --- | ------------ |

|     |     |     | Printing Partial Quantities  |     |
| --- | --- | --- | ---------------------------- | --- |

  If  a  customized  hytnrcfg.ini  is  available  and  the  function  EXECUTE-CODED-FUNCTION  is
defined, A_TDM must be added to this entry

Example:

| [Dialog->Initialization 0 ] ; for all terminals or e.g. 2090 for terminal 90  |     |     |     |     |
| ----------------------------------------------------------------------------- | --- | --- | --- | --- |
;Default = ; EXECUTE-CODED-FUNCTION=
A_LOS_AN|A_LOS_AB|A_ELW|A_ALW|C_LOS_EING|C_GEN|C_UMB|C_PAL_ASW|A_VERB
| EXECUTE-CODED-FUNCTION=  |     |     |     |     |
| ------------------------ | --- | --- | --- | --- |
A_LOS_AN|A_LOS_AB|A_ELW|A_ALW|C_LOS_EING|C_GEN|C_UMB|C_PAL_ASW|A_VERB|
A_TDM

AIP 8.2 configuration:
  Similar to the "interrupt operation" button, the button has to be integrated in the corresponding
layout, e.g. the layout for operations (l_anr.xml):

| An existing button may be copied in advance to simplify the process.  |     |     |     |     |
| --------------------------------------------------------------------- | --- | --- | --- | --- |
Further information can be found in the document entitled EAT-AIP_82.pdf.

| AIP_A_TMD.docx  |     | Version: 1.2.5757  |     | Page 3 of 4  |
| --------------- | --- | ------------------ | --- | ------------ |

|     |     |     | Printing Partial Quantities  |     |
| --- | --- | --- | ---------------------------- | --- |

  If  a  customized  hytnrcfg.ini  is  available  and  the  function  EXECUTE-CODED-FUNCTION  is
defined, A_TDM must be added to this entry

Example:

| [Dialog->Initialization 0 ] ; for all terminals or e.g. 2090 for terminal 90  |     |     |     |     |
| ----------------------------------------------------------------------------- | --- | --- | --- | --- |
;Default = ; EXECUTE-CODED-FUNCTION=
A_LOS_AN|A_LOS_AB|A_ELW|A_ALW|C_LOS_EING|C_GEN|C_UMB|C_PAL_ASW|A_VERB
| EXECUTE-CODED-FUNCTION=  |     |     |     |     |
| ------------------------ | --- | --- | --- | --- |
A_LOS_AN|A_LOS_AB|A_ELW|A_ALW|C_LOS_EING|C_GEN|C_UMB|C_PAL_ASW|A_VERB|
A_TDM

| AIP_A_TMD.docx  |     | Version: 1.2.5757  |     | Page 4 of 4  |
| --------------- | --- | ------------------ | --- | ------------ |
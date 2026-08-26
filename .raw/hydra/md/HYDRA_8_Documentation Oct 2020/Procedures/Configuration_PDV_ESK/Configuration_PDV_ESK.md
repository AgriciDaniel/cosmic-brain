|     |     |     | Configuration PDV-ESK  |     |
| --- | --- | --- | ---------------------- | --- |

  Configuration PDV-ESK
|     | Activate escalation messages  |     |     |     |
| --- | ----------------------------- | --- | --- | --- |
Escalation messages are activated in the terminal. The configuration file pdv_dll is stored in the directory
"ctwin" or "ctaip"... In this file, you can modify the CallESK parameter. By default, the function is disabled
and set to "N". The function is enabled if the parameter is set to the value "Y".
Excerpt from the file pdv_dll.ini:
[Common]
; # @Eskappendix:      file ending of captured escalations
Eskappendix=pesk
[Blade]
; # @CallESK:    flag whether escalation messages should be sent when limits are exceeded
; #              supported values are Y (Yes, send messages) and N (do not send messages)
; # @ESKWaitTime:  time  interval  that  has  to  pass  before  escalation  messages  are  sent
successively
CallESK=Y
ESKWaitTime=600
|     | Define limits and activate automatic generation of errors  |     |     |     |
| --- | ---------------------------------------------------------- | --- | --- | --- |
MOC: Quality management - Process data collection - Collection rules. Go to: Recorded characteristics,
tab Specifications
Here, you can define the limits mentioned below. These limits specify when an automatic error and a
resulting escalation are generated. The limit value must be a valid decimal value and the option that
enables the automatic generation of errors must be checked.
You may include the following limits in an escalation:
|   LTL   |   lower tolerance limit       |     |     |     |
| ------- | ----------------------------- | --- | --- | --- |
|   LPAL  |   lower process action limit  |     |     |     |
| UPAL    |   upper process action limit  |     |     |     |
|   UTL   |   upper tolerance limit       |     |     |     |

| Configuration_PDV_ESK.docx  |     | Version: 1.0.10735  |     | Page 1 of 2  |
| --------------------------- | --- | ------------------- | --- | ------------ |

Configuration PDV-ESK
Further conditions
MOC: Quality management - Process data collection - Collection rules. Go to: Recorded characteristics,
tab Inspection - Computation
Enable the option "Check characteristic".
In addition, the process parameter you want to evaluate must be of data type INTEGER or DECIMAL.
Debug options
You can easily trace back the correct configuration using the file pdvinitpp.2<terminal no>. The section
including the process parameters is most important. The following must apply for the process parameters:
CHECKLIMITS Y (merkmal_pruef / [v] check characteristic)
DATATYPE DECIMAL or INTEGER
ESKUPIL Y (opeg_aktiv / in specification dialog : [v] auto.
generate error for UPAL )
ESKUTL Y (otg_aktiv / in specification dialog : [v] auto.
generate error for UTL )
ESKLTL Y (utg_aktiv / in specification dialog : [v] auto.
generate error for LTL )
ESKLPIL Y (upeg_aktiv / in specification dialog: [v] generate
auto error for LPAL)
UPIL integer (UPAL (must not be empty or (null) if ESKUPIL= Y))
UTL integer (UTL (must not be empty or (null) if ESKUTL=Y))
LTL integer (LTL (must not be empty or (null) if ESKLTL=Y))
LPIL integer (LPAL (must not be empty or (null) if ESKLPIL=Y))
Configuration_PDV_ESK.docx Version: 1.0.10735 Page 2 of 2
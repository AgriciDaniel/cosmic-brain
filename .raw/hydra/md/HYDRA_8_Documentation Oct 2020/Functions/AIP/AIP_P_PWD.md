Terminal - Password Change
1 Terminal - Password Change
Summary
Utilization
This dialog has been designed to change the password at the terminal while recording signatures.
Prerequisite
The function for recording signatures is in use.
The dialog P_PWD has been made available using the button configuration.
To be able to enter the user via the keyboard, the entry "manual badge input=true“ has to be inserted in
the hytnrcfg.ini file:
[Signaturerfassung->User 0]
ManuelleAusweisEingabe=true
The enhanced signature recording function has to be enabled to be able to use signatures at the terminal
in the area of quality data collection. The following entry activates the enhanced function for signature
recording in hytnrcfg.ini (please also see the terminal manual "ctwin.pdf"):
[Signaturerfassung->User 0]
ErweiterteSignaturerfassung=true
Functions
The dialog layout can be modified using the dialog type <P_PWD> in the dynamic dialog configuration.
By default, the badge number can only be entered using a barcode reader (LEGIC, etc.).
Only a limited character set is available (“0“..“9“, “A“..“Z“,[SHIFT] “a“..“z“) when the password is entered
using the "virtual keyboard".
The following note is displayed and the "password (confirmation)" field is opened if the input fields
<password (new)> and <password (confirmation)> do not match when trying to exit the dialog by clicking
<OK>.
AIP_P_PWD.docx Version: 1.0.18468 Page 1 of 2

|     |     |     | Terminal - Password Change  |     |
| --- | --- | --- | --------------------------- | --- |

Figure: Error message with wrong entry
(Note: [Change password] The fields [password (new)] and [password (confirmation)] are not identical!)

| AIP_P_PWD.docx  |     | Version: 1.0.18468  |     | Page 2 of 2  |
| --------------- | --- | ------------------- | --- | ------------ |
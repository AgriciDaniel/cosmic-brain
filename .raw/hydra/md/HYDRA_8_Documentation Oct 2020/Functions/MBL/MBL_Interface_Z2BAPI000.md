Datencontainer Z2BAPI000
1 Data container Z2BAPI000
The base structure Z2BAPI000 is used as basis to transfer data from external systems. Depending on the
data type, different posting and IDoc types will be used. The segment structure Z2BAPI000, however, is
always the same.
To create the segment name Z2BAPI000 in SAP, it must also be generated in SAP according to
the scheme Z1 <Segment name>. Versioning in SAP outbound processing is then used to
generate the segment names of the form Z2 <Segment name><Version>.
Example: Z1BAPI becomes Z2BAPI000
The segment consists of the following 3 fields:
Field Type Length Description
TRANSACTION CHAR 20 Name of the transaction in HYDRA
(Dialog identification in HYDRA)
DESC CHAR 40 Comment
DATA CHAR 940 Dialog data string for HYDRA
The TRANSACTION field contains the control command that is also transferred in the DATA field. It has
no function here and is only used for information purposes.
The DESC field can be used to transfer a comment text describing the operation.
The DATA field is used to transfer the user data. The transfer is realized in the HYDRA HYBAPI format,
i.e. a dialog data string composed of the control command and the user data is transferred. The control
command is always transferred with the "DLG=" acronym followed by the command itself. The control
command is followed by several data identified by a dialog identification and separated by "|". The dialog
string itself must be terminated by a pipe "|".
MBL_Interface_Z2BAPI000.docx Version: 1.0.1362 Page 1 of 2

|     |     | Datencontainer Z2BAPI000  |
| --- | --- | ------------------------- |

MBL_Interface_Z2BAPI000.docx  Version: 1.0.1362  Page 2 of 2
Configuration of Separating/Rebuilding Serial Numbers
1 Configuration of Separating/Rebuilding Serial Numbers
Dialog configuration
Define the AIP function key in the file ctaipbut.ini:
[ANR-LN-Page2]
…
1=A_SNR_D,L,SNR trennen, SNR_trennen.png
The below-mentioned sections are required in the layout configuration of ctaiplay.ini:
[A_SNR_D_GRID.LST ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=
DLL=C20,110,L,SNR
ALIAS LEER2=(DUMMY1)=C1,10,L
CNR=C20,0,L,CNR
ALIAS LEER3=(DUMMY2)=C1,40,L
SAPCNR=C20,110,L,Charge
ALIAS LEER4=(DUMMY3)=C1,10,L
ATK=C20,110,L,Material
[WF@DOC_DATA_D]
FILTER=
SECTION=DOC_DATA_D.LST
DATAFIELDS=
FILE=doc_data_d.lst
AUTOFILTERCOL=
MODE=DATALOCKUNTILSHOW=TRUE|
[DOC_DATA_D.LST]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=
LINK=C20,400,L,link/document
[WF@ATTR_DATA_D]
SECTION=ATTR_DATA_D.LST
DATAFIELDS=
FILE=attr_data_d.lst
AUTOFILTERCOL=
MODE=DATALOCKUNTILSHOW=TRUE|
Setup_SNR_Divide.docx Version: Page 1 of 3

|     |     |     |   Configuration of Separating/Rebuilding Serial Numbers  |     |     |     |
| --- | --- | --- | -------------------------------------------------------- | --- | --- | --- |

| [ATTR_DATA_D.LST]   |     |     |     |     |     |     |
| ------------------- | --- | --- | --- | --- | --- | --- |
| GRID_FONT=Arial     |     |     |     |     |     |     |
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=

| ATTR=C20,100,L,Attribute  |     |     |     |     |     |     |
| ------------------------- | --- | --- | --- | --- | --- | --- |
| VALUE=C20,80,L,Value      |     |     |     |     |     |     |
| EINH=C20,60,L,Unit        |     |     |     |     |     |     |
TEXT=C20,200,L,Text
System configuration
Collection of batch attributes
If you want to enter batch attributes manually when collecting serial numbers, create the batch attributes
to be recorded in the system in relation to the material type of the ready-mounted serial number. To do
so, maintain at least these configurations:
| Parameter name  |                        |                    | Value               |     |     |     |
| --------------- | ---------------------- | ------------------ | ------------------- | --- | --- | --- |
| Options         |   Capture  attribute  | while  generating  | Enable the option.  |     |     |     |
batch
Options  Position  Specify  the  position  -  the  system  sorts  the
|     |     |     | configured  | attributes  | in  an  ascending  | numeric  |
| --- | --- | --- | ----------- | ----------- | ------------------ | -------- |
order (bottom up).
Data type  Maintain the data type and length of the attribute
to be recorded

Control the generation of goods movements
Define for incorporated merged batches, serials numbers and produced serial numbers if you require
goods movements subject to uploads to be provided. To do so, configure the following in advanced object
configuration:
The goods movement option has to be enabled for the relevant material type to be able to use
this configuration.

| Parameter name  |     |     | Value  |     |     |     |
| --------------- | --- | --- | ------ | --- | --- | --- |

| Setup_SNR_Divide.docx  |     |     | Version:   |     |     | Page 2 of 3  |
| ---------------------- | --- | --- | ---------- | --- | --- | ------------ |

    Configuration of Separating/Rebuilding Serial Numbers

Configuration for goods issues (consumptions)
| Object type  | MPL                  |     |
| ------------ | -------------------- | --- |
| Object ID 1  | SNR - serial number  |     |
SAM - merged batch
| Object ID 2      | MATTYP                               |     |
| ---------------- | ------------------------------------ | --- |
| Object ID 3      | Material type the entry applies for  |     |
| Object ID 4      | CMM_A                                |     |
| Parameter        | CREATE_MOVEMENT                      |     |
| Parameter value  | Y                                    |     |
Configuration for goods receipts (generated material)
| Object type  | MPL                  |     |
| ------------ | -------------------- | --- |
| Object ID 1  | SNR - serial number  |     |
SAM - merged batch
| Object ID 2      | MATTYP                               |     |
| ---------------- | ------------------------------------ | --- |
| Object ID 3      | Material type the entry applies for  |     |
| Object ID 4      | CMM_E                                |     |
| Parameter        | CREATE_MOVEMENT                      |     |
| Parameter value  | Y                                    |     |

| Setup_SNR_Divide.docx  | Version:   | Page 3 of 3  |
| ---------------------- | ---------- | ------------ |
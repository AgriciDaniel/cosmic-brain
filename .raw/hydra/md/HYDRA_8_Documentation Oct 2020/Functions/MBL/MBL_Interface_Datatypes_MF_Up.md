Uploading data types: HYDRA --> ERP

1  Uploading data types: HYDRA --> ERP

Type

Description

CHAR x

Information  is  left-aligned  for  the  data  type  CHAR;  unnecessary  places  are  filled  with

blanks.

Example: "ABCD    "

NUM x

Numeric  field  of  the  length  x  without  sign.  Numbers  are  right-aligned;  unnecessary

places are filled with zeros.

Example: "00000002"

DEC_O x.y  Numeric field  of the length x and  y decimal places. An algebraic sign is preceding the

data  field  (“+”  or  “-“).  Places  that  are  not  required  are  filled  with  zeros.  There  is  NO

DECIMAL SEPARATOR.

e.g. DEC_O 13,3:

  -1234567890,123   -1234567890123

  234567890,3

 +0234567890300

DATE

The date is displayed in the YYYYMMDD format.

The field is filled with blanks (if it is not required).

TIME

The time is transferred in the HHMMSS format.

The field is populated with "000000".

Generally, HYDRA  always  transfers a contiguous data structure.  Data fields that are  not used are filled

with blanks. The following definitions apply if you use the file port:

Each  data  record  included  in  the  file  has  to  be  completed  by  'CR'  (U+000D)  and  'LF'  (U+000A)  for

Windows and 'LF' (U+000A) for Unix.

HYDRA  expects  the  file  to  be  in  the  UTF-8  format  and  HYDRA  also  uses  this  format  for  uploads.  On

request, the file transfer may also be performed in the file format that was used until MW 2.0.

MBL_Interface_Datatypes_MF_Up.docx  Version: 1.4.18441

Page 1 of 1


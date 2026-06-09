Data type definitions

1  Data type definitions

Type

Description

CHAR x

Information  is  left-aligned  for  the  data  type  CHAR.  Places  that  are  not  required  are  filled

with blanks (U+0020).

If the field is not used, it must be completely prepopulated with blanks.

Example: "ABCD  "

NUM x

Numeric field of the length x without sign. The data type NUMC only supports digits (ASCII

characters  30 Hex to 39 Hex). These digits are right-aligned and unnecessary  places are

filled with zeros.

If the field is not used, it must be completely prepopulated with zeros (U+0030).

Example: "00000002"

DEC x.y

Numeric  field  of  the  length  x  and  y  decimal  places.  A  data  field  in  HYDRA  format  is

QUAN x.y

preceded by a sign ("+" or "-") and includes a decimal point. Places that are not required

are filled with zeros.

If  the field  is  not  used,  it  must  be  completely  prepopulated  with  zeros  (U+0030)  including

algebraic sign and decimal separator.

e.g. DEC 13,3:

  -1234567890,123   -1234567890.123

  234567890,3

 +0234567890.300

Note:

The field length is indicated WITHOUT algebraic sign and WITHOUT decimal point in the

tabular  description  of  the  structure.  This  means,  for  example,  that  a  field  QUAN  13.3  is

converted to an external length of CHAR15.

DATE

Format  YYYYMMDD.  If  the  field  is  not  used,  it  must  remain  empty  (filled  with  blanks

(U+0020).

TIME

Format HHMMSS. If the field is not used, it must be set to “000000” (zeros with (U+0030)).

HYDRA  does  not  support  special  characters  for  all  alphanumeric  fields.  This  includes,  among

others:  "\“  (backslash),  "|“  (pipe),  „  “  “  (double  quotes),  and  "  ’  “  (single  quotes).  You  cannot

enter these characters using shop floor terminals and the MOC does not support them.

MBL_Interface_Datatypes_SAP.docx

Version: 1.3.18365

Page 1 of 2

Data type definitions

The  character  "  ;  “  (semicolon)  is  used  as  a  separator  in  the  system.  You  must  not  use  this

character in key fields (e.g. order/operation number, MES batch number, personnel number).

The character " % " (percent) is used as a placeholder for database communication. You should

not use this character to prevent the result from being falsified.

MBL_Interface_Datatypes_SAP.docx

Version: 1.3.18365

Page 2 of 2


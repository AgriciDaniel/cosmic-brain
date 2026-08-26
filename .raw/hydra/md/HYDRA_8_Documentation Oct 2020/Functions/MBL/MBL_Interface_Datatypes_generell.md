Data type definitions

1  Data type definitions

Type

Description



CHAR x

The information is left-aligned for the data type CHAR; unnecessary places are filled  with

blanks (blanks - (U+0020)).

If a field is not used, fill it in full length with blanks.

Example: "ABCD    "

NUM x

Numeric field of the length x without sign. The NUMC data type only supports digits (ASCII

characters  30  hex  to  39  hex  and/or  U+0030  –  U+0039).  Numbers  are  right-aligned;

unnecessary places are filled with zeros (U+0030).

If a field is not used, fill it in full length with zeros.

Example: "00000002"

DEC x.y

Numeric  field  of  the  length  x  and  y  decimal  places.  A  data  field  in  HYDRA  format  is

QUAN x.y

preceded  by  a  sign  ("+"  or  "-")  and  includes  a  decimal  point.  Enter  zeros  to  fill  empty

places.

If  a  field  is  not  used,  fill  it  in  full  length  with  zeros  (U+0030)  including  sign  and  decimal

separator.

e.g. DEC 13,3:

  -1234567890,123   -1234567890.123

  234567890,3

 +0234567890.300

Note:

The field length is indicated WITHOUT algebraic sign and WITHOUT decimal point in the

tabular description of the structure. For example: a QUAN 13.3 field results in an external

length of CHAR15.

DATE

Dates must be transferred in the HYDRA format MM/DD/YYYY.

Populate unused date fields with blanks (U+0020; zero(s) (U+0030) not accepted).

TIME

Times must be transferred in the HYDRA format seconds after midnight (0 - 86400).

For  all  alphanumeric  fields,  HYDRA  does  not  support  specific  special  characters.  These

characters are: "\“ (backslash - U+005B), "|“ (pipe - U+007C), „ “ “ (double quote - U+0022), and

„ ’ “ (single quote - U+0027). You cannot enter these characters using the shop floor terminals;

MBL_Interface_Datatypes_generell.docx  Version: 1.6.18360

Page 1 of 2

Data type definitions

the terminals and the MOC do not support these characters.

The character " ; “ (semicolon - U+003B) is used as separator for data collection. You must not

use this character in key fields (e.g. order, batch number, personnel number, etc.).

The character " % “ (percent - U+0025) is used as placeholder/wildcard character for database

queries. For this reason, you should avoid using this character as it might falsify results.

In  general,  you  must  not  use  special  characters  ranging  from  U+0000  to  U+001F.  Exception:

U+000A and U+000D as end-of-line characters.

The file must not include Byte Order Mark (BOM).

In  general,  HYDRA  always  expects  a  contiguous  data  structure.  Consequently,  you  have  to  populate

unused data fields with such default values that comply with the applicable conventions. This also applies

to fields that are not required at the end of a data structure. The following definitions apply if you use the

file port:

Each  data  record  included  in  the  file  has  to  be  completed  by  'CR'  (U+000D)  und  'LF'  (U+000A)  for

Windows and 'LF' (U+000A) for Unix.

HYDRA  expects  the  file  to  be  in  the  UTF-8  format  and  HYDRA  also  uses  this  format  for  uploads.  On

request, you can also transfer files in the file format that was used until MW 2.x.

MBL_Interface_Datatypes_generell.docx  Version: 1.6.18360

Page 2 of 2


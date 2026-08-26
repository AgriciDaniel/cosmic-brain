Setup of Data Record Structure

1  Setup of Data Record Structure

The  data  are  transferred  in  the  following  structure. Within  this  structure  the  value  of  the  SEGNAM  field

precisely defines the set-up of the user data structure in the SDATA field.

Field name Type Length  Designation  Data field and

meaning

SEGNAM*

Char

30

Segment name

This  field  is  occupied  by  the  writing

system  with  the  respective  segment

name.  This  precisely  defines  the set-

up of the data record (SDATA field).

Example: HY72_AU_HD_001

MANDT*

Char

3

Client

Reserved; fixed: '000'

DOCNUM*

Char

16

IDOC number

Serial number for the IDOCs

Reserved: fixed '0000000000000000'

SEGNUM*

PSEGNUM

Char

Char

6

6

Segment number

Reserved: fixed '000000'

Parent segment

Reserved; fixed: '000000'

number

HLEVEL

Char

2

Hierarchy level

Reserved; fixed: '00'

SDATA

Char

1000

User data

This field contains the user data. The

structure of this field is defined by the

SEGNAM field.

MBL_EDIDD40_Structure_Definition.docx  Version: 1.0.1362

Page 1 of 1


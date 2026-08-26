1  Key Fields / Supported Characters

Key Fields/Supported Characters

General notes

In all alphanumeric fields, HYDRA does not support specific special characters. The following characters

are  not  supported:  "%",  "ß","*",  "\",  "/",  "|",  "_",  "?".  Reason:  You  cannot  enter  these  characters  on  the

shop floor terminals or the clients do not support these characters.

You must not use the characters " ; " (semicolon), " , " (comma) and " ' " (apostrophe) because they are

often interpreted as comment characters or separators and can lead to unwanted results.

Workplace/machine numbers (resources of type "MNR")

Workplace/machine numbers and numbers of capacity/machine groups are interpreted as alphanumeric

values. Alphanumeric field with a maximum length of 8, left-aligned.

When  you  create  or  copy  a  workplace,  the  system  checks  if  the  characters  used  are  allowed.  The

following characters are allowed:

  Numbers "0" to "9" (US-ASCII 30hex - 39hex)

  Letters "A" - "Z" (upper case letters - US-ASCII 41hex - 5Ahex)



"-" (US-ASCII 2Dhex)

Lower case letters are automatically converted to upper case letters when a new workplace is created.

You must not use blanks. If required, you must prefix the numbers by leading zeros ("0").

The entry "SYSTEM" as workplace/machine number is reserved for HYDRA and may not be used.

It is possible to overwrite the valid characters for the workplace/machine numbers in the INI configuration.

To this end, you must specify the valid characters as a regular expression (in brackets).

Field

Name

Section

Key

Value

Active

Value

INPUT

PATTERN

MNR

^(?!SYSTEM)([A-Z0-9(){}~^#+!$._%-]+)$



Minimum requirement: b_mnr.dll version 8.1.1.102

MBL_Interface_Key_Fields_Spec_Char.docxVersion: 1.3.20364

Page 1 of 3

Key Fields/Supported Characters

Resource numbers (resources of type <> "MNR")

Resource numbers are interpreted as alphanumeric values. Alphanumeric field with a maximum length of

20; left-aligned.

When you create or copy a resource, the system checks if the characters used are allowed. The following

characters are allowed:

  Numbers "0" to "9" (US-ASCII 30hex - 39hex)

  Letters "A" - "Z" (upper case letters - US-ASCII 41hex - 5Ahex)

  Umlauts "Ä", "Ö", "Ü" (Extended ASCII C4hex, D6hex, DChex)



"-" (US-ASCII 2Dhex)

You may not use umlauts or special characters (e.g. "%", "ß","*", "\", "/", "|", "_", "?") because you cannot

enter these characters on the shop floor terminals or because the clients do not support these characters.

You must not use blanks. If required, you must prefix the numbers by leading zeros ("0").

Lower case letters are automatically converted to upper case letters when a new resource is created.

It is possible to overwrite the valid characters for the resource numbers in the INI configuration. To this

end, you must specify the valid characters as a regular expression (in brackets).

Field

Name

Section

Key

Value

Active

Value

INPUT

PATTERN

RES

^([0-9A-ZÄÖÜ(){}~^#+!$._%-]+)$



Minimum requirement: b_res.dll version 8.1.1.117

HYDRA order number

There are some differences with respect to the order number in the HYDRA data model and the interface.

Order number

The order number (field AUNR) contains the actual order number as it is known in the ERP system

and transferred to HYDRA. The order number is specified in the HYDRA basic settings; by default,

this number has a length of 8 characters.

Operation number

The  operation  number  (field  AGNR)  clearly  identifies  a  defined  process  step  of  an  order.  The

operation number is specified in the HYDRA basic settings; by default, this number has a length of

4 characters.

MBL_Interface_Key_Fields_Spec_Char.docxVersion: 1.3.20364

Page 2 of 3

Key Fields/Supported Characters

MES order number

The MES order number (field ANR) combines the order and the operation number and sometimes

also the sequence number from the ERP system (if licensed). Its length therefore results from the

total of the separate number lengths.

The  total  length  must  not  exceed  25  digits.  If  DOS  terminals  are  used,  the  total  length  must  not

exceed 16 digits.

Note the following for the order or operation number:

  Preferably only use the numbers "0" to "9" (US-ASCII 30hex - 39hex).



If you use letters, only the characters "A" - "Z" (upper case - US-ASCII 41hex - 5Ahex) and "-" (US-

ASCII 2Dhex) are allowed. Do not use lower case letters.

  You may not use blanks in the numbers. The order or operation numbers must have the specified

number  of  digits  with  the  characters  "0"  to  "9"  or  "A"  to  "Z".  If  required,  you  must  prefix  the

numbers by leading zeros ("0").

  HYDRA does not support any umlauts, blank or special characters (see section General notes) for

the  order  or  operation  number  because  you  cannot  enter  these  characters  on  the  shop  floor

terminals or because the clients do not support these characters.

MBL_Interface_Key_Fields_Spec_Char.docxVersion: 1.3.20364

Page 3 of 3


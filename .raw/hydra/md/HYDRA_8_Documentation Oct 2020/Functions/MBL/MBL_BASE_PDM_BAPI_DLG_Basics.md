1  Structure of the DLG Format

Structure of the DLG Format

Basics of HYDRA BAPI

Data is always posted to the database in accordance with basic guidelines ensuring their consistency and

uniformity. This is why any writing access to the database is performed by programs providing a uniform

interface to this end.

This means that all writing accesses to the HYDRA database irrespective of whether these are called via

HYDRA  applications  or  external  applications/  systems  are  executed  by  a  program  with  a  defined

interface.

This is mainly the HYDRA BAPI. It is used in the course of the master data transfer in order to transfer

and post data provided by and processed in external systems to HYDRA.

BAPIs and dialog commands

Essentially,  there  is  for  each  object  (that  can  be  maintained  using  the  MOC)  such  a  BAPI  in  HYDRA.

Objects  in  this  sense  may  be  (production)  orders  or  master  data  records.  There  are  always  different

methods  to  access  such  an  object.  In  the  easiest  case  this  is  a  method  to  create  (INSERT),  modify

(UPDATE) or delete data records (DELETE).

In  more  complex  cases  and/or  when  this  is  requested  by  the  application,  also  different  methods  are

implemented.  This  may  be  modifying  methods  comprising  an  insertion  or  modification  or  additional

application-specific methods.

Such a BAPI is called by a so called dialog command. This command is comprised of:

This is an exemplary (and incomplete) overview of the available objects and their selected methods

<Object>.<Method>

Object

ANR

Methods

INSERT

UPDATE

DELETE

MODIFY

Comment

The  ANR  object  designates  the

order.

MBL_BASE_PDM_BAPI_DLG_Basics.docx

Version:

Page 1 of 5

Object

MNR

FERTVAR

RES

Methods

INSERT

UPDATE

DELETE

INSERT

UPDATE

DELETE

INSERT

UPDATE

DELETE

Structure of the DLG Format

Comment

The  MNR  object  designates

machines/ workplaces.

The

FERTVAR

object

designates production variants.

The  RES  object  designates  the

resources  of  the  module  WRM

and DNC.

Dialog data strings

After the initial BAPI call using the command, the use data will be transferred in a so-called dialog string

or dialog data string. The use data in a dialog string are clearly identified by indicators, also designated as

acronyms.

Such an acronym may represent at least one database field or also have controlling effects on postings.

The  acronym  is  always  followed  by  the  equal  sign  "="  and  the  value  transferred  for  this  acronym.  The

individual  acronyms  and  their  values  are  separated  by  pipes  "|"  from  each  other  and  from  the  dialog

command.

Example:

DLG=FERTVAR.INSERT|FERTVAR.ATK=BLOO01052225000O00|FERTVAR.MGRP=BW2000|
FERTVAR.RESTYP=WNR|FERTVAR.RES=BLOO01052225000O00 2|
FERTVAR.SZY=17143|FERTVAR.TLG=2|
FERTVAR.BEM=BLOO01052225000O00\|rose\|2\|rose\|BW2000|
FERTVAR.VER=1|FERTVAR.STA=F|FERTVAR.FIR:ATK=0|

Data formats/ mandatory acronyms

The descriptions of the acronyms are based on the following data types:

MBL_BASE_PDM_BAPI_DLG_Basics.docx

Version:

Page 2 of 5

Structure of the DLG Format

Type

Description

CHAR x

For the data type CHAR the information will be aligned to the left; unnecessary positions

will be filled with blanks.

Example: "ABCD  "

NUM x

Numeric  field  of  the  length  x  without  sign.  For  the  NUMC  data  type  only  digits  are

allowed  (ASCII-digits  30  hex  to  39  hex).  The  numbers  will  be  aligned  to  the  right  and

unnecessary positions will be filled with zeros.

Example: "00000002"

DEC x.y  Numeric  field  of  the  length  x  contains  y  decimal  places.  A  data  field  in  the  HYDRA

format is preceded by a sign ("+" or "-") and it contains a decimal point. Empty places

must be filled with zeros.

e.g. DEC 13.3: -1234567890.123

Each BAPI call must contain the following header data in the dialog data

Identification

Content

Description

DLG

{BAPI call}

Dialog  identification:  This  dialog  identification  indicates  the

desired BAPI call

USR

NUM 4

HYDRA  user:  This  Hydra  user  number  uniquely  identifies  a

HYDRA client:

MOC:

USR  =  20000  +  MOC  number

USR = 20000 + MOC

LAN

terminal

(LANT)

USR = 2000 + terminal number

FB terminal (FBT):

USR = 2000 + TNR

External terminals

USR = 3000 ... 3999

MLE-MDM

USR=9999

DAT

{mm/dd/yyyy}

Date: current date in the format mm/dd/yyyy

"Today"  can  be  used  as  placeholder

for

the  dynamic

determination.

ZEI

{seconds}

Time: current time in the seconds format

"Now"  can  be  used  as  placeholder

for

the  dynamic

determination.

MBL_BASE_PDM_BAPI_DLG_Basics.docx

Version:

Page 3 of 5

Structure of the DLG Format

Depending on the BAPI call, additional identifications must/ may be entered.

Data objects with files

Only the file names will be indicated in the dialog string for such objects that contain files in addition to the

data fields of dialog data strings, e.g. document resources or DNC resources. The files themselves will be

stored to defined data areas. The data import consists of two steps: Dialog data strings and files.

Dialog data strings - acronyms

The acronym to indicate the file is a field of the field type CHAR 128 that includes the file name. In most

of  the  cases  the  name  is  only  indicated  without  path  -  please  see  the  documentation  for  the  BAPI

concerned.

Example:  RES.SPEICHORT:DATA  includes  the  file  name  without  path  and  without  extension  of  the

attached  DNC  file.  The  storage  location  and  the  extension  are  defined  before  in  the  system  via  the

resource type.

File format:

The file format is not important for the storage in HYDRA. The file will be stored to the specified storage

location.  The  application  will  then  interpret  this  file.  For  the  import  of  master  data  it  must  be  taken  into

account that the file must be stored to the directory specified for the application.

Example DNC files: The DNC type defines in which folder the files are and how they must be stored and

interpreted.

Multilingual database contents

As  part  of  SIS-HLM,  there  is  now  the  possibility  to  define  descriptive  texts  in  several  languages  for

specific objects in the database. Provided that this function is enabled on the system, these columns may

generally also be filled by using the master data import. Please note the following:

  Specify the target language

The target language can be transferred as additional acronym in the dialog data strings.

Example:

Machine  master  data  is  to  be  transferred.  English  (EN)  is  defined  with  language  index  2  in  the

system. The dialog data string to transfer this data has to be structured as follows:

DLG=MNR.INSERT|…|MNR.MNR=<Machine>|MNR.BEZK=English description|…|LANG=2|…

  Only one language can be transferred every time an import is started.

MBL_BASE_PDM_BAPI_DLG_Basics.docx

Version:

Page 4 of 5

Structure of the DLG Format

This means, that two or more import runs might be required, subject to the number of configured

languages. Please note the following:

o  The first import has to be performed using the *.INSERT method.

This rule can be ignored if there is a method "*.MODIFY" for the object. As in this case,

the system decides whether an INSERT or an UPDATE is to be performed.

o  All other imports need to be performed by  way  of the method "*.UPDATE" indicating all

key  fields  pertaining  to  the  object,  the  language-dependent  description  and  the  target

language using the acronym "LANG=n".

o

If the system uses a separately generated, internal key for an object, this one has to be

determined  after  the  initial  creation.  This  internal  key  then  needs  to  be  provided  for  the

updates that follow.

MBL_BASE_PDM_BAPI_DLG_Basics.docx

Version:

Page 5 of 5


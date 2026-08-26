Signature Matrix

1  Signature Matrix

Summary

Menu

System administration  System settings  Signature matrix

Transaction code

sigmat

Function authorization

sigmat.*

Usage

The signature matrix is used in the signature collection to define which posting must be entered within the

system under which conditions and with which signature type.

Integration

These  settings  will  be  taken  into  account  for  both,  editing  dialogs  of  the  MES  Operation  Center  (MOC)

and entry dialogs of the terminal.

Requirements

You have defined signature types in the system.

You have maintained users in the user master data and persons in the HR master data. You have linked

both  objects.  This  will  ensure  that  each  signature  contains  the  name  as  well  as  the  personnel  and  the

badge number.

Field descriptions

Dialog

The dialog for which these signatures/ levels/ conditions .... are saved

Formula

The  condition  that  must  apply  for  the  dialog  to  ensure  that  the  indicated  signature(s)  will  be

requested.

Numerous logical and mathematical operators are available to the formula's formulation.

Values  are  compared  with  each  other  by  inputting  double  equal  signs  "==“.  The  value  which  the

comparison is based on has to be put in double inverted commas.

Example:

It has to be checked whether it is an operation or an order header:

ANR.ATYP == "AU“ (retrieves the order header)

MOC_SignatureMatrix.docx

Version:

Page 1 of 3

Signature Matrix

ANR.ATYP == "OP“ (retrieves the operation)

The values available in each dialog are presented in the dialog's documentation.

Documentation / contents

BDE – master data

BDE – input dialogs

MDE – master data

MPL – master data

MPL – input dialogs

MW – master data

PDV – master data

HR master

WRM – master data

WRM – input dialogs

Link

here

here

here

here

here

here

here

here

here

here

If  postings  are  rejected  at  the  terminal  with  an  error  that  can  be  overridden  by  a  so  called

mandatory posting, the terminal will transfer the field BZWRET together with the entered data.

In the authorization matrix this field can be retrieved as follows in order to admit this compulsory

posting for specific authorized persons only, for example.

The mandatory posting codes 1110 (person is not logged  on at order), 1243 (with the posting

an  overproduction  according  to  the  target  quantity  check  is  detected  for  a  person)  and  1249

(with  the  posting  an  underproduction  according  to  the  target  quantity  check  is  detected  for  a

person) can, for example, be retrieved as follows from the authorization matrix of the signature

collection:

(("1110" in BZWRET) || ("1243" in BZWRET) || ("1249" in BZWRET))

MOC_SignatureMatrix.docx

Version:

Page 2 of 3

Signature Matrix

A  customer-specific  extension  by  additional  variables  (e.g.  user  fields)  is  possible  via  the

getdata function of the hyd_sig_getdata.hsc script.

The  dialog  data  is  available  as  import  variable  DLG_DATA  (C32000)  in  this  script.  Moreover,

the desired field identification for that field that is not included in the dialog data will be entered

into  the  script  together  with  the  import  variable  VAR_NAME  (C255).  In  the  export  variable

VAR_DATA the value of the field (C255) will be given back.

Comment

A freely selectable designation option for comments.

Priority

The  condition  will  be  evaluated  according  to  the  priority  order,  in  which  the  lowest  priority  comes

first.

Signature 1/ 2

One or two signatures may be configured for each posting dialog.

Both, identical and different signature types may be combined.

Level 1/ 2

The authorization level that is necessary for the corresponding signing signature.

The  authorization  level  is  stored  to  the  HR  master  data  (BDE  authorization)  for  each  individual

person.

In order to execute the action, the authorization level of the person must be same or higher than the

specified level.

MOC_SignatureMatrix.docx

Version:

Page 3 of 3


Signature Types

1  Signature Types

Summary

Menu

System administration  System settings  Signature types

Transaction code

sigtyp

Function authorization

sigtyp.*

Usage

The  signature  type  is  used  in  the  signature  collection  to  define  the  mandatory  authentication  type  for

postings.

Integration

Use Signature type  to  define  in the  signature matrix definition  which  postings must be authenticated  by

which signature type.

These  settings  will  be  taken  into  account  for  both,  maintenance  dialogs  of  the  MES  Operation  Center

(MOC) and entry dialogs of the terminal.

Field descriptions

Signature type

Key of a signature type.

Designation

The designation stands for a detailed signature description

Mode

The mode identifies the inspection type that is to be performed. The following entries are provided:

Password  checking    a  confirmation  by  way  of  the  correct  combination  of  card/badge  number

(shop floor terminal) and/or user name (MOC) and password is mandatory.

No password checking  No password to be entered

Signature collection without signature dialog  No confirmation through a second person and

no  password  necessary.  Only  the  authorization  level  from  the  HR  master  data  will  be  checked  in

this mode. The corresponding authorization level of the person will be checked against the person's

or badge number entered into the login dialog. No separate signature dialog will be displayed.

MOC_SignatureTypes.docx

Version: 1.1.18468

Page 1 of 2

In the  "Signature collection  without signature  dialog"  mode the signature  2 check must not be

performed.

Signature Types

A signature type can only  be deleted if  this signature type has not already been used to sign.

The server will check to this end, whether this signature is used in the posting events and will

refuse a deletion, if necessary.

MOC_SignatureTypes.docx

Version: 1.1.18468

Page 2 of 2


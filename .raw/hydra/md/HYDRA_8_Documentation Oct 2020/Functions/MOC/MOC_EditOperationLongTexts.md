Edit Long Texts of Operations

1  Edit Long Texts of Operations

Overview

HYDRA menu

Order management  Order management  Edit long texts of operations

FEDRA menu

Detailed Scheduling  Order management  Edit long texts of operations

Transaction code

edtx

Function authorization

edoptx

Purpose

You can use the function Edit long texts of operations to display or edit operation-related additional. What

should be considered in this regard is that only a maximum of one long text can be recorded/ assigned to

an operation at any one time.

Operation-related long texts can be displayed on the terminal.

Long texts can also be transferred via the interface EIS-EZI (extension additional informations from ERP)

(record  type  "AI").  Additional  information  about  the  interface  can  be  found  in  the  respective  interface

document.

Requirement

The corresponding operation must already be defined.

Long texts included in the online data area may generally be edited, irrespective of the operation status

(added, modified or deleted).

Selection criteria

The application provides the following selection criteria:

MES order number

Entry of the combined order/ operation number. There is an option to use wild cards, for example in order

to  be  able  to  display  all  an  order's  operation-related  long  texts.  In  this  case,  the  order  number must  be

entered, followed by *.

Field descriptions

MES order number

The operation's combined order/ operation number. This is a mandatory field.

MOC_EditOperationLongTexts.docx

Version: 1.2.23414

Page 1 of 2

Edit Long Texts of Operations

Short Text

20-digit short text that is displayed in the table view. This is a mandatory field.

Long Text

The order's long text.

The  long  text  entry  function,  which  for  the  most  part is  equivalent  to  the  functions  of  a  text  editor

(highlighting of text passages; deleting or inserting of lines of text, as well as the merging of lines of

text; copying with the key combination Ctrl+C, cutting with the key combination Ctrl+X, and pasting

with the key combination Ctrl+V). Lines may have more than 80 characters when entered. When a

document is saved, however, the system inserts a hard line break after the 80th character.

Toolbar

 Edit operations

Calling up the application: Edit operations

MOC_EditOperationLongTexts.docx

Version: 1.2.23414

Page 2 of 2


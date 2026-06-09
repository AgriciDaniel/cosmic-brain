Work Plan - Edit Production Resources & Tools

1  Work Plan - Edit Production Resources & Tools

1.1

Summary

Menu

Order management --> Routing management --> Work plan - Edit production
resources & tools

Transaction code

edwres

Function authorization

edwres

The "production resources & tools" application allows for the resources, which are required to produce the

article in the current manufacturing level (current operation), to be displayed and edited.

Production resources and tools may be, for example, tools, documents, NC programs, etc.

Selection criteria

The application provides the following selection criteria:

MES work plan number

The production resources and tools assigned to a work plan operation may be selected by entering

the  MES  work  plan  number.  The  MES  work  plan  number  is  the  combined  work  plan/operation

number.

Enter the whole MES work plan number if you would like to view the production resources & tools

assigned to a specific operation.

If you would like to view the production resources & tools of all operations of a work plan only enter

the work plan number, followed by "*“.

Field Descriptions

The fields of a production tool and resource are described here.

Editing functions

Please  use  the  available  buttons  to  create  or  edit  production  resources  &  tools  of  work  plans.  A  copy

function for production resources & tools is not planned.

If  the  tool  and  resource  management  module  (HYDRA-WRM)  is  in  use,  the  first  production

resource and tool that is not of the resource type "DNC" or "MAT" is taken over into the "tool"

field of the operation. In addition, the "tool" field is checked whether it already includes a value,

when inserting a production resource and tool that is not of the "DNC" or "MAT" resource type.

If this is not the case, this component is taken over. For this reason, it is recommended to insert

MOC_WPLEditProdResources.docx

Version: 19.06.2020

Page 1 of 2

Work Plan - Edit Production Resources & Tools

the "main production resource & tool" at first in the list of production resources and tools.

Please note with regard to documents: If a new document is assigned to an operation a file is

only uploaded automatically, in case a file has been selected using the file selection dialog. The

file selection dialog can be opened by the button next to the “file name” field.

In this case, the path of the file that is loaded onto the server is displayed below the input field

for the file name. The upload is performed automatically while saving.

No file can be uploaded if the file name is entered manually.

The corresponding data record is created anyway even if an error occurs during the upload.

Toolbar

Edit operations

Function authorization: edwop

Opens  the application work plan - edit operations.

Edit orders

Function authorization: edwor

Opens  the application work plan - edit orders.

-  

MOC_WPLEditProdResources.docx

Version: 19.06.2020

Page 2 of 2


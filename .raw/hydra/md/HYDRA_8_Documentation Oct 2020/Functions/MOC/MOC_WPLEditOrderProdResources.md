                                                Work Plan - Edit Production Resources and Tools of the Order

1  Work Plan - Edit Production Resources and Tools of the

Order

Summary

Menu

Order management  Routing management
 Work plan – Edit production resources and tools of the order

Transaction code

edworres

Function authorization

edworres

The  "work  plan  -  edit  production  resources  and  tools  of  the  order"  application  allows  for  the  resources,

which  are  required  to  produce  the  article  in  the  current  manufacturing  level  (current  order),  to  be

displayed and edited.

Production resources and tools may be, for example, tools, documents, NC programs, etc.

Selection criteria

The following selection criteria are available in the application:

Order

The production resources and tools assigned to a work plan order may be selected by entering an

order.

Field descriptions

The fields pertaining to production resources and tools are described here

Editing functions

Please  use  the  available  buttons  to  create  new  or  edit  existing  production  resources  and  tools  of  work

plans. A copy function for production resources and tools is not planned.

If  the  tool  and  resource  management  module  (HYDRA-WRM)  is  in  use,  the  first  production

resource and tool that is  not of the resource type "DNC" or "MAT" is taken over into the "tool"

field of the operation.

In addition, the "tool" field is checked whether or not it already includes a value, when inserting

a production resource and tool that is not of the "DNC" or "MAT" resource type. If this is not the

case, this component will be taken over. For this reason, it is recommended to insert the "main

production resource & tool" at first in the list of production resources and tools.

MOC_WPLEditOrderProdResources.docx Version: 19.06.2020

Page 1 of 2

                                                Work Plan - Edit Production Resources and Tools of the Order

Please  note  for  documents:  If  a  new  document  is  assigned  to  an  operation,  files  will  only  be

uploaded automatically, provided that the file has been selected by the file selection dialog. The

file selection dialog can be opened by clicking the button next to the field "file name".

In this case, the path of the file that is loaded onto the server is shown below the input field for

the file name. The upload is performed automatically upon saving.

If the file name is entered manually, files will not be uploaded.

If an error occurs during the upload, the corresponding data record will still be created.

Toolbar

Edit operations

Function authorization: edwop

Opens the application work plan – edit operations.

Edit orders

Function authorization: edwor

Opens the application work plan – edit orders.

-  

MOC_WPLEditOrderProdResources.docx Version: 19.06.2020

Page 2 of 2


  Edit Production Resources and Tools of the Order

1  Edit Production Resources and Tools of the Order

Summary

Menu

Order management  Order management  Edit production resources and
tools of the order

Transaction code

edorres

Function authorization

edorres

Utilization

This application allows for resources to be defined for orders.

Prerequisite

The relevant order has to be created.

Selection criteria

The following selection criteria are available in the application:

Order

The resources assigned to an order may be selected by entering an order.

Field descriptions

Order

The order number to which the production resources and tools are to be assigned can be entered

in this field.

Resource type

Resource  type  of  the  production  resource  and  tool  that  is  to  be  assigned  to  the  operation.  The

resource type has to be known in the system. Predefined resource types can be selected using the

selection list. Further resource types can be created as a part of customizing HYDRA. DOC is to be

entered as the resource type for documents.

Resource

Enter the resource number (material number) of the production resource and tool in this field.

Designation

The designation for the production resource and tool can be entered in this field.

MOC_EditOrderProdResources.docx

Version: 1.1.18468

Page 1 of 3

  Edit Production Resources and Tools of the Order

Comment 1 / comment 2

These are comment fields.

Required quantity / unit

Required  quantity  of  this  resource  that  is  needed  for  processing  of  the  operation.  This  number  of

resources  is  reserved,  when  planning  the  operation  in  HYDRA  shop  floor  scheduling  (HLS).  The

quantity unit is merely used for comments.

Path

The  logical  reference  to  the  path  of  the  path  configuration  (menu:  file  >  System  administration  >

Paths) is to be defined here if a document is assigned as production resource and tool. Paths do

not have to be defined for DNC resources; they result from the paths defined for the resource type.

The field is to be left empty for all other production resources and tools.

File name

The  file  name  of  the  document  is  to  be  defined  here  if  a  document  is  assigned  as  production

resource and tool.

File names do not have to be defined for DNC resources; they result from the file names defined for

the resource. The field is to be left empty for all other production resources and tools.

Editor / date / time

Editor as well as point in time of the last change

Please  note  for  documents:  If  a  new  document  is  assigned  to  an  operation,  files  will  only  be

uploaded automatically, provided that the file has been selected by the file selection dialog. The

file selection dialog can be opened by clicking the button next to the field "file name".

In this case, the path of the file that is loaded onto the server is shown below the input field for

the file name. The upload is performed automatically upon saving.

If the file name is entered manually, files will not be uploaded.

If an error occurs during the upload, the corresponding data record will still be created.

Toolbar

Edit operations

Starts the application edit operations.

MOC_EditOrderProdResources.docx

Version: 1.1.18468

Page 2 of 3

  Edit Production Resources and Tools of the Order

Edit orders

Starts the application edit orders.

 Order information

Starts the application order information.

MOC_EditOrderProdResources.docx

Version: 1.1.18468

Page 3 of 3


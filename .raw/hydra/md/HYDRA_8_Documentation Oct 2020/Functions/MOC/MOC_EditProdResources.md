Edit Production Resources and Tools

1  Edit Production Resources and Tools

Overview

HYDRA menu

FEDRA menu

Order management  Order management  Edit production resources and
tools

Detailed Scheduling  Order management  Edit production resources and
tools

Transaction code

edres

Function authorization

edres

Purpose

Resources can be defined for operations in the list of production resources and tools.

Further  information  on  how  to  define  workforce  requirements  via  production  resources  and

tools can be found in the document entitled Definition_of_Workforce_Requirement.pdf

Requirement

The corresponding operation must already be defined.

Selection criteria

The application provides the following selection criteria:

MES order number

Combined order/ operation number.

Please note that the components are assigned by specific operations. This is why the entire key must be

entered.  By  entering  the  order  number  followed  by  *,  the  system  will  list  all  components  for  an  entire

order.

Field descriptions

Order/ operation

Enter  the  order/  operation  number  for  the  operation  that  is  to  be  assigned  to  the  production

resource or tool here.

MOC_EditProdResources.docx

Version:

Page 1 of 3

Edit Production Resources and Tools

Resource type

Resource  type  of  the  production  resource  or  tool  that  is  to  be  assigned  to  the  operation.  The

resource type must be known in the system. Predefined resource types must be chosen from the

selection  menu.  Additional  resource  types  can  be  defined  when  customizing  HYDRA.  For

documents, the resource type to be entered here must be DOC.

Resource

Enter the resource number (material number) of the production resource or tool.

Designation

Here, you can enter a name for the production resource.

Comment 1/ C\comment 2

These are comment fields.

Required quantity/ unit

Resource  quantity  required  to  carry  out  the  operation.  When  planning  the  operation  in  the  shop

floor scheduling, this number of resources is entered in terms of capacities. The quantity unit is only

used as a comment.

Please note: In the shop floor scheduling, the quantity 0 is interpreted implicitly as quantity 1.

When  identifying  a  document  as  a  production  resource,  the  logical  reference  to  the  path  is  to  be

defined  in  the  path  configuration  (menu:  File  >  System  administration  >  Paths).  No  path  must  be

stored for DNC resources; it is determined based on the path stored for the resource type. The field

should be left empty for all other production resources (only applies when using HYDRA).

Path

File

When identifying a document as a production resource, the file name (including file extension) is to

be entered here.

No file name must be stored for DNC resources; it is determined based on the file name defined for

the  resource.  The  field  should  be  left  empty  for  all  other  production  resources(only  applies  when

using HYDRA).

Modified by/ date/ time

Editor as well as the date and time the last change was made.

MOC_EditProdResources.docx

Version:

Page 2 of 3

Edit Production Resources and Tools

Please note with regard to documents: If a new document is assigned to an operation a file is

only uploaded automatically, in case a file has been selected using the file selection dialog. The

file selection dialog can be opened by the button next to the “file name” field.

In this case, the path of the file that is loaded onto the server is displayed below the input field

for the file name. The upload is performed automatically while saving.

No file can be uploaded if the file name is entered manually.

The corresponding data record is created anyway even if an error occurs during the upload.

Toolbar

 Edit operations

Calls the application Edit operations.

 Edit orders

Calls the application Edit orders.

 Order information

Calls the application Order information.

MOC_EditProdResources.docx

Version:

Page 3 of 3


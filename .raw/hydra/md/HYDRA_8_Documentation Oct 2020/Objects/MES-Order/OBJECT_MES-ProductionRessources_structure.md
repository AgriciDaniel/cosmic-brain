Production Resources & Tools Data Structure

1  Production Resources & Tools Data Structure

Each  of  the  fields  for  a  production  resource  or  tool  are  described  below.  The  actual  sequence  of  the

editing dialogs may deviate from the one illustrated here.

MES order number/ MES work plan number

Combined order/operation number and/or work plan/operation number of the operation for which a

production resource is defined.

Resource type

Resource  type  of  the  production  resource  or  tool  that  is  to  be  assigned  to  the  operation.  The

resource  type  must  be  known  in  MES.  Predefined  resource  types  must  be  chosen  from  the

selection menu. Additional resource types can be defined when customizing the system.

For documents, the resource type to be entered must be DOC.

Resource

Enter the resource number (material number) of the production resource.

Designation

Here, you can enter a name for the production resource or tool.

Comment 1/ Comment 2

These are comment fields.

Required quantity/ unit

Resource  quantity  required  to  carry  out  the  operation.  When  planning  the  operation  in  graphic

detailed scheduling, this number of resources is entered in terms of capacities.

The quantity unit is only used as a comment.

Path

File

When  identifying  a  document  as  a  production  resource,  the  local  reference  to  the  path  is  to  be

defined in the Path Configuration.

No  path  must  be  stored  for  DNC  resources;  it  is  determined  based  on  the  path  stored  for  the

resource type.

The field should be left empty for all other production resources.

When  identifying  a  document  as  a  production  resource,  the  local  reference  to  the  path  is  to  be

defined in the Path Configuration.

OBJECT_MES-ProductionRessources_structure.docx Version: 1.1.18468

Page 1 of 2

Production Resources & Tools Data Structure

No file name must be stored for DNC resources; it is determined based on the path stored for the

resource type.

The field should be left empty for all other production resources.

If  a  new  document  is  assigned  to  an  operation,  it  must  be  ensured  that  it  exists  at  the

stated location. No file is uploaded when a document is assigned!

Modified by/ Modified on

Editor as well as the date and time the last modification was made.

OBJECT_MES-ProductionRessources_structure.docx Version: 1.1.18468

Page 2 of 2


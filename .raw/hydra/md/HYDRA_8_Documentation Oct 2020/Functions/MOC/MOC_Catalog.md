Catalogs

1  Catalogs

1.1  Overview

Menu

Master data  Quality management  Catalog

Transaction code

cat

Function authorization

cat

1.2  Purpose

Use  this  function  to  create,  insert,  edit,  copy  and  delete  catalog  entries.  If  you  use  imported  catalog

entries (QMS), do not change the application's contents because this application contains catalog entries,

which are exclusively populated by SAP-QM using the QM-IDI interface. The application also includes the

usage decisions of inspection points, which are also used in the in-production inspection (no SAP-QM or

QM subsystem). Via customization, you can change the inspection point decisions that are not passed via

SAP-QM.  Contact  the  MPDV  Consulting.  As  part  of  the  customization,  you  can  change  field  names,

deactivate specific entries or create new inspection point decisions.

SAP-QM provides the following catalogs, for example:

  Usage decisions for the inspection point and the inspection requirement (inspection batch),

  Failure types,

  Failure locations

The  application  provides  an  overview  of  the  selection  lists  that  can  be  called  during  the  inspection

process.  The  higher-level  planning  system  (SAP-QM)  then  specifies  where  and  which  catalog  is

available.

1.3

Integration

In the  inspection processes, the catalog contents are provided  as selection lists.  You can, for example,

select  an  inspection  point  decision  or  an  evaluation  of  a  characteristic  from  a  selected  catalog.  As  a

subsystem of SAP-QM, this master data catalog includes all data records of the required QMS catalogs.

The data records are passed via QM-IDI.

If the function extension of the in-production inspection is available (license FEP-AQF), you can specify

an inspection point decision as Setup inspection. Measured values and attributive inspection results of a

Setup inspection are automatically set to invalid when the inspection point is completed. For further

details, refer to option 1223 in the procedure document Configuration_QM_Options.

MOC_Catalog.docx

Version: 1.3

Page 1 of 3

Catalogs

1.4  Selection criteria

The application provides the following selection criteria:

Catalog type

Number of the catalog type

Selected set

Subgroup of the catalog type

Plant

The production site where the catalog is used.

Code

ID number (alphanumeric)

Code group

Group identification of specific codes

Selection

Checkbox

All  filter  fields  provide  a  match  code  search,  except  for  the  checkbox  Selection.  Use  the  Selection

checkbox  to  specify  if  all  data  records  are  displayed  or  only  the  data  records  with  activated  or  not

activated Selection field.

1.5  Field descriptions

The available fields are self-explanatory and, as a result, not explained separately.

1.6  Editing functions

The below screenshot shows an example of an editing dialog. Design and alignment of fields can deviate

from the example shown.

The editing functions are only available, if the extension QMCatalogExtension is activated.

MOC_Catalog.docx

Version: 1.3

Page 2 of 3

Catalogs

Although you can enter up to ten characters in the fields Code group and Code, you must limit

the entry in field Code group to eight characters and in field Code to four characters.

Longer character strings cannot be used in the AIP recording of inspection data. Example: This

is  important  for  the  inspection  point  decisions  or  characteristics  that  are  evaluated  using  an

evaluation catalog.

Toolbar

The  application  does  not  provide  any  special

function  buttons

in  addition

to

the  standard

functions/features.

MOC_Catalog.docx

Version: 1.3

Page 3 of 3


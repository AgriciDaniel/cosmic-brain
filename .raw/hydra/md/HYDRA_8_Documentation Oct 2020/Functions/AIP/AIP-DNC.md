DNC Functions of AIP

1  DNC Functions of AIP

1.1  General information / basic view of DNC

The  HYDRA-DNC  module  provides  functions  to  manage  DNC  programs,  to  download  DNC  programs

onto a machine or to upload changed programs from a machine.

Provided that the module is active, it can be  opened in the “workplace” section using the “DNC” button.

The  DNC  function  is  started  for  the  machine  selected  in  the  basic  dialog.  However,  the  DNC  dialog

cannot be opened if a machine is selected that is not assigned to a DNC family.

The opened dialog (DNC basic dialog) shows the below-mentioned data.

Operation

Operation number and designation of the operation that is logged on and selected in the basic dialog.

Order

Order number of the operation logged on and selected in the basic dialog.

Article

Article/item number of the operation logged on and selected in the basic dialog.

Workplace

Workplace/machine number and short description.

Selection

By default, selection is made “by DNC family”. The configured filter fields displayed..

But  it  is  also  possible  to  define  another  type  of  selection  that  is  specific  to  the  machine  within  the

hytnrcfg.ini file (the entries to be made are written in brackets).

Selection by order (KEYTYP=A)

The  “search  term”  fields,  etc.  are  hidden.  The  filter  field  is  activated  instead  within  the  table.  DNC

resources are already loaded and displayed while the dialog is being opened. The information line below

the grid is hidden.

Selection by program (KEYTYP=P)

The table is empty at first. The “search term” field refers to the “DNC element”. Filtering refers to the DNC

element.

AIP-DNC.docx

Version: 1.2.1362

Page 1 of 7

DNC Functions of AIP

DNC family

The  DNC  family  which  the  currently  selected  machine  is  assigned  to  is  displayed  here.  Please  note:  A

machine should only be assigned to one DNC family. Any of the assigned DNC families will be displayed

here if the machine is assigned to more than one DNC family.

“Released” status only

If  this  checkbox  is  checked  only  DNC  resources  are  displayed  that  are  currently  assigned  to  the

“released” status.

Memorize

If this checkbox is checked the entered search term is saved, when the dialog is closed. In case nothing

is entered in the input field, the value “empty” is saved.

Table

The  table  of  the  “manage  DNC  elements”  dialog  is  already  filled  while  the  dialog  is  being  opened,

provided that selection is based on  programs or orders. In case the “by DNC family” option is selected,

the list will only be loaded already while opening the dialog if at least one filter field is filled out.

The “manage DNC elements” dialog shows all available DNC resources:

AIP-DNC.docx

Version: 1.2.1362

Page 2 of 7

DNC Functions of AIP

Filter fields

The four filter fields are shown here if the selection is based on  the “by DNC family” option . Depending

on how the DNC family is configured, the fields will be assigned to default values of order and machine.

Provided that the “memorize” checkbox is checked, the entered filter criteria will already be assigned the

next time the dialog is opened. If, however, a default value is configured for a field in the DNC family, this

assignment takes priority.

The filter fields may be entered unless the “read-only” option has been configured. All filter fields can be

entered if no OP is logged on. In this case, the input is not mandatory. A configuration in the hytnrcfg.ini

dialog can prevent the fields from being released.

[Tnr Konfiguration 0]

DNCFreeSearchReadOnly=On

If the DNC dialog is started from the order sequencing list, filter fields react as it is the case if operations

are logged on, as the selected order is transferred as reference.

DNC element

When an entry is selected in the list, the respective DNC element is taken over to the input field. As an

alternative, the DNC element may also directly be written into the input field.

The  functions  that  can  be  started  using  the  buttons  down  right  generally  refer  to  the  DNC  element

displayed in this input field.

Badge number

The  staff  badge  number  has  been  designed  for  checking  authorizations  for  the  functions  that  are

displayed down right in the toolbar and that are described in the following:









 - Update/refresh

 - Show DNC resource

 - Show assigned documents: DNC documents

 - DNC upload machine  AIP

AIP-DNC.docx

Version: 1.2.1362

Page 3 of 7

DNC Functions of AIP







 - DNC download AIP  Machine

 - Lock DNC resource/change status

 - Release locked DNC resource

1.2  Update

This  function  updates

  the  list.  The  value  entered  in  the  “search  term”  input  field  is  taken  into

account  in  this  context.  The  file  size  of  DNC  resources  available  at  the  AIP  is  entered  in  the

corresponding column. Furthermore, the status of the DNC resource is displayed.

When  loading  the  list  by  touching/clicking  the  corresponding  button,  it  is  checked  whether  or  not  filter

fields  configured  as  “read-only”  for  the  upload  are  available  (configuration  of  user  fields  of  the  DNC

family). These fields have to be filled out in order for the list to be loaded.

1.3  Show DNC resource

The file content of the DNC resource is displayed. This function is only available, provided that the DNC-

VIS license has been purchased.

1.4  DNC documents

The “DNC documents” function is only available if the “DNC-AEB” license is active (HYDRA-DNC 7.2).

The terminal loads the list of documents assigned to the resource and displays them.

By selecting an entry in the list and clicking/touching the “open document” button, the file is downloaded

to  the  terminal  and  displayed  in  an  internal  or  external  viewer  –  depending  on  the  respective  file

extension.

AIP-DNC.docx

Version: 1.2.1362

Page 4 of 7

DNC Functions of AIP

1.5  Upload

The  “upload”  function  reads  a  resource  from  the  machine  and  copies  it  into  the  configured  target

directory. For this purpose, the element has to be released for the upload.

An  upload  may  always  be  performed  if  a  DNC  family  is  filtered  and  a  <new  element>  is  selected

afterwards. At first a dialog appears where element and file name may be entered. Moreover, other filter

criteria  may  be  entered.  The  four  lower  fields  of  the  upload  dialog  may  be  used  for  this  purpose.

Configuration of these fields is read out from the DNC family of the resource selected in the DNC dialog.

The fields may be configured as user fields at the client.

A field is only visible if at least one of the options “filter”, "mandatory field at upload", “pre-assignment at

upload” or “read-only” is set.

The field is initialized with default values if the "pre-assignment at upload" option is configured.

The  field  is  grayed  out,  provided  that  the  "not  alterable/read-only"  button  is  set.  But  the  field  remains

unchanged if the “mandatory field at upload” option is set at the same time.

A new line is displayed in the list after the upload.

The  upload  is  documented  as  event  in  the  resource  history.  Two  events  are  entered  with  the  upload.

They are to be distinguished by the dialog IDs:

-  N: Beginning of the upload; the resource record is entered or changed.

-  F: The file pertaining to the record has arrived the target directory.

The two events normally occur in very short intervals. In case the “F” event is missing, the transmission of

the file has been interrupted unexpectedly. A download only transfers the file. The record is not changed.

Consequently, only one event is entered in the history for the download.

1.6  Download

The “download” function collects a resource from the configured  directory and copies it to the machine.

Before  starting  the  download,  users  have  to  identify  themselves  by  their  badge  number.  It  is  checked

whether or not they are authorized to download programs.

The download process is documented as event in the resource history.

AIP-DNC.docx

Version: 1.2.1362

Page 5 of 7

DNC Functions of AIP

1.7  Lock DNC resource or change status

The resource status may be changed in this dialog.

The status change may be documented as event in the resource history.

1.8  Release DNC resource

When  a  resource  is  released  its  status  switches  to  the  status  assigned  to  the  processing  flag  “F”.

Consequently, the status does not have to be selected or entered.

AIP-DNC.docx

Version: 1.2.1362

Page 6 of 7

The status change is documented as event in the resource history.

Release of locked resources:

DNC Functions of AIP

AIP-DNC.docx

Version: 1.2.1362

Page 7 of 7


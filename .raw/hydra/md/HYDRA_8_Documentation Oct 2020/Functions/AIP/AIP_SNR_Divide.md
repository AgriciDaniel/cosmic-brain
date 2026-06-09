Separate/Rebuild Serial Numbers at AIP

1  Separate/Rebuild Serial Numbers at AIP

Usage

The  "separate/rebuild  serial  number"  function  is  used  to  demount  components  listed  by  serial  numbers

from  a  component  part  and  to  mount  a  new  component  as  a  replacement  during  assembly  processes.

The serial number of the component part remains and is continued as a numeric value. All ingoing and

outgoing serial numbers are to be identified.

Prerequisite

Various configurations have to be made in the system to use the dialog. Further details can be found in

the document dealing with description of the configuration to separate/rebuild serial numbers.

"Separate/rebuild serial numbers" dialog

The  "separate  serial  number"  dialog  (A_SNR_D)  consists  of  workflows  providing  extensive  possibilities

for data collection. By default, the dialog includes the following workflow steps:

Started by the workflow button "serial number data"   Dialog   SNR_DATA_D

Including the dialogs:

Workflow step/detailed dialog  Technical name

Usage

separate serial number

A_SNR_D

This  workflow  step  shows  basic  data  of  the

serial number or the user can enter this data

here.

Serial number data

SNR_DATA_D

Detailed  dialog  to  enter  additional  data

specific to serial numbers.

The detailed dialog can only be started for a

single serial number.

Serial number data - attributes  WF_SNR_ATTR_D

Starts  the  input  of  attributes  for  a  serial

number

Serial  number  data  -  document

WF_SNR_DOC_D

Starts  the  input  of  document  links  for  a

links

serial number

Depending on the active workflow step, different function keys are provided.

Basically, data is collected in two steps:

AIP_SNR_Divide.docx

Version: 1.1.18468

Page 1 of 5

Separate/Rebuild Serial Numbers at AIP

  Separate/rebuild serial numbers

At  first  demounting  of  a  component  and  mounting  of  a  replacement  from/in  a  component  part

listed by serial number is documented. The reconstruction is recorded in the system, which leads

back to the "separate serial number" workflow step.

The  dialog  may  either  be  closed  or  additional  data  (batch  attributes  and  document  links)  is

entered for the component part listed by serial number.

  Data collection for the serial number of the finished component part

Basically, data is collected for the serial number when the serial number is completed.

"Separate/rebuild serial number" dialog

The following data is used in the dialog:

Superordinate serial number

The  serial  number  of  the  component  part  from  which  a  component  is  to  be  removed  has  to  be

entered (mandatory).

Demount serial number

The serial number of the component that is to be removed has to be entered (mandatory).

Mount serial number

The serial number of the component that is to be mounted has to be entered (mandatory).

Staff badge number

Entry of the staff badge number is mandatory.

The result list shows the components currently mounted in the serial number of the component part.

AIP_SNR_Divide.docx

Version: 1.1.18468

Page 2 of 5

Separate/Rebuild Serial Numbers at AIP

There  is  a  number  of  function  keys  facilitating  dialog  handling,  to  input  data  for  serial  numbers  or  to

complete a posting:

Designation

Usage

Close

Complete

Closes the dialog.

If  the  user  confirms  it,  the  dialog  can  be  continued  and  remains

opened to enter additional merged batches.

Serial number data

Detailed  dialog to enter  data specific to serial numbers. The detailed

dialog  can  only  be  started  for  a  single  serial  number  and  refers  to

already mounted serial numbers.

Procedure of the "separate/rebuild serial numbers" function

  The user opens the dialog "separate/rebuild serial numbers" by the function key in the basic

terminal screen.

  The user enters the serial number (possibly by scanning) that is affected by separation/rebuilding.

  The result list shows all components mounted in this serial number (through the ”merge serial

numbers" function).

  The user enters the serial number of the component he/she wants to remove and/or takes it over

(by double clicking).

  The user enters the new serial number he/she has mounted.

  Then the user presses the "capture" function key and the serial number is posted along with new

component parts.

  The dialog remains opened until the user closes it explicitly. The entered "serial number" and

result list remains and/or is still displayed.



If several component parts need to be rebuilt, the dialog can still be used. Each exchanged

component is entered separately.

Detailed dialog Serial number data - batch attributes

Batch  attributes may be entered for the serial  number in  the  "serial  number attributes"  workflow step of

the "serial number data" detailed dialog.

The  "attributes"  function  key  allows  entering  attributes  for  a  batch  or  for  all  serial  numbers.  The  input

dialog suggests all attributes that are assigned the "Capture attribute while generating batch" option in the

configuration of batch attributes regarding the operation's material type.

The "go on" function key allows entering document links for serial numbers.

AIP_SNR_Divide.docx

Version: 1.1.18468

Page 3 of 5

Separate/Rebuild Serial Numbers at AIP

Detailed dialog "serial number data – document links (SNR_DATA_D)

The user may enter document links for each serial number (through configuration).

The procedure is as follows:

  The  user  presses  the  "serial  number  data"  function  key  in  the  basic  screen  of  the  collection  of

serial numbers dialog.

  The  user  enters  the  document  links.  The  entered/selected  document  links  are  displayed  as

assigned links in the result list.

  The user selects one of the following input options:

o  For each serial number

If this option is enabled, the entered document links are only saved for this serial number.

The  entered  document  links  are  stored  and  suggested  the  next  time  a  serial  number  is

recorded.

  Once the user has entered the document links for the serial number, he/she gets to the next

workflow of the dialog or back to the basic screen by "go on".

AIP_SNR_Divide.docx

Version: 1.1.18468

Page 4 of 5

Separate/Rebuild Serial Numbers at AIP

AIP_SNR_Divide.docx

Version: 1.1.18468

Page 5 of 5


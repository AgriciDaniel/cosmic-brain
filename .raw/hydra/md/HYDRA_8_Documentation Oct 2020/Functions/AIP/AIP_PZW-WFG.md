Requesting Absences on the Terminal

1  Requesting Absences on the Terminal

Overview

Employees can use this function to request, change  and delete absences on the PZE or  BDE terminal.

The  terminal  also  provides  an  overview  for  the  employee  that  displays  the  former  requests  and  their

request status.

Operation on the terminal

To start the absence planning on the PZE terminal, select the respective button and scan the badge. The

following dialog opens and shows the requested, approved or planned absences.

On the  BDE terminal,  the  dialog opens directly  when  you have  pressed the respective  button. To show

the absences, you must first scan the badge. You cannot enter the staff badge number via keyboard. For

security reasons, you must scan the badge via badge or bar code reader.

Note:

You  can  only  use  the  function,  if  the  terminal  is  online.  If  the  terminal  is  offline,  the

request is canceled and an error message is output.

AIP_PZW-WFG.docx

Version: 1.3.14907

Page 1 of 5

The list only shows planned absences of the future and the absence reasons that you can also request or

plan on the terminal. The following statuses are shown:

Requesting Absences on the Terminal

Status

Description

requested

The absence has been requested, but has not yet been approved or refused.

approved

The absence has been requested and has been approved by the superior.

planned

The  absence  does  not  require  approval  and  has  been  planned  on  the
terminal or on the HYDRA client.

The list does not show the rejected requests. This way, the employee is not reminded again and

again  that  they  actually  wanted  to  be  off  at  a  different  time  and  that  this  request  has  been

refused.  The  information  that  an  absence  request  has  been  refused  is  shown  when  the

employee clocks in or out on the PZE terminal (AIP or ctwin).

Function key assignment

Cancel

Use this button the close the dialog.

Request

To request an absence, the following dialog opens (P_FZP_INS):

Select an absence reason and enter a period. Click the button OK to request or plan the absence.

You can also enter a comment.

AIP_PZW-WFG.docx

Version: 1.3.14907

Page 2 of 5

Requesting Absences on the Terminal

Edit

The employee can use the dialog Edit absence (P_FZP_UPD) to change a planned absence. This

function is only available for absences that need not be approved:

Delete

The employee can use the dialog Delete absence (P_FZP_DEL) to delete a planned or requested

absence.  If  an  absence  has  been  requested,  the  superior  is  informed  that  the  request  has  been

canceled:

AIP_PZW-WFG.docx

Version: 1.3.14907

Page 3 of 5

Requesting Absences on the Terminal

The button Delete is only available for the following absences:

- requested and not yet approved absences;

- absences that do not require approval;

- absences that have been entered on the terminal.

Info

The  employee  can  use  this  button  to  display  the  current  account  balances.  The  same  display  is

shown if you press the Info button on the PZE terminal:

Terminal configuration

On the PZE terminal, the functionality described can be enabled using an Absence reason button. In the

terminal configuration, tab HR functions, assign the entry "_FZP" to one of the fields Absence reason 1 to

Absence reason 4. You can define the label text of the respective button on the PZE terminal in one of

the fields Absence reason text 1 to Absence reason text 4.

On  the  BDE  terminal,  you  can  enable  the  functionality  using  the  dynamic  dialog  P_FZP.  The  following

entry is made in any section of the INI file ctaipbut.ini:

X=P_FZP,R,button label

  (X =  button index)

Activating dynamic dialogs

To  call  the  dialog  on  the  terminal,  the  dynamic  dialog  P_FZP  must  be  enabled.  The  dialog  is  usually

enabled  during  installation  of  the  system.  If  this  is  not  the  case,  you  can  enable  the  dialog  in  the

application Dynamic dialogs using the button Activate dialog.

AIP_PZW-WFG.docx

Version: 1.3.14907

Page 4 of 5

Requesting Absences on the Terminal

You can define dynamic dialogs for terminals or terminal groups. This option is mainly used on

BDE  terminals.  If  you  want  to  use  the  absence  workflow  on  a  terminal  where  dialogs  for  the

terminal or the terminal group exist, you must copy and enable the dialogs P_FZP, P_FZP_INS,

P_FZP_UPD and P_FZP_DEL for the terminal or the terminal group.

AIP_PZW-WFG.docx

Version: 1.3.14907

Page 5 of 5


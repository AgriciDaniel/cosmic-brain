Workplace terminal assignment

1  Workplace terminal assignment

Overview



Menu

Master data => Workplaces/machines => Terminal assignment

Transaction code

wta

Function authorization  mdwta

Purpose

This function is used to configure the machine assignment for the terminal.

Purpose

The  assignment  of  a  machine  to  a  terminal  is  a  requirement  to  use  MDE-specific  functions  such  as

automatic  shift  change,  cyclic  status  updates  or  recording  via  MSS.  However,  these  functions  are  only

available  if  the  terminal  is  configured  as  a  so-called  "MDE  terminal"  (see  Terminal  Configuration).

Terminals  configured  as  ADE  terminals  do  not  provide  these  function  even  if  the  machines/workplaces

are not assigned to the terminal.

The assignment ensures that the machine/OP is displayed by default on the terminal.

The number of machines that can be assigned depends on the terminal type.

Terminal type CT-541:

only one assignment possible

Terminal type CT-76x, CT 83x, CT84x,
CT850 (AIP 8.1 and 8.2):

up to 16 assignments possible
(even though the terminal is configured as master
terminal)
up to 10 machines may be used for the process
data collection (HYDRA-PDV).

Terminal type CT-56x:

Terminal type A-SUB

up to 8 assignments possible

up to 20 assignments possible.

All machines previously assigned to terminals are shown according to the selected terminals. The order in

which the display is shown on the terminal is determined by the position specified here.

MOC_WorkplaceTerminalAssignment.docxVersion: 1.4.17034

Page 1 of 3

Workplace terminal assignment

If  a  production  line  (only  available  if  MDE-LIN  license  is  available)  is  assigned  to  the  terminal,  all

aggregates of the production line are automatically assigned to the terminal and displayed in gray under

the  position  “99”.  Aggregates  cannot  be  removed  from  the  assignment.  If  a  production  line  is  removed

from  the  assignment,  the  aggregates  assigned  to  the  production  line  are  automatically  removed.

Production  lines  can  only  be  attributed  to  the  terminal  types  CT76x,  CT83x  (max.  2  lines)  and  CT84x

(max. 3 lines).

The  option  "Processing"  can  perform  different  assignments  of  the  machine  type  to  the  terminal.    The

following options are available:

A - BDE processing

M – MDE processing

Processing as per operation mode of the terminal

Therefore,  workplaces/machines  with  HYDRA-MDE-processing  and  workplaces  only  with  HYDRA-ADE-

processing may be assigned to an MDE terminal.

You  have  to  set  the  processing  to  "BDE  processing"  for  a  group  workplace,  if  you  want  to  assign  the

group workplace to a terminal.

Number of terminal assignments

You can only assign a machine/workplace to a single terminal.  If you want to assign a machine

to several terminals, then you have to obtain the appropriate license.

Configuration changes

Restart  the  terminal  to  ensure  that  the  settings  or  changes  made  can  be  interpreted  by  the

terminal shop floor program.

Selection criteria

The application provides the following selection criteria:

From - to

Select terminal number

Field descriptions

Terminal

Assign a machine to a unique terminal number.

Position

Display position of the machine at the terminal and for the terminal assignment at the client.

MOC_WorkplaceTerminalAssignment.docxVersion: 1.4.17034

Page 2 of 3

Workplace terminal assignment

Machine

Machine you assign to the terminal.

Processing

Here, you have the following 3 options:

A

M

BDE processing

MDE processing

Processing as per operation mode of the terminal

MOC_WorkplaceTerminalAssignment.docxVersion: 1.4.17034

Page 3 of 3


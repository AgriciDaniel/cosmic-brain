Server-Controlled Shift Change

1  Server-Controlled Shift Change

Purpose

The server-controlled shift change allows you to differentiate between MDE and BDE data regarding shifts.

Integration

The origin of data does not affect the server-controlled shift change.

Requirements

One of the following requirements must be met in order for the server-controlled shift change to take place

for a machine/workplace:

  The machine is not assigned to a terminal.

  The machine is assigned to a terminal. But this terminal is not assigned the option "Operated as

HYDRA-MDE terminal" in the Terminal configuration (go to Terminal configuration --> General -->

Configuration).

  The machine is assigned to a terminal. This terminal is assigned the option "Operated as HYDRA-

MDE  terminal".  But  in  the  machine/terminal  assignment,  this  machine  is  configured  with  "BDE

processing".

This document provides detailed information on how to configure and activate the server-controlled shift

change.

Procedure of server-controlled shift change

Prior to posting data, the central posting process (hymw.exe/out) checks for BDE machines if the server-

controlled shift change is:

- enabled for specific machines or

- for the entire system.

If the server-controlled shift change is enabled for the machine (either option), the system checks if the shift

has  changed  since  the  last  posting  of  this  machine.  If  so,  the  system  triggers  an  M_ASW  dialog  (shift

change dialog) for the affected machine.

Cyclic trigger

Use  a  cyclic  program  (ade_aswtrigger.exe/out)  to  verify  if  a  shift  change  should  be  carried  out  for  BDE

machines. An automatic status update (M_AST) is triggered if a shift change is required. This status update

then initiates the server-controlled shift change.

MBL_ServerBasedShiftChange.docx

Version: 1.1.18468

Page 1 of 2

Integration: automatic logon of continuous monitoring orders

The procedure is as follows if the shift change coincides with the start time of a continuous monitoring order:

Server-Controlled Shift Change

1.  Log off a running operation at the time the shift changes (exact time stamp).

2.  Change shifts at the time of the shift change (exact time stamp).

3.  Log on the new operation at the time the shift changes (exact time stamp).

MBL_ServerBasedShiftChange.docx

Version: 1.1.18468

Page 2 of 2


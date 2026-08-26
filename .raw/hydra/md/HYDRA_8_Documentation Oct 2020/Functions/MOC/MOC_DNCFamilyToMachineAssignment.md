Assignment of DNC family to machine

1  Assignment of DNC family to machine

Summary

Menu

Master data  Resources  Assignment of DNC family to machine

Transaction code

dncmas

Function authorization  mddncma.*

To control sequences and handle plausibilities on the terminal, DNC families are assigned to machines.

Usage

Assigning  machines  (in  general:  workplaces)  to  DNC  families  defines  the  DNC  families  from  which

programs can be used on the machine. The defined families are used as filter criteria on the machines.

Please  note:  This  assignment  is  also  the  activation  of  the  DNC  functionality  on  the  terminal  for  the

assigned machine:

-  A  machine  has  at  least  one  family  assignment:  The  terminal  allows  DNC  operation  and  when

started,  it  also  connects  the  DNC  channel.  A  DNC  channel  for  the  HYDRA  process

communication controller (PCC) must be set up on the terminal.

-

If there is no assignment for the machine, the DNC function for the machine is switched off.

Requirement

The DNC function is licensed.

Selection criteria

The following selection criteria are available in the application:

Workplace

The workplace/ machine to which a type is to be assigned.

DNC family

The assigned DNC family

MOC_DNCFamilyToMachineAssignment.docxVersion: 1.0.19143

Page 1 of 2

Assignment of DNC family to machine

Field descriptions

Default

If several families are assigned, one can be identified as the default, which will be used as the basic

setting.

MOC_DNCFamilyToMachineAssignment.docxVersion: 1.0.19143

Page 2 of 2


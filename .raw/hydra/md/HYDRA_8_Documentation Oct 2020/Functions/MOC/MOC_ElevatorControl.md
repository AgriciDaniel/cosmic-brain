Elevator Control

1  Elevator Control

Summary

The elevator control allows for several entrances (floors) to be controlled via one reader. When a badge is

read, the terminal checks all entrances (floors) that are configured for this reader and releases the door

opener  contacts  of  the  authorized  accesses,  which  are  linked  with  the  pushbuttons  of  the  elevator  and

release the appropriate buttons.

The  door  status  contact  indicates  which  button  was  pushed.  Provided  that  the  door  status  contacts  are

configured in accesses, the access protocol is only generated, once a button has been pushed and thus it

is  possible  to  check  in  the  access  protocol  which  floor  the  employee  entered.  In  case  the  door  status

contacts are not configured in entrances, an access protocol is generated for each authorized floor. Thus,

it may be checked who might be in a floor, however without knowing whether the employee has actually

entered this floor.

A  separate  access/entrance  is  created  for  every  floor  of  an  elevator  control.  Consequently,  each  floor

may have different authorizations. If several accesses/entrances are created for one reader it is verified

that the floor number is unique. The floors are defined in the “advanced settings” tab of the access.

Online-checks are not performed for the elevator control to avoid one or several online checks

from being made every time the elevator is used by employees who are not allowed to enter all

floors.

A  maximum  of  nine  entrances  and,  as  a  result,  nine  floors  may  be  managed  by  one  ZKS

terminal.

MOC_ElevatorControl.docx

Version: 1.1.1362

Page 1 of 1


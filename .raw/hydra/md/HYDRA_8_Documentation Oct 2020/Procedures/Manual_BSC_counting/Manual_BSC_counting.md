1  Manual BSC identification

Manual BSC identification

Persons/Staff

You can identify the number of active persons/staff in the system using the application "HR master data":

Menu

Master data  Staff  HR master data

Transaction code

pers

Function authorization

Pers

A person is considered active if the following requirements are fulfilled:

  The current date is between the date "Valid from" and the date "Valid to".

  The person has joined but not yet left the company on the current date.

  The person is not locked for time and attendance.

Here, you can find this information in the HR master data:

Manual_BSC_counting.docx

Version: 1.0.10515

Page 1 of 6

Manual BSC identification

Manual_BSC_counting.docx

Version: 1.0.10515

Page 2 of 6

Manual BSC identification

The systems checks the information when a new active version of the HR master data is created and when

a valid HR master data version is changed from inactive to active. The check is performed after manual

maintenance and after an interface run of the HR master data interfaces.

Manual_BSC_counting.docx

Version: 1.0.10515

Page 3 of 6

Manual BSC identification

Workplaces

You can identify the number of active workplaces/machines in the system using the application "Workplace

and resource configuration": Filter by resource type "MNR":

Menu

Master data  Resources  Resource configuration

Master data  Workplaces/machines  Workplace configuration

Transaction code

Res

Function authorization  Mdres

mdresgenh for fields in connection with Test Equipment Management

A workplace or a machine is considered active if it is not "Blocked" in the "Workplace configuration".

Manual_BSC_counting.docx

Version: 1.0.10515

Page 4 of 6

Manual BSC identification

DNC machines

You can identify the number of active DNC machines in the system using the applications "Assignment of

DNC family to machine" and "Workplace and resource configuration":

Menu

Master data  Resources  Assignment of DNC familiy to machine

Transaction code

Dncmas

Function authorization  mddncma.*

A DNC machine is considered active, if the following requirements are fulfilled:

  An entry is made for the machine in the application "Assignment of DNC family to machine"

  The machine is not "Blocked" in the "Workplace and resource configuration".

Manual_BSC_counting.docx

Version: 1.0.10515

Page 5 of 6

Manual BSC identification

Logical channels

You  can  identify  the  number  of  logical  channels  within  the  system  using  the  application  “PDV  -  logical

channels”.

Menu

Master data  Process data processing  Logical channels

Transaction code

lgchcnf

Function authorization

lgchcnf.*

The system takes into account all logical channels that have been created.

Manual_BSC_counting.docx

Version: 1.0.10515

Page 6 of 6


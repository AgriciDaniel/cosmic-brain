  Checks for Business Parameter Containers (BSCs)

1  Checks for Business Parameter Containers (BSCs)

Overview

Checking the number of managed personnel master records (BSC-NPE)

The  Business  Parameter  Container  "BSC-NCE"  specifies  the  maximum  number  of  managed  personnel

master records.

The system checks the number of active persons at the current point in time. A person is considered active

if the following requirements are fulfilled:

-  The current date is within the dates of beginning of validity and end of validity.

-  The person has joined but not yet left the company on the current date.

-  The person has not been locked for PZE.

The check is performed for all editing activities where an active and current version of the HR master data

is generated.

-  When creating new, active HR master data versions

-  When changing the HR master data version valid today if it changes from inactive to active.

The check is performed for manual editing activities, e.g. on the MOC and during an interface run of all HR

master data interfaces.

MBL_BSC_Checks.docx

Version: 1.5.23319

Page 1 of 2

  Checks for Business Parameter Containers (BSCs)

Because the system only checks the HR master data versions valid today, it is possible that too

many versions are created that are valid in future. When the time is reached that these HR master

data versions  become valid, no new  versions can be created. If the HR master data  interface

DNPERSO from SAP-HCM is used, then the surplus HR master data is deactivated.

If the HR master data interface DNPERSO of SAP-HCM is used, the following special feature is

active:

It may occur that in an identical interface run a number of persons is added and a number of "old"

ones is deleted or deactivated. Therefore, for the duration of the interface run, "new" and "old"

persons are activated, as the persons who should be deleted or deactivated can only be identified

at the end of the interface run. Thus a violation of the maximum number of licensed persons can

occur  in  the  short-term  and  some  of  the  "new"  persons  can  be  rejected.  However,  the  "new"

persons are transferred during the next interface run when all "old" ones have been deactivated.

Checking the number of managed machines, aggregates or workplaces

(BSC-NMW)

The Business Parameter Container "BSC-NMW" specifies the maximum number of managed machines,

aggregates or workplaces.

To identify the current number in the system, all unlocked machines are used.

Checking the number of machines with a DNC connection (Distributed

Numerical Control) (BSC-NDM)

The  Business  Parameter  Container  "BSC-NDM"  specifies  the  maximum  number  of  managed  machines

with a DNC connection (Distributed Numerical Control).

The check is performed when you create and copy an "assignment DNC family to machine".

To identify the current number in the system, the total number of unlocked machines with an assignment

"DNC family to machine" is used.

Checking the number of logical channels to collect process values (tags)

(BSC-NPT)

The Business Parameter Container "BSC-NPT" specifies the maximum number of logical channels used

to collect process values (tags).

To identify the current number in the system, all created logical channels are used.

MBL_BSC_Checks.docx

Version: 1.5.23319

Page 2 of 2


Manual

Active Directory Integration in
the MES-Cockpit
MC-ADI 3.1

Version 1.0.23049

Last changed on: 01.09.2020

Active Directory Integration in the MES-Cockpit

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MC-ADI_31.docx

Version: 1.0.23049

Page 2 of 5

Active Directory Integration in the MES-Cockpit

Contents

1  MES Cockpit - Active Directory Integration .................................................. 4

1.1

Implementation notes .......................................................................................... 4

1.2  Requirements ...................................................................................................... 4

1.3  Delimitation ......................................................................................................... 4

1.4

Logon .................................................................................................................. 5

MC-ADI_31.docx

Version: 1.0.23049

Page 3 of 5

Active Directory Integration in the MES-Cockpit

1  MES Cockpit - Active Directory Integration

Users who log on to the administration client and evaluation client and need to manage and/or evaluate

data must be entered as users in the MES Cockpit and have the relevant authorizations.

Apart from being maintained in the MES Cockpit, user access data such as passwords can also be drawn

from the Active Directory. Passwords are hence administered centrally in the Active Directory.

Use  is  subject  to  the  activation  of  the  Active  Directory  on  the  MES  Cockpit  server  and  the

connected systems.

1.1  Implementation notes

Active  Directory  (AD)  is  the  directory  service  of  MS  Windows  Server  operating  systems  (as  from  the

version Windows Server 2008, the core component is called Active Directory Domain Services (ADDS)).

Active Directory is used for the administration of objects in a network, e.g. users, groups, computers and

services.

1.2  Requirements

Use of the Active Directory integration is





subject to the license MC-ADI;

subject to the successful completion of the Active Directory configuration steps.

1.3  Delimitation

The following restrictions apply:

  Only Windows Active Directory 2003 or Windows Active Directory 2008 are supported.

  Only one domain is supported. Users may not originate from different domains.

  The time on the administration client and on the server must be synchronized via the domain.

  Supported Client operating systems:

Windows XP

Windows 7

  VPN connections are not supported.

  Only the following internal security mechanism is still supported:

The user may be locked in HYDRA.

All other checks are performed against the Active Directory.

  Only LDAP is supported (no LDAPS support).

MC-ADI_31.docx

Version: 1.0.23049

Page 4 of 5

Active Directory Integration in the MES-Cockpit

1.4  Logon

When  logging  on,  the  user  may  also  select  the  parameter  Active  Directory  in  addition  to  the  "normal"

parameters.

If this parameter is selected, authentication of the user with the entered password is verified against the

Active Directory.

MC-ADI_31.docx

Version: 1.0.23049

Page 5 of 5


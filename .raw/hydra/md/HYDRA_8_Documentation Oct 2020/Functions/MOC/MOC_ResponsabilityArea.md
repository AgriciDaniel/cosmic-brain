Responsibility Areas
1 Responsibility Areas
Overview
HYDRA menu System administration  User administration  Responsibility areas
FEDRA menu System administration  User administration  Responsibility areas
Transaction code respa
Function authorization respa
Purpose
Function authorizations control the access to applications/functions. You can also control the access to
the data included in the system.
You use authorizations for responsibility areas to control the access to data. Example: Via responsibility
areas, customers with several sites or factories can protect configurations which only apply to one site
from being edited by users of other sites.
You do not explicitly create different responsibility areas and assign them to a user. A new responsibility
area is created with the assignment to a user.
Integration
You can create responsibility areas for different objects.
 Machines (resources)
 Staff
 Orders / operations
 Other configurations
Requirements
Users have to be created before responsibility areas can be assigned.
Selection criteria
The application provides the following selection criteria:
MOC_ResponsabilityArea.docx Version: 1.4.23308 Page 1 of 2

|     |     |     |     | Responsibility Areas  |
| --- | --- | --- | --- | --------------------- |

Modified by
User that is included in the user administration.
Responsibility profile/area
Name of the responsibility area or profile.
Field descriptions
Responsibility profile
Key of the responsibility profile
Responsibility area
Key of the assigned responsibility area
Authorizations
Authorizations specify how the user can edit or use the data.
| Display:   | The user can view the data.  |     |     |     |
| ---------- | ---------------------------- | --- | --- | --- |
Use:   Only used in PZE/PZW: The user can use the data in other
|                                                  | applications, e.g. payment day types in the  |     |     |     |
| ------------------------------------------------ | -------------------------------------------- | --- | --- | --- |
|                                                  | absence planning.                            |     |     |     |
| Insert:   The user can create new data records.  |                                              |     |     |     |
| Modify:                                          | The user can edit existing data records.     |     |     |     |
| Delete:  The user can delete data records.       |                                              |     |     |     |

If you assign several responsibility profiles to one user, the user might be assigned one
responsibility area multiple times with different authorizations each. In this case, the user

obtains all enabled authorizations for this responsibility area (linked via OR).
In the Shop Floor Scheduling, the options "Authorizations" are not used. If a user in the Shop
Floor Scheduling should only have the authorization "Display", you must remove the other

function authorizations.

MOC_ResponsabilityArea.docx  Version: 1.4.23308  Page 2 of 2
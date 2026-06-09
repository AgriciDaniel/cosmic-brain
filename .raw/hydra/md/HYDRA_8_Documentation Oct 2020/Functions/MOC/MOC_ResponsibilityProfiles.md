Responsibility Profiles
1 Responsibility Profiles
Overview
HYDRA menu System administration  User administration  Responsibility profiles
FEDRA menu System administration  User administration  Responsibility profiles
Transaction code rpp.*
Function authorization respp
Purpose
You use responsibility profiles to easily assign authorizations in the administration of responsibility areas.
A responsibility profile includes one or more responsibility areas.
If you assign a responsibility profile to a user, the user automatically obtains all responsibility areas
included in the profile.
If you assign several responsibility profiles to one user, the user might be assigned one
responsibility area multiple times with different authorizations each. In this case, the user
obtains all enabled authorizations for this responsibility area (linked via OR).
If you change the profile subsequently, the changes are directly enabled when the user logs on the next
time.
Integration
You can create responsibility areas for different objects.
 Machines (resources)
 Staff
 Orders / operations
 Other configurations
Requirements
To assign responsibility profiles to users, you must have created the users.
MOC_ResponsibilityProfiles.docx Version: 1.3.23310 Page 1 of 2

|     |     |     |     | Responsibility Profiles  |
| --- | --- | --- | --- | ------------------------ |

Selection criteria
The application provides the following selection criteria:
Responsibility profile
Use the name to select the created responsibility profiles (you can enter wildcards).
Field descriptions
Responsibility profile
Responsibility profile the responsibility area is assigned to.
Responsibility area
Responsibility areas that are grouped to a responsibility profile.
Authorizations
Authorizations specify how the user can edit or use the data.
| Display:   | The user can view the data.  |     |     |     |
| ---------- | ---------------------------- | --- | --- | --- |
Use:     Only used in PZE/PZW: The user can use the data in other
|             | applications, e.g. payment day types in the  |     |     |     |
| ----------- | -------------------------------------------- | --- | --- | --- |
|             | absence planning.                            |     |     |     |
| Insert:     | The user can create new data records.        |     |     |     |
| Modify:     | The user can edit existing data records.     |     |     |     |
| Delete:     | The user can delete data records.            |     |     |     |

MOC_ResponsibilityProfiles.docx  Version: 1.3.23310  Page 2 of 2
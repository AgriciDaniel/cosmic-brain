                                                            Function authorizations for HR master data tabs

1  Function authorizations for HR master data tabs

Purpose

Function authorizations for HR master data have been extended. On tab level, you can now specify who is

allowed to view, edit, copy, add or delete data. Example: production supervisors can view and change the

settings of the "shop floor data" tab. They cannot change the other tabs.

Processing

Use the following new function authorizations to control the tabs:

tab Person: pers.person

tab Personal data: pers.pd

tab Shop floor data: pers.mf

tab Incentive wage: pers.iw

tab Time and labor data: pers.lt

tab Last changed on: pers.ad

These function authorizations each refer to the tabular display and detail view of HR master data and the

related edit/insert/copy dialogs of the selected data record.

The following function authorizations are generally available for the HR master:

pers

Activates the HR master including all functions and tabs. Users with this authorization can work with the

HR master without any restrictions. This function authorization activates all tabs (overrides specific function

authorizations for tabs).

pers.view/pers.create/pers.edit/pers.delete

The user can open/view the HR master and add, edit and delete persons. The HR master only shows base

fields, i.e. fields of the person tab.

pers.person/pers.pd/pers.mf/pers.iw/pers.lt/pers.ad

Add  the  function  authorizations  for  tabs  (pers.person/pers.pd/pers.mf/pers.iw/pers.lt/pers.ad)  in  order  to

enable  the  view/add/edit/delete  dialog  for  additional  tabs.  You  can  only  use  this  function  if  the  general

function authorization pers is not assigned.

Configuration_Separate_rights_for_HR_master_data.docx  Version: 1.0.11448                                  Page
1 of 3

                                                            Function authorizations for HR master data tabs

The user cannot open the application "HR master" if none of these authorizations is assigned. However,

the user can use this application as selection dialog in other applications (e.g. as selection criterion in the

"clockings" application). In this case, however, the user can only view the base fields (i.e. the fields of the

person tab).

Base fields refer to the basic fields on the person tab. Users can always view these fields (see screenshot).

Base fields are vital. It does not make sense to hide these fields for specific users.

Each of the above-mentioned authorizations opens the HR master.

If necessary, you can also combine authorizations. Assign the following authorizations if a user is allowed

to:

- add, edit and delete data and

- to view/edit the fields of the tabs person and personal data:

pers.create

pers.edit

Configuration_Separate_rights_for_HR_master_data.docx  Version: 1.0.11448                                  Page
2 of 3

                                                            Function authorizations for HR master data tabs

pers.delete

pers.person

pers.pd

The fields of the "additional information" tab are user fields and do not depend on the logic described here.

You can use responsibility areas in the configuration of HR master fields to specify for each user field if it

should be visible or not.

Use  an  INI  configuration  to  release  this  modification.  Installing  the  service  pack  that  includes  this  new

modification can result in a breaking change,  i.e.  the  modification changes the  processing of previously

assigned function authorizations. Using an INI configuration to activate the modification makes sure that

you are aware of the effects of this modification and you want to use these function authorizations on tab

level.

1.1

INI configuration

Menu

System administration  System settings  INI configuration

Transaction code

Inicfg

Function authorization

inicfg.*

 Configure the settings of the INI data configuration as follows:

INI name
Section
Key
Value

PERSONS
AUTHORIZATION
TAB
ON

Configuration_Separate_rights_for_HR_master_data.docx  Version: 1.0.11448                                  Page
3 of 3


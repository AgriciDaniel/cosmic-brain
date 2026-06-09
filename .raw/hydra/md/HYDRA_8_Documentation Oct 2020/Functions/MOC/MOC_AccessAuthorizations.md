Access Authorizations

1  Access Authorizations

Overview

Menu

Master Data  Access Control  Access Profiles  Access Authorizations

Transaction code

acau

Function authorization

acau

Access authorizations are defined for access profiles by assigning access groups and the corresponding

access time model.

Field Descriptions

Valid from, valid until

The  field  for  the  validity  start  date  of  an  access  authorization  has  always  to  be  filled  out,  but  the

field for the validity end date may be empty. In this case, the access authorization is valid without

any restriction.

MOC_AccessAuthorizations.docx

Version: 1.1.2537

Page 1 of 2

Access Authorizations

Office unlocked

This  option  specifies  whether  or  not  the  badge  may  unlock  the  accesses  of  the  entered  access

group. Offices can only be unlocked during access time periods coinciding with the  opening hours

of the access group and for which the option "office unlocked" is enabled.

The  “office  unlocked”  field  is  only  available  if  the  license  for  "advanced  access  control"

(ZKS-EZK) or the “connection of offline components” (ZKS-SOK) is available.

The  "office  unlocked"  function  is  only  processed  at  terminals  with  the  terminal  program

AIP and/or ctwin if the upgrade TNR-OUL is enabled.

Bag check

This option defines whether or not a possibly configured bag check/search is to be carried out for

people opening an access due to this access authorization. This option allows for a bag check to be

suppressed for certain people.

The “bag check” field is only available if the “personnel checking” license (ZKS-PKT) is active.

MOC_AccessAuthorizations.docx

Version: 1.1.2537

Page 2 of 2


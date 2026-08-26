CardLink

1  CardLink

1.1  Overview

When using KABA offline components (electronic door mountings and digital cylinders), CardLink allows

for loading authorizations  onto the badge by  using the terminal program AIP  or ctwin  at  PZE terminals.

The advantage of this is that in the event of changes to the authorizations, it is not necessary to load the

authorizations onto the affected components on site.

When clocking at a  PZE terminal,  the authorizations  on the  badge are  automatically  "validated".  A  time

stamp  is  updated  on  the  badge,  and  the  authorizations  on  the  badge  are  subsequently  valid  for  the

validation period set in B-COMM. Typically, this period is set to approx. 16 hours, so that there will not be

any  valid  authorizations  in  the  course  of  the  next  day  for  lost  badges  deactivated  in  HYDRA,  and

authorizations also can no longer be validated or loaded at the PZE terminal.

If the PZE terminal detects that the authorizations on the badge are no longer valid, the employee will be

informed at the PZE terminal that new authorizations are available and should be loaded onto the badge.

As  for  the  following  changes,  the  system  will  recognize  that  the  authorizations  for  offline  components

have changed:

  Change in access profile

A  change  in  the  access  profile  affects  all  badges  to  which  this  access  profile  is  assigned,

provided this change affects an access group which includes offline components.

  Change in access profile assignment

If  the  access  profile  assignments  for  a  badge  change  and  an  access  configured  as  an  offline

component is affected by this.

  Change in validity period of a badge

If  the  validity  period  of  a  badge  was  changed  or  the  badge  is  deactivated.  This  may  also  be

initiated by a change of the badge number or the date of leaving in the HR master data.

If  several  versions  with  interrupted  validity  periods  exist  for  a  badge  in  HYDRA,  the

authorizations are only written onto the badge until the end of the current validity period. Upon

expiry of this validity period, the employee is requested to reload the authorizations at the PZE

terminal.

1.2  Requirements

The use of CardLink requires memory space on the badge. Legic badges require a separate segment.

A Legic badge must be structured as follows:

OfflineComponentsCardLink.docx

Version: 2.0.18468

Page 1 of 8

CardLink

-  The badge must have two segments: The standard PZE/ZKS access segment and the CardLink

segment.

-  Each segment must have its own, unambiguous search string.

-  The  first  segment  is,  by  definition,  the  standard  PZE/ZKS  access  segment  with  search  string  +

badge data (standard MPDV segment). For this segment, reading access only is required.

-  The second segment is the CardLink segment. This segment must have sufficient memory space

and allow for both reading and writing access.

At present, CardLink is only available for Legic badges (Legic Prime and Legic Advant).

In addition, a special write-capable reader is required at those PZE terminals where authorizations are to

be  written  on  the  badge.  This  is  a  new  LEGIC  Advant  write-capable  reader  (with  "LGA"  in  the  MPDV

product description; example: 382-ILGAL).

1.3  Memory requirements on the legic badge

The required size of the segment is calculated according to the following formula:

10 bytes + 10 bytes x number of authorized access groups

If a badge is authorized  for offline components,  which are categorized in 5  different access groups, the

memory space requirement is:

10 bytes + 10 bytes x 5 = 60 bytes

If  the  badge  is  authorized  for  an  access  group  for  several,  interrupted  periods,  another  10  bytes  are

added for each period.

The  required  memory  space  for  authorizations  has  an  effect  on  the  duration  needed  to  write

authorizations:  Approx.  1  second  is  needed  for  each  100  bytes.  For  this  reason,  you  should

attempt to summarize the offline component accesses in as few access groups as possible.

1.4  Updating authorizations at the PZE terminal

The PZE terminals load the authorizations for offline  components in a cycle of 5 minutes, so that these

authorizations can also be validated and/or loaded in  the offline case. This cycle duration can  be set in

seconds  in  the  configuration  file  hytnrcfg.ini  for  terminals  with  the  terminal  program  AIP,  and  in  the  file

hytnrcfg.bsp for terminals with the terminal program ctwin, respectively:

[ CARDLINK.LST ]

loadtime=300

OfflineComponentsCardLink.docx

Version: 2.0.18468

Page 2 of 8

1.5  Writing authorizations at the PZE terminal

The  authorizations  of  a  person  are  written  on  the  badge  at  the  PZE  terminal  by  using  one  of  the  4

CardLink

absence reason buttons.

Required program statuses:

Terminal program

drv_crypt.dll

ctwin.exe

ctaip.exe

Versions

V# 2.0.0.2

V# 7.2.7.19

V# 2.0.3.7

.\packets\pzezks72.dll

V# 2.0.1.22

1.5.1

Terminal configuration at the console

The CardLink function is configured in the terminal configuration in the tab "HR functions". The writing of

authorizations on the badge can be configured with the "Absence reason" CL and an appropriate text on

an absence reason button.

1.5.2

Terminal configuration

For  writing  on  badges,  a  reader-specific  DLL  has  to  be  configured  at  the  terminal.  At  present,  the

following DLL are available:

DLL

Description

drv_crypt.dll

Driver for LEGIC Advant reader (e.g. 382-ILGAL, CTB-LGALU, CT-
LGALTU)

The  configuration  is  performed  at  the  terminal  in  the  file  ctaip.ini  for  AIP  terminals,  and  in  the  file

ctwin.ini for terminals with the ctwin terminal program, respectively.

Driver activation (x stands for the number of the serial interface):

[COMPORTS]

COMx=drv_crypt

Activating the CardLink functionality:

[COMPORTS-PARAM]

DRV_CRYPT-PARAM=SETTINGS=CL|

Customer-specific configuration (example):

[COMPORTS-PARAM]

DRV_CRYPT-PARAM=SETTINGS=CL|SEARCHSTRING=2C2D2E000000|STARTADDRESS=6|

OfflineComponentsCardLink.docx

Version: 2.0.18468

Page 3 of 8

CardLink

Depending on the structure of the badges used, a customer-specific configuration may also be required.

Primarily,  this  includes  settings  for  the  CardLink  segment:  search  string,  segment  size  and  data  start

address.

These settings have an impact on the reader behavior. These entries should be made carefully,

since  they  have  an  effect  on  the  overall  behavior  of  the  CardLink  application.  Adaptations

should only be made after consultation with MPDV.

The parameters described below can be set within the parameter string "DRV_CRYPT-PARAM" in order

to  implement  the  customer-specific  configuration.  If  several  parameters  are  used,  they  are  to  be

separated by "|" (Pipe).

Parameter

SEARCHSTRING

STARTADDRESS

Description

Search string of the CardLink segment

The default is "2C2D2E000000"

This indicates the start address on the badge

within the access segment. Usually immediately

behind the search string.

Example: The entry 3 corresponds to the fourth

byte as start address (counting starts at 0). The

authorizations are consequently written as from the

fourth byte.

The default value is 6.

OfflineComponentsCardLink.docx

Version: 2.0.18468

Page 4 of 8

1.5.3  Process at the terminal

New rights are available for a badge:

CardLink

The function "Load authorizations" is selected via the relevant function key.

Please note:

The screenshots show the display of the AIP terminal when loading authorizations on a

badge. The display at CTWIN is comparable in terms of the contents.

OfflineComponentsCardLink.docx

Version: 2.0.18468

Page 5 of 8

The following note is displayed when authorizations are written on a badge:

CardLink

After the successful writing of authorizations, the note is closed and successful processing is indicated as

follows, as when clocking:

OfflineComponentsCardLink.docx

Version: 2.0.18468

Page 6 of 8

In the case of an error, a message window opens, which can be closed by selecting "OK". The contents

depend on the error occurred.

CardLink

Possible errors are:

Error

Description

-11008

DRV_TREIBER_ERROR_WRITEDATA
Error while writing the badge data.
Possible causes:

-11009

-11010

-  Badge removed from reader during writing.
-  Badge does not have sufficient memory space.
-  Communication with reader and/or badge disrupted.

DRV_TREIBER_TIMEOUT_WRITEDATA
Timeout while writing the badge data.
Possible causes:

-  Communication with reader and/or badge disrupted.

DRV_TREIBER_WRITE_VAL_ERR
Error during validation of badge.
Possible causes:

-  Badge removed from reader during writing.
-  Communication with reader and/or badge disrupted.

-11011

DRV_TREIBER_WRITE_DEVAL_ERR
Error during invalidation of badge.
Possible causes:

-  Badge removed from reader during writing.
-  Communication with reader and/or badge disrupted.

-11013

DRV_TREIBER_WRITE_DATA_SEG_TO_SMALL_VALID
The data to be written does not fit into the CardLink segment.
Possible causes:

OfflineComponentsCardLink.docx

Version: 2.0.18468

Page 7 of 8

CardLink

-  The CardLink segment is too small.
-  Authorizations have to be optimized.

-11014

DRV_TREIBER_WRITE_DATA_SEG_TO_SMALL_NOT_VALID
The data to be written does not fit into the CardLink segment.
Possible causes:

-  The CardLink segment is too small.

Authorizations have to be optimized.

OfflineComponentsCardLink.docx

Version: 2.0.18468

Page 8 of 8


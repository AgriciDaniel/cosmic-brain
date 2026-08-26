AIP2 - Central Configuration File hytnrcfg.ini

1  AIP2 - Central Configuration File hytnrcfg.ini

You can use this file as central place to store different configurations for all or for separate terminals.

For each section, a general version is available

[section 0].

The  entries  included  in  this  section  can  be  overwritten  by  entries  in  a  terminal-specific  section

[section <TNR-USER>]

 <TNR-USER> = UserNo = terminal number + 2000 e.g. 2010,2101,..) for exactly one terminal/UserNo

The file hytnrcfg.ini is loaded from the server on every terminal start.

Section / Entry

Comment



[Tnr Konfiguration 0]

FollowExternStatus=on

[Terminal->Installation 0]

InstallFonts=on

OnlyInstallFontsAfterDownload=fal
se

[Terminal->USR 0]

Transfer of machine statuses when reloading machine list.
Useful if status change is set by PDM or another terminal

If set to "off", fonts are not installed during restart.
ON=DEFAULT

If “InstallFonts=on”:
If  true,  then  fonts  are  only  installed  directly  after  a
download.  If  false,  then  fonts  are  installed  every  time  the
terminal is restarted.
(false = DEFAULT)

AIP2_Configuration_hytnrcfg.docx

Version: 1.8.21493

Page 1 of 6

AIP2 - Central Configuration File hytnrcfg.ini

Section / Entry

Comment

AttachedApplication=First

Displaying  documents  of  OP  info: With  this  configuration,
the  system  first  checks  whether  or  not  an  application  is
linked  in  Windows  that  matches  the  file  extension  of  the
document.  This  application  is  then  used  to  display  the
document.
If no link is available, the viewers configured in ctaip.ini (
[ext.  software])  and  internal  viewers  are  used.  If  an
extension  is  completely  unknown,  the  system  tries  to
display the document as text .
Different settings are possible:

First  search for linked application first

AfterUserViewer    If  a  UserViewer  is  configured,  this
one  overrides  the  linked  application  (also  applies  to
ExcelViewer, WordViewer and PowerpointViewer)

Last  Only if no ctaip.ini assignment is found for the file
extension,
linked
application (default).

the  system  searches

for  a

then

HTTPBrowser=standard

Off    The  system  does  not  search
application.

for  a

linked

Display of documents (via OP info):
If documents are configured with a path of schema "http",
the  file  is  not  downloaded  to  the  terminal,  but  the  link  is
transferred to a browser.
The  default  browser  for  the  terminal  is  htmview3.exe,  as
this one can be operated by touchscreen.
If  this  entry  is  set,  the  default  browser  configured  in
Windows is used.

SupressErrorMessage=70012

Suppress message "material is not planned"

MSS_DIALOG=10

MSS_FILEAGE_MIN=5
MSS_FILEAGE_OVERTIME=delete

[SignatureRecording->User 0]

ManualBadgeInput=true

If  the  terminal  is  switched  off  longer  than  15  minutes,  a
dialog is displayed on terminal restart. The user must then
decide  whether  the  counter  pulses,  which  were  recorded
when  the  terminal  was  closed,  are  posted  or  discarded.
After  a  configurable  period  of  time,  the  dialog  closes
automatically with "Yes" (Yes, posting of pulses).
This  value  configures  the  time  in  seconds  the  dialog  is
open.

If the backup file for counter pulses on the terminal is older
than 5 minutes, then no dialog is opened and the backup
file  deleted.  Quantities  recorded  at  the  time  when  the
terminal was closed are not used/posted.

This  configuration  specifies  whether  or  not  the  field  User
can be edited on the terminal (by default: no editing)
true    activates  keyboard  input  for  field  User  on  the
terminal

AIP2_Configuration_hytnrcfg.docx

Version: 1.8.21493

Page 2 of 6

AIP2 - Central Configuration File hytnrcfg.ini

Section / Entry

Comment

Transparency=255

ShowPosition=TR

USE_SERVICE_ACCOUNT=1

SIGNATURE_1_USER_TYPE=REPORTING_U
SER_READONLY

the  signature  dialog  can  also  be

The  display  of
transparent.
255    Signature  dialog  is  0  %  transparent  (not
transparent)
1    Signature  dialog  is  99%  transparent  (maximum
transparency)
(Default = 155)

Top – Left
Top – Middle
Top – Right
Middle – Left

You can change the place of the signature dialog:
TL
TM
TR
ML
MM  Middle – Middle (Default)
MR
BL
BM
BR

Middle – Right
Bottom – Left
Bottom – Middle
Bottom – Right

0  (default)  SSO:  ServiceAccount
is  not  used
(requirement: the terminal must be started with the domain
"user" (SSO)).
Note: ServiceAccount=1 can only be used if all users are
in the "root" domain. SubDomain users are not supported.

REPORTING_USER_READONLY

identification  using

the  Windows  user

The  user
is
activated.  The  Windows  user  is  then  preassigned  in  field
User. The User field is read-only.
Requirement:  The  "SSO"  option  must  be  enabled  for  all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

REPORTING_USER_CHANGEABLE

identification  using

the  Windows  user

The  user
is
activated.  The  Windows  user  is  then  preassigned  in  field
User. The User field can be edited.
Requirement:  The  "SSO"  option  must  be  enabled  for  all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

AIP2_Configuration_hytnrcfg.docx

Version: 1.8.21493

Page 3 of 6

AIP2 - Central Configuration File hytnrcfg.ini

Section / Entry

Comment

SIGNATURE_1_LOGON_TYPE=HYDRA

“” / Not set / “EMPTY”

There is also an alternative login procedure.

HYDRA

The user identification using the Windows user is locked.
You must enter a user for identification.
Requirement: All reporting persons must have been
created as users and the option "SSO" must not be
enabled for the users. Otherwise, successful
authentication is not possible.

ACTIVEDIRECTORY

The TAB for the user identification via User is locked. The
Windows user must be used for identification purposes.
Requirement: The "SSO" option must be enabled for all
reporting users. Otherwise, successful authentication is
not possible.

MIXED_BUT_UNIQUE
The  setting  of  option  "SSO"  specifies  whether  the  user
login or the Windows login is used.

"SSO" enabled  Windows only
"SSO" disabled  user only

Identical  to  SIGNATURE_1_LOGON_TYPE  (see
above)

Used  for  signatures  on  the  terminal  with  quality  data
collection.

Configuration of the files that are provided from the AIP to
the  MDEB2  blade  in  ANSI  format  when  a  combined
operation is available.

The following lists are transferred by default if the entry is
not available.
counters.lst|schicht.lst|mnr.lst|mstat.lst|
anr.lst|pnr.lst

If  you  want  to  transfer  further  lists,  you  must  specify  the
standard lists and the additional lists.

SIGNATURE_2_LOGON_TYPE=HYDRA

ExtendedSignatureRecording=true

[MDE/Blade Configuration 0]

CONVERT-TO-ANSI-
FILE=<list1|list2>

1.1  Layout configuration

Entry

Comment

Section
and/or

[terminal configuration 0]
[terminal configuration 2XXX];

( general configuration )
( 2XXX terminal-specific configuration )

AUTO-CONFIRM-UHR-ERROR-
MESSAGE=TRUE

This setting specifies that in case of an error that occurred
reading  the  clock  (e.g.  when  activated  after  standby

AIP2_Configuration_hytnrcfg.docx

Version: 1.8.21493

Page 4 of 6

AIP2 - Central Configuration File hytnrcfg.ini

Entry

Comment

mode), the time is transferred  without confirmation  dialog
and the terminal time is later synchronized with the server
time via PDM command.

SUPPRESS-MAXIMUM-NUMBER-OF-
MACHINES-WARNING=ON

CalcTargetYieldSinceLogon=2

Suppresses  the  warning  after  restart  of  terminal  if  more
than  32  machines  are  assigned
terminal
(static/dynamic). (Default=OFF)
CalcTargetYieldSinceLogon=1
The  duration  is  calculated  from  the  total  runtime  since
login (all statuses) minus the configured shift breaks.

the

to

CalcTargetYieldSinceLogon=2
The duration is calculated from the total runtime since
login (all statuses). Defined breaks are not used and are
not deducted. (default value)

Section
[ QRD-PRINTER->TICKET 0 ]
[ QRD-PRINTER->TICKET 2xxx ]

;( general configuration )

;( 2XXX configuration for a specific terminal )

COMPLETE-ABSENCE-OF-LOCAL-MNR-
DATA-FOR-EVENT=< Events >

COMPLETE-ABSENCE-OF-LOCAL-ANR-
DATA-FOR-EVENT=< Events >

COMPLETE-..-EVENT=< Events >
COMPLETE-..-EVENT=#ALL#

COMPLETE-..-EVENT=A_AN|A_P_AN

Reloads the machine row for the configured <Events>, if
it is not available locally
  This  configuration  might  be  required  for  a  group
workplace without machine assignment.

Reloads the order row for the configured <Events>, if it
is not available locally
  This  option  has  been  implemented  to  access  order
data in the master data, e.g. when logging on orders.

Explanation on the configuration of <Events>
  Using  <#ALL#>  the  row  (ANR/MNR)  that  is  not
available is reloaded for any event.
   <A_AN|A_P_AN>  restricts  reloading  of  information  to
specified events. The ID <DLGFAM> is preferred to the ID
<DLG> in order to identify the <Event>.

Section
[AIP2 Initialization 0]

XML-GUI=OFF

CTWIN-STYLE=ON

CTWIN-BUTTON-LAYOUT=ON

AUTOMATIC-CHANGE-TO-START-
DISPLAY=30

Disables  the  new  AIP2  design  and  uses  the  AIP  8.1
design.

Activates  the  GUI  that  is  similar  to  CTWIN  on  the  AIP2.
The two button bars are shown below the two lists just like
on the AIP 8.1.

If  the  option  CTWIN-STYLE=ON  is  additionally  set,  the
two button bars are displayed at the bottom of the screen.

to

the  main  view  after

As  of  AIP  8.2.2.28:  If  this  option  is  set,  the  display
automatically  changes
the
configured  time  if  no  other  interaction  was  performed  in
the meantime.
The  changing  display  is  configured  via  the  option  Show
machine/OP
tab  MF
functions.

the  Terminal  configuration,

in

  List:

o  Change  from  the  detail  views  or  function  menus

(operation, person, resource, etc.)

AIP2_Configuration_hytnrcfg.docx

Version: 1.8.21493

Page 5 of 6

AIP2 - Central Configuration File hytnrcfg.ini

Entry

Comment



o  Change to the main view with "tiles"
Icons:
o  Change from the detail views or function menus or

from the main view with tiles

o  Change to the icon view of workplaces

The  configuration  is  specified  in  seconds.  Do  not  specify
less than 10 seconds.
An automatic change to the start screen is not made if an
input dialog is open.

AIP2_Configuration_hytnrcfg.docx

Version: 1.8.21493

Page 6 of 6


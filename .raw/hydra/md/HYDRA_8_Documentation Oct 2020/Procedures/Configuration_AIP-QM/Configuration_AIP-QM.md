Configuration AIP-QM

1  Configurations of the AIP Inspection Data Collection

Purpose

You  use  this  documentation  if  you  want  to  change  the  default  behavior  of  the  AIP  inspection  data

collection according to the customer's processes using the available configuration options.

Requirements

You require the active license AIP-CAQ and you use the AIP inspection data collection with AIP 8.1 or AIP

8.2.

The  functions  that  are  only  available  from  a  specific  version  or  service  pack  onwards  are  identified  as

such.

Storage of custom configuration files

The following folders on the HYDRA server contain INI configuration files.

 or









.\ctnet\win\aip2\functions

.\ctnet\win\aip2\packets

.\ctnet\win\aip\functions

.\ctnet\win\aip\packets

You  can  change  each  of  the  INI  files  in  these  folders  according  to  the  customer's  requirements.  The

configurations  can  be  changed  for  all  terminals,  for  terminal  groups  or  for  a  specific  terminal.  If  you

change an INI file, store the file in the  following structure. The customer-specific storage is specified via

the file "caq_dc_t.ini" of folder ".\functions".

Folder of the default file "caq_dc_t.ini" for AIP 8.2:

.\ctnet\win\aip2\functions\caq_dc_t.ini

Folders of customer-specific storage.

Configuration for all terminals:
Configuration for terminal group 999:

.\1\custom\aip2\functions\caq_dc_t.ini
.\1\custom\aip2\functions\tgrp_999\caq_dc_t.ini

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 1/70

Configuration for terminal 702:

.\1\custom\aip2\functions\tnr_702\caq_dc_t.ini

Configuration AIP-QM

Folder of default file "caq_dc_t.ini" for AIP 8.1:

.\ctnet\win\aip\functions\caq_dc_t.ini

Folders of customer-specific storage.

Configuration for all terminals:
Configuration for terminal group 999:
Configuration for terminal 702:

.\1\custom\aip\functions\caq_dc_t.ini
.\1\custom\aip\functions\tgrp_999\caq_dc_t.ini
.\1\custom\aip\functions\tnr_702\caq_dc_t.ini

The  custom  INI  files  may  only  contain  the  changed  sections.  The  sections  are  identified  via

square brackets.

2  Configuration file "ctaiplay.ini"

Below, the sections of the configuration file "ctaiplay.ini" are listed, which have a specific behavior.

Section

Description

Other

Layout or

functional?

[QM-Maschinenliste]

Display  of  machine  list

When a terminal is configured with the

Layout

with  information  on  the

option  "Operated  as  CAQ  terminal",

inspection due date.

the  content  of  the  machine  list  in

section

"[QM-Maschinenliste]"

is

configured. If a terminal is operated as

CAQ  terminal,  there  is  no  alternative

section  for  the  configuration  of  the

machine list.

[QM-Auftragsliste]

Display  of  order  list  with

When a terminal is configured with the

Layout

information

on

the

option  "Operated  as  CAQ  terminal",

inspection due date.

the  content  of  the  order  list  in  section

"[QM-Auftragsliste]"  is  configured.  If  a

terminal is operated as CAQ terminal,

there  is  no  alternative  section  for  the

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 2/70

Configuration AIP-QM

configuration of the order list.

[PAGER-QM_ERRORS]

Functional settings in the

The entries

functional

inspection

Fieldpager

chart

-

-

LabelColumn

IDCOLUMN

are  static  and  are  written  to  the  file

"ctaiplay.ini" at runtime.

The entries

-

-

FILE

FILTER

are  dynamically

identified  and  are

written

to

the

file  "ctaiplay.ini"  at

runtime.

Background: If an analysis selection

catalog is available, a different file and

a different filter are set than in case of

standard processing without analysis

selection catalog.

WARNING!

The  dynamic  identification  will  include

an entry like

<AFO=MM.AFO>

in the filter. In order to be able to insert

the  current  value  for  "MM.AFO",  a

forced  field  must  be  added  to  the

dialog.

3  Configuration file "caq72.ini"

3.1  Section [SYSTEM]

[SYSTEM]

Section for settings of system parameters

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 3/70

MOD:NOABGPPKT=[0/1]

This  setting  specifies  if  only  open  inspection  points  are

Configuration AIP-QM

uploaded to the terminal or if completed inspection points

are additionally integrated.

If  you  additionally  integrate  completed  inspection  points,

this  can

lead

to  significant

losses

in  performance

because  there  are  umpteen  times  more  completed

inspection  points

than  open

inspection  points.

This flag should be co-ordinated with CAQ consulting and

CAQ software development.

Default  1

Example

MOD:NOABGPPKT=0

In  this  example  configuration,  open  and  completed

inspection points are requested from the server.

MOD:PPKTAKTMASCH=[0/1]

If  both  parameters  are  populated,  only  the  respective

data  of  the  inspection  points  is  returned  that  include  the

machine  number  transferred  by  AKTMASCH  into  the

machine  field  of  the  inspection  point  or  the  data  of  the

inspection points is returned that do not have any entry in

this  field  (inspection  point  can  be  examined  at  all

workplaces).

Default  1

Condition

MOD:NOABGPPKT=1

3.2  Section [MDI]

[MDI]

Section to set up the MDI parameters

SUPPRESS_LICENSE_HYD-MDI=[ON/OFF]  Using this flag, you can disable a HYD-MDI license that is

available on the terminal.

This was a request from the consulting. The requirement

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 4/70

Configuration AIP-QM

was  to  enable  superstructures  with  or  without  MDI

without having to manipulate the Lizenz.lst..

Default  OFF

Example

SUPPRESS_LICENSE_HYD-MDI=OFF

The HYD-MDI license is suppressed on the terminal. The

typical functions are therefore not carried out. The GUI is

also built up without consideration of MDI elements.

Note

If  the  HYD-MDI  license  is  not  available,  the  flag  is

ineffective.

3.3  Section [LIST_REQUEST_LOAD_CYCLE]

[LIST_REQUEST_LOAD_CYCLE]

Section to configure the update of CAQ lists

Availability:

AIP 8.1 caq72.dll as of version 2.0.2.41

AIP 8.2 caq72.ddl as of version 8.2.0.9

MERKOPTIONEN=3600

The value entered is the waiting time in seconds until the

option

list

is

reloaded

the

next

time

(file:

merkoptionen.lst).  If  the  parameter  is  not  set  or  empty,

the default value is 3600.

TERMCONFIG=3600

The value entered is the waiting time in seconds until the

terminal  configuration

list  (file:

terminalconfig.lst)

is

reloaded  the  next  time.  If  the  parameter  is  not  set  or

empty, the default value is 3600.

3.4  Section [QUEUE_MODE_QM]

[QUEUE_MODE_QM]

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 5/70

Configuration AIP-QM

REFRESH_AT_RETURN=[YES,NO,ASK]

When you exit queue mode, you can select
=YES
automatically
=NO
not at all
upon request
=ASK
for the refreshing of CAQ data
Default: REFRESH_AT_RETURN=YES

REFRESH_QUERY=ASK

Message text for the query with REFRESH_QUERY=ASK

3.5  Section [LanguageSwitch]

[LanguageSwitch]

SkipDataReCalc=[ON,OFF]

To  avoid  long  waiting  times,  you  can  suppress  the

changing of languages for the QM sector.

You  can  enable  this  option  at  runtime;  a  restart  is  not

necessary.

Default: SkipDataReCalc=OFF

MODE=[1,2]

Use  this  parameter  to  define  the  mode  for  changing  the

language.

MODE=1:

Only the MDBI fields of the lists are translated. With this

mode,  the  data  that  is  already  loaded  in  the  CAQ  is  not

translated.  Different  languages  can  therefore  be  shown.

For example the characteristic designation/name

MODE=2:

The  complete  CAQ  data  structure

is

reloaded.

WARNING!  With  this  mode,  it  is  possible  that  the  data

displayed  is  not  identical  to  the  actual  data.  This

difference  is  possible  when  the  terminal  is  offline,  for

example.

Default: MODE=1

Requirements:



caq72.dll version 8.2.0.12 or higher

  AIP 8.2

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 6/70

Configuration AIP-QM

3.6  Section [OPTIONS]

[OPTIONS]

MNR_REFRESH_NEW_METHOD=[ON,OFF]

The inspection status and inspection time of the machine

list are immediately updated on the main view of the AIP

terminal  when  an  OP  including  CAQ  inspection  order  is

logged off or interrupted.

Requirement: The OP is logged off or interrupted directly

on the terminal (not on the MOC).

Default: MNR_REFRESH_NEW_METHOD=ON

Requirements:



caq72.dll version 2.0.2.24 or higher

  Terminal restart

3.7  Section [DATACONTEXT_GOODS_RECEIPT]

[DATACONTEXT_GOODS_RECEIPT]

Configurations for inspection mode "Goods receipt"

Requirements:

  AIP 8.2 with tile view







caq72.ddl in version 8.2.07 or higher

caq_dc_t.dll in version 8.2.0.15 or higher

ctaip.exe in version 8.2.0.ww or higher

  License AIP-EQD

DATAPROVIDER_ID

ID

of

the

data

provider

according

to

.\gui\globaldefines.xml

Default: DATAPROVIDER_ID= PAUMNR

LOADCYCLE

List update cycle

Default: LOADCYCLE=600

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 7/70

Configuration AIP-QM

LIST

List that is requested

Default: LIST=u_l_caq_inspstep_tnr

3.8  Section [DATACONTEXT_CALIBRATION]

[DATACONTEXT_CALIBRATION]

Configurations for inspection mode "Calibration"

Requirements:

  AIP 8.2 with tile view







caq72.ddl in version 8.2.07 or higher

caq_dc_t.dll in version 8.2.0.15 or higher

ctaip.exe in version 8.2.0.ww or higher

  License AIP-EQD

DATAPROVIDER_ID

ID

of

the

data

provider

according

to

.\gui\globaldefines.xml

Default: DATAPROVIDER_ID= PAUMNR

LOADCYCLE

List update cycle

LIST

List that is requested

Default: LOADCYCLE=600

Default: LIST=u_l_caq_inspstep_tnr

3.9  Section [DATACONTEXT_LAB]

[DATACONTEXT_LAB]

Configurations for inspection mode "Goods receipt"

Requirements:

  AIP 8.2 with tile view







caq72.ddl in version 8.2.07 or higher

caq_dc_t.dll in version 8.2.0.15 or higher

ctaip.exe in version 8.2.0.ww or higher

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 8/70

Configuration AIP-QM

  License AIP-EQD

DATAPROVIDER_ID=

ID

of

the

data

provider

according

to

.\gui\globaldefines.xml

Default: DATAPROVIDER_ID= PPKTMNR

LOADCYCLE=

List update cycle

LIST=

List that is requested

Default: LOADCYCLE=600

SECTION=

Default: DATACONTEXT_LAB_INSP_PT_MATURITY

Default: LIST=u_l_caq_insppoint_tnr

3.10  Section [DATACONTEXT_LAB_INSP_PT_MATURITY]

[DATACONTEXT_LAB_INSP_PT_MATURITY]

PPKT:ANLDAT=

PPKT:ANLZEI=

Default: PPKT:ANLDAT=dd.mm.yyyy,1,L

Default: N,1,R

4  Configuration file "caq_async.ini"

You can optionally enable this function for each terminal/terminal group. Effect: The communication from

HYDRA server to AIP terminal is reduced.

As soon as the measured values/attributive inspection results are confirmed on the AIP, the inspector can

enter  other  inspection  data.  With  this  mode,  the  inspection  data  processing  is  not  confirmed  and  the

results  of  the  processing  are  not  displayed.  For  example:  If  operated  in  this  mode,  the  posting  of

automatically generated failure types is stopped.

The process of data collection is therefore shorter. When a measured value is confirmed, the input dialog

of the next measured value is opened immediately.

Enable the function using the INI file "caq_async.ini" in the AIP sub folder "functions". In order to activate

the function, the following entry must be available in the INI file:

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 9/70

Configuration AIP-QM

[SYSTEM]

ENABLE_ASNYC=ON

Disable  the  function  using  the  parameter  "OFF".  If  the  file  or  the  respective  entry  is  not  available,  the

function is disabled.

The function is available as of Service Pack 8 for the program versions AIP 8.1 and 8.2.

5  Configuration file "caq_dc_t.ini"

If the configuration file caq_dc_t.ini is changed, the changes become immediately effective

when the inspection data collection is called.

5.1  Section [SYSTEM]

[SYSTEM]

Section for general settings

SCALE_FACTOR_INSPECTIONLIST=
[0-100]

Flag  for  scaling  the  GUI  of  the  inspection  list/input  area  in

case of a screen ratio of 16:9 (relating to the AIP display).

Default    5

The  greater  the  value,  the  smaller  the  display  area  for  the

“inspection  list”  and  the  greater  the  display  area  for  “input

functions”.

The

value

can

be

changed

at

runtime.

Effective once the “inspection list” is opened the next time.

EXAMPLE
SCALE_FACTOR_INSPECTIONLIST=20

LABELS_TREE=[ON/OFF]

Setting  whether  or  not  a  label  is  to  be  displayed  for  each

If  the  function  "expanded  view  of  quality  data"  (license  AIP-
EQD) is enabled, this parameter is inactive.

entry in the inspection list.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 10/70

Configuration AIP-QM

Default  ON

Examples

LABELS_TREE=ON

to display labels for every entry

LABELS_TREE=OFF

Hide labels of the complete inspection list.

HIGHLIGHT_TREE=[ON/OFF]

Setting  whether the active  branch  is  to  be  highlighted or not

in the inspection list.

Default  ON

Examples

HIGHLIGHT_TREE=ON

The font color of the active branch is black. The font color of

the other inspection list entries is light gray.

HIGHLIGHT_TREE=OFF

Font color of the entire inspection list is black.

INFO

Color design cannot be configured.

AUTONAVIGATION=[ON/OFF]

Settings

to  enable  or  disable  autonavigation  between

inspection elements.

Default  ON

Example

AUTONAVIGATION=ON

The  autonavigation  between  inspection  elements  is  active.

The  rules  of  the  corresponding  collection  sequences  are

valid.  Note:  There  are  also  other  configuration  possibilities.

AUTONAVIGATION=OFF

The  autonavigation  between  inspection  elements  is  NOT

active.

The  user  is  responsible  for  the  selection  of  the  inspection

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 11/70

Configuration AIP-QM

elements within the inspection list.

 See explanation in section [AUTONAVIGATION]

CREATE_CHARTS_ALWAYS=[ON/OFF]

Allow  or suppress the generation of charts.  If the terminal is

operated  in  demo  mode,  existing  charts  are  used  in  the

display and data is not retrieved from server.

Default  ON

Example

CREATE_CHARTS_ALWAYS=OFF

The  example  configuration  is  very  useful  in  the  demo  mode

as it shows specific pre-built graphics. Data is not requested

from the server.

This  section  is  used  to  deactivate  the  entry  of  the  inspector

without  removing  the  field  Inspector  from  the  relevant  input

dialogs.

5.2  Section [KNR]

[KNR]

DO_CHECK_KNR=[ON,OFF]

You  can  use  this  parameter  to  deactivate  the  entry  of  the

inspector  without  removing  the  field  Inspector  from  the

relevant input dialogs.

Subject  to  the  configuration  of  option  1130,  the  badge

number can be checked/validated by the server. In this case,

the parameter "DO_CHECK_KNR“ must not be set to "OFF“.

When  you  change  the  dialog  configuration,  you  must  not

remove  the  field  Inspector.  The  field  Inspector  can  only  be

removed via customization.

5.3  Section [FONT_VIRTUALSTRINGTREE]

[FONT_VIRTUALSTRINGTREE]

Section

to  configure  settings

for

the

inspection

list

components.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 12/70

DefaultNodeHeight=<Wert>

Definition  of  the  height  of  an  inspection  list  element.  This

setting is independent of the scaling of the surface.

Configuration AIP-QM

Default  50

Example:

DefaultNodeHeight=45

Note

Changes do not affect the scaling of the graphical element of

the node. It is static.

The  value  can  be  changed  at  runtime.  Effective  when  the

dialog box is re-entered.

5.4  Section [AUTONAVIGATION]

[AUTONAVIGATION]

Section  to  configure  the  behavior  if  autonavigation  between

inspection

elements

is

enabled.

  see  explanation  for  the  parameter  AUTONAVIGATION  in

section [SYSTEM]

EXIT_ON_END_OF_INSP_LIST=

Detailed  setting  to  control  program  behavior  in  case  of  auto

[ON/OFF]

navigation.

This  parameter  controls  the  program  behavior  if  the  search

engine of the auto navigation does NOT find a new element

for an inspection or no inspection point for completion.

Default  ON

Example

EXIT_ON_END_OF_INSP_LIST=ON

If the search function of the auto navigation does NOT find a

further  element  for  inspection  or  no  inspection  point  for

completion,

the  collection  of

inspection

results

is

automatically exited and the user returns to the machine and

order overview.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 13/70

Configuration AIP-QM

EXIT_ON_END_OF_INSP_LIST=OFF

If the search function of the auto navigation does NOT find a

further

inspection  element  or  no

inspection  point

for

completion,  the  system  does  NOT  automatically  change  to

the machine or order list.

CONSIDERED_STATUS=

Optionally,  you  can  include  the  collection  status  of  an

[REQUIRED[~]POSSIBLE[~]READY[~]F

element  in  the  search  for  the  next  element  to  be  selected.

INISHED[~]ERROR]

If  the  collection  status  of  an  element  is  NOT  included  in

Note:  valid  as  of  version

2.0.1.1.

The

previous

configuration is still possible:

CONSIDERED_STATUS,  the  system  assumes

that

the

control

flag  of

the

respective  element

is  set

to

Navigationsrelevant=N.

CONSIDERED_STATUS=

Default  REQUIRED[~]POSSIBLE

[REQUIRED[§]POSSIBLE[§]READY[§]F

Example

INISHED[§]ERROR]

Works as well.

CONSIDERED_STATUS=REQUIRED

Explanation of the collection status:

-  REQUIRED

-  POSSIBLE

-  READY

-  FINISHED

-  ERROR

NAVI_RELEVANCE_PAU=[Y/N]

Configuration of navigation relevance with inspection steps

Default  N

Example

NAVI_RELEVANCE_PAU=N

DESCRIPTION

The  flag  Navigation  relevance  controls  which  elements  are

considered  when  searching  for  the  next  element  to  be

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 14/70

Configuration AIP-QM

selected during auto navigation.

The  elements  are  omitted  in  the  search  function  of  the  auto

navigation if the value N is assigned to the parameter. In this

case, is does not matter how the flag navigation sequence is

set.

If the value Y is assigned to the parameter, the elements are

used in the search function of the auto navigation. Here, the

combination  of  navigation

relevance  and  navigation

sequence is of importance  see also the DESCRIPTION of

the navigation sequence

NAVI_ORDER_PAU=[<empty>/F/L]

Configuration  of  the  navigation  sequence  with  inspection

steps

By default  <empty>

Example

NAVI_ORDER_PAU=

DESCRIPTION

The  flag  navigation  sequence  controls  the  sequence  of  the

selected elements in case of auto navigation.

NAVI_RELEVANCE_PPKT=[Y/N]

Configuration  of  the  navigation  relevance  with  inspection

points

Default  Y

Example

NAVI_RELEVANCE_PPKT=Y

Description

 see explanation NAVI_RELEVANCE_PAU

NAVI_ORDER_PAU=[<empty>/F/L]

Configuration  of  the  navigation  sequence  with  inspection

points

Default  L

Example

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 15/70

Configuration AIP-QM

NAVI_ORDER_PPKT=L

Description

 see explanation NAVI_ORDER_PAU

NAVI_RELEVANCE_SP=[Y/N]

Configuration of the navigation relevance with samples

Default  Y

Example

NAVI_RELEVANCE_SP=Y

Description

 see explanation NAVI_RELEVANCE_PAU

NAVI_ORDER_SP=[<leer>/F/L]

Configuration of the navigation sequence with samples

Default  L

Example

NAVI_ORDER_SP=L

Description

 see explanation NAVI_ORDER_PAU

NAVI_RELEVANCE_ESTCK=[Y/N]

Configuration  of  the  navigation  relevance  with  single-part

evaluation  where  only  one  measured  value  is  collected.

Evaluation based on= [ESTCK_ESTP, ESTCK_MSTP]

Default  Y

Example

NAVI_RELEVANCE_ESTCK=Y

Description

 see explanation NAVI_RELEVANCE_PAU

NAVI_ORDER_ESTCK=[<leer>/F/L]

Configuration  of  the  navigation  sequence  with  single-part

evaluation  where  only  one  measured  value  is  collected.

Evaluation based on= [ESTCK_ESTP, ESTCK_MSTP]

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 16/70

Configuration AIP-QM

Default  F

Example

NAVI_ORDER_ESTCK=F

Description

 see explanation NAVI_ORDER_PAU

NAVI_RELEVANCE_STICHPR=[Y/N]

Configuration  of  the  navigation  relevance  when  evaluating

samples

of

characteristics.

Evaluation based on = [STICHPR_ESTP, STICHPR_MSTP]

Default  Y

Example

NAVI_RELEVANCE_STICHPR=Y

Description:

 see explanation NAVI_RELEVANCE_PAU

NAVI_ORDER_STICHPR=[<leer>/F/L]  Configuration  of  the  navigation  sequence  when  evaluating

samples

of

characteristics

Evaluation based on = [STICHPR_ESTP, STICHPR_MSTP]

Default  F

Example

NAVI_ORDER_STICHPR=F

Description

 see explanation NAVI_ORDER_PAU

NAVI_RELEVANCE_MERK=[Y/N]

Configuration  of  the  navigation  relevance  when  evaluating

characteristics.

Evaluation based on = [MERK]

Default  Y

Example

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 17/70

Configuration AIP-QM

NAVI_ORDER_MERK=Y

Description

 see explanation NAVI_RELEVANCE_PAU

NAVI_ORDER_MERK=[<leer>/F/L]

Configuration  of  the  navigation  sequence  when  evaluating

characteristics.

Evaluation based on = [MERK]

Default  F

Example

NAVI_ORDER_MERK=F

Description

 see explanation NAVI_ORDER_PAU

NAVI_RELEVANCE_GROUP=[Y/N]

Configuration of the navigation relevance with group entries

(e.g.  parts  where  several  measured  values  are  collected,

parts  with  collection

referring

to  a  part,  cavities,

characteristics including the single-part evaluation, etc.).

Default  N

Example

NAVI_RELEVANCE_GROUP=N

Description

 see explanation NAVI_RELEVANCE_PAU

NAVI_ORDER_GROUP=[<empty>/F/L]

Configuration of the navigation relevance with group entries

(e.g.  parts  where  several  measured  values  are  collected,

parts  with  collection

referring

to  a  part,  cavities,

characteristics including the single-part evaluation, etc.).

Default  <empty>

NAVI_ORDER_GROUP=

Description

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 18/70

Configuration AIP-QM

 see explanation NAVI_ORDER_PAU

5.5  Section [ERR_AUTOMATIC]

[ERR_AUTOMATIC]

Section for automatic failure types

This parameter is replaced with the configuration using option

1214.  Valid

from  February  26,  2015.  The  parameter

"ERR_AUTOMATIC"  described  here  only  disables

the

display, but not the server  check and the active message  to

the  AIP.  This  means  that  the  parameter  suppresses  the

display,  but  does  not  reduce  the  processing  time;  however

this is what the option does.

But  you  can  still  use  this  parameter;  the  function  is  as

described.

SHOW_ERR_AUTOMATIC=[ON/OFF]

Configuration to switch on/off the display of automatic failure

types on the terminal.

Note

This flag does not control the generation of automatic failure

types.  This  flag  only  controls  the  independent  display  of

automatic

failure

types  on

the

terminal

in

the  dialog

QEE_ERR_AUTOMATIC.

Note 2

Code input types are generally not included in the  automatic

failure types.

Note 3

Using this flag,  you can enable/disable the display of the list

of  automatic  failures.  The  display  of  the  list  does  not  affect

the processing! Processing is always performed.

This  is  different  with  option  1214:  Here,  the  complete

processing and the display of the list of automatic failures is

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 19/70

Configuration AIP-QM

enabled/disabled.

Default  ON

Example

SHOW_ERR_AUTOMATIC=OFF

5.6  Section [PAU]

[PAU]

Section for inspection step

You  may  only  display  acronyms  which  do  not  change

once  the  inspection  step  has  been  created,  i.e.  static

acronyms.

LABEL=<TEXT with spaces>

Label for tree entry.

Default  Inspection step

The  default  text  is  automatically  translated  into  the  selected

terminal language.

You  can  store  custom

labels  directly

in

the  required

language.

Texts including spaces can be processed. Store the texts that

must be translated in the relevant dictionary.

Example

LABEL=my inspection step

LABEL=a checkorder

ACRONYMS=<PAU.AKRONYM>

The entry includes the columns that must be displayed in the

inspection list for the relevant tree entry.

Default   PAU.AGNR:ADE[~]PAU.AGBEZ:ADE

It  is  possible  to  configure  several  columns.  The  single

columns are separated by the character combination [~].

Acronyms

are

listed

in

Pruefschritt.lst.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 20/70

Configuration AIP-QM

Each  acronym  must  have  the  specific  prefix  followed  by  a

dot.

Example

ACRONYMS=PAU.AGNR:ADE[~]PAU.AGBEZ:ADE[~]PAU.M

NR

ACRONYMS=PAU.AGNR:ADE

Note:  valid  as  of  version  2.0.1.1.  The  previous  configuration

with the separator [§] instead of [~] is still functioning.

LABEL_ES_UNDEF=<TEXT>

Label  which  is  displayed  when  a  collection  sequence  is

unknown.

Default   Inspection step [unknown collection sequence]

You  can  store  custom

labels  directly

in

the  required

language.

Texts including spaces can be processed. Store the texts that

must be translated in the relevant dictionary.

Example

LABEL_ES_UNDEF=Erf.seq. unbekannt

INFO

You cannot customize the graphic accompanying the label.

5.7  Section [PPKT]

[PPKT]1

Section for inspection point

You  may  only  display  acronyms  which  do  not  change

once  the  inspection  step  has  been  created,  i.e.  static

acronyms.

LABEL=<TEXT with spaces>

 explanation see section [PAU]

1Only relevant when referring to inspection points.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 21/70

 As an alternative

Default  Inspection point

LABEL=PPKT.FORMATSTRING

Example / 1

Configuration AIP-QM

LABEL=inspection point

Example / 2

LABEL=PPKT.FORMATSTRING

Note

A combination of both alternatives is NOT possible.

ACRONYMS=<PPKT.AKRONYM>

 explanation see section [PAU]

Default   PPKT.PPKT:USERD1[~]PPKT.PPKT:USERT1

Example / 1

ACRONYMS=PPKT.PPKT:USERT1

FORMATSTRING_LABEL_SEPARATOR=

Separator  within  the  individually  configurable  label  text

<any string>

especially with inspection points

Default  CHR(32)2

Example

FORMATSTRING_LABEL_SEPARATOR=/

Note

Leading and trailing spaces cannot be displayed.

FORMATSTRING_VALUE_SEPARATOR=

Separator  within  the  individually  configurable  data  contents

<any string>

especially with inspection points

Default  CHR(32)3

Example

2CHR(32) = space character

3CHR(32) = space character

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 22/70

Configuration AIP-QM

FORMATSTRING_VALUE_SEPARATOR=;

Note

Leading and trailing spaces cannot be displayed.

WORKFLOW_OR_DYNDLG=<TEXT>

Fixed assignment of the collection function to an element.

Default  INSPOINT (= Workflow)

5.8  Section [MM]

[MM]4

Section for inspection characteristic

You  may  only  display  acronyms  which  do  not  change

once  the  inspection  step  has  been  created,  i.e.  static

acronyms.

LABEL=<TEXT with spaces>

 explanation see section [PAU]

ACRONYMS=<MM.ACRONYM>

 explanation see section [PAU]

By default  Characteristic

Default  MM.MMBEZ

Example

ACRONYMS=MM.MMBEZ[~]MM.AFO

ACRONYMS=MM.MMBEZ

Note

Not valid for single-part evaluations!

CHARACTERISTIC_INFORMATION=

Fixed  assignment  of  the  additional  function  Characteristic

<TEXT>

Information for one element.

Storing the additional function is only allowed for

o  Characteristics / [MM]

4Characteristic that does not refer to an inspection point

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 23/70

Configuration AIP-QM

o

Inspection point characteristics/ [PPKT_MM]

o  Measured values / [MW]

Default  CHARACTERISTIC_INFO (= Workflow)

Example

Assignment  of  a  customer  specific  additional

function

characteristic information. In this case, a customer specific

workflow entitled CHARC_INFO_CUSTOM must be configured.

CHARACTERISTIC_INFORMATION=CHARAC_INFO_CUSTOM

LABEL_EA_UNDEF=<TEXT>

Label with undefined input type

Default   Merk. [undefined input type]

You  can  store  custom

labels  directly

in

the  required

language.

Texts including spaces can be processed. Store the texts that

must be translated in the relevant dictionary.

Example

LABEL_EA_UNDEF=undefined input type

INFO

You cannot customize the graphic accompanying the label.

5.9  Section [PPKT_MM]

[PPKT_MM]5

Section for inspection characteristic

You  may  only  display  acronyms  which  do  not  change

once  the  inspection  step  has  been  created,  i.e.  static

acronyms.

LABEL=<TEXT with spaces>

 explanation see section [PAU]

5 Characteristic referring to inspection points

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 24/70

ACRONYMS=<PPKT_MM.ACRONYM>

 explanation see section [PAU]

By default  Characteristic

Configuration AIP-QM

Default  PPKT_MM.MMBEZ

Examples

ACRONYMS=PPKT_MM.MMBEZ[~]PPKT_MM.AFO

ACRONYMS=PPKT_MM.MMBEZ

LABEL_EA_UNDEF=<TEXT>

Label with undefined input type

Default   Merk. [undefined input type]

You  can  store  custom

labels  directly

in

the  required

language.

Texts including spaces can be processed. Store the texts that

must be translated in the relevant dictionary.

Example

LABEL_EA_UNDEF=undefined input type

INFO

You cannot customize the graphic accompanying the label.

CHARACTERISTIC_INFORMATION=

 Explanation see section [PPKT_MM]

<TEXT>

5.10  Section [SP]

Default  CHARACTERISTIC_INFO (= Workflow)

[SP]

Section for sample

You  may  only  display  acronyms  which  do  not  change

once  the  inspection  step  has  been  created,  i.e.  static

acronyms.

LABEL=<TEXT with spaces>

 explanation see section [PAU]

Default  Sample

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 25/70

ACRONYMS=<SP.ACRONYM>

 explanation see section [PAU]

Configuration AIP-QM

Default 

SP.XQ[~]SP.S[~]SP.XMAX[~]SP.XMIN[~]SP.R[~]SP.XMED

[~]SP.ERRMENGE

Examples

ACRONYMS=SP.XQ[~]SP.S[~]SP.XMAX[~]SP.XMIN

ACRONYMS=SP.XQ

5.11  Section [MW]

[MW]

Section for measured value

You  may  only  display  acronyms  which  do  not  change

once  the  inspection  step  has  been  created,  i.e.  static

acronyms.

LABEL=<TEXT with spaces>

 explanation see section [PAU]

ACRONYMS=<MW.ACRONYM>

 explanation see section [PAU]

Default  Measured value

Examples

ACRONYMS=MW.MW[~]MW.UNGUELTIG[~]MW.ANZERR

ACRONYMS=MW.MW

ACRONYMS_BEWERT_ESTCK=
<MW.ACRONYM>

 explanation see section [PAU]

ACRONYMS_BEWERT_ESTCK_PPUNKT=
<MW.ACRONYM>

ACRONYMS_BEWERT_ESTCK_STICHPR=
<MW.ACRONYM>

Default  MW.STATUS

Note

Only valid with single-part evaluations with collection method

= assessment catalog

 See chapter

Example

ACRONYMS_BEWERT_ESTCK=MW.STATUS

The  content  of

the

field  MW.STATUS

is  automatically

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 26/70

Configuration AIP-QM

translated.

Store  the  texts  that  must  be  translated  in  the  relevant

dictionary.

 explanation see section [PAU]

Default  MW.BEWBEZ:1 Note

Only valid with single-part evaluations with collection method

= code.

Example

ACRONYMS_CODE_ESTCK=MW.BEWBEZ:1

ACRONYMS_CODE_ESTCK=
<MW.AKRONYM>

ACRONYMS_CODE_ESTCK_PPUNKT=
<MW.AKRONYM>

ACRONYMS_CODE_ESTCK_STICHPR=
<MW.ACRONYM>

ACRONYMS_MESSW_ESTCK=
<MW.AKRONYM>

ACRONYMS_MESSW_ESTCK_PPUNKT=
<MW.ACRONYM>

ACRONYMS_MESSW_ESTCK_PPUNKT_SIMP
LE=
<MW.ACRONYM>

 explanation see section [PAU]

Default6  MW.MW[~]MW.CEINH

 or

Default7  MW.MW[~]MW.CEINH

ACRONYMS_MESSW_ESTCK_STICHPR=

Note

<MW.AKRONYM>

Only valid with single-part evaluations with collection method

=  measurement.  In  connection  with  the  display  of  MW-MW,

the  unit  of  the  measured  value  is  automatically  taken  from

the characteristic and attached.

Examples

ACRONYMS_MESSW_ESTCK=MW.MW[~]MW.CEINH[~]MW.BE

M

ACRONYMS_MESSW_ESTCK=MW.MW[~]MW.BEM

CHARACTERISTIC_INFORMATION=

 Explanation see section [PPKT_MM]

<TEXT>

Default  CHARACTERISTIC_INFO (= Workflow)

6 With MESSW_ESTCK and MESSW_ESTCK_PPUNKT

7 With MESSW_ESTCK_STICHPR

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 27/70

Configuration AIP-QM

5.12  Section [MW_TEIL]

[MW_TEIL]

Section  for  piece-related  inspections  for

variable characteristics

ACRONYMS_MESSW_ESTCK_PPUNKT_SIMP

 explanation see section [PAU]

LE_PART=

With  section  [MW_TEIL],  the  free  definition  of  a  label  is  not

ACRONYMS_MESSW_ESTCK_PPUNKT_CALC

possible.

=

ACRONYMS_MESSW_ESTCK_PPUNKT=

the left hand side.

You can make separate configurations for the input types on

Default  MM.BEZ

Example:

ACRONYMS_MESSW_ESTCK_PPUNKT_SIMPLE_PART=

MM.CMMNR[~]MM.MMBEZ[~]MW.MW

  Display of characteristic number, characteristic name

and measured value

5.13  Section [GROUP_BY_SP_NEST_SCHUSS]

[GROUP_BY_SP_NEST_SCHUSS]

Section  for  piece-related  inspections  for

variable  characteristics  with  reference  to

the cavity

LABEL=<TEXT with spaces>

 explanation see section [PAU]

Default  no label text

5.14  Section [MW_SCHUSS_NEST]

[MW_SCHUSS_NEST]

Section  for  the  measured  values  with  piece-

related

inspection

of

variable

characteristics with reference to the cavity

LABEL=<TEXT with spaces>

 explanation see section [PAU]

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 28/70

Configuration AIP-QM

ACRONYMS_MESSW_ESTCK_PPUNKT_SIMPLE_PART=

 explanation see section [PAU]

Default  Measured value

<MW.AKRONYM>

ACRONYMS_MESSW_ESTCK_PPUNKT_CALC=<MW.AKR

ONYM>

...

Examples

ACRONYMS_MESSW_ESTCK_PPUNKT_SIMPLE_PART=MM.AFO[~]MM.MMBE

Z[~]MW.MW

ACRONYMS_MESSW_ESTCK_PPUNKT_CALC=

MM.AFO[~]MM.MMBEZ[~]MW.MW



In each case, display of OP sequence number,

characteristic name and measured value

5.15  Section [ERF_SEQ_P1]

[ERF_SEQ_P1]

Section for collection sequence P1 (based on characteristic)

5.16  Section [ERF_SEQ_P2]

[ERF_SEQ_S2

Section for collection sequence S2 (based on sample, based

on characteristic)

AUTO_CREATE_FIRST_SAMPLE=

This function is activated when requesting the inspection list.

[ON/OFF]

A prerequisite  is that no characteristic of the  inspection step

has a default value referring to the number of samples. Here,

a sample container for the immediate collection of inspection

results is automatically provided on requesting the inspection

list.

This  means  that  the  user  does  not  have  to  click  the  button

"New sample" for the collection of the first sample.

Default  ON

Example

AUTO_CREATE_FIRST_SAMPLE=ON

The  system  automatically  provides  an  empty  sample

container for the first sample.

AUTO_CREATE_FIRST_SAMPLE=OFF

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 29/70

Configuration AIP-QM

No sample container is provided.

NOTE

If the user has NO credentials, the mentioned function is not

active.

5.17  Section [CONSTANT_USER_AUTHORIZATION]

[CONSTANT_USER_AUTHORIZATION]

Section  to  store  user  authorizations  for  different  activities  in

the terminal.

Authorizations control the functions in the  inspection  list and

in DYN DLG AIP.

5.18  Section [MM_CHART] bzw. [MM_CHART_<RECTYPE>]

[MM_CHART]

or

Section  for  the  definition  of  parameters  to  call  control  charts

[MM_CHART_<RECTYP>]

in the input dialogs

SPECIFIC_LIST=

You can store an individual dialog string to request control

RECTYP=<RECTYP>|BER=<BER>|PANNR=

chart data.

<PANNR>|PAUNR=<PAUNR>|AFO=<AFO>|

MOD:AIP=1|ANZ=40|EWANZ=1|

When generating control charts, an existing configuration

entry is preferentially used. If no entry exists, the default (see

below) is used to request data in the AIP.

A.  Parameters which influence data selection

The following entries must be available:

RECTYP – current data record type (e.g. production, test

equipment, etc.)

BER – current area

AFO – current OP sequence or CMMNR – current characteristic

number

Currently, the following entries can be available:

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 30/70

Configuration AIP-QM

PANNR  – current inspection requirement number

PAUNR  – current inspection order number

ANR

– current order number

CNR

– current batch number

ATK

– current article number

ATKIDX – current article index

PPLID  – currently used inspection plan number

PPLIDX – currently used inspection plan index

PPS:REF – current PPS reference number

AGNR   – current operation number

AGBEZ  – current operation designation

KDNR  – current customer number

MNR:PAN – current machine number (relating to the

inspection requirement)

PMID:KALIB  – test equipment ID of the current

calibration (only with data type‚PMV,test equipment

management)

B.  Parameters that influence the data quantity

ANZ - number of samples displayed (single value chart:

single values)

EWANZ - flag that controls if the single values are

additionally requested and displayed in case of an XQ or

Median chart.

Example 1

SPECIFIC_LIST=RECTYP=<RECTYP>|BER=<BER>|PANNR

=<PANNR>|PAUNR=<PAUNR>|AFO=<AFO>|MOD:AIP=1|AN

Z=15|EWANZ=0|ANZ=30

Charts are displayed with reference to the current order

characteristic. The control chart shows 30 values but no

single values.

If you have not made a configuration or dialog string

assignment, the standard dialog string AIP is automatically

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 31/70

Configuration AIP-QM

used.

Example 2

SPECIFIC_LIST=PMID:KALIB=<PMID.KALIB>|RECTYP=

<RECTYP>|BER=<BER>|AFO=<AFO>|MOD:AIP=1|ANZ=40

|EWANZ=1|

A non order-related chart is displayed which is filtered by the

calibration test equipment.

Texts highlighted in turquoise are so-called placeholders

which are populated automatically with current values.

The file called "merkmal.Ist" (=characteristic list) is the base

in the CAQ spool directory for the relevant operation (order).

Note

As this configuration requires expert knowledge, changes or

extensions should only be carried out involving CAQ software

development.

Default 

|RECTYP=<RECTYP>|BER=<BER>|PANNR=<PANNR>|PA

UNR=<PAUNR>|AFO=<AFO>|MOD:AIP=1|ANZ=15|EWANZ

=0|1 (XQ und MEDIAN: 1, alle anderen 0)|ANZ=15

5.19  Section [CHARTS]

[CHARTS]

Section for the display options of control charts

LEFT_AXIS_VISIBLE=<TRUE|FALSE>

Display of the left axis on/off

If activated, a grid is displayed.

Default  FALSE (off)

BOTTOM_AXIS_VISIBLE=<TRUE|FALSE>  Display of the bottom axis on/off

If activated, the sample number is displayed. As of SP13, you

can separately configure the data that is shown on the x-axis.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 32/70

Configuration AIP-QM

TITLE_VISIBLE=<TRUE|FALSE>

Display of title on/off

Default  FALSE (off)

This function is available as of SP13.

Default  FALSE (off)

BACKGROUND_COLOR=R=<red

Definition of background color

value>,G=<green

value>,B=<blue

value>

R=0…255 (red content)

G=0…255 (green content)

B=0…255 (blue content)

Default R=255,G=255,B=255 (= white)

MOD:PPKTDETAILS=<TRUE|FALSE>

This function is available as of SP13.

This parameter must be set to "TRUE"; only then the

inspection point detail fields of the file "rgk.lst" can be shown

on the x-axis.

Default  False

XLABEL_DATA_FIELD=<Acronym from

This function is available as of SP13.

rgk.lst>

For the x-axis labeling, the acronyms of the file "rgk.lst" are

available. When one of the inspection point detail fields is

displayed, the acronyms must be "translated" in a customer-

specific language file. The "translation" must be made

individually, because it might be different with each customer.

Default  no label display

IR.CHANGE:SINGLEVALUE=

Changing  collected

inspection

results

for  single-part

[ON/OFF]

evaluations

Default  OFF

Example

IR.CHANGE:SINGLEVALUE=OFF

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 33/70

Configuration AIP-QM

5.20  Section [FORCE_ERR_MEASURE_ACQUISITION]

[FORCE_ERR_MEASURE_ACQUISITION]  Section  to  control  the  forced  collection  of  failures  and/or

measures

GLOBAL_ACTIVE=[1,0]

Global  activation  /  deactivation  of  the  forced  collection  of

failures and/or measures.

The value "1" enables the forced collection of failures and/or

measures  globally  for  all  input  dialogs.  In  this  case,  the

configurations  mentioned  in  the  following  are  valid  for  all

input types (dialogs of the input types) within this section. The

value "0" globally disables the function. If this configuration is

set,  the  configurations  specific  to  the  input  type  are  not

evaluated for this function.

If  you  want to  disable the forced collection of failures  and/or

measures  for  individual  dialogs  or  if  you  want  to  make  a

different  dialog-specific  configuration,  you  must  make  a

special configuration in the INI file that is specific to the input

type (dialog configuration).

SOURCE=[HYD_ERROR_DETECTION,

Basis for failure identification:

QUALITY_STATE]

HYD_ERROR_DETECTION:

HYDRA automatically generates failures

QUALITY_STATE:

Identified quality status

ERROR_TYPES=[ERROR_TYPE,ERROR_LO

Listing.  A  multiple  selection  is  possible  (separated  by

CATION,ERROR_CAUSE]

comma).

ERROR_TYPE:

Failure type

ERROR_LOCATION:

Failure location

ERROR_CAUSE:

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 34/70

MEASURE_ACQUISITION_ACTIVE=[1,0]  Flag to force measure collection

Failure cause

Configuration AIP-QM

For each input type, you can define which quality rules apply. The configuration is made in the INI  file of

the

relevant

input

type.  These

files  are  stored

in  sub

folder

"functions".  The

file

"qee_mw_me_es_pp_si.ini" includes, for example, the configurationfor the collection of measured values

of a single piece at an inspection point. The configuration is made in section [QualityRule].

[QualityRule]

Section for the quality rule

Rule=[SP_MeasuredValue_ToleranceLimits,

SP_MeasuredValue_ToleranceLimits

SA_DefectItems_NCD]

Quality

rule

to  check  against

tolerance limits

SA_DefectItems_NCD:

Quality

rule

to  check  against

accepted and rejected quantities

The  forced  collection  of  failures  and/or  measures  can  be  defined  differently  for  each  input  type.  It  is

therefore  possible  to  activate  this  function  separately  for  selected  input  types.  If  you  define  a  separate

configuration for an input type, make the configuration in the INI file of the relevant input type. Store the

INI

file

including

the

required

configuration

for

the

input

type

in

section

"[FORCE_ERR_MEASURE_ACQUISITION]".

If  a  specific  configuration  is  defined  for  an  input  type,  this  specific  configuration  is  used  instead  of  the

global  setting.  Requirement:  The  option  GLOBAL_ACTIVE=1  must  be  set  in  the  configuration  file

"caq_dc_t.ini".

5.21  Section [OPTIONS]

[OPTIONS]

QUALITY_STATE_IN_INSP_LIST=[1,0]

Specifies if the inspection list shows the quality status

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 35/70

AUTO_FINISH_INSP_POINT=[OFF,ALL,

Controls if the automatic completion of the inspection point is

VALID_ONLY]

active

OFF:

Configuration AIP-QM

No automatic completion of the inspection point

ALL:

Automatic completion of the inspection point irrespective of

the quality status of the separate measured values.

VALID_ONLY:

The  inspection  points  are  only  completed,  if  all  measured

values have the quality status "pass" or "cond. pass".

Note: If operated in this mode, the HYDRA server will always

take the usage decision.

DYNAMIC_INSPECTION_LIST=[1,0]

The  nodes  of  the  inspection  list  are  automatically  expanded

and collapsed.

0:

1:

All  nodes  including  all  substructures  are  initially

opened. (Default)

Substructures are only  opened and displayed for the

currently selected node.

This function is only available in AIP 8.2.

ACTIVATE_EQD=[1,0]

Activation of the expanded view of quality data; this requires

the respective active license.

0:

1:

Additional objects are not displayed (default)

Activation of the display of additional objects, e.g. list

of documents, failure list, control charts, etc.

SHOW_HORIZONTAL_SCROLLBAR=ON

Activation of a horizontal scrollbar in the inspection list.

Available as of the caq_dc_t.dll version 8.2.0.34.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 36/70

Configuration AIP-QM

5.22  Section [QUEUE_MODE_QM]

[QUEUE_MODE_QM]

QUEUE_WARNING_SWITCH=[ON,OFF]

The warning message can be switched off by setting OFF.

QUEUE_WARNING_RESTRICTION_GLOBAL
=[ON,OFF]

Message text for actions modifying data.
Default text

Default: ON

QUEUE_WARNING_NOT_UPDATED=[ON,OF
F]

QUEUE_WARNING_NOT_UPDATABLE=[ON,
OFF]

Communication  with  the  HYDRA  server  is  currently
limited.  Data  will  be  updated  when  server
communication  is  running  again  and  when  no  more
dialogs are open.

Default: ON

Message  text  for  the  display  of  data  that  have  not  yet  been
updated.
Default text

Communication  with  the  HYDRA  server  is  currently
limited. Data might not be current.

Default: ON

Message  text  for  actions  that  need  information  from  the
server.
Default text

Communication  with  the  HYDRA  server  is  currently
limited. Data cannot be updated.

Default: ON

5.23  Sections [CAQ_DC_T-…] – Button configuration of the inspection list

In  the  sections  starting  with  "[CAQ_DC_T-",  you  configure  the  buttons  of  the  inspection  list  in  the

respective context.

The following three versions are available to configure the behavior of the button to update the content of

the inspection list.

  DQC_RELOAD -> Intelligent update

Context inspection point: only the inspection point and the substructures are updated.

Context inspection step: complete update of the inspection list

  DQC_RELOAD_LEGACY –>  Complete update of all inspection data in the entire terminal

  DQC_RELOAD_PPKT  ->  The  update  is  only  performed  in  the  context  of  the  inspection  point.  A

complete update is ruled out.

Standard assignment is:  „DQC_RELOAD“.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 37/70

Configuration AIP-QM

6  Configuration file "hytnrcfg.ini"

6.1  Section [CAQ->Optionen 0]

[CAQ->Optionen 0]

LOAD_MEASUREMENTS_ON_DEMAND=[ON,OFF]

LOAD_MEASUREMENTS_ON_DEMAND=ON

Activation  of  the  preceding  inspection

point list

Default: OFF

INTERPOSE_FUNCTION=QEE_FILTER_INSPPOINT

Enter the dialog that is called as parameter.

Example:

INTERPOSE_FUNCTION=QEE_FILTER_INSP

POINT

When  you  have  closed  the  inspection  list,  the

preceding  inspection  point  list  is  automatically

reopened.

If  no  parameter  is  assigned  or  if  the  entry  does

not  exist,

the  system  changes

to

the

machine/order overview when the inspection list

has been closed.

RECALL_ON_EXIT_INSP_LIST=ANR,MNR

If you configured the parameter

"REQUEST_RELOAD_ON_EXIT_INSP_LIST="

with "MNR,ANR", the application updates the

order and machine list, once you have exited the

preceding inspection point list. This also updates

the inspection status. If you only configure the

parameter "ANR", the application only updates

the order list. If this parameter does not exist or

does not include any value, no update is

performed when you exit the preceding

inspection point list.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 38/70

Configuration AIP-QM

If you use the tile view, a special configuration is

required.

TERM_MODE=[LAB,CALIBRATION,GOODS_RECEI

TERM_MODE=LAB

PT]

Activates

the

inspection  mode

"Laboratory"

TERM_MODE=CALIBRATION

Activates

the

inspection  mode

"Calibration"

TERM_MODE=GOODS_RECEIPT

Activates  the  inspection  mode  "Goods

receipt"

6.2  Section [DLL_DLG 0]

[DLL_DLG 0]

DISABLE=MNR,ANR,PNR,MSTAT,BPOS,AGRD,RES

This  parameter  ensures  that  the  lists  are  not

,LOKVLIST,ZLO,HZTYP,LICENSE,AART,PATHS,MA

updated  during

the

inspection.  When

the

T,LPKZ,TPE,SKAL,QRD,PAUMNR,PPKTMNR

inspection  list  is  closed,  the  specified  lists  are

updated.  The  lists,  which  are  used,  are  listed

separated by comma.

Note:

The configured lists are not updated until

the  inspection  list  is  closed  –  whatever

the  consequences.  For  example,  if  the

shift  list  is  not  loaded  for  a  very  long

time,  at  some  point  in  time  the  MDE

processing  runs  out  of  shifts.  In  this

case,  the  system  cannot  post  a  shift

change that is due.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 39/70

Configuration AIP-QM

7  Collection function

7.1  Workflows

The  following  chapters  describe  workflows  and  their  assigned  dynamic  dialogs  AIP.  Also  configuration

files and their function are described in detail.

7.1.1

INSPSTEP (inspection step)

Function

Workflow to summarize several dynamic dialogs on the subject "inspection step"

7.1.1.1  Dialog QEE_INSPSTEP

Dynamic dialog AIP requested as PlugInDialog to display data for inspection steps.

7.1.2

INSPPOINT

You must not change the structure of  workflows  and dialog settings  of the data collection for

"inspection points". .

Function

Workflow to summarize several dynamic dialogs on the subject "inspection point".

7.1.2.1  Dialog QEE_INSPPOINT

The dynamic dialog AIP must be requested as PlugInDialog to display data for an inspection point.

You can modify the dialog and add the display of further information from the pool of inspection point data.

Identifier in AIP DynDlg  (+

Data source, poss.

Access

poss. identifier for a unit)

list/BAPI list/acronym

or node data/acronym

Label user field 1

PAU.PPKT:USERC1LAB

Input user field 1

CPANUMP.PPKT:USERC1

Label user field 2

PAU.PPKT:USERC2LAB

Read

Read

/

write

Read

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 40/70

Input user field 2

CPANUMP.PPKT:USERC2

Label user field numerical 1

PAU.PPKT:USERN1LAB

Input user field numerical 1

CPANUMP.PPKT:USERN1

Label user field numerical 2

PAU.PPKT:USERN2LAB

Input user field numerical 2

CPANUMP.PPKT:USERN2

Label user field date 1

PAU.PPKT:USERD1LAB

Input user field date 1

CPANUMP.PPKT:USERD1

Label user field time 1

PAU.PPKT:USERT1LAB

Input user field time 1

CPANUMP.PPKT:USERT1

Label equipment

PAU.PPKT:EQUIPLAB

Input equipment

CPANUMP.PPKT:EQUIP

Label technical location

PAU.PPKT:TPLATZLAB

Input technical location

CPANUMP.PPKT:TPLATZ

Label technical location

PAU.PPKT:PROBELAB

Input technical location

CPANUMP.PPKT:PROBE

Inspector

KNR

Configuration AIP-QM

Read

/

write

Read

Read

/

write

Read

Read

/

write

Read

Read

/

write

Read

Read

/

write

Read

Read

/

write

Read

Read

/

write

Read

Read

/

write

Read

/

write

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 41/70

7.1.2.1.1  qee_insppoint.ini

[CONFIGURATION]

Configuration AIP-QM

Section  to  activate  the  display  of  inspection

point user fields

SHOW_OPTIONAL_USERFIELDS=[OFF,ON]

SHOW_OPTIONAL_USERFIELDS=ON

The  dialog  "QEE_INSPPOINT"  shows

the

inspection point user fields.

Default  OFF

7.1.2.2  Dialog QEE_INSPPOINT_DETAIL

Dynamic dialog AIP, to be requested as PlugInDialog to display detail data for an inspection point.

You  can  modify  the  dialog  and  add  the  display  of  further  information  from  the  pool  of  inspection  point

detail data.

Identifier in AIP DynDlg  (+

Data source, poss.

Access

poss. identifier for a unit)

list/BAPI list/acronym

or node data/acronym

Shop floor workstation

PPKT.PPKT:MNR

Partial batch

CPANUMP.PPKT:TLOS

Batch

CPANUMP.PPKT:CNR

Quantity

CPANUMP.PPKT:CMENGE

Label quantitiy unit

PAU.MENEINH_PAN

Scrap

CPANUMP.PPKT:EGRAUS

Read

/

write

Read

/

write

Read

/

write

Read

/

write

Read

Read

/

write

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 42/70

Configuration AIP-QM

Read

Read

/

write

Read

Selection

Read

Read

/

write

Label scrap unit

PAU.MENEINH_PAN

Rework

CPANUMP.PPKT:EGRNACH

Label rework unit

PAU.MENEINH_PAN

Grid usage decision

ENT

Code

Group

CPANUMP.ENT:CODE

CPANUMP.ENT:GRUPPE

Usage decision text

ENTTEXT

Selected set

VEAUSWMEN

Plant

Catalog type

VEWERTK

VEKATART

7.1.3  MM_ME_ES_PP_SI (inspection point related inspection)

Function

Workflow to summarize several dynamic dialogs on the subject "characteristic data".

7.1.3.1  Dialog QEE_MM_ME_ES_PP_SI

Dynamic Dialog AIP, to be requested as PlugInDialog to display data for a characteristic for the input type

MESSW_ESTCK_PPUNKT_SIMPLE.

You can modify the dialog and add the display of further information from the pool of characteristic data.

Label

Identifier in AIP DynDlg

Data source,

Rules

(+ poss. identifier for a

poss. list/BAPI

unit)

list/acronym

or node

data/acronym

Acces

s

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 43/70

Units  and

labels

to  be

STPRANZ

Assembled  during



If

Read

Configuration AIP-QM

checked

(+MM.STPRUMF:MENEI

runtime

NH)

STPRUMF<1

nothing

is

displayed.



If  FAKTOR<1

neither

FAKTOR  nor

asterisk

is

displayed.



If  unit  is  not

available,

neither

unit

nor  space  is

displayed.

Upper

tolerance

level  and

MM.OTG (+MM.CEINH)  Data

structure

label

(MonsterString)

Target value and label

MM.SW (+MM.CEINH)

Data

structure

(MonsterString)

Lower

tolerance

limit  and

MM.UTG (+MM.CEINH)  Data

structure

label

(MonsterString)

Inspected units

STAT:N

Stat.lst / LIST;99 /

(+MM.STPRUMF:MENEI

M

NH)

Read

Read

Read

Read

Defective units

STAT:ANZFHLEIN

Stat.lst / LIST;99 /

Read

(+MM.STPRUMF:MENEI

ANZFHLEIN

NH)

Violation  of  lower  tolerance

STAT:ANZUTGV

Stat.lst / LIST;99 /

limit

ANZUTGV

Violation  of  upper  tolerance  STAT:ANZOTGV

Stat.lst / LIST;99 /

Read

Read

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 44/70

limit

ANZOTGV

Mean value (xq)

STAT:XQ

Stat.lst / LIST;99 /

(+MM.CEINH)

XQ

Minimum

Maximum

STAT:XMIN

(+MM.CEINH)

STAT:XMAX

(+MM.CEINH)

Stat.lst / LIST;99 /

XMIN

Stat.lst / LIST;99 /

XMAX

Range (r)

STAT:R (+MM.CEINH)  Stat.lst / LIST;99 /

R

Variance

STAT:VAR

Stat.lst / LIST;99 /

VAR

Configuration AIP-QM

Read

Read

Read

Read

Read

Standard deviation (s)

STAT:S

Stat.lst / LIST;99 /

Read

S

7.1.4  MM_ME_ES_ST_SI (sample inspection)

Function

Workflow to summarize several dynamic dialogs on the subject "characteristic data".

7.1.4.1.1  Dialog QEE_MM_ME_ES_ST_SI

Dynamic Dialog AIP, to be requested as PlugInDialog to display data for a characteristic for the input type

MESSW_ESTCK_STICHPR_SIMPLE.

7.1.5  MM_BE_ST_PP_SI (inspection point related inspection)

Function

Workflow to summarize several dynamic dialogs on the subject "attributive result collection".

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 45/70

Configuration AIP-QM

7.1.5.1  Dialog QEE_MM_BE_ST_PP_SI

Dynamic Dialog AIP, to be requested as PlugInDialog to display data for a characteristic for the input type

MESSW_ESTCK_PPUNKT_SIMPLE.

You can modify the dialog and add the display of further information from the pool of characteristic data.

Label

Identifier in AIP DynDlg

Data source,

Rules

(+ poss. identifier for a

poss. list/BAPI

unit)

list/acronym

or node

data/acronym

Acces

s

Units to be inspected

STPRANZ

Assembled  during



If

Read

runtime

STPRUMF<1

nothing

is

displayed.



If  FAKTOR<1

neither

FAKTOR  nor

asterisk

is

displayed.



If  unit  is  not

available,

neither

unit

nor  space  is

displayed.

7.1.5.1.1  Configuration file "qee_mm_be_st_pp_si.ini"

[CONFIGURATION]

Section for general configurations

DO_PREALLOCATE_STPRUMF=[TRUE,FALSE]

Optionally,

the

field

"Inspected  units"

is

preassigned the sample size. If the sample size is

smaller than 1, the field remains empty.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 46/70

Configuration AIP-QM

Default  TRUE

Example

DO_PREALLOCATE_STPRUMF=FALSE

The field is not preassigned.

[CONTROL_CHART_1:IMAGE]

Section for chart settings

 see General chart configuration

An  activation/deactivation  for  specific  dialogs  is

not  possible.  The  control  chart  configuration  is

centrally  made

in

the

"General

chart

configuration".

7.1.5.2  Dialog QEE_ERR_CLASSIC

Dynamic dialog AIP, to be requested as PlugInDialog to collect failure data.

7.1.5.2.1  Configuration file "qee_err_classic.ini"

[FA]

Section for failure types

LABEL_RADIO_ITEM=<Value>

Flag to configure a designation for the entry type

FA.

This flag is only processed in connection with

the inspection chart.

Default  failure type

Example

LABEL_RADIO_ITEM=failure types

[FO]

Section for failure locations.

LABEL_RADIO_ITEM=<Value>

Flag to configure a designation for the entry type

FA.

This flag is only processed in connection with the

inspection chart.

Default  failure location

Example

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 47/70

Configuration AIP-QM

LABEL_RADIO_ITEM=failure location

[FU]

Section for failure types

LABEL_RADIO_ITEM=<Value>

Flag to configure a designation for the entry type

FA.

This flag is only processed in connection with

the inspection chart.

Default  failure cause

Example

LABEL_RADIO_ITEM=failure cause

[VU]

Section for originator

LABEL_RADIO_ITEM=<Value>

Flag to configure a designation for the entry type

FA.

This flag is only processed in connection with

the inspection chart.

Default  source

Example

LABEL_RADIO_ITEM=source

7.1.5.3  Dialog QEE_MASS_CLASSIC

Dynamic dialog AIP, to be requested as PlugInDialog to collect data of measures.

7.1.6  MM_BE_ST_SI (sample inspection)

Function

Workflow to summarize several dynamic dialogs on the subject "attributive result collection".

7.1.6.1  Dialog QEE_MM_BE_ST_SI

Dynamic Dialog AIP, to be requested as PlugInDialog to display data for a characteristic for the input type

BEWERT_STICHPR_SIMPLE.

7.1.6.1.1  Configuration file "qee_mm_be_st_si.ini"
Configuration_AIP-QM.docx

Version: 1.17.20190

Page 48/70

Configuration AIP-QM

 see Configuration file: qee_mm_be_st_pp_fs.ini

7.1.6.2  Dialog QEE_ERR_CLASSIC

 see QEE_ERR_CLASSIC

7.1.6.2.1  Dialog QEE_MASS_CLASSIC

 see QEE_MASS_CLASSIC

7.1.7  MW_ME_ES_PP_SI (inspection point related inspection)

Function

Workflow to summarize several dynamic dialogs on the subject "Variable result collection".

7.1.7.1  Dialog QEE_MW_ME_ES_PP_SI

Dynamic  Dialog  AIP,  to  be  requested  as  PlugInDialog  to  collect  quality  data  for  the  collection  element

"measured value" using input type MESSW_ESTCK_PPUNKT_SIMPLE.

Label

Identifier in AIP DynDlg

Data source,

Rules

(+ poss. identifier for a

poss. list/BAPI

unit)

list/acronym

or node

data/acronym

Acces

s

Units to be inspected

STPRANZ

Assembled  during



If

Read

runtime

STPRUMF<1

nothing

is

displayed.



If  FAKTOR<1

neither

FAKTOR  nor

asterisk

is

displayed.



If  unit  is  not

available,

neither

unit

nor  space  is

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 49/70

Configuration AIP-QM

displayed.

Button

Function

Other

Required license

QMB:INIT

Initialize test equipment

QMB:MESSEN

Measure test equipment

(measure)

HYD-MDI

HYD-MDI

QMB:HOLEN (fetch)

Fetch test equipment

HYD-MDI

7.1.7.1.1  Configuration file "qee_mw_me_es_pp_si.ini"

[CONTROL_CHART_1:IMAGE]

Section for chart settings

 see General chart configuration

An activation/deactivation for specific dialogs is

not  possible.  The  control  chart  configuration  is

centrally  made

in

the

"General

chart

configuration".

[INDICATOR]

Section  for  settings  of  the  measured  value

indicator

SHOW_INDICATOR=[ON,OFF]

Fading in and out of measured value indicators

Default  ON

7.1.7.2  QEE_ERR_CLASSIC

 see QEE_ERR_CLASSIC

7.1.7.3  QEE_MASS_CLASSIC

 see QEE_MASS_CLASSIC

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 50/70

Configuration AIP-QM

7.1.8  MW_ME_ES_ST_SI (random sample inspection)

Function

Workflow to summarize several dynamic dialogs on the subject "Variable result collection".

7.1.8.1  QEE_MW_ME_ES_ST_SI

Dynamic Dialog AIP, to be requested as PlugInDialog to collect quality data, collection element, measured

value, input type MESSW_ESTCK_STICHPR_SIMPLE.

7.1.8.1.1  Configuration file "qee_mw_me_es_st_si.ini"

 see Configuration file: qee_mw_me_es_pp_si.ini

7.1.8.2  Dialog QEE_ERR_CLASSIC

 see QEE_ERR_CLASSIC

7.1.8.3  Dialog QEE_MASS_CLASSIC

 see QEE_MASS_CLASSIC

7.1.9  MM_BE_ST_PP_FS (inspection point related inspection)

Function

Workflow to summarize several dynamic dialogs on the subject "Inspection chart".

7.1.9.1  Dialog QEE_MM_BE_ST_PP_FS

Dynamic Dialog AIP, to be requested as PlugInDialog to collect quality data, collection element, inspection

chart, input type BEWERT_STICHPR_PPUNKT_FSK.

You can modify the dialog and add the display of further information from the pool of inspection point data.

7.1.9.1.1  Configuration file "qee_mm_be_st_pp_fs.ini"

[CONFIGURATION]

Section for general configurations

DO_PREALLOCATE_STPRUMF=[TRUE,FALSE]

Optionally,

the

field

"Inspected  units"

is

preassigned the sample size. If the sample size is

smaller than 1, the field remains empty.

Default  TRUE

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 51/70

Configuration AIP-QM

Example

DO_PREALLOCATE_STPRUMF=FALSE

The field is not preassigned.

7.1.9.2  Dialog QEE_ERR_CLASSIC

 see QEE_ERR_CLASSIC

7.1.9.3  Dialog QEE_MASS_CLASSIC

 see QEE_MASS_CLASSIC

7.1.10  MM_BE_ST_PP_FS (sample inspection)

Function

Workflow to summarize several dynamic dialogs on the subject "Inspection chart".

7.1.10.1

Dialog QEE_MM_BE_ST_FS

Dynamic Dialog AIP, to be requested as PlugInDialog to collect quality data, collection element, inspection

chart, input type BEWERT_STICHPR_FSK.

7.1.10.1.1 Configuration file "qee_mm_be_st_fs.ini"

 see Configuration file: qee_mm_be_st_pp_fs.ini

7.1.10.2

Dialog QEE_ERR_CLASSIC

 see QEE_ERR_CLASSIC

7.1.10.3

Dialog QEE_MASS_CLASSIC

 see QEE_MASS_CLASSIC

7.1.11  CHARACTERISTIC_INFO

Function

Workflow to summarize several dynamic dialogs to gather information, mainly in tabular or graphic form.

7.1.11.1

Dialog QEE_CHAR_DESCRIPTION

This  index  tab  shows  the  data  relating  to  the  current  characteristic  and  the  most  important  information

about the operation and the defined test equipment.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 52/70

The information referring to the connection status of the test equipment is derived from the corresponding

MDI status after initialization. The following statuses are available for the connection status:

Configuration AIP-QM

  MDI test equipment connection is online

  MDI test equipment connection is offline

  No MDI test equipment connection is defined or can be identified and as such is not available

7.1.11.2

Dialog QEE_CHAR_DOCUMENTS

This  index  tab  shows  both  documents  defined  for  the  inspection  order  characteristic  and  documents

assigned to the inspection requirement.

7.1.11.2.1 Configuration file "qee_char_documents.ini"

No configuration options are available.

7.1.11.3

Dialog QEE_CHAR_HISTOGRAM

The  histogram  is  only  displayed  for  variable  characteristics  or  characteristics  with  input  type  "single-part

inspection".

Request of data for the histogram is performed with the request LIST;79.

The data is requested from the server and the graphics are refreshed each time the tab is selected.

7.1.11.3.1 Configuration file "qee_char_histogramm.ini"

 see General chart configuration

7.1.11.4

Dialog QEE_CHAR_VAR_PROCESS

This index tab is only displayed if the current characteristic is variable and control chart 1 is defined as a

minimum. Then control chart 1 & 2, the histogram and the most important statistical values are displayed.

If  control  chart  2  is  not  available,  control  chart  1  is  displayed  in  a  way  that  it  fits  into  the  area  of  both

control charts.

The histogram is only displayed if data collection is based on single values.

All data (incl. statistics) is generated from the server lists and displayed in a graphic.

-  LIST;71  Data for control chart

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 53/70

Configuration AIP-QM

-  LIST;99  Statistical data

The data is requested from the server and the graphics are refreshed each time the tab is selected.

7.1.11.4.1 Configuration file "qee_char_var_process.ini"

 see General chart configuration

7.1.11.5

QEE_CHAR_ATT_PROCESS

This index tab is only displayed if the current characteristic is attributive and control chart 1 is defined.

All data (incl. statistics) is generated from the server lists and displayed in a graphic.

-  LIST;71  Data for control chart

-  LIST;99  Statistical data

The data is requested from the server and the graphics are refreshed each time the tab is selected.

7.1.11.5.1  Configuration file "qee_char_att_process.ini"

 see General chart configuration

7.1.11.6

Dialog QEE_CHAR_CHART_1

This  index  tab  displays  control  chart  1  which  is  stored  in  the  characteristic  including  the  respective  limit

values.

The number of decimal places for action and warning limits is generated dynamically.

If no control chart 1 is stored for a characteristic, the tab is hidden. The hiding of the tab is controlled via

the request of static conditions. This static condition is set in the dynamic dialog.

The data is requested from the server and the graphics are refreshed each time the tab is selected.

7.1.11.6.1 Configuration file "qee_char_chart_1.ini"

 see General chart configuration

7.1.11.7

Dialog QEE_CHAR_CHART_2

This  index  tab  displays  control  chart  2  which  is  stored  in  the  characteristic  including  the  respective  limit

values.

The number of decimal places for action and warning limits is generated dynamically.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 54/70

If no control chart 2 is stored for a characteristic, the tab is hidden. The hiding of the tab is controlled via

the request of static conditions. This static condition is set in the dynamic dialog.

The data is requested from the server and the graphics are refreshed each time the tab is selected.

Configuration AIP-QM

7.1.11.7.1 Configuration file "qee_char_chart_2.ini"

 see General chart configuration

7.1.11.8

Dialog QEE_HISTOGRAM

This index tab is hidden if the characteristic is not a variable characteristic, or if no input type with single-

part inspection has been assigned to the characteristic.

The data is requested from the server and the graphics are refreshed each time the tab is selected.

7.1.11.8.1 Configuration file "qee_char_histogram.ini"

 see General chart configuration

7.1.11.9

Dialog QEE_ERROR

This  index  tab  shows  all  entries  of  failure  types  assigned  to  the  current  characteristic  or  to  global

structures  (inspection  step  /  inspection  requirement).  For  inspection  steps  relevant  to  inspection  points,

this  tab  shows  all  entries  of  failure  types  that  are  assigned  to  the  current  inspection  point  (without

characteristic assignment).

7.1.11.9.1 Configuration file "qee_error.ini"

No configuration options are available.

7.1.11.10

Dialog QEE_MASS

This  tab  shows  all  measures  assigned  to  the  current  characteristic  or  global  structures  (inspection

step/inspection requirement). This tab also shows all measures belonging to the current inspection point

(without characteristic assignment) for inspection steps relevant to inspection points.

7.1.11.10.1  Configuration file "qee_mass.ini"

No configuration options are available.

7.1.12  MM_PR_PP_SI

Function

Workflow to (potentially) summarize several dynamic dialogs on the subject "sampling".

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 55/70

Configuration AIP-QM

7.1.12.1

Dialog QEE_MM_PR_PP_SI

You can modify the dialog and add the display of further information from the pool of characteristic data.

7.2  General chart configuration

[CONTROL_CHART_<lfd

Nr.

Section  for  general  settings  per  chart  in  DYN  DLG

Chart>:IMAGE]

AIP

Example

[CONTROL_CHART_1:IMAGE]

CHART_TYPE=[KARTE:1,KARTE:2,HISTO]

CHART_TYPE=KARTE:1

Display of control chart 1

CHART_TYPE=KARTE:2

Display of control chart 2

CHART_TYPE=HISTO

Display of histogram

SHOW_CONTROL_CHART=[ON,OFF]

Show/hide chart display.

Default  ON

LEFT_AXIS_VISIBLE=[TRUE,FALSE]

Display of the left axis on/off

If activated, a grid is displayed.

Default  TRUE (on)

BOTTOM_AXIS_VISIBLE=[TRUE,FALSE]

Display of the bottom axis on/off

If activated, the sample number is displayed. As of

SP13, you can separately configure the data that is

shown on the x-axis.

Default  TRUE (on)

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 56/70

Configuration AIP-QM

TITLE_VISIBLE=[TRUE,FALSE]

Display of title on/off

This function is available as of SP13.

Default  TRUE (on)

MOD:PPKTDETAILS=[TRUE|FALSE]

This function is available as of SP13.

This parameter must be set to "TRUE"; only then the

inspection point detail fields of the file "rgk.lst" can be

shown on the x-axis.

Default  False

XLABEL_DATA_FIELD=[Acronym from

This function is available as of SP13.

rgk.lst]

For the x-axis labeling, the acronyms of the file

"rgk.lst" are available. When one of the inspection

point detail fields is displayed, the acronyms must be

"translated" in a customer-specific language file. The

"translation" must be made individually, because it

might be different with each customer.

Example:

XLABEL_DATA_FIELD=order

Default  no label display

BACKGROUND_COLOR=R=<red

Definition of background color

value>,G=<green value>,B=<blue value>

R=0…255 (red content)

G=0…255 (green content)

B=0…255 (blue content)

Default R=255,G=255,B=255 (= white)

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 57/70

Configuration AIP-QM

8  Streamlined data processing

8.1  Disable failure and/or measure processing

8.1.1  System availability

AIP CAQ

AIP QMS  Comments

X

AIP QMS: In the QMS environment, there
is no recording of measures.

8.1.2  Motivation

The objective is to remove tabs in specific workflows in order to streamline data processing.

In the context "recording of inspection results", it is possible to remove the tabs of the

-  Failure recording and/or

-  Recording of measures

Screenshot: CAQ Classic Workflow including recording of failures and measures

In the context "information on characteristic", it is additionally possible to remove the tabs of the

-  Failure history

-  History of measures

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 58/70

Configuration AIP-QM

Screenshot: CAQ Classic information on characteristic - failure history

Screenshot: CAQ Classic information on characteristic - history of measures

Important

With customized (extended) dialogs, you cannot always apply the description that follows to full

extent.

It is possible that you must not remove tabs because of the process.

Enabling/disabling is performed likewise.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 59/70

8.1.3  CAQ  workflow  "recording  of  inspection  results":  Configuration/customization  to  disable

tabs

-

If necessary, you must enable the HYDRA Professional Mode in the MOC.

Configuration AIP-QM

-  Go to MOC  Terminals  Workflow

-  Restrict to the required data quantity

o  Type e.g. AIPDEF

o  Dlg user e.g. 0

-  Group the result set by column Step 2.

You  might  have  to  repeat  the  following  step  several  times.  This  depends  on  the  number  of  dialogs  /

workflows that are specific to terminals (terminal groups).

-  Expand the group "Step 2: QEE_ERR_CLASSIC"

All  "recording"  workflows  are  displayed

that  are

included

in

the

tab

failure  recording

QEE_ERR_CLASSIC.

The objective of this step is to disable the dialog failure recording.

If you know beforehand that you want to disable the dialog of the recording of measures as well,

you can save time by removing both dialogs in this step.

By  default,

the  dialog

for

the  recording  of  measures

is

in

the  column  Step  3:

QEE_MASS_CLASSIC".

-  Select the required CAQ workflow for recording inspection results

List of the available input types (status 16-JAN-2015):

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 60/70

Classic

QMS

Configuration AIP-QM

  MM_BE_ST_PP_SI
  MM_BE_ST_SI
  MM_BE_ST_PP_FS
  MM_BE_ST_FS
  MM_ME_ES_PP_SI
  MM_ME_ES_ST_SI
  MW_ME_ES_PP_SI
  MW_ME_ES_ST_SI

  MM_ME_ES_PP
  MW_ME_ES_PP
  MM_CO_ES_PP
  MW_CO_ES_PP
  MM_BE_ES_PP
  MW_BE_ES_PP
  MM_ME_ST_PP
  MM_CO_ST_PP
  MM_BE_ST_PP

-  Click the button Edit

-  Change to tab Steps

o  Delete the entry "QEE_ERR_CLASSIC" in this example in field Step 2

o  Delete the entry "S" in field Script, in this example on the right hand side of the field Step

2

Additional option:

o  Delete the entry "QEE_MASS_CLASSIC" in this example in field Step 3

o  Delete the entry "S" in field Script, in this example on the right hand side of the field Step

3

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 61/70

Configuration AIP-QM

-  Save the changes

-  The changes are only enabled after the activation of the Dialogs/Workflows

-  Further changes to configuration files or options are not necessary to enable the modifications in

the AIP terminal.

-  After  having  downloaded  the  respective  files,  the  changed  and  activated  dialogs  and  workflows

are available in the terminal (to do so: restart the terminal or download the dialog).

8.1.4  CAQ  workflow  "information  on  characteristics":  Configuration/customization  to  disable

tabs

-  Select the workflow information on characteristics "CHARACTERISTIC_INFO"

-  Click the button Edit

-  Change to tab Steps

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 62/70

Configuration AIP-QM

o  Delete the entry "QEE_ERROR" in this example in field Step 8

o  Delete the entry "S" in field Script, in this example on the right hand side of the field Step

8

Additional option:

o  Delete the entry "QEE_MASS" in this example in field Step 9

o  Delete the entry "S" in field Script, in this example on the right hand side of the field Step

9

-  The changes are only enabled after the activation of the Dialogs/Workflows

-  Further changes to configuration files or options are not necessary to enable the modifications in

the AIP terminal.

-  After  having  downloaded  the  respective  files,  the  changed  and  activated  dialogs  and  workflows

are available in the terminal (to do so: restart the terminal or download the dialog).

8.2  Disable list of automatic failures

8.2.1  Required minimum versions

-  The terminal script ZIP mpdv-aip.zip (at least version dated 15-FEB-2015) must be available.

-  The software caq_dc_t.dll (version >= 2.0.2.36) must be available.

8.2.2  System availability

AIP Classic  AIP QMS  Comments

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 63/70

Configuration AIP-QM

X

AIP QMS: does not use a list of automatic
failures

8.2.3  Motivation

The  list  of  automatic  failures  is  displayed  by  default.  The  recorded  inspection  results  are  used  to  create

this list.

If you want to accelerate the recording of inspection results, you can disable processing and display of the

automatic failure list.

Affected input types

The following input types support the display of automatic failure lists when recording

inspection results:

-

-

-

-

BEWERT_STICHPR_SIMPLE

BEWERT_STICHPR_PPUNKT_SIMPLE

MESSW_ESTCK_PPUNKT_SIMPLE

MESSW_ESTCK_STICHPR_SIMPLE

Further availabilities

You  can  disable  the  list  of  automatic  failures  in  the  following  contexts  (  see  also

Affected input types)

  When referring to an inspection point

  When referring to samples

IMPORTANT:

  By default, QMS does not process lists of automatic failures.

  By default, inspection charts do not support processing of automatic failure lists.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 64/70

8.2.4  Configuration / Customizing

The option 1214 is available as follows:

Configuration AIP-QM

Figure: Settings of option 1214

The value [SKIP_AET] in the field Addition is required to disable the "list of automatic

failures".

For

further

details

on

the

option,

please

refer

to

the

documentation

"Configuration_QM_Options".

8.3  Reducing dialog data

8.3.1  Required minimum versions

-  The configuration file .\packets\caq_slim_data.ini must be available.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 65/70

-  The software caq72.dll (version >= 2.0.2.28) must be available.

Configuration AIP-QM

8.3.2  System availability

AIP Classic  AIP QMS  Comments

X

X

8.3.3  Motivation

You can reduce to  a minimum the amount of (dialog) data that  is actually transferred into  a  workflow to

record inspection results.

By  reducing  data  quantity,  you  also  reduce  the  time  you  need  to  process  the  entire  data  for  the  display

and  processing  of  the  workflow.  Less  data  means  shorter  processing  times.  The  user  benefits  when

switching between the different nodes of the inspection list.

8.3.4  Configuration / Customizing

The option 1214 is available as follows:

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 66/70

Figure: Settings of option 1214

Configuration AIP-QM

The value [SLIM_DATA] in the field Addition is mandatory.

For

further

details

on

the

option,

please

refer

to

the

documentation

"Configuration_QM_Options".

8.4  Disabling control charts

8.4.1  Required minimum versions

-  The terminal script ZIP mpdv-aip.zip (at least version dated 15-FEB-2015) must be available.

-  The software caq_dc_t.dll (version >= 2.0.2.36) must be available.

8.4.2  System availability

AIP Classic  AIP QMS  Comments

X

AIP QMS: By default, control charts are
not available.

8.4.3  Motivation

If  you  want  to  accelerate  the  recording  of  inspection  results,  you  can  disable  processing  and  display  of

control charts.

If you disable the control chart in the recording of inspection results, you still have the possibility

to visualize control charts in the information on characteristics.

Affected input types

The  following  input  types  support  the  display  of  control  charts  when  recording

inspection results:

-

-

BEWERT_STICHPR_SIMPLE

BEWERT_STICHPR_PPUNKT_SIMPLE

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 67/70

Configuration AIP-QM

-

-

MESSW_ESTCK_PPUNKT_SIMPLE

MESSW_ESTCK_STICHPR_SIMPLE

Further availabilities

By default, QMS does not process control charts.

8.4.4  Configuration / Customizing

The option 1214 is available as follows:

Figure: Settings of option 1214

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 68/70

Configuration AIP-QM

The value [SKIP_RK] in the field Addition is mandatory.

If you only want to disable processing and display of control charts for specific input types, use

the respective status of the status type "ERFASSART". If you remove the parameter "[RK]“, you

disable the control chart function for this input type.

Terminal-specific activation using hytnrcfg.ini

You can override "option 1214" using the following configuration in hytnrcfg.ini.

As a prerequisite, "option1214" must be active and the value [SKIP_RK] must be set in the field

Addition.

Otherwise,  the  "option  1214"  is  identified  as  inactive  with respect  to the  settings  of  the  control

chart.  In  this  case,  you  could  not  override  the  option  and  the  control  charts  would  always  be

displayed in the CAQ dialogs showing the recorded inspection results.

The advantage of overriding the option is that you can make a setting of the control chart for a

specific terminal/terminal group.

The responsible flag in the section [CAQ->Optionen 0]

is:  MWE_RK

The following values are available for the flag MWE_RK:

  SKIP or

  SHOW

Case 1:

[CAQ->Optionen 0]

MWE_RK=SKIP

Override "option 1214"; processing and display of the control chart is disabled.

Case 2:

[CAQ->Optionen 0]

MWE_RK=SHOW

Override "option 1214"; processing and display of the control chart is enabled.

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 69/70

Restart the respective terminals to enable the modification.

Configuration AIP-QM

Configuration_AIP-QM.docx

Version: 1.17.20190

Page 70/70


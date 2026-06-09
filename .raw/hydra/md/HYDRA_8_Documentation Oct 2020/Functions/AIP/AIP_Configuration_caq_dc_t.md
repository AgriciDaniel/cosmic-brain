Local configuration file caq_dc_t.ini

1  Local configuration file caq_dc_t.ini

Some settings relating to functions of CAQ inspection data collection (AIP) can be modified individually in



the file caq_dc_t.ini.

These  settings  relating  to  the  function  DLL  of  the  same  name  (caq_dc_t.dll)  can  be  made  by  the

customer and/or as part of MPDV customizing.

Customizing: The customer may define versions specific to the system, terminal groups and terminals.

The  configuration  file  can  either  be  defined  in  relation  to  the  system,  terminal  group  or  the

terminal.

The file is stored according to the system by default.

The contents of configuration files that are specific to the system, the terminal or to the terminal

group are NOT merged.

Example of default AIP configurations:

\ ctnet\win\ctaip\functions\caq_dc_t.dll
\ ctnet\win\ctaip\functions\caq_dc_t.ini

Example of specific configurations:

\2\custom\aip\functions\caq_dc_t.ini
\2\custom\aip\functions\tgrp_999\caq_dc_t.ini
\2\custom\aip\functions\tnr_702\caq_dc_t.ini

Example of default AIP 8.2 configurations:

\ctnet\win\aip2\functions\caq_dc_t.dll
\ctnet\win\aip2\functions\caq_dc_t.ini

Example of specific configurations:

\1\custom\aip2\functions\caq_dc_t.ini
\1\custom\aip2\functions\tgrp_999\caq_dc_t.ini
\1\custom\aip2\functions\tnr_702\caq_dc_t.ini

AIP_Configuration_caq_dc_t.docx

Version: 1.6.5438

Page 1 of 6

Local configuration file caq_dc_t.ini

Changes to the caq_dc_t.ini file will not take effect until after the terminal software has been

restarted.

Entry

Comment

[OPTIONS] section

TIMER-CONTROLLER=[ON,OFF]

Option  to  control  the  "inspection  list"  GUI  /  data  entry

area  when  display  errors  occur  (e.g.  right  section

disappears  or  is  considerably  delayed  or  left  section

disappears or is considerably delayed).

Default    OFF

Example
TIMER-CONTROLLER=ON

PLEASE NOTE
Also refer to
the  manual  entitled  aa_ctaip_inbetr.pdf
Description  of
configuration / key word TIMER-CONTROLLER-MAIN

the  ctaip.ini

for  CAQ

/  section:
terminal

file

Available as of ctaip.exe version 2.0.3.26
Available as of caq_dc_t.dll version 2.0.2.34
Available  as  of  mpdv-aip.zip  from  29  September  2014
onwards

AIP_Configuration_caq_dc_t.docx

Version: 1.6.5438

Page 2 of 6

Local configuration file caq_dc_t.ini

Entry

Comment

.

The following side effects might occur if this option is used:

-  The  right  section  disappears  or  flickers  for  a  short  time;  GUI  recovers  automatically  after  a

short time

-  The left and right section remain open when  an attempt is made to minimize ctaip.exe (Ctrl +

ALT  +  F8)  if  the  CAQ  Inspection  Results  Recording  is  opened.  Therefore,  the  application

cannot be minimized completely if this is the case.

-  The right section hides the displayed screen if other dialogs or screens are opened that are not

directly related to the CAQ Inspection Results Recording. The proportion of the displayed other

dialog or screen varies subject to the resolution of the terminal. Consequently, working with the

terminal is more or less impeded. (e.g. timer display).

-  Moreover, CAQ Inspection Results Recording is still focused even if another dialog or screen is

opened. It might even be the case that it is difficult to make entries or entries cannot be made

at all in the other dialog or screen.

-  The scroll bar of the inspection list might respond jerkily.





AIP_Configuration_caq_dc_t.docx

Version: 1.6.5438

Page 3 of 6

Entry

Comment

[SYSTEM] section

Local configuration file caq_dc_t.ini

SCALE_FACTOR_INSPECTIONLIST=
[0-100]

Option  for  scaling  the  GUI  of  the  inspection  list/input

area  at  a  screen  ratio  of  16:9  (relating  to  the  AIP

display).

Default    5

The  greater  the  value,  the  smaller  the  display  area  for

the  “inspection  list”  and  the  greater  the  display  area  for

“input functions”.

The

value

can

be

changed

at

runtime.

Effective  once  the  “inspection  list”  is  opened  the  next

time.

EXAMPLE
SCALE_FACTOR_INSPECTIONLIST=20

The  warning  message  can  be  switched  off  by  setting
OFF.

[QUEUE_MODE_QM] section

QUEUE_WARNING_SWITCH

QUEUE_WARNING_RESTRICTION_GLOBAL  Message text for actions modifying data

Default: ON

is

Default  text:  Communication  with  the  HYDRA
server
restricted.
currently
Data  are  updated  as  soon  as  server
communication  runs  without  any  more
limitations and no dialog is open.

AIP_Configuration_caq_dc_t.docx

Version: 1.6.5438

Page 4 of 6

Local configuration file caq_dc_t.ini

Entry

Comment

QUEUE_WARNING_NOT_UPDATED

Message text indicating data that may not yet have been
updated.

Default text:
For  the  time  being,  communication  with
the HYDRA server is limited. The data may
not be up-to-date.

Message text for actions that need information from the
server.

Default text:
For  the  time  being,  communication  with
the  HYDRA  server  is  limited.  Data  cannot
be updated

By  setting  this  parameter,  it  is  no  longer  mandatory  to
enter  the  inspector.  But  the  "inspector"  field  is  not
removed from the dialog.
Subject  to  the  configuration  of  option  1130,  the  badge
number  can  be  checked/validated  by  the  server.  In  this
case,  the  parameter  "DO_CHECK_KNR“  must  not  be
set to "OFF“.
The  "inspector"  field  must  not  be  removed  from  the
dialogs as part of a configuration. It can only be removed
via (extended) customizing.

QUEUE_WARNING_NOT_UPDATABLE

[KNR] section

DO_CHECK_KNR=[ON,OFF]

[MW_TEIL] section

AIP_Configuration_caq_dc_t.docx

Version: 1.6.5438

Page 5 of 6

Local configuration file caq_dc_t.ini

Entry

Comment

ACRONYMS_MESSW_ESTCK_PPUNKT_SIMPL
E_PART=<MM.AKRONYME><MW.AKRONYME>

The  entry  includes  the  text  to  be  displayed  in  the
inspection list for the relevant tree item.

Context 
MESSW_ESTCK_PPUNKT_SIMPLE_PART

By
default
ACRONYMS_MESSW_ESTCK_PPUNKT_SIMPLE_PA
RT= MM.MMBEZ[~]MW.MW



It  is  possible  to  configure  several  columns.  The  single
columns are separated with a combination of characters
[~].

The specific prefix followed by a dot must be put in front
of each acronym.

Example
Displaying the OP sequence (AFO), characteristic name
and measured value
ACRONYMS_MESSW_ESTCK_PPUNKT_SIMPLE_PA
RT=MM.AFO[~]MM.MMBEZ[~]MW.MW

Warning:  valid
from  version  2.0.1.1  onwards.  The
previous  configuration  with  the  separator  [§]  instead  [~]
is still functioning.

AIP_Configuration_caq_dc_t.docx

Version: 1.6.5438

Page 6 of 6


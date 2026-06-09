Local Configuration File caq72.ini

1  Local Configuration File caq72.ini

You can change specific CAQ settings in the file "caq72.ini" stored in the directory

AIP 8.1

c:\ctaip\packets

AIP 8.2

c:\mpdv\aip2\packets

To  enable  the  changes  in  the  caq72.ini  configuration  file,  you  must  restart  the  terminal

software.

Entry

Comment

[QUEUE_MODE_QM] section

REFRESH_AT_RETURN=[YES,NO,ASK]  When you exit queue mode, you can select

=YES
automatically
=NO
not at all
upon request
=ASK
for the refreshing of CAQ data
Default  REFRESH_AT_RETURN=YES

REFRESH_QUERY=[ASK]

Message text for the query with REFRESH_QUERY=ASK

Section[LanguageSwitch]

SkipDataReCalc=[ON,OFF]

To  avoid  long  waiting  times,  you  can  suppress  the

changing of languages for the QM sector.

You  can  enable  this  option  at  runtime;  a  restart  is  not

necessary.

Default  SkipDataReCalc=OFF

AIP_Configuration_caq72.docx

Version: 1.3.14909

Page 1 of 3

Entry

Comment

MODE=[1,2]

Use  this  parameter  to  define  the  mode  for  changing  the

Local Configuration File caq72.ini

language.

MODE=1:

Only  the  MDBI  fields  of  the  lists  are  translated. With  this

mode,  the  data  that  is  already  loaded  in  the  CAQ  is  not

translated.  Different  languages  can  therefore  be  shown.

For example the characteristic designation/name

MODE=2:

The  complete  CAQ  data  structure

is

reloaded.

NOTE!  With  this  mode,  it  is  possible  that  the  data

displayed

is  not

identical

to

the  actual  data.  This

difference  is  possible  when  the  terminal  is  offline,  for

example.

Default  MODE=1

As of caq72.dll version 8.2.0.12. Only AIP 8.2!

[OPTIONS] section

MNR_REFRESH_NEW_METHOD=[ON,OFF]  The inspection status and inspection time of the machine

list are immediately  updated on the  main view of the  AIP

terminal  when  an  OP  including  CAQ  inspection  order  is

logged off or interrupted.

Requirement: The OP is  logged off or interrupted  directly

on the terminal (not on the MOC).

Default  MNR_REFRESH_NEW_METHOD=ON

As of caq72.dll version 2.0.2.24

The terminal must be restarted.

Section [DATACONTEXT_LAB]

ONLY possible with tile view! As of version 8.2.0.7

AIP_Configuration_caq72.docx

Version: 1.3.14909

Page 2 of 3

Local Configuration File caq72.ini

Entry

Comment

DATAPROVIDER_ID

ID of the data provider according to .\gui\globaldefines.xml

Default  DATAPROVIDER_ID= PPKTMNR

LOADCYCLE

List update cycle

Default  LOADCYCLE=XXX

LIST

List that is requested

Default  LIST=u_l_caq_insppoint_tnr

Section[DATACONTEXT_

ONLY possible with tile view! As of version 8.2.0.7

GOODS_RECEIPT]

DATAPROVIDER_ID

ID of the data provider according to .\gui\globaldefines.xml

Default  DATAPROVIDER_ID= PAUMNR

LOADCYCLE

List update cycle

Default  LOADCYCLE=XXX

LIST

List that is requested

Default  LIST=u_l_caq_inspstep_tnr

Section[DATACONTEXT_

ONLY possible with tile view! As of version 8.2.0.7

CALIBRATION]

DATAPROVIDER_ID

ID of the data provider according to .\gui\globaldefines.xml

Default  DATAPROVIDER_ID= PAUMNR

LOADCYCLE

List update cycle

Default  LOADCYCLE=XXX

LIST

List that is requested

Default  LIST= u_l_caq_inspstep_tnr

AIP_Configuration_caq72.docx

Version: 1.3.14909

Page 3 of 3


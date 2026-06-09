How to Switch Languages

1  How to Switch Languages

Purpose

Use the function to switch languages online via the AIP2 terminal.

Integration

You can switch languages for the licensed and installed language packs ("localization").

Requirements

You have purchased the license for the used language pack(s) ("localization").

You have configured the online language switching (see section How to configure language switching).

If you also want to show translated database contents (MDBI texts, e.g. status texts), you have to activate

and maintain these texts.

Terminal functions

The bottom taskbar of the AIP terminal shows the flag of the currently selected language. The flag has a

green frame to indicate that the AIP start screen is opened. In this case, you can change the language. If

you open another screen/dialog the frame around the flag turns red to indicate that language switching is

currently not possible.

AIP2-AOS_base.docx

Version: 1.3.22004

Page 1 of 5

If you click the flag, a menu appears where you can choose the available languages:

How to Switch Languages

The menu shows all configured languages. You can switch between a maximum of five languages.

If the terminal is offline, you cannot switch languages. An error message is displayed.

AIP2-AOS_base.docx

Version: 1.3.22004

Page 2 of 5

How to Switch Languages

2  How to configure language switching

2.1  Activation

Use the file hytnrcfg.ini to configure language switching.

Example:

[multiple_language 0]

alt_lang1=2;lkEnglish

alt_lang2=1;lkGerman

alt_lang3=4;lkFrench

alt_lang4=15;lkChinese

Add an entry alt_lang<x> with consecutive number for each language to the section  [multiple_language

0]. The language index of the required language follows after the equal sign. Then you find the name to

be displayed or the corresponding language key, separated by semicolon.

The displayed flag is stored in the archive pict.zip and has the file name LangFlag_<y>.png; y stands for

the corresponding language index.

The maximum number of languages that can be changed is restricted to 5 .

2.2

Instant updating of multilingual database contents

Available as of AIP version 8.2.2.34.

Service pack 16 provides this version.

If you use multilingual database contents and you switch languages, texts will only be displayed in other

languages  once  the  terminal  has  requested  the  data  anew  from  the  server.  Until  then  the  texts  of  the

previously  selected  language  are  displayed.  This  delay  might  take  some minutes  depending  on  system

configuration and the time of the last update.

You can configure the terminal to request all or specific lists from the server immediately after languages

have been switched. Consequently, texts will be displayed instantly in the newly selected language.

You  can  configure  this  in  the  same  section  of  the  file  hytnrcfg.ini  where  you  also  activate  language

switching.

Example:

AIP2-AOS_base.docx

Version: 1.3.22004

Page 3 of 5

How to Switch Languages

[multiple_language 0]

alt_lang1=2;lkEnglish

…

LST-RELOAD-ON-LANGUAGE-CHANGE=<ALL>

Use the entry "LST-RELOAD-ON-LANGUAGE-CHANGE=<ALL>“ to cause the AIP to request the data of

all below-mentioned lists from the server after languages have been switched.

If  the  terminal  still  sends  dialogs  to  the  server  (queue  is  not  empty)  when  languages  are

switched, the data is not updated immediately but only once all dialogs have been sent to the

server.

Updating  of  all  data  might  take  a  while,  subject  to  the  amount  of  data  and  the  infrastructure  of  your

system. Users cannot operate the terminal during that time. To reduce the required time, you can restrict

updating  to  your  most  important  lists.  Data  of  the  other  lists  will  be  reloaded  later  during  the  regular

update process.

Example:

[multiple_language 0]

alt_lang1=2;lkEnglish

…

LST-RELOAD-ON-LANGUAGE-CHANGE=MNR,MSTAT,AGRD,LOKVLIST

Use  the  following  acronyms  to  reload  only  specific  lists  with  texts  from  the  server  after  language

switching:

Acronyms
MNR
ANR
MSTAT
HZTYP
AGRD
ZLO
TPE
AART
MAT
RES
LOKVLIST

List
Machines
Orders
Machine status
Material types
Reasons (reasons for scrap and other quantity types)
Target locations
Transport units
Order types
List of input materials logged on
Resources
Sequencing lists of all assigned machines

Multilingual  database  contents  must  be  enabled  on  the  server.  This  document  does  not  deal

with the activation of multilingual database contents.

The  installation  manual  of  your  MES  Weaver  system  (MW)  provides  further  information  for

system  administrators.  Contact  MPDV  if  you  need  help  with  the  activation  of  multilingual

AIP2-AOS_base.docx

Version: 1.3.22004

Page 4 of 5

database contents on the server.

How to Switch Languages

AIP2-AOS_base.docx

Version: 1.3.22004

Page 5 of 5


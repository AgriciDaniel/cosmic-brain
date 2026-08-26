Manual

AIP Add-On Online Language
Switching
AIP-AOS 8.1

Version 1.1.23049

Last changed on: 01.09.2020

AIP Add-On Online Language Switching

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-AOS_81.docx

Version: 1.1.23049

Page 2 of 7

AIP Add-On Online Language Switching

Contents

1  Online Language Switching ......................................................................... 4

2  How to Switch Languages ............................................................................ 5

3  How to configure language switching .......................................................... 7

AIP-AOS_81.docx

Version: 1.1.23049

Page 3 of 7

AIP Add-On Online Language Switching

1  Online Language Switching

Purpose

The  function  package  is  useful  if  you  use  shop  floor  terminals  (AIP)  that  are  operated  in  different

languages.

Integration

The  AIP  online  language  switching  function  enables  to  display  data  according  to  the  licensed  and

installed language packs (localization). The component is available for the following HYDRA applications:

BDE  (Shop  Floor  Data  Collection),  MDE  (Machine  Data  Collection),  WRM  (Tool  and  Resource

Management), DNC, MPL (Material and Production Logistics), TRT (Tracking & Tracking), PDV (Process

Data Collection) and CAQ (Quality Management).

Features

The Acquisition  Information Panel (AIP) has been upgraded by a function for online language switching

for  AIP  input  dialogs  and  displays.  Switching  between  the  defined  languages  refers  to  the  static  texts

included in dialogs and displays and to data contents, provided that they support different languages and

are maintained in different languages.

AIP-AOS_81.docx

Version: 1.1.23049

Page 4 of 7

AIP Add-On Online Language Switching

2  How to Switch Languages

Purpose

Use the function to switch languages online via the AIP terminal.

Integration

You can switch languages for the licensed and installed language packs ("localization").

Requirements

You have purchased the license for the used language pack(s) ("localization").

You have configured the online language switching (see section How to configure language switching).

If  you  also  want  to  show  translated  database  contents  (MDBI  texts,  e.g.  status  texts),  you  have  to

maintain these texts in the database.

Terminal functions

The bottom taskbar of the AIP terminal shows the flag of the currently selected language. The flag has a

green  frame  to  indicate  that  you  have  opened  the  AIP  start  screen.  In  this  case,  you  can  change  the

language. If you open another screen/dialog the frame around the flag turns red to indicate that language

switching is currently not possible.

If you click the flag a menu appears where you can choose the available languages:

AIP-AOS_81.docx

Version: 1.1.23049

Page 5 of 7

AIP Add-On Online Language Switching

The menu shows all configured languages. You can switch between a maximum of five languages.

However,  languages  are  only  switched  if  the  code  page  set  for  the Windows  environment  supports  the

selected language. Consequently, you cannot switch between Chinese and German. But you can switch

between  German,  English,  Spanish  and  French  at  one  terminal,  as  code  page  850  supports  all  these

languages.

You  can  switch  between  Chinese  and  English  at  a  terminal  that  is  operated  with  code  page  936.

However, German is not available in this case, as umlauts cannot be displayed.

If the terminal is offline, you cannot switch languages. An error message is displayed.

AIP-AOS_81.docx

Version: 1.1.23049

Page 6 of 7

AIP Add-On Online Language Switching

3  How to configure language switching

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

You can switch between a maximum of five languages.

AIP-AOS_81.docx

Version: 1.1.23049

Page 7 of 7


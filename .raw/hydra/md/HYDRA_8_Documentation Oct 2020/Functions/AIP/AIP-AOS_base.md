How to Switch Languages

1  How to Switch Languages

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

AIP-AOS_base.docx

Version: 1.1.14875

Page 1 of 3

How to Switch Languages

The menu shows all configured languages. You can switch between a maximum of five languages.

However,  languages  are  only  switched  if  the  code  page  set  for  the Windows  environment  supports  the

selected language. Consequently, you cannot switch between Chinese and German. But you can switch

between  German,  English,  Spanish  and  French  at  one  terminal,  as  code  page  850  supports  all  these

languages.

You  can  switch  between  Chinese  and  English  at  a  terminal  that  is  operated  with  code  page  936.

However, German is not available in this case, as umlauts cannot be displayed.

If the terminal is offline, you cannot switch languages. An error message is displayed.

AIP-AOS_base.docx

Version: 1.1.14875

Page 2 of 3

How to Switch Languages

2  How to configure language switching

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

AIP-AOS_base.docx

Version: 1.1.14875

Page 3 of 3


Data Transfer via Excel

1  Data Transfer via Excel

Experience  has  taught  that  preparing  data  in  Microsoft  Excel™  delivers  the  best  results.  But  in  general

data  may  also  be  prepared  in  any  other  program.  The  paragraphs  that  follow  show  two  possibilities  of

data provision.

Data provision in Excel (file *.xls)

MPDV provides a sample file to prepare data in Excel. Selected master data have already been prepared

in this file.

The Excel file  provides a separate spreadsheet for each master data object  indicating the real name of

this object. The respective spreadsheets already include the available acronyms. The columns, which the

user has to fill out with user data, are highlighted in  yellow. The corresponding documents describe the

respective meaning of acronyms.

Every single spreadsheet  has to be saved as “text (tab delimited) (*.txt)” to  be  able to transfer the data

from the Excel worksheet into the HYDRA DLG format after completion.

BASE_FCT_XLS_2_DLG.docx

Version: 1.0.20932

Page 1 of 4

Data Transfer via Excel

The resulting text file (MLE-MDM.DLG in the above example) has to be reworked in a text editor. In this

case,  the  tabs  included  in  the  file  have  to  be  removed.  This  can  be  made  in  any  text  editor,  unless  it

provides this feature. The TextPad (www.textpad.com) program has proved its worth in this connection.

The procedure is described in an example on the basis of this program.

Once the file has been saved in the above-mentioned format in Excel, it is available as text file including

tabs.

These  tabs  may  now  be  removed  by  the  “search/replace”  function.  To  do  so,  select  a  tab,  start  the

search/replace function and replace the tab by ““ (nothing).

Now we have a file in the HYDRA DLG format that can be imported in HYDRA.

Data provision as text file (file *.DLG

A file in the HYDRA DLG format needs to be generated anyway, even if Excel is not used. Such a file has

the following, exemplary structure:

BASE_FCT_XLS_2_DLG.docx

Version: 1.0.20932

Page 2 of 4

Data Transfer via Excel

File import using the HYDRA server

The  file  can  also  directly  be  imported  to  HYDRA  on  the  HYDRA  server.  But  the  procedure  is  slightly

different for Windows and Unix.

File import with Windows

Connect  to  the  HYDRA  server  (e.g.  via  RemoteDesktop).  Start  the  Dos  box  from  the  HYDRA

administration  folder  on  the  desktop.  Please  choose  the  Dos  box  for  the  correct  system,  if  a  HYDRA

multi-system installation is in use.

Start the posting program in the Dos box as follows:

Hymwb.exe –d –u9999 –b<file name>   >  <file name>.pro

In case of the example from section 3:

Hymwb.exe –d –u9999 –bMLE-MDM.dlg   > MLE-MDM.pro

The  program  is  started  by  the  parameter  “-d”  with  developer  traces.  They  ease  the  diagnosis  if  errors

occur during the import. By entering the addition “> dlg.pro” the output is redirected into a log file, which

simplifies checking at a later point in time.

Please note: The import only works properly if the posting program is run in the HYDRA directory. The file

to  be  imported  may  be  stored  in  any  directory,  the  corresponding  path  has  to  be  indicated  in  the

parameter “-b”, e.g. „\importdir\datei.dlg“.

File import with Unix

Connect  to  the  HYDRA  server  (e.g.  via  Telnet).  Please  choose  the  correct  system  if  a  HYDRA  multi-

system installation is in use.

Start the posting program as follows:

hymwb.out –d –u9999 –b<file name (case sensitive!)>   >  DLG.pro

In case of the example from section 3:

hymwb.out –d –u9999 –bMLE-MDM.DLG   > MLE-MDM.pro

BASE_FCT_XLS_2_DLG.docx

Version: 1.0.20932

Page 3 of 4

Data Transfer via Excel

The  program  is  started  by  the  parameter  “-d”  with  developer  traces.  They  ease  the  diagnosis  if  errors

occur during the import. By entering the addition “> dlg.pro” the output is redirected into a log file, which

simplifies checking at a later point in time.

Please note: The import only works properly if the posting program is run in the HYDRA directory. The file

to  be  imported  may  be  stored  in  any  directory.  The  corresponding  path  has  to  be  indicated  in  the

parameter “-b”, e.g. „\importdir\datei.dlg“.

Import of object files

In  case  objects  include  files  (e.g.  DNC),  the  files  are  copied  to  the  target  folder  using  the  operating

system  functions.  This  can  happen  prior  to  or  after  the  BAPI  process.  But  file  management  and

processing  have  to  be  configured  beforehand.  This  depends  on  the  application  and  is  explained  in  the

corresponding documents dealing with the application (e.g. the resource type DNC including the correct

path configuration has to be created and configured).

BASE_FCT_XLS_2_DLG.docx

Version: 1.0.20932

Page 4 of 4


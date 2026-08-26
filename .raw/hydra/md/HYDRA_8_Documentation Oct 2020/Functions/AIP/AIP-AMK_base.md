the text that you want to appear here.

Error! Use the Home tab to apply Überschrift 1 to

1  AIP Add-On Multimedia Kit

This function packet makes it possible to display documents in a wide variety of formats in HYDRA.

On the one hand, there is the ability to display documents for operations (see below), however they can

also be displayed using the AIP DNC and CAQ functions.

Example for how a document is selected in the AIP BDE function:

General information

Documents, graphics or other files can be displayed from the table in the Documents index tab.

By  selecting  an  entry  in  the  list  and  touching/  clicking  on  the  Open  document  button,  the  file  is

downloaded to the AIP and, depending on the file extension, displayed either in an internal viewer or in an

external application.

Internal viewer

Supported  formats  for  internal  viewers:  txt,  ini,  avi,  tif,  tiff,  jpg,  jpeg,  dcx,  eps,  ico,  pcx,  pcc,  png,  ppm,

pgm, pbm, tga, vst, afi, wmf, emf, bmp.

Supported formats for an external HTML viewer: htm, gif, wmv, mpg,

External applications

If  file  formats  (file  extensions)  other  than  the  ones  described  above  are  used  (e.g.  PDF  files),  then

external applications must be installed. The customer is responsible for the installation. Error! Reference

source not found.

AIP-AMK_base.docx

Version: 1.0.1362

Page 1 of 2

the text that you want to appear here.

Error! Use the Home tab to apply Überschrift 1 to

Http links as document references

It is also possible to transfer http links to a browser for display  without having to download a file first. To

do  this,  a  path  with  the  "http"  protocol  must  be  used  (the  path  is  configured  at  the  console  via  File  >

System Administration > Paths).

These  links  are  displayed  in  the  internal  HTML  viewer  supplied  with  the  AIP.  In  this  case,  the  file

extension does not affect the selection of the viewer.

The files can also be displayed in the standard browser configured in Windows. To do this, the following

flag must be set in the file "hytnrcfg.ini":

[Terminal->USR 0]

HTTPBrowser=standard

This  setting  is  not  recommended  for  a  touch-screen  AIP  because  operating  a  browser  could  be

problematic.

AIP-AMK_base.docx

Version: 1.0.1362

Page 2 of 2


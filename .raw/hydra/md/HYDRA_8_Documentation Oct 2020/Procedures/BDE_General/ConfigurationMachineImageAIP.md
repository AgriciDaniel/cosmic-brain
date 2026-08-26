Configuring the machine image for the AIP

1  Configuring the machine image for the AIP

Purpose

You  can  display  the  image  of  the  workplace  in  the  AIP  shop  floor  software  (in  the  following  "machine

image"):





In the machine info (AIP 8.1 and AIP 8.2)

In the main view (only AIP 8.2).

Requirements

The

following

image

formats  are  supported:

jpg,  gif,  png,

tif,  bmp,

ico,  emf,  and  wmf.

File the images (files) in a directory that may be accessed from the AIP terminal via the path ID "HYDRA"

within the path configuration.

Log  your  Windows  user  on  to  the  AIP  and  access  the  directory.  Your  user  must  have  the  respective

authorization to access the directory.

Procedure

1.  Store the file to be displayed in a central directory that you can access from the AIP.  Make sure that

the Windows user in the AIP has the respective authorization to access the directory.

2.  Configure the logical path "HYDRA" in the Path configuration.

  Path: "HYDRA" (cannot be changed)

  Protocol: "file" (cannot be changed)

  Host: IP address or host name of the server where the graphic files are stored.

  Port: usually 0

  URL path: Enter the URL path as absolute path. Refer to the network directory where the graphic

files are stored.

In  case  of  a  HYDRA  server,  store  the  files  in  the  directory  <HYDRADIR>/<system>/grafik/bde

(<HYDRADIR>  is  the  directory  where  HYDRA  is  installed,  <system>  is  the  HYDRA  system

number).

Precede the URL path by a double backslash.

  User/password: Enter the user and the password of the Windows user to access the server. In case

of a HYDRA server, it is usually the user hydadm.

ConfigurationMachineImageAIP.docx

Version: 1.1.21172

Page 1 of 4

Configuring the machine image for the AIP

Sample path configuration

The graphic files are stored in the directory of the HYDRA server:

d:\hydra2\2\grafik\bde

Network share for the directory d:\hydra2 in the HYDRA server:

hydra2

Configuration:

3.  Enter a valid file name in the field "File name" of the application Workplace and resource configuration

(tab Workplace configuration).

4.  Restart the terminal software.

ConfigurationMachineImageAIP.docx

Version: 1.1.21172

Page 2 of 4

Configuring the machine image for the AIP

Result

The machine info in the AIP displays the machine image.

With AIP 8.2, the main view displays the machine image:

Troubleshooting

If the main view of the AIP 8.2 does not display the machine image after restart, restart the AIP 8.2 a second

time.

If the image is still not displayed, try the following:

  The following entry must be available in the log file prot_ev.txt, e.g.

16-10-16 13:32:57.763[+Loc]12260:URLDownload:

file,hydadm,hydadm,SCC7,0,\\hydra2\2\grafik\bde\60610.jpg,c:\ctaip\spool\60610.jpg,

16-10-16 13:32:59.320[+Loc]12260:URLDownload: => Res=0

In the row "URLDownload", the return code is displayed that the communication software has returned

during  download.  The  return  code  must  be  0  (Res=0).  The  log  file  is  written  in  the  subdirectory

c:\ctaip\spool (if the terminal software is installed in c:\ctaip).

The logging of the log file must be explicitly enabled in the terminal software. Only then, the entry

is displayed in the log file prot_ev.txt:

  You must have entered an absolute URL path in the MOC path configuration.

  The  user  that  accesses  the  directory  of  the  HYDRA  server  from  the  terminal  software  must  have

sufficient (read) access to this directory.

ConfigurationMachineImageAIP.docx

Version: 1.1.21172

Page 3 of 4

Configuring the machine image for the AIP

Only one image is downloaded from the HYDRA server.  If you want to change the image, you must first

delete the file in the spool directory of the terminal. Or you can enter the image using a different name in

the Workplace/resource configuration.

ConfigurationMachineImageAIP.docx

Version: 1.1.21172

Page 4 of 4


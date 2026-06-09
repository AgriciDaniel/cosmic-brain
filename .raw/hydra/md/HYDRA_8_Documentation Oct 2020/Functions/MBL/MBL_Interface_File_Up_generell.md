Synchronizing File Interfaces

1  Synchronizing File Interfaces

An  interface  program  on  an  upper-level  system  (payroll  system/  ERP  system)  assumes  the  function  of

preparing  the  data  structures  for  the  transferred  files  so  that  they  can  be  processed  in  batch  mode  or

edited as online transactions.

A handshake logic must be realized between the upper-level system and HYDRA in order to transmit the

transfer files so that no data is lost by "overwriting" the transfer files.

Use the following processing method to safely process the files:

  1.  Rename  the  interface  file  into  a  new  file.  You  do  this  in  Windows  NT  from  the  "ren"  or  "rename"

command and in UNIX using the "mv" command.

Please note:

When performing this step, do not use the copy command.

As long as HYDRA is processing the file, it does not exist under the documented name.

This ensures that the upper-level system only has access to the file if HYDRA has not

yet accessed it (secure handshake).

  2.  Copy the new file onto the target system.

  3.  After the new file has been successfully transferred, it must be deleted on the HYDRA server.

A HYD-ZHK module is available on HYDRA with which the automated interfacing can be transferred onto

HYDRA. On the PPS system, the files only need to be made available or picked up locally. The files are

then actually transferred from and to HYDRA and loaded into the HYDRA database by HYDRA.  You can

request  which  technical  requirements  exactly  are  needed  for  this  purpose  from  MPDV  project

management.

MBL_Interface_File_Up_generell.docx

Version: 1.0.1362

Page 1 of 1


Configuration of File Connections
1 Configuration of File Connections
File Server (MES inbound processing)
Parameter Value
INTERFACE_PATH This directory includes the files to be transferred to
HYDRA. From there they are copied to the working
directory (WORK_PATH).
WORK_PATH The files are transferred from the working directory
to HYDRA. The file transferred at last is stored in
this directory with the extension ".SAV“.
File Client (MES outbound processing)
Parameter Value
INTERFACE_PATH This directory includes the files to be transferred to
the partner system. The partner system can collect
the files there.
INTERFACE_EXT The interface extension refers to the extension of
the finished file. If the interface directory includes a
file with this extension it may be collected from the
partner system. The file name is determined by the
corresponding message type.
WORK_PATH When data are provided, they are first entered in
the working directory (WORK_PATH). Once
completed, they are transferred from the working
directory to the interface directory
(INTERFACE_PATH). If this directory already
includes a file it will not be transferred from the
working directory to the interface directory. The file
stored in the working directory is extended/new
rows are added until the interface directory is free
again.
MLE_Config_File-Connections.docx Version: 1.0.1362 Page 1 of 2

|     |     | Configuration of File Connections  |
| --- | --- | ---------------------------------- |

MLE_Config_File-Connections.docx  Version: 1.0.1362  Page 2 of 2
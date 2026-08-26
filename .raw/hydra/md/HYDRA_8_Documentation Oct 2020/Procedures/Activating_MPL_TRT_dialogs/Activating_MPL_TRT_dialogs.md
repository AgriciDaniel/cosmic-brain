Activating new MPL/TRT dialogs (SP13)

1  Activating new MPL/TRT dialogs (SP13)

Purpose

With  service  pack  13,  new  and  updated  dialogs  are  available  for  MPL  and  TRT.  This  documentation

describes how to import these dialogs into HYDRA.

Requirements

Service pack 13 must be installed and activated.

For new customers, the new/updated MPL or TRT dialogs are directly available once the service

pack 13 has been released.

Procedure

1.  Open the MS-DOS prompt of the HYDRA system where you want to import the dialogs.

2.  For UNIX or Windows systems, enter the following commands in the MS-DOS prompt.

  UNIX systems:

hymw.out -u9999 -b"db_sql/dlg_mpl82_2.dlg"

  Windows systems:

hymw.exe -u9999 -b"db_sql/dlg_mpl82_2.dlg"

3.  To execute the commands, press the Enter key. The dialogs are imported for the type "AIPDEF"

and user "999" in HYDRA.

Depending on how the dialogs are used, you must copy the imported dialogs. You can use the imported

dialogs to overwrite the standard delivery or you can use the dialogs for a specific terminal group or terminal

only.

1.  Copy the required dialogs.

2.  Activate the copied dynamic dialogs.

3.  Restart the terminals.

Result

The MPL or TRT dialogs, which are available as of service pack 13, have been copied into the system.

Activating_MPL_TRT_dialogs.docx

Version: 1.1.20928

Page 1 of 2

Dialog

CA_WL_MPL

BATCH_MERGE

BATCH_SPLIT

CE_HU

CE_DEL_HU

Activating new MPL/TRT dialogs (SP13)

Name

Change output batch

Merge batches

Split batch

Input: Pack batch

Unpack transport unit (TPU)

BATCH_UNMERGE

Unmerge merged batch

Activating_MPL_TRT_dialogs.docx

Version: 1.1.20928

Page 2 of 2


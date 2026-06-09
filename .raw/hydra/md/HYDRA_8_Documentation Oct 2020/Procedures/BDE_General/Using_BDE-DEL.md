Deleting transaction data

1  Deleting transaction data

Purpose

If you want to delete the data previously recorded in the system, e.g. before going live, you can use the

script "bde_del.scr".

You can delete the following data types with the above-mentioned script:



In the online data area: BDE and MDE log records, event data of BDE, MDE, MPL and PDV as well as

document assignments of the maintenance/activity calendar



In the long-term data area: BDE and MDE log records, event data of BDE, MDE, MPL and PDV as well

as document assignments of the maintenance/activity calendar

  Order backlog data of the online data area (the script can exclude order backlog data of specified order

types from deletion)

  Order backlog data of the long-term data area (the script can exclude order backlog data of specified

order types from deletion)

  WRM log records and WRM event data of the online and long-term data area

  MPL  batch  inventory  data,  batch  assignments,  batch  logs,  document  assignments  and  goods

movements of the online and long-term data area

  MLE data of inbound transactions and MLE data of outbound transactions of the online and long-term

data area

While running the script, you can define which data types you want to delete.

Perform the following steps in the HYDRA server:

HYDRA server with operating system Windows

1.  Call the folder "HYDRA administration" on the desktop.

2.  Start the HYDRA manager and shut down HYDRA.

3.  Run the MS-DOS prompt "MS-DOS HYDRA 1" (the number specifies the required HYDRA system).

4.  Create a database export:

Input: hyexport hydra

5.  Perform the following command:

Input: sh bde_del.scr [order type-1 order type-2 …]

order type-n is optional: the order backlog data of the order type entered here may not be deleted.

Example: sh bde_del.scr 0 PDV

If you do not specify any order types, the order backlog data of all order types are deleted.

Using_BDE-DEL.docx

Version: 1.1.20944

Page 1 of 2

Deleting transaction data

While running the script, you can define, which data types you want to delete.

6.  After having performed deletion, restart HYDRA using the HYDRA manager.

HYDRA server with operating system Linux

1.  Connect to the HYDRA server, e.g. via Telnet. Perform the following command:

Input: hysys.scr -1 (the number specifies the required HYDRA system).

2.  Shut down HYDRA

Input: hy_down.scr

3.  Create a database export:

Input: hyexport.scr hydra

4.  Perform the following command:

Input: bde_del.scr [order type-1 order type-2 …]

order type-n is optional: the order backlog data of the order type entered here may not be deleted.

Example: bde_del.scr 0 PDV

If you do not specify any order types, the order backlog data of all order types are deleted.

While running the script, you can define which data types you want to delete.

5.  Restart HYDRA after having performed deletion.

Input: hy_start.scr

Using_BDE-DEL.docx

Version: 1.1.20944

Page 2 of 2


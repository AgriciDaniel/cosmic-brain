MPL-TRA - Reserve Transport Order

1  Reserve Transport Order

Overview

License

MPL-TRA

Usage

The functionality described below enables a logical reservation to be made for the operation of a transport

order.

Prerequisite

The database patch dbp_mpl_transportation.hsc must have been run.

The  Initial  status  I  and  Prepared  status  (V)  must  be  configured  in  the  status  assignment

for the order type. It must be possible to change the status I manually.

Features

The BAPI call TRANR.RESERVE performs the following checks

  The transport order operation must exist and be in the Initial (I) status.

  As an option, the staff badge number is checked if it is transmitted (KNR)

Result of BAPI call TRANR.RESERVE:

  The transport operation is planned on the currently selected machine.

  The OP status of the transport order changes from Initial (I) to Prepared (V).

MBL_TranspOrderReservation.docx

Version: 1.0.1362

Page 1 of 1


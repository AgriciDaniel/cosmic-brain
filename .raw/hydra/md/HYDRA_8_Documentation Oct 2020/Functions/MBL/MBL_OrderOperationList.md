MPL-TRA - Transport Orders

1  Sequencing List - Transport Orders

Overview

License

MPL-TRA

Usage

The  functionality  described  below  provides  additional  data  in  the  sequencing  list  (LIST;11)  for  entering

transport orders.

Prerequisite

The data base patch dbp_mpl_transportation.hsc must have been run.

The list will only show orders which are configured for display in the sequencing list at the

terminal. To display the functionality at the terminal, it is necessary for running operations

of this transport order type, too, to be included in the list.

Features

Extended data fields for entering transport orders in the ANR list (LIST;11):

Transport type (AGR_TRANR_ART)

This defines which type of transport is intended for the operation.

L = Batch-related transport

R = Resource transport

A = Article-related transport

Assigned resource (AGR_TRANR_RES) and resource type (AGR_TRANR_RESTYP)

Resource number for transport type R

Assigned batch

(AGR_TRANR_CNR)

Number of batch for transport type L

Source material buffer (AGR_TRANR_SMP)

Material buffer from which the transport is to be started.

MBL_OrderOperationList.docx

Version: 1.0.1362

Page 1 of 2

MPL-TRA - Transport Orders

Target material buffer (AGR_TRANR_TMP)

Material buffer to which the object is to be transported.

Triggering operation  (AGR_TRIGGER_ANR)

Production operation which created the transport order (e.g. scheduled operation through planning

or operation which created the batch for transport).

Configuration

The additional columns in the sequencing list are to be activated at the terminal via the AKRO mechanism

in the ctaiplay.ini/n file.

MBL_OrderOperationList.docx

Version: 1.0.1362

Page 2 of 2


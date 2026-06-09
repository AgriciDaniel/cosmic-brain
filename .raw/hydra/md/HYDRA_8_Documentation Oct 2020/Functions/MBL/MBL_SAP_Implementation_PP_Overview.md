PP-PDC integration in HYDRA

1  PP-PDC integration in HYDRA

Purpose

If the ERP system and HYDRA are connected via the PP-PDC interface, the subsystem must be able

to  receive  the  IDocs  generated  by  SAP  ECC  and  to  integrate  them  in  the  HYDRA  process.  HYDRA

also  generates  IDocs  from  the  recorded  downloads/confirmations  and  transfers  them  to  SAP  ECC.

SAP ECC triggers both workflows.

SAP  provides  several  standard  BAPIs  /  IDOcs  as  part  of  the  PP-PDC  interface  to  establish

communication with BDE subsystems. The following BAPIs / IDocs are used:

Download operations:

IDoc type:

PPCC2RECORDER01

Segment type:

E1BP_PP_PDC_OPERA2

BAPI segment:

BAPI_PP_PDC_OPERA2

Request uploads:

IDoc type:

PPCC2REQCONF

Segment type:

E1PPCC2REQCONF

BAPI segment:

BAPI_PP_PDC_PARAM

Upload time tickets:

IDoc type:

PPCC2PRETTICKET01

Segment type:

E1BP_PP_TIMETICKET

BAPI segment:

BAPI_PP_TIMETICKET

Unlike the previous interface, the communication channel 2, the new PP-PDC interface is completely

based  on  BAPI  and  RFC.  This  means  that  the  SAP  transceiver  is  no  longer  required  and  that  new

RFC servers and clients are implemented in HYDRA. In HYDRA these new components communicate

with SAP ECC and constitute the interface itself.

SAP ECC  HYDRA (download operation data)

HYDRA RFC server

The  HYDRA  RFC  server  logs  in  to  the  SAP  gateway.  The  RFC  server  receives  the  incoming

IDocs  and  stores  them  to  the  HYDRA  database.  Then  the  HYDRA  process  responsible  for

transferring data to the HYDRA data model is started.

MBL_SAP_Implementation_PP_Overview.docxVersion: 1.2.18468

Page 1 of 3

PP-PDC integration in HYDRA

BAPI / IDoc types

SAP ECC uses SAP  workflow processes to trigger the download of data to HYDRA. Basically,

the  standard  PP-PDC  interface  provides  three  IDoc  structures.  The  HYDRA  RFC  server

receives these IDoc structures: OPERA2 (initial / delta download), OPERA1 (deletion requests)

and REQCONF (confirmation/upload requests).

Operation data (OPERA2)

An IDoc of the type PPCC2RECORDER01 transfers the operations. Depending on the entry in

the segment E2PPCC2RECORDER000, it is either an initial download or a delta download. The

segment E2BP_PP_PDC_OPERA2 includes operation data.

Deletion download (OPERA1)

An IDoc of the type PPCC2RECORDER01 transfers the  operations. When it comes to a  delta

download, the segment E2BP_PP_PDC_OPERA1 can transfer the keys of the  operations that

are to be deleted.

Upload request (REQCONF)

An IDoc of the type PPCC2REQCONF transfers the request to upload time tickets. If this IDoc

type is received, it is an upload request.

OPERA2

OPERA1

REQCONF

Initial download

Delta download

Deletion download

Upload request

PPCC2RECORDER01  PPCC2RECORDER01  PPCC2RECORDER01

PPCC2REQCONF01

E2PPCC2RECORDER  E2PPCC2RECORDE

R

INIT

INIT

X

E2PPCC2RECORDE
R

E2PPCC2REQCONF

INIT

REQTT

X

IDoc type

Segment
name

Field

Entry

HYDRA  SAP ECC (upload)

SAP ECC  asks for the upload of time  tickets (L20 / L40). As an option, HYDRA can also start

the upload at regular intervals, irrespective of an upload request.

HYDRA RFC client

The  HYDRA  RFC  client  uploads  the  time  tickets.  The  client  is  started  as  part  of  a  HYDRA

workflow. At this time, the data is available ready for dispatch in the database.

Data  is  transferred  asynchronously  as  IDoc.  Once  transferred,  a  defined  SAP  ECC  workflow

processes and posts the data.

Time tickets

An IDoc of the type PPCC2PRETTICKET01 of the standard PP-PDC interface transfers the time

tickets. The segment E2BP_PP_TIMETICKET includes the time ticket data.

MBL_SAP_Implementation_PP_Overview.docxVersion: 1.2.18468

Page 2 of 3

PP-PDC integration in HYDRA

In general, the following SAP time ticket record types are uploaded:

  L20 – Partial confirmation (reporting part quantities/times)

  L40 – Final confirmation (reporting total quantities/times)

MBL_SAP_Implementation_PP_Overview.docxVersion: 1.2.18468

Page 3 of 3


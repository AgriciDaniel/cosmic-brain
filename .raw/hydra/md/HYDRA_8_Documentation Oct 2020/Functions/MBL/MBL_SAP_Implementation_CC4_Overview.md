Implementation of SAP-PSCC4

1

Implementation of SAP-PSCC4

Summary

Usage

Within the framework of HYDRA being connected to SAP PS, it is HYDRA's task to collect data relevant

to  PS  and  to  upload  it  to  SAP.  PS  project  orders  transferred  from  SAP  to  HYDRA  represent  the  data

base.

SAP  triggers  the  download  of  PS  project  systems  (PP-PDC  /  CC4).  Data  is  transferred  in  an  IDoc

(Intermediate Document) and entered in HYDRA.

SAP also controls the upload of PS project orders according to the user's requirements.

SAP provides several IDOcs as part of the PP-PDC interface to establish communication with BDE sub-

systems. These IDocs are used:

Download of PS project orders (PP-PDC / CC4):

IDoc type:

OPERA4

Message type:

OPERA4

Message function:

APP / DEL / UPD

Segment type:

OPERA4

Download of the PS upload request (PP-PDC / CC4):

IDoc type:

Message type:

Message function:

REQUI4

REQUI4

Segment type:

REQUI4

MBL_SAP_Implementation_CC4_Overview.docxVersion: 1.0.1362

Page 1 of 2

Implementation of SAP-PSCC4

Upload of project orders (PP-PDC / CC4):

IDoc type:

CONF42

Message type:

CONF42

Segment type:

CONF7

Download operation/master data SAP  HYDRA

HYDRA RFC server

The HYDRA RFC server registers to the SAP gateway. It receives the incoming IDocs and stores

them to the HYDRA database. Then the HYDRA process responsible for the transfer to the HYDRA

data model is started.

IDoc types

Downloading of data to HYDRA is triggered by R/3 through SAP workflow processes.

The operations are transferred in an IDoc of the type OPERA4. This either refers to an initial, delta

or deletion download.

The upload request is transferred in an IDoc of the type REQUI4. If HYDRA receives this request,

the uploads already included in HYDRA interface tables will be transferred to HYDRA.

In addition, it is possible to download activity types for workplaces from SAP. This data transfer has

been  implemented  as  initial  download.  Consequently,  the  activity  types  existing  in  HYDRA  are

deleted and replaced by the new ones transferred from SAP.

Uploads HYDRA  SAP

Uploads  are  transferred  cyclically  from  HYDRA  as  well  as  from  SAP  R/3.  To  this  end,  the  interface

provides different options so that specific requirements can be met.

HYDRA RFC client

The HYDRA RFC client is responsible for uploads. It is started as part of a HYDRA workflow. At this

point in time, the database provides the data ready for dispatch.

Data is transferred asynchronously as IDoc. Once data has been transferred, it  will be processed

and posted by the defined workflow in R/3.

IDoc types

Uploads are transferred to SAP R/3 either by HYDRA or SAP R/3 in an IDoc of the type CONF42.

MBL_SAP_Implementation_CC4_Overview.docxVersion: 1.0.1362

Page 2 of 2


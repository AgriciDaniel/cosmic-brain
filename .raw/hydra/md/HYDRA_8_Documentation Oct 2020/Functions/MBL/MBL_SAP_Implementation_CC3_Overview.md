Mapping of the SAP-PMCC3 in HYDRA

1  Mapping of the SAP-PMCC3 in HYDRA

Summary

In the course of a connection of HYDRA to SAP PM, HYDRA must collect PM-relevant data and transfer

them  to  SAP.  The  base  data  here  are  PM-maintenance  and  service  orders  transferred  from  SAP  to

HYDRA.

The  download  trigger  for  PM-maintenance  orders  (PP-PDC  /  CC3)  comes  from  SAP.  The  data  are

transferred as IDoc (intermediate document) and maintained in HYDRA.

The upload of the confirmations for PM maintenance orders is controlled via SAP in accordance with the

requirements specified by the user.

To  realize  the  communication  with  the  BDE  subsystems,  SAP  provides  several  IDocs  via  the  PP-PDC

interface. The following IDocs are used:

Download of PM maintenance orders (PP-PDC/ CC3):

IDoc type:

OPERA3

Message type:

OPERA3

Message function:

APP/ DEL/ UPD

Segment type:

OPERA3

Download of PM upload requests (PP-PDC/ CC3):

IDoc type:

Message type:

REQUI3

REQUI3

Message function:

REQUI3

Segment type:

REQUI3

Upload of confirmations of maintenance orders (PP-PDC/ CC3):

IDoc type:

CONF32

Message type:

CONF32

MBL_SAP_Implementation_CC3_Overview.docxVersion: 1.0.1362

Page 1 of 3

Mapping of the SAP-PMCC3 in HYDRA

Segment type:

CONF5

Download of operation data SAP HYDRA

The operations are transferred in an IDoc of the  OPERA3 type. This may be an initial, delta or deletion

download.

The  upload  request  is  transferred  in  an  IDoc  of  the  REQUI3  type.  When  this  is  received  in  HYDRA,

confirmations that exist already in HYDRA interface tables will be transferred to SAP.

Upload of confirmations HYDRA  SAP

Confirmations  are  uploaded  either  cyclically  from  HYDRA  or  from  SAP  R/3.  The  interface  offers

numerous options to this end so that the specific requirements can be mapped.

The  transfer  of  confirmations/uploads  to  SAP  R/3  is  either  controlled  by  HYDRA  or  by  SAP  R/3  and  is

made in an IDoc of the CONF32 type.

MBL_SAP_Implementation_CC3_Overview.docxVersion: 1.0.1362

Page 2 of 3

Mapping of the SAP-PMCC3 in HYDRA

MBL_SAP_Implementation_CC3_Overview.docxVersion: 1.0.1362

Page 3 of 3


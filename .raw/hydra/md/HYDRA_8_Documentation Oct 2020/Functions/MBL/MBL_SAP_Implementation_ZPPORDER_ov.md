Survey of the data flow

1  Survey of the data flow

All data are exchanged per tRFC/IDoc via the above-mentioned physical system interface of both systems.

How often the file transfer is executed depends on the desired response times.

SAP system  HYDRA

The following overview shows the structure of data that can be taken over by the SAP system. The letter n

behind  means that several (0-n) segments can be adopted. 1 signifies that only max. 1 such segment

can be taken over.

  Production order data

 1 Order header

 n long texts (order header)

  1 user fields (order header)

 n series of operations

 n material components

 n production resources and tools: resources

 n production resources and tools: documents

 n long texts (series of operations)

 1 user fields (series of operations)

 1 specific data for the coil-based manufacturing

 n production variants

 n order network

 n delete operations

HYDRA  PPS

  Confirmations of series of operations (time tickets)

 Confirmations of time tickets (using PP-PDC)

MBL_SAP_Implementation_ZPPORDER_ov.docxVersion: 1.1.6881

Page 1 of 1


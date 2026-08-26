SAP - Remote Function Call

1  SAP - Remote Function Call

Definition

The Remote Function Call (RFC) is the base technology for a system-wide call of programs on SAP R/3

and/ or ECC or partner systems. RFC will be triggered by the RFC client and be transferred to the partner

system's server. The following variants are known:

Synchronous  RFC  (sRFC):  the  calling  program  will  wait  until  the  called  function  module  has  been

processed and the results been transferred.

Asynchronous RFC (aRFC), It will be determined whether the called system is available but  it won't be

waited until processing is completed.

Transactional  RFC  (tRFC),  the  called  system  will  be  responsible  for  the  execution  of  all  function

modules  or  -  in  the  event  of  errors  -  ensure  that  no  changes  will  be  made.  tRFC  runs  also  in

asynchronous mode. It is the basis for the IDoc communication.

GLOSSARY_SAP_RFC.docx

Version: 1.0.1362

Page 1 of 1


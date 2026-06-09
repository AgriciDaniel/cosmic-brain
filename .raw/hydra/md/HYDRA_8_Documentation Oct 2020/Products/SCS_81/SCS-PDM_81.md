Manual
Production Data Manager
SCS-PDM 8.1
Version 1.0.23049
Last changed on: 02.09.2020

Production Data Manager
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior
written permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SCS-PDM_81.docx Version: 1.0.23049 Page 2 of 356

Production Data Manager
Contents
1 HYDRA Production Data Manager............................................................. 13
2 HYDRA Production Data Manager - Technology ....................................... 15
2.1 Overview ........................................................................................................... 15
2.2 General notes on using the HYDRA Production Data Managers ....................... 16
2.3 SCS-PDM Client Libraries ................................................................................. 16
2.3.1 Online connection “external interface“ (ddcom) ..................................... 16
2.3.2 Online/offline connection “communication DLL“ (hyextcom) .................. 27
2.3.3 Offline connection “batch“ or “I-Doc“ ...................................................... 30
2.3.4 Online connection "external interface“ to Windows terminal
(ctcom32) .............................................................................................. 34
3 HYDRA Production Data Manager - Preface ............................................. 40
3.1 Header data of the dialog data .......................................................................... 40
3.2 Common notes .................................................................................................. 41
3.3 Field data .......................................................................................................... 42
3.4 Return values .................................................................................................... 42
3.5 BAPI call reference to the data model ............................................................... 43
3.6 Lock mechanism for BAPI calls ......................................................................... 43
4 HYDRA Production Data Manager Basis - Data Collection ....................... 44
4.1 Reading time from HYDRA server ..................................................................... 44
4.2 Sending terminal status ..................................................................................... 45
4.3 Reloading lists on the terminal .......................................................................... 48
4.4 Generating MLE outbound segments ................................................................ 50
4.5 Generating logging entry ................................................................................... 51
4.6 Generating entry for dialog error log .................................................................. 52
4.7 Triggering escalation ......................................................................................... 53
5 HYDRA Production Data Manager Basis - Master Data ............................ 58
5.1 Note on the descriptions of the basic dialogs..................................................... 58
5.2 Terminal configuration ....................................................................................... 58
5.2.1 Edit terminal configuration (DLG=TNR.INSERT, UPDATE,
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ............................. 58
SCS-PDM_81.docx Version: 1.0.23049 Page 3 of 356

Production Data Manager
5.2.2 List for terminal configurations (DLG=TNR.LIST) ................................... 59
5.2.3 Leave terminal update (DLG=TNR.PROGLADEN) ................................ 60
5.2.4 Restart terminal (DLG=TNR.NEUSTART) ............................................ 61
5.2.5 Terminal administration (DLG=TNR.ADMIN) ......................................... 62
5.3 Function authorizations ..................................................................................... 64
5.3.1 Edit function authorizations (DLG=BEARBFKT.INSERT,
UPDATE, DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ............. 64
5.3.2 List of function authorizations (DLG=BEARBFKT.LIST) ........................ 65
5.4 Function profiles ................................................................................................ 67
5.4.1 Edit function profile (DLG=FKTPROF.INSERT, UPDATE,
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ............................. 67
5.4.2 List function profile (DLG=FKTPROF.LIST) ........................................... 68
5.5 Responsibility profiles ........................................................................................ 70
5.5.1 Edit responsibility profile (DLG=VABPROF.INSERT, UPDATE,
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ............................. 70
5.5.2 Responsibility Profiles (DLG=VABPROF.LIST) ..................................... 71
5.6 Assignment responsibility areas ........................................................................ 73
5.6.1 Edit assignment responsibility areas
(DLG=BEARBVABPROF.INSERT, UPDATE, DELETE, COPY,
LOCK, UNLOCK, NEW, SELECT) ......................................................... 73
5.6.2 Assignment list (DLG=BEARBVABPROF.LIST) .................................... 74
5.7 User administration ........................................................................................... 76
5.7.1 Edit user (DLG=BEARB.INSERT, UPDATE, DELETE, COPY,
LOCK, UNLOCK, NEW, SELECT) ......................................................... 76
5.7.2 User list (DLG=BEARB.LIST) ................................................................ 77
5.7.3 User login (DLG=BEARB.LOGIN) ......................................................... 78
5.7.4 User logout (DLG=BEARB.LOGOUT) ................................................... 79
5.8 Locked data records .......................................................................................... 80
5.8.1 Delete locked data records (DLG=BEARBFKT.DELETE) ..................... 80
5.9 Paths ................................................................................................................. 82
5.9.1 Edit paths (DLG=PATH.INSERT, UPDATE, DELETE, COPY,
LOCK, UNLOCK, NEW, SELECT) ......................................................... 82
5.9.2 Path list (DLG=PATH.LIST) ................................................................... 83
5.10 Licensing ........................................................................................................... 84
5.10.1 Edit licenses (DLG=LIC.INSERT, DELETE) .......................................... 84
5.10.2 License list (DLG=LIC.LIST) .................................................................. 85
SCS-PDM_81.docx Version: 1.0.23049 Page 4 of 356

Production Data Manager
5.11 Client ................................................................................................................. 86
5.11.1 Client login and logout (DLG=CLIENT.LOGIN, LOGOUT) ..................... 86
5.12 INI configuration ................................................................................................ 86
5.12.1 INI - edit configuration (DLG=INI.INSERT, UPDATE, DELETE,
COPY, LOCK, UNLOCK, NEW, SELECT, IMPORT, EXPORT) ............. 86
5.12.2 INI list - configurations (DLG=INI.LIST) ................................................. 88
5.12.3 Edit INI sections (DLG=INIDATA.INSERT, UPDATE, DELETE,
COPY, LOCK, UNLOCK, NEW, SELECT) ............................................. 88
5.12.4 List of the INI sections (DLG=INIDATA.LIST) ........................................ 89
5.13 Number ranges ................................................................................................. 90
5.13.1 Edit number ranges (DLG=NRKREIS.INSERT, UPDATE,
DELETE, LOCK, UNLOCK) ................................................................... 90
5.13.2 Number range list (DLG=NRKREIS.LIST) ............................................. 92
5.13.3 Create new numbers (DLG=NRKREIS.CREATENR) ............................ 92
6 HYDRA Production Data Manager BDE/MDE - Data Collection ............... 94
6.1 Note on the descriptions of the input dialogs ..................................................... 94
6.2 Order, staff and machine postings ..................................................................... 95
6.2.1 Note on automatically recorded quantities ............................................. 95
6.2.2 Notes on manually recorded quantities .................................................. 96
6.2.3 Collection of user fields ......................................................................... 99
6.2.4 Log operation on (DLG=A_AN) ............................................................ 100
6.2.5 Log operation and person on (DLG=A_P_AN) ..................................... 101
6.2.6 Posting of part quantity (Partial confirmation) (DLG=A_TR) ................. 102
6.2.7 Interrupt operation (DLG=A_UN) ......................................................... 102
6.2.8 Log operation off (DLG=A_AB) ............................................................ 103
6.2.9 Finish operation (DLG=A_BE) ............................................................. 104
6.2.10 Quantity upload (DLG=A_MR) ............................................................. 105
6.2.11 Log person on (DLG=P_AN)................................................................ 106
6.2.12 Log person off (DLG=P_AB) ................................................................ 106
6.2.13 Log off all persons from machine (DLG=P_AAB) ................................. 106
6.2.14 Change machine status (DLG=M_MST) .............................................. 107
6.2.15 Automatic status update (DLG=M_AST) .............................................. 108
6.2.16 Change of the target quantity (DLG=A_SMG) ..................................... 109
6.2.17 Change of target cycle (DLG=M_SZY) ................................................ 109
6.2.18 Change of partitioning (DLG=M_TLG) ................................................. 110
SCS-PDM_81.docx Version: 1.0.23049 Page 5 of 356

Production Data Manager
6.2.19 Logging of the production lock (DLG= M_PSPERRE) ......................... 110
6.2.20 BDE comment (DLG=HY_BEM) .......................................................... 111
6.3 Postings made with shift change ..................................................................... 111
6.3.1 Shift end (A_AUN) ............................................................................... 111
6.3.2 Beginning of shift (A_AAN) .................................................................. 112
6.3.3 Shift change (A_ASW) ......................................................................... 112
6.4 Reading BDE/MDE data .................................................................................. 113
6.4.1 Machine info ........................................................................................ 113
6.4.2 Reading the shift calendar ................................................................... 122
6.4.3 Order list .............................................................................................. 123
6.4.4 Personnel list ....................................................................................... 131
6.4.5 Operator positions/functions of machines ............................................ 132
6.4.7 Machine status list ............................................................................... 132
6.4.8 Deviation reasons ................................................................................ 134
6.4.9 Premium indicator ............................................................................... 135
6.4.10 Terminal list ......................................................................................... 136
6.4.11 Comments on operations..................................................................... 140
6.4.12 Order components (BOM) ................................................................... 141
6.4.13 Scrap reason list .................................................................................. 143
6.4.14 BDE order types .................................................................................. 144
6.4.15 List of counters .................................................................................... 145
6.4.16 List providing the assignment of workplaces to MDE shop floor
clients .................................................................................................. 146
6.5 Reading HLS data ........................................................................................... 147
6.5.1 Production variants .............................................................................. 147
6.7 Annex .............................................................................................................. 149
6.7.1 Overview of field data BDE/MDE ......................................................... 149
6.7.2 Optional field data for the premium and incentive wages LLE .............. 152
6.7.3 Tips and tricks ..................................................................................... 153
7 HYDRA Production Data Manager BDE - Master Data ........................... 154
7.1 Note on the Descriptions of the Basic Dialogs ................................................. 154
7.2 BDE Log Records ........................................................................................... 154
7.2.1 Create log record (DLG=ADEPRO.INSERT, COPY) ........................... 154
7.2.2 Edit log record (DLG=ADEPRO.UPDATE, DELETE, LOCK,
UNLOCK, SELECT) ............................................................................ 156
SCS-PDM_81.docx Version: 1.0.23049 Page 6 of 356

Production Data Manager
7.2.3 Sign log record (DLG=ADEPRO.SIGN) ............................................... 160
7.2.4 List of fields (acronyms) for the ADEPRO dialog ................................. 161
7.3 Configuration of Data Collection ...................................................................... 170
7.3.1 Reason Texts ...................................................................................... 170
7.3.2 Reasons .............................................................................................. 172
7.4 Order Management and Order Sequencing ..................................................... 174
7.4.1 Lock order/operation for editing (ANR.LOCK) ...................................... 174
7.4.2 Unlock order/operation for editing (ANR.UNLOCK) ............................. 176
7.4.3 Plan operation (ANR.EINPLANEN) ..................................................... 176
7.4.4 Deallocate operation (ANR.AUSPLANEN) .......................................... 177
7.4.5 Block operation (ANR.SPERREN) ....................................................... 178
7.4.6 Unlock operation (ANR.ENTSPERREN) .............................................. 179
7.4.7 Update operation (ANR.AKTUALISIEREN) ......................................... 180
7.4.8 Release operation (ANR.FREIGEBEN) ............................................... 180
7.4.9 Change order status (ANR.SETSTATUS) ........................................... 181
7.4.10 Change operation status (ANR.SETSTATUS) ..................................... 182
7.4.11 Create order (ANR.INSERT) ............................................................... 184
7.4.12 Edit order (ANR.UPDATE) ................................................................... 186
7.4.13 Copy order (ANR.COPY) ..................................................................... 188
7.4.14 Delete order (ANR.DELETE) ............................................................... 190
7.4.15 Select order (ANR.SELECT) ............................................................... 191
7.4.16 Order – Select all operations (ANR.LIST) ............................................ 192
7.4.17 Create operation (ANR.INSERT) ......................................................... 194
7.4.18 Edit operation (ANR.UPDATE) ............................................................ 196
7.4.19 Copy operation (ANR.COPY) .............................................................. 198
7.4.20 Delete operation (ANR.DELETE) ......................................................... 199
7.4.21 Select operation (ANR.SELECT) ......................................................... 201
7.4.22 Split operation (ANR.SPLITCREATE).................................................. 202
7.4.23 Cancel operation split (ANR.SPLITDELETE) ....................................... 204
7.4.24 Enhanced operation split (ANR.ADVSPLITCREATE) .......................... 205
7.4.25 Create merged operation (ANR.SAGINSERT) ..................................... 207
7.4.26 Delete merged operation (ANR.SAGDELETE) .................................... 208
7.4.27 Lock order network for editing (ANETZ.LOCK) .................................... 209
7.4.28 Unlock order network for editing (ANETZ.UNLOCK) ............................ 210
7.4.29 Create order network (ANETZ.INSERT) .............................................. 211
7.4.30 Edit order network (ANETZ.UPDATE) ................................................. 212
SCS-PDM_81.docx Version: 1.0.23049 Page 7 of 356

Production Data Manager
7.4.31 Delete order network (ANETZ.DELETE) .............................................. 212
7.4.32 Update order network (ANETZ.AKTUALISIEREN) .............................. 213
7.4.33 Lock material list for editing (MATLIST.LOCK) ................................... 214
7.4.34 Unlock material list for editing (MATLIST.UNLOCK) ............................ 215
7.4.35 Create material list (MATLIST.INSERT) .............................................. 216
7.4.36 Edit material list (MATLIST.UPDATE).................................................. 217
7.4.37 Delete material list (MATLIST.DELETE) .............................................. 218
8 HYDRA Production Data Manager MDE - Master Data ........................... 221
8.1 Note on the descriptions of the basic dialogs................................................... 221
8.2 Machine configuration ..................................................................................... 221
8.2.1 Edit machine configuration (DLG=MNR.INSERT, UPDATE,
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ........................... 221
8.2.2 List of machines/workplaces (DLG=MNR.LIST) ................................... 222
8.2.3 Read shift information of the machine (DLG=MNR.SKINFO) ............... 223
8.3 Status texts ..................................................................................................... 224
8.3.1 Edit status texts (DLG=MSTTXT.INSERT, UPDATE, DELETE,
LOCK, UNLOCK, SELECT) ................................................................. 224
8.3.2 List of status texts (DLG=MSTTXT.LIST)............................................. 225
8.4 Status classes ................................................................................................. 226
8.4.1 Edit status classes (DLG=STKL.INSERT, UPDATE, DELETE,
LOCK, UNLOCK, SELECT) ................................................................. 226
8.4.2 List of status classes (DLG=STKL.LIST) ............................................. 227
8.5 Machine status configuration ........................................................................... 227
8.5.1 Edit valid machine statuses (DLG=MST.INSERT, UPDATE,
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ........................... 227
8.5.2 List machine status (DLG=MST.LIST) ................................................. 230
8.6 Counter configuration ...................................................................................... 230
8.6.1 Edit counter configuration (DLG=MNRCTR.INSERT, UPDATE,
MODIFY, DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ........... 230
8.6.2 List of counter configuration (DLG=MNRCTR.LIST) ............................ 232
8.7 Assignment of machine/workplace to terminal ................................................. 233
8.7.1 Edit assignment (DLG=MNRTNR.INSERT, DELETE,SELECT) ........... 233
8.7.2 List of assignments (DLG=MNRTNR.LIST) ......................................... 234
8.8 Group assignment ........................................................................................... 234
SCS-PDM_81.docx Version: 1.0.23049 Page 8 of 356

Production Data Manager
8.8.1 Edit group assignment (DLG=GRPRES.INSERT, UPDATE,
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ........................... 234
8.8.2 List of group assignments (DLG=GRPRES.LIST) ................................ 236
8.9 Groups ............................................................................................................ 236
8.9.1 Edit groups (DLG=GRP.INSERT, UPDATE, DELETE, COPY,
LOCK, UNLOCK, NEW, SELECT) ....................................................... 236
8.9.2 List of group assignments (DLG=GRPRES.LIST) ................................ 238
8.10 MDE postings .................................................................................................. 238
8.10.1 Create posting (DLG=MDEPRO.INSERT, COPY) ............................... 238
8.10.2 Edit posting (DLG=MDEPRO.UPDATE, DELETE, LOCK,
UNLOCK) ............................................................................................ 240
8.10.3 List of fields (acronyms) for the MDEPRO dialog ................................. 241
9 HYDRA Production Data Manager MPL - Data Collection ...................... 245
9.1 Please note for the posting dialogs described ................................................. 245
9.2 Batch Postings ................................................................................................ 245
9.2.1 Batch change (DLG=CA_WL) .............................................................. 245
9.2.2 Log input batch on (DLG=CE_AN) ...................................................... 248
9.2.3 Log input batch off (DLG=CE_AB) ....................................................... 249
9.2.4 Repost batch (DLG=C_UMB) .............................................................. 250
9.2.5 Goods receipt batch (DLG=C_GEN) .................................................... 251
9.2.6 Consumption posting (DLG=A_VERB) ................................................ 252
9.2.7 Create/change batches (DLG=CNR.MODIFY) .................................... 253
9.2.8 Goods movement (DLG=C_MBEW) .................................................... 256
9.2.9 Change batch status (DLG=C_STA) .................................................... 258
9.2.10 Input batch change (DLG=CE_WL) ..................................................... 259
9.3 Reading of MPL Data ...................................................................................... 260
9.3.1 Material list / batch information ............................................................ 260
9.3.2 Material buffer ..................................................................................... 264
9.3.3 Material types ...................................................................................... 265
9.3.4 Transport unit ...................................................................................... 267
9.3.5 Component list .................................................................................... 267
9.3.6 Batch attributes of a material type ....................................................... 268
9.3.7 Batch logs (MPL-PRO) ........................................................................ 270
9.4 Process of Changing Output Batches .............................................................. 272
9.4.1 Input batch data ................................................................................... 272
SCS-PDM_81.docx Version: 1.0.23049 Page 9 of 356

Production Data Manager
9.4.2 Output batch data ................................................................................ 272
9.4.3 Output batch change ........................................................................... 272
9.4.4 Job end ............................................................................................... 272
9.5 Packing and Palletizing (MPL-PAL) ................................................................. 272
9.5.1 Assign batches (DLG=CE_AN_PA) ..................................................... 273
9.5.2 Delete batch assignment (DLG=CE_DEL_PA) .................................... 273
9.5.3 Complete TPU (DLG=CA_WL_PA) ..................................................... 273
9.5.4 List with assigned batches for active TPU ........................................... 274
9.6 Annex .............................................................................................................. 275
9.6.1 Summary of MPL field data ................................................................. 275
10 HYDRA Production Data Manager MPL - Master Data ........................... 278
10.1 Please note for the basic dialogs described .................................................... 278
10.2 Quantity Changes ........................................................................................... 279
10.2.1 Quantity change affecting several products ......................................... 279
10.3 MPL – Master Data ......................................................................................... 280
10.3.1 MPL Setup .......................................................................................... 280
10.3.2 Material types ...................................................................................... 280
10.3.3 Material buffer ..................................................................................... 281
10.3.4 Transport units .................................................................................... 282
10.4 HYDRA-MPL – Movement Data ...................................................................... 284
10.4.1 Batch stock .......................................................................................... 284
10.4.2 Material movements ............................................................................ 293
10.4.3 Cutting plan ......................................................................................... 296
10.5 Transport management (MPL-TRA) ................................................................ 297
10.5.1 Create transport order ......................................................................... 297
10.5.2 Reserve transport order ....................................................................... 299
10.5.3 Start transportation order ..................................................................... 299
10.5.4 Finish transportation order ................................................................... 300
11 HYDRA Production Data Manager PDV - Master Data ........................... 302
11.1 Please note for the basic dialogs described .................................................... 302
11.2 Events ............................................................................................................. 302
11.2.1 Edit event (DLG=PDVEVENTCFG.INSERT, UPDATE, DELETE,
COPY, LOCK, UNLOCK, SELECT) ..................................................... 302
11.2.2 List of events (DLG=PDVEVENTCFG.LIST) ........................................ 303
SCS-PDM_81.docx Version: 1.0.23049 Page 10 of 356

Production Data Manager
11.3 Logical Channels ............................................................................................. 304
11.3.1 Edit logical channels (DLG=LOGCHAN.INSERT, UPDATE,
DELETE, COPY, LOCK, UNLOCK, SELECT) ..................................... 304
11.3.2 List of logical channels (DLG=LOGCHAN.LIST) .................................. 306
11.4 Characteristic Attribute .................................................................................... 308
11.4.1 Edit characteristic attributes (DLG=PAUMMAUSP.INSERT,
UPDATE, DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ........... 308
11.4.2 List of characteristic attributes (DLG=PAUMMAUSP.LIST) ................. 310
12 HYDRA Production Data Manager WRM - Data Collection ..................... 312
12.1 Please note for the posting dialogs described ................................................. 312
12.2 WRM Editing Dialogs ...................................................................................... 312
12.2.1 Log resource on (DLG=RES_AN) ........................................................ 312
12.2.2 Log resource off (DLG=RES_AB) ........................................................ 312
12.2.3 Set resource status (DLG=RES_STATUS) .......................................... 313
12.2.4 Release resource (DLG=RES_FREI) .................................................. 315
12.2.5 Change resource status to “status after logging OP off”
(DLG=RES_ABSTA) ........................................................................... 315
12.2.6 Repost resource (DLG=RES_UMB) .................................................... 316
12.2.7 Mount resource (DLG=RES_EIN) ........................................................ 316
12.2.8 Demount resource (DLG=RES_AUS) .................................................. 317
12.3 DNC Dialogs ................................................................................................... 318
12.3.1 Load DNC resource to the machine (DLG=RES_DOWNL) .................. 318
12.3.2 Upload DNC resource from the machine (DLG=RES_UPLOAD) ......... 320
12.4 Lists for DNC-Data .......................................................................................... 323
12.4.1 Enhancement of BDE lists ................................................................... 323
12.4.2 Machines – DNC family (DLG=LIST;82) .............................................. 323
12.4.3 Loadable DNC programs (DLG=LIST;83) ............................................ 324
12.5 WRM Maintenance Dialog ............................................................................... 327
12.5.1 Maintenance status and activation (DLG=RES_WART) ...................... 327
12.6 WRM Measures Dialog ................................................................................... 328
12.6.1 Activate measure (DLG=RES_MASS) ................................................. 328
12.7 Lists for Resource Data ................................................................................... 329
12.7.1 Resource list (DLG=LIST;115) ............................................................. 329
12.7.2 Resource Status List (DLG=LIST;116) ................................................ 330
12.7.3 List of measures (DLG=LIST;117) ....................................................... 331
SCS-PDM_81.docx Version: 1.0.23049 Page 11 of 356

Production Data Manager
12.7.4 Resource types (DLG=LIST;118) ........................................................ 332
12.7.5 Resource family (DLG=LIST;119) ........................................................ 333
12.7.6 Resource maintenance (DLG=LIST;120) ............................................. 334
12.7.7 List of maintenance activities (DLG=LIST;91) ...................................... 335
12.7.8 List of resource comments(DLG=LIST;133) ......................................... 336
12.7.9 List of registered resources (DLG=LIST;129) ...................................... 336
12.7.10 Combined list of production resources and tools: batch and
resources (DLG=LIST;132) ................................................................. 337
13 HYDRA Production Data Manager WRM - Master Data .......................... 340
13.1 Note on the descriptions of the input dialogs ................................................... 340
13.2 Resources ....................................................................................................... 340
13.2.1 Edit resources (DLG=RES.INSERT, UPDATE, DELETE, COPY,
LOCK, UNLOCK, NEW, SELECT) ....................................................... 340
13.2.2 Resource list (DLG=RES.LIST) ........................................................... 342
13.3 Free attributes ................................................................................................. 343
13.3.1 Edit free attributes (DLG=RESATTR.INSERT, UPDATE,
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT) ........................... 343
13.3.2 List of resource attributes (DLG=RESATTR.LIST) ............................... 345
13.3.3 List of field definitions (DLG= USRFLDELEM.LIST) ............................ 346
13.4 Resource list ................................................................................................... 347
13.4.1 Edit resource list (DLG=RESLIST.INSERT, DELETE) ......................... 347
13.4.2 Resource list (DLG=RESLIST.LIST) .................................................... 349
13.5 Assignment to required resources ................................................................... 349
13.5.1 Edit assignments to required resources
(DLG=RESBEDRES.INSERT, DELETE, COPY, ) .............................. 349
13.6 Resource families ............................................................................................ 352
13.6.1 Edit resource families (DLG=RESFAM.INSERT, UPDATE,
DELETE, LOCK, UNLOCK, NEW, SELECT) ....................................... 352
13.7 Resource maintenances .................................................................................. 353
13.7.1 Edit resource maintenances (DLG=RESWART.INSERT,
UPDATE, DELETE, COPY, LOCK, UNLOCK) ..................................... 353
SCS-PDM_81.docx Version: 1.0.23049 Page 12 of 356

Production Data Manager
1 HYDRA Production Data Manager
Purpose
The HYDRA Production Data Manager is a data interface that enables all kinds of data to be
exchanged using the HYDRA system. They might include, for example, order, human resources,
machine and process data provided by external BDE/ PZE systems, data concentrators, machine
controls or similar systems.
The data are transferred to the HYDRA database where they are processed further in the installed
HYDRA applications.
Requirement: external systems are able to operate the HYDRA Production Data Manager in HYDRA
standard format.
The HYDRA Production Data Manager can be used, for example, to transfer entry data for MDE/ BDE/
PZE/ LLE/ ZKS directly into the HYDRA system or to retrieve data from HYDRA without using a
terminal for entry.
Data can also be transferred or retrieved that would otherwise normally be entered into or retrieved
from HYDRA clients.
The data can be transferred to HYDRA online or offline using an external application.
Implementation considerations
You use this component if:
 You want to exchange data with HYDRA yourself or via 3rd party applications
 You want to connect existing applications to HYDRA
Integration
The HYDRA Production Data Manager provides its own program library as well as related interface
calls for integration.
Features
 Programming libraries:
o For integration into the user-defined application
 Function descriptions:
SCS-PDM_81.docx Version: 1.0.23049 Page 13 of 356

Production Data Manager
o Based on the HYDRA objects and their functions
 Special workshops:
o for objective-oriented integration and use of the HYDRA Production Data Manager
SCS-PDM_81.docx Version: 1.0.23049 Page 14 of 356

Production Data Manager
2 HYDRA Production Data Manager - Technology
2.1 Overview
There are different mechanisms to connect to third-party systems. The sections that follow describe
the individual options in more detail:
Online connection “external interface” (ddcom)
In online mode data are directly sent from the external system (on HYDRA server or another
server within the network) to HYDRA and processed there by a library (ddcom) using TCP/IP.
The library is available as 32 bit DLL in Windows and as library in different UNIX derivatives.
Online/offline connection "communication-DLL“ (hyextcom)
If an external system is supposed to be connected, which however does not have the above-
mentioned library, data can be sent directly to HYDRA where they are buffered and processed
at a later point in time by means of a special communication service using a communication
DLL.
 This communication DLL is only available for Windows at the moment.
Offline connection "Batch“
In offline mode ASCII files, which are checked and taken over to the system by a HYDRA
process, are transferred to HYDRA.
Online connection “external interface“ to Windows terminal (ctcom)
In online mode data are directly sent from the external system (on Windows terminal or another
Windows computer within the network) to a Windows terminal and processed by means of a
library (ctcom) using TCP/IP.
 Subject to the sent data, a special processing is required for the Windows terminal if this
interface is used for the connection. The sent data are prepared, posted locally and sent to
the HYDRA server.
 The library is only available as DLL for Windows at the moment.
Using these interfaces, order postings, personnel postings, quantity postings and status
postings, among other things, or other data records can be transferred to HYDRA in online or
offline mode via an external application. Moreover order information, machine information etc.
can be requested in list form in online mode.
SCS-PDM_81.docx Version: 1.0.23049 Page 15 of 356

Production Data Manager
2.2 General notes on using the HYDRA Production Data
Managers
The user has to consider the following points when using HYD-PDM:

To avoid errors:
The SCS-PDM interface requires the dialog data to be in the correct chronological order.
If data are sent and their chronological order is wrong errors in determining quantities and activities
will occur. In addition to this, unintentional plausibility errors might arise due to wrong plausibility
checks. Consequently, data records might be rejected.
2.3 SCS-PDM Client Libraries
2.3.1 Online connection “external interface“ (ddcom)
The library ddcom exchanges data with the server via TCP/IP using several network libraries of NET-
WSK (pl. see figure). The server answers requests and, if necessary, generates lists that may also be
read using the library ddcom. In Windows NT the libraries are combined as DLL and in UNIX they are
combined as libraries.
SCS-PDM_81.docx Version: 1.0.23049 Page 16 of 356

  Production Data Manager

|     | Server interface |     | Server interface |       | Server interface |     | Server interface |     |
| --- | ---------------- | --- | ---------------- | ----- | ---------------- | --- | ---------------- | --- |
|     | Dialog data      |     |                  | files | Dialog data      |     | Files            |     |
TCP/IP sockets
|     |     | Socket | Socket |     |     | Socket | Socket |     |
| --- | --- | ------ | ------ | --- | --- | ------ | ------ | --- |
LAN
TCP/IP sockets
|     |     | Socket       | Socket |              |     | Socket      | Socket |     |
| --- | --- | ------------ | ------ | ------------ | --- | ----------- | ------ | --- |
|     |     | hyslb32.dll  |        | WSK II Basis |     | libhyslb.a  |        |     |
|     |     | hyclnt32.dll |        | WSK II Datei |     | libhyclnt.a |        |     |
|     |     | tcpsh32.dll  |        | WSK II API   |     | libtcpsh.a  |        |     |
|     |     | ddcom32.dll  |        | DD API       |     | libddcom.a  |        |     |
|     |     | Client       |        |              |     | Client      |        |     |
|     |     | Windows NT   |        |              |     | UNIX        |        |     |

| 2.3.1.1  |     | Initialization of the interface  |     |     |     |     |     |     |
| -------- | --- | -------------------------------- | --- | --- | --- | --- | --- | --- |
The interface to HYDRA has to be initialized when starting the program. If the initialization process is
not successful the external interface can continue working OFFLINE but it has to be initialized
successfully before data will be sent.
int ddinit(char *host, short user);
| host  | Host name or IP address  |     |     |     |     |     |     |     |
| ----- | ------------------------ | --- | --- | --- | --- | --- | --- | --- |
Using a host name can lead to delays in the communication if the resolution of the host
name into the IP address via a DNS server is slow. We recommend using the IP address.
| user  | HYDRA user number  |     |     |     |     |     |     |     |
| ----- | ------------------ | --- | --- | --- | --- | --- | --- | --- |
Unique  user  number  of  the  shop  floor  device  or  concentrator.  The  user  number  is
determined by 3000 + “terminal number“. Terminal 1 (if the shop floor device is directly
connected) or concentrator 1 (if several shop floor devices are connected) corresponds to
the HYDRA user number 3001 etc.

|     | Please note:   |     |     |     |     |     |     |     |
| --- | -------------- | --- | --- | --- | --- | --- | --- | --- |
The  numbering  3000  +  "terminal  number“  is  intended.  As  separate  processes  are
established, which do not depend on real terminal processes. However, the number “USR”
entered in the dialog string (pl. see below) must be 2000 + "terminal number“.

| SCS-PDM_81.docx  |     |     |     |     | Version: 1.0.23049  |     |     | Page 17 of 356  |
| ---------------- | --- | --- | --- | --- | ------------------- | --- | --- | --------------- |

Production Data Manager
Return values of the function (communication errors)
0
Initialization successful
1 Initialization of Windows sockets incorrect (ddinit() only)
2 No port found for “Hydra file server“ (ddinit() only)
3
No port found for a HYDRA interface (e.g. “HYDRA LANT-DD server 1“) (ddinit() only)
4
Unable to build up a connection
5
Dispatch cancelled with error
6
Reception cancelled with error
7
Connected to wrong interface
8
(Local) interface operates offline at the moment
9
Error in opening a file via the “HYDRA file server“
10
Error in reading a file via the “HYDRA file server“
11
Error in writing in a file via the “HYDRA file server“
12
Error in closing a file via the “HYDRA file server“
13
Data is not yet available
23
Interface has not yet been initialized successfully
24
Synchronization with server failed (automatic re-initialization)
2.3.1.2 Sending of dialog data
int ddsend(char *dd, short *dberr);
dd Dialog data, max. 1024 Bytes
Please note:
If the ddcom32.dll is used with Delphi , the passed pointer dd has to point at a data field of
at least 1024 bytes.
dberr 0 = successful, > 0 errors occurred (data base error)
This parameter has to be indicated because of compatibility reasons but it is no longer used
for dialog data. The value set in dberr is undefined.
Return values of the function (communication errors)
0 Data sent
1 Initialization of Windows sockets is incorrect (ddinit() only)
2 No port found for “HYDRA file server“ (ddinit() only)
3
No port found for a HYDRA interface (e.g. “HYDRA LANT-DD-Server 1“) (ddinit() only)
4
Unable to build up a connection
5
Dispatch with error cancelled
6
Reception with error cancelled
7
Connected to wrong interface
SCS-PDM_81.docx Version: 1.0.23049 Page 18 of 356

Production Data Manager
8
(Local) interface offline at the moment
9
Error in opening a file via the “HYDRA file server“
10
Error in reading a file via the “HYDRA file server“
11
Error in writing in a file via the “HYDRA file server“
12 Error in closing a file via the “HYDRA file server“
13
Data is not yet available
23
Interface has not yet been initialized successfully
24
Synchronization with server failed (automatic re-initialization)
SCS-PDM_81.docx Version: 1.0.23049 Page 19 of 356

Production Data Manager
2.3.1.3 Receiving the result
int ddreceive(char *dd, short *dberr);
dd Dialog data, max. 1024 bytes
Please note:
If the ddcom32.dll is used with Delphi the transferred pointer dd has to point at a data field
of at least 1024 bytes.
dberr 0 = successful, > 0 errors occurred (data base error)
This parameter has to be indicated because of compatibility reasons but it is no longer used
for dialog data. The value set in dberr is undefined.
Return values of the function (communication errors)
0 Data received
Initialization of Windows sockets is incorrect (ddinit() only)
1
2
No port found for “HYDRA file server“(ddinit() only)
3
No port found for a HYDRA interface (e.g. “HYDRA LANT-DD-Server 1“) (ddinit() only)
4
Unable to build up a connection
5
Dispatch cancelled with error
6
Reception cancelled with error
7
Connected to wrong interface
8
(Local) interface operates OFFLINE at the moment
9
Error in opening a file via the “HYDRA file server“
10
Error in reading a file via the “HYDRA file server“
11
Error in writing in a file via the “HYDRA file server“
12 Error in closing a file via the “HYDRA file server“
13
Data is not yet available
23
Interface has not yet been initialized successfully
24
Synchronization with server failed (automatic re-initialization)
The function ddreceive() has to be called as long as the function returns “13” (pl. see the example
code below). When the function returns “0“ data have been received, if the function does neither return
“0“ nor “13“ the connection to the HYDRA process does no longer exist. In this case, either the server
did not accept the command within 10s (adjustable via the function “int ddmaxsendwait(int sec);“) or
processing of the command takes more than 120s (adjustable via “int ddmaxrecvwait(int sec);“).
Having received an error code that is unequal “0“ and “13“, sending of data is impossible for 600s
(adjustable via “int ddminoffline(int sec);) to prevent the connected system from always getting in a
timeout when a HYDRA process is finished (e.g. for service reasons). (Please see offline phase).
SCS-PDM_81.docx Version: 1.0.23049 Page 20 of 356

Production Data Manager
Before going offline, data should be buffered in a file. The subsequent transfer to HYDRA has to be in
the correct chronological order ("top down“ pl. also see chapter General notes on using the ).
"Sleep“ has to be implemented between the different reception cycles to prevent the system from an
overload:
ret = ddsend(stempelsatz,&dberr);
if (ret == 0)
{
do
{
ret = ddreceive(resultat,&dberr);
if (ret == 13)
sleep(1); /* Unix + Windows */
} while (ret == 13)
/* Fehlerverarbeitung von ret */
...
}
else
{
/* Fehlerverarbeitung von ret und ggf. dberr */
...
}
If the communication is effective (return value of the function ddreceive is 0) the return values (return
code RET) within dialog data have to be evaluated to see whether the command was successful or
not.
SCS-PDM_81.docx Version: 1.0.23049 Page 21 of 356

Production Data Manager
2.3.1.4 Reading of files
2.3.1.5 Requesting lists
Lists are requested via special commands and filed in the HYDRADIR\spool\ directory. The procedure
of requesting lists is the same as it is for "sending dialog data” and "receiving the result" with the only
difference that afterwards the list is transmitted from the server to the client.
int ddsend(char *dd, short *dberr);
dd Dialog data, max. 1024 bytes
dberr 0 = successful, > 0 errors occurred (database error)
Return values of the function (communication error)
please see above
Example
Access authorizations are made available, for example, via the command DLG=LIST;27. The structure
of dialog data for the shop floor device with terminal number 4 is as follows:
"DLG=LIST;27|DATEI=.\spool\hyu2004.c27|DAT=03/30/2001|ZEI=36003|USR=2004|...“
SCS-PDM_81.docx Version: 1.0.23049 Page 22 of 356

Production Data Manager
2.3.1.6 Receiving the result and reading the list
int ddreceive(char *dd, short *dberr);
dd Dialog data , max. 1024 bytes
dberr 0 = successful, > 0 errors occurred (data base error)
Return values of the function (communication error)
please see above
Provided that data have been received (>=0) and dberr = 0 the data are included in the indicated file
within the directory HYDRADIR\spool\ - in our example the valid access authorizations.
Attention
When interpreting data, the field abbreviations of the 1st line are supposed to be interpreted. For
future versions it might be the case that the sequence of the columns changes or new
columns are inserted in any place. Such columns with unknown field abbreviation have to be
ignored and mustn't lead to a program error or to the program being terminated.
The file is read with the following function:
int ddgetfile(char *remotefile, char *localfile);
{File name} (field ID FILE) as it is indicated for the request within the dialog data.
Remote
file
localfile Local file name
Return values of the function (communication error)
0 File read
< 0 Communication error
8
(Local) interface operates OFFLINE at the moment
10
Error while reading from the server file
16
Error while opening the local file
17
Error while writing into the local file
2.3.1.7 Offline phase
If the return value “8” is returned while “sending dialog data” or “receiving the result”, the interface has
switched into the offline mode at the client. This is the case, when HYDRA is shut down for service
reasons, for example. Now it is impossible to send data for a time of 600s (adjustable via
ddminoffline()) to prevent the connected system from getting into a timeout when trying to establish
the connection. Only after this time has expired, the library tries to restore the connection.
int ddminoffline(int sec)
sec Minimum offline time in seconds after network error or offline of the interface
SCS-PDM_81.docx Version: 1.0.23049 Page 23 of 356

Production Data Manager
Return values of the function
0 Value set
-1 Invalid value. Must be stated in seconds > 0.
Attention:
Before going offline, all data should be buffered in a file. The following transfer to HYDRA has to
be carried out in chronological order ("top down“).
2.3.1.8 Option “parallel requests“
By means of the function long ddmessagetype(long user) it is possible to send several requests at the
same time to the server. The request is assigned to a unique HYDRA user number by setting
ddmessagetype(user) before sending dialog data with ddsend(). The ID has now to be set by means
of ddmessagetype(user) before receiving the result with ddreceive().
Attention:
- The HYDRA user numbers in use must be unique within the entire system.
- Since the PDM library is designed single-threaded, PDM function calls have to be secured by the
application (please see example)
Example for Windows:
CRITICAL_SECTION csDDcom;
long user1 = 3003;
EnterCriticalSection (&csDDcom);
ddmessagetype(user1);
ret = ddsend(stempelsatz,&dberr);
LeaveCriticalSection (&csDDcom);
if (ret == 0)
{
do
{
EnterCriticalSection (&csDDcom);
ddmessagetype(user1);
ret = ddreceive(resultat,&dberr);
LeaveCriticalSection (&csDDcom);
if (ret == 13)
Sleep(1000);
} while (ret == 13)
/* Error processing of ret */
...
}
SCS-PDM_81.docx Version: 1.0.23049 Page 24 of 356

Production Data Manager
else
{
/* Error processing of ret and dberr */ if necessary
...
}
SCS-PDM_81.docx Version: 1.0.23049 Page 25 of 356

Production Data Manager
2.3.1.9 Example
#include <windows.h>
#include <stdio.h>
#include "ddcom.h"
char host[256];
char remotefile[256];
char localfile[256];
char dd[2048];
short user = 0;
long ms = 0;
short dberr = 0;
int rc;
void liste ( void )
{
rc = ddsend(dd,&dberr);
printf("ddsend: %d [%s]\n",rc,dd);
if (rc == 0)
{
do
{
rc = ddreceive(dd,&dberr);
if (rc == 13)
Sleep(1000); /* waiting intervals of 1s */
} while (rc == 13);
printf("ddreceive: %d [%s]\n",rc,dd);
}
if (rc == 0)
{
rc = ddgetfile(remotefile, localfile);
printf("ddgetfile: %d\n",rc);
}
}
int main (int argc, char *argv[])
{
strcpy(host, "192.168.10.1");
user = 3001;
sprintf(remotefile,"./spool/hyu%d.c27",user);
sprintf(dd,"DLG=LIST;27|TNR=105|DAT=04/23/1999|DATEI=%s",remotefile);
sprintf(localfile,"list27.dat");
rc = ddinit(host,user);
printf("ddinit: %d\n",rc);
if (rc != 0)
return rc;
#ifdef TEST
ddmaxrecvwait(10); /* wait for result 10 seconds at most */
ddminoffline(30); /* stay 30 seconds OFFLINE at least */
#endif
liste();
return 0;
}
SCS-PDM_81.docx Version: 1.0.23049 Page 26 of 356

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| 2.3.2  | Online/offline connection “communication DLL“  |     |     |     |
| ------ | ---------------------------------------------- | --- | --- | --- |
(hyextcom)
In this connection communication works e.g. on the basis of TCP/IP sockets. The passed data are
accepted,  buffered  and  asynchronously  processed  (no  direct  server  response)  or  immediately
processed synchronously (with server response, not available at the moment) by HYDRA.
| 2.3.2.1  | Process flow of communication on the transmission  |     |     |     |
| -------- | -------------------------------------------------- | --- | --- | --- |
level
|     | HYDRA Server (Windows NT) |     |     | Client |
| --- | ------------------------- | --- | --- | ------ |
calls
|     | SERVICE        | Communication DLL |     | Application |
| --- | -------------- | ----------------- | --- | ----------- |
|     | Initialization | ExtComInit()      |     |             |
calls
Server
|     | Start | ExtComMain() | Socket |     |
| --- | ----- | ------------ | ------ | --- |
Communication
Processing DLL
Client
Nein
ExtExecCmd() Socket
Data??
Buffering
Ja
Process
Document
calls
|     | MPDV | External application |     |     |
| --- | ---- | -------------------- | --- | --- |

The name of the communication DLL and the processing DLL can be adjusted in HYDRA via the
registry or via environment variables. The service is started with starting HYDRA and stopped when
terminating HYDRA.
| 2.3.2.2  | Processing  |     |     |     |
| -------- | ----------- | --- | --- | --- |
This service starts the initialization of the communication DLL and thus transfers the name of the
processing DLL.
Function in the communication DLL (file hyextcou.c) for the initialization:

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 27 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

Production Data Manager
int ExtComInit(char * ExecDLL, int Id)
Exec Name of the processing DLL incl. directory (e.g. “e:\hydra\hyprog.dll“). A debug DLL can be
DLL indicated here for debug or test reasons.
Id ID number of the interface to be used in the communication DLL. Depending on the ID, it is
possible to save, e.g., the configuration for several interfaces in the communication DLL.
Return values of the function (communication errors)
= 0 Initialization of the communication DLL successful
≠ 0 Initialization of the communication DLL was not successful
 The service is finished again.
Afterwards the service starts the main function of the communication DLL, which accepts the
commands of the client and returns the result “command received“ after processing by the processing
DLL (e.g. ACK or NAK). The main function of the communication DLL is not terminated. Processing in
the processing DLL buffers the data on the server. Then the data are cyclically read by a HYDRA
module and written into the database.
Function in the communication DLL for the main function:
int ExtComMain(void);
void - no parameters -
Return values of the function (communication errors)
= 0 Communication DLL terminates itself normally.
 The service is finished again.
≠ 0 Communication DLL terminates itself successfully because of an error.
 The service is finished again.
Function in the processing DLL for the data transfer:
int ExtExecCmd(char *cmd, int cmdsize, char *res, int ressize);
cmd Data record for HYDRA, terminated by zero character („\0“), for its structure pl. see below
cmdsize Size of data record buffer
res Return buffer (intended for future extensions with online response)
ressize Size of the return buffer
Return values of the function (communication errors)
= 0 Data were buffered
≠ 0 Data could not be buffered
2.3.2.3 Test possibility
In the MS-DOS input request
SCS-PDM_81.docx Version: 1.0.23049 Page 28 of 356

Production Data Manager
Instead of the processing DLL, the service is started by a debug DLL that only displays data on the
screen. In this case, the service only runs as program in the MS-DOS prompt.
 The example tests the connection of two clients via the IDs 10021/10022:
Start with hyextsrv -d -s10021 -lhyextdbg.dll or by hyextsrv -d -s10022 -lhyextdbg.dll
The following lines are displayed (if the attached sample source code is used):
ExtExecInit: InterfaceFile "hyextsrv.dat"
ExtExecCmd: CMD "DLG=SYSTEM.TIME|ID=1|"
ExtExecCmd: CMD "DLG=SYSTEM.TIME|ID=2|"
ExtExecCmd: CMD "DLG=SYSTEM.TIME|ID=3|"
...
The program is closed by pressing Ctrl and C.
As service via the service control
Two services are installed by means of which the connection can be tested as service.
 The services are installed with the command dienste.bat –i {install} whereas {install} stands for the
installation directory.
 The services can now be started by net start "HYDRA PDM connection 1“ or net start "HYDRA
PDM connection 2“ (or via the service control).
 The services accept data with the IDs 10021 or 10022 and log them in float files
{install}\spool\hyextsrv.001 or {install}\spool\hyextsrv.002.
 The services can be terminated by net stop “HYDRA PDM connection 1“ or by net stop “HYDRA
PDM connection 2“ (or via the service control).
 The services are removed from the service control via dienste.bat -u {install}.
2.3.2.4 Test possibility with MPDV
Instead of the communication DLL, the service is started with a simulation DLL, which passes on test
data in intervals.
2.3.2.5 Server services in HYDRA
In HYDRA a service (server socket process) has to be started for each application that uses the PDM
interface.
The IP address defines which server service the application works for. The IP address of the
application is defined per service in the registry:
HYDRA server ext. Client
SCS-PDM_81.docx Version: 1.0.23049 Page 29 of 356

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

PDM-connection 1  Server socket a    Client socket  application 1
PDM-connection 2  Server socket b  Client socket  application 2

| ....  |     |     |     |     |
| ----- | --- | --- | --- | --- |
PDM-connection n  Server socket z    Client socket  application n
The server services have to be installed as “HYDRA services“ on the HYDRA server.
| 2.3.3  Offline connection “batch“ or “I-Doc“  |     |     |     |     |
| --------------------------------------------- | --- | --- | --- | --- |
Third-party system dialog data are archived in a file to realize an offline connection within the batch.
Multiple dialog data within a file are to be separated each by a word-wrap.
Within  a  batch  or  I-doc  the  dialogs  can  be  treated  as  one  or  several  completed  database
transaction(s).
There are the following alternatives regarding the communication between the external system and
HYDRA:
  Transfer provided by the customer
  Use of the time-controlled host communication HYD-ZHK
  Transfer from SAP as I-Doc via the HYDRA MySap communication

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 30 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

Production Data Manager
2.3.3.1 Data base transactions via several dialogs
The beginning and the end of a database transaction are controlled via particular dialogs. Dialogs can
only be summarized to transactions within one batch/I-Doc. The end of a batch/I-Doc corresponds to
the completion of the transaction. Consequently, this is the following general procedure:
1. Dialog for starting a transaction
2. Data dialogs that are supposed to be summarized
3. Dialog for terminating a transaction
4. Dialog for starting a transaction
5. ...
The dialog WORK.BEGIN starts a transaction. The actions that are meant to be summarized are
executed by the other dialogs. The dialog WORK.END completes the transaction.
Please note:
The pooling of several dialogues in a transaction is intended primarily for consistent master data
maintenance. Acquisition dialogs e.g. Logging in and out of operations or persons may not be
combined with WORK.BEGIN and WORK.END, otherwise dead locks can occur, which can have
serious errors throughout the HYDRA system resulted. Therefore WORK.BEGIN and WORK.END
should be used only on special requirements and after consultation with MPDV.
SCS-PDM_81.docx Version: 1.0.23049 Page 31 of 356

  Production Data Manager

Dialog: WORK.BEGIN
Opens a database transaction. Thus, the automatic transaction processing of the interface is
deactivated for the following dialogs.
| Parameter  | Type  Mandatory  | Content  | Description  |     |
| ---------- | ---------------- | -------- | ------------ | --- |
| - No -     |                  |          |              |     |

Dialog: WORK.END
Completes a database transaction. There are two different cases:
1) If errors appear in dialogs within the opened transaction the transaction will be rolled back, none
of the dialogs are saved in the database.
2) If no errors occur during processing of the dialogs within the transaction, the transaction will be
completed and data will finally be saved in the database.
| Parameter  | Type  Mandatory  | Content  | Description  |     |
| ---------- | ---------------- | -------- | ------------ | --- |
| - No -     |                  |          |              |     |

| 2.3.3.2  Transfer provided by the customer  |     |     |     |     |
| ------------------------------------------- | --- | --- | --- | --- |
The file has to be transmitted, secured with the transfer types copy or FTP, by the external system.
This transfer can – according to the client’s requirements – be carried out at a certain point in time or
in defined intervals.
The dialog file is transferred from the external system to HYDRA by setting the dialog file from the
external system in a defined directory on the HYDRA server: with Unix in the directory /usr/hydra; with
Windows NT in \hydra. Please note that a transfer to the HYDRA server may only be realized if the file
is not yet available there, to prevent a loss of data caused by “overwriting“.
Integrated in the HYDRA scheduler (hysched.cfg) the file is processed by HYDRA at stipulated times
or in defined intervals.
| # Processing controlled in intervals, e.g. every 5 minutes   |     |     |     |     |
| ------------------------------------------------------------ | --- | --- | --- | --- |
I 5 ./hymw.out –u9998 –L –b<File name>

| # Fixed processing, e.g. daily at 0:30   |     |     |     |     |
| ---------------------------------------- | --- | --- | --- | --- |
F 30  0  *  *  *  ./hymw.out –u9998 –L –b<File name>

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 32 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

Production Data Manager
The dialog data in the file <file name> are processed sequentially by the HYDRA interface program.
The single commands are recorded in the file ./err/hyddi_b<USR>.<PID>.pro. The file is deleted by
HYDRA after posting.
In case the “-z“ parameter is indicated, the processing result is additionally recorded in the system logs
and can be evaluated at the HYDRA console via File  System information  System logs  DD-
BATCH application.
2.3.3.3 Using of the time-controlled host communication
HYD-ZHK
HYDRA also provides the HYD-ZHK module by way of which HYDRA is able to automate the
connection: Then the third-party system only has to provide the respective files locally. HYDRA takes
over the actual transfer to HYDRA as well as loading the files into the HYDRA database. For further
information on technical requirements please contact the MPDV project management.
More detailed information is described in the product documentation entitled “HYD-ZHK“.
2.3.3.4 HYD-ZHK with UNIX
The following lines are entered in the HYDRA scheduler subject to the respective transfer type:
 copy
# HYD-ZHK (time-controlled host connection)
# for transfer Hydra(Unix)<->PPS(Unix) via NFS
# ATTENTION:
# - mounts for directory on remote system have to be accomplished when the host computer is started
# Parameter:
# - directory: path on mounted directory of the remote system (NFS)
# - file name: name of the PPS-file
L HYD-ZHK I 60 ./hyd_zhk.scr MOD=GET LOCAL=hydpdm.asc REMOTE="/directory/file name" CMD="./hymw.out –u9998 –L -
bhydpdm.asc"
 FTP
# for transfer Hydra(Unix)<->PPS(WinNT/UNIX/..) via FTP
# Parameter:
# - server: Name/IP-address of the remote system
# - ftpuser: user name for FTP access to the remote system
# - ftppasswd: appropriate code word
# - directory: path on remote system
# - file name: name of the PPS-file
L HYD-ZHK I 60 ./hyd_zhk.scr MOD=GET HOST=server USER=ftpuser PWD=ftppasswd LOCAL=hydpdm.asc
REMOTE="/directory/file name" CMD="./hymw.out –u9998 –L -bhydpdm.asc"
2.3.3.5 HYD-ZHK with Windows
The following lines are entered in the HYDRA scheduler subject to the respective transfer type:
SCS-PDM_81.docx Version: 1.0.23049 Page 33 of 356

  Production Data Manager

  copy
# HYD-ZHK (time controlled host connection)
# for transfer Hydra(WinNT)<->PPS(WinNT) via NT-release
# ATTENTION:
# - ggf. hyd_zhk.scr adapt!!!
# Parameter:
# - server:    name of the remote system
# - release:  release name
# - file name: name of the PPS-file
L  HYD-ZHK  I  60  sh.exe  ./hyd_zhk.scr  MOD=GET  LOCAL=hydpdm.asc  REMOTE="\\\\server\\release\\file  name"
CMD="hymw.exe –u9998 –L -bhydpdm.asc"
FTP

# for transfer Hydra(WinNT)<->PPS(WinNT/UNIX/..) via FTP
# Parameter:
# - server:    name/IP-address of the remote system
# - ftpuser:   user name for FTP-access to the remote system
# - ftppasswd: appropriate code word
# - directory:      path on remote system
# - file name: name of the PPS-file
L  HYD-ZHK  I  60  sh.exe  ./hyd_zhk.scr  MOD=GET  HOST=server  USER=ftpuser  PWD=ftppasswd  LOCAL=hydpdm.asc
REMOTE="/directory/file name" CMD="hymw.exe –u9998 –L -bhydpdm.asc"
| 2.3.3.6  | I-Docs from SAP via HYDRA-MySap  |     |     |     |     |
| -------- | -------------------------------- | --- | --- | --- | --- |
With this variant I-Docs are transferred from SAP to HYDRA. These I-Docs contain the dialogs for the
production data manager. Processing of the dialogs is started in HYDRA once I-Docs have arrived.
By  way  of  customizing  services  rendered  by  MPDV  the  respective  settings  are  configured  or
communicated within the MySap configuration.
| 2.3.4  Online connection "external interface“ to Windows  |     |     |     |     |     |
| --------------------------------------------------------- | --- | --- | --- | --- | --- |
terminal (ctcom32)
The communication from the external computer to the HYDRA Windows terminal is realized by the
ctcom32 interface, which needs the hyevcom library to be able to transfer data via Windows socket-32
(wsock32.dll). The external computer runs with the operating systems Windows or Linux.
| Windows terminal  |     | external PC (Windows/Linux)  |     |     |     |
| ----------------- | --- | ---------------------------- | --- | --- | --- |
r
|  m  |     |     |     | o   |     |
| --- | --- | --- | --- | --- | --- |
o
| a    |      |   dll /   |   dll / | p fl  |     |
| ---- | ---- | --------- | ------- | ----- | --- |
| g r  | dll  |   a       |   a     |       |     |
| o    | 2.   | 2 m.      | 2.      | m     |     |
| r    |      | 3 m.      | 2.      | o a   |     |
| p    | 3 ↔  | k o       | 3       | h r   |     |
|   al | k    | c o c     | 3 m     | s g   |     |
|      | c    | o c v     | m o     | al  o |     |
| n    | o    | s v e     | o c     | r     |     |
| m i  | s    | w e y     | c t     | n p   |     |
|      | w    | y h       | c t c   | e r   |     |
| e r  |      | h         |         | xt    |     |
T
E
Files required for Windows
ctcom.h
Definitions for the data transfer

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 34 of 356  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

Production Data Manager
ctcom32.lib
Library
ctcom32.dll/hyevcom.dll
Runtime libraries
ctcom32tst.exe
Test program for simulation of ext. PC
Files required for Linux:
ctcom.h
Definitions for the data transfer
ctcom32.a
Library
ctcom32tst.out
Test program for simulation of ext. PC
2.3.4.1 Setting of timeouts
Setting of timeouts (only to optimize!) for hyevcom. Values greater than 0 are accepted only.
int FAR PASCAL cttimeout
(
long t_c, /* Timeout "Connect" in [s], default 5s */
long t_s, /* Timeout "Send" in [s], default 10s */
long t_r /* Timeout "Receive" in [s], default 10s */
);
Timeout “Connect“ in seconds, default 5s
t_c
Timeout “Send“ in seconds, default 10s
t_s
Timeout “Receive“ in seconds, default 10s
t_r
Return values of the function (communication errors)
0 Transfer successful
2.3.4.2 Sending of dialog data
Transfer of a data buffer to the Windows terminal.
Please note:
 Each posting is to be completed by the characters EOT (End of Transmission) or the
character 4 or Ctrl-D.
SCS-PDM_81.docx Version: 1.0.23049 Page 35 of 356

Production Data Manager
 int FAR PASCAL ctcom_snd
(
char *host name, /* Hos tname or IP-address of the CT */
int port, /* Port */
char *data, /* Data */
int size, /* Length */
int *err /* Error code */
);
Host name Host name or IP address of the Windows terminal. This value should be adjustable from
the outside via the Environment, INI-file (or similar).
port Indication of the port, on which the Windows terminal expects data.
This value should be adjustable from the outside - just as it is the case for the host
name.
data, size Data buffer and size of the data buffer
err Definite network error of the hyevcom.
 Return values of the function (communication errors)
0 Transfer successful
1 Initialization of Windows sockets incorrect
4 Connection cannot be established. The server module on the opposite side host name
does possibly not run at port port.
5 Termination/error while sending
6 Termination/error while receiving
13 Data are not yet available
14 Size size of the buffer data is greater than MAX_CTCOM_DATA_SIZE
(512 bytes)
2.3.4.3 Receiving the result
Reception of the result from the Windows terminal, once data have been sent successfully. The return
value “13” indicates that data are not yet available. The program has to stop the communication
independently after a certain time interval.
SCS-PDM_81.docx Version: 1.0.23049 Page 36 of 356

Production Data Manager
int FAR PASCAL ctcom_rcv
(
char *host name, /* Host name or IP-address of the CT */
int port, /* Port */
char *data, /* Data */
int size, /* Length */
int *err /* Error code */
);
Host name Host name or IP address of the Windows terminal. This value should be able to be
adjusted externally via the Environment, INI-file (or similar).
port Indication of the port, on which the Windows terminal expects data. This value should
be adjustable from the outside – just as it is the case for the "host name".
data, size Data buffer and size of the data buffer
err Definite network error of the hyevcom.
“Sleep“ has to be implemented between the different reception cycles in order to prevent the system
from an overload:
int maxwarteanz = 60; /* max. 60 * 1second wait */
int anz = 0;
ret = ctcom_snd(dd,...);
if (ret == 0)
{
do
{
ret = ctcom_rcv(dd, ...);
if (ret == 13)
{
Sleep(1000);
anz++;
}
} while ((ret == 13) && (anz < maxwarteanz))
if (ret == 0)
{
/* Reception successful */
...
}
else
{
/* Reception not successful: error processing of ret */
...
}
}
else
{
/* Dispatch not successful: error processing of ret */
...
}
SCS-PDM_81.docx Version: 1.0.23049 Page 37 of 356

Production Data Manager
If the communication was successful (return value of the function ctcom_rcv is 0) the return values
have to be evaluated in the dialog data whether or not the command was successful.
Please note for the dialog data structure:
Dialog data must include the ID ACTION=DLG_SEND in order for the Windows terminal to forward the
data string directly to the HYDRA server.
Each return string additionally includes the following data:
ID Description
FT_ERROR Return code: Return value
FT_ERROR = 0 : Activity realized
FT_ERROR ≠ 0 : Activity not realized,
Evaluate error code
Examples:
..|FT_ERROR=0|..
..|FT_ERROR=4|..
FT_ERROR_TXT Short text: Error description (short) if FT_ERROR ≠ 0 or optional info if
FT_ERROR = 0
Examples:
..|FT_ERROR_TXT=OK [0]|..
..|FT_ERROR_TXT=TNR_BUSY (Process runs) [4]|..
FT_INFO_TXT From CTWIN V# 7.2.4.52 on, the following info is attached to the
[Optional] receiving string, when it comes to a reception timeout
..|FT_INFO_TXT=TIMEOUT (GateWay <-> TNR) T/Wo(100/0)
ServerClientSocket->No Data from Client [5/5]|..
2.3.4.4 Setup of the test
(1) Configure the gateway communication at the terminal as described in the following section
and start the Windows terminal.
(2) You can test the connection to the terminal by way of the test program ctcom32tst.exe. Start
the test program by ctcom32tst.exe /out{Host name/IP address} {Port} {Data}. It will then send
the character string {Data} to the port (e.g. 9002) of the specified host.
Example:
ctcom32tst.exe 0 192.168.1.137 9002
"ACTION=DLG_SEND|DLG=A_TR|MNR=M100|ANR=903216010100|
DAT=11/01/2008|ZEI=20367|USR=9997|"
(3) The command is now processed accordingly at the terminal and forwarded to the HYDRA
server.
SCS-PDM_81.docx Version: 1.0.23049 Page 38 of 356

Production Data Manager
2.3.4.5 Installation
Install the online connection “external interface” to the the Windows terminal at the HYDRA
terminal as follows:
(1) The following needs to be configured in the ctwin.ini file within the section [GateWay-
Communication] of the Windows terminal:
[GateWay-Communication]
Active=true
Port=9002
(2) All files mentioned above need to be copied into the directory where the external application is
started.
SCS-PDM_81.docx Version: 1.0.23049 Page 39 of 356

Production Data Manager
3 HYDRA Production Data Manager - Preface
The data transfer to HYDRA is performed by “dialog data” in the ASCII format. The string consists of
header and field data. Header data are required for HYDRA to identify the data type, whereas field
data contain data of the external application.
3.1 Header data of the dialog data
The following data always have to be transmitted in a dialog by an external acquisition system to
HYDRA. The single fields are separated by the character "|“.
Identification Content/(type) Description
DLG {Dialog ID} The dialog ID indicates the required functions, e.g.:
DLG=P_AN to log staff on
D LG=MNR.INSERT to create a machine
USR {N4} HYDRA user: This HYDRA user number is the unique ID of
a HYDRA client:
For terminals the respective terminal number is added to the
terminal number 2000. Example:
USR=2004 corresponds to terminal 4
Please note:
Terminal numbers assigned to HYDRA terminals must not
be used for the HYDRA-PDM connection. We recommend
using a separate number range.
DAT {mm/dd/yyyy} Date: current date in the format mm/dd/yyyy“
Example:
DAT=03/30/2007
ZEI {seconds} Time: point in time in the "seconds" format, i.e. in seconds
as of midnight
Example:
ZEI=36003 for the time: 10:00:03 am
Dialog IDs having the structure OBJEKT.AKTION (such as MNR.INSERT = create machine) are BAPI
calls, which are described in detail in the sections that follow.
The following data can be transferred in a dialog to HYDRA by an external data acquisition system.
ID Content / {Type} Description
ID {Identification When started for the first time the ID=0 is sent. The ID is
number} increased by 1 for each other call. The return string contains the
same ID as the dialog data string.
OFF={J|N} OFF={J|N} Offline identification. Indicate "OFF=J“, if data were captured and
buffered offline. In this case the data are processed separately.
("OFF=N" doesn't have to be indicated)
DATEI {C256} File name: Indication of the file name when lists are requested.
The file name is created by means of the Hydra user:
SCS-PDM_81.docx Version: 1.0.23049 Page 40 of 356

Production Data Manager
.\spool\hyu{Hydrauser}.{extension}
{Hydrauser} corresponds to the user numbers of the terminal.
(The terminal 1 corresponds to the Hydrauser-number 2001 etc.)
{extension} can be chosen subject to the data. Standard: “txt“
Example:
...|DLG=.\spool\hyu2004.txt|...
3.2 Common notes

To avoid errors:
The SCS-PDM interface requires the dialog data to be in the correct chronological order.
If data are sent and their chronological order is wrong errors in determining quantities and activities
will occur. In addition to this, unintentional plausibility errors might arise due to wrong plausibility
checks. Consequently, data records might be rejected.
 The header data DLG, USR, DAT and ZEI always have to be indicated completely within
dialog data.
 OFF has only to be sent if it deals with data that were collected offline (default is OFF=N).
 It is not mandatory to keep a special order of IDs in dialog data..
 Double data records are filtered out by the process, provided that a valid ID is forwarded
within header data.
 The plausibility of data is basically checked prior to posting. Incorrect data records are
ignored and recorded in an error log. Processing ignores unknown field identifications.
 The field identifications ANR, AGNR, PNR, KNR and MNR have adjustable lengths and thus
may vary in the HYDRA basic settings according to the respective configuration. Checks
regarding data field lengths are based on the settings made within the HYDRA setup.
 All fields within a data record are separated by the "|“ character.
Thus, the length of the data is variable but may not exceed the maximum length specified. If
the characters "|“ pipe or "\“ backslash are included the data content they have to be masked
by another preceding backslash :
\  \\
|  \|
SCS-PDM_81.docx Version: 1.0.23049 Page 41 of 356

Production Data Manager
3.3 Field data
Further IDs (“field data”) have to or can be entered depending on the dialog ID (“DLG“).
3.4 Return values
Each return string includes the following header data:
Identification Content/(type) Description
RET {N8} Return code: Return value
RET = 0: activity executed
RET ≠ 0: activity has not been executed; evaluate error code
Examples:
...|RET=0|...
...|RET=60|...
KT {C20} Short text: description of the error (short) if RET ≠ 0 or optional
info if RET = 0
Examples:
KT=Already logged on
KT=In 2040
LT {C40} Long text: description of the error (long) if RET ≠ 0 or optional
info if RET = 0
Example:
|LT=OP cannot be logged on several times.
LT=In Hans Meier
Each return string may optionally include the following data
Identification Content/(type) Description
ID {Identification The return string contains the same ID as the dialog data string,
number} provided that it was indicated there.
{C256} Dialogdaten über Dialogdatei, nur in Kombination mit RETFILE
(nur wenn im BAPI-Call angegeben)
RETFILE {C256} Rückgabewerte über Rückgabedatei, nur in Kombination mit
DLGFILE (nur wenn im BAPI-Call angegeben)
Depending on the dialog ID ("DLG") additional IDs, which include, e.g., further return values
(information, etc.) may also be returned.
Moreover, the following definitions apply for BAPI calls:
 The BAPI calls *.NEW, *.SELECT, *.LOCK return a new or existing data record. The object
name "Objekt" (value before the point) is returned as DATA=Objekt, the single values are
transferred without the preceding object name.
 The BAPI call *.LIST displays the selected data records in form of a list with the file name
transferred in DATEI. The object name does not precede the columns. Colons are displayed
as underline "_".
SCS-PDM_81.docx Version: 1.0.23049 Page 42 of 356

Production Data Manager
Error messages are described in detail in the section "HYDRA error messages" of the HYDRA-BDE
manual.
3.5 BAPI call reference to the data model
The BAPI calls described in the corresponding documentation (MDM - Master Data Maintenance and
DDM - Dynamic Data Management) partly refer to the HYDRA data model. For information on the data
model, see the CUT-HDB course.
3.6 Lock mechanism for BAPI calls
The lock mechanism of HYDRA locks a virtual dataset on the server (e.g. "lock person 999999" or
"lock machine group 145"). The virtual dataset can consist of one data record or of several data
records. All BAPIs based on this virtual dataset check whether this dataset has been locked by
another HYDRA client (e.g. console) prior to the BAPI calls *.UPDATE or *.DELETE.
Using the BAPI call *.Lock a client may lock a dataset/data record for a HYDRA client and once it has
been processed by a BAPI call *.UPDATE it can again be released using the BAPI call *.UNLOCK.
In case a dataset/data record is locked at another console, the BAPI *.LOCK returns the error code
1666 (RET) as well as the HYDRA user (USR), the user (BEARB) and the client function (MODULE,
provided that the other client has entered these details for the BAPI call *.LOCK), for which the
dataset is locked.
To be able to delete a dataset/data record by a BAPI call *.DELETE, this data record should not be
locked using the BAPI call *LOCK. The BAPI call *.DELETE checks in any case whether the data
record/dataset is locked or not and cancels the process with an error if it is locked.
SCS-PDM_81.docx Version: 1.0.23049 Page 43 of 356

  Production Data Manager

4  HYDRA Production Data Manager Basis - Data Collection
4.1  Reading time from HYDRA server
Structure of dialog data:
„DLG=SCMD;44|DAT=...|ZEI=...|USR=...|...“
The command does not expect further parameters.
The following values are returned to the terminal:
| Field  |                                    | Description   | Example  |
| ------ | ---------------------------------- | ------------- | -------- |
| RET=0  | The return value RET is always 0.  |               | RET=0    |
DAT={mm/dd/yyyy}  Current date in format "mm/dd/yyyy"  DAT=09/06/2001
ZEI={seconds}  Current    time  in  format  "seconds  since  midnight“  ZEI=63142
(Example: 10:00:03 is ZEI=36003)
GMTDAT={mm/dd/yyy Current date in format "mm/dd/yyyy" in time zone GMT  GMTDAT=09/06/2
| y}  |     |     | 001  |
| --- | --- | --- | ---- |
GMTZEI={seconds}  Current time in format „seconds since midnight“ in time  GMTZEI=55942
zone GMT
GMTOFF={±HHMM}  Description of the time zone local time  GMTOFF=+0200
GMTDIFF=[-]  Deviation of local time from GMT in seconds  GMTDIFF=7200
{seconds}
WSDAT=  Date of time shift from standard time to daylight saving  WSDAT=03/31/20
| {mm/dd/yyyy}  | time in the current year.  |     | 02  |
| ------------- | -------------------------- | --- | --- |
WSZEI={seconds}  Time of time shift from standard time to daylight saving  WSZEI=7200
time in the current year.
SWDAT=  Date of time shift from daylight saving time to standard  WSDAT=10/27/20
| {mm/dd/yyyy}  | time in the current year.  |     | 02  |
| ------------- | -------------------------- | --- | --- |
SWZEI={seconds}  Time of time shift from daylight saving time to standard  WSZEI=10800
time in the current year.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 44 of 356  |
| ---------------- | --- | ------------------- | --------------- |

|     |     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- |

| 4.2  | Sending terminal status  |     |     |     |     |     |     |     |
| ---- | ------------------------ | --- | --- | --- | --- | --- | --- | --- |
Use  the  terminal  status  command  to  store  information  on  the  terminal  status  in  the  database.
Requests asking to restart terminal, to download program or to read the authorizations are returned.
Structure of dialog data:
(The dialog ID DLG=SCMD;41 must be transferred as first entry):
„DLG=SCMD;41|DAT=...|ZEI=...|USR=...|TNR=...|...“
The following table contains the data that can be transmitted:
|     | Field  |     |     | Description   |     |     |     | Example  |
| --- | ------ | --- | --- | ------------- | --- | --- | --- | -------- |
IP={...}  Transfer of the IP-address. A character string of a  IP=192.168.20.234
maximum of 15 characters can be transmitted (could
also be the hardware-address). With specific terminals,
the hardware-address is configured in the HYDRA GUI;
then it is not useful to transfer this field.
PROG={...}  Program  name  of  the  terminal  program  or  of  the  PROG=hyterm.exe
function list (max. 20 characters)
VERNR={...}  Version number of the terminal program   VERNR=6.5.1.27
(max. 10 characters)
LOKANZ={...}  Number of local data records (after an offline phase)  LOKANZ=0
OFFDAT={...}  Date of the last offline phase  OFFDAT=05/21/1999
OFFZEI={...}  Time  of  the  last  offline  phase  in  seconds  since  OFFZEI=53214
beginning of the day
| ZNR={...}  |     | Access number or access group   |     |     |     |     | ZNR=4  |     |
| ---------- | --- | ------------------------------- | --- | --- | --- | --- | ------ | --- |
bzw. ZGRP={...}  If one of those fields is transferred with the 3 following  or ZGRP=5
fields the number of authorized badges, date and time
are saved in the access status instead of the terminal
|     |     | status.  This  | is  necessary  |     | because  | several  accesses  |     |     |
| --- | --- | -------------- | -------------- | --- | -------- | ------------------ | --- | --- |
can be administered via a terminal. You can make the
request for an access or an access group.
BERANZ={...}  Number of persons authorized to access and to clock  BERANZ=124
|     |     | (the  fields  | BERANZ,  | BERDAT       |           | and  BERZEI  | are    |     |
| --- | --- | ------------- | -------- | ------------ | --------- | ------------ | ------ | --- |
|     |     | normally      | always   | transferred  | together  | directly     | after  |     |

| SCS-PDM_81.docx  |     |     |     | Version: 1.0.23049  |     |     |     | Page 45 of 356  |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | --- | --------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

download of authorizations).
BERDAT={...}  Date when the authorizations were last read  BERDAT=05/21/1999
BERZEI={...}  Time when the authorizations were last read  BERZEI=5213
SUBANZ={...}  Number of sub-systems (DS100 or LEGIC-reader)  SUBANZ=0
| SUBOK={...}  | Number of active sub-systems    |     |     |     | SUBOK=0  |     |
| ------------ | ------------------------------- | --- | --- | --- | -------- | --- |
| STA={...}    | Terminal status (if possible):  |     |     |     | STA=O    |     |
O=Online, F=Offline: Terminal answers in the specified
cycle "ZYKL" (see below) and is currently "online" or
"offline".
|     | o=Online,  | f=Offline:  | Terminal  does  | not  cyclically  |     |     |
| --- | ---------- | ----------- | --------------- | ---------------- | --- | --- |
answer, but answers only when the terminal changes to
status "online" or "offline".
NEUDAT={...}  Date of last terminal restart  NEUDAT=05/20/1999
| NEUZEI={...}  | Time of last terminal restart  |     |     |     | NEUZEI=27594  |     |
| ------------- | ------------------------------ | --- | --- | --- | ------------- | --- |
PROGDAT={...}  Date of last download of terminal program  PROGDAT=05/13/1999
PROGZEI={...}  Time of last download of terminal program   PROGZEI=43834
VLISTSYNC=N  Must be transferred with terminal type 110 A-SUB (ALS  VLISTSYNC=N
sub-system) if the sequencing list has been updated.
This flag is then reset.
ALSSYNC=N  Must be transferred with terminal type 111 A-SYN (ALS  ALSSYNC=N
|     | data  synchronization)  |     | if  the  production  | combinations  |     |     |
| --- | ----------------------- | --- | -------------------- | ------------- | --- | --- |
have been updated. This flag is then reset.

The following values are returned to the terminal:
| Field  |     |     | Description   |     |     | Example  |
| ------ | --- | --- | ------------- | --- | --- | -------- |
RET={...}  The transfer and storage of the terminal status is only  RET=0
successful if RET=0. All further fields are only available if
RET=0.
ZYKL={...}  Time in seconds after which the next status message has  ZYKL=900
to take place (is not processed with INCA as the time is

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 46 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

Production Data Manager
read every 15 minutes).
NEUSTART={J/N} Do you want to restart terminal (‚J’ Yes or ‚N’ No)? This NEUSTART=N
flag is reset if a new point in time is passed with the
transfer of NEUDAT and NEUZEI. Consequently, the
fields NEUDAT and NEUZEI can be passed with each
terminal status.
PROGLADEN={J/N} Do you want to reload the terminal program? PROGLADEN=J
This flag is reset if a new point in time is passed with the
transfer of PROGDAT and PROGZEI. Consequently, the
fields PROGDAT and PROGZEI can be passed with
each terminal status.
BERLESEN={J/N} Do you want to read the authorizations again? BERLESEN=J
This flag is reset if a new point in time is passed with the
transfer of BERDAT and BERZEI. Consequently, the
fields BERDAT and BERZEI can be passed with each
terminal status.
TNR={...} Return of the terminal number for which the status was TNR=101
sent.
PROG={...} Program name transmitted after last loading of program. PROG=hydra.exe
If a list of the terminal programs is not available, this
program name can be used to load the program.
VLISTSYNC=J Must be transferred with terminal type 110 A-SUB (ALS VLISTSYNC=J
sub-system) if the sequencing list must be updated.
ALSSYNC=J Must be transferred with terminal type 111 A-SYN (ALS ALSSYNC=J
data synchronization) if the production combinations must
be updated.
V:{module name}=… The terminal sends version info of loaded modules V:ftp.dll=FTP;7.2.
(DLLs, scripts, etc.) in terminal status in format 1.5
...|V:dllname.dll=modules/function[[;version];date]|...
This version information is stored in the software status
as type "TERMINAL" and name
"USER:{hydrauser}:{modulename}".
Version: version number or time stamp in format
"mm/dd/yyyy hh:mm:ss"
SCS-PDM_81.docx Version: 1.0.23049 Page 47 of 356

Production Data Manager
Date: date of module generation in format mm/dd/yyyy
(requires hymw.out / exe 7.2.1.353)
4.3 Reloading lists on the terminal
The terminals read their internal lists at regular intervals, e.g. the list of assigned machines, currently
running orders and currently logged on persons.
If data, which is included in terminal lists and displayed on the terminal, changes after activities on
other terminals or on the HYDRA server, it might be useful to immediately update the data on the
terminal and not only after the next cyclic update, which might take some minutes.
Using the string command "DLG=SCMD;53|", you can reload specific lists on the terminal and
immediately display the changes.
Structure of dialog data:
„DLG=SCMD;53|TYP=INFO|ACTION=LST_RELOAD|LOAD=…|TNR=…|“
SCS-PDM_81.docx Version: 1.0.23049 Page 48 of 356

Production Data Manager
The following table contains the data that can be transmitted:
Field Description Example
LOAD=... Transfer of lists that must be reloaded: LOAD=ANR,MNR|
 MNR:
Machines assigned to the terminal
 ANR:
Operations logged on
 PNR:
Staff logged on
 MAT:
Input materials of assigned machines
 RES:
Resources of machines assigned to the
terminal
 PPKT:
CAQ inspection points. The parameters
RECTYP, BER, PANNR, PAUNR, EINTTYP,
EINTNR and CAUSE must additionally be
specified.
TNR= Terminal number TNR=117|
Only use the string command "DLG=SCMD;53|", if necessary. A frequent reload of lists means
system strain for terminal and HYDRA server.
To trigger the loading of lists, the HYDRA server sends a message to the terminal using the
network. To this end, you must release the port used so it is not blocked by a firewall. Terminals
normally use port 9002, the PCC port 9005.
The string command "DLG=SCMD;53|" is not suitable if you want to initialize MDE data like
machine status or counter readings on the terminal from the server.
SCS-PDM_81.docx Version: 1.0.23049 Page 49 of 356

Production Data Manager
4.4 Generating MLE outbound segments
Purpose
Use this service if you want to generate MLE outbound transactions, which are then transferred to
another system (ERP, WMS,...).
BAPI: HSODATA.INSERT
Identifier Description Example
HSODATA.SEGNAM Segment name (CHAR30) HSODATA.SEGNAM=E2BP_PP_
TIMTICKET
HSODATA.HYSYS Logical target system (CHAR10) HSODATA.HYSYS=FP
HSODATA.SDATA Data record (CHAR1000) HSODATA.SDATA=ABCDE
HSODATA.TYP Type of data record: HSODATA.TYP=HD
"HD" header record
"CH" child record
HSODATA.VERWEIS: Reference to master segment when HSODATA.VERWEIS:HEADER=4
HEADER child segments are requested 711
HSODATA.LCHILD Identifier "last child segment" HSODATA.LCHILD=J
"J" only if HSODATA.TYP=CH
"N" any other case
Example: Generating a master segment
DLG=HSODATA.INSERT|HSODATA.SEGNAM=SAMPLESEGNAMHD|HSODATA.HYSYS=FP|HSOD
ATA.SDATA=THIS IS SAMPLE DATA|HSODATA.TYP=HD|
Example: Generating master segment and child segments
DLG=HSODATA.INSERT|HSODATA.SEGNAM=SAMPLESEGNAMHD|HSODATA.HYSYS=SAP|HSO
DATA.SDATA=THIS IS SAMPLE DATA|HSODATA.TYP=HD|
The reference to the master segment is transferred in the BAPI result. Use this reference in
subsequent requests for the child segments as HSODATA.VERWEIS:HEADER.
RET=0|KT=|LT=|DATA=HSODATA|VERWEIS=4711|TYP=HD|ID=|
Child segment - not the last one:
SCS-PDM_81.docx Version: 1.0.23049 Page 50 of 356

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

DLG=HSODATA.INSERT|HSODATA.SEGNAM=SAMPLESEGNAMCH|HSODATA.HYSYS=SAP|HSO
| DATA.SDATA=THIS  |     |     | IS  | SAMPLE  |     | DATA  |
| ---------------- | --- | --- | --- | ------- | --- | ----- |
CHILD|HSODATA.TYP=CH|HSODATA.VERWEIS:HEADER=4711|HSODATA.LCHILD=N|
Child segment - the last one:
DLG=HSODATA.INSERT|HSODATA.SEGNAM=ECKTESTCH|HSODATA.HYSYS=SAP|HSODATA.S
| DATA=  | THIS  | IS  | ANOTHER  | SAMPLE  | DATA  | CHILD  |
| ------ | ----- | --- | -------- | ------- | ----- | ------ |
|HSODATA.TYP=CH|HSODATA.VERWEIS:HEADER=4711|HSODATA.LCHILD=J|
| 4.5  Generating logging entry  |     |     |     |     |     |     |
| ------------------------------ | --- | --- | --- | --- | --- | --- |
Use the dialog described below to generate an entry in the change management (logging). This
requires a relevant configuration in the Logging - configuration. If you additionally activate the option
Log dialog data in this configuration, then all data included in the dialog data is transferred to the
database. This data can then be displayed in the application Logging - change management. If you
use the button Show, the dialog data is displayed in a separate information window.
Structure of dialog data:
„DLG=SCMD;51|USR=...|BEARB=…|ACTION=…|KEY:1=...|DAT=…|ZEI=…|“
The following table contains the data that can be transmitted:
| Identifier  |     |     | Description   |     |     |     |
| ----------- | --- | --- | ------------- | --- | --- | --- |
KEY:1=  The value of this identifier must be identical to the content of field Object in Logging
- configuration.
ACTION=  The value of this identifier must be identical to the content of field Action in Logging
- configuration.
BEARB=  The person specified in the Modified by field is transferred to the logging entry.
| USR=  | The specified User is transferred to the logging entry  |     |     |     |     |     |
| ----- | ------------------------------------------------------- | --- | --- | --- | --- | --- |

Activate the option Log dialog data in the Logging - configuration to save all further identifiers
except the keys.

Only if the return value is 0 (RET=0|), the entry was properly saved.

Example:

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 51 of 356  |     |
| ---------------- | --- | --- | ------------------- | --- | --------------- | --- |

  Production Data Manager

Content of logging configuration
Field  Content
Object  TEST
Action  INSERT
Log dialog data  Activated

Dialog data:
DLG=SCMD;51|KEY:1=TEST|ACTION=INSERT|MNR=MyMachine|ANR=MyOperation|CNR=MyBa
tch|USR=2112|BEARB=12345|
Result:
For object "TEST", an action "INSERT" is logged. Other dialog data can be viewed as detail data.
4.6  Generating entry for dialog error log
Use the dialog described below to generate an entry in the HYDRA dialog error log.
Structure of dialog data:
„DLG=SCMD;52| . . . “
The following table contains the data that can be transmitted:
Type /
Identifier  Description
max. field length
| STA=  | C1  | Status: I=Info, W=Warning, E=Error  |     |
| ----- | --- | ----------------------------------- | --- |

Note:
Default value is E, if ERRCODE does not equal 0. It is
I, if ERRCODE is 0.
| ERRCODE=   | N8            | Error code                 |     |
| ---------- | ------------- | -------------------------- | --- |
| ERRCLASS=  | C10           | Error class                |     |
| EREIG=     | C40           | Event                      |     |
| BEM=       | C80           | Comment                    |     |
| USR=       | N4            | HYDRA user                 |     |
| DAT=       | {mm/dd/yyyy}  | Date in format mm/dd/yyyy  |     |
ZEI=  {seconds}  Time: point in time in format "seconds", i.e. in seconds

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 52 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

since midnight
Example:
ZEI=36003 for the time 10:00:03
| BEARB=  | C10    | Modified by                             |     |     |
| ------- | ------ | --------------------------------------- | --- | --- |
| MNR=    | N8/C8  | Machine number (numeric/alphanumeric)   |     |     |
| MGRP=   | C8     | Machine group                           |     |     |
| ANR=    | C      | HYDRA order number (fully defined key)  |     |     |
| CNR=    | C20    | Batch number                            |     |     |
| PNR=    | C10    | Personnel number                        |     |     |
| KNR=    | C10    | Badge number                            |     |     |

4.7  Triggering escalation
Use the dialog described below to trigger a configured escalation.
Structure of dialog data:
„DLG=ESKMSG.INSERT|ESKMSG.ID=. . .| “
The following table contains the data that can be transmitted:
Type /
| Identifier  |     |     | Description   |     |
| ----------- | --- | --- | ------------- | --- |
max. field length
Escalation that must be triggered.
| ESKMSG.ESKID=  | C40  |     |     |     |
| -------------- | ---- | --- | --- | --- |
The escalations that must be triggered are configured in the
database table  esk_event_cfg
Recipient type of message
| ESKMSG.RCV:ART=  | C1  |     |     |     |
| ---------------- | --- | --- | --- | --- |
P: Person (see ESKMSG.RCV:PNR)
F: Function group (see ESKMSG.RCV:FKT)
Person from HR master data. If you specify the parameter, it
| ESKMSG.RCV:PNR=  | N8  |     |     |     |
| ---------------- | --- | --- | --- | --- |
overrides the configured recipient.
Function group. If you specify the parameter, it overrides the
| ESKMSG.RCV:FKT=  | C40  |     |     |     |
| ---------------- | ---- | --- | --- | --- |
configured recipient.
If the mail delivery is configured, you can specify a
| ESKMSG.ATTACH=  | C250  |     |     |     |
| --------------- | ----- | --- | --- | --- |
mail attachment here. The HYDRA server must be
able to reach the file.
HYDRA user
| USR=  | N4  |     |     |     |
| ----- | --- | --- | --- | --- |
Date in format mm/dd/yyyy
| DAT=  | {mm/dd/yyyy}  |     |     |     |
| ----- | ------------- | --- | --- | --- |
ZEI=  {seconds}  Time: point in time in format "seconds", i.e. in seconds
since midnight

| SCS-PDM_81.docx  | Version: 1.0.23049  |     |     | Page 53 of 356  |
| ---------------- | ------------------- | --- | --- | --------------- |

Production Data Manager
Example:
ZEI=36003 for the time 10:00:03
Other identifiers For each escalation, a fixed amount of variables is
defined. The defined variables can be viewed in the
application Escalation configuration. You can attach
these variables here. Note: the total length of the
dialog data string is limited to 1000 characters.
The available variables of each escalation are stored
in the table esk_event_reg_var.
Example: Event ANR.REGISTER_REMARK
Available variables
select * from esk_event_reg_var where event_id = 'ANR.REGISTER_REMARK'
order by key_nr desc
Be careful to always specify the key field variables (key_nr > 0) in the dialog string. The key fields
uniquely identify an event. As long as an escalation with this key field combination is open, another
escalation cannot be generated. Only if the escalation is closed, a new escalation with these key fields
can be triggered.
DLG=ESKMSG.INSERT|ESKMSG.ESKID=ANR.REGISTER_REMARK|ANR.ANR=222222220100|ANR
.ATK=Testartikel|ESKMSG.RCV:ART=P|ESKMSG.TO:PNR=2|BEM=hello from
PDM|USR=2001|
SCS-PDM_81.docx Version: 1.0.23049 Page 54 of 356

Production Data Manager
The escalation ANR.REGISTER_REMARK is triggered for operation 222222220100. The comment is
"hello from PDM".
A mail attachment is added in this example.
DLG=ESKMSG.INSERT|ESKMSG.ESKID=ANR.REGISTER_REMARK|ANR.ANR=222222220100|ANR
.ATK=Testartikel|ESKMSG.RCV:ART=P|ESKMSG.TO:PNR=2|BEM=hello from
PDM|ESKMSG.ATTACH=.\1\grafik\bde\maschine.jpg|USR=2001|
Example: Event ESK.MESSAGE
Use the escalation ESK.MESSAGE to send "generic" escalations. You can send mails, for example.
To avoid open escalations, activate the option Automatic: after sending the message with CLOSE.
SCS-PDM_81.docx Version: 1.0.23049 Page 55 of 356

Production Data Manager
Available variables
select * from esk_event_reg_var where event_id = 'ESK.MESSAGE' order by
key_nr desc, f_kennung asc
Type /
Identifier Description
max. field length
If the mail delivery is configured, you can override the e-mail
ESK.MSGSUBJ= C50
subject here.
If the mail delivery is configured, you can override the e-mail
ESK.MSGTXT= C320
body here.
SCS-PDM_81.docx Version: 1.0.23049 Page 56 of 356

Production Data Manager
DLG=ESKMSG.INSERT|ESKMSG.ESKID=ESK.MESSAGE|ESK.MSGSUBJ=Testmessage from
PDM|ESK.MSGTXT=Messagebody from
PDM|ESKMSG.RCV:ART=P|ESKMSG.TO:PNR=2|USR=2001|
You can send attachments with this escalation, too.
DLG=ESKMSG.INSERT|ESKMSG.ESKID=ESK.MESSAGE|ESK.MSGSUBJ=Testmessage from
PDM|ESK.MSGTXT=Messagebody from
PDM|ESKMSG.RCV:ART=P|ESKMSG.TO:PNR=2|ESKMSG.ATTACH=.\1\grafik\bde\maschine.
jpg|USR=2001|
SCS-PDM_81.docx Version: 1.0.23049 Page 57 of 356

  Production Data Manager

5  HYDRA Production Data Manager Basis - Master Data
| 5.1  Note on the descriptions of the basic dialogs  |     |     |     |
| --------------------------------------------------- | --- | --- | --- |
All mandatory fields that must be specified have the addition PK (primary key). All other fields are
optional and are processed if they are transferred.
| 5.2  Terminal configuration                          |     |     |     |
| ---------------------------------------------------- | --- | --- | --- |
| 5.2.1  Edit terminal configuration (DLG=TNR.INSERT,  |     |     |     |
UPDATE, DELETE, COPY, LOCK, UNLOCK, NEW,
SELECT)
You can edit the terminal configuration using the BAPI calls described in this chapter.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
terminals  terminal  no.  Terminal number (PK) for the terminal label 1
TNR.TNR
pzt_kenn  user  no.  Terminal number (PK) for the terminal label 2
TNR.TNR
terminal_status  terminal  no.  Terminal number (PK) for the terminal status
TNR.TNR
BAPI call
| Acronym  | Content / {type}  | Description                                        |     |
| -------- | ----------------- | -------------------------------------------------- | --- |
| DLG      | TNR.INSERT        | Create terminal configuration                      |     |
|          | TNR.UPDATE        | Change terminal configuration                      |     |
|          | TNR.DELETE        | Delete terminal configuration                      |     |
|          | TNR.COPY          | Copy terminal configuration                        |     |
|          | TNR.LOCK          | Lock terminal configuration for processing         |     |
|          | TNR.UNLOCK        | Unlock terminal configuration after processing     |     |
|          | TNR.NEW           | Read specification for new terminal configuration  |     |
|          | TNR.SELECT        | Select terminal configuration                      |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 58 of 356  |
| ---------------- | --- | ------------------- | --------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| TNR.TNR    | {N3}  | PK Terminal number                       |     |     |     |     |
| ---------- | ----- | ---------------------------------------- | --- | --- | --- | --- |
| TNR.TNR:Z  | {N3}  | PK new (target) terminal number to copy  |     |     |     |     |
…  …  For  further  fields, refer  to the  documentation HYD-HDB that
describes the above listed tables
Returned
| Acronym  | Content / {type}  | Description            |                    |         |                    |                |
| -------- | ----------------- | ---------------------- | ------------------ | ------- | ------------------ | -------------- |
| TNR.TNR  | {N3}              | TNR.INSERT, TNR.COPY:  |                    |         |                    |                |
|          |                   | Return                 | of  the  terminal  | number  | for  the  created  | configuration  |

Validation checks
| Error codes  | Description  |     |     |     |     |     |
| ------------ | ------------ | --- | --- | --- | --- | --- |
1680  Parameter with label TNR.TNR must be specified (SELECT, LOCK, UNLOCK,
INSERT, UPDATE, DELETE, COPY)
| 1668  | The terminal must be set up in the database (UPDATE).  |     |     |     |     |     |
| ----- | ------------------------------------------------------ | --- | --- | --- | --- | --- |
1683  The terminal number (TNR.TNR) must be between 1 and 999.  (INSERT, UPDATE)
1683  The terminal type (TNR.ART) must be specified.  (INSERT, UPDATE)
1692  The terminal type 110 and 10 are only available with license HYD-ALS and are
used  for  the  ALS  sub-system  and  the  ALS  data  synchronization.    (INSERT,
UPDATE)
1684  In certain system constellations, several terminals per machine are permitted. No
machine may be assigned to this terminal which is assigned to another MDE
terminal.
This means that the terminal must not be a MDE terminal if an assigned machine is
also assigned to another MDE terminal.
1668  The terminal with the terminal number TNR.TNR is not existent.  (SELECT, LOCK,
UPDATE, DELETE, COPY)
764  The terminal with the terminal number TNR.TNR exists already.  (INSERT)
764  The terminal with the terminal number TNR.TNR exists already.  (COPY)
1666  The data record is currently locked by another user. (UPDATE, DELETE).
1666  The data record is currently locked by another user. (LOCK).
| 5.2.2  List for terminal configurations (DLG=TNR.LIST)  |     |     |     |     |     |     |
| ------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
This BAPI call list the terminals and their configurations in HYDRA.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     |     | Page 59 of 356  |
| ---------------- | --- | ------------------- | --- | --- | --- | --------------- |

  Production Data Manager

Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
terminals  terminal no  Terminal number (PK) for the terminal label 1
TNR.TNR
pzt_kenn  user no  Terminal number (PK) for the terminal label 2
TNR.TNR
terminal_status  terminal no  Terminal number (PK) for the terminal status
TNR.TNR
BAPI call
| Acronym  | Contents  | Description                     |     |
| -------- | --------- | ------------------------------- | --- |
| DLG      | TNR.LIST  | List of terminal configuration  |     |
TNR  {N3}  PK terminal number if an action is supposed to be carried out for
a terminal.
TNR:FROM  {N3}  PK terminal  number from/to if the action is supposed to be
carried out for several terminals in the area from and to.
| TNR:BIS  | {N3}  |     |     |
| -------- | ----- | --- | --- |
(In this case, no plausibility check on the existence of the entry is
made).
| MOD:AKTIV    | J|N     | Listing active terminals J/N                 |     |
| ------------ | ------- | -------------------------------------------- | --- |
| MOD:INAKTIV  | J|N     | Listing inactive terminals J/N               |     |
| FILE         | {C256}  | Specification of the file name for the list  |     |
Returned
| Acronym  | Contents  | Description  |     |
| -------- | --------- | ------------ | --- |
| —        | —         | —            |     |
Validation checks
| Error codes                   | Description                                          |     |     |
| ----------------------------- | ---------------------------------------------------- | --- | --- |
| 1656                          | The file with the name DATEI cannot be written on.   |     |     |
| 5.2.3  Leave terminal update  |                                                      |     |     |
(DLG=TNR.PROGLADEN)
You can trigger a new installation of the terminal program with this BAPI call.  After a successful
installation, the option with label "TNR.PROGLADEN" is automatically reset to "N". Tables

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 60 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
terminal_status  terminal no  Terminal number (PK) for the terminal status
TNR.TNR
BAPI call
| Acronym  | Contents    | Description                        |     |
| -------- | ----------- | ---------------------------------- | --- |
| DLG      | TNR.PROGLAD | Leave or withdraw terminal update  |     |
EN
TNR.TNR  {N3}  PK terminal number if an action is supposed to be carried out for
a terminal.
TNR.TNR:VON  {N3}  PK terminal  number from/to if the action is supposed to be
carried out for several terminals in the area from and to.
| TNR.TNR:BIS  | {N3}  |     |     |
| ------------ | ----- | --- | --- |
(In this case, no plausibility check regarding the existence of the
entry is made).
| TNR.PROGLAD | J|N  | J: initiate terminal update   |     |
| ----------- | ---- | ----------------------------- | --- |
EN
N: withdraw terminal update
Returned
| Acronym  | Contents  | Description  |     |
| -------- | --------- | ------------ | --- |
| —        | —         | —            |     |
Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
1661  You  must  specify  the  parameter  with  label  TNR.TNR  or  TNR.TNR:VON  and
TNR.TNR:BIS.
1668  The terminal (if parameter TNR.TNR is specified) must be set up in the database.
| 5.2.4  Restart terminal   |     |     |     |
| ------------------------- | --- | --- | --- |
(DLG=TNR.NEUSTART)
You can trigger a restart of the terminal with this BAPI call. This setting is transferred to the terminal
when  the  next  status  message  is  sent.  After  restarting  the  terminal,  the  option  with  label
"TNR.NEUSTART" is automatically reset to "N":
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
terminal_status  terminal no  Terminal number (PK) for the terminal status

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 61 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

TNR.TNR
BAPI call
| Acronym  | Contents  | Description  |     |
| -------- | --------- | ------------ | --- |
DLG  TNR.NEUSTART  Initiate or withdraw the terminal restart
TNR.TNR  {N3}  PK terminal number if an action is supposed to be carried out for
a terminal.
TNR.TNR:VON  {N3}  PK terminal  number from/to if the action is supposed to be
carried out for several terminals in the area from and to.
| TNR.TNR:BIS  | {N3}  |     |     |
| ------------ | ----- | --- | --- |
(In this case, no plausibility check regarding the existence of the
entry is made).
| TNR.NEUSTAR | J|N  | J: initiate restart terminal  |     |
| ----------- | ---- | ----------------------------- | --- |
T
N: withdraw terminal restart
Returned
| Acronym  | Contents  | Description  |     |
| -------- | --------- | ------------ | --- |
| —        | —         | —            |     |
Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
1661  You  must  specify  the  parameter  with  label  TNR.TNR  or  TNR.TNR:VON  and
TNR.TNR:BIS.
1668  The terminal (if parameter TNR.TNR is specified) must be set up in the database.
| 5.2.5  Terminal administration (DLG=TNR.ADMIN)  |     |     |     |
| ----------------------------------------------- | --- | --- | --- |
You can use this BAPI call to initiate administrative tasks (terminal update, terminal restart, request a
diagnosis upload, ...).
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
terminal_status  terminal no  Terminal number (PK) for the terminal status
TNR.TNR
BAPI call
| Acronym  | Contents  | Description  |     |
| -------- | --------- | ------------ | --- |
DLG  TNR.NEUSTART  Initiate or withdraw the terminal restart

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 62 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

TNR.TNR  {N3}  PK terminal number if an action is supposed to be carried out for
a terminal.
TNR.TNR:VON  {N3}  PK terminal  number from/to if the action is supposed to be
carried out for several terminals in the area from and to.
| TNR.TNR:BIS  | {N3}  |     |     |
| ------------ | ----- | --- | --- |
(In this case, no plausibility check regarding the existence of the
entry is made).
| TNR.PROGLAD | J|N|U  | J: initiate terminal update   |     |
| ----------- | ------ | ----------------------------- | --- |
EN
N: withdraw terminal update
U: do not execute any changes
| TNR.NEUSTAR | J|N|U  | J: initiate restart terminal  |     |
| ----------- | ------ | ----------------------------- | --- |
T
N: withdraw terminal restart
U: do not execute any changes
| TNR.TLVL  | {C1}  | Set trace level (terminal_status.protokoll)  |     |
| --------- | ----- | -------------------------------------------- | --- |
TNR.BERLESE J|N|U  J: initiate the reading of the authorizations
N
J: initiate the reading of the authorizations
U: do not execute any changes
TNR.DIAGUPL J|N|U  J: initiate the creation of a diagnosis upload
OAD
N: withdraw the creation of a diagnostic upload
U: do not execute any changes
| TNR.AKTIV  | J|N|U  | J: set terminal to active  |     |
| ---------- | ------ | -------------------------- | --- |
N: set terminal to inactive
U: do not execute any changes
| TNR.ERR:TNRI | N   | N: Reset error "double HYDRA user number"  |     |
| ------------ | --- | ------------------------------------------ | --- |
P
Returned
| Acronym  | Contents  | Description  |     |
| -------- | --------- | ------------ | --- |
| —        | —         | —            |     |
Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
1661  You  must  specify  the  parameter  with  label  TNR.TNR  or  TNR.TNR:VON  and
TNR.TNR:BIS.
1668  The terminal (if parameter TNR.TNR is specified) must be set up in the database.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 63 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

| 5.3  Function authorizations                               |     |     |     |     |
| ---------------------------------------------------------- | --- | --- | --- | --- |
| 5.3.1  Edit function authorizations (DLG=BEARBFKT.INSERT,  |     |     |     |     |
UPDATE, DELETE, COPY, LOCK, UNLOCK, NEW,
SELECT)
The function authorizations are edited with these BAPI calls.
Tables
| Table    | Key field  |     | Description                      |     |
| -------- | ---------- | --- | -------------------------------- | --- |
| fkt_tab  | usr        |     | The combination must be unique.  |     |
prg
berechtigung
art

BEARBFKT.BEARB
BEARBFKT.FKT
BEARBFKT.BERECHT
BEARBFKT.ART
BAPI call
| Acronym  | Content / {type}  | Description                                     |     |     |
| -------- | ----------------- | ----------------------------------------------- | --- | --- |
| DLG      | BEARBFKT.INSERT   | Create function authorization                   |     |     |
|          | BEARBFKT.UPDATE   | Change function authorization                   |     |     |
|          | BEARBFKT.DELETE   | Delete function authorization                   |     |     |
|          | BEARBFKT.COPY     | Copy function authorization                     |     |     |
|          | BEARBFKT.LOCK     | Lock function authorization for processing      |     |     |
|          | BEARBFKT.UNLOCK   | Unlock function authorization after processing  |     |     |
BEARBFKT.NEW  Read specification for new function authorization
|             | BEARBFKT.SELECT  | Select function authorization  |     |     |
| ----------- | ---------------- | ------------------------------ | --- | --- |
| BEARBFKT.BE | {C10}            | User                           |     |     |
ARB
| BEARBFKT.FKT  | {C15}  | Function       |     |     |
| ------------- | ------ | -------------- | --- | --- |
| BEARBFKT.BE   | {N4}   | Authorization  |     |     |
RECHT

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 64 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| BEARBFKT.AR | {C15}  | Type  |     |
| ----------- | ------ | ----- | --- |
T
F = function authorization
P = function profile
| MOD  | C 1  | Copy mode  |     |
| ---- | ---- | ---------- | --- |
E - copy current selected authorization
G - copy all authorizations
F - copy missing authorizations
…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Returned
| Acronym    | Content / {type}  | Description          |     |
| ---------- | ----------------- | -------------------- | --- |
| BEARB:FKT  | {C15}             | Current data record  |     |
Current data record
| FKT  | {C15}  |     |     |
| ---- | ------ | --- | --- |
Current data record
| BERECHT  | {N4}  |     |     |
| -------- | ----- | --- | --- |
Current data record
| ART  | {C15}  |     |     |
| ---- | ------ | --- | --- |
Validation checks
| Error codes  | Description                                          |     |     |
| ------------ | ---------------------------------------------------- | --- | --- |
| 1660         | The specified agent is invalid.                      |     |     |
| 1661         | A value is missing that is required for processing.  |     |     |
| 1662         | A value relevant for processing is invalid.          |     |     |
1666  The function authorization is currently being maintained by another user.
| 1669                                     | Data with the same key fields already exist.  |     |     |
| ---------------------------------------- | --------------------------------------------- | --- | --- |
| 5.3.2  List of function authorizations   |                                               |     |     |
(DLG=BEARBFKT.LIST)
The BAPI call returns all specified function authorizations.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 65 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

Tables
| Table    | Key field  |     | Description                      |     |
| -------- | ---------- | --- | -------------------------------- | --- |
| fkt_tab  | usr        |     | The combination must be unique.  |     |
prg
berechtigung
art

BEARBFKT.BEARB
BEARBFKT.FKT
BEARBFKT.BERECHT
BEARBFKT.ART

BAPI call
| Acronym  | Contents       | Description                                  |     |     |
| -------- | -------------- | -------------------------------------------- | --- | --- |
| DLG      | BEARBFKT.LIST  | List of function authorizations              |     |     |
| FILE     | {C256}         | Specification of the file name for the list  |     |     |

|     |     |     |     |     |
| --- | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 66 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| 5.4  Function profiles         |     |     |     |     |
| ------------------------------ | --- | --- | --- | --- |
| 5.4.1   Edit function profile  |     |     |     |     |
 (DLG=FKTPROF.INSERT, UPDATE, DELETE, COPY,
LOCK, UNLOCK, NEW, SELECT)
The function authorizations are edited with these BAPI calls.
Tables
| Table       | Key field  |     | Description                      |     |
| ----------- | ---------- | --- | -------------------------------- | --- |
| fkt_profil  | profil     |     | The combination must be unique.  |     |
prg
berechtigung

FKTPROF.FKTPROF
FKTPROF.FKT
FKTPROF.BERECHT
BAPI call
| Acronym  | Content / {type}  | Description                           |     |     |
| -------- | ----------------- | ------------------------------------- | --- | --- |
| DLG      | FKTPROF.INSERT    | Create function profile               |     |     |
|          | FKTPROF.UPDATE    | Change function profile               |     |     |
|          | FKTPROF.DELETE    | Delete function profile               |     |     |
|          | FKTPROF.COPY      | Copy function profile                 |     |     |
|          | FKTPROF.LOCK      | Lock function profile for processing  |     |     |
FKTPROF.UNLOCK  Release lock for function profile after processing
|             | FKTPROF.NEW     | Read requirement for a new function profile  |     |     |
| ----------- | --------------- | -------------------------------------------- | --- | --- |
|             | FKTPROF.SELECT  | Select function profile                      |     |     |
| FKTPROF.FKT | {C10}           | Profiles                                     |     |     |
PROF
| FKTPROF.FKT  | {C15}  | Function       |     |     |
| ------------ | ------ | -------------- | --- | --- |
| FKTPROF.BER  | {C15}  | Authorization  |     |     |
ECHT
| MOD  | C 1  | Copy mode  |     |     |
| ---- | ---- | ---------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 67 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

G - copy all profiles
F - copy missing profiles
Delete mode
E - delete single functions only
G - delete total function

…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Returned
| Acronym  | Content / {type}  | Description          |     |     |
| -------- | ----------------- | -------------------- | --- | --- |
| FKTPROF  | {C15}             | Current data record  |     |     |
Current data record
| FKT  | {C15}  |     |     |     |
| ---- | ------ | --- | --- | --- |
Current data record
| BERECHT  | {N4}  |     |     |     |
| -------- | ----- | --- | --- | --- |
Validation checks
| Error codes  | Description                                          |     |     |     |
| ------------ | ---------------------------------------------------- | --- | --- | --- |
| 1661         | A value is missing that is required for processing.  |     |     |     |
| 1662         | A value relevant for processing is invalid.          |     |     |     |
1666  The function profile is just edited by another function profile
| 1669                                             | Data with the same key fields already exist.  |     |     |     |
| ------------------------------------------------ | --------------------------------------------- | --- | --- | --- |
| 5.4.2  List function profile (DLG=FKTPROF.LIST)  |                                               |     |     |     |
The BAPI call returns all defined function profiles.
Tables
| Table       | Key field  |     | Description                      |     |
| ----------- | ---------- | --- | -------------------------------- | --- |
| fkt_profil  | profil     |     | The combination must be unique.  |     |
prg
berechtigung

FKTPROF.FKTPROF
FKTPROF.FKT
FKTPROF.BERECHT
BAPI call

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 68 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| Acronym  | Contents      | Description                                  |     |
| -------- | ------------- | -------------------------------------------- | --- |
| DLG      | FKTPROF.LIST  | Function profile list                        |     |
| FILE     | {C256}        | Specification of the file name for the list  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 69 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

| 5.5  Responsibility profiles                             |     |     |     |     |
| -------------------------------------------------------- | --- | --- | --- | --- |
| 5.5.1  Edit responsibility profile (DLG=VABPROF.INSERT,  |     |     |     |     |
UPDATE, DELETE, COPY, LOCK, UNLOCK, NEW,
SELECT)
This BAPI call is used to edit responsibility profiles.
Tables
| Table       | Key field       |     | Description                      |     |
| ----------- | --------------- | --- | -------------------------------- | --- |
| vab_profil  | verantw_profil  |     | The combination must be unique.  |     |
verantw_bereich

VABPROF.VABPROF
VABPROF.VAB
BAPI call
| Acronym  | Content / {type}  | Description                                   |     |     |
| -------- | ----------------- | --------------------------------------------- | --- | --- |
| DLG      | VABPROF.INSERT    | Create responsibility profiles                |     |     |
|          | VABPROF.UPDATE    | Change responsibility profile                 |     |     |
|          | VABPROF.DELETE    | Delete responsibility profile                 |     |     |
|          | VABPROF.COPY      | Copy responsibility profile                   |     |     |
|          | VABPROF.LOCK      | Lock processing for a responsibility profile  |     |     |
VABPROF.UNLOCK  Release lock for responsibility profile after processing
|             | VABPROF.NEW     | Read requirement for new responsibility profile  |     |     |
| ----------- | --------------- | ------------------------------------------------ | --- | --- |
|             | VABPROF.SELECT  | Select responsibility profile                    |     |     |
| VABPROF.VAB | {C15}           | Profile                                          |     |     |
PROF
| VABPROF.VAB  | {C15}  | Area       |     |     |
| ------------ | ------ | ---------- | --- | --- |
| MOD          | {C1}   | Copy mode  |     |     |
G - copy all profiles
F - copy missing profiles
Delete mode
E - Delete only responsibility area

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 70 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

G - delete total profile

…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Returned
| Acronym  | Content / {type}  | Description          |     |     |
| -------- | ----------------- | -------------------- | --- | --- |
| VABPROF  | {C15}             | Current data record  |     |     |
Current data record
| VAB  | {C15}  |     |     |     |
| ---- | ------ | --- | --- | --- |
Current data record
| SELECT  | {C1}  |     |     |     |
| ------- | ----- | --- | --- | --- |
Current data record
| USE  | {C1}  |     |     |     |
| ---- | ----- | --- | --- | --- |
Current data record
| INSERT  | {C1}  |     |     |     |
| ------- | ----- | --- | --- | --- |
Current data record
| UPDATE  | {C1}  |     |     |     |
| ------- | ----- | --- | --- | --- |
Current data record
| DELETE  | {C1}  |     |     |     |
| ------- | ----- | --- | --- | --- |
Validation checks
| Error codes  | Description                                          |     |     |     |
| ------------ | ---------------------------------------------------- | --- | --- | --- |
| 1661         | A value is missing that is required for processing.  |     |     |     |
| 1662         | A value relevant for processing is invalid.          |     |     |     |
1666  The responsibility profile is currently edited by another user
| 1669                            | Data with the same key fields already exist.  |     |     |     |
| ------------------------------- | --------------------------------------------- | --- | --- | --- |
| 5.5.2  Responsibility Profiles  |                                               |     |     |     |
(DLG=VABPROF.LIST)
The BAPI call returns all defined responsibility areas.  The list can be restricted via parameter
VABPROF.VABPROF (with wildcard support).
Tables
| Table       | Key field       |     | Description                      |     |
| ----------- | --------------- | --- | -------------------------------- | --- |
| vab_profil  | verantw_profil  |     | The combination must be unique.  |     |
verantw_bereich

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 71 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

VABPROF.VABPROF
VABPROF.VAB

BAPI call
| Acronym  | Contents      | Description                                  |     |
| -------- | ------------- | -------------------------------------------- | --- |
| DLG      | VABPROF.LIST  | List responsibility                          |     |
| FILE     | {C256}        | Specification of the file name for the list  |     |

|     |     |     |     |
| --- | --- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 72 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

| 5.6  Assignment responsibility areas         |     |     |     |     |
| -------------------------------------------- | --- | --- | --- | --- |
| 5.6.1  Edit assignment responsibility areas  |     |     |     |     |
(DLG=BEARBVABPROF.INSERT, UPDATE, DELETE,
COPY, LOCK, UNLOCK, NEW, SELECT)
You can edit the assignment of the responsibility area with these BAP calls.
Tables
| Table             | Key field  |     | Description                      |     |
| ----------------- | ---------- | --- | -------------------------------- | --- |
| vab_berechtigung  | usr        |     | The combination must be unique.  |     |
berechtigung_art
berechtigung_wert

BEARBVABPROF.BEARB:VAB
BEARBVABPROF.ART
BEARBVABPROF.WERT
BAPI call
| Acronym  | Content / {type}  | Description  |     |     |
| -------- | ----------------- | ------------ | --- | --- |
DLG  BEARBVABPROF.INS Create assignment responsibility areas
ERT
|     | BEARBVABPROF.UPD | Change assignment responsibility area  |     |     |
| --- | ---------------- | -------------------------------------- | --- | --- |
ATE
|     | BEARBVABPROF.DEL | Delete assignment responsibility area  |     |     |
| --- | ---------------- | -------------------------------------- | --- | --- |
ETE
|     | BEARBVABPROF.COP | Copy assignment responsibility area  |     |     |
| --- | ---------------- | ------------------------------------ | --- | --- |
Y
BEARBVABPROF.LOC Lock assignment for responsibliy area for processing
K
BEARBVABPROF.UNL Release lock for assignment for responsibility are after
|     | OCK  | processing  |     |     |
| --- | ---- | ----------- | --- | --- |
BEARBVABPROF.NE Read the requirement for new assigment of responsibility
|     | W                | area                                       |     |     |
| --- | ---------------- | ------------------------------------------ | --- | --- |
|     | BEARBVABPROF.SEL | Select assignment for responsibility area  |     |     |
ECT
| BEARBVABPR | {C15}  | User  |     |     |
| ---------- | ------ | ----- | --- | --- |
OF.BEARB:VAB

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 73 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| BEARBVABPR | {C1}  | Type  |     |     |
| ---------- | ----- | ----- | --- | --- |
OF.ART
V – responsibility area
P - profile
| BEARBVABPR | {C15}  | Responsibility area or profile  |     |     |
| ---------- | ------ | ------------------------------- | --- | --- |
OF.WERT
| MOD  | {C1}  | Copy mode  |     |     |
| ---- | ----- | ---------- | --- | --- |
G - copy all assignments of a user
F - copy all missing assignments
Delete mode
E - delete only separate assignments
G - delete all entries of a user

…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Validation checks
| Error codes             | Description                                          |     |     |     |
| ----------------------- | ---------------------------------------------------- | --- | --- | --- |
| 1661                    | A value is missing that is required for processing.  |     |     |     |
| 1662                    | A value relevant for processing is invalid.          |     |     |     |
| 1666                    | The assignment is currently edited by another user   |     |     |     |
| 1669                    | Data with the same key fields already exist.         |     |     |     |
| 1660                    | The specified agent is invalid.                      |     |     |     |
| 425                     | The responsibility profile is not existent           |     |     |     |
| 5.6.2  Assignment list  |                                                      |     |     |     |
(DLG=BEARBVABPROF.LIST)
The BAPI call returns all defined assignments. The list can be restricted with the following parameter:
BEARBVABPROF.BEARB:VAB  und BEARBVABPROF.WERT (with wildcard support).
Tables
| Table             | Key field  |     | Description                      |     |
| ----------------- | ---------- | --- | -------------------------------- | --- |
| vab_berechtigung  | usr        |     | The combination must be unique.  |     |
berechtigung_art
berechtigung_wert

BEARBVABPROF.BEARB:VAB

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 74 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

BEARBVABPROF.ART
BEARBVABPROF.WERT
BAPI call
| Acronym  | Contents      | Description       |     |
| -------- | ------------- | ----------------- | --- |
| DLG      | BEARBVABPROF. | Assignment list   |     |
LIST
| FILE  | {C256}  | Specification of the file name for the list  |     |
| ----- | ------- | -------------------------------------------- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 75 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

| 5.7  User administration                             |     |     |     |     |
| ---------------------------------------------------- | --- | --- | --- | --- |
| 5.7.1  Edit user (DLG=BEARB.INSERT, UPDATE, DELETE,  |     |     |     |     |
COPY, LOCK, UNLOCK, NEW, SELECT)
You use these BAPI call to edit users.
Tables
| Table     | Key field  |     | Description  |     |
| --------- | ---------- | --- | ------------ | --- |
| user_tab  | usr        |     | PK user      |     |
BEARB.BEARB
BAPI call
| Acronym      | Content / {type}  | Description                             |     |     |
| ------------ | ----------------- | --------------------------------------- | --- | --- |
| DLG          | BEARB.INSERT      | Create users                            |     |     |
|              | BEARB.UPDATE      | Change user                             |     |     |
|              | BEARB.DELETE      | Delete user                             |     |     |
|              | BEARB.COPY        | Copy user                               |     |     |
|              | BEARB.LOCK        | Lock user for processing                |     |     |
|              | BEARB.UNLOCK      | Release lock for user after processing  |     |     |
|              | BEARB.NEW         | Read requirement for new user           |     |     |
|              | BEARB.SELECT      | Select user                             |     |     |
| BEARB.BEARB  | {C10}             | User                                    |     |     |
| BEARB.BEARB: | {C10}             | Target user during copying              |     |     |
Z
|     |     |     |     |     |
| --- | --- | --- | --- | --- |
…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Returned
| Acronym  | Content / {type}  | Description          |     |     |
| -------- | ----------------- | -------------------- | --- | --- |
| BEARB    | {C10}             | Current data record  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 76 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

Validation checks
| Error codes  | Description                                          |     |     |     |
| ------------ | ---------------------------------------------------- | --- | --- | --- |
| 1661         | A value is missing that is required for processing.  |     |     |     |
| 1662         | A value relevant for processing is invalid.          |     |     |     |
1666  The user data is currently being edited by another user.
| 1669  | Data with the same key fields already exist.  |     |     |     |
| ----- | --------------------------------------------- | --- | --- | --- |
| 3020  | The user account is locked!                   |     |     |     |

Plausibility checks for password guidelines
| Error codes  | Description  |     |     |     |
| ------------ | ------------ | --- | --- | --- |
3274  According to the password guideline, the password must not contain the user name.
3704  The entered password is not valid because the password is in the exclusion list.
3275  According to the password guideline, the password is not made-up of enough
letters.
3276  According to the password guideline, the password is not made-up of enough
numbers.
3277  According to the password guideline, the password is not made-up of enough
special characters.
3278  According to the password guideline, the pasword is too short.
2379  According to the password guideline, the password has invalid characters.
3283  The entered password is equivalent to the current one.
| 3280  | The entered password is already in use.   |     |     |     |
| ----- | ----------------------------------------- | --- | --- | --- |
3281  Internal error during the access to the password history
| 5.7.2  User list (DLG=BEARB.LIST)  |     |     |     |     |
| ---------------------------------- | --- | --- | --- | --- |
The BAPI call returns all defined users.
Tables
| Table     | Key field  |     | Description  |     |
| --------- | ---------- | --- | ------------ | --- |
| user_tab  | usr        |     | PK user      |     |
BEARB.BEARB

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 77 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

BAPI call
| Acronym  | Contents    | Description                                  |     |     |
| -------- | ----------- | -------------------------------------------- | --- | --- |
| DLG      | BEARB.LIST  | User list                                    |     |     |
| FILE     | {C256}      | Specification of the file name for the list  |     |     |

| 5.7.3  User login (DLG=BEARB.LOGIN)  |     |     |     |     |
| ------------------------------------ | --- | --- | --- | --- |
The BAPI call perfoms the login process of a user
Tables
| Table     | Key field  |     | Description  |     |
| --------- | ---------- | --- | ------------ | --- |
| user_tab  | usr        |     | PK user      |     |
BEARB.BEARB
BAPI call
| Acronym      | Content / {type}  | Description             |     |     |
| ------------ | ----------------- | ----------------------- | --- | --- |
| DLG          | BEARB.LOGIN       | Logon user              |     |     |
| BEARB.BEARB  | {C10}             | User                    |     |     |
| TYP          | {C10              | T = Hydra Mobile Login  |     |     |

Returned
| Acronym  | Content / {type}  | Description  |     |     |
| -------- | ----------------- | ------------ | --- | --- |
| SYSPRO   | {C20}             | System logs  |     |     |
If full: There is an alarm file alarm.txt available!
| LANG     | {N4}  | Language key             |     |     |
| -------- | ----- | ------------------------ | --- | --- |
| MSGSYNC  | {C1}  | Escalation management:   |     |     |
J = There are new messages including the automatic display of
messages when you log on to the console.
| PWDW  | {C1}  | J = password has run out  |     |     |
| ----- | ----- | ------------------------- | --- | --- |
Validation checks
| Error codes  | Description  |     |     |     |
| ------------ | ------------ | --- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 78 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| 1661  | A value is missing that is required for processing.  |     |     |     |
| ----- | ---------------------------------------------------- | --- | --- | --- |
| 1667  | Number of licenses were exceeded.                    |     |     |     |
| 1665  | Editor/ and or the password is invalid               |     |     |     |

| 5.7.4  User logout (DLG=BEARB.LOGOUT)  |     |     |     |     |
| -------------------------------------- | --- | --- | --- | --- |
The BAPI call performs a logout process of a user.
Tables
| Table     | Key field  |     | Description  |     |
| --------- | ---------- | --- | ------------ | --- |
| user_tab  | usr        |     | PK user      |     |
BEARB.BEARB
BAPI call
| Acronym      | Content / {type}  | Description             |     |     |
| ------------ | ----------------- | ----------------------- | --- | --- |
| DLG          | BEARB.LOGOUT      |  Log off user           |     |     |
| BEARB.BEARB  | {C10}             | User                    |     |     |
| TYP          | {C10              | T = Hydra Mobile Login  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 79 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| 5.8    Locked data records          |     |     |     |     |
| ----------------------------------- | --- | --- | --- | --- |
| 5.8.1  Delete locked data records   |     |     |     |     |
(DLG=BEARBFKT.DELETE)
You can use these BAPI calls to delete locked data records.
Tables
| Table     | Key field  |     | Description                      |     |
| --------- | ---------- | --- | -------------------------------- | --- |
| hyd_lock  | key1       |     | The combination must be unique.  |     |
key2
Note:
key3
|     | key4  |     | The fields key1..key5 und param1 and param2  |     |
| --- | ----- | --- | -------------------------------------------- | --- |
|     | key5  |     | can also be zero.                            |     |
param1
param2
hydrauser
bearb

LOCK.KEY:1
LOCK.KEY:2
LOCK.KEY:3
LOCK.KEY:4
LOCK.KEY:5
LOCK.PARAM:1
LOCK.PARAM:2
LOCK.USR
LOCK.BEARB
BAPI call
| Acronym     | Content / {type}  | Description                    |     |     |
| ----------- | ----------------- | ------------------------------ | --- | --- |
| DLG         | LOCK.DELETE       | Delete the locked data record  |     |     |
| LOCK.BEARB  | {C10}             | User                           |     |     |
| LOCK.USR    | {N4}              | User number                    |     |     |
| LOCK.KEY:1  | {C40}             | BAPI – Object name e.g. MNR    |     |     |
LOCK.KEY:2  {C40}  Value of the BAPI object e.g. machin number
| LOCK.KEY:3  | {C40}  |     |     |     |
| ----------- | ------ | --- | --- | --- |
| LOCK.KEY:4  | {C40}  |     |     |     |
| LOCK.KEY:5  | {C40}  |     |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 80 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| LOCK.PARAM:1  | {C40}  |     |     |
| ------------- | ------ | --- | --- |
| LOCK.PARAM:2  | {C40}  |     |     |
…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables

Validation checks
| Error codes  | Description                                          |     |     |
| ------------ | ---------------------------------------------------- | --- | --- |
| 1661         | A value is missing that is required for processing.  |     |     |
General error message that appears if the selected data (tables or files) is not
101
available.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 81 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

| 5.9  Paths                                           |     |     |     |     |
| ---------------------------------------------------- | --- | --- | --- | --- |
| 5.9.1  Edit paths (DLG=PATH.INSERT, UPDATE, DELETE,  |     |     |     |     |
COPY, LOCK, UNLOCK, NEW, SELECT)
You use these BAPI call to edit HYDRA paths.
Tables
| Table    | Key field  |     | Description  |     |
| -------- | ---------- | --- | ------------ | --- |
| hy_path  | path       |     | PK path      |     |
PATH.PATH
BAPI call
| Acronym      | Content / {type}  | Description                             |     |     |
| ------------ | ----------------- | --------------------------------------- | --- | --- |
| DLG          | PATH.INSERT       | Create path                             |     |     |
|              | PATH.UPDATE       | Change path                             |     |     |
|              | PATH.DELETE       | Delete path                             |     |     |
|              | PATH.COPY         | Copy path                               |     |     |
|              | PATH.LOCK         | Lock the path for processing            |     |     |
|              | PATH.UNLOCK       | Release lock for path after processing  |     |     |
|              | PATH.NEW          | Read requirement for new path           |     |     |
|              | PATH.SELECT       | Select path                             |     |     |
| PATH.PATH    | {C8}              | Path                                    |     |     |
| PATH.SCHEMA  | {C10}             | Schema                                  |     |     |
|              |                   |                                         |     |     |
…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Validation checks
| Error codes  | Description                                          |     |     |     |
| ------------ | ---------------------------------------------------- | --- | --- | --- |
| 1661         | A value is missing that is required for processing.  |     |     |     |
| 1669         | Data with the same key fields already exist.         |     |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 82 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| 1666                              | The path is currently edited by another user.  |     |     |     |
| --------------------------------- | ---------------------------------------------- | --- | --- | --- |
| 5.9.2  Path list (DLG=PATH.LIST)  |                                                |     |     |     |
The BAPI call returns all defined paths.
Tables
| Table    | Key field  |     | Description  |     |
| -------- | ---------- | --- | ------------ | --- |
| hy_path  | path       |     | PK path      |     |
PATH.PATH
BAPI call
| Acronym  | Contents   | Description                                  |     |     |
| -------- | ---------- | -------------------------------------------- | --- | --- |
| DLG      | PATH.LIST  | List paths                                   |     |     |
| FILE     | {C256}     | Specification of the file name for the list  |     |     |

|     |     |     |     |     |
| --- | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 83 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| 5.10  Licensing                                 |     |     |     |     |
| ----------------------------------------------- | --- | --- | --- | --- |
| 5.10.1  Edit licenses (DLG=LIC.INSERT, DELETE)  |     |     |     |     |
You use these BAPI calls to edit licenses.
Tables
| Table        | Key field   |     | Description                     |     |
| ------------ | ----------- | --- | ------------------------------- | --- |
| hyd_license  | productkey  |     | PK combination from all fields  |     |
category
value
valid_till
licensedate
majorrelease
minorrelease

LIC.PROKEY
LIC.CAT
LIC.VAL
LIC.VALIDTILL
LIC.LICDAT
LIC.VER:MAJ
LIC.VER:MIN
BAPI call
| Acronym  | Content / {type}  | Description     |     |     |
| -------- | ----------------- | --------------- | --- | --- |
| DLG      | LIC.INSERT        | Create license  |     |     |

|                | LIC.DELETE  | Delete license         |     |     |
| -------------- | ----------- | ---------------------- | --- | --- |
|                | LIC.USE     | Assign license         |     |     |
| LIC.PROKEY     | {C10}       | Product name           |     |     |
| LIC.CAT        | {C10}       | Category, fix "HYDRA"  |     |     |
| LIC.VAL        | {C10}       |                        |     |     |
| LIC.VALIDTILL  | {DATE}      |                        |     |     |
| LIC.LICDAT     | {DATE}      |                        |     |     |
| LIC.VER:MAJ    | {N4}        |                        |     |     |
| LIC.VER:MIN    | {N4}        |                        |     |     |
As an alternative, a license file can be transferred.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 84 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| MOD   | {C1}    | D – file   |     |
| ----- | ------- | ---------- | --- |
| FILE  | {C255}  | File name  |     |
…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Validation checks
| Error codes  | Description                                          |     |     |
| ------------ | ---------------------------------------------------- | --- | --- |
| 1661         | A value is missing that is required for processing.  |     |     |
| 1669         | Data with the same key fields already exist.         |     |     |
The license data are incorrect or are not suitable to your system.
1671
| 2027                                 | The processing mode is for this posting not allowed.   |     |     |
| ------------------------------------ | ------------------------------------------------------ | --- | --- |
| 5.10.2  License list (DLG=LIC.LIST)  |                                                        |     |     |
The BAPI call returns licenses.
BAPI call
| Acronym  | Contents  | Description                                  |     |
| -------- | --------- | -------------------------------------------- | --- |
| DLG      | LIC.LIST  | Liste Lizenzen                               |     |
| FILE     | {C256}    | Specification of the file name for the list  |     |
| MOD      | {C1}      | List mode                                    |     |
V - available licenses
U- list of used licenses
L - list of all licenses

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 85 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

| 5.11  Client                                                |     |     |     |     |
| ----------------------------------------------------------- | --- | --- | --- | --- |
| 5.11.1  Client login and logout (DLG=CLIENT.LOGIN, LOGOUT)  |     |     |     |     |
These BAPI calls are used to assign a SessionID to a HYDRA USR number.
Tables
| Table          | Key field  |     | Description           |     |
| -------------- | ---------- | --- | --------------------- | --- |
| client_status  | sessionid  |     | PK SessionID          |     |
|                | usr        |     | PK HYDRA user number  |     |
CLIENT.SID
CLIENT.USR
BAPI call
| Acronym  | Content / {type}  | Description  |     |     |
| -------- | ----------------- | ------------ | --- | --- |
DLG  CLIENT.LOGIN  Create assignment between a Session ID and a HYDRA
user number.
CLIENT.LOGOUT  Delete assignment between a SessionID and a HYDRA
number.
| CLIENT.SID  | {C100}  | SessionID of the client  |     |     |
| ----------- | ------- | ------------------------ | --- | --- |
|             |         |                          |     |     |
…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Returned
| Acronym                                                    | Content / {type}  | Description        |     |     |
| ---------------------------------------------------------- | ----------------- | ------------------ | --- | --- |
| USR                                                        | {N5}              | HYDRA user number  |     |     |
| 5.12  INI configuration                                    |                   |                    |     |     |
| 5.12.1  INI - edit configuration (DLG=INI.INSERT, UPDATE,  |                   |                    |     |     |
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT,
IMPORT, EXPORT)
You use these BAPI calls to edit the INI configuration

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 86 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

Tables
| Table    | Key field  |     | Description                      |     |
| -------- | ---------- | --- | -------------------------------- | --- |
| hyd_ini  | hydrauser  |     | The combination must be unique.  |     |
ininame

INI.USR
INI.INI
BAPI call
| Acronym  | Content / {type}  | Description                         |     |     |
| -------- | ----------------- | ----------------------------------- | --- | --- |
| DLG      | INI.INSERT        | INI - create configuration          |     |     |
|          | INI.UPDATE        | INI - change configuration          |     |     |
|          | INI.DELETE        | INI - delete configuration          |     |     |
|          | INI.LOCK          | INI – configuration for processing  |     |     |
INI.UNLOCK  Release lock for INI - configuration after processing
|          | INI.NEW     | Read requirement for new INI configuration          |     |     |
| -------- | ----------- | --------------------------------------------------- | --- | --- |
|          | INI.SELECT  | INI - select configuration                          |     |     |
|          | INI.IMPORT  | Import a complete INI configuration                 |     |     |
|          | INI.EXPORT  | Export of a complete INI configuration in a file.   |     |     |
| INI.USR  | {N4}        | HYDRA user number                                   |     |     |
| INI.INI  | {C80}       | INI - name                                          |     |     |
| FILE     | {C255}      | Filename for import/export                          |     |     |
…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Validation checks
| Error codes  | Description                                            |     |     |     |
| ------------ | ------------------------------------------------------ | --- | --- | --- |
| 1661         | A value is missing that is required for processing.    |     |     |     |
| 1666         | The configuration is currently edited by another user  |     |     |     |
| 1669         | Data with the same key fields already exist.           |     |     |     |
General error message that appears if the selected data (tables or files) is not
101
available.
| 1611  | General database fields   |     |     |     |
| ----- | ------------------------- | --- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 87 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

| 410                                               |     |     |     |     |
| ------------------------------------------------- | --- | --- | --- | --- |
| 5.12.2  INI list - configurations (DLG=INI.LIST)  |     |     |     |     |
The BAPI call returns all defined INI configurations. The list can be restricted via parameter INI.INI
(with wildcard support).
Tables
| Table    | Key field  |     | Description                      |     |
| -------- | ---------- | --- | -------------------------------- | --- |
| hyd_ini  | hydrauser  |     | The combination must be unique.  |     |
ininame

INI.USR
INI.INI
BAPI call
| Acronym  | Contents  | Description                                  |     |     |
| -------- | --------- | -------------------------------------------- | --- | --- |
| DLG      | INI.LIST  | List INI configurations                      |     |     |
| FILE     | {C256}    | Specification of the file name for the list  |     |     |

| 5.12.3  Edit INI sections (DLG=INIDATA.INSERT, UPDATE,  |     |     |     |     |
| ------------------------------------------------------- | --- | --- | --- | --- |
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT)
You use these BAPI calls to edit INI sections.
Tables
| Table         | Key field    |     | Description                      |     |
| ------------- | ------------ | --- | -------------------------------- | --- |
| hyd_ini_data  | ini_verweis  |     | The combination must be unique.  |     |
section
ident

INIDATA.INIVERWEIS
INIDATA.SECTION
INIDATA.KEY
BAPI call
| Acronym  | Content / {type}  | Description         |     |     |
| -------- | ----------------- | ------------------- | --- | --- |
| DLG      | INIDATA.INSERT    | Create INI section  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 88 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

|     | INIDATA.UPDATE  | Change INI section                             |     |     |
| --- | --------------- | ---------------------------------------------- | --- | --- |
|     | INIDATA.DELETE  | Delete INI section                             |     |     |
|     | INIDATA.LOCK    | Lock INI section for processing                |     |     |
|     | INIDATA.UNLOCK  | Release lock for INI section after processing  |     |     |
|     | INIDATA.NEW     | Read requirement for new INI section           |     |     |
|     | INIDATA.SELECT  | Select INI section                             |     |     |
INIDATA.INIVE {N8}  Reference  to  the  corresponding  INI  configuration  in  the
| RWEIS         |        | hyd_ini table.  |     |     |
| ------------- | ------ | --------------- | --- | --- |
| INIDATA.SECTI | {C80}  | Section name    |     |     |
ON
| INIDATA.KEY  | {C80}  | Key name  |     |     |
| ------------ | ------ | --------- | --- | --- |
|              |        |           |     |     |
…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Validation checks
| Error codes  | Description                                            |     |     |     |
| ------------ | ------------------------------------------------------ | --- | --- | --- |
| 1661         | A value is missing that is required for processing.    |     |     |     |
| 1666         | The configuration is currently edited by another user  |     |     |     |
| 1669         | Data with the same key fields already exist.           |     |     |     |
General error message that appears if the selected data (tables or files) is not
101
available.
| 1611                              | General database fields   |     |     |     |
| --------------------------------- | ------------------------- | --- | --- | --- |
| 5.12.4  List of the INI sections  |                           |     |     |     |
(DLG=INIDATA.LIST)
The BAPI call returns all defined sections for the INI entry.  The list can be restricted via parameter
INIDATA.SECTION (with wildcard support). The INI configuration must be specified via parameters
INI.INI and INI.USR in the list request.
Tables
| Table         | Key field    |     | Description                      |     |
| ------------- | ------------ | --- | -------------------------------- | --- |
| hyd_ini_data  | ini_verweis  |     | The combination must be unique.  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 89 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

  Production Data Manager

section
ident

INIDATA.INIVERWEIS
INIDATA.SECTION
INIDATA.KEY

BAPI call
| Acronym  | Contents      | Description                                  |     |
| -------- | ------------- | -------------------------------------------- | --- |
| DLG      | INIDATA.LIST  | INI sections list                            |     |
| FILE     | {C256}        | Specification of the file name for the list  |     |

| 5.13  Number ranges         |     |     |     |
| --------------------------- | --- | --- | --- |
| 5.13.1  Edit number ranges  |     |     |     |
(DLG=NRKREIS.INSERT, UPDATE, DELETE, LOCK,
UNLOCK)
Number ranges are the basis to assign numbers automatically, e.g. order numbers, posting numbers,
etc.
Example: When creating an order and no order number was specified, then the order number can be
automatically calculated according to the specified number range.
You can use two different keys to process existing data records.
1.  The internal number of the data record
(NRKREIS.VERWEIS)
2.  The combination of the logical key fields Object (NRKREIS.OBJTYP), Type (NRKREIS.ART),
Key (NRKREIS.KEY) and Key Value (NRKREIS.VAL).
BAPI call
| Acronym  | Content / {type}  | Description          |     |
| -------- | ----------------- | -------------------- | --- |
| DLG      | NRKREIS.INSERT    | Create number range  |     |
|          | NRKREIS.UPDATE    | Change number range  |     |
|          | NRKREIS.DELETE    | Delete number range  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 90 of 356  |
| ---------------- | --- | ------------------- | --------------- |

  Production Data Manager

|                 | NRKREIS.LOCK    | Release lock number ranges                       |     |     |     |
| --------------- | --------------- | ------------------------------------------------ | --- | --- | --- |
|                 | NRKREIS.UNLOCK  | Release lock for number ranges after processing  |     |     |     |
| NRKREIS.OBJTYP  | C 20            | Generation object                                |     |     |     |
NRKREIS.ART  C 6  Generation type (V=automatic number assignment)
[NRKREIS.ART:1]  C 1  Optional access to the first sign of the generation type
[NRKREIS.ART:2]  C 1  Optional access to the second sign of the generation
type
NRKREIS.KEY  C 20  Optional key The value of the key is managed with
identification  NRKREIS.VAL
NRKREIS.KEY and NRKREIS.VAL can in principle be
assigned as required.
The following keys are specified for number ranges
processed by default in the system:
„AART“: order type
„SAG“: merged operation (only for object = "AUNR")
|     |     | „MELDART“:  | posting  type  | (only  for  object  | IHNR  for  |
| --- | --- | ----------- | -------------- | ------------------- | ---------- |
WRM-IH)
| NRKREIS.VAL  | C 20  | Wert zu NRKREIS.KEY  |     |     |     |
| ------------ | ----- | -------------------- | --- | --- | --- |
e.g. PP01 = order type for NRKREIS.KEY=AART.
If "*" , then no differentiation is made.  All order types
without a specific number range get this entry.
NRKREIS.VERWEIS  N  Internal  data  record  number  (not  for
NRKREIS.INSERT)
NRKREIS.PRAEFIX  C 5  Prefix placed before the number, e.g. "GK (overheads)"
could be the prefix for GK orders.
| NRKREIS.BER:VON  | C 20  | Start of the value range  |     |     |     |
| ---------------- | ----- | ------------------------- | --- | --- | --- |
| NRKREIS.BER:BIS  | C 20  | End of the value range    |     |     |     |
| NRKREIS.BER:VAL  | C 20  | Last assigned value       |     |     |     |
NRKREIS.VERGCODE  C 6  Assignment code "NUM" = numeric assignment
Example
DLG=NRKREIS.INSERT|NRKREIS.OBJTYP=MyObj|NRKREIS.ART=V|NRKREIS.KEY=MyKey|NRKREIS.VAL=MyVal|NRKREIS.PRAEFIX=MYPRF|NRKREIS.BER:V
ON=0000000|NRKREIS.BER:BIS=9999999|NRKREIS.BER:VAL=100|NRKREIS.VERGCODE=NUM|

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 91 of 356  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

  Production Data Manager

5.13.2  Number range list (DLG=NRKREIS.LIST)
The list gets all data records of the number ranges.  The identification can be deduced from the editing
functions.
5.13.3  Create new numbers
(DLG=NRKREIS.CREATENR)
The function NRKREIS.CREATENR creates a new number in the configured number range.
The new number for allocation code "NUM" results from the value +1 last allocated.
Create a type definition for the user field in order to format values.
| Field in the type definition  | Contents             |     |     |
| ----------------------------- | -------------------- | --- | --- |
| General / type                | Number range object  |     |     |
| General / name                | Any                  |     |     |
| General / description         | Any                  |     |     |
General / length  Required length for formatting the new number. It might be the case that
the length requires a prefix included in the number range.
Terminal / fill character  0: the new value is filled with leading zeros at the beginning
-: the new value is filled with zeros starting at the end

BAPI call
| Acronym  | Contents  | Description  |     |
| -------- | --------- | ------------ | --- |
DLG  NRKREIS.CREATENR  Generate a new number from the number range
| NRKREIS.OBJTYP  | C 20  | Generation object  |     |
| --------------- | ----- | ------------------ | --- |
NRKREIS.ART  C 6  Generation type (V=automatic number assignment)
| NRKREIS.KEY  | C 20  | Key  |     |
| ------------ | ----- | ---- | --- |
Qualification Qualification within a generation object
(for order number, order type, merged operation)in a
generation object (for order number, e.g. order type,
merged operation)
AART = order type
SAG = merged operation (only for object = "AUNR")
„MELDART“ = posting type (only for object IHNR for

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 92 of 356  |
| ---------------- | --- | ------------------- | --------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

WRM-IH)
| NRKREIS.VAL  | C 20  | Value  |     |     |     |
| ------------ | ----- | ------ | --- | --- | --- |
e.g. PP01 = order type;
If "*" , then no distinction is made or all order types for
|     |     | which  | no  specific  number  | range  is  defined  | are  |
| --- | --- | ------ | --------------------- | ------------------- | ---- |
assigned this entry.
[NRKREIS.VERWEIS]  N  Internal data record number Alternative key for the
combination of NRKREIS.OBJTYP, NRKREIS.ART,
NRKREIS.KEY and NRKREIS.VAL.
Returned
| Acronym  | Contents  | Description                        |     |     |     |
| -------- | --------- | ---------------------------------- | --- | --- | --- |
| BER:VAL  | Cx        | New number not formatted           |     |     |     |
| NR       | Cx        | Prefix + new number not formatted  |     |     |     |
NR:FILLED  Cx  Only if a type definition for the user field exists for the object of
the number range:

Validation checks
| Error codes  | Description  |     |     |     |     |
| ------------ | ------------ | --- | --- | --- | --- |
3300  Incorrect assignment code Currently only the assignment code NUM is supported.
3301  If the value range of the number range is exceeded, an error message pops up.

Example
DLG=NRKREIS.CREATENR|NRKREIS.OBJTYP=MyObj|NRKREIS.ART=V|NRKREIS.KEY=MyKey|NRKREIS.VAL=MyVal|

Rückgabe:Return:
RET=0|KT=|LT=|DATA=NRKREIS|OBJTYP=MyObj|ART=V|KEY=MyKey|VAL=MyVal|VERWEIS=19|NR=MYPR106|PRAEFIX=MYPR|BER:VON=0000000|BER:BIS=
9999999|BER:VAL=106|VERGCODE=NUM|BEARB=12345|BEARBDAT=05/29/2019|BEARBZEI=35096|NR:FILLED=MYPR0000000000000106|

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 93 of 356  |     |
| ---------------- | --- | ------------------- | --- | --------------- | --- |

Production Data Manager
6 HYDRA Production Data Manager BDE/MDE - Data
Collection
6.1 Note on the descriptions of the input dialogs
All fields that are mandatory and must be specified are highlighted using a gray background color. All
other fields are optional and are processed when passed.
The MES order number ANR is the fully defined key of the object. This number always includes all
specifications (in the order displayed)
 Order number
 Sequence (only relevant in combination with the additional function BDE-APF)
 Operation number
 Split number (only relevant in combination with the additional functions BDE-SGG)
The MES order number is of type C (char). The field lengths specified during the HYDRA setup must
be respected. The length of the MES order number ANR is the sum total of the lengths of the different
fields.
If you use the split functionality (BDE-SSG), the length of the MES order number ANR depends on
whether it is a split operation or not. If it is not a split OP, the MES order number is reduced by the
length of the split number.
Examples:
 Order number length: 8, operation number length: 4, no sequence, no splits:
 ANR length: 12
 Order number length: 8, operation number length: 4, sequence number length: 1, no splits:
 ANR length: 13
SCS-PDM_81.docx Version: 1.0.23049 Page 94 of 356

  Production Data Manager

  Order number length: 8, operation number length: 4, sequence number length: 0, split number
length: 1:
|  ANR length if no split operation:    |     | 12    |     |     |
| -------------------------------------- | --- | ----- | --- | --- |
|  ANR length if split operation:       |     |   13  |     |     |
  Order number length: 8, operation number length: 4, sequence number length: 1, split number
length: 1:
|  ANR length if no split operation:    |     | 13    |     |     |
| -------------------------------------- | --- | ----- | --- | --- |
|  ANR length if split operation:       |     |   14  |     |     |

6.2  Order, staff and machine postings
| 6.2.1  Note on automatically recorded quantities  |     |     |     |     |
| ------------------------------------------------- | --- | --- | --- | --- |
All input dialogs (e.g. A_UN, P_AB), which include manually recorded values (EGR:GUT, EGR:AUS),
support the automatically recorded values AGR.C:[1..n], AGE.C:[1..n], AGG.C:[1..n], AGB.C:[1..n],
AGR:HUB.  For  a  better  overview,  these  values  are  not  displayed  in  the  different  input  dialogs
(exception: M_AST, A_AUN and A_ASW).
The following table generally defines the valid IDs for automatic quantities from counters in the dialog
data:
| Identifier  | Type / max. field  |     | Description   |     |
| ----------- | ------------------ | --- | ------------- | --- |
length
AGR.C:[1..n]=  Double  Automatically recorded counter delta of counters 1...n
| AGE.C:[1..n]=  | C4  | Unit of counter (e.g. PCS)  |     |     |
| -------------- | --- | --------------------------- | --- | --- |
for future use
| AGG.C:[1..n]=  | N4  | Reason for counter (e.g. scrap reason)  |     |     |
| -------------- | --- | --------------------------------------- | --- | --- |
AGB.C:[1..n]=  C10  Evaluation for counter (yield, scrap, rework, sample: GUT, AUS, NCH,
PRB) - see note below.
| AGR:HUB=  | Double  | Automatically recorded cycles  |     |     |
| --------- | ------- | ------------------------------ | --- | --- |

Do not use the following acronyms as of MW 4.0pe:
| AGR:GUT=  | Double  | Automatic yield         |     |     |
| --------- | ------- | ----------------------- | --- | --- |
| AGR:AUS=  | Double  | Automatic scrap         |     |     |
| AGG:AUS=  | N4      | Scrap reason            |     |     |
| AGE:GUT=  | C4      | Unit of yield quantity  |     |     |
| AGE:AUS=  | C4      | Unit of scrap quantity  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 95 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

Production Data Manager
Example
AGR.C:1=47|AGB.C:1=GUT|AGR.C:2=1|AGB.C:2=AUS|AGG.C:2=12|....|AGR:HUB=..|
Notes
 Automatic counters are not yet used for calculation. A calculation using the partitioning and the
pulse factor and other quantity accounts (e.g. when the total quantity is recorded) is only
performed in the HYDRA server.
 The counter evaluation – identifier AGB.C:{..} – is an optional identifier and need not be
transferred.
 If the identifier AGB.C:{..} is not included in the dialog data, the counter is posted by default
according to the evaluation specified in the counter configuration.
 If the identifier AGB.C:{..} is included in the dialog data, then the counter is posted according
to this evaluation. Here, the evaluation specified in the counter configuration is overridden.
6.2.2 Notes on manually recorded quantities
6.2.2.1 Recording of manual quantities in alternative
quantity units
All input dialogs (e.g. A_UN, P_AB), which include manually recorded values in primary quantity unit
(EGR:GUT, EGR:AUS,etc.), also support the recording of quantities in the following alternative
quantity units:
 Base quantity unit
 Secondary quantity unit
 Tertiary quantity unit
The table below provides an overview of the available and valid IDs of the manual recording of
quantities in the dialog data:
Identifier Type / max. field Description
length
EGR:GUT= Double Yield recorded in primary quantity unit
or
EGR:GUTP=
EGG:GUT= N4 Optional reason for the yield recorded in primary quantity unit
or
SCS-PDM_81.docx Version: 1.0.23049 Page 96 of 356

  Production Data Manager

| Identifier  | Type / max. field  |     | Description   |     |
| ----------- | ------------------ | --- | ------------- | --- |
length
EGG:GUTP=
| EGR:GUTB=  | Double  | Yield recorded in base quantity unit  |     |     |
| ---------- | ------- | ------------------------------------- | --- | --- |
EGG:GUTB=  N4  Optional reason for the yield recorded in base quantity unit
| EGR:GUTS=  | Double  | Yield recorded in secondary quantity unit  |     |     |
| ---------- | ------- | ------------------------------------------ | --- | --- |
EGG:GUTS=  N4  Optional reason for the yield recorded in secondary quantity unit
| EGR:GUTT=  | Double  | Yield recorded in tertiary quantity unit  |     |     |
| ---------- | ------- | ----------------------------------------- | --- | --- |
EGG:GUTT=  N4  Optional reason for the yield recorded in tertiary quantity unit
EGR:AUS=  Double  Scrap quantity recorded in primary quantity unit
or
EGR:AUSP=
EGG:AUS=  N4  Optional reason for the scrap recorded in primary quantity unit
or
EGG:AUSP=
| EGR:AUSB=  | Double  | Scrap recorded in base quantity unit  |     |     |
| ---------- | ------- | ------------------------------------- | --- | --- |
EGG:AUSB=  N4  Optional reason for the scrap recorded in base quantity unit
| EGR:AUSS=  | Double  | Scrap recorded in secondary quantity unit  |     |     |
| ---------- | ------- | ------------------------------------------ | --- | --- |
EGG:AUSS=  N4  Optional reason for the scrap recorded in secondary quantity unit
| EGR:AUST=  | Double  | Scrap recorded in tertiary quantity unit  |     |     |
| ---------- | ------- | ----------------------------------------- | --- | --- |
EGG:AUST=  N4  Optional reason for the scrap recorded in tertiary quantity unit
EGR:NCH=  Double  Rework quantity recorded in primary quantity unit
or
EGR:NCHP=
EGG:NCH=  N4  Optional reason for the rework recorded in primary quantity unit
or
EGG:NCHP=
EGR:NCHB=  Double  Recorded rework quantity in base quantity unit
EGG:NCHB=  N4  Optional reason for the rework recorded in base quantity unit
EGR:NCHS=  Double  Rework quantity recorded in secondary quantity unit
EGG:NCHS=  N4  Optional reason for the rework recorded in secondary quantity unit
| EGR:NCHT=  | Double  | Rework recorded in tertiary quantity unit  |     |     |
| ---------- | ------- | ------------------------------------------ | --- | --- |
EGG:NCHT=  N4  Optional reason for the rework recorded in tertiary quantity unit
EGR:PRB=  Double  Open quantity / problem quantity recorded in primary quantity unit
or
EGR:PRBP=
EGG:PRB=  N4  Optional reason for the open quantity / problem quantity recorded in primary
| or  |     | quantity unit  |     |     |
| --- | --- | -------------- | --- | --- |
EGG:PRBP=
EGR:PRBB=  Double  Open quantity / problem quantity recorded in base quantity unit

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 97 of 356  |
| ---------------- | --- | ------------------- | --- | --------------- |

Production Data Manager
Identifier Type / max. field Description
length
EGG:PRBB= N4 Optional reason for the open quantity / problem quantity recorded in base
quantity unit
EGR:PRBS= Double Open quantity / problem quantity recorded in secondary quantity unit
EGG:PRBS= N4 Optional reason for the open quantity / problem quantity recorded in
secondary quantity unit
EGR:PRBT= Double Open quantity / problem quantity recorded in tertiary quantity unit
EGG:PRBT= N4 Optional reason for the open quantity / problem quantity recorded in tertiary
quantity unit
Examples:
 Upload of a part quantity with yield in primary quantity unit and scrap and scrap reason in
secondary quantity unit
DLG=A_TR|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100473100200|
EGR:GUTP=1|EGR:AUSS=2|EGG:AUSS=1|
 Upload of a part quantity with yield in primary quantity unit and secondary quantity unit
DLG=A_TR|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100473100200|
EGR:GUTP=1| EGR:GUTS=11|
If quantities are recorded in alternative quantity units, these quantities take priority over the conversion
using the conversion factors stored for the operation or over a formula stored in the system. In this
case, no conversion into the quantity unit recorded is performed.
But the conversion into configured, but not recorded quantity units is performed.
Example: The yield can be recorded in primary quantity unit (EGR:GUTP) and secondary quantity unit
(EGR:GUTS) in a dialog and the quantity is then converted into the base quantity and tertiary quantity
if the conversion factors are stored.
The conversion of quantities into quantity units that are not manually recorded is performed according
to the following priority:
1. Primary quantity: conversion into secondary quantity and tertiary quantity
2. Secondary quantity: conversion into primary quantity and tertiary quantity
3. Tertiary quantity: conversion into primary quantity and secondary quantity
The base quantity unit is generally used for conversions between primary, secondary and tertiary
quantities.
SCS-PDM_81.docx Version: 1.0.23049 Page 98 of 356

Production Data Manager
For further information on the conversion of quantities and examples, refer to the document
MBL_Quantity_Conversion.pdf.
6.2.2.2 Recording of quantities with different reasons
The recording of scrap, rework and open quantities with different reasons in one dialog is supported.
To do so, you must complement the IDs for the scrap quantity and the reason with a numeric and
consecutive index – starting with 1.
The below table for scrap also applies for rework (identifier *NCH* instead of *AUS*) and open
quantities (identifier *PRB* instead of *AUS*).
Identifier Type / max. field Description
length
EGR:AUS#[1..n]= Double Scrap quantity recorded in primary quantity unit with consecutive index
or
EGR:AUSP#[1..n]=
EGG:AUS#[1..n]= N4 Optional reason for the scrap recorded in primary quantity unit and the
or relevant index
EGG:AUSP#[1..n]=
EGR:AUSB#[1..n]= Double Scrap recorded in base quantity unit with consecutive index
EGG:AUSB#[1..n]= N4 Optional reason for the scrap recorded in base quantity unit and the
relevant index
EGR:AUSS#[1..n]= Double Scrap recorded in secondary quantity unit with consecutive index
EGG:AUSS#[1..n]= N4 Optional reason for the scrap recorded in secondary quantity unit and
the relevant index
EGR:AUST#[1..n]= Double Scrap recorded in tertiary quantity unit with consecutive index
EGG:AUST#[1..n]= N4 Optional reason for the scrap recorded in tertiary quantity unit and the
relevant index
Example:
 Upload of a part quantity with yield quantity and two scrap quantities with reasons 20 and 30
DLG=A_TR|ANR=ANR=AAA2100473100200|EGR:GUTP=123|EGR:AUSP#1=2|EGG:AUSP#1=20|
EGR:AUSP#2=1|EGG:AUSP#2=20|
6.2.3 Collection of user fields
User fields can be collected in dialogs with the following events:
 Log on operations
SCS-PDM_81.docx Version: 1.0.23049 Page 99 of 356

  Production Data Manager

  Posting of part quantities for operations
  Interrupt operations
  Log off operations
  Finish operations
  Quantity uploads for operations
  Log off staff
The collected user fields are integrated into the data of the operation and the order-related postings
resulting from the posting event.
Sometimes it is unwanted that the collected user fields overwrite the user fields of the operation. If the
field identification ANR:SETUSRFLD is transmitted with the value "N", the system does not integrate the
collected user fields in the Operation, but only in the Order-related postings.
| Identifier    | Data type  | Description             |     |     |
| ------------- | ---------- | ----------------------- | --- | --- |
| FU:1 to FU:6  | Date       | User fields for a date  |     |     |
FU:7 to FU:22  N (=night)  Integer with value range from -2147483647 to 2147483647
FU:23 to FU:28  DECIMAL(18,6)  Decimal number with a value range of 12 digits before comma and a
precision of 6 digits after comma.
| FU:29 to FU:44  | C1  | User field for 1 character  |     |     |
| --------------- | --- | --------------------------- | --- | --- |
FU:45 to FU:50  C10  User field for a text with a maximum of 10 characters
FU:51 to FU:64  C20  User field for a text with a maximum of 20 characters
FU:65 to FU:66  C40  User field for a text with a maximum of 40 characters
ANR:SETUSRFLD  C1  =  {J/N}  With ANR:SETUSRFLD=N, the user fields of the dialog (FU:1 to
  FU:66) are not integrated into the operation data. The user fields are
only transferred to the BDE log record (if a log record is created).

| 6.2.4  Log operation on (DLG=A_AN)  |              |     |               |     |
| ----------------------------------- | ------------ | --- | ------------- | --- |
| Identifier                          | Type / max.  |     | Description   |     |
field length
| ANR=  | C    | MES order number (fully defined key)  |     |     |
| ----- | ---- | ------------------------------------- | --- | --- |
| MNR=  | C8   | Workplace/machine number              |     |     |
| PNR=  | C10  | or  Personnel number                  |     |     |
| KNR=  | C10  | Staff badge number                    |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 100 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| Identifier  | Type / max.  |     | Description   |     |
| ----------- | ------------ | --- | ------------- | --- |
field length
| CNR=  | C20  | Batch number (output batch)  |     |     |
| ----- | ---- | ---------------------------- | --- | --- |
MST=  N4  Set new machine status or automatically change into Production
status (customer-specific)

Example 1: Log OP on
DLG=A_AN|USR=2106|DAT=02/17/2000|ZEI=47972|ANR=0004990701|MNR=4560|KNR=9999
99|
Example 2: Log OP and batch on
DLG=A_AN|USR=2106|DAT=02/17/2000|ZEI=47972|ANR=0004990701|MNR=4560|KNR=9999
99|CNR=CHV0001112|
| 6.2.5  Log operation and person on (DLG=A_P_AN)  |              |     |               |     |
| ------------------------------------------------ | ------------ | --- | ------------- | --- |
| Identifier                                       | Type / max.  |     | Description   |     |
field length
| ANR=  | C    | MES order number (fully defined key)  |     |     |
| ----- | ---- | ------------------------------------- | --- | --- |
| MNR=  | C8   | Workplace/machine number              |     |     |
| PNR=  | C10  | or  Personnel number                  |     |     |
| KNR=  | C10  | Staff badge number                    |     |     |
| CNR=  | C20  | Batch number (output batch)           |     |     |
MST=  N4  Set new machine status or automatically change into Production
status (customer-specific)

Example 1: Log operation and person on
DLG=A_P_AN|USR=2106|DAT=02/17/2000|ZEI=47972|ANR=0004990701|MNR=4560|KNR=99
9999|
Example 2: Log batch and person on
DLG=A_P_AN|USR=2106|DAT=02/17/2000|ZEI=47972|ANR=0004990701|MNR=4560|KNR=12
3456|CNR=CHV0001112|

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 101 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| 6.2.6  Posting of part quantity (Partial confirmation)  |     |     |     |     |
| ------------------------------------------------------- | --- | --- | --- | --- |
(DLG=A_TR)
| Identifier  | Type / max.  |     | Description   |     |
| ----------- | ------------ | --- | ------------- | --- |
field length
| ANR=      | C    | MES order number (fully defined key)          |     |     |
| --------- | ---- | --------------------------------------------- | --- | --- |
| MNR=      | C8   | Workplace/machine number                      |     |     |
| PNR=      | C10  | or  Personnel number                          |     |     |
| KNR=      | C10  | Staff badge number                            |     |     |
| EGR:GUT=  | N8   | Yield recorded                                |     |     |
| EGR:AUS=  | N8   | Scrap recorded                                |     |     |
| EGG:GUT=  | N4   | Reason                                        |     |     |
| EGG:AUS=  | N4   | Scrap reason (required if EGR:AUS is passed)  |     |     |
| EGE:GUT=  | C4   | Unit                                          |     |     |
| EGE:AUS=  | C4   | Unit of scrap quantity                        |     |     |
Example 1: Posting of part quantity with scrap and scrap reason
DLG=A_TR|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100473100200|
MNR=60610|EGR:GUT=1|EGR:AUS=2|EGG:AUS=1|
| 6.2.7  Interrupt operation (DLG=A_UN)  |              |     |               |     |
| -------------------------------------- | ------------ | --- | ------------- | --- |
| Identifier                             | Type / max.  |     | Description   |     |
field length
| ANR=      | C    | MES order number (fully defined key)  |     |     |
| --------- | ---- | ------------------------------------- | --- | --- |
| MNR=      | C8   | Workplace/machine number              |     |     |
| PNR=      | C10  | or  Personnel number                  |     |     |
| KNR=      | C10  | Staff badge number                    |     |     |
| EGR:GUT=  | N8   | Yield recorded                        |     |     |
| EGR:AUS=  | N8   | Scrap recorded                        |     |     |
| EGG:GUT=  | N4   | Reason                                |     |     |
| EGG:AUS=  | N4   | Scrap reason                          |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 102 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| Identifier  | Type / max.  |     | Description   |     |
| ----------- | ------------ | --- | ------------- | --- |
field length
| EGE:GUT=  | C4  | Unit of yield quantity  |     |     |
| --------- | --- | ----------------------- | --- | --- |
| EGE:AUS=  | C4  | Unit of scrap quantity  |     |     |
| MST=      | N4  | New machine status      |     |     |

Example 1: Interrupt OP with input of quantity
DLG=A_UN|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|
MNR=60610|EGR:GUT=1|
Example 2: Interrupt OP with input of quantity and unit
DLG=A_UN|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|
MNR=60610|EGR:GUT=1|EGE:GUT=ST|
Example 3: Interrupt OP with input of quantity, scrap and scrap reason
DLG=A_UN|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|
MNR=60610|EGR:GUT=1|EGR:AUS=2|EGG:AUS=1|
| 6.2.8  Log operation off (DLG=A_AB)  |              |     |               |     |
| ------------------------------------ | ------------ | --- | ------------- | --- |
| Identifier                           | Type / max.  |     | Description   |     |
field length
| ANR=      | C    | MES order number (fully defined key)  |     |     |
| --------- | ---- | ------------------------------------- | --- | --- |
| MNR=      | C8   | Workplace/machine number              |     |     |
| PNR=      | C10  | or  Personnel number                  |     |     |
| KNR=      | C10  | Staff badge number                    |     |     |
| EGR:GUT=  | N8   | Yield recorded                        |     |     |
| EGR:AUS=  | N8   | Scrap recorded                        |     |     |
| EGG:GUT=  | N4   | Reason                                |     |     |
| EGG:AUS=  | N4   | Scrap reason                          |     |     |
| EGE:GUT=  | C4   | Unit of yield quantity                |     |     |
| EGE:AUS=  | C4   | Unit of scrap quantity                |     |     |
| MST=      | N4   | New machine status                    |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 103 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

Example 1: Log OP off with input of quantity
DLG=A_AB|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|
MNR=60610|EGR:GUT=1|
Example 2: Log OP off with input of quantity and unit
DLG=A_AB|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|
MNR=60610|EGR:GUT=1|EGE:GUT=ST|
Example 3: Log OP off with input of quantity, scrap and scrap reason
DLG=A_AB|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|
MNR=60610|EGR:GUT=1|EGR:AUS=2|EGG:AUS=1|
| 6.2.9  Finish operation (DLG=A_BE)  |     |     |     |     |
| ----------------------------------- | --- | --- | --- | --- |
Finish prepared or interrupted operation.
| Identifier  | Type / max.  |     | Description   |     |
| ----------- | ------------ | --- | ------------- | --- |
field length
| ANR=      | C    | MES order number (fully defined key)  |     |     |
| --------- | ---- | ------------------------------------- | --- | --- |
| MNR=      | C8   | Workplace/machine number              |     |     |
| PNR=      | C10  | or  Personnel number                  |     |     |
| KNR=      | C10  | Staff badge number                    |     |     |
| EGR:GUT=  | N8   | Yield recorded                        |     |     |
| EGR:AUS=  | N8   | Scrap recorded                        |     |     |
| EGG:GUT=  | N4   | Reason                                |     |     |
| EGG:AUS=  | N4   | Scrap reason                          |     |     |
| EGE:GUT=  | C4   | Unit of yield quantity                |     |     |
| EGE:AUS=  | C4   | Unit of scrap quantity                |     |     |

The time of the posting (acronym ZEI) must not be at shift change. Background: CORU-Call
  #118905.
Example 1: Finish OP with input of quantity
DLG=A_BE|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|
MNR=60610|EGR:GUT=1|
Example 2: Finish OP with input of quantity and unit
DLG=A_BE|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|
MNR=60610|EGR:GUT=1|EGE:GUT=ST|

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 104 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

Example 3: Finish OP with input of quantity, scrap and scrap reason
DLG=A_BE|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|
MNR=60610|EGR:GUT=1|EGR:AUS=2|EGG:AUS=1|

| 6.2.10  Quantity upload (DLG=A_MR)  |     |     |     |     |
| ----------------------------------- | --- | --- | --- | --- |
You can use the quantity upload to upload quantities for orders, which are not logged on at the
moment. This way, you can correct a quantity of an order without having to log the order on and off.
Note:
This dialog does not change the postings performed for the machine performance.
| Identifier  | Type / max.  |     | Description   |     |
| ----------- | ------------ | --- | ------------- | --- |
field length
| ANR=      | C    | MES order number (fully defined key)  |     |     |
| --------- | ---- | ------------------------------------- | --- | --- |
| MNR=      | C8   | Workplace/machine number              |     |     |
| PNR=      | C10  | or  Personnel number                  |     |     |
| KNR=      | C10  | Staff badge number                    |     |     |
| EGR:GUT=  | N8   | Yield recorded                        |     |     |
| EGR:AUS=  | N8   | Scrap recorded                        |     |     |
| EGG:GUT=  | N4   | Reason                                |     |     |
| EGG:AUS=  | N4   | Scrap reason                          |     |     |
| EGE:GUT=  | C4   | Unit                                  |     |     |
| EGE:AUS=  | C4   | Unit of scrap quantity                |     |     |

The time of the posting (acronym ZEI) must not be at shift change. Background: CORU-Call
  #118905. We think that the problem that occurred with A_BE can also occur here with A_MR.

Example 1: Quantity upload with scrap and scrap reason

DLG=A_MR|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100473100200|

MNR=60610|EGR:GUT=1|EGR:AUS=2|EGG:AUS=1|

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 105 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| 6.2.11  Log person on (DLG=P_AN)  |              |     |               |     |
| --------------------------------- | ------------ | --- | ------------- | --- |
| Identifier                        | Type / max.  |     | Description   |     |
field length
| MNR=  | C8   | Workplace/machine number  |     |     |
| ----- | ---- | ------------------------- | --- | --- |
| PNR=  | C10  | or  Personnel number      |     |     |
| KNR=  | C10  | Staff badge number        |     |     |
Example 1: Log person on
DLG=P_AN|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|MNR=871555|
| 6.2.12  Log person off (DLG=P_AB)  |              |     |               |     |
| ---------------------------------- | ------------ | --- | ------------- | --- |
| Identifier                         | Type / max.  |     | Description   |     |
field length
| MNR=      | C8   | Workplace/machine number  |     |     |
| --------- | ---- | ------------------------- | --- | --- |
| PNR=      | C10  | or  Personnel number      |     |     |
| KNR=      | C10  | Staff badge number        |     |     |
| EGR:GUT=  | N8   | Yield recorded            |     |     |
| EGR:AUS=  | N8   | Scrap recorded            |     |     |
| EGG:GUT=  | N4   | Reason                    |     |     |
| EGG:AUS=  | N4   | Scrap reason              |     |     |
| EGE:GUT=  | C4   | Unit                      |     |     |
| EGE:AUS=  | C4   | Unit of scrap quantity    |     |     |
Example 1: Log person off
DLG=P_AB|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|MNR=871555|
Example 2: Log person off with input of quantity, scrap and scrap reason
DLG=P_AB|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|MNR=123456|EGR:GUT=1|
EGR:AUS=2|EGG:AUS=1|
| 6.2.13  Log off all persons from machine (DLG=P_AAB)  |              |     |               |     |
| ----------------------------------------------------- | ------------ | --- | ------------- | --- |
| Identifier                                            | Type / max.  |     | Description   |     |
field length
| MNR=  | C8  | Workplace/machine number  |     |     |
| ----- | --- | ------------------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 106 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| Identifier  | Type / max.  |     | Description   |     |
| ----------- | ------------ | --- | ------------- | --- |
field length
| EGR:GUT=  | N8  | Yield recorded          |     |     |
| --------- | --- | ----------------------- | --- | --- |
| EGR:AUS=  | N8  | Scrap recorded          |     |     |
| EGG:GUT=  | N4  | Reason                  |     |     |
| EGG:AUS=  | N4  | Scrap reason            |     |     |
| EGE:GUT=  | C4  | Unit                    |     |     |
| EGE:AUS=  | C4  | Unit of scrap quantity  |     |     |
Example 1: Log off all persons from machine
DLG=P_AAB|USR=2106|DAT=02/17/2000|ZEI=47972|MNR=871555|
Example 2: Log all persons off with input of quantity, scrap and scrap reason
DLG=P_AAB|USR=2106|DAT=02/17/2000|ZEI=47972|MNR=123456|EGR:GUT=1|EGR:AUS=2|
EGG:AUS=1|
| 6.2.14  Change machine status (DLG=M_MST)  |              |     |               |     |
| ------------------------------------------ | ------------ | --- | ------------- | --- |
| Identifier                                 | Type / max.  |     | Description   |     |
field length
| MNR=  | C8  | Workplace/machine number  |     |     |
| ----- | --- | ------------------------- | --- | --- |
| MST=  | N4  | New machine status:       |     |     |
Malfunction reason and/or machine status.
Example: 1 = Production, 99 = general disturbance/malfunction
The definition depends on the machine configuration.
| PNR=  | C10  | or  Personnel number                     |     |     |
| ----- | ---- | ---------------------------------------- | --- | --- |
| KNR=  | C10  | Staff badge number                       |     |     |
| IZY=  | N8   | Actual cycle in seconds per 1000 cycles  |     |     |
| BEM=  | C40  | You can enter a free comment             |     |     |
PROGNDAUER=  C4  Expected time that the new status will be available.
For documentation purposes, this information is stored with the
status event. If the field has the value 0 or is empty, the new
status will be available "for an indefinite period".
Additional data for the escalation management
| MSGPRIO=  | N1  | Priority:  |     |     |
| --------- | --- | ---------- | --- | --- |
1 = highest, 2 = high, 3 = normal, 4 = low, 5 =lowest

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 107 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |     |     |
| --- | --- | --- | --- | ------------------------ | --- | --- |

| MSGCLASS=  | C1  | Information class/importance  |     |     |     |     |
| ---------- | --- | ----------------------------- | --- | --- | --- | --- |
I = Information, W = Warning, E = Error
MSGRCV=  C40  Recipient/addressee, e.g. group of plant managers

Example 1: Person changes machine status
DLG=M_MST|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|MNR=871555|MST=3|
| Note:    |     |     |     |     |     |     |
| -------- | --- | --- | --- | --- | --- | --- |
If the machine status is changed via PDM dialog and if the workplaces/machines are simultaneously
managed  by  terminals  (machines  with  MDE),  the  machine  status  change  is  not  automatically
displayed on the terminal that manages the machine.
| 6.2.15  Automatic status update (DLG=M_AST)  |     |     |     |     |     |     |
| -------------------------------------------- | --- | --- | --- | --- | --- | --- |
Purpose: Continuation of the machine status and posting of automatically recorded quantities and
cycles.
| Identifier  | Type / max.  |     | Description   |     |     |     |
| ----------- | ------------ | --- | ------------- | --- | --- | --- |
field length
| MNR=      | C8  | Workplace/machine number       |     |     |     |     |
| --------- | --- | ------------------------------ | --- | --- | --- | --- |
| AGR:HUB=  | N8  | Automatically recorded cycles  |     |     |     |     |
TRGEN=  C1  =  {J/N}  With TRGEN=J, the system triggers operation-related upload(s)
  of part quantities for the automatic quantities recorded up to now,
which result in order-related log records of record type "T".
If several operations are active at the machine, one upload of a
part quantity is triggered per operation.
|     |     | If  scrap  counters  | with  different  | reasons  are  | recorded  | for  the  |
| --- | --- | -------------------- | ---------------- | ------------- | --------- | --------- |
machine, several uploads of part quantities are triggered per
operation.
IZY=  N8  Current actual cycle of the machine in seconds per 1000 cycles
AGR.C:[1..n]=  N8  Automatically recorded counter quantity of counter 1...n
| AGE.C:[1..n]=  | C4  | Unit of counter (e.g. PCS)  |     |     |     |     |
| -------------- | --- | --------------------------- | --- | --- | --- | --- |
for future use
| AGG.C:[1..n]=  | N4   | Reason for counter (e.g. scrap reason)  |     |     |     |     |
| -------------- | ---- | --------------------------------------- | --- | --- | --- | --- |
| AGB.C:[1..n]=  | C10  | Evaluation of counter:                  |     |     |     |     |
|                |      | - GUT = yield                           |     |     |     |     |
|                |      | - AUS = scrap                           |     |     |     |     |
- NCH = rework

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 108 of 356  |     |
| ---------------- | --- | ------------------- | --- | --- | ---------------- | --- |

  Production Data Manager

| Identifier  | Type / max.  |     | Description   |     |
| ----------- | ------------ | --- | ------------- | --- |
field length
- PRB = open quantity (problem quantity)
Example:
DLG=M_AST|USR=2106|DAT=02/17/2000|ZEI=47972|MNR=871555|AGR:HUB=11|AGR.C:1=4
7|AGB.C:1=GUT| AGR.C:2=1|AGB.C:2=AUS|AGG.C:2=12|
Note:
All input dialogs (e.g. A_UN, P_AB), which include manually recorded values (EGR:GUT, EGR:AUS),
support the automatically recorded values AGR.C:[1..n], AGE.C:[1..n], AGG.C:[1..n], AGB.C:[1..n],
AGR:HUB.
Important note on counters:
Automatic counters are not yet used for calculation.
A calculation using the partitioning and the pulse factor and other quantity accounts (e.g. when the
total quantity is recorded) is only performed in the server.
Example:
AGR.C:1=47|AGB.C:1=GUT|AGR.C:2=1|AGB.C:2=AUS|AGG.C:2=12|....|AGR:HUB=..|
| 6.2.16  Change of the target quantity (DLG=A_SMG)  |              |     |               |     |
| -------------------------------------------------- | ------------ | --- | ------------- | --- |
| Identifier                                         | Type / max.  |     | Description   |     |
field length
| ANR=      | C    | MES order number (fully defined key)  |     |     |
| --------- | ---- | ------------------------------------- | --- | --- |
| MNR=      | C8   | Workplace/machine number              |     |     |
| PNR=      | C10  | or  Personnel number                  |     |     |
| KNR=      | C10  | Staff badge number                    |     |     |
| SGR:GUT=  | N8   | New target quantity                   |     |     |
| SGE:GUT=  | C4   | Unit of the target quantity           |     |     |
Example 1: Person changes target quantity
DLG=A_SMG|USR=2106|DAT=02/17/2000|ZEI=47972|MNR=100|ANR=12Y19D0001|SGR:GU
T=123|SGE:GUT=ST|
| 6.2.17  Change of target cycle (DLG=M_SZY)  |              |     |               |     |
| ------------------------------------------- | ------------ | --- | ------------- | --- |
| Identifier                                  | Type / max.  |     | Description   |     |
field length
| MNR=  | C8  | Workplace/machine number              |     |     |
| ----- | --- | ------------------------------------- | --- | --- |
| ANR=  | C   | MES order number (fully defined key)  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 109 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| Identifier  | Type / max.  |     |     | Description   |     |
| ----------- | ------------ | --- | --- | ------------- | --- |
field length
| SZY=  | N8   | Target cycle in seconds per 1000 cycles  |     |     |     |
| ----- | ---- | ---------------------------------------- | --- | --- | --- |
| PNR=  | C10  | or  Personnel number                     |     |     |     |
| KNR=  | C10  | Staff badge number                       |     |     |     |
Example: Person changes target quantity
DLG=M_SZY|USR=2106|DAT=02/17/2000|ZEI=58371|MNR=100|SZY=3600|
The new target cycle is set for all OPs currently logged on to the machine.
| 6.2.18  Change of partitioning (DLG=M_TLG)  |              |     |     |               |     |
| ------------------------------------------- | ------------ | --- | --- | ------------- | --- |
| Identifier                                  | Type / max.  |     |     | Description   |     |
field length
| MNR=  | C8   | Workplace/machine number              |     |     |     |
| ----- | ---- | ------------------------------------- | --- | --- | --- |
| ANR=  | C    | MES order number (fully defined key)  |     |     |     |
| TLG=  | N8   | Partitioning                          |     |     |     |
| PNR=  | C10  | or  Personnel number                  |     |     |     |
| KNR=  | C10  |   Staff badge number                  |     |     |     |
Example: Person changes partitioning
DLG=M_TLG|USR=2106|DAT=02/17/2000|ZEI=34392|MNR=100|TLG=2|
The new partitioning is set for all OPs currently logged on to the machine.
| 6.2.19  Logging of the production lock (DLG= M_PSPERRE)  |              |     |     |               |     |
| -------------------------------------------------------- | ------------ | --- | --- | ------------- | --- |
| Identifier                                               | Type / max.  |     |     | Description   |     |
field length
| PNR=  | C10  | or  | Personnel number  |     |     |
| ----- | ---- | --- | ----------------- | --- | --- |
optional
| KNR=     | C10  |                                            | Staff badge number  |     |     |
| -------- | ---- | ------------------------------------------ | ------------------- | --- | --- |
| ACTIVE=  | C1   | Setting or resetting the production lock:  |                     |     |     |
J … set
N … reset
Example: Person activates the production lock
DLG=M_PSPERRE|USR=2106|DAT=02/17/2000|ZEI=34392|ACTIVE=J|
Note:
If a person (KNR or PNR) is entered, the system checks if the person is authorized to change the
production lock. The configuration is made on the MOC in the application HR master data.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 110 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

  Production Data Manager

| 6.2.20  BDE comment (DLG=HY_BEM)  |              |     |     |               |     |
| --------------------------------- | ------------ | --- | --- | ------------- | --- |
| Identifier                        | Type / max.  |     |     | Description   |     |
field length
| ANR  | C    | MES order number (fully defined key)            |     |     |     |
| ---- | ---- | ----------------------------------------------- | --- | --- | --- |
| BEM  | C60  | The BDE comment must not exceed 60 characters.  |     |     |     |
MNR  C8  If no workplace is specified, the BDE comment is saved for the
workplace where the operation is planned.
| PNR=  | C10  |     | Personnel number  |     |     |
| ----- | ---- | --- | ----------------- | --- | --- |
or
| KNR=  | C10  |     | Staff badge number  |     |     |
| ----- | ---- | --- | ------------------- | --- | --- |

Example: Person records a BDE comment for the operation.
DLG=HY_BEM|USR=2106|ANR=210047310200|BEM=problems with material
supply|KNR=1111|DAT=02/17/2000|ZEI=34392|
Notes:
  The input and display length on the AIP is limited to 60 characters.
  BDE comments can trigger an escalation. If you have configured in the escalation management
that the comment text is displayed as subject of the message, then only the first 50 characters are
displayed.

6.3  Postings made with shift change
Shift change records must be made in the correct order along with the other postings. All postings for
the respective shift must be transferred before the shift end record/shift change record.
| 6.3.1  Shift end (A_AUN)  |              |     |     |               |     |
| ------------------------- | ------------ | --- | --- | ------------- | --- |
| Identifier                | Type / max.  |     |     | Description   |     |
field length
| MNR=  | C8          | Workplace/machine number                  |     |     |     |
| ----- | ----------- | ----------------------------------------- | --- | --- | --- |
| DAT=  | mm/dd/yyyy  | Date of shift end in format "mm/dd/yyyy"  |     |     |     |
ZEI=  Seconds  Point in time of the shift end in seconds after midnight
(example: 10:00:03 is ZEI=36003)

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 111 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

  Production Data Manager

| AGR:HUB=  | N8  | Automatically recorded cycles  |     |     |
| --------- | --- | ------------------------------ | --- | --- |
AGR.C:[1..n]=  N8  Automatically recorded counter quantity of counter 1...n
| AGE.C:[1..n]=  | C4  | Unit of counter (e.g. PCS)  |     |     |
| -------------- | --- | --------------------------- | --- | --- |
for future use
| AGG.C:[1..n]=  | N4   | Reason for counter (e.g. scrap reason)  |     |     |
| -------------- | ---- | --------------------------------------- | --- | --- |
| AGB.C:[1..n]=  | C10  | Evaluation of counter:                  |     |     |
|                |      | - GUT = yield                           |     |     |
|                |      | - AUS = scrap                           |     |     |
- NCH = rework
- PRB = open quantity (problem quantity)
Example: Shift end on 28-APR-2002 at 6:00
  DLG=A_AUN|DAT=04/28/2002|ZEI=21600|MNR=4560
| 6.3.2  Beginning of shift (A_AAN)  |              |     |               |     |
| ---------------------------------- | ------------ | --- | ------------- | --- |
| Identifier                         | Type / max.  |     | Description   |     |
field length
| MNR=  | C8          | Workplace/machine number                  |     |     |
| ----- | ----------- | ----------------------------------------- | --- | --- |
| DAT=  | mm/dd/yyyy  | Date of shift end in format "mm/dd/yyyy"  |     |     |
ZEI=  Seconds  Point in time of the shift end in seconds after midnight
(example: 10:00:03 is ZEI=36003)
Example: Beginning of shift on 28-APR-2002 at 6:00
  DLG=A_AAN|DAT=04/28/2002|ZEI=21600|MNR=4560
| 6.3.3  Shift change (A_ASW)  |     |     |     |     |
| ---------------------------- | --- | --- | --- | --- |
The shift change triggers a shift end and a beginning of shift.
| Identifier  | Type / max.  |     | Description   |     |
| ----------- | ------------ | --- | ------------- | --- |
field length
| MNR=  | C8          | Workplace/machine number                  |     |     |
| ----- | ----------- | ----------------------------------------- | --- | --- |
| DAT=  | mm/dd/yyyy  | Date of shift end in format "mm/dd/yyyy"  |     |     |
ZEI=  Seconds  Point in time of the shift end in seconds after midnight
(example: 10:00:03 is ZEI=36003)
| AGR:HUB=  | N8  | Automatically recorded cycles  |     |     |
| --------- | --- | ------------------------------ | --- | --- |
AGR.C:[1..n]=  N8  Automatically recorded counter quantity of counter 1...n

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 112 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| AGE.C:[1..n]=  | C4  | Unit of counter (e.g. PCS)  |     |     |     |
| -------------- | --- | --------------------------- | --- | --- | --- |
for future use
| AGG.C:[1..n]=  | N4   | Reason for counter (e.g. scrap reason)  |     |     |     |
| -------------- | ---- | --------------------------------------- | --- | --- | --- |
| AGB.C:[1..n]=  | C10  | Evaluation of counter:                  |     |     |     |
|                |      | - GUT = yield                           |     |     |     |
|                |      | - AUS = scrap                           |     |     |     |
- NCH = rework
- PRB = open quantity (problem quantity)
| Example: Shift change on 28-APR-2002 at 6:00  |     |     |     |     |     |
| --------------------------------------------- | --- | --- | --- | --- | --- |
  DLG=A_ASW|DAT=04/28/2002|ZEI=21600|MNR=4560
6.4  Reading BDE/MDE data
| 6.4.1  Machine info  |     |     |     |     |     |
| -------------------- | --- | --- | --- | --- | --- |
The  list  of  machine  info  is  provided  by  the  command  DLG=LIST;10  and  filed  in  the  directory
HYDRADIR\spool\.
The definition of the file name and the respective path is case-sensitive.

Structure of dialog data:
"DLG=LIST;10|DATEI={file name}|DAT=...|ZEI=...|USR=...|...“
The list includes the current quantity of the shift. If the unit changes when the order changes, the shift-
related counters are reset to 0. The list includes the following data:
| Identifier  |     | Field designation  |                                | Description   |     |
| ----------- | --- | ------------------ | ------------------------------ | ------------- | --- |
| MNR         |     | Machines           | Machine no.                    |               |     |
| MGRP        |     | Group              | Machine group                  |               |     |
| MBEZK       |     | Mach. des.         | Machine name                   |               |     |
| MBEZL       |     | Det. machine des.  | Detailed machine name          |               |     |
| KST         |     | Cost center        | Cost center of the machine     |               |     |
| MST         |     | Status             | No. of current machine status  |               |     |
or
20000 =  no shift
30000 = status not assigned
| MSTTXT  |     | Status text  | Text of the current machine status  |     |     |
| ------- | --- | ------------ | ----------------------------------- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 113 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| Identifier  | Field designation  |                                           | Description   |     |
| ----------- | ------------------ | ----------------------------------------- | ------------- | --- |
| PKENN       | Pchar              | Production control characteristic of the  |               |     |
current status
P:  "Production"
|     |     |   (defined once per machine)  |     |     |
| --- | --- | ----------------------------- | --- | --- |
S:  Malfunctions
|     |     |   (defined x times per machine)  |     |     |
| --- | --- | -------------------------------- | --- | --- |
A:   "General malfunction"
   (defined once per machine)
N:  No shift or
  Status "Not assigned"

| MSDATB   | Date      | Start date of machine status              |     |     |
| -------- | --------- | ----------------------------------------- | --- | --- |
| MSZEIB   | Time      | Start time of machine status              |     |     |
| MSDAUER  | Duration  | Time that the machine status lasts up to  |     |     |
now
| BMKNR         | RPA no.       | Current RPA text number          |     |     |
| ------------- | ------------- | -------------------------------- | --- | --- |
| BMKTXT        | RPA           | Current RPA abbreviation         |     |     |
| BMKTXTL       | RPA text      | Current RPA text                 |     |     |
| AGR:BMK01 to  | RPA1 to       | Time posted to RPA01 to          |     |     |
| AGR:BMK12     | RPA 12        | Time posted to RPA12             |     |     |
| SKNR          | S             | current shift number             |     |     |
| SKDATB        | Date beg.     | Date of beginning of shift       |     |     |
| SKZEIB        | Time beg.     | Time of beginning of shift       |     |     |
| SKDATE        | Date end      | Date of end of shift             |     |     |
| SKZEIE        | Time end      | Time of end of shift             |     |     |
| AGR:GUT       | Yield         | Yield quantity of current shift  |     |     |
| AGR:AUS       | Scrap         | Scrap quantity of current shift  |     |     |
| AGR:HUB       | Strokes       | Cycles of current shift          |     |     |
| TLG           | Partitioning  | Current partitioning             |     |     |
| SZY           | Target cycle  | Current target cycle             |     |     |
KFGKZ:1   Cfg_ch1 to  Configuration  indicator  where  machine
| to KFGKZ:5  | Cfg_ch5  | configuration data is filed  |     |     |
| ----------- | -------- | ---------------------------- | --- | --- |
| ZLO         | Target   | Default for:                 |     |     |
- Prepare order
- Start order
| ABFALL  | Waste  | Customer-specific  |     |     |
| ------- | ------ | ------------------ | --- | --- |

| MEHRFKZ  | MKz.  | Customer-specific  |     |     |
| -------- | ----- | ------------------ | --- | --- |

| MPUFF      | Input buffer  | Input buffer  |     |     |
| ---------- | ------------- | ------------- | --- | --- |
| MDE_MASCH  | MDE machine   | MDE machine   |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 114 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| Identifier  | Field designation  |                                | Description   |     |     |
| ----------- | ------------------ | ------------------------------ | ------------- | --- | --- |
| MPL_MOD     | Batch mode         | Batch mode                     |               |     |     |
| AUTOMENGE   | AutoQuantity       | Autom. quantity                |               |     |     |
| AGE:GUT     | Unit               | Unit of yield quantity         |               |     |     |
| AGE:AUS     | Unit               | Unit of scrap quantity         |               |     |     |
| IZYSM       | Piece / minute     | Actual cycle piece per minute  |               |     |     |

MNR.PARAM:1  Mach. parameter 1 to  General machine parameters
MNR.PARAM:15  Mach. parameter 15  without parameters 5 and 11
| IMPFAKT    | Mach. parameter 5     | is machine parameter 5   |     |     |     |
| ---------- | --------------------- | ------------------------ | --- | --- | --- |
| STLG       | Machine partitioning  | is machine parameter 11  |     |     |     |
| LINIE      | Line                  | Line of the aggregate    |     |     |     |
| LINIE.REF  | Reference aggregate   | Reference aggregate Y/N  |     |     |     |
| MART       | Machine type          | Machine type             |     |     |     |
E: Single workplace
G: Group workplace
External device
EXTTYP  K: No external device
J: DS100
N: MT3
E: Engel interfacing
A: Arburg interfacing
External device: serial  depending on EXTTYP:
EXTSNR
number
A: Serial number
E: Serial number
External device: Device  depending on EXTTYP
EXTID
address / class
Y/N: ID of master terminal is number of
MT3/DS100
|     |     | A:  Machine  | class  -  | is  ARBURG  | control  |
| --- | --- | ------------ | --------- | ----------- | -------- |
system
Date
ADEMSDATB
Time
ADEMSZEIB
Multiple ch.
MULTIAG
Target
MATPUF:OUT

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 115 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

  Production Data Manager

| Identifier  | Field designation  |     | Description   |     |
| ----------- | ------------------ | --- | ------------- | --- |
Input buffer
MATPUF:IN
Batch no. autom.
OPT:CNRAUTOGEN
Log on OP CEAN/UMB
OPT:CNRAGAN
Machine type
TYP
Batch management
OPT:CHV
Ticket print  From product version MPL 7.2.5 no longer
OPT:CNRPRN
supported.
From product version MPL 7.2.5 no longer
Digital Input batch
DIGIN:CAWL
change  supported.
Consumption balance  New as of product version MPL 7.2.5
MNR.VISVERBRBLZ
Output target qty.
DIGOUT:SMENGE
reached
| TNR      | Terminal number   |     |     |     |
| -------- | ----------------- | --- | --- | --- |
| IZYABW   | Cycle extension   |     |     |     |
| OPT:AUS  | Scrap processing  |     |     |     |
Scrap automatic
OPT:AUSAUTO
| OPT:AUSMANU   | Scrap manual   |     |     |     |
| ------------- | -------------- | --- | --- | --- |
| OPT:AUSPROT   |                |     |     |     |
| OPT:AUSRS232  |                |     |     |     |
| DIGIN:GUT     |                |     |     |     |
| DIGIN:AUS     | Scrap counter  |     |     |     |

DIGOUT:MSPERRE
| ANZSTAKT      |                    |     |     |     |
| ------------- | ------------------ | --- | --- | --- |
| OPT:GUTMANU   | Yield manual       |     |     |     |
| PARAM:12      | Customer-specific  |     |     |     |
| OPT:GUTRS232  |                    |     |     |     |
| DIGIO         | Free input/output  |     |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 116 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| Identifier  | Field designation      |     | Description   |     |
| ----------- | ---------------------- | --- | ------------- | --- |
| CAT         |                        |     |               |     |
| OPT:PDV     | Activation of process  |     |               |     |
data processing
BDE year model
BDEJMOD
| UEBART       |                    |     |     |     |
| ------------ | ------------------ | --- | --- | --- |
| DLGSTRG      | Dialog control     |     |     |     |
| ICON         | Symbol             |     |     |     |
| OPT:GUTAUTO  |                    |     |     |     |
| UEBDAUER     |                    |     |     |     |
| ANZPALMNR    | No. of processing  |     |     |     |
stations/palett machines
| MNR.LISTSUFFIX   | Dialog control      |     |     |     |
| ---------------- | ------------------- | --- | --- | --- |
| RESVERWEIS       | Resource ID         |     |     |     |
| RESWART.BEZ      | Designation         |     |     |     |
| RESWART.ART      | Maintenance type    |     |     |     |
| RESWART.WARTSTA  | Status              |     |     |     |

| RESWART.WARTKL   | Class                   |                         |     |     |
| ---------------- | ----------------------- | ----------------------- | --- | --- |
| RESWART.AKTWERT  | Current value           |                         |     |     |
| RESWART.NAEWERT  | Value next maintenance  |                         |     |     |
| TNRMSPERRE       | TNRMSPERRE              | Internal use for CTAIP  |     |     |
| TNRPSPERRE       | TNRPSPERRE              | Internal use for CTAIP  |     |     |
Example:
DLG=LIST;10|DAT=02/22/2005|ZEI=40000|USR=2101|DATEI= ./spool/masch_list.dat|
6.4.1.1  Dynamic extension of machine list
You can dynamically extend the machine list described and add further acronyms, if required. You can
then add further fields to the standard list.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 117 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

Production Data Manager
Structure of dialog data:
"DLG=LIST;10|DATEI={file
name}|MOD={mode}|AKRO=OPT:VLISTMOD;ANZPALMNR;DLGSTRG;.....|....“
In the dialog data, the list of additional fields is started with the identifier AKRO=. The listed acronyms
are then separated by semicolon.
MPDV Mikrolab provides a list a acronyms that can be used.
6.4.1.2 Extended machine list
Structure of dialog data:
"DLG=LIST;10|DATEI={file name}|MOD={mode}|....“
Identifier Field designation Description
AGR:GUTP Machine-specific yield Primary quantity
AGR:GUT
AGR:GUTS Secondary quantity
AGR:GUTT Tertiary quantity
AGR:GUTB Basic quantity
AGR:AUSP Machine-specific scrap Primary quantity
AGR:AUS
AGR:AUSS Secondary quantity
AGR:AUST Tertiary quantity
AGR:AUSB Basic quantity
AGR:NCHP Machine-specific rework Primary quantity
quantity
AGR:NCHS Secondary quantity
AGR:NCHT Tertiary quantity
AGR:NCHB Basic quantity
AGR:PRBP Machine-specific open Primary quantity
quantity
AGR:PRBS Secondary quantity
(problem quantity)
AGR:PRBT Tertiary quantity
SCS-PDM_81.docx Version: 1.0.23049 Page 118 of 356

  Production Data Manager

| Identifier  | Field designation  |     |                  | Description   |     |
| ----------- | ------------------ | --- | ---------------- | ------------- | --- |
| AGR:PRBB    |                    |     | Basic quantity   |               |     |
| CTR:1       | Counter 1...6      |     |                  |               |     |
CTR:2
CTR:3
CTR:4
CTR:5
CTR:6
| DIV         | Pulse factor  |     |     |     |     |
| ----------- | ------------- | --- | --- | --- | --- |
| OPT:MDETLG  | Option        |     |     |     |     |
"order-specific
partitioning"
| EGE:GUTP    | Primary quantity unit    |              |     |     |     |
| ----------- | ------------------------ | ------------ | --- | --- | --- |
| EGE:GUTS    | Secondary quantity unit  |              |     |     |     |
| EGE:GUTT    | Tertiary quantity unit   |              |     |     |     |
| EGE:GUTB    | Base quantity unit       |              |     |     |     |
| UMRFAKTP:Z  | Conversion               | of  primary  |     |     |     |
quantity
|             |             |              | See note  |     |     |
| ----------- | ----------- | ------------ | --------- | --- | --- |
| UMRFAKTP:N  | Conversion  | of  primary  |           |     |     |
Conversion factors for base quantity
quantity
| UMRFAKTS:Z  | Conversion  |     | of  |     |     |
| ----------- | ----------- | --- | --- | --- | --- |
secondary quantity
| UMRFAKTS:N  | Conversion  |     | of  |     |     |
| ----------- | ----------- | --- | --- | --- | --- |
secondary quantity
| UMRFAKTT:Z  | Conversion  | of  tertiary  |     |     |     |
| ----------- | ----------- | ------------- | --- | --- | --- |
quantity
| UMRFAKTT:N  | Conversion  | of  tertiary  |     |     |     |
| ----------- | ----------- | ------------- | --- | --- | --- |
quantity

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 119 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

  Production Data Manager

| Identifier  | Field designation  |                  | Description   |     |
| ----------- | ------------------ | ---------------- | ------------- | --- |
| VERB:GUT    | Offset  of         | manual  yield    |               |     |
quantity against
See note
- AUS
Offset of manual quantities
- NCH
- PRB
- empty = no offset
| VERB:AUS  | Offset of manual scrap  |     |     |     |
| --------- | ----------------------- | --- | --- | --- |
against
- GUT
- NCH
- PRB
- empty = no offset
| VERB:NCH  | Offset of manual rework  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
quantity against
- GUT
- AUS
- PRB
- empty = no offset
| VERB:PRB  | Offset  of  | manual  |     |     |
| --------- | ----------- | ------- | --- | --- |
problem quantity = open
quantity against
- GUT
- AUS
- NCH
- empty = no offset
| OPT:GUTMANUTAKT  | Calculation             | of  the       |     |     |
| ---------------- | ----------------------- | ------------- | --- | --- |
|                  | relevant                | manual        |     |     |
|                  | quantity  additionally  | as            |     |     |
|                  | cycles  (i.e.           | additionally  |     |     |
as AGR:HUB)

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 120 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

| Identifier       | Field designation       |               | Description   |     |
| ---------------- | ----------------------- | ------------- | ------------- | --- |
| OPT:AUSMANUTAKT  | Calculation             | of  the       |               |     |
|                  | relevant                | manual        |               |     |
|                  | quantity  additionally  | as            |               |     |
|                  | cycles  (i.e.           | additionally  |               |     |
as AGR:HUB)
| OPT:NCHMANUTAKT  | Calculation             | of  the       |     |     |
| ---------------- | ----------------------- | ------------- | --- | --- |
|                  | relevant                | manual        |     |     |
|                  | quantity  additionally  | as            |     |     |
|                  | cycles  (i.e.           | additionally  |     |     |
as AGR:HUB)
| OPT:PRBMANUTAKT  | Calculation             | of  the       |     |     |
| ---------------- | ----------------------- | ------------- | --- | --- |
|                  | relevant                | manual        |     |     |
|                  | quantity  additionally  | as            |     |     |
|                  | cycles  (i.e.           | additionally  |     |     |
as AGR:HUB)
VISLIST3  Display 3rd list   The  third  list  on  the  terminals  is
dynamically controlled using this indicator.
| VISFHMTNRAAN  | Show  material/PRT  | list    |     |     |
| ------------- | ------------------- | ------- | --- | --- |
when OP is logged on

Conversion factors for base quantity
You use the conversion factors to convert the primary, secondary and tertiary quantities against the
base quantity. You use these conversion factors, for example, when updating target quantities.
You use a numerator and denominator for the conversion factors. This way, you can also use a
decimal value (meaning a figure with decimal places) as conversion factor.
Example:
| - Base quantity unit: square meter M2   |     |     |     |     |
| --------------------------------------- | --- | --- | --- | --- |
| - Primary quantity unit: piece ST       |     |     |     |     |
| - 1 piece = 2 square meters.            |     |     |     |     |
| In this case to be stored as            |     |     |     |     |
| - numerator (= UMRFAKTP:Z ) 2 and       |     |     |     |     |
- denominator (= UMRFAKTP:N) 1.
Note:  Offset of manual quantities

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 121 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

When a quantity is offset against another quantity account, the quantity recorded is subtracted from
the other quantity account.
Example:
Total quantity and scrap is recorded  configuration VERB:AUS=GUT
6.4.2  Reading the shift calendar
The shift calendar of all machines of a terminal is provided via the command DLG=LIST;38. The
calender is filed in the directory HYDRADIR\spool\. The shift calendar contains the data starting from
the day before for 5 days.
Structure of dialog data:
"DLG=LIST;38|DATEI={file name}|TNR={terminal number}|DAT=…|ZEI=...|USR=...|..“
The definition of the file name and the respective path is case-sensitive.

The list includes the following data:
| Identifier  | Field designation  |     |         | Description   |                  |           |
| ----------- | ------------------ | --- | ------- | ------------- | ---------------- | --------- |
| MNR         | Machine            |     | alter-  | If  the       | mode  MOD={..}   | is  not   |
|             |                    |     | native  | specified,    | the  column      | MNR  is   |
|             |                    |     |         | output        | with  the        | machine   |
|             |                    |     |         | number        | that  is  valid  | for  the  |
model.
| BDEJMOD  | Year model  |     |     | With mode T or H MOD={..} the  |                     |             |
| -------- | ----------- | --- | --- | ------------------------------ | ------------------- | ----------- |
|          |             |     |     | column                         | BDEJMOD             | is  output  |
|          |             |     |     | with                           | the  year  model.   | The         |
|          |             |     |     | machine                        | is  not  specified  | with        |
this mode.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     |     | Page 122 of 356  |
| ---------------- | --- | ------------------- | --- | --- | --- | ---------------- |

  Production Data Manager

| Identifier  |     | Field designation       |                             | Description   |     |
| ----------- | --- | ----------------------- | --------------------------- | ------------- | --- |
| SKDAT       |     | Shift date              | Date of beginning of shift  |               |     |
| SKNR        |     | Shift number            | Shift number                |               |     |
| SKZEIB      |     | Beginning of shift      | Time in seconds             |               |     |
| SKZEIE      |     | End of shift            | Time in seconds             |               |     |
| SKPAUB:1    |     | Start of shift break 1  | Time in seconds             |               |     |
| SKPAUE:1    |     | End of shift break 1    | Time in seconds             |               |     |
| …           |     |                         |                             |               |     |
| SKPAUB:6    |     | Start of shift break 6  | Time in seconds             |               |     |
| SKPAUE:6    |     | End of shift break 6    | Time in seconds             |               |     |
SKAMST  Automatic  machine  Internal use in the Hydra terminal
status
MST999SKB  Automatic  machine  Activate/deactivate weekend status 999
status
| SKART      |             | Shift ID    | Shift ID                    |     |     |
| ---------- | ----------- | ----------- | --------------------------- | --- | --- |
| BEGINNDAT  |             | Start date  | Date of beginning of shift  |     |     |
| 6.4.3      | Order list  |             |                             |     |     |
The  list  of  order  info  is  provided  by  the  command  DLG=LIST;11  and  filed  in  the  directory
HYDRADIR\spool\.
Structure of dialog data:
„DLG=LIST;11|DATEI={file name}|DAT=...|ZEI=...|USR=...|MOD=...“
The definition of the file name and the respective path is case-sensitive.

a) Reading the sequencing lists of the terminal:
| Parameter:                                                             | MOD=T (terminal from user)  |     |     |     |     |
| ---------------------------------------------------------------------- | --------------------------- | --- | --- | --- | --- |
| The list includes the data of all machines assigned to this terminal.  |                             |     |     |     |     |
The list contains planned (customer-specific status X), prepared (status V), interrupted (status U) and
| running (status L) production orders.    |     |     |     |     |     |
| ---------------------------------------- | --- | --- | --- | --- | --- |
Overhead  orders  are  only  included  in  the  list  when  they  are  running  (status  L).

For the specific machine, the results of MOD=V and MOD=L are therefore output together.
Note: Because of the different configuration options, the list might only output a limited solution set.
b) Reading the info of an order:

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 123 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

  Production Data Manager

Parameter:   MOD=A|ANR=order+OP
c) Reading the sequencing list of a machine
Parameter:   MOD=V|MNR=machine
The list includes all OPs currently planned for the machine (the configuration of the sequencing list
specifies if the OPs of the machine or the OPs of the machine group are selected).
d) List of running orders on the terminal
Parameter:   MOD=L
The list includes the running orders (status L) of all machines assigned to this terminal.

The list includes the following relevant data:
| Identifier  | Field designation      |     |                                  | Description   |     |
| ----------- | ---------------------- | --- | -------------------------------- | ------------- | --- |
| ROW.IDX     | ROWINDEX               |     |                                  |               |     |
| ANR         | Complete order number  |     | Complete order number contains:  |               |     |
AUNR, AGNR, AFOLG, SPLNR
| AUNR       | Order number            |     | Order number                        |     |     |
| ---------- | ----------------------- | --- | ----------------------------------- | --- | --- |
| AGNR       | OP                      |     | Operation number                    |     |     |
| AFOLG      | Sequence                |     |                                     |     |     |
| SPLNR      | Split number            |     |                                     |     |     |
| AUART      | Order type              |     | Order type                          |     |     |
| MNR        | Planned single machine  |     | Machine number                      |     |     |
| POS        | Display position        |     |                                     |     |     |
| MGRP       | Group                   |     | Machine group                       |     |     |
| MDE_MASCH  | MDE machine             |     | MDE machine                         |     |     |
| ATK        | Article                 |     | Material number (for output batch)  |     |     |
ATKBEZ  Final article des.  Article name (from order header)
| AST  | Status  |     | current order status  |     |     |
| ---- | ------- | --- | --------------------- | --- | --- |
"X", "V", "L", "U"
| ASTTXT  | Status text  |     | current order status - text dependent  |     |     |
| ------- | ------------ | --- | -------------------------------------- | --- | --- |
|         |              |     | of status:                             |     |     |
planned, prepared, running,
interrupted
| EGR:BMK01 to      | Performance       | posted  | to    |     |     |
| ----------------- | ----------------- | ------- | ----- | --- | --- |
| EGR:BMK12         | RPA 01 to RPA 12  |         |       |     |     |
| ANR:MENGEPROZ_UEB | Overdelivery      |         |       |     |     |
LI
| ANR:OPT_UEBLI  | Reaction to overdelivery   |     |     |     |     |
| -------------- | -------------------------- | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 124 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

  Production Data Manager

| Identifier        | Field designation  |     |     | Description   |     |
| ----------------- | ------------------ | --- | --- | ------------- | --- |
| ANR:MENGEPROZ_UNT | Underdelivery      |     |     |               |     |
LI
| ANR:OPT_UNTLI  | Reaction to underdelivery     |                  |     |     |     |
| -------------- | ----------------------------- | ---------------- | --- | --- | --- |
| EGS:GUT        | since login                   |                  |     |     |     |
| SGE:B          | Base quantity unit            |                  |     |     |     |
| SGE:P          | Primary input quantity unit   |                  |     |     |     |
| SGE:S          | Secondary                     | input  quantity  |     |     |     |
unit
| SGE:T     | Tert. Input quantity unit  |                  |     |     |     |
| --------- | -------------------------- | ---------------- | --- | --- | --- |
| SGR:AUSB  | Target scrap               |                  |     |     |     |
| SGR:AUSP  | Target scrap (prim.)       |                  |     |     |     |
| SGR:AUSS  | Target scrap (sec.)        |                  |     |     |     |
| SGR:AUST  | Target scrap (tert.)       |                  |     |     |     |
| SGR:GUTB  | Target                     | quantity  (base  |     |     |     |
quantity unit)
| SGR:GUTP  | Target quantity (prim.)     |     |     |     |     |
| --------- | --------------------------- | --- | --- | --- | --- |
| SGR:GUTS  | Target quantity (sec.)      |     |     |     |     |
| SGR:GUTT  | Target quantity (ter.)      |     |     |     |     |
| EGR:GUTB  | Yield (base quantity unit)  |     |     |     |     |
| EGR:GUTP  | Yield (prim.)               |     |     |     |     |
| EGR:GUTS  | Yield (sec.)                |     |     |     |     |
| EGR:GUTT  | Yield (tert.)               |     |     |     |     |
| EGR:AUSB  | Scrap (base quantity unit)  |     |     |     |     |
| EGR:AUSP  | Scrap quantity (prim.)      |     |     |     |     |
| EGR:AUSS  | Scrap quantity (sec.)       |     |     |     |     |
| EGR:AUST  | Scrap quantity (ter.)       |     |     |     |     |
| EGR:NCHB  | Rework quantity             |     |     |     |     |
| EGR:NCHP  | Rework quantity (prim.)     |     |     |     |     |
| EGR:NCHS  | Rework quantity (sec.)      |     |     |     |     |
| EGR:NCHT  | Rework quantity (ter.)      |     |     |     |     |
| EGR:PRBB  | Problem quantity            |     |     |     |     |
| EGR:PRBP  | Problem quantity (prim.)    |     |     |     |     |
| EGR:PRBS  | Problem quantity (sec.)     |     |     |     |     |
| EGR:PRBT  | Problem quantity (ter.)     |     |     |     |     |
| AGE:B     | Quantity unit               |     |     |     |     |
| AGE:P     | Quantity unit (prim.)       |     |     |     |     |
| AGE:S     | Quantity unit (sec.)        |     |     |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 125 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

  Production Data Manager

| Identifier  | Field designation        |     |                                        | Description   |     |
| ----------- | ------------------------ | --- | -------------------------------------- | ------------- | --- |
| AGE:T       | Quantity unit (ter.)     |     |                                        |               |     |
| TLG         | Partitioning             |     | Partitioning                           |               |     |
| SZY         | Target cycle             |     | Cycle time in seconds per 1000 cycles  |               |     |
| AGBEZ       | Name/designation of the  |     | Operation designation/name.            |               |     |
OP
| ASTV    | VStatus              |             | Status of the previous OP  |     |     |
| ------- | -------------------- | ----------- | -------------------------- | --- | --- |
| AGMFKZ  | Parallel production  |             |                            |     |     |
| CHPFL   | Batch                | management  |                            |     |     |
required
| APRIO          | External priority        |                 |                         |     |     |
| -------------- | ------------------------ | --------------- | ----------------------- | --- | --- |
| FIX            | fix                      |                 | Operation fixed Yes/No  |     |     |
| DSBEZ          | Data ID for ALS          |                 |                         |     |     |
| OPT:SNR        | Serial numbers required  |                 |                         |     |     |
| ANR_BEARBZ     | Processing time          |                 |                         |     |     |
| ANR_ANDATB     | Date of logon            |                 |                         |     |     |
| ANR_ANZEIB     | Time of logon            |                 |                         |     |     |
| AST_OPT_PKENN  | Control                  | characteristic  |                         |     |     |
"production"
| AKTIV             | active                    |     |     |     |     |
| ----------------- | ------------------------- | --- | --- | --- | --- |
| VERARBCODE_PLAUS_ | 100% quantity inspection  |     |     |     |     |
MENGE
| EGR:DAUER   | Duration            |     |                                  |     |     |
| ----------- | ------------------- | --- | -------------------------------- | --- | --- |
| EGR:PDAUER  | Workforce planning  |     |                                  |     |     |
| EGI:GUT     | Yield               |     |                                  |     |     |
| EGI:AUS     | Scrap               |     |                                  |     |     |
| BEM1        | Comment 1           |     | From user field 53 of operation  |     |     |
(ANR.FU:53)
| BEM2  | Comment 2  |     | From user field 54 of operation  |     |     |
| ----- | ---------- | --- | -------------------------------- | --- | --- |
(ANR.FU:54)
| PANZ   | Number of staff     |                |     |     |     |
| ------ | ------------------- | -------------- | --- | --- | --- |
| MST    | Machine status      |                |     |     |     |
| HZTYP  | Semi-finished type  |                |     |     |     |
| HZBEZ  | Name  of            | semi-finished  |     |     |     |
type
TECHINFO  Technical information  From user field 56 of operation
(ANR.FU:56)
| TPE  | TPUnit [OP]   |     |     |     |     |
| ---- | ------------- | --- | --- | --- | --- |
| CNR  | Batch number  |     |     |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 126 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

  Production Data Manager

| Identifier  | Field designation      |        |     | Description   |     |
| ----------- | ---------------------- | ------ | --- | ------------- | --- |
| DLL         | Customer batch number  |        |     |               |     |
| DLLKZ       | Customer               | batch  |     |               |     |
identification
| LOSGR        | Batch size             |     |     |     |     |
| ------------ | ---------------------- | --- | --- | --- | --- |
| HZTYP:EINH   | Unit                   |     |     |     |     |
| PLAUS:MATOK  | Plaus. MatOK           |     |     |     |     |
| MANR         | CBM: Mother operation  |     |     |     |     |
| RF:AGTYP     | CBM: Operation type    |     |     |     |     |

Example: List of all running orders
DLG=LIST;11|DAT=10/11/2000|ZEI=40000|USR=2101|MOD=L|DATEI= ./spool/auft_list.101|
6.4.3.1  Dynamic extension of the order list
As of HYDRA MW 2.0, you can dynamically complement the order list and add further acronyms, if
required. You can then add further fields to the standard list.
Structure of dialog data:
"DLG=LIST;11|DATEI={file
name}|MOD={mode}|AKRO=MNR_MSTDSATZ;AUART_PLAUS_MNR;AUART_VISCODE;MN
R_EXTSNR;  ...;.....|....“
Same procedure as for the machine list.
MPDV Mikrolab provides a list a acronyms that can be used.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 127 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

Production Data Manager
6.4.3.2 Controlling the sequencing list
The sequencing list on the BDE terminal is flexible and can be adjusted to meet the customer's requirements.
The settings described below control how data is provided in the sequencing list.
Dialog Option Description Possible settings
Machine configuration Sequencing Via the configuration of the sequencing list, you can S Basic setting
list define the order pool used to generate the sequencing
The value of the option with the same name in the
list.
HYDRA basic settings is used.
The planning in the HYDRA shop floor scheduling or in
M Pool of workplaces
the PPS system specifies the pool of orders. The pool
of orders is different if the OP is planned directly for a The terminal sequencing list only shows the
machine or for a machine group. operations planned for the workplace.
G Pool of workplaces and groups
The terminal sequencing list shows operations
that are:
- planned for the current workplace or
- for another workplace of the group or
- that are still located in the pool of groups.
K Pool of workplaces and categories
The sequencing list on the terminal only shows the
operations that are planned for workplaces of the
selected machine category.
H Group control
The terminal sequencing list shows the operations
that are
- planned for the current workplace or
- for another workplace of the group.
SCS-PDM_81.docx Version: 1.0.23049 Page 128 of 356

  Production Data Manager

Machine configuration  Number of  You  can  configure  the  maximum  number  of  OPs  0 = no restriction (display of all existing OPs)
|     | OPs  included in the sequencing list. The OPs are selected in  |     |     |     |     |     |     |     |
| --- | -------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
1-999  = maximum number of OPs
ascending order based on how the sequencing list is
sorted.
By default, HYDRA sorts by the following columns:
|     |     | 1.  | sort_dat              |     |     |     |     |     |
| --- | --- | --- | --------------------- | --- | --- | --- | --- | --- |
|     |     | 2.  | sort_zeit             |     |     |     |     |     |
|     |     | 3.  | auftrag_nr of the OP  |     |     |     |     |     |

Order types  Sequencing  On the level of orders, you use the option Sequencing  J  The OP should be displayed in the sequencing
|     | list  list in the application Order types to configure the list.   |     |     |     |     | list.  |     |     |
| --- | ------------------------------------------------------------------ | --- | --- | --- | --- | ------ | --- | --- |
If you define an "N", all OPs of an order with this order  F  The  OP  should  only  be  displayed  in  the
|     | type are not displayed in the sequencing list.       |     |     |     |     | sequencing list if it is fixed.  |     |     |
| --- | ---------------------------------------------------- | --- | --- | --- | --- | -------------------------------- | --- | --- |
|     | Example: You do not want to show waiting period OPs  |     |     |     |     | wurde.                           |     |     |
in the sequencing list.
|     |     |     |     |     | N   | The  OP  should  | not  be  displayed  | in  the  |
| --- | --- | --- | --- | --- | --- | ---------------- | ------------------- | -------- |
sequencing list.

Processing codes  Sequencing  Also in the configuration of the processing codes, you  J  The OP should be displayed in the sequencing
|     | list  can  | define  if  | an  OP  with  this  | processing  | code  is  | list.  |     |     |
| --- | ---------- | ----------- | ------------------- | ----------- | --------- | ------ | --- | --- |
displayed in the sequencing list or not.
|     |     |     |     |     | N   | The  OP  should  | not  be  displayed  | in  the  |
| --- | --- | --- | --- | --- | --- | ---------------- | ------------------- | -------- |
sequencing list.

Status assignment  Sequencing  Also  on  the  level  of  statuses,  you  can  make  J  The OP should be displayed in the sequencing
|     | list  configurations.  |     |     |     |     | list.  |     |     |
| --- | ---------------------- | --- | --- | --- | --- | ------ | --- | --- |
You  can  define  if  OPs  with  a  specific  status  are  N   The  OP  should  not  be  displayed  in  the
|     | displayed in the sequencing.  |     |     |     |     | sequencing list.  |     |     |
| --- | ----------------------------- | --- | --- | --- | --- | ----------------- | --- | --- |

| SCS-PDM_81.docx  | Version: 1.0.23049  |     |     |     | Page 129 of 356  |     |     |     |
| ---------------- | ------------------- | --- | --- | --- | ---------------- | --- | --- | --- |

Production Data Manager
If an "N" is defined here, an OP in this status is not
displayed in the sequencing list.
This is used as a standard feature to ensure that only
prepared or interrupted OPs appear in the sequencing
list.
You can also configure that running OPs are displayed
in the sequencing list.
The following operations are not displayed in the sequencing list:
 Locked operations
 The different operations included in merged operations generated on the MOC.
 The original operation of split operations
SCS-PDM_81.docx Version: 1.0.23049 Page 130 of 356

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| 6.4.4  | Personnel list  |     |     |     |     |     |
| ------ | --------------- | --- | --- | --- | --- | --- |
The  list  of  personnel  is  provided  by  the  command  DLG=LIST;12  and  filed  in  the  directory
HYDRADIR\spool\.
Structure of dialog data:
„DLG=LIST;12|DATEI={file name}|DAT=...|ZEI=...|USR=...|MOD=...|...“
The definition of the file name and the respective path is case-sensitive.

If MOD ist not set, the list includes all persons logged on to the machines of the terminal.
If MOD=V, the list additionally includes all persons logged on in advance to the machines of the
terminal.The list includes the following data:
|            | Identifier  | Field designation  |     |                                  | Description   |     |
| ---------- | ----------- | ------------------ | --- | -------------------------------- | ------------- | --- |
| MNR        |             | Machine            |     | Machine number                   |               |     |
| ANR        |             | Order              |     | Order number (with all details)  |               |     |
| AGNR       |             | OP                 |     | Only operation number            |               |     |
| AUNR       |             | Order number       |     |                                  |               |     |
| AFOLG      |             | Sequence           |     |                                  |               |     |
| SPLNR      |             | Split number       |     |                                  |               |     |
| PNR        |             | Personnel number   |     | Personnel number                 |               |     |
| PNAME      |             | Name               |     | Name of the person               |               |     |
| PVORNAME   |             | First name         |     | First name of the person         |               |     |
| BPOS       |             | Usr.               |     | Operator position/function       |               |     |
BPBEZL  Operator position/function  Name of the operator's function
| LPKZ  |     | Wages/premium  |     | Wages/premium indicator  |     |     |
| ----- | --- | -------------- | --- | ------------------------ | --- | --- |
characteristics
| KNR  |     | Badge number  |     | Staff badge number  |     |     |
| ---- | --- | ------------- | --- | ------------------- | --- | --- |
VORAN  Logged on in advance  Persons logged on in advance (only
with mode V)
| ASTUFE  |     | BDE authorization  |     |     |     |     |
| ------- | --- | ------------------ | --- | --- | --- | --- |
Example:
DLG=LIST;12|DAT=10/11/2000|ZEI=40000|USR=2101|DATEI= ./spool/pers_list.101|

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 131 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

| 6.4.5  | Operator positions/functions of machines  |     |     |     |     |
| ------ | ----------------------------------------- | --- | --- | --- | --- |
The list of operator positions/functions is provided by the command DLG=LIST;14 and filed in the
directory HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;14|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
The definition of the file name and the respective path is case-sensitive.

The list includes all operator positions of the machines assigned to this terminal.
The list includes the following data:
|         | Identifier  | Field designation  |                 | Description   |     |
| ------- | ----------- | ------------------ | --------------- | ------------- | --- |
| MNR     |             | Machine            | Machine number  |               |     |
| BPSCHL  |             | Operator pos.      | Key             |               |     |
| BPBEZL  |             | Operator           | Description     |               |     |
position/function
| BPTXTK  |     | BPOS text  | Short text                  |     |     |
| ------- | --- | ---------- | --------------------------- | --- | --- |
| BPFKT   |     | BPOS fct.  | Function                    |     |     |
| BPOS    |     | Usr.       | Operator position/function  |     |     |
Example: Operator position/function
DLG=LIST;14|DAT=10/11/2000|ZEI=40000|USR=2101|DATEI= ./spool/bp_list.101|

| 6.4.7  | Machine status list  |     |     |     |     |
| ------ | -------------------- | --- | --- | --- | --- |
The list of machine statuses is provided by the command DLG=LIST;16 and filed in the directory
HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;16|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
The definition of the file name and the respective path is case-sensitive.

a) List of all statuses of the machines assigned to the terminal.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 132 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | --- | ------------------------ |

| Parameter:   | MOD=T|USR=HYDRA-User number|  |     |     |     |     |     |
| ------------ | ----------------------------- | --- | --- | --- | --- | --- |
The list is sorted by machine and list of the machine is sorted by malfunction number.
b) List of all statuses of a machine.
| Parameter:   | MOD=M|MNR=machine number|  |     |     |     |     |     |
| ------------ | -------------------------- | --- | --- | --- | --- | --- |
The list includes the following data:
|         | Identifier  | Field designation  |     |                                  | Description   |     |
| ------- | ----------- | ------------------ | --- | -------------------------------- | ------------- | --- |
| MNR     |             | Machine            |     | Machine number                   |               |     |
| KSTART  |             | Cost center type   |     | Type of cost center              |               |     |
| MST     |             | Status             |     | Number of malfunction ID         |               |     |
| ZUNR    |             | ToNo.              |     | Assignment number of input       |               |     |
|         |             | StNo.              |     | Number of the malfunction text.  |               |     |
MSTTNR
Status text
| MSTTXT  |     |              |     | Malfunction text      |     |     |
| ------- | --- | ------------ | --- | --------------------- | --- | --- |
| BMKTXT  |     | RPA          |     | RPA abbrev.           |     |     |
| STKL    |     | Dist. class  |     | Class of malfunction  |     |     |
| PKENN   |     | Pchar        |     | Production ID         |     |     |
P:  flags "Production";
  (per machine defined once)
S:  flags malfunction
  (per machine defined x times)
|     |     |     |     | A:  flags   | "general malfunction"  |     |
| --- | --- | --- | --- | ----------- | ---------------------- | --- |
  (per machine defined once)
| ZUMAN  |     | Man.  |     | Manual assignment J/N  |     |     |
| ------ | --- | ----- | --- | ---------------------- | --- | --- |
Auto.
| ZUAUTO  |     |     |     | Automatic assignment J/N  |     |     |
| ------- | --- | --- | --- | ------------------------- | --- | --- |
Lock
| MSPERR  |     |                  |     | Machine lock         |     |     |
| ------- | --- | ---------------- | --- | -------------------- | --- | --- |
| PABKZ   |     | Log off persons  |     | Log off persons J/N  |     |     |
| MSTUFE  |     | Auth.lev.        |     | Authorization level  |     |     |
| KST01   |     | Ccr01            |     | Customer-specific    |     |     |
Cost center 01
| KST02  |     | Ccr02  |     | Customer-specific  |     |     |
| ------ | --- | ------ | --- | ------------------ | --- | --- |
Cost center 02
| KST03  |     | Ccr03  |     | Customer-specific  |     |     |
| ------ | --- | ------ | --- | ------------------ | --- | --- |
Cost center 03
| KST04  |     | Ccr04  |     | Customer-specific  |     |     |
| ------ | --- | ------ | --- | ------------------ | --- | --- |
Cost center 04

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 133 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

|     | Identifier  | Field designation  |     | Description   |     |
| --- | ----------- | ------------------ | --- | ------------- | --- |
Ccr05
KST05
kst05[1] J=Prod. lock active
kst05[2-8]  time of flashing symbol of
the
    machine status in
    graphic machinery
| HARC:ID  |     | Hierarchy level  |     |     |     |
| -------- | --- | ---------------- | --- | --- | --- |
Configuration
| HARC:TYP  |     | Type of  hierarchy level  |     |     |     |
| --------- | --- | ------------------------- | --- | --- | --- |
Hierarchical malfunction reasons
| HARC:TXTKENN  |     | ID:  hierarchical  | level  |     |     |
| ------------- | --- | ------------------ | ------ | --- | --- |
text
| HARC:FLDKENN   |     | ID status field  |                 |             |            |
| -------------- | --- | ---------------- | --------------- | ----------- | ---------- |
| AUSNR:AUTO     |     | Scrap reason     | Configuration   |             |            |
|                |     |                  | Status-related  | collection  | of  scrap  |
| AUSNR:PSperre  |     | Scrap  reason    | during          |             |            |
reasons
production lock
| PROGNDAUER  |     | Estimated downtime  | See section  |     |     |
| ----------- | --- | ------------------- | ------------ | --- | --- |
Change of machine status (M_MST)
| COLOR  |     | Color code  | Configuration of the status text color  |     |     |
| ------ | --- | ----------- | --------------------------------------- | --- | --- |
RGB color - format: RRGGBB:

Example
DLG=LIST;16|DAT=10/11/2000|ZEI=40000|USR=2101|MOD=M|DATEI= ./spool/mstat_list.101|
| 6.4.8  | Deviation reasons  |     |     |     |     |
| ------ | ------------------ | --- | --- | --- | --- |
The list of deviation reasons is provided by the command DLG=LIST;23 and filed in the directory
HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;23|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 134 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- |

The definition of the file name and the respective path is case-sensitive.

The list includes all deviation reasons created.
The list includes the following data:
|           | Identifier  | Field designation  |     |            |                             | Description   |     |     |
| --------- | ----------- | ------------------ | --- | ---------- | --------------------------- | ------------- | --- | --- |
| WERK      |             | Plant              |     |            |                             |               |     |     |
| MNR       |             | Machine            |     |            | Machine number              |               |     |     |
| EGG:GUT   |             | Deviation reason   |     |            | Number of deviation reason  |               |     |     |
| ABWGRTXT  |             | Text               | of  | deviation  | Name of deviation reason    |               |     |     |
reason
Example:
DLG=LIST;23|DAT=10/11/2000|ZEI=40000|USR=2101|DATEI= ./spool/abgr_list.101|
| 6.4.9  | Premium indicator  |     |     |     |     |     |     |     |
| ------ | ------------------ | --- | --- | --- | --- | --- | --- | --- |
The list of premium indicators is provided by the command DLG=LIST;24 and filed in the directory
HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;24|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
| Parameter:   | USR=HYDRA user number  |     |     |     |     |     |     |     |
| ------------ | ---------------------- | --- | --- | --- | --- | --- | --- | --- |
The definition of the file name and the respective path is case-sensitive.

The list includes all premium indicators created for all machines of the terminal.
The list includes the following data:
|       | Identifier  |     | Field designation  |     |                 | Description   |     |     |
| ----- | ----------- | --- | ------------------ | --- | --------------- | ------------- | --- | --- |
| MNR   |             |     | Machine number     |     | Machine number  |               |     |     |
| LGRP  |             |     |                    |     | Wage group      |               |     |     |
Wages/premium
characteristics
Designation
| LGRPTXT  |     |     |     |     | Name of the wage group  |     |     |     |
| -------- | --- | --- | --- | --- | ----------------------- | --- | --- | --- |
Example:
DLG=LIST;24|DAT=10/11/2000|ZEI=40000|USR=2101|DATEI= ./spool/lgrp_list.101|

| SCS-PDM_81.docx  |     |     |     | Version: 1.0.23049  |     |     |     | Page 135 of 356  |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| 6.4.10  | Terminal list  |     |     |     |     |     |
| ------- | -------------- | --- | --- | --- | --- | --- |
The  list  of  terminals  is  provided  by  the  command  DLG=LIST;45  and  filed  in  the  directory
HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;45|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
| Parameter:   | none  |     |     |     |     |     |
| ------------ | ----- | --- | --- | --- | --- | --- |
The definition of the file name and the respective path is case-sensitive.

The list includes all terminals created - active and inactive terminals.
The list includes the following data:
|      | Identifier  | Field designation  |     |     | Description   |     |
| ---- | ----------- | ------------------ | --- | --- | ------------- | --- |
| TNR  |             | Terminal number    |     |     |               |     |
| TYP  |             |                    |     |     |               |     |
Terminal type
| CFG:1  |     | Configuration 1  |     |     |     |     |
| ------ | --- | ---------------- | --- | --- | --- | --- |
Hardware address
| HWADR     |     |              |     |     |     |     |
| --------- | --- | ------------ | --- | --- | --- | --- |
| TZ        |     | Time Zone    |     |     |     |     |
| BEZK      |     | Location     |     |     |     |     |
| BEZL      |     | Designation  |     |     |     |     |
| BART:MDE  |     | MDE active   |     |     |     |     |
ADE active
| BART:ADE  |     |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- | --- |
PZE active
| BART:PZE  |     |             |     |     |     |     |
| --------- | --- | ----------- | --- | --- | --- | --- |
| BART:CAQ  |     | CAQ active  |     |     |     |     |
| BART:PDV  |     | PDV active  |     |     |     |     |
| LANG      |     | Language    |     |     |     |     |
Active
| AKTIV        |     |                         |                |     |     |     |
| ------------ | --- | ----------------------- | -------------- | --- | --- | --- |
| NEUSTART     |     | Restart                 |                |     |     |     |
| LEN_KNR      |     | Length of badge number  |                |     |     |     |
| PZEBART      |     | Operation mode PZE      |                |     |     |     |
| PZESTA:VORG  |     | Default status          |                |     |     |     |
|              |     | Company                 | number/system  |     |     |     |
| SYSNR        |     |                         |                |     |     |     |
number
| TTXT:KOM  |     | IN key  |     |     |     |     |
| --------- | --- | ------- | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 136 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|     | Identifier  | Field designation  |     |     | Description   |     |
| --- | ----------- | ------------------ | --- | --- | ------------- | --- |
OUT key
| TTXT:GEH   |     |                   |     |     |     |     |
| ---------- | --- | ----------------- | --- | --- | --- | --- |
| TTXT:PAU   |     | Break key         |     |     |     |     |
| TTXT:INFO  |     | Info key          |     |     |     |     |
| FGR:1      |     | Absence reason 1  |     |     |     |     |
Key Absence reason 1
| TTXT:FGR1  |     |     |     |     |     |     |
| ---------- | --- | --- | --- | --- | --- | --- |
...to
| ...to        |     |                            |     |     |     |     |
| ------------ | --- | -------------------------- | --- | --- | --- | --- |
| FGR:4        |     | Absence reason 4           |     |     |     |     |
| TTXT:FGR4    |     | Key Absence reason 4       |     |     |     |     |
| FGRCFG       |     | Entry absence reason       |     |     |     |     |
| OPT:FGRAUTO  |     | Absence reason collection  |     |     |     |     |
Online check
| PLAUS:PZEONL   |     |                    |     |     |     |     |
| -------------- | --- | ------------------ | --- | --- | --- | --- |
| PLAUS:PZESTA   |     | Status sequence    |     |     |     |     |
| ZYKLLOAD:PZE   |     | Cycl. loading PZE  |     |     |     |     |
| ZEI:BERLESEN1  |     | Time 1 load PZE    |     |     |     |     |
| ZEI:BERLESEN2  |     | Time 2 load PZE    |     |     |     |     |
Duration opener
| RELZUG:DAUER   |     |                  |     |     |     |     |
| -------------- | --- | ---------------- | --- | --- | --- | --- |
| PZESTA:DAUER   |     | Duration status  |     |     |     |     |
| PZEINFO:DAUER  |     | Duration info    |     |     |     |     |
| PZEINFO:CFG    |     | Info display     |     |     |     |     |
Info number
| PZEINFO:NR  |     |     |     |     |     |     |
| ----------- | --- | --- | --- | --- | --- | --- |
Info from 1
| INFOZEIB:1    |     |              |     |     |     |     |
| ------------- | --- | ------------ | --- | --- | --- | --- |
| INFOZEIE:1    |     | Info to 1    |     |     |     |     |
| ...to         |     | ...to        |     |     |     |     |
| INFOZEIB:5    |     | Info from 5  |     |     |     |     |
| INFOZEIE:5    |     | Info to 5    |     |     |     |     |
Delay with shift change
| OFSLST      |     |                        |     |     |     |     |
| ----------- | --- | ---------------------- | --- | --- | --- | --- |
| NEUZEIN     |     | Time for next restart  |     |     |     |     |
| NEUDATN     |     | Date for next restart  |     |     |     |     |
| OPT:CNRPRN  |     | Ticket print           |     |     |     |     |
|             |     | Batch number           |     |     |     |     |
| CNR:TNR     |     |                        |     |     |     |     |
Terminal group
| TGRP         |     |                          |     |     |     |     |
| ------------ | --- | ------------------------ | --- | --- | --- | --- |
| SAGART       |     | MOP generat. type        |     |     |     |     |
| LEN:AUNR     |     | Order length             |     |     |     |     |
| OPT:MDEGEN   |     | Generation MDE postings  |     |     |     |     |
| OPT:RMIRUEZ  |     | Upload Setup time        |     |     |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 137 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|     | Identifier  | Field designation  |     |     | Description   |     |
| --- | ----------- | ------------------ | --- | --- | ------------- | --- |
Process. Standard time
| OPT:VGZ      |     |                            |     |     |     |     |
| ------------ | --- | -------------------------- | --- | --- | --- | --- |
| PRJ          |     | Customer project           |     |     |     |     |
| OPT:MNRFTYP  |     | Machine number format      |     |     |     |     |
| OPT:SAG      |     | Proces. merged operations  |     |     |     |     |
Plaus. PZE-IN
| OPT:PZEPLAUS  |     |     |     |     |     |     |
| ------------- | --- | --- | --- | --- | --- | --- |
System number
| SYSNR:SETUP    |     |                             |     |     |     |     |
| -------------- | --- | --------------------------- | --- | --- | --- | --- |
| MAXDAUERSTEMP  |     | Time clocking supplement    |     |     |     |     |
| OPT:PZEAUTO    |     | PZE controls ADE            |     |     |     |     |
| ADEKAR:AKTIV   |     | Waiting time treatment ADE  |     |     |     |     |
| ADEKAR:DAUER   |     | Waiting time                |     |     |     |     |
Waiting time RPA
| ADEKAR:BMKNR   |     |                                |     |     |     |     |
| -------------- | --- | ------------------------------ | --- | --- | --- | --- |
| OPT:VLIST      |     | Sequencing list                |     |     |     |     |
| OPT:AUSNR      |     | Coll. interruption reason      |     |     |     |     |
| OPT:ABBRNR     |     | Coll. scrap reason             |     |     |     |     |
| OPT:ERFPMENGE  |     | Coll. person-related quantity  |     |     |     |     |
Coll. order-related quantity
| OPT:ERFAMENGE  |     |                   |     |     |     |     |
| -------------- | --- | ----------------- | --- | --- | --- | --- |
| OPT:GUTMANU    |     | Coll. yield       |     |     |     |     |
| OPT:AUSMANU    |     | Coll. scrap       |     |     |     |     |
| OPT:CHV        |     | Batch management  |     |     |     |     |
Waiting time treatm. MDE
| MDEKAR:AKTIV  |     |     |     |     |     |     |
| ------------- | --- | --- | --- | --- | --- | --- |
Lower waiting time limit MDE
| MDEKAR:UG        |     |           |             |        |     |     |
| ---------------- | --- | --------- | ----------- | ------ | --- | --- |
| MDEKAR:BMKNPLAN  |     | RPA  for  | times  not  | yet    |     |     |
scheduled
Upper waiting time limit MDE
| MDEKAR:OG  |     |     |     |     |     |     |
| ---------- | --- | --- | --- | --- | --- | --- |
RPA for scheduled times
| MDEKAR:BMKPLAN   |     |                             |     |     |     |     |
| ---------------- | --- | --------------------------- | --- | --- | --- | --- |
| OPT:ADEKNRPLAUS  |     | PNO entry (BDE postings)    |     |     |     |     |
| OPT:MDEKNRPLAUS  |     |   PNO entry (MDE postings)  |     |     |     |     |
| LEN:KNR          |     | Badge number length         |     |     |     |     |
Version
| VER  |     |     |     |     |     |     |
| ---- | --- | --- | --- | --- | --- | --- |
Customer sequencing list
| OPT:KDVLIST   |     |                                  |     |     |     |     |
| ------------- | --- | -------------------------------- | --- | --- | --- | --- |
| OPT:WILLESYS  |     | Wille system                     |     |     |     |     |
| OPT:UCHGEN    |     | Creating unknown batches         |     |     |     |     |
| OPT:TRMGEN    |     | Generation partial confirmation  |     |     |     |     |
(upload part quantity)
| OPT:KORRMNGEN  |     | Hide correction messages  |     |     |     |     |
| -------------- | --- | ------------------------- | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 138 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- |

|     | Identifier  | Field designation  |     |     |     | Description   |     |
| --- | ----------- | ------------------ | --- | --- | --- | ------------- | --- |
Lock edit RM-data
| OPT:EDITBRMSPERR  |     |                                |     |     |     |     |     |
| ----------------- | --- | ------------------------------ | --- | --- | --- | --- | --- |
| OPT:AUSPAUDAUER   |     | Hide breaks in pers. duration  |     |     |     |     |     |
| BDEOPT:9          |     | BDE-CH 9                       |     |     |     |     |     |
  to
  to
BDEOPT:12
BDE-CH 12
| OPT:VLISTMOD  |     | Sequencing list       |     |     |     |     |     |
| ------------- | --- | --------------------- | --- | --- | --- | --- | --- |
| LEN:PNR       |     | Personnel No. length  |     |     |     |     |     |
| OPT:PNRFUELL  |     | PersonnelNofillsign   |     |     |     |     |     |
Set access statuses
| OPT:ZST        |     |         |           |          |     |     |     |
| -------------- | --- | ------- | --------- | -------- | --- | --- | --- |
|                |     | Change  | clocking  | absence  |     |     |     |
| OPT:WSTEMPFGR  |     |         |           |          |     |     |     |
reason
FLS earliest start date
| OPT:ADATF  |     |     |     |     |     |     |     |
| ---------- | --- | --- | --- | --- | --- | --- | --- |
FLS display order type
| OPT:AART       |     |                              |     |     |     |     |     |
| -------------- | --- | ---------------------------- | --- | --- | --- | --- | --- |
| KERNELVER      |     | Kernel version               |     |     |     |     |     |
| KDNR           |     | Customer number              |     |     |     |     |     |
| OPT:ANTVERBPM  |     | Proportionate posting labor  |     |     |     |     |     |
times
| OPT:PZPLAUS     |     | Process check digit  |     |     |     |     |     |
| --------------- | --- | -------------------- | --- | --- | --- | --- | --- |
| OPT:WSTEMP      |     | Alternate clocking   |     |     |     |     |     |
| OPT:TGLKTOBEGR  |     | Daily account limit  |     |     |     |     |     |
Event update active
| OPT:EVENTEDIT  |     |                           |     |     |     |     |     |
| -------------- | --- | ------------------------- | --- | --- | --- | --- | --- |
| VER            |     | HYD:HYDRA version         |     |     |     |     |     |
| KK1:AKTIV      |     | PZE:PZE as SAP subsystem  |     |     |     |     |     |
| KK2:AKTIV      |     | BDE:BDE as SAP subsystem  |     |     |     |     |     |
KK_KD1:AKTIV
| KK_KD1:AKTIV  |     |     |     |     |     |     |     |
| ------------- | --- | --- | --- | --- | --- | --- | --- |
KK_KD2:AKTIV
| KK_KD2:AKTIV  |     |                      |     |     |     |     |     |
| ------------- | --- | -------------------- | --- | --- | --- | --- | --- |
| LEVEL         |     | Level                |     |     |     |     |     |
| HYDDI:LEVEL   |     | Hyddi level          |     |     |     |     |     |
| LEN:AFOLG     |     | Length of sequence   |     |     |     |     |     |
| LEN:AGNR      |     | Length of OP number  |     |     |     |     |     |
Number of splits
| LEN:SPLNR       |     |                      |     |     |     |     |     |
| --------------- | --- | -------------------- | --- | --- | --- | --- | --- |
| LEN:BCNR        |     | Length of barcode    |     |     |     |     |     |
| LEN:CNR         |     | CNR length           |     |     |     |     |     |
| OPT:CNRAUTOGEN  |     | Generate CNR autom.  |     |     |     |     |     |
Fixed incoming goods batch
| CNRFIX:WE  |     |     |     |     |     |     |     |
| ---------- | --- | --- | --- | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     |     | Page 139 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|     | Identifier  | Field designation  |     |     | Description   |     |
| --- | ----------- | ------------------ | --- | --- | ------------- | --- |
Fixed production batch
| CNRFIX:PR      |     |                             |     |     |     |     |
| -------------- | --- | --------------------------- | --- | --- | --- | --- |
| OPT:CNRAUTOAB  |     | Log input batch autom. off  |     |     |     |     |
| OPT:MDETLG     |     | Multiple partit.            |     |     |     |     |
| ZYKLLOAD:BDE   |     | (empty)                     |     |     |     |     |
Shift model with HUPE terminal
| BDEJMOD  |     |     |     |     |     |     |
| -------- | --- | --- | --- | --- | --- | --- |
Comment
| FIR  |     |             |                  |       |     |     |
| ---- | --- | ----------- | ---------------- | ----- | --- | --- |
| ABT  |     | Department  | where  terminal  | is    |     |     |
located
Configuration flag 2
| CFG:2  |     |     |     |     |     |     |
| ------ | --- | --- | --- | --- | --- | --- |
Plaus. checks
| PLAUS:OFF  |     |               |     |     |     |     |
| ---------- | --- | ------------- | --- | --- | --- | --- |
| PARAM1     |     | Parameter 1   |     |     |     |     |
  to
  to
PARAM5
Parameter 5
| MELDART       |     | Control of postings            |     |     |     |     |
| ------------- | --- | ------------------------------ | --- | --- | --- | --- |
| PLAUS:ADEKNR  |     | Configuration ADE card number  |     |     |     |     |
| PLAUS:MDEKNR  |     | Configuration MDE card         |     |     |     |     |
number
| PLAUS:MNR   |     | Machine configuration            |     |     |     |     |
| ----------- | --- | -------------------------------- | --- | --- | --- | --- |
| PLAUS:MST   |     | Configuration of machine status  |     |     |     |     |
| PLAUS:AART  |     | Configuration of opt. entry of   |     |     |     |     |
order type
| OPT:BERFKT  |     | Area function active  |     |     |     |     |
| ----------- | --- | --------------------- | --- | --- | --- | --- |
| ART         |     | Terminal type         |     |     |     |     |
Dialog control
| DLGSTRG  |     |     |     |     |     |     |
| -------- | --- | --- | --- | --- | --- | --- |
Example:
DLG=LIST;45|DAT=02/11/2005|ZEI=40000|USR=2101|DATEI= ./spool/trm_list.101|
| 6.4.11  | Comments on operations  |     |     |     |     |     |
| ------- | ----------------------- | --- | --- | --- | --- | --- |
The list of comments on operations is provided by the command DLG=LIST;61 and filed in the directory
HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;61|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
| Parameter:   | none  |     |     |     |     |     |
| ------------ | ----- | --- | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 140 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

The definition of the file name and the respective path is case-sensitive.

The list includes the following data:
|            | Identifier  | Field designation        |     |     | Description   |     |
| ---------- | ----------- | ------------------------ | --- | --- | ------------- | --- |
| MNR        |             | Machine                  |     |     |               |     |
| ANR        |             | Order                    |     |     |               |     |
| AUNR       |             | Inspection order number  |     |     |               |     |
| AGNR       |             | OP                       |     |     |               |     |
| AFOLG      |             | Sequence                 |     |     |               |     |
| SPLNR      |             | Split number             |     |     |               |     |
| PNR        |             | Personnel number         |     |     |               |     |
| PNAME      |             | Name                     |     |     |               |     |
| PVORNAME   |             | First name               |     |     |               |     |
| DAT        |             | Date                     |     |     |               |     |
| ZEI        |             | Time                     |     |     |               |     |
| BEM        |             | Comment                  |     |     |               |     |
Example:
DLG=LIST;61|DAT=02/11/2005|ZEI=40000|USR=2101|DATEI= ./spool/agkom_list.101|
| 6.4.12  | Order components (BOM)  |     |     |     |     |     |
| ------- | ----------------------- | --- | --- | --- | --- | --- |
The list of order components ("Bill of materials") is provided by the command DLG=LIST;74 and filed in
the directory HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;74|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
The definition of the file name and the respective path is case-sensitive.

| Parameter:   | ANR  order number (mandatory)  |     |     |     |     |     |
| ------------ | ------------------------------ | --- | --- | --- | --- | --- |
Parameter:  ART  Filter indicator for components (optional parameters)
|     |     | B = production resource  |     |     |     |     |
| --- | --- | ------------------------ | --- | --- | --- | --- |
|     |     | M = material             |     |     |     |     |
|     |     | V = equipment            |     |     |     |     |
|     |     | W = tools                |     |     |     |     |
|     |     | Q = measuring equipment  |     |     |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 141 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- |

|     |       | D = documents         |     |     |     |     |     |
| --- | ----- | --------------------- | --- | --- | --- | --- | --- |
|     |       | C = NC programs       |     |     |     |     |     |
|     |       | U = unknown resource  |     |     |     |     |     |

The list includes the following data:
|      | Identifier  | Field designation  |     |                 | Description   |     |     |
| ---- | ----------- | ------------------ | --- | --------------- | ------------- | --- | --- |
| ART  |             | Type               |     | Component type  |               |     |     |
B = production resource
M = material
V = equipment
W = tools
Q = measuring equipment
D = documents
C = NC programs
U = unknown resource
| ATK    |     | Article      |     | With materials: material number  |     |     |     |
| ------ | --- | ------------ | --- | -------------------------------- | --- | --- | --- |
| BEZ    |     | Designation  |     | Material designation/name        |     |     |     |
| BEZ:2  |     | Designation  |     | Material name 2                  |     |     |     |
SGR:GUT  Input quantity  Input quantity to produce 1 article in
primary quantity unit in the operation.
With production resources and tools,
|     |     |     |     | this  is  | the  quantity  | required  | of  a  |
| --- | --- | --- | --- | --------- | -------------- | --------- | ------ |
resource for this operation.
| MENGE:BED  |     | Demand   |     | Required quantity           |            |       |           |
| ---------- | --- | -------- | --- | --------------------------- | ---------- | ----- | --------- |
| SGE:GUT    |     | Unit     |     | Unit of the input quantity  |            |       |           |
| ATKBEZ     |     | Article  |     | Optional                    | component  | name  | (of  the  |
material, document, etc.)
| SLP  |     | BOM item  |     | Item number of component (BOM  |     |     |     |
| ---- | --- | --------- | --- | ------------------------------ | --- | --- | --- |
item)
| LAGORT  |     | Storage location   |     | Reserved                         |     |     |     |
| ------- | --- | ------------------ | --- | -------------------------------- | --- | --- | --- |
| LAGPZ   |     | Storage compartm.  |     | Reserved                         |     |     |     |
| PATH    |     | Path               |     | With documents: path             |     |     |     |
| FILE    |     | File name          |     | With documents: file name        |     |     |     |
| RESTYP  |     | Type               |     | WNR, DOC, etc. =  resource type  |     |     |     |
MAT = material
| MOD  |     | Extended type  |     | Extended type:  |     |     |     |
| ---- | --- | -------------- | --- | --------------- | --- | --- | --- |
Document :DOC
Material: MAT
Other: NOMAT

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     |     | Page 142 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

Example:
DLG=LIST;74|DAT=02/11/2005|ZEI=40000|USR=2101|ANR=AAA2100473100200|DATEI=
./spool/mat_list.101|
| 6.4.13  | Scrap reason list  |     |     |     |     |     |
| ------- | ------------------ | --- | --- | --- | --- | --- |
The  list  of  scrap  reasons  is  provided  by  the  command  DLG=LIST;84  and  filed  in  the  directory
HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;84|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
| Parameter:   | MOD   T  | terminal  |     |     |     |     |
| ------------ | -------- | --------- | --- | --- | --- | --- |
M  machine
|     | ART  in mode M (machine) restricted to the type  |     |     |     |     |     |
| --- | ------------------------------------------------ | --- | --- | --- | --- | --- |
(A = scrap, N = rework, P = problem quantity, G = yield)
The definition of the file name and the respective path is case-sensitive.

The list includes the following reasons and provides the following data:
|              | Identifier  | Field designation  |     |             | Description   |     |
| ------------ | ----------- | ------------------ | --- | ----------- | ------------- | --- |
| MNR          |             | Machine            |     |             |               |     |
| ART          |             | Type               |     |             |               |     |
| GR           |             | Reason             |     |             |               |     |
| GRTXTNR      |             | Reason text        |     |             |               |     |
| BEZK         |             | Designation        |     |             |               |     |
| MGR          |             | Mother reason      |     |             |               |     |
| GRTXT        |             | Scrap reason       |     |             |               |     |
| ATK          |             | Article            |     |             |               |     |
| OPT:ATKVORG  |             | Default article    |     |             |               |     |
| TNR          |             | Terminal number    |     | with MOD=T  |               |     |
Example:
DLG=LIST;84|DAT=02/11/2005|ZEI=40000|USR=2101|DATEI= ./spool/gr_list.101|MOD=T|TNR=6

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 143 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| 6.4.14  | BDE order types  |     |     |     |     |     |
| ------- | ---------------- | --- | --- | --- | --- | --- |
The list of BDE order types is provided by  the command DLG=LIST;87 and filed  in the directory
HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;87|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
| Parameter:   | none  |     |     |     |     |     |
| ------------ | ----- | --- | --- | --- | --- | --- |
The definition of the file name and the respective path is case-sensitive.

The list includes the following order types and provides the following data:
| Identifier  |     | Field designation  |     |     | Description   |     |
| ----------- | --- | ------------------ | --- | --- | ------------- | --- |
| AUART       |     | Order type         |     |     |               |     |
CAT  Category  The category is used to classify and to combine similar
order types. The category is a logical umbrella term.
Possible values:
"PO" production order
"PJ" Project order
"PM" maintenance order
"KP" capacity order
"GK" overhead cost order
| BEZL  |     | Designation  |     |     |     |     |
| ----- | --- | ------------ | --- | --- | --- | --- |
OPT:RM  Option "Upload"  With this order type, the data recorded is uploaded to
the PPS system or not.
| OPT:PLAN      |     | Option "Plan"  |           |     |     |     |
| ------------- | --- | -------------- | --------- | --- | --- | --- |
| OPT:PLANTERM  |     | Option         | "Planned  |     |     |     |
dates"
| ICON            |     | Symbol  |     |     |     |     |
| --------------- | --- | ------- | --- | --- | --- | --- |
| OPT:AUBUCH      |     |         |     |     |     |     |
| OPT:VLIST       |     |         |     |     |     |     |
| OPT:ERF         |     |         |     |     |     |     |
| OPT:ABE         |     |         |     |     |     |     |
| OPT:APAN        |     |         |     |     |     |     |
| OPT:AANSKBAUTO  |     |         |     |     |     |     |
| OPT:PANSKBAUTO  |     |         |     |     |     |     |
| OPT:SNR         |     |         |     |     |     |     |
| OPT:SNRVERG     |     |         |     |     |     |     |
| OPT:EDITRM      |     |         |     |     |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 144 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| PLAUS:STAV       |     |     |     |
| ---------------- | --- | --- | --- |
| PLAUS:MINMENGEV  |     |     |     |
| PLAUS:WEIGMENGE  |     |     |     |
| FKT              |     |     |     |
| PLAUS:MNR        |     |     |     |
| PLAUS.PNR        |     |     |     |
| OPT:PRIOSTRG     |     |     |     |
| OPT:APPRN        |     |     |     |
| OPT:FERTVAR      |     |     |     |
| DLGSTRG          |     |     |     |
| VISCODE          |     |     |     |
| OPT:SYS          |     |     |     |
| AKTIV            |     |     |     |
Example:
DLG=LIST;87|DAT=02/11/2005|ZEI=40000|USR=2101|DATEI= ./spool/auart_list.101|
| 6.4.15  | List of counters  |     |     |
| ------- | ----------------- | --- | --- |
The counter configuration is provided in a list. You use the command DLG=LIST;131 to enable the list
request  for  the  machines  according  to  the  mode  (MOD).  The  list  is  filed  in  the  directory
HYDRADIR\spool\.
Structure of dialog data:
"DLG=LIST;131|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
Parameters:
  MOD=T … List of all counters of all machines assigned to the terminal. In this mode, the acronym
USR=HYDRA user number must be specified.
  MOD=M … List of all counters of a machine. In this mode, the acronym MNR=machine number
must be specified.
The definition of the file name and the respective path is case-sensitive.

The list includes the following data:

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 145 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| Identification  |     | Field designation  |     |                                        | Description   |     |
| --------------- | --- | ------------------ | --- | -------------------------------------- | ------------- | --- |
| MNR             |     | Machine            |     |                                        |               |     |
| CTR             |     | counters           |     | Unique counter identification          |               |     |
| BEZ             |     | Designation        |     |                                        |               |     |
| EINH            |     | Unit               |     |                                        |               |     |
| GR              |     | Reason             |     | Configuration of a reason, e.g. scrap  |               |     |
reason
| TYP  |     | Assessment  |     | The counter quantity is booked as  |     |     |
| ---- | --- | ----------- | --- | ---------------------------------- | --- | --- |
yield, scrap, rework or open quantity
(problem quantity).
VERB  Offset against   quantity  e.g.  scrap  is  subtracted  from  the
|     |     | account  |     | total quantity.  |     |     |
| --- | --- | -------- | --- | ---------------- | --- | --- |
VERB:TLG  Allocation with partitioning  If  VERB.TLG=J,  you  use  the
partitioning of machine and order to
book the counter pulses.
VERB:DIV  Allocation with pulse factor  If VERB.DIV=J, you use the pulse
factor of machine and order to book
the counter pulses.
OPT:TAKT  Posting as cycles  If  OPT:TAKT=J,  the  pulse  factors
recorded are also booked as cycles.
The quantity recorded is transferred
|     |     |     |     | to  the  | HYDRA  server  | via  the  |
| --- | --- | --- | --- | -------- | -------------- | --------- |
acronym AGR:HUB.
OPT:UEB  Monitoring  Indicator that specifies if the counter
is relevant for cycle monitoring.

Example:
DLG=LIST;131|MOD=T|DAT=02/11/2005|ZEI=40000|USR=2101|DATEI= ./spool/trm_list.101|

Note:
The list is sorted by machine and counter number in ascending order.
| 6.4.16  | List providing the assignment of workplaces to MDE  |     |     |     |     |     |
| ------- | --------------------------------------------------- | --- | --- | --- | --- | --- |
shop floor clients
The list provides all assignments of workplaces of this shop floor client to another shop floor client (MDE
terminal or PCC) with MDE operation mode.
The list only provides assignments that are fixed in the Workplace terminal assignment.
Workplaces, which are assigned to the executing shop floor client (parameter USR) as so-called "MDE
machines", are not included in the list.
The list is provided by the command DLG=LIST;140 and filed in the directory HYDRADIR\spool\.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 146 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

Structure of dialog data:
DLG=LIST;140|DATEI={file name}|DAT=...|ZEI=...|USR=...|...
Parameters:
  USR=: Terminal number of the shop floor client requesting the list.
If the list is requested without USR=, then the system provides an empty list.
The definition of the file name and the respective path is case-sensitive.

The list includes the following data:
| Identification  |     | Field designation  |         | Description   |     |
| --------------- | --- | ------------------ | ------- | ------------- | --- |
| ID              |     | Object ID          | TYP=M:  |               |     |
Work center numbers/machine numbers
| TYP  |     | Type  | Object type:  |     |     |
| ---- | --- | ----- | ------------- | --- | --- |
  "M" for workplace/machine
| TNR  |     | MDE terminal ID  | TYP=M:  |     |     |
| ---- | --- | ---------------- | ------- | --- | --- |
Terminal number of the shop floor client where
the workplace is assigned as "MDE machine".

The list is available from the following program version onwards:   hymwmde72.dll / so 8.1.1.143
| 6.5    | Reading HLS data     |     |     |     |     |
| ------ | -------------------- | --- | --- | --- | --- |
| 6.5.1  | Production variants  |     |     |     |     |
The list of production variants is provided by the command DLG=LIST;50 and filed in the directory
HYDRADIR\spool\.
Structure of dialog data:
„DLG=LIST;50|DATEI={file name}|MOD={mode}|DAT=...|ZEI=...|USR=...|...“
The definition of the file name and the respective path is case-sensitive.

The list includes all production variants (mode MOD=A) or only the changed production variants (mode
MOD=G). If the mode is written in lower case letters (e.g. MOD=a), then the system only selects released
production variants (STA=F).

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 147 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

The list includes the following data:
|          | Identifier  | Field designation  |                                  | Description   |                |
| -------- | ----------- | ------------------ | -------------------------------- | ------------- | -------------- |
| VERWEIS  |             | Reference          | Unique key                       |               |                |
| VER      |             | Version            | Version in a production variant  |               |                |
| STA      |             | Status             | F=released,                      | S=locked,     | L=(logically)  |
deleted
FIR:ATK  Company of article  Company of article/material type
| ATK       |     | Article              | Article                               |     |     |
| --------- | --- | -------------------- | ------------------------------------- | --- | --- |
| MATTYP    |     | Material type        | Material type                         |     |     |
| FIR:MNR   |     | Company of machine   | Company of machine                    |     |     |
| MNR       |     | Machine              | Machine number of the machine         |     |     |
| MGRP      |     | Group                | Machine groupe of the machine         |     |     |
| MANZ      |     | Number of machines   | in format N8.2                        |     |     |
| FIR:WNR   |     | Company of the tool  | Company of the tool                   |     |     |
| WNR       |     | Tool                 | Tool                                  |     |     |
| WFAM      |     | Tool family          | Tool family                           |     |     |
| WANZ      |     | Number of tools      | Number of tools in format N8.2        |     |     |
| SZY       |     | Target cycle         | Target cycle                          |     |     |
| TLG       |     | Partitioning         | Partitioning in format N8.2           |     |     |
| RUEZ      |     | Setup time           | Setup time                            |     |     |
| ABRZ      |     | Teardown time        | Teardown/retooling time               |     |     |
| PRIO      |     | Prio.                | Priority                              |     |     |
| BEM       |     | Comment              | Comment                               |     |     |
| DATB      |     | Start date           | Valid from                            |     |     |
| DATE      |     | End date             | Valid until                           |     |     |
| DSBEZ     |     | Data ID              | Data ID                               |     |     |
| BEARBDAT  |     | Changed on           | Date of the most recent modification  |     |     |
BEARBZEI  Processing time  Time of the most recent modification
| BEARB  |     | Modified by  | Modified by  |     |     |
| ------ | --- | ------------ | ------------ | --- | --- |
Example:
DLG=LIST;50|DAT=10/11/2000|ZEI=40000|USR=2101|DATEI= ./spool/fertvar.101|

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 148 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| 6.7    | Annex                            |     |     |     |     |     |
| ------ | -------------------------------- | --- | --- | --- | --- | --- |
| 6.7.1  | Overview of field data BDE/MDE   |     |     |     |     |     |
The following table provides an overview of the field data with structure and short example.
| Identifier  | Description   |     | Structure  |     |     | Example  |
| ----------- | ------------- | --- | ---------- | --- | --- | -------- |
MNR  Machine number  ...|MNR={machine number}|...  ...|MNR=100|...
MGRP  Machine group  ...|MGRP={machine group}|...  ...|MGRP=100|...
ANR  Fully defined key  ...|ANR={key}|...  ...|ANR=4711001001|...
AUNR  Order number  ...|AUNR={order number}  ...|AUNR=4711|...
AGNR  Operation number  ...|AGNR={OP}|...  ...|AGNR=0010|...
| AFOLG  | Sequence  | ...|AFOLG={sequence}|...  |     |     | ...|AFOLG=01|...  |     |
| ------ | --------- | ------------------------- | --- | --- | ----------------- | --- |
SPLNR  Split number  ...|SPLNR={split number}|...  ...|SPLNR=01|...
| AUART  | Order type      | ...|AUART={type}|...          |     |     | ...|AUART=0|...  |     |
| ------ | --------------- | ----------------------------- | --- | --- | ---------------- | --- |
| ATK    | Article number  | ...|ATK={article number}|...  |     |     |                  |     |
EGR:*  Recorded value  ...|EGR:{type}={value}|...  ..|EGR:GUT=10. |.
Manually  recorded  Types of recorded values:  ...|EGR:AUS=1 |...
value
RPA01, RPA02,..., RPA12
  DAUER, PDAUER
  HUB, GUT, AUS, LEN, GEW
The value recorded is added to the
relevant account in the DB.
EGR:*  New quantity types as  GUTB  Yield (base quantity unit)
of MW 2.0
|     |     | GUTP  Yield (primary quantity unit)  |             |           |     |     |
| --- | --- | ------------------------------------ | ----------- | --------- | --- | --- |
|     |     | GUTS  Yield                          | (secondary  | quantity  |     |     |
unit)
|     |     | GUTT  Yield (tertiary quantity unit)  |             |           |     |     |
| --- | --- | ------------------------------------- | ----------- | --------- | --- | --- |
|     |     | AUSB  Scrap (base quantity unit)      |             |           |     |     |
|     |     | AUSP  Scrap (primary quantity unit)   |             |           |     |     |
|     |     | AUSS  Scrap                           | (secondary  | quantity  |     |     |
unit)
|     |     | AUST  Scrap (tertiary quantity unit)  |     |     |     |     |
| --- | --- | ------------------------------------- | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     |     | Page 149 of 356  |
| ---------------- | --- | ------------------- | --- | --- | --- | ---------------- |

|     |     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- |

| Identifier  | Description   |       |     | Structure  |           |        |     | Example  |
| ----------- | ------------- | ----- | --- | ---------- | --------- | ------ | --- | -------- |
|             |               | NCHB  |     | Rework     | quantity  | (base  |     |          |
quantity unit)
|     |     | NCHP  |     | Rework  | quantity  | (primary  |     |     |
| --- | --- | ----- | --- | ------- | --------- | --------- | --- | --- |
quantity unit)
|     |     | NCHS  |     | Rework quantity (secondary  |     |     |     |     |
| --- | --- | ----- | --- | --------------------------- | --- | --- | --- | --- |
quantity unit)
|     |     | NCHT  |     | Rework  | quantity  | (tertiary  |     |     |
| --- | --- | ----- | --- | ------- | --------- | ---------- | --- | --- |
quantity unit)
|     |     | PRBB  |     | Problem  | quantity  | (base  |     |     |
| --- | --- | ----- | --- | -------- | --------- | ------ | --- | --- |
quantity unit)
|     |     | PRBP  |     | Problem  | quantity  | (primary  |     |     |
| --- | --- | ----- | --- | -------- | --------- | --------- | --- | --- |
quantity unit)
|     |     | PRBS  |     | Problem quantity (secondary  |     |     |     |     |
| --- | --- | ----- | --- | ---------------------------- | --- | --- | --- | --- |
quantity unit)
|     |     | PRBT  |     | Problem  | quantity  | (tertiary  |     |     |
| --- | --- | ----- | --- | -------- | --------- | ---------- | --- | --- |
quantity unit)
| AGE:*  | Units of automatically  | B   |     | Base quantity unit  |     |     |     |     |
| ------ | ----------------------- | --- | --- | ------------------- | --- | --- | --- | --- |
recorded values
|        |                         | P   |     | Primary quantity unit    |     |     |     |     |
| ------ | ----------------------- | --- | --- | ------------------------ | --- | --- | --- | --- |
|        |                         | S   |     | Secondary quantity unit  |     |     |     |     |
|        |                         | T   |     | Tertiary quantity unit   |     |     |     |     |
| SGE:*  | Units of target values  | B   |     | Base quantity unit       |     |     |     |     |
|        |                         | P   |     | Primary quantity unit    |     |     |     |     |
|        |                         | S   |     | Secondary quantity unit  |     |     |     |     |
|        |                         | T   |     | Tertiary quantity unit   |     |     |     |     |
EGE:*  Unit  of  recorded  ...|EGE:{type}={unit}|...  EGE:GUT=ST
values
|     |     | Types see EGR  |     |     |     |     |     |     |
| --- | --- | -------------- | --- | --- | --- | --- | --- | --- |

EGG:*  Reasons  of  recorded  ...|EGG:{type}={reason}|...  EGG:AUS = 1
values
Types see EGR
SGR:*  Target value  ...|SGR:{type}={value}|...  ...|SGR:GUT=1126|

SGR:GUT =target quantity order/OP
Types see EGR
|     |     | New  | types  | 7.2:  | AUS*,  | GUT*  (see  |     |     |
| --- | --- | ---- | ------ | ----- | ------ | ----------- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 150 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --- | ---------------- |

|     |     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- |

| Identifier  |     | Description   |     |     | Structure  |     |     | Example  |
| ----------- | --- | ------------- | --- | --- | ---------- | --- | --- | -------- |
EGR)
TLG  Partitioning  ...|TLG={partitioning}|...  ...|TLG=1|...
...|TLG=0.25|...
SZY  Target cycle  ...|SZY={target cycle};{unit}|...  ...|SZY=36000;s|...
|     |     |     | First, only unit "s"! Later conversions  |     |     |     | ...|SZY=10;h|...  |     |
| --- | --- | --- | ---------------------------------------- | --- | --- | --- | ----------------- | --- |
of the values into seconds.
MST  Machine status  ...|MST={machine status }|...  ..|MST=1 |..
PNR  Personnel number  ...|PNR={personnel number}|...  ...|PNR=999999|...
KNR  Staff badge no.:  ...|KNR={badge number}|...  ...|KNR=9999|...
BPOS  Operator  ...|BPOS={operator function}|...  ...|BPOS=A1|...
position/function
| PMK  | Memorize persons  |     | ...|PMK={Y/N}|...  |     |     |     | ...|PMK=J|...  |     |
| ---- | ----------------- | --- | ------------------ | --- | --- | --- | -------------- | --- |
CNR  Batch number   ...|CNR={batch number}  ...|CNR=998877|...
| KST  | Cost center  |     | Cost center  |     |     |     |     |     |
| ---- | ------------ | --- | ------------ | --- | --- | --- | --- | --- |
BZW  Posting required  Optional  parameter.  If  the  option  is  ...|BZW=J|...
|     |     |     | set,  | several  | validation  | checks  are  |     |     |
| --- | --- | --- | ----- | -------- | ----------- | ------------ | --- | --- |

|     |     |     | disabled.  |     | If  option  | is  not  sent:  |     |     |
| --- | --- | --- | ---------- | --- | ----------- | --------------- | --- | --- |
= N
[...|BZW={posting required}|...]
|     |     |     | Field data for BATCH  |     |     |     |     |     |
| --- | --- | --- | --------------------- | --- | --- | --- | --- | --- |
LHW  Info on batch  Info on batch (C20)  |LHW={batch info}|...
| ZLO  | Target          |     | Target                |     |     |     | ...|ZLO=121234|...  |     |
| ---- | --------------- | --- | --------------------- | --- | --- | --- | ------------------- | --- |
| TPE  | Transport unit  |     | Transport unit (C10)  |     |     |     | ...|TPE=1234|...    |     |
| SLP  | BOM item        |     | BOM item (C6)         |     |     |     | ...|SLP=AA34|...    |     |
ATTR:*  Additional attributes of  ...|ATTR:{no}]={attribute recorded}|..
a batch
no = 1 ..11
field types;
1 - 4   :  Integer
4 – 6  :  Double
7        :  Char 4
8, 9    :  Char 10
10, 11:  Char 20
STN  Station number  ...|STN ={ station number }|...  ...|STN=1|..

| SCS-PDM_81.docx  |     |     |     | Version: 1.0.23049  |     |     |     | Page 151 of 356  |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | --- | ---------------- |

Production Data Manager
Identifier Description Structure Example
LOSANZ Number of parallel ...|LOSANZ ={ number of batches }|... ...|LOSANZ=5|...
output batches
6.7.2 Optional field data for the premium and incentive wages
LLE
The following data fields can optionally be used for the premium and incentive wages LLE in the BDE
input dialogs.
You require the licenses to calculate single or group incentives.
The listed fields are optional. In most cases, these fields are not explicitly filled during data collection, but
the fields are usually transferred automatically from the operation or the LLE assignment of premium
groups to the BDE postings or the fields are required in special cases only.
Identifier Type / Description
max. field
length
LPGRP= C8 Optional only with order logon:
In case of Incentive Wage LLE with group bonus: The premium group can
optionally only be recorded with machines having the incentive wage indicator
"G"=group piecework. Here, the premium group, which is assigned to the
machine in the Incentive Wage LLE, is overwritten in the U/E and B records.
LART= C4 In case of staff logon with LLE: Optional recording of the wage type for the BDE
staff postings (B record)
EGR:TE= N8 Optional entry of the single piece specification for the person t in seconds per
e
1000 pieces.
EGR:TR= N8 Optional entry of the setup specification for the person t in seconds.
r
EGR:TEB= N8 Optional entry of the single piece specification for the production resource t in
eb
seconds per 1000 pieces.
EGR:TRB= N8 Optional entry of the setup specification for the production resource t in
rb
seconds.
BPOS= C10 Optional entry of an operator position/function with staff logon
LPKZ= C10 Optional entry of a premium indicator with staff logon
SCS-PDM_81.docx Version: 1.0.23049 Page 152 of 356

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 6.7.3  | Tips and tricks  |     |     |
| ------ | ---------------- | --- | --- |
6.7.3.1  Transfer of machine data and shift change information
If you use the PDM dialogs to integrate the machine data collection including shift change function, then
you must assign the workplace/machine, for which you want to send PDM dialogs, to a terminal.
Without this assignment, the system cannot identify an active shift change via PDM dialog for this
machine. Result: The system performs proportionate allocations in the order shift log that might have
unexpected results.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 153 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

7  HYDRA Production Data Manager BDE - Master Data
| 7.1  | Note on the Descriptions of the Basic Dialogs  |     |     |     |
| ---- | ---------------------------------------------- | --- | --- | --- |
All mandatory fields that must be specified have the addition PK (primary key). All other fields are optional
and are processed if they are transferred.
| 7.2    | BDE Log Records                              |     |     |     |
| ------ | -------------------------------------------- | --- | --- | --- |
| 7.2.1  | Create log record (DLG=ADEPRO.INSERT, COPY)  |     |     |     |
You can use the BAPI calls described in this section to create or copy log records.
Tables
| Table          | Key field  |     | Description                      |     |
| -------------- | ---------- | --- | -------------------------------- | --- |
| ade_protokoll  | Reference  |     | Reference of the posting record  |     |
ADEPRO.VERWEIS
BAPI call
| ID                |     | Content / {type}  | Description                |     |
| ----------------- | --- | ----------------- | -------------------------- | --- |
| DLG               |     | ADEPRO.INSERT     | Create posting             |     |
|                   |     | ADEPRO.COPY       | Copy posting               |     |
| ADEPRO.VERWEIS:Q  |     | {N8}              | PK  only with ADEPRO.COPY  |     |
Refers to the posting that you want to copy.
| ADEPRO.SART  |     | {C1}  | PK  Log record of the posting  |     |
| ------------ | --- | ----- | ------------------------------ | --- |
|              |     |       | U = Order interruption         |     |
|              |     |       | E = End of order               |     |
|              |     |       | B = Staff posting              |     |
H = Batch record
ADEPRO.ANR  {C40}  PK  Combined order/OP number of the posting
Other option
| ADEPRO.AUNR  |     | {C40}  | PK  Order number of the posting      |     |
| ------------ | --- | ------ | ------------------------------------ | --- |
| ADEPRO.AGNR  |     | {C40}  | PK  Operation number of the posting  |     |
ADEPRO.AFOLG  {C40}  PK  Order sequence number of the posting
(only if configured in HYDRA)

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 154 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  |     | Content / {type}  | Description  |     |
| --- | --- | ----------------- | ------------ | --- |
ADEPRO.UAGNR  {C40}  PK  Sub operation number of the posting
(only if configured in HYDRA)
| ADEPRO.SPLNR  |     | {C40}  | PK  Split number of the posting  |     |
| ------------- | --- | ------ | -------------------------------- | --- |
(only if configured in HYDRA)

| ADEPRO.DATB  |     | {MM/DD/YYYY}  | PK  Start date of the posting                         |     |
| ------------ | --- | ------------- | ----------------------------------------------------- | --- |
| ADEPRO.DATE  |     | {MM/DD/YYYY}  | PK  End date of the posting                           |     |
| …            |     | …             | For further fields, that are not MANDATORY, refer to  |     |
section 7.2.4 List of fields (acronyms).
Return
| ID  |     | Content  Description  |     |     |
| --- | --- | --------------------- | --- | --- |
/ {type}
| VERWEIS  |     | {N8}  Returned reference of the created posting.   |     |     |
| -------- | --- | -------------------------------------------------- | --- | --- |
Example:
RET_DATA:
RET=0|KT=|LT=|DATA=ADEPRO|VERWEIS=15673259|RET=0|
KT=|LT=|
Plausibility checks
| Error codes  | Description  |     |     |     |
| ------------ | ------------ | --- | --- | --- |
10  The operation (ADEPRO.ANR) must be available in the backlog of orders (online
dataset).
90  The workplace (ADEPRO.MNR) must be available in the workplace configuration.
1803  Check is performed if only "BEARB" is passed and BEARB does not equal
"HYDRA".
No responsibility area authorization for the workplace is available (ADEPRO.MNR).
| 1030  | If ADEPRO.SART =B  |     |     |     |
| ----- | ------------------ | --- | --- | --- |
The person (ADEPRO.PNR) must be part of the staff.
| 1641  | If ADEPRO.SART =H  |     |     |     |
| ----- | ------------------ | --- | --- | --- |
The operation (ADEPRO.ANR) must be subject to batch management.
1900  If  the  license  LLE-GRB  is  active  and  the  premium  group  is  specified

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 155 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Error codes  | Description  |     |     |     |     |
| ------------ | ------------ | --- | --- | --- | --- |
(ADEPRO.LEISTGRP).
The premium group (ADEPRO.LEISTGRP) must be defined and valid.
| 1958  | ADEPRO.SART =U   |     |     |     |     |
| ----- | ---------------- | --- | --- | --- | --- |
  or
ADEPRO.SART =E
Within the selected period of time an overlapping log record is already available for
the operation and workplace, i.e. a U or E record, which reaches into or lies
completely within the period of time of the new record to be created, is already
available when trying to insert a log record of record type U or E.
1952  Start date (ADEPRO.DATB / ADEPRO.ZEIB) must not be greater than the end date
(ADEPRO.DATE / ADEPRO.ZEIE).
| 806  | If ADEPRO.SART =T or H  |     |     |     |     |
| ---- | ----------------------- | --- | --- | --- | --- |
The new record to be created must be within an already existing U/E record.
You can deactivate this check using the parameter ADEPRO.PLAUS:AGUN=N.
| 806  | If ADEPRO.SART = B and ADEPRO.PLAUS:AGUNB=J  |     |     |     |     |
| ---- | -------------------------------------------- | --- | --- | --- | --- |
The center of time of the record to be created must be within an already existing log
record of record type U or E.
| 814  | If ADEPRO.SART = H  |     |     |     |     |
| ---- | ------------------- | --- | --- | --- | --- |
The log record of record type H may only include values for one of the two quantity
types:
  either yield (ADEPRO.GUT/GUTP/GUTS/GUTT/GUTB)
  or scrap (ADEPRO.AUS/AUSP/AUSS/AUST/AUSB)
| 815  | If ADEPRO.SART = H  |     |     |     |     |
| ---- | ------------------- | --- | --- | --- | --- |
A log record of record type H exists for the specified period of time.
|     | You  can  | deactivate  | this  check  | using  the  | parameter  |
| --- | --------- | ----------- | ------------ | ----------- | ---------- |
ADEPRO.PLAUS:MULTICNR=J.
1661  You must specify the parameter with the ID ADEPRO.SART.
1661  You  must  specify  the  parameter  with  the  ID  ADEPRO.ANR  (or  the  IDs
AUNR,AGNR,AFOLG,UAGNR,SPLNR).
1661  You must specify the parameter with the IDs ADEPRO.DATB and ADEPRO.DATE.
| 7.2.2  | Edit log record (DLG=ADEPRO.UPDATE, DELETE, LOCK,  |     |     |     |     |
| ------ | -------------------------------------------------- | --- | --- | --- | --- |
UNLOCK, SELECT)
You can use the BAPI calls described in this section to edit log records.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 156 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

Tables
| Table          | Key field  |     | Description                  |     |     |
| -------------- | ---------- | --- | ---------------------------- | --- | --- |
| Ade_protokoll  | Reference  |     | Reference of the log record  |     |     |
ADEPRO.VERWEIS
BAPI call
| ID  |     | Content / {type}  | Description                  |     |     |
| --- | --- | ----------------- | ---------------------------- | --- | --- |
|     |     | ADEPRO.UPDATE     | Change log record            |     |     |
|     |     | ADEPRO.DELETE     | Delete log record            |     |     |
|     |     | ADEPRO.LOCK       | Lock log record for editing  |     |     |
MUST be performed before ADEPRO.UPDATE
|     |     | ADEPRO.UNLOCK  | Unlock log record after editing  |     |     |
| --- | --- | -------------- | -------------------------------- | --- | --- |
MUST be performed after ADEPRO.UPDATE
|                 |     | ADEPRO.SELECT  | Select log record                |     |     |
| --------------- | --- | -------------- | -------------------------------- | --- | --- |
| ADEPRO.VERWEIS  |     | {N8}           | PK  Reference of the log record  |     |     |
| ADEPRO.SART     |     | {C1}           | PK  Record type                  |     |     |
|                 |     |                | U = Order interruption           |     |     |
|                 |     |                | E = End of order                 |     |     |
|                 |     |                | B = Staff posting                |     |     |
H = Batch record
| …   |     | …   | ADEPRO.UPDATE: For further fields, that are not  |             |                         |
| --- | --- | --- | ------------------------------------------------ | ----------- | ----------------------- |
|     |     |     | MANDATORY, refer                                 | to section  | 7.2.4  List  of fields  |
(acronyms)
Return
| ID  |     | Content  Description  |     |     |     |
| --- | --- | --------------------- | --- | --- | --- |
/ {type}
ADEPRO.VERWEIS  {N8}  Return of reference of the changed log record.
Note: This reference might not be equal to the reference of
ADEPRO.UPDATE if the log record has already been uploaded
and a cancel posting must be created.
Plausibility checks
| Error codes  | Description  |     |     |     |     |
| ------------ | ------------ | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 157 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
10  The operation (ADEPRO.ANR) must be available in the backlog of orders.
90  The workplace (ADEPRO.MNR) must be available in the workplace configuration.
1803  Check  is  performed  if  only  "BEARB"  is  passed  and  BEARB  does  not  equal
"HYDRA".
No responsibility area authorization for the workplace is available (ADEPRO.MNR).
| 1030  | Only if ADEPRO.SART=B:  |     |     |
| ----- | ----------------------- | --- | --- |
The person (ADEPRO.PNR) must be part of the staff.
| 1641  | Only if ADEPRO.SART=H:  |     |     |
| ----- | ----------------------- | --- | --- |
The operation (ADEPRO.ANR) must be subject to batch management.
1958  Within the selected period of time, an overlapping log record is already available for
the operation and workplace, i.e. a U or E record, which reaches into or lies
completely within the period of time of the new record to be created, is already
available when trying to insert a log record of record type U or E.
1952  Start date (ADEPRO.DATB / ADEPRO.ZEIB) must not be greater than the end date
(ADEPRO.DATE / ADEPRO.ZEIE).
1900  If  the  license  LLE-GRB  is  active  and  the  premium  group  is  specified
(ADEPRO.LEISTGRP):
The premium group (ADEPRO.LEISTGRP) must be defined and valid.
| 806  | If ADEPRO.SART = T  |     |     |
| ---- | ------------------- | --- | --- |
The time of the log record must be within an already existing log record of record
type U or E.
| 806  | If ADEPRO.SART=H  |     |     |
| ---- | ----------------- | --- | --- |
The time of the log record must be within an already existing log record of record
type U or E.
| 1956  | UPDATE,DELETE  |     |     |
| ----- | -------------- | --- | --- |
If ADEPRO.SART=T
The upload of a part quantity (partial confirmation) cannot be changed because the
respective log record of record type U or E has not been generated.
| 814  | If ADEPRO.SART =H  |     |     |
| ---- | ------------------ | --- | --- |
The log record of record type H may only include values for one of the two quantity
types:
  either yield (ADEPRO.GUT/GUTP/GUTS/GUTT/GUTB)
  or scrap (ADEPRO.AUS/AUSP/AUSS/AUST/AUSB).
815  A log record of record type H exists for the specified period of time.
| 1954  | UPDATE.LOCK  |     |     |
| ----- | ------------ | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 158 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
The cancellation log record (resp. ADEPRO.VERWEIS) cannot be changed.
| 1955  | UPDATE.LOCK  |     |     |
| ----- | ------------ | --- | --- |
The original log record (resp. ADEPRO.VERWEIS) cannot be changed.
| 1957  | UPDATE  |     |     |
| ----- | ------- | --- | --- |
The record type cannot be changed (ADEPRO.SART):
  the record type of a log record of record type B cannot be changed into the
record type U or E.
  the record type of a log record of record type U or E cannot be changed into the
record type B.
Note: It is possible to change the record type of a log record of record type U into
the record type E and vice versa.

| 101  | UPDATE,LOCK,UNLOCK  |     |     |
| ---- | ------------------- | --- | --- |
The log record (if the parameter ADEPRO.VERWEIS is specified) must be created
in the database.
1666  The log record is currently locked by another user. (UPDATE, DELETE,LOCK).
| 1661  | UPDATE.LOCK,UNLOCK  |     |     |
| ----- | ------------------- | --- | --- |
You must specify the parameter with the ID ADEPRO.VERWEIS.
| 1661  | UPDATE.LOCK,UNLOCK  |     |     |
| ----- | ------------------- | --- | --- |
You must specify the parameter with the ID ADEPRO.SART.
| 1661  | UPDATE.LOCK,UNLOCK  |     |     |
| ----- | ------------------- | --- | --- |
You  must  specify  the  parameter  with  the  ID  ADEPRO.ANR  (or  the  IDs
AUNR,AGNR,AFOLG,UAGNR,SPLNR).
Plausibility checks in the MOC
| Error codes  | Description                                             |     |     |
| ------------ | ------------------------------------------------------- | --- | --- |
|              | Order type configuration: If upload cannot be changed.  |     |     |
 Event is locked because the posting has already been uploaded.
  Order type configuration: If editing authorization is enabled and the user does not
have the specified function authorization.
 no authorization to change something with this order type
|     | Setup setting: If "Maintenance of events" is active:  |     |     |
| --- | ----------------------------------------------------- | --- | --- |
 BDE maintenance based on events is active. Automatically generated postings
cannot be edited!
|     | Setup setting: If "Maintenance of events" is active:  |     |     |
| --- | ----------------------------------------------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 159 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| Error codes  | Description  |     |     |     |
| ------------ | ------------ | --- | --- | --- |
 BDE maintenance based on events is active. Automatically generated postings
cannot be deleted!
| 7.2.3  | Sign log record (DLG=ADEPRO.SIGN)  |     |     |     |
| ------ | ---------------------------------- | --- | --- | --- |
You can use this BAPI call to sign a posting.
| Table          | Key field  |     | Description               |     |
| -------------- | ---------- | --- | ------------------------- | --- |
| Ade_protokoll  | Reference  |     | Reference of the posting  |     |
ADEPRO.VERWEIS
BAPI call
| ID  |     | Content  | /  Description  |     |
| --- | --- | -------- | --------------- | --- |
{type}
| DLG  |     | ADEPRO. | PK Sign posting  |     |
| ---- | --- | ------- | ---------------- | --- |
SIGN
| ADEPRO.VERWEIS  |     | {N8}   | PK Reference  |     |
| --------------- | --- | ------ | ------------- | --- |
| BEARB           |     | {C10}  | PK Signed by  |     |
Note: The database fields sign_dat, sign_zeit are populated using the timestamp passed (DAT/ZEI).
Return
| ID  | Contents  |     | Description  |     |
| --- | --------- | --- | ------------ | --- |
| —   | —         |     | —            |     |
Plausibility checks
| Error codes  | Description  |     |     |     |
| ------------ | ------------ | --- | --- | --- |
1661  You must specify the parameter with the ID ADEPRO.VERWEIS.
101  The posting record (if the parameter ADEPRO.VERWEIS is specified) must be
available in the database.

Notes on the processing
  You can insert U records even if the OP has already been finished.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 160 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

  If you insert an E record, the operation status is set to finished.
  If you create or change a B record, the person-related RPAs of the respective U/E record and the
order status are revised.
  If you change an H record (batch posting), the quantities of the respective U/E record and the
order status are revised.
  If you change a T record (upload of part quantity), the quantities of the respective U/E record and
the order status are revised.
| 7.2.4  | List of fields (acronyms) for the ADEPRO dialog  |              |     |          |         |
| ------ | ------------------------------------------------ | ------------ | --- | -------- | ------- |
| ID     |                                                  | Description  |     | DB type  | Lengt   |
h
| ADEPRO.ANR  |     | MES order number  |     | char  | 40    |
| ----------- | --- | ----------------- | --- | ----- | ----- |

| ADEPRO.SART  |     | Record type:  |     | char  | 3    |
| ------------ | --- | ------------- | --- | ----- | ---- |
U: Order interruption; Upload of part quantity
E: Order end
B: Staff logoff
T: Uploads of part quantities for order
H: Batch logoff

| ADEPRO.MST  |     | Status text number  |     | integer  | 7    |
| ----------- | --- | ------------------- | --- | -------- | ---- |
Machine status that was active or was set
when the OP was interrupted.
| ADEPRO.PANZ  |     | reserved   |     | smallint  | 7    |
| ------------ | --- | ---------- | --- | --------- | ---- |

| ADEPRO.PNR  |     | Person who triggered the log record  |     | char  | 10    |
| ----------- | --- | ------------------------------------ | --- | ----- | ----- |

| ADEPRO.PGRP  |     | reserved   |     | char  | 20    |
| ------------ | --- | ---------- | --- | ----- | ----- |

| ADEPRO.ZEIB  |     | Point in time of logon (time)  |     | integer  | 7    |
| ------------ | --- | ------------------------------ | --- | -------- | ---- |

| ADEPRO.DATB  |     | Point in time of logon (date)  |     | sqldate  | 7    |
| ------------ | --- | ------------------------------ | --- | -------- | ---- |

| ADEPRO.ZEIE  |     | Point in time of logoff (time)  |     | integer  | 7    |
| ------------ | --- | ------------------------------- | --- | -------- | ---- |

| ADEPRO.DATE  |     | Point in time of logoff (date)  |     | sqldate  | 7    |
| ------------ | --- | ------------------------------- | --- | -------- | ---- |

ADEPRO.EGR:DAUER  Total time of the posting, compared to the  integer  7
shift calendar
| ADEPRO.TNR  |     | Terminal that made the posting  |     | smallint  | 7    |
| ----------- | --- | ------------------------------- | --- | --------- | ---- |

| ADEPRO.MNR  |     | HYDRA workplace making the posting  |     | char  | 20    |
| ----------- | --- | ----------------------------------- | --- | ----- | ----- |

| ADEPRO.TLG  |     | Valid partitioning of the posting  |     | decimal  | 7    |
| ----------- | --- | ---------------------------------- | --- | -------- | ---- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 161 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Description  |     | DB type  | Lengt   |
| --- | --- | ------------ | --- | -------- | ------- |
h

ADEPRO.SKNR  Shift  number;  assignment  of  the  shift  that  smallint  7
logs off

ADEPRO.SKZEIB  Beginning of shift of the assigned shift  integer  7

ADEPRO.SKZEIE  End of shift of the assigned shift  integer  7

| ADEPRO.SKPAUSE  |     | Shift break in seconds  |     | smallint  | 7    |
| --------------- | --- | ----------------------- | --- | --------- | ---- |

ADEPRO.EGR:BMK01  Time recorded, splitted onto RP accounts  integer  7
Activity posted in RPA 01

| ADEPRO.EGR:BMK02  |     | Activity posted in RPA 02  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK03  |     | Activity posted in RPA 03  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK04  |     | Activity posted in RPA 04  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK05  |     | Activity posted in RPA 05  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK06  |     | Activity posted in RPA 06  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK07  |     | Activity posted in RPA 07  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK08  |     | Activity posted in RPA 08  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK09  |     | Activity posted in RPA 09  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK10  |     | Activity posted in RPA 10  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK11  |     | Activity posted in RPA 11  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:BMK12  |     | Activity posted in RPA 12  |     | integer  | 7    |
| ----------------- | --- | -------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:PDAUER  |     | Posted staff time  |     | integer  | 7    |
| ------------------ | --- | ------------------ | --- | -------- | ---- |

| ADEPRO.KST  |     | Cost center of the workplace  |     | char  | 10    |
| ----------- | --- | ----------------------------- | --- | ----- | ----- |

ADEPRO.VERWEIS  Unique ID of the log record, important for the  sqlserial  7
editing of log records

ADEPRO.RCK  J/N specifies if the log record has already  char  1
been uploaded to PPS system

ADEPRO.BEARB  Initials  of  the  user  who  manually  makes  char  10
changes

| ADEPRO.BEARBDAT  |     | Date of the manual change  |     | sqldate  | 7    |
| ---------------- | --- | -------------------------- | --- | -------- | ---- |

ADEPRO.SKDAT  Date of beginning of shift. In case of ADE  sqldate  7

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 162 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

Production Data Manager
ID Description DB type Lengt
h
records that extend over several shifts, the
date is identified using the end posting.
ADEPRO.RCK:01 customer-specific char 1
ADEPRO.RCK:02 customer-specific char 1
ADEPRO.ERFART Is assigned if the log record is manually char 1
created using the function "Maintenance of
postings" on the console:
M : created manually on the console
P : created automatically by the PZE. You
must not change the data record in the
maintenance of postings.
ADEPRO.ABREDAT Evaluation date PZE sqldate 7
ADEPRO.EGR:GUTB Yield (base quantity unit) decimal 7
ADEPRO.EGR:GUTP Yield (primary quantity unit) decimal 7
ADEPRO.EGR:GUTS Yield (secondary quantity unit) decimal 7
ADEPRO.EGR:GUTT Yield (tertiary quantity unit) decimal 7
ADEPRO.EGR:AUSB Scrap (base quantity unit) decimal 7
ADEPRO.EGR:AUSP Scrap (primary quantity unit) decimal 7
ADEPRO.EGR:AUSS Scrap (secondary quantity unit) decimal 7
ADEPRO.EGR:AUST Scrap (tertiary quantity unit) decimal 7
ADEPRO.EGR:NCHB Rework quantity (base quantity unit) decimal 7
ADEPRO.EGR:NCHP Rework quantity (primary quantity unit) decimal 7
ADEPRO.EGR:NCHS Rework quantity (secondary quantity unit) decimal 7
ADEPRO.EGR:NCHT Rework quantity (tertiary quantity unit) decimal 7
ADEPRO.EGR:PRBB Problem quantity (base quantity unit) decimal 7
ADEPRO.EGR:PRBP Problem quantity (primary quantity unit) decimal 7
ADEPRO.EGR:PRBS Problem quantity (secondary quantity unit) decimal 7
ADEPRO.EGR:PRBT Problem quantity (tertiary quantity unit) decimal 7
ADEPRO.EGE:GUTB Base quantity unit char 3
ADEPRO.EGE:GUTP Primary quantity unit char 3
SCS-PDM_81.docx Version: 1.0.23049 Page 163 of 356

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Description  |     | DB type  | Lengt   |
| --- | --- | ------------ | --- | -------- | ------- |
h
| ADEPRO.EGE:GUTS  |     | Secondary quantity unit  |     | char  | 3    |
| ---------------- | --- | ------------------------ | --- | ----- | ---- |

| ADEPRO.EGE:GUTT  |     | Tertiary quantity unit  |     | char  | 3    |
| ---------------- | --- | ----------------------- | --- | ----- | ---- |

| ADEPRO.GGR:HUB  |     | Total of clocks recorded  |     | decimal  | 7    |
| --------------- | --- | ------------------------- | --- | -------- | ---- |

| ADEPRO.EGR:HUBG  |     | Recorded clocks - yield  |     | decimal  | 7    |
| ---------------- | --- | ------------------------ | --- | -------- | ---- |

| ADEPRO.EGG:GUTB  |     | Deviation reason  |     | integer  | 7    |
| ---------------- | --- | ----------------- | --- | -------- | ---- |
Reference: ADE_GRUND_ZUORD

| ADEPRO.EGT:GUTB  |     | Reason text number for yield  |     | integer  | 7    |
| ---------------- | --- | ----------------------------- | --- | -------- | ---- |
Reference: ADE_GRUND_TEXTE

| ADEPRO.EGG:AUSB  |     | Scrap reason  |     | integer  | 7    |
| ---------------- | --- | ------------- | --- | -------- | ---- |
Reference: ADE_GRUND_ZUORD

| ADEPRO.EGT:AUSB  |     | Reason text number for scrap  |     | integer  | 7    |
| ---------------- | --- | ----------------------------- | --- | -------- | ---- |
Reference: ADE_GRUND_TEXTE

| ADEPRO.EGG:NCHB  |     | Rework reason  |     | integer  | 7    |
| ---------------- | --- | -------------- | --- | -------- | ---- |
Reference: ADE_GRUND_ZUORD

ADEPRO.EGT:NCHB  Reason text number for rework quantity  integer  7
Reference: ADE_GRUND_TEXTE

| ADEPRO.EGG:PRBB  |     | Problem reason  |     | integer  | 7    |
| ---------------- | --- | --------------- | --- | -------- | ---- |
Reference: ADE_GRUND_ZUORD

ADEPRO.EGT:PRBB  Reason text number for problem quantity  integer  7
Reference: ADE_GRUND_TEXTE

| ADEPRO.EGR:LST01  |     | Posted free activity 1  |     | decimal  | 7    |
| ----------------- | --- | ----------------------- | --- | -------- | ---- |

| ADEPRO.EGR:LST02  |     | Posted free activity 2  |     | decimal  | 7    |
| ----------------- | --- | ----------------------- | --- | -------- | ---- |

| ADEPRO.EGR:LST03  |     | Posted free activity 3  |     | decimal  | 7    |
| ----------------- | --- | ----------------------- | --- | -------- | ---- |

| ADEPRO.EGR:LST04  |     | Posted free activity 4  |     | decimal  | 7    |
| ----------------- | --- | ----------------------- | --- | -------- | ---- |

| ADEPRO.EGR:LST05  |     | Posted free activity 5  |     | decimal  | 7    |
| ----------------- | --- | ----------------------- | --- | -------- | ---- |

| ADEPRO.EGR:LST06  |     | Posted free activity 6  |     | decimal  | 7    |
| ----------------- | --- | ----------------------- | --- | -------- | ---- |

| ADEPRO.EGR:LST07  |     | Posted free activity 7  |     | decimal  | 7    |
| ----------------- | --- | ----------------------- | --- | -------- | ---- |

| ADEPRO.EGR:LST08  |     | Posted free activity 8  |     | decimal  | 7    |
| ----------------- | --- | ----------------------- | --- | -------- | ---- |

| ADEPRO.EGR:LST09  |     | Posted free activity 9  |     | decimal  | 7    |
| ----------------- | --- | ----------------------- | --- | -------- | ---- |

| ADEPRO.EGR:LST10  |     | Posted free activity 10  |     | decimal  | 7    |
| ----------------- | --- | ------------------------ | --- | -------- | ---- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 164 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Description  |     | DB type  | Lengt   |
| --- | --- | ------------ | --- | -------- | ------- |
h

ADEPRO.RGR:LST01  Current remaining activity 1  decimal  7

ADEPRO.RGR:LST02  Current remaining activity 2  decimal  7

ADEPRO.RGR:LST03  Current remaining activity 3  decimal  7

ADEPRO.RGR:LST04  Current remaining activity 4  decimal  7

ADEPRO.RGR:LST05  Current remaining activity 5  decimal  7

ADEPRO.RGR:LST06  Current remaining activity 6  decimal  7

ADEPRO.RGR:LST07  Current remaining activity 7  decimal  7

ADEPRO.RGR:LST08  Current remaining activity 8  decimal  7

ADEPRO.RGR:LST09  Current remaining activity 9  decimal  7

ADEPRO.RGR:LST10  Current remaining activity 10  decimal  7

| ADEPRO:EGE:LST01  |     | Unit of recorded activity 1  |     | char  | 3    |
| ----------------- | --- | ---------------------------- | --- | ----- | ---- |

| ADEPRO:EGE:LST02  |     | Unit of recorded activity 2  |     | char  | 3    |
| ----------------- | --- | ---------------------------- | --- | ----- | ---- |

| ADEPRO:EGE:LST03  |     | Unit of recorded activity 3  |     | char  | 3    |
| ----------------- | --- | ---------------------------- | --- | ----- | ---- |

| ADEPRO:EGE:LST04  |     | Unit of recorded activity 4  |     | char  | 3    |
| ----------------- | --- | ---------------------------- | --- | ----- | ---- |

| ADEPRO:EGE:LST05  |     | Unit of recorded activity 5  |     | char  | 3    |
| ----------------- | --- | ---------------------------- | --- | ----- | ---- |

| ADEPRO:EGE:LST06  |     | Unit of recorded activity 6  |     | char  | 3    |
| ----------------- | --- | ---------------------------- | --- | ----- | ---- |

| ADEPRO:EGE:LST07  |     | Unit of recorded activity 7  |     | char  | 3    |
| ----------------- | --- | ---------------------------- | --- | ----- | ---- |

| ADEPRO:EGE:LST08  |     | Unit of recorded activity 8  |     | char  | 3    |
| ----------------- | --- | ---------------------------- | --- | ----- | ---- |

| ADEPRO:EGE:LST09  |     | Unit of recorded activity 9  |     | char  | 3    |
| ----------------- | --- | ---------------------------- | --- | ----- | ---- |

| ADEPRO:EGE:LST10  |     | Unit of recorded activity 10  |     | char  | 3    |
| ----------------- | --- | ----------------------------- | --- | ----- | ---- |

| ADEPRO.FU:1  |     | User-specific field  |     | sqldate  | 7    |
| ------------ | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:2  |     | User-specific field  |     | sqldate  | 7    |
| ------------ | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:3  |     | User-specific field  |     | sqldate  | 7    |
| ------------ | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:4  |     | User-specific field  |     | sqldate  | 7    |
| ------------ | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:5  |     | User-specific field  |     | sqldate  | 7    |
| ------------ | --- | -------------------- | --- | -------- | ---- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 165 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Description  |     | DB type  | Lengt   |
| --- | --- | ------------ | --- | -------- | ------- |
h
| ADEPRO.FU:6  |     | User-specific field  |     | sqldate  | 7    |
| ------------ | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:7  |     | User-specific field  |     | integer  | 7    |
| ------------ | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:8  |     | User-specific field  |     | integer  | 7    |
| ------------ | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:9  |     | User-specific field  |     | integer  | 7    |
| ------------ | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:10  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:11  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:12  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:13  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:14  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:15  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:16  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:17  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:18  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:19  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:20  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:21  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:22  |     | User-specific field  |     | integer  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:23  |     | User-specific field  |     | decimal  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:24  |     | User-specific field  |     | decimal  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:25  |     | User-specific field  |     | decimal  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:26  |     | User-specific field  |     | decimal  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:27  |     | User-specific field  |     | decimal  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:28  |     | User-specific field  |     | decimal  | 7    |
| ------------- | --- | -------------------- | --- | -------- | ---- |

| ADEPRO.FU:29  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:30  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:31  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 166 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Description  |     | DB type  | Lengt   |
| --- | --- | ------------ | --- | -------- | ------- |
h

| ADEPRO.FU:32  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:33  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:34  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:35  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:36  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:37  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:38  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:39  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:40  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:41  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:42  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:43  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:44  |     | User-specific field  |     | char  | 1    |
| ------------- | --- | -------------------- | --- | ----- | ---- |

| ADEPRO.FU:45  |     | User-specific field  |     | char  | 10    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:46  |     | User-specific field  |     | char  | 10    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:47  |     | User-specific field  |     | char  | 10    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:48  |     | User-specific field  |     | char  | 10    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:49  |     | User-specific field  |     | char  | 10    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:50  |     | User-specific field  |     | char  | 10    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:51  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:52  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:53  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:54  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:55  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:56  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 167 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Description  |     | DB type  | Lengt   |
| --- | --- | ------------ | --- | -------- | ------- |
h
| ADEPRO.FU:57  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:58  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:59  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:60  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:61  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:62  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:63  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:64  |     | User-specific field  |     | char  | 20    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:65  |     | User-specific field  |     | char  | 40    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

| ADEPRO.FU:66  |     | User-specific field  |     | char  | 40    |
| ------------- | --- | -------------------- | --- | ----- | ----- |

ADEPRO.EGR:PBMK01  Personnel activity posted in RPA 1  integer  7

ADEPRO.EGR:PBMK02  Personnel activity posted in RPA 2  integer  7

ADEPRO.EGR:PBMK03  Personnel activity posted in RPA 3  integer  7

ADEPRO.EGR:PBMK04  Personnel activity posted in RPA 4  integer  7

ADEPRO.EGR:PBMK05  Personnel activity posted in RPA 5  integer  7

ADEPRO.EGR:PBMK06  Personnel activity posted in RPA 6  integer  7

ADEPRO.EGR:PBMK07  Personnel activity posted in RPA 7  integer  7

ADEPRO.EGR:PBMK08  Personnel activity posted in RPA 8  integer  7

ADEPRO.EGR:PBMK09  Personnel activity posted in RPA 9  integer  7

ADEPRO.EGR:PBMK10  Personnel activity posted in RPA 10  integer  7

ADEPRO.EGR:PBMK11  Personnel activity posted in RPA 11  integer  7

ADEPRO.EGR:PBMK12  Personnel activity posted in RPA 12  integer  7

ADEPRO.RGR:PBMK01  Current remaining personnel activity RPA 1  integer  7

ADEPRO.RGR:PBMK02  Current remaining personnel activity RPA 2  integer  7

ADEPRO.RGR:PBMK03  Current remaining personnel activity RPA 3  integer  7

ADEPRO.RGR:PBMK04  Current remaining personnel activity RPA 4  integer  7

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 168 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

Production Data Manager
ID Description DB type Lengt
h
ADEPRO.RGR:PBMK05 Current remaining personnel activity RPA 5 integer 7
ADEPRO.RGR:PBMK06 Current remaining personnel activity RPA 6 integer 7
ADEPRO.RGR:PBMK07 Current remaining personnel activity RPA 7 integer 7
ADEPRO.RGR:PBMK08 Current remaining personnel activity RPA 8 integer 7
ADEPRO.RGR:PBMK09 Current remaining personnel activity RPA 9 integer 7
ADEPRO.RGR:PBMK10 Current remaining personnel activity RPA 10 integer 7
ADEPRO.RGR:PBMK11 Current remaining personnel activity RPA 11 integer 7
ADEPRO.RGR:PBMK12 Current remaining personnel activity RPA 12 integer 7
ADEPRO.RGR:PDAUER Current remaining labor time integer 7
ADEPRO.RGR:BMK01 Current remaining activity RPA 1 integer 7
ADEPRO.RGR:BMK02 Current remaining activity RPA 2 integer 7
ADEPRO.RGR:BMK03 Current remaining activity RPA 3 integer 7
ADEPRO.RGR:BMK04 Current remaining activity RPA 4 integer 7
ADEPRO.RGR:BMK05 Current remaining activity RPA 5 integer 7
ADEPRO.RGR:BMK06 Current remaining activity RPA 6 integer 7
ADEPRO.RGR:BMK07 Current remaining activity RPA 7 integer 7
ADEPRO.RGR:BMK08 Current remaining activity RPA 8 integer 7
ADEPRO.RGR:BMK09 Current remaining activity RPA 9 integer 7
ADEPRO.RGR:BMK10 Current remaining activity RPA 10 integer 7
ADEPRO.RGR:BMK11 Current remaining activity RPA 11 integer 7
ADEPRO.RGR:BMK12 Current remaining activity RPA 12 integer 7
ADEPRO.RGR:DAUER Remaining run time integer 7
ADEPRO.ERFART "-": original data record of data collection char 3
O: original data record if it is edited
E: manually created data record (edited)
S: cancellation for PPS (posting is deleted
because of upload)
X: posting is locked; no booking is made
SCS-PDM_81.docx Version: 1.0.23049 Page 169 of 356

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Description  |     |     | DB type  | Lengt   |
| --- | --- | ------------ | --- | --- | -------- | ------- |
h
because of plausibility error.

| ADEPRO.SKART  |     | Shift ID of the assigned shift  |     |     | char  | 1    |
| ------------- | --- | ------------------------------- | --- | --- | ----- | ---- |
ADEPRO.SKMOD  Shift  model  used  (day  type)  smallint  7

| ADEPRO.LART  |     | reserved  |     |     | char  | 4    |
| ------------ | --- | --------- | --- | --- | ----- | ---- |

ADEPRO.EGR:TE  Target time per unit te from backlog of orders  decimal  7

ADEPRO.EGR:TR  Target setup time tr from backlog of orders  decimal  7

ADEPRO.EGR:TEB  Target  machine  time  per  unit  teb  from  decimal  7
backlog of orders

ADEPRO.EGR:TRB  Target specified setup time trb from backlog  decimal  7
of orders

| ADEPRO.BPOS  |     | Operator position  |     |     | char  | 10    |
| ------------ | --- | ------------------ | --- | --- | ----- | ----- |

| ADEPRO.LPKZ  |     | Wage/premium indicator  |     |     | char  | 10    |
| ------------ | --- | ----------------------- | --- | --- | ----- | ----- |

| ADEPRO.LEISTGRP  |     | Premium group (cid:129) |     |     | char  | 10    |
| ---------------- | --- | ----------------------- | --- | --- | ----- | ----- |

| ADEPRO.CNR  |     | Batch number   |     |     | char  | 20    |
| ----------- | --- | -------------- | --- | --- | ----- | ----- |

| 7.3      | Configuration of Data Collection Reason Texts  |     |     |     |     |     |
| -------- | ---------------------------------------------- | --- | --- | --- | --- | --- |
| 7.3.1.1  | Edit reason texts (DLG=GRTXT.INSERT, UPDATE,   |     |     |     |     |     |
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT)
You use these BAPI calls to edit reason texts.
Tables
| Table            | Key field     |     |     | Description              |     |     |
| ---------------- | ------------- | --- | --- | ------------------------ | --- | --- |
| ade_grund_texte  | grundtext_nr  |     |     | Reason text number (PK)  |     |     |

GRTXT.GRTXTNR
BAPI call
| ID   | Content / {type}  |     | Description         |     |     |     |
| ---- | ----------------- | --- | ------------------- | --- | --- | --- |
| DLG  | GRTXT.INSERT      |     | Create reason text  |     |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 170 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID          | Content / {type}  | Description                             |     |     |
| ----------- | ----------------- | --------------------------------------- | --- | --- |
|             | GRTXT.UPDATE      | Change reason text                      |     |     |
|             | GRTXT.DELETE      | Delete reason text                      |     |     |
|             | GRTXT.COPY        | Copy reason text                        |     |     |
|             | GRTXT.LOCK        | Lock reason text for editing            |     |     |
|             | GRTXT.UNLOCK      | Unlock reason text after editing        |     |     |
|             | GRTXT.NEW         | Read specification for new reason text  |     |     |
|             | GRTXT.SELECT      | Select reason text                      |     |     |
| GRTXT.GRTXT | {N4}              | PK reason text number                   |     |     |
NR
| GRTXT.GRTXT | {N4}  | Target - reason text number  |     |     |
| ----------- | ----- | ---------------------------- | --- | --- |
NR:Z
…  …  For further fields, refer to the documentation HYD-HDB that
includes the above listed tables
Return
| ID       | Content / {type}  | Description          |     |     |
| -------- | ----------------- | -------------------- | --- | --- |
| GRTXTNR  | {N4}              | Current data record  |     |     |
Plausibility checks
| Error codes  | Description                                           |     |     |     |
| ------------ | ----------------------------------------------------- | --- | --- | --- |
| 1661         | A value is missing that is required for processing.   |     |     |     |
| 1666         | The reason text is currently edited by another user.  |     |     |     |
| 7.3.1.2      | List of reason texts (DLG=GRTXT.LIST)                 |     |     |     |
The BAPI call returns all defined reason texts.
Tables
| Table            | Key field     |     | Description              |     |
| ---------------- | ------------- | --- | ------------------------ | --- |
| ade_grund_texte  | grundtext_nr  |     | Reason text number (PK)  |     |

GRTXT.GRTXTNR

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 171 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

BAPI call
| ID     | Contents    | Description                                  |     |     |
| ------ | ----------- | -------------------------------------------- | --- | --- |
| DLG    | GRTXT.LIST  | List of reason texts                         |     |     |
| DATEI  | {C256}      | Specification of the file name for the list  |     |     |

| 7.3.2    | Reasons                                       |     |     |     |
| -------- | --------------------------------------------- | --- | --- | --- |
| 7.3.2.1  | Edit reasons (DLG=GR.INSERT, UPDATE, DELETE,  |     |     |     |
COPY, LOCK, UNLOCK, NEW, SELECT)
You use these BAPI calls to edit reasons.
Tables
| Table            | Key field  |     | Description                      |     |
| ---------------- | ---------- | --- | -------------------------------- | --- |
| ade_grund_zuord  | masch_nr   |     | The combination must be unique.  |     |
art
grund

GR.MNR
GR.ART
GR.GR
BAPI call
| ID      | Content / {type}  | Description                        |     |     |
| ------- | ----------------- | ---------------------------------- | --- | --- |
| DLG     | GR.INSERT         | Create reason                      |     |     |
|         | GR.UPDATE         | Change reason                      |     |     |
|         | GR.DELETE         | Delete reason                      |     |     |
|         | GR.COPY           | Copy reason                        |     |     |
|         | GR.LOCK           | Lock reason for editing            |     |     |
|         | GR.UNLOCK         | Unlock reason after editing        |     |     |
|         | GR.NEW            | Read specification for new reason  |     |     |
|         | GR.SELECT         | Select reason                      |     |     |
| GR.MNR  | C20               | PK machine number                  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 172 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ID      | Content / {type}  | Description  |     |
| ------- | ----------------- | ------------ | --- |
| GR.ART  | C1                | PK type      |     |
A = scrap
N = rework
P = problem quantity
G = yield
L = batch reason
| GR.GR     | N8   | PK reason number       |     |
| --------- | ---- | ---------------------- | --- |
| GR.MNR:Z  | C20  | Target machine number  |     |
| GR.ART:Z  | C1   | Target type            |     |
| GR.GR:Z   | N8   | Target reason number   |     |
| MOD       | C1   | Copy mode              |     |
E- Copy currently selected reason
G- Copy all reasons
F- Copy missing reasons
M- Copy a reason for all machines

…  …  For further fields, refer to the documentation HYD-HDB that
includes the above listed tables
Return
| ID      | Content / {type}  | Description          |     |
| ------- | ----------------- | -------------------- | --- |
| MNRMNR  | C20               | Current data record  |     |
| ART     | C1                | Current data record  |     |
| GR      | N8                | Current data record  |     |
Plausibility checks
| Error codes  | Description                                           |     |     |
| ------------ | ----------------------------------------------------- | --- | --- |
| 1661         | A value is missing that is required for processing.   |     |     |
| 1666         | The reason text is currently edited by another user.  |     |     |
| 712          | Processing mode is invalid.                           |     |     |
| 1401         | Invalid deviation reason                              |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 173 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| Error codes  | Description                            |     |     |     |
| ------------ | -------------------------------------- | --- | --- | --- |
| 1803         | No responsibility area authorization.  |     |     |     |
If  you  create  workplace/machine-related  reasons,  the  system  checks  the
responsibility area of the workplace.
To override this check, you can set the parameter VABCHECK=N.
3273  Not possible - A reason can either be assigned to SYSTEM or to a random number
of machines.
| 709      | Copy: The target machine has not been specified.  |     |     |     |
| -------- | ------------------------------------------------- | --- | --- | --- |
| 710      | Copy: The target status has not been specified.   |     |     |     |
| 7.3.2.2  | List of reasons (DLG=GR.LIST)                     |     |     |     |
The BAPI call returns all defined reasons.
Tables
| Table            | Key field  |     | Description                      |     |
| ---------------- | ---------- | --- | -------------------------------- | --- |
| ade_grund_zuord  | masch_nr   |     | The combination must be unique.  |     |
art
grund

GR.MNR
GR.ART
GR.GR
BAPI call
| ID     | Contents  | Description                                  |     |     |
| ------ | --------- | -------------------------------------------- | --- | --- |
| DLG    | GR.LIST   | List of reason texts                         |     |     |
| DATEI  | {C256}    | Specification of the file name for the list  |     |     |

| 7.4    | Order Management and Order Sequencing        |     |     |     |
| ------ | -------------------------------------------- | --- | --- | --- |
| 7.4.1  | Lock order/operation for editing (ANR.LOCK)  |     |     |     |
You lock the operation to prevent the operation from being edited by another user.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 174 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Tables
| Table             | Key field  | Description                   |     |
| ----------------- | ---------- | ----------------------------- | --- |
| auftrags_bestand  | ANR.ANR    | PK  Combined order/OP number  |     |
if ANR.ATYP = OP

| Table             | Key field  | Description       |     |
| ----------------- | ---------- | ----------------- | --- |
| auftrags_bestand  | ANR.AUNR   | PK  Order number  |     |
if ANR.ATYP = AU (order)
BAPI call
| ID        | Content / {type}  | Description       |     |
| --------- | ----------------- | ----------------- | --- |
| DLG       | ANR.LOCK          | Plan operation    |     |
| ANR.ATYP  | {C4}              | Order type {AU}   |     |
Order type {AG}
| ANR.ANR  | {C40}  | Combined order/OP number  |     |
| -------- | ------ | ------------------------- | --- |
if ANR.ATYP=OP
| ANR.AUNR  | {C40}  | Order number   |     |
| --------- | ------ | -------------- | --- |
if ANR.ATYP=AU (order)
| BEARB      | {C10}  | Modified by                            |     |
| ---------- | ------ | -------------------------------------- | --- |
| ANR.TABLE  | {C1}   | A – Backlog of orders (default value)  |     |
Return
| ID  | Content  | Description  |     |
| --- | -------- | ------------ | --- |
/ {type}
| *   |     | All attributes of the order or the operation  |     |
| --- | --- | --------------------------------------------- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked  |     |     |
| ----- | ----------------- | --- | --- |
BEARB

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 175 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 7.4.2  | Unlock order/operation for editing (ANR.UNLOCK)  |     |     |
| ------ | ------------------------------------------------ | --- | --- |
Unlock an operation locked by a user.
Tables
| Table             | Key field  | Description                   |     |
| ----------------- | ---------- | ----------------------------- | --- |
| auftrags_bestand  | ANR.ANR    | PK  Combined order/OP number  |     |
if ANR.ATYP = OP

| Table             | Key field  | Description       |     |
| ----------------- | ---------- | ----------------- | --- |
| auftrags_bestand  | ANR.AUNR   | PK  Order number  |     |
if ANR.ATYP = AU (order)
BAPI call
| ID        | Content / {type}  | Description       |     |
| --------- | ----------------- | ----------------- | --- |
| DLG       | ANR.LOCK          | Plan operation    |     |
| ANR.ATYP  | {C4}              | Order type {AU}   |     |
Order type {AG}
| ANR.ANR  | {C40}  | Combined order/OP number  |     |
| -------- | ------ | ------------------------- | --- |
if ANR.ATYP=OP
| ANR.AUNR  | {C40}  | Order number   |     |
| --------- | ------ | -------------- | --- |
if ANR.ATYP=AU (order)
| BEARB      | {C10}  | Modified by                            |     |
| ---------- | ------ | -------------------------------------- | --- |
| ANR.TABLE  | {C1}   | A – Backlog of orders (default value)  |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 7.4.3  | Plan operation (ANR.EINPLANEN)  |     |     |
| ------ | ------------------------------- | --- | --- |
Plan an operation for a workplace.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 176 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Tables
| Table             | Key field  | Description                   |     |
| ----------------- | ---------- | ----------------------------- | --- |
| auftrags_bestand  | ANR.ANR    | PK  Combined order/OP number  |     |
BAPI call
| ID         | Content / {type}  | Description                            |     |
| ---------- | ----------------- | -------------------------------------- | --- |
| DLG        | ANR.EINPLANEN     | Plan operation                         |     |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                   |     |
| ANR.ANR    | {C40}             | Combined order/OP number               |     |
| ANR.MNR    | {C8}              | Workplace                              |     |
| BEARB      | {C10}             | Modified by                            |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 90  | Machine is not available  |     |     |
| --- | ------------------------- | --- | --- |
ANR.MNR is not specified
| 1658  | No cost center authorization for machine  |     |     |
| ----- | ----------------------------------------- | --- | --- |
| 1666  | Object is locked                          |     |     |
BEARB
| 7.4.4  | Deallocate operation (ANR.AUSPLANEN)  |     |     |
| ------ | ------------------------------------- | --- | --- |
Deallocate an operation from a workplace
Tables
| Table             | Key field  | Description                   |     |
| ----------------- | ---------- | ----------------------------- | --- |
| auftrags_bestand  | ANR.ANR    | PK  Combined order/OP number  |     |
| …                 |            |                               |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 177 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| ID         | Content / {type}  | Description                            |     |
| ---------- | ----------------- | -------------------------------------- | --- |
| DLG        | ANR.AUSPLANEN     | Deallocate operation                   |     |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                   |     |
| ANR.ANR    | {C40}             | Combined order/OP number               |     |
| ANR.MGRP   | {C8}              | Group                                  |     |
| BEARB      | {C10}             | Modified by                            |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1658  | No cost center authorization for group  |     |     |
| ----- | --------------------------------------- | --- | --- |
| 1666  | Object is locked                        |     |     |
BEARB
| 7.4.5  | Block operation (ANR.SPERREN)  |     |     |
| ------ | ------------------------------ | --- | --- |
Block the data collection for an operation
Tables
| Table             | Key field  | Description                   |     |
| ----------------- | ---------- | ----------------------------- | --- |
| auftrags_bestand  | ANR.ANR    | PK  Combined order/OP number  |     |
| …                 |            |                               |     |
BAPI call
| ID        | Content / {type}  | Description               |     |
| --------- | ----------------- | ------------------------- | --- |
| DLG       | ANR.SPERREN       | Block operation           |     |
| ANR.ATYP  | {C4}              | Order type {AG} (OP)      |     |
| ANR.ANR   | {C40}             | Combined order/OP number  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 178 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ANR.TABLE  | {C1}  | A – Backlog of orders (default value)  |     |
| ---------- | ----- | -------------------------------------- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked    |     |     |
| ----- | ------------------- | --- | --- |
| 101   | No data available!  |     |     |
ANR.ANR is not available
| 7.4.6  | Unlock operation (ANR.ENTSPERREN)  |     |     |
| ------ | ---------------------------------- | --- | --- |
Unlock an operation that is blocked for data collection.
Tables
| Table             | Key field  | Description                   |     |
| ----------------- | ---------- | ----------------------------- | --- |
| auftrags_bestand  | ANR.ANR    | PK  Combined order/OP number  |     |
| …                 |            |                               |     |
BAPI call
| ID         | Content / {type}  | Description                            |     |
| ---------- | ----------------- | -------------------------------------- | --- |
| DLG        | ANR.ENTSPERREN    | Unlock operation                       |     |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                   |     |
| ANR.ANR    | {C40}             | Combined order/OP number               |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked    |     |     |
| ----- | ------------------- | --- | --- |
| 101   | No data available!  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 179 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

ANR.ANR is not available

| 7.4.7  | Update operation (ANR.AKTUALISIEREN)  |     |     |
| ------ | ------------------------------------- | --- | --- |
Tables
| Table             | Key field  | Description       |     |
| ----------------- | ---------- | ----------------- | --- |
| auftrags_bestand  | ANR.AUNR   | PK  Order number  |     |
| …                 |            |                   |     |
BAPI call
| ID         | Content / {type}   | Description                            |     |
| ---------- | ------------------ | -------------------------------------- | --- |
| DLG        | ANR.AKTUALISIEREN  | Update order                           |     |
| ANR.ATYP   | {C4}               | Order type {AU}                        |     |
| ANR.AUNR   | {C40}              | Order number                           |     |
| ANR.TABLE  | {C1}               | A – Backlog of orders (default value)  |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 101  | No data available!  |     |     |
| ---- | ------------------- | --- | --- |
ANR.AUNR is not available

| 7.4.8  | Release operation (ANR.FREIGEBEN)  |     |     |
| ------ | ---------------------------------- | --- | --- |
Set the operation status to "Prepared".
Tables
| Table             | Key field  | Description                   |     |
| ----------------- | ---------- | ----------------------------- | --- |
| auftrags_bestand  | ANR.ANR    | PK  Combined order/OP number  |     |
| …                 |            |                               |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 180 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| ID         | Content / {type}  | Description                            |     |
| ---------- | ----------------- | -------------------------------------- | --- |
| DLG        | ANR.ENTSPERREN    | Unlock operation                       |     |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                   |     |
| ANR.ANR    | {C40}             | Combined order/OP number               |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked    |     |     |
| ----- | ------------------- | --- | --- |
| 101   | No data available!  |     |     |
ANR.ANR is not available

| 7.4.9  | Change order status (ANR.SETSTATUS)  |     |     |
| ------ | ------------------------------------ | --- | --- |
Change order status
Tables
| Table             | Key field  | Description       |     |
| ----------------- | ---------- | ----------------- | --- |
| auftrags_bestand  | ANR.AUNR   | PK  Order number  |     |
| …                 |            |                   |     |
BAPI call
| ID         | Content / {type}  | Description                            |     |
| ---------- | ----------------- | -------------------------------------- | --- |
| DLG        | ANR.SETSTATUS     | Change order status                    |     |
| ANR.ATYP   | {C4}              | AU – Type                              |     |
| ANR.AUNR   | {C40}             | Order number                           |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |
| MOD        | {C1}              | S  Sest status                        |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 181 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

E  Finish order
R  Reactivate order
ANR.OPT:PKENN  {C2}  alternat Production ID of the new status
ive
with MOD=S

only "E" is permitted
| ANR.AST  | {C2}  |     | New status  |     |
| -------- | ----- | --- | ----------- | --- |
with MOD=S

only status with production identifier = "E" is
permitted
Plausibility checks
| Error codes  | Description        |     |     |     |
| ------------ | ------------------ | --- | --- | --- |
| 1661         | Missing parameter  |     |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked    |     |     |     |
| ----- | ------------------- | --- | --- | --- |
| 101   | No data available!  |     |     |     |
ANR.AUNR is not available
| 2026  | Order is still running      |     |     |     |
| ----- | --------------------------- | --- | --- | --- |
| 712   | Processing mode is invalid  |     |     |     |
if MOD <> 'S'
Processing notes
Reactivate (MOD=R):
If you reactivate the order header, ALL operations of the order are reactivated.
The status of the order header is set as follows:
| - Status V if no OP of the order has been started  |     |     |     |     |
| -------------------------------------------------- | --- | --- | --- | --- |
- otherwise status L
"Finish order" (MOD=E):
If you finish the order header, ALL operations of the order are finished.
| 7.4.10  | Change operation status (ANR.SETSTATUS)  |     |     |     |
| ------- | ---------------------------------------- | --- | --- | --- |
Change operation status

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 182 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

Tables
| Table             | Key field  | Description  |                           |     |
| ----------------- | ---------- | ------------ | ------------------------- | --- |
| auftrags_bestand  | ANR.ANR    | PK           | Combined order/OP number  |     |
| …                 |            |              |                           |     |
BAPI call
| ID         | Content / {type}  | Description                            |     |     |
| ---------- | ----------------- | -------------------------------------- | --- | --- |
| DLG        | ANR.SETSTATUS     | Change order status                    |     |     |
| ANR.ATYP   | {C4}              | OP – Type                              |     |     |
| ANR.ANR    | {C40}             | MES order number                       |     |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |     |
MOD  {C1}  S  Set status/secondary status/resource status for the
operation
E  Finish operation
R  Reactivate operation
| MOD:2  | {C1}  | R  Set resource status for the operation  |     |     |
| ------ | ----- | ------------------------------------------ | --- | --- |
With MOD=S; ANR.STATUSTYP must not be set
| ANR.STATUSTYP  | {C1}  | S  Set secondary status  |     |     |
| -------------- | ----- | ------------------------- | --- | --- |
With MOD=S; MOD2 must not be set
ANR.OPT:PKENN  {C2}  Other  Control indicator of the new status
option
with MOD=S
| ANR.AST  | {C2}  |     | New status with MOD=S  |     |
| -------- | ----- | --- | ---------------------- | --- |
  You may only set statuses with control
indicator=S.
New secodary status with MOD=S and
ANR.STATUSTYP=S
The statuses must be configured in the system.
| ANR.RESSTA:1  | {C2}  | New resource status "Person OK"  |     |     |
| ------------- | ----- | -------------------------------- | --- | --- |
With MOD=S and MOD2:R
| ANR.RESSTA:2  | {C2}  | New resource status "Tool OK"  |     |     |
| ------------- | ----- | ------------------------------ | --- | --- |
With MOD=S and MOD2:R
| ANR.RESSTA:3  | {C2}  | New resource status "Material OK"  |     |     |
| ------------- | ----- | ---------------------------------- | --- | --- |
With MOD=S and MOD2:R

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 183 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked    |     |     |
| ----- | ------------------- | --- | --- |
| 101   | No data available!  |     |     |
ANR.ANR is not available
| 2026  | Order is still running                             |     |     |
| ----- | -------------------------------------------------- | --- | --- |
| 2807  | Status cannot be changed, as sequence is inactive  |     |     |

Examples
Set operation to the status with control indicator V
DLG=ANR.SETSTATUS|ANR.ATYP=AG|ANR.ANR=S30002000700|MOD=S|ANR.OPT:PKENN=V|BEA
RB=12345|DAT=08/31/2018|ZEI=80806|
Finish operation
DLG=ANR.SETSTATUS|ANR.ATYP=AG|ANR.ANR=S30002000700|MOD=E|BEARB=12345|DAT=08/31
/2018|ZEI=81180|
Set secondary status
DLG=ANR.SETSTATUS|ANR.ATYP=AG|ANR.ANR=S30002000700|MOD=S|ANR.STATUSTYP=S|ANR.
AST=801|BEARB=12345|DAT=08/31/2018|ZEI=80632|
Set resource status
DLG=ANR.SETSTATUS|ANR.ATYP=AG|ANR.ANR=S30002000700|MOD=S|MOD:2=R|ANR.RESSTA:1
=OK|ANR.RESSTA:2=OK|ANR.RESSTA:3=OK|BEARB=12345|DAT=08/31/2018|ZEI=80740|
Reactivate operation
DLG=ANR.SETSTATUS|ANR.ATYP=AG|ANR.ANR=S30002000700|MOD=R|BEARB=12345|DAT=08/31
/2018|ZEI=81180|
| 7.4.11  | Create order (ANR.INSERT)  |     |     |
| ------- | -------------------------- | --- | --- |
Order (ANR.TABLE=A)
Work plan (ANR.TABLE=P)
Template (ANR.TABLE=P)
Tables (ANR.TABLE=A)
| Table             | Key field  | Description       |     |
| ----------------- | ---------- | ----------------- | --- |
| auftrags_bestand  | ANR.AUNR   | PK  Order number  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 184 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| auftrags_leistung  | ANR.AUNR     |     |     |
| ------------------ | ------------ | --- | --- |
| auftrag_status     | ANR.AUNR     |     |     |
| auftrags_zusatz    | ANR.VERWEIS  |     |     |
Tables (ANR.TABLE=P)
| Table             | Key field    | Description       |     |
| ----------------- | ------------ | ----------------- | --- |
| arbplan_bestand   | ANR.AUNR     | PK  Order number  |     |
| arbplan_leistung  | ANR.AUNR     |                   |     |
| arbplan_zusatz    | ANR.VERWEIS  |                   |     |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |
BAPI call
| ID         | Content / {type}  | Description                                             |     |
| ---------- | ----------------- | ------------------------------------------------------- | --- |
| DLG        | ANR.INSERT        | Create order                                            |     |
| ANR.ATYP   | {C4}              | Order type {AU}                                         |     |
| ANR.AUNR   | {C40}             | Order number                                            |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)                   |     |
| ANR.AUART  | {C5}              | Order type                                              |     |
| …          |                   | For further fields, refer to the documentation HYD-HDB  |     |
that includes the above listed tables
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| AUNR       | {C40}  Order number                        |     |     |
| ---------- | ------------------------------------------ | --- | --- |
| AST        | {C5}  Status                               |     |     |
| OPT:PKENN  | {C2}  Control characteristic "production"  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 185 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| TABLE  | {C1}    |     |     |
| ------ | ------- | --- | --- |
| ATYP   | {C4}    |     |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1669  | Data is already available  |     |     |
| ----- | -------------------------- | --- | --- |
 ANR.AUNR is already available
| 2812  | Order is already available in the archive  |     |     |
| ----- | ------------------------------------------ | --- | --- |
| 50    | Order status is not available              |     |     |
 ANR.AUART is not specified

| 7.4.12  | Edit order (ANR.UPDATE)  |     |     |
| ------- | ------------------------ | --- | --- |
Order (ANR.TABLE=A)
Work plan (ANR.TABLE=P)
Template (ANR.TABLE=P)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description       |     |
| ------------------ | ------------ | ----------------- | --- |
| auftrags_bestand   | ANR.AUNR     | PK  Order number  |     |
| auftrags_leistung  | ANR.AUNR     |                   |     |
| auftrag_status     | ANR.AUNR     |                   |     |
| auftrags_zusatz    | ANR.VERWEIS  |                   |     |
Tables (ANR.TABLE=P)
| Table             | Key field  | Description       |     |
| ----------------- | ---------- | ----------------- | --- |
| arbplan_bestand   | ANR.AUNR   | PK  Order number  |     |
| arbplan_leistung  | ANR.AUNR   |                   |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 186 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| arbplan_zusatz  | ANR.VERWEIS  |     |     |
| --------------- | ------------ | --- | --- |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |
BAPI call
| ID         | Content / {type}  | Description                                             |     |
| ---------- | ----------------- | ------------------------------------------------------- | --- |
| DLG        | ANR.UPDATE        | Edit order                                              |     |
| ANR.ATYP   | {C4}              | Order type {AU}                                         |     |
| ANR.AUNR   | {C40}             | Order number                                            |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)                   |     |
| …          |                   | For further fields, refer to the documentation HYD-HDB  |     |
that includes the above listed tables
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| *   |   All attributes of the order  |     |     |
| --- | ------------------------------ | --- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked    |     |     |
| ----- | ------------------- | --- | --- |
| 101   | No data available.  |     |     |
ANR.AUNR is not available.
| 1803  | No responsibility area authorization  |     |     |
| ----- | ------------------------------------- | --- | --- |
| 50    | Order status is not available         |     |     |
| 900   | Unit is not available                 |     |     |
2809  Order type cannot be changed because order has started

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 187 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| Error codes  | Description                                        |     |     |
| ------------ | -------------------------------------------------- | --- | --- |
| 3241         | User field key is not defined                      |     |     |
| 1989         | Maximum number of orders is exceeded for priority  |     |     |
The maximum number of orders is exceeded for priority when using the priority
management

| 7.4.13  | Copy order (ANR.COPY)  |     |     |
| ------- | ---------------------- | --- | --- |
Order (ANR.TABLE=A)
Work plan (ANR.TABLE=P)
Template (ANR.TABLE=P)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description       |     |
| ------------------ | ------------ | ----------------- | --- |
| auftrags_bestand   | ANR.AUNR     | PK  Order number  |     |
| auftrags_leistung  | ANR.AUNR     |                   |     |
| auftrag_status     | ANR.AUNR     |                   |     |
| auftrags_zusatz    | ANR.VERWEIS  |                   |     |
Tables (ANR.TABLE=P)
| Table             | Key field    | Description       |     |
| ----------------- | ------------ | ----------------- | --- |
| arbplan_bestand   | ANR.AUNR     | PK  Order number  |     |
| arbplan_leistung  | ANR.AUNR     |                   |     |
| arbplan_zusatz    | ANR.VERWEIS  |                   |     |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 188 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| ID           | Content / {type}  | Description                            |     |
| ------------ | ----------------- | -------------------------------------- | --- |
| DLG          | ANR.COPY          | Copy order                             |     |
| ANR.ATYP     | {C4}              | Order type {AU}                        |     |
| ANR.AUNR     | {C40}             | Order number                           |     |
| ANR.TABLE    | {C1}              | A – Backlog of orders (default value)  |     |
| ANR.TABLE:Z  | {C1}              | Target type:                           |     |
A – Order
P – Work plan
| ANR.AUNR:Z  | {C40}  | New order number                                        |     |
| ----------- | ------ | ------------------------------------------------------- | --- |
| …           |        | For further fields, refer to the documentation HYD-HDB  |     |
that includes the above listed tables
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| ANR  |   Order number of the new order  |     |     |
| ---- | -------------------------------- | --- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked           |     |     |
| ----- | -------------------------- | --- | --- |
| 1669  | Data is already available  |     |     |
 ANR.AUNR is already available
| 2812  | Order is already available in the archive  |     |     |
| ----- | ------------------------------------------ | --- | --- |
| 1855  | Target data record is already available    |     |     |
| 900   | Unit is not available                      |     |     |
| 1997  | Order type is not equal                    |     |     |
If you copy an order, the order types of the source and the target order must be
identical.
| 1998  | Order template is not available  |     |     |
| ----- | -------------------------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 189 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Notes on the processing
Copying a complete order:
If you copy a complete order, all values specified in the dialog data string are passed for ALL operations!
| 7.4.14  | Delete order (ANR.DELETE)  |     |     |
| ------- | -------------------------- | --- | --- |
Order (ANR.TABLE=A)
Work plan (ANR.TABLE=P)
Template (ANR.TABLE=P)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description       |     |
| ------------------ | ------------ | ----------------- | --- |
| auftrags_bestand   | ANR.AUNR     | PK  Order number  |     |
| auftrags_leistung  | ANR.AUNR     |                   |     |
| auftrag_status     | ANR.AUNR     |                   |     |
| auftrags_zusatz    | ANR.VERWEIS  |                   |     |
Tables (ANR.TABLE=P)
| Table             | Key field    | Description       |     |
| ----------------- | ------------ | ----------------- | --- |
| arbplan_bestand   | ANR.AUNR     | PK  Order number  |     |
| arbplan_leistung  | ANR.AUNR     |                   |     |
| arbplan_zusatz    | ANR.VERWEIS  |                   |     |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |
BAPI call
| ID   | Content / {type}  | Description   |     |
| ---- | ----------------- | ------------- | --- |
| DLG  | ANR.DELETE        | Delete order  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 190 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ANR.ATYP   | {C4}   | Order type {AU}                        |     |
| ---------- | ------ | -------------------------------------- | --- |
| ANR.AUNR   | {C40}  | Order number                           |     |
| ANR.TABLE  | {C1}   | A – Backlog of orders (default value)  |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked    |     |     |
| ----- | ------------------- | --- | --- |
| 101   | No data available.  |     |     |
ANR.AUNR is not available.
| 1803  | No responsibility area authorization  |     |     |
| ----- | ------------------------------------- | --- | --- |
| 1990  | Order header must not be deleted      |     |     |

| 7.4.15  | Select order (ANR.SELECT)  |     |     |
| ------- | -------------------------- | --- | --- |
Order (ANR.TABLE=A)
Work plan (ANR.TABLE=P)
Template (ANR.TABLE=P)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description       |     |
| ------------------ | ------------ | ----------------- | --- |
| auftrags_bestand   | ANR.AUNR     | PK  Order number  |     |
| auftrags_leistung  | ANR.AUNR     |                   |     |
| auftrag_status     | ANR.AUNR     |                   |     |
| auftrags_zusatz    | ANR.VERWEIS  |                   |     |
Tables (ANR.TABLE=P)
| Table             | Key field  | Description       |     |
| ----------------- | ---------- | ----------------- | --- |
| arbplan_bestand   | ANR.AUNR   | PK  Order number  |     |
| arbplan_leistung  | ANR.AUNR   |                   |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 191 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| arbplan_zusatz  | ANR.VERWEIS  |     |     |
| --------------- | ------------ | --- | --- |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |
BAPI call
| ID          | Content / {type}  | Description                            |     |
| ----------- | ----------------- | -------------------------------------- | --- |
| DLG         | ANR.SELECT        | Select order                           |     |
| ANR.ATYP    | {C4}              | Order type {AU}                        |     |
| ANR.AUNR    | {C40}             | Order number                           |     |
| ANR.TABLE   | {C1}              | A – Backlog of orders (default value)  |     |
| ANR.ARCHIV  | {C1}              | The archive is used                    |     |
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| *   |   All attributes of the order  |     |     |
| --- | ------------------------------ | --- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 101  | No data available.  |     |     |
| ---- | ------------------- | --- | --- |
ANR.AUNR is not available.

| 7.4.16  | Order – Select all operations (ANR.LIST)  |     |     |
| ------- | ----------------------------------------- | --- | --- |
Order (ANR.TABLE=A)
Work plan (ANR.TABLE=P)
Template (ANR.TABLE=P)

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 192 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Tables (ANR.TABLE=A)
| Table              | Key field    | Description       |     |
| ------------------ | ------------ | ----------------- | --- |
| auftrags_bestand   | ANR.AUNR     | PK  Order number  |     |
| auftrags_leistung  | ANR.AUNR     |                   |     |
| auftrag_status     | ANR.AUNR     |                   |     |
| auftrags_zusatz    | ANR.VERWEIS  |                   |     |
Tables (ANR.TABLE=P)
| Table             | Key field    | Description       |     |
| ----------------- | ------------ | ----------------- | --- |
| arbplan_bestand   | ANR.AUNR     | PK  Order number  |     |
| arbplan_leistung  | ANR.AUNR     |                   |     |
| arbplan_zusatz    | ANR.VERWEIS  |                   |     |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |
BAPI call
| ID          | Content / {type}  | Description                            |     |
| ----------- | ----------------- | -------------------------------------- | --- |
| DLG         | ANR.LIST          | Select all operations of the order     |     |
| ANR.ATYP    | {C4}              | Order type {AU}                        |     |
| ANR.AUNR    | {C40}             | Order number                           |     |
| ANR.TABLE   | {C1}              | A – Backlog of orders (default value)  |     |
| ANR.ARCHIV  | {C1}              | The archive is used                    |     |
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
*    List including all operations and all attributes of the operations

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 193 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 101  | No data available.  |     |     |
| ---- | ------------------- | --- | --- |
ANR.AUNR is not available.

| 7.4.17  | Create operation (ANR.INSERT)  |     |     |
| ------- | ------------------------------ | --- | --- |
Operation (ANR.TABLE=A)
| Work plan-operation (ANR.TABLE=P)  |     |     |     |
| ---------------------------------- | --- | --- | --- |
Template-operation (ANR.TABLE=P)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description                   |     |
| ------------------ | ------------ | ----------------------------- | --- |
| auftrags_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| auftrags_leistung  | ANR.ANR      |                               |     |
| auftrag_status     | ANR.ANR      |                               |     |
| auftrags_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
| Table             | Key field    | Description                   |     |
| ----------------- | ------------ | ----------------------------- | --- |
| arbplan_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| arbplan_leistung  | ANR.ANR      |                               |     |
| arbplan_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 194 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| ID         | Content / {type}  | Description                            |     |
| ---------- | ----------------- | -------------------------------------- | --- |
| DLG        | ANR.INSERT        | Create operation                       |     |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                   |     |
| ANR.ANR    | {C40}             | Combined order/OP number               |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |
| ANR.MNR    | {C8}              | Workplace                              |     |
| ANR.MGRP   | {C8}              | Group                                  |     |
One of the two values must be specified
| …   |     | For further fields, refer to the documentation HYD-HDB  |     |
| --- | --- | ------------------------------------------------------- | --- |
that includes the above listed tables
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| ANR        | {C40}  Combined order/OP number            |     |     |
| ---------- | ------------------------------------------ | --- | --- |
| AUNR       | {C40}  Order number                        |     |     |
| AGNR       | {C40}  OP number                           |     |     |
| AFOLG      | {C40}  Sequence number                     |     |     |
| UAGNR      | {C40}  Suboperation number                 |     |     |
| SPLNR      | {C40}  Split No.                           |     |     |
| TABLE      | {C1}                                       |     |     |
| ATYP       | {C4}  Order type {AG} (OP)                 |     |     |
| AUART      | {C5}  Order type                           |     |     |
| AST        | {C2}  Status                               |     |     |
| OPT:PKENN  | {C2}  Control characteristic "production"  |     |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 195 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 1669  | Data is already available  |     |     |
| ----- | -------------------------- | --- | --- |
 ANR.ANR is already available
| 2812  | Order is already available in the archive  |     |     |
| ----- | ------------------------------------------ | --- | --- |
| 94    | OP  Machine group is not available        |     |     |

| 7.4.18  | Edit operation (ANR.UPDATE)  |     |     |
| ------- | ---------------------------- | --- | --- |
Operation (ANR.TABLE=A)
| Work plan-operation (ANR.TABLE=P)  |     |     |     |
| ---------------------------------- | --- | --- | --- |
Template-operation (ANR.TABLE=P)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description                   |     |
| ------------------ | ------------ | ----------------------------- | --- |
| auftrags_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| auftrags_leistung  | ANR.ANR      |                               |     |
| auftrag_status     | ANR.ANR      |                               |     |
| auftrags_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
| Table             | Key field    | Description                   |     |
| ----------------- | ------------ | ----------------------------- | --- |
| arbplan_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| arbplan_leistung  | ANR.ANR      |                               |     |
| arbplan_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |
BAPI call
| ID   | Content / {type}  | Description     |     |
| ---- | ----------------- | --------------- | --- |
| DLG  | ANR.UPDATE        | Edit operation  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 196 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ID         | Content / {type}  | Description                                             |     |
| ---------- | ----------------- | ------------------------------------------------------- | --- |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                                    |     |
| ANR.ANR    | {C40}             | Combined order/OP number                                |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)                   |     |
| …          |                   | For further fields, refer to the documentation HYD-HDB  |     |
that includes the above listed tables
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| *   |   All attributes of the order  |     |     |
| --- | ------------------------------ | --- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked    |     |     |
| ----- | ------------------- | --- | --- |
| 101   | No data available.  |     |     |
ANR.ANR is not available.
| 1803  | No responsibility area authorization  |     |     |
| ----- | ------------------------------------- | --- | --- |
| 50    | Order status is not available         |     |     |
| 900   | Unit is not available                 |     |     |
2809  Order type cannot be changed because order has started
| 3241  | User field key is not defined                      |     |     |
| ----- | -------------------------------------------------- | --- | --- |
| 1989  | Maximum number of orders is exceeded for priority  |     |     |
The maximum number of orders is exceeded for priority when using the priority
management
| 911   | Processing code is not available         |     |     |
| ----- | ---------------------------------------- | --- | --- |
| 94    | Machine group ######## is not available  |     |     |
| 2808  | Start date is after end date             |     |     |
| 2813  | Activity code is not defined             |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 197 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 7.4.19  | Copy operation (ANR.COPY)  |     |     |
| ------- | -------------------------- | --- | --- |
Operation (ANR.TABLE=A)
| Work plan-operation (ANR.TABLE=P)  |     |     |     |
| ---------------------------------- | --- | --- | --- |
Template-operation (ANR.TABLE=P)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description                   |     |
| ------------------ | ------------ | ----------------------------- | --- |
| auftrags_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| auftrags_leistung  | ANR.ANR      |                               |     |
| auftrag_status     | ANR.ANR      |                               |     |
| auftrags_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
| Table             | Key field    | Description                   |     |
| ----------------- | ------------ | ----------------------------- | --- |
| arbplan_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| arbplan_leistung  | ANR.ANR      |                               |     |
| arbplan_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |
BAPI call
| ID           | Content / {type}  | Description                            |     |
| ------------ | ----------------- | -------------------------------------- | --- |
| DLG          | ANR.COPY          | Copy order                             |     |
| ANR.ATYP     | {C4}              | Order type {AG} (OP)                   |     |
| ANR.ANR      | {C40}             | Combined order/OP number               |     |
| ANR.TABLE    | {C1}              | A – Backlog of orders (default value)  |     |
| ANR.TABLE:Z  | {C1}              | Target type:                           |     |
A – Order

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 198 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ID  | Content / {type}  | Description  |     |
| --- | ----------------- | ------------ | --- |
P – Work plan
| ANR.ANR:Z  | {C40}  | New combined order/OP number                            |     |
| ---------- | ------ | ------------------------------------------------------- | --- |
| …          |        | For further fields, refer to the documentation HYD-HDB  |     |
that includes the above listed tables
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| ANR  |   New combined order/OP number  |     |     |
| ---- | ------------------------------- | --- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked           |     |     |
| ----- | -------------------------- | --- | --- |
| 1669  | Data is already available  |     |     |
 ANR.ANR is already available
| 2812  | Order is already available in the archive  |     |     |
| ----- | ------------------------------------------ | --- | --- |
| 1855  | Target data record is already available    |     |     |
| 900   | Unit is not available                      |     |     |
| 1997  | Order type is not equal                    |     |     |
If you copy an order, the order types of the source and the target order must be
identical.
| 1998  | Order template is not available  |     |     |
| ----- | -------------------------------- | --- | --- |

| 7.4.20  | Delete operation (ANR.DELETE)  |     |     |
| ------- | ------------------------------ | --- | --- |
Operation (ANR.TABLE=A)
| Work plan-operation (ANR.TABLE=P)  |     |     |     |
| ---------------------------------- | --- | --- | --- |
Template-operation (ANR.TABLE=P)

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 199 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Tables (ANR.TABLE=A)
| Table              | Key field    | Description                   |     |
| ------------------ | ------------ | ----------------------------- | --- |
| auftrags_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| auftrags_leistung  | ANR.ANR      |                               |     |
| auftrag_status     | ANR.ANR      |                               |     |
| auftrags_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
| Table             | Key field    | Description                   |     |
| ----------------- | ------------ | ----------------------------- | --- |
| arbplan_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| arbplan_leistung  | ANR.ANR      |                               |     |
| arbplan_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |
BAPI call
| ID         | Content / {type}  | Description                            |     |
| ---------- | ----------------- | -------------------------------------- | --- |
| DLG        | ANR.DELETE        | Delete operation                       |     |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                   |     |
| ANR.ANR    | {C40}             | Combined order/OP number               |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1666  | Object is locked  |     |     |
| ----- | ----------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 200 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 101  | No data available.  |     |     |
| ---- | ------------------- | --- | --- |
ANR.ANR is not available.
| 1803  | No responsibility area authorization  |     |     |
| ----- | ------------------------------------- | --- | --- |
| 1986  | Operation cannot be deleted           |     |     |

| 7.4.21  | Select operation (ANR.SELECT)  |     |     |
| ------- | ------------------------------ | --- | --- |
Operation (ANR.TABLE=A)
| Work plan-operation (ANR.TABLE=P)  |     |     |     |
| ---------------------------------- | --- | --- | --- |
Template-operation (ANR.TABLE=P)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description                   |     |
| ------------------ | ------------ | ----------------------------- | --- |
| auftrags_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| auftrags_leistung  | ANR.ANR      |                               |     |
| auftrag_status     | ANR.ANR      |                               |     |
| auftrags_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
| Table             | Key field    | Description                   |     |
| ----------------- | ------------ | ----------------------------- | --- |
| arbplan_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| arbplan_leistung  | ANR.ANR      |                               |     |
| arbplan_zusatz    | ANR.VERWEIS  |                               |     |
Tables (ANR.TABLE=P)
If the entry in arbplan_bestand is a template, a respective entry in the table arbplan_verwalt must exist.
| Table            | Key field   | Description           |     |
| ---------------- | ----------- | --------------------- | --- |
| arbplan_verwalt  | APVRW.APNR  | PK  Work plan number  |     |
BAPI call
| ID   | Content / {type}  | Description       |     |
| ---- | ----------------- | ----------------- | --- |
| DLG  | ANR.SELECT        | Select operation  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 201 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ANR.ATYP    | {C4}   | Order type {AG} (OP)                   |     |
| ----------- | ------ | -------------------------------------- | --- |
| ANR.ANR     | {C40}  | Combined order/OP number               |     |
| ANR.TABLE   | {C1}   | A – Backlog of orders (default value)  |     |
| ANR.ARCHIV  | {C1}   | The archive is used                    |     |
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| *   |   All attributes of the order  |     |     |
| --- | ------------------------------ | --- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 101  | No data available.  |     |     |
| ---- | ------------------- | --- | --- |
ANR.ANR is not available.

| 7.4.22  | Split operation (ANR.SPLITCREATE)  |     |     |
| ------- | ---------------------------------- | --- | --- |
Operation (ANR.TABLE=A)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description                   |     |
| ------------------ | ------------ | ----------------------------- | --- |
| auftrags_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| auftrags_leistung  | ANR.ANR      |                               |     |
| auftrag_status     | ANR.ANR      |                               |     |
| auftrags_zusatz    | ANR.VERWEIS  |                               |     |
BAPI call
| ID   | Content / {type}  | Description      |     |
| ---- | ----------------- | ---------------- | --- |
| DLG  | ANR.SPLITCREAT    | Split operation  |     |
E

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 202 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ANR.ATYP      | {C4}   | Order type {AG} (OP)                   |     |
| ------------- | ------ | -------------------------------------- | --- |
| ANR.TABLE     | {C1}   | A – Backlog of orders (default value)  |     |
| ANR.ANR       | {C40}  | Combined order/OP number               |     |
| ANR.ANZSPLIT  | {N8}   | Number of splits                       |     |
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| ANR.MAXANZSPLIT  | {N8}  Maximum split number of operation  |     |     |
| ---------------- | ---------------------------------------- | --- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 101   | No data available!             |     |     |
| ----- | ------------------------------ | --- | --- |
| 1859  | OP must not be a split master  |     |     |
This operation is a so-called "split master", i.e. it is an operation that has been split
up into several operations.
| 1860  | OP must not be OP of a split OP                       |     |     |
| ----- | ----------------------------------------------------- | --- | --- |
| 1862  | OP must not be OP of a merged OP                      |     |     |
| 1867  | The OP may not be split.                              |     |     |
| 1868  | Maximum number of splits of the OP has been exceeded  |     |     |
The OP that you want to split exceeds the maximum number of splits specified for
the operation.
| 1869  | The maximum number of slits has been exceeded.  |     |     |
| ----- | ----------------------------------------------- | --- | --- |
| 30    | Order is finished                               |     |     |
| 20    | Order is running                                |     |     |
| 85    | OP is locked                                    |     |     |
| 80    | invalid OP status                               |     |     |
| 31    | Order is interrupted                            |     |     |
| 1666  | Object is locked                                |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 203 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
BEARB
| 7.4.23  | Cancel operation split (ANR.SPLITDELETE)  |     |     |
| ------- | ----------------------------------------- | --- | --- |
Operation (ANR.TABLE=A)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description                   |     |
| ------------------ | ------------ | ----------------------------- | --- |
| auftrags_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| auftrags_leistung  | ANR.ANR      |                               |     |
| auftrag_status     | ANR.ANR      |                               |     |
| auftrags_zusatz    | ANR.VERWEIS  |                               |     |
BAPI call
| ID         | Content / {type}  | Description                              |     |
| ---------- | ----------------- | ---------------------------------------- | --- |
| DLG        | ANR.SPLITDELETE   | Cancel operation split                   |     |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                     |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)    |     |
| ANR.ANR    | {C40}             | Combined order/OP number + split number  |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 101  | No data available!  |     |     |
| ---- | ------------------- | --- | --- |
| 20   | Order is running    |     |     |
|      |                     |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 204 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| 7.4.24  | Enhanced operation split (ANR.ADVSPLITCREATE)  |     |     |     |     |
| ------- | ---------------------------------------------- | --- | --- | --- | --- |
Requirements
  If you want to use the split function via PDM interface, you must configure the enhanced split
function in HYDRA.
Table
| Table             | Key field  | Description                   |     |     |     |
| ----------------- | ---------- | ----------------------------- | --- | --- | --- |
| auftrags_bestand  | ANR.ANR    | PK  Combined order/OP number  |     |     |     |
| auftrag_status    | ANR.ANR    |                               |     |     |     |
BAPI call
| ID   | Content / {type}  | Description              |     |     |     |
| ---- | ----------------- | ------------------------ | --- | --- | --- |
| DLG  | ANR.ADVSPLITCR    | Enhanced split function  |     |     |     |
EATE
ANR.SPL  Operation (ANR)   The operation to be split (complete operation number).
|     |     |   An OP that is configured as OP that may be split  |                     |                |            |
| --- | --- | ---------------------------------------------------- | ------------------- | -------------- | ---------- |
|     |     |   Or                                                | an  already  split  | OP  (complete  | operation  |
number incl. split)
| SPL:MOD           | PDM  | Mode for the PDM interface  |     |     |     |
| ----------------- | ---- | --------------------------- | --- | --- | --- |
| SPL:DIFFQUANTITY  | J/N  | Default = J:                |     |     |     |
Relevant only if you create splits using the master
OP (OP has not yet been split).
Automatically creates a further split using the difference
quantity. I.e. one additional split is created compared to
the number specified in the IDs SPL.EGRGUTP:X,… To
create a split using the difference quantity, the sum total
of the target quantities of all splits to be created must be
smaller than the target quantity of the master OP.
| ANR.OPT:SPL_EGR | J/N  | Default = J:   |     |     |     |
| --------------- | ---- | -------------- | --- | --- | --- |
_UPD  Relevant if a split is split up a further time (MOC client
function "Offset target quantity of the split OP"). The
target quantity of an OP (here it is already a split), which
is to be split, is reduced respectively.
ANR.OPT:PLAN  M/G  Splits planned for machine or group. If not specified, the

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 205 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

ID  Content / {type}  Description
value of the OP to be split (master OP or split) is taken
over.
SPL.EGRGUTP:X  Primary  target  Target quantity (primary quantity) of the individual split.
quantity  included  in  (X) stands for continuous numbers from 1...99
the split that is to be
created
SPL.RUEZ:X  Duration in seconds  Setup  time  of  the  individual  split.  (X)  stands  for
continuous numbers from 1...99, if not specified (ID is
not included) the setup time of the OP is used that has
been split.

BEARB  Modified by
(Example: 09/24/2014)
DAT  Date
| ZEIT   | Time  in  | seconds    |     |
| ------ | --------- | ---------- | --- |
since midnight.
Note
X in the IDs of the above table must be replaced successively with 1...99 for each split to be created. The
ANR-BAPI automatically assigns the split numbers. For example, if an OP that has already been split up
is split a new time, the split numbers are already assigned. The BAPI then automatically searches for the
next free split number. If an ascending number is not assigned, the processing ends (e.g. in the string that
follows,  only  the  first  two  splits  are  created).  ...|SPL.EGRGUTP:1=10|SPL.EGRGUTP:2=20|
SPL.EGRGUTP:5=50|… )
Plausibility checks
| Error codes  | Description           |     |     |
| ------------ | --------------------- | --- | --- |
| 10           | Order not available   |     |     |
| 1859         | No split possibility  |     |     |
OP must not be a split master
| 1971  | Split number < Minimum  |     |     |
| ----- | ----------------------- | --- | --- |
below min. number of splits
| 424  | Split function is not active  |     |     |
| ---- | ----------------------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 206 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Examples:
Split operation (use setup time of the master, no split with the difference quantity
is created):
DLG=ANR.ADVSPLITCREATE|ANR.SPL=160100400020|SPL:MOD=PDM|ANR.OPT:PLAN=G|SPL.EGRGUTP:1=
15|SPL.EGRGUTP:2=10|SPL:DIFFQUANTITY=N|BEARB=12345|DAT=09/29/2014|ZEIT=44421|
Existing split is again split up (specified setup time, quantities are not reduced by
the OP to be split. I.e. the total target quantity of the operation is increased by
the two new splits.):
DLG=ANR.ADVSPLITCREATE|ANR.SPL=16010040002002|SPL:MOD=PDM|ANR.OPT:PLAN=G|SPL.EGRGUTP:
1=5|SPL.RUEZ:1=1200|SPL.EGRGUTP:2=100|SPL.RUEZ:2=1200|ANR.OPT:SPL_EGR_UPD=N|BEARB=123
45|DAT=09/29/2014|ZEIT=44621|"
| 7.4.25  | Create merged operation (ANR.SAGINSERT)  |     |     |
| ------- | ---------------------------------------- | --- | --- |
Operation (ANR.TABLE=A)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description                   |     |
| ------------------ | ------------ | ----------------------------- | --- |
| auftrags_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| auftrags_leistung  | ANR.ANR      |                               |     |
| auftrag_status     | ANR.ANR      |                               |     |
| auftrags_zusatz    | ANR.VERWEIS  |                               |     |
BAPI call
| ID         | Content / {type}  | Description                            |     |
| ---------- | ----------------- | -------------------------------------- | --- |
| DLG        | ANR.SAGINSERT     | Create merged operation                |     |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                   |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |
| ANR.SANR   | {C40}             | Merged operation                       |     |
Combined order/OP number
| ANR.ANR  | {C40}  | Reference OP  |     |
| -------- | ------ | ------------- | --- |
Combined order/OP number
ANR.ANR:1  {C40}  Operations that you want to combine into one merged
operation.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 207 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ID  | Content / {type}  | Description  |     |
| --- | ----------------- | ------------ | --- |
ANR.ANR:2
..
ANR.ANR:n
| ANR.SGR:GUTB  | {DEC13,3}  | Target quantity yield                |     |
| ------------- | ---------- | ------------------------------------ | --- |
| ANR.SGR:AUSB  | {DEC13,3}  | Target quantity scrap                |     |
| ANR.SGE:B     | {C1}       | Base quantity unit of the merged OP  |     |
| ANR.RUEZ      | {N8}       | Setup time                           |     |
| ANR.BEARBZ    | {N8}       | Processing time                      |     |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 1669  | Data is already available  |     |     |
| ----- | -------------------------- | --- | --- |
 ANR.ANR is already available
| 2812  | Order is already available in the archive  |     |     |
| ----- | ------------------------------------------ | --- | --- |
| 101   | No data available!                         |     |     |
 This message also pops up if no reference OP is specified.

| 7.4.26  | Delete merged operation (ANR.SAGDELETE)  |     |     |
| ------- | ---------------------------------------- | --- | --- |
Operation (ANR.TABLE=A)
Tables (ANR.TABLE=A)
| Table              | Key field    | Description                   |     |
| ------------------ | ------------ | ----------------------------- | --- |
| auftrags_bestand   | ANR.ANR      | PK  Combined order/OP number  |     |
| auftrags_leistung  | ANR.ANR      |                               |     |
| auftrag_status     | ANR.ANR      |                               |     |
| auftrags_zusatz    | ANR.VERWEIS  |                               |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 208 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| ID         | Content / {type}  | Description                            |     |
| ---------- | ----------------- | -------------------------------------- | --- |
| DLG        | ANR.SAGDELETE     | Delete merged operation                |     |
| ANR.ATYP   | {C4}              | Order type {AG} (OP)                   |     |
| ANR.TABLE  | {C1}              | A – Backlog of orders (default value)  |     |
| ANR.SANR   | {C40}             | Merged operation                       |     |
Combined order/OP number
| MOD  | {C1}  | E – Remove single OP from MOP  |     |
| ---- | ----- | ------------------------------ | --- |
G – Remove all OPs from MOP
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
ANR.ATYP is not specified
| 101  | No data available!  |     |     |
| ---- | ------------------- | --- | --- |
 This message also pops up if no reference OP is specified.
| 1866  | Specified OP is no OP of the merged OP  |     |     |
| ----- | --------------------------------------- | --- | --- |
| 1865  | Specified MOP is no merged OP           |     |     |

| 7.4.27            | Lock order network for editing (ANETZ.LOCK)  |                              |     |
| ----------------- | -------------------------------------------- | ---------------------------- | --- |
| Table             | Key field                                    | Description                  |     |
| ade_auftragsnetz  | ANETZ.ANRV                                   | PK  Predecessor + successor  |     |
ANETZ.ANRN
BAPI call
| ID          | Content / {type}  | Description         |     |
| ----------- | ----------------- | ------------------- | --- |
| DLG         | ANETZ.LOCK        | Lock order network  |     |
| ANETZ.ANRV  | {C40}             | Predecessor         |     |
Combined order/OP number
| ANETZ.ANRN  | {C40}  | Successor  |     |
| ----------- | ------ | ---------- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 209 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Combined order/OP number
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| *   |   All attributes of the order network  |     |     |
| --- | -------------------------------------- | --- | --- |
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
| 1666         | Object is locked   |     |     |
BEARB

| 7.4.28            | Unlock order network for editing (ANETZ.UNLOCK)  |                              |     |
| ----------------- | ------------------------------------------------ | ---------------------------- | --- |
| Table             | Key field                                        | Description                  |     |
| ade_auftragsnetz  | ANETZ.ANRV                                       | PK  Predecessor + successor  |     |
ANETZ.ANRN
BAPI call
| ID          | Content / {type}  | Description           |     |
| ----------- | ----------------- | --------------------- | --- |
| DLG         | ANETZ.UNLOCK      | Unlock order network  |     |
| ANETZ.ANRV  | {C40}             | Predecessor           |     |
Combined order/OP number
| ANETZ.ANRN  | {C40}  | Successor  |     |
| ----------- | ------ | ---------- | --- |
Combined order/OP number
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 210 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 7.4.29            | Create order network (ANETZ.INSERT)  |                              |     |
| ----------------- | ------------------------------------ | ---------------------------- | --- |
| Table             | Key field                            | Description                  |     |
| ade_auftragsnetz  | ANETZ.ANRV                           | PK  Predecessor + successor  |     |
ANETZ.ANRN
BAPI call
| ID          | Content / {type}  | Description           |     |
| ----------- | ----------------- | --------------------- | --- |
| DLG         | ANETZ.INSERT      | Create order network  |     |
| ANETZ.ANRV  | {C40}             | Predecessor           |     |
Combined order/OP number
| ANETZ.ANRN  | {C40}  | Successor  |     |
| ----------- | ------ | ---------- | --- |
Combined order/OP number
| ANETZ.AOB  | {C2}  | Relationship  |     |
| ---------- | ----- | ------------- | --- |
ES = End-Start
| ANETZ.AKTIV  | {C1}  | J - Active  |     |
| ------------ | ----- | ----------- | --- |
| ANETZ.HERK   | {C1}  | Origin      |     |
E = Explicit (via interface)
| …   |     | For further fields, refer to the documentation HYD-HDB  |     |
| --- | --- | ------------------------------------------------------- | --- |
that includes the above listed tables
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
| ANRV  | {C40}  Predecessor  |     |     |
| ----- | ------------------- | --- | --- |
| ANRN  | {C40}  Successor    |     |     |
Plausibility checks
| Error codes  | Description                |     |     |
| ------------ | -------------------------- | --- | --- |
| 1661         | Missing parameter          |     |     |
| 1669         | Data is already available  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 211 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 7.4.30            | Edit order network (ANETZ.UPDATE)  |                              |     |
| ----------------- | ---------------------------------- | ---------------------------- | --- |
| Table             | Key field                          | Description                  |     |
| ade_auftragsnetz  | ANETZ.ANRV                         | PK  Predecessor + successor  |     |
ANETZ.ANRN
BAPI call
| ID          | Content / {type}  | Description         |     |
| ----------- | ----------------- | ------------------- | --- |
| DLG         | ANETZ.UPDATE      | Edit order network  |     |
| ANETZ.ANRV  | {C40}             | Predecessor         |     |
Combined order/OP number
| ANETZ.ANRN  | {C40}  | Successor  |     |
| ----------- | ------ | ---------- | --- |
Combined order/OP number
| MOD  | {C1}  | V – predecessor – update relationships                  |     |
| ---- | ----- | ------------------------------------------------------- | --- |
| …    |       | For further fields, refer to the documentation HYD-HDB  |     |
that includes the above listed tables
Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
| 1666         | Object is locked   |     |     |

| 7.4.31            | Delete order network (ANETZ.DELETE)  |                              |     |
| ----------------- | ------------------------------------ | ---------------------------- | --- |
| Table             | Key field                            | Description                  |     |
| ade_auftragsnetz  | ANETZ.ANRV                           | PK  Predecessor + successor  |     |
ANETZ.ANRN
BAPI call
| ID          | Content / {type}  | Description           |     |
| ----------- | ----------------- | --------------------- | --- |
| DLG         | ANETZ.UPDATE      | Delete order network  |     |
| ANETZ.ANRV  | {C40}             | Predecessor           |     |
Combined order/OP number

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 212 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| ANETZ.ANRN  | {C40}  | Successor  |     |
| ----------- | ------ | ---------- | --- |
Combined order/OP number
| ANETZ.AUNR  | {C40}  | Order number with MOD=A      |     |
| ----------- | ------ | ---------------------------- | --- |
| MOD         | {C1}   | A – Delete complete network  |     |

Plausibility checks
| Error codes  | Description        |     |     |
| ------------ | ------------------ | --- | --- |
| 1661         | Missing parameter  |     |     |
| 1666         | Object is locked   |     |     |

| 7.4.32            | Update order network (ANETZ.AKTUALISIEREN)  |                              |     |
| ----------------- | ------------------------------------------- | ---------------------------- | --- |
| Table             | Key field                                   | Description                  |     |
| ade_auftragsnetz  | ANETZ.ANRV                                  | PK  Predecessor + successor  |     |
ANETZ.ANRN
BAPI call
| ID   | Content / {type}  | Description           |     |
| ---- | ----------------- | --------------------- | --- |
| DLG  | ANETZ.AKTUALISI   | Update order network  |     |
EREN
| ANETZ.ANR    | {C40}  | Combined order/OP number  |     |
| ------------ | ------ | ------------------------- | --- |
| ANETZ.AUNR   | {C40}  | Order number              |     |
| ANETZ.AGNR   | {C40}  | OP number                 |     |
| ANETZ.AFOLG  | {C40}  | Sequence number           |     |
MOD=I : Recalculation of the ANETZ relationship of the
MOD  {C1}
added OP to the preceding and succeeding operation.
MOD=D : Recalculation of the ANETZ relationship of the
deleted OP to the preceding and succeeding operation.
MOD=A : Recalculation of the activated ANETZ
relationship of a sequence
MOD=N : Complete order network recalculation of an
order

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 213 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

Plausibility checks
| Error codes  | Description                 |     |     |     |
| ------------ | --------------------------- | --- | --- | --- |
| 712          | Processing mode is invalid  |     |     |     |
| 1661         | Missing parameter           |     |     |     |
| 1669         | Data is already available   |     |     |     |
with MOD=I

| 7.4.33                                       | Lock material list for editing  (MATLIST.LOCK)  |     |     |     |
| -------------------------------------------- | ----------------------------------------------- | --- | --- | --- |
| Operation - material list (MATLIST.TABLE=A)  |                                                 |     |     |     |
Workplan-operation - material list (MATLIST.TABLE=P)
Table (MATLIST.TABLE=A)
| Table    | Key field    |     | Description  |     |
| -------- | ------------ | --- | ------------ | --- |
| mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP
Table (MATLIST.TABLE=P)
| Table            | Key field    |     | Description  |     |
| ---------------- | ------------ | --- | ------------ | --- |
| arbplan_mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP
BAPI call
| ID              | Content / {type}  | Description               |     |     |
| --------------- | ----------------- | ------------------------- | --- | --- |
| DLG             | MATLIST.LOCK      | Lock material list        |     |     |
| MATLIST.ANR     | {C40}             | Combined order/OP number  |     |     |
| MATLIST.ATK     | {C40}             | Material                  |     |     |
| MATLIST.RESTYP  | {C4}              | Resource type             |     |     |
| MATLIST.SLP     | {C10}             | BOM item (default=1)      |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 214 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

Return
| ID  | Content  Description  |     |     |     |
| --- | --------------------- | --- | --- | --- |
/ {type}
MATLIST.*    All attributes of the newly created entry in the material list
Plausibility checks
| Error codes  | Description         |     |     |     |
| ------------ | ------------------- | --- | --- | --- |
| 1661         | Missing parameter   |     |     |     |
| 101          | No data available!  |     |     |     |
| 1666         | Object is locked    |     |     |     |

| 7.4.34                                       | Unlock material list for editing (MATLIST.UNLOCK)  |     |     |     |
| -------------------------------------------- | -------------------------------------------------- | --- | --- | --- |
| Operation - material list (MATLIST.TABLE=A)  |                                                    |     |     |     |
Workplan-operation - material list (MATLIST.TABLE=P)

Table (MATLIST.TABLE=A)
| Table    | Key field    |     | Description  |     |
| -------- | ------------ | --- | ------------ | --- |
| mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP
Table (MATLIST.TABLE=P)
| Table            | Key field    |     | Description  |     |
| ---------------- | ------------ | --- | ------------ | --- |
| arbplan_mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP
BAPI call
| ID           | Content / {type}  | Description               |     |     |
| ------------ | ----------------- | ------------------------- | --- | --- |
| DLG          | MATLIST.UNLOCK    | Unlock material list      |     |     |
| MATLIST.ANR  | {C40}             | Combined order/OP number  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 215 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| MATLIST.ATK     | {C40}  | Material              |     |     |
| --------------- | ------ | --------------------- | --- | --- |
| MATLIST.RESTYP  | {C4}   | Resource type         |     |     |
| MATLIST.SLP     | {C10}  | BOM item (default=1)  |     |     |
Plausibility checks
| Error codes  | Description        |     |     |     |
| ------------ | ------------------ | --- | --- | --- |
| 1661         | Missing parameter  |     |     |     |

| 7.4.35                                       | Create material list (MATLIST.INSERT)  |     |     |     |
| -------------------------------------------- | -------------------------------------- | --- | --- | --- |
| Operation - material list (MATLIST.TABLE=A)  |                                        |     |     |     |
Workplan-operation - material list (MATLIST.TABLE=P)

Table (MATLIST.TABLE=A)
| Table    | Key field    |     | Description  |     |
| -------- | ------------ | --- | ------------ | --- |
| mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP
Table (MATLIST.TABLE=P)
| Table            | Key field    |     | Description  |     |
| ---------------- | ------------ | --- | ------------ | --- |
| arbplan_mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP
BAPI call
| ID              | Content / {type}  | Description               |     |     |
| --------------- | ----------------- | ------------------------- | --- | --- |
| DLG             | MATLIST.INSERT    | Create material list      |     |     |
| MATLIST.ANR     | {C40}             | Combined order/OP number  |     |     |
| MATLIST.ATK     | {C40}             | Material                  |     |     |
| MATLIST.RESTYP  | {C4}              | Resource type             |     |     |
| MATLIST.SLP     | {C10}             | BOM item (default=1)      |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 216 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| …   |     | For further fields, refer to the documentation HYD-HDB  |     |     |
| --- | --- | ------------------------------------------------------- | --- | --- |
that includes the above listed tables
Return
| ID  | Content  Description  |     |     |     |
| --- | --------------------- | --- | --- | --- |
/ {type}
MATLIST.*    All attributes of the newly created entry in the material list
Plausibility checks
| Error codes  | Description                |     |     |     |
| ------------ | -------------------------- | --- | --- | --- |
| 1661         | Missing parameter          |     |     |     |
| 1669         | Data is already available  |     |     |     |
| 3284         | BOM level is invalid       |     |     |     |
if MATLIST.SLS:M has been specified
| 1987  | Operation cannot be changed  |     |     |     |
| ----- | ---------------------------- | --- | --- | --- |
| 10    | Order not available          |     |     |     |

| 7.4.36                                       | Edit material list (MATLIST.UPDATE)  |     |     |     |
| -------------------------------------------- | ------------------------------------ | --- | --- | --- |
| Operation - material list (MATLIST.TABLE=A)  |                                      |     |     |     |
Workplan-operation - material list (MATLIST.TABLE=P)
Table (MATLIST.TABLE=A)
| Table    | Key field    |     | Description  |     |
| -------- | ------------ | --- | ------------ | --- |
| mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP
Table (MATLIST.TABLE=P)
| Table            | Key field    |     | Description  |     |
| ---------------- | ------------ | --- | ------------ | --- |
| arbplan_mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 217 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| ID              | Content / {type}  | Description                                             |     |
| --------------- | ----------------- | ------------------------------------------------------- | --- |
| DLG             | MATLIST.UPDATE    | Edit material list                                      |     |
| MATLIST.ANR     | {C40}             | Combined order/OP number                                |     |
| MATLIST.ATK     | {C40}             | Material                                                |     |
| MATLIST.RESTYP  | {C4}              | Resource type                                           |     |
| MATLIST.SLP     | {C10}             | BOM item (default=1)                                    |     |
| …               |                   | For further fields, refer to the documentation HYD-HDB  |     |
that includes the above listed tables
Return
| ID  | Content  Description  |     |     |
| --- | --------------------- | --- | --- |
/ {type}
MATLIST.*    All attributes of the entry in the material list
Plausibility checks
| Error codes  | Description           |     |     |
| ------------ | --------------------- | --- | --- |
| 1661         | Missing parameter     |     |     |
| 101          | No data available!    |     |     |
| 1666         | Object is locked      |     |     |
| 3284         | BOM level is invalid  |     |     |
if MATLIST.SLS:M has been specified
| 1987  | Operation cannot be changed  |     |     |
| ----- | ---------------------------- | --- | --- |
| 10    | Order not available          |     |     |

| 7.4.37                                       | Delete material list (MATLIST.DELETE)  |     |     |
| -------------------------------------------- | -------------------------------------- | --- | --- |
| Operation - material list (MATLIST.TABLE=A)  |                                        |     |     |
Workplan-operation - material list (MATLIST.TABLE=P)

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 218 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

Table (MATLIST.TABLE=A)
| Table    | Key field    |     | Description  |     |
| -------- | ------------ | --- | ------------ | --- |
| mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP
Table (MATLIST.TABLE=P)
| Table            | Key field    |     | Description  |     |
| ---------------- | ------------ | --- | ------------ | --- |
| arbplan_mlst_hy  | MATLIST.ANR  |     |              |     |
MATLIST.ATK
MATLIST.SLP
MATLIST.RESTYP
BAPI call
| ID              | Content / {type}  | Description                         |     |     |
| --------------- | ----------------- | ----------------------------------- | --- | --- |
| DLG             | MATLIST.DELETE    | Create order network                |     |     |
| MATLIST.ANR     | {C40}             | Combined order/OP number            |     |     |
| MATLIST.ATK     | {C40}             | Material                            |     |     |
| MATLIST.RESTYP  | {C4}              | Resource type                       |     |     |
| MOD             |                   | A - Delete all components of an OP  |     |     |
E - Delete individual components
R - Delete all resource components of an OP
M - Delete all material components of an OP
Plausibility checks
| Error codes  | Description                  |     |     |     |
| ------------ | ---------------------------- | --- | --- | --- |
| 1661         | Missing parameter            |     |     |     |
| 2027         | Processing mode is invalid   |     |     |     |
| 1986         | Operation cannot be deleted  |     |     |     |
| 1666         | Object is locked             |     |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 219 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 220 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

8  HYDRA Production Data Manager MDE - Master Data
| 8.1  | Note on the descriptions of the basic dialogs  |     |     |
| ---- | ---------------------------------------------- | --- | --- |
All mandatory fields that must be specified have the addition PK (primary key). All other fields are optional
and are processed if they are transferred.
| 8.2    | Machine configuration                                |     |     |
| ------ | ---------------------------------------------------- | --- | --- |
| 8.2.1  | Edit machine configuration (DLG=MNR.INSERT, UPDATE,  |     |     |
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT)
Use this BAPI call to create a machine or a workplace. The machine statuses 20000 "NO SHIFT" and
30000 "NOT ASSIGNED" are automatically assigned.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
maschinen  masch_nr  Machine number (PK) in machine configuration
MNR.MNR
maschinen_status  masch_nr  Machine number (PK) in machine status
MNR.MNR
BAPI call
| Identification  | Content / {type}  | Description                                       |     |
| --------------- | ----------------- | ------------------------------------------------- | --- |
| DLG             | MNR.INSERT        | Create machine/workplace                          |     |
|                 | MNR.UPDATE        | Change machine/workplace                          |     |
|                 | MNR.DELETE        | Delete machine/workplace                          |     |
|                 | MNR.COPY          | Copy machine/workplace                            |     |
|                 | MNR.LOCK          | Lock machine/workplace for editing                |     |
|                 | MNR.UNLOCK        | Unlock machine/workplace after editing            |     |
|                 | MNR.NEW           | Read specification for new machine/new workplace  |     |
|                 | MNR.SELECT        | Select machine/workplace                          |     |
| MNR.MNR         | {C8}              | PK: workplace/machine number                      |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 221 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

|     |     |   The  valid  | characters  | are  listed  | in  the  document  |
| --- | --- | ------------- | ----------- | ------------ | ------------------ |
MOC_ResourceConfiguration.pdf. The number must not exceed
8 characters.
MNR. MNR:Z  {C8}  PK: new (target) workplace/machine number for COPY
|     |     |   The  valid  | characters  | are  listed  | in  the  document  |
| --- | --- | ------------- | ----------- | ------------ | ------------------ |
MOC_ResourceConfiguration.pdf. The number must not exceed
8 characters.
…  …  For  further  fields, refer  to the  documentation HYD-HDB that
describes the above listed tables
Validation checks
| Error codes  | Description  |     |     |     |     |
| ------------ | ------------ | --- | --- | --- | --- |
923  The  cost  center  of  the  group  must  match  the  cost  center  of  the  machine  or
workplace.
1611  When you delete (MNR.DELETE), the machine cannot be removed from the group
assignment.
1611  When you create a machine (MNR.INSERT) and the specified  machine group
(MNR.MGRP) has not yet been created as capacity group, this capacity group is
|     | then automatically created in the group assignment.  |     |     |     |     |
| --- | ---------------------------------------------------- | --- | --- | --- | --- |
Creating the group MNR.MGRP as capacity group failed.
1611  When you create a machine (MNR.INSERT), this machine is automatically assigned
to  the  group  assignment  of  the  capacity  group  (MNR.MGRP).  The  automatic
assignment failed.
1661    The value MNR.MNR has not been specified.
  The value MNR.MNR:Z has not been specified with MNR.COPY
  The value DAT has not been specified with MNR.SKINFO
1803  The authorization for  the responsibility area is not available and the specified
machine cannot be edited.
| 1666   | The machine is currently edited by another user.  |     |     |     |     |
| ------ | ------------------------------------------------- | --- | --- | --- | --- |
| 8.2.2  | List of machines/workplaces (DLG=MNR.LIST)        |     |     |     |     |
This list shows all machines or workplaces defined in the system.
Tables
| Table  | Key field  | Description  |     |     |     |
| ------ | ---------- | ------------ | --- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 222 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

maschinen  masch_nr  Machine number (PK) in machine configuration
MNR.MNR
BAPI call
| Identification  | Contents                               | Description                                  |     |
| --------------- | -------------------------------------- | -------------------------------------------- | --- |
| DLG             | MNR.LIST                               | List of machines                             |     |
| DATEI           | {C256}                                 | Specification of the file name for the list  |     |
| 8.2.3           | Read shift information of the machine  |                                              |     |
(DLG=MNR.SKINFO)
This BAPI call returns the current shift information of the machine. Depending on the configuration of the
shift calender, up to 10 shifts (index 1-10) can be returned.
BAPI call
| Identification  | Contents    | Description             |     |
| --------------- | ----------- | ----------------------- | --- |
| DLG             | MNR.SKINFO  | Read shift information  |     |
| MNR.MNR         | {C8}        | Machine number          |     |
MNR.MOD  {C1}  1: Identify shifts following the current machine date.
2: Identify shift times of a specific shift
Return mode 1
| Identification  | Contents      | Description                                 |     |
| --------------- | ------------- | ------------------------------------------- | --- |
| MNR             | {C8}          | Machine number                              |     |
| DAT             | {mm/dd/yyyy}  | Current log time for the machine            |     |
| ZEI             | {seconds}     | Current log time for the machine            |     |
| SKDAT           | {mm/dd/yyyy}  | Current shift date for the machine          |     |
| SKNR            | {N1}          | Current shift number for the machine (1-4)  |     |
| SKZEIB          | {seconds}     | Current start of shift                      |     |
| SZEITE          | {seconds}     | Current end of shift                        |     |
| SKDAUER:RES     | {seconds}     | Remaining time of the current shift         |     |
T

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 223 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| SKDAT:1  |   {mm/dd/yyyy}  | Date of the shift selected  |     |
| -------- | --------------- | --------------------------- | --- |
…
SKDAT:10
| SKNR:1  |   {N1}  | Number of the shift selected (1-4)  |     |
| ------- | ------- | ----------------------------------- | --- |
…
SKNR:10
| SKZEIB:1  |   {seconds}  | Start of the shift selected  |     |
| --------- | ------------ | ---------------------------- | --- |
…
SKZEIB:10
| SKZEIE:1  |   {seconds}  | End of the shift selected  |     |
| --------- | ------------ | -------------------------- | --- |
…
SKZEIE:10
| SKDAUER:1  |   {seconds}  | Duration of the shift selected  |     |
| ---------- | ------------ | ------------------------------- | --- |
…
SKZEIB:10
Return mode 2
| Identification  | Contents                                       | Description                                 |     |
| --------------- | ---------------------------------------------- | ------------------------------------------- | --- |
| MNR             | {C8}                                           | Machine number                              |     |
| DAT             | {mm/dd/yyyy}                                   | Current log time for the machine            |     |
| ZEI             | {seconds}                                      | Current log time for the machine            |     |
| SKDAT           | {mm/dd/yyyy}                                   | Current shift date for the machine          |     |
| SKNR            | {N1}                                           | Current shift number for the machine (1-4)  |     |
| SKZEIB          | {seconds}                                      | Current start of shift                      |     |
| SZEITE          | {seconds}                                      | Current end of shift                        |     |
| 8.3             | Status texts                                   |                                             |     |
| 8.3.1           | Edit status texts (DLG=MSTTXT.INSERT, UPDATE,  |                                             |     |
DELETE, LOCK, UNLOCK, SELECT)
Use these BAPI calls to edit status texts that are assigned to the machine statuses.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
stoertexte  stoertxt_nr  Status text number (PK) in status texts

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 224 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

MSTTXT.STNR
BAPI call
| Identification  | Content / {type}  | Description                       |     |
| --------------- | ----------------- | --------------------------------- | --- |
| DLG             | MSTTXT.INSERT     | Create status text                |     |
|                 | MSTTXT.UPDATE     | Change status text                |     |
|                 | MSTTXT.DELETE     | Delete status text                |     |
|                 | MSTTXT.LOCK       | Lock status text for editing      |     |
|                 | MSTTXT.UNLOCK     | Unlock status text after editing  |     |
|                 | MSTTXT.SELECT     | Select status text                |     |
| MSTTXT.STNR     | {N4}              | PK: status text number            |     |
…  …  For further fields, refer to the documentation HYD-HDB that
describes the above listed tables
Validation checks
| Error codes  | Description                                        |     |     |
| ------------ | -------------------------------------------------- | --- | --- |
| 734          | The parameter MSTTXT.STNR has not been specified.  |     |     |
| 735          | The machine status text does not exist.            |     |     |
733  The machine status text is referenced in the machine status configuration and
cannot be deleted.
| 933  | The status texts 20000 and 30000 must not be deleted.   |     |     |
| ---- | ------------------------------------------------------- | --- | --- |
| 736  | A machine status text with this number already exists.  |     |     |
1666  The machine status text is currently edited by another user.
| 8.3.2  | List of status texts (DLG=MSTTXT.LIST)  |     |     |
| ------ | --------------------------------------- | --- | --- |
The BAPI call returns all defined status texts (incl. the special texts 20000 "NO SHIFT" and 30000 "NOT
ASSIGNED").
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
stoertexte  stoertxt_nr  Status text number (PK) in status texts
MSTTXT.STNR

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 225 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| Identification  | Contents                                       | Description                                  |     |
| --------------- | ---------------------------------------------- | -------------------------------------------- | --- |
| DLG             | MSTTXT.LIST                                    | List of status texts                         |     |
| DATEI           | {C256}                                         | Specification of the file name for the list  |     |
| 8.4             | Status classes                                 |                                              |     |
| 8.4.1           | Edit status classes (DLG=STKL.INSERT, UPDATE,  |                                              |     |
DELETE,  LOCK, UNLOCK, SELECT)
Use these BAPI calls to edit status classes that are assigned to the machine statuses.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
mz_stklasse  nummer  Status class number (PK) in status class configuration
STKL.STKLNR
mz_stklasse  kuerzel  Status class (PK) in status class configuration
STKL.STKL
BAPI call
| Identification  | Content / {type}  | Description                        |     |
| --------------- | ----------------- | ---------------------------------- | --- |
| DLG             | STKL.INSERT       | Create status class                |     |
|                 | STKL.UPDATE       | Change status class                |     |
|                 | STKL.DELETE       | Delete status class                |     |
|                 | STKL.LOCK         | Lock status class for editing      |     |
|                 | STKL.UNLOCK       | Unlock status class after editing  |     |
|                 | STKL.SELECT       | Select status class                |     |
| STKL.STKLNR     | {N4}              | PK: status class number (unique)   |     |
| STKL.STKL       | {C3}              | PK: status class (unique)          |     |
…  …  For  further  fields, refer  to the  documentation HYD-HDB that
describes the above listed tables

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 226 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
1661    The status class number (STKL.STKLNR) has not been specified
  The status class (STKL.STKL) has not been specified
| 719  | The status class is not available  |     |     |
| ---- | ---------------------------------- | --- | --- |
750  The status class cannot be deleted because it is assigned to at least one machine
status
| 749  | The status class/status class number already exists  |     |     |
| ---- | ---------------------------------------------------- | --- | --- |
1666  The machine status text is currently edited by another user.
| 8.4.2  | List of status classes (DLG=STKL.LIST)  |     |     |
| ------ | --------------------------------------- | --- | --- |
The BAPI call returns all status classes defined.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
mz_stklasse  nummer  Status class number (PK) in status class configuration
STKL.STKLNR
mz_stklasse  kuerzel  Status class (PK) in status class configuration
STKL.STKL
BAPI call
| Identification  | Contents                                      | Description                                  |     |
| --------------- | --------------------------------------------- | -------------------------------------------- | --- |
| DLG             | STKL.LIST                                     | List of status classes                       |     |
| DATEI           | {C256}                                        | Specification of the file name for the list  |     |
| 8.5             | Machine status configuration                  |                                              |     |
| 8.5.1           | Edit valid machine statuses (DLG=MST.INSERT,  |                                              |     |
UPDATE, DELETE, COPY, LOCK, UNLOCK, NEW,
SELECT)
Use this BAPI call to configure the valid machine statuses for a machine or workplace. The status texts
are assigned here.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 227 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |     |
| --- | --- | --- | --- | --- | ------------------------ | --- | --- |

Tables
| Table  | Key field  | Description  |     |     |     |     |     |
| ------ | ---------- | ------------ | --- | --- | --- | --- | --- |
stoer_tabelle  masch_nr  Machine number (PK) in machine status configuration
MST.MNR
stoer_tabelle  stoernr  Machine status (PK) in machine status configuration
MST.MST
stoer_tabelle  stoertxt_nr    Status text number (FK) in status texts
MST.STNR
BAPI call
| Identification  | Content / {type}  | Description                                        |     |     |     |     |     |
| --------------- | ----------------- | -------------------------------------------------- | --- | --- | --- | --- | --- |
| DLG             | MST.INSERT        | Create machine status configuration                |     |     |     |     |     |
|                 | MST.UPDATE        | Change machine status configuration                |     |     |     |     |     |
|                 | MST.DELETE        | Delete machine status configuration                |     |     |     |     |     |
|                 | MST.COPY          | Copy machine status configuration                  |     |     |     |     |     |
|                 | MST.LOCK          | Lock machine status configuration for editing      |     |     |     |     |     |
|                 | MST.UNLOCK        | Unlock machine status configuration after editing  |     |     |     |     |     |
MST.NEW  Read specification for new machine status configuration
|          | MST.SELECT  | Select machine status configuration  |     |     |     |     |     |
| -------- | ----------- | ------------------------------------ | --- | --- | --- | --- | --- |
| MST.MNR  | {C8}        | PK: machine number                   |     |     |     |     |     |
| MST.MST  | {N4}        | PK: machine status                   |     |     |     |     |     |
MST.MNR:Z  {C8}  PK: new (target) machine number for COPY with MOD=E
MST.MST:Z  {N4}  PK: new (target) machine status for COPY with MOD=E
| MOD  | {C1}  | Copy/delete mode:  |     |     |     |     |     |
| ---- | ----- | ------------------ | --- | --- | --- | --- | --- |
G = all statuses of machine with DELETE/COPY
F = missing statuses of machine with COPY
E = single statuses of machine with DELETE/COPY
M = single status of all machines with DELETE/COPY
Note:
|     |     | The  statuses  | 20000  and     | 30000    | are  not  | deleted   | with     |
| --- | --- | -------------- | -------------- | -------- | --------- | --------- | -------- |
|     |     | MST.DELETE     | and  MOD=G     | because  | these     | statuses  | are      |
|     |     | automatically  | created  when  | the      | machine   | is        | created  |
(MNR.INSERT) and automatically deleted when the machine is
deleted (MNR.DELETE).

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     |     | Page 228 of 356  |     |
| ---------------- | --- | ------------------- | --- | --- | --- | ---------------- | --- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

…  …  For  further  fields, refer  to the  documentation HYD-HDB that
describes the above listed tables
Validation checks
| Error codes  | Description                                           |     |     |
| ------------ | ----------------------------------------------------- | --- | --- |
| 707          | The machine number (MNR.MNR) has not been specified.  |     |     |
| 708          | The machine status (MST.MST) has not been specified.  |     |     |
712  The parameter MOD is invalid or has not been specified.
| 709  | The (target) machine number has not been specified.  |     |     |
| ---- | ---------------------------------------------------- | --- | --- |
| 710  | The (target) machine status has not been specified.  |     |     |
1803  The authorization for  the responsibility area is not available and the specified
machine cannot be edited.
| 713  | The machine status specified is not available.  |     |     |
| ---- | ----------------------------------------------- | --- | --- |
706  The machine status specified cannot be deleted because this status is currently
assigned to the machine.
| 714  | The machine status already exists for this machine.  |     |     |
| ---- | ---------------------------------------------------- | --- | --- |
715  The production flag (MST.OPT:PKENN) has not been specified.
716  A status with the specified production flag (MST.OPT:PKENN) already exists for this
machine.
717  The specified resource performance account (MST.BMKNR ) is not available.
718  The specified status text (MST.STNR) is not available. You must create this status
text in the configuration of status texts (see MSTTXT.INSERT).
719  The disturbance class (MST.STKL) is not available. You must create this class in
the configuration of disturbance classes.
720  You can only set the option "Status transfer of aggregates" (MST.OPT.LINIE=J)
with machines of type "Line".
809  Invalid superior machine status (MST.MST:UEB). The flag "Hierarchy level" is not
set in the superior status.
810  Invalid superior machine status (MST.MST:UEB). The status is not available for the
machine selected!
811  Invalid superior machine status (MST.MST:UEB). The superior and the inferior
statuses are identical.
812  Invalid superior machine status (MST.MST:UEB). The higher-level/superior status
refers to the lower-level/inferior status at the end of the hierarchy.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 229 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 802  | Status already assigned for "no shift".  |     |     |
| ---- | ---------------------------------------- | --- | --- |
1666  The machine status is currently edited by another user.
| 8.5.2  | List machine status (DLG=MST.LIST)  |     |     |
| ------ | ----------------------------------- | --- | --- |
This list shows all machine statuses defined in the system.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
stoer_tabelle  masch_nr  Machine number (PK) in machine status configuration
MST.MNR
stoer_tabelle  stoernr  Machine status (PK) in machine status configuration
MST.MST
stoer_tabelle  stoertxt_nr    Status text number (FK) in status texts
MST.STNR
BAPI call
| Identification  | Contents                                        | Description                                  |     |
| --------------- | ----------------------------------------------- | -------------------------------------------- | --- |
| DLG             | MST.LIST                                        | List of machine statuses                     |     |
| DATEI           | {C256}                                          | Specification of the file name for the list  |     |
| 8.6             | Counter configuration                           |                                              |     |
| 8.6.1           | Edit counter configuration (DLG=MNRCTR.INSERT,  |                                              |     |
UPDATE, MODIFY, DELETE, COPY, LOCK, UNLOCK,
NEW, SELECT)
Use this BAPI call to create and edit the configuration for 1...n counters per machine or workplace.

 Tables

|  Table  | Key field  | Description  |     |
| ------- | ---------- | ------------ | --- |

 maschinen_zaehler
masch_nr  Machine number (PK)

MNRCTR.MNR

| maschinen_zaehler  | zaehler  | Counter number (PK)  |     |
| ------------------ | -------- | -------------------- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 230 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

MNRCTR.CTR
BAPI call
| Identification  | Content / {type}  | Description                                        |     |
| --------------- | ----------------- | -------------------------------------------------- | --- |
| DLG             | MNRCTR.INSERT     | Create counter configuration                       |     |
|                 | MNRCTR.UPDATE     | Change counter configuration                       |     |
|                 | MNRCTR.DELETE     | Delete counter configuration                       |     |
|                 | MNRCTR.COPY       | Copy counter configuration                         |     |
|                 | MNRCTR.LOCK       | Lock counter configuration for editing             |     |
|                 | MNRCTR.UNLOCK     | Unlock counter configuration after editing         |     |
|                 | MNRCTR.NEW        | Read specification for new counter configuration.  |     |
|                 | MNRCTR.SELECT     | Select counter configuration                       |     |
| MNRCTR.MNR      | {N3}              | PK: machine number                                 |     |
| MNRCTR.         | {N3}              | PK: new (target) machine number for COPY           |     |
MNR:Z
| MNRCTR.CTR  | {N3}  | PK: counter number                        |     |
| ----------- | ----- | ----------------------------------------- | --- |
| MNRCTR.     | {N3}  | PK: new (target) counter number for COPY  |     |
CTR:Z
…  …  For further fields, refer to the documentation HYD-HDB
that describes the above listed tables
Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
1662  The parameter Allocation with (MNRCTR:VERB) must not have the same value as
the parameter Evaluation (MNRCTR.TYP).
1662  The parameter Evaluation (MNRCTR.TYP) is not specified and the value is invalid.
Possible values: GUT, AUS, NCH, PRB and empty
The parameter Allocation with (MNRCTR:VERB) is specified and the value is
1662
invalid. Possible values: GUT, AUS, NCH, PRB and empty
1662  The parameter Allocation with partitioning (MNRCTR.VERB:TLG) is specified
and the value is not valid. Possible values: J, N and empty
1662  The parameter Posting as cycles (MNRCTR.OPT:TAKT) is specified and the value
is invalid. Possible values: T, N and empty

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 231 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

1662  The parameter For monitoring (MNRCTR.OPT:UEB) is specified and the value is
invalid. Possible values: Z, N and empty
| 931  | Auto-allocation is not possible.  |     |     |
| ---- | --------------------------------- | --- | --- |
935  The current counter configuration is only supported with CT-8xx or C-76x terminals.
1669  Counter configuration is already available (MNRCTR.UPDATE)
| 90  | Machine does not exist (MNRCTR.MNR / MNRCTR.:Z)  |     |     |
| --- | ------------------------------------------------ | --- | --- |
930  The maximum number of counters at the machine has been exceeded.
| 1662  | The key fields are not correctly specified:  |     |     |
| ----- | -------------------------------------------- | --- | --- |
-  MNRCTR.MNR
-  MNRCTR.MNR:Z (with MNRCTR.COPY)
-  MNRCTR.CTR
-  MNRCTR.CTR:Z (with MNRCTR.COPY)
101  No  counter  configuration  available  (with  MNRCTR.UPDATE  and
MNRCTR.DELETE)
1669  Counter configuration is already available (with MNRCTR.INSERT)
1666  The  data  record  is  currently  locked  by  user  %s  (with  MNRCTR.UPDATE  and
MNRCTR.DELETE)
712  The parameter MOD is not valid. Possible values: E, G and F
101  Source counter configuration is not available (MNRCTR.COPY)
1855  Target counter configuration is already available (MNRCTR.COPY)
| 8.6.2  | List of counter configuration (DLG=MNRCTR.LIST)  |     |     |
| ------ | ------------------------------------------------ | --- | --- |
This list shows all defined counters of the counter configuration.
Tables
| Table              | Key field  | Description          |     |
| ------------------ | ---------- | -------------------- | --- |
| maschinen_zaehler  | masch_nr   | Machine number (PK)  |     |
MNRCTR.MNR
| maschinen_zaehler  | zaehler  | Counter number (PK)  |     |
| ------------------ | -------- | -------------------- | --- |
MNRCTR.CTR

BAPI call

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 232 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| Identification  | Contents                                     | Description                                  |     |
| --------------- | -------------------------------------------- | -------------------------------------------- | --- |
| DLG             | MNRCTR.LIST                                  | List of counter configuration                |     |
| DATEI           | {C256}                                       | Specification of the file name for the list  |     |
| 8.7             | Assignment of machine/workplace to terminal  |                                              |     |
| 8.7.1           | Edit assignment (DLG=MNRTNR.INSERT,          |                                              |     |
DELETE,SELECT)
Use  these  BAPI  calls  to  edit  the  assignments  of  machines  to  terminals.

Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
masch_nr
| masch_term_zuord  |     | Machine and terminal must be unique.  |     |
| ----------------- | --- | ------------------------------------- | --- |
terminal_nr

MNRTNR.MNR
MNRTNR.TNR
terminal_nrtermin
masch_term_zuord  Terminal and display position must be unique.
al_nr
anzeige_pos

MNRTNR.TNR
MNRTNR.POS
BAPI call
| Identification  | Content / {type}  | Description        |     |
| --------------- | ----------------- | ------------------ | --- |
| DLG             | MNRTNR.INSERT     | Create assignment  |     |
|                 | MNRTNR.DELETE     | Delete assignment  |     |
|                 | MNRTNR.SELECT     | Select assignment  |     |
| MNRTNR.MNR      | C  20             | Machine            |     |
| MNRTNR.TNR      | N8                | Terminal number    |     |
| MNRTNR.POS      | N8                | Display position   |     |
…  …  For further fields, refer to the documentation HYD-HDB
that describes the above listed tables

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 233 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

Validation checks
| Error codes  | Description                              |     |     |     |
| ------------ | ---------------------------------------- | --- | --- | --- |
| 707          | Machine has not been specified.          |     |     |     |
| 746          | Terminal number has not been specified.  |     |     |     |
| 747          | Position has not been specified.         |     |     |     |
| 510          | Person is not authorized.                |     |     |     |
| 1672         | Assignment does already exist.           |     |     |     |
| 1682         | Assignment is not available.             |     |     |     |
| 8.7.2        | List of assignments (DLG=MNRTNR.LIST)    |     |     |     |
The BAPI call returns all assignments for all terminals.
BAPI call
| Identification  | Contents                                           | Description                                  |     |     |
| --------------- | -------------------------------------------------- | -------------------------------------------- | --- | --- |
| DLG             | MNRTNR.LIST                                        | List of assignments                          |     |     |
| DATEI           | {C256}                                             | Specification of the file name for the list  |     |     |
| 8.8             | Group assignment                                   |                                              |     |     |
| 8.8.1           | Edit group assignment (DLG=GRPRES.INSERT, UPDATE,  |                                              |     |     |
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT)
| Use these BAPI calls to edit the group assignments.  |     |     |     |     |
| ---------------------------------------------------- | --- | --- | --- | --- |

Tables
| Table             | Key field  |     | Description  |     |
| ----------------- | ---------- | --- | ------------ | --- |
| hy_gruppen_zuord  | group      |     |              |     |
The combination must be unique.
res_nr
res_typ

GRPRES.GRP
GRPRES.RESNR
GRPRES.RESTYP

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 234 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
Identification  Content / {type}  Description
DLG  GRPRES.INSERT  Create assignment
GRPRES.UPDATE  Edit assignment
GRPRES.DELETE  Delete assignment
GRPRES.COPY  Copy assignment
GRPRES.SELECT  Select assignment
GRPRES.COPY  Copy assignment
GRPRES.LOCK  Lock assignment for editing
GRPRES.UNLOCK  Unlock assignment after editing
GRPRES.NEW  Read specification for new assignment
GRPRES.GRP  C  20  Group
GRPRES.RESNR  C  40  Resource
GRPRES.RESTYP  C  4  Resource type
MOD  C  1  Copy mode
E- Copy currently selected resource
G- Copy all resources of the group
M- Move all resources of the group
Return
| Identification  | Content / {type}  | Description          |     |
| --------------- | ----------------- | -------------------- | --- |
| GRP             | C  20             | current data record  |     |
| RESNR           | C  40             | current data record  |     |
| RESTYP          | C  4              | current data record  |     |
| POS             | N8                | current data record  |     |
Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
1661    The value GRPRES.GRP has not been specified.
  The value GRPRES.RESTYP has not been specified.
  The value GRPRES.RESNR has not been specified.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 235 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

  The value GRPRES.GRP:Z has not been specified with GRPRES.COPY.
| 414   | The group specified does not exist.              |     |     |
| ----- | ------------------------------------------------ | --- | --- |
| 1669  | Assignment is already available (GRPRES.UPDATE)  |     |     |
| 94    | With RESTYP = MGRP                               |     |     |
Machine group does not exist.
| 918  | With RESTYP = MGRP  |     |     |
| ---- | ------------------- | --- | --- |
A resource of type MGRP must be a capacity group.
415  The RESTYP specified does not match the existing group containing only one type.
| 712    | Processing mode is invalid.                  |     |     |
| ------ | -------------------------------------------- | --- | --- |
| 8.8.2  | List of group assignments (DLG=GRPRES.LIST)  |     |     |
The BAPI call lists the group assignments.
BAPI call
| Identification  | Contents                                      | Description                                  |     |
| --------------- | --------------------------------------------- | -------------------------------------------- | --- |
| DLG             | GRPRES.LIST                                   | List of assignments                          |     |
| DATEI           | {C256}                                        | Specification of the file name for the list  |     |
| GRPRES.GRP      | C  20                                         | Group {wildcard permitted}                   |     |
| GRPRES.RESNR    | C  40                                         | Resource {wildcard permitted}                |     |
| GRPRES.RESTYP   | C  4                                          | Resource type {wildcard permitted}           |     |
| 8.9             | Groups                                        |                                              |     |
| 8.9.1           | Edit groups (DLG=GRP.INSERT, UPDATE, DELETE,  |                                              |     |
COPY, LOCK, UNLOCK, NEW, SELECT)
| Use these BAPI calls to edit groups.  |     |     |     |
| ------------------------------------- | --- | --- | --- |
Tables
| Table       | Key field  | Description  |     |
| ----------- | ---------- | ------------ | --- |
| hy_gruppen  | group      |              |     |
The combination must be unique.
user

GRP.GRP
GRP.BEARB

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 236 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| Identification  | Content / {type}  | Description                       |     |
| --------------- | ----------------- | --------------------------------- | --- |
| DLG             | GRP.INSERT        | Create group                      |     |
|                 | GRP.UPDATE        | Edit group                        |     |
|                 | GRP.DELETE        | Delete group                      |     |
|                 | GRP.COPY          | Copy group                        |     |
|                 | GRP.SELECT        | Select group                      |     |
|                 | GRP.COPY          | Copy group                        |     |
|                 | GRP.LOCK          | Lock group for editing            |     |
|                 | GRP.UNLOCK        | Unlock group after editing        |     |
|                 | GRP.NEW           | Read specification for new group  |     |
| GRP.GRP         | C  20             | Group                             |     |
| GRP.BEARB       | C10               | User                              |     |
|                 |                   |                                   |     |
| MOD             | C  1              | Copy mode                         |     |
E- copy currently selected group
Z- copy currently selected group with all resources assigned
Return
| Identification  | Content / {type}  | Description          |     |
| --------------- | ----------------- | -------------------- | --- |
| GRP             | C  20             | current data record  |     |
| BEARB           | C10               | current data record  |     |
Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
1661
  The value GRPRES.GRP has not been specified.
  The value GRPRES.RESTYP has not been specified.
  The value GRPRES.RESNR has not been specified.
  The value GRPRES.GRP:Z has not been specified with GRPRES.COPY.
| 414   | The group specified does not exist.              |     |     |
| ----- | ------------------------------------------------ | --- | --- |
| 1669  | Assignment is already available (GRPRES.UPDATE)  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 237 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| 94  | With RESTYP = MGRP  |     |     |     |
| --- | ------------------- | --- | --- | --- |
Machine group does not exist.
| 918  | With RESTYP = MGRP  |     |     |     |
| ---- | ------------------- | --- | --- | --- |
A resource of type MGRP must be a capacity group.
415  The RESTYP specified does not match the existing group containing only one type.
| 712    | Processing mode is invalid.                  |     |     |     |
| ------ | -------------------------------------------- | --- | --- | --- |
| 8.9.2  | List of group assignments (DLG=GRPRES.LIST)  |     |     |     |
The BAPI call lists the group assignments.
BAPI call
| Identification  |     | Contents     | Description                                  |     |
| --------------- | --- | ------------ | -------------------------------------------- | --- |
| DLG             |     | GRPRES.LIST  | List of assignments                          |     |
| DATEI           |     | {C256}       | Specification of the file name for the list  |     |
| GRPRES.GRP      |     | C  20        | Group {wildcard permitted}                   |     |
| GRPRES.RESNR    |     | C  40        | Resource {wildcard permitted}                |     |
| GRPRES.RESTYP   |     | C  4         | Resource type {wildcard permitted}           |     |

| 8.10    | MDE postings                              |     |     |     |
| ------- | ----------------------------------------- | --- | --- | --- |
| 8.10.1  | Create posting (DLG=MDEPRO.INSERT, COPY)  |     |     |     |
Use the BAPI calls described in this section to create, copy and delete MDE records for postings.
Tables
| Table  | Key field  |     | Description  |     |
| ------ | ---------- | --- | ------------ | --- |
event  Internal ID  Internal ID of the MDE record of the posting (PK)
MDEPRO.VERWEIS
BAPI call
| Identification  |     | Content / {type}  | Description         |     |
| --------------- | --- | ----------------- | ------------------- | --- |
| DLG             |     | MDEPRO.INSERT     | Create MDE posting  |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 238 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| Identification  |     | Content / {type}  | Description       |     |     |     |
| --------------- | --- | ----------------- | ----------------- | --- | --- | --- |
|                 |     | MDEPRO.COPY       | Copy MDE posting  |     |     |     |
MDEPRO.MNR  {C20}  HYDRA workplace that makes the posting (PK)
| MDEPRO.DATB  |     | {MM/DD/YYYY}  | Start date of the posting (PK)   |     |     |     |
| ------------ | --- | ------------- | -------------------------------- | --- | --- | --- |
| MDEPRO.DATE  |     | {MM/DD/YYYY}  | End date of the posting (PK)     |     |     |     |
| MDEPRO.SART  |     | {C1}          | Record type of the posting (PK)  |     |     |     |
P: log record
N: end of shift record
| MDEPRO.MST  |     | {N6}  | only with MDEPRO.INSERT  |     |     |     |
| ----------- | --- | ----- | ------------------------ | --- | --- | --- |
Machine status of posting (PK)
| MDEPRO.VERWEIS  |     | {N8}  | only with MDEPRO.COPY  |     |     |     |
| --------------- | --- | ----- | ---------------------- | --- | --- | --- |
Internal ID of the posting (PK) that you want to copy.
| …   |     | …   | For further fields, that are not MANDATORY, refer to  |           |                     |           |
| --- | --- | --- | ----------------------------------------------------- | --------- | ------------------- | --------- |
|     |     |     | section  8.10.3                                       | List  of  | fields  (acronyms)  | for  the  |
MDEPRO dialog
Return
| Identification  |     | Content  Description  |     |     |     |     |
| --------------- | --- | --------------------- | --- | --- | --- | --- |
/ {type}
MDEPRO.VERWEIS  {N8}  Returns the internal ID of the posting created.
Validation checks
| Error codes  | Description  |     |     |     |     |     |
| ------------ | ------------ | --- | --- | --- | --- | --- |
90  Workplace/machine (MDEPRO.MNR) must be available in the workplace/machine
configuration.
1662  The parameter with the ID MDEPRO.SART must have the value "N" or "P".
1803  Check is only performed if "BEARB" is also passed and BEARB does not equal
"HYDRA".
Responsibility  area  authorization  for  the  workplace  is  not  available
(MDEPRO.MNR).
1952  Start date (MDEPRO.DATB / MDEPRO.ZEIB) must not be greater than end date
(MDEPRO.DATE / MDEPRO.ZEIE).
1661  You must specify the parameter with the ID MDEPRO.SART.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 239 of 356  |     |
| ---------------- | --- | --- | ------------------- | --- | ---------------- | --- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| Error codes  | Description  |     |     |     |
| ------------ | ------------ | --- | --- | --- |
1661  You must specify the parameter with the ID MDEPRO.MNR.
1661  You must specify the parameter with the IDs MDEPRO.DATB and MDEPRO.DATE.
| 8.10.2  | Edit posting (DLG=MDEPRO.UPDATE, DELETE, LOCK,  |     |     |     |
| ------- | ----------------------------------------------- | --- | --- | --- |
UNLOCK)
Use the BAPI calls described in this section to edit MDE records of postings.
Tables
| Table  | Key field    |     | Description                 |     |
| ------ | ------------ | --- | --------------------------- | --- |
| event  | Internal ID  |     | Internal ID of the posting  |     |
MDEPRO.VERWEIS
BAPI call
| Identification  |     | Content / {type}  | Description               |     |
| --------------- | --- | ----------------- | ------------------------- | --- |
|                 |     | MDEPRO.UPDATE     | Change posting            |     |
|                 |     | MDEPRO.DELETE     | Delete posting            |     |
|                 |     | MDEPRO.LOCK       | Lock posting for editing  |     |
MUST be performed before MDEPRO.UPDATE
|     |     | MDEPRO.UNLOCK  | Unlock posting after editing  |     |
| --- | --- | -------------- | ----------------------------- | --- |
MUST be performed after MDEPRO.UPDATE
| MDEPRO.VERWEIS  |     | {N8}  | Internal ID of the posting (PK)  |     |
| --------------- | --- | ----- | -------------------------------- | --- |
| MDEPRO.SART     |     | {C1}  | Record type of the posting       |     |
P: log record
N: end of shift record
| …   |     | …   | MDEPRO.UPDATE: For further fields, that are not  |     |
| --- | --- | --- | ------------------------------------------------ | --- |
MANDATORY, refer to section  8.10.3 List of fields
(acronyms) for the MDEPRO dialog
Return
| Identification  |     | Content / {type}  | Description  |     |
| --------------- | --- | ----------------- | ------------ | --- |
event  Internal ID  Internal ID of the MDE record of the posting

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 240 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Identification  |     | Content / {type}  | Description  |     |     |
| --------------- | --- | ----------------- | ------------ | --- | --- |
MDEPRO.VERWEIS
Validation checks
| Error codes  | Description  |     |     |     |     |
| ------------ | ------------ | --- | --- | --- | --- |
90  Workplace  (MDEPRO.MNR)  must  be  available  in  the  workplace/machine
configuration.
| 101  | UPDATE,LOCK,UNLOCK  |     |     |     |     |
| ---- | ------------------- | --- | --- | --- | --- |
The record of the posting (if the parameter MDEPRO.VERWEIS is specified) must
be available in the database.
1803  Check is only performed if "BEARB" is also passed and BEARB does not equal
"HYDRA".
Responsibility  area  authorization  for  the  workplace  is  not  available
(MDEPRO.MNR).
1952  Start date (MDEPRO.DATB / MDEPRO.ZEIB) must not be greater than end date
(MDEPRO.DATE / MDEPRO.ZEIE).
1666  The data record is currently locked by another user. (UPDATE, DELETE,LOCK).
| 1661  | UPDATE.LOCK,UNLOCK  |     |     |     |     |
| ----- | ------------------- | --- | --- | --- | --- |
You must specify the parameter with the ID MDEPRO.VERWEIS.
| 1661  | UPDATE  |     |     |     |     |
| ----- | ------- | --- | --- | --- | --- |
You must specify the parameter with the ID MDEPRO.SART.
| 1661  | UPDATE  |     |     |     |     |
| ----- | ------- | --- | --- | --- | --- |
You must specify the parameter with the ID MDEPRO.MNR.
1661  You must specify the parameter with the IDs MDEPRO.DATB and MDEPRO.DATE.
1662  The parameter with the ID MDEPRO.SART must have the value "N" or "P".
|                 |                                                  |              |          |                  |     |
| --------------- | ------------------------------------------------ | ------------ | -------- | ---------------- | --- |
|                 |                                                  |              |  dialog  |                  |     |
| 8.10.3          | List of fields (acronyms) for the MDEPRO dialog  |              |          |                  |     |
| Identification  |                                                  | Description  |          | DB type  Length  |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 241 of 356  |     |
| ---------------- | --- | --- | ------------------- | ---------------- | --- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Identification  |     | Description  |     | DB type  Length  |     |
| --------------- | --- | ------------ | --- | ---------------- | --- |

| MDEPRO.MNR  |     | workplace                     |     | char  20  |     |
| ----------- | --- | ----------------------------- | --- | --------- | --- |
| MDEPRO.KST  |     | Cost center of the workplace  |     | char  10  |     |
MDEPRO.VERWEIS  Unique ID of the log record, important for the  sqlserial  7
editing of log records
| MDEPRO.SART  |     | Record type  |     | char  1  |     |
| ------------ | --- | ------------ | --- | -------- | --- |
P: log record
N: end of shift record

Original records of corrections:
1: end of shift record
2: log record
| MDEPRO.ZEIB   |     | or  | start date (time) of status  | integer  7  |     |
| ------------- | --- | --- | ---------------------------- | ----------- | --- |
MDEPRO.MSZEIB
| MDEPRO.DATB  |     | or  | start date (date) of status  | sqldate  7  |     |
| ------------ | --- | --- | ---------------------------- | ----------- | --- |
MDEPRO.MSDATB

| MDEPRO.ZEIE  |     | or  | end time (time) of status  | integer  7  |     |
| ------------ | --- | --- | -------------------------- | ----------- | --- |
MDEPRO.MSZEIE
| MDEPRO.DATE  |     | or  | end time (date) of status  | integer  7  |     |
| ------------ | --- | --- | -------------------------- | ----------- | --- |
MDEPRO.MSDATE
MDEPRO.MSDAUER  Duration of the status, synchronized with the  integer  7
shift calendar
MDEPRO.MST  Machine status (table stoer_tabelle)  smallint  7

MDEPRO.BMKNR  Resource  performance  account  of  machine  smallint  7
status
MDEPRO.STNR  Refers to status text (table stoer_texte)  smallint  7
| MDEPRO.SZY  |     | Target cycle at time of logging  |     | decimal  7  |     |
| ----------- | --- | -------------------------------- | --- | ----------- | --- |
| MDEPRO.TLG  |     | Partitioning at time of logging  |     | decimal  7  |     |

| MDEPRO.SKNR    |     | Shift number (1...4)  |     | smallint  7  |     |
| -------------- | --- | --------------------- | --- | ------------ | --- |
| MDEPRO.SKZEIB  |     | Beginning of shift    |     | integer  7   |     |
| MDEPRO.SKZEIE  |     | End of shift          |     | integer  7   |     |
MDEPRO.SKPDAUER  Total of breaks in this shift  smallint  7
| MDEPRO.SKDATB  |     | Beginning of shift – date  |     | sqldate  7  |     |
| -------------- | --- | -------------------------- | --- | ----------- | --- |

| MDEPRO.EGR:GUTB  |     | Yield in base quantity unit  |     | decimal  7  |     |
| ---------------- | --- | ---------------------------- | --- | ----------- | --- |
Note: delta quantity (no absolute value)
MDEPRO.EGR:GUTP  Yield in primary quantity unit  decimal  7
Note: delta quantity (no absolute value)

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 242 of 356  |     |
| ---------------- | --- | --- | ------------------- | ---------------- | --- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Identification  |     | Description  |     | DB type  Length  |     |
| --------------- | --- | ------------ | --- | ---------------- | --- |

MDEPRO.EGR:GUTS  Yield in secondary quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:GUTT  Yield in tertiary quantity unit  decimal  7
Note: delta quantity (no absolute value)
| MDEPRO.EGR:AUSB  |     | Scrap in base quantity unit  |     | decimal  7  |     |
| ---------------- | --- | ---------------------------- | --- | ----------- | --- |
Note: delta quantity (no absolute value)
MDEPRO.EGR:AUSP  Scrap in primary quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:AUSS  Scrap in secondary quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:AUST  Scrap in tertiary quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:NCHB  Rework quantity in base quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:NCHP  Rework quantity in primary quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:NCHS  Rework quantity in secondary quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:NCHT  Rework quantity in tertiary quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:PRBB  Problem quantity in base quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:PRBP  Problem quantity in primary quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:PRBS  Problem quantity in secondary quantity unit  decimal  7
Note: delta quantity (no absolute value)
MDEPRO.EGR:PRBT  Problem quantity in tertiary quantity unit  decimal  7
Note: delta quantity (no absolute value)
| MDEPRO.EGE:GUTP  |     | Base quantity unit       |     | char  3     |     |
| ---------------- | --- | ------------------------ | --- | ----------- | --- |
| MDEPRO.EGE:GUTP  |     | Primary quantity unit    |     | char  3     |     |
| MDEPRO.EGE:GUTS  |     | Secondary quantity unit  |     | char  3     |     |
| MDEPRO.EGE:GUTT  |     | Tertiary quantity unit   |     | char  3     |     |
| MDEPRO.EGR:HUB   |     | Machine strokes          |     | decimal  7  |     |
Note: delta quantity (no absolute value)
| MDEPRO.CTR:1  |     | Counter 1: yield (parts)  |     | integer  7  |     |
| ------------- | --- | ------------------------- | --- | ----------- | --- |
Note: absolute value (accumulated for the shift)

| MDEPRO.CTR:2  |     | Counter 2: machine strokes  |     | integer  7  |     |
| ------------- | --- | --------------------------- | --- | ----------- | --- |
Note: absolute value (accumulated for the shift)

| MDEPRO.CTR:3  |     | Counter 3: scrap  |     | integer  7  |     |
| ------------- | --- | ----------------- | --- | ----------- | --- |
Note: absolute value (accumulated for the shift)

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 243 of 356  |     |
| ---------------- | --- | --- | ------------------- | ---------------- | --- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| Identification  |     | Description  |     |     | DB type  | Length    |
| --------------- | --- | ------------ | --- | --- | -------- | --------- |

| MDEPRO.CTR:4  |     | Counter 4  |     |     | integer  | 7    |
| ------------- | --- | ---------- | --- | --- | -------- | ---- |
Note: absolute value (accumulated for the shift)
| MDEPRO.CTR:5  |     | Counter 5  |     |     | integer  | 7    |
| ------------- | --- | ---------- | --- | --- | -------- | ---- |
Note: absolute value (accumulated for the shift)
| MDEPRO.CTR:6  |     | Counter 6  |     |     | integer  | 7    |
| ------------- | --- | ---------- | --- | --- | -------- | ---- |
Note: absolute value (accumulated for the shift)

| MDEPRO.BEM  |     | Comment       |              |              | Char   | 60    |
| ----------- | --- | ------------- | ------------ | ------------ | ------ | ----- |
|             |     | The  comment  | is  created  | and  edited  | in  a  |       |
separate table: event_dlg_data
|     |     | The  table  | is  identified  | via  | the  ID  |     |
| --- | --- | ----------- | --------------- | ---- | -------- | --- |
MDEPRO.VERWEIS

Storage:
|     |     | Comment = event_dlg_data.dlg_data  |     |     |     |     |
| --- | --- | ---------------------------------- | --- | --- | --- | --- |
|     |     | Identified via the ID              |     |     |     |     |
|     |     | ereignis. dlg_data_verweis =       |     |     |     |     |
event_dlg_data.verweis
or
|     |     | event_dlg_data.ev_verweis=  |     | ereignis.verweis   |     |     |
| --- | --- | --------------------------- | --- | ------------------ | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 244 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

9  HYDRA Production Data Manager MPL - Data Collection
| 9.1  | Please note for the posting dialogs described  |     |     |     |
| ---- | ---------------------------------------------- | --- | --- | --- |
The HYDRA-MPL dialogs are only useful in connection with the corresponding HYDRA-BDE dialogs
(please also see the associated BDE documentation).
All mandatory fields are highlighted in gray. All other fields are optional and are only processed if they are
filled out.
| 9.2    | Batch Postings            |     |              |     |
| ------ | ------------------------- | --- | ------------ | --- |
| 9.2.1  | Batch change (DLG=CA_WL)  |     |              |     |
| ID     | Type/max. field           |     | Description  |     |
length
| ANR=  | C16    | Order number with operation number     |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  | C10    | alter- Personnel number                |     |     |
native
| KNR=      | C10  | Badge number    |     |     |
| --------- | ---- | --------------- | --- | --- |
| CNR=      | C20  | Batch number    |     |     |
| EGR:GUT=  | DEC  | Recorded yield  |     |     |
| EGE:GUT=  | C4   | Unit of yield   |     |     |
| KLASSE=   | C1   | “G” yield       |     |     |
“A” scrap
“O” on hold
“N” rework
| STA=  | C1  | Status of output batch  |     |     |
| ----- | --- | ----------------------- | --- | --- |
F= with residual quantity (default with KLASSE=G)
S= blocked (default with KLASSE=A)

| ZLO=      | C12  | Target location, output batch  |          |     |
| --------- | ---- | ------------------------------ | -------- | --- |
| EGG:AUS=  | NUM  | Scrap reason KLASSE=A          |          |     |
|           |      |   KLASSE=O                     | EGG:PRB  |     |
|           |      |   KLASSE=N                     | EGG:NCH  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 245 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max. field  |     | Description  |     |
| --- | ---------------- | --- | ------------ | --- |
length
| TPE=       | C10  | Transport unit                 |     |     |
| ---------- | ---- | ------------------------------ | --- | --- |
| LHW=       | C20  | Note, output batch             |     |     |
| CALT1= to  | -    | Alternative batch number 1-20  |     |     |
| CALT20=    |      | max. field length:             |     |     |
CALT1-4   - C20
CALT5-14  - C40
CALT15-18   - C100
CALT19-20   - C512
ATTR:1 = to   --  The definition of which values are filed in additional attributes is
| ATTR:10 =     |      | configured for each material type in HYDRA  |     |     |
| ------------- | ---- | ------------------------------------------- | --- | --- |
| ATTR:101= to  | C40  | Alphanumeric batch attributes               |     |     |
ATTR:140=
| ATTR:201= to  | NUM  | Numeric batch attributes  |     |     |
| ------------- | ---- | ------------------------- | --- | --- |
ATTR:220=
| ATTR:301= to  | DEC  | Decimal batch attributes  |     |     |
| ------------- | ---- | ------------------------- | --- | --- |
ATTR:320=
| CNR.USRFLD   | C8  | User field key  |     |     |
| ------------ | --- | --------------- | --- | --- |
| CNR.FU:1 –   | -   | User fields     |     |     |
CNR.FU:66

Please note:
There are other, similar dialogs regarding output batches (CA_AN & CA_AB) in HYDRA. They are only
required to keep data within the event maintenance function at the console.
To change output batches, the CA_WL dialog always has to be sent! Except for the batch number (CNR)
all information refers to the currently active HYDRA batch, which is to be logged off with this posting. The
batch number defines which ID the HYDRA batch gets that is to be started, once the current HYDRA
batch has been completed.
The same values are supported for log off operation (DLG=A_AB) and interrupt OP (DLG=A_UN).

1) Example: Change batch and indicate the quantity
DLG=CA_WL|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|CNR=X912536177|EGR:
GUT=1|
2) Example: Change batch and indicate the quantity and unit
DLG=CA_WL|USR=2106|DAT=02/17/2000|ZEI=47972|KNR=111111|ANR=AAA2100451210200|CNR=X912536177|EGR:
GUT=1|EGE:GUT=ST|

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 246 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| 9.2.1.1  | Log output batch on (DLG=CA_AN)  |     |              |     |
| -------- | -------------------------------- | --- | ------------ | --- |
| ID       | Type/max. field                  |     | Description  |     |
length
| ANR=  | C16    | Order number with operation number     |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  | C10    | alter- Personnel number                |     |     |
native
| KNR=       | C10  | Badge number                   |     |     |
| ---------- | ---- | ------------------------------ | --- | --- |
| CNR=       | C20  | Batch number                   |     |     |
| CALT1= to  | -    | Alternative batch number 1-20  |     |     |
| CALT20=    |      | max. field length:             |     |     |
CALT1-4   - C20
CALT5-14  - C40
CALT15-18   - C100
CALT19-20   - C512
Please note: Only possible if the operation runs on the machine.
| 9.2.1.2  | Log output batch off (DLG=CA_AB)  |     |              |     |
| -------- | --------------------------------- | --- | ------------ | --- |
| ID       | Type/max. field                   |     | Description  |     |
length
| ANR=  | C16    | Order number with operation number     |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  | C10    | alter- Personnel number                |     |     |
native
| KNR=      | C10  | Badge number    |     |     |
| --------- | ---- | --------------- | --- | --- |
| CNR=      | C20  | Batch number    |     |     |
| EGR:GUT=  | DEC  | Recorded yield  |     |     |
| EGE:GUT=  | C4   | Unit of yield   |     |     |
| KLASSE=   | C1   | “G” yield       |     |     |
“A” scrap
“O” on hold
“N” rework

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 247 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max. field  |     | Description  |     |
| --- | ---------------- | --- | ------------ | --- |
length
| STA=  | C1  | Status of output batch  |     |     |
| ----- | --- | ----------------------- | --- | --- |
F= with residual quantity (default with KLASSE=G)
S= blocked (default with KLASSE=A)

| EGG:AUS=   | NUM  | Scrap reason KLASSE=A          |          |     |
| ---------- | ---- | ------------------------------ | -------- | --- |
|            |      |   KLASSE=O                     | EGG:PRB  |     |
|            |      |   KLASSE=N                     | EGG:NCH  |     |
| ZLO=       | C12  | Destination, output batch      |          |     |
| TPE=       | C10  | Transport unit                 |          |     |
| LHW=       | C20  | Note, output batch             |          |     |
| CALT1= to  | -    | Alternative batch number 1-20  |          |     |
| CALT20=    |      | max. field length:             |          |     |
CALT1-4   - C20
CALT5-14  - C40
CALT15-18   - C100
CALT19-20   - C512
ATTR:1 = to   --  The definition of which values are filed in additional attributes is
| ATTR:10 =     |      | configured for each material type in HYDRA  |     |     |
| ------------- | ---- | ------------------------------------------- | --- | --- |
| ATTR:101= to  | C40  | Alphanumeric batch attributes               |     |     |
ATTR:140=
| ATTR:201= to  | NUM  | Numeric batch attributes  |     |     |
| ------------- | ---- | ------------------------- | --- | --- |
ATTR:220=
| ATTR:301= to  | DEC  | Decimal batch attributes  |     |     |
| ------------- | ---- | ------------------------- | --- | --- |
ATTR:320=
| CNR.USRFLD   | C8  | User field key  |     |     |
| ------------ | --- | --------------- | --- | --- |
| CNR.FU:1 –   | -   | User fields     |     |     |
CNR.FU:66
Please note: Only possible if the operation runs on the machine.
| 9.2.2  | Log input batch on (DLG=CE_AN)  |     |              |     |
| ------ | ------------------------------- | --- | ------------ | --- |
| ID     | Type/max. field                 |     | Description  |     |
length
| ANR=  | C16  | Order number with operation number  |     |     |
| ----- | ---- | ----------------------------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 248 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max. field  |     | Description  |     |
| --- | ---------------- | --- | ------------ | --- |
length
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| PNR=  | C10    | alter- Personnel number                |     |     |
native
| KNR=   | C10                              | Badge number                        |              |     |
| ------ | -------------------------------- | ----------------------------------- | ------------ | --- |
| CNR=   | C20                              | Batch number of the input batch     |              |     |
| SLP    | C10                              | Bill of material item of component  |              |     |
| ATK    | C40                              | Article                             |              |     |
| 9.2.3  | Log input batch off (DLG=CE_AB)  |                                     |              |     |
| ID     | Type/max. field                  |                                     | Description  |     |
length
| ANR=  | C16    | Order number with operation number     |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  | C10    | alter- Personnel number                |     |     |
native
| KNR=  | C10  | Badge number                                |     |     |
| ----- | ---- | ------------------------------------------- | --- | --- |
| CNR=  | C20  | Batch number of input batch                 |     |     |
| LHW=  | C20  | Notes on the input batch to be logged off   |     |     |
| STA=  | C1   | Status of the input batch to be logged off  |     |     |
F = with residual quantity
S = blocked
A = processed
| EGR:REST=  | DEC  | Residual quantity of the input batch    |     |     |
| ---------- | ---- | --------------------------------------- | --- | --- |
| EGE:REST=  | C4   | Unit                                    |     |     |
| SLP        | C10  | Bill of material item of the component  |     |     |
| EGR:VERB=  | DEC  | Consumption of input batch              |     |     |
As an alternative to EGR:REST/EGE:REST
| EGE:VERB=  | C4  | Unit  |     |     |
| ---------- | --- | ----- | --- | --- |
As alternative to EGR:REST/EGE:REST

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 249 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

If a batch is registered several times in parallel as an input batch and the consumption is to be
recorded,  the  fields  EGR:VERB  and  EGE:VERB  must  be  used  for  customer-specific

implementations.

| 9.2.4  | Repost batch (DLG=C_UMB)  |     |              |     |
| ------ | ------------------------- | --- | ------------ | --- |
| ID     | Type/max. field           |     | Description  |     |
length
| ZLO=  | C12    | Destination, output batch              |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
Only if  BEHÄLTERVERWALTUNG (container management) is
active
| CNR=  | C20  | Batch                   |     |     |
| ----- | ---- | ----------------------- | --- | --- |
| DLL=  |      | Batch number via entry  |     |     |
MOD=  C1  K mode: customer batch mode (objective: assignment of another
customer batch)
L mode: Delete mode
V mode: “forward” mode
R mode: “backward” mode
| TECHINFO=  | C20  | Technical info: entry/barcode (mode K only)  |     |     |
| ---------- | ---- | -------------------------------------------- | --- | --- |
Will no longer be supported from MPL 7.2.1 on
ATTR:1=  --  G mode: consecutive number, incremented by the terminal
| ATTR:2=  | --  | G mode: Priority  |     |     |
| -------- | --- | ----------------- | --- | --- |
R mode: Index from continuous counter
| HSDAT=  | mm/dd/yyyy  | All batches of the same date/time  |     |     |
| ------- | ----------- | ---------------------------------- | --- | --- |
(mode R only)
| HSZEIT=  | seconds  | All batches of the same date/time  |     |     |
| -------- | -------- | ---------------------------------- | --- | --- |
(mode R only)
| STA=  | C1  | Status (F)free or (S)blocked, default = F  |     |     |
| ----- | --- | ------------------------------------------ | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 250 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| 9.2.5  | Goods receipt batch (DLG=C_GEN)  |     |              |     |
| ------ | -------------------------------- | --- | ------------ | --- |
| ID     | Type/max. field                  |     | Description  |     |
length
| ANR=  | C16    | Order number with operation number     |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  | C10    | alter- Personnel number                |     |     |
native
| KNR=      | C10  | Badge number            |     |     |
| --------- | ---- | ----------------------- | --- | --- |
| CNR=      | C20  | Batch number (*)        |     |     |
| EGR:GUT=  | N8   | Batch quantity          |     |     |
| EGE:GUT=  | C3   | Unit of batch quantity  |     |     |
| ATK=      | C40  | Material/article        |     |     |
HZTYP=  C10  Material type according to the configuration in HYDRA
| KLASSE=   | C1   | "G" yield or "A" scrap     |     |     |
| --------- | ---- | -------------------------- | --- | --- |
| EGG:AUS=  | N3   | Scrap reason               |     |     |
| ZLO=      | C12  | Destination                |     |     |
| TPE=      | C10  | Transport unit             |     |     |
| LHW=      | C20  | Note, goods receipt batch  |     |     |
Batch status (F = free, S = blocked)
| STA=    | C1  |                                                 |     |     |
| ------- | --- | ----------------------------------------------- | --- | --- |
| QST:2=  | C1  | Quality status (G = blocked, F = free)          |     |     |
| QST=    | C1  | Manual quality status ( G = blocked, F = free)  |     |     |
| MATST=  | C1  | Material status (e.g. V = packed)               |     |     |
Alternative batch number 1-5
| CNR:ALT1 – 5 =  | C20 -40  |     |     |     |
| --------------- | -------- | --- | --- | --- |
maximum lenght:
CNR:ALT1-4   - C20
CNR:ALT5  - C40
MCNR=  C20  Mother batch number (e.g. reference from collective batch)
ATTR:1 = to   --  The definition of which values are filed in additional attributes is
| ATTR:11 =  |     | configured for each material type in HYDRA  |     |     |
| ---------- | --- | ------------------------------------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 251 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max. field  |     | Description  |     |
| --- | ---------------- | --- | ------------ | --- |
length
| ATTR:101= to  | C40  | Alphanumeric batch attributes  |     |     |
| ------------- | ---- | ------------------------------ | --- | --- |
ATTR:140=
| ATTR:201= to  | NUM  | Numeric batch attributes  |     |     |
| ------------- | ---- | ------------------------- | --- | --- |
ATTR:220=
| ATTR:301= to  | DEC  | Decimal batch attributes  |     |     |
| ------------- | ---- | ------------------------- | --- | --- |
ATTR:320=
| RESART=  | C4    | Reservation type (OP = operation, AK = order)  |     |     |
| -------- | ----- | ---------------------------------------------- | --- | --- |
| RESVAL=  | C40   | Reservation value (e.g. operation number)      |     |     |
| RESBEM=  | C100  | Reservation comment                            |     |     |
CNR:BREITE=  DEC  Material width (conversion factor for MPLRF-BP)
CNR:RFAGVFA=  DEC  Mass per unit area (conversion factor for MPLRF-BP)
CNR:RFSTKF=  DEC  Surface per piece (conversion factor for MPLRF-BP)
| CNR:SAPCNR=  | C10  | PPS batch number  |     |     |
| ------------ | ---- | ----------------- | --- | --- |
| CNR:TECHINFO | C20  | Technical info    |     |     |
=
| CNR:VVDAT=   | DATUM  | Availability date      |     |     |
| ------------ | ------ | ---------------------- | --- | --- |
| CNR:VVZEI=   | ZEIT   | Availability time      |     |     |
| CNR:VFDAT=   | DATUM  | Expiry date            |     |     |
| CNR:VFZEI=   | ZEIT   | Expiry time            |     |     |
| CNR:WDAT=    | DATUM  | Warning date           |     |     |
| CNR:WZEI=    | ZEIT   | Warning time           |     |     |
| CNR:LAGORT=  | C12    | PPS storage location   |     |     |
| CNR:EXTCNR=  | C10    | External batch number  |     |     |

(*) = The batch number does not have to be indicated if automatic batch number generation is enabled.
| 9.2.6  | Consumption posting (DLG=A_VERB)  |     |              |     |
| ------ | --------------------------------- | --- | ------------ | --- |
| ID     | Type/max. field                   |     | Description  |     |
length

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 252 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

| ID  | Type/max. field  |     |     | Description  |     |
| --- | ---------------- | --- | --- | ------------ | --- |
length
MNR=  N8/C8  Machine  number  (numeric/alphanumeric)  where  the  OP  is
running
ANR=  C16  Order number with operation number (only running OP possible)
| SLP   | C10  | Bill of material item of the component  |       |     |     |
| ----- | ---- | --------------------------------------- | ----- | --- | --- |
| ATK=  | C40  | Material/article of the component       |       |     |     |
| PNR=  | C10  | alter-                                  | PNR=  |     |     |
native
| KNR=       | C10  |                               | KNR=  |     |     |
| ---------- | ---- | ----------------------------- | ----- | --- | --- |
| EGR:VERB=  | N8   | Consumption quantity          |       |     |     |
| EGE:VERB=  | C3   | Unit of consumption quantity  |       |     |     |
CNR=  C20  Batch number (*) for batch-related input material

* The batch number is only optionally taken over to the consumption movement.

| 9.2.7  | Create/change batches (DLG=CNR.MODIFY)  |     |     |     |     |
| ------ | --------------------------------------- | --- | --- | --- | --- |
By way of the “CNR.MODIFY“ Bapi HYDRA batches can be created or existing batches may be changed.
|     | ID  | Type/max.  |     |     |     |
| --- | --- | ---------- | --- | --- | --- |
Description
field length
| CNR.CNR=       |     | C20  | Internal batch number              |     |     |
| -------------- | --- | ---- | ---------------------------------- | --- | --- |
| CNR.DLL=       |     | C20  | Run-through batch number           |     |     |
| CNR.CNR:Z=     |     | C20  | Target batch number with CNR.COPY  |     |     |
| CNR.ATK=       |     | C40  | Material number                    |     |     |
| CNR.ATKBEZ=    |     | C40  | Material designation               |     |     |
| CNR.SGR:GUT=   |     | DEC  | Batch quantity                     |     |     |
| CNR.SGR:REST=  |     | DEC  | Residual quantity of the batch     |     |     |
| CNR.SGE:GUT=   |     | C3   | Unit of the batch quantity         |     |     |
Machine number
| CNR.MNR=  |     | N8/C8  |     |     |     |
| --------- | --- | ------ | --- | --- | --- |
Order number with operation number
| CNR:ATTR:11=  |     | C40  |     |     |     |
| ------------- | --- | ---- | --- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 253 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

|     | ID  | Type/max.  |     | Description  |     |
| --- | --- | ---------- | --- | ------------ | --- |
field length
| CNR.STA=  |     | C1  | Batch status (F = free, S = blocked)  |     |     |
| --------- | --- | --- | ------------------------------------- | --- | --- |
| CNR.CKL=  |     | C1  | Batch class                           |     |     |
G = yield
A = scrap
O = on hold
N = rework
| CNR.TST=  |     | C1  | Transport status (L = delivered)        |     |     |
| --------- | --- | --- | --------------------------------------- | --- | --- |
| CNR.QST=  |     | C1  | Quality status (G = blocked, F = free)  |     |     |
CNR.QSTMANU=  C1  Manual quality status ( G = blocked, F = free)
| CNR.MATST=      |     | C1   | Material status (e.g. V = packed)  |     |     |
| --------------- | --- | ---- | ---------------------------------- | --- | --- |
| CNR.MATTYPART=  |     | C10  | Material type                      |     |     |
CNR.OPT:REST=  C1  J – “batch has still got residual quantity“ indicator
N – batch has no residual quantity
| CNR.FIR=      |     | C4     | Company                         |     |     |
| ------------- | --- | ------ | ------------------------------- | --- | --- |
| CNR.HSDAT=    |     | DATUM  | Manufacturing date              |     |     |
| CNR.HSZEI=    |     | ZEIT   | Manufacturing time              |     |     |
| CNR.VVDAT=    |     | DATUM  | Availability date               |     |     |
| CNR.VVZEI=    |     | ZEIT   | Availability time               |     |     |
| CNR.VFDAT=    |     | DATUM  | Expiry date                     |     |     |
| CNR.VFZEI=    |     | ZEIT   | Expiry time                     |     |     |
| CNR.WDAT=     |     | DATUM  | Warning date                    |     |     |
| CNR.WZEI=     |     | ZEIT   | Warning time                    |     |     |
| CNR.CSTWDAT=  |     | DATUM  | Date of the last status change  |     |     |
| CNR.CSTWZEI=  |     | ZEIT   | Time of the last status change  |     |     |
| CNR.MATPUF=   |     | C12    | Material buffer                 |     |     |
| CNR.MATTYP=   |     | C10    | Material type                   |     |     |
| CNR.TPE=      |     | C10    | Transport unit                  |     |     |
| CNR.BEM=      |     | C20    | Batch note                      |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 254 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

|     | ID  | Type/max.  |     | Description  |     |
| --- | --- | ---------- | --- | ------------ | --- |
field length
| CNR.PNR=       |     | C10  | Personnel number                            |     |     |
| -------------- | --- | ---- | ------------------------------------------- | --- | --- |
| CNR.TECHINFO=  |     | C20  | Technical info                              |     |     |
| CNR.EGG:AUS=   |     | N8   | Scrap reason                                |     |     |
| CNR.GR=        |     | N8   | Scrap reason (synonymous with CNR.EGG:AUS)  |     |     |
| CNR.GRTXT=     |     | N8   | Reference to scrap reason text              |     |     |
| CNR.USR=       |     | N8   | User number                                 |     |     |
| CNR.LAGORT=    |     | C12  | PPS storage location                        |     |     |
| CNR.LAGPZ=     |     | C12  | PPS storage bin                             |     |     |
| CNR.SAPCNR=    |     | C10  | PPS batch number                            |     |     |
CNR.RESART=  C4  Reservation type (OP = operation, AK = order)
| CNR.RESVAL=  |     | C40   | Reservation value (e.g. operation number)  |     |     |
| ------------ | --- | ----- | ------------------------------------------ | --- | --- |
| CNR.RESBEM=  |     | C100  | Reservation comment                        |     |     |
CNR.BREITE=  DEC  Material width (conversion factor for MPLRF-BP)
CNR.RFAGVFA=  DEC  Mass per unit area (conversion factor for MPLRF-BP)
CNR.RFSTKF=  DEC  Surface per piece (conversion factor for MPLRF-BP)
| CNR.EGR:1 – 6=       |     | DEC  | Quantity, activity 1-6           |     |     |
| -------------------- | --- | ---- | -------------------------------- | --- | --- |
| CNR.RGR:1 – 6 =      |     | DEC  | Residual quantity, activity 1-6  |     |     |
| CNR.EGE:1 – 6 =      |     | C3   | Unit, activity 1-6               |     |     |
| CNR.CNR:ALT1 – 20 =  |     | C20  | Alternative batch number 1-20    |     |     |
| CNR.EXTCNR=          |     | C10  | External batch number            |     |     |
CNR.MCNR=  C20  Mother batch number (e.g. reference from collective batch)
| CNR.AUART=  |     | C5  | Order type  |     |     |
| ----------- | --- | --- | ----------- | --- | --- |
CNR.UMRFAKTP:Z=  DEC  Denominator – conversion factor relating to OP quantity units
CNR.UMRFAKTP:N=  DEC  Numerator – conversion factor relating to OP quantity units
CNR.UMRFAKTS:Z=  DEC  Denominator – conversion factor relating to OP quantity units
CNR.UMRFAKTS:N=  DEC  Numerator – conversion factor relating to OP quantity units
CNR.UMRFAKTT:Z=  DEC  Denominator – conversion factor relating to OP quantity units

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 255 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

|     | ID  | Type/max.  |     | Description  |     |
| --- | --- | ---------- | --- | ------------ | --- |
field length
CNR.UMRFAKTT:N=  DEC  Numerator – conversion factor relating to OP quantity units
CNR.ZUORD:1 – 6 =  C1  Indicator to assign “MPL activity account  ADE quantity unit
(e.g. P = primary quantity)
| ATTR:101 -  |     | C40  | Alphanumeric batch attributes  |     |     |
| ----------- | --- | ---- | ------------------------------ | --- | --- |
ATTR:140
| ATTR:201 -  |     | NUM  | Numeric batch attributes  |     |     |
| ----------- | --- | ---- | ------------------------- | --- | --- |
ATTR:220
| ATTR:301 -  |     | DEC  | Decimal batch attributes  |     |     |
| ----------- | --- | ---- | ------------------------- | --- | --- |
ATTR:320
| CNR.USRFLD   |     | C8  | User field key  |     |     |
| ------------ | --- | --- | --------------- | --- | --- |
| CNR.FU:1 –   |     | -   | User fields     |     |     |
CNR.FU:66
| 9.2.8  | Goods movement (DLG=C_MBEW)   |     |     |     |     |
| ------ | ----------------------------- | --- | --- | --- | --- |
Using the command DLG=C_MBEW batches may be created or reposted. Moreover, the quantity and
status of an existing batch may be changed as well.
|     | ID  | Type/max.  |     | Description  |     |
| --- | --- | ---------- | --- | ------------ | --- |
field length
| ANR=  |     | C16    | Order number with operation number     |     |     |
| ----- | --- | ------ | -------------------------------------- | --- | --- |
| MNR=  |     | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  |     | C10    | alt Personnel number                   |     |     |
er-
| KNR=  |     | C10  | nat Badge number  |     |     |
| ----- | --- | ---- | ----------------- | --- | --- |
ive
| CNR=      |     | C20  | Batch number (*)  |     |     |
| --------- | --- | ---- | ----------------- | --- | --- |
| SGR:GUT=  | /   | DEC  | Batch quantity    |     |     |
| EGR:GUT=  | /   |      |                   |     |     |
RGR:GUT – change residual quantity only
RGR:GUT=
| SGE:GUT=  | /   | C3  | Unit of batch quantity  |     |     |
| --------- | --- | --- | ----------------------- | --- | --- |
| EGE:GUT=  | /   |     |                         |     |     |
RGE:GUT – change residual quantity only
RGE:GUT=
| ATK=     |     | C40  | Material/article      |     |     |
| -------- | --- | ---- | --------------------- | --- | --- |
| ATKBEZ=  |     | C40  | Material designation  |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 256 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

|     | ID  | Type/max.  |     | Description  |     |
| --- | --- | ---------- | --- | ------------ | --- |
field length
| HZTYP=       |     | C10  | Material type of the batch                      |     |     |
| ------------ | --- | ---- | ----------------------------------------------- | --- | --- |
| KLASSE=      |     | C1   | "G" yield or “A” scrap                          |     |     |
| EGG:AUS=     |     | N3   | Scrap reason with KLASSE=A                      |     |     |
| STA=         |     | C1   | Status (F) free or (S) blocked, by default = F  |     |     |
| QST=         |     | C1   | Manual quality status (G – blocked, F – free)   |     |     |
| MATST=       |     | C1   | Material status (e.g. V = packed)               |     |     |
| ZLO=         |     | C12  | Destination                                     |     |     |
| CNR:LAGORT=  |     | C12  | PPS storage location                            |     |     |
| TPE=         |     | C10  | Transport unit                                  |     |     |
| LHW= / BEM=  |     | C20  | Note/comment                                    |     |     |
ATTR:1 = to   --  The definition of which values are filed in additional attributes
| ATTR:11 =       |     |      | is defined for each material type in HYDRA  |     |     |
| --------------- | --- | ---- | ------------------------------------------- | --- | --- |
| CNR:ALT1 – 5 =  |     | C20  | Alternative batch number 1-5                |     |     |
| EXTCNR=         |     | C10  | External batch number                       |     |     |
MCNR=  C10  Mother batch number (e.g. reference from collective batch)
| CNR:HSDAT=  |     | DATUM  | Manufacturing date                             |     |     |
| ----------- | --- | ------ | ---------------------------------------------- | --- | --- |
| CNR:HSZEI=  |     | ZEIT   | Manufacturing time                             |     |     |
| CNR:VVDAT=  |     | DATUM  | Availability date                              |     |     |
| CNR:VVZEI=  |     | ZEIT   | Availability time                              |     |     |
| CNR:VFDAT=  |     | DATUM  | Expiry date                                    |     |     |
| CNR:VFZEI=  |     | ZEIT   | Expiry time                                    |     |     |
| CNR:WDAT=   |     | DATUM  | Warning date                                   |     |     |
| CNR:WZEI=   |     | ZEIT   | Warning time                                   |     |     |
| SAPCNR=     |     | C10    | PPS batch number                               |     |     |
| RESART=     |     | C4     | Reservation type (OP = operation, AU = order)  |     |     |
| RESVAL=     |     | C40    | Reservation value ( e.g. operation number)     |     |     |
| RESBEM=     |     | C100   | Reservation comment                            |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 257 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

|     | ID  | Type/max.  |     | Description  |     |
| --- | --- | ---------- | --- | ------------ | --- |
field length
CNR:BREITE=  DEC  Material width (conversion factor with MPLRF-BP)
CNR:RFAGVFA=  DEC  Mass per unit area (conversion factor with MPLRF-BP)
CNR:RFSTKF=  DEC  Surface per piece (conversion factor with MPLRF-BP)
UMRFAKTP:Z=  DEC  Denominator – conversion factor relating to OP quantity units
UMRFAKTP:N=  DEC  Numerator – conversion factor relating to OP quantity units
UMRFAKTS:Z=  DEC  Denominator – conversion factor relating to OP quantity units
UMRFAKTS:N=  DEC  Numerator – conversion factor relating to OP quantity units
UMRFAKTT:Z=  DEC  Denominator – conversion factor relating to OP quantity units
UMRFAKTT:N=  DEC  Numerator – conversion factor relating to OP quantity units
ZUORD:1 – 6 =  C1  Indicator to assign “MPL activity account  ADE quantity unit
(e.g. P = primary quantity)
| MENGE1 – MENGE6 =  |     | DEC  | Activity 1-6                   |     |     |
| ------------------ | --- | ---- | ------------------------------ | --- | --- |
| EINH1 – EINH6=     |     | C3   | Unit of activity 1-6           |     |     |
| ATTR:101= to       |     | C40  | Alphanumeric batch attributes  |     |     |
ATTR:140=
| ATTR:201= to  |     | NUM  | Numeric batch attributes  |     |     |
| ------------- | --- | ---- | ------------------------- | --- | --- |
ATTR:220=
| ATTR:301= to  |     | DEC  | Decimal batch attributes  |     |     |
| ------------- | --- | ---- | ------------------------- | --- | --- |
ATTR:320=
| 9.2.9  | Change batch status (DLG=C_STA)   |     |     |     |     |
| ------ | --------------------------------- | --- | --- | --- | --- |
The status of an existing batch can be changed using the DLG=C_STA command.
|     | ID  | Type/max.  |     | Description  |     |
| --- | --- | ---------- | --- | ------------ | --- |
field length
| ANR=  |     | C16    | Order number with operation number     |     |     |
| ----- | --- | ------ | -------------------------------------- | --- | --- |
| MNR=  |     | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  |     | C10    | alt Personnel number                   |     |     |
er-
nat
| KNR=  |     | C10  | Badge number  |     |     |
| ----- | --- | ---- | ------------- | --- | --- |
ive

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 258 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|     | ID  | Type/max.  |     | Description  |     |     |
| --- | --- | ---------- | --- | ------------ | --- | --- |
field length
| CNR=            |     | C20  | Batch number                                    |     |     |     |
| --------------- | --- | ---- | ----------------------------------------------- | --- | --- | --- |
| KLASSE=         |     | C1   | "G" yield or “A” scrap                          |     |     |     |
| STA=            |     | C1   | Status (F) free or (S) blocked, by default = F  |     |     |     |
| QST=            |     | C1   | Manual quality status (G – blocked, F – free)   |     |     |     |
| MATST=          |     | C1   | Material status (e.g. V = packed)               |     |     |     |
| EGG:AUS= / GR=  |     | N3   | Scrap reason with KLASSE = A                    |     |     |     |

| 9.2.10  | Input batch change (DLG=CE_WL)   |     |     |     |     |     |
| ------- | -------------------------------- | --- | --- | --- | --- | --- |
Input batches can be changed using the command DLG=CE_WL. Input batches are always changed with
respect to the bill of material.

|     | ID  Type/max. field  |     |     | Description  |     |     |
| --- | -------------------- | --- | --- | ------------ | --- | --- |
length
| ANR  | C16    |     | Order number with operation number     |     |     |     |
| ---- | ------ | --- | -------------------------------------- | --- | --- | --- |
| MNR  | N8/C8  |     | Machine number (numeric/alphanumeric)  |     |     |     |
| PNR  | C10    |     | alter- Personnel number                |     |     |     |
native
| KNR  | C10  |     | Badge number  |     |     |     |
| ---- | ---- | --- | ------------- | --- | --- | --- |
CNRAB  C20  Batch number of the input batch to be logged OFF
| CNR  | C20  |     | Batch number of the input batch to be logged ON  |     |     |     |
| ---- | ---- | --- | ------------------------------------------------ | --- | --- | --- |
SLP  C10  Bill of material item of the component (if not transferred the BOM
item (SLP) is set to 0)
| ATK  | C40  |     | Article                                     |     |     |     |
| ---- | ---- | --- | ------------------------------------------- | --- | --- | --- |
| LHW  | C20  |     | Note on the input batch to be logged off    |     |     |     |
| STA  | C1   |     | Status of the input batch to be logged off  |     |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 259 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max. field  |     | Description  |     |
| --- | ---------------- | --- | ------------ | --- |
length
F= with residual quantity
S= blocked
A= processed
EGR:REST  N8  Remaining quantity of the input batch to be logged off
| EGE:REST  | C4  | Unit of remaining quantity  |     |     |
| --------- | --- | --------------------------- | --- | --- |
| EGR:VERB  | N8  | Consumption of input batch  |     |     |
Alternative to EGR:REST/EGE:REST
| EGE:VERB  | C4  | Unit  |     |     |
| --------- | --- | ----- | --- | --- |
Alternative to EGR:REST/EGE:REST

| 9.3    | Reading of MPL Data                |     |     |     |
| ------ | ---------------------------------- | --- | --- | --- |
| 9.3.1  | Material list / batch information  |     |     |     |
The material/batch list is provided by the command DLG=LIST;13 and filed in the HYDRADIR\spool\
directory.

Structure of dialog data:
“DLG=LIST;13|DATEI={file name }|DAT=...|ZEI=...|USR=...|MOD=...“
a.) Reading of the material list for machine and order:
| Parameter:   | MOD=M|MNR=Machine|ANR=Order number  |     |     |     |
| ------------ | ----------------------------------- | --- | --- | --- |
 Machine is required for still running batches
 Order is required for planned materials (if necessary with batch assignment) of the order
b.) Reading of the batch info:
| Parameter:   | MOD=L|CNR=batch number  |     |     |     |
| ------------ | ----------------------- | --- | --- | --- |
c.) Reading of preceding batches (output batches) of an order (including the current output batch):
| Parameter:   | MOD=A|ANR=order number  |     |     |     |
| ------------ | ----------------------- | --- | --- | --- |
d.) Running batches of all machines of the terminal

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 260 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| Parameter:                             | MOD=T   |                    |     |                             |              |     |
| -------------------------------------- | ------- | ------------------ | --- | --------------------------- | ------------ | --- |
| The list includes the following data:  |         |                    |     |                             |              |     |
|                                        | ID      | Field designation  |     |                             | Description  |     |
| MNR                                    |         | Machine            |     | Machine number              |              |     |
| ANR                                    |         | Order              |     | Order and OP [and type]     |              |     |
| ATK                                    |         | Article            |     | Input material number (**)  |              |     |
ATKBEZ  Des. of final article  Designation of input material (**)
HZTYP  Semi-finished article type  Semi-finished article type (**)
| SLP  |     | BOM item  |     | Bill of material item (*)  |     |     |
| ---- | --- | --------- | --- | -------------------------- | --- | --- |
EMENGE  Required quantity  Quantity  of  required  material  for
each unit of the output material (*)
| EINH      |     | Unit               |     | Unit of required quantity (**)        |     |     |
| --------- | --- | ------------------ | --- | ------------------------------------- | --- | --- |
| TECHINFO  |     | Techn.Info         |     | Technical info relating to mat. (**)  |     |     |
| DLL       |     | Cs. ba. No.        |     | Run-through batch number              |     |     |
| DLLKZ     |     | Cs.-batch ID       |     | Run-through batch ID                  |     |     |
| CNR       |     | Batch number       |     | Batch number (***)                    |     |     |
| LHW       |     | Batch note         |     | Batch note (***)                      |     |     |
| TPE       |     | TPUnit [spec.]     |     | Transport unit (***)                  |     |     |
| HSDAT     |     | Manuf. date        |     | Manufacturing: date (***)             |     |     |
| HSZEI     |     | Manuf. time        |     | Manufacturing: time (***)             |     |     |
| VVDAT     |     | Date availability  |     | Availability: date (***)              |     |     |
| VVZEI     |     | Time availability  |     | Availability: time (***)              |     |     |
| VFDAT     |     | Date expiry        |     | Date of expiry: date (***)            |     |     |
| VFZEI     |     | Time expiry        |     | Date of expiry: time (***)            |     |     |
| WARNDAT   |     | Warning date       |     | Warning date (***)                    |     |     |
|           |     | Warning time       |     | Warning time (***)                    |     |     |
WARNZEI
| SGR:GUT  |     | Target  |     | Batch quantity (***)  |     |     |
| -------- | --- | ------- | --- | --------------------- | --- | --- |
= Target quantity for input batches

|     |     |     |     | =  Recorded   | quantity  for  | output  |
| --- | --- | --- | --- | ------------- | -------------- | ------- |
|     |     |     |     | batches pos.  | booking  as    | output  |
batch
| SGR:REST  |     | Residue  |     | Remaining quantity of the batch (***)  |     |     |
| --------- | --- | -------- | --- | -------------------------------------- | --- | --- |
|           |     |          |     | = Actual quantity of the batch:        |     |     |
- when logging output batch off or
|     |     |     |     | transferring                   |     | it   |
| --- | --- | --- | --- | ------------------------------ | --- | ---- |
|     |     |     |     |   SS == quantity of batch      |     |      |
|     |     |     |     | - neg. booking as input batch  |     |      |
RMENGEKZ
|     |     | RQ  |     | Remaining quantity indicator (***)  |     |     |
| --- | --- | --- | --- | ----------------------------------- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 261 of 356  |     |
| ---------------- | --- | --- | ------------------- | --- | ---------------- | --- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

| ALTMENGE  |     | Alt.qty   |     | Alternative quantity (***)       |     |
| --------- | --- | --------- | --- | -------------------------------- | --- |
|           |     | Alt.unit  |     | Alternative quantity unit (***)  |     |
ALTEINH
|     |     | Destination  |     | Destination (***)  |     |
| --- | --- | ------------ | --- | ------------------ | --- |
ZLO
| CST      |     | Batch status   |     | Batch status (***)           |     |
| -------- | --- | -------------- | --- | ---------------------------- | --- |
| CSTWDAT  |     | Batch ch.date  |     | Date of status change (***)  |     |
| CSTWZEI  |     | Batch ch.time  |     | Time of status change (***)  |     |
|          |     | PersNo.        |     | Personnel number (***)       |     |
PNR
LogoffID
| ABKZ  |     |     |     | Logoff ID (****)  |     |
| ----- | --- | --- | --- | ----------------- | --- |
“X“ for forced logoff
| AGCST  |     | OPBST  |     | Batch status of operation:  |     |
| ------ | --- | ------ | --- | --------------------------- | --- |
0   Batch is currently not logged on
to order (preceding batches)
1  Batch is currently logged on to
order
| ATTR:1 to  |     |     |     | Customer-specific      |     |
| ---------- | --- | --- | --- | ---------------------- | --- |
| ATTR:11    |     |     |     | Batch attribute 1 to   |     |
Batch attribute 11
| HZBEZ           |     | Material type des.              |     |     |     |
| --------------- | --- | ------------------------------- | --- | --- | --- |
| MINLGZ          |     | Min. storage time               |     |     |     |
| WARNGRENZ       |     | Warning limit                   |     |     |     |
| VFALLGRENZ      |     | Expiry limit                    |     |     |     |
| HZART           |     | SF type                         |     |     |     |
| LOSGR           |     | Lot size                        |     |     |     |
| LOSEINH         |     | Unit                            |     |     |     |
| LAY             |     | Layout                          |     |     |     |
| TICKETANZ       |     | Number of tickets               |     |     |     |
| OPT:VFCNRA      |     | Expiry date from input batch    |     |     |     |
| OPT:VFCNRE      |     | Expiry date for output batch    |     |     |     |
| OPT:MULTICNR    |     | Can be logged on several times  |     |     |     |
| OPT:INBESTVERB  |     | Invent. char.                   |     |     |     |
| PROZAGAB        |     | Tolerance limit AGAB            |     |     |     |
| UTGAGAB         |     | abs. tolerance limit AGAB       |     |     |     |
| OPT:VERE        |     | Hand batch no. down             |     |     |     |
OPT:AGZGVERB  REB-OP-Ref.  OP  reference  when  batches  are
|              |     |             |     | reposted                         |     |
| ------------ | --- | ----------- | --- | -------------------------------- | --- |
| OPT:AGZGGEN  |     | GR-OP-Ref.  |     | OP reference when goods receipt  |     |
batches are created
| PLAUS:MATOK  |     | Plaus. MatOK  |     |     |     |
| ------------ | --- | ------------- | --- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 262 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

| PLAUS:EMATOK        |     | Plaus. EMatOK            |     |                                     |     |
| ------------------- | --- | ------------------------ | --- | ----------------------------------- | --- |
| OPT:CNREA           |     | Valid for 1 outp. batch  |     |                                     |     |
| LOCAL:1 to LOCAL:2  |     | LOCAL                    |     |                                     |     |
| CKL                 |     | Class                    |     |                                     |     |
| EGG:AUS             |     | Scrap reason             |     |                                     |     |
| TST                 |     | Transport status         |     |                                     |     |
| ART                 |     | Indic.                   |     |                                     |     |
| SCHNEIDNR           |     | Cut number               |     |                                     |     |
| SLOS                |     | Collective batch         |     |                                     |     |
| LOSANZ              |     | No. of batches           |     |                                     |     |
| PBANDNR             |     | Prod. line no.           |     |                                     |     |
| CNR:RESVAL          |     | Reservation              |     |                                     |     |
| TR:BREITE           |     | Width of DR              |     |                                     |     |
| TR:ANZ_GES          |     | Total no. outp. batches  |     |                                     |     |
| ISTATK              |     | Material                 |     |                                     |     |
| ISTATKBEZ           |     | Material des.            |     |                                     |     |
| ATKDIFF             |     | Art. diff.               |     | Planned article and actual article  |     |
are different (J/N/F)
J:  different
N:  not different
F:  free component
| ISTANR      |     | Order                        |     |     |     |
| ----------- | --- | ---------------------------- | --- | --- | --- |
| ATK:2       |     | 2nd material                 |     |     |     |
| BEDARF      |     | Requirement quantity         |     |     |     |
| VERB        |     | Consumption                  |     |     |     |
| TREST       |     | Theo. remain. requirements   |     |     |     |
| REST:VZ     |     | Sign                         |     |     |     |
| STA_KOMBI   |     | Combined status              |     |     |     |
| SAPCNR      |     | SAP batch                    |     |     |     |
| OPT:VGRCNR  |     | Required qty. batch-related  |     |     |     |
| OPT:ERSBAR  |     | Replaceable                  |     |     |     |
OPT:WZW  Bat.change req.  If the input batch of this component
is changed the output batch needs
to be changed.
| STA:GEW   |     | Entry of weight        |     |     |     |
| --------- | --- | ---------------------- | --- | --- | --- |
| AGBEZ.|   |     | Des. of final article  |     |     |     |
| LS1       |     | Activity 1             |     |     |     |
| LS1:REST  |     | Rem. quantity 1        |     |     |     |
| LS1:EINH  |     | Unit 1                 |     |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 263 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | --- | ------------------------ |

| .....         |     | ....                    |     |     |     |
| ------------- | --- | ----------------------- | --- | --- | --- |
| LS6           |     | Activity 6              |     |     |     |
| LS6:REST      |     | Rem. quantity 6         |     |     |     |
| LS6:EINH      |     | Unit 6                  |     |     |     |
| EGR:LEN       |     | Rework                  |     |     |     |
| SLS           |     | Level                   |     |     |     |
| SLS:M         |     | Mother level            |     |     |     |
| BEM           |     | Comment                 |     |     |     |
| ALT1 to ALT5  |     | Altern. batch no. 1 to  |     |     |     |
altern. batch no. 5
| SNR      |     | Serial number  |     | (*****)  |     |
| -------- | --- | -------------- | --- | -------- | --- |
| HULEVEL  |     | HU level       |     | (*****)  |     |

(*) = Fields are not filled out for information relating to batches!!!
(**) = When it comes to information based on batches, the field is determined from the pool of batches,
otherwise from material data.
(***) = Fields are not filled out if no batch is currently logged on for input material!!!
 (****) = The batch number is determined subject to the command:
Command (a): Available batches and the materials planned for the order are read for the machine
(without batch that is currently logged on).
Command (b): is transferred!
Command (c): output batch number
Example:
DLG=LIST;13|MOD=A|ANR=001122330020|DAT=10/11/2000|ZEI=40000|USR=101|DATEI=
./spool/ml_list.101|

(*****) = Only available as of HYDRA-MPL product version 7.2.5.
| 9.3.2  | Material buffer  |     |     |     |     |
| ------ | ---------------- | --- | --- | --- | --- |
The  list  of  material  buffers  is  provided  using  the  command  DLG=LIST;49  and  filed  in  the
HYDRADIR\spool\ directory.
Structure of dialog data:
“DLG=LIST;49|DATEI={file name }|DAT=...|ZEI=...|USR=...|...“
| Parameter:   | none  |     |     |     |     |
| ------------ | ----- | --- | --- | --- | --- |
The list includes the following data:

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 264 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|                 | ID  | Field designation           |     |     | Description  |     |
| --------------- | --- | --------------------------- | --- | --- | ------------ | --- |
| MATPUF          |     | Material buffer             |     |     |              |     |
| BEZ             |     | Designation                 |     |     |              |     |
| OPT:PKORB       |     | Wastebasket                 |     |     |              |     |
| OPT:INBESTVERB  |     | Calculate as inventory      |     |     |              |     |
| ART             |     | Buffer model                |     |     |              |     |
| OPT:LAGVERB     |     | Stock posting buffer        |     |     |              |     |
| OPT:VIRTLAG     |     | Virtual stock buffer        |     |     |              |     |
| ABT             |     | Department                  |     |     |              |     |
| BER             |     | Area                        |     |     |              |     |
| KST             |     | Cost center                 |     |     |              |     |
| FIR             |     | Company                     |     |     |              |     |
| LAGORT          |     | Storage location            |     |     |              |     |
| BEM             |     | Comment                     |     |     |              |     |
| DAUER           |     | Duration                    |     |     |              |     |
| TYP             |     | Buffer type                 |     |     |              |     |
| ZLO             |     | Receiving storage location  |     |     |              |     |
| MPUFF           |     | Material buffer             |     |     |              |     |
| HARCMATPUF      |     | Hierarchical buffer         |     |     |              |     |
Example:
DLG=LIST;49|DAT=02/11/2005|ZEI=40000|USR=101|DATEI= ./spool/mpuff_list.101|
| 9.3.3  | Material types  |     |     |     |     |     |
| ------ | --------------- | --- | --- | --- | --- | --- |
Material  types  are  provided  using  the  command  DLG=LIST;21  and  filed  in  the  HYDRADIR\spool\
directory.

Structure of dialog data:
“DLG= LIST;21|DATEI={file name}|DAT=...|ZEI=...|USR=...“
| Parameter:   | AKRO=<dyn. user field columns e.g. AKRO=FU:23>  |     |     |     |     |     |
| ------------ | ----------------------------------------------- | --- | --- | --- | --- | --- |
The list includes the following data:
|            | ID  | Field designation   |     |                                   | Description  |     |
| ---------- | --- | ------------------- | --- | --------------------------------- | ------------ | --- |
| HZTYP      |     | Material type       |     | Material type                     |              |     |
| HZBEZ      |     | Material type des.  |     | Designation of the material type  |              |     |
| MINLGZ     |     | Min. storage time   |     | Minimum storage time              |              |     |
| WARNGRENZ  |     | Warning limit       |     | Warning limit                     |              |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 265 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|             | ID  | Field designation  |     |                                      | Description  |     |
| ----------- | --- | ------------------ | --- | ------------------------------------ | ------------ | --- |
| VFALLGRENZ  |     | Expiry limit       |     | Expiry limit                         |              |     |
| HZART       |     | SF type            |     | Material type                        |              |     |
| LOSGR       |     | Lot size           |     | Standard lot size that is suggested  |              |     |
as “default value” for a new
generation
| EINH       |     | Unit               |     | Unit                                     |     |     |
| ---------- | --- | ------------------ | --- | ---------------------------------------- | --- | --- |
| LAY        |     | Layout             |     | Layout that is used for ticket printing  |     |     |
| TICKETANZ  |     | Number of tickets  |     | Number of tickets                        |     |     |
OPT:VFCNRA  Expiry date from input batch  Flag whether the individual expiry
date can be used to determine the
expiry date of the output batch.
OPT:VFCNRE  Expiry date for output batch  Flag whether the least expiry date of
appropriate batches is to be used to
determine the individual expiry date.
OPT:MULTICNR  Can be logged on several  Flag whether identical material types
|     |     | times  |     | can be logged on several times.  |     |     |
| --- | --- | ------ | --- | -------------------------------- | --- | --- |
OPT:INBESTVERB  Invent. char.  Flag for inventory management
PROZAGAB  Tolerance limit AGAB  Tolerance limit for OP off (%)
UTGAGAB  abs. tolerance limit AGAB  Absolute value for tolerance limit
OPT:VERE  Hand batch no. down  Flag for inheriting the batch number
| OPT:AGZGVERB  |     | REB-OP-Ref.  |     | Flag whether an OP reference is  |     |     |
| ------------- | --- | ------------ | --- | -------------------------------- | --- | --- |
|               |     |              |     | required when reposting batches  |     |     |
| OPT:AGZGGEN   |     | GR-OP-Ref.   |     | Flag whether an OP reference is  |     |     |
required when generating batches
PLAUS:MATOK  Plaus. MatOK  Flag whether all input batches need
to be logged on for booking a batch
| PLAUS:EMATOK  |     | Plaus. EMatOK  |     |     |     |     |
| ------------- | --- | -------------- | --- | --- | --- | --- |
OPT:CNREA  Valid for 1 outp. batch  Flag whether input batch exactly
applies for 1 output batch
| TPE         |     | Transp. unit                 |     | Transport unit  |     |     |
| ----------- | --- | ---------------------------- | --- | --------------- | --- | --- |
| OPT:VGRCNR  |     | Required qty. batch-related  |     | MPLRF:          |     |     |
Material usage relating to output
batch or operation
| OPT:SNR    |     | Serial numbers required  |     | default=N (*)  |     |     |
| ---------- | --- | ------------------------ | --- | -------------- | --- | --- |
| OPT:GENHU  |     | Generation of HU         |     | default=N (*)  |     |     |

Example:
  DLG=LIST;21|DATEI=./spool/hztyp_list.101|DAT=08/16/2007|ZEI=46918|USR=2101
(*) = Only available as of HYDRA-MPL product version 7.2.5

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 266 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| 9.3.4  | Transport unit  |     |     |     |     |     |
| ------ | --------------- | --- | --- | --- | --- | --- |
Transport units  are provided  using the command DLG=LIST;52 and filed in the  HYDRADIR\spool\
directory.

Structure of dialog data:
“DLG=LIST;52|DATEI={file name}|DAT=...|ZEI=...|USR=...“
| Parameter:   | none  |     |     |     |     |     |
| ------------ | ----- | --- | --- | --- | --- | --- |
The list includes the following data:
|              | ID  | Field designation       |     |                                | Description  |     |
| ------------ | --- | ----------------------- | --- | ------------------------------ | ------------ | --- |
| HZTYP        |     | Material type           |     | Material type                  |              |     |
| TPE          |     | Transp. unit            |     | Transport unit                 |              |     |
| BEZ          |     | Transp. unit des.       |     | Designation of transport unit  |              |     |
| VORG         |     | Default transp. Unit    |     | “Default” transport unit       |              |     |
| ANZ          |     | Lot size                |     | Lot size                       |              |     |
| EINH         |     | Unit                    |     | Unit                           |              |     |
| INBESTVERB   |     | Invent. char.           |     | Inventory flag                 |              |     |
| TPE.ANZ      |     | No. of transport units  |     | Number of transport units      |              |     |
| BREITE       |     | Width                   |     | Width dimension                |              |     |
| BREITE:EINH  |     | Width unit              |     | Width dimension unit           |              |     |
| HOEHE        |     | Height                  |     | Height dimension               |              |     |
| HOEHE:EINH   |     | Height unit             |     | Height dimension unit          |              |     |
| LEN          |     | Length                  |     | Length dimension               |              |     |
| LEN:EINH     |     | Length unit             |     | Length dimension unit          |              |     |
| GEW          |     | Weight                  |     | Weight dimension               |              |     |
| GEW:EINH     |     | Weight unit             |     | Weight dimension unit          |              |     |
| COLOR:F      |     | Foreground color        |     | Foreground text color          |              |     |
| COLOR:B      |     | Background color        |     | Background color               |              |     |

Example:
  DLG=LIST;52|DATEI=./spool/tpe_list.101|DAT=08/16/2007|ZEI=46918|USR=2101
| 9.3.5  | Component list  |     |     |     |     |     |
| ------ | --------------- | --- | --- | --- | --- | --- |
Components are provided by the command DLG=LIST;74 and filed in the HYDRADIR\spool\ directory.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 267 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

Structure of dialog data:
“DLG=LIST;74|DATEI={file name}|DAT=...|ZEI=...|USR=...“
| Parameter:   | ANR=order number  |     |     |     |     |     |
| ------------ | ----------------- | --- | --- | --- | --- | --- |
 Order is required for planned materials (if necessary incl. batch assignment) of the order.
The list includes the following data:
|        | ID  | Field designation  |     |                    | Description  |     |
| ------ | --- | ------------------ | --- | ------------------ | ------------ | --- |
| ART    |     | Type               |     | Component type     |              |     |
| ATK    |     | Article            |     | Material number    |              |     |
| BEZ    |     | Designation        |     | Customer-specific  |              |     |
| BEZ:2  |     | Designation        |     | Customer-specific  |              |     |
SGR:GUT  Required quantity  Required quantity relating to the
production of 1 article in primary
quantity unit at the operation
| MENGE:BED  |     | Demand   |     | Requirements quantity         |     |     |
| ---------- | --- | -------- | --- | ----------------------------- | --- | --- |
| SGE:GUT    |     | Unit     |     | Unit of required quantity     |     |     |
| ATKBEZ     |     | Article  |     | Designation of the component  |     |     |
(material, document, etc.)
| SLP  |     | BOM item  |     | Position of components (bill of  |     |     |
| ---- | --- | --------- | --- | -------------------------------- | --- | --- |
material item)
| LAGORT  |     | Storage location  |     | Storage location SAP or storage  |     |     |
| ------- | --- | ----------------- | --- | -------------------------------- | --- | --- |
type
| LAGPZ  |     | Rack compartment  |     | Storage bin SAP              |     |     |
| ------ | --- | ----------------- | --- | ---------------------------- | --- | --- |
| PATH   |     | Path              |     | For documents: reference to  |     |     |
HY_PATH
| DATEI   |     | File name  |     | For documents: file name  |     |     |
| ------- | --- | ---------- | --- | ------------------------- | --- | --- |
| RESTYP  |     | Type       |     | MAT = material            |     |     |

Example:
  DLG=LIST;74|ANR=TEST1|DATEI=./spool/komp_list.101|DAT=08/16/2007|ZEI=46918|USR=210
1
| 9.3.6  | Batch attributes of a material type  |     |     |     |     |     |
| ------ | ------------------------------------ | --- | --- | --- | --- | --- |
Batch attributes are provided using the command DLG=LIST;67 and filed in the HYDRADIR\spool\
directory.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 268 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

Table: hz_atgen

Structure of dialog data:
“DLG=LIST;67|DATEI={file name}|DAT=...|ZEI=...|USR=...|MOD=...| MOD2=...|ANR=…“

a.) Start via console
| Parameter:   | MOD2=K  |     |     |     |     |     |
| ------------ | ------- | --- | --- | --- | --- | --- |
IDs are displayed without ":"  e.g. OPT_PRN
b.) Read batch attributes
| Parameter:   | MOD=L|CNR=12345678  |     |     |     |     |     |
| ------------ | ------------------- | --- | --- | --- | --- | --- |
c.) Read operation attributes
| Parameter:   | MOD=A|ANR=1234567890  |     |     |     |     |     |
| ------------ | --------------------- | --- | --- | --- | --- | --- |

The list includes the following data:
|           | ID  | Field designation  |     |                                 | Description  |     |
| --------- | --- | ------------------ | --- | ------------------------------- | ------------ | --- |
| KENNUNG   |     | ID                 |     | ID of attribute                 |              |     |
| ATTR_VAL  |     | Attribute value    |     | Value of the attribute          |              |     |
| MATTYP    |     | Material type      |     | Material type                   |              |     |
| IDX       |     | Index              |     | Completes the unique key (with  |              |     |
HZ_TYP)
| OPT:SIB  |     | Display  |     | Visible on console:  |     |     |
| -------- | --- | -------- | --- | -------------------- | --- | --- |
J/N flag whether the attribute is to be
displayed or not (applies for all
console views)

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 269 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|          | ID  | Field designation  |     |                                         | Description  |     |
| -------- | --- | ------------------ | --- | --------------------------------------- | ------------ | --- |
| OPT:PRN  |     | Print              |     | Identifier whether the attribute is to  |              |     |
be printed on the batch ticket or not
(J/N)
| POS:SIB  |     | Display position  |     | Position within display order  |     |     |
| -------- | --- | ----------------- | --- | ------------------------------ | --- | --- |
POS:PRN  Print position  Position within the ticket print order
| TXT      |     | Header   |     | Description of the attribute     |     |     |
| -------- | --- | -------- | --- | -------------------------------- | --- | --- |
| EINH     |     | Trailer  |     | Unit of the attribute            |     |     |
| OPT:ERF  |     | Enter    |     | Identifier how the attribute is  |     |     |
recorded (J/N)
| POS:ERF  |     | Entry position  |     | Position within the order of entry  |     |     |
| -------- | --- | --------------- | --- | ----------------------------------- | --- | --- |
| TYP:ERF  |     | Type            |     | Type of entry field                 |     |     |
-  N  Numeric
-  C  Text field
-  F  Decimal value
(This type might cause that a
numeric value is saved in a text
database field, if intended)
| LEN:ERF  |     | Entry length  |     | Field length. The maximum length  |     |     |
| -------- | --- | ------------- | --- | --------------------------------- | --- | --- |
might be determined by the attribute
database field in which the value is
to be saved.
| IDX:ERF  |     | Entry index  |     | Index of the material attribute to be  |     |     |
| -------- | --- | ------------ | --- | -------------------------------------- | --- | --- |
recorded. Corresponds to the
number of the batch attribute
(relevant for entry = “J”)
| NKS:ERF  |     | Decimal places  |     | Number of decimal places to be  |     |     |
| -------- | --- | --------------- | --- | ------------------------------- | --- | --- |
recorded for decimal attributes

Example:
  DLG=LIST;67|DATEI=spool/hyu2111.tmp|DAT=08/17/2007|ZEI=34897|USR=2111|MOD=A|ANR
=005001720290
| 9.3.7  | Batch logs (MPL-PRO)  |     |     |     |     |     |
| ------ | --------------------- | --- | --- | --- | --- | --- |
Batch logs are provided via the DLG=CNRPROT.LIST command and filed in the HYDRADIR\spool\
directory.
Table: mpl_los_prot
License: MPL-PRO

Structure of dialog data:
“DLG=LIST;CNRPROT.LIST|DATEI={file name}|DAT=...|ZEI=...|USR=...“

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 270 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| Parameter:   | none  |     |     |     |     |     |
| ------------ | ----- | --- | --- | --- | --- | --- |
The list includes the following data:
|           | ID  | Field designation  |     |                               | Description  |     |
| --------- | --- | ------------------ | --- | ----------------------------- | ------------ | --- |
| CNR       |     | -                  |     | Batch number                  |              |     |
| VERWEIS   |     | -                  |     | Reference to the data record  |              |     |
| DLL       |     | -                  |     | Run-through batch no.         |              |     |
| GR        |     | -                  |     | Reason                        |              |     |
| GRTEXT    |     | -                  |     | Reason text                   |              |     |
| BEM       |     | -                  |     | Comment/commentary            |              |     |
| PNR       |     | -                  |     | Personnel number              |              |     |
| KNR       |     | -                  |     | Badge number                  |              |     |
| ATTR_1    |     | -                  |     | Attribute 1                   |              |     |
| ATTR_2    |     | -                  |     | Attribute 2                   |              |     |
| ATTR_3    |     | -                  |     | Attribute 3                   |              |     |
| ATTR_4    |     | -                  |     | Attribute 4                   |              |     |
| ATTR_5    |     | -                  |     | Attribute 5                   |              |     |
| ATTR_6    |     | -                  |     | Attribute 6                   |              |     |
| ATTR_7    |     | -                  |     | Attribute 7                   |              |     |
| ATTR_8    |     | -                  |     | Attribute 8                   |              |     |
| ATTR_9    |     | -                  |     | Attribute 9                   |              |     |
| ATTR_10   |     | -                  |     | Attribute 10                  |              |     |
| ATTR_11   |     | -                  |     | Attribute 11                  |              |     |
| ATTR_12   |     | -                  |     | Attribute 12                  |              |     |
| ATTR_13   |     | -                  |     | Attribute 13                  |              |     |
| ATTR_14   |     | -                  |     | Attribute 14                  |              |     |
| ATTR_15   |     | -                  |     | Attribute 15                  |              |     |
| MNR       |     | -                  |     | Machine                       |              |     |
| ANR       |     | -                  |     | Order + operation             |              |     |
| AUNR      |     | -                  |     | Order                         |              |     |
| AGNR      |     | -                  |     | Operation                     |              |     |
| BEARB     |     | -                  |     | Editor                        |              |     |
| BEARBDAT  |     | -                  |     | Date of last change           |              |     |
| BEARBZEI  |     | -                  |     | Time of last change           |              |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 271 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| 9.4    | Process of Changing Output Batches  |     |     |     |
| ------ | ----------------------------------- | --- | --- | --- |
| 9.4.1  | Input batch data                    |     |     |     |
To find out which input materials are logged on, the material list has to be polled cyclically:
DLG=LISTE;13|MOD=M|MNR=Machine|ANR=order number....
If no input batch is logged on for planned materials the batch number (CNR) fields, etc. are not filled out.
These fields are only filled out if input batches are currently logged on.
| 9.4.2  | Output batch data  |     |     |     |
| ------ | ------------------ | --- | --- | --- |
To read data of the currently running output batch, the batch list has to be read as follows:
DLG=LISTE;13|MOD=A|ANR=order number
| 9.4.3  | Output batch change  |     |     |     |
| ------ | -------------------- | --- | --- | --- |
The following dialog has to be sent to HYDRA to execute a batch change:
DLG=CA_WL|ANR=order number |CNR=next batch number|....
The batch list has to be requested anew to be able to print tickets, once output batches have been
changed ("DLG=LISTE13;MOD=L;CNR=.. ")
| 9.4.4  | Job end  |     |     |     |
| ------ | -------- | --- | --- | --- |
The following dialogs have to be sent to HYDRA to perform a job end:
| DLG=CA_WL|....  |                                    | - to log the last batch off  |     |     |
| --------------- | ---------------------------------- | ---------------------------- | --- | --- |
| DLG=A_AB|…      |                                    | - to log the order off       |     |     |
| DLG=A_UN|…      |                                    | - to interrupt the order     |     |     |
| 9.5             | Packing and Palletizing (MPL-PAL)  |                              |     |     |
Please note: All functions described in this section are only available as of MPL product version 7.2.5.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 272 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| 9.5.1  | Assign batches (DLG=CE_AN_PA)  |     |              |     |
| ------ | ------------------------------ | --- | ------------ | --- |
| ID     | Type/max. field                |     | Description  |     |
length
| ANR=  | C16    | Order number with operation number     |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  | C10    | alter- Personnel number                |     |     |
native
| KNR=   | C10                                      | Badge number                     |              |     |
| ------ | ---------------------------------------- | -------------------------------- | ------------ | --- |
| CNR=   | C20                                      | Batch number of the input batch  |              |     |
| 9.5.2  | Delete batch assignment (DLG=CE_DEL_PA)  |                                  |              |     |
| ID     | Type/max. field                          |                                  | Description  |     |
length
| ANR=  | C16    | Order number with operation number     |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  | C10    | alter- Personnel number                |     |     |
native
| KNR=     | C10                          | Badge number                               |              |     |
| -------- | ---------------------------- | ------------------------------------------ | ------------ | --- |
| CNR:PA=  | C20                          | Batch number TPU batch                     |              |     |
| CNR=     | C20                          | Batch number of the assigned input batch   |              |     |
| 9.5.3    | Complete TPU (DLG=CA_WL_PA)  |                                            |              |     |
| ID       | Type/max. field              |                                            | Description  |     |
length
| ANR=  | C16    | Order number with operation number     |     |     |
| ----- | ------ | -------------------------------------- | --- | --- |
| MNR=  | N8/C8  | Machine number (numeric/alphanumeric)  |     |     |
| PNR=  | C10    | alter- PNR=                            |     |     |
native
| KNR=      | C10  | KNR=                               |     |     |
| --------- | ---- | ---------------------------------- | --- | --- |
| CNR=      | C20  | New batch number for the next TPU  |     |     |
| EGR:GUT=  | DEC  | Net weight                         |     |     |
| EGE:GUT=  | C4   | Unit of net weight                 |     |     |
| EGR:AUS=  | DEC  | Net weight for status scrap        |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 273 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max. field  |     | Description  |     |
| --- | ---------------- | --- | ------------ | --- |
length
| EGE:AUS=  | C4  | Unit of net weight      |     |     |
| --------- | --- | ----------------------- | --- | --- |
| KLASSE=   | C1  | "G" yield or “A” scrap  |     |     |
| STA=      | C1  | Status of output batch  |     |     |
F= with remaining quantity (by default for KLASSE=G)
S= blocked (by default for KLASSE=A)

| ZLO=       | C12  | Destination of output batch     |     |     |
| ---------- | ---- | ------------------------------- | --- | --- |
| TPE=       | C10  | Transport unit                  |     |     |
| LHW=       | C20  | Optional: output batch note     |     |     |
| CALT1= to  | C20  | Alternative batch number 1 - 5  |     |     |
CALT5=
ATTR:1 = to   --  The definition of which values are filed in additional attributes is
| ATTR:11 =     |      | configured for each material type in HYDRA  |     |     |
| ------------- | ---- | ------------------------------------------- | --- | --- |
| ATTR:101= to  | C40  | Alphanumeric batch attributes               |     |     |
ATTR:140=
| ATTR:201= to  | NUM  | Numeric batch attributes  |     |     |
| ------------- | ---- | ------------------------- | --- | --- |
ATTR:220=
| ATTR:301= to  | DEC  | Decimal batch attributes  |     |     |
| ------------- | ---- | ------------------------- | --- | --- |
ATTR:320=
| 9.5.4  | List with assigned batches for active TPU  |     |     |     |
| ------ | ------------------------------------------ | --- | --- | --- |
Data are provided using the command DLG=LIST;u_l_mpl_hu_elose and filed in the HYDRADIR\spool\
directory.
License: MPL-PAL

Structure of dialog data:
„DLG=LIST;u_l_mpl_hu_elose|DATEI={file name}|DAT=...|ZEI=...|USR=...“
| Parameter:   | MNR=<machine>|ANR=<operation>  |     |     |     |
| ------------ | ------------------------------ | --- | --- | --- |
The list includes the following data:

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     | Page 274 of 356  |
| ---------------- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- |

|            | ID  |                        | Field designation  |     |                                     | Description  |     |
| ---------- | --- | ---------------------- | ------------------ | --- | ----------------------------------- | ------------ | --- |
| MNR        |     | Machine                |                    |     | Machine number                      |              |     |
| ANR        |     | Order                  |                    |     | Order and OP                        |              |     |
| ATK        |     | Article                |                    |     | Material number                     |              |     |
| ATKBEZ     |     | Des. of final article  |                    |     | Material designation                |              |     |
| CNR        |     | -                      |                    |     | Batch number                        |              |     |
| ACNR       |     | Package                |                    |     | Batch number TPU                    |              |     |
| HSDAT      |     | Date manuf.            |                    |     | Manufacturing: date                 |              |     |
| HSZEI      |     | Time manuf.            |                    |     | Manufacturing: time                 |              |     |
| MENGE      |     | Quantity               |                    |     | Batch quantity of individual batch  |              |     |
| EINH       |     | Unit                   |                    |     | Unit of individual batch            |              |     |
| LS1 – LS6  |     | Activity 1 – 6         |                    |     | Activity 1 - 6                      |              |     |
LS1:EINH – LS6:EINH  Unit activity 1 – 6  Unit activity 1 - 6
| 9.6    | Annex                      |     |     |     |     |     |     |
| ------ | -------------------------- | --- | --- | --- | --- | --- | --- |
| 9.6.1  | Summary of MPL field data  |     |     |     |     |     |     |
The following table provides an overview of field data including structure and brief example. Some points
overlap with descriptions already explained in other PDM documents.
| ID   | Description     |     |     | Structure  |     |                  | Example  |
| ---- | --------------- | --- | --- | ---------- | --- | ---------------- | -------- |
| MNR  | Machine number  |     |     |            |     | ...|MNR=100|...  |          |
...|MNR={machine number }|...
MGRP  Machine group  ...|MGRP={machine group }|...  ...|MGRP=100|...
| ANR   | Order number  |         |                                      |     |     |                       |     |
| ----- | ------------- | ------- | ------------------------------------ | --- | --- | --------------------- | --- |
|       |               |         | ...|ANR={order}|...                  |     |     | ...|ANR=47110010|...  |     |
| AUNR  | Order         | number  |                                      |     |     |                       |     |
|       |               |         | ...|AUNR={order number without OP }  |     |     | ...|AUNR=4711|...     |     |
without OP
| AGNR  | Operation number  |     |                                |     |     |                    |     |
| ----- | ----------------- | --- | ------------------------------ | --- | --- | ------------------ | --- |
|       |                   |     | ...|AGNR={OP}|...              |     |     | ...|AGNR=0010|...  |     |
|       | Article number    |     | ...|ATK={article number }|...  |     |     |                    |     |
| ATK   |                   |     |                                |     |     |                    |     |
EGR:*  Entry size  ...|EGR:{type}={value}|...  ..|EGR:GUT=10. |.
...|EGR:AUS=1 |...
|     | Manually  | recorded  | Types of entry sizes:      |     |     |     |     |
| --- | --------- | --------- | -------------------------- | --- | --- | --- | --- |
|     | size      |           |   RPA01, RPA02, .., RPA12  |     |     |     |     |
  DAUER, PDAUER
  HUB, GUT, AUS, LEN, GEW
|     |     |     | The  | recorded  value  | is  accumulated  |     |     |
| --- | --- | --- | ---- | ---------------- | ---------------- | --- | --- |

| SCS-PDM_81.docx  |     |     |     | Version: 1.0.23049  |     |     | Page 275 of 356  |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

onto the respective account within the
database
EGE:*  Unit for entry sizes  ...|EGE:{type}={unit}|...  EGE:GUT=ST

For types see EGR

EGG:*  Reasons  for  entry  ...|EGG:{type}={reason }|...  EGG:AUS=1
sizes
For types see EGR
| SGR:*  |     | ...|SGR:{type}={value}|...  |     | ...|SGR:GUT=1126|  |     |
| ------ | --- | --------------------------- | --- | ------------------ | --- |
Target size

SGR:GUT = target quantity order/OP
For types see EGR
| MST  | Machine status  | ...|MST={machine status}|...  |     |     |     |
| ---- | --------------- | ----------------------------- | --- | --- | --- |
..|MST=1 |..
| PNR  | Personnel number  |                                  |     |                     |     |
| ---- | ----------------- | -------------------------------- | --- | ------------------- | --- |
|      |                   | ...|PNR={personnel number }|...  |     | ...|PNR=999999|...  |     |
| KNR  | Badge number      |                                  |     |                     |     |
|      |                   | ...|KNR={badge number}|...       |     | ...|KNR=9999|...    |     |
| CNR  | Batch number      |                                  |     | ...|CNR=998877|...  |     |
...|CNR={batch number}
Booking obligation
| BZW  |     | Optional parameter if set several  |     | ...|BZW=J|...  |     |
| ---- | --- | ---------------------------------- | --- | -------------- | --- |
plausibility checks are deactivated. If
not sent:
|     |     | = N  |     |     |     |
| --- | --- | ---- | --- | --- | --- |
[...|BZW={ booking obligation}|...]
Info on batch
| LHW     |                        | Info on batch (C20)                            |     | |LHW={info on batch}|...  |     |
| ------- | ---------------------- | ---------------------------------------------- | --- | ------------------------- | --- |
|         | Destination            | Destination                                    |     |                           |     |
| ZLO     |                        |                                                |     | ...|ZLO=121234|...        |     |
|         | Transport unit         | Transport unit (C10)                           |     |                           |     |
| TPE     |                        |                                                |     | ...|TPE=1234|...          |     |
|         | Bill of material item  | Bill of material item (C6)                     |     |                           |     |
| SLP     |                        |                                                |     | ...|SLP=AA34|...          |     |
| ATTR:*  | Additional             | batch  ...|ATTR:{nr}]={recorded attribute}|..  |     |                           |     |

|     | attributes  | nr = 1 ..11  |     |     |     |
| --- | ----------- | ------------ | --- | --- | --- |
Field types;
1 - 4   :  Integer
4 – 6  :  Double
7        :  Char 4
8, 9    :  Char 10
10, 11:  Char 20
| STN  | Station number  | ...|STN ={station number }|...  |     |     |     |
| ---- | --------------- | ------------------------------- | --- | --- | --- |
...|STN=1|..

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 276 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| LOSANZ  | Number  | of  parallel  ...|LOSANZ ={number of batches}|...  |     |     |     |
| ------- | ------- | -------------------------------------------------- | --- | --- | --- |
...|LOSANZ=5|...
output batches
| ATTR:101 -  | Alphanumeric  | batch  C40  |     | ...|ATTR:101=TXT| …  |     |
| ----------- | ------------- | ----------- | --- | -------------------- | --- |
attributes
ATTR:140
| ATTR:201 -  | Numeric  | batch  NUM  |     | ...|ATTR:201=1| …  |     |
| ----------- | -------- | ----------- | --- | ------------------ | --- |
attributes
ATTR:220
| ATTR:301 -  | Decimal  | batch  DEC  |     | ...|ATTR:301=1.123| …  |     |
| ----------- | -------- | ----------- | --- | ---------------------- | --- |
attributes
ATTR:320

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 277 of 356  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

10  HYDRA Production Data Manager MPL - Master Data
| 10.1  | Please note for the basic dialogs described  |     |     |
| ----- | -------------------------------------------- | --- | --- |
All mandatory fields are provided with the addition “PK” (primary key = key field). All other fields are
optional and are processed if they are filled out.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 278 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 10.2      | Quantity Changes                            |     |     |
| --------- | ------------------------------------------- | --- | --- |
| 10.2.1    | Quantity change affecting several products  |     |     |
| 10.2.1.1  | DLG=ACCMNT.CHANGE                           |     |     |
Using the BAPI calls described in this section, it is possible to record and post a quantity change for
different dependent products. The Bapi is implemented as script Bapi (b_accmnt.hsc).
Dependent products
| Product  | Bapi              | Description           |     |
| -------- | ----------------- | --------------------- | --- |
| MDE      | MDEPRO.CHANGEQTY  | Edit MDE log records  |     |
| ADE      | ADEPRO.UPDATE     | Edit ADE log records  |     |
MPL  CNR.UPDATE  Generate material movements/change batch status
BAPI call
| ID   | Content / {type}  | Description              |     |
| ---- | ----------------- | ------------------------ | --- |
| DLG  | ACCMNT.CHANGE     | Realize quantity change  |     |
ACCMNT.DLG  Dialog  Executing initial activity (e.g. CNR.UPDATE)
| ACCMNT.MNR       | Machine    | Machine number              |     |
| ---------------- | ---------- | --------------------------- | --- |
| ACCMNT.ANR       | Operation  | OP number                   |     |
| ACCMNT.CNR       | Batch      | Batch number                |     |
| ADEPRO.EGR:GUTP  | Quantity   | Depends on initial command  |     |
ADEPRO.EGR:AUSP
CNR.SGR:GUT
Return
| ID  | Content / {type}  | Description  |     |
| --- | ----------------- | ------------ | --- |
|     |                   |              |     |
Validation checks
Error codes  Description
2027  Unknown mode
105  Parameters are missing

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 279 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 10.3    | MPL – Master Data  |     |     |
| ------- | ------------------ | --- | --- |
| 10.3.1  | MPL Setup          |     |     |
See “setup“
| 10.3.2    | Material types                            |     |     |
| --------- | ----------------------------------------- | --- | --- |
| 10.3.2.1  | DLG=MATTYP.INSERT, UPDATE, DELETE, COPY,  |     |     |
LOCK, UNLOCK, NEW, SELECT
The configuration of material types can be edited using the BAPI calls described in this section.
Tables
| Table     | Key field  | Description    |     |
| --------- | ---------- | -------------- | --- |
| hz_typen  | hz_typ     | Material type  |     |
MATTYP.MATTYP
| hz_atgen  |     | Delete corresponding attributes with DELETE  |     |
| --------- | --- | -------------------------------------------- | --- |
BAPI call
| ID   | Content / {type}  | Description           |     |
| ---- | ----------------- | --------------------- | --- |
| DLG  | MATTYP.INSERT     | Create material type  |     |
MATTYP.UPDATE  Change material type
MATTYP.DELETE  Delete material type
MATTYP.COPY  Copy material type
MATTYP.LOCK  Block processing of the material type
MATTYP.UNLOCK  Unblock material type after processing
MATTYP.NEW  Read specification for new material type
MATTYP.SELECT  Select material type
| MATTYP.MATTYP    | {C10}  | Material type                        |     |
| ---------------- | ------ | ------------------------------------ | --- |
| MATTYP.MATTYP:Z  | {C10}  | New (target) material type for COPY  |     |
…  …  For  further  fields,  please  refer  to  the  HYD-HDB
documentation about above-mentioned tables.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 280 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Return
| ID             | Content / {type}  | Description                  |     |
| -------------- | ----------------- | ---------------------------- | --- |
| MATTYP.MATTYP  | {C10}             | MATTYP.INSERT, MATTYP.COPY:  |     |
Return of material type of the configuration created
Validation checks
Error codes  Description
2707  MATTYP.DELETE:Reference to the mat_mattyp table still exists

| 10.3.3    | Material buffer                           |     |     |
| --------- | ----------------------------------------- | --- | --- |
| 10.3.3.1  | DLG=MATPUF.INSERT, UPDATE, DELETE, COPY,  |     |     |
LOCK, UNLOCK, NEW, SELECT
The configuration of material buffers can be edited using the BAPI calls described in this section.
Tables
| Table       | Key field  | Description      |     |
| ----------- | ---------- | ---------------- | --- |
| mat_puffer  | mat_puf    | Material buffer  |     |
MATPUF.MATPUF
BAPI call
| ID   | Content / {type}  | Description             |     |
| ---- | ----------------- | ----------------------- | --- |
| DLG  | MATPUF.INSERT     | Create material buffer  |     |
MATPUF.UPDATE  Change material buffer
MATPUF.DELETE  Delete material buffer
MATPUF.COPY  Copy material buffer
MATPUF.LOCK  Block processing of the material buffer
MATPUF.UNLOCK  Unblock material buffer after processing
MATPUF.NEW  Read specification for new material buffers
MATPUF.SELECT  Select material buffer
| MATPUF.MATPUF  | {C10}  | Material buffer  |     |
| -------------- | ------ | ---------------- | --- |
MATPUF.MATPUF:Z  {C10}  New (target) material buffer for COPY

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 281 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

…  …  For  further  fields,  please  refer  to  the  HYD-HDB
documentation about the above-mentioned tables

Return
| ID             | Content / {type}  | Description                  |     |
| -------------- | ----------------- | ---------------------------- | --- |
| MATPUF.MATPUF  | {C10}             | MATPUF.INSERT, MATPUF.COPY:  |     |
Return of the material type of the configuration created
Validation checks
Error codes  Description
2700  DELETE
Material buffer is still assigned to a machine
2701  DELETE
Material buffer still refers to another hierarchy
2702  DELETE
Material buffer still refers to a transport unit
2703  MATPUF.INSERT/UPDATE:
Reference to hierarchy is wrong
2704  MATPUF.UPDATE:
Reference to hierarchy wrong (too small)
2705  MATPUF.INSERT/UPDATE:Target location does not exist in the los_zielorte table
2730  DELETE
Material buffer is still used within batch stock

| 10.3.4    | Transport units                              |     |     |
| --------- | -------------------------------------------- | --- | --- |
| 10.3.4.1  | DLG=TPE.INSERT, UPDATE, DELETE, COPY, LOCK,  |     |     |
UNLOCK, NEW, SELECT
The configuration of transport units can be updated using the BAPI calls described in this section.
Tables
| Table     | Key field  | Description     |     |
| --------- | ---------- | --------------- | --- |
| hz_typen  | tpe        | Transport unit  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 282 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | ------------------------ | --- |

TPE.TPE
BAPI call
| ID   | Content / {type}  | Description            |     |     |     |
| ---- | ----------------- | ---------------------- | --- | --- | --- |
| DLG  | TPE.INSERT        | Create transport unit  |     |     |     |
TPE.UPDATE  Change transport unit
TPE.DELETE  Delete transport unit
TPE.COPY  Copy transport unit
TPE.LOCK  Block processing of the transport unit
TPE.UNLOCK  Unblock transport unit after processing
TPE.NEW  Read specification for new transport unit
TPE.SELECT  Select transport unit
| TPE.TPE    | {C10}  | Transport unit                        |                  |           |          |
| ---------- | ------ | ------------------------------------- | ---------------- | --------- | -------- |
| TPE.TPE:Z  | {C10}  | New (target) transport unit for COPY  |                  |           |          |
| …          | …      | For  further                          | fields,  please  | see  the  | HYD-HDB  |
documentation about above-mentioned tables

Return
| ID       | Content / {type}  | Description             |     |     |     |
| -------- | ----------------- | ----------------------- | --- | --- | --- |
| TPE.TPE  | {C10}             | TPE.INSERT, TPE.COPY:   |     |     |     |
Return of transport unit of the configuration created
Validation checks
Error codes  Description

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 283 of 356  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 10.4      | HYDRA-MPL – Movement Data                      |     |     |
| --------- | ---------------------------------------------- | --- | --- |
| 10.4.1    | Batch stock                                    |     |     |
| 10.4.1.1  | DLG=CNR.INSERT, UPDATE, DELETE, MODIFY, COPY,  |     |     |
LOCK, UNLOCK, NEW, SELECT
The batch stock can be edited using the BAPI calls described in this section.
Tables
| Table        | Key field  | Description            |     |
| ------------ | ---------- | ---------------------- | --- |
| los_bestand  | losnr      | Internal batch number  |     |
CNR.CNR
| a_los_bestand  |     | a_los_bestand  Archive table  |     |
| -------------- | --- | ------------------------------ | --- |
| los_attribute  |     | Batch attributes for a batch   |     |
BAPI call
| ID   | Content / {type}  | Description   |     |
| ---- | ----------------- | ------------- | --- |
| DLG  | CNR.INSERT        | Create batch  |     |
CNR.UPDATE  Change batch
CNR.DELETE  Delete batch
CNR.COPY  Copy batch
CNR.LOCK  Block processing of the batch
CNR.UNLOCK  Unblock batch after processing
CNR.NEW  Read specification for new batches
CNR.SELECT  Select batch
CNR.MODIFY  Create or change batch
CNR.SPLITCREATE  Split batch
CNR. SUMMARIZE  Batch merge
| CNR.CNR  | C20  | Internal batch number  |     |
| -------- | ---- | ---------------------- | --- |
‚’/empty – A new batch number (prefix P) is assigned at
the server via User=0, if configured like that in the setup
| CNR.DLL    | C20  | Throughput batch number          |     |
| ---------- | ---- | -------------------------------- | --- |
| CNR.CNR:Z  | C20  | New (target) batch for CNR.COPY  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 284 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| CNR.ATK       | C40  | Material number                  |     |
| ------------- | ---- | -------------------------------- | --- |
| CNR.ATKBEZ    | C40  | Material designation             |     |
| CNR.SGR:GUT   | DEC  | Batch quantity                   |     |
| CNR.SGR:REST  | DEC  | Remaining quantity of the batch  |     |
| CNR.SGE:GUT   | C3   | Unit of batch quantity           |     |
Machine number
CNR.MNR  N8/C8
| CNR:ATTR:11  | C40  | Order number with operation number    |     |
| ------------ | ---- | ------------------------------------- | --- |
| CNR.STA      | C1   | Batch status (F = free, S = blocked)  |     |
| CNR.CKL      | C1   | Batch class                           |     |
G = yield
A = scrap
O = on hold
N = rework
| CNR.TST  | C1  | Transport status (L = delivered)        |     |
| -------- | --- | --------------------------------------- | --- |
| CNR.QST  | C1  | Quality status (G – blocked, F – free)  |     |
CNR.QSTMANU  C1  Manual quality status (G – blocked, F – free)
| CNR.MATST      | C1   | Material status (e.g. V = packed)  |     |
| -------------- | ---- | ---------------------------------- | --- |
| CNR.MATTYPART  | C10  | Material type                      |     |
CNR.OPT:REST  C1  J – “Batch has still got residual quantity“ flag
N – “Batch has not got residual quantity”
| CNR.FIR      | C4     | Company                     |     |
| ------------ | ------ | --------------------------- | --- |
| CNR.HSDAT    | DATUM  | Manufacturing date          |     |
| CNR.HSZEI    | ZEIT   | Manufacturing time          |     |
| CNR.VVDAT    | DATUM  | Availability date           |     |
| CNR.VVZEI    | ZEIT   | Availability time           |     |
| CNR.VFDAT    | DATUM  | Expiry date                 |     |
| CNR.VFZEI    | ZEIT   | Expiry time                 |     |
| CNR.WDAT     | DATUM  | Warning date                |     |
| CNR.WZEI     | ZEIT   | Warning time                |     |
| CNR.CSTWDAT  | DATUM  | Date of last status change  |     |
| CNR.CSTWZEI  | ZEIT   | Time of last status change  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 285 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| CNR.MATPUF    | C12  | Material buffer                           |     |
| ------------- | ---- | ----------------------------------------- | --- |
| CNR.MATTYP    | C10  | Material type                             |     |
| CNR.TPE       | C10  | Transport unit                            |     |
| CNR.BEM       | C20  | Info on batch                             |     |
| CNR.PNR       | C10  | Personnel number                          |     |
| CNR.TECHINFO  | C20  | Technical info                            |     |
| CNR.EGG:AUS   | N8   | Scrap reason                              |     |
| CNR.GR        | N8   | Scrap reason (synonymous to CNR.EGG:AUS)  |     |
| CNR.GRTXT     | N8   | Reference to scrap reason text            |     |
| CNR.USR       | N8   | User number                               |     |
| CNR.LAGORT    | C12  | PPS storage location                      |     |
| CNR.LAGPZ     | C12  | PPS storage bin                           |     |
| CNR.SAPCNR    | C10  | PPS batch number                          |     |
CNR.RESART  C4  Reservation type (AG = operation, AK = order)
CNR.RESVAL  C40  Value of reservation (e.g. operation number)
| CNR.RESBEM  | C100  | Reservation comment  |     |
| ----------- | ----- | -------------------- | --- |
CNR.BREITE  DEC  Material width (conversion factor for MPLRF-BP)
CNR.RFAGVFA  DEC  Mass per unit area (conversion factor for MPLRF-BP)
CNR.RFSTKF  DEC  Surface per piece (conversion factor for MPLRF-BP)
| CNR.OPT:SLOS  | C1  | J – batch is a merged batch  |     |
| ------------- | --- | ---------------------------- | --- |
CNR.ANZ:SLOS  N8  For  a  merged  batch,  the  number  of  the  assigned
individual batches
| CNR.OPT:SLOSTYP   | C1  | J – Batch is a merged batch  |     |
| ----------------- | --- | ---------------------------- | --- |
| CNR.OPT:SLOSCTRL  | C1  | J – Batch is a merged batch  |     |
| CNR.OPT:MBEW      | C1  | J – Generate goods movement  |     |
CNR.OPT:MDC  C1  J  –  Generate  additional  goods  movement  to  change
quantities
| CNR.MOD  | C1  | For CNR.SPITCREATE only:  |     |
| -------- | --- | ------------------------- | --- |
L – Batch quantity (otherwise split as default residual
quantity)
| CNR.MENGE  | DEC  | For CNR.SPITCREATE only:  |     |
| ---------- | ---- | ------------------------- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 286 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Quantity
| CNR.EGR:1 – 6       | DEC  | Quantity activity 1 – 6            |     |
| ------------------- | ---- | ---------------------------------- | --- |
| CNR.RGR:1 – 6       | DEC  | Residual quantity activity 1 – 6   |     |
| CNR.EGE:1 – 6       | C3   | Unit activity 1 – 6                |     |
| CNR.CNR:ALT1 – 20   | -    | Alternative batch number 1 – 20    |     |
max. field length:
|             |      | CNR.CNR:ALT1-4   - C20      |     |
| ----------- | ---- | --------------------------- | --- |
|             |      | CNR.CNR:ALT5-14  - C40      |     |
|             |      | CNR.CNR:ALT15-18   - C100   |     |
|             |      | CNR.CNR:ALT19-20   - C512   |     |
| CNR.EXTCNR  | C10  | External batch number       |     |
CNR.MCNR  C10  Mother batch number (e.g. reference from merged batch)
| CNR.AUART  | C5  | Order type  |     |
| ---------- | --- | ----------- | --- |
CNR.UMRFAKTP:Z  DEC  Denominator – conversion factor relating to OP quantity
units
CNR.UMRFAKTP:N  DEC  Numerator – conversion factor relating to OP quantity
units
CNR.UMRFAKTS:Z  DEC  Denominator – conversion factor relating to OP quantity
units
CNR.UMRFAKTS:N  DEC  Numerator – conversion factor relating to OP quantity
units
CNR.UMRFAKTT:Z  DEC  Denominator  –  conversion  factor  relating  OP  quantity
units
CNR.UMRFAKTT:N  DEC  Numerator – conversion factor relating to OP quantity
units
CNR.ZUORD:1 – 6   C1  Flag  for  assignment  “MPL  activity  account    ADE
quantity unit (e.g. P = primary quantity)
ATTR=101 -  C40  Alphanumeric batch attributes (in los_attribute table)
ATTR=140
ATTR=201 -  NUM  Numeric batch attributes (in los_attribute table)
ATTR=220
ATTR=301 -  DEC  Decimal batch attributes (in los_attribute table)
ATTR=320
| CNR.USRFLD   | C8  | User field key  |     |
| ------------ | --- | --------------- | --- |
| CNR.FU:1 –   | -   | User fields     |     |
CNR.FU:66

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 287 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

CNR.PROTEVENT  C10  Event  used  in  the  batch  history.  Using  this  key,  the
console can show a text defined for the event (from the
reference list ELOS.EREIGNIS1).
CNR.SETEVDATA  C1  J – Transferred data are written in event_dlg_data
CNR.EVDATA:1 –  C∞  These  data  are  written  in  the  file  event_dlg_data.
CNR.SETEVDATA=J must be configured. These data are
| CNR.EVDATA:n  |     | (Restricted to a maximum of  |            |                    |                 |                   |
| ------------- | --- | ---------------------------- | ---------- | ------------------ | --------------- | ----------------- |
|               |     |                              | shown  in  | the  detail  view  | of  the  batch  | history  at  the  |
|               |     | 1000  characters             | by         |                    |                 |                   |
console.
event_dlg_data.dlg_data)
CNR.EVDATABEZ:1 –  C∞  Designations  for  CNR.EVDATA:1  –  CNR.EVDATA:n.
|                  |     |                              | These  are  | console  | IDs  of  the  | reference  list  for  |
| ---------------- | --- | ---------------------------- | ----------- | -------- | ------------- | --------------------- |
| CNR.EVDATABEZ:n  |     | (Restricted to a maximum of  |             |          |               |                       |
ELOS.EVDATABEZ. These data are not shown in the
|     |     | 1000  characters  | by  |     |     |     |
| --- | --- | ----------------- | --- | --- | --- | --- |
detail view of the batch history at the console.
event_dlg_data.dlg_data)
Return
| ID       |     | Content / {type}  | Description            |     |     |     |
| -------- | --- | ----------------- | ---------------------- | --- | --- | --- |
| CNR.CNR  |     | {C20}             | CNR.INSERT, CNR.COPY:  |     |     |     |
Return of batches of the configuration created
Validation checks
| Error codes  |     | Description  |     |     |     |     |
| ------------ | --- | ------------ | --- | --- | --- | --- |
|              |     |              |     |     |     |     |

| 10.4.1.2  | DLG=CNR.SPLITCREATE  |     |     |     |     |     |
| --------- | -------------------- | --- | --- | --- | --- | --- |
BAPI call
| ID           |     | Content / {type}  | Description                      |     |     |     |
| ------------ | --- | ----------------- | -------------------------------- | --- | --- | --- |
| DLG          |     | CNR.SPLITCREATE   | Split batch                      |     |     |     |
| CNR.CNR      |     | C20               | Batch number to be split         |     |     |     |
| CNR.MENGE:x  |     | DEC               | Batch quantity of future splits  |     |     |     |
e.g. “|CNR.MENGE:1=1.0| CNR.MENGE:2=2.0|“
| CNR.GR:x  |     | NUM  | Scrap reason of future splits  |     |     |     |
| --------- | --- | ---- | ------------------------------ | --- | --- | --- |
CNR.CKL:x  C1  Batch class (G = yield, A = scrap) of future splits
CNR.MOD  C1  L – Batch transfer (a new batch is generated from the
original batch using the “same“ data)
R – Post residual quantity onto a new batch. The original
batch is “processed” and has the quantity 0.
B – Reduce existing batch by the total of split quantities
(remaining quantity and activities)

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 288 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

OPT.CNRGEN_VIA_BAPI  C1  J – New batches are generated by Bapi
CNRGEN.CREATECNR
N – New batches are generated by the internal function
“erzeuge_losnr_sicher“.

BAPI call return values
| ID     |     | Content / {type}  | Description           |     |
| ------ | --- | ----------------- | --------------------- | --- |
| CNR:x  |     | C20               | All generated splits  |     |

| 10.4.1.3  | DLG=CNR.SUMMARIZE  |     |     |     |
| --------- | ------------------ | --- | --- | --- |

| ID       |     | Content / {type}  | Description          |     |
| -------- | --- | ----------------- | -------------------- | --- |
| DLG      |     | CNR.SUMMARIZE     | Merge batch          |     |
| CNR.CNR  |     | C20               | Only with CNR.MOD=B  |     |
Involved batch that is increased by the total quantity.
CNR.CNR:x
|     |     |     | All batches that are merged.  |     |
| --- | --- | --- | ----------------------------- | --- |
Please note:
In CNR.MOD=B the batch to be increased is transferred
as CNR.CNR.
CNR.MOD  C1  B – Post quantities to existing batch (CNR.CNR)
N – Generate new batch and post quantities to this batch

BAPI call return values
| ID           |     | Content / {type}  | Description           |     |
| ------------ | --- | ----------------- | --------------------- | --- |
| CNR.CNR:NEW  |     | C20               | Only with CNR.MOD=N:  |     |
New batch number

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 289 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 10.4.1.4  | DLG=CNR.NEWCNR  |     |     |
| --------- | --------------- | --- | --- |
A new batch number can be requested using the BAPI calls described in this section (number range
User=0).
BAPI call
| ID        | Content / {type}  | Description                          |     |
| --------- | ----------------- | ------------------------------------ | --- |
| DLG       | CNR.NEWCNR        | Request new batch number (prefix P)  |     |
|           |                   |                                      |     |
| 10.4.1.5  | DLG=CNR.RESTORE   |                                      |     |
A batch from the batch archive may be saved back into the online table using the BAPI call described in
this section.
BAPI call
| ID   | Content / {type}  | Description                  |     |
| ---- | ----------------- | ---------------------------- | --- |
| DLG  | CNR.RESTORE       | Retrieve batch from archive  |     |
|      |                   |                              |     |

| 10.4.1.6  | DLG=CNRGEN.CREATENR  |     |     |
| --------- | -------------------- | --- | --- |
BAPI call
| ID   | Content / {type}  | Description         |     |
| ---- | ----------------- | ------------------- | --- |
| DLG  | CNRGEN.CREATENR   | Generate new batch  |     |
CNRGEN.MATTYP  C10  Material type (fix “SYSTEM“)  FOR FUTURE USE
| CNRGEN.TYP  | C1  | Type of the batch to be generated  |     |
| ----------- | --- | ---------------------------------- | --- |
H  HU batch
|     |     | P  Production batch    |     |
| --- | --- | ----------------------- | --- |
W  Goods receipt batch
A prefix that might be transferred will be ignored if a type
is transferred. The type takes priority.
| CNRGEN.PRAEFIX  | C10  | Batch number prefix  |     |
| --------------- | ---- | -------------------- | --- |
Overwrites setup configuration
CNRGEN.TNR  N8  Terminal user for number range (Default = 0)
Overwrites setup configuration

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 290 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| CNRGEN.LEN  | N8  | Length of batch number  |     |
| ----------- | --- | ----------------------- | --- |
Overwrites setup configuration
| CNRGEN.TYP  | C1  | Batch type  |     |
| ----------- | --- | ----------- | --- |
H  Packing station batch (prefix fix “HU“)
P  Produced batch (prefix from setup)
W  Goods receipt batch (prefix from setup)

A prefix that might be transferred will be ignored if a type
is transferred.

Return
| ID   | Content / {type}  | Description             |     |
| ---- | ----------------- | ----------------------- | --- |
| CNR  | C20               | Generated batch number  |     |

| 10.4.1.7  | DLG=CNRBAUM.INSERT  |     |     |
| --------- | ------------------- | --- | --- |
Batch assignments can be created by the BAPI calls described in this section.
Batch assignments describe the connection between input and output batches. Batch assignments have
been designed to trace back material relating to batches.
Tables
| Table          | Key field      | Description        |     |
| -------------- | -------------- | ------------------ | --- |
| los_zuordnung  | CNRBAUM.CNR:E  | Batch assignments  |     |
CNRBAUM.CNR:A
BAPI call
| ID   | Content / {Type}  | Description               |     |
| ---- | ----------------- | ------------------------- | --- |
| DLG  | CNRBAUM.INSERT    | Create batch assignments  |     |
CNRBAUM.CNR:E  Batch number {C20}  Internal batch number: input batch
CNRBAUM.CNR:A  Batch number {C20}  Internal batch number: output batch
CNRBAUM.DLL:E  Batch number {C20}  Batch number: input batch
CNRBAUM.DLL:A  Batch number {C20}  Batch number: output batch
| CNRBAUM.ATK:E  | Article {C40}  | Material number: input batch  |     |
| -------------- | -------------- | ----------------------------- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 291 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| CNRBAUM.ATK:A    | Article {C40}        | Material number: output batch  |     |
| ---------------- | -------------------- | ------------------------------ | --- |
| CNRBAUM.HZTYP:E  | Material type {C10}  | Material type: input batch     |     |
CNRBAUM.HZTYP:A  Material type {C10}  Material type: output batch
| CNRBAUM.SAPCNR:E  | ERP batch {C40}    | ERP batch: input batch   |     |
| ----------------- | ------------------ | ------------------------ | --- |
| CNRBAUM.SAPCNR:A  | ERP batch {C40}    | ERP batch: output batch  |     |
| CNRBAUM.MNR       | Machine / {C10}    | Machine number           |     |
| CNRBAUM.ANR       | Operation / {C40}  | Operation number         |     |
CNRBAUM.SLP  BOM item / {C10}  BOM item of input batch from component list
CNRBAUM.ART  Type of BOM item / {C1}  Type of BOM item of input batch from component list
(e.g. M for material)
| CNRBAUM.HSDAT    | Date  | Date of output batch logoff  |     |
| ---------------- | ----- | ---------------------------- | --- |
| CNRBAUM.HSZEI    | Time  | Time of output batch logoff  |     |
| CNRBAUM.HSANDAT  | Date  | Date of output batch logon   |     |
| CNRBAUM.HSANZEI  | Time  | Time of output batch logon   |     |
| CNRBAUM.EANDAT   | Date  | Date of input batch logon    |     |
| CNRBAUM.EANZEI   | Time  | Time of input batch logon    |     |
| CNRBAUM.EABDAT   | Date  | Date of input batch logoff   |     |
| CNRBAUM.EABZEI   | Time  | Time of input batch logoff   |     |
Return
| ID  | Content / {Type}  | Description  |     |
| --- | ----------------- | ------------ | --- |
|     |                   |              |     |
Validation checks
Error codes  Description

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 292 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 10.4.2    | Material movements  |     |     |
| --------- | ------------------- | --- | --- |
| 10.4.2.1  | DLG=MBEW.INSERT     |     |     |
Material movements may be created by means of the BAPI calls described in this section. The Bapi has
been implemented as script Bapi (b_mbew.hsc).
Material movements may only be created by INSERT, as they can be regarded as delta quantity for a
stock or status (batch stock).
A negative algebraic sign must precede the quantity for goods issues (movement 261).
Uploads to PPS:
Goods receipts are uploaded to PPS using the ZWEI segment structure.
Goods issues and return transfers are uploaded to PPS using the ZWAU segment structure.
Tables
| Table      | Key field  | Description         |     |
| ---------- | ---------- | ------------------- | --- |
| event_mlb  | --         | Material movements  |     |
BAP call
| ID             | Content / {type}      | Description               |     |
| -------------- | --------------------- | ------------------------- | --- |
| DLG            | MBEW.INSERT           | Create material movement  |     |
| MBEW.SAPBWART  | Movement type / {C3}  | Goods receipt:            |     |
101 – Goods receipt
102 – Cancellation for goods receipt
262 – Return transfer
525 – Goods receipt, blocking material
531 – Scrap material
Goods issue:
261 – Goods issue
262 – Cancellation for goods issue

| MBEW.EVENT  | Event / {C10}  | CMM_E - Goods receipt  |     |
| ----------- | -------------- | ---------------------- | --- |
CMM_A – Goods issue
CMM_R – Return transfer
| MBEW.KLASSE  | {C1}  | fix “C“ for batch-related movement  |     |
| ------------ | ----- | ----------------------------------- | --- |
| MBEW.PRIO    | {N4}  | fix “9999“                          |     |
MBEW.DAT  Date  May alternatively also be transferred with DAT=<> /
ZEI=<>.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 293 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| MBEW.ZEI  | Time                       |                   |     |
| --------- | -------------------------- | ----------------- | --- |
| MBEW.DLG  | Executing command / {C10}  | e.g. MBEW         |     |
| MBEW.MNR  | Machine / {C10}            | Machine number    |     |
| MBEW.ANR  | Operation / {C40}          | Operation number  |     |
 Determination of SAP order from backlog of orders
| MBEW.ATK     | Article / {C40}      | Article number                    |     |
| ------------ | -------------------- | --------------------------------- | --- |
| MBEW.ATKBEZ  | Designation / {C40}  | Article designation               |     |
| MBEW.SAPANR  |  {C12}               | SAP order from backlog of orders  |     |
‚’/empty – definition via OP
MBEW.CNR  Batch / {C20}  Batch number for batch relation (internal batch number)
Determination of PPS batch results from batch stock
MBEW.DLL  Run-through batch / {C20}  Run-through batch number for batch reference
MBEW.LAGORT  {C10}  Storage location (e.g. from material buffer of machine)
MBEW.ZLO  {C10}  Material buffer (e.g. material buffer of machine)
| MBEW.SAPCNR  |  {C10}  | PPS batch  |     |
| ------------ | ------- | ---------- | --- |
‚’/empty – Determination via batch
MBEW.ATTR:6  Material type / {C10}  Material type to control uploads to PPS
Reference check of hz_typen table
| MBEW.OPT:RCK  | Upload / {C1}  | J – Upload movement to PPS  |     |
| ------------- | -------------- | --------------------------- | --- |
N – Do not upload movement to PPS
‚’/empty – Determine upload flag via material type
MBEW.STA:RCK  Uploaded / {C1}  J – identify movement as being uploaded
N – Movement has not yet been uploaded

| MBEW.CST    | {C1}   | Batch status (e.g. “F“ for free)  |     |
| ----------- | ------ | --------------------------------- | --- |
| MBEW.CKL    | {C1}   | Batch class (e.g. “G” for yield)  |     |
| MBEW.PNR    | {C10}  | Personnel number                  |     |
| MBEW.TNR    | {N8}   | Terminal user                     |     |
| MBEW.BEARB  | {C10}  | Editor                            |     |
| MBEW.EGR:1  | {DEC}  | Quantity in batch quantity unit   |     |
| MBEW.TYP:1  | {C10}  | Quantity type                     |     |
e.g.
“GUT“ for goods receipt, yield (101)
“VGR“ for consumption quantity (261)

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 294 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| MBEW.EINH:1  | {C3}   | Quantity unit                           |     |
| ------------ | ------ | --------------------------------------- | --- |
| MBEW.GR:1    | {C10}  | Quantity reason (e.g. blocking reason)  |     |
MBEW.EGR:2  {DEC}  Movement 531 only: Scrap in batch quantity unit
| MBEW.TYP:2   | {C10}  | Movement 531 only: Quantity type = “AUS“  |     |
| ------------ | ------ | ----------------------------------------- | --- |
| MBEW.EINH:2  | {C3}   | Movement 531 only: Quantity unit          |     |
| MBEW.GR:2    | {C10}  | Movement 531 only: Scrap reason           |     |
MBEW.EGR:5  {DEC}  Quantity of activity field 3 (for batch relation)
MBEW.EGR:6  {DEC}  Quantity of activity field 4 (for batch relation)
MBEW.EGR:7  {DEC}  Quantity of activity field 5 (for batch relation)
MBEW.EGR:8  {DEC}  Quantity of activity field 8 (for batch relation)
| MBEW.TYP:5 - 8  | {C10}  | Quantity type  |     |
| --------------- | ------ | -------------- | --- |
e.g.
“GUT“ for goods receipt, yield (101)
“VGR“ for consumption quantity (261)
MBEW.EINH:5 – 8  {C3}  Quantity unit (with batch relation from activity field)
| MBEW.GR:5 - 8  | {C10}    | Quantity reason             |     |
| -------------- | -------- | --------------------------- | --- |
| MBEW.ERWSTA:1  | –  {C1}  | Used customer-specifically  |     |
MBEW.ERWSTA:6
| MBEW.VERARB:1  | –  {C1}  | Used customer-specifically  |     |
| -------------- | -------- | --------------------------- | --- |
MBEW.VERARB:4
| MBEW.OPT:EAUS  | {C1}  | J – Flag for final issue effected  |     |
| -------------- | ----- | ---------------------------------- | --- |
When a component is withdrawn the last time in this
order
MBEW.OPT:ENDLIEF  {C1}  J – Flag for final delivery for the last goods receipt of the
order
…  …  For  further  fields,  please  refer  to  the  HYD-HDB
documentation about above-mentioned tables
Return
| ID  | Content / {type}  | Description  |     |
| --- | ----------------- | ------------ | --- |
|     |                   |              |     |
Validation checks
Error codes  Description
2709  Material type does not exist

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 295 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| 10.4.3    | Cutting plan         |     |     |     |
| --------- | -------------------- | --- | --- | --- |
| 10.4.3.1  | DLG=BAHNVERT.CREATE  |     |     |     |
Using the BAPI calls described in this section, allows for cutting plans to be created for an order. Cutting
plans are only used if the “cutting reels” machine type is used along with coil based manufacturing. They
describe the web-shaped structure of the output material of an OP. If a cutting plan already exists for an
order and machine it will be deleted beforehand.
Tables
| Table               | Key field  |     | Description                   |     |
| ------------------- | ---------- | --- | ----------------------------- | --- |
| mpl_bahnverteilung  |            |     | Cutting plan (header record)  |     |
| mpl_bahnlayout      |            |     | Cut layout (detailed record)  |     |
BAPI call
| ID   |     | Content / {type}  | Description          |     |
| ---- | --- | ----------------- | -------------------- | --- |
| DLG  |     | BAHNVERT.CREATE   | Create cutting plan  |     |
BAHNVERT.MANR  Operation / {C40}  Operation number of mother OP
| BAHNVERT.MNR  |     | Machine / {C10}  | Machine number  |     |
| ------------- | --- | ---------------- | --------------- | --- |
BAHNVERT.BAHNVERT  Cutting plan/ {C10}  Unique key of cutting plan
| BAHNVERT.ART  |     | Cut type / {C1}  | ‘V’ – prepared cutting plan  |     |
| ------------- | --- | ---------------- | ---------------------------- | --- |
‘M’ – creation of measurement (without OP reference)
| BAHNVERT.BEZ  |     | Designation / {C20}  | Designation  |     |
| ------------- | --- | -------------------- | ------------ | --- |
BAHNVERT.ANZBAHN:GES
Total of cuts / NUM  Total of cuts within the production order (parent and child
OP)
| ANR#1= to  |     | OP / {C40}  | Operation number (overall key)  |     |
| ---------- | --- | ----------- | ------------------------------- | --- |
ANR#n
| TYP#1= to  |     | Model / {C1}  | H – Parent OP  |     |
| ---------- | --- | ------------- | -------------- | --- |
L – Child OP
TYP#n
| BAHNART#1= to  |     | Type / {C1}  | L – Left cut  |     |
| -------------- | --- | ------------ | ------------- | --- |
R – Right cut
BAHNART#n
B – Cut /web
| BAHNNR#1= to  |     | Number / NUM  | Cut number 1 – n  |     |
| ------------- | --- | ------------- | ----------------- | --- |
BAHNNR#n
BREITE:S#1= to  Target width / DEC  Target width of a cut in mm

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 296 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BREITE:S#n
BREITE:I#1= to  Actual width / DEC  Actual width of a cut in mm
BREITE:I#n
Return
| ID  | Content / {type}  | Description  |     |
| --- | ----------------- | ------------ | --- |
|     |                   |              |     |
Validation checks
Error codes  Description

| 10.5      | Transport management (MPL-TRA)  |     |     |
| --------- | ------------------------------- | --- | --- |
| 10.5.1    | Create transport order          |     |     |
| 10.5.1.1  | DLG=TRANR.CREATE                |     |     |
Using the BAPI calls described in this section, it is possible to create a transportation order for batches or
resources.
Dependent products
| Product  | Bapi        | Description          |     |
| -------- | ----------- | -------------------- | --- |
| ADE      | ANR.COPY    | Create order         |     |
| MPL      | CNR.UPDATE  | Batch status change  |     |
BAPI-Call
| ID           | Content / {type}  | Description             |     |
| ------------ | ----------------- | ----------------------- | --- |
| DLG          | TRANR.CREATE      | Create transport order  |     |
| TRANR.ATK    | {C40}             | Material number         |     |
| TRANR.AUART  | {C5}              | Order type              |     |
| TRANR.SMP    | {C12}             | Source material buffer  |     |
| TRANR.TMP    | {C12}             | Target material buffer  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 297 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| TRANR.MNR      | {C10}  | Machine number                       |     |
| -------------- | ------ | ------------------------------------ | --- |
| TRANR.SANR     | {C40}  | Trigger operation                    |     |
| TRANR.CNR      | {C20}  | Batch number for transport           |     |
| TRANR.RES      | {C20}  | Resource number for transport        |     |
| TRANR.RESTYP   | {C10}  | Resource type for transport          |     |
| TRANR.SGR:P    | {DEC}  | Target quantity                      |     |
| TRANR.SGE:P    | {C3}   | Unit                                 |     |
| TRANR.DATFB    | {DAT}  | Planned start date                   |     |
| TRANR.DATSE    | {DAT}  | Planned finish date                  |     |
| TRANR.CALLDLG  | {C20}  | Internal dialog action (e.g. CA_WL)  |     |
TRANR.ASYNC  {C1}  J = transport orders are created asynchronously
Return
| ID        | Content / {type}  | Description                              |     |
| --------- | ----------------- | ---------------------------------------- | --- |
| RET.AUNR  | Order             | Order number of created transport order  |     |
Validation checks
Error codes  Description
7043  Work plan not found
1690  Material buffer not found
2817  Oder type not found
3201  Assigned resource not found
7039  Resource is not in source material buffer
7038  Batch is not in source material buffer
1612  Batch not found
1594  batch status not valid
3636  Batch is locked
3632  material number of batch is not valid
7041  Batch is still in transport

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 298 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 10.5.2    | Reserve transport order  |     |     |
| --------- | ------------------------ | --- | --- |
| 10.5.2.1  | DLG=TRANR.RESERVE        |     |     |
Using the BAPI calls described in this section, it is possible to reserve transportation orders for machines.
Dependent products
| Product  | Bapi           | Description          |     |
| -------- | -------------- | -------------------- | --- |
| ADE      | ANR.SETSTATUS  | Change order status  |     |
| MPL      | CNR.UPDATE     | Change batch status  |     |
BAPI call
| ID         | Content / {type}  | Description              |     |
| ---------- | ----------------- | ------------------------ | --- |
| DLG        | TRANR.RESERVE     | Reserve transport order  |     |
| TRANR.MNR  | Machine {C10}     | Machine number           |     |
TRANR.ANR  Operation {C40}  Operation of the transport order
Return
| ID  | Content / {type}  | Description  |     |
| --- | ----------------- | ------------ | --- |
|     |                   |              |     |
Validation checks
Error codes  Description
3702  Operation not found
7037  Operation is not in status initial
2613  Wrong operation status
107  Order type not valid
| 10.5.3    | Start transportation order  |     |     |
| --------- | --------------------------- | --- | --- |
| 10.5.3.1  | DLG=TRANR.START             |     |     |
Using the BAPI calls described in this section, it is possible to start transportation order at machine.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 299 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Dependent products
| Product  | Bapi        | Description             |     |
| -------- | ----------- | ----------------------- | --- |
| ADE      | A_AN        | Start operation         |     |
| MPL      | CNR.UPDATE  | batch status change     |     |
| WRM      | RES_STATUS  | resource status change  |     |
BAPI-Call
| ID            | Content / {type}  | Description                    |     |
| ------------- | ----------------- | ------------------------------ | --- |
| DLG           | TRANR.START       | Start transportation order     |     |
| TRANR.ATK     | {C40}             | Material number                |     |
| TRANR.SMP     | {C12}             | Source material buffer         |     |
| TRANR.TMP     | {C12}             | Target material buffer         |     |
| TRANR.MNR     | {C10}             | Machine number                 |     |
| TRANR.ANR     | {C40}             | Operation                      |     |
| TRANR.CNR     | {C20}             | batch number for transport     |     |
| TRANR.RES     | {C20}             | Resource number for transport  |     |
| TRANR.RESTYP  | {C10}             | Resource type for transport    |     |
Return
| ID  | Content / {type}  | Description  |     |
| --- | ----------------- | ------------ | --- |
|     |                   |              |     |
Validation checks
Error codes  Description
7039  Resource is not in source material buffer
7038  Batch is not in source material buffer
| 10.5.4    | Finish transportation order  |     |     |
| --------- | ---------------------------- | --- | --- |
| 10.5.4.1  | DLG=TRANR.END                |     |     |
Using the BAPI calls described in this section, it is possible to finish a running transportation order at
machine.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 300 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Dependent products
| Product  | Bapi        | Description                  |     |
| -------- | ----------- | ---------------------------- | --- |
| ADE      | A_AB        | Finish transportation order  |     |
| MPL      | CNR.UPDATE  | batch status change          |     |
C_UMB  batch replace
| WRM  | RES_STATUS  | Resource status change  |     |
| ---- | ----------- | ----------------------- | --- |
RES_UMB  Move resource
BAPI-Call
| ID             | Content / {type}  | Description                        |     |
| -------------- | ----------------- | ---------------------------------- | --- |
| DLG            | TRANR.END         | Finish transportation order        |     |
| TRANR.TMP      | {C12}             | Target material buffer             |     |
| TRANR.MNR      | {C10}             | Machine number                     |     |
| TRANR.ANR      | {C40}             | Operation of transportation order  |     |
| TRANR.EGR:GUT  | {DEC}             | Quantity                           |     |
Return
| ID  | Content / {type}  | Description  |     |
| --- | ----------------- | ------------ | --- |
|     |                   |              |     |
Validation checks
Error codes  Description

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 301 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

11  HYDRA Production Data Manager PDV - Master Data
| 11.1  | Please note for the basic dialogs described  |     |     |
| ----- | -------------------------------------------- | --- | --- |
All mandatory fields are provided with the addition “PK” (primary key = key field). All other fields are
optional and are processed if they are filled out.
| 11.2    | Events                                       |     |     |
| ------- | -------------------------------------------- | --- | --- |
| 11.2.1  | Edit event (DLG=PDVEVENTCFG.INSERT, UPDATE,  |     |     |
DELETE, COPY, LOCK, UNLOCK, SELECT)
PDV events can be edited using the BAPI calls described in this section. HYDRA-PDV events may be
recorded as general events at a machine and are saved in a corresponding log as soon as they occur.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
pdv_event_cfg  event  Event ID (PK) in the configuration table for PDV events
PDVEVENTCFG.
EVENT
BAPI call
| ID   | Content/{type}  | Description       |     |
| ---- | --------------- | ----------------- | --- |
| DLG  | PDVEVENTCFG.    | Create PDV event  |     |
INSERT
|     | PDVEVENTCFG. | Change PDV event  |     |
| --- | ------------ | ----------------- | --- |
UPDATE
|     | PDVEVENTCFG. | Delete PDV event  |     |
| --- | ------------ | ----------------- | --- |
DELETE
|     | PDVEVENTCFG. | Copy PDV event  |     |
| --- | ------------ | --------------- | --- |
COPY
|     | PDVEVENTCFG. | Block PDV event to be processed  |     |
| --- | ------------ | -------------------------------- | --- |
LOCK
|     | PDVEVENTCFG. | Unblock PDV event after processing  |     |
| --- | ------------ | ----------------------------------- | --- |
UNLOCK
|     | PDVEVENTCFG. | Select PDV event  |     |
| --- | ------------ | ----------------- | --- |
SELECT

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 302 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |     |
| --- | --- | --- | ------------------------ | --- |

| PDVEVENTCF | {C50}  | PK PDV event ID  |     |     |
| ---------- | ------ | ---------------- | --- | --- |
G.EVENT
| PDVEVENTCF | {C50}  | PK new (target) PDV event ID for COPY  |     |     |
| ---------- | ------ | -------------------------------------- | --- | --- |
G.EVENT:Z
| PDVEVENTCF | {C100}  | Description of the PDV event  |     |     |
| ---------- | ------- | ----------------------------- | --- | --- |
G.CAPTION
PDVEVENTCF {C1}  Flag whether the event is an alarm or not. Possible values: “Y”
G.ALERT  (yes, event is an alarm) or “N” (no, event is no alarm)
PDVEVENTCF {N}  Duration for the alarm signal when the PDV event occurs in
| G.ALERT:DURA |     | seconds  |     |     |
| ------------ | --- | -------- | --- | --- |
TION
Return
| ID         | Content/{type}  | Description                            |     |     |
| ---------- | --------------- | -------------------------------------- | --- | --- |
| PDVEVENTCF | {C50}           | PDVEVENTCFG.INSERT, PDVEVENTCFG.COPY:  |     |     |
G.EVENT  Return of PDV event ID of the configuration created
Plausibility checks
| Error codes  | Description                            |     |     |     |
| ------------ | -------------------------------------- | --- | --- | --- |
|              |                                        |     |     |     |
| 11.2.2       | List of events (DLG=PDVEVENTCFG.LIST)  |     |     |     |
This BAPI call lists the PDV events configured in HYDRA including their configuration.
Tables
| Table  | Key field  | Description  |     |     |
| ------ | ---------- | ------------ | --- | --- |
pdv_event_cfg  event  Event ID (PK) in the configuration table for PDV events
PDVEVENTCFG.
EVENT
BAPI call
| ID   | Content      | Description         |     |     |
| ---- | ------------ | ------------------- | --- | --- |
| DLG  | PDVEVENTCFG. | List of PDV events  |     |     |
LIST
PDVEVENTCF {C50}  Optional restriction to a certain PDV event
G.EVENT
| DATEI  | {C256}  | Specification of the file name for the list  |     |     |
| ------ | ------- | -------------------------------------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 303 of 356  |     |
| ---------------- | --- | ------------------- | ---------------- | --- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Return
| ID  | Content  | Description  |     |
| --- | -------- | ------------ | --- |
| —   | —        | —            |     |
Plausibility checks
| Error codes  | Description                                            |     |     |
| ------------ | ------------------------------------------------------ | --- | --- |
| 1656         | The file assigned to the name DATEI cannot be written  |     |     |
| 11.3         | Logical Channels                                       |     |     |
| 11.3.1       | Edit logical channels (DLG=LOGCHAN.INSERT, UPDATE,     |     |     |
DELETE, COPY, LOCK, UNLOCK, SELECT)
Logical channels required for HYDRA-PDV collection may be edited using the BAPI calls described in this
section.  Logical  channels  represent  the  central  configuration  for  assigning  physical  interfaces  of  a
machine (measuring channels) to logistic HYDRA values (characteristics, PDV events …).
By assigning them to a machine and a terminal, assigned characteristics or PDV events can be accessed
at the corresponding place of entry. Master data of logical channels are put to the second under version
control.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
pdv_logic_chan  masch_nr  Machine number (PK) of logical channels
LOGCHAN.MNR
pdv_logic_chan  capture_id  Terminal number (PK) of logical channels
LOGCHAN.TNR
pdv_logic_chan  chan_nr  Number of the physical channel (PK) of logical channels
LOGCHAN.LOGK
pdv_logic_chan  Fkey  ID of the logistic value (process parameter ID or PDV event)
|     | LOGCHAN.ID  | (PK) of logical channels  |     |
| --- | ----------- | ------------------------- | --- |
pdv_logic_chan  type  Channel  type,  which  logistic  type  it  is  about  (process
|     | LOGCHAN.TYP  | parameter or PDV event) (PK) of logical channels  |     |
| --- | ------------ | ------------------------------------------------- | --- |
pdv_logic_chan  valid_from  Valid from for master data put under version control (PK)
LOGCHAN.VALID
FROM

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 304 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| ID   | Content/{type}  | Description             |     |
| ---- | --------------- | ----------------------- | --- |
| DLG  | LOGCHAN.INSE    | Create logical channel  |     |
RT
|     | LOGCHAN.UPD | Change logical channel  |     |
| --- | ----------- | ----------------------- | --- |
ATE
|     | LOGCHAN.DEL | Delete logical channel  |     |
| --- | ----------- | ----------------------- | --- |
ETE
|     | LOGCHAN.COP | Copy logical channel  |     |
| --- | ----------- | --------------------- | --- |
Y
|     | LOGCHAN.LOC | Block logical channel to be processed  |     |
| --- | ----------- | -------------------------------------- | --- |
K
|     | LOGCHAN.UNL | Unblock logical channel after processing  |     |
| --- | ----------- | ----------------------------------------- | --- |
OCK
|     | LOGCHAN.SELE | Select logical channel  |     |
| --- | ------------ | ----------------------- | --- |
CT
| LOGCHAN.MN | {C20}  | PK machine number  |     |
| ---------- | ------ | ------------------ | --- |
R
| LOGCHAN.TNR  | {SHORT}  | PK terminal number  |     |
| ------------ | -------- | ------------------- | --- |
| LOGCHAN.LOG  | {NUM}    | PK channel number   |     |
K
| LOGCHAN.ID  | {C50}  | PK reference ID of recorded channel data  |     |
| ----------- | ------ | ----------------------------------------- | --- |
LOGCHAN.TYP  {C2}  PK  type  of  reference  ID  of  the  recorded  channel  (process
parameter or PDV event)
LOGCHAN.VALI {DATETIME}  PK valid from point in time for master data put under version
| DFROM      |        | control                                  |     |
| ---------- | ------ | ---------------------------------------- | --- |
| LOGCHAN.MN | {C20}  | PK new (target) machine number for COPY  |     |
R:Z
LOGCHAN.TNR {SHORT}  PK new (target) terminal number for COPY
:Z
| LOGCHAN.LOG | {NUM}  | PK new (target) channel number for COPY  |     |
| ----------- | ------ | ---------------------------------------- | --- |
K:Z
LOGCHAN.ID:Z  {C50}  PK new (target) reference ID of recorded channel data for COPY
LOGCHAN.VALI {DATETIME}  PK new (target) valid from point in time for master data put
| DFROM:Z  |     | under version control for COPY  |     |
| -------- | --- | ------------------------------- | --- |
…  …  For further fields, please refer to the HYD-HDB documentation

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 305 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

about above-mentioned tables
Return
| ID           | Content/{type}  | Description                                             |     |
| ------------ | --------------- | ------------------------------------------------------- | --- |
| LOGCHAN.MN   | {C20}           | LOGCHAN.INSERT, LOGCHAN.COPY:                           |     |
| R            |                 | Return of the keys of the configured PK channel number  |     |
| LOGCHAN.TNR  | {SHORT}         | LOGCHAN.INSERT, LOGCHAN.COPY:                           |     |
Return of the keys of the configured PK channel number
| LOGCHAN.LOG | {NUM}  | LOGCHAN.INSERT, LOGCHAN.COPY:                           |     |
| ----------- | ------ | ------------------------------------------------------- | --- |
| K           |        | Return of the keys of the configured PK channel number  |     |
| LOGCHAN.ID  | {C50}  | LOGCHAN.INSERT, LOGCHAN.COPY:                           |     |
Return of the keys of the configured PK channel number
| LOGCHAN.TYP  | {C2}  | LOGCHAN.INSERT, LOGCHAN.COPY:  |     |
| ------------ | ----- | ------------------------------ | --- |
Return of the keys of the configured PK channel number
| LOGCHAN.VALI | {DATETIME}  | LOGCHAN.INSERT, LOGCHAN.COPY:  |     |
| ------------ | ----------- | ------------------------------ | --- |
DFROM  Return of the keys of the configured PK channel number
Plausibility checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
550  Unknown channel reference type: Only process parameters (PP) and PDV events
are supported as references.
| 551  | The PDV event transferred is not available  |     |     |
| ---- | ------------------------------------------- | --- | --- |
552  Anonymous characteristics from TNT configuration only support measured values
(MW) as channel type
| 553  | Channel numbers between 0 and 9999 are valid only  |     |     |
| ---- | -------------------------------------------------- | --- | --- |
| 554  | Cycle times greater than 0 are allowed only        |     |     |
555  Wrong channel direction. Input and output channels are supported only.
556  Alarm channels are not supported for the channel data type indicated. This is only
possible for OTG, UTG, OPEG or UPEG (UTL, LTL, UPAL, LPAL).
| 2039    | Machine is not available                     |     |     |
| ------- | -------------------------------------------- | --- | --- |
| 1668    | Terminal is not available                    |     |     |
| 11.3.2  | List of logical channels (DLG=LOGCHAN.LIST)  |     |     |
This BAPI call lists the logical channels configured in HYDRA including their configuration.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 306 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
pdv_logic_chan  masch_nr  Machine number (PK) of logical channels
LOGCHAN.MNR
pdv_logic_chan  capture_id  Terminal number (PK) of logical channels
LOGCHAN.TNR
pdv_logic_chan  chan_nr  Number of the physical channel (PK) of the logical channels
LOGCHAN.LOGK
pdv_logic_chan  fkey  ID of the logistic value (process parameter ID or PDV event)
|     | LOGCHAN.ID  | (PK) of logic channels  |     |
| --- | ----------- | ----------------------- | --- |
pdv_logic_chan  type  Channel  type,  which  logistic  type  it  is  about  (process
|     | LOGCHAN.TYP  | parameter or PDV event) (PK) of logic channels  |     |
| --- | ------------ | ----------------------------------------------- | --- |
pdv_logic_chan  valid_from  Valid from for master data put under version control (PK)
LOGCHAN.VALID
FROM

BAPI call
| ID     | Content       | Description                                  |     |
| ------ | ------------- | -------------------------------------------- | --- |
| DLG    | LOGCHAN.LIST  | List of logical channels                     |     |
| DATEI  | {C256}        | Specification of the file name for the list  |     |
Return
| ID  | Content  | Description  |     |
| --- | -------- | ------------ | --- |
| —   | —        | —            |     |
Plausibility checks
| Error codes  | Description                                            |     |     |
| ------------ | ------------------------------------------------------ | --- | --- |
| 1656         | The file assigned to the name DATEI cannot be written  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 307 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 11.4    | Characteristic Attribute        |     |     |
| ------- | ------------------------------- | --- | --- |
| 11.4.1  | Edit characteristic attributes  |     |     |
(DLG=PAUMMAUSP.INSERT, UPDATE, DELETE, COPY,
LOCK, UNLOCK, NEW, SELECT)
Characteristic attributes can be edited by way of the BAPI calls described in this section. They are
required to record the necessary configurations of an inspection order characteristic for the generation of
samples. In this context, the different configuration versions of an inspection order characteristic are put
under version control for a certain period of time. Thus, it is possible to trace back, which configuration
applied for a characteristic at a certain point in time.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
caq_paumm_au rec_type  Rectype in characteristic attribute (PK)
| sp           | RECTYP   |                                        |     |
| ------------ | -------- | -------------------------------------- | --- |
| caq_paumm_au | bereich  | Area in characteristic attribute (PK)  |     |
| sp           | BER      |                                        |     |
caq_paumm_au pruefanf_nr  Inspection requirement number in characteristic attribute  (PK)
| sp  | PANNR  |     |     |
| --- | ------ | --- | --- |
caq_paumm_au pruefauft_nr  Inspection order number in characteristic attribute (PK)
| sp  | PAUNR  |     |     |
| --- | ------ | --- | --- |
caq_paumm_au afo  Order sequence in characteristic attribute (PK)
| sp  | AFO  |     |     |
| --- | ---- | --- | --- |
caq_paumm_au maschine_nr  Machine number in characteristic attribute (PK)
| sp  | MNR  |     |     |
| --- | ---- | --- | --- |
caq_paumm_au valid_from_ts  Valid from point in time in characteristic attribute (PK)
| sp  | VALIDFROM  |     |     |
| --- | ---------- | --- | --- |
BAPI call
| ID   | Content/{type)  | Description                      |     |
| ---- | --------------- | -------------------------------- | --- |
| DLG  | PAUMMAUSP.IN    | Create characteristic attribute  |     |
SERT
|     | PAUMMAUSP.U | Change characteristic attribute  |     |
| --- | ----------- | -------------------------------- | --- |
PDATE
|     | PAUMMAUSP.D | Delete characteristic attribute  |     |
| --- | ----------- | -------------------------------- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 308 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

ELETE
|     | PAUMMAUSP.C | Copy characteristic attribute  |     |
| --- | ----------- | ------------------------------ | --- |
OPY
|     | PAUMMAUSP.L | Block characteristic attribute to be processed  |     |
| --- | ----------- | ----------------------------------------------- | --- |
OCK
|     | PAUMMAUSP.U | Unblock characteristic attribute after processing  |     |
| --- | ----------- | -------------------------------------------------- | --- |
NLOCK
|     | PAUMMAUSP.S | Select characteristic attribute  |     |
| --- | ----------- | -------------------------------- | --- |
ELECT
| PAUMMAUSP.R | {C10}  | Rectyp (PK)  |     |
| ----------- | ------ | ------------ | --- |
ECTYP
| PAUMMAUSP.B | {C10}  | CAQ area (PK)  |     |
| ----------- | ------ | -------------- | --- |
ER
PAUMMAUSP.P {NUM}  Inspection request number in characteristic attribute (PK)
ANNR
PAUMMAUSP.P {NUM}  Inspection order number in characteristic attribute (PK)
AUNR
PAUMMAUSP.A {NUM}  Order sequence in characteristic attribute (PK)
FO
PAUMMAUSP. {C20}  Machine number in characteristic attribute (PK)
MNR
PAUMMAUSP.V {DATETIME}  Valid from point in time in characteristic attribute (PK)
ALIDFROM
| PAUMMAUSP.R | {C10}  | PK new (target) Rectyp for COPY  |     |
| ----------- | ------ | -------------------------------- | --- |
ECTYP
| PAUMMAUSP.B | {C10}  | PK new (target) CAQ area for COPY  |     |
| ----------- | ------ | ---------------------------------- | --- |
ER
PAUMMAUSP.P {NUM}  PK new (target) inspection request number for COPY
ANNR
PAUMMAUSP.P {NUM}  PK new (target) inspection order number for COPY
AUNR
| PAUMMAUSP.A | {NUM}  | PK new (target) order sequence for COPY  |     |
| ----------- | ------ | ---------------------------------------- | --- |
FO
| PAUMMAUSP. | {C20}  | PK new (target) machine number for COPY  |     |
| ---------- | ------ | ---------------------------------------- | --- |
MNR
PAUMMAUSP.V {DATETIME}  PK new (target) “colname designation” for COPY (column name)
ALIDFROM

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 309 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

…  …  For further fields, please refer to the HYD-HDB documentation
about above-mentioned tables
Return
| ID           | Content/{type}  | Description                               |     |
| ------------ | --------------- | ----------------------------------------- | --- |
| caq_paumm_au | {C10}           | PAUMMAUSP.INSERT, PAUMMAUSP.COPY:         |     |
| sp           |                 | Rectype in characteristic attribute (PK)  |     |
| caq_paumm_au | {C10}           | PAUMMAUSP.INSERT, PAUMMAUSP.COPY:         |     |
| sp           |                 | Area in characteristic attribute (PK)     |     |
| caq_paumm_au | {NUM}           | PAUMMAUSP.INSERT, PAUMMAUSP.COPY:         |     |
sp  Inspection requirement number in characteristic attribute (PK)
| caq_paumm_au | {NUM}  | PAUMMAUSP.INSERT, PAUMMAUSP.COPY:  |     |
| ------------ | ------ | ---------------------------------- | --- |
sp  Inspection order number in characteristic attribute (PK)
| caq_paumm_au | {NUM}       | PAUMMAUSP.INSERT, PAUMMAUSP.COPY:                |     |
| ------------ | ----------- | ------------------------------------------------ | --- |
| sp           |             | Order sequence in characteristic attribute (PK)  |     |
| caq_paumm_au | {C20}       | PAUMMAUSP.INSERT, PAUMMAUSP.COPY:                |     |
| sp           |             | Machine number in characteristic attribute (PK)  |     |
| caq_paumm_au | {DATETIME}  | PAUMMAUSP.INSERT, PAUMMAUSP.COPY:                |     |
sp  Valid from point in time in characteristic attribute (PK)
Plausibility checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
| —            | —            |     |     |
11.4.2  List of characteristic attributes (DLG=PAUMMAUSP.LIST)
This BAPI call lists the characteristic attributes configured in HYDRA including their configuration.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
caq_paumm_au rec_type  Rectype in characteristic attribute (PK)
| sp           | RECTYP   |                                        |     |
| ------------ | -------- | -------------------------------------- | --- |
| caq_paumm_au | bereich  | Area in characteristic attribute (PK)  |     |
| sp           | BER      |                                        |     |
caq_paumm_au pruefanf_nr  Inspection requirement number in characteristic attribute (PK)
| sp  | PANNR  |     |     |
| --- | ------ | --- | --- |
caq_paumm_au pruefauft_nr  Inspection order number in characteristic attribute (PK)
| sp  | PAUNR  |     |     |
| --- | ------ | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 310 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

caq_paumm_au afo  Order sequence in characteristic attribute (PK)
| sp  | AFO  |     |     |
| --- | ---- | --- | --- |
caq_paumm_au maschine_nr  Machine in characteristic attribute (PK)
| sp  | MNR  |     |     |
| --- | ---- | --- | --- |
caq_paumm_au valid_from_ts  Valid from period of the characteristic attribute (PK)
| sp  | VALIDFROM  |     |     |
| --- | ---------- | --- | --- |
BAPI call
| ID   | Content      | Description                        |     |
| ---- | ------------ | ---------------------------------- | --- |
| DLG  | PAUMMAUSP.LI | List of characteristic attributes  |     |
ST
| DATEI  | {C256}  | Specification of the file name for the list  |     |
| ------ | ------- | -------------------------------------------- | --- |
Return
| ID  | Content  | Description  |     |
| --- | -------- | ------------ | --- |
| —   | —        | —            |     |
Plausibility checks
| Error codes  | Description                                            |     |     |
| ------------ | ------------------------------------------------------ | --- | --- |
| 1656         | The file assigned to the name DATEI cannot be written  |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 311 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

12  HYDRA Production Data Manager WRM - Data Collection
| 12.1  | Please note for the posting dialogs described  |     |     |     |
| ----- | ---------------------------------------------- | --- | --- | --- |
All mandatory fields are displayed in gray; all other fields are optional and are processed, provided that
they are filled out.
| 12.2  | WRM Editing Dialogs  |     |     |     |
| ----- | -------------------- | --- | --- | --- |
This section describes the editing dialogs to map the terminal function with respect to the resource status.
| 12.2.1  | Log resource on (DLG=RES_AN)  |     |     |     |
| ------- | ----------------------------- | --- | --- | --- |
Using this dialog a resource can be logged on to an order. Depending on the configuration of the
corresponding resource type, quantities and times are then also posted onto the resource that is logged
on.
| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| DLG  | RES_AN  | Log resource on  |     |     |
| ---- | ------- | ---------------- | --- | --- |
DAT  {mm/dd/yyyy}  The date needs to be indicated to log a resource on.

| ZEI  | {seconds}  | Time, please see DAT.  |     |     |
| ---- | ---------- | ---------------------- | --- | --- |
RESID  N10  Resource  ID,  unique  number  to  identify  the  resource  in
database tables .
Alternative specification for RESTYP and RES
RESTYP  C4  Key  1  of  the  double  key  to  uniquely  identify  a  resource.
Resource type. Alternative specification for RESVERWEIS
RES  C40  Key 2 of the double key to uniquely identify a resource. Name
of the resource. Alternative specification for RESVERWEIS
| MNR   | C20  | Machine number  |                   |     |
| ----- | ---- | --------------- | ----------------- | --- |
| ANR   | C40  | Order number    |                   |     |
| PNR   | C10  | alter-          | Personnel number  |     |
native
| KNR     | C10  |              | Badge number  |     |
| ------- | ---- | ------------ | ------------- | --- |
| RESVER  | C20  | Version ID   |               |     |
KOMMENTAR  C500  Comment  on  the  logon  process,  is  saved  for  the  event
(event_res) in the event_dlg_data table .
| 12.2.2  | Log resource off (DLG=RES_AB)  |     |     |     |
| ------- | ------------------------------ | --- | --- | --- |
By way of this dialog a resource can be logged off from an order. Depending on the configuration of the
corresponding resource type, quantities and times are also posted onto the resource that is logged off.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 312 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| DLG  | RES_AB  | Log resource off  |     |     |
| ---- | ------- | ----------------- | --- | --- |
DAT  {mm/dd/yyyy}  The date needs to be entered to log a resource off.

| ZEI  | {seconds}  | Time, please see DAT.  |     |     |
| ---- | ---------- | ---------------------- | --- | --- |
RESID  N10  Resource  ID,  unique  number  to  identify  the  resource  in
database tables.
Alternative specification for RESTYP and RES
RESTYP  C4  Key  1  of  the  double  key  to  uniquely  identify  a  resource.
Resource type.
Alternative specification for RESVERWEIS
RES  C40  Key  2  of  the  double  key  to  uniquely  identify  a  resource.
Resource name.
Alternative specification for RESVERWEIS
| MNR   | C20  | Machine number  |                   |     |
| ----- | ---- | --------------- | ----------------- | --- |
| ANR   | C40  | Order number    |                   |     |
| PNR   | C10  | alter-          | Personnel number  |     |
native
| KNR     | C10  |              | Badge number  |     |
| ------- | ---- | ------------ | ------------- | --- |
| RESVER  | C20  | Version ID   |               |     |
KOMMENTAR  C500  Comment  on  the  logoff  process  is  saved  for  the  event
(event_res) in the event_dlg_data table.
| 12.2.3  | Set resource status (DLG=RES_STATUS)  |     |     |     |
| ------- | ------------------------------------- | --- | --- | --- |
The status of a resource can be reset by way of this dialog. The old and the new status are compared
with each other and corresponding plausibility checks are performed. Once the plausibility check has
been realized with success, affected tables are updated/specified.
Resource allocation in res_ress_belegung is updated respectively. If a resource is blocked, i.e. it gets a
status with the ID "verarb_planung" != "K" an entry is made in res_ress_belegung. In this context, the
date (DATB/ZEIB and DATE/ZEIE) is taken into account. If the current point in time is within the specified
period of time an entry is made. In case the end date is prior to this period of time, it is ignored. Provided
that the start date lies in the future, it is entered with the date lines specified.
In case the “bill of material processing” license (WRM-STL or DNC-STL) is available, superordinate
resources are blocked collectively according to the bill of material by increasing the collective block
counter by 1 for superordinate resources. When the resource is released, the collective block counter of
| the superior resource is reduced by 1.   |     |     |     |     |
| ---------------------------------------- | --- | --- | --- | --- |

Block: All superordinate resources. Collective block + 1.
Unblock: All superior resources. Collective block - 1..

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 313 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     |     |     | Production Data Manager  |     |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- | --- |

The PROD=x ID has been configured to switch to a defined status. If this value is entered a transferred
status is ignored. The system then searches for the status, which is assigned to exactly this ID in
res_status_zuord.prod and takes this status as new specification. The prod ID is always unique for each
“type – family” combination. If this is not the case, it is a configuration error. In this case the last status
found is used. This technology actually renders the RES_FREI and RES_ABSTA dialogs redundant.
They may be replaced by DLG=RES_STATUS|PROD=F (=RES_FREI) or DLG=RES_STATUS|PROD=B
(=RES_ABSTA).
| ID  | Type/max.  | field  | Description  |     |     |     |     |     |
| --- | ---------- | ------ | ------------ | --- | --- | --- | --- | --- |
length
| DLG  | RES_STATUS  |     | Status change  |     |     |     |     |     |
| ---- | ----------- | --- | -------------- | --- | --- | --- | --- | --- |
DAT  {mm/dd/yyyy}  The date specification is very important for setting statuses. As
|     |     |     | due  to  this  | date  and  the  | other  date  | specifications  |         | it  can  |
| --- | --- | --- | -------------- | --------------- | ------------ | --------------- | ------- | -------- |
|     |     |     | automatically  | be  recognized  | whether      | the             | status  | is  set  |
immediately or in future.
| ZEI  | {seconds}  |     | Time; please see DAT.  |     |     |     |     |     |
| ---- | ---------- | --- | ---------------------- | --- | --- | --- | --- | --- |
RESID  N10  Resource  ID,  unique  number  to  identify  the  resource  in
database tables.
Alternative specification for RESTYP and RES
RESTYP  C4  Key  1  of  the  double  key  to  uniquely  identify  a  resource.
Resource type.
Alternative specification for RESVERWEIS
RES  C40  Key  2  of  the  double  key  to  uniquely  identify  a  resource.
Resource name.
Alternative specification for RESVERWEIS
| RESSTA  | N10  |     | Target status of the resource  |     |     |     |     |     |
| ------- | ---- | --- | ------------------------------ | --- | --- | --- | --- | --- |
| PNR     | C10  |     | alter- Personnel number        |     |     |     |     |     |
native
| KNR     | C10  |     | Badge number  |     |     |     |     |     |
| ------- | ---- | --- | ------------- | --- | --- | --- | --- | --- |
| RESVER  | C20  |     | Version ID    |     |     |     |     |     |
PROD  C1  ID whether the status is to be determined in the database or
{F|B|U|…}  not.  If  nothing  is  entered  the  transferred  status  applies.  If
|     |     |     | entered  | the  appropriate  | status  | is  | searched  | in  .  |
| --- | --- | --- | -------- | ----------------- | ------- | --- | --------- | ------ |
res_status_zuord.prod.
At the moment the following is configured:
F = Release status (status when a resource is released)
B = Logoff status (status when a resource is logged off -  A_AB
)
|     |     |     | U  =  Upload  | status  (status  | when  | a  resource  | is  uploaded  | -   |
| --- | --- | --- | ------------- | ---------------- | ----- | ------------ | ------------- | --- |
RES_UPLOAD)
DATB  {mm/dd/yyyy}  Start  date  for  realizing  a  status  in  the  future.  Format
mm/dd/yyyy in local time zone
If nothing is entered or if the ID is left out or the date lies in the
past the status is reset immediately.
ZEIB  {seconds}  Start time for resetting a status in the future. Normally 0.
DATE  {mm/dd/yyyy}  End date for resetting a status with limited validity. If this date
is finally exceeded a monitoring process recognizes that the
status has expired and sets it to the only possible status that
has the status “free”.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     |     | Page 314 of 356  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | ---------------- | --- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max.  | field  | Description  |     |
| --- | ---------- | ------ | ------------ | --- |
length
Format mm/dd/yyyy in local time zone
If nothing is entered or the ID is left out an unlimited validity
period is set (max. date).
ZEIE  {seconds}  End time for a status change with limited validity.
If empty or = 0. Then automatic change over to 86400.
| ZLO  | C12  |     | Receiving storage location.  |     |
| ---- | ---- | --- | ---------------------------- | --- |
If empty the default value from status configuration is used as
storage location .
KOMMENTAR  C500  Comment  on  the  status  change  is  saved  for  the  event
(event_res) in the event_dlg_data table.
| 12.2.4  | Release resource (DLG=RES_FREI)  |     |     |     |
| ------- | -------------------------------- | --- | --- | --- |
With this dialog a resource is changed over to a released status. There is only one resource status with
the ID “released” for each type or family .
The process exactly corresponds to starting a RES_STATUS dialog with preselected release status.
Consequently, the start process and behavior is the same as for RES_STATUS. By using the ID
"PROD=F" for the dialog RES_STATUS, it is even to be preferred to the RES_FREI dialog. Example:
DLG=RES_STATUS|PROD=F|…
| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| DLG        | RES_FREI  | Status change  |     |     |
| ---------- | --------- | -------------- | --- | --- |
| RESSTA     | N10       | NO ENTRY!!!    |     |     |
| Rest like  |           |                |     |     |
RES_STATUS
12.2.5  Change resource status to “status after logging OP off”
(DLG=RES_ABSTA)
This dialog changes a resource status to a “status after logging OP off”, i.e. a resource switches to this
status  if  it  is  logged  off/interrupted  with  an  order.  There  is  only  one  resource  status  with  the
"Abmelde_Status" ID for each type or family .
The procedure exactly corresponds to starting a RES_STATUS dialog with preselected logoff status.
Thus, the start procedure and behavior is just the same as for RES_STATUS. By using the "PROD=B" ID
for  the  RES_STATUS  dialog  it  is  even  to  be  preferred  to  the  RES_ABSTA  dialog.  Example:
DLG=RES_STATUS|PROD=B|…

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 315 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| DLG        | RES_ABSTA  | Status change  |     |     |
| ---------- | ---------- | -------------- | --- | --- |
| RESSTA     | N10        | No Entry!!!    |     |     |
| Remainder  | like       |                |     |     |
RES_STATUS
| 12.2.6  | Repost resource (DLG=RES_UMB)  |     |     |     |
| ------- | ------------------------------ | --- | --- | --- |
This dialog reposts a resource onto another storage location.
| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| DLG  | RES_UMB  | Change of storage location                |     |     |
| ---- | -------- | ----------------------------------------- | --- | --- |
| ZLO  | C12      | New receiving storage location (target).  |     |     |
If nothing is entered the default value from status configuration is
used as storage location.
KOMMENTAR  C500  Comment on the changed storage location; is saved for the
event (event_res) in the table event_dlg_data.

| 12.2.7  | Mount resource (DLG=RES_EIN)  |     |     |     |
| ------- | ----------------------------- | --- | --- | --- |
A resource may be added to another resource using this dialog. From a technical point of view, a BOM
| relationship is established between mother and daughter resource.   |     |     |     |     |
| ------------------------------------------------------------------- | --- | --- | --- | --- |
Quantities or times are not posted onto the resource by this dialog. But the event is recorded and shown
in many different evaluations/reports.
| ID  | Type/max.  | field  | Description  |     |
| --- | ---------- | ------ | ------------ | --- |
length
| DLG  | RES_EIN  |     | Log resource off  |     |
| ---- | -------- | --- | ----------------- | --- |
DAT  {mm/dd/yyyy}  The date needs to be specified for logging a resource off.

| ZEI  | {seconds}  |     | Time; see DAT.  |     |
| ---- | ---------- | --- | --------------- | --- |
RESTYP:M  C4  Key 1 of the double key to uniquely identify a resource. Type of
the mother resource.

RES:M  C40  Key 2 of the double key to uniquely identify a resource. Name
of the mother resource.

RESTYP:T  C4  Key 1 of the double key to uniquely identify a resource. Type of
the daughter resource.

RES:T  C40  Key 2 of the double key to uniquley identify a resource. Name

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 316 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
of the daughter resource.

| PNR   | C10  | alter-  | Personnel number   |     |
| ----- | ---- | ------- | ------------------ | --- |
| KNR   | C10  | native  | Badge number       |     |
KOMMENTAR  C500  Logoff comment is saved for the event (event_res) in the table
event_dlg_data.

| 12.2.8  | Demount resource (DLG=RES_AUS)  |     |     |     |
| ------- | ------------------------------- | --- | --- | --- |
A resource can be demounted from another resource using this dialog. From a technical point of view, the
BOM relationship between the transferred mother and daughter resource is removed/deleted.
Quantities or times are not posted onto the resource by this dialog. But the actual event is recorded and
shown in different reports/evaluations.
| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| DLG  | RES_AUS  | Log resource off  |     |     |
| ---- | -------- | ----------------- | --- | --- |
DAT  {mm/dd/yyyy}  The date needs to be specified for logging a resource off.

| ZEI  | {seconds}  | Time; see DAT.  |     |     |
| ---- | ---------- | --------------- | --- | --- |
RESTYP:M  C4  Key 1 of the double key to uniquely identify a resource. Type of
the mother resource.

RES:M  C40  Key 2 of the double key to uniquely identify a resource. Name
of the mother resource.

RESTYP:T  C4  Key 1 of the double key to uniquely identify a resource. Type of
the daughter resource.

RES:T  C40  Key 2 of the double key to uniquely identify a resource. Name
of the mother resource.

| PNR   | C10  | alter- | Personnel number   |     |
| ----- | ---- | ------ | ------------------ | --- |
native
| KNR  | C10  |     | Badge number   |     |
| ---- | ---- | --- | -------------- | --- |
KOMMENTAR  C500  Logoff comment is saved for the event (event_res) in the table
event_dlg_data.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 317 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

Production Data Manager
12.3 DNC Dialogs
This section describes special dialogs to manage resources of the DNC type. These are functions to
upload and download resources. As DNC resources also include program files in addition to resource
data records, these program files are also transferred along with these operations. This establishes the
connection between the local data room (local hard disk directory) and the HYDRA server data room.
Depending on its configuration, the HYDRA server data room can also be connected with an external
programming system.
12.3.1 Load DNC resource to the machine (DLG=RES_DOWNL)
Using this dialog a DNC resource (res_typ.dnc_verarbeitung != "K") is logically “downloaded” to a
terminal, i.e. the dialog performs different plausibility checks and the logging function in event_res.
Files are not copied with RES_DOWNL. An external copy process is required for this. RES_DOWNL
exclusively provides for database processing.
Consequently, a logical, complete download process looks as follows:
1. Validity check (through RES_DOWNL|VERB=N| …)
2. Files are copied to the terminal, which is performed by external functions (not HYDDI).
3. Posting of the download (through RES_DOWNL, possibly with BZW=J)
Using different “definitions” of the IDs leads to different behaviors of the dialog. The “VERB“ ID
differentiates between “J“ = complete download incl. posting (by default) and “N” = only plausibility check
without posting. Using the "BZW=J" (booking obligation) ID avoids all plausibility checks. This is
reasonable if started several times, after starting with VERB=N.
Several resources can be transferred in one start process. That is why a number variable is planned for
RESID:n or RES:n and RESTYP:n. If only one resource is transferred, the number variable can be
omitted. If several resources are transferred they have to be indicated completely including their
respective RESID or RESTYP-RES combination. At the moment a maximum of 30 resources can be
transferred. Further resources are ignored. All plausibility checks are made for the resources specified
and all resources are recorded separately in event_res. However, VERB and BZW have to be configured
respectively.
The DNC-BP license is required to use this dialog.
ID Type/max. Description
field length
DLG RES_DOWNL Download
VERB C1 N = only validity check, without posting
J = validity check and posting (by default)
SCS-PDM_81.docx Version: 1.0.23049 Page 318 of 356

|     |     |     |     | Production Data Manager  |     |     |
| --- | --- | --- | --- | ------------------------ | --- | --- |

| ID  | Type/max.  | Description  |     |     |     |     |
| --- | ---------- | ------------ | --- | --- | --- | --- |
field length
| DAT  | {mm/dd/yyyy}  | Date specification for the download.   |     |     |     |     |
| ---- | ------------- | -------------------------------------- | --- | --- | --- | --- |
| ZEI  | {seconds}     | Time for the download                  |     |     |     |     |
RESVERWEIS:n  N10  Resource  ID,  unique  number  to  identify  the  resource  in
database tables. Alternative specification for RESTYP and
or
RES.
RESID:n
n = 1..30 (complete entry required). RESID takes priority over
RESTYP+RES.
RESTYP:n  C4  Key 1 of the double key to uniquely  identify  a resource.
|     |     | Resource type. Has always to be  |     | indicated together  |     | with  |
| --- | --- | -------------------------------- | --- | ------------------- | --- | ----- |
RES. Alternative specification for RESVERWEIS.
n = 1..30 (complete entry required).
RES:n  C40  Key 2 of the double key to uniquely  identify  a resource.
Resource name. Has always to be indicated together with
RESTYP. Alternative specification for RESVERWEIS.
n = 1..30 (complete entry required).
| BEARB  | C10  | Editor  |       |     |     |     |
| ------ | ---- | ------- | ----- | --- | --- | --- |
| PNR    | C10  | alter-  | PNR   |     |     |     |
native
| KNR       | C10  |                                | KNR  |     |     |     |
| --------- | ---- | ------------------------------ | ---- | --- | --- | --- |
| RESVER:n  | C20  | Version ID (not used as key)   |      |     |     |     |
n = 1..30 (complete entry required).
BZW  C1  J = Booking obligation, i.e. no plausibility checks
N = No booking obligation (by default)
OPT_DNCVERARB  C1  ID whether DNC resources are concerned ("L", "E", "O") or
not ("K").
"K"= no DNC resource
"L"=local
"E"=external
"O"=optimized
Currently not in use.
If not indicated the dialog determines this value on the basis
of the resource type of resource 1.
| MNR  | N8/C8  | Machine  |     |     |     |     |
| ---- | ------ | -------- | --- | --- | --- | --- |
KOMMENTAR  C255  Download comment. Is saved for the event (event_res) in the
event_dlg_data table. A reference is saved in event_res. If
the resource is indicated several times the comment is saved
|     |     | only  once.  | All  new  event_res  | entries  (for  | each  resource  |     |
| --- | --- | ------------ | -------------------- | -------------- | --------------- | --- |
specified) then refer to it.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 319 of 356  |     |
| ---------------- | --- | ------------------- | --- | --- | ---------------- | --- |

Production Data Manager
12.3.2 Upload DNC resource from the machine
(DLG=RES_UPLOAD)
This dialog logically uploads a DNC resource (res_typ.dnc_verarbeitung != "K") from a terminal, i.e. the
dialog takes over different plausibility checks, creates a new resource incl. attributes, if required, and
records it in event_res.
Files are not copied with RES_UPLOAD. This has to be realized by way of an external copy process.
RES_ UPLOAD only provides for database processing.
Consequently, a logical, complete upload process looks as follows:
1) Validity checking (through RES_UPLOAD|VERB=N| …)
2. Files are copied from the terminal into the HYDRA namespace, which is performed by functions
provided externally (not HYDDI).
3. Posting of the upload (through RES_UPLOAD, possibly with BZW=J). If required, a new resource incl.
user fields is created in this context. In case of optimization (res_typen.dnc_verarbeitung=”O”), the
resource is additionally set to “optimized” and the resource status is switched to the PROD=”U” status
(upload).
Using different “definitions” of the IDs leads to different behaviors of the dialog. The “VERB“ ID
differentiates between “J“ = complete upload incl. posting and creation of resources (by default) and “N” =
only validity checking without posting. Using the "BZW=J" (posting required) ID avoids all validity checks.
This is useful if started several times, after starting with VERB=N.
Two different behaviors can be defined by the MOD mode. MOD=N (= new) and MOD=U (= update).
When “N” is selected, it is checked, among other things, whether the resource already exists and can be
created anew. In case it has not yet been created, the new resource is saved incl. the user fields
transferred (RES.INSERT and several RESATTR.INSERT). A new resource does not have to be created
for MOD=U, the optimization flag is set in the resource instead (RES.UPDATE) and if defined the status is
switched to the status assigned to the PROD=U ID (DLG=RES_STATUS|PROD=U|…).
The upload is recorded in event_res. However, VERB and BZW have to be configured respectively.
This dialog requires the additional function "DNC-VGN".
ID Type/max. Description
field length
DLG RES_UPLOAD Upload
VERB C1 N = plausibility check only, without posting
J = plausibility check and posting (by default)
DAT {mm/dd/yyyy} Date specification for the upload.
SCS-PDM_81.docx Version: 1.0.23049 Page 320 of 356

|     |     |     |     |     |     | Production Data Manager  |     |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- | --- |

| ID  |     | Type/max.  | Description  |     |     |     |     |     |
| --- | --- | ---------- | ------------ | --- | --- | --- | --- | --- |
field length
| ZEI  |     | {seconds}  | Time for the upload  |     |     |     |     |     |
| ---- | --- | ---------- | -------------------- | --- | --- | --- | --- | --- |
MOD  C1  ID to differentiate whether a DNC resource is to be
 “U” =  changed or
“N” = newly created

RESVERWEIS  N10  Resource ID, unique number to identify the resource in
or  database tables. Alternative specification for RESTYP and
RES.
RESID
Valid for MOD="U" only (=Update), if "N" this ID is only
determined when the resource is created.
RESTYP  C4  Key 1 of the double key to uniquely identify a resource.
Resource type. Always to be indicated together with RES.
Alternative specification for RESVERWEIS if MOD="U".
RES  C40  Key 2 of the double key to uniquely identify a resource.
|     |     |     | Resource  | name.        | Always  to     | be  indicated  | along       | with  |
| --- | --- | --- | --------- | ------------ | -------------- | -------------- | ----------- | ----- |
|     |     |     | RESTYP.   | Alternative  | specification  | for            | RESVERWEIS  | if    |
MOD="U".
| BEARB  |     | C10  | Editor  |       |     |     |     |     |
| ------ | --- | ---- | ------- | ----- | --- | --- | --- | --- |
| PNR    |     | C10  | alter-  | PNR   |     |     |     |     |
native
| KNR     |     | C10  |                                | KNR  |     |     |     |     |
| ------- | --- | ---- | ------------------------------ | ---- | --- | --- | --- | --- |
| RESVER  |     | C20  | Version ID (not used as key)   |      |     |     |     |     |
RESFAMID  N10  Resource  family  identifier  (serial)  for  creating  a  new
resource. If both values (RESFAMID and RESFAM) remain
empty no family is defined for the resource.
RESFAM  C20  Resource  family  ID,  provided  that  the  resource  family
identifier is not entered.
BZW  C1  J = Booking obligation, i.e. no plausibility checks
N = No booking obligation (by default)
OPT_DNCVERARB  C1  Identifier whether it is a DNC resource ("L", "E", "O") or not
("K").
"K"=no DNC resource
"L"=local
"E"=external
"O"=optimized
If not indicated the dialog determines this value on the basis
of the resource type of the resource.
"O" triggers additional activities when it comes to posting.
| MNR  |     | N8/C8  | Machine   |     |     |     |     |     |
| ---- | --- | ------ | --------- | --- | --- | --- | --- | --- |
SPEICHORT:DATA  C128  Name of the DNC file without path and file extension
IDX:1..4  N10  A maximum of 4 user fied data. User field index. This field
has to be configured correctly by the assigned user field
key of the resource. The value entered here corresponds to
the field index of the database.
FIL:1..4  C20  A maximum of 4 user field data. Data content of the user
field. Please also see info on “IDX1…4”. The value entered
|     |     |     | here  corresponds  |     | to  the  data  | field  that  | matches  | the  |
| --- | --- | --- | ------------------ | --- | -------------- | ------------ | -------- | ---- |
specified field index of the database.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     |     | Page 321 of 356  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | ---------------- | --- |

|     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Type/max.  | Description  |     |     |     |     |
| --- | --- | ---------- | ------------ | --- | --- | --- | --- |
field length
KOMMENTAR  C500  Upload comment. Is saved for the event (event_res) in the
event_dlg_data table. A reference is saved in event_res. If
|     |     |     | the  resource  | is  indicated  | several  times  | the  comment   | is    |
| --- | --- | --- | -------------- | -------------- | --------------- | -------------- | ----- |
|     |     |     | saved  only    | once.  All     | new  event_res  | entries  (for  | each  |
resource specified) then refer to it.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 322 of 356  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- | --- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| 12.4  | Lists for DNC-Data  |     |     |     |
| ----- | ------------------- | --- | --- | --- |
To  operate  DNC  resources  there  are  special  lists  to  read  DNC  information  at  the
workplace (terminal) of the machine. These lists have also been configured to ensure
conformity and to perform required inspections.
| 12.4.1  | Enhancement of BDE lists             |     |     |     |
| ------- | ------------------------------------ | --- | --- | --- |
| 12.4.2  | Machines – DNC family (DLG=LIST;82)  |     |     |     |
The  machine  defines  which  DNC  family  is  assigned  to  the  machine.  Corresponding  attribute
configurations and, as a result, validity checks and functions are connected by these admissible families.
Moreover, the list provides a complete description of attributes! Consequently, user attributes do not have
to be read separately.
Structure of dialog data:
“DLG=LIST;82|DATEI={file name}|DAT=...|ZEI=...|USR=...|MOD=...“
Parameter:
| MOD=M|MNR=...  | Finding the family of a machine    |     |     |     |
| -------------- | ---------------------------------- | --- | --- | --- |
| MOD=T|TNR=...  | Finding the family of a terminal   |     |     |     |
Result list:
| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| MNR          | C20  | Machine                               |     |     |
| ------------ | ---- | ------------------------------------- | --- | --- |
| RESFAM       | C20  | Resource family                       |     |     |
| RESFAM:BEZL  | C60  | Designation                           |     |     |
| RESTYPID     | C4   | Resource type identification          |     |     |
| VORG         | C1   | J/N specification (= default family)  |     |     |
IDX:x  Integer  ID of the user field (free user attributes) within this user field
key
Numeric 1…n
 Value corresponds to value FELD IDX of resource attributes
| BEZK:x       | C20    | Designation, e.g. “DIAM”           |     |     |
| ------------ | ------ | ---------------------------------- | --- | --- |
| BEZL:x       | C80    | Long designation, e.g. “diameter”  |     |     |
| POS:x        | Short  | Display position/sequence          |     |     |
| FKT_PLAUS:x  | C10    | ID for algo. plausibility check    |     |     |
„=“ = IST_GLEICH check [level 1, other checks follow]
| CFG_1:x  | C10  | 1-4 for "DNC"  |     |     |
| -------- | ---- | -------------- | --- | --- |
…  1: Filter (for filter dialog at the terminal and for the entry when
| CFG_10:x  |     | uploading a new program)  |     |     |
| --------- | --- | ------------------------- | --- | --- |
2: Mandatory field for the DNC upload
3: Specification for the DNC upload

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 323 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
4: Read-only for the DNC upload
| KENN:x  | C20  | Acronym by which the field is addressed.   |     |     |
| ------- | ---- | ------------------------------------------ | --- | --- |
  This acronym is used in formulas to reference it as parameter,
for example.
Customer IDs are assigned within the individual namespace,
i.e. the system automatically prefixes a “U:”.
e.g. MNR
| EINH:x  | C3     | Unit                                     |     |     |
| ------- | ------ | ---------------------------------------- | --- | --- |
| TYP:x   | C1     | NUM, TEXT; DEC                           |     |     |
| FMT:x   | C20    | Format for console display (optional)    |     |     |
| NKS:x   | Short  | If DEC, decimal places                   |     |     |
| LEN:x   | Short  | Field length                             |     |     |
| VON:x   | DEC    | For NUM/DEC data type: min. value range  |     |     |
18,6
| BIS:x  | DEC  | For NUM/DEC data type: min. value range  |     |     |
| ------ | ---- | ---------------------------------------- | --- | --- |
18,6
ZEICH:x  C100  Which characters are allowed for the TEXT data type?
VORG_  C50  Default value that is, for example, used for calculating formulas
| EXPR:x       |                                      | if the initial field is not available or empty.  |     |     |
| ------------ | ------------------------------------ | ------------------------------------------------ | --- | --- |
| VORG_EDIT:x  | C80                                  | Default value for new input                      |     |     |
| 12.4.3       | Loadable DNC programs (DLG=LIST;83)  |                                                  |     |     |
By defining attributes of the DNC family and assigning them to the machine, it is determined which DNC
programs currently saved in the system may be transferred to the terminal. The list provides all programs
that are admissible or currently planned for the terminal. This restriction is improved through the resource
attributes  defined  and  the  corresponding  plausibility  checks.  In  this  context,  restrictions  are  also
predetermined by the operation that is logged on. The bills of material defined for DNC packages are
broken down to their elements and posted in the list.
Structure of dialog data:
„DLG=LIST;83|DATEI={file name}|DAT=...|ZEI=...|USR=...|MOD=...“
Parameter:
| MOD=A|...  | DNC programs filtered by order relation     |     |     |     |
| ---------- | ------------------------------------------- | --- | --- | --- |
| MOD=P|...  | DNC programs filtered via the program name  |     |     |     |
MOD=D|...  DNC programs without order relation. Direct reading on the resource stock. Selection via
DNC family
The selection parameters are:
  TNR

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 324 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- |

  MNR
  ANR
  RES
Valid combinations:
|        |     | TNR  |     | MNR  | ANR  |     | RES  |
| ------ | --- | ---- | --- | ---- | ---- | --- | ---- |
| MOD:A  |     | No   |     | No   | Yes  |     | No   |
| MOD:P  |     | No   |     | Yes  | No   |     | Yes  |
| MOD:D  |     | Yes  |     | Yes  | No   |     | No   |

| ID  | Type/max.  | field  | Description  |     |     |     |     |
| --- | ---------- | ------ | ------------ | --- | --- | --- | --- |
length
| MNR  | C20  |     | MOD:A:   |     |     |     |     |
| ---- | ---- | --- | -------- | --- | --- | --- | --- |
if started with parameter MNR or TNR then machine on which
the OP is planned.
|     |     |     | MOD:P:   |     |     |     |     |
| --- | --- | --- | -------- | --- | --- | --- | --- |
Transferred machine
|     |     |     | MOD:D:   |     |     |     |     |
| --- | --- | --- | -------- | --- | --- | --- | --- |
Transferred machine
| ANR  | C40  |     | MOD:A:   |     |     |     |     |
| ---- | ---- | --- | -------- | --- | --- | --- | --- |
OP which this resource is required for.
|     |     |     | MOD:P:   |     |     |     |     |
| --- | --- | --- | -------- | --- | --- | --- | --- |
empty
|     |     |     | MOD:D:   |     |     |     |     |
| --- | --- | --- | -------- | --- | --- | --- | --- |
empty
| RESTYPID  | C4   |     | Type ID                    |     |     |     |     |
| --------- | ---- | --- | -------------------------- | --- | --- | --- | --- |
| RESTYP    | C20  |     | Resource type              |     |     |     |     |
|           | C60  |     | Resource type designation  |     |     |     |     |
RESTYP_BEZL
| RES          | C40  |     | Resource                     |     |     |     |     |
| ------------ | ---- | --- | ---------------------------- | --- | --- | --- | --- |
| VERWEIS      | N10  |     | Resource ID                  |     |     |     |     |
| RESFAM       | C20  |     | DNC family                   |     |     |     |     |
| RESFAM_BEZL  | C60  |     | DNC family                   |     |     |     |     |
| OPT_DATEIVOR | C1   |     | Optimized program available  |     |     |     |     |
H
| BEARBDAT  | {mm/dd/yyyy}  |     | Date  |     |     |     |     |
| --------- | ------------- | --- | ----- | --- | --- | --- | --- |
| BEARBZEI  | {seconds}     |     | Time  |     |     |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     |     | Page 325 of 356  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| OPT_DNCVERA | C3  | DNC processing with optimization procedure  |     |     |
| ----------- | --- | ------------------------------------------- | --- | --- |
RB
| OPT_DATEIBASI | C1  | Optimization, file-based  |     |     |
| ------------- | --- | ------------------------- | --- | --- |
ERT
| OPT_EXTGUEL | C5  | Valid file extension  |     |     |
| ----------- | --- | --------------------- | --- | --- |
T
| OPT_EXTOPTIM  | C5    | Optimized file extension          |     |     |
| ------------- | ----- | --------------------------------- | --- | --- |
| OPT_PATH      | C128  | Path of opt. file                 |     |     |
| DATEI         | C128  | File name                         |     |     |
| DATEI_SIZE    | N     | File size                         |     |     |
| DATEI_LOKAL   | C1    | Locally available                 |     |     |
| AKTIV         | C1    | Active                            |     |     |
| OPT_VERSION   | C1    | Optimized                         |     |     |
| RESSTA        | N10   | Status                            |     |     |
| RESSTABEZ     | C60   | Status designation                |     |     |
| OPT_ERF       | C1    | Blocked                           |     |     |
| SSPERR        | C1    | Collective block                  |     |     |
| SSTA          | N10   | Collective status                 |     |     |
| SSTABEZ       | C60   | Designation of collective status  |     |     |
| COLOR         |       | Color                             |     |     |
| META_RES      |       | Package J/N                       |     |     |
C1
| RESTYP:M   | C4   | ResTyp parent  |     |     |
| ---------- | ---- | -------------- | --- | --- |
| VERWEIS:M  | N10  | ResID parent   |     |     |
| RES:M      | C20  | ResNr parent   |     |     |
Comments:
  The configuration “anzeige_teminal J/N“ of the resource must be set to “J“. Otherwise, the element or
package is not displayed. However, if the element is part of a package, it is displayed anyway.
  For package elements data are taken over 1:1 from resource types, i.e. the package values are not
“handed down” to the elements
 With respect to the configuration, it has to be ensured that resource types of the main programs and
subprograms are configured correctly. The “package” setting at the resource type is not relevant in this
context.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 326 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 12.5  | WRM Maintenance Dialog  |     |     |
| ----- | ----------------------- | --- | --- |
This section deals with special dialogs for managing resource maintenances. These are functions to set
the  maintenance  status,  activate  and  deactivate  maintenances  as  well  as  to  restart  interval
maintenances.
| 12.5.1  | Maintenance status and activation (DLG=RES_WART)  |     |     |
| ------- | ------------------------------------------------- | --- | --- |
By way of this dialog
  the status of a resource maintenance is set (MOD=Z)
  a maintenance is activated or deactivated (MOD=A)
  a resource maintenance is reset and prepared for the next maintenance (MOD=R)

In all 3 modes current maintenance data are first saved as event. These events are used for logging and
reports.
Depending on the mode, different functions are performed:
  Set the resource maintenance status (MOD=Z). The WARTSTA parameter transfers the new
status that is to be set. The status is set for the maintenance stated.
  Activate or deactivate (MOD=A) the maintenance. The AKTIV (J/N) parameter indicates whether
the maintenance is to be activated or deactivated.
  Reset resource maintenance (MOD=R). All actual values are set to 0 and target values are
calculated for the next maintenance. The AUFSATZ (S/I) parameter indicates whether the new
calculation is to be based on the old target value “S” or on the current actual value “I”. The
LWART:DAT, LWART:ZEI and LWART:USR parameters save the date, time and person of the
maintenance made.

Finally, a comment is saved for all modes.

| ID  | Type/max.  | Description  |     |
| --- | ---------- | ------------ | --- |
field length
| DLG  | RES_WART  | Set maintenance data  |     |
| ---- | --------- | --------------------- | --- |
| MOD  | C1        | Z = set status        |     |
A = activate/deactivate
R = reset

| DAT  | {mm/dd/yyyy}  | Date specification for the download.   |     |
| ---- | ------------- | -------------------------------------- | --- |
| ZEI  | {seconds}     | Time for the download                  |     |
RESVERWEIS  N10  Resource  ID,  unique  number  to  identify  the  resource  in
database tables. Alternative specification for RESTYP and
or
RES.
RESID
RESID takes priority over the RESTYP+RES specification.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 327 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| ID  | Type/max.  | Description  |     |     |     |     |
| --- | ---------- | ------------ | --- | --- | --- | --- |
field length
RESTYP  C4  Key 1 of the double key to uniquely  identify  a resource.
|     |     | Resource  | type.  Always  | to  be  | stated  along  with  | RES.  |
| --- | --- | --------- | -------------- | ------- | -------------------- | ----- |
Alternative specification for RESVERWEIS.

RES  C40  Key 2 of the double key to uniquely  identify  a resource.
Resource name. Always to be stated along with RESTYP.
Alternative specification for RESVERWEIS.

| WARTVERWEIS  | N10  | Reference to the defined maintenance  |     |     |     |     |
| ------------ | ---- | ------------------------------------- | --- | --- | --- | --- |
 event_res.info_03
| WARTVERWEIS  | N10  | Reference to the defined maintenance  |     |     |     |     |
| ------------ | ---- | ------------------------------------- | --- | --- | --- | --- |
 event_res.info_03
| PNR   | C10  | alter- | Personnel number  |     |     |     |
| ----- | ---- | ------ | ----------------- | --- | --- | --- |
native
| KNR     | C10  |                                | Badge number  |     |     |     |
| ------- | ---- | ------------------------------ | ------------- | --- | --- | --- |
| RESVER  | C20  | Version ID (not used as key)   |               |     |     |     |

| ZUSTAND  | N10  | New status [value range 0 to 3]  |     |     |     |     |
| -------- | ---- | -------------------------------- | --- | --- | --- | --- |
| AKTIV    | C1   | New active status:               |     |     |     |     |
J=enable, N=disable
| KOMMENTAR  | C255  | Comment                   |     |     |     |     |
| ---------- | ----- | ------------------------- | --- | --- | --- | --- |
| LWART:DAT  | DATE  | Date of last maintenance  |     |     |     |     |

| LWART:ZEI  | TIME  | Time of last maintenance  |     |     |     |     |
| ---------- | ----- | ------------------------- | --- | --- | --- | --- |

| LWART:USR  | C10  | Person of last maintenance  |     |     |     |     |
| ---------- | ---- | --------------------------- | --- | --- | --- | --- |

| 12.6  | WRM Measures Dialog  |     |     |     |     |     |
| ----- | -------------------- | --- | --- | --- | --- | --- |
This section describes special dialogs that have been configured to manage resource measures. At the
moment this is a function to define a new measure for a resource. At the same time this activity is
recorded for reports in HYDRA.
| 12.6.1  | Activate measure (DLG=RES_MASS)  |     |     |     |     |     |
| ------- | -------------------------------- | --- | --- | --- | --- | --- |
Using this dialog, a measure is activated, i.e. the entered measure is defined within the resource status.
The provided comment is saved.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 328 of 356  |     |
| ---------------- | --- | ------------------- | --- | --- | ---------------- | --- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| ID  | Type/max.  | Description  |     |     |     |     |
| --- | ---------- | ------------ | --- | --- | --- | --- |
field length
| DLG  | RES_MASS      | Set measure                            |     |     |     |     |
| ---- | ------------- | -------------------------------------- | --- | --- | --- | --- |
| DAT  | {mm/dd/yyyy}  | Date specification for the download.   |     |     |     |     |
| ZEI  | {seconds}     | Time for the download                  |     |     |     |     |
RESVERWEIS  N10  Resource  ID,  unique  number  to  identify  the  resource  in
or  database tables. Alternative specification for RESTYP and
RES.
RESID
RESID takes priority over the RESTYP+RES specification.
RESTYP  C4  Key 1 of the double key to uniquely  identify  a resource.
|     |     | Resource  type.  | Always  | to  be  entered  | along  with  | RES.  |
| --- | --- | ---------------- | ------- | ---------------- | ------------ | ----- |
Alternative specification for RESVERWEIS.

RES  C40  Key 2 of the double key to uniquely  identify  a resource.
Resource name. Always to be entered along with RESTYP.
Alternative specification for RESVERWEIS.

| PNR   | C10  | alter- Personnel number  |     |     |     |     |
| ----- | ---- | ------------------------ | --- | --- | --- | --- |
native
| KNR     | C10  | Badge number                   |     |     |     |     |
| ------- | ---- | ------------------------------ | --- | --- | --- | --- |
| RESVER  | C20  | Version ID (not used as key)   |     |     |     |     |

| MASSNR  | N10  | Measure number  |     |     |     |     |
| ------- | ---- | --------------- | --- | --- | --- | --- |

| 12.7    | Lists for Resource Data       |     |     |     |     |     |
| ------- | ----------------------------- | --- | --- | --- | --- | --- |
| 12.7.1  | Resource list (DLG=LIST;115)  |     |     |     |     |     |
The list is used to select a resource.
Structure of dialog data:
“DLG=LIST;115|DATEI={file_name}|DAT=...|ZEI=...|USR=...|RESTYP=...|RESFAM=...|RES=…|AN
R=…|AKRO=…|MOD=…|“
Parameter:
Parameters are optional and support wildcard characters (%).
| RESTYP =...  |  restrict the list by a resource type  |     |     |     |     |     |
| ------------ | -------------------------------------- | --- | --- | --- | --- | --- |
RESFAM =...  restrict the list by a resource family. The designation is to be indicated here, not the ID.
| RES =...  | Restrict the list by a resource.                      |     |     |     |     |     |
| --------- | ----------------------------------------------------- | --- | --- | --- | --- | --- |
| ANR =...  | Show only resources that are planned for the order.   |     |     |     |     |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 329 of 356  |     |
| ---------------- | --- | ------------------- | --- | --- | ---------------- | --- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

AKRO=…  Fast user fields are available as dynamic fields. When starting the list, they can be
requested, separated by semicolon using the AKRO=FU:1 to FU:66 ID.
MOD=M :   As set union the list includes all resources that are either logged on/active to/on the
transferred order (ANR=) or that are planned for this order. In this case, only resources are selected,
which may be logged on explicitly (configuration of the resource stock) or that are to be displayed in the
resource list (configuration of the resource type).
OPT:BEDRES=N:  The list does not include required resources. This option allows for the resource
list to be requested without required resources. All other values, except for “N” mean that the list also
includes required resources. This function cannot be combined with MOD=M.
Example:
| hymw -u2020  |     |     |     |     |
| ------------ | --- | --- | --- | --- |
-c"DLG=LIST;115|DATEI=l.lst|DAT=today|ZEI=now|USR=2020|RESTYP=WNR|  RESFAM=
Soft%|RES=066% |AKRO=FU:12;FU:20|"

Result list:
| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| RESTYP      | C4                                   | Resource type                |     |     |
| ----------- | ------------------------------------ | ---------------------------- | --- | --- |
| RESFAM      | C20                                  | Resource family              |     |     |
| RES         | C40                                  | Resource number              |     |     |
| BEZ         | C40                                  | Designation                  |     |     |
| RESSTA      | Integer                              | Current status               |     |     |
| RESVERWEIS  | Integer                              | Internal ID                  |     |     |
| RESVER      | C20                                  | Resource version             |     |     |
| RESSTATXT   | C20                                  | Resource status text         |     |     |
| RESTYPBEZ   | C20                                  | Resource type designation    |     |     |
| RESFAMBEZ   | C20                                  | Resource family designation  |     |     |
| COLOR       | Integer                              | Color                        |     |     |
| MATPUF:I    | 12                                   | Current storage location     |     |     |
| MNR         | C20                                  | Active machine               |     |     |
| ANR         | C40                                  | Active operation             |     |     |
| BZG:RESTYP  | C4                                   | Reference resource type      |     |     |
| BZG:RES     | C40                                  | Reference resource           |     |     |
| SLP         | Integer                              | Bill of material item        |     |     |
| 12.7.2      | Resource Status List (DLG=LIST;116)  |                              |     |     |
List of all possible statuses for a resource.
Structure of dialog data:
“DLG=LIST;116|DATEI={file_name}|DAT=...|ZEI=...|USR=...|RESTYP=...|RESFAM=...|RES=…“

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 330 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

Parameter:
Parameters are optional.
| RESTYP =...  | Restrict the list by a resource type  |     |     |     |
| ------------ | ------------------------------------- | --- | --- | --- |
RESFAM =...  Restrict the list by a resource family. The designation is to be indicated here, not the ID.
| RES =...  | Restrict the list by a resource.   |     |     |     |
| --------- | ---------------------------------- | --- | --- | --- |
Example:
| hymw -u2020   |     |     |     |     |
| ------------- | --- | --- | --- | --- |
-c"DLG=LIST;116|DATEI=l.lst|DAT=today|ZEI=now|USR=2020|RES=0668258-
WKS|RESTYP=WNR|RESFAM= Soft|"
Result list:
| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| OPT:SIBTNR  | C1                               | Display of the resource at the terminal   |     |     |
| ----------- | -------------------------------- | ----------------------------------------- | --- | --- |
| STUFE       | Integer                          | Authorization level                       |     |     |
| COLOR       | Integer                          | Status color                              |     |     |
| MATPUF      | C12                              | Storage location when setting the status  |     |     |
| PRIO        | Integer                          | Priority                                  |     |     |
| PKENN       | C1                               | Posting indicator                         |     |     |
| RESFAMID    | Integer                          | Resource family ID                        |     |     |
| RESTYP      | C4                               | Resource type                             |     |     |
| RESSTA      | Integer                          | Status                                    |     |     |
| BEZ         | C20                              | Status designation                        |     |     |
| OPT:ERF     | C1                               | Collection/processing                     |     |     |
| OPT:PLAN    | C1                               | HLS assignment                            |     |     |
| 12.7.3      | List of measures (DLG=LIST;117)  |                                           |     |     |
List of all possible measures for a resource.
Structure of dialog data:
“DLG=LIST;117|DATEI={file_name}|DAT=...|ZEI=...|USR=...|RESFAM=...|RESFAMID=...|RES=…“
Parameter:
Parameters are optional.
RESFAM =...    Restrict the list by a resource family (designation).
| RESFAMID =...   | Restrict the list by a resource family (ID).   |     |     |     |
| --------------- | ---------------------------------------------- | --- | --- | --- |
| RES =...        |   Restrict the list by a resource.             |     |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 331 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

Example:
| hymw -u2020   |     |     |     |     |
| ------------- | --- | --- | --- | --- |
-c"DLG=LIST;117|DATEI=l.lst|DAT=today|ZEI=now|USR=2020|RES=0668257-
WKS|RESFAMID=10001|RESFAM=Handih.|"
Result list:
| ID  | Type/max.  | field  | Description  |     |
| --- | ---------- | ------ | ------------ | --- |
length
| BEZK      | C20                            |     | Short designation             |     |
| --------- | ------------------------------ | --- | ----------------------------- | --- |
| BEZL      | C60                            |     | Long designation              |     |
| DATE      | Datum                          |     | Date valid till               |     |
| DATB      | Datum                          |     | Date valid from               |     |
| ZEIE      | Integer                        |     | Time valid till               |     |
| ZEIB      | Integer                        |     | Time valid from               |     |
| BEM       | C200                           |     | Comment                       |     |
| MASSNR    | Integer                        |     | ID of measure                 |     |
| RESFAM    | C20                            |     | Resource family               |     |
| RESFAMID  | Integer                        |     | Reference to resource family  |     |
| RESTYP    | C4                             |     | Resource type                 |     |
| TYP       | C1                             |     | Type of measure               |     |
| VAB       | C15                            |     | Responsibility area           |     |
| 12.7.4    | Resource types (DLG=LIST;118)  |     |                               |     |
List of all possible resource types.
Structure of dialog data:
“DLG=LIST;118|DATEI={file name}|DAT=...|ZEI=...|USR=...|“
Parameter:
none
Example:
hymw -u2020 -c "DLG=LIST;118|DATEI=l.lst|DAT=today|ZEI=now|USR=2020|"
Result list:
| ID  |     | Type/max.  | Description  |     |
| --- | --- | ---------- | ------------ | --- |
field length
| OPT:AZSWSIB    |     | C10      | Show in reports                  |     |
| -------------- | --- | -------- | -------------------------------- | --- |
| OPT:VERB       |     | C1       | Posting of the resource          |     |
| PLAUS:BEL      |     | C1       | Assignment within HYDRA-HLS      |     |
| RESTYPEXT      |     | C10      | Designation                      |     |
| BEZL           |     | C60      | Long designation                 |     |
| VERB:BMK1..11  |     | Integer  | Posting for operating hours      |     |
| OPT:DATEI      |     | C1       | File-based resource              |     |
| OPT:DNC        |     | C1       | Indicator for DNC processing     |     |
| EXT:GUELITG    |     | C5       | File extension                   |     |
| EXT:OPTIM      |     | C5       | File extension, optimized files  |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 332 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| ID  |     | Type/max.  | Description  |     |
| --- | --- | ---------- | ------------ | --- |
field length
| OPT:AUTOANMELD  |                                 | C1   | Log resource on/off with order  |     |
| --------------- | ------------------------------- | ---- | ------------------------------- | --- |
| CFG:1..10       |                                 | C1   | Configuration settings          |     |
| PATH            |                                 | C8   | Reference to the hy_path table  |     |
| AUTOANLAG       |                                 | C1   | Create resource automatically   |     |
| RESTYP          |                                 | C4   | Resource type                   |     |
| OPT:VBR         |                                 | C1   | Control                         |     |
| USRFLD          |                                 | C20  | Assigned user field ID          |     |
| 12.7.5          | Resource family (DLG=LIST;119)  |      |                                 |     |
List of all possible resource families.
Structure of dialog data:
“DLG=LIST;119|DATEI={file name}|DAT=...|ZEI=...|USR=...|RESTYP=...|“
Parameter:
Parameters are optional.
| RESTYP =...  |  Restrict the list by a resource type  |     |     |     |
| ------------ | -------------------------------------- | --- | --- | --- |
Example:
| hymw -u2020   |     |     |     |     |
| ------------- | --- | --- | --- | --- |
-c"DLG=LIST;119|DATEI=cb.lst|DAT=today|ZEI=now|USR=2020|RESTYP=WNR|"
Result list:
| ID  |     | Type/max.  field  | Description  |     |
| --- | --- | ----------------- | ------------ | --- |
length
| RESFAM         |     | C20      | Resource family                         |     |
| -------------- | --- | -------- | --------------------------------------- | --- |
| BEZL           |     | C60      | Long designation                        |     |
| VORG:RES       |     | C50      | Default specification of resource name  |     |
| OPT:KOPIE      |     | C1       | Performance when copying the resource   |     |
| OPT:EINST      |     | C1       | Parameters for Viewer                   |     |
| FKT:SPEICHORT  |     | Integer  | Autom. generation of names              |     |
| CFG:1..10      |     | C1       | Configuration parameters                |     |
| RESFAMID       |     | Integer  | ID of the resource family               |     |
| RESTYP         |     | C4       | Resource type                           |     |
| SPEICHART      |     | C1       | Storage type of the family              |     |
| USRFLD         |     | C20      | Assigned user field ID                  |     |
| VAB            |     | C15      | Responsibility area                     |     |
| OPT:RESVER     |     | C10      | Version procedure                       |     |
| VIEWER:DATA    |     | C10      | Viewer to display the resource file     |     |
| VIEWER:EINST   |     | C10      | Parameter fields for the viewer         |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 333 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

| 12.7.6  | Resource maintenance (DLG=LIST;120)  |     |     |     |
| ------- | ------------------------------------ | --- | --- | --- |
List of all possible resource maintenances.
Structure of dialog data:
“DLG=LIST;120|DATEI={file name}|DAT=...|ZEI=...|USR=...|ANR=…|AKTIV=…|BEZ=...|“
Parameter:
Parameters are optional and support wildcard characters (%).
| ANR =...    | Restrict the list by an order                        |     |     |     |
| ----------- | ---------------------------------------------------- | --- | --- | --- |
| AKTIV =...  | Restrict the list by active or inactive              |     |     |     |
| BEZ =...    | Restrict the list using the maintenance designation  |     |     |     |
Example:
| hymw -u2020   |     |     |     |     |
| ------------- | --- | --- | --- | --- |
-c"DLG=LIST;119|DATEI=cb.lst|DAT=today|ZEI=now|USR=2020|RESTYP=WNR|"
Result list:
| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| AKTIV       | C1       | Active maintenance                 |     |     |
| ----------- | -------- | ---------------------------------- | --- | --- |
| APUNR       | C40      | Work plan                          |     |     |
| ANR         | C40      | Order number                       |     |     |
| BEZ         | C60      | Maintenance designation            |     |     |
| OPT:BZG     | C1       | Reference of values                |     |     |
| DATE        | Datum    | For maintenance monitoring         |     |     |
| DATB        | Datum    | For maintenance monitoring         |     |     |
| INFO:1..7   | C80      | Info value                         |     |     |
| ANZ:I       | Integer  | Actual number                      |     |     |
| BSTD:I      | Integer  | Actual operating hours             |     |     |
| TAKT:I      | Integer  | Actual cycle                       |     |     |
| BDEJMOD     | Integer  | Year model                         |     |     |
| WARTKL      | C10      | Classification of maintenance      |     |     |
| LWART:DAT   | Datum    | Date of last maintenance           |     |     |
| LWART:ZEI   | Integer  | Time of last maintenance           |     |     |
| LWART:USR   | C10      | Person of last maintenance         |     |     |
| ANZ:N       | Integer  | Quantity till next maintenance     |     |     |
| BSTD:N      | Integer  | Operating hours, next maintenance  |     |     |
| TAKT:N      | Integer  | Cycles, next maintenance           |     |     |
| TG:N        | Datum    | Date of next maintenance           |     |     |
| RESVERWEIS  | Integer  | Reference to resource              |     |     |
| WARTG:1     | Integer  | Threshold value for level 1        |     |     |
| WARTG:2     | Integer  | Threshold value for level 2        |     |     |
| WARTG:3     | Integer  | Threshold value for level 3        |     |     |
| ANZ:S       | Integer  | Target number                      |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 334 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Type/max.  | field  | Description  |     |     |
| --- | --- | ---------- | ------ | ------------ | --- | --- |
length
| BSTD:S   |     | Integer  |     | Target operating hours                   |     |     |
| -------- | --- | -------- | --- | ---------------------------------------- | --- | --- |
| TAKT:S   |     | Integer  |     | Target cycles                            |     |     |
| TG:S     |     | Integer  |     | Target days                              |     |     |
| ART      |     | C2       |     | Maintenance type                         |     |     |
| VERWEIS  |     | Integer  |     | Consecutive no. of maintenance activity  |     |     |
| WARTSTA  |     | Integer  |     | Maintenance status                       |     |     |

| 12.7.7  | List of maintenance activities (DLG=LIST;91)  |     |     |     |     |     |
| ------- | --------------------------------------------- | --- | --- | --- | --- | --- |
List of all possible maintenance activities.
Structure of dialog data:
“DLG=LIST;91|DATEI={file name}|DAT=...|ZEI=...|USR=...|MNR=…|RES=…|RESTYP=...|MOD=…|“
Parameter:
|     | In the machine mode (MOD=M) :   |                                             |     |     |     |     |
| --- | ------------------------------- | ------------------------------------------- | --- | --- | --- | --- |
|     | MNR =...                        | Generate list for the transferred machine   |     |     |     |     |
|     | In the resource mode (MOD=R) :  |                                             |     |     |     |     |
RES =...  Generate list for the transferred resource + resource type
RESTYP =...  Generate list for the transferred resource + resource type
Example:
| hymw -u2020   |     |     |     |     |     |     |
| ------------- | --- | --- | --- | --- | --- | --- |
-c"DLG=LIST;91|DATEI=wtk.lst|DAT=today|ZEI=now|USR=2020|MOD=M| MNR=MASCH100|"
Result list:
| ID  |     | Type/max.  | field  | Description  |     |     |
| --- | --- | ---------- | ------ | ------------ | --- | --- |
length
| MNR          |     | C40      |     | Machine                         |     |     |
| ------------ | --- | -------- | --- | ------------------------------- | --- | --- |
| RESVERWEIS   |     | Integer  |     | Resource ID                     |     |     |
| VERWEIS      |     | Integer  |     | Maintenance number              |     |     |
| BEZ          |     | C20      |     | Designation of the maintenance  |     |     |
| ART          |     | C2       |     | Type of maintenance             |     |     |
| WARTSTA      |     | Integer  |     | Status                          |     |     |
| WARTKL       |     | C10      |     | Class                           |     |     |
| AKTWERT      |     | Integer  |     | Current value                   |     |     |
| NAEWERT      |     | Integer  |     | Next value                      |     |     |
| WARTG:1 … 3  |     | Integer  |     | Threshold value 1 – 3           |     |     |
| INFO:1 … 7   |     | C80      |     | Info text 1 – 7                 |     |     |
| LWART:DAT    |     | Datum    |     | Date of last maintenance        |     |     |
| LWART:ZEI    |     | Integer  |     | Time of last maintenance        |     |     |
| LWART:USR    |     |          |     | User of last maintenance        |     |     |
| RES          |     | C40      |     | Resource no.                    |     |     |
| RESTYP       |     | C4       |     | Resource type                   |     |     |

| SCS-PDM_81.docx  |     |     |     | Version: 1.0.23049  |     | Page 335 of 356  |
| ---------------- | --- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- |

| ID  |     | Type/max.  | field  | Description  |     |     |     |
| --- | --- | ---------- | ------ | ------------ | --- | --- | --- |
length
| KST       |                                          | 10  |     | Cost center                      |     |     |     |
| --------- | ---------------------------------------- | --- | --- | -------------------------------- | --- | --- | --- |
| OPT:ONCE  |                                          | C1  |     | Non-recurring maintenance (J/N)  |     |     |     |
| 12.7.8    | List of resource comments(DLG=LIST;133)  |     |     |                                  |     |     |     |
List of all comments for a resource.
Structure of dialog data:
“DLG=LIST;133|DATEI={FileName}|DAT=...|ZEI=...|USR=...|RESTYP
=...|RES=…|DATB=…|ANZ=…|“
Parameter:
| RES =...      |     | Generate list for resource.                         |     |     |     |     |     |
| ------------- | --- | --------------------------------------------------- | --- | --- | --- | --- | --- |
| RESTYP =...   |     | Restrict list by resource type.                     |     |     |     |     |     |
| DATB =...     |     | Restrict list by date range                         |     |     |     |     |     |
|               |     | (only show comments that are “younger” than DATB).  |     |     |     |     |     |
ANZ =...     Restrict the number of columns of the list (by default 100).

Example:
| hymw -u2020  |     |     |     |     |     |     |     |
| ------------ | --- | --- | --- | --- | --- | --- | --- |
 -c"DLG=LIST;133|DATEI=kommentare.lst|DAT=today|ZEI=now|USR=2020|  RES=0668257-
WKS|RESTYP=WNR|DATB=12/12/2007|ANZ=10"
Result list:
| ID  | Type/max.  |     | field  | Description  |     |     |     |
| --- | ---------- | --- | ------ | ------------ | --- | --- | --- |
length
| RES     | C40                                          |     |     | Resource number                |     |     |     |
| ------- | -------------------------------------------- | --- | --- | ------------------------------ | --- | --- | --- |
| RESTYP  | C4                                           |     |     | Resource type                  |     |     |     |
| BEZ     | C20                                          |     |     | Resource name                  |     |     |     |
| DAT     | Datum                                        |     |     | Date of the comment            |     |     |     |
| ZEI     | Integer                                      |     |     | Time of the comment            |     |     |     |
| PNR     | C10                                          |     |     | The editor’s personnel number  |     |     |     |
| PNAME   | C40                                          |     |     | The editor’s name              |     |     |     |
| BEM     | C500                                         |     |     | Comment                        |     |     |     |
| 12.7.9  | List of registered resources (DLG=LIST;129)  |     |     |                                |     |     |     |
The list can be used to determine the resources that are logged on.
Structure of dialog data:
“DLG=LIST;129|DATEI={FileName}|DAT=...|ZEI=...|USR=...|MOD=…|“

| SCS-PDM_81.docx  |     |     |     | Version: 1.0.23049  |     |     | Page 336 of 356  |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | Production Data Manager  |
| --- | --- | --- | --- | ------------------------ |

Parameter:
MOD=M : In the M mode only the topmost machine designations of resources are selected for the
machine.
Without MOD:   If the list is requested without Mod=M all resources are displayed that are logged
on to the machine. Duplicates are removed (e.g. if the resource refers to a machine and is logged
on to an order).
Example:
| hymw -u2020  |     |     |     |     |
| ------------ | --- | --- | --- | --- |
 -c"DLG=LIST;129|DATEI=l.lst|DAT=today|ZEI=now|USR=2020|MOD=M|MNR=100|"

Result list:
| ID  | Type/max.  | field  Description  |     |     |
| --- | ---------- | ------------------- | --- | --- |
length
| MNR        | C20      | Machine               |     |     |
| ---------- | -------- | --------------------- | --- | --- |
| ANR        | C40      | Order                 |     |     |
| RES        | C40      | Resource number       |     |     |
| RESBEZ     | C40      | Resource name         |     |     |
| RESTYP     | C4       | Resource type         |     |     |
| RESTYPBEZ  | C20      | Resource type name    |     |     |
| RESFAMBEZ  | C20      | Resource family name  |     |     |
| RESSTA     | Integer  | Current status        |     |     |
12.7.10 Combined list of production resources and tools:
batch and resources (DLG=LIST;132)
Materials/batches and resources can also be requested in a combined list:
  Resources from the resource list (DLG=LIST;115)
  Materials/batches from the list “material list/batch information“ (DLG=LIST;13)
For  further  details  on  these  two  lists,  please  refer  to  the  section  entitled  “resource  list”  in  this
documentation or the section “material list/batch information” in the documentation entitled MPL-PDM-
DC.
Structure of dialog data:
“DLG=LIST;132|DATEI={FileName}|MNR=…|ANR=…|FHM.ID=…|DAT=...|ZEI=...|USR=...|MOD=…|“
Parameter:
| MOD=     |     |     |     |     |
| -------- | --- | --- | --- | --- |
| K(OMBI)  |     |     |     |     |
List of all production resources and tools – material/batches and resources – planned for the OP and
| logged on to the OP/machine  |     |     |     |     |
| ---------------------------- | --- | --- | --- | --- |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  | Page 337 of 356  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| R(ES)   |     |     |     |
| ------- | --- | --- | --- |
The list only includes the production resources and tools resources planned for the OP and logged on
to the OP/machine

| M(AT)   |     |     |     |
| ------- | --- | --- | --- |
The list only includes the production resources and tools material/batches planned for the OP and
| logged on to the OP/machine  |     |     |     |
| ---------------------------- | --- | --- | --- |

| I(NFO)  |     |     |     |
| ------- | --- | --- | --- |
List including a single-row information (if the key is not unique, several rows, if necessary) for a
specific production resource and tool – batches and/or resources
| FHM.ID=   |     |     |     |
| --------- | --- | --- | --- |
With single-row information it is the key for the selection (resource or batch number)
| MNR=   |     |     |     |
| ------ | --- | --- | --- |
Requesting machine
| ANR=  |     |     |     |
| ----- | --- | --- | --- |
Requesting order/OP
Example:
| hymw -u2020   |     |     |     |
| ------------- | --- | --- | --- |
-c"DLG=LIST;132|DATEI=l.lst|DAT=today|ZEI=now|USR=2020|MOD=K|MNR=100|ANR=47110100"
Provides all materials/batches and resources logged on to machine 100 and OP 47110100 or that are
planned for OP 47110100.
The result list includes the fields of both lists:
| Prefix  | Description  |     |     |
| ------- | ------------ | --- | --- |
MAT.*  The prefix MAT provides all data fields of the batch list DLG=LIST;13.
For further information on the individual fields refer to the section “material
list/batch information” in the documentation entitled MPL-PDM-DC.
These fields are initially assigned (0 or empty) for resource entries.
RES.*  The prefix RES provides all data fields of the resource list
DLG=LIST;115
For further information on the individual fields refer to the section entitled
“resource list “ in this documentation.
These fields are initially assigned (0 or empty) for material/batch entries.
| FHM.IDTYP  | Key field resource type  |     |     |
| ---------- | ------------------------ | --- | --- |
MAT for materials/batches
!= MAT for resource (can be WNR, DOC, etc.)
| FHM.ID  | Key field ID  |     |     |
| ------- | ------------- | --- | --- |
For batches  batch number CNR from list 12
For resources  resource number RES from list 115
| FHM.SLP  | Key field BOM item  |     |     |
| -------- | ------------------- | --- | --- |
BOM item from list 13 or 115
| FHM.ATK  | Key field  |     |     |
| -------- | ---------- | --- | --- |
For batches  Material ATK from 13
For resources  reference resource BZG:RES from list 115
| FHM.BEZ  | Key field designation  |     |     |
| -------- | ---------------------- | --- | --- |
For batches  ATKBEZ from list 13
For resources  BEZ from list 115
| RES.AKTIV  | J  Resource has already be logged on  |     |     |
| ---------- | -------------------------------------- | --- | --- |
N  Resource not yet logged on
| FHM.VIS  | Processing flag for the HYDRA terminal  |     |     |
| -------- | --------------------------------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 338 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| Prefix  | Description  |     |     |
| ------- | ------------ | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 339 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

13 HYDRA Production Data Manager WRM - Master Data
| 13.1  | Note on the descriptions of the input dialogs  |     |     |
| ----- | ---------------------------------------------- | --- | --- |
All fields that are mandatory and must be specified are highlighted using a gray background color or
marked using (PK). All other fields are optional and are processed when passed.
| 13.2    | Resources                                        |     |     |
| ------- | ------------------------------------------------ | --- | --- |
| 13.2.1  | Edit resources (DLG=RES.INSERT, UPDATE, DELETE,  |     |     |
COPY, LOCK, UNLOCK, NEW, SELECT)
You use these dialogs to edit the master data of resources and free resource attributes. You can create
and change resources.
Tables
| Table        | Key field  | Description                           |     |
| ------------ | ---------- | ------------------------------------- | --- |
| res_bestand  | res_typ    | Resource type (PK) in resource stock  |     |
RES.RESTYP
| res_bestand  | res_nr  | Resource number (PK) in resource stock  |     |
| ------------ | ------- | --------------------------------------- | --- |
RES.RES
| res_bestand  | verweis  | Internal serial number  |     |
| ------------ | -------- | ----------------------- | --- |
RES.VERWEIS
| res_status  | res_typ  | Resource type (PK) in resource status  |     |
| ----------- | -------- | -------------------------------------- | --- |
RES.RESTYP
| res_status  | res_nr  | Resource number (PK) in resource status  |     |
| ----------- | ------- | ---------------------------------------- | --- |
RES.RES
res_status  verweis  Internal serial number, reference to res_bestand.verweis
RES.VERWEIS
BAPI call
| Identification  | Content / {type}  | Description      |     |
| --------------- | ----------------- | ---------------- | --- |
| DLG             | RES.INSERT        | Create resource  |     |
|                 | RES.UPDATE        | Change resource  |     |
|                 | RES.DELETE        | Delete resource  |     |
|                 | RES.COPY          | Copy resource    |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 340 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|             | RES.LOCK    | Lock resource for editing            |     |     |     |     |
| ----------- | ----------- | ------------------------------------ | --- | --- | --- | --- |
|             | RES.UNLOCK  | Unlock resource after editing        |     |     |     |     |
|             | RES.NEW     | Read specification for new resource  |     |     |     |     |
|             | RES.SELECT  | Select resource                      |     |     |     |     |
| RES.RESTYP  | {C4}        | PK resource type                     |     |     |     |     |
| RES.RES     | {C40}       | PK resource number                   |     |     |     |     |
RES.VERWEIS  {N10}  Instead of using RES.RESTYP and RES.RES, you can also call
the resource using the serial key RES.VERWEIS.
| RES.RESTYP:Z  | {C4}   | PK new (target) resource type for COPY    |     |     |     |     |
| ------------- | ------ | ----------------------------------------- | --- | --- | --- | --- |
| RES.RES:Z     | {C40}  | PK new (target) resource number for COPY  |     |     |     |     |
| RES.BEZ:Z     | {C40}  | New (target) resource name for COPY       |     |     |     |     |
…  …  For information on further fields, refer to the documentation of
|     |     | the  database  | schema  | of  the  above-listed  | tables.  For  | further  |
| --- | --- | -------------- | ------- | ---------------------- | ------------- | -------- |
information, see the section above.
Validation checks
| Error codes  | Description  |     |     |     |     |     |
| ------------ | ------------ | --- | --- | --- | --- | --- |
3204  The resource specified in the dialog is already stored in the resource stock.
| 3220  | Resource is logged on or locked  |     |     |     |     |     |
| ----- | -------------------------------- | --- | --- | --- | --- | --- |
3253  The resource cannot be deleted because it is still used in a resource list relation.
| 4110  | For this resource, a requirement is still available.  |     |     |     |     |     |
| ----- | ----------------------------------------------------- | --- | --- | --- | --- | --- |
3254  The resource cannot be deleted because it is still used as production resource/tool.
7000  Resource records of type "resource logon" or "resource logoff" are available for the
resource. For this reason, the resource cannot be deleted.
3261  The resource cannot be deleted because a maintenance calendar is stored for the
resource.
3214  The resource type specified is not available in the system.
3200  No resource or resource ID has been transferred to the dialog.
| 1661  | A value relevant for processing is missing.  |     |     |     |     |     |
| ----- | -------------------------------------------- | --- | --- | --- | --- | --- |
101  General error message that is displayed when the selected data (tables or files) is
not available.
1669  Data with the same key fields already exist. It is possible that you cannot see the

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 341 of 356  |     |
| ---------------- | --- | ------------------- | --- | --- | ---------------- | --- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
data because you are not authorized.
3231  The check confirming that the resource is not active fails; i.e. the resource is
currently used.
| 1803  | You are not authorized for this responsibility area.  |     |     |
| ----- | ----------------------------------------------------- | --- | --- |
3263  The resource family status is now invalid because the resource family has been
changed.
| 4101  | The specified resource is included in a resource list.  |     |     |
| ----- | ------------------------------------------------------- | --- | --- |
3228  The check confirming that the resource is logged on fails; i.e. the resource is
currently logged off.
3260  You cannot create or change the resource because the DNC file name is already
assigned.
| 13.2.2  | Resource list (DLG=RES.LIST)  |     |     |
| ------- | ----------------------------- | --- | --- |
This BAPI call creates a resource list. You can narrow down the selection and call the list for one
resource, a family, a resource type or combinations of these fields. The free attributes must be read
afterwards.
Tables
| Table        | Key field  | Description                           |     |
| ------------ | ---------- | ------------------------------------- | --- |
| res_bestand  | res_typ    | Resource type (PK) in resource stock  |     |
RES.RESTYP
| res_bestand  | res_nr  | Resource number (PK) in resource stock  |     |
| ------------ | ------- | --------------------------------------- | --- |
RES.RES
| res_bestand  | verweis  | Internal serial number  |     |
| ------------ | -------- | ----------------------- | --- |
RES.VERWEIS
| res_status  | res_typ  | Resource type (PK) in resource status  |     |
| ----------- | -------- | -------------------------------------- | --- |
RES.RESTYP
| res_status  | res_nr  | Resource number (PK) in resource status  |     |
| ----------- | ------- | ---------------------------------------- | --- |
RES.RES
res_status  verweis  Internal serial number, reference to res_bestand.verweis
RES.VERWEIS
BAPI call
| Identification  | Contents  | Description    |     |
| --------------- | --------- | -------------- | --- |
| DLG             | RES.LIST  | Resource list  |     |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 342 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| RES.RESTYP  | {C4}   | Search criterion resource type    |     |
| ----------- | ------ | --------------------------------- | --- |
| RES.RES     | {C40}  | Search criterion resource number  |     |
| RES.RESFAMI | {N10}  | Search criterion resource family  |     |
D
| RES.VERWEIS  | {N10}                                              | Search criterion serial key                  |     |
| ------------ | -------------------------------------------------- | -------------------------------------------- | --- |
| …            | …                                                  | …                                            |     |
| DATEI        | {C256}                                             | Specification of the file name for the list  |     |
| 13.3         | Free attributes                                    |                                              |     |
| 13.3.1       | Edit free attributes (DLG=RESATTR.INSERT, UPDATE,  |                                              |     |
DELETE, COPY, LOCK, UNLOCK, NEW, SELECT)
Use the resource type or the resource family to define the resource attributes that you want to edit. The
field contents of these fields are entered and managed separately.
When a resource is created (RES.INSERT), a field definition is assigned to this resource, which depends
of the relevant resource family or resource type. The key to this field definition is stored in the data field
RES.USRFLD,
The field definition of the resource attributes are read via list USRFLDELEM.LIST.
The values entered for the resource are listed in RESATTR.LIST. Both lists have USRFLD and IDX as
key. The field definition and the entered attributes are parallel entries; i.e. in one list the column names
are listed, in the other the entered values.
Use  the  dialogs  RESATTR.INSERT  and  RESATTR.UPDATE  to  enter  attribute  values,  or
RESATTR.DELETE to delete values.
If free attributes are used, these attributes must be created after the resource or deleted before the
resource.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
res_attribute  res_id  Serial ID (PK) of resource in the resource attributes
RESATTR.RESV
FK (foreign key) of resource stock (res_bestand.verweis)
ERWEIS
res_attribute  feld_id    Field ID (PK) in the resource attributes

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 343 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     |     |     |     | Production Data Manager  |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- | --- |

| Table  | Key field  | Description  |     |     |     |     |     |     |     |
| ------ | ---------- | ------------ | --- | --- | --- | --- | --- | --- | --- |
RESATTR.IDX  Foreign key (FK) of user fields (hyd_userfieldelem.feldid)
BAPI call
| Identification  | Content / {type}  | Description                |     |     |     |     |     |     |     |
| --------------- | ----------------- | -------------------------- | --- | --- | --- | --- | --- | --- | --- |
| DLG             | RESATTR.INSE      | Create resource attribute  |     |     |     |     |     |     |     |
RT
|     | RESATTR.UPDA | Change resource attribute  |     |     |     |     |     |     |     |
| --- | ------------ | -------------------------- | --- | --- | --- | --- | --- | --- | --- |
TE
|     | RESATTR.DELE | Delete resource attribute  |     |     |     |     |     |     |     |
| --- | ------------ | -------------------------- | --- | --- | --- | --- | --- | --- | --- |
TE
|     | RESATTR.COPY  | Copy resource attribute                  |     |     |     |     |     |     |     |
| --- | ------------- | ---------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
|     | RESATTR.LOCK  | Lock resource attribute for editing      |     |     |     |     |     |     |     |
|     | RESATTR.UNLO  | Unlock resource attribute after editing  |     |     |     |     |     |     |     |
CK
|     | RESATTR.NEW  | Read specification for new resource attribute  |     |     |     |     |     |     |     |
| --- | ------------ | ---------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
|     | RESATTR.SELE | Select resource attribute                      |     |     |     |     |     |     |     |
CT
RESATTR.RES {N10}  Serial ID (PK) of the resource of the resource attribute
VERWEIS
| RESATTR.IDX  | {N2}  | Field ID (PK) in the resource attributes  |     |     |     |     |     |     |     |
| ------------ | ----- | ----------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
RESATTR.RES {C4}  Instead of using RESATTR.RESVERWEIS (serial key), you can
| TYP  |     | also            | call  | the  resource  |      | using  | the       | resource  | type    |
| ---- | --- | --------------- | ----- | -------------- | ---- | ------ | --------- | --------- | ------- |
|      |     | RESATTR.RESTYP  |       |                | and  | the    | resource  |           | number  |
RESATTR.RESNR.
| RESATTR.RES | {C40}  | See above  |     |     |     |     |     |     |     |
| ----------- | ------ | ---------- | --- | --- | --- | --- | --- | --- | --- |
NR
RESATTR.RES {N10}  New serial ID (PK) of the resource of the resource attribute for
| VERWEIS:Z  |     | COPY  |     |     |     |     |     |     |     |
| ---------- | --- | ----- | --- | --- | --- | --- | --- | --- | --- |
RESATTR.IDX: {N2}  New field ID (PK) of the resource attribute
Z
| RESATTR.ATT | {C80}  | Attribute value  |     |     |     |     |     |     |     |
| ----------- | ------ | ---------------- | --- | --- | --- | --- | --- | --- | --- |
R
…  …  For information on further fields, refer to the documentation of
|     |     | the  | database  | schema  | of  the  | above-listed  | tables.  | For  | further  |
| --- | --- | ---- | --------- | ------- | -------- | ------------- | -------- | ---- | -------- |
information, see the section above.

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 344 of 356  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --- | ---------------- | --- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
3201  You  must  transfer  an  existing  resource  number  with  resource  type  or  a  valid
resource ID to the dialog.
| 1661  | A value relevant for processing is missing:  |     |     |
| ----- | -------------------------------------------- | --- | --- |
  You must either specify the serial ID (RESATTR.RESVERWEIS) or the
resource type (RES.RESTYP) and the resource number (RES.RES).
  You must specify the field ID (RESATTR.IDX)
  You must specify the serial ID (RESATTR.RESVERWEIS:Z) with COPY
| 101   | An attribute for the specified key does not exist.      |     |     |
| ----- | ------------------------------------------------------- | --- | --- |
| 1669  | An attribute for the specified key does already exist.  |     |     |
| 1666  | The data record is currently locked by another user.    |     |     |

Note
Make sure that the below configurations are made before you create attributes (RESATTR.INSERT):
1.  Create a user field key for the resource type (e.g. DNC) of the resource.
2.  To this user field key, assign the user fields for which you want to create attributes. Make sure that
the field ID of the user field matches the field ID of the attribute (RESATTR.IDX).
3.  You can assign the user field key via the resource type (e.g. DNC) or the resource family(ies).

| 13.3.2  | List of resource attributes (DLG=RESATTR.LIST)  |     |     |
| ------- | ----------------------------------------------- | --- | --- |
This BAPI call generates a list with the user-defined attributes of the resource. The defined attributes are
numbered. The description of the attributes can be read using the field definitions.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
res_attribute  res_id  Serial ID (PK) of resource in the resource attributes
RESATTR.RESV
Foreign key (FK) of resource stock (res_bestand.verweis)
ERWEIS
res_attribute  feld_id    Field ID (PK) in the resource attributes
RESATTR.IDX
Foreign key (FK) of user fields (hyd_userfieldelem.feldid)
BAPI call
| Identification  | Contents  | Description  |     |
| --------------- | --------- | ------------ | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 345 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     | Production Data Manager  |     |     |
| --- | --- | --- | --- | ------------------------ | --- | --- |

| Identification  | Contents      | Description                  |     |     |     |     |
| --------------- | ------------- | ---------------------------- | --- | --- | --- | --- |
| DLG             | RESATTR.LIST  | List of resource attributes  |     |     |     |     |
RESATTR.RES {N10}  Serial ID (PK) of the resource of the resource attribute
VERWEIS
RES.RESTYP  {C4}  Instead of using RESATTR.RESVERWEIS (serial key), you can
|     |     | also  | call  the  resource  | using  the  | resource  | type  |
| --- | --- | ----- | -------------------- | ----------- | --------- | ----- |
RESATTR.RESTYP and the resource number RESATTR.RES.
| RES.RES  | {C40}                                             | See above                                    |     |     |     |     |
| -------- | ------------------------------------------------- | -------------------------------------------- | --- | --- | --- | --- |
| DATEI    | {C256}                                            | Specification of the file name for the list  |     |     |     |     |
| 13.3.3   | List of field definitions (DLG= USRFLDELEM.LIST)  |                                              |     |     |     |     |
This BAPI call creates a list of field definitions. You can optionally narrow down the list to USRFLD.
Tables
| Table  | Key field  | Description  |     |     |     |     |
| ------ | ---------- | ------------ | --- | --- | --- | --- |
hyd_userfieldele objekt_typ  WRM: resource type of the resource
| m   | USRFLDELEM.O |     |     |     |     |     |
| --- | ------------ | --- | --- | --- | --- | --- |
BJTYP
| hyd_userfieldele | usrfld_key   |   WRM: user field key  |     |     |     |     |
| ---------------- | ------------ | ---------------------- | --- | --- | --- | --- |
| m                | USRFLDELEM.U |                        |     |     |     |     |
SRFLD
BAPI call
| Identification  | Contents     | Description      |     |     |     |     |
| --------------- | ------------ | ---------------- | --- | --- | --- | --- |
| DLG             | USRFELDELEM. | User field list  |     |     |     |     |
LIST
OBJTYP  {C20}  WRM: The object type is identical to the resource type.
| USRFLD  | {C6}    | WRM: user field key (optional)               |     |     |     |     |
| ------- | ------- | -------------------------------------------- | --- | --- | --- | --- |
| DATEI   | {C256}  | Specification of the file name for the list  |     |     |     |     |

| SCS-PDM_81.docx  |     |     | Version: 1.0.23049  |     | Page 346 of 356  |     |
| ---------------- | --- | --- | ------------------- | --- | ---------------- | --- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 13.4    | Resource list                                    |     |     |
| ------- | ------------------------------------------------ | --- | --- |
| 13.4.1  | Edit resource list (DLG=RESLIST.INSERT, DELETE)  |     |     |
You can create a multi-level structure for the resources in HYDRA. To this end, you can specify a
resource list for a resource. This list, also called "package", specifies the components included in the
resource. The resource list also integrates the existing relations between the components. A complete
tree structure with all components is integrated. A faulty use of this function can cause structural errors in
the resource function, which can lead to a hang in HYDRA. We highly recommend to consult MPDV.
To read the resource list entries, a list command is available. This list command can be used at one level
of the list or recursively for the complete structure of the resource list.
Note: The above is only true for the master data of the resource list. Once you have created an
order and you are interested in the bill of materials, you must call the relevant lists of the BDE.
BAPI call
| Identification  | Content / {type}  | Description                 |     |
| --------------- | ----------------- | --------------------------- | --- |
| DLG             | RESLIST.INSER     | Create resource list entry  |     |
T
|     |               |                             |     |
| --- | ------------- | --------------------------- | --- |
|     | RESLIST.DELET | Delete resource list entry  |     |
E
|     |     |     |     |
| --- | --- | --- | --- |
|     |     |     |     |
|     |     |     |     |
|     |     |     |     |
|     |     |     |     |
RESLIST.REST {C4}  PK: resource type of higher-level resource (M is for "mother")
YP:M
RESLIST.RESN {C40}  PK: resource number of higher-level resource (M is for "mother")
| R:M  |     | - alternative entry instead of RESVERWEIS:M  |     |
| ---- | --- | -------------------------------------------- | --- |
RESLIST.RESV {N10}  PK: ID of higher-level resource - alternative entry instead of
| ERWEIS:M  |     | RESNR:M  |     |
| --------- | --- | -------- | --- |
RESLIST.REST {C4}  PK: resource type of lower-level resource
YP:T

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 347 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     |     |     |     | Production Data Manager  |     |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- | --- |

| Identification  |     | Content / {type}  | Description  |     |     |     |     |     |
| --------------- | --- | ----------------- | ------------ | --- | --- | --- | --- | --- |
RESLIST.RESN {C40}  PK: resource number of lower-level resource (T is for "Tochter =
| R:T  |     |     | daughter") - alternative entry instead of RESVERWEIS:T  |     |     |     |     |     |
| ---- | --- | --- | ------------------------------------------------------- | --- | --- | --- | --- | --- |
RESLIST.RESV {N10}  PK:  ID  of  lower-level  resource  -  alternative  entry  instead  of
| ERWEIS:T  |     |     | RESNR:T  |     |     |     |     |     |
| --------- | --- | --- | -------- | --- | --- | --- | --- | --- |
RESLIST.POS  {N10}  Display position / sequence (with RESLIST.INSERT)
RESLIST.MENG {N18.6}  Quantity ratio to mother (with RESLIST.INSERT)
E
May only be set with anonymous resources to a value > 1.
Otherwise the value must be 1.
| MOD  |     | {C1}  | Delete mode (with RESLIST.DELETE)  |     |     |     |     |     |
| ---- | --- | ----- | ---------------------------------- | --- | --- | --- | --- | --- |
E: Single resource list relation is deleted.
G: The complete resource list below a specified mother resource
is deleted.
| DELFIRSTLEVE |     | {C1}  | Can only be used with MOD=G.  |     |     |     |     |     |
| ------------ | --- | ----- | ----------------------------- | --- | --- | --- | --- | --- |
L
The lower-level resource lists are not deleted.
J: Only the first level of the resource list is deleted.
Validation checks
| Error codes  |     | Description  |     |     |     |     |     |     |
| ------------ | --- | ------------ | --- | --- | --- | --- | --- | --- |
3202  The resource specified in the dialog (entry  without resource type) is  available
multiple times in the resource stock with different resource types each.
| 1666  |     | The data record is currently locked by another user.  |     |     |     |     |     |     |
| ----- | --- | ----------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| 1661  |     | A value relevant for processing is missing.           |     |     |     |     |     |     |
  Invalid mode (MOD) is specified.
|     |     |   The                 | lower-level  | resource  | has  not              | been  | specified  |      |
| --- | --- | ---------------------- | ------------ | --------- | --------------------- | ----- | ---------- | ---- |
|     |     | (RESLIST.RESVERWEIS:T  |              |           | or  RESLIST.RESTYP:T  |       |            | and  |
RESLIST.RESNR:T)
|     |     |   The                 | higher-level  | resource  | has  not              | been  | specified  |      |
| --- | --- | ---------------------- | ------------- | --------- | --------------------- | ----- | ---------- | ---- |
|     |     | (RESLIST.RESVERWEIS:M  |               |           | or  RESLIST.RESTYP:M  |       |            | and  |
RESLIST.RESNR:M)
  The  resource  type  has  not  been  specified  (RESLIST.RESTYP:T  or
RESLIST.RESTYP:M)
|       |     | RESSOURCE_NICHT_VORHANDEN                               |     |     |     |     |     |     |
| ----- | --- | ------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| 4101  |     | The specified resource is included in a resource list.  |     |     |     |     |     |     |
101  General error message that is displayed when the selected data (tables or files) is
not available.
1669  Data with the same key fields already exist. It is possible that you cannot see the

| SCS-PDM_81.docx  |     |     |     | Version: 1.0.23049  |     |     | Page 348 of 356  |     |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | ---------------- | --- |

|     |     |     |     |     | Production Data Manager  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| Error codes  | Description  |     |     |     |     |     |
| ------------ | ------------ | --- | --- | --- | --- | --- |
data because you are not authorized.
| 13.4.2  | Resource list (DLG=RESLIST.LIST)  |     |     |     |     |     |
| ------- | --------------------------------- | --- | --- | --- | --- | --- |
This BAPI call creates a resource list.
BAPI call
| Identification  | Contents      | Description    |     |     |     |     |
| --------------- | ------------- | -------------- | --- | --- | --- | --- |
| DLG             | RESLIST.LIST  | Resource list  |     |     |     |     |
RESLIST.REST {C4}  PK: resource type of higher-level resource (M is for "mother")
YP:M
RESLIST.RESN {C40}  PK: resource number of higher-level resource (M is for "mother")
| R:M  |     | - alternative entry instead of RESVERWEIS:M  |     |     |     |     |
| ---- | --- | -------------------------------------------- | --- | --- | --- | --- |
RESLIST.RESV {N10}  PK: ID of higher-level resource - alternative entry instead of
| ERWEIS:M  |     | RESNR:M  |     |     |     |     |
| --------- | --- | -------- | --- | --- | --- | --- |
MOD  {C1}  MOD=E: Resource list with one level only from the mother on.
Here you can find the resources of the direct level below.
MOD=B: Complete structure of the resource list starting from
|     |     | mother.  | All  relations  below  | the  mother  | are  recursively  | read.  |
| --- | --- | -------- | ---------------------- | ------------ | ----------------- | ------ |
Here, you can find all related resources in the resource list.
| …      | …       | …                                            |     |     |     |     |
| ------ | ------- | -------------------------------------------- | --- | --- | --- | --- |
| DATEI  | {C256}  | Specification of the file name for the list  |     |     |     |     |
Result list
The result list provides the data fields listed in section 13.4.1 Edit resource list (DLG=RESLIST UPDATE,
).
| 13.5    | Assignment to required resources        |     |     |     |     |     |
| ------- | --------------------------------------- | --- | --- | --- | --- | --- |
| 13.5.1  | Edit assignments to required resources  |     |     |     |     |     |
(DLG=RESBEDRES.INSERT,  DELETE, COPY, )
You can manage required resources in HYDRA that are used as replacements. When the resources are
logged on, concrete resources are logged on for these required resources, which are assigned to the
required resource. You can assign one or several (replacement) resources to one required resource.

| SCS-PDM_81.docx  |     | Version: 1.0.23049  |     |     | Page 349 of 356  |     |
| ---------------- | --- | ------------------- | --- | --- | ---------------- | --- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| Identification  | Content / {type}  | Description  |     |
| --------------- | ----------------- | ------------ | --- |
DLG  RESBEDRES.IN Create an assignment to a required resource
SERT
|     |             |                                              |     |
| --- | ----------- | -------------------------------------------- | --- |
|     | RESBEDRES.D | Delete an assignment to a required resource  |     |
ELETE
|     | RESBEDRES  | Copy an assignment to a required resource  |     |
| --- | ---------- | ------------------------------------------ | --- |
T.COPY
|     |     |     |     |
| --- | --- | --- | --- |
|     |     |     |     |
|     |     |     |     |
|     |     |     |     |
RESBEDRES.R {C4}  PK: resource type of the required resource
ESTYP:M
| RESBEDRES.R | {C40}  | PK: resource number of required resource  |     |
| ----------- | ------ | ----------------------------------------- | --- |
ES:M
RESBEDRES.R {C4}  PK: resource type of the assigned resource
ESTYP:T
RESBEDRES.R {C40}  PK: resource number of the assigned resource
ES:T
| RESBEDRES.  | {C100}  | Comment  |     |
| ----------- | ------- | -------- | --- |
BEM
RESBEDRES.R {C4}  With COPY: resource type of the target required resource
ESTYP:MZ
RESBEDRES.R {C40}  With COPY: resource number of the target required resource
ES:MZ
RESBEDRES.R {C4}  With COPY: resource type of the assigned target resource
ESTYP:TZ
RESBEDRES.R {C40}  With COPY: resource number of the assigned target resource
ES:TZ
| MOD  | {C1}  | Delete mode (with RESBEDRES.DELETE)  |     |
| ---- | ----- | ------------------------------------ | --- |
E: Single assignment to a required resource is deleted.
G: For a specified required resource, all assigned (replacement)
resources are deleted

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 350 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

Production Data Manager
Copy mode (with RESBEDRES.COPY)
E: Single assignment to a required resource is copied.
F: All missing assignments of a specified required resource are
copied to the target required resource.
A: All assignments of a specified required resource are copied to
the target required resource.
Validation checks
Error codes Description
4103 The required resource specified in the dialog is not configured as required resource
in the resource stock.
3201 The required resource specified in the dialog or the assigned resource is not
available in the resource stock.
4101 The required resource specified in the dialog is already included in a resource list.
4102 The assigned resource specified in the dialog has the type anonymous resource or
required resource.
1666 The data record is currently locked by another user.
1661 A value relevant for processing is missing.
 Invalid mode (MOD) is specified.
 The lower-level resource has not been specified (RESBEDRES.RESTYP:T
and RESBEDRES.RESNR:T)
 The higher-level resource has not been specified
(RESBEDRES.RESTYP:M and RESBEDRES.RESNR:M).
 The resource type has not been specified (RESBEDRES.RESTYP:T or
RESBEDRES.RESTYP:M)
101 General error message that is displayed when the selected data (tables or files) is
not available.
1669 Data with the same key fields already exist. It is possible that you cannot see the
data because you are not authorized.
SCS-PDM_81.docx Version: 1.0.23049 Page 351 of 356

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| 13.6    | Resource families                                   |     |     |
| ------- | --------------------------------------------------- | --- | --- |
| 13.6.1  | Edit resource families (DLG=RESFAM.INSERT, UPDATE,  |     |     |
DELETE, LOCK, UNLOCK, NEW, SELECT)
You use these dialogs to edit the master data of resource families. You can create and change resource
families. You can only delete a resource family, if no resource is assigned to this family.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
res_familien  bezeichnung    Resource family (PK). The ID must be unique in all resource
|     | RESFAM.RESFAM  | types.  |     |
| --- | -------------- | ------- | --- |
res_familien  res_typ   If you create a resource family, you must define the resource
|     | RESFAM.RESTYP  | type.  |     |
| --- | -------------- | ------ | --- |
BAPI call
| Identification  | Content / {type}  | Description                                   |     |
| --------------- | ----------------- | --------------------------------------------- | --- |
| DLG             | RESFAM.INSERT     | Create resource family                        |     |
|                 | RESFAM.UPDATE     | Change resource family                        |     |
|                 | RESFAM.DELETE     | Delete resource family                        |     |
|                 | RESFAM.LOCK       | Lock resource family and prevent editing      |     |
|                 | RESFAM.UNLOCK     | Remove lock of resource family after editing  |     |
|                 | RESFAM.NEW        | Read specification for new resource family    |     |
|                 | RESFAM.SELECT     | Select resource family                        |     |
| RESFAM.RESF     | {C8}              | PK "resource family"                          |     |
AM
| RESFAM.RESF | {N8}  | Internal ID of resource family.  |     |
| ----------- | ----- | -------------------------------- | --- |
AMID
RESFAM.REST {C4}  Resource type of the resource family. If you create a new
| YP           |        | resource family, you must define the resource type.  |     |
| ------------ | ------ | ---------------------------------------------------- | --- |
| RESFAM.BEZL  | {C30}  | Name of the resource family                          |     |
| RESFAM.VAB   | {C15}  | Responsibility area                                  |     |
| RESFAMB.USR  | {C8}   | Reference to a user field key                        |     |
FLD

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 352 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
1661  A value is missing that is required for processing. Missing parameter if no short
description has been transferred (RESFAM.BEZK).
1661  A value is missing that is required for processing. Missing parameter if no resource
type  (RESFAM.RESTYP)  has  been  passed  on  creating  a  resource  family
(RESFAM.INSERT).
101  General error message that is displayed when the selected data (tables or files) is
not available.
1669  Another  resource  family  with  the  same  short  description  already  exists
(RESFAM.BEZK). Data with the same key fields already exist. It is possible that you
cannot see the data because you are not authorized.
3243  The resource family is assigned to at least one resource. To delete a resource
family, you must first remove all assignments in the resource configuration.
3241  The user field key transferred (RESFAM.USRFLD) does not exist.
1803  You are not authorized for this responsibility area (RESFAM.VAB).

| 13.7    | Resource maintenances                            |     |     |
| ------- | ------------------------------------------------ | --- | --- |
| 13.7.1  | Edit resource maintenances (DLG=RESWART.INSERT,  |     |     |
UPDATE, DELETE, COPY, LOCK, UNLOCK)
You use these dialogs to edit the master data of activities in the Activity calendar. You can create,
change, copy and delete activities.
Note
To reset a maintenance, use the dialog RES_WART.
Tables
| Table  | Key field  | Description  |     |
| ------ | ---------- | ------------ | --- |
res_wartungen    The table contains the master data of the activities.
|     |     |     |     |
| --- | --- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 353 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

BAPI call
| Identification  | Content / {type}  | Description      |     |
| --------------- | ----------------- | ---------------- | --- |
| DLG             | RESWART.INSER     | Create activity  |     |
T
|     | RESWART.UPDA | Change activity  |     |
| --- | ------------ | ---------------- | --- |
TE
|     | RESWART.DELET | Delete activity  |     |
| --- | ------------- | ---------------- | --- |
E
|     | RESWART.COPY  | Copy activity                  |     |
| --- | ------------- | ------------------------------ | --- |
|     | RESWART.LOCK  | Lock activity for editing      |     |
|     | RESWART.UNLO  | Unlock activity after editing  |     |
CK
| RESWART.AKT | {C1}  | Activity type  |     |
| ----------- | ----- | -------------- | --- |
TYP
Possible values: empty = maintenance, K = calibration
| RESWART.WA | {C10}  | Maintenance category  |     |
| ---------- | ------ | --------------------- | --- |
RTKL
| RESWART.KTR  | {C40}  | Specification of the cost object  |     |
| ------------ | ------ | --------------------------------- | --- |
RESWART.TAK {N18.6}  Cycles recorded so far (for the specified resource). Must be set
| T:I  |     | if RESWART-ART = T  |     |
| ---- | --- | ------------------- | --- |
RESWART.TAK {N18.6}  Interval target cycles. Must be set if RESWART-ART = T
T:S
RESWART.TAK {N18.6}  Target cycles (absolute); the next maintenance activity is due
T:N  after the specified number of target cycles.  Must be set if
RESWART-ART = T
RESWART.BST {N10}  Hours of operation recorded so far (for the specified resource).
| D:S  |     | Must be set if RESWART-ART = B  |     |
| ---- | --- | ------------------------------- | --- |
RESWART.BST {N10}  Interval hours of operation. Must be set if RESWART-ART = B
D:N
RESWART.BST {N10}  Hours of operation (absolute); the next maintenance activity is
D:I  due after the specified number of operating hours. Must be set
if RESWART-ART = B
RESWART.TG:   Date of next activity. Must be set if RESWART-ART = Z
S
RESWART.TG: {N4}  Interval days. Must be set if RESWART-ART = Z
N
| RESWART.BEZ  | {C60}  | Name of activity  |     |
| ------------ | ------ | ----------------- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 354 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

RESWART.PLA {C40}  Specification of planned order to which the activity is assigned
NAUNR
RESWART.PRJ {C25}  Specification  of  project  number  to  which  the  activity  is
| NR          |       | assigned.                         |     |
| ----------- | ----- | --------------------------------- | --- |
| RESWART.OPT | {C1}  | Specification of the reference.   |     |
:BZG
Possible values: G = total or A = refers to order
RESWART.RES {N10}  Internal resource identification number the activity refers to
VERWEIS
Threshold value for level 1
| RESWART.WA | {N10}  |     |     |
| ---------- | ------ | --- | --- |
RTG:1
| RESWART.WA | {N10}  | Threshold value for level 2  |     |
| ---------- | ------ | ---------------------------- | --- |
RTG:2
| RESWART.WA | {N10}  | Threshold value for level 3  |     |
| ---------- | ------ | ---------------------------- | --- |
RTG:3
| RESWART.ART  | {C2}  | Maintenance type    |     |
| ------------ | ----- | ------------------- | --- |
T = based on cycles
B = based on hours of operation
Z = based on time (days)

RESWART.DAT mm/dd/yyyy  Specification of date for "Valid from"
B
| RESWART.DAT | mm/dd/yyyy  | Specification of date for "Valid to"  |     |
| ----------- | ----------- | ------------------------------------- | --- |
E
| RESWART.INF | {C80}  | Information fields 1 to 5  |     |
| ----------- | ------ | -------------------------- | --- |
O:1 bis 5
…  …  For information on further fields, refer to the documentation of
the database schema of the above-listed tables. For further
information, see the section above.
Validation checks
| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
3200  No resource or resource ID has been transferred to the dialog.
| 1661  | A value relevant for processing is missing.  |     |     |
| ----- | -------------------------------------------- | --- | --- |
101  General error message that is displayed when the selected data (tables or files) is
not available.
1669  Data with the same key fields already exist. It is possible that you cannot see the

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 355 of 356  |
| ---------------- | --- | ------------------- | ---------------- |

|     |     |     | Production Data Manager  |
| --- | --- | --- | ------------------------ |

| Error codes  | Description  |     |     |
| ------------ | ------------ | --- | --- |
data because you are not authorized.
3231  The check confirming that the resource is not active fails; i.e. the resource is
currently used.
| 1803  | You are not authorized for this responsibility area.  |     |     |
| ----- | ----------------------------------------------------- | --- | --- |
3263  The resource family status is now invalid because the resource family has been
changed.
| 4101  | The specified resource is included in a resource list.  |     |     |
| ----- | ------------------------------------------------------- | --- | --- |

| SCS-PDM_81.docx  |     | Version: 1.0.23049  | Page 356 of 356  |
| ---------------- | --- | ------------------- | ---------------- |
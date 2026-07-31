Project Specification

Project Specification

Implementation of

HYDRA

at

- Interface Concept -

Version 1

Date: 21.05.2019

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 1/20

Project Specification

Copyright

©Copyright 2019 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG

WINDOWS® is a registered trademark of Microsoft Corporation..

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is

prohibited without prior written permission from MPDV Mikrolab GmbH.

All rights reserved.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 2/20

Project Specification

Declaration of Approval

Specification for the

Interface ERP-HYDRA at framas Kunststofftechnik GmbH

Version: 1

21.05.2019

Author

Name:

Company / position:

Date:

Signature:

Michael Weiß

MPDV Mikrolab GmbH

17.05.2019

Reviewed by

Name:

Company / position:

Date:

Signature:

Approved by

Name:

Company / position:

Date:

Signature:

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 3/20

Project Specification

Change history

Document
Version

0.1

1

Date

Author

Description of the changes

08.05.2019  Michael Weiß

Work in progress version during workshop

21.05.2019

Michael Weiß

Finalized version 1

10:56

New Items #22 : FRAM-001; FRAM-001-001; FRAM-001-002; FRAM-002; FRAM-
002-001;  FRAM-002-001-001;  FRAM-002-001-002;  FRAM-003;  FRAM-003-001;
FRAM-003-001-001;  FRAM-003-001-002;  FRAM-003-002;  FRAM-003-002-001;
FRAM-004; FRAM-004-001; FRAM-004-001-001; FRAM-004-002; FRAM-004-002-
001;  FRAM-004-002-002;  FRAM-004-002-003;  FRAM-004-002-004;  FRAM-004-
002-005;

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 4/20

Project Specification

Content

1  General ................................................................................................................................................... 6

1.1

Project language (language for customizations)....................................................... 6

1.2

Glossary and abbreviations ......................................................................................... 6

1.3

Further applicable documents ..................................................................................... 7

1.4

Stakeholders .................................................................................................................. 7

1.5

Overview of OPEN issues ............................................................................................. 7

1.6

Overview of CUSTOM issues ....................................................................................... 8

1.7

Overview of CONFIG issues ......................................................................................... 8

2  System context ....................................................................................................................................... 9

2.1

Overview of interface (schematic) ............................................................................... 9

2.2

Order/Routing structure in ERP ................................................................................... 9

2.3

Parallel sequences ........................................................................................................ 9

3

Interfaces .............................................................................................................................................. 11

3.1

Interface FRAM-002: Database interface instead of file based interface .............. 11

3.1.1

Function FRAM-002-001: Database interface EIS-DBI ............................................................... 11

3.2

Interface FRAM-003: Interface from ERP to HYDRA ............................................... 13

3.2.1

Function FRAM-003-001: Order and operation interface EIS-ERP + EIS-EZI ......................... 13

3.2.2

Function FRAM-003-002: Protect fields during operation update via interface........................ 15

3.3

Interface FRAM-004: Interface from HYDRA to ERP ............................................... 16

3.3.1

Function FRAM-004-001: Order/operation bookings (timeticket) EIS-ERP .............................. 16

3.3.2

Function FRAM-004-002: Detailed planning data for ERP ......................................................... 18

4  Appendix .............................................................................................................................................. 20

4.1

HYDRA products / licenses ........................................................................................ 20

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 5/20

Project Specification

1  General

This document explains and defines the necessary interfaces between ERP WinLine and MES HYDRA.

This document refers occasionally to other documents (product documentation or EXCEL file) for further

information and to prevent duplicate descriptions.

In a further project step this document may be included in the general specification.

1.1  Project language (language for customizations)

Project language is English. For simplicity interface documentations are provided in German and English.

1.2  Glossary and abbreviations

Term/abbreviation

Description

AIP
BDE
CONFIG

CUSTOM
DMC
DNC
EIS
EMG
FAT
FEP
FMEA
HLS
INFO
LLE
MDE
MDS
MIS
MOC

MRS
MPL
n/a
OP

PCC

PDM
PDV

Acquisition and Information Panel (AIP) - the shop floor terminal of MES
HYDRA.
Shop Floor Data Collection
"Standard" HYDRA configuration made by the customer after participating in
required HYDRA training courses. If required, an MPDV consultant supports
the customer.
Customization developed and delivered by MPDV
Dynamic Manufacturing Control
Decentral NC management
Enterprise Integration Services
Energy Management
Factory Acceptance Test
In-Production Inspection
Failure Mode and Effects Analysis
Shop Floor Scheduling for detailed planning
Information on an issue or chapter in this document.
Incentive Pay
Machine Data Collection
MES Development Suite
MES Implementation Specification
MES Operation Center (MOC) - central GUI of the MES HYDRA at
workstation PCs
MES Requirement Specification
Material and Production Logistics
Not applicable (not relevant)
Operation/process of an order
(Usually, this is the combination of order + operation in HYDRA)
Process Communication Controller
PCC is software consisting of different components and connecting
machines
Production Data Manager (Data communication using "HYDRA dialog data")
Process Data Collection

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 6/20

Project Specification

PEP
PMV
PZE
PZW
QMS
REK
SAT
SIF
SIS
SMA
STD
TRT
WEP
WRM
ZKS

Personnel Scheduling
Gage Management
Attendance and Personnel Time Management
Personnel Time Management
Quality Management System
Complaints Management
Site Acceptance Test
Service interface (Data communication using webservice)
System Integration Services
Smart Mobile Applications
Standard functionality and, if necessary, required MES HYDRA licenses
Tracking & Tracing
Incoming Goods Inspection
Tool and Resource Management
Access Control

1.3  Further applicable documents

Refer here to other documents (e.g. the relevant project order or minutes, e-mails, interface
specifications, etc.). If possible, you should insert links to the documents.

File name

Version

Description

FRAM_interface_datamapping_17052019.Excelx

1

EXCEL file which explains fields in interface

1.4  Stakeholders

Person (company) &

contact details, if necessary

segments.

Description

Kai  Frank,  Sascha  Berger,  Fabian

framas Kunststofftechnik

Sprau

Roman Gaidies

Mesonic software GmbH (supplier of ERP software WinLine)

1.5  Overview of OPEN issues

Es wurden keine Einträge für das Inhaltsverzeichnis gefunden.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 7/20

Project Specification

1.6  Overview of CUSTOM issues

Es wurden keine Einträge für das Inhaltsverzeichnis gefunden.

1.7  Overview of CONFIG issues

CONFIG FRAM-003-002-001: BAPINOUPDATE ....................................................................................... 16

CONFIG FRAM-004-002-003: Operation planned ...................................................................................... 18

CONFIG FRAM-004-002-004: Operation reallocated ................................................................................. 18

CONFIG FRAM-004-002-005: Operation deallocated ................................................................................ 18

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 8/20

Project Specification

2  System context

2.1  Overview of interface (schematic)

Following interfaces will be used to connect ERP WinLine to MES HYDRA. All interfaces are based on

standard HYDRA definition. Instead of the file based implementation the database interface will be used,

file generation will be turned off during interface setup.

Used interfaces are EIS-ERP + EIS-EZI for order/operation download and upload of timetickets. Interface

EIS-EFD will be used to upload scheduling information from HYDRA to ERP. To connect both system the

database interface EIS-DBI is used.

(

I

-

E
S
E
R
P
E
Z
I
)

/

O
r
d
e
r

d
o
w
n
o
a
d

l

ERP

s
P
O
o
t

s
e
g
n
a
h
c
g
n
n
n
a
P

l

i

)

D
F
E
S
E

-

I

(

n
o
i
t
a
m

r
i
f
n
o
c
P
O

/

)
I
Z
E
P
R
E
S
E

-

I

(

HYDRA

2.2  Order/Routing structure in ERP

A typical order structure at FRAM consists of one order header with one or multiple operations. Each

operation will provide its own components. In the first steps no MPL/TRT is used and for this reason the

components are mainly for information in HYDRA.

In addition parallel order sequences are used. The necessary sequencing information is provided by ERP

via interface.

2.3  Parallel sequences

To process orders and operations as required the functionality of parallel sequences will be used. To

process parallel sequences in HYDRA the license BDE-APF is required. This license is at the moment not

included in the project scope.

LIC FRAM-001: necessary licenses

BDE-APF (Processing of alternative/parallel sequences)

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 9/20

Project Specification

TODO FRAM-001-001: Start the order with parallel sequences?

According to documentation BDE-APF only parallel sequences after one “normal” operation

are mentioned. Is it possible to start an order with a parallel sequence?

Responsible: MPDV, Weiß  /  date: 21.05.2019

Weiß, 20.05.2019: If the data is provided correct and in full, it’s possible to start an order with

parallel sequences

TODO FRAM-001-002: Multiple sequences per order

Is it possible to use multiple sequences per order?

Responsible: MPDV, Weiß  /  date: 21.05.2019

Weiß, 20.05.2019: It’s possible to have multiple sequences per order, see also

documentation BDE-APF.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 10/20

Project Specification

3

Interfaces

3.1

Interface FRAM-002: Database interface instead of file based interface

3.1.1  Function FRAM-002-001: Database interface EIS-DBI

Background information:

The background information serves to better understand the requirements of FRAM.

This information is not relevant for the implementation of the requirements.

FRAM wants to use the database interface to transfer data between ERP and MES. No files should be

transferred between systems. To fulfill this requirement FRAM wants to implement the database interface

EIS-DBI to access the interface database tables for inbound and outbound data transfer.

In following chapters the use of the database interface is taken as prerequisite and not described each

time. Transfer of data and further information in regard to the database interface is handled in this chapter

only.

STD FRAM-002-001-001: EIS-DBI

HYDRA standard interface EIS-DBI will be used to transfer data between ERP and MES. No file based interface

transfer will take place.

LIC FRAM-002-001-002: necessary licenses

EIS-DBI (Interface based on databases)

Functions in MES HYDRA:

The database interface EIS-DBI provides the customer access to the data staging tables for inbound and

outbound data transfer. It’s possible to insert and read data from these DB tables. For correct processing

of the data processing information need to be created by the external system (in this case ERP) which

would normally be created by HYDRA. These information are mainly control records in addition to the

required data records.

Access to the application database tables is not permitted by license EIS-DBI!

3.1.1.1  Activation

The DB interface will be activated based on the license EIS-DBI and the interface setup.

3.1.1.2  Transfer media

Data is transferred from ERP to MES into the staging DB tables.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 11/20

Project Specification

3.1.1.3  Data structure

The data structure of each involved interface is described in the corresponding chapter and linked

documentation.

3.1.1.4  Archiving



Interface data of MLE inbound transactions ("HYSAP-INBOUND") are archived after two days and
deleted after seven days (configured in HYDRA distribution model).



If required (especially during the test phase), you can change this interval for every message type.

3.1.1.5  Mode of operation

Following the general workflow and responsibilities of the Systems are visualized.

For inbound transfer (ERP --> HYDRA):

For outbound transfer (HYDRA --> ERP)

Further information can be found in documentation “EIS-DBI_30.pdf” and in the EXCEL file

“FRAM_interface_datamapping_17052019.xlsx” provided by Michael Weiß. In the documentation the

transfer and DB table columns are described in detail.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 12/20

External System / HYDRA MLEExternal SystemHYDRAExternal System Prepares DataSegments written to HYSAP_INBOUND_DATAControl Record written to HYSAP_INBOUND_CTRLDispatcherHYSAP_INBOUND_DATA entered into HydraHYSAP_INBOUND_CTRL updatedLog and Error files createdExternal System / HYDRA MLEExternal SystemHYDRAHYDRA Converts Data into IDoc formatStored in HYSAP_INBOUND_DATAwith DS_STATUS =  000'Transfer CompleteUpdating HYSAP_INBOUND_DATA.DS_STATUSto "099"New record created in HYSAP_OUT_CTRLUpdating HYSAP_INBOUND_DATA.DS_STATUSto "100"

Project Specification

3.1.1.6  Expected result

Data records and control records are transferred correct from ERP to HYDRA and HYDRA to ERP via DB

interface.

3.2

Interface FRAM-003: Interface from ERP to HYDRA

3.2.1  Function FRAM-003-001: Order and operation interface EIS-ERP + EIS-EZI

Background information:

The background information serves to better understand the requirements of FRAM.

This information is not relevant for the implementation of the requirements.

With the interface EIS-ERP and extension EIS-EZI information for orders and operations are transferred

from ERP to MES. In following descriptions the name EIS-ERP is used for the combined interface licenses

EIS-ERP and EIS-EZI.

Following image visualizes the hierarchy of transferrable data and the relation between them.

STD FRAM-003-001-001: EIS-ERP + EIS-EZI

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 13/20

Project Specification

HYDRA standard interface EIS-ERP + EIS-EZI will be used.

Data will be transferred via DB interface EIS-DBI instead of standard file based interface.

Functions in MES HYDRA:

Necessary order/operation data will all be transferred via interface EIS-ERP.

3.2.1.1  Activation

The interface is activated during interface setup and based on the licenses EIS-ERP/EZI.

3.2.1.2  Transfer media

Data will be transferred via DB interface, see chapter 3.1.

3.2.1.3  Data structure

The general data structure of the interface is as follows. Note: not all segments are mandatory.

Message type/
file name:

Message functions/
file extensions:

Segments:

HY72PPS

DAT

HY72_AU_HD_001_A (order header)
│ ├ HY72_AU_INFO_AI_001_A (long texts)
│ └ HY72_AU_USRFLD_001_A (user fields)
├ HY72_AFOLG_001_A (Sequence)
├ HY72_AG_HD_001_A (operation data – part 1)
│    ├ HY72_AG_HD_002_A (operation data – part 2)
│    ├ HY72_AG_KOMPL_001_A (component list)
│    │     └ HY72_AG_KOMPL_USRFLD_001_A (comp. user fields)
│    ├ HY72_AG_FHM_001_A (PRT / resources)
│    ├ HY72_AG_DOC_001_A (documents)
│    ├ HY72_AG_INFO_AI_001_A (long texts)
│    ├ HY72_AG_USRFLD_001_A (user fields)
│    └ HY72_AG_RF_001_A (MPL-RF-specific data)
└ HY72_FERTVAR_001_A (production variants)

(Taken from documentation EIS-ERP_81.pdf)

The single segments with data fields are explained in documentation EIS-ERP_81.pdf and the additional

EXCEL file for the data mapping. The EXCEL file includes also example data, reference to ERP WinLine

datafields and further explanations.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 14/20

Project Specification

3.2.1.4

Involved objects

Order Header (Segment: HY72_AU_HD_001_A)

Long texts for order header (Segment: HY72_AU_INFO_AI_001_A)

User fields for order header (Segment: HY72_AU_USRFLD_001_A)

Operation sequence (Segment: HY72_AFOLG_001_A)

Operation Data (Segment: HY72_AG_HD_001_A)

Componenten list for consumption materials (Segment: HY72_AG_KOMPL_001_A)

User fields for components (Segment: HY72_AG_KOMPL_USRFLD_001_A) (optional)

PRT / resource information (Segment: HY72_AG_FHM_001_A) (optional)

Links to documents on network share etc. (Segment: HY72_AG_DOC_001_A)

Long texts for operations (Segment: HY72_AG_INFO_AI_001_A) (optional)

User fields for operations (Segment: HY72_AG_USRFLD_001_A) (optional)

3.2.1.5  Mode of operation

Order/operation data will be provided by the ERP to MES. ERP will stage the data according to process

for the DB interface EIS-DBI. Each segment results in one line of data in the database table.

Please note the description for create/modify and deletion of data via interface (chapter 6 “Order data ERP

--> HYDRA” in documentation EIS-ERP_81.pdf).

INFO FRAM-003-001-002: Order sequences

For the correct processing of order sequences HYDRA needs the information for master sequence and parallel

sequence via the interface. This information needs to be transferred for each order individually.

3.2.1.6  Expected result

Data for orders/operations is transferred to HYDRA and available for further processing.

3.2.2  Function FRAM-003-002: Protect fields during operation update via interface

Background information:

The background information serves to better understand the requirements of <CUSTOMER>.

This information is not relevant for the implementation of the requirements.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 15/20

Project Specification

If an operation is updated via interface and HYDRA HLS is used it’s necessary to configure the

functionality of “BAPINOUPDATE”. This configuration prevents fields from updated via interface, this is

necessary e.g. for the information on which workplace a specific operation is planned.

To use the BAPINOUPDATE functionality see documentation EIS-ERP, chapter 11. Following

configuration should be used:

Example: protect the planned workplace

If the operation is planned on a workstation, you have to prevent the ERP interface from cancelling this

planning and putting the operation back into the operation pool of workplaces. To do so, enter the below-

mentioned data:

Field name

Section

Key

Value

Active

Value

ANR

ANR.MGRP@ANR.MNR@ANR.OPT:PLAN@

ANR.ATYP=AG@ANR.OPT:PLAN=M@

Yes

CONFIG FRAM-003-002-001: BAPINOUPDATE

Configure BAPINOUPDATE functionality according to documentation EIS-ERP to protect the planned workplace and

further fields as needed.

3.3

Interface FRAM-004: Interface from HYDRA to ERP

3.3.1  Function FRAM-004-001: Order/operation bookings (timeticket) EIS-ERP

Background information:

The background information serves to better understand the requirements of FRAM

This information is not relevant for the implementation of the requirements.

Recorded quantities (yield, scrap with reason) and times will be uploaded via timetickets. HYDRA will

provide this confirmations in the staging DB tables for outbound processing.

STD FRAM-004-001-001: EIS-ERP + EIS-EZI

HYDRA standard interface EIS-ERP + EIS-EZI will be used.

Data will be transferred via DB interface EIS-DBI instead of standard file based interface.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 16/20

Project Specification

3.3.1.1  Activation

Upload of confirmations is based on configuration in HYDRA at order types.

3.3.1.2  Transfer media

Data will be transferred via DB interface, see chapter 3.1.

3.3.1.3  Data structure

The general data structure of the interface is as follows.

Message type:

HY72ADRCK_TT

IDOC type:

HY72ADRCK_TT

The segment with data fields is explained in documentation EIS-ERP_81.pdf and the additional EXCEL

file for the data mapping. The EXCEL file includes also example data, reference to ERP WinLine

datafields and further explanations.

3.3.1.4

Involved objects

Recorded quantities and processing time are the base for the timetickets.

3.3.1.5  Properties

Each operation may result in several timetickets based on handling at the terminal. Each timeticket will be

transferred, an aggregation of two or more timetickets into one timeticket will not take place.

3.3.1.6  Archiving



Interface data of MLE outbound transactions ("HYSAP-OUTBOUND") are archived after two days and
deleted after seven days (configured in HYDRA distribution model).



If required (especially during the test phase), you can change this interval for every message type.

3.3.1.7  Mode of operation

HYDRA creates timetickets based on recorded order bookings which in turn are based on postings at the

shopfloor terminal. Timetickets are provided in the outbound interface DB table and are at that moment

transferable to the ERP.

Based on the EIS-DBI interface the process will end with the provision of the timetickets in the interface

DB tables.

3.3.1.8  Expected result

Timetickets are provided in the outbound interface DB table and the ERP collected all open data

segments.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 17/20

Project Specification

3.3.2  Function FRAM-004-002: Detailed planning data for ERP

Background information:

The background information serves to better understand the requirements of FRAM

This information is not relevant for the implementation of the requirements.

The scheduling of operations is done completely in HYDRA. To have basic information at ERP it’s

possible to provide a defined dataset of information from HYDRA graphic planning (HLS). This information

are created based on 3 possible events:

1.  Planning of an operation

2.  Reallocation of an already planned operation

3.  Deallocation of an already planned operation

STD FRAM-004-002-001: EIS-EFD

HYDRA standard interface EIS-EFD will be used.

Data will be transferred via DB interface EIS-DBI instead of standard file based interface.

LIC FRAM-004-002-002: necessary licenses

EIS-EFD (Enhancement for detailed scheduling data to ERP)

3.3.2.1  Activation

Precondition: The functionality is licensed

Each of the possible events is activated based on a configuration.

CONFIG FRAM-004-002-003: Operation planned

Create the HYDRA logging configuration “HLS/EINPLANEN” – see documentation EIS-EFD_81.pdf

CONFIG FRAM-004-002-004: Operation reallocated

Create the HYDRA logging configuration “HLS/UMPLANEN” – see documentation EIS-EFD_81.pdf

CONFIG FRAM-004-002-005: Operation deallocated

Create the HYDRA logging configuration “HLS/AUSPLANEN” – see documentation EIS-EFD_81.pdf

3.3.2.2  Transfer media

Data will be transferred via DB interface, see chapter 3.1.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 18/20

Project Specification

3.3.2.3  Data structure

The general data structure of the interface is as follows.

Message type:

HY72ADRCK_SC

IDOC type:

HY72ADRCK_SC

The segment with data fields is explained in documentation EIS-EFD_81.pdf and the additional EXCEL file

for the data mapping. The EXCEL file includes also example data, reference to ERP WinLine datafields

and further explanations.

3.3.2.4

Involved objects

Origin of data

  Planning data from HYDRA graphic planning

3.3.2.5  Properties

Data set may be created several times per operation during it’s “lifetime” based on different planning steps

at HYDRA HLS.

3.3.2.6  Archiving



Interface data of MLE outbound transactions ("HYSAP-OUTBOUND") are archived after two days and
deleted after seven days (configured in HYDRA distribution model).



If required (especially during the test phase), you can change this interval for every message type.

3.3.2.7  Mode of operation

The mentioned data set is created after the planning in HYDRA HLS is saves. Each changed operation

may result in one data set at the interface. The data set structure is always the same, the data itself may

change.

3.3.2.8  Expected result

HYDRA HLS planning data is provided from HYDRA to ERP.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 19/20

Project Specification

4  Appendix

4.1  HYDRA products / licenses

HYDRA licenses:

  Licenses of the following table are required additionally.

HYDRA product  Description

License

Number

Database
interface

Additional
interface
database interface.

license

for

the  HYDRA

EIS-DBI

ERP interface

Upload of detailed planning data for ERP

EIS-EFD

Application
Service

Additional license to process order sequences

BDE-APF

1

1

1

The additional required licenses will be included in the expanded license overview by Mr. Richarz.

File: FRAM_GK_INTERFACES.docx Version: 1

Modified: 21.05.2019

Page 20/20


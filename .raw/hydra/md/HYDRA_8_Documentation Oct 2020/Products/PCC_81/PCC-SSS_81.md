Manual

PCC Module Serial Interface
PCC-SSS 8.1

Version 1.0.23049

Last changed on: 02.09.2020

PCC Module Serial Interface

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PCC-SSS_81.docx

Version: 1.0.23049

Page 2 of 8

PCC Module Serial Interface

Contents

1  PCC Module Serial Interface ........................................................................ 4

2  PCC Module Serial Interface ........................................................................ 6

2.1  Machine Data Connection via RS232 .................................................................. 6

2.1.1  Explanation of Control Characters ........................................................... 6

2.1.2

Log Structure for Data Transmission ....................................................... 7

PCC-SSS_81.docx

Version: 1.0.23049

Page 3 of 8

PCC Module Serial Interface

1  PCC Module Serial Interface

Purpose

The  serial  interface  is  frequently  used  for  communication  between  machines  and  application  programs.

The interface is available with different hardware configurations, e.g. RS 232 or RD 485. The joint feature

of all these interfaces is that they send data as a serial data flow. Data contents and communication logs

are only standardized to a small extent. For each machine type, an own interpretation has to be defined

and implemented.

This access mode can be used for data from the HYDRA modules

-

-

-

-

MDE (counter, cycle, status)

PDV (process values)

DNC (setting values)

Scale values

By extending the PCC-ADP application adapter, other data (e.g. MPL or ADE data) as well as complex

communication forms may also be processed.

Implementation Considerations

You use the function package if:



you intend to connect a machine to the MES by means of a serial interface.

  The required elements for mapping the log must exist or be created for the specific machine. A

statement on this is provided in machine installation consulting.

Integration

The  log  element/protocol  module  is  integrated  in  HYDRA  PCC.  Please  refer  to  the  manuals  for  the

products SCS-PCP and SCS-PCB.

Features



Interface element/protocol module to transfer process and machine data from machine or system

controls  via  serial  interfaces,  and/or  to  transfer  setting  parameters  (NC  data)  to  controls;  it  is

required once per connected machine, aggregate or control.

PCC-SSS_81.docx

Version: 1.0.23049

Page 4 of 8

PCC Module Serial Interface

PCC-SSS_81.docx

Version: 1.0.23049

Page 5 of 8

PCC Module Serial Interface

2  PCC Module Serial Interface

2.1  Machine Data Connection via RS232

Data  transmission  requires  a  serial  RS-232  interface.  It  is  possible  to  connect  both  the  information  of

several machines via a serial channel as well as individual machines via one serial interface each.

The  data  are  transmitted  in  point-to-point  operation.  The  control  characters  used  are  STX,  DLE,  ETX,

NAK  and  BCC.  The  data  block  length  must  not  exceed  255  bytes.  The  maximum  block  length  is  only

applicable to net data, hence the data exclusive of control characters.

2.1.1  Explanation of Control Characters

Control

Hexadecimal

character

encoding

Explanation

STX

02

Sending  STX  signals  sending  readiness  to  the  partner.  Confirmation  is

expected within a predefined period.

ETX

03

DLE ETX signals the end of a transmission block

DLE signals readiness for receipt after receipt of STX. DLE is the positive

confirmation of a correctly received transmission block. In addition, DLE

DLE

10

initiates the end control character ETX. If DLE appears in the data block by

chance, the driver adds a second DLE in order to make the recipient aware

of this peculiarity. The receiver station will hide the additional DLE again.

NAK

15

NAK is the negative confirmation if a block was received with errors.

PCC-SSS_81.docx

Version: 1.0.23049

Page 6 of 8

MachinePCHYDRA- Shop Floor PCctwinRS 232PCCCustomer communicationinterfaceseriell_drvdd.dll

BCC

PCC Module Serial Interface

The  block  check  character  is  a  block-specific  check  sequence  which  is

added to the data block and is used for recognizing incorrectly transmitted

data  and  control  blocks  in  the  transmission  of  code-based  character

strings.  During  formation,  error  protection  procedures  are  applied  in

accordance with the determination of parity bits.

The block check character is the even longitudinal parity (EXOR link of all

data bytes) of a sent and/or received block.

2.1.2

Log Structure for Data Transmission

Data packages can be exchanged in both directions. For this purpose, the machine control provides

information about the current machine conditions and in turn receives messages for signal lamps or

machine locks from the HYDRA system in accordance with the configuration.

Data exchange follows the pattern described below:

  The sending system transfers a control character <STX> and signals that data are to be sent to

the destination device.

PCC-SSS_81.docx

Version: 1.0.23049

Page 7 of 8

SenderRecipientSTXDLEDefinedtimeData1. Byte...           max. 255 ByteDLE ETXBCCDLE or NAK

PCC Module Serial Interface



If the destination device is ready for receipt, it signals this by sending a control character <DLE>.

If this confirmation is not received, the sending system starts two more attempts with the start

character <STX> before it ceases sending, and then transmits an appropriate message to the

higher-level system.



In the case of on-time <DLE> confirmation by the destination device, the sender now starts

transmitting the data package and adds <ETX> and <BCC> at the end of a sequence of <DLE>.

After sending these control characters, the sending system awaits a reply from the destination

device in order to complete the transmission of this data package.



If a data package was received from the destination device, the latter will start evaluating the

block check character (BCC) and hence determines the correct data contents of the block

received. If no error was detected, a confirmation with control character <DLE> is sent.

Otherwise, an error message <NAK> is sent to inform the sender that the package has to be

repeated. This repetition, however, will start from step 1 with an <STX> control character.

  A <DLE> confirmation signals successful completion of the transmission to the sender.

Subsequently, other transmissions may follow, or data may be exchanged in the reverse

direction.

PCC-SSS_81.docx

Version: 1.0.23049

Page 8 of 8


Manual

Interface for Measuring
Equipment
SCS-IMM 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Interface for Measuring Equipment

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

SCS-IMM_81.docx

Version: 1.0.23049

Page 2 of 8

Interface for Measuring Equipment

Contents

1

Interface for Measuring Equipment .............................................................. 4

2  MDI Configuration ........................................................................................ 5

SCS-IMM_81.docx

Version: 1.0.23049

Page 3 of 8

Interface for Measuring Equipment

1

Interface for Measuring Equipment

Purpose

This component allows for the automatic acquisition of inspection data by user-initiated action.

Implementation considerations

This component is to be used for requesting the acquisition of inspection data of any type.

Integration

This component is predominantly intended for the following components:







Inspection planning for inspections along the manufacturing chain

Inspection planning for goods receipt inspections

Inspection planning for calibration, and

  Quality management subsystem to SAP QM.

Features

This  component  represents  the  interface  to  connecting  interface  equipment  of  various  manufacturers

(Steinwald,  Bobe,  IBRit,  etc.)  in  accordance  with  the  MPDV  compatibility  list  and  as  established  as

inspection  equipment  and/or  inspection  equipment  group  in  the  HYDRA  inspection  equipment

administration (license PMV-SVP).

The following functions are available:

  Automatic  adaption  of  measuring  values  from  inspection  systems  such  as  calipers,  outside

micrometers, feelers, etc. connected through an interface device or data interfaces

  Access to measuring values and/or measuring value files within the network



Integrated measuring value buffer

SCS-IMM_81.docx

Version: 1.0.23049

Page 4 of 8

Interface for Measuring Equipment

2  MDI Configuration

Summary

Menu

Master data  Quality management  MDI configuration

Transaction code

mdi

Function authorization  mdi

MDI stands for Measurement Data Interface.

The  "MDI  configuration"  application  is  the  basis  for  online  data  collection.  However,  the  configuration

varies subject to the measurement equipment/interface devices/measuring systems to be connected. The

configurations  made  here  allow  for  the  measured  values  recorded  by  the  individual  MDI  drivers  to  be

transferred to the individual characteristics of the inspection orders.

Different  MDI  drivers  are  used,  depending  on  the  measurement  equipment/interface  device/measuring

system to be connected. The below list indicates some of the available MDI drivers.

  MDI  serial  (for  connections  via  serial  interfaces.  Only  one  measured  value  is  transferred  with

each serial transfer)

  MDI  measured  value  list  (a  file  includes  measured  values  of  several  characteristics.  Each

characteristic is written in a separate line/row)

  MDI  measured  value  file  (a  file  includes  measured  values  of  several  characteristics.  Each

characteristic is written in a separate column)

  MDI  serial  list  (for  connections  via  serial  interfaces.  Each  serial  transfer  can  send  measured

values for several characteristics at the same time. The different characteristics are indicated in

separate lines)

  MDI Steinwald (special driver to connect interface devices by STEINWALD datentechnik GmbH)

  MDI Ibrit (special driver to connect interface devices by IBR – Messtechnik GmbH)

Utilization

The  “Measurement  equipment  connection”  field  includes  the  ID  number  of  the  test  equipment

configuration  to  be  created.  Any  short  description  of  the  measurement  equipment  connection  may  be

entered  in  the  “Description”  field.  Ideally,  the  channel  description  matches  the  description  of  the  MDI

driver.  The  "channel"  field  includes  the  channel  number  of  the  MDI  driver  used  for  recording  measured

values. Once the configuration has been completed, it has to be released by checking the "active" field.

SCS-IMM_81.docx

Version: 1.0.23049

Page 5 of 8

Interface for Measuring Equipment

In  the  “connection”  tab  you  need  to  enter  the  IP  address  of  the  computer  on  which  the  MDI  driver  was

started. Use the IP address 127.0.1, in the event that the MDI driver is running on the same computer that

is also supposed to receive the measured values from the connected measurement equipment (i.e. where

measurement value recording will take place).

The  TCP  port  number  of  the  computer  on  which  the  MDI  driver  was  started  has  to  be  entered  in  the

"communication"  tab.  Another  port  value  than  the  default  port  value  9900  is  usually  only  required  if

several MDI drivers are running on one computer.

Specific settings are made in the "properties" tab. The functions of these fields are explained in the below

field description.

Integration

This function has been integrated in the measurement recording function and allows for measured values

to be received/collected automatically. In addition, this application allows for resources of the "PRM" type

(gages)  to  be  assigned  to  an  MDI  configuration.  A  basis  for  online  data  collection  is  established,  as

resources of the "PRM" type are assigned to the characteristics/inspection plan characteristics.

Prerequisite

To be able to use this function in a reasonable manner, resources of the "PRM" type have to be created

beforehand, to be in the position to assign them to the corresponding MDI configurations.

Selection criteria

Selection criteria are self-explanatory and are not described separately.

Field descriptions

Measurement equipment connection

ID number of the MDI configuration

Designation

Description of the MDI configuration

Channel

Channel number that has been defined in the corresponding MDI driver.

active

The MDI configuration is released and available, once the "active" field has been checked.

IP address

IP address of the computer on which the MDI driver is installed. The IP address 127.0.0.1 is to be

entered if this is the local computer.

SCS-IMM_81.docx

Version: 1.0.23049

Page 6 of 8

Interface for Measuring Equipment

Port

Communication port, by default 9900. If this port is already assigned the next higher port number is

to be entered.

Performance/behavior during measurement recording

  Measured values are recorded, irrespective of the characteristic that is active.

Within measurement recording measured values of all characteristics can be read out of the

MDI drivers and assigned to the inspection order characteristics at once. Consequently, this

configuration does not require the corresponding characteristic to be active in measurement

recording to be able to transfer the respective measured values. This configuration has to be

selected, e.g. for complex measuring equipment delivering values for several characteristics

in one measurement at the same time.

  Measured values are only collected if the corresponding characteristic is active.

In measurement recording only measured values for the currently selected characteristic are

read out from the MDI driver and assigned to it. In the majority of cases, this configuration is

used for locally connected measurement equipment, e.g. sliding calipers.

  Enter measured values directly into the input field

If this option is checked, the measured value recorded by the MDI driver is

directly copied to the entry field of the selected characteristic.

Delete measured value buffer at activation

If this option  is checked, the measured value  buffer for this channel is  deleted  on the  MDI server

upon activation of the channel. This setting is mostly used with measurement devices for which the

option  “Measured  values  are  only  collected  if  corresponding  characteristic  is  active”  has  been

activated.

Delete measured values that cannot be saved (plausibility checking) from buffer

In case this option is checked, measured values that cannot be stored, e.g. due to not passing the

plausibility/validity check, are deleted from the buffer for this MDI channel.

Additional parameters

This  field  may  be  used  to  enter  additional  configuration  parameters  to  be  transmitted  to  the

specified MDI driver channel. Only in rare cases are additional configuration parameters required.

One example for configuring this parameter is specifying the interval for querying the corresponding

test  device  channel.  In  order  to  be  able  to  apply  a  configuration,  the  MDI  driver  and  the

measurement  equipment  connected  to  it  must  support  the  parameters  defined  here.  Several

parameters are separated by semicolon.

SCS-IMM_81.docx

Version: 1.0.23049

Page 7 of 8

Interface for Measuring Equipment

Editing functions

The following dialog opens to edit a data record:

Toolbar

Assignment of resources

Function to assign resources of the type "PRM“.

SCS-IMM_81.docx

Version: 1.0.23049

Page 8 of 8


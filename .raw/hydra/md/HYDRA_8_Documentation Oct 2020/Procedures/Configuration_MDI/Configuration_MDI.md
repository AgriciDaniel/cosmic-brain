MDI Server Configuration

1  MDI Server Configuration

1.1  Overview

In order to collect data online in the product groups FEP, WEP, EMU and PMV, you have to do the

following:

- install and configure one or several MDI servers

- configure MDI in the MOC

The training course EAT-MDI provides further information on the MDI servers you should use in each

specific case. In general, you can choose from the following MDI servers:

  MDI Steinwald

  MDI IBRit

  MDI Seriell (serial)

  MDI Liste Seriell (serial list)

  MDI Messwertliste (measurement list)

  MDI Messwertdatei (measurement file)

Contact MPDV to request the MDI servers.

You can install each MDI server separately by starting the file "setup.exe". You need local administration

rights to install the servers.

The computer where you want to install the MDI server must have a fixed IP address (not DHCP)

or you must configure the MDI server as local host.

You must stop all running MDI servers prior to the installation.

You have to exit the MDI server via the menu item "File --> Exit" to make sure all settings will be

saved.

Configuration_MDI.docx

                     Version:1.5.22285

Page 1 of 38

MDI Server Configuration

Note the following if you collect measured values of several characteristics:

You  must  not  access  the  same  MDI  from  several  AIP  inspection  stations  at  the  same  time.

Consequently, several AIP inspection stations cannot export data via the same MDI.

Enable the MDI queue mode, if several AIP inspection stations access the same MDI. The MDI

queue mode is available as of service pack 14. Enable/activate the MDI queue mode manually.

Section "MDI queue mode" of this procedure document provides further information on this.

You have to activate the licenses AIP-MDI and SIS-IMM in order to use online data collection.

After installing and starting the MDI server, the MDI server is displayed as an icon in the status area of the

taskbar. A hammer and a red/green LED represent the server. A red LED indicates that the MDI server is

not active. If the LED is green, the MDI server is active.

A tooltip appears, if you mouse over the icon. The tooltip shows the name of the MDI server and a list of

the channels.

A single left-click opens the MDI server dialog. Right-click to open the context menu. You can also use the

context menu to open the MDI server dialog. You can also use the context menu to enable, disable or close

the MDI server.

Disable the MDI server if you want to change the general settings or the settings of the file structure. The

LED of the MDI server icon will then appear red in the status area of the taskbar.

Use the menu item File to enable, disable or close the MDI server. Also use this menu item to configure

the language.

Use the menu item Settings to restore the default values of the MDI server. You can also import and export

configuration settings.

Use the menu item Measurement buffer to delete the measurement buffers of all channels.

Configuration_MDI.docx

                     Version:1.5.22285

Page 2 of 38

MDI Server Configuration

The Measurement buffer tab shows the data deriving from the measuring equipment. To do so, select a

characteristic/channel in the selection list “Characteristics display” and click the Refresh button. Then the

measurement buffer is displayed for this characteristic/channel. If the Display immediately option is set, the

displayed data is constantly updated/refreshed. This might lead to performance losses. Select the button

“Delete measurement buffer” to delete the measurement buffer for the selected characteristic/channel. This

process does not delete the measurement buffers of the other characteristics/channels.

The Test/debug tab shows information on the TCP interface and internal MDI server processing. You can

use this information for troubleshooting or test purposes. Usually, this information is not relevant for normal

operation.

Configuration_MDI.docx

                     Version:1.5.22285

Page 3 of 38

1.2  MDI Steinwald

MDI Server Configuration

Use the Settings tab to define the TCP port, the interval for the measured value query, the maximum

measured value buffer size per measuring equipment/characteristic and the COM settings. In addition,

you can specify if:

- all measured value buffers are emptied when the server is started,

- the MDI server is activated on starting

- a reset is triggered on starting. Any changes to the settings are saved locally when the MDI server is

closed (not when it is deactivated).

The COM port settings depend on the connected Steinwald box and can be found in the corresponding

manual. If the Steinwald box is connected via USB, enter the COM parameters of the corresponding USB

serial driver. Refer to the manufacturer's documentation for further information.

The entered TCP port must match the configuration of the communication port (MOC Quality Management

--> Master data --> MDI Configuration --> MDI Configuration).

Configuration_MDI.docx

                     Version:1.5.22285

Page 4 of 38

MDI Server Configuration

You  can  create  and/or  edit  the  characteristics/channels  in  the  section  Measurement  equipment

configuration. If you want to create a new characteristic/channel, fill out the input fields Channel, Measured

value type and Designation/Name and configure the required settings. Finally, click the Add/Save button.

Measured value type:

Act:

Current measured value

Max:  Maximum measured value

Min:  Minimum measured value

Dif:

Difference between maximum and minimum measured value

Measured values can be requested manually: If the checkbox is enabled, the MDI client can request a

measured value from the measuring equipment.

Requested  measured  values  are  considered  confirmed:  You  can  only  select  this  option,  if  you  also

checked  the  option  “Measured  values  can  be  requested  manually”.  In  this  case,  a  measured  value

requested  by  the  MDI  client  is  considered  confirmed.  Measured  values  deriving  from  the  measuring

equipment and not requested by the MDI client are considered unconfirmed.

Triggered measured values are considered confirmed: Select this option to confirm all measured values

that are triggered by foot switches or device buttons.

Configuration_MDI.docx

                     Version:1.5.22285

Page 5 of 38

MDI Server Configuration

Request measured values at intervals (otherwise buttons only):  Set this option to request data from

the connected measuring equipment at regular intervals (polling). Enter the interval in milliseconds in the

relevant input field. The default value is 100 milliseconds.

Measuring equipment may be initialized manually: Set this option to allow the MDI client to initialize the

measuring equipment of this channel.

Manual  (fixed)  activation  of  measuring  equipment:  Set  this  option  to  activate  or  deactivate  the

measuring equipment/channel permanently, depending on whether the option is set or not for the channel

itself. Consequently, the MDI server ignores any request sent by the MDI client to the MDI server to enable

or  disable  the  connected  measuring  equipment.  The  MDI  client  is  sent  a  message  indicating  that  this

functionality is not supported. If the option is set, the channel status (active/inactive) is saved when the MDI

server is closed and restored when it is started the next time.

Please note: Changes to the characteristics/channels only take effect after you clicked the Add/save

button!

The  list  then  shows  the  measuring  equipment  (characteristic)  with  the  channel,  the  type  and  the

designation/name. A checkbox is also displayed. You can use this checkbox to activate or deactivate the

characteristic/channel.

Calibration:

You can enter an integer or decimal value in the Factor input field. You can multiply the incoming measured

value of the channel with this value. You can also enter an integer or decimal value in the Offset input field.

You can add to or subtract this value from the incoming measured value of the channel.

You can only make entries in the fields Factor and Offset if the MDI server is not enabled. Click the Add /

Save button to store the entered values for the channel.

Please note: Thousands separators are not supported. Commas or points are required as decimal

separators.

Configuration_MDI.docx

                     Version:1.5.22285

Page 6 of 38

MDI Server Configuration

1.3  MDI IBRit

Configuration_MDI.docx

                     Version:1.5.22285

Page 7 of 38

MDI Server Configuration

Use the Settings tab to specify the TCP port, the interval for the measured value query and the maximum

size of the measured value buffer per measuring equipment/characteristic. You can also specify if the MDI

server is activated upon starting and if all measured value buffers are emptied. Any changes to the settings

are saved locally when the MDI server is closed (not when it is deactivated).

The entered TCP port must match the configuration of the communication port (MOC Quality Management

--> Master data --> MDI Configuration --> MDI Configuration).

Click the button Device configuration to call the IBRit configuration program and to configure the interface

and connected devices. The IBRit manual provides a detailed description.

Configuration_MDI.docx

                     Version:1.5.22285

Page 8 of 38

MDI Server Configuration

You  can  create  and/or  edit  the  characteristics/channels  in  the  section  Measurement  equipment

configuration. If you want to create a new characteristic, fill out the input fields Interface, Connection and

Designation/Name and configure the required settings. Then click the New/save button.

Measured values can be requested manually: If the checkbox is enabled, the MDI client can request a

measured value from the measuring equipment.

Requested  measured  values  are  considered  confirmed:  You  can  only  select  this  option,  if  you  also

checked  the  option  “Measured  values  can  be  requested  manually”.  In  this  case,  a  measured  value

requested  by  the  MDI  client  is  considered  confirmed.  Measured  values  deriving  from  the  measuring

equipment and not requested by the MDI client are considered unconfirmed.

Measured values are transferred via foot switches: If you check this option, the current measured value

will be transferred once you have used the foot switch.

Measured values are transferred via device switches: If you select this option, the current measured

value  will  be  transferred  once  you  have  used  the  data  transfer  switch  of  the  measuring  equipment,  if

available.

Request measured values at intervals:  Set this option to request data from the connected measuring

equipment at regular  intervals (polling). Enter  the interval in milliseconds  in the relevant  input field. The

default value is 100 milliseconds.

Configuration_MDI.docx

                     Version:1.5.22285

Page 9 of 38

MDI Server Configuration

All  measured  values  of  the  measuring  equipment  are  considered  confirmed:  All  measured  values

deriving from the connected measuring equipment are considered confirmed.

Manual  (fixed)  activation  of  measuring  equipment:  Set  this  option  to  activate  or  deactivate  the

measuring equipment/channel permanently, depending on whether the option is set or not for the channel

itself. Consequently, the MDI server ignores any request sent by the MDI client to the MDI server to enable

or  disable  the  connected  measuring  equipment.  The  MDI  client  is  sent  a  message  indicating  that  this

functionality is not supported. If the option is set, the channel status (active/inactive) is saved when the MDI

server  is  closed  and  restored  when  it  is  started  the  next  time.  Please  note  that  the  channel  status

(active/inactive)  is  only  saved  for  such  channels  where  the  option  for  the  manual  (fixed)  activation  is

enabled.

Please  note:  Changes  to  the  characteristics/channels  only  take  effect  after  you  clicked  the

New/save button!

The  list  then  shows  the  measuring  equipment  (characteristic)  with  the  interface,  connection  and

designation/name. A checkbox is also displayed. You can use this checkbox to activate or deactivate the

characteristic/channel.

1.4  MDI Seriell (serial)

Configuration_MDI.docx

                     Version:1.5.22285

Page 10 of 38

MDI Server Configuration

Use  the  Settings  tab  to  specify  the  TCP  port,  the  maximum measured  value  buffer  size  per  measuring

equipment/characteristic and the COM settings. You can also specify if the MDI server should be activated

immediately upon starting. Any changes to the settings are saved locally when the MDI server is closed

(not when it is deactivated).

The  COM  port  settings  depend  on  the  measuring  equipment  you  connect.  The  relevant  measuring

equipment  manuals  provide  further  details  on  these  settings.  The  entered  TCP  port  must  match  the

configuration of the communication port (MOC Quality Management --> Master data --> MDI Configuration

--> MDI Configuration).

Use the Output format tab to specify the structure of data records coming from the measuring equipment.

You can also find this information in the measuring equipment manual.

If you want to enter special characters and/or control characters, use the synonyms listed below:

<SOH> corresponds to ASCII character 1

<STX> corresponds to ASCII character 2

<ETX> corresponds to ASCII character 3

<EOT> corresponds to ASCII character 4

<ACK> corresponds to ASCII character 6

<TAB> corresponds to ASCII character 9

<LF> corresponds to ASCII character 10

<FF> corresponds to ASCII character 12

<CR> corresponds to ASCII character 13

<NACK> corresponds to ASCII character 21

<EOF> corresponds to ASCII character 26

<SPACE> corresponds to ASCII character 32

Configuration_MDI.docx

                     Version:1.5.22285

Page 11 of 38

Example: Enter <CR><LF> in the corresponding input field, if you want to separate the data records sent

by the measuring equipment using carriage return and line feed.

You can separate data records using separators or by specifying a fixed record length.

MDI Server Configuration

Use the Measured value tab to specify how the measured value is identified in a data record. You can also

find this information in the measuring equipment manual.

Specify  the  characters  to  be  ignored  and  the  initialization  command  of  the  measuring  equipment  (if

available) in the Miscellaneous tab. Characters to be ignored will be removed from the data record before

the data record will actually be processed. The initialization command is sent to the measuring equipment

when the MDI server is enabled or the respective button is clicked.

Configuration_MDI.docx

                     Version:1.5.22285

Page 12 of 38

MDI Server Configuration

Use the Error detection tab to specify character strings that identify a data record as faulty. If the measuring

equipment supports this function, you can find these character strings in the manual about the measuring

equipment.

You can create and/or edit the characteristics/channels in the section Measuring equipment configuration.

If you want to create a new characteristic/channel, fill out the input fields Channel and Name/Designation.

You also have to make your required entries in the tabs Validity, Commands and Configuration. Then click

the New/Save button.

Configuration_MDI.docx

                     Version:1.5.22285

Page 13 of 38

MDI Server Configuration

The input field Factor only appears if the configuration file mdiseriell.ini is configured accordingly. If the field

should be displayed, the segment [General] must include the entry FactorUsed=1. The measured value is

multiplied by the value included in the Factor field. The factor value can be a positive, negative, integer or

floating-point number. Factor 1 will be used, if no factor is indicated for a characteristic. You can enter a

comma as decimal separator. However, a decimal point will be stored and used.

Please  note:  Changes  to  the  characteristics/channels  only  take  effect  after  you  clicked  the

New/save button!

The  list  now  shows  the  measuring  equipment  (characteristic)  including  the  channel  number  and  the

designation/name. A checkbox is also displayed. You can use this checkbox to activate or deactivate the

characteristic/channel.

Please note: Activating and/or deactivating a piece of measuring equipment/channel is not saved

unless you configured the manual (fixed) activation for this measuring equipment/channel.

Also see the section about the Configuration tab.

Use the Validity tab to specify if a measured value that is sent by the measuring equipment is always valid

or if the data record must include a specific character string that identifies a measured value as valid.

Configuration_MDI.docx

                     Version:1.5.22285

Page 14 of 38

MDI Server Configuration

Use the Commands tab to specify different commands for each characteristic/channel, provided that these

commands are supported by the connected measuring equipment. If you enter a command in the Activate

field, for example, this command will be sent to the connected measuring equipment as soon as the MDI

client sends a request to the MDI server.

Use the Configuration tab to configure each characteristic/channel separately.

Manual  (fixed)  activation  of  measuring  equipment:  Set  this  option  to  activate  or  deactivate  the

measuring equipment/channel permanently, depending on whether the option is set or not for the channel

itself. Consequently, the MDI server ignores any request sent by the MDI client to the MDI server to enable

or  disable  the  connected  measuring  equipment.  The  MDI  client  is  sent  a  message  indicating  that  this

functionality is not supported. If the option is set, the channel status (active/inactive) is saved when the MDI

server  is  closed  and  restored  when  it  is  started  the  next  time.  Please  note  that  the  channel  status

(active/inactive)  is  only  saved  for  such  channels  where  the  option  for  the  manual  (fixed)  activation  is

enabled.

Request measured values at intervals: You can only check this option, if you entered a command for

this characteristic in the Request data input field of the Commands tab. If this is the case and the option is

checked, then data is requested at regular intervals from the connected measuring equipment (polling). To

do so, the command entered in the Request data input field is sent to the connected measuring equipment

at regular intervals. Enter the interval in milliseconds in the relevant input field. The default value is 100

milliseconds.

Save measured values only for activated measuring equipment: If this option is checked, measured

values deriving from measuring equipment will be ignored if the channel is not active.

Measured values can be requested manually: You can only check this option, if you entered a command

for this channel/characteristic in the Request data input field of the Commands tab. If this is the case and

the option checked, the MDI client can request a measured value. The MDI server sends the command

specified in the Request data input field to the connected measuring equipment.

Configuration_MDI.docx

                     Version:1.5.22285

Page 15 of 38

MDI Server Configuration

Measured values are always considered confirmed: All measured values deriving from the connected

measuring equipment are considered confirmed for this channel/characteristic.

Measured values are always considered unconfirmed: All measured values deriving from the connected

measuring equipment are considered unconfirmed for this channel/characteristic.

Measured value confirmed if measuring equipment is active:  All measured values deriving from the

connected measuring equipment are considered confirmed for this channel/characteristic, provided that the

channel/characteristic  is  active.  If  the  channel/characteristic  is  inactive,  the  measured  values  are

considered unconfirmed.

Measured value confirmed if requested manually: You can only select this option, if you also checked

the option Measured values can be requested manually. In this case, a measured value requested by the

MDI  client  is  considered  confirmed.  Measured  values  deriving  from  the  measuring  equipment  and  not

requested by the MDI client are considered unconfirmed.

Use the Action tab to initialize the channel/characteristic or to request data. To do so, you have to make

the corresponding entries in the input fields Initialize and/or Request data of the Commands tab.

Configuration_MDI.docx

                     Version:1.5.22285

Page 16 of 38

1.5  MDI Liste Seriell (serial list)

MDI Server Configuration

Use  the  Settings  tab  to  define  the  TCP  port,  the  maximum  measured  value  buffer  size  per  measuring

equipment/characteristic and the COM settings. 2 COM ports are supported. Leave the fields COM port 1

or COM port 2 empty if you only want to use one COM port.

You can also specify if the MDI server should be activated immediately upon starting. Any changes to the

settings are saved locally when the MDI server is closed (not when it is deactivated).

The  COM  port  settings  depend  on  the  measuring  equipment  you  connect.  The  relevant  measuring

equipment  manuals  provide  further  details  on  these  settings.  The  entered  TCP  port  must  match  the

configuration of the communication port (MOC Quality Management --> Master data --> MDI Configuration

--> MDI Configuration).

Configuration_MDI.docx

                     Version:1.5.22285

Page 17 of 38

MDI Server Configuration

You can create and/or edit the characteristics/channels in the section Characteristic configuration. If you

want  to  create  a  new  characteristic/channel,  fill  out  the  input  fields  Channel,  Characteristic  ID  and

Designation (name). Then click the Add/save button.

Please note: Changes to the characteristics/channels only take effect after you clicked the Add/save

button!

The  list  now  shows  the  measuring  equipment  (characteristic)  including  the  channel  number  and  the

designation/name.

Use the tabs Output format / Separators to specify the structure of data records deriving from the measuring

equipment. You can also find this information in the measuring equipment manual.

Characters  to  be  ignored  will  be  removed  from  the  data  record  before  the  data  record  will  actually  be

processed.

If you want to enter special characters and/or control characters, use the synonyms listed below:

<SOH> corresponds to ASCII character 1

<STX> corresponds to ASCII character 2

<ETX> corresponds to ASCII character 3

<EOT> corresponds to ASCII character 4

Configuration_MDI.docx

                     Version:1.5.22285

Page 18 of 38

MDI Server Configuration

<ACK> corresponds to ASCII character 6

<TAB> corresponds to ASCII character 9

<LF> corresponds to ASCII character 10

<FF> corresponds to ASCII character 12

<CR> corresponds to ASCII character 13

<NACK> corresponds to ASCII character 21

<EOF> corresponds to ASCII character 26

<SPACE> corresponds to ASCII character 32

Example: Enter <CR><LF> in the corresponding input field, if you want to separate the data records sent

by the measuring equipment using carriage return and line feed.

Use the Measured value tab to specify the column of the data record that includes the measured value and

the character that is used as the decimal separator. You can also find this information in the measuring

equipment manual.

Configuration_MDI.docx

                     Version:1.5.22285

Page 19 of 38

MDI Server Configuration

Use the Header data tab to specify the column number of the Inspector and the Characteristic ID.

You can also specify further data fields. Use the pipe character "|" to separate these data fields. Use percent

signs to indicate the column number of the data field.

Example: MNR=%1%

The  machine  number  (MNR)  is  entered  in  the  first  column  of  the  data  record  sent  by  the  measuring

equipment.

The terminal supports the following data fields to filter the collected data:

CNR

ANR

ATK

batch number

order number

article number

NUM:EINTTYP

number type for measurement recording of numbers, e. g.  PPUNKT for

inspection point

NUM:EINTNR

number, e. g. inspection point number 000001

Example of data collection via the terminal:

  The data field CNR is configured and the measurement buffer of a channel includes measured

values with different batch numbers.



If you open measurement data collection and request measured values from the MDI server, only

those measured values are collected and saved whose batch number of the MDI measurement

buffer match that of the inspection requirement.



If the inspection requirement does not include a batch number, the filter is not enabled and all

measured values are collected from the measurement buffer.

Configuration_MDI.docx

                     Version:1.5.22285

Page 20 of 38

Use the Date/time tab to specify the column numbers and/or separators for the date, time and the date

format.

MDI Server Configuration

1.6  MDI Messwertliste (measurement list)

This MDI has been designed to collect measured values from all characteristics. You should only

use  this  MDI  for  this  purpose.  If  you  use  the  MDI  for  characteristics  and  you  select  the

characteristic  in  the  AIP  inspection  data  collection,  the  system  automatically  requests  the

measured values, enters and saves these values in the measurement field. Please note that the

configurable  additional data fields are not used to filter the collected  data. In this context,  AIP

inspection data collection always requests and collects all data.

Use the Settings tab to define the TCP port, the interval for the file query and the file filter for result files.

You can also specify if work files are deleted after processing, if subdirectories are integrated and if the

MDI server  is to be  activated immediately  upon starting.  You can  also specify  the maximum size of the

measurement buffer for each piece of measuring equipment/characteristic.

Any changes to the settings are saved locally when the MDI server is closed (not when it is deactivated).

Configuration_MDI.docx

                     Version:1.5.22285

Page 21 of 38

MDI Server Configuration

The  COM  port  settings  depend  on  the  measuring  equipment  you  connect.  The  relevant  measuring

equipment  manuals  provide  further  details  on  these  settings.  The  entered  TCP  port  must  match  the

configuration of the communication port (MOC Quality Management --> Master data --> MDI Configuration

--> MDI Configuration).

You can create and/or edit the characteristics/channels in the section  Characteristic configuration. If you

want  to  create  a  new  characteristic/channel,  fill  out  the  input  fields  Channel,  Characteristic  ID  and

Designation (name). Then click the Add/save button.

Please note: Changes to the characteristics/channels only take effect after you clicked the Add/save

button!

The  list  now  shows  the  measuring  equipment  (characteristic)  including  the  channel  number  and  the

designation/name.

Use the tabs Output format / Separators to specify the structure of data records deriving from the measuring

equipment. You can also find this information in the measuring equipment manual.

If you want to enter special characters and/or control characters, use the synonyms listed below:

Configuration_MDI.docx

                     Version:1.5.22285

Page 22 of 38

MDI Server Configuration

<SOH> corresponds to ASCII character 1

<STX> corresponds to ASCII character 2

<ETX> corresponds to ASCII character 3

<EOT> corresponds to ASCII character 4

<ACK> corresponds to ASCII character 6

<TAB> corresponds to ASCII character 9

<LF> corresponds to ASCII character 10

<FF> corresponds to ASCII character 12

<CR> corresponds to ASCII character 13

<NACK> corresponds to ASCII character 21

<EOF> corresponds to ASCII character 26

<SPACE> corresponds to ASCII character 32

Example: Enter <CR><LF> in the corresponding input field, if you want to separate the data records sent

by the measuring equipment using carriage return and line feed.

Use the checkbox Ignore quotes to specify whether or not double quotes (ASCII #34) as they are used, for

example in ".csv" files to restrict strings are integrated while processing the file. If they are not integrated,

the characteristic ID is stated without quotation marks.

Use the Measured value tab to specify the column of the data record that includes the measured value and

the character that is used as the decimal separator. You can also find this information in the measuring

equipment manual.

Configuration_MDI.docx

                     Version:1.5.22285

Page 23 of 38

MDI Server Configuration

Use the Header data tab to specify the column number of the Inspector and the Characteristic ID.

You can also specify further data fields. Use the pipe character "|" to separate these data fields. Use percent

signs to indicate the column number of the data field.

Example: MNR=%2%

The machine number (MNR) is entered in the second column of the data record sent by the measuring

equipment.

The terminal supports the following data fields to filter the collected data:

CNR

ANR

ATK

Batch number

Order number

Article number

NUM:EINTTYP

Number type for measurement recording of numbers, e. g. PPUNKT for

inspection point

NUM:EINTNR

number, e. g. inspection point number 000001

Example for data collection via the terminal:

  The data field CNR is configured and the measurement buffer of a channel includes measured

values with different batch numbers.



If you open AIP inspection data collection and request measured values from the MDI server,

only those measured values are collected and saved whose batch number of the MDI

measurement buffer is identical to that of the inspection requirement.



If the inspection requirement does not include a batch number, the filter is not enabled and all

measured values are collected from the measurement buffer.

Configuration_MDI.docx

                     Version:1.5.22285

Page 24 of 38

MDI Server Configuration

Use the Date/time tab to specify the column numbers and/or separators for the date, time and the date

format.

1.7  MDI Messwertdatei (measurement file)

Configuration_MDI.docx

                     Version:1.5.22285

Page 25 of 38

MDI Server Configuration

This MDI has been designed to collect measured values from all characteristics. You should only

use  this  MDI  for  this  purpose.  If  you  use  the  MDI  for  characteristics  and  you  select  the

characteristic  in  the  AIP  inspection  data  collection,  the  system  automatically  requests  the

measured values, enters and saves these values in the measurement field. Please note that the

configurable  additional data fields are not used to filter the collected  data. In this context,  AIP

inspection data collection always requests and collects all data.

Use the Settings tab to define the TCP port, the interval for the file query and the file filter for result files.

You can also specify if work files are deleted after processing, if subdirectories are integrated and if the

MDI server  is to be  activated immediately  upon starting.  You can  also specify  the maximum size of the

measurement buffer for each piece of measuring equipment/characteristic.

If you select the option Delete processed lines, data is not read from the work file but from the original file.

While being accessed, the file is write-protected for other processes (locked/read-only). The read lines are

deleted from the file. The first row (header) might be kept (see below).

Please note: You cannot use the options Delete processed lines and Delete work files after processing

together.

Any changes to the settings are saved locally when the MDI server is closed (not when it is deactivated).

The  COM  port  settings  depend  on  the  measuring  equipment  you  connect.  The  relevant  measuring

equipment  manuals  provide  further  details  on  these  settings.  The  entered  TCP  port  must  match  the

configuration of the communication port (MOC Quality Management --> Master data --> MDI Configuration

--> MDI Configuration).

Configuration_MDI.docx

                     Version:1.5.22285

Page 26 of 38

MDI Server Configuration

Use the File structure tab to specify the structure of a data record deriving from the measuring equipment.

You can also find this information in the measuring equipment manual. Also specify how to separate the

data records and/or columns of a data record.

If you want to enter special characters and/or control characters, use the synonyms listed below:

<SOH> corresponds to ASCII character 1

<STX> corresponds to ASCII character 2

<ETX> corresponds to ASCII character 3

<EOT> corresponds to ASCII character 4

<ACK> corresponds to ASCII character 6

<TAB> corresponds to ASCII character 9

<LF> corresponds to ASCII character 10

<FF> corresponds to ASCII character 12

<CR> corresponds to ASCII character 13

<NACK> corresponds to ASCII character 21

<EOF> corresponds to ASCII character 26

<SPACE> corresponds to ASCII character 32

Configuration_MDI.docx

                     Version:1.5.22285

Page 27 of 38

MDI Server Configuration

Example: Enter <CR><LF> in the corresponding input field, if you want to separate the data records sent

by the measuring equipment using carriage return and line feed.

You can create and/or edit the characteristics/channels in the section  Characteristic configuration. If you

want to create a new characteristic, fill out the input fields Channel, Column and Designation/Name. If you

check the corresponding option, you can specify that the measured values of the characteristic/channel are

considered confirmed. Then click the Add/save button.

Please note: Changes to the characteristics/channels only take effect after you clicked the Add/save

button!

The  list  now  shows  the  measuring  equipment  (characteristic)  including  the  channel  number  and  the

designation/name.

Use  the  Number  format  tab  to  specify  the  character  to  be  used  as  decimal  separator  for  the measured

value. You can also find this information in the measuring equipment manual.

Enter the column number of the inspector in the Header data tab.

Configuration_MDI.docx

                     Version:1.5.22285

Page 28 of 38

MDI Server Configuration

You can also specify further data fields. Use the pipe character "|" to separate these data fields. Use percent

signs to indicate the column number of the data field.

Example: MNR=%2%

The machine number (MNR) is entered in the second column of the data record  sent by the measuring

equipment.

The terminal supports the following data fields to filter the collected data:

CNR

ANR

ATK

Batch number

Order number

Article number

NUM:EINTTYP

Number type for measurement recording of numbers, e. g. PPUNKT for

inspection point

NUM:EINTNR

number, e. g. inspection point number 000001

Example of data collection via the terminal:

  The data field CNR is configured and the measurement buffer of a channel includes measured

values with different batch numbers.



If you open AIP measurement data collection and request measured values from the MDI server,

only those measured values are collected and saved whose batch number of the MDI

measurement buffer is identical to that of the inspection requirement.



If the inspection requirement does not include a batch number, the filter is not enabled and all

measured values are collected from the measurement buffer.

Configuration_MDI.docx

                     Version:1.5.22285

Page 29 of 38

Use the Miscell. tab to specify whether or not the first line is to be ignored. The first line remains, if you edit

the original file (see settings)! Enter the characters that should be ignored in the single data records in the

field Characters to be ignored. You can directly enter the characters without using separators.

MDI Server Configuration

Use  the  Date/time  tab  to  specify  if  the  date  and/or  time  of  measurement  should  be  used  from  the

measurement data record.

Configuration_MDI.docx

                     Version:1.5.22285

Page 30 of 38

MDI Server Configuration

2  MOC Configuration

The  following  example  illustrates  how  the  MDI  driver  measurement  list  is  configured.  The  displayed

configuration shows how data  deriving from a measuring machine is transferred to the AIP input dialog.

The displayed settings are not fixed and can be adjusted according to current requirements. You can also

use a specific piece of test equipment instead of a group. You can change the AIP buttons and the driver

does not have to be installed on local host IP:127.0.0.1, etc.

Figure 1: Example of a measurement list

2.1  Test equipment (gage) group

Create a test equipment group for each characteristic you want to transfer.

MOC --> Quality management -->Test equipment management --> Test equipment (gage) group

Figure 2: Example of test equipment groups

Configuration_MDI.docx

                     Version:1.5.22285

Page 31 of 38

2.2

Inspection plan

Assign a measuring/test equipment group to each characteristic in the inspection plan.

MDI Server Configuration

Figure 3: Example of assigning a test equipment group to a characteristic.

2.3  MDI configuration

Assign an MDI channel for each characteristic.

MOC --> Master data --> Quality management --> MDI configuration

Figure 4: MDI configuration

Configuration_MDI.docx

                     Version:1.5.22285

Page 32 of 38

MDI Server Configuration

Figure 5: MDI configuration – Properties

Assign a test equipment group to each configured channel.

Figure 6: MDI configuration – MDI resource assignment

Configuration_MDI.docx

                     Version:1.5.22285

Page 33 of 38

Use the MDI resource assignment application to assign pieces of test equipment or test equipment groups

to the MDI channel. "Add" and/or select the test equipment group (or the piece of test equipment) to assign

it to the MDI channel.

MDI Server Configuration

Figure 7: MDI resource assignment

Configuration_MDI.docx

                     Version:1.5.22285

Page 34 of 38

MDI Server Configuration

3  AIP measurement data transfer

Go to the inspection point in the inspection list (left-hand side) to transfer the measured values to the AIP.

Go to the second tab of the inspection point to click the button Accept measurement data. Click this button

to store the data from the MDI driver in the database. Click the button Update display to show the values.

Configuration_MDI.docx

                     Version:1.5.22285

Page 35 of 38

4  MDI queue mode

The MDI queue mode is available as of service pack 14.

MDI Server Configuration

If you activate the MDI queue mode, the collection of measured values might be delayed as MDI

measurement data are processed sequentially.

Example:

Measurement data transfer to MDI "X“ is started at AIP inspection station "A“. This process

takes approx. 2 minutes.

10 seconds after starting the measurement transfer from AIP inspection station "A", AIP

inspection station "B" also starts a measurement transfer to MDI "X". This transfer also takes

approx. 2 minutes.

AIP inspection station "B" starts collecting the measured values 1 minute and 50 seconds after

triggering the measurement transfer due to the sequential processing. The collection of

measured values for AIP inspection station "B" only starts once all measured values of AIP

inspection station "A" have been collected. Therefore, AIP inspection station "B" only shows all

collected measured values after approx. 3 minutes and 50 seconds.

In some rare cases, problems might occur if you collect data at the same time.

4.1  Activating the MDI queue mode

4.1.1  Execute the patch "dbp_caq_mdi_lrv_queue.hsc“

Execute the database patch "dbp_caq_mdi_lrv_queue.hsc“ as follows:

Configuration_MDI.docx

                     Version:1.5.22285

Page 36 of 38

MDI Server Configuration

Windows:

cd %HYDRADIR%

hydscr.exe .\db_sql\ dbp_caq_mdi_lrv_queue.hsc > dbp_caq_mdi_lrv_queue.pro

Linux

cd $HYDRADIR

hydscr.out .\db_sql\ dbp_caq_mdi_lrv_queue.hsc > dbp_caq_mdi_lrv_queue.pro

4.1.2  Changing the MDI server script

Change the MDI server script "hy_cmdilrv_auft.scr“ as follows in the HYDRA system directory.

The following screenshots indicates the part of the script that has to be changed.

…

Change and/or add the paragraphs highlighted in yellow in the following screenshot.

…

4.2  Description of the function

How to collect measured values in the MDI queue mode:

1.  The system triggers the measurement transfer via the AIP

2.  The server identifies if an MDI server process is already running.

3.  The system enters the request for collecting measured values in the table caq_mdi_lrv_queue

with status open.

Configuration_MDI.docx

                     Version:1.5.22285

Page 37 of 38

MDI Server Configuration

4.

If no MDI server process (response to issue 2 = no) is running, the system immediately

processes the new, outstanding entry of the table caq_mdi_lrv_queue. After processing, the

system checks if the table caq_mdi_lrv_queue includes new entries with status open. If there are

further entries with the status open, they will be processed one after the other. The MDI server

process is finished automatically if the table caq_mdi_lrv_queue does not include an entry with

the status open.

5.

If an MDI server process is already running (response to issue 2 = yes), the additionally started

server process will be finished automatically.

The following data is stored in the table caq_mdi_lrv_queue every time measured values are requested to

be collected:

rec_type = area type of the inspection requirement, e. g. "FEP“

bereich = area of the inspection requirement, e. g. "F“

pruefanf_nr = unique inspection requirement number

eintrag_nr = unique inspection point number

verarb_status =  processing status

anforderung_usr = HYDRA user. The HYDRA user indicates the requesting terminal number.

anforderung_ts = point in time (date and time in hh:mm:ss,123) of the request to collect measured
values

verarb_start_ts = start time (date and time in hh:mm:ss,123) of processing

verarb_end_ts = end time (date and time in hh:mm:ss,123) of processing

anz_mw_success = number of measured values collected successfully

prot_filename = link to the corresponding log file

first_problem  = excerpt of the log file about the first problem occurred

Configuration_MDI.docx

                     Version:1.5.22285

Page 38 of 38


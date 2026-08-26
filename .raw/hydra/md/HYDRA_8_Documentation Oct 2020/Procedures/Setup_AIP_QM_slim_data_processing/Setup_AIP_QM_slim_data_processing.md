Configuration of AIP QM Streamlined Data Processing

1  Configuration of AIP QM Streamlined Data Processing

Basic configuration

This  document  describes  the  steps  necessary  in  order  to  achieve  streamlined  data  processing  for  AIP

terminals as part of CAQ 8.1 inspection results recording.

Streamlined data processing includes four different sections:

1.  Disabling  of  failure  and/or  measure  processing    see  Configuration_AIP-QM.doc    can  be

performed by modifying dynamic dialogs and workflow settings

The  other  three  sections  require  minimum  software  versions  (see  below)  and  implementation  of  option

1214:

2.  disabling the list of automatic errors

3.

reducing dialog data

4.  disabling control charts

Please proceed as follows:

Option 1214 - AIP CAQ streamlined data processing

Install & activate

On the HYDRA server please start the MS-DOS prompt from the "HYDRA administration" directory on the

desktop (for Windows) and/or connect to the HYDRA server via Telnet connection (for UNIX).

Execute the following command:

hydscr.exe db_sql/dbp_caq82_option_1214.hsc

Optionally, the following command can be executed:

hydscr.exe db_sql/dbp_caq82_status_rk.hsc

This cancels disabling of control charts.

Configuration / functional description

Setup_AIP_QM_slim_data_processing.docx

Version:

Page 1 of 4

Configuration of AIP QM Streamlined Data Processing

System Availability

MW 3.0

MW 2.1

AIP

CTWIN

Console

MOC

Miscellaneous

(server)

(server)

X

Valid values

 Y/N

Valid from HYDRA-CAQ versions onwards:

caq_dc_t.dll >= 2.0.2.36

caq72.dll >= 2.0.2.28

mpdv-aip.zip >= 15 February 2015

Area-dependent

no

Description

If this option is enabled processing and collection of inspection data can be simplified and

therefore accelerated at AIP CAQ terminals by making different entries in the "addition" field.

The following can be entered in the "addition" field:

-  [SKIP_RK]

-  [SLIM_DATA]

-  [SKIP_AET]

The different entries do not depend on each other and can be combined in any way.

They are separated by commas in the "addition" field.

These functions are not available for QMS.

[SKIP_RK]

Processing and display of control charts are disabled for the following input types

in the dialogs for inspection results recording.

Setup_AIP_QM_slim_data_processing.docx

Version:

Page 2 of 4

Configuration of AIP QM Streamlined Data Processing

-

-

-

-

BEWERT_STICHPR_PPUNKT_SIMPLE

BEWERT_STICHPR_SIMPLE

MESSW_ESTCK_PPUNKT_SIMPLE

MESSW_ESTCK_STICHPR_SIMPLE

If processing and display of control charts are only to be disabled for specific input types, this is

can  be  achieved  in  the  relevant  status  of  the  "ERFASSART"  status  type.  By  removing  the

parameter  "[RK]“,  the  control  chart  function  is  disabled  for  the  relevant  input  type.  For  further

details please refer to the status documentation entitled "Configuration_QM_Status".

Displaying  of control charts may be enabled  and/or  disabled for specific terminals (or terminal

groups) via the AIP configuration file "caq_dc_t.ini", which also overrides any option set. Further

details can be found in the document entitled "AIP_Configuration_caq_dc_t".

When activated subsequently, the parameter [RK] has to be added to the relevant status for the

mentioned input types, provided that control charts should be displayed.

[SLIM_DATA]

Adding of data filters to reduce the data volume when calling up the dialogs for

inspection results recording, which accelerates processing.

Default filters can be changed in the AIP configuration file "caq_slim_data.ini“ within the

folder .\packets\. If changed, this file is to be stored in the custom directory on the server.

[SKIP_AET]

Processing and display of automatic failure lists are disabled for specific dialogs

of inspection results recording.

The following input types support processing of automatic failure lists:

-

-

-

BEWERT_STICHPR_PPUNKT_SIMPLE

BEWERT_STICHPR_SIMPLE

MESSW_ESTCK_PPUNKT_SIMPLE

Setup_AIP_QM_slim_data_processing.docx

Version:

Page 3 of 4

Configuration of AIP QM Streamlined Data Processing

-

MESSW_ESTCK_STICHPR_SIMPLE

Further configuration details can be found in the document entitled "Configuration_AIP-QM".

Updating the HYDRA terminal clients (AIP)

1.  Update the program version of HYDRA terminal clients.

There are different possibilities:

A) Direct installation at the terminal:
- Restart the terminals.
- In the start menu of the terminal download the programs from the server using the
 menu item "Load Application“ .

B) Remote installation via the MOC client
- Choose the option
 "Reload program“
 in the MOC terminal configuration - terminal administration

2.  After installing the terminal update, verify if the program version in the terminal configuration of the

MOC client corresponds to that version listed on the delivery note.

Further configurations/requirements

-  Availability of the configuration file .\packets\caq_slim_data.ini

-  Availability of the terminal script ZIP mpdv-aip.zip (at least version dated 15 February 2015)

-  Availability of the software caq72.dll (version >= 2.0.2.28)

-  Availability of the software caq_dc_t.dll (version >= 2.0.2.36)

The  configuration  document  entitled  "Configuration_AIP-QM"  describes  how  the  relevant

functions can be configured / activated.

Setup_AIP_QM_slim_data_processing.docx

Version:

Page 4 of 4


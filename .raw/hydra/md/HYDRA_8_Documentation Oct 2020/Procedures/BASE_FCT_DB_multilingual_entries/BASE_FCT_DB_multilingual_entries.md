Multilingual Database Contents
1 Multilingual Database Contents
Overview
This document describes how the multilingual display of user data (master data) is processed.
 In addition to the native language of database contents, multilingual designations of master data
(e.g. machine designations, status texts, …) can be managed in MW 3.0.
 The terminal requests the texts in the language that is configured for the terminal. This makes it
possible not only to operate a terminal on a German system, e.g. in England, with an English-
language GUI, but also to display the important names from the database in English.
 Just as is the case for the terminal, these multilingual texts may also be displayed and edited
using the MES Operation Center.
 It is possible to activate up to 8 languages at the same time which are supported by HYDRA-MW
3.0.
 There are no restrictions as regards the languages that can be displayed for clients that are
compatible with Unicode.
 The Windows terminal can also display East Asian languages. (*1)
 Multi-lingual master data can be edited using the System Text Configurator (STC). This means
that a simple translation is possible.
 HYDRA partially also delivers initial data that include texts in the native column. These texts have
to be translated by way of STC.
(*1) Since English is a language without umlauts and all character sets display the Latin alphabet,
English is available for all language configurations.
Available languages
At the moment MESWeaver 3.0 supports the languages listed in the following paragraph for which the
"multilingual database contents" functions can also be provided:
 German
BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232 Page 1 of 15

Multilingual Database Contents
 English
 Dutch
 French
 Danish
 Czech
 Spanish
 Portuguese
 Bulgarian
 Polish
 Slovenian
 Hungarian
 Slovak
 Romanian
 Chinese,Simplified
 Italian
 Russian
 Serbian,Cyrillic
 Swedish
 Norwegian
 Croatian
 Japanese
 Korean
Activation
The multilingual database content functions are generally available (short: MDBI). The languages
concerned that are to support the MDBI function have to be prepared and activated explicitly by MPDV
Implementing.
Functions
In addition to the native language of database contents, MW 3.0 allows for multilingual designations of
master data (e.g. machine designations, status texts, …) to be managed. These multilingual master data
may be administered and translated via the system text configurator (STC). If the required language is
prepared (configured, activated and translated) for MDBI access to language-specific master data is
activated and represented when the clients are started (or when languages are switched at the console).
Administration table
Active and inactive MDBI languages are managed in the hyd_languages table. Here, the required
configurations are defined.
BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232 Page 2 of 15

|     |     |     |     | Multilingual Database Contents  |     |     |
| --- | --- | --- | --- | ------------------------------- | --- | --- |

Only MPDV Implementation is responsible for managing the languages (activation/deactivation).
Schema
| Field name   | Type      | Size  | Description            |     |      |        |
| ------------ | --------- | ----- | ---------------------- | --- | ---- | ------ |
| language_id  | smallint  | -     | Unique language index  |     |      |        |
|              |           |       | e.g.                   | 6   | for  | Czech  |

language_iso  char  2  Language key according to ISO code 639
|     |     |     | e.g.  | “cs“  | for  | Czech  |
| --- | --- | --- | ----- | ----- | ---- | ------ |

| language_ui  | char  | 10  | Language of the user interface  |          |      |        |
| ------------ | ----- | --- | ------------------------------- | -------- | ---- | ------ |
|              |       |     | e.g.                            | “cs-CZ”  | for  | Czech  |

| language_cp   | char  | 6   | Windows codepage of the language  |            |          |           |
| ------------- | ----- | --- | --------------------------------- | ---------- | -------- | --------- |
|               |       |     | e.g.                              | 1250  for  | Eastern  | European  |

language_ml  char  80  Multilingual  language  designation  (English),  e.g.
“Czech“ for Czech
language_name   char  80  Language-specific designation in the character set of
|     |     |     | the respective language  |          |      |        |
| --- | --- | --- | ------------------------ | -------- | ---- | ------ |
|     |     |     | e.g.                     | “Česky“  | for  | Czech  |

| active  | char  | 1   | Y … activated  |              |      |           |
| ------- | ----- | --- | -------------- | ------------ | ---- | --------- |
|         |       |     | N  …           | deactivated  | (by  | default)  |

|     |     |     | ”This  | field  is  configured  | by  MPDV  | during  |
| --- | --- | --- | ------- | ---------------------- | --------- | ------- |
implementation/customization and must not be changed
manually.
| sbcs  | char  | 1   | Single Byte Character Set Y/N  |     |     |     |
| ----- | ----- | --- | ------------------------------ | --- | --- | --- |
language_def  smallint  -  Language index of the default language

Index:
create unique index ix_langid on hyd_languages (language_id);

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 3 of 15

Multilingual Database Contents
Default configuration
The following MDBI configuration is created when the HYDRA database is being built:
-----------------------------------------------------------
ID ISO CP ML ACTIVE SBCS DEF
-----------------------------------------------------------
01 de 1252 German N Y 00
02 en 1252 English N Y 00
03 nl 1252 Dutch N Y 02
04 fr 1252 French N Y 02
05 da 1252 Danish N Y 02
06 cs 1250 Czech N Y 02
07 es 1252 Spanish N Y 02
08 pt 1252 Portuguese N Y 02
09 bg 1250 Bulgarian N Y 02
10 pl 1250 Polish N Y 02
11 sl 1250 Slovenian N Y 02
12 hu 1250 Hungarian N Y 02
13 sk 1250 Slovak N Y 02
14 ro 1250 Romanian N Y 02
15 zh 936 Chinese, Simplified N N 02
17 it 1252 Italian N Y 02
18 ru 1251 Russian N Y 02
19 sr 1251 Serbian, Cyrillic N Y 02
20 sv 1252 swedish N Y 02
21 no 1252 Norwegian N Y 02
22 hr 1250 Croatian N Y 02
23 ja 932 Japanese N N 02
24 ko 949 Korean N N 02
MPDV changes this configuration during the implementation process according to the customer’s
requirements..
Implementing of MDBI functions
MPDV activates the steps required to support MDBI functions during implementing.
Overview of multilingual columns
The following table shows the supported table columns for which MDBI functions are available:
Implementation Comment
HR Accounts are displayed in the
Multilingual configuration of corresponding language (terminal
account designations info, time sheet, account lists)
HR Designations are displayed in the
Multilingual configuration of the corresponding language (time
designation of remuneration day sheet, personnel scheduling)
types
BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232 Page 4 of 15

|     |     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | --- | ------------------------------- |

| HR                                 |                | Designations are displayed in the   |                   |            |     |
| ---------------------------------- | -------------- | ----------------------------------- | ----------------- | ---------- | --- |
| Multilingual configuration of the  |                | corresponding language (display of  |                   |            |     |
| designation of absence reasons     |                | latest  clockings                   | at  the           | terminal,  |     |
|                                    |                | absence reason list)                |                   |            |     |
| PEP                                |                | Designations are displayed in the   |                   |            |     |
| Multilingual                       | configuration  | of  corresponding                   | language  (HYDRA- |            |     |
| qualification                      | designations   | PEP on user interface, personnel    |                   |            |     |
|                                    |                | schedule                            | is  displayed     | on  the    |     |
terminal):
| HYD          |     |  Configuration of units  |                     |      |     |
| ------------ | --- | ------------------------- | ------------------- | ---- | --- |
| Designation  | of  | units                     |                     |      |     |
|              |     |  No  other               | dialogs  in  which  | the  |     |

designation is displayed (only the
abbreviation is displayed)
| MDE        |                 |  Workplace configuration  |     |     |     |
| ---------- | --------------- | -------------------------- | --- | --- | --- |
| Workplace  | configuration:  |                            |     |     |     |
 Designations are displayed on the
| Designation,  | comment  |     |     |     |     |
| ------------- | -------- | --- | --- | --- | --- |
console

o
| MDE          |              |  Configuration  |     |     |     |
| ------------ | ------------ | ---------------- | --- | --- | --- |
| Designation  | of  machine  | status           |     |     |     |
 The designation is displayed in
texts
the corresponding language
o Machine overview
|     |     | o Machine  | overview:  | combo  |     |
| --- | --- | ---------- | ---------- | ------ | --- |
box
o Order overview
o Machine status log
o   Event maintenance
o   Status/Status classes/RPA
|     |     | o Status/Status  | classes/RPA:  |     |     |
| --- | --- | ---------------- | ------------- | --- | --- |
Combobox
o
 Terminal display
| MDE  |     |  Configuration  |     |     |     |
| ---- | --- | ---------------- | --- | --- | --- |
Designation of status classes
 The designation is displayed in
the corresponding language

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 5 of 15

|     |     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | --- | ------------------------------- |

o Machine overview
o Order overview
o   Machine status log
o Maintenance of postings
o   Event maintenance
|     |     | o Downtimes  | of  | one/several  |     |
| --- | --- | ------------ | --- | ------------ | --- |
machines
| BDE                   |               |  Multilingual  | configuration  | of    |     |
| --------------------- | ------------- | --------------- | -------------- | ----- | --- |
| Designation           | of  resource  | account         | designations   | and   |     |
| performance accounts  |               | abbreviations   |                |       |     |
 The designation is displayed in
the corresponding language
|     |     | o MDE:  | Status/Status  |     |     |
| --- | --- | ------- | -------------- | --- | --- |
classes/RPA: all tabs
|     |     | o MDE:        | Status/status  |          |     |
| --- | --- | ------------- | -------------- | -------- | --- |
|     |     | classes/RPA:  | RPA            | profile  |     |
(column heading)
|     |     | o  ADE:  | versatile  | dialogs  |     |
| --- | --- | -------- | ---------- | -------- | --- |
(column headings)
| BDE                                |     |  Multilingual                     | configuration  | of  the    |     |
| ---------------------------------- | --- | ---------------------------------- | -------------- | ---------- | --- |
| Designation of order status texts  |     | designation of order status texts  |                |            |     |
 The designation is displayed in
the corresponding language
o  ADE: versatile combo boxes
|     |     | (e.g.  | order  | overview,  |     |
| --- | --- | ------ | ------ | ---------- | --- |
schedule violations, …)
o ADE: Order overview: list
o ADE: Order information
o ADE: Change status
o ADE: AVG
| BDE:  Designation  | of  reason  |  Multilingual  | configuration  | of            |     |
| ------------------ | ----------- | --------------- | -------------- | ------------- | --- |
| texts              |             | reason          | text           | designations  |     |
|                    |             | (deviation      | reasons,       | scrap         |     |
|                    |             | reasons,        | problem        | quantity      |     |
reason, rework reason)
 The designation is displayed in
the corresponding language

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 6 of 15

|     |     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | --- | ------------------------------- |

|     |     | o Scrap  | statistic  based  | on  |     |
| --- | --- | -------- | ----------------- | --- | --- |
orders/machines
o Article statistics
o Maintenance of postings
o   Event maintenance
 Terminal display
| BDE  |     |  Multilingual configuration of order  |     |     |     |
| ---- | --- | -------------------------------------- | --- | --- | --- |
Order type designation
type designations
 Designations are displayed in the
|     |     | corresponding  | language  | in     |     |
| --- | --- | -------------- | --------- | ------ | --- |
|     |     | HYDRA-ADE      | (e.g.     | order  |     |
overview, schedule violations)
| WRM            |     |  Multilingual              | configuration  | of    |     |
| -------------- | --- | --------------------------- | -------------- | ----- | --- |
| Resource type  |     | resource type descriptions  |                |       |     |
 Designations are displayed in the
|     |     | corresponding  | language              |     |     |
| --- | --- | -------------- | --------------------- | --- | --- |
|     |     | (resource      | status,  resource     |     |     |
|     |     | information,   | maintenance           | of  |     |
|     |     | resource       | documents,  resource  |     |     |
history)
 Terminal display
| WRM                |     |  Multilingual                | configuration  | of    |     |
| ------------------ | --- | ----------------------------- | -------------- | ----- | --- |
| Resource families  |     | resource family descriptions  |                |       |     |
|                    |     |  Displayed                   | in  versatile  |       |     |
|                    |     | evaluations/reports           | on             | the   |     |
console
 Terminal display
| WRM  |     |  Multilingual  | configuration  | of    |     |
| ---- | --- | --------------- | -------------- | ----- | --- |
Measures
|     |     | designations  | of  measures,  |     |     |
| --- | --- | ------------- | -------------- | --- | --- |
descriptions and comments
|     |     |  Displayed          | in  versatile  |      |     |
| --- | --- | -------------------- | -------------- | ---- | --- |
|     |     | evaluations/reports  | on             | the  |     |
console
 Entry function of measures on the
console
 Terminal display

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 7 of 15

|     |     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | --- | ------------------------------- |

| WRM          |             |  Multilingual                     | configuration  | of  the    |     |
| ------------ | ----------- | ---------------------------------- | -------------- | ---------- | --- |
| Designation  | of  status  | designation of status assignments  |                |            |     |
assignment
 Display of the designation in the
|     |     | respective  | language  | (resource  |     |
| --- | --- | ----------- | --------- | ---------- | --- |
status, maintenance of resource
documents)
 Terminal display
| WRM           |     |  Multilingual                    | configuration  | of    |     |
| ------------- | --- | --------------------------------- | -------------- | ----- | --- |
| Maintenances  |     | maintenance designations as well  |                |       |     |
as comments
 Display in versatile evaluations on
the console, among other things,
|     |     | the  machine  | history,  | resource  |     |
| --- | --- | ------------- | --------- | --------- | --- |
history, maintenance
| MPL             |     |  Multilingual       | configuration  | of  the    |     |
| --------------- | --- | -------------------- | -------------- | ---------- | --- |
| Material types  |     | designation          |                |            |     |
|                 |     |  Displayed          | in             | versatile  |     |
|                 |     | evaluations/reports  |                | on  the    |     |
console
| MPL/WRM   |                  |  Multilingual  | configuration  | of    |     |
| --------- | ---------------- | --------------- | -------------- | ----- | --- |
| Material  | buffers/storage  |                 |                |       |     |
material buffer designations
locations
|     |     |  Displayed          | in  | versatile  |     |
| --- | --- | -------------------- | --- | ---------- | --- |
|     |     | evaluations/reports  |     | on  the    |     |
console
 Terminal display
| MPL                        |     |  Multilingual                   | configuration  | of  the    |     |
| -------------------------- | --- | -------------------------------- | -------------- | ---------- | --- |
| Transport units            |     | designations of transport units  |                |            |     |
| MPL                        |     |  Multilingual                   | configuration  | of         |     |
| Material type designation  |     | material type designations       |                |            |     |
 Designations are displayed in the
|     |     | corresponding  | language          | (batch  |     |
| --- | --- | -------------- | ----------------- | ------- | --- |
|     |     | data           | overview,  batch  | data    |     |
maintenance)
| MPL                                 |     |  Multilingual                   | configuration  | of    |     |
| ----------------------------------- | --- | -------------------------------- | -------------- | ----- | --- |
| Designation of material attributes  |     | material attribute designations  |                |       |     |
 Designations are displayed in the
|     |     | corresponding  | language  | (batch  |     |
| --- | --- | -------------- | --------- | ------- | --- |

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 8 of 15

|     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | ------------------------------- |

|     |     | data  overview,  batch  | data  |     |
| --- | --- | ----------------------- | ----- | --- |
maintenance)
| CAQ                            |     |  Displayed in many HYDRA-CAQ  |     |     |
| ------------------------------ | --- | ------------------------------ | --- | --- |
| Short designation of statuses  |     | search dialogs                 |     |     |
| CAQ                            |     |                                |     |     |
 Displayed in many master data
| Detailed designation of HYDRA- |     | catalogs  |     |     |
| ------------------------------ | --- | --------- | --- | --- |
CAQ statuses
 Displayed in nearly all dialogs in
the “areas” menu item
 Display in evaluations/reports
| CAQ                               |     |                               |            |     |
| --------------------------------- | --- | ----------------------------- | ---------- | --- |
|                                   |     |  Short  designation          | of  HYDRA- |     |
| Short designation of the area     |     | CAQ areas                     |            |     |
| CAQ                               |     |  Display in the terminal     |            |     |
| Detailed designation of the area  |     | configuration of the CAQ tab  |            |     |
 Display in inspection planning
 nspection
requirements/calibration
 In all evaluations/reports
| Detailed designations of  |     |  Initial sample inspection  |     |     |
| ------------------------- | --- | ---------------------------- | --- | --- |
HYDRA-CAQ status types
| CAQ  |     |  Displayed in master data, forms   |     |     |
| ---- | --- | ----------------------------------- | --- | --- |
Designation of forms
 Displayed in all dialogs from
which forms can be printed
| CAQ   |     |  Displayed in master data, forms   |     |     |
| ----- | --- | ----------------------------------- | --- | --- |
Form descriptions
 Displayed in all dialogs from
which forms can be printed
| CAQ  |     |  Display in dynamic modification  |     |     |
| ---- | --- | ---------------------------------- | --- | --- |
Dynamic modification norm
norms
 Inspection plans (WEP)
 Characteristics (WEP)
 Inspection orders (WEP)
| CAQ                        |     |  Displayed in master data,     |     |     |
| -------------------------- | --- | ------------------------------- | --- | --- |
| Designation of inspection  |     | inspection severity definition  |     |     |
severity definition

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 9 of 15

|     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | ------------------------------- |

 Inspection plans (WEP)
 Characteristics (WEP)
 Inspection orders (WEP)
| CAQ                        |     |  Displayed in entries of inspection  |     |     |
| -------------------------- | --- | ------------------------------------- | --- | --- |
| Designation of inspection  |     | severity definitions                  |     |     |
severity
 Inspection plans (WEP)
 Characteristics (WEP)
 Inspection orders (WEP)
| CAQ                          |     |  Displayed in master data,  |     |     |
| ---------------------------- | --- | ---------------------------- | --- | --- |
| Designation of transitional  |     | transitional definitions     |     |     |
definitions
 Inspection plans (WEP)
 Characteristics (WEP)
 Inspection orders (WEP)
| CAQ                         |     |  Displayed in master data catalog  |     |     |
| --------------------------- | --- | ----------------------------------- | --- | --- |
| Characteristic designation  |     | of characteristics                  |     |     |
 Inspection plan characteristics

 Inspection order characteristics
 PLP characteristics
 EMU characteristics
 Complaint details of
characteristics
| CAQ                      |     |  Displayed in master data catalog  |     |     |
| ------------------------ | --- | ----------------------------------- | --- | --- |
| Characteristic location  |     | of characteristics                  |     |     |
 Inspection plan characteristics

 Inspection order characteristics
 PLP characteristics
 EMU characteristics
 Complaint details of
characteristics
 Terminal

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 10 of 15

|     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | ------------------------------- |

| CAQ               |     |  Displayed in gage master data,  |     |     |
| ----------------- | --- | --------------------------------- | --- | --- |
| Gage designation  |     | gage management                   |     |     |
 Characteristics
 Terminal
| CAQ  |     |  Displayed in characteristics  |     |     |
| ---- | --- | ------------------------------- | --- | --- |
Designation of inspection station
| CAQ  |     |     |     |     |
| ---- | --- | --- | --- | --- |
 Displayed in master data articles
Article designation
 Inspection plans
 Inspection requirements
 Complaint details
| CAQ                      |     |  Displayed in master data defect  |     |     |
| ------------------------ | --- | ---------------------------------- | --- | --- |
| Defect designation       |     | catalogs                           |     |     |
| CAQ                      |     |  Displayed in master data,        |     |     |
| Designation of measures  |     | measures                           |     |     |
 Evaluation of measures
 Complaint header
 Complaint details
| CAQ  |     |  Master data of measures  |     |     |
| ---- | --- | -------------------------- | --- | --- |
Measure text
| CAQ  |     |  Master data characteristics  |     |     |
| ---- | --- | ------------------------------ | --- | --- |
Document designation
 Inspection plan header
 Inspection requirement header
 Inspection plan characteristics

 Inspection order characteristics
 Test equipment management
 Complaint header and details
| CAQ  |     |    |     |     |
| ---- | --- | --- | --- | --- |
Document entries
| CAQ  |     |    |     |     |
| ---- | --- | --- | --- | --- |
Documents

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 11 of 15

|     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | ------------------------------- |

| CAQ                    |     |  Displayed in master data, cost  |     |     |
| ---------------------- | --- | --------------------------------- | --- | --- |
| Cost type designation  |     | types                             |     |     |
 Complaint header
 Complaint details
| CAQ                      |     |  Displayed in master data, MDI  |     |     |
| ------------------------ | --- | -------------------------------- | --- | --- |
| MDI channel designation  |     | configuration                    |     |     |
| CAQ Workflow             |     |  Displayed in master data,      |     |     |
| Element designation      |     | workflow                         |     |     |
 Complaint header workflow
 Complaint detail workflow
| CAQ Workflow  |     |  Workflow element (master data,  |     |     |
| ------------- | --- | --------------------------------- | --- | --- |
| Measure text  |     | complaint detail, complaint       |     |     |
header)
| CAQ                                |     |  Displayed in master data,  |     |     |
| ---------------------------------- | --- | ---------------------------- | --- | --- |
| Designation of analysis selection  |     | analysis selection catalog   |     |     |
catalog
 Displayed in characteristics
| CAQ  |     |  Supplier evaluation and  |     |     |
| ---- | --- | -------------------------- | --- | --- |
Evaluation catalog, designation
 master data evaluation catalog
of the entry
| CAQ  |     |  Supplier evaluation and  |     |     |
| ---- | --- | -------------------------- | --- | --- |
Designation of evaluation groups
 master data evaluation catalog
| CAQ                        |     |  Displayed in evaluation catalogs - |     |     |
| -------------------------- | --- | ------------------------------------ | --- | --- |
| Designation of evaluation  |     | -> entries                           |     |     |
elements
| CAQ  |     |  Displayed in evaluation catalogs  |     |     |
| ---- | --- | ----------------------------------- | --- | --- |
Evaluation catalog number
| CAQ                        |     |  Displayed in evaluation catalogs - |     |     |
| -------------------------- | --- | ------------------------------------ | --- | --- |
| Designation of evaluation  |     | -> classes                           |     |     |
classes
| CAQ                         |     |  Displayed in inspection plan -->  |     |     |
| --------------------------- | --- | ----------------------------------- | --- | --- |
| Designation of certificate  |     | certificates                        |     |     |
characteristics
| CAQ  |     |  Displayed in master data  |     |     |
| ---- | --- | --------------------------- | --- | --- |

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 12 of 15

|     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | ------------------------------- |

Designation of distributor
| CAQ                       |     |  Displayed in master data,  |     |     |
| ------------------------- | --- | ---------------------------- | --- | --- |
| Designation of companies  |     | company                      |     |     |
 Inspection requirements
 Test equipment management
 When the responsible parties are
assigned.
 External persons
| CAQ  |     |  Displayed in master data,  |     |     |
| ---- | --- | ---------------------------- | --- | --- |
Company’s country of residence
company catalog
| CAQ                         |     |  Displayed in master data,  |     |     |
| --------------------------- | --- | ---------------------------- | --- | --- |
| Designation of department   |     | department                   |     |     |
 When the responsible parties are
assigned.
 External persons
| CAQ                     |     |  Displayed in all dialogs where   |     |     |
| ----------------------- | --- | ---------------------------------- | --- | --- |
| Party in charge name 1  |     | parties in charge may be selected  |     |     |
| CAQ                     |     |  Displayed in all dialogs where   |     |     |
| Party in charge name 2  |     | parties in charge may be selected  |     |     |
| CAQ                     |     |                                    |     |     |
 Displayed in all dialogs where
| Party in charge name 3  |     | parties in charge may be selected  |     |     |
| ----------------------- | --- | ---------------------------------- | --- | --- |
| CAQ                     |     |  Currently not displayed          |     |     |
Designation of units

| MOC  |     |     |     |     |
| ---- | --- | --- | --- | --- |
Administration
| MDE                    |     |  Displayed in the resource status  |     |     |
| ---------------------- | --- | ----------------------------------- | --- | --- |
| Resource status types  |     | type dialog (MOC)                   |     |     |
| MDE                    |     |                                     |     |     |
 Displayed in resource status texts
| Resource status texts  |     | dialog (MOC)     |     |     |
| ---------------------- | --- | ---------------- | --- | --- |
| MDE                    |     |  Configuration  |     |     |
Production levels
 The designation is displayed in
the corresponding language

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 13 of 15

|     |     |     |     | Multilingual Database Contents  |
| --- | --- | --- | --- | ------------------------------- |

| SYS  |     |  Configuration  |     |     |
| ---- | --- | ---------------- | --- | --- |
Enhanced object configuration
 The designation is displayed in
the corresponding language
| MDE  |     |  Configuration (MOC)  |     |     |
| ---- | --- | ---------------------- | --- | --- |
Machine counter
 The designation is displayed in
|     |     | the  corresponding  | language  |     |
| --- | --- | ------------------- | --------- | --- |
(MOC)
| PDV  |     |  Configuration (MOC)  |     |     |
| ---- | --- | ---------------------- | --- | --- |
Event designation
 The designation is displayed in
|     |     | the  corresponding  | language  |     |
| --- | --- | ------------------- | --------- | --- |
(MOC)
| CAQ  |     |  Configuration (console)  |     |     |
| ---- | --- | -------------------------- | --- | --- |
QM catalog
 The designation is displayed in
|     |     | the  corresponding  | language  |     |
| --- | --- | ------------------- | --------- | --- |
(CTAIP)

Translation of database texts for MDBI
Initial database texts are translated by way of the “System Text Configurator” tool.
This tool makes it possible to translate a specified amount of database texts manually and in a semi-
automated way using data from the HYDRA dictionary.
| The tool is stored in the following directory on the HYDRA server:  |                                              |     |     |     |
| ------------------------------------------------------------------- | -------------------------------------------- | --- | --- | --- |
|   UNIX:                                                             | <HYDRADIR>/admtools/systemtextconfigurator   |     |     |     |
|   Windows:                                                         | <HYDRA>\admtools\systemtextconfigurator      |     |     |     |
MpdvStc.jar
The documentation dealing with the tool can be found in the following directory:
|   UNIX:   | <HYDRADIR>/admtools/systemtextconfigurator/help  |     |     |     |
| --------- | ------------------------------------------------ | --- | --- | --- |
  Windows:
|     | <HYDRA>\admtools\systemtextconfigurator\help  |     |     |     |
| --- | --------------------------------------------- | --- | --- | --- |
Before  the  STC  tool  is  used,  it  has  to  be  configured  according  to  the  documentation  (e.g.  DB-
Connection).

BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232  Page 14 of 15

Multilingual Database Contents
Annex
A Internal description of the HYD-MDBI function
B Initialization of new columns
C Further creation/checking of MDBI columns
D Disabling of MDBI languages
BASE_FCT_DB_multilingual_entries.docx Version: 1.0.23232 Page 15 of 15